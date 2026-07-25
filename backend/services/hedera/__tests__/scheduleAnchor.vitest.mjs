// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/__tests__/scheduleAnchor.vitest.mjs
//   ───────────────────────────────────────────────────────────────
//   Mocks @hashgraph/sdk and client.mjs so this exercises the real
//   control flow in scheduleAnchor.mjs (build schedule -> first
//   signature -> second signature -> executed becomes true) without
//   any network call. Run with: npx vitest run
// ═══════════════════════════════════════════════════════════════════

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Shared fake-ledger state: tracks how many distinct signers have
// signed the one schedule created in a test, so ScheduleInfoQuery
// can report executedAt only once both have signed — the same
// two-party gate the real HSS enforces.
let signaturesSeen;

function chainable(methods) {
  const obj = {};
  methods.forEach((m) => { obj[m] = vi.fn(() => obj); });
  return obj;
}

vi.mock('../client.mjs', () => ({
  getClient: () => ({ __fakeClient: true }),
  getNetwork: () => 'testnet',
}));

vi.mock('@hashgraph/sdk', () => {
  class TopicMessageSubmitTransaction {
    setTopicId() { return this; }
    setMessage() { return this; }
  }

  class ScheduleCreateTransaction {
    setScheduledTransaction() { return this; }
    setScheduleMemo() { return this; }
    setExpirationTime(t) { this._expirationTime = t; return this; }
    setWaitForExpiry() { return this; }
    async execute() {
      return {
        transactionId: { toString: () => '0.0.1234@1700000000.000000000' },
        getReceipt: async () => ({ scheduleId: { toString: () => '0.0.9999' } }),
      };
    }
  }

  class ScheduleSignTransaction {
    setScheduleId(id) { this._scheduleId = id; return this; }
    freezeWith() { return this; }
    async sign(key) { this._signerKey = key; return this; }
    async execute() {
      signaturesSeen.add(this._signerKey);
      return { getReceipt: async () => ({}) };
    }
  }

  class ScheduleInfoQuery {
    setScheduleId() { return this; }
    async execute() {
      const executed = signaturesSeen.size >= 2;
      return {
        executedAt: executed ? { toDate: () => new Date('2026-01-01T00:00:00.000Z') } : null,
      };
    }
  }

  return {
    ScheduleCreateTransaction,
    ScheduleSignTransaction,
    ScheduleInfoQuery,
    TopicMessageSubmitTransaction,
    Timestamp: {
      fromDate: (d) => ({ _toProtobuf: () => ({}), toDate: () => d }),
    },
  };
});

const { createCompletionSchedule, signCompletionSchedule } = await import('../scheduleAnchor.mjs');

beforeEach(() => {
  signaturesSeen = new Set();
});

describe('createCompletionSchedule', () => {
  it('rejects a record missing recordId or transferRef', async () => {
    await expect(createCompletionSchedule('0.0.1', { transferRef: 'x' })).rejects.toThrow();
    await expect(createCompletionSchedule('0.0.1', { recordId: 'x' })).rejects.toThrow();
  });

  it('returns a scheduleId and a hashscan URL for a valid record', async () => {
    const result = await createCompletionSchedule('0.0.1', {
      recordId: 'CPL-1',
      transferRef: 'TXN-1',
      completedAt: '2026-01-01T00:00:00.000Z',
      sourcePartner: 'source_licensed_partner',
      destinationPartner: 'destination_licensed_partner',
    });
    expect(result.scheduleId).toBe('0.0.9999');
    expect(result.hashscanUrl).toContain('hashscan.io/testnet/transaction/');
    expect(result.recordHash).toMatch(/^sha256:/);
  });
});

describe('signCompletionSchedule — two-party gate', () => {
  it('does not report executed after only one signature', async () => {
    const afterFirst = await signCompletionSchedule('0.0.9999', 'source-key');
    expect(afterFirst.executed).toBe(false);
    expect(afterFirst.executedAt).toBeNull();
  });

  it('reports executed only once the second, distinct signature lands', async () => {
    const afterFirst = await signCompletionSchedule('0.0.9999', 'source-key');
    expect(afterFirst.executed).toBe(false);

    const afterSecond = await signCompletionSchedule('0.0.9999', 'destination-key');
    expect(afterSecond.executed).toBe(true);
    expect(afterSecond.executedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('the same key signing twice does not fake a second signature', async () => {
    await signCompletionSchedule('0.0.9999', 'source-key');
    const afterRepeat = await signCompletionSchedule('0.0.9999', 'source-key');
    expect(afterRepeat.executed).toBe(false);
  });
});
