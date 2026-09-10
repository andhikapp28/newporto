# QA Test Plan – New Features
## Andhika's Windows XP Portfolio

**Document Version:** 1.0  
**Date:** 2025-01-28  
**Author:** QA / CodeBuddy  
**Scope:** Validate all newly implemented features (Tooltips, Search Companion/Rover, Notepad Sticky Notes, Run Dialog, Keyboard Shortcuts, Recycle Bin, Download CV, LinkedIn/GitHub links) plus targeted regression of existing Windows XP portfolio behaviors.

---

## 1. Test Objectives

1. Confirm that each new feature launches, renders, and behaves as designed across supported browsers and viewport sizes.
2. Verify that new features integrate cleanly with the existing Windows XP UI metaphor (boot, desktop, taskbar, start menu, windows, shutdown).
3. Ensure keyboard accessibility and mouse interaction paths are functional.
4. Detect regressions in existing core features after the new-feature code merge.
5. Validate external links and the downloadable CV asset for correctness and availability.
6. Provide a repeatable, traceable set of test cases for pre-release sign-off.

---

## 2. Test Environment

### 2.1 Supported Browsers

| Browser | Minimum Version | Priority |
|---------|----------------|----------|
| Google Chrome | Latest stable | High |
| Mozilla Firefox | Latest stable | High |
| Microsoft Edge | Latest stable | High |
| Safari (macOS) | Latest stable | Medium |
| Mobile Chrome (Android) | Latest stable | Medium |
| Mobile Safari (iOS) | Latest stable | Medium |

### 2.2 Local Preview URL

```
http://localhost:3000/
```

> Replace port with the actual dev server port if different (e.g., `5173`, `8000`, `8080`).

### 2.3 Test Devices / Viewports

- Desktop: 1920×1080, 1366×768, 1440×900
- Tablet: 768×1024 (portrait & landscape)
- Mobile: 375×667, 390×844
- Keyboard-only navigation
- Touch emulation in DevTools

### 2.4 Prerequisites

- Local dev server is running and accessible at the local preview URL.
- CV file (e.g., `Andhika-CV.pdf`) is present in the expected public/assets directory.
- LinkedIn and GitHub profile URLs are known and publicly accessible.
- Browser cache is cleared or hard-refresh is used between test passes.

---

## 3. Feature-by-Feature Test Cases

### 3.1 Tooltips

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| TTP-001 | Tooltip appears on desktop icon hover | Desktop is visible with at least one icon. | Hover mouse over a desktop icon for ~500 ms. | A tooltip appears near the cursor showing the icon's label or description. | High |
| TTP-002 | Tooltip text is accurate | Desktop icons rendered. | Hover over each desktop icon and read tooltip text. | Tooltip text matches the associated icon's name/action. | High |
| TTP-003 | Tooltip disappears on mouse out | Tooltip is currently visible. | Move mouse away from the icon. | Tooltip disappears cleanly without ghosting. | High |
| TTP-004 | Tooltip positioning does not overflow viewport | Browser window resized to 375×667. | Hover icons located at screen edges and corners. | Tooltip repositions so it remains fully visible; no horizontal scrollbar. | Medium |
| TTP-005 | Rapid hover does not stack tooltips | Desktop visible. | Quickly move mouse across multiple icons. | Only one tooltip is visible at a time; no overlapping tooltips. | Medium |
| TTP-006 | Tooltip on taskbar/start button | Taskbar rendered. | Hover over Start button and taskbar items. | Relevant tooltips appear (if designed). | Low |

