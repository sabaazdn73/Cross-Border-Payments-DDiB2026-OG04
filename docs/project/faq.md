# FAQ

**Why blockchain, and not a shared database?**
The parties involved — a licensed PSP, a licensed payout partner, a
regulator — are independently licensed and don't trust each other's
internal databases. A database owned by any one of them is a record
that party can revise. Hedera supplies ordering and a timestamp that
none of them control.

**Aren't you an unlicensed payment institution?**
No — we never hold funds or crypto-assets at any point. See
[Why This Is Legal](../legal/why-this-is-legal.md).

**Why Hedera specifically?**
Fixed, USD-denominated fees; deterministic (not probabilistic)
finality in ~3 seconds; and Hedera Consensus Service is purpose-built
for an ordered, timestamped, append-only event stream — exactly the
primitive a compliance trail needs. See
[The Trust Layer](../architecture/trust-layer.md).

**Do you always settle on Hedera?**
No — see [The Settlement Layer](../architecture/settlement-layer.md).
Hedera is preferred but not exclusive; large amounts or unsupported
partner chains route elsewhere.

**Is this production-ready?**
No. It's a sandbox/testnet prototype demonstrating the architecture
and the verification mechanism. See [Roadmap](roadmap.md) for what's
deliberately not built yet.

**What data is exposed on-chain?**
Only a hash and a pseudonymous, HMAC'd reference — never a name, an
IBAN, an amount, or a document. See
[Compliance Data & Privacy](../legal/compliance-data.md).

