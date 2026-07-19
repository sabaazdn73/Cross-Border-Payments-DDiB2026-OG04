import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatAmount, formatDateShort } from '../../utils/formatters';

export default function TransactionCard({ transaction, className = '' }) {
  return (
    <div className={`glass p-5 hover:bg-white/8 transition-colors ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-mono text-xs text-ink-muted mb-1">{transaction.id}</p>
          <h3 className="font-semibold text-ink">
            {transaction.senderName} → {transaction.recipientName}
          </h3>
        </div>
        <StatusBadge status={transaction.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-ink-muted mb-0.5">You sent</p>
          <p className="font-semibold text-ink">{formatAmount(transaction.amount, transaction.currency)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-muted mb-0.5">Recipient gets</p>
          <p className="font-semibold text-success-400">
            {formatAmount(transaction.recipientAmount, transaction.receivingCurrency)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-hairline">
        <div className="flex items-center gap-1 text-xs text-ink-muted">
          <Calendar className="w-3 h-3" aria-hidden="true" />
          {formatDateShort(transaction.createdAt)}
        </div>
        <Link
          to={`/transaction/${transaction.id}`}
          className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
        >
          View Details
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
