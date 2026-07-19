import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Light is the default look (no class needed). This toggles a `.dark`
 * class on <html> for users who want the dark palette — persisted so
 * the choice survives a reload.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('f2f-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('f2f-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 rounded-lg border border-hairline flex items-center justify-center text-ink-muted hover:text-ink hover:border-ink-muted/40 transition-colors"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
