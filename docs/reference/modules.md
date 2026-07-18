# Module Reference

## `backend/services/hedera/`

### `client.mjs`
- `getClient()` — singleton, connected Hedera `Client`. Auto-detects
  ED25519 vs. ECDSA (secp256k1) key format from the DER prefix.
- `getOperatorAccountId()`, `getNetwork()`, `closeClient()`

### `hashing.mjs`
- `canonicalHash(record)` — deterministic SHA-256 over a
  recursively key-sorted JSON representation.
- `pseudoRef(identifier, pepper)` — HMAC-SHA256-based, truncated to
  24 hex characters. Requires a pepper of at least 16 characters
  (`HEDERA_PSEUDO_PEPPER` in `.env`).

### `topic.mjs`
- `getOrCreateTopic({ memo })` — reuses `HEDERA_TOPIC_ID` from `.env`
  if set, otherwise creates a submit-key-protected HCS topic (private
  writes, public reads) and persists the new ID back to `.env`.
- `topicHashscanUrl(topicId)`

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
  — polls a public Mirror Node with backoff (consensus can lag a
  submission by a few seconds).
- `decodeMirrorMessage(mirrorResponse)`
- `verifyRecord(record, anchoredMessage)` — recomputes the hash of
  `record` as it exists now and compares against what was anchored.
  Returns `{ verified: true }` or `{ verified: false, reason }`.

## `backend/services/settlement/`

### `corridorConfig.mjs`
- `PARTNER_CHAIN_SUPPORT` — maintained config of which chains each
  sandbox partner accepts.
- `COMPLIANT_STABLECOIN_CHAINS` — chains with a natively-issued,
  MiCA-compliant EMT (USDC/EURC).
- `HEDERA_SAFE_AMOUNT_USD` — the tunable liquidity-safety threshold.
- `FALLBACK_CHAIN_PRIORITY`, `BRIDGE_METHOD_BY_CHAIN`

### `liquidity.mjs`
- `fetchHederaStablecoinLiquidityUsd({ forceRefresh })` — a real
  DeFiLlama API call (SaucerSwap TVL, ≈ two-thirds of Hedera's total
  DeFi liquidity per Messari), cached for 15 minutes.
- `RESEARCHED_FALLBACK_TVL_USD` — a conservative, cited fallback
  figure used only if the live call fails.

### `corridorRouter.mjs`
- `chooseSettlementRail(partnerId, amountUsd, { liquidityFetcher })`
  — the routing decision. `liquidityFetcher` is injectable, which is
  what makes the branching logic testable without a network call
  (see `__tests__/router.test.mjs`).

### `execute.mjs`
- `executeOnHedera({ amountUsd, destinationAccountId })` — a real HTS
  token transfer on testnet.
- `executeOnUnavailableChain(chain, { amountUsd })` — an honest,
  structured non-execution for any chain without funded credentials.
- `executeSettlement(decision, opts)` — the single entry point that
  dispatches between the two.

