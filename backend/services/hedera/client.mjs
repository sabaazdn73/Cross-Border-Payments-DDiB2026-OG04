// ═══════════════════════════════════════════════════════════════════
//   backend/services/hedera/client.mjs
//   ───────────────────────────────────────────────────────────────
//   Owns exactly one thing: a connected Hedera Client.
//   Everyone else (anchor.mjs, topic.mjs, verify.mjs) imports
//   getClient() from here instead of building their own — so there
//   is one place that knows about .env, one place that parses the
//   key, and one place to change if the operator account ever moves.
//
//   Key type note: our operator key is ECDSA (secp256k1), not the
//   ED25519 most Hedera tutorials assume. fromStringDer() below
//   auto-detects either from the DER prefix, so this works for
//   whichever key type whoever runs this locally has in their .env.
// ═══════════════════════════════════════════════════════════════════

import { Client, PrivateKey, AccountId } from "@hashgraph/sdk";
import "dotenv/config";

let _client = null;

/** Parse a Hedera private key string regardless of whether it is
 *  DER-encoded (starts with "30…") or a raw ED25519 hex string.
 *  Throws a clear error rather than a cryptic SDK one if the value
 *  is missing or malformed. */
export function parsePrivateKey(raw) {
  if (!raw || raw.startsWith("<") || raw.trim() === "") {
    throw new Error(
      "HEDERA_PRIVATE_KEY is missing or still a placeholder. " +
      "Copy the DER-encoded private key from portal.hedera.com into your .env."
    );
  }
  try {
    // Covers both ED25519 DER (302e0201…) and ECDSA/secp256k1 DER (3030…)
    return raw.startsWith("30")
      ? PrivateKey.fromStringDer(raw)
      : PrivateKey.fromStringED25519(raw);
  } catch (e) {
    throw new Error(`Could not parse HEDERA_PRIVATE_KEY: ${e.message}`);
  }
}

/** Returns a singleton, already-connected Hedera Client.
 *  Safe to call from any service — it only builds the client once. */
export function getClient() {
  if (_client) return _client;

  const network = process.env.HEDERA_NETWORK ?? "testnet";
  const accountId = process.env.HEDERA_ACCOUNT_ID;
  if (!accountId) throw new Error("HEDERA_ACCOUNT_ID is missing from .env");

  const key = parsePrivateKey(process.env.HEDERA_PRIVATE_KEY);
  _client = Client.forName(network).setOperator(AccountId.fromString(accountId), key);
  return _client;
}

/** The account paying for and authorising our anchors. Exposed
 *  separately because verify.mjs and docs both need to reference it
 *  without re-parsing the key. */
export function getOperatorAccountId() {
  return process.env.HEDERA_ACCOUNT_ID;
}

export function getNetwork() {
  return process.env.HEDERA_NETWORK ?? "testnet";
}

/** Call once when a script/process is shutting down. Not required
 *  in a long-running server (the API keeps the client open), but
 *  demo scripts should call it so node exits cleanly. */
export function closeClient() {
  if (_client) { _client.close(); _client = null; }
}

