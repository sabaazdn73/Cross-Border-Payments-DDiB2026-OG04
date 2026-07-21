import { mockTransactionRecords } from '../data/mockTransactions';

const STORAGE_KEY = 'borderless_transactions';

const getStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  if (!global._mockLocalStorage) {
    global._mockLocalStorage = {
      _data: {},
      getItem(key) { return this._data[key] || null; },
      setItem(key, value) { this._data[key] = String(value); },
      removeItem(key) { delete this._data[key]; },
      clear() { this._data = {}; }
    };
  }
  return global._mockLocalStorage;
};

export const saveTransaction = (transaction) => {
  const existing = getAllTransactions();
  const updated = { ...existing, [transaction.id]: transaction };
  getStorage().setItem(STORAGE_KEY, JSON.stringify(updated));
  return transaction;
};

export const getTransaction = (id) => {
  const all = getAllTransactions();
  return all[id] || null;
};

export const getAllTransactions = () => {
  try {
    const data = getStorage().getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const deleteTransaction = (id) => {
  const existing = getAllTransactions();
  delete existing[id];
  getStorage().setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const clearAllTransactions = () => {
  getStorage().removeItem(STORAGE_KEY);
};

export const searchTransactions = (query) => {
  const all = getAllTransactions();
  const q = query.toLowerCase().trim();
  const localMatches = Object.values(all).filter(
    (t) =>
      t.id?.toLowerCase().includes(q) ||
      t.senderName?.toLowerCase().includes(q) ||
      t.recipientName?.toLowerCase().includes(q) ||
      t.senderEmail?.toLowerCase().includes(q)
  );
  if (localMatches.length > 0) return localMatches;
  // Fall back to the seeded demo record(s) so the "try an example"
  // path works even before this browser has any local history.
  return mockTransactionRecords.filter(
    (t) =>
      t.id?.toLowerCase().includes(q) ||
      t.senderName?.toLowerCase().includes(q) ||
      t.recipientName?.toLowerCase().includes(q)
  );
};
