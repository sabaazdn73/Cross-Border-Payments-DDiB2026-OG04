# Roadmap

## What's built and tested now

- Walletless flow architecture (no wallet, address, or gas fee for
  either party)
- Real Hedera testnet integration: HCS anchoring, HTS transfers,
  Mirror Node verification
- Compliance, quote, and routing-decision anchoring with tamper
  detection
- Real, live liquidity-based chain routing (Hedera preferred, with a
  researched, cited fallback)
- 22 passing unit tests

## Deliberately not built yet — and why

| Item | Why it's future work, not a shortcut taken now |
|---|---|
| **Solana / Ethereum execution** | Requires funded testnet accounts and a second/third chain SDK — real integration work, not a coding shortcut. The *routing decision* already accounts for these chains; only execution is pending. |
| **Full CCTP / Circle Mint bridging** | Depends on which CCTP version supports which chain at a given time — a fast-moving external dependency, verified at build time rather than hardcoded. |
| **Real partner integration** | `PARTNER_CHAIN_SUPPORT` is illustrative scaffolding. Onboarding an actual sandbox payout partner is a business/legal step, not an engineering one. |
| **Production licensing** | This project is legal *as designed* — non-custodial, orchestration-only. Any future step toward holding funds (e.g., our own stablecoin issuance, direct custody) would require CASP/PI/EMI authorisation and is explicitly out of scope. |

## Explicitly out of scope, permanently

- Trading, DEX integration, or any activity requiring custody of a
  client's crypto-assets — this would require a **different legal
  entity** with its own CASP authorisation, not an extension of this
  one. See [Why This Is Legal](../legal/why-this-is-legal.md).
- Issuing our own stablecoin — EMT issuance is legally reserved to
  EMIs and credit institutions.
