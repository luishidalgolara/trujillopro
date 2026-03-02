/**
 * ═══════════════════════════════════════════════════
 *  HEART LABELS — CORTE ANATÓMICO (Vista Interior)
 *  Plataforma Médica In Silico
 *
 *  Archivo independiente — solo se activa cuando
 *  el usuario cambia a la vista de corte.
 *
 *  Modelo: anatomia-corazon.glb (corte coronal)
 *  Coordenadas calibradas para vista anterior
 *
 *  Fuentes:
 *    · Gray's Anatomy 42ª ed.
 *    · Netter's Atlas of Human Anatomy 7ª ed.
 *    · Moore's Clinically Oriented Anatomy 9ª ed.
 *    · AHA/ACC Valve Guidelines 2021
 * ═══════════════════════════════════════════════════
 *
 *  Sistema de coordenadas (modelo escalado ~3.2u):
 *    X neg = derecha del paciente (izq pantalla)
 *    X pos = izquierda del paciente (der pantalla)
 *    Y pos = superior   Y neg = inferior
 *    Z pos = anterior   Z neg = posterior
 *
 *  anchor = punto EN la superficie del corte
 *  offset = número flotante alejado del modelo
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 12000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__HEART3D?.scene && window.__HEART3D?.camera)
                return resolve(window.__HEART3D);
            if (Date.now() - t0 > maxWait) return reject('Timeout esperando engine');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  12 ESTRUCTURAS DEL CORTE — DATOS 100% VERÍDICOS
//  Basado en: imagen corte coronal anterior,
//  nomenclatura anatómica Terminologia Anatomica
// ══════════════════════════════════════════════════
const CORTE_LABELS = [

    // ─── IZQUIERDA PANTALLA (A–F) ─────────────────

    {
        id: 'valv_aortica', num: 'A',
        name: 'Válvula Aórtica',
        system: 'Sistema Valvular — Tracto de Salida VI',
        desc: 'Tres valvas semilunares (coronaria derecha, coronaria izquierda y no coronaria). Área normal: 3–4 cm². En estenosis severa el área cae a <1.0 cm² con gradiente medio >40 mmHg. La causa más frecuente en mayores de 65 años es la calcificación degenerativa. En menores de 65 años predomina la válvula bicúspide congénita (prevalencia 1–2%).',
        stats: [
            { l: 'Área normal', v: '3–4 cm²' },
            { l: 'Estenosis severa', v: '<1.0 cm²' },
            { l: 'Valvas', v: '3 semilunares' },
            { l: 'Etiología <65a', v: 'Bicúspide congénita' }
        ],
        color: '#ff9944',
        // Parte superior central — salida aorta
        anchor: new THREE.Vector3(0.05, 0.62, 0.52),
        offset: new THREE.Vector3(-2.20, 1.50, 0.4),
        side: 'left'
    },
    {
        id: 'valv_pulmonar', num: 'B',
        name: 'Válvula Pulmonar',
        system: 'Sistema Valvular — Tracto de Salida VD',
        desc: 'Tres valvas semilunares (anterior, derecha e izquierda). Separa el ventrículo derecho del tronco pulmonar. Gradiente transvalvular normal <10 mmHg. Estenosis severa si gradiente >64 mmHg. La estenosis pulmonar valvular congénita es la segunda cardiopatía congénita más frecuente. La insuficiencia crónica es la secuela más común tras corrección de Tetralogía de Fallot.',
        stats: [
            { l: 'Valvas', v: '3 semilunares' },
            { l: 'Gradiente normal', v: '<10 mmHg' },
            { l: 'Estenosis severa', v: '>64 mmHg' },
            { l: 'Secuela Fallot', v: 'Insuf. pulmonar' }
        ],
        color: '#7799cc',
        // Superior izquierdo — tronco pulmonar
        anchor: new THREE.Vector3(-0.32, 0.70, 0.48),
        offset: new THREE.Vector3(-2.20, 0.90, 0.4),
        side: 'left'
    },
    {
        id: 'valv_tricuspide', num: 'C',
        name: 'Válvula Tricúspide',
        system: 'Sistema Valvular — Corazón Derecho',
        desc: 'Tres valvas: anterior (la mayor), posterior y septal. Área normal: 7–9 cm². Separa la aurícula derecha del ventrículo derecho. La insuficiencia tricuspídea funcional por dilatación del VD es la causa más frecuente en adultos. Clínicamente produce ingurgitación yugular, hepatomegalia pulsátil y edema periférico. La reparación es preferida a la sustitución.',
        stats: [
            { l: 'Área normal', v: '7–9 cm²' },
            { l: 'Valvas', v: 'Ant + Post + Septal' },
            { l: 'Causa frec.', v: 'Insuf. funcional (VD)' },
            { l: 'Tratamiento', v: 'Reparación > reemplazo' }
        ],
        color: '#88aadd',
        // Derecha del corte, entre AD y VD
        anchor: new THREE.Vector3(0.48, 0.28, 0.42),
        offset: new THREE.Vector3(-2.20, 0.15, 0.3),
        side: 'left'
    },
    {
        id: 'valv_mitral', num: 'D',
        name: 'Válvula Mitral (Bicúspide)',
        system: 'Sistema Valvular — Corazón Izquierdo',
        desc: 'Única válvula del corazón con 2 valvas (anterior y posterior). Área normal: 4–6 cm². La valva anterior es más grande y tiene mayor movilidad. Estenosis severa: área <1.5 cm² o gradiente medio >10 mmHg. La causa más frecuente de estenosis es la fiebre reumática. El prolapso valvular mitral afecta al 2–3% de la población general.',
        stats: [
            { l: 'Área normal', v: '4–6 cm²' },
            { l: 'Estenosis severa', v: '<1.5 cm²' },
            { l: 'Valvas', v: 'Anterior + Posterior' },
            { l: 'Prolapso', v: '2–3% población' }
        ],
        color: '#ddbb44',
        // Centro — entre AI y VI
        anchor: new THREE.Vector3(-0.08, 0.35, 0.50),
        offset: new THREE.Vector3(-2.20, -0.55, 0.3),
        side: 'left'
    },
    {
        id: 'musc_papilares', num: 'E',
        name: 'Músculo Papilar',
        system: 'Aparato Subvalvular — Ventrículo Izquierdo',
        desc: 'Proyecciones musculares del miocardio ventricular que sostienen las cuerdas tendinosas. En el VI hay dos: anterolateral (doble irrigación: DA + Circunfleja, más resistente) y posteromedial (irrigado solo por ACD o Circunfleja según dominancia — más vulnerable al infarto inferior). Su rotura aguda produce insuficiencia mitral aguda severa con edema pulmonar fulminante.',
        stats: [
            { l: 'En VI', v: '2 (ant. + posteromedial)' },
            { l: 'Anterolateral', v: 'Doble irrigación' },
            { l: 'Posteromedial', v: 'Una sola arteria' },
            { l: 'Rotura →', v: 'Insuf. mitral aguda' }
        ],
        color: '#cc3333',
        // Izquierdo inferior — VI
        anchor: new THREE.Vector3(-0.28, -0.45, 0.52),
        offset: new THREE.Vector3(-2.20, -1.20, 0.3),
        side: 'left'
    },
    {
        id: 'cuerdas_tend', num: 'F',
        name: 'Cuerdas Tendinosas',
        system: 'Aparato Subvalvular — Tejido Fibroso',
        desc: 'Cordones fibrosos de colágeno tipo I que conectan los músculos papilares con los bordes libres y la cara ventricular de las valvas mitral y tricúspide. Tienen tres órdenes: primarias (al borde libre), secundarias (a la cara ventricular) y terciarias (al cuerpo valvular). Previenen la eversión valvular durante la sístole. Su rotura aguda (endocarditis, degeneración mixomatosa, infarto) causa insuficiencia valvular aguda severa.',
        stats: [
            { l: 'Composición', v: 'Colágeno tipo I' },
            { l: 'Válvulas', v: 'Mitral y tricúspide' },
            { l: 'Función', v: 'Anti-prolapso valvular' },
            { l: 'Rotura aguda →', v: 'Edema pulmonar' }
        ],
        color: '#ddaa55',
        // Inferior centro — entre papilares y válvula
        anchor: new THREE.Vector3(-0.15, -0.20, 0.55),
        offset: new THREE.Vector3(-2.20, -1.80, 0.3),
        side: 'left'
    },

    // ─── DERECHA PANTALLA (G–L) ───────────────────

    {
        id: 'auricula_der_int', num: 'G',
        name: 'Aurícula Derecha (Interior)',
        system: 'Cámara Cardíaca — Recepción Venosa',
        desc: 'Pared interna con dos zonas: lisa (derivada del seno venoso, donde desembocan VCS, VCI y seno coronario) y trabeculada (orejuela derecha, con músculos pectíneos). La crista terminalis separa ambas zonas y contiene el nodo sinusal. La fosa oval en el septo interauricular es el remanente del foramen oval fetal.',
        stats: [
            { l: 'Presión media', v: '2–6 mmHg' },
            { l: 'Nodo sinusal', v: 'En crista terminalis' },
            { l: 'Fosa oval', v: 'Remanente f. oval' },
            { l: 'Recibe', v: 'VCS + VCI + seno cor.' }
        ],
        color: '#7788cc',
        // Derecha superior del corte — AD
        anchor: new THREE.Vector3(0.58, 0.42, 0.38),
        offset: new THREE.Vector3(2.20, 1.45, 0.3),
        side: 'right'
    },
    {
        id: 'ventriculo_der_int', num: 'H',
        name: 'Ventrículo Derecho (Interior)',
        system: 'Cámara Cardíaca — Bomba Pulmonar',
        desc: 'Interior con abundantes trabéculas carnosas y la banda moderadora (trabecula septomarginalis) que contiene la rama derecha del haz de His. El tracto de entrada recibe sangre desde la tricúspide; el tracto de salida o infundíbulo conduce hacia la pulmonar. En hipertensión pulmonar, el septo interventricular se abomba hacia el VI (signo D en ecografía).',
        stats: [
            { l: 'Presión sistólica', v: '15–30 mmHg' },
            { l: 'Pared', v: '2–4 mm' },
            { l: 'Banda moderadora', v: 'Contiene rama D His' },
            { l: 'Signo D', v: 'Abombamiento septo' }
        ],
        color: '#6688bb',
        // Derecha, zona media del corte — VD
        anchor: new THREE.Vector3(0.42, -0.05, 0.55),
        offset: new THREE.Vector3(2.20, 0.65, 0.3),
        side: 'right'
    },
    {
        id: 'septo_iv_int', num: 'I',
        name: 'Septo Interventricular',
        system: 'Tabique Cardíaco — División Ventricular',
        desc: 'Divide los dos ventrículos. Porción muscular (inferior, 2/3): grosor 8–12 mm, irrigada por ramas septales de la arteria descendente anterior y posterior. Porción membranosa (superior, 1/3): muy delgada, localización más frecuente de la comunicación interventricular (CIV) congénita. Es visible en el corte como la banda central entre los ventrículos.',
        stats: [
            { l: 'Espesor muscular', v: '8–12 mm' },
            { l: 'Irrigación', v: 'Ramas septales DA' },
            { l: 'CIV', v: 'En porción membranosa' },
            { l: 'Visible en corte', v: 'Banda central' }
        ],
        color: '#cc8855',
        // Centro del corte entre VD y VI
        anchor: new THREE.Vector3(0.08, -0.15, 0.58),
        offset: new THREE.Vector3(2.20, -0.20, 0.3),
        side: 'right'
    },
    {
        id: 'ventriculo_izq_int', num: 'J',
        name: 'Ventrículo Izquierdo (Interior)',
        system: 'Cámara Cardíaca — Bomba Sistémica',
        desc: 'Cámara de mayor presión del organismo. Paredes con trabéculas finas y dos grupos de músculos papilares. Tracto de entrada: desde la válvula mitral. Tracto de salida: hacia la válvula aórtica. La fracción de eyección normal es 55–70%. La hipertrofia concéntrica (pared >12 mm sin dilatación) es adaptación a sobrecarga de presión (HTA, estenosis aórtica). La dilatación excéntrica indica sobrecarga de volumen.',
        stats: [
            { l: 'Presión sistólica', v: '100–140 mmHg' },
            { l: 'Pared', v: '8–12 mm' },
            { l: 'FEVI normal', v: '55–70%' },
            { l: 'Hipertrofia si', v: 'Pared >12 mm' }
        ],
        color: '#bb2222',
        // Izquierdo inferior del corte — VI
        anchor: new THREE.Vector3(-0.42, -0.48, 0.48),
        offset: new THREE.Vector3(2.20, -0.90, 0.3),
        side: 'right'
    },
    {
        id: 'trabeculas_int', num: 'K',
        name: 'Trabéculas Carnosas',
        system: 'Miocardio — Superficie Endocárdica',
        desc: 'Crestas y puentes musculares irregulares que recubren la superficie interna de los ventrículos. Aumentan la superficie de contacto entre sangre y miocardio sin aumentar el volumen ni la masa. La trabecula septomarginalis (banda moderadora) del VD es la más prominente y conduce la rama derecha del haz de His. La miocardiopatía no compactada se define por trabeculación excesiva del VI (relación NC/C >2.3 en adultos).',
        stats: [
            { l: 'Localización', v: 'Superficie endocárdica' },
            { l: 'Banda moderadora', v: 'VD → rama D His' },
            { l: 'MNC adultos', v: 'NC/C ratio >2.3' },
            { l: 'Riesgo MNC', v: 'IC + arritmias + TEE' }
        ],
        color: '#aa3333',
        // Inferior derecho — VD trabeculado
        anchor: new THREE.Vector3(0.32, -0.60, 0.52),
        offset: new THREE.Vector3(2.20, -1.55, 0.3),
        side: 'right'
    },
    {
        id: 'septo_interaur', num: 'L',
        name: 'Septo Interauricular + Fosa Oval',
        system: 'Tabique Cardíaco — División Auricular',
        desc: 'Pared delgada entre ambas aurículas. Su zona central es la fosa oval (fossa ovalis), depresión ovalada que es el remanente del foramen oval fetal. El foramen oval permeable (FOP) persiste en ~25–27% de la población y es vía potencial de embolismo paradójico. La CIA tipo ostium secundum es el defecto en esta zona y representa ~75% de las CIAs, siendo la cardiopatía congénita más frecuente en adultos.',
        stats: [
            { l: 'Fosa oval', v: 'Remanente f. oval' },
            { l: 'FOP prevalencia', v: '~25–27%' },
            { l: 'CIA tipo II', v: '~75% de todas CIAs' },
            { l: 'Embolismo', v: 'Paradójico por FOP' }
        ],
        color: '#9988cc',
        // Centro superior — entre aurículas
        anchor: new THREE.Vector3(0.22, 0.48, 0.32),
        offset: new THREE.Vector3(2.20, -2.20, 0.2),
        side: 'right'
    }
];

// ══════════════════════════════════════════════════
//  ESTILOS PROPIOS DEL ARCHIVO DE CORTE
// ══════════════════════════════════════════════════
const CSS_CORTE = `
/* Etiquetas del corte usan letras → badge ligeramente diferente */
.corte-label {
    position: absolute;
    pointer-events: auto;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    z-index: 42;
    user-select: none;
    display: none; /* ocultas por defecto */
}
.corte-label.corte-visible {
    display: block;
}
.corte-label.corte-hidden {
    opacity: 0 !important;
    pointer-events: none !important;
}
.corte-label-num {
    width: 26px; height: 26px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.62rem; font-weight: 700; color: #fff;
    border: 1.5px solid var(--lbl-color);
    background: var(--lbl-bg);
    box-shadow: 0 0 8px var(--lbl-glow), 0 2px 6px rgba(0,0,0,0.5);
    position: relative; z-index: 2;
    transition: all 0.25s ease;
}
.corte-label:hover .corte-label-num,
.corte-label.corte-active .corte-label-num {
    transform: scale(1.3);
    box-shadow: 0 0 18px var(--lbl-glow), 0 0 32px var(--lbl-glow);
    border-color: rgba(255,255,255,0.9);
}
.corte-label-num::after {
    content: '';
    position: absolute; inset: -5px; border-radius: 50%;
    border: 1px solid var(--lbl-color); opacity: 0;
    animation: corteRing 3s ease-in-out infinite;
}
@keyframes corteRing {
    0%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(1.65); }
}
`;

// ══════════════════════════════════════════════════
//  GRUPOS PARA PANEL IZQUIERDO — VISTA INTERIOR
// ══════════════════════════════════════════════════
const CORTE_GROUPS = [
    { label: '— Válvulas —',            ids: ['valv_aortica','valv_pulmonar','valv_tricuspide','valv_mitral'] },
    { label: '— Cámaras (interior) —',  ids: ['auricula_der_int','ventriculo_der_int','ventriculo_izq_int'] },
    { label: '— Tabiques —',            ids: ['septo_iv_int','septo_interaur'] },
    { label: '— Aparato Subvalvular —', ids: ['musc_papilares','cuerdas_tend','trabeculas_int'] }
];

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(({ camera }) => {

    // Inyectar estilos
    const styleEl = document.createElement('style');
    styleEl.textContent = CSS_CORTE;
    document.head.appendChild(styleEl);

    // ── Reutilizar overlay del heart_labels.js principal ──
    // Si ya existe lo usamos; si no, creamos uno propio
    let overlay = document.getElementById('labelsOverlay');
    let svg = overlay ? overlay.querySelector('svg') : null;

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'labelsOverlay';
        Object.assign(overlay.style, {
            position: 'fixed', top: '52px', left: '0',
            width: '100%', height: 'calc(100vh - 52px)',
            pointerEvents: 'none', zIndex: '40', overflow: 'hidden'
        });
        document.body.appendChild(overlay);
    }

    if (!svg) {
        const svgNS = 'http://www.w3.org/2000/svg';
        svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
        Object.assign(svg.style, { position:'absolute', top:'0', left:'0', width:'100%', height:'100%', pointerEvents:'none' });
        overlay.appendChild(svg);
    }

    const svgNS = 'http://www.w3.org/2000/svg';

    // ── Función actualizar panel derecho ──
    function selectCorte(id) {
        const cfg = CORTE_LABELS.find(l => l.id === id);
        if (!cfg) return;

        const ipTag = document.querySelector('.ip-tag');
        const ipN   = document.getElementById('ipN');
        const ipS   = document.getElementById('ipS');
        const ipD   = document.getElementById('ipD');
        const ipSt  = document.getElementById('ipSt');

        if (ipTag) { ipTag.textContent = `Estructura ${cfg.num} — Interior`; ipTag.style.color = cfg.color; }
        if (ipN)   { ipN.textContent = cfg.name; }
        if (ipS)   { ipS.textContent = cfg.system; ipS.style.color = cfg.color; }
        if (ipD)   { ipD.textContent = cfg.desc; }
        if (ipSt)  {
            ipSt.innerHTML = cfg.stats.map(s => `
                <div class="st-card">
                    <div class="st-label">${s.l}</div>
                    <div class="st-val" style="color:${cfg.color}">${s.v}</div>
                </div>
            `).join('');
        }

        const ip = document.getElementById('ip');
        if (ip) ip.classList.remove('hide');

        // Marcar activo en panel izq y etiqueta
        document.querySelectorAll('.hl-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.part === id)
        );
        corteLabels.forEach(l => l.el.classList.toggle('corte-active', l.id === id));
    }

    // ── Función reconstruir panel izquierdo (vista interior) ──
    function buildInteriorPanel() {
        const hlPanel = document.querySelector('.hl-panel');
        if (!hlPanel) return;
        hlPanel.innerHTML = `<div class="hl-title">Anatomía Interior</div>`;

        CORTE_GROUPS.forEach(g => {
            const sep = document.createElement('div');
            sep.className = 'hl-sep'; sep.textContent = g.label;
            hlPanel.appendChild(sep);

            g.ids.forEach(id => {
                const cfg = CORTE_LABELS.find(l => l.id === id);
                if (!cfg) return;
                const btn = document.createElement('button');
                btn.className = 'hl-btn'; btn.dataset.part = cfg.id;
                btn.innerHTML = `
                    <span style="
                        display:inline-flex;align-items:center;justify-content:center;
                        width:18px;height:18px;border-radius:50%;
                        background:${cfg.color}dd;
                        font-family:'Space Mono',monospace;font-size:0.52rem;
                        font-weight:700;color:#fff;flex-shrink:0;
                    ">${cfg.num}</span>
                    <span style="width:6px;height:6px;border-radius:50%;background:${cfg.color};flex-shrink:0;display:inline-block"></span>
                    ${cfg.name}
                `;
                btn.addEventListener('click', () => selectCorte(cfg.id));
                hlPanel.appendChild(btn);
            });
        });

        // Panel derecho inicial — vista interior
        const ipTag = document.querySelector('.ip-tag');
        const ipN   = document.getElementById('ipN');
        const ipS   = document.getElementById('ipS');
        const ipD   = document.getElementById('ipD');
        const ipSt  = document.getElementById('ipSt');
        if (ipTag) { ipTag.textContent = 'Vista Interior — Corte Anatómico'; ipTag.style.color = '#a855f7'; }
        if (ipN)   ipN.textContent = 'Anatomía Interna';
        if (ipS)   { ipS.textContent = 'Estructuras Internas Cardíacas'; ipS.style.color = '#a855f7'; }
        if (ipD)   ipD.textContent = 'Selecciona una estructura del panel izquierdo o haz clic en una etiqueta para ver información anatómica detallada con datos clínicos verificados.';
        if (ipSt)  ipSt.innerHTML = `
            <div class="st-card"><div class="st-label">Válvulas</div><div class="st-val" style="color:#a855f7">4</div></div>
            <div class="st-card"><div class="st-label">Tabiques</div><div class="st-val" style="color:#a855f7">2</div></div>
            <div class="st-card"><div class="st-label">Subvalvular</div><div class="st-val" style="color:#a855f7">3 est.</div></div>
            <div class="st-card"><div class="st-label">Etiquetas</div><div class="st-val" style="color:#a855f7">${CORTE_LABELS.length}</div></div>
        `;
    }

    // ── Crear etiquetas (ocultas inicialmente) ──
    const corteLabels = [];

    CORTE_LABELS.forEach(cfg => {
        const el = document.createElement('div');
        el.className = 'corte-label'; // oculto por defecto (display:none)
        el.dataset.part = cfg.id;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-bg', cfg.color + '33');
        el.style.setProperty('--lbl-glow', cfg.color + '66');
        el.innerHTML = `<div class="corte-label-num">${cfg.num}</div>`;
        overlay.appendChild(el);
        el.addEventListener('click', e => { e.stopPropagation(); selectCorte(cfg.id); });

        // Línea guía
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', cfg.color);
        line.setAttribute('stroke-width', '1.2');
        line.setAttribute('stroke-opacity', '0');
        line.setAttribute('stroke-dasharray', '5 3');
        svg.appendChild(line);

        // Punto de anclaje en superficie
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '0');
        svg.appendChild(dot);

        // Anillo exterior del punto
        const ring = document.createElementNS(svgNS, 'circle');
        ring.setAttribute('r', '8');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', cfg.color);
        ring.setAttribute('stroke-width', '1');
        ring.setAttribute('stroke-opacity', '0');
        svg.appendChild(ring);

        corteLabels.push({
            el, line, dot, ring,
            anchor3D: cfg.anchor.clone(),
            offset3D: cfg.offset.clone(),
            id: cfg.id,
            active: false
        });
    });

    // ── Escuchar cambio de vista ──
    let isActive = false;

    window.addEventListener('heartViewChanged', (e) => {
        isActive = e.detail.view === 'interior';

        corteLabels.forEach(l => {
            if (isActive) {
                l.el.classList.add('corte-visible');
                l.el.classList.remove('corte-hidden');
            } else {
                l.el.classList.remove('corte-visible');
                l.el.classList.remove('corte-active');
                l.line.setAttribute('stroke-opacity', '0');
                l.dot.setAttribute('fill-opacity', '0');
                l.ring.setAttribute('stroke-opacity', '0');
            }
        });

        if (isActive) buildInteriorPanel();
    });

    // ── Loop de proyección 3D → 2D ──
    const tv = new THREE.Vector3();
    const av = new THREE.Vector3();

    let labelsVisible = true;

    // Sincronizar con el toggle #bLbl del index
    const toggleBtn = document.getElementById('bLbl');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            labelsVisible = toggleBtn.classList.contains('lbl-active');
        });
    }

    function updateCorteLabels() {
        requestAnimationFrame(updateCorteLabels);
        if (!isActive || !labelsVisible) return;

        const w = window.innerWidth;
        const h = window.innerHeight - 52;

        corteLabels.forEach(lbl => {
            tv.copy(lbl.offset3D).project(camera);
            const nx = (tv.x * 0.5 + 0.5) * w;
            const ny = (-tv.y * 0.5 + 0.5) * h;

            av.copy(lbl.anchor3D).project(camera);
            const ax = (av.x * 0.5 + 0.5) * w;
            const ay = (-av.y * 0.5 + 0.5) * h;

            const hidden = lbl.el.classList.contains('corte-hidden') || tv.z > 1 || av.z > 1;

            if (hidden) {
                lbl.line.setAttribute('stroke-opacity', '0');
                lbl.dot.setAttribute('fill-opacity', '0');
                lbl.ring.setAttribute('stroke-opacity', '0');
            } else {
                lbl.line.setAttribute('stroke-opacity', '0.65');
                lbl.dot.setAttribute('fill-opacity', '1');
                lbl.ring.setAttribute('stroke-opacity', '0.45');
            }

            lbl.el.style.left = nx + 'px';
            lbl.el.style.top  = ny + 'px';
            lbl.line.setAttribute('x1', ax); lbl.line.setAttribute('y1', ay);
            lbl.line.setAttribute('x2', nx); lbl.line.setAttribute('y2', ny);
            lbl.dot.setAttribute('cx', ax);  lbl.dot.setAttribute('cy', ay);
            lbl.ring.setAttribute('cx', ax); lbl.ring.setAttribute('cy', ay);
        });
    }

    updateCorteLabels();
    console.log(`✅ Heart Labels Corte: ${CORTE_LABELS.length} etiquetas interiores listas`);

}).catch(err => console.warn('⚠️ Heart Labels Corte:', err));
