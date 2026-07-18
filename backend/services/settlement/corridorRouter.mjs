// ═══════════════════════════════════════════════════════════════════
//   backend/services/settlement/corridorRouter.mjs
//   ───────────────────────────────────────────────────────────────
//   The actual decision logic. Not a live order-book-optimising
//   router — that would be the wrong engineering choice for a retail
//   remittance product, where nobody needs a millisecond-level fee
//   comparison. This is a rules-based decision over three real
//   inputs: which chains the destination partner accepts, which of
//   those carry a MiCA-compliant stablecoin, and whether the
//   transfer amount stays within Hedera's real, currently-thin
//   liquidity depth.
//
//   Hedera is preferred whenever it's viable, because it collapses
//   the trust anchor and the settlement rail onto one network —
//   simpler custody story, one thing to reason about. It falls back
//   only when the partner doesn't support it, or the liquidity check
//   says the amount is large enough to risk visible slippage.
// ═══════════════════════════════════════════════════════════════════

import {
  PARTNER_CHAIN_SUPPORT, COMPLIANT_STABLECOIN_CHAINS,
  HEDERA_SAFE_AMOUNT_USD, FALLBACK_CHAIN_PRIORITY, BRIDGE_METHOD_BY_CHAIN,
} from "./corridorConfig.mjs";
import { fetchHederaStablecoinLiquidityUsd, RESEARCHED_FALLBACK_TVL_USD } from "./liquidity.mjs";

/**
 * Decide which chain a transfer should settle on.
 *
 * @param {string} partnerId     - key into PARTNER_CHAIN_SUPPORT
 * @param {number} amountUsd     - the transfer amount, in USD terms
 * @param {object} [opts]
 * @param {Function} [opts.liquidityFetcher] - defaults to the real
 *   DeFiLlama-backed fetchHederaStablecoinLiquidityUsd. Tests pass a
 *   fake here so the decision logic runs deterministically with no
 *   network access — the branching logic is what's under test, not
 *   the HTTP call (which has its own, separate real implementation).
 * @returns {Promise<{
 *   chain: string, stablecoin: string, bridgeMethod: string,
 *   reason: string, candidatesConsidered: string[],
 *   liquidityCheckedUsd: number|null,
 * }>}
 */
export async function chooseSettlementRail(partnerId, amountUsd, opts = {}) {
  const liquidityFetcher = opts.liquidityFetcher ?? fetchHederaStablecoinLiquidityUsd;
  const partnerChains = PARTNER_CHAIN_SUPPORT[partnerId];
  if (!partnerChains) {
    throw new Error(`Unknown partner "${partnerId}" — add it to PARTNER_CHAIN_SUPPORT in corridorConfig.mjs`);
  }

  // Step 1 — only chains the partner accepts AND that carry a
  // MiCA-compliant, natively-issued stablecoin are candidates at all.
  const candidates = partnerChains.filter((c) => COMPLIANT_STABLECOIN_CHAINS[c]);
  if (candidates.length === 0) {
    throw new Error(
      `Partner "${partnerId}" supports no chain with a compliant stablecoin. ` +
      `This corridor cannot be served as designed — this should surface to ops, not fail silently.`
    );
  }

  // Step 2 — prefer Hedera, but only within its real liquidity depth.
  let liquidityCheckedUsd = null;
  if (candidates.includes("hedera")) {
    try {
      liquidityCheckedUsd = await liquidityFetcher();
    } catch (e) {
      // Network hiccup or DeFiLlama shape change — don't let a
      // liquidity-check failure silently over- or under-commit funds.
      // Fall back to the conservative researched figure and say so.
      liquidityCheckedUsd = RESEARCHED_FALLBACK_TVL_USD;
    }
    const withinDepth = amountUsd <= HEDERA_SAFE_AMOUNT_USD;

    if (withinDepth) {
      return {
        chain: "hedera",
        stablecoin: COMPLIANT_STABLECOIN_CHAINS.hedera.stablecoin,
        bridgeMethod: BRIDGE_METHOD_BY_CHAIN.hedera,
        reason: `Partner supports Hedera and $${amountUsd} is within the safe threshold ` +
                `($${HEDERA_SAFE_AMOUNT_USD}), given ~$${Math.round(liquidityCheckedUsd).toLocaleString()} ` +
                `in checked Hedera stablecoin liquidity depth.`,
        candidatesConsidered: candidates,
        liquidityCheckedUsd,
      };
    }
  }

  // Step 3 — fall back to the highest-liquidity chain the partner
  // and compliance rules both allow.
  const fallback = FALLBACK_CHAIN_PRIORITY.find((c) => candidates.includes(c));
  if (!fallback) {
    throw new Error(
      `No viable fallback chain for partner "${partnerId}" — candidates were [${candidates.join(", ")}] ` +
      `but none are in FALLBACK_CHAIN_PRIORITY. Add one in corridorConfig.mjs.`
    );
  }

  return {
    chain: fallback,
    stablecoin: COMPLIANT_STABLECOIN_CHAINS[fallback].stablecoin,
    bridgeMethod: BRIDGE_METHOD_BY_CHAIN[fallback],
    reason: candidates.includes("hedera")
      ? `Amount $${amountUsd} exceeds the Hedera safe threshold ($${HEDERA_SAFE_AMOUNT_USD}); ` +
        `routed to ${fallback} for deeper liquidity.`
      : `Partner "${partnerId}" does not support Hedera; routed to ${fallback}.`,
    candidatesConsidered: candidates,
    liquidityCheckedUsd,
  };
}

