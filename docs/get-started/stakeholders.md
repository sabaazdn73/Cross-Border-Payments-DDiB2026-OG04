# Stakeholders & Roles

| Role | Needs | In our design |
|---|---|---|
| Sender (freelancer, individual, SME) | Send EUR, have it arrive as local currency, fast, cheap, no crypto | Card/SEPA only. Never sees a wallet. |
| Recipient | Local currency in a normal bank account | Receives a standard credit. Never sees a wallet. |
| Licensed on-ramp PSP | Regulatory cover for the fiat leg; KYC on the payer | Performs KYC; we consume the result |
| Licensed payout partner | Local licence, local liquidity, local checks | Performs the payout; holds the local float |
| Regulator / auditor | Proof that checks occurred, when they occurred | Reads the HCS anchor independently via Mirror Node |
| **Us** | — | Orchestrate; anchor; hold nothing |

---
