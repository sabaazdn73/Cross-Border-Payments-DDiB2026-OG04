import { Link } from 'react-router-dom';
import brandIcon from '../assets/brand/icon.svg';

const offerings = [
  { icon: '\u26a1', label: 'Instant settlement' },
  { icon: '\ud83d\udd10', label: 'Non-custodial' },
  { icon: '\ud83d\udd0e', label: 'Publicly verifiable' },
];

const projects = [
  {
    name: 'F2F Cross-Border',
    tag: 'Live \u2014 ETHGlobal Lisbon 2026 winner',
    description:
      'Fiat in, fiat out, no wallet ever. Licensed partners handle the money; Hedera anchors every step so it\u2019s provable, not just claimed.',
    to: '/cross-border',
    cta: 'Explore F2F Cross-Border',
  },
  {
    name: 'OnChain Oversight',
    tag: 'In development \u2014 Cambridge C:\\>DIR Agentic Regulator Hackathon',
    description:
      'An autonomous agent that continuously watches public on-chain activity across Hedera and Ethereum and hands regulators source-linked, replayable findings \u2014 never a black box, never unsupervised.',
    to: 'https://deep-dive-into-blockchain.gitbook.io/untitled/legal/regulator-oversight',
    external: true,
    cta: 'Read the concept',
  },
];

export default function CollectionHome() {
  return (
    <div className="flex min-h-screen bg-canvas font-sans">
      <aside className="sticky top-0 left-0 h-screen w-full md:w-[40%] bg-[#0a1428] text-white p-10 md:p-12 flex flex-col justify-between overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg flex items-center gap-2">
            <img src={brandIcon} alt="" className="w-8 h-8 rounded-lg" />
            <span>F2F Cross-Border - OnChain Oversight</span>
          </div>
        </div>

        <div className="mt-16 flex-grow">
          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-4">
            Money moves. <br />
            <span className="font-semibold text-brand-400">Make it provable.</span>
          </h1>
          <p className="text-white/60 text-sm mb-10 max-w-sm">
            Every step of a financial system,
            fiat or on-chain, human or agent, should be independently
            verifiable, not just trusted.
          </p>

          <p className="text-xs uppercase tracking-wide text-white/40 mb-3">What ties them together</p>
          <div className="grid grid-cols-3 gap-3">
            {offerings.map((o) => (
              <div
                key={o.label}
                className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col items-center justify-center text-center aspect-square"
              >
                <span className="text-xl mb-1">{o.icon}</span>
                <span className="text-[10px] font-medium leading-tight">{o.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 text-xs text-white/40 pt-8">
          <a href="mailto:sabaazad93@gmail.com" className="hover:text-white">Contact</a>
          <span>&middot;</span>
          <a href="https://github.com/sabaazdn73" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
        </div>
      </aside>

      <main className="w-full md:w-[60%] flex flex-col p-8 md:p-12 gap-16">
        <section>
          <p className="text-xs uppercase tracking-wide text-ink-muted mb-2">Projects</p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">
            Pick a project to go inside
          </h2>

          <div className="flex flex-col gap-6">
            {projects.map((proj) => {
              const Wrapper = proj.external ? 'a' : Link;
              const wrapperProps = proj.external
                ? { href: proj.to, target: '_blank', rel: 'noreferrer' }
                : { to: proj.to };
              return (
                <div
                  key={proj.name}
                  className="glass rounded-2xl p-8 border border-hairline hover:border-brand-400/40 transition-colors"
                >
                  <p className="text-xs font-medium text-brand-400 mb-2">{proj.tag}</p>
                  <h3 className="text-xl font-bold text-ink mb-2">{proj.name}</h3>
                  <p className="text-ink-muted text-sm mb-5">{proj.description}</p>
                  <Wrapper
                    {...wrapperProps}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:underline"
                  >
                    {proj.cta} &rarr;
                  </Wrapper>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
