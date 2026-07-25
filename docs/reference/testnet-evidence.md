# Live Testnet Evidence

A real, captured run, not illustrative output. Topic
[0.0.9617780](https://hashscan.io/testnet/topic/0.0.9617780) on Hedera
testnet.

## Unit tests, 14/14, no network

```
✔ canonicalHash: same record, different key order → same hash
✔ canonicalHash: nested objects are also order-independent
✔ canonicalHash: one changed field → different hash (tamper detection)
✔ canonicalHash: arrays preserve order
✔ pseudoRef: same identifier + same pepper → same reference
✔ pseudoRef: same identifier + different pepper → different reference
✔ pseudoRef: rejects a missing or short pepper
✔ pseudoRef: output is a fixed-length hex string, not the raw identifier
✔ chooses hedera when partner supports it and amount is within threshold
✔ falls back to ethereum/solana when amount exceeds the threshold
✔ falls back when the liquidity fetcher itself fails (network hiccup)
✔ throws a clear error for an unconfigured partner
✔ every decision carries a human-readable reason
✔ candidatesConsidered only includes valid chains
ℹ tests 14  ℹ pass 14  ℹ fail 0
```(8 hashing tests + 6 router tests = 14 total)

## `node demo-modular.mjs`, compliance + quote anchoring

```
[2] Anchor a compliance record
  ✓ sequence #2 · sha256:4bbddf329febc65ad…
     https://hashscan.io/testnet/transaction/0.0.8762554@1784361892.460950287

[3] Anchor a quote
  ✓ sequence #3 · sha256:7660c514c58437bdb…

[4] Verify both anchors independently via Mirror Node
  ✓ compliance record: MATCH (consensus 1784361897.785442507)
  ✓ quote record: MATCH (consensus 1784361899.945158765)

[5] Tamper, recompute against a modified record
     someone edits the stored quote: rate 415.20 → 430.00
  ✓ MISMATCH, the off-chain record has changed since it was anchored
```

## `node demo-router.mjs`, real chain routing

**Small amount ($100) → Hedera, executed for real:**

```
[1] chain: hedera (bridge: native)
     Partner supports Hedera and $100 is within the safe threshold ($20000),
     given ~$18,111,247 in checked Hedera stablecoin liquidity depth.
[2] Routing decision anchored, sequence #4
[3] MATCH, anyone can confirm why this transfer went to hedera
[4] REAL transaction on hedera: 0.0.8762554@1784361956.533272762
     https://hashscan.io/testnet/transaction/0.0.8762554@1784361956.533272762
```

**Large amount ($50,000) → Ethereum, not executed:**

```
[1] chain: ethereum (bridge: cctp)
     Amount $50000 exceeds the Hedera safe threshold ($20000);
     routed to ethereum for deeper liquidity.
[2] Routing decision anchored, sequence #5
[3] MATCH, anyone can confirm why this transfer went to ethereum
[4] NOT executed on ethereum. No funded ethereum testnet credentials
     are configured in this environment... Left unexecuted deliberately
     rather than fabricated.
```

{% hint style="success" %}
The $18,111,247 figure in the run above reflects the liquidity source
in use at the time (DeFiLlama). The liquidity source was later
switched to SaucerSwap's own `/stats` endpoint, a named Hedera
ecosystem partner rather than a third-party aggregator, verified
separately end to end: $26,510,503, live, not hardcoded.
{% endhint %}

## Completion anchor (Hedera Schedule Service), a real captured run

Intermediary settlement account, 2-of-2 threshold key:
[0.0.9753237](https://hashscan.io/testnet/account/0.0.9753237)

Dedicated completion topic, submit key = the same 2-of-2 partner
`KeyList`, not the operator key:
[0.0.9753239](https://hashscan.io/testnet/topic/0.0.9753239)

```
[thresholdAccount] Created intermediary account 0.0.9753237 on testnet.
[topic] Created dedicated completion topic 0.0.9753239 (submit key = 2-of-2 partner list).
```

The schedule created against that topic does not execute at creation,
and does not execute after only one partner's `ScheduleSignTransaction`
signs it, only after both. That gap between "created" and "executed"
is what makes the two-party requirement real rather than asserted.
