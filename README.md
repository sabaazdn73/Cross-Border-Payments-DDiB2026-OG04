# Walletless Cross-Border Settlement

A non-custodial orchestration layer over licensed payment rails, with a
verifiable compliance trail anchored on Hedera.

DDiB 2026 · University of Zurich · Online_Group 04

## What this proves

The licensed parties move the money and perform the checks. We never hold
funds. Our contribution is that each compliance decision is hashed and
anchored with a consensus timestamp — so "the checks passed at this moment"
becomes independently verifiable rather than asserted.

## Live evidence (Hedera testnet)

| | |
|---|---|
| Topic | [0.0.9617780](https://hashscan.io/testnet/topic/0.0.9617780) |
| Message | #1 |
| Consensus timestamp | 1784321571.834087104 |
| Mirror Node | https://testnet.mirrornode.hedera.com/api/v1/topics/0.0.9617780/messages/1 |

Open the Mirror Node link. It returns the anchored hash without touching
our server — that is the point.

## Run it

    npm install
    cp .env.example .env      # add your own testnet credentials
    node step1-hedera.mjs

Six steps: create topic → hash a compliance record → anchor the hash →
read it back from a public Mirror Node → verify MATCH → tamper → MISMATCH.

## What never goes on-chain

Only a SHA-256 hash and a pseudonymous reference. No name, no IBAN,
no amount, no KYC document. The plaintext stays off-chain with the
licensed party.

## Status

Sandbox and testnet. Not a payment institution, not a CASP, not a custodian.

## What the anchored message actually contains

Decoded from the Mirror Node response above:

```json
{
  "v": 1,
  "recordId": "cmp_1784321571353",
  "transferRef": "txr_3eb047d9bd2f",
  "recordHash": "sha256:5bdbcdf5…da9bc14c",
  "appTimestamp": "2026-07-17T20:52:51.353Z"
}
```

No name. No IBAN. No amount. No KYC document. A hash and a pseudonymous
reference — nothing else leaves the machine.

Two timestamps, and the difference is the whole argument:

- `appTimestamp` — what **we** claim. Forgeable.
- `consensus_timestamp` — what the **network** recorded. Not ours to move.

Tamper with the record and the hash breaks. Tamper with `appTimestamp` and
the hash breaks. The consensus timestamp was never ours to begin with.

`payer_account_id` is protocol-level: it identifies the party that submitted
the attestation, not any customer. Senders and recipients hold no Hedera
account at all — that is what walletless means.

`running_hash` chains every message on the topic, so ordering is
tamper-evident too, not just individual records.
