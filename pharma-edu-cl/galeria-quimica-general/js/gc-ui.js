/* ============================================================
   gc-ui.js — PharmaLab Chile | Galería Química General
   Hero canvas + Reveal + Navbar + Init
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════════════════════
   HERO CANVAS — partículas atómicas
   ═══════════════════════════════════════════════════════════ */
(function initHeroCanvas() {
  const canvas = document.getElementById('gc-hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Crear partículas (átomos/electrones)
  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(245,158,11,'][Math.floor(Math.random()*3)],
      alpha: Math.random() * 0.5 + 0.15,
      orbit: Math.random() < 0.3,
      orbitR: Math.random() * 60 + 30,
      orbitSpeed: (Math.random() - 0.5) * 0.008,
      angle: Math.random() * Math.PI * 2,
      cx: Math.random() * W,
      cy: Math.random() * H
    });
  }

  let t = 0;
  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p, i) => {
      if (p.orbit) {
        p.angle += p.orbitSpeed;
        p.x = p.cx + Math.cos(p.angle) * p.orbitR;
        p.y = p.cy + Math.sin(p.angle) * p.orbitR * 0.5;
      } else {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // Líneas de conexión entre partículas cercanas
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - dist/100)})`;
          ctx.lineWidth = 0.8; ctx.stroke();
        }
      }

      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('gc-revealed'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('[data-gc-reveal]').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════════════════════
   NAVBAR — scroll + móvil toggle
   ═══════════════════════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(4,2,14,0.97)'
    : 'rgba(4,2,14,0.85)';
});

navToggle && navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initMiniCanvas();
});
