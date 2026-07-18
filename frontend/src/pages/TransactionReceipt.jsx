import { useParams, Link } from 'react-router-dom';
import { Printer, Download, Shield, Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/ui/EmptyState';
import { getTransaction } from '../utils/storage';
import { mockTransactionRecords } from '../data/mockTransactions';
import { formatAmount, formatDate } from '../utils/formatters';
import { countries } from '../data/countries';
import { payoutMethods } from '../data/payoutMethods';

function ReceiptRow({ label, value, mono = false, highlight = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-100/10 last:border-0">
      <span className="text-sm text-white/50 flex-shrink-0">{label}</span>
      <span className={`text-sm text-right break-all ${mono ? 'font-mono text-xs text-accent-400' : highlight ? 'font-semibold text-success-400' : 'text-white font-medium'}`}>
        {value || '—'}
      </span>
    </div>
  );
}

export default function TransactionReceipt() {
  const { id } = useParams();
  let transaction = getTransaction(id);
  if (!transaction) transaction = mockTransactionRecords.find((t) => t.id === id) || null;

  const senderCountry = countries.find((c) => c.code === transaction?.senderCountry);
  const recipientCountry = countries.find((c) => c.code === transaction?.recipientCountry);
  const payoutMethod = payoutMethods.find((m) => m.id === transaction?.payoutMethod);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <EmptyState
            title="Receipt Not Found"
            description="This transaction receipt could not be found."
            action={<Link to="/track" className="btn-primary">Track a Transfer</Link>}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const content = `
BORDERLESS — TRANSACTION RECEIPT
================================
Transaction ID: ${transaction.id}
Date: ${formatDate(transaction.createdAt)}

SENDER
Name: ${transaction.senderName}
Email: ${transaction.senderEmail}
Country: ${senderCountry?.name || transaction.senderCountry}

RECIPIENT
Name: ${transaction.recipientName}
Contact: ${transaction.recipientEmail}
Country: ${recipientCountry?.name || transaction.recipientCountry}
Payout Method: ${payoutMethod?.label || transaction.payoutMethod}

TRANSFER DETAILS
Amount Sent: ${formatAmount(transaction.amount, transaction.currency)}
Service Fee: ${formatAmount(transaction.fee, transaction.currency)}
Exchange Rate: 1 ${transaction.currency} = ${Number(transaction.exchangeRate).toFixed(4)} ${transaction.receivingCurrency}
Recipient Amount: ${formatAmount(transaction.recipientAmount, transaction.receivingCurrency)}

STATUS
Payment: ${transaction.status}
Compliance: ${transaction.complianceStatus}
Settlement: ${transaction.settlementStatus}
Payout: ${transaction.payoutStatus}

HEDERA BLOCKCHAIN RECORD
Topic ID: ${transaction.hederaTopicId}
Sequence #: ${transaction.hederaSequenceNumber}
Consensus Timestamp: ${transaction.hederaConsensusTimestamp}
TX Reference: ${transaction.hederaTxRef}

This is a sandbox demonstration receipt. Not a real financial document.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-3xl">
          {/* Action bar — hidden on print */}
          <div className="no-print flex flex-wrap items-center gap-3 mb-6">
            <Link to={`/transaction/${id}`} className="btn-secondary text-sm py-2 px-4">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />Back to Status
            </Link>
            <div className="flex gap-2 ml-auto">
              <button onClick={handlePrint} className="btn-secondary text-sm py-2 px-4">
                <Printer className="w-4 h-4" aria-hidden="true" />Print
              </button>
              <button onClick={handleDownload} className="btn-secondary text-sm py-2 px-4">
                <Download className="w-4 h-4" aria-hidden="true" />Download
              </button>
              <Link to={`/transaction/${id}/verify`} className="btn-primary text-sm py-2 px-4">
                <Shield className="w-4 h-4" aria-hidden="true" />Verify Compliance
              </Link>
            </div>
          </div>

          {/* Receipt card */}
          <div className="glass p-8 print-receipt">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-white/10">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-black text-xl text-white">Borderless</span>
              </div>
              <p className="text-white/50 text-sm">Transaction Receipt</p>
              <p className="font-mono text-xs text-accent-400 mt-1">{transaction.id}</p>
              <div className="flex justify-center mt-3">
                <StatusBadge status={transaction.status} />
              </div>
            </div>

            {/* Summary amounts */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-white/3">
              <div className="text-center">
                <p className="text-xs text-white/40 mb-1">Amount Sent</p>
                <p className="text-xl font-black text-white">{formatAmount(transaction.amount, transaction.currency)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/40 mb-1">Recipient Gets</p>
                <p className="text-xl font-black text-success-400">{formatAmount(transaction.recipientAmount, transaction.receivingCurrency)}</p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Sender</h3>
                <ReceiptRow label="Name" value={transaction.senderName} />
                <ReceiptRow label="Country" value={senderCountry ? `${senderCountry.flag} ${senderCountry.name}` : transaction.senderCountry} />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Recipient</h3>
                <ReceiptRow label="Name" value={transaction.recipientName} />
                <ReceiptRow label="Country" value={recipientCountry ? `${recipientCountry.flag} ${recipientCountry.name}` : transaction.recipientCountry} />
                <ReceiptRow label="Payout Method" value={payoutMethod?.label || transaction.payoutMethod} />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Transfer Details</h3>
                <ReceiptRow label="Sending Currency" value={transaction.currency} />
                <ReceiptRow label="Receiving Currency" value={transaction.receivingCurrency} />
                <ReceiptRow label="Service Fee" value={formatAmount(transaction.fee, transaction.currency)} />
                <ReceiptRow label="Exchange Rate" value={`1 ${transaction.currency} = ${Number(transaction.exchangeRate).toFixed(4)} ${transaction.receivingCurrency}`} />
                <ReceiptRow label="Date" value={formatDate(transaction.createdAt)} />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Compliance & Settlement</h3>
                <ReceiptRow label="Compliance Status" value={transaction.complianceStatus} highlight />
                <ReceiptRow label="Settlement Status" value={transaction.settlementStatus} highlight />
                <ReceiptRow label="Payout Status" value={transaction.payoutStatus} highlight />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Hedera Blockchain Record</h3>
                <ReceiptRow label="TX Reference" value={transaction.hederaTxRef} mono />
                <ReceiptRow label="HCS Topic ID" value={transaction.hederaTopicId} mono />
                <ReceiptRow label="Sequence #" value={transaction.hederaSequenceNumber} mono />
                <ReceiptRow label="Consensus Timestamp" value={transaction.hederaConsensusTimestamp} mono />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/30">
                Sandbox demonstration only. Not a real financial document.
              </p>
            </div>
          </div>

          <div className="no-print flex justify-center mt-6">
            <Link to="/" className="btn-secondary">
              <Home className="w-4 h-4" aria-hidden="true" />Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
