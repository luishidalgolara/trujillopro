/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS — Patologías Pancreáticas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__PANCREAS_DATA = window.__PANCREAS_DATA || {};

window.__PANCREAS_DATA.patologias = {
    title: 'Patologías Pancreáticas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Diabetes Mellitus Tipo 1',
            region: 'Destrucción Autoinmune de Células β',
            desc: 'Enfermedad autoinmune mediada por linfocitos T que destruye >90% de células β. Autoanticuerpos: anti-GAD65, anti-IA2, anti-insulina. Inicio típico <30 años. Deficiencia absoluta de insulina → hiperglucemia, poliuria, polidipsia, pérdida de peso. Riesgo de cetoacidosis diabética (CAD). Tratamiento: insulina exógena múltiples dosis.',
            datos: [
                { l: 'Prevalencia', v: '~5-10% diabetes' },
                { l: 'Edad inicio', v: '<30 años típico' },
                { l: 'Destrucción β', v: '>90%' },
                { l: 'Complicación', v: 'Cetoacidosis (CAD)' }
            ]
        },
        {
            name: 'Diabetes Mellitus Tipo 2',
            region: 'Resistencia Insulínica + Disfunción β',
            desc: 'Trastorno metabólico por resistencia periférica a insulina (músculo, hígado, tejido adiposo) más disfunción progresiva de células β. Asociado a obesidad (80%), síndrome metabólico, edad >40 años. Fisiopatología: hiperinsulinemia compensatoria inicial → agotamiento células β → hiperglucemia. Tratamiento: estilo de vida, metformina, insulinosecretagogos.',
            datos: [
                { l: 'Prevalencia', v: '~90-95% diabetes' },
                { l: 'Asociación', v: 'Obesidad (80%)' },
                { l: 'Mecanismo', v: 'Resistencia + ↓ β' },
                { l: 'HbA1c objetivo', v: '<7%' }
            ]
        },
        {
            name: 'Pancreatitis Aguda',
            region: 'Inflamación Pancreática Súbita',
            desc: 'Proceso inflamatorio agudo del páncreas por autodigestión enzimática. Causas principales: cálculos biliares (40%), alcohol (30%), hipertrigliceridemia, CPRE, fármacos. Fisiopatología: activación prematura de tripsina intracelular. Criterios Atlanta: dolor epigástrico + amilasa/lipasa >3× normal. Clasificación: intersticial (80%) o necrosante (20%).',
            datos: [
                { l: 'Causa #1', v: 'Cálculos (40%)' },
                { l: 'Causa #2', v: 'Alcohol (30%)' },
                { l: 'Marcador', v: 'Lipasa >3×' },
                { l: 'Severidad', v: 'Score Ranson/APACHE' }
            ]
        },
        {
            name: 'Pancreatitis Crónica',
            region: 'Inflamación Progresiva con Fibrosis',
            desc: 'Inflamación irreversible con destrucción progresiva del parénquima y sustitución por tejido fibroso. Causa principal: alcohol (70-80%). Triada clásica: dolor abdominal crónico, insuficiencia exocrina (esteatorrea, desnutrición) e insuficiencia endocrina (diabetes). Calcificaciones pancreáticas en TAC son patognomónicas. Complicación: pseudoquistes, cáncer.',
            datos: [
                { l: 'Causa', v: 'Alcohol (70-80%)' },
                { l: 'Triada', v: 'Dolor+Esteat+Diabet' },
                { l: 'Imagen', v: 'Calcificaciones TAC' },
                { l: 'Tto. insuf. exoc.', v: 'Enzimas pancreát.' }
            ]
        },
        {
            name: 'Adenocarcinoma Ductal',
            region: 'Tumor Maligno Más Frecuente (90%)',
            desc: 'Neoplasia altamente agresiva originada en células ductales. 4ª causa muerte por cáncer. 60-70% localizado en cabeza → ictericia obstructiva, signo de Courvoisier (vesícula palpable indolora). Factores riesgo: tabaco, pancreatitis crónica, diabetes. Marcador: CA 19-9. Pronóstico: supervivencia 5 años <10%. Cirugía Whipple si resecable.',
            datos: [
                { l: 'Frecuencia', v: '90% tumores páncr.' },
                { l: 'Localización', v: 'Cabeza (60-70%)' },
                { l: 'Marcador', v: 'CA 19-9' },
                { l: 'Superviv. 5a', v: '<10%' }
            ]
        },
        {
            name: 'Insulinoma',
            region: 'Tumor Neuroendocrino de Células β',
            desc: 'Tumor funcional más frecuente del páncreas (40-50% de tumores neuroendocrinos). Secreción autónoma de insulina → hipoglucemias recurrentes. Triada de Whipple: síntomas de hipoglucemia (sudoración, palpitaciones, confusión) + glucemia <50 mg/dL + alivio con glucosa. 90% benignos, 90% solitarios, 90% <2 cm. Tratamiento: resección quirúrgica.',
            datos: [
                { l: 'Frecuencia TNE', v: '40-50%' },
                { l: 'Triada Whipple', v: 'Sínt+Gluc<50+Alivio' },
                { l: 'Benignos', v: '~90%' },
                { l: 'Tratamiento', v: 'Cirugía' }
            ]
        },
        {
            name: 'Fibrosis Quística (FQ)',
            region: 'Mutación CFTR — Insuficiencia Pancreática',
            desc: 'Enfermedad autosómica recesiva por mutación del gen CFTR (regulador de conductancia transmembrana). Afecta secreción de Cl⁻ y HCO₃⁻. Páncreas: secreciones espesas obstruyen conductos → destrucción acinar → insuficiencia exocrina (85-90% pacientes). Manifestaciones: esteatorrea desde lactancia, desnutrición, déficit vitaminas liposolubles (A,D,E,K).',
            datos: [
                { l: 'Gen', v: 'CFTR (cr. 7)' },
                { l: 'Insuf. pancreát.', v: '85-90%' },
                { l: 'Clínica', v: 'Esteatorrea' },
                { l: 'Tratamiento', v: 'Enzimas + vitaminas' }
            ]
        },
        {
            name: 'Pseudoquiste Pancreático',
            region: 'Colección Líquida Post-Pancreatitis',
            desc: 'Colección líquida encapsulada por tejido de granulación (no epitelio verdadero), que contiene jugo pancreático rico en amilasa. Complicación de pancreatitis aguda (15%) o trauma. Se forma ≥4 semanas post-evento. Mayoría asintomáticos. Complicaciones: infección, ruptura, obstrucción duodenal, hemorragia. Manejo: observación si <6 cm, drenaje si sintomático.',
            datos: [
                { l: 'Frecuencia PA', v: '~15%' },
                { l: 'Tiempo formación', v: '≥4 semanas' },
                { l: 'Contenido', v: 'Jugo pancreático' },
                { l: 'Drenaje si', v: '>6 cm o sintomát.' }
            ]
        },
        {
            name: 'Síndrome de Zollinger-Ellison',
            region: 'Gastrinoma — Hipersecreción Ácida',
            desc: 'Tumor neuroendocrino secretor de gastrina (60-90% en páncreas, 10-30% en duodeno). Hipergastrinemia → hipersecreción ácida gástrica masiva → úlceras pépticas múltiples, refractarias, diarrea. Asociado a MEN-1 en 20-25%. Diagnóstico: gastrina sérica >1000 pg/mL + pH gástrico <2. Tratamiento: inhibidores bomba protones (IBP) + resección quirúrgica.',
            datos: [
                { l: 'Localización', v: '60-90% páncreas' },
                { l: 'Gastrina', v: '>1000 pg/mL' },
                { l: 'Asociación', v: 'MEN-1 (20-25%)' },
                { l: 'Tratamiento', v: 'IBP + cirugía' }
            ]
        },
        {
            name: 'MODY (Maturity-Onset Diabetes)',
            region: 'Diabetes Monogénica — Disfunción β',
            desc: 'Grupo heterogéneo de diabetes por mutaciones monogénicas que afectan función de células β. MODY 2 (GCK): glucocinasa, hiperglucemia leve estable. MODY 3 (HNF1A): más frecuente, sensible a sulfonilureas. Características: inicio <25 años, herencia autosómica dominante, no obesidad, péptido C detectable. Representa 1-5% de diabetes diagnosticadas.',
            datos: [
                { l: 'Tipos', v: '14 subtipos' },
                { l: 'Más frecuente', v: 'MODY 3 (HNF1A)' },
                { l: 'Herencia', v: 'Autosómica domin.' },
                { l: 'Prevalencia', v: '1-5% diabetes' }
            ]
        }
    ]
};

console.log('✅ Páncreas Data: Patologías cargadas');
