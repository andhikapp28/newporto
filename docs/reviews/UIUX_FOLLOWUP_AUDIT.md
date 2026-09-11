# UI/UX Follow-Up Audit — Windows XD Desktop Portfolio

**Auditor:** Principal UI/UX Designer (recruiter / executive-facing portfolios, retro OS parodies)  
**Date:** 2025-09-11  
**Scope:** Interactive Windows XD desktop at `http://localhost:4321/newporto/`  
**Audiences simulated:** Non-technical HR Director, busy technical recruiter, Executive Director / CTO with 60 seconds.  
**Deliverable type:** Action-oriented follow-up audit with P0 / P1 / P2 priorities and redesign mocks.

---

## 1. Executive Summary

The Windows XD desktop is a visually faithful, technically impressive retro OS parody. For a recruiter or executive landing cold, however, the experience still has three critical friction points:

1. **The 3D boot theatre is a mandatory gate** — even with the “Recruiter Fast-Track” skip, the user must decode a 3D monitor scene before reaching credentials.
2. **The desktop is over-stuffed** — 16 icons plus a Start Menu create choice paralysis for a 60-second executive scan.
3. **The flagship fast-track modal wastes its own promise** — every project card’s CTA does the exact same thing (`openWindow('win-projects')`), so a recruiter cannot actually fast-track into the right evidence.

The good news: the component architecture already supports the fixes. The audit below maps concrete, file-level changes that preserve nostalgia while making the site defensible in a C-suite / HR context.

---

## 2. Discoverability — Can They Find the Executive Summary in 60 Seconds?

### 2.1 Current first-run flow

1. Preloader (2.2 s) → 2. 3D workstation → 3. Click/tap monitor → 4. Boot sound + zoom → 5. Desktop + Welcome.doc.

A first-time HR Director has no reason to believe clicking a 3D CRT monitor will reveal a résumé. The scene is delightful for a developer audience but is a **discoverability tax** on executives.

### 2.2 Existing affordances

- **Top-right floating button** `⚡ Recruiter Fast-Track` is excellent, but it is a small 11 px mono pill that visually competes with the 3D CRT text (“CLICK MONITOR TO POWER ON”).
- **CRT screen itself** gives a clear instruction to power on, but the instruction is “boot the OS”, not “see the candidate summary”.
- After boot, desktop icon 0 is `⚡ Fast-Track` with a red `NEW` badge — this is discoverable *if* the user reaches the desktop.

### 2.3 Judgment

**Verdict:** Moderate discoverability, but the 3D scene is still a second or two of ambiguity that a CTO/HR director should not pay. The fast-track skip should be the **primary, not secondary**, call-to-action on the 3D stage.

### 2.4 Recommended changes

| Priority | Change | Rationale |
|----------|--------|-----------|
| **P0** | Make the 3D stage’s primary CTA a **centered, high-contrast “View Executive Summary” button** that bypasses the monitor-click animation entirely. Keep the monitor as a decorative “Explore Workstation” secondary path. | Removes the “do I click the monitor?” ambiguity for business users. |
| **P0** | On first boot, auto-open `win-fasttrack` instead of `win-welcome` when the user arrives from the fast-track path. | The promise of the button must match the destination. |
| **P1** | Add a **persistent “Recruiter Fast-Track” Start Menu pin** and a matching taskbar quick-launch button so the summary is always one tap away. | Gives HR a safety net if they close the modal. |
| **P1** | Add a subtle text cue on the 3D stage: `“Skip intro → view credentials”` underneath the monitor. | Catches users who did not see the floating pill. |
| **P2** | Keep the boot animation as an optional “Experience the workstation” toggle, but default it to skipped for returning sessions. | Returning recruiters should land straight on the desktop. |

---

## 3. Desktop Icon Audit — Minimal Executive-Friendly Layout

### 3.1 Current icon inventory

