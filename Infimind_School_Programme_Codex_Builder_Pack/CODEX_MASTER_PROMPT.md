# CODEX MASTER IMPLEMENTATION PROMPT
## INFIMIND SCHOOL PROGRAMME
### Flagship commercial page — replicate the locked reference while implementing the complete approved content system

You are continuing an existing React website for **Infimind**.

This is the business's flagship and most commercially important programme page. It requires exceptional care, but it is still an additive page inside an existing project—not a redesign of the website.

Read this document completely before editing.

---

# 0. FILES TO READ FIRST

Read in this order:

1. `assets/reference/school-programme-locked-reference.png`
2. `content/school-programme-content.json`
3. `research/infimind-learning-science-source.docx`
4. `assets/incoming/ASSET_MANIFEST.json`
5. The existing repository's homepage, Navichi page, Philosophy page, header, footer, design tokens, data repositories, admin patterns and tests

The PNG is the visual source of truth.

The JSON is the approved public content and claim source of truth.

The DOCX is supporting research context. Use it to understand the science but do not dump its thirty pages onto the public page.

---

# 1. NON-NEGOTIABLE SCOPE PROTECTION

Build only the School Programme page and its page-scoped components/data.

Expected route:

`/school-program`

If the existing project uses `/school-programme`, inspect current links and use the established route without breaking them.

Do not redesign, refactor, restyle, rename, move or rewrite:

- Homepage
- Navichi page
- Philosophy page
- Blog
- Blog article pages
- Admin modules unrelated to this page
- Sign-in
- Privacy Policy
- Terms of Service
- Header
- Footer
- Global typography
- Global colours
- Global spacing
- Existing reusable components
- Existing data models unrelated to this page
- Existing tests
- Existing routing except the minimum additive route registration required

Before coding:

1. Inspect the repository.
2. Create or request a git checkpoint.
3. List every new file you intend to add.
4. List every existing file requiring a minimal additive edit.
5. Explain each edit.
6. Confirm no unrelated page will change.

Do not undertake cleanup, dependency upgrades, architecture changes or global CSS rewrites.

---

# 2. TECHNOLOGY

Use the project's existing stack exactly.

Expected:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Existing state/repository conventions
- Existing test stack

Do not introduce:

- Next.js
- Vue
- Angular
- Bootstrap
- Material UI
- Chakra UI
- jQuery
- external page builders
- iframe embeds
- a second icon library

Use strict TypeScript.

---

# 3. HEADER, FOOTER AND BRAND

- Reuse the exact existing homepage header.
- Reuse the exact existing footer.
- Use the official Infimind logo already used by the website.
- Do not create page-specific top tabs.
- Do not use the Navichi logo.
- Preserve all existing navigation spacing, mobile behaviour and interactions.
- Use the current active-route mechanism only.

This page must feel like the most complete expression of the existing Infimind brand.

---

# 4. LOCKED REFERENCE AND REQUIRED CHANGE

Replicate `school-programme-locked-reference.png` as closely as practical:

- section order
- premium white/navy/gold aesthetic
- typography hierarchy
- spacing
- card proportions
- editorial layout
- programme cards
- subject explorer
- curriculum cards
- science row
- approach and learning-team rows
- dashboard and parent-experience panels
- comparison table
- final navy CTA

## Mandatory correction to the reference

The dark blue sales/statistics box near the programme comparison must not appear.

Replace it with a non-statistical premium panel:

### Designed Around Your Child

`No fixed batch. No generic worksheet path. The subject mix, pace, practice and support evolve around the learner.`

Show four small points:

- Individual subject plan
- Flexible pace
- Targeted practice
- Continuous review

Do not display any numbers in this panel.

---

# 5. CLAIM AND CONTENT GUARDRAILS

Never add or preserve from the visual mockup:

- university logos
- school logos
- partner-institution logos
- Harvard, Stanford, MIT, Oxford, NUS or any other university branding
- university-admission language
- college-placement claims
- scholarship claims
- “top university” claims
- `10,000+ students`
- `95% parent satisfaction`
- `500+ placements`
- `world's best tutors`
- made-up testimonials
- fabricated countries, years, results or percentages
- guaranteed improvement

