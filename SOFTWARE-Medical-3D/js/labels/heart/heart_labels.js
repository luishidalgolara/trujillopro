/**
 * ═══════════════════════════════════════════════════
 *  HEART LABELS — Etiquetas Anatómicas 3D
 *  Plataforma Médica In Silico
 *  20 estructuras — Información 100% verídica
 * ═══════════════════════════════════════════════════
 *
 *  Sistema de coordenadas (modelo escalado 3.2u, centrado):
 *    X neg = lado derecho del paciente (izq pantalla)
 *    X pos = lado izquierdo del paciente (der pantalla)
 *    Y pos = superior    Y neg = inferior
 *    Z pos = anterior    Z neg = posterior
 *
 *  anchor = punto EN la superficie del modelo
 *  offset = punto FLOTANTE del número (alejado del modelo)
 * ═══════════════════════════════════════════════════
 */

import * as THREE from 'three';

function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__HEART3D && window.__HEART3D.scene && window.__HEART3D.camera)
                return resolve(window.__HEART3D);
            if (Date.now() - t0 > maxWait) return reject('Timeout');
            requestAnimationFrame(check);
        })();
    });
}

// ══════════════════════════════════════════════════
//  20 ESTRUCTURAS — DATOS 100% VERÍDICOS
//  Fuentes: Gray's Anatomy 42ª ed., Netter's Atlas,
//  Moore's Clinically Oriented Anatomy 9ª ed.
// ══════════════════════════════════════════════════
const LABELS = [

    // ── IZQUIERDA DE PANTALLA (1–10) ──────────────

    {
        id: 'aorta', num: 1,
        name: 'Aorta',
        system: 'Gran Vaso — Circulación Sistémica',
        desc: 'Arteria más grande del organismo (diámetro ~2.5 cm en adulto). Nace del ventrículo izquierdo a través de la válvula aórtica. Se divide en aorta ascendente, arco aórtico y aorta descendente. Transporta sangre oxigenada a todo el cuerpo. Presión sistólica: 100–140 mmHg.',
        stats: [
            { l: 'Diámetro', v: '~2.5 cm' },
            { l: 'Presión sistólica', v: '100–140 mmHg' },
            { l: 'Flujo en reposo', v: '~5 L/min' },
            { l: 'Pared', v: '3 capas (túnicas)' }
        ],
        color: '#e84545',
        anchor: new THREE.Vector3(0.05, 1.15, 0.35),
        offset: new THREE.Vector3(-2.10, 1.65, 0.3),
        side: 'left'
    },
    {
        id: 'vena_cava_sup', num: 2,
        name: 'Vena Cava Superior',
        system: 'Gran Vaso — Retorno Venoso Sistémico',
        desc: 'Drena sangre desoxigenada de cabeza, cuello, brazos y tórax hacia la aurícula derecha. Longitud ~7 cm, diámetro ~2 cm. Formada por la unión de las venas braquiocefálicas derecha e izquierda. Carece de válvulas. Su obstrucción produce el síndrome de vena cava superior (edema en esclavina).',
        stats: [
            { l: 'Longitud', v: '~7 cm' },
            { l: 'Diámetro', v: '~2 cm' },
            { l: 'Drena', v: 'Cabeza, cuello, MMSS' },
            { l: 'Válvulas', v: 'Ninguna' }
        ],
        color: '#4477dd',
        anchor: new THREE.Vector3(-0.42, 1.05, 0.25),
        offset: new THREE.Vector3(-2.10, 1.20, 0.2),
        side: 'left'
    },
    {
        id: 'art_pulmonar', num: 3,
        name: 'Tronco Pulmonar',
        system: 'Gran Vaso — Circulación Pulmonar',
        desc: 'Único vaso que transporta sangre desoxigenada desde el ventrículo derecho hacia los pulmones. Mide ~5 cm y se divide en arteria pulmonar derecha e izquierda a nivel de la carina traqueal. Presión normal: 15–25/8–15 mmHg (5 veces menor que la aorta). La hipertensión pulmonar se define con presión media >25 mmHg.',
        stats: [
            { l: 'Longitud', v: '~5 cm' },
            { l: 'Presión sistólica', v: '15–25 mmHg' },
            { l: 'Divide en', v: 'A.P. Der. + Izq.' },
            { l: 'HP pulmonar', v: 'Media >25 mmHg' }
        ],
        color: '#5577dd',
        anchor: new THREE.Vector3(-0.28, 0.88, 0.58),
        offset: new THREE.Vector3(-2.10, 0.80, 0.5),
        side: 'left'
    },
    {
        id: 'auricula_izq', num: 4,
        name: 'Aurícula Izquierda',
        system: 'Cámara Cardíaca — Corazón Izquierdo',
        desc: 'Cámara más posterior del corazón. Recibe las 4 venas pulmonares con sangre oxigenada proveniente de los pulmones. Pared delgada: ~3 mm. Su dilatación (>40 mm anteroposterior) comprime el esófago causando disfagia y predispone a fibrilación auricular. Presión media: 8–12 mmHg.',
        stats: [
            { l: 'Pared', v: '~3 mm' },
            { l: 'Recibe', v: '4 venas pulmonares' },
            { l: 'Presión media', v: '8–12 mmHg' },
            { l: 'Diám. normal', v: '<40 mm' }
        ],
        color: '#cc3333',
        anchor: new THREE.Vector3(-0.52, 0.48, -0.05),
        offset: new THREE.Vector3(-2.10, 0.35, -0.1),
        side: 'left'
    },
    {
        id: 'venas_pulm_izq', num: 5,
        name: 'Venas Pulmonares Izq.',
        system: 'Vasos — Retorno Venoso Pulmonar',
        desc: 'Venas pulmonar superior e inferior izquierdas. Conducen sangre oxigenada del pulmón izquierdo a la aurícula izquierda. Son los únicos vasos venosos del organismo que transportan sangre arterializada. El 90% de los focos ectópicos que desencadenan fibrilación auricular se originan en el ostium de las venas pulmonares.',
        stats: [
            { l: 'Número', v: '2 (sup. + inf. izq.)' },
            { l: 'Contenido', v: 'Sangre oxigenada' },
            { l: 'Destino', v: 'Aurícula izquierda' },
            { l: 'FA: origen', v: '~90% en su ostium' }
        ],
        color: '#cc4477',
        anchor: new THREE.Vector3(-0.68, 0.52, 0.15),
        offset: new THREE.Vector3(-2.10, -0.05, 0.1),
        side: 'left'
    },
    {
        id: 'ventriculo_izq', num: 6,
        name: 'Ventrículo Izquierdo',
        system: 'Cámara Cardíaca — Bomba Sistémica',
        desc: 'Principal bomba del organismo. Genera presión de 100–140 mmHg durante la sístole. Pared: 8–12 mm (3–4 veces más gruesa que el VD). Forma el ápex cardíaco. FEVI normal: 55–70%. El volumen sistólico en reposo es ~70 mL. Su disfunción causa insuficiencia cardíaca con fracción de eyección reducida.',
        stats: [
            { l: 'Pared', v: '8–12 mm' },
            { l: 'Presión sistólica', v: '100–140 mmHg' },
            { l: 'FEVI normal', v: '55–70%' },
            { l: 'Vol. sistólico', v: '~70 mL' }
        ],
        color: '#bb2222',
        anchor: new THREE.Vector3(-0.38, -0.42, 0.58),
        offset: new THREE.Vector3(-2.10, -0.55, 0.5),
        side: 'left'
    },
    {
        id: 'coronaria_izq', num: 7,
        name: 'Art. Coronaria Izquierda',
        system: 'Circulación Coronaria — Irrigación Cardíaca',
        desc: 'Nace del seno aórtico izquierdo (de Valsalva). Tras 1–2 cm se bifurca en: Arteria Descendente Anterior (DA) que irriga el septo interventricular y la pared anterior del VI, y Arteria Circunfleja que irriga la pared lateral y posterior del VI. La DA es responsable del 40–50% de la masa miocárdica total.',
        stats: [
            { l: 'Tronco común', v: '1–2 cm' },
            { l: 'Rama DA', v: 'Septo + pared ant.' },
            { l: 'Rama Circunfleja', v: 'Pared lat. + post.' },
            { l: 'Irriga', v: '~60–70% miocardio' }
        ],
        color: '#ff6633',
        anchor: new THREE.Vector3(-0.22, 0.08, 0.68),
        offset: new THREE.Vector3(-2.10, -1.00, 0.5),
        side: 'left'
    },
    {
        id: 'apex', num: 8,
        name: 'Ápex Cardíaco',
        system: 'Referencia Anatómica — Ventrículo Izquierdo',
        desc: 'Punta del corazón formada exclusivamente por el ventrículo izquierdo. Se orienta hacia abajo, adelante y a la izquierda. En adultos, el latido apical (choque de punta) se palpa normalmente en el 5° espacio intercostal izquierdo, en la línea medioclavicular. Su desplazamiento lateral sugiere cardiomegalia.',
        stats: [
            { l: 'Formado por', v: 'Ventrículo izquierdo' },
            { l: 'Proyección', v: '5° EIC izquierdo' },
            { l: 'Línea referencia', v: 'Medioclavicular' },
            { l: 'Desplazado →', v: 'Signo de cardiomegalia' }
        ],
        color: '#cc3333',
        anchor: new THREE.Vector3(-0.08, -1.22, 0.38),
        offset: new THREE.Vector3(-2.10, -1.40, 0.3),
        side: 'left'
    },
    {
        id: 'surco_iv', num: 9,
        name: 'Surco Interventricular Ant.',
        system: 'Referencia Anatómica — Cara Anterior',
        desc: 'Hendidura superficial en la cara anterior del corazón que indica la posición del septo interventricular. Contiene la arteria descendente anterior (DA) y la vena cardíaca magna. Es el límite anatómico entre el ventrículo derecho (a su derecha) y el ventrículo izquierdo (a su izquierda).',
        stats: [
            { l: 'Contiene', v: 'Art. DA + v. magna' },
            { l: 'Indica', v: 'Septo interventricular' },
            { l: 'A su derecha', v: 'Ventrículo derecho' },
            { l: 'A su izquierda', v: 'Ventrículo izquierdo' }
        ],
        color: '#aa6644',
        anchor: new THREE.Vector3(0.10, -0.50, 0.66),
        offset: new THREE.Vector3(-2.10, -1.68, 0.4),
        side: 'left'
    },
    {
        id: 'grasa_epicardica', num: 10,
        name: 'Grasa Epicárdica',
        system: 'Tejido Cardíaco — Depósito Adiposo Visceral',
        desc: 'Tejido adiposo visceral localizado entre el miocardio y el pericardio visceral (epicardio). Volumen promedio: 50–100 mL. Es metabólicamente activo: secreta citocinas proinflamatorias (TNF-α, IL-6) y antiinflamatorias (adiponectina). Su exceso se asocia con mayor riesgo de fibrilación auricular y enfermedad coronaria.',
        stats: [
            { l: 'Volumen normal', v: '50–100 mL' },
            { l: 'Localización', v: 'Bajo pericardio visc.' },
            { l: 'Secreta', v: 'TNF-α, IL-6, adipon.' },
            { l: 'Riesgo asociado', v: 'FA + enf. coronaria' }
        ],
        color: '#ddaa22',
        anchor: new THREE.Vector3(0.12, 0.02, 0.65),
        offset: new THREE.Vector3(-2.10, -2.00, 0.4),
        side: 'left'
    },

    // ── DERECHA DE PANTALLA (11–20) ────────────────

    {
        id: 'aorta_asc', num: 11,
        name: 'Aorta Ascendente',
        system: 'Gran Vaso — Primer Segmento Aórtico',
        desc: 'Primer segmento de la aorta (~5 cm). Nace del ventrículo izquierdo y origina las arterias coronarias desde los senos de Valsalva. Diámetro normal <3.7 cm. Se define aneurisma si >4.5 cm. La disección aórtica tipo A de Stanford afecta este segmento y requiere cirugía de emergencia inmediata.',
        stats: [
            { l: 'Longitud', v: '~5 cm' },
            { l: 'Diámetro normal', v: '<3.7 cm' },
            { l: 'Aneurisma si', v: '>4.5 cm' },
            { l: 'Origina', v: 'Arterias coronarias' }
        ],
        color: '#ee3333',
        anchor: new THREE.Vector3(0.18, 1.12, 0.42),
        offset: new THREE.Vector3(2.10, 1.60, 0.3),
        side: 'right'
    },
    {
        id: 'art_pulm_der', num: 12,
        name: 'Art. Pulmonar Derecha',
        system: 'Gran Vaso — Circulación Pulmonar',
        desc: 'Rama derecha del tronco pulmonar (~5 cm, la más larga). Trayecto horizontal, pasa posterior a la aorta ascendente y vena cava superior. Transporta sangre desoxigenada al pulmón derecho. La embolia pulmonar masiva frecuentemente ocluye este vaso o el tronco, produciendo shock obstructivo.',
        stats: [
            { l: 'Longitud', v: '~5 cm' },
            { l: 'Trayecto', v: 'Horizontal' },
            { l: 'Transporta', v: 'Sangre desoxigenada' },
            { l: 'TEP masivo', v: 'Oclusión frecuente' }
        ],
        color: '#5566cc',
        anchor: new THREE.Vector3(0.55, 0.78, 0.32),
        offset: new THREE.Vector3(2.10, 1.10, 0.2),
        side: 'right'
    },
    {
        id: 'venas_pulm_der', num: 13,
        name: 'Venas Pulmonares Der.',
        system: 'Vasos — Retorno Venoso Pulmonar',
        desc: 'Venas pulmonar superior e inferior derechas. Conducen sangre oxigenada del pulmón derecho hacia la aurícula izquierda, pasando posterior a la aurícula derecha y la vena cava superior. Su ablación por catéter es el tratamiento de elección para aislar los focos ectópicos de fibrilación auricular.',
        stats: [
            { l: 'Número', v: '2 (sup. + inf. der.)' },
            { l: 'Contenido', v: 'Sangre oxigenada' },
            { l: 'Destino', v: 'Aurícula izquierda' },
            { l: 'FA: ablación', v: 'Aislamiento de ostium' }
        ],
        color: '#cc4477',
        anchor: new THREE.Vector3(0.72, 0.52, 0.12),
        offset: new THREE.Vector3(2.10, 0.58, 0.1),
        side: 'right'
    },
    {
        id: 'auricula_der', num: 14,
        name: 'Aurícula Derecha',
        system: 'Cámara Cardíaca — Corazón Derecho',
        desc: 'Recibe sangre desoxigenada de la vena cava superior (parte superior), vena cava inferior (parte inferior) y seno coronario (retorno venoso cardíaco). Contiene el nodo sinusal en la crista terminalis — marcapasos natural del corazón que genera 60–100 impulsos/min. Presión media: 0–8 mmHg.',
        stats: [
            { l: 'Presión media', v: '0–8 mmHg' },
            { l: 'Recibe', v: 'VCS + VCI + seno cor.' },
            { l: 'Nodo sinusal', v: 'En crista terminalis' },
            { l: 'Marcapasos', v: '60–100 impulsos/min' }
        ],
        color: '#7788cc',
        anchor: new THREE.Vector3(0.62, 0.32, 0.48),
        offset: new THREE.Vector3(2.10, 0.05, 0.4),
        side: 'right'
    },
    {
        id: 'ventriculo_der', num: 15,
        name: 'Ventrículo Derecho',
        system: 'Cámara Cardíaca — Bomba Pulmonar',
        desc: 'Bombea sangre desoxigenada hacia los pulmones a través del tronco pulmonar. Presión sistólica normal: 15–30 mmHg (5 veces menor que el VI). Pared delgada: 2–4 mm. En corte transversal tiene forma de media luna. Es el primero en fallar ante hipertensión pulmonar crónica o tromboembolismo pulmonar masivo.',
        stats: [
            { l: 'Pared', v: '2–4 mm' },
            { l: 'Presión sistólica', v: '15–30 mmHg' },
            { l: 'Forma axial', v: 'Media luna' },
            { l: 'Falla ante', v: 'HP + TEP masivo' }
        ],
        color: '#6688bb',
        anchor: new THREE.Vector3(0.52, -0.12, 0.62),
        offset: new THREE.Vector3(2.10, -0.32, 0.5),
        side: 'right'
    },
    {
        id: 'coronaria_der', num: 16,
        name: 'Art. Coronaria Derecha',
        system: 'Circulación Coronaria — Irrigación Cardíaca',
        desc: 'Nace del seno aórtico derecho. Irriga: aurícula derecha, ventrículo derecho, nodo sinusal (60% de casos), nodo auriculoventricular (80–90%) y la pared inferior e inferoseptal del VI. Su oclusión produce infarto de pared inferior (elevación del ST en DII, DIII, aVF) y frecuentes bloqueos auriculoventriculares.',
        stats: [
            { l: 'Nodo sinusal', v: '60% de personas' },
            { l: 'Nodo AV', v: '80–90% de personas' },
            { l: 'Infarto inferior', v: 'DII / DIII / aVF' },
            { l: 'Irriga', v: 'VD + pared inferior VI' }
        ],
        color: '#ff7744',
        anchor: new THREE.Vector3(0.48, 0.18, 0.57),
        offset: new THREE.Vector3(2.10, -0.75, 0.4),
        side: 'right'
    },
    {
        id: 'valvulas', num: 17,
        name: 'Plano Valvular (4 Válvulas)',
        system: 'Válvulas Cardíacas — Esqueleto Fibroso',
        desc: 'Las 4 válvulas se ubican en el mismo plano fibroso. Válvula aórtica (3 valvas semilunares, área normal 3–4 cm²). Válvula mitral/bicúspide (2 valvas, área normal 4–6 cm²). Válvula tricúspide (3 valvas, separa AD de VD). Válvula pulmonar (3 valvas semilunares, separa VD del tronco pulmonar). Solo se abren en una dirección.',
        stats: [
            { l: 'Área válv. aórtica', v: '3–4 cm²' },
            { l: 'Área válv. mitral', v: '4–6 cm²' },
            { l: 'Estenosis aórtica', v: 'Severa <1.0 cm²' },
            { l: 'Estenosis mitral', v: 'Severa <1.5 cm²' }
        ],
        color: '#ddbb88',
        anchor: new THREE.Vector3(0.06, 0.44, 0.40),
        offset: new THREE.Vector3(2.10, -1.20, 0.3),
        side: 'right'
    },
    {
        id: 'septo_iv', num: 18,
        name: 'Septo Interventricular',
        system: 'Estructura Interna — Tabique Cardíaco',
        desc: 'Pared que separa ambos ventrículos. Porción muscular (~2/3 inferiores): 8–12 mm de grosor. Porción membranosa (~1/3 superior): delgada, es el sitio más frecuente de comunicación interventricular (CIV) congénita. En hipertensión pulmonar severa se abomba hacia el VI produciendo el "signo D" en ecocardiografía.',
        stats: [
            { l: 'Espesor muscular', v: '8–12 mm' },
            { l: 'CIV congénita', v: 'En porción membranosa' },
            { l: 'Irrigación', v: 'Arteria DA (ramas sept.)' },
            { l: 'Signo D', v: 'Abombamiento en HP' }
        ],
        color: '#cc8855',
        anchor: new THREE.Vector3(0.06, -0.18, 0.60),
        offset: new THREE.Vector3(2.10, -1.55, 0.3),
        side: 'right'
    },
    {
        id: 'seno_coronario', num: 19,
        name: 'Seno Coronario',
        system: 'Sistema Venoso Coronario — Drenaje',
        desc: 'Principal colector venoso del corazón. Recorre el surco auriculoventricular posterior y desemboca en la aurícula derecha. Recibe la vena cardíaca magna, media y menor. Drena ~75% del retorno venoso coronario. El electrodo de resincronización cardíaca (CRT) se introduce a través de él para estimular la pared lateral del VI.',
        stats: [
            { l: 'Longitud', v: '~3–5 cm' },
            { l: 'Drena', v: '~75% retorno venoso' },
            { l: 'Desemboca', v: 'Aurícula derecha' },
            { l: 'Uso clínico', v: 'CRT (resincroniz.)' }
        ],
        color: '#5599aa',
        anchor: new THREE.Vector3(0.02, 0.22, -0.38),
        offset: new THREE.Vector3(2.10, -1.88, -0.2),
        side: 'right'
    },
    {
        id: 'vena_cava_inf', num: 20,
        name: 'Vena Cava Inferior',
        system: 'Gran Vaso — Retorno Venoso Sistémico',
        desc: 'El vaso venoso de mayor calibre del organismo (~3 cm de diámetro). Drena sangre desoxigenada de abdomen, pelvis y miembros inferiores hacia la aurícula derecha. En ecografía, un diámetro >2.1 cm con colapso inspiratorio menor al 50% indica presión venosa central elevada (>10 cmH₂O), signo de insuficiencia cardíaca derecha.',
        stats: [
            { l: 'Diámetro', v: '~3 cm' },
            { l: 'Drena', v: 'Abdomen, pelvis, MMII' },
            { l: 'Dilatada si', v: '>2.1 cm' },
            { l: 'IC-D si', v: 'Colapso insp. <50%' }
        ],
        color: '#3366aa',
        anchor: new THREE.Vector3(0.28, -0.82, -0.08),
        offset: new THREE.Vector3(2.10, -2.15, -0.1),
        side: 'right'
    }
];

