# Business Model

### 9.1 Customer

**Two segments, one payer:**

- **Freelancers and individuals** in corridors the incumbents underserve — the sender pays a transparent fee
- **SMEs** paying contractors abroad — the business pays

**Neither needs crypto knowledge.** That is the entire product.

### 9.2 Why they would pay

| Value | Basis |
|---|---|
| Corridors that exist | Where an incumbent has no partner and we do |
| Transparent, single fee | Against a hidden FX spread |
| Speed | Settlement in seconds rather than days |
| Provable compliance | For the SME segment: an audit trail they can hand a regulator |

### 9.3 Revenue

| Stream | Basis |
|---|---|
| FX spread | The standard mechanism; ours stated explicitly, not hidden |
| Flat transfer fee | Per transaction |
| B2B compliance-evidence API | The verifiable trail, sold to institutions that want it |
| **Not revenue** | No token. No float income — we hold no float. |

**Honest unit economics.** The Hedera fee is negligible (fixed, fractions of a cent). It is **not** where the cost lives. The cost lives in the licensed parties' take: the on-ramp's card/SEPA fee, the payout partner's local margin, and the FX spread. **We are a thin margin on top of their margins.** Any claim that blockchain makes this dramatically cheaper is a claim about *their* costs, not ours, and we do not make it.

### 9.4 Capital lock-up — the claim we retract

A pitch in this space usually says *"unlike Wise, we don't pre-fund 50 countries."*

**That is false, and an examiner will see it immediately.** Our payout partner in the destination country must hold local currency to pay out. The float has not disappeared — it has moved onto the partner's balance sheet, and it returns to us as their fee.

**The defensible version, which is genuinely true:** stablecoin settlement removes the *correspondent-banking* dependency. Instead of nostro accounts in every country, we need **one liquidity partner per corridor**. That improves capital efficiency and makes some corridors viable that correspondent banking cannot justify. It is a narrower claim. It is also a real one.

### 9.5 Network effects — and why we are not blocked by them

*The question every marketplace gets, and the one that killed the previous cycle's payment startups.*

**We are not a two-sided market.** The sender pays; the recipient receives a normal bank credit and never registers, never installs anything, never learns what we are. **The recipient side has no adoption cost at all**, because from their perspective money simply arrived in their account.

That removes the classic cold-start trap. We do not need a network of users before the first transfer is useful. **One sender, one corridor, one licensed partner, and the product works.**

What we *do* depend on is **corridor supply**, and that is a commercial problem, not a network-effect problem: it is solved one partner agreement at a time, not by waiting for critical mass.

**Where genuine network effects do appear, honestly:**
- **Liquidity depth per corridor** improves pricing as volume grows — a real but gradual effect
- **The compliance-evidence layer** compounds: the more licensed parties anchor to the same topic, the more valuable a verifiable cross-party trail becomes

Neither is required to start. Both improve the product later. That is the distinction between a network effect that *enables* and one that *gates*.

### 9.6 Scalability

| Dimension | Constraint | Assessment |
|---|---|---|
| **Technical throughput** | Hedera throttles at ~10,000 TPS | Not the binding constraint by several orders of magnitude. A retail remittance product will never approach it. |
| **Cost per transaction** | Fixed, USD-denominated, fractions of a cent | Scales linearly and predictably. **This is why fixed fees matter more than raw TPS**: a payment business must underwrite its unit cost. |
| **Corridor expansion** | One licensed partner per corridor | **The real constraint.** Linear in partner agreements, not in engineering. |
| **Compliance load** | Grows with volume and jurisdictions | Borne by the licensed parties, not us — a structural advantage of the orchestrator model |
| **Our own scaling** | Stateless orchestration + append-only anchoring | Horizontally scalable; we hold no balances to reconcile |

**The honest reading:** we are not technically constrained. We are **commercially constrained**, and we say so. Scaling this business means signing partners, not adding servers. That is a slower curve than a pure software product — and it is the same curve every licensed competitor faces.

### 9.7 Business sustainability

| Question | Answer |
|---|---|
| Where does revenue come from? | FX spread + flat fee per transfer + the compliance-evidence API |
| Is the margin defensible? | Thin on the payment leg — the licensed parties take most of it. **The defensible margin is the evidence layer**, which costs us fractions of a cent and no one else offers. |
| What are the fixed costs? | Engineering and partner management. **No float, no capital lock-up, no licence capital** — because we hold nothing. |
| What would kill it? | A licensed CASP (Due, BVNK) adding an anchoring layer. We are copyable, and [this section](/analysis/innovation-ethics.md) says so. |
| Why would it survive anyway? | Because they are optimising for corridors with volume. The corridors we target are the ones they have not judged worth the partner work. |


---
