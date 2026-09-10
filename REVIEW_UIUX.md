# UI/UX Review — Windows XP Themed Interactive Portfolio

**Site reviewed:** `http://localhost:4321/newporto/`  
**Reviewer role:** UI/UX Expert  
**Date:** Generated from live browser inspection + source review  
**Scope:** 3D landing stage → Windows XP desktop → all primary windows → shutdown flow

---

## 1. Executive Summary

The portfolio delivers a strong nostalgic “wow” factor: a retro 3D workstation booting into a convincing Windows XP “Luna” desktop with Bliss wallpaper, authentic blue title bars, a Start Menu, taskbar, draggable/resizable windows, and case-study content. For an HR recruiter or hiring manager, it is immediately memorable and clearly showcases the candidate’s System Analyst + Dev + QA breadth.

However, several **Critical** and **Major** UX issues currently undermine the experience: the most serious is that a window control bug can leave users with **no way to restore a minimized window**; the requested **Search/Rover companion is not implemented at all**; and the entire desktop is **unusable on touch/mobile** because drag/resize relies exclusively on mouse events. A few content windows also feel unfinished (Dokumen Kerja has only one file, the Command Prompt did not respond to typed commands in testing, and some labels do not translate).

**Overall verdict:** High creative impact, but needs polish before it can be considered production-ready for recruiter audiences. The issues below are ordered by severity and include exact CSS/code suggestions.

---

## 2. Strengths

1. **Authentic Windows XP Luna chrome** — Title bars use the correct gradient `from-[#0058ee] via-[#3593ff] to-[#0058ee]`, rounded top corners, `#0055ea` border, and classic minimize/maximize/close controls. Scrollbars, menu bars, and taskbar styling all reinforce the theme.
2. **Strong first impression / wow factor** — The phosphor-green 3D workstation scene with a scrolling wireframe grid and CRT boot screen is distinctive. The zoom-into-monitor transition plus real startup WAV is a polished onboarding beat.
3. **Content depth in case-study windows** — The Internet Explorer reader and SDLC Lens dashboard contain substantial, HR-attractive material: metrics, code snippets, RACI matrices, test scenarios, and architecture diagrams.
4. **Bilingual scaffolding exists** — `data-id` / `data-en` attributes plus `applyLanguage()` toggle the Start button, desktop icon labels, and several UI strings between Indonesian and English correctly.
5. **Taskbar integration** — Open windows generate taskbar buttons; clicking a button toggles minimize/restore state, and active vs. inactive states are visually distinct.
6. **Certificate gallery UX** — Thumbnail reel, prev/next, zoom in/out/reset, and direct download give certificate viewing real utility.
7. **Branding boundary respected** — “DAMRI” branding appears only inside case-study windows/documents, never on OS chrome or preloader, matching the project’s own rules.

---

## 3. Issues

### 3.1 Critical

#### CR-1: Minimized windows can disappear from the taskbar (and may be mistaken for closed)
**Observed behavior:** During live testing, clicking the minimize button on `win-welcome` resulted in `data-state="closed"` and the window was removed from the taskbar entirely, leaving no restore path. The Start Menu can reopen it, but a recruiter may not know that.

**Root cause hypothesis:** The titlebar buttons are tiny and visually similar; on high-DPI or when the window is not at top z-index, click coordinates can land on the close button. More importantly, the minimize and close buttons have **no accessible labels or roles** beyond `title` attributes, so keyboard/screen-reader users cannot distinguish them either.

**Fix:**
- Add `aria-label` and visible press feedback to every titlebar control.
- Increase hit area to at least `24×24 px` (currently ~20×18 px).
- Ensure `updateTaskbar()` never reclassifies a `minimized` window as `closed`.

```astro
<button
  class="win-btn-minimize ... w-6 h-5 flex items-center justify-center"
  aria-label="Minimize"
  title="Minimize"
>
  <Minus class="w-2.5 h-2.5" aria-hidden="true" />
</button>
```

#### CR-2: The entire desktop is inaccessible on touch devices
**Observed / inferred:** All drag (`mousedown`/`mousemove`/`mouseup`) and resize logic is mouse-only. On a phone or tablet, users cannot move, resize, or reliably interact with windows. The 3D stage pointer handlers do support touch via `pointerevents`, but the desktop stage does not.

