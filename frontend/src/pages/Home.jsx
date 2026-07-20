import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Globe, Clock, Lock, CheckCircle2,
  SendHorizonal, Search, ChevronRight, Star, TrendingUp,
  Banknote, Smartphone, Building2
} from 'lucide-react';
import Navbar, { DOCS_URL } from '../components/layout/Navbar';
import SignatureGlobe from '../components/SignatureGlobe';
import noWalletIcon from '../assets/icons/01-no-wallet.svg';
import lightningIcon from '../assets/icons/02-lightning-settlement.svg';
import countriesIcon from '../assets/icons/03-countries.svg';
import complianceIcon from '../assets/icons/04-compliance.svg';
import trackingIcon from '../assets/icons/05-tracking.svg';
import feesIcon from '../assets/icons/06-fees.svg';
import defiRoutingIcon from '../assets/icons/07-defi-routing.svg';
import logoHedera from '../assets/logos/networks/hedera.png';
import logoEthereum from '../assets/logos/networks/ethereum.png';
import logoSolana from '../assets/logos/networks/solana.png';
import logoBnbChain from '../assets/logos/networks/bnb-chain.png';
import logoBase from '../assets/logos/networks/base.png';
import logoBvnk from '../assets/logos/partners/bvnk.png';
import logoYellowCard from '../assets/logos/partners/yellow-card.png';
import logoConduit from '../assets/logos/partners/conduit.png';
import logoMtnMomo from '../assets/logos/partners/mtn-momo.png';
import logoAirtel from '../assets/logos/partners/airtel.png';
import logoBitso from '../assets/logos/partners/bitso.png';
import logoAstropay from '../assets/logos/partners/astropay.png';
import logoTazapay from '../assets/logos/partners/tazapay.png';
import logoTransfi from '../assets/logos/partners/transfi.png';
import logoDue from '../assets/logos/partners/due.png';
import logoStraitsx from '../assets/logos/partners/straitsx.png';
import logoPaxos from '../assets/logos/partners/paxos.png';
import logoRipple from '../assets/logos/partners/ripple.png';
import logoCircle from '../assets/logos/partners/circle.png';
import Footer from '../components/layout/Footer';

const benefits = [
  { iconSrc: noWalletIcon, title: 'No Wallet Required', description: 'Send money internationally without ever touching a crypto wallet, seed phrase, or private key.' },
  { iconSrc: lightningIcon, title: 'Lightning Fast Settlement', description: 'Hedera network finalizes transactions in 3-5 seconds, far faster than traditional wire transfers.' },
  { iconSrc: countriesIcon, title: '42+ Countries Supported', description: 'Send to and from Europe, North America, Africa, Asia, and Latin America, with competitive exchange rates.' },
  { iconSrc: complianceIcon, title: 'Compliance Built In', description: 'Automated KYC/AML screening with tamper-proof compliance records anchored on Hedera HCS.' },
  { iconSrc: trackingIcon, title: 'Real-Time Tracking', description: 'Monitor every step of your transfer from payment received to local payout completion.' },
  { iconSrc: feesIcon, title: 'Transparent Fees', description: 'No hidden charges. See the exact fee and exchange rate before you confirm your transfer.' },
  { iconSrc: defiRoutingIcon, title: 'DeFi-Aware Routing', description: 'Settlement checks real-time DeFi liquidity depth (e.g. Hedera DEX pools) before choosing a chain, so large transfers route to deeper liquidity automatically.' },
];

const steps = [
  { step: '01', title: 'Enter Transfer Details', description: 'Fill in the sender and recipient information, choose currencies and payout method.', color: 'from-brand-500 to-brand-600' },
  { step: '02', title: 'Pay with Your Card', description: 'Make a standard card payment. No crypto, no wallets. Just your normal payment method.', color: 'from-accent-500 to-accent-600' },
  { step: '03', title: 'Network Settlement', description: 'Behind the scenes, funds are settled via stablecoin on Hedera. Compliance is anchored on HCS.', color: 'from-success-500 to-success-600' },
  { step: '04', title: 'Recipient Gets Paid', description: 'The recipient receives local currency via bank transfer, mobile money, or cash pickup.', color: 'from-brand-600 to-accent-500' },
];

