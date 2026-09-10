# Sprint Plan — Windows XP Themed Interactive Portfolio

**Sprint:** 1  
**Duration:** 2 weeks  
**Goal:** Fix the highest-friction recruiter conversion blockers while shipping the promised XP-style productivity features (Search Companion, tooltips, keyboard shortcuts, real CV download, and professional links) so the portfolio becomes a reliable, memorable hiring artifact.

**Prepared from:** `REVIEW_UIUX.md`, `QA_TEST_REPORT.md`, `PM_REVIEW.md`, plus requested features.  
**Note:** `E:/KODING/Porto/TREND_RESEARCH.md` was not found; the plan below synthesizes the available research, QA findings, and PM prioritization.

---

## 1. Sprint Goal

Make the Windows XP portfolio feel like a real, recruiter-friendly desktop: ship a working Search Companion (Rover), a one-click CV download, visible LinkedIn/GitHub links, keyboard shortcuts, icon tooltips, and a sticky-note Notepad, while fixing the critical bugs that currently break window management, mobile touch, and the cmd/shutdown reboot flow.

---

## 2. Prioritized User Stories

### P0 — Critical bugs & conversion blockers (must ship)

| ID | User Story | Why it matters |
|---|---|---|
| US-1 | As a recruiter, I want to download the CV as a PDF with one click so I can save and share it without opening multiple windows. | PM Review High Priority #1; PDF already exists in `public/documents/CV_ATS_Andhika_Putra_Pratama.pdf`. |
| US-2 | As a recruiter, I want LinkedIn and GitHub links in the Welcome, Resume, and Contact windows so I can verify the candidate's professional presence. | PM Review High Priority #2; currently only a placeholder URL exists. |
| US-3 | As a visitor, I want the Search Companion (Rover) window to exist and return results so the promised search feature actually works. | CR-3 / QA Bug 4; JS references missing DOM elements. |
| US-4 | As a visitor on a phone/tablet, I want to open and close windows using touch so the portfolio is usable on mobile. | UI/UX CR-2; mobile recruiters currently cannot interact with the desktop. |
| US-5 | As a visitor, I want minimize/close buttons to be large enough and clearly labeled so I do not accidentally close a window. | UI/UX CR-1; minimize can be mistaken for close. |

### P1 — Major UX / recruiter value (should ship)

| ID | User Story | Why it matters |
|---|---|---|
| US-6 | As a visitor, I want desktop icons to show XP-style tooltips on hover so I know what each icon opens before clicking. | PM Review Medium #9; requested feature. |
| US-7 | As a power user, I want keyboard shortcuts (Win/Cmd for Start, Esc to close, M to minimize, arrows for gallery) so I can navigate like a real OS. | PM Review Medium #8; requested feature; improves accessibility. |
| US-8 | As a visitor, I want a Run dialog (`Win + R`) so I can open windows or jump to external links by typing commands. | Requested feature; strengthens the System Analyst / power-user brand. |
| US-9 | As a visitor, I want sticky-note Notepad windows on the desktop so I can leave quick notes, mimicking a real XP Post-it. | Requested feature; adds warmth and interactivity. |
| US-10 | As a visitor, I want newly opened windows to cascade instead of stacking on top of each other so the desktop stays organized. | UI/UX MAJ-3; windows currently overlap at nearly identical positions. |

### P2 — Nice-to-have / brand delight (ship if time)

| ID | User Story | Why it matters |
|---|---|---|
| US-11 | As a visitor, I want a Recycle Bin icon so the desktop metaphor feels complete, and I can "trash" closed sticky notes. | Requested feature; low-effort XP authenticity. |
| US-12 | As a visitor, I want a simple XP game easter egg (e.g. Minesweeper or Pinball splash) for a moment of delight and nostalgia. | Requested feature; memorable shareability. |

---

## 3. Acceptance Criteria

### US-1 — Download CV button
- [ ] A "Download CV (PDF)" button appears in **Welcome.doc**, **Resume.doc**, and **Dokumen Kerja** windows.
- [ ] Clicking the button opens or downloads `public/documents/CV_ATS_Andhika_Putra_Pratama.pdf`.
- [ ] Button text switches between "Unduh CV (PDF)" and "Download CV (PDF)" when language toggles.
- [ ] No new console errors after clicking.

