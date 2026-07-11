# Infimind — Phase 1 (Homepage + Admin)

A private-education/advisory-firm website for Infimind, built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Router, React Hook Form, and Zod.

**Phase 1 scope only:** the public homepage, a `/signin` placeholder, and a private `/admin` page for managing testimonials and countries/flags. School Program, SAT Program, Our Philosophy, Success Stories, Resources, and About Us are **not built yet** — their nav links and footer links currently resolve to the 404 page by design, so the information architecture won't need to change when those pages are added in a later phase.

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

- `testimonialRepository` — "Voices of Our Families" carousel. Managed from `/admin`.
- `locationRepository` — the world map, story card, and moving city list in "Global Presence". Managed from `/admin`. **Changes made in `/admin` update the homepage map and city list immediately** (same tab, via a custom storage-change event; other open tabs pick it up on their next read).
- `challengeRepository` — the six "Interactive Challenges" tabs. Read-only in Phase 1 (no admin UI yet); edit `src/data/seed/challenges.seed.ts` directly.

Because every repository is exposed through a small interface (`getAll`, `create`, `update`, `remove`, ...), swapping `localStorage` for Supabase/Firebase/a custom API later means rewriting the repository implementations in `src/data/repositories/`, not the components that use them.

**No content is invented.** Only "Weak Fundamentals" has real challenge copy (supplied in the build spec); the other five challenge tabs intentionally render a "content is in progress" placeholder. The testimonials seed data contains only clearly-labelled, unpublished demo records — the public carousel shows nothing until a real testimonial is published from `/admin`. See `CONTENT_GAPS.md` for the full list of what's still missing.

## Replacing placeholder images

Phase 1 ships without third-party photography (see `ASSET_PLACEMENT_AND_SOURCES.md` in `docs/build-pack/` for licensed source pages). Every photo slot falls back to a neutral placeholder showing its expected filename and aspect ratio until the real file exists.

To add a real photo: download/license it, then save it under `public/assets/photos/` using the **exact filename** the component expects:

```
hero-student-study.jpg   (16:10, Hero)
school-program.jpg       (3:2, Programs)
sat-program.jpg          (3:2, Programs)
weak-fundamentals.jpg    (4:3, Challenges panel)
personal-mentor.jpg      (4:3, Student Success Team)
academic-counsellor.jpg  (4:3, Student Success Team)
wellbeing-counsellor.jpg (4:3, Student Success Team)
consultation-lounge.jpg  (16:9, Final CTA)
```

No code changes needed — `src/components/ui/Photo.tsx` picks the file up automatically and falls back to the placeholder if it's missing. Log real photo provenance in `ASSET_CREDITS.md`.

The logo (`public/assets/brand/infimind-logo.jpg`) is the one supplied and approved logo, used as-is in the navbar and footer — it is never redrawn, recolored, or regenerated.

## Design tokens

Colors, type scale, radii, and shadows are defined once in `src/index.css` (both as literal CSS custom properties under `:root`, matching the locked spec exactly, and mapped into Tailwind v4's `@theme` so utilities like `bg-gold`, `text-ink-soft`, `shadow-soft`, and `font-display` are generated from the same source). Change a value in one place; both the raw CSS variables and the Tailwind utilities update together.

Fonts: **Cormorant Garamond** (display/headings) and **Inter** (body/UI), loaded via Google Fonts in `index.html`, with Georgia/system-sans fallbacks.

## Known trade-offs / things to revisit

- The gold accent (`#C78B45`) on white backgrounds — used for the hero's "Extraordinary Thinkers." word and section eyebrows — does not meet WCAG AA contrast for small text. This is a locked design-token value from the spec, not a bug; keep gold text large/bold or paired with sufficient weight, and never as the only color carrying critical small UI text.
- The "Global Presence" connector line arcs from a fixed decorative point on the map (not a real office location) to whichever city is active — this is a visual "network" motif, not a claim about a physical HQ.
- Locations added via `/admin` default to the map's center position (`{x:50, y:50}`) since the admin form (per spec) doesn't include a lat/long picker. A dedicated map-position picker is a good Phase 2 addition.
- The Hero's primary CTA scrolls to the Final CTA section in-page; the Final CTA's own button links to `/signin`, since there's no booking/contact backend yet in Phase 1.
- **Flag emoji render as plain 2-letter codes ("GB", "AE", ...) on Windows**, in both the homepage marquee and the admin Locations table. This is a Windows/Chrome font limitation (no flag glyphs ship in the default emoji font) — real flag pictures render correctly on macOS, iOS, Android, and most Linux desktops with no code change needed. For a Windows-consistent look, use the "upload custom flag image" field in `/admin` → Countries & Flags → the location's form, which overrides the emoji with an uploaded PNG/SVG.

## Phase 2 notes

Not built yet, intentionally: School Program page, SAT Program page, Our Philosophy pages, Success Stories page, Resources (Blog/Guides), About Us, Careers, Contact Us, Privacy Policy, Terms of Service, real `/signin` authentication, a map-position picker in the Locations admin module, and an admin module for editing Challenge content. Routes for all of these already exist in the nav/footer and resolve to the 404 page today — add the page component and route in `src/App.tsx` when ready; no navigation restructuring should be required.