**Impact:** The site is effectively broken for mobile recruiters. The viewport meta also disables zoom (`user-scalable=no`), compounding the problem.

**Fix:** Add touch event listeners (or switch drag/resize to Pointer Events) and remove `user-scalable=no`.

```javascript
// In the titlebar drag block, mirror mouse handlers for touch:
titlebar.addEventListener('touchstart', onDragStart, { passive: false });
window.addEventListener('touchmove', onDragMove, { passive: false });
window.addEventListener('touchend', onDragEnd);

// Same for .win-resize-handle
```

```html
<!-- In Layout.astro or index.astro -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- remove maximum-scale=1.0, user-scalable=no -->
```

#### CR-3: Search / Rover companion is referenced in code but does not exist in the UI
**Observed:** The JavaScript queries `#rover-search-input`, `#rover-search-btn`, `#rover-speech`, and `#rover-results-list` (around line 2217 of `XpDesktop.astro`), but no such elements are rendered. The user explicitly asked for a review of this feature.

**Impact:** A promised/discoverable feature is completely missing; recruiters looking for a quick way to search skills/projects will not find it.

**Fix:** Either implement a Search window with Rover, or remove the dead JS. A minimal implementation:

```astro
<!-- Add to desktop icons -->
<div class="xp-desktop-icon ..." data-open="win-search">
  <div class="w-10 h-10 ..."><Search class="w-6 h-6 text-white" /></div>
  <span class="i18n" data-en="Search" data-id="Cari">Cari</span>
</div>

<!-- Window -->
<div id="win-search" class="xp-window ... hidden">
  <div class="xp-titlebar ...">Search Companion - Rover</div>
  <div class="p-4 bg-white">
    <div class="flex gap-2 mb-3">
      <input id="rover-search-input" type="text" class="flex-1 ..." placeholder="Search projects, skills, docs..." />
      <button id="rover-search-btn" class="...">Search</button>
    </div>
    <div id="rover-speech" class="text-xs text-slate-600 mb-2">Tulis kata kunci, Rover akan mencarikannya!</div>
    <div id="rover-results-list" class="space-y-1 max-h-48 overflow-y-auto">
      <!-- populate from a data array -->
    </div>
  </div>
</div>
```

### 3.2 Major

#### MAJ-1: Dokumen Kerja folder contains only a single file
**Observed:** The folder advertises “Daftar dokumen portofolio teknis dan artefak kerja” but only shows `CV_ATS_Andhika_Putra.doc`. The “Document Viewer” window exists but is empty until a document is loaded.

**Fix:** Populate the folder with additional real artifacts (SRS excerpt, BRD sample, test-case matrix, BPMN diagram) or reduce the folder’s scope to “CV & ATS Documents” so the promise matches the content.

#### MAJ-2: Command Prompt did not respond to typed commands in live testing
**Observed:** Typing `help` and `skills` and pressing Enter produced no output. The code at `XpDesktop.astro` lines 2746–2805 looks correct, suggesting the input may not have received focus/events via the test harness, or the Enter key event is not bubbling.

**Fix:** Confirm the input is focusable and the keydown listener fires. Add a visible focus ring and ensure the input keeps `autofocus` only when the window opens:

```javascript
(window as any).openWindow = function(winId) {
  // ... existing code ...
  if (winId === 'win-cmd') {
    setTimeout(() => {
      const input = document.getElementById('cmd-input');
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }, 100);
  }
};
```

Also add a quick on-screen hint and make the caret more visible on dark backgrounds.

#### MAJ-3: Windows open stacked at nearly identical coordinates
**Observed:** Multiple windows (`win-resume`, `win-docs-folder`, `win-doc-viewer`, `win-explorer`) opened on boot at overlapping positions (`top-8 left-32`, `top-12 left-36`, etc.), creating a messy initial state.

**Fix:** Cascade newly opened windows or center them. Maintain a simple offset counter:

```javascript
let openOffset = 0;
(window as any).openWindow = function(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  win.classList.remove('hidden');
  win.style.display = 'flex';
  win.dataset.state = 'open';
  const offset = (openOffset % 6) * 24;
  win.style.top = `${40 + offset}px`;
  win.style.left = `${80 + offset}px`;
  openOffset++;
  bringToFront(win);
  updateTaskbar();
};
```

