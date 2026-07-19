import { CheckCircle } from 'lucide-react';

export default function SuccessMessage({ title = 'Success', message, className = '' }) {
  return (
    <div role="status" className={`flex items-start gap-3 p-4 rounded-xl bg-success-500/10 border border-success-500/20 ${className}`}>
      <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-semibold text-success-400 text-sm">{title}</p>
        {message && <p className="text-ink-muted text-sm mt-0.5">{message}</p>}
      </div>
    </div>
  );
}