There are **16 desktop icons** rendered in `src/components/XpDesktop.astro` (lines ~191–406):

1. `⚡ Fast-Track` (NEW badge)
2. `Welcome.doc`
3. `Case Studies (E:)`
4. `Resume.doc`
5. `CV_ATS.pdf`
6. `Work Docs`
7. `Certificates`
8. `My Computer`
9. `SDLC_Lens.exe`
10. `Media Player`
11. `cmd.exe`
12. `Search`
13. `Notepad`
14. `Recycle Bin`
15. `Taskmgr.exe`
16. `Paint.exe`
17. `Minesweeper`
18. `Turn Off PC`

(Note: desktop grid is `grid-rows-6` / `grid-rows-8` and flows column-wise, so the visual order is column-major.)

### 3.2 Problem

Sixteen icons is roughly **3× the cognitive load** a busy recruiter can scan in 10 seconds. Many icons are toy apps (Paint, Minesweeper, Media Player, Notepad, Recycle Bin, Taskmgr) that dilute the executive signal. `My Computer` is redundant because the same drives appear inside `Work Docs` and the Start Menu.

### 3.3 Proposed minimal desktop (7 icons)

Keep only the **credential and evidence** icons on the desktop. Move everything else to the Start Menu or context menu.

| Keep on desktop | Icon | Destination window | Why it stays |
|-----------------|------|--------------------|--------------|
| 1 | `⚡ Recruiter Fast-Track` | `win-fasttrack` | The executive front door. |
| 2 | `Case Studies (E:)` | `win-projects` / IE reader | Proves breadth of work. |
| 3 | `CV_ATS.pdf` | `win-pdf-viewer` | Direct ATS download. |
| 4 | `Resume.doc` | `win-resume` | Narrative CV. |
| 5 | `Work Docs` | `win-docs-folder` | Dossier evidence. |
| 6 | `Certificates` | `win-gallery` | Verifiable credentials. |
| 7 | `SDLC_Lens.exe` | `win-sdlc` | Differentiator for technical evaluators. |

### 3.4 Icons to remove or relocate

| Icon | Disposition | Rationale |
|------|-------------|-----------|
| `Welcome.doc` | **Remove** or merge into `⚡ Fast-Track` / `Resume.doc` | Repeats the same intro text; adds icon noise. |
| `My Computer` | **Move to Start Menu** | Duplicate of drive navigation already inside Work Docs / Explorer. |
| `Media Player` | **Move to Start Menu / easter-egg only** | Fun, but signals “game” not “hire me”. |
| `cmd.exe` | **Move to Start Menu** | Power-user feature; not executive-facing. |
| `Search` | **Move to Start Menu / taskbar** | Global search belongs in the taskbar or Start Menu. |
| `Notepad` | **Move to Start Menu** | Visitors don’t need a scratchpad. |
| `Recycle Bin` | **Move to Start Menu / remove** | Decorative; no real executive value. |
| `Taskmgr.exe` | **Move to Start Menu** | Cute overload metaphor, but not credential evidence. |
| `Paint.exe` | **Move to Start Menu** | Toy app; undermines professionalism on first scan. |
| `Minesweeper` | **Move to Start Menu / easter-egg only** | Same as Media Player. |
| `Turn Off PC` | **Keep only in Start Menu / shutdown modal** | A shutdown icon on the desktop is an exit trap, not a feature. |

### 3.5 Layout mock (text)

```text
[⚡ Fast-Track]     [Case Studies (E:)]   [CV_ATS.pdf]
[Resume.doc]        [Work Docs]            [Certificates]
[SDLC_Lens.exe]
```

- Arrange as a **single column on mobile**, two columns on tablet, three columns on desktop.
- Increase icon hit target to at least **48 × 48 px** (currently ~40 px).
- Increase label contrast and add a subtle shadow so labels remain readable on Bliss wallpaper.

---

## 4. Executive_Summary.exe — Per-Card Action Redesign

