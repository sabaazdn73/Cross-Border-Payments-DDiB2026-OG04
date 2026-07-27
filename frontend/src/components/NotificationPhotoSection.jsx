/**
 * The hub's hero: the real photo with floating glassmorphism badges
 * scattered naturally around it (top-left, top-right, bottom-center),
 * matching the reference composition -- not a rigid row. Badges mix
 * moments from both projects (F2F's compliance/settlement anchors,
 * OnChain Oversight's monitoring), since this introduces the
 * collection, not one product.
 *
 * Positions use small fixed insets (Tailwind spacing tokens), which
 * stay safe at any window width for phrases this short -- no
 * percentage math, no per-breakpoint overlap patching needed.
 */
export default function NotificationPhotoSection({
  imageSrc = '/hub.jpeg',
  imageAlt = 'Person checking a transfer on their phone',
}) {
  return (
    <section
      className="relative w-full h-64 sm:h-[420px] rounded-3xl overflow-hidden bg-[#0a1428]"
      style={{ background: `#0a1428 center / contain no-repeat url(${imageSrc})` }}
      role="img"
      aria-label={imageAlt}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      <div
        className="absolute top-5 left-5 sm:top-10 sm:left-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 shadow-lg animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <span className="w-2 h-2 rounded-full bg-success-400 flex-shrink-0" />
        <span className="text-[11px] sm:text-xs font-medium text-ink whitespace-nowrap">Compliance anchored</span>
      </div>

      <div
        className="absolute top-16 right-5 sm:top-20 sm:right-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 shadow-lg animate-bounce"
        style={{ animationDuration: '4s' }}
      >
        <span className="w-2 h-2 rounded-full bg-accent-400 flex-shrink-0" />
        <span className="text-[11px] sm:text-xs font-medium text-ink whitespace-nowrap">Anomaly flagged</span>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-8 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0" />
        <span className="text-[11px] sm:text-xs font-medium text-ink whitespace-nowrap">Publicly verifiable</span>
      </div>
    </section>
  );
}
