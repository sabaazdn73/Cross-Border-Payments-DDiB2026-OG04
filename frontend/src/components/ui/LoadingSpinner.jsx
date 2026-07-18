import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', message, className = '' }) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <Loader2 className={`animate-spin text-brand-400 ${sizeClasses[size]}`} aria-hidden="true" />
      {message && <p className="text-white/60 text-sm">{message}</p>}
      <span className="sr-only">{message || 'Loading...'}</span>
    </div>
  );
}
