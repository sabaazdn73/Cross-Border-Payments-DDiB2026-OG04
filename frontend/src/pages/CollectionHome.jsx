import { Link } from 'react-router-dom';
import brandIcon from '../assets/brand/icon.svg';
import NotificationPhotoSection from '../components/NotificationPhotoSection';
import f2fEthglobalCard from '../assets/marketing/f2f-uzh-ethglobal.jpeg';
import tnegaLogo from '../assets/marketing/agents-marketplace.jpg';

const offerings = [
  { icon: '⚡', label: 'Instant settlement' },
  { icon: '🔐', label: 'Non-custodial' },
  { icon: '🔎', label: 'Publicly verifiable' },
];

// One accent per project, pulled from the existing brand/warning/success
// ramps in tailwind.config.js — brand (violet) for F2F, warning (gold)
// for Tnega since that's BNB Chain's own color, success (blue) for
// OnChain Oversight since blue is already this codebase's "verified /
// regulator" signal. Written as full literal class strings (not built
// via template concatenation) so Tailwind's content scanner picks them
// up at build time.
const ACCENTS = {
  brand: {
    dot: '#8874ee',
    text: 'text-brand-400',
    tag: 'bg-brand-400/10 text-brand-400',
    border: 'hover:border-brand-400',
    shadow: 'hover:shadow-glow',
    bar: 'from-brand-400 to-brand-600',
    cta: 'bg-brand-400/10 text-brand-500 hover:bg-brand-500 hover:border-brand-500',
  },
  warning: {
    dot: '#f59e0b',
    text: 'text-warning-500',
    tag: 'bg-warning-400/10 text-warning-500',
    border: 'hover:border-warning-400',
    shadow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    bar: 'from-warning-400 to-warning-500',
    cta: 'bg-warning-400/10 text-warning-500 hover:bg-warning-500 hover:text-white hover:border-warning-500',
  },
  success: {
    dot: '#3d7ee8',
    text: 'text-success-500',
    tag: 'bg-success-400/10 text-success-500',
    border: 'hover:border-success-400',
    shadow: 'hover:shadow-glow-success',
    bar: 'from-success-400 to-success-500',
    cta: 'bg-success-400/10 text-success-500 hover:bg-success-500 hover:text-white hover:border-success-500',
  },
};

const projects = [
  {
    name: 'F2F Cross-Border',
    accent: 'brand',
    tag: 'Live — ETHGlobal Lisbon 2026 Partner Prize Winner',
    blurb:
      'Send money across borders without ever touching a crypto wallet. A licensed on-ramp converts to a compliant stablecoin, Hedera settles it in seconds, and a licensed local partner pays out in the recipient’s currency — every step anchored on Hedera’s public Mirror Node.',
    description:
      'Fiat in, fiat out, no wallet ever. Licensed partners handle the money; Hedera anchors every step so it’s provable, not just claimed.',
    to: '/cross-border',
    cta: 'Explore F2F Cross-Border',
    hideCta: true,
    image: f2fEthglobalCard,
    imageAlt: 'F2F Cross-Border — ETHGlobal Lisbon 2026 showcase',
    refs: [
      { label: 'View on ETHGlobal', href: 'https://ethglobal.com/showcase/f2f-cross-border-xcxmu' },
      { label: 'Open live demo', href: '/cross-border', internal: true },
    ],
  },
  {
    name: 'Tnega',
    accent: 'warning',
    tag: 'Live — 1,500+ agents on BNB Chain',
    blurb:
      'A live marketplace of autonomous AI agents on BNB Smart Chain mainnet. Agents publish and discover each other through ERC-8004 identity registries, get hired directly, and get paid through real ERC-8183 escrow — so an agent economy trades under the same on-chain scrutiny as everything else here.',
    description:
      'A marketplace where autonomous AI agents discover, hire, and pay each other for tasks — every listing, price, and payment settled on-chain so the whole exchange stays auditable. Formerly Agents Marketplace.',
    to: 'https://tnega.app',
    external: true,
    cta: 'Explore Tnega',
    hideCta: true,
    image: tnegaLogo,
    imageAlt: 'Tnega — showcase',
    imageClassName: 'max-w-lg',
    refs: [
      { label: 'Open live site', href: 'https://tnega.app' },
    ],
  },
  {
    name: 'OnChain Oversight',
    accent: 'success',
    tag: 'In development',
    blurb:
      'An autonomous agent built for regulators, not traders. It continuously reads public on-chain activity across Hedera and Ethereum and hands back source-linked, replayable findings instead of a dashboard they have to take on faith.',
    description:
      'An autonomous agent that continuously watches public on-chain activity across Hedera and Ethereum and hands regulators source-linked, replayable findings — never a black box, never unsupervised.',
    to: 'https://deep-dive-into-blockchain.gitbook.io/untitled/compliance-and-legal/regulator-oversight',
    external: true,
    cta: 'Read the concept',
  },
];

