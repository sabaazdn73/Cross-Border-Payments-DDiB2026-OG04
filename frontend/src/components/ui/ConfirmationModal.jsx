import { X, AlertTriangle } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'default', loading = false }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative glass p-6 w-full max-w-md shadow-2xl animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors" aria-label="Close dialog">
          <X className="w-5 h-5" />
        </button>
        {variant === 'danger' && (
          <div className="w-12 h-12 rounded-xl bg-danger-500/20 border border-danger-500/30 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-danger-400" aria-hidden="true" />
          </div>
        )}
        <h2 id="modal-title" className="text-xl font-bold text-ink mb-2">{title}</h2>
        <p className="text-ink-muted text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <SecondaryButton onClick={onClose} size="sm">{cancelLabel}</SecondaryButton>
          <PrimaryButton onClick={onConfirm} loading={loading} size="sm">{confirmLabel}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