The School Programme is about school learning from Grades 1–12. Do not turn it into a university-admissions page.

Approved educator positioning:

- Exceptional Subject Educators
- Carefully Selected Educators
- Experienced International-Curriculum Tutors
- Highly Selective Teaching Network
- Expert Subject Specialists

Use only claims present in `school-programme-content.json`.

---

# 6. DESIGN SYSTEM

Inspect and reuse existing Infimind tokens first.

Only if page-scoped fallbacks are needed:

```css
--school-bg: #FCFBF8;
--school-surface: #FFFFFF;
--school-soft: #F6F3ED;
--school-navy: #071A3D;
--school-navy-2: #0C2754;
--school-text: #071A3D;
--school-secondary: #4E5968;
--school-muted: #7A8491;
--school-gold: #C78B45;
--school-gold-dark: #A96D2E;
--school-gold-soft: #F2E5D3;
--school-border: #E7E2DA;
--school-success: #2E7D62;
--school-shadow: 0 12px 36px rgba(7, 26, 61, 0.06);
```

Typography:

- Editorial headings: Cormorant Garamond
- Body/UI: Inter

Suggested scale:

- Hero H1: `clamp(3.4rem, 5.8vw, 6.2rem)`
- Hero accent line: same scale, italic editorial style
- Section H2: `clamp(2.2rem, 3.8vw, 3.8rem)`
- Card H3: `1.25rem–1.6rem`
- Body: `1rem–1.125rem`
- Eyebrow: uppercase, `0.75rem`, tracking `0.14em`

Layout:

- maximum page canvas: 1440px
- content width: 1280px
- desktop padding: 64–72px
- tablet: 40–48px
- mobile: 20–24px
- major spacing: 96–128px desktop
- mobile: 64–84px
- card radius: 14–18px
- subtle borders and shadows only

---

# 7. PAGE CONTENT AND COMPONENT FLOW

All copy and data must come from:

`content/school-programme-content.json`

Do not bury content inside JSX.

## SECTION 1 — HERO

Layout:

- copy left
- real editorial student image right
- same visual balance as locked reference
- warm-white background
- subtle line-art brand motif if already used elsewhere
- no dark overlay

Copy:

- eyebrow
- two-line headline with gold/italic accent
- body
- primary and secondary CTAs
- five proof points

Primary CTA:

Scroll to the programme journey.

Secondary CTA:

Reuse the site's existing consultation action or consultation placeholder. Do not invent a backend.

Expected image:

`public/assets/school-programme/school-programme-hero.jpg`

If absent, render a stable development placeholder with filename visible only in development.

Hero image must be eager/high priority.

## SECTION 2 — YOUR CHILD'S LEARNING JOURNEY

Interactive cards:

- Discover — Grades 1–3
- Explorer — Grades 4–6
- Pathfinder — Grades 7–9
- Scholar — Grades 10–12

Behaviour:

- click/focus changes the active programme
- active card has a restrained gold border and soft tinted surface
- URL query may update as `?stage=discover`
- state persists after refresh
- keyboard accessible
- swipe-friendly on mobile
- no auto-rotation

Selecting a programme updates:

- Subject Explorer grade band
- programme overview
- focus
- outcomes
- relevant image
- comparison highlight

## SECTION 3 — DYNAMIC SUBJECT EXPLORER

This is one of the primary conversion sections.

Left:

Subject tabs based on the active programme.

Center:

- active subject
- grade band
- short programme focus
- Topics Covered
- How We Teach
- Learning Outcomes

Right:

Replace the dark promotional image/stat sales card style with a refined branded statement panel where appropriate. Do not use customer counts.

Required interactions:

- subject tab changes content without leaving page
- grade/programme selector remains visible
- deep link query can use `?stage=explorer&subject=mathematics`
- active subject is keyboard accessible
- smooth content crossfade
- fixed card height should avoid major layout shift
- on mobile use a horizontal subject tab row or accessible select

Use content exactly from JSON.

