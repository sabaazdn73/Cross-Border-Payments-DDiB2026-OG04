// ═══════════════════════════════════════════════════════════════════
//   demo-router.mjs   (repo root)
//   ───────────────────────────────────────────────────────────────
//   Run:  node demo-router.mjs
//
//   Ties together everything from this round: real routing decision
//   (with a REAL DeFiLlama liquidity check — run this yourself, it
//   could not be tested from the sandbox that built it, see
//   liquidity.mjs), anchoring that decision on HCS so the "why this
//   chain" reasoning is itself auditable, and — for the Hedera path —
//   a genuinely executed HTS transfer on testnet.
//
//   Run it twice with different amounts to see both branches:
//     node demo-router.mjs 100        → small amount, chain: hedera
//     node demo-router.mjs 50000      → large amount, chain: ethereum (unexecuted, honestly labeled)
// ═══════════════════════════════════════════════════════════════════

import "dotenv/config";
import {
  getOrCreateTopic, topicHashscanUrl, anchorRoutingDecision,
  fetchMirrorMessage, verifyRecord, closeClient,
} from "./backend/services/hedera/index.mjs";
import { chooseSettlementRail, executeSettlement } from "./backend/services/settlement/index.mjs";

const log = (...a) => console.log(...a);
const ok  = (m) => log("  \x1b[32m✓\x1b[0m " + m);
const warn= (m) => log("  \x1b[33m!\x1b[0m " + m);
const step = (n, m) => log(`\n\x1b[35m[${n}]\x1b[0m \x1b[1m${m}\x1b[0m`);

const amountUsd = Number(process.argv[2] ?? 100);
const transferRef = "txr_" + Date.now();

step("1", `Routing decision for a $${amountUsd} transfer`);
const decision = await chooseSettlementRail("payout_partner_default", amountUsd);
ok(`chain: ${decision.chain}  (bridge: ${decision.bridgeMethod})`);
log(`     ${decision.reason}`);
if (decision.liquidityCheckedUsd) {
  log(`     Hedera liquidity checked: $${Math.round(decision.liquidityCheckedUsd).toLocaleString()}`);
}

step("2", "Anchor the routing decision itself — auditable, not just asserted");
const topicId = await getOrCreateTopic();
const routingRecord = {
  recordId: "rtd_" + Date.now(),
  transferRef,
  chain: decision.chain,
  bridgeMethod: decision.bridgeMethod,
  reason: decision.reason,
};
const anchor = await anchorRoutingDecision(topicId, routingRecord);
ok(`sequence #${anchor.sequenceNumber}`);
log(`     ${anchor.hashscanTxUrl}`);

step("3", "Verify the routing decision independently via Mirror Node");
const mirror = await fetchMirrorMessage(topicId, anchor.sequenceNumber);
const result = verifyRecord(routingRecord, mirror);
result.verified
  ? ok(`MATCH — anyone can confirm why this transfer went to ${decision.chain}, independent of us`)
  : warn(result.reason);

step("4", "Execute the settlement leg");
const execution = await executeSettlement(decision, { amountUsd });
if (execution.executed) {
  ok(`REAL transaction on ${execution.chain}: ${execution.transactionId}`);
  log(`     ${execution.hashscanUrl}`);
} else {
  warn(`NOT executed on ${execution.chain} — ${execution.note}`);
}

log("\n" + "─".repeat(70));
log(`  Try:  node demo-router.mjs 50000   ← crosses the Hedera threshold`);
log("─".repeat(70) + "\n");
closeClient();

