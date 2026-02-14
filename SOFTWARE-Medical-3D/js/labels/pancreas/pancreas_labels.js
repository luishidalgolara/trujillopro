/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *  
 *  Este módulo agrega etiquetas numeradas flotantes
 *  sobre el modelo 3D del páncreas, con líneas guía que
 *  conectan cada número con la zona anatómica real.
 *  
 *  Requiere: window.__PANCREAS3D (scene, camera, renderer)
 *  expuesto desde el HTML principal
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

// ── Esperar a que el motor 3D esté disponible ──
function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__PANCREAS3D && window.__PANCREAS3D.scene && window.__PANCREAS3D.camera) {
                return resolve(window.__PANCREAS3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  CONFIGURACIÓN DE ETIQUETAS
//  Posiciones 3D anatómicamente correctas sobre
//  el modelo del páncreas
// ══════════════════════════════════════════════════
const LABELS_CONFIG = [
    {
        id: 'head',
        num: 1,
        name: 'Cabeza',
        // Porción derecha del páncreas, más ancha
        anchor: new THREE.Vector3(0.8, 0, 0.3),
        offset: new THREE.Vector3(1.4, 0.9, 0.5),
        color: '#ddbb66'
    },
    {
        id: 'bodyp',
        num: 2,
        name: 'Cuerpo',
        // Porción central del páncreas
        anchor: new THREE.Vector3(0, 0, 0),
        offset: new THREE.Vector3(-0.2, 1.2, 0.8),
        color: '#ccaa55'
    },
    {
        id: 'tail',
        num: 3,
        name: 'Cola',
        // Porción izquierda, hacia el bazo
        anchor: new THREE.Vector3(-0.9, 0.1, -0.2),
        offset: new THREE.Vector3(-1.5, 0.8, -0.3),
        color: '#bb9944'
    },
    {
        id: 'duct',
        num: 4,
        name: 'Conducto (Wirsung)',
        // Centro del páncreas, recorriendo longitudinalmente
        anchor: new THREE.Vector3(0.2, 0, 0.1),
        offset: new THREE.Vector3(0.8, -0.9, 0.6),
        color: '#88bb66'
    },
    {
        id: 'parenchyma',
        num: 5,
        name: 'Parénquima',
        // Tejido glandular
        anchor: new THREE.Vector3(-0.3, 0.2, 0.2),
        offset: new THREE.Vector3(-0.8, -1.0, 0.9),
        color: '#ccaa55'
    },
    {
        id: 'uncinate',
        num: 6,
        name: 'Proceso Uncinado',
        // Proyección inferior de la cabeza
        anchor: new THREE.Vector3(0.6, -0.4, 0.1),
        offset: new THREE.Vector3(1.2, -1.1, -0.3),
        color: '#eebb77'
    },
    {
        id: 'islets',
        num: 7,
        name: 'Islotes de Langerhans',
        // Dispersos en el parénquima, más en cola
        anchor: new THREE.Vector3(-0.5, 0.15, 0),
        offset: new THREE.Vector3(-1.3, 0.2, 0.7),
        color: '#dd88aa'
    }
];

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(engine => {
    const { scene, camera, renderer } = engine;

    // ── Contenedor HTML superpuesto al canvas ──
    const overlay = document.createElement('div');
    overlay.id = 'labelsOverlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '52px',       // debajo del header
        left: '0',
        width: '100%',
        height: 'calc(100vh - 52px)',
        pointerEvents: 'none',
        zIndex: '40',
        overflow: 'hidden'
    });
    document.body.appendChild(overlay);

    // ── SVG para las líneas guía ──
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    Object.assign(svg.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    });
    overlay.appendChild(svg);

    // ── CSS inyectado ──
    const style = document.createElement('style');
    style.textContent = `
        .pancreas-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .pancreas-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .pancreas-label-num {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Space Mono', monospace;
            font-size: 0.75rem;
            font-weight: 700;
            color: #0a0a08;
            border: 2px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(8px);
            box-shadow: 0 0 12px var(--lbl-glow), 0 2px 8px rgba(0,0,0,0.4);
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .pancreas-label:hover .pancreas-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 20px var(--lbl-glow), 0 0 40px var(--lbl-glow), 0 2px 12px rgba(0,0,0,0.5);
        }
        .pancreas-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lbl-color);
            opacity: 0;
            animation: labelPulse 2.5s ease-in-out infinite;
        }
        @keyframes labelPulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.35); }
        }
        .pancreas-label-tag {
            position: absolute;
            left: 38px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(12, 16, 28, 0.92);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 6px;
            padding: 5px 11px;
            white-space: nowrap;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.7rem;
            font-weight: 500;
            color: #e8ecf4;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease;
            transform: translateY(-50%) translateX(-6px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .pancreas-label:hover .pancreas-label-tag {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
        }
        .pancreas-label.active-label .pancreas-label-num {
            transform: scale(1.15);
            border-color: rgba(255,255,255,0.8);
            box-shadow: 0 0 18px var(--lbl-glow), 0 0 36px var(--lbl-glow), 0 2px 12px rgba(0,0,0,0.5);
        }
        .pancreas-label.active-label .pancreas-label-tag {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
        }
    `;
    document.head.appendChild(style);

    // ══════════════════════════════════════════════
    //  CREAR ELEMENTOS HTML PARA CADA ETIQUETA
    // ══════════════════════════════════════════════
    const labels = [];
    const lines = [];

    LABELS_CONFIG.forEach(cfg => {
        // ── Elemento HTML ──
        const el = document.createElement('div');
        el.className = 'pancreas-label';
        el.dataset.part = cfg.id;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-glow', cfg.color + '66');

        el.innerHTML = `
            <div class="pancreas-label-num" style="background:${cfg.color}; border-color:${cfg.color}88;">
                ${cfg.num}
            </div>
            <div class="pancreas-label-tag">
                <span style="color:${cfg.color};font-weight:700;margin-right:4px;">${cfg.num}</span>
                ${cfg.name}
            </div>
        `;
        overlay.appendChild(el);

        // ── Línea SVG ──
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', cfg.color);
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-opacity', '0.4');
        line.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(line);

        // ── Punto de anclaje SVG ──
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '0.7');
        svg.appendChild(dot);

        // ── Click → activar botón del panel lateral ──
        el.addEventListener('click', () => {
            const btn = document.querySelector(`.hl-btn[data-part="${cfg.id}"]`);
            if (btn) btn.click();
            // Highlight visual
            labels.forEach(l => l.el.classList.remove('active-label'));
            el.classList.add('active-label');
        });

        labels.push({
            el,
            line,
            dot,
            anchor3D: cfg.anchor.clone(),
            offset3D: cfg.offset.clone(),
            id: cfg.id
        });
    });

    // ══════════════════════════════════════════════
    //  SINCRONIZAR CON BOTONES DEL PANEL LATERAL
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
    //  BOTÓN TOGGLE (añadido al ctrl-bar)
    // ══════════════════════════════════════════════
    let labelsVisible = true;
    
    // Crear botón de toggle en la barra de controles
    const ctrlBar = document.querySelector('.ctrl-bar');
    if (ctrlBar) {
        const divider = document.createElement('div');
        divider.className = 'cd';
        ctrlBar.appendChild(divider);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'cb active';
        toggleBtn.id = 'bLbl';
        toggleBtn.title = 'Etiquetas';
        toggleBtn.textContent = '🏷️';
        ctrlBar.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            labelsVisible = !labelsVisible;
            toggleBtn.classList.toggle('active', labelsVisible);
            overlay.style.opacity = labelsVisible ? '1' : '0';
            overlay.style.transition = 'opacity 0.35s ease';
        });
    }

    // ══════════════════════════════════════════════
    //  PROYECCIÓN 3D → 2D (cada frame)
    // ══════════════════════════════════════════════
    const tempVec = new THREE.Vector3();
    const anchorVec = new THREE.Vector3();

    function updateLabels() {
        requestAnimationFrame(updateLabels);

        if (!labelsVisible) return;

        const w = window.innerWidth;
        const h = window.innerHeight - 52;

        labels.forEach(lbl => {
            // Posición del número (offset = donde flota la etiqueta)
            tempVec.copy(lbl.offset3D);
            tempVec.project(camera);
            const nx = (tempVec.x * 0.5 + 0.5) * w;
            const ny = (-tempVec.y * 0.5 + 0.5) * h;

            // Posición del punto de anclaje (sobre el modelo)
            anchorVec.copy(lbl.anchor3D);
            anchorVec.project(camera);
            const ax = (anchorVec.x * 0.5 + 0.5) * w;
            const ay = (-anchorVec.y * 0.5 + 0.5) * h;

            // Verificar si está delante de la cámara
            const behind = tempVec.z > 1 || anchorVec.z > 1;

            if (behind) {
                lbl.el.classList.add('hidden-label');
                lbl.line.setAttribute('stroke-opacity', '0');
                lbl.dot.setAttribute('fill-opacity', '0');
            } else {
                lbl.el.classList.remove('hidden-label');
                lbl.line.setAttribute('stroke-opacity', '0.4');
                lbl.dot.setAttribute('fill-opacity', '0.7');
            }

            // Posicionar etiqueta HTML
            lbl.el.style.left = nx + 'px';
            lbl.el.style.top = ny + 'px';

            // Posicionar línea SVG
            lbl.line.setAttribute('x1', ax);
            lbl.line.setAttribute('y1', ay);
            lbl.line.setAttribute('x2', nx);
            lbl.line.setAttribute('y2', ny);

            // Posicionar punto de anclaje
            lbl.dot.setAttribute('cx', ax);
            lbl.dot.setAttribute('cy', ay);
        });
    }

    updateLabels();

    console.log('✅ Páncreas Labels: 7 etiquetas anatómicas cargadas');

}).catch(err => {
    console.warn('⚠️ Páncreas Labels:', err);
});