## SECTION 4 — INTERNATIONAL AND NATIONAL CURRICULUM SUPPORT

Show six text-led cards:

- IB
- Cambridge International
- British Curriculum
- American Curriculum
- CBSE
- ICSE / ISC

Do not use official logos unless the user later provides explicit approved assets and confirms brand-use rights.

Use restrained generic line icons or text monograms instead.

Each card can expand on click/focus to show:

- supported stages
- programme note
- how Infimind adapts to the student's school curriculum

Do not imply official partnership, accreditation or endorsement.

Include a clear line:

`Support is adapted to the student's school curriculum, subject requirements, goals and pace.`

## SECTION 5 — THE SCIENCE BEHIND OUR PROGRAMME

This is not a decorative six-card row only. Build it as a substantial, premium, interactive section comparable in depth to the Navichi methodology section.

Heading:

`The Science Behind Our Programme`

Core statement and scientific disclaimer come from JSON.

Introduce:

### The REALISE™ Framework

- Retrieve
- Explain
- Apply
- Link
- Inspect
- Space
- Evolve

Visual behaviour:

- horizontal seven-step framework desktop
- vertical connected timeline mobile
- click/focus reveals the relevant learning-principle explanation
- no continuous animation

Below, provide an interactive principle explorer for all twelve approved methods:

1. Retrieval Practice
2. Spaced Practice
3. Successive Relearning
4. Interleaved Practice
5. Self-Explanation
6. Elaborative Questioning
7. Generation
8. Worked Examples and Fading
9. Dual Coding
10. Formative Feedback
11. Metacognitive Calibration
12. Mastery-Oriented Goals

Each principle panel must show:

- what it means
- how Infimind applies it
- concise practical example

Do not state that Infimind owns the underlying scientific techniques.

Do not present exaggerated numerical study findings on the public page.

Include the approved disclaimer discreetly at the end.

## SECTION 6 — OUR APPROACH

Dark navy full-width band matching the reference.

Five steps:

- Understand
- Plan
- Learn
- Practise
- Reflect

Requirements:

- line icons
- fine connectors
- progressive reveal once
- mobile vertical
- all text from JSON

## SECTION 7 — MEET YOUR LEARNING TEAM

Five roles:

- Personal Mentor
- Subject Specialists
- Academic Counsellor
- Wellbeing Support
- Parent Partnership

Make the student the conceptual centre.

Desktop interaction:

- clicking/focusing a role changes a compact description panel
- no fake staff profiles
- no fabricated qualifications

Emphasise individual attention and carefully selected educators without unsupported superlatives.

## SECTION 8 — BEYOND ACADEMICS

Interactive bento/grid covering:

- Critical Thinking
- Communication
- Public Speaking
- Study Habits
- Digital Literacy
- Creativity
- Leadership
- Collaboration
- Research Skills
- Time Management
- Emotional Resilience
- Financial Literacy

Keep descriptions concise.

Optional image:

`public/assets/school-programme/subject-explorer.jpg`

## SECTION 9 — WEEKLY LEARNING CYCLE

Use a flexible learning cycle, not a literal guaranteed weekday service schedule.

Do not claim every activity always occurs on a specific weekday.

Preferred labels:

- Diagnose
- Learn
- Practise
- Review
- Reflect
- Adapt

Show that the cycle repeats based on each learner's needs.

If the visual reference uses weekday labels, replace them with the above learning-cycle labels.

## SECTION 10 — ASSESSMENT PHILOSOPHY

Heading:

`Assessment That Supports Learning`

Use the approved assessment list.

Key concept:

`Growth Over Grades`

Do not imply grades are irrelevant. Explain that grades are measured alongside:

- retention
- reasoning
- error recovery
- confidence
- strategy
- independence

No fake charts or percentages.

## SECTION 11 — STUDENT LEARNING DASHBOARD

Create a polished React UI mockup in the existing navy/gold/cream language unless the user supplies `school-dashboard.png`.

Show conceptual, clearly labelled demonstration widgets such as:

