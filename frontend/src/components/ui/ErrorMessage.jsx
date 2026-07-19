import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ title = 'Error', message, className = '' }) {
  return (
    <div role="alert" className={`flex items-start gap-3 p-4 rounded-xl bg-danger-500/10 border border-danger-500/20 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-danger-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="font-semibold text-danger-400 text-sm">{title}</p>
        {message && <p className="text-ink-muted text-sm mt-0.5">{message}</p>}
      </div>
    </div>
  );
}