#### MAJ-4: No keyboard focus management or visible focus indicators
**Observed:** Focusable elements (buttons, inputs, links) lack `focus-visible` rings. Opening a window does not move focus into it. The Start Menu, shutdown modal, and windows do not trap focus.

**Fix:** Add a global focus style and programmatic focus on open:

```css
@layer base {
  *:focus-visible {
    outline: 2px solid #facc15;
    outline-offset: 2px;
  }
}
```

When `openWindow()` is called, focus the first focusable element inside the window (or the titlebar for non-modal windows).

#### MAJ-5: Start Menu right column is not translated
**Observed:** Items “My Computer”, `E:\KERJA\DAMRI`, “SDLC Lens”, and “Outlook Express” in the right column lack `i18n` attributes, while the left column translates correctly.

**Fix:** Add `data-en` / `data-id` to those items or move them into the left column if they are primary actions.

### 3.3 Minor

#### MIN-1: Windows Media Player initial title mismatch
The initial screen text says “1. E U MIRACLE”, but earlier inspection showed “1. Lofi Girl - Chill Beats”. Keep the default track label in sync with the playlist.

#### MIN-2: WMP lacks a maximize button
While thematically acceptable, the inconsistent presence of only minimize/close in WMP breaks the window-management contract established by other windows.

#### MIN-3: Resume.doc “Lihat Sertifikat Asli” menu stays in Indonesian after EN toggle
Some menu strings in `win-resume` are hard-coded Indonesian. Wrap them with `.i18n` and add `data-en` / `data-id`.

#### MIN-4: Address bars use inconsistent paths
The My Computer window title says `C:\Documents and Settings\Andhika\Dokumen_Kerja\`, the address bar says `C:\Dokumen_Pribadi\Hasil_Kerja\`, and the Explorer shows `My Computer`. Align paths so the spatial metaphor feels consistent.

#### MIN-5: 3D scene text “> CLICK MONITOR TO POWER ON <” is small and low contrast
On mobile/high-resolution displays the boot CTA is hard to read. Increase font size and add a subtle glow/blink.

#### MIN-6: Desktop icons rely only on Lucide SVGs
They read as modern vector icons rather than the slightly glossy, shadowed XP-style bitmap icons. Consider adding small PNG assets or CSS highlights to increase nostalgia fidelity.

---

## 4. Specific Recommendations (with exact code)

### 4.1 Visual Consistency with Windows XP Luna

- **Titlebar buttons:** Use the classic XP order and colors: minimize `#2c7cfc`, maximize `#2c7cfc`, close `#e81123` — already correct. Add a subtle top highlight to each button to mimic the glossy XP look.

```css
.win-btn-minimize,
.win-btn-maximize,
.win-btn-close {
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 1px rgba(0,0,0,0.25);
}
```

- **Window shadows:** XP Luna windows have a soft shadow. Add `box-shadow: 4px 4px 12px rgba(0,0,0,0.35)` to `.xp-window`.
- **Menu bar separators:** Consider adding vertical separators between File/Edit/View to match WordPad/Explorer.

### 4.2 Typography & Readability

- Body text in windows is mostly `text-xs`/`text-[11px]`. Increase to `text-sm` for long paragraphs (e.g., case-study body) and reserve `text-xs` for metadata only.
- Use `line-height: 1.7` for reading-heavy windows (Resume, IE reader).

### 4.3 Window Management UX

1. **Fix minimize/restore as the top priority** (see CR-1).
2. **Add touch support** (see CR-2).
3. **Cascade windows** (see MAJ-3).
4. **Maximize restore:** Store previous dimensions in `data-prev-*` before maximizing — already implemented; verify it works after adding `overflow-hidden` and that the resize handle remains usable.

### 4.4 Desktop Icon Layout & Discoverability

- The 8 icons in a single left column can overflow vertically on small screens. Switch to a responsive grid:

```astro
<div class="relative z-10 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 w-max pointer-events-auto">
```

- Add a subtle label background (`bg-black/30 rounded px-1`) behind icon text to guarantee readability over the Bliss wallpaper.

### 4.5 Start Menu Usability

- Close the Start Menu automatically when any menu item is clicked (some items already do this; make it universal via a helper).

```javascript
function closeStartMenu() {
  startMenu?.classList.add('hidden');
  startMenu?.classList.remove('flex');
}
// Call closeStartMenu() inside every start-menu onclick handler
```

