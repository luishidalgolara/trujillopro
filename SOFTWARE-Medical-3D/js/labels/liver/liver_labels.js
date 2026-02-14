/**
 * ═══════════════════════════════════════════════════
 *  LIVER LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Etiquetas numeradas flotantes sobre el modelo 3D
 *  del hígado humano.
 *
 *  Requiere: window.__LIVER3D (scene, camera, renderer)
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__LIVER3D && window.__LIVER3D.scene && window.__LIVER3D.camera) {
                return resolve(window.__LIVER3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  CONFIGURACIÓN DE ETIQUETAS
//
//  Modelo hígado centrado en origen, escala ~3.5
//  Lóbulo derecho: mayor volumen, lado +X
//  Lóbulo izquierdo: menor, lado -X
//  Cara visceral: posterior/inferior
//  Vesícula: cara visceral inferior-derecha
//  ctrl.target = (0, 0, 0)
// ══════════════════════════════════════════════════
const LABELS_CONFIG = [
    {
        id: 'right_lobe',
        num: 1,
        name: 'Lóbulo Derecho',
        sub: 'Segmentos V, VI, VII, VIII',
        anchor: new THREE.Vector3(0.7, 0.1, 0.3),
        offset: new THREE.Vector3(2.0, 0.6, 0.3),
        color: '#b06848',
        side: 'right'
    },
    {
        id: 'left_lobe',
        num: 2,
        name: 'Lóbulo Izquierdo',
        sub: 'Segmentos II, III',
        anchor: new THREE.Vector3(-0.7, 0.1, 0.3),
        offset: new THREE.Vector3(-2.0, 0.6, 0.3),
        color: '#c07858',
        side: 'left'
    },
    {
        id: 'caudate',
        num: 3,
        name: 'Lóbulo Caudado',
        sub: 'Segmento I — Posterior',
        anchor: new THREE.Vector3(0.15, 0.2, -0.6),
        offset: new THREE.Vector3(-1.9, 0.9, -0.6),
        color: '#986048',
        side: 'left'
    },
    {
        id: 'quadrate',
        num: 4,
        name: 'Lóbulo Cuadrado',
        sub: 'Segmento IV — Cara Visceral',
        anchor: new THREE.Vector3(-0.15, -0.3, 0.1),
        offset: new THREE.Vector3(-2.0, -0.6, 0.1),
        color: '#a06850',
        side: 'left'
    },
    {
        id: 'portal',
        num: 5,
        name: 'Vena Porta',
        sub: 'Circulación Portal Hepática',
        anchor: new THREE.Vector3(0.0, -0.2, -0.2),
        offset: new THREE.Vector3(1.9, -0.8, -0.2),
        color: '#5577aa',
        side: 'right'
    },
    {
        id: 'hepatic_a',
        num: 6,
        name: 'Arteria Hepática',
        sub: 'Irrigación Arterial',
        anchor: new THREE.Vector3(-0.1, -0.25, -0.1),
        offset: new THREE.Vector3(-2.0, -1.0, -0.1),
        color: '#cc4444',
        side: 'left'
    },
    {
        id: 'hepatic_v',
        num: 7,
        name: 'Venas Hepáticas',
        sub: 'Drenaje → VCI',
        anchor: new THREE.Vector3(0.0, 0.5, -0.4),
        offset: new THREE.Vector3(1.9, 1.1, -0.4),
        color: '#4466aa',
        side: 'right'
    },
    {
        id: 'biliary',
        num: 8,
        name: 'Vías Biliares',
        sub: 'Sistema Biliar Intrahepático',
        anchor: new THREE.Vector3(0.2, -0.1, -0.3),
        offset: new THREE.Vector3(2.0, 0.0, -0.3),
        color: '#88aa44',
        side: 'right'
    },
    {
        id: 'gallbladder',
        num: 9,
        name: 'Vesícula Biliar',
        sub: 'Reservorio Biliar',
        anchor: new THREE.Vector3(0.4, -0.5, 0.3),
        offset: new THREE.Vector3(2.0, -0.4, 0.4),
        color: '#66aa55',
        side: 'right'
    },
    {
        id: 'falciform',
        num: 10,
        name: 'Ligamento Falciforme',
        sub: 'Separa Lóbulos D / I',
        anchor: new THREE.Vector3(0.0, 0.35, 0.5),
        offset: new THREE.Vector3(-1.9, 1.2, 0.5),
        color: '#a09070',
        side: 'left'
    }
];

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(engine => {
    const { scene, camera, renderer } = engine;

    // ── Overlay contenedor ──
    const overlay = document.createElement('div');
    overlay.id = 'liverLabelsOverlay';
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

    // ── SVG para líneas conectoras ──
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

    // ── Estilos de etiquetas ──
    const style = document.createElement('style');
    style.textContent = `
        .lvr-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .lvr-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .lvr-label-num {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Space Mono', monospace;
            font-size: 0.6rem;
            font-weight: 700;
            color: #fff;
            border: 2px solid rgba(255,255,255,0.25);
            backdrop-filter: blur(8px);
            box-shadow: 0 0 10px var(--lvr-glow), 0 2px 8px rgba(0,0,0,0.5);
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .lvr-label:hover .lvr-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 18px var(--lvr-glow), 0 0 36px var(--lvr-glow);
        }
        .lvr-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lvr-color);
            opacity: 0;
            animation: lvrPulse 2.8s ease-in-out infinite;
        }
        @keyframes lvrPulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.4); }
        }
        .lvr-label-tag {
            position: absolute;
            top: 50%;
            background: rgba(14, 12, 10, 0.92);
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
        .lvr-label-tag .tag-sub {
            display: block;
            font-size: 0.55rem;
            color: #8a94a8;
            margin-top: 1px;
        }
        .lvr-label.side-right .lvr-label-tag {
            left: 34px; right: auto;
            transform: translateY(-50%) translateX(-6px);
        }
        .lvr-label.side-right:hover .lvr-label-tag,
        .lvr-label.side-right.active-label .lvr-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .lvr-label.side-left .lvr-label-tag {
            right: 34px; left: auto;
            transform: translateY(-50%) translateX(6px);
        }
        .lvr-label.side-left:hover .lvr-label-tag,
        .lvr-label.side-left.active-label .lvr-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .lvr-label.active-label .lvr-label-num {
            transform: scale(1.15);
            border-color: rgba(255,255,255,0.75);
            box-shadow: 0 0 16px var(--lvr-glow), 0 0 32px var(--lvr-glow);
        }
    `;
    document.head.appendChild(style);

    // ══════════════════════════════════════════════
    //  CREAR ELEMENTOS
    // ══════════════════════════════════════════════
    const labels = [];

    LABELS_CONFIG.forEach(cfg => {
        // ── Div etiqueta ──
        const el = document.createElement('div');
        el.className = `lvr-label side-${cfg.side}`;
        el.dataset.part = cfg.id;
        el.style.setProperty('--lvr-color', cfg.color);
        el.style.setProperty('--lvr-glow', cfg.color + '55');

        el.innerHTML = `
            <div class="lvr-label-num" style="background:${cfg.color}20; border-color:${cfg.color}50;">
                ${cfg.num}
            </div>
            <div class="lvr-label-tag">
                <span style="color:${cfg.color};font-weight:700;margin-right:4px;">${cfg.num}</span>
                ${cfg.name}
                <span class="tag-sub">${cfg.sub}</span>
            </div>
        `;
        overlay.appendChild(el);

        // ── SVG: línea conectora ──
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', cfg.color);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-opacity', '0.4');
        line.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(line);

        // ── SVG: punto de anclaje ──
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '0.85');
        svg.appendChild(dot);

        // ── SVG: anillo de anclaje ──
        const ring = document.createElementNS(svgNS, 'circle');
        ring.setAttribute('r', '6');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', cfg.color);
        ring.setAttribute('stroke-width', '0.8');
        ring.setAttribute('stroke-opacity', '0.3');
        svg.appendChild(ring);

        // ── Click → activar estructura en panel lateral ──
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
                if (part === 'all') {
                    l.el.classList.remove('active-label');
                } else {
                    l.el.classList.toggle('active-label', l.id === part);
                }
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
    //  PROYECCIÓN 3D → 2D  (cada frame)
    // ══════════════════════════════════════════════
    const tempVec = new THREE.Vector3();
    const anchorVec = new THREE.Vector3();

    function updateLabels() {
        requestAnimationFrame(updateLabels);
        if (!labelsVisible) return;

        const w = window.innerWidth;
        const h = window.innerHeight - 52;

        labels.forEach(lbl => {
            // Proyectar offset (posición del número)
            tempVec.copy(lbl.offset3D);
            tempVec.project(camera);
            const nx = (tempVec.x * 0.5 + 0.5) * w;
            const ny = (-tempVec.y * 0.5 + 0.5) * h;

            // Proyectar anchor (punto en el órgano)
            anchorVec.copy(lbl.anchor3D);
            anchorVec.project(camera);
            const ax = (anchorVec.x * 0.5 + 0.5) * w;
            const ay = (-anchorVec.y * 0.5 + 0.5) * h;

            // Ocultar si está detrás de la cámara
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

            // Posicionar etiqueta
            lbl.el.style.left = nx + 'px';
            lbl.el.style.top = ny + 'px';

            // Actualizar línea SVG
            lbl.line.setAttribute('x1', ax);
            lbl.line.setAttribute('y1', ay);
            lbl.line.setAttribute('x2', nx);
            lbl.line.setAttribute('y2', ny);

            // Actualizar punto y anillo
            lbl.dot.setAttribute('cx', ax);
            lbl.dot.setAttribute('cy', ay);
            lbl.ring.setAttribute('cx', ax);
            lbl.ring.setAttribute('cy', ay);
        });
    }

    updateLabels();
    console.log('✅ Liver Labels: 10 etiquetas anatómicas cargadas');

}).catch(err => {
    console.warn('⚠️ Liver Labels:', err);
});