const currencies = [
  { countryCode: 'US', code: 'USD', name: 'US Dollar' },
  { countryCode: 'GB', code: 'GBP', name: 'Brit. Pound' },
  { countryCode: 'EU', code: 'EUR', name: 'Euro' },
  { countryCode: 'NG', code: 'NGN', name: 'Naira' },
  { countryCode: 'KE', code: 'KES', name: 'K. Shilling' },
  { countryCode: 'GH', code: 'GHS', name: 'Ghanaian Cedi' },
  { countryCode: 'IN', code: 'INR', name: 'Indian Rupee' },
  { countryCode: 'PH', code: 'PHP', name: 'Phil. Peso' },
  { countryCode: 'MX', code: 'MXN', name: 'Mex. Peso' },
  { countryCode: 'BR', code: 'BRL', name: 'Brazilian Real' },
  { countryCode: 'AE', code: 'AED', name: 'UAE Dirham' },
  { countryCode: 'SG', code: 'SGD', name: 'S. Dollar' },
];

// Researched candidates, not confirmed integrations -- see
// docs/business/potential-partners.md for the sourced detail behind
// each one (coverage, licensing, named caveats).
const partners = [
  { name: 'BVNK', region: 'US · UK · EU', logoSrc: logoBvnk },
  { name: 'Yellow Card', region: 'Africa', logoSrc: logoYellowCard },
  { name: 'Conduit', region: 'Africa', logoSrc: logoConduit },
  { name: 'MTN MoMo', region: 'Africa', logoSrc: logoMtnMomo },
  { name: 'Airtel Money', region: 'Africa', logoSrc: logoAirtel },
  { name: 'Bitso', region: 'Latin America', logoSrc: logoBitso },
  { name: 'AstroPay', region: 'Latin America', logoSrc: logoAstropay },
  { name: 'Tazapay', region: 'Asia-Pacific', logoSrc: logoTazapay },
  { name: 'TransFi', region: 'West Asia · South Asia', logoSrc: logoTransfi },
  { name: 'Due', region: 'APAC · Africa · LatAm', logoSrc: logoDue },
  { name: 'StraitsX', region: 'Singapore', logoSrc: logoStraitsx },
  { name: 'Paxos', region: 'Singapore', logoSrc: logoPaxos },
  { name: 'Ripple', region: 'Asia · West Asia', logoSrc: logoRipple },
  { name: 'Circle', region: 'Global (USDC issuer)', logoSrc: logoCircle },
];

// Hedera is where we anchor (fixed, see the on-page explanation).
// The rest are potential execution networks for the stablecoin leg,
// ordered by USDC liquidity share -- see docs/architecture/
// stablecoin-market-share.md for the sourced breakdown.
const settlementNetworks = [
  { name: 'Hedera', share: 'Anchor network', live: true, logoSrc: logoHedera },
  { name: 'Ethereum', share: '~67% USDC share', live: false, logoSrc: logoEthereum },
  { name: 'Solana', share: '~17% USDC share', live: false, logoSrc: logoSolana },
  { name: 'BNB Chain', share: '~8% USDC share', live: false, logoSrc: logoBnbChain },
  { name: 'Base', share: '~7% USDC share', live: false, logoSrc: logoBase },
];

