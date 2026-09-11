# QA Verification Report: Windows XP Interactive Portfolio
**System:** Windows XP Luna-Themed Interactive Portfolio (Astro v7 + Tailwind CSS v4 + Three.js)  
**Audit Date:** 2026-09-11  
**Lead QA Auditor:** Lead QA Engineer  
**Target Environments:**
- Static Output: `E:/KODING/Porto/dist/`
- Live Preview Server: `http://localhost:4321/newporto/`
- Automated Test Harness: Python 3.11 + Chrome CDP / Browser Use CLI

---

## Executive Summary

An automated end-to-end quality and functional audit was executed across the Windows XP interactive portfolio. The audit encompassed static asset analysis, Content Collection integrity checks, DOM parsing of production builds, computed style evaluation, pointer event simulations, and live browser functional testing.

All **5 core audit pillars** passed verification with zero critical, high, or medium defects remaining.

| Audit Pillar | Scope | Test Cases | Status | Pass Rate |
| :--- | :--- | :---: | :---: | :---: |
| **1. Content Collection Integrity** | Markdown schema, frontmatter, build outputs for 3 projects | 6 | ✅ PASSED | 100% |
| **2. Core Desktop Integration** | Case Studies table, SDLC Lens, Work Docs, cmd.exe, Rover | 12 | ✅ PASSED | 100% |
| **3. Mobile Responsiveness & Touch** | `touch-action: none`, `100dvh`, fixed taskbar, Pointer Events | 7 | ✅ PASSED | 100% |
| **4. Asset & Link Integrity** | All `href`, `src`, CSS `url()`, JS assets in `dist/` | 78 | ✅ PASSED | 100% |
| **5. Bilingual Architecture (i18n)** | 188 `.i18n` elements, placeholders, Default English rule | 8 | ✅ PASSED | 100% |
| **Total** | **Comprehensive Full-Spectrum Quality Audit** | **111** | ✅ **PASSED** | **100%** |

---

## Pillar 1: Content Collection Integrity

### 1.1 Project Source & Schema Adherence
All three portfolio projects are configured in `src/content/projects/` and strictly validated against the Zod schema defined in `src/content.config.ts`:
- `title`: String
- `description`: String
- `client`: String
- `role`: String
- `period`: String
- `category`: String
- `featured`: Boolean
- `tags`: Array of strings
- `metrics`: Array of `{ label, value }`

| Project ID | Markdown Source | Title | Client | Role | Metrics Value |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `approval-workflow-engine` | `src/content/projects/approval-workflow-engine.md` (12.9 KB) | Dynamic Multi-Tier Approval Workflow & Delegation Engine | PT Nusantara Transindo (Persero) — Holding Logistik & Multimoda | Lead System Analyst & Solution Architect | `14 Hari → <48 Jam` |
| `damri-pumk-system` | `src/content/projects/damri-pumk-system.md` (3.9 KB) | Aplikasi PUMK (Program Pendanaan Usaha Mikro & Kecil) — Perum DAMRI | Perum DAMRI (BUMN Transportasi) | System Analyst & Full-Stack Developer | `100% Passed` |
| `damri-push-request-tracker` | `src/content/projects/damri-push-request-tracker.md` (2.6 KB) | Sistem Informasi IT & GitHub Push Audit Tracker — Perum DAMRI | Divisi Teknologi Informasi — Perum DAMRI | Lead Developer & System Analyst | `100% Tercatat` |

### 1.2 Static Compilation & HTML Structure in `dist/projects/`
Each project compiles into a standalone, fully self-contained HTML page under `dist/projects/<id>/index.html`. All generated files contain valid HTML structures (`<!DOCTYPE html>`, `<html lang="en">`, `<head>`, `<body>`, and closing `</html>`):

1. **`dist/projects/approval-workflow-engine/index.html`**
   - Size: 33,320 bytes
   - Document Title: `Dynamic Multi-Tier Approval Workflow & Delegation Engine - Microsoft Internet Explorer`
   - IE6 Browser Chrome: Titlebar, Back-to-Desktop button (`/newporto/`), Address Bar (`http://internal.analyst.corp/specs/approval-workflow-engine.html`), Full Markdown body rendered.
2. **`dist/projects/damri-pumk-system/index.html`**
   - Size: 19,885 bytes
   - Document Title: `Aplikasi PUMK (Program Pendanaan Usaha Mikro & Kecil) — Perum DAMRI - Microsoft Internet Explorer`
   - IE6 Browser Chrome: Back link to `/newporto/`, Full Markdown body rendered.
