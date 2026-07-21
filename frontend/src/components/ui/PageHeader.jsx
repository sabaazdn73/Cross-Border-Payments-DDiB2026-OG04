export default function PageHeader({ badge, title, subtitle, children, className = '' }) {
  return (
    <div className={`text-center mb-10 ${className}`}>
      {badge && (
        <span className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-3">
          {badge}
        </span>
      )}
      {title && <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">{title}</h1>}
      {subtitle && <p className="text-ink-muted text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      {children}
    </div>
  );
}
