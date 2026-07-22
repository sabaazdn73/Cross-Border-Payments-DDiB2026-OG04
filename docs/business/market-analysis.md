# Market Analysis

*Required by the brief: comparison to existing alternatives.*

| Player | What they do | Licensing | Where the wallet appears | Verifiable trail? |
|---|---|---|---|---|
| **Wise** | Cross-border fiat, pre-funded local accounts | Fully licensed, many jurisdictions | Never | ❌ Internal records only |
| **Revolut** | Neobank + FX | Banking licence (EU) | Never | ❌ |
| **Ramp Network** | Fiat → crypto on-ramp | Licensed in several jurisdictions | ✅ User needs a wallet address | ❌ |
| **MoonPay** | On/off-ramp | Licensed | ✅ Wallet required | ❌ |
| **Transak / Banxa** | On/off-ramp APIs | Licensed | ✅ Wallet required | ❌ |
| **Bridge (Stripe)** | Stablecoin API for businesses | Acquired by Stripe (reported ≈ $1.1B), largely for licences | Abstracted for the business, not the flow | ❌ |
| **Due** | Stablecoin + fiat rails | **MiCA CASP (CNMV, Mar 2026)** + 80+ country coverage | Abstracted | ❌ |
| **BVNK / Triple-A / OpenPayd** | Stablecoin settlement infrastructure | **MiCA CASP (Feb/May/Jun 2026)** | Abstracted | ❌ |
| **Ripple / Stellar** | Cross-border settlement networks | Varies | Institutional | ❌ |
| **Ours** | Orchestration over licensed rails | **None (by design)** | **Never, for either party** | ✅ **HCS-anchored, Mirror-verifiable** |

### 8.1 Note on this table

**This is a red ocean.** It is arguably the most contested use case in the history of crypto: Ripple since 2012, Stellar built for it, Circle, and Stripe paying roughly $1.1 billion for Bridge, reportedly for the licences more than the technology.

**Two claims we must therefore not make:**

1. **"We cover more countries."** Due already covers 80+ with a CASP licence. Coverage is licences and partners, not technology.
2. **"We're cheaper because blockchain."** The licensed parties' margins dominate the unit cost, not the network fee.

### 8.2 What is actually left, and it is narrow but real

**Every player in that table leaves the compliance trail unverifiable.** Each institution's proof that it performed its checks is a row in its own database. In a chain of independently licensed parties, no participant can verify another's.

And **every crypto-native player leaves a wallet somewhere in the flow** (for the business if not the consumer).

**Our position:**

> The wallet disappears for both sides, and the compliance evidence becomes independently verifiable. We do not compete with the licensed rails; we sit on top of them and make the chain provable.

---

## 9. Market sizing: TAM, SAM, SOM

A pure market-sizing exercise, not a revenue projection. Volume and reachable population, not fees or margin, since that's a separate calculation still being reworked elsewhere.

### 9.1 TAM: Total Addressable Market

**$8.4 trillion/year**, global cross-border freelance payments (McKinsey Global Payments Report, cited in Jobbers.io's 2026 Global Freelance Payment Methods Report). This is the full universe of the *kind* of payment this project moves, freelancers being paid across a border, everywhere in the world, regardless of who currently serves it.

### 9.2 SAM: Serviceable Addressable Market

Not the whole TAM. Most of that $8.4T already flows through incumbents (Wise, PayPal, Payoneer, Western Union) in corridors this project isn't built for, developed-market-to-developed-market payments with existing bank rails on both ends. The realistically serviceable segment is narrower: **emerging-market freelancer corridors where a licensed on/off-ramp partner is the missing piece**, not developed-market corridors already well served.

Using the three largest such corridors already researched (see [Go-to-Market Strategy](go-to-market.md) and each country's own remittance TAM):

| Corridor | TAM |
|---|---|
| Nigeria (Africa) | $26.13B |
| India (Asia) | ~$143.7B |
| Brazil (Latin America) | ~$6.66B |
| **SAM (these three combined)** | **~$176.5B** |

This is a floor, not a ceiling: dozens of comparable emerging-market corridors exist beyond these three (see [Potential Partners](potential-partners.md) for corridors already researched across Africa, Asia, and Latin America), so the real SAM is larger. $176.5B is what's defensible from corridors already individually sized with a cited source, not an estimate stretched across markets not yet researched.

### 9.3 SOM: Serviceable Obtainable Market

The portion of the SAM actually reachable given this project's real constraints (a small team, no signed partners yet, a licensed-partner-dependent model), not an aspirational share. Per the market capture assumptions already established for the go-to-market plan, an early-stage entrant against licensed incumbents realistically captures a small fraction of a percent of any single corridor in its first years, not a meaningful double-digit share. The exact volume this implies is part of the financial model being reworked separately (see the note in [Go-to-Market Strategy](go-to-market.md)); this section stops at the market-sizing question it's actually answering: **the addressable population is real and large ($176.5B+ across just three corridors), and the real constraint on capturing it is partner relationships and licensing, not market size.**
