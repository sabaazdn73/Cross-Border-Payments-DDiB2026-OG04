// Mock exchange rates relative to USD
export const exchangeRates = {
  USD: 1.0, GBP: 0.79, EUR: 0.92, NGN: 1580.0, GHS: 15.2,
  KES: 129.5, ZAR: 18.6, UGX: 3750.0, TZS: 2680.0, ETB: 57.5,
  EGP: 47.8, MAD: 10.1, INR: 83.2, PHP: 56.5, MXN: 17.3,
  BRL: 5.1, COP: 3950.0, CNY: 7.25, JPY: 149.5, SGD: 1.35,
  AUD: 1.55, CAD: 1.36, AED: 3.67, PKR: 278.0, IDR: 15750.0,
  ARS: 1000.0, KRW: 1350.0, SAR: 3.75, BDT: 118.0, VND: 24500.0, AMD: 377.0,
  THB: 34.5, MYR: 4.4, HKD: 7.8, KZT: 480.0, UZS: 12700.0,
};

export const getExchangeRate = (fromCurrency, toCurrency) => {
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  return toRate / fromRate;
};

export const convertAmount = (amount, fromCurrency, toCurrency) => {
  const rate = getExchangeRate(fromCurrency, toCurrency);
  return amount * rate;
};
