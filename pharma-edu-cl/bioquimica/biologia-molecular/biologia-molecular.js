/* ============================================================
   BIOLOGIA-MOLECULAR.JS — PharmaLab Chile | Unidad 5
   Iniciales: BM — 5 escenas 3D:
   HERO : Doble hélice B-DNA rotante con pares de bases
   3D-1 : ADN/ARN — Dogma Central + flujo de información
   3D-2 : CRISPR-Cas9 — RNP cortando el ADN con sgRNA
   3D-3 : Epigenética — Nucleosoma con colas de histonas
   3D-4 : ARNm/LNP — Nanopartícula lipídica con ARNm encapsulado
   ============================================================ */

'use strict';

const BM = (() => {

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ══════════════════════════════════════════════════════════
     MOTOR 3D COMPARTIDO
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
      const yy = 1 - (i / (n-1)) * 2, ra = Math.sqrt(1-yy*yy), th = phi*i;
      pts.push([r*ra*Math.cos(th), r*yy, r*ra*Math.sin(th)]);
    }
    return pts;
  }
  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const isHero = canvas.id === 'bm-hero-canvas';
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
    canvas.addEventListener('mousedown', e => { dragging=true; st.auto=false; lx=e.clientX; ly=e.clientY; });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      st.ry += (e.clientX-lx)*0.008; st.rx += (e.clientY-ly)*0.008;
      lx=e.clientX; ly=e.clientY;
    });
    window.addEventListener('mouseup', () => { dragging=false; st.auto=true; });
    canvas.addEventListener('touchstart', e => { dragging=true; st.auto=false; lx=e.touches[0].clientX; ly=e.touches[0].clientY; }, {passive:true});
    canvas.addEventListener('touchmove', e => {
      e.preventDefault(); if (!dragging) return;
      st.ry += (e.touches[0].clientX-lx)*0.008; st.rx += (e.touches[0].clientY-ly)*0.008;
      lx=e.touches[0].clientX; ly=e.touches[0].clientY;
    }, {passive:false});
    canvas.addEventListener('touchend', () => { dragging=false; st.auto=true; });
  }
  function sphere3d(ctx, x, y, r, color) {
    if (r <= 0.3) return;
    const g = ctx.createRadialGradient(x-r*0.32, y-r*0.32, 0, x, y, r);
    g.addColorStop(0, color+'ff'); g.addColorStop(0.55, color+'bb'); g.addColorStop(1, color+'18');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }
  function glow3d(ctx, x, y, r, color) {
    if (r<=0) return;
    const g = ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,color+'55'); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }
  function legend(ctx, items, x0, y0) {
    x0=x0||10; y0=y0||14;
    ctx.font='10px "JetBrains Mono",monospace'; ctx.textAlign='left';
    items.forEach((l,i) => {
      ctx.fillStyle=l.c; ctx.beginPath(); ctx.arc(x0+5, y0+i*18, 4.5, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.42)'; ctx.fillText(l.t, x0+18, y0+4+i*18);
    });
  }

  /* ══════════════════════════════════════════════════════════
     HERO — Doble Hélice B-DNA con pares de bases coloreados
     Estructura: dos cadenas de fosfato-azúcar + 26 pb representados
  ══════════════════════════════════════════════════════════ */
  function drawHero(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX = W/2, CY = H/2, FOV = 700;
    const st = { rx: 0.08, ry: 0, auto: true };
    addDrag(canvas, st);

    // B-DNA: 10.5 pb por vuelta, paso 3.4nm → radio hélice 10 unidades
    const N_BP = 26, RISE = 12, RADIUS = 42, TWIST_PER_BP = (2*Math.PI)/10.5;
    const BASE_COLORS = { AT:'#06b6d4', TA:'#06b6d4', GC:'#a855f7', CG:'#a855f7' };
    const PAIRS = ['AT','GC','AT','CG','GC','TA','GC','AT','CG','TA','GC','AT','CG','GC','AT','TA','GC','AT','CG','TA','GC','AT','GC','CG','AT','GC'];

    // Puntos de la cadena 1 (backbone: fosfato-azúcar)
    const CHAIN1 = [], CHAIN2 = [], BASE_PAIRS = [];
    for (let i=0; i<N_BP; i++) {
      const angle = i*TWIST_PER_BP;
      const y = (i - N_BP/2) * RISE;
      const x1 = RADIUS*Math.cos(angle), z1 = RADIUS*Math.sin(angle);
      const x2 = RADIUS*Math.cos(angle+Math.PI), z2 = RADIUS*Math.sin(angle+Math.PI);
      CHAIN1.push({ p:[x1,y,z1], c:'#10b981', r:3.5, type:'bb1' });
      CHAIN2.push({ p:[x2,y,z2], c:'#10b981', r:3.5, type:'bb2' });
      // Par de bases en el centro
      const pair = PAIRS[i % PAIRS.length];
      const col = BASE_COLORS[pair] || '#22d3ee';
      BASE_PAIRS.push({
        p:[(x1+x2)/2, y, (z1+z2)/2],
        p1:[x1*0.6, y, z1*0.6],
        p2:[x2*0.6, y, z2*0.6],
        c: col, r:3, type:'bp', pair, idx:i
      });
    }

    // Partículas decorativas (agua, iones)
    const IONS = [];
    for (let i=0; i<20; i++) {
      const a=(i/20)*Math.PI*2, dist=75+(i%3)*12;
      const y=(i%5-2)*40;
      IONS.push({ p:[dist*Math.cos(a),y,dist*Math.sin(a)], c:'#06b6d4', r:1.8, type:'ion', phase:i*0.4 });
    }

    const ALL = [...CHAIN1, ...CHAIN2, ...BASE_PAIRS, ...IONS];
    let t=0;

    function draw() {
      ctx.clearRect(0,0,W,H);
      if (st.auto) { st.ry += 0.006; }
      t += 0.016;

      const allAnim = ALL.map(pt => {
        if (pt.type === 'ion') {
          const a = t*0.3 + pt.phase;
          const dist = 75 + 10*Math.sin(t*0.7+pt.phase);
          return {...pt, p:[dist*Math.cos(a), pt.p[1]+Math.sin(t+pt.phase)*6, dist*Math.sin(a)]};
        }
        if (pt.type === 'bp') {
          const pulse = 1 + 0.08*Math.sin(t*2 + pt.idx*0.3);
          return {...pt, r: pt.r*pulse};
        }
        return pt;
      });

      const rot  = rotate(allAnim.map(p => p.p), st.rx, st.ry);
      const proj = rot.map((p,i) => ({...allAnim[i], ...project(p[0],p[1],p[2],FOV,CX,CY), z:p[2]}));

      // Glow
      glow3d(ctx,CX,CY,120,'#06b6d4');
      glow3d(ctx,CX,CY,50,'#a855f7');

      // Conexiones backbone (cadena 1)
      const c1Proj = proj.slice(0, N_BP);
      const c2Proj = proj.slice(N_BP, 2*N_BP);
      ctx.lineWidth=1.8; ctx.setLineDash([]);
      for (let i=0; i<N_BP-1; i++) {
        ctx.strokeStyle='rgba(16,185,129,0.5)';
        ctx.beginPath(); ctx.moveTo(c1Proj[i].x,c1Proj[i].y); ctx.lineTo(c1Proj[i+1].x,c1Proj[i+1].y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(c2Proj[i].x,c2Proj[i].y); ctx.lineTo(c2Proj[i+1].x,c2Proj[i+1].y); ctx.stroke();
      }

      // Pares de bases (puentes de hidrógeno entre los dos backbones)
      const bpProj = proj.slice(2*N_BP, 2*N_BP + N_BP);
      for (let i=0; i<N_BP; i++) {
        ctx.strokeStyle = bpProj[i].c + '55';
        ctx.lineWidth = 1.2; ctx.setLineDash([2,3]);
        ctx.beginPath(); ctx.moveTo(c1Proj[i].x,c1Proj[i].y); ctx.lineTo(c2Proj[i].x,c2Proj[i].y); ctx.stroke();
      }
      ctx.setLineDash([]);

      [...proj].sort((a,b)=>a.z-b.z).forEach(d => {
        const rad = d.r * d.d;
        if (d.type==='bb1'||d.type==='bb2') {
          sphere3d(ctx,d.x,d.y,rad,'#10b981');
        } else if (d.type==='bp') {
          sphere3d(ctx,d.x,d.y,rad,d.c);
          glow3d(ctx,d.x,d.y,rad*1.8,d.c);
          if (d.idx%5===0) {
            ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
            ctx.fillStyle=d.c+'cc'; ctx.fillText(d.pair,d.x,d.y+rad+8);
          }
        } else if (d.type==='ion') {
          ctx.fillStyle='rgba(6,182,212,0.35)';
          ctx.beginPath(); ctx.arc(d.x,d.y,Math.max(rad,1),0,Math.PI*2); ctx.fill();
        }
      });

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(6,182,212,0.85)';
      ctx.fillText('Doble H\u00e9lice B-DNA \u2014 10.5 pb/vuelta \u2014 Watson & Crick 1953', CX, H-18);

      legend(ctx,[
        {c:'#10b981', t:'Cadenas fosfodiéster (backbone 5\'→3\')'},
        {c:'#06b6d4', t:'Par A·T (2 puentes de hidrógeno)'},
        {c:'#a855f7', t:'Par G·C (3 puentes de hidrógeno)'},
        {c:'#06b6d4', t:'Iones de hidratación / contraiones'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-1: ADN/ARN — Dogma Central animado
     ADN → ARNm (transcripción) → Proteína (traducción)
     3 nodos principales con flujo de información
  ══════════════════════════════════════════════════════════ */
  function drawADN(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX=W/2, CY=H/2, FOV=650;
    const st={rx:0.12, ry:0, auto:true};
    addDrag(canvas,st);

    // Nodo ADN (doble hélice compacta)
    const ADN_NODE = spherePts(30,60).map(p=>({p,c:'#10b981',r:2.8,type:'adn'}));

    // Nodo ARNm (hebra simple)
    const ARNM_NODE = [];
    for (let i=0;i<30;i++){
      const a=(i/30)*Math.PI*2;
      ARNM_NODE.push({p:[80+20*Math.cos(a), (i/30)*50-25, 20*Math.sin(a)], c:'#f59e0b', r:2.5, type:'arnm'});
    }

    // Nodo Proteína (ovillo globular)
    const PROT_NODE = spherePts(28,55).map(p=>({p:[p[0]-85,p[1],p[2]], c:'#a855f7', r:2.5, type:'prot'}));

    // Partículas de flujo: ADN → ARNm (transcripción)
    const TRANS = [];
    for(let i=0;i<12;i++){
      TRANS.push({p:[i*7-42, (i%3-1)*15, 20-i*4], c:'#f59e0b', r:3, type:'trns', phase:i*0.4, progress:i/12});
    }

    // Partículas de flujo: ARNm → Proteína (traducción)
    const TRAD = [];
    for(let i=0;i<10;i++){
      TRAD.push({p:[80-i*8, (i%3-1)*12, (i%2)*20], c:'#a855f7', r:3, type:'trad', phase:i*0.5, progress:i/10});
    }

    // RNAP II (complejo grande, sobre ADN)
    const RNAP = spherePts(20,40).map(p=>({p:[p[0]+15, p[1]+35, p[2]], c:'#06b6d4', r:2.5, type:'rnap'}));

    // Ribosoma (complejo grande, sobre ARNm)
    const RIBO = spherePts(22,45).map(p=>({p:[p[0]+80, p[1]-5, p[2]+30], c:'#ef4444', r:2.5, type:'ribo'}));

    const ALL=[...ADN_NODE,...ARNM_NODE,...PROT_NODE,...TRANS,...TRAD,...RNAP,...RIBO];
    let t=0;

    function draw(){
      ctx.clearRect(0,0,W,H);
      if(st.auto) st.ry+=0.004;
      t+=0.016;

      const allAnim=ALL.map(pt=>{
        if(pt.type==='trns'){
          pt.progress=(pt.progress+0.006)%1;
          const x=-42+pt.progress*90, y=(pt.phase%3-1)*15*Math.sin(t+pt.phase), z=20-pt.progress*40;
          return {...pt,p:[x,y,z]};
        }
        if(pt.type==='trad'){
          pt.progress=(pt.progress+0.006)%1;
          const x=80-pt.progress*80, y=(pt.phase%3-1)*12, z=(pt.phase%2)*20;
          return {...pt,p:[x,y,z]};
        }
        return pt;
      });

      const rot=rotate(allAnim.map(p=>p.p),st.rx,st.ry);
      const proj=rot.map((p,i)=>({...allAnim[i],...project(p[0],p[1],p[2],FOV,CX,CY),z:p[2]}));

      glow3d(ctx,CX-85,CY,90,'#10b981');
      glow3d(ctx,CX+60,CY,70,'#f59e0b');
      glow3d(ctx,CX-60,CY+20,70,'#a855f7');

      // Flechas de flujo de información
      const drawArrow=(x1,y1,x2,y2,color,label)=>{
        ctx.strokeStyle=color+'88'; ctx.lineWidth=2.5; ctx.setLineDash([5,5]);
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
        ctx.fillStyle=color+'cc'; ctx.fillText(label,(x1+x2)/2,(y1+y2)/2-10);
      };

      [...proj].sort((a,b)=>a.z-b.z).forEach(d=>{
        const rad=d.r*d.d;
        if(d.type==='adn'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b98188'); g.addColorStop(1,'#10b98115');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='arnm'){
          sphere3d(ctx,d.x,d.y,rad,'#f59e0b');
        } else if(d.type==='prot'){
          const g2=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g2.addColorStop(0,'#a855f788'); g2.addColorStop(1,'#a855f715');
          ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='trns'){
          sphere3d(ctx,d.x,d.y,rad,'#f59e0b');
          glow3d(ctx,d.x,d.y,rad*1.8,'#f59e0b');
        } else if(d.type==='trad'){
          sphere3d(ctx,d.x,d.y,rad,'#a855f7');
          glow3d(ctx,d.x,d.y,rad*1.8,'#a855f7');
        } else if(d.type==='rnap'){
          sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
        } else if(d.type==='ribo'){
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        }
      });

      // Etiquetas de nodos
      const rnadnR = rotate([[15,0,0]], st.rx, st.ry)[0];
      const prnadnP = project(rnadnR[0],rnadnR[1],rnadnR[2],FOV,CX,CY);
      ctx.font='bold 11px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.fillText('ADN',CX-80,CY-40);
      ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.fillText('ARNm',CX+60,CY-40);
      ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.fillText('Prote\u00edna',CX-60,CY+50);
      ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.fillText('RNAP II',CX-55,CY+35);
      ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.fillText('Ribosoma 80S',CX+90,CY+45);

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(6,182,212,0.85)';
      ctx.fillText('Dogma Central \u2014 ADN \u2192 ARNm \u2192 Prote\u00edna', CX, H-18);

      legend(ctx,[
        {c:'#10b981', t:'ADN (doble h\u00e9lice B)'},
        {c:'#06b6d4', t:'RNAP II (transcripci\u00f3n)'},
        {c:'#f59e0b', t:'ARNm maduro (cap + poli-A)'},
        {c:'#ef4444', t:'Ribosoma 80S (traducci\u00f3n)'},
        {c:'#a855f7', t:'Prote\u00edna naciente (polip\u00e9ptido)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-2: CRISPR-Cas9 — RNP con sgRNA cortando el ADN
     Cas9 abriendo la doble hélice con el sgRNA hibridado
  ══════════════════════════════════════════════════════════ */
  function drawCRISPR(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX=W/2, CY=H/2, FOV=660;
    const st={rx:0.15, ry:0, auto:true};
    addDrag(canvas,st);

    // Cas9 proteína (dos lóbulos: RuvC y HNH)
    const CAS9_RUVC = spherePts(32,60).map(p=>({p:[p[0]-15,p[1]+10,p[2]],c:'#10b981',r:2.8,type:'cas9r'}));
    const CAS9_HNH  = spherePts(24,45).map(p=>({p:[p[0]+20,p[1]-15,p[2]],c:'#06b6d4',r:2.5,type:'cas9h'}));

    // sgRNA (hebra de ARN guía, loop scaffold + spacer)
    const SGRNA=[];
    for(let i=0;i<28;i++){
      const a=(i/28)*Math.PI*1.6 - Math.PI*0.8;
      SGRNA.push({p:[55*Math.cos(a)+5, i*3.5-48, 55*Math.sin(a)], c:'#f59e0b',r:2.5,type:'sg'});
    }
    // Spacer (20 nt hibridado con el ADN diana)
    const SPACER=[];
    for(let i=0;i<20;i++){
      SPACER.push({p:[-45+i*4.5, -10+i*1.5, 35-i*3], c:'#fbbf24',r:3,type:'spacer'});
    }

    // ADN diana (abierto en la zona de corte, R-loop)
    const DNADIANA=[];
    for(let i=0;i<32;i++){
      const isOpen = i>8 && i<18; // zona de apertura (R-loop)
      const spreadY = isOpen ? (i%2===0 ? 14 : -14) : 0;
      const x=-75+i*5.5;
      DNADIANA.push({p:[x, spreadY, 15+(isOpen?(i%2===0?8:-8):0)], c:isOpen?'#ef4444':'#a855f7',r:2.8,type:'dna1',idx:i,isOpen});
      DNADIANA.push({p:[x, spreadY*-1, -15-(isOpen?(i%2===0?8:-8):0)], c:isOpen?'#ef4444':'#a855f7',r:2.8,type:'dna2',idx:i,isOpen});
    }

    // PAM site (3 bp: NGG)
    const PAM=[
      {p:[13,8,15], c:'#ef4444',r:5,type:'pam'},
      {p:[18,8,15], c:'#ef4444',r:5,type:'pam'},
      {p:[23,8,15], c:'#ef4444',r:5,type:'pam'},
    ];

    // Tijeras (símbolo del corte DSB)
    const CUT_PARTICLES=[];
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2;
      CUT_PARTICLES.push({p:[0+12*Math.cos(a),25*Math.sin(a),15], c:'#ef4444',r:2,type:'cut',phase:i*0.4});
    }

    const ALL=[...CAS9_RUVC,...CAS9_HNH,...SGRNA,...SPACER,...DNADIANA,...PAM,...CUT_PARTICLES];
    let t=0;

    function draw(){
      ctx.clearRect(0,0,W,H);
      if(st.auto) st.ry+=0.004;
      t+=0.016;

      const allAnim=ALL.map(pt=>{
        if(pt.type==='cut'){
          const dist=8+6*Math.sin(t*3+pt.phase);
          const a=(pt.phase/0.4/8)*Math.PI*2 + t*2;
          return {...pt,p:[dist*Math.cos(a), dist*Math.sin(a)*2, 15]};
        }
        return pt;
      });

      const rot=rotate(allAnim.map(p=>p.p),st.rx,st.ry);
      const proj=rot.map((p,i)=>({...allAnim[i],...project(p[0],p[1],p[2],FOV,CX,CY),z:p[2]}));

      glow3d(ctx,CX,CY,90,'#10b981');
      glow3d(ctx,CX-10,CY-10,50,'#06b6d4');
      glow3d(ctx,CX+5,CY+20,40,'#ef4444');

      [...proj].sort((a,b)=>a.z-b.z).forEach(d=>{
        const rad=d.r*d.d;
        if(d.type==='cas9r'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b98188'); g.addColorStop(1,'#10b98115');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='cas9h'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#06b6d488'); g.addColorStop(1,'#06b6d415');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='sg'){
          sphere3d(ctx,d.x,d.y,rad,'#f59e0b');
        } else if(d.type==='spacer'){
          sphere3d(ctx,d.x,d.y,rad,'#fbbf24');
          glow3d(ctx,d.x,d.y,rad*1.5,'#fbbf24');
        } else if(d.type==='dna1'||d.type==='dna2'){
          sphere3d(ctx,d.x,d.y,rad, d.isOpen?'#ef4444':'#a855f7');
          if(d.isOpen) glow3d(ctx,d.x,d.y,rad*1.6,'#ef4444');
        } else if(d.type==='pam'){
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
          glow3d(ctx,d.x,d.y,rad*2.2,'#ef4444');
        } else if(d.type==='cut'){
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
          glow3d(ctx,d.x,d.y,rad*2,'#ef4444');
        }
      });

      ctx.font='bold 9px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.fillText('PAM: 5\'-NGG-3\'',CX+20,CY+50);
      ctx.fillStyle='rgba(16,185,129,0.85)'; ctx.fillText('Cas9 (RuvC)',CX-50,CY-50);
      ctx.fillStyle='rgba(6,182,212,0.85)'; ctx.fillText('Cas9 (HNH)',CX+30,CY-50);
      ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.fillText('sgRNA',CX+85,CY-20);
      ctx.fillStyle='rgba(239,68,68,0.85)'; ctx.fillText('R-loop (DSB)',CX+5,CY+35);

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(6,182,212,0.85)';
      ctx.fillText('CRISPR-Cas9 \u2014 sgRNA guiando la nucleasa al PAM · Corte DSB', CX, H-18);

      legend(ctx,[
        {c:'#10b981', t:'Cas9 dom. RuvC (corta hebra sin PAM)'},
        {c:'#06b6d4', t:'Cas9 dom. HNH (corta hebra complementaria)'},
        {c:'#f59e0b', t:'sgRNA — spacer 20 nt + scaffold tracrRNA'},
        {c:'#fbbf24', t:'Spacer hibridado (R-loop, 20 pb)'},
        {c:'#ef4444', t:'Sitio PAM (5\'-NGG-3\') + zona de corte DSB'},
        {c:'#a855f7', t:'ADN diana (alejado del PAM, sin corte)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-3: EPIGENÉTICA — Nucleosoma con histonas y modificaciones
     Octámero H2A/H2B/H3/H4 con ADN enrollado + colas modificadas
  ══════════════════════════════════════════════════════════ */
  function drawEpigenetica(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX=W/2, CY=H/2, FOV=660;
    const st={rx:0.18, ry:0, auto:true};
    addDrag(canvas,st);

    // Octámero de histonas: H3-H4 tetrámero (centro) + 2×H2A-H2B dímeros
    const H3H4 = spherePts(22,45).map(p=>({p,c:'#10b981',r:2.5,type:'h3h4'}));
    const H2AB_1 = spherePts(16,32).map(p=>({p:[p[0]+28,p[1]+10,p[2]-10],c:'#a855f7',r:2.2,type:'h2ab'}));
    const H2AB_2 = spherePts(16,32).map(p=>({p:[p[0]-28,p[1]-10,p[2]+10],c:'#a855f7',r:2.2,type:'h2ab'}));

    // ADN enrollado: 147 pb ≈ 1.65 vueltas alrededor del octámero
    const DNA_WRAPPED=[];
    const N_WRAPPED=60;
    for(let i=0;i<N_WRAPPED;i++){
      const t2=(i/N_WRAPPED)*1.65*Math.PI*2;
      const r=34, y=(i/N_WRAPPED)*30-15;
      DNA_WRAPPED.push({p:[r*Math.cos(t2),y,r*Math.sin(t2)],c:i%2===0?'#06b6d4':'#22d3ee',r:2.2,type:'dna_w'});
    }

    // Colas de histonas (N-terminales) con modificaciones
    const TAILS=[];
    // H3 K4me3 (activación) — verde brillante
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*0.5 - Math.PI*0.2;
      TAILS.push({p:[40*Math.cos(a)+22,35+i*5,40*Math.sin(a)],c:'#10b981',r:2.5,type:'tail_ac',label:i===7?'H3K4me3':''});
    }
    // H3 K27me3 (represión) — rojo
    for(let i=0;i<7;i++){
      const a=(i/7)*Math.PI*0.5 + Math.PI*0.7;
      TAILS.push({p:[38*Math.cos(a)-20,30+i*5,38*Math.sin(a)],c:'#ef4444',r:2.5,type:'tail_me',label:i===6?'H3K27me3':''});
    }
    // H4 K16ac (apertura cromatina) — amarillo
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*0.5 + Math.PI*1.3;
      TAILS.push({p:[36*Math.cos(a),-(25+i*5),36*Math.sin(a)],c:'#f59e0b',r:2.5,type:'tail_ac2',label:i===5?'H4K16ac':''});
    }

    // γH2AX (fosforilación en daño al ADN) — pulsante
    const GAMMAX=[{p:[28,10,-10],c:'#ef4444',r:6,type:'gammax',pulse:0}];

    // Grupos metilo en CpG (metilación del ADN)
    const METHYL=[];
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      METHYL.push({p:[34*Math.cos(a),2,34*Math.sin(a)],c:'#fbbf24',r:3,type:'met5mc',phase:i*0.6});
    }

    const ALL=[...H3H4,...H2AB_1,...H2AB_2,...DNA_WRAPPED,...TAILS,...GAMMAX,...METHYL];
    let t=0;

    function draw(){
      ctx.clearRect(0,0,W,H);
      if(st.auto) st.ry+=0.004;
      t+=0.016;

      const allAnim=ALL.map(pt=>{
        if(pt.type==='gammax'){
          return {...pt,r:6*(1+0.3*Math.sin(t*3))};
        }
        if(pt.type==='met5mc'){
          return {...pt,r:3*(1+0.15*Math.sin(t*2+pt.phase))};
        }
        return pt;
      });

      const rot=rotate(allAnim.map(p=>p.p),st.rx,st.ry);
      const proj=rot.map((p,i)=>({...allAnim[i],...project(p[0],p[1],p[2],FOV,CX,CY),z:p[2]}));

      glow3d(ctx,CX,CY,100,'#10b981');
      glow3d(ctx,CX-20,CY-20,50,'#a855f7');

      [...proj].sort((a,b)=>a.z-b.z).forEach(d=>{
        const rad=d.r*d.d;
        if(d.type==='h3h4'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#10b98188'); g.addColorStop(1,'#10b98115');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='h2ab'){
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#a855f777'); g.addColorStop(1,'#a855f713');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
        } else if(d.type==='dna_w'){
          sphere3d(ctx,d.x,d.y,rad,d.c);
        } else if(d.type==='tail_ac'||d.type==='tail_ac2'){
          sphere3d(ctx,d.x,d.y,rad,d.c);
          glow3d(ctx,d.x,d.y,rad*1.5,d.c);
          if(d.label){ ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
            ctx.fillStyle=d.c+'dd'; ctx.fillText(d.label,d.x,d.y+rad+10); }
        } else if(d.type==='tail_me'){
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
          glow3d(ctx,d.x,d.y,rad*1.5,'#ef4444');
          if(d.label){ ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
            ctx.fillStyle='#ef4444dd'; ctx.fillText(d.label,d.x,d.y+rad+10); }
        } else if(d.type==='gammax'){
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
          glow3d(ctx,d.x,d.y,rad*2.5,'#ef4444');
          ctx.font='bold 8px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.fillText('\u03b3H2AX',d.x,d.y-rad-5);
        } else if(d.type==='met5mc'){
          sphere3d(ctx,d.x,d.y,rad,'#fbbf24');
          glow3d(ctx,d.x,d.y,rad*2,'#fbbf24');
          ctx.font='6px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(251,191,36,0.85)'; ctx.fillText('5mC',d.x,d.y+rad+7);
        }
      });

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(6,182,212,0.85)';
      ctx.fillText('Nucleosoma \u2014 Octámero Histonas · Código de Histonas · 5-Metilcitosina', CX, H-18);

      legend(ctx,[
        {c:'#10b981', t:'Tetrámero H3-H4 (centro del nucleosoma)'},
        {c:'#a855f7', t:'Dímeros H2A-H2B (flancos)'},
        {c:'#06b6d4', t:'ADN enrollado (147 pb, 1.65 vueltas)'},
        {c:'#10b981', t:'H3K4me3 — marca de activación transcripcional'},
        {c:'#ef4444', t:'H3K27me3 — marca de represión (Polycomb)'},
        {c:'#f59e0b', t:'H4K16ac — apertura cromatina'},
        {c:'#fbbf24', t:'5-metilcitosina (5mC) — silenciamiento CpG'},
        {c:'#ef4444', t:'\u03b3H2AX — marcador de rotura doble cadena (DSB)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     3D-4: ARNm / LNP — Nanopartícula Lipídica con ARNm
     Bicapa lipídica con ARNm encapsulado + proceso de endocitosis
  ══════════════════════════════════════════════════════════ */
  function drawARNm(canvas) {
    const { ctx, W, H } = setupCanvas(canvas);
    const CX=W/2, CY=H/2, FOV=650;
    const st={rx:0.12, ry:0, auto:true};
    addDrag(canvas,st);

    // LNP — capa lipídica exterior (lípidos ionizables ALC-0315)
    const OUTER = spherePts(65,120).map(p=>({p,c:'#f59e0b',r:2.2,type:'lip_out'}));

    // ARNm encapsulado (espiral dentro de la LNP)
    const ARNM_INSIDE=[];
    for(let i=0;i<50;i++){
      const t2=(i/50)*4*Math.PI;
      const r=28*(1-i/80), y=(i/50)*50-25;
      ARNM_INSIDE.push({p:[r*Math.cos(t2),y,r*Math.sin(t2)],c:'#a855f7',r:2.5,type:'arnm_in'});
    }

    // Cabezas polares (PEG-lípido ALC-0159 — stealth)
    const PEG_HEADS=[];
    spherePts(72,35).forEach(p=>{
      PEG_HEADS.push({p,c:'#06b6d4',r:2.8,type:'peg'});
    });

    // Colesterol (fluidez de membrana)
    const CHOL=[];
    spherePts(50,25).forEach(p=>{
      CHOL.push({p,c:'#10b981',r:1.8,type:'chol'});
    });

    // Receptor en membrana celular (destino)
    const CELL_MEM=[];
    for(let x=-120;x<=120;x+=14){
      CELL_MEM.push({p:[x,75, (x%28)*1.5],c:'#ef4444',r:2.2,type:'cmem'});
    }

    // Proceso de liberación del ARNm (partículas saliendo)
    const RELEASE=[];
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2;
      RELEASE.push({p:[85*Math.cos(a),40,85*Math.sin(a)],c:'#a855f7',r:3.5,type:'rel',phase:i*0.45});
    }

    const ALL=[...OUTER,...PEG_HEADS,...CHOL,...ARNM_INSIDE,...CELL_MEM,...RELEASE];
    let t=0;

    function draw(){
      ctx.clearRect(0,0,W,H);
      if(st.auto) st.ry+=0.0045;
      t+=0.016;

      const allAnim=ALL.map(pt=>{
        if(pt.type==='rel'){
          const dist=85+20*Math.sin(t*0.8+pt.phase);
          const a=(pt.phase/0.45/8)*Math.PI*2 + t*0.2;
          return {...pt,p:[dist*Math.cos(a),40+Math.sin(t+pt.phase)*12,dist*Math.sin(a)]};
        }
        if(pt.type==='cmem'){
          return {...pt,p:[pt.p[0],75+Math.sin(t*0.6+pt.p[0]*0.05)*4,pt.p[2]]};
        }
        return pt;
      });

      const rot=rotate(allAnim.map(p=>p.p),st.rx,st.ry);
      const proj=rot.map((p,i)=>({...allAnim[i],...project(p[0],p[1],p[2],FOV,CX,CY),z:p[2]}));

      glow3d(ctx,CX,CY,110,'#f59e0b');
      glow3d(ctx,CX,CY,55,'#a855f7');
      glow3d(ctx,CX,CY+70,70,'#ef4444');

      [...proj].sort((a,b)=>a.z-b.z).forEach(d=>{
        const rad=d.r*d.d;
        if(d.type==='lip_out'){
          ctx.globalAlpha=0.32;
          const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,rad);
          g.addColorStop(0,'#f59e0baa'); g.addColorStop(1,'#f59e0b22');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,rad,0,Math.PI*2); ctx.fill();
          ctx.globalAlpha=1;
        } else if(d.type==='peg'){
          ctx.globalAlpha=0.45;
          sphere3d(ctx,d.x,d.y,rad,'#06b6d4');
          ctx.globalAlpha=1;
        } else if(d.type==='chol'){
          ctx.globalAlpha=0.4;
          sphere3d(ctx,d.x,d.y,rad,'#10b981');
          ctx.globalAlpha=1;
        } else if(d.type==='arnm_in'){
          sphere3d(ctx,d.x,d.y,rad,'#a855f7');
          glow3d(ctx,d.x,d.y,rad*1.5,'#a855f7');
        } else if(d.type==='cmem'){
          sphere3d(ctx,d.x,d.y,rad,'#ef4444');
        } else if(d.type==='rel'){
          sphere3d(ctx,d.x,d.y,rad,'#a855f7');
          glow3d(ctx,d.x,d.y,rad*2.2,'#a855f7');
          ctx.font='7px "JetBrains Mono",monospace'; ctx.textAlign='center';
          ctx.fillStyle='rgba(168,85,247,0.85)'; ctx.fillText('ARNm',d.x,d.y+rad+9);
        }
      });

      ctx.font='bold 9px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.fillText('LNP (~90 nm)',CX,CY-80);
      ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.fillText('ARNm-m\u00b9\u03a8 encapsulado',CX,CY);
      ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.fillText('PEG-l\u00edpido (stealth)',CX+90,CY-30);
      ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.fillText('Membrana celular (diana)',CX,CY+82);

      ctx.font='bold 10px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(6,182,212,0.85)';
      ctx.fillText('Nanopart\u00edcula Lip\u00eddica (LNP) \u2014 ARNm-m\u00b9\u03a8 \u2014 Vacuna COVID-19', CX, H-18);

      legend(ctx,[
        {c:'#f59e0b', t:'L\u00edpido ionizable ALC-0315 (escape endosomal)'},
        {c:'#06b6d4', t:'PEG-l\u00edpido ALC-0159 (stealth, 2000 Da)'},
        {c:'#10b981', t:'Colesterol (fluidez de membrana lip\u00eddica)'},
        {c:'#a855f7', t:'ARNm-m\u00b9\u03a8 (N1-metilpseudouridina, Nobel 2023)'},
        {c:'#ef4444', t:'Membrana celular (c\u00e9l. dendrit\u00edca / muscular)'},
      ]);
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ══════════════════════════════════════════════════════════
     TABS — lazy canvas init
  ══════════════════════════════════════════════════════════ */
  function initTabs(canvasMap) {
    const btns   = $$('.bm-tab-btn');
    const panels = $$('.bm-panel');
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
                const wrap = c.closest('.bm-3d');
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
        const target = parseFloat(el.dataset.bmCount);
        const suf = el.dataset.bmSuf || '';
        const dec = +(el.dataset.bmDec || 0);
        const dur = 1800;
        const start = performance.now();
        const tick = now => {
          const prog = Math.min((now-start)/dur,1), ease = 1-Math.pow(1-prog,3);
          el.textContent = (ease*target).toFixed(dec)+suf;
          if (prog<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-bm-count]').forEach(e => io.observe(e));
  }

  /* ── REVEAL ── */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('bm-revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('[data-bm-reveal]').forEach(el => io.observe(el));
  }

  /* ── INIT ── */
  function init() {
    const canvasMap = {
      'bm-canvas-adn':        drawADN,
      'bm-canvas-crispr':     drawCRISPR,
      'bm-canvas-epigenetica':drawEpigenetica,
      'bm-canvas-arnm':       drawARNm,
    };
    initTabs(canvasMap);
    initCounters();
    initReveal();

    // Hero canvas robusto
    (function initHeroCanvas() {
      const hc = document.getElementById('bm-hero-canvas');
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
        const heroVis = hc.closest('.bm-hero-vis') || hc.parentElement;
        if (heroVis) ro.observe(heroVis);
        setTimeout(() => { ro.disconnect(); tryDraw(); }, 3000);
      } else {
        setTimeout(tryDraw, 400);
      }
    })();

    // Navbar scroll
    const nb = document.getElementById('navbar');
    if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    // Mobile nav toggle
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

  return { version: '1.0.0', module: 'BM-BiologiaMolecular' };
})();
