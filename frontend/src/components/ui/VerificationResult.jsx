import { ShieldCheck, ShieldX } from 'lucide-react';

export default function VerificationResult({ isMatch, className = '' }) {
  if (isMatch === null || isMatch === undefined) return null;
  return isMatch ? (
    <div role="status" className={`p-5 rounded-2xl bg-success-500/10 border border-success-500/30 ${className}`} style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.15)' }}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-6 h-6 text-success-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-bold text-success-400 mb-1">Record Verified</h3>
          <p className="text-ink-muted text-sm leading-relaxed">
            The compliance record matches the proof anchored on Hedera. No modification has been detected.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div role="alert" className={`p-5 rounded-2xl bg-danger-500/10 border border-danger-500/30 ${className}`} style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.15)' }}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-danger-500/20 flex items-center justify-center flex-shrink-0">
          <ShieldX className="w-6 h-6 text-danger-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-bold text-danger-400 mb-1">Verification Failed</h3>
          <p className="text-ink-muted text-sm leading-relaxed">
            The current compliance record does not match the proof anchored on Hedera. The record may have been modified.
          </p>
        </div>
      </div>
    </div>
  );
}
