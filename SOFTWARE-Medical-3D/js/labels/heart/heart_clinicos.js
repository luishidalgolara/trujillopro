/**
 * ═══════════════════════════════════════════════════
 *  HEART — Datos Clínicos de Referencia
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__HEART_DATA = window.__HEART_DATA || {};

window.__HEART_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'ECG Normal — Intervalos y Ondas',
            region: '12 Derivaciones — Electrofisiología',
            desc: 'Onda P (despolarización auricular): <0.12 s, <0.25 mV. Intervalo PR (conducción AV): 0.12-0.20 s. Complejo QRS (despolarización ventricular): 0.06-0.10 s. Intervalo QT corregido (QTc): <0.44 s hombres, <0.46 s mujeres. Segmento ST: isoeléctrico (desviación sugiere isquemia/infarto).',
            datos: [
                { l: 'PR normal', v: '0.12-0.20 s' },
                { l: 'QRS normal', v: '0.06-0.10 s' },
                { l: 'QTc hombres', v: '<0.44 s' },
                { l: 'FC (RR)', v: '300/n° cuadros gr.' }
            ]
        },
        {
            name: 'Ecocardiograma — Valores Normales',
            region: 'Ultrasonido Cardíaco — No Invasivo',
            desc: 'FEVI: 55-70%. Diámetro telediastólico VI: 36-56 mm. Grosor septo/pared posterior: 6-11 mm. Raíz aórtica: 20-37 mm. AI anteroposterior: <40 mm. Velocidad E/A mitral: >1 (jóvenes). TAPSE (función VD): >17 mm. La strain longitudinal global (-18 a -22%) detecta disfunción subclínica.',
            datos: [
                { l: 'FEVI normal', v: '55-70%' },
                { l: 'DTDVI', v: '36-56 mm' },
                { l: 'AI', v: '<40 mm' },
                { l: 'TAPSE (VD)', v: '>17 mm' }
            ]
        },
        {
            name: 'Cateterismo — Presiones Normales',
            region: 'Invasivo — Hemodinámica',
            desc: 'AD: 0-8 mmHg. VD: 15-30/0-8 mmHg. AP: 15-30/4-12 mmHg (media <25). Cuña (PCP/POAP): 4-12 mmHg (refleja presión AI). VI: 100-140/4-12 mmHg. Aorta: 100-140/60-90 mmHg. Índice cardíaco normal: 2.5-4.0 L/min/m². Resistencia vascular periférica: 800-1200 dinas·s/cm⁵.',
            datos: [
                { l: 'PCP/Cuña', v: '4-12 mmHg' },
                { l: 'AP media', v: '<25 mmHg' },
                { l: 'Índice cardíaco', v: '2.5-4.0 L/min/m²' },
                { l: 'RVP', v: '800-1200 din·s/cm⁵' }
            ]
        },
        {
            name: 'Enzimas y Biomarcadores Cardíacos',
            region: 'Laboratorio — Diagnóstico',
            desc: 'Troponina de alta sensibilidad (hs-TnI/T): marcador de elección para necrosis miocárdica, se eleva en 1-3 h. BNP >100 pg/mL o NT-proBNP >300 pg/mL sugiere IC. CK-MB: pico a 24 h, útil para reinfarto. LDH: pico tardío 48-72 h. PCR ultrasensible: marcador inflamatorio de riesgo CV.',
            datos: [
                { l: 'hs-Troponina', v: 'Eleva 1-3 h' },
                { l: 'BNP (IC)', v: '>100 pg/mL' },
                { l: 'CK-MB pico', v: '~24 h' },
                { l: 'PCR-us riesgo', v: '>3 mg/L alto' }
            ]
        },
        {
            name: 'SCORE de Riesgo Cardiovascular',
            region: 'Prevención — Estratificación',
            desc: 'El SCORE2 (Europa) estima el riesgo a 10 años de evento CV fatal+no fatal según edad, sexo, PA sistólica, colesterol no-HDL y tabaquismo. Riesgo bajo: <5%. Moderado: 5-10%. Alto: 10-20%. Muy alto: >20%. El Framingham Risk Score incluye además HDL y diabetes. Determina la intensidad del tratamiento.',
            datos: [
                { l: 'Bajo', v: '<5% a 10 años' },
                { l: 'Moderado', v: '5-10%' },
                { l: 'Alto', v: '10-20%' },
                { l: 'Muy alto', v: '>20%' }
            ]
        },
        {
            name: 'Clasificación NYHA',
            region: 'Insuficiencia Cardíaca — Funcional',
            desc: 'Clasifica la limitación funcional en IC. Clase I: sin limitación, actividad habitual sin síntomas. Clase II: limitación leve, síntomas con esfuerzo moderado. Clase III: limitación marcada, síntomas con mínimo esfuerzo. Clase IV: síntomas en reposo, incapacidad total. Correlaciona con pronóstico.',
            datos: [
                { l: 'NYHA I', v: 'Sin limitación' },
                { l: 'NYHA II', v: 'Esfuerzo moderado' },
                { l: 'NYHA III', v: 'Mínimo esfuerzo' },
                { l: 'NYHA IV', v: 'Reposo' }
            ]
        }
    ]
};

console.log('✅ Heart Data: Datos Clínicos cargados');
