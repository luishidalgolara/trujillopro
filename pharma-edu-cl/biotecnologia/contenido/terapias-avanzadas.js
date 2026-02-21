/* ============================================================
   TERAPIAS-AVANZADAS.JS — PharmaLab Chile | Unidad 4
   Iniciales: TA — Motor 3D Canvas + Tabs lazy-init + Animaciones
   ============================================================ */

'use strict';

const TA = (() => {

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ── MOTOR 3D ── */
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
    const w = canvas.clientWidth || canvas.parentElement.clientWidth || 420;
    const h = canvas.clientHeight || 330;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, W: w, H: h };
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
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color + '55'); g.addColorStop(1, 'transparent');
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
     HERO 3D — CAR-T atacando célula tumoral
  ================================================================ */
  function drawHero(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 700;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    // Célula tumoral grande (centro)
    const TUMOR = spherePts(55, 120).map(p => ({ p, c: '#ef4444', r: 4, type: 'tumor' }));
    // Receptores PD-L1 en tumor
    const PDL1 = [];
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2, b = (i % 5) * Math.PI / 5;
      PDL1.push({ p: [60*Math.cos(a)*Math.sin(b+0.4), 60*Math.cos(b+0.4), 60*Math.sin(a)*Math.sin(b+0.4)], c: '#f97316', r: 6, type: 'pdl1' });
    }

    // 4 CAR-T cells orbiting (esferas medianas con spike)
    const CART_CENTERS = [
      [-130, 0, 0], [130, 0, 0], [0, -130, 0], [0, 130, 0]
    ];
    const CART = [];
    CART_CENTERS.forEach(([cx, cy, cz]) => {
      spherePts(22, 45).forEach(p => {
        CART.push({ p: [p[0]+cx, p[1]+cy, p[2]+cz], c: '#06b6d4', r: 3.5, type: 'cart' });
      });
      // TCR/CAR receptor spike hacia tumor
      const dir = [-cx/130, -cy/130, -cz/130];
      for (let j = 0; j < 5; j++) {
        CART.push({ p: [cx + dir[0]*(22+j*8), cy + dir[1]*(22+j*8), cz + dir[2]*(22+j*8)], c: '#10b981', r: 4.5 - j * 0.5, type: 'car' });
      }
    });

    // Citocinas liberadas (perforinas/granzimas)
    const CYTO = [];
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2, r2 = 75 + (i % 4) * 10;
      CYTO.push({ p: [r2*Math.cos(a), (Math.random()-0.5)*80, r2*Math.sin(a)], c: '#a855f7', r: 3.5, phase: i*0.35 });
    }

    const STATIC = [...TUMOR, ...PDL1, ...CART];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.018;

      // CAR-T orbiting
      const cartAnim = STATIC.map(pt => {
        if (pt.type !== 'tumor' && pt.type !== 'pdl1') {
          const ang = t * 0.35;
          const x2 = pt.p[0] * Math.cos(ang) - pt.p[2] * Math.sin(ang);
          const z2 = pt.p[0] * Math.sin(ang) + pt.p[2] * Math.cos(ang);
          return { ...pt, p: [x2, pt.p[1], z2] };
        }
        return pt;
      });

      const cytoAnim = CYTO.map(c => ({
        ...c, p: [c.p[0] + Math.sin(t + c.phase) * 6, c.p[1] + Math.cos(t * 1.2 + c.phase) * 5, c.p[2]]
      }));

      const ALL = [...cartAnim, ...cytoAnim];
      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      // Tumor central glow
      glow3d(ctx, CX, CY, 90, '#ef4444');

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'tumor') {
          const g = ctx.createRadialGradient(d.x-rad*.3,d.y-rad*.3,0,d.x,d.y,rad);
          g.addColorStop(0,'#ef4444cc'); g.addColorStop(1,'#ef444422');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx, d.x, d.y, rad, d.c); }
      });

      legend(ctx, [
        { c: '#ef4444', t: 'Célula tumoral (CD19+/BCMA+)' },
        { c: '#f97316', t: 'Receptor PD-L1 (checkpoint)' },
        { c: '#06b6d4', t: 'Linfocito T CAR modificado' },
        { c: '#10b981', t: 'Dominio CAR (scFv → CD3ζ)' },
        { c: '#a855f7', t: 'Perforinas / Granzimas' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-1: TERAPIA GÉNICA — Vector AAV entregando gen terapéutico
  ================================================================ */
  function drawGenTherapy(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.20, ry: 0, auto: true };
    addDrag(canvas, st);

    // Cápside AAV (icosaedro de puntos)
    const AAV_SHELL = spherePts(42, 100).map(p => ({ p, c: '#06b6d4', r: 3.8, type: 'aav' }));
    // Espículas virales (proteínas VP1/VP2/VP3)
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, b = (i % 4) * Math.PI / 4 + 0.3;
      AAV_SHELL.push({ p: [50*Math.cos(a)*Math.sin(b), 50*Math.cos(b), 50*Math.sin(a)*Math.sin(b)], c: '#22d3ee', r: 6, type: 'spike' });
    }

    // ADN terapéutico dentro del AAV (hebra circular)
    const DNA_INNER = [];
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      DNA_INNER.push({ p: [22*Math.cos(a), 8*Math.sin(a*2.5), 22*Math.sin(a)], c: '#10b981', r: 3, type: 'dna' });
    }

    // Núcleo celular (receptor)
    const NUCLEUS = spherePts(32, 70).map(p => ({ p: [p[0]+155, p[1], p[2]], c: '#a855f7', r: 3.5, type: 'nuc' }));
    // Poro nuclear
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      NUCLEUS.push({ p: [155 + 32*Math.cos(a), 0, 32*Math.sin(a)], c: '#c084fc', r: 5, type: 'pore' });
    }

    // Croma tina (ADN endógeno en núcleo)
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2, r2 = 15 + (i % 3) * 5;
      NUCLEUS.push({ p: [155 + r2*Math.cos(a), r2*Math.sin(a)*0.5, r2*Math.sin(a)], c: '#6366f1', r: 3, type: 'chrom' });
    }

    // Flecha de entrega: AAV moviéndose hacia núcleo
    const TRANSIT = [];
    for (let i = 0; i < 8; i++) {
      TRANSIT.push({ p: [50 + i*10, 0, 0], c: '#f59e0b', r: 2.5, phase: i * 0.3 });
    }

    const ALL = [...AAV_SHELL, ...DNA_INNER, ...NUCLEUS, ...TRANSIT];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.016;

      // Transit particles animation
      const transAnim = ALL.map((pt, i) => {
        if (pt.phase !== undefined) {
          const prog = ((t * 0.3 + pt.phase) % 1);
          return { ...pt, p: [50 + prog * 60, Math.sin(t * 2 + pt.phase) * 8, 0] };
        }
        return pt;
      });

      const rot  = rotate(transAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...transAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      // AAV shell backbone
      const shell = proj.filter(d => d.type === 'aav');
      ctx.beginPath();
      shell.slice(0, 40).forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.strokeStyle = '#06b6d430'; ctx.lineWidth = 1.2; ctx.stroke();

      // Nucleus glow
      const nucCenter = proj.find(d => d.type === 'nuc');
      if (nucCenter) glow3d(ctx, nucCenter.x, nucCenter.y, 60, '#a855f7');

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'nuc') {
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#a855f7aa'); g.addColorStop(1,'#a855f718');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx, d.x, d.y, rad, d.c); }
      });

      legend(ctx, [
        { c: '#06b6d4', t: 'Cápside AAV (VP1/VP2/VP3)' },
        { c: '#10b981', t: 'Gen terapéutico (ADNss ITR-flanqueado)' },
        { c: '#f59e0b', t: 'Tránsito endosomal → núcleo' },
        { c: '#a855f7', t: 'Núcleo celular diana' },
        { c: '#6366f1', t: 'Cromatina endógena' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-2: CAR-T — Construcción del receptor quimérico
  ================================================================ */
  function drawCART(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // Membrana celular T (capa de lípidos)
    const MEMBRANE = [];
    for (let i = 0; i < 70; i++) {
      const a = (i / 70) * Math.PI * 2;
      MEMBRANE.push({ p: [95*Math.cos(a), 8*Math.sin(a*2), 95*Math.sin(a)], c: '#334155', r: 4.5, type: 'mem' });
      MEMBRANE.push({ p: [95*Math.cos(a), 8*Math.sin(a*2) + 12, 95*Math.sin(a)], c: '#475569', r: 4, type: 'mem2' });
    }

    // Receptor CAR (estructura transmembrana)
    // scFv extracelular (2 cadenas VH + VL)
    const SCFV = [];
    const CAR_X = 0, CAR_Z = 0;
    for (let i = 0; i < 15; i++) {
      SCFV.push({ p: [CAR_X - 8, -80 + i * 7, CAR_Z], c: '#ec4899', r: 4.5, type: 'vh' });
      SCFV.push({ p: [CAR_X + 8, -80 + i * 7, CAR_Z], c: '#f97316', r: 4.5, type: 'vl' });
    }
    // Linker (G4S)3 entre VH y VL
    for (let i = 0; i < 6; i++) {
      SCFV.push({ p: [CAR_X - 8 + i * 2.7, -80, CAR_Z], c: '#fbbf24', r: 3, type: 'linker' });
    }
    // Hinge (CD8α)
    for (let i = 0; i < 5; i++) {
      SCFV.push({ p: [CAR_X, -3 + i * 6, CAR_Z], c: '#06b6d4', r: 5, type: 'hinge' });
    }
    // Dominio transmembrana (CD8/CD28)
    for (let i = 0; i < 4; i++) {
      SCFV.push({ p: [CAR_X, 26 + i * 6, CAR_Z], c: '#10b981', r: 6, type: 'tm' });
    }
    // Dominio coestimulador (4-1BB o CD28)
    const COSTIM = spherePts(14, 35).map(p => ({ p: [p[0]+CAR_X, p[1]+62, p[2]+CAR_Z], c: '#a855f7', r: 3.2, type: 'costim' }));
    // CD3ζ (señalización)
    const CD3Z = spherePts(18, 40).map(p => ({ p: [p[0]+CAR_X, p[1]+95, p[2]+CAR_Z], c: '#ef4444', r: 3.5, type: 'cd3z' }));
    // ITAMs (3 pares en CD3ζ)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      CD3Z.push({ p: [CAR_X + 20*Math.cos(a), 95, CAR_Z + 20*Math.sin(a)], c: '#f87171', r: 5, type: 'itam' });
    }

    // Antígeno diana (CD19) en membrana opuesta
    const ANTIGEN = [];
    for (let i = 0; i < 8; i++) {
      ANTIGEN.push({ p: [CAR_X, -80 - i * 7, CAR_Z], c: '#fcd34d', r: 4.5, phase: i * 0.3, type: 'ag' });
    }

    const ALL = [...MEMBRANE, ...SCFV, ...COSTIM, ...CD3Z, ...ANTIGEN];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.016;

      // Antigen docking animation
      const agOff = Math.sin(t * 0.8) * 5;
      const allAnim = ALL.map(pt => {
        if (pt.type === 'ag') return { ...pt, p: [pt.p[0], pt.p[1] + agOff, pt.p[2]] };
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      // Membrana elipse
      const mem = proj.filter(d => d.type === 'mem');
      ctx.beginPath();
      mem.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.strokeStyle = '#47556940'; ctx.lineWidth = 1.5; ctx.stroke();

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        sphere3d(ctx, d.x, d.y, d.r * d.d, d.c);
      });

      // Labels
      ctx.font = '9px "JetBrains Mono",monospace'; ctx.textAlign = 'center';
      const labels = [
        { type: 'vh',     txt: 'VH', col: '#ec4899' },
        { type: 'vl',     txt: 'VL', col: '#f97316' },
        { type: 'costim', txt: '4-1BB', col: '#a855f7' },
        { type: 'cd3z',   txt: 'CD3ζ', col: '#ef4444' },
        { type: 'ag',     txt: 'CD19', col: '#fcd34d' },
      ];
      labels.forEach(lb => {
        const pts = proj.filter(d => d.type === lb.type);
        if (!pts.length) return;
        const avg = pts.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
        ctx.fillStyle = lb.col + 'cc';
        ctx.fillText(lb.txt, avg.x / pts.length, avg.y / pts.length - 14);
      });

      legend(ctx, [
        { c: '#ec4899', t: 'Dominio VH (scFv anti-CD19)' },
        { c: '#f97316', t: 'Dominio VL (scFv)' },
        { c: '#06b6d4', t: 'Hinge CD8α + Transmembrana' },
        { c: '#a855f7', t: 'Coestimulador 4-1BB (CD137)' },
        { c: '#ef4444', t: 'CD3ζ — ITAMs señalización' },
        { c: '#fcd34d', t: 'Antígeno CD19 (diana)' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-3: NANOMEDICINA — LNP con ARNm terapéutico
  ================================================================ */
  function drawNano(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.20, ry: 0, auto: true };
    addDrag(canvas, st);

    // Bicapa lipídica exterior LNP
    const OUTER = spherePts(60, 130).map(p => ({ p, c: '#f59e0b', r: 3.8, type: 'outer' }));
    // Ionizable lipid core (interior)
    const INNER = spherePts(38, 80).map(p => ({ p, c: '#fbbf24', r: 3.2, type: 'inner' }));
    // PEG coat (polietilenglicol)
    const PEG = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2, b = (i % 6) * Math.PI / 6 + 0.2;
      const base = [65*Math.cos(a)*Math.sin(b), 65*Math.cos(b), 65*Math.sin(a)*Math.sin(b)];
      for (let j = 0; j < 4; j++) {
        PEG.push({ p: [base[0]+j*3*Math.cos(a), base[1]+j*2, base[2]+j*3*Math.sin(a)], c: '#06b6d4', r: 2.2, type: 'peg' });
      }
    }
    // ARNm encapsulado (hebra enrollada)
    const MRNA = [];
    for (let i = 0; i < 60; i++) {
      const t2 = i / 60, a = t2 * Math.PI * 6;
      MRNA.push({ p: [28*Math.cos(a)*Math.sin(t2*Math.PI), -25 + t2*50, 28*Math.sin(a)*Math.sin(t2*Math.PI)], c: '#10b981', r: 3, type: 'mrna' });
    }
    // Helper lipids (DSPC, cholesterol)
    const HELPER = spherePts(50, 30).map(p => ({ p, c: '#a78bfa', r: 2.5, type: 'helper' }));

    // Receptor celular (blanco) + LNP aproximándose
    const RECEPTOR = [];
    for (let i = 0; i < 10; i++) {
      RECEPTOR.push({ p: [140, -40 + i * 9, 0], c: '#ec4899', r: 4.5, type: 'rec' });
    }
    RECEPTOR.push({ p: [140, -45, 0], c: '#f472b6', r: 7, type: 'rec_head' });

    const ALL = [...OUTER, ...INNER, ...PEG, ...MRNA, ...HELPER, ...RECEPTOR];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.016;

      // LNP pulsation
      const scale = 1 + 0.04 * Math.sin(t * 1.5);
      const allAnim = ALL.map(pt => {
        if (['outer','inner','peg','mrna','helper'].includes(pt.type)) {
          return { ...pt, p: [pt.p[0]*scale, pt.p[1]*scale, pt.p[2]*scale] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      // Outer glow
      glow3d(ctx, CX, CY, 85, '#f59e0b');

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'outer') {
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#f59e0baa'); g.addColorStop(1,'#f59e0b18');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx, d.x, d.y, rad, d.c); }
      });

      legend(ctx, [
        { c: '#f59e0b', t: 'Lípido ionizable (DLin-MC3, ALC-0315)' },
        { c: '#06b6d4', t: 'PEG-lípido (ALC-0159, superficie)' },
        { c: '#a78bfa', t: 'Lípidos helper (DSPC, colesterol)' },
        { c: '#10b981', t: 'ARNm encapsulado (terapéutico)' },
        { c: '#ec4899', t: 'Receptor diana en célula blanco' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-4: MEDICINA REGENERATIVA — Organoides y Células Madre
  ================================================================ */
  function drawRegen(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.20, ry: 0, auto: true };
    addDrag(canvas, st);

    // iPSC central (célula madre pluripotente inducida)
    const IPSC = spherePts(30, 70).map(p => ({ p, c: '#10b981', r: 4, type: 'ipsc' }));
    // Núcleo brillante (pluripotencia)
    const NUC = spherePts(14, 35).map(p => ({ p, c: '#34d399', r: 3.5, type: 'nuc' }));
    // Factores de Yamanaka (OCT4, SOX2, KLF4, c-MYC)
    const YAMA = [];
    const yamaNames = ['OCT4', 'SOX2', 'KLF4', 'cMYC'];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      for (let j = 0; j < 8; j++) {
        YAMA.push({ p: [(38+j*5)*Math.cos(a), (j-3)*6, (38+j*5)*Math.sin(a)], c: '#f59e0b', r: 3.5 - j*0.2, type: 'yama', name: yamaNames[i] });
      }
    }

    // 3 tipos celulares diferenciados (cardíaco, neural, hepático)
    const DIFF_COLORS = ['#ef4444', '#06b6d4', '#a855f7'];
    const DIFF_POS = [[-120, 50, 0], [120, 50, 0], [0, 50, 120]];
    const DIFF = [];
    DIFF_COLORS.forEach((col, i) => {
      const [dx, dy, dz] = DIFF_POS[i];
      spherePts(20, 50).forEach(p => {
        DIFF.push({ p: [p[0]+dx, p[1]+dy, p[2]+dz], c: col, r: 3.5, type: 'diff'+i });
      });
      // Conexión desde iPSC
      for (let j = 0; j < 8; j++) {
        const tt = j / 7;
        DIFF.push({ p: [dx*tt, dy*tt, dz*tt], c: col, r: 2.5, type: 'conn' });
      }
    });

    // Scaffold de bioimpresión (malla)
    const SCAFFOLD = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        SCAFFOLD.push({ p: [-80 + i*40, 100, -80 + j*40], c: '#64748b', r: 3, type: 'scaf' });
      }
    }
    for (let i = 0; i < 5; i++) {
      SCAFFOLD.push({ p: [-80 + i*40, 100, -80], c: '#64748b', r: 2, type: 'scaf' });
      SCAFFOLD.push({ p: [-80, 100, -80 + i*40], c: '#64748b', r: 2, type: 'scaf' });
    }

    const ALL = [...IPSC, ...NUC, ...YAMA, ...DIFF, ...SCAFFOLD];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.005;
      t += 0.016;

      // iPSC pulse
      const pulse = 1 + 0.06 * Math.sin(t * 1.2);
      const allAnim = ALL.map(pt => {
        if (pt.type === 'ipsc' || pt.type === 'nuc') return { ...pt, p: [pt.p[0]*pulse, pt.p[1]*pulse, pt.p[2]*pulse] };
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      glow3d(ctx, CX, CY, 70, '#10b981');

      // Scaffold grid lines
      const scaf = proj.filter(d => d.type === 'scaf');
      for (let i = 0; i < 5; i++) {
        const row = scaf.slice(i * 5, i * 5 + 5);
        ctx.beginPath();
        row.forEach((p, j) => j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = '#64748b40'; ctx.lineWidth = 1; ctx.stroke();
      }

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'ipsc') {
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b981bb'); g.addColorStop(1,'#10b98118');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx, d.x, d.y, rad, d.c); }
      });

      legend(ctx, [
        { c: '#10b981', t: 'iPSC (Factores Yamanaka)' },
        { c: '#f59e0b', t: 'OCT4 / SOX2 / KLF4 / c-MYC' },
        { c: '#ef4444', t: 'Diferenciación cardíaca' },
        { c: '#06b6d4', t: 'Diferenciación neural' },
        { c: '#a855f7', t: 'Diferenciación hepática' },
        { c: '#64748b', t: 'Scaffold bioimpresión 3D' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     TABS — lazy canvas init (fix panel oculto → clientWidth=0)
  ================================================================ */
  function initTabs(canvasMap) {
    const btns   = $$('.ta-tab-btn');
    const panels = $$('.ta-panel');
    const inited = new Set();

    function initPanelCanvas(idx) {
      if (inited.has(idx)) return;
      inited.add(idx);
      Object.entries(canvasMap).forEach(([id, fn]) => {
        const c = document.getElementById(id);
        if (c && panels[idx] && panels[idx].contains(c)) {
          requestAnimationFrame(() => { c.style.width='100%'; c.style.height='330px'; fn(c); });
        }
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
        const el = e.target, target = parseFloat(el.dataset.taCount);
        const suf = el.dataset.taSuf || '', dec = +(el.dataset.taDec || 0), dur = 1600;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - prog, 3);
          el.textContent = (ease * target).toFixed(dec) + suf;
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-ta-count]').forEach(e => io.observe(e));
  }

  /* ── REVEAL ── */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ta-revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('[data-ta-reveal]').forEach(el => io.observe(el));
  }

  /* ── INIT ── */
  function init() {
    const canvasMap = {
      'ta-canvas-gene':  drawGenTherapy,
      'ta-canvas-cart':  drawCART,
      'ta-canvas-nano':  drawNano,
      'ta-canvas-regen': drawRegen,
    };
    initTabs(canvasMap); initCounters(); initReveal();

    const hc = document.getElementById('ta-hero-canvas');
    if (hc) drawHero(hc);

    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    const toggle = document.getElementById('navToggle'), links = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  return { version: '1.0.0', module: 'TA-TerapiasAvanzadas' };
})();
