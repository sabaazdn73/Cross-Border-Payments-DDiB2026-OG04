# Hedera Network Impact

## How every transfer generates on-chain activity

Each transfer through this system produces a fixed, auditable burst of Hedera transactions, **regardless of which chain actually settles the payment leg**. Hedera is always the trust anchor.

| Event | Hedera transaction type | Count per transfer |
|---|---|---|
| Compliance anchor (KYC/AML outcome) | HCS `TopicMessageSubmit` | 1 |
| Quote anchor (FX rate + fee) | HCS `TopicMessageSubmit` | 1 |
| Routing-decision anchor (why this chain) | HCS `TopicMessageSubmit` | 1 |
| Settlement execution (Hedera-routed transfers only) | HTS `TransferTransaction` | 0 or 1 |
| Mirror Node verification reads | Mirror Node REST calls | 1–2 |

**Minimum per transfer: 3 Hedera transactions (HCS anchors).**
**Hedera-routed transfers: 4 transactions + a real HTS token move.**

This is non-trivial because the 3 HCS anchors happen for *every* transfer — even one that routes to Ethereum for settlement still anchors its compliance, quote, and routing decision on Hedera. The trust layer cannot be bypassed by the settlement-chain fallback.

---

## TPS model at realistic scale

| Stage | Assumed transfers/day | Hedera txns/day | Peak TPS (16-hour window) |
|---|---|---|---|
| **Pilot** (one corridor, 3 active sending users) | 10 | 35 | 0.001 |
| **Early traction** (3 corridors, freelancer platform partnership) | 500 | 1,750 | 0.03 |
| **Year 1 target** (3 corridors, community + SME segment) | 5,000 | 17,500 | 0.3 |
| **Year 2 target** (10 corridors, second sending market) | 50,000 | 175,000 | 3.0 |
| **Growth ceiling, SOM** (≈0.01% of $176.5B SAM at avg. $300/transfer) | 160,000 | 560,000 | 9.7 |

At the SOM ceiling this project is a **~10 TPS contributor** to the Hedera network — meaningful, not dominant. The point is not volume leadership; it is a committed, recurring, high-value transaction stream (each burst carries compliance evidence, not just a token move) from a segment of non-crypto users who would not otherwise interact with Hedera at all.

---

## Account creation

The walletless design means end-users never create Hedera accounts — that is the product's core promise. Account growth therefore comes from the **operator tier**, not the consumer tier.

| Account type | When created | One-time or recurring |
|---|---|---|
| Operator / treasury account | Once, at deployment | One-time |
| Per-corridor payout-partner account | Once per signed partner | One per corridor |
| Licensed on-ramp account | Once per on-ramp integration | One per integration |
| SME B2B API subscriber account | Once per B2B customer onboarded | Scales with B2B segment |
| Community-feature per-user account *(future)* | Optionally, when a sender opts into the verified community | Scales with consumer volume |

**Year 1 realistic new accounts: 5–15** (operator + 3 corridor partners + initial B2B customers). These are not consumer signups, but they are real, active accounts with recurring transaction volume — a higher-quality metric than dormant accounts.

The community-feature gate (a real Hedera anchor is required to earn a one-time posting code) could, in a future iteration, be reframed as a lightweight Hedera account for the sender — turning every verified sender into a new account holder without ever exposing a wallet to them. This is scoped as post-MVP work.

---

## Why Hedera specifically, quantified

| Property | Value for this use case |
|---|---|
| HCS finality | ~3s deterministic — the compliance timestamp is legally meaningful because it is not probabilistic |
| Per-message fee | Fixed USD-denominated fractions of a cent — the compliance anchor costs less than $0.001, so it is economically viable at all transfer sizes |
| Mirror Node public access | Anyone (regulator, auditor, counterparty) can verify without going through this project's own API |
| Stablecoin Studio | Path to MiCA-compliant stablecoin issuance on-chain, without a separate EMT issuer, once licensing is in place |
| TPS headroom | 10,000+ TPS available vs. our ~10 TPS at SOM — no technical ceiling anywhere near this product's scale |

The binding constraint on network impact is **partner agreement velocity** (commercial), not network capacity (technical). See [Go-to-Market Strategy](go-to-market.md) and [Business Model](business-model.md).
