/**
 * ═══════════════════════════════════════════════════
 *  LIVER — Datos Clínicos y Pruebas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LIVER_DATA = window.__LIVER_DATA || {};

window.__LIVER_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Transaminasas (ALT y AST)',
            region: 'Marcadores de Lesión Hepatocelular',
            desc: 'Enzimas intracelulares liberadas al dañarse hepatocitos. ALT (normal: 7-56 U/L) es más específica de hígado. AST (normal: 10-40 U/L) también en corazón, músculo, riñón. Elevación leve (<5× normal): esteatosis, hepatitis crónica. Moderada (5-15×): hepatitis aguda viral/autoinmune. Severa (>15×): hepatitis fulminante, isquemia, toxicidad paracetamol. Ratio AST/ALT >2 sugiere alcohol.',
            datos: [
                { l: 'ALT normal', v: '7-56 U/L' },
                { l: 'AST normal', v: '10-40 U/L' },
                { l: 'ALT > AST', v: 'Hepatitis viral' },
                { l: 'AST/ALT >2', v: 'Alcohol' }
            ]
        },
        {
            name: 'Fosfatasa Alcalina y GGT',
            region: 'Marcadores de Colestasis',
            desc: 'FA (normal: 40-150 U/L) se eleva en colestasis (obstrucción biliar) pero también en hueso. GGT (normal: 5-55 U/L hombres, 5-38 mujeres) es más específica de vía biliar, también sensible a alcohol. Elevación aislada FA+GGT sugiere colestasis: coledocolitiasis, CBP, CEP, tumor. Ratio ALT/FA <2: hepatocelular; >5: colestásico; 2-5: mixto.',
            datos: [
                { l: 'FA normal', v: '40-150 U/L' },
                { l: 'GGT normal H', v: '5-55 U/L' },
                { l: 'GGT normal M', v: '5-38 U/L' },
                { l: 'FA+GGT', v: 'Colestasis' }
            ]
        },
        {
            name: 'Bilirrubina Sérica',
            region: 'Función Excretora — Ictericia',
            desc: 'Bilirrubina total normal: <1.2 mg/dL. Indirecta (no conjugada): <0.8 mg/dL. Directa (conjugada): <0.3 mg/dL. Ictericia clínica visible con >2-3 mg/dL. Elevación predominante indirecta: hemólisis, síndrome Gilbert. Elevación predominante directa: hepatitis, cirrosis, obstrucción biliar. En falla hepática aguda, hiperbilirrubinemia progresiva indica mal pronóstico.',
            datos: [
                { l: 'Total normal', v: '<1.2 mg/dL' },
                { l: 'Indirecta', v: '<0.8 mg/dL' },
                { l: 'Directa', v: '<0.3 mg/dL' },
                { l: 'Ictericia', v: '>2-3 mg/dL' }
            ]
        },
        {
            name: 'Albúmina Sérica',
            region: 'Función Sintética — Pronóstico',
            desc: 'Proteína sintetizada exclusivamente por hígado, vida media ~20 días. Normal: 3.5-5.5 g/dL. Refleja función sintética crónica (no aguda). <3.5 g/dL: hipoalbuminemia, indica insuficiencia hepática crónica. <2.5 g/dL: severa, asociada a ascitis y edema. Desnutrición, síndrome nefrótico, enteropatía pierde proteínas también causan hipoalbuminemia.',
            datos: [
                { l: 'Normal', v: '3.5-5.5 g/dL' },
                { l: 'Hipoalbum.', v: '<3.5 g/dL' },
                { l: 'Severa', v: '<2.5 g/dL' },
                { l: 'Vida media', v: '~20 días' }
            ]
        },
        {
            name: 'Tiempo de Protrombina (TP/INR)',
            region: 'Función Sintética — Coagulación',
            desc: 'Mide factores de coagulación II, V, VII, X sintetizados en hígado. TP normal: 11-13.5 segundos. INR normal: 0.9-1.1. INR >1.5 indica insuficiencia hepática (sin anticoagulantes). Factor VII tiene vida media corta (~6h), TP/INR detecta disfunción hepática aguda. INR >2.5: alto riesgo sangrado. En falla fulminante, INR >6.5 indica mal pronóstico.',
            datos: [
                { l: 'TP normal', v: '11-13.5 seg' },
                { l: 'INR normal', v: '0.9-1.1' },
                { l: 'Anormal', v: 'INR >1.5' },
                { l: 'Alto riesgo', v: 'INR >2.5' }
            ]
        },
        {
            name: 'Clasificación Child-Pugh',
            region: 'Severidad de Cirrosis — Pronóstico',
            desc: 'Sistema de puntuación para evaluar severidad de cirrosis. 5 parámetros: bilirrubina, albúmina, INR, ascitis, encefalopatía. Puntaje 5-6: Child A (compensada, supervivencia 1 año ~100%). 7-9: Child B (supervivencia 1 año ~80%). 10-15: Child C (descompensada, supervivencia 1 año ~45%). Guía decisiones de tratamiento y prioridad para trasplante.',
            datos: [
                { l: 'Child A', v: '5-6 puntos' },
                { l: 'Child B', v: '7-9 puntos' },
                { l: 'Child C', v: '10-15 puntos' },
                { l: 'Superviv. 1a C', v: '~45%' }
            ]
        },
        {
            name: 'Ecografía Hepática',
            region: 'Imagen No Invasiva — Primera Línea',
            desc: 'Estudio inicial en hepatopatías. Evalúa: tamaño, ecotextura (esteatosis: hígado "brillante"), lesiones focales, vía biliar, ascitis, esplenomegalia, signos hipertensión portal. Doppler evalúa flujo portal y hepático (trombosis, síndrome Budd-Chiari). Elastografía (FibroScan) mide rigidez hepática (kPa) para estimar fibrosis: <7 kPa normal, >12.5 kPa cirrosis.',
            datos: [
                { l: 'Uso', v: 'Primera línea' },
                { l: 'Evalúa', v: 'Tamaño, textura, lesiones' },
                { l: 'FibroScan <7', v: 'Sin fibrosis' },
                { l: 'FibroScan >12.5', v: 'Cirrosis' }
            ]
        },
        {
            name: 'Alfafetoproteína (AFP)',
            region: 'Marcador Tumoral — Hepatocarcinoma',
            desc: 'Proteína fetal normalmente ausente en adultos. Normal: <10 ng/mL. Elevación: hepatocarcinoma (>400 ng/mL en ~60% casos), hepatitis aguda, cirrosis activa, tumores germinales. Screening hepatocarcinoma en cirróticos: AFP cada 6 meses + ecografía. AFP >20 ng/mL con lesión hepática sugiere CHC. Valores muy elevados (>1000 ng/mL) altamente sugestivos.',
            datos: [
                { l: 'Normal', v: '<10 ng/mL' },
                { l: 'CHC', v: '>400 en ~60%' },
                { l: 'Screening', v: 'Cada 6 meses' },
                { l: 'Muy elevada', v: '>1000 ng/mL' }
            ]
        }
    ]
};

console.log('✅ Liver Data: Datos Clínicos cargados');
