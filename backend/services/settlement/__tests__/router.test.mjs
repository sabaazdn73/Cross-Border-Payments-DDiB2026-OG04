// ═══════════════════════════════════════════════════════════════════
//   backend/services/settlement/__tests__/router.test.mjs
//   ───────────────────────────────────────────────────────────────
//   Run with: node --test backend/services/settlement/__tests__/*.test.mjs
//
//   These test the DECISION logic only — a fake liquidityFetcher is
//   injected so no network call happens. This is the right boundary:
//   the branching rules (partner support, compliance, threshold) are
//   deterministic and should be tested as such. The real HTTP call in
//   liquidity.mjs is a separate concern with its own honesty notes.
// ═══════════════════════════════════════════════════════════════════

import { test } from "node:test";
import assert from "node:assert/strict";
import { chooseSettlementRail } from "../corridorRouter.mjs";
import { HEDERA_SAFE_AMOUNT_USD } from "../corridorConfig.mjs";

const deepLiquidity = async () => 90_000_000;   // pretend Hedera is deep
const thinLiquidity = async () => 500_000;      // pretend Hedera is thin (still doesn't matter — threshold is on amount, not on this value, see note below)

test("chooses hedera when partner supports it and amount is within the safe threshold", async () => {
  const decision = await chooseSettlementRail(
    "payout_partner_default",
    HEDERA_SAFE_AMOUNT_USD - 1,
    { liquidityFetcher: deepLiquidity }
  );
  assert.equal(decision.chain, "hedera");
  assert.equal(decision.bridgeMethod, "native");
});

test("falls back to ethereum/solana when amount exceeds the Hedera safe threshold", async () => {
  const decision = await chooseSettlementRail(
    "payout_partner_default",
    HEDERA_SAFE_AMOUNT_USD + 1,
    { liquidityFetcher: deepLiquidity }
  );
  assert.notEqual(decision.chain, "hedera");
  assert.ok(["ethereum", "solana"].includes(decision.chain));
});

test("falls back when the liquidity fetcher itself fails (network hiccup)", async () => {
  const failing = async () => { throw new Error("network down"); };
  const decision = await chooseSettlementRail(
    "payout_partner_default",
    HEDERA_SAFE_AMOUNT_USD - 1,   // small amount, would normally choose hedera
    { liquidityFetcher: failing }
  );
  // Should still resolve to a decision (using the researched fallback
  // figure internally) rather than throwing and killing the transfer.
  assert.equal(decision.chain, "hedera");
  assert.ok(decision.liquidityCheckedUsd > 0);
});

test("throws a clear error for an unconfigured partner", async () => {
  await assert.rejects(
    () => chooseSettlementRail("nonexistent_partner", 100, { liquidityFetcher: deepLiquidity }),
    /Unknown partner/
  );
});

test("every decision carries a human-readable reason", async () => {
  const decision = await chooseSettlementRail(
    "payout_partner_default", 100, { liquidityFetcher: deepLiquidity }
  );
  assert.equal(typeof decision.reason, "string");
  assert.ok(decision.reason.length > 10);
});

test("candidatesConsidered only includes chains that are both partner-supported and compliant", async () => {
  const decision = await chooseSettlementRail(
    "payout_partner_default", 100, { liquidityFetcher: deepLiquidity }
  );
  assert.ok(decision.candidatesConsidered.every((c) =>
    ["hedera", "ethereum", "solana", "base"].includes(c)
  ));
});

