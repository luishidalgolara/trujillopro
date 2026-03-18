/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   main.js  |  v1.0
   Lógica principal: navegación, previews animados, partículas
   ============================================================ */

'use strict';

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initParticles();
    initCardNavigation();
    initPreviewCanvases();
    initKeyboardNav();
});

/* ══════════════════════════════════════════════════════════
   1. BACKGROUND CANVAS — Grid animado + partículas flotantes
   ══════════════════════════════════════════════════════════ */
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, frame = 0;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Floating structural nodes
    const nodes = Array.from({ length: 18 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
        ctx.clearRect(0, 0, W, H);
        frame++;

        // Slow pulsing gradient bg
        const t = frame * 0.003;
        const grd = ctx.createRadialGradient(
            W * 0.3 + Math.sin(t) * 80, H * 0.4 + Math.cos(t * 0.7) * 60, 0,
            W * 0.5, H * 0.5, Math.max(W, H) * 0.8
        );
        grd.addColorStop(0, 'rgba(0,119,255,0.04)');
        grd.addColorStop(0.5, 'rgba(0,229,255,0.02)');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        // Move + draw nodes
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,229,255,${n.alpha})`;
            ctx.fill();
        });

        // Connect nearby nodes with lines (structural feel)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const alpha = (1 - dist / 180) * 0.06;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}

/* ══════════════════════════════════════════════════════════
   2. PARTICLES — Partículas flotantes decorativas
   ══════════════════════════════════════════════════════════ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 18;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const dur  = Math.random() * 12 + 8;
        const delay = Math.random() * 10;
        const color = Math.random() > 0.5 ? '0,229,255' : '0,119,255';
        p.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(${color},0.7);
            animation-duration: ${dur}s;
            animation-delay: ${delay}s;
        `;
        container.appendChild(p);
    }
}

/* ══════════════════════════════════════════════════════════
   3. CARD NAVIGATION — Click → transición → página destino
   ══════════════════════════════════════════════════════════ */
function initCardNavigation() {
    const cards   = document.querySelectorAll('.dcard');
    const overlay = document.getElementById('transOverlay');
    const trName  = document.getElementById('trName');
    const trTxt   = document.getElementById('trTxt');
    const trIcon  = document.getElementById('trIcon');

    const iconMap = {
        momento:      '📈',
        cortante:     '⚡',
        axial:        '↕️',
        cargas:       '⬇️',
        deformacion:  '〰️',
        interaccion:  '🔄',
        cuerpo_libre: '🔲',
        camino:       '🏗️',
    };

    const nameMap = {
        momento:      'Momento Flector',
        cortante:     'Fuerza Cortante',
        axial:        'Fuerza Axial',
        cargas:       'Diagramas de Carga',
        deformacion:  'Deformaciones',
        interaccion:  'Interacción M-N',
        cuerpo_libre: 'Cuerpo Libre',
        camino:       'Camino de Cargas',
    };

    const txtMap = {
        momento:      'Calculando diagrama de momento flector...',
        cortante:     'Calculando diagrama de fuerza cortante...',
        axial:        'Calculando diagrama de fuerza axial...',
        cargas:       'Inicializando tipos de carga...',
        deformacion:  'Calculando flecha y línea elástica...',
        interaccion:  'Construyendo curva de interacción M-N...',
        cuerpo_libre: 'Aislando elemento estructural...',
        camino:       'Trazando camino de cargas...',
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id   = card.dataset.id;
            const page = card.dataset.page;
            if (!page) return;

            // Update overlay content
            if (trIcon) trIcon.textContent = iconMap[id] || '📐';
            if (trName) trName.textContent = nameMap[id] || 'Cargando...';
            if (trTxt)  trTxt.textContent  = txtMap[id]  || 'Inicializando módulo...';

            // Activate overlay
            overlay.classList.add('active');

            // Navigate after animation
            setTimeout(() => {
                window.location.href = page;
            }, 1400);
        });

        // Hover sound-like feedback via subtle border flash
        card.addEventListener('mouseenter', () => {
            card.style.setProperty('--hover-scale', '1');
        });
    });
}

