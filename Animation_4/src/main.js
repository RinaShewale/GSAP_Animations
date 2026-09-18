import './style.css'
import gsap from 'gsap';

// ==========================================================================
// AETHERIA — Kinetic Architecture Experience Controller (GSAP)
// ==========================================================================

let isGravityAttract = false;
let mouseVelocity = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let lastMouseTime = performance.now();

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParticleCanvas();
  initBackgroundOrbs();
  initKineticGyroscope();
  initCardTiltAndMetrics();
  initEqualizerAnimation();
  initMagneticElements();
  initCanvasRipples();
  initStudioDockControls();
  startLoadingSequence();
});

// --------------------------------------------------------------------------
// 1. Loading Screen Sequence & Seamless Hero Transition
// --------------------------------------------------------------------------
function startLoadingSequence() {
  const loader = document.getElementById('loader');
  const loaderContent = document.getElementById('loaderContent');
  const topPanel = document.querySelector('.top-panel');
  const bottomPanel = document.querySelector('.bottom-panel');
  const loaderBar = document.getElementById('loaderBar');
  const loaderCounter = document.getElementById('loaderCounter');
  const loaderStatus = document.getElementById('loaderStatus');
  const pageWrapper = document.getElementById('pageWrapper');

  gsap.set(pageWrapper, { opacity: 0, visibility: 'hidden' });
  gsap.set(loaderBar, { scaleX: 0 });

  const masterTL = gsap.timeline();

  // Step 1: Reveal brand letters with crisp stagger
  masterTL.to('.brand-letter', {
    y: '0%',
    duration: 0.85,
    stagger: 0.05,
    ease: 'power3.out',
  });

  // Step 2: Animated progress counter & loader fill
  const progressObj = { value: 0 };
  const statusPhrases = [
    { threshold: 15, text: 'Harmonizing light fields...' },
    { threshold: 45, text: 'Constructing kinetic space...' },
    { threshold: 75, text: 'Calibrating magnetic vectors...' },
    { threshold: 95, text: 'Unfolding spatial canvas...' },
  ];

  masterTL.to(
    progressObj,
    {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const currentVal = Math.round(progressObj.value);
        if (loaderCounter) {
          loaderCounter.textContent = `${currentVal < 10 ? '0' + currentVal : currentVal}%`;
        }
        gsap.set(loaderBar, { scaleX: currentVal / 100 });

        for (const item of statusPhrases) {
          if (currentVal >= item.threshold && loaderStatus) {
            loaderStatus.textContent = item.text;
          }
        }
      },
    },
    '-=0.3'
  );

  // Step 3: Dismiss Preloader (Split Curtain Aperture)
  masterTL
    .to(loaderContent, {
      y: -25,
      opacity: 0,
      duration: 0.55,
      ease: 'power3.in',
    })
    .set(pageWrapper, {
      visibility: 'visible',
      opacity: 1,
    })
    .to(
      topPanel,
      {
        yPercent: -101,
        duration: 1.05,
        ease: 'power4.inOut',
      },
      '+=0.04'
    )
    .to(
      bottomPanel,
      {
        yPercent: 101,
        duration: 1.05,
        ease: 'power4.inOut',
      },
      '<'
    )
    .set(loader, {
      display: 'none',
    });

  // Step 4: Staggered Hero Page Entrance
  masterTL.add(playHeroRevealTimeline(), '-=0.45');
}