### 3.2 Search Companion / Rover

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| ROV-001 | Rover/Search Companion window opens | Desktop or Start menu available. | Click the Search Companion icon or use the configured trigger. | A Search Companion panel/window opens, displaying the Rover mascot and a search input. | High |
| ROV-002 | Search accepts user text | Search Companion is open. | Click the search field and type a valid query (e.g., "project"). | Text is entered; no console errors. | High |
| ROV-003 | Search returns relevant results | Search Companion is open; content index exists. | Type a known keyword and submit (Enter or click Search). | Results list updates to show matching items with title/description. | High |
| ROV-004 | Empty search handling | Search Companion is open. | Leave the field empty and click Search / press Enter. | Rover displays a friendly prompt such as "Please type something to search for." No crash. | Medium |
| ROV-005 | No-results state | Search Companion is open. | Type a nonsensical query (e.g., "xyz12345nope"). | Rover shows a "No results found" message or equivalent. | Medium |
| ROV-006 | Close Search Companion | Search Companion is open. | Click the X / close button. | Panel closes; desktop state returns to normal. | High |
| ROV-007 | Rover animation/prompt feedback | Search Companion is open. | Perform a search and observe Rover. | Rover animates or changes prompt text during/after search. | Low |
| ROV-008 | Search result click navigates | Results are displayed. | Click a search result. | User is taken to the relevant project/gallery section or external URL. | High |

### 3.3 Notepad Sticky Notes

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| STK-001 | Open Notepad sticky note | Desktop or Start menu available. | Double-click the Notepad/Sticky Notes icon or select from Start menu. | A new sticky-note window opens with a text area. | High |
| STK-002 | Type text into note | Note window open. | Click text area and type sample text. | Typed text appears in the note body. | High |
| STK-003 | Note window can be moved and resized | Note window open. | Drag title bar; resize via corner (if supported). | Window moves and resizes as expected without content loss. | Medium |
| STK-004 | Close a single note | Note window open. | Click the X / close button. | Note closes; if unsaved, a confirmation dialog appears (if implemented). | High |
| STK-005 | Open multiple notes | Desktop visible. | Open two or more note windows. | Each note is independent; focus switches correctly. | Medium |
| STK-006 | Note persistence across reload | Persistence implemented. | Type text, save (if applicable), reload the page. | Previously saved note content is restored. | Medium |
| STK-007 | Note z-index / focus behavior | Multiple notes open. | Click between overlapping notes. | Active note rises to top; inactive notes dim or stay behind. | Low |
| STK-008 | Clear all notes (if feature exists) | Multiple notes open. | Trigger "Clear all" action. | All notes close/reset with confirmation. | Low |

### 3.4 Run Dialog

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| RUN-001 | Open Run dialog via Start menu | Desktop/taskbar visible. | Click Start → Run. | Run dialog window appears with an input field and OK/Cancel buttons. | High |
| RUN-002 | Open Run dialog via keyboard shortcut | Desktop focused. | Press `Win + R`. | Run dialog appears and input field is focused. | High |
| RUN-003 | Execute a valid command | Run dialog open; command map configured. | Type a known internal command (e.g., `notepad`, `explorer`, `chrome`) and press Enter / click OK. | The associated application/window opens. | High |
| RUN-004 | Invalid command handling | Run dialog open. | Type an unrecognized command (e.g., `foobar`) and press Enter. | A friendly error message is shown; no crash. | Medium |
| RUN-005 | Cancel closes dialog | Run dialog open. | Click Cancel or press Escape. | Dialog closes without executing anything. | High |
| RUN-006 | Dialog focus trap | Run dialog open. | Press Tab repeatedly. | Focus cycles within the dialog (OK, Cancel, input, Browse if present). | Medium |
| RUN-007 | Run dialog history / autocomplete | History implemented. | Start typing a previously used command. | Autocomplete suggestions appear. | Low |
| RUN-008 | Empty command handling | Run dialog open. | Leave field empty and press OK. | Error or no-op; dialog remains open or shows a validation message. | Medium |

