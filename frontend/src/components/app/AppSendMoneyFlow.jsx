import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { currencies, getCurrencyByCode } from '../../data/currencies';
import { countries, getCountryByCode } from '../../data/countries';
import { payoutMethods } from '../../data/payoutMethods';
import { calculateServiceFee, calculateRecipientAmount, getDeliveryTime } from '../../utils/calculations';
import { formatAmount } from '../../utils/formatters';
import { transferService } from '../../services/api';
import { saveTransaction } from '../../utils/storage';

const sortedCurrencies = [...currencies].sort((a, b) => a.code.localeCompare(b.code));
const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

/**
 * The same transfer this project's web SendMoney/ReviewTransfer/Payment
 * pages perform, restructured as one compact, step-based native flow
 * instead of separate page navigations -- real calculation utilities,
 * real payout methods, and a real transferService.createTransfer()
 * call, not a mocked submission.
 */
export default function AppSendMoneyFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    amount: '250',
    currency: 'EUR',
    recipientName: '',
    recipientCountry: 'NG',
    receivingCurrency: 'NGN',
    payoutMethod: 'bank_transfer',
  });

  const amountNum = parseFloat(form.amount) || 0;
  const fee = calculateServiceFee(amountNum);
  const recvAmount = calculateRecipientAmount(amountNum, form.currency, form.receivingCurrency, form.payoutMethod);
  const delivery = getDeliveryTime(form.payoutMethod, form.receivingCurrency);
  const fromCur = getCurrencyByCode(form.currency);
  const toCur = getCurrencyByCode(form.receivingCurrency);
  const country = getCountryByCode(form.recipientCountry);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const result = await transferService.createTransfer({
        senderName: 'App Demo User',
        senderCountry: 'PT',
        amount: amountNum,
        currency: form.currency,
        recipientName: form.recipientName || 'Recipient',
        recipientCountry: form.recipientCountry,
        recipientAccountDetails: 'DEMO-APP-ACCOUNT',
        receivingCurrency: form.receivingCurrency,
        payoutMethod: form.payoutMethod,
        purpose: 'Family Support',
      });
      const txnId = result?.data?.id || result?.id || `APP-${Date.now()}`;
      saveTransaction({
        id: txnId,
        recipientName: form.recipientName || 'Recipient',
        recipientCountry: form.recipientCountry,
        amount: amountNum,
        currency: form.currency,
        status: 'processing',
        createdAt: new Date().toISOString(),
      });
      setStep(5);
      setTimeout(() => navigate(`/app`), 1800);
    } catch (e) {
      setError('Could not reach the settlement backend right now. This demo needs the backend running.');
    } finally {
      setSubmitting(false);
    }
  };

  const StepDots = () => (
    <div className="flex items-center gap-1.5 px-5 pb-3">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className={`h-1 rounded-full flex-1 ${s <= step ? 'bg-brand-500' : 'bg-hairline'}`} />
      ))}
    </div>
  );

  if (step === 5) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success-500/15 text-success-400 flex items-center justify-center mb-4">
          <Check className="w-8 h-8" />
        </div>
        <p className="text-lg font-bold text-ink mb-1.5">Transfer initiated</p>
        <p className="text-[13px] text-ink-muted leading-relaxed">Settling now on Hedera. Back to Home in a moment.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <StepDots />
      <div className="flex-1 px-5 overflow-y-auto">
        {step === 1 && (
          <div>
            <p className="text-xs text-ink-muted mb-2">You send</p>
            <div className="flex items-center gap-2 bg-surface border border-hairline rounded-2xl p-4 mb-4">
              <input
                type="text" inputMode="decimal" value={form.amount}
                onChange={(e) => set({ amount: e.target.value.replace(/[^0-9.]/g, '') })}
                className="flex-1 min-w-0 bg-transparent text-2xl font-bold text-ink outline-none font-mono"
              />
              <select
                value={form.currency}
                onChange={(e) => set({ currency: e.target.value })}
                className="bg-surface-2 text-ink text-[13px] font-semibold rounded-full px-3 py-1.5 outline-none"
              >
                {sortedCurrencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>

            <p className="text-xs text-ink-muted mb-2">Recipient gets</p>
            <div className="flex items-center justify-between bg-surface-2 rounded-2xl p-4 mb-5">
              <span className="text-2xl font-bold text-ink font-mono">{formatAmount(recvAmount, form.receivingCurrency)}</span>
              <select
                value={form.receivingCurrency}
                onChange={(e) => set({ receivingCurrency: e.target.value })}
                className="bg-canvas text-ink text-[13px] font-semibold rounded-full px-3 py-1.5 outline-none border border-hairline"
              >
                {sortedCurrencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>

            <div className="flex justify-between text-xs text-ink-muted mb-1.5">
              <span>Fee</span><span className="font-mono">{fromCur?.symbol}{fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-ink-muted mb-5">
              <span>Estimated delivery</span><span>{delivery}</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs text-ink-muted mb-2">Recipient name</p>
            <input
              type="text" value={form.recipientName}
              onChange={(e) => set({ recipientName: e.target.value })}
              placeholder="Full name"
              className="w-full box-border border border-hairline bg-surface rounded-2xl px-4 py-3.5 text-[14.5px] text-ink outline-none mb-5"
            />
            <p className="text-xs text-ink-muted mb-2">Destination country</p>
            <div className="flex flex-wrap gap-2 mb-2 max-h-[280px] overflow-y-auto">
              {sortedCountries.slice(0, 24).map((c) => {
                const sel = c.code === form.recipientCountry;
                return (
                  <button
                    key={c.code}
                    onClick={() => set({ recipientCountry: c.code, receivingCurrency: c.currency })}
                    className={`text-[12.5px] font-semibold rounded-full px-3 py-2 border-[1.5px] ${sel ? 'border-brand-500 bg-brand-500/10 text-brand-500' : 'border-hairline bg-surface text-ink'}`}
                  >
                    {c.flag} {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-xs text-ink-muted mb-2.5">Payout method</p>
            <div className="space-y-2.5">
              {payoutMethods.map((m) => {
                const sel = m.id === form.payoutMethod;
                return (
                  <button
                    key={m.id}
                    onClick={() => set({ payoutMethod: m.id })}
                    className={`w-full text-left flex items-center gap-3 bg-surface border-[1.5px] rounded-2xl p-3.5 ${sel ? 'border-brand-500' : 'border-hairline'}`}
                  >
                    <div className="flex-1">
                      <p className="text-[13.5px] font-semibold text-ink">{m.label}</p>
                      <p className="text-[11.5px] text-ink-muted mt-0.5">{m.description}</p>
                    </div>
                    {sel && <div className="w-4.5 h-4.5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" /></div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="bg-surface border border-hairline rounded-2xl p-4 mb-5">
              {[
                ['Recipient', form.recipientName || '-'],
                ['Country', country?.name],
                ['Payout method', payoutMethods.find((m) => m.id === form.payoutMethod)?.label],
                ['You send', `${fromCur?.symbol}${amountNum.toFixed(2)}`],
                ['Fee', `${fromCur?.symbol}${fee.toFixed(2)}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-hairline last:border-b-0 text-[12.5px]">
                  <span className="text-ink-muted">{label}</span>
                  <span className="font-semibold text-ink">{val}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2.5">
                <span className="text-[13px] font-bold text-ink">Recipient gets</span>
                <span className="text-[15px] font-bold font-mono text-brand-500">{formatAmount(recvAmount, form.receivingCurrency)}</span>
              </div>
            </div>
            {error && <p className="text-xs text-danger-400 mb-3">{error}</p>}
          </div>
        )}
      </div>

      <div className="px-5 pt-3 pb-1 flex-shrink-0">
        <button
          disabled={submitting}
          onClick={() => (step < 4 ? setStep(step + 1) : submit())}
          className="w-full flex items-center justify-center gap-2 bg-brand-gradient text-white text-[14.5px] font-bold py-3.5 rounded-2xl shadow-lg disabled:opacity-60"
        >
          {submitting ? 'Processing...' : step < 4 ? <>Continue <ArrowRight className="w-4 h-4" /></> : 'Confirm & Send'}
        </button>
      </div>
    </div>
  );
}
