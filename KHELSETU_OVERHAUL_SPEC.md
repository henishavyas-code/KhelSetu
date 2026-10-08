# KHELSETU — MASTER OVERHAUL SPEC
### From a static template site to a national-grade, AI-native sports talent platform

> **For the AI coding agent reading this:** This file is your full brief. Read all of it before you write any code. It covers what the product is, what is wrong with the current repo (with file paths), the target experience, the design system, every screen, the AI engine, the data model and a phased build plan with acceptance checks. When this spec and your instincts disagree, follow the spec. When the spec says nothing, pick the option that makes the product **more truthful, more legible and more like a real government-grade system**. Never pick the option that just looks flashier.

---

## 0. Agent Operating Rules (read first)

1. **Work phase by phase** (Section 12). Finish each phase, run `npm run build` and `npm run lint`, fix all errors, then move on. Report a short summary of what changed after each phase.
2. **Never fake intelligence.** If a number appears on screen, it was either **computed** from real input (camera landmarks, user entry, stored data) or it sits in a component marked with the `<DemoTag />` badge ("DEMO DATA"). Hard-coded "98.4% ACCURACY", "10K+ athletes" or a fixed result of 16 reps / score 84 must never ship unlabeled.
3. **Single source of truth.** The finished codebase has **one** language (TypeScript, `strict: true`), **one** design system, **one** page per route and **no** orphaned files.
4. **Migrate, don't destroy.** Several valuable pieces live in legacy, unrouted files (listed in §2.3). Port their logic into the new structure **before** you delete them.
5. **Mobile first, low-end Android first.** The real user is a 14-year-old in Kheda or Kalahandi on a ₹8,000 Android phone with patchy 3G. Every screen must work at 360×740 and must not jank on a mid-range device. Desktop is where SAI officials work, and their console must be dense and keyboard-friendly.
6. **Accessibility and bilingual support are part of every phase**, not a final polish step.
7. **Respect `prefers-reduced-motion`** everywhere. Immersive is not the same as nauseating.
8. Commit after every phase with a clear message, e.g. `phase-2: design system + app shell`.

---

## 1. What KhelSetu Is (the core idea, distilled)

**KhelSetu** ("Khel" = sport, "Setu" = bridge) is an AI-powered, mobile-first platform that **democratizes sports talent assessment in India**. It is built for **Smart India Hackathon problem statement SIH25073: "AI-Powered Mobile Platform for Democratizing Sports Talent Assessment"** (Theme: Fitness & Sports; stakeholder: Sports Authority of India / Ministry of Youth Affairs & Sports).

**The thesis:** *Talent is everywhere. Opportunity isn't.* Today a child in a remote district gets noticed only if they reach a recognised tournament where a Talent Identification & Development Committee (TIDC) scout happens to be watching. KhelSetu turns **any smartphone into a certified field-testing lab**:

```
 ATHLETE (anywhere)            KHELSETU (on-device AI)              SAI / TIDC (national)
 ─────────────────            ──────────────────────              ─────────────────────
 Record standardized   ──▶    Pose estimation, rep/jump/   ──▶    Verified records, percentile
 fitness tests on a           time measurement, cheat             benchmarks, talent heatmaps,
 phone, even offline          signals, tamper-evident             shortlists, trial invitations
                              evidence, offline queue
```

### 1.1 The official context to design around
A SAI/NeGD concept note (v2.0, 7 April 2026, "Battery Fitness Assessment" app, under the *Unified Digital Sports Ecosystem* project) describes almost exactly what KhelSetu should be. Align with it closely, because the jury will recognise it:

**The 10-test SAI Battery:**
| # | Test | Component | Notes from SAI note |
|---|------|-----------|---------------------|
| 1 | Height | Anthropometry | target accuracy ±1 cm |
| 2 | Weight → BMI | Body composition | age/gender-appropriate BMI bands |
| 3 | Sit & Reach | Flexibility | |
| 4 | Standing Vertical Jump | Power | jump detection ±2 cm |
| 5 | Standing Broad Jump | Power | |
| 6 | Medicine Ball Throw (backward overhead) | Upper-body power | 1 kg under 12; 2 kg boys over 12; best of two |
| 7 | 30 m Standing Start | Speed | |
| 8 | 4×10 m Shuttle Run | Agility | shuttle touch detection ≥95% |
| 9 | Sit-Ups | Core strength/endurance | 30 s or 45 s by age group; ≥95% count accuracy |
| 10 | Endurance Run | Aerobic | 800 m under 12; 1.6 km age 12 and over; GPS timing ±1 s |

**Requirements the SAI note sets, which KhelSetu must visibly honour:**
- Must run fully **offline** with later cloud sync. Stores **≥500 athlete sessions** locally, loses nothing on a crash, **syncs within 30 s** of reconnecting and **exports the PDF report offline**.
- **Evidence rules:** one continuous, unedited video per test. The video opens with a spoken announcement of name, test and date. A digitally signed declaration of authenticity from athlete and coach. **Geo-tag and timestamp** on every record. Minimum 720p. Mandatory metadata. Audit trail, **human-in-the-loop** validation and **bias detection**.
- **Report card** within 10 s: scores, **percentile rank**, benchmark comparison, **performance bands: Emerging / Promising / High Potential**.
- **Two journeys:** (a) **self-administered** by the athlete, (b) **coach-led field assessment** at schools, Akhadas, STCs and NCOEs.
- **Test order:** speed and power first, then agility, then strength, then endurance, with rest intervals and a mandatory warm-up.
- **Identity:** APAAR ID (preferred for students), Aadhaar e-KYC or NSRS ID. An NSRS ID is issued only after the full battery is complete.
- **Dashboards:** district rankings, talent heatmaps and density clusters, sport-suitability patterns, gender/age comparisons, year-on-year growth curves, plateau detection.
- **Languages:** Hindi and English at minimum. Must be readable in direct sunlight and low light.

> In the prototype, all government integrations (APAAR / Aadhaar / NSRS / Khelo India portal) are **mocked behind a clean adapter interface** and labelled "Integration stub". Their *flow* is still designed properly, so the jury can see exactly where the real integration slots in.

### 1.2 Who uses it
| Persona | Context | Core job |
|---|---|---|
| **Athlete (10–18)**, e.g. *Sunita, 14, Kalahandi, Odisha* | Cheap Android, intermittent network, Hindi/Odia first | "Show me what I'm capable of, and get me seen." |
| **Parent/Guardian** | Gives consent for minors | "Is this safe, and who sees my child's data?" |
| **Coach / PE teacher (field mode)** | Tests 40 kids in a school ground in one morning, often offline | "Run the battery fast and accurately for a whole roster." |
| **SAI Official / TIDC Reviewer** | Desktop, office | "Trust the data, catch cheating, find talent, take action." |
| **Scout / Academy** | Desktop/tablet | "Find high-potential athletes by sport suitability and region." |
| **SIH Jury** | 5–7 minute demo | "Is this real, is it feasible, does it scale, is it well-crafted?" |

---

## 2. Honest Audit of the Current Repo (why it "sucks")

Stack today: React 19 + Vite 8 + Tailwind v4 + react-router 7 + recharts + lucide + `@mediapipe/tasks-vision`. Entry: `src/main.jsx` → `src/App.jsx` → `src/App.tsx`.

### 2.1 The product's core promise is faked on the routes people actually visit
- `src/components/assessment/CameraAssessmentView.tsx` (used on `/app/dashboard` and `/app/assessments`) draws a **skeleton at fixed hard-coded coordinates** (`w*0.42, h*0.38`, …) no matter what the camera sees. **No pose detection runs.**
- Reps only go up when the user clicks the **"+ Log Rep"** button (`incrementRepManual`).
- `src/hooks/useAssessment.ts → processFrameData` makes a random angle and a random form score (`82 + Math.random()*12`).
- `src/pages/AthleteAssessmentRunnerPage.tsx` shows a **hard-coded result** every time: 16 reps, form 88, overall 84.
- `src/services/ai/poseDetectionService.ts → detectFrame` returns `keypoints: []`.
- `src/services/ai/scoringService.ts` invents sub-scores from the form score (`consistency = form - 4`, `speed = form - 6`) and hard-codes `bestRepScore: 9.4`.
- `RepStateMachine.getAverageFormAccuracy()` returns **90 when there is no data**.
- `src/pages/Home.tsx` shows unlabeled vanity stats ("10K+ Grassroots Athletes", "50K+ AI Assessments", "98.4% ACCURACY") and fake pillar percentages (`80 + i*2`).
- `src/data/mockSubmissions.js` uses `videoHash: "e3b0c442…b855"`. That is the **SHA-256 of an empty file**. Any technical juror who knows it will stop trusting the whole demo.

### 2.2 The real engine exists but no route reaches it
- `src/components/assessment/CameraAssessment.jsx` **does** load MediaPipe `PoseLandmarker` and feeds `src/utils/RepStateMachine.js` (with smoothing, calibration, velocity, cooldown). Only the unrouted `src/pages/Assessment.jsx` uses it.
- `RepStateMachine` handles only Push-Ups, Squats and Jumping Jacks. **Sit-ups (an official SAI test) fall through to push-up logic** via `normalizeExerciseName`.
- MediaPipe WASM loads from `…tasks-vision@latest/wasm` while the npm package version is pinned. A future release can break this silently. The model loads from Google Storage, so **nothing works offline**.

### 2.3 Orphaned features: the institutional half of the product has no routes
No route or import reaches these 32 files:
```
pages/official/{Dashboard,Submissions,AuditDetail,ReviewQueue,Analytics}.jsx   ← the whole SAI console
pages/{CoachDashboard,Platform,Leaderboard,AthleteAssessmentResult,Assessment,
       AthleteHome,AthleteHistory,AthleteProfile,AthleteRegister,About,Login,
       LoginAthlete,LoginOfficial,Register,ForgotPassword,ExploreAssessments,
       HowItWorksPage,ResourcesPage}.jsx
components/layout/{Navbar,Footer,SyncBar,Cursor}.jsx                          ← offline sync bar
components/maps/IndiaMapSVG.jsx                                                ← talent map
services/ai/poseDetectionService.ts, services/{athleteService,performanceService}.ts
types/index.ts (never imported, so types are effectively unused)
```
**Worth porting:** the AuditDetail concept (telemetry scrubber + decision actions), the ReviewQueue concept, the SyncBar offline concept, `RepStateMachine` + `angleUtils`, `PoseSkeleton` (SVG skeleton animation), the `mockSubmissions` structure (device, GPS, telemetry timeline, risk) and the IndiaMap idea (re-implemented with real geography).