### 3.5 Keyboard Shortcuts

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| KB-001 | Win key opens Start menu | Desktop focused. | Press the `Win` key (or `Ctrl + Esc`). | Start menu opens. | High |
| KB-002 | Win + R opens Run dialog | Desktop focused. | Press `Win + R`. | Run dialog opens. | High |
| KB-003 | Alt + F4 closes active window | At least one window open. | Focus the window, press `Alt + F4`. | Active window closes. | High |
| KB-004 | Esc closes modal dialogs / menus | A dialog or Start menu open. | Press `Esc`. | Dialog/menu closes. | High |
| KB-005 | Tab navigates UI elements | Desktop visible. | Press Tab repeatedly. | Focus moves logically through focusable elements with visible focus indicator. | High |
| KB-006 | Enter activates focused element | A button or link focused. | Press `Enter`. | The focused element is activated. | High |
| KB-007 | Space toggles focused buttons/checkboxes | A toggle button or checkbox focused. | Press `Space`. | Button activates / checkbox toggles. | Medium |
| KB-008 | Arrow keys navigate menus/lists | Start menu or list open. | Press Up/Down arrows. | Selection moves up/down. | Medium |
| KB-009 | Ctrl + shortcuts (copy/paste/select all) in text inputs | A text input focused. | Press `Ctrl + A`, `Ctrl + C`, `Ctrl + V`. | Text is selected/copied/pasted. | Medium |
| KB-010 | Win + M / Win + D minimize all windows | Multiple windows open. | Press `Win + M` or `Win + D` (if implemented). | All windows minimize. | Low |
| KB-011 | Shortcut conflicts with browser defaults | Browser window active. | Press `Ctrl + T`, `Ctrl + W`. | Portfolio shortcuts should not hijack browser-level shortcuts unless intended. | Medium |

### 3.6 Recycle Bin

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| REC-001 | Recycle Bin icon visible on desktop | Desktop rendered. | Locate the Recycle Bin icon. | Icon is present and recognizable. | High |
| REC-002 | Open Recycle Bin | Desktop visible. | Double-click the Recycle Bin icon. | Recycle Bin window opens showing deleted items (or empty state). | High |
| REC-003 | Delete item moves to Recycle Bin | A deletable item exists (file/note/icon). | Right-click → Delete or drag item to Recycle Bin. | Item appears inside Recycle Bin window; desktop icon changes to "full" state if implemented. | High |
| REC-004 | Restore item from Recycle Bin | Recycle Bin contains one or more items. | Select item → click Restore (or right-click → Restore). | Item returns to original location; Recycle Bin updates. | High |
| REC-005 | Empty Recycle Bin | Recycle Bin contains items. | Click "Empty Recycle Bin" / confirm. | All items removed; icon changes to "empty" state if implemented. | Medium |
| REC-006 | Recycle Bin icon states | Empty and full states implemented. | Add then remove items. | Icon visually toggles between empty and full. | Medium |
| REC-007 | Permanent delete (skip restore) | Recycle Bin contains items. | Select item → Delete / Shift+Delete if supported. | Item is removed without restore option; confirmation shown. | Low |
| REC-008 | Recycle Bin persistence | Persistence implemented. | Delete item, reload page, open Recycle Bin. | Previously deleted item remains in Recycle Bin. | Low |

### 3.7 Download CV Button

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| DL-001 | Download CV button visible | Page loaded. | Locate the CV download button (desktop, start menu, or taskbar). | Button is visible and labeled clearly (e.g., "Download CV"). | High |
| DL-002 | Click initiates download | Button visible. | Click the Download CV button. | Browser initiates a download; file appears in browser's download bar. | High |
| DL-003 | Downloaded file name correct | Download triggered. | Check downloaded file name. | File name matches expected (e.g., `Andhika-CV.pdf`). | High |
| DL-004 | Downloaded file opens and is readable | File downloaded. | Open the file in a PDF reader. | PDF renders without corruption. | High |
| DL-005 | Download works across browsers | Use Chrome, Firefox, Edge. | Repeat DL-002 in each browser. | Download succeeds in all supported browsers. | Medium |
| DL-006 | Button hover/active states | Button visible. | Hover and click the button. | Visual hover/active states are applied. | Medium |
| DL-007 | Missing CV asset handling | CV file temporarily removed (test env only). | Click Download CV. | Graceful error message shown instead of broken link/404. | Medium |
| DL-008 | Download analytics/logging | Analytics implemented. | Click Download CV. | Network tab shows expected request/event payload. | Low |

