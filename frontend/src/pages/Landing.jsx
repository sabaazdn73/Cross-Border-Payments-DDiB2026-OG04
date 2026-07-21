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
            <h2 className="text-2xl md:text-3xl font-bold text-ink">Correspondent banking is shrinking, not scaling</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass p-6">
              <TrendingDown className="w-8 h-8 text-danger-400 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">A shrinking, poorly-interconnected network</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Active correspondent banking relationships have fallen 25% since 2011, with the steepest declines in Africa, the Pacific Islands, and the Caribbean (BIS, 2026). Fewer links mean longer, costlier payment chains.</p>
            </div>
            <div className="glass p-6">
              <Clock className="w-8 h-8 text-danger-400 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">Whole regions lose direct access</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Banks "de-risk" by cutting off entire jurisdictions rather than individual accounts. FATF acknowledged in 2025 that this has caused real financial-inclusion harm, not just compliance friction.</p>
            </div>
            <div className="glass p-6">
              <ShieldCheck className="w-8 h-8 text-danger-400 mb-3" aria-hidden="true" />
              <h3 className="font-bold text-ink mb-2">Pre-funding traps capital</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Traditional banks (and pre-funded stablecoin issuers alike) lock roughly $10 trillion globally in nostro/vostro accounts just to be ready to pay out (industry estimate, 2025). We don't pre-fund every corridor ourselves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section bg-surface">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ink">We break the route apart, then ride the stablecoin rail</h2>
            <p className="text-ink-muted max-w-2xl mx-auto mt-3">Instead of one long correspondent-banking chain, we decompose each transfer and route it through the fastest available licensed partner for that corridor. A stablecoin leg, anchored on the Hedera network, carries the value between them, so the outcome is a fiat-to-fiat transfer even though neither side ever touches crypto.</p>
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
        <div className="container-app max-w-5xl mx-auto text-center">
          <Target className="w-10 h-10 text-brand-500 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">Two groups who feel this problem directly</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-8">
            <div className="glass p-6">
              <h3 className="font-bold text-ink mb-2">Freelancers in underbanked markets</h3>
              <p className="text-sm text-ink-muted leading-relaxed">Nigeria alone has 1.8 million registered freelancers, the largest freelance market in Africa, and payment accessibility is reported as the number one challenge they face (Jobbers.io freelance payment report, Jan 2026). They need their earned currency to land reliably, in a currency they can actually use.</p>
            </div>
            <div className="glass p-6">
              <h3 className="font-bold text-ink mb-2">Senders who don't want to touch crypto</h3>
              <p className="text-sm text-ink-muted leading-relaxed">People sending money abroad who have no interest in learning wallets, seed phrases, or exchange rates, and who specifically want to avoid the scam and mis-send risk of handling digital assets directly. For them, the settlement layer should be invisible, not something they have to manage.</p>
            </div>
          </div>
          <Link to="/send-money" className="btn-primary inline-flex items-center gap-2 mt-8">
            Try the demo flow <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
