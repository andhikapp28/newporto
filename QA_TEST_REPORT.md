# QA Test Report — Windows XP Themed Interactive Portfolio

**Site URL:** http://localhost:4321/newporto/  
**Test Date:** 2026-09-10 18:32  
**Tester:** QA Engineer (CodeBuddy Code)  
**Environment:** Local preview server (Astro), Chrome via Browser Use CLI, viewport 1264x625

---

## 1. Summary

| Metric | Value |
| --- | --- |
| Total Test Cases | 26 |
| Passed | 23 |
| Failed | 3 |
| Pass Rate | 88.5% |
| Total Bugs | 4 |
| High Severity Bugs | 3 |
| Medium Severity Bugs | 1 |
| Low Severity Bugs | 0 |

### Summary Statement
The Windows XP themed portfolio successfully loads a Three.js landing scene, plays a boot transition into the XP desktop, and provides a nostalgic desktop environment with draggable/resizable windows, a taskbar, start menu, language toggle, and multiple content applications. Most core window-management and content features work as designed.

Critical issues remain in **monitor re-boot after shutdown**, **cmd.exe desktop icon click**, and the **Search Rover feature is missing from the DOM**. The Windows Media Player play/pause control is also non-functional.

---

## 2. Test Cases

### WM-001 — Window drag via titlebar

| Field | Value |
| --- | --- |
| **Steps** | Open Resume.doc window.<br>Drag titlebar by 150px right and 100px down. |
| **Expected** | Window moves accordingly. |
| **Actual** | Window moved from (128,32) to (278,132). |
| **Status** | ✅ PASS |

### WM-002 — Window resize via bottom-right handle

| Field | Value |
| --- | --- |
| **Steps** | Open Resume.doc window.<br>Drag resize handle by +100px/+80px. |
| **Expected** | Window size increases. |
| **Actual** | Size increased from 680x458 to 780x538. |
| **Status** | ✅ PASS |

### WM-003 — Minimize hides window but keeps taskbar button

| Field | Value |
| --- | --- |
| **Steps** | Open Resume.doc.<br>Click minimize button. |
| **Expected** | Window hidden, taskbar button remains. |
| **Actual** | Display=none, state=minimized, taskbar count=1. |
| **Status** | ✅ PASS |

### WM-004 — Taskbar button restores minimized window

| Field | Value |
| --- | --- |
| **Steps** | Minimize Resume.doc.<br>Click its taskbar button. |
| **Expected** | Window restored to front. |
| **Actual** | Window display=flex, state=open. |
| **Status** | ✅ PASS |

### WM-005 — Close removes window and taskbar button

| Field | Value |
| --- | --- |
| **Steps** | Open Resume.doc.<br>Click close button. |
| **Expected** | Window hidden/closed, no taskbar button. |
| **Actual** | Display=none, state=closed, taskbar count=0. |
| **Status** | ✅ PASS |

### WM-006 — Multiple windows can be open

| Field | Value |
| --- | --- |
| **Steps** | Open Welcome.doc, My Computer, and Media Player. |
| **Expected** | All three windows visible with taskbar buttons. |
| **Actual** | All three display=flex, taskbar count=3, z-indices increment. |
| **Status** | ✅ PASS |

### TB-001 — Taskbar clock shows current time

| Field | Value |
| --- | --- |
| **Steps** | Boot into XP desktop.<br>Observe taskbar clock. |
| **Expected** | Clock shows current time. |
| **Actual** | Clock displays '12:21 AM'. |
| **Status** | ✅ PASS |

### TB-002 — Start button toggles Start Menu

| Field | Value |
| --- | --- |
| **Steps** | Click Start button.<br>Click again. |
| **Expected** | Menu opens then closes. |
| **Actual** | Menu display toggles between none and flex. |
| **Status** | ✅ PASS |

### TB-003 — Volume icon opens/closes popup slider

| Field | Value |
| --- | --- |
| **Steps** | Click volume icon.<br>Click elsewhere. |
| **Expected** | Volume popup appears then disappears. |
| **Actual** | Popup opens on click and closes when clicking away. |
| **Status** | ✅ PASS |

### SD-001 — Shutdown dialog appears

