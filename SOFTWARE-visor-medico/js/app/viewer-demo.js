// ===== VIEWER-DEMO.JS — Visualizaciones Canvas Demo =====

function loadCollectionIntoViewer(col) {
  if (!col) return;
  document.getElementById('study-collection').textContent = col.name;
  document.getElementById('study-patient').textContent = `${col.icon} ${col.organ}`;

  document.getElementById('series-list').innerHTML = col.phases.map((phase, i) => `
    <div class="series-item ${i===0?'active':''}" onclick="selectPhase(${i})">
      <div class="series-thumb">${col.modality}</div>
      <div class="series-info">
        <span class="series-name">${phase}</span>
        <span class="series-count">${Math.floor(col.images/col.phases.length/col.series*10)} imgs</span>
      </div>
    </div>
  `).join('');

  renderStructures(col);
  document.getElementById('clinical-text').textContent = col.clinicalInfo;

  document.getElementById('phases-list').innerHTML = col.phases.map((p, i) => `
    <span class="phase-tag ${i===0?'active':''}" onclick="selectPhase(${i}); highlightPhase(this)">${p}</span>
  `).join('');

  renderTechInfo(col);
  if (col.organ.includes('Pulmón')) setWindowPreset('lung');
  else setWindowPreset('abdomen');

  drawDemoVisualization(col);
  document.getElementById('overlay-series').textContent = `${col.name} · ${col.phases[0]}`;
}

function renderStructures(col) {
  document.getElementById('structures-list').innerHTML = col.structures.map((s, i) => `
    <div class="structure-item" onclick="selectStructure(this, ${i})" data-index="${i}">
      <div class="structure-name">${s.name}</div>
      <div class="structure-desc">${s.description}</div>
    </div>
  `).join('');
}

