import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Globe, Clock, Lock, CheckCircle2,
  SendHorizonal, Search, ChevronRight, Star, TrendingUp,
  Banknote, Smartphone, Building2, Smartphone as PhoneIcon
} from 'lucide-react';
import Navbar, { DOCS_URL } from '../components/layout/Navbar';
import usdcLogo from '../assets/logos/stablecoins/usdc.png';
import eurcLogo from '../assets/logos/stablecoins/eurc.png';
import StyledGlobe from '../components/StyledGlobe';
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
import logoEbanx from '../assets/logos/partners/ebanx.png';
import logoMercadoPago from '../assets/logos/partners/mercado-pago.png';
import logoPayu from '../assets/logos/partners/payu.png';
import Footer from '../components/layout/Footer';
import FadeSection from '../components/ui/FadeSection';

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
  { name: 'EBANX', region: 'Brazil · Latin America', logoSrc: logoEbanx },
  { name: 'Mercado Pago', region: 'Latin America', logoSrc: logoMercadoPago },
  { name: 'PayU', region: 'Colombia · Global', logoSrc: logoPayu },
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

      <div className="flex flex-col lg:flex-row pt-16">

        {/* ------------------------------------------------------- */}
        {/* Sticky sidebar -- always-visible intro, CTAs, the globe  */}
        {/* ------------------------------------------------------- */}
        <aside className="w-full lg:w-[38%] lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] bg-hero-gradient text-white overflow-y-auto p-8 md:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 leading-[1.15] tracking-tight">
              F2F Cross-Border
            </h1>
            <p className="text-xl sm:text-2xl font-semibold mb-6 tracking-tight">
              <span className="gradient-text font-script text-3xl sm:text-4xl lg:text-5xl">Fiat-to-Fiat</span>{' '}
              <span className="text-white/70 text-lg sm:text-xl">Settlement Platform</span>
            </p>

            <p className="text-white/60 mb-8 leading-relaxed">
              Fiat-to-fiat conversion, carried across borders on the stablecoin rail.
              An orchestration layer coordinates licensed partners behind the scenes,
              so senders and recipients get a modern transfer, not the wait and cost
              of traditional banking&rsquo;s slower rails.
            </p>

            <div className="flex justify-center mb-10">
              <StyledGlobe size={200} />
            </div>

            <div className="flex flex-col gap-3 mb-10">
              <Link
                to="/send-money"
                className="flex items-center justify-center gap-2.5 rounded-full bg-white/95 hover:bg-white text-[#1a1530] font-semibold text-base py-3.5 px-7 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
              >
                <SendHorizonal className="w-[18px] h-[18px] text-brand-500" aria-hidden="true" />
                Start Onboarding
              </Link>
              <Link
                to="/track"
                className="flex items-center justify-center gap-2.5 rounded-full bg-white/10 hover:bg-white/[0.15] text-white font-semibold text-base py-3.5 px-7 transition-all duration-200 border border-white/15 hover:-translate-y-0.5"
              >
                <Search className="w-[18px] h-[18px]" aria-hidden="true" />
                Track Transaction
              </Link>
              <Link
                to="/app"
                className="flex items-center justify-center gap-2 text-sm font-medium text-white/50 hover:text-white/80 transition-colors py-2"
              >
                <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                Try the mobile app demo &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-xl font-bold gradient-text tracking-tight">{stat.value}</p>
                <p className="text-white/50 text-[11px] leading-tight mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* ------------------------------------------------------- */}
        {/* Scrollable main -- everything else, unchanged content   */}
        {/* ------------------------------------------------------- */}
        <main className="w-full lg:w-[62%] flex flex-col">

          <FadeSection as="section" className="py-16 border-b border-hairline" aria-labelledby="pitch-video-heading">
            <div className="container-app">
              <div className="text-center mb-8">
                <h2 id="pitch-video-heading" className="text-2xl md:text-3xl font-bold text-ink">
                  Watch <span className="gradient-text">our story</span>
                </h2>
                <p className="text-ink-muted text-sm mt-2 max-w-xl mx-auto">
                  How we got here, how the platform is built, and why we anchor every transfer.
                </p>
              </div>
              <div className="glass p-2 rounded-2xl overflow-hidden">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src="/pitch-video.html"
                    title="F2F Cross-Border pitch video"
                    className="absolute inset-0 w-full h-full rounded-xl border-0"
                    allow="autoplay"
                  />
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection as="section" className="py-12 border-b border-hairline bg-surface" aria-label="Statistics">
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
          </FadeSection>

          <FadeSection as="section" className="py-16 md:py-24" aria-labelledby="benefits-heading">
            <div className="container-app">
              <div className="text-center mb-14">
                <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-ink">
                  Built around what a transfer{' '}
                  <span className="gradient-text">actually needs</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          </FadeSection>

          <FadeSection as="section" className="py-16 md:py-24 bg-surface" aria-labelledby="how-it-works-heading">
            <div className="container-app">
              <div className="text-center mb-14">
                <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-ink">
                  How a transfer <span className="gradient-text">actually moves</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {steps.map((step, i) => (
                  <div key={i} className="relative glass p-6">
                    <div className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                      {step.step}
                    </div>
                    <h3 className="font-bold text-ink mb-2">{step.title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          <FadeSection as="section" className="py-16 md:py-24" aria-labelledby="security-heading">
            <div className="container-app">
              <h2 id="security-heading" className="text-3xl md:text-4xl font-bold text-ink mb-4">
                Compliance you can<span className="gradient-text-success"> verify</span>
              </h2>
              <p className="text-ink-muted leading-relaxed mb-6">
                Every transaction generates a compliance record that's cryptographically hashed and
                anchored on Hedera's Consensus Service. This creates an immutable, tamper-evident
                audit trail, verifiable by anyone, anytime.
              </p>
              <ul className="space-y-3 mb-8">
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
              <Link to="/tamper-demo" className="btn-secondary mb-10 inline-flex">
                See Tamper Detection Demo
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

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
                      <span className="text-accent-400 font-mono">0.0.9617780</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Transaction</span>
                      <span className="text-accent-400 font-mono text-[11px]">0.0.8762554@1784361895...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Verification</span>
                      <span className="text-success-400">Hash match ✓</span>
                    </div>
                    <a
                      href="https://hashscan.io/testnet/transaction/0.0.8762554@1784361895.557696832"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-brand-500 hover:underline pt-1"
                    >
                      View this real transaction on HashScan →
                    </a>
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
          </FadeSection>

          <FadeSection as="section" className="py-16 md:py-24 bg-surface" aria-labelledby="currencies-heading">
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
                      <img src={p.logoSrc} alt={p.name} className="h-11 w-auto max-w-[150px] object-contain rounded" />
                      <span className="text-xs text-ink-muted whitespace-nowrap border-l border-hairline pl-3">{p.region}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-ink">One ledger to trust. Any network to move on.</h3>
                </div>
                <div className="grid grid-cols-1 gap-5 mb-10">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {settlementNetworks.map((n) => (
                    <div key={n.name} className={`glass p-4 text-center ${n.live ? 'ring-2 ring-brand-500/40' : ''}`}>
                      <img src={n.logoSrc} alt={n.name} className="h-9 w-auto max-w-full object-contain mx-auto mb-2 rounded" />
                      <p className="text-xs text-ink-muted font-mono">{n.share}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${n.live ? 'bg-success-500/15 text-success-400' : 'bg-ink-muted/10 text-ink-muted'}`}>
                        {n.live ? 'Live' : 'Planned'}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-ink-muted mt-4">Ordered by USDC liquidity share among these five chains, mid-2026. See <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">the sourced breakdown</a> for the full picture, including why Hedera's thin slice is the point, not a gap.</p>

                <div className="mt-12 pt-10 border-t border-hairline">
                  <h3 className="text-center text-lg font-bold text-ink mb-6">Supported Stablecoins</h3>
                  <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                    <div className="glass p-5 flex items-center gap-4">
                      <img src={usdcLogo} alt="USDC" className="w-11 h-11 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-ink">USDC (Circle)</p>
                        <p className="text-xs text-ink-muted">Used across all five supported chains</p>
                      </div>
                    </div>
                    <div className="glass p-5 flex items-center gap-4">
                      <img src={eurcLogo} alt="EURC" className="w-11 h-11 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-ink">EURC (Circle)</p>
                        <p className="text-xs text-ink-muted">The MiCA-compliant choice for the EU leg</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs text-ink-muted mt-4">USDT is deliberately excluded: it is not MiCA-compliant and has been delisted from major EU venues.</p>

                  <div className="mt-10 stablecoin-flow-scene relative w-full h-48 sm:h-64 bg-white border border-hairline rounded-[2.5rem] shadow-sm flex items-center justify-center overflow-hidden">
                    <style>{`
                      .stablecoin-flow-scene { --flow-distance: 110px; }
                      @media (min-width: 640px) { .stablecoin-flow-scene { --flow-distance: 250px; } }
                      @keyframes stablecoinFlow {
                        0% { transform: translate(calc(-1 * var(--flow-distance)), -50%) scale(0.8); opacity: 0; }
                        20% { transform: translate(calc(-0.48 * var(--flow-distance)), -50%) scale(1); opacity: 1; }
                        45% { transform: translate(calc(-0.08 * var(--flow-distance)), -50%) scale(1.15); opacity: 1; filter: brightness(1); }
                        50% { transform: translate(0px, -50%) scale(1.3); opacity: 1; filter: brightness(1.6) drop-shadow(0 0 16px rgba(108,86,227,0.9)); }
                        55% { transform: translate(calc(0.08 * var(--flow-distance)), -50%) scale(1.15); opacity: 1; filter: brightness(1); }
                        80% { transform: translate(calc(0.48 * var(--flow-distance)), -50%) scale(1); opacity: 1; }
                        100% { transform: translate(var(--flow-distance), -50%) scale(0.8); opacity: 0; }
                      }
                      @keyframes stablecoinLaser {
                        0% { top: 10%; opacity: 0; }
                        15% { opacity: 1; }
                        85% { opacity: 1; }
                        100% { top: 90%; opacity: 0; }
                      }
                      .anim-stablecoin-flow { animation: stablecoinFlow 5s infinite cubic-bezier(0.4, 0, 0.2, 1); }
                      .anim-stablecoin-laser { animation: stablecoinLaser 2s ease-in-out infinite alternate; }
                    `}</style>

                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-hairline to-transparent top-1/2 -translate-y-1/2" />

                    <div className="absolute z-10 w-20 h-28 sm:w-28 sm:h-40 border-x-4 border-t border-b border-brand-500 bg-white/40 backdrop-blur-md rounded-3xl flex items-center justify-center">
                      <span className="absolute -top-7 sm:-top-8 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-brand-600 bg-white px-2.5 sm:px-3 py-1 rounded-full border border-hairline whitespace-nowrap">
                        Anchored here
                      </span>
                      <div className="absolute w-full h-[3px] bg-brand-400 shadow-[0_0_15px_rgba(108,86,227,0.9)] anim-stablecoin-laser rounded-full" />
                    </div>

                    {[
                      { key: 'usd', label: '$', kind: 'fiat', delay: '0s' },
                      { key: 'usdc', label: 'USDC', kind: 'coin', delay: '1.6s', from: 'from-blue-500 to-blue-800' },
                      { key: 'eurc', label: 'EURC', kind: 'coin', delay: '3.2s', from: 'from-indigo-500 to-purple-800' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className={`absolute top-1/2 left-1/2 anim-stablecoin-flow z-20 flex items-center justify-center border-[3px] border-white/80 rounded-full ${
                          item.kind === 'coin'
                            ? `w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${item.from} shadow-[0_8px_15px_rgba(0,0,0,0.2)]`
                            : 'w-9 h-9 sm:w-12 sm:h-12 bg-[#0a1428] shadow-[0_8px_15px_rgba(0,0,0,0.15)]'
                        }`}
                        style={{ animationDelay: item.delay }}
                      >
                        <span className={`text-white font-bold tracking-tighter ${item.kind === 'coin' ? 'text-[10px] sm:text-sm' : 'text-base sm:text-lg font-serif'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}

                    <span className="absolute bottom-4 text-[11px] text-ink-muted tracking-wide">
                      Fiat in, compliant stablecoin across, every crossing logged
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection as="section" className="py-16 md:py-24">
            <div className="container-app">
              <div className="relative bg-[#0a1428] rounded-[2rem] overflow-hidden p-10 md:p-14">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-400 via-transparent to-transparent" aria-hidden="true" />
                <h2 className="relative z-10 text-2xl md:text-3xl font-light text-white mb-3 max-w-lg">
                  Built for <span className="font-semibold text-brand-400">regulatory oversight</span>, not just users.
                </h2>
                <p className="relative z-10 text-white/60 text-sm mb-6 max-w-md">
                  Every anchor above is readable by anyone through a public Hedera Mirror Node,
                  no API key, no trusting our database. See how the same pattern generalises
                  to any on-chain activity, in our sister project.
                </p>
                <a
                  href="https://deep-dive-into-blockchain.gitbook.io/untitled/compliance-and-legal/regulator-oversight"
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors"
                >
                  Read the OnChain Oversight concept &rarr;
                </a>
              </div>
            </div>
          </FadeSection>

        </main>
      </div>

      <Footer />
    </div>
  );
}
