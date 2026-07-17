// ═══════════════════════════════════════════════════════════════════
//  STEP 1 — Prove the rail is real.
//
//  Save as: step1-hedera.mjs   (next to your .env)
//  Run:     npm i @hashgraph/sdk dotenv
//           node step1-hedera.mjs
//
//  What it does, and why each part exists:
//    1. Connects to Hedera testnet with your operator key
//    2. Creates an HCS topic — this is the compliance trail's spine
//    3. Hashes a fake compliance record and anchors ONLY the hash
//    4. Reads it back from a public Mirror Node — no access to us
//    5. Recomputes the hash and compares → MATCH
//    6. Tampers with the record and compares again → MISMATCH
//
//  Step 6 is the demo's kill shot. If this file runs, the whole thesis
//  is proven and everything after it is plumbing.
// ═══════════════════════════════════════════════════════════════════

import {
  Client, PrivateKey, AccountId,
  TopicCreateTransaction, TopicMessageSubmitTransaction,
} from "@hashgraph/sdk";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import "dotenv/config";

const NETWORK = process.env.HEDERA_NETWORK ?? "testnet";
const ACCOUNT = process.env.HEDERA_ACCOUNT_ID;
const KEY_RAW = process.env.HEDERA_PRIVATE_KEY;

const log = (...a) => console.log(...a);
const ok  = (m) => log("  \x1b[32m✓\x1b[0m " + m);
const bad = (m) => log("  \x1b[31m✗\x1b[0m " + m);
const step = (n, m) => log(`\n\x1b[35m[${n}]\x1b[0m \x1b[1m${m}\x1b[0m`);

// ─── canonical hashing ─────────────────────────────────────────────
// Key order MUST be deterministic. If the same record can hash two
// different ways, the entire verification claim collapses.
function sortObject(v) {
  if (Array.isArray(v)) return v.map(sortObject);
  if (v && typeof v === "object")
    return Object.keys(v).sort().reduce((a, k) => (a[k] = sortObject(v[k]), a), {});
  return v;
}
const canonicalHash = (rec) =>
  createHash("sha256").update(JSON.stringify(sortObject(rec))).digest("hex");

// ─── preflight ─────────────────────────────────────────────────────
step("0", "Checking your .env");
if (!ACCOUNT || !KEY_RAW || KEY_RAW.startsWith("<")) {
  bad("HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY is missing from .env");
  log("\n  Create a file named .env next to this script containing:\n");
  log("    HEDERA_NETWORK=testnet");
  log("    HEDERA_ACCOUNT_ID=0.0.10649745");
  log("    HEDERA_PRIVATE_KEY=302e0201...   <- the DER key from portal.hedera.com");
  log("    HEDERA_TOPIC_ID=\n");
  process.exit(1);
}
ok(`account ${ACCOUNT} on ${NETWORK}`);

// The portal hands out ED25519 DER by default. Accept the common shapes
// rather than making you care which one you copied.
let operatorKey;
try {
  operatorKey = KEY_RAW.startsWith("302e") || KEY_RAW.startsWith("3030")
    ? PrivateKey.fromStringDer(KEY_RAW)
    : PrivateKey.fromStringED25519(KEY_RAW);
  ok(`key parsed (${operatorKey.type ?? "ED25519"})`);
} catch (e) {
  bad("could not parse the private key — copy the DER value from the portal");
  log("     " + e.message);
  process.exit(1);
}

const client = Client.forName(NETWORK).setOperator(AccountId.fromString(ACCOUNT), operatorKey);

// ─── 1. topic ──────────────────────────────────────────────────────
step("1", "HCS topic — the spine of the compliance trail");
let topicId = process.env.HEDERA_TOPIC_ID;

if (topicId) {
  ok(`reusing existing topic ${topicId}`);
} else {
  const tx = await new TopicCreateTransaction()
    .setTopicMemo("DDiB2026-OG04 · compliance anchor")
    // Only our backend may write. Anyone may read — that asymmetry is the point.
    .setSubmitKey(operatorKey.publicKey)
    .execute(client);
  const receipt = await tx.getReceipt(client);
  topicId = receipt.topicId.toString();
  ok(`created topic ${topicId}`);
  log(`     https://hashscan.io/${NETWORK}/topic/${topicId}`);

  // write it back into .env so the next run reuses it
  if (existsSync(".env")) {
    const env = readFileSync(".env", "utf8");
    writeFileSync(".env", env.includes("HEDERA_TOPIC_ID=")
      ? env.replace(/HEDERA_TOPIC_ID=.*/, `HEDERA_TOPIC_ID=${topicId}`)
      : env.trimEnd() + `\nHEDERA_TOPIC_ID=${topicId}\n`);
    ok("saved HEDERA_TOPIC_ID to .env");
  }
}

