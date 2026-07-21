import { useState } from 'react';
import logoFull from '../../assets/brand/logo.svg';

/**
 * A tap-to-enter launch screen, shown once per session (sessionStorage
 * flag), matching how real native apps show a splash before the first
 * screen. Shows the full project logo (icon + wordmark), not just the
 * icon, per request.
 */
export default function AppSplash({ onEnter }) {
  const [tapped, setTapped] = useState(false);

  const enter = () => {
    setTapped(true);
    sessionStorage.setItem('cb_app_entered', '1');
    setTimeout(onEnter, 220);
  };

  return (
    <button
      onClick={enter}
      className={`w-full h-full flex flex-col items-center justify-center bg-hero-gradient transition-opacity duration-200 ${tapped ? 'opacity-0' : 'opacity-100'}`}
      style={{ border: 'none', cursor: 'pointer' }}
    >
      <img src={logoFull} alt="Cross-Border" className="w-[220px] h-auto mb-8 drop-shadow-2xl" />
      <p className="text-white/50 text-xs font-medium tracking-wide animate-pulse">Tap to open</p>
    </button>
  );
}