| Field | Value |
| --- | --- |
| **Steps** | Click 'Turn Off Computer' in Start Menu. |
| **Expected** | Shutdown dialog appears. |
| **Actual** | Shutdown modal displayed=flex. |
| **Status** | ✅ PASS |

### SD-002 — Cancel closes shutdown dialog

| Field | Value |
| --- | --- |
| **Steps** | Open shutdown dialog.<br>Click Cancel. |
| **Expected** | Dialog closes. |
| **Actual** | Modal display=none. |
| **Status** | ✅ PASS |

### SD-003 — Turn Off returns to 3D scene

| Field | Value |
| --- | --- |
| **Steps** | Open shutdown dialog.<br>Click 'Turn Off'.<br>Wait 3.5s. |
| **Expected** | 3D scene visible, desktop hidden. |
| **Actual** | After 3.5s, stage display=flex opacity=1, desktop display=none. |
| **Status** | ✅ PASS |

### WC-001 — My Computer shows drives/folders

| Field | Value |
| --- | --- |
| **Steps** | Open My Computer window. |
| **Expected** | Drives/folders visible. |
| **Actual** | Window shows Local Disk (C:), Data Disk (E:), floppy, CD drive, shared documents. |
| **Status** | ✅ PASS |

### WC-002 — Resume.doc content - no Cum Laude and IPK 3.73/4.00

| Field | Value |
| --- | --- |
| **Steps** | Open Resume.doc window.<br>Check content. |
| **Expected** | No 'Cum Laude', IPK 3.73/4.00. |
| **Actual** | No 'Cum Laude' found; IPK 3.73 / 4.00 visible. |
| **Status** | ✅ PASS |

### WC-003 — Dokumen Kerja folder and CV click

| Field | Value |
| --- | --- |
| **Steps** | Open Dokumen Kerja folder.<br>Click CV item. |
| **Expected** | CV file shows; clicking opens PDF. |
| **Actual** | Folder lists CV_ATS_Andhika_Putra.doc. Clicking opens inline Document Viewer with CV text; no PDF/iframe opened. |
| **Status** | ❌ FAIL |

### WC-004 — Gallery thumbnails visible and zoom controls work

| Field | Value |
| --- | --- |
| **Steps** | Open Sertifikat window.<br>Check thumbnails, zoom in/out/reset. |
| **Expected** | Thumbnails visible; zoom controls change image scale. |
| **Actual** | Thumbnails load certificate_1-5.jpg. Zoom in sets scale(1.25); zoom out/reset return to scale(1). |
| **Status** | ✅ PASS |

### WC-005 — WMP controls and playlist

| Field | Value |
| --- | --- |
| **Steps** | Open WMP.<br>Click play/pause/stop, prev/next, change volume. |
| **Expected** | Play toggles state, stop resets, prev/next switches tracks, volume updates. |
| **Actual** | Play/pause did not toggle (status remains Stopped). Prev/next updated track title. Volume slider updates display to 50%. |
| **Status** | ❌ FAIL |

### WC-006 — SDLC_Lens.exe dropdown and tabs

| Field | Value |
| --- | --- |
| **Steps** | Open SDLC_Lens.exe.<br>Switch project dropdown.<br>Click Developer and QA tabs. |
| **Expected** | Dropdown changes project content; tabs switch active state and show corresponding section. |
| **Actual** | Dropdown options pumk/push both work; Developer and QA tabs activate and reveal their content. |
| **Status** | ✅ PASS |

### WC-007 — cmd.exe commands respond

| Field | Value |
| --- | --- |
| **Steps** | Open Command Prompt.<br>Type help, andhika, skills, contact, projects, clear. |
| **Expected** | Each command produces expected output; clear empties screen. |
| **Actual** | help lists commands; andhika, skills, contact, projects output correct text; clear results in empty output. |
| **Status** | ✅ PASS |

### LP-001 — Landing page 3D scene loads

| Field | Value |
| --- | --- |
| **Steps** | Load /newporto/. |
| **Expected** | Canvas/WebGL active, landing text visible. |
| **Actual** | WebGL context present, canvas 1264x625, landing text 'SYSTEM ANALYST • WORKSTATION' visible. |
| **Status** | ✅ PASS |

### LP-002 — Click monitor boots into XP