/* ══════════════════════════════════════════════════════════
   4. PREVIEW CANVASES — Mini diagramas animados en cada card
   ══════════════════════════════════════════════════════════ */
function initPreviewCanvases() {
    // Small delay so layout is settled
    setTimeout(() => {
        drawMomentoPreview();
        drawCortantePreview();
        drawAxialPreview();
        drawCargasPreview();
        drawDeformPreview();
        drawInteraccionPreview();
        drawDCLPreview();
        drawCaminoPreview();
    }, 100);
}

/* ── Helpers compartidos ── */
function getCtx(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    // Set actual pixel dimensions from element size
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0) {
        canvas.width  = rect.width  * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
    }
    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    return { ctx, w: canvas.width / window.devicePixelRatio, h: canvas.height / window.devicePixelRatio };
}

function clearCanvas(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
}

function drawAxis(ctx, x0, y0, x1, y1, color = 'rgba(255,255,255,0.15)') {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
}

/* ── 4.1 MOMENTO FLECTOR preview — parábola rellena ── */
function drawMomentoPreview() {
    const r = getCtx('prev_momento');
    if (!r) return;
    const { ctx, w, h } = r;
    const pad = 20, baseline = h * 0.55;
    const L = w - pad * 2;

    // Baseline
    drawAxis(ctx, pad, baseline, w - pad, baseline);

    // Parabolic moment diagram (simplemente apoyada con carga uniforme)
    const pts = [];
    const n = 80;
    for (let i = 0; i <= n; i++) {
        const x = pad + (i / n) * L;
        const xi = i / n; // 0..1
        const M = 4 * xi * (1 - xi); // parabola normalizada 0..1
        const y = baseline - M * (h * 0.38);
        pts.push({ x, y });
    }

    // Fill
    ctx.beginPath();
    ctx.moveTo(pad, baseline);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(w - pad, baseline);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, baseline - h * 0.38, 0, baseline);
    grad.addColorStop(0, 'rgba(255,71,87,0.55)');
    grad.addColorStop(1, 'rgba(255,71,87,0.05)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Stroke
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = 'rgba(255,71,87,0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Max label
    ctx.fillStyle = 'rgba(255,71,87,0.9)';
    ctx.font = 'bold 10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('M_max', w / 2, baseline - h * 0.38 - 4);

    // Support triangles
    drawSupport(ctx, pad, baseline, 'pin');
    drawSupport(ctx, w - pad, baseline, 'roller');
}

/* ── 4.2 FUERZA CORTANTE preview — escalón ── */
function drawCortantePreview() {
    const r = getCtx('prev_cortante');
    if (!r) return;
    const { ctx, w, h } = r;
    const pad = 20, baseline = h * 0.5;
    const L = w - pad * 2;
    const Vmax = h * 0.32;

    drawAxis(ctx, pad, baseline, w - pad, baseline);

    // Shear diagram: rectangular (carga puntual central)
    const mid = pad + L / 2;

    // Left side (positive)
    ctx.beginPath();
    ctx.moveTo(pad, baseline);
    ctx.lineTo(pad, baseline - Vmax);
    ctx.lineTo(mid, baseline - Vmax);
    ctx.lineTo(mid, baseline);
    ctx.closePath();
    const g1 = ctx.createLinearGradient(0, baseline - Vmax, 0, baseline);
    g1.addColorStop(0, 'rgba(0,119,255,0.55)');
    g1.addColorStop(1, 'rgba(0,119,255,0.05)');
    ctx.fillStyle = g1;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,119,255,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, baseline - Vmax);
    ctx.lineTo(mid, baseline - Vmax);
    ctx.stroke();

    // Right side (negative)
    ctx.beginPath();
    ctx.moveTo(mid, baseline);
    ctx.lineTo(mid, baseline + Vmax);
    ctx.lineTo(w - pad, baseline + Vmax);
    ctx.lineTo(w - pad, baseline);
    ctx.closePath();
    const g2 = ctx.createLinearGradient(0, baseline, 0, baseline + Vmax);
    g2.addColorStop(0, 'rgba(0,119,255,0.05)');
    g2.addColorStop(1, 'rgba(0,119,255,0.55)');
    ctx.fillStyle = g2;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,119,255,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mid, baseline + Vmax);
    ctx.lineTo(w - pad, baseline + Vmax);
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(0,119,255,0.9)';
    ctx.font = 'bold 10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('+V', pad + L / 4, baseline - Vmax + 12);
    ctx.fillText('−V', pad + 3 * L / 4, baseline + Vmax - 4);
}

