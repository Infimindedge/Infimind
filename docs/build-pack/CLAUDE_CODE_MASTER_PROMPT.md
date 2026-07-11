# MASTER BUILD PROMPT — INFIMIND HOMEPAGE + ADMIN V1

You are a senior React engineer, product designer, motion designer, and accessibility-focused frontend architect with 20+ years of experience.

Build Phase 1 of the Infimind website:
1. Public homepage
2. Private admin page for managing parent testimonials and countries/cities with flags

Do not build the remaining pages yet. Structure the project so School Program, SAT Program, Philosophy, Success Stories, Resources, About, Sign In, and future admin modules can be added later without redesigning the application.

## SOURCE OF TRUTH
Use `/assets/reference/homepage-locked-reference.png` as the visual source of truth. Match its composition, spacing, hierarchy, proportions, restrained luxury, section order, and visual rhythm as closely as practical in a responsive website.

Use `/assets/brand/infimind-logo.jpg` as the only approved logo in the navbar and footer. Do not redraw, recolor, reinterpret, or regenerate it.

Key constraints:
- Calm, organic, mostly white aesthetic.
- Premium private-education/advisory-firm feel, not generic EdTech.
- No AI-generated visuals or cartoon illustrations.
- No fake statistics or fake testimonials.
- No faculty section.
- Do not mention Grades 6–12.
- Do not use the phrase academic coaching.
- Only School Program and SAT Program in Phase 1.
- Top-right action must be Sign In, not Schedule a Consultation.
- Build only homepage and admin now.

## TECH STACK
Use React 18+, TypeScript, Vite, React Router, Tailwind CSS or CSS Modules consistently, Framer Motion, Lucide React, React Hook Form, Zod, and localStorage/local JSON behind repository/service interfaces so persistence can later move to Supabase, Firebase, or a custom API.

Routes:
- `/` homepage
- `/admin` private admin
- `/signin` simple placeholder
- unknown routes: 404

You may edit the user’s local repository directly after inspecting it. Preserve useful configuration. Do not delete unrelated files without explaining why.

## DESIGN TOKENS
Use these exact values:

```css
:root {
  --bg-main: #FCFBF8;
  --bg-pure: #FFFFFF;
  --bg-soft: #F6F3ED;
  --bg-navy: #071A3D;
  --text-primary: #071A3D;
  --text-secondary: #4E5968;
  --text-muted: #7A8491;
  --text-on-dark: #FFFFFF;
  --accent-gold: #C78B45;
  --accent-gold-dark: #A96D2E;
  --accent-gold-soft: #F2E5D3;
  --accent-blue: #2878FF;
  --accent-blue-soft: #EAF2FF;
  --border-light: #E7E2DA;
  --border-medium: #D7D0C5;
  --success: #2E7D62;
  --error: #B54747;
  --warning: #B7791F;
  --shadow-soft: 0 12px 36px rgba(7, 26, 61, 0.06);
  --shadow-hover: 0 18px 48px rgba(7, 26, 61, 0.10);
}
```

Typography:
- Headings/display: Cormorant Garamond 500/600
- Body/UI: Inter 400/500/600
- Fallbacks: Georgia/Times for display and system sans for body
- Hero H1: clamp(52px, 5.6vw, 84px), line-height .96
- Section H2: clamp(36px, 3.4vw, 52px), line-height 1.05
- Card H3: 25–30px
- Body large: 18px/1.7
- Body: 16px/1.65
- Small labels: 12px uppercase, letter-spacing .12em

Layout:
- max width 1440px
- standard content width 1280px
- side padding 24 mobile, 48 tablet, 72 desktop
- section spacing 96–128 desktop, 64–80 mobile
- card radius 14px
- large container radius 18px
- button radius 6px
- 1px light borders
- large whitespace
- minimal shadows

## NAVIGATION
Sticky navbar. Left: logo. Centre: Programs dropdown (School Program, SAT Program), Our Philosophy, Success Stories, Resources dropdown placeholder, About Us. Right: Sign In button in navy.

After 40px scroll, reduce navbar height slightly, add subtle border and translucent warm-white backdrop blur. Dropdowns must support click, keyboard, Escape, outside click. Mobile menu below 1024px. Respect reduced motion.

## HOMEPAGE

