/**
 * ═══════════════════════════════════════════════════
 *  LUNGS LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Etiquetas numeradas flotantes sobre el modelo 3D
 *  de pulmones humanos.
 *
 *  Requiere: window.__LUNGS3D (scene, camera, renderer)
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__LUNGS3D && window.__LUNGS3D.scene && window.__LUNGS3D.camera) {
                return resolve(window.__LUNGS3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  CONFIGURACIÓN DE ETIQUETAS
//  Modelo pulmones centrado en origen, escala ~3.8
//  Pulmón derecho: lado +X (más grande)
//  Pulmón izquierdo: lado -X (más pequeño)
// ══════════════════════════════════════════════════
const LABELS_CONFIG = [
    {
        id: 'right_lung',
        num: 1,
        name: 'Pulmón Derecho',
        sub: '3 lóbulos — 10 segmentos',
        anchor: new THREE.Vector3(0.8, 0.2, 0.0),
        offset: new THREE.Vector3(2.0, 0.8, 0.0),
        color: '#cc6678',
        side: 'right'
    },
    {
        id: 'left_lung',
        num: 2,
        name: 'Pulmón Izquierdo',
        sub: '2 lóbulos — 8-9 segmentos',
        anchor: new THREE.Vector3(-0.8, 0.2, 0.0),
        offset: new THREE.Vector3(-2.0, 0.8, 0.0),
        color: '#cc7088',
        side: 'left'
    },
    {
        id: 'r_superior',
        num: 3,
        name: 'Lóbulo Superior D',
        sub: 'Segmentos apical, posterior, anterior',
        anchor: new THREE.Vector3(0.7, 0.8, 0.2),
        offset: new THREE.Vector3(2.0, 1.3, 0.3),
        color: '#dd7788',
        side: 'right'
    },
    {
        id: 'r_middle',
        num: 4,
        name: 'Lóbulo Medio D',
        sub: 'Segmentos lateral y medial',
        anchor: new THREE.Vector3(0.9, 0.1, 0.4),
        offset: new THREE.Vector3(2.1, 0.1, 0.7),
        color: '#cc6677',
        side: 'right'
    },
    {
        id: 'r_inferior',
        num: 5,
        name: 'Lóbulo Inferior D',
        sub: '5 segmentos basales',
        anchor: new THREE.Vector3(0.6, -0.5, -0.2),
        offset: new THREE.Vector3(2.0, -0.9, -0.3),
        color: '#bb5566',
        side: 'right'
    },
    {
        id: 'l_superior',
        num: 6,
        name: 'Lóbulo Superior I',
        sub: 'Incluye língula',
        anchor: new THREE.Vector3(-0.7, 0.7, 0.2),
        offset: new THREE.Vector3(-2.0, 1.2, 0.3),
        color: '#dd8090',
        side: 'left'
    },
    {
        id: 'l_inferior',
        num: 7,
        name: 'Lóbulo Inferior I',
        sub: 'Segmentos basales',
        anchor: new THREE.Vector3(-0.6, -0.5, -0.2),
        offset: new THREE.Vector3(-2.0, -0.9, -0.3),
        color: '#bb6070',
        side: 'left'
    },
    {
        id: 'trachea',
        num: 8,
        name: 'Tráquea',
        sub: 'Vía aérea principal',
        anchor: new THREE.Vector3(0.0, 1.2, 0.1),
        offset: new THREE.Vector3(-2.0, 1.8, 0.2),
        color: '#ddbb88',
        side: 'left'
    },
    {
        id: 'bronchi',
        num: 9,
        name: 'Bronquios Principales',
        sub: 'Derecho e izquierdo',
        anchor: new THREE.Vector3(0.0, 0.6, 0.0),
        offset: new THREE.Vector3(2.0, 0.4, 0.1),
        color: '#ccaa77',
        side: 'right'
    },
    {
        id: 'alveoli',
        num: 10,
        name: 'Alvéolos',
        sub: '~480 millones',
        anchor: new THREE.Vector3(0.4, 0.0, 0.5),
        offset: new THREE.Vector3(2.1, -0.2, 0.9),
        color: '#ee9999',
        side: 'right'
    }
];

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(engine => {
    const { scene, camera, renderer } = engine;

    // ── Overlay contenedor ──
    const overlay = document.createElement('div');
    overlay.id = 'lungsLabelsOverlay';
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
        .lng-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .lng-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .lng-label-num {
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
            box-shadow: 0 0 10px var(--lng-glow), 0 2px 8px rgba(0,0,0,0.5);
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .lng-label:hover .lng-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 18px var(--lng-glow), 0 0 36px var(--lng-glow);
        }
        .lng-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lng-color);
            opacity: 0;
            animation: lngPulse 2.8s ease-in-out infinite;
        }
        @keyframes lngPulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.4); }
        }
        .lng-label-tag {
            position: absolute;
            top: 50%;
            background: rgba(12, 14, 22, 0.92);
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
        .lng-label-tag .tag-sub {
            display: block;
            font-size: 0.55rem;
            color: #8a94a8;
            margin-top: 1px;
        }
        .lng-label.side-right .lng-label-tag {
            left: 34px; right: auto;
            transform: translateY(-50%) translateX(-6px);
        }
        .lng-label.side-right:hover .lng-label-tag,
        .lng-label.side-right.active-label .lng-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .lng-label.side-left .lng-label-tag {
            right: 34px; left: auto;
            transform: translateY(-50%) translateX(6px);
        }
        .lng-label.side-left:hover .lng-label-tag,
        .lng-label.side-left.active-label .lng-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .lng-label.active-label .lng-label-num {
            transform: scale(1.15);
            border-color: rgba(255,255,255,0.75);
            box-shadow: 0 0 16px var(--lng-glow), 0 0 32px var(--lng-glow);
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
        el.className = `lng-label side-${cfg.side}`;
        el.dataset.part = cfg.id;
        el.style.setProperty('--lng-color', cfg.color);
        el.style.setProperty('--lng-glow', cfg.color + '55');

        el.innerHTML = `
            <div class="lng-label-num" style="background:${cfg.color}20; border-color:${cfg.color}50;">
                ${cfg.num}
            </div>
            <div class="lng-label-tag">
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

    function attachToggleButton() {
        const toggleBtn = document.getElementById('bLbl');
        if (toggleBtn) {
           toggleBtn.addEventListener('click', () => {
            labelsVisible = !labelsVisible;
            toggleBtn.classList.toggle('lbl-active', labelsVisible);
            overlay.style.opacity = labelsVisible ? '1' : '0';
            overlay.style.transition = 'opacity 0.35s ease';
        });
        console.log('✅ Lungs Labels: Toggle button attached');
    } else {
        // Reintentar después de 100ms si el botón aún no existe
        setTimeout(attachToggleButton, 100);
    }
}

// Iniciar el proceso de attach
attachToggleButton();

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
    console.log('✅ Lungs Labels: 10 etiquetas anatómicas cargadas');

}).catch(err => {
    console.warn('⚠️ Lungs Labels:', err);
});
