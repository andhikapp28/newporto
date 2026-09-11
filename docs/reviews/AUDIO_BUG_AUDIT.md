# Audio/Sound System Audit — Windows XD Portfolio

**Scope:** Audit the sound system of the Windows XD portfolio at `http://localhost:4321/newporto/`.  
**Focus:** Shutdown audio vs. 3D PC scene audio overlap, layering/noise, and resource leaks.  
**Date:** 2025-09-12  
**Auditor:** CodeBuddy (Audio/Sound Design Engineer for Web Frontend)  

---

## 1. Executive Summary

The site contains **two independent audio paths** that collide during shutdown:

1. `XpDesktop.astro` plays `xp-shutdown.wav` from the **Turn Off** button in the shutdown modal.
2. `ThreeComputerScene.astro` plays `xp-shutdown.wav` again when it receives the `xp:shutdown-to-3d` event dispatched by `XpDesktop`.

Because neither path checks whether the same sound is already playing, and because both `Audio` instances are created ad-hoc and left to garbage-collect, the result is:

- **Double shutdown sound** (two overlapping `xp-shutdown.wav` instances).
- **Lack of central mute/stop** when transitioning between scenes.
- **Orphan `Audio` objects** that continue playing after the DOM scene has changed.
- No fading/muting of the 3D scene, so any future ambient loop added there will continue playing over the shutdown screen.

The fix is a small **centralized `AudioManager` singleton** that:

- tracks active playback by *category* (e.g. `sfx`, `ambient`, `ui`, `shutdown`),
- prevents duplicate/overlapping playback of the same asset,
- exposes `stopAll()` / `fadeOut()` / `cleanup()` methods,
- is called from both shutdown and scene-transition code paths.

---

## 2. Sound Sources Inventory

### 2.1 Real audio assets

| File | Usage | Location in code |
|------|-------|------------------|
| `public/sounds/xp-startup.wav` | Played when the 3D CRT monitor is clicked to boot into desktop | `src/components/ThreeComputerScene.astro:441` |
| `public/sounds/xp-shutdown.wav` | Played from desktop shutdown modal + replayed when returning to 3D scene | `src/components/XpDesktop.astro:6319` and `src/components/ThreeComputerScene.astro:530` |

### 2.2 Synthesized UI sounds

`XpDesktop.astro:6361` contains `playXpSound(type)` which creates a brand-new `AudioContext` for every synthesized click/error/tada/etc.  These are short-lived, but they still add to the overall audio clutter and are not stopped when the user shuts down the desktop.

---

## 3. Shutdown Flow Inspection

### 3.1 Triggers

Three UI elements call `triggerShutdownDialog()`:

- `src/components/XpDesktop.astro:6290` — Start Menu **Shut Down** button (`#xp-open-shutdown-btn`).
- `src/components/XpDesktop.astro:6305` — Desktop shortcut icon (`#xp-desktop-shutdown-icon`).
- `src/components/XpDesktop.astro:6306` — Tray power button (`#xp-tray-shutdown-btn`).

All three open the shutdown modal (`#xp-shutdown-modal`).

### 3.2 Turn Off handler

`src/components/XpDesktop.astro:6308-6337`:

```astro
modalTurnOff?.addEventListener('click', () => {
  shutdownModal?.classList.add('hidden');
  shutdownModal?.classList.remove('flex');

  if (shutdownScreen) {
    shutdownScreen.classList.remove('hidden');
    shutdownScreen.classList.add('flex');
  }

  try {
    const assetBase = document.getElementById('xp-desktop-container')?.dataset.baseUrl || '';
    const audio = new Audio(`${assetBase}/sounds/xp-shutdown.wav`);
    audio.play().catch(e => console.warn(e));
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    // ...hide shutdown screen, hide desktop, then:
    window.dispatchEvent(new CustomEvent('xp:shutdown-to-3d'));
  }, 2500);
});
```

Observations:

