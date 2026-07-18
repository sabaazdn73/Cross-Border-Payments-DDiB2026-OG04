# How It Works

## The five-step flow

1. **Sender pays in fiat.** Card or SEPA transfer, through a licensed
   PSP sandbox. No wallet, no address, no crypto knowledge required.
2. **The PSP confirms via webhook.** Our backend receives a verified
   payment-confirmed event.
3. **Routing decision.** [`chooseSettlementRail`](../reference/modules.md#corridorroutermjs)
   picks a settlement chain — Hedera by default, falling back only
   when the destination partner requires a different chain or the
   amount exceeds Hedera's real, checked liquidity depth.
4. **Settlement + anchoring.** The compliance check, the quoted FX
   rate, and the routing decision itself are each hashed and anchored
   to a Hedera Consensus Service (HCS) topic with a consensus
   timestamp neither party controls.
5. **Payout.** The licensed destination partner converts to local
   currency and credits an ordinary bank account. The recipient never
   knows a blockchain was involved.

## Why anchor the *routing decision*, not just compliance?

Anyone can ask "why did my transfer settle on Ethereum instead of
Hedera?" Because the decision and its stated reason are anchored, the
answer is independently verifiable — not just something we assert
after the fact.

## What "verifiable" actually means here

At any point, a third party — a regulator, an auditor, a curious
teammate — can:

1. Take the compliance/quote/routing record as it exists right now
2. Recompute its SHA-256 hash
3. Fetch the anchored hash from a **public Hedera Mirror Node** — not
   our API, not our database
4. Compare the two

If they match, the record has not changed since it was anchored. If
someone edited it — even us — the hashes diverge and the mismatch is
immediate and undeniable. This is demonstrated live in
[Running the Demo](running-the-demo.md).
