// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/__tests__/hashing.test.mjs
//   ───────────────────────────────────────────────────────────────
//   Run with:  node --test backend/services/hedera/__tests__
//
//   These cover exactly the two claims the report and the demo make:
//     "the same logical record always produces the same hash" and
//     "a changed record produces a different hash" (§25.3 test
//     matrix, row: "Canonicalization and SHA-256 hashing").
//   No network access needed — these run in under a second.
// ═══════════════════════════════════════════════════════════════════

import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalHash, pseudoRef } from "../hashing.mjs";

test("canonicalHash: same record, different key order → same hash", () => {
  const a = { outcome: "PASS", checkType: "KYC_SENDER", recordId: "cmp_1" };
  const b = { recordId: "cmp_1", outcome: "PASS", checkType: "KYC_SENDER" };
  assert.equal(canonicalHash(a), canonicalHash(b));
});

test("canonicalHash: nested objects are also order-independent", () => {
  const a = { id: "x", meta: { z: 1, a: 2 } };
  const b = { meta: { a: 2, z: 1 }, id: "x" };
  assert.equal(canonicalHash(a), canonicalHash(b));
});

test("canonicalHash: one changed field → different hash (tamper detection)", () => {
  const original = { recordId: "cmp_1", outcome: "PASS" };
  const tampered = { recordId: "cmp_1", outcome: "FAIL" };
  assert.notEqual(canonicalHash(original), canonicalHash(tampered));
});

test("canonicalHash: arrays preserve order (order matters inside arrays)", () => {
  const a = { list: [1, 2, 3] };
  const b = { list: [3, 2, 1] };
  assert.notEqual(canonicalHash(a), canonicalHash(b));
});

test("pseudoRef: same identifier + same pepper → same reference", () => {
  const pepper = "a".repeat(32);
  assert.equal(pseudoRef("+41791234567", pepper), pseudoRef("+41791234567", pepper));
});

test("pseudoRef: same identifier + different pepper → different reference", () => {
  const ref1 = pseudoRef("+41791234567", "a".repeat(32));
  const ref2 = pseudoRef("+41791234567", "b".repeat(32));
  assert.notEqual(ref1, ref2);
});

test("pseudoRef: rejects a missing or short pepper", () => {
  assert.throws(() => pseudoRef("some-id", ""));
  assert.throws(() => pseudoRef("some-id", "short"));
});

test("pseudoRef: output is a fixed-length hex string, not the raw identifier", () => {
  const ref = pseudoRef("+41791234567", "a".repeat(32));
  assert.equal(ref.length, 24);
  assert.doesNotMatch(ref, /41791234567/);
});

