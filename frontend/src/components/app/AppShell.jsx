import { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Home, SendHorizonal, ShieldCheck, Users, User, ArrowLeft, Globe2 } from 'lucide-react';
import brandIcon from '../../assets/brand/icon.svg';
import ThemeToggle from '../ui/ThemeToggle';
import AppSplash from './AppSplash';

/**
 * App-shell chrome: a phone-frame container with a bottom tab bar,
 * distinct from the responsive website. Explicit font stack here
 * (rather than just inheriting) so every inline-styled screen inside
 * renders with the same, deliberate typography instead of whatever
 * happened to cascade down.
 */
const TABS = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/transfers', label: 'Transfers', icon: SendHorizonal },
  { to: '/app/verify', label: 'Verify', icon: ShieldCheck },
  { to: '/app/community', label: 'Community', icon: Users },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export default function AppShell({ children, title, showBack, onBack }) {
  const location = useLocation();
  const isHome = location.pathname === '/app';
  const [entered, setEntered] = useState(() => sessionStorage.getItem('cb_app_entered') === '1');

  return (
    <div className="min-h-screen flex justify-center bg-[#0d0f14] py-6 px-4">
      <div
        className="relative w-full max-w-[402px] bg-canvas rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
        style={{ height: 'min(874px, 92vh)', fontFamily: "'Inter', 'Noto Sans', system-ui, sans-serif" }}
      >
        {!entered ? (
          <AppSplash onEnter={() => setEntered(true)} />
        ) : (
          <>
            {/* status-bar notch illusion */}
            <div className="h-9 flex-shrink-0" />

            {/* header */}
            {isHome ? (
              <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <img src={brandIcon} alt="" className="w-8 h-8 rounded-lg" />
                  <span className="font-bold text-ink text-[17px] tracking-tight">Cross-Border</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/"
                    className="flex items-center gap-1 text-[11px] font-semibold text-ink-muted bg-surface-2 border border-hairline rounded-full px-2.5 py-1.5"
                  >
                    <Globe2 className="w-3 h-3" />
                    Web
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-5 pb-3 flex-shrink-0">
                {showBack && (
                  <button
                    onClick={onBack}
                    className="w-8 h-8 rounded-full bg-surface-2 border border-hairline flex items-center justify-center text-ink flex-shrink-0"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <span className="font-bold text-ink text-[18px] flex-1 truncate">{title}</span>
                <ThemeToggle />
              </div>
            )}

            {/* content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24 min-w-0">{children}</div>

            {/* bottom tab bar */}
            <div className="absolute left-0 right-0 bottom-0 pt-2 pb-6 px-3 bg-surface/95 backdrop-blur-md border-t border-hairline">
              <div className="flex justify-around items-center">
                {TABS.map((tab) => (
                  <NavLink
                    key={tab.to}
                    to={tab.to}
                    end={tab.end}
                    className="flex flex-col items-center gap-1 px-2"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                            isActive ? 'bg-brand-500/12 text-brand-500 scale-105' : 'text-ink-muted'
                          }`}
                        >
                          <tab.icon className="w-[19px] h-[19px]" strokeWidth={isActive ? 2.2 : 1.8} />
                        </span>
                        <span className={`text-[10px] ${isActive ? 'font-bold text-brand-500' : 'font-medium text-ink-muted'}`}>
                          {tab.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
