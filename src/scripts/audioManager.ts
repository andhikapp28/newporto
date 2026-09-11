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
   * (prevents duplicate shutdown sounds) and dedupes identical src playback.
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
   * Begin an ambient/looping sound.
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

  stopAll(options: { fade?: boolean } = {}): void {
    const clipsToStop = [...this.clips];
    clipsToStop.forEach((clip) => this.stopClip(clip, options.fade));
  }

  stopCategory(category: AudioCategory, options: { fade?: boolean } = {}): void {
    this.clips
      .filter((c) => c.category === category)
      .forEach((clip) => this.stopClip(clip, options.fade));
  }

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

  setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    this.clips.forEach((clip) => {
      clip.element.volume = this.categoryVolume[clip.category] * this.masterVolume;
    });
  }
}

const audioManager = new AudioManager({ masterVolume: 1.0, fadeMs: 500 });

if (typeof window !== 'undefined') {
  (window as any).audioManager = audioManager;
}

export { audioManager, AudioManager };
export default audioManager;
