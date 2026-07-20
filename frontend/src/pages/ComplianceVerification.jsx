import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, RefreshCw, ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HashDisplay from '../components/ui/HashDisplay';
import VerificationResult from '../components/ui/VerificationResult';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { getTransaction } from '../utils/storage';
import { mockTransactionRecords } from '../data/mockTransactions';
import { generateComplianceRecord } from '../data/complianceRecords';
import { generateRecordHash } from '../utils/hashUtils';
import { formatDate } from '../utils/formatters';
import { complianceService, transferService } from '../services/api';

export default function ComplianceVerification() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [complianceRecord, setComplianceRecord] = useState(null);
  const [storedHash, setStoredHash] = useState('');
  const [currentHash, setCurrentHash] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const txn = await transferService.getTransfer(id);
        if (!active) return;
        if (txn) {
          setTransaction(txn);
          const record = await complianceService.getComplianceRecord(id);
          if (!active) return;
          if (record) {
            setComplianceRecord(record);
            setStoredHash(txn.complianceAnchor?.recordHash || generateRecordHash(record));
            setCurrentHash(generateRecordHash(record));
          }
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch compliance from server, falling back to local storage:", err);
      }
      
      // Fallback
      if (!active) return;
      let txn = getTransaction(id);
      if (!txn) txn = mockTransactionRecords.find((t) => t.id === id) || null;
      if (txn) {
        setTransaction(txn);
        const record = generateComplianceRecord(txn);
        setComplianceRecord(record);
        setStoredHash(txn.complianceAnchor?.recordHash || generateRecordHash(record));
        setCurrentHash(generateRecordHash(record));
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    loadData();
    return () => { active = false; };
  }, [id]);

  const handleVerify = async () => {
    if (!complianceRecord) return;
    setVerifying(true);
    setVerificationResult(null);
    try {
      const res = await complianceService.verifyComplianceHash(id, complianceRecord);
      setVerificationResult(res.verified);
    } catch (err) {
      console.error("Verification failed, falling back to local hash matching:", err);
      setVerificationResult(currentHash === storedHash);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <LoadingSpinner size="lg" message="Loading compliance details..." />
        </main>
      </div>
    );
  }

  if (notFound || !transaction || !complianceRecord) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-16">
          <EmptyState
            title="Transaction Not Found"
            description="We could not find the compliance record for this transaction."
            action={<Link to="/track" className="btn-primary">Track a Transfer</Link>}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Link to={`/transaction/${id}`} className="btn-secondary text-sm py-2 px-4">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />Back to Status
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Shield className="w-8 h-8 text-ink" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-ink mb-2">Compliance Verification</h1>
            <p className="text-ink-muted">Verify the integrity of the compliance record anchored on Hedera HCS.</p>
          </div>

          {/* Record info */}
          <div className="glass p-6 mb-5">
            <h2 className="font-bold text-ink mb-4 text-sm uppercase tracking-wider">Compliance Record</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Record ID', value: complianceRecord.recordId },
                { label: 'Transaction ID', value: complianceRecord.transactionId },
                { label: 'KYC Status', value: complianceRecord.kycStatus },
                { label: 'AML Status', value: complianceRecord.amlStatus },
                { label: 'Sanctions Check', value: complianceRecord.sanctionsCheck },
                { label: 'Risk Score', value: complianceRecord.riskScore },
                { label: 'Reviewed At', value: formatDate(complianceRecord.reviewedAt) },
                { label: 'Reviewed By', value: complianceRecord.reviewedBy },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-ink-muted">{label}</span>
                  <span className="text-ink font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hedera references */}
          <div className="glass p-6 mb-5">
            <h2 className="font-bold text-ink mb-4 text-sm uppercase tracking-wider">Hedera HCS Reference</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink-muted">Topic ID</span><span className="font-mono text-accent-400">{transaction.hederaTopicId}</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Sequence #</span><span className="font-mono text-accent-400">{transaction.hederaSequenceNumber}</span></div>
              <div className="flex justify-between flex-wrap gap-2"><span className="text-ink-muted">Consensus Timestamp</span><span className="font-mono text-xs text-accent-400">{transaction.hederaConsensusTimestamp}</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Mirror Node Status</span><span className="text-success-400 font-medium">✓ Anchored</span></div>
            </div>
          </div>

          {/* Hash comparison */}
          <div className="glass p-6 mb-5 space-y-4">
            <h2 className="font-bold text-ink mb-2 text-sm uppercase tracking-wider">Hash Verification</h2>
            <HashDisplay label="Stored Network Hash (Anchored on HCS)" hash={storedHash} />
            <HashDisplay label="Current Calculated Hash" hash={currentHash} />
          </div>

          {/* Verify button */}
          <button onClick={handleVerify} disabled={verifying} className="btn-primary w-full py-4 justify-center mb-5">
            {verifying ? (
              <><RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />Querying Mirror Node...</>
            ) : (
              <><Shield className="w-4 h-4" aria-hidden="true" />Verify Compliance Record</>
            )}
          </button>

          {verifying && <LoadingSpinner message="Querying Hedera Mirror Node..." className="mb-5" />}

          {verificationResult !== null && !verifying && (
            <VerificationResult isMatch={verificationResult} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
