/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE — Hábitos y Cuidado Intestinal
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__INTESTINE_DATA = window.__INTESTINE_DATA || {};

window.__INTESTINE_DATA.habitos = {
    title: 'Hábitos y Cuidado',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Hidratación y Tránsito Intestinal',
            region: 'Absorción de Agua — Colon',
            desc: 'El colon absorbe 1.3-1.4 L de agua/día. La ingesta insuficiente de líquidos (<1.5 L/día) resulta en heces duras y estreñimiento. Recomendación: 2-3 L/día (agua + alimentos). Efecto: facilita tránsito, previene estreñimiento, reduce riesgo de diverticulosis. La deshidratación prolonga tiempo de tránsito de 36 a >72 horas.',
            datos: [
                { l: 'Ingesta mínima', v: '1.5-2 L/día' },
                { l: 'Óptima', v: '2-3 L/día' },
                { l: 'Absorción colon', v: '1.3-1.4 L/día' },
                { l: 'Previene', v: 'Estreñimiento' }
            ]
        },
        {
            name: 'Ejercicio Físico y Motilidad',
            region: 'Motilidad Colónica — Activación',
            desc: 'El ejercicio aeróbico regular (150 min/semana) aumenta la motilidad colónica, acelera tránsito intestinal (25-30% más rápido) y reduce el tiempo de contacto de potenciales carcinógenos con la mucosa. Mecanismo: estimula nervio vago, aumenta flujo sanguíneo intestinal, libera hormonas gastrointestinales. Reduce riesgo de cáncer colorrectal en 25-30%.',
            datos: [
                { l: 'Duración', v: '≥150 min/semana' },
                { l: '↑ Tránsito', v: '25-30%' },
                { l: '↓ Cáncer CR', v: '25-30%' },
                { l: 'Tipo', v: 'Aeróbico moderad.' }
            ]
        },
        {
            name: 'Postura Durante la Defecación',
            region: 'Ángulo Anorrectal — Mecánica',
            desc: 'La postura en cuclillas (35°) endereza el ángulo anorrectal (de 90° a 110-130°) y relaja el músculo puborrectal, facilitando la evacuación completa. En inodoro convencional, usar taburete bajo los pies (20-30 cm) imita esta posición. Estudios muestran: reduce tiempo de evacuación 30%, disminuye esfuerzo y sensación de evacuación incompleta.',
            datos: [
                { l: 'Ángulo óptimo', v: '110-130°' },
                { l: 'Taburete altura', v: '20-30 cm' },
                { l: '↓ Tiempo evac.', v: '~30%' },
                { l: 'Previene', v: 'Hemorroides' }
            ]
        },
        {
            name: 'Horarios Regulares de Evacuación',
            region: 'Reflejo Gastrocólico — Entrenamiento',
            desc: 'Intentar defecar a la misma hora diariamente (idealmente 20-30 min tras desayuno, aprovechando reflejo gastrocólico) entrena el reflejo defecatorio. No suprimir el deseo de evacuar, posponer repetidamente causa estreñimiento crónico al reducir sensibilidad rectal. Dedicar 10-15 min sin prisas, sin forzar. La regularidad mejora patrón intestinal en 2-4 semanas.',
            datos: [
                { l: 'Mejor momento', v: 'Tras desayuno' },
                { l: 'Latencia', v: '20-30 min' },
                { l: 'Duración máx.', v: '10-15 min' },
                { l: 'Efecto', v: '2-4 semanas' }
            ]
        },
        {
            name: 'Estrés y Función Intestinal',
            region: 'Eje Intestino-Cerebro — Bidireccional',
            desc: 'El estrés crónico altera motilidad colónica vía eje hipotálamo-hipófisis-adrenal y nervio vago. Puede causar: aceleración (diarrea) o enlentecimiento (estreñimiento). El estrés aumenta permeabilidad intestinal, altera microbiota (↓ Lactobacillus, ↑ patógenos), exacerba SII. Técnicas de manejo: mindfulness, yoga, ejercicio reducen síntomas en 30-40%.',
            datos: [
                { l: 'Vía afectación', v: 'Eje HHA + vago' },
                { l: 'Consecuencia', v: 'Dismotilidad' },
                { l: 'Empeora', v: 'SII (30-40%)' },
                { l: 'Manejo', v: 'Mindfulness' }
            ]
        },
        {
            name: 'Antibióticos y Microbiota',
            region: 'Disbiosis — Alteración Bacteriana',
            desc: 'Los antibióticos de amplio espectro destruyen no solo patógenos sino también microbiota beneficiosa. Consecuencias: diarrea (20-30% casos), sobrecrecimiento de C. difficile (riesgo 7-10 veces mayor), reducción persistente de diversidad bacteriana (hasta 6 meses). Uso racional: solo cuando estrictamente indicado. Considerar probióticos concurrentes (Saccharomyces boulardii).',
            datos: [
                { l: 'Diarrea asociada', v: '20-30%' },
                { l: 'Riesgo C. diff.', v: '×7-10' },
                { l: 'Recuperación', v: '6+ meses' },
                { l: 'Probiótico', v: 'S. boulardii' }
            ]
        },
        {
            name: 'Alcohol y Salud Colónica',
            region: 'Mucosa Colónica — Barrera Intestinal',
            desc: 'El consumo excesivo de alcohol (>2 bebidas/día) aumenta permeabilidad intestinal, altera microbiota (↓ Bacteroides, ↑ Proteobacterias), reduce producción de AGCC, causa inflamación crónica de bajo grado. Asociado a mayor riesgo de cáncer colorrectal (7% por cada 10 g alcohol/día). El consumo moderado (<1 bebida/día) no muestra efectos deletéreos significativos.',
            datos: [
                { l: 'Seguro', v: '<1 bebida/día' },
                { l: 'Excesivo', v: '>2 bebidas/día' },
                { l: '↑ Cáncer CR', v: '7% / 10g/día' },
                { l: 'Efecto', v: '↑ Permeabilidad' }
            ]
        },
        {
            name: 'Tabaquismo y Colon',
            region: 'Mucosa — Inflamación',
            desc: 'Paradójicamente, fumar parece proteger contra colitis ulcerosa (50-70% reducción) pero empeora enfermedad de Crohn. Aumenta riesgo de pólipos adenomatosos (18% más) y cáncer colorrectal (18% más). Mecanismo: nicotina altera perfusión intestinal, modifica respuesta inmune, aumenta estrés oxidativo. Dejar de fumar puede exacerbar colitis ulcerosa temporalmente (6-12 meses).',
            datos: [
                { l: '↓ Colitis ulcerosa', v: '50-70%' },
                { l: '↑ Cáncer CR', v: '~18%' },
                { l: '↑ Pólipos', v: '~18%' },
                { l: 'Empeora', v: 'Crohn' }
            ]
        }
    ]
};

console.log('✅ Intestine Data: Hábitos cargados');