### 2.4 Three design languages are fighting each other
- `implementation_plan.md` specifies **dark obsidian + lime + saffron**, editorial and biometric.
- Legacy `pages/Home.jsx` is **navy gradient + orange**, styled like a government portal.
- The live site (`index.css`, `Home.tsx`, layouts) is **generic light SaaS emerald**: rounded white cards, `Badge` pills, a 4-step card row, an icon-in-a-square grid. It looks like a thousand template landing pages.
- `index.html` sets `body` to dark (`bg-[#07090E] text-slate-100`) and `index.css` overrides it to light. Several athlete pages (`AthleteHistoryPage`, `AthletePerformancePage`, `AthleteProfilePage`, `AthleteSettingsPage`, `AthleteAssessmentRunnerPage` with `text-white` on its H1) still carry dark-theme classes on light backgrounds, so some **text is invisible**.
- Everything is ALL-CAPS, font-black, and every section uses the same `max-w-7xl` card grid. There is no rhythm, no focal point and no story.

### 2.5 Engineering debt
- Mixed `.jsx`/`.tsx` and duplicate pages (`About.jsx` & `AboutPage.tsx`, `Login.jsx` & `LoginPage.tsx`, `Home.jsx` & `Home.tsx`, …). There is **no `tsconfig.json`**, so the TypeScript files are never type-checked.
- `src/App.css` is leftover Vite template CSS. `README.md` is the unchanged Vite template.
- `animate-in fade-in slide-in-from-top` classes are used in 12 places, but `tailwindcss-animate` isn't installed, so **none of them animate**. `animate-bounce-short` is undefined.
- **33 hot-linked Unsplash images** (mostly non-Indian stock athletes) break offline, add layout shift and undercut the "grassroots India" story. The Kabaddi card reuses the hero photo.
- `authService.getCurrentUser()` **auto-logs everyone in** as "Aarav Patel". There are no roles, no route guards and no official login.
- **Accessibility:** only 2 `aria-*`/`role` attributes in the whole app. Clickable `div`s, no focus states on cards, no skip link.
- **i18n:** none. **PWA/offline:** none. **Tests:** none. **Error boundaries:** none. **Code splitting:** none.
- Font loaded with `@import url(...)` inside CSS, which blocks rendering. Three display families are loaded but barely used.

**Bottom line:** The current site *describes* a national AI talent system. The rebuild must *be* one: something a juror can pick up, do 10 sit-ups in front of, and watch the counting happen live, then flip to the SAI console and see that same attempt arrive, audited and ranked.

---

## 3. The North Star Experience

> **"Do ten sit-ups in front of the laptop. Watch the skeleton lock onto you, the counter tick in time with your body, and a percentile appear. Then switch to the SAI console and see your attempt land on the map of India, verified, hash-chained, and ranked in your district."**

Every design and engineering decision serves this 90-second loop:
1. **Land** → a cinematic, truthful hero that *uses the real AI live* (optional camera, with a recorded fallback).
2. **Test** → a guided, voice-coached, real-time assessment with setup checks.
3. **Reveal** → a scoreboard-style KhelScore reveal with percentile and band, then an explainable breakdown.
4. **Prove** → evidence locker: video hash, landmarks, geo/time, signed declaration, offline queue.
5. **Discover** → the SAI command centre: map, review workbench, talent shortlist.

### 3.1 Experience principles
1. **Truth is the aesthetic.** Showing confidence, model version, "simulated" labels and limitations openly makes it feel *more* institutional, not less.
2. **One question per screen** (WHOOP principle). The athlete home answers "What should I do next?" The audit screen answers "Is this attempt genuine?"
3. **The body is the interface.** The pose skeleton is the brand's visual signature: in the logo, the loaders, the empty states and the hero.
4. **Arena vs Ledger.** Athlete and public surfaces are a **floodlit arena** (dark, kinetic, emotional). The SAI console is a **ledger** (light, calm, dense, printable, auditable). Same tokens, two moods. This duality *is* the "bridge".
5. **Earn every animation.** Motion explains state changes (rep counted, record synced, decision logged) or tells the story on scroll. It is never decoration for its own sake.
6. **Bharat-first.** Hindi on equal footing, Indian athletes and places, real district names, low-bandwidth paths, sunlight-readable contrast.

---

## 4. Inspiration Board (what to steal from whom)

| Reference | Take this | Apply to |
|---|---|---|
| **WHOOP** | One hero score (0–100) with oversized numerals; strict semantic colour (green/yellow/red only means status); dark surfaces; 3-tier progressive disclosure (overview → trend → deep dive) | Athlete home, KhelScore, results |
| **Apple Fitness / Activity rings** | The satisfying "ring closes" moment; haptic-like micro-celebrations | Score reveal, daily streak, battery completion |
| **Strava** | Local leaderboards ("segments"), clubs, social proof by place | District / school leaderboards, challenges |
| **Nike / Adidas campaign sites** | Editorial athletic typography, extreme scale contrast, kinetic type | Public landing hero and story sections |
| **Hudl / Catapult / Kinexon** (pro sports analytics) | Video + telemetry **scrubbed in sync**; event markers on a timeline | SAI Audit Workbench |
| **F1 live timing / TV graphics** | Live telemetry HUD: tabular mono numerals, deltas, sector colours | Live assessment HUD |
| **Opta Analyst** (Future of Media Awards 2025, Specialist Website of the Year) | Radar charts, explainable advanced stats, data storytelling | Sport-suitability radar, analytics |
| **Paris 2024 pictogram system** | A coherent, ownable pictogram family | One pictogram per SAI test |
| **Linear / Vercel / Stripe dashboards** | ⌘K command palette, keyboard-first, crisp tables, quiet chrome, skeleton loaders | SAI console |
| **Our World in Data / The Pudding** | Explorable explanations; "how we compute this" made visual | `/transparency` page on how scoring works |
| **UX4G (Government of India design system) + GIGW 3.0** | Institutional credibility: WCAG 2.1 AA, base-4 spacing, plain-language bilingual content, a gov-style header strip | Official console, footer, legal pages |

**Do NOT imitate:** generic SaaS card grids, glassmorphism everywhere, neon cyberpunk, purple-gradient "AI" clichés, stock photos of Western gyms, or confetti on every click.

---

## 5. Design System: "NEEL / HALDI" (Indigo night × Turmeric signal)

> **Why this direction (and what it deliberately avoids):** AI-generated sites in 2025–26 cluster around two looks: *near-black + acid-lime accent* and *warm cream + terracotta + serif*. KhelSetu must look like neither. Its palette and type come from **Indian sport's own material world**: the deep **indigo/"India blue"** of national jerseys and night-lit stadium skies, **haldi (turmeric) yellow** used on Indian broadcast graphics and kabaddi mats, **kesari (saffron)** of the national flag and Khelo India identity, and the **chalk-white lines** of a school ground. Type comes from an **Indian foundry (Ek Type)** that designed one family across ten Indian scripts.

### 5.1 Concept
A district stadium under floodlights at dusk. The sky has gone deep indigo, the lines on the ground are chalk-white, and a turmeric-yellow broadcast graphic tracks the athlete. **Haldi yellow means one thing only: "the AI is seeing and measuring."** **Kesari saffron is the human, the athlete, the action.** The SAI console flips to **Ledger** mode (cool paper-white with indigo ink). Same tokens, calmer mood: the institution's side of the bridge.

