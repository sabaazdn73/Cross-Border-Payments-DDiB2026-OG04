import { Link } from 'react-router-dom';
import { Zap, Shield, Globe, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy-900/50 backdrop-blur-sm">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Borderless</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Walletless cross-border settlement powered by Hedera blockchain.
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
            <h3 className="font-semibold text-white mb-3 text-sm">Product</h3>
            <ul className="space-y-2">
              {[
                { label: 'Send Money', to: '/send-money' },
                { label: 'Track Transfer', to: '/track' },
                { label: 'Tamper Demo', to: '/tamper-demo' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/50 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Technology</h3>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>Hedera HCS</li>
              <li>Stablecoin Settlement</li>
              <li>KYC / AML Compliance</li>
              <li>Hash Verification</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Supported</h3>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>30+ Countries</li>
              <li>25+ Currencies</li>
              <li>Bank Transfer</li>
              <li>Mobile Money</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {currentYear} Borderless. Sandbox demonstration only. Not a real financial service.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Shield className="w-3 h-3" />
            <span>Blockchain-secured compliance records</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
