import { CheckCircle2, Clock, Circle, AlertCircle, Zap, Shield, Globe, ArrowRightLeft, PartyPopper } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const iconMap = {
  CheckCircle: CheckCircle2,
  ShieldCheck: Shield,
  Zap: Zap,
  Globe: Globe,
  ArrowRightLeft: ArrowRightLeft,
  PartyPopper: PartyPopper,
};

const stepStatusConfig = {
  completed: {
    ring: 'border-success-500 bg-success-500/20',
    icon: 'text-success-400',
    connector: 'bg-success-500',
    label: 'text-success-400',
  },
  active: {
    ring: 'border-brand-500 bg-brand-500/20',
    icon: 'text-brand-400',
    connector: 'bg-brand-500/40',
    label: 'text-brand-400',
  },
  pending: {
    ring: 'border-hairline bg-white/5',
    icon: 'text-ink-muted/70',
    connector: 'bg-white/10',
    label: 'text-ink-muted',
  },
  failed: {
    ring: 'border-danger-500 bg-danger-500/20',
    icon: 'text-danger-400',
    connector: 'bg-danger-500',
    label: 'text-danger-400',
  },
};

function StepIcon({ iconName, status }) {
  const Icon = iconMap[iconName] || Circle;
  const config = stepStatusConfig[status] || stepStatusConfig.pending;

  if (status === 'completed') {
    return (
      <div
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${config.ring}`}
        aria-hidden="true"
      >
        <CheckCircle2 className={`w-5 h-5 ${config.icon}`} />
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${config.ring}`}
        aria-hidden="true"
      >
        <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${config.ring}`}
        aria-hidden="true"
      >
        <AlertCircle className={`w-5 h-5 ${config.icon}`} />
      </div>
    );
  }

  return (
    <div
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${config.ring}`}
      aria-hidden="true"
    >
      <Icon className={`w-5 h-5 ${config.icon}`} />
    </div>
  );
}

export default function TransactionStepper({ steps, className = '' }) {
  return (
    <div className={`space-y-0 ${className}`} role="list" aria-label="Transaction progress">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const config = stepStatusConfig[step.status] || stepStatusConfig.pending;

        return (
          <div key={step.id} role="listitem" className="flex gap-4">
            {/* Left: icon + connector */}
            <div className="flex flex-col items-center">
              <StepIcon iconName={step.icon} status={step.status} />
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 transition-all duration-1000 ${config.connector} min-h-8`}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Right: content */}
            <div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h4 className={`font-semibold text-sm ${config.label}`}>{step.title}</h4>
                {step.completedAt && (
                  <span className="text-xs text-ink-muted">{formatDate(step.completedAt)}</span>
                )}
                {step.status === 'active' && (
                  <span className="text-xs text-brand-400 animate-pulse">In progress...</span>
                )}
              </div>
              <p className="text-ink-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
