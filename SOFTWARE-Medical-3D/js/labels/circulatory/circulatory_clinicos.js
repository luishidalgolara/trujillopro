/**
 * ═══════════════════════════════════════════════════
 *  CIRCULATORY — Datos Clínicos de Referencia
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__CIRC_DATA = window.__CIRC_DATA || {};

window.__CIRC_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Valores de Presión Arterial',
            region: 'Arterias — Esfigmomanómetro',
            desc: 'La presión arterial se mide en mmHg (sistólica/diastólica). Normal: <120/80. Elevada: 120-129/<80. HTA Estadio 1: 130-139/80-89. HTA Estadio 2: ≥140/≥90. Crisis hipertensiva: >180/>120. La presión de pulso (PAS-PAD) normal es 30-50 mmHg.',
            datos: [
                { l: 'Normal', v: '<120/80 mmHg' },
                { l: 'HTA Estadio 1', v: '130-139/80-89' },
                { l: 'HTA Estadio 2', v: '≥140/≥90' },
                { l: 'Crisis', v: '>180/>120' }
            ]
        },
        {
            name: 'Perfil Lipídico',
            region: 'Plasma Sanguíneo — Lipoproteínas',
            desc: 'Colesterol total deseable: <200 mg/dL. LDL ("malo"): óptimo <100 mg/dL, objetivo <70 en alto riesgo CV. HDL ("bueno"): >40 mg/dL (hombres), >50 mg/dL (mujeres). Triglicéridos normales: <150 mg/dL. La ratio LDL/HDL es mejor predictor que el colesterol total.',
            datos: [
                { l: 'CT deseable', v: '<200 mg/dL' },
                { l: 'LDL óptimo', v: '<100 mg/dL' },
                { l: 'HDL protector', v: '>40-50 mg/dL' },
                { l: 'TG normal', v: '<150 mg/dL' }
            ]
        },
        {
            name: 'Marcadores Cardíacos',
            region: 'Laboratorio — Emergencias',
            desc: 'Troponina I/T: marcador de necrosis miocárdica más sensible y específico, se eleva 3-6 h post-infarto. BNP/NT-proBNP: marcador de estiramiento ventricular en IC. CK-MB: menos específica pero útil para reinfarto. Dímero D: descarta tromboembolismo (alto valor predictivo negativo).',
            datos: [
                { l: 'Troponina', v: 'Necrosis miocárd.' },
                { l: 'BNP', v: 'Insuf. cardíaca' },
                { l: 'CK-MB', v: 'Reinfarto' },
                { l: 'Dímero D', v: 'Descarta TEP/TVP' }
            ]
        },
        {
            name: 'Gasometría Arterial',
            region: 'Sangre Arterial — Equilibrio Ácido-Base',
            desc: 'Análisis de gases en sangre arterial. pH normal: 7.35-7.45. PaO₂: 80-100 mmHg. PaCO₂: 35-45 mmHg. HCO₃⁻: 22-26 mEq/L. SatO₂: 95-100%. Acidosis: pH <7.35 (respiratoria si ↑CO₂, metabólica si ↓HCO₃). Alcalosis: pH >7.45.',
            datos: [
                { l: 'pH normal', v: '7.35-7.45' },
                { l: 'PaO₂', v: '80-100 mmHg' },
                { l: 'PaCO₂', v: '35-45 mmHg' },
                { l: 'SatO₂', v: '95-100%' }
            ]
        },
        {
            name: 'Hematología Básica',
            region: 'Sangre — Hemograma Completo',
            desc: 'Hemoglobina: 13-17 g/dL (H), 12-15 g/dL (M). Hematocrito: 40-54% (H), 36-48% (M). Leucocitos: 4500-11000/μL. Plaquetas: 150-400×10³/μL. El VCM (80-100 fL) clasifica anemias: microcítica (<80), normocítica, macrocítica (>100).',
            datos: [
                { l: 'Hb hombres', v: '13-17 g/dL' },
                { l: 'Hb mujeres', v: '12-15 g/dL' },
                { l: 'Leucocitos', v: '4500-11000/μL' },
                { l: 'Plaquetas', v: '150-400×10³/μL' }
            ]
        },
        {
            name: 'Ecocardiograma Normal',
            region: 'Ultrasonido Cardíaco — No Invasivo',
            desc: 'Estudio de imagen cardíaca por ultrasonido. FEVI normal: 55-70%. Diámetro telediastólico del VI: 36-56 mm. Grosor septal: 6-11 mm. Raíz aórtica: 20-37 mm. Permite evaluar válvulas, contractilidad segmentaria, pericardio y flujos por Doppler.',
            datos: [
                { l: 'FEVI normal', v: '55-70%' },
                { l: 'DTDVI', v: '36-56 mm' },
                { l: 'Septo', v: '6-11 mm' },
                { l: 'Raíz aórtica', v: '20-37 mm' }
            ]
        }
    ]
};

console.log('✅ Circulatory Data: Datos Clínicos cargados');