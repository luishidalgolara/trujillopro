/**
 * ═══════════════════════════════════════════════════
 *  LIVER — Hábitos y Cuidado Hepático
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LIVER_DATA = window.__LIVER_DATA || {};

window.__LIVER_DATA.habitos = {
    title: 'Hábitos y Cuidado',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Consumo Moderado de Alcohol',
            region: 'Hepatotoxicidad — Cirrosis',
            desc: 'El alcohol es metabolizado en hígado por alcohol deshidrogenasa (ADH) y CYP2E1, generando acetaldehído tóxico y ROS. Consumo seguro: mujeres ≤1 bebida/día (10-14 g alcohol), hombres ≤2 bebidas/día. Consumo >20-30 g/día aumenta riesgo esteatosis; >60-80 g/día riesgo cirrosis. Abstinencia es crucial en enfermedad hepática establecida.',
            datos: [
                { l: 'Seguro mujeres', v: '≤10-14 g/día' },
                { l: 'Seguro hombres', v: '≤20-28 g/día' },
                { l: 'Riesgo cirrosis', v: '>60-80 g/día' },
                { l: 'En hepatopatía', v: 'Abstinencia' }
            ]
        },
        {
            name: 'Ejercicio Físico Regular',
            region: 'Esteatosis — Resistencia Insulina',
            desc: 'El ejercicio aeróbico (150-300 min/semana moderado o 75-150 min vigoroso) reduce esteatosis hepática 20-30% incluso sin pérdida de peso significativa. Mejora sensibilidad a insulina, aumenta β-oxidación, reduce inflamación. Ejercicio de resistencia (2-3 días/semana) complementa beneficios. Reduce riesgo progresión EHGNA a EHNA y fibrosis.',
            datos: [
                { l: 'Aeróbico', v: '150-300 min/sem' },
                { l: '↓ Esteatosis', v: '20-30%' },
                { l: 'Resistencia', v: '2-3 días/sem' },
                { l: 'Sin pérd. peso', v: 'Beneficio igual' }
            ]
        },
        {
            name: 'Pérdida de Peso Gradual',
            region: 'EHGNA — Obesidad',
            desc: 'En sobrepeso/obesidad con EHGNA, pérdida de 7-10% del peso corporal mejora esteatosis, inflamación y fibrosis. Ritmo recomendado: 0.5-1 kg/semana. Pérdida rápida (>1.6 kg/semana) puede empeorar inflamación hepática. Dieta hipocalórica (déficit 500-1000 kcal/día) con ejercicio es más efectiva que solo dieta. Mantener pérdida a largo plazo es crucial.',
            datos: [
                { l: 'Objetivo', v: '7-10% peso' },
                { l: 'Ritmo', v: '0.5-1 kg/sem' },
                { l: 'Déficit cal.', v: '500-1000 kcal/d' },
                { l: 'Beneficio', v: 'Hasta fibrosis' }
            ]
        },
        {
            name: 'Uso Racional de Medicamentos',
            region: 'Hepatotoxicidad Farmacológica',
            desc: 'Muchos fármacos se metabolizan en hígado y pueden causar hepatotoxicidad. Paracetamol: dosis terapéutica <4 g/día, >7.5-10 g dosis única causa falla hepática. AINE, estatinas, antibióticos (amoxicilina-clavulánico), antituberculosos, antifúngicos requieren vigilancia. Evitar automedicación. En hepatopatía, ajustar dosis según función hepática (Child-Pugh).',
            datos: [
                { l: 'Paracetamol', v: '<4 g/día' },
                { l: 'Tóxico', v: '>7.5-10 g' },
                { l: 'Hepatotóxicos', v: 'AINE, ATB, estatinas' },
                { l: 'En hepatopatía', v: 'Ajustar dosis' }
            ]
        },
        {
            name: 'Vacunación Preventiva',
            region: 'Hepatitis A y B — Prevención',
            desc: 'Vacunación esencial en hepatopatías crónicas para prevenir sobreinfección. Hepatitis A: 2 dosis (0 y 6-12 meses), eficacia >95%, protección duradera. Hepatitis B: 3 dosis (0, 1, 6 meses), seroconversión 90-95% adultos sanos, menor en inmunodeprimidos. Verificar anti-HBs >10 mIU/mL post-vacunación. También vacunar contra neumococo, influenza.',
            datos: [
                { l: 'HAV dosis', v: '2 (0, 6-12m)' },
                { l: 'HBV dosis', v: '3 (0, 1, 6m)' },
                { l: 'Eficacia HBV', v: '90-95%' },
                { l: 'Anti-HBs', v: '>10 mIU/mL' }
            ]
        },
        {
            name: 'Control de Comorbilidades',
            region: 'Diabetes — Hipertensión — Dislipidemia',
            desc: 'Síndrome metabólico (diabetes, HTA, dislipidemia, obesidad) aumenta riesgo y progresión de EHGNA. Control glucémico (HbA1c <7%) previene esteatosis. Metformina mejora sensibilidad insulina y esteatosis. Control tensión arterial (<130/80 mmHg). Tratamiento dislipidemia: estatinas son seguras en hepatopatía estable, beneficio cardiovascular supera riesgo hepatotoxicidad.',
            datos: [
                { l: 'HbA1c objetivo', v: '<7%' },
                { l: 'TA objetivo', v: '<130/80 mmHg' },
                { l: 'Metformina', v: 'Beneficio EHGNA' },
                { l: 'Estatinas', v: 'Seguras en estable' }
            ]
        },
        {
            name: 'Evitar Suplementos No Regulados',
            region: 'Hepatotoxicidad — Hierbas',
            desc: 'Suplementos herbales y dietéticos pueden causar hepatotoxicidad. Productos de riesgo: cúrcuma (dosis altas), té verde extracto concentrado, kava, chaparral, escutelaria. Bodybuilding/pérdida peso: esteroides anabólicos, extractos herbales. Medicina tradicional china: aristoloquia, ma huang. Reportar cualquier suplemento al médico. Muchos no están regulados ni estandarizados.',
            datos: [
                { l: 'Riesgo', v: 'Extractos concentr.' },
                { l: 'Ejemplos', v: 'Kava, té verde' },
                { l: 'Esteroides', v: 'Hepatotoxicidad' },
                { l: 'Precaución', v: 'Productos no regulados' }
            ]
        },
        {
            name: 'Precauciones en Tatuajes/Piercings',
            region: 'Hepatitis B y C — Transmisión',
            desc: 'Tatuajes, piercings y procedimientos estéticos con agujas/instrumentos no estériles son vía de transmisión de hepatitis B y C. Acudir solo a establecimientos regulados con material desechable o autoclavado. Compartir máquinas afeitar, cepillos dientes, cortauñas también conlleva riesgo. Personal sanitario y usuarios de drogas intravenosas tienen mayor riesgo.',
            datos: [
                { l: 'Riesgo HCV', v: 'Material no estéril' },
                { l: 'Prevención', v: 'Establec. regulados' },
                { l: 'Material', v: 'Desechable/autoclave' },
                { l: 'También', v: 'No compartir afeitar' }
            ]
        }
    ]
};

console.log('✅ Liver Data: Hábitos cargados');