### 4.1 Current bug

In `src/components/XpDesktop.astro` lines ~549–639, every project card ends with:

```html
<button onclick="openWindow('win-projects')" class="xp-btn text-[10px] font-bold shrink-0">Open Spec &rarr;</button>
```

This is a **broken promise**: the card describes a specific project, but the button opens the generic project list. A recruiter tapping three different cards gets the same window. This violates the UX principle of **predictable outcomes**.

### 4.2 Proposed redesigned fast-track modal

Keep the top section (profile, metrics, triad advantage) unchanged. Redesign the **Flagship Enterprise Case Studies** list as an **evidence command center** with three distinct action types per card:

1. **Read in IE** — opens the full case-study article in `win-ie-reader` for that project.
2. **SDLC Lens** — opens `win-sdlc` pre-filtered to that feature.
3. **Download Dossier** — opens/view the relevant `.doc` / `.xlsx` evidence from `Work Docs`.

### 4.3 New card structure (mock)

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Dynamic Multi-Tier Approval Workflow Engine   [Core ERP]             │
│    Dynamic Threshold Routing, Pjs Delegation, 24h SLA, SHA-256 Ledger │
│    [Read in IE]  [SDLC Lens]  [↓ Dossier: SRS + QA Matrix]              │
├─────────────────────────────────────────────────────────────────────────┤
│ 2. Aplikasi PUMK Financial Core                  [BUMN TJSL]            │
│    UMKM financing, lockForUpdate race mitigation, SSO integration       │
│    [Read in IE]  [SDLC Lens]  [↓ Dossier: SRS PUMK + SIT/UAT]          │
├─────────────────────────────────────────────────────────────────────────┤
│ ...                                                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Required file-level actions

| Card | New primary action | Implementation note |
|------|--------------------|---------------------|
| 1 Approval Engine | `openWindow('win-ie-reader')` + show `ie-article-approval-workflow-engine` | The IE reader already renders all articles; just remove `hidden` from the right one. |
| 2 PUMK | `openWindow('win-ie-reader')` + show `ie-article-damri-pumk-system` | Same pattern. |
| 3 Payment Reconciliation | `openWindow('win-ie-reader')` + show `ie-article-payment-reconciliation-engine` | Same pattern. |
| 4 Seat Lock | `openWindow('win-sdlc')` + set `<select>` value to `seatlock` | Matches the SDLC Lens option. |
| 5 Fleet Telematics | `openWindow('win-ie-reader')` + show `ie-article-fleet-telematics-fuel-anomaly-engine` | Same pattern. |
| 6 Push Request Tracker | `openWindow('win-ie-reader')` + show `ie-article-damri-push-request-tracker` | Same pattern. |

For **dossier downloads**, reuse the existing `openSampleDoc(docKey)` function with the corresponding key:

| Card | Dossier CTA | `docKey` |
|------|-------------|----------|
| 1 Approval Engine | “↓ SRS + 42-Scenario QA Matrix” | `srs-approval-engine` + `sit-approval-engine` |
| 2 PUMK | “↓ SRS PUMK + SIT/UAT Matrix” | `srs-pumk` + `sit-uat-matrix` |
| 3 Payment Recon | “↓ SRS + Recon Model” | `srs-payment-recon` + `sit-payment-recon` |
| 4 Seat Lock | “↓ SRS Seat Lock Spec” | `srs-seatlock` |
| 5 Fleet Telematics | “↓ SRS + IoT QA Matrix” | `srs-telematics` + `sit-telematics` |
| 6 Push Request | “↓ TAD Push Request” | `tad-pushrequest` |

### 4.5 Fast-track bottom action bar update

Current bottom bar (line ~644) has three buttons: `Read ATS CV`, `Launch SDLC Lens`, `Contact`.

Add a **fourth “Download Complete Dossier (ZIP)”** primary button that triggers a download/archive of the `Daftar Porto/` folder, or opens `Work Docs` focused on the `00_MASTER_INDEX_PORTFOLIO_EVIDENCE` card.

