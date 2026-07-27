/**
 * A photo with floating notification chips overlaid on it, the hub's
 * hero. Chips deliberately mix moments from both projects (F2F's
 * compliance/settlement anchors, OnChain Oversight's monitoring),
 * since this section introduces the collection, not one product.
 */
export default function NotificationPhotoSection({
  imageSrc = '/hub.jpeg',
  imageAlt = 'Person checking a transfer on their phone',
}) {
  const chips = [
    { text: 'Compliance anchored', top: '8%', left: '5%' },
    { text: 'Anomaly flagged for review', top: '8%', right: '5%' },
    { text: 'Publicly verifiable', bottom: '16%', left: '32%' },
  ];

  return (
    <section style={{ padding: '0' }}>
      <style>{`
        .notif-chip { font-size: 13px; padding: 8px 16px; }
        @media (max-width: 640px) {
          .notif-photo-card { min-height: 260px !important; }
          .notif-chip { font-size: 11px; padding: 6px 11px; gap: 6px !important; }
          .notif-chip .notif-dot { width: 14px !important; height: 14px !important; }
          .notif-caption { font-size: 16px !important; bottom: 14px !important; left: 14px !important; right: 14px !important; }
        }
      `}</style>
      <div
        className="notif-photo-card"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 420,
          borderRadius: 16,
          overflow: 'hidden',
          background: `#0a1428 center / contain no-repeat url(${imageSrc})`,
        }}
        role="img"
        aria-label={imageAlt}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,6,15,0.1) 0%, rgba(5,6,15,0.55) 100%)',
          }}
        />

        {chips.map((chip, i) => (
          <div
            key={i}
            className="notif-chip"
            style={{
              position: 'absolute',
              top: chip.top, left: chip.left, right: chip.right, bottom: chip.bottom,
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(18,20,27,0.85)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(108,86,227,0.35)',
              borderRadius: 999,
              fontWeight: 500, color: '#f2f4f8',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 16px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span
              className="notif-dot"
              style={{
                width: 18, height: 18, borderRadius: '50%',
                background: '#6c56e3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4 10-10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {chip.text}
          </div>
        ))}

        <div
          className="notif-caption"
          style={{
            position: 'absolute', bottom: 24, left: 24, right: 24,
            color: '#ffffff',
          }}
        >
          <p style={{ fontSize: 22, fontWeight: 500, margin: 0, lineHeight: 1.3 }}>
            Every step, provable the moment it happens.
          </p>
        </div>
      </div>
    </section>
  );
}
