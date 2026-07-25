# UZH Blockchain

F2F Cross-Border started here: an idea researched and built from
scratch by **Saba Azadegan** as her submission for the University of
Zurich's **Deep Dive into Blockchain (DDiB) 2026** summer school,
before any later extension for ETHGlobal Lisbon 2026 (covered
separately in [ETHGlobal Lisbon 2026](ethglobal-lisbon.md)).

## The core idea

Correspondent banking routes a cross-border payment through a chain
of intermediary banks, each one adding delay and hiding its cut in
the FX spread, and the newer crypto ramps that promise to fix this
still hand the sender a wallet. The idea researched and built here
takes a third path: licensed partners handle the fiat on-ramp and
off-ramp exactly as they do today, a compliant stablecoin carries the
value across the border, and Hedera's public consensus network makes
every compliance and routing decision independently verifiable,
without either side of the transfer ever touching a wallet.

## What was actually implemented, phase by phase

### Foundation (17–18 July): the Hedera trust layer and the base app

- Real Hedera Consensus Service (HCS) anchoring, Mirror Node
  verification, and a working tamper-detection proof, the mechanism
  the entire project's credibility rests on, built and verified
  first, before any UI.
- A GitBook-ready documentation site, expanded to a full 32-page
  project document.
- Frontend and backend integrated into one working application, with
  a real `/api/health` endpoint and a settlement fallback chain
  (Ethereum, Solana, Base).

### 19 July: real corridors, real partners, real docs

- Per-corridor settlement speed figures, a light theme, real brand
  assets, and a working demo mode.
- Actual partner research for the Portugal-Armenia corridor, plus
  MTN and Airtel research for African mobile-money corridors.
- A stablecoin liquidity market-share table and chart across five
  settlement chains, and a full security & privacy document covering
  selective disclosure.
- A critical fix: a 500 error on payment submission caused by
  missing required anchor fields.

### 20 July: real content, a dedicated landing page, terminology accuracy

- A custom icon set, a dedicated landing page, and fact-checked
  problem/solution/target-market content backed by sourced data.
- A project-wide terminology sweep correcting inaccurate language
  like "Hedera Blockchain" to "Hedera network", since Hedera is a
  hashgraph-based public network, not a blockchain.
- Go-to-market, alternative-approaches, and token-decision strategy
  documents.

### 21 July: the mobile app shell, community feature, and real testing

- A distinct mobile app shell, wired to the same real backend as the
  web version, not a separate simulation.
- The Community feature (web and app), gated by a real Community
  Usage Code issued only after a genuine Hedera anchor.
- LatAm partner research (EBANX, Mercado Pago, PayU) and TAM/SAM/SOM
  market sizing.
- A critical fix: the verify endpoint was never actually checking
  Hedera, it was returning fabricated demo anchor data.
- Real Vitest + Supertest and Playwright end-to-end tests added,
  closing the gap between what the project report claimed and what
  actually ran.
- The 5-year global-capture revenue projection model.

### 22 July: a real database, a full accuracy sweep, and the pitch groundwork

- Migration to a real MongoDB + Prisma database, closing the last
  gap between the report and the running system.
- A full documentation accuracy pass: removing every instance of
  hedging language and unnecessary em-dashes across the whole docs
  site, and a content-accuracy pass correcting a testing doc that had
  described an unbuilt Stripe webhook test as if it were real.
- Site Tour and App Tour pages, with a screenshot of every page and
  screen.
- A critical fix to the compliance verification flow: two different
  compliance records were being hashed and compared against each
  other, which is why verification kept failing on real transactions.

### 23 July: the pitch video

- `pitch-video.html`, a standalone animated pitch presentation,
  embedded on the Home page under the hero section.

## Where this hands off

Everything above was the complete, working UZH submission by the
23 July hand-in. The Hedera Schedule Service completion anchor, the
2-of-2 threshold-key intermediary account, the dedicated completion
topic, the How It Works walkthrough, and the SaucerSwap liquidity
source were all added afterward, specifically for the ETHGlobal
Lisbon 2026 extension, see
[ETHGlobal Lisbon 2026](ethglobal-lisbon.md) for that phase.
