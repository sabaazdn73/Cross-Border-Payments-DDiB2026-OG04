import { createContext, useContext, useState, useCallback } from 'react';
import { calculateServiceFee, calculateRecipientAmount, getDeliveryTime } from '../utils/calculations';
import { getExchangeRate } from '../data/exchangeRates';

const TransactionContext = createContext(null);

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error('useTransactionContext must be used within TransactionProvider');
  return ctx;
};

const defaultFormData = {
  senderName: '',
  senderEmail: '',
  senderCountry: 'US',
  amount: '',
  currency: 'USD',
  recipientName: '',
  recipientAccountDetails: '',
  recipientCountry: 'NG',
  receivingCurrency: 'NGN',
  payoutMethod: 'bank_transfer',
  purpose: '',
  termsAccepted: false,
};

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [completedTransaction, setCompletedTransaction] = useState(null);

  const updateFormData = useCallback((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(defaultFormData);
  }, []);

  const getTransferSummary = useCallback(() => {
    const amount = parseFloat(formData.amount) || 0;
    const fee = calculateServiceFee(amount);
    const rate = getExchangeRate(formData.currency, formData.receivingCurrency);
    const recipientAmount = calculateRecipientAmount(
      amount,
      formData.currency,
      formData.receivingCurrency,
      formData.payoutMethod
    );
    const deliveryTime = getDeliveryTime(formData.payoutMethod);

    return {
      sendAmount: amount,
      fee,
      exchangeRate: rate,
      recipientAmount,
      deliveryTime,
      fromCurrency: formData.currency,
      toCurrency: formData.receivingCurrency,
    };
  }, [formData]);

  return (
    <TransactionContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        getTransferSummary,
        completedTransaction,
        setCompletedTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
