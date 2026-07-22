# Report Review: Corrections Needed Before Submission

This reviews the draft report ("Walletless Cross-Border Settlement... Ariana Osuna, Arowolo Kehinde, Muhammad Usman, Saba Azadegan, Mohamed Mama") against what this project actually contains right now, checked directly against the codebase and this project's own `docs/` (not assumed). Everything marked **⚠️ CHANGE NEEDED** is a real mismatch between a specific claim in the draft and what the code does. Everything marked **✅ CONFIRMED ACCURATE** was independently checked and matches. The Author Contributions section is intentionally not reviewed here, per request.

---

## 1. Project name (Abstract / title)

**Draft says:** "Walletless Cross-Border Settlement"

**⚠️ CHANGE NEEDED, or at least a decision:** the live deployed site's actual title is **"Cross-Border: Fiat-to-Fiat Settlement"** (`frontend/index.html`, both the browser tab title and the Open Graph title). This project's own `docs/README.md` intro also says "Walletless Cross-Border Settlement," so the draft matches the docs, it's the *site itself* that uses a different name. This is a pre-existing inconsistency between this project's own materials, not something the draft invented, but it should be resolved one way before submission: either update the site to match the report's title, or update the report to match the site's. Recommend picking whichever name reviewers will actually see first (the live URL), i.e., update the report to "Cross-Border: Fiat-to-Fiat Settlement," or note both names explicitly as the project's full name and its shorthand.

---

## 2. Section 4, Technology Stack table

This table has the most corrections. Each row below is exactly as written in the draft, checked directly against `package.json`, `backend/server.mjs`, and `prisma/schema.prisma`.

| Draft row | Status | What's actually true |
|---|---|---|
| **Database:** PostgreSQL + Prisma ORM | ⚠️ **CHANGE NEEDED** | **MongoDB + Prisma ORM**, not PostgreSQL. (This was *also* wrong at the time the draft was likely written, it was a local JSON file back then; it's real MongoDB now, but still not Postgres.) |
| **Fiat on-ramp:** Stripe Sandbox, "Test cards, PaymentIntent/Checkout flow, signed webhooks, and payment confirmation" | ⚠️ **CHANGE NEEDED** | The actual payment endpoint (`POST /api/payments`) is a mock returning a fixed success response. There is no Stripe SDK integration, no PaymentIntent, no webhook, no signature verification anywhere in the codebase. Recommend rewording to: "Sandbox payment simulation endpoint, demonstrating the orchestration flow's shape; a real Stripe PaymentIntent/webhook integration is scoped as future work, see Known Limitations." |
| **Fiat off-ramp:** Flutterwave Sandbox / controlled payout simulator | ⚠️ **CHANGE NEEDED** | The word "Flutterwave" does not appear anywhere in this codebase. Only the "controlled payout simulator" half of this row is accurate. Recommend removing the Flutterwave mention specifically, or rewording to "controlled payout simulator (no specific payout-partner API integrated yet)." |
| **Testing:** Vitest/Jest + Supertest + Playwright | ✅ **NOW CONFIRMED ACCURATE** | This was **not true** when likely written (the actual test command was Node's built-in `node --test`), but is genuinely true as of this review: real Vitest + Supertest tests (`npm run test:vitest`, 21 tests) and real Playwright end-to-end tests (`npm run test:e2e`, 6 tests) now exist alongside the original suite. No change needed here, this is the one row that's been made true rather than needing correction. |

---

## 3. Section 5.1, Live Testnet Evidence table

**✅ CONFIRMED ACCURATE**, with one number to double check. This project's own `docs/reference/testnet-evidence.md` independently confirms:

- HCS Topic `0.0.9617780` ✅
- Compliance anchor at sequence #2 ✅ (this was actually the subject of a real bug earlier in this project's development, an earlier draft of the demo data pointed at the wrong sequence number entirely; the current, corrected data matches what's in this table)
- Quote anchor at sequence #3, routing decisions at #4 and #5 ✅
- Live liquidity check ($18,111,247, real-time DeFiLlama read) ✅, matches the settlement router's actual live data source

**One thing worth double-checking before submission:** this table's exact dollar figure for the liquidity check is a live, real-time number by design (it queries DeFiLlama at anchor time), so if the report is finalized weeks after that anchor, the number in the report will legitimately differ from what a grader sees if they re-run the demo live. Recommend adding one sentence noting the figure is a live snapshot, not a fixed constant, so a different number during grading isn't mistaken for an inaccuracy.

---

## 4. Section 5.4, Testing

**Draft says:** "The repository includes 14 unit tests that run with no network dependency in roughly one second, plus two runnable demo scripts..."

**⚠️ CHANGE NEEDED (understated, not wrong):** 14 is still accurate for the original `node --test` suite specifically, but undercounts what's actually in the repo now. Recommend updating to something like:

> "The repository includes 14 unit tests (Node's built-in test runner, no network dependency), a further 21 tests via Vitest and Supertest (including real HTTP-level tests against the Express app itself), and 6 end-to-end tests via Playwright driving a real browser against the actual frontend, confirming the tamper-detection demo genuinely flips from a hash match to a mismatch. All three suites are independently runnable (`npm test`, `npm run test:vitest`, `npm run test:e2e`)."

---

## 5. Section 3.1, Component Responsibilities table

**Draft says:** "PostgreSQL persistence — Stores business records and external references..."

**⚠️ CHANGE NEEDED**, same correction as item 2: this should say **MongoDB persistence**, not PostgreSQL. Recommend also adding one sentence noting the deliberate local-file fallback (if MongoDB is unreachable, the backend degrades to a local file rather than crashing), since that's a real, notable design choice, not just an implementation detail.

---

## 6. What's already honest and doesn't need softening

Worth saying plainly: most of this draft is accurate, careful, and already does the hard thing of stating limitations directly (Section 5.3's "what is genuinely executed vs. honestly not," Section 9's limitations list, Section 8's comparison table). The corrections above are specific and factual, not a sign the whole report needs rewriting. Sections 1, 2, 3 (except the one table), 6, 7, 8, 9, and 10 were checked and don't need changes.

---

## 7. References section: additions to consider

The current reference list (Hedera docs, HashScan, Stripe API reference, DeFiLlama, the GitHub repo, the live application) should either drop the Stripe reference (since Stripe itself isn't actually integrated, see item 2 above) or reframe it as "referenced for the production-path design, not implemented in this sandbox." Consider adding:

- **MongoDB Documentation.** (2026). *MongoDB Atlas & Node.js Driver.* https://www.mongodb.com/docs/ (persistence runs on MongoDB now).
- **Prisma Documentation.** (2026). *Prisma ORM.* https://www.prisma.io/docs (for the ORM layer itself).
- **Playwright Documentation.** (2026). *Playwright.* https://playwright.dev/docs/intro (for the end-to-end test suite).
- **Vitest Documentation.** (2026). *Vitest.* https://vitest.dev/guide/ (for the unit/integration test suite).

---

## Summary of concrete edits needed

1. Decide and align the project's name (site vs. report).
2. Fix the Technology Stack table: PostgreSQL → MongoDB; correct or soften the Stripe and Flutterwave claims to match what's actually integrated (mocks, not real SDKs); the testing row can stay, it's now true.
3. Fix "PostgreSQL persistence" in the Component Responsibilities table to MongoDB.
4. Update the testing count/description in Section 5.4 to include the new Vitest/Supertest/Playwright suites.
5. Add one sentence noting the liquidity figure is a live snapshot.
6. Update references: drop or reframe Stripe, add MongoDB/Prisma/Playwright/Vitest.
