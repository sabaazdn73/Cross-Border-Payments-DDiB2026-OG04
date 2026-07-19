import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Shield, SkipForward, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TransactionStepper from '../components/transaction/TransactionStepper';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { getTransaction } from '../utils/storage';
import { mockTransactionRecords } from '../data/mockTransactions';
import { transferService } from '../services/api';
import { transactionProgressSteps } from '../data/progressSteps';
import { formatDate, formatAmount } from '../utils/formatters';

const STEP_INTERVAL_MS = 3000;

function buildSteps(completedCount, isFailed) {
  return transactionProgressSteps.map((step, i) => {
    let status = 'pending';
    if (i < completedCount) status = 'completed';
    else if (i === completedCount && !isFailed) status = 'active';
    else if (isFailed && i === completedCount) status = 'failed';
    return { ...step, status, completedAt: i < completedCount ? new Date(Date.now() - (completedCount - i) * 8000).toISOString() : null };
  });
}

export default function TransactionStatus() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [simDone, setSimDone] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchTransaction = async () => {
      try {
        const txn = await transferService.getTransfer(id);
        if (!active) return;
        if (txn) {
          setTransaction(txn);
          if (txn.status === 'completed') {
            setCompletedSteps(transactionProgressSteps.length);
            setSimDone(true);
          } else {
            setCompletedSteps(1);
          }
          return;
        }
      } catch (err) {
        console.warn("Could not fetch transaction from server, falling back to local storage:", err);
      }
      
      // Fallback
      if (!active) return;
      let txn = getTransaction(id);
      if (!txn) txn = mockTransactionRecords.find((t) => t.id === id) || null;
      if (txn) {
        setTransaction(txn);
        if (txn.status === 'completed') {
          setCompletedSteps(transactionProgressSteps.length);
          setSimDone(true);
        } else {
          setCompletedSteps(1);
        }
      } else {
        setNotFound(true);
      }
    };

    fetchTransaction();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (simDone || completedSteps >= transactionProgressSteps.length || !transaction) return;
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => {
        const next = prev + 1;
        if (next >= transactionProgressSteps.length) setSimDone(true);
        return next;
      });
    }, STEP_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [completedSteps, simDone, transaction]);

  const handleSkip = () => {
    setCompletedSteps(transactionProgressSteps.length);
    setSimDone(true);
  };

  const steps = buildSteps(completedSteps, false);
  const currentStatus = simDone ? 'completed' : 'processing';

  if (notFound) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <EmptyState
            title="Transaction Not Found"
            description={`We couldn't find transaction ${id}. It may have been cleared or the ID is incorrect.`}
            action={<Link to="/track" className="btn-primary">Track a Transfer</Link>}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <LoadingSpinner size="lg" message="Loading transaction..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-4xl">

          {/* Header */}
          <div className="glass p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs text-ink-muted mb-1">Transaction ID</p>
                <p className="font-mono text-sm text-accent-400 mb-2">{transaction.id}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={currentStatus} />
                  <span className="text-ink-muted text-xs">{formatDate(transaction.createdAt)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-muted mb-1">Amount</p>
                <p className="text-2xl font-black text-ink">{formatAmount(transaction.amount, transaction.currency)}</p>
                <p className="text-sm text-success-400">→ {formatAmount(transaction.recipientAmount, transaction.receivingCurrency)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-hairline">
              <div><p className="text-xs text-ink-muted mb-1">Sender</p><p className="text-sm text-ink font-medium">{transaction.senderName}</p></div>
              <div><p className="text-xs text-ink-muted mb-1">Recipient</p><p className="text-sm text-ink font-medium">{transaction.recipientName}</p></div>
              <div><p className="text-xs text-ink-muted mb-1">Est. Delivery</p><p className="text-sm text-ink font-medium">{transaction.estimatedDelivery}</p></div>
              <div><p className="text-xs text-ink-muted mb-1">Payout Method</p><p className="text-sm text-ink font-medium capitalize">{transaction.payoutMethod?.replace('_', ' ')}</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stepper */}
            <div className="lg:col-span-2 glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-ink">Settlement Progress</h2>
                {!simDone && (
                  <button onClick={handleSkip} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                    <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
                    Skip to complete
                  </button>
                )}
                {simDone && (
                  <span className="flex items-center gap-1.5 text-xs text-success-400">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    All steps complete
                  </span>
                )}
              </div>
              <TransactionStepper steps={steps} />
            </div>

            {/* Side actions */}
            <div className="space-y-4">
              <div className="glass p-5">
                <h3 className="font-semibold text-ink mb-3 text-sm">Transaction Actions</h3>
                <div className="space-y-2">
                  <Link to={`/transaction/${transaction.id}/receipt`} className="btn-secondary w-full justify-center text-sm py-2.5">
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    View Receipt
                  </Link>
                  <Link to={`/transaction/${transaction.id}/verify`} className="btn-secondary w-full justify-center text-sm py-2.5">
                    <Shield className="w-4 h-4" aria-hidden="true" />
                    Verify Compliance
                  </Link>
                </div>
              </div>

              <div className="glass p-5 text-xs text-ink-muted space-y-2">
                <p className="font-semibold text-ink-muted">Hedera Settlement</p>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>Topic ID</span><span className="text-accent-400 font-mono truncate ml-2">{transaction.hederaTopicId}</span></div>
                  <div className="flex justify-between"><span>Seq #</span><span className="text-accent-400 font-mono">{transaction.hederaSequenceNumber}</span></div>
                  {transaction.settlementChain && (
                    <div className="flex justify-between"><span>Settlement Rail</span><span className="text-accent-400 font-bold capitalize">{transaction.settlementChain}</span></div>
                  )}
                  {transaction.settlementBridgeMethod && (
                    <div className="flex justify-between"><span>Bridge Method</span><span className="text-accent-400 font-mono">{transaction.settlementBridgeMethod}</span></div>
                  )}
                </div>
                {transaction.settlementReason && (
                  <p className="text-[10px] text-ink-muted border-t border-hairline pt-1.5 mt-1.5 leading-relaxed">{transaction.settlementReason}</p>
                )}
                {transaction.settlementNote && (
                  <p className="text-[10px] text-warning-400/80 border-t border-hairline pt-1.5 mt-1.5 leading-relaxed">⚠️ {transaction.settlementNote}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