// ─── 2. the record ─────────────────────────────────────────────────
step("2", "A compliance record — this NEVER goes on-chain");
const record = {
  v: 1,
  recordId: "cmp_" + Date.now(),
  transferRef: "txr_" + createHash("sha256").update("demo-transfer-1").digest("hex").slice(0, 12),
  provider: "psp_sandbox",
  checkType: "KYC_SENDER",
  outcome: "PASS",
  checkedAt: new Date().toISOString(),
};
log("     " + JSON.stringify(record));
const hash = canonicalHash(record);
ok(`sha256 → ${hash}`);
log("     Note: no name, no IBAN, no amount. Only the hash leaves this machine.");

// ─── 3. anchor ─────────────────────────────────────────────────────
step("3", "Anchoring the hash on HCS");
const payload = {
  v: 1,
  recordId: record.recordId,
  transferRef: record.transferRef,
  recordHash: "sha256:" + hash,
  appTimestamp: record.checkedAt,   // what WE claim
};
const submit = await new TopicMessageSubmitTransaction()
  .setTopicId(topicId)
  .setMessage(JSON.stringify(payload))
  .execute(client);
const rec = await submit.getReceipt(client);
const seq = rec.topicSequenceNumber.toString();
ok(`submitted · sequence #${seq} · tx ${submit.transactionId.toString()}`);
log(`     https://hashscan.io/${NETWORK}/transaction/${submit.transactionId.toString()}`);

// ─── 4. read back from a PUBLIC mirror node ────────────────────────
step("4", "Reading it back from a public Mirror Node");
log("     (a third party could run this — it never touches our server)");
const mirror = `https://${NETWORK}.mirrornode.hedera.com/api/v1/topics/${topicId}/messages/${seq}`;

let onChain = null;
for (let i = 1; i <= 12; i++) {
  const r = await fetch(mirror);
  if (r.ok) { onChain = await r.json(); break; }
  process.stdout.write(`\r     waiting for mirror consensus… ${i * 2}s`);
  await new Promise((s) => setTimeout(s, 2000));
}
log("");
if (!onChain) { bad("mirror node did not return the message — try again in a moment"); process.exit(1); }

const decoded = JSON.parse(Buffer.from(onChain.message, "base64").toString());
ok(`consensus timestamp ${onChain.consensus_timestamp}`);
log(`     anchored hash: ${decoded.recordHash}`);
log(`     ↑ this timestamp came from the network. We could not have set it,`);
log(`       moved it, or backdated it. That is the whole argument.`);

// ─── 5. verify ─────────────────────────────────────────────────────
step("5", "Verify — recompute and compare");
const rehash = "sha256:" + canonicalHash(record);
rehash === decoded.recordHash
  ? ok("\x1b[32mMATCH\x1b[0m — the record is provably the one that was anchored")
  : bad("MISMATCH — unexpected");

// ─── 6. tamper ─────────────────────────────────────────────────────
step("6", "Tamper — the demo's kill shot");
const tampered = { ...record, outcome: "FAIL" };
log("     someone edits the stored record: outcome PASS → FAIL");
const tamperedHash = "sha256:" + canonicalHash(tampered);
log(`     recomputed: ${tamperedHash.slice(0, 24)}…`);
log(`     anchored:   ${decoded.recordHash.slice(0, 24)}…`);
tamperedHash === decoded.recordHash
  ? bad("MATCH — that should be impossible")
  : ok("\x1b[31mMISMATCH\x1b[0m — the edit is detected, and the anchor cannot be edited back");

// ─── done ──────────────────────────────────────────────────────────
log("\n" + "─".repeat(66));
log("\x1b[1m  The rail is real.\x1b[0m");
log(`  Topic     https://hashscan.io/${NETWORK}/topic/${topicId}`);
log(`  Message   #${seq}, consensus ${onChain.consensus_timestamp}`);
log(`  Mirror    ${mirror}`);
log("\n  Open the topic link. That is a real transaction on a public");
log("  network, and anyone can verify it without asking you.");
log("─".repeat(66) + "\n");

client.close();
