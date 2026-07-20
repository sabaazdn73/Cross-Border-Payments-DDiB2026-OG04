import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Globe, Clock, Lock, CheckCircle2,
  SendHorizonal, Search, ChevronRight, Star, TrendingUp,
  Banknote, Smartphone, Building2
} from 'lucide-react';
import Navbar, { DOCS_URL } from '../components/layout/Navbar';
import noWalletIcon from '../assets/icons/01-no-wallet.svg';
import lightningIcon from '../assets/icons/02-lightning-settlement.svg';
import countriesIcon from '../assets/icons/03-countries.svg';
import complianceIcon from '../assets/icons/04-compliance.svg';
import trackingIcon from '../assets/icons/05-tracking.svg';
import feesIcon from '../assets/icons/06-fees.svg';
import defiRoutingIcon from '../assets/icons/07-defi-routing.svg';
import Footer from '../components/layout/Footer';

const benefits = [
  { iconSrc: noWalletIcon, title: 'No Wallet Required', description: 'Send money internationally without ever touching a crypto wallet, seed phrase, or private key.' },
  { iconSrc: lightningIcon, title: 'Lightning Fast Settlement', description: 'Hedera network finalizes transactions in 3-5 seconds, far faster than traditional wire transfers.' },
  { iconSrc: countriesIcon, title: '30+ Countries Supported', description: 'Send to recipients across Africa, Asia, Latin America, and beyond with competitive exchange rates.' },
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
  { name: 'BVNK', region: 'US · UK · EU' },
  { name: 'Yellow Card', region: 'Africa' },
  { name: 'Conduit', region: 'Africa' },
  { name: 'MTN MoMo', region: 'Africa' },
  { name: 'Airtel Money', region: 'Africa' },
  { name: 'Bitso', region: 'Latin America' },
  { name: 'AstroPay', region: 'Latin America' },
  { name: 'Tazapay', region: 'Asia-Pacific' },
  { name: 'TransFi', region: 'MENA · South Asia' },
  { name: 'Due', region: 'APAC · Africa · LatAm' },
  { name: 'Circle', region: 'Global (USDC issuer)' },
];

