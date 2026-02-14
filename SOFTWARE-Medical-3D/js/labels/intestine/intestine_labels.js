/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE LABELS — Etiquetas Anatómicas Numeradas 3D
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  VERSIÓN AUTO-CALIBRADA: detecta la posición real
 *  de cada mesh del modelo y coloca los anchors
 *  directamente sobre la geometría.
 *
 *  Requiere: window.__INTESTINE3D (scene, camera, renderer)
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 12000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__INTESTINE3D && window.__INTESTINE3D.scene && window.__INTESTINE3D.camera) {
                return resolve(window.__INTESTINE3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  Esperar a que el modelo esté cargado (meshes > 0)
// ══════════════════════════════════════════════════
function waitForModel(scene, maxWait = 15000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            const meshes = [];
            scene.traverse(c => { if (c.isMesh) meshes.push(c); });
            if (meshes.length >= 2) return resolve(meshes);
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: modelo no cargado');
            setTimeout(check, 300);
        })();
    });
}

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(async engine => {
    const { scene, camera, renderer } = engine;

    // Esperar a que el modelo GLB esté en escena
    const allMeshes = await waitForModel(scene);

    // ─── Filtrar solo meshes del intestino (excluir ground plane) ───
    const intestineMeshes = allMeshes.filter(m => {
        const box = new THREE.Box3().setFromObject(m);
        const size = box.getSize(new THREE.Vector3());
        // El ground plane es muy plano y grande, lo excluimos
        return size.y > 0.1 && size.x < 10;
    });

    console.log(`🔍 Intestine Labels: encontradas ${intestineMeshes.length} meshes del modelo`);

    // ─── Calcular bounding box y centro de cada mesh ───
    const meshData = intestineMeshes.map((mesh, idx) => {
        const box = new THREE.Box3().setFromObject(mesh);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        console.log(`  Mesh ${idx}: center=(${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)}) size=(${size.x.toFixed(2)}, ${size.y.toFixed(2)}, ${size.z.toFixed(2)})`);
        return { mesh, center, size, box, idx };
    });

    // ─── Calcular punto en la superficie frontal de cada mesh ───
    function getFrontPoint(md) {
        // Punto en la cara frontal (Z máximo) del bounding box, centrado en X e Y
        return new THREE.Vector3(
            md.center.x,
            md.center.y,
            md.box.max.z
        );
    }

    // ─── Mapeo: meshToSection según el index del HTML original ───
    // mesh 0=cecum, 1=ascending, 2=transverse, 3=descending, 4=sigmoid, 5=rectum
    const sectionMap = ['cecum', 'ascending', 'transverse', 'descending', 'sigmoid', 'rectum'];

    // ─── Construir LABELS_CONFIG dinámicamente ───
    const labelDefs = [
        { id: 'cecum',      meshIdx: 0, num: 1, name: 'Ciego y Apéndice',    sub: 'Porción inicial — Válvula ileocecal',   color: '#cc7755', side: 'right' },
        { id: 'ascending',  meshIdx: 1, num: 2, name: 'Colon Ascendente',     sub: 'Colon derecho — Retroperitoneal',       color: '#d48060', side: 'right' },
        { id: 'transverse', meshIdx: 2, num: 3, name: 'Colon Transverso',     sub: 'Segmento horizontal — Intraperitoneal', color: '#cc8866', side: 'right' },
        { id: 'descending', meshIdx: 3, num: 5, name: 'Colon Descendente',    sub: 'Colon izquierdo — Compactación fecal',  color: '#c07050', side: 'left'  },
        { id: 'sigmoid',    meshIdx: 4, num: 6, name: 'Colon Sigmoide',       sub: 'Segmento en S — Diverticulosis',        color: '#b86848', side: 'left'  },
        { id: 'rectum',     meshIdx: 5, num: 7, name: 'Recto',                sub: 'Porción terminal — Canal anal',         color: '#a85840', side: 'left'  },
    ];

    // Etiquetas conceptuales (no mapeadas a una mesh única)
    const conceptDefs = [
        { id: 'mucosa', num: 4, name: 'Mucosa Intestinal', sub: 'Capa interna — Células caliciformes', color: '#dd9988', side: 'right', meshIdx: 1 },
        { id: 'teniae', num: 8, name: 'Tenias y Haustras',  sub: 'Bandas musculares + saculaciones',   color: '#ddaa77', side: 'left',  meshIdx: 3 },
    ];

    const LABELS_CONFIG = [];

    // Etiquetas de segmentos reales
    labelDefs.forEach(def => {
        if (def.meshIdx < meshData.length) {
            const md = meshData[def.meshIdx];
            const anchor = getFrontPoint(md);
            const offsetDir = def.side === 'right' ? 1.6 : -1.6;
            const offset = new THREE.Vector3(
                anchor.x + offsetDir,
                anchor.y + 0.1,
                anchor.z + 0.15
            );
            LABELS_CONFIG.push({
                id: def.id, num: def.num, name: def.name, sub: def.sub,
                color: def.color, side: def.side,
                anchor: anchor,
                offset: offset
            });
        }
    });

    // Etiquetas conceptuales (offset desde una mesh de referencia)
    conceptDefs.forEach(def => {
        if (def.meshIdx < meshData.length) {
            const md = meshData[def.meshIdx];
            const anchor = getFrontPoint(md).clone();
            // Desplazar ligeramente para no solapar con la etiqueta del segmento
            anchor.y += 0.3;
            const offsetDir = def.side === 'right' ? 1.6 : -1.6;
            const offset = new THREE.Vector3(
                anchor.x + offsetDir,
                anchor.y + 0.1,
                anchor.z + 0.15
            );
            LABELS_CONFIG.push({
                id: def.id, num: def.num, name: def.name, sub: def.sub,
                color: def.color, side: def.side,
                anchor: anchor,
                offset: offset
            });
        }
    });

    // Ordenar por número
    LABELS_CONFIG.sort((a, b) => a.num - b.num);

    console.log('📍 Labels config generado:', LABELS_CONFIG.map(l =>
        `#${l.num} ${l.id}: anchor=(${l.anchor.x.toFixed(2)},${l.anchor.y.toFixed(2)},${l.anchor.z.toFixed(2)})`
    ).join('\n'));

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
        .int-label {
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            transform: translate(-50%, -50%);
            transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.16,1,.3,1);
            z-index: 42;
            user-select: none;
        }
        .int-label.hidden-label {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scale(0.5) !important;
            pointer-events: none !important;
        }
        .int-label-num {
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
        .int-label:hover .int-label-num {
            transform: scale(1.2);
            border-color: rgba(255,255,255,0.7);
            box-shadow: 0 0 18px var(--lbl-glow), 0 0 36px var(--lbl-glow);
        }
        .int-label-num::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--lbl-color);
            opacity: 0;
            animation: intPulse 2.8s ease-in-out infinite;
        }
        @keyframes intPulse {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.4); }
        }
        .int-label-tag {
            position: absolute;
            top: 50%;
            background: rgba(12, 16, 22, 0.92);
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
        .int-label-tag .tag-sub {
            display: block;
            font-size: 0.55rem;
            color: #8a94a8;
            margin-top: 1px;
        }
        .int-label.side-right .int-label-tag {
            left: 34px; right: auto;
            transform: translateY(-50%) translateX(-6px);
        }
        .int-label.side-right:hover .int-label-tag,
        .int-label.side-right.active-label .int-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .int-label.side-left .int-label-tag {
            right: 34px; left: auto;
            transform: translateY(-50%) translateX(6px);
        }
        .int-label.side-left:hover .int-label-tag,
        .int-label.side-left.active-label .int-label-tag {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        .int-label.active-label .int-label-num {
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
        el.className = `int-label side-${cfg.side}`;
        el.dataset.part = cfg.id;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-glow', cfg.color + '55');

        el.innerHTML = `
            <div class="int-label-num" style="background:${cfg.color}20; border-color:${cfg.color}50;">
                ${cfg.num}
            </div>
            <div class="int-label-tag">
                <span style="color:${cfg.color};font-weight:700;margin-right:4px;">${cfg.num}</span>
                ${cfg.name}
                <span class="tag-sub">${cfg.sub}</span>
            </div>
        `;
        overlay.appendChild(el);

        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', cfg.color);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-opacity', '0.4');
        line.setAttribute('stroke-dasharray', '4 3');
        svg.appendChild(line);

        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '0.85');
        svg.appendChild(dot);

        const ring = document.createElementNS(svgNS, 'circle');
        ring.setAttribute('r', '6');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', cfg.color);
        ring.setAttribute('stroke-width', '0.8');
        ring.setAttribute('stroke-opacity', '0.3');
        svg.appendChild(ring);

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
    //  BOTÓN TOGGLE
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
    console.log('✅ Intestine Labels: ' + LABELS_CONFIG.length + ' etiquetas AUTO-CALIBRADAS cargadas');

}).catch(err => {
    console.warn('⚠️ Intestine Labels:', err);
});