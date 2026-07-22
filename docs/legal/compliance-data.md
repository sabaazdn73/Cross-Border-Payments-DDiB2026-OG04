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

Two logically identical records, regardless of the order their
fields were built in, must always hash to the same value, or the
core verification claim ("recompute and compare") would be
unreliable. `hashing.mjs`'s `canonicalHash()` recursively sorts object
keys before hashing to guarantee this. Covered by unit tests in
`backend/services/hedera/__tests__/hashing.test.mjs`.

## Why plain hashing isn't enough for identifiers

A transfer reference, phone number, or account number has far too
little entropy to hash safely on its own. An attacker can hash every
plausible value in seconds and match it against what's anchored
publicly. `pseudoRef()` uses **HMAC with a secret pepper**
(`HEDERA_PSEUDO_PEPPER`, kept only in `.env`, never anchored anywhere)
specifically to close that door. See the `pseudoRef` tests for
confirmation that the same identifier with a different pepper produces
an unrelated reference.

## Right to erasure vs. an immutable ledger

Because only a hash lives on-chain and the plaintext lives off-chain,
erasure is achieved by destroying the off-chain record and its key.
The anchor then verifies nothing and reveals nothing. This is the
standard reconciliation between GDPR and an append-only ledger,
adopted deliberately here.

## Where KYC verification itself is heading

Today, KYC in this design (and in every partner named in this project)
still runs on document-based verification: a passport or ID scan,
checked by the licensed partner performing the on-ramp or payout. That
step, not the settlement layer, is the slowest and most fraud-exposed
part of onboarding a new sender or recipient.

A real, dated development worth tracking: on 16 July 2026, the
European Commission published results of an EU-Japan interoperability
pilot between the EUDI Wallet (EU Digital Identity Wallet) and Japan's
My Number Card system. The pilot confirmed that government-issued
digital identity credentials can be issued, stored, presented, and
verified across two jurisdictions with completely different technical
and governance architectures, using open standards rather than a
shared framework. Tested use cases included cross-border bank account
opening. Japan is separately expanding My Number Card from a
government-only credential into a platform private-sector services
(banks, telecoms) can verify against directly.

**What this means for this project, if it matures:** a licensed
partner's KYC check could eventually verify a government-issued
digital credential cryptographically rather than a document scan,
for both sides of a transfer, not just within one jurisdiction. That
would make the partner's KYC step faster and less exposed to
document/photo fraud, and would make our own compliance-anchoring
model a more natural fit for a world where the *input* to KYC is
already a verifiable credential rather than a photo.

**Note, from the pilot's own report:** the
technology works; mutual legal recognition between jurisdictions does
not exist yet, and building it is a multi-year regulatory process, not
a technical one. This is a direction to watch, not a dependency this
project has today.
