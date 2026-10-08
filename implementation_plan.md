# KhelSetu — Master Frontend Prototype Implementation Plan

**SIH Problem Statement**: 25073  
**Product Category**: AI-Powered Sports Talent Assessment Platform  
**Target Audience**: Grassroots Athletes, Sports Authority of India (SAI) Officials, Talent Scouts, SIH Jury  

---

## 1. Executive Summary & Vision

**KhelSetu** (*"Bridging grassroots potential with intelligent sports assessment"*) is built on the core principle: **"Talent shouldn't depend on geography."** 

This web application frontend is designed as an enterprise-grade digital stadium and national sports intelligence infrastructure. It features a bold editorial visual identity, an interactive AI pose assessment simulator, an offline-first sync engine demonstration, interactive fraud audit toolbars, and an SAI enterprise official intelligence dashboard.

---

## 2. Design System & Aesthetics

### Color Palette (Semantics-Driven)
* **Backgrounds & Infrastructure**: Near-Black / Obsidian Graphite (`#07090E`, `#0B0F17`, `#111827`)
* **Primary Text & Surface**: Warm Off-White / Pure Chalk (`#F8FAFC`, `#E2E8F0`, `#000000` on dark)
* **Performance / Athletic Accent**: Energetic Lime (`#10B981`, `#22C55E`, `#00FF87`)
* **Indian Heritage Accent**: Restrained Indian Saffron / Amber (`#FF6B00`, `#F97316`)
* **Data / Signal Accent**: Cool Biometric Blue (`#0EA5E9`, `#38BDF8`)
* **Risk & Warning**: Forensic Crimson & Amber (`#EF4444`, `#F59E0B`)

### Typography
* **Display / Editorial Headers**: *Space Grotesk* / *Syne* / *Outfit* (Google Fonts)
* **UI / Data / Body**: *Plus Jakarta Sans* / *Inter*

### Motion & Micro-Interactions
* Motion-capture SVG skeleton animations, trigonometric joint angle calculations
* Scroll-triggered reveals, signal connection trails across Indian districts
* Custom desktop biometric crosshair cursor with contextual tags (`ANALYZE`, `INSPECT`, `EXPLORE`)
* Simulated offline/online status bar toggle with instant local storage queue flush

---

## 3. Technology Stack & Dependencies

* **Core**: React 18 + Vite (JavaScript / TypeScript)
* **Styling**: Tailwind CSS with custom design token extensions + CSS modules for custom skeleton animation
* **Icons**: `lucide-react`
* **Data Visualization**: `recharts` for audit graphs & analytics
* **Routing**: `react-router-dom` v6
* **State Management**: React Context + `localStorage` persistence layer for mock assessments, sync queues, and audit decisions.

---

## 4. User Review Required

> [!IMPORTANT]
> **Prototype Execution Strategy**:
> - All backend actions (AI video processing, database storage, offline queue sync, SAI audit verification) will be realistically simulated via client-side state engines and `localStorage`.
> - Demo data will be clearly tagged `DEMO DATA` / `SIMULATED ENVIRONMENT` for jury transparency.
> - The live assessment screen simulates an active pose estimation pipeline using real-time SVG vector joint tracking and mathematical rep counter logic.

---

## 5. Proposed Information Architecture & Component Hierarchy

```
src/
├── assets/                  # Brand vectors, stylized SVG maps
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Floating dynamic editorial navigation + system status indicator
│   │   ├── Footer.jsx       # Editorial stadium footer
│   │   ├── Cursor.jsx       # Custom biometric cursor
│   │   └── SyncBar.jsx      # Global Offline/Online status switch & sync queue status
│   ├── common/
│   │   ├── KhelScoreBadge.jsx # Geometric radial/polygon score indicator
│   │   ├── MetricCard.jsx   # Architectural non-card layout cards
│   │   └── RiskBadge.jsx    # Forensic audit risk indicator (Low/Med/High)
│   ├── assessment/
│   │   ├── PoseSkeleton.jsx # Dynamic SVG joint-and-bone visualization engine
│   │   ├── RepCounter.jsx   # Live telemetry dashboard
│   │   └── AssessmentModal.jsx # Completion summary & sync modal
│   └── maps/
│       └── IndiaMapSVG.jsx  # Interactive vector telemetry map of Indian districts
├── context/
│   ├── AssessmentContext.jsx # Local storage state for recordings & queue
│   └── SystemContext.jsx     # Connectivity state (Online/Offline simulator)
├── data/
│   ├── mockAthletes.js      # Grassroots athlete profiles (Aarav Patel, etc.)
│   ├── mockSubmissions.js   # Audit submission records with SHA256 hashes & GPS
│   └── mockAnalytics.js     # State-wise and performance dataset
├── pages/
│   ├── Home.jsx             # Award-level product launch & pipeline narrative
│   ├── Assessment.jsx       # Live AI testing environment (Push-ups & Sit-ups)
│   ├── Leaderboard.jsx      # National ranking console with state/district filters
│   ├── Platform.jsx         # System architecture & 6-stage offline pipeline
│   ├── Intelligence.jsx     # High-level analytics and state performance overview
│   ├── AthleteProfile.jsx   # Cinematic athlete showcase page
│   ├── LoginAthlete.jsx     # "Measure what you can become" portal
│   ├── LoginOfficial.jsx    # "Verify what the system sees" portal
│   ├── official/
│   │   ├── Dashboard.jsx    # SAI Official intelligence summary
│   │   ├── Submissions.jsx  # Filterable forensic audit submission list
│   │   ├── AuditDetail.jsx  # Frame-by-frame submission review & risk analysis
│   │   ├── ReviewQueue.jsx  # Fraud detection & anomaly queue
│   │   └── Analytics.jsx    # National athletic analytics dashboard
│   └── About.jsx            # SIH 25073 problem statement & vision
├── App.jsx                  # Main router setup
├── index.css                # Global design system tokens & animations
└── main.jsx
```

