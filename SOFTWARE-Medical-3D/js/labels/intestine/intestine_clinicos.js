/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE — Datos Clínicos y Pruebas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__INTESTINE_DATA = window.__INTESTINE_DATA || {};

window.__INTESTINE_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Colonoscopia',
            region: 'Gold Standard — Visualización Directa',
            desc: 'Examen endoscópico completo del colon hasta el ciego, permite visualizar mucosa, tomar biopsias y resecar pólipos. Indicaciones: screening cáncer (≥45 años), sangrado rectal, diarrea crónica, EII. Preparación: dieta líquida + laxantes (polietilenglicol 4 L). Sedación consciente habitual. Detección adenomas: 90-95%. Complicaciones: perforación (0.1%), sangrado (0.3%).',
            datos: [
                { l: 'Screening edad', v: '≥45-50 años' },
                { l: 'Detección adenom.', v: '90-95%' },
                { l: 'Perforación', v: '~0.1%' },
                { l: 'Intervalo', v: '10 años (normal)' }
            ]
        },
        {
            name: 'Test de Sangre Oculta en Heces (TSOH)',
            region: 'Screening No Invasivo — Sangrado',
            desc: 'Detecta sangre no visible en heces. Tipos: guayaco (gFOBT, requiere restricciones dietéticas) e inmunoquímico (FIT, más específico, sin restricciones). FIT detecta 70-80% de cáncer colorrectal, 25-40% de adenomas avanzados. Indicación: screening anual desde 45-50 años. Resultado positivo requiere colonoscopia confirmatoria. Reducción mortalidad por cáncer CR: 15-33%.',
            datos: [
                { l: 'Sensibilidad CRC', v: '70-80% (FIT)' },
                { l: 'Adenomas avanz.', v: '25-40%' },
                { l: 'Frecuencia', v: 'Anual' },
                { l: '↓ Mortalidad', v: '15-33%' }
            ]
        },
        {
            name: 'Sigmoidoscopia Flexible',
            region: 'Colon Distal — 60 cm',
            desc: 'Exploración endoscópica del colon distal (recto, sigmoide, descendente) hasta ~60 cm. Más corta y mejor tolerada que colonoscopia, menor preparación. Detecta 70-80% de neoplasias (mayoría en colon izquierdo). Screening cada 5 años combinado con FIT anual. Si encuentra pólipos, requiere colonoscopia completa. Reduce mortalidad por cáncer CR en 25-30%.',
            datos: [
                { l: 'Alcance', v: '~60 cm' },
                { l: 'Detección', v: '70-80% neoplasias' },
                { l: 'Frecuencia', v: 'Cada 5 años' },
                { l: '↓ Mortalidad', v: '25-30%' }
            ]
        },
        {
            name: 'Manometría Anorrectal',
            region: 'Función Esfinteriana — Presiones',
            desc: 'Evalúa función de esfínteres anales y sensibilidad rectal mediante catéter con balón. Mide: presión esfínter anal interno (50-70 mmHg) y externo (100-150 mmHg), reflejo rectoanal inhibitorio, sensibilidad rectal. Indicaciones: incontinencia fecal, estreñimiento crónico, enfermedad de Hirschsprung (ausencia reflejo). Sensibilidad para detectar disfunción: 80-90%.',
            datos: [
                { l: 'Presión interna', v: '50-70 mmHg' },
                { l: 'Presión externa', v: '100-150 mmHg' },
                { l: 'Sensibilidad', v: '80-90%' },
                { l: 'Indicación', v: 'Incontinencia' }
            ]
        },
        {
            name: 'Escala de Bristol',
            region: 'Clasificación de Heces — Forma',
            desc: 'Herramienta visual que clasifica heces en 7 tipos según forma y consistencia. Tipos 1-2: estreñimiento (duras, fragmentadas). Tipos 3-4: normales (salchicha lisa/agrietada). Tipos 5-7: diarrea (blanda, líquida). Correlaciona con tiempo de tránsito colónico: tipo 1 (>100 h), tipo 7 (<10 h). Útil para documentar cambios intestinales en SII, EII, ensayos clínicos.',
            datos: [
                { l: 'Tipos', v: '7 categorías' },
                { l: 'Normal', v: 'Tipo 3-4' },
                { l: 'Estreñimiento', v: 'Tipo 1-2' },
                { l: 'Diarrea', v: 'Tipo 5-7' }
            ]
        },
        {
            name: 'Marcador Tumoral CEA',
            region: 'Antígeno Carcinoembrionario — Sérico',
            desc: 'Glicoproteína presente en tejido fetal, normalmente ausente en adultos (<3 ng/mL). Elevado en 60-90% de cáncer colorrectal metastásico, 30-40% en localizado. No es específico (también en cáncer pulmón, mama, páncreas, fumadores). Uso principal: monitorización post-cirugía (cada 3-6 meses 2 años), detecta recurrencia. Elevación >5 ng/mL sugiere recurrencia/progresión.',
            datos: [
                { l: 'Normal', v: '<3 ng/mL' },
                { l: 'Elevado en CRC', v: '60-90% metast.' },
                { l: 'Uso', v: 'Seguimiento post-Qx' },
                { l: 'Recurrencia', v: '>5 ng/mL' }
            ]
        },
        {
            name: 'Criterios de Roma IV (SII)',
            region: 'Diagnóstico Síndrome Intestino Irritable',
            desc: 'Criterios diagnósticos para SII: dolor abdominal recurrente ≥1 día/semana en últimos 3 meses, iniciado ≥6 meses previos, asociado con ≥2 de: relacionado con defecación, cambio en frecuencia de heces, cambio en forma de heces. Subtipos según Bristol: SII-E (tipo 1-2 >25%), SII-D (tipo 6-7 >25%), SII-M (mixto), SII-NC (no clasificable).',
            datos: [
                { l: 'Dolor mínimo', v: '≥1 día/semana' },
                { l: 'Duración', v: '≥3 meses' },
                { l: 'Inicio previo', v: '≥6 meses' },
                { l: 'Subtipos', v: '4 (D, E, M, NC)' }
            ]
        },
        {
            name: 'Calprotectina Fecal',
            region: 'Biomarcador Inflamación — Heces',
            desc: 'Proteína liberada por neutrófilos durante inflamación intestinal. Útil para diferenciar enfermedad inflamatoria (EII) de trastornos funcionales (SII). Valores: <50 μg/g normal, 50-200 μg/g zona gris (infección, AINE), >200 μg/g sugiere EII. Sensibilidad para EII: 93%, especificidad: 96%. También útil para monitorizar actividad de EII y predecir recaídas.',
            datos: [
                { l: 'Normal', v: '<50 μg/g' },
                { l: 'EII probable', v: '>200 μg/g' },
                { l: 'Sensibilidad', v: '~93%' },
                { l: 'Especificidad', v: '~96%' }
            ]
        }
    ]
};

console.log('✅ Intestine Data: Datos Clínicos cargados');