### 3.8 LinkedIn / GitHub Links

| ID | Description | Preconditions | Steps | Expected Result | Priority |
|----|-------------|---------------|-------|-----------------|----------|
| SOC-001 | LinkedIn icon visible | Page loaded. | Locate LinkedIn icon/link. | Icon is visible and recognizable. | High |
| SOC-002 | GitHub icon visible | Page loaded. | Locate GitHub icon/link. | Icon is visible and recognizable. | High |
| SOC-003 | LinkedIn URL correct | Icon present. | Inspect the `href` attribute. | URL points to the correct LinkedIn profile. | High |
| SOC-004 | GitHub URL correct | Icon present. | Inspect the `href` attribute. | URL points to the correct GitHub profile. | High |
| SOC-005 | Links open in new tab | Icon present. | Click the icon. | New tab opens to the external profile; portfolio tab remains open. | High |
| SOC-006 | Hover state on social icons | Icons visible. | Hover over each icon. | Tooltip or visual hover state appears. | Medium |
| SOC-007 | Link accessibility labels | Icons rendered. | Inspect element / use screen reader. | Each link has an accessible name (`aria-label` or visible text). | Medium |
| SOC-008 | Social links on mobile | Mobile viewport. | Tap each icon. | New tab/app opens correctly; no layout overflow. | Medium |
| SOC-009 | Offline/network error handling | Network disabled. | Click a social link. | Browser shows standard offline error in new tab; portfolio stays stable. | Low |

---

## 4. Regression Test Cases (Existing Features)

| ID | Feature | Description | Steps | Expected Result | Priority |
|----|---------|-------------|-------|-----------------|----------|
| REG-001 | Boot | Full boot sequence plays | Load the local preview URL; wait for boot animation. | Windows XP-style boot screen plays, then desktop appears. | High |
| REG-002 | Boot | Boot can be skipped | Click or keypress during boot. | Boot sequence skips to desktop (if implemented). | Low |
| REG-003 | Windows | Open any window | Double-click a desktop icon. | Window opens with title bar, content area, and controls. | High |
| REG-004 | Windows | Close window | Click X on any open window. | Window closes cleanly; taskbar updates. | High |
| REG-005 | Windows | Minimize / Maximize / Restore | Click minimize, maximize, restore buttons. | Window state changes correctly. | High |
| REG-006 | Windows | Drag window | Drag title bar. | Window moves; no trailing artifacts. | Medium |
| REG-007 | Windows | Resize window | Drag window edge/corner. | Window resizes smoothly. | Medium |
| REG-008 | Taskbar | Start button opens menu | Click Start. | Start menu opens with programs list. | High |
| REG-009 | Taskbar | Active window indicator | Open multiple windows. | Active window is highlighted on the taskbar. | Medium |
| REG-010 | Taskbar | Clock updates | Observe taskbar clock. | Clock shows current time and updates each minute. | Medium |
| REG-011 | WMP | Open Windows Media Player | Open WMP from Start menu or desktop. | WMP window opens; UI controls render. | High |
| REG-012 | WMP | Play/pause/stop audio | Load a track, click play/pause/stop. | Audio playback controls respond; visualizer updates if present. | High |
| REG-013 | WMP | Volume control | Adjust volume slider. | Volume changes; no errors. | Medium |
| REG-014 | WMP | Playlist navigation | Use next/previous buttons. | Correct track selected and plays. | Medium |
| REG-015 | Gallery | Open gallery window | Click gallery icon. | Gallery window opens with thumbnails. | High |
| REG-016 | Gallery | Thumbnail click opens preview | Click a thumbnail. | Enlarged image or lightbox opens. | High |
| REG-017 | Gallery | Navigate images | Use next/prev arrows or keyboard. | Next/previous image displayed. | Medium |
| REG-018 | Shutdown | Open shutdown dialog | Click Start → Turn Off Computer. | Shutdown dialog opens with options. | High |
| REG-019 | Shutdown | Cancel shutdown | Open shutdown dialog, click Cancel. | Dialog closes; desktop remains. | High |
| REG-020 | Shutdown | Restart / Shut down | Select restart/shut down. | Appropriate animation/transition occurs. | Medium |
| REG-021 | Language Toggle | Switch language | Click language toggle (EN/ID or equivalent). | All UI text updates to selected language. | High |
| REG-022 | Language Toggle | Language persistence | Switch language, reload page. | Selected language persists (if implemented). | Medium |
| REG-023 | Desktop | Wallpaper and icons render | Load page; observe desktop. | Wallpaper loads; icons positioned correctly. | High |
| REG-024 | Desktop | Right-click context menu | Right-click desktop. | Context menu appears with expected options. | Medium |

