import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Mail, DollarSign, CheckCircle2, Edit3 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/ui/PageHeader';
import TransferSummaryCard from '../components/transaction/TransferSummaryCard';
import { useTransaction } from '../hooks/useTransaction';
import { countries } from '../data/countries';
import { payoutMethods } from '../data/payoutMethods';

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-hairline last:border-0">
      <span className="text-ink-muted text-sm flex-shrink-0">{label}</span>
      <span className={`text-ink text-sm text-right ${mono ? 'font-mono text-xs text-accent-400' : 'font-medium'}`}>
        {value || 'N/A'}
      </span>
    </div>
  );
}

export default function ReviewTransfer() {
  const navigate = useNavigate();
  const { formData, getTransferSummary } = useTransaction();
  const summary = getTransferSummary();

  const senderCountry = countries.find((c) => c.code === formData.senderCountry);
  const recipientCountry = countries.find((c) => c.code === formData.recipientCountry);
  const payoutMethod = payoutMethods.find((m) => m.id === formData.payoutMethod);

  if (!formData.senderName) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-ink-muted mb-4">No transfer data found. Please start a new transfer.</p>
            <button onClick={() => navigate('/send-money')} className="btn-primary">Start Transfer</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-5xl">
          <PageHeader badge="Step 2 of 3" title="Review Your Transfer" subtitle="Please verify all details before proceeding to payment." />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="glass p-6">
                <h2 className="font-bold text-ink mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-400" aria-hidden="true" />Sender
                </h2>
                <InfoRow label="Full Name" value={formData.senderName} />
                <InfoRow label="Email" value={formData.senderEmail} />
                <InfoRow label="Country" value={senderCountry ? (<span className="inline-flex items-center gap-1.5"><span className={`fi fi-${senderCountry.code.toLowerCase()} rounded-sm`} aria-hidden="true" />{senderCountry.name}</span>) : formData.senderCountry} />
              </div>

              <div className="glass p-6">
                <h2 className="font-bold text-ink mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-400" aria-hidden="true" />Recipient
                </h2>
                <InfoRow label="Full Name" value={formData.recipientName} />
                <InfoRow label="Payout Destination" value={formData.recipientAccountDetails} />
                <InfoRow label="Country" value={recipientCountry ? (<span className="inline-flex items-center gap-1.5"><span className={`fi fi-${recipientCountry.code.toLowerCase()} rounded-sm`} aria-hidden="true" />{recipientCountry.name}</span>) : formData.recipientCountry} />
                <InfoRow label="Payout Method" value={payoutMethod?.label || formData.payoutMethod} />
                <InfoRow label="Purpose" value={formData.purpose} />
              </div>

              <div className="glass p-6">
                <h2 className="font-bold text-ink mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-400" aria-hidden="true" />Transfer Details
                </h2>
                <InfoRow label="You send" value={`${Number(summary.sendAmount).toLocaleString()} ${formData.currency}`} />
                <InfoRow label="Service fee" value={`${summary.fee.toFixed(2)} ${formData.currency}`} />
                <InfoRow label="Exchange rate" value={`1 ${formData.currency} = ${summary.exchangeRate.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${formData.receivingCurrency}`} />
                <InfoRow label="Recipient gets" value={`${Number(summary.recipientAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })} ${formData.receivingCurrency}`} />
                <InfoRow label="Delivery time" value={summary.deliveryTime} />
              </div>

              <div className="glass p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-ink-muted leading-relaxed">
                  By confirming, you authorize this transfer. Compliance verification and blockchain
                  settlement will occur automatically. No crypto wallet interaction is required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate('/send-money')} className="btn-secondary flex-1 justify-center">
                  <Edit3 className="w-4 h-4" aria-hidden="true" />Edit Transfer
                </button>
                <button onClick={() => navigate('/payment')} className="btn-primary flex-1 justify-center">
                  Confirm and Continue
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <TransferSummaryCard {...summary} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
