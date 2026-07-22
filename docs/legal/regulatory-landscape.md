# Regulatory Landscape

*Verified as of mid-2026, this space moves monthly; re-check before
relying on any specific date below.*

| Milestone | Date | Effect |
|---|---|---|
| MiCA transitional regime ended | 1 Jul 2026 | Any provider offering crypto-asset services to EU clients now needs full CASP authorisation |
| EBA No-Action Letter transition ended | 2 Mar 2026 | Transferring e-money tokens (EMTs) on behalf of clients is a **payment service under PSD2** |
| EBA position on custodial wallets | 2026 | A custodial wallet allowing clients to send/receive EMTs is a **payment account** under PSD2 |

## The three post-March-2026 scenarios

After the dual-licensing regime took effect, a firm transacting EMTs
has three options:

1. Obtain its own PI/EMI authorisation on top of a MiCA CASP licence
2. **Partner with an authorised PSP**, the agency model
3. Exit the market

This project is scenario 2, see [Why This Is Legal](why-this-is-legal.md).

## Stablecoin compliance

**USDT is not MiCA-compliant**, delisted from major EU venues, and
Tether has stated no intention to pursue authorisation. **USDC and
EURC (Circle) are the only MiCA-authorised EMTs with meaningful
liquidity.** This is a hard design constraint, not a preference, see
`COMPLIANT_STABLECOIN_CHAINS` in `corridorConfig.mjs`.

## The public-sector context

This problem has been on the G20 agenda since 2020 (the *Roadmap for
Enhancing Cross-border Payments*), with quantitative targets for
end-2027. By the BIS's own assessment, jurisdictional implementation
has been uneven and it's unlikely those targets will be met, which is
the gap a private, non-custodial layer like this one occupies, not a
competition with the public rails (Nexus, Agorá, Mandala) themselves.