---

## 5. Edge Cases and Negative Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| E-001 | Rapidly open/close same feature | Double-click an icon repeatedly. | Application remains stable; no duplicate windows beyond design limit. | Medium |
| E-002 | Very long text in Run dialog | Type 500+ characters in Run input and submit. | Input is handled gracefully; no UI overflow or crash. | Medium |
| E-003 | Very long text in Search Companion | Type 500+ characters in search field. | Search processes or truncates gracefully. | Medium |
| E-004 | Browser zoom in/out | Set zoom to 25%, 50%, 150%, 200%. | Layout remains usable; no critical clipping. | Low |
| E-005 | No JavaScript | Disable JavaScript and reload. | Page degrades gracefully or shows a fallback message. | Low |
| E-006 | Keyboard-only navigation | Disconnect mouse; use Tab/Enter/Arrows to reach every feature. | All interactive elements reachable and operable. | High |
| E-007 | Mobile touch interactions | Use DevTools touch emulation. | Touch taps register; drag/resize works if supported. | Medium |
| E-008 | Network offline | Disable network, then click external links / Download CV. | Graceful failure; no unhandled exceptions. | Medium |
| E-009 | Multiple overlapping windows | Open many windows; click between them. | Z-index updates correctly; only one window active. | Medium |
| E-010 | Resize browser mid-interaction | Resize while a dialog/note is open. | Dialogs reposition or remain accessible. | Medium |
| E-011 | Special characters in search/notes | Type `<>"'&` and emojis. | Text renders correctly; no XSS/script injection. | High |
| E-012 | Concurrent tooltip + context menu | Trigger tooltip, then right-click. | Both UI layers behave; no visual glitches. | Low |
| E-013 | Recycle Bin full to empty rapidly | Delete/restore items rapidly. | State icon and count remain consistent. | Low |
| E-014 | Run dialog command injection | Type `javascript:alert(1)` or path traversal. | Command is treated as literal string; no script execution. | High |
| E-015 | CV download while offline | Disable network, click Download CV. | Browser shows offline error; button does not hang. | Medium |

---

## 6. Acceptance Criteria Summary

- [ ] All **High** priority test cases in Sections 3 and 4 pass.
- [ ] At least 80% of **Medium** priority test cases pass; any failures are documented with a defect ticket and a known workaround.
- [ ] No critical/blocking defects remain open in the new-feature area.
- [ ] Tooltips, Run dialog, Search Companion, and keyboard shortcuts are functional on both mouse and keyboard-only paths.
- [ ] Download CV delivers a valid, non-corrupt PDF file in all supported desktop browsers.
- [ ] LinkedIn and GitHub links point to the correct URLs and open in a new tab.
- [ ] Existing boot, windows, taskbar, WMP, gallery, shutdown, and language-toggle features show no regressions.
- [ ] Security edge cases (XSS, command injection) are mitigated and verified.
- [ ] Page is usable at 100% zoom on 1366×768 and above.

