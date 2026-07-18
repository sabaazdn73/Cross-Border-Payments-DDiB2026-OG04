# Testing & Validation

| Test | Expected |
|---|---|
| Test card → webhook | Signature verified; transfer created |
| Unsigned/forged webhook | Rejected |
| Webhook → settlement | Real Hedera testnet transaction; HashScan link stored |
| Compliance record → anchor | Topic, sequence, consensus timestamp persisted |
| Mirror Node query | Same record returned without our API |
| Alter the off-chain record | Verification **fails** — tamper evident |
| Hedera unavailable | Record stored `Pending Anchor`; retried; not lost |
| Payout sandbox failure | Transfer enters reconciliation; settlement not silently lost |
| Full flow | No wallet, address, gas fee or seed phrase appears anywhere |
| Inspect the ledger | No personal data present — hash and pseudonymous reference only |

---
