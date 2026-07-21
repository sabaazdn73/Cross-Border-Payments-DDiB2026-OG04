import { NavLink, useLocation } from 'react-router-dom';
import { Home, SendHorizonal, ShieldCheck, User, ArrowLeft } from 'lucide-react';
import brandIcon from '../../assets/brand/icon.svg';
import ThemeToggle from '../ui/ThemeToggle';

/**
 * App-shell chrome: a phone-frame container with a bottom tab bar,
 * distinct from the responsive website. This is what makes "app" and
 * "web" feel like two different things, per your request, rather
 * than the same pages just narrower.
 *
 * Every tab here routes to this project's real functionality
 * (Send Money, Track Transfer, Tamper Demo / verification) -- there
 * is no mock data standing in for it.
 */
const TABS = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/transfers', label: 'Transfers', icon: SendHorizonal },
  { to: '/app/verify', label: 'Verify', icon: ShieldCheck },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export default function AppShell({ children, title, showBack, onBack }) {
  const location = useLocation();
  const isHome = location.pathname === '/app';

  return (
    <div className="min-h-screen flex justify-center bg-[#0d0f14] py-6 px-4">
      <div
        className="relative w-full max-w-[402px] bg-canvas rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
        style={{ height: 'min(874px, 92vh)' }}
      >
        {/* status-bar notch illusion */}
        <div className="h-9 flex-shrink-0" />

        {/* header */}
        {isHome ? (
          <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <img src={brandIcon} alt="" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-ink text-[17px] tracking-tight">Cross-Border</span>
            </div>
            <ThemeToggle />
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
            <span className="font-bold text-ink text-[18px] flex-1">{title}</span>
            <ThemeToggle />
          </div>
        )}

        {/* content */}
        <div className="flex-1 overflow-y-auto pb-24">{children}</div>

        {/* bottom tab bar */}
        <div className="absolute left-0 right-0 bottom-0 flex justify-around items-center pt-2.5 pb-6 px-2 bg-surface border-t border-hairline">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-brand-500' : 'text-ink-muted'}`
              }
            >
              {({ isActive }) => (
                <>
                  <tab.icon className="w-[21px] h-[21px]" strokeWidth={1.8} />
                  <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
