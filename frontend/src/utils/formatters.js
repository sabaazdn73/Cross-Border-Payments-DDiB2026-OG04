import { getCurrencyByCode } from '../data/currencies';

export const formatAmount = (amount, currencyCode) => {
  const currency = getCurrencyByCode(currencyCode);
  const symbol = currency?.symbol || currencyCode;
  if (!amount && amount !== 0) return `${symbol}0.00`;
  if (amount >= 1000000) return `${symbol}${(amount / 1000000).toFixed(2)}M`;
  if (amount >= 1000) return `${symbol}${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  return `${symbol}${Number(amount).toFixed(2)}`;
};

export const formatCurrency = (amount, currencyCode) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return formatAmount(amount, currencyCode);
  }
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }).format(new Date(dateStr));
};

export const formatDateShort = (dateStr) => {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(dateStr));
};

export const formatTime = (dateStr) => {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
  }).format(new Date(dateStr));
};

export const truncateHash = (hash, start = 8, end = 8) => {
  if (!hash || hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
};
