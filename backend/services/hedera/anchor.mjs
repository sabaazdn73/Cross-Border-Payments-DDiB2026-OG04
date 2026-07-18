// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/anchor.mjs
//   ───────────────────────────────────────────────────────────────
//   Anchors a hash — never the underlying record — to the HCS topic.
//   Two record kinds share one mechanism:
//
//   "compliance" — a KYC/AML check outcome. Proves a licensed party's
//     check happened at a specific, network-issued moment (§13.2,
//     §15 of the report). This is the core of the project.
//
//   "quote"      — the FX rate and fee shown to the sender BEFORE
//     settlement. Anchoring it means that when the payout partner
//     later honours (or doesn't) that quote, anyone can verify the
//     rate wasn't quietly changed between quote and settlement.
//     Same mechanism, different payload — this is intentionally
//     cheap to add because the pipeline already exists.
//
//   What NEVER appears in the payload: names, IBANs, amounts, raw
//   KYC documents. Only a hash and pseudonymous references — see
//   docs/COMPLIANCE_DATA.md for the full privacy boundary.
// ═══════════════════════════════════════════════════════════════════

import { TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { getClient, getNetwork } from "./client.mjs";
import { canonicalHash } from "./hashing.mjs";

/** Generic anchor: hash `record`, submit a small pointer message to
 *  HCS, and return everything the caller needs to store and later
 *  verify. `kind` just labels the message so a human (or a Mirror
 *  Node explorer) reading it back knows what it is without needing
 *  our database — it is metadata, not sensitive data. */
async function anchorRecord(topicId, record, kind) {
  const hash = canonicalHash(record);
  const payload = {
    v: 1,
    kind,                          // "compliance" | "quote"
    recordId: record.recordId,
    transferRef: record.transferRef,
    recordHash: `sha256:${hash}`,
    appTimestamp: new Date().toISOString(),   // what WE claim — see verify.mjs
  };

  const client = getClient();
  const submit = await new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(JSON.stringify(payload))
    .execute(client);
  const receipt = await submit.getReceipt(client);

  const sequenceNumber = receipt.topicSequenceNumber.toString();
  const transactionId = submit.transactionId.toString();
  const network = getNetwork();

  return {
    hash,                                     // hex, no prefix — for local comparison
    recordHash: payload.recordHash,            // "sha256:…" — as anchored
    topicId,
    sequenceNumber,
    transactionId,
    hashscanTxUrl: `https://hashscan.io/${network}/transaction/${transactionId}`,
    hashscanTopicUrl: `https://hashscan.io/${network}/topic/${topicId}`,
  };
}

/** Anchor a KYC/AML compliance decision.
 *  `record` shape (all fields required except where noted):
 *    { recordId, transferRef, provider, checkType, outcome, checkedAt } */
export function anchorComplianceRecord(topicId, record) {
  if (!record.recordId || !record.transferRef || !record.outcome) {
    throw new Error("anchorComplianceRecord: recordId, transferRef and outcome are required");
  }
  return anchorRecord(topicId, record, "compliance");
}

/** Anchor a quote (FX rate + fee) shown to the sender before settlement.
 *  `quote` shape:
 *    { recordId, transferRef, corridor, rate, feeBps, quotedAt, expiresAt } */
export function anchorQuote(topicId, quote) {
  if (!quote.recordId || !quote.transferRef || quote.rate == null) {
    throw new Error("anchorQuote: recordId, transferRef and rate are required");
  }
  return anchorRecord(topicId, quote, "quote");
}

/** Anchor a settlement-chain routing decision — WHY this transfer
 *  went to this chain, not just the compliance/quote facts. Makes
 *  the corridorRouter.mjs decision itself auditable: a regulator (or
 *  a curious teammate) can verify the stated reason wasn't rewritten
 *  after the fact.
 *  `record` shape:
 *    { recordId, transferRef, chain, bridgeMethod, reason } */
export function anchorRoutingDecision(topicId, record) {
  if (!record.recordId || !record.transferRef || !record.chain) {
    throw new Error("anchorRoutingDecision: recordId, transferRef and chain are required");
  }
  return anchorRecord(topicId, record, "routing_decision");
}

