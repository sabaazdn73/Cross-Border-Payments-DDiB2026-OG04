import { useMemo } from 'react';
import { calculateServiceFee, calculateRecipientAmount, getDeliveryTime } from '../utils/calculations';
import { getExchangeRate } from '../data/exchangeRates';

export const useTransferCalculator = (amount, fromCurrency, toCurrency, payoutMethod) => {
  return useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const rate = getExchangeRate(fromCurrency, toCurrency);

    if (numAmount <= 0) {
      return {
        sendAmount: 0,
        fee: 0,
        exchangeRate: rate,
        recipientAmount: 0,
        deliveryTime: getDeliveryTime(payoutMethod),
        fromCurrency,
        toCurrency,
      };
    }

    const fee = calculateServiceFee(numAmount);
    const recipientAmount = calculateRecipientAmount(numAmount, fromCurrency, toCurrency, payoutMethod);
    const deliveryTime = getDeliveryTime(payoutMethod);

    return {
      sendAmount: numAmount,
      fee,
      exchangeRate: rate,
      recipientAmount,
      deliveryTime,
      fromCurrency,
      toCurrency,
    };
  }, [amount, fromCurrency, toCurrency, payoutMethod]);
};