### US-2 — LinkedIn & GitHub links
- [ ] Real LinkedIn URL replaces the placeholder in `ContactSection.astro` and is exposed in **Resume** and **Contact** windows.
- [ ] GitHub URL is visible in **Resume**, **Contact**, and optionally **cmd.exe** `contact` command output.
- [ ] Links open in a new tab and use `rel="noopener noreferrer"`.
- [ ] i18n labels exist for both languages.

### US-3 — Search Companion (Rover)
- [ ] A `#win-search` window exists in the DOM with title "Search Companion - Rover".
- [ ] Desktop icon or Start Menu entry opens the window.
- [ ] Typing a keyword and pressing Enter (or clicking Search) filters a static index of skills, projects, and documents.
- [ ] Rover shows a friendly speech bubble/status line (e.g. "Tulis kata kunci, Rover akan mencarikannya!" / "Type a keyword and Rover will find it!").
- [ ] Results link to the relevant window when clicked.
- [ ] Existing dead JS references are either wired or removed.

### US-4 — Mobile / touch support
- [ ] Remove `user-scalable=no` / `maximum-scale=1.0` from viewport meta.
- [ ] Windows can be dragged and resized on touchscreens using Pointer Events or touch event fallbacks.
- [ ] On screens ≤640 px, windows open full-width, full-height minus taskbar, and resize handles are hidden.
- [ ] Desktop icons render in at least 2 columns on small screens.
- [ ] No horizontal scroll on mobile after boot.

### US-5 — Minimize / close button safety
- [ ] Titlebar control buttons are at least `24×24 px` hit area.
- [ ] Each button has `aria-label`, `title`, and visible pressed state.
- [ ] Clicking minimize sets `data-state="minimized"` and never `closed`.
- [ ] Taskbar button count matches the number of open/minimized windows.

### US-6 — Desktop icon tooltips
- [ ] Hovering any `.xp-desktop-icon` shows an XP-style tooltip with the icon label.
- [ ] Tooltip is readable over the Bliss wallpaper (semi-transparent background + border).
- [ ] Tooltip text respects current language (ID/EN).
- [ ] Touch devices show tooltip on long-press or not at all (no broken hover state).

### US-7 — Keyboard shortcuts
- [ ] `Win`/`Cmd` / `Ctrl + Esc` toggles the Start Menu.
- [ ] `Esc` closes the topmost open window (or the Start Menu if open).
- [ ] `M` minimizes the active window when focused on the desktop or a window.
- [ ] Left/Right arrow keys navigate certificate gallery when the gallery is active.
- [ ] `Enter` opens the focused desktop icon (with visible focus ring).
- [ ] Shortcuts do not interfere with typing inside `cmd.exe`, Notepad, or search inputs.

### US-8 — Run dialog
- [ ] `Win + R` opens a classic XP Run dialog.
- [ ] Typing a known command (e.g. `resume`, `linkedin`, `github`, `cmd`, `notepad`, `explorer`) opens the corresponding window/link.
- [ ] Unknown commands show an XP-style error balloon: "Windows cannot find 'x'. Make sure you typed the name correctly."
- [ ] Dialog can be closed via Esc, Cancel, or Enter.

### US-9 — Notepad sticky notes
- [ ] A Notepad desktop icon opens a new, untitled sticky note each time.
- [ ] Notes are draggable and resizable like other windows.
- [ ] Text is persisted for the session (optional: localStorage for the sprint if easy).
- [ ] Notes have a classic XP Notepad title bar and a monospaced font.

### US-10 — Window cascading
- [ ] Each newly opened window is offset by ~24 px from the previous one, up to a 6-step cascade, then it resets.
- [ ] Windows do not open at identical `(top, left)` coordinates.
- [ ] Restored minimized windows keep their last position (cascade only applies to fresh opens).

### US-11 — Recycle Bin (P2)
- [ ] Recycle Bin icon appears on the desktop.
- [ ] Dragging a sticky note onto the Recycle Bin removes it with a subtle sound/animation.
- [ ] Empty state shows an empty bin icon; non-empty state shows paper.

### US-12 — XP game easter egg (P2)
- [ ] A "Minesweeper" or "Pinball" desktop icon opens a simple game window.
- [ ] Game is playable enough to be fun for 30 seconds (Minesweeper 9×9 beginner grid recommended).
- [ ] Includes a small "About" line crediting the easter egg and linking back to the portfolio.

---

## 4. Task Breakdown per Role

