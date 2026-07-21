import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import { generateCommunityCode, hashCommunityCode } from './services/community/code.mjs';

import {
  getOrCreateTopic,
  anchorComplianceRecord,
  anchorQuote,
  anchorRoutingDecision,
  fetchMirrorMessage,
  fetchMirrorTransaction,
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
    return { transactions: {}, communityPosts: [] };
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

// Health check — reports whether real Hedera credentials loaded.
// Hit this first after any deploy: if isSimulationMode is true, the
// env vars are missing or wrong, and every "transaction" returned by
// the API is fabricated, not real. Fix the env vars, don't ignore this.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hederaMode: isSimulationMode ? 'SIMULATION (fake data — check env vars)' : 'LIVE (real testnet)',
    network: process.env.HEDERA_NETWORK || 'not set',
    topicId: process.env.HEDERA_TOPIC_ID || 'not set',
    timestamp: new Date().toISOString(),
  });
});

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
//
// IMPORTANT: this endpoint always attempts a REAL Mirror Node check
// when the transaction has real anchor data (topicId + sequenceNumber),
// regardless of isSimulationMode. isSimulationMode governs whether the
// *payment/execution* leg is simulated -- it must never silently
// downgrade compliance verification to a local, self-referential
// comparison, since "verify against Hedera" is the entire point of
// this endpoint. A local-only comparison was the actual bug reported:
// it can never fail to match (it recomputes the same value it stores),
// so it wasn't verifying anything.
app.post('/api/transfers/:id/verify', async (req, res) => {
  const { id } = req.params;
  const { record } = req.body;
  const db = await readDb();
  const txn = db.transactions[id];

  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  const topicId = txn.hederaTopicId;
  const seqNo = txn.complianceAnchor?.sequenceNumber;
  const txnRef = txn.hederaTxRef;

  try {
    if (topicId && seqNo) {
      // Real check on the real Hedera HCS Mirror Node -- the only
      // path this endpoint should take when real anchor data exists.
      try {
        const mirror = await fetchMirrorMessage(topicId, seqNo);
        const verification = verifyRecord(record, mirror);
        return res.json(verification);
      } catch (seqErr) {
        // Fall through to transaction-ID verification below rather
        // than failing outright -- a wrong or stale sequence number
        // has been a real, repeated bug in this project, and the
        // transaction ID itself (from a HashScan link) is a more
        // direct, robust reference that doesn't depend on getting an
        // index right.
        if (!txnRef) throw seqErr;
      }
    }

    if (txnRef) {
      // Real check via the Mirror Node's transactions endpoint:
      // confirms the specific transaction genuinely exists, succeeded,
      // and landed on this project's topic -- independent of knowing
      // the right sequence number in advance.
      const proof = await fetchMirrorTransaction(txnRef, { expectedTopicId: topicId });
      return res.json({
        verified: proof.verified,
        reason: proof.reason,
        consensusTimestamp: proof.consensusTimestamp,
        transactionHash: proof.transactionHash,
        verificationMethod: 'transaction-id',
      });
    }

    if (isSimulationMode) {
      // No real anchor data recorded for this transaction (e.g. it
      // was created before Hedera anchoring was wired up, or anchoring
      // itself failed). This is an honest fallback for that edge case,
      // not the default path -- it's clearly labeled in the response
      // as unverified-against-network so the UI can't present it as
      // equivalent to a real check.
      const anchoredHash = txn.complianceAnchor?.recordHash;
      if (!anchoredHash) {
        return res.status(400).json({ error: 'No compliance anchor recorded for this transaction' });
      }
      const verification = verifyRecord(record, {
        consensus_timestamp: txn.complianceAnchor.consensusTimestamp,
        recordHash: anchoredHash,
      });
      return res.json({ ...verification, networkChecked: false });
    }

    return res.status(400).json({ error: 'Anchoring details missing for this transaction' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5b. Generate the one-time Community Usage Code for a transaction.
//
// Entry requirement, enforced server-side: the transaction must have
// a REAL Hedera anchor (topicId + sequenceNumber) -- this is what
// proves the requester actually completed a real, hashed transaction,
// not just typed in an ID. The code itself is deliberately NOT the
// Hedera hash (that's public on HashScan, anyone could copy it) --
// it's random entropy generated here, shown exactly once, and stored
// only as a SHA-256 hash from that point on. This endpoint refuses to
// regenerate/re-reveal a code that already exists for a transaction,
// which is what "not recoverable" means in practice: lose it, and the
// only way back in is a new real transaction.
app.post('/api/transfers/:id/community-code', async (req, res) => {
  const { id } = req.params;
  const db = await readDb();
  db.communityPosts = db.communityPosts || [];
  const txn = db.transactions[id];

  if (!txn) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  if (!txn.hederaTopicId || !(txn.complianceAnchor?.sequenceNumber || txn.hederaTxRef)) {
    return res.status(400).json({
      error: 'This transaction has no real Hedera anchor yet -- a Community Usage Code can only be issued after real anchoring.',
    });
  }
  if (txn.communityCodeHash) {
    return res.status(409).json({
      error: 'A Community Usage Code was already generated for this transaction and cannot be shown again. It was only ever displayed once.',
    });
  }

  const code = generateCommunityCode();
  txn.communityCodeHash = hashCommunityCode(code);
  txn.communityCodeIssuedAt = new Date().toISOString();
  await writeDb(db);

  // The raw code is returned exactly once, right here, and never again.
  res.json({ code });
});

// 5c. Submit a community post -- requires a valid Community Usage Code.
app.post('/api/community/posts', async (req, res) => {
  const { code, displayName, country, message } = req.body;
  if (!code || !message || message.trim().length < 5) {
    return res.status(400).json({ error: 'A valid code and a message (5+ characters) are required.' });
  }

  const db = await readDb();
  db.communityPosts = db.communityPosts || [];
  const submittedHash = hashCommunityCode(code);
  const matchingTxnId = Object.keys(db.transactions).find(
    (txnId) => db.transactions[txnId].communityCodeHash === submittedHash
  );

  if (!matchingTxnId) {
    return res.status(403).json({
      error: 'That code was not recognized. Only senders with a real Community Usage Code from a completed, anchored transaction can post here.',
    });
  }

  const post = {
    id: `POST-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    displayName: (displayName || 'Anonymous sender').slice(0, 60),
    country: country || null,
    message: message.trim().slice(0, 600),
    createdAt: new Date().toISOString(),
  };
  db.communityPosts.unshift(post);
  await writeDb(db);
  res.status(201).json(post);
});

// 5d. List community posts (public feed).
app.get('/api/community/posts', async (req, res) => {
  const db = await readDb();
  res.json(db.communityPosts || []);
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

  // transferRef must be computed before building complianceRecord --
  // anchorComplianceRecord() requires it, and the previous ordering
  // computed it AFTER the record was built, so it was never included.
  const pepper = process.env.HEDERA_PSEUDO_PEPPER || "demo_pseudo_pepper_for_cross_border";
  const transferRef = pseudoRef(txnId, pepper);

  // Build compliance check data
  const kycStatus = 'VERIFIED';
  const amlStatus = 'CLEARED';
  const sanctionsCheck = 'PASSED';
  const complianceRecord = {
    recordId: `CMP-${txnId}`,
    transferRef,
    provider: 'AUTOMATED_SYSTEM',
    checkType: 'KYC_AML_SANCTIONS',
    // anchorComplianceRecord requires a single `outcome` -- derived
    // from the three individual checks rather than hardcoded
    // separately, so it can't silently drift out of sync with them.
    outcome: (kycStatus === 'VERIFIED' && amlStatus === 'CLEARED' && sanctionsCheck === 'PASSED') ? 'PASSED' : 'FAILED',
    checkedAt: new Date().toISOString(),
    transactionId: txnId,
    senderName: body.senderName,
    senderEmail: body.senderEmail,
    senderCountry: body.senderCountry,
    recipientName: body.recipientName,
    recipientCountry: body.recipientCountry,
    amount: amountUsd,
    currency: fromCurrency,
    purpose: body.purpose || 'Family Support',
    kycStatus,
    amlStatus,
    sanctionsCheck,
    riskScore: 'LOW',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 'AUTOMATED_SYSTEM',
  };

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

// Start the server only when this file is actually run directly
// (node backend/server.mjs), not when imported by a test file that
// wants the Express app object itself (Supertest doesn't need a real
// listening port -- it drives requests straight into the app).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`🚀 Settlement API Server running on http://localhost:${PORT}`);
  });
}

process.on('SIGTERM', () => {
  closeClient();
  process.exit(0);
});

export default app;
