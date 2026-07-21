import { useEffect, useRef } from 'react';

/**
 * A stylized abstract globe (radial-gradient sphere + a lat/long grid
 * masked into a circle), not a photorealistic 3D earth. This is a
 * deliberate style choice: a data-visualization dashboard look
 * instead of a literal rendered planet.
 *
 * "Rotation" here is a genuine animated illusion, not decoration for
 * its own sake: the grid's background-position slides continuously,
 * and the highlight sweeps with it, so the sphere reads as turning.
 * Small satellite dots orbit the rim on an elliptical path to sell
 * the same illusion further and double as "in-flight transaction"
 * motifs.
 */
export default function StyledGlobe({ size = 360 }) {
  const orbitRef = useRef(null);

  useEffect(() => {
    let raf;
    let angle = 0;
    const el = orbitRef.current;
    if (!el) return;
    const dots = el.querySelectorAll('.orbit-dot');
    const animate = () => {
      angle += 0.006;
      dots.forEach((dot, i) => {
        const offset = (i / dots.length) * Math.PI * 2;
        const a = angle + offset;
        const rx = size * 0.56;
        const ry = size * 0.2;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        const scale = 0.55 + 0.45 * ((Math.sin(a) + 1) / 2);
        const z = Math.sin(a) > 0 ? 3 : 1;
        dot.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        dot.style.zIndex = z;
        dot.style.opacity = 0.35 + 0.65 * scale;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div style={{ position: 'relative', width: size, height: size }} aria-hidden="true">
      <style>{`
        @keyframes globeSpin {
          from { background-position: 0 0, 0 0; }
          to { background-position: -160px 0, 0 -160px; }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes globePing {
          0%, 100% { opacity: .3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>

      {/* outer glow ring */}
      <div
        style={{
          position: 'absolute', inset: -14,
          borderRadius: '50%',
          border: '1px solid rgba(91,141,255,0.25)',
          animation: 'ringPulse 3.2s ease-in-out infinite',
        }}
      />

      {/* the sphere */}
      <div
        style={{
          width: size, height: size, borderRadius: '50%', position: 'relative', overflow: 'hidden',
          background: `
            radial-gradient(circle at 32% 28%, rgba(91,141,255,0.55), transparent 55%),
            radial-gradient(circle at 68% 72%, rgba(201,162,77,0.18), transparent 50%),
            linear-gradient(160deg, #0f1a33 0%, #060a14 70%)`,
          boxShadow: 'inset -18px -18px 50px rgba(0,0,0,0.55), 0 0 90px rgba(47,95,224,0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 40px),
              repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 40px)`,
            WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 78%)',
            maskImage: 'radial-gradient(circle, black 60%, transparent 78%)',
            animation: 'globeSpin 9s linear infinite',
          }}
        />
        {[
          { top: '22%', left: '28%', delay: '0s' },
          { top: '64%', left: '70%', delay: '0.8s' },
          { top: '70%', left: '22%', delay: '1.6s' },
          { top: '38%', left: '58%', delay: '1.1s' },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', width: 8, height: 8, borderRadius: '50%',
              background: '#5b8dff', boxShadow: '0 0 12px #5b8dff',
              top: p.top, left: p.left,
              animation: `globePing 2.4s ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* orbiting satellite dots (in-flight transactions) */}
      <div ref={orbitRef} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="orbit-dot"
            style={{
              position: 'absolute', width: 6, height: 6, borderRadius: '50%',
              background: '#c9a24d', boxShadow: '0 0 8px #c9a24d',
              top: -3, left: -3,
            }}
          />
        ))}
      </div>

      {/* floating anchor status card */}
      <div
        style={{
          position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
          background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 11, whiteSpace: 'nowrap', color: '#f2f4f8',
          fontFamily: "'JetBrains Mono', monospace",
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ecf8e' }} />
        <span style={{ color: '#9aa4b8' }}>seq #4</span>
        <span style={{ fontWeight: 600 }}>routing anchored</span>
      </div>
    </div>
  );
}