---

## 5. Information Hierarchy & List Consistency

### 5.1 Broken numbering in Executive Summary

In `src/components/XpDesktop.astro` lines ~542–639, the project list is numbered `1, 2, 3, 4`, then a full-width **“Complete Business Dossier Ready for Executive & HR Audits”** callout is inserted, then numbering resumes with `5, 6`.

This is exactly the anti-pattern asked about: a new item was appended in the middle of a numbered sequence. For an HR director skimming quickly, this reads as “there are 4 projects, plus an ad, plus 2 more projects” rather than “6 projects + a dossier.”

### 5.2 Recommended re-grouping

Restructure the modal body into three clearly separated groups:

```text
A. LEADERSHIP SCORECARD (unchanged)
   - Metrics row
   - Triad advantage

B. FLAGSHIP ENTERPRISE CASE STUDIES (1–6)
   - 1. Approval Engine
   - 2. PUMK Financial Core
   - 3. Payment Reconciliation
   - 4. Seat Lock Engine
   - 5. Fleet Telematics
   - 6. Push Request Tracker

C. AUDIT DOSSIER (separate callout, not interrupting the list)
   - “Complete Business Dossier Ready for Executive & HR Audits”
   - CTA: Open Work Docs / Download master index
```

This restores **contiguous numbering**, separates the dossier meta-message from the case-study list, and gives the dossier its own visual frame.

### 5.3 Other list-consistency issues

- The `Work Docs` folder uses inconsistent ordering: items are labeled 1, 2, 3, 4, 5, 6, 10, 11, 13, 14, 12, 9, 10 in source order (lines ~1034–1302). The display sequence jumps around because the markup order is non-sequential. Re-order the markup so the visual flow is 1–N left-to-right, top-to-bottom.
- The SDLC Lens `<select>` (lines ~2011–2019) lists 7 features with inconsistent naming: some include “Engine”, some do not. Standardize to `{#}. {Project Name} — {Domain}`.

---

## 6. Language Consistency (ID / EN)

### 6.1 Current state

The app has an i18n switcher (EN ↔ ID), but many strings are **hard-coded** in one language, producing mixed-language windows depending on the user’s selection. This is especially jarring for international recruiters who expect a fully English experience.

### 6.2 Exact mixed-language strings found

| Location | String | Issue | Proposed fix |
|----------|--------|-------|--------------|
| `win-contact` subject input | `Konsultasi Arsitektur Sistem / Peluang Karir - Andhika Putra Pratama` | Indonesian default in an otherwise English Outlook form. | Set default to English; translate via `data-en` / `data-id` attributes when language toggled. |
| `win-resume` section headings | `PROFIL PROFESIONAL`, `PENDIDIKAN FORMAL`, `PENGALAMAN KERJA RELEVAN`, `SERTIFIKASI KOMPETENSI`, `PUBLIKASI BUKU RESMI (BER-ISBN)` | Hard-coded Indonesian headings in the Resume window. | Make them `i18n` spans or replace with English defaults and translate. |
| `win-resume` body text | Large paragraphs in Indonesian (e.g., “Lulusan Teknik Informatika...”) | Entire professional profile is Indonesian-only. | Provide English default; translate to ID via `data-id`. |
| `win-resume` contact block | `Telepon: 0812-7255-5407`, `Lampung Selatan, Lampung, Indonesia` | “Telepon” is ID; city/country are fine. | Change to `Phone` / `Tel` with ID variant. |
| `win-gallery` certificate meta | `Penerbit: {issuer} • Tanggal: {date}` | Hard-coded Indonesian labels. | Make `Issuer:` / `Date:` with ID variants. |
| `win-cmd` helper text | `Ketik <span class="text-white font-bold">help</span> untuk daftar perintah` | Indonesian instruction in EN mode. | Translate via `i18n` span. |
| `win-search` Rover speech | `Woof! Menemukan dokumen & proyek terkait ...` | Indonesian fallback in search results speech. | Use `i18n` data attributes. |
| `win-pdf-viewer` title / status | `Halaman 1 dari 1 • 100%` only has ID variant; English shown by default but structure is fragile. | Both variants exist, but many static labels are not swapped. | Audit every `.i18n` element and ensure all static text has `data-en` + `data-id`. |
| Start Menu / desktop | Some labels have mismatched `data-en`/`data-id` lengths or missing attributes. | e.g., `Curriculum Vitae` vs `Resume / CV` cause label truncation. | Normalize label pairs to similar length. |
| Brand / faux-legal | `Microcok`, `Windowsxd`, `Sangat Memuaskan` vs `Cum Laude`, `IPK` vs `GPA` | Mixed brand/locale terms. | Keep `Microcok` as the parody brand, but localize academic terms: EN = “GPA 3.73 / 4.00 (High Distinction)”, ID = “IPK 3.73 / 4.00 (Sangat Memuaskan)”. |

