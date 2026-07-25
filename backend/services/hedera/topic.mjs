// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/topic.mjs
//   ───────────────────────────────────────────────────────────────
//   One HCS topic is the spine of the whole compliance trail: every
//   anchored record — compliance checks and quote commitments alike —
//   is a message on this single topic, in order, with a submit key so
//   only our backend can write to it (anyone can still READ it; that
//   asymmetry — private writes, public reads — is deliberate and is
//   what makes Mirror Node verification meaningful).
// ═══════════════════════════════════════════════════════════════════

import { TopicCreateTransaction } from "@hashgraph/sdk";
import { getClient, getNetwork } from "./client.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

/** Returns the existing topic ID from .env, or creates a new HCS
 *  topic and persists it back to .env so the next run reuses it.
 *  Only ONE topic should exist per environment — don't call this
 *  more than once per deployment. */
export async function getOrCreateTopic({ memo = "DDiB2026-OG04 · compliance anchor" } = {}) {
  const existing = process.env.HEDERA_TOPIC_ID;
  if (existing) return existing;

  const client = getClient();
  const key = client.operatorPublicKey;

  const tx = await new TopicCreateTransaction()
    .setTopicMemo(memo)
    .setSubmitKey(key)   // only we can write; anyone can still read
    .execute(client);
  const receipt = await tx.getReceipt(client);
  const topicId = receipt.topicId.toString();

  // Convenience for local dev: persist so the next run reuses it.
  // In a deployed environment, set HEDERA_TOPIC_ID directly instead.
  if (existsSync(".env")) {
    const env = readFileSync(".env", "utf8");
    writeFileSync(".env", env.includes("HEDERA_TOPIC_ID=")
      ? env.replace(/HEDERA_TOPIC_ID=.*/, `HEDERA_TOPIC_ID=${topicId}`)
      : env.trimEnd() + `\nHEDERA_TOPIC_ID=${topicId}\n`);
  }
  process.env.HEDERA_TOPIC_ID = topicId;
  return topicId;
}

export function topicHashscanUrl(topicId) {
  return `https://hashscan.io/${getNetwork()}/topic/${topicId}`;
}

/** Returns the existing completion topic ID from .env, or creates a
 *  dedicated HCS topic for completion-anchor messages whose submit
 *  key is the 2-of-2 partner KeyList (source + destination), NOT the
 *  operator key. This is what actually makes the completion schedule
 *  wait for both partner signatures: if this topic reused the main
 *  topic's operator-keyed submit key, the operator's own payer
 *  signature on ScheduleCreateTransaction would already satisfy the
 *  required signer, and the schedule would execute immediately at
 *  creation — before either partner ever signs. Only ONE completion
 *  topic should exist per environment; call this once and persist
 *  HEDERA_COMPLETION_TOPIC_ID like the other one-time resources. */
export async function getOrCreateCompletionTopic(submitKeyList, { memo = "DDiB2026-OG04 · completion anchor (2-of-2 gated)" } = {}) {
  const existing = process.env.HEDERA_COMPLETION_TOPIC_ID;
  if (existing) return existing;

  const client = getClient();

  const tx = await new TopicCreateTransaction()
    .setTopicMemo(memo)
    .setSubmitKey(submitKeyList) // 2-of-2 partner KeyList — NOT client.operatorPublicKey
    .execute(client);
  const receipt = await tx.getReceipt(client);
  const topicId = receipt.topicId.toString();

  if (existsSync(".env")) {
    const env = readFileSync(".env", "utf8");
    writeFileSync(".env", env.includes("HEDERA_COMPLETION_TOPIC_ID=")
      ? env.replace(/HEDERA_COMPLETION_TOPIC_ID=.*/, `HEDERA_COMPLETION_TOPIC_ID=${topicId}`)
      : env.trimEnd() + `\nHEDERA_COMPLETION_TOPIC_ID=${topicId}\n`);
  }

  console.warn(
    `[topic] Created dedicated completion topic ${topicId} (submit key = 2-of-2 partner list).\n` +
    `[topic] Save this as an env var to reuse across restarts:\n` +
    `[topic]   HEDERA_COMPLETION_TOPIC_ID=${topicId}`
  );

  process.env.HEDERA_COMPLETION_TOPIC_ID = topicId;
  return topicId;
}

