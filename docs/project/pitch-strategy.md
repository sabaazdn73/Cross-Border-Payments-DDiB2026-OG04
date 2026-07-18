# Pitch Strategy

### 25.1 Thirty seconds
> Sending money abroad still takes days and hides its cost in the FX spread. The fintechs fixed the interface but pre-fund millions in every country. The crypto ramps fixed the settlement but hand the user a wallet. We do neither: the sender pays by card in euro, a licensed partner converts to a compliant stablecoin, it settles on Hedera in seconds, and a licensed local partner credits an ordinary bank account. Neither side ever sees a wallet. And because every licensed party's compliance check is hashed and anchored with a consensus timestamp, *"the checks passed at this moment"* becomes something a regulator can verify independently — instead of a row in someone's database.

### 25.2 The one line
> **The licensed parties move the money. We make the chain provable.**

### 25.3 Questions to be ready for

| Question | Answer |
|---|---|
| **Aren't you an unlicensed payment institution?** | No. We never hold funds or crypto-assets. The licensed parties do. This is the agency model the EBA explicitly set out after March 2026. |
| Why not a database? | The parties are independently licensed and mutually distrusting. A record one of them owns is a record one of them can revise. |
| Why Hedera, not Solana? | Deterministic ~3s finality, fixed USD fees, Stablecoin Studio. Solana leads stablecoin payment volume and would win on finality after Alpenglow — we say so in [this section](/architecture/settlement-layer.md). For a payment leg, knowing *when* it is final beats probably-faster. |
| So you cover every country? | **No.** Coverage is licensing and partners. Blockchain does not open a corridor that has no licensed local partner. |
| Zero capital lock-up? | **No.** The float moves to our payout partner. What we remove is the correspondent chain — one liquidity partner per corridor instead of a nostro network. |
| Where is the token? | Nowhere. Settlement uses USDC/EURC. Issuing our own EMT is legally reserved to EMIs. |
| Isn't this just Bridge/Ramp? | They leave a wallet in the flow, and none of them makes the compliance trail verifiable. That is the gap we occupy. |
| Is it production ready? | No. Sandbox and testnet. [this section](/analysis/innovation-ethics.md) lists what it is not. |

---