- A new `Audio` instance is created every time.
- There is no `stop()` / `pause()` / cleanup before transitioning.
- Synthesized UI sounds are still audible because `playXpSound` is not muted.
- After 2.5 s the `xp:shutdown-to-3d` event is fired, which triggers a second `xp-shutdown.wav`.

### 3.3 Return to 3D scene handler

`src/components/ThreeComputerScene.astro:524-546`:

```astro
window.addEventListener('xp:shutdown-to-3d', () => {
  isBooting = false;
  isMouseDown = false;
  hasDragged = false;
  const assetBase = document.getElementById('three-computer-stage')?.dataset.baseUrl || '';
  playRealXpSound(`${assetBase}/sounds/xp-shutdown.wav`);

  // reset camera, rotation, fade stage back in ...
});
```

The comment in the file says *"If returning from shutdown, just fade stage and show desktop again"*, but the handler itself plays the shutdown sound again.

---

## 4. 3D PC Scene Audio Inspection

### 4.1 File

`src/components/ThreeComputerScene.astro`

### 4.2 Current audio helper

`src/components/ThreeComputerScene.astro:491-499`:

```astro
function playRealXpSound(soundPath: string) {
  try {
    const audio = new Audio(soundPath);
    audio.volume = 0.85;
    audio.play().catch(e => console.warn('Audio blocked:', e));
  } catch (e) {
    console.error(e);
  }
}
```

Issues:

- Creates a fresh `HTMLAudioElement` for every call.
- Does not reuse, stop, or track the element.
- Hard-coded volume.
- Cannot be faded out or cancelled globally.

### 4.3 Boot trigger

`src/components/ThreeComputerScene.astro:436-454`:

```astro
function triggerBoot() {
  if (isBooting) return;
  isBooting = true;

  const assetBase = document.getElementById('three-computer-stage')?.dataset.baseUrl || '';
  playRealXpSound(`${assetBase}/sounds/xp-startup.wav`);

  // ...zoom animation + dispatch xp:boot-desktop
}
```

If the user clicks the monitor multiple times rapidly, `isBooting` prevents repeated boot attempts, but the audio helper itself has no guard against duplicate sound.

### 4.4 Scene lifecycle

The component starts a `requestAnimationFrame` render loop (`renderLoop`) and adds many `window` event listeners.  There is no `beforeunload` or visibility-change cleanup for audio resources.

---

## 5. Bug Identification: Exact Cause and Code Locations

### 5.1 Primary bug — shutdown sound plays twice

**Cause:** `XpDesktop` dispatches `xp:shutdown-to-3d` **after** it has already played `xp-shutdown.wav`.  `ThreeComputerScene` receives that event and plays the **same file again**.

| File | Line(s) | What happens |
|------|---------|--------------|
| `src/components/XpDesktop.astro` | 6317-6323 | Creates `new Audio(.../xp-shutdown.wav)` and plays it immediately. |
| `src/components/XpDesktop.astro` | 6335 | Fires `xp:shutdown-to-3d`. |
| `src/components/ThreeComputerScene.astro` | 524-546 | Listens for `xp:shutdown-to-3d` and calls `playRealXpSound(.../xp-shutdown.wav)` again. |
| `src/components/ThreeComputerScene.astro` | 491-499 | `playRealXpSound` creates yet another `new Audio(...)`. |

Result on every shutdown: **two concurrent `xp-shutdown.wav` streams**, producing a loud, phase-shifted, doubled effect.

### 5.2 Secondary bug — no global stop/mute

There is no single authority that knows which sounds are currently playing.  Consequently:

- A desktop UI sound triggered just before shutdown continues playing over the shutdown screen.
- The 3D scene cannot mute or fade its own audio when it becomes hidden.
- If future ambient loops are added, they will layer indefinitely.

### 5.3 Resource leak

Each call creates a new `HTMLAudioElement` that is never paused or removed.  On repeated boot/shutdown cycles the browser accumulates detached audio nodes and decoder threads.

