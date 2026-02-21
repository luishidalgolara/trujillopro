/* ============================================================
   BIOFARMACOS.JS — PharmaLab Chile | Unidad 1: Biofármacos
   Iniciales: BF — Módulo 3D + interacciones + tabs
   ============================================================ */

'use strict';

const BF = (() => {

  /* ===========================
     1. UTILIDADES
  =========================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ===========================
     2. SISTEMA DE TABS
  =========================== */
  function BF_initTabs() {
    const pills  = $$('.bf-tema-pill');
    const panels = $$('.bf-content-panel');
    const inited = new Set();

    const canvasMap = {
      'bf-canvas-antibody'  : BF_drawAntibody,
      'bf-canvas-protein'   : BF_drawProtein,
      'bf-canvas-vaccine'   : BF_drawVaccine,
      'bf-canvas-biosimilar': BF_drawBiosimilar,
    };

    function initPanelCanvas(idx) {
      if (inited.has(idx)) return;
      inited.add(idx);
      Object.entries(canvasMap).forEach(([id, fn]) => {
        const c = document.getElementById(id);
        if (c && panels[idx] && panels[idx].contains(c)) {
          requestAnimationFrame(() => { c.style.width='100%'; c.style.height='320px'; fn(c); });
        }
      });
    }

    function activate(idx) {
      pills.forEach((p, i)  => p.classList.toggle('active', i === idx));
      panels.forEach((p, i) => p.classList.toggle('active', i === idx));
      initPanelCanvas(idx);
      setTimeout(() => BF_resizeCanvases(), 60);
    }

    pills.forEach((pill, i) => {
      pill.addEventListener('click', () => activate(i));
    });

    activate(0);
  }

  /* ===========================
     3. ENGINE 3D LIGHTWEIGHT (WebGL-less, Canvas 2D)
  =========================== */

  // Proyección 3D simple → 2D
  function BF_project(x, y, z, fov, cx, cy) {
    const d = fov / (fov + z);
    return { x: cx + x * d, y: cy + y * d, d };
  }

  // Rotación 3D
  function BF_rotate(pts, rx, ry) {
    return pts.map(([x, y, z]) => {
      // rotate Y
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);
      // rotate X
      let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      return [x1, y1, z2];
    });
  }

  // Genera esfera de puntos
  function BF_spherePts(r, n) {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y  = 1 - (i / (n - 1)) * 2;
      const ra = Math.sqrt(1 - y * y);
      const th = phi * i;
      pts.push([r * ra * Math.cos(th), r * y, r * ra * Math.sin(th)]);
    }
    return pts;
  }

  // Genera aristas de cubo
  function BF_cubeEdges(s) {
    const h = s / 2;
    const v = [[-h,-h,-h],[ h,-h,-h],[ h, h,-h],[-h, h,-h],
               [-h,-h, h],[ h,-h, h],[ h, h, h],[-h, h, h]];
    const e = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],
               [0,4],[1,5],[2,6],[3,7]];
    return { v, e };
  }

  /* ===========================
     3A. ANTICUERPO Y (IgG) 3D
  =========================== */
  function BF_drawAntibody(canvas) {
    const ctx  = canvas.getContext('2d');
    const W = canvas.width = canvas.clientWidth * window.devicePixelRatio;
    const H = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';

    const CX = W / 2, CY = H / 2;
    const FOV = 600;
    let rx = 0.2, ry = 0;
    let dragging = false, lastX = 0, lastY = 0;
    let autoRot  = true;

    // Geometría IgG: Fab + Fc
    // Esferas que representan dominios
    const DOMAINS_BASE = [
      // Fab izquierdo
      { pos: [-90, -120, 0], r: 22, color: '#00e5ff', label: 'VL' },
      { pos: [-90, -70,  0], r: 22, color: '#22d3ee', label: 'CL' },
      { pos: [-140,-120, 0], r: 22, color: '#818cf8', label: 'VH' },
      { pos: [-140,-70,  0], r: 22, color: '#a78bfa', label: 'CH1' },
      // Fab derecho
      { pos: [90,  -120, 0], r: 22, color: '#00e5ff', label: 'VL' },
      { pos: [90,  -70,  0], r: 22, color: '#22d3ee', label: 'CL' },
      { pos: [140, -120, 0], r: 22, color: '#818cf8', label: 'VH' },
      { pos: [140, -70,  0], r: 22, color: '#a78bfa', label: 'CH1' },
      // Hinge
      { pos: [-50, -20,  0], r: 14, color: '#f59e0b', label: '' },
      { pos: [50,  -20,  0], r: 14, color: '#f59e0b', label: '' },
      // Fc
      { pos: [-45,  30,  0], r: 22, color: '#10b981', label: 'CH2' },
      { pos: [45,   30,  0], r: 22, color: '#10b981', label: 'CH2' },
      { pos: [-45,  80,  0], r: 22, color: '#34d399', label: 'CH3' },
      { pos: [45,   80,  0], r: 22, color: '#34d399', label: 'CH3' },
    ];

    // Conexiones entre dominios
    const BONDS = [
      [0,1],[2,3],[0,2],[1,3],    // Fab L
      [4,5],[6,7],[4,6],[5,7],    // Fab R
      [1,8],[3,8],[5,9],[7,9],    // → hinge
      [8,10],[9,11],              // hinge → Fc
      [10,12],[11,13],[10,11],[12,13] // Fc
    ];

    // Antígenos (pequeños puntos que se unen a VL/VH)
    const ANTIGENS_BASE = [
      { pos: [-115,-155, 20], r: 8, color: '#ef4444' },
      { pos: [-165,-155,-20], r: 8, color: '#ef4444' },
      { pos: [115,-155, 20],  r: 8, color: '#ef4444' },
      { pos: [165,-155,-20],  r: 8, color: '#ef4444' },
    ];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Fondo gradiente sutil
      const grd = ctx.createRadialGradient(CX, CY, 10, CX, CY, W * 0.6);
      grd.addColorStop(0, 'rgba(0,229,255,0.04)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      if (autoRot) ry += 0.007;
      t += 0.02;

      // Antigenos flotantes
      const antP = ANTIGENS_BASE.map(a => {
        const wave = Math.sin(t + a.pos[0] * 0.01) * 8;
        return { ...a, pos: [a.pos[0], a.pos[1] + wave, a.pos[2]] };
      });

      const allDomains = [...DOMAINS_BASE, ...antP];
      const rotated    = BF_rotate(allDomains.map(d => d.pos), rx, ry);

      // Proyectar todos
      const projected = rotated.map((p, i) => {
        const pr = BF_project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...allDomains[i], z: p[2] };
      });

      // Ordenar por z (pintor)
      const sorted = [...projected].sort((a, b) => a.z - b.z);

      // Dibujar bonds
      BONDS.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        const alpha = 0.25 + 0.1 * ((pa.d + pb.d) / 2);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth   = 1.5 * pa.d;
        ctx.stroke();
      });

      // Dibujar antígeno → dominio bonds (línea punteada)
      [0,1,2,3].forEach((i, idx) => {
        const ai = projected[DOMAINS_BASE.length + idx];
        const vi = projected[[0,2,4,6][idx]];
        if (!ai || !vi) return;
        ctx.beginPath();
        ctx.setLineDash([3,4]);
        ctx.moveTo(ai.x, ai.y);
        ctx.lineTo(vi.x, vi.y);
        ctx.strokeStyle = `rgba(239,68,68,0.4)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Dibujar dominios
      sorted.forEach(d => {
        const scale = d.d;
        const rad   = d.r * scale;

        // Glow
        if (d.r > 10) {
          const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad * 2.5);
          glow.addColorStop(0, d.color + '30');
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(d.x, d.y, rad * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Esfera
        const sg = ctx.createRadialGradient(
          d.x - rad * 0.3, d.y - rad * 0.3, rad * 0.05,
          d.x, d.y, rad
        );
        sg.addColorStop(0, d.color + 'ff');
        sg.addColorStop(0.6, d.color + 'aa');
        sg.addColorStop(1, d.color + '33');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();

        // Label
        if (d.label && d.r > 18) {
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.font = `${Math.max(9, 11 * scale)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(d.label, d.x, d.y);
        }
      });

      // Leyenda
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      const legend = [
        { color: '#00e5ff', label: 'Cadena Ligera (VL/CL)' },
        { color: '#818cf8', label: 'Cadena Pesada (VH/CH)' },
        { color: '#10b981', label: 'Región Fc' },
        { color: '#ef4444', label: 'Antígeno (epítopo)' },
      ];
      legend.forEach((l, i) => {
        const lx = 12, ly = 16 + i * 20;
        ctx.fillStyle = l.color;
        ctx.beginPath();
        ctx.arc(lx, ly, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(l.label, lx + 12, ly + 1);
      });

      requestAnimationFrame(draw);
    }

    // Mouse drag
    canvas.addEventListener('mousedown', e => { dragging = true; autoRot = false; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      ry += (e.clientX - lastX) * 0.008;
      rx += (e.clientY - lastY) * 0.008;
      lastX = e.clientX; lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging = false; autoRot = true; });

    // Touch
    canvas.addEventListener('touchstart', e => { dragging = true; autoRot = false; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; });
    canvas.addEventListener('touchmove', e => {
      if (!dragging) return;
      e.preventDefault();
      ry += (e.touches[0].clientX - lastX) * 0.008;
      rx += (e.touches[0].clientY - lastY) * 0.008;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { dragging = false; autoRot = true; });

    draw();
  }

  /* ===========================
     3B. PROTEINA RECOMBINANTE 3D (Hélice Alfa + Lámina Beta + Espiral ADN)
  =========================== */
  function BF_drawProtein(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.clientWidth  * window.devicePixelRatio;
    const H = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';

    const CX = W / 2, CY = H / 2, FOV = 600;
    let rx = 0.3, ry = 0, dragging = false, lastX = 0, lastY = 0, autoRot = true;

    // Genera hélice alfa
    function makeHelix(turns, r, pitch, startY, color1, color2) {
      const pts = [];
      const steps = turns * 24;
      for (let i = 0; i < steps; i++) {
        const ang = (i / 24) * Math.PI * 2;
        const y   = startY + (i / steps) * (turns * pitch) - (turns * pitch / 2);
        pts.push({ pos: [r * Math.cos(ang), y, r * Math.sin(ang)],
                   color: i % 2 === 0 ? color1 : color2, r: 6 });
      }
      return pts;
    }

    // Genera lámina beta (zigzag plano)
    function makeBetaSheet(strands, len, gap, startX, startY) {
      const pts = [];
      for (let s = 0; s < strands; s++) {
        for (let i = 0; i < len; i++) {
          const x = startX + i * 14 - (len * 7);
          const y = startY + s * gap - ((strands - 1) * gap / 2);
          const z = s % 2 === 0 ? 0 : 8;
          pts.push({ pos: [x, y, z], color: '#a78bfa', r: 7 });
        }
      }
      return pts;
    }

    // Genera coil (nube de residuos)
    function makeCoil(n, r, cx, cy, cz) {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a  = (i / n) * Math.PI * 4;
        const rv = r + (Math.random() - 0.5) * 10;
        pts.push({ pos: [cx + rv * Math.cos(a) * 0.7, cy + (i / n - 0.5) * r * 1.2, cz + rv * Math.sin(a)],
                   color: '#f59e0b', r: 4 });
      }
      return pts;
    }

    const helix1 = makeHelix(2.5, 30, 28, -60, '#00e5ff', '#22d3ee');
    const helix2 = makeHelix(2,   25, 26, 50,  '#34d399', '#10b981');
    const sheet  = makeBetaSheet(4, 6, 22, 0, 0);
    const coil   = makeCoil(30, 20, -80, -10, -20);
    const coil2  = makeCoil(20, 18, 80, 20, 10);

    // Colores aminoácidos (puntos de sitio activo)
    const activeSite = [
      { pos: [8, -15, 15], r: 10, color: '#ef4444' },
      { pos: [-5, -25, 10], r: 8, color: '#ef4444' },
      { pos: [15, -10, 5], r: 9, color: '#ef4444' },
    ];

    const ALL_PTS = [...helix1, ...helix2, ...sheet, ...coil, ...coil2, ...activeSite];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      if (autoRot) ry += 0.009;
      t += 0.015;

      const rotated = BF_rotate(ALL_PTS.map(p => p.pos), rx, ry);
      const projected = rotated.map((p, i) => {
        const pr = BF_project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...ALL_PTS[i], z: p[2] };
      });

      // Backbond conecta secuencialmente los puntos de hélice
      const drawBackbone = (start, len, col) => {
        ctx.beginPath();
        for (let i = start; i < start + len - 1; i++) {
          const a = projected[i], b = projected[i + 1];
          if (i === start) ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.strokeStyle = col + '55';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      };

      drawBackbone(0, helix1.length, '#00e5ff');
      drawBackbone(helix1.length, helix2.length, '#34d399');

      // Dibujar puntos
      [...projected].sort((a, b) => a.z - b.z).forEach(d => {
        const scale = d.d;
        const rad   = d.r * scale;
        const grd   = ctx.createRadialGradient(d.x - rad*0.3, d.y - rad*0.3, 0, d.x, d.y, rad);
        grd.addColorStop(0, d.color + 'ff');
        grd.addColorStop(0.5, d.color + 'aa');
        grd.addColorStop(1, d.color + '22');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // Etiquetar sitio activo
      const sa = projected[ALL_PTS.length - activeSite.length];
      if (sa) {
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center';
        ctx.fillText('Sitio Activo', sa.x, sa.y - 16 * sa.d);
      }

      // Leyenda
      const leg = [
        { color: '#00e5ff', label: 'α-Hélice' },
        { color: '#a78bfa', label: 'β-Lámina' },
        { color: '#f59e0b', label: 'Coil/Loop' },
        { color: '#ef4444', label: 'Sitio Activo' },
      ];
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      leg.forEach((l, i) => {
        ctx.fillStyle = l.color;
        ctx.beginPath();
        ctx.arc(12, 14 + i * 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(l.label, 24, 18 + i * 18);
      });

      requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousedown', e => { dragging = true; autoRot = false; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      ry += (e.clientX - lastX) * 0.008;
      rx += (e.clientY - lastY) * 0.008;
      lastX = e.clientX; lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging = false; autoRot = true; });

    draw();
  }

  /* ===========================
     3C. VACUNA ARNm 3D (nanopartícula lipídica + ARNm)
  =========================== */
  function BF_drawVaccine(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.clientWidth  * window.devicePixelRatio;
    const H = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';

    const CX = W / 2, CY = H / 2, FOV = 600;
    let rx = 0.15, ry = 0, autoRot = true, dragging = false, lastX = 0, lastY = 0;

    // Nanopartícula lipídica: esfera grande
    const LIPID_SPHERE = BF_spherePts(90, 120).map(p => ({
      pos: p, color: '#818cf8', r: 4.5, alpha: 0.45
    }));

    // Capa exterior (PEGylada)
    const PEG_SPHERE = BF_spherePts(105, 60).map(p => ({
      pos: p, color: '#c4b5fd', r: 3, alpha: 0.25
    }));

    // ARNm dentro (espiral)
    const ARNM = [];
    for (let i = 0; i < 200; i++) {
      const t2 = i / 200;
      const ang = t2 * Math.PI * 10;
      const r   = 30 + t2 * 30;
      const y   = (t2 - 0.5) * 80;
      ARNM.push({ pos: [r * Math.cos(ang), y, r * Math.sin(ang)], color: '#f59e0b', r: 3 });
    }

    // Partícula de antígeno expresada
    const ANTIGEN = [
      { pos: [0, -130, 0], r: 18, color: '#ef4444' },
      { pos: [0, -155, 15], r: 10, color: '#fca5a5' },
      { pos: [0, -155,-15], r: 10, color: '#fca5a5' },
    ];

    const ALL = [...LIPID_SPHERE, ...PEG_SPHERE, ...ARNM, ...ANTIGEN];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      if (autoRot) ry += 0.008;
      t += 0.02;

      const rotated   = BF_rotate(ALL.map(p => p.pos), rx, ry);
      const projected = rotated.map((p, i) => {
        const pr = BF_project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...ALL[i], z: p[2] };
      });

      // Ordenar por z
      [...projected].sort((a, b) => a.z - b.z).forEach(d => {
        const scale = d.d;
        const rad   = d.r * scale;
        const alpha = (d.alpha || 0.85) * (0.6 + 0.4 * scale);
        const hex   = Math.round(alpha * 255).toString(16).padStart(2,'0');

        const grd = ctx.createRadialGradient(d.x - rad*0.3, d.y - rad*0.3, 0, d.x, d.y, rad);
        grd.addColorStop(0, d.color + hex);
        grd.addColorStop(1, d.color + '11');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // ARNm backbone
      ctx.beginPath();
      const arnmStart = LIPID_SPHERE.length + PEG_SPHERE.length;
      for (let i = arnmStart; i < arnmStart + ARNM.length - 1; i++) {
        const a = projected[i], b = projected[i + 1];
        if (i === arnmStart) ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.strokeStyle = '#f59e0b55';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Flecha antígeno
      const ant = projected[projected.length - 3];
      if (ant) {
        ctx.font = 'bold 10px "Outfit", sans-serif';
        ctx.fillStyle = '#ef4444bb';
        ctx.textAlign = 'center';
        ctx.fillText('Antígeno Spike', ant.x, ant.y - 30 * ant.d);
        ctx.fillText('(expresado)', ant.x, ant.y - 16 * ant.d);
      }

      // Leyenda
      const leg = [
        { color: '#818cf8', label: 'Membrana Lipídica' },
        { color: '#c4b5fd', label: 'Capa PEG' },
        { color: '#f59e0b', label: 'ARNm' },
        { color: '#ef4444', label: 'Proteína Spike' },
      ];
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      leg.forEach((l, i) => {
        ctx.fillStyle = l.color;
        ctx.beginPath();
        ctx.arc(12, 14 + i * 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(l.label, 24, 18 + i * 18);
      });

      requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousedown', e => { dragging = true; autoRot = false; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      ry += (e.clientX - lastX) * 0.008;
      rx += (e.clientY - lastY) * 0.008;
      lastX = e.clientX; lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging = false; autoRot = true; });

    draw();
  }

  /* ===========================
     3D. BIOSIMILAR vs ORIGINAL 3D (dos moléculas comparadas)
  =========================== */
  function BF_drawBiosimilar(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.clientWidth  * window.devicePixelRatio;
    const H = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';

    const CX = W / 2, CY = H / 2, FOV = 500;
    let ry = 0, rx = 0.15;

    // Molécula original (izquierda)
    const MOL_A = BF_spherePts(55, 80).map(p => ({
      pos: [p[0] - 110, p[1], p[2]], color: '#00e5ff', r: 5
    }));

    // Biosimilar (derecha) - estructura casi idéntica con pequeña variación
    const MOL_B = BF_spherePts(55, 80).map((p, i) => {
      const noise = i % 5 === 0 ? 8 : 0;
      return {
        pos: [p[0] + 110 + (Math.random() - 0.5) * noise,
              p[1]        + (Math.random() - 0.5) * noise * 0.5,
              p[2]        + (Math.random() - 0.5) * noise * 0.5],
        color: '#34d399', r: 5
      };
    });

    const ALL = [...MOL_A, ...MOL_B];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ry += 0.007;

      const rotated   = BF_rotate(ALL.map(p => p.pos), rx, ry);
      const projected = rotated.map((p, i) => {
        const pr = BF_project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...ALL[i], z: p[2] };
      });

      [...projected].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        const grd = ctx.createRadialGradient(d.x - rad*0.3, d.y - rad*0.3, 0, d.x, d.y, rad);
        grd.addColorStop(0, d.color + 'dd');
        grd.addColorStop(1, d.color + '11');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // Etiquetas
      ctx.font = 'bold 12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#00e5ffcc';
      ctx.fillText('Biológico Original', CX - 80, 22);
      ctx.fillStyle = '#34d399cc';
      ctx.fillText('Biosimilar', CX + 80, 22);

      // Línea divisoria
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(CX, 30);
      ctx.lineTo(CX, H - 10);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Similitud
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText('~97% Similitud estructural', CX, H - 6);

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* ===========================
     3E. HERO CANVAS (ADN + Nanopartícula combinado)
  =========================== */
  function BF_drawHero(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.clientWidth  * window.devicePixelRatio;
    const H = canvas.height = canvas.clientHeight * window.devicePixelRatio;
    canvas.style.width  = canvas.clientWidth  + 'px';
    canvas.style.height = canvas.clientHeight + 'px';

    const CX = W / 2, CY = H / 2, FOV = 700;
    let ry = 0, rx = 0.1;
    let dragging = false, lastX = 0, lastY = 0, autoRot = true;

    // Doble hélice ADN
    const DNA = [];
    const N = 120;
    for (let i = 0; i < N; i++) {
      const t2  = i / N;
      const ang = t2 * Math.PI * 6;
      const y   = (t2 - 0.5) * 280;
      DNA.push({ pos: [55 * Math.cos(ang), y, 55 * Math.sin(ang)], color: '#00e5ff', r: 5 });
      DNA.push({ pos: [55 * Math.cos(ang + Math.PI), y, 55 * Math.sin(ang + Math.PI)], color: '#818cf8', r: 5 });
      // Puente
      if (i % 6 === 0) {
        DNA.push({ pos: [20 * Math.cos(ang), y, 20 * Math.sin(ang)], color: '#f59e0b', r: 3.5 });
        DNA.push({ pos: [20 * Math.cos(ang + Math.PI), y, 20 * Math.sin(ang + Math.PI)], color: '#f59e0b', r: 3.5 });
      }
    }

    // Moléculas flotantes (biofármacos pequeños)
    const FLOATERS = [];
    for (let i = 0; i < 20; i++) {
      const ang = (i / 20) * Math.PI * 2;
      const r   = 140 + Math.sin(i * 1.2) * 30;
      FLOATERS.push({
        pos: [r * Math.cos(ang), Math.sin(i * 0.8) * 100, r * Math.sin(ang)],
        color: ['#ef4444','#10b981','#f59e0b','#a78bfa'][i % 4],
        r: 6 + Math.random() * 5,
        phase: i * 0.3
      });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      if (autoRot) ry += 0.006;
      t += 0.02;

      // Floaters animados
      const animated = FLOATERS.map(f => ({
        ...f, pos: [f.pos[0], f.pos[1] + Math.sin(t + f.phase) * 12, f.pos[2]]
      }));

      const ALL = [...DNA, ...animated];
      const rotated   = BF_rotate(ALL.map(p => p.pos), rx, ry);
      const projected = rotated.map((p, i) => {
        const pr = BF_project(p[0], p[1], p[2], FOV, CX, CY);
        return { ...pr, ...ALL[i], z: p[2] };
      });

      // ADN backbone
      for (let s = 0; s < 2; s++) {
        ctx.beginPath();
        const cols = ['#00e5ff', '#818cf8'];
        for (let i = s; i < N * 2; i += 2) {
          const p = projected[i];
          if (i === s) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = cols[s] + '40';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      [...projected].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        const grd = ctx.createRadialGradient(d.x - rad*0.3, d.y - rad*0.3, 0, d.x, d.y, rad);
        grd.addColorStop(0, d.color + 'ee');
        grd.addColorStop(0.5, d.color + '88');
        grd.addColorStop(1, d.color + '11');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousedown', e => { dragging = true; autoRot = false; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      ry += (e.clientX - lastX) * 0.008;
      rx += (e.clientY - lastY) * 0.008;
      lastX = e.clientX; lastY = e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging = false; autoRot = true; });

    draw();
  }

  /* ===========================
     4. CONTADORES ANIMADOS
  =========================== */
  function BF_initCounters() {
    const counters = $$('[data-bf-count]');
    if (!counters.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = parseFloat(el.dataset.bfCount);
        const suffix = el.dataset.bfSuffix || '';
        const dec    = el.dataset.bfDec    || 0;
        const dur    = 1800;
        const start  = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / dur, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = (eased * target).toFixed(dec) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
  }

  /* ===========================
     5. SCROLL REVEAL
  =========================== */
  function BF_initReveal() {
    const els = $$('[data-bf-reveal]');
    if (!els.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('bf-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ===========================
     6. RESIZE CANVASES
  =========================== */
  function BF_resizeCanvases() {
    $$('canvas[data-bf-canvas]').forEach(c => {
      c.width  = c.clientWidth  * window.devicePixelRatio;
      c.height = c.clientHeight * window.devicePixelRatio;
    });
  }

  /* ===========================
     7. INIT PRINCIPAL
  =========================== */
  function init() {
    BF_initTabs();
    BF_initCounters();
    BF_initReveal();

    // Hero canvas
    const heroCanvas = $('#bf-hero-canvas');
    if (heroCanvas) BF_drawHero(heroCanvas);

    // Resize
    window.addEventListener('resize', BF_resizeCanvases);

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }

    // Mobile nav toggle
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

  return { version: '1.0.0', module: 'BF-Biofarmacos' };
})();