// ═══════════════════════════════════════════════════════════════════
//   src/data/settlementSpeed.js
//   ───────────────────────────────────────────────────────────────
//   Per-currency settlement speed, driven by which REAL local instant-
//   payment rail is available at the destination — not a flat "1-2
//   business days" for every bank transfer, which was never accurate
//   for corridors that already have instant rails (SEPA Instant, PIX,
//   UPI...) and quietly wrong in the other direction for the ones
//   that don't.
//
//   `verified: true`  — a named, sourced real-time payment scheme.
//   `verified: false` — no confirmed instant rail; shown as a
//     conservative standard-transfer estimate rather than a guess
//     dressed up as fact. Update this entry once a specific corridor
//     is confirmed rather than assuming speed we haven't checked.
// ═══════════════════════════════════════════════════════════════════

export const settlementSpeedByCurrency = {
  EUR: { rail: 'SEPA Instant',        seconds: 10,   verified: true },
  USD: { rail: 'RTP / FedNow',      seconds: 20,   verified: true },
  GBP: { rail: 'Faster Payments',   seconds: 120,  verified: true },
  INR: { rail: 'UPI',               seconds: 10,   verified: true },
  BRL: { rail: 'Pix',                seconds: 10,   verified: true },
  MXN: { rail: 'SPEI',               seconds: 30,   verified: true },
  SGD: { rail: 'FAST / PayNow',      seconds: 60,   verified: true },
  AUD: { rail: 'NPP',                seconds: 60,   verified: true },
  CAD: { rail: 'Interac e-Transfer', seconds: 90,   verified: true },

  // Mobile money — already effectively instant in these markets;
  // handled by the existing "Mobile Money" payout method, not a bank rail.
  NGN: { rail: 'Mobile Money',       seconds: 120,  verified: true },
  GHS: { rail: 'Mobile Money',       seconds: 120,  verified: true },
  KES: { rail: 'Mobile Money (M-Pesa)', seconds: 60, verified: true },
  UGX: { rail: 'Mobile Money',       seconds: 120,  verified: true },
  TZS: { rail: 'Mobile Money',       seconds: 120,  verified: true },
  BDT: { rail: 'Mobile Money (bKash)', seconds: 120, verified: true },
};

// Conservative default for any currency not in the table above —
// stated honestly as standard bank transfer timing, not a guess at
// an instant rail we haven't confirmed exists for that corridor.
export const DEFAULT_SETTLEMENT = {
  rail: 'Standard bank transfer',
  businessDays: [1, 2],
  verified: false,
};

export function getSettlementEstimate(currencyCode) {
  const fast = settlementSpeedByCurrency[currencyCode];
  if (fast) {
    const label = fast.seconds < 60
      ? `${fast.seconds} seconds`
      : `${Math.round(fast.seconds / 60)} min`;
    return { ...fast, label, description: `via ${fast.rail}` };
  }
  return {
    ...DEFAULT_SETTLEMENT,
    label: `${DEFAULT_SETTLEMENT.businessDays[0]}-${DEFAULT_SETTLEMENT.businessDays[1]} business days`,
    description: 'via standard bank transfer — no confirmed instant rail for this corridor',
  };
}