// --------------------------------------------------------------------------
// 2. Hero Entrance Animation Timeline
// --------------------------------------------------------------------------
function playHeroRevealTimeline() {
  const tl = gsap.timeline();

  // Navbar slide down
  tl.fromTo(
    '#navbar',
    { y: -35, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
  );

  // Eyebrow badge pop
  tl.fromTo(
    '#heroBadge',
    { scale: 0.82, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' },
    '-=0.55'
  );

  // Headline words upward stagger
  tl.fromTo(
    '.title-word',
    { yPercent: 120, opacity: 0, rotate: 2 },
    {
      yPercent: 0,
      opacity: 1,
      rotate: 0,
      stagger: 0.08,
      duration: 0.95,
      ease: 'power4.out',
    },
    '-=0.5'
  );

  // Hero Description
  tl.fromTo(
    '#heroDesc',
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
    '-=0.55'
  );

  // Kinetic Gyroscope Reveal
  tl.fromTo(
    '#gyroWrap',
    { scale: 0.6, opacity: 0, rotate: -30 },
    { scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.5)' },
    '-=0.55'
  );

  // Studio Dock Cascade
  tl.fromTo(
    '#studioDock',
    { y: 25, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
    '-=0.6'
  );

  // Showcase 3D Cards
  tl.fromTo(
    '.interactive-card',
    { y: 55, opacity: 0, scale: 0.94 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.12,
      duration: 0.95,
      ease: 'power3.out',
    },
    '-=0.5'
  );

  // Footer HUD
  tl.fromTo(
    '#footerHud',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
    '-=0.55'
  );

  return tl;
}

// --------------------------------------------------------------------------
// 3. Custom Fluid Cursor & Real-Time Velocity HUD
// --------------------------------------------------------------------------
function initCursor() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const hudCoords = document.getElementById('hudCoords');
  const hudVelocity = document.getElementById('hudVelocity');

  if (!cursorDot || !cursorRing) return;

  const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3' });
  const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3' });
  const setRingX = gsap.quickTo(cursorRing, 'x', { duration: 0.26, ease: 'power3' });
  const setRingY = gsap.quickTo(cursorRing, 'y', { duration: 0.26, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const now = performance.now();
    const dt = Math.max(now - lastMouseTime, 16);

    const dist = Math.hypot(clientX - lastMouseX, clientY - lastMouseY);
    mouseVelocity = Math.round((dist / dt) * 1000);

    lastMouseX = clientX;
    lastMouseY = clientY;
    lastMouseTime = now;

    setDotX(clientX);
    setDotY(clientY);
    setRingX(clientX);
    setRingY(clientY);

    // Update telemetry HUD
    if (hudCoords) {
      const padX = String(Math.round(clientX)).padStart(4, '0');
      const padY = String(Math.round(clientY)).padStart(4, '0');
      hudCoords.textContent = `X: ${padX} | Y: ${padY}`;
    }

    if (hudVelocity) {
      const padVel = String(Math.min(mouseVelocity, 9999)).padStart(3, '0');
      hudVelocity.textContent = `${padVel} PX/S`;
    }
  });

  // Hover expansion over interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, [data-magnetic], [data-tilt], .interactive-card, .kinetic-gyro-wrap'
  );

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// --------------------------------------------------------------------------
// 4. Interactive Ethereal Light Particle Trail (Canvas)
// --------------------------------------------------------------------------
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 60;

  window.addEventListener('mousemove', (e) => {
    // Spawn subtle sparkling particle on cursor movement
    if (particles.length < maxParticles && Math.random() > 0.4) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.3,
        size: Math.random() * 2.5 + 1,
        alpha: 0.7,
        decay: Math.random() * 0.015 + 0.01,
      });
    }
  });

  // Expose global particle burst for Shockwave & Clicks
  window.burstParticles = function (x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x: x || width / 2,
        y: y || height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        alpha: 0.9,
        decay: Math.random() * 0.02 + 0.01,
      });
    }
  };

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

// --------------------------------------------------------------------------
// 5. Interactive 3D Concentric Gyroscope Sculpture
// --------------------------------------------------------------------------
function initKineticGyroscope() {
  const gyroWrap = document.getElementById('gyroWrap');
  const gyroCore = document.getElementById('gyroCore');
  const hudState = document.getElementById('hudState');

  if (!gyroWrap || !gyroCore) return;

  // Real-time 3D Perspective Deflection toward mouse
  window.addEventListener('mousemove', (e) => {
    const rect = gyroWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    gsap.to(gyroCore, {
      rotateY: deltaX * 28,
      rotateX: -deltaY * 28,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  // Interactive Spin Acceleration on click
  gyroWrap.addEventListener('click', () => {
    if (hudState) hudState.textContent = 'GYROSCOPE ACCELERATED';

    const rings = gyroCore.querySelectorAll('.gyro-ring');
    gsap.fromTo(
      rings,
      { scale: 0.85 },
      { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.out' }
    );

    gsap.to(gyroCore, {
      rotateZ: '+=720',
      duration: 1.8,
      ease: 'power4.out',
      onComplete: () => {
        if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
      },
    });

    if (window.burstParticles) {
      const rect = gyroWrap.getBoundingClientRect();
      window.burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    }
  });
}

// --------------------------------------------------------------------------
// 6. Interactive 3D Card Tilt, Specular Glare & Live Telemetry
// --------------------------------------------------------------------------
function initCardTiltAndMetrics() {
  const cards = document.querySelectorAll('[data-tilt]');
  const anglePitch = document.getElementById('anglePitch');
  const angleRoll = document.getElementById('angleRoll');
  const hudState = document.getElementById('hudState');

  cards.forEach((card, index) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.35,
      });

      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);

      // Update Card 3 live 3D angles in real-time
      if (card.id === 'card3' && anglePitch && angleRoll) {
        anglePitch.textContent = `${rotateX > 0 ? '+' : ''}${rotateX.toFixed(1)}°`;
        angleRoll.textContent = `${rotateY > 0 ? '+' : ''}${rotateY.toFixed(1)}°`;
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out',
        duration: 0.65,
      });

      if (card.id === 'card3' && anglePitch && angleRoll) {
        anglePitch.textContent = '0.0°';
        angleRoll.textContent = '0.0°';
      }
    });

    // Card interactive resonance click
    card.addEventListener('click', () => {
      if (hudState) hudState.textContent = `RESONATING ARTIFACT 0${index + 1}`;

      gsap.fromTo(
        card,
        { scale: 0.96 },
        { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.38)' }
      );

      setTimeout(() => {
        if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
      }, 1000);
    });
  });
}

// --------------------------------------------------------------------------
// 7. Dynamic Equalizer Visualizer Bars (Card 1)
// --------------------------------------------------------------------------
function initEqualizerAnimation() {
  const bars = document.querySelectorAll('.eq-bar');
  if (!bars.length) return;

  bars.forEach((bar, i) => {
    // Dynamic looping sine heights
    gsap.to(bar, {
      height: () => `${Math.floor(Math.random() * 70 + 25)}%`,
      duration: 0.4 + i * 0.08,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
}

// --------------------------------------------------------------------------
// 8. Ambient Glowing Background Orbs & Dual-Mode Gravitation
// --------------------------------------------------------------------------
function initBackgroundOrbs() {
  const orb1 = document.getElementById('orb1');
  const orb2 = document.getElementById('orb2');
  const orb3 = document.getElementById('orb3');

  if (!orb1 || !orb2 || !orb3) return;

  // Gentle autonomous breathing drift
  gsap.to(orb1, {
    x: '+=50',
    y: '+=35',
    scale: 1.08,
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to(orb2, {
    x: '-=45',
    y: '-=50',
    scale: 1.12,
    duration: 11,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to(orb3, {
    x: '+=35',
    y: '-=25',
    scale: 0.94,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  const quickOrb1X = gsap.quickTo(orb1, 'x', { duration: 1.2, ease: 'power2.out' });
  const quickOrb1Y = gsap.quickTo(orb1, 'y', { duration: 1.2, ease: 'power2.out' });
  const quickOrb2X = gsap.quickTo(orb2, 'x', { duration: 1.8, ease: 'power2.out' });
  const quickOrb2Y = gsap.quickTo(orb2, 'y', { duration: 1.8, ease: 'power2.out' });

  window.addEventListener('mousemove', (e) => {
    if (isGravityAttract) {
      // Gravitational attraction: orbs converge toward cursor
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      quickOrb1X(cx * 0.35);
      quickOrb1Y(cy * 0.35);
      quickOrb2X(cx * -0.25);
      quickOrb2Y(cy * -0.25);
    } else {
      // Subtle depth parallax
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      quickOrb1X(normX * 50);
      quickOrb1Y(normY * 35);
      quickOrb2X(-normX * 70);
      quickOrb2Y(-normY * 50);
    }
  });
}

// --------------------------------------------------------------------------
// 9. Magnetic Hover Attraction on Interactive Elements
// --------------------------------------------------------------------------
function initMagneticElements() {
  const magnetics = document.querySelectorAll('[data-magnetic]');

  magnetics.forEach((elem) => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const elemCenterX = rect.left + rect.width / 2;
      const elemCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - elemCenterX) * 0.3;
      const deltaY = (e.clientY - elemCenterY) * 0.3;

      gsap.to(elem, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    elem.addEventListener('mouseleave', () => {
      gsap.to(elem, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}

// --------------------------------------------------------------------------
// 10. Interactive Canvas Click Ripple Rings
// --------------------------------------------------------------------------
function initCanvasRipples() {
  const rippleLayer = document.getElementById('rippleLayer');
  if (!rippleLayer) return;

  window.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .interactive-card, .kinetic-gyro-wrap')) return;

    const ripple = document.createElement('div');
    ripple.className = 'interactive-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.style.width = '120px';
    ripple.style.height = '120px';

    rippleLayer.appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0.1, opacity: 0.75 },
      {
        scale: 3,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      }
    );

    if (window.burstParticles) {
      window.burstParticles(e.clientX, e.clientY, 16);
    }
  });
}

// --------------------------------------------------------------------------
// 11. Floating Studio Dock Controls
// --------------------------------------------------------------------------
function initStudioDockControls() {
  const btnPulse = document.getElementById('btnPulse');
  const btnCycleColor = document.getElementById('btnCycleColor');
  const btnGyro = document.getElementById('btnGyro');
  const btnGravity = document.getElementById('btnGravity');
  const btnVibe = document.getElementById('btnVibe');
  const btnReplay = document.getElementById('btnReplay');
  const hudState = document.getElementById('hudState');
  const vibeLabel = document.getElementById('vibeLabel');
  const gravityLabel = document.getElementById('gravityLabel');
  const miniAuraText = document.getElementById('miniAuraText');
  const gyroCore = document.getElementById('gyroCore');

  // A. Spatial Shockwave
  if (btnPulse) {
    btnPulse.addEventListener('click', () => {
      if (hudState) hudState.textContent = 'SPATIAL SHOCKWAVE';

      const shockwaveTL = gsap.timeline({
        onComplete: () => {
          if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
        },
      });

      shockwaveTL
        .to(btnPulse, { scale: 0.92, duration: 0.1, ease: 'power2.in' })
        .to(btnPulse, { scale: 1, duration: 0.35, ease: 'back.out(2)' });

      // Outward elastic recoil on cards
      shockwaveTL.fromTo(
        '.interactive-card',
        { scale: 0.93, y: 15 },
        {
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'elastic.out(1, 0.38)',
        },
        '<'
      );

      // Bloom on background orbs
      shockwaveTL.to(
        '.glow-orb',
        {
          scale: '+=0.2',
          opacity: 1,
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        },
        '<'
      );

      if (window.burstParticles) {
        window.burstParticles(window.innerWidth / 2, window.innerHeight / 2, 45);
      }
    });
  }

  // B. Curated Ethereal Light Themes
  const palettes = [
    {
      name: 'Lumina Iris',
      primary: '#6366f1',
      secondary: '#0ea5e9',
      tertiary: '#f43f5e',
      glow1: 'rgba(99, 102, 241, 0.18)',
      glow2: 'rgba(14, 165, 233, 0.16)',
    },
    {
      name: 'Blush Orchid',
      primary: '#e11d48',
      secondary: '#8b5cf6',
      tertiary: '#f59e0b',
      glow1: 'rgba(225, 29, 72, 0.18)',
      glow2: 'rgba(139, 92, 246, 0.16)',
    },
    {
      name: 'Emerald Zen',
      primary: '#059669',
      secondary: '#0284c7',
      tertiary: '#10b981',
      glow1: 'rgba(5, 150, 105, 0.18)',
      glow2: 'rgba(2, 132, 199, 0.16)',
    },
    {
      name: 'Solar Amber',
      primary: '#d97706',
      secondary: '#e11d48',
      tertiary: '#6366f1',
      glow1: 'rgba(217, 119, 6, 0.18)',
      glow2: 'rgba(225, 29, 72, 0.16)',
    },
    {
      name: 'Celestial Azure',
      primary: '#0284c7',
      secondary: '#6366f1',
      tertiary: '#14b8a6',
      glow1: 'rgba(2, 132, 199, 0.18)',
      glow2: 'rgba(99, 102, 241, 0.16)',
    },
  ];

  let currentPaletteIndex = 0;

  const cyclePalette = () => {
    currentPaletteIndex = (currentPaletteIndex + 1) % palettes.length;
    const theme = palettes[currentPaletteIndex];

    if (vibeLabel) vibeLabel.textContent = `Aura: ${theme.name}`;
    if (miniAuraText) miniAuraText.textContent = `Aura: ${theme.name}`;
    if (hudState) hudState.textContent = `PALETTE: ${theme.name.toUpperCase()}`;

    // Interpolate CSS variables via GSAP
    gsap.to(':root', {
      '--accent-primary': theme.primary,
      '--accent-secondary': theme.secondary,
      '--accent-tertiary': theme.tertiary,
      '--glow-1': theme.glow1,
      '--glow-2': theme.glow2,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        setTimeout(() => {
          if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
        }, 1200);
      },
    });
  };

  if (btnCycleColor) btnCycleColor.addEventListener('click', cyclePalette);
  if (btnVibe) btnVibe.addEventListener('click', cyclePalette);

  // C. Spin Gyroscope Core
  if (btnGyro && gyroCore) {
    btnGyro.addEventListener('click', () => {
      if (hudState) hudState.textContent = 'CORE ACCELERATED';

      gsap.to(gyroCore, {
        rotateZ: '+=1080',
        duration: 2.2,
        ease: 'power4.out',
        onComplete: () => {
          if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
        },
      });

      if (window.burstParticles) {
        const rect = gyroCore.getBoundingClientRect();
        window.burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
      }
    });
  }

  // D. Toggle Gravitational Attract / Float
  if (btnGravity) {
    btnGravity.addEventListener('click', () => {
      isGravityAttract = !isGravityAttract;
      if (gravityLabel) {
        gravityLabel.textContent = isGravityAttract ? 'Gravity: Attract' : 'Gravity: Float';
      }
      if (hudState) {
        hudState.textContent = isGravityAttract ? 'GRAVITY WELL ACTIVATED' : 'EQUILIBRIUM RESTORED';
      }

      gsap.fromTo(
        btnGravity,
        { scale: 0.9 },
        { scale: 1, duration: 0.35, ease: 'back.out(2)' }
      );

      setTimeout(() => {
        if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
      }, 1200);
    });
  }

  // E. Replay Intro Sequence
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      if (hudState) hudState.textContent = 'REPLAYING ENTRANCE';

      gsap.to(['.hero-center-content', '.showcase-grid'], {
        opacity: 0,
        y: 20,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          playHeroRevealTimeline();
          setTimeout(() => {
            if (hudState) hudState.textContent = 'INTERACTIVE CANVAS READY';
          }, 1000);
        },
      });
    });
  }
}