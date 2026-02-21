/* ============================================================
   BIOMOLECULAS.JS — PharmaLab Chile | Unidad 2: Biomoléculas Esenciales
   Iniciales: BM — Motor 3D Canvas + Tabs lazy-init + Animaciones
   4 escenas: Proteína (hélice α) · Enzima (sitio activo) · Glucosa (red) · Bicapa lipídica
   ============================================================ */

'use strict';

const BM = (() => {

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ── MOTOR 3D (idéntico al sistema base) ── */
  function project(x, y, z, fov, cx, cy) {
    const d = fov / (fov + z);
    return { x: cx + x * d, y: cy + y * d, d };
  }

  function rotate(pts, rx, ry) {
    return pts.map(([x, y, z]) => {
      const x1 = x * Math.cos(ry) - z * Math.sin(ry);
      const z1 = x * Math.sin(ry) + z * Math.cos(ry);
      const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      return [x1, y2, z2];
    });
  }

  function spherePts(r, n) {
    const pts = [], phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const yy = 1 - (i / (n - 1)) * 2, ra = Math.sqrt(1 - yy * yy), th = phi * i;
      pts.push([r * ra * Math.cos(th), r * yy, r * ra * Math.sin(th)]);
    }
    return pts;
  }

  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const isHero = canvas.id === 'bm-hero-canvas';
    const H = isHero ? 390 : 330;

    let w = 0;
    let el = canvas;
    while (el && w < 10) {
      w = el.getBoundingClientRect().width || el.offsetWidth || el.clientWidth || 0;
      el = el.parentElement;
    }
    if (w < 10) w = isHero ? 460 : 760;
    if (isHero) w = Math.min(w, 460);

    canvas.width  = w * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = w + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, W: w, H };
  }

  function addDrag(canvas, st) {
    let dragging = false, lx = 0, ly = 0;
    canvas.addEventListener('mousedown', e => { dragging = true; st.auto = false; lx = e.clientX; ly = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      st.ry += (e.clientX - lx) * 0.008; st.rx += (e.clientY - ly) * 0.008;
      lx = e.clientX; ly = e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging = false; st.auto = true; });
    canvas.addEventListener('touchstart', e => { dragging = true; st.auto = false; lx = e.touches[0].clientX; ly = e.touches[0].clientY; }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault(); if (!dragging) return;
      st.ry += (e.touches[0].clientX - lx) * 0.008; st.rx += (e.touches[0].clientY - ly) * 0.008;
      lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { dragging = false; st.auto = true; });
  }

  function sphere3d(ctx, x, y, r, color) {
    if (r <= 0) return;
    const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, 0, x, y, r);
    g.addColorStop(0, color + 'ff'); g.addColorStop(0.55, color + 'bb'); g.addColorStop(1, color + '18');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  function glow3d(ctx, x, y, r, color) {
    if (r <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color + '55'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  function legend(ctx, items, x0 = 10, y0 = 14) {
    ctx.font = '10px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
    items.forEach((l, i) => {
      ctx.fillStyle = l.c; ctx.beginPath(); ctx.arc(x0 + 5, y0 + i * 18, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.fillText(l.t, x0 + 18, y0 + 4 + i * 18);
    });
  }

  /* ================================================================
     HERO 3D — Hélice α + Lámina β + Cadenas laterales
  ================================================================ */
  function drawHero(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 680;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // Hélice α — espiral de residuos (3.6 res/vuelta, paso 5.4 Å)
    const HELIX = [];
    const nRes = 18;
    for (let i = 0; i < nRes; i++) {
      const angle = (i / 3.6) * Math.PI * 2;
      const x = 28 * Math.cos(angle) - 30;
      const y = -60 + i * 8.5;
      const z = 28 * Math.sin(angle);
      // Carbono α
      HELIX.push({ p: [x, y, z], c: '#a855f7', r: 5.5, type: 'ca', i });
      // Cadena lateral (simplificada)
      const sx = x + 16 * Math.cos(angle + 0.5);
      const sz = z + 16 * Math.sin(angle + 0.5);
      const col = i % 4 === 0 ? '#ef4444' : i % 3 === 0 ? '#06b6d4' : i % 2 === 0 ? '#10b981' : '#f59e0b';
      HELIX.push({ p: [sx, y + 2, sz], c: col, r: 3.5, type: 'side', i });
    }

    // Lámina β — dos cadenas antiparalelas
    const BETA = [];
    const betaPos = [
      [55, -40], [55, -20], [55, 0], [55, 20], [55, 40],
      [85, 40],  [85, 20],  [85, 0],  [85, -20], [85, -40],
    ];
    betaPos.forEach(([bx, by], bi) => {
      const bz = (bi < 5 ? 1 : -1) * 15;
      BETA.push({ p: [bx, by, bz], c: '#22d3ee', r: 5, type: 'beta', bi });
      // Puentes H entre las cadenas (visual)
      if (bi < 5) {
        BETA.push({ p: [70, by, 0], c: '#22d3ee', r: 2, type: 'hbond', bi });
      }
    });

    // Bucle de conexión
    const LOOP = [];
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      LOOP.push({
        p: [55 - t * 85 + 30, 40 + Math.sin(t * Math.PI) * 25, (t - 0.5) * 30],
        c: '#f59e0b', r: 3, type: 'loop'
      });
    }

    // Partículas de solvatación
    const WATER = [];
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2, r2 = 120 + (i % 3) * 18;
      WATER.push({ p: [r2 * Math.cos(a), (i % 7 - 3) * 22, r2 * Math.sin(a)], c: '#06b6d4', r: 2, phase: i * 0.3 });
    }

    const ALL = [...HELIX, ...BETA, ...LOOP, ...WATER];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.005;
      t += 0.016;

      // Animar agua
      const allAnim = ALL.map(pt => {
        if (pt.phase !== undefined) {
          return { ...pt, p: [pt.p[0] + Math.sin(t + pt.phase) * 4, pt.p[1] + Math.cos(t * 1.1 + pt.phase) * 3, pt.p[2]] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      // Glow central
      glow3d(ctx, CX - 30, CY, 90, '#a855f7');
      glow3d(ctx, CX + 50, CY, 70, '#22d3ee');

      // Backbone hélice (línea serpentina)
      const cas = proj.filter(d => d.type === 'ca').sort((a, b) => a.i - b.i);
      if (cas.length > 1) {
        ctx.beginPath();
        ctx.moveTo(cas[0].x, cas[0].y);
        for (let i = 1; i < cas.length; i++) ctx.lineTo(cas[i].x, cas[i].y);
        ctx.strokeStyle = 'rgba(168,85,247,0.55)';
        ctx.lineWidth = 2; ctx.setLineDash([]); ctx.stroke();
      }

      // Backbone lámina β
      const betas = proj.filter(d => d.type === 'beta');
      const b1 = betas.slice(0, 5).sort((a, b) => a.bi - b.bi);
      const b2 = betas.slice(5, 10).sort((a, b) => b.bi - a.bi);
      [b1, b2].forEach(chain => {
        if (chain.length > 1) {
          ctx.beginPath(); ctx.moveTo(chain[0].x, chain[0].y);
          chain.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = 'rgba(34,211,238,0.50)'; ctx.lineWidth = 2.5; ctx.stroke();
        }
      });

      // Puentes H de lámina β
      for (let i = 0; i < Math.min(b1.length, b2.length); i++) {
        if (b1[i] && b2[i]) {
          ctx.save(); ctx.setLineDash([3, 4]);
          ctx.strokeStyle = `rgba(34,211,238,${0.25 + 0.1 * Math.sin(t + i)})`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.moveTo(b1[i].x, b1[i].y); ctx.lineTo(b2[i].x, b2[i].y);
          ctx.stroke(); ctx.restore();
        }
      }

      // Ordenar y dibujar átomos
      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'ca') sphere3d(ctx, d.x, d.y, rad, '#a855f7');
        else if (d.type === 'beta') sphere3d(ctx, d.x, d.y, rad, '#22d3ee');
        else if (d.type === 'loop') sphere3d(ctx, d.x, d.y, rad, '#f59e0b');
        else if (d.type === 'hbond') {
          ctx.fillStyle = 'rgba(34,211,238,0.25)'; ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
        } else sphere3d(ctx, d.x, d.y, rad, d.c);
      });

      // Etiquetas
      ctx.font = 'bold 10px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(168,85,247,0.8)'; ctx.fillText('Hélice α', 14, H - 22);
      ctx.fillStyle = 'rgba(34,211,238,0.8)'; ctx.fillText('Lámina β', 80, H - 22);

      legend(ctx, [
        { c: '#a855f7', t: 'Carbono α (esqueleto peptídico)' },
        { c: '#ef4444', t: 'Cadena lateral ácida (Asp/Glu)' },
        { c: '#06b6d4', t: 'Cadena lateral básica (Lys/Arg)' },
        { c: '#22d3ee', t: 'Lámina β (puentes H antiparalelos)' },
        { c: '#f59e0b', t: 'Bucle/loop de conexión' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-1: PROTEÍNAS — Hélice α compleja con cadenas laterales y plegamiento
  ================================================================ */
  function drawProteinas(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.2, ry: 0, auto: true };
    addDrag(canvas, st);

    // Proteína globular: 3 hélices + 2 láminas
    const BACKBONE = [];

    // Hélice 1
    for (let i = 0; i < 14; i++) {
      const a = (i / 3.6) * Math.PI * 2;
      BACKBONE.push({ p: [-80 + 20 * Math.cos(a), -50 + i * 8, 20 * Math.sin(a)], c: '#a855f7', r: 5, type: 'h1' });
    }
    // Hélice 2
    for (let i = 0; i < 10; i++) {
      const a = (i / 3.6) * Math.PI * 2 + 1;
      BACKBONE.push({ p: [30 + 20 * Math.cos(a), -30 + i * 8, 20 * Math.sin(a)], c: '#9333ea', r: 5, type: 'h2' });
    }
    // Hélice 3
    for (let i = 0; i < 8; i++) {
      const a = (i / 3.6) * Math.PI * 2 + 2;
      BACKBONE.push({ p: [80 + 15 * Math.cos(a), 10 + i * 8, 15 * Math.sin(a)], c: '#c084fc', r: 4.5, type: 'h3' });
    }

    // Láminas β
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const x = -40 + col * 22;
        const y = 30 + row * 18;
        const z = (row % 2 === 0 ? 1 : -1) * 25;
        BACKBONE.push({ p: [x, y, z], c: '#22d3ee', r: 4.5, type: 'bs', row, col });
      }
    }

    // Núcleo hidrofóbico (esferas naranjas internas)
    const CORE = spherePts(30, 22).map(p => ({ p, c: '#f59e0b', r: 3.5, type: 'core' }));

    // Cadenas laterales polares (superficie)
    const SURFACE = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, r2 = 95 + (i % 3) * 12;
      const col = i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#10b981' : '#ef4444';
      SURFACE.push({ p: [r2 * Math.cos(a), (i % 5 - 2) * 28, r2 * Math.sin(a)], c: col, r: 3, type: 'surf', phase: i * 0.4 });
    }

    const ALL = [...BACKBONE, ...CORE, ...SURFACE];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'surf') {
          return { ...pt, p: [pt.p[0] + Math.sin(t + pt.phase) * 3, pt.p[1] + Math.cos(t * 0.9 + pt.phase) * 3, pt.p[2]] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      glow3d(ctx, CX - 60, CY, 80, '#a855f7');
      glow3d(ctx, CX + 40, CY + 20, 65, '#22d3ee');
      glow3d(ctx, CX, CY - 20, 55, '#f59e0b');

      // Backbone connections
      ['h1', 'h2', 'h3'].forEach(ht => {
        const chain = proj.filter(d => d.type === ht);
        if (chain.length > 1) {
          ctx.beginPath(); ctx.moveTo(chain[0].x, chain[0].y);
          chain.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = 'rgba(168,85,247,0.45)'; ctx.lineWidth = 2; ctx.setLineDash([]); ctx.stroke();
        }
      });

      // β puentes H
      const brows = [[],[]];
      proj.filter(d => d.type === 'bs').forEach(d => {
        if (!brows[d.row % 2]) brows[d.row % 2] = [];
        brows[d.row % 2].push(d);
      });
      for (let i = 0; i < Math.min(brows[0].length, brows[1].length); i++) {
        if (brows[0][i] && brows[1][i]) {
          ctx.save(); ctx.setLineDash([3, 4]);
          ctx.strokeStyle = 'rgba(34,211,238,0.22)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(brows[0][i].x, brows[0][i].y); ctx.lineTo(brows[1][i].x, brows[1][i].y);
          ctx.stroke(); ctx.restore();
        }
      }

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (['h1','h2','h3'].includes(d.type)) sphere3d(ctx, d.x, d.y, rad, d.c);
        else if (d.type === 'bs') sphere3d(ctx, d.x, d.y, rad, '#22d3ee');
        else if (d.type === 'core') {
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad);
          g.addColorStop(0, '#f59e0baa'); g.addColorStop(1, '#f59e0b22');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
        } else sphere3d(ctx, d.x, d.y, rad, d.c);
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Hélices α (3.6 residuos/vuelta)' },
        { c: '#22d3ee', t: 'Láminas β (antiparalelas)' },
        { c: '#f59e0b', t: 'Núcleo hidrofóbico (Val/Leu/Ile)' },
        { c: '#06b6d4', t: 'Cadenas laterales polares (superficie)' },
        { c: '#ef4444', t: 'Residuos acidos (Asp/Glu, carga -)' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-2: ENZIMAS — Sitio activo, complejo ES, inhibidor
  ================================================================ */
  function drawEnzimas(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    // Enzima: globo grande con hendidura
    const ENZYME = spherePts(75, 90).map(p => ({ p, c: '#a855f7', r: 3.8, type: 'enz' }));

    // Hendidura/sitio activo (vacío central + residuos clave)
    const ACTIVE_SITE = [];
    const asResidues = [
      [0, 0, 75],     // Ser195 (nucleófilo)
      [20, -10, 70],  // His57 (catálisis ácido-base)
      [-20, -10, 70], // Asp102 (red de carga)
      [10, 15, 72],   // residuo de oxianión
      [-10, 15, 72],
    ];
    const asColors = ['#ef4444', '#06b6d4', '#f59e0b', '#10b981', '#10b981'];
    asResidues.forEach(([x, y, z], i) => {
      ACTIVE_SITE.push({ p: [x, y, z], c: asColors[i], r: 7, type: 'as', idx: i });
    });

    // Sustrato (esfera pequeña que entra al sitio activo)
    const SUBSTRATE = spherePts(12, 25).map(p => ({ p: [p[0], p[1], p[2] + 85], c: '#22d3ee', r: 2.8, type: 'sub' }));

    // Inhibidor competitivo (en rojo, bloqueando sitio)
    const INHIBITOR = spherePts(14, 22).map(p => ({ p: [p[0] + 90, p[1] + 20, p[2] + 40], c: '#ef4444', r: 2.5, type: 'inh', phase: Math.random() * Math.PI * 2 }));

    // Partículas producto liberado
    const PRODUCTS = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2, r2 = 55 + (i % 3) * 12;
      PRODUCTS.push({ p: [r2 * Math.cos(a), r2 * Math.sin(a * 0.7), 110 + r2 * 0.3], c: '#10b981', r: 2.5, phase: i * 0.35, type: 'prod' });
    }

    const ALL = [...ENZYME, ...ACTIVE_SITE, ...SUBSTRATE, ...INHIBITOR, ...PRODUCTS];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      // Animar sustrato entrando al sitio activo
      const subProg = (Math.sin(t * 0.5) + 1) / 2; // 0 → 1 → 0
      // Animar inhibidor orbitando
      const allAnim = ALL.map(pt => {
        if (pt.type === 'sub') {
          const pull = 1 - subProg * 0.5;
          return { ...pt, p: [pt.p[0] * pull, pt.p[1] * pull, pt.p[2] * pull] };
        }
        if (pt.type === 'inh') {
          const ia = t * 0.6 + (pt.phase || 0);
          return { ...pt, p: [90 * Math.cos(ia), 20 * Math.sin(ia * 1.3), 40 * Math.sin(ia)] };
        }
        if (pt.type === 'prod') {
          const pp = ((t * 0.3 + pt.phase) % (Math.PI * 2));
          return { ...pt, p: [pt.p[0] + Math.cos(pp) * 5, pt.p[1] + Math.sin(pp) * 5, pt.p[2] + Math.sin(pp * 0.7) * 4] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      glow3d(ctx, CX, CY, 95, '#a855f7');
      glow3d(ctx, CX + 50, CY + 30, 50, '#22d3ee');
      glow3d(ctx, CX + 60, CY + 10, 40, '#ef4444');

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'enz') {
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad);
          g.addColorStop(0, '#a855f7aa'); g.addColorStop(1, '#a855f722');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
        } else if (d.type === 'as') {
          sphere3d(ctx, d.x, d.y, rad * 1.2, d.c);
          // Pulso en residuos activos
          const pulse = 1 + 0.08 * Math.sin(t * 3 + d.idx);
          glow3d(ctx, d.x, d.y, rad * pulse * 2, d.c);
        } else if (d.type === 'sub') {
          sphere3d(ctx, d.x, d.y, rad, '#22d3ee');
        } else if (d.type === 'inh') {
          sphere3d(ctx, d.x, d.y, rad, '#ef4444');
        } else if (d.type === 'prod') {
          sphere3d(ctx, d.x, d.y, rad, '#10b981');
        }
      });

      // Etiquetas sitio activo
      ctx.font = 'bold 9px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      const asProj = proj.filter(d => d.type === 'as');
      const asLabels = ['Ser195', 'His57', 'Asp102', 'Oxianión', ''];
      asProj.forEach((d, i) => {
        if (asLabels[i]) {
          ctx.fillStyle = asColors[i] + 'cc';
          ctx.fillText(asLabels[i], d.x, d.y - 12);
        }
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Enzima (estructura globular)' },
        { c: '#ef4444', t: 'Ser195 · Sitio nucleofílico activo' },
        { c: '#06b6d4', t: 'His57 · Catálisis ácido-base' },
        { c: '#22d3ee', t: 'Sustrato (S) — complejo ES' },
        { c: '#10b981', t: 'Productos (P) liberados' },
        { c: '#ef4444', t: 'Inhibidor competitivo (circulando)' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-3: CARBOHIDRATOS — Red de glucosa + glicógeno + enlaces glucosídicos
  ================================================================ */
  function drawCarbohidratos(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.2, ry: 0, auto: true };
    addDrag(canvas, st);

    // Anillo de glucosa central (piranosa, 6 átomos)
    const GLUCOSE = [];
    const ringAtoms = 6;
    for (let i = 0; i < ringAtoms; i++) {
      const a = (i / ringAtoms) * Math.PI * 2 - Math.PI / 2;
      const isO = i === 0;
      GLUCOSE.push({ p: [28 * Math.cos(a), 28 * Math.sin(a), 0], c: isO ? '#ef4444' : '#a855f7', r: isO ? 6 : 7, type: 'ring', i });
      // OH groups
      if (!isO) {
        GLUCOSE.push({ p: [46 * Math.cos(a), 46 * Math.sin(a), (i % 2 === 0 ? 14 : -14)], c: '#ef4444', r: 4, type: 'oh' });
      }
    }
    // CH2OH tail
    GLUCOSE.push({ p: [0, -50, 14], c: '#a855f7', r: 5, type: 'ch2oh' });
    GLUCOSE.push({ p: [0, -64, 14], c: '#ef4444', r: 4, type: 'oh' });

    // Red de glucosas conectadas (glicógeno/almidón)
    const NETWORK = [];
    const netPos = [
      [90, -40, 30], [-90, -40, -30], [0, 90, 20], [0, -90, -20],
      [90, 40, -30], [-90, 40, 30],
    ];
    netPos.forEach(([nx, ny, nz], ni) => {
      const nAngle = (ni / 4) * Math.PI * 2;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const nc = i === 0 ? '#ef4444' : '#22d3ee';
        NETWORK.push({ p: [nx + 18 * Math.cos(a), ny + 18 * Math.sin(a), nz], c: nc, r: i === 0 ? 4 : 4.5, type: 'netring', ni });
      }
    });

    // Enlace glucosídico α(1→4)
    const BONDS = [];
    netPos.forEach(([nx, ny, nz], ni) => {
      const steps = 4;
      for (let i = 0; i <= steps; i++) {
        const t2 = i / steps;
        const bx = nx * t2, by = ny * t2, bz = nz * t2;
        BONDS.push({ p: [bx, by, bz], c: '#f59e0b', r: 1.8, type: 'bond', phase: ni * 0.5 + i * 0.1 });
      }
    });

    // ATP (energía para síntesis)
    const ENERGYPTS = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, r2 = 130 + (i % 3) * 15;
      ENERGYPTS.push({ p: [r2 * Math.cos(a), (i % 5 - 2) * 20, r2 * Math.sin(a)], c: '#10b981', r: 2, phase: i * 0.4, type: 'atp' });
    }

    const ALL = [...GLUCOSE, ...NETWORK, ...BONDS, ...ENERGYPTS];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.005;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'atp') {
          const pp = t + pt.phase;
          return { ...pt, p: [pt.p[0] + Math.sin(pp) * 5, pt.p[1] + Math.cos(pp * 1.1) * 4, pt.p[2]] };
        }
        if (pt.type === 'bond') {
          return { ...pt, p: [pt.p[0], pt.p[1], pt.p[2] + Math.sin(t * 1.5 + pt.phase) * 3] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      glow3d(ctx, CX, CY, 70, '#a855f7');
      glow3d(ctx, CX, CY, 110, '#22d3ee');

      // Dibujar enlaces glucosídicos como líneas
      const ringCenters = [{ x: CX, y: CY }];
      netPos.forEach(([nx, ny, nz]) => {
        const rp = project(nx, ny, nz, FOV, CX, CY);
        ringCenters.push(rp);
        ctx.strokeStyle = `rgba(245,158,11,${0.35 + 0.1 * Math.sin(t)})`;
        ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]);
        ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(rp.x, rp.y); ctx.stroke();
      });
      ctx.setLineDash([]);

      // Dibujar anillos del glucosa central
      const ringPts = proj.filter(d => d.type === 'ring').sort((a, b) => a.i - b.i);
      if (ringPts.length > 1) {
        ctx.beginPath(); ctx.moveTo(ringPts[0].x, ringPts[0].y);
        ringPts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath(); ctx.strokeStyle = 'rgba(168,85,247,0.6)'; ctx.lineWidth = 2; ctx.stroke();
      }

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'ring') sphere3d(ctx, d.x, d.y, rad, d.c);
        else if (d.type === 'oh') sphere3d(ctx, d.x, d.y, rad, '#ef4444');
        else if (d.type === 'ch2oh') sphere3d(ctx, d.x, d.y, rad, '#a855f7');
        else if (d.type === 'netring') sphere3d(ctx, d.x, d.y, rad, d.c);
        else if (d.type === 'bond') {
          ctx.fillStyle = 'rgba(245,158,11,0.55)'; ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
        } else if (d.type === 'atp') sphere3d(ctx, d.x, d.y, rad, '#10b981');
      });

      // Etiqueta central
      ctx.font = 'bold 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(168,85,247,0.85)'; ctx.fillText('α-D-Glucopiranosa', CX, CY + 72);

      legend(ctx, [
        { c: '#a855f7', t: 'Carbono del anillo piranosa (C1–C6)' },
        { c: '#ef4444', t: 'Oxígeno (O del anillo y grupos OH)' },
        { c: '#22d3ee', t: 'Unidades de glucosa vecinas' },
        { c: '#f59e0b', t: 'Enlace glucosídico α(1→4) / α(1→6)' },
        { c: '#10b981', t: 'ATP (energía para síntesis glucógeno)' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-4: LÍPIDOS — Bicapa fosfolipídica con colesterol y proteínas
  ================================================================ */
  function drawLipidos(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.1, ry: 0, auto: true };
    addDrag(canvas, st);

    // Bicapa fosfolipídica — 2 capas de ~12 fosfolípidos
    const BILAYER = [];
    const lipidCount = 14;
    for (let row = 0; row < 2; row++) {
      const ySign = row === 0 ? -1 : 1;
      for (let i = 0; i < lipidCount; i++) {
        const xOff = -130 + i * 20;
        const zOff = (i % 3 - 1) * 18;

        // Cabeza polar (esfera grande, hidrofílica)
        BILAYER.push({ p: [xOff, ySign * 42, zOff], c: row === 0 ? '#06b6d4' : '#a855f7', r: 7, type: 'head', row, i });

        // Colas hidrofóbicas (2 cadenas, esferas pequeñas)
        for (let tail = 0; tail < 2; tail++) {
          const txOff = xOff + (tail === 0 ? -4 : 4);
          for (let j = 1; j <= 6; j++) {
            const ty = ySign * (42 - j * 9);
            // Doble enlace en cola 2 (insaturada) — desviación
            const deviation = (tail === 1 && j === 3) ? 5 : 0;
            BILAYER.push({
              p: [txOff + deviation, ty, zOff + (tail - 0.5) * 4],
              c: tail === 1 ? '#f59e0b88' : '#f59e0b',
              r: j === 6 ? 2 : 2.8,
              type: 'tail', row, i, phase: i * 0.2 + tail * 0.4
            });
          }
        }
      }
    }

    // Colesterol intercalado en la bicapa
    const CHOLESTEROL = [];
    [[-50, 0, 20], [30, 0, -25], [100, 0, 15]].forEach(([cx, cy, cz]) => {
      spherePts(12, 18).forEach(p => CHOLESTEROL.push({ p: [p[0] + cx, p[1] + cy, p[2] + cz], c: '#10b981', r: 2.5, type: 'chol' }));
    });

    // Proteína de membrana (canal iónico simplificado)
    const CHANNEL = [];
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2, r2 = 12, yy = -45 + i * 4.5;
      CHANNEL.push({ p: [r2 * Math.cos(a) - 60, yy, r2 * Math.sin(a)], c: '#ef4444', r: 4, type: 'chan' });
    }

    // Agua en los dos lados (ambiente acuoso)
    const WATER = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, r2 = 100 + (i % 3) * 15;
      const yLayer = i % 2 === 0 ? 80 : -80;
      WATER.push({ p: [r2 * Math.cos(a), yLayer, r2 * Math.sin(a)], c: '#06b6d4', r: 2, phase: i * 0.35, type: 'water' });
    }

    const ALL = [...BILAYER, ...CHOLESTEROL, ...CHANNEL, ...WATER];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'tail') {
          return { ...pt, p: [pt.p[0] + Math.sin(t * 1.2 + pt.phase) * 2.5, pt.p[1], pt.p[2] + Math.cos(t + pt.phase) * 1.5] };
        }
        if (pt.type === 'water') {
          return { ...pt, p: [pt.p[0] + Math.sin(t + pt.phase) * 4, pt.p[1] + Math.cos(t * 1.1 + pt.phase) * 3, pt.p[2]] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      glow3d(ctx, CX, CY - 40, 80, '#06b6d4');
      glow3d(ctx, CX, CY + 40, 80, '#a855f7');
      glow3d(ctx, CX, CY, 60, '#10b981');

      // Línea de membrana (plano)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
      ctx.setLineDash([]);

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'head') {
          sphere3d(ctx, d.x, d.y, rad, d.c);
          glow3d(ctx, d.x, d.y, rad * 1.6, d.c);
        } else if (d.type === 'tail') {
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad);
          g.addColorStop(0, '#f59e0bcc'); g.addColorStop(1, '#f59e0b22');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
        } else if (d.type === 'chol') {
          sphere3d(ctx, d.x, d.y, rad, '#10b981');
        } else if (d.type === 'chan') {
          sphere3d(ctx, d.x, d.y, rad, '#ef4444');
        } else if (d.type === 'water') {
          sphere3d(ctx, d.x, d.y, rad, '#06b6d4');
        }
      });

      // Etiquetas
      ctx.font = 'bold 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(6,182,212,0.75)'; ctx.fillText('Exterior (hidrofílico)', CX, CY - 90);
      ctx.fillStyle = 'rgba(168,85,247,0.75)'; ctx.fillText('Interior (hidrofílico)', CX, CY + 100);
      ctx.fillStyle = 'rgba(245,158,11,0.65)'; ctx.fillText('↔ Núcleo hidrofóbico', CX, CY + 6);

      legend(ctx, [
        { c: '#06b6d4', t: 'Cabeza polar (fosfocolina, exterior)' },
        { c: '#a855f7', t: 'Cabeza polar (fosfocolina, interior)' },
        { c: '#f59e0b', t: 'Colas hidrofóbicas (ácidos grasos)' },
        { c: '#10b981', t: 'Colesterol (estabilizador de fluidez)' },
        { c: '#ef4444', t: 'Proteína de membrana (canal iónico)' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     TABS — lazy canvas init
  ================================================================ */
  function initTabs(canvasMap) {
    const btns   = $$('.bm-tab-btn');
    const panels = $$('.bm-panel');
    const inited = new Set();

    function initPanelCanvas(idx) {
      if (inited.has(idx)) return;
      inited.add(idx);
      requestAnimationFrame(() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            Object.entries(canvasMap).forEach(([id, fn]) => {
              const c = document.getElementById(id);
              if (c && panels[idx] && panels[idx].contains(c)) {
                const wrap = c.closest('.bm-3d');
                if (wrap) {
                  const ww = wrap.getBoundingClientRect().width || wrap.clientWidth - 24;
                  c.style.width  = Math.max(ww, 300) + 'px';
                  c.style.height = '330px';
                }
                fn(c);
              }
            });
          });
        }, 80);
      });
    }

    function activate(i) {
      btns.forEach((b, j)   => b.classList.toggle('active', j === i));
      panels.forEach((p, j) => p.classList.toggle('active', j === i));
      initPanelCanvas(i);
    }
    btns.forEach((btn, i) => btn.addEventListener('click', () => activate(i)));
    activate(0);
  }

  /* ── CONTADORES ── */
  function initCounters() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.bmCount);
        const suf = el.dataset.bmSuf || '';
        const dec = +(el.dataset.bmDec || 0);
        const dur = 1600;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - prog, 3);
          el.textContent = (ease * target).toFixed(dec) + suf;
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-bm-count]').forEach(e => io.observe(e));
  }

  /* ── REVEAL ── */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('bm-revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('[data-bm-reveal]').forEach(el => io.observe(el));
  }

  /* ── INIT ── */
  function init() {
    const canvasMap = {
      'bm-canvas-proteinas':    drawProteinas,
      'bm-canvas-enzimas':      drawEnzimas,
      'bm-canvas-carbohidratos':drawCarbohidratos,
      'bm-canvas-lipidos':      drawLipidos,
    };
    initTabs(canvasMap);
    initCounters();
    initReveal();

    // Hero canvas con ResizeObserver robusto
    (function initHeroCanvas() {
      const hc = document.getElementById('bm-hero-canvas');
      if (!hc) return;
      let drawn = false;

      function tryDraw() {
        if (drawn) return;
        let w = 0, el = hc.parentElement;
        while (el && w < 10) {
          w = el.getBoundingClientRect().width || el.offsetWidth || 0;
          el = el.parentElement;
        }
        if (w < 10) w = 460;
        w = Math.min(w, 460);
        hc.style.width  = w + 'px';
        hc.style.height = '390px';
        drawn = true;
        drawHero(hc);
      }

      requestAnimationFrame(() => setTimeout(tryDraw, 60));

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => { if (!drawn) tryDraw(); else ro.disconnect(); });
        const heroVis = hc.closest('.bm-hero-vis') || hc.parentElement;
        if (heroVis) ro.observe(heroVis);
        setTimeout(() => { ro.disconnect(); tryDraw(); }, 3000);
      } else {
        setTimeout(tryDraw, 400);
      }
    })();

    // Navbar scroll
    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    // Mobile menu
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

  return { version: '1.0.0', module: 'BM-Biomoleculas' };
})();