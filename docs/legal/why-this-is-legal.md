# Why This Is Legal

## The core constraint

**We never hold funds or crypto-assets, at any point.** Every
architectural decision in this project exists to hold that line.

## Why it matters

Under PSD2, providing a payment service on behalf of clients requires
authorisation as a Payment Institution or EMI. The EBA has confirmed
that transferring EMTs on behalf of clients is a payment service, and
that a custodial wallet is a payment account.

We do neither:

- We never receive the sender's funds — the **licensed PSP** does.
- We never hold the stablecoin on a client's behalf — the **licensed
  parties** hold their own.
- We never operate a wallet in a client's name.

This is the EBA's **scenario 2** — partnering with an authorised PSP —
explicitly contemplated in the regulatory guidance issued when the
dual-licensing regime took effect.

## What we actually do

We **orchestrate** (route a transfer through the right sequence of
licensed parties) and **anchor** (make each compliance/routing
decision independently verifiable). Neither activity requires holding
an asset.

## The moment the model would break

If this system ever received a crypto-asset or fiat balance on a
client's behalf — even briefly, even for "just settlement" — it
would become a custodian, requiring its own CASP and PI/EMI
authorisation. `execute.mjs`'s honest non-execution for chains without
a licensed-partner integration exists specifically to avoid this: we
do not quietly become a custodian just to make a demo look complete.

## A related question: KYC doesn't transfer

A tempting (and wrong) shortcut: "the bank already did KYC, so we
inherit it." The bank verified **its own customer** for **its own
relationship** — that verification does not transfer to a third party
moving value on that customer's behalf. Each regulated party carries
its own due-diligence obligation. What we do instead: record that a
check was performed, by whom, and when, as a verifiable hash — see
[The Trust Layer](../architecture/trust-layer.md).