---

## 6. Proposed Fix: Centralized `AudioManager` Singleton

### 6.1 Design goals

1. **Single source of truth** for all `<audio>` playback.
2. **Category-based playback** (`sfx`, `ambient`, `ui`, `shutdown`).
3. **Overlap prevention** for identical assets or categories.
4. **Fade-out** before stopping continuous/ambient sources.
5. **Lifecycle hooks** for shutdown, boot, and page unload/visibility change.
6. **Fits Astro + vanilla JS architecture** — pure TypeScript module, exposed via `window` for inline `<script>` blocks.

### 6.2 New file: `src/scripts/audioManager.ts`

Create this module.  It is framework-agnostic and can be imported anywhere.

```typescript
// src/scripts/audioManager.ts
// Centralized audio singleton for the Windows XD portfolio.
// Prevents overlapping playback, fades scene/ambient audio on transitions,
// and cleans up resources on shutdown / page unload.

type AudioCategory = 'ui' | 'sfx' | 'ambient' | 'shutdown';

interface ActiveClip {
  src: string;
  category: AudioCategory;
  element: HTMLAudioElement;
  startedAt: number;
}

interface AudioManagerOptions {
  masterVolume?: number;
  fadeMs?: number;
}

class AudioManager {
  private clips: ActiveClip[] = [];
  private readonly categoryVolume: Record<AudioCategory, number> = {
    ui: 0.5,
    sfx: 0.85,
    ambient: 0.45,
    shutdown: 0.9,
  };
  private masterVolume = 1.0;
  private fadeMs = 500;

  constructor(opts: AudioManagerOptions = {}) {
    this.masterVolume = opts.masterVolume ?? 1.0;
    this.fadeMs = opts.fadeMs ?? 500;

    // Auto-mute on background tab / hidden page to avoid surprise playback.
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pauseAll();
        } else {
          this.resumeAmbient();
        }
      });
    }

    // Cleanup before leaving the page.
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.stopAll());
    }
  }

  /**
   * Play a one-shot sound. Stops any existing sound in the same category
   * (prevents duplicate shutdown sounds) and dedupes identical src playback
   * within a short collision window.
   */
  playOneShot(src: string, category: AudioCategory = 'sfx'): void {
    if (!src) return;

    // Cancel any currently playing clip in this category.
    this.stopCategory(category, { fade: category === 'ambient' });

    // If the same file is already playing anywhere, do not layer it again.
    const alreadyPlaying = this.clips.find(
      (c) => c.src === src && !c.element.paused && !c.element.ended
    );
    if (alreadyPlaying) return;

    const element = new Audio(src);
    element.volume = this.categoryVolume[category] * this.masterVolume;
    element.preload = 'auto';

    const clip: ActiveClip = { src, category, element, startedAt: performance.now() };
    this.clips.push(clip);

    const cleanup = () => this.removeClip(clip);
    element.addEventListener('ended', cleanup, { once: true });
    element.addEventListener('error', cleanup, { once: true });

    element.play().catch((err) => {
      console.warn('[AudioManager] play failed:', src, err);
      this.removeClip(clip);
    });
  }

  /**
   * Begin an ambient/looping sound. Useful for the 3D PC scene when an
   * ambient hum or fan loop is added later.
   */
  playAmbient(src: string, category: AudioCategory = 'ambient'): void {
    this.stopCategory(category, { fade: true });
    const element = new Audio(src);
    element.loop = true;
    element.volume = this.categoryVolume[category] * this.masterVolume;
    element.preload = 'auto';

    const clip: ActiveClip = { src, category, element, startedAt: performance.now() };
    this.clips.push(clip);

    element.addEventListener('error', () => this.removeClip(clip), { once: true });
    element.play().catch((err) => {
      console.warn('[AudioManager] ambient play failed:', src, err);
      this.removeClip(clip);
    });
  }

  /**
   * Stop all sounds. Call this before playing the shutdown sound and before
   * switching scenes.
   */
  stopAll(options: { fade?: boolean } = {}): void {
    const clipsToStop = [...this.clips];
    clipsToStop.forEach((clip) => this.stopClip(clip, options.fade));
  }

  /**
   * Stop only a specific category (e.g. 'ambient' before shutdown).
   */
  stopCategory(category: AudioCategory, options: { fade?: boolean } = {}): void {
    this.clips
      .filter((c) => c.category === category)
      .forEach((clip) => this.stopClip(clip, options.fade));
  }

  /**
   * Stop a single registered clip, optionally fading its volume first.
   */
  private stopClip(clip: ActiveClip, fade = false): void {
    if (!clip?.element) return;

    if (fade && clip.element.volume > 0.01) {
      const startVol = clip.element.volume;
      const start = performance.now();
      const duration = this.fadeMs;

      const fadeOut = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const newVol = startVol * (1 - progress);
        clip.element.volume = Math.max(0, newVol);

        if (progress < 1 && !clip.element.paused) {
          requestAnimationFrame(fadeOut);
        } else {
          this.pauseAndRemove(clip);
        }
      };

      requestAnimationFrame(fadeOut);
    } else {
      this.pauseAndRemove(clip);
    }
  }

  private pauseAndRemove(clip: ActiveClip): void {
    try {
      clip.element.pause();
      clip.element.src = '';
      clip.element.load();
    } catch (_) {
      // ignore
    }
    this.removeClip(clip);
  }

  private pauseAll(): void {
    this.clips.forEach((clip) => {
      try {
        clip.element.pause();
      } catch (_) {}
    });
  }

  private resumeAmbient(): void {
    this.clips
      .filter((c) => c.category === 'ambient' && c.element.paused)
      .forEach((clip) => {
        clip.element.play().catch(() => this.removeClip(clip));
      });
  }

  private removeClip(target: ActiveClip): void {
    const idx = this.clips.indexOf(target);
    if (idx === -1) return;
    const [clip] = this.clips.splice(idx, 1);
    try {
      clip.element.pause();
      clip.element.src = '';
      clip.element.load();
    } catch (_) {
      // ignore
    }
  }

  /**
   * Set the master volume (0..1). Affects future fades and currently
   * playing clips immediately.
   */
  setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    this.clips.forEach((clip) => {
      clip.element.volume = this.categoryVolume[clip.category] * this.masterVolume;
    });
  }
}

// Singleton instance.
const audioManager = new AudioManager({ masterVolume: 1.0, fadeMs: 500 });

// Expose for inline Astro <script> blocks (vanilla JS) and for debugging.
if (typeof window !== 'undefined') {
  (window as any).audioManager = audioManager;
}

export { audioManager, AudioManager };
export default audioManager;
```

