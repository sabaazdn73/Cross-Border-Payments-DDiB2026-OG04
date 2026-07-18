import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, DollarSign, CreditCard, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FormInput from '../components/ui/FormInput';
import SelectInput from '../components/ui/SelectInput';
import TransferSummaryCard from '../components/transaction/TransferSummaryCard';
import PageHeader from '../components/ui/PageHeader';
import { useTransaction } from '../hooks/useTransaction';
import { useTransferCalculator } from '../hooks/useTransferCalculator';
import { countries } from '../data/countries';
import { currencies } from '../data/currencies';
import { payoutMethods, transferPurposes } from '../data/payoutMethods';

const schema = z.object({
  senderName: z.string().min(2, 'Full name must be at least 2 characters'),
  senderEmail: z.string().email('Enter a valid email address'),
  senderCountry: z.string().min(1, 'Select sender country'),
  amount: z.coerce.number({ invalid_type_error: 'Enter a valid amount' }).min(1, 'Minimum amount is 1').max(50000, 'Maximum amount is 50,000'),
  currency: z.string().min(1, 'Select sending currency'),
  recipientName: z.string().min(2, 'Recipient name must be at least 2 characters'),
  recipientContact: z.string().min(5, 'Enter a valid email or phone number'),
  recipientCountry: z.string().min(1, 'Select recipient country'),
  receivingCurrency: z.string().min(1, 'Select receiving currency'),
  payoutMethod: z.string().min(1, 'Select a payout method'),
  purpose: z.string().min(1, 'Select transfer purpose'),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms to continue'),
});

const countryOptions = countries.map((c) => ({ value: c.code, label: `${c.flag} ${c.name}` }));
const currencyOptions = currencies.map((c) => ({ value: c.code, label: `${c.flag} ${c.code} — ${c.name}` }));
const payoutOptions = payoutMethods.map((m) => ({ value: m.id, label: m.label }));
const purposeOptions = transferPurposes.map((p) => ({ value: p, label: p }));

export default function SendMoney() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useTransaction();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...formData, amount: formData.amount || '' },
  });

  const watchedAmount = watch('amount');
  const watchedCurrency = watch('currency');
  const watchedReceivingCurrency = watch('receivingCurrency');
  const watchedPayoutMethod = watch('payoutMethod');

  const summary = useTransferCalculator(watchedAmount, watchedCurrency, watchedReceivingCurrency, watchedPayoutMethod);

  const onSubmit = (data) => {
    updateFormData(data);
    navigate('/review-transfer');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-6xl">
          <PageHeader badge="Step 1 of 3" title="Send Money" subtitle="Fill in the transfer details below. No crypto wallet required." />

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">

                {/* Sender Info */}
                <div className="glass p-6">
                  <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Sender Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput id="senderName" label="Full Name" required placeholder="John Doe" error={errors.senderName?.message} {...register('senderName')} />
                    <FormInput id="senderEmail" label="Email Address" type="email" required placeholder="john@example.com" error={errors.senderEmail?.message} {...register('senderEmail')} />
                    <SelectInput id="senderCountry" label="Country" required options={countryOptions} error={errors.senderCountry?.message} {...register('senderCountry')} />
                  </div>
                </div>

                {/* Transfer Amount */}
                <div className="glass p-6">
                  <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Transfer Amount
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput id="amount" label="Amount to Send" type="number" required min="1" step="0.01" placeholder="500.00" error={errors.amount?.message} {...register('amount')} />
                    <SelectInput id="currency" label="Sending Currency" required options={currencyOptions} error={errors.currency?.message} {...register('currency')} />
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="glass p-6">
                  <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    Recipient Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput id="recipientName" label="Full Name" required placeholder="Jane Doe" error={errors.recipientName?.message} {...register('recipientName')} />
                    <FormInput id="recipientContact" label="Email or Phone Number" required placeholder="jane@example.com or +234..." error={errors.recipientContact?.message} {...register('recipientContact')} />
                    <SelectInput id="recipientCountry" label="Recipient Country" required options={countryOptions} error={errors.recipientCountry?.message} {...register('recipientCountry')} />
                    <SelectInput id="receivingCurrency" label="Receiving Currency" required options={currencyOptions} error={errors.receivingCurrency?.message} {...register('receivingCurrency')} />
                  </div>
                </div>

                {/* Payout & Purpose */}
                <div className="glass p-6">
                  <h2 className="font-bold text-white mb-5 flex items-center gap-2">
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
                    <span className="text-sm text-white/70 leading-relaxed">
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
                    <p className="text-xs text-white/40 leading-relaxed">
                      🔒 Your payment is processed securely. Blockchain settlement happens automatically —
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
