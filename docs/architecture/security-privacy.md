# Security & Privacy

The principle running through every design decision here: **selective disclosure**. No personal data, name, phone number, email, IBAN, transaction amount, or the corridor a transfer takes, leaves the system except to a specific, authorized party, under a specific, documented condition, with the disclosure itself logged. Nothing is broadly accessible by default.

## What never leaves the system unprotected

| Data | Where it lives | Protection |
|---|---|---|
| Sender/recipient name, email | Backend database, in transit to the licensed partner | Encrypted at rest (AES-256) and in transit (TLS 1.2+); never included in logs |
| Bank account / IBAN | Passed to the licensed payout partner only | Never stored longer than the transfer requires; never anchored on Hedera in raw form |
| Card number, CVV | Should never reach our own servers at all | See PCI DSS scope reduction below, this is an architecture requirement, not a policy statement |
| Transaction amount, corridor, purpose | Backend database | Access-controlled; visible to the sender/recipient pair and to compliance review only |

## The anchor itself is already pseudonymous, by design, not by accident

Every compliance record anchored on Hedera uses `pseudoRef()`, a keyed hash of the transaction identifier, not the sender's or recipient's actual name, email, or account number. See `backend/services/hedera/hashing.mjs`. This means:

- The **public, permanent** record (the HCS anchor) never contains raw PII, even though it's cryptographically verifiable by anyone.
- Reversing a `pseudoRef` back to the real identity requires the pepper (`HEDERA_PSEUDO_PEPPER`), held only by this system, not by Hedera, not by anyone inspecting HashScan.

This is selective disclosure applied to the one piece of this architecture that's genuinely public: the ledger entry proves a check happened, without exposing who it was about.

## PCI DSS, card data should never touch our servers at all

Per PCI DSS v4.0.1 (mandatory since 2025, no transition period remaining as of 2026), the cheapest and most secure posture is **scope reduction**: if raw cardholder data never reaches our systems, PCI DSS's twelve requirements largely don't apply to us at all.

{% hint style="warning" %}
The current sandbox `Payment.jsx` collects card number and CVV directly into its own form for demonstration purposes. **In a production build, this must be replaced with a hosted payment field or tokenized flow from the licensed PSP** (e.g. Stripe Elements, Stripe.js), so the raw card number is submitted directly from the browser to the PSP and this system only ever receives a token. This is an architecture requirement, not an optional hardening step, it is the difference between being in PCI DSS scope and not being in it at all.
{% endhint %}

## GDPR, data minimization and subject rights

- **Collect only what's needed.** The sender email field is optional (see [Design System](design-system.md)) precisely because it isn't part of the payment route, collecting it as a requirement would violate data minimization for no functional reason.
- **Right to erasure and portability** must be implemented at the engineering level, not as a manual process, deletion requests need to reach every data store the record touches (compliance database, any cached copies, payout-partner references), and a pseudonymized Hedera anchor doesn't need erasure since it never held the raw identity in the first place.
- **72-hour breach notification** is a hard regulatory deadline (GDPR Article 33), this needs an incident-response runbook before production, not just encryption.

## Selective disclosure under supervision, what this means concretely

Raw PII is disclosed beyond the sender/recipient pair and the licensed payout partner in exactly two cases, both logged and both requiring a documented legal basis:

1. **Regulatory or law-enforcement request** (e.g. an AML investigation, a subpoena), disclosed only for the specific transaction named in the request, not as bulk access to the database.
2. **The licensed partner's own KYC/AML obligation**, they already need this data to perform their statutory checks; this isn't an additional disclosure, it's the minimum data transfer their compliance role structurally requires (see [Why This Is Legal](../legal/why-this-is-legal.md)).

Nobody else, not an engineer debugging a production issue, not an analytics tool, not a support agent without a specific ticket, gets standing access to raw PII. This is role-based access control (RBAC) plus audit logging on every access, not a policy document; per the 2026 fintech security baseline, "network location grants no implicit trust", every request authenticates and authorizes individually, including internal ones.

## What this means for logging specifically

A common, easy-to-miss failure mode: an application log line that includes a full name, email, or account number turns every log aggregation tool, every engineer with log access, and every log backup into a PII exposure surface. The practical rule applied throughout this codebase: log the transaction ID and status, never the PII fields themselves. `transferRef` (the pseudonymous reference) is safe to log; `senderName` and `recipientAccountDetails` are not.
