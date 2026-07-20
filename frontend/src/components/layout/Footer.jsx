import { Link } from 'react-router-dom';
import { Shield, Globe, Lock } from 'lucide-react';
import brandIcon from '../../assets/brand/icon.svg';
import SiteQRCode from '../ui/SiteQRCode';

import { DOCS_URL } from './Navbar';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-canvas backdrop-blur-sm">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={brandIcon} alt="" className="w-10 h-10 rounded-lg shadow-glow" />
              <span className="font-bold text-ink">Cross-Border</span>
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed">
              Walletless, fiat-to-fiat cross-border settlement powered by Hedera network.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-xs text-success-400">
                <Shield className="w-3 h-3" /><span>Compliant</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent-400">
                <Lock className="w-3 h-3" /><span>Secure</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-400">
                <Globe className="w-3 h-3" /><span>Global</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-3 text-sm">Product</h3>
            <ul className="space-y-2">
              {[
                { label: 'Send Money', to: '/send-money' },
                { label: 'Track Transfer', to: '/track' },
                { label: 'Tamper Demo', to: '/tamper-demo' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-muted hover:text-ink text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-3 text-sm">Technology</h3>
            <ul className="space-y-2 text-ink-muted text-sm">
              <li>Hedera HCS</li>
              <li>Stablecoin Settlement</li>
              <li>KYC / AML Compliance</li>
              <li>Hash Verification</li>
              <li>
                <a href={DOCS_URL} target="_blank" rel="noopener noreferrer"
                   className="hover:text-brand-400 transition-colors">
                  Full Documentation ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-3 text-sm">Supported</h3>
            <ul className="space-y-2 text-ink-muted text-sm">
              <li>37+ Countries</li>
              <li>36+ Currencies</li>
              <li>Bank Transfer</li>
              <li>Mobile Money</li>
            </ul>
          </div>

          <div className="flex md:justify-end">
            <SiteQRCode />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-muted/60 text-xs">
            &copy; {currentYear} Cross-Border. Sandbox demonstration only. Not a real financial service.
          </p>
          <div className="flex items-center gap-1 text-xs text-ink-muted/60">
            <Shield className="w-3 h-3" />
            <span>Network-secured compliance records</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
