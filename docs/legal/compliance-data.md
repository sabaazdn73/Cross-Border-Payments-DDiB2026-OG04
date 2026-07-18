# Compliance Data & Privacy

## What's stored, and where

| Data | Storage | On Hedera? |
|---|---|---|
| Name, address, KYC documents | Off-chain, with the licensed party | Never |
| Full transaction amount / currency | Off-chain | Never |
| SHA-256 hash of a canonical compliance/quote/routing record | Local DB + HCS | Yes |
| A pseudonymous transfer reference | Local DB + HCS | Yes |
| Consensus timestamp | Issued by Hedera | Yes, by construction |

## Canonicalisation

Two logically identical records — regardless of the order their
fields were built in — must always hash to the same value, or the
core verification claim ("recompute and compare") would be
unreliable. `hashing.mjs`'s `canonicalHash()` recursively sorts object
keys before hashing to guarantee this. Covered by unit tests in
`backend/services/hedera/__tests__/hashing.test.mjs`.

## Why plain hashing isn't enough for identifiers

A transfer reference, phone number, or account number has far too
little entropy to hash safely on its own — an attacker can hash every
plausible value in seconds and match it against what's anchored
publicly. `pseudoRef()` uses **HMAC with a secret pepper**
(`HEDERA_PSEUDO_PEPPER`, kept only in `.env`, never anchored anywhere)
specifically to close that door. See the `pseudoRef` tests for
confirmation that the same identifier with a different pepper produces
an unrelated reference.

## Right to erasure vs. an immutable ledger

Because only a hash lives on-chain and the plaintext lives off-chain,
erasure is achieved by destroying the off-chain record and its key.
The anchor then verifies nothing and reveals nothing — the standard
reconciliation between GDPR and an append-only ledger, adopted
deliberately here.
