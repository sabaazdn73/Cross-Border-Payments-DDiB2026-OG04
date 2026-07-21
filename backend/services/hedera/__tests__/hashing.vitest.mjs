// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/__tests__/hashing.vitest.mjs
//   ───────────────────────────────────────────────────────────────
//   Vitest port of hashing.test.mjs, so the actual test runner
//   matches what the project report claims. Same 8 assertions,
//   Vitest's describe/it/expect API instead of node:test.
//   Run with: npx vitest run
// ═══════════════════════════════════════════════════════════════════

import { describe, it, expect } from 'vitest';
import { canonicalHash, pseudoRef } from '../hashing.mjs';

describe('canonicalHash', () => {
  it('same record, different key order -> same hash', () => {
    const a = { outcome: 'PASS', checkType: 'KYC_SENDER', recordId: 'cmp_1' };
    const b = { recordId: 'cmp_1', outcome: 'PASS', checkType: 'KYC_SENDER' };
    expect(canonicalHash(a)).toBe(canonicalHash(b));
  });

  it('nested objects are also order-independent', () => {
    const a = { id: 'x', meta: { z: 1, a: 2 } };
    const b = { meta: { a: 2, z: 1 }, id: 'x' };
    expect(canonicalHash(a)).toBe(canonicalHash(b));
  });

  it('one changed field -> different hash (tamper detection)', () => {
    const original = { recordId: 'cmp_1', outcome: 'PASS' };
    const tampered = { recordId: 'cmp_1', outcome: 'FAIL' };
    expect(canonicalHash(original)).not.toBe(canonicalHash(tampered));
  });

  it('arrays preserve order (order matters inside arrays)', () => {
    const a = { list: [1, 2, 3] };
    const b = { list: [3, 2, 1] };
    expect(canonicalHash(a)).not.toBe(canonicalHash(b));
  });
});

describe('pseudoRef', () => {
  it('same identifier + same pepper -> same reference', () => {
    const pepper = 'a'.repeat(32);
    expect(pseudoRef('+41791234567', pepper)).toBe(pseudoRef('+41791234567', pepper));
  });

  it('same identifier + different pepper -> different reference', () => {
    const ref1 = pseudoRef('+41791234567', 'a'.repeat(32));
    const ref2 = pseudoRef('+41791234567', 'b'.repeat(32));
    expect(ref1).not.toBe(ref2);
  });

  it('rejects a missing or short pepper', () => {
    expect(() => pseudoRef('some-id', '')).toThrow();
    expect(() => pseudoRef('some-id', 'short')).toThrow();
  });

  it('output is a fixed-length hex string, not the raw identifier', () => {
    const ref = pseudoRef('+41791234567', 'a'.repeat(32));
    expect(ref.length).toBe(24);
    expect(ref).not.toMatch(/41791234567/);
  });
});