---

## 7. Tools / Scripts for Automated Checks

### 7.1 Manual / Built-in Tools

| Tool | Use Case |
|------|----------|
| Browser DevTools (Chrome/Edge/Firefox) | Inspect DOM, verify `href`, test responsive modes, profile console errors, simulate offline/throttling. |
| Lighthouse | Accessibility, performance, best-practices audits. |
| axe DevTools / WAVE | Automated accessibility checks (focus indicators, alt text, color contrast). |
| Responsively App / Polypane | Multi-viewport regression testing. |
| BrowserStack / LambdaTest (optional) | Cross-browser and mobile device testing. |

### 7.2 Automated Test Scripts (Examples)

#### 7.2.1 Playwright Smoke Test (`tests/smoke.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Windows XP Portfolio - Smoke', () => {
  test('loads desktop', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="desktop"]')).toBeVisible();
  });

  test('Win+R opens Run dialog', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.keyboard.press('Meta+R');
    await expect(page.locator('[data-testid="run-dialog"]')).toBeVisible();
  });

  test('Download CV link is valid', async ({ page }) => {
    await page.goto(BASE_URL);
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-testid="download-cv"]').click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/Andhika-CV\.pdf/i);
  });

  test('LinkedIn/GitHub links open in new tab', async ({ page, context }) => {
    await page.goto(BASE_URL);
    for (const id of ['linkedin-link', 'github-link']) {
      const link = page.locator(`[data-testid="${id}"]`);
      await expect(link).toHaveAttribute('target', '_blank');
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});
```

#### 7.2.2 Console Error Watcher (`scripts/check-console.js`)

```javascript
// Placeholder script: run with Playwright or Puppeteer to fail on console errors
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(5000); // boot + idle

  await browser.close();

  if (errors.length) {
    console.error('Console errors found:', errors);
    process.exit(1);
  }
  console.log('No console errors.');
})();
```

#### 7.2.3 Accessibility Quick Check (`scripts/a11y-check.js`)

```javascript
const { chromium } = require('playwright');
const { injectAxe, getViolations } = require('axe-playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await injectAxe(page);
  const violations = await getViolations(page, '*');
  console.log(`Found ${violations.length} accessibility violations.`);
  if (violations.length) console.log(violations);
  await browser.close();
  process.exit(violations.length ? 1 : 0);
})();
```

#### 7.2.4 Link Validator (`scripts/check-links.js`)

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const links = await page.$$eval('a[href^="http"]', anchors =>
    anchors.map(a => ({ text: a.innerText, href: a.href }))
  );

  for (const link of links) {
    const res = await page.goto(link.href, { waitUntil: 'domcontentloaded', timeout: 10000 });
    console.log(`${link.text || '(no text)'} → ${link.href}: ${res.status()}`);
  }

  await browser.close();
})();
```

### 7.3 Suggested CI Integration

- Run `npm run test` (Playwright) on every Pull Request.
- Run `npm run lint` and `npm run type-check` before QA handoff.
- Run the console-error watcher nightly against the staging build.
- Run Lighthouse CI to assert performance/accessibility budgets.

---

## 8. Defect Logging Template

When filing bugs, use the following fields:

- **ID:** BUG-XXX
- **Feature Area:** (e.g., Run Dialog, Tooltips)
- **Title:** Short description
- **Environment:** Browser + OS + viewport
- **Steps to Reproduce:** Numbered steps
- **Expected Result:**
- **Actual Result:**
- **Severity:** Blocker / Critical / Major / Minor / Trivial
- **Attachments:** Screenshot / screen recording / console log

---

## 9. Sign-off

| Role | Name | Signature / Date |
|------|------|------------------|
| QA Lead | | |
| Developer | | |
| Product Owner | | |

---

**End of Test Plan**
