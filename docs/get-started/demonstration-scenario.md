# Demonstration Scenario

**One hero flow, five beats, under two minutes.**

1. **Send.** A plain payment screen. Enter €10, a test card, confirm. **No wallet, no address, no gas.** The PSP sandbox processes it and fires a real webhook.
2. **Settle.** The backend executes a real stablecoin transfer on Hedera testnet. **Open HashScan live** — real transaction, real consensus timestamp.
3. **Anchor.** The compliance record is hashed and submitted to HCS. Show the topic, the sequence number, the timestamp.
4. **Receive.** The payout sandbox returns a success receipt; the UI shows the local-currency credit. **The recipient never saw a blockchain.**
5. **The kill shot — verify, then tamper.** Query the Mirror Node from a separate tab: independent proof that the check passed at that moment, with no access to our system. Then alter the off-chain compliance record and re-verify: **MATCH becomes MISMATCH.** No incumbent in [this section](/business/market-analysis.md) can do this.

**Backup:** pre-anchored records and a screen recording, in case a sandbox or the Mirror Node lags.

---
