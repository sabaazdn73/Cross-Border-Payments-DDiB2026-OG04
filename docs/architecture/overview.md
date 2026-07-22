# System Overview

The system separates two concerns that are easy to conflate, and
keeping them separate is the central architectural decision of the
whole project:

| Layer | Question it answers | Always |
|---|---|---|
| **Trust layer** ([Hedera](trust-layer.md)) | Did this check happen, and when? | Hedera |
| **Settlement layer** ([routing](settlement-layer.md)) | Which chain actually moved the value? | Chosen per transfer |

## Why they're separate

A product's trust anchor and its settlement rail don't have to be the
same network. Hedera Consensus Service gives us a fixed-fee,
deterministic-finality timestamping service, ideal for a compliance
trail that has to remain economical and verifiable for years. But
Hedera's own stablecoin liquidity is real yet thin (tens of millions
of dollars, not billions), so a large transfer settled entirely on
Hedera could see meaningful slippage.

Separating the two means: **the compliance and routing evidence is
always anchored the same way, on the same network, regardless of which
chain the money actually moves through.** A regulator examining a
transfer years later doesn't need to trust whichever settlement chain
was in fashion at the time, only the anchor, which never changes.

## Component map

```
backend/services/hedera/, the trust anchor, always Hedera
  client.mjs        Hedera connection + key parsing
  hashing.mjs        canonical hashing + HMAC pseudonymous refs
  topic.mjs           HCS topic creation/reuse
  anchor.mjs           compliance / quote / routing-decision anchoring
  verify.mjs            Mirror Node read-back + tamper detection

backend/services/settlement/, which chain moves the value
  corridorConfig.mjs   partner chain support, compliant stablecoins
  liquidity.mjs         real Hedera liquidity depth (DeFiLlama)
  corridorRouter.mjs     the routing decision function
  execute.mjs             real execution (Hedera) / labeled non-execution (elsewhere)
```

Full function-level detail: [Module Reference](../reference/modules.md).
