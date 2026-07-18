import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Globe, Clock, Lock, CheckCircle2,
  SendHorizonal, Search, ChevronRight, Star, TrendingUp,
  Banknote, Smartphone, Building2
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const benefits = [
  { icon: Shield, title: 'No Wallet Required', description: 'Send money internationally without ever touching a crypto wallet, seed phrase, or private key.' },
  { icon: Zap, title: 'Lightning Fast Settlement', description: 'Hedera blockchain finalizes transactions in 3-5 seconds, far faster than traditional wire transfers.' },
  { icon: Globe, title: '30+ Countries Supported', description: 'Send to recipients across Africa, Asia, Latin America, and beyond with competitive exchange rates.' },
  { icon: Lock, title: 'Compliance Built In', description: 'Automated KYC/AML screening with tamper-proof compliance records anchored on Hedera HCS.' },
  { icon: Clock, title: 'Real-Time Tracking', description: 'Monitor every step of your transfer from payment received to local payout completion.' },
  { icon: CheckCircle2, title: 'Transparent Fees', description: 'No hidden charges. See the exact fee and exchange rate before you confirm your transfer.' },
];

const steps = [
  { step: '01', title: 'Enter Transfer Details', description: 'Fill in the sender and recipient information, choose currencies and payout method.', color: 'from-brand-500 to-brand-600' },
  { step: '02', title: 'Pay with Your Card', description: 'Make a standard card payment. No crypto, no wallets — just your normal payment method.', color: 'from-accent-500 to-accent-600' },
  { step: '03', title: 'Blockchain Settlement', description: 'Behind the scenes, funds are settled via stablecoin on Hedera. Compliance is anchored on HCS.', color: 'from-success-500 to-success-600' },
  { step: '04', title: 'Recipient Gets Paid', description: 'The recipient receives local currency via bank transfer, mobile money, or cash pickup.', color: 'from-brand-600 to-accent-500' },
];

const currencies = [
  { flag: '🇺🇸', code: 'USD', name: 'US Dollar' },
  { flag: '🇬🇧', code: 'GBP', name: 'Brit. Pound' },
  { flag: '🇪🇺', code: 'EUR', name: 'Euro' },
  { flag: '🇳🇬', code: 'NGN', name: 'Naira' },
  { flag: '🇰🇪', code: 'KES', name: 'K. Shilling' },
  { flag: '🇬🇭', code: 'GHS', name: 'Ghanaian Cedi' },
  { flag: '🇮🇳', code: 'INR', name: 'Indian Rupee' },
  { flag: '🇵🇭', code: 'PHP', name: 'Phil. Peso' },
  { flag: '🇲🇽', code: 'MXN', name: 'Mex. Peso' },
  { flag: '🇧🇷', code: 'BRL', name: 'Brazilian Real' },
  { flag: '🇦🇪', code: 'AED', name: 'UAE Dirham' },
  { flag: '🇸🇬', code: 'SGD', name: 'S. Dollar' },
];

const stats = [
  { value: '30+', label: 'Countries', icon: Globe },
  { value: '25+', label: 'Currencies', icon: TrendingUp },
  { value: '3s', label: 'Settlement', icon: Zap },
  { value: '100%', label: 'Compliance', icon: Shield },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
        </div>

        <div className="container-app relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-sm font-medium mb-8 animate-fade-in">
              <Zap className="w-4 h-4" aria-hidden="true" />
              Powered by Hedera Blockchain
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
              Send money{' '}
              <span className="gradient-text">across borders</span>
              <br />
              without a crypto wallet.
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Walletless Cross-Border Settlement. You pay in your currency, your recipient gets
              paid in theirs — blockchain settles everything behind the scenes.
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
      <section className="py-12 border-y border-white/10 bg-navy-900/50" aria-label="Statistics">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
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
              Why Choose Borderless
            </span>
            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-white">
              Everything you need,{' '}
              <span className="gradient-text">nothing you don't</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="glass p-6 hover:bg-white/8 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <b.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-white mb-2">{b.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-navy-900/30" aria-labelledby="how-it-works-heading">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-400 border border-accent-500/30 mb-4">
              Simple Process
            </span>
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-white">
              How it <span className="gradient-text">works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative glass p-6">
                <div className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 z-10" aria-hidden="true" />
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
              <h2 id="security-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Compliance you can<span className="gradient-text-success"> verify</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Every transaction generates a compliance record that's cryptographically hashed and
                anchored on Hedera's Consensus Service. This creates an immutable, tamper-evident
                audit trail — verifiable by anyone, anytime.
              </p>
              <ul className="space-y-3">
                {[
                  'KYC / AML automated screening',
                  'Sanctions list verification',
                  'Risk scoring per transaction',
                  'Immutable Hedera HCS anchoring',
                  'Hash-based tamper detection',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
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
                  <span className="font-semibold text-white text-sm">Compliance Record Verified</span>
                  <span className="ml-auto text-xs text-success-400 bg-success-500/10 border border-success-500/20 px-2 py-0.5 rounded-full">✓ Passed</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/40">HCS Topic ID</span>
                    <span className="text-accent-400 font-mono">0.0.4891234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Sequence #</span>
                    <span className="text-accent-400 font-mono">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Verification</span>
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
                    <p className="text-white/80 text-sm font-medium">{label}</p>
                    <p className="text-white/40 text-xs">{desc}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success-400 ml-auto" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supported Currencies */}
      <section className="section bg-navy-900/30" aria-labelledby="currencies-heading">
        <div className="container-app">
          <div className="text-center mb-10">
            <h2 id="currencies-heading" className="text-3xl md:text-4xl font-bold text-white mb-3">
              Supported Currencies
            </h2>
            <p className="text-white/60">Send and receive in 25+ currencies worldwide</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {currencies.map((cur) => (
              <div key={cur.code} className="glass p-3 text-center hover:bg-white/8 transition-all group cursor-default">
                <div className="text-2xl mb-1" aria-hidden="true">{cur.flag}</div>
                <p className="text-xs font-bold text-white">{cur.code}</p>
                <p className="text-xs text-white/40 truncate">{cur.name}</p>
              </div>
            ))}
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
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to send money <span className="gradient-text">globally?</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
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
