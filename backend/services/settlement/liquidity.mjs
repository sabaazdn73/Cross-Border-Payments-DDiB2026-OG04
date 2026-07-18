// ═══════════════════════════════════════════════════════════════════
//   backend/services/settlement/liquidity.mjs
//   ───────────────────────────────────────────────────────────────
//   Real HTTP call to a real public source (DeFiLlama's protocol API)
//   — the same fetch() pattern verify.mjs already uses successfully
//   against the Hedera Mirror Node. This is not mocked data.
//
//   IMPORTANT — sandbox note for whoever reads this: this exact call
//   could not be executed from Claude's development sandbox (network
//   egress there is restricted to a small allowlist of domains and
//   api.llama.fi isn't on it — confirmed with a direct curl returning
//   403). It uses the identical fetch() approach already proven live
//   against Hedera's Mirror Node in verify.mjs, so it is expected to
//   work from a normal machine with full internet access — but it
//   has NOT been run end-to-end yet. Run it once and check the
//   console output before relying on it in the demo.
//
//   Why cached, not live-per-request: DEX liquidity does not move
//   meaningfully minute-to-minute the way an order book does. A
//   15-minute cache is the right engineering choice for a remittance
//   product — not a shortcut. Polling it on every transfer would be
//   wasteful and would not produce a materially different answer.
// ═══════════════════════════════════════════════════════════════════

const CACHE_TTL_MS = 15 * 60 * 1000;   // 15 minutes
let _cache = null;   // { tvlUsd, fetchedAt }

/** Fetches SaucerSwap's TVL from DeFiLlama as a proxy for Hedera's
 *  usable stablecoin liquidity depth. SaucerSwap holds roughly
 *  two-thirds of Hedera's total DeFi liquidity (Messari, Q3 2025),
 *  so this is a reasonable, conservative real-world proxy rather
 *  than an invented number. */
export async function fetchHederaStablecoinLiquidityUsd({ forceRefresh = false } = {}) {
  if (!forceRefresh && _cache && (Date.now() - _cache.fetchedAt) < CACHE_TTL_MS) {
    return _cache.tvlUsd;
  }

  const res = await fetch("https://api.llama.fi/protocol/saucerswap");
  if (!res.ok) {
    throw new Error(
      `DeFiLlama returned ${res.status}. If this keeps failing, fall back to the ` +
      `HEDERA_LIQUIDITY_FALLBACK_USD value in corridorConfig.mjs rather than blocking a demo on it.`
    );
  }
  const data = await res.json();
  // DeFiLlama's protocol endpoint exposes current TVL under tvl (an
  // array of {date, totalLiquidityUSD}) — take the most recent point.
  const series = data.tvl ?? data.currentChainTvls ?? null;
  const tvlUsd = Array.isArray(series) && series.length
    ? series[series.length - 1].totalLiquidityUSD
    : Object.values(data.currentChainTvls ?? {}).reduce((a, b) => a + b, 0);

  if (!tvlUsd || Number.isNaN(tvlUsd)) {
    throw new Error("Could not parse a TVL figure out of the DeFiLlama response — check the response shape.");
  }

  _cache = { tvlUsd, fetchedAt: Date.now() };
  return tvlUsd;
}

/** For tests and for a safe demo fallback if the network call fails
 *  at the wrong moment: the researched, cited figure as of the last
 *  check (Messari, Q3 2025: ~$113.5M total Hedera DeFi TVL, SaucerSwap
 *  ≈ two-thirds of it). Treat this as a conservative estimate, not
 *  a live number — always prefer the live fetch when it succeeds. */
export const RESEARCHED_FALLBACK_TVL_USD = 75_000_000;

