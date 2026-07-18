# Problem Analysis

### 2.1 What actually makes cross-border expensive

| Cause | Effect |
|---|---|
| Correspondent banking chains | Each hop adds a fee, a delay and an FX spread |
| Pre-funding (nostro/vostro) | Capital sits idle in every destination country; the cost is passed on |
| Batch settlement windows | Cut-off times, weekends, T+1/T+2 |
| Fragmented compliance | Each institution repeats KYC; none can verify the other's |
| Opaque FX | The spread, not the stated fee, is where the cost hides |

### 2.2 The compliance gap — the one we address

Every regulated party in a cross-border chain runs its own checks. But when a regulator or counterparty later asks *"was this transaction compliant at the time it happened?"*, the evidence is a database row inside one institution — mutable, and attested by nobody but its owner.

**Formal problem statement:**

> In a cross-border payment routed through multiple independently licensed institutions, no party can independently verify that another party's compliance checks were performed at the time of the transaction, and every party's record of that fact is unilaterally revisable.

### 2.3 What we are explicitly *not* solving

Stated here rather than discovered by an examiner:

- **We do not open new corridors.** Coverage is a licensing and partner problem, not a technical one ([this section](/legal/why-this-is-legal.md)).
- **We do not eliminate capital lock-up.** We relocate it ([this section](/business/business-model.md)).
- **We do not remove the need for KYC.** We make its result provable ([this section](/legal/why-this-is-legal.md)).

---
