/* ============================================================
   gc-renderers.js — PharmaLab Chile | Galería Celular 3D
   Renderers 3D con Canvas API — uno por estructura celular
   Depende de: gc-state.js (variables globales compartidas)
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════════════════════
   RENDERERS 3D — uno por cada estructura celular
   ═══════════════════════════════════════════════════════════ */
const Renderers = {

  /* ─── Célula genérica ─── */
  genericCell(ctx, w, h, t, rx, ry, zm) {
    const cx = w/2, cy = h/2;
    ctx.clearRect(0,0,w,h);
    // Sombra exterior
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160*zm);
    grad.addColorStop(0, 'rgba(168,85,247,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);
    // Membrana
    ctx.beginPath();
    ctx.arc(cx, cy, 130*zm, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(168,85,247,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();
    const mGrad = ctx.createRadialGradient(cx-20, cy-20, 0, cx, cy, 135*zm);
    mGrad.addColorStop(0, 'rgba(168,85,247,0.07)');
    mGrad.addColorStop(1, 'rgba(168,85,247,0.02)');
    ctx.fillStyle = mGrad;
    ctx.fill();
    // Núcleo
    ctx.beginPath();
    ctx.arc(cx + Math.sin(ry)*10, cy + Math.cos(rx)*10, 48*zm, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(168,85,247,0.9)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(168,85,247,0.12)';
    ctx.fill();
    // Orgánulos flotando
    const orgs = [{r:12,ox:55,oy:-30,col:'rgba(239,68,68,0.75)',label:'Mit'},{r:8,ox:-60,oy:20,col:'rgba(6,182,212,0.75)',label:'RE'},{r:7,ox:40,oy:55,col:'rgba(245,158,11,0.75)',label:'Gol'},{r:6,ox:-40,oy:-55,col:'rgba(16,185,129,0.75)',label:'Lis'}];
    orgs.forEach(o => {
      const ang = t*0.001*o.r*0.08;
      const ox = o.ox*Math.cos(ang) - o.oy*Math.sin(ang);
      const oy = o.ox*Math.sin(ang) + o.oy*Math.cos(ang);
      ctx.beginPath();
      ctx.ellipse(cx+ox*zm, cy+oy*zm, o.r*zm, o.r*0.6*zm, ang, 0, Math.PI*2);
      ctx.fillStyle = o.col;
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = `${7*zm}px JetBrains Mono,monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(o.label, cx+ox*zm, cy+oy*zm+3*zm);
    });
    // Partículas ribosomales
    for(let i=0;i<18;i++){
      const ang = (i/18)*Math.PI*2 + t*0.0003;
      const r = (70+Math.sin(ang*3+t*0.001)*15)*zm;
      const px = cx + r*Math.cos(ang), py = cy + r*Math.sin(ang)*0.65;
      ctx.beginPath(); ctx.arc(px,py,2*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.6)'; ctx.fill();
    }
    // Label
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA', cx, cy-135*zm);
  },

  /* ─── Procariota ─── */
  prokaryote(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Cuerpo bacilar
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(ry*0.3);
    ctx.beginPath();
    const bw=160*zm, bh=80*zm;
    ctx.ellipse(0,0,bw,bh,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=3; ctx.stroke();
    const bg = ctx.createRadialGradient(0,-20,0,0,0,bw);
    bg.addColorStop(0,'rgba(6,182,212,0.12)'); bg.addColorStop(1,'rgba(6,182,212,0.02)');
    ctx.fillStyle=bg; ctx.fill();
    // Pared celular
    ctx.beginPath();
    ctx.ellipse(0,0,bw+8,bh+8,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=4; ctx.stroke();
    // Nucleoide (ADN circular)
    ctx.beginPath();
    for(let i=0;i<=60;i++){
      const a=(i/60)*Math.PI*2;
      const r=32*zm+Math.sin(a*8+t*0.002)*5*zm;
      const x=r*Math.cos(a), y=r*Math.sin(a)*0.5;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(245,158,11,0.85)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.07)'; ctx.fill();
    // Ribosomas 70S
    for(let i=0;i<14;i++){
      const a=(i/14)*Math.PI*2;
      const r=60*zm, px=r*Math.cos(a), py=r*Math.sin(a)*0.5;
      ctx.beginPath(); ctx.arc(px,py,3.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fill();
    }
    // Flagelo
    ctx.beginPath();
    ctx.moveTo(bw, 0);
    for(let i=0;i<=50;i++){
      const x=bw+i*2*zm, y=Math.sin(i*0.4+t*0.004)*20*zm;
      ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.restore();
    // Labels
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA PROCARIOTA', cx, cy-120*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${9*zm}px JetBrains Mono,monospace`;
    ctx.fillText('● Nucleoide', cx-60*zm, cy+110*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)';
    ctx.fillText('● Ribosomas 70S', cx+50*zm, cy+110*zm);
  },

  /* ─── Eucariota ─── */
  eukaryote(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,160*zm);
    bg.addColorStop(0,'rgba(168,85,247,0.06)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    // Membrana
    ctx.beginPath(); ctx.arc(cx,cy,140*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.6)'; ctx.lineWidth=3; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.04)'; ctx.fill();
    // RE rugoso (espiral)
    ctx.save(); ctx.translate(cx+40*zm, cy-10*zm);
    ctx.beginPath();
    for(let i=0;i<80;i++){
      const a=i*0.25, r=12+i*0.45;
      const x=r*Math.cos(a+ry), y=r*Math.sin(a+ry)*0.5;
      i===0?ctx.moveTo(x*zm,y*zm):ctx.lineTo(x*zm,y*zm);
    }
    ctx.strokeStyle='rgba(6,182,212,0.55)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.restore();
    // Mitocondria
    ctx.save(); ctx.translate(cx-70*zm, cy+30*zm); ctx.rotate(0.6+ry*0.2);
    ctx.beginPath(); ctx.ellipse(0,0,28*zm,14*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(239,68,68,0.75)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.1)'; ctx.fill();
    // crestas internas
    for(let i=-2;i<=2;i++){
      ctx.beginPath(); ctx.moveTo(i*7*zm,-12*zm); ctx.lineTo(i*7*zm,12*zm);
      ctx.strokeStyle='rgba(239,68,68,0.35)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.restore();
    // Núcleo
    ctx.beginPath(); ctx.arc(cx+Math.sin(ry)*15, cy+Math.cos(rx)*10, 52*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.95)'; ctx.lineWidth=3; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.13)'; ctx.fill();
    // Envoltura nuclear (doble)
    ctx.beginPath(); ctx.arc(cx+Math.sin(ry)*15, cy+Math.cos(rx)*10, 56*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.35)'; ctx.lineWidth=1.5; ctx.stroke();
    // Poros nucleares
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2, r=56*zm;
      ctx.beginPath(); ctx.arc(cx+Math.sin(ry)*15+r*Math.cos(a), cy+Math.cos(rx)*10+r*Math.sin(a), 3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.8)'; ctx.fill();
    }
    // Golgi
    ctx.save(); ctx.translate(cx+60*zm, cy+50*zm);
    for(let i=0;i<4;i++){
      ctx.beginPath(); ctx.ellipse(0,i*8*zm-16*zm,30*zm,4*zm,ry*0.3,0,Math.PI*2);
      ctx.strokeStyle=`rgba(168,85,247,${0.3+i*0.15})`; ctx.lineWidth=1.5; ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA EUCARIOTA', cx, cy-150*zm);
  },

  /* ─── Célula Animal ─── */
  animalCell(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Forma irregular (poligonal suavizada)
    ctx.save(); ctx.translate(cx,cy);
    ctx.beginPath();
    const pts=[];
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2;
      const r=(120+Math.sin(i*2.3+t*0.001)*18)*zm;
      pts.push([r*Math.cos(a), r*Math.sin(a)]);
    }
    ctx.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.closePath();
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.05)'; ctx.fill();
    // Núcleo central
    ctx.beginPath(); ctx.arc(Math.sin(ry)*8,Math.cos(rx)*8,50*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.12)'; ctx.fill();
    // Centrosoma (par de centriolos)
    ctx.save(); ctx.translate(70*zm,-50*zm);
    for(let c=0;c<2;c++){
      ctx.beginPath(); ctx.arc(c*12*zm,0,5*zm,0,Math.PI*2);
      ctx.strokeStyle='rgba(22,211,238,0.85)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    ctx.restore();
    // Lisosomas
    const lyso=[{x:-70,y:-40},{x:-80,y:30},{x:55,y:60},{x:80,y:-20}];
    lyso.forEach(l=>{
      ctx.beginPath(); ctx.arc(l.x*zm,l.y*zm,8*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(239,68,68,0.65)'; ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    });
    // Mitocondrias
    const mitos=[{x:80,y:30},{x:-55,y:65}];
    mitos.forEach((m,i)=>{
      ctx.save(); ctx.translate(m.x*zm,m.y*zm); ctx.rotate(i*0.8+ry*0.2);
      ctx.beginPath(); ctx.ellipse(0,0,22*zm,10*zm,0,0,Math.PI*2);
      ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='rgba(239,68,68,0.1)'; ctx.fill();
      ctx.restore();
    });
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA ANIMAL', cx, cy-145*zm);
  },

  /* ─── Célula Vegetal ─── */
  plantCell(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    const W=135*zm, H=110*zm;
    // Pared celular
    ctx.beginPath(); ctx.roundRect(-W-8,-H-8,W*2+16,H*2+16,6*zm);
    ctx.strokeStyle='rgba(16,185,129,0.7)'; ctx.lineWidth=5; ctx.stroke();
    // Membrana
    ctx.beginPath(); ctx.roundRect(-W,-H,W*2,H*2,4*zm);
    ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.04)'; ctx.fill();
    // Vacuola central
    ctx.beginPath(); ctx.ellipse(0,10*zm,80*zm,70*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(6,182,212,0.1)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(6,182,212,0.4)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Vacuola', 0, 12*zm);
    // Cloroplastos
    const chloro=[{x:-95,y:-40},{x:95,y:-50},{x:-100,y:40},{x:95,y:55},{x:0,y:-90}];
    chloro.forEach(c=>{
      ctx.save(); ctx.translate(c.x*zm,c.y*zm); ctx.rotate(c.x*0.02+ry*0.15);
      ctx.beginPath(); ctx.ellipse(0,0,18*zm,10*zm,0,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.7)'; ctx.fill();
      ctx.strokeStyle='rgba(16,185,129,0.95)'; ctx.lineWidth=1.5; ctx.stroke();
      // grana interno
      for(let g=-1;g<=1;g++){
        ctx.beginPath(); ctx.ellipse(g*6*zm,0,3*zm,7*zm,0,0,Math.PI*2);
        ctx.fillStyle='rgba(0,100,50,0.5)'; ctx.fill();
      }
      ctx.restore();
    });
    // Núcleo
    ctx.beginPath(); ctx.arc(-70*zm,-60*zm,30*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.1)'; ctx.fill();
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA VEGETAL', cx, cy-130*zm);
  },

  /* ─── Membrana plasmática ─── */
  membrane(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Bicapa
    const nLip=20, lipW=190*zm;
    for(let layer=0;layer<2;layer++){
      const yOff=(layer===0?-20:20)*zm;
      for(let i=0;i<nLip;i++){
        const x=(-nLip/2+i)*(lipW/nLip);
        const wave=Math.sin(i*0.5+t*0.002+ry)*4*zm;
        // Cabeza
        ctx.beginPath(); ctx.arc(x, yOff+wave, 7*zm, 0, Math.PI*2);
        ctx.fillStyle=layer===0?'rgba(168,85,247,0.8)':'rgba(6,182,212,0.8)'; ctx.fill();
        // Cola
        ctx.beginPath(); ctx.moveTo(x,yOff+wave+(layer===0?7:-7)*zm);
        const tailLen=32*zm;
        ctx.lineTo(x+(Math.random()-0.5)*3*zm, yOff+wave+(layer===0?tailLen:-tailLen)*zm);
        ctx.strokeStyle=layer===0?'rgba(168,85,247,0.45)':'rgba(6,182,212,0.45)'; ctx.lineWidth=3*zm; ctx.stroke();
      }
    }
    // Proteína integral (alfa-hélice)
    ctx.save(); ctx.translate(0,0);
    ctx.beginPath();
    for(let i=0;i<40;i++){
      const y=-50*zm+i*2.5*zm, x=Math.sin(i*0.7+t*0.002)*8*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=5*zm; ctx.stroke();
    ctx.restore();
    ctx.restore();
    ctx.fillStyle='rgba(22,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MEMBRANA PLASMÁTICA', cx, cy-115*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.fillText('● Hoja externa', cx-70*zm, cy+90*zm);
    ctx.fillStyle='rgba(6,182,212,0.7)'; ctx.fillText('● Hoja interna', cx+50*zm, cy+90*zm);
  },

  /* ─── Bicapa lipídica ─── */
  bilayer(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const nLip=22;
    const startX=cx-110*zm;
    for(let layer=0;layer<2;layer++){
      const yBase=(layer===0?cy-18:cy+18)*zm/zm;
      const dir=layer===0?1:-1;
      for(let i=0;i<nLip;i++){
        const x=startX+i*(220*zm/nLip);
        const wave=Math.sin(i*0.8+t*0.0015)*5*zm;
        // Cabeza polar
        ctx.beginPath(); ctx.arc(x, yBase+wave, 9*zm, 0, Math.PI*2);
        const hg=ctx.createRadialGradient(x,yBase+wave,0,x,yBase+wave,9*zm);
        hg.addColorStop(0,layer===0?'rgba(168,85,247,1)':'rgba(6,182,212,1)');
        hg.addColorStop(1,layer===0?'rgba(168,85,247,0.4)':'rgba(6,182,212,0.4)');
        ctx.fillStyle=hg; ctx.fill();
        // Cola 1
        const t1x=x-3*zm, t1end=yBase+wave+dir*38*zm;
        ctx.beginPath(); ctx.moveTo(t1x, yBase+wave+dir*9*zm);
        ctx.bezierCurveTo(t1x-2*zm, yBase+wave+dir*20*zm, t1x+1*zm, yBase+wave+dir*30*zm, t1x, t1end);
        ctx.strokeStyle='rgba(200,170,230,0.6)'; ctx.lineWidth=3*zm; ctx.stroke();
        // Cola 2
        const t2x=x+3*zm, t2end=yBase+wave+dir*35*zm;
        ctx.beginPath(); ctx.moveTo(t2x, yBase+wave+dir*9*zm);
        ctx.bezierCurveTo(t2x+2*zm, yBase+wave+dir*18*zm, t2x-1*zm, yBase+wave+dir*28*zm, t2x+1*zm, t2end);
        ctx.strokeStyle='rgba(160,130,200,0.5)'; ctx.lineWidth=3*zm; ctx.stroke();
      }
    }
    // Zona hidrofóbica
    const zg=ctx.createLinearGradient(0, cy-10*zm, 0, cy+10*zm);
    zg.addColorStop(0,'rgba(0,0,0,0)'); zg.addColorStop(0.5,'rgba(168,85,247,0.04)'); zg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=zg; ctx.fillRect(cx-115*zm, cy-55*zm, 230*zm, 110*zm);
    // Colesterol
    ctx.beginPath();
    ctx.moveTo(cx,cy-50*zm); ctx.lineTo(cx,cy+50*zm);
    ctx.moveTo(cx-8*zm,cy-35*zm); ctx.lineTo(cx+8*zm,cy-35*zm);
    ctx.moveTo(cx-8*zm,cy-15*zm); ctx.lineTo(cx+8*zm,cy-15*zm);
    ctx.moveTo(cx-8*zm,cy+15*zm); ctx.lineTo(cx+8*zm,cy+15*zm);
    ctx.moveTo(cx-8*zm,cy+35*zm); ctx.lineTo(cx+8*zm,cy+35*zm);
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2*zm; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('BICAPA LIPÍDICA', cx, cy-95*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.fillText('⬤ Colesterol', cx+80*zm, cy+5*zm);
  },

  /* ─── Núcleo ─── */
  nucleus(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Envoltura nuclear doble
    ctx.beginPath(); ctx.arc(0,0,105*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.3)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(0,0,98*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.85)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.08)'; ctx.fill();
    // Lámina nuclear
    ctx.beginPath(); ctx.arc(0,0,90*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.25)'; ctx.lineWidth=5*zm; ctx.stroke();
    // Cromatina (hilo de ADN)
    ctx.beginPath();
    for(let i=0;i<=200;i++){
      const a=i*0.18+t*0.0005, r=(55+Math.sin(i*0.4)*28)*zm;
      const x=r*Math.cos(a+ry), y=r*Math.sin(a+rx)*0.7;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(16,185,129,0.6)'; ctx.lineWidth=1.5; ctx.stroke();
    // Nucleolo
    ctx.beginPath(); ctx.arc(-15*zm,-10*zm,25*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(239,68,68,0.2)'; ctx.fill();
    ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Nucleolo', -15*zm, -8*zm);
    // Poros nucleares
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2+t*0.0003, r=102*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a);
      ctx.beginPath(); ctx.arc(px,py,4.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.fill();
      ctx.strokeStyle='rgba(245,158,11,0.4)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('NÚCLEO', cx, cy-118*zm);
  },

  /* ─── Nucleolo ─── */
  nucleolus(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Núcleo de fondo
    ctx.beginPath(); ctx.arc(0,0,110*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.3)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.04)'; ctx.fill();
    // Nucleolo (3 capas)
    // CG - componente granular (exterior)
    ctx.beginPath(); ctx.arc(0,0,68*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(6,182,212,0.1)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=2; ctx.stroke();
    // CFD - componente fibrilar denso
    ctx.beginPath(); ctx.arc(-8*zm,5*zm,42*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(168,85,247,0.15)'; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    // CF - centro fibrilar
    ctx.beginPath(); ctx.arc(-12*zm,8*zm,18*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(245,158,11,0.25)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=2; ctx.stroke();
    // ARNr transcribiéndose
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2+t*0.0008;
      const r=22*zm, lx=-12*zm+r*Math.cos(a), ly=8*zm+r*Math.sin(a);
      ctx.beginPath(); ctx.moveTo(-12*zm,8*zm); ctx.lineTo(lx,ly);
      ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.arc(lx,ly,2.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.75)'; ctx.fill();
    }
    // Labels dentro
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('CF', -12*zm, 10*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)';
    ctx.fillText('CFD', 20*zm, -20*zm);
    ctx.fillStyle='rgba(6,182,212,0.7)';
    ctx.fillText('CG', 55*zm, 0);
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('NUCLEOLO', cx, cy-125*zm);
  },

  /* ─── Citoplasma ─── */
  cytoplasm(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Partículas en movimiento browniano
    const seed=Date.now()*0; // Usamos t para animación
    ctx.save(); ctx.translate(cx,cy);
    // Membrana
    ctx.beginPath(); ctx.arc(0,0,130*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.55)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.03)'; ctx.fill();
    // Partículas de metabolitos
    const nPart=40;
    for(let i=0;i<nPart;i++){
      const a=(i/nPart)*Math.PI*2, spd=0.0003+i%5*0.0001;
      const r=(20+i*2.8)*zm;
      const px=r*Math.cos(a+t*spd*(i%2?1:-1)+i), py=r*Math.sin(a+t*spd*(i%2?1:-1)+i)*0.7;
      if(px*px+py*py>=(125*zm)*(125*zm)) continue;
      ctx.beginPath(); ctx.arc(px,py,1.5+i%3,0,Math.PI*2);
      const cols=['rgba(16,185,129,0.5)','rgba(6,182,212,0.4)','rgba(168,85,247,0.4)','rgba(245,158,11,0.5)'];
      ctx.fillStyle=cols[i%4]; ctx.fill();
    }
    // Ribosomas libres
    for(let i=0;i<18;i++){
      const a=(i/18)*Math.PI*2+t*0.0002, r=(85+Math.sin(a*3)*20)*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a)*0.6;
      ctx.beginPath(); ctx.arc(px,py,3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.65)'; ctx.fill();
    }
    // Núcleo central
    ctx.beginPath(); ctx.arc(0,0,42*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.1)'; ctx.fill();
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CITOPLASMA', cx, cy-148*zm);
  },

  /* ─── Ribosoma ─── */
  ribosome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Subunidad grande 60S
    const r1=65*zm;
    ctx.beginPath();
    ctx.arc(0,-15*zm,r1,0,Math.PI*2);
    const g1=ctx.createRadialGradient(0,-15*zm,0,0,-15*zm,r1);
    g1.addColorStop(0,'rgba(168,85,247,0.25)'); g1.addColorStop(1,'rgba(168,85,247,0.04)');
    ctx.fillStyle=g1; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.8)'; ctx.lineWidth=2.5; ctx.stroke();
    // Subunidad pequeña 40S
    const r2=45*zm;
    ctx.beginPath();
    ctx.arc(Math.sin(ry)*10,50*zm,r2,0,Math.PI*2);
    const g2=ctx.createRadialGradient(0,50*zm,0,0,50*zm,r2);
    g2.addColorStop(0,'rgba(245,158,11,0.25)'); g2.addColorStop(1,'rgba(245,158,11,0.04)');
    ctx.fillStyle=g2; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=2; ctx.stroke();
    // ARNm atravesando
    ctx.beginPath();
    for(let i=0;i<80;i++){
      const x=-120*zm+i*3*zm, y=25*zm+Math.sin(i*0.4+t*0.002)*5*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(16,185,129,0.75)'; ctx.lineWidth=2.5; ctx.stroke();
    // Cadena polipeptídica emergente
    ctx.beginPath();
    for(let i=0;i<25;i++){
      const x=i*4*zm, y=-80*zm-i*3*zm+Math.sin(i*0.6+t*0.002)*6*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(239,68,68,0.75)'; ctx.lineWidth=2.5; ctx.stroke();
    // Sitios A, P, E
    const sites=[{x:-15,y:18,l:'P',c:'rgba(239,68,68,0.9)'},{x:15,y:18,l:'A',c:'rgba(16,185,129,0.9)'},{x:-45,y:18,l:'E',c:'rgba(6,182,212,0.9)'}];
    sites.forEach(s=>{
      ctx.fillStyle=s.c; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(s.l, s.x*zm, s.y*zm);
    });
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('RIBOSOMA 80S', cx, cy-105*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● 60S', cx-60*zm, cy+105*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)';
    ctx.fillText('● 40S', cx+40*zm, cy+105*zm);
  },

  /* ─── Mitocondria ─── */
  mitochondria(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.25);
    // Membrana externa
    ctx.beginPath(); ctx.ellipse(0,0,145*zm,78*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(239,68,68,0.5)'; ctx.lineWidth=2; ctx.stroke();
    // Membrana interna
    ctx.beginPath(); ctx.ellipse(0,0,130*zm,65*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(239,68,68,0.85)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.06)'; ctx.fill();
    // Crestas mitocondriales
    const nCrestas=7;
    for(let i=0;i<nCrestas;i++){
      const x=(-3+i)*38*zm;
      ctx.beginPath();
      ctx.moveTo(x,-65*zm);
      ctx.bezierCurveTo(x-15*zm,-30*zm,x+15*zm,-30*zm,x,0);
      ctx.bezierCurveTo(x-15*zm,30*zm,x+15*zm,30*zm,x,65*zm);
      ctx.strokeStyle='rgba(239,68,68,0.45)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // ATP sintasa en membrana interna
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      const px=130*zm*Math.cos(a), py=65*zm*Math.sin(a);
      ctx.beginPath(); ctx.arc(px,py,5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.fill();
    }
    // ADNmt circular
    ctx.beginPath();
    for(let i=0;i<=50;i++){
      const a=(i/50)*Math.PI*2;
      const r=(28+Math.sin(a*4+t*0.002)*5)*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a)*0.6;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    // Partículas de ATP
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2+t*0.0008, r=100*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a)*0.5;
      ctx.beginPath(); ctx.arc(px,py,3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.6)'; ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MITOCONDRIA', cx, cy-95*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('⬤ ATP sintasa  ⬤ ADNmt', cx, cy+100*zm);
  },

  /* ─── Cloroplasto ─── */
  chloroplast(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.2);
    // Doble membrana
    ctx.beginPath(); ctx.ellipse(0,0,148*zm,88*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.45)'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0,0,136*zm,78*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.05)'; ctx.fill();
    // Grana (pilas de tilacoides)
    const grana=[{x:-65,y:0},{x:0,y:15},{x:65,y:0},{x:-30,y:-25},{x:30,y:-25}];
    grana.forEach(g=>{
      const nTil=5+Math.floor(Math.random()*2);
      for(let i=0;i<nTil;i++){
        ctx.beginPath();
        ctx.ellipse(g.x*zm, (g.y+(i-nTil/2)*12)*zm, 22*zm, 6*zm, 0, 0, Math.PI*2);
        ctx.fillStyle=`rgba(0,${120+i*15},60,0.7)`; ctx.fill();
        ctx.strokeStyle='rgba(0,180,80,0.5)'; ctx.lineWidth=0.5; ctx.stroke();
      }
    });
    // Estroma (zona alrededor)
    ctx.fillStyle='rgba(16,185,129,0.15)';
    ctx.beginPath(); ctx.ellipse(-80*zm,35*zm,25*zm,18*zm,0.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(80*zm,-30*zm,20*zm,15*zm,-0.3,0,Math.PI*2); ctx.fill();
    // RuBisCO
    ctx.beginPath(); ctx.arc(10*zm,40*zm,12*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(245,158,11,0.35)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.85)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('RuBisCO', 10*zm, 43*zm);
    // Plastoma ADN
    ctx.beginPath();
    for(let i=0;i<=40;i++){
      const a=(i/40)*Math.PI*2, r=18*zm;
      const px=-80*zm+r*Math.cos(a+t*0.001), py=-30*zm+r*Math.sin(a+t*0.001)*0.6;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CLOROPLASTO', cx, cy-102*zm);
  },

  /* ─── Lisosoma ─── */
  lysosome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Membrana lisosomal
    const wave=Math.sin(t*0.002)*5*zm;
    ctx.beginPath();
    for(let i=0;i<=60;i++){
      const a=(i/60)*Math.PI*2;
      const r=(90+Math.sin(a*5+t*0.001)*6)*zm;
      const x=r*Math.cos(a), y=r*Math.sin(a);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=3; ctx.stroke();
    const lg=ctx.createRadialGradient(0,0,0,0,0,90*zm);
    lg.addColorStop(0,'rgba(239,68,68,0.2)'); lg.addColorStop(0.6,'rgba(239,68,68,0.12)'); lg.addColorStop(1,'rgba(239,68,68,0.04)');
    ctx.fillStyle=lg; ctx.fill();
    // Enzimas hidrolíticas (representadas como manchas)
    const enzymes=[{x:0,y:-40,r:15,label:'Cat'},{x:-35,y:15,r:12,label:'HSD'},{x:35,y:20,r:12,label:'Lip'},{x:15,y:-15,r:10,label:'DNs'},{x:-20,y:-5,r:8,label:'Sulf'}];
    enzymes.forEach(e=>{
      const ea=t*0.0005*e.r*0.06;
      ctx.beginPath(); ctx.ellipse(e.x*zm,e.y*zm,e.r*zm,e.r*0.75*zm,ea,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.35)'; ctx.fill();
      ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,0.65)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(e.label, e.x*zm, e.y*zm+2*zm);
    });
    // pH label
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${14*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('pH 4.8', 0, 55*zm);
    // V-ATPasa en membrana
    for(let i=0;i<7;i++){
      const a=(i/7)*Math.PI*2;
      const r=92*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a), r*Math.sin(a), 4*zm, 0, Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.8)'; ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('LISOSOMA', cx, cy-108*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● V-ATPasa', cx+60*zm, cy+100*zm);
  },

  /* ─── Peroxisoma ─── */
  peroxisome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Membrana peroxisomal
    ctx.beginPath(); ctx.arc(0,0,95*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=3; ctx.stroke();
    const pg=ctx.createRadialGradient(0,0,0,0,0,95*zm);
    pg.addColorStop(0,'rgba(245,158,11,0.15)'); pg.addColorStop(1,'rgba(245,158,11,0.03)');
    ctx.fillStyle=pg; ctx.fill();
    // Nucleoide cristalino (catalasa)
    ctx.beginPath(); ctx.roundRect(-30*zm,-30*zm,60*zm,60*zm,8*zm);
    ctx.fillStyle='rgba(245,158,11,0.2)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Catalasa', 0, 3*zm);
    // H₂O₂ burbujas
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2+t*0.001, r=(55+Math.sin(t*0.003+i)*20)*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a),r*Math.sin(a),4*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(6,182,212,0.5)'; ctx.fill();
    }
    // H2O producida
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2+t*0.0008;
      const r=(75+Math.cos(t*0.002+i)*10)*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a),r*Math.sin(a),3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.6)'; ctx.fill();
    }
    // Porinas
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      ctx.beginPath(); ctx.arc(95*zm*Math.cos(a),95*zm*Math.sin(a),4.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fill();
    }
    // Legend
    ctx.fillStyle='rgba(6,182,212,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● H₂O₂', -60*zm, 80*zm);
    ctx.fillStyle='rgba(16,185,129,0.7)';
    ctx.fillText('● H₂O', 40*zm, 80*zm);
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('PEROXISOMA', cx, cy-110*zm);
  },

  /* ─── Retículo endoplasmático ─── */
  reticulum(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // RE rugoso (cisternas con ribosomas)
    for(let l=0;l<4;l++){
      const yBase=(-45+l*30)*zm;
      ctx.beginPath();
      ctx.bezierCurveTo(-110*zm,yBase-8*zm,-60*zm,yBase+8*zm,0,yBase);
      ctx.bezierCurveTo(60*zm,yBase-8*zm,110*zm,yBase+8*zm,120*zm,yBase);
      ctx.moveTo(-120*zm,yBase);
      for(let x=-110;x<=110;x+=5){
        ctx.lineTo(x*zm,yBase+Math.sin((x+t*0.05)*0.12)*4*zm);
      }
      ctx.strokeStyle='rgba(6,182,212,0.6)'; ctx.lineWidth=3; ctx.stroke();
      // Ribosomas pegados
      for(let r=-100;r<=100;r+=12){
        ctx.beginPath(); ctx.arc(r*zm,yBase-5*zm,3*zm,0,Math.PI*2);
        ctx.fillStyle='rgba(245,158,11,0.75)'; ctx.fill();
      }
    }
    // RE liso (túbulos curvados)
    ctx.save(); ctx.translate(-40*zm,60*zm);
    for(let t2=0;t2<3;t2++){
      ctx.beginPath();
      ctx.moveTo(-60*zm,t2*15*zm);
      ctx.bezierCurveTo(-20*zm,t2*15*zm-20*zm,30*zm,t2*15*zm+20*zm,70*zm,t2*15*zm);
      ctx.strokeStyle='rgba(168,85,247,0.5)'; ctx.lineWidth=4; ctx.stroke();
    }
    ctx.restore();
    // Luz del RE (brillo interior)
    ctx.fillStyle='rgba(6,182,212,0.06)';
    ctx.fillRect(-115*zm,-60*zm,230*zm,110*zm);
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${10*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('RETÍCULO ENDOPLASMÁTICO', cx, cy-100*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● RE rugoso  ● Ribosomas', cx, cy+110*zm);
  },

  /* ─── Aparato de Golgi ─── */
  golgi(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.15);
    const nCist=6;
    const colors=['rgba(168,85,247,0.75)','rgba(168,85,247,0.65)','rgba(168,85,247,0.55)','rgba(168,85,247,0.45)','rgba(168,85,247,0.35)','rgba(168,85,247,0.25)'];
    const widths=[140,130,120,110,100,90];
    for(let i=0;i<nCist;i++){
      const yC=(-2.5+i)*26*zm;
      const w2=widths[i]*zm;
      const wave=Math.sin(i*0.8+t*0.001)*4*zm;
      ctx.beginPath();
      ctx.moveTo(-w2, yC+wave);
      ctx.bezierCurveTo(-w2+15*zm, yC-8*zm+wave, w2-15*zm, yC+8*zm+wave, w2, yC+wave);
      ctx.bezierCurveTo(w2, yC+14*zm+wave, -w2, yC+14*zm+wave, -w2, yC+wave);
      ctx.fillStyle=colors[i]; ctx.fill();
      ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // Vesículas COP-II (lado cis, desde RE)
    for(let v=0;v<3;v++){
      const vx=-160*zm+v*8*zm, vy=-70*zm+v*20*zm;
      ctx.beginPath(); ctx.arc(vx,vy,9*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(6,182,212,0.4)'; ctx.fill();
      ctx.strokeStyle='rgba(6,182,212,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // Vesículas trans (hacia lisosoma/membrana)
    for(let v=0;v<4;v++){
      const a=((v+4)/10)*Math.PI*2, r=(120+v*10)*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a),80*zm+v*15*zm,8*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.4)'; ctx.fill();
      ctx.strokeStyle='rgba(16,185,129,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // Labels cis/trans
    ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('cis ←', -170*zm, -60*zm);
    ctx.fillStyle='rgba(16,185,129,0.8)'; ctx.textAlign='left';
    ctx.fillText('→ trans', 100*zm, 80*zm);
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('APARATO DE GOLGI', cx, cy-105*zm);
  },

  /* ─── Citoesqueleto ─── */
  cytoskeleton(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Microtúbulos (azul/violeta)
    for(let i=0;i<5;i++){
      const a=(i/5)*Math.PI+ry;
      ctx.beginPath();
      ctx.moveTo(-130*zm*Math.cos(a),-130*zm*Math.sin(a));
      const mid=(Math.sin(t*0.001+i)*20)*zm;
      ctx.bezierCurveTo(-50*zm*Math.cos(a)+mid,-50*zm*Math.sin(a),50*zm*Math.cos(a)-mid,50*zm*Math.sin(a),130*zm*Math.cos(a),130*zm*Math.sin(a));
      ctx.strokeStyle='rgba(168,85,247,0.65)'; ctx.lineWidth=4.5; ctx.stroke();
    }
    // Microfilamentos (verde)
    for(let i=0;i<7;i++){
      const a=(i/7)*Math.PI*2+rx+0.5;
      ctx.beginPath();
      ctx.moveTo(-100*zm*Math.cos(a),-100*zm*Math.sin(a));
      for(let s=0;s<=20;s++){
        const frac=s/20, r=100*zm;
        const x=r*Math.cos(a)*(frac*2-1);
        const y=r*Math.sin(a)*(frac*2-1)+Math.sin(s*0.8+t*0.002)*8*zm;
        s===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(16,185,129,0.5)'; ctx.lineWidth=2; ctx.stroke();
    }
    // Filamentos intermedios (dorado)
    for(let i=0;i<4;i++){
      const a=(i/4)*Math.PI*2+0.3;
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.lineTo(90*zm*Math.cos(a),90*zm*Math.sin(a));
      ctx.strokeStyle='rgba(245,158,11,0.5)'; ctx.lineWidth=2.5; ctx.stroke();
    }
    // Centrosoma
    ctx.beginPath(); ctx.arc(0,0,15*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(22,211,238,0.3)'; ctx.fill();
    ctx.strokeStyle='rgba(22,211,238,0.9)'; ctx.lineWidth=2; ctx.stroke();
    ctx.restore();
    ctx.fillStyle='rgba(22,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CITOESQUELETO', cx, cy-148*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('■ Microtúbulos', cx-90*zm, cy+130*zm);
    ctx.fillStyle='rgba(16,185,129,0.7)';
    ctx.fillText('■ Microfilamentos', cx+20*zm, cy+130*zm);
  },

  /* ─── Microtúbulo ─── */
  microtubule(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Tubo hueco (13 protofilamentos)
    const nProto=13, tubLen=200*zm, tubR=18*zm;
    // Vista lateral del microtúbulo
    ctx.beginPath(); ctx.rect(-tubLen/2,-tubR,tubLen,tubR*2);
    ctx.strokeStyle='rgba(168,85,247,0.3)'; ctx.lineWidth=0.5; ctx.stroke();
    // Protofilamentos
    for(let p=0;p<nProto;p++){
      const yOff=(-6+p)*3*zm-6*zm;
      if(Math.abs(yOff)>tubR*1.1) continue;
      const alpha=1-Math.abs(yOff)/(tubR*1.2);
      for(let d=0;d<=50;d++){
        const x=-tubLen/2+d*(tubLen/50);
        const col=d%2===0?`rgba(168,85,247,${0.7*alpha})`:`rgba(245,158,11,${0.55*alpha})`;
        ctx.beginPath(); ctx.arc(x,yOff,5*zm*alpha,0,Math.PI*2);
        ctx.fillStyle=col; ctx.fill();
      }
    }
    // Motor molecular (kinesina) caminando
    const kx=-tubLen/2+((t*0.04)%(tubLen/zm))*zm;
    ctx.save(); ctx.translate(kx,-tubR-15*zm);
    ctx.beginPath(); ctx.rect(-10*zm,-14*zm,20*zm,14*zm);
    ctx.fillStyle='rgba(239,68,68,0.6)'; ctx.fill();
    ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    // pies de kinesina
    const legPhase=Math.sin(t*0.05)*8*zm;
    ctx.beginPath(); ctx.moveTo(-5*zm,0); ctx.lineTo(-5*zm-legPhase,tubR+15*zm);
    ctx.moveTo(5*zm,0); ctx.lineTo(5*zm+legPhase,tubR+15*zm);
    ctx.strokeStyle='rgba(239,68,68,0.7)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('KIN', 0, -8*zm);
    ctx.restore();
    // Extremo + y −
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${13*zm}px JetBrains Mono`;
    ctx.textAlign='center'; ctx.fillText('+', tubLen/2+15*zm, 4*zm);
    ctx.fillStyle='rgba(239,68,68,0.9)';
    ctx.fillText('−', -tubLen/2-15*zm, 4*zm);
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MICROTÚBULO', cx, cy-55*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('α-tubulina  β-tubulina', cx, cy+45*zm);
  },

  /* ─── Microfilamento ─── */
  microfilament(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // F-actina: doble hélice de actina-G
    const nMono=28, filLen=220*zm, pitch=60*zm;
    for(let strand=0;strand<2;strand++){
      ctx.beginPath();
      for(let m=0;m<=nMono;m++){
        const x=-filLen/2+m*(filLen/nMono);
        const phaseOffset=strand*Math.PI;
        const y=Math.sin((m/nMono)*Math.PI*6+phaseOffset+ry)*12*zm;
        m===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`rgba(16,185,129,${0.5+strand*0.2})`; ctx.lineWidth=1; ctx.stroke();
      // Monómeros
      for(let m=0;m<nMono;m++){
        const x=-filLen/2+m*(filLen/nMono)+(filLen/nMono/2);
        const y=Math.sin((m/nMono)*Math.PI*6+strand*Math.PI+ry)*12*zm;
        ctx.beginPath(); ctx.arc(x,y,6*zm,0,Math.PI*2);
        const mg=ctx.createRadialGradient(x,y,0,x,y,6*zm);
        mg.addColorStop(0,'rgba(16,185,129,0.9)'); mg.addColorStop(1,'rgba(0,100,50,0.4)');
        ctx.fillStyle=mg; ctx.fill();
        ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=1; ctx.stroke();
        // ADP en algunos monómeros (interior del filamento)
        if(m>2 && m<nMono-2){
          ctx.fillStyle='rgba(239,68,68,0.5)'; ctx.font=`${5*zm}px sans-serif`; ctx.textAlign='center';
          ctx.fillText('D', x, y+2*zm);
        }
      }
    }
    // Miosina II (motor)
    const myoX=-filLen/2+((t*0.025)%(filLen/zm))*zm;
    ctx.save(); ctx.translate(myoX, -35*zm);
    ctx.beginPath(); ctx.ellipse(0,-8*zm,12*zm,8*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(239,68,68,0.55)'; ctx.fill(); ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,35*zm);
    ctx.strokeStyle='rgba(239,68,68,0.6)'; ctx.lineWidth=4; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('MYO II', 0, -15*zm);
    ctx.restore();
    // Ramificación Arp2/3
    ctx.save(); ctx.translate(20*zm,-15*zm); ctx.rotate(-0.7);
    for(let m=0;m<8;m++){
      const x=m*16*zm, y=Math.sin(m*0.8)*6*zm;
      ctx.beginPath(); ctx.arc(x,y,5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fill();
      ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.8)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Arp2/3', 50*zm,-20*zm);
    // Extremo + y −
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${13*zm}px JetBrains Mono`;
    ctx.textAlign='center'; ctx.fillText('+', filLen/2+15*zm, 4*zm);
    ctx.fillStyle='rgba(239,68,68,0.9)';
    ctx.fillText('−', -filLen/2-15*zm, 4*zm);
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MICROFILAMENTOS (F-ACTINA)', cx, cy-60*zm);
  }
};

