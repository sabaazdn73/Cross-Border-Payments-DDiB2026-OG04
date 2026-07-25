const STEPS = [
  {
    n: '01',
    title: "Maria pays €500",
    detail:
      "Bison Bank / Bison Digital Assets — Portugal's first MiCA-licensed bank CASP, authorised under both PSD2 and MiCA.",
    anchor: false,
  },
  {
    n: '02',
    title: 'KYC · AML · sanctions check',
    detail:
      'Runs automatically against sender and recipient. Provider, check type, and outcome are recorded, never the raw documents.',
    anchor: false,
  },
  {
    n: '03',
    title: 'Initiation anchor',
    detail:
      'Compliance record + FX quote are hashed (canonicalHash) and submitted to HCS via anchorComplianceRecord() + anchorQuote().',
    anchor: true,
  },
  {
    n: '04',
    title: 'Liquidity check',
    detail:
      'chooseSettlementRail() calls fetchHederaStablecoinLiquidityUsd(), a live read from SaucerSwap — Hedera\'s native DEX — via its /stats endpoint.',
    anchor: false,
  },
  {
    n: '05',
    title: 'Routing anchor',
    detail:
      '€500 is within the safe threshold, so Hedera + USDC is chosen. The decision and its stated reason are hashed and anchored via anchorRoutingDecision().',
    anchor: true,
  },
  {
    n: '06',
    title: 'Two-of-two settlement',
    detail:
      'executeSettlement() moves USDC into a Hedera account governed by a 2-of-2 threshold key — one signer is Bison Bank, the other the destination CASP. Neither key is ours.',
    anchor: false,
  },
  {
    n: '07',
    title: 'Destination co-signs, payout lands',
    detail:
      "The Armenia-side, CBA-licensed CASP co-signs the release. USDC converts to AMD and lands in Aram's ordinary bank account.",
    anchor: false,
  },
  {
    n: '08',
    title: 'Completion schedule',
    detail:
      'createCompletionSchedule() wraps a final HCS message in a ScheduleCreateTransaction — pending until both partners sign, expiring in 48h if they don\'t (well under HSS\'s 62-day ceiling).',
    anchor: false,
  },
  {
    n: '09',
    title: 'Completion anchor',
    detail:
      'Two separate ScheduleSignTransaction calls land. The instant both do, Hedera\'s own consensus executes the wrapped message — "this transfer completed" is anchored the moment it becomes true.',
    anchor: true,
  },
];

export default function BackendMap() {
  return (
    <div className="relative">
      <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-thin">
        <div className="flex items-stretch gap-3 min-w-max">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex items-stretch gap-3">
              <div
                className={`w-72 shrink-0 rounded-2xl border p-5 flex flex-col gap-2 transition-shadow ${
                  step.anchor
                    ? 'border-brand-400 bg-brand-500/10 shadow-[0_0_30px_rgba(140,123,255,0.18)]'
                    : 'border-hairline bg-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-semibold ${
                      step.anchor ? 'text-brand-400' : 'text-ink-muted'
                    }`}
                  >
                    {step.n}
                  </span>
                  {step.anchor && (
                    <span className="text-[10px] font-bold tracking-wide text-brand-400 uppercase">
                      &#9875; HCS anchor
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-ink text-sm leading-snug">{step.title}</h3>
                <p className="text-ink-muted text-xs leading-relaxed">{step.detail}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex items-center shrink-0 text-ink-muted/40 text-xl px-1" aria-hidden="true">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-ink-muted text-xs mt-2">
        Scroll horizontally to follow the full corridor, left to right.
      </p>
    </div>
  );
}
