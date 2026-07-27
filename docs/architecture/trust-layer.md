# The Trust Layer. Hedera

## What gets anchored

Four kinds of record, through two mechanisms
(`anchorRecord` in `anchor.mjs` for the first three; the Hedera
Schedule Service for the fourth):

| Record | Proves |
|---|---|
| **Compliance** | A licensed party's KYC/AML check passed, at a specific moment |
| **Quote** | The FX rate and fee shown to the sender before settlement, so it can't be quietly changed before payout |
| **Routing decision** | Which chain a transfer settled on, and why, auditable, not just asserted |
| **Completion** | Both the source-side and destination-side partner independently confirm the transfer finished, not just our own backend's say-so |

## What never goes on-chain

Only a SHA-256 hash of a canonical JSON record, plus a pseudonymous
reference (HMAC'd, not a plain hash, see
[Compliance Data & Privacy](../legal/compliance-data.md) for why that
distinction matters). No names, no IBANs, no amounts, no documents.

## Why a narrow trust surface matters

Hedera never sees the underlying record and holds no party's signing
key. It only supplies **ordering and a consensus timestamp**. That
means:

- Even a compromised or colluding set of Hedera nodes could not forge
  a compliance record, they hold no one's key.
- The only thing anyone needs to trust Hedera for is: *this hash
  existed at this exact moment, in this order.*
- Because trust rests on the hash rather than on Hedera specifically,
  the anchor is portable in principle, nothing here is permanently
  wedded to one ledger surviving forever.

## The completion anchor: gated by two parties, not one

The first three records are anchored the moment our backend decides
they're true. The completion record is different by design: it uses
the **Hedera Schedule Service (HSS)** so that the "transfer is fully
complete" message only reaches HCS once **both** the source-side and
destination-side partner have separately signed off.

Mechanically:

1. A `ScheduleCreateTransaction` wraps the completion message. It sits
   pending on Hedera, executing nothing yet.
2. The message can only be submitted by a **2-of-2 threshold key**
   held jointly by the two partners, a `KeyList` requiring both
   signatures, never one held by us.
3. The moment the second `ScheduleSignTransaction` lands, Hedera's own
   consensus executes the submission automatically, no code of ours
   triggers that execution.
4. If neither signature arrives within the schedule's expiry window,
   it simply never executes. No silent partial state, no fabricated
   success.

The two-party requirement is enforced at the protocol level: the HCS
topic the completion message is written to has its **submit key set
to that same 2-of-2 `KeyList`**, not to our operator key. That's what
makes the gate real rather than cosmetic, our own signature as
transaction payer cannot satisfy it; only the two partners together
can.

## The intermediary settlement account: same 2-of-2 principle, for funds

Stablecoin from the source-side partner lands in an intermediary
Hedera account before the destination-side partner pulls it for
payout. That account's key is the same 2-of-2 `KeyList`, one key per
partner. Neither partner alone, and critically, **we are not one of
the two keys**, can move funds out of it unilaterally.

## Reading it back

Verification never touches our API. Anyone, a regulator, an
auditor, a teammate, can query a **public Hedera Mirror Node**
directly, recompute the hash of the record as it exists now, and
compare. See [`verify.mjs`](../reference/modules.md#verifymjs).

For the fuller case on why this specific property, public
observability without exposing personal data, is valuable to
regulators beyond just this platform, see
[A Regulator-Facing Case for Public Anchoring](../legal/regulator-oversight.md).