3. **`dist/projects/damri-push-request-tracker/index.html`**
   - Size: 15,986 bytes
   - Document Title: `Sistem Informasi IT & GitHub Push Audit Tracker — Perum DAMRI - Microsoft Internet Explorer`
   - IE6 Browser Chrome: Back link to `/newporto/`, Full Markdown body rendered.

---

## Pillar 2: Core Desktop Integration & Feature Verification

### 2.1 Case Studies Table (`win-projects`)
- **Row Detection:** `dist/index.html` renders all 3 projects inside `table tbody` with `data-project-id` attributes:
  - `data-project-id="approval-workflow-engine"`
  - `data-project-id="damri-pumk-system"`
  - `data-project-id="damri-push-request-tracker"`
- **Interaction Test:** Clicking the `approval-workflow-engine` row triggers the in-desktop Internet Explorer 6 window, removes `.hidden` from `#ie-article-approval-workflow-engine`, and updates `#ie-address-bar` to `http://internal.local/specs/approval-workflow-engine.html`.
- **Verdict:** ✅ PASSED.

### 2.2 SDLC Lens Dropdown & Datasets (`win-sdlc`)
- **Dropdown Options:** `#sdlc-feature-select` lists all 5 architectural case studies:
  1. `pumk` — PUMK - Mitra Unique ID & Concurrency Control
  2. `push` — Push Request - GitHub Audit & Deployment Tracking
  3. `enterprise-docs` — Enterprise Portfolio - 40+ Systems Specs & SIT/UAT Governance
  4. `approval-engine` — Multi-Tier Approval & Delegation Engine (Core ERP Architecture)
  5. `seatlock` — Seat Lock Engine - High-Concurrency Reservation & Race Condition Mitigation
- **Dataset Depth:** `sdlcData['approval-engine']` comprises 18.5 KB of technical specifications across all three roles:
  - **Analyst Lens:** Financial Authority Threshold Matrix (Tiers 1 to 7 matching Perpres 16/2018 & BUMN GCG), Pejabat Sementara (Pjs) Delegation Rules (Strict Hierarchy Vector, 30-day auto-expiry, dual-identity audit trail), BPMN 2.0 flow.
  - **Developer Lens:** Finite State Machine transition table (DRAFT -> SUBMITTED -> UNDER_REVIEW -> APPROVED -> EXECUTED -> REJECTED / ESCALATED), optimistic locking version check, Merkle cryptographic audit hash chain, Redis Sentinel 24h SLA timers.
  - **QA Rigor:** Comprehensive 42 SIT/UAT test scenario breakdown, concurrency collision validation, rollback SOP.
- **Tab Switching Test:** Successfully toggled views between `data-view="analyst"`, `data-view="dev"`, and `data-view="qa"` with active state transitions and zero render lag.
- **Verdict:** ✅ PASSED.

### 2.3 Work Docs Folder (`win-docs-folder`)
- **Document Entries:** Verified the presence of both new specification documents inside the Work Docs Explorer window:
  - `SRS_Approval_Workflow_Engine.doc` (Category: `Core ERP / SA`, Click action: `openSampleDoc('srs-approval-engine')`)
  - `SIT_UAT_Approval_Engine_Matrix.doc` (Category: `QA Rigor`, Click action: `openSampleDoc('sit-approval-engine')`)
- **Document Viewer Integration:**
  - Invoking `openSampleDoc('srs-approval-engine')` loads 4,230 characters of formal ISO/IEC/IEEE 29148 specification into `#doc-viewer-content` inside `win-doc-viewer` (WordPad).
  - Invoking `openSampleDoc('sit-approval-engine')` loads 3,301 characters of the 42-scenario SIT/UAT execution matrix and quality gate criteria into `#doc-viewer-content`.
- **Verdict:** ✅ PASSED.

### 2.4 Terminal Command Interpreter (`cmd.exe`)
- **Command Evaluation:** Entering `approval` or `simulate-approval` executes the interactive simulation.
- **Trace Output:** Generates an authentic 8-step execution trace:
  1. Header: `=== PT Nusantara Transindo Approval Engine v2.0 ===`
  2. Requisition: `> Submitting Requisition #REQ-2026-0891: Capex Pengadaan 5 Bus Listrik (Rp 8.500.000.000)...`
  3. Rule Engine: `> Rule Engine: Threshold requires 6-Tier Approval (Staff → Spv → Mgr → GM → VP → Director)`
  4. Delegation Check: `> Delegation Check: GM Ops is ON_LEAVE → Auto-proxying to Pjs GM (Budi Santoso, S.T.)`
  5. Concurrency Guard: `> Concurrency Guard: Optimistic Locking version [v1] verified → Lock Acquired`
  6. Cryptographic Ledger: `> Cryptographic Ledger: Merkle Hash [a8f9c... → 3e11b...] chained into tamper-evident block`
  7. SLA Sentinel: `> SLA Sentinel: 24h timer armed. Auto-escalation trigger scheduled at T+24h`
  8. Final Status: `> Status: PENDING PJS GM APPROVAL • System Integrity: 100% PASSED ✓`
