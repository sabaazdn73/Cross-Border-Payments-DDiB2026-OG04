import { describe, it, expect } from 'vitest';
import { generateRecordHash, verifyRecordHash } from '../utils/hashUtils';

const sampleRecord = {
  recordId: 'CMP-001',
  transactionId: 'TXN-001',
  senderName: 'Alice',
  amount: 500,
  currency: 'USD',
  kycStatus: 'VERIFIED',
};

describe('generateRecordHash', () => {
  it('returns a hex string starting with 0x', () => {
    const hash = generateRecordHash(sampleRecord);
    expect(hash).toMatch(/^sha256:[0-9a-f]+$/);
  });

  it('is deterministic for same input', () => {
    const hash1 = generateRecordHash(sampleRecord);
    const hash2 = generateRecordHash(sampleRecord);
    expect(hash1).toBe(hash2);
  });

  it('produces different hash for modified record', () => {
    const original = generateRecordHash(sampleRecord);
    const modified = generateRecordHash({ ...sampleRecord, amount: 99999 });
    expect(original).not.toBe(modified);
  });
});

describe('verifyRecordHash', () => {
  it('returns isMatch=true for unmodified record', () => {
    const storedHash = generateRecordHash(sampleRecord);
    const { isMatch } = verifyRecordHash(sampleRecord, storedHash);
    expect(isMatch).toBe(true);
  });

  it('returns isMatch=false for tampered record', () => {
    const storedHash = generateRecordHash(sampleRecord);
    const tamperedRecord = { ...sampleRecord, amount: 50000 };
    const { isMatch } = verifyRecordHash(tamperedRecord, storedHash);
    expect(isMatch).toBe(false);
  });

  it('returns both current and stored hash', () => {
    const storedHash = generateRecordHash(sampleRecord);
    const result = verifyRecordHash(sampleRecord, storedHash);
    expect(result.currentHash).toBeDefined();
    expect(result.storedHash).toBeDefined();
  });
});
