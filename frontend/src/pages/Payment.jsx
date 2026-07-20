import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Lock, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FormInput from '../components/ui/FormInput';
import PageHeader from '../components/ui/PageHeader';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useTransaction } from '../hooks/useTransaction';
import { saveTransaction } from '../utils/storage';
import { transferService, paymentService } from '../services/api';

const schema = z.object({
  cardholderName: z.string().min(2, 'Enter cardholder name'),
  cardNumber: z
    .string()
    .transform((val) => val.replace(/\s/g, ''))
    .refine((val) => val === '4242424242424242', 'Use test card: 4242 4242 4242 4242'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Use format MM/YY')
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry >= new Date();
    }, 'Card has expired'),
  cvv: z.string().regex(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
});

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
}

function formatExpiry(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 4);
  if (cleaned.length >= 2) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return cleaned;
}

export default function Payment() {
  const navigate = useNavigate();
  const { formData, getTransferSummary, setCompletedTransaction } = useTransaction();
  const summary = getTransferSummary();

  const [paymentState, setPaymentState] = useState('idle');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  // Fills the standard Stripe test card so the payment step can be
  // demonstrated by clicking through, not by typing a card number
  // that has to be remembered or copy-pasted from the docs.
  const fillTestCard = () => {
    setValue('cardholderName', formData.senderName || 'Ana Costa', { shouldValidate: true });
    const testCardNumber = '4242 4242 4242 4242';
    setCardNumber(testCardNumber);
    setValue('cardNumber', testCardNumber, { shouldValidate: true });
    const testExpiry = '12/28';
    setExpiryDate(testExpiry);
    setValue('expiryDate', testExpiry, { shouldValidate: true });
    setValue('cvv', '123', { shouldValidate: true });
  };

  if (!formData.senderName) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-ink-muted mb-4">No transfer data found.</p>
            <button onClick={() => navigate('/send-money')} className="btn-primary">Start Transfer</button>
          </div>
        </main>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setPaymentState('loading');
    try {
      // 1. Process payment (simulated on server)
      await paymentService.processSandboxPayment({
        cardholderName: data.cardholderName,
        cardNumber: data.cardNumber ? data.cardNumber.replace(/\s/g, '') : '',
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        amount: summary.sendAmount,
        currency: formData.currency
      });

      // 2. Submit transfer request to backend
      const response = await transferService.createTransfer({
        ...formData,
        amount: summary.sendAmount
      });

      if (response.success && response.transaction) {
        saveTransaction(response.transaction);
        setCompletedTransaction(response.transaction);
        setPaymentState('success');
        setTimeout(() => navigate(`/transaction/${response.transferId}`), 1500);
      } else {
        setPaymentState('error');
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentState('error');
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-2xl">
          <div className="mb-6 p-4 rounded-xl bg-warning-500/10 border border-warning-500/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-warning-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-warning-400 text-sm">Sandbox Payment Simulation</p>
              <p className="text-ink-muted text-xs mt-0.5">This is a demo environment. No real payment will be processed. Click "Fill test card" below to populate a standard test card automatically.</p>
            </div>
          </div>

          <PageHeader
            badge="Step 3 of 3"
            title="Complete Payment"
            subtitle={`Paying ${formData.currency} ${Number(summary.sendAmount).toFixed(2)} (Sandbox simulation)`}
          />

          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={fillTestCard}
              className="text-sm font-medium text-brand-500 hover:text-brand-600 border border-brand-500/30 hover:border-brand-500/50 rounded-lg px-4 py-2 transition-colors"
            >
              Fill test card
            </button>
          </div>

          {paymentState === 'loading' && (
            <div className="glass p-12 text-center">
              <LoadingSpinner size="lg" message="Processing payment and initiating settlement..." className="mb-4" />
              <p className="text-ink-muted text-sm">Verifying compliance • Routing via Hedera • Initiating payout</p>
            </div>
          )}

          {paymentState === 'success' && (
            <div className="glass p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-success-500/20 border border-success-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10 text-success-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-ink mb-2">Payment Successful!</h2>
              <p className="text-ink-muted">Redirecting to your transaction status...</p>
            </div>
          )}

          {paymentState === 'error' && (
            <div className="glass p-6 mb-4">
              <div className="flex items-center gap-3 text-danger-400">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                <p className="font-semibold">Payment failed. Please try again.</p>
              </div>
            </div>
          )}

          {(paymentState === 'idle' || paymentState === 'error') && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="glass p-4 flex items-start gap-3 bg-accent-500/5 border-accent-500/20">
                <Info className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-ink-muted">
                  <p className="font-semibold text-accent-400 mb-1">Test Card Details</p>
                  <p>Card Number: <span className="font-mono text-ink">4242 4242 4242 4242</span></p>
                  <p>Expiry: <span className="font-mono text-ink">12/28</span> &nbsp; CVV: <span className="font-mono text-ink">123</span></p>
                </div>
              </div>

              <div className="glass p-6 space-y-4">
                <h2 className="font-bold text-ink flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-400" aria-hidden="true" />Card Information
                </h2>

                <FormInput id="cardholderName" label="Cardholder Name" required placeholder="John Doe"
                  error={errors.cardholderName?.message} {...register('cardholderName')} />

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-ink mb-1.5">
                    Card Number <span className="text-danger-400" aria-hidden="true">*</span>
                  </label>
                  <input id="cardNumber" type="text" inputMode="numeric" placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => { const f = formatCardNumber(e.target.value); setCardNumber(f); setValue('cardNumber', f); }}
                    className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                    aria-invalid={errors.cardNumber ? 'true' : 'false'}
                    aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                    autoComplete="cc-number" />
                  {errors.cardNumber && (
                    <p id="cardNumber-error" role="alert" className="text-xs text-danger-400 mt-1.5 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-ink mb-1.5">
                      Expiry Date <span className="text-danger-400" aria-hidden="true">*</span>
                    </label>
                    <input id="expiryDate" type="text" placeholder="MM/YY" value={expiryDate}
                      onChange={(e) => { const f = formatExpiry(e.target.value); setExpiryDate(f); setValue('expiryDate', f); }}
                      className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                      aria-invalid={errors.expiryDate ? 'true' : 'false'} autoComplete="cc-exp" />
                    {errors.expiryDate && <p role="alert" className="text-xs text-danger-400 mt-1.5">{errors.expiryDate.message}</p>}
                  </div>
                  <FormInput id="cvv" label="CVV" type="password" required placeholder="123" maxLength={4}
                    autoComplete="cc-csc" error={errors.cvv?.message} {...register('cvv')} />
                </div>
              </div>

              <div className="glass p-5">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">Total Payment</span>
                  <span className="text-2xl font-mono font-bold text-ink tracking-tight">{formData.currency} {Number(summary.sendAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-muted justify-center">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>256-bit SSL encryption. Your card details are never stored</span>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-base justify-center">
                <Lock className="w-4 h-4" aria-hidden="true" />
                Pay Now: {formData.currency} {Number(summary.sendAmount).toFixed(2)}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