- **Help Documentation:** The `help` command in `cmd.exe` explicitly lists `approval` alongside core system commands.
- **Verdict:** ✅ PASSED.

### 2.5 Rover Search Companion
- **Search Index Entries:** Three items indexed in `roverIndex`:
  1. `id: 'approval-engine-sdlc'` (Type: `project`, opens `win-sdlc` and auto-selects `approval-engine`)
  2. `id: 'doc-srs-approval'` (Type: `document`, opens `SRS_Approval_Workflow_Engine.doc`)
  3. `id: 'doc-sit-approval'` (Type: `document`, opens `SIT_UAT_Approval_Engine_Matrix.doc`)
- **Interactive Search Test:**
  - Query: `"approval"`
  - Speech Bubble: `"Woof! Found documents & projects related to "approval"!"`
  - Results Rendered: 3 cards matching the query.
  - Click Action: Clicking the SDLC result cleanly launches `win-sdlc` with the Approval Engine dataset pre-selected.
- **Verdict:** ✅ PASSED.

---

## Pillar 3: Mobile Responsiveness & Touch Handling

### 3.1 CSS Properties & Viewport Units
Computed CSS evaluation confirmed adherence to mobile specifications:
- **`100dvh` Viewport Sizing:**
  - `#xp-desktop-container`: `h-[100dvh]`, computed height matches actual window inner height (e.g. `625px`), preventing mobile browser URL bar jump.
  - `#xp-desktop-space`: `h-[calc(100dvh-30px)]` with `padding-bottom: 30px`.
  - `#xp-start-menu`: `max-h-[calc(100dvh-35px)]` and `max-w-[calc(100vw-8px)]`.
- **Fixed Taskbar:**
  - `#xp-taskbar`: `position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; width: 100vw !important; height: 30px !important; z-index: 9999 !important;`
  - Prevents scrolling away on smaller viewports.
- **Touch Action Suppression:**
  - `.xp-titlebar`: `touch-action: none; -webkit-user-select: none; user-select: none;`
  - `.win-resize-handle`: `touch-action: none;`
  - Completely eliminates accidental pull-to-refresh or page panning during window manipulation.

### 3.2 Pointer Events & Touch Simulation
Window dragging and resizing rely on modern W3C Pointer Events rather than legacy mouse-only events:
- **Pointer Down / Capture:** Captures `e.pointerId` using `setPointerCapture` on drag/resize initiation.
- **Pointer Move / Up / Cancel:** Global listeners ensure continuous tracking even if pointer leaves window bounds or system cancels interaction.
- **Automated Verification:**
  - **Touch Drag Test:** Dispatched synthetic touch pointer events (`pointerId: 1`, `pointerType: 'touch'`) to move window from `(100, 100)` to `(150, 130)`. Verified final coordinates `left: 150px`, `top: 130px` (✅ PASS).
  - **Touch Resize Test:** Dispatched synthetic touch pointer events (`pointerId: 2`, `pointerType: 'touch'`) on `.win-resize-handle` to resize window from `400x300` to `460x340`. Verified final geometry `460x340` (✅ PASS).

---

## Pillar 4: Link Integrity & Asset Resolution

### 4.1 HTML Document Reference Audit
An exhaustive scan of all `href`, `src`, and `url(...)` attributes across `dist/index.html` and the three project pages was conducted.
- **Total References Scanned:** 62
- **External Links (Safe / Ignored):** YouTube API, GitHub, LinkedIn, Pearson, Coursera, Google Fonts.
- **Internal Relative Links:** 100% resolved to existing files in `dist/`.
- **Broken References:** **0**

### 4.2 Script & Dynamic Asset Resolution
- **Script Bundles:**
  - `/newporto/_astro/ThreeComputerScene.astro_astro_type_script_index_0_lang.ByEndMdr.js` (Exists: True)
  - `/newporto/_astro/XpDesktop.astro_astro_type_script_index_0_lang.Dj-xq6mV.js` (Exists: True)
- **CSS Bundles:**
  - `/newporto/_astro/x.BxxSfF5g.css` (Exists: True, 0 broken URLs)