### 6.3 Systemic recommendation

Add a **lint step** (or a simple script) that scans `XpDesktop.astro` for text nodes inside markup that are not wrapped in an `.i18n` element or do not have `data-en` + `data-id`. This prevents regression every time a new window is added.

---

## 7. Mobile / Touch Usability

### 7.1 Current state

`src/styles/global.css` lines ~491–547 adds mobile rules, and `ThreeComputerScene.astro` includes touch thresholds. The attempt is good, but several elements remain mis-tappable.

### 7.2 Critical touch issues

| Element | Current size / behavior | Problem | Fix |
|---------|------------------------|---------|-----|
| Taskbar height | `30px` fixed | Too short for thumbs; conflicts with mobile browser chrome. | Increase to **44–48 px** on mobile; keep 30 px on desktop for nostalgia. |
| Desktop icons | `w-10 h-10` (~40 px) | Below the 44 × 44 px WCAG 2.5.5 minimum target. | Use **48 × 48 px** icons with **8 px** spacing on touch. |
| Window controls (min/max/close) | `21 × 21 px` | Very hard to hit on phones. | Minimum **32 × 32 px** on mobile. |
| Resize handle | `16 × 16 px` | Almost impossible to grab with a finger. | Disable resize on mobile; use a **maximize** button instead. |
| Start Menu | Two-column split at small widths | Cramped, text wraps, easy to mis-tap. | Switch to a **single full-width column** on < 640 px. |
| Volume popup | `w-32` absolute positioned | May overflow right edge on small screens. | Anchor to the right with `right-2` and cap width. |
| IE reader / PDF windows | Default `w-[95vw]` | Already mostly OK, but the inner PDF sheet `scale()` transform can overflow the viewport. | Clamp `max-width: 100%` and remove horizontal transform overflow. |
| Desktop `overflow-y: auto` | Allows page scroll | On phones this can cause the whole desktop to scroll while the user is trying to drag a window. | Disable page scroll when a window is active; allow only window-body scroll. |
| 3D scene drag vs. tap | Touch drag threshold = 12 px | A slight finger wobble can be interpreted as a drag, preventing boot. | Increase drag threshold to **18–24 px** on touch, and add a visible “Tap to power on” hotspot overlay. |

### 7.3 Recommended mobile-first rules to add

```css
@media (max-width: 640px) {
  #xp-taskbar { height: 44px; }
  #xp-desktop-space { padding-bottom: 44px; }
  .xp-desktop-icon { min-width: 48px; min-height: 48px; }
  .xp-desktop-icon span { font-size: 12px; }
  .win-btn-minimize, .win-btn-maximize, .win-btn-close { width: 32px; height: 32px; }
  .win-resize-handle { display: none; }
  #xp-start-menu { flex-direction: column; }
}
```

---

