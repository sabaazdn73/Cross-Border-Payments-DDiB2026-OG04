# ETHGlobal Lisbon 2026

F2F Cross-Border was extended past the original UZH submission (see
[UZH Blockchain](uzh-blockchain.md) for that phase) to also enter
**ETHGlobal Lisbon 2026**, under the **Continuity Track** ("Ship a
Feature", extending an existing project rather than starting fresh)
and targeting two bounties:

- **No Solidity Allowed** — the entire settlement, anchoring, and
  completion layer runs on Hedera's native services (HCS, HTS, HSS),
  with no Solidity contracts anywhere in the flow.
- **Autonomous On-Chain Automation Platform** (Continuity-only) — met
  by the Hedera Schedule Service (HSS) completion anchor, described
  below, which is genuinely autonomous: once both required signatures
  land, Hedera's own consensus executes the message submission with
  no further code of ours involved.

## What was added for this submission

| Addition | What it does |
|---|---|
| **HSS-gated completion anchor** | A fourth anchor (`scheduleAnchor.mjs`), beyond the original compliance/quote/routing anchors, that only reaches HCS once both the source-side and destination-side partner have independently signed a `ScheduleCreateTransaction` |
| **2-of-2 threshold-key intermediary account** | `thresholdAccount.mjs`, a Hedera account whose `KeyList` requires both partner keys to move funds, so no single party (including the platform) holds unilateral control |
| **Dedicated completion topic** | A second HCS topic whose submit key is the same 2-of-2 `KeyList`, so the two-party requirement is enforced at the protocol level, not just in application code |
| **How It Works page** | A new `/how-it-works` route walking through a full Portugal → Armenia corridor end to end, with every anchor point marked, plus a horizontal backend-call map |
| **SaucerSwap liquidity source** | Hedera stablecoin liquidity depth checks now call SaucerSwap's own `/stats` endpoint directly, a named Hedera ecosystem partner, in place of a third-party aggregator |

## Why this fits the Continuity Track

The base project (compliance/quote/routing anchoring, corridor
routing, licensed-partner settlement) already existed from the UZH
submission. Everything above is additive: a new capability (HSS
automation) layered onto the existing settlement flow, a new page
that walks through it, and a swap of one data source for a more
first-party one, none of it a rewrite of the original architecture.

## Where each piece lives

- Track/bounty fit: this page
- Technical detail on the completion anchor and threshold account:
  [The Trust Layer](../architecture/trust-layer.md#the-completion-anchor-gated-by-two-parties-not-one)
- Module-level reference: [`scheduleAnchor.mjs`, `thresholdAccount.mjs`, `topic.mjs`](../reference/modules.md)
- User-facing walkthrough: `/how-it-works` (`HowItWorks.jsx`, embedding `use-case-story.html`)