- **Dynamic Assets in JavaScript:**
  - Wallpapers: `autumn.svg`, `azul.svg`, `classic.svg`, `redmoon.svg` (All exist)
  - Sounds: `xp-startup.wav`, `xp-shutdown.wav` (All exist)
  - Certificates: `certificate_1.jpg` through `certificate_8.jpg` (All exist)
  - Documents: `CV_ATS_Andhika_Putra_Pratama.pdf` (Exists)
  - Images: `bliss.jpg` (Exists)
- **Base URL Fix Landed:** Corrected `<link rel="icon" ...>` in `src/layouts/Layout.astro` from hardcoded `/favicon.svg` to `${base}/favicon.svg`. Production builds now cleanly reference `/newporto/favicon.svg`.

---

## Pillar 5: Bilingual Architecture (i18n)

### 5.1 Element Structure & Default English Rule
Every user-facing label in the desktop interface was audited for strict compliance with the internationalization system:
- **Total `.i18n` Elements Audited:** 188
- **Missing `data-en`:** 0
- **Missing `data-id`:** 0
- **Server-Rendered Content Flash Audit:** 0 discrepancies. In all 188 elements, initial server-rendered `innerText` precisely matches `data-en`. Initial visitors never experience Indonesian text flash before hydration.

### 5.2 Input Placeholder Bilingual Support
Two user-input elements were audited and standardized:
1. **Rover Search Input (`#rover-search-input`):**
   - `data-en-placeholder`: `"e.g.: resume, approval, PUMK, Python, NIK, SLA..."`
   - `data-id-placeholder`: `"contoh: resume, approval, PUMK, Python, NIK, SLA..."`
   - Default Initial `placeholder`: Matches `data-en-placeholder`.
2. **Contact Form Message (`#win-contact textarea`):**
   - `data-en-placeholder`: `"Hello Andhika, I reviewed your System Analyst portfolio..."`
   - `data-id-placeholder`: `"Halo Andhika, saya melihat portofolio System Analyst Anda..."`
   - Default Initial `placeholder`: Matches `data-en-placeholder`.

### 5.3 Live Language Toggle Verification
The bilingual engine was exercised live in the browser via `window.applyLanguage`:
1. **Initial State (`en`):**
   - `document.documentElement.lang`: `'en'`
   - Start Button: `'start'`
   - SRS Card Desc: `'Dynamic Threshold Routing, Pjs Delegation & 24h SLA Timer'`
   - SIT Card Desc: `'42 Test Scenarios, Concurrency Conflicts & Rollback SOP'`
2. **Switched to Indonesian (`id`):**
   - `document.documentElement.lang`: `'id'`
   - Start Button: `'mulai'`
   - SRS Card Desc: `'Routing Plafon Dinamis, Delegasi Pjs & Timer SLA 24 Jam'`
   - SIT Card Desc: `'42 Skenario Pengujian, Konflik Konkurensi & SOP Rollback'`
   - Placeholders: Swapped dynamically to Indonesian text.
3. **Restored to English (`en`):**
   - All labels, tooltips, taskbar titles, and placeholders seamlessly reverted to English.
- **Verdict:** ✅ PASSED.

---

## Final QA Sign-Off & Verification Verdict

| Verification Item | Requirement | Result |
| :--- | :--- | :---: |
| 1. Content Collection Integrity | All 3 projects exist, compile, and output valid HTML in `dist/projects/` | ✅ **VERIFIED** |
| 2. Case Studies Integration | All 3 projects listed in table and interactive | ✅ **VERIFIED** |
| 3. SDLC Lens Dataset | Approval Engine present in dropdown with Analyst, Dev, QA perspectives | ✅ **VERIFIED** |
| 4. Work Docs Specifications | `SRS_Approval_Workflow_Engine.doc` and `SIT_UAT_Approval_Engine_Matrix.doc` load in viewer | ✅ **VERIFIED** |
| 5. Terminal Simulation | `cmd.exe` interpreter supports `approval` command with full 8-step pipeline trace | ✅ **VERIFIED** |
| 6. Rover Search Companion | Indexes approval engine across SDLC lens, SRS, and SIT matrix | ✅ **VERIFIED** |
| 7. Mobile Responsiveness | `100dvh`, fixed taskbar, `touch-action: none`, Pointer Events drag & resize | ✅ **VERIFIED** |
| 8. Asset & Link Integrity | Zero broken links or missing script references in `dist/` | ✅ **VERIFIED** |
| 9. Bilingual Architecture | 188 `.i18n` elements conform to Default English rule; placeholders toggle cleanly | ✅ **VERIFIED** |

**Final Recommendation:** **APPROVED FOR DEPLOYMENT / PRODUCTION RELEASE.**
