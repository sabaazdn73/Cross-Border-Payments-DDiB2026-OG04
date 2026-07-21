import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, AlertCircle } from 'lucide-react';
import { searchTransactions } from '../../utils/storage';

export default function AppVerify() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const submit = () => {
    const q = query.trim();
    if (!q) return;
    const results = searchTransactions(q);
    if (results.length > 0) {
      setNotFound(false);
      navigate(`/app/transaction/${results[0].id}`);
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="px-5 pt-1 pb-6">
      {/* minimal, outline-style hero -- deliberately hollow, not a filled icon badge */}
      <div className="flex flex-col items-center text-center mb-6 pt-2">
        <div className="w-16 h-16 rounded-full border-2 border-brand-500/25 flex items-center justify-center mb-3">
          <ShieldCheck className="w-7 h-7 text-brand-500" strokeWidth={1.6} />
        </div>
        <p className="text-[15px] font-bold text-ink mb-1">Verify any settlement</p>
        <p className="text-xs text-ink-muted leading-relaxed max-w-[280px]">
          Every compliance record is hashed and anchored on Hedera Consensus
          Service. Enter a transaction ID to confirm it independently.
        </p>
      </div>

      <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide mb-2">Transaction ID</p>
      <div className="flex gap-2 mb-1.5">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setNotFound(false); }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="TXN-9KF3XQ2"
          className="flex-1 min-w-0 border border-hairline bg-surface rounded-2xl px-4 py-3.5 text-[13px] font-mono text-ink outline-none focus:border-brand-500/40 transition-colors"
        />
        <button
          onClick={submit}
          className="w-[52px] flex-shrink-0 bg-brand-gradient rounded-2xl flex items-center justify-center text-white shadow-sm"
          aria-label="Verify"
        >
          <Search className="w-[18px] h-[18px]" />
        </button>
      </div>
      {notFound && (
        <div className="flex items-center gap-1.5 mb-4 mt-1">
          <AlertCircle className="w-3.5 h-3.5 text-danger-400 flex-shrink-0" />
          <p className="text-xs text-danger-400">No transaction found with that ID. Try TXN-9KF3XQ2.</p>
        </div>
      )}

      <p className="text-[11px] font-bold text-ink-muted uppercase tracking-wide mt-6 mb-2.5">Try an example</p>
      <button
        onClick={() => { setQuery('TXN-9KF3XQ2'); navigate('/app/transaction/TXN-9KF3XQ2'); }}
        className="border border-hairline bg-surface text-ink rounded-full px-4 py-2 text-xs font-mono font-semibold"
      >
        TXN-9KF3XQ2
      </button>
    </div>
  );
}
