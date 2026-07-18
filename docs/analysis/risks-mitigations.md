# Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Positioned as a payment institution** | The project is illegal as described | [this section](/legal/why-this-is-legal.md) — never hold funds; say "orchestrator" in every artefact |
| **No testnet key configured** | Everything runs in simulation mode | Configure a real testnet account before any other work |
| Sandbox approval delays | On-ramp blocked | Stripe test mode needs no approval; have a stub fallback |
| Overclaiming coverage or capital efficiency | One caught claim discredits the rest | [this section](/business/business-model.md) and [this section](/legal/why-this-is-legal.md) — the retractions are *in the report* |
| Examiner: "why not Solana?" | Looks unconsidered | [this section](/architecture/settlement-layer.md) — answered with numbers, including where Solana wins |
| Examiner: "why not a database?" | Blockchain looks decorative | [this section](/architecture/overview.md) — mutually distrusting licensed parties |
| Wrong stablecoin | EU leg non-compliant | [this section](/legal/regulatory-landscape.md) — USDC/EURC only |
| Mirror Node lag in the demo | Dead air | Pre-anchored records + recording |
| Working alone or with an uneven team split | Deliverables slip | [this section](/project/roadmap.md); prioritise the highest-risk items first |
| Working alone or with an uneven team split | Deliverables slip | Freeze scope early and prioritise the highest-risk items first |

---
