# Asset Credits

## Logo

`public/assets/brand/infimind-logo.jpg` — supplied directly by Infimind and used as the approved logo, unmodified, in the navbar and footer.

## Photography

All eight photos were supplied directly by the client (`home page pictures (2).zip`, 2026-07-10) rather than sourced from the suggested stock pages in `docs/build-pack/ASSET_PLACEMENT_AND_SOURCES.md`. Originals were resized (max 2000px on the long edge) and re-compressed (JPEG quality 78, EXIF metadata stripped) for web performance before being placed in `public/assets/photos/` — no cropping, retouching, or content changes were made.

| Filename | Source | License | Date added |
|---|---|---|---|
| hero-student-study.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| school-program.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| sat-program.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| weak-fundamentals.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| personal-mentor.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| academic-counsellor.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| wellbeing-counsellor.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| consultation-lounge.jpg | Supplied by client | Client-owned/licensed — verify before public launch | 2026-07-10 |
| weak-fundamentals-outcome.jpg | — not yet supplied — | — | — |

The original free-stock source pages in `docs/build-pack/ASSET_PLACEMENT_AND_SOURCES.md` are no longer needed for the eight supplied files but remain as a fallback reference if any photo needs replacing. `weak-fundamentals-outcome.jpg` is a new slot (see CONTENT_GAPS.md) with no source assigned yet.

## Icons

UI icons are from [Lucide](https://lucide.dev) (ISC license), used via the `lucide-react` package — no separate attribution required per their license, noted here for completeness.

The WhatsApp button (`src/components/ui/WhatsAppButton.tsx`) uses a hand-coded inline SVG of the standard WhatsApp glyph, used to identify the WhatsApp contact channel (nominative/functional use, not a claim of affiliation with WhatsApp/Meta).

## Fonts

- **Cormorant Garamond** — Google Fonts, SIL Open Font License.
- **Inter** — Google Fonts, SIL Open Font License.

## World map

The "Global Presence" map renders real continent geography from [`world-atlas`](https://github.com/topojson/world-atlas) (`land-110m.json`, ISC license — pre-built TopoJSON derived from [Natural Earth](https://www.naturalearthdata.com/) public-domain data), converted to an SVG path at build time with [`d3-geo`](https://github.com/d3/d3-geo) (ISC) and [`topojson-client`](https://github.com/topojson/topojson-client) (BSD-3-Clause). See `src/components/home/global-presence/worldGeo.ts`. An earlier hand-coded dot-grid approximation was replaced with this for geographic accuracy.
