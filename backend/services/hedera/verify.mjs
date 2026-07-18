// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/verify.mjs
//   ───────────────────────────────────────────────────────────────
//   Reads an anchored message back from a PUBLIC Mirror Node — not
//   from our own database — and compares it against a freshly
//   recomputed hash of the record as it exists off-chain right now.
//
//   This is the entire verification claim in code:
//     MATCH    → the off-chain record has not been altered since
//                it was anchored
//     MISMATCH → it has (or the two records never matched)
//
//   Mirror Node consensus can lag the submit by a few seconds, so
//   fetchMirrorMessage retries with backoff rather than failing on
//   the first miss (per Day 4 / Day 5 of the six-day plan).
// ═══════════════════════════════════════════════════════════════════

import { getNetwork } from "./client.mjs";
import { canonicalHash } from "./hashing.mjs";

/** Fetch one HCS message from the public Mirror Node REST API.
 *  Retries with linear backoff because consensus can take a few
 *  seconds to reach the mirror after submission. Returns the decoded
 *  message (see decodeMirrorMessage) or throws after `retries`. */
export async function fetchMirrorMessage(topicId, sequenceNumber, {
  retries = 12, delayMs = 2000, network = getNetwork(),
} = {}) {
  const url = `https://${network}.mirrornode.hedera.com/api/v1/topics/${topicId}/messages/${sequenceNumber}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url);
    if (res.ok) {
      const raw = await res.json();
      return { ...raw, decoded: decodeMirrorMessage(raw) };
    }
    if (attempt < retries) await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(
    `Mirror Node did not return topic ${topicId} message #${sequenceNumber} ` +
    `after ${retries} attempts. It may still be propagating — safe to retry ` +
    `from the caller as a "Pending Verification" state rather than a failure.`
  );
}

/** HCS messages are base64 on the wire. Decode + parse back to the
 *  JSON payload anchor.mjs originally submitted. */
export function decodeMirrorMessage(mirrorResponse) {
  return JSON.parse(Buffer.from(mirrorResponse.message, "base64").toString("utf8"));
}

/** The verification itself: recompute the hash of `record` as it
 *  exists RIGHT NOW and compare against what was anchored.
 *
 *  Returns { verified: true }               → MATCH
 *       or { verified: false, reason }      → MISMATCH, with why
 *
 *  This is what /api/transfers/:id/compliance/verify (Arowolo's
 *  endpoint) should call after fetching the stored record and its
 *  anchor reference. */
export function verifyRecord(record, anchoredMessage) {
  const recomputed = `sha256:${canonicalHash(record)}`;
  const anchored = anchoredMessage.decoded?.recordHash ?? anchoredMessage.recordHash;

  if (recomputed === anchored) {
    return {
      verified: true,
      recordHash: anchored,
      consensusTimestamp: anchoredMessage.consensus_timestamp,
    };
  }
  return {
    verified: false,
    reason: "Recomputed hash does not match the anchored hash — the off-chain " +
            "record has changed since it was anchored, or does not correspond " +
            "to this anchor.",
    recomputedHash: recomputed,
    anchoredHash: anchored,
  };
}

