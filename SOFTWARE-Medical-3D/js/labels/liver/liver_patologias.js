/**
 * ═══════════════════════════════════════════════════
 *  LIVER — Patologías Hepáticas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LIVER_DATA = window.__LIVER_DATA || {};

window.__LIVER_DATA.patologias = {
    title: 'Patologías Hepáticas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Cirrosis Hepática',
            region: 'Estadio Final — Fibrosis Irreversible',
            desc: 'Estadio final de enfermedades hepáticas crónicas. Fibrosis difusa con nódulos de regeneración que distorsionan arquitectura vascular. Causas principales: alcohol (40-50%), hepatitis C (25-30%), EHGNA (10-15%). Complicaciones: hipertensión portal, ascitis, várices esofágicas, encefalopatía, hepatocarcinoma. Clasificación Child-Pugh evalúa severidad.',
            datos: [
                { l: 'Causa #1', v: 'Alcohol (40-50%)' },
                { l: 'Hep. C', v: '25-30%' },
                { l: 'Complicación', v: 'HTP, ascitis' },
                { l: 'Mortalidad 5a', v: '50-70%' }
            ]
        },
        {
            name: 'Hepatitis Viral',
            region: 'Inflamación — Virus Hepatótropos',
            desc: 'Hepatitis A (HAV): transmisión fecal-oral, aguda autolimitada, no cronicidad. Hepatitis B (HBV): parenteral/sexual, 5-10% adultos cronifican, riesgo hepatocarcinoma. Hepatitis C (HCV): parenteral, 70-85% cronifican, principal causa cirrosis. Hepatitis D (HDV): coinfección con HBV, agrava pronóstico. Hepatitis E (HEV): fecal-oral, grave en embarazadas.',
            datos: [
                { l: 'HAV', v: 'Aguda, no crónica' },
                { l: 'HBV crónica', v: '5-10% adultos' },
                { l: 'HCV crónica', v: '70-85%' },
                { l: 'HEV embarazo', v: '20% mortalidad' }
            ]
        },
        {
            name: 'Esteatosis Hepática (Hígado Graso)',
            region: 'Acúmulo de Triglicéridos — >5%',
            desc: 'Acumulación de triglicéridos en >5% de hepatocitos. Esteatosis alcohólica: por consumo >20-30 g alcohol/día. Esteatosis no alcohólica (EHGNA): asociada a síndrome metabólico (obesidad, diabetes, dislipidemia), afecta 25-30% población. Puede progresar a esteatohepatitis (EHNA), fibrosis, cirrosis. Reversible con cambios de estilo de vida.',
            datos: [
                { l: 'Prevalencia EHGNA', v: '25-30%' },
                { l: 'Definición', v: '>5% hepatocitos' },
                { l: 'EHNA', v: '~20% EHGNA' },
                { l: 'Reversible', v: 'Estadios tempranos' }
            ]
        },
        {
            name: 'Hepatocarcinoma (CHC)',
            region: 'Cáncer Primario — Tumor Maligno',
            desc: 'Tumor maligno primario más frecuente del hígado. Factores de riesgo: cirrosis (80-90% casos), hepatitis B/C crónica, aflatoxinas, hemocromatosis. Presenta elevación de alfafetoproteína (AFP >400 ng/mL en 60%). Tratamiento: resección, trasplante (criterios de Milán), ablación, quimioembolización. Pronóstico pobre en estadios avanzados.',
            datos: [
                { l: 'En cirrosis', v: '80-90% casos' },
                { l: 'AFP >400', v: '~60% casos' },
                { l: 'Incidencia/año', v: '~3-5% cirróticos' },
                { l: 'Supervivencia 5a', v: '<20% global' }
            ]
        },
        {
            name: 'Insuficiencia Hepática Aguda',
            region: 'Fallo Hepático Fulminante',
            desc: 'Deterioro rápido (<26 semanas) de función hepática en hígado previamente sano, con coagulopatía (INR >1.5) y encefalopatía. Causas: sobredosis paracetamol (50% en EUA), hepatitis viral, fármacos idiosincrásicos, isquemia. Complicaciones: edema cerebral, falla multiorgánica. Mortalidad 50-80% sin trasplante urgente. Criterios de King\'s College para trasplante.',
            datos: [
                { l: 'Paracetamol', v: '~50% casos (EUA)' },
                { l: 'INR', v: '>1.5' },
                { l: 'Mortalidad', v: '50-80% sin Tx' },
                { l: 'Tratamiento', v: 'Trasplante urgente' }
            ]
        },
        {
            name: 'Hemocromatosis',
            region: 'Sobrecarga de Hierro — Hereditaria',
            desc: 'Trastorno genético del metabolismo del hierro (gen HFE, mutación C282Y). Absorción intestinal excesiva de hierro causa depósito en hígado, corazón, páncreas, hipófisis. Manifestaciones: cirrosis, diabetes, cardiomiopatía, artropatía, hipogonadismo ("diabetes de bronce"). Ferritina >1000 ng/mL, saturación transferrina >45%. Tratamiento: flebotomías periódicas.',
            datos: [
                { l: 'Mutación', v: 'HFE C282Y' },
                { l: 'Ferritina', v: '>1000 ng/mL' },
                { l: 'Saturación Tf', v: '>45%' },
                { l: 'Tratamiento', v: 'Flebotomías' }
            ]
        },
        {
            name: 'Enfermedad de Wilson',
            region: 'Acúmulo de Cobre — Trastorno Genético',
            desc: 'Defecto genético (gen ATP7B) en excreción biliar de cobre. Acumulación en hígado (hepatitis, cirrosis), cerebro (síntomas neuropsiquiátricos), córnea (anillo Kayser-Fleischer). Ceruloplasmina sérica baja (<20 mg/dL), cobre urinario elevado (>100 μg/24h). Tratamiento: quelantes (penicilamina, trientina), zinc. Diagnóstico y tratamiento tempranos previenen daño irreversible.',
            datos: [
                { l: 'Gen afectado', v: 'ATP7B' },
                { l: 'Ceruloplasmina', v: '<20 mg/dL' },
                { l: 'Cobre orina', v: '>100 μg/24h' },
                { l: 'Signo ocular', v: 'Anillo K-F' }
            ]
        },
        {
            name: 'Colangitis Biliar Primaria (CBP)',
            region: 'Autoinmune — Vías Biliares',
            desc: 'Enfermedad autoinmune que destruye progresivamente conductos biliares intrahepáticos. Afecta principalmente mujeres (90%), edad media 50-60 años. Colestasis crónica: prurito intenso, ictericia, malabsorción vitaminas liposolubles. Anticuerpos antimitocondriales (AMA) positivos en 95%. Fosfatasa alcalina elevada. Tratamiento: ácido ursodesoxicólico, trasplante en fases avanzadas.',
            datos: [
                { l: 'Mujeres', v: '~90%' },
                { l: 'AMA+', v: '~95%' },
                { l: 'FA elevada', v: '×3-4 normal' },
                { l: 'Tratamiento', v: 'Ácido ursodeo.' }
            ]
        },
        {
            name: 'Colangitis Esclerosante Primaria (CEP)',
            region: 'Inflamación — Vías Biliares Extra/Intra',
            desc: 'Enfermedad colestásica crónica con inflamación, fibrosis y estenosis progresiva de vías biliares intra y extrahepáticas. Asociada a colitis ulcerosa (70-80%). Hombres jóvenes más afectados. Colangiografía: patrón "cuentas de rosario". FA y GGT elevadas. Complicaciones: cirrosis, colangiocarcinoma (10-15% riesgo). No hay tratamiento médico efectivo, trasplante en fases avanzadas.',
            datos: [
                { l: 'Con col. ulcer.', v: '70-80%' },
                { l: 'Hombres', v: 'Más frecuente' },
                { l: 'Colangiocarc.', v: '10-15% riesgo' },
                { l: 'Tratamiento', v: 'No efectivo' }
            ]
        },
        {
            name: 'Síndrome de Budd-Chiari',
            region: 'Obstrucción Venas Hepáticas',
            desc: 'Obstrucción de venas hepáticas o porción terminal de vena cava inferior. Causas: estados protrombóticos (síndrome mieloproliferativo, déficit proteína C/S, factor V Leiden), anticonceptivos orales, tumores. Clínica: dolor abdominal agudo, hepatomegalia dolorosa, ascitis. Agudo: mortalidad alta. Tratamiento: anticoagulación, angioplastia, TIPS, trasplante.',
            datos: [
                { l: 'Causa común', v: 'Trombofilia' },
                { l: 'Tríada clásica', v: 'Dolor, hepatomeg., ascitis' },
                { l: 'Diagnóstico', v: 'Doppler, TC, RMN' },
                { l: 'Tratamiento', v: 'Anticoagulación' }
            ]
        }
    ]
};

console.log('✅ Liver Data: Patologías cargadas');
