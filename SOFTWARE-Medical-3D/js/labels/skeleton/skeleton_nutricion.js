/**
 * ═══════════════════════════════════════════════════
 *  SKELETON SYSTEM — Nutrición y Salud Ósea
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__SKELETON_DATA = window.__SKELETON_DATA || {};

window.__SKELETON_DATA.nutricion = {
    title: 'Nutrición Ósea',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Calcio',
            region: 'Mineral Estructural Principal',
            desc: 'El 99% del calcio corporal está en huesos y dientes como hidroxiapatita. Esencial para mineralización ósea. Absorción intestinal: 30-40% (↑ por vitamina D activa, acidez gástrica; ↓ por fitatos, oxalatos). Pico masa ósea a 25-30 años. Recomendaciones: adultos 1000 mg/día, >50 años 1200 mg/día, embarazo/lactancia 1000-1300 mg/día. Fuentes: lácteos (leche 300 mg/taza), sardinas con espinas, vegetales verdes, tofu fortificado, almendras. Exceso (>2500 mg/día): cálculos renales, hipercalcemia.',
            datos: [
                { l: 'Adultos', v: '1000 mg/día' },
                { l: '>50 años', v: '1200 mg/día' },
                { l: 'Absorción', v: '30-40%' },
                { l: 'Leche', v: '~300 mg/taza' }
            ]
        },
        {
            name: 'Vitamina D',
            region: 'Hormona Calciotrófica — Sol',
            desc: 'Prohormona esencial para absorción calcio intestinal y mineralización ósea. Síntesis: 7-dehidrocolesterol en piel + UVB (290-315 nm) → vitamina D₃. Activación: hidroxilación hepática (25-OH-D₃) → hidroxilación renal (1,25-(OH)₂-D₃ calcitriol, forma activa). Funciones: ↑ absorción intestinal Ca²⁺ y P, ↑ reabsorción renal Ca²⁺, permite mineralización. Déficit: raquitismo (niños), osteomalacia (adultos), ↑ riesgo osteoporosis. Recomendaciones: 600-800 UI/día, >70 años 800-1000 UI/día. Fuentes: exposición solar 15-30 min/día, pescados grasos, yema huevo, fortificados.',
            datos: [
                { l: 'Adultos', v: '600-800 UI/día' },
                { l: '>70 años', v: '800-1000 UI/día' },
                { l: 'Nivel óptimo', v: '>30 ng/mL' },
                { l: 'Sol', v: '15-30 min/día' }
            ]
        },
        {
            name: 'Proteínas',
            region: 'Matriz Orgánica Ósea',
            desc: 'El colágeno tipo I constituye 90% de matriz orgánica ósea. Proteínas proveen aminoácidos (lisina, prolina, glicina) para síntesis colágeno. Ingesta proteica adecuada mejora densidad mineral ósea y reduce fracturas. Muy baja: deterioro masa ósea, sarcopenia. Muy alta (>2 g/kg/día) sin calcio adecuado: pérdida cálcica urinaria. Recomendaciones: adultos 0.8-1.0 g/kg/día, ancianos 1.0-1.2 g/kg/día (contrarrestar sarcopenia). Fuentes: carnes, pescados, lácteos, legumbres, frutos secos. Balance calcio-proteína importante.',
            datos: [
                { l: 'Adultos', v: '0.8-1.0 g/kg/día' },
                { l: 'Ancianos', v: '1.0-1.2 g/kg/día' },
                { l: 'Matriz ósea', v: '90% colágeno I' },
                { l: 'Balance', v: 'Proteína + calcio' }
            ]
        },
        {
            name: 'Vitamina K',
            region: 'Carboxilación — Osteocalcina',
            desc: 'Cofactor para γ-carboxilación de proteínas óseas (osteocalcina, proteína matriz Gla). Osteocalcina carboxilada se une a hidroxiapatita facilitando mineralización. Vitamina K₁ (filoquinona): vegetales verdes. Vitamina K₂ (menaquinona): fermentados, producción intestinal. Déficit: osteocalcina subcarboxilada (no funcional), ↓ calidad ósea, ↑ fracturas. Alta ingesta K asociada a mayor DMO y menor riesgo fractura cadera. Recomendaciones: hombres 120 μg/día, mujeres 90 μg/día. Fuentes: kale, espinacas, brócoli, natto, quesos.',
            datos: [
                { l: 'Hombres', v: '120 μg/día' },
                { l: 'Mujeres', v: '90 μg/día' },
                { l: 'Función', v: 'Carboxilación osteocalcina' },
                { l: 'Fuente rica', v: 'Vegetales verdes' }
            ]
        },
        {
            name: 'Magnesio',
            region: 'Cofactor Metabólico — Cristal',
            desc: 'El 50-60% del magnesio corporal está en hueso, parte de cristales hidroxiapatita. Cofactor en >300 reacciones enzimáticas incluyendo síntesis vitamina D activa. Necesario para secreción y acción PTH. Déficit: ↓ PTH, resistencia PTH, ↓ vitamina D activa, alteración cristalización ósea. Asociado a ↓ DMO y ↑ osteoporosis. Recomendaciones: hombres 400-420 mg/día, mujeres 310-320 mg/día. Fuentes: frutos secos (almendras, anacardos), legumbres, cereales integrales, vegetales verdes, chocolate negro.',
            datos: [
                { l: 'Hombres', v: '400-420 mg/día' },
                { l: 'Mujeres', v: '310-320 mg/día' },
                { l: 'En hueso', v: '50-60% corporal' },
                { l: 'Almendras', v: '~270 mg/100g' }
            ]
        },
        {
            name: 'Fósforo',
            region: 'Mineral Estructural — Hidroxiapatita',
            desc: 'El 85% del fósforo corporal está en hueso como fosfato de calcio (hidroxiapatita Ca₁₀(PO₄)₆(OH)₂). Relación Ca:P óptima ~1.3:1 en dieta. Exceso fósforo (refrescos, procesados): ↑ FGF23, ↓ calcitriol, ↑ PTH, resorción ósea. Déficit (raro): raquitismo/osteomalacia hipofosfatémica. Recomendaciones: adultos 700 mg/día (similar a calcio). Fuentes: lácteos, carnes, pescados, legumbres, frutos secos. Refrescos cola: alto P, bajo Ca (desaconsejados para salud ósea).',
            datos: [
                { l: 'Adultos', v: '700 mg/día' },
                { l: 'En hueso', v: '85% corporal' },
                { l: 'Relación Ca:P', v: '~1.3:1 óptima' },
                { l: 'Exceso', v: 'Refrescos cola' }
            ]
        },
        {
            name: 'Vitamina C',
            region: 'Síntesis de Colágeno',
            desc: 'Cofactor esencial para hidroxilación de prolina y lisina en síntesis de colágeno. Colágeno tipo I es principal proteína estructural ósea. Déficit severo (escorbuto): defecto síntesis colágeno, hemorragias subperiósticas, dolor óseo, retraso consolidación fracturas. Alta ingesta vitamina C asociada a mayor DMO en estudios observacionales. Antioxidante protege osteoblastos de estrés oxidativo. Recomendaciones: adultos 75-90 mg/día, fumadores +35 mg/día. Fuentes: cítricos, kiwi, pimientos, fresas, brócoli.',
            datos: [
                { l: 'Adultos', v: '75-90 mg/día' },
                { l: 'Fumadores', v: '+35 mg/día' },
                { l: 'Función', v: 'Hidroxilación colágeno' },
                { l: 'Déficit', v: 'Escorbuto' }
            ]
        },
        {
            name: 'Fitoestrógenos (Isoflavonas)',
            region: 'Moduladores Estrogénicos — Soja',
            desc: 'Compuestos vegetales con actividad estrogénica débil. Principales: genisteína, daidzeína (soja). Mecanismo: se unen receptores estrogénicos, efecto modulador (agonista parcial). Posmenopáusica: pueden ↓ resorción ósea parcialmente supliendo déficit estrogénico. Metaanálisis: ingesta alta isoflavonas de soja asociada a ↑ DMO columna lumbar (+54 mg/m² por 25 mg isoflavonas/día). Efecto modesto comparado con THS. Dosis: 40-80 mg isoflavonas/día. Fuentes: soja, tofu, tempeh, miso, edamame.',
            datos: [
                { l: 'Dosis', v: '40-80 mg/día' },
                { l: 'Efecto DMO', v: 'Modesto (+54 mg/m²)' },
                { l: 'Principales', v: 'Genisteína, daidzeína' },
                { l: 'Fuente', v: 'Soja y derivados' }
            ]
        }
    ]
};

console.log('✅ Skeleton Data: Nutrición cargada');
