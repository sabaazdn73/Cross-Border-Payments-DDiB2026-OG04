import { ArrowRight, Clock, DollarSign, Globe } from 'lucide-react';
import { formatAmount, formatCurrency } from '../../utils/formatters';
import { getCurrencyByCode } from '../../data/currencies';

export default function TransferSummaryCard({
  sendAmount,
  fee,
  exchangeRate,
  recipientAmount,
  deliveryTime,
  fromCurrency,
  toCurrency,
  className = '',
}) {
  const fromCur = getCurrencyByCode(fromCurrency);
  const toCur = getCurrencyByCode(toCurrency);

  return (
    <div className={`glass p-5 space-y-4 ${className}`}>
      <h3 className="font-semibold text-white flex items-center gap-2">
        <Globe className="w-4 h-4 text-brand-400" aria-hidden="true" />
        Transfer Summary
      </h3>

      <div className="space-y-3">
        {/* You send */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">You send</span>
          <span className="text-white font-semibold">
            {sendAmount > 0
              ? formatAmount(sendAmount, fromCurrency)
              : `${fromCur?.symbol || fromCurrency}0.00`}
          </span>
        </div>

        {/* Service fee */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm flex items-center gap-1">
            <DollarSign className="w-3 h-3" aria-hidden="true" />
            Service fee
          </span>
          <span className="text-warning-400 text-sm font-medium">
            {fee > 0 ? `- ${formatAmount(fee, fromCurrency)}` : '--'}
          </span>
        </div>

        <div className="border-t border-white/10" />

        {/* Exchange rate */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm flex items-center gap-1">
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
            Exchange rate
          </span>
          <span className="text-accent-400 text-sm font-medium">
            {exchangeRate > 0
              ? `1 ${fromCurrency} = ${exchangeRate.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${toCurrency}`
              : '--'}
          </span>
        </div>

        <div className="border-t border-white/10" />

        {/* Recipient gets */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">Recipient gets</span>
          <div className="text-right">
            <span className="text-success-400 font-bold text-lg">
              {recipientAmount > 0
                ? formatAmount(recipientAmount, toCurrency)
                : `${toCur?.symbol || toCurrency}0.00`}
            </span>
            <p className="text-white/40 text-xs">{toCur?.name}</p>
          </div>
        </div>

        {/* Delivery time */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-white/60 text-sm flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            Estimated delivery
          </span>
          <span className="text-white/80 text-sm">{deliveryTime || '--'}</span>
        </div>
      </div>

      {/* Bottom badge */}
      <div className="pt-2 border-t border-white/10">
        <p className="text-xs text-white/40 text-center">
          🔒 Settlement via Hedera blockchain — no wallet required
        </p>
      </div>
    </div>
  );
}
