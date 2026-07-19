# Known Limitations

A single, consolidated account of what this system does not do, does not claim, and has not yet built — gathered in one place rather than scattered as footnotes. Each item links to its full treatment elsewhere.

## What the Hedera anchor does not prove

Anchoring a hash on Hedera Consensus Service proves a record has not been altered since a specific, network-issued moment. **It does not prove money has landed in any account.** These are two separate guarantees; confirmation that funds actually arrived still depends on the destination bank's own settlement confirmation, via Verification/Confirmation of Payee or a traditional SWIFT confirmation. See [Settlement Speed by Corridor](../architecture/settlement-speed.md) and [Payee Verification & Failed Settlement](../architecture/payee-verification.md).

## What this project is not, structurally

- **Not a payment institution, CASP, or custodian.** The entire architecture holds this line — see [Why This Is Legal](../legal/why-this-is-legal.md). The moment this project held a client's funds or crypto-assets, even briefly, it would need full PI/EMI and CASP authorisation.
- **No coverage claim without a named partner.** A corridor is only "served" where a specific, checked partner exists — see [Partner Coverage by Corridor](../business/partner-coverage.md) and [Potential Partners for Collaboration](../business/potential-partners.md) for what's confirmed versus still a gap, region by region.
- **A local bank in the destination country is mandatory, not optional** — see [Why a Local Bank Is Required](../business/local-bank-requirement.md).

## What capital efficiency does and doesn't mean

Stablecoin settlement does not eliminate capital lock-up — it relocates it to the payout partner's balance sheet, and returns to us as their fee. What it removes is the *correspondent-banking* dependency: one liquidity partner per corridor instead of a nostro network in every country.

## Token and DeFi boundary

- **No token exists in this design**, deliberately. See [Business Model](../business/business-model.md) for why one would add legal exposure (MiCA offeror status, potential MiFID classification) without a corresponding function.
- **DeFi trading, DEX integration, or holding client crypto-assets are explicitly out of scope for this legal entity.** Not a later feature — a different company, since custody requires its own CASP authorisation and breaks the non-custodial model this project depends on structurally. Where this project's settlement layer *does* touch DeFi (Hedera's own DeFi ecosystem, e.g. SaucerSwap liquidity, is what determines whether a transfer stays on Hedera or routes to a deeper-liquidity chain), that connection is about liquidity depth for settlement — never about trading, yield, or custody on the client's behalf. See [The Settlement Layer](../architecture/settlement-layer.md).

## What's real versus honestly not executed

- **Hedera execution is fully real**: genuine HTS transfers, real HCS anchors, verifiable on HashScan.
- **Ethereum, Solana, and Base routing decisions are real and anchored** — the logic that decides where a transfer *should* settle runs on live data (real liquidity checks). **Actual execution on those chains is not implemented**, and is honestly labelled as such rather than faked, because no funded testnet credentials exist yet for them in this project. See [Roadmap](../project/roadmap.md).
- **The payout-failure reconciliation state is specified, not built** — the state machine and Mermaid diagram in [Payee Verification & Failed Settlement](../architecture/payee-verification.md) describe the intended design; implementing it requires a real payout partner's failure-notification webhook to build against, which doesn't exist yet.

## Stablecoin choice is a legal constraint, not a preference

USDT is excluded because it is not MiCA-compliant and has been delisted from major EU venues. USDC and EURC (Circle) are the only currently viable choice for the EU leg. This determines which chains and which partners are viable — it is not a technology decision.

## Status

Sandbox and testnet throughout. Every claim above should be re-verified before this moves toward a production context — several of the cited facts (regulatory transitions, partner coverage, chain liquidity) are dated to mid-2026 and this space moves monthly.
