import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import brandIcon from '../../assets/brand/icon.svg';

export const SITE_URL = 'https://f2f-uzh.vercel.app/';

/**
 * Renders a scannable QR code with the brand icon centered on top,
 * pointing at the live site. There is no separate native app — the
 * site itself is fully responsive, so scanning this opens the same
 * app on a phone's browser, already laid out for a small screen.
 *
 * Error correction is set to 'H' (~30% redundancy) specifically
 * because a logo sits on top of the code — without high correction,
 * covering the center would make some scanners fail. Tested by
 * decoding the actual rendered output, not assumed.
 */
export default function SiteQRCode({ size = 200, caption = 'Scan to open on your phone' }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    QRCode.toCanvas(canvas, SITE_URL, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#14161b', light: '#ffffff' },
    })
      .then(() => {
        const ctx = canvas.getContext('2d');
        const logo = new Image();
        logo.onload = () => {
          const logoSize = size * 0.22;
          const pad = 6;
          const cx = (canvas.width - logoSize) / 2;
          const cy = (canvas.height - logoSize) / 2;

          ctx.save();
          ctx.fillStyle = '#ffffff';
          const r = 10;
          const bx = cx - pad, by = cy - pad, bw = logoSize + pad * 2, bh = logoSize + pad * 2;
          ctx.beginPath();
          ctx.moveTo(bx + r, by);
          ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
          ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
          ctx.arcTo(bx, by + bh, bx, by, r);
          ctx.arcTo(bx, by, bx + bw, by, r);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          ctx.drawImage(logo, cx, cy, logoSize, logoSize);
        };
        logo.src = brandIcon;
      })
      .catch((e) => setError(e.message));
  }, [size]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-3 rounded-2xl glass">
        {error ? (
          <div className="text-xs text-danger-400 flex items-center justify-center text-center px-2" style={{ width: size, height: size }}>
            QR generation failed
          </div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
      {caption && <p className="text-xs text-ink-muted text-center max-w-[180px]">{caption}</p>}
    </div>
  );
}
