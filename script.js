/**
 * SHOURYA RANA PORTFOLIO - CORE INTERACTION & MOTION CONTROLLER
 * High-performance WebGL, Three.js 3D, Web Audio Synthesizer, & Micro-Apps
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. WEB AUDIO API SYNTHESIZER ENGINE (Zero external dependencies)
  // ==========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.initFromStorage();
    }

    initFromStorage() {
      const saved = localStorage.getItem('sr_sound_enabled');
      this.enabled = saved === 'true';
    }

    ensureContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('sr_sound_enabled', this.enabled);
      if (this.enabled) {
        this.ensureContext();
        this.playSuccess();
      }
      return this.enabled;
    }

    // Soft magnetic UI hover blip
    playHover() {
      if (!this.enabled) return;
      try {
        this.ensureContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1900, this.ctx.currentTime + 0.035);

        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }

    // Crisp mechanical click
    playClick() {
      if (!this.enabled) return;
      try {
        this.ensureContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.055);
      } catch (e) {}
    }

    // Futuristic modal whoosh
    playWhoosh() {
      if (!this.enabled) return;
      try {
        this.ensureContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.18);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.22);
      } catch (e) {}
    }

    // Harmonic Success Arpeggio
    playSuccess() {
      if (!this.enabled) return;
      try {
        this.ensureContext();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = this.ctx.currentTime + idx * 0.06;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.04, startTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.3);
        });
      } catch (e) {}
    }

    // Cosmic Hyperspace Warp Synth
    playWarp() {
      if (!this.enabled) return;
      try {
        this.ensureContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(80, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 2.5);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.0);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 3.1);
      } catch (e) {}
    }

    // Beat Rhythm Demo for Audio Master Card
    playBeatBurst(callback) {
      if (!this.enabled) {
        if (callback) callback();
        return;
      }
      try {
        this.ensureContext();
        const t = this.ctx.currentTime;
        // Kick
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(150, t);
        kickOsc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
        kickGain.gain.setValueAtTime(0.12, t);
        kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kickOsc.start(t);
        kickOsc.stop(t + 0.15);

        // Hi-Hat
        const hatOsc = this.ctx.createOscillator();
        const hatGain = this.ctx.createGain();
        hatOsc.type = 'square';
        hatOsc.frequency.setValueAtTime(4500, t + 0.15);
        hatGain.gain.setValueAtTime(0.04, t + 0.15);
        hatGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        hatOsc.connect(hatGain);
        hatGain.connect(this.ctx.destination);
        hatOsc.start(t + 0.15);
        hatOsc.stop(t + 0.23);

        if (callback) callback();
      } catch (e) {
        if (callback) callback();
      }
    }
  }

  const sound = new SoundEngine();
  window.srSound = sound;

  // ==========================================================================
  // 2. CUSTOM MAGNETIC GLOW CURSOR & SHOCKWAVES
  // ==========================================================================
  function initCustomCursor() {
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Click Shockwave Ripple
    window.addEventListener('click', (e) => {
      sound.playClick();
      const shockwave = document.createElement('div');
      shockwave.className = 'click-shockwave';
      shockwave.style.left = `${e.clientX}px`;
      shockwave.style.top = `${e.clientY}px`;
      document.body.appendChild(shockwave);
      setTimeout(() => shockwave.remove(), 700);

      ring.classList.add('cursor-active');
      setTimeout(() => ring.classList.remove('cursor-active'), 180);
    });

    // Hover Magnetism
    const interactables = 'a, button, input, textarea, .tilt-card, [data-interactive], [role="button"]';
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactables);
      if (target && !isHovering) {
        isHovering = true;
        ring.classList.add('cursor-hover');
        sound.playHover();
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactables);
      if (target && isHovering) {
        isHovering = false;
        ring.classList.remove('cursor-hover');
      }
    });
  }

  // ==========================================================================
  // 3. ENHANCED 3D TILT WITH DYNAMIC HOLOGRAPHIC GLARE
  // ==========================================================================
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
      if (!card.querySelector('.tilt-glare')) {
        const glare = document.createElement('div');
        glare.className = 'tilt-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ==========================================================================
  // 4. ANIMATED NUMBER COUNTERS (Scroll-Triggered)
  // ==========================================================================
  function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            obs.unobserve(el);
            const target = parseFloat(el.getAttribute('data-counter'));
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            const duration = 1600;
            const startTime = performance.now();

            function update(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = easeProgress * target;

              el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
              }
            }
            requestAnimationFrame(update);
          }
        });
      },
      { threshold: 0.2 }
    );

    counterElements.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
  // 5. TOAST NOTIFICATION SYSTEM
  // ==========================================================================
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-6 right-6 z-[99999] flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-mono-code transition-all duration-300 transform translate-y-4 opacity-0 ${
      type === 'success'
        ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800 backdrop-blur-md dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-200'
        : 'bg-slate-900/95 border-slate-700 text-white backdrop-blur-md'
    }`;

    const icon = type === 'success' ? 'check_circle' : 'info';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-base ${type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary'}">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    sound.playWhoosh();

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
  window.srShowToast = showToast;

  // ==========================================================================
  // 6. CONFETTI & ELECTRIC SPARK EXPLOSION SYSTEM
  // ==========================================================================
  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#4f46e5', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.7,
        vx: (Math.random() - 0.5) * 22,
        vy: (Math.random() - 0.8) * 24,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.55,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rSpeed;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animate);
  }
  window.srTriggerConfetti = triggerConfetti;

  // ==========================================================================
  // 7. CINEMATIC VIDEO PLAYER MODAL & SIMULATOR
  // ==========================================================================
  const videoProjects = [
    {
      id: 'commercial',
      title: 'Cinematic Commercial Re-cut',
      category: 'DaVinci 3D Node Grade • Sound Pass',
      duration: '01:45',
      fps: '60 FPS',
      resolution: '4K DCI Widescreen',
      tags: ['DaVinci Resolve', 'Sound Foley', 'Color Grading', 'Premiere Pro'],
      description:
        'A comprehensive color overhaul and sound reconstruction. Developed 3 bespoke 3D LUT nodes with split-toning in shadows and highlights, paired with 40+ tactile Foley audio assets.'
    },
    {
      id: 'docu',
      title: 'High-Retention YouTube Docu-Edit',
      category: 'Social Pacing • Kinetic Motion',
      duration: '08:24',
      fps: '60 FPS',
      resolution: '4K Ultra HD',
      tags: ['Kinetic Typography', '3D Camera Track', 'Retention Scripting', 'After Effects'],
      description:
        'Fast-paced narrative documentary editing engineered around audience drop-off markers. Custom After Effects motion graphics, speed-ramped whip zooms, and sound risers drove a verified 68% average retention.'
    },
    {
      id: 'saas',
      title: 'Fast-Paced SaaS Product Reel',
      category: '3D Mockups • Beat-Synced Cuts',
      duration: '00:45',
      fps: '60 FPS',
      resolution: '4K Ultra HD',
      tags: ['3D App Rigging', 'Synth SFX', 'Micro-Cuts', 'Motion Design'],
      description:
        'High-energy product launch video. Integrates floating 3D glass product viewports, synthesized whooshes, UI zoom bursts, and precise 128 BPM beat-matched transitions.'
    }
  ];

  class VideoModalController {
    constructor() {
      this.modal = document.getElementById('video-player-modal');
      this.canvas = document.getElementById('video-sim-canvas');
      this.playBtn = document.getElementById('video-modal-play-btn');
      this.timeline = document.getElementById('video-modal-timeline');
      this.timeDisplay = document.getElementById('video-modal-time');
      this.spectrumCanvas = document.getElementById('video-modal-spectrum');
      this.closeBtn = document.getElementById('video-modal-close-btn');

      this.isPlaying = false;
      this.currentTime = 0;
      this.totalTime = 105; // 01:45
      this.playbackRate = 1;
      this.animFrame = null;
      this.activeProject = videoProjects[0];

      this.init();
    }

    init() {
      if (!this.modal) return;

      // Close handlers
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });

      window.addEventListener('keydown', (e) => {
        if (this.modal.classList.contains('open')) {
          if (e.key === 'Escape') this.close();
          if (e.key === ' ') {
            e.preventDefault();
            this.togglePlay();
          }
        }
      });

      // Play/Pause
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => this.togglePlay());
      }

      // Timeline Scrubber
      if (this.timeline) {
        this.timeline.addEventListener('input', (e) => {
          this.currentTime = (parseFloat(e.target.value) / 100) * this.totalTime;
          this.updateTimeDisplay();
        });
      }

      // Speed selectors
      const speedBtns = document.querySelectorAll('.video-speed-btn');
      speedBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          speedBtns.forEach((b) => b.classList.remove('bg-primary', 'text-white'));
          btn.classList.add('bg-primary', 'text-white');
          this.playbackRate = parseFloat(btn.dataset.speed || '1');
          sound.playClick();
        });
      });

      // Card triggers
      document.querySelectorAll('[data-open-video]').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const projectId = trigger.getAttribute('data-open-video');
          const proj = videoProjects.find((p) => p.id === projectId) || videoProjects[0];
          this.open(proj);
        });
      });
    }

    open(project) {
      this.activeProject = project;
      document.getElementById('video-modal-title').textContent = project.title;
      document.getElementById('video-modal-category').textContent = project.category;
      document.getElementById('video-modal-res').textContent = `${project.resolution} • ${project.fps}`;
      document.getElementById('video-modal-desc').textContent = project.description;

      const tagContainer = document.getElementById('video-modal-tags');
      if (tagContainer) {
        tagContainer.innerHTML = project.tags
          .map(
            (t) =>
              `<span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono-code text-xs">${t}</span>`
          )
          .join('');
      }

      this.currentTime = 0;
      this.isPlaying = true;
      if (this.playBtn) {
        this.playBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">pause</span>';
      }

      this.modal.classList.add('open');
      sound.playWhoosh();
      this.startLoop();
    }

    close() {
      this.isPlaying = false;
      this.modal.classList.remove('open');
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
    }

    togglePlay() {
      this.isPlaying = !this.isPlaying;
      sound.playClick();
      if (this.playBtn) {
        this.playBtn.innerHTML = this.isPlaying
          ? '<span class="material-symbols-outlined text-2xl">pause</span>'
          : '<span class="material-symbols-outlined text-2xl">play_arrow</span>';
      }
    }

    updateTimeDisplay() {
      const curM = Math.floor(this.currentTime / 60);
      const curS = Math.floor(this.currentTime % 60);
      const totM = Math.floor(this.totalTime / 60);
      const totS = Math.floor(this.totalTime % 60);
      const formatted = `${String(curM).padStart(2, '0')}:${String(curS).padStart(2, '0')} / ${String(totM).padStart(2, '0')}:${String(totS).padStart(2, '0')}`;
      if (this.timeDisplay) this.timeDisplay.textContent = formatted;
      if (this.timeline) this.timeline.value = (this.currentTime / this.totalTime) * 100;
    }

    startLoop() {
      const vCanvas = this.canvas;
      const sCanvas = this.spectrumCanvas;
      if (!vCanvas || !sCanvas) return;

      const vCtx = vCanvas.getContext('2d');
      const sCtx = sCanvas.getContext('2d');

      let lastTime = performance.now();

      const loop = (now) => {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (this.isPlaying) {
          this.currentTime += delta * this.playbackRate;
          if (this.currentTime >= this.totalTime) {
            this.currentTime = 0;
          }
          this.updateTimeDisplay();
        }

        // Render simulated generative video canvas
        vCtx.fillStyle = '#0a0e17';
        vCtx.fillRect(0, 0, vCanvas.width, vCanvas.height);

        const t = this.currentTime;

        // Dynamic cyber scene / motion graphic frames
        const cx = vCanvas.width / 2;
        const cy = vCanvas.height / 2;

        // Animated neon concentric rings & audio waveform ripples
        for (let r = 1; r <= 5; r++) {
          vCtx.beginPath();
          const radius = (r * 45 + Math.sin(t * 3 + r) * 20) % (vCanvas.width / 2);
          vCtx.arc(cx, cy, radius, 0, Math.PI * 2);
          vCtx.strokeStyle = r % 2 === 0 ? 'rgba(37, 99, 235, 0.4)' : 'rgba(99, 102, 241, 0.3)';
          vCtx.lineWidth = 2;
          vCtx.stroke();
        }

        // Futuristic HUD Grid lines
        vCtx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
        vCtx.lineWidth = 1;
        vCtx.beginPath();
        vCtx.moveTo(cx, 0);
        vCtx.lineTo(cx, vCanvas.height);
        vCtx.moveTo(0, cy);
        vCtx.lineTo(vCanvas.width, cy);
        vCtx.stroke();

        // Animated Central Monogram Graphic
        vCtx.save();
        vCtx.translate(cx, cy);
        vCtx.rotate(t * 0.4);
        vCtx.strokeStyle = '#60a5fa';
        vCtx.lineWidth = 3;
        vCtx.strokeRect(-40, -40, 80, 80);
        vCtx.restore();

        // Frame Watermark Info
        vCtx.font = '11px "JetBrains Mono"';
        vCtx.fillStyle = '#38bdf8';
        vCtx.fillText(`[REC] 4K PRORES 422 HQ • SMPTE ${this.timeDisplay ? this.timeDisplay.textContent.split(' / ')[0] : ''}:24`, 16, 26);
        vCtx.fillStyle = '#94a3b8';
        vCtx.fillText(`RENDER ENGINE: THREE-PHASE COLOR MATRIX • 60 FPS`, 16, vCanvas.height - 18);

        // Render Audio Spectrum Bars
        sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
        const barCount = 36;
        const barWidth = sCanvas.width / barCount - 2;

        for (let i = 0; i < barCount; i++) {
          const freqHeight = this.isPlaying
            ? Math.abs(Math.sin(t * 8 + i * 0.4) * Math.cos(t * 4 + i * 0.2)) * (sCanvas.height * 0.85) + 4
            : 3;

          const grad = sCtx.createLinearGradient(0, sCanvas.height, 0, 0);
          grad.addColorStop(0, '#2563eb');
          grad.addColorStop(0.7, '#6366f1');
          grad.addColorStop(1, '#38bdf8');

          sCtx.fillStyle = grad;
          sCtx.fillRect(i * (barWidth + 2), sCanvas.height - freqHeight, barWidth, freqHeight);
        }

        if (this.modal.classList.contains('open')) {
          this.animFrame = requestAnimationFrame(loop);
        }
      };

      this.animFrame = requestAnimationFrame(loop);
    }
  }

  // ==========================================================================
  // 8. GRAPHIC DESIGN INSPECTOR LIGHTBOX & GRID OVERLAY
  // ==========================================================================
  class DesignLightboxController {
    constructor() {
      this.modal = document.getElementById('design-lightbox-modal');
      this.img = document.getElementById('design-modal-img');
      this.title = document.getElementById('design-modal-title');
      this.cat = document.getElementById('design-modal-category');
      this.desc = document.getElementById('design-modal-desc');
      this.gridOverlay = document.getElementById('design-modal-grid');
      this.gridToggle = document.getElementById('design-grid-toggle-btn');
      this.paletteContainer = document.getElementById('design-modal-palette');
      this.closeBtn = document.getElementById('design-modal-close-btn');

      this.isGridActive = false;
      this.zoomLevel = 1;
      this.init();
    }

    init() {
      if (!this.modal) return;

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });

      window.addEventListener('keydown', (e) => {
        if (this.modal.classList.contains('open') && e.key === 'Escape') {
          this.close();
        }
      });

      // Grid toggle button
      if (this.gridToggle) {
        this.gridToggle.addEventListener('click', () => {
          this.isGridActive = !this.isGridActive;
          sound.playClick();
          if (this.gridOverlay) {
            this.gridOverlay.classList.toggle('hidden', !this.isGridActive);
          }
          this.gridToggle.classList.toggle('bg-primary', this.isGridActive);
          this.gridToggle.classList.toggle('text-white', this.isGridActive);
          showToast(this.isGridActive ? 'Vector Geometry Overlay Enabled' : 'Vector Grid Overlay Disabled', 'info');
        });
      }

      // Connect triggers
      document.querySelectorAll('[data-open-design]').forEach((card) => {
        card.addEventListener('click', () => {
          const imgElem = card.querySelector('img');
          const title = card.querySelector('h3')?.textContent || 'Design System';
          const cat = card.querySelector('.font-label-caps')?.textContent || 'Brand Identity';
          const desc = card.querySelector('p')?.textContent || '';
          const colors = card.dataset.palette ? card.dataset.palette.split(',') : ['#2563eb', '#4f46e5', '#9333ea', '#0f172a'];

          this.open({
            src: imgElem?.src || '',
            alt: imgElem?.alt || title,
            title,
            category: cat,
            desc,
            palette: colors
          });
        });
      });
    }

    open(data) {
      if (this.img) {
        this.img.src = data.src;
        this.img.alt = data.alt;
      }
      if (this.title) this.title.textContent = data.title;
      if (this.cat) this.cat.textContent = data.category;
      if (this.desc) this.desc.textContent = data.desc;

      // Color Swatches with click-to-copy
      if (this.paletteContainer) {
        this.paletteContainer.innerHTML = data.palette
          .map(
            (hex) => `
          <button class="palette-swatch flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:scale-105 transition-all shadow-sm" data-hex="${hex.trim()}">
            <span class="h-3.5 w-3.5 rounded-full" style="background-color: ${hex.trim()}"></span>
            <span class="font-mono-code text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">${hex.trim()}</span>
          </button>
        `
          )
          .join('');

        this.paletteContainer.querySelectorAll('.palette-swatch').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const hex = btn.getAttribute('data-hex');
            navigator.clipboard.writeText(hex).then(() => {
              sound.playSuccess();
              showToast(`Copied ${hex} to clipboard!`, 'success');
            });
          });
        });
      }

      this.isGridActive = false;
      if (this.gridOverlay) this.gridOverlay.classList.add('hidden');
      if (this.gridToggle) {
        this.gridToggle.classList.remove('bg-primary', 'text-white');
      }

      this.modal.classList.add('open');
      sound.playWhoosh();
    }

    close() {
      this.modal.classList.remove('open');
    }
  }

  // ==========================================================================
  // 9. APEX FLOW LIVE TELEMETRY SIMULATOR
  // ==========================================================================
  function initApexFlowTelemetry() {
    const barsContainer = document.getElementById('apex-telemetry-bars');
    const latencyElem = document.getElementById('apex-latency-display');
    const rpsElem = document.getElementById('apex-rps-display');
    const timeFilterBtns = document.querySelectorAll('.apex-time-filter');

    if (!barsContainer) return;

    let timeframeMultiplier = 1;

    // Create 16 live streaming telemetry bars
    barsContainer.innerHTML = '';
    const bars = [];
    for (let i = 0; i < 16; i++) {
      const bar = document.createElement('div');
      bar.className = 'w-full rounded-t-md transition-all duration-300 audio-bar';
      const initialHeight = Math.floor(Math.random() * 60) + 20;
      bar.style.height = `${initialHeight}%`;
      bar.style.backgroundColor = i > 12 ? '#4f46e5' : '#2563eb';
      barsContainer.appendChild(bar);
      bars.push(bar);
    }

    // Interval to stream live data
    setInterval(() => {
      // Shift bars to the left and append new value
      for (let i = 0; i < bars.length - 1; i++) {
        bars[i].style.height = bars[i + 1].style.height;
      }
      const newHeight = Math.min(95, Math.max(15, Math.floor(Math.random() * 70 * timeframeMultiplier) + 25));
      bars[bars.length - 1].style.height = `${newHeight}%`;

      // Live latency jitter (24ms - 36ms)
      if (latencyElem) {
        const lat = (24 + Math.random() * 12).toFixed(1);
        latencyElem.textContent = `${lat} ms`;
      }

      // Live RPS jitter
      if (rpsElem) {
        const rps = (1420 + Math.random() * 240).toFixed(0);
        rpsElem.textContent = `${rps} req/s`;
      }
    }, 850);

    // Timeframe filters
    timeFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        timeFilterBtns.forEach((b) => b.classList.remove('bg-primary', 'text-white'));
        btn.classList.add('bg-primary', 'text-white');
        sound.playClick();
        const tf = btn.dataset.timeframe;
        timeframeMultiplier = tf === '1h' ? 1 : tf === '24h' ? 0.8 : 0.6;
        showToast(`Telemetry range adjusted to ${tf.toUpperCase()}`, 'info');
      });
    });
  }

  // ==========================================================================
  // 10. PULSE AI PROMPT PLAYGROUND
  // ==========================================================================
  function initPulseAIPlayground() {
    const promptInput = document.getElementById('pulse-prompt-input');
    const runBtn = document.getElementById('pulse-run-btn');
    const outputElem = document.getElementById('pulse-output-stream');
    const speedElem = document.getElementById('pulse-speed-metric');
    const ttftElem = document.getElementById('pulse-ttft-metric');
    const copyBtn = document.getElementById('pulse-copy-btn');
    const sampleChips = document.querySelectorAll('.pulse-sample-prompt');

    if (!runBtn || !outputElem) return;

    const sampleResponses = {
      default: `{\n  "status": "ready",\n  "model": "gemini-1.5-pro",\n  "tokens": 128,\n  "confidence": 0.984,\n  "recommendation": "Engineered high-retention motion sequence with 128 BPM synchronized cuts."\n}`,
      viral: `// HIGH-RETENTION SCRIPT HOOK MATRIX\n[00:00 - 00:03] Whip-zoom into 3D glass isometric interface.\n[00:04 - 00:07] Text reveal: "Most creators spend 8 hours editing what takes 60 seconds."\n[00:08 - 00:12] Kinetic match cut to split-screen telemetry comparison.`,
      branding: `/* LUXE NEO-BRUTALIST DESIGN TOKENS */\n:root {\n  --color-core: #2563eb;\n  --color-deep: #090d16;\n  --border-radius: 2rem;\n  --bezier-curve: cubic-bezier(0.16, 1, 0.3, 1);\n}`
    };

    sampleChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        sound.playClick();
        if (promptInput) {
          promptInput.value = chip.dataset.promptText || '';
        }
      });
    });

    let typingInterval = null;

    runBtn.addEventListener('click', () => {
      sound.playClick();
      if (typingInterval) clearInterval(typingInterval);

      runBtn.disabled = true;
      runBtn.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span> Generating...`;

      outputElem.textContent = '';
      if (speedElem) speedElem.textContent = 'Calculating...';
      if (ttftElem) ttftElem.textContent = '12.4 ms';

      const promptVal = promptInput ? promptInput.value.toLowerCase() : '';
      let targetText = sampleResponses.default;
      if (promptVal.includes('script') || promptVal.includes('viral') || promptVal.includes('hook')) {
        targetText = sampleResponses.viral;
      } else if (promptVal.includes('brand') || promptVal.includes('design') || promptVal.includes('token')) {
        targetText = sampleResponses.branding;
      }

      let charIndex = 0;
      const startTime = performance.now();

      typingInterval = setInterval(() => {
        if (charIndex < targetText.length) {
          outputElem.textContent += targetText[charIndex];
          charIndex++;
          // Simulated sound tick every 6 chars
          if (charIndex % 6 === 0) sound.playHover();
        } else {
          clearInterval(typingInterval);
          runBtn.disabled = false;
          runBtn.innerHTML = `<span class="material-symbols-outlined text-sm">play_arrow</span> Run Inference`;
          const elapsed = (performance.now() - startTime) / 1000;
          const tokens = Math.floor(charIndex / 4);
          const tps = (tokens / elapsed).toFixed(1);
          if (speedElem) speedElem.textContent = `${tps} tok/s`;
          sound.playSuccess();
          showToast(`Inference complete (${tokens} tokens generated)`, 'success');
        }
      }, 16);
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputElem.textContent).then(() => {
          sound.playSuccess();
          showToast('Code copied to clipboard!', 'success');
        });
      });
    }
  }

  // ==========================================================================
  // 11. DIGITAL RESUME SLIDE-OVER DRAWER
  // ==========================================================================
  function initResumeDrawer() {
    const drawer = document.getElementById('resume-drawer-backdrop');
    const triggers = document.querySelectorAll('[data-open-resume]');
    const closeBtn = document.getElementById('resume-drawer-close');
    const printBtn = document.getElementById('resume-print-btn');

    if (!drawer) return;

    triggers.forEach((t) => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.add('open');
        sound.playWhoosh();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    }

    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('open');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (drawer.classList.contains('open') && e.key === 'Escape') {
        drawer.classList.remove('open');
      }
    });

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        sound.playClick();
        window.print();
      });
    }
  }

  // ==========================================================================
  // 12. "SHOCK MODE" HYPERSPACE WARP EASTER EGG
  // ==========================================================================
  function initShockMode() {
    const shockBtn = document.getElementById('shock-mode-btn');
    const canvas = document.getElementById('hyperspace-canvas');
    const hud = document.getElementById('shock-hud');

    if (!shockBtn || !canvas) return;

    const ctx = canvas.getContext('2d');
    let isActive = false;
    let stars = [];
    let animId = null;

    function resetStars() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 800; i++) {
        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 2,
          y: (Math.random() - 0.5) * canvas.height * 2,
          z: Math.random() * canvas.width,
          oZ: Math.random() * canvas.width
        });
      }
    }

    function renderWarp() {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= 28; // Warp speed
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const k = 280 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = Math.max(1.2, (1 - star.z / canvas.width) * 4);
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.z < canvas.width * 0.4 ? '#60a5fa' : '#c084fc';
          ctx.fill();

          // Star light streak
          const prevK = 280 / (star.z + 40);
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)';
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        }
      });

      if (isActive) {
        animId = requestAnimationFrame(renderWarp);
      }
    }

    shockBtn.addEventListener('click', () => {
      if (isActive) return;
      isActive = true;
      resetStars();
      canvas.classList.add('active');
      if (hud) hud.classList.add('active');

      sound.playWarp();
      document.body.style.transform = 'scale(0.995)';
      setTimeout(() => (document.body.style.transform = ''), 200);

      renderWarp();

      showToast('⚡ HYPERDRIVE WARP ENGAGED', 'info');

      // Auto-exit after 4.2 seconds
      setTimeout(() => {
        isActive = false;
        canvas.classList.remove('active');
        if (hud) hud.classList.remove('active');
        if (animId) cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        triggerConfetti();
        sound.playSuccess();
        showToast('Warp Sequence Complete. Welcome back.', 'success');
      }, 4200);
    });

    // Click canvas to abort warp
    canvas.addEventListener('click', () => {
      if (isActive) {
        isActive = false;
        canvas.classList.remove('active');
        if (hud) hud.classList.remove('active');
        if (animId) cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  // ==========================================================================
  // 13. CONTACT FORM VALIDATION & CELEBRATION
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const message = document.getElementById('message')?.value || '';

      const services = Array.from(form.querySelectorAll('input[name="service"]:checked')).map((el) => el.value);
      const budget = form.querySelector('input[name="budget"]:checked')?.value || 'unspecified';

      // Save inquiry to localStorage
      const inquiry = {
        name,
        email,
        message,
        services,
        budget,
        timestamp: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('sr_inquiries') || '[]');
        stored.push(inquiry);
        localStorage.setItem('sr_inquiries', JSON.stringify(stored));
      } catch (err) {}

      // UI state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="material-symbols-outlined text-base animate-spin">progress_activity</span> Transmitting Brief...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-base text-emerald-400">check_circle</span> Dispatched Successfully!`;

        // Trigger confetti particle explosion
        triggerConfetti();
        sound.playSuccess();

        const toast = document.getElementById('form-success-toast');
        if (toast) toast.classList.remove('hidden');

        showToast(`Thank you, ${name}! Your brief was dispatched.`, 'success');

        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 4000);
      }, 1000);
    });
  }

  // ==========================================================================
  // 14. THEME TOGGLE & SOUND TOGGLE CONTROLLERS
  // ==========================================================================
  function initHeaderControls() {
    // Sound Toggle Button
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      const updateSoundUI = () => {
        const isMuted = !sound.enabled;
        soundBtn.innerHTML = `
          <span class="material-symbols-outlined text-base ${sound.enabled ? 'text-primary' : 'text-slate-400'}">${sound.enabled ? 'volume_up' : 'volume_off'}</span>
          <span class="hidden md:inline font-mono-code text-[11px] font-semibold">${sound.enabled ? 'FX ON' : 'MUTED'}</span>
        `;
        soundBtn.title = sound.enabled ? 'Audio FX Enabled (Click to Mute)' : 'Audio FX Muted (Click to Enable)';
      };

      updateSoundUI();

      soundBtn.addEventListener('click', () => {
        const newState = sound.toggle();
        updateSoundUI();
        showToast(newState ? 'Interactive Sound FX Enabled' : 'Interactive Sound FX Muted', 'info');
      });
    }

    // Dark Mode Toggle Button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      const savedTheme = localStorage.getItem('sr_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }

      const updateThemeUI = () => {
        const isDark = document.documentElement.classList.contains('dark');
        themeBtn.innerHTML = `
          <span class="material-symbols-outlined text-base ${isDark ? 'text-amber-400' : 'text-slate-700'}">${isDark ? 'light_mode' : 'dark_mode'}</span>
        `;
        themeBtn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      };

      updateThemeUI();

      themeBtn.addEventListener('click', () => {
        sound.playClick();
        const isDark = document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light', !isDark);
        localStorage.setItem('sr_theme', isDark ? 'dark' : 'light');
        updateThemeUI();
        showToast(isDark ? 'Cyber Obsidian Dark Mode' : 'Studio Light Mode', 'info');
      });
    }

    // Audio Test Button on L-R Audio Master Card
    const beatBtn = document.getElementById('test-audio-beat-btn');
    if (beatBtn) {
      beatBtn.addEventListener('click', () => {
        sound.playBeatBurst(() => {
          showToast('Synthesized Frequency Burst Fired', 'info');
        });
      });
    }
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initTiltCards();
    initCounters();
    initHeaderControls();
    initApexFlowTelemetry();
    initPulseAIPlayground();
    initResumeDrawer();
    initShockMode();
    initContactForm();

    new VideoModalController();
    new DesignLightboxController();
  });
})();
