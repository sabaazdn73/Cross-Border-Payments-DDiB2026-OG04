import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function HashDisplay({ label, hash, className = '' }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <p className="text-xs font-medium text-ink-muted uppercase tracking-wider">{label}</p>}
      <div className="flex items-start gap-2">
        <code className="hash-display flex-1 text-xs leading-relaxed">{hash}</code>
        <button onClick={handleCopy} className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-black/5 text-ink-muted hover:text-ink transition-colors"
          aria-label={copied ? 'Copied!' : 'Copy hash'} title={copied ? 'Copied!' : 'Copy to clipboard'}>
          {copied ? <Check className="w-3.5 h-3.5 text-success-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
