import { describe, it, expect } from 'vitest';
import { generateTxnId, generateHederaTopicId, generateSequenceNumber } from '../utils/generators';

describe('generateTxnId', () => {
  it('generates a string starting with TXN-', () => {
    const id = generateTxnId();
    expect(id).toMatch(/^TXN-/);
  });

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, generateTxnId));
    expect(ids.size).toBe(100);
  });

  it('has correct format with 3 parts', () => {
    const id = generateTxnId();
    const parts = id.split('-');
    expect(parts.length).toBe(3);
    expect(parts[0]).toBe('TXN');
  });
});

describe('generateHederaTopicId', () => {
  it('starts with 0.0.', () => {
    expect(generateHederaTopicId()).toMatch(/^0\.0\.\d+$/);
  });
});

describe('generateSequenceNumber', () => {
  it('returns a numeric string of 4 digits', () => {
    const seq = generateSequenceNumber();
    expect(seq).toMatch(/^\d{4}$/);
  });
});