export default function CollectionHome() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-canvas font-sans antialiased">
      <aside className="relative md:sticky md:top-0 md:left-0 h-auto md:h-screen w-full md:w-[420px] md:shrink-0 bg-[#0a1428] text-white p-10 md:p-16 flex flex-col justify-between md:overflow-y-auto overflow-x-hidden z-20 shadow-2xl">
        {/* Decorative gradient glow — depth for the flat navy field, kept behind everything */}
        <div className="pointer-events-none absolute -top-32 -right-24 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-success-500/10 blur-3xl" />

        <div className="relative flex justify-between items-center">
          <div className="font-medium text-base tracking-wide flex items-center gap-3">
            <img src={brandIcon} alt="" className="w-9 h-9 rounded-xl shadow-sm" />
            <span>F2F Cross-Border, Tnega &amp; OnChain Oversight</span>
          </div>
        </div>

        <div className="relative mt-20 flex-grow">
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-light leading-[1.1] tracking-tight mb-6">
            Money moves. <br />
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-brand-400">Make it provable.</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-12 max-w-md">
            Every step of a financial system, fiat or on-chain, human or
            agent, should be independently verifiable, not just trusted.
          </p>

          <p className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-4">Inside this collection</p>
          <nav className="flex flex-col gap-1 mb-12">
            {projects.map((proj) => {
              const a = ACCENTS[proj.accent];
              const ItemWrapper = proj.external ? 'a' : Link;
              const itemProps = proj.external
                ? { href: proj.to, target: '_blank', rel: 'noreferrer' }
                : { to: proj.to };
              return (
                <ItemWrapper
                  key={proj.name}
                  {...itemProps}
                  className="group flex items-center gap-3 py-2.5 border-b border-white/5 last:border-b-0 hover:pl-1 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.dot }} />
                  <span className="text-sm font-medium text-white/75 group-hover:text-white transition-colors">{proj.name}</span>
                  <span className="ml-auto text-white/25 group-hover:text-white/60 transition-colors text-sm">&rarr;</span>
                </ItemWrapper>
              );
            })}
          </nav>

          <p className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-4">What ties them together</p>
          <div className="grid grid-cols-3 gap-4 md:gap-5">
            {offerings.map((o) => (
              <div
                key={o.label}
                className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center text-center aspect-square hover:bg-white/10 hover:border-white/20 hover:shadow-glow transition-all duration-300"
              >
                <span className="text-3xl mb-3">{o.icon}</span>
                <span className="text-[11px] md:text-xs font-medium leading-snug">{o.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex gap-5 text-xs font-medium tracking-wide text-white/40 pt-10">
          <a href="mailto:sabaazad93@gmail.com" className="hover:text-white transition-colors">Contact</a>
          <span>&middot;</span>
          <a href="https://www.linkedin.com/in/saba-azadegan-2974b622a" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Social</a>
          <span>&middot;</span>
          <a href="https://github.com/sabaazdn73" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </aside>

      <main className="relative w-full md:flex-1 flex flex-col p-8 md:p-16 lg:p-24 gap-16 overflow-x-hidden">
        {/* Decorative gradient glows — soft color on the otherwise flat canvas */}
        <div className="pointer-events-none absolute top-0 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-400/10 blur-3xl -z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[24rem] h-[24rem] rounded-full bg-success-400/10 blur-3xl -z-10" />

        <NotificationPhotoSection />

        <section className="max-w-3xl">
          <p className="text-ink-muted leading-relaxed">
            Money moves through wildly different rails today; card and bank
            transfers, compliant stablecoins settling in seconds, and increasingly,
            autonomous AI agents paying each other directly over protocols,
            and each of those rails comes with its own tooling, its own
            dashboards, and its own private idea of what actually counts as proof.
          </p>
          <p className="gradient-text font-script text-3xl md:text-4xl my-6 leading-snug">
            Did this actually happen, and can I check that myself?
          </p>
          <p className="text-ink-muted leading-relaxed">
            Neither a sender wiring money home nor a regulator trying to keep pace
            with machine-speed transactions should have to learn five unrelated
            systems just to get an honest answer to that one question, and that
            single conviction is what all three projects in this collection are built on.
          </p>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Three ways in</p>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink mb-10 max-w-2xl">
            One conviction, applied to fiat rails, an agent economy, and the regulators watching both.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
            {projects.map((proj) => {
              const a = ACCENTS[proj.accent];
              return (
                <div key={proj.name} className="relative pl-5">
                  <span
                    className="absolute left-0 top-[0.4rem] w-2 h-2 rounded-full"
                    style={{ background: a.dot }}
                  />
                  <p className={`text-sm font-semibold uppercase tracking-wide mb-2 ${a.text}`}>{proj.name}</p>
                  <p className="text-ink-muted text-sm leading-relaxed">{proj.blurb}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="h-px w-full max-w-3xl bg-gradient-to-r from-hairline via-hairline to-transparent" />

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Projects</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-12">
            Pick a project to go inside
          </h2>

          <div className="flex flex-col gap-8 md:gap-10">
            {projects.map((proj) => {
              const a = ACCENTS[proj.accent];
              const Wrapper = proj.external ? 'a' : Link;
              const wrapperProps = proj.external
                ? { href: proj.to, target: '_blank', rel: 'noreferrer' }
                : { to: proj.to };
              return (
                <div
                  key={proj.name}
                  className={`group relative overflow-hidden glass rounded-[2rem] p-8 md:p-12 border border-hairline ${a.border} ${a.shadow} transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.bar} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <p className={`inline-block text-xs md:text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5 ${a.tag}`}>{proj.tag}</p>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink mb-4">{proj.name}</h3>
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.imageAlt || `${proj.name} project image`}
                      className={`w-full ${proj.imageClassName || 'max-w-sm'} rounded-2xl border border-hairline mb-6`}
                    />
                  )}
                  <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-6 max-w-2xl">{proj.description}</p>
                  {proj.refs && (
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-sm">
                      {proj.refs.map((ref) =>
                        ref.internal ? (
                          <Link key={ref.label} to={ref.href} className={`${a.text} hover:underline`}>
                            {ref.label} &rarr;
                          </Link>
                        ) : (
                          <a
                            key={ref.label}
                            href={ref.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`${a.text} hover:underline`}
                          >
                            {ref.label} &rarr;
                          </a>
                        )
                      )}
                    </div>
                  )}
                  {!proj.hideCta && (
                    <Wrapper
                      {...wrapperProps}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent text-sm font-semibold transition-all duration-300 ${a.cta}`}
                    >
                      {proj.cta} &rarr;
                    </Wrapper>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
