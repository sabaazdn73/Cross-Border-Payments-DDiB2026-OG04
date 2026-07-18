import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { saveTransaction, getTransaction, searchTransactions, clearAllTransactions } from '../utils/storage';

const mockTxn = {
  id: 'TXN-TEST-001',
  senderName: 'Test Sender',
  senderEmail: 'test@example.com',
  recipientName: 'Test Recipient',
  amount: 100,
  currency: 'USD',
  status: 'completed',
};

describe('LocalStorage storage utils', () => {
  beforeEach(() => clearAllTransactions());
  afterEach(() => clearAllTransactions());

  it('saves and retrieves a transaction', () => {
    saveTransaction(mockTxn);
    const retrieved = getTransaction('TXN-TEST-001');
    expect(retrieved).not.toBeNull();
    expect(retrieved.id).toBe('TXN-TEST-001');
    expect(retrieved.senderName).toBe('Test Sender');
  });

  it('returns null for a non-existent transaction', () => {
    expect(getTransaction('TXN-NONEXISTENT')).toBeNull();
  });

  it('searches by transaction ID', () => {
    saveTransaction(mockTxn);
    const results = searchTransactions('TXN-TEST-001');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('TXN-TEST-001');
  });

  it('searches by sender name', () => {
    saveTransaction(mockTxn);
    const results = searchTransactions('Test Sender');
    expect(results.length).toBeGreaterThan(0);
  });

  it('returns empty array for no match', () => {
    saveTransaction(mockTxn);
    const results = searchTransactions('XXXXNOTFOUND');
    expect(results).toHaveLength(0);
  });
});
