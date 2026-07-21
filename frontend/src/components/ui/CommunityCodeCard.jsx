import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Users } from 'lucide-react';
import { communityService } from '../../services/api';

/**
 * Shown once, right after a transaction has a real Hedera anchor.
 * Generates the Community Usage Code via the backend (which enforces
 * the real-anchor requirement and the "only once, ever" rule itself --
 * this component just displays whatever the backend allows). Not the
 * Hedera hash: that's public on HashScan and proves nothing about who
 * is asking, which is exactly why a separate code exists.
 */
export default function CommunityCodeCard({ transactionId, compact = false }) {
  const [code, setCode] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    if (!transactionId) return;
    communityService.generateCode(transactionId)
      .then((res) => { if (active) setCode(res.code); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [transactionId]);

  const copy = useCallback(() => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  if (loading) return null;
  // A 409 here means a code already existed for this transaction --
  // it was shown once, previously, and genuinely cannot be shown
  // again. That's working as designed, not a failure to surface.
  if (error && !code) return null;

  return (
    <div className={`bg-brand-500/5 border border-brand-500/20 rounded-2xl ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-brand-500" aria-hidden="true" />
        <span className="text-xs font-bold text-brand-500 uppercase tracking-wide">Community Usage Purpose</span>
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 font-mono text-sm font-semibold text-ink bg-surface border border-hairline rounded-lg px-3 py-2 truncate">
          {code}
        </code>
        <button
          onClick={copy}
          className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-500 text-white flex items-center justify-center"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-xs text-ink-muted mt-2 leading-relaxed">
        Copy this code to share your experience in the Community section. Generated once for this successful, Hedera-anchored transaction, shown only this one time, and cannot be recovered if lost.
      </p>
    </div>
  );
}
