import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

import {
  getOrCreateTopic,
  anchorComplianceRecord,
  anchorQuote,
  anchorRoutingDecision,
  fetchMirrorMessage,
  verifyRecord,
  pseudoRef,
  closeClient,
  getClient,
  canonicalHash
} from "./services/hedera/index.mjs";

import {
  chooseSettlementRail,
  executeSettlement,
  executeOnUnavailableChain
} from "./services/settlement/index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load DB helper
async function readDb() {
  try {
    const data = await readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { transactions: {} };
  }
}

async function writeDb(data) {
  await writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Check if Hedera credentials are set and valid
let isSimulationMode = false;
try {
  if (!process.env.HEDERA_ACCOUNT_ID || !process.env.HEDERA_PRIVATE_KEY) {
    console.warn("⚠️ Hedera HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY is missing from .env. Enabling Hedera Simulation Mode.");
    isSimulationMode = true;
  } else {
    // Parse key to verify correctness
    getClient();
    console.log(`✅ Hedera connection established on ${process.env.HEDERA_NETWORK || 'testnet'}`);
  }
} catch (err) {
  console.warn(`⚠️ Hedera initialization failed: ${err.message}. Enabling Hedera Simulation Mode.`);
  isSimulationMode = true;
}

// Financial Math Helpers matching frontend calculations
const SERVICE_FEE_FIXED = 4.99;
const SERVICE_FEE_PERCENT = 0.005;

const payoutMethods = {
  bank_transfer: { fee: 0, deliveryTime: '1-2 business days' },
  mobile_money: { fee: 0.5, deliveryTime: 'Within minutes' },
  cash_pickup: { fee: 1.0, deliveryTime: 'Same day' },
  wallet: { fee: 0.5, deliveryTime: 'Within hours' },
};

const exchangeRates = {
  USD: 1.0, GBP: 0.79, EUR: 0.92, NGN: 1580.0, GHS: 15.2,
  KES: 129.5, ZAR: 18.6, UGX: 3750.0, TZS: 2680.0, ETB: 57.5,
  EGP: 47.8, MAD: 10.1, INR: 83.2, PHP: 56.5, MXN: 17.3,
  BRL: 5.1, COP: 3950.0, CNY: 7.25, JPY: 149.5, SGD: 1.35,
  AUD: 1.55, CAD: 1.36, AED: 3.67, PKR: 278.0, IDR: 15750.0,
};

function getExchangeRate(fromCurrency, toCurrency) {
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  return toRate / fromRate;
}

function calculateServiceFee(amount) {
  const percentFee = amount * SERVICE_FEE_PERCENT;
  return Math.max(SERVICE_FEE_FIXED, parseFloat(percentFee.toFixed(2)));
}

function calculatePayoutFee(amount, payoutMethodId) {
  const method = payoutMethods[payoutMethodId];
  if (!method || !method.fee) return 0;
  return parseFloat(((amount * method.fee) / 100).toFixed(2));
}

function calculateTotalFee(amount, payoutMethodId) {
  return parseFloat((calculateServiceFee(amount) + calculatePayoutFee(amount, payoutMethodId)).toFixed(2));
}

function calculateRecipientAmount(amount, fromCurrency, toCurrency, payoutMethodId) {
  if (amount <= 0) return 0;
  const fee = calculateTotalFee(amount, payoutMethodId);
  const netAmount = amount - fee;
  if (netAmount <= 0) return 0;
  const rate = getExchangeRate(fromCurrency, toCurrency);
  return parseFloat((netAmount * rate).toFixed(2));
}

// Endpoints

// 1. Get all transactions (with search query support)
app.get('/api/transfers', async (req, res) => {
  const { search } = req.query;
  const db = await readDb();
  let txs = Object.values(db.transactions);

  if (search) {
    const q = search.toLowerCase().trim();
    txs = txs.filter(t => 
      t.id.toLowerCase().includes(q) ||
      t.senderName.toLowerCase().includes(q) ||
      t.recipientName.toLowerCase().includes(q) ||
      t.senderEmail?.toLowerCase().includes(q)
    );
  }

  // Sort by date descending
  txs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(txs);
});

// 2. Get transaction by ID
app.get('/api/transfers/:id', async (req, res) => {
  const db = await readDb();
  const txn = db.transactions[req.params.id];
  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json(txn);
});

// 3. Get transaction status (step updates)
app.get('/api/transfers/:id/status', async (req, res) => {
  const db = await readDb();
  const txn = db.transactions[req.params.id];
  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.json({
    status: txn.status,
    payoutStatus: txn.payoutStatus,
    settlementStatus: txn.settlementStatus,
    complianceStatus: txn.complianceStatus
  });
});

// 4. Get compliance record
app.get('/api/transfers/:id/compliance', async (req, res) => {
  const db = await readDb();
  const txn = db.transactions[req.params.id];
  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  // Build the off-chain compliance record structure
  const complianceRecord = {
    recordId: `CMP-${txn.id}`,
    transactionId: txn.id,
    senderName: txn.senderName,
    senderEmail: txn.senderEmail,
    senderCountry: txn.senderCountry,
    recipientName: txn.recipientName,
    recipientCountry: txn.recipientCountry,
    amount: txn.amount,
    currency: txn.currency,
    purpose: txn.purpose || 'Family Support',
    kycStatus: txn.complianceStatus === 'verified' ? 'VERIFIED' : 'PENDING',
    amlStatus: 'CLEARED',
    sanctionsCheck: 'PASSED',
    riskScore: 'LOW',
    reviewedAt: txn.createdAt,
    reviewedBy: 'AUTOMATED_SYSTEM',
  };

  res.json(complianceRecord);
});

// 5. Verify compliance record against Hedera HCS
app.post('/api/transfers/:id/verify', async (req, res) => {
  const { id } = req.params;
  const { record } = req.body;
  const db = await readDb();
  const txn = db.transactions[id];

  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  try {
    if (isSimulationMode) {
      // Simulate HCS mirror check with short artificial delay
      await new Promise(r => setTimeout(r, 1500));
      
      const anchoredHash = txn.complianceAnchor?.recordHash;
      if (!anchoredHash) {
        return res.status(400).json({ error: 'Anchoring details missing in simulation DB' });
      }

      // Check if recomputed matches anchored
      const verification = verifyRecord(record, {
        consensus_timestamp: txn.complianceAnchor.consensusTimestamp,
        recordHash: anchoredHash
      });
      return res.json(verification);
    } else {
      // Real check on Hedera HCS Mirror Node
      const topicId = txn.hederaTopicId;
      const seqNo = txn.complianceAnchor?.sequenceNumber;
      if (!topicId || !seqNo) {
        return res.status(400).json({ error: 'Anchoring details missing for this transaction' });
      }

      const mirror = await fetchMirrorMessage(topicId, seqNo);
      const verification = verifyRecord(record, mirror);
      return res.json(verification);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Create a new transfer (Initiates the full workflow)
app.post('/api/transfers', async (req, res) => {
  const body = req.body;
  const db = await readDb();

  const txnId = body.id || `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  const amountUsd = parseFloat(body.amount);
  const fromCurrency = body.currency;
  const toCurrency = body.receivingCurrency;
  const payoutMethodId = body.payoutMethod;

  // Build compliance check data
  const complianceRecord = {
    recordId: `CMP-${txnId}`,
    transactionId: txnId,
    senderName: body.senderName,
    senderEmail: body.senderEmail,
    senderCountry: body.senderCountry,
    recipientName: body.recipientName,
    recipientCountry: body.recipientCountry,
    amount: amountUsd,
    currency: fromCurrency,
    purpose: body.purpose || 'Family Support',
    kycStatus: 'VERIFIED',
    amlStatus: 'CLEARED',
    sanctionsCheck: 'PASSED',
    riskScore: 'LOW',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 'AUTOMATED_SYSTEM',
  };

  const pepper = process.env.HEDERA_PSEUDO_PEPPER || "demo_pseudo_pepper_for_cross_border";
  const transferRef = pseudoRef(txnId, pepper);

  let topicId = "0.0.9617780"; // Default HCS demo topic
  let compAnchor, quoteAnchor, routingAnchor, decision, execution;

  try {
    if (isSimulationMode) {
      // Simulate Hedera anchors locally
      const mockConsensusTime = new Date().toISOString();
      const mockSeqOffset = Math.floor(Math.random() * 50) + 10;
      
      compAnchor = {
        sequenceNumber: mockSeqOffset,
        recordHash: "sha256:" + canonicalHash(complianceRecord),
        consensusTimestamp: mockConsensusTime,
        hashscanTxUrl: `https://hashscan.io/testnet/topic/${topicId}`
      };

      const quote = {
        recordId: `quo_${Date.now()}`,
        transferRef,
        corridor: `${fromCurrency}-${toCurrency}`,
        rate: getExchangeRate(fromCurrency, toCurrency),
        feeBps: 80,
        quotedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
      };
      quoteAnchor = {
        sequenceNumber: mockSeqOffset + 1,
        recordHash: "sha256:" + canonicalHash(quote),
        consensusTimestamp: mockConsensusTime,
        hashscanTxUrl: `https://hashscan.io/testnet/topic/${topicId}`
      };

      decision = await chooseSettlementRail("payout_partner_default", amountUsd, {
        liquidityFetcher: async () => 18111247
      });

      const routingRecord = {
        recordId: `rtd_${Date.now()}`,
        transferRef,
        chain: decision.chain,
        bridgeMethod: decision.bridgeMethod,
        reason: decision.reason,
      };
      routingAnchor = {
        sequenceNumber: mockSeqOffset + 2,
        recordHash: "sha256:" + canonicalHash(routingRecord),
        consensusTimestamp: mockConsensusTime,
        hashscanTxUrl: `https://hashscan.io/testnet/topic/${topicId}`
      };

      execution = decision.chain === "hedera"
        ? {
            executed: true,
            chain: "hedera",
            tokenId: "0.0.9617782",
            transactionId: `0.0.9617780@${Math.floor(Date.now()/1000)}.000000000`,
            status: "SUCCESS",
            hashscanUrl: `https://hashscan.io/testnet/transaction/0.0.9617780@${Math.floor(Date.now()/1000)}.000000000`,
          }
        : executeOnUnavailableChain(decision.chain, { amountUsd });
    } else {
      // Real Hedera execution
      topicId = await getOrCreateTopic();

      // Step 1: Compliance
      compAnchor = await anchorComplianceRecord(topicId, complianceRecord);

      // Step 2: Quote
      const quote = {
        recordId: `quo_${Date.now()}`,
        transferRef,
        corridor: `${fromCurrency}-${toCurrency}`,
        rate: getExchangeRate(fromCurrency, toCurrency),
        feeBps: 80,
        quotedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
      };
      quoteAnchor = await anchorQuote(topicId, quote);

      // Step 3: Routing decision
      decision = await chooseSettlementRail("payout_partner_default", amountUsd);
      const routingRecord = {
        recordId: `rtd_${Date.now()}`,
        transferRef,
        chain: decision.chain,
        bridgeMethod: decision.bridgeMethod,
        reason: decision.reason,
      };
      routingAnchor = await anchorRoutingDecision(topicId, routingRecord);

      // Step 4: Settlement Execution
      execution = await executeSettlement(decision, { amountUsd });
    }

    const fee = calculateTotalFee(amountUsd, payoutMethodId);
    const recipientAmount = calculateRecipientAmount(amountUsd, fromCurrency, toCurrency, payoutMethodId);

    const transaction = {
      id: txnId,
      senderName: body.senderName,
      senderEmail: body.senderEmail,
      senderCountry: body.senderCountry,
      recipientName: body.recipientName,
      recipientEmail: body.recipientContact,
      recipientCountry: body.recipientCountry,
      amount: amountUsd,
      currency: fromCurrency,
      receivingCurrency: toCurrency,
      recipientAmount,
      fee,
      exchangeRate: getExchangeRate(fromCurrency, toCurrency),
      payoutMethod: payoutMethodId,
      purpose: body.purpose || 'Family Support',
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      estimatedDelivery: payoutMethods[payoutMethodId]?.deliveryTime || '1-3 business days',
      hederaTxRef: execution.executed ? execution.transactionId : null,
      hederaTopicId: topicId,
      hederaSequenceNumber: routingAnchor.sequenceNumber.toString(),
      hederaConsensusTimestamp: routingAnchor.consensusTimestamp,
      complianceStatus: 'verified',
      settlementStatus: execution.executed ? 'settled' : 'unexecuted',
      payoutStatus: 'paid',
      
      complianceAnchor: {
        sequenceNumber: compAnchor.sequenceNumber,
        recordHash: compAnchor.recordHash,
        consensusTimestamp: compAnchor.consensusTimestamp,
        hashscanTxUrl: compAnchor.hashscanTxUrl
      },
      quoteAnchor: {
        sequenceNumber: quoteAnchor.sequenceNumber,
        recordHash: quoteAnchor.recordHash,
        consensusTimestamp: quoteAnchor.consensusTimestamp,
        hashscanTxUrl: quoteAnchor.hashscanTxUrl
      },
      routingAnchor: {
        sequenceNumber: routingAnchor.sequenceNumber,
        recordHash: routingAnchor.recordHash,
        consensusTimestamp: routingAnchor.consensusTimestamp,
        hashscanTxUrl: routingAnchor.hashscanTxUrl
      },
      settlementChain: decision.chain,
      settlementBridgeMethod: decision.bridgeMethod,
      settlementReason: decision.reason,
      settlementHashscanUrl: execution.hashscanUrl || null,
      settlementNote: execution.note || null
    };

    db.transactions[txnId] = transaction;
    await writeDb(db);

    res.json({ success: true, transferId: txnId, transaction });
  } catch (err) {
    console.error("Error creating transfer API:", err);
    res.status(500).json({ error: err.message });
  }
});

// 7. Database Tamper endpoint (for demo demonstration)
app.post('/api/transfers/:id/tamper', async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // e.g. { amount: 50000 }
  
  const db = await readDb();
  const txn = db.transactions[id];

  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  // Update properties directly in the database
  db.transactions[id] = { ...txn, ...updates };
  await writeDb(db);

  res.json({ success: true, transaction: db.transactions[id] });
});

// 8. Sandbox payment simulation endpoint
app.post('/api/payments', (req, res) => {
  res.json({ success: true, paymentId: `PAY-${Date.now()}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Settlement API Server running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  closeClient();
  process.exit(0);
});
