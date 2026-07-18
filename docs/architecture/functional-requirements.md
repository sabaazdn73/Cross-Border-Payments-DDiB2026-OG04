# Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Quote a corridor: fee, FX rate, arrival estimate | Must |
| FR-02 | Accept fiat through a licensed PSP sandbox; never touch the funds | Must |
| FR-03 | Receive and verify the PSP webhook | Must |
| FR-04 | Execute a real stablecoin transfer on Hedera testnet | Must |
| FR-05 | Canonicalise and hash the compliance record | Must |
| FR-06 | Anchor the hash on HCS; store topic, sequence, consensus timestamp | Must |
| FR-07 | Instruct payout through a licensed payout sandbox | Must |
| FR-08 | Verify an anchor via Mirror Node without our API | Must |
| FR-09 | Detect tampering: recompute and compare | Must |
| FR-10 | Complete the entire flow with no wallet artefact visible | Must |
| FR-11 | Never persist client funds, keys or balances | Must |
| FR-12 | Retry a failed anchor without losing the record | Should |
| FR-13 | Show the corridor's liquidity source explicitly in the UI | Should |

### 18.1 Non-functional

| Category | Requirement |
|---|---|
| Legal | No custody. No client funds. No client crypto-assets. Ever. |
| Privacy | No personal data on-chain; hash + pseudonymous reference only |
| Security | Operator key in `.env`, never committed; PSP webhook signature verified |
| Integrity | Every anchor retains local hash, topic, sequence, consensus timestamp |
| Verifiability | A third party verifies via Mirror Node with no access to us |
| Honesty | The UI names the licensed parties in the flow — we do not present their service as ours |

---
