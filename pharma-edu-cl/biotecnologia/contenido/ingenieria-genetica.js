/* ============================================================
   INGENETICA.JS — PharmaLab Chile | Unidad 2: Ingeniería Genética
   Iniciales: IG — Motor 3D Canvas + Tabs + Animaciones
   ============================================================ */

'use strict';

const IG = (() => {

  /* ── UTILS ── */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ── PROYECCIÓN / ROTACIÓN 3D ── */
  function project(x, y, z, fov, cx, cy) {
    const d = fov / (fov + z);
    return { x: cx + x * d, y: cy + y * d, d };
  }

  function rotate(pts, rx, ry, rz = 0) {
    return pts.map(([x, y, z]) => {
      // Y
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);
      // X
      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      // Z
      let x3 = x1 * Math.cos(rz) - y2 * Math.sin(rz);
      let y3 = x1 * Math.sin(rz) + y2 * Math.cos(rz);
      return [x3, y3, z2];
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

  /* Drag helper */
  function addDrag(canvas, getState, setState) {
    let dragging = false, lx = 0, ly = 0;
    const s = getState();
    canvas.addEventListener('mousedown', e => { dragging = true; s.auto = false; lx = e.clientX; ly = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      s.ry += (e.clientX - lx) * 0.008; s.rx += (e.clientY - ly) * 0.008;
      lx = e.clientX; ly = e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging = false; s.auto = true; });
    canvas.addEventListener('touchstart', e => { dragging = true; s.auto = false; lx = e.touches[0].clientX; ly = e.touches[0].clientY; });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!dragging) return;
      s.ry += (e.touches[0].clientX - lx) * 0.008; s.rx += (e.touches[0].clientY - ly) * 0.008;
      lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { dragging = false; s.auto = true; });
  }

  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';
    return canvas.getContext('2d');
  }

  function legend(ctx, items, size = 10) {
    ctx.font = `${size}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'left';
    items.forEach((l, i) => {
      ctx.fillStyle = l.c;
      ctx.beginPath(); ctx.arc(12, 14 + i * 18, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.42)';
      ctx.fillText(l.t, 24, 18 + i * 18);
    });
  }

  function sphere3d(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
    g.addColorStop(0, color + 'ff');
    g.addColorStop(0.55, color + 'bb');
    g.addColorStop(1, color + '22');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  /* ================================================================
     3D-1: HERO — Doble Hélice ADN + Scissors CRISPR flotantes
  ================================================================ */
  function drawHero(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 700;
    const st = { rx: 0.1, ry: 0, auto: true };
    addDrag(canvas, () => st, v => Object.assign(st, v));

    const DNA = [];
    const N = 100;
    for (let i = 0; i < N; i++) {
      const t = i / N, ang = t * Math.PI * 7, y = (t - 0.5) * 300;
      DNA.push({ p: [58 * Math.cos(ang), y, 58 * Math.sin(ang)], c: '#a855f7', r: 5.5, type: 'h1' });
      DNA.push({ p: [58 * Math.cos(ang + Math.PI), y, 58 * Math.sin(ang + Math.PI)], c: '#06b6d4', r: 5.5, type: 'h2' });
      if (i % 5 === 0) {
        const mid = [(58*Math.cos(ang)+58*Math.cos(ang+Math.PI))/2,y,(58*Math.sin(ang)+58*Math.sin(ang+Math.PI))/2];
        DNA.push({ p: mid, c: '#f59e0b', r: 3.5, type: 'bridge' });
      }
    }

    // Enzima Cas9 flotante (esfera de puntos)
    const CAS9_BASE = spherePts(28, 50).map(p => ({ p, c: '#10b981', r: 3.5, type: 'cas9' }));
    const CAS9_OFF  = [140, 60, 0];
    const CAS9 = CAS9_BASE.map(pt => ({ ...pt, p: [pt.p[0]+CAS9_OFF[0], pt.p[1]+CAS9_OFF[1], pt.p[2]+CAS9_OFF[2]] }));

    // ARNg (cadena corta)
    const GUIDE = [];
    for (let i = 0; i < 20; i++) {
      const t = i / 20;
      GUIDE.push({ p: [CAS9_OFF[0] - 20 + t*30, CAS9_OFF[1]+28 + t*40, CAS9_OFF[2]+5*Math.sin(t*Math.PI*3)], c: '#ec4899', r: 3, type: 'guide' });
    }

    const ALL = [...DNA, ...CAS9, ...GUIDE];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.018;

      // Cas9 bob
      const cas9Anim = ALL.map((pt, i) => {
        if (pt.type === 'cas9' || pt.type === 'guide') {
          return { ...pt, p: [pt.p[0], pt.p[1] + Math.sin(t) * 8, pt.p[2]] };
        }
        return pt;
      });

      const rot = rotate(cas9Anim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...cas9Anim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      // Backbone ADN hélice 1 y 2
      ['h1','h2'].forEach((type, ti) => {
        const strand = proj.filter(p => p.type === type);
        ctx.beginPath();
        strand.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = (ti === 0 ? '#a855f7' : '#06b6d4') + '45';
        ctx.lineWidth = 2.2;
        ctx.stroke();
      });

      // ARNg backbone
      const guide = proj.filter(p => p.type === 'guide');
      ctx.beginPath();
      guide.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = '#ec489966';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);

      // Dibujar todos los puntos
      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        sphere3d(ctx, d.x, d.y, rad, d.c);
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Cadena ADN (5\'→3\')' },
        { c: '#06b6d4', t: 'Cadena complementaria' },
        { c: '#f59e0b', t: 'Puentes H (pares de bases)' },
        { c: '#10b981', t: 'Cas9 (endonucleasa)' },
        { c: '#ec4899', t: 'ARNg (guía)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-2: ADN RECOMBINANTE — Plásmido circular + inserto
  ================================================================ */
  function drawPlasmid(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 650;
    const st = { rx: 0.25, ry: 0, auto: true };
    addDrag(canvas, () => st, v => Object.assign(st, v));

    // Plásmido: toro 3D (anillo de esferas)
    const PLASMID = [];
    const NP = 90, RP = 80, rp_tube = 8;
    for (let i = 0; i < NP; i++) {
      const ang = (i / NP) * Math.PI * 2;
      // doble cadena del plásmido
      const off = 5;
      PLASMID.push({ p: [(RP+off)*Math.cos(ang), (RP+off)*Math.sin(ang)*0.35, (RP+off)*Math.sin(ang)], c: '#a855f7', r: 4.5, type: 'ring1' });
      PLASMID.push({ p: [(RP-off)*Math.cos(ang), (RP-off)*Math.sin(ang)*0.35, (RP-off)*Math.sin(ang)], c: '#06b6d4', r: 4.5, type: 'ring2' });
    }

    // Inserto (gen de interés): segmento del plásmido coloreado en distinto color
    const INSERT_ANGLES = [0.3, 0.9]; // rango angular del inserto
    const INSERTO = [];
    for (let i = 0; i < 18; i++) {
      const ang = INSERT_ANGLES[0] + (i / 17) * (INSERT_ANGLES[1] - INSERT_ANGLES[0]);
      INSERTO.push({ p: [(RP+8)*Math.cos(ang), (RP+8)*Math.sin(ang)*0.35, (RP+8)*Math.sin(ang)], c: '#10b981', r: 6.5, type: 'insert' });
      INSERTO.push({ p: [(RP-8)*Math.cos(ang), (RP-8)*Math.sin(ang)*0.35, (RP-8)*Math.sin(ang)], c: '#10b981', r: 6.5, type: 'insert' });
    }

    // Promotor, RBS, terminador (puntos clave)
    const FEATURES = [
      { p: [RP*Math.cos(0.2), RP*Math.sin(0.2)*0.35+10, RP*Math.sin(0.2)], c: '#f59e0b', r: 9, lbl: 'Promotor' },
      { p: [RP*Math.cos(1.1), RP*Math.sin(1.1)*0.35+10, RP*Math.sin(1.1)], c: '#ef4444', r: 9, lbl: 'Gen de interés' },
      { p: [RP*Math.cos(2.0), RP*Math.sin(2.0)*0.35+10, RP*Math.sin(2.0)], c: '#ec4899', r: 9, lbl: 'Terminador' },
      { p: [RP*Math.cos(3.5), RP*Math.sin(3.5)*0.35+10, RP*Math.sin(3.5)], c: '#6366f1', r: 9, lbl: 'AmpR (resist.)' },
      { p: [RP*Math.cos(5.0), RP*Math.sin(5.0)*0.35+10, RP*Math.sin(5.0)], c: '#f97316', r: 9, lbl: 'Ori' },
    ];

    // Enzimas de restricción (pares de tijeras)
    const SCISSORS = [];
    for (let s = 0; s < 2; s++) {
      const ang = INSERT_ANGLES[s];
      for (let j = 0; j < 8; j++) {
        const oa = (j / 7 - 0.5) * 0.15 + ang;
        SCISSORS.push({ p: [(RP+16)*Math.cos(oa), (RP+16)*Math.sin(oa)*0.35, (RP+16)*Math.sin(oa)], c: '#ef4444', r: 3.5, type: 'sci' });
      }
    }

    const ALL = [...PLASMID, ...INSERTO, ...FEATURES, ...SCISSORS];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.007;
      t += 0.015;

      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      // Backbone plásmido
      ['ring1','ring2'].forEach((type, ti) => {
        const ring = proj.filter(p => p.type === type);
        ctx.beginPath();
        ring.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.strokeStyle = (ti === 0 ? '#a855f7' : '#06b6d4') + '40';
        ctx.lineWidth = 2; ctx.stroke();
      });

      // Dibujar puntos
      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        sphere3d(ctx, d.x, d.y, rad, d.c);
        if (d.lbl) {
          ctx.font = `bold ${Math.max(8, 10*d.d)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = d.c + 'cc';
          ctx.textAlign = 'center';
          ctx.fillText(d.lbl, d.x, d.y - 14 * d.d);
        }
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Cadena plásmido' },
        { c: '#10b981', t: 'Inserto (gen foráneo)' },
        { c: '#f59e0b', t: 'Promotor' },
        { c: '#ef4444', t: 'Sit. restricción (EcoRI/HindIII)' },
        { c: '#6366f1', t: 'Gen resistencia amp.' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-3: CRISPR-Cas9 — Complejo Ribonucleoproteína + corte ADN
  ================================================================ */
  function drawCRISPR(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 620;
    const st = { rx: 0.2, ry: 0, auto: true };
    addDrag(canvas, () => st, v => Object.assign(st, v));

    // Cas9: dos lóbulos (Recognition + Nuclease)
    const LOB_A = spherePts(38, 90).map(p => ({ p: [p[0]-22, p[1], p[2]], c: '#10b981', r: 4, type: 'cas9a' }));
    const LOB_B = spherePts(30, 70).map(p => ({ p: [p[0]+28, p[1], p[2]], c: '#34d399', r: 3.5, type: 'cas9b' }));

    // PAM + ADN diana: cadena doble que entra en Cas9
    const DNA_T = [];
    for (let i = 0; i < 35; i++) {
      const y = -120 + i * 7;
      const inCas = i > 12 && i < 26;
      const col = inCas ? '#f59e0b' : '#a855f7';
      DNA_T.push({ p: [-12, y, -8], c: col, r: inCas ? 5 : 4, type: 'dna_t' });
      DNA_T.push({ p: [ 12, y,  8], c: inCas ? '#fbbf24' : '#06b6d4', r: inCas ? 5 : 4, type: 'dna_t' });
      if (i % 4 === 0 && !inCas) {
        DNA_T.push({ p: [0, y, 0], c: '#ffffff', r: 2, type: 'bridge' });
      }
    }

    // ARNg (20 nt de guía + scaffold)
    const ARN_G = [];
    for (let i = 0; i < 28; i++) {
      const t2 = i / 28;
      const ang = t2 * Math.PI * 2.5;
      const inSide = i < 20;
      ARN_G.push({ p: [-5 + 30*t2, -60 + 12*t2 + 8*Math.sin(ang), 20 + 10*Math.cos(ang)*0.5], c: inSide ? '#ec4899' : '#f97316', r: inSide ? 4 : 3.5, type: 'guide' });
    }

    // RNP (ribonucleoproteína scaffold)
    const SCAFFOLD = spherePts(18, 30).map(p => ({ p: [p[0]+15, p[1]+10, p[2]+25], c: '#f97316', r: 3, type: 'scaffold' }));

    // Sitio de corte (flash)
    const CUT = [
      { p: [-12, 0, -8], c: '#ef4444', r: 10, type: 'cut' },
      { p: [ 12, 0,  8], c: '#ef4444', r: 10, type: 'cut' },
    ];

    const ALL = [...LOB_A, ...LOB_B, ...DNA_T, ...ARN_G, ...SCAFFOLD, ...CUT];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.007;
      t += 0.02;

      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      // DNA backbone
      const dt = proj.filter(p => p.type === 'dna_t');
      const s1 = dt.filter((_, i) => i % 2 === 0);
      const s2 = dt.filter((_, i) => i % 2 === 1);
      [s1, s2].forEach((strand, si) => {
        ctx.beginPath();
        strand.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = (si === 0 ? '#a855f7' : '#06b6d4') + '50';
        ctx.lineWidth = 2; ctx.stroke();
      });

      // ARNg backbone
      const ag = proj.filter(p => p.type === 'guide');
      ctx.beginPath();
      ag.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = '#ec489955'; ctx.lineWidth = 1.8;
      ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);

      // Glow en sitio de corte
      proj.filter(p => p.type === 'cut').forEach(d => {
        const rad = d.r * d.d * (1.2 + 0.4 * Math.sin(t * 3));
        const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad * 3);
        glow.addColorStop(0, '#ef444488'); glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(d.x, d.y, rad * 3, 0, Math.PI * 2); ctx.fill();
      });

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        sphere3d(ctx, d.x, d.y, rad, d.c);
      });

      // Etiquetas
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      const cutPts = proj.filter(p => p.type === 'cut');
      if (cutPts[0]) { ctx.fillStyle = '#ef4444bb'; ctx.fillText('Corte DSB', cutPts[0].x, cutPts[0].y - 15*cutPts[0].d); }

      legend(ctx, [
        { c: '#10b981', t: 'Cas9 (lóbulo Rec/Nuc)' },
        { c: '#ec4899', t: 'ARNg — secuencia guía (20 nt)' },
        { c: '#f97316', t: 'ARNg — scaffold' },
        { c: '#f59e0b', t: 'ADN diana (20 pb)' },
        { c: '#ef4444', t: 'Sitio de corte (DSB)' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-4: VECTORES — Comparativa Plásmido vs Lentivirus vs AAV
  ================================================================ */
  function drawVectors(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, FOV = 580;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, () => st, v => Object.assign(st, v));

    // Plásmido (izquierda): anillo plano
    const plasmid = [];
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      plasmid.push({ p: [Math.cos(a)*35 - 130, Math.sin(a)*35*0.4, Math.sin(a)*35], c: '#a855f7', r: 4 });
    }

    // AAV (centro): icosaedro de puntos
    const aav = spherePts(38, 80).map(p => ({ p, c: '#06b6d4', r: 4 }));
    // Espículas AAV
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2, b = (i % 4) / 4 * Math.PI;
      aav.push({ p: [44*Math.cos(a)*Math.sin(b+0.3), 44*Math.cos(b+0.3), 44*Math.sin(a)*Math.sin(b+0.3)], c: '#22d3ee', r: 5 });
    }

    // Lentivirus (derecha): envoltura esférica + nucleocápside
    const lenti = spherePts(42, 90).map(p => ({ p: [p[0]+130, p[1], p[2]], c: '#10b981', r: 3.5, alpha: 0.4 }));
    const lentiCore = spherePts(24, 50).map(p => ({ p: [p[0]+130, p[1], p[2]], c: '#34d399', r: 3.5 }));
    // Glicoproteínas de envoltura
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, b = (i % 4) * Math.PI / 4;
      lenti.push({ p: [130 + 50*Math.cos(a)*Math.sin(b+0.4), 50*Math.cos(b+0.4), 50*Math.sin(a)*Math.sin(b+0.4)], c: '#f59e0b', r: 6 });
    }

    const ALL = [...plasmid, ...aav, ...lentiCore, ...lenti];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;

      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0],p[1],p[2],FOV,W/2,H/2), z: p[2] }));

      // Plásmido backbone
      const pm = proj.slice(0, plasmid.length);
      ctx.beginPath();
      pm.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.strokeStyle = '#a855f755'; ctx.lineWidth = 1.8; ctx.stroke();

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const alpha = d.alpha || 0.9;
        const rad = d.r * d.d;
        const g = ctx.createRadialGradient(d.x-rad*.3, d.y-rad*.3, 0, d.x, d.y, rad);
        const hex = Math.round(alpha*220).toString(16).padStart(2,'0');
        g.addColorStop(0, d.c + hex); g.addColorStop(1, d.c + '11');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
      });

      // Etiquetas
      ctx.textAlign = 'center';
      ctx.font = 'bold 11px "Outfit", sans-serif';
      const lbPos = [[W/2-110, H-20], [W/2, H-20], [W/2+110, H-20]];
      const lbCol = ['#a855f7', '#06b6d4', '#10b981'];
      const lbTxt = ['Plásmido', 'AAV', 'Lentivirus'];
      lbPos.forEach((pos, i) => {
        ctx.fillStyle = lbCol[i]; ctx.fillText(lbTxt[i], pos[0], pos[1]);
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Plásmido — vector no viral' },
        { c: '#06b6d4', t: 'AAV — virus adeno-asociado' },
        { c: '#10b981', t: 'Lentivirus (VIH mod.)' },
        { c: '#f59e0b', t: 'Glicoproteínas de envoltura' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-5: CLONACIÓN — PCR + Transformación + Colonia
  ================================================================ */
  function drawCloning(canvas) {
    const ctx = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2, FOV = 640;
    const st = { rx: 0.2, ry: 0, auto: true };
    addDrag(canvas, () => st, v => Object.assign(st, v));

    // Dos hebras ADN separándose (desnaturalización PCR)
    const HELIX = [];
    const NB = 50;
    for (let i = 0; i < NB; i++) {
      const yy = -100 + i * 4, t2 = i / NB;
      const spread = 20 + t2 * 55; // se separan hacia abajo
      HELIX.push({ p: [-spread, yy, 0], c: '#a855f7', r: 4.5 });
      HELIX.push({ p: [ spread, yy, 0], c: '#06b6d4', r: 4.5 });
      if (i % 5 === 0 && t2 < 0.35) {
        HELIX.push({ p: [0, yy, 0], c: '#ffffff', r: 2.5 });
      }
    }

    // Primers (oligonucleótidos cortos)
    const PRIMER_F = [], PRIMER_R = [];
    for (let i = 0; i < 10; i++) {
      const yy = -100 + i * 4;
      PRIMER_F.push({ p: [-75 - i*3, yy + 100, 5], c: '#f59e0b', r: 4 });
      PRIMER_R.push({ p: [ 75 + i*3, yy + 100, -5], c: '#f59e0b', r: 4 });
    }

    // Taq Polimerasa
    const TAQ = spherePts(22, 40).map(p => ({ p: [p[0], p[1]+70, p[2]], c: '#ec4899', r: 3 }));

    // Nueva cadena sintetizada
    const NEW_STRAND = [];
    for (let i = 0; i < 30; i++) {
      const yy = -10 + i*4.5;
      NEW_STRAND.push({ p: [-20 - i*2.5, yy + 30, 8], c: '#10b981', r: 4 });
    }

    const ALL = [...HELIX, ...PRIMER_F, ...PRIMER_R, ...TAQ, ...NEW_STRAND];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.006;
      t += 0.016;

      // Taq anim
      const anim = ALL.map((pt, i) => {
        const base = ALL[i];
        if (pt === TAQ[0] || TAQ.includes(pt)) return { ...pt, p: [pt.p[0], pt.p[1] + Math.sin(t)*5, pt.p[2]] };
        return pt;
      });

      const rot  = rotate(anim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...anim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z: p[2] }));

      // Backbones
      const h1 = proj.slice(0, NB * 3).filter((_, i) => i % 3 === 0);
      const h2 = proj.slice(0, NB * 3).filter((_, i) => i % 3 === 1);
      [h1, h2].forEach((s, si) => {
        ctx.beginPath();
        s.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = (si === 0 ? '#a855f7' : '#06b6d4') + '40';
        ctx.lineWidth = 1.8; ctx.stroke();
      });

      // Nueva cadena
      const ns = proj.slice(ALL.length - NEW_STRAND.length);
      ctx.beginPath();
      ns.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = '#10b98165'; ctx.lineWidth = 2; ctx.stroke();

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        sphere3d(ctx, d.x, d.y, d.r * d.d, d.c);
      });

      legend(ctx, [
        { c: '#a855f7', t: 'Hebra molde 3\'→5\'' },
        { c: '#06b6d4', t: 'Hebra codificante 5\'→3\'' },
        { c: '#f59e0b', t: 'Primers (cebadores)' },
        { c: '#ec4899', t: 'Taq Polimerasa (94°C)' },
        { c: '#10b981', t: 'Nueva cadena sintetizada' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     TABS — lazy canvas init
  ================================================================ */
  function initTabs(canvasMap) {
    const btns   = $$('.ig-tab-btn');
    const panels = $$('.ig-panel');
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

  /* ================================================================
     CONTADORES
  ================================================================ */
  function initCounters() {
    const els = $$('[data-ig-count]');
    const io  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseFloat(el.dataset.igCount);
        const suf = el.dataset.igSuf || '', dec = +(el.dataset.igDec || 0), dur = 1600;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - prog, 3);
          el.textContent = (ease * target).toFixed(dec) + suf;
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ================================================================
     SCROLL REVEAL
  ================================================================ */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ig-revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('[data-ig-reveal]').forEach(el => io.observe(el));
  }

  /* ================================================================
     INIT
  ================================================================ */
  function init() {
    const canvasMap = {
      'ig-canvas-plasmid': drawPlasmid,
      'ig-canvas-crispr':  drawCRISPR,
      'ig-canvas-vectors': drawVectors,
      'ig-canvas-cloning': drawCloning,
    };
    initTabs(canvasMap);
    initCounters();
    initReveal();

    const hc = document.getElementById('ig-hero-canvas');
    if (hc) drawHero(hc);

    // Navbar
    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    // Mobile nav
    const toggle = document.getElementById('navToggle'), links = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  return { version: '1.0.0', module: 'IG-IngenieriaGenetica' };
})();