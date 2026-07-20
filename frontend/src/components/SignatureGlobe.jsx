import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

/**
 * A real 3D, auto-rotating globe (WebGL via react-globe.gl / three.js
 * under the hood) -- not a flat SVG approximation. This reuses the
 * same library and configuration approach as an earlier project's
 * signature globe, sized down and repositioned for this hero rather
 * than a full-bleed background element.
 *
 * The "twinkle" is real pulsing ring animations (react-globe.gl's
 * ringsData), not a CSS opacity trick, placed at actual markets this
 * project names elsewhere (Africa, Europe, South/Southeast Asia,
 * LatAm) rather than random decorative points.
 */
const MARKET_POINTS = [
  { lat: 6.5, lng: 3.3, label: 'Lagos' },
  { lat: -1.3, lng: 36.8, label: 'Nairobi' },
  { lat: 5.6, lng: -0.2, label: 'Accra' },
  { lat: 38.7, lng: -9.1, label: 'Lisbon' },
  { lat: 40.2, lng: 44.5, label: 'Yerevan' },
  { lat: 19.1, lng: 72.9, label: 'Mumbai' },
  { lat: 14.6, lng: 121.0, label: 'Manila' },
  { lat: 1.3, lng: 103.8, label: 'Singapore' },
  { lat: -23.5, lng: -46.6, label: 'Sao Paulo' },
  { lat: 19.4, lng: -99.1, label: 'Mexico City' },
];

export default function SignatureGlobe({ size = 320 }) {
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
        ringsData={MARKET_POINTS}
        ringLat={(d) => d.lat}
        ringLng={(d) => d.lng}
        ringColor={() => (t) => `rgba(140, 210, 255, ${1 - t})`}
        ringMaxRadius={4}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1400}
      />
    </div>
  );
}
