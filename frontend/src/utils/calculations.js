import { getExchangeRate } from '../data/exchangeRates';
import { getPayoutMethodById } from '../data/payoutMethods';
import { getSettlementEstimate } from '../data/settlementSpeed';

export const SERVICE_FEE_FIXED = 4.99;
export const SERVICE_FEE_PERCENT = 0.005;

export const calculateServiceFee = (amount) => {
  const percentFee = amount * SERVICE_FEE_PERCENT;
  return Math.max(SERVICE_FEE_FIXED, parseFloat(percentFee.toFixed(2)));
};

export const calculatePayoutFee = (amount, payoutMethodId) => {
  const method = getPayoutMethodById(payoutMethodId);
  if (!method || !method.fee) return 0;
  return parseFloat(((amount * method.fee) / 100).toFixed(2));
};

export const calculateTotalFee = (amount, payoutMethodId) => {
  return parseFloat(
    (calculateServiceFee(amount) + calculatePayoutFee(amount, payoutMethodId)).toFixed(2)
  );
};

export const calculateRecipientAmount = (amount, fromCurrency, toCurrency, payoutMethodId) => {
  if (amount <= 0) return 0;
  const fee = calculateTotalFee(amount, payoutMethodId);
  const netAmount = amount - fee;
  if (netAmount <= 0) return 0;
  const rate = getExchangeRate(fromCurrency, toCurrency);
  return parseFloat((netAmount * rate).toFixed(2));
};

// Delivery time now reflects the REAL fastest available rail for the
// destination currency, not a flat estimate for every bank transfer.
// A payout to EUR via SEPA Instant and a payout to a currency with no
// confirmed instant rail are genuinely different — showing the same
// "1-2 business days" for both was inaccurate in both directions.
export const getDeliveryTime = (payoutMethodId, toCurrency) => {
  const method = getPayoutMethodById(payoutMethodId);

  // Mobile money and cash pickup already carry their own realistic
  // estimate per method — only "bank_transfer" varies by which local
  // instant-payment rail (if any) the destination currency has.
  if (payoutMethodId === 'bank_transfer' && toCurrency) {
    const estimate = getSettlementEstimate(toCurrency);
    return estimate.verified
      ? `${estimate.label} (${estimate.rail})`
      : method?.deliveryTime || '1-2 business days';
  }

  return method?.deliveryTime || '1-3 business days';
};
