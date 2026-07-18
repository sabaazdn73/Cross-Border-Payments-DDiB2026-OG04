import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

// TODO: replace with your actual production URL once it's final —
// this is what the QR code will send a phone to.
export const SITE_URL = 'https://f2f-nine.uzh.app/';

/**
 * Renders a scannable QR code pointing at the live site. There is no
 * separate native mobile app — the site itself is fully responsive,
 * so scanning this just opens the same app on a phone's browser,
 * already laid out for a small screen.
 */
export default function SiteQRCode({ size = 160, caption = 'Scan to open on your phone' }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, SITE_URL, {
      width: size,
      margin: 1,
      color: { dark: '#0a0b10', light: '#ffffff' },
    }).catch((e) => setError(e.message));
  }, [size]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-2.5 rounded-xl shadow-glass">
        {error ? (
          <div className="text-xs text-danger-400 w-[160px] h-[160px] flex items-center justify-center text-center px-2">
            QR generation failed
          </div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
      {caption && <p className="text-xs text-white/50 text-center max-w-[160px]">{caption}</p>}
    </div>
  );
}
