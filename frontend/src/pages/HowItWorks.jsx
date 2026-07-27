import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FadeSection from '../components/ui/FadeSection';
import BackendMap from '../components/BackendMap';

export default function HowItWorks() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" aria-label="How it works">
        <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
        <div className="relative w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              How It <span className="gradient-text font-script">Actually</span> Works
            </h1>
            <p className="text-white/60 mt-4">
              One corridor, start to finish &mdash; Portugal to Armenia &mdash; with every
              anchor point to Hedera marked along the way, and a behind-the-scenes map
              of the exact backend calls involved.
            </p>
          </div>

          <FadeSection as="div" className="w-full max-w-[1260px] mx-auto glass p-2 rounded-2xl overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="/use-case-story.html"
                title="F2F Cross-Border use case walkthrough"
                className="absolute inset-0 w-full h-full rounded-xl border-0"
                allow="autoplay"
              />
            </div>
          </FadeSection>
        </div>
      </section>

      <FadeSection as="section" className="py-16 bg-surface border-t border-hairline">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-ink">
              Behind the <span className="gradient-text">scenes</span>
            </h2>
            <p className="text-ink-muted text-sm mt-2">
              The same corridor, step by step, with the exact backend calls involved.
            </p>
          </div>
          <BackendMap />
        </div>
      </FadeSection>

      <FadeSection as="section" className="py-16 bg-canvas border-t border-hairline">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-ink">
              Built for <span className="gradient-text">regulatory oversight</span>, not just users
            </h2>
            <p className="text-ink-muted text-sm mt-2">
              Every anchor above is readable by anyone through a public Hedera Mirror
              Node &mdash; no API key, no dashboard access, no need to trust our database.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="glass p-5 rounded-xl">
              <h3 className="text-sm font-semibold text-ink mb-1">What's observable</h3>
              <p className="text-ink-muted text-sm">
                When a compliance check happened, that a quote existed before
                settlement, why a transfer routed where it did, and that both
                partners independently confirmed completion &mdash; each with a
                consensus timestamp neither party controls.
              </p>
            </div>
            <div className="glass p-5 rounded-xl">
              <h3 className="text-sm font-semibold text-ink mb-1">Retail scale, today</h3>
              <p className="text-ink-muted text-sm">
                This platform's Phase 1 targets individual retail transfers, exactly
                the segment regulators most often lack the resources to audit deeply.
                Public anchoring lowers that oversight cost without a formal
                disclosure request.
              </p>
            </div>
            <div className="glass p-5 rounded-xl">
              <h3 className="text-sm font-semibold text-ink mb-1">Same pattern, larger institutions</h3>
              <p className="text-ink-muted text-sm">
                The underlying choice &mdash; anchor a hash and a pseudonymous
                reference publicly, keep plaintext off-chain &mdash; isn't specific
                to a small platform. It's a reusable pattern for any institution's
                compliance trail.
              </p>
            </div>
          </div>

          <p className="text-center text-sm">
            <a
              href="https://deep-dive-into-blockchain.gitbook.io/untitled/compliance-and-legal/regulator-oversight"
              target="_blank"
              rel="noreferrer"
              className="text-brand-500 hover:underline"
            >
              Read the full regulator-facing case &rarr;
            </a>
          </p>
        </div>
      </FadeSection>

      <Footer />
    </>
  );
}
