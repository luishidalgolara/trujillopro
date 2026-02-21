/* ============================================================
   gc-renderers.js — PharmaLab Chile | Galería Química General
   Renderers 3D con Canvas API — uno por concepto de química
   Depende de: gc-state.js
   ============================================================ */

'use strict';

const Renderers = {

  /* ─── Átomo ─── */
  atom(ctx, w, h, t, rx, ry, zm) {
    const cx = w/2, cy = h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160*zm);
    bg.addColorStop(0,'rgba(168,85,247,0.1)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);

    // Núcleo
    const nucGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18*zm);
    nucGrad.addColorStop(0,'rgba(239,68,68,1)'); nucGrad.addColorStop(1,'rgba(239,68,68,0.4)');
    ctx.beginPath(); ctx.arc(cx, cy, 18*zm, 0, Math.PI*2);
    ctx.fillStyle = nucGrad; ctx.fill();
    ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=2; ctx.stroke();

    // Orbitales elípticos (3 planos)
    const orbits = [
      { rx: 110, ry: 40, tilt: 0,      color: 'rgba(168,85,247,0.5)', eColor: '#a855f7' },
      { rx: 110, ry: 40, tilt: Math.PI/3, color: 'rgba(6,182,212,0.5)',  eColor: '#06b6d4' },
      { rx: 110, ry: 40, tilt: -Math.PI/3, color: 'rgba(16,185,129,0.5)', eColor: '#10b981' }
    ];
    orbits.forEach((o, i) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(o.tilt + ry*0.4);
      ctx.beginPath(); ctx.ellipse(0, 0, o.rx*zm, o.ry*zm, 0, 0, Math.PI*2);
      ctx.strokeStyle = o.color; ctx.lineWidth = 1.5; ctx.stroke();
      // Electrón en órbita
      const ang = t*0.0015 + i*(Math.PI*2/3);
      const ex = o.rx*zm * Math.cos(ang);
      const ey = o.ry*zm * Math.sin(ang);
      const eGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 7*zm);
      eGrad.addColorStop(0, o.eColor); eGrad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(ex, ey, 7*zm, 0, Math.PI*2);
      ctx.fillStyle = eGrad; ctx.fill();
      // Trazo de estela
      ctx.beginPath();
      for(let s=1;s<=8;s++){
        const sa = ang - s*0.12;
        const sx = o.rx*zm*Math.cos(sa), sy = o.ry*zm*Math.sin(sa);
        s===1?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
      }
      ctx.strokeStyle = o.eColor.replace(')',',0.3)').replace('rgb','rgba'); ctx.lineWidth=3; ctx.stroke();
      ctx.restore();
    });
    // Nube de probabilidad (puntos)
    for(let i=0;i<30;i++){
      const ang = (i/30)*Math.PI*2 + t*0.0002;
      const r = (55+Math.sin(ang*5+t*0.001)*25)*zm;
      const px = cx + r*Math.cos(ang), py = cy + r*Math.sin(ang)*0.7;
      ctx.beginPath(); ctx.arc(px,py,1.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.35)'; ctx.fill();
    }
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ÁTOMO', cx, cy-140*zm);
    ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.font=`${8*zm}px JetBrains Mono,monospace`;
    ctx.fillText('● Núcleo', cx-50*zm, cy+130*zm);
    ctx.fillStyle='rgba(168,85,247,0.8)';
    ctx.fillText('● e⁻ en orbitales', cx+40*zm, cy+130*zm);
  },

  /* ─── Molécula (H₂O) ─── */
  molecule(ctx, w, h, t, rx, ry, zm) {
    const cx = w/2, cy = h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160*zm);
    bg.addColorStop(0,'rgba(6,182,212,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    // Rotación lenta
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ry*0.5);
    // Ángulo H-O-H = 104.5°
    const angle = 104.5 * Math.PI / 180;
    const bondLen = 90*zm;
    const h1x = -Math.sin(angle/2)*bondLen, h1y = Math.cos(angle/2)*bondLen;
    const h2x =  Math.sin(angle/2)*bondLen, h2y = Math.cos(angle/2)*bondLen;
    // Enlace O-H (varillas)
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=5*zm;
    ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(h1x, h1y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(h2x, h2y); ctx.stroke();
    // Nube electrónica parcial (momento dipolar)
    const dipGrad = ctx.createLinearGradient(0,-60*zm, 0, 60*zm);
    dipGrad.addColorStop(0,'rgba(239,68,68,0.07)'); dipGrad.addColorStop(1,'rgba(6,182,212,0.07)');
    ctx.beginPath(); ctx.ellipse(0, 20*zm, 70*zm, 90*zm, 0, 0, Math.PI*2);
    ctx.fillStyle=dipGrad; ctx.fill();
    // Átomo O (grande, rojo)
    const oGrad = ctx.createRadialGradient(-8*zm,-8*zm,0,0,0,30*zm);
    oGrad.addColorStop(0,'rgba(239,68,68,1)'); oGrad.addColorStop(1,'rgba(180,0,0,0.8)');
    ctx.beginPath(); ctx.arc(0,0,30*zm,0,Math.PI*2);
    ctx.fillStyle=oGrad; ctx.fill();
    ctx.strokeStyle='rgba(255,100,100,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`bold ${14*zm}px Outfit,sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('O', 0, 0);
    // Pares libres (líneas)
    ctx.strokeStyle='rgba(245,158,11,0.6)'; ctx.lineWidth=2*zm;
    ctx.beginPath(); ctx.moveTo(-20*zm,-20*zm); ctx.lineTo(-40*zm,-35*zm); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20*zm,-20*zm); ctx.lineTo(40*zm,-35*zm); ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText(':.', -40*zm,-38*zm); ctx.fillText(':.', 38*zm,-38*zm);
    // Átomos H
    [[h1x,h1y],[h2x,h2y]].forEach(([hx,hy]) => {
      const hGrad = ctx.createRadialGradient(hx-4*zm,hy-4*zm,0,hx,hy,18*zm);
      hGrad.addColorStop(0,'rgba(220,220,255,1)'); hGrad.addColorStop(1,'rgba(100,100,200,0.7)');
      ctx.beginPath(); ctx.arc(hx,hy,18*zm,0,Math.PI*2);
      ctx.fillStyle=hGrad; ctx.fill();
      ctx.strokeStyle='rgba(160,160,255,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`bold ${12*zm}px Outfit,sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('H', hx, hy);
    });
    // δ cargas
    ctx.fillStyle='rgba(239,68,68,0.85)'; ctx.font=`${10*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText('δ⁻', 10*zm, -35*zm);
    ctx.fillStyle='rgba(6,182,212,0.85)';
    ctx.fillText('δ⁺', h1x-5*zm, h1y+28*zm);
    ctx.fillText('δ⁺', h2x-5*zm, h2y+28*zm);
    ctx.restore();
    // Ángulo label
    ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('104.5°', cx, cy+28*zm);
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`;
    ctx.fillText('MOLÉCULA H₂O', cx, cy-140*zm);
  },

  /* ─── Elemento (Tabla Periódica) ─── */
  element(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Mini tabla periódica simplificada (bloques)
    const periods = 4, groups = 8;
    const cw = 22*zm, ch = 20*zm;
    const startX = cx - (groups*cw)/2, startY = cy - (periods*ch)/2 - 20*zm;
    const highlights = [{p:1,g:0,'col':'rgba(16,185,129,0.9)'}, // H
                        {p:2,g:0,'col':'rgba(245,158,11,0.9)'},  // Li
                        {p:3,g:7,'col':'rgba(239,68,68,0.9)'},   // F
                        {p:4,g:3,'col':'rgba(6,182,212,0.9)'}];  // Fe
    for(let p=0;p<periods;p++){
      for(let g=0;g<groups;g++){
        const x = startX + g*cw, y = startY + p*ch;
        // ¿este elemento está destacado?
        const hi = highlights.find(h=>h.p===p+1&&h.g===g);
        const pulse = hi ? 0.5+0.5*Math.sin(t*0.003) : 0;
        ctx.beginPath(); ctx.roundRect(x+1,y+1,cw-2,ch-2,3);
        ctx.fillStyle = hi ? hi.col.replace('0.9)',`${0.15+pulse*0.15})`) : 'rgba(168,85,247,0.06)';
        ctx.fill();
        ctx.strokeStyle = hi ? hi.col : 'rgba(168,85,247,0.2)';
        ctx.lineWidth = hi ? 1.5 : 0.5; ctx.stroke();
      }
    }
    // Grande tarjeta elemento C (carbono) destacado
    ctx.save(); ctx.translate(cx, cy+50*zm);
    const pulse2 = 0.5+0.5*Math.sin(t*0.002);
    const cardGrad = ctx.createLinearGradient(-50*zm,-55*zm,50*zm,55*zm);
    cardGrad.addColorStop(0,`rgba(168,85,247,${0.25+pulse2*0.1})`);
    cardGrad.addColorStop(1,`rgba(6,182,212,${0.15+pulse2*0.1})`);
    ctx.beginPath(); ctx.roundRect(-50*zm,-55*zm,100*zm,110*zm,12*zm);
    ctx.fillStyle=cardGrad; ctx.fill();
    ctx.strokeStyle=`rgba(168,85,247,${0.6+pulse2*0.3})`; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('6', 0, -36*zm);
    ctx.fillStyle='#fff'; ctx.font=`bold ${32*zm}px Outfit,sans-serif`;
    ctx.fillText('C', 0, 0);
    ctx.fillStyle='rgba(255,255,255,0.75)'; ctx.font=`${10*zm}px Outfit`;
    ctx.fillText('Carbono', 0, 20*zm);
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`${9*zm}px JetBrains Mono`;
    ctx.fillText('12.011', 0, 38*zm);
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ELEMENTO QUÍMICO', cx, cy-90*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Z · Símbolo · Nombre · Masa atómica', cx, cy-76*zm);
  },

  /* ─── Compuesto ─── */
  compound(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Cristal NaCl vista isométrica
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ry*0.3+t*0.0003);
    const cols = 3, ions = [
      {x:-80,y:-40,r:'Na',col:'rgba(245,158,11,0.9)',s:14},
      {x:0,y:-40,r:'Cl',col:'rgba(16,185,129,0.9)',s:18},
      {x:80,y:-40,r:'Na',col:'rgba(245,158,11,0.9)',s:14},
      {x:-80,y:10,r:'Cl',col:'rgba(16,185,129,0.9)',s:18},
      {x:0,y:10,r:'Na',col:'rgba(245,158,11,0.9)',s:14},
      {x:80,y:10,r:'Cl',col:'rgba(16,185,129,0.9)',s:18},
      {x:-80,y:60,r:'Na',col:'rgba(245,158,11,0.9)',s:14},
      {x:0,y:60,r:'Cl',col:'rgba(16,185,129,0.9)',s:18},
      {x:80,y:60,r:'Na',col:'rgba(245,158,11,0.9)',s:14}
    ];
    // Líneas de red
    [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8]].forEach(([a,b])=>{
      ctx.beginPath();
      ctx.moveTo(ions[a].x*zm, ions[a].y*zm);
      ctx.lineTo(ions[b].x*zm, ions[b].y*zm);
      ctx.strokeStyle='rgba(168,85,247,0.2)'; ctx.lineWidth=1.5; ctx.stroke();
    });
    ions.forEach(ion => {
      const pulse = 0.5+0.5*Math.sin(t*0.002+ion.x+ion.y);
      const g = ctx.createRadialGradient(ion.x*zm-3*zm,ion.y*zm-3*zm,0,ion.x*zm,ion.y*zm,ion.s*zm);
      g.addColorStop(0,ion.col); g.addColorStop(1,ion.col.replace('0.9','0.3'));
      ctx.beginPath(); ctx.arc(ion.x*zm, ion.y*zm, (ion.s+pulse*2)*zm, 0, Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      ctx.strokeStyle=ion.col.replace('0.9','0.7'); ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`bold ${8*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(ion.r, ion.x*zm, ion.y*zm);
    });
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('COMPUESTO NaCl', cx, cy-100*zm);
    ctx.fillStyle='rgba(245,158,11,0.65)'; ctx.font=`${9*zm}px JetBrains Mono`;
    ctx.fillText('■ Na⁺ (catión)', cx-50*zm, cy+120*zm);
    ctx.fillStyle='rgba(16,185,129,0.65)';
    ctx.fillText('■ Cl⁻ (anión)', cx+40*zm, cy+120*zm);
  },

  /* ─── Enlace Químico (genérico) ─── */
  chemicalBond(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ry*0.2);
    // Dos átomos con enlace sigma
    const d = 80*zm;
    // Átomo A
    const gA = ctx.createRadialGradient(-d,0,0,-d,0,28*zm);
    gA.addColorStop(0,'rgba(168,85,247,1)'); gA.addColorStop(1,'rgba(100,0,200,0.5)');
    ctx.beginPath(); ctx.arc(-d,0,28*zm,0,Math.PI*2);
    ctx.fillStyle=gA; ctx.fill(); ctx.strokeStyle='rgba(200,100,255,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`bold ${14*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('A', -d, 0);
    // Átomo B
    const gB = ctx.createRadialGradient(d,0,0,d,0,28*zm);
    gB.addColorStop(0,'rgba(6,182,212,1)'); gB.addColorStop(1,'rgba(0,100,180,0.5)');
    ctx.beginPath(); ctx.arc(d,0,28*zm,0,Math.PI*2);
    ctx.fillStyle=gB; ctx.fill(); ctx.strokeStyle='rgba(100,200,255,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`bold ${14*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('B', d, 0);
    // Densidad electrónica entre átomos (curva de probabilidad)
    const pulse = 0.5+0.5*Math.sin(t*0.002);
    const bondGrad = ctx.createLinearGradient(-d,0,d,0);
    bondGrad.addColorStop(0,'rgba(168,85,247,0.1)');
    bondGrad.addColorStop(0.5,`rgba(245,158,11,${0.4+pulse*0.3})`);
    bondGrad.addColorStop(1,'rgba(6,182,212,0.1)');
    ctx.beginPath(); ctx.ellipse(0, 0, (d-26)*zm, 18*zm*pulse, 0, 0, Math.PI*2);
    ctx.fillStyle=bondGrad; ctx.fill();
    // Curva de energía potencial (morse)
    ctx.save(); ctx.translate(0, 100*zm);
    ctx.beginPath();
    for(let i=0;i<=80;i++){
      const xx = (i-40)*3*zm;
      const rr = (i-40)*0.08+1.5;
      const morse = rr<0.5 ? 60 : (1-Math.exp(-1.2*(rr-1.5)))**2*40 - 40;
      const yy = -morse*zm;
      i===0?ctx.moveTo(xx,yy):ctx.lineTo(xx,yy);
    }
    ctx.strokeStyle='rgba(245,158,11,0.65)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.55)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Curva de Morse', 0, 20*zm);
    ctx.restore();
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ENLACE QUÍMICO', cx, cy-135*zm);
  },

  /* ─── Enlace Covalente ─── */
  covalentBond(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(6,182,212,0.07)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.25);
    // Triple enlace C≡C (etino)
    const d = 75*zm;
    // Orbital σ (central)
    const sGrad = ctx.createLinearGradient(-d,0,d,0);
    sGrad.addColorStop(0,'rgba(6,182,212,0.05)'); sGrad.addColorStop(0.5,'rgba(6,182,212,0.35)'); sGrad.addColorStop(1,'rgba(6,182,212,0.05)');
    ctx.beginPath(); ctx.ellipse(0,0,(d-22)*zm,12*zm,0,0,Math.PI*2);
    ctx.fillStyle=sGrad; ctx.fill();
    // Orbitales π (arriba y abajo) — dos lóbulos
    [-28*zm,28*zm].forEach(yoff => {
      const pGrad = ctx.createLinearGradient(-d,0,d,0);
      pGrad.addColorStop(0,'rgba(168,85,247,0.05)'); pGrad.addColorStop(0.5,`rgba(168,85,247,${0.25+0.15*Math.sin(t*0.002)})`); pGrad.addColorStop(1,'rgba(168,85,247,0.05)');
      ctx.beginPath(); ctx.ellipse(0, yoff, (d-22)*zm, 10*zm, 0, 0, Math.PI*2);
      ctx.fillStyle=pGrad; ctx.fill();
    });
    // Átomos C
    [[-d,0,'C'],[d,0,'C']].forEach(([ax,ay,lbl]) => {
      const g = ctx.createRadialGradient(ax-4*zm,ay-4*zm,0,ax,ay,22*zm);
      g.addColorStop(0,'rgba(80,80,80,1)'); g.addColorStop(1,'rgba(30,30,30,0.9)');
      ctx.beginPath(); ctx.arc(ax,ay,22*zm,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill(); ctx.strokeStyle='rgba(150,150,150,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`bold ${14*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(lbl, ax, ay);
    });
    // Etiquetas orbitales
    ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText('σ (superposición axial)', 0, 30*zm);
    ctx.fillStyle='rgba(168,85,247,0.8)';
    ctx.fillText('π (superposición lateral)', 0, -38*zm);
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ENLACE COVALENTE (C≡C)', cx, cy-130*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${9*zm}px JetBrains Mono`;
    ctx.fillText('835 kJ/mol · 120 pm · Triple enlace', cx, cy+140*zm);
  },

  /* ─── Enlace Iónico ─── */
  ionicBond(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ry*0.2);
    const d = 90*zm;
    // Flecha de transferencia electrónica
    const arrowProg = ((t*0.001)%1);
    const ex = -d + arrowProg*(2*d);
    const ey = -25*zm;
    ctx.beginPath();
    ctx.moveTo(-d+5*zm, ey); ctx.lineTo(d-5*zm, ey);
    ctx.strokeStyle='rgba(245,158,11,0.25)'; ctx.lineWidth=1.5; ctx.setLineDash([4*zm,4*zm]); ctx.stroke();
    ctx.setLineDash([]);
    // Electrón en movimiento
    const eGrad = ctx.createRadialGradient(ex,ey,0,ex,ey,7*zm);
    eGrad.addColorStop(0,'rgba(168,85,247,1)'); eGrad.addColorStop(1,'rgba(168,85,247,0)');
    ctx.beginPath(); ctx.arc(ex,ey,7*zm,0,Math.PI*2);
    ctx.fillStyle=eGrad; ctx.fill();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('e⁻', ex, ey);
    // Na (metal → pierde e⁻ → catión)
    const naGrad = ctx.createRadialGradient(-d-5*zm,-5*zm,0,-d,0,36*zm);
    naGrad.addColorStop(0,'rgba(245,158,11,1)'); naGrad.addColorStop(1,'rgba(180,100,0,0.6)');
    ctx.beginPath(); ctx.arc(-d, 0, 36*zm, 0, Math.PI*2);
    ctx.fillStyle=naGrad; ctx.fill(); ctx.strokeStyle='rgba(255,200,0,0.8)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`bold ${15*zm}px Outfit`; ctx.textBaseline='middle'; ctx.textAlign='center';
    ctx.fillText('Na', -d, 0);
    ctx.fillStyle='rgba(255,200,0,0.9)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText('Na⁺', -d, 45*zm);
    // Cl (no metal → gana e⁻ → anión)
    const clGrad = ctx.createRadialGradient(d-5*zm,-5*zm,0,d,0,36*zm);
    clGrad.addColorStop(0,'rgba(16,185,129,1)'); clGrad.addColorStop(1,'rgba(0,100,60,0.6)');
    ctx.beginPath(); ctx.arc(d, 0, 36*zm, 0, Math.PI*2);
    ctx.fillStyle=clGrad; ctx.fill(); ctx.strokeStyle='rgba(0,220,120,0.8)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`bold ${15*zm}px Outfit`; ctx.textBaseline='middle';
    ctx.fillText('Cl', d, 0);
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText('Cl⁻', d, 45*zm);
    // Flecha atracción
    ctx.fillStyle='rgba(168,85,247,0.5)'; ctx.font=`${18*zm}px Outfit`; ctx.textBaseline='middle';
    ctx.fillText('⟵⊕⊖⟶', 0, 0);
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ENLACE IÓNICO', cx, cy-110*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('ΔEN > 1.7 · Transferencia e⁻', cx, cy+130*zm);
  },

  /* ─── Enlace Metálico ─── */
  metallicBond(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(245,158,11,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ry*0.15);
    // Red de cationes Cu²⁺ (cuadrada)
    const ions = [];
    for(let row=-1;row<=1;row++) for(let col=-2;col<=2;col++) {
      ions.push({x:col*55*zm, y:row*55*zm});
    }
    // Electrones libres moviéndose
    for(let e=0;e<18;e++){
      const et = t*0.0018 + e*0.35;
      const ex = Math.sin(et*1.3+e)*110*zm;
      const ey = Math.cos(et*0.9+e*0.5)*80*zm;
      const eg = ctx.createRadialGradient(ex,ey,0,ex,ey,5*zm);
      eg.addColorStop(0,'rgba(168,85,247,0.9)'); eg.addColorStop(1,'rgba(168,85,247,0)');
      ctx.beginPath(); ctx.arc(ex,ey,5*zm,0,Math.PI*2);
      ctx.fillStyle=eg; ctx.fill();
    }
    // Cationes
    ions.forEach(ion => {
      const g = ctx.createRadialGradient(ion.x-3*zm,ion.y-3*zm,0,ion.x,ion.y,18*zm);
      g.addColorStop(0,'rgba(245,158,11,1)'); g.addColorStop(1,'rgba(180,80,0,0.7)');
      ctx.beginPath(); ctx.arc(ion.x,ion.y,18*zm,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill(); ctx.strokeStyle='rgba(255,200,50,0.5)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('Cu²⁺', ion.x, ion.y);
    });
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ENLACE METÁLICO', cx, cy-110*zm);
    ctx.fillStyle='rgba(245,158,11,0.6)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('■ Cationes Cu²⁺', cx-50*zm, cy+120*zm);
    ctx.fillStyle='rgba(168,85,247,0.6)';
    ctx.fillText('● e⁻ libres (mar)', cx+40*zm, cy+120*zm);
  },

  /* ─── Enlace de Hidrógeno ─── */
  hydrogenBond(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(34,211,238,0.07)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx, cy);
    // Dos moléculas de agua con puente H
    const drawWater = (ox, oy, flipped=false) => {
      const sign = flipped ? -1 : 1;
      const hx1 = ox - 45*zm, hy1 = oy + sign*35*zm;
      const hx2 = ox + 45*zm, hy2 = oy + sign*35*zm;
      // Enlace covalente O-H
      ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=5*zm; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(hx1,hy1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(hx2,hy2); ctx.stroke();
      // Oxígeno
      const og = ctx.createRadialGradient(ox-3*zm,oy-3*zm,0,ox,oy,22*zm);
      og.addColorStop(0,'rgba(239,68,68,1)'); og.addColorStop(1,'rgba(180,0,0,0.7)');
      ctx.beginPath(); ctx.arc(ox,oy,22*zm,0,Math.PI*2);
      ctx.fillStyle=og; ctx.fill();
      ctx.fillStyle='#fff'; ctx.font=`bold ${12*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('O', ox, oy);
      // Hidrógenos
      [[hx1,hy1],[hx2,hy2]].forEach(([hx,hy]) => {
        const hg = ctx.createRadialGradient(hx,hy,0,hx,hy,12*zm);
        hg.addColorStop(0,'rgba(200,200,255,1)'); hg.addColorStop(1,'rgba(80,80,180,0.7)');
        ctx.beginPath(); ctx.arc(hx,hy,12*zm,0,Math.PI*2);
        ctx.fillStyle=hg; ctx.fill();
        ctx.fillStyle='#fff'; ctx.font=`bold ${10*zm}px Outfit`; ctx.textBaseline='middle';
        ctx.fillText('H', hx, hy);
      });
    };
    drawWater(0, -55*zm, false);
    drawWater(0, 55*zm, true);
    // Puente de hidrógeno (línea punteada)
    const phPulse = 0.5+0.5*Math.sin(t*0.003);
    ctx.beginPath(); ctx.setLineDash([5*zm,4*zm]);
    ctx.moveTo(0,-33*zm); ctx.lineTo(0,33*zm);
    ctx.strokeStyle=`rgba(34,211,238,${0.5+phPulse*0.4})`; ctx.lineWidth=2.5; ctx.stroke();
    ctx.setLineDash([]);
    // Label puente
    ctx.fillStyle=`rgba(34,211,238,${0.7+phPulse*0.25})`; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('Puente H', 14*zm, 0);
    ctx.fillText('⋯ ⋯ ⋯', 10*zm, 12*zm);
    // Ángulo D-H...A
    ctx.fillStyle='rgba(245,158,11,0.75)'; ctx.textAlign='center';
    ctx.fillText('D-H ··· :A  ≈ 180°', 0, 100*zm);
    ctx.restore();
    ctx.fillStyle='rgba(34,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ENLACE DE HIDRÓGENO', cx, cy-135*zm);
  },

  /* ─── Electrón ─── */
  electron(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,160*zm);
    bg.addColorStop(0,'rgba(168,85,247,0.12)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    // Nube de probabilidad orbital 2p
    for(let i=0;i<200;i++){
      const ang = (i/200)*Math.PI*2;
      const r = (Math.random()*80+20)*zm;
      const prob = Math.exp(-r/(50*zm));
      if(Math.random() > prob*2) continue;
      const px = cx + r*Math.cos(ang+ry), py = cy + r*Math.sin(ang+ry)*0.7;
      ctx.beginPath(); ctx.arc(px,py,1.5,0,Math.PI*2);
      ctx.fillStyle=`rgba(168,85,247,${0.15+Math.random()*0.3})`; ctx.fill();
    }
    // Electrón partícula
    const ex = cx + Math.cos(t*0.002+ry)*90*zm;
    const ey = cy + Math.sin(t*0.002+rx)*65*zm;
    // Estela
    for(let s=1;s<=20;s++){
      const sa = t*0.002+ry - s*0.06;
      const sx = cx + Math.cos(sa)*90*zm, sy = cy + Math.sin(sa+rx)*65*zm;
      ctx.beginPath(); ctx.arc(sx,sy,4-s*0.15,0,Math.PI*2);
      ctx.fillStyle=`rgba(168,85,247,${0.4-s*0.018})`; ctx.fill();
    }
    const eg = ctx.createRadialGradient(ex-3*zm,ey-3*zm,0,ex,ey,12*zm);
    eg.addColorStop(0,'rgba(220,180,255,1)'); eg.addColorStop(1,'rgba(168,85,247,0.2)');
    ctx.beginPath(); ctx.arc(ex,ey,12*zm,0,Math.PI*2);
    ctx.fillStyle=eg; ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`bold ${10*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('e⁻', ex, ey);
    // Datos partícula
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('m = 9.109×10⁻³¹ kg', cx, cy+110*zm);
    ctx.fillText('q = −1.602×10⁻¹⁹ C', cx, cy+122*zm);
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`;
    ctx.fillText('ELECTRÓN', cx, cy-130*zm);
  },

  /* ─── Protón ─── */
  proton(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.2+t*0.0002);
    // Protón grande
    const pGrad = ctx.createRadialGradient(-10*zm,-10*zm,0,0,0,55*zm);
    pGrad.addColorStop(0,'rgba(239,68,68,1)'); pGrad.addColorStop(0.6,'rgba(200,0,0,0.9)'); pGrad.addColorStop(1,'rgba(150,0,0,0.5)');
    ctx.beginPath(); ctx.arc(0,0,55*zm,0,Math.PI*2);
    ctx.fillStyle=pGrad; ctx.fill(); ctx.strokeStyle='rgba(255,100,100,0.6)'; ctx.lineWidth=2.5; ctx.stroke();
    // Gluones (líneas espirales)
    for(let g=0;g<6;g++){
      const ga = g/6*Math.PI*2+t*0.001;
      ctx.beginPath();
      for(let s=0;s<20;s++){
        const sa=ga+s*0.3, r=(15+s*1.8)*zm;
        s===0?ctx.moveTo(r*Math.cos(sa),r*Math.sin(sa)):ctx.lineTo(r*Math.cos(sa),r*Math.sin(sa));
      }
      ctx.strokeStyle='rgba(245,158,11,0.4)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // 3 quarks
    const quarks=[{a:0,col:'rgba(16,185,129,1)',lbl:'u +2/3'},{a:2.09,col:'rgba(16,185,129,1)',lbl:'u +2/3'},{a:4.19,col:'rgba(6,182,212,1)',lbl:'d −1/3'}];
    quarks.forEach(q=>{
      const qa=q.a+t*0.001, r=28*zm;
      const qx=r*Math.cos(qa), qy=r*Math.sin(qa);
      const qg=ctx.createRadialGradient(qx,qy,0,qx,qy,10*zm);
      qg.addColorStop(0,q.col); qg.addColorStop(1,q.col.replace('1)','0.2)'));
      ctx.beginPath(); ctx.arc(qx,qy,10*zm,0,Math.PI*2);
      ctx.fillStyle=qg; ctx.fill();
      ctx.fillStyle='#fff'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(q.lbl, qx, qy);
    });
    ctx.fillStyle='#fff'; ctx.font=`bold ${14*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('p⁺', 0, 0);
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('PROTÓN', cx, cy-100*zm);
    ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('uud · q=+1 · m=1.672×10⁻²⁷ kg', cx, cy+110*zm);
  },

  /* ─── Neutrón ─── */
  neutron(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.15+t*0.0002);
    // Neutrón grande (gris)
    const nGrad = ctx.createRadialGradient(-10*zm,-10*zm,0,0,0,55*zm);
    nGrad.addColorStop(0,'rgba(100,180,130,1)'); nGrad.addColorStop(0.6,'rgba(30,120,70,0.9)'); nGrad.addColorStop(1,'rgba(10,80,40,0.5)');
    ctx.beginPath(); ctx.arc(0,0,55*zm,0,Math.PI*2);
    ctx.fillStyle=nGrad; ctx.fill(); ctx.strokeStyle='rgba(100,220,150,0.6)'; ctx.lineWidth=2.5; ctx.stroke();
    // Gluones
    for(let g=0;g<6;g++){
      const ga=g/6*Math.PI*2+t*0.001;
      ctx.beginPath();
      for(let s=0;s<20;s++){
        const sa=ga+s*0.3, r=(15+s*1.8)*zm;
        s===0?ctx.moveTo(r*Math.cos(sa),r*Math.sin(sa)):ctx.lineTo(r*Math.cos(sa),r*Math.sin(sa));
      }
      ctx.strokeStyle='rgba(245,158,11,0.35)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // 3 quarks (u, d, d)
    const quarks=[{a:0,col:'rgba(16,185,129,1)',lbl:'u +2/3'},{a:2.09,col:'rgba(6,182,212,1)',lbl:'d −1/3'},{a:4.19,col:'rgba(6,182,212,1)',lbl:'d −1/3'}];
    quarks.forEach(q=>{
      const qa=q.a+t*0.001, r=28*zm;
      const qx=r*Math.cos(qa), qy=r*Math.sin(qa);
      const qg=ctx.createRadialGradient(qx,qy,0,qx,qy,10*zm);
      qg.addColorStop(0,q.col); qg.addColorStop(1,q.col.replace('1)','0.2)'));
      ctx.beginPath(); ctx.arc(qx,qy,10*zm,0,Math.PI*2);
      ctx.fillStyle=qg; ctx.fill();
      ctx.fillStyle='#fff'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(q.lbl, qx, qy);
    });
    ctx.fillStyle='#fff'; ctx.font=`bold ${13*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('n⁰', 0, 0);
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('NEUTRÓN', cx, cy-100*zm);
    ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('udd · q=0 · t½=15 min (libre)', cx, cy+110*zm);
  },

  /* ─── Número Atómico ─── */
  atomicNumber(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(245,158,11,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.1);
    // Núcleo con Z protones
    const Z = 6; // Carbono
    for(let p=0;p<Z;p++){
      const ang=(p/Z)*Math.PI*2+t*0.0006;
      const pr=22*zm, px=pr*Math.cos(ang), py=pr*Math.sin(ang)*0.7;
      const pg=ctx.createRadialGradient(px,py,0,px,py,9*zm);
      pg.addColorStop(0,'rgba(239,68,68,1)'); pg.addColorStop(1,'rgba(180,0,0,0.4)');
      ctx.beginPath(); ctx.arc(px,py,9*zm,0,Math.PI*2);
      ctx.fillStyle=pg; ctx.fill();
    }
    // Neutrones
    const N=6;
    for(let n=0;n<N;n++){
      const ang=(n/N)*Math.PI*2+t*0.0006+0.5;
      const nr=12*zm, nx=nr*Math.cos(ang), ny=nr*Math.sin(ang)*0.7;
      ctx.beginPath(); ctx.arc(nx,ny,8*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(100,180,130,0.8)'; ctx.fill();
    }
    // Electrones (2 capas)
    [[28*zm,2],[60*zm,4]].forEach(([r,ne],layerI)=>{
      ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(168,85,247,0.15)'; ctx.lineWidth=1; ctx.stroke();
      for(let e=0;e<ne;e++){
        const ea=(e/ne)*Math.PI*2+t*(0.002-layerI*0.0005);
        const epx=r*Math.cos(ea), epy=r*Math.sin(ea)*0.8;
        const eg=ctx.createRadialGradient(epx,epy,0,epx,epy,6*zm);
        eg.addColorStop(0,'rgba(168,85,247,1)'); eg.addColorStop(1,'rgba(168,85,247,0)');
        ctx.beginPath(); ctx.arc(epx,epy,6*zm,0,Math.PI*2);
        ctx.fillStyle=eg; ctx.fill();
      }
    });
    // Label Z grande
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${30*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('Z=6', 0, 95*zm);
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('NÚMERO ATÓMICO (C)', cx, cy-120*zm);
    ctx.fillStyle='rgba(239,68,68,0.6)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('■ 6 protones (Z=6)', cx-50*zm, cy+135*zm);
    ctx.fillStyle='rgba(16,185,129,0.6)';
    ctx.fillText('■ 6 neutrones', cx+45*zm, cy+135*zm);
  },

  /* ─── Masa Atómica ─── */
  atomicMass(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(34,211,238,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.15);
    // Balanza de masas — dos platillos
    const tiltAng = Math.sin(t*0.001)*0.1;
    const armLen = 100*zm;
    // Eje
    ctx.beginPath(); ctx.arc(0,0,8*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.fill();
    // Brazo
    ctx.save(); ctx.rotate(tiltAng);
    ctx.beginPath(); ctx.moveTo(-armLen,0); ctx.lineTo(armLen,0);
    ctx.strokeStyle='rgba(34,211,238,0.7)'; ctx.lineWidth=3*zm; ctx.stroke();
    // Platillo izquierdo (isótopo ¹²C, mass=12)
    ctx.beginPath(); ctx.moveTo(-armLen,0); ctx.lineTo(-armLen,35*zm);
    ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-armLen,35*zm,30*zm,8*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(34,211,238,0.25)'; ctx.fill();
    ctx.strokeStyle='rgba(34,211,238,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(34,211,238,0.9)'; ctx.font=`bold ${10*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('¹²C=12.000', -armLen, 50*zm);
    ctx.fillText('98.93%', -armLen, 63*zm);
    // Platillo derecho (isótopo ¹³C, mass=13.003)
    ctx.beginPath(); ctx.moveTo(armLen,0); ctx.lineTo(armLen,25*zm);
    ctx.stroke();
    ctx.beginPath(); ctx.ellipse(armLen,25*zm,30*zm,8*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(168,85,247,0.25)'; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${10*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('¹³C=13.003', armLen, 40*zm);
    ctx.fillText('1.07%', armLen, 53*zm);
    ctx.restore();
    // Resultado promedio ponderado
    const pulse = 0.5+0.5*Math.sin(t*0.002);
    ctx.fillStyle=`rgba(245,158,11,${0.7+pulse*0.25})`; ctx.font=`bold ${14*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('Ar(C) = 12.011 u', 0, 110*zm);
    ctx.restore();
    ctx.fillStyle='rgba(34,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MASA ATÓMICA', cx, cy-120*zm);
    ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Promedio ponderado de isótopos', cx, cy-106*zm);
  }

};
