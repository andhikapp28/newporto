/**
 * Retro Print Spooler (`printui.dll`) & Web Audio API Dot-Matrix SFX
 * Authentic Windows XP Luna Print Spooler Modal Experience
 * Emulating EPSON LX-300+ II 9-Pin Impact Dot-Matrix Printer
 */

let spoolerAudioCtx: AudioContext | null = null;
let soundEnabled = true;

/**
 * Singleton AudioContext Guard (Chromium 6-Context limit)
 */
function getSpoolerAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!spoolerAudioCtx) {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      try {
        spoolerAudioCtx = new AudioCtxClass();
      } catch (err) {
        console.warn('[PrintSpooler] Failed to construct AudioContext:', err);
      }
    }
  }
  if (spoolerAudioCtx && spoolerAudioCtx.state === 'suspended') {
    spoolerAudioCtx.resume().catch(() => {});
  }
  return spoolerAudioCtx;
}

/**
 * EPSON LX-300+ II Dot-Matrix Sound Synthesizer
 * Pure Web Audio API synthesis (0-asset offline dependency)
 */
export const DotMatrixSFX = {
  isEnabled(): boolean {
    return soundEnabled;
  },
  toggleSound(): boolean {
    soundEnabled = !soundEnabled;
    return soundEnabled;
  },
  setSound(val: boolean) {
    soundEnabled = val;
  },

  /**
   * Classic Power-on / Job Start Beep (880Hz square beep)
   */
  playBeep() {
    if (!soundEnabled) return;
    const ctx = getSpoolerAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.08); // High chirp

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      // ignore audio errors
    }
  },

  /**
   * Synthesize 1 Line of 9-Pin Impact Printing + Stepper Motor Whir
   * Combines high-frequency needle strikes + carriage motor vibration
   */
  playLineStrike(durationMs = 260) {
    if (!soundEnabled) return;
    const ctx = getSpoolerAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const dur = durationMs / 1000;

      // 1. Stepper Motor Hum (gear pulse)
      const motorOsc = ctx.createOscillator();
      const motorGain = ctx.createGain();
      motorOsc.type = 'sawtooth';
      motorOsc.frequency.setValueAtTime(320, now);
      motorOsc.frequency.linearRampToValueAtTime(380, now + dur * 0.5);
      motorOsc.frequency.linearRampToValueAtTime(310, now + dur);

      motorGain.gain.setValueAtTime(0.025, now);
      motorGain.gain.linearRampToValueAtTime(0.035, now + dur * 0.2);
      motorGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      motorOsc.connect(motorGain);
      motorGain.connect(ctx.destination);
      motorOsc.start(now);
      motorOsc.stop(now + dur);

      // 2. 9-Pin Needle Impact Clusters (Resonant Bandpass Noise Bursts)
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate pulsed needle impact bursts (approx 18 needle head strikes per line)
      const strikes = 16;
      const strikeInterval = Math.floor(bufferSize / strikes);
      for (let s = 0; s < strikes; s++) {
        const start = s * strikeInterval;
        const strikeLen = Math.min(Math.floor(strikeInterval * 0.45), bufferSize - start);
        for (let i = 0; i < strikeLen; i++) {
          // metallic burst with randomized needle chatter
          output[start + i] = (Math.random() * 2 - 1) * Math.exp(-i / (strikeLen * 0.3));
        }
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2850, now);
      bandpass.Q.setValueAtTime(6.5, now);

      const needleGain = ctx.createGain();
      needleGain.gain.setValueAtTime(0.065, now);
      needleGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noiseNode.connect(bandpass);
      bandpass.connect(needleGain);
      needleGain.connect(ctx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + dur);
    } catch (e) {
      // Audio context might be restricted
    }
  },

  /**
   * Carriage Return (CR) Zip Sound
   * High-speed printhead returning to column 1
   */
  playCarriageReturn(durationMs = 150) {
    if (!soundEnabled) return;
    const ctx = getSpoolerAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const dur = durationMs / 1000;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + dur);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + dur);
    } catch (e) {
      // ignore
    }
  },

  /**
   * Line Feed (LF) Paper Advancing Roller Click
   */
  playPaperAdvance() {
    if (!soundEnabled) return;
    const ctx = getSpoolerAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      // ignore
    }
  },

  /**
   * Completion Fanfare (Two short high chimes)
   */
  playJobCompleted() {
    if (!soundEnabled) return;
    const ctx = getSpoolerAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [
        { f: 659.25, t: 0, d: 0.12 },
        { f: 880.0, t: 0.14, d: 0.22 },
      ].forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.05, now + t);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch (e) {}
  }
};

