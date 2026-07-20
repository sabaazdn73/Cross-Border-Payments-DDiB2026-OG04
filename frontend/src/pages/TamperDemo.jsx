import { useState } from 'react';
import { Shield, AlertTriangle, RefreshCw, Edit3, ExternalLink } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/ui/PageHeader';
import HashDisplay from '../components/ui/HashDisplay';
import VerificationResult from '../components/ui/VerificationResult';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { generateRecordHash } from '../utils/hashUtils';
import { complianceService } from '../services/api';

const ORIGINAL_RECORD = {
  recordId: 'CMP-TXN-DEMO-001',
  transactionId: 'TXN-DEMO-001',
  senderName: 'James Okafor',
  senderEmail: 'james@example.com',
  senderCountry: 'US',
  recipientName: 'Amara Diallo',
  recipientCountry: 'NG',
  amount: 500,
  currency: 'USD',
  purpose: 'Family Support',
  kycStatus: 'VERIFIED',
  amlStatus: 'CLEARED',
  sanctionsCheck: 'PASSED',
  riskScore: 'LOW',
  reviewedBy: 'AUTOMATED_SYSTEM',
};

const TAMPERED_RECORD = {
  ...ORIGINAL_RECORD,
  amount: 50000,      // tampered: amount changed
  purpose: 'UNKNOWN', // tampered: purpose changed
  riskScore: 'HIGH',  // tampered: risk score changed
};

export default function TamperDemo() {
  const [currentRecord, setCurrentRecord] = useState(ORIGINAL_RECORD);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [isTampered, setIsTampered] = useState(false);

  // The "network-anchored" hash is always of the original record
  const anchoredHash = generateRecordHash(ORIGINAL_RECORD);
  const currentHash = generateRecordHash(currentRecord);

  const handleVerify = async () => {
    setVerifying(true);
    setVerificationResult(null);
    try {
      const res = await complianceService.verifyComplianceHash('TXN-DEMO-001', currentRecord);
      setVerificationResult(res.verified);
    } catch (err) {
      console.warn("Backend verification failed, using client-side fallback:", err);
      setVerificationResult(currentHash === anchoredHash);
    } finally {
      setVerifying(false);
    }
  };

  const handleTamper = () => {
    setCurrentRecord(TAMPERED_RECORD);
    setIsTampered(true);
    setVerificationResult(null);
  };

  const handleReset = () => {
    setCurrentRecord(ORIGINAL_RECORD);
    setIsTampered(false);
    setVerificationResult(null);
  };

  const recordFields = [
    { label: 'Sender Name', key: 'senderName' },
    { label: 'Recipient Name', key: 'recipientName' },
    { label: 'Amount', key: 'amount' },
    { label: 'Currency', key: 'currency' },
    { label: 'Purpose', key: 'purpose' },
    { label: 'KYC Status', key: 'kycStatus' },
    { label: 'AML Status', key: 'amlStatus' },
    { label: 'Sanctions Check', key: 'sanctionsCheck' },
    { label: 'Risk Score', key: 'riskScore' },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container-app max-w-4xl">
          <PageHeader
            badge="Security Demo"
            title="Tamper Detection Demo"
            subtitle="See how Hedera HCS makes off-chain compliance records tamper-evident. Modify the record and watch the hash mismatch."
          />

          {/* Info banner */}
          <div className="glass p-4 mb-6 flex items-start gap-3 bg-brand-500/5 border-brand-500/20">
            <Shield className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-ink-muted">
              <p className="font-semibold text-brand-400 mb-1">How This Works</p>
              <p>The compliance record's cryptographic hash was anchored on Hedera HCS at the time of the transaction.
                Any modification to the off-chain record will produce a different hash, revealing the tampering.
                The hash below is generated live from this demo's own record, in your browser, so it's real math,
                not a fixed value. To see actual anchored messages on Hedera's public testnet from this project,
                not a simulation, use the link below.</p>
              <a
                href="https://hashscan.io/testnet/topic/0.0.9617780"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-brand-400 font-medium hover:underline"
              >
                View real anchored records on HashScan (Hedera testnet)
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Current record state */}
            <div className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-ink text-sm uppercase tracking-wider">
                  {isTampered ? 'Modified Record' : 'Original Record'}
                </h2>
                {isTampered && (
                  <span className="text-xs text-danger-400 bg-danger-500/10 border border-danger-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" aria-hidden="true" />Tampered
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {recordFields.map(({ label, key }) => {
                  const original = ORIGINAL_RECORD[key];
                  const current = currentRecord[key];
                  const changed = isTampered && original !== current;
                  return (
                    <div key={key} className={`flex justify-between py-1.5 px-2 rounded-lg text-sm ${changed ? 'bg-danger-500/10 border border-danger-500/20' : ''}`}>
                      <span className="text-ink-muted">{label}</span>
                      <span className={`font-medium ${changed ? 'text-danger-400 line-through mr-2' : 'text-ink'}`}>
                        {changed ? String(original) : String(current)}
                      </span>
                      {changed && <span className="text-danger-300 font-bold">{String(current)}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hash comparison */}
            <div className="space-y-4">
              <div className="glass p-5">
                <h2 className="font-bold text-ink text-sm uppercase tracking-wider mb-4">Hash Comparison</h2>
                <HashDisplay label="Anchored Network Hash (HCS)" hash={anchoredHash} className="mb-4" />
                <HashDisplay
                  label={isTampered ? 'Current Hash: MISMATCH ⚠' : 'Current Hash: Match ✓'}
                  hash={currentHash}
                />
                {isTampered && currentHash !== anchoredHash && (
                  <div className="mt-4 p-3 rounded-xl bg-danger-500/10 border border-danger-500/20">
                    <p className="text-xs text-danger-400 font-semibold">
                      ⚠ Hashes do not match. Tampering detected
                    </p>
                  </div>
                )}
                {!isTampered && (
                  <div className="mt-4 p-3 rounded-xl bg-success-500/10 border border-success-500/20">
                    <p className="text-xs text-success-400 font-semibold">
                      ✓ Hashes match. Record is authentic
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="glass p-5 space-y-2">
                <h3 className="font-semibold text-ink text-sm mb-3">Demo Controls</h3>
                <button onClick={handleVerify} disabled={verifying} className="btn-primary w-full justify-center text-sm py-2.5">
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  {isTampered ? 'Verify Modified Record' : 'Verify Original Record'}
                </button>
                {!isTampered ? (
                  <button onClick={handleTamper} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border border-danger-500/30 text-danger-400 hover:bg-danger-500/10 transition-all">
                    <Edit3 className="w-4 h-4" aria-hidden="true" />
                    Modify Off-Chain Record
                  </button>
                ) : (
                  <button onClick={handleReset} className="btn-secondary w-full justify-center text-sm py-2.5">
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />Reset Demo
                  </button>
                )}
              </div>
            </div>
          </div>

          {verifying && <LoadingSpinner message="Verifying against Hedera HCS..." className="mb-4" />}
          {verificationResult !== null && !verifying && (
            <VerificationResult isMatch={verificationResult} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