---

## 6. Detailed Page Breakdown & Features

### 1. Homepage (`/`)
- **Hero**: "TALENT IS EVERYWHERE. OPPORTUNITY ISN'T." Oversized typography, system status indicator `● KHELSETU INTELLIGENCE SYSTEM / ONLINE`, animated pose skeleton overlay.
- **The Problem Section**: Editorial comparison between traditional expensive sports lab testing vs KhelSetu smartphone accessibility.
- **Pipeline Section**: Interactive horizontal process: `MOVE` → `CAPTURE` → `ANALYZE` → `SCORE` → `VERIFY` → `CONNECT`.
- **Interactive Pose Simulator Teaser**: Live SVG pose node movement preview.
- **Offline Story Teaser**: "THE SIGNAL CAN DISAPPEAR. THE RECORD DOESN'T."
- **Fraud Detection Preview**: "PERFORMANCE SHOULD BE PROVABLE." Forensic hash verification showcase.
- **Grassroots India Map**: Interactive district heatmap of top assessments (Gujarat, Odisha, Bihar, etc.).

### 2. Live AI Assessment Environment (`/assessment`)
- Simulated camera view with grid overlay & SVG pose skeleton (23 keypoints).
- Controls: `START ASSESSMENT`, `PAUSE`, `RESET`, `TOGGLE EXERCISE` (Push-ups, Sit-ups).
- Live metrics: Rep Counter, Form Accuracy (94%), Joint Angle (86°), Cadence (1.8/sec), Movement State (DOWN / UP / READY).
- Dynamic skeleton motion simulation (moves smoothly when started).
- Post-assessment summary: Calculates KhelScore (e.g. 87.4) broken down by Strength, Form, Consistency, Cadence, and Reliability.
- Local Storage & Offline Sync trigger: "Saved locally · awaiting network" when offline, auto-synced when online.

### 3. SAI Official Console (`/official/*`)
- **Dashboard (`/official/dashboard`)**: Metric overview (Athletes, Total Assessments, Verified, Flagged for Review), recent submissions table, quick fraud alerts.
- **Submissions Table (`/official/submissions`)**: Searchable by Athlete ID/Name, district, test type, risk level, with status badges and action buttons.
- **Audit Detail (`/official/submissions/:id`)**: Video player simulator with pose overlay, interactive timeline scrub bar (00:00 to 00:08) updating rep angle graphs, SHA-256 hash match, device ID, GPS coordinates, audit decisions (Approve, Flag Fraud, Request Retest).
- **Fraud Review Queue (`/official/review`)**: Dedicated view for anomalous submissions (cadence spikes, duplicate hashes, timestamp drift).
- **Analytics (`/official/analytics`)**: Recharts data visualizations showing state rankings, age-group breakdown, and verification rates.

### 4. Leaderboard & Athlete Profiles (`/leaderboard`, `/athlete/profile`)
- **Leaderboard**: Top 3 podium highlights with gold/silver/bronze biometrics, state/district filters, test filters.
- **Athlete Profile (Aarav Patel)**: Cinematic stats sheet, performance trajectory over time, verified score history, shareable talent badge.

---

## 7. Verification & Quality Assurance Plan

### Automated Verification
- Run `npm run build` to verify clean production compilation without TypeScript or JSX errors.
- Check bundle performance and clean routing.

### Manual Verification
- Test all navigation links across navbar, footer, and inline CTAs.
- Verify simulated live assessment rep counting, skeleton movement, and local saving.
- Test offline toggle: Switch to OFFLINE, submit assessment -> verify it enters local offline queue; switch to ONLINE -> verify queue flushes with success toast.
- Verify SAI Official Audit workflow: Filter submissions, inspect detail view, scrub timeline, approve/reject flags.
- Verify mobile responsiveness and responsive navigation menu.

---

**Next Step**: Upon approval from the user, initialize Vite project, install dependencies, implement design system, build all pages and components, and launch the dev server.