/* ── 4.3 FUERZA AXIAL preview — barras coloreadas ── */
function drawAxialPreview() {
    const r = getCtx('prev_axial');
    if (!r) return;
    const { ctx, w, h } = r;
    const pad = 20, baseline = h / 2;
    const L = w - pad * 2;

    drawAxis(ctx, pad, baseline, w - pad, baseline);

    // Compression zone (left 60%)
    const compEnd = pad + L * 0.6;
    const Nc = h * 0.28;

    ctx.beginPath();
    ctx.rect(pad, baseline - Nc, L * 0.6, Nc);
    const gc = ctx.createLinearGradient(pad, 0, compEnd, 0);
    gc.addColorStop(0, 'rgba(0,255,157,0.05)');
    gc.addColorStop(1, 'rgba(0,255,157,0.45)');
    ctx.fillStyle = gc;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,255,157,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, baseline - Nc);
    ctx.lineTo(compEnd, baseline - Nc);
    ctx.stroke();

    // Tension zone (right 40%)
    const Nt = h * 0.18;
    ctx.beginPath();
    ctx.rect(compEnd, baseline, L * 0.4, Nt);
    const gt = ctx.createLinearGradient(compEnd, 0, w - pad, 0);
    gt.addColorStop(0, 'rgba(255,71,87,0.45)');
    gt.addColorStop(1, 'rgba(255,71,87,0.05)');
    ctx.fillStyle = gt;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,71,87,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(compEnd, baseline + Nt);
    ctx.lineTo(w - pad, baseline + Nt);
    ctx.stroke();

    ctx.font = 'bold 9px Space Mono, monospace';
    ctx.fillStyle = 'rgba(0,255,157,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('COMP.', pad + L * 0.3, baseline - Nc + 12);
    ctx.fillStyle = 'rgba(255,71,87,0.9)';
    ctx.fillText('TRAC.', compEnd + L * 0.2, baseline + Nt - 4);
}

/* ── 4.4 CARGAS preview — flechas de carga ── */
function drawCargasPreview() {
    const r = getCtx('prev_cargas');
    if (!r) return;
    const { ctx, w, h } = r;
    const pad = 16, beamY = h * 0.72;

    // Beam
    ctx.beginPath();
    ctx.rect(pad, beamY, w - pad * 2, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const L = w - pad * 2;
    const arrowColor = 'rgba(255,140,0,0.9)';
    const nArrows = 7;

    for (let i = 0; i < nArrows; i++) {
        const x = pad + (i / (nArrows - 1)) * L;
        const arrowH = 28;
        drawArrowDown(ctx, x, beamY - arrowH, x, beamY - 2, arrowColor);
    }

    // Top line connecting arrow bases
    ctx.beginPath();
    ctx.moveTo(pad, beamY - 28);
    ctx.lineTo(w - pad, beamY - 28);
    ctx.strokeStyle = arrowColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = arrowColor;
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('q (kN/m)', w / 2, beamY - 36);
}

/* ── 4.5 DEFORMACIÓN preview — curva elástica ── */
function drawDeformPreview() {
    const r = getCtx('prev_deform');
    if (!r) return;
    const { ctx, w, h } = r;
    const pad = 20, baseline = h * 0.35;
    const L = w - pad * 2;

    // Original beam line (dashed)
    ctx.beginPath();
    ctx.moveTo(pad, baseline);
    ctx.lineTo(w - pad, baseline);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Elastic curve (deformed)
    const maxDefl = h * 0.38;
    const pts = [];
    const n = 80;
    for (let i = 0; i <= n; i++) {
        const xi = i / n;
        const x = pad + xi * L;
        const defl = 16 * maxDefl * xi * xi * (1 - xi) * (1 - xi); // beam deflection shape
        pts.push({ x, y: baseline + defl });
    }

    // Fill
    ctx.beginPath();
    ctx.moveTo(pad, baseline);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(w - pad, baseline);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, baseline, 0, baseline + maxDefl);
    g.addColorStop(0, 'rgba(192,132,252,0.05)');
    g.addColorStop(1, 'rgba(192,132,252,0.4)');
    ctx.fillStyle = g;
    ctx.fill();

    // Stroke
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = 'rgba(192,132,252,0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrow showing max deflection
    const midX = pad + L / 2;
    const midY = baseline + maxDefl;
    ctx.beginPath();
    ctx.moveTo(midX, baseline + 4);
    ctx.lineTo(midX, midY - 4);
    ctx.strokeStyle = 'rgba(192,132,252,0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(192,132,252,0.9)';
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('δ_max', midX + 18, midY - 2);
}

