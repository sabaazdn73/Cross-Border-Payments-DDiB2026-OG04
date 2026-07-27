/**
 * The hub's hero: the real photo with floating glassmorphism badges
 * scattered naturally around it (top-left, top-right, bottom-center).
 *
 * Two things that made this fragile on mobile before, both fixed here:
 * 1. The container used a fixed height (h-64 / h-[420px]) independent
 *    of the photo's own aspect ratio, so with `contain` the photo
 *    rendered at a different relative scale on every screen width --
 *    a badge safely in the corner on desktop could land on the face
 *    on mobile. Fixed by giving the container the photo's own aspect
 *    ratio, so the image always fills it edge to edge, at any width.
 * 2. Badge font-size/padding jumped at one breakpoint instead of
 *    scaling with the viewport. Fixed with clamp()-based sizing that
 *    scales continuously.
 *
 * If you swap in a differently-shaped photo, update ASPECT_RATIO to
 * match its real width/height so this stays edge-to-edge.
 */
const ASPECT_RATIO = '16 / 9'; // match hub.jpeg's real aspect ratio

export default function NotificationPhotoSection({
  imageSrc = '/hub.jpeg',
  imageAlt = 'Person checking a transfer on their phone',
}) {
  return (
    <section
      className="relative w-full rounded-3xl overflow-hidden bg-[#0a1428]"
      style={{
        aspectRatio: ASPECT_RATIO,
        background: `#0a1428 center / contain no-repeat url(${imageSrc})`,
      }}
      role="img"
      aria-label={imageAlt}
    >
      <style>{`
        .notif-badge {
          font-size: clamp(9px, 2.6vw, 13px);
          padding: clamp(5px, 1.1vw, 8px) clamp(9px, 2.4vw, 16px);
          gap: clamp(5px, 1vw, 8px);
        }
        .notif-badge-dot {
          width: clamp(6px, 1.4vw, 8px);
          height: clamp(6px, 1.4vw, 8px);
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      <div
        className="notif-badge absolute top-[4%] left-[4%] glass rounded-full flex items-center shadow-lg animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <span className="notif-badge-dot rounded-full bg-success-400 flex-shrink-0" />
        <span className="font-medium text-ink whitespace-nowrap">Compliance anchored</span>
      </div>

      <div
        className="notif-badge absolute top-[16%] right-[4%] glass rounded-full flex items-center shadow-lg animate-bounce"
        style={{ animationDuration: '4s' }}
      >
        <span className="notif-badge-dot rounded-full bg-accent-400 flex-shrink-0" />
        <span className="font-medium text-ink whitespace-nowrap">Anomaly flagged</span>
      </div>

      <div
        className="notif-badge absolute bottom-[5%] left-1/2 -translate-x-1/2 glass rounded-full flex items-center shadow-lg animate-bounce"
        style={{ animationDuration: '3.5s' }}
      >
        <span className="notif-badge-dot rounded-full bg-brand-400 flex-shrink-0" />
        <span className="font-medium text-ink whitespace-nowrap">Publicly verifiable</span>
      </div>
    </section>
  );
}