// ══════════════════════════════════════════════════
//  ESTILOS CSS
// ══════════════════════════════════════════════════
const CSS = `
.hrt-label {
    position: absolute;
    pointer-events: auto;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    z-index: 42;
    user-select: none;
}
.hrt-label.hidden-label {
    opacity: 0 !important;
    pointer-events: none !important;
}
.hrt-label-num {
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.58rem; font-weight: 700; color: #fff;
    border: 1.5px solid var(--lbl-color);
    background: var(--lbl-bg);
    box-shadow: 0 0 8px var(--lbl-glow), 0 2px 6px rgba(0,0,0,0.5);
    position: relative; z-index: 2;
    transition: all 0.25s ease;
}
.hrt-label:hover .hrt-label-num,
.hrt-label.active-label .hrt-label-num {
    transform: scale(1.3);
    box-shadow: 0 0 18px var(--lbl-glow), 0 0 32px var(--lbl-glow);
    border-color: rgba(255,255,255,0.9);
}
.hrt-label-num::after {
    content: '';
    position: absolute; inset: -5px; border-radius: 50%;
    border: 1px solid var(--lbl-color); opacity: 0;
    animation: hrtRing 2.5s ease-in-out infinite;
}
@keyframes hrtRing {
    0%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.6); }
}
/* Panel izquierdo scroll */
.hl-panel {
    max-height: calc(100vh - 90px) !important;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.15) transparent;
}
.hl-panel::-webkit-scrollbar { width: 3px; }
.hl-panel::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
/* Badge numérico en panel izquierdo */
.hl-num-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 17px; height: 17px; border-radius: 50%;
    font-family: 'Space Mono', monospace;
    font-size: 0.5rem; font-weight: 700; color: #fff; flex-shrink: 0;
}
`;

