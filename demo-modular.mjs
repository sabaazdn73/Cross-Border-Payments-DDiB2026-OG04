// ═══════════════════════════════════════════════════════════════════
//   demo-modular.mjs   (repo root)
//   ───────────────────────────────────────────────────────────────
//   Run:  node demo-modular.mjs
//
//   This exercises the SAME six-step proof as step1-hedera.mjs, but
//   through the modular services in backend/services/hedera/ instead
//   of one inline script — this is what Arowolo's orchestration API
//   will actually call. It also demonstrates the new quote-anchoring
//   flow (§9 of the report / the FX-rate integrity discussion).
//
//   step1-hedera.mjs is left untouched as the original proof; this
//   file is the "real" version built on the services other people's
//   code will import.
// ═══════════════════════════════════════════════════════════════════

import "dotenv/config";
import { randomBytes } from "node:crypto";
import {
  getOrCreateTopic, topicHashscanUrl,
  anchorComplianceRecord, anchorQuote,
  fetchMirrorMessage, verifyRecord,
  pseudoRef, closeClient,
} from "./backend/services/hedera/index.mjs";

const log = (...a) => console.log(...a);
const ok  = (m) => log("  \x1b[32m✓\x1b[0m " + m);
const bad = (m) => log("  \x1b[31m✗\x1b[0m " + m);
const step = (n, m) => log(`\n\x1b[35m[${n}]\x1b[0m \x1b[1m${m}\x1b[0m`);

// A pepper is required for pseudoRef. Generate one into .env if missing
// so this runs out of the box, but a real deployment should set its
// own and never rotate it without understanding that old refs break.
if (!process.env.HEDERA_PSEUDO_PEPPER) {
  const generated = randomBytes(32).toString("hex");
  process.env.HEDERA_PSEUDO_PEPPER = generated;
  log(`\x1b[33m! HEDERA_PSEUDO_PEPPER not set — generated one for this run only.\x1b[0m`);
  log(`  Add this to .env to persist it: HEDERA_PSEUDO_PEPPER=${generated}`);
}
const PEPPER = process.env.HEDERA_PSEUDO_PEPPER;

// ── topic ─────────────────────────────────────────────────────────
step("1", "Topic");
const topicId = await getOrCreateTopic();
ok(`using topic ${topicId}`);
log(`     ${topicHashscanUrl(topicId)}`);

// ── a pretend transfer ───────────────────────────────────────────
const transferRef = pseudoRef("demo-transfer-" + Date.now(), PEPPER);
log(`\n  transferRef (pseudonymous, HMAC'd): ${transferRef}`);

// ── 2. anchor a compliance record ───────────────────────────────
step("2", "Anchor a compliance record");
const complianceRecord = {
  recordId: "cmp_" + Date.now(),
  transferRef,
  provider: "psp_sandbox",
  checkType: "KYC_SENDER",
  outcome: "PASS",
  checkedAt: new Date().toISOString(),
};
const compAnchor = await anchorComplianceRecord(topicId, complianceRecord);
ok(`sequence #${compAnchor.sequenceNumber} · ${compAnchor.recordHash.slice(0, 24)}…`);
log(`     ${compAnchor.hashscanTxUrl}`);

// ── 3. anchor a quote (rate + fee) ──────────────────────────────
step("3", "Anchor a quote — proves the rate wasn't changed after the fact");
const quote = {
  recordId: "quo_" + Date.now(),
  transferRef,
  corridor: "EUR-AMD",
  rate: 415.20,
  feeBps: 80,
  quotedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
};
const quoteAnchor = await anchorQuote(topicId, quote);
ok(`sequence #${quoteAnchor.sequenceNumber} · ${quoteAnchor.recordHash.slice(0, 24)}…`);
log(`     ${quoteAnchor.hashscanTxUrl}`);
log(`     Later, at payout, the partner's honoured rate is checked against`);
log(`     this anchor — proving the sender wasn't quoted one rate and`);
log(`     charged another.`);

// ── 4/5. verify both from the public Mirror Node ────────────────
step("4", "Verify both anchors independently via Mirror Node");
const compMirror = await fetchMirrorMessage(topicId, compAnchor.sequenceNumber);
const compResult = verifyRecord(complianceRecord, compMirror);
compResult.verified
  ? ok(`compliance record: MATCH (consensus ${compResult.consensusTimestamp})`)
  : bad(`compliance record: ${compResult.reason}`);

const quoteMirror = await fetchMirrorMessage(topicId, quoteAnchor.sequenceNumber);
const quoteResult = verifyRecord(quote, quoteMirror);
quoteResult.verified
  ? ok(`quote record: MATCH (consensus ${quoteResult.consensusTimestamp})`)
  : bad(`quote record: ${quoteResult.reason}`);

// ── 6. tamper — the kill shot ────────────────────────────────────
step("5", "Tamper — recompute against a modified record");
const tamperedQuote = { ...quote, rate: 430.00 };  // someone quietly worsens the rate
const tamperedResult = verifyRecord(tamperedQuote, quoteMirror);
log(`     someone edits the stored quote: rate 415.20 → 430.00`);
tamperedResult.verified
  ? bad("MATCH — that should be impossible")
  : ok(`\x1b[31mMISMATCH\x1b[0m — ${tamperedResult.reason}`);

log("\n" + "─".repeat(70));
log("\x1b[1m  Both the compliance check and the quoted rate are now verifiable\x1b[0m");
log("\x1b[1m  by anyone, independent of our server, and tamper-evident.\x1b[0m");
log(`  ${topicHashscanUrl(topicId)}`);
log("─".repeat(70) + "\n");

closeClient();

