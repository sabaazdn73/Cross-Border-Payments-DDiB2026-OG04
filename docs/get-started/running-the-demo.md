# Running the Demo

## Prerequisites

- Node.js (any recent LTS)
- A Hedera testnet account, free, from [portal.hedera.com](https://portal.hedera.com)

## Setup

```bash
git clone https://github.com/sabaazdn73/Cross-Border-Payments-DDiB2026-OG04.git
cd Cross-Border-Payments-DDiB2026-OG04
npm install
cp .env.example .env
```

Edit `.env` with your own testnet `HEDERA_ACCOUNT_ID` and
`HEDERA_PRIVATE_KEY` (DER-encoded, from the Hedera portal).

## Tests

```bash
npm test
```

14 tests covering canonical hashing, HMAC pseudonymisation, and the
full routing decision logic (partner support, liquidity thresholds,
fallback behaviour), all deterministic and network-free.

```bash
npm run test:vitest
```

21 tests: the same coverage above ported to Vitest, plus Supertest
tests exercising real HTTP endpoints on the Express app directly
(health check, 404 handling, community-post validation).

```bash
npx playwright install chromium   # once
npm run test:e2e
```

6 end-to-end tests driving a real browser against the actual frontend, including confirming the tamper-detection demo genuinely flips from a hash match to a mismatch.

## The core proof

```bash
node step1-hedera.mjs
```

Creates an HCS topic, anchors a compliance hash, reads it back from a
public Mirror Node, verifies a MATCH, tampers with the record, and
shows the resulting MISMATCH, the entire trust argument in six steps.

## The full pipeline

```bash
node demo-modular.mjs
```

Anchors both a compliance record and a quote (FX rate + fee), verifies
each independently, and demonstrates tamper detection on the quote, proving a sender wasn't quoted one rate and charged another.

## The routing demo

```bash
node demo-router.mjs 100      # small amount → routes to Hedera, executes for real
node demo-router.mjs 50000    # large amount, routes to Ethereum, not executed
```

See [Live Testnet Evidence](../reference/testnet-evidence.md) for a
real, captured run of both.