### 1. HERO
Eyebrow: `PRIVATE LEARNING PROGRAMS`
Headline: `Where Exceptional Students Become Extraordinary Thinkers.`
Only `Extraordinary Thinkers.` is gold.
Body: `Infimind partners with ambitious families to build strong academic foundations, cultivate intellectual confidence, and prepare students for success in school and beyond.`
Primary CTA: `Schedule a Private Consultation`
Secondary CTA: `Explore Programs`
Image: real licensed editorial photo `hero-student-study.jpg`, natural daylight, premium home/library, authentic concentration, no one staring at camera.
Motion: one-time staggered fade-up; subtle image scale-in; pointer-only parallax max 8px; no looping.

### 2. GLOBAL PRESENCE
Heading: `Supporting Families Across the World's Leading Education Destinations`
Body: `Our students call these cities home.`
Use inline/open-source SVG world map.
Countries/cities must move in a seamless horizontal marquee, 36–45 seconds per loop, pause on hover/focus, touch-scrollable, static scrollable in reduced-motion.
One map location activates every 4.5 seconds with soft blue rings and a curved connection line. Corresponding story card crossfades and moves vertically 10px. Manual arrows reset timer.
Initial cities: London, Dubai, Toronto, Singapore, Zurich, Hong Kong, Melbourne, Amsterdam. No invented counts. Data comes from admin.

### 3. PROGRAMS
Heading: `Programs Designed Around Every Stage of Growth`
Body: `Tailored learning experiences designed to meet students where they are—and help them achieve where they aspire to be.`
Only two equal large cards:
- School Program — `Build strong academic foundations, confidence and consistency.` — image `school-program.jpg`
- SAT Program — `Strategic preparation for ambitious students aiming for the world's leading universities.` — image `sat-program.jpg`
No grade ranges. Hover: image max scale 1.035, arrow/title shift 4px, gold-soft border. Stack on mobile.

### 4. INTERACTIVE CHALLENGES
Heading line 1: `Every Child Has a Different Challenge.`
Heading line 2: `We Build a Different Solution.`
Build as accessible tabs, not static cards.
Tabs:
- Weak Fundamentals
- Study Discipline
- Lack of Confidence
- SAT Strategy
- Exam Anxiety
- University Planning

For each, same on-page panel with Challenge, Our Approach, Expected Outcome, optional image.
Only Weak Fundamentals has supplied content:
Challenge description: `The student memorises but doesn't truly understand concepts, leading to gaps and low confidence.`
Approach: Personal Learning Plan; One-to-one Mentor Support; Concept Reinforcement; Practice & Feedback; Parent Progress Updates.
Outcomes: Stronger conceptual clarity; Improved grades; Confidence in problem solving; Consistent academic growth.
Leave all other content empty/draft. Do not invent copy.
Interaction: click/keyboard selection, navy active state, crossfade + 12px horizontal slide, stable panel height, ARIA tab semantics, arrow-key navigation, no auto-rotation.

### 5. STUDENT SUCCESS TEAM
Heading: `Behind Every Student Is an Entire Team.`
Body: `Every learner at Infimind is supported by specialists who work together to ensure academic progress, personal growth, and long-term success.`
Three cards with real photos:
- Personal Academic Mentor (`personal-mentor.jpg`): Weekly accountability and study planning; Progress reviews and parent communication; Motivation, consistency and habit building.
- Academic Counsellor (`academic-counsellor.jpg`): Subject selection and learning strategy; Goal setting and milestone planning; School and university pathway guidance.
- Health & Wellbeing Counsellor (`wellbeing-counsellor.jpg`): Exam stress and anxiety management; Healthy study routines; Emotional wellbeing and resilience.
Reveal once on scroll with 14px upward movement and 100ms stagger. Hover: subtle gold border, 3px lift.

### 6. VOICES OF OUR FAMILIES
Heading: `Voices of Our Families`
Admin-powered carousel. Desktop 3 cards, tablet 2, mobile 1. Each card: optional parent photo, quote, display name/privacy-safe label, city/country, program, optional future video URL.
Autoplay every 7 seconds only when appropriate. Pause on hover, focus, touch and hidden tab. Arrows, dots, swipe/drag. Infinite only with 4+ published records. Reduced motion disables autoplay. Seed only unpublished demo records. Never fake testimonials.

