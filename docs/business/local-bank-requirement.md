# Why a Local Bank in the Destination Country Is Required

Stablecoin settlement solves the *movement* of value across borders. It does not solve the *last mile*: converting that value into spendable local currency in the recipient's hands. That step requires a licensed local bank or payout partner in the destination country, for reasons that are structural, not incidental.

## Why this cannot be designed around

1. **Local currency issuance and delivery is a banking function.** Only a locally licensed bank (or an e-money institution operating under local law) can credit a recipient's bank account in local currency, or hand over cash through a regulated network.
2. **Compliance is jurisdiction-specific.** Verification of Payee, sanctions screening, and AML obligations at the point of payout are governed by the destination country's regulator, not by us or by any upstream stablecoin infrastructure provider.
3. **This project never becomes the payout entity.** Per [Why This Is Legal](../legal/why-this-is-legal.md), the entire non-custodial model depends on a licensed party holding and delivering the final fiat leg. Removing that party would mean this project would itself need full local banking authorisation, in every destination country it serves.

## What "having a partner" actually requires

Not just an API integration. In practice:

- A local banking or e-money licence in the destination country (either held directly by the partner, or through their own correspondent relationship)
- Local currency liquidity to fund payouts before stablecoin settlement is reconciled
- Verification of Payee / Confirmation of Payee capability (or an equivalent), per [Payee Verification & Failed Settlement](../architecture/payee-verification.md)
- A KYC/AML programme that satisfies the destination regulator, independent of whatever checks happened upstream

See [Potential Partners for Collaboration](../business/potential-partners.md) for named candidates by region, and [Partner Coverage by Corridor](../business/partner-coverage.md) for where coverage is confirmed versus still a gap.