### 6.3 Why this solves the reported problems

| Problem | How the manager fixes it |
|---------|--------------------------|
| Double shutdown sound | `playOneShot` with category `'shutdown'` stops any existing shutdown clip before starting a new one, and dedupes identical `src` playback. |
| Scene transition noise | `stopAll()` / `stopCategory('ambient')` called before shutdown removes any lingering scene audio. |
| Resource leaks | Every clip is tracked in `this.clips`; `removeClip` pauses, clears `src`, and calls `load()` to release decoder resources. |
| Hidden page playback | `visibilitychange` handler pauses everything and later resumes only ambient loops. |
| Future ambient loops | `playAmbient()` provides a dedicated looping path with fade-out support. |

---

## 7. Concrete Patch: Integrate `AudioManager` into Existing Components

### 7.1 Step 1 — import the manager in both components

In `src/components/XpDesktop.astro`, add at the **top of the `<script>` block**:

```astro
<script>
  import { audioManager } from '../scripts/audioManager';
  // ... rest of existing script
```

In `src/components/ThreeComputerScene.astro`, add at the **top of the `<script>` block**:

```astro
<script>
  import * as THREE from 'three';
  import { audioManager } from '../scripts/audioManager';
```

Astro compiles inline `<script>` blocks, so the import works even though the file is `.astro`.

