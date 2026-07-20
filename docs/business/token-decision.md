# Token vs. No Token

This project has no native token. That is a deliberate design decision, not an oversight, and it deserves the same scrutiny as any other architectural choice: what would a token actually add, and what would it cost.

## What a token would have to do to be worth having

A token only earns its complexity if it does something the design cannot already do without it. Checking each plausible justification against what this project actually needs:

| Possible justification | Does this project need it? |
|---|---|
| **Medium of exchange** (users pay/receive in the token) | No. The entire product thesis is that neither sender nor recipient ever touches crypto. Introducing a token here would directly contradict [the walletless promise](../get-started/objectives.md). |
| **Governance** (token holders vote on protocol decisions) | No. There is no decentralized protocol to govern; routing and compliance decisions are operational, made by the orchestrating entity, not a token-holder vote. |
| **Fee/utility token** (pay network fees in it) | No. Hedera's fees are already fixed and USD-denominated; a wrapper token adds a conversion step and a new source of user confusion for zero functional gain. |
| **Fundraising instrument** (raise capital via token sale) | This is the only real motivation a token would serve here, and it is precisely the one that creates the most legal exposure (see below). |
| **Loyalty/rewards mechanism** | Achievable without a token (a points system, a fee-discount tier) at a fraction of the regulatory surface area. |

**Every legitimate function a token could serve is already served by an existing, simpler mechanism.** The one function only a token uniquely provides (fundraising) is also the one with the worst cost-benefit ratio here, addressed next.

## What a token would cost

**Regulatory exposure, concretely:**

- Under MiCA, issuing a token to the public makes this project an **offeror**, triggering a whitepaper requirement, capital requirements, and ongoing disclosure obligations that don't exist for a pure orchestration service. See [Regulatory Landscape](../legal/regulatory-landscape.md).
- Depending on the token's structure and how it's marketed, it risks classification under **MiFID II** as a financial instrument, an entirely different, heavier regulatory regime than anything this project currently needs to comply with.
- A token held by the project itself (rather than immediately distributed) raises the **custody question** this design otherwise avoids entirely. See [Why This Is Legal](../legal/why-this-is-legal.md), which depends structurally on never holding client assets.

**Operational cost:**

- A token needs a market (liquidity, price discovery, an exchange listing or AMM pool) to be usable for anything, none of which is this project's competency and all of which is ongoing overhead.
- Token price volatility becomes a distraction from the actual product metric (successful transfers), and a governance/community-management surface area that has nothing to do with settling payments.

## The honest comparison

| | With a token | Without (current design) |
|---|---|---|
| Regulatory scope | MiCA offeror obligations, possible MiFID II exposure | Orchestration service, no securities/token-offering regime triggered |
| What it would fund | Speculative fundraising | Revenue comes from FX spread + flat fee + compliance API, see [Business Model](business-model.md) |
| User-facing complexity | A new asset users must acquire, hold, or understand | Zero. Sender pays fiat, recipient receives fiat |
| Differentiates from competitors | Marginally, and in a crowded, skeptical category | The differentiation is the verifiable compliance trail, not a token |

**The decision, stated plainly:** every function a token could add either already exists in a simpler form, or actively undermines the walletless, non-custodial design this project depends on structurally. Adding one would be optimizing for a fundraising narrative at the cost of the actual product thesis.
