/**
 * ═══════════════════════════════════════════════════
 *  LIVER — Nutrición y Salud Hepática
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LIVER_DATA = window.__LIVER_DATA || {};

window.__LIVER_DATA.nutricion = {
    title: 'Nutrición Hepática',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Proteínas y Aminoácidos',
            region: 'Síntesis Proteica — Regeneración',
            desc: 'Ingesta adecuada de proteínas (1.0-1.5 g/kg/día) es esencial para síntesis proteica hepática y regeneración. Aminoácidos ramificados (leucina, isoleucina, valina) son especialmente importantes en cirrosis, mejoran encefalopatía hepática al competir con aminoácidos aromáticos por entrada al cerebro. Fuentes: carnes magras, pescado, huevos, legumbres.',
            datos: [
                { l: 'Dosis diaria', v: '1.0-1.5 g/kg' },
                { l: 'BCAA', v: 'Leucina, isoleu., val.' },
                { l: 'Beneficio', v: 'Encefalopatía' },
                { l: 'Fuentes', v: 'Carnes, pescado' }
            ]
        },
        {
            name: 'Antioxidantes y Polifenoles',
            region: 'Estrés Oxidativo — Protección',
            desc: 'El estrés oxidativo participa en daño hepatocelular. Antioxidantes reducen especies reactivas de oxígeno (ROS). Vitamina E (400-800 UI/día) mejora EHNA en estudios. Vitamina C potencia efecto. Polifenoles del café (2-3 tazas/día) reducen riesgo fibrosis. Silimarina (cardo mariano) tiene propiedades hepatoprotectoras, aunque evidencia es limitada.',
            datos: [
                { l: 'Vit. E en EHNA', v: '400-800 UI/día' },
                { l: 'Café', v: '2-3 tazas/día' },
                { l: 'Efecto café', v: '↓ Fibrosis' },
                { l: 'Silimarina', v: 'Hepatoprotector' }
            ]
        },
        {
            name: 'Ácidos Grasos Omega-3',
            region: 'Inflamación — Esteatosis',
            desc: 'EPA y DHA reducen inflamación hepática y acumulación de triglicéridos. Disminuyen síntesis de triglicéridos hepáticos (↓ SREBP-1c), aumentan β-oxidación (↑ PPAR-α), tienen efecto antiinflamatorio. Estudios muestran mejora en esteatosis hepática con 2-4 g/día. Fuentes: pescados grasos (salmón, caballa, sardinas), aceite de pescado, algas.',
            datos: [
                { l: 'Dosis efectiva', v: '2-4 g/día' },
                { l: 'Efecto', v: '↓ Esteatosis' },
                { l: 'Mecanismo', v: '↓ TG, ↑ β-oxid.' },
                { l: 'Fuentes', v: 'Pescado graso' }
            ]
        },
        {
            name: 'Colina',
            region: 'Metabolismo Lipídico — VLDL',
            desc: 'Nutriente esencial para exportación de triglicéridos hepáticos como VLDL. Déficit de colina causa esteatosis hepática. Necesidad diaria: hombres 550 mg, mujeres 425 mg, aumenta en embarazo. Fuentes: huevos (1 huevo ~150 mg), hígado, carne, soja. Suplementación mejora función hepática en EHGNA. Precursor de fosfatidilcolina y acetilcolina.',
            datos: [
                { l: 'Hombres', v: '550 mg/día' },
                { l: 'Mujeres', v: '425 mg/día' },
                { l: 'Huevo grande', v: '~150 mg' },
                { l: 'Déficit causa', v: 'Esteatosis' }
            ]
        },
        {
            name: 'Vitamina D',
            region: 'Metabolismo — Fibrosis',
            desc: 'El hígado realiza 25-hidroxilación de vitamina D (primer paso activación). Niveles bajos (<20 ng/mL) son comunes en hepatopatías crónicas y se asocian a progresión de fibrosis. Suplementación (2000-4000 UI/día) mejora respuesta inmune, reduce inflamación. Objetivos: 25-OH vitamina D >30 ng/mL. Evaluar niveles en enfermedades hepáticas crónicas.',
            datos: [
                { l: 'Deficiencia', v: '<20 ng/mL' },
                { l: 'Objetivo', v: '>30 ng/mL' },
                { l: 'Suplementación', v: '2000-4000 UI/día' },
                { l: 'Beneficio', v: '↓ Fibrosis' }
            ]
        },
        {
            name: 'Restricción de Fructosa',
            region: 'EHGNA — Lipogénesis',
            desc: 'La fructosa se metaboliza casi exclusivamente en hígado, donde favorece lipogénesis de novo y esteatosis. Alto consumo (>50 g/día, común en bebidas azucaradas) aumenta riesgo EHGNA. A diferencia de glucosa, la fructosa no estimula insulina ni leptina. Limitar consumo de fructosa añadida (jarabe maíz alto fructosa, azúcar) mejora esteatosis.',
            datos: [
                { l: 'Metabol. hepát.', v: '~90% fructosa' },
                { l: 'Límite', v: '<50 g/día' },
                { l: 'Efecto', v: 'Lipogénesis' },
                { l: 'Riesgo EHGNA', v: '↑ Alto consumo' }
            ]
        },
        {
            name: 'Cafeína y Salud Hepática',
            region: 'Café — Hepatoprotección',
            desc: 'El consumo regular de café (2-4 tazas/día, ~200-400 mg cafeína) se asocia con menor riesgo de cirrosis, hepatocarcinoma y progresión de fibrosis. Mecanismos: antioxidantes (ácido clorogénico), antiinflamatorios, inhibición fibrosis. Beneficios en hepatitis C, EHGNA, cirrosis alcohólica. Efecto protector es dosis-dependiente. No aplica a otras fuentes de cafeína.',
            datos: [
                { l: 'Dosis', v: '2-4 tazas/día' },
                { l: '↓ Cirrosis', v: '~40-50%' },
                { l: '↓ Hepatocarc.', v: '~40%' },
                { l: 'Específico', v: 'Café (no cafeína)' }
            ]
        },
        {
            name: 'Restricción de Sodio',
            region: 'Ascitis — Hipertensión Portal',
            desc: 'En cirrosis con ascitis, la retención de sodio y agua empeora acumulación de líquido. Restricción de sodio a 2000 mg/día (2 g/día o ~5 g sal) es fundamental. Limitar alimentos procesados, embutidos, enlatados, quesos curados. Combinado con diuréticos (espironolactona, furosemida), facilita control de ascitis. Restricción hídrica (<1.5 L/día) solo si hiponatremia (<125 mEq/L).',
            datos: [
                { l: 'Límite Na⁺', v: '<2000 mg/día' },
                { l: 'Equivale sal', v: '~5 g/día' },
                { l: 'Líquidos', v: '<1.5 L si hipoNa' },
                { l: 'Con diuréticos', v: 'Espironolactona' }
            ]
        }
    ]
};

console.log('✅ Liver Data: Nutrición cargada');
