/**
 * ═══════════════════════════════════════════════════
 *  HEART LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Etiquetas numeradas flotantes sobre el modelo 3D
 *  del corazón humano, con líneas guía hacia cada
 *  estructura anatómica.
 *
 *  Requiere: window.__HEART3D (scene, camera, renderer)
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__HEART3D && window.__HEART3D.scene && window.__HEART3D.camera) {
                return resolve(window.__HEART3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  CONFIGURACIÓN DE ETIQUETAS
//
//  Modelo corazón centrado en origen, escala ~3.2
//  Aprox: base (vasos) Y≈+1.2  ápex Y≈-1.4
//  Ancho ≈ X±1.0   Profundidad Z≈±0.8
//  Vista frontal: Z positivo
//
//  anchor = punto SOBRE la superficie del corazón
//  offset = punto FUERA donde flota el número
// ══════════════════════════════════════════════════
const LABELS_CONFIG = [
    // ═══ LADO DERECHO DE PANTALLA (1-6) ═══
    {
        id: 'aorta',
        num: 1,
        name: 'Aorta',
        anchor: new THREE.Vector3(0.15, 1.15, 0.25),
        offset: new THREE.Vector3(-1.7, 1.6, 0.3),
        color: '#ee5555',
        side: 'left'
    },
    {
        id: 'pulmonary',
        num: 2,
        name: 'Arteria Pulmonar',
        anchor: new THREE.Vector3(-0.35, 0.95, 0.50),
        offset: new THREE.Vector3(-1.8, 1.05, 0.5),
        color: '#5577cc',
        side: 'left'
    },
    {
        id: 'la',
        num: 3,
        name: 'Aurícula Izquierda',
        anchor: new THREE.Vector3(-0.55, 0.55, -0.30),
        offset: new THREE.Vector3(-1.8, 0.50, -0.3),
        color: '#cc4444',
        side: 'left'
    },
    {
        id: 'lv',
        num: 4,
        name: 'Ventrículo Izquierdo',
        anchor: new THREE.Vector3(-0.45, -0.30, 0.50),
        offset: new THREE.Vector3(-1.8, -0.10, 0.5),
        color: '#bb3333',
        side: 'left'
    },
    {
        id: 'coronary',
        num: 5,
        name: 'Arterias Coronarias',
        anchor: new THREE.Vector3(-0.15, -0.05, 0.70),
        offset: new THREE.Vector3(-1.7, -0.65, 0.6),
        color: '#ee7755',
        side: 'left'
    },
    {
        id: 'valves',
        num: 6,
        name: 'Válvulas Cardíacas',
        anchor: new THREE.Vector3(0.0, 0.50, 0.20),
        offset: new THREE.Vector3(-1.6, -1.20, 0.3),
        color: '#ddaa88',
        side: 'left'
    },
    // ═══ LADO IZQUIERDO DE PANTALLA (7-11) ═══
    {
        id: 'vena_cava',
        num: 7,
        name: 'Venas Cavas',
        anchor: new THREE.Vector3(0.40, 1.00, -0.15),
        offset: new THREE.Vector3(1.8, 1.50, -0.1),
        color: '#4466aa',
        side: 'right'
    },
    {
        id: 'ra',
        num: 8,
        name: 'Aurícula Derecha',
        anchor: new THREE.Vector3(0.60, 0.45, 0.35),
        offset: new THREE.Vector3(1.8, 0.65, 0.3),
        color: '#6688bb',
        side: 'right'
    },
    {
        id: 'rv',
        num: 9,
        name: 'Ventrículo Derecho',
        anchor: new THREE.Vector3(0.50, -0.30, 0.55),
        offset: new THREE.Vector3(1.8, -0.05, 0.5),
        color: '#5577aa',
        side: 'right'
    },
    {
        id: 'conduction',
        num: 10,
        name: 'Sist. de Conducción',
        anchor: new THREE.Vector3(0.30, 0.30, 0.00),
        offset: new THREE.Vector3(1.8, -0.60, 0.0),
        color: '#eedd55',
        side: 'right'
    },
    {
        id: 'all',
        num: 11,
        name: 'Ápex del Corazón',
        anchor: new THREE.Vector3(0.0, -1.20, 0.30),
        offset: new THREE.Vector3(1.6, -1.30, 0.3),
        color: '#cc5555',
        side: 'right'
    }
];

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(engine => {
    const { scene, camera, renderer } = engine;

    // ── Contenedor overlay ──
    const overlay = document.createElement('div');
    overlay.id = 'labelsOverlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '52px',
        left: '0',
        width: '100%',
        height: 'calc(100vh - 52px)',
        pointerEvents: 'none',
        zIndex: '40',
        overflow: 'hidden'
    });
    document.body.appendChild(overlay);

    // ── SVG para líneas guía ──
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    Object.assign(svg.style, {
        position: 'absolute',
        top: '0', left: '0',
        width: '100%', height: '100%',
        pointerEvents: 'none'
    });
    overlay.appendChild(svg);

    // ── CSS ──
    const style = document.createElement('style');
    style.textContent = `
        .hrt-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .hrt-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .hrt-label-num {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Space Mono', monospace;
            font-size: 0.65rem;
            font-weight: 700;
            color: #fff;
            border: 2px solid rgba(255,255,255,0.25);
            backdrop-filter: blur(8px);
            box-shadow: 0 0 10px var(--lbl-glow), 0 2px 8px rgba(0,0,0,0.5);
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .hrt-label:hover .hrt-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 18px var(--lbl-glow), 0 0 36px var(--lbl-glow);
        }
        .hrt-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lbl-color);
            opacity: 0;
            animation: hrtPulse 2.5s ease-in-out infinite;
        }
        @keyframes hrtPulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.4); }
        }
        .hrt-label-tag {
            position: absolute;
            top: 50%;
            background: rgba(14, 12, 24, 0.92);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 6px;
            padding: 3px 9px;
            white-space: nowrap;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.65rem;
            font-weight: 500;
            color: #e8ecf4;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease;
            box-shadow: 0 4px 14px rgba(0,0,0,0.4);
        }
        .hrt-label.side-right .hrt-label-tag {
            left: 34px; right: auto;
            transform: translateY(-50%) translateX(-6px);
        }
        .hrt-label.side-right:hover .hrt-label-tag,
        .hrt-label.side-right.active-label .hrt-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .hrt-label.side-left .hrt-label-tag {
            right: 34px; left: auto;
            transform: translateY(-50%) translateX(6px);
        }
        .hrt-label.side-left:hover .hrt-label-tag,
        .hrt-label.side-left.active-label .hrt-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .hrt-label.active-label .hrt-label-num {
            transform: scale(1.15);
            border-color: rgba(255,255,255,0.75);
            box-shadow: 0 0 16px var(--lbl-glow), 0 0 32px var(--lbl-glow);
        }
    `;
    document.head.appendChild(style);

    // ══════════════════════════════════════════════
    //  CREAR ELEMENTOS
    // ══════════════════════════════════════════════
    const labels = [];

    LABELS_CONFIG.forEach(cfg => {
        const el = document.createElement('div');
        el.className = `hrt-label side-${cfg.side}`;
        el.dataset.part = cfg.id;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-glow', cfg.color + '55');

        el.innerHTML = `
            <div class="hrt-label-num" style="background:${cfg.color}20; border-color:${cfg.color}50;">
                ${cfg.num}
            </div>
            <div class="hrt-label-tag">
                <span style="color:${cfg.color};font-weight:700;margin-right:4px;">${cfg.num}</span>
                ${cfg.name}
            </div>
        `;
        overlay.appendChild(el);

        // ── Línea SVG ──
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', cfg.color);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-opacity', '0.4');
        line.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(line);

        // ── Punto de anclaje ──
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '0.85');
        svg.appendChild(dot);

        // ── Anillo ──
        const ring = document.createElementNS(svgNS, 'circle');
        ring.setAttribute('r', '6');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', cfg.color);
        ring.setAttribute('stroke-width', '0.8');
        ring.setAttribute('stroke-opacity', '0.3');
        svg.appendChild(ring);

        // ── Click ──
        el.addEventListener('click', () => {
            const btn = document.querySelector(`.hl-btn[data-part="${cfg.id}"]`);
            if (btn) btn.click();
            labels.forEach(l => l.el.classList.remove('active-label'));
            el.classList.add('active-label');
        });

        labels.push({
            el, line, dot, ring,
            anchor3D: cfg.anchor.clone(),
            offset3D: cfg.offset.clone(),
            id: cfg.id
        });
    });

    // ══════════════════════════════════════════════
    //  SINCRONIZAR CON PANEL LATERAL
    // ══════════════════════════════════════════════
    document.querySelectorAll('.hl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const part = btn.dataset.part;
            labels.forEach(l => {
                if (part === 'all') l.el.classList.remove('active-label');
                else l.el.classList.toggle('active-label', l.id === part);
            });
        });
    });

    // ══════════════════════════════════════════════
    //  BOTÓN TOGGLE (usa el #bLbl del HTML)
    // ══════════════════════════════════════════════
    let labelsVisible = true;
    const toggleBtn = document.getElementById('bLbl');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            labelsVisible = !labelsVisible;
            toggleBtn.classList.toggle('lbl-active', labelsVisible);
            overlay.style.opacity = labelsVisible ? '1' : '0';
            overlay.style.transition = 'opacity 0.35s ease';
        });
    }

    // ══════════════════════════════════════════════
    //  PROYECCIÓN 3D → 2D
    // ══════════════════════════════════════════════
    const tempVec = new THREE.Vector3();
    const anchorVec = new THREE.Vector3();

    function updateLabels() {
        requestAnimationFrame(updateLabels);
        if (!labelsVisible) return;

        const w = window.innerWidth;
        const h = window.innerHeight - 52;

        labels.forEach(lbl => {
            tempVec.copy(lbl.offset3D);
            tempVec.project(camera);
            const nx = (tempVec.x * 0.5 + 0.5) * w;
            const ny = (-tempVec.y * 0.5 + 0.5) * h;

            anchorVec.copy(lbl.anchor3D);
            anchorVec.project(camera);
            const ax = (anchorVec.x * 0.5 + 0.5) * w;
            const ay = (-anchorVec.y * 0.5 + 0.5) * h;

            const behind = tempVec.z > 1 || anchorVec.z > 1;

            if (behind) {
                lbl.el.classList.add('hidden-label');
                lbl.line.setAttribute('stroke-opacity', '0');
                lbl.dot.setAttribute('fill-opacity', '0');
                lbl.ring.setAttribute('stroke-opacity', '0');
            } else {
                lbl.el.classList.remove('hidden-label');
                lbl.line.setAttribute('stroke-opacity', '0.4');
                lbl.dot.setAttribute('fill-opacity', '0.85');
                lbl.ring.setAttribute('stroke-opacity', '0.3');
            }

            lbl.el.style.left = nx + 'px';
            lbl.el.style.top = ny + 'px';

            lbl.line.setAttribute('x1', ax);
            lbl.line.setAttribute('y1', ay);
            lbl.line.setAttribute('x2', nx);
            lbl.line.setAttribute('y2', ny);

            lbl.dot.setAttribute('cx', ax);
            lbl.dot.setAttribute('cy', ay);
            lbl.ring.setAttribute('cx', ax);
            lbl.ring.setAttribute('cy', ay);
        });
    }

    updateLabels();
    console.log('✅ Heart Labels: 11 etiquetas anatómicas cargadas');

}).catch(err => {
    console.warn('⚠️ Heart Labels:', err);
});
