/* ============================================================
   METABOLISMO.JS — PharmaLab Chile | Unidad 4
   Iniciales: MB — 4 escenas 3D + Hero:
   HERO: ATP Sintasa F₀F₁ rotante
   3D-1: Glucólisis — 10 pasos animados
   3D-2: Ciclo de Krebs — 8 reacciones orbitales
   3D-3: Fosforilación Oxidativa — cadena respiratoria + ATP sintasa
   3D-4: Red Metabólica Integrada — β-oxidación, urea, cuerpos cetónicos
   ============================================================ */

'use strict';

const MB = (() => {

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ══════════════════════════════════════════════════════════
     MOTOR 3D — Proyección perspectiva + rotación Euler
  ══════════════════════════════════════════════════════════ */
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
  function torusRing(R, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push([R * Math.cos(a), 0, R * Math.sin(a)]);
    }
    return pts;
  }
  function helixPts(r, height, turns, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * turns * Math.PI * 2;
      pts.push([r * Math.cos(t), (i / n) * height - height / 2, r * Math.sin(t)]);
    }
    return pts;
  }
  function setupCanvas(canvas, forceH) {
    const dpr = window.devicePixelRatio || 1;
    const isHero = canvas.id === 'mb-hero-canvas';
    const H = forceH || (isHero ? 390 : 330);
    let w = 0, el = canvas;
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
    if (r <= 0.3) return;
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
  function legend(ctx, items, x0, y0) {
    x0 = x0 || 10; y0 = y0 || 14;
    ctx.font = '10px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
    items.forEach((l, i) => {
      ctx.fillStyle = l.c; ctx.beginPath(); ctx.arc(x0 + 5, y0 + i * 18, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.fillText(l.t, x0 + 18, y0 + 4 + i * 18);
    });
  }

  /* ══════════════════════════════════════════════════════════
     HERO — ATP Sintasa F₀F₁ — Motor Molecular Rotante
     Anillo c (F₀) rotando en membrana → eje γ → subunidades β
  ══════════════════════════════════════════════════════════ */
  function drawHero(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 700;
    const st = { rx: 0.2, ry: 0, auto: true };
    addDrag(canvas, st);

    // Membrana (plano horizontal de partículas)
    const MEM = [];
    for (let x = -160; x <= 160; x += 18) {
      for (let z = -160; z <= 160; z += 18) {
        const r = Math.sqrt(x*x + z*z);
        if (r < 165) MEM.push({ p:[x, 20, z], c:'#f59e0b', r:1.8, type:'mem' });
      }
    }

    // Anillo c (F₀) — 10 subunidades c en círculo, embebidas en membrana
    const RING_C = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const rx = 38 * Math.cos(a), rz = 38 * Math.sin(a);
      spherePts(8, 18).forEach(p => RING_C.push({ p:[p[0]+rx, p[1]+10, p[2]+rz], c:'#ef4444', r:2.5, type:'c', idx:i }));
    }

    // Eje γ — espiral desde F₀ hasta F₁
    const SHAFT = helixPts(6, 90, 2, 40).map(p => ({ p:[p[0], p[1]-50, p[2]], c:'#fbbf24', r:2.8, type:'shaft' }));

    // Subunidades α₃β₃ (F₁) — 6 segmentos en corona
    const F1 = [];
    const F1_COLORS = ['#f59e0b','#10b981','#f59e0b','#10b981','#f59e0b','#10b981'];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const cx2 = 52 * Math.cos(a), cz2 = 52 * Math.sin(a);
      spherePts(16, 30).forEach(p => F1.push({ p:[p[0]+cx2, p[1]-90, p[2]+cz2], c:F1_COLORS[i], r:2.8, type:'f1', sub:i%2===0?'alpha':'beta' }));
    }

    // Protones fluyendo (H⁺) de espacio intermembrana → F₀
    const PROTONS = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, dist = 70;
      PROTONS.push({ p:[dist*Math.cos(a), 60+i*5, dist*Math.sin(a)], c:'#06b6d4', r:3.5, type:'h', phase:i*0.45 });
    }

    // ATP moléculas liberadas
    const ATPS = [];
    for (let i = 0; i < 5; i++) {
      const a = (i/5)*Math.PI*2;
      ATPS.push({ p:[90*Math.cos(a), -110, 90*Math.sin(a)], c:'#10b981', r:5, type:'atp', phase:i*0.62 });
    }

    const ALL = [...MEM, ...RING_C, ...SHAFT, ...F1, ...PROTONS, ...ATPS];
    let t = 0, rotAngle = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) { st.ry += 0.004; rotAngle += 0.025; }
      t += 0.016;

      // Anillo c y eje giran juntos (rotAngle)
      const allAnim = ALL.map(pt => {
        if (pt.type === 'c' || pt.type === 'shaft') {
          const cosR = Math.cos(rotAngle), sinR = Math.sin(rotAngle);
          const nx = pt.p[0]*cosR - pt.p[2]*sinR;
          const nz = pt.p[0]*sinR + pt.p[2]*cosR;
          return {...pt, p:[nx, pt.p[1], nz]};
        }
        if (pt.type === 'h') {
          // Protones fluyendo hacia abajo (del espacio intermembrana al canal F₀)
          const yr = ((pt.p[1] + 80 - t * 18 * (0.6 + pt.phase*0.1)) % 80 + 80) % 80 - 30;
          return {...pt, p:[pt.p[0], yr, pt.p[2]]};
        }
        if (pt.type === 'atp') {
          const pulse = 1 + 0.15*Math.sin(t*1.2 + pt.phase);
          return {...pt, p:[pt.p[0]*pulse, pt.p[1] - Math.sin(t*0.5+pt.phase)*8, pt.p[2]*pulse]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Glow central
      glow3d(ctx, CX, CY + 30, 120, '#f59e0b');
      glow3d(ctx, CX, CY - 40, 70, '#ef4444');

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'mem') {
          ctx.globalAlpha = 0.30;
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#f59e0baa'); g.addColorStop(1,'#f59e0b11');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
          ctx.globalAlpha = 1;
        } else if (d.type === 'c') {
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        } else if (d.type === 'shaft') {
          sphere3d(ctx,d.x,d.y,rad,'#fbbf24');
          glow3d(ctx,d.x,d.y,rad*1.5,'#fbbf24');
        } else if (d.type === 'f1') {
          sphere3d(ctx,d.x,d.y,rad,d.sub==='beta'?'#10b981':'#f59e0b');
          if (d.sub==='beta') glow3d(ctx,d.x,d.y,rad*1.3,'#10b981');
        } else if (d.type === 'h') {
          sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
          glow3d(ctx,d.x,d.y,rad*2,'#06b6d4');
        } else if (d.type === 'atp') {
          sphere3d(ctx,d.x,d.y,rad,'#10b981');
          glow3d(ctx,d.x,d.y,rad*2.2,'#10b981');
          ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.fillText('ATP',d.x,d.y+rad+10);
        }
      });

      // Etiquetas fijas
      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(245,158,11,0.85)';
      ctx.fillText('ATP Sintasa F\u2080F\u2081 \u2014 Motor Molecular Mitocondrial', CX, H - 18);

      legend(ctx, [
        {c:'#f59e0b', t:'Membrana interna mitocondrial'},
        {c:'#ef4444', t:'Anillo c (F\u2080) \u2014 canal de protones'},
        {c:'#fbbf24', t:'Eje \u03b3 \u2014 rotor central'},
        {c:'#10b981', t:'Subunidad \u03b2 (F\u2081) \u2014 s\u00edntesis ATP'},
        {c:'#06b6d4', t:'H\u207a fluyendo (fuerza protomotriz)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-1: GLUCÓLISIS — 10 pasos enzimáticos
     Nodos de metabolitos en ciclo, con electrones pasando entre enzimas
  ══════════════════════════════════════════════════════════ */
  function drawGlucolisis(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W/2, CY = H/2, FOV = 650;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // 10 nodos de metabolitos en espiral descendente
    const METABOLITES = [
      { name:'Glucosa',           color:'#f59e0b', r:9 },
      { name:'G-6-P',             color:'#fbbf24', r:7 },
      { name:'F-6-P',             color:'#f59e0b', r:7 },
      { name:'F-1,6-bisP',        color:'#ef4444', r:8 },
      { name:'DHAP / G-3-P',      color:'#ef4444', r:6 },
      { name:'1,3-bisPG',         color:'#a855f7', r:7 },
      { name:'3-PG',              color:'#a855f7', r:6 },
      { name:'2-PG',              color:'#06b6d4', r:6 },
      { name:'PEP',               color:'#06b6d4', r:7 },
      { name:'Piruvato',          color:'#10b981', r:9 },
    ];
    const NODES = METABOLITES.map((m, i) => {
      const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const radius = 80, yOff = (i/10)*60 - 30;
      return { p:[radius*Math.cos(angle), yOff, radius*Math.sin(angle)], ...m, idx:i };
    });

    // Partículas decorativas (electrones / energía)
    const PARTICLES = [];
    for (let i = 0; i < 30; i++) {
      const a = (i/30)*Math.PI*2, r = 115 + (i%3)*15;
      PARTICLES.push({ p:[r*Math.cos(a),(i%5-2)*25,r*Math.sin(a)], c:'rgba(245,158,11,0.6)', r:1.5, type:'par', phase:i*0.22 });
    }

    // ATP/ADP pares
    const ATPS = [];
    for (let i = 0; i < 4; i++) {
      const a = (i/4)*Math.PI*2;
      ATPS.push({ p:[55*Math.cos(a), -50 + i*35, 55*Math.sin(a)], c:'#10b981', r:4, type:'atp', phase:i*0.5 });
    }

    // NADH moléculas
    const NADHS = [];
    for (let i = 0; i < 2; i++) {
      const a = i * Math.PI;
      NADHS.push({ p:[130*Math.cos(a), 20, 130*Math.sin(a)], c:'#06b6d4', r:5, type:'nadh', phase:i*1.6 });
    }

    let t = 0, activeStep = 0, stepTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.0045;
      t += 0.016; stepTimer += 0.016;
      if (stepTimer > 1.0) { activeStep = (activeStep + 1) % 10; stepTimer = 0; }

      const allAnim = [
        ...NODES.map((nd, i) => {
          // El nodo activo pulsa
          const pulse = nd.idx === activeStep ? 1 + 0.25*Math.sin(t*5) : 1;
          return {...nd, r: nd.r * pulse};
        }),
        ...PARTICLES.map(pt => {
          const a = t*0.35 + pt.phase;
          const dist = 115 + 12*Math.sin(t*0.7+pt.phase);
          return {...pt, p:[dist*Math.cos(a), pt.p[1]+Math.sin(t+pt.phase)*6, dist*Math.sin(a)]};
        }),
        ...ATPS.map(pt => {
          const py = pt.p[1] + Math.sin(t*1.1+pt.phase)*10;
          return {...pt, p:[pt.p[0], py, pt.p[2]]};
        }),
        ...NADHS.map(pt => {
          const a = t*0.2 + pt.phase;
          return {...pt, p:[130*Math.cos(a), pt.p[1], 130*Math.sin(a)]};
        }),
      ];

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Glow fondo
      glow3d(ctx, CX, CY, 110, '#f59e0b');

      // Conexiones entre nodos (flechas de reacción)
      const nodeProj = proj.slice(0, 10);
      ctx.lineWidth = 1.2; ctx.setLineDash([3,4]);
      for (let i = 0; i < 10; i++) {
        const a = nodeProj[i], b = nodeProj[(i+1)%10];
        const isActive = i === activeStep;
        ctx.strokeStyle = isActive ? 'rgba(245,158,11,0.85)' : 'rgba(245,158,11,0.18)';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
      ctx.setLineDash([]);

      // Renderizar por profundidad
      [...proj].sort((a,b) => a.z - b.z).forEach((d, _i) => {
        const rad = d.r * d.d;
        if (!d.type) {
          // Nodo metabolito
          const isActive2 = d.idx === activeStep;
          sphere3d(ctx, d.x, d.y, rad, d.color);
          if (isActive2) {
            glow3d(ctx, d.x, d.y, rad*3, d.color);
            ctx.font='bold 9px "JetBrains Mono",monospace'; ctx.textAlign='center';
            ctx.fillStyle=d.color+'ee'; ctx.fillText(d.name, d.x, d.y + rad + 11);
          }
        } else if (d.type === 'par') {
          ctx.fillStyle = '#f59e0b44';
          ctx.beginPath(); ctx.arc(d.x,d.y,Math.max(rad,1),0,Math.PI*2); ctx.fill();
        } else if (d.type === 'atp') {
          sphere3d(ctx,d.x,d.y,rad,'#10b981');
          glow3d(ctx,d.x,d.y,rad*2,'#10b981');
          ctx.font='bold 7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(16,185,129,0.8)'; ctx.fillText('ATP',d.x,d.y+rad+9);
        } else if (d.type === 'nadh') {
          sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
          glow3d(ctx,d.x,d.y,rad*2,'#06b6d4');
          ctx.font='bold 7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.fillText('NADH',d.x,d.y+rad+9);
        }
      });

      // Etiqueta paso activo
      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(245,158,11,0.85)';
      ctx.fillText(`Paso ${activeStep+1}/10 — ${METABOLITES[activeStep].name} — Gluc\u00f3lisis · Citosol`, CX, H-18);

      legend(ctx,[
        {c:'#f59e0b', t:'Metabolito glucol\u00edtico (activo)'},
        {c:'#10b981', t:'ATP producido (net +2 por glucosa)'},
        {c:'#06b6d4', t:'NADH generado (x2 por glucosa)'},
        {c:'#ef4444', t:'F-1,6-bisP — punto de no retorno (PFK-1)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-2: CICLO DE KREBS — 8 reacciones orbitando
     Anillo de 8 intermediarios con flujo de electrones visibles
  ══════════════════════════════════════════════════════════ */
  function drawKrebs(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W/2, CY = H/2, FOV = 660;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    const KREBS_INTERMEDIATES = [
      { name:'Oxaloacetato', color:'#f59e0b', r:9,  co:'OAA'   },
      { name:'Citrato',      color:'#fbbf24', r:8,  co:'CIT'   },
      { name:'Isocitrato',   color:'#f59e0b', r:7,  co:'ICIT'  },
      { name:'α-Cetoglut.',  color:'#ef4444', r:7,  co:'αKG'   },
      { name:'Succinil-CoA', color:'#a855f7', r:7,  co:'SCoA'  },
      { name:'Succinato',    color:'#a855f7', r:6,  co:'SUC'   },
      { name:'Fumarato',     color:'#06b6d4', r:6,  co:'FUM'   },
      { name:'L-Malato',     color:'#10b981', r:7,  co:'MAL'   },
    ];

    const RNODES = KREBS_INTERMEDIATES.map((m, i) => {
      const angle = (i / 8) * Math.PI * 2 - Math.PI/2;
      return { p:[90*Math.cos(angle), 0, 90*Math.sin(angle)], ...m, idx:i };
    });

    // Acetil-CoA entrando al ciclo (centro, pulsante)
    const ACETYL = [{ p:[0,0,0], color:'#fbbf24', r:11, type:'acetyl', name:'Acetil-CoA' }];

    // CO₂ saliendo (pasos 3 y 4)
    const CO2S = [];
    for (let i = 0; i < 6; i++) {
      const a = (i/6)*Math.PI*2;
      CO2S.push({ p:[140*Math.cos(a), (i%3-1)*30, 140*Math.sin(a)], c:'#ef444477', r:3.5, type:'co2', phase:i*0.52 });
    }

    // NADH / FADH₂ orbitando
    const COFACTORS = [];
    ['NADH','NADH','NADH','FADH₂','GTP'].forEach((name, i) => {
      const a = (i/5)*Math.PI*2;
      const isNADH = name==='NADH', isFAD = name==='FADH₂';
      COFACTORS.push({
        p:[60*Math.cos(a), (i%2)*40-20, 60*Math.sin(a)],
        c: isNADH ? '#06b6d4' : isFAD ? '#a855f7' : '#10b981',
        r:5, type:'cof', name, phase:i*0.65
      });
    });

    let t = 0, activeStep = 0, stepTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.0042;
      t += 0.016; stepTimer += 0.016;
      if (stepTimer > 1.1) { activeStep = (activeStep+1)%8; stepTimer = 0; }

      const allAnim = [
        ...RNODES.map(nd => {
          const pulse = nd.idx === activeStep ? 1 + 0.3*Math.sin(t*5) : 1;
          return {...nd, r: nd.r * pulse};
        }),
        ...ACETYL.map(nd => ({...nd, r: nd.r*(1+0.15*Math.sin(t*2))})),
        ...CO2S.map(pt => {
          const dist = 140 + 15*Math.cos(t*0.5 + pt.phase);
          const a = t*0.18 + pt.phase;
          return {...pt, p:[dist*Math.cos(a), pt.p[1]+Math.sin(t+pt.phase)*5, dist*Math.sin(a)]};
        }),
        ...COFACTORS.map(pt => {
          const a = t*0.28 + pt.phase;
          const dist = 60 + 8*Math.sin(t*0.9+pt.phase);
          return {...pt, p:[dist*Math.cos(a), pt.p[1]+Math.cos(t*0.6+pt.phase)*10, dist*Math.sin(a)]};
        }),
      ];

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      glow3d(ctx, CX, CY, 100, '#f59e0b');
      glow3d(ctx, CX, CY, 45, '#fbbf24');

      // Arco del ciclo
      const rnodeProj = proj.slice(0, 8);
      ctx.setLineDash([4,5]);
      for (let i = 0; i < 8; i++) {
        const a = rnodeProj[i], b = rnodeProj[(i+1)%8];
        const isActive = i === activeStep;
        ctx.strokeStyle = isActive ? 'rgba(245,158,11,0.9)' : 'rgba(245,158,11,0.15)';
        ctx.lineWidth = isActive ? 2.5 : 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        // Línea al centro (acetil-CoA)
        if (i === 0) {
          const cen = proj[8];
          ctx.strokeStyle = 'rgba(251,191,36,0.35)';
          ctx.lineWidth = 1.5; ctx.setLineDash([2,4]);
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(cen.x,cen.y); ctx.stroke();
        }
      }
      ctx.setLineDash([]);

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (!d.type) {
          sphere3d(ctx,d.x,d.y,rad,d.color);
          const isActive2 = d.idx === activeStep;
          if (isActive2) {
            glow3d(ctx,d.x,d.y,rad*3,d.color);
            ctx.font='bold 9px "JetBrains Mono",monospace'; ctx.textAlign='center';
            ctx.fillStyle=d.color+'ee'; ctx.fillText(d.co, d.x, d.y + rad + 11);
          }
        } else if (d.type === 'acetyl') {
          sphere3d(ctx,d.x,d.y,rad,'#fbbf24');
          glow3d(ctx,d.x,d.y,rad*2.5,'#fbbf24');
          ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(251,191,36,0.9)'; ctx.fillText('Acetil-CoA',d.x,d.y+rad+11);
        } else if (d.type === 'co2') {
          ctx.globalAlpha = 0.55;
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
          ctx.globalAlpha = 1;
          ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(239,68,68,0.6)'; ctx.fillText('CO₂',d.x,d.y+rad+8);
        } else if (d.type === 'cof') {
          sphere3d(ctx,d.x,d.y,rad,d.c);
          glow3d(ctx,d.x,d.y,rad*2,d.c);
          ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle=d.c+'cc'; ctx.fillText(d.name,d.x,d.y+rad+9);
        }
      });

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(245,158,11,0.85)';
      ctx.fillText(`Paso ${activeStep+1}/8 — ${KREBS_INTERMEDIATES[activeStep].name} — Ciclo de Krebs`, CX, H-18);

      legend(ctx,[
        {c:'#f59e0b', t:'Intermediarios del Ciclo (8 nodos)'},
        {c:'#fbbf24', t:'Acetil-CoA — sustrato de entrada (2C)'},
        {c:'#06b6d4', t:'NADH generado (3 por vuelta)'},
        {c:'#a855f7', t:'FADH\u2082 (Complejo II cadena resp.)'},
        {c:'#ef4444', t:'CO\u2082 liberado (2 por vuelta)'},
        {c:'#10b981', t:'GTP — fosforilaci\u00f3n a nivel sustrato'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-3: FOSFORILACIÓN OXIDATIVA — Cadena respiratoria
     Complejos I-IV en membrana + flujo de electrones + ATP sintasa
  ══════════════════════════════════════════════════════════ */
  function drawFosforilacion(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W/2, CY = H/2, FOV = 660;
    const st = { rx: 0.12, ry: 0, auto: true };
    addDrag(canvas, st);

    const COMPLEXES = [
      { name:'Complejo I', sub:'NADH DH', color:'#f59e0b', pos:[-130, 0, 0],   r:18 },
      { name:'Complejo II', sub:'Succ. DH', color:'#ef4444', pos:[-45,  0, 0],  r:14 },
      { name:'Complejo III',sub:'Cit. bc\u2081', color:'#a855f7', pos:[45,   0, 0],  r:16 },
      { name:'Complejo IV', sub:'Cox',     color:'#06b6d4', pos:[130,  0, 0],   r:16 },
    ];

    const CMPLX_PARTICLES = [];
    COMPLEXES.forEach((cx2, ci) => {
      spherePts(cx2.r, 40).forEach(p => {
        CMPLX_PARTICLES.push({ p:[p[0]+cx2.pos[0], p[1]+cx2.pos[1], p[2]+cx2.pos[2]], c:cx2.color, r:2.5, type:'cx', ci });
      });
    });

    // CoQ (ubiquinona) — lanzadera entre I/II → III
    const COQ = [];
    for (let i = 0; i < 6; i++) {
      const t2 = i/6;
      COQ.push({ p:[-80 + t2*125, 0, 20], c:'#fbbf24', r:4, type:'coq', phase:i*0.55 });
    }

    // Citocromo c — entre III → IV
    const CYTC = [];
    for (let i = 0; i < 4; i++) {
      CYTC.push({ p:[80 + i*18, 0, -20], c:'#10b981', r:4.5, type:'cytc', phase:i*0.4 });
    }

    // Membrana
    const MEM2 = [];
    for (let x = -180; x <= 180; x += 14) {
      for (let z = -90; z <= 90; z += 14) {
        MEM2.push({ p:[x, 10, z], c:'#f59e0b', r:1.5, type:'mem2' });
      }
    }

    // H⁺ bombeados al espacio intermembrana
    const PROTONS2 = [];
    for (let i = 0; i < 18; i++) {
      const xp = -160 + i*18;
      PROTONS2.push({ p:[xp, -50, (i%3-1)*15], c:'#06b6d4', r:3, type:'pr2', phase:i*0.3 });
    }

    // O₂ siendo reducido en complejo IV
    const OXYGEN = [
      { p:[160, 20, 30], c:'#ef4444', r:5, type:'o2' },
      { p:[170, 20, -30], c:'#ef4444', r:5, type:'o2' },
    ];

    // ATP sintasa (pequeña, a la derecha)
    const ATPSYN = spherePts(20, 35).map(p => ({
      p:[p[0]+185, p[1], p[2]], c:'#10b981', r:2.5, type:'atpsyn'
    }));

    const ALL2 = [...MEM2, ...CMPLX_PARTICLES, ...COQ, ...CYTC, ...PROTONS2, ...OXYGEN, ...ATPSYN];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.0035;
      t += 0.016;

      const allAnim = ALL2.map(pt => {
        if (pt.type === 'coq') {
          // CoQ oscilando entre Complejos I/II y III
          const xAnim = pt.p[0] + Math.sin(t*0.8 + pt.phase) * 8;
          const yAnim = Math.cos(t*1.2 + pt.phase) * 10;
          return {...pt, p:[xAnim, yAnim, pt.p[2]]};
        }
        if (pt.type === 'cytc') {
          const xAnim = pt.p[0] + Math.cos(t*0.9 + pt.phase)*6;
          return {...pt, p:[xAnim, pt.p[1]+Math.sin(t+pt.phase)*8, pt.p[2]]};
        }
        if (pt.type === 'pr2') {
          // Protones subiendo (espacio intermembrana = arriba)
          const yAnim = ((pt.p[1] + 60 + t*15*(0.5+pt.phase*0.1)) % 70 + 70) % 70 - 60;
          return {...pt, p:[pt.p[0], yAnim, pt.p[2]]};
        }
        if (pt.type === 'o2') {
          return {...pt, r: pt.r*(1+0.12*Math.sin(t*2))};
        }
        if (pt.type === 'atpsyn') {
          const cosR = Math.cos(t*1.5), sinR = Math.sin(t*1.5);
          const nx = (pt.p[0]-185)*cosR - pt.p[2]*sinR + 185;
          const nz = (pt.p[0]-185)*sinR + pt.p[2]*cosR;
          return {...pt, p:[nx, pt.p[1], nz]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Fondo glow por complejo
      COMPLEXES.forEach(cx2 => {
        const rp = rotate([[...cx2.pos]], st.rx, st.ry)[0];
        const pp = project(rp[0],rp[1],rp[2],FOV,CX,CY);
        glow3d(ctx,pp.x,pp.y,60,cx2.color);
      });

      // Línea de membrana
      ctx.strokeStyle='rgba(245,158,11,0.18)'; ctx.lineWidth=1; ctx.setLineDash([5,6]);
      const memY = CY + 8;
      ctx.beginPath(); ctx.moveTo(0,memY); ctx.lineTo(W,memY); ctx.stroke();
      ctx.setLineDash([]);

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'mem2') {
          ctx.globalAlpha = 0.18;
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#f59e0baa'); g.addColorStop(1,'#f59e0b11');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
          ctx.globalAlpha=1;
        } else if (d.type === 'cx') {
          sphere3d(ctx,d.x,d.y,rad,d.c);
        } else if (d.type === 'coq') {
          sphere3d(ctx,d.x,d.y,rad,'#fbbf24');
          glow3d(ctx,d.x,d.y,rad*2,'#fbbf24');
          ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(251,191,36,0.8)'; ctx.fillText('CoQ',d.x,d.y-rad-4);
        } else if (d.type === 'cytc') {
          sphere3d(ctx,d.x,d.y,rad,'#10b981');
          glow3d(ctx,d.x,d.y,rad*2,'#10b981');
          ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(16,185,129,0.8)'; ctx.fillText('cyt c',d.x,d.y-rad-4);
        } else if (d.type === 'pr2') {
          sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
          glow3d(ctx,d.x,d.y,rad*1.8,'#06b6d4');
          ctx.font='8px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(6,182,212,0.75)'; ctx.fillText('H\u207a',d.x,d.y-rad-3);
        } else if (d.type === 'o2') {
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
          glow3d(ctx,d.x,d.y,rad*2,'#ef4444');
          ctx.font='8px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(239,68,68,0.85)'; ctx.fillText('\u00bfO\u2082\u2192H\u2082O?',d.x,d.y+rad+11);
        } else if (d.type === 'atpsyn') {
          sphere3d(ctx,d.x,d.y,rad,'#10b981');
        }
      });

      // Etiquetas de complejos
      COMPLEXES.forEach(cx2 => {
        const rp = rotate([[...cx2.pos]], st.rx, st.ry)[0];
        const pp = project(rp[0],rp[1],rp[2],FOV,CX,CY);
        ctx.font='bold 9px "JetBrains Mono",monospace'; ctx.textAlign='center';
        ctx.fillStyle=cx2.color+'cc'; ctx.fillText(cx2.name,pp.x,pp.y-22);
        ctx.font='8px "JetBrains Mono",monospace';
        ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.fillText(cx2.sub,pp.x,pp.y-11);
      });

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(245,158,11,0.85)';
      ctx.fillText('Cadena Respiratoria + ATP Sintasa \u2014 Membrana Interna Mitocondrial', CX, H-18);

      legend(ctx,[
        {c:'#f59e0b', t:'Complejo I \u2014 NADH deshidrogenasa (4H\u207a bombeados)'},
        {c:'#ef4444', t:'Complejo II \u2014 Succinato deshidrogenasa (0H\u207a)'},
        {c:'#a855f7', t:'Complejo III \u2014 Citocromo bc\u2081 (4H\u207a)'},
        {c:'#06b6d4', t:'Complejo IV \u2014 Citocromo c oxidasa + O\u2082\u2192H\u2082O (2H\u207a)'},
        {c:'#fbbf24', t:'Ubiquinona (CoQ) \u2014 lanzadera lipof\u00edlica'},
        {c:'#10b981', t:'Citocromo c / ATP Sintasa (F\u2080F\u2081)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-4: RED METABÓLICA INTEGRADA — β-oxidación + urea + cuerpos cetónicos
     Nodos metabólicos conectados con flujo de partículas
  ══════════════════════════════════════════════════════════ */
  function drawLipidos(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W/2, CY = H/2, FOV = 640;
    const st = { rx: 0.16, ry: 0, auto: true };
    addDrag(canvas, st);

    // Hubs metabólicos principales
    const HUBS = [
      { name:'Acetil-CoA',   color:'#fbbf24', pos:[0,0,0],       r:14, type:'hub' },
      { name:'Ciclo Krebs',  color:'#f59e0b', pos:[80,30,30],    r:11, type:'hub' },
      { name:'β-Oxidación',  color:'#ef4444', pos:[-80,30,-30],  r:10, type:'hub' },
      { name:'Cetogénesis',  color:'#a855f7', pos:[0,-70,60],    r:9,  type:'hub' },
      { name:'Ciclo Urea',   color:'#06b6d4', pos:[-80,-40,60],  r:9,  type:'hub' },
      { name:'Gluconeog.',   color:'#10b981', pos:[80,-40,-60],  r:9,  type:'hub' },
      { name:'Ac. Palmítico',color:'#ef4444', pos:[-140,50,-20], r:7,  type:'hub' },
      { name:'Urea',         color:'#06b6d4', pos:[-120,-80,80], r:6,  type:'hub' },
      { name:'Cuerpos Cet.', color:'#a855f7', pos:[0,-120,80],   r:6,  type:'hub' },
    ];

    // Partículas de flujo entre hubs
    const FLOWS = [];
    const CONNECTIONS = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[2,6],[4,7],[3,8],[6,2],[1,5]
    ];
    CONNECTIONS.forEach(([from, to]) => {
      for (let i = 0; i < 5; i++) {
        const phase = i/5;
        FLOWS.push({
          from, to, phase,
          c: HUBS[from].color, r:2.5, type:'flow',
          progress: phase
        });
      }
    });

    // Moléculas de NADH flotando
    const NADH2 = [];
    for (let i = 0; i < 6; i++) {
      const a = (i/6)*Math.PI*2;
      NADH2.push({ p:[115*Math.cos(a), (i%3-1)*25, 115*Math.sin(a)], c:'#06b6d4', r:4, type:'nadh2', phase:i*0.52 });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      // Actualizar progreso de flujos
      FLOWS.forEach(f => {
        f.progress = (f.progress + 0.008) % 1;
        const from = HUBS[f.from].pos, to = HUBS[f.to].pos;
        f.p = [
          from[0] + (to[0]-from[0])*f.progress,
          from[1] + (to[1]-from[1])*f.progress,
          from[2] + (to[2]-from[2])*f.progress,
        ];
      });

      const NADH2Anim = NADH2.map(pt => {
        const a = t*0.25 + pt.phase;
        return {...pt, p:[115*Math.cos(a), pt.p[1]+Math.sin(t+pt.phase)*8, 115*Math.sin(a)]};
      });

      const allPts = [
        ...HUBS.map(h => ({...h, p:h.pos, r:h.r*(1+0.08*Math.sin(t*1.5))})),
        ...FLOWS.map(f => ({...f, r:f.r})),
        ...NADH2Anim,
      ];

      const rot  = rotate(allPts.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({...allPts[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Glow central (Acetil-CoA)
      glow3d(ctx, proj[0].x, proj[0].y, 120, '#fbbf24');

      // Dibujar arcos de conexión
      ctx.setLineDash([3,5]);
      CONNECTIONS.forEach(([from, to]) => {
        const rp_from = rotate([[...HUBS[from].pos]], st.rx, st.ry)[0];
        const rp_to   = rotate([[...HUBS[to].pos]],   st.rx, st.ry)[0];
        const pp_from = project(rp_from[0],rp_from[1],rp_from[2],FOV,CX,CY);
        const pp_to   = project(rp_to[0],rp_to[1],rp_to[2],FOV,CX,CY);
        ctx.strokeStyle = HUBS[from].color + '22';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pp_from.x,pp_from.y); ctx.lineTo(pp_to.x,pp_to.y); ctx.stroke();
      });
      ctx.setLineDash([]);

      [...proj].sort((a,b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'hub') {
          sphere3d(ctx,d.x,d.y,rad,d.color);
          glow3d(ctx,d.x,d.y,rad*2.2,d.color);
          ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle=d.color+'dd'; ctx.fillText(d.name, d.x, d.y+rad+12);
        } else if (d.type === 'flow') {
          sphere3d(ctx,d.x,d.y,rad,d.c);
          glow3d(ctx,d.x,d.y,rad*1.5,d.c);
        } else if (d.type === 'nadh2') {
          sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
          glow3d(ctx,d.x,d.y,rad*2,'#06b6d4');
          ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.fillText('NADH',d.x,d.y+rad+9);
        }
      });

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(245,158,11,0.85)';
      ctx.fillText('Red Metab\u00f3lica Integrada \u2014 \u03b2-Oxidaci\u00f3n · Cuerpos Cet\u00f3nicos · Ciclo Urea', CX, H-18);

      legend(ctx,[
        {c:'#fbbf24', t:'Acetil-CoA \u2014 nodo central del metabolismo'},
        {c:'#ef4444', t:'\u03b2-Oxidaci\u00f3n \u2014 \u00e1cidos grasos (ac. palm\u00edtico: 129 ATP)'},
        {c:'#a855f7', t:'Cetog\u00e9nesis \u2014 cuerpos cet\u00f3nicos (ayuno/dieta cetog\u00e9nica)'},
        {c:'#06b6d4', t:'Ciclo de la Urea \u2014 eliminaci\u00f3n de NH\u2084\u207a'},
        {c:'#10b981', t:'Gluconeog\u00e9nesis \u2014 s\u00edntesis de glucosa desde OAA'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     TABS — lazy canvas init
  ══════════════════════════════════════════════════════════ */
  function initTabs(canvasMap) {
    const btns   = $$('.mb-tab-btn');
    const panels = $$('.mb-panel');
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
                const wrap = c.closest('.mb-3d');
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
      btns.forEach((b,j) => b.classList.toggle('active', j===i));
      panels.forEach((p,j) => p.classList.toggle('active', j===i));
      initPanelCanvas(i);
    }
    btns.forEach((btn,i) => btn.addEventListener('click', () => activate(i)));
    activate(0);
  }

  /* ── CONTADORES ── */
  function initCounters() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.mbCount);
        const suf = el.dataset.mbSuf || '';
        const dec = +(el.dataset.mbDec || 0);
        const dur = 1800;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now-start)/dur,1), ease = 1-Math.pow(1-prog,3);
          el.textContent = (ease*target).toFixed(dec)+suf;
          if (prog<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold:0.5 });
    $$('[data-mb-count]').forEach(e => io.observe(e));
  }

  /* ── REVEAL ── */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('mb-revealed'); io.unobserve(e.target); }
      });
    }, { threshold:0.08, rootMargin:'0px 0px -30px 0px' });
    $$('[data-mb-reveal]').forEach(el => io.observe(el));
  }

  /* ── INIT ── */
  function init() {
    const canvasMap = {
      'mb-canvas-glucolisis':    drawGlucolisis,
      'mb-canvas-krebs':         drawKrebs,
      'mb-canvas-fosforilacion': drawFosforilacion,
      'mb-canvas-lipidos':       drawLipidos,
    };
    initTabs(canvasMap);
    initCounters();
    initReveal();

    // Hero canvas robusto con ResizeObserver
    (function initHeroCanvas() {
      const hc = document.getElementById('mb-hero-canvas');
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
        const heroVis = hc.closest('.mb-hero-vis') || hc.parentElement;
        if (heroVis) ro.observe(heroVis);
        setTimeout(() => { ro.disconnect(); tryDraw(); }, 3000);
      } else {
        setTimeout(tryDraw, 400);
      }
    })();

    // Navbar scroll
    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive:true });

    // Mobile nav toggle
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

  return { version:'1.0.0', module:'MB-MetabolismoBioenergetica' };
})();