/* ── 4.6 INTERACCIÓN M-N preview ── */
function drawInteraccionPreview() {
    const r = getCtx('prev_interac');
    if (!r) return;
    const { ctx, w, h } = r;
    const cx = w * 0.35, cy = h * 0.5;
    const rx = w * 0.28, ry = h * 0.4;

    // Axes
    ctx.beginPath();
    ctx.moveTo(cx - rx * 0.1, cy + ry);
    ctx.lineTo(cx - rx * 0.1, cy - ry * 1.1);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - rx * 0.2, cy);
    ctx.lineTo(cx + rx * 1.1, cy);
    ctx.stroke();

    // Interaction curve
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const t = (i / 100) * Math.PI;
        // Kidney-shaped interaction curve
        const M = rx * Math.sin(t) * (1 + 0.3 * Math.sin(t));
        const N = ry * Math.cos(t) * 0.85;
        if (i === 0) ctx.moveTo(cx + M, cy - N);
        else ctx.lineTo(cx + M, cy - N);
    }
    ctx.strokeStyle = 'rgba(255,71,87,0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill inside curve
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
        const t = (i / 100) * Math.PI;
        const M = rx * Math.sin(t) * (1 + 0.3 * Math.sin(t));
        const N = ry * Math.cos(t) * 0.85;
        if (i === 0) ctx.moveTo(cx + M, cy - N);
        else ctx.lineTo(cx + M, cy - N);
    }
    ctx.closePath();
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
    g.addColorStop(0, 'rgba(255,71,87,0.15)');
    g.addColorStop(1, 'rgba(255,71,87,0.02)');
    ctx.fillStyle = g;
    ctx.fill();

    // Sample point inside
    ctx.beginPath();
    ctx.arc(cx + rx * 0.5, cy - ry * 0.25, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,157,0.9)';
    ctx.fill();

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('M', cx + rx * 1.05, cy + 10);
    ctx.textAlign = 'right';
    ctx.fillText('N', cx - rx * 0.05, cy - ry * 1.05);
}

/* ── 4.7 CUERPO LIBRE preview ── */
function drawDCLPreview() {
    const r = getCtx('prev_dcl');
    if (!r) return;
    const { ctx, w, h } = r;

    const bx = w * 0.25, by = h * 0.3, bw = w * 0.5, bh = h * 0.35;

    // Beam rectangle
    ctx.beginPath();
    ctx.rect(bx, by, bw, bh);
    ctx.strokeStyle = 'rgba(0,229,255,0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,229,255,0.06)';
    ctx.fill();

    // Forces
    const midY = by + bh / 2;
    // Left reaction
    drawArrowRight(ctx, bx - 28, midY, bx - 2, midY, 'rgba(0,255,157,0.9)');
    ctx.fillStyle = 'rgba(0,255,157,0.9)';
    ctx.font = 'bold 9px Space Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText('RA', bx - 32, midY - 4);

    // Right reaction
    drawArrowLeft(ctx, bx + bw + 28, midY, bx + bw + 2, midY, 'rgba(0,255,157,0.9)');
    ctx.textAlign = 'left';
    ctx.fillText('RB', bx + bw + 32, midY - 4);

    // Top load
    drawArrowDown(ctx, w / 2, by - 28, w / 2, by - 2, 'rgba(255,140,0,0.9)');
    ctx.fillStyle = 'rgba(255,140,0,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('P', w / 2, by - 32);

    // Bottom distributed
    ctx.fillStyle = 'rgba(192,132,252,0.7)';
    ctx.font = '8px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('q·L (peso propio)', w / 2, by + bh + 14);
}

