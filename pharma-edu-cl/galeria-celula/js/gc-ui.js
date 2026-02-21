/* ============================================================
   gc-ui.js — PharmaLab Chile | Galería Celular 3D
   Filtros, Hero canvas, Reveal animations, Navbar, Init
   Depende de: gc-data.js, gc-state.js, gc-renderers.js, gc-modal.js
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════════════════════
   FILTROS DE GALERÍA
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.gc-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gc-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gc-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

/* ═══════════════════════════════════════════════════════════
   HERO CANVAS — Partículas moleculares
   ═══════════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = document.getElementById('gc-hero-canvas');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: 1+Math.random()*3,
      col: ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(16,185,129,', 'rgba(245,158,11,'][Math.floor(Math.random()*4)]
    });
  }
  function loop() {
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0;
      if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col+'0.5)'; ctx.fill();
    });
    // Líneas entre partículas cercanas
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<80){
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(168,85,247,${(1-dist/80)*0.15})`; ctx.lineWidth=0.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ═══════════════════════════════════════════════════════════
   REVEAL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════════════════════ */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('gc-revealed'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-gc-reveal]').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.style.background = window.scrollY > 40 ? 'rgba(4,2,14,0.95)' : 'rgba(4,2,14,0.85)';
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT COMPLETO
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initHeroCanvas();
  setTimeout(initMiniCanvas, 200);
});

window.addEventListener('resize', () => {
  initHeroCanvas();
});