- Current Goals
- Concept Progress
- Revision Consistency
- Feedback Applied
- Learning Habits
- Upcoming Reviews

Do not show invented student percentages, test scores or claims.

If sample data is necessary for visual illustration, label the entire dashboard prominently:

`Illustrative dashboard preview`

Prefer qualitative states:

- Developing
- Secure
- Review Due
- On Track

rather than invented numeric performance.

## SECTION 12 — PARENT EXPERIENCE

Show the approved parent-experience points.

Use a refined phone/report UI preview only if it can be built without fabricated metrics.

Potential UI:

- Latest Learning Update
- Current Focus
- Strength Observed
- Next Step
- Review Date

No made-up student identity required.

## SECTION 13 — PROGRAMME COMPARISON

Interactive/responsive comparison covering:

- Discover
- Explorer
- Pathfinder
- Scholar

Rows:

- Grades
- Primary focus
- Subject breadth
- Learning approach
- Mentoring
- Assessment style
- Outcomes

Desktop:

- sticky first column
- highlighted active programme
- horizontal overflow on tablet if required

Mobile:

- programme dropdown + comparison cards
- do not squeeze a four-column table into 375px

## SECTION 14 — DESIGNED AROUND YOUR CHILD

This is the replacement for the reference's blue sales/stat box.

Dark or cream premium panel, depending on visual balance.

No numbers.

Use exact approved text:

`No fixed batch. No generic worksheet path. The subject mix, pace, practice and support evolve around the learner.`

Points:

- Individual subject plan
- Flexible pace
- Targeted practice
- Continuous review

## SECTION 15 — FAQ

Add a concise FAQ accordion with questions that can be safely answered from approved content:

1. Which grades does the School Programme support?
2. Which subjects are available?
3. Which curricula can Infimind support?
4. Is the programme personalised?
5. How are educators selected?
6. How does the REALISE™ Framework work?
7. How is progress reviewed?
8. How are parents kept informed?
9. Can the subject mix change?
10. Is this a group or one-to-one programme?

Where delivery model details are not confirmed, use:

`The exact programme structure is agreed after understanding the student's curriculum, subjects, goals and support needs.`

Do not invent pricing, schedules, tutor availability or guaranteed class format.

## SECTION 16 — FINAL CTA

Dark navy band.

Headline, body and button from JSON.

Reuse existing consultation behaviour.

Do not add statistics below the CTA.

Then reuse the existing Infimind footer unchanged.

---

# 8. ASSETS

Read `assets/incoming/ASSET_MANIFEST.json`.

Expected destinations:

`public/assets/school-programme/`

Do not rename user-supplied assets.

Until supplied:

- use stable placeholders
- show filenames only in development
- preserve aspect ratios
- avoid layout shift
- never hotlink random stock photos
- do not use the locked page mockup as a production image

Real photography requirements:

- editorial, natural light
- internationally relevant students
- balanced genders/ethnicities across the page
- no uniforms or visible third-party school branding
- no university branding
- no exaggerated stock poses
- no AI-generated production imagery without approval

---

# 9. ADMIN AND CONTENT MANAGEMENT

Do not build a full new CMS unless the existing project already has a programme-content admin pattern.

For this phase:

- keep all page content in a typed data module
- design types so later admin integration is straightforward
- do not expose page editing in admin unless explicitly requested
- do not modify existing admin features

Suggested typed modules:

- programme bands
- subjects
- curricula
- science principles
- approach
- learning team
- beyond academics
- assessment
- FAQs

---

# 10. COMPONENT ARCHITECTURE

Suggested:

```txt
src/
  pages/
    SchoolProgrammePage.tsx
  components/
    school-programme/
      SchoolProgrammeHero.tsx
      ProgrammeJourney.tsx
      SubjectExplorer.tsx
      CurriculumSupport.tsx
      RealiseFramework.tsx
      LearningScienceExplorer.tsx
      SchoolProgrammeApproach.tsx
      LearningTeam.tsx
      BeyondAcademics.tsx
      LearningCycle.tsx
      AssessmentPhilosophy.tsx
      SchoolDashboardPreview.tsx
      ParentExperience.tsx
      ProgrammeComparison.tsx
      PersonalisationPanel.tsx
      SchoolProgrammeFaq.tsx
      SchoolProgrammeCta.tsx
  data/
    schoolProgramme.ts
  types/
    schoolProgramme.ts
```

