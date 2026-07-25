# Lean Canvas

> Assembled from [Business Model](business-model.md), [Market Analysis](market-analysis.md), [Go-to-Market Strategy](go-to-market.md), and [SWOT Analysis](swot.md).

---

```
┌─────────────────────────┬──────────────────────────┬─────────────────────────┐
│  PROBLEM                │  SOLUTION                │  UNIQUE VALUE           │
│                         │                          │  PROPOSITION            │
│  1. Cross-border        │  A non-custodial          │                         │
│  freelancer payments    │  orchestration layer:     │  "The licensed parties  │
│  take 1–5 days and      │                          │  move the money.        │
│  hide cost in FX        │  • Sender pays by card   │  We make the chain      │
│  spreads.               │    in their currency.    │  provable."             │
│                         │  • Licensed on-ramp      │                         │
│  2. Crypto settlement   │    converts to USDC/     │  Neither side ever      │
│  rails leave a wallet   │    EURC.                 │  touches a wallet.      │
│  in the flow — either   │  • Hedera anchors every  │  Every compliance       │
│  the sender or the      │    compliance, quote,    │  decision is            │
│  business needs one.    │    and routing decision. │  independently          │
│                         │  • Licensed local        │  verifiable via a       │
│  3. In a chain of       │    partner credits a     │  public Mirror Node,    │
│  independently licensed │    normal bank account.  │  not a row in our       │
│  parties, no party can  │                          │  database.              │
│  verify another's       │  Hedera = trust anchor.  │                         │
│  compliance record.     │  Licensed rails = money. │                         │
├─────────────────────────┼──────────────────────────┼─────────────────────────┤
│  EXISTING               │  KEY METRICS             │  UNFAIR ADVANTAGE       │
│  ALTERNATIVES           │                          │                         │
│                         │  • Transfers per         │  The compliance-trail   │
│  • Wise / Revolut:      │    corridor per day      │  itself: once licensed  │
│    good UX, no          │  • HCS anchors per day   │  parties anchor to the  │
│    verifiable trail,    │    (real TPS)            │  same topic, the        │
│    high float required. │  • Avg. time to verify   │  multi-party record     │
│                         │    (Mirror Node latency) │  becomes richer and     │
│  • Bridge / Due / BVNK: │  • Compliance anchor     │  harder to replicate    │
│    stablecoin rails,    │    cost per transfer     │  without that history.  │
│    but still no         │    (< $0.001)            │                         │
│    verifiable trail.    │  • Corridor partner      │  No custody = no        │
│                         │    agreements signed     │  CASP/PI licence needed │
│  • Ramp / MoonPay:      │  • B2B compliance API    │  = faster time to       │
│    wallet required for  │    subscribers           │  market than any        │
│    every user.          │                          │  licensed competitor.   │
├─────────────────────────┴──────────────────────────┴─────────────────────────┤
│  CUSTOMER SEGMENTS                                                            │
│                                                                               │
│  PRIMARY: Freelancers in emerging markets receiving payment from EU/UK        │
│  clients — Nigeria, India, Brazil (priority corridors, $176.5B+ SAM).        │
│  They need the money in their bank account, not in a crypto wallet.          │
│                                                                               │
│  SECONDARY: SMEs paying international contractors who need an auditable       │
│  compliance trail for their own finance/legal team (B2B API segment).        │
│                                                                               │
│  NOT the recipient — the recipient receives a normal bank credit and          │
│  never registers. Zero adoption cost on the receiving side.                  │
├───────────────────────────────────────┬───────────────────────────────────────┤
│  CHANNELS                             │  COST STRUCTURE                       │
│                                       │                                       │
│  1. Freelance platform partnerships   │  FIXED                                │
│     (reach many senders through       │  • Engineering headcount              │
│      one integration)                 │  • Partner management (BD)            │
│  2. Diaspora community channels       │  • Compliance operations              │
│     (WhatsApp groups, community       │    (borne by licensed parties,        │
│      associations, comparison sites)  │     not us — structural advantage)    │
│  3. Licensed payout-partner           │                                       │
│     co-marketing (access to           │  VARIABLE (per transfer)              │
│     partner's existing user base)     │  • On-ramp fee (card/SEPA)            │
│                                       │  • Payout partner margin              │
│  EXPLICITLY NOT: broad paid           │  • FX spread (mostly theirs)          │
│  advertising pre-revenue.             │  • Hedera fee < $0.001 (negligible)   │
├───────────────────────────────────────┴───────────────────────────────────────┤
│  REVENUE STREAMS                                                              │
│                                                                               │
│  1. Transparent flat fee per transfer (stated, not hidden in spread)         │
│  2. Stated FX spread (below global average, above zero — honest margin)      │
│  3. B2B compliance-evidence API (sold to institutions that want the          │
│     audit trail for regulatory purposes — the highest-margin stream          │
│     because cost is fractions of a cent and no one else offers it)           │
│                                                                               │
│  NOT revenue: no token, no float income (we hold no float).                 │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## Key assumptions to validate first

These are the riskiest bets the canvas rests on, in order:

| # | Assumption | How to test |
|---|---|---|
| 1 | Freelancers in priority corridors will trust a non-bank service with their payment | User interviews (5–10), see [User Feedback Survey](../project/user-feedback-survey.md) |
| 2 | A licensed payout partner will agree to anchor their compliance records | Pilot conversation with Yellow Card / MoMo / Airtel Money |
| 3 | The compliance-evidence API has B2B willingness to pay | 3–5 conversations with SME finance/compliance leads |
| 4 | The verifiable trail is genuinely valued, not just interesting | Include Q6 in the user survey; check if SMEs mention audit trail unprompted |

---

*For the full financial model see [Global Capture Model](global-capture-model.md). For risk analysis see [SWOT](swot.md) and [Risks & Mitigations](../analysis/risks-mitigations.md).*
