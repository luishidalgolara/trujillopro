/**
 * ═══════════════════════════════════════════════════
 *  LUNGS — Nutrición y Salud Pulmonar
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LUNGS_DATA = window.__LUNGS_DATA || {};

window.__LUNGS_DATA.nutricion = {
    title: 'Nutrición Pulmonar',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Antioxidantes y Función Pulmonar',
            region: 'Estrés Oxidativo — Protección',
            desc: 'Los pulmones están expuestos constantemente a oxidantes (contaminación, tabaco, O₂ alto). Antioxidantes protegen contra daño: vitamina C (500-1000 mg/día) mejora función pulmonar, vitamina E (200-400 UI/día) reduce inflamación, betacaroteno (15-30 mg/día). Estudios muestran que alta ingesta de frutas/verduras se asocia con mejor FEV1 y menor riesgo EPOC.',
            datos: [
                { l: 'Vit. C', v: '500-1000 mg/día' },
                { l: 'Vit. E', v: '200-400 UI/día' },
                { l: 'Betacaroteno', v: '15-30 mg/día' },
                { l: 'Beneficio', v: '↑ FEV1, ↓ EPOC' }
            ]
        },
        {
            name: 'Ácidos Grasos Omega-3',
            region: 'Inflamación — Asma y EPOC',
            desc: 'EPA y DHA tienen efectos antiinflamatorios al competir con ácido araquidónico, reduciendo producción de leucotrienos proinflamatorios. En asma: 2-4 g/día reduce inflamación de vías aéreas y broncoconstricción inducida por ejercicio. En EPOC: mejora función pulmonar, reduce exacerbaciones. Fuentes: pescados grasos (salmón, caballa, sardinas), aceite de pescado, algas.',
            datos: [
                { l: 'Dosis', v: '2-4 g/día' },
                { l: 'Efecto', v: 'Antiinflamatorio' },
                { l: 'Beneficio asma', v: '↓ Broncoconstr.' },
                { l: 'Fuentes', v: 'Pescado graso' }
            ]
        },
        {
            name: 'Vitamina D',
            region: 'Inmunidad — Infecciones Respiratorias',
            desc: 'La vitamina D modula respuesta inmune innata y adaptativa. Déficit (<20 ng/mL) se asocia con mayor riesgo infecciones respiratorias (neumonía, tuberculosis), exacerbaciones de asma y EPOC. Suplementación (1000-2000 UI/día) reduce infecciones respiratorias en 12-25%, especialmente en deficientes. Objetivo: niveles >30 ng/mL.',
            datos: [
                { l: 'Déficit', v: '<20 ng/mL' },
                { l: 'Objetivo', v: '>30 ng/mL' },
                { l: 'Suplementación', v: '1000-2000 UI/día' },
                { l: '↓ Infecciones', v: '12-25%' }
            ]
        },
        {
            name: 'Magnesio',
            region: 'Broncodilatación — Asma',
            desc: 'El magnesio tiene efecto broncodilatador al inhibir entrada de calcio en músculo liso bronquial. Déficit de magnesio (<1.7 mg/dL) se asocia con peor control del asma. Ingesta adecuada: hombres 400-420 mg/día, mujeres 310-320 mg/día. Fuentes: frutos secos, legumbres, verduras de hoja verde, cereales integrales. En crisis asmática severa: sulfato de magnesio IV como broncodilatador.',
            datos: [
                { l: 'Hombres', v: '400-420 mg/día' },
                { l: 'Mujeres', v: '310-320 mg/día' },
                { l: 'Efecto', v: 'Broncodilatador' },
                { l: 'Crisis asma', v: 'MgSO₄ IV' }
            ]
        },
        {
            name: 'Quercetina',
            region: 'Flavonoide — Antihistamínico',
            desc: 'Flavonoide con propiedades antiinflamatorias y antihistamínicas naturales. Inhibe liberación de histamina de mastocitos, reduce inflamación de vías aéreas. Dosis: 500-1000 mg/día. Beneficios en asma alérgica: reduce síntomas, mejora función pulmonar. Fuentes naturales: cebollas, manzanas, té verde, brócoli, bayas. Bien tolerado, pocos efectos adversos.',
            datos: [
                { l: 'Dosis', v: '500-1000 mg/día' },
                { l: 'Efecto', v: 'Antihistamínico' },
                { l: 'Beneficio', v: 'Asma alérgica' },
                { l: 'Fuentes', v: 'Cebolla, manzana' }
            ]
        },
        {
            name: 'N-Acetilcisteína (NAC)',
            region: 'Mucolítico — Antioxidante',
            desc: 'Precursor del glutatión (antioxidante endógeno). Efectos: mucolítico (rompe puentes disulfuro del moco), antioxidante, antiinflamatorio. Dosis: 600-1200 mg/día. En EPOC: reduce exacerbaciones (30-50% menos), mejora síntomas. En bronquitis crónica: facilita expectoración, reduce días de enfermedad. Generalmente seguro, puede causar náuseas en dosis altas.',
            datos: [
                { l: 'Dosis', v: '600-1200 mg/día' },
                { l: 'Efecto', v: 'Mucolítico' },
                { l: '↓ Exacerbaciones', v: '30-50% EPOC' },
                { l: 'Precursor', v: 'Glutatión' }
            ]
        },
        {
            name: 'Proteínas y Músculo Respiratorio',
            region: 'Diafragma — Función Ventilatoria',
            desc: 'Ingesta proteica adecuada (1.2-1.5 g/kg/día) es esencial para mantener masa muscular respiratoria, especialmente en EPOC. Déficit proteico causa sarcopenia del diafragma, debilidad muscular respiratoria, hipoventilación. Aminoácidos ramificados (BCAA) mejoran fuerza muscular respiratoria. Desnutrición en EPOC severa aumenta mortalidad 2-3 veces.',
            datos: [
                { l: 'Dosis', v: '1.2-1.5 g/kg/día' },
                { l: 'BCAA', v: 'Fuerza respirat.' },
                { l: 'Déficit causa', v: 'Sarcopenia diafrg.' },
                { l: 'Desnutrición', v: '×2-3 mortalidad' }
            ]
        },
        {
            name: 'Hidratación y Mucosidad',
            region: 'Fluidificación del Moco',
            desc: 'Hidratación adecuada (2-3 L/día) mantiene moco menos viscoso, facilitando su eliminación por cilios. Deshidratación espesa el moco, dificulta clearance mucociliar, aumenta riesgo infecciones. Especialmente importante en EPOC, fibrosis quística, bronquiectasias. Evitar exceso de cafeína y alcohol (deshidratantes). Humidificadores pueden ayudar en ambientes secos.',
            datos: [
                { l: 'Ingesta', v: '2-3 L/día' },
                { l: 'Efecto', v: 'Fluidifica moco' },
                { l: 'Deshidratación', v: 'Moco espeso' },
                { l: 'Importante en', v: 'EPOC, FQ' }
            ]
        }
    ]
};

console.log('✅ Lungs Data: Nutrición cargada');
