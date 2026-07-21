// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/index.mjs
//   ───────────────────────────────────────────────────────────────
//   Single import point for the rest of the app. Arowolo's
//   orchestration API should only ever need this file:
//
//     import {
//       getOrCreateTopic, anchorComplianceRecord, anchorQuote,
//       fetchMirrorMessage, verifyRecord, pseudoRef,
//     } from "../services/hedera/index.mjs";
//
//   No other file in /backend should import client.mjs, anchor.mjs,
//   hashing.mjs or verify.mjs directly — that keeps every Hedera
//   detail (key parsing, network name, Mirror Node URL shape) in one
//   place, so if any of it changes, only this folder changes.
// ═══════════════════════════════════════════════════════════════════

export { getClient, getOperatorAccountId, getNetwork, closeClient } from "./client.mjs";
export { canonicalHash, pseudoRef } from "./hashing.mjs";
export { getOrCreateTopic, topicHashscanUrl } from "./topic.mjs";
export { anchorComplianceRecord, anchorQuote, anchorRoutingDecision } from "./anchor.mjs";
export { fetchMirrorMessage, fetchMirrorTransaction, decodeMirrorMessage, verifyRecord } from "./verify.mjs";

