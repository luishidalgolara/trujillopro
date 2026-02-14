/**
 * ═══════════════════════════════════════════════════
 *  LUNGS — Datos Clínicos y Pruebas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LUNGS_DATA = window.__LUNGS_DATA || {};

window.__LUNGS_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Espirometría',
            region: 'Prueba de Función Pulmonar',
            desc: 'Mide volúmenes y flujos pulmonares. Parámetros clave: FVC (capacidad vital forzada, normal >80% predicho), FEV1 (volumen espiratorio forzado en 1 segundo, >80%), FEV1/FVC (índice Tiffeneau, normal >0.70). Patrón obstructivo: FEV1/FVC <0.70 (asma, EPOC). Patrón restrictivo: FEV1/FVC normal pero FVC <80% (fibrosis). Test broncodilatador: mejora FEV1 >12% y >200 mL sugiere reversibilidad.',
            datos: [
                { l: 'FVC normal', v: '>80% predicho' },
                { l: 'FEV1 normal', v: '>80%' },
                { l: 'FEV1/FVC norm.', v: '>0.70' },
                { l: 'Obstrucción', v: 'FEV1/FVC <0.70' }
            ]
        },
        {
            name: 'Gasometría Arterial',
            region: 'Intercambio Gaseoso — Equilibrio Ácido-Base',
            desc: 'Análisis sangre arterial mide gases y pH. Valores normales: pH 7.35-7.45, PaO₂ 80-100 mmHg, PaCO₂ 35-45 mmHg, HCO₃⁻ 22-26 mEq/L, SaO₂ >95%. Hipoxemia: PaO₂ <60 mmHg. Hipercapnia: PaCO₂ >45 mmHg. Acidosis respiratoria: pH <7.35, PaCO₂ >45 (hipoventilación). Alcalosis respiratoria: pH >7.45, PaCO₂ <35 (hiperventilación).',
            datos: [
                { l: 'pH normal', v: '7.35-7.45' },
                { l: 'PaO₂ normal', v: '80-100 mmHg' },
                { l: 'PaCO₂ normal', v: '35-45 mmHg' },
                { l: 'Hipoxemia', v: '<60 mmHg' }
            ]
        },
        {
            name: 'Pulsioximetría (SpO₂)',
            region: 'Saturación de Oxígeno — No Invasiva',
            desc: 'Medición no invasiva de saturación de oxihemoglobina. Normal: SpO₂ >95%. 90-94%: hipoxemia leve, considerar suplemento O₂. <90%: hipoxemia significativa, requiere oxigenoterapia. <85%: severa. Limitaciones: no diferencia tipos de hemoglobina (carboxihemoglobina en fumadores, metahemoglobina), mala perfusión periférica, esmalte uñas oscuro, hipotermia. No reemplaza gasometría en pacientes críticos.',
            datos: [
                { l: 'Normal', v: '>95%' },
                { l: 'Leve', v: '90-94%' },
                { l: 'Significativa', v: '<90%' },
                { l: 'Severa', v: '<85%' }
            ]
        },
        {
            name: 'Radiografía de Tórax',
            region: 'Imagen Simple — Primera Línea',
            desc: 'Proyecciones: posteroanterior (PA) y lateral. Evalúa: parénquima pulmonar, silueta cardíaca, hilios, mediastino, diafragmas, caja torácica. Hallazgos: consolidación (neumonía), cavitación (tuberculosis, absceso), nódulos/masas (cáncer), infiltrados intersticiales (fibrosis), derrame pleural, neumotórax, cardiomegalia, hiperinsuflación (EPOC). Sensibilidad limitada para lesiones pequeñas (<1 cm).',
            datos: [
                { l: 'Proyecciones', v: 'PA + lateral' },
                { l: 'Detecta nódulos', v: '>1 cm' },
                { l: 'Uso', v: 'Primera línea' },
                { l: 'Dosis radiación', v: 'Baja (0.1 mSv)' }
            ]
        },
        {
            name: 'Tomografía Computarizada (TC) Tórax',
            region: 'Imagen de Alta Resolución',
            desc: 'TC convencional: evalúa masas, adenopatías, derrame. TC alta resolución (TCAR): evalúa intersticio pulmonar (fibrosis, enfisema). Angio-TC: diagnóstico embolia pulmonar (sensibilidad 90-95%). TC baja dosis: screening cáncer pulmonar en fumadores (reduce mortalidad 20%). Hallazgos: nódulos pulmonares (requieren seguimiento), vidrio esmerilado, panal de abeja, bronquiectasias.',
            datos: [
                { l: 'TCAR', v: 'Intersticio' },
                { l: 'Angio-TC', v: 'Embolia (90-95%)' },
                { l: 'Screening', v: 'Baja dosis' },
                { l: '↓ Mortalidad', v: '~20% cáncer' }
            ]
        },
        {
            name: 'Prueba de Marcha 6 Minutos',
            region: 'Capacidad Funcional',
            desc: 'Evalúa capacidad ejercicio submáximo en condiciones reales. Paciente camina máxima distancia posible en 6 minutos en pasillo de 30 m. Valores normales: >400 m (variable con edad/sexo). <300 m: limitación moderada. <150 m: limitación severa. Mediciones: distancia, SpO₂, frecuencia cardíaca, disnea (Borg). Útil en EPOC, fibrosis, hipertensión pulmonar para evaluar severidad, pronóstico, respuesta tratamiento.',
            datos: [
                { l: 'Normal', v: '>400 m' },
                { l: 'Moderada', v: '<300 m' },
                { l: 'Severa', v: '<150 m' },
                { l: 'Mide', v: 'Capacidad funcional' }
            ]
        },
        {
            name: 'Test de Provocación Bronquial',
            region: 'Hiperreactividad de Vías Aéreas',
            desc: 'Confirma hiperreactividad bronquial en asma. Métodos: metacolina (más usado), histamina, manitol, ejercicio. Procedimiento: inhalar concentraciones crecientes del agente, medir FEV1 tras cada dosis. Positivo: caída FEV1 ≥20% (PC20). Indicaciones: síntomas sugestivos de asma con espirometría normal. Contraindicaciones: FEV1 <60%, IAM reciente. Sensibilidad ~90% para asma, especificidad ~90%.',
            datos: [
                { l: 'Agente común', v: 'Metacolina' },
                { l: 'Positivo', v: '↓FEV1 ≥20%' },
                { l: 'Sensibilidad', v: '~90%' },
                { l: 'Contraindicac.', v: 'FEV1 <60%' }
            ]
        },
        {
            name: 'Óxido Nítrico Exhalado (FeNO)',
            region: 'Biomarcador Inflamación Eosinofílica',
            desc: 'Mide óxido nítrico en aire exhalado, marcador de inflamación eosinofílica de vías aéreas. Valores normales: <25 ppb adultos, <20 ppb niños. Elevado (>50 ppb): inflamación eosinofílica activa, sugiere asma alérgica, predice respuesta a corticoides inhalados. Bajo (<25 ppb): menos probable asma eosinofílica. Útil para diagnóstico diferencial, monitorizar control asma, guiar tratamiento.',
            datos: [
                { l: 'Normal adulto', v: '<25 ppb' },
                { l: 'Elevado', v: '>50 ppb' },
                { l: 'Indica', v: 'Inflam. eosinofílica' },
                { l: 'Uso', v: 'Dx + monitoreo asma' }
            ]
        }
    ]
};

console.log('✅ Lungs Data: Datos Clínicos cargados');
