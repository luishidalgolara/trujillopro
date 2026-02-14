/**
 * ═══════════════════════════════════════════════════
 *  SKELETON LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForCamera(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.camera) {
                return resolve(window.camera);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: camera no disponible');
            requestAnimationFrame(check);
        })();
    });
}

waitForCamera().then(camera => {
    let labelsVisible = true; // INICIA VISIBLE (botón activo en HTML)

    // Datos de las etiquetas basadas en el modelo skeleton.glb
    const labelData = [
        // Cráneo y cara
        { num: 1, name: 'Cráneo', info: 'Neurocráneo — Protección encefálica', anchor: [0, 1.8, 0.1], offset: [2.0, 1.8, 0.1], color: '#e8d5b0', side: 'right' },
        { num: 2, name: 'Dientes Superiores', info: 'Maxilar — 16 piezas dentales', anchor: [0, 1.5, 0.15], offset: [-2.0, 1.5, 0.15], color: '#f0ece4', side: 'left' },
        { num: 3, name: 'Mandíbula', info: 'Único hueso móvil cráneo', anchor: [0, 1.4, 0.12], offset: [2.0, 1.4, 0.12], color: '#e8d5b0', side: 'right' },
        
        // Columna vertebral
        { num: 4, name: 'Vértebras Cervicales', info: 'C1-C7 — Cuello', anchor: [0, 1.2, -0.05], offset: [-2.0, 1.2, -0.05], color: '#c8b898', side: 'left' },
        { num: 5, name: 'Vértebras Torácicas', info: 'T1-T12 — Tórax', anchor: [0, 0.7, -0.08], offset: [2.0, 0.7, -0.08], color: '#c8b898', side: 'right' },
        { num: 6, name: 'Vértebras Lumbares', info: 'L1-L5 — Región lumbar', anchor: [0, 0.2, -0.05], offset: [-2.0, 0.2, -0.05], color: '#c8b898', side: 'left' },
        { num: 7, name: 'Sacro', info: '5 vértebras fusionadas', anchor: [0, -0.1, -0.08], offset: [2.0, -0.1, -0.08], color: '#c8b898', side: 'right' },
        
        // Caja torácica
        { num: 8, name: 'Esternón', info: 'Manubrio, cuerpo, xifoides', anchor: [0, 0.8, 0.12], offset: [-2.0, 0.8, 0.12], color: '#bfb08a', side: 'left' },
        { num: 9, name: 'Costillas Derechas', info: '12 pares — Protección torácica', anchor: [0.15, 0.7, 0], offset: [2.0, 0.7, 0], color: '#d4c4a0', side: 'right' },
        { num: 10, name: 'Costillas Izquierdas', info: '12 pares — Protección torácica', anchor: [-0.15, 0.7, 0], offset: [-2.0, 0.7, 0], color: '#d4c4a0', side: 'left' },
        
        // Cintura escapular
        { num: 11, name: 'Clavícula Derecha', info: 'Conexión esternón-escápula', anchor: [0.12, 1.1, 0.08], offset: [2.0, 1.1, 0.08], color: '#a8c4d8', side: 'right' },
        { num: 12, name: 'Clavícula Izquierda', info: 'Conexión esternón-escápula', anchor: [-0.12, 1.1, 0.08], offset: [-2.0, 1.1, 0.08], color: '#a8c4d8', side: 'left' },
        { num: 13, name: 'Escápula Derecha', info: 'Omóplato — Cavidad glenoidea', anchor: [0.15, 0.95, -0.1], offset: [2.0, 0.95, -0.1], color: '#a8c4d8', side: 'right' },
        { num: 14, name: 'Escápula Izquierda', info: 'Omóplato — Cavidad glenoidea', anchor: [-0.15, 0.95, -0.1], offset: [-2.0, 0.95, -0.1], color: '#a8c4d8', side: 'left' },
        
        // Miembro superior derecho
        { num: 15, name: 'Húmero Derecho', info: 'Hueso del brazo', anchor: [0.3, 0.6, 0], offset: [2.0, 0.6, 0], color: '#90b0c8', side: 'right' },
        { num: 16, name: 'Radio Derecho', info: 'Antebrazo lateral (pulgar)', anchor: [0.35, 0.15, 0.02], offset: [2.0, 0.15, 0.02], color: '#7898b0', side: 'right' },
        { num: 17, name: 'Cúbito Derecho', info: 'Antebrazo medial (meñique)', anchor: [0.32, 0.15, -0.02], offset: [2.0, 0.1, -0.02], color: '#7898b0', side: 'right' },
        { num: 18, name: 'Carpo Derecho', info: '8 huesos muñeca', anchor: [0.38, -0.05, 0], offset: [2.0, -0.05, 0], color: '#6088a0', side: 'right' },
        { num: 19, name: 'Metacarpo Derecho', info: '5 huesos mano', anchor: [0.42, -0.15, 0], offset: [2.0, -0.2, 0], color: '#6088a0', side: 'right' },
        { num: 20, name: 'Falanges Derecha', info: '14 huesos dedos', anchor: [0.45, -0.25, 0], offset: [2.0, -0.35, 0], color: '#6088a0', side: 'right' },
        
        // Miembro superior izquierdo
        { num: 21, name: 'Húmero Izquierdo', info: 'Hueso del brazo', anchor: [-0.3, 0.6, 0], offset: [-2.0, 0.6, 0], color: '#90b0c8', side: 'left' },
        { num: 22, name: 'Radio Izquierdo', info: 'Antebrazo lateral (pulgar)', anchor: [-0.35, 0.15, 0.02], offset: [-2.0, 0.15, 0.02], color: '#7898b0', side: 'left' },
        { num: 23, name: 'Cúbito Izquierdo', info: 'Antebrazo medial (meñique)', anchor: [-0.32, 0.15, -0.02], offset: [-2.0, 0.1, -0.02], color: '#7898b0', side: 'left' },
        { num: 24, name: 'Carpo Izquierdo', info: '8 huesos muñeca', anchor: [-0.38, -0.05, 0], offset: [-2.0, -0.05, 0], color: '#6088a0', side: 'left' },
        { num: 25, name: 'Metacarpo Izquierdo', info: '5 huesos mano', anchor: [-0.42, -0.15, 0], offset: [-2.0, -0.2, 0], color: '#6088a0', side: 'left' },
        { num: 26, name: 'Falanges Izquierda', info: '14 huesos dedos', anchor: [-0.45, -0.25, 0], offset: [-2.0, -0.35, 0], color: '#6088a0', side: 'left' },
        
        // Pelvis
        { num: 27, name: 'Hueso Coxal Derecho', info: 'Ilion + Isquion + Pubis', anchor: [0.12, -0.05, 0], offset: [2.0, -0.05, 0], color: '#c8a888', side: 'right' },
        { num: 28, name: 'Hueso Coxal Izquierdo', info: 'Ilion + Isquion + Pubis', anchor: [-0.12, -0.05, 0], offset: [-2.0, -0.05, 0], color: '#c8a888', side: 'left' },
        
        // Miembro inferior derecho
        { num: 29, name: 'Fémur Derecho', info: 'Hueso más largo del cuerpo', anchor: [0.12, -0.5, 0], offset: [2.0, -0.5, 0], color: '#d0a878', side: 'right' },
        { num: 30, name: 'Rótula Derecha', info: 'Hueso sesamoideo mayor', anchor: [0.12, -0.85, 0.08], offset: [2.0, -0.85, 0.08], color: '#c89868', side: 'right' },
        { num: 31, name: 'Tibia Derecha', info: 'Hueso principal pierna', anchor: [0.12, -1.2, 0.02], offset: [2.0, -1.2, 0.02], color: '#b88858', side: 'right' },
        { num: 32, name: 'Peroné Derecho', info: 'Hueso lateral pierna', anchor: [0.15, -1.2, -0.02], offset: [2.0, -1.25, -0.02], color: '#b88858', side: 'right' },
        { num: 33, name: 'Tarso Derecho', info: '7 huesos tobillo', anchor: [0.12, -1.65, 0], offset: [2.0, -1.65, 0], color: '#a87848', side: 'right' },
        { num: 34, name: 'Metatarso Derecho', info: '5 huesos pie', anchor: [0.12, -1.75, 0.08], offset: [2.0, -1.75, 0.08], color: '#a87848', side: 'right' },
        { num: 35, name: 'Falanges Derecha Pie', info: '14 huesos dedos pie', anchor: [0.12, -1.8, 0.15], offset: [2.0, -1.85, 0.15], color: '#a87848', side: 'right' },
        
        // Miembro inferior izquierdo
        { num: 36, name: 'Fémur Izquierdo', info: 'Hueso más largo del cuerpo', anchor: [-0.12, -0.5, 0], offset: [-2.0, -0.5, 0], color: '#d0a878', side: 'left' },
        { num: 37, name: 'Rótula Izquierda', info: 'Hueso sesamoideo mayor', anchor: [-0.12, -0.85, 0.08], offset: [-2.0, -0.85, 0.08], color: '#c89868', side: 'left' },
        { num: 38, name: 'Tibia Izquierda', info: 'Hueso principal pierna', anchor: [-0.12, -1.2, 0.02], offset: [-2.0, -1.2, 0.02], color: '#b88858', side: 'left' },
        { num: 39, name: 'Peroné Izquierdo', info: 'Hueso lateral pierna', anchor: [-0.15, -1.2, -0.02], offset: [-2.0, -1.25, -0.02], color: '#b88858', side: 'left' },
        { num: 40, name: 'Tarso Izquierdo', info: '7 huesos tobillo', anchor: [-0.12, -1.65, 0], offset: [-2.0, -1.65, 0], color: '#a87848', side: 'left' },
        { num: 41, name: 'Metatarso Izquierdo', info: '5 huesos pie', anchor: [-0.12, -1.75, 0.08], offset: [-2.0, -1.75, 0.08], color: '#a87848', side: 'left' },
        { num: 42, name: 'Falanges Izquierda Pie', info: '14 huesos dedos pie', anchor: [-0.12, -1.8, 0.15], offset: [-2.0, -1.85, 0.15], color: '#a87848', side: 'left' }
    ];

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
        overflow: 'hidden',
        opacity: '1',
        transition: 'opacity 0.35s ease'
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
        .bone-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .bone-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .bone-label-num {
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
        .bone-label:hover .bone-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 18px var(--lbl-glow), 0 0 36px var(--lbl-glow);
        }
        .bone-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lbl-color);
            opacity: 0;
            animation: bonePulse 2.8s ease-in-out infinite;
        }
        @keyframes bonePulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.4); }
        }
        .bone-label-tag {
            position: absolute;
            top: 50%;
            background: rgba(12, 16, 28, 0.92);
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
        .bone-label-tag .tag-sub {
            display: block;
            font-size: 0.55rem;
            color: #8a94a8;
            margin-top: 1px;
        }
        .bone-label.side-right .bone-label-tag {
            left: 34px; right: auto;
            transform: translateY(-50%) translateX(-6px);
        }
        .bone-label.side-right:hover .bone-label-tag,
        .bone-label.side-right.active-label .bone-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .bone-label.side-left .bone-label-tag {
            right: 34px; left: auto;
            transform: translateY(-50%) translateX(6px);
        }
        .bone-label.side-left:hover .bone-label-tag,
        .bone-label.side-left.active-label .bone-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .bone-label.active-label .bone-label-num {
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

    labelData.forEach(cfg => {
        const el = document.createElement('div');
        el.className = `bone-label side-${cfg.side}`;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-glow', cfg.color + '55');

        el.innerHTML = `
            <div class="bone-label-num" style="background:${cfg.color}20; border-color:${cfg.color}50;">
                ${cfg.num}
            </div>
            <div class="bone-label-tag">
                <span style="color:${cfg.color};font-weight:700;margin-right:4px;">${cfg.num}</span>
                ${cfg.name}
                <span class="tag-sub">${cfg.info}</span>
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

        labels.push({
            el, line, dot, ring,
            anchor3D: new THREE.Vector3(...cfg.anchor),
            offset3D: new THREE.Vector3(...cfg.offset)
        });
    });

    // ══════════════════════════════════════════════
    //  BOTÓN TOGGLE
    // ══════════════════════════════════════════════
    const toggleBtn = document.getElementById('bLbl');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            labelsVisible = !labelsVisible;
            toggleBtn.classList.toggle('lbl-active', labelsVisible);
            
            if (labelsVisible) {
                overlay.style.display = 'block';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            } else {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 350);
            }
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
    console.log('✅ Skeleton Labels: 42 etiquetas anatómicas cargadas');

}).catch(err => {
    console.warn('⚠️ Skeleton Labels:', err);
});