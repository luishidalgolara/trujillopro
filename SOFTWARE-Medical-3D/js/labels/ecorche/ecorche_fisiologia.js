/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ — Fisiología Muscular
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__ECORCHE_DATA = window.__ECORCHE_DATA || {};

window.__ECORCHE_DATA.fisiologia = {
    title: 'Fisiología Muscular',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Ciclo de Puentes Cruzados',
            region: 'Sarcómero — Actina/Miosina',
            desc: 'La contracción muscular ocurre por el ciclo de puentes cruzados: 1) Miosina-ADP se une a actina. 2) Golpe de fuerza: cabeza de miosina pivota 45° arrastrando actina (deslizamiento). 3) ATP se une a miosina y la desacopla de actina. 4) Hidrólisis de ATP re-amartilla la cabeza de miosina. Sin ATP, los puentes quedan fijos (rigidez cadavérica).',
            datos: [
                { l: 'Energía', v: '1 ATP/ciclo/puente' },
                { l: 'Velocidad', v: '~5-50 ciclos/seg' },
                { l: 'Sin ATP', v: 'Rigor mortis' },
                { l: 'Regulador', v: 'Ca²⁺ → Troponina C' }
            ]
        },
        {
            name: 'Acoplamiento Excitación-Contracción',
            region: 'Sarcolema → Túbulo T → RS → Sarcómero',
            desc: 'El potencial de acción viaja por el sarcolema y penetra al interior de la fibra por los túbulos T. Los sensores de voltaje (DHPR) activan los receptores de rianodina (RyR1) del retículo sarcoplásmico, liberando Ca²⁺ masivamente. El Ca²⁺ se une a troponina C, desplaza tropomiosina y expone los sitios de unión de actina para la miosina.',
            datos: [
                { l: 'Sensor voltaje', v: 'DHPR (túbulo T)' },
                { l: 'Canal Ca²⁺', v: 'RyR1 (RS)' },
                { l: 'Ca²⁺ activación', v: '>10⁻⁵ M' },
                { l: 'Latencia', v: '~2 ms' }
            ]
        },
        {
            name: 'Tipos de Fibras Musculares',
            region: 'Fibras Tipo I, IIa, IIx',
            desc: 'Tipo I (lentas, oxidativas): alta densidad mitocondrial, mioglobina y capilares; resistentes a la fatiga, color rojo. Tipo IIa (rápidas, oxidativas-glucolíticas): intermedias, versátiles. Tipo IIx (rápidas, glucolíticas): máxima fuerza/velocidad pero baja resistencia a fatiga. La proporción es genéticamente determinada pero el entrenamiento modula IIa↔IIx.',
            datos: [
                { l: 'Tipo I', v: 'Lentas, oxidativas' },
                { l: 'Tipo IIa', v: 'Rápidas, mixtas' },
                { l: 'Tipo IIx', v: 'Rápidas, glucolíticas' },
                { l: 'Determinación', v: '~45% genética' }
            ]
        },
        {
            name: 'Sistemas Energéticos Musculares',
            region: 'Sarcoplasma — Mitocondria',
            desc: 'Tres sistemas proveen ATP secuencialmente: 1) Fosfágeno (ATP-PCr): inmediato, ~10 seg, potencia máxima. 2) Glucólisis anaeróbica: 10 seg-2 min, produce lactato. 3) Oxidativo (aeróbico): >2 min, usa glucosa y ácidos grasos, 36-38 ATP/glucosa vs 2 ATP anaeróbico. Los tres coexisten en proporción variable según intensidad y duración del esfuerzo.',
            datos: [
                { l: 'Fosfágeno', v: '~10 seg (máx potencia)' },
                { l: 'Glucólisis anaer.', v: '10s-2 min' },
                { l: 'Oxidativo', v: '>2 min (sostenible)' },
                { l: 'ATP aeróbico', v: '36-38/glucosa' }
            ]
        },
        {
            name: 'Hipertrofia Muscular',
            region: 'Mionúcleos — Células Satélite',
            desc: 'El aumento de tamaño de las fibras musculares ocurre por incremento del contenido de miofibrillas (hipertrofia miofibrilar) y/o del sarcoplasma (hipertrofia sarcoplasmática). La tensión mecánica activa la vía mTOR, el daño muscular activa células satélite que donan mionúcleos, y el estrés metabólico promueve factores de crecimiento locales (IGF-1, MGF).',
            datos: [
                { l: 'Estímulo principal', v: 'Tensión mecánica' },
                { l: 'Vía señalización', v: 'mTOR/Akt/p70S6K' },
                { l: 'Células satélite', v: 'Donan mionúcleos' },
                { l: 'Dominio mionucl.', v: '~2000 μm³/núcleo' }
            ]
        },
        {
            name: 'Lactato y Metabolismo',
            region: 'Sarcoplasma — Lactato Deshidrogenasa',
            desc: 'El lactato NO es un desecho tóxico sino un metabolito intermediario útil. Producido por la lactato deshidrogenasa al reducir piruvato. Es transportado (MCT1/4) a fibras tipo I, corazón e hígado como combustible (ciclo de Cori). El umbral de lactato (~4 mmol/L) es el mejor predictor de rendimiento en resistencia. La acidosis es por hidrólisis de ATP, no por lactato.',
            datos: [
                { l: 'Umbral lactato', v: '~4 mmol/L' },
                { l: 'Transportador', v: 'MCT1 (entrada)/MCT4' },
                { l: 'Ciclo de Cori', v: 'Lactato→Hígado→Glucosa' },
                { l: 'Predictor', v: 'Rendimiento aeróbico' }
            ]
        },
        {
            name: 'Reflejo Miotático (De Estiramiento)',
            region: 'Huso Neuromuscular → Médula → Músculo',
            desc: 'Arco reflejo monosináptico más rápido del cuerpo. El estiramiento brusco del músculo activa las aferentes Ia del huso → sinapsis directa con la motoneurona α en el asta anterior → contracción refleja del mismo músculo. Simultáneamente, la interneurona inhibitoria Ia relaja el antagonista (inhibición recíproca). Base del reflejo rotuliano (L3-L4).',
            datos: [
                { l: 'Sinapsis', v: 'Monosináptica' },
                { l: 'Latencia', v: '~25-30 ms (rotuliano)' },
                { l: 'Aferente', v: 'Ia (120 m/s)' },
                { l: 'Reflejo rotuliano', v: 'L3-L4' }
            ]
        }
    ]
};

console.log('✅ Écorché Data: Fisiología cargada');