## 8. Anime.js Micro-Animations (XP-Era Compatible)

The project does not currently use anime.js. The ask is to recommend **2–3 specific, subtle animations** that improve affordance without breaking nostalgia.

### 8.1 Recommended animations

1. **Taskbar startup “slide & settle” (anime.js)**
   - On `xp:boot-desktop`, the taskbar translates from `translateY(100%)` to `translateY(0%)` with a `cubic-bezier(0.2, 0.8, 0.2, 1)` easing over **350 ms**, then bounces slightly.
   - **Why:** Reassures the user that the OS has loaded and draws attention to the Start button.

2. **Window open/close scale-fade (anime.js)**
   - When `openWindow()` is called, animate the target `.xp-window` from `opacity: 0; scale: 0.96` to `opacity: 1; scale: 1` over **200 ms**.
   - On close, reverse to `opacity: 0; scale: 0.96` over **150 ms**.
   - **Why:** Gives spatial continuity; makes the desktop feel responsive.

3. **Desktop icon hover “lift” (CSS + anime.js optional)**
   - On hover: `translateY(-2px)` + `scale(1.05)` with a soft shadow, over **120 ms**.
   - **Why:** Improves affordance that icons are clickable without neon distractions.

4. **Fast-track pulse (anime.js loop)**
   - The `⚡ Fast-Track` desktop icon and the floating top-right skip button get a gentle `box-shadow` pulse (`0 0 0 0 rgba(245, 158, 11, 0.4)` → `0 0 0 8px rgba(245, 158, 11, 0)`) every **2 s**.
   - **Why:** Signals the intended first action to HR/executive users.

5. **Boot window sequence (anime.js timeline)**
   - Chain: preloader bars → desktop fade-in → Welcome / Fast-Track window open → taskbar slide.
   - **Why:** Replaces the current instant `hidden` toggles with a polished XP-era “things are loading in order” narrative.

### 8.2 What to avoid

- No bouncing cartoons, no particle bursts, no full-screen flips.
- Animations should be **< 400 ms** and use `transform` / `opacity` only to avoid layout thrash.

---

## 9. Prioritized Fix Matrix

| ID | Priority | Area | Fix | Effort | Files touched |
|----|----------|------|-----|--------|---------------|
| P0-1 | P0 | Discoverability | Make the 3D stage’s primary CTA bypass to `win-fasttrack`; keep monitor as secondary. | Small | `ThreeComputerScene.astro` |
| P0-2 | P0 | Fast-track modal | Replace every generic `Open Spec ->` button with per-card actions: Read in IE / SDLC Lens / Download Dossier. | Medium | `XpDesktop.astro` (lines ~549–639) |
| P0-3 | P0 | Information hierarchy | Re-group Executive Summary so case studies are numbered 1–6 contiguously and the dossier callout sits in its own section. | Small | `XpDesktop.astro` (lines ~542–641) |
| P0-4 | P0 | Mobile | Increase taskbar to 44 px, icon targets to 48 px, window controls to 32 px on mobile. | Small | `global.css`, `XpDesktop.astro` |
| P1-1 | P1 | Desktop icons | Reduce desktop to 7 executive-focused icons; move toys to Start Menu. | Medium | `XpDesktop.astro` (icon grid) |
| P1-2 | P1 | Language | Add `i18n` wrappers / `data-en`+`data-id` for all hard-coded strings in Resume, Contact, Gallery, CMD, Search. | Medium | `XpDesktop.astro` |
| P1-3 | P1 | Mobile | Disable resize handle on mobile; make Start Menu single-column; fix volume popup overflow. | Small | `global.css`, `XpDesktop.astro` |
| P1-4 | P1 | Animations | Add anime.js taskbar slide, window scale-fade, and fast-track pulse. | Medium | New inline script / module in `XpDesktop.astro` |
| P2-1 | P2 | Discoverability | Persist “skip intro” preference for returning users. | Small | `localStorage` in `ThreeComputerScene.astro` |
| P2-2 | P2 | Work Docs | Re-order `Work Docs` cards sequentially (1–N). | Small | `XpDesktop.astro` (lines ~1034–1302) |
| P2-3 | P2 | SDLC Lens | Standardize feature names in `<select>` and sync with fast-track CTAs. | Small | `XpDesktop.astro` (line ~2011) |
| P2-4 | P2 | Animations | Add desktop icon hover lift and boot timeline polish. | Small | `global.css` / anime.js |
| P2-5 | P2 | Quality gate | Add a simple i18n lint script to prevent mixed-language regressions. | Small | New dev-only script |

