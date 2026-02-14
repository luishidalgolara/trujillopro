/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS — Nutrición y Dieta Pancreática
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__PANCREAS_DATA = window.__PANCREAS_DATA || {};

window.__PANCREAS_DATA.nutricion = {
    title: 'Nutrición Pancreática',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Dieta en Pancreatitis Aguda',
            region: 'Reposo Pancreático — Nutrición Precoz',
            desc: 'Paradigma actual: nutrición enteral precoz (24-48h) preferible a ayuno prolongado. Evidencia: reduce mortalidad, infección, estancia hospitalaria vs. nutrición parenteral. Pancreatitis leve: dieta oral baja en grasas (<30g/día) tan pronto tolere. Pancreatitis severa: nutrición enteral por sonda nasoyeyunal o nasogástrica. Evitar ayuno >1 semana.',
            datos: [
                { l: 'Inicio NE', v: '24-48 horas' },
                { l: 'Grasas', v: '<30 g/día inicial' },
                { l: 'Vía preferida', v: 'Enteral > parenteral' },
                { l: 'Beneficio', v: '↓ Mortalidad' }
            ]
        },
        {
            name: 'Enzimas Pancreáticas Exógenas',
            region: 'Terapia Sustitutiva — Insuficiencia',
            desc: 'Indicadas en insuficiencia pancreática exocrina (IPE): pancreatitis crónica, FQ, cirugía pancreática. Preparados: microesferas con cubierta entérica que liberan enzimas a pH >5.5. Dosis: 25.000-75.000 U lipasa/comida, 10.000-25.000/colación. Administrar al inicio comidas con IBP (reducir inactivación ácida). Objetivo: esteatorrea <7g grasa fecal/día.',
            datos: [
                { l: 'Dosis comida', v: '25-75k U lipasa' },
                { l: 'Dosis colación', v: '10-25k U' },
                { l: 'Coadyuvante', v: 'IBP' },
                { l: 'Objetivo', v: '<7g grasa fecal/día' }
            ]
        },
        {
            name: 'Triglicéridos de Cadena Media (MCT)',
            region: 'Grasas en Insuficiencia Exocrina',
            desc: 'Triglicéridos con ácidos grasos de 6-12 carbonos. Ventaja: absorción directa por mucosa intestinal sin necesidad de lipasa pancreática ni sales biliares, van directo a vena porta (no quilomicrones). Fuentes: aceite MCT, aceite coco. Útiles en IPE severa, aunque pueden causar diarrea osmótica si >30% de calorías. Complementar con ácidos grasos esenciales.',
            datos: [
                { l: 'Carbonos', v: '6-12 (cadena media)' },
                { l: 'Absorción', v: 'Sin lipasa necesaria' },
                { l: 'Fuente', v: 'Aceite MCT, coco' },
                { l: 'Límite', v: '<30% calorías' }
            ]
        },
        {
            name: 'Vitaminas Liposolubles',
            region: 'Suplementación en Esteatorrea',
            desc: 'La malabsorción grasa en IPE compromete absorción de vitaminas A, D, E, K. Deficiencia A: xeroftalmia, nictalopía. D: osteoporosis, osteomalacia. E: neuropatía, ataxia. K: coagulopatía. Monitorizar niveles séricos anualmente. Dosis típicas: vitamina A 10.000-25.000 UI/día, D 1000-2000 UI, E 400-800 UI, K 5-10 mg (si INR prolongado).',
            datos: [
                { l: 'Afectadas', v: 'A, D, E, K' },
                { l: 'Vitamina D', v: '1000-2000 UI/día' },
                { l: 'Vitamina E', v: '400-800 UI/día' },
                { l: 'Monitoreo', v: 'Anual' }
            ]
        },
        {
            name: 'Dieta en Diabetes Pancreática',
            region: 'Control Glucémico — Diabetes Tipo 3c',
            desc: 'Diabetes pancreatogénica (tipo 3c): deficiencia tanto de insulina como glucagón y polipéptido pancreático. Manejo nutricional: carbohidratos complejos 45-50% calorías, distribuidos en 5-6 comidas. Índice glucémico bajo. Proteína 1.2-1.5 g/kg (riesgo desnutrición). Grasas 30-35%. Fibra 25-30 g/día. Evitar alcohol (hepatotóxico, hipertrigliceridemia). Alto riesgo hipoglucemia.',
            datos: [
                { l: 'Carbohidratos', v: '45-50% (IG bajo)' },
                { l: 'Proteína', v: '1.2-1.5 g/kg' },
                { l: 'Comidas', v: '5-6/día' },
                { l: 'Riesgo', v: 'Hipoglucemia' }
            ]
        },
        {
            name: 'Antioxidantes y Prevención',
            region: 'Micronutrientes Protectores',
            desc: 'Estrés oxidativo implícito en pancreatitis crónica. Evidencia limitada pero prometedora: vitamina C (500-1000 mg/día), vitamina E (400-600 UI), selenio (200 μg), β-caroteno. Estudio Indiano: antioxidantes redujeron episodios dolorosos en pancreatitis crónica. Curcumina (cúrcuma) muestra efecto antiinflamatorio in vitro. Dieta mediterránea: omega-3, polifenoles.',
            datos: [
                { l: 'Vitamina C', v: '500-1000 mg/día' },
                { l: 'Selenio', v: '200 μg/día' },
                { l: 'Curcumina', v: 'Antiinflamatorio' },
                { l: 'Patrón dieta', v: 'Mediterránea' }
            ]
        },
        {
            name: 'Alcohol y Páncreas',
            region: 'Principal Factor de Riesgo Evitable',
            desc: 'Consumo crónico de alcohol (>60-80 g/día por >5 años) causa 70-80% de pancreatitis crónica. Mecanismo: metabolitos tóxicos (acetaldehído), activación prematura de enzimas, precipitación proteica en conductos, estrés oxidativo. Riesgo aumenta con tabaco (efecto sinérgico). Abstinencia total es esencial: enlentece progresión de fibrosis. Incluso consumo moderado perjudicial en pancreatitis establecida.',
            datos: [
                { l: 'Riesgo', v: '>60-80 g/día >5a' },
                { l: 'Causa PC', v: '70-80%' },
                { l: 'Sinergismo', v: 'Tabaco' },
                { l: 'Recomendación', v: 'Abstinencia total' }
            ]
        },
        {
            name: 'Restricción de Grasas',
            region: 'Manejo Síntomas Pancreatitis Crónica',
            desc: 'Grasas estimulan CCK → secreción pancreática → dolor en conductos obstruidos. Restricción a 50-75 g/día (20-30% calorías) reduce dolor en algunos pacientes. Sin embargo, restricción excesiva (<30 g/día) causa desnutrición. Fraccionar grasa en 6 comidas. MCT son alternativa mejor tolerada. Individualizar según tolerancia y estado nutricional. Priorizar: evitar desnutrición.',
            datos: [
                { l: 'Objetivo', v: '50-75 g/día' },
                { l: 'Porcentaje', v: '20-30% calorías' },
                { l: 'Comidas', v: '6/día (fraccionar)' },
                { l: 'Prioridad', v: 'Evitar desnutrición' }
            ]
        }
    ]
};

console.log('✅ Páncreas Data: Nutrición cargada');