/* ── 4.8 CAMINO DE CARGAS preview ── */
function drawCaminoPreview() {
    const r = getCtx('prev_camino');
    if (!r) return;
    const { ctx, w, h } = r;

    const levels = [
        { label: 'LOSA',        color: 'rgba(0,229,255,0.8)',  y: h * 0.12, height: 10 },
        { label: 'VIGA',        color: 'rgba(0,119,255,0.8)',  y: h * 0.38, height: 10 },
        { label: 'PILAR',       color: 'rgba(255,140,0,0.8)', y: h * 0.62, height: 10 },
        { label: 'FUNDACIÓN',   color: 'rgba(0,255,157,0.8)',  y: h * 0.85, height: 10 },
    ];

    const cx = w / 2;
    const bw = w * 0.55;

    levels.forEach((lv, i) => {
        // Bar
        ctx.beginPath();
        ctx.rect(cx - bw / 2, lv.y, bw, lv.height);
        ctx.fillStyle = lv.color.replace('0.8', '0.15');
        ctx.fill();
        ctx.strokeStyle = lv.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.fillStyle = lv.color;
        ctx.font = 'bold 8px Space Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(lv.label, cx + bw / 2 + 6, lv.y + lv.height / 2 + 3);

        // Arrow down to next
        if (i < levels.length - 1) {
            const nextY = levels[i + 1].y;
            const arrowY1 = lv.y + lv.height + 2;
            const arrowY2 = nextY - 2;
            ctx.beginPath();
            ctx.moveTo(cx, arrowY1);
            ctx.lineTo(cx, arrowY2);
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Arrowhead
            ctx.beginPath();
            ctx.moveTo(cx - 5, arrowY2 - 6);
            ctx.lineTo(cx, arrowY2);
            ctx.lineTo(cx + 5, arrowY2 - 6);
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
}

/* ══════════════════════════════════════════════════════════
   5. DRAWING HELPERS
   ══════════════════════════════════════════════════════════ */

function drawArrowDown(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(x2 - 4, y2 - 7);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 + 4, y2 - 7);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function drawArrowRight(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2 - 7, y2 - 4);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - 7, y2 + 4);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function drawArrowLeft(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2 + 7, y2 - 4);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 + 7, y2 + 4);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function drawSupport(ctx, x, y, type) {
    const size = 8;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.fillStyle   = 'rgba(255,255,255,0.08)';
    ctx.lineWidth   = 1;

    if (type === 'pin') {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y + size * 1.4);
        ctx.lineTo(x + size, y + size * 1.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y + size * 1.4);
        ctx.lineTo(x + size, y + size * 1.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Roller circle
        ctx.beginPath();
        ctx.arc(x, y + size * 1.4 + 5, 4, 0, Math.PI * 2);
        ctx.stroke();
    }
}

/* ══════════════════════════════════════════════════════════
   6. KEYBOARD NAVIGATION
   ══════════════════════════════════════════════════════════ */
function initKeyboardNav() {
    const cards = Array.from(document.querySelectorAll('.dcard'));
    let focused = -1;

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            focused = (focused + 1) % cards.length;
            cards[focused].focus();
            cards[focused].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            focused = (focused - 1 + cards.length) % cards.length;
            cards[focused].focus();
            cards[focused].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (e.key === 'Enter' && focused >= 0) {
            cards[focused].click();
        }
        if (e.key === 'Escape') {
            window.location.href = '../index.html';
        }
    });

    cards.forEach((card, i) => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('focus', () => { focused = i; });
    });
}