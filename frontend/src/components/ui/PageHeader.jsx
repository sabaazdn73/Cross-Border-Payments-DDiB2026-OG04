export default function PageHeader({ badge, title, subtitle, children, className = '' }) {
  return (
    <div className={`text-center mb-10 ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30 mb-4">
          {badge}
        </span>
      )}
      {title && <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">{title}</h1>}
      {subtitle && <p className="text-ink-muted text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      {children}
    </div>
  );
}
