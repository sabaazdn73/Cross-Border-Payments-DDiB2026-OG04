// ═══════════════════════════════════════════════════════════════════
//   backend/services/community/code.mjs
//   ───────────────────────────────────────────────────────────────
//   Generates the "Community Usage Code" a sender can use as proof
//   they completed a real transaction with a real Hedera anchor,
//   without exposing the Hedera hash itself (anyone could copy that
//   from a public HashScan page -- it proves nothing about who they
//   are). This code is:
//
//     - generated ONCE per successful, really-anchored transaction
//     - shown to the user exactly once, at generation time
//     - stored server-side only as a SHA-256 hash of the code, never
//       the raw code itself, so even this backend cannot "recover"
//       a lost code -- it can only verify a submitted code against
//       the stored hash, the same non-reversible pattern used for
//       the compliance-record anchoring elsewhere in this project
// ═══════════════════════════════════════════════════════════════════

import crypto from "crypto";

/** A short, human-typeable code: not the Hedera hash, not the
 *  transaction ID, just random entropy tied to this one event. */
export function generateCommunityCode() {
  // 10 bytes -> 16 base32-ish chars, grouped for readability
  const raw = crypto.randomBytes(10).toString("hex").toUpperCase();
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}`;
}

/** Store only the hash -- the code itself is never persisted. */
export function hashCommunityCode(code) {
  return crypto.createHash("sha256").update(code.trim().toUpperCase()).digest("hex");
}