### 7. LEARNING JOURNEY
Heading: `The Infimind Learning Journey`
Body: `A proven process. A personal experience. A path to success.`
Steps:
1 Private Consultation — `We understand your child's goals, strengths and challenges.`
2 Student Assessment — `In-depth diagnostic assessment to identify gaps and opportunities.`
3 Personal Learning Blueprint — `A customised plan designed for your child's unique needs.`
4 Weekly Learning Sessions — `Focused learning with mentors, practice and feedback.`
5 Mentorship & Progress Reviews — `Regular reviews to track progress and adjust the plan.`
6 Growth & Achievement — `Stronger academics, confidence and long-term success.`
Draw a thin gold line on scroll once. Vertical timeline on mobile.

### 8. FINAL CTA
Headline: `Every Great Future Begins With the Right Guidance.`
Body: `Whether your child is striving for stronger school performance or preparing for the world's leading universities, every journey begins with understanding their unique potential.`
Button: `Schedule a Private Consultation`
Photo: `consultation-lounge.jpg`
No newsletter field here.

### 9. FOOTER
Use logo. Copy: `A premium learning partner for ambitious students and supportive families worldwide.`
Columns: Programs (School Program, SAT Program); Our Philosophy (Our Approach, Our Values); Resources (Blog, Guides); Company (About Us, Careers, Contact Us). Bottom: Privacy Policy, Terms of Service, current year.

## ADMIN V1
Route `/admin`. Keep simple, private, warm-white, functional, responsive. Use environment variable `VITE_ADMIN_PASSWORD`; never hardcode. State clearly this is prototype-only auth.

### Testimonials module
List: Draft/Published, parent display name, city, country, program, quote preview, thumbnail, edit, delete confirmation, publish toggle.
Form: display name, privacy-safe label, city, country, program (School/SAT), quote, image upload preview, optional video URL, sort order, published.
Validation: quote/city/country/program required.

### Countries and flags module
List: country, city/display location, flag preview, ISO code, active, sort order, edit/delete.
Form: country, city/display label, ISO two-letter code, flag by emoji/library or uploaded SVG/PNG, active, sort order, optional program, optional short family quote, optional parent attribution.
Changes must update the world map card and moving country list immediately.

Use typed models for Testimonial, LocationItem, ChallengeItem. Keep content separate from layout.

## REAL PHOTOGRAPHY
Expected filenames:
- hero-student-study.jpg
- school-program.jpg
- sat-program.jpg
- weak-fundamentals.jpg
- personal-mentor.jpg
- academic-counsellor.jpg
- wellbeing-counsellor.jpg
- consultation-lounge.jpg

Do not hotlink. If missing, show an elegant neutral placeholder with filename and ratio. Never use AI substitutes.

## ACCESSIBILITY, RESPONSIVENESS, PERFORMANCE
Target WCAG 2.2 AA. Semantic headings, skip link, visible focus, contrast, keyboard support, reduced motion, labelled forms, accessible dialogs, no autoplay media. Test 375, 768, 1024, 1280, 1440+. No horizontal overflow. Minimum 44px touch targets.

Target Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 90+. Use route splitting, image dimensions, lazy loading below fold, eager hero, minimal dependencies, strict TypeScript, ESLint, error boundary, empty/loading states, no console errors.

SEO title: `Infimind | Private Learning Programs for Ambitious Students`
Description: `Infimind partners with ambitious families through personalised school and SAT learning programs, mentorship and structured student support.`
Add Open Graph, Twitter cards, canonical placeholder, organisation schema with placeholders only. Do not invent addresses, awards or accreditations.

## DELIVERABLES
- Working React homepage
- Working `/admin` Phase 1
- Working `/signin` placeholder
- Responsive implementation
- Local editable data
- README: setup, dev/build commands, env variables, image replacement, production-auth warning, Phase 2 notes
- `CONTENT_GAPS.md`
- `ASSET_CREDITS.md`
- Basic tests for repository, challenge tabs, admin validation and smoke flows

Before finishing, compare side-by-side with `homepage-locked-reference.png`. Correct spacing, proportions, colours, typography and order. Verify Sign In is top-right, no Grades 6–12, only two programs, no faculty, no AI imagery, and no fake content.
