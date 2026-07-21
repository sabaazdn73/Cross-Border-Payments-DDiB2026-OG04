import { useEffect, useRef } from 'react';

/**
 * A stylized abstract globe -- layered radial-gradient shading (no
 * lat/long grid, removed per request) built to read as a lit sphere:
 * a bright specular highlight, a mid-tone lit face, a dark shadow
 * side, and a soft rim-light on the terminator edge.
 *
 * Rotation is now carried entirely by the specular highlight sweeping
 * across the sphere in an arc (the light source appears to move
 * as the sphere turns under it) plus the orbiting satellite dots,
 * since there's no grid left to slide.
 */
export default function StyledGlobe({ size = 360 }) {
  const orbitRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    let raf;
    let angle = 0;
    const orbitEl = orbitRef.current;
    const highlightEl = highlightRef.current;
    if (!orbitEl) return;
    const dots = orbitEl.querySelectorAll('.orbit-dot');
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

      if (highlightEl) {
        const hx = 50 + 34 * Math.cos(angle * 0.5);
        const hy = 32 + 10 * Math.sin(angle * 0.5);
        highlightEl.style.background = `radial-gradient(circle at ${hx}% ${hy}%, rgba(140,180,255,0.65), transparent 55%)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div style={{ position: 'relative', width: size, height: size }} aria-hidden="true">
      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes globePing {
          0%, 100% { opacity: .3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>

      <div
        style={{
          position: 'absolute', inset: -14,
          borderRadius: '50%',
          border: '1px solid rgba(91,141,255,0.25)',
          animation: 'ringPulse 3.2s ease-in-out infinite',
        }}
      />

      <div
        style={{
          width: size, height: size, borderRadius: '50%', position: 'relative', overflow: 'hidden',
          background: `
            radial-gradient(circle at 68% 74%, rgba(0,0,0,0.65), transparent 60%),
            radial-gradient(circle at 38% 34%, rgba(70,110,200,0.35), transparent 62%),
            linear-gradient(155deg, #16264a 0%, #0a1428 55%, #04070f 100%)`,
          boxShadow: 'inset -22px -22px 60px rgba(0,0,0,0.6), inset 10px 10px 40px rgba(120,160,255,0.08), 0 0 90px rgba(47,95,224,0.25)',
        }}
      >
        <div
          ref={highlightRef}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle at 84% 32%, rgba(140,180,255,0.65), transparent 55%)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            boxShadow: 'inset 0 0 24px 2px rgba(120,160,255,0.25)',
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
