// ═══════════════════════════════════════════════════════════════════
//   backend/services/settlement/__tests__/router.vitest.mjs
//   ───────────────────────────────────────────────────────────────
//   Vitest port of router.test.mjs. Same decision-logic tests, a
//   fake liquidityFetcher is still injected so no real network call
//   happens here -- that boundary doesn't change with the runner.
// ═══════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest';
import { chooseSettlementRail } from '../corridorRouter.mjs';
import { HEDERA_SAFE_AMOUNT_USD } from '../corridorConfig.mjs';

const deepLiquidity = async () => 90_000_000;
const thinLiquidity = async () => 500_000;

describe('chooseSettlementRail', () => {
  it('chooses hedera when partner supports it and amount is within the safe threshold', async () => {
    const decision = await chooseSettlementRail(
      'payout_partner_default',
      HEDERA_SAFE_AMOUNT_USD - 1,
      { liquidityFetcher: deepLiquidity }
    );
    expect(decision.chain).toBe('hedera');
    expect(decision.bridgeMethod).toBe('native');
  });

  it('falls back to ethereum/solana when amount exceeds the Hedera safe threshold', async () => {
    const decision = await chooseSettlementRail(
      'payout_partner_default',
      HEDERA_SAFE_AMOUNT_USD + 1,
      { liquidityFetcher: deepLiquidity }
    );
    expect(decision.chain).not.toBe('hedera');
    expect(['ethereum', 'solana']).toContain(decision.chain);
  });

  it('falls back when the liquidity fetcher itself fails (network hiccup)', async () => {
    const failing = async () => { throw new Error('network down'); };
    const decision = await chooseSettlementRail(
      'payout_partner_default',
      HEDERA_SAFE_AMOUNT_USD - 1,
      { liquidityFetcher: failing }
    );
    expect(decision.chain).toBe('hedera');
    expect(decision.liquidityCheckedUsd).toBeGreaterThan(0);
  });

  it('throws a clear error for an unconfigured partner', async () => {
    await expect(
      chooseSettlementRail('nonexistent_partner', 100, { liquidityFetcher: deepLiquidity })
    ).rejects.toThrow(/Unknown partner/);
  });

  it('every decision carries a human-readable reason', async () => {
    const decision = await chooseSettlementRail(
      'payout_partner_default', 100, { liquidityFetcher: deepLiquidity }
    );
    expect(typeof decision.reason).toBe('string');
    expect(decision.reason.length).toBeGreaterThan(10);
  });

  it('candidatesConsidered only includes chains that are both partner-supported and compliant', async () => {
    const decision = await chooseSettlementRail(
      'payout_partner_default', 100, { liquidityFetcher: deepLiquidity }
    );
    const validChains = ['hedera', 'ethereum', 'solana', 'base', 'bnb'];
    decision.candidatesConsidered.forEach((c) => expect(validChains).toContain(c));
  });
});
