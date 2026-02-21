/* ============================================================
   CULTIVO-CELULAR.JS — PharmaLab Chile | Biotecnología Unidad 1
   Motor 3D Canvas 2D · Tabs · Contadores · Reveal
   ============================================================ */
'use strict';

const CC = (() => {

  /* ── Utilidades ── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ============================================================
     PROYECCIÓN / ROTACIÓN 3D
  ============================================================ */
  function project(x, y, z, fov, cx, cy) {
    const d = fov / (fov + z);
    return { x: cx + x * d, y: cy + y * d, d };
  }
  function rotate(pts, rx, ry) {
    return pts.map(([x, y, z]) => {
      const x1 =  x * Math.cos(ry) - z * Math.sin(ry);
      const z1 =  x * Math.sin(ry) + z * Math.cos(ry);
      const y1 =  y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 =  y * Math.sin(rx) + z1 * Math.cos(rx);
      return [x1, y1, z2];
    });
  }

  function initCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';
    return { ctx: canvas.getContext('2d'), W: canvas.width, H: canvas.height, dpr };
  }

  function addDrag(canvas, state) {
    canvas.addEventListener('mousedown', e => {
      state.drag = true; state.autoRot = false;
      state.lx = e.clientX; state.ly = e.clientY;
    });
    window.addEventListener('mousemove', e => {
      if (!state.drag) return;
      state.ry += (e.clientX - state.lx) * 0.009;
      state.rx += (e.clientY - state.ly) * 0.009;
      state.lx = e.clientX; state.ly = e.clientY;
    });
    window.addEventListener('mouseup', () => { state.drag = false; state.autoRot = true; });
    canvas.addEventListener('touchstart', e => {
      state.drag = true; state.autoRot = false;
      state.lx = e.touches[0].clientX; state.ly = e.touches[0].clientY;
    });
    canvas.addEventListener('touchmove', e => {
      if (!state.drag) return;
      e.preventDefault();
      state.ry += (e.touches[0].clientX - state.lx) * 0.01;
      state.rx += (e.touches[0].clientY - state.ly) * 0.01;
      state.lx = e.touches[0].clientX; state.ly = e.touches[0].clientY;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { state.drag = false; state.autoRot = true; });
  }

  function drawSphere(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.32, r * 0.05, x, y, r);
    g.addColorStop(0, color + 'ff');
    g.addColorStop(0.55, color + 'bb');
    g.addColorStop(1, color + '22');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  function drawGlow(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2);
    g.addColorStop(0, color + '30'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, Math.PI * 2); ctx.fill();
  }

  /* ============================================================
     HERO CANVAS: Célula eucariótica con orgánulos orbitantes
  ============================================================ */
  function drawHero(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 750;
    const state = { rx: 0.2, ry: 0, drag: false, autoRot: true, lx: 0, ly: 0 };
    addDrag(canvas, state);

    // Membrana plasmática: esfera grande exterior translúcida
    const MEMBRANA_PTS = [];
    for (let i = 0; i < 160; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 160);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 160;
      MEMBRANA_PTS.push([
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.sin(phi) * Math.sin(theta),
        R * Math.cos(phi)
      ]);
    }

    // Núcleo central
    const NUCLEO_PTS = [];
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 60);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 52;
      NUCLEO_PTS.push([
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.sin(phi) * Math.sin(theta),
        R * Math.cos(phi)
      ]);
    }

    // Nucléolo (dentro del núcleo)
    const NUCLEOLO_PTS = [];
    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 20);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 22;
      NUCLEOLO_PTS.push([R * Math.sin(phi) * Math.cos(theta), R * Math.sin(phi) * Math.sin(theta), R * Math.cos(phi)]);
    }

    // Mitocondrias (6 instancias orbitando)
    const MITO_COUNT = 6;
    // Retículo endoplásmico rugoso (partículas dispuestas en arco)
    const RER_PTS = [];
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 1.6 - 0.8;
      const r = 110;
      RER_PTS.push([r * Math.cos(a), r * Math.sin(a) * 0.5, r * Math.sin(a) * 0.7]);
    }

    // Aparato de Golgi (apilamiento)
    const GOLGI_PTS = [];
    for (let g = 0; g < 4; g++) {
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const r = 30 + g * 8;
        GOLGI_PTS.push([r * Math.cos(a) - 100, r * Math.sin(a) * 0.25 + 60, r * Math.sin(a) * 0.4]);
      }
    }

    // Vesículas flotantes
    const VESICULAS = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      const r = 95 + Math.sin(i * 2.3) * 25;
      return {
        pos: [r * Math.cos(a), r * Math.sin(a) * 0.6, r * Math.sin(a) * 0.8],
        speed: 0.006 + i * 0.001,
        phase: (i / 14) * Math.PI * 2,
        orbitR: r,
        orbitA: a
      };
    });

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (state.autoRot) state.ry += 0.005;
      t += 0.016;

      const allPts = [];

      // Membrana plasmática
      MEMBRANA_PTS.forEach(p => allPts.push({ pos: p, color: '#06b6d4', r: 3.5, layer: 'membrana' }));

      // Núcleo
      NUCLEO_PTS.forEach(p => allPts.push({ pos: p, color: '#8b5cf6', r: 5.5, layer: 'nucleo' }));

      // Nucléolo
      NUCLEOLO_PTS.forEach(p => allPts.push({ pos: p, color: '#f43f5e', r: 6, layer: 'nucleolo' }));

      // RER
      RER_PTS.forEach(p => allPts.push({ pos: p, color: '#f59e0b', r: 5, layer: 'rer' }));

      // Golgi
      GOLGI_PTS.forEach(p => allPts.push({ pos: p, color: '#84cc16', r: 4.5, layer: 'golgi' }));

      // Mitocondrias (orbitando)
      for (let i = 0; i < MITO_COUNT; i++) {
        const a = (i / MITO_COUNT) * Math.PI * 2 + t * 0.015;
        const tilt = i * 1.04;
        const orR = 125;
        const mx = orR * Math.cos(a);
        const my = orR * Math.sin(a) * Math.cos(tilt) * 0.4;
        const mz = orR * Math.sin(a) * Math.sin(tilt);
        // Body of mitochondria (elongated: 3 pts)
        for (let k = -1; k <= 1; k++) {
          allPts.push({ pos: [mx + k * 10 * Math.cos(a + Math.PI / 2), my + k * 4, mz + k * 6], color: '#22d3ee', r: 8, label: k === 0 ? 'Mit.' : '', layer: 'mito' });
        }
      }

      // Vesículas (orbitando lentamente)
      VESICULAS.forEach(v => {
        v.orbitA += v.speed;
        const vx = v.orbitR * Math.cos(v.orbitA);
        const vy = v.orbitR * Math.sin(v.orbitA) * 0.5;
        const vz = v.orbitR * Math.sin(v.orbitA) * 0.65;
        allPts.push({ pos: [vx, vy, vz], color: '#34d399', r: 7.5, layer: 'vesicula' });
      });

      const rotated = rotate(allPts.map(p => p.pos), state.rx, state.ry);
      const proj = rotated.map((p, i) => {
        const pr = project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...allPts[i], z: p[2] };
      });

      // Ordenar por z
      const sorted = [...proj].sort((a, b) => a.z - b.z);

      sorted.forEach(d => {
        const sc  = d.d;
        const rad = (d.r || 4) * sc;
        if (rad < 0.5) return;

        // Transparencia por capa
        let alpha = 1;
        if (d.layer === 'membrana') { ctx.globalAlpha = 0.18; }
        else if (d.layer === 'nucleo') { ctx.globalAlpha = 0.55; }
        else { ctx.globalAlpha = 0.90; }

        drawGlow(ctx, d.x, d.y, rad, d.color);
        drawSphere(ctx, d.x, d.y, rad, d.color);

        if (d.label) {
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.font = `bold ${Math.max(6, 9 * sc)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(d.label, d.x, d.y);
        }
        ctx.globalAlpha = 1;
      });

      // Leyenda
      const leg = [
        { c: '#06b6d4', l: 'Membrana Plasmática' },
        { c: '#8b5cf6', l: 'Núcleo' },
        { c: '#f43f5e', l: 'Nucléolo' },
        { c: '#22d3ee', l: 'Mitocondria' },
        { c: '#f59e0b', l: 'RE Rugoso' },
        { c: '#84cc16', l: 'Aparato de Golgi' },
        { c: '#34d399', l: 'Vesículas' },
      ];
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      leg.forEach((l, i) => {
        ctx.globalAlpha = 0.85;
        drawSphere(ctx, 13, 15 + i * 20, 5.5, l.c);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(l.l, 26, 19 + i * 20);
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS FUNDAMENTOS: Célula con orgánulos + ribosomas
  ============================================================ */
  function drawFundamentos(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const state = { rx: 0.18, ry: 0, drag: false, autoRot: true, lx: 0, ly: 0 };
    addDrag(canvas, state);

    // Citoplasma: muchos ribosomas pequeños
    const RIBOSOMAS = [];
    for (let i = 0; i < 80; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 70 + Math.random() * 75;
      RIBOSOMAS.push([
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi) * 0.8,
        r * Math.cos(theta)
      ]);
    }

    // Membrana nuclear (puntos en esfera)
    const MEM_NUC = [];
    for (let i = 0; i < 50; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 50);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 48;
      MEM_NUC.push([R * Math.sin(phi) * Math.cos(theta), R * Math.sin(phi) * Math.sin(theta), R * Math.cos(phi)]);
    }

    // Cromatina dentro del núcleo (espiral de ADN simplificada)
    const CROMATINA = [];
    for (let i = 0; i < 40; i++) {
      const t2 = (i / 40) * Math.PI * 6;
      const r = 18 + Math.sin(t2 * 0.5) * 12;
      CROMATINA.push([r * Math.cos(t2) * 0.8, r * Math.sin(t2) * 0.4, t2 * 2.5 - 20]);
    }

    // Poros nucleares
    const POROS = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      POROS.push([48 * Math.cos(a), 5, 48 * Math.sin(a)]);
    }

    // Membrana plasmática exterior (difusa)
    const MEM_EXT = [];
    for (let i = 0; i < 90; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 90);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 135;
      MEM_EXT.push([R * Math.sin(phi) * Math.cos(theta), R * Math.sin(phi) * Math.sin(theta), R * Math.cos(phi)]);
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (state.autoRot) state.ry += 0.007;
      t += 0.018;

      const allPts = [];

      // Membrana ext
      MEM_EXT.forEach(p => allPts.push({ pos: p, color: '#06b6d4', r: 3, alpha: 0.15 }));

      // Ribosomas
      RIBOSOMAS.forEach(p => allPts.push({ pos: p, color: '#f59e0b', r: 3.5, alpha: 0.7 }));

      // Mem nuclear
      MEM_NUC.forEach(p => allPts.push({ pos: p, color: '#8b5cf6', r: 4, alpha: 0.55 }));

      // Cromatina (ADN)
      CROMATINA.forEach(p => allPts.push({ pos: p, color: '#f43f5e', r: 5, alpha: 0.9 }));

      // Poros nucleares (animados pulsando)
      POROS.forEach((p, i) => {
        const pRadio = 6 + Math.sin(t * 2 + i) * 2;
        allPts.push({ pos: p, color: '#67e8f9', r: pRadio, label: 'P', alpha: 0.85 });
      });

      // mRNA saliendo (partículas que se mueven hacia afuera)
      for (let i = 0; i < 4; i++) {
        const progress = ((t * 0.3 + i * 0.25) % 1);
        const angle = (i / 4) * Math.PI * 2;
        const r = 48 + progress * 80;
        const mx = r * Math.cos(angle);
        const my = r * Math.sin(angle) * 0.3 + 5;
        const mz = r * Math.sin(angle) * 0.5;
        allPts.push({ pos: [mx, my, mz], color: '#bef264', r: 4 * (1 - progress * 0.5), label: '', alpha: 1 - progress * 0.4 });
      }

      const rotated = rotate(allPts.map(p => p.pos), state.rx, state.ry);
      const proj = rotated.map((p, i) => {
        const pr = project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...allPts[i], z: p[2] };
      });

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const sc  = d.d;
        const rad = (d.r || 3) * sc;
        if (rad < 0.4) return;
        ctx.globalAlpha = d.alpha || 0.85;
        drawGlow(ctx, d.x, d.y, rad, d.color);
        drawSphere(ctx, d.x, d.y, rad, d.color);
        if (d.label) {
          ctx.fillStyle = 'rgba(255,255,255,0.88)';
          ctx.font = `bold ${Math.max(5, 7 * sc)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(d.label, d.x, d.y);
        }
        ctx.globalAlpha = 1;
      });

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(6,182,212,0.65)';
      ctx.fillText('Transcripción y Transporte Nuclear', CX, H - 11);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS TIPOS DE CULTIVO: Esferoide 3D con capas y gradiente O₂
  ============================================================ */
  function drawTiposCultivo(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 620;
    const state = { rx: 0.15, ry: 0, drag: false, autoRot: true, lx: 0, ly: 0 };
    addDrag(canvas, state);

    // Células en 3 capas del esferoide
    const CAPAS = [
      // Capa externa: proliferativa (verde brillante, alta O₂)
      { cells: genSphereLayer(100, 90, 120), color: '#84cc16', r: 9, label: '', alpha: 0.9, name: 'Proliferativa' },
      // Capa media: quiescente (amarillo, O₂ medio)
      { cells: genSphereLayer(60, 55, 85), color: '#f59e0b', r: 9, label: '', alpha: 0.85, name: 'Quiescente' },
      // Núcleo necrótico (rojo oscuro, sin O₂)
      { cells: genSphereLayer(25, 0, 48), color: '#f43f5e', r: 9, label: '', alpha: 0.8, name: 'Necrótica' },
    ];

    function genSphereLayer(n, rMin, rMax) {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / n);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = rMin + Math.random() * (rMax - rMin);
        pts.push([
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ]);
      }
      return pts;
    }

    // Moléculas de O₂ difundiéndose hacia adentro
    const O2_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
      angle: (i / 20) * Math.PI * 2,
      r: 150 + Math.random() * 20,
      speed: -(0.003 + Math.random() * 0.003),
      phase: Math.random() * Math.PI * 2,
      active: true,
    }));

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (state.autoRot) state.ry += 0.006;
      t += 0.016;

      // Gradiente de fondo representando O₂
      const bgGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, 200);
      bgGrad.addColorStop(0, 'rgba(244,63,94,0.03)');
      bgGrad.addColorStop(0.5, 'rgba(245,158,11,0.03)');
      bgGrad.addColorStop(1, 'rgba(132,204,22,0.04)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const allPts = [];

      // Partículas O₂
      O2_PARTICLES.forEach(p => {
        p.r += p.speed;
        if (p.r < 30) { p.r = 150; p.angle = Math.random() * Math.PI * 2; }
        const ox = p.r * Math.cos(p.angle);
        const oy = p.r * Math.sin(p.angle) * 0.3;
        const oz = p.r * Math.sin(p.angle) * 0.7;
        const oAlpha = Math.max(0, (p.r - 30) / 120);
        allPts.push({ pos: [ox, oy, oz], color: '#67e8f9', r: 4, alpha: oAlpha * 0.7, label: 'O₂' });
      });

      // Células por capa
      CAPAS.forEach((capa, ci) => {
        capa.cells.forEach(p => {
          // Animación sutil de cada célula
          const wobble = Math.sin(t * 0.8 + p[0] * 0.05) * 2;
          allPts.push({
            pos: [p[0], p[1] + wobble * 0.3, p[2]],
            color: capa.color, r: capa.r,
            alpha: capa.alpha, layer: ci
          });
        });
      });

      const rotated = rotate(allPts.map(p => p.pos), state.rx, state.ry);
      const proj = rotated.map((p, i) => {
        const pr = project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...allPts[i], z: p[2] };
      });

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const sc  = d.d;
        const rad = (d.r || 4) * sc;
        if (rad < 0.4) return;
        ctx.globalAlpha = d.alpha || 0.85;
        drawGlow(ctx, d.x, d.y, rad, d.color);
        drawSphere(ctx, d.x, d.y, rad, d.color);
        if (d.label) {
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.font = `${Math.max(6, 7 * sc)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(d.label, d.x, d.y);
        }
        ctx.globalAlpha = 1;
      });

      // Leyenda capas
      const leg = [
        { c: '#84cc16', l: 'Zona Proliferativa (alta O₂)' },
        { c: '#f59e0b', l: 'Zona Quiescente (O₂ medio)' },
        { c: '#f43f5e', l: 'Núcleo Necrótico (hipoxia)' },
        { c: '#67e8f9', l: 'Difusión O₂ → interior' },
      ];
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      leg.forEach((l, i) => {
        ctx.globalAlpha = 0.85;
        drawSphere(ctx, 12, 13 + i * 19, 5, l.c);
        ctx.fillStyle = 'rgba(255,255,255,0.42)';
        ctx.fillText(l.l, 24, 17 + i * 19);
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS TIPOS DE CÉLULAS: Diferenciación de célula madre
  ============================================================ */
  function drawTiposCelulas(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2;

    // Árbol de diferenciación
    // Nodo central: célula madre pluripotente (iPSC/ESC)
    // 4 ramas hacia linajes: Neuronal, Cardíaco, Hepático, Hematopoyético

    const LINAJES = [
      { angle: -Math.PI * 0.75, color: '#8b5cf6', label: 'Neurona', icon: '🧠', dist: 170 },
      { angle: -Math.PI * 0.25, color: '#f43f5e', label: 'Cardiomiocito', icon: '❤️', dist: 170 },
      { angle:  Math.PI * 0.25, color: '#f59e0b', label: 'Hepatocito', icon: '🫀', dist: 170 },
      { angle:  Math.PI * 0.75, color: '#84cc16', label: 'Eritrocito', icon: '🩸', dist: 170 },
    ];

    // Partículas del proceso de diferenciación
    const PARTICLES = LINAJES.map((lin, li) => {
      return Array.from({ length: 8 }, (_, i) => ({
        progress: (i / 8) + li * 0.125,
        linaje: li,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.003,
        size: 4 + Math.random() * 3,
      }));
    }).flat();

    // Satélites orbitando célula madre central
    const SATS = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      r: 38,
      speed: 0.02 + i * 0.002,
      color: `hsl(${180 + i * 15}, 80%, 65%)`,
    }));

    let t = 0;
    let cycleTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      cycleTimer = (cycleTimer + 0.005) % 1;

      // Dibujar conexiones (axones/dendritas del árbol)
      LINAJES.forEach(lin => {
        const ex = CX + Math.cos(lin.angle) * lin.dist;
        const ey = CY + Math.sin(lin.angle) * lin.dist;

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + lin.angle);
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(ex, ey);
        const grad = ctx.createLinearGradient(CX, CY, ex, ey);
        grad.addColorStop(0, `rgba(6,182,212,${pulse * 0.6})`);
        grad.addColorStop(1, lin.color + Math.round(pulse * 150).toString(16).padStart(2, '0'));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Células madre satélites (orbitando central)
      SATS.forEach(s => {
        s.angle += s.speed;
        const sx = CX + s.r * Math.cos(s.angle);
        const sy = CY + s.r * Math.sin(s.angle) * 0.5;
        ctx.globalAlpha = 0.55;
        drawGlow(ctx, sx, sy, 6, s.color);
        drawSphere(ctx, sx, sy, 6, s.color);
        ctx.globalAlpha = 1;
      });

      // Nodo central: célula pluripotente
      const centralPulse = 1 + 0.12 * Math.sin(t * 1.8);
      drawGlow(ctx, CX, CY, 30 * centralPulse, '#06b6d4');
      drawSphere(ctx, CX, CY, 28 * centralPulse, '#06b6d4');

      // Label central
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.font = 'bold 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('iPSC', CX, CY - 4);
      ctx.font = '7px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(103,232,249,0.8)';
      ctx.fillText('Pluripotente', CX, CY + 6);

      // Partículas viajando hacia linajes
      PARTICLES.forEach(p => {
        p.progress = (p.progress + p.speed) % 1;
        const lin = LINAJES[p.linaje];
        const ex = Math.cos(lin.angle) * lin.dist;
        const ey = Math.sin(lin.angle) * lin.dist;
        const px = CX + ex * p.progress + Math.sin(p.phase + t) * 6;
        const py = CY + ey * p.progress + Math.cos(p.phase + t * 0.8) * 4;
        // Color blend: from cyan (center) to linaje color
        const interp = p.progress;
        const alpha = Math.sin(p.progress * Math.PI) * 0.9;
        ctx.globalAlpha = alpha;
        drawGlow(ctx, px, py, p.size, lin.color);
        drawSphere(ctx, px, py, p.size, lin.color);
        ctx.globalAlpha = 1;
      });

      // Nodos de linaje
      LINAJES.forEach(lin => {
        const ex = CX + Math.cos(lin.angle) * lin.dist;
        const ey = CY + Math.sin(lin.angle) * lin.dist;

        const pulse2 = 1 + 0.1 * Math.sin(t * 1.5 + lin.angle * 2);
        drawGlow(ctx, ex, ey, 22 * pulse2, lin.color);
        drawSphere(ctx, ex, ey, 20 * pulse2, lin.color);

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(lin.label, ex, ey - 3);

        // Etiqueta debajo del nodo
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';

        let offsetY = 32;
        if (lin.angle < 0) offsetY = -32;
        ctx.fillText(lin.label, ex, ey + offsetY);
      });

      // Texto en el borde
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(132,204,22,0.65)';
      ctx.fillText('Oct4 · Sox2 · Klf4 · c-Myc (Yamanaka, 2006)', CX, H - 11);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     SISTEMA DE TABS
  ============================================================ */
  function initTabs() {
    const pills  = $$('.cc-tema-pill');
    const panels = $$('.cc-panel');
    const inited = new Set();

    const canvasDrawers = {
      'cc-c-fund':    drawFundamentos,
      'cc-c-tipos':   drawTiposCultivo,
      'cc-c-celulas': drawTiposCelulas,
    };

    function initPanel(idx) {
      if (inited.has(idx)) return;
      inited.add(idx);
      Object.entries(canvasDrawers).forEach(([id, fn]) => {
        const c = document.getElementById(id);
        if (c && panels[idx] && panels[idx].contains(c)) {
          requestAnimationFrame(() => fn(c));
        }
      });
    }

    function activate(idx) {
      pills.forEach((p, i)  => p.classList.toggle('active', i === idx));
      panels.forEach((p, i) => p.classList.toggle('active', i === idx));
      initPanel(idx);
    }

    pills.forEach((pill, i) => pill.addEventListener('click', () => activate(i)));
    activate(0);
  }

  /* ============================================================
     CONTADORES ANIMADOS
  ============================================================ */
  function initCounters() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = parseFloat(el.dataset.ccCount);
        const suffix = el.dataset.ccSuffix || '';
        const dec    = parseInt(el.dataset.ccDec || 0);
        const dur    = 1800;
        const start  = performance.now();
        function tick(now) {
          const prog  = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          el.textContent = (eased * target).toFixed(dec) + suffix;
          if (prog < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-cc-count]').forEach(c => io.observe(c));
  }

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('cc-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
    $$('[data-cc-reveal]').forEach(el => io.observe(el));
  }

  /* ============================================================
     NAVBAR
  ============================================================ */
  function initNav() {
    const navbar = document.getElementById('cc-navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    initNav();
    initTabs();
    initCounters();
    initReveal();

    // Hero canvas
    const heroCanvas = document.getElementById('cc-hero-canvas');
    if (heroCanvas) drawHero(heroCanvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { version: '1.0.0', module: 'CC-CultivoCelular' };
})();
