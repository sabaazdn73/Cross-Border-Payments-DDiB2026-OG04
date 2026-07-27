/**
 * The hub's hero: the real photo with floating glassmorphism badges
 * scattered around the edges of the frame, deliberately avoiding the
 * center column where the face and phone/hands sit. Five badges mix
 * moments from both projects, evenly spread around the perimeter
 * (both top corners, both mid-sides, bottom-left) rather than boxed
 * into a grid, for a floating, modern feel.
 *
 * The container uses the photo's own aspect ratio (see ASPECT_RATIO)
 * so it always fills edge to edge at any width, keeping every badge
 * in the same safe relative spot regardless of screen size. Badge
 * font-size/padding scale continuously via clamp(), not per-breakpoint.
 *
 * If you swap in a differently-shaped photo, update ASPECT_RATIO and
 * re-check these positions against where the face/hands actually are.
 */
const ASPECT_RATIO = '16 / 9'; // match hub.jpeg's real aspect ratio

const badges = [
  { text: 'Compliance anchored', dot: 'bg-success-400', top: '4%', left: '4%', duration: '3s' },
  { text: 'Mirror Node verified', dot: 'bg-brand-400', top: '4%', right: '4%', duration: '3.8s' },
  { text: 'No black box', dot: 'bg-success-400', top: '42%', left: '2%', duration: '3.3s' },
  { text: 'Anomaly flagged', dot: 'bg-accent-400', top: '42%', right: '2%', duration: '4.2s' },
  { text: 'Publicly verifiable', dot: 'bg-brand-400', bottom: '4%', left: '6%', duration: '3.6s' },
];

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
          font-size: clamp(9px, 2.2vw, 13px);
          padding: clamp(5px, 1vw, 8px) clamp(9px, 2vw, 16px);
          gap: clamp(5px, 0.9vw, 8px);
        }
        .notif-badge-dot {
          width: clamp(6px, 1.2vw, 8px);
          height: clamp(6px, 1.2vw, 8px);
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      {badges.map((b) => (
        <div
          key={b.text}
          className="notif-badge absolute glass rounded-full flex items-center shadow-lg animate-bounce"
          style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom, animationDuration: b.duration }}
        >
          <span className={`notif-badge-dot rounded-full ${b.dot} flex-shrink-0`} />
          <span className="font-medium text-ink whitespace-nowrap">{b.text}</span>
        </div>
      ))}
    </section>
  );
}
