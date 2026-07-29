# Milestones

This project has been built, submitted, and extended across several
distinct venues, not as one linear submission. This page is the
single timeline: what each stage actually added to the architecture,
what came of it, and which paths are still open or under way. Each
milestone links to a full write-up where one exists.

## 1. UZH Blockchain — Deep Dive into Blockchain 2026 (17–23 July 2026)

The origin. Built from scratch for the University of Zurich's DDiB
2026 summer school: the Hedera trust layer (compliance, quote, and
routing anchors via HCS), corridor routing across five settlement
chains, a full web + mobile app, a real database, a real test suite,
and the initial documentation site. Full phase-by-phase detail:
[UZH Blockchain](uzh-blockchain.md).

**Outcome:** completed submission, 23 July hand-in.

## 2. ETHGlobal Lisbon 2026 (24–26 July 2026)

Independently extended past the UZH submission for ETHGlobal Lisbon,
Continuity Track. Added the HSS-gated, 2-of-2 threshold-key
completion anchor, a dedicated completion topic, the How It Works
walkthrough page, and the SaucerSwap liquidity source. Full detail:
[ETHGlobal Lisbon 2026](ethglobal-lisbon.md).

**Outcome:** won the **Autonomous On-Chain Automation Platform**
partner prize (Hedera track).

## 3. Becoming a collection: the site split, and OnChain Oversight (26–28 July 2026)

Two things happened together here, worth documenting since neither
is covered by the two pages above.

**The site restructured into a collection.** The root route (`/`) is
now a hub introducing the collection, F2F Cross-Border moved to its
own route (`/cross-border`), and a regulator-facing section (public
Mirror Node observability, at retail and institutional scale) was
added to the How It Works page. Sitewide typeface changed to Inter.

**OnChain Oversight, a sister project, was conceived.** Built on the
same trust-layer philosophy, public data, independently verifiable,
never a black box, but for a different audience: an autonomous agent
that continuously watches public on-chain activity (Hedera and
Ethereum) and surfaces prioritised, source-linked findings to a named
human regulator, rather than serving transfer senders directly. It
reuses F2F's own HSS completion-anchor and threshold-account
infrastructure as its first real, working proof case, see
[the regulator-oversight case](../legal/regulator-oversight.md) for
the shared architectural reasoning.

**Outcome:** ongoing; the collection hub and regulator-oversight
section are live.

## 4. Cambridge C:\>DIR 'Agentic Regulator' Hackathon — Preliminary Round (submitted 28 July 2026)

The first formal submission for **OnChain Oversight** specifically,
not F2F itself, under the team name "F2F OnChain Oversight",
targeting the Decentralised Market Infrastructure and Agentic
Payments Oversight problem spaces. A hierarchical planner-worker
agent design (retrieval, analysis, and verifier/critic agents) built
directly on F2F's proven HSS mechanism as the Hedera-side proof case.

**Outcome:** pending, Preliminary Round results expected mid-August
2026.

## Open or potential future paths

Tracked here as they're decided, rather than duplicated across pages:

| Path | Status |
|---|---|
| Cambridge C:\>DIR Final Round | Pending Preliminary Round result |
| Ethereum Foundation Ecosystem Support Program (ESP) | Under consideration, for OnChain Oversight, independent of the Cambridge result |
| ETHGlobal Online / other future ETHGlobal events | Under consideration |

## What each milestone actually changed, at a glance

| Milestone | Added to the architecture |
|---|---|
| UZH Blockchain | HCS trust layer (3 anchor types), corridor routing, full app, real DB, real tests |
| ETHGlobal Lisbon 2026 | HSS completion anchor, 2-of-2 threshold account, dedicated completion topic, SaucerSwap liquidity |
| Site split + OnChain Oversight | Collection hub, `/cross-border` split, regulator-oversight section, sister project defined |
| Cambridge C:\>DIR (submitted) | Formal agentic architecture proposal (retrieval/analysis/verifier agents) for OnChain Oversight |
