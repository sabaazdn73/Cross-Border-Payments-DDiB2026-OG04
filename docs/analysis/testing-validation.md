# Testing & Validation

## What's actually tested, and passes

| Suite | Runner | Coverage |
|---|---|---|
| Unit (14 tests) | Node's built-in `node --test` | Canonical hashing (order-independence, tamper sensitivity), pseudonymous reference generation, corridor routing decisions |
| Unit (21 tests) | Vitest + Supertest | Same hashing/routing logic ported to Vitest, plus real HTTP-level tests against the actual Express app: health check, 404 handling, community-post validation (rejects a missing code, an unrecognized code, a too-short message) |
| End-to-end (6 tests) | Playwright, real Chromium | Home page loads with the core promise visible; Send Money form has no wallet/private-key/seed-phrase text anywhere; Tamper Demo loads with an initial hash match; tampering the record and re-verifying genuinely flips the UI to a mismatch; Community page shows the code requirement; the app shell's splash screen appears before entry |

Run them: `npm test` (unit), `npm run test:vitest` (Vitest + Supertest), `npm run test:e2e` (Playwright, after `npx playwright install chromium`).

## What's verified against the real network, not simulated

| Behavior | Verified how |
|---|---|
| Compliance record → anchor | Real Hedera testnet transaction, confirmed directly against the public Mirror Node (topic ID, transaction ID, consensus timestamp all independently fetched and checked, not asserted) |
| Mirror Node query | The same record is retrievable from `testnet.mirrornode.hedera.com` by anyone, without going through this project's own API |
| Alter the off-chain record, then verify | Verification **fails** (hash mismatch), confirmed live in the Playwright suite above, not just described |
| Verify endpoint's own real-network check | Tries a Mirror Node message lookup by sequence number first, falls back to a Mirror Node transaction-ID lookup if that doesn't resolve, both independently confirmed working against real transactions during this project's own testing |

## Scope this project does not cover yet

- **Webhook signature verification.** The current fiat on-ramp (`POST /api/payments`) is a mock endpoint returning a fixed success response, not a real Stripe integration with signed webhooks. Testing signature verification, replay rejection, or webhook-triggered settlement would require that integration to exist first, see [Known Limitations](known-limitations.md).
- **Payout-partner failure/reconciliation handling.** Same reasoning, no real payout-partner (e.g. Flutterwave) integration exists yet to test failure handling against.
- **Load/concurrency testing.** Not attempted at this project's current scale.