/**
 * Print Spooler Controller & UI Orchestrator
 */
class PrintSpoolerController {
  private dialogModal: HTMLElement | null = null;
  private progressModal: HTMLElement | null = null;
  private isSpooling = false;
  private abortController: AbortController | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('DOMContentLoaded', () => {
        this.ensureDomInjected();
      });
    }
  }

  public ensureDomInjected(): void {
    if (document.getElementById('win-xp-print-dialog')) return;

    const container = document.getElementById('xp-desktop-container') || document.body;

    // 1. Classic Windows XP Luna Print Dialog
    const dialogHtml = document.createElement('div');
    dialogHtml.id = 'win-xp-print-dialog';
    dialogHtml.className = 'fixed inset-0 z-[99990] flex items-center justify-center bg-black/40 hidden select-none';
    dialogHtml.innerHTML = `
      <div class="xp-window w-[94vw] sm:w-[460px] rounded-t-lg shadow-2xl border-[3px] border-[#0055ea] bg-[#ece9d8] text-slate-800 flex flex-col overflow-hidden font-sans text-xs">
        <!-- Titlebar -->
        <div class="xp-titlebar h-7 px-2 flex items-center justify-between cursor-move select-none bg-gradient-to-r from-[#0058ee] via-[#3593ff] to-[#0058ee] text-white shadow-inner">
          <div class="flex items-center gap-1.5 font-bold text-xs tracking-wide drop-shadow truncate">
            <svg class="w-3.5 h-3.5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span class="i18n" data-en="Print" data-id="Cetak">Print</span>
          </div>
          <button id="spooler-dialog-close-btn" class="w-5 h-4.5 rounded bg-[#e81123] hover:bg-[#f63847] border border-white/70 flex items-center justify-center text-white font-bold" title="Close">
            <span class="text-xs leading-none">&times;</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-3 bg-[#ece9d8] space-y-3">
          <!-- Printer Groupbox -->
          <fieldset class="border border-[#7f9db9] rounded p-2.5 bg-[#ece9d8]">
            <legend class="px-1 text-[11px] font-bold text-[#003c74] i18n" data-en="Printer" data-id="Pencetak">Printer</legend>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center gap-2">
                <label class="w-16 text-slate-700 font-medium shrink-0 i18n" data-en="Name:" data-id="Nama:">Name:</label>
                <select id="spooler-printer-select" class="flex-1 px-2 py-0.5 bg-white border border-[#7f9db9] rounded-sm text-xs font-sans">
                  <option value="epson" selected>EPSON LX-300+ II (LPT1: 9-Pin Dot Matrix)</option>
                  <option value="pdf">Microcok Print to PDF (PORTPROMPT:)</option>
                  <option value="hp">HP LaserJet 1020 (USB001)</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pl-18">
                <div><strong class="text-slate-800">Status:</strong> <span class="text-emerald-700 font-bold">Ready (Online)</span></div>
                <div><strong class="text-slate-800">Type:</strong> <span id="spooler-printer-type">EPSON 9-Pin Matrix</span></div>
                <div><strong class="text-slate-800">Where:</strong> <span id="spooler-printer-port">LPT1: (ECP Parallel)</span></div>
                <div><strong class="text-slate-800">Comment:</strong> Continuous Form Paper</div>
              </div>
            </div>
          </fieldset>

          <!-- Print Range & Copies -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- Range -->
            <fieldset class="border border-[#7f9db9] rounded p-2.5 bg-[#ece9d8]">
              <legend class="px-1 text-[11px] font-bold text-[#003c74] i18n" data-en="Print Range" data-id="Cakupan Cetak">Print Range</legend>
              <div class="space-y-1 text-xs text-slate-800">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="spooler_range" value="all" checked class="accent-blue-600">
                  <span class="i18n" data-en="All" data-id="Semua">All</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="spooler_range" value="current" class="accent-blue-600">
                  <span class="i18n" data-en="Current Page" data-id="Halaman Ini">Current Page</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-slate-500">
                  <input type="radio" name="spooler_range" value="selection" disabled class="accent-blue-600">
                  <span class="i18n" data-en="Selection" data-id="Pilihan">Selection</span>
                </label>
              </div>
            </fieldset>

            <!-- Copies & Sound -->
            <fieldset class="border border-[#7f9db9] rounded p-2.5 bg-[#ece9d8] flex flex-col justify-between">
              <legend class="px-1 text-[11px] font-bold text-[#003c74] i18n" data-en="Copies &amp; Audio" data-id="Salinan &amp; Suara">Copies &amp; Audio</legend>
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <label class="text-slate-800 i18n" data-en="Number of copies:" data-id="Jumlah salinan:">Number of copies:</label>
                  <input id="spooler-copies-input" type="number" min="1" max="9" value="1" class="w-14 px-1.5 py-0.5 bg-white border border-[#7f9db9] rounded text-right font-mono">
                </div>
                <label class="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-700">
                  <input id="spooler-sound-toggle" type="checkbox" checked class="accent-blue-600">
                  <span class="i18n" data-en="Enable Dot-Matrix SFX" data-id="Aktifkan Suara Dot-Matrix">Enable Dot-Matrix SFX (LX-300+)</span>
                </label>
              </div>
            </fieldset>
          </div>

          <!-- Document Info Preview -->
          <div class="px-3 py-1.5 rounded bg-white border border-[#7f9db9] flex items-center justify-between text-[11px]">
            <span class="text-slate-600 i18n" data-en="Document:" data-id="Dokumen:">Document:</span>
            <span id="spooler-doc-title-text" class="font-bold text-blue-900 truncate max-w-[280px]">Document.doc</span>
          </div>

          <!-- Buttons -->
          <div class="pt-2 border-t border-[#d8d4c2] flex items-center justify-end gap-2">
            <button id="spooler-btn-print" class="xp-btn xp-btn-default font-bold px-4 py-1">
              <span class="i18n" data-en="Print" data-id="Cetak">Print</span>
            </button>
            <button id="spooler-btn-cancel" class="xp-btn px-4 py-1">
              <span class="i18n" data-en="Cancel" data-id="Batal">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

    // 2. Classic Windows XP Printing Progress Dialog (printui.dll)
    const progressHtml = document.createElement('div');
    progressHtml.id = 'win-xp-print-progress';
    progressHtml.className = 'fixed inset-0 z-[99995] flex items-center justify-center bg-black/50 hidden select-none';
    progressHtml.innerHTML = `
      <div class="xp-window w-[92vw] sm:w-[420px] rounded-t-lg shadow-2xl border-[3px] border-[#0055ea] bg-[#ece9d8] text-slate-800 flex flex-col overflow-hidden font-sans text-xs">
        <!-- Titlebar -->
        <div class="xp-titlebar h-7 px-2 flex items-center justify-between cursor-move select-none bg-gradient-to-r from-[#0058ee] via-[#3593ff] to-[#0058ee] text-white shadow-inner">
          <div class="flex items-center gap-1.5 font-bold text-xs tracking-wide drop-shadow truncate">
            <svg class="w-3.5 h-3.5 text-emerald-300 animate-pulse shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span id="spooler-progress-title">Printing... EPSON LX-300+ II</span>
          </div>
        </div>

        <!-- Body -->
        <div class="p-4 bg-[#ece9d8] space-y-3">
          <div class="flex items-center gap-3">
            <!-- Animated Printer Icon -->
            <div class="w-12 h-12 rounded bg-white border border-[#7f9db9] p-2 flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
              <svg class="w-8 h-8 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <!-- Moving paper strip animation -->
              <div id="spooler-paper-strip" class="absolute bottom-1 w-6 h-3 bg-amber-100 border border-amber-300 rounded-[1px] transition-all duration-300"></div>
            </div>

            <!-- Status Details -->
            <div class="flex-1 min-w-0">
              <div id="spooler-status-doc" class="font-bold text-slate-900 text-xs truncate">Document.doc</div>
              <div id="spooler-status-printer" class="text-[11px] text-slate-600">EPSON LX-300+ II on LPT1:</div>
              <div id="spooler-status-text" class="text-[11px] text-blue-900 font-mono mt-0.5 animate-pulse">Spooling page 1 of 1...</div>
            </div>
          </div>

          <!-- Progress Bar (Windows XP Green Smooth Blocks) -->
          <div class="space-y-1">
            <div class="h-4 bg-white border border-[#7f9db9] rounded-sm overflow-hidden p-0.5 flex">
              <div id="spooler-progress-bar" class="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-500 rounded-sm transition-all duration-150" style="width: 0%;"></div>
            </div>
            <div class="flex justify-between text-[10px] text-slate-500 font-mono">
              <span id="spooler-substatus-text">Connecting to port LPT1...</span>
              <span id="spooler-percent-text">0%</span>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-1 flex items-center justify-between">
            <span class="text-[10px] text-slate-500 italic i18n" data-en="9-Pin Head Active" data-id="Head 9-Pin Aktif">9-Pin Head Active</span>
            <button id="spooler-btn-abort" class="xp-btn px-4 py-1 text-xs">
              <span class="i18n" data-en="Cancel Printing" data-id="Batalkan Cetak">Cancel Printing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

    container.appendChild(dialogHtml);
    container.appendChild(progressHtml);

    this.dialogModal = dialogHtml;
    this.progressModal = progressHtml;

    this.bindEvents();
  }

  private bindEvents(): void {
    // Dialog Buttons
    document.getElementById('spooler-dialog-close-btn')?.addEventListener('click', () => this.hideDialog());
    document.getElementById('spooler-btn-cancel')?.addEventListener('click', () => this.hideDialog());
    document.getElementById('spooler-btn-print')?.addEventListener('click', () => this.startSpoolingFromDialog());

    // Sound toggle
    const soundToggle = document.getElementById('spooler-sound-toggle') as HTMLInputElement | null;
    soundToggle?.addEventListener('change', (e) => {
      DotMatrixSFX.setSound((e.target as HTMLInputElement).checked);
    });

    // Printer selection details
    const printerSelect = document.getElementById('spooler-printer-select') as HTMLSelectElement | null;
    printerSelect?.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value;
      const typeEl = document.getElementById('spooler-printer-type');
      const portEl = document.getElementById('spooler-printer-port');
      if (val === 'epson') {
        if (typeEl) typeEl.innerText = 'EPSON 9-Pin Matrix';
        if (portEl) portEl.innerText = 'LPT1: (ECP Parallel)';
      } else if (val === 'pdf') {
        if (typeEl) typeEl.innerText = 'Microcok PDF Driver';
        if (portEl) portEl.innerText = 'PORTPROMPT:';
      } else {
        if (typeEl) typeEl.innerText = 'HP PCL 5e Laser';
        if (portEl) portEl.innerText = 'USB001 (Virtual Printer)';
      }
    });

    // Abort button
    document.getElementById('spooler-btn-abort')?.addEventListener('click', () => this.abortPrinting());
  }

  private currentDocTitle = 'Document.doc';
  private currentSelector = '';

  /**
   * Open the Print Spooler dialog for a given document
   */
  public open(docTitle = 'Document.doc', contentSelector = ''): void {
    this.ensureDomInjected();
    this.currentDocTitle = docTitle;
    this.currentSelector = contentSelector;

    const titleEl = document.getElementById('spooler-doc-title-text');
    if (titleEl) titleEl.innerText = docTitle;

    const dialog = document.getElementById('win-xp-print-dialog');
    if (dialog) {
      dialog.classList.remove('hidden');
    }
  }

  public hideDialog(): void {
    const dialog = document.getElementById('win-xp-print-dialog');
    if (dialog) dialog.classList.add('hidden');
  }

  private async startSpoolingFromDialog(): Promise<void> {
    const printerSelect = document.getElementById('spooler-printer-select') as HTMLSelectElement | null;
    const printerVal = printerSelect?.value || 'epson';
    const copiesInput = document.getElementById('spooler-copies-input') as HTMLInputElement | null;
    const copies = parseInt(copiesInput?.value || '1', 10) || 1;

    this.hideDialog();
    await this.runSpoolingJob(this.currentDocTitle, printerVal, copies);
  }

  /**
   * Execute the animated spooling process with Web Audio SFX
   */
  public async runSpoolingJob(docTitle: string, printerType = 'epson', copies = 1): Promise<void> {
    if (this.isSpooling) return;
    this.isSpooling = true;
    this.abortController = new AbortController();

    const progressModal = document.getElementById('win-xp-print-progress');
    const progressBar = document.getElementById('spooler-progress-bar');
    const percentText = document.getElementById('spooler-percent-text');
    const statusText = document.getElementById('spooler-status-text');
    const substatusText = document.getElementById('spooler-substatus-text');
    const docText = document.getElementById('spooler-status-doc');
    const printerText = document.getElementById('spooler-status-printer');
    const paperStrip = document.getElementById('spooler-paper-strip');

    if (progressModal) progressModal.classList.remove('hidden');
    if (docText) docText.innerText = docTitle;

    if (printerText) {
      printerText.innerText = printerType === 'epson'
        ? 'EPSON LX-300+ II on LPT1:'
        : printerType === 'pdf'
        ? 'Microcok Print to PDF'
        : 'HP LaserJet 1020 on USB001';
    }

    // Initial printer beep
    DotMatrixSFX.playBeep();

    const totalLines = printerType === 'epson' ? 24 : 12;
    const delayPerLine = printerType === 'epson' ? 280 : 100;

    try {
      for (let line = 1; line <= totalLines; line++) {
        if (this.abortController.signal.aborted) break;

        const pct = Math.round((line / totalLines) * 100);
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (percentText) percentText.innerText = `${pct}%`;

        if (statusText) {
          statusText.innerText = `Printing line ${line} of ${totalLines}...`;
        }
        if (substatusText) {
          substatusText.innerText = `Spooling continuous feed to LPT1 (${pct}%)`;
        }

        // Animate paper feed strip up
        if (paperStrip) {
          paperStrip.style.transform = `translateY(-${(line % 4) * 2}px)`;
        }

        // Sound execution for EPSON dot matrix
        if (printerType === 'epson') {
          DotMatrixSFX.playLineStrike(220);
          if (line % 4 === 0) {
            DotMatrixSFX.playCarriageReturn(130);
          }
          if (line % 6 === 0) {
            DotMatrixSFX.playPaperAdvance();
          }
        }

        await new Promise((resolve) => setTimeout(resolve, delayPerLine));
      }

      // Finish job
      if (!this.abortController.signal.aborted) {
        if (progressBar) progressBar.style.width = '100%';
        if (percentText) percentText.innerText = '100%';
        if (statusText) statusText.innerText = 'Document successfully sent to printer!';
        if (substatusText) substatusText.innerText = 'Print queue flushed: 0 errors';

        DotMatrixSFX.playJobCompleted();

        await new Promise((resolve) => setTimeout(resolve, 600));

        // If user chose PDF or actual print, invoke browser print or notification
        if (printerType === 'pdf' && typeof window !== 'undefined') {
          window.print();
        } else {
          // Show tray balloon tip if available
          (window as any).showTrayBalloon?.(
            'Printer Spooler (LPT1:)',
            `"${docTitle}" printed successfully to EPSON LX-300+ II.`
          );
        }
      }
    } catch (err) {
      console.warn('[PrintSpooler] Job interrupted:', err);
    } finally {
      this.isSpooling = false;
      this.abortController = null;
      if (progressModal) progressModal.classList.add('hidden');
      if (progressBar) progressBar.style.width = '0%';
    }
  }

  public abortPrinting(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.isSpooling = false;
    const progressModal = document.getElementById('win-xp-print-progress');
    if (progressModal) progressModal.classList.add('hidden');
    (window as any).showTrayBalloon?.('Printer Spooler', 'Print job cancelled by user.');
  }
}

export const printSpooler = new PrintSpoolerController();

// Expose globally so inline onclick handlers and windows can call it
if (typeof window !== 'undefined') {
  (window as any).printSpooler = printSpooler;
  (window as any).DotMatrixSFX = DotMatrixSFX;
  (window as any).openPrintSpooler = (docTitle: string, selector = '') => {
    printSpooler.open(docTitle, selector);
  };
}

export default printSpooler;