function selectStructure(el, index) {
  document.querySelectorAll('.structure-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  if (currentCollection) highlightAnnotation(index);
}

function renderTechInfo(col) {
  document.getElementById('tech-grid').innerHTML = Object.entries(col.technicalInfo).map(([k, v]) => `
    <div class="tech-item">
      <span class="tech-key">${k}</span>
      <span class="tech-val">${v}</span>
    </div>
  `).join('');
}

function drawEmptyViewer() {
  const canvas = document.getElementById('main-canvas');
  const ctx = canvas.getContext('2d');
  const { width: w, height: h } = canvas;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(0,212,255,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h);
  ctx.moveTo(0, h/2); ctx.lineTo(w, h/2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(0,212,255,0.1)';
  ctx.beginPath();
  ctx.arc(w/2, h/2, Math.min(w,h)*0.4, 0, Math.PI*2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(0,212,255,0.4)';
  ctx.font = '14px "Space Mono"';
  ctx.textAlign = 'center';
  ctx.fillText('Selecciona una colección', w/2, h/2 - 10);
  ctx.fillStyle = 'rgba(0,212,255,0.2)';
  ctx.font = '11px "Space Mono"';
  ctx.fillText('o carga un archivo .dcm', w/2, h/2 + 12);
}

function drawDemoVisualization(col) {
  const canvas = document.getElementById('main-canvas');
  const ctx = canvas.getContext('2d');
  const { width: w, height: h } = canvas;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  const sliceRatio = currentSlice / 50;
  if (col.organ.includes('Pulmón')) drawLungCT(ctx, w, h, sliceRatio, col.organ.includes('COVID'));
  else if (col.organ.includes('Páncreas')) drawAbdomenCT(ctx, w, h, sliceRatio, 'pancreas');
  else if (col.organ.includes('Riñón')) drawAbdomenCT(ctx, w, h, sliceRatio, 'kidney');
  else drawGenericCT(ctx, w, h, sliceRatio);
  ctx.strokeStyle = 'rgba(0,212,255,0.15)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h);
  ctx.moveTo(0, h/2); ctx.lineTo(w, h/2);
  ctx.stroke();
  ctx.setLineDash([]);
  if (annotationsVisible) drawAnnotationPins(col);
}

function drawLungCT(ctx, w, h, ratio, isCovid = false) {
  const cx = w/2, cy = h/2;
  const r = Math.min(w,h) * 0.42;
  const bodyGrad = ctx.createRadialGradient(cx, cy, r*0.3, cx, cy, r);
  bodyGrad.addColorStop(0, '#1a1a1a');
  bodyGrad.addColorStop(0.7, '#111');
  bodyGrad.addColorStop(1, '#222');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, r*0.85, r*0.75, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, r*0.85, r*0.75, 0, 0, Math.PI*2);
  ctx.stroke();
  const sliceOffset = (ratio - 0.5) * 0.3;
  drawLungShape(ctx, cx - r*(0.3 + sliceOffset*0.1), cy + r*0.05, r*0.28, r*0.35, -0.1, isCovid);
  drawLungShape(ctx, cx + r*(0.28 + sliceOffset*0.1), cy + r*0.05, r*0.26, r*0.33, 0.1, isCovid);
  drawMediastinum(ctx, cx, cy, r*0.18, ratio);
  drawSpine(ctx, cx, cy + r*0.5, r*0.055);
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.ellipse(cx, cy - r*0.45, r*0.03, r*0.12, 0, 0, Math.PI*2);
  ctx.fill();
  drawRibs(ctx, cx, cy, r, ratio);
}

function drawLungShape(ctx, cx, cy, rx, ry, tilt, isCovid) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  const grad = ctx.createRadialGradient(0, 0, rx*0.1, 0, 0, rx);
  if (isCovid) {
    grad.addColorStop(0, '#1a1a1a'); grad.addColorStop(0.4, '#252520');
    grad.addColorStop(0.7, '#2a2a1a'); grad.addColorStop(1, '#333320');
  } else {
    grad.addColorStop(0, '#0a0a0a'); grad.addColorStop(0.5, '#111'); grad.addColorStop(1, '#1a1a1a');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = 'rgba(200,200,200,0.3)'; ctx.lineWidth = 0.8;
  for (let i = 0; i < 8; i++) {
    const angle = (i/8)*Math.PI*2;
    const len = rx*(0.3 + Math.random()*0.5);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(angle)*len, Math.sin(angle)*len); ctx.stroke();
  }
  ctx.fillStyle = '#1a1a1a'; ctx.strokeStyle = '#666'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(0, ry*0.5, rx*0.15, ry*0.08, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  if (isCovid) {
    ctx.fillStyle = 'rgba(180,180,100,0.15)';
    ctx.beginPath(); ctx.ellipse(rx*0.3, -ry*0.2, rx*0.35, ry*0.25, 0.3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(180,180,100,0.1)';
    ctx.beginPath(); ctx.ellipse(-rx*0.2, ry*0.1, rx*0.2, ry*0.15, -0.2, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();
}

function drawMediastinum(ctx, cx, cy, r, ratio) {
  ctx.fillStyle = '#888'; ctx.beginPath(); ctx.arc(cx-r*0.3, cy-r*0.4, r*0.25, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#777'; ctx.beginPath(); ctx.arc(cx-r*0.1, cy-r*0.6, r*0.2, 0, Math.PI*2); ctx.fill();
  const hg = ctx.createRadialGradient(cx, cy-r*0.1, 0, cx, cy-r*0.1, r*0.8);
  hg.addColorStop(0, '#4a3030'); hg.addColorStop(0.6, '#3a2020'); hg.addColorStop(1, '#2a1a1a');
  ctx.fillStyle = hg;
  ctx.beginPath(); ctx.ellipse(cx, cy-r*0.1, r*0.75, r*0.85, 0.1, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#666'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = 'rgba(150,80,80,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy-r*0.9); ctx.lineTo(cx, cy+r*0.6); ctx.stroke();
  ctx.fillStyle = '#1a1a1a'; ctx.strokeStyle = '#555'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(cx+r*0.05, cy-r*0.75, r*0.12, r*0.1, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
}

function drawSpine(ctx, cx, cy, r) {
  const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  sg.addColorStop(0, '#fff'); sg.addColorStop(0.3, '#ccc'); sg.addColorStop(1, '#999');
  ctx.fillStyle = sg;
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r*0.8, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.ellipse(cx, cy-r*0.9, r*0.5, r*0.4, 0, 0, Math.PI*2); ctx.fill();
}

function drawRibs(ctx, cx, cy, r, ratio) {
  ctx.strokeStyle = 'rgba(200,200,200,0.5)'; ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    const yo = r*(-0.1 + i*0.25 + (ratio-0.5)*0.1);
    const rx2 = r*(0.78+i*0.02), ry2 = r*(0.62+i*0.02);
    ctx.beginPath(); ctx.ellipse(cx, cy+yo, rx2, ry2, 0, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy+yo, rx2*0.98, ry2*0.98, 0, Math.PI*1.15, Math.PI*1.85); ctx.stroke();
  }
}

function drawAbdomenCT(ctx, w, h, ratio, organ) {
  const cx = w/2, cy = h/2;
  const r = Math.min(w,h) * 0.42;
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.ellipse(cx, cy, r*0.9, r*0.82, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = 'rgba(80,60,20,0.3)';
  ctx.beginPath(); ctx.ellipse(cx, cy, r*0.82, r*0.74, 0, 0, Math.PI*2); ctx.fill();
  const lg = ctx.createRadialGradient(cx-r*0.25, cy-r*0.1, 0, cx-r*0.25, cy-r*0.1, r*0.5);
  lg.addColorStop(0, '#5a3a2a'); lg.addColorStop(1, '#3a2018');
  ctx.fillStyle = lg;
  ctx.beginPath(); ctx.ellipse(cx-r*0.22, cy, r*0.42, r*0.32, -0.2, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#6a4030'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#4a2a3a';
  ctx.beginPath(); ctx.ellipse(cx+r*0.42, cy-r*0.05, r*0.18, r*0.22, 0.3, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#5a3a4a'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#cc0000';
  ctx.beginPath(); ctx.ellipse(cx+r*0.08, cy+r*0.22, r*0.05, r*0.055, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#4466aa';
  ctx.beginPath(); ctx.ellipse(cx-r*0.08, cy+r*0.22, r*0.06, r*0.05, 0, 0, Math.PI*2); ctx.fill();
  drawSpine(ctx, cx, cy+r*0.3, r*0.07);
  if (organ === 'pancreas') {
    ctx.fillStyle = 'rgba(200,140,80,0.8)';
    ctx.beginPath();
    ctx.moveTo(cx-r*0.35, cy+r*0.05);
    ctx.quadraticCurveTo(cx, cy-r*0.08, cx+r*0.28, cy+r*0.1);
    ctx.quadraticCurveTo(cx+r*0.3, cy+r*0.18, cx+r*0.1, cy+r*0.18);
    ctx.quadraticCurveTo(cx-r*0.1, cy+r*0.16, cx-r*0.35, cy+r*0.14);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#d4a070'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = 'rgba(255,100,50,0.4)';
    ctx.beginPath(); ctx.ellipse(cx-r*0.2, cy+r*0.1, r*0.1, r*0.07, 0.2, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,100,50,0.8)'; ctx.lineWidth = 1.5; ctx.stroke();
  } else if (organ === 'kidney') {
    drawKidney(ctx, cx-r*0.5, cy-r*0.05, r*0.18, r*0.28, 0.15);
    drawKidney(ctx, cx+r*0.38, cy-r*0.05, r*0.17, r*0.27, -0.15);
  }
}

function drawKidney(ctx, cx, cy, rx, ry, tilt) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt);
  const kg = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
  kg.addColorStop(0, '#8a6a4a'); kg.addColorStop(0.6, '#6a4a2a'); kg.addColorStop(1, '#4a3020');
  ctx.fillStyle = kg;
  ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#9a7a5a'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = 'rgba(200,160,80,0.4)';
  ctx.beginPath(); ctx.ellipse(0, 0, rx*0.5, ry*0.4, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(150,100,50,0.3)'; ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath(); ctx.ellipse(0, 0, rx*(0.5+i*0.15), ry*(0.4+i*0.15), 0, 0, Math.PI*2); ctx.stroke();
  }
  ctx.restore();
}

function drawGenericCT(ctx, w, h, ratio) {
  const cx = w/2, cy = h/2, r = Math.min(w,h)*0.4;
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r*0.9, 0, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 5; i++) {
    const angle = (i/5)*Math.PI*2;
    ctx.fillStyle = `rgba(100,80,60,${0.3+i*0.1})`;
    ctx.beginPath();
    ctx.ellipse(cx+Math.cos(angle)*r*0.4, cy+Math.sin(angle)*r*0.4, r*0.12, r*0.1, angle, 0, Math.PI*2);
    ctx.fill();
  }
}

function drawAnnotationPins(col) {
  const overlay = document.getElementById('annotations-overlay');
  overlay.innerHTML = '';
  if (!col || !col.structures) return;
  const canvas = document.getElementById('main-canvas');
  const container = document.getElementById('viewer-canvas-container');
  const canvasRect = canvas.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const offsetX = canvasRect.left - containerRect.left;
  const offsetY = canvasRect.top - containerRect.top;
  const positions = getAnnotationPositions(col, canvas.width, canvas.height);
  col.structures.slice(0, 6).forEach((struct, i) => {
    if (!positions[i]) return;
    const [px, py] = positions[i];
    const pin = document.createElement('div');
    pin.className = 'annotation-pin';
    pin.style.left = (offsetX + px) + 'px';
    pin.style.top = (offsetY + py) + 'px';
    pin.innerHTML = `<div class="annotation-dot"></div><div class="annotation-label">${struct.name}</div>`;
    pin.addEventListener('click', () => {
      const items = document.querySelectorAll('.structure-item');
      items.forEach(el => el.classList.remove('active'));
      items[i]?.classList.add('active');
      items[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    overlay.appendChild(pin);
  });
}

function getAnnotationPositions(col, w, h) {
  const cx = w/2, cy = h/2, r = Math.min(w,h)*0.4;
  if (col.organ.includes('Pulmón')) return [
    [cx-r*0.32, cy], [cx-r*0.28, cy-r*0.3], [cx, cy-r*0.1],
    [cx-r*0.7, cy+r*0.1], [cx, cy-r*0.15], [cx-r*0.7, cy-r*0.55],
  ];
  if (col.organ.includes('Páncreas')) return [
    [cx-r*0.2, cy+r*0.08], [cx+r*0.05, cy+r*0.1], [cx+r*0.22, cy+r*0.12],
    [cx, cy-r*0.12], [cx+r*0.08, cy+r*0.22], [cx+r*0.08, cy+r*0.22],
  ];
  if (col.organ.includes('Riñón')) return [
    [cx-r*0.5, cy-r*0.05], [cx-r*0.48, cy+r*0.08], [cx, cy-r*0.08],
    [cx, cy+r*0.25], [cx, cy-r*0.5], [cx-r*0.62, cy],
  ];
  return [
    [cx, cy-r*0.3], [cx+r*0.3, cy], [cx, cy+r*0.3],
    [cx-r*0.3, cy], [cx+r*0.2, cy-r*0.2], [cx-r*0.2, cy+r*0.2],
  ];
}

function highlightAnnotation(index) {
  document.querySelectorAll('.annotation-pin').forEach((pin, i) => {
    const dot = pin.querySelector('.annotation-dot');
    dot.style.background = i === index ? '#ff6b35' : 'var(--accent)';
    dot.style.boxShadow = i === index ? '0 0 15px #ff6b35' : '0 0 10px var(--accent)';
    dot.style.transform = i === index ? 'scale(1.8)' : 'scale(1)';
  });
}