### Fullstack Developer

#### P0 tasks
1. **Download CV button**: Add button in Welcome, Resume, and Dokumen Kerja; wire to existing PDF; wrap text with i18n.
2. **LinkedIn/GitHub links**: Replace placeholder in `ContactSection.astro`; add links to Resume/Contact/cmd output.
3. **Search Companion (Rover)**: Create `#win-search` window, wire existing JS references or remove dead code, build static index of skills/projects/docs, render results list, add speech/status bubble.
4. **Touch support**: Convert drag/resize to Pointer Events (or add touch fallbacks), update viewport meta, add mobile window sizing.
5. **Minimize/close safety**: Enlarge hit areas to 24×24 px, add `aria-label` + `title`, harden `updateTaskbar()` logic.

#### P1 tasks
6. **Desktop icon tooltips**: Add tooltip element, position on hover/focus, style XP Luna-style chrome, respect i18n.
7. **Keyboard shortcuts**: Global keydown listener for Start toggle, Esc, M, arrows; manage focus so typing inputs are not hijacked.
8. **Run dialog**: Build `Win + R` dialog, command routing, error state.
9. **Notepad sticky notes**: Create Notepad window template, add desktop icon, handle multiple instances, session persistence.
10. **Window cascading**: Track open offset, apply cascade on `openWindow()`.

#### P2 tasks
11. **Recycle Bin**: Add icon, implement drag-and-drop deletion for notes, empty/full icon states.
12. **XP game easter egg**: Build a minimal Minesweeper grid or a static Pinball splash; add desktop icon.

### QA Engineer

#### P0 tasks
1. Verify CV download works in Chrome, Firefox, Safari, mobile Safari.
2. Verify LinkedIn/GitHub links open correct URLs and use safe target/rel.
3. Test Rover search: empty query, partial match, no-match state, result click opens correct window.
4. Regression-test touch drag/resize on a real phone/tablet or browser dev-tools touch emulation.
5. Regression-test minimize/close on high-DPI and mobile viewports; confirm taskbar state consistency.

#### P1 tasks
6. Validate tooltips appear on hover, are readable, and update on language toggle.
7. Validate keyboard shortcuts across Windows/Mac and verify inputs are not blocked.
8. Validate Run dialog commands and error handling.
9. Validate Notepad notes: create multiple, drag/resize, type, refresh persistence.
10. Validate window cascading across multiple opens and minimize/restore cycles.

#### P2 tasks
11. Test Recycle Bin drag-drop on desktop and mobile.
12. Test game easter egg basic playability and no console errors.

### UI/UX Designer

#### P0 tasks
1. Specify CV button placement, color, and i18n label copy in Welcome/Resume/Dokumen Kerja.
2. Provide LinkedIn/GitHub iconography and placement specs (ensure icons look native to XP Luna).
3. Design the Search Companion (Rover) window: layout, speech bubble, result item styling, empty state.
4. Annotate touch targets and mobile breakpoint behavior.
5. Provide corrected titlebar button specs (24×24 hit area, pressed states, ARIA labels).

#### P1 tasks
6. Design desktop icon tooltip component (XP Luna yellow tooltip, positioning, long-press fallback).
7. Document keyboard shortcut map and focus-ring styling.
8. Design Run dialog to match XP Luna chrome (`%windir%\system32\shell32.dll` Run icon style).
9. Design Notepad window and sticky-note behavior (default size, font, color).
10. Provide cascade offset grid and safe area guidelines.

#### P2 tasks
11. Design Recycle Bin empty/full icons and drag-drop affordance.
12. Design game easter egg splash and window chrome.

---

## 5. Definition of Done

A user story is considered Done when **all** of the following are true:

1. **Functionality:** All acceptance criteria for the story are met.
2. **Theme fidelity:** New UI matches Windows XP Luna chrome (gradients, title bars, shadows, buttons) and does not look like a generic modern component.
3. **Bilingual support:** All new user-facing strings have `.i18n` wrappers with both `data-id` (Indonesian) and `data-en` (English).
4. **Accessibility:** New interactive elements have `aria-label`/`aria-labelledby`, focus-visible rings, and sensible tab order.
5. **No regressions:** Existing tests from `QA_TEST_REPORT.md` still pass (window drag/resize, minimize/restore, close, taskbar, start menu, shutdown, gallery zoom, language toggle, cmd commands).
6. **Mobile sanity:** Feature is usable at 360 px width and 768 px width without horizontal overflow or broken layout.
7. **No new console errors:** No `console.error` or unhandled exceptions during the happy path or common error paths.
8. **QA sign-off:** QA has executed the story's test cases and updated the test report.
9. **PM sign-off:** PM has verified recruiter conversion value and copy accuracy.