### 7.2 Step 2 — replace `playRealXpSound` in `ThreeComputerScene.astro`

**Remove** the old helper (lines 491-499):

```astro
function playRealXpSound(soundPath: string) {
  try {
    const audio = new Audio(soundPath);
    audio.volume = 0.85;
    audio.play().catch(e => console.warn('Audio blocked:', e));
  } catch (e) {
    console.error(e);
  }
}
```

**Replace** all `playRealXpSound(...)` calls with category-aware manager calls.

At line 441 (startup):

```astro
// before
playRealXpSound(`${assetBase}/sounds/xp-startup.wav`);

// after
audioManager.playOneShot(`${assetBase}/sounds/xp-startup.wav`, 'sfx');
```

At the `xp:shutdown-to-3d` listener (around line 530):

```astro
window.addEventListener('xp:shutdown-to-3d', () => {
  isBooting = false;
  isMouseDown = false;
  hasDragged = false;

  // Do NOT play shutdown.wav again here; XpDesktop already played it.
  // Instead, stop any leftover desktop/scene audio and reset scene state.
  audioManager.stopCategory('sfx', { fade: true });
  audioManager.stopCategory('ambient', { fade: true });

  updateResponsiveCamera();
  camera.lookAt(0, 0.1, 0);
  rotX = 0;
  rotY = 0;
  workstation.rotation.set(0, 0, 0);

  if (stage) {
    stage.classList.remove('hidden');
    setTimeout(() => {
      stage.classList.remove('opacity-0', 'pointer-events-none');
      renderLoop();
    }, 50);
  }
});
```

### 7.3 Step 3 — replace shutdown playback in `XpDesktop.astro`

In the Turn Off handler (around line 6308):

```astro
modalTurnOff?.addEventListener('click', () => {
  shutdownModal?.classList.add('hidden');
  shutdownModal?.classList.remove('flex');

  if (shutdownScreen) {
    shutdownScreen.classList.remove('hidden');
    shutdownScreen.classList.add('flex');
  }

  // 1. Stop scene/desktop audio first so nothing layers with shutdown sound.
  audioManager.stopCategory('ambient', { fade: true });
  audioManager.stopCategory('sfx', { fade: true });

  // 2. Play the single authoritative shutdown sound.
  const assetBase = document.getElementById('xp-desktop-container')?.dataset.baseUrl || '';
  audioManager.playOneShot(`${assetBase}/sounds/xp-shutdown.wav`, 'shutdown');

  setTimeout(() => {
    if (shutdownScreen) {
      shutdownScreen.classList.add('hidden');
      shutdownScreen.classList.remove('flex');
    }
    const desktop = document.getElementById('xp-desktop-container');
    if (desktop) {
      desktop.classList.add('hidden');
      desktop.classList.remove('flex');
    }
    window.dispatchEvent(new CustomEvent('xp:shutdown-to-3d'));
  }, 2500);
});
```

This guarantees:

- only **one** `xp-shutdown.wav` plays per shutdown,
- ambient/scene sounds fade out before the shutdown sound starts,
- the 3D scene does not play the sound again on `xp:shutdown-to-3d`.

### 7.4 Step 4 — wire synthesized UI sounds into the manager (optional but recommended)

The existing `playXpSound` in `XpDesktop.astro` uses Web Audio API, which is fine for short blips.  However, to make them respect shutdown/mute, wrap them so the manager can suspend all audio.  A lightweight integration:

At the top of `playXpSound`, add a guard:

```astro
function playXpSound(type: string) {
  try {
    // Respect global shutdown state. During shutdown, suppress UI sounds.
    if ((window as any).__isShuttingDown) return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    // ... existing synthesis code
  } catch (e) {}
}
```

