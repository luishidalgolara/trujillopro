/**
 * ═══════════════════════════════════════════════════
 *  EYE — Fisiología Visual
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__EYE_DATA = window.__EYE_DATA || {};

window.__EYE_DATA.fisiologia = {
    title: 'Fisiología Visual',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Fototransducción',
            region: 'Segmento Externo — Fotorreceptores',
            desc: 'Proceso por el cual la luz se convierte en señal eléctrica. Un fotón isomeriza el 11-cis-retinal a todo-trans-retinal en la rodopsina. Esto activa la transducina (proteína G), que activa fosfodiesterasa, hidroliza cGMP, cierra canales de Na⁺ e hiperpolariza el fotorreceptor (-70 mV).',
            datos: [
                { l: 'Molécula', v: 'Rodopsina' },
                { l: 'Proteína G', v: 'Transducina' },
                { l: 'Señal', v: 'Hiperpolarización' },
                { l: 'Amplificación', v: '×10⁶ por fotón' }
            ]
        },
        {
            name: 'Acomodación',
            region: 'Cristalino — Músculo Ciliar — Zónulas',
            desc: 'Mecanismo de enfoque para visión cercana. El músculo ciliar se contrae (parasimpático) → relaja zónulas de Zinn → el cristalino se abomba aumentando su poder dióptrico. Capacidad máxima en niños (~14 D), disminuye con la edad (presbicia: <2 D a los 50 años, por rigidez del cristalino).',
            datos: [
                { l: 'Niños', v: '~14 D' },
                { l: 'Adulto joven', v: '~8 D' },
                { l: 'Presbicia (50a)', v: '<2 D' },
                { l: 'Triada cercana', v: 'Acom+Conv+Miosis' }
            ]
        },
        {
            name: 'Reflejo Pupilar',
            region: 'Iris — Vía Aferente y Eferente',
            desc: 'Reflejo consensual bilateral. Luz en un ojo → señal vía nervio óptico → núcleo pretectal → ambos núcleos de Edinger-Westphal → nervio oculomotor (III) → ganglio ciliar → esfínter pupilar → miosis bilateral. La midriasis (dilatación) es simpática. Reflejo directo y consensual deben ser iguales.',
            datos: [
                { l: 'Aferente', v: 'Nervio óptico (II)' },
                { l: 'Eferente', v: 'Oculomotor (III)' },
                { l: 'Miosis', v: 'Parasimpático' },
                { l: 'Midriasis', v: 'Simpático' }
            ]
        },
        {
            name: 'Visión Cromática (Color)',
            region: 'Conos — Fóvea — Corteza V4',
            desc: 'Tres tipos de conos con opsinas sensibles a longitudes de onda diferentes: S (azul, ~420 nm), M (verde, ~530 nm) y L (rojo, ~560 nm). La teoría tricromática (Young-Helmholtz) explica la percepción: cada color es una combinación de respuestas de los tres tipos. El daltonismo afecta al ~8% de hombres.',
            datos: [
                { l: 'Conos S', v: '~420 nm (azul)' },
                { l: 'Conos M', v: '~530 nm (verde)' },
                { l: 'Conos L', v: '~560 nm (rojo)' },
                { l: 'Daltonismo', v: '~8% hombres' }
            ]
        },
        {
            name: 'Adaptación Luz / Oscuridad',
            region: 'Fotorreceptores — Pigmento Visual',
            desc: 'Adaptación a la luz: los bastones se saturan, los conos operan. Completa en ~5 minutos. Adaptación a la oscuridad: regeneración de rodopsina en bastones, sensibilidad aumenta hasta 100.000 veces. Completa en ~30-40 minutos. El punto de Purkinje marca el cambio de visión fotópica a escotópica.',
            datos: [
                { l: 'Adapt. luz', v: '~5 min' },
                { l: 'Adapt. oscuridad', v: '30-40 min' },
                { l: 'Ganancia oscur.', v: '×100.000' },
                { l: 'Cambio Purkinje', v: 'Fotópica→Escotóp.' }
            ]
        },
        {
            name: 'Vía Visual al Cerebro',
            region: 'Retina → Quiasma → Corteza V1',
            desc: 'Las células ganglionares envían axones por el nervio óptico al quiasma óptico, donde las fibras nasales se decusan. Las cintillas ópticas llegan al cuerpo geniculado lateral (tálamo) y de allí, por las radiaciones ópticas, a la corteza visual primaria (V1) en el lóbulo occipital.',
            datos: [
                { l: 'Fibras', v: '~1.2 millones/ojo' },
                { l: 'Decusación', v: 'Fibras nasales' },
                { l: 'Relevo', v: 'CGL (tálamo)' },
                { l: 'Corteza', v: 'V1 occipital' }
            ]
        }
    ]
};

console.log('✅ Eye Data: Fisiología cargada');
