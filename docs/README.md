# Introduction

**Walletless Cross-Border Settlement** is a non-custodial orchestration
layer over licensed payment rails, with a verifiable compliance trail
anchored on Hedera.

DDiB 2026 · University of Zurich

{% hint style="info" %}
This is a working sandbox/testnet prototype built for a two-week
academic project. It is not a licensed payment institution, not a
CASP, and does not custody funds at any point. See
[Why This Is Legal](legal/why-this-is-legal.md) for the architectural
reason that's true by design, not by accident.
{% endhint %}

## The problem

Cross-border payments are slow, opaque, and expensive, correspondent
banking chains add fees and delay at every hop, and pre-funded local
accounts (the "instant" transfer fintechs like Wise and Revolut
actually rely on) tie up capital in every destination country.

Crypto on/off-ramps (Ramp, MoonPay, Transak) solve the settlement speed
problem but push wallets, addresses, and gas fees onto the end user, friction that kills adoption for anyone who isn't already crypto-native.

## What we built

A sender pays in local fiat by card or bank transfer. A licensed
on-ramp partner converts to a MiCA-compliant stablecoin. The value
settles, on Hedera when it fits Hedera's real liquidity depth,
routed elsewhere when it doesn't. A licensed local partner converts
back to the destination currency and credits an ordinary bank account.

**Neither the sender nor the recipient ever sees a wallet, an address,
a seed phrase, or a gas fee.**

## What makes it verifiable, not just fast

Every licensed party's compliance check, and every decision about
which chain a transfer settles on, is hashed and anchored on Hedera
Consensus Service with a network-issued consensus timestamp. That
timestamp cannot be backdated, moved, or forged by us or by anyone
downstream. So instead of *asserting* "the checks passed" or "we
routed this fairly," the system makes both **independently provable**
by a party who trusts neither us nor the licensed partner.

## Where to go next

- New to the project? Start with [How It Works](get-started/how-it-works.md).
- Want to run it yourself? See [Running the Demo](get-started/running-the-demo.md).
- Curious about the legal model? Start with [Why This Is Legal](legal/why-this-is-legal.md).
- Looking for a specific function? See [Module Reference](reference/modules.md).
