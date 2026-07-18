// ═══════════════════════════════════════════════════════════════════
//   backend/services/settlement/index.mjs
// ═══════════════════════════════════════════════════════════════════

export { chooseSettlementRail } from "./corridorRouter.mjs";
export { fetchHederaStablecoinLiquidityUsd, RESEARCHED_FALLBACK_TVL_USD } from "./liquidity.mjs";
export { executeSettlement, executeOnHedera, executeOnUnavailableChain } from "./execute.mjs";
export {
  PARTNER_CHAIN_SUPPORT, COMPLIANT_STABLECOIN_CHAINS,
  HEDERA_SAFE_AMOUNT_USD, FALLBACK_CHAIN_PRIORITY, BRIDGE_METHOD_BY_CHAIN,
} from "./corridorConfig.mjs";

