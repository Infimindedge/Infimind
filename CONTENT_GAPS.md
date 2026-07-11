# Content Gaps

Everything below is intentionally left empty, placeholder, or draft — per the build spec's instruction not to invent missing content, statistics, testimonials, or challenge descriptions. Nothing here blocks the app from running; each gap has a graceful, clearly-labelled fallback.

## Photography — resolved

All eight expected photos were supplied by the client and placed in `public/assets/photos/` on 2026-07-10 (resized/compressed for web — see `ASSET_CREDITS.md`). No placeholders remain on the homepage. Confirm the client holds the rights to use/redistribute these images before public launch — they were not sourced from the licensed stock pages in `docs/build-pack/ASSET_PLACEMENT_AND_SOURCES.md`.

## Interactive Challenges — 5 of 6 tabs

Only **Weak Fundamentals** has supplied copy (challenge description, approach, outcomes). The other five tabs render an in-progress placeholder instead of a blank or fabricated panel:

- Study Discipline
- Lack of Confidence
- SAT Strategy
- Exam Anxiety
- University Planning

Add real content in `src/data/seed/challenges.seed.ts` (`challengeTitle`, `challengeDescription`, `approach[]`, `outcomes[]`, optional `imageFilename`). No admin UI edits this yet — see README "Phase 2 notes".

## Testimonials

The seed data (`src/data/seed/testimonials.seed.ts`) contains only two clearly-labelled demo records, both **unpublished**, both with placeholder text like `[Replace with a genuine family quote before publishing.]`. The public "Voices of Our Families" carousel therefore shows an empty state ("Family testimonials are coming soon.") until a real testimonial is added and published from `/admin`.

## Global Presence — per-location quotes

The eight seeded locations (London, Dubai, Toronto, Singapore, Zurich, Hong Kong, Melbourne, Amsterdam) have no `quote`, `attribution`, or `storyLabel` — the map's story card shows only the flag, city, and country for each until an admin adds a real family quote via `/admin` → Countries & Flags.

## Navigation targets that don't exist yet

`Programs` (School/SAT), `Our Philosophy`, `Success Stories`, `Resources` (Blog/Guides), `About Us`, `Careers`, `Contact Us`, `Privacy Policy`, and `Terms of Service` are all linked from the navbar and/or footer but have no page built yet — they currently resolve to the 404 page. This is expected for Phase 1; see README "Phase 2 notes".

## Admin — map position picker

New locations created in `/admin` default to the map's center (`{x: 50, y: 50}`) rather than a real geographic position, since the admin form spec doesn't include a lat/long picker. A dedicated picker (or a searchable city list with known coordinates) is recommended for Phase 2.
