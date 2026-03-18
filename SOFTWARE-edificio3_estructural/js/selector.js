/* ═══════════════════════════════════════════════════════
   SELECTOR.JS — Plataforma de Ingeniería Civil 3D
   Lógica del canvas 3D de fondo, mini-canvases de cards
   y sistema de selección/navegación de edificios
═══════════════════════════════════════════════════════ */

/* ── 1. BACKGROUND 3D CANVAS ── */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, cx, cy;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cx = W / 2;
    cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  const fov = 600;

  function project(x, y, z, rotY, rotX) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    const scale = fov / (fov + z2 + 300);
    return { sx: cx + x1 * scale, sy: cy + y2 * scale, scale };
  }

  function buildingSkeleton(floors, w, d, floorH) {
    const pts = [], edges = [];
    for (let f = 0; f <= floors; f++) {
      const y = -f * floorH + (floors * floorH) / 2;
      pts.push({ x: -w/2, y, z: -d/2 });
      pts.push({ x:  w/2, y, z: -d/2 });
      pts.push({ x:  w/2, y, z:  d/2 });
      pts.push({ x: -w/2, y, z:  d/2 });
    }
    for (let f = 0; f <= floors; f++) {
      const b = f * 4;
      edges.push([b,   b+1, 'slab']); edges.push([b+1, b+2, 'slab']);
      edges.push([b+2, b+3, 'slab']); edges.push([b+3, b,   'slab']);
      if (f < floors) {
        edges.push([b, b+2, 'diag']);
        edges.push([b+1, b+3, 'diag']);
      }
    }
    for (let f = 0; f < floors; f++) {
      const b = f * 4;
      edges.push([b,   b+4, 'col']); edges.push([b+1, b+5, 'col']);
      edges.push([b+2, b+6, 'col']); edges.push([b+3, b+7, 'col']);
    }
    const gridBase = (floors + 1) * 4;
    for (let f = 0; f <= floors; f++) {
      const y = -f * floorH + (floors * floorH) / 2;
      pts.push({ x: 0,    y, z: -d/2 });
      pts.push({ x: 0,    y, z:  d/2 });
      pts.push({ x: -w/2, y, z: 0    });
      pts.push({ x:  w/2, y, z: 0    });
    }
    for (let f = 0; f <= floors; f++) {
      const b = gridBase + f * 4;
      edges.push([b, b+1, 'beam']); edges.push([b+2, b+3, 'beam']);
      edges.push([f*4, b+2, 'beam']); edges.push([f*4+1, b+3, 'beam']);
    }
    for (let f = 0; f < floors; f++) {
      const b = gridBase + f * 4;
      edges.push([b, b+4, 'col']); edges.push([b+1, b+5, 'col']);
    }
    return { pts, edges };
  }

  const buildings = [
    { ...buildingSkeleton(8,  120, 90, 28), ox: -240, oz:  60, scale: 1.1  },
    { ...buildingSkeleton(5,   80, 70, 26), ox:  200, oz: -40, scale: 0.85 },
    { ...buildingSkeleton(12, 100, 80, 22), ox:    0, oz: 100, scale: 0.95 },
  ];

  const dimLines = [];
  for (let i = 0; i < 20; i++) {
    dimLines.push({
      x: (Math.random() - 0.5) * 700,
      y: (Math.random() - 0.5) * 500,
      z: (Math.random() - 0.5) * 300,
      len: 40 + Math.random() * 100,
      angle: Math.random() * Math.PI * 2,
      speed: 0.0003 + Math.random() * 0.0005,
      phase: Math.random() * Math.PI * 2,
    });
  }

  const nodes = [];
  for (let i = 0; i < 35; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 400,
      r: 1.5 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random(),
    });
  }

  let rotY = 0.3, rotX = -0.2;
  let targetRotY = rotY, targetRotX = rotX;
  let t = 0;

  document.addEventListener('mousemove', e => {
    targetRotY = 0.3 + (e.clientX / window.innerWidth  - 0.5) * 0.6;
    targetRotX = -0.2 + (e.clientY / window.innerHeight - 0.5) * 0.25;
  });

  const edgeColors = {
    col:  'rgba(0,201,255,',
    slab: 'rgba(0,201,255,',
    beam: 'rgba(255,149,0,',
    diag: 'rgba(100,150,200,',
  };

  function drawBuilding(b, rotYr, rotXr) {
    const projected = b.pts.map(p => project(
      p.x * b.scale + b.ox, p.y * b.scale, p.z * b.scale + b.oz, rotYr, rotXr
    ));
    for (const [a, b2, type] of b.edges) {
      const pa = projected[a], pb = projected[b2];
      if (!pa || !pb) continue;
      const depth = (pa.scale + pb.scale) / 2;
      const baseAlpha = type === 'diag' ? 0.08 : type === 'col' ? 0.28 : 0.18;
      ctx.beginPath();
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(pb.sx, pb.sy);
      ctx.strokeStyle = edgeColors[type] + baseAlpha * Math.min(depth * 2, 1) + ')';
      ctx.lineWidth = type === 'col' ? 1.2 : 0.6;
      ctx.stroke();
    }
    for (let i = 0; i < projected.length; i += 4) {
      const p = projected[i];
      if (!p) continue;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 2 * p.scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,201,255,${0.25 * Math.min(p.scale * 2, 1)})`;
      ctx.fill();
    }
  }

  function drawDimLine(dl, rotYr, rotXr, time) {
    const pulse = 0.5 + 0.5 * Math.sin(time * dl.speed * 60 + dl.phase);
    const p = project(dl.x, dl.y, dl.z, rotYr, rotXr);
    const endX = p.sx + Math.cos(dl.angle) * dl.len * p.scale;
    const endY = p.sy + Math.sin(dl.angle) * dl.len * p.scale;
    const alpha = 0.12 * pulse;
    ctx.beginPath();
    ctx.moveTo(p.sx, p.sy);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `rgba(0,201,255,${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,201,255,${alpha * 2})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(endX, endY, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,201,255,${alpha * 2})`;
    ctx.fill();
  }

  function drawFloatingNode(nd, rotYr, rotXr, time) {
    const p = project(nd.x, nd.y, nd.z, rotYr, rotXr);
    const pulse = 0.5 + 0.5 * Math.sin(time * nd.speed + nd.phase);
    const alpha = 0.15 * pulse;
    const r = nd.r * p.scale;
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,201,255,${alpha * 1.5})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, r * 2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,201,255,${alpha * 0.5})`;
    ctx.lineWidth = 0.4;
    ctx.stroke();
  }

  let scanY = -300;

  function animate(ts) {
    t = ts * 0.001;
    rotY += (targetRotY - rotY) * 0.04;
    rotX += (targetRotX - rotX) * 0.04;
    const autoRotY = rotY + t * 0.07;
    const autoRotX = rotX + Math.sin(t * 0.3) * 0.04;

    ctx.clearRect(0, 0, W, H);

    scanY += 0.8;
    if (scanY > H / 2 + 400) scanY = -400;
    const scanGrad = ctx.createLinearGradient(0, cy + scanY - 30, 0, cy + scanY + 30);
    scanGrad.addColorStop(0, 'transparent');
    scanGrad.addColorStop(0.5, 'rgba(0,201,255,0.03)');
    scanGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, cy + scanY - 30, W, 60);

    for (const dl of dimLines) drawDimLine(dl, autoRotY, autoRotX, t);
    for (const b  of buildings)  drawBuilding(b, autoRotY, autoRotX);
    for (const nd of nodes)      drawFloatingNode(nd, autoRotY, autoRotX, t);

    const horizY = cy + autoRotX * 200;
    const horizGrad = ctx.createLinearGradient(0, 0, W, 0);
    horizGrad.addColorStop(0, 'transparent');
    horizGrad.addColorStop(0.3, 'rgba(0,201,255,0.06)');
    horizGrad.addColorStop(0.7, 'rgba(0,201,255,0.06)');
    horizGrad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.moveTo(0, horizY);
    ctx.lineTo(W, horizY);
    ctx.strokeStyle = horizGrad;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();


/* ── 2. CARD MINI CANVASES ── */
(function () {
  const configs = [
    { id: 'c1', floors: 8,  w: 120, d: 90,  color1: '#00c9ff', color2: '#ff9500', label: 'EDIFICIO 3'       },
    { id: 'c2', floors: 10, w: 105, d: 82,  color1: '#00ddaa', color2: '#00c9ff', label: 'CAMPO DOURIQUE'   },
    { id: 'c3', floors: 12, w: 112, d: 97,  color1: '#ff9500', color2: '#ff5588', label: 'RIBEIRO'          },
    { id: 'c4', floors: 3,  w: 130, d: 110, color1: '#e8c060', color2: '#c0a030', label: 'FAERAC — ACERO'   },
    { id: 'c5', floors: 22, w: 95,  d: 75,  color1: '#ffd700', color2: '#ffaa00', label: 'EDIFICIO GOLDEN'  },
    { id: 'c6', floors: 2,  w: 160, d: 130, color1: '#00ddaa', color2: '#ff9500', label: 'CASA MG'          },
  ];

  configs.forEach(({ id, floors, w, d, color1, color2, label }, idx) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const fov = 600, floorH = 14;
    const cx = () => canvas.offsetWidth  / 2;
    const cy = () => canvas.offsetHeight / 2;

    function resize() {
      canvas.width  = (canvas.offsetWidth  || 300) * window.devicePixelRatio;
      canvas.height = (canvas.offsetHeight || 160) * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', resize);

    function proj(x, y, z, rY, rX) {
      const cosY = Math.cos(rY), sinY = Math.sin(rY);
      const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
      const cosX = Math.cos(rX), sinX = Math.sin(rX);
      const y2 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
      const s = fov / (fov + z2 + 200);
      return { sx: cx() + x1 * s, sy: cy() * 0.6 + y2 * s, s };
    }

    const pts = [], edges = [];
    for (let f = 0; f <= floors; f++) {
      const y = -f * floorH + (floors * floorH) / 2;
      pts.push({ x: -w/2, y, z: -d/2 }, { x: w/2, y, z: -d/2 },
                { x:  w/2, y, z:  d/2 }, { x: -w/2, y, z: d/2 });
    }
    for (let f = 0; f <= floors; f++) {
      const b = f * 4;
      edges.push([b,b+1,'h'],[b+1,b+2,'h'],[b+2,b+3,'h'],[b+3,b,'h']);
    }
    for (let f = 0; f < floors; f++) {
      const b = f * 4;
      edges.push([b,b+4,'v'],[b+1,b+5,'v'],[b+2,b+6,'v'],[b+3,b+7,'v']);
    }

    let rot = idx * 1.1;
    const phaseOffset = idx * 0.9;

    function draw(t) {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const rY = rot;
      const rX = -0.25 + Math.sin(t * 0.4 + phaseOffset) * 0.06;
      const projected = pts.map(p => proj(p.x, p.y, p.z, rY, rX));

      for (let f = 0; f < floors; f++) {
        const b = f * 4;
        const p0 = projected[b], p1 = projected[b+1],
              p2 = projected[b+2], p3 = projected[b+3];
        const alpha = 0.04 + (f / floors) * 0.04;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy); ctx.lineTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy); ctx.lineTo(p3.sx, p3.sy);
        ctx.closePath();
        ctx.fillStyle = `rgba(0,201,255,${alpha})`;
        ctx.fill();
      }

      for (const [a, b2, type] of edges) {
        const pa = projected[a], pb = projected[b2];
        const depth = (pa.s + pb.s) / 2;
        const alpha = (type === 'v' ? 0.55 : 0.3) * depth;
        const color = type === 'v' ? color1 : color2;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy);
        ctx.strokeStyle = color + (alpha < 1 ? Math.round(alpha * 255).toString(16).padStart(2,'0') : 'ff');
        ctx.lineWidth = type === 'v' ? 1.2 : 0.7;
        ctx.stroke();
      }

      for (let i = 0; i < projected.length; i += 4) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = color1 + '80';
        ctx.fill();
      }

      ctx.font = '700 9px Space Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillText(label, W / 2, H - 12);

      const scanLineY = H * 0.1 + (H * 0.8) * ((t * 0.3 + phaseOffset) % 1);
      const scanGrad = ctx.createLinearGradient(0, scanLineY - 8, 0, scanLineY + 8);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, color1 + '22');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 8, W, 16);
    }

    let startT = null;
    function animate(ts) {
      if (!startT) startT = ts;
      rot += 0.008;
      draw((ts - startT) * 0.001);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });
})();


