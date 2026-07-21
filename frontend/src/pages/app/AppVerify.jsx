import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search } from 'lucide-react';
import complianceIcon from '../../assets/icons/04-compliance.svg';
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
      navigate(`/transaction/${results[0].id}/verify`);
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="px-5 pt-1 pb-6">
      <div className="bg-surface border border-hairline rounded-[18px] p-4.5 mb-4.5 flex gap-3.5 items-start">
        <img src={complianceIcon} alt="" className="w-10 h-10 rounded-xl flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-ink mb-1">Verify any settlement</p>
          <p className="text-xs text-ink-muted leading-relaxed">
            Every compliance record is hashed and anchored on Hedera Consensus Service.
            Enter a real transaction ID (try TXN-9KF3XQ2) to verify it independently.
          </p>
        </div>
      </div>

      <p className="text-xs text-ink-muted mb-2">Transaction ID</p>
      <div className="flex gap-2 mb-1">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setNotFound(false); }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="TXN-9KF3XQ2"
          className="flex-1 min-w-0 border border-hairline bg-surface rounded-2xl px-4 py-3.5 text-[13px] font-mono text-ink outline-none"
        />
        <button
          onClick={submit}
          className="w-[52px] flex-shrink-0 bg-brand-gradient rounded-2xl flex items-center justify-center text-white"
          aria-label="Verify"
        >
          <Search className="w-[18px] h-[18px]" />
        </button>
      </div>
      {notFound && (
        <p className="text-xs text-danger-400 mb-4">No transaction found with that ID. Try TXN-9KF3XQ2.</p>
      )}

      <p className="text-xs font-bold text-ink-muted uppercase tracking-wide mt-6 mb-2.5">Try an example</p>
      <button
        onClick={() => { setQuery('TXN-9KF3XQ2'); navigate('/transaction/TXN-9KF3XQ2/verify'); }}
        className="border border-hairline bg-surface-2 text-ink rounded-full px-3.5 py-2 text-xs font-semibold"
      >
        TXN-9KF3XQ2
      </button>
    </div>
  );
}
