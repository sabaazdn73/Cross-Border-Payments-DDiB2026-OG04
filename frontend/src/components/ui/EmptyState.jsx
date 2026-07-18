import { SearchX } from 'lucide-react';

export default function EmptyState({ icon: Icon = SearchX, title = 'Nothing found', description = '', action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-4 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white/30" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-white/50 text-sm max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