And set the flag during shutdown:

```astro
modalTurnOff?.addEventListener('click', () => {
  (window as any).__isShuttingDown = true;
  // ...
});
```

Alternatively, convert `playXpSound` to use `audioManager.playOneShot()` with small data-URI/generated WAV buffers.  The flag approach is the minimal, low-risk change.

### 7.5 Step 5 — cleanup on 3D scene hide / boot

In `ThreeComputerScene.astro`, when the stage is hidden after boot, stop ambient/scene audio:

```astro
function triggerBoot() {
  if (isBooting) return;
  isBooting = true;

  const assetBase = document.getElementById('three-computer-stage')?.dataset.baseUrl || '';
  audioManager.playOneShot(`${assetBase}/sounds/xp-startup.wav`, 'sfx');

  // ...existing boot logic...

  // At the end of the zoom animation (around where stage is hidden):
  setTimeout(() => {
    audioManager.stopCategory('ambient', { fade: true });
  }, 700);
}
```

If the scene later gains an ambient PC hum, `playAmbient()` should be called once at init and it will be cleanly faded/stopped here.

---

## 8. Migration Checklist

- [ ] Create `src/scripts/audioManager.ts` with the code from section 6.2.
- [ ] Import `audioManager` at the top of the `<script>` blocks in:
  - `src/components/XpDesktop.astro`
  - `src/components/ThreeComputerScene.astro`
- [ ] Remove `playRealXpSound` from `ThreeComputerScene.astro`.
- [ ] Replace `playRealXpSound(...)` calls with `audioManager.playOneShot(...)`.
- [ ] In `XpDesktop.astro`, call `audioManager.stopCategory('ambient')` and `stopCategory('sfx')` before playing the shutdown sound.
- [ ] In `ThreeComputerScene.astro`, remove the second `xp-shutdown.wav` playback from the `xp:shutdown-to-3d` listener.
- [ ] Add shutdown guard flag or route synthesized `playXpSound` through the manager.
- [ ] Stop ambient/scene audio when the 3D stage fades to desktop.
- [ ] Run `npm run build` and `npm run preview` to verify no TypeScript/import errors.

---

## 9. Testing Recommendations

1. **Boot once** — click the 3D monitor; ensure `xp-startup.wav` plays exactly once.
2. **Rapid clicks** — spam-click the monitor; `isBooting` plus the manager should prevent stacked startup sounds.
3. **Shutdown from three paths** — Start Menu, desktop icon, tray button; each should produce exactly one shutdown sound.
4. **Double shutdown** — click Turn Off, then quickly click it again; only one `xp-shutdown.wav` should be audible.
5. **Scene return** — after shutdown, the 3D scene should reappear without playing a second shutdown sound.
6. **Hidden tab** — start a sound, switch tabs, sound should pause; return and ambient loops resume.
7. **Network throttling** — disable cache and throttle to Slow 3G; ensure `play().catch()` handles blocked autoplay gracefully.
8. **Memory** — in DevTools **Performance → Memory**, take a heap snapshot before and after 10 boot/shutdown cycles; confirm no detached `HTMLAudioElement` accumulation.

---

## 10. Summary

The overlap bug is caused by **two ad-hoc `new Audio(.../xp-shutdown.wav)` calls that run independently**:

- `src/components/XpDesktop.astro:6319` plays the sound from the Turn Off button.
- `src/components/ThreeComputerScene.astro:530` plays it again on the `xp:shutdown-to-3d` event fired at `src/components/XpDesktop.astro:6335`.

The recommended fix is a **centralized `AudioManager` singleton** (`src/scripts/audioManager.ts`) that:

- tracks every active clip,
- prevents category-level overlap and duplicate playback,
- fades/stops ambient and scene audio before shutdown,
- cleans up resources on shutdown and page unload.

Applying the patches in section 7 eliminates the double shutdown sound and prevents future layering/noise issues as more scene audio is added.
