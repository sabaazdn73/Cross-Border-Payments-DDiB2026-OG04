import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

/**
 * A real 3D, auto-rotating globe (WebGL via react-globe.gl / three.js
 * under the hood) -- not a flat SVG approximation. This reuses the
 * same library and configuration approach as an earlier project's
 * signature globe, sized down and repositioned for this hero rather
 * than a full-bleed background element.
 */
export default function SignatureGlobe({ size = 220 }) {
  const globeEl = useRef();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 25, lng: 40, altitude: 2.0 });
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
    }
  }, []);

  return (
    <div
      style={{
        width: size,
        height: size,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(circle at center, black 62%, transparent 92%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 62%, transparent 92%)',
      }}
      aria-hidden="true"
    >
      <Globe
        ref={globeEl}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/globe/earth-blue-marble.jpg"
        atmosphereColor="#6c56e3"
        atmosphereAltitude={0.2}
      />
    </div>
  );
}
