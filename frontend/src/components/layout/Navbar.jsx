import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Home, BookOpen, ExternalLink } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Home', to: '/', },
  { label: 'Send Money', to: '/send-money' },
  { label: 'Track Transfer', to: '/track' },
  { label: 'Tamper Demo', to: '/tamper-demo' },
];

// TODO: replace with your published GitBook URL once you've renamed
// the space away from the default "untitled" slug.
export const DOCS_URL = 'https://deep-dive-into-blockchain.gitbook.io/untitled/';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-canvas/90 backdrop-blur-md border-b border-hairline shadow-glass'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Borderless home">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors">
                Borderless Payment System
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-400 ${
                      location.pathname === link.to ? 'text-brand-400' : 'text-white/70'
                    }`}
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
                className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-brand-400 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link to="/track" className="btn-secondary text-sm py-2 px-4">Track Transfer</Link>
              <Link to="/send-money" className="btn-primary text-sm py-2 px-4">Start Transfer</Link>
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} navLinks={navLinks} />
    </>
  );
}
