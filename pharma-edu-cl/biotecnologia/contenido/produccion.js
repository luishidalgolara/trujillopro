/* ============================================================
   PRODUCCION.JS — PharmaLab Chile | Unidad 3: Producción Biotecnológica
   Iniciales: PB — Motor 3D Canvas + Tabs + Animaciones
   ============================================================ */

'use strict';

const PB = (() => {

  /* ── UTILS ── */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ── PROYECCIÓN / ROTACIÓN 3D ── */
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
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';
    return canvas.getContext('2d');
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
    canvas.addEventListener('touchstart', e => { dragging = true; st.auto = false; lx = e.touches[0].clientX; ly = e.touches[0].clientY; });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault(); if (!dragging) return;
      st.ry += (e.touches[0].clientX - lx) * 0.008; st.rx += (e.touches[0].clientY - ly) * 0.008;
      lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { dragging = false; st.auto = true; });
  }

  function drawSphere(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, 0, x, y, r);
    g.addColorStop(0, color + 'ff'); g.addColorStop(0.55, color + 'bb'); g.addColorStop(1, color + '20');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  function legend(ctx, items) {
    ctx.font = '10px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
    items.forEach((l, i) => {
      ctx.fillStyle = l.c; ctx.beginPath(); ctx.arc(12, 14 + i * 18, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.fillText(l.t, 24, 18 + i * 18);
    });
  }

  /* ================================================================
     3D-HERO: Biorreactor con burbujas de O2 + proteínas liberadas
  ================================================================ */
  function drawHero(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 700;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    // Biorreactor cilindro (anillos apilados)
    const RINGS = [];
    for (let r = 0; r < 8; r++) {
      const y = -100 + r * 30, scale = r === 0 || r === 7 ? 0.9 : 1;
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * Math.PI * 2;
        const rad = 70 * scale;
        RINGS.push({ p: [rad * Math.cos(a), y, rad * Math.sin(a)], c: r < 2 || r > 5 ? '#94a3b8' : '#f59e0b', r: 3.5, type: 'ring' });
      }
    }

    // Impelidor (aspa del agitador)
    const IMPELLER = [];
    for (let b = 0; b < 6; b++) {
      const a = (b / 6) * Math.PI * 2;
      for (let j = 0; j < 10; j++) {
        const t2 = j / 9;
        IMPELLER.push({ p: [t2 * 60 * Math.cos(a), -20, t2 * 60 * Math.sin(a)], c: '#06b6d4', r: 3.5, type: 'imp' });
      }
    }
    IMPELLER.push({ p: [0, -20, 0], c: '#06b6d4', r: 8, type: 'imp' });

    // Eje central
    const SHAFT = [];
    for (let i = 0; i < 14; i++) {
      SHAFT.push({ p: [0, -95 + i * 15, 0], c: '#64748b', r: 4, type: 'shaft' });
    }

    // Burbujas O2 ascendentes (animadas)
    const BUBBLES_BASE = [];
    for (let i = 0; i < 22; i++) {
      const a = Math.random() * Math.PI * 2, r2 = Math.random() * 55;
      BUBBLES_BASE.push({ p: [r2 * Math.cos(a), 80 - Math.random() * 160, r2 * Math.sin(a)], phase: Math.random() * Math.PI * 2, r: 3 + Math.random() * 5, c: '#38bdf8' });
    }

    // Proteínas liberadas (saliendo por la parte superior)
    const PROTEINS = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      PROTEINS.push({ p: [85 * Math.cos(a), -100 + Math.sin(i * 0.7) * 30, 85 * Math.sin(a)], c: '#10b981', r: 6, phase: i * 0.5 });
    }

    const STATIC = [...RINGS, ...IMPELLER, ...SHAFT];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.02;

      // Burbuja animación vertical
      const bubblesAnim = BUBBLES_BASE.map(b => ({
        ...b, p: [b.p[0], b.p[1] - (t * 30 + b.phase * 50) % 200 + 100, b.p[2]]
      }));
      const proteinsAnim = PROTEINS.map(p => ({
        ...p, p: [p.p[0], p.p[1] + Math.sin(t + p.phase) * 10, p.p[2]]
      }));

      const ALL = [...STATIC, ...bubblesAnim, ...proteinsAnim];
      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      // Ring borders (líneas de cilindro)
      for (let r = 0; r < 8; r++) {
        const ring = proj.slice(r * 28, (r + 1) * 28);
        ctx.beginPath();
        ring.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.strokeStyle = 'rgba(245,158,11,0.18)'; ctx.lineWidth = 1; ctx.stroke();
      }

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'ring') {
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0, d.c + 'cc'); g.addColorStop(1, d.c + '22');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { drawSphere(ctx, d.x, d.y, rad, d.c); }
      });

      legend(ctx, [
        { c: '#f59e0b', t: 'Pared biorreactor (acero 316L)' },
        { c: '#06b6d4', t: 'Impelidor Rushton (agitación)' },
        { c: '#38bdf8', t: 'Burbujas O₂ (sparger)' },
        { c: '#10b981', t: 'Proteína recombinante (cosecha)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-1: FERMENTACIÓN — Biorreactor fed-batch con E. coli
  ================================================================ */
  function drawFermentation(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 640;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // E. coli cells (bacilos)
    const CELLS = [];
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2, r2 = 25 + (i % 5) * 10;
      const cx2 = r2 * Math.cos(a), cz2 = r2 * Math.sin(a), cy2 = (i % 3 - 1) * 30;
      // Bacilo: 3 esferas en línea
      const ang = Math.random() * Math.PI;
      for (let j = 0; j < 3; j++) {
        const off = (j - 1) * 7;
        CELLS.push({ p: [cx2 + off * Math.cos(ang), cy2 + off * Math.sin(ang) * 0.3, cz2], c: i % 2 === 0 ? '#10b981' : '#34d399', r: 4.5, cell: i });
      }
    }

    // Vesículas (proteínas producidas)
    const VESICLES = [];
    for (let i = 0; i < 20; i++) {
      const a = Math.random() * Math.PI * 2, r2 = 65 + Math.random() * 25;
      VESICLES.push({ p: [r2 * Math.cos(a), (Math.random() - 0.5) * 80, r2 * Math.sin(a)], c: '#f59e0b', r: 5, phase: Math.random() * Math.PI * 2 });
    }

    // Glucosa (sustratos pequeños)
    const GLUCOSE = [];
    for (let i = 0; i < 25; i++) {
      const a = Math.random() * Math.PI * 2, r2 = Math.random() * 50;
      GLUCOSE.push({ p: [r2 * Math.cos(a), (Math.random() - 0.5) * 100, r2 * Math.sin(a)], c: '#fbbf24', r: 3, phase: Math.random() * Math.PI * 2 });
    }

    // División bacteriana (algunas células en par)
    const DIVIDING = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      DIVIDING.push({ p: [90 * Math.cos(a), 0, 90 * Math.sin(a)], c: '#06b6d4', r: 9, phase: i * 1.2 });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.007;
      t += 0.018;

      const vesAnim = VESICLES.map(v => ({ ...v, p: [v.p[0], v.p[1] + Math.sin(t + v.phase) * 5, v.p[2]] }));
      const gluAnim = GLUCOSE.map(g => ({ ...g, p: [g.p[0] + Math.sin(t*1.3 + g.phase)*4, g.p[1], g.p[2] + Math.cos(t + g.phase)*4] }));
      const divAnim = DIVIDING.map(d => ({
        ...d, r: 9 + 3 * Math.sin(t * 2 + d.phase) // pulsación = división
      }));

      const ALL = [...CELLS, ...vesAnim, ...gluAnim, ...divAnim];
      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        // Glow células en división
        if (d.c === '#06b6d4') {
          const glow = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad*2.2);
          glow.addColorStop(0,'#06b6d430'); glow.addColorStop(1,'transparent');
          ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(d.x,d.y,rad*2.2,0,Math.PI*2); ctx.fill();
        }
        drawSphere(ctx, d.x, d.y, rad, d.c);
      });

      legend(ctx, [
        { c: '#10b981', t: 'E. coli (bacteria productora)' },
        { c: '#06b6d4', t: 'Células en división binaria' },
        { c: '#f59e0b', t: 'Proteína recombinante' },
        { c: '#fbbf24', t: 'Glucosa (sustrato C)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-2: CULTIVO CELULAR — Células CHO en spinner flask
  ================================================================ */
  function drawCellCulture(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 640;
    const st = { rx: 0.20, ry: 0, auto: true };
    addDrag(canvas, st);

    // Células CHO (esféricas grandes, mamífero)
    const CHO = [];
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2, b = (i % 4) * Math.PI / 4;
      const r2 = 50 + (i % 3) * 18;
      CHO.push({ p: [r2 * Math.cos(a) * Math.sin(b+0.5), r2 * Math.cos(b+0.5), r2 * Math.sin(a) * Math.sin(b+0.5)], c: '#a855f7', r: 13, phase: i * 0.4, type: 'cho' });
    }

    // Núcleos de cada CHO
    const NUCLEI = CHO.map(c => ({ ...c, c: '#c084fc', r: 6, type: 'nucleus' }));

    // Anticuerpos secretados (IgG pequeños en el medio)
    const ANTIBODIES = [];
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2, r2 = 80 + Math.random() * 20;
      ANTIBODIES.push({ p: [r2 * Math.cos(a), (Math.random()-0.5)*80, r2 * Math.sin(a)], c: '#06b6d4', r: 5, phase: Math.random()*Math.PI*2 });
    }

    // Vesículas de secreción
    const VESICLES = [];
    for (let i = 0; i < 12; i++) {
      const cho = CHO[i % CHO.length];
      const offset = 16;
      const a = (i / 12) * Math.PI * 2;
      VESICLES.push({ p: [cho.p[0] + offset*Math.cos(a), cho.p[1], cho.p[2] + offset*Math.sin(a)], c: '#f59e0b', r: 4, phase: i * 0.6 });
    }

    // Mitocondrias en CHO
    const MITO = [];
    for (let i = 0; i < 20; i++) {
      const cho = CHO[i % CHO.length];
      const a = (i / 20) * Math.PI * 2, rr = 8 + (i%3)*2;
      MITO.push({ p: [cho.p[0] + rr*Math.cos(a)*0.5, cho.p[1] + rr*Math.sin(a)*0.5, cho.p[2]], c: '#f97316', r: 2.5 });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.016;

      const choAnim = CHO.map(c => ({ ...c, r: 13 + Math.sin(t * 0.8 + c.phase) * 1.5 }));
      const abAnim  = ANTIBODIES.map(a => ({ ...a, p: [a.p[0]+Math.sin(t+a.phase)*3, a.p[1]+Math.cos(t*1.1+a.phase)*3, a.p[2]] }));
      const vesAnim = VESICLES.map(v => ({ ...v, p: [v.p[0], v.p[1] + Math.sin(t*1.5+v.phase)*4, v.p[2]] }));

      const ALL = [...choAnim, ...NUCLEI, ...abAnim, ...vesAnim, ...MITO];
      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'cho') {
          // Membrana semitransparente
          const g = ctx.createRadialGradient(d.x-rad*.3,d.y-rad*.3,0,d.x,d.y,rad);
          g.addColorStop(0,'#a855f7aa'); g.addColorStop(0.6,'#a855f766'); g.addColorStop(1,'#a855f722');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle='#c084fc44'; ctx.lineWidth=1.5; ctx.stroke();
        } else { drawSphere(ctx, d.x, d.y, rad, d.c); }
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Célula CHO (mamífero)' },
        { c: '#c084fc', t: 'Núcleo celular' },
        { c: '#f97316', t: 'Mitocondria' },
        { c: '#f59e0b', t: 'Vesícula de secreción' },
        { c: '#06b6d4', t: 'Anticuerpo monoclonal (IgG)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-3: PURIFICACIÓN — Columna cromatografía de afinidad
  ================================================================ */
  function drawPurification(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 620;
    const st = { rx: 0.20, ry: 0, auto: true };
    addDrag(canvas, st);

    // Resina de afinidad: esferas de Proteína A
    const RESIN = [];
    const NR = 55;
    for (let i = 0; i < NR; i++) {
      const a = (i / NR) * Math.PI * 2 + Math.random() * 0.3;
      const r2 = 40 + Math.random() * 20;
      const y  = -60 + Math.random() * 100;
      RESIN.push({ p: [r2 * Math.cos(a), y, r2 * Math.sin(a)], c: '#64748b', r: 5.5, type: 'resin' });
    }

    // Ligandos proteína A anclados en resina
    const LIGANDS = RESIN.slice(0, 20).map(r => ({
      p: [r.p[0] * 1.18, r.p[1], r.p[2] * 1.18], c: '#94a3b8', r: 3.5, type: 'ligand'
    }));

    // IgG unidos a proteína A (capturados)
    const BOUND_AB = [];
    for (let i = 0; i < 12; i++) {
      const l = RESIN[i * 2];
      BOUND_AB.push({ p: [l.p[0] * 1.4, l.p[1] - 15, l.p[2] * 1.4], c: '#f59e0b', r: 8, type: 'ab_bound' });
    }

    // Impurezas (lavadas, saliendo)
    const IMPURITIES = [];
    for (let i = 0; i < 15; i++) {
      const a = (i / 15) * Math.PI * 2;
      IMPURITIES.push({ p: [90 * Math.cos(a), -80 + i * 4, 90 * Math.sin(a)], c: '#ef4444', r: 4, phase: i * 0.4, type: 'imp' });
    }

    // Anticuerpos eluidos (saliendo puros)
    const ELUTED = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      ELUTED.push({ p: [30 * Math.cos(a), 80 + i * 8, 30 * Math.sin(a)], c: '#10b981', r: 7, phase: i * 0.5, type: 'eluted' });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.018;

      // Impurezas moviéndose hacia afuera y arriba
      const impAnim  = IMPURITIES.map(im => ({ ...im, p: [im.p[0] + Math.sin(t + im.phase)*4, im.p[1] - t*1.5 % 150, im.p[2]] }));
      // Elución bajando
      const eluAnim  = ELUTED.map(el => ({ ...el, p: [el.p[0], el.p[1] + Math.sin(t*0.8 + el.phase)*8, el.p[2]] }));

      const ALL = [...RESIN, ...LIGANDS, ...BOUND_AB, ...impAnim, ...eluAnim];
      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'ab_bound') {
          // Glow antibody capturado
          const glow = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad*2.5);
          glow.addColorStop(0,'#f59e0b28'); glow.addColorStop(1,'transparent');
          ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(d.x,d.y,rad*2.5,0,Math.PI*2); ctx.fill();
        }
        drawSphere(ctx, d.x, d.y, rad, d.c);
      });

      legend(ctx, [
        { c: '#64748b', t: 'Resina Proteína A (Sepharose)' },
        { c: '#f59e0b', t: 'IgG capturado (Fc→Prot.A)' },
        { c: '#ef4444', t: 'Impurezas (lavado)' },
        { c: '#10b981', t: 'IgG eluido puro (pH 3.5)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-4: ESCALAMIENTO — Comparativa biorreactor lab→piloto→prod
  ================================================================ */
  function drawScaleUp(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, FOV = 600;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    function buildReactor(cx, cy, cz, R, H2, color, n) {
      const pts = [];
      // Anillos del cilindro
      for (let r = 0; r < 5; r++) {
        const y = cy - H2/2 + r * (H2/4);
        for (let i = 0; i < 24; i++) {
          const a = (i / 24) * Math.PI * 2;
          pts.push({ p: [cx + R*Math.cos(a), y, cz + R*Math.sin(a)], c: color, r: n, type: 'rct_'+r });
        }
      }
      // Tapa superior y fondo
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2, t2 = i / 11;
        pts.push({ p: [cx + t2*R*Math.cos(a), cy + H2/2, cz + t2*R*Math.sin(a)], c: color, r: n*0.9 });
        pts.push({ p: [cx + t2*R*Math.cos(a), cy - H2/2, cz + t2*R*Math.sin(a)], c: color, r: n*0.9 });
      }
      return pts;
    }

    // 3 biorreactores: 2L, 50L, 2000L
    const R1 = buildReactor(-130, 0, 0, 28, 80, '#06b6d4', 2.8);  // Lab  2 L
    const R2 = buildReactor(0,    0, 0, 45, 110, '#f59e0b', 3.5); // Piloto 50 L
    const R3 = buildReactor(145,  0, 0, 70, 150, '#10b981', 4.5); // Prod 2000 L

    // Células dentro de cada biorreactor (puntos internos)
    const makeCells = (cx, cz, R2, count, color) => {
      const cells = [];
      for (let i = 0; i < count; i++) {
        const a = Math.random()*Math.PI*2, r2 = Math.random()*R2*0.7, y = (Math.random()-0.5)*60;
        cells.push({ p: [cx+r2*Math.cos(a), y, cz+r2*Math.sin(a)], c: color, r: 2.5 });
      }
      return cells;
    };
    const C1 = makeCells(-130, 0, 28, 15, '#7dd3fc');
    const C2 = makeCells(0,    0, 45, 30, '#fde68a');
    const C3 = makeCells(145,  0, 70, 60, '#6ee7b7');

    const ALL = [...R1, ...R2, ...R3, ...C1, ...C2, ...C3];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.005;

      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,W/2,H/2), z: p[2] }));

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        drawSphere(ctx, d.x, d.y, d.r * d.d, d.c);
      });

      // Etiquetas
      ctx.font = 'bold 11px "Outfit", sans-serif'; ctx.textAlign = 'center';
      const lbs = [{ x:W/2-110, c:'#06b6d4', t:'2 L', s:'Lab'}, {x:W/2, c:'#f59e0b', t:'50 L', s:'Piloto'}, {x:W/2+110, c:'#10b981', t:'2.000 L', s:'Producción'}];
      lbs.forEach(l => {
        ctx.fillStyle = l.c;
        ctx.fillText(l.t, l.x, H - 28);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(l.s, l.x, H - 14);
        ctx.font = 'bold 11px "Outfit", sans-serif';
      });

      legend(ctx, [
        { c: '#06b6d4', t: 'Biorreactor laboratorio (2 L)' },
        { c: '#f59e0b', t: 'Biorreactor piloto (50 L)' },
        { c: '#10b981', t: 'Biorreactor producción (2.000 L)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     TABS — con lazy init de canvas al primer clic
  ================================================================ */
  function initTabs(canvasMap) {
    const btns   = $$('.pb-tab-btn');
    const panels = $$('.pb-panel');
    const inited = new Set();

    function initPanelCanvas(idx) {
      if (inited.has(idx)) return;
      inited.add(idx);
      // Buscar canvas dentro del panel activo y renderizarlo
      Object.entries(canvasMap).forEach(([id, fn]) => {
        const c = document.getElementById(id);
        if (c && panels[idx] && panels[idx].contains(c)) {
          // Forzar dimensiones visibles antes de setupCanvas
          requestAnimationFrame(() => {
            c.style.width  = '100%';
            c.style.height = '330px';
            fn(c);
          });
        }
      });
    }

    function activate(i) {
      btns.forEach((b, j)   => b.classList.toggle('active', j === i));
      panels.forEach((p, j) => p.classList.toggle('active', j === i));
      initPanelCanvas(i);
    }

    btns.forEach((btn, i) => btn.addEventListener('click', () => activate(i)));
    activate(0); // Panel 0 init inmediato (ya es visible)
  }

  /* ================================================================
     CONTADORES
  ================================================================ */
  function initCounters() {
    const els = $$('[data-pb-count]');
    const io  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseFloat(el.dataset.pbCount);
        const suf = el.dataset.pbSuf || '', dec = +(el.dataset.pbDec || 0), dur = 1600;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now - start)/dur, 1), ease = 1 - Math.pow(1-prog,3);
          el.textContent = (ease*target).toFixed(dec) + suf;
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ================================================================
     REVEAL
  ================================================================ */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pb-revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin:'0px 0px -30px 0px' });
    $$('[data-pb-reveal]').forEach(el => io.observe(el));
  }

  /* ================================================================
     INIT
  ================================================================ */
  function init() {
    const canvasMap = {
      'pb-canvas-ferm':  drawFermentation,
      'pb-canvas-cell':  drawCellCulture,
      'pb-canvas-puri':  drawPurification,
      'pb-canvas-scale': drawScaleUp,
    };

    initTabs(canvasMap); initCounters(); initReveal();

    // Hero siempre visible — init directo
    const hc = document.getElementById('pb-hero-canvas');
    if (hc) drawHero(hc);

    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive:true });

    const toggle = document.getElementById('navToggle'), links = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  return { version:'1.0.0', module:'PB-ProduccionBiotecnologica' };
})();