---

## 10. Mock Description — Redesigned Executive_Summary.exe

### 10.1 Layout (markdown wireframe)

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ ⚡ Executive_Summary.exe — Leadership & Architectural Scorecard      ─ □ ✕    │
├────────────────────────────────────────────────────────────────────────────┤
│  [FAST-TRACK]  60-Second Overview for Recruiters & Directors    [ATS Resume]│
├────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Andhika Putra Pratama, S.Kom.  •  Senior System Analyst            │    │
│  │ ITERA • GPA 3.73/4.00 • TOEFL 640 • Available for Hire             │    │
│  │ [Contact Direct]  [Send Message]                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  HARD BUSINESS IMPACT                                                       │
│  ┌────────┐ ┌──────────┐ ┌─────────────┐ ┌──────────────┐                │
│  │  40+   │ │ <48 Hours│ │     0%      │ │    100%      │                │
│  │Systems │ │Lead Time │ │Concurrency │ │Audit Ready   │                │
│  └────────┘ └──────────┘ └─────────────┘ └──────────────┘                │
│                                                                             │
│  THE TRIAD ADVANTAGE                                                        │
│  [SA] [Dev] [QA] — same as current                                          │
│                                                                             │
│  FLAGSHIP ENTERPRISE CASE STUDIES                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 1. Dynamic Multi-Tier Approval Engine                       [Core ERP]│   │
│  │    Dynamic routing, Pjs delegation, 24h SLA, SHA-256 ledger          │   │
│  │    [Read in IE] [SDLC Lens] [↓ Dossier]                              │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │ 2. PUMK Financial Core                                       [BUMN]   │   │
│  │    UMKM financing, lockForUpdate race mitigation, SSO                 │   │
│  │    [Read in IE] [SDLC Lens] [↓ Dossier]                              │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │ 3. Payment Reconciliation & Settlement Engine            [FinTech]   │   │
│  │    3-way matching, SNAP BI auto-healing, D+1 cutoff                  │   │
│  │    [Read in IE] [SDLC Lens] [↓ Dossier]                              │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │ 4. Seat Lock & Distributed Reservation Engine         [Concurrency]│   │
│  │    10k req/s, Redis SETNX mutex, 0% double booking                   │   │
│  │    [Read in IE] [SDLC Lens] [↓ Dossier]                              │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │ 5. Fleet Telematics & Fuel Anomaly Engine                [IoT/Logistics]│
│  │    1,500 buses, CAN-bus J1939, Kalman filter, Rp 4.2B savings       │   │
│  │    [Read in IE] [SDLC Lens] [↓ Dossier]                              │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │ 6. Push Request Audit & Deploy Tracker                    [DevOps]   │   │
│  │    GitHub webhooks, live diff, transparent audit trail              │   │
│  │    [Read in IE] [SDLC Lens] [↓ Dossier]                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 📁 COMPLETE BUSINESS DOSSIER — Ready for Executive & HR Audits       │   │
│  │ Download .docx SRS, .xlsx models, and SIT/UAT matrices.                │   │
│  │    [Open Work Docs]  [↓ Download Master Index]                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Ready to proceed?                                                      │   │
│  │ [Read ATS CV] [Launch SDLC Lens] [Send Message] [↓ Full Dossier]       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Button semantics per card