const stats = [
  { value: '30+', label: 'Countries', icon: Globe },
  { value: '30+', label: 'Currencies', icon: TrendingUp },
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
          <div className="max-w-4xl mx-auto text-center relative">
            <svg
              className="hidden md:block absolute -top-6 right-2 w-28 h-28 lg:w-32 lg:h-32 animate-spin-slow opacity-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <defs>
                <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="globeFill" cx="35%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#0d2847" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#050d1a" stopOpacity="0.7" />
                </radialGradient>
              </defs>
              {/* Sphere body + outline, no lat/long arcs -- just the globe edge */}
              <circle cx="50" cy="50" r="38" fill="url(#globeFill)" stroke="#5ee6ff" strokeWidth="1" opacity="0.9" />
              {/* Continents, as a dot-matrix silhouette (Europe/Africa/Middle East/Asia) */}
              <g fill="#8fe9ff" filter="url(#neonGlow)">
                <circle className="star-twinkle" cx="53.6" cy="28.3" r="1.3" style={{ animationDelay: '0.0s' }} />
              <circle cx="52.5" cy="31.2" r="1.1" />
              <circle cx="50.1" cy="24.2" r="1.1" />
              <circle cx="53.8" cy="29.1" r="1.1" />
              <circle cx="53.4" cy="28.3" r="1.1" />
              <circle cx="54.5" cy="23.8" r="1.1" />
              <circle className="star-twinkle" cx="55.5" cy="22.7" r="1.3" style={{ animationDelay: '2.22s' }} />
              <circle cx="54.6" cy="25.8" r="1.1" />
              <circle cx="55.5" cy="28.0" r="1.1" />
              <circle cx="56.0" cy="24.1" r="1.1" />
              <circle cx="54.9" cy="25.6" r="1.1" />
              <circle cx="56.6" cy="27.5" r="1.1" />
              <circle className="star-twinkle" cx="57.2" cy="25.9" r="1.3" style={{ animationDelay: '1.44s' }} />
              <circle cx="55.1" cy="26.1" r="1.1" />
              <circle cx="48.9" cy="23.7" r="1.1" />
              <circle cx="44.1" cy="25.1" r="1.1" />
              <circle cx="46.6" cy="27.3" r="1.1" />
              <circle cx="49.0" cy="24.2" r="1.1" />
              <circle className="star-twinkle" cx="49.3" cy="24.5" r="1.3" style={{ animationDelay: '0.66s' }} />
              <circle cx="47.9" cy="25.6" r="1.1" />
              <circle cx="48.2" cy="27.2" r="1.1" />
              <circle cx="51.8" cy="37.6" r="1.1" />
              <circle cx="48.8" cy="41.1" r="1.1" />
              <circle cx="50.5" cy="39.2" r="1.1" />
              <circle className="star-twinkle" cx="48.6" cy="41.8" r="1.3" style={{ animationDelay: '2.88s' }} />
              <circle cx="49.3" cy="37.8" r="1.1" />
              <circle cx="47.1" cy="45.2" r="1.1" />
              <circle cx="47.8" cy="44.8" r="1.1" />
              <circle cx="43.6" cy="50.1" r="1.1" />
              <circle cx="46.4" cy="44.0" r="1.1" />
              <circle className="star-twinkle" cx="46.5" cy="42.5" r="1.3" style={{ animationDelay: '2.1s' }} />
              <circle cx="50.1" cy="52.5" r="1.1" />
              <circle cx="49.4" cy="53.4" r="1.1" />
              <circle cx="51.2" cy="56.6" r="1.1" />
              <circle cx="51.2" cy="50.8" r="1.1" />
              <circle cx="48.9" cy="50.3" r="1.1" />
              <circle className="star-twinkle" cx="53.7" cy="58.9" r="1.3" style={{ animationDelay: '1.32s' }} />
              <circle cx="52.9" cy="55.5" r="1.1" />
              <circle cx="53.0" cy="55.9" r="1.1" />
              <circle cx="51.4" cy="57.0" r="1.1" />
              <circle cx="54.1" cy="58.0" r="1.1" />
              <circle cx="49.6" cy="58.1" r="1.1" />
              <circle className="star-twinkle" cx="53.7" cy="57.1" r="1.3" style={{ animationDelay: '0.54s' }} />
              <circle cx="54.6" cy="60.6" r="1.1" />
              <circle cx="50.4" cy="62.6" r="1.1" />
              <circle cx="50.8" cy="62.0" r="1.1" />
              <circle cx="51.9" cy="61.5" r="1.1" />
              <circle cx="51.4" cy="62.2" r="1.1" />
              <circle className="star-twinkle" cx="48.2" cy="60.3" r="1.3" style={{ animationDelay: '2.76s' }} />
              <circle cx="48.8" cy="64.1" r="1.1" />
              <circle cx="50.2" cy="63.0" r="1.1" />
              <circle cx="45.4" cy="63.1" r="1.1" />
              <circle cx="49.8" cy="61.2" r="1.1" />
              <circle cx="52.1" cy="63.5" r="1.1" />
              <circle className="star-twinkle" cx="53.4" cy="66.1" r="1.3" style={{ animationDelay: '1.98s' }} />
              <circle cx="52.8" cy="63.8" r="1.1" />
              <circle cx="52.4" cy="66.1" r="1.1" />
              <circle cx="53.6" cy="67.6" r="1.1" />
              <circle cx="54.5" cy="63.7" r="1.1" />
              <circle cx="50.8" cy="64.2" r="1.1" />
              <circle className="star-twinkle" cx="52.9" cy="65.8" r="1.3" style={{ animationDelay: '1.2s' }} />
              <circle cx="54.3" cy="64.8" r="1.1" />
              <circle cx="66.8" cy="29.8" r="1.1" />
              <circle cx="63.0" cy="27.7" r="1.1" />
              <circle cx="61.1" cy="28.1" r="1.1" />
              <circle cx="62.3" cy="23.7" r="1.1" />
              <circle className="star-twinkle" cx="64.0" cy="30.0" r="1.3" style={{ animationDelay: '0.42s' }} />
              <circle cx="60.1" cy="27.4" r="1.1" />
              <circle cx="66.5" cy="32.8" r="1.1" />
              <circle cx="64.1" cy="31.0" r="1.1" />
              <circle cx="68.7" cy="34.1" r="1.1" />
              <circle cx="71.6" cy="31.9" r="1.1" />
              <circle className="star-twinkle" cx="65.2" cy="33.1" r="1.3" style={{ animationDelay: '2.64s' }} />
              <circle cx="69.3" cy="33.2" r="1.1" />
              <circle cx="66.2" cy="34.8" r="1.1" />
              <circle cx="68.2" cy="33.7" r="1.1" />
              <circle cx="71.2" cy="33.5" r="1.1" />
              <circle cx="74.5" cy="30.2" r="1.1" />
              <circle className="star-twinkle" cx="72.8" cy="32.1" r="1.3" style={{ animationDelay: '1.86s' }} />
              <circle cx="73.6" cy="32.3" r="1.1" />
              <circle cx="70.9" cy="29.2" r="1.1" />
              <circle cx="75.9" cy="28.2" r="1.1" />
              <circle cx="74.1" cy="32.3" r="1.1" />
              <circle cx="70.4" cy="39.1" r="1.1" />
              <circle className="star-twinkle" cx="67.6" cy="39.1" r="1.3" style={{ animationDelay: '1.08s' }} />
              <circle cx="66.0" cy="38.8" r="1.1" />
              <circle cx="66.7" cy="31.6" r="1.1" />
              <circle cx="72.1" cy="39.5" r="1.1" />
              <circle cx="67.4" cy="42.2" r="1.1" />
              <circle cx="70.0" cy="39.6" r="1.1" />
              <circle className="star-twinkle" cx="67.5" cy="38.8" r="1.3" style={{ animationDelay: '0.3s' }} />
              <circle cx="60.0" cy="40.9" r="1.1" />
              <circle cx="67.2" cy="41.7" r="1.1" />
              <circle cx="64.6" cy="39.3" r="1.1" />
              <circle cx="62.6" cy="38.0" r="1.1" />
              <circle cx="64.9" cy="40.1" r="1.1" />
              <circle className="star-twinkle" cx="64.0" cy="38.5" r="1.3" style={{ animationDelay: '2.52s' }} />
              <circle cx="62.1" cy="41.3" r="1.1" />
              <circle cx="77.5" cy="28.3" r="1.1" />
              <circle cx="58.0" cy="35.5" r="1.1" />
              <circle cx="56.5" cy="35.1" r="1.1" />
              <circle cx="58.5" cy="35.3" r="1.1" />
              <circle className="star-twinkle" cx="58.6" cy="35.9" r="1.3" style={{ animationDelay: '1.74s' }} />
              <circle cx="58.8" cy="37.9" r="1.1" />
              </g>
            </svg>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-sm font-medium mb-8 animate-fade-in">
              <Zap className="w-4 h-4" aria-hidden="true" />
              Powered by Hedera Network
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.15] tracking-tight animate-slide-up">
              Send money <span className="gradient-text font-extrabold">across borders</span> without a crypto wallet.
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Walletless cross-border settlement. You pay in your currency, your recipient gets
              paid in theirs. The Hedera network settles everything behind the scenes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link to="/send-money" className="btn-primary text-base py-4 px-8 w-full sm:w-auto">
                <SendHorizonal className="w-5 h-5" aria-hidden="true" />
                Start a Transfer
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/track" className="btn-secondary text-base py-4 px-8 w-full sm:w-auto">
                <Search className="w-5 h-5" aria-hidden="true" />
                Track Transaction
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-white/40">
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
            <p className="text-ink-muted">Send and receive in 30+ currencies worldwide</p>
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
            <p className="text-xs text-ink-muted mt-1">Researched candidates by region — see <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">full docs</a> for coverage detail</p>
          </div>
          <div className="ticker-mask overflow-hidden">
            <div className="ticker-track gap-3" style={{ animationDirection: 'reverse', animationDuration: '32s' }}>
              {[...partners, ...partners].map((p, i) => (
                <div key={`${p.name}-${i}`} className="glass px-5 py-3 flex items-center gap-2.5 hover:bg-brand-500/5 transition-all cursor-default shrink-0">
                  <Building2 className="w-4 h-4 text-brand-500 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-ink whitespace-nowrap">{p.name}</span>
                  <span className="text-xs text-ink-muted whitespace-nowrap">{p.region}</span>
                </div>
              ))}
            </div>
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
