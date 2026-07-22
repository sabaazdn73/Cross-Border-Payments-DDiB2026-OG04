# Alternative Approaches to Cross-Border Settlement

Two different questions, easy to conflate: which *companies* compete with this project (see [Market Analysis](market-analysis.md) for that), and which *systemic models* solve the same underlying problem by a completely different mechanism. This page is the second question: real, currently-being-built alternatives at the infrastructure and institutional level, not company competitors.

## Model comparison

| Model | Mechanism | Who is building it | Where it works today |
|---|---|---|---|
| **This project** | Stablecoin settlement rail + licensed on/off-ramp partners, anchored on Hedera | Us | Any corridor with a licensed payout partner, regardless of destination banking infrastructure |
| **Bilateral fast-payment linkage** | Direct handshake between two countries' domestic instant payment systems | India's NPCI (UPI-PayNow with Singapore; also UAE, France, Bhutan, Nepal, Sri Lanka, Mauritius) | Only between countries that already have a domestic instant payment system and have negotiated a bilateral link |
| **Multilateral fast-payment hub** | One integration point connecting many countries' instant payment systems under shared governance | Project Nexus (BIS), connecting India, Malaysia, the Philippines, Singapore, Thailand | Same constraint as bilateral, but scales better once built; still requires each country to already run a domestic instant payment system |
| **Regional payment mesh** | A bloc-wide network of linked domestic QR/instant systems | ASEAN (PromptPay, QRIS, PayNow, DuitNow), under the 2023 Regional Payment Connectivity declaration | Southeast Asia specifically, where this mesh already has years of bilateral links to build on |
| **Multi-CBDC platform (wholesale)** | Central banks issue and exchange CBDCs directly on a shared DLT platform | mBridge (PBOC, Hong Kong Monetary Authority, Bank of Thailand, Central Bank of UAE, SAMA) | Wholesale/interbank only, and only between participating central banks. No Western central bank participates |
| **Multi-CBDC platform (G7-aligned)** | Same wholesale concept, different political alignment | Project Agora (BIS + 7 G7 central banks + 40+ institutions incl. JPMorgan, Citi, HSBC, SWIFT) | Still in testing; results expected H1 2026, not yet live |

## Why the fast-payment and CBDC models don't compete directly with this project

Every model above except this project's requires **infrastructure that doesn't exist in most of the corridors this project targets**. UPI-PayNow, Project Nexus, and the ASEAN mesh all connect countries that *already* run a domestic instant payment system (UPI, PayNow, PromptPay, QRIS, DuitNow), a precondition most of Africa, and much of Latin America, does not yet meet. mBridge and Agora are wholesale, interbank platforms; neither touches a retail freelancer or SME payment.

**This is the actual competitive positioning:** this project's model is not a smaller or earlier version of Nexus or mBridge. It solves a structurally different problem: settlement where no domestic instant-payment or CBDC infrastructure exists yet to link to, by routing through a licensed commercial partner instead of a central bank or national payment operator. Where Nexus-style linkage *does* exist (Southeast Asia increasingly), it is very likely cheaper and faster than this project's model, because it removes an intermediary layer entirely. **Note: this project's addressable market shrinks over time as bilateral and multilateral fast-payment links expand, and grows in the corridors those links haven't reached yet.**

## Sourced figures (mid-2026, re-verify before final citation)

- mBridge: ~$55.5B processed across 4,047 transactions as of Nov 2025 (Atlantic Council, via PYMNTS, Jan 2026); ~95% settled in digital yuan; participants are PBOC, HKMA, Bank of Thailand, Central Bank of UAE, and SAMA (joined 2024). No Western central bank.
- Project Agora: 7 G7-aligned central banks + 40+ private institutions (JPMorgan, Citi, HSBC, SWIFT); testing phase results expected H1 2026
- UPI cross-border links: Singapore, UAE, France, Bhutan, Nepal, Sri Lanka, Mauritius live; 10+ corridors targeted by end of 2026; cross-border UPI volume grew from 37,060 transactions (FY24) to 755,000+ (FY25)
- ASEAN Regional Payment Connectivity: PromptPay, QRIS, PayNow, DuitNow linked since the 2023 Leaders' Declaration, full ASEAN interoperability targeted