### 5.2 Colour tokens (Tailwind v4 `@theme` in `src/styles/tokens.css`)
```css
@theme {
  /* NEEL: indigo night surfaces (Arena) — deliberately blue-black, never neutral #0B0B0B */
  --color-neel-950: #070B1F;   /* page / deepest sky */
  --color-neel-900: #0C1230;   /* raised */
  --color-neel-800: #131B44;   /* panel */
  --color-neel-700: #1C2759;   /* hover / input */
  --color-neel-500: #2E3F8F;   /* India-blue mid: charts, selected states */
  --color-line:        rgb(214 222 255 / 0.10);
  --color-line-strong: rgb(214 222 255 / 0.20);

  /* CHALK: cool chalk-line whites (text on indigo) — not warm cream */
  --color-chalk:   #EEF1FA;
  --color-chalk-2: #AEB6D6;
  --color-chalk-3: #7881A8;    /* meta only, ≥14px, verify contrast */

  /* Semantic accents — ONE meaning each */
  --color-haldi:   #FFC53D;   /* AI live / tracking / measuring. Never decorative. */
  --color-kesari:  #FF6B2C;   /* athlete, energy, primary CTA */
  --color-hara:    #1FC27A;   /* verified / valid rep / synced (India-green family) */
  --color-sindoor: #F0384F;   /* invalid / high risk / destructive */
  --color-amber:   #F5A524;   /* needs review / medium risk */
  --color-akash:   #6FB6FF;   /* neutral data series, sky blue */

  /* LEDGER (official console, light) */
  --color-patra:    #F4F6FB;  /* page — cool paper */
  --color-patra-2:  #FFFFFF;
  --color-syahi:    #121735;  /* indigo ink text */
  --color-rekha:    #DDE2EF;  /* rules */

  /* SAI performance bands */
  --color-band-emerging:  #6FB6FF;
  --color-band-promising: #FF6B2C;
  --color-band-high:      #FFC53D;
}
```
Rules:
- `haldi` appears **only** on live AI state: skeleton bones, tracking ring, "measuring" indicator, joint-angle arcs. Because it's rare, it means something.
- Primary CTA is `kesari` with `neel-950` text (check contrast; use `chalk` text if the CTA sits on dark). **Only one kesari CTA per viewport.**
- Status colours are never used decoratively. No gradient washes for decoration. The only gradients allowed are **light** (floodlight bloom from the top edge of the hero, a 3D scene's fog).
- Every text pair meets **WCAG 2.1 AA**. **Sunlight mode** = `patra` background, `syahi` text, weights +100, haldi swapped for a darker `#B07A00` for contrast.
- Themes via `data-theme="arena" | "ledger" | "sunlight"` on `<html>`, mapped to semantic aliases (`--bg`, `--fg`, `--muted`, `--border`, `--accent`, `--live`).

### 5.3 Typography: one Indian superfamily, used expressively
- **Primary: `Anek`** by Ek Type (OFL, Google Fonts / `@fontsource-variable/anek-latin`, `anek-devanagari`, `anek-odia`, `anek-bangla`, `anek-tamil`, `anek-telugu`, `anek-gujarati`, `anek-kannada`, `anek-malayalam`, `anek-gurmukhi`). It's variable in **weight and width**, and the **same design voice covers Latin and nine Indian scripts**. A Hindi or Odia athlete sees the *same* brand, not a fallback font. Read the exact axis ranges from the installed package and expose them as tokens.
  - **Display:** Anek at *narrow width + heavy weight* (scoreboard energy) for huge headlines and numerals; *wide width + semibold* for short section titles.
  - **UI/body:** Anek at normal width, 400/500/600, with 1.5 line-height. Devanagari gets line-height +0.1 and a size +1 step (matras need room).
- **Numerals for live telemetry:** `JetBrains Mono` (or `Geist Mono`), `tabular-nums`, used **only for changing numbers** (timer, reps, angles, hashes). Labels stay in Anek. Mono is not used as a decorative "techy" label style.
- **Kinetic type tied to the body (signature).** During a live test, the rep counter's **width axis follows the athlete's joint angle**: it compresses as they go down and stretches back as they come up, then snaps to its resting width with a pop when a rep counts. The same technique on the landing hero: the headline "breathes" in width with the demo skeleton's movement. This is the one typographic trick that belongs to KhelSetu and nobody else.
- **Bilingual layering.** Hero and section openers can set a **massive Devanagari word** (e.g. **प्रतिभा**, "talent") as a tone-on-tone texture (`neel-800` on `neel-950`, about 40vw) behind the English headline. It's cultural, not decorative, and it signals Hindi as a first-class language.
- Scale (fluid `clamp`): `display-2xl 72→168px`, `display-xl 56→120`, `display-l 40→72`, `h1 32→48`, `h2 24→32`, `h3 20→24`, `body 16–17`, `small 14`, `micro 12`. **Sentence case everywhere.** No tracked-out ALL-CAPS eyebrows above headings. Uppercase is allowed only inside the scoreboard component.
- Line length ≤ 70 characters for body text. Self-host all fonts (offline) with `font-display: swap`, and preload only the Latin + Devanagari display weights used above the fold.

### 5.4 Grid, spacing, shape
- Base-4 spacing (UX4G-aligned). Sections use 96/128/160px vertical rhythm on desktop and 64/80 on mobile.
- 12-col grid, 1440 max, 24px gutters. **Break the grid deliberately** in the public story (full-bleed, overlapping numerals).
- Radius by role, not one radius everywhere: `4px` data cells and chips, `12px` controls, `24px` media frames and 3D viewports, `999px` only for live-status pills. **Not everything is a card.** Group with whitespace and alignment first, rules second, containers last.
- **Lane motif:** thin chalk lines with lane numbers mark the **10 battery tests only**. They are a real sequence (SAI order: speed/power → agility → strength → endurance). Don't number things that aren't sequential.

### 5.5 Iconography & brand marks
- `lucide-react` for UI icons, at 1.5px stroke throughout. No arrow glyphs appended to every link or button label.
- **Custom pictograms** for the 10 SAI tests (SVG, built from the same 33-landmark stick figure, Paris-2024-style coherence) in `src/assets/pictograms/`.
- **Logo:** wordmark `KHELSETU` in Anek (wide width, semibold) with a "bridge" arc built from connected pose-joint nodes. Replace the green "K" square.
- **Loader:** a skeleton that does one rep. **Empty states:** the skeleton in a waiting pose with a short line of copy.

### 5.6 Motion system
Libraries: `motion` (Framer Motion, for React component state), `gsap` + `ScrollTrigger` + `SplitText` (all free since the Webflow acquisition) for scroll storytelling, and `lenis` for smooth scroll (disabled under reduced motion and inside app/console routes).\n\n**Restraint rule:** one orchestrated moment per screen. No fade-and-slide-up on every section and no hover lift on every card. Those are the most recognisable generic-template tells. Motion either answers a user action or carries the scroll story.

| Token | Value | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | Entrances, reveals |
| `--ease-snap` | `cubic-bezier(0.2,0.9,0.1,1.2)` | Rep tick, counter pop |
| `--dur-1/2/3/4` | 120/240/480/900ms | Micro / UI / panel / cinematic |

Signature motions:
1. **Rep tick:** the counter digit flips like a split-flap board, its width snaps back (see §5.3), the skeleton flashes `hara` for 120ms, a short tone plays, and the phone vibrates on mobile (`navigator.vibrate(15)`).
2. **Score reveal:** a scoreboard roll from 00 to the final number (tabular mono), a ring that closes, then the band label stamps in.
3. **Sync:** queued records fly as small dots along a "bridge" arc into a cloud node, and the counter decrements.
4. **Audit decision:** the row collapses into the log, and a new hash-chain link appears with a tick.
5. **Scroll story:** text split-reveals line by line, plus pinned sections (see §6.1).

All motion is off or instant under `prefers-reduced-motion: reduce`.

### 5.7 Imagery
- **Remove all Unsplash hotlinks.** Imagery is (a) the **pose-skeleton art system** (generated from real landmark data), (b) duotone (neel + kesari) photos of **Indian grassroots sport** (kabaddi in mud, school tracks, akhadas) stored locally in `public/media/`, compressed to AVIF/WebP with explicit dimensions, and (c) abstract topography of India.
- If no rights-cleared Indian photography is available, **use the skeleton/data art only**. That's better than generic stock.

---

## 5A. Immersive Design Playbook (3D, motion, composition: the "stun" layer)

> This section exists so you don't fall back to generic output. Every effect below is **tied to something true about KhelSetu**: the body, the bridge, India's geography, evidence. If you can't explain how an effect relates to the product, cut it. **Spend boldness in one place per screen**, and keep everything around it quiet.

### 5A.1 3D stack, tiers and budgets
- **Stack:** `three`, `@react-three/fiber`, `@react-three/drei` (`Instances`, `Line`, `Text`, `PerformanceMonitor`, `AdaptiveDpr`, `Bvh`, `useGLTF`, `MeshTransmissionMaterial` sparingly), `@react-three/postprocessing` (Bloom, Noise, Vignette, SMAA, all at low strength), `maath` (damping/easing), `d3-geo` + `d3-hexbin` for geography, `gsap` ScrollTrigger as the scroll conductor.
- **Device tiers** (decide once at boot; store in zustand; allow a "Reduce effects" toggle in settings):
  - **Tier 0 (static):** no WebGL, `prefers-reduced-motion`, `navigator.deviceMemory ≤ 2`, or Save-Data → show pre-rendered posters (AVIF) of each scene plus 2D SVG fallbacks.
  - **Tier 1 (lite):** mobile / ≤4 cores → 2D Canvas or a reduced 3D scene (no postprocessing, DPR 1, ≤50 draw calls).
  - **Tier 2 (full):** desktop/modern phones → full scenes, DPR `min(devicePixelRatio, 1.75)`, bloom on.
- **Budgets per route:** ≤ 150 draw calls, ≤ 300k triangles, ≤ 1.5 MB of 3D assets on the landing page (Draco/Meshopt geometry, KTX2 textures), 60 fps desktop and ≥ 40 fps mid Android. Use `frameloop="demand"` for anything static between interactions, pause when offscreen (IntersectionObserver), handle `webglcontextlost`, and dispose everything on route change.
- **Never block content on 3D.** HTML copy and the CTA render first; the canvas fades in behind them once the first frame is ready. 3D chunks are lazy-loaded with `React.lazy` and are **not** part of the initial bundle.

### 5A.2 The ten signature components
Build these as isolated components in `src/immersive/` with a Storybook-like preview on `/dev/immersive`.

**1. Pose Constellation (landing hero, Tier 2/1)**
- *What:* The athlete as a **3D constellation**: 33 MediaPipe **world landmarks** (metres, hip-centred, real depth) rendered as instanced emissive spheres (size = visibility) joined by thin tube bones in haldi. **Motion ribbons** trail from wrists and ankles for the last ~0.6 s (a `MeshLine` whose alpha fades along its length), so a squat leaves a glowing arc in space, like long-exposure sports photography.
- *Data:* plays a recorded landmark stream (`public/demo/*.landmarks.json`) of a real athlete doing sit-ups, a vertical jump and a sprint start in a loop. On "Try it on yourself", it switches to the visitor's **live world landmarks**.
- *Camera:* slow damped orbit (±8°) driven by the pointer and by `DeviceOrientation` on phones. No `OrbitControls` (that feels like a product viewer).
- *Atmosphere:* two **floodlight cones** from the top corners (additive cone mesh with a gradient alpha shader) catching drifting **chalk-dust particles** (~400 points, instanced, slow Brownian drift). Floor: an infinite chalk-line grid fading into indigo fog.
- *Tier 0 fallback:* a still AVIF render + an SVG skeleton with CSS-only breathing.

**2. The Setu (one persistent scroll world for the landing story)**
- *What:* **One** 3D world the camera travels through as you scroll, along a CatmullRom spline: the "bridge" from a **village dirt ground** (low-poly, red-earth terrain, a lone goalpost, dusk) → a **phone hovering** with the skeleton inside its screen (Capture) → an **abstract measurement space** where joint-angle arcs and the rep state machine float as 3D UI (Analyse) → a **percentile curve** extruded as a glowing ridge with your dot on it (Score) → **evidence links** snapping together (Verify) → rising above an **India terrain** where a district lights up and an arc reaches a national centre (Discover).
- *Implementation:* a scene **ledger as data** (an array of chapters with camera position/target/fov, mobile overrides, fog, light intensities, active objects, DOM copy). GSAP ScrollTrigger maps normalised scroll progress to chapter interpolation. DOM copy stays semantic HTML layered above the canvas. Reverse scrolling must work perfectly.
- *Mobile:* fewer objects, a closer camera, shorter path. *Tier 0:* the same chapters as stacked sections with posters.

**3. India Talent Terrain (landing scene 6 + console Command Centre "3D view")**
- *What:* India as a dark indigo plane with **hex-binned columns** (d3-hexbin over district centroids, extruded with `InstancedMesh`). Height = athlete density; colour (akash → kesari → haldi) = mean percentile. **Arcs** ("setu" lines, animated dash) fly from districts to the nearest NCOE/academy when a High-Potential athlete is shortlisted. Hover/tap a column → tooltip card. Click a state → camera dollies in, columns re-bin to district level.
- *Rules:* the boundary outline must follow the **official Survey of India depiction**. The console offers a **2D/3D toggle**, with 2D as the default for analysts. Every demo dataset shows `DEMO DATA`.

**4. Battery Track (`/battery` hero)**
- *What:* A top-down → 3/4-angle **3D athletics track** (400 m oval, lanes in chalk on a deep track surface). The **10 lanes are the 10 SAI tests in protocol order**. Hovering or focusing a lane lifts it slightly, and a small constellation athlete performs that test's movement in the lane (looped landmark clip). Selecting a lane flies the camera down to it and routes to `/battery/:testId`.
- *Accessibility:* the lanes mirror a real `<ol>` list that fully controls the scene by keyboard.

**5. Form Ghost (results page, the useful 3D)**
- *What:* A 3D replay of the athlete's **best and worst rep** from their stored world landmarks, side by side with a translucent **reference "ghost"** of correct form. Scrub with a slider; drag to rotate (constrained ±60°). Joints that deviate from the reference by more than a threshold glow sindoor with a label ("hips rose 14 cm early").
- *Why:* turns the score into **coaching you can see**. This is where 3D earns its keep.

**6. Holographic Athlete Passport (`/app/passport`)**
- *What:* The passport as a **physical 3D card** (rounded box, 85.6×54 mm ratio) with a **thin-film iridescent foil shader** on the front band (view-angle-dependent hue shift in the haldi→kesari→akash range, very subtle), embossed constellation pose, KhelScore and band. It tilts with pointer/gyro and flips on tap to show the QR + verification hash on the back. Exports a flat PNG for WhatsApp.

**7. Scoreboard Reveal (results)**
- *What:* Split-flap digits roll to the KhelScore; simultaneously the 33 joint particles of the athlete's final frame **fly in and assemble into the digits** (points sampled from text geometry, lerp with a stagger), then settle. The band chip stamps in with a short dholak hit (see §5A.5). ~1.6 s total and skippable.

**8. Virtual Floor HUD (live test for jumps/sprint)**
- *What:* During broad jump, vertical jump and 30 m sprint, estimate the ground plane from ankle/heel landmarks plus the user calibration taps, then **project a perspective chalk grid onto the real floor** in the camera feed. Show a take-off line, a live landing marker and distance ticks in cm. For the vertical jump, a vertical ruler rises beside the athlete and the peak height is marked. This turns measurement into something the athlete can **see happen**.

**9. Evidence Chain (landing scene 5, console audit log)**
- *What:* 2.5D, not crypto clichés. Each audit event is a **baton** (the relay-race metaphor: custody passed hand to hand). New events slide in and lock onto the previous baton with a click. Hovering shows `prevHash → hash`. "Verify integrity" runs a pulse of light along the chain, which turns sindoor at the first broken link if tampered.

**10. Floodlight Atmosphere (global, Tier 2)**
- A reusable `<Floodlights />` background for hero moments: soft volumetric cones + chalk-dust + a very faint film grain (shader noise at ~3% opacity). Use it on **at most two** screens (landing hero and results reveal). Everywhere else stays clean.

### 5A.3 Composition recipes (layouts with intent)
Use these exact compositions. They avoid the default "centered H1 + subtitle + two buttons + card grid".

**Landing hero (desktop):**
```
┌────────────────────────────────────────────────────────────────┐
│ [logo]                      Battery  How it works  Verify   हिं│EN  [Sign in] │
│                                                                │
│   प्रतिभा  (40vw Devanagari, neel-800 on neel-950, bleeds off left edge)  │
│                                   ╭───────── 3D Pose Constellation ─────╮ │
│  Talent is everywhere.            │   (athlete in floodlight, ribbons)  │ │
│  Opportunity isn't. Yet.          │                                     │ │
│  (Anek narrow 800, ~9vw,          │   ● measuring · knee 92°            │ │
│   left-aligned, 2 lines)          ╰─────────────────────────────────────╯ │
│                                                                │
│  [Take the 60-second test]  Try it on yourself                 │
│  Works offline · Video stays on your phone · हिंदी में भी        │
└────────────────────────────────────────────────────────────────┘
```
Left-aligned type with the 3D on the right, overlapping the grid boundary. On mobile, the 3D sits *behind* the headline at 40% opacity and the CTA is pinned to the bottom safe area.

**Live test (mobile portrait):** full-bleed camera. Rep counter top-left at 30% of screen height (kinetic width), timer ring top-right, the single most important cue in a bottom sheet (large type, haldi left rule), phase bar along the left edge. Nothing else.

**Results:** a giant score left (Anek narrow, 168px) and the percentile curve right with your dot. Below: Form Ghost full width. Then a two-column "What went well / What to work on" with drills. Then the evidence strip.

**SAI Console:** 240px left nav, content in a 12-col grid at 1440. Command Centre: KPI strip (5 equal columns separated by rules, *not* cards), map 8 cols + live feed 4 cols, funnel full width. Dense 13–14px tables, 32px rows, sticky headers.

### 5A.4 Surfaces and materials
- **Glass/blur** is allowed **only** for HUD elements over live video (readability over moving imagery). Nowhere else.
- **Chalk texture:** headings on the landing page can use a very subtle chalk-grain mask (SVG `feTurbulence` alpha mask on text at 6–8% roughness). Only the landing page, only display sizes.
- **Shadows:** almost none in Arena (depth comes from light and colour). In Ledger, a single 1px rule + 0 2px 0 shadow for sticky headers only.
- **Photography (if available):** duotone neel/kesari, grain, cropped tightly on hands, feet and faces in motion. Never full-length stock poses.

### 5A.5 Sound (optional but memorable, culturally specific)
- Rep tick: a short, dry **tabla "na"** stroke (self-recorded or synthesised; ≤ 25 KB each). Countdown: three **dholak** taps and a higher "GO". Band reveal: one deeper dholak hit. A "Valid/invalid rep" pair should be distinguishable by ear for athletes not looking at the screen.
- Sound is **off by default** outside the test flow, can be toggled globally, and is always paired with visual + haptic feedback.

### 5A.6 Micro-interaction catalogue
| Moment | Interaction |
|---|---|
| Live status pill | Haldi dot with a slow 2 s breathing ring while tracking; turns amber and stops breathing on pose loss |
| Primary button press | 98% scale + 80 ms darken; no hover lift |
| Setup checklist item passes | Tick draws itself (SVG stroke-dashoffset 240 ms), row tints hara at 8% |
| Offline → online | Sync pill morphs into a count, dots travel along an arc, count ticks down |
| Table row approve (console) | Row tints hara, collapses (200 ms), toast "Approved KS-…" with Undo for 5 s |
| Language switch | Text cross-fades per element (120 ms); layout must not jump (reserve widths) |
| Pose lost mid-test | Skeleton freezes and desaturates, timer pauses, a gentle prompt slides up |

### 5A.7 Reference board (open these and study the specific thing named)
| Look at | For | Link |
|---|---|---|
| Igloo Inc. | One persistent 3D world with scroll chapters; restraint in UI chrome over WebGL | https://www.igloo.inc |
| Lusion | Physically convincing light, particle atmosphere, fast-loading WebGL | https://lusion.co |
| Active Theory | Mixing real-time 3D with clear product storytelling | https://activetheory.net |
| Bruno Simon | Playful, explorable 3D that still loads fast | https://bruno-simon.com |
| WHOOP | One-score hierarchy, semantic colour, dark data UI | https://www.whoop.com |
| Strava | Local leaderboards and place-based social proof | https://www.strava.com |
| Apple Fitness+ | Ring closure, celebratory but brief motion | https://www.apple.com/apple-fitness-plus/ |
| Hudl / Catapult | Video + telemetry scrubbed in sync for analysts | https://www.hudl.com · https://www.catapult.com |
| Olympics.com | Pictogram systems, athlete-first editorial layouts | https://www.olympics.com |
| Linear | Keyboard-first console, ⌘K, quiet chrome, crisp tables | https://linear.app |
| Our World in Data / The Pudding | Explorable explanations for the Transparency page | https://ourworldindata.org · https://pudding.cool |
| Codrops | Implementation tutorials for WebGL/GSAP effects listed above | https://tympanus.net/codrops |
| pmndrs/drei | Ready-made R3F helpers (Instances, MeshLine, PerformanceMonitor) | https://github.com/pmndrs/drei |
| Anek (Ek Type) | The primary typeface, all ten scripts | https://github.com/EkType/Anek |
| UX4G | Government design system foundations for the console | https://ux4g.gov.in/foundations |

Take **principles**, never copy layouts or assets.

### 5A.8 Anti-generic rules (fail the build review if any appear)
- ❌ Near-black + acid-green, or cream + terracotta + serif palettes
- ❌ A tracked ALL-CAPS eyebrow above every heading; meta strings joined with "·" everywhere; "→" appended to every link
- ❌ Identical rounded cards with the same soft shadow for all content; gradient washes as decoration
- ❌ Fade-and-slide-up on every section; hover-lift on every card
- ❌ One accent word coloured differently inside a headline
- ❌ Numbered markers (01/02/03) on things that are not a sequence
- ❌ Stock photos of Western gyms; purple-blue "AI" gradients; glowing brains; robot imagery
- ❌ Mono font used for labels just to look "techy"
- ✅ Instead: left-aligned editorial type, whitespace grouping, real data in every visual, the body as the main visual, one bold moment per screen.

### 5A.9 Design QA loop (do this per phase)
1. Screenshot every changed route at 360, 768, 1280 and 1440 (Playwright), in Arena, Ledger and Sunlight.
2. Compare against this section: is the bold moment clear? Is anything decorative without meaning? Remove one element.
3. Run a Tier 0 check (reduced motion + WebGL disabled). The page must still be complete and beautiful.
4. Run a perf trace on a 4× CPU-throttled mobile profile. 3D scenes must hold ≥ 40 fps or degrade a tier automatically (`PerformanceMonitor`).

---

## 6. Information Architecture & Screens

### 6.0 Route map (final)
```
PUBLIC (Arena theme)
/                         Landing: the story + live AI demo
/battery                  The 10-test SAI Battery library
/battery/:testId          Test protocol detail (pictogram, animated demo, setup, scoring)
/how-it-works             Pipeline: Capture → Analyse → Score → Verify → Discover
/transparency             How scoring works, model card, limitations, data policy
/verify/:recordId         Public record verification (QR target)
/leaderboards             Privacy-safe district/state leaderboards
/for-organisations        Schools, academies, federations, SAI
/about                    SIH25073, team, vision
/login  /signup           Role-aware auth (Athlete · Coach · SAI Official) + demo role switcher
/privacy /terms /accessibility

ATHLETE APP  /app  (Arena theme, mobile bottom-nav)
/app                      Home: "What's next" + KhelScore + battery progress
/app/battery              Battery runner (sequenced session)
/app/test/:testId         Single test flow: Brief → Setup check → Live → Review → Submit
/app/results/:attemptId   Result + explainable breakdown + evidence
/app/progress             Growth curves, PBs, plateau detection
/app/passport             Athlete Passport: verified shareable card + QR + PDF
/app/locker               Evidence locker + offline sync queue
/app/challenges           District challenges, badges (age-appropriate)
/app/settings             Language, sunlight mode, guardian, data & privacy, export/delete

COACH FIELD MODE  /field  (Arena or Sunlight, tablet/phone)
/field                    Sessions list
/field/session/:id        Roster runner: athlete queue × test grid, rear camera, offline

SAI CONSOLE  /console  (Ledger theme, desktop-first)
/console                  Command Centre: KPIs, India talent map, live intake feed
/console/submissions      Virtualised table, filters, saved views
/console/review           Risk-ranked review queue
/console/review/:id       Audit Workbench (video + skeleton + telemetry scrubber)
/console/talent           Talent discovery: search, shortlist, invite to trial
/console/analytics        Cohort analytics, gender/age comparisons, bias monitor
/console/audit-log        Hash-chained, append-only log of every decision
```
Keep redirects from old paths (`/app/dashboard`, `/athlete/*`, `/official/*`, `/explore`, `/platform`) to the new ones.

### 6.1 Landing page `/`: a scroll-told film in 7 scenes
Each scene is a full-viewport section. Pin and scrub with GSAP ScrollTrigger on desktop, and fall back to simple stacked reveals on mobile and under reduced motion.

1. **Cold open / Hero.** Indigo night under floodlights. The **Pose Constellation** (§5A.2 #1) breathes on the right. Kinetic headline in Anek (narrow width, 800) over a huge tone-on-tone Devanagari **प्रतिभा** (see §5A.3): **"Talent is everywhere."** It splits line by line, then the second line arrives: **"Opportunity isn't. Yet."** Underneath: the primary CTA **"Take the 60-second test"**, a secondary text link **"Try it on yourself"**, and a quiet line of proof points in sentence case ("Works offline. Video stays on your phone. हिंदी में भी।").
   - **The wow moment:** clicking "Try it on yourself" asks for camera permission *inline* (with a privacy line: "Video never leaves your device"). The skeleton then becomes **your** skeleton (MediaPipe, live), with joint angles annotated. Do 3 squats and a counter appears in the corner. If permission is denied or no camera exists, play a **recorded clip with pre-extracted landmarks** (`public/demo/squat.mp4` + `squat.landmarks.json`, recorded from a real person), clearly tagged "Recorded demo".
2. **The gap (problem).** A horizontal comparison scrubbed by scroll. Left: "A sports-science lab: ₹ lakhs of equipment, in a few cities." Right: "A ₹8,000 phone: already in the pocket." Add smartphone-penetration figures only with a cited, current source (e.g. TRAI); otherwise keep the claim qualitative. Animated India dot-map: lab cities light up as a few dots, then *every district* lights up.
3. **The bridge (how it works).** A continuous SVG "setu" path draws as you scroll, passing through 5 stations, each with a mini live illustration: **Capture** (phone frame with skeleton) → **Analyse** (angle arc, rep state machine) → **Score** (percentile curve with your dot) → **Verify** (hash chain links snapping) → **Discover** (pin drops on the TIDC map).
4. **The battery.** Ten lanes, like an athletics track viewed from above. Each lane holds a test pictogram that animates its movement on hover/scroll, plus the component it measures. Click to go to `/battery/:testId`.
5. **Proof, not promises (trust).** A split screen. A video frame with skeleton overlay on one side, and an evidence card on the other that types itself out: `sha256`, `captured_at`, `geo: Kheda, GJ`, `model: pose_landmarker_lite@<version>`, `declaration: signed`. The line under it: *"Every record carries its own evidence."* Then a list of anti-cheat signals, each with a one-line explanation.
6. **Bharat on the map (impact).** A real India map (states, district on zoom) showing *demo* talent density with a `DEMO DATA` tag. Toggle between Boys/Girls/All and age bands. A ticker: "Sunita M. · Kalahandi · Sit-ups · 92nd pct · verified".
7. **Close.** Three role doors: **"I'm an athlete"**, **"I'm a coach"**, **"I'm with SAI / an academy"**. Footer in UX4G style: government-style strip, language switcher, accessibility statement, SIH25073 badge, "Prototype · not an official SAI service" disclaimer.

### 6.2 `/battery` and `/battery/:testId`
- Index: the 10 lanes as a list or grid with filters (component, equipment needed, camera-only vs assisted, age group).
- Detail: hero pictogram looping the movement; **"What it measures"**; **"Setup"** with an animated top-down diagram showing phone placement, distance and angle; **"How the AI measures it"** (landmarks used, method, accuracy target, limitations); **"Scoring & norms"** (age/gender bands, showing *Provisional norms* if not official); a **sample video**; CTA **"Start this test"**.

### 6.3 Athlete App: Home `/app`
WHOOP-style hierarchy:
- **Top:** greeting in the chosen language, sync status pill (`● Synced` / `◐ 3 waiting · offline`).
- **Hero tile:** **KhelScore** (huge condensed numerals) + band chip (Emerging/Promising/High Potential) + "based on 7 of 10 tests". If the battery is incomplete, the hero becomes **"Next: Standing Vertical Jump · 2 min"** with a big kesari CTA.
- **Battery progress:** 10 lane segments that fill in as tests complete, with a ring around the whole thing.
- **Component radar:** Speed, Power, Agility, Strength, Endurance, Flexibility, Body comp.
- **Sport-suitability preview:** "Your profile resembles athletes in: Kabaddi · Sprint · Football". Always show **"why"** (which components drove it) and a disclaimer.
- **Recent attempts**, **district rank** (privacy-safe), **challenge of the week**.

### 6.4 The Test Flow `/app/test/:testId` (the heart; make it perfect)
Full-screen, immersive, dark, no chrome. Five steps with a slim progress rail:
1. **Brief:** pictogram animation, 3 bullet rules, duration and "what counts as a valid rep". Voice option: "Read instructions aloud" (Web Speech API, `hi-IN`/`en-IN`).
2. **Setup Check (pre-flight).** Live camera with checklist items that turn green automatically:
   - ✅ Full body visible (all key landmarks with visibility > 0.6)
   - ✅ Distance OK (body height fills 55–85% of frame height)
   - ✅ Camera level (`DeviceOrientationEvent` beta/gamma within tolerance; skip on desktop)
   - ✅ Lighting OK (mean luminance from a downscaled frame within range)
   - ✅ Only one person in frame (with `numPoses: 2`, reject if two people detected)
   - ✅ Correct view (side view for sit-ups/push-ups/broad jump; front view for squats/jumping jacks)
   - A ghost silhouette overlay shows where to stand. **Start unlocks only when everything is green.** A "Having trouble?" drawer offers tips.
3. **Announcement:** the SAI rule. A 5-second "Say your name, test and date" prompt with a mic level meter. The audio is recorded as part of the evidence clip.
4. **Live:** 3-2-1 countdown (voice + visual) → recording.
   - **HUD (F1-style):** huge rep counter (split-flap), timer ring, current joint angle with an arc drawn *on the joint*, phase indicator (`DOWN ▸ UP`), confidence meter, and a form cue line ("Go lower", "Keep heels down") also spoken aloud with a cooldown so it doesn't nag.
   - **Skeleton overlay:** haldi-yellow bones, joints sized by visibility, active joints glowing, **valid rep** = hara-green pulse and **invalid rep** = red flash with the reason ("Shoulders didn't touch mat"). **Never** a manual "+ Log Rep" button in athlete mode.
   - Auto-stop at protocol duration, or on loss of pose for more than 3 s (prompt to resume or abort).
5. **Review & Submit:** replay with skeleton, a **rep strip** (each rep as a mini-card: depth, duration, valid/invalid + reason, thumbnail), score preview, a **declaration of authenticity** checkbox plus coach PIN when in field mode, then **Submit** (saved locally first, synced when online).

### 6.5 Results `/app/results/:attemptId`
- **Scoreboard reveal** (§5.6) → test score, **percentile in age/gender band** (bell-curve chart with your marker), band, and comparison to your PB.
- **Explainability panel:** "How this was computed" with method, landmarks, thresholds, the per-rep table and confidence. Keep **Score** and **Confidence** separate: score says how good, confidence says how sure.
- **Coaching:** 2–3 concrete drills linked to the specific errors detected (e.g. "Your hips rose early on reps 4, 7 and 9 → try dead-bugs").
- **Evidence card:** hash (truncated with a copy button), timestamp, geo, device, model version, sync state, and a link to `/verify/:id`.
- Actions: Retake (with a cooldown rule), Share passport, Download PDF (works offline).

### 6.6 Progress `/app/progress`
Growth curves per component over time, PB timeline, **plateau detection** ("No improvement in Sit-ups across 4 attempts over 6 weeks → try this plan"), year-on-year comparison, and an age-band percentile trajectory.

### 6.7 Athlete Passport `/app/passport`
A collectible, shareable, *verifiable* card: name (or initials for minors in public), district, age band, KhelScore, band, top 3 components, verified test count and a **QR → `/verify/:id`**. Export as PNG (for WhatsApp) and PDF. Holographic shimmer on tilt (`DeviceOrientation` / pointer); static under reduced motion.

### 6.8 Evidence Locker `/app/locker`
Every attempt shows: local video size, hash, sync status, and retry/delete. Storage meter. Shows the SAI requirement live: "Capacity: 500 sessions · Using 37".

### 6.9 Coach Field Mode `/field/session/:id`
Built for speed outdoors:
- Roster import (CSV / manual / QR on an athlete's passport). A **matrix** of athletes × tests with status cells.
- Rear camera by default, **Sunlight mode** on by default, large touch targets (≥56px).
- "Next athlete" flow without leaving the camera. Enforces the battery order and rest timers.
- Assisted tests (height, weight, medicine-ball distance, run times) use a **stopwatch/measurement entry** with mandatory photo/video evidence.
- Fully offline. A session summary is exportable as PDF/CSV.

### 6.10 SAI Console (Ledger theme)
Header: a slim government-style strip ("Sports Authority of India · Talent Identification · Prototype"), a ⌘K command palette (jump to athlete, submission or district), role badge and theme toggle.

- **Command Centre `/console`.** KPI row (Submissions today, Verified %, Under review, High-risk flags, New High-Potential athletes), each with a sparkline. Then an **India talent map**: state choropleth with district drill-down, metric switcher (density, mean percentile, verification rate), and gender/age filters. A **live intake feed** shows new attempts sliding in (fed by the athlete app in the same browser via `BroadcastChannel`; this is how the demo "lands" in the console). Next: **talent funnel** (Registered → Battery complete → Verified → High Potential → Invited → Inducted).
- **Submissions `/console/submissions`.** TanStack Table + virtualisation (smooth with 10,000 demo rows). Columns: ID, athlete, age band, district/state, test, result, percentile, risk, status, captured_at, device tier. Faceted filters, saved views, bulk actions, CSV export.
- **Review Queue `/console/review`.** Sorted by risk score, with reason chips ("Cadence above human limit", "Landmark jitter", "Duplicate hash", "Geo mismatch", "2 persons in frame", "Gap in timestamps").
- **Audit Workbench `/console/review/:id`** (the second wow moment):
  - Left: video player with **skeleton overlay replayed from the stored landmark stream**. Speeds 0.25×–2× and frame-step (`,` `.` keys).
  - Bottom: **synchronised timeline**: joint-angle line chart, rep markers (green valid / red invalid), anomaly markers, confidence band. Scrubbing either the video or the chart moves both.
  - Right: evidence panel (hash recomputed live in the browser to show "✓ matches"), metadata, declaration, the athlete's history for context, and an **AI risk explanation** listing every signal with its value vs threshold.
  - Decision bar: **Approve**, **Request retest** (reason required), **Reject as invalid** (reason code required), **Escalate to second reviewer** (required for high-risk). Keyboard shortcuts `A` `R` `X` `E`. Every decision appends to the **hash-chained audit log**.
- **Talent Discovery `/console/talent`.** Query builder (age band, gender, state/district, component percentiles, band, sport suitability, verified-only), results as athlete cards with radar, **shortlist** → **invite to trial** (generates a letter PDF), export.
- **Analytics `/console/analytics`.** Distributions by age/gender, district comparisons, year-on-year, test completion rates, device-tier breakdown, and a **Bias Monitor** (score distributions by gender/region/device tier, with flags where differences may come from measurement rather than ability, e.g. low-light devices scoring lower).
- **Audit Log `/console/audit-log`.** Append-only list where each entry shows `prevHash → hash`, plus a "Verify chain integrity" button that recomputes the chain and shows ✓ or the first broken link.

### 6.11 Public `/verify/:recordId`
A clean, government-certificate-like page: record summary, verification status, hash, reviewer status, issued date and a QR. If the record is not found or tampered with, show a clear red state. Works for records in the local demo store.

### 6.12 `/transparency`
An explorable explanation (OWID/Pudding style): how pose estimation works (interactive skeleton you can drag), how each test is measured, the percentile-norms table, model card (model name/version, known failure modes: loose clothing, low light, occlusion, camera angle), privacy (video stays on device unless submitted; retention; guardian rights), and accessibility statement.

---

## 7. The AI / Measurement Engine (make it real)

### 7.1 Architecture
```
src/engine/
  pose/
    PoseEngine.ts            // wraps MediaPipe PoseLandmarker (VIDEO mode), model/wasm self-hosted
    pose.worker.ts           // runs detection in a Web Worker where supported (OffscreenCanvas), main-thread fallback
    filters/OneEuroFilter.ts // per-landmark smoothing (min cutoff ~1.0, beta ~0.007, tune)
    geometry.ts              // angle(a,b,c), distance, verticalDisplacement, side selection by visibility
    framing.ts               // setup checks: full-body, distance, lighting, persons, view orientation
  tests/
    types.ts                 // TestDefinition, TestRunner interface, RepEvent, TestResult
    registry.ts              // the 10 SAI tests + 3 training tests (push-ups, squats, jumping jacks)
    situps.ts  pushups.ts  squats.ts  jumpingJacks.ts
    verticalJump.ts  broadJump.ts  sitAndReach.ts
    sprint30m.ts  shuttle4x10.ts  enduranceRun.ts  height.ts  weight.ts  medBallThrow.ts
  scoring/
    norms.ts                 // provisional percentile tables by test × age band × gender (config JSON)
    percentile.ts            // interpolate percentile; band mapping (Emerging/Promising/High Potential)
    khelscore.ts             // composite + explanation object
    suitability.ts           // component profile → sport similarity (cosine vs sport archetypes), with "why"
  integrity/
    evidence.ts              // MediaRecorder capture, SHA-256 via crypto.subtle.digest, metadata bundle
    anomalies.ts             // rule-based risk signals → riskScore + reasons
    auditChain.ts            // hash-chained append-only log
  voice/
    coach.ts                 // Web Speech API cues (hi-IN/en-IN), throttled; beep via WebAudio
```

### 7.2 MediaPipe setup rules
- Pin versions. Copy `node_modules/@mediapipe/tasks-vision/wasm/*` to `public/mediapipe/wasm/` at build time (a small Vite plugin or `vite-plugin-static-copy`). Download `pose_landmarker_lite.task` and `pose_landmarker_full.task` into `public/models/`. **Never** use `@latest` URLs.
- Pick the model by device: `lite` by default; `full` when `navigator.hardwareConcurrency >= 8` and the measured FPS exceeds 24. Try `delegate: 'GPU'` first and fall back to `'CPU'`.
- `runningMode: 'VIDEO'`, `numPoses: 2` (to detect a second person), and call `detectForVideo` only when `video.currentTime` has changed.
- Measure and display FPS in a dev overlay. Target ≥20 fps on mid-range Android.
- Store each attempt's **landmark stream** (33 points × xyzv per frame, quantised to Int16, about 60–120 KB per minute) alongside the video. This drives the replay overlay and audit, and doubles as test fixtures.
- Landmark indices used: nose 0; shoulders 11/12; elbows 13/14; wrists 15/16; index fingers 19/20; hips 23/24; knees 25/26; ankles 27/28; heels 29/30; foot index 31/32.

### 7.3 Test methods (be honest about each)
Every `TestDefinition` declares `method: 'camera' | 'camera+calibration' | 'assisted'`, `view: 'side'|'front'`, `accuracyTarget` and `limitations[]`. The UI shows these.

| Test | Method | Algorithm sketch |
|---|---|---|
| **Sit-ups** | camera, side view | Torso angle = angle(shoulder, hip, knee). State machine: `DOWN` (torso ≥ ~140° from thigh, i.e. lying) → `UP` (≤ ~70°, chest toward knees) → `DOWN` = 1 rep. Hysteresis bands, min rep time 0.6 s, knees must stay bent (knee angle < 110°) or the rep is invalid with the reason. 30 s / 45 s by age. |
| **Push-ups** | camera, side view | Port `RepStateMachine` logic: elbow angle < 90° down, > 155° up. Body-line check angle(shoulder, hip, ankle) ≥ 160° or "hips sagging/piking". |
| **Squats / Jumping jacks** | camera | Port and harden existing logic (training tests, not SAI battery). |
| **Vertical jump** | camera, side or front, ≥30 fps | **Flight-time method:** detect take-off (both ankles leave the standing baseline by > threshold) and landing; `h = g·t²/8`. Cross-check with hip-displacement × scale (scale from athlete's entered height). Show the frame-rate-based error margin (±1 frame) and recommend 60 fps when available. Best of 3. |
| **Standing broad jump** | camera + calibration, side view | User taps two floor points a known distance apart (e.g. two markers 2 m apart) to build a pixel→cm scale on the floor plane; measure take-off toe to landing heel. Best of 2. |
| **Sit & reach** | camera + calibration, side view | Calibrate with the athlete's known foot length or a marked scale; measure fingertip (19/20) horizontal displacement past the toe (31/32) at max reach held ≥ 1 s. |
| **30 m sprint** | camera at finish line + audio start | Start = app's own "GO" beep timestamp (athlete-reaction included, stated); finish = hip landmark crossing a user-drawn virtual line. Coach stopwatch fallback. |
| **4×10 m shuttle** | assisted (coach stopwatch + video evidence) | Camera at one end detects line touches as a cross-check (count must equal 4). |
| **Endurance run (800 m / 1.6 km)** | assisted + GPS | `navigator.geolocation.watchPosition` track with distance accumulation and plausibility (max speed caps); coach-timed fallback. State the browser limitation (screen must stay on → Screen Wake Lock API). |
| **Height** | assisted + photo evidence | Manual entry by coach/guardian with a photo against a wall scale; optional camera estimate shown only as a "cross-check". |
| **Weight** | assisted | Manual entry → BMI and age/gender BMI band. |
| **Medicine ball throw** | assisted + video | Distance entered; video evidence attached; best of two; ball weight by age/gender rule. |

> Accuracy targets from SAI (±1 cm height, ±2 cm jump, ≥95% sit-ups, ±1 s runs, ≥95% shuttle touches) appear on each test page as **"Target"**, never as "Achieved", unless validated (see §7.6).

### 7.4 Scoring: KhelScore (transparent by construction)
- **Per test:** raw result → percentile within `{test, ageBand, gender}` using `norms.ts` (piecewise-linear interpolation over P10/P25/P50/P75/P90/P97). Norms ship as **clearly labelled provisional placeholder tables** in `src/engine/scoring/norms.provisional.json`, designed to be replaced by official SAI norms.
- **Component scores:** Speed (30 m), Power (VJ, BJ, MBT), Agility (shuttle), Strength/Endurance (sit-ups), Aerobic (run), Flexibility (sit & reach), Body composition (BMI band, shown as context, **not** ranked).
- **KhelScore (0–100)** = weighted mean of component percentiles (weights in config and shown in the UI). Only computed when ≥ 6 tests are complete; otherwise show "Provisional KhelScore (n/10 tests)".
- **Band:** High Potential (≥ P90 composite or ≥ P97 in any component), Promising (P70–P90), Emerging (< P70). Thresholds are configurable and displayed.
- **Confidence (0–1)** is computed separately from pose visibility, frame rate, framing quality and anomaly signals. It's shown next to the score, never mixed into it.
- `khelscore.ts` returns an **explanation object** (`contributions[]`, `missingTests[]`, `normsVersion`, `weights`) that the UI renders. No black boxes.

### 7.5 Integrity & anti-cheat (rule-based, explainable)
`anomalies.ts` produces `{ riskScore 0–100, level: low|medium|high, signals: Signal[] }`. Each signal has `{code, label, value, threshold, severity, frames[]}`:
- `CADENCE_IMPLAUSIBLE`: rep cadence beyond a physiological ceiling for that test
- `LANDMARK_JITTER`: high-frequency noise or teleporting joints (possible edited or looped video)
- `TIMESTAMP_GAP`: gaps in frame timestamps or recording pauses (edited / non-continuous)
- `MULTI_PERSON`: more than one pose detected for over N frames
- `POSE_LOST`: visibility below threshold for more than X% of duration
- `DUPLICATE_EVIDENCE`: same SHA-256 already in store
- `GEO_MISMATCH`: geo far from the athlete's registered district (soft signal)
- `DEVICE_CLOCK_SKEW`: device time vs server/sync time drift
- `UPLOAD_NOT_LIVE`: uploaded file instead of live capture (allowed, but weighted)
- `REPEATED_PERIODICITY`: autocorrelation reveals a looped clip

High risk → mandatory human review (two reviewers). Copy must say **"flagged for review"**, never "cheater".

### 7.6 Evidence & tamper evidence
- Capture with `MediaRecorder` (prefer `video/mp4` where supported, else `video/webm`; note the SAI MP4 requirement and transcode server-side later). Request ≥720p.
- On stop: `sha256 = crypto.subtle.digest('SHA-256', blobBuffer)`. Store the blob in IndexedDB (Dexie) plus a metadata bundle `{attemptId, athleteId, testId, startedAt, endedAt, geo?, deviceInfo, modelVersion, appVersion, fps, landmarksRef, declaration:{athlete, coach?, signedAt}}`.
- **Declaration signing (prototype):** generate a per-device ECDSA P-256 key with WebCrypto (non-extractable, stored in IndexedDB), sign `sha256 + metadata` and store the signature. The console verifies with the stored public key. Label it "Device signature (prototype)". It's a real cryptographic step and much more convincing than a fake string.
- **Audit chain:** every state change (`CREATED`, `SUBMITTED`, `SYNCED`, `APPROVED`, …) appends `{event, actor, at, payloadHash, prevHash, hash = sha256(prevHash + payload)}`.
- **Validation harness** (`/dev/validation`, dev-only route): run test runners against recorded fixture landmark streams with ground-truth counts and show accuracy. **That's** where "Achieved accuracy" numbers may come from.

---

## 8. Data, State & "Backend-Feel"

- **Local DB:** `dexie` (IndexedDB) tables: `athletes, guardians, sessions, attempts, evidence (blobs), landmarkStreams, reviews, auditLog, syncQueue, settings`.
- **Server simulation:** `msw` (Mock Service Worker) implements a REST API (`/api/attempts`, `/api/reviews`, `/api/athletes`, …) with realistic latency (150–600 ms), occasional failures (to show retry UI) and offline behaviour. The app talks to it through a typed `apiClient` using `@tanstack/react-query`. Swapping to a real backend later is just a base-URL change.
- **Offline queue:** `syncQueue` with exponential backoff; listens to `online`/`offline` plus a **demo "Simulate offline" toggle**; flushes within 30 s of reconnect (SAI requirement), and the UI shows it.
- **Cross-tab live demo:** `BroadcastChannel('khelsetu')` publishes `attempt.submitted` so the console in another tab updates live.
- **Seed data:** `src/demo/seed.ts` generates ~2,000 athletes and ~10,000 attempts across real Indian states and districts with plausible distributions (deterministic seed). Every seeded record has `isDemo: true` and shows the `DEMO DATA` tag. Use correct real hashes (computed from generated bytes), not the empty-string hash.
- **App state:** `zustand` for UI/session state (theme, language, role, offline simulation); React Query for server state.
- **Validation:** `zod` schemas shared by forms (`react-hook-form`) and the API mocks.
- **Types:** a single `src/types/` domain model derived from zod schemas: `Athlete, Guardian, TestDefinition, Attempt, RepEvent, Evidence, Review, AuditEvent, NormsTable, KhelScoreExplanation`.

---

## 9. Identity, Roles, Privacy & Compliance

- **Roles:** `athlete`, `guardian`, `coach`, `sai_reviewer`, `sai_admin`, `scout`. Route guards per role. A **Demo role switcher** in the header (visible only when `VITE_DEMO=true`) lets the jury jump between roles instantly.
- **Sign-up flow:** language → role → identity method (**APAAR / Aadhaar e-KYC / NSRS: integration stub screens** with a realistic OTP UI and a "Simulated" tag) → profile (name, DOB, gender, state/district from a real list, school) → **guardian consent for under-18s** (guardian phone + OTP stub + plain-language consent screen). India's DPDP Act 2023 requires verifiable parental consent before processing a child's data, so design for it.
- **Data minimisation:** public leaderboards show minors as `Sunita M.` + district + age band. No photo unless opted in. Full names only in the console.
- **User rights UI:** export my data (JSON + videos zip), delete my data, withdraw consent, see who accessed my record (from the audit log).
- **Accessibility:** WCAG 2.1 AA, GIGW 3.0-minded. Keyboard navigation everywhere, visible focus rings (2px haldi outline on dark, syahi outline on light), skip link, landmarks, `aria-live="polite"` announcing rep counts and status, captions/transcripts for demo videos, 44px minimum touch targets (56px in field mode), no colour-only meaning (icons and text on every status), and reduced motion respected.
- **i18n:** `react-i18next` with `en`, `hi` complete; scaffolding for `or`, `bn`, `mr`, `ta`, `te`, `gu`. All copy lives in `src/locales/*.json`; nothing is hard-coded. Numbers/dates via `Intl` with `en-IN` / `hi-IN` (lakh/crore grouping). Voice cues use the selected language.

---

## 10. Tech Stack (final)

Keep: React 19, Vite, Tailwind v4, react-router 7, lucide-react, `@mediapipe/tasks-vision`.

Add:
| Purpose | Package |
|---|---|
| Types | `typescript` (strict) + `tsconfig.json`; migrate all `.jsx/.js` → `.tsx/.ts` |
| Motion | `motion`, `gsap` (+ScrollTrigger, SplitText), `lenis` |
| Data/state | `@tanstack/react-query`, `zustand`, `dexie`, `dexie-react-hooks`, `zod`, `react-hook-form`, `@hookform/resolvers` |
| Tables | `@tanstack/react-table`, `@tanstack/react-virtual` |
| Charts | Keep `recharts` for standard charts; `d3-geo`, `d3-scale`, `topojson-client` for the India map (bundle a simplified TopoJSON of states + districts in `public/geo/`; ensure boundaries follow the **official Survey of India depiction**, including all of J&K and Ladakh, as an institutional must) |
| Mocks | `msw` |
| PWA | `vite-plugin-pwa` (Workbox): precache app shell, fonts, models, wasm, geo; runtime cache for media |
| PDF | `@react-pdf/renderer` (report card, passport, trial invite), offline-capable |
| QR | `qrcode` |
| i18n | `i18next`, `react-i18next` |
| Fonts | `@fontsource-variable/anek-latin`, `@fontsource-variable/anek-devanagari` (+ other Anek scripts lazy-loaded by language), `@fontsource-variable/jetbrains-mono` |
| UI primitives | `@radix-ui/react-*` (dialog, dropdown, tabs, tooltip, toast), or `shadcn/ui` themed fully to the tokens, **never with default styling visible** |
| Command palette | `cmdk` |
| Utilities | keep `clsx` + `tailwind-merge` → `cn()` helper |
| Testing | `vitest`, `@testing-library/react`, `@playwright/test`, `axe-core` / `@axe-core/playwright` |
| 3D & effects | `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `maath`, `d3-hexbin`, `meshline`. Tiered and lazy-loaded per §5A.1 |

Remove: `src/App.css`, `src/App.jsx` shim, the `assets/react.svg` and `vite.svg` template assets, all legacy duplicate pages after porting.

### 10.1 Target folder structure
```
src/
  app/            router.tsx, providers.tsx, guards.tsx, ErrorBoundary.tsx
  styles/         tokens.css, base.css, motion.css
  ui/             primitives: Button, Field, Select, Dialog, Sheet, Tabs, Tooltip, Toast, Table, Stat, Tag, DemoTag, Skeleton, EmptyState, Kbd
  brand/          Logo, PoseMark, Pictogram, LaneRule, Scoreboard (split-flap), RingGauge
  features/
    landing/      scenes/Hero, Gap, Bridge, Battery, Proof, Map, Doors
    battery/      BatteryIndex, TestDetail
    athlete/      Home, Progress, Passport, Locker, Challenges, Settings
    test-flow/    Brief, SetupCheck, Announcement, Live (HUD, SkeletonOverlay), Review, Submit
    results/      ResultPage, PercentileCurve, RepStrip, ExplainPanel, EvidenceCard
    field/        Sessions, RosterRunner
    console/      CommandCentre, IndiaMap, Submissions, ReviewQueue, AuditWorkbench, Talent, Analytics, AuditLog
    auth/         Login, Signup (multi-step), RoleSwitcher
    public/       HowItWorks, Transparency, Verify, Leaderboards, Organisations, About, Legal
  immersive/      PoseConstellation, SetuWorld (+ chapters.ts ledger), TalentTerrain, BatteryTrack, FormGhost, PassportCard, ScoreAssemble, VirtualFloor, EvidenceChain, Floodlights, tiers.ts
  engine/         (see §7.1)
  data/           db.ts (Dexie), api/ (client + msw handlers), sync/
  demo/           seed.ts, fixtures/ (landmark streams), jury-tour.ts
  locales/        en.json, hi.json, …
  types/
public/
  mediapipe/wasm/  models/  geo/  media/  demo/  fonts? (via fontsource)
```

---

## 11. Jury Mode (demo choreography as a feature)

Add a **"Jury Tour"** (`?tour=1` or a button in the footer) that drives a guided 5-minute walkthrough using spotlight overlays:
1. Landing hero → "Try it on yourself" (live squats).
2. Sign in as athlete (role switcher) → Home shows the battery in progress.
3. Run **Sit-ups** live (30 s) → watch the setup check, voice cues and invalid-rep detection.
4. Results → percentile, band, explanation, evidence hash.
5. Toggle **Simulate offline** → submit a second test → see it queued → go online → watch the sync animation.
6. Switch to **SAI Reviewer** → Command Centre map pings with the new attempt (BroadcastChannel) → open the Audit Workbench → scrub → approve → see the audit chain grow → verify chain integrity.
7. Talent Discovery → filter High Potential girls U-14 in Odisha → shortlist → generate the trial invite PDF.
8. Close on `/verify/:id`, scanning the passport QR on a phone.

Each step has a one-line narrator caption the presenter can read.

---

## 12. Phased Build Plan with Acceptance Criteria

### Phase 1: Foundation & cleanup
- Add `tsconfig.json` (strict), convert to TS, delete `App.css`/template assets, rewrite `README.md` (product, setup, demo script, architecture diagram).
- Port valuable legacy logic (`RepStateMachine`, `angleUtils`, `PoseSkeleton`, `mockSubmissions` shape, AuditDetail/ReviewQueue/SyncBar concepts) into the new structure, **then** delete all orphaned/duplicate files.
- Set up the router per §6.0 with lazy-loaded route chunks, redirects for old paths, `ErrorBoundary`, a 404 page.
- Providers: QueryClient, i18n, theme, zustand stores, Dexie, MSW (dev + demo build).
- **Accept when:** `tsc --noEmit`, `npm run build`, `npm run lint` are clean; zero files unreachable from the router; every legacy URL redirects correctly.

### Phase 2: Design system & shells
- Tokens (§5.2), fonts via fontsource, motion tokens, `ui/` primitives, `brand/` components (Logo, Scoreboard, RingGauge, Pictograms for 10 tests, LaneRule, PoseMark loader).
- Three shells: **Public** (floating minimal nav with language switcher, footer UX4G-style), **App** (mobile bottom nav + desktop rail), **Console** (Ledger, sidebar + ⌘K).
- Theme switching (arena/ledger/sunlight), reduced-motion handling, focus styles, skip link.
- A `/dev/ui` route showcasing every component in all three themes.
- **Accept when:** no hard-coded hex values outside `tokens.css`; axe shows 0 serious violations on `/dev/ui`; all three themes pass contrast.

### Phase 3: Real AI engine
- `engine/pose` (self-hosted wasm/model, worker, One-Euro filter, framing checks), `engine/tests` for **Sit-ups, Push-ups, Squats, Jumping Jacks, Vertical Jump** first, then the rest.
- Record 3–5 real fixture landmark streams per test with hand-counted ground truth into `src/demo/fixtures/`. Write **vitest** tests that replay them and assert counts (sit-ups ≥95% agreement).
- **Accept when:** a real person doing 10 sit-ups gets 10 ± 0 counted on a laptop webcam in normal light; tests pass; the app works with network disabled after first load (models and wasm cached).

### Phase 4: Athlete test flow & results
- Full flow §6.4 (Brief → Setup Check → Announcement → Live → Review/Submit) with voice cues (en/hi), haptics, split-flap counter, invalid-rep reasons.
- Evidence capture, SHA-256, device signature, landmark stream storage.
- Results §6.5 with percentile curve, explanation, coaching, evidence card, PDF.
- **Accept when:** no button anywhere increments reps manually (except a clearly labelled **coach override** in field mode, which is logged in the audit chain); results reflect actual performance; a PDF downloads offline.

### Phase 5: Athlete app surfaces
- Home, Battery runner (ordered with rest timers), Progress (growth curves, plateau detection), Passport (PNG/PDF/QR), Locker (sync queue, storage meter), Challenges, Settings (language, sunlight, guardian, export/delete data).
- Offline-first PWA, install prompt, sync queue with demo offline toggle and the sync animation.
- **Accept when:** with DevTools offline, a full battery can be completed and stored; going online syncs within 30 s; the app is installable; Lighthouse PWA checks pass.

### Phase 6: SAI Console
- Command Centre (KPIs, India map with drill-down, live feed via BroadcastChannel, funnel), Submissions (virtualised 10k rows), Review Queue, **Audit Workbench** (synced video/skeleton/chart scrubber, keyboard decisions), Talent Discovery (query → shortlist → invite PDF), Analytics + Bias Monitor, Audit Log with chain verification.
- **Accept when:** an attempt submitted in the athlete tab appears in the console tab within 2 s; the audit workbench scrubbing stays at 60 fps; tampering with a stored record (dev button) is caught by "Verify chain integrity".

### Phase 6.5: Immersive layer (§5A)
- Build the tier system and `/dev/immersive`, then components #1 Pose Constellation, #5 Form Ghost, #6 Passport, #7 Score Assemble, #8 Virtual Floor and #10 Floodlights. Then #3 Talent Terrain (2D/3D toggle in console), #4 Battery Track and #9 Evidence Chain. #2 Setu World comes last, because it is the most expensive.
- Record the demo landmark streams (sit-ups, vertical jump, sprint start, squat) from a real person, including world landmarks.
- **Accept when:** every component has a Tier 0 fallback that looks intentional; all hold their fps budgets on a throttled profile; none blocks first paint; WebGL contexts are disposed on route change (no memory growth after 10 route switches).

### Phase 7: Public experience
- Landing (7 scenes, §6.1) with the live "try it on yourself" hero and recorded fallback, Battery index/detail, How it works, Transparency (explorable), Verify, Leaderboards (privacy-safe), Organisations, About (SIH25073), Legal + Accessibility statement.
- **Accept when:** Lighthouse on `/` (mobile, throttled) has Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95; LCP < 2.5 s; CLS < 0.05; the landing JS before interaction is < 200 KB gzipped (MediaPipe loads only after the user opts in).

### Phase 8: Auth, roles, i18n, field mode
- Role-aware login/signup with identity stubs and guardian consent, route guards, demo role switcher.
- Complete `hi.json`; language switch is instant and persistent; voice cues follow the language.
- Coach Field Mode (§6.9).
- **Accept when:** every user-facing string comes from locale files (lint rule or script check); a Hindi walkthrough of the full test flow has no English leaks apart from proper nouns.

### Phase 9: Jury tour, QA & polish
- Jury Tour (§11), seed data, empty/loading/error states for every screen, skeleton loaders, toasts.
- Playwright E2E: landing → signup → sit-ups with fixture injection (fake camera via `--use-file-for-fake-video-capture` or a fixture-driven engine mode) → result → offline → sync → console approve → verify page.
- `@axe-core/playwright` on all key routes. Visual pass at 360, 768, 1280, 1440, 1920.
- **Accept when:** E2E is green; there are 0 axe serious/critical issues; the tour runs end-to-end without manual fixes.

---

## 13. Copy & Voice

- **Tone:** confident, warm, plain-spoken, bilingual. Speak to the athlete as a capable young person, not a "user".
- **Headlines (examples):** "Talent is everywhere. Opportunity isn't. Yet." / "Your phone is now a fitness lab." / "Every record carries its own evidence." / "From the village ground to the national radar."
- **Hindi equivalents** must be written natively, not machine-literal. Example: "प्रतिभा हर जगह है। अवसर नहीं — अभी तक।"
- **Never:** "revolutionary", "cutting-edge", "seamless", "leverage", or unverifiable stats. Every number is sourced, computed or tagged DEMO.
- **Error copy** is helpful: "We lost sight of your knees. Step back about one step." beats "POSE LOST".

---

## 14. Quality Bar Checklist (run before calling it done)

- [ ] Real pose detection drives every athlete-facing count; zero `Math.random()` in any measurement or score path (grep it).
- [ ] Every non-computed number shows `DEMO DATA` / `Simulated` / `Provisional`.
- [ ] Hashes are real SHA-256 of real bytes; the audit chain verifies.
- [ ] Works offline after first load; 500-session capacity is shown; sync is within 30 s.
- [ ] English and Hindi are complete; sunlight mode works; reduced motion is respected.
- [ ] WCAG 2.1 AA: keyboard-only run-through of the athlete flow and console works.
- [ ] No hot-linked third-party images; all media local and optimised.
- [ ] No orphan files; TS strict passes; lint passes; unit + E2E pass.
- [ ] Lighthouse targets met (§12 Phase 7).
- [ ] Every §5A.8 anti-generic rule passes; each screen has exactly one bold moment.
- [ ] Every 3D component has a designed Tier 0 fallback and stays within its budget.
- [ ] The 90-second North Star loop (§3) is flawless on a mid-range Android phone **and** a laptop.
- [ ] The prototype disclaimer is visible: "Prototype for SIH25073 · not an official SAI service".

---

## 15. Reference Material
- SIH25073: "AI-Powered Mobile Platform for Democratizing Sports Talent Assessment" (Smart India Hackathon 2025, Theme: Fitness & Sports).
- SAI / NeGD, *Concept Note: Battery Fitness Assessment Mobile Application* v2.0 (07-04-2026), Unified Digital Sports Ecosystem: https://sportsauthorityofindia.nic.in/sai_new/public/assets/uploads/documents/e6cbda80-9511-4e6c-9e36-afdc920d8351.pdf
- SAI press release on age-appropriate fitness protocols: https://sportsauthorityofindia.nic.in/sai/assets/news/1633064150_SAI5oct.pdf
- Khelo India athlete pathway (TIDC → assessment camps → KIAA/NCOE → NSRS): https://dashboard.kheloindia.gov.in/public/front/assets/become_kia/How%20to%20become%20a%20Khelo%20India%20Athlete.pdf
- MediaPipe Pose Landmarker for Web: https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js
- UX4G, Government of India Design System (foundations, WCAG 2.1 AA): https://ux4g.gov.in/foundations
- WHOOP design breakdown (data-dense UI that feels simple): https://www.925studios.co/blog/whoop-design-breakdown
- GSAP (now 100% free incl. all bonus plugins): https://cdn.jsdelivr.net/npm/gsap@3.15.0/README.md
- Opta Analyst, Future of Media Awards 2025: https://www.statsperform.com/insights/opta-analyst-win-at-future-of-media-awards-2025/

*End of spec. Start with Phase 1.*