/* ── 3. CARD SELECTION + NAVIGATION ── */
(function () {
  const cards        = document.querySelectorAll('.bcard');
  const selectedName = document.getElementById('selectedName');
  const launchBtn    = document.getElementById('launchBtn');
  const transOverlay = document.getElementById('transOverlay');
  const trIcon       = document.getElementById('trIcon');
  const trName       = document.getElementById('trName');
  const trTxt        = document.getElementById('trTxt');

  const buildingIcons = {
    edificio3:    '🏗️',
    campoDourique:'🏢',
    ribeiro:      '🏛️',
    faerac:       '⚙️',
    golden:       '🏆',
    casaMG:       '🏠',
  };

  const loadTexts = {
    edificio3:    ['Cargando pórticos...', 'Inicializando simulación...', 'Listo para análisis'],
    campoDourique:['Cargando losas planas...', 'Procesando núcleo central...', 'Listo para análisis'],
    ribeiro:      ['Cargando sistema mixto...', 'Inicializando pilotes...', 'Listo para análisis'],
    faerac:       ['Cargando perfiles de acero...', 'Procesando arriostramientos...', 'Listo para análisis'],
    golden:       ['Cargando torre Golden...', 'Procesando 20+ niveles...', 'Listo para análisis'],
    casaMG:       ['Cargando vivienda...', 'Procesando muros y losas...', 'Listo para análisis'],
  };

  let currentId   = 'edificio3';
  let currentFile = 'viewer.html';

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentId   = card.dataset.id;
      currentFile = card.dataset.file;
      selectedName.textContent = card.dataset.name;
    });

    card.querySelector('.bcard-cta').addEventListener('click', e => {
      e.stopPropagation();
      card.click();
      setTimeout(launch, 150);
    });
  });

  function launch() {
    trIcon.textContent = buildingIcons[currentId] || '🏗️';
    trName.textContent = selectedName.textContent;
    transOverlay.classList.add('active');

    const steps = loadTexts[currentId] || loadTexts.edificio3;
    let step = 0;
    trTxt.textContent = steps[0];

    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        trTxt.textContent = steps[step];
      } else {
        clearInterval(interval);
        setTimeout(() => { window.location.href = currentFile; }, 300);
      }
    }, 380);
  }

  launchBtn.addEventListener('click', launch);

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launch(); }
    if (e.key === '1') cards[0]?.click();
    if (e.key === '2') cards[1]?.click();
    if (e.key === '3') cards[2]?.click();
  });
})();