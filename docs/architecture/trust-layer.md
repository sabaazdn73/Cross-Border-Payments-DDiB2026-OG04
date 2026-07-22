# The Trust Layer. Hedera

## What gets anchored

Three kinds of record, all through the same mechanism
(`anchorRecord` in `anchor.mjs`):

| Record | Proves |
|---|---|
| **Compliance** | A licensed party's KYC/AML check passed, at a specific moment |
| **Quote** | The FX rate and fee shown to the sender before settlement, so it can't be quietly changed before payout |
| **Routing decision** | Which chain a transfer settled on, and why, auditable, not just asserted |

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

## Reading it back

Verification never touches our API. Anyone, a regulator, an
auditor, a teammate, can query a **public Hedera Mirror Node**
directly, recompute the hash of the record as it exists now, and
compare. See [`verify.mjs`](../reference/modules.md#verifymjs).
