/**
 * The hub's hero: the real photo with floating glassmorphism badges
 * scattered around the edges of the frame, deliberately avoiding the
 * center column where the face and phone/hands sit.
 *
 * Badge style: tinted, translucent glass (brand purple / success
 * blue, the site's only two real accent colors), background alpha
 * kept low enough that the photo reads through, with a stronger
 * blur + saturation and a text-shadow doing the work of keeping the
 * label legible against a busy photo despite the low opacity.
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

// brand-400 / success-400 from tailwind.config.js, pre-split to rgb
// so badge backgrounds can use a low, legible alpha.
const TINTS = {
  brand: { rgb: '136,116,238', dot: '#6c56e3' },   // brand-500 solid dot
  success: { rgb: '111,168,245', dot: '#3d7ee8' }, // success-500 solid dot
};

const badges = [
  { text: 'Compliance anchored', tint: 'success', top: '4%', left: '4%', duration: '3s' },
  { text: 'Mirror Node verified', tint: 'brand', top: '4%', right: '4%', duration: '3.8s' },
  { text: 'No black box', tint: 'success', top: '42%', left: '2%', duration: '3.3s' },
  { text: 'Anomaly flagged', tint: 'brand', top: '42%', right: '2%', duration: '4.2s' },
  { text: 'Publicly verifiable', tint: 'brand', bottom: '4%', left: '6%', duration: '3.6s' },
  { text: 'Independently checkable', tint: 'success', bottom: '4%', right: '6%', duration: '4s' },
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
        containerType: 'inline-size',
      }}
      role="img"
      aria-label={imageAlt}
    >
      <style>{`
        .notif-badge {
          font-size: clamp(6.5px, 2.4cqw, 13px);
          padding: clamp(3px, 1cqw, 8px) clamp(6px, 2.1cqw, 16px);
          gap: clamp(3px, 0.85cqw, 8px);
          backdrop-filter: blur(10px) saturate(160%);
          -webkit-backdrop-filter: blur(10px) saturate(160%);
          text-shadow: 0 1px 3px rgba(0,0,0,0.45);
        }
        .notif-badge-dot {
          width: clamp(4px, 1.2cqw, 8px);
          height: clamp(4px, 1.2cqw, 8px);
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      {badges.map((b) => {
        const t = TINTS[b.tint];
        return (
          <div
            key={b.text}
            className="notif-badge absolute rounded-full flex items-center shadow-lg animate-bounce"
            style={{
              top: b.top, left: b.left, right: b.right, bottom: b.bottom,
              animationDuration: b.duration,
              background: `rgba(${t.rgb}, 0.28)`,
              border: `1px solid rgba(${t.rgb}, 0.55)`,
            }}
          >
            <span className="notif-badge-dot rounded-full flex-shrink-0" style={{ background: t.dot }} />
            <span className="font-medium text-white whitespace-nowrap">{b.text}</span>
          </div>
        );
      })}
    </section>
  );
}
