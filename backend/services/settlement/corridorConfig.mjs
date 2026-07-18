// ═══════════════════════════════════════════════════════════════════
//   backend/services/settlement/corridorConfig.mjs
//   ───────────────────────────────────────────────────────────────
//   Two honest design notes before the config itself:
//
//   1. PARTNER_CHAIN_SUPPORT is a MAINTAINED CONFIG, not a live
//      capability query. This is not a shortcut — in real payment
//      integrations, which chains a partner supports is documented
//      in their integration docs and changes rarely (weeks/months,
//      not minutes), so a live "ask the partner which chains you
//      support" call doesn't exist in practice and wouldn't be
//      meaningfully more "real" than a config file kept in sync with
//      partner docs. Update this file when a partner's supported
//      chains change — that IS the real-world integration process.
//
//   2. COMPLIANT_STABLECOINS enforces §13.6 of the report: only
//      MiCA-authorised EMTs with real liquidity. As of mid-2026 that
//      is USDC and EURC (Circle) — USDT is excluded deliberately;
//      it was delisted from major EU venues and Tether has stated no
//      intention to pursue MiCA authorisation.
// ═══════════════════════════════════════════════════════════════════

/** Which chains each sandbox payout partner accepts USDC/EURC on.
 *  Replace these partner IDs with your real sandbox partner(s) once
 *  chosen — this is illustrative scaffolding, not a claim that these
 *  specific partners are integrated. */
export const PARTNER_CHAIN_SUPPORT = {
  payout_partner_default: ["hedera", "solana", "ethereum", "base"],
  // Add more partners here as they're onboarded:
  // payout_partner_africa: ["solana", "ethereum"],
};

/** Chains where USDC or EURC is natively issued by Circle (not a
 *  bridged/wrapped representation) — confirmed as of mid-2026.
 *  Native issuance matters because a wrapped token is a bridge's
 *  IOU, not Circle's asset, and carries the bridge's own risk. */
export const COMPLIANT_STABLECOIN_CHAINS = {
  hedera:   { stablecoin: "USDC", native: true },
  ethereum: { stablecoin: "USDC", native: true },
  solana:   { stablecoin: "USDC", native: true },
  // Base: native USDC, ~$4.1-4.3B supply (~5.8% of global USDC supply,
  // mid-2026). Smaller supply than Ethereum/Solana, but very high
  // transaction velocity — caveat: a large share of that volume is
  // concentrated in a few DeFi pools (e.g. Aerodrome), not necessarily
  // representative of available payment-settlement liquidity. Included
  // as a fallback option, ranked by real supply, not headline volume.
  base:     { stablecoin: "USDC", native: true },
  // EURC has a much smaller native footprint; add chains here only
  // once you've confirmed Circle issues EURC natively on them.
};

/** Above this amount, do not settle on Hedera even if the partner
 *  supports it — the SaucerSwap-depth research (~$75-115M total
 *  Hedera DeFi TVL, mid-2026) suggests a single settlement much
 *  larger than this risks visible slippage. This is a conservative,
 *  tunable safety margin, not a hard physical limit — adjust it as
 *  real liquidity data comes in from liquidity.mjs. */
export const HEDERA_SAFE_AMOUNT_USD = 20_000;

/** Fallback chain order when Hedera isn't chosen — highest liquidity
 *  first, per the researched USDC-supply-by-chain figures (Ethereum
 *  ≈ 70% of global USDC supply, Solana second and fastest-growing,
 *  sub-cent fees). */
export const FALLBACK_CHAIN_PRIORITY = ["ethereum", "solana", "base"];

/** How value would move onto a non-Hedera chain, given today's state
 *  of Circle's Cross-Chain Transfer Protocol (CCTP):
 *    "cctp"                      — native burn-and-mint, no wrap risk
 *    "circle_mint_redeem_reissue" — the LICENSED PARTNER redeems to
 *                                    fiat/USD on one chain and mints
 *                                    fresh on the other; never us
 *  As of mid-2026, CCTP v1 is reported to already route Hedera, while
 *  CCTP v2 (fast transfer) support for Hedera is described elsewhere
 *  as still rolling out. This is a fast-moving detail — re-verify
 *  before the demo and update BRIDGE_METHOD_BY_CHAIN accordingly. */
export const BRIDGE_METHOD_BY_CHAIN = {
  hedera: "native",              // no bridging — it's the anchor chain too
  ethereum: "cctp",
  solana: "cctp",
  base: "cctp",                  // Base is a first-class CCTP chain
};

