import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Clock, Users, Target, Zap, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import banner from '../assets/marketing/banner.png';

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      {/* Banner hero */}
      <section className="relative pt-28 pb-16 bg-hero-gradient overflow-hidden">
        <div className="container-app relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-sm font-medium mb-6">
              DDiB 2026 &middot; University of Zurich
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-4">
              A settlement layer for the money that correspondent banking leaves behind
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Built for the corridors where sending money is slowest, priciest, and least transparent.
            </p>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-glass border border-hairline">
            <img src={banner} alt="Cross-Border: Fiat-to-Fiat Settlement, built for DDiB 2026 at the University of Zurich, powered by Hedera" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section bg-canvas">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-danger-500/10 text-danger-400 text-xs font-semibold uppercase tracking-wider mb-3">The Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink">Correspondent banking wasn't built for these corridors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass p-6">
              <TrendingDown className="w-8 h-8 text-danger-400 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">High, unpredictable cost</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Thin correspondent-banking relationships mean wide spreads and stacked intermediary fees, especially into emerging markets.</p>
            </div>
            <div className="glass p-6">
              <Clock className="w-8 h-8 text-danger-400 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">Days, not seconds</h3>
              <p className="text-sm text-ink-muted leading-relaxed">A transfer can pass through three or four correspondent banks before it reaches the recipient's account.</p>
            </div>
            <div className="glass p-6">
              <ShieldCheck className="w-8 h-8 text-danger-400 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">Opaque compliance</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Senders rarely get a verifiable record that a compliance check actually happened, only a black-box status update.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section bg-surface">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-success-500/10 text-success-400 text-xs font-semibold uppercase tracking-wider mb-3">The Solution</span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink">One licensed on-ramp in, one licensed payout partner out</h2>
            <p className="text-ink-muted max-w-2xl mx-auto mt-3">Stablecoin settlement replaces the correspondent-banking chain with a single verifiable leg, anchored on the Hedera network. No wallet, no seed phrase, no crypto experience required from either side.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass p-6">
              <Zap className="w-8 h-8 text-brand-500 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">Seconds, not days</h3>
              <p className="text-sm text-ink-muted leading-relaxed">The Hedera leg settles in 3-5 seconds. The last mile depends on the destination's local rail, shown honestly per corridor.</p>
            </div>
            <div className="glass p-6">
              <ShieldCheck className="w-8 h-8 text-brand-500 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">A record that can't be quietly edited</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Every compliance check is anchored, pseudonymously, so it can be verified without exposing anyone's identity.</p>
            </div>
            <div className="glass p-6">
              <Users className="w-8 h-8 text-brand-500 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">Neither side touches crypto</h3>
              <p className="text-sm text-ink-muted leading-relaxed">The sender pays by card or bank transfer. The recipient receives ordinary local currency. The settlement layer stays invisible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target market */}
      <section className="section bg-canvas">
        <div className="container-app max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold uppercase tracking-wider mb-3">First Target Market</span>
          <Target className="w-10 h-10 text-brand-500 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Diaspora remittances into mobile-money-first Africa</h2>
          <p className="text-ink-muted leading-relaxed max-w-2xl mx-auto mb-6">
            The corridor with the clearest evidence base for this design: deep, licensed mobile money infrastructure already in place (M-Pesa, MTN MoMo, Airtel Money), thin correspondent-banking coverage driving up traditional transfer costs, and named potential partners (Yellow Card, Conduit) already operating at scale across the region. See the full research in the docs.
          </p>
          <Link to="/send-money" className="btn-primary inline-flex items-center gap-2">
            Try the demo flow <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
