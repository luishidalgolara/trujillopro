/* ============================================================
   gc-renderers.js — PharmaLab Chile | Galería Genética y Herencia
   Renderers 3D con Canvas API — uno por concepto de genética
   Depende de: gc-state.js
   ============================================================ */

'use strict';

const Renderers = {

  /* ─── ADN — doble hélice ─── */
  dna(ctx, w, h, t, rx, ry, zm) {
    const cx = w/2, cy = h/2;
    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(16,185,129,0.1)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.15);
    const nPairs = 22, helixH = 280*zm, r = 55*zm, pitch = helixH/nPairs;
    const startY = -helixH/2;
    const baseColors = {
      'A':'rgba(16,185,129,0.9)', 'T':'rgba(239,68,68,0.9)',
      'G':'rgba(168,85,247,0.9)', 'C':'rgba(6,182,212,0.9)'
    };
    const pairs = ['AT','GC','TA','CG','AT','GC','GC','AT','CG','TA','GC','AT','TA','CG','AT','GC','CG','AT','GC','TA','AT','GC'];
    // Esqueleto azúcar-fosfato
    for(let strand=0;strand<2;strand++){
      ctx.beginPath();
      for(let i=0;i<=nPairs*4;i++){
        const frac = i/(nPairs*4);
        const y = startY + frac*helixH;
        const ang = frac*Math.PI*4 + strand*Math.PI + t*0.0005;
        const x = r*Math.cos(ang);
        const zDepth = r*Math.sin(ang);
        const alpha = 0.5 + 0.4*(zDepth/(r));
        if(i===0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
      }
      const col = strand===0 ? 'rgba(16,185,129,' : 'rgba(245,158,11,';
      ctx.strokeStyle = col+'0.75)'; ctx.lineWidth=4*zm; ctx.stroke();
    }
    // Pares de bases + escalones
    for(let i=0;i<nPairs;i++){
      const frac = i/nPairs;
      const y = startY + frac*helixH + pitch/2;
      const ang = frac*Math.PI*4 + t*0.0005;
      const x1 = r*Math.cos(ang), x2 = r*Math.cos(ang+Math.PI);
      const zDepth = r*Math.sin(ang);
      const alpha = 0.5 + 0.3*(zDepth/r);
      // Puente H (escalón)
      ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y);
      ctx.strokeStyle=`rgba(255,255,255,${0.12+alpha*0.08})`; ctx.lineWidth=1.5; ctx.stroke();
      // Base 1
      const pair = pairs[i] || 'AT';
      const b1 = pair[0], b2 = pair[1];
      ctx.beginPath(); ctx.arc(x1,y,5*zm,0,Math.PI*2);
      ctx.fillStyle=baseColors[b1]; ctx.fill();
      // Base 2
      ctx.beginPath(); ctx.arc(x2,y,5*zm,0,Math.PI*2);
      ctx.fillStyle=baseColors[b2]; ctx.fill();
    }
    ctx.restore();
    // Leyenda
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ADN — DOBLE HÉLICE', cx, cy-155*zm);
    const legend=[['A','rgba(16,185,129,0.9)'],['T','rgba(239,68,68,0.9)'],['G','rgba(168,85,247,0.9)'],['C','rgba(6,182,212,0.9)']];
    legend.forEach(([b,c],i)=>{
      ctx.fillStyle=c; ctx.font=`${8*zm}px JetBrains Mono`;
      ctx.fillText(`● ${b}`, cx-60*zm+i*32*zm, cy+155*zm);
    });
  },

  /* ─── ARN — cadena simple ─── */
  rna(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(245,158,11,0.1)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.1);
    // Cadena simple ARN con stem-loop
    const points = [];
    for(let i=0;i<=60;i++){
      const frac=i/60;
      const x = Math.sin(frac*Math.PI*3+t*0.001)*70*zm;
      const y = -130*zm + frac*260*zm;
      points.push({x,y});
    }
    // Trazar cadena
    ctx.beginPath();
    points.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
    ctx.strokeStyle='rgba(245,158,11,0.75)'; ctx.lineWidth=4*zm; ctx.stroke();
    // Nucleótidos
    const bases=['A','U','G','C','A','U','G','C','A','U'];
    const baseC={'A':'rgba(16,185,129,0.9)','U':'rgba(239,68,68,0.9)','G':'rgba(168,85,247,0.9)','C':'rgba(6,182,212,0.9)'};
    points.forEach((p,i)=>{
      if(i%6!==0) return;
      const b=bases[(i/6)%10];
      ctx.beginPath(); ctx.arc(p.x,p.y,6*zm,0,Math.PI*2);
      ctx.fillStyle=baseC[b]; ctx.fill();
    });
    // Stem-loop (bucle en la parte superior)
    ctx.beginPath();
    ctx.arc(0,-50*zm,30*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(245,158,11,0.3)'; ctx.lineWidth=1.5; ctx.setLineDash([3*zm,3*zm]); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(245,158,11,0.5)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('stem-loop', 0,-50*zm);
    // Ribosa label
    ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font=`${7*zm}px JetBrains Mono`;
    ctx.fillText('2′-OH (ribosa)', 85*zm, 80*zm);
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ARN — CADENA SIMPLE', cx, cy-155*zm);
    ctx.fillStyle='rgba(239,68,68,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('U reemplaza a T · Ribosa (2′-OH)', cx, cy+155*zm);
  },

  /* ─── ARNm — mensajero ─── */
  mrna(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.08);
    const totalW=240*zm, startX=-totalW/2, y=0;
    // Cap 5′
    const capX=startX-20*zm;
    const capG=ctx.createRadialGradient(capX,y,0,capX,y,18*zm);
    capG.addColorStop(0,'rgba(168,85,247,1)'); capG.addColorStop(1,'rgba(100,0,200,0.5)');
    ctx.beginPath(); ctx.arc(capX,y,18*zm,0,Math.PI*2);
    ctx.fillStyle=capG; ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`bold ${8*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('5′cap', capX, y);
    ctx.fillStyle='rgba(168,85,247,0.8)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText('m7G', capX, y+28*zm);
    // Cadena ARNm con codones
    const codones=[['AUG','rgba(16,185,129,0.9)'],['GGU','rgba(6,182,212,0.8)'],['UCC','rgba(245,158,11,0.8)'],['AAG','rgba(168,85,247,0.8)'],['UAA','rgba(239,68,68,0.9)']];
    const codonW=totalW/codones.length;
    // Esqueleto
    ctx.beginPath(); ctx.moveTo(startX,y); ctx.lineTo(startX+totalW,y);
    ctx.strokeStyle='rgba(245,158,11,0.5)'; ctx.lineWidth=10*zm; ctx.stroke();
    // Codones
    codones.forEach(([cod,col],i)=>{
      const cx2=startX+i*codonW+codonW/2;
      ctx.beginPath(); ctx.rect(cx2-codonW/2+2,y-8*zm,codonW-4,16*zm);
      ctx.fillStyle=col.replace('0.9','0.2').replace('0.8','0.15'); ctx.fill();
      ctx.strokeStyle=col; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`bold ${7*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(cod, cx2, y);
      // Nombre aminoácido
      const aaNames=['Met','Gly','Ser','Lys','Stop'];
      ctx.fillStyle=col; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
      ctx.fillText(aaNames[i], cx2, y-15*zm);
    });
    // Cola poli-A 3′
    const tailX=startX+totalW+12*zm;
    ctx.beginPath();
    for(let a=0;a<8;a++){
      const ax=tailX+a*12*zm, ay=y+Math.sin(a*0.8+t*0.003)*6*zm;
      ctx.beginPath(); ctx.arc(ax,ay,7*zm,0,Math.PI*2);
      const g=ctx.createRadialGradient(ax,ay,0,ax,ay,7*zm);
      g.addColorStop(0,'rgba(239,68,68,0.9)'); g.addColorStop(1,'rgba(180,0,0,0.4)');
      ctx.fillStyle=g; ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.font=`${5*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('A', ax, ay);
    }
    ctx.fillStyle='rgba(239,68,68,0.7)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
    ctx.fillText('Poli-A 3′', tailX+44*zm, y+20*zm);
    // Ribosoma traduciéndolo
    const ribX=startX+((t*0.025)%(totalW/zm))*zm-30*zm;
    ctx.save(); ctx.translate(Math.max(startX+20*zm, Math.min(startX+totalW-20*zm, ribX)), y-55*zm);
    ctx.beginPath(); ctx.ellipse(0,0,30*zm,18*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(16,185,129,0.3)'; ctx.fill();
    ctx.strokeStyle='rgba(16,185,129,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0,18*zm,22*zm,12*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(6,182,212,0.3)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('80S', 0, -2*zm);
    ctx.restore();
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ARN MENSAJERO (ARNm)', cx, cy-110*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('5′cap — 5′UTR — CDS — 3′UTR — poli-A', cx, cy+110*zm);
  },

  /* ─── ARNr — ribosomal ─── */
  rrna(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(168,85,247,0.09)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.1);
    // Subunidad grande 60S
    const lgGrad=ctx.createRadialGradient(-10*zm,-25*zm,0,0,-20*zm,70*zm);
    lgGrad.addColorStop(0,'rgba(168,85,247,0.35)'); lgGrad.addColorStop(1,'rgba(80,0,160,0.15)');
    ctx.beginPath(); ctx.ellipse(0,-20*zm,80*zm,55*zm,0,0,Math.PI*2);
    ctx.fillStyle=lgGrad; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('60S', 0, -20*zm);
    ctx.fillStyle='rgba(168,85,247,0.6)'; ctx.font=`${7*zm}px JetBrains Mono`;
    ctx.fillText('28S+5.8S+5S', 0, -8*zm);
    // Subunidad pequeña 40S
    const smGrad=ctx.createRadialGradient(-10*zm,42*zm,0,0,42*zm,45*zm);
    smGrad.addColorStop(0,'rgba(6,182,212,0.35)'); smGrad.addColorStop(1,'rgba(0,80,150,0.15)');
    ctx.beginPath(); ctx.ellipse(0,42*zm,55*zm,32*zm,0,0,Math.PI*2);
    ctx.fillStyle=smGrad; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('40S', 0, 42*zm);
    ctx.fillStyle='rgba(6,182,212,0.6)'; ctx.font=`${7*zm}px JetBrains Mono`;
    ctx.fillText('18S', 0, 52*zm);
    // ARNm atravesando
    ctx.beginPath();
    for(let i=0;i<=40;i++){
      const x=-80*zm+i*4*zm;
      const y=35*zm+Math.sin(i*0.4+t*0.003)*4*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=3*zm; ctx.stroke();
    // Sitios A P E
    [[-18*zm,'A','rgba(239,68,68,0.9)'],[0,'P','rgba(16,185,129,0.9)'],[18*zm,'E','rgba(245,158,11,0.9)']].forEach(([x,l,c])=>{
      ctx.beginPath(); ctx.arc(x,20*zm,9*zm,0,Math.PI*2);
      ctx.fillStyle=c.replace('0.9','0.2'); ctx.fill();
      ctx.strokeStyle=c; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle=c; ctx.font=`bold ${8*zm}px JetBrains Mono`; ctx.textBaseline='middle';
      ctx.fillText(l, x, 20*zm);
    });
    // ARNt en sitio P
    const arntX=0, arntY=-10*zm;
    ctx.beginPath(); ctx.moveTo(arntX,arntY); ctx.lineTo(arntX,arntY-40*zm);
    ctx.strokeStyle='rgba(16,185,129,0.5)'; ctx.lineWidth=2*zm; ctx.stroke();
    ctx.beginPath(); ctx.arc(arntX,arntY-40*zm,10*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(16,185,129,0.3)'; ctx.fill();
    ctx.strokeStyle='rgba(16,185,129,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('tRNA', arntX, arntY-40*zm);
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ARN RIBOSOMAL (ARNr)', cx, cy-110*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Ribosoma 80S = 40S + 60S · Sitios A, P, E', cx, cy+110*zm);
  },

  /* ─── ARNt — trébol ─── */
  trna(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,160*zm);
    bg.addColorStop(0,'rgba(16,185,129,0.09)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.1+Math.sin(t*0.0005)*0.05);
    // Forma de hoja de trébol
    // Tallo aceptor (arriba)
    ctx.beginPath(); ctx.moveTo(0,90*zm); ctx.lineTo(0,30*zm);
    ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=6*zm; ctx.lineCap='round'; ctx.stroke();
    // Extremo 3′-CCA
    ctx.beginPath(); ctx.arc(0,100*zm,12*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`bold ${7*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('3′CCA', 0,100*zm);
    // Aminoácido unido
    const aaPulse=0.5+0.5*Math.sin(t*0.003);
    ctx.beginPath(); ctx.arc(0,118*zm,9*zm,0,Math.PI*2);
    const aaG=ctx.createRadialGradient(0,118*zm,0,0,118*zm,9*zm);
    aaG.addColorStop(0,`rgba(239,68,68,${0.7+aaPulse*0.3})`); aaG.addColorStop(1,'rgba(180,0,0,0.3)');
    ctx.fillStyle=aaG; ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('aa', 0, 118*zm);
    // Bucle D (izquierda arriba)
    ctx.beginPath(); ctx.moveTo(0,30*zm); ctx.quadraticCurveTo(-80*zm,-20*zm,-60*zm,-60*zm);
    ctx.strokeStyle='rgba(16,185,129,0.7)'; ctx.lineWidth=5*zm; ctx.stroke();
    ctx.beginPath(); ctx.arc(-60*zm,-60*zm,22*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(16,185,129,0.2)'; ctx.fill();
    ctx.strokeStyle='rgba(16,185,129,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('D', -60*zm,-60*zm);
    // Bucle TΨC (derecha arriba)
    ctx.beginPath(); ctx.moveTo(0,30*zm); ctx.quadraticCurveTo(80*zm,-20*zm,60*zm,-60*zm);
    ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=5*zm; ctx.stroke();
    ctx.beginPath(); ctx.arc(60*zm,-60*zm,22*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(6,182,212,0.2)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('TΨC', 60*zm,-60*zm);
    // Bucle anticodón (abajo)
    ctx.beginPath(); ctx.moveTo(0,30*zm); ctx.quadraticCurveTo(-20*zm,70*zm,0,90*zm);
    ctx.strokeStyle='rgba(168,85,247,0.5)'; ctx.lineWidth=3*zm; ctx.stroke();
    ctx.beginPath(); ctx.arc(0,-10*zm,28*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(168,85,247,0.15)'; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('Anticodón', 0,-10*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('3′-UAC-5′', 0, 3*zm);
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ARNt — HOJA DE TRÉBOL', cx, cy-145*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Adaptador codón → aminoácido', cx, cy+145*zm);
  },

  /* ─── Gen — estructura exón/intrón ─── */
  gene(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.05);
    const geneW=260*zm, startX=-geneW/2;
    // Partes del gen
    const parts=[
      {label:'Promotor',w:45,col:'rgba(239,68,68,'},
      {label:'Exón 1',w:35,col:'rgba(16,185,129,'},
      {label:'Intrón 1',w:50,col:'rgba(100,100,100,',pattern:true},
      {label:'Exón 2',w:35,col:'rgba(16,185,129,'},
      {label:'Intrón 2',w:45,col:'rgba(100,100,100,',pattern:true},
      {label:'Exón 3',w:50,col:'rgba(16,185,129,'}
    ];
    const totalRatio=parts.reduce((a,p)=>a+p.w,0);
    let curX=startX;
    parts.forEach((p,i)=>{
      const pw=(p.w/totalRatio)*geneW;
      ctx.beginPath(); ctx.rect(curX,-20*zm,pw,40*zm);
      if(p.pattern){
        // Intrón: punteado
        ctx.fillStyle='rgba(50,50,50,0.5)'; ctx.fill();
        ctx.strokeStyle=p.col+'0.5)'; ctx.lineWidth=1.5; ctx.setLineDash([4*zm,3*zm]); ctx.stroke(); ctx.setLineDash([]);
        // Arco de splicing
        ctx.beginPath(); ctx.arc(curX+pw/2,-35*zm,pw/2,Math.PI,0);
        ctx.strokeStyle=p.col+'0.4)'; ctx.lineWidth=1.5; ctx.stroke();
      } else {
        const g=ctx.createLinearGradient(curX,-20*zm,curX,20*zm);
        g.addColorStop(0,p.col+'0.8)'); g.addColorStop(1,p.col+'0.4)');
        ctx.fillStyle=g; ctx.fill();
        ctx.strokeStyle=p.col+'0.9)'; ctx.lineWidth=2; ctx.stroke();
      }
      // Label
      ctx.fillStyle=p.pattern?'rgba(150,150,150,0.7)':'#fff';
      ctx.font=`${Math.max(6,8)*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(p.label, curX+pw/2, 0);
      curX+=pw;
    });
    // Flecha dirección transcripción
    ctx.beginPath(); ctx.moveTo(startX,35*zm); ctx.lineTo(startX+geneW,35*zm);
    ctx.strokeStyle='rgba(245,158,11,0.6)'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(startX+geneW-10*zm,30*zm); ctx.lineTo(startX+geneW,35*zm); ctx.lineTo(startX+geneW-10*zm,40*zm);
    ctx.strokeStyle='rgba(245,158,11,0.6)'; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.6)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('5′→3′ dirección', startX, 50*zm);
    // ARNm producto (splicing)
    const mrnaParts=[{label:'Exón 1',w:35},{label:'Exón 2',w:35},{label:'Exón 3',w:50}];
    const mrnaTotal=mrnaParts.reduce((a,p)=>a+p.w,0);
    const mrnaW=(mrnaTotal/totalRatio)*geneW;
    let mcurX=-mrnaW/2;
    ctx.fillStyle='rgba(6,182,212,0.6)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('ARNm maduro:', -130*zm, 80*zm);
    mrnaParts.forEach(p=>{
      const pw=(p.w/mrnaTotal)*mrnaW;
      ctx.beginPath(); ctx.rect(mcurX,70*zm,pw,20*zm);
      ctx.fillStyle='rgba(16,185,129,0.4)'; ctx.fill();
      ctx.strokeStyle='rgba(16,185,129,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(p.label, mcurX+pw/2, 80*zm);
      mcurX+=pw;
    });
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ESTRUCTURA DEL GEN', cx, cy-95*zm);
  },

  /* ─── Genoma — cromosomas ─── */
  genome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(168,85,247,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.1);
    // 23 pares de cromosomas miniatura
    const cols=6, rows=4;
    const chrW=16*zm, chrH=28*zm, gap=8*zm;
    const totalW=cols*(chrW*2+gap*3), totalH=rows*(chrH+gap);
    const sx=-totalW/2, sy=-totalH/2;
    const colors=['rgba(16,185,129,','rgba(6,182,212,','rgba(168,85,247,','rgba(245,158,11,','rgba(239,68,68,'];
    let chrIdx=0;
    for(let row=0;row<rows&&chrIdx<23;row++){
      for(let col=0;col<cols&&chrIdx<23;col++){
        const x=sx+col*(chrW*2+gap*3);
        const y=sy+row*(chrH+gap);
        const col2=colors[chrIdx%5];
        const pulse=0.5+0.4*Math.sin(t*0.002+chrIdx);
        // Par homólogo
        [0,chrW+gap].forEach(dx=>{
          // Cromátida con centrómero
          const cY=y+chrH*0.4;
          ctx.beginPath(); ctx.roundRect(x+dx,y,chrW,chrH*0.35,3*zm);
          ctx.fillStyle=col2+`${0.4+pulse*0.1})`; ctx.fill();
          ctx.strokeStyle=col2+'0.7)'; ctx.lineWidth=1; ctx.stroke();
          ctx.beginPath(); ctx.roundRect(x+dx,cY,chrW,chrH*0.55,3*zm);
          ctx.fillStyle=col2+`${0.3+pulse*0.1})`; ctx.fill();
          ctx.strokeStyle=col2+'0.6)'; ctx.lineWidth=1; ctx.stroke();
          // Bandas
          for(let b=0;b<3;b++){
            ctx.beginPath(); ctx.rect(x+dx+2,y+b*8*zm+4*zm,chrW-4,3*zm);
            ctx.fillStyle=`rgba(255,255,255,0.12)`; ctx.fill();
          }
        });
        // Número
        ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center';
        ctx.fillText(chrIdx+1, x+chrW+gap/2, y+chrH+8*zm);
        chrIdx++;
      }
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('GENOMA HUMANO', cx, cy-118*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('23 pares · 3×10⁹ pb · ~25,000 genes', cx, cy+118*zm);
  },

  /* ─── Epigenoma ─── */
  epigenome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(239,68,68,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.08);
    // Nucleosoma: ADN enrollado en histonas
    const histR=32*zm;
    // Octámero de histonas (cilindro simplificado)
    const hG=ctx.createRadialGradient(-8*zm,-8*zm,0,0,0,histR);
    hG.addColorStop(0,'rgba(245,158,11,0.8)'); hG.addColorStop(1,'rgba(180,80,0,0.5)');
    ctx.beginPath(); ctx.arc(0,0,histR,0,Math.PI*2);
    ctx.fillStyle=hG; ctx.fill(); ctx.strokeStyle='rgba(255,180,50,0.7)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('H3+H4', 0,-6*zm); ctx.fillText('H2A+H2B', 0,5*zm);
    // ADN enrollado (147 pb)
    for(let i=0;i<=36;i++){
      const ang=(i/36)*Math.PI*4-Math.PI;
      const r=histR+9*zm;
      const x=r*Math.cos(ang+t*0.0003), y=r*Math.sin(ang+t*0.0003)*0.6;
      if(i>0){
        ctx.beginPath();
        const prevAng=((i-1)/36)*Math.PI*4-Math.PI;
        const px=r*Math.cos(prevAng+t*0.0003), py=r*Math.sin(prevAng+t*0.0003)*0.6;
        ctx.moveTo(px,py); ctx.lineTo(x,y);
        ctx.strokeStyle='rgba(16,185,129,0.75)'; ctx.lineWidth=4*zm; ctx.stroke();
      }
    }
    // Marcas epigenéticas en colas de histonas
    const marks=[
      {ang:0.5,r:50*zm,label:'Ac',col:'rgba(16,185,129,0.9)',desc:'Acetilación'},
      {ang:1.8,r:55*zm,label:'Me3',col:'rgba(168,85,247,0.9)',desc:'Metilación'},
      {ang:3.2,r:50*zm,label:'Ph',col:'rgba(6,182,212,0.9)',desc:'Fosforilación'},
      {ang:4.5,r:52*zm,label:'Ub',col:'rgba(239,68,68,0.9)',desc:'Ubiquitinación'}
    ];
    marks.forEach(m=>{
      const mx=m.r*Math.cos(m.ang), my=m.r*Math.sin(m.ang)*0.7;
      ctx.beginPath(); ctx.moveTo(mx*0.7,my*0.7); ctx.lineTo(mx,my);
      ctx.strokeStyle=m.col.replace('0.9','0.4)').replace('rgba(','rgba('); ctx.lineWidth=1; ctx.stroke();
      const pulse=0.5+0.5*Math.sin(t*0.002+m.ang);
      ctx.beginPath(); ctx.arc(mx,my,10*zm,0,Math.PI*2);
      ctx.fillStyle=m.col.replace('0.9',`${0.3+pulse*0.2})`); ctx.fill();
      ctx.strokeStyle=m.col; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`bold ${6*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(m.label, mx, my);
    });
    // Metilación CpG en el ADN
    for(let i=0;i<6;i++){
      const ang=(i/6)*Math.PI*4-Math.PI+1;
      const r=histR+9*zm;
      const mx=r*Math.cos(ang+t*0.0003), my=r*Math.sin(ang+t*0.0003)*0.6;
      ctx.beginPath(); ctx.arc(mx,my,4*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.fill();
    }
    ctx.fillStyle='rgba(239,68,68,0.7)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('● CpG metilado (5-mC)', 0, 110*zm);
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('EPIGENOMA', cx, cy-110*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Nucleosoma · Marcas histonas · CpG metilado', cx, cy+125*zm);
  },

  /* ─── Alelos ─── */
  alleles(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.1);
    // Dos cromosomas homólogos con alelos
    const chrH=150*zm, chrW=28*zm;
    [[-55*zm,'Cromosoma\nmaterno','rgba(239,68,68,','rgba(16,185,129,'],[55*zm,'Cromosoma\npaterno','rgba(6,182,212,','rgba(239,68,68,']].forEach(([x,label,chrCol,alleleCol],ci)=>{
      // Cromosoma
      ctx.beginPath(); ctx.roundRect(x-chrW/2,-chrH/2,chrW,chrH*0.45,6*zm);
      ctx.fillStyle=chrCol+'0.25)'; ctx.fill(); ctx.strokeStyle=chrCol+'0.7)'; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.roundRect(x-chrW/2,-chrH/2+chrH*0.48,chrW,chrH*0.52,6*zm);
      ctx.fillStyle=chrCol+'0.2)'; ctx.fill(); ctx.strokeStyle=chrCol+'0.6)'; ctx.lineWidth=2; ctx.stroke();
      // Centrómero
      ctx.beginPath(); ctx.arc(x,chrH*(-0.5+0.45),8*zm,0,Math.PI*2);
      ctx.fillStyle=chrCol+'0.5)'; ctx.fill();
      // Alelo en locus
      const locusY=-chrH*0.1;
      const pulse=0.5+0.5*Math.sin(t*0.002+ci);
      ctx.beginPath(); ctx.rect(x-chrW/2-2,locusY-6*zm,chrW+4,12*zm);
      ctx.fillStyle=alleleCol+`${0.4+pulse*0.2})`; ctx.fill();
      ctx.strokeStyle=alleleCol+'0.9)'; ctx.lineWidth=2; ctx.stroke();
      const alleleName=ci===0?'A':'a';
      ctx.fillStyle='#fff'; ctx.font=`bold ${11*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(alleleName, x, locusY);
      // Label locus
      const side=ci===0?-1:1;
      ctx.beginPath(); ctx.moveTo(x+side*chrW/2,locusY); ctx.lineTo(x+side*40*zm,locusY);
      ctx.strokeStyle=alleleCol+'0.5)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle=alleleCol+'0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
      ctx.textAlign=ci===0?'right':'left';
      ctx.fillText(ci===0?'Alelo A (Dom.)':'Alelo a (rec.)', x+side*42*zm, locusY);
    });
    // Genotipo Aa — heterocigoto
    const gPulse=0.5+0.5*Math.sin(t*0.002);
    ctx.beginPath(); ctx.roundRect(-35*zm,85*zm,70*zm,28*zm,8*zm);
    ctx.fillStyle=`rgba(168,85,247,${0.15+gPulse*0.1})`; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('Genotipo: Aa', 0, 99*zm);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font=`${7*zm}px JetBrains Mono`;
    ctx.fillText('Heterocigoto', 0, 112*zm);
    // Locus
    ctx.beginPath(); ctx.moveTo(-55*zm,-chrH*0.1); ctx.lineTo(55*zm,-chrH*0.1);
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1; ctx.setLineDash([4*zm,4*zm]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('← locus →', 0,-chrH*0.1-14*zm);
    ctx.restore();
    ctx.fillStyle='rgba(34,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('ALELOS', cx, cy-105*zm);
  },

  /* ─── Mutación ─── */
  mutation(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Secuencia normal
    const seq1='A T G C G A T C';
    const seq2='A T G C G A T C';
    const mutSeq='A T G C T A T C'; // G→T mutación
    const charW=28*zm, startX=-seq1.split(' ').length*charW/2;
    const bases1=seq1.split(' '), bases2=mutSeq.split(' ');
    const mutPos=4;
    ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('Normal:', startX-30*zm,-60*zm);
    ctx.fillText('Mutante:', startX-30*zm,30*zm);
    const baseC={'A':'rgba(16,185,129,0.85)','T':'rgba(239,68,68,0.85)','G':'rgba(168,85,247,0.85)','C':'rgba(6,182,212,0.85)'};
    // Normal
    bases1.forEach((b,i)=>{
      const bx=startX+i*charW, by=-75*zm;
      ctx.beginPath(); ctx.roundRect(bx,by,22*zm,22*zm,4*zm);
      ctx.fillStyle=baseC[b]; ctx.fill();
      ctx.fillStyle='#fff'; ctx.font=`bold ${11*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(b, bx+11*zm, by+11*zm);
    });
    // Mutante
    bases2.forEach((b,i)=>{
      const bx=startX+i*charW, by=15*zm;
      const isMut=i===mutPos;
      const pulse=isMut?0.5+0.5*Math.sin(t*0.004):0;
      ctx.beginPath(); ctx.roundRect(bx,by,22*zm,22*zm,4*zm);
      ctx.fillStyle=isMut?`rgba(255,50,50,${0.7+pulse*0.25})`:baseC[b]; ctx.fill();
      if(isMut){ ctx.strokeStyle='rgba(255,100,100,0.9)'; ctx.lineWidth=2.5; ctx.stroke(); }
      ctx.fillStyle='#fff'; ctx.font=`bold ${11*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(b, bx+11*zm, by+11*zm);
      if(isMut){
        ctx.fillStyle='rgba(255,100,100,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
        ctx.fillText('↑ G→T', bx+11*zm, by+35*zm);
        ctx.fillText('missense', bx+11*zm, by+46*zm);
        // Flash de mutación
        ctx.beginPath(); ctx.arc(bx+11*zm,by+11*zm,16*zm*(1+pulse*0.3),0,Math.PI*2);
        ctx.strokeStyle=`rgba(255,100,100,${0.4-pulse*0.35})`; ctx.lineWidth=2; ctx.stroke();
      }
    });
    // Flecha
    ctx.beginPath(); ctx.moveTo(0,-40*zm); ctx.lineTo(0,5*zm);
    ctx.strokeStyle='rgba(255,100,100,0.6)'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6*zm,-2*zm); ctx.lineTo(0,8*zm); ctx.lineTo(6*zm,-2*zm);
    ctx.strokeStyle='rgba(255,100,100,0.6)'; ctx.stroke();
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MUTACIÓN PUNTUAL', cx, cy-110*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Sustitución G→T · Missense', cx, cy+110*zm);
  },

  /* ─── Recombinación genética ─── */
  recombination(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(16,185,129,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    const chrL=120*zm, chrW=14*zm;
    const crossX=0, crossProgress=0.5+0.5*Math.sin(t*0.002);
    // Cromosoma 1 (materno: verde)
    const c1y=-45*zm;
    ctx.beginPath(); ctx.roundRect(-chrL,c1y-chrW/2,chrL*crossProgress*2,chrW,4*zm);
    ctx.fillStyle='rgba(16,185,129,0.5)'; ctx.fill();
    ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=2; ctx.stroke();
    // Cromosoma 2 (paterno: azul)
    const c2y=45*zm;
    ctx.beginPath(); ctx.roundRect(-chrL,c2y-chrW/2,chrL*crossProgress*2,chrW,4*zm);
    ctx.fillStyle='rgba(6,182,212,0.5)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.9)'; ctx.lineWidth=2; ctx.stroke();
    // Segmentos intercambiados (recombinantes)
    const crossXPos=crossX-chrL+chrL*crossProgress*2;
    // Materno con segmento paterno
    ctx.beginPath(); ctx.roundRect(crossXPos,c1y-chrW/2,chrL-(crossXPos+chrL),chrW,4*zm);
    ctx.fillStyle='rgba(6,182,212,0.5)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.9)'; ctx.lineWidth=2; ctx.stroke();
    // Paterno con segmento materno
    ctx.beginPath(); ctx.roundRect(crossXPos,c2y-chrW/2,chrL-(crossXPos+chrL),chrW,4*zm);
    ctx.fillStyle='rgba(16,185,129,0.5)'; ctx.fill();
    ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=2; ctx.stroke();
    // Quiasma (X)
    const qSize=20*zm;
    ctx.beginPath(); ctx.moveTo(crossXPos-qSize,c1y); ctx.lineTo(crossXPos+qSize,c2y);
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=3; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(crossXPos-qSize,c2y); ctx.lineTo(crossXPos+qSize,c1y);
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=3; ctx.stroke();
    // Label quiasma
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Quiasma', crossXPos, -75*zm);
    ctx.fillText('(crossing-over)', crossXPos, -63*zm);
    // Labels cromosomas
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('Materno', -chrL-5*zm, c1y-20*zm);
    ctx.fillStyle='rgba(6,182,212,0.9)';
    ctx.fillText('Paterno', -chrL-5*zm, c2y-20*zm);
    // Alelos
    ['A','B'].forEach((a,i)=>{
      const ax=-chrL+20*zm+i*80*zm;
      ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(a, ax, c1y);
    });
    ['a','b'].forEach((a,i)=>{
      const ax=-chrL+20*zm+i*80*zm;
      ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(a, ax, c2y);
    });
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('RECOMBINACIÓN GENÉTICA', cx, cy-110*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Crossing-over meiótico · RAD51', cx, cy+110*zm);
  },

  /* ─── Dominancia — cuadro Punnett ─── */
  dominance(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    const cellS=45*zm, grid=2;
    const startX=-grid*cellS/2, startY=-grid*cellS/2-20*zm;
    // Encabezados
    const parentH=['A','a'], parentV=['A','a'];
    const genotypes=[['AA','Aa'],['Aa','aa']];
    const phenoColors=[['rgba(168,85,247,0.7)','rgba(168,85,247,0.7)'],['rgba(168,85,247,0.7)','rgba(100,100,100,0.5)']];
    // Gametos fila
    parentH.forEach((g,i)=>{
      ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font=`bold ${12*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(g, startX+i*cellS+cellS/2, startY-18*zm);
    });
    // Gametos columna
    parentV.forEach((g,i)=>{
      ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font=`bold ${12*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(g, startX-18*zm, startY+i*cellS+cellS/2);
    });
    // Cuadrícula
    genotypes.forEach((row,ri)=>{
      row.forEach((geno,ci)=>{
        const x=startX+ci*cellS, y=startY+ri*cellS;
        ctx.beginPath(); ctx.rect(x,y,cellS,cellS);
        ctx.fillStyle=phenoColors[ri][ci]; ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1.5; ctx.stroke();
        ctx.fillStyle='#fff'; ctx.font=`bold ${12*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(geno, x+cellS/2, y+cellS/2);
      });
    });
    // Leyenda fenotípica
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('■ Fenotipo dominante (3/4)', startX, startY+grid*cellS+24*zm);
    ctx.fillStyle='rgba(150,150,150,0.7)';
    ctx.fillText('■ Fenotipo recesivo (1/4)', startX, startY+grid*cellS+38*zm);
    // Razón 3:1
    const pulse=0.5+0.5*Math.sin(t*0.002);
    ctx.fillStyle=`rgba(245,158,11,${0.7+pulse*0.25})`; ctx.font=`bold ${14*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Razón fenotípica 3:1', 0, startY+grid*cellS+60*zm);
    // Padres Aa × Aa
    ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Cruce: Aa × Aa', 0, startY-40*zm);
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('DOMINANCIA', cx, cy-115*zm);
  },

  /* ─── Codominancia — ABO ─── */
  codominance(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Tres eritrocitos: A, B, AB
    const cells=[
      {x:-90*zm,y:0,label:'Grupo A',genotype:'IᴬIᴬ o IᴬI°',antigen:'A',col:'rgba(239,68,68,',antCol:'rgba(239,68,68,0.9)'},
      {x:90*zm,y:0,label:'Grupo B',genotype:'IᴮIᴮ o IᴮI°',antigen:'B',col:'rgba(6,182,212,',antCol:'rgba(6,182,212,0.9)'},
      {x:0,y:-80*zm,label:'Grupo AB',genotype:'IᴬIᴮ (codominante)',antigen:'AB',col:'rgba(168,85,247,',antCol:'rgba(168,85,247,0.9)'}
    ];
    cells.forEach(cell=>{
      // Eritrocito
      const pulse=0.5+0.5*Math.sin(t*0.002+cell.x);
      const cG=ctx.createRadialGradient(cell.x-6*zm,cell.y-6*zm,0,cell.x,cell.y,38*zm);
      cG.addColorStop(0,cell.col+`${0.6+pulse*0.15})`); cG.addColorStop(1,cell.col+'0.3)');
      ctx.beginPath(); ctx.ellipse(cell.x,cell.y,38*zm,30*zm,0,0,Math.PI*2);
      ctx.fillStyle=cG; ctx.fill();
      ctx.strokeStyle=cell.col+'0.8)'; ctx.lineWidth=2; ctx.stroke();
      // Antígenos en superficie
      const nAntigens = cell.antigen==='AB'?6:4;
      for(let a=0;a<nAntigens;a++){
        const ang=(a/nAntigens)*Math.PI*2;
        const ar=32*zm, ax=cell.x+ar*Math.cos(ang), ay=cell.y+ar*Math.sin(ang)*0.8;
        ctx.beginPath(); ctx.arc(ax,ay,6*zm,0,Math.PI*2);
        const antC = cell.antigen==='AB'? (a<3?'rgba(239,68,68,0.9)':'rgba(6,182,212,0.9)') : cell.antCol;
        ctx.fillStyle=antC; ctx.fill();
        ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`bold ${5*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(cell.antigen==='AB'?(a<3?'A':'B'):cell.antigen, ax, ay);
      }
      // Labels
      ctx.fillStyle=cell.antCol; ctx.font=`bold ${9*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
      ctx.fillText(cell.label, cell.x, cell.y+50*zm);
      ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font=`${6*zm}px JetBrains Mono`;
      ctx.fillText(cell.genotype, cell.x, cell.y+62*zm);
    });
    // Flecha codominancia
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('IᴬIᴮ → Ambos antígenos expresados', 0, 80*zm);
    ctx.fillText('= CODOMINANCIA', 0, 94*zm);
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CODOMINANCIA — SISTEMA ABO', cx, cy-115*zm);
  },

  /* ─── Herencia mendeliana — cuadro dihibrido ─── */
  mendelian(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Cuadro de Punnett 4x4 (dihibrido AaBb × AaBb)
    const cellS=30*zm, grid=4;
    const startX=-grid*cellS/2, startY=-grid*cellS/2;
    const gametes=['AB','Ab','aB','ab'];
    const phenos=[[2,1,2,1],[1,0,1,0],[2,1,2,1],[1,0,1,0]]; // 0=aabb, 1=A_bb o aaB_, 2=A_B_
    const phenoCol=['rgba(80,80,80,0.5)','rgba(6,182,212,0.5)','rgba(16,185,129,0.5)'];
    // Headers fila/col
    gametes.forEach((g,i)=>{
      ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(g, startX+i*cellS+cellS/2, startY-12*zm);
      ctx.fillText(g, startX-12*zm, startY+i*cellS+cellS/2);
    });
    // Celdas
    for(let r=0;r<4;r++){
      for(let c=0;c<4;c++){
        const x=startX+c*cellS, y=startY+r*cellS;
        const ph=phenos[r][c];
        const pulse=0.5+0.4*Math.sin(t*0.002+r+c);
        ctx.beginPath(); ctx.rect(x,y,cellS,cellS);
        ctx.fillStyle=phenoCol[ph].replace('0.5)',`${0.3+pulse*0.1})`); ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1; ctx.stroke();
      }
    }
    // Razón 9:3:3:1
    ctx.fillStyle='rgba(16,185,129,0.8)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('■ A_B_  (9)', startX, startY+grid*cellS+18*zm);
    ctx.fillStyle='rgba(6,182,212,0.8)';
    ctx.fillText('■ A_bb / aaB_ (6)', startX, startY+grid*cellS+30*zm);
    ctx.fillStyle='rgba(150,150,150,0.8)';
    ctx.fillText('■ aabb (1)', startX, startY+grid*cellS+42*zm);
    const pulse=0.5+0.5*Math.sin(t*0.002);
    ctx.fillStyle=`rgba(245,158,11,${0.7+pulse*0.25})`; ctx.font=`bold ${12*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('9 : 3 : 3 : 1', 0, startY+grid*cellS+60*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${7*zm}px JetBrains Mono`;
    ctx.fillText('AaBb × AaBb (dihibrido)', 0, startY-28*zm);
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('HERENCIA MENDELIANA', cx, cy-115*zm);
  },

  /* ─── Herencia ligada al sexo ─── */
  xlinked(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Cromosoma X grande
    const drawChr=(x,y,type,allele)=>{
      if(type==='X'){
        ctx.beginPath(); ctx.roundRect(x-10*zm,y-70*zm,20*zm,55*zm,5*zm);
        ctx.fillStyle='rgba(239,68,68,0.35)'; ctx.fill();
        ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=2; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(x-10*zm,y-10*zm,20*zm,75*zm,5*zm);
        ctx.fillStyle='rgba(239,68,68,0.3)'; ctx.fill();
        ctx.strokeStyle='rgba(239,68,68,0.7)'; ctx.lineWidth=2; ctx.stroke();
        ctx.beginPath(); ctx.arc(x,y-14*zm,7*zm,0,Math.PI*2);
        ctx.fillStyle='rgba(239,68,68,0.5)'; ctx.fill();
        ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${10*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('X', x, y-14*zm);
        // Alelo en X
        if(allele){
          const pulse=0.5+0.5*Math.sin(t*0.003+x);
          ctx.beginPath(); ctx.rect(x-9*zm,y-45*zm,18*zm,12*zm);
          ctx.fillStyle=allele==='Xᴬ'?`rgba(16,185,129,${0.4+pulse*0.2})`:`rgba(239,68,68,${0.4+pulse*0.2})`; ctx.fill();
          ctx.strokeStyle=allele==='Xᴬ'?'rgba(16,185,129,0.9)':'rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
          ctx.fillStyle='#fff'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
          ctx.fillText(allele, x, y-39*zm);
        }
      } else {
        // Y pequeño
        ctx.beginPath(); ctx.roundRect(x-8*zm,y-30*zm,16*zm,40*zm,4*zm);
        ctx.fillStyle='rgba(6,182,212,0.35)'; ctx.fill();
        ctx.strokeStyle='rgba(6,182,212,0.8)'; ctx.lineWidth=2; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(x-8*zm,y+13*zm,16*zm,55*zm,4*zm);
        ctx.fillStyle='rgba(6,182,212,0.2)'; ctx.fill();
        ctx.strokeStyle='rgba(6,182,212,0.6)'; ctx.lineWidth=2; ctx.stroke();
        ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${10*zm}px Outfit`; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('Y', x, y-10*zm);
      }
    };
    // Madre portadora X^A X^a
    drawChr(-60*zm,-30*zm,'X','Xᴬ');
    drawChr(-30*zm,-30*zm,'X','Xᵃ');
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Madre portadora', -45*zm,-110*zm);
    ctx.fillText('XᴬXᵃ', -45*zm,-98*zm);
    // Padre normal XY
    drawChr(40*zm,-30*zm,'X','Xᴬ');
    drawChr(65*zm,-30*zm,'Y',null);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('Padre normal', 52*zm,-110*zm);
    ctx.fillText('XᴬY', 52*zm,-98*zm);
    // Líneas de cruces
    ctx.beginPath(); ctx.moveTo(-45*zm,-10*zm); ctx.lineTo(0,10*zm); ctx.lineTo(52*zm,-10*zm);
    ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1; ctx.stroke();
    // Descendencia
    const desc=[
      {x:-90*zm,chrs:['X^A','X^A'],label:'Hija\nnormal',col:'rgba(16,185,129,'},
      {x:-30*zm,chrs:['X^A','X^a'],label:'Hija\nportadora',col:'rgba(245,158,11,'},
      {x:30*zm,chrs:['X^A','Y'],label:'Hijo\nnormal',col:'rgba(6,182,212,'},
      {x:90*zm,chrs:['X^a','Y'],label:'Hijo\nafectado',col:'rgba(239,68,68,'}
    ];
    desc.forEach(d=>{
      const pulse=0.5+0.5*Math.sin(t*0.002+d.x);
      ctx.beginPath(); ctx.arc(d.x,65*zm,22*zm,0,Math.PI*2);
      ctx.fillStyle=d.col+`${0.2+pulse*0.1})`; ctx.fill();
      ctx.strokeStyle=d.col+'0.8)'; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle=d.col+'0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
      const ll=d.label.split('\n');
      ctx.fillText(ll[0], d.x, 60*zm); ctx.fillText(ll[1], d.x, 72*zm);
      ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.font=`${6*zm}px JetBrains Mono`;
      ctx.fillText(d.chrs.join(''), d.x, 92*zm);
    });
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('HERENCIA LIGADA AL SEXO', cx, cy-130*zm);
  },

  /* ─── Impronta genómica ─── */
  imprinting(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Dos alelos del mismo gen — IGF2 / H19
    const drawImprint=(x,y,origin,activeGene,silentGene,active)=>{
      // Cromosoma
      ctx.beginPath(); ctx.roundRect(x-12*zm,y-80*zm,24*zm,160*zm,6*zm);
      ctx.fillStyle=origin==='paterno'?'rgba(6,182,212,0.15)':'rgba(239,68,68,0.15)'; ctx.fill();
      ctx.strokeStyle=origin==='paterno'?'rgba(6,182,212,0.6)':'rgba(239,68,68,0.6)'; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle=origin==='paterno'?'rgba(6,182,212,0.8)':'rgba(239,68,68,0.8)';
      ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(origin.toUpperCase(), x, y-90*zm);
      // Gen activo
      const pulse=0.5+0.5*Math.sin(t*0.003+x);
      ctx.beginPath(); ctx.roundRect(x-11*zm,y-55*zm,22*zm,22*zm,4*zm);
      ctx.fillStyle=`rgba(16,185,129,${0.4+pulse*0.2})`; ctx.fill();
      ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='#fff'; ctx.font=`bold ${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
      ctx.fillText(activeGene, x, y-44*zm);
      // Ondas de expresión
      for(let w2=1;w2<=3;w2++){
        ctx.beginPath(); ctx.arc(x+(origin==='paterno'?22:-22)*zm,y-44*zm,w2*8*zm,0,Math.PI*2);
        ctx.strokeStyle=`rgba(16,185,129,${0.4-w2*0.1+pulse*0.1})`; ctx.lineWidth=1; ctx.stroke();
      }
      // Gen silenciado (metilado)
      ctx.beginPath(); ctx.roundRect(x-11*zm,y+10*zm,22*zm,22*zm,4*zm);
      ctx.fillStyle='rgba(80,80,80,0.5)'; ctx.fill();
      ctx.strokeStyle='rgba(150,150,150,0.4)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle='rgba(200,200,200,0.5)'; ctx.font=`bold ${7*zm}px JetBrains Mono`; ctx.textBaseline='middle';
      ctx.fillText(silentGene, x, y+21*zm);
      // Marca CpG (metilación)
      for(let m=0;m<4;m++){
        const mx=x-8*zm+m*5*zm;
        ctx.beginPath(); ctx.arc(mx,y+35*zm,3*zm,0,Math.PI*2);
        ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.fill();
      }
      ctx.fillStyle='rgba(239,68,68,0.7)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='alphabetic';
      ctx.fillText('CpG↑', x, y+48*zm);
    };
    drawImprint(-60*zm, 0,'paterno','IGF2','H19', true);
    drawImprint(60*zm, 0,'materno','H19','IGF2', true);
    // Label central
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Mismo locus, expresión opuesta', 0, 85*zm);
    ctx.fillText('según origen parental', 0, 97*zm);
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('IMPRONTA GENÓMICA', cx, cy-115*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('IGF2 (paterno) · H19 (materno)', cx, cy+115*zm);
  },

  /* ─── Transposones ─── */
  transposon(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,170*zm);
    bg.addColorStop(0,'rgba(245,158,11,0.08)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Genoma (ADN cromosómico) — 2 líneas
    const chromY1=-55*zm, chromY2=55*zm;
    const chromW=280*zm;
    [chromY1,chromY2].forEach(y=>{
      ctx.beginPath(); ctx.moveTo(-chromW/2,y); ctx.lineTo(chromW/2,y);
      ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=8*zm; ctx.stroke();
      ctx.strokeStyle='rgba(16,185,129,0.2)'; ctx.lineWidth=12*zm; ctx.stroke();
    });
    // Transposón en posición original (cromosoma 1)
    const transW=100*zm;
    const transX1=-transW/2;
    // ITRs (repeticiones terminales invertidas)
    ctx.beginPath(); ctx.rect(transX1,chromY1-14*zm,16*zm,10*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('ITR', transX1+8*zm,chromY1-9*zm);
    // Transposasa
    ctx.beginPath(); ctx.rect(transX1+18*zm,chromY1-14*zm,64*zm,10*zm);
    ctx.fillStyle='rgba(245,158,11,0.5)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('TRANSPOSASA', transX1+50*zm,chromY1-9*zm);
    // ITR derecho
    ctx.beginPath(); ctx.rect(transX1+84*zm,chromY1-14*zm,16*zm,10*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('ITR', transX1+92*zm,chromY1-9*zm);
    // Flecha de transposición animada
    const progress=(t*0.0005)%1;
    const arrowX=-chromW/2+progress*chromW;
    const arrowY=chromY1 + progress*(chromY2-chromY1-20*zm)-(progress*(1-progress))*90*zm;
    // Arco de salto
    ctx.beginPath();
    ctx.moveTo(0,chromY1-9*zm);
    ctx.quadraticCurveTo(60*zm,chromY1-80*zm,80*zm,chromY2-9*zm);
    ctx.strokeStyle='rgba(245,158,11,0.25)'; ctx.lineWidth=2; ctx.setLineDash([4*zm,3*zm]); ctx.stroke(); ctx.setLineDash([]);
    // Elemento saltando
    const tG=ctx.createRadialGradient(arrowX,arrowY,0,arrowX,arrowY,14*zm);
    tG.addColorStop(0,'rgba(245,158,11,0.9)'); tG.addColorStop(1,'rgba(245,158,11,0.1)');
    ctx.beginPath(); ctx.arc(arrowX,arrowY,14*zm,0,Math.PI*2);
    ctx.fillStyle=tG; ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`bold ${7*zm}px JetBrains Mono`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('TE', arrowX, arrowY);
    // Alu (SINE) en cromosoma 2
    const aluX=50*zm;
    ctx.beginPath(); ctx.rect(aluX,chromY2+4*zm,40*zm,8*zm);
    ctx.fillStyle='rgba(168,85,247,0.6)'; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.8)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('Alu (SINE)', aluX+20*zm, chromY2+8*zm);
    // L1 (LINE)
    const l1X=-100*zm;
    ctx.beginPath(); ctx.rect(l1X,chromY2+4*zm,70*zm,8*zm);
    ctx.fillStyle='rgba(239,68,68,0.5)'; ctx.fill();
    ctx.strokeStyle='rgba(239,68,68,0.7)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textBaseline='middle';
    ctx.fillText('LINE-1 (L1)', l1X+35*zm, chromY2+8*zm);
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('TRANSPOSONES', cx, cy-105*zm);
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('>50% del genoma humano · McClintock 1950', cx, cy+105*zm);
  }
};