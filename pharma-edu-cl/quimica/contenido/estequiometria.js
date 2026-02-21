/* ============================================================
   ESTEQUIOMETRIA.JS — PharmaLab Chile | Química Unidad 3
   Motor 3D Canvas 2D · Tabs · Contadores · Reveal
   ============================================================ */
'use strict';

const EQ = (() => {

  /* ── Utilidades ── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ============================================================
     PROYECCIÓN / ROTACIÓN 3D (Canvas 2D lightweight)
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
  function spherePts(r, n) {
    const pts = [], phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const ra = Math.sqrt(1 - y * y);
      const th = phi * i;
      pts.push([r * ra * Math.cos(th), r * y, r * ra * Math.sin(th)]);
    }
    return pts;
  }

  /* ── Helpers canvas ── */
  function initCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.clientWidth  * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';
    return { ctx: canvas.getContext('2d'), W: canvas.width, H: canvas.height, dpr };
  }
  function addDrag(canvas, state) {
    canvas.addEventListener('mousedown', e => { state.drag = true; state.autoRot = false; state.lx = e.clientX; state.ly = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!state.drag) return;
      state.ry += (e.clientX - state.lx) * 0.009;
      state.rx += (e.clientY - state.ly) * 0.009;
      state.lx = e.clientX; state.ly = e.clientY;
    });
    window.addEventListener('mouseup', () => { state.drag = false; state.autoRot = true; });
    canvas.addEventListener('touchstart', e => { state.drag = true; state.autoRot = false; state.lx = e.touches[0].clientX; state.ly = e.touches[0].clientY; });
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
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  function drawGlow(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
    g.addColorStop(0, color + '28');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ============================================================
     HERO CANVAS: BALANZA MOLECULAR 3D + ÁTOMOS
  ============================================================ */
  function drawHero(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 700;
    const state = { rx: 0.15, ry: 0, drag: false, autoRot: true, lx: 0, ly: 0 };
    addDrag(canvas, state);

    // Estructura balanza: base + brazo horizontal + platillos
    const BALANZA_BASE = [];
    // Poste vertical
    for (let i = 0; i < 20; i++) {
      const y = -80 + i * 10;
      BALANZA_BASE.push({ pos: [0, y, 0], color: '#f59e0b', r: 5 });
    }
    // Brazo horizontal
    for (let i = 0; i < 24; i++) {
      const x = -110 + i * 10;
      BALANZA_BASE.push({ pos: [x, -80, 0], color: '#fcd34d', r: 4 });
    }
    // Cadena izquierda
    for (let i = 0; i < 8; i++) {
      BALANZA_BASE.push({ pos: [-110, -80 + i * 9, 0], color: '#f59e0b', r: 3 });
    }
    // Cadena derecha
    for (let i = 0; i < 8; i++) {
      BALANZA_BASE.push({ pos: [110, -80 + i * 9, 0], color: '#f59e0b', r: 3 });
    }

    // Átomos en platillos (izq: C H H H = CH3  |  der: O H = OH)
    const LEFT_ATOMS = [
      { pos: [-110, -8, 0],  color: '#888', r: 16, label: 'C', mass: 12 },
      { pos: [-140, 8, -8],  color: '#fff', r: 10, label: 'H', mass: 1  },
      { pos: [-80,  8, -8],  color: '#fff', r: 10, label: 'H', mass: 1  },
      { pos: [-110, 16, 14], color: '#fff', r: 10, label: 'H', mass: 1  },
    ];
    const RIGHT_ATOMS = [
      { pos: [110, -10, 0],  color: '#ff4444', r: 14, label: 'O', mass: 16 },
      { pos: [138, 8, 0],    color: '#fff',    r: 10, label: 'H', mass: 1  },
    ];

    // Electrones orbitando
    const ELECTRONS = [];
    for (let i = 0; i < 6; i++) {
      ELECTRONS.push({ phase: (i / 6) * Math.PI * 2, orbitR: 28 + (i % 2) * 14, speed: 0.04 + i * 0.008, axis: i % 3, color: '#38bdf8' });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (state.autoRot) state.ry += 0.006;
      t += 0.02;

      // Balanza oscilante sutil
      const tilt = Math.sin(t * 0.4) * 0.08;

      // Combinar todos los puntos
      const allPts = [
        ...BALANZA_BASE.map(p => ({ ...p })),
        ...LEFT_ATOMS.map(p => ({ ...p })),
        ...RIGHT_ATOMS.map(p => ({ ...p })),
      ];

      // Electrones animados alrededor de C
      ELECTRONS.forEach(e => {
        const a = e.phase + t * e.speed;
        let x = -110 + e.orbitR * Math.cos(a);
        let y = -8   + e.orbitR * Math.sin(a) * 0.4;
        let z = e.orbitR * Math.sin(a) * 0.8;
        allPts.push({ pos: [x, y, z], color: e.color, r: 3.5 });
      });

      const rotated = rotate(allPts.map(p => p.pos || [0,0,0]), state.rx + tilt, state.ry);
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
        drawGlow(ctx, d.x, d.y, rad, d.color);
        drawSphere(ctx, d.x, d.y, rad, d.color);
        if (d.label) {
          ctx.fillStyle = 'rgba(255,255,255,0.92)';
          ctx.font = `bold ${Math.max(7, 11 * sc)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(d.label, d.x, d.y);
        }
      });

      // Masa izquierda = 15 (CH₃) | derecha = 17 (OH)
      const leftProj  = proj[BALANZA_BASE.length];
      const rightProj = proj[BALANZA_BASE.length + LEFT_ATOMS.length];
      if (leftProj && rightProj) {
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fcd34d99';
        ctx.fillText('15 u.m.a.', leftProj.x, leftProj.y + 26 * leftProj.d);
        ctx.fillStyle = '#34d39999';
        ctx.fillText('17 u.m.a.', rightProj.x, rightProj.y + 24 * rightProj.d);
      }

      // Leyenda
      const leg = [
        { c: '#888',    l: 'Carbono (12 u)' },
        { c: '#fff',    l: 'Hidrógeno (1 u)' },
        { c: '#ff4444', l: 'Oxígeno (16 u)' },
        { c: '#38bdf8', l: 'Electrón' },
      ];
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      leg.forEach((l, i) => {
        drawSphere(ctx, 12, 14 + i * 19, 5, l.c);
        ctx.fillStyle = 'rgba(255,255,255,0.42)';
        ctx.fillText(l.l, 24, 18 + i * 19);
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS MOL Y MASAS: Átomo con electrones en órbitas
  ============================================================ */
  function drawMolMasas(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 600;
    const state = { rx: 0.2, ry: 0, drag: false, autoRot: true, lx: 0, ly: 0 };
    addDrag(canvas, state);

    // Núcleo: protones y neutrones
    const NUCLEO = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      NUCLEO.push({ pos: [12 * Math.cos(a), 12 * Math.sin(a), (i % 2 === 0 ? 4 : -4)], color: '#ef4444', r: 9, label: 'p+' });
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.5;
      NUCLEO.push({ pos: [10 * Math.cos(a), 10 * Math.sin(a), (i % 2 === 0 ? -4 : 4)], color: '#94a3b8', r: 9, label: 'n' });
    }

    // Órbitas y electrones
    const ORBITS = [
      { r: 55, n: 2,  tilt: 0,    color: '#f59e0b', speed: 0.04 },
      { r: 90, n: 6,  tilt: 1.05, color: '#38bdf8', speed: 0.025 },
      { r: 125, n: 4, tilt: 2.09, color: '#34d399', speed: 0.016 },
    ];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (state.autoRot) state.ry += 0.007;
      t += 0.016;

      const allPts = [...NUCLEO.map(p => ({ ...p }))];

      // Añadir electrones dinámicos
      ORBITS.forEach(orb => {
        for (let i = 0; i < orb.n; i++) {
          const a = (i / orb.n) * Math.PI * 2 + t * orb.speed;
          const x = orb.r * Math.cos(a);
          const y = orb.r * Math.sin(a) * Math.cos(orb.tilt);
          const z = orb.r * Math.sin(a) * Math.sin(orb.tilt);
          allPts.push({ pos: [x, y, z], color: orb.color, r: 5, label: 'e⁻' });
        }
      });

      const rotated = rotate(allPts.map(p => p.pos), state.rx, state.ry);
      const proj = rotated.map((p, i) => {
        const pr = project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...allPts[i], z: p[2] };
      });

      // Dibujar trayectorias de órbita
      ORBITS.forEach(orb => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const x = orb.r * Math.cos(a);
          const y = orb.r * Math.sin(a) * Math.cos(orb.tilt);
          const z = orb.r * Math.sin(a) * Math.sin(orb.tilt);
          const rr = rotate([[x, y, z]], state.rx, state.ry)[0];
          const pr = project(rr[0], rr[1], rr[2], FOV, CX, CY);
          a === 0 ? ctx.moveTo(pr.x, pr.y) : ctx.lineTo(pr.x, pr.y);
        }
        ctx.strokeStyle = orb.color + '28';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Ordenar y dibujar
      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const sc  = d.d;
        const rad = d.r * sc;
        drawGlow(ctx, d.x, d.y, rad, d.color);
        drawSphere(ctx, d.x, d.y, rad, d.color);
        if (d.label && d.r >= 8) {
          ctx.fillStyle = 'rgba(255,255,255,0.88)';
          ctx.font = `bold ${Math.max(6, 8 * sc)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(d.label, d.x, d.y);
        }
      });

      // Etiquetas Avogadro
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(245,158,11,0.7)';
      ctx.fillText('1 mol = 6.022 × 10²³ átomos', CX, H - 12);

      // Leyenda
      const leg = [
        { c: '#ef4444', l: 'Protón (p+)' },
        { c: '#94a3b8', l: 'Neutrón (n)' },
        { c: '#f59e0b', l: 'Electrón 1s²' },
        { c: '#38bdf8', l: 'Electrón 2s²2p⁶' },
        { c: '#34d399', l: 'Electrón 3s²3p⁶' },
      ];
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      leg.forEach((l, i) => {
        drawSphere(ctx, 11, 13 + i * 17, 4.5, l.c);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(l.l, 22, 17 + i * 17);
      });
      draw._raf = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS CONCENTRACIONES: Solución con partículas disueltas
  ============================================================ */
  function drawConcentraciones(canvas) {
    const { ctx, W, H } = initCanvas(canvas);

    const COLORS = ['#f59e0b', '#38bdf8', '#ef4444', '#34d399', '#a78bfa'];

    // Partículas de soluto
    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      r: 4 + Math.random() * 6,
      color: COLORS[i % COLORS.length],
      phase: Math.random() * Math.PI * 2,
    }));

    // Partículas solvente (agua, más pequeñas y translucidas)
    const water = Array.from({ length: 200 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 2.5,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Fondo gradiente de solución
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, 'rgba(16,185,129,0.06)');
      bg.addColorStop(1, 'rgba(16,185,129,0.02)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      t += 0.015;

      // Dibujar agua
      water.forEach(p => {
        p.x += p.vx + Math.sin(t + p.phase) * 0.3;
        p.y += p.vy + Math.cos(t + p.phase * 1.3) * 0.3;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf820';
        ctx.fill();
      });

      // Dibujar soluto
      particles.forEach(p => {
        p.x += p.vx + Math.sin(t * 0.8 + p.phase) * 0.5;
        p.y += p.vy + Math.cos(t * 0.8 + p.phase * 1.2) * 0.5;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        const glow = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, 0, p.x, p.y, p.r * 2.5);
        glow.addColorStop(0, p.color + '30');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        drawSphere(ctx, p.x, p.y, p.r, p.color);
      });

      // Texto superpuesto
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(245,158,11,0.75)';
      ctx.textAlign = 'center';
      ctx.fillText('M = n(mol) / V(L)', CX || W / 2, H - 12);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS DILUCIONES: Visualización progresiva C₁V₁ = C₂V₂
  ============================================================ */
  function drawDiluciones(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2;

    // 4 vasos con concentración decreciente
    const VASOS = [
      { x: W * 0.12, conc: 1.0, color: '#ef4444', label: 'C₁' },
      { x: W * 0.37, conc: 0.5, color: '#f59e0b', label: 'C₁/2' },
      { x: W * 0.63, conc: 0.25, color: '#34d399', label: 'C₁/4' },
      { x: W * 0.88, conc: 0.125, color: '#38bdf8', label: 'C₁/8' },
    ];
    const VASO_W = W * 0.13, VASO_H = H * 0.55, VASO_Y = H * 0.2;

    // Partículas por vaso
    const vasoParticles = VASOS.map(v => {
      const n = Math.round(v.conc * 60);
      return Array.from({ length: n }, () => ({
        x: v.x - VASO_W / 2 + VASO_W * 0.1 + Math.random() * VASO_W * 0.8,
        y: VASO_Y + VASO_H * 0.1 + Math.random() * VASO_H * 0.85,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        r: 3.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      }));
    });

    // Flechas entre vasos
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // Dibujar vasos
      VASOS.forEach((v, vi) => {
        const vx = v.x - VASO_W / 2;

        // Sombra vaso
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(vx + 4, VASO_Y + 4, VASO_W, VASO_H);

        // Cuerpo vaso
        ctx.fillStyle = 'rgba(10,20,40,0.85)';
        ctx.strokeStyle = v.color + '55';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(vx, VASO_Y, VASO_W, VASO_H, 4);
        ctx.fill();
        ctx.stroke();

        // Liquid fill
        const fillH = VASO_H * 0.88;
        const grad = ctx.createLinearGradient(vx, VASO_Y + VASO_H - fillH, vx, VASO_Y + VASO_H);
        grad.addColorStop(0, v.color + Math.round(v.conc * 60).toString(16).padStart(2,'0'));
        grad.addColorStop(1, v.color + '08');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(vx + 2, VASO_Y + VASO_H - fillH, VASO_W - 4, fillH - 2, [0, 0, 4, 4]);
        ctx.fill();

        // Partículas
        vasoParticles[vi].forEach(p => {
          p.x += p.vx + Math.sin(t + p.phase) * 0.4;
          p.y += p.vy + Math.cos(t + p.phase * 1.3) * 0.3;
          // Rebotar en paredes del vaso
          if (p.x < vx + p.r + 3) { p.x = vx + p.r + 3; p.vx *= -1; }
          if (p.x > vx + VASO_W - p.r - 3) { p.x = vx + VASO_W - p.r - 3; p.vx *= -1; }
          if (p.y < VASO_Y + p.r + 5) { p.y = VASO_Y + p.r + 5; p.vy *= -1; }
          if (p.y > VASO_Y + VASO_H - p.r - 5) { p.y = VASO_Y + VASO_H - p.r - 5; p.vy *= -1; }
          drawSphere(ctx, p.x, p.y, p.r, v.color);
        });

        // Etiqueta concentración
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.min(13, W * 0.013)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = v.color;
        ctx.fillText(v.label, v.x, VASO_Y - 10);

        const concPct = Math.round(v.conc * 100);
        ctx.font = `${Math.min(10, W * 0.01)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(concPct + '%', v.x, VASO_Y + VASO_H + 16);
      });

      // Flechas animadas
      for (let i = 0; i < VASOS.length - 1; i++) {
        const ax = VASOS[i].x + VASO_W / 2 + 4;
        const bx = VASOS[i + 1].x - VASO_W / 2 - 4;
        const ay = VASO_Y + VASO_H * 0.5;
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + i);

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx - 8, ay);
        ctx.strokeStyle = `rgba(245,158,11,${pulse * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Cabeza de flecha
        ctx.beginPath();
        ctx.moveTo(bx, ay);
        ctx.lineTo(bx - 9, ay - 5);
        ctx.lineTo(bx - 9, ay + 5);
        ctx.closePath();
        ctx.fillStyle = `rgba(245,158,11,${pulse * 0.7})`;
        ctx.fill();

        // Etiqueta "÷2"
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(245,158,11,0.6)';
        ctx.textAlign = 'center';
        ctx.fillText('÷2', (ax + bx) / 2, ay - 10);
      }

      // Fórmula
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(245,158,11,0.8)';
      ctx.fillText('C₁V₁ = C₂V₂', CX, H - 10);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     CANVAS RENDIMIENTO: Reactivos → Productos + reactivo limitante
  ============================================================ */
  function drawRendimiento(canvas) {
    const { ctx, W, H } = initCanvas(canvas);
    const CX = W / 2, CY = H / 2;

    // Reactivo A (azul, EXCESO): muchas moléculas
    const REACT_A = Array.from({ length: 12 }, (_, i) => ({
      x: W * 0.12 + (i % 4) * 28,
      y: CY - 40 + Math.floor(i / 4) * 30,
      color: '#38bdf8', r: 10, label: 'A', consumed: false,
    }));

    // Reactivo B (rojo, LIMITANTE): pocas moléculas
    const REACT_B = Array.from({ length: 4 }, (_, i) => ({
      x: W * 0.32 + i * 28,
      y: CY - 10,
      color: '#ef4444', r: 10, label: 'B', consumed: false,
    }));

    // Productos (verde): se forman al reaccionar
    const PRODUCTS = Array.from({ length: 4 }, (_, i) => ({
      x: W * 0.72 + i * 32,
      y: CY - 10,
      color: '#34d399', r: 12, label: 'AB', visible: false,
    }));

    let phase = 0; // 0=inicial, 1=reaccion, 2=resultado
    let t = 0;
    let phaseTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.02;
      phaseTimer += 0.02;

      // Ciclo automático
      if (phaseTimer > 90)  { phase = 1; }
      if (phaseTimer > 160) { phase = 2; PRODUCTS.forEach(p => p.visible = true); }
      if (phaseTimer > 260) { phase = 0; phaseTimer = 0; REACT_A.forEach(r => r.consumed = false); REACT_B.forEach(r => r.consumed = false); PRODUCTS.forEach(p => p.visible = false); }

      if (phase === 1) {
        const progress = (phaseTimer - 90) / 70;
        const consumed = Math.floor(progress * 4);
        REACT_B.forEach((r, i) => { r.consumed = i < consumed; });
        REACT_A.forEach((r, i) => { r.consumed = i < consumed; });
      }

      // Zona reactivos A
      ctx.strokeStyle = 'rgba(56,189,248,0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(W * 0.07, CY - 60, W * 0.22, 100);
      ctx.setLineDash([]);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(56,189,248,0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('Reactivo A (exceso)', W * 0.18, CY - 68);

      // Zona reactivos B
      ctx.strokeStyle = 'rgba(239,68,68,0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(W * 0.30, CY - 35, W * 0.20, 55);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(239,68,68,0.5)';
      ctx.fillText('Reactivo B (limitante)', W * 0.40, CY - 43);

      // Flecha reacción
      const arAlpha = phase === 1 ? 0.5 + 0.4 * Math.sin(t * 3) : 0.3;
      ctx.beginPath();
      ctx.moveTo(W * 0.53, CY);
      ctx.lineTo(W * 0.63, CY);
      ctx.strokeStyle = `rgba(245,158,11,${arAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W * 0.63, CY);
      ctx.lineTo(W * 0.625, CY - 6);
      ctx.lineTo(W * 0.625, CY + 6);
      ctx.closePath();
      ctx.fillStyle = `rgba(245,158,11,${arAlpha})`;
      ctx.fill();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(245,158,11,0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('reacción', W * 0.58, CY - 10);

      // Zona productos
      ctx.strokeStyle = 'rgba(52,211,153,0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(W * 0.65, CY - 35, W * 0.28, 55);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(52,211,153,0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('Productos', W * 0.79, CY - 43);

      // Dibujar reactivos A
      REACT_A.forEach(r => {
        const alpha = r.consumed ? 0.18 : 1;
        ctx.globalAlpha = alpha;
        drawGlow(ctx, r.x, r.y, r.r, r.color);
        drawSphere(ctx, r.x, r.y, r.r, r.color);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(r.label, r.x, r.y);
      });
      ctx.globalAlpha = 1;

      // Dibujar reactivos B
      REACT_B.forEach(r => {
        const alpha = r.consumed ? 0.18 : 1;
        ctx.globalAlpha = alpha;
        drawGlow(ctx, r.x, r.y, r.r, r.color);
        drawSphere(ctx, r.x, r.y, r.r, r.color);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(r.label, r.x, r.y);
      });
      ctx.globalAlpha = 1;

      // Dibujar productos
      PRODUCTS.forEach((p, i) => {
        if (!p.visible) return;
        const scale = 0.5 + 0.5 * Math.min(1, (phaseTimer - 160 - i * 10) / 20);
        ctx.globalAlpha = scale;
        drawGlow(ctx, p.x, p.y, p.r * scale, p.color);
        drawSphere(ctx, p.x, p.y, p.r * scale, p.color);
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.font = `bold ${Math.round(7 * scale)}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AB', p.x, p.y);
        ctx.globalAlpha = 1;
      });

      // Rendimiento
      if (phase === 2) {
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(52,211,153,0.85)';
        ctx.fillText('Rendimiento = 4/12 × 100 = 33.3%', CX, H - 22);
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(239,68,68,0.7)';
        ctx.fillText('⚠ B es el reactivo limitante', CX, H - 8);
      } else {
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(245,158,11,0.65)';
        ctx.fillText('% Rendimiento = (real / teórico) × 100', CX, H - 10);
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     SISTEMA DE TABS
  ============================================================ */
  function initTabs() {
    const pills  = $$('.eq-tema-pill');
    const panels = $$('.eq-panel');
    const inited = new Set();

    const canvasDrawers = {
      'eq-c-mol':   drawMolMasas,
      'eq-c-conc':  drawConcentraciones,
      'eq-c-dil':   drawDiluciones,
      'eq-c-rend':  drawRendimiento,
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
      pills.forEach((p, i) => p.classList.toggle('active', i === idx));
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
        const target = parseFloat(el.dataset.eqCount);
        const suffix = el.dataset.eqSuffix || '';
        const dec    = parseInt(el.dataset.eqDec || 0);
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
    $$('[data-eq-count]').forEach(c => io.observe(c));
  }

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('eq-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    $$('[data-eq-reveal]').forEach(el => io.observe(el));
  }

  /* ============================================================
     NAVBAR
  ============================================================ */
  function initNav() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
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
    const heroCanvas = document.getElementById('eq-hero-canvas');
    if (heroCanvas) drawHero(heroCanvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { version: '1.0.0', module: 'EQ-Estequiometria' };
})();
