/**
 * ═══════════════════════════════════════════════════
 *  EYE — Anatomía Ocular Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__EYE_DATA = window.__EYE_DATA || {};

window.__EYE_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#a78bfa',
    items: [
        {
            name: 'Humor Acuoso',
            region: 'Cámara Anterior y Posterior',
            desc: 'Líquido transparente producido por los procesos ciliares (~2.5 μL/min). Llena la cámara posterior (entre iris y cristalino) y anterior (entre iris y córnea). Nutre córnea y cristalino avasculares. Se drena por la malla trabecular y canal de Schlemm. Su equilibrio determina la presión intraocular.',
            datos: [
                { l: 'Producción', v: '~2.5 μL/min' },
                { l: 'Volumen CA', v: '~0.25 mL' },
                { l: 'Drenaje', v: 'Canal Schlemm' },
                { l: 'Recambio', v: '~100 min' }
            ]
        },
        {
            name: 'Humor Vítreo',
            region: 'Cámara Vítrea — 2/3 del Globo',
            desc: 'Gel transparente compuesto por 99% agua, colágeno tipo II y ácido hialurónico. Ocupa 4/5 del volumen ocular (~4 mL). Mantiene la forma del globo y la retina adherida. Con la edad se licuefacciona (sinéresis) y puede desprenderse de la retina (desprendimiento vítreo posterior).',
            datos: [
                { l: 'Volumen', v: '~4 mL' },
                { l: 'Composición', v: '99% agua' },
                { l: 'Índice refr.', v: '1.336' },
                { l: 'Cambio edad', v: 'Sinéresis' }
            ]
        },
        {
            name: 'Cuerpo Ciliar',
            region: 'Úvea Anterior — Detrás del Iris',
            desc: 'Estructura anular que contiene el músculo ciliar (acomodación) y los procesos ciliares (producción de humor acuoso). El músculo ciliar se contrae para relajar las zónulas de Zinn, permitiendo que el cristalino se abombe y enfoque de cerca. También ancla el cristalino.',
            datos: [
                { l: 'Función dual', v: 'Acomod.+H. acuoso' },
                { l: 'Músculo', v: 'Ciliar (liso)' },
                { l: 'Inervación', v: 'Parasimpático' },
                { l: 'Procesos', v: '~70-80' }
            ]
        },
        {
            name: 'Fóvea y Mácula',
            region: 'Retina Central — Polo Posterior',
            desc: 'La mácula (~5.5 mm) es la zona retiniana de mayor densidad de conos. La fóvea (1.5 mm) en su centro solo tiene conos sin capas superpuestas, maximizando la agudeza visual. La fovéola (0.35 mm) es el punto de máxima resolución. El pigmento macular (luteína/zeaxantina) filtra luz azul.',
            datos: [
                { l: 'Mácula Ø', v: '~5.5 mm' },
                { l: 'Fóvea Ø', v: '~1.5 mm' },
                { l: 'Fovéola Ø', v: '~0.35 mm' },
                { l: 'Solo conos', v: 'En fovéola' }
            ]
        },
        {
            name: 'Conjuntiva',
            region: 'Superficie Ocular — Fórnices',
            desc: 'Membrana mucosa transparente que recubre la esclerótica anterior (bulbar) y la cara interna de los párpados (palpebral). Contiene células caliciformes productoras de mucina para la película lagrimal. Los fórnices son los fondos de saco donde se unen ambas porciones.',
            datos: [
                { l: 'Porciones', v: 'Bulbar+Palpebral' },
                { l: 'Secreción', v: 'Mucina (capa int.)' },
                { l: 'Vasos', v: 'Bien vasculariz.' },
                { l: 'Defensa', v: 'MALT (inmune)' }
            ]
        },
        {
            name: 'Músculos Extraoculares',
            region: 'Órbita — Inserción en Esclerótica',
            desc: 'Seis músculos controlan los movimientos oculares: 4 rectos (superior, inferior, medial, lateral) y 2 oblicuos (superior e inferior). El recto lateral (VI par) abduce; el recto medial (III par) aduce. Trabajan coordinadamente para movimientos conjugados y vergencias. La parálisis causa diplopía.',
            datos: [
                { l: 'Total', v: '6 por ojo' },
                { l: 'Pares craneales', v: 'III, IV, VI' },
                { l: 'Movimientos', v: '~100.000/día' },
                { l: 'Parálisis', v: 'Diplopía' }
            ]
        },
        {
            name: 'Sistema Lagrimal',
            region: 'Glándula Lagrimal — Vía de Drenaje',
            desc: 'La glándula lagrimal principal (fórnix superolateral) produce la capa acuosa. Las glándulas de Meibomio (párpados) producen la capa lipídica. La lágrima drena por los puntos lagrimales → canalículos → saco lagrimal → conducto nasolagrimal → meato nasal inferior.',
            datos: [
                { l: 'Producción basal', v: '~1 μL/min' },
                { l: 'Capas película', v: '3 (lip+acu+muc)' },
                { l: 'Espesor película', v: '~3-7 μm' },
                { l: 'Drenaje a', v: 'Meato nasal inf.' }
            ]
        },
        {
            name: 'Cámaras Anterior y Posterior',
            region: 'Segmento Anterior del Ojo',
            desc: 'La cámara anterior (entre córnea e iris) tiene ~3.0 mm de profundidad y contiene ~0.25 mL de humor acuoso. La cámara posterior (entre iris y cristalino) es más pequeña (~0.06 mL). El ángulo iridocorneal en la cámara anterior es el sitio de drenaje del humor acuoso (malla trabecular).',
            datos: [
                { l: 'Prof. CA', v: '~3.0 mm' },
                { l: 'Vol. CA', v: '~0.25 mL' },
                { l: 'Vol. CP', v: '~0.06 mL' },
                { l: 'Ángulo', v: 'Iridocorneal' }
            ]
        }
    ]
};

console.log('✅ Eye Data: Anatomía cargada');
