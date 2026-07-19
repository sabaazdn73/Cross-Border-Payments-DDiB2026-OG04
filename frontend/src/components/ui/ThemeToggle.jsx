import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Toggles a `.light` class on <html>. Dark is the app's default and
 * always-tested look; `.light` is an override layer defined in
 * index.css (see "LIGHT MODE OVERRIDES" section) rather than a
 * ground-up per-component rebuild — this keeps every existing dark-
 * mode class working unchanged while giving light mode a real,
 * verifiable alternate palette on the pages it's been applied to.
 */
export default function ThemeToggle() {
  const [light, setLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('f2f-theme') === 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    localStorage.setItem('f2f-theme', light ? 'light' : 'dark');
  }, [light]);

  return (
    <button
      onClick={() => setLight((v) => !v)}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-colors"
    >
      {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