---

## 6. Risks / Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Rover search window requires creating new DOM and wiring existing dead JS; unknown JS references may conflict. | High | Timebox to 1 day; if wiring becomes fragile, fall back to removing dead code and implementing a clean new search module. |
| Mobile drag/resize refactor may break desktop mouse behavior. | High | Use Pointer Events for unified handling; keep mouse listeners as fallback; run full window-management regression suite. |
| `cmd.exe` desktop icon click is already broken (QA Bug 1); same root cause may affect new desktop icons. | Medium | Audit desktop-icon click delegation before adding new icons (Notepad, Run, Recycle Bin, game). |
| Shutdown → reboot path is broken (QA Bug 2); mobile viewport changes may interact with stage re-initialization. | Medium | Fix reboot path before or alongside mobile changes; add an explicit smoke test for click-monitor-after-shutdown. |
| Adding many new windows (Run, Notepad, Rover, game) may clutter initial desktop. | Low | Do not auto-open new windows on boot; keep them as desktop icons and Start Menu entries only. |
| P2 items (Recycle Bin, game) could consume the second week and push P1 items out. | Medium | P2 items are gated: only start them when all P0/P1 stories are Done and QA-signed. |
| i18n copy may not be available for all new strings. | Low | Use existing translator pattern; placeholder English is acceptable for P2 but not for P0/P1. |

---

## 7. Suggested Order of Implementation (Impact vs. Effort)

### Week 1 — Foundation + Conversion

Focus on fixes that unblock recruiters and make the site trustworthy.

| Order | Story | Effort | Impact | Notes |
|---|---|---|---|---|
| 1 | US-5 Minimize/close safety | Tiny | High | Quick win; prevents data-loss-like frustration. |
| 2 | US-1 Download CV button | Small | Very High | Direct recruiter conversion. |
| 3 | US-2 LinkedIn/GitHub links | Small | Very High | Professional trust signals. |
| 4 | US-3 Search Companion (Rover) | Medium | High | Promised feature; high discoverability. |
| 5 | US-10 Window cascading | Small | Medium | Immediate visual polish, unblocks multi-window work. |
| 6 | US-4 Mobile / touch support | Medium | High | Largest audience expansion; do early while window code is fresh. |

### Week 2 — Delight + Power-User Brand

Ship the System Analyst/QA/Dev power-user features that make the portfolio memorable.

| Order | Story | Effort | Impact | Notes |
|---|---|---|---|---|
| 7 | US-6 Desktop icon tooltips | Small | Medium | Low effort, improves discoverability. |
| 8 | US-7 Keyboard shortcuts | Small | Medium | Reinforces desktop metaphor; good for accessibility demos. |
| 9 | US-8 Run dialog | Small | Medium | Strong brand fit for a System Analyst. |
| 10 | US-9 Notepad sticky notes | Medium | Medium | Adds warmth and "real OS" feel. |
| 11* | US-11 Recycle Bin | Small | Low | Only if P0/P1 are done. |
| 12* | US-12 XP game easter egg | Medium | Low | Only if P0/P1 are done; Minesweeper beginner grid recommended. |

\* P2 — gated on P0/P1 completion and available QA bandwidth.

### Rationale for ordering

- **High impact, low effort first:** CV download, LinkedIn/GitHub, and minimize safety are the fastest recruiter wins.
- **High impact, medium effort next:** Rover search and mobile touch unlock large user value but need solid implementation time.
- **Theme-deepening last:** Tooltips, keyboard shortcuts, Run, Notepad, Recycle Bin, and the game prove the "I can build a real OS-like experience" narrative, but they matter only after the core conversion path works.

---

## 8. Sprint Success Metrics

| Metric | Target |
|---|---|
| P0 stories completed | 5/5 |
| P1 stories completed | ≥4/5 |
| QA pass rate | ≥95% |
| New console errors | 0 |
| Mobile smoke test (360 px) | Pass |
| Lighthouse Accessibility score | ≥90 |

---

*End of Sprint Plan.*
