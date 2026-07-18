import { getExchangeRate } from '../data/exchangeRates';
import { getPayoutMethodById } from '../data/payoutMethods';

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

export const getDeliveryTime = (payoutMethodId) => {
  const method = getPayoutMethodById(payoutMethodId);
  return method?.deliveryTime || '1-3 business days';
};
