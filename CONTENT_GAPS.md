# Content Gaps

Everything below is intentionally left empty, placeholder, or draft — per the build spec's instruction not to invent missing content, statistics, testimonials, or challenge descriptions. Nothing here blocks the app from running; each gap has a graceful, clearly-labelled fallback.

## Photography — resolved

All nine photo slots are supplied by the client and placed in `public/assets/photos/` (2026-07-10 and 2026-07-11 — resized/compressed for web, see `ASSET_CREDITS.md`). Confirm the client holds the rights to use/redistribute these images before public launch — they were not sourced from the licensed stock pages in `docs/build-pack/ASSET_PLACEMENT_AND_SOURCES.md`.

## Interactive Challenges — resolved

All six tabs (Weak Fundamentals, Study Discipline, Lack of Confidence, SAT Strategy, Exam Anxiety, University Planning) have client-supplied copy and both photos (2026-07-12 — see `ASSET_CREDITS.md`). Further edits, or additional challenges beyond these six, can be made from `/admin` → Challenges (add, edit, reorder, delete tabs and their checklist items/photos) — no code changes required.

## Testimonials — demo + sample content

`src/data/seed/testimonials.seed.ts` contains:
- Two **unpublished** demo records with obvious placeholder text (`[Replace with a genuine family quote before publishing.]`) — admin-only scaffolding, never shown publicly.
- Four **published sample records**, added at the client's explicit request so the "Voices of Our Families" carousel could be evaluated with real-looking content instead of an empty state. Each has `displayName: "Sample preview — replace before launch"` visible in the `/admin` Testimonials table, but reads as an ordinary testimonial to a public site visitor. **Replace or unpublish these from `/admin` before public launch.**

## Global Presence — sample story content

Two of the eight seeded locations (London, Singapore) carry a sample `quote`/`attribution`/`storyLabel`, added for the same reason as the sample testimonials above — so the map's story card could be previewed with real-looking content. Both are labelled `storyLabel: "Sample preview — replace before launch"`. The other six locations (Dubai, Toronto, Zurich, Hong Kong, Melbourne, Amsterdam) have no quote and show only flag/city/country, which is the intended default appearance. Edit or clear all of these via `/admin` → Countries & Flags before public launch.

## Navigation targets that don't exist yet

`Programs` (School/SAT), `Our Philosophy`, `Success Stories`, `Resources` (Blog/Guides), `About Us`, `Careers`, `Contact Us`, `Privacy Policy`, and `Terms of Service` are all linked from the navbar and/or footer but have no page built yet — they currently resolve to the 404 page. This is expected for Phase 1; see README "Phase 2 notes".

## Admin — map position picker

New locations created in `/admin` default to the map's center (`{x: 50, y: 50}`) rather than a real geographic position, since the admin form spec doesn't include a lat/long picker. A dedicated picker (or a searchable city list with known coordinates) is recommended for Phase 2.

## Consultation enquiries — no notification backend

Submissions from the "Schedule a Private Consultation" form are stored via `enquiryRepository` (`localStorage`) and viewable at `/admin` → Consultation Requests, but nothing emails or pages anyone when a new one arrives. Someone needs to check that tab regularly until a real notification integration (email, Slack, CRM webhook, ...) is added — see README "Phase 2 notes".
