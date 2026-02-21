/* ============================================================
   ENZIMOLOGIA-MODERNA.JS — PharmaLab Chile | Unidad 3
   Iniciales: EM — 4 escenas 3D:
   Michaelis-Menten | Inhibicion | Alosterismo | Farmacologia
   ============================================================ */

'use strict';

const EM = (() => {

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
    const isHero = canvas.id === 'em-hero-canvas';
    const H = isHero ? 390 : 330;
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
  function legend(ctx, items, x0, y0) {
    x0 = x0 || 10; y0 = y0 || 14;
    ctx.font = '10px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
    items.forEach((l, i) => {
      ctx.fillStyle = l.c; ctx.beginPath(); ctx.arc(x0 + 5, y0 + i * 18, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.fillText(l.t, x0 + 18, y0 + 4 + i * 18);
    });
  }

  /* ================================================================
     HERO — Complejo E+S con saturacion y productos fluyendo
  ================================================================ */
  function drawHero(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 680;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    // Enzima globular grande
    const ENZ = spherePts(70, 80).map(p => ({ p, c: '#10b981', r: 3.5, type: 'e' }));

    // Sitio activo — hendidura con residuos clave
    const SITE = [
      { p: [0, 0, 70], c: '#ef4444', r: 7, type: 'as' },
      { p: [18, -8, 65], c: '#06b6d4', r: 6, type: 'as' },
      { p: [-18, -8, 65], c: '#f59e0b', r: 6, type: 'as' },
    ];

    // Sustratos en varios estados (libre, unido, producto)
    const SUBSTRATES = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const dist = 100 + (i % 2) * 20;
      SUBSTRATES.push({ p: [dist * Math.cos(a), (i % 3 - 1) * 30, dist * Math.sin(a)], c: '#22d3ee', r: 5, type: 'sub', phase: i * 0.55 });
    }

    // Productos liberados (verde claro, fluyendo hacia afuera)
    const PRODUCTS = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      PRODUCTS.push({ p: [130 * Math.cos(a), (i % 4 - 2) * 25, 130 * Math.sin(a)], c: '#10b981', r: 3.5, type: 'prod', phase: i * 0.4 });
    }

    const ALL = [...ENZ, ...SITE, ...SUBSTRATES, ...PRODUCTS];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.005;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'sub') {
          // Sustratos orbitando y siendo atraidos
          const a = t * 0.4 + pt.phase;
          const dist = 95 + 15 * Math.sin(t * 0.8 + pt.phase);
          return { ...pt, p: [dist * Math.cos(a), pt.p[1] + Math.sin(t + pt.phase) * 5, dist * Math.sin(a)] };
        }
        if (pt.type === 'prod') {
          const a = t * 0.25 + pt.phase;
          const dist = 125 + 10 * Math.cos(t * 0.6 + pt.phase);
          return { ...pt, p: [dist * Math.cos(a), pt.p[1] + Math.cos(t * 1.1 + pt.phase) * 6, dist * Math.sin(a)] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...allAnim[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      glow3d(ctx, CX, CY, 100, '#10b981');
      glow3d(ctx, CX, CY, 55, '#06b6d4');

      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'e') {
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad);
          g.addColorStop(0, '#10b981aa'); g.addColorStop(1, '#10b98122');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, Math.PI * 2); ctx.fill();
        } else if (d.type === 'as') {
          sphere3d(ctx, d.x, d.y, rad * 1.1, d.c);
          glow3d(ctx, d.x, d.y, rad * 2, d.c);
        } else if (d.type === 'sub') {
          sphere3d(ctx, d.x, d.y, rad, '#22d3ee');
        } else if (d.type === 'prod') {
          sphere3d(ctx, d.x, d.y, rad, '#10b981');
        }
      });

      ctx.font = 'bold 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(16,185,129,0.8)'; ctx.fillText('E + S  ->  ES  ->  E + P', CX, H - 18);

      legend(ctx, [
        { c: '#10b981', t: 'Enzima (E)' },
        { c: '#22d3ee', t: 'Sustrato (S) acercandose' },
        { c: '#ef4444', t: 'Sitio activo (residuos catalit.)' },
        { c: '#10b981', t: 'Productos (P) liberados' },
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-1: MICHAELIS-MENTEN — Saturacion enzimatica visual
  ================================================================ */
  function drawMM(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.2, ry: 0, auto: true };
    addDrag(canvas, st);

    // Multiples enzimas (E) en espacio 3D
    const enzPos = [
      [0,0,0], [80,-20,30], [-80,-20,-30],
      [0,80,20], [0,-80,-20], [70,50,-40], [-70,50,40]
    ];
    const ENZYMES = [];
    enzPos.forEach(([ex,ey,ez], ei) => {
      spherePts(22, 30).forEach(p => ENZYMES.push({ p:[p[0]+ex, p[1]+ey, p[2]+ez], c:'#10b981', r:3, type:'e', ei }));
    });

    // Sustratos (S) — densidad variable simulando [S] creciente
    const SUBSTRATES = [];
    for (let i = 0; i < 35; i++) {
      const a = (i / 35) * Math.PI * 2 * 2.5;
      const r2 = 60 + (i % 5) * 22;
      const yy = (i % 7 - 3) * 28;
      SUBSTRATES.push({ p: [r2 * Math.cos(a), yy, r2 * Math.sin(a)], c: '#22d3ee', r: 3.5, type: 's', phase: i * 0.18 });
    }

    // Complejos ES (enzima saturada con sustrato)
    const ES_COMPLEX = [];
    [[80,-20,30],[-70,50,40]].forEach(([ex,ey,ez]) => {
      spherePts(26, 20).forEach(p => ES_COMPLEX.push({ p:[p[0]+ex, p[1]+ey, p[2]+ez], c:'#f59e0b', r:3.5, type:'es' }));
    });

    // Productos fluyendo (P)
    const PRODUCTS = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      PRODUCTS.push({ p: [155*Math.cos(a), (i%4-2)*20, 155*Math.sin(a)], c:'#a855f7', r:2.5, type:'p', phase:i*0.3 });
    }

    const ALL = [...ENZYMES, ...SUBSTRATES, ...ES_COMPLEX, ...PRODUCTS];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 's') {
          return { ...pt, p: [pt.p[0]+Math.sin(t+pt.phase)*4, pt.p[1]+Math.cos(t*0.9+pt.phase)*3, pt.p[2]] };
        }
        if (pt.type === 'p') {
          const prog = ((t*0.2 + pt.phase) % (Math.PI*2));
          return { ...pt, p: [pt.p[0]+Math.cos(prog)*8, pt.p[1]+Math.sin(prog*0.7)*5, pt.p[2]+Math.sin(prog)*6] };
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      enzPos.forEach(([ex,ey,ez]) => {
        const ep = project(ex,ey,ez,FOV,CX,CY);
        glow3d(ctx, ep.x, ep.y, 30, '#10b981');
      });

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'e') {
          const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b981aa'); g.addColorStop(1,'#10b98122');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if (d.type === 's') sphere3d(ctx,d.x,d.y,rad,'#22d3ee');
        else if (d.type === 'es') sphere3d(ctx,d.x,d.y,rad,'#f59e0b');
        else if (d.type === 'p') sphere3d(ctx,d.x,d.y,rad,'#a855f7');
      });

      // Etiqueta Vmax/Km
      ctx.font = 'bold 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(16,185,129,0.75)'; ctx.fillText('v0 = Vmax[S] / (Km + [S])', CX, H - 18);

      legend(ctx,[
        {c:'#10b981', t:'Enzima libre (E)'},
        {c:'#22d3ee', t:'Sustrato (S) — [S] variable'},
        {c:'#f59e0b', t:'Complejo ES (saturacion)'},
        {c:'#a855f7', t:'Productos P liberados'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-2: INHIBICION — Competitiva vs No Competitiva
  ================================================================ */
  function drawInhibicion(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    // Enzima izquierda: con inhibidor competitivo bloqueando sitio
    const ENZ_L = spherePts(55, 60).map(p => ({ p:[p[0]-90, p[1], p[2]], c:'#10b981', r:3.2, type:'el' }));
    const COMP_INH = spherePts(16, 22).map(p => ({ p:[p[0]-90, p[1]+5, p[2]+58], c:'#ef4444', r:3, type:'ci' }));
    // Sustrato rechazado (flotando cerca)
    const SUB_BLOCKED = [];
    for(let i=0;i<5;i++){
      const a=(i/5)*Math.PI*2;
      SUB_BLOCKED.push({p:[-90+28*Math.cos(a), 28*Math.sin(a), 70], c:'#22d3ee', r:3.5, type:'sb', phase:i*0.5});
    }

    // Enzima derecha: con inhibidor no competitivo en sitio alosterico
    const ENZ_R = spherePts(55, 60).map(p => ({ p:[p[0]+90, p[1], p[2]], c:'#10b981', r:3.2, type:'er' }));
    const NONCOMP_INH = spherePts(14, 18).map(p => ({ p:[p[0]+90, p[1]-55, p[2]+10], c:'#a855f7', r:3, type:'nc' }));
    // Sustrato unido pero sin catalisis eficiente
    const SUB_BOUND = spherePts(13, 18).map(p => ({ p:[p[0]+90, p[1]+5, p[2]+58], c:'#22d3ee', r:2.8, type:'ss' }));

    const ALL = [...ENZ_L,...COMP_INH,...SUB_BLOCKED,...ENZ_R,...NONCOMP_INH,...SUB_BOUND];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'sb') {
          // Sustratos bloqueados vibran frustrados
          return {...pt, p:[pt.p[0]+Math.sin(t*2+pt.phase)*4, pt.p[1]+Math.cos(t*2.2+pt.phase)*4, pt.p[2]]};
        }
        if (pt.type === 'nc') {
          // Inhibidor NC pulsa en sitio alosterico
          const pulse = 1 + 0.08*Math.sin(t*2.5);
          return {...pt, p:[pt.p[0]*pulse, pt.p[1], pt.p[2]*pulse]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      glow3d(ctx, CX-80, CY, 70, '#10b981');
      glow3d(ctx, CX+80, CY, 70, '#10b981');
      glow3d(ctx, CX-80, CY+20, 40, '#ef4444');
      glow3d(ctx, CX+80, CY-35, 35, '#a855f7');

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type==='el'||d.type==='er') {
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b981aa'); g.addColorStop(1,'#10b98122');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if (d.type==='ci') sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        else if (d.type==='nc') {
          sphere3d(ctx,d.x,d.y,rad,'#a855f7');
          glow3d(ctx,d.x,d.y,rad*2,'#a855f7');
        }
        else if (d.type==='sb') sphere3d(ctx,d.x,d.y,rad,'#22d3ee');
        else if (d.type==='ss') sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
      });

      // Etiquetas
      ctx.font='bold 10px "JetBrains Mono", monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(239,68,68,0.85)'; ctx.fillText('Competitiva', CX-90, CY+85);
      ctx.fillStyle='rgba(168,85,247,0.85)'; ctx.fillText('No Competitiva', CX+90, CY+85);

      // Linea divisora
      const divP = project(0,-80,0,FOV,CX,CY);
      const divP2 = project(0,80,0,FOV,CX,CY);
      ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.setLineDash([4,6]);
      ctx.beginPath(); ctx.moveTo(divP.x,divP.y); ctx.lineTo(divP2.x,divP2.y); ctx.stroke();
      ctx.setLineDash([]);

      legend(ctx,[
        {c:'#10b981', t:'Enzima (sitio activo libre/ocupado)'},
        {c:'#ef4444', t:'Inhibidor competitivo (bloquea sitio activo)'},
        {c:'#22d3ee', t:'Sustrato rechazado (Km aparente sube)'},
        {c:'#a855f7', t:'Inhibidor no competitivo (sitio alosterico)'},
        {c:'#06b6d4', t:'Sustrato unido pero Vmax reducida'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-3: ALOSTERISMO — Conformaciones T/R y cooperatividad
  ================================================================ */
  function drawAlosterismo(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // 4 subunidades (oligomero) — cuadrado en 3D
    const subPos = [[0,-55,0],[55,0,0],[0,55,0],[-55,0,0]];
    const SUBUNITS = [];
    subPos.forEach(([sx,sy,sz], si) => {
      spherePts(28, 35).forEach(p => {
        SUBUNITS.push({p:[p[0]+sx,p[1]+sy,p[2]+sz], c:'#10b981', r:3, type:'sub', si});
      });
    });

    // Sitios activos en cada subunidad
    const ACTIVE = subPos.map(([sx,sy,sz], si) => ({
      p:[sx*1.05, sy*1.05, sz+32], c:'#22d3ee', r:6.5, type:'act', si
    }));

    // Ligandos progresivamente uniendose (cooperatividad)
    const LIGANDS = [];
    subPos.forEach(([sx,sy,sz], si) => {
      for(let j=0;j<3;j++){
        const a=(j/3)*Math.PI*2;
        LIGANDS.push({p:[sx+45*Math.cos(a), sy+45*Math.sin(a), sz+10], c:'#f59e0b', r:3.5, type:'lig', si, j, phase:si*0.6+j*0.3});
      }
    });

    // Modulador alosterico negativo (rojo, sitio regulador)
    const NEG_MOD = spherePts(12, 18).map(p => ({p:[p[0]+90, p[1]+70, p[2]], c:'#ef4444', r:2.5, type:'neg'}));
    // Modulador positivo (verde brillante)
    const POS_MOD = spherePts(12, 18).map(p => ({p:[p[0]-90, p[1]-70, p[2]], c:'#22d3ee', r:2.5, type:'pos'}));

    const ALL = [...SUBUNITS,...ACTIVE,...LIGANDS,...NEG_MOD,...POS_MOD];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      // Pulso de las subunidades simulando cambio conformacional T->R
      const conformPulse = (Math.sin(t * 0.7) + 1) / 2; // 0 a 1

      const allAnim = ALL.map(pt => {
        if (pt.type === 'sub') {
          // Expansion/contraccion en la conformacion T vs R
          const scale = 1 + conformPulse * 0.08;
          return {...pt, p:[pt.p[0]*scale, pt.p[1]*scale, pt.p[2]]};
        }
        if (pt.type === 'lig') {
          // Ligandos orbitando y acercandose con el pulso
          const a = t*0.3 + pt.phase;
          const dist = 42 - conformPulse * 14;
          const [sx,sy,sz] = subPos[pt.si];
          return {...pt, p:[sx+dist*Math.cos(a), sy+dist*Math.sin(a), sz+10]};
        }
        if (pt.type === 'neg') {
          return {...pt, p:[pt.p[0]+Math.sin(t*1.2)*5, pt.p[1]+Math.cos(t)*4, pt.p[2]]};
        }
        if (pt.type === 'pos') {
          return {...pt, p:[pt.p[0]+Math.cos(t*0.9)*5, pt.p[1]+Math.sin(t*1.1)*4, pt.p[2]]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Estado T/R label
      const stateLabel = conformPulse > 0.5 ? 'Estado R (activo)' : 'Estado T (inactivo)';
      const stateCol = conformPulse > 0.5 ? '#10b981' : '#ef4444';
      glow3d(ctx, CX, CY, 80 + conformPulse*20, '#10b981');

      // Conexiones entre subunidades (interfase)
      for(let i=0;i<subPos.length;i++){
        const a = subPos[i], b = subPos[(i+1)%subPos.length];
        const pa = project(a[0],a[1],a[2],FOV,CX,CY);
        const pb = project(b[0],b[1],b[2],FOV,CX,CY);
        ctx.strokeStyle=`rgba(16,185,129,${0.25+conformPulse*0.2})`;
        ctx.lineWidth=1.5; ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(pa.x,pa.y); ctx.lineTo(pb.x,pb.y); ctx.stroke();
      }

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'sub') {
          const alpha = 0.6 + conformPulse * 0.3;
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,`rgba(16,185,129,${alpha})`); g.addColorStop(1,'rgba(16,185,129,0.05)');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if (d.type === 'act') {
          sphere3d(ctx,d.x,d.y,rad,'#22d3ee');
          glow3d(ctx,d.x,d.y,rad*(1+conformPulse),'#22d3ee');
        } else if (d.type === 'lig') sphere3d(ctx,d.x,d.y,rad,'#f59e0b');
        else if (d.type === 'neg') sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        else if (d.type === 'pos') sphere3d(ctx,d.x,d.y,rad,'#22d3ee');
      });

      ctx.font='bold 10px "JetBrains Mono", monospace'; ctx.textAlign='center';
      ctx.fillStyle=stateCol; ctx.fillText(stateLabel, CX, H-18);

      legend(ctx,[
        {c:'#10b981', t:'Subunidades enzimaticas (oligomero)'},
        {c:'#22d3ee', t:'Sitios activos (cooperativos)'},
        {c:'#f59e0b', t:'Ligandos (modulan cooperatividad)'},
        {c:'#ef4444', t:'Modulador alosterico negativo (T)'},
        {c:'#22d3ee', t:'Modulador alosterico positivo (R)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-4: FARMACOLOGIA — Diseno racional, farmacos en sitio activo
  ================================================================ */
  function drawFarmacologia(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.15, ry: 0, auto: true };
    addDrag(canvas, st);

    // Enzima diana (grande, semitransparente)
    const ENZ = spherePts(75, 85).map(p => ({p, c:'#10b981', r:3.5, type:'e'}));

    // Farmacos en distintos estados de union (3 farmacos)
    const DRUG_1 = spherePts(16,22).map(p => ({p:[p[0], p[1]+8, p[2]+78], c:'#f59e0b', r:2.8, type:'d1'})); // estatina
    const DRUG_2 = spherePts(14,18).map(p => ({p:[p[0]+60, p[1]-40, p[2]+45], c:'#a855f7', r:2.5, type:'d2', phase:Math.random()*Math.PI})); // IECA
    const DRUG_3 = spherePts(14,18).map(p => ({p:[p[0]-60, p[1]-40, p[2]+45], c:'#ef4444', r:2.5, type:'d3', phase:Math.random()*Math.PI*2})); // aspirina

    // Residuos del sitio activo
    const SITE = [
      {p:[0,0,78],   c:'#22d3ee', r:7.5, type:'r1'},
      {p:[20,-12,72],c:'#ef4444', r:6,   type:'r2'},
      {p:[-20,-12,72],c:'#f59e0b',r:6,   type:'r3'},
    ];

    // Estructura de cristalografia (puntos de difraccion)
    const CRYSTAL = [];
    for(let i=0;i<20;i++){
      const a=(i/20)*Math.PI*2, r2=140+(i%3)*15;
      CRYSTAL.push({p:[r2*Math.cos(a),(i%5-2)*28,r2*Math.sin(a)],c:'#06b6d4',r:1.8,type:'cry',phase:i*0.35});
    }

    const ALL = [...ENZ,...DRUG_1,...DRUG_2,...DRUG_3,...SITE,...CRYSTAL];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'd2') {
          // IECA acercandose al sitio
          const pull = 0.85 + 0.15*Math.sin(t*0.5 + (pt.phase||0));
          return {...pt, p:[pt.p[0]*pull, pt.p[1]*pull, pt.p[2]*pull]};
        }
        if (pt.type === 'd3') {
          const pull = 0.8 + 0.2*Math.cos(t*0.4 + (pt.phase||0));
          return {...pt, p:[pt.p[0]*pull, pt.p[1]*pull, pt.p[2]*pull]};
        }
        if (pt.type === 'cry') {
          return {...pt, p:[pt.p[0]+Math.sin(t+pt.phase)*4, pt.p[1]+Math.cos(t*0.8+pt.phase)*3, pt.p[2]]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      glow3d(ctx, CX, CY, 100, '#10b981');
      glow3d(ctx, CX, CY+10, 50, '#f59e0b');

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'e') {
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b98188'); g.addColorStop(1,'#10b98115');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if (d.type==='r1'||d.type==='r2'||d.type==='r3') {
          sphere3d(ctx,d.x,d.y,rad,d.c);
          glow3d(ctx,d.x,d.y,rad*1.8,d.c);
        } else if (d.type==='d1') sphere3d(ctx,d.x,d.y,rad,'#f59e0b');
        else if (d.type==='d2') sphere3d(ctx,d.x,d.y,rad,'#a855f7');
        else if (d.type==='d3') sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        else if (d.type==='cry') {
          ctx.fillStyle='rgba(6,182,212,0.4)'; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        }
      });

      ctx.font='bold 10px "JetBrains Mono", monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(16,185,129,0.75)'; ctx.fillText('Diseno racional de farmacos (SBDD)', CX, H-18);

      legend(ctx,[
        {c:'#10b981', t:'Enzima diana (estructura 3D)'},
        {c:'#22d3ee', t:'Residuos clave sitio activo'},
        {c:'#f59e0b', t:'Estatina (inhibidor competitivo)'},
        {c:'#a855f7', t:'IECA (inhibidor competitivo)'},
        {c:'#ef4444', t:'Aspirina (inhibidor irreversible)'},
        {c:'#06b6d4', t:'Datos cristalografia (PDB)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     TABS — lazy canvas init
  ================================================================ */
  function initTabs(canvasMap) {
    const btns   = $$('.em-tab-btn');
    const panels = $$('.em-panel');
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
                const wrap = c.closest('.em-3d');
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
        const target = parseFloat(el.dataset.emCount);
        const suf = el.dataset.emSuf || '';
        const dec = +(el.dataset.emDec || 0);
        const dur = 1600;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now-start)/dur,1), ease = 1-Math.pow(1-prog,3);
          el.textContent = (ease*target).toFixed(dec)+suf;
          if (prog<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold:0.5 });
    $$('[data-em-count]').forEach(e => io.observe(e));
  }

  /* ── REVEAL ── */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('em-revealed'); io.unobserve(e.target); }
      });
    }, { threshold:0.08, rootMargin:'0px 0px -30px 0px' });
    $$('[data-em-reveal]').forEach(el => io.observe(el));
  }

  /* ── INIT ── */
  function init() {
    const canvasMap = {
      'em-canvas-mm':          drawMM,
      'em-canvas-inhibicion':  drawInhibicion,
      'em-canvas-alosterismo': drawAlosterismo,
      'em-canvas-farmacologia':drawFarmacologia,
    };
    initTabs(canvasMap);
    initCounters();
    initReveal();

    // Hero canvas robusto con ResizeObserver
    (function initHeroCanvas() {
      const hc = document.getElementById('em-hero-canvas');
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
        const heroVis = hc.closest('.em-hero-vis') || hc.parentElement;
        if (heroVis) ro.observe(heroVis);
        setTimeout(() => { ro.disconnect(); tryDraw(); }, 3000);
      } else {
        setTimeout(tryDraw, 400);
      }
    })();

    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive:true });

    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

  return { version:'1.0.0', module:'EM-EnzimologiaModerna' };
})();
