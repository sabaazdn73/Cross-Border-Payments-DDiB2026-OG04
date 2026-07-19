# Partner Coverage by Corridor

Matched against the platform's actual supported currency list
(`frontend/src/data/countries.js`) rather than generic examples.

## Where BVNK is strong

BVNK holds 130+ countries on the payments side (150+ for virtual
accounts), MiCA CASP authorisation (Malta FSA, Feb 2026, passported
EEA-wide), UK EMI, and US MSB/MTL coverage. Strong fit for: **USD,
GBP, EUR, AED, SGD**.

{% hint style="success" %}
Mastercard announced its acquisition of BVNK in March 2026 for up to
$1.8B — larger than Stripe's 2024 Bridge acquisition, and further
validation that card networks are moving to own stablecoin
infrastructure rather than treat it as a threat.
{% endhint %}

## Where BVNK's own material shows gaps — and named alternatives

| Region | Currencies on this platform | BVNK's own positioning | Alternative to name |
|---|---|---|---|
| Latin America | MXN, BRL, COP, ARS | "Weaker than AstroPay or PayRetailers" for local methods (PIX, OXXO, Boleto); routes through **Bitso** for USDC liquidity | **Bitso** (BVNK's own LatAm liquidity partner), or **AstroPay** / **PayRetailers** for deeper local-method coverage |
| South & Southeast Asia | INR, PHP, PKR, BDT, IDR | "Partner-driven" — only Singapore has a native license; Thailand/Vietnam are case studies, not licensed coverage | Corridor-specific partner needed per market; not yet identified for INR/PHP specifically |

## Africa — not yet confirmed either way

NGN, GHS, KES, UGX, TZS, ETB, EGP, MAD are all on this platform's
currency list. No source reviewed here confirms or denies BVNK depth
in these corridors specifically. **Do not assume coverage** — this
needs its own targeted check before being stated as fact, consistent
with this project's standard of not claiming a corridor is served
without a named, checked partner.

## The honest summary

| Confidence | Corridors |
|---|---|
| Named partner (BVNK), reasonably strong fit | USD, GBP, EUR, AED, SGD |
| Named alternative identified (Bitso / AstroPay / PayRetailers) | MXN, BRL, COP, ARS |
| Gap acknowledged, no alternative named yet | INR, PHP, PKR, BDT, IDR |
| Unconfirmed either way | NGN, GHS, KES, UGX, TZS, ETB, EGP, MAD |

This table should be updated as each remaining corridor is actually
checked — not filled in with an assumed partner to make the list look
complete.
