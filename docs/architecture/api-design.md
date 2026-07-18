# API Design

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/quote` | Amount + corridor → fee, FX rate, arrival estimate |
| POST | `/api/transfer` | Create a transfer; return the PSP checkout session |
| POST | `/api/webhook/psp` | Receive the licensed PSP's payment confirmation |
| POST | `/api/settle/:transferId` | Execute the stablecoin transfer on Hedera |
| POST | `/api/anchor/:complianceRecordId` | Canonicalise, hash, submit to HCS |
| POST | `/api/payout/:transferId` | Instruct the licensed payout partner |
| GET | `/api/transfer/:id` | Status + settlement + anchor references |
| GET | `/api/verify/:transferId` | Recompute the hash, compare against the Mirror Node record |
| GET | `/api/health` | Network mode, topic, account |

**Error states:** anchor fails → `Pending Anchor`, retry, never lose the record. Mirror lag → `Pending Verification`. Hash mismatch → explicit tamper warning. Payout fails → the settlement is already final, so the transfer enters a reconciliation state rather than silently failing.

---
