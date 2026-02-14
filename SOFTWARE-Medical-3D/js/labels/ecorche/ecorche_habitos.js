/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ — Hábitos y Cuidado Muscular
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__ECORCHE_DATA = window.__ECORCHE_DATA || {};

window.__ECORCHE_DATA.habitos = {
    title: 'Hábitos y Cuidado Muscular',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Calentamiento Neuromuscular',
            region: 'Unión Miotendinosa — Placa Motora',
            desc: 'El calentamiento activo (10-15 min) aumenta la temperatura muscular en ~1-2°C, mejorando la velocidad de conducción nerviosa, la elasticidad del colágeno tendinoso y la velocidad de acortamiento de las fibras. Reduce el riesgo de desgarro en la unión miotendinosa en un ~50%. Los programas FIFA 11+ han demostrado reducir lesiones de ligamentos en un 30-50%.',
            datos: [
                { l: 'Duración', v: '10-15 min' },
                { l: 'Temp. muscular', v: '↑ 1-2°C' },
                { l: 'Reducción desgarro', v: '~50%' },
                { l: 'Protocolo', v: 'FIFA 11+ (evidencia)' }
            ]
        },
        {
            name: 'Principio de Sobrecarga Progresiva',
            region: 'Fibras Musculares — Hipertrofia',
            desc: 'La adaptación muscular requiere estímulos progresivamente mayores (volumen, intensidad o densidad). La tensión mecánica es el principal estímulo de hipertrofia vía mecanotransducción (integrinas → FAK → mTOR). Un volumen de 10-20 series semanales por grupo muscular optimiza la hipertrofia. Desentrenamiento: se pierde ~50% de las ganancias de fuerza en 2-3 semanas de inactividad.',
            datos: [
                { l: 'Vol. óptimo', v: '10-20 series/sem/grupo' },
                { l: 'Mecanismo', v: 'Mecanotransducción' },
                { l: 'Desentrenamiento', v: '~50% en 2-3 sem' },
                { l: 'Frecuencia', v: '2×/sem por grupo' }
            ]
        },
        {
            name: 'Sueño y Recuperación Muscular',
            region: 'Eje Somatotropo — GH Nocturna',
            desc: 'El 70% de la secreción diaria de hormona de crecimiento (GH) ocurre durante el sueño de ondas lentas (fase N3). La GH estimula la síntesis de IGF-1, principal mediador anabólico de reparación muscular. La restricción de sueño (<6 h) reduce la síntesis proteica muscular en ~18%, aumenta el cortisol matutino (~37%) y reduce la testosterona.',
            datos: [
                { l: 'Sueño óptimo', v: '7-9 h/noche' },
                { l: 'GH en sueño', v: '~70% secreción diaria' },
                { l: 'Fase crítica', v: 'N3 (ondas lentas)' },
                { l: 'Déficit <6h', v: '↓18% MPS, ↑37% cortisol' }
            ]
        },
        {
            name: 'Hidratación y Rendimiento Muscular',
            region: 'Sarcoplasma — Volumen Celular',
            desc: 'El músculo es ~75% agua. Una deshidratación de solo 2% del peso corporal reduce la fuerza en ~10% y la potencia en ~15%. El volumen celular muscular es un regulador anabólico: la hinchazón celular (cell swelling) activa vías de síntesis proteica. La tasa de sudoración durante ejercicio puede alcanzar 1-2.5 L/h.',
            datos: [
                { l: 'Músculo', v: '~75% agua' },
                { l: 'Deshidrat. 2%', v: '↓10% fuerza' },
                { l: 'Sudoración máx.', v: '1-2.5 L/h' },
                { l: 'Reposición', v: '~150% pérdida' }
            ]
        },
        {
            name: 'Ergonomía Postural',
            region: 'Cadena Posterior — Erectores Espinales',
            desc: 'La sedestación prolongada (>8 h/día) acorta los flexores de cadera (iliopsoas), debilita glúteos ("amnesia glútea") y sobrecarga los erectores espinales. El síndrome cruzado inferior (Janda) describe este desequilibrio. Las pausas activas cada 30-45 minutos y la alternancia sentado-de pie reducen la carga discal lumbar en un ~40%.',
            datos: [
                { l: 'Riesgo', v: '>8 h sentado/día' },
                { l: 'Síndrome', v: 'Cruzado inferior' },
                { l: 'Pausa activa', v: 'Cada 30-45 min' },
                { l: 'Reducción carga', v: '~40% alternando' }
            ]
        },
        {
            name: 'Protocolo RICE/POLICE',
            region: 'Lesión Aguda — Tejido Blando',
            desc: 'Manejo inicial de lesiones musculotendinosas agudas. POLICE (evolución de RICE): Protection, Optimal Loading, Ice, Compression, Elevation. La carga óptima temprana (vs reposo absoluto) estimula la regeneración tisular mediante mecanotransducción. Crioterapia: 15-20 min cada 2-3 h las primeras 48-72 h. La inmovilización prolongada causa atrofia y fibrosis.',
            datos: [
                { l: 'Protocolo actual', v: 'POLICE' },
                { l: 'Crioterapia', v: '15-20 min / 2-3 h' },
                { l: 'Fase aguda', v: 'Primeras 48-72 h' },
                { l: 'Carga óptima', v: 'Precoz > reposo total' }
            ]
        },
        {
            name: 'Prevención de Sarcopenia',
            region: 'Masa Muscular — Envejecimiento',
            desc: 'A partir de los 30 años se pierde ~3-8% de masa muscular por década, acelerándose tras los 60 (sarcopenia). El diagnóstico requiere baja masa muscular (DXA o BIA) + baja fuerza (grip <27 kg hombres, <16 kg mujeres) o bajo rendimiento físico. El ejercicio de resistencia (2-3×/semana) combinado con proteína adecuada (1.2-1.6 g/kg/día) es la intervención más eficaz.',
            datos: [
                { l: 'Pérdida >30 años', v: '~3-8%/década' },
                { l: 'Grip hombres', v: '<27 kg = sospecha' },
                { l: 'Proteína', v: '1.2-1.6 g/kg/día' },
                { l: 'Ejercicio', v: 'Resistencia 2-3×/sem' }
            ]
        }
    ]
};

console.log('✅ Écorché Data: Hábitos cargados');
