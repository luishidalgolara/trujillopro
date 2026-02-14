/**
 * ═══════════════════════════════════════════════════
 *  NERVOUS SYSTEM — Nutrición y Salud Neuronal
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__NERVOUS_DATA = window.__NERVOUS_DATA || {};

window.__NERVOUS_DATA.nutricion = {
    title: 'Nutrición Neuronal',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Ácidos Grasos Omega-3 (DHA/EPA)',
            region: 'Estructura Neuronal — Función Cognitiva',
            desc: 'DHA (ácido docosahexaenoico) constituye 40% de ácidos grasos poliinsaturados en cerebro, 60% en retina. Esencial para desarrollo cerebral fetal/infantil, mantenimiento membranas neuronales, neurogénesis. EPA (eicosapentaenoico) tiene efecto antiinflamatorio. Mejora función cognitiva, reduce riesgo demencia 30-40%. Dosis: 1-2 g/día. Fuentes: pescados grasos, algas, aceite pescado.',
            datos: [
                { l: 'DHA cerebral', v: '~40% AGPI' },
                { l: 'Dosis', v: '1-2 g/día' },
                { l: '↓ Demencia', v: '30-40%' },
                { l: 'Fuentes', v: 'Pescado graso' }
            ]
        },
        {
            name: 'Vitaminas del Complejo B',
            region: 'Metabolismo — Mielina — Homocisteína',
            desc: 'B1 (tiamina): metabolismo glucosa neuronal, déficit causa encefalopatía de Wernicke. B6 (piridoxina): síntesis neurotransmisores. B9 (folato): desarrollo neural, déficit en embarazo causa defectos tubo neural. B12 (cobalamina): síntesis mielina, déficit causa neuropatía, demencia. B6/B9/B12 reducen homocisteína (factor riesgo Alzheimer, ACV). Veganos requieren suplementación B12.',
            datos: [
                { l: 'B1 déficit', v: 'Encef. Wernicke' },
                { l: 'B12 déficit', v: 'Neuropatía' },
                { l: 'B9 embarazo', v: 'Previene DTN' },
                { l: 'Homocisteína', v: 'B6/B9/B12 ↓' }
            ]
        },
        {
            name: 'Antioxidantes',
            region: 'Estrés Oxidativo — Neuroprotección',
            desc: 'El cerebro es vulnerable al estrés oxidativo (alto consumo O₂, lípidos peroxidables). Vitamina E (tocoferoles): protege membranas, reduce riesgo Alzheimer. Vitamina C: regenera vitamina E, neuroprotección. Polifenoles (flavonoides en frutas, té verde): mejoran función cognitiva, reducen neuroinflamación. Resveratrol (uvas): activa sirtuinas (longevidad). Consumo alto frutas/verduras asociado menor declive cognitivo.',
            datos: [
                { l: 'Vit. E', v: '↓ Alzheimer' },
                { l: 'Polifenoles', v: 'Función cognitiva' },
                { l: 'Resveratrol', v: 'Neuroprotector' },
                { l: 'Frutas/verduras', v: '↑ Cognición' }
            ]
        },
        {
            name: 'Colina',
            region: 'Acetilcolina — Desarrollo Cerebral',
            desc: 'Precursor de acetilcolina (neurotransmisor de memoria, aprendizaje) y fosfatidilcolina (membrana neuronal). Esencial en embarazo para desarrollo cerebral fetal. Necesidades: hombres 550 mg/día, mujeres 425 mg/día, embarazo 450 mg/día, lactancia 550 mg/día. Déficit: daño hepático, deterioro cognitivo. Fuentes: huevos (1 huevo ~150 mg), hígado, carne, soja, brócoli.',
            datos: [
                { l: 'Hombres', v: '550 mg/día' },
                { l: 'Mujeres', v: '425 mg/día' },
                { l: 'Embarazo', v: '450 mg/día' },
                { l: 'Huevo', v: '~150 mg' }
            ]
        },
        {
            name: 'Magnesio',
            region: 'Transmisión Sináptica — Neuroprotección',
            desc: 'Cofactor en >300 reacciones enzimáticas, incluyendo síntesis ATP. Bloquea receptores NMDA (glutamato) previniendo excitotoxicidad. Déficit (común): migraña, ansiedad, depresión, calambres. Dosis: hombres 400-420 mg/día, mujeres 310-320 mg/día. Fuentes: frutos secos, legumbres, vegetales verdes, cereales integrales. Magnesio IV en migraña aguda, sulfato de magnesio en eclampsia.',
            datos: [
                { l: 'Hombres', v: '400-420 mg/día' },
                { l: 'Mujeres', v: '310-320 mg/día' },
                { l: 'Bloquea', v: 'Receptores NMDA' },
                { l: 'Déficit', v: 'Migraña, ansiedad' }
            ]
        },
        {
            name: 'Cafeína',
            region: 'Estimulante — Neuroprotección',
            desc: 'Antagonista receptores adenosina A1/A2A, previene somnolencia. Mejora alerta, concentración, rendimiento cognitivo. Consumo moderado (200-400 mg/día, 2-4 tazas café) reduce riesgo Parkinson ~30%, Alzheimer ~27%. Efecto agudo: aumenta dopamina, noradrenalina. Tolerancia se desarrolla. Exceso (>600 mg/día): ansiedad, insomnio, taquicardia. Vida media: 3-5 horas.',
            datos: [
                { l: 'Dosis moderada', v: '200-400 mg/día' },
                { l: '↓ Parkinson', v: '~30%' },
                { l: '↓ Alzheimer', v: '~27%' },
                { l: 'Vida media', v: '3-5 h' }
            ]
        },
        {
            name: 'Glucosa',
            region: 'Combustible Cerebral',
            desc: 'El cerebro consume 20% de glucosa corporal (120 g/día, 420 kcal) pese a ser 2% peso corporal. Neuronas dependen casi exclusivamente de glucosa (pueden usar cetonas en ayuno prolongado). Hipoglucemia (<50-60 mg/dL): confusión, alteración cognitiva, convulsiones, coma. Hiperglucemia crónica (diabetes): daño microvascular, neuropatía, deterioro cognitivo. Índice glucémico bajo favorece función cognitiva estable.',
            datos: [
                { l: 'Consumo cerebral', v: '~20%' },
                { l: 'Cantidad/día', v: '~120 g' },
                { l: 'Hipoglucemia', v: '<50-60 mg/dL' },
                { l: 'Preferencia', v: 'IG bajo' }
            ]
        },
        {
            name: 'Hidratación',
            region: 'Función Cognitiva — Volumen Cerebral',
            desc: 'El cerebro es 75% agua. Deshidratación leve (1-2% peso corporal): deterioro atención, memoria, estado ánimo, aumento fatiga. Deshidratación moderada (>2%): confusión, mareo. Ancianos tienen menor sensación sed, mayor riesgo. Necesidades: 2-3 L/día (ajustar por ejercicio, clima). Electrolitos (Na⁺, K⁺) críticos para función neuronal. Hiponatremia (<135 mEq/L): confusión, convulsiones, edema cerebral.',
            datos: [
                { l: 'Cerebro', v: '~75% agua' },
                { l: 'Deshid. leve', v: '1-2% peso' },
                { l: 'Necesidades', v: '2-3 L/día' },
                { l: 'Hiponatremia', v: '<135 mEq/L' }
            ]
        }
    ]
};

console.log('✅ Nervous Data: Nutrición cargada');