- Translate the right column (see MAJ-5).
- Add a hover/active state that mimics XP’s blue selection bar (already close; ensure it covers the full row).

### 4.6 Per-Window Content Quality

| Window | Verdict | Recommendation |
|--------|---------|----------------|
| **My Computer / Explorer** | Good | Add double-click support for drives; align address-bar paths. |
| **Resume.doc** | Strong | Translate remaining menu strings; add a “Download PDF” button. |
| **Dokumen Kerja** | Weak | Add real artifacts or reduce scope; fix empty Document Viewer on open. |
| **Gallery (Certificates)** | Strong | Add keyboard navigation (arrow keys) and a full-screen mode. |
| **Windows Media Player** | Good | Sync default track label; add maximize button; show loading state while YouTube API initializes. |
| **SDLC_Lens.exe** | Strong | Keep content; add a “Copy code snippet” button for the code blocks. |
| **Command Prompt** | Median | Fix focus/Enter handling; add tab-completion hints and a scrollback limit. |
| **Search (Rover)** | Missing | Implement or remove dead JS (see CR-3). |

### 4.7 Bilingual Support

- Wrap every user-facing string in `.i18n` with `data-id` and `data-en`.
- Add `lang="id"` / `lang="en"` to the `<html>` element when toggling to improve screen-reader pronunciation.

```javascript
function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('.i18n').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerHTML = text;
  });
  if (langBtn) langBtn.innerText = lang.toUpperCase();
}
```

### 4.8 Mobile Responsiveness

- Remove `user-scalable=no` and `maximum-scale=1.0`.
- For viewports below `640px`, disable drag/resize and instead:
  - Open windows full-width, full-height minus taskbar.
  - Use a swipeable bottom sheet for the Start Menu.
  - Stack desktop icons in 2 columns.

```css
@media (max-width: 640px) {
  .xp-window {
    width: 100vw !important;
    height: calc(100vh - 30px) !important;
    top: 0 !important;
    left: 0 !important;
  }
  .win-resize-handle { display: none; }
}
```

### 4.9 First Impression / Recruiter “Wow Factor”

- Keep the 3D boot scene; it is the strongest differentiator.
- Add a one-line value proposition under the name in Welcome.doc: *“I turn business requirements into tested, scalable systems.”*
- Move the strongest metric (e.g., IPK 3.73 / 4 books / TOEFL 640) into the Welcome.doc hero so it is visible without opening Resume.doc.

### 4.10 Accessibility

- Add `role="dialog"` and `aria-labelledby` to `.xp-window`:

```astro
<div
  id="win-welcome"
  class="xp-window ..."
  role="dialog"
  aria-labelledby="win-welcome-title"
>
  <div class="xp-titlebar ...">
    <span id="win-welcome-title">Welcome.doc - Microsoft WordPad</span>
  </div>
  ...
</div>
```

- Ensure all icon buttons have `aria-label`.
- Use semantic tables for the Projects table (already a `<table>` — good).
- Provide `alt` text for all certificate thumbnails (already present — good).
- Add a “skip to desktop” hidden link for keyboard users.

```html
<a href="#xp-desktop-space" class="sr-only focus:not-sr-only">Skip to desktop</a>
```

---

## 5. Priority Action List

| # | Action | Severity | Effort |
|---|--------|----------|--------|
| 1 | Verify and harden minimize/close button hit areas and taskbar restore | Critical | Small |
| 2 | Implement touch event support for drag/resize or disable drag on mobile | Critical | Medium |
| 3 | Remove `user-scalable=no` / `maximum-scale=1.0` | Critical | Tiny |
| 4 | Build or remove Search/Rover companion | Critical / Major | Medium |
| 5 | Fix Command Prompt focus/Enter handling | Major | Small |
| 6 | Cascade newly opened windows | Major | Small |
| 7 | Add focus management and focus-visible styles | Major | Small |
| 8 | Fill Dokumen Kerja with real artifacts or reduce scope | Major | Medium |
| 9 | Complete bilingual wrapping (right Start Menu column, Resume menu) | Minor | Small |
| 10 | Add keyboard navigation to certificate gallery | Minor | Small |
| 11 | Polish WMP default track label and add maximize | Minor | Small |

---

*End of review.*
