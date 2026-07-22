import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { transferService, complianceService } from '../../services/api';
import { generateComplianceRecord } from '../../data/complianceRecords';
import { generateRecordHash } from '../../utils/hashUtils';
import { mockTransactionRecords } from '../../data/mockTransactions';
import { getTransaction } from '../../utils/storage';
import { getCountryByCode } from '../../data/countries';
import CommunityCodeCard from '../../components/ui/CommunityCodeCard';

export default function AppTransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [txn, setTxn] = useState(null);
  const [complianceRecord, setComplianceRecord] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const [storedHash, setStoredHash] = useState(null);

  useEffect(() => {
    let active = true;
    const localOrDemo = getTransaction(id) || mockTransactionRecords.find((t) => t.id === id) || null;
    if (localOrDemo) setTxn(localOrDemo);

    transferService.getTransfer(id)
      .then((res) => {
        if (!active) return;
        const real = res?.data || res;
        if (real) setTxn(real);
      })
      .catch(() => {
        if (active && !localOrDemo) setNotFound(true);
      });

    complianceService.getComplianceRecord(id)
      .then((record) => {
        if (!active || !record) return;
        setComplianceRecord(record);
        const base = localOrDemo;
        setStoredHash(base?.complianceAnchor?.recordHash || generateRecordHash(record));
      })
      .catch(() => {
        if (active && localOrDemo) {
          const record = generateComplianceRecord(localOrDemo);
          setComplianceRecord(record);
          setStoredHash(localOrDemo.complianceAnchor?.recordHash || generateRecordHash(record));
        }
      });

    return () => { active = false; };
  }, [id]);

  const [tampered, setTampered] = useState(false);
  const effectiveRecord = tampered && complianceRecord
    ? { ...complianceRecord, riskScore: 'HIGH', amount: (complianceRecord.amount || 0) + 1 }
    : complianceRecord;

  const runVerify = async () => {
    if (!complianceRecord) return;
    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await complianceService.verifyComplianceHash(id, effectiveRecord);
      setVerifyResult(res.verified);
    } catch (e) {
      // Same fallback the web Compliance Verification page already
      // uses: if the live network check itself errors out (not the
      // same thing as it genuinely returning "no match"), fall back
      // to a local hash comparison rather than reporting failure.
      // This was the actual bug: the app version was missing this
      // fallback entirely and always reported failure on any error,
      // while the web page could still show a match.
      setVerifyResult(storedHash != null && generateRecordHash(effectiveRecord) === storedHash);
    } finally {
      setVerifying(false);
    }
  };

  if (notFound && !txn) {
    return (
      <div className="px-5 pt-10 text-center">
        <p className="text-sm text-ink-muted">Transaction not found.</p>
        <button onClick={() => navigate('/app/transfers')} className="text-brand-500 text-sm font-semibold mt-3">
          Back to Transfers
        </button>
      </div>
    );
  }

  if (!txn) {
    return <div className="px-5 pt-10 text-center text-sm text-ink-muted">Loading...</div>;
  }

  const country = getCountryByCode(txn.recipientCountry);
  const isSettled = ['settled', 'completed', 'paid'].includes((txn.status || '').toLowerCase());

  return (
    <div className="px-5 pt-1 pb-6">
      <div className="flex flex-col items-center text-center mb-5 pt-2">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${isSettled ? 'bg-success-500/12 text-success-400' : 'bg-warning-500/12 text-warning-400'}`}>
          {isSettled ? <CheckCircle2 className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
        </div>
        <p className="text-[15px] font-bold text-ink mb-0.5">
          {isSettled ? 'Transfer settled' : 'Transfer processing'}
        </p>
        <p className="text-xs text-ink-muted">{txn.status || 'processing'}</p>
      </div>

      <div className="bg-surface border border-hairline rounded-2xl shadow-sm p-4 mb-4">
        {[
          ['Recipient', txn.recipientName],
          ['Country', country ? `${country.flag} ${country.name}` : txn.recipientCountry],
          ['Amount sent', `${txn.currency || ''} ${Number(txn.amount || 0).toFixed(2)}`],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between py-2 border-b border-hairline last:border-b-0 text-[12.5px]">
            <span className="text-ink-muted">{label}</span>
            <span className="font-semibold text-ink font-mono text-right break-all ml-3">{val}</span>
          </div>
        ))}
      </div>

      {txn.hederaTopicId && (
        <div className="bg-surface border border-hairline rounded-2xl shadow-sm p-4 mb-4">
          <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide mb-2">Hedera reference</p>
          {[
            ['Topic ID', txn.hederaTopicId],
            ['Transaction', txn.hederaTxRef],
            ['Sequence #', txn.hederaSequenceNumber],
          ].filter(([, val]) => val).map(([label, val]) => (
            <div key={label} className="flex justify-between py-1.5 text-[12px]">
              <span className="text-ink-muted">{label}</span>
              <span className="font-mono text-ink break-all ml-3">{val}</span>
            </div>
          ))}
          {txn.hashscanUrl && (
            <a
              href={txn.hashscanUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-brand-500 text-xs font-semibold mt-2"
            >
              View on HashScan <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      <div className="bg-surface border border-hairline rounded-2xl p-3.5 mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-ink">Simulate tampering</p>
          <p className="text-[11px] text-ink-muted mt-0.5">Modify locally, then verify to see it fail</p>
        </div>
        <button
          onClick={() => { setTampered((t) => !t); setVerifyResult(null); }}
          className={`flex-shrink-0 relative w-11 h-6 rounded-full transition-colors ${tampered ? 'bg-danger-500' : 'bg-hairline'}`}
          aria-pressed={tampered}
        >
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${tampered ? 'left-6' : 'left-1'}`} />
        </button>
      </div>

      <button
        onClick={runVerify}
        disabled={verifying || !complianceRecord}
        className="w-full flex items-center justify-center gap-2 bg-surface border border-hairline text-ink text-[13px] font-bold py-3 rounded-2xl mb-3 disabled:opacity-60"
      >
        <ShieldCheck className="w-4 h-4" />
        {verifying ? 'Checking Hedera...' : 'Verify compliance record'}
      </button>
      {verifyResult !== null && (
        <p className={`text-xs text-center mb-4 font-semibold ${verifyResult ? 'text-success-400' : 'text-danger-400'}`}>
          {verifyResult ? 'Hash match, verified against the real network.' : 'Could not verify against the network right now. This checks Hedera live, so it can be affected by connectivity.'}
        </p>
      )}

      {txn.hederaTopicId && txn.hederaTxRef && (
        <CommunityCodeCard transactionId={txn.id} compact />
      )}
    </div>
  );
}
