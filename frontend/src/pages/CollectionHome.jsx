import { Link } from 'react-router-dom';
import brandIcon from '../assets/brand/icon.svg';

const offerings = [
  { icon: '⚡', label: 'Instant settlement' },
  { icon: '🔐', label: 'Non-custodial' },
  { icon: '🔎', label: 'Publicly verifiable' },
];

const projects = [
  {
    name: 'F2F Cross-Border',
    tag: 'Live — ETHGlobal Lisbon 2026 winner',
    description:
      'Fiat in, fiat out, no wallet ever. Licensed partners handle the money; Hedera anchors every step so it’s provable, not just claimed.',
    to: '/cross-border',
    cta: 'Explore F2F Cross-Border',
  },
  {
    name: 'OnChain Oversight',
    tag: 'In development — Cambridge C:\\>DIR Agentic Regulator Hackathon',
    description:
      'An autonomous agent that continuously watches public on-chain activity across Hedera and Ethereum and hands regulators source-linked, replayable findings — never a black box, never unsupervised.',
    to: 'https://deep-dive-into-blockchain.gitbook.io/untitled/compliance-and-legal/regulator-oversight',
    external: true,
    cta: 'Read the concept',
  },
];

export default function CollectionHome() {
  return (
    <div className="flex min-h-screen bg-canvas font-sans antialiased">
      {/* 
        Keyframe Styles for the custom Gateway Animation 
      */}
      <style>{`
        @keyframes flowThrough {
          0% { transform: translate(-250px, -50%) scale(0.8); opacity: 0; }
          20% { transform: translate(-120px, -50%) scale(1); opacity: 1; }
          45% { transform: translate(-20px, -50%) scale(1.1); opacity: 1; filter: brightness(1); }
          50% { transform: translate(0px, -50%) scale(1.2); opacity: 1; filter: brightness(1.5) drop-shadow(0 0 10px rgba(74,222,128,0.8)); }
          55% { transform: translate(20px, -50%) scale(1.1); opacity: 1; filter: brightness(1); }
          80% { transform: translate(120px, -50%) scale(1); opacity: 1; }
          100% { transform: translate(250px, -50%) scale(0.8); opacity: 0; }
        }
        @keyframes laserScan {
          0% { top: 10%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        .anim-coin-1 { animation: flowThrough 5s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .anim-coin-2 { animation: flowThrough 5s infinite cubic-bezier(0.4, 0, 0.2, 1) 1.6s; }
        .anim-coin-3 { animation: flowThrough 5s infinite cubic-bezier(0.4, 0, 0.2, 1) 3.2s; }
        .anim-laser { animation: laserScan 2s ease-in-out infinite alternate; }
      `}</style>

      <aside className="sticky top-0 left-0 h-screen w-full md:w-[40%] bg-[#0a1428] text-white p-10 md:p-16 flex flex-col justify-between overflow-y-auto z-20 shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="font-medium text-base tracking-wide flex items-center gap-3">
            <img src={brandIcon} alt="" className="w-9 h-9 rounded-xl shadow-sm" />
            <span>F2F Cross-Border and Regulatory Oversight</span>
          </div>
        </div>

        <div className="mt-20 flex-grow">
          <h1 className="text-5xl md:text-[3.5rem] font-light leading-[1.1] tracking-tight mb-6">
            Money moves. <br />
            <span className="font-semibold text-brand-400">Make it provable.</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-12 max-w-md">
            Every step of a financial system,
            fiat or on-chain, human or agent, should be independently
            verifiable, not just trusted.
          </p>

          <p className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-4">What ties them together</p>
          <div className="grid grid-cols-3 gap-4 md:gap-5">
            {offerings.map((o) => (
              <div
                key={o.label}
                className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center text-center aspect-square hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-3xl mb-3">{o.icon}</span>
                <span className="text-[11px] md:text-xs font-medium leading-snug">{o.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-5 text-xs font-medium tracking-wide text-white/40 pt-10">
          <a href="mailto:sabaazad93@gmail.com" className="hover:text-white transition-colors">Contact</a>
          <span>&middot;</span>
          <a href="https://github.com/sabaazdn73" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </aside>

      <main className="w-full md:w-[60%] flex flex-col p-8 md:p-16 lg:p-24 gap-12 overflow-x-hidden">
        
        {/* --- NEW ANIMATION HERO SECTION --- */}
        <section className="relative w-full h-64 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex items-center justify-center overflow-hidden">
          {/* Background Grid for aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Connection Line */}
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent top-1/2 -translate-y-1/2 border-dashed"></div>

          {/* Oversight Gate (Center) */}
          <div className="absolute z-10 w-28 h-40 border-x-4 border-t border-b border-[#0a1428] bg-white/40 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg">
            <span className="absolute -top-8 text-[10px] uppercase font-bold tracking-widest text-[#0a1428]/60 bg-white px-3 py-1 rounded-full border border-gray-100">
              Oversight Node
            </span>
            {/* Scanning Laser */}
            <div className="absolute w-full h-[3px] bg-brand-400 shadow-[0_0_15px_rgba(var(--brand-400),1)] anim-laser rounded-full"></div>
            {/* Pulse effect rings */}
            <div className="absolute w-full h-full border border-brand-400/30 rounded-3xl animate-ping opacity-20"></div>
          </div>

          {/* Animated Coins */}
          <div className="absolute top-1/2 left-1/2 anim-coin-1 z-20 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center shadow-[0_8px_15px_rgba(0,0,0,0.2)] border-[3px] border-white/80">
            <span className="text-white font-bold text-sm tracking-tighter">USDT</span>
          </div>
          
          <div className="absolute top-1/2 left-1/2 anim-coin-2 z-20 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full flex items-center justify-center shadow-[0_8px_15px_rgba(0,0,0,0.2)] border-[3px] border-white/80">
            <span className="text-white font-bold text-sm tracking-tighter">USDC</span>
          </div>

          <div className="absolute top-1/2 left-1/2 anim-coin-3 z-20 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-full flex items-center justify-center shadow-[0_8px_15px_rgba(0,0,0,0.2)] border-[3px] border-white/80">
            <span className="text-white font-bold text-xl font-serif">€</span>
          </div>
        </section>
        {/* --- END ANIMATION SECTION --- */}

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-3">Projects</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink mb-12">
            Pick a project to go inside
          </h2>

          <div className="flex flex-col gap-8 md:gap-10">
            {projects.map((proj) => {
              const Wrapper = proj.external ? 'a' : Link;
              const wrapperProps = proj.external
                ? { href: proj.to, target: '_blank', rel: 'noreferrer' }
                : { to: proj.to };
              return (
                <div
                  key={proj.name}
                  className="glass rounded-[2rem] p-8 md:p-12 border border-hairline hover:border-brand-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="text-xs md:text-sm font-semibold tracking-wider uppercase text-brand-400 mb-4">{proj.tag}</p>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink mb-4">{proj.name}</h3>
                  <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-10 max-w-2xl">{proj.description}</p>
                  <Wrapper
                    {...wrapperProps}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-400/10 border border-transparent text-sm font-semibold text-brand-500 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300"
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