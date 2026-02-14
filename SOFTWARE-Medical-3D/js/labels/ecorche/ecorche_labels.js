/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Etiquetas numeradas flotantes sobre el modelo 3D
 *  del écorché, con líneas guía que conectan cada
 *  número con la zona anatómica correspondiente.
 *
 *  Requiere: window.__ECORCHE3D (scene, camera, renderer)
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__ECORCHE3D && window.__ECORCHE3D.scene && window.__ECORCHE3D.camera) {
                return resolve(window.__ECORCHE3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  CONFIGURACIÓN DE ETIQUETAS — RECALIBRADAS
//
//  Modelo centrado en origen, de pie, escala ~5.5
//  Cabeza ≈ Y+2.6   Pies ≈ Y-2.6
//  Torso ancho ≈ X±0.7   Brazos hasta ≈ X±1.4
//  Frente Z+ ≈ 0.5   Espalda Z- ≈ -0.4
//
//  anchor = punto exacto SOBRE la superficie del cuerpo
//  offset = punto FUERA del cuerpo donde flota el número
// ══════════════════════════════════════════════════
const LABELS_CONFIG = [
    // ═══ LADO DERECHO DE PANTALLA (números 1-7) ═══
    // offset.x negativo = aparecen a la derecha en pantalla
    {
        id: 'head_neck',
        num: 1,
        name: 'Cabeza y Cuello',
        anchor: new THREE.Vector3(0.0, 2.35, 0.30),     // frente de la cara
        offset: new THREE.Vector3(-1.6, 3.0, 0.4),
        color: '#cc5858',
        side: 'left'    // tag aparece a la izquierda del número
    },
    {
        id: 'deltoid',
        num: 2,
        name: 'Deltoides',
        anchor: new THREE.Vector3(-0.80, 1.80, 0.20),    // hombro izquierdo del modelo
        offset: new THREE.Vector3(-2.1, 2.15, 0.3),
        color: '#d46058',
        side: 'left'
    },
    {
        id: 'pectoralis',
        num: 3,
        name: 'Pectoral Mayor',
        anchor: new THREE.Vector3(-0.32, 1.50, 0.50),    // pecho izquierdo
        offset: new THREE.Vector3(-2.2, 1.45, 0.5),
        color: '#dd6660',
        side: 'left'
    },
    {
        id: 'biceps',
        num: 4,
        name: 'Bíceps Braquial',
        anchor: new THREE.Vector3(-1.15, 1.05, 0.25),    // brazo izquierdo
        offset: new THREE.Vector3(-2.3, 0.80, 0.3),
        color: '#cc5850',
        side: 'left'
    },
    {
        id: 'rectus_abd',
        num: 5,
        name: 'Recto Abdominal',
        anchor: new THREE.Vector3(-0.10, 0.70, 0.48),    // centro abdomen
        offset: new THREE.Vector3(-2.1, 0.35, 0.4),
        color: '#c45048',
        side: 'left'
    },
    {
        id: 'quadriceps',
        num: 6,
        name: 'Cuádriceps',
        anchor: new THREE.Vector3(-0.32, -0.40, 0.38),   // muslo izquierdo frontal
        offset: new THREE.Vector3(-2.0, -0.55, 0.4),
        color: '#bb4840',
        side: 'left'
    },
    {
        id: 'gastrocnemius',
        num: 7,
        name: 'Gastrocnemio',
        anchor: new THREE.Vector3(-0.25, -1.55, -0.15),  // pantorrilla izquierda
        offset: new THREE.Vector3(-1.8, -1.65, -0.1),
        color: '#b04038',
        side: 'left'
    },
    // ═══ LADO IZQUIERDO DE PANTALLA (números 8-12) ═══
    // offset.x positivo = aparecen a la izquierda en pantalla
    {
        id: 'back',
        num: 8,
        name: 'Dorso',
        anchor: new THREE.Vector3(0.30, 1.60, -0.35),    // espalda alta (trapecio)
        offset: new THREE.Vector3(2.2, 1.90, -0.4),
        color: '#bb4040',
        side: 'right'
    },
    {
        id: 'upper_limb',
        num: 9,
        name: 'Miembro Superior',
        anchor: new THREE.Vector3(1.10, 1.10, 0.15),     // brazo derecho del modelo
        offset: new THREE.Vector3(2.3, 1.00, 0.2),
        color: '#b83838',
        side: 'right'
    },
    {
        id: 'tendons',
        num: 10,
        name: 'Tendones y Fascias',
        anchor: new THREE.Vector3(0.50, 0.15, 0.30),     // zona de la cadera/tendones visibles
        offset: new THREE.Vector3(2.1, 0.10, 0.3),
        color: '#c8a870',
        side: 'right'
    },
    {
        id: 'lower_limb',
        num: 11,
        name: 'Miembro Inferior',
        anchor: new THREE.Vector3(0.35, -0.75, 0.30),    // muslo derecho
        offset: new THREE.Vector3(2.0, -0.80, 0.3),
        color: '#b03030',
        side: 'right'
    },
    {
        id: 'dissected',
        num: 12,
        name: 'Pierna Disecada',
        anchor: new THREE.Vector3(0.28, -1.80, 0.15),    // pierna derecha baja
        offset: new THREE.Vector3(1.9, -1.95, 0.2),
        color: '#aa6858',
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
        .eco-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .eco-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .eco-label-num {
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
        .eco-label:hover .eco-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 18px var(--lbl-glow), 0 0 36px var(--lbl-glow);
        }
        .eco-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lbl-color);
            opacity: 0;
            animation: ecoPulse 2.8s ease-in-out infinite;
        }
        @keyframes ecoPulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.4); }
        }
        .eco-label-tag {
            position: absolute;
            top: 50%;
            background: rgba(13, 10, 10, 0.92);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 6px;
            padding: 3px 9px;
            white-space: nowrap;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.65rem;
            font-weight: 500;
            color: #e8e0dc;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease;
            box-shadow: 0 4px 14px rgba(0,0,0,0.4);
        }
        .eco-label.side-right .eco-label-tag {
            left: 34px; right: auto;
            transform: translateY(-50%) translateX(-6px);
        }
        .eco-label.side-right:hover .eco-label-tag,
        .eco-label.side-right.active-label .eco-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .eco-label.side-left .eco-label-tag {
            right: 34px; left: auto;
            transform: translateY(-50%) translateX(6px);
        }
        .eco-label.side-left:hover .eco-label-tag,
        .eco-label.side-left.active-label .eco-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .eco-label.active-label .eco-label-num {
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
        el.className = `eco-label side-${cfg.side}`;
        el.dataset.part = cfg.id;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-glow', cfg.color + '55');

        el.innerHTML = `
            <div class="eco-label-num" style="background:${cfg.color}20; border-color:${cfg.color}50;">
                ${cfg.num}
            </div>
            <div class="eco-label-tag">
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

        // ── Punto de anclaje (sobre el cuerpo) ──
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '0.85');
        svg.appendChild(dot);

        // ── Anillo alrededor del punto de anclaje ──
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
    console.log('✅ Écorché Labels: 12 etiquetas anatómicas cargadas');

}).catch(err => {
    console.warn('⚠️ Écorché Labels:', err);
});