Adapt to repository conventions.

Do not put the whole page into one JSX file.

---

# 11. MOTION

Use existing Framer Motion patterns only.

Defaults:

- duration: 0.45–0.75 seconds
- easing: `[0.22, 1, 0.36, 1]`
- reveal distance: 12–18px
- stagger: 60–90ms
- hover lift: max 3px
- hover scale: max 1.01

Do not use:

- bouncing
- floating loops
- marquees
- rotating icons
- particles
- cursor trails
- text scrambling
- autoplay video
- excessive parallax

Respect reduced motion.

---

# 12. RESPONSIVE REQUIREMENTS

Test:

- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px+

Requirements:

- hero stacks cleanly
- programme journey is horizontally scrollable or stacked
- subject tabs remain accessible
- subject content does not jump excessively
- curriculum cards become 1–2 columns
- REALISE becomes vertical on mobile
- twelve science principles remain usable
- comparison becomes mobile cards
- no page-level horizontal overflow
- minimum 44px touch targets
- images remain crop safe

---

# 13. ACCESSIBILITY

Target WCAG 2.2 AA:

- one H1
- semantic landmarks and sections
- logical headings
- visible focus
- proper labels
- keyboard tabs
- `aria-selected` / tab roles where appropriate
- accessible accordion
- sufficient contrast
- alt text
- decorative icons hidden
- reduced-motion support
- no meaning through colour alone

---

# 14. SEO

Title:

`Personalised School Programme for Grades 1–12 | Infimind`

Description:

`Explore Infimind's personalised School Programme for Grades 1–12, combining exceptional subject educators, international-curriculum support, learning science, continuous mentoring and individual academic pathways.`

Add:

- canonical placeholder
- Open Graph metadata
- social-image placeholder
- Service structured data using confirmed information only
- breadcrumbs:
  - Infimind
  - School Programme

Do not add ratings, prices, reviews, awards or result claims.

---

# 15. TESTS

Add page-specific tests without changing existing tests.

Minimum:

1. Route renders.
2. Existing header/footer remain present.
3. Programme journey switches stages.
4. URL query persists active stage.
5. Subject explorer changes subjects.
6. Curriculum cards expand accessibly.
7. REALISE framework is keyboard accessible.
8. Science explorer renders all twelve principles.
9. No banned claims or statistics render.
10. Replacement personalisation panel renders.
11. FAQ works.
12. Mobile comparison is usable.
13. Missing assets use placeholders.
14. Reduced-motion behaviour works.
15. All existing tests remain green.

Run:

```bash
npm run build
npm run lint
npm run test
```

Do not finish with failures.

---

# 16. FINAL QA

Before completion:

- Compare side-by-side with locked reference.
- Confirm overall layout closely matches.
- Confirm the blue sales/statistics box is removed.
- Confirm `Designed Around Your Child` replaces it.
- Confirm no university discussion appears.
- Confirm no logos of institutions appear.
- Confirm no fake statistics or testimonials appear.
- Confirm all four programmes and age-appropriate subjects are represented.
- Confirm science content is substantial and rooted in the supplied research.
- Confirm the page uses the existing header/footer.
- Confirm no other page changed visually or functionally.
- Confirm build, lint and tests pass.
- Provide an exact changed-file summary.
- List outstanding user-supplied image assets.

---

# 17. DEFINITION OF DONE

Complete only when:

1. The flagship School Programme page closely replicates the locked design.
2. It contains a comprehensive dynamic programme and subject system for Grades 1–12.
3. It includes the REALISE™ Framework and interactive learning-science content.
4. It focuses on school education, not university admissions.
5. It uses credible educator language and no unsupported claims.
6. The unverified blue sales/stat box has been replaced.
7. No unrelated page or global design has been changed.
8. It is responsive, accessible, tested and production-ready.
