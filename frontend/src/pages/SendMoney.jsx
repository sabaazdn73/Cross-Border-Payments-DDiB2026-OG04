import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, DollarSign, CreditCard, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FormInput from '../components/ui/FormInput';
import SelectInput from '../components/ui/SelectInput';
import FlagSelectInput from '../components/ui/FlagSelectInput';
import TransferSummaryCard from '../components/transaction/TransferSummaryCard';
import PageHeader from '../components/ui/PageHeader';
import { useTransaction } from '../hooks/useTransaction';
import { useTransferCalculator } from '../hooks/useTransferCalculator';
import { countries } from '../data/countries';
import { currencies } from '../data/currencies';
import { payoutMethods, transferPurposes } from '../data/payoutMethods';

const schema = z.object({
  senderName: z.string().min(2, 'Full name must be at least 2 characters'),
  // Optional: used only to send a receipt, never as part of the payment
  // route. A sender's identity for settlement comes from the licensed
  // payment provider's own KYC, not from this field.
  senderEmail: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  senderCountry: z.string().min(1, 'Select sender country'),
  amount: z.coerce.number({ invalid_type_error: 'Enter a valid amount' }).min(1, 'Minimum amount is 1').max(50000, 'Maximum amount is 50,000'),
  currency: z.string().min(1, 'Select sending currency'),
  recipientName: z.string().min(2, 'Recipient name must be at least 2 characters'),
  // This is where the money actually needs to go — a bank account, a
  // mobile money number, or a pickup ID — never an email address, which
  // is not a payout destination in a card/account-to-account model.
  recipientAccountDetails: z.string().min(4, 'Enter the recipient\'s account or mobile number'),
  recipientCountry: z.string().min(1, 'Select recipient country'),
  receivingCurrency: z.string().min(1, 'Select receiving currency'),
  payoutMethod: z.string().min(1, 'Select a payout method'),
  purpose: z.string().min(1, 'Select transfer purpose'),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms to continue'),
});

// flagCode carries the ISO country code used to render a real SVG
// flag icon (see FlagSelectInput) rather than an emoji, which some
// operating systems (Windows, some Android builds) render as plain
// text instead of a flag.
const countryOptions = countries.map((c) => ({ value: c.code, label: c.name, flagCode: c.code }));
const currencyOptions = currencies.map((c) => {
  // Represent each currency with one country that uses it (first match
  // in the shared countries list) so both selectors draw flags from
  // the same single source of truth.
  const rep = countries.find((co) => co.currency === c.code);
  return { value: c.code, label: `${c.code} (${c.name})`, flagCode: rep?.code };
});
const payoutOptions = payoutMethods.map((m) => ({ value: m.id, label: m.label }));

// The recipient identifier means something different per payout method —
// a bank account number is not a mobile money number is not a pickup ID.
// Labeling it generically as "contact info" (or worse, accepting an email)
// hid this; the field now matches whichever method is actually selected.
const recipientFieldByMethod = {
  bank_transfer: { label: 'Bank Account Number / IBAN', placeholder: 'e.g. PT50 0002 0123 1234 5678 9015 4' },
  mobile_money:  { label: 'Mobile Money Number',        placeholder: 'e.g. +234 801 234 5678' },
  cash_pickup:   { label: 'Recipient ID Number',         placeholder: 'Government-issued ID for pickup verification' },
  wallet:        { label: 'Wallet ID',                   placeholder: 'Recipient\'s digital wallet identifier' },
};
const defaultRecipientField = { label: 'Recipient Account / Mobile Number', placeholder: 'Select a payout method first' };
const purposeOptions = transferPurposes.map((p) => ({ value: p, label: p }));