// ══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ══════════════════════════════════════════════════
waitForEngine().then(({ scene, camera }) => {

    const styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    // ─────────────────────────────────────────────
    //  RECONSTRUIR PANEL IZQUIERDO con 20 entradas
    // ─────────────────────────────────────────────
    const hlPanel = document.querySelector('.hl-panel');
    if (hlPanel) {
        hlPanel.innerHTML = `<div class="hl-title">Estructuras</div>`;

        const groups = [
            { label: '— Cámaras —',           ids: ['auricula_der','ventriculo_der','auricula_izq','ventriculo_izq'] },
            { label: '— Grandes vasos —',      ids: ['aorta','aorta_asc','vena_cava_sup','vena_cava_inf','art_pulmonar','art_pulm_der'] },
            { label: '— Venas pulmonares —',   ids: ['venas_pulm_der','venas_pulm_izq'] },
            { label: '— Válvulas —',           ids: ['valvulas'] },
            { label: '— Coronarias —',         ids: ['coronaria_izq','coronaria_der'] },
            { label: '— Estructuras —',        ids: ['septo_iv','surco_iv','seno_coronario','grasa_epicardica','apex'] }
        ];

        groups.forEach(g => {
            const sep = document.createElement('div');
            sep.className = 'hl-sep';
            sep.textContent = g.label;
            hlPanel.appendChild(sep);

            g.ids.forEach(id => {
                const cfg = LABELS.find(l => l.id === id);
                if (!cfg) return;
                const btn = document.createElement('button');
                btn.className = 'hl-btn';
                btn.dataset.part = cfg.id;
                btn.innerHTML = `
                    <span class="hl-num-badge" style="background:${cfg.color}dd">${cfg.num}</span>
                    <span style="width:6px;height:6px;border-radius:50%;background:${cfg.color};flex-shrink:0;display:inline-block"></span>
                    ${cfg.name}
                `;
                btn.addEventListener('click', () => selectStructure(cfg.id));
                hlPanel.appendChild(btn);
            });
        });
    }

    // ─────────────────────────────────────────────
    //  ACTUALIZAR PANEL DERECHO (info-panel)
    // ─────────────────────────────────────────────
    function selectStructure(id) {
        const cfg = LABELS.find(l => l.id === id);
        if (!cfg) return;

        // Panel derecho
        const ipTag = document.querySelector('.ip-tag');
        const ipN   = document.getElementById('ipN');
        const ipS   = document.getElementById('ipS');
        const ipD   = document.getElementById('ipD');
        const ipSt  = document.getElementById('ipSt');

        if (ipTag) { ipTag.textContent = `Estructura ${cfg.num}`; ipTag.style.color = cfg.color; }
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

        // Mostrar panel derecho si estaba oculto
        const ip = document.getElementById('ip');
        if (ip) ip.classList.remove('hide');

        // Activar botón en panel izquierdo
        document.querySelectorAll('.hl-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.part === id)
        );

        // Activar etiqueta visual
        labels.forEach(l => l.el.classList.toggle('active-label', l.id === id));
    }

    // ─────────────────────────────────────────────
    //  OVERLAY SVG + ETIQUETAS 3D
    // ─────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'labelsOverlay';
    Object.assign(overlay.style, {
        position: 'fixed', top: '52px', left: '0',
        width: '100%', height: 'calc(100vh - 52px)',
        pointerEvents: 'none', zIndex: '40', overflow: 'hidden'
    });
    document.body.appendChild(overlay);

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    Object.assign(svg.style, { position:'absolute', top:'0', left:'0', width:'100%', height:'100%', pointerEvents:'none' });
    overlay.appendChild(svg);

    const labels = [];

    LABELS.forEach(cfg => {
        const el = document.createElement('div');
        el.className = 'hrt-label';
        el.dataset.part = cfg.id;
        el.style.setProperty('--lbl-color', cfg.color);
        el.style.setProperty('--lbl-bg', cfg.color + '33');
        el.style.setProperty('--lbl-glow', cfg.color + '66');
        el.innerHTML = `<div class="hrt-label-num">${cfg.num}</div>`;
        overlay.appendChild(el);
        el.addEventListener('click', e => { e.stopPropagation(); selectStructure(cfg.id); });

        // Línea guía
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', cfg.color);
        line.setAttribute('stroke-width', '1.2');
        line.setAttribute('stroke-opacity', '0.6');
        line.setAttribute('stroke-dasharray', '5 3');
        svg.appendChild(line);

        // Punto en superficie
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', cfg.color);
        dot.setAttribute('fill-opacity', '1');
        svg.appendChild(dot);

        // Anillo alrededor del punto
        const ring = document.createElementNS(svgNS, 'circle');
        ring.setAttribute('r', '8');
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', cfg.color);
        ring.setAttribute('stroke-width', '1');
        ring.setAttribute('stroke-opacity', '0.45');
        svg.appendChild(ring);

        labels.push({
            el, line, dot, ring,
            anchor3D: cfg.anchor.clone(),
            offset3D: cfg.offset.clone(),
            id: cfg.id
        });
    });

    // Toggle visibilidad
    let labelsVisible = true;
    const toggleBtn = document.getElementById('bLbl');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            labelsVisible = !labelsVisible;
            toggleBtn.classList.toggle('lbl-active', labelsVisible);
            overlay.style.opacity = labelsVisible ? '1' : '0';
        });
    }

    // ─────────────────────────────────────────────
    //  LOOP DE PROYECCIÓN 3D → 2D — Solo exterior
    // ─────────────────────────────────────────────
    const tv = new THREE.Vector3();
    const av = new THREE.Vector3();

    function updateLabels() {
        requestAnimationFrame(updateLabels);
        if (!labelsVisible) return;

        const w = window.innerWidth;
        const h = window.innerHeight - 52;

        labels.forEach(lbl => {
            tv.copy(lbl.offset3D).project(camera);
            const nx = (tv.x * 0.5 + 0.5) * w;
            const ny = (-tv.y * 0.5 + 0.5) * h;

            av.copy(lbl.anchor3D).project(camera);
            const ax = (av.x * 0.5 + 0.5) * w;
            const ay = (-av.y * 0.5 + 0.5) * h;

            const behind = tv.z > 1 || av.z > 1;

            if (behind) {
                lbl.el.classList.add('hidden-label');
                lbl.line.setAttribute('stroke-opacity', '0');
                lbl.dot.setAttribute('fill-opacity', '0');
                lbl.ring.setAttribute('stroke-opacity', '0');
            } else {
                lbl.el.classList.remove('hidden-label');
                lbl.line.setAttribute('stroke-opacity', '0.6');
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

    // Escuchar evento de vista para ocultar/mostrar
    window.addEventListener('heartViewChanged', (e) => {
        const hide = e.detail.view === 'interior';
        labels.forEach(l => {
            l.el.classList.toggle('hidden-label', hide);
            if (hide) {
                l.line.setAttribute('stroke-opacity','0');
                l.dot.setAttribute('fill-opacity','0');
                l.ring.setAttribute('stroke-opacity','0');
            }
        });

        if (!hide) {
            // Restaurar panel izquierdo exterior
            const hlPanel = document.querySelector('.hl-panel');
            if (!hlPanel) return;
            hlPanel.innerHTML = `<div class="hl-title">Estructuras</div>`;
            const groups = [
                { label: '— Cámaras —',           ids: ['auricula_der','ventriculo_der','auricula_izq','ventriculo_izq'] },
                { label: '— Grandes vasos —',      ids: ['aorta','aorta_asc','vena_cava_sup','vena_cava_inf','art_pulmonar','art_pulm_der'] },
                { label: '— Venas pulmonares —',   ids: ['venas_pulm_der','venas_pulm_izq'] },
                { label: '— Válvulas —',           ids: ['valvulas'] },
                { label: '— Coronarias —',         ids: ['coronaria_izq','coronaria_der'] },
                { label: '— Estructuras —',        ids: ['septo_iv','surco_iv','seno_coronario','grasa_epicardica','apex'] }
            ];
            groups.forEach(g => {
                const sep = document.createElement('div');
                sep.className = 'hl-sep'; sep.textContent = g.label;
                hlPanel.appendChild(sep);
                g.ids.forEach(id => {
                    const cfg = LABELS.find(l => l.id === id);
                    if (!cfg) return;
                    const btn = document.createElement('button');
                    btn.className = 'hl-btn'; btn.dataset.part = cfg.id;
                    btn.innerHTML = `<span class="hl-num-badge" style="background:${cfg.color}dd">${cfg.num}</span><span style="width:6px;height:6px;border-radius:50%;background:${cfg.color};flex-shrink:0;display:inline-block"></span>${cfg.name}`;
                    btn.addEventListener('click', () => selectStructure(cfg.id));
                    hlPanel.appendChild(btn);
                });
            });

            // Restaurar panel derecho
            const ipTag = document.querySelector('.ip-tag');
            const ipN = document.getElementById('ipN');
            const ipS = document.getElementById('ipS');
            const ipD = document.getElementById('ipD');
            const ipSt = document.getElementById('ipSt');
            if (ipTag) { ipTag.textContent = 'Información Anatómica'; ipTag.style.color = '#c0312a'; }
            if (ipN)  ipN.textContent = 'Corazón Humano';
            if (ipS)  { ipS.textContent = 'Sistema Cardiovascular'; ipS.style.color = ''; }
            if (ipD)  ipD.textContent = 'Órgano muscular hueco que funciona como bomba doble. El lado derecho recibe sangre desoxigenada y la envía a los pulmones; el izquierdo recibe sangre oxigenada y la impulsa al resto del cuerpo a través de la aorta.';
            if (ipSt) ipSt.innerHTML = `
                <div class="st-card"><div class="st-label">Peso</div><div class="st-val">~300 g</div></div>
                <div class="st-card"><div class="st-label">Frecuencia</div><div class="st-val">60-100 bpm</div></div>
                <div class="st-card"><div class="st-label">Gasto cardíaco</div><div class="st-val">~5 L/min</div></div>
                <div class="st-card"><div class="st-label">Cámaras</div><div class="st-val">4</div></div>`;
        }
    });

    updateLabels();
    console.log(`✅ Heart Labels Exterior: ${LABELS.length} etiquetas cargadas`);

}).catch(err => console.warn('⚠️ Heart Labels:', err));