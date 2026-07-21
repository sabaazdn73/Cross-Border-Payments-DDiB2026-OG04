import { useState } from 'react';
import { Shield, FileText, HelpCircle, RefreshCw } from 'lucide-react';
import { clearAllTransactions } from '../../utils/storage';
import { DOCS_URL } from '../../components/layout/Navbar';

export default function AppProfile() {
  const [cleared, setCleared] = useState(false);

  const resetDemo = () => {
    clearAllTransactions();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  const items = [
    { icon: Shield, label: 'KYC / AML Compliance', href: null },
    { icon: FileText, label: 'Full Documentation', href: DOCS_URL },
    { icon: HelpCircle, label: 'Send Feedback', href: 'mailto:sabaazad93@gmail.com?subject=Cross-Border%20App%20Feedback' },
  ];

  return (
    <div className="px-5 pt-1 pb-6">
      <div className="flex items-center gap-3.5 bg-surface border border-hairline rounded-[18px] p-4 mb-5">
        <span className="w-[52px] h-[52px] rounded-full bg-brand-gradient text-white text-base font-bold flex items-center justify-center flex-shrink-0">
          CB
        </span>
        <div>
          <p className="text-[15px] font-bold text-ink">Sandbox Account</p>
          <p className="text-xs text-brand-500 font-semibold mt-0.5">Hedera testnet</p>
        </div>
      </div>

      <p className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-2.5">About</p>
      <div className="bg-surface border border-hairline rounded-2xl overflow-hidden mb-5">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href || '#'}
            target={item.href?.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline last:border-b-0"
          >
            <span className="w-8 h-8 rounded-lg bg-surface-2 text-ink-muted flex items-center justify-center flex-shrink-0">
              <item.icon className="w-[15px] h-[15px]" />
            </span>
            <span className="flex-1 text-[13.5px] text-ink">{item.label}</span>
          </a>
        ))}
      </div>

      <button
        onClick={resetDemo}
        className="w-full flex items-center justify-center gap-2 bg-surface border border-hairline text-ink text-[13.5px] font-bold py-3.5 rounded-2xl"
      >
        <RefreshCw className="w-4 h-4" />
        {cleared ? 'Demo data cleared' : 'Reset demo data'}
      </button>
      <p className="text-center text-xs text-ink-muted mt-3">
        This clears locally-stored demo transfers only. Real Hedera testnet
        records already anchored are unaffected.
      </p>
    </div>
  );
}
