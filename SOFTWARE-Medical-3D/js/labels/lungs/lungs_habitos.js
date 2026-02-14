/**
 * ═══════════════════════════════════════════════════
 *  LUNGS — Hábitos y Cuidado Pulmonar
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LUNGS_DATA = window.__LUNGS_DATA || {};

window.__LUNGS_DATA.habitos = {
    title: 'Hábitos y Cuidado',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Cesación Tabáquica',
            region: 'Factor de Riesgo #1',
            desc: 'El tabaquismo causa 85% de cáncer pulmonar, 80-90% de EPOC. Un cigarrillo contiene >7000 químicos, 70 carcinógenos. Beneficios al dejar: 20 min: presión arterial normaliza, 12 h: CO sanguíneo normal, 2 semanas-3 meses: circulación/función pulmonar mejoran, 1 año: riesgo cardíaco ↓50%, 5-10 años: riesgo cáncer pulmonar ↓50%. Tratamiento: terapia reemplazo nicotina, vareniclina, bupropión.',
            datos: [
                { l: 'Causa EPOC', v: '80-90%' },
                { l: 'Causa cáncer', v: '~85%' },
                { l: 'Beneficio 1 año', v: '↓50% riesgo cardíaco' },
                { l: 'Tx efectivo', v: 'TRN + vareniclina' }
            ]
        },
        {
            name: 'Ejercicio Aeróbico Regular',
            region: 'Capacidad Respiratoria',
            desc: 'Ejercicio aeróbico (150-300 min/semana moderado) mejora capacidad pulmonar, eficiencia ventilatoria, fuerza muscular respiratoria. Aumenta VO₂ máx (capacidad aeróbica) 15-25%. En EPOC: rehabilitación pulmonar reduce disnea, mejora calidad de vida, reduce hospitalizaciones 30-40%. Ejercicios respiratorios (respiración diafragmática, labios fruncidos) mejoran mecánica respiratoria.',
            datos: [
                { l: 'Duración', v: '150-300 min/sem' },
                { l: '↑ VO₂ máx', v: '15-25%' },
                { l: 'En EPOC', v: '↓30-40% hospit.' },
                { l: 'Ejerc. respirat.', v: 'Diafragmáticos' }
            ]
        },
        {
            name: 'Evitar Contaminación Aérea',
            region: 'Partículas y Gases Tóxicos',
            desc: 'Exposición a PM2.5 (partículas <2.5 μm) aumenta riesgo EPOC, asma, cáncer pulmonar, infecciones. Fuentes: tráfico, industria, combustión biomasa. Recomendaciones: monitorear índice calidad aire (ICA), evitar ejercicio exterior cuando ICA >100, usar purificadores aire HEPA en casa, evitar quema de leña/carbón interior. Ozono (O₃) también daña vías aéreas.',
            datos: [
                { l: 'PM2.5', v: '<2.5 μm' },
                { l: 'ICA seguro', v: '<100' },
                { l: 'Filtros', v: 'HEPA' },
                { l: 'Evitar', v: 'Combustión interior' }
            ]
        },
        {
            name: 'Vacunación Preventiva',
            region: 'Influenza — Neumococo — COVID-19',
            desc: 'Vacunación esencial en enfermedades pulmonares crónicas. Influenza: anual, reduce mortalidad 40-50% en EPOC. Neumococo: PCV13 + PPSV23, protege contra neumonía bacteriana más común, indicado >65 años o enfermedad pulmonar crónica. COVID-19: serie primaria + refuerzos, reduce hospitalización >80%. Tos ferina (Tdap): cada 10 años, previene transmisión a vulnerables.',
            datos: [
                { l: 'Influenza', v: 'Anual' },
                { l: 'Neumococo', v: 'PCV13 + PPSV23' },
                { l: 'COVID-19', v: 'Serie + refuerzos' },
                { l: '↓ Mortalidad', v: '40-50% influenza' }
            ]
        },
        {
            name: 'Postura y Mecánica Respiratoria',
            region: 'Diafragma — Expansión Torácica',
            desc: 'Postura erecta optimiza expansión pulmonar. Posición encorvada reduce capacidad vital 30%. Respiración diafragmática (abdominal): más eficiente que torácica, recluta bases pulmonares (mejor V/Q), reduce trabajo respiratorio. Técnica labios fruncidos en EPOC: prolonga espiración, previene colapso bronquiolar, reduce atrapamiento aéreo. Practicar 5-10 min, 3-4 veces/día.',
            datos: [
                { l: 'Postura erecta', v: 'Óptima' },
                { l: 'Encorvado', v: '↓30% CV' },
                { l: 'Resp. diafragm.', v: 'Más eficiente' },
                { l: 'Labios fruncidos', v: 'EPOC' }
            ]
        },
        {
            name: 'Exposición Ocupacional',
            region: 'Asbestos — Sílice — Vapores',
            desc: 'Exposiciones ocupacionales causan 10-15% de enfermedades pulmonares. Asbestos: mesotelioma, asbestosis. Sílice: silicosis (minería, construcción). Carbón: neumoconiosis. Isocianatos: asma ocupacional. Prevención: equipos protección respiratoria (EPR) adecuados, ventilación, controles ingeniería. Evaluación médica periódica. Cambio laboral si enfermedad establecida. Compensación laboral disponible.',
            datos: [
                { l: 'Causa', v: '10-15% enf. pulm.' },
                { l: 'Asbestos', v: 'Mesotelioma' },
                { l: 'Sílice', v: 'Silicosis' },
                { l: 'Prevención', v: 'EPR + ventilación' }
            ]
        },
        {
            name: 'Higiene Respiratoria',
            region: 'Prevención Infecciones',
            desc: 'Medidas para prevenir infecciones respiratorias: lavado manos frecuente (20 segundos, agua+jabón), usar mascarilla en lugares concurridos si inmunodeprimido o enfermedad pulmonar, cubrir tos/estornudos con codo, evitar tocarse cara, ventilar espacios cerrados. Distanciamiento físico (1-2 m) reduce transmisión respiratoria 50-80%. Desinfectar superficies compartidas.',
            datos: [
                { l: 'Lavado manos', v: '20 segundos' },
                { l: 'Distanciamiento', v: '1-2 metros' },
                { l: '↓ Transmisión', v: '50-80%' },
                { l: 'Ventilación', v: 'Espacios cerrados' }
            ]
        },
        {
            name: 'Manejo del Estrés',
            region: 'Ansiedad y Disnea',
            desc: 'Estrés y ansiedad empeoran síntomas respiratorios, especialmente disnea. Crean ciclo vicioso: ansiedad → hiperventilación → disnea percibida → más ansiedad. Técnicas manejo: respiración lenta controlada (6-8 resp/min), mindfulness, relajación muscular progresiva, terapia cognitivo-conductual. En asma: estrés puede desencadenar crisis. Reducción estrés mejora control síntomas 20-30%.',
            datos: [
                { l: 'Ciclo', v: 'Ansiedad ↔ disnea' },
                { l: 'Resp. lenta', v: '6-8 resp/min' },
                { l: 'Terapia', v: 'Cognitivo-conductual' },
                { l: 'Mejora sínt.', v: '20-30%' }
            ]
        }
    ]
};

console.log('✅ Lungs Data: Hábitos cargados');
