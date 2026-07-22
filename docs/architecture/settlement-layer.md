# The Settlement Layer. Chain Routing

## The decision function

`chooseSettlementRail(partnerId, amountUsd)` in `corridorRouter.mjs`
decides where a transfer settles, using three real inputs:

1. **Which chains the destination partner supports**, a maintained
   configuration (`PARTNER_CHAIN_SUPPORT`), not a live capability
   query. In real payment integrations, partner chain support is
   documented and changes on the order of weeks or months, not
   per-request, a config file kept in sync with partner
   documentation *is* the real-world integration process here.
2. **Which of those chains carry a MiCA-compliant, natively-issued
   stablecoin** (`COMPLIANT_STABLECOIN_CHAINS`), as of mid-2026,
   USDC and EURC only. USDT is deliberately excluded: delisted from
   major EU venues, and Tether has stated no intention to pursue MiCA
   authorisation.
3. **Whether the amount stays within Hedera's real liquidity depth**
, a live check against DeFiLlama (`liquidity.mjs`), not an
   invented number, cached for 15 minutes since DEX depth doesn't
   move meaningfully minute to minute.

Hedera is preferred whenever it's viable, one network for both trust
and settlement is a simpler custody story. It falls back only when
the partner requires a different chain, or the amount is large enough
that the researched liquidity depth suggests visible slippage.

## What's genuinely executed vs. not executed

| Chain | Execution |
|---|---|
| **Hedera** | Fully real, a genuine HTS token transfer on testnet, a real transaction ID, verifiable on HashScan |
| **Ethereum / Solana / Base** | The *decision* is real and anchored; actual execution is a clearly labeled non-event, no funded testnet credentials exist for these chains in this project yet |

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
the design falls back to **Circle Mint redeem-and-reissue**, performed by the licensed partner, never by us, consistent with the
non-custodial model throughout this project. This is a fast-moving
detail; re-verify before relying on a specific bridge method.


## Why Base is included as a fallback

Base carries native USDC with roughly **$4.1–4.3B in supply** (~5.8%
of global USDC supply, mid-2026), smaller than Ethereum (~70%) or
Solana (~10–20%+), but with very high transaction velocity. One
caveat worth stating plainly: a large share of that volume is
concentrated in a handful of DeFi pools (e.g. Aerodrome), not
necessarily representative of liquidity available for payment
settlement specifically. Base is ranked in `FALLBACK_CHAIN_PRIORITY`
by its real, cited supply figure, not by headline transaction volume.

## The four non-Hedera fallback chains, in priority order

Hedera is preferred whenever it's viable (see above). When it isn't, the partner doesn't support it, or the amount exceeds Hedera's safe liquidity threshold, the router falls back to one of four chains, in this order:

| Priority | Chain | USDC liquidity | Note |
|---|---|---|---|
| 1 | **Ethereum** | ~70% of global USDC supply | Deepest liquidity, highest gas cost |
| 2 | **Solana** | ~$15-16B, fastest-growing | Leading stablecoin *payment volume* specifically |
| 3 | **Base** | ~$4.1-4.3B (~5.8% of global USDC) | High transaction velocity, concentrated in a few DeFi pools |
| 4 | **BNB Chain** | ~$14B total stablecoin supply, but only ~34-40% is USDC (rest is USDT, not MiCA-compliant) | The USDC-specific slice is roughly comparable to Base's total -- the headline $14B figure overstates what's usable for our EU leg |

All four are first-class CCTP (Cross-Chain Transfer Protocol) chains, meaning native burn-and-mint transfer without a third-party bridge's wrap risk. All four carry natively-issued USDC (Circle mints directly on each), which is why they're viable candidates at all -- a bridged/wrapped USDC would carry the bridge's own risk on top of everything else.

{% hint style="warning" %}
BNB Chain's total stablecoin figure is dominated by USDT, which is excluded from this design (see [Regulatory Landscape](../legal/regulatory-landscape.md)). Citing the $14B headline number without this caveat would overstate the chain's relevant liquidity by roughly 2-3x.
{% endhint %}
