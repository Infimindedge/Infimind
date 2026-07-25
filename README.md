# Infimind Website

A private-education/advisory-firm website for Infimind, built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Router, React Hook Form, and Zod.

Completed public routes include the homepage, School Programme, Navichi SAT Programme, Philosophy, Blog, About, Contact, and Careers pages. The unfinished Success Stories destination is not exposed in public navigation.

> This project is under active git version control (`git log`) specifically so changes can be reviewed and rolled back. If a change doesn't look right, `git diff HEAD~1` shows exactly what changed, and `git checkout -- <file>` (or asking your assistant to revert) undoes it.

## Getting started

```bash
npm install
cp .env.example .env   # then set the deployed Google Apps Script URL
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
| `VITE_GOOGLE_SHEETS_WEB_APP_URL` | Production Google Apps Script Web App URL used for enquiry delivery. |

### Admin and Sign In

The admin implementation is retained for future development, but `/admin` deliberately fails closed and cannot render protected content in the static launch. `/signin` is a non-authenticating interface that always returns the same generic invalid-credentials response. No password or administrator secret is included in the frontend bundle.

## Content & data model

All homepage content that a non-engineer should be able to change lives behind typed repository interfaces in `src/data/repositories/`, backed by `localStorage` today:

- `testimonialRepository` — "Voices of Our Families" carousel. Managed from `/admin` → Testimonials.
- `locationRepository` — the world map, story card, and moving city list in "Global Presence". Managed from `/admin` → Countries & Flags.
- `challengeRepository` — the "Every Child Has a Different Challenge" tabs. Managed from `/admin` → Challenges — add, edit, reorder, or delete tabs, including their checklist items and photos.
- `enquiryRepository` — legacy local-only scaffolding retained inside the inaccessible admin implementation.

Content changes for launch should be made in source/seed files, reviewed through Git, and deployed from the approved branch.

**No content is invented.** Demo and sample testimonials remain unpublished, and sample location quotes have been removed from the public seed data.

## Consultation enquiries

The consultation modal and Contact form submit to a private Google Sheet through a deployed Google Apps Script Web App. Field validation runs in both the browser and the Apps Script. See `GOOGLE_SHEETS_SETUP.md`; the forms fail visibly instead of showing a false success state when the endpoint is missing or rejects a request.

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