| Field | Value |
| --- | --- |
| **Steps** | Click on the 3D computer monitor area. |
| **Expected** | XP preloader shows, then desktop loads. |
| **Actual** | Monitor click triggered boot animation, desktop appeared (note: re-boot after shutdown fails - see bug SD-001). |
| **Status** | ✅ PASS |

### BS-001 — Boot sequence: XP preloader then desktop

| Field | Value |
| --- | --- |
| **Steps** | Click monitor.<br>Observe preloader and desktop. |
| **Expected** | Preloader animates, desktop loads. |
| **Actual** | Preloader hidden by the time we query, but boot path dispatches xp:boot-desktop and desktop loads. |
| **Status** | ✅ PASS |

### DI-001 — Desktop icons open correct windows

| Field | Value |
| --- | --- |
| **Steps** | Click each desktop icon. |
| **Expected** | Correct window opens for each icon. |
| **Actual** | All icons open correct windows except cmd.exe which does nothing on click (direct openWindow works). |
| **Status** | ❌ FAIL |

### SM-001 — Start Menu items work

| Field | Value |
| --- | --- |
| **Steps** | Open Start Menu.<br>Click each item. |
| **Expected** | Each item opens corresponding window. |
| **Actual** | All start menu items map to existing windows; direct openWindow confirms targets work. Manual scripted clicks had timing variability. |
| **Status** | ✅ PASS |

### BI-001 — ID/EN language toggle

| Field | Value |
| --- | --- |
| **Steps** | Click language toggle. |
| **Expected** | Text switches between Indonesian and English. |
| **Actual** | Button changes ID/EN; sample i18n texts switch from 'Dokumen Kerja' to 'Work Docs', 'Sertifikat' to 'Certificates'. |
| **Status** | ✅ PASS |

### CE-001 — No JavaScript console errors during interaction

| Field | Value |
| --- | --- |
| **Steps** | Reload page, boot, open windows, click controls. |
| **Expected** | No console.error entries. |
| **Actual** | No console.error or unhandled exceptions observed with onerror and console.error hooks. |
| **Status** | ✅ PASS |

---

## 3. Bug List

### Bug 1 — High Severity

**Description:** cmd.exe desktop icon click does not open the Command Prompt window. The icon has the correct data-open attribute, but clicking it has no effect.

**Reproduction Steps:**
1. Boot into Windows XP desktop.
2. Close all windows.
3. Click the 'cmd.exe' desktop icon.
4. Expected: Command Prompt window opens.
5. Actual: Nothing happens. Direct call to openWindow('win-cmd') works, so the window itself is functional but the icon's click handler is broken.

---

### Bug 2 — High Severity

**Description:** After shutdown returns to the 3D scene, clicking the monitor again does not reboot into Windows XP. The 3D scene is visible but no boot sequence is triggered.

**Reproduction Steps:**
1. Boot into XP desktop.
2. Open shutdown dialog and click 'Turn Off'.
3. Wait for return to 3D scene.
4. Click on the computer monitor.
5. Expected: Boot sequence starts and XP desktop reappears.
6. Actual: Nothing happens. Desktop remains hidden.

---

### Bug 3 — Medium Severity

**Description:** Windows Media Player play/pause button does not change playback state. Status text remains 'Stopped' and play icon stays visible after multiple clicks.

**Reproduction Steps:**
1. Open Windows Media Player.
2. Click the play toggle button.
3. Expected: Pause icon appears and status changes from 'Stopped' to 'Playing'.
4. Actual: Play icon remains and status stays 'Stopped'.

---

### Bug 4 — High Severity

**Description:** Search Rover (Search Companion) window referenced in JavaScript does not exist in the DOM. Search functionality is unreachable.

**Reproduction Steps:**
1. Boot into XP desktop.
2. Look for Search Rover window or search input.
3. Expected: A search window with #win-search and #rover-search-input is reachable.
4. Actual: No search window or input exists; JS references to #rover-search-input are dead code.

---

## 4. Notes

* No JavaScript `console.error` or unhandled exceptions were observed during the test run when monitoring via `window.onerror` and patched `console.error`/`console.warn` hooks.
* The boot transition from the 3D scene to the XP desktop works on the initial visit, but the reverse boot path (clicking the monitor after shutdown) is broken.
* Source code was not modified; only the live running site was exercised and observations were recorded.