- **Read in IE** → `openWindow('win-ie-reader')` + show the matching `ie-article-{id}`.
- **SDLC Lens** → `openWindow('win-sdlc')` + set `sdlc-feature-select.value` to the matching feature key.
- **↓ Dossier** → `openSampleDoc('{docKey}')` for the primary spec; consider opening a small dossier tray instead of jumping straight to text.

---

## 11. Mock Description — Minimal Executive Desktop

### 11.1 Desktop icon grid (recommended markup)

```astro
<div id="xp-desktop-icons-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
  <!-- 1. Executive fast-track -->
  <div class="xp-desktop-icon ..." data-open="win-fasttrack">⚡ Recruiter Fast-Track</div>

  <!-- 2. Evidence folders -->
  <div class="xp-desktop-icon ..." data-open="win-projects">Case Studies (E:)</div>
  <div class="xp-desktop-icon ..." data-open="win-docs-folder">Work Docs</div>
  <div class="xp-desktop-icon ..." data-open="win-gallery">Certificates</div>

  <!-- 3. Candidate documents -->
  <div class="xp-desktop-icon ..." data-open="win-pdf-viewer">CV_ATS.pdf</div>
  <div class="xp-desktop-icon ..." data-open="win-resume">Resume.doc</div>

  <!-- 4. Technical differentiator -->
  <div class="xp-desktop-icon ..." data-open="win-sdlc">SDLC_Lens.exe</div>
</div>
```

### 11.2 Relocated items

All removed icons should appear in the Start Menu under a new section:

```text
Start ▸ Programs
  System Tools
    • cmd.exe
    • Task Manager
    • Search Companion
    • System Properties
    • Display Properties
  Accessories
    • Notepad
    • Paint
    • Windows Media Player
    • Minesweeper
  Power
    • Turn Off Computer
```

---

## 12. Implementation Order Recommendation

**Week 1 (highest impact)**
1. P0-1 — Add explicit “View Executive Summary” CTA on 3D stage.
2. P0-2 — Fix per-card actions in `win-fasttrack`.
3. P0-3 — Re-number / re-group case-study list and dossier callout.
4. P0-4 — Mobile touch targets.

**Week 2 (polish & consistency)**
5. P1-1 — Reduce desktop icons.
6. P1-2 — Wrap remaining hard-coded strings in i18n.
7. P1-3 — Mobile Start Menu / resize / volume fixes.

**Week 3 (delight)**
8. P1-4 — Add anime.js micro-animations.
9. P2 items — persistence, re-order Work Docs, SDLC naming, lint script.

---

## 13. Appendix — Exact Code Pointers

| Finding | File | Line(s) |
|---------|------|---------|
| All project cards use identical `Open Spec ->` CTA | `src/components/XpDesktop.astro` | ~549, ~559, ~572, ~585, ~598, ~625, ~638 |
| Broken numbering: dossier callout interrupts 1–6 list | `src/components/XpDesktop.astro` | ~601–613 |
| 16 desktop icon definitions | `src/components/XpDesktop.astro` | ~191–406 |
| Fast-track skip floating button | `src/components/ThreeComputerScene.astro` | ~15–24 |
| i18n switcher + missing wrappers | `src/components/XpDesktop.astro` | ~3485–3528 |
| Hard-coded Indonesian resume headings | `src/components/XpDesktop.astro` | ~855–941 |
| Hard-coded Indonesian gallery labels | `src/components/XpDesktop.astro` | ~1536–1538 |
| Mixed-language CMD helper | `src/components/XpDesktop.astro` | ~2066 |
| Mobile CSS rules | `src/styles/global.css` | ~515–547 |
| Window management functions | `src/components/XpDesktop.astro` | ~3091–3365 |

---

*End of audit. For questions about specific implementation patterns (e.g., wiring the IE reader to the fast-track cards), open a follow-up design-dev handoff session.*
