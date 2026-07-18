// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/hashing.mjs
//   ───────────────────────────────────────────────────────────────
//   Two functions, and both are load-bearing for the legal argument
//   in the report (§13.3), not just implementation detail:
//
//   canonicalHash — the SAME logical record must ALWAYS hash to the
//     SAME value, regardless of what order its fields were built in.
//     If it didn't, "recompute the hash and compare" — our entire
//     verification claim — would be unreliable.
//
//   pseudoRef — turns a low-entropy identifier (an account number, a
//     phone number, a transfer reference) into something that cannot
//     be brute-forced back to the original. A PLAIN hash is NOT
//     enough here: many real-world identifiers have a small enough
//     search space that an attacker just hashes every possibility
//     and looks for a match. Keying the hash with a secret pepper
//     closes that door.
// ═══════════════════════════════════════════════════════════════════

import { createHash, createHmac } from "node:crypto";

/** Recursively sort object keys so JSON.stringify is deterministic.
 *  { b:2, a:1 } and { a:1, b:2 } must produce identical output. */
function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    return Object.keys(value).sort().reduce((acc, key) => {
      acc[key] = sortObject(value[key]);
      return acc;
    }, {});
  }
  return value;
}

/** SHA-256 of a canonical JSON representation of `record`.
 *  Returns a hex string WITHOUT the "sha256:" prefix — callers that
 *  want the prefix (for on-chain messages) add it themselves, so
 *  this function stays reusable for internal comparisons too. */
export function canonicalHash(record) {
  const canonical = JSON.stringify(sortObject(record));
  return createHash("sha256").update(canonical).digest("hex");
}

/** A keyed, truncated reference safe to anchor publicly.
 *
 *  Do NOT replace this with a plain createHash("sha256").update(id):
 *  an account number or phone number has far too little entropy —
 *  an attacker can hash every plausible value in seconds and match
 *  it against what's on-chain. HMAC with a secret pepper means the
 *  attacker would also need the pepper, which never leaves our
 *  server and is never anchored anywhere.
 *
 *  `pepper` should come from process.env.HEDERA_PSEUDO_PEPPER — a
 *  long random string generated once per environment and kept only
 *  in .env, exactly like the Hedera private key. */
export function pseudoRef(identifier, pepper) {
  if (!pepper || pepper.length < 16) {
    throw new Error(
      "pseudoRef requires a pepper of at least 16 characters. " +
      "Set HEDERA_PSEUDO_PEPPER in .env — generate one with: " +
      "node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return createHmac("sha256", pepper).update(String(identifier)).digest("hex").slice(0, 24);
}

