# Data Model

| Entity | Fields |
|---|---|
| `transfers` | id, senderRef, recipientRef, amountIn, currencyIn, amountOut, currencyOut, fxRate, status, createdAt |
| `compliance_records` | id, transferId, provider, checkType, outcome, checkedAt, canonicalHash |
| `settlements` | id, transferId, network, tokenId, txId, consensusTimestamp, hashscanUrl |
| `anchors` | id, complianceRecordId, topicId, sequenceNumber, consensusTimestamp, messageHash, status |
| `payouts` | id, transferId, provider, providerRef, status, receiptJson |

**No table stores client funds, private keys, or wallet balances.** By design, [this section](../legal/why-this-is-legal.md).

---
