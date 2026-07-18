import { describe, it, expect } from 'vitest';
import {
  calculateServiceFee,
  calculateRecipientAmount,
  calculateTotalFee,
} from '../utils/calculations';

describe('calculateServiceFee', () => {
  it('returns minimum fee for small amounts', () => {
    expect(calculateServiceFee(10)).toBe(4.99);
  });

  it('returns percentage fee for large amounts', () => {
    // 0.5% of 2000 = 10, which is > 4.99
    expect(calculateServiceFee(2000)).toBe(10.0);
  });

  it('returns fixed fee for 500', () => {
    expect(calculateServiceFee(500)).toBe(4.99);
  });
});

describe('calculateRecipientAmount', () => {
  it('converts USD to NGN correctly after fee', () => {
    const amount = 500;
    const result = calculateRecipientAmount(amount, 'USD', 'NGN', 'bank_transfer');
    // fee = 4.99, net = 495.01, rate = 1580, result ≈ 782115.8
    expect(result).toBeGreaterThan(700000);
    expect(result).toBeLessThan(900000);
  });

  it('returns 0 for 0 amount', () => {
    expect(calculateRecipientAmount(0, 'USD', 'NGN', 'bank_transfer')).toBe(0);
  });

  it('handles same currency', () => {
    const result = calculateRecipientAmount(100, 'USD', 'USD', 'bank_transfer');
    // fee = 4.99, net = 95.01, rate = 1 => 95.01
    expect(result).toBeCloseTo(95.01, 0);
  });
});

describe('calculateTotalFee', () => {
  it('adds payout fee for mobile money', () => {
    const base = calculateServiceFee(1000);
    const total = calculateTotalFee(1000, 'mobile_money');
    expect(total).toBeGreaterThan(base);
  });

  it('no extra fee for bank transfer', () => {
    const base = calculateServiceFee(500);
    const total = calculateTotalFee(500, 'bank_transfer');
    expect(total).toBe(base);
  });
});
