# The Settlement Layer — Chain Routing

## The decision function

`chooseSettlementRail(partnerId, amountUsd)` in `corridorRouter.mjs`
decides where a transfer settles, using three real inputs:

1. **Which chains the destination partner supports** — a maintained
   configuration (`PARTNER_CHAIN_SUPPORT`), not a live capability
   query. In real payment integrations, partner chain support is
   documented and changes on the order of weeks or months, not
   per-request — a config file kept in sync with partner
   documentation *is* the real-world integration process here.
2. **Which of those chains carry a MiCA-compliant, natively-issued
   stablecoin** (`COMPLIANT_STABLECOIN_CHAINS`) — as of mid-2026,
   USDC and EURC only. USDT is deliberately excluded: delisted from
   major EU venues, and Tether has stated no intention to pursue MiCA
   authorisation.
3. **Whether the amount stays within Hedera's real liquidity depth**
   — a live check against DeFiLlama (`liquidity.mjs`), not an
   invented number, cached for 15 minutes since DEX depth doesn't
   move meaningfully minute to minute.

Hedera is preferred whenever it's viable — one network for both trust
and settlement is a simpler custody story. It falls back only when
the partner requires a different chain, or the amount is large enough
that the researched liquidity depth suggests visible slippage.

## What's genuinely executed vs. honestly not

| Chain | Execution |
|---|---|
| **Hedera** | Fully real — a genuine HTS token transfer on testnet, a real transaction ID, verifiable on HashScan |
| **Ethereum / Solana** | The *decision* is real and anchored; actual execution is a clearly labeled non-event — no funded testnet credentials exist for these chains in this project yet |

{% hint style="warning" %}
This project deliberately does not fabricate a transaction reference
for a chain it cannot actually reach. See
[Roadmap](../project/roadmap.md) for what full multi-chain execution
would require.
{% endhint %}

## Bridging, when it's needed

As of mid-2026, Circle's Cross-Chain Transfer Protocol (CCTP) v1 is
reported to already route Hedera; CCTP v2 (fast transfer) support is
described elsewhere as still rolling out. Where CCTP isn't available,
the design falls back to **Circle Mint redeem-and-reissue** —
performed by the licensed partner, never by us, consistent with the
non-custodial model throughout this project. This is a fast-moving
detail; re-verify before relying on a specific bridge method.

