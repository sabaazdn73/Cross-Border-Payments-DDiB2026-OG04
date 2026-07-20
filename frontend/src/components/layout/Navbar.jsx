import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, ExternalLink, Mail } from 'lucide-react';
import brandIcon from '../../assets/brand/icon.svg';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Home', to: '/', },
  { label: 'Send Money', to: '/send-money' },
  { label: 'Tamper Demo', to: '/tamper-demo' },
  { label: 'Landing', to: '/landing' },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-canvas ${
          scrolled ? 'border-b border-hairline shadow-glass' : 'border-b border-hairline/50'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Cross-Border home">
              <img src={brandIcon} alt="" className="w-11 h-11 rounded-lg shadow-glow" />
              <span className="font-bold text-lg text-ink group-hover:text-brand-400 transition-colors">
                Cross-Border
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
                      location.pathname === link.to ? 'text-brand-400' : 'text-ink-muted'
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
                className="flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-400 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <a
                href="mailto:sabaazad93@gmail.com?subject=Cross-Border%20Feedback"
                className="flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Send Feedback</span>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-black/5 transition-colors"
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
