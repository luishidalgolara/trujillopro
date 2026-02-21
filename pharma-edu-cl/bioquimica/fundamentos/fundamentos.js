/* ============================================================
   FUNDAMENTOS.JS — PharmaLab Chile | Unidad 1: Fundamentos Bioquímica Molecular
   Iniciales: FB — Motor 3D Canvas + Tabs lazy-init + Animaciones
   4 escenas: Red H₂O · ATP/ADP · Buffer bicarbonato · Perfil energía activación
   ============================================================ */

'use strict';

const FB = (() => {

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
    const isHero = canvas.id === 'fb-hero-canvas';
    const H = isHero ? 390 : 330;

    // Buscar ancho real del contenedor más cercano con dimensiones
    let w = 0;
    let el = canvas;
    while (el && w < 10) {
      w = el.getBoundingClientRect().width || el.offsetWidth || el.clientWidth || 0;
      el = el.parentElement;
    }
    // Fallback robusto
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
     HERO 3D — Red de puentes de hidrógeno del agua
     Moléculas H₂O con O central y 2 H, conectadas por puentes H
  ================================================================ */
  function drawHero(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 680;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // 7 moléculas de agua en red tetraédrica
    const MOL_POS = [
      [0,    0,    0  ],   // central
      [68,  -28,   15 ],   // vecina 1 (puente H donar)
      [-68, -28,  -15 ],   // vecina 2
      [25,   68,  -50 ],   // vecina 3 (puente H aceptar)
      [-25,  68,   50 ],   // vecina 4
      [60,   30,  -60 ],   // vecina 5
      [-60,  30,   60 ],   // vecina 6
    ];

    const ATOMS = [];
    const H_BONDS = []; // pares de índices de moléculas con puente H

    MOL_POS.forEach(([mx, my, mz], mi) => {
      // Oxígeno (grande, rojo)
      ATOMS.push({ p: [mx, my, mz], c: '#ef4444', r: 7.5, type: 'O', mol: mi });
      // 2 Hidrógenos (pequeños, blancos, ángulo 104.5°)
      const ang = 104.5 * Math.PI / 180 / 2; // semi-ángulo
      const hd = 18; // distancia O-H escalada
      ATOMS.push({ p: [mx + hd*Math.cos(ang + mi*0.6), my - hd*Math.sin(ang), mz + hd*Math.sin(mi*0.4)], c: '#e2e8f0', r: 4, type: 'H', mol: mi });
      ATOMS.push({ p: [mx - hd*Math.cos(ang + mi*0.6), my - hd*Math.sin(ang), mz - hd*Math.sin(mi*0.4)], c: '#e2e8f0', r: 4, type: 'H', mol: mi });
    });

    // Puentes de hidrógeno: conexiones entre moléculas vecinas
    const HBOND_PAIRS = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,6]];

    // Electrones de solvatación (nube electrónica visual)
    const CLOUD = [];
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2, r2 = 100 + (i % 3) * 28;
      CLOUD.push({ p: [r2*Math.cos(a), (i % 7 - 3) * 20, r2*Math.sin(a)], c: '#06b6d4', r: 2.5, phase: i * 0.28 });
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (st.auto) st.ry += 0.005;
      t += 0.016;

      // Animar nube de hidratación
      const cloudAnim = CLOUD.map(c => ({
        ...c, p: [c.p[0] + Math.sin(t + c.phase) * 5, c.p[1] + Math.cos(t * 1.1 + c.phase) * 4, c.p[2]]
      }));

      const ALL = [...ATOMS, ...cloudAnim];
      const rot  = rotate(ALL.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p, i) => ({ ...ALL[i], ...project(p[0], p[1], p[2], FOV, CX, CY), z: p[2] }));

      // Glow central (O central)
      glow3d(ctx, CX, CY, 85, '#ef4444');

      // Dibujar puentes de hidrógeno (líneas punteadas cian)
      const oxygens = proj.filter(d => d.type === 'O');
      HBOND_PAIRS.forEach(([a, b]) => {
        if (oxygens[a] && oxygens[b]) {
          ctx.save();
          ctx.setLineDash([4, 5]);
          ctx.strokeStyle = `rgba(6,182,212,${0.35 + 0.15 * Math.sin(t + a)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(oxygens[a].x, oxygens[a].y);
          ctx.lineTo(oxygens[b].x, oxygens[b].y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Dibujar enlaces O-H covalentes dentro de cada molécula
      proj.filter(d => d.type === 'H').forEach(h => {
        const o = oxygens[h.mol];
        if (o) {
          ctx.strokeStyle = 'rgba(255,255,255,0.45)';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(h.x, h.y); ctx.stroke();
        }
      });

      // Dibujar átomos
      [...proj].sort((a, b) => a.z - b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type === 'O') {
          sphere3d(ctx, d.x, d.y, rad, '#ef4444');
        } else if (d.type === 'H') {
          sphere3d(ctx, d.x, d.y, rad, '#e2e8f0');
        } else {
          sphere3d(ctx, d.x, d.y, rad, d.c);
        }
      });

      // Etiqueta ángulo H-O-H en la molécula central
      if (oxygens[0]) {
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(6,182,212,0.75)';
        ctx.textAlign = 'left';
        ctx.fillText('104.5°', oxygens[0].x + 12, oxygens[0].y - 12);
      }

      legend(ctx, [
        { c: '#ef4444', t: 'Oxígeno (electrones solitarios sp³)' },
        { c: '#e2e8f0', t: 'Hidrógeno (covalente, d = 0.96 Å)' },
        { c: '#06b6d4', t: 'Puente de hidrógeno (O···H, ~20 kJ/mol)' },
        { c: '#06b6d4', t: 'Nube de hidratación / esfera de solvatación' },
      ]);

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-1: AGUA Y pH — Red de H₂O ampliada con ions H⁺/OH⁻
  ================================================================ */
  function drawAgua(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 640;
    const st = { rx: 0.22, ry: 0, auto: true };
    addDrag(canvas, st);

    // Clúster de moléculas H₂O en red
    const WATER = [];
    const wpos = [
      [0,0,0],[55,-20,0],[-55,-20,0],[0,0,60],[-55,-20,60],[55,-20,60],
      [20,55,-30],[-20,55,-30],[20,55,30],[-20,55,30]
    ];
    wpos.forEach(([x,y,z], i) => {
      WATER.push({ p:[x,y,z], c:'#ef4444', r:7, type:'O', idx:i });
      const ha = 0.8 + i * 0.3;
      WATER.push({ p:[x+15*Math.cos(ha),y-12,z+15*Math.sin(ha*0.5)], c:'#cbd5e1', r:4, type:'H', idx:i });
      WATER.push({ p:[x-15*Math.cos(ha),y-12,z-15*Math.sin(ha*0.5)], c:'#cbd5e1', r:4, type:'H', idx:i });
    });

    // Iones H₃O⁺ (amarillo, más brillante)
    const HYDRONIUM = [];
    [[100,-30,20],[-100,-30,-20]].forEach(([x,y,z]) => {
      HYDRONIUM.push({ p:[x,y,z], c:'#f59e0b', r:8.5, type:'H3O' });
      for(let i=0;i<3;i++){
        const a = (i/3)*Math.PI*2;
        HYDRONIUM.push({ p:[x+15*Math.cos(a),y+8,z+15*Math.sin(a)], c:'#fcd34d', r:3.5, type:'Hh' });
      }
    });

    // Iones OH⁻ (violeta)
    const HYDROXIDE = [];
    [[0,-80,40],[40,-80,-40]].forEach(([x,y,z]) => {
      HYDROXIDE.push({ p:[x,y,z], c:'#a855f7', r:7.5, type:'OH' });
      HYDROXIDE.push({ p:[x+15,y-10,z+5], c:'#c4b5fd', r:4, type:'Hoh' });
    });

    // Campo de pH (partículas vibrando con frecuencia diferente)
    const PH_FIELD = [];
    for(let i=0;i<18;i++){
      const a = (i/18)*Math.PI*2, r2 = 115 + (i%4)*12;
      PH_FIELD.push({ p:[r2*Math.cos(a),(-1+i%5)*22,r2*Math.sin(a)], c:'#22d3ee', r:2, phase:i*0.38 });
    }

    const ALL = [...WATER,...HYDRONIUM,...HYDROXIDE,...PH_FIELD];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if(st.auto) st.ry += 0.005;
      t += 0.016;

      const phAnim = ALL.map(pt => {
        if(pt.phase !== undefined){
          return {...pt, p:[pt.p[0]+Math.sin(t*1.1+pt.phase)*4, pt.p[1]+Math.cos(t+pt.phase)*3, pt.p[2]]};
        }
        return pt;
      });

      const rot  = rotate(phAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...phAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      glow3d(ctx, CX, CY - 30, 100, '#ef444430');

      // Puentes H entre oxígenos vecinos
      const oxyg = proj.filter(d=>d.type==='O');
      for(let i=0;i<oxyg.length-1;i++){
        const dx=oxyg[i].x-oxyg[i+1].x, dy=oxyg[i].y-oxyg[i+1].y;
        if(Math.sqrt(dx*dx+dy*dy)<110){
          ctx.save(); ctx.setLineDash([3,4]);
          ctx.strokeStyle=`rgba(6,182,212,${0.25+0.1*Math.sin(t+i)})`;
          ctx.lineWidth=1.2; ctx.beginPath();
          ctx.moveTo(oxyg[i].x,oxyg[i].y); ctx.lineTo(oxyg[i+1].x,oxyg[i+1].y);
          ctx.stroke(); ctx.restore();
        }
      }

      // H3O⁺ glow
      proj.filter(d=>d.type==='H3O').forEach(d=>{
        glow3d(ctx, d.x, d.y, 35, '#f59e0b');
      });

      [...proj].sort((a,b)=>a.z-b.z).forEach(d=>{
        const rad = d.r * d.d;
        if(d.type==='O') sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        else if(d.type==='H3O'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#f59e0bcc'); g.addColorStop(1,'#f59e0b22');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='OH'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#a855f7cc'); g.addColorStop(1,'#a855f722');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx,d.x,d.y,rad,d.c); }
      });

      legend(ctx, [
        {c:'#ef4444', t:'Oxígeno (δ−, par no enlazante)'},
        {c:'#cbd5e1', t:'Hidrógeno (δ+, donador puente H)'},
        {c:'#f59e0b', t:'Ion hidronio H₃O⁺ (ácido)'},
        {c:'#a855f7', t:'Ion hidroxilo OH⁻ (base)'},
        {c:'#22d3ee', t:'Interacción dipolo−dipolo'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-2: TERMODINÁMICA — Ciclo ATP/ADP con energía libre Gibbs
     ATP central → ADP + Pi liberando energía → reacciones acopladas
  ================================================================ */
  function drawTermo(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.18, ry: 0, auto: true };
    addDrag(canvas, st);

    // ATP: adenosina + 3 fosfatos
    const ATP = [];
    // Ribosa (centro naranja)
    spherePts(18, 50).forEach(p => ATP.push({p, c:'#f59e0b', r:3.8, type:'ribose'}));
    // Adenina (base nitrogenada, arriba, cian)
    spherePts(14, 35).forEach(p => ATP.push({p:[p[0], p[1]-38, p[2]], c:'#06b6d4', r:3.2, type:'adenine'}));
    // 3 grupos fosfato en cadena (α, β, γ)
    const PHOSPHATES = [[-30,0,0],[-58,0,0],[-86,0,0]]; // γ es el más lejano
    PHOSPHATES.forEach(([px,py,pz], pi) => {
      const col = pi===2 ? '#ef4444' : pi===1 ? '#f97316' : '#fbbf24'; // γ rojo (se hidroliza)
      spherePts(10, 28).forEach(p => ATP.push({p:[p[0]+px,p[1]+py,p[2]+pz], c:col, r:3.5-pi*0.3, type:`p${pi}`}));
      // Oxígenos del fosfato
      for(let i=0;i<4;i++){
        const a = (i/4)*Math.PI*2;
        ATP.push({p:[px+14*Math.cos(a),py+8,pz+14*Math.sin(a)], c:'#fb923c', r:2.5, type:'pO'});
      }
    });

    // ADP + Pi liberados (más lejos)
    const ADP = spherePts(14, 35).map(p => ({p:[p[0]+130, p[1], p[2]], c:'#10b981', r:3.2, type:'adp'}));
    const PI  = spherePts(9, 22).map(p => ({p:[p[0]+130, p[1]-28, p[2]], c:'#22d3ee', r:2.8, type:'pi'}));

    // Partículas de energía liberada (bolitas volando hacia afuera)
    const ENERGY = [];
    for(let i=0;i<14;i++){
      const a=(i/14)*Math.PI*2, r2=65+(i%3)*18;
      ENERGY.push({p:[r2*Math.cos(a),(-2+i%5)*15,r2*Math.sin(a)], c:'#fbbf24', r:2.8, phase:i*0.45});
    }

    // Reacciones acopladas (flechas simplificadas como esferas en trayectoria)
    const COUPLED = [];
    for(let i=0;i<8;i++){
      const prog=i/7;
      COUPLED.push({p:[-50*prog-20, -70+prog*50, 30*Math.sin(prog*Math.PI)], c:'#a855f7', r:2.5, phase:i*0.3, type:'coup'});
    }

    const ALL = [...ATP, ...ADP, ...PI, ...ENERGY, ...COUPLED];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if(st.auto) st.ry += 0.005;
      t += 0.016;

      // Animar energía y reacciones acopladas
      const allAnim = ALL.map(pt => {
        if(pt.phase !== undefined && pt.type !== 'coup'){
          const prog = ((t * 0.28 + pt.phase) % 1);
          const r3 = 65 + (Math.floor(pt.phase/0.45)%3)*18;
          return {...pt, p:[r3*Math.cos(t+pt.phase), pt.p[1]+Math.sin(t*0.8+pt.phase)*8, r3*Math.sin(t+pt.phase)]};
        }
        if(pt.type==='coup'){
          const prog = ((t*0.22 + pt.phase) % 1);
          return {...pt, p:[-50*prog-20, -70+prog*50, 30*Math.sin(prog*Math.PI)]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Glow ATP central
      glow3d(ctx, CX, CY, 60, '#f59e0b');

      // Glow ADP
      const adpCenter = proj.find(d=>d.type==='adp');
      if(adpCenter) glow3d(ctx, adpCenter.x, adpCenter.y, 45, '#10b981');

      // Enlace fosfoanídrido γ (línea roja punteada = enlace de alta energía)
      const riboseCenter = proj.find(d=>d.type==='ribose');
      const p2center = proj.find(d=>d.type==='p2');
      if(riboseCenter && p2center){
        ctx.save(); ctx.setLineDash([3,3]);
        ctx.strokeStyle=`rgba(239,68,68,${0.5+0.2*Math.sin(t*2)})`;
        ctx.lineWidth=2; ctx.beginPath();
        ctx.moveTo(riboseCenter.x,riboseCenter.y); ctx.lineTo(p2center.x, p2center.y);
        ctx.stroke(); ctx.restore();
      }

      [...proj].sort((a,b)=>a.z-b.z).forEach(d=>{
        const rad = d.r * d.d;
        if(d.type==='ribose'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#f59e0bbb'); g.addColorStop(1,'#f59e0b22');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx,d.x,d.y,rad,d.c); }
      });

      // Etiqueta ΔG°'
      ctx.font='bold 11px "JetBrains Mono", monospace';
      ctx.fillStyle='rgba(239,68,68,0.85)'; ctx.textAlign='center';
      ctx.fillText('ΔG°\' = −30.5 kJ/mol', CX, H - 20);

      legend(ctx,[
        {c:'#f59e0b', t:'Ribosa + Adenina (AMP)'},
        {c:'#fbbf24', t:'Fosfato α,β (ADP)'},
        {c:'#ef4444', t:'Fosfato γ (enlace de alta energía)'},
        {c:'#10b981', t:'ADP (producto de hidrólisis)'},
        {c:'#22d3ee', t:'Fosfato inorgánico (Pᵢ)'},
        {c:'#fbbf24', t:'Energía libre liberada (−30.5 kJ/mol)'},
        {c:'#a855f7', t:'Reacción acoplada impulsada'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-3: BUFFERS — Sistema bicarbonato / fosfato en equilibrio
     H₂CO₃ ⇌ H⁺ + HCO₃⁻ con pulmones y riñón
  ================================================================ */
  function drawBuffer(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.20, ry: 0, auto: true };
    addDrag(canvas, st);

    // H₂CO₃ (ácido carbónico) — izquierda
    const H2CO3 = spherePts(16, 40).map(p => ({p:[p[0]-100,p[1],p[2]], c:'#f97316', r:3.5, type:'h2co3'}));
    // Carbono central
    H2CO3.push(...spherePts(8,18).map(p=>({p:[p[0]-100,p[1],p[2]], c:'#64748b', r:2.8, type:'C'})));
    // 2 O dobles
    for(let i=0;i<2;i++){
      const a = (i/2)*Math.PI*2;
      H2CO3.push(...spherePts(6,12).map(p=>({p:[p[0]-100+20*Math.cos(a),p[1]+20*Math.sin(a),p[2]], c:'#ef4444', r:2.5, type:'Od'})));
    }

    // HCO₃⁻ (bicarbonato) — centro/derecha (cian)
    const HCO3 = spherePts(16, 40).map(p => ({p:[p[0]+60,p[1],p[2]], c:'#06b6d4', r:3.5, type:'hco3'}));
    // H⁺ suelto (pequeño, amarillo brillante)
    const HPLUS = [];
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2, r2=85+i*8;
      HPLUS.push({p:[r2*Math.cos(a)-20, (i%3-1)*30, r2*Math.sin(a)], c:'#fbbf24', r:3.8, phase:i*0.5, type:'Hp'});
    }

    // CO₂ (gas, arriba) — verde
    const CO2 = spherePts(12,28).map(p=>({p:[p[0]+120,p[1]-60,p[2]], c:'#84cc16', r:3, type:'co2'}));
    // O a los lados del C en CO₂
    for(let i=0;i<2;i++){
      const a=(i/2)*Math.PI;
      CO2.push(...spherePts(8,16).map(p=>({p:[p[0]+120+20*Math.cos(a),p[1]-60,p[2]+20*Math.sin(a)], c:'#ef4444', r:2.5, type:'co2O'})));
    }

    // Pulmón (simplificado: cluster redondo verde arriba)
    const LUNG = spherePts(25,55).map(p=>({p:[p[0]-50,p[1]-90,p[2]], c:'#10b981', r:3, type:'lung'}));

    // Riñón (cluster morado abajo derecha)
    const KIDNEY = spherePts(22,50).map(p=>({p:[p[0]+80,p[1]+90,p[2]], c:'#a855f7', r:2.8, type:'kidney'}));

    // Flechas de equilibrio (partículas animadas)
    const EQUIL = [];
    for(let i=0;i<10;i++){
      const prog = i/9;
      EQUIL.push({p:[-80+prog*140, 0, 20*Math.sin(prog*Math.PI)], c:'#94a3b8', r:2, phase:i*0.3, type:'eq'});
    }

    const ALL = [...H2CO3,...HCO3,...HPLUS,...CO2,...LUNG,...KIDNEY,...EQUIL];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if(st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if(pt.type==='Hp'){
          const a = t * 0.6 + pt.phase;
          const r2 = 85 + (pt.phase/0.5)*8;
          return {...pt, p:[r2*Math.cos(a)-20, Math.sin(t*1.2+pt.phase)*30, r2*Math.sin(a)]};
        }
        if(pt.type==='eq'){
          const prog = ((t*0.2+pt.phase)%1);
          return {...pt, p:[-80+prog*140, 3*Math.sin(t*2+pt.phase), 20*Math.sin(prog*Math.PI)]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      glow3d(ctx, CX - 60, CY, 55, '#f97316');
      glow3d(ctx, CX + 60, CY, 55, '#06b6d4');
      glow3d(ctx, CX - 50, CY - 90, 40, '#10b981');
      glow3d(ctx, CX + 80, CY + 90, 35, '#a855f7');

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if(d.type==='h2co3'||d.type==='hco3'){
          const col = d.type==='h2co3' ? '#f97316' : '#06b6d4';
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,col+'bb'); g.addColorStop(1,col+'18');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx,d.x,d.y,rad,d.c); }
      });

      // Etiquetas pKa
      ctx.font='bold 10px "JetBrains Mono", monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(251,191,36,0.8)'; ctx.fillText('pKa = 6.1', CX, CY - 5);
      ctx.fillStyle='rgba(16,185,129,0.7)'; ctx.fillText('Pulmón: ↓CO₂', CX - 50, CY - 115);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fillText('Riñón: ↑HCO₃⁻', CX + 80, CY + 120);

      legend(ctx,[
        {c:'#f97316', t:'H₂CO₃ (ácido carbónico, H₂O + CO₂)'},
        {c:'#06b6d4', t:'HCO₃⁻ (bicarbonato, base conjugada)'},
        {c:'#fbbf24', t:'H⁺ (protón liberado/captado)'},
        {c:'#84cc16', t:'CO₂ (gas, exhalado por pulmón)'},
        {c:'#10b981', t:'Regulación pulmonar (↓PaCO₂)'},
        {c:'#a855f7', t:'Regulación renal (↑HCO₃⁻ retenido)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     3D-4: CINÉTICA — Perfil de energía de activación + catálisis
     Diagrama de coordenada de reacción en 3D con barrera Ea
  ================================================================ */
  function drawCinetica(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W / 2, CY = H / 2, FOV = 650;
    const st = { rx: 0.10, ry: 0, auto: true };
    addDrag(canvas, st);

    // Estado reactivos (R)
    const REACTANTS = spherePts(20, 50).map(p => ({p:[p[0]-120, p[1]+20, p[2]], c:'#06b6d4', r:3.8, type:'react'}));
    // Complejo activado [TS‡] — cima de la barrera (rojo)
    const TS = spherePts(14, 35).map(p => ({p:[p[0], p[1]-60, p[2]], c:'#ef4444', r:3.2, type:'ts'}));
    // Productos (P) — verde, más bajos que R (exergónico)
    const PRODUCTS = spherePts(18, 45).map(p => ({p:[p[0]+120, p[1]+50, p[2]], c:'#10b981', r:3.5, type:'prod'}));

    // Barrera reducida por enzima [ETS] — naranja, más baja que TS libre
    const ETS = spherePts(12, 30).map(p => ({p:[p[0], p[1]-20, p[2]], c:'#f59e0b', r:2.8, type:'ets'}));

    // Moléculas en tránsito (reactivo → TS → producto)
    const TRANSIT = [];
    for(let i=0;i<12;i++){
      const phase = i/12;
      // Trayectoria sin enzima (alta barrera)
      TRANSIT.push({p:[-120+phase*240, 20-100*Math.sin(phase*Math.PI)+30*phase, phase*20], c:'#06b6d4', r:2.5, phase:i*0.4, type:'traj'});
      // Trayectoria con enzima (barrera baja, naranja)
      TRANSIT.push({p:[-120+phase*240, 20-40*Math.sin(phase*Math.PI)+30*phase, -phase*20-15], c:'#f59e0b', r:2.5, phase:i*0.4+0.2, type:'etraj'});
    }

    // Energía cinética de moléculas (puntos vibrando)
    const KINETIC = [];
    for(let i=0;i<20;i++){
      const a=(i/20)*Math.PI*2, r2=80+(i%4)*15;
      KINETIC.push({p:[r2*Math.cos(a)-120,20+Math.sin(a)*25,r2*Math.sin(a)], c:'#a78bfa', r:2, phase:i*0.32, type:'kin'});
    }

    const ALL = [...REACTANTS,...TS,...PRODUCTS,...ETS,...TRANSIT,...KINETIC];
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if(st.auto) st.ry += 0.004;
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if(pt.type==='traj'){
          const prog = ((t*0.18 + pt.phase) % 1);
          const bx = -120 + prog*240;
          const by = 20 - 100*Math.sin(prog*Math.PI) + 30*prog;
          return {...pt, p:[bx, by, prog*20]};
        }
        if(pt.type==='etraj'){
          const prog = ((t*0.22 + pt.phase) % 1);
          const bx = -120 + prog*240;
          const by = 20 - 38*Math.sin(prog*Math.PI) + 30*prog;
          return {...pt, p:[bx, by, -prog*20-15]};
        }
        if(pt.type==='kin'){
          return {...pt, p:[pt.p[0]+Math.sin(t*1.5+pt.phase)*6, pt.p[1]+Math.cos(t+pt.phase)*6, pt.p[2]+Math.sin(t*0.8+pt.phase)*4]};
        }
        if(pt.type==='ts'){
          const pulse = 1 + 0.05*Math.sin(t*3);
          return {...pt, p:[pt.p[0]*pulse, pt.p[1], pt.p[2]*pulse]};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p=>p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Glows
      glow3d(ctx, CX - 100, CY + 15, 50, '#06b6d4');
      glow3d(ctx, CX, CY - 55, 45, '#ef4444');
      glow3d(ctx, CX, CY - 15, 35, '#f59e0b');
      glow3d(ctx, CX + 100, CY + 40, 45, '#10b981');

      // Flecha de diferencia ΔG°'
      const tsC = proj.find(d=>d.type==='ts');
      const prodC = proj.find(d=>d.type==='prod');
      if(tsC && prodC){
        ctx.save(); ctx.setLineDash([4,4]);
        ctx.strokeStyle='rgba(251,191,36,0.45)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(tsC.x, tsC.y); ctx.lineTo(prodC.x, tsC.y); ctx.stroke();
        ctx.restore();
      }

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if(d.type==='react'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#06b6d4bb'); g.addColorStop(1,'#06b6d418');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='ts'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#ef4444cc'); g.addColorStop(1,'#ef444418');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='prod'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b981bb'); g.addColorStop(1,'#10b98118');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else { sphere3d(ctx,d.x,d.y,rad,d.c); }
      });

      // Etiquetas energéticas
      ctx.font='bold 10px "JetBrains Mono", monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(239,68,68,0.8)';  ctx.fillText('Ea (sin enzima)', CX, CY - 80);
      ctx.fillStyle='rgba(245,158,11,0.8)'; ctx.fillText('Ea′ (con enzima, −↓)', CX, CY - 40);
      ctx.fillStyle='rgba(6,182,212,0.7)';  ctx.fillText('Reactivos (R)', CX - 120, CY + 40);
      ctx.fillStyle='rgba(16,185,129,0.7)'; ctx.fillText('Productos (P)', CX + 120, CY + 55);

      legend(ctx,[
        {c:'#06b6d4', t:'Reactivos (estado inicial)'},
        {c:'#ef4444', t:'Estado de transición [TS‡] sin catálisis'},
        {c:'#f59e0b', t:'Estado de transición [ETS‡] con enzima (Ea↓)'},
        {c:'#10b981', t:'Productos (ΔG°\' < 0, exergónico)'},
        {c:'#06b6d4', t:'Trayectoria sin catálisis (barrera alta)'},
        {c:'#f59e0b', t:'Trayectoria enzimática (barrera reducida)'},
        {c:'#a78bfa', t:'Energía cinética (distribución de Maxwell-Boltzmann)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ================================================================
     TABS — lazy canvas init
  ================================================================ */
  function initTabs(canvasMap) {
    const btns   = $$('.fb-tab-btn');
    const panels = $$('.fb-panel');
    const inited = new Set();

    function initPanelCanvas(idx) {
      if (inited.has(idx)) return;
      inited.add(idx);
      // Triple delay: panel visible → layout calculado → canvas dibujado
      requestAnimationFrame(() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            Object.entries(canvasMap).forEach(([id, fn]) => {
              const c = document.getElementById(id);
              if (c && panels[idx] && panels[idx].contains(c)) {
                const wrap = c.closest('.fb-3d');
                if (wrap) {
                  const ww = wrap.clientWidth - 24;
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
        const target = parseFloat(el.dataset.fbCount);
        const suf = el.dataset.fbSuf || '';
        const dec = +(el.dataset.fbDec || 0);
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
    $$('[data-fb-count]').forEach(e => io.observe(e));
  }

  /* ── REVEAL ── */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('fb-revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('[data-fb-reveal]').forEach(el => io.observe(el));
  }

  /* ── INIT ── */
  function init() {
    const canvasMap = {
      'fb-canvas-agua':     drawAgua,
      'fb-canvas-termo':    drawTermo,
      'fb-canvas-buffer':   drawBuffer,
      'fb-canvas-cinetica': drawCinetica,
    };
    initTabs(canvasMap);
    initCounters();
    initReveal();

    // Hero canvas — usar ResizeObserver para garantizar dimensiones reales
    (function initHeroCanvas() {
      const hc = document.getElementById('fb-hero-canvas');
      if (!hc) return;
      let drawn = false;

      function tryDraw() {
        if (drawn) return;
        // Recorrer árbol para encontrar ancho real
        let w = 0;
        let el = hc.parentElement;
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

      // Intentar inmediatamente
      requestAnimationFrame(() => {
        setTimeout(() => {
          tryDraw();
        }, 60);
      });

      // ResizeObserver como respaldo por si el layout tarda
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (!drawn) tryDraw();
          else ro.disconnect();
        });
        const heroVis = hc.closest('.fb-hero-vis') || hc.parentElement;
        if (heroVis) ro.observe(heroVis);
        // Limpiar tras 3s pase lo que pase
        setTimeout(() => { ro.disconnect(); tryDraw(); }, 3000);
      } else {
        // Fallback sin ResizeObserver
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

  return { version: '1.0.0', module: 'FB-FundamentosBioquimica' };
})();