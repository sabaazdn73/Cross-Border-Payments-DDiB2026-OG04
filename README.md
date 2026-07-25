# F2F Cross-Border: Fiat-to-Fiat Settlement Platform

A non-custodial orchestration layer over licensed payment rails, with a
verifiable compliance trail anchored on Hedera.

DDiB 2026 · University of Zurich

## What this proves

The licensed parties move the money and perform the checks. We never hold
funds. Our contribution is that each compliance decision — and now each
settlement-routing decision — is hashed and anchored with a consensus
timestamp, so "the checks passed at this moment" becomes independently
verifiable rather than asserted.

## Live evidence (Hedera testnet, verified end to end)

| | |
|---|---|
| Topic | [0.0.9617780](https://hashscan.io/testnet/topic/0.0.9617780) |
| Compliance anchor | sequence #2 |
| Quote anchor | sequence #3 |
| Routing decision anchor (small amount → hedera) | sequence #4 |
| Routing decision anchor (large amount → ethereum, unexecuted) | sequence #5 |
| Live liquidity check | $26,510,503 (real-time SaucerSwap `/stats` read, not simulated) |
| Completion topic (2-of-2 partner-keyed submit key) | [0.0.9753239](https://hashscan.io/testnet/topic/0.0.9753239) |
| Intermediary settlement account (2-of-2 threshold key) | [0.0.9753237](https://hashscan.io/testnet/account/0.0.9753237) |

Every anchor above was independently verified via a public Mirror Node —
not our own database — and the tamper test (edit a record, recompute,
compare) correctly flips MATCH to MISMATCH.

## Which Hedera services this actually uses

| Service | What it's used for |
|---|---|
| **Hedera Consensus Service (HCS)** | Compliance, quote, and routing-decision anchoring, plus the completion message, each a hashed pointer message with a consensus timestamp neither party controls |
| **Hedera Token Service (HTS)** | The real stablecoin transfer executed on Hedera when a corridor routes there |
| **Hedera Schedule Service (HSS)** | The completion anchor: a `ScheduleCreateTransaction` that only executes once both the source-side and destination-side partner have independently signed, gated by a 2-of-2 threshold key, not our own operator key |
| **Mirror Node REST API** | Independent, public verification of every anchor above, by sequence number and by transaction ID, never through our own database |

## Run it

    npm install
    cp .env.example .env      # add your own testnet credentials
    npm test                  # 14 unit tests, no network, ~1 second
    node demo-modular.mjs     # compliance + quote anchoring, tamper proof
    node demo-router.mjs 100      # routes to hedera, executes a real transfer
    node demo-router.mjs 50000    # routes to ethereum, honestly unexecuted

## Architecture

    backend/services/hedera/        the trust anchor — always Hedera
      client.mjs      connection + key parsing (ED25519 or ECDSA)
      hashing.mjs      canonical hashing + HMAC pseudonymous references
      topic.mjs        HCS topic creation/reuse (main + completion)
      anchor.mjs        compliance / quote / routing-decision anchoring
      thresholdAccount.mjs  2-of-2 threshold-key intermediary account
      scheduleAnchor.mjs     HSS completion anchor, gated by both partners
      verify.mjs         Mirror Node read + tamper detection

    backend/services/settlement/    which chain actually moves the value
      corridorConfig.mjs   partner chain support, compliant stablecoins
      liquidity.mjs         real Hedera stablecoin liquidity depth (SaucerSwap)
      corridorRouter.mjs    the routing decision (Hedera preferred, falls
                            back only when the partner needs it or the
                            amount exceeds Hedera's safe depth)
      execute.mjs            real execution on Hedera; honestly labeled
                              non-execution elsewhere (see below)

## Why the settlement chain isn't always Hedera

Hedera is our trust layer — every compliance and routing decision is
anchored there regardless of which chain actually settles the value.
But Hedera's stablecoin liquidity is real but thin (tens of millions,
not billions), so large transfers are routed to deeper liquidity
(Ethereum, Solana) once the partner supports it. The decision itself is
anchored too, so "why did this go to Ethereum?" is answerable by anyone,
not just us.

## What is genuinely executed vs. honestly not

- **Hedera**: fully real. A genuine HTS token transfer on testnet, a real
  transaction ID, verifiable on HashScan.
- **Ethereum / Solana**: the routing *decision* is real and anchored, but
  actual execution is deliberately left unexecuted and clearly labeled —
  we have no funded testnet credentials for those chains yet. This is
  intentional: fabricating a transaction reference for a chain we cannot
  actually reach would be exactly the "fake blockchain demo" risk this
  project is designed to avoid. Multi-chain execution is scoped as
  future work (see `docs/project/roadmap.md`), not simulated as if it already worked.

## What never goes on-chain

Only a SHA-256 hash and a pseudonymous (HMAC'd) reference. No name, no
IBAN, no amount, no KYC document. The plaintext stays off-chain with the
licensed party. See `docs/legal/compliance-data.md` for the full privacy
boundary and canonicalisation rules.

## Status

Sandbox and testnet. Not a payment institution, not a CASP, not a
custodian. See `docs/legal/why-this-is-legal.md`.

## License

All rights reserved. See `LICENSE`.