const stats = [
  { value: '42+', label: 'Countries', icon: Globe },
  { value: '41+', label: 'Currencies', icon: TrendingUp },
  { value: '3s', label: 'Network settlement', icon: Zap },
  { value: '100%', label: 'Verifiable', icon: Shield },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
        </div>

        <div className="container-app relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
            <div className="max-w-2xl relative flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-[1.15] tracking-tight animate-slide-up">
                F2F Cross-Border
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 tracking-tight animate-slide-up whitespace-nowrap">
                <span className="gradient-text">Fiat-to-Fiat</span> <span className="text-white/70">Settlement Platform</span>
              </p>

              <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed animate-slide-up">
              Fiat-to-fiat conversion, carried across borders on the stablecoin rail. An orchestration layer
              coordinates licensed partners behind the scenes, so senders and recipients get a modern transfer,
              not the wait and cost of traditional banking's slower rails.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up">
              <Link to="/send-money" className="btn-primary text-base py-4 px-8 w-full sm:w-auto">
                <SendHorizonal className="w-5 h-5" aria-hidden="true" />
                Start Onboarding
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/track" className="btn-secondary text-base py-4 px-8 w-full sm:w-auto">
                <Search className="w-5 h-5" aria-hidden="true" />
                Track Transaction
              </Link>
            </div>

              <div className="flex flex-wrap items-center gap-6 mt-12 text-sm text-white/40">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-success-400" aria-hidden="true" />
                  KYC / AML Compliant
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-brand-400" aria-hidden="true" />
                  Hedera Secured
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-warning-400" aria-hidden="true" />
                  Sandbox Demo
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
              <SignatureGlobe size={340} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-hairline bg-surface" aria-label="Statistics">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-3xl md:text-4xl font-bold gradient-text mb-1 tracking-tight">{stat.value}</p>
                <p className="text-ink-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" aria-labelledby="benefits-heading">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30 mb-4">
              Why Choose Cross-Border
            </span>
            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-ink">
              Everything you need,{' '}
              <span className="gradient-text">nothing you don't</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="glass p-6 hover:bg-brand-500/5 transition-all duration-300 group">
                <img
                  src={b.iconSrc}
                  alt=""
                  className="w-12 h-12 rounded-xl mb-4 group-hover:shadow-glow transition-shadow"
                />
                <h3 className="font-bold text-ink mb-2">{b.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-surface" aria-labelledby="how-it-works-heading">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-400 border border-accent-500/30 mb-4">
              Simple Process
            </span>
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-ink">
              How it <span className="gradient-text">works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative glass p-6">
                <div className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-ink-muted/40 z-10" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="section" aria-labelledby="security-heading">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success-500/20 text-success-400 border border-success-500/30 mb-4">
                Enterprise Security
              </span>
              <h2 id="security-heading" className="text-3xl md:text-4xl font-bold text-ink mb-4">
                Compliance you can<span className="gradient-text-success"> verify</span>
              </h2>
              <p className="text-ink-muted leading-relaxed mb-6">
                Every transaction generates a compliance record that's cryptographically hashed and
                anchored on Hedera's Consensus Service. This creates an immutable, tamper-evident
                audit trail, verifiable by anyone, anytime.
              </p>
              <ul className="space-y-3">
                {[
                  'KYC / AML automated screening',
                  'Sanctions list verification',
                  'Risk scoring per transaction',
                  'Immutable Hedera HCS anchoring',
                  'Hash-based tamper detection',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink-muted text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success-400 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/tamper-demo" className="btn-secondary mt-8 inline-flex">
                See Tamper Detection Demo
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="glass p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-success-500/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-success-400" aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-ink text-sm">Compliance Record Verified</span>
                  <span className="ml-auto text-xs text-success-400 bg-success-500/10 border border-success-500/20 px-2 py-0.5 rounded-full">✓ Passed</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">HCS Topic ID</span>
                    <span className="text-accent-400 font-mono">0.0.4891234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Sequence #</span>
                    <span className="text-accent-400 font-mono">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Verification</span>
                    <span className="text-success-400">Hash match ✓</span>
                  </div>
                </div>
              </div>

              {[
                { Icon: Building2, label: 'Bank Transfer', desc: 'Direct to bank account' },
                { Icon: Smartphone, label: 'Mobile Money', desc: 'M-Pesa, MTN, Airtel' },
                { Icon: Banknote, label: 'Cash Pickup', desc: 'Pick up at agent location' },
              ].map(({ Icon, label, desc }) => (
                <div key={label} className="glass p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-ink text-sm font-medium">{label}</p>
                    <p className="text-ink-muted text-xs">{desc}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success-400 ml-auto" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supported Currencies */}
      <section className="section bg-surface" aria-labelledby="currencies-heading">
        <div className="container-app">
          <div className="text-center mb-10">
            <h2 id="currencies-heading" className="text-3xl md:text-4xl font-bold text-ink mb-3">
              Supported Currencies
            </h2>
            <p className="text-ink-muted">Send and receive in 41+ currencies worldwide</p>
          </div>
          <div className="ticker-mask overflow-hidden">
            <div className="ticker-track gap-3">
              {[...currencies, ...currencies].map((cur, i) => (
                <div key={`${cur.code}-${i}`} className="glass p-3 text-center hover:bg-brand-500/5 transition-all group cursor-default w-28 shrink-0">
                  <span className={`fi fi-${cur.countryCode.toLowerCase()} rounded-sm block mx-auto mb-1 w-8 h-6`} aria-hidden="true" />
                  <p className="text-xs font-bold text-ink">{cur.code}</p>
                  <p className="text-xs text-ink-muted truncate">{cur.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14 mb-8">
            <p className="text-sm font-semibold text-ink-muted uppercase tracking-wider">Potential Settlement Partners</p>
            <p className="text-xs text-ink-muted mt-1">Researched candidates by region, see <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">full docs</a> for coverage detail</p>
          </div>
          <div className="ticker-mask overflow-hidden">
            <div className="ticker-track gap-3" style={{ animationDirection: 'reverse', animationDuration: '65s' }}>
              {[...partners, ...partners].map((p, i) => (
                <div key={`${p.name}-${i}`} className="glass p-3 flex items-center gap-3 hover:bg-brand-500/5 transition-all cursor-default shrink-0">
                  <img src={p.logoSrc} alt={p.name} className="h-8 w-auto max-w-[110px] object-contain rounded" />
                  <span className="text-xs text-ink-muted whitespace-nowrap border-l border-hairline pl-3">{p.region}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The heart of the project: anchor vs execution */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold uppercase tracking-wider mb-3">The Core Idea</span>
              <h3 className="text-2xl md:text-3xl font-bold text-ink">One ledger to trust. Any network to move on.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="glass p-6">
                <h4 className="font-bold text-ink mb-2">Where we anchor: always Hedera</h4>
                <p className="text-sm text-ink-muted leading-relaxed">Every compliance check, quote, and routing decision is hashed and anchored on Hedera Consensus Service, fixed and non-negotiable. Not because it has the deepest liquidity (it doesn't), but because of what a compliance trail actually needs: fixed, predictable fees, deterministic aBFT finality, and a consensus timestamp neither party controls. This is enterprise-grade record-keeping, not a trading venue choice.</p>
              </div>
              <div className="glass p-6">
                <h4 className="font-bold text-ink mb-2">Where we execute: whichever network fits the transfer</h4>
                <p className="text-sm text-ink-muted leading-relaxed">The actual stablecoin leg can settle on Hedera or route to a deeper-liquidity chain, decided per transfer by real parameters: transaction size, which network the destination partner supports, and live liquidity depth. This is an optimization problem, solved fresh for every transfer, not a fixed choice.</p>
              </div>
            </div>

            <p className="text-center text-sm font-semibold text-ink-muted uppercase tracking-wider mb-6">Settlement Networks</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {settlementNetworks.map((n) => (
                <div key={n.name} className={`glass p-4 text-center ${n.live ? 'ring-2 ring-brand-500/40' : ''}`}>
                  <img src={n.logoSrc} alt={n.name} className="h-9 w-auto max-w-full object-contain mx-auto mb-2 rounded" />
                  <p className="text-xs text-ink-muted">{n.share}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${n.live ? 'bg-success-500/15 text-success-400' : 'bg-ink-muted/10 text-ink-muted'}`}>
                    {n.live ? 'Live' : 'Planned'}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-ink-muted mt-4">Ordered by USDC liquidity share among these five chains, mid-2026. See <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">the sourced breakdown</a> for the full picture, including why Hedera's thin slice is the point, not a gap.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="cta-heading">
        <div className="container-app">
          <div className="relative glass overflow-hidden p-10 md:p-16 text-center">
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-black text-ink mb-4">
                Ready to send money <span className="gradient-text">globally?</span>
              </h2>
              <p className="text-ink-muted mb-8 max-w-xl mx-auto">
                Start your first transfer in minutes. No crypto experience required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/send-money" className="btn-primary text-base py-4 px-10">
                  <SendHorizonal className="w-5 h-5" aria-hidden="true" />
                  Start a Transfer
                </Link>
                <Link to="/tamper-demo" className="btn-secondary text-base py-4 px-10">
                  View Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
