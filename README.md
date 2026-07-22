# Walletless Cross-Border Settlement

A non-custodial orchestration layer over licensed payment rails, with a
verifiable compliance trail anchored on Hedera.

DDiB 2026 · University of Zurich · Online_Group 04

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
| Live liquidity check | $18,111,247 (real-time DeFiLlama read, not simulated) |

Every anchor above was independently verified via a public Mirror Node —
not our own database — and the tamper test (edit a record, recompute,
compare) correctly flips MATCH to MISMATCH.

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
      topic.mjs        HCS topic creation/reuse
      anchor.mjs        compliance / quote / routing-decision anchoring
      verify.mjs         Mirror Node read + tamper detection

    backend/services/settlement/    which chain actually moves the value
      corridorConfig.mjs   partner chain support, compliant stablecoins
      liquidity.mjs         real Hedera stablecoin liquidity depth (DeFiLlama)
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
  future work (see ROADMAP.md), not simulated as if it already worked.

## What never goes on-chain

Only a SHA-256 hash and a pseudonymous (HMAC'd) reference. No name, no
IBAN, no amount, no KYC document. The plaintext stays off-chain with the
licensed party. See `docs/compliance-data.md` for the full privacy
boundary and canonicalisation rules.

## Status

Sandbox and testnet. Not a payment institution, not a CASP, not a
custodian. See `docs/legal-and-compliance.md`.

## License

All rights reserved. See `LICENSE`.