export default function SendMoney() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useTransaction();

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...formData, amount: formData.amount || '' },
  });

  const watchedAmount = watch('amount');
  const watchedCurrency = watch('currency');
  const watchedReceivingCurrency = watch('receivingCurrency');
  const watchedPayoutMethod = watch('payoutMethod');

  // Fills every field with a realistic, internally-consistent example
  // so the whole flow can be demonstrated by clicking through screens
  // rather than typing — Portugal to Armenia, a corridor with a real
  // named partner (TransFi handles AMD conversion and local payout)
  // and an active regulatory push from the Central Bank of Armenia.
  const fillDemoData = () => {
    const demo = {
      senderName: 'Ana Costa',
      senderEmail: 'ana.costa@example.com',
      senderCountry: 'PT',
      amount: '250',
      currency: 'EUR',
      recipientName: 'Davit Sargsyan',
      recipientAccountDetails: 'AM23 AABC 1010 0000 0012 3456',
      recipientCountry: 'AM',
      receivingCurrency: 'AMD',
      payoutMethod: 'bank_transfer',
      purpose: 'Family Support',
      termsAccepted: true,
    };
    Object.entries(demo).forEach(([field, value]) => setValue(field, value, { shouldValidate: true }));
  };

  const summary = useTransferCalculator(watchedAmount, watchedCurrency, watchedReceivingCurrency, watchedPayoutMethod);

  const onSubmit = (data) => {
    updateFormData(data);
    navigate('/review-transfer');
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-6xl">
          <PageHeader badge="Step 1 of 3" title="Send Money" subtitle="Fill in the transfer details below. No crypto wallet required." />

          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={fillDemoData}
              className="text-sm font-medium text-brand-500 hover:text-brand-600 border border-brand-500/30 hover:border-brand-500/50 rounded-lg px-4 py-2 transition-colors"
            >
              Fill demo data
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">

                {/* Sender Info */}
                <div className="glass p-6">
                  <h2 className="font-bold text-ink mb-5 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Sender Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput id="senderName" label="Full Name" required placeholder="John Doe" error={errors.senderName?.message} {...register('senderName')} />
                    <FormInput id="senderEmail" label="Email Address (optional, for your receipt)" type="email" placeholder="john@example.com" error={errors.senderEmail?.message} {...register('senderEmail')} />
                    <Controller name="senderCountry" control={control} render={({ field }) => (
                      <FlagSelectInput id="senderCountry" label="Country" required options={countryOptions}
                        placeholder="Select country" error={errors.senderCountry?.message} {...field} />
                    )} />
                  </div>
                </div>

                {/* Transfer Amount */}
                <div className="glass p-6">
                  <h2 className="font-bold text-ink mb-5 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Transfer Amount
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput id="amount" label="Amount to Send" type="number" required min="1" step="0.01" placeholder="500.00" error={errors.amount?.message} {...register('amount')} />
                    <Controller name="currency" control={control} render={({ field }) => (
                      <FlagSelectInput id="currency" label="Sending Currency" required options={currencyOptions}
                        placeholder="Select currency" error={errors.currency?.message} {...field} />
                    )} />
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="glass p-6">
                  <h2 className="font-bold text-ink mb-5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Recipient Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput id="recipientName" label="Full Name" required placeholder="Jane Doe" error={errors.recipientName?.message} {...register('recipientName')} />
                    <FormInput id="recipientAccountDetails"
                      label={(recipientFieldByMethod[watchedPayoutMethod] || defaultRecipientField).label}
                      required
                      placeholder={(recipientFieldByMethod[watchedPayoutMethod] || defaultRecipientField).placeholder}
                      error={errors.recipientAccountDetails?.message} {...register('recipientAccountDetails')} />
                    <Controller name="recipientCountry" control={control} render={({ field }) => (
                      <FlagSelectInput id="recipientCountry" label="Recipient Country" required options={countryOptions}
                        placeholder="Select country" error={errors.recipientCountry?.message} {...field} />
                    )} />
                    <Controller name="receivingCurrency" control={control} render={({ field }) => (
                      <FlagSelectInput id="receivingCurrency" label="Receiving Currency" required options={currencyOptions}
                        placeholder="Select currency" error={errors.receivingCurrency?.message} {...field} />
                    )} />
                  </div>
                </div>

                {/* Payout & Purpose */}
                <div className="glass p-6">
                  <h2 className="font-bold text-ink mb-5 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Payout & Purpose
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectInput id="payoutMethod" label="Payout Method" required options={payoutOptions} error={errors.payoutMethod?.message} {...register('payoutMethod')} />
                    <SelectInput id="purpose" label="Purpose of Transfer" required placeholder="Select purpose..." options={purposeOptions} error={errors.purpose?.message} {...register('purpose')} />
                  </div>
                </div>

                {/* Terms */}
                <div className="glass p-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="termsAccepted" className="mt-0.5 w-4 h-4 rounded accent-brand-500 cursor-pointer flex-shrink-0" {...register('termsAccepted')} />
                    <span className="text-sm text-ink-muted leading-relaxed">
                      I agree to the <span className="text-brand-400">Terms of Service</span> and{' '}
                      <span className="text-brand-400">Privacy Policy</span>. I confirm this is a
                      legitimate transfer and the information provided is accurate.
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p role="alert" className="text-xs text-danger-400 mt-2 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-base justify-center">
                  Review Transfer
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <TransferSummaryCard {...summary} />
                  <div className="mt-4 glass p-4">
                    <p className="text-xs text-ink-muted leading-relaxed">
                      🔒 Your payment is processed securely. Network settlement happens automatically —
                      no crypto wallet interaction required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
