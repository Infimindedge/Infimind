# Infimind — Phase 1 (Homepage + Admin)

A private-education/advisory-firm website for Infimind, built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Router, React Hook Form, and Zod.

**Phase 1 scope only:** the public homepage, a `/signin` placeholder, and a private `/admin` page for managing testimonials, countries/flags, challenges, and consultation enquiries. School Program, SAT Program, Our Philosophy, Success Stories, Resources, and About Us are **not built yet** — their nav links and footer links currently resolve to the 404 page by design, so the information architecture won't need to change when those pages are added in a later phase.

> This project is under active git version control (`git log`) specifically so changes can be reviewed and rolled back. If a change doesn't look right, `git diff HEAD~1` shows exactly what changed, and `git checkout -- <file>` (or asking your assistant to revert) undoes it.

## Getting started

```bash
npm install
cp .env.example .env   # then set VITE_ADMIN_PASSWORD
npm run dev
```

Other scripts:

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint       # ESLint
npm run test       # Vitest (repositories, challenge tabs, admin validation, route smoke tests)
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_ADMIN_PASSWORD` | Password gate for `/admin`. See `.env.example`. |

### ⚠️ Production auth warning

The `/admin` password gate (`src/components/admin/AdminAuthGate.tsx`) is a **client-side, prototype-only** check against a build-time environment variable, stored in `sessionStorage`. It is not real authentication: the password ships inside the JS bundle and anyone with dev tools can bypass it. **Do not deploy this as-is.** Before launch, replace it with real server-side auth (e.g. Supabase Auth, Firebase Auth, or a custom backend with hashed credentials and session cookies).

## Content & data model

All homepage content that a non-engineer should be able to change lives behind typed repository interfaces in `src/data/repositories/`, backed by `localStorage` today:

- `testimonialRepository` — "Voices of Our Families" carousel. Managed from `/admin` → Testimonials.
- `locationRepository` — the world map, story card, and moving city list in "Global Presence". Managed from `/admin` → Countries & Flags.
- `challengeRepository` — the "Every Child Has a Different Challenge" tabs. Managed from `/admin` → Challenges — add, edit, reorder, or delete tabs, including their checklist items and photos.
- `enquiryRepository` — submissions from the "Schedule a Private Consultation" form. Viewed (never edited by families) from `/admin` → Consultation Requests.

**Changes made in `/admin` update the homepage immediately** in the same tab (via a custom storage-change event); other open tabs pick up the change on their next read.

Because every repository is exposed through a small interface (`getAll`, `create`, `update`, `remove`, ...), swapping `localStorage` for Supabase/Firebase/a custom API later means rewriting the repository implementations in `src/data/repositories/`, not the components that use them.

**No content is invented.** Challenge tabs without supplied content render a "content is in progress" placeholder rather than fabricated copy. Two testimonial seed records are unpublished, obviously-labelled demo scaffolding. Four more, and two location story quotes, are **published sample/preview content added at the client's explicit request** so the live carousel and map card designs could be evaluated with real-looking content — every one of them is labelled `Sample preview — replace before launch` in its admin-visible name field. Replace or unpublish these from `/admin` before the site goes live. See `CONTENT_GAPS.md` for the full list.

## Consultation enquiries

Clicking "Schedule a Private Consultation" (Hero or the closing CTA section) opens a modal form (`src/components/consultation/`) asking for name, email, WhatsApp number, country (full list + "Other"), program, and a free-text description of what the family is looking for. On submit it's saved via `enquiryRepository` and the family sees a confirmation that the team will respond within 24 hours.

**These submissions go nowhere else automatically** — Phase 1 has no email/CRM backend. Check `/admin` → Consultation Requests regularly, or wire up a real notification (e.g. an email-on-submit serverless function) before launch so enquiries aren't missed.

## WhatsApp

A floating WhatsApp button appears on every homepage scroll position (bottom-right), opening `https://wa.me/919968240372` with a pre-filled greeting. Update the number in `src/components/ui/WhatsAppButton.tsx` (`WHATSAPP_NUMBER`) if it changes.

## Replacing placeholder images

Real photography is in place for all ten specified slots (see `ASSET_CREDITS.md` for provenance and the "Known trade-offs" note about confirming usage rights):

