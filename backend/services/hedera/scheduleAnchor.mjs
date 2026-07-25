// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/scheduleAnchor.mjs
//   ───────────────────────────────────────────────────────────────
//   The "completion anchor" — the third and final anchor in a
//   transfer's life (after the initiation anchor: compliance + quote,
//   and the routing anchor: which chain and why). This one is
//   different: it doesn't submit immediately. It uses the Hedera
//   Schedule Service (HSS) to submit a HCS message that only
//   executes once BOTH the source-side and destination-side partner
//   have signed off — i.e. once there is independent, two-party
//   confirmation that the transfer genuinely completed end to end,
//   not just that our own backend believes it did.
//
//   Mechanically:
//     1. createCompletionSchedule() wraps a TopicMessageSubmitTransaction
//        (the "this transfer is fully complete" HCS message) inside a
//        ScheduleCreateTransaction. It sits pending on Hedera.
//     2. signCompletionSchedule() is called once per required signer
//        — here, once with the source partner's key, once with the
//        destination partner's key (see thresholdAccount.mjs for what
//        those keys represent in this demo).
//     3. The moment the second signature lands, Hedera's own
//        consensus executes the wrapped message submission
//        automatically — no code of ours triggers that execution.
//
//   Expiration: HSS allows a scheduled transaction to wait up to 62
//   days (Hedera's documented ledger.scheduled.maxExpirationFutureSeconds
//   ceiling, HIP-423). We set 48 hours here — comfortably inside that
//   ceiling, and long enough to cover the slowest real payout method
//   in payoutMethods (up to a few business days would need a longer
//   window in production; 48h suits the demo's illustrative corridor).
//   If neither signature arrives before expiry, the schedule simply
//   never executes — no silent partial state, no fabricated success.
// ═══════════════════════════════════════════════════════════════════

import {
  ScheduleCreateTransaction,
  ScheduleSignTransaction,
  ScheduleInfoQuery,
  TopicMessageSubmitTransaction,
  Timestamp,
} from "@hashgraph/sdk";
import { getClient, getNetwork } from "./client.mjs";
import { canonicalHash } from "./hashing.mjs";

const COMPLETION_SCHEDULE_EXPIRY_SECONDS = 48 * 60 * 60; // 48 hours — well under HSS's 62-day ceiling

/** Wraps a "transfer complete" HCS message submission in a schedule
 *  that requires both partners' signatures before it executes.
 *  `record` shape: { recordId, transferRef, completedAt, sourcePartner, destinationPartner } */
export async function createCompletionSchedule(topicId, record) {
  if (!record.recordId || !record.transferRef) {
    throw new Error("createCompletionSchedule: recordId and transferRef are required");
  }

  const hash = canonicalHash(record);
  const payload = {
    v: 1,
    kind: "completion",
    recordId: record.recordId,
    transferRef: record.transferRef,
    recordHash: `sha256:${hash}`,
    appTimestamp: new Date().toISOString(),
  };

  const client = getClient();
  const network = getNetwork();

  const innerTx = new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(JSON.stringify(payload));

  const expirationTime = new Date(Date.now() + COMPLETION_SCHEDULE_EXPIRY_SECONDS * 1000);

  const scheduleTx = await new ScheduleCreateTransaction()
    .setScheduledTransaction(innerTx)
    .setScheduleMemo(`completion:${record.transferRef}`)
    .setExpirationTime(Timestamp.fromDate(expirationTime)) // must be a Hedera Timestamp, not a raw JS Date
    .setWaitForExpiry(false) // execute the instant both signatures land, don't wait for expiry
    .execute(client);

  const receipt = await scheduleTx.getReceipt(client);
  const scheduleId = receipt.scheduleId.toString();

  return {
    scheduleId,
    expirationTime: expirationTime.toISOString(),
    hashscanUrl: `https://hashscan.io/${network}/transaction/${scheduleTx.transactionId.toString()}`,
    recordHash: payload.recordHash,
  };
}

/** Submits one required signature against a pending schedule. Called
 *  once per signer (source partner, destination partner) — each is a
 *  genuinely separate ScheduleSignTransaction, signed with a
 *  different key. Returns whether the wrapped transaction has now
 *  executed (i.e. this was the signature that completed the set). */
export async function signCompletionSchedule(scheduleId, signerPrivateKey) {
  const client = getClient();

  const signTx = await new ScheduleSignTransaction()
    .setScheduleId(scheduleId)
    .freezeWith(client)
    .sign(signerPrivateKey);
  const submit = await signTx.execute(client);
  await submit.getReceipt(client);

  const info = await new ScheduleInfoQuery().setScheduleId(scheduleId).execute(client);
  return {
    executed: info.executedAt != null,
    executedAt: info.executedAt ? info.executedAt.toDate().toISOString() : null,
  };
}
