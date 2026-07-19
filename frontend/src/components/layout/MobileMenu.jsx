import { Link } from 'react-router-dom';
import { X, SendHorizonal, Search } from 'lucide-react';
import brandIcon from '../../assets/brand/icon.svg';

import { DOCS_URL } from './Navbar';

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className={`absolute right-0 top-0 h-full w-72 bg-surface border-l border-hairline shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-hairline">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-ink">Cross-Border</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-black/5 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-ink-muted hover:text-ink hover:bg-black/5 transition-all"
              >
                {Icon ? <Icon className="w-4 h-4" /> : null}
                <span>{link.label}</span>
              </Link>
            );
          })}
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-ink-muted hover:text-ink hover:bg-black/5 transition-all"
          >
            <span>Docs ↗</span>
          </a>
        </nav>

        <div className="p-4 space-y-2 border-t border-hairline">
          <Link to="/send-money" onClick={onClose} className="btn-primary w-full text-sm py-3 justify-center">
            <SendHorizonal className="w-4 h-4" />
            Start Transfer
          </Link>
          <Link to="/track" onClick={onClose} className="btn-secondary w-full text-sm py-3 justify-center">
            <Search className="w-4 h-4" />
            Track Transfer
          </Link>
        </div>
      </div>
    </div>
  );
}
