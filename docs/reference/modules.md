# Module Reference

## `backend/services/hedera/`

### `client.mjs`
- `getClient()`, singleton, connected Hedera `Client`. Auto-detects
  ED25519 vs. ECDSA (secp256k1) key format from the DER prefix.
- `getOperatorAccountId()`, `getNetwork()`, `closeClient()`

### `hashing.mjs`
- `canonicalHash(record)`, deterministic SHA-256 over a
  recursively key-sorted JSON representation.
- `pseudoRef(identifier, pepper)`. HMAC-SHA256-based, truncated to
  24 hex characters. Requires a pepper of at least 16 characters
  (`HEDERA_PSEUDO_PEPPER` in `.env`).

### `topic.mjs`
- `getOrCreateTopic({ memo })`, reuses `HEDERA_TOPIC_ID` from `.env`
  if set, otherwise creates a submit-key-protected HCS topic (private
  writes, public reads) and persists the new ID back to `.env`. Holds
  the compliance, quote, and routing anchors.
- `getOrCreateCompletionTopic(submitKeyList, { memo })`, reuses
  `HEDERA_COMPLETION_TOPIC_ID` if set, otherwise creates a dedicated
  second HCS topic whose submit key is the 2-of-2 partner `KeyList`
  rather than the operator key. This is what makes the completion
  schedule genuinely wait for both partner signatures instead of
  auto-executing at creation.
- `topicHashscanUrl(topicId)`

### `thresholdAccount.mjs`
- `getOrCreateThresholdAccount({ usdcTokenId })`, reuses
  `INTERMEDIARY_ACCOUNT_ID` / `INTERMEDIARY_SOURCE_KEY` /
  `INTERMEDIARY_DEST_KEY` from `.env` if set, otherwise creates the
  2-of-2 threshold-key intermediary settlement account and associates
  it with the settlement stablecoin. Returns `{ accountId,
  sourcePartnerKey, destinationPartnerKey }`.

### `scheduleAnchor.mjs`
- `createCompletionSchedule(topicId, record)`, wraps a
  `TopicMessageSubmitTransaction` (the completion message) inside a
  `ScheduleCreateTransaction` on the dedicated completion topic. Sits
  pending until both partner keys sign. Expiry is 48 hours, well
  under HSS's 62-day ceiling (HIP-423).
- `signCompletionSchedule(scheduleId, signerPrivateKey)`, submits one
  required signature. Called once per partner key. Returns whether
  this signature completed the set and triggered execution.

### `anchor.mjs`
- `anchorComplianceRecord(topicId, record)`
- `anchorQuote(topicId, quote)`
- `anchorRoutingDecision(topicId, record)`

All three share one internal mechanism: hash the record, submit a
small pointer message (`{ kind, recordId, transferRef, recordHash,
appTimestamp }`) to HCS, return the sequence number, transaction ID,
and HashScan links.

### `verify.mjs`
- `fetchMirrorMessage(topicId, sequenceNumber, { retries, delayMs })`
, polls a public Mirror Node with backoff (consensus can lag a
  submission by a few seconds).
- `decodeMirrorMessage(mirrorResponse)`
- `verifyRecord(record, anchoredMessage)`, recomputes the hash of
  `record` as it exists now and compares against what was anchored.
  Returns `{ verified: true }` or `{ verified: false, reason }`.

## `backend/services/settlement/`

### `corridorConfig.mjs`
- `PARTNER_CHAIN_SUPPORT`, maintained config of which chains each
  sandbox partner accepts.
- `COMPLIANT_STABLECOIN_CHAINS`, chains with a natively-issued,
  MiCA-compliant EMT (USDC/EURC).
- `HEDERA_SAFE_AMOUNT_USD`, the tunable liquidity-safety threshold.
- `FALLBACK_CHAIN_PRIORITY`, `BRIDGE_METHOD_BY_CHAIN`

### `liquidity.mjs`
- `fetchHederaStablecoinLiquidityUsd({ forceRefresh })`, a real call
  to SaucerSwap's own `/stats` REST endpoint, Hedera's largest DEX
  and a named ecosystem partner rather than a third-party aggregator,
  cached for 15 minutes.
- `RESEARCHED_FALLBACK_TVL_USD`, a conservative, cited fallback
  figure used only if the live call fails.

### `corridorRouter.mjs`
- `chooseSettlementRail(partnerId, amountUsd, { liquidityFetcher })`
, the routing decision. `liquidityFetcher` is injectable, which is
  what makes the branching logic testable without a network call
  (see `__tests__/router.test.mjs`).

### `execute.mjs`
- `executeOnHedera({ amountUsd, destinationAccountId })`, a real HTS
  token transfer on testnet.
- `executeOnUnavailableChain(chain, { amountUsd })`, a clearly-labeled,
  structured non-execution for any chain without funded credentials.
- `executeSettlement(decision, opts)`, the single entry point that
  dispatches between the two.
