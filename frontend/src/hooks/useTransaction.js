import { useTransactionContext } from '../context/TransactionContext';

export const useTransaction = () => {
  return useTransactionContext();
};