```
hero-student-study.jpg          (~2:1, Hero — full-bleed section background) — ✅ in place
school-program.jpg              (3:2, Programs) — ✅ in place
sat-program.jpg                 (3:2, Programs) — ✅ in place
weak-fundamentals.jpg           (4:3, Challenges panel — "The Challenge" column) — ✅ in place
weak-fundamentals-outcome.jpg   (4:3, Challenges panel — "Expected Outcome" column) — ✅ in place
personal-mentor.jpg             (4:3, Student Success Team card) — ✅ in place
academic-counsellor.jpg         (4:3, Student Success Team) — ✅ in place
wellbeing-counsellor.jpg        (4:3, Student Success Team) — ✅ in place
consultation-lounge.jpg         (~2.76:1, Final CTA — shown at its exact native ratio, never cropped) — ✅ in place
team-orbit-center.jpg           (3:2, Student Success Team orbit center) — ✅ in place
```

To add/replace a photo: save it under `public/assets/photos/` using the exact filename above — no code changes needed, `src/components/ui/Photo.tsx` picks it up automatically and falls back to a neutral placeholder if missing. Log provenance in `ASSET_CREDITS.md`.

Challenges added from `/admin` (beyond the original six) use uploaded images instead of fixed filenames — the admin form's photo fields accept any image file directly.

The logo (`public/assets/brand/infimind-logo.jpg`) is the one supplied and approved logo, used as-is in the navbar and footer — it is never redrawn, recolored, or regenerated.

## Design tokens

Colors, type scale, radii, and shadows are defined once in `src/index.css` (both as literal CSS custom properties under `:root`, matching the locked spec exactly, and mapped into Tailwind v4's `@theme` so utilities like `bg-gold`, `text-ink-soft`, `shadow-soft`, and `font-display` are generated from the same source). Change a value in one place; both the raw CSS variables and the Tailwind utilities update together.

Fonts: **Cormorant Garamond** (display/headings) and **Inter** (body/UI), loaded via Google Fonts in `index.html`, with Georgia/system-sans fallbacks.

## Known trade-offs / things to revisit

- The gold accent (`#C78B45`) on white backgrounds — used for the hero's "Extraordinary Thinkers." word and section eyebrows — does not meet WCAG AA contrast for small text. This is a locked design-token value from the spec, not a bug; keep gold text large/bold or paired with sufficient weight, and never as the only color carrying critical small UI text.
- The "Global Presence" map (`src/components/home/global-presence/`) renders real continent geography (`worldGeo.ts`, via `d3-geo`/`topojson-client`/`world-atlas`) with a uniform blue dot per active location — no connector line. Every location in `/admin` → Countries & Flags appears immediately, in real time.
- Locations added via `/admin` default to the map's center position (`{x:50, y:50}`) since the admin form (per spec) doesn't include a lat/long picker. A dedicated map-position picker is a good Phase 2 addition.
- **Flag emoji render as plain 2-letter codes ("GB", "AE", ...) on Windows**, in both the homepage marquee and the admin Locations table. This is a Windows/Chrome font limitation (no flag glyphs ship in the default emoji font) — real flag pictures render correctly on macOS, iOS, Android, and most Linux desktops with no code change needed. For a Windows-consistent look, use the "upload custom flag image" field in `/admin` → Countries & Flags → the location's form, which overrides the emoji with an uploaded PNG/SVG.
- The 10 real photos (`ASSET_CREDITS.md`) were supplied by the client rather than the originally-suggested licensed stock sources — confirm usage rights before public launch.
- The Final CTA's navy content column is intentionally short (~230px at desktop) because its width/height are locked to `consultation-lounge.jpg`'s exact native aspect ratio (2.76:1) so the photo is never cropped, per the client's explicit request. Text sizing there is deliberately compact to fit.
- The Challenges panel (`ChallengePanel.tsx`) has a fixed 440px height (matching the tab list's max-height) — any column whose content doesn't fit scrolls internally rather than growing the panel.
- Published sample testimonials and two location story quotes are visible on the live homepage right now (client request, for design preview) — they are clearly labelled in `/admin` as `Sample preview — replace before launch` but read as ordinary testimonials to a public visitor. Replace or unpublish before launch.
- The consultation form and WhatsApp button have no backend beyond `localStorage` — enquiries must be checked manually in `/admin` until a real notification integration exists.

## Phase 2 notes

Not built yet, intentionally: School Program page, SAT Program page, Our Philosophy pages, Success Stories page, Resources (Blog/Guides), About Us, Careers, Contact Us, Privacy Policy, Terms of Service, real `/signin` authentication, a map-position picker in the Locations admin module, real server-side admin auth, and an email/CRM integration for consultation enquiries. Routes for all of these already exist in the nav/footer and resolve to the 404 page today — add the page component and route in `src/App.tsx` when ready; no navigation restructuring should be required.
