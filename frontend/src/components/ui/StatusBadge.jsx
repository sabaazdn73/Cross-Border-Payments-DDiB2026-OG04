const statusConfig = {
  pending: { label: 'Pending', classes: 'bg-warning-500/20 text-warning-400 border-warning-500/30' },
  processing: { label: 'Processing', classes: 'bg-brand-500/20 text-brand-400 border-brand-500/30' },
  completed: { label: 'Completed', classes: 'bg-success-500/20 text-success-400 border-success-500/30' },
  failed: { label: 'Failed', classes: 'bg-danger-500/20 text-danger-400 border-danger-500/30' },
  verified: { label: 'Verified', classes: 'bg-success-500/20 text-success-400 border-success-500/30' },
  unverified: { label: 'Unverified', classes: 'bg-warning-500/20 text-warning-400 border-warning-500/30' },
  settled: { label: 'Settled', classes: 'bg-accent-500/20 text-accent-400 border-accent-500/30' },
  paid: { label: 'Paid', classes: 'bg-success-500/20 text-success-400 border-success-500/30' },
  cleared: { label: 'Cleared', classes: 'bg-success-500/20 text-success-400 border-success-500/30' },
};

export default function StatusBadge({ status, className = '' }) {
  const config = statusConfig[status?.toLowerCase()] || {
    label: status || 'Unknown',
    classes: 'bg-white/10 text-white/60 border-white/20',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.classes} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {config.label}
    </span>
  );
}
