import { Loader2 } from 'lucide-react';

export default function PrimaryButton({ children, onClick, type = 'button', disabled = false, loading = false, className = '', size = 'md', ...props }) {
  const sizeClasses = { sm: 'text-sm py-2 px-4', md: 'text-sm py-3 px-6', lg: 'text-base py-4 px-8' };
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      className={`btn-primary ${sizeClasses[size]} ${className}`} aria-busy={loading} {...props}>
      {loading ? (<><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span>Processing...</span></>) : children}
    </button>
  );
}
