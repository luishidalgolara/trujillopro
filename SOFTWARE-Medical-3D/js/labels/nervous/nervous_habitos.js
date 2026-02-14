/**
 * ═══════════════════════════════════════════════════
 *  NERVOUS SYSTEM — Hábitos y Cuidado Neuronal
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__NERVOUS_DATA = window.__NERVOUS_DATA || {};

window.__NERVOUS_DATA.habitos = {
    title: 'Hábitos y Cuidado',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Sueño de Calidad',
            region: 'Consolidación Memoria — Limpieza Cerebral',
            desc: 'El sueño es esencial para función cerebral. Durante sueño profundo: consolidación memoria (transferencia hipocampo→corteza), clearance de metabolitos tóxicos (β-amiloide) vía sistema glinfático. Privación sueño: deterioro cognitivo, atención, memoria, estado ánimo, aumenta riesgo Alzheimer. Adultos necesitan 7-9 h/noche. Higiene sueño: horario regular, evitar pantallas 1h antes, oscuridad, temperatura fresca.',
            datos: [
                { l: 'Necesidad adultos', v: '7-9 h/noche' },
                { l: 'Función', v: 'Consolidación mem.' },
                { l: 'Sistema glinfático', v: 'Limpieza β-amiloide' },
                { l: 'Privación', v: 'Deterioro cognitivo' }
            ]
        },
        {
            name: 'Ejercicio Físico Regular',
            region: 'Neurogénesis — Neuroprotección',
            desc: 'El ejercicio aeróbico aumenta factor neurotrófico derivado cerebro (BDNF), promueve neurogénesis en hipocampo, mejora plasticidad sináptica. 150-300 min/semana actividad moderada reduce riesgo demencia 30-40%, mejora función cognitiva, estado ánimo. Mecanismos: aumenta flujo sanguíneo cerebral, reduce inflamación, mejora metabolismo glucosa. Ejercicio resistencia también beneficia. Nunca es tarde para empezar.',
            datos: [
                { l: 'Duración', v: '150-300 min/sem' },
                { l: '↑ BDNF', v: 'Neurogénesis' },
                { l: '↓ Demencia', v: '30-40%' },
                { l: 'Beneficio', v: 'Toda edad' }
            ]
        },
        {
            name: 'Estimulación Cognitiva',
            region: 'Reserva Cognitiva — Plasticidad',
            desc: 'Actividades intelectuales estimulan plasticidad neuronal, forman reserva cognitiva (resistencia al deterioro). Lectura, aprendizaje idiomas, instrumentos musicales, juegos estrategia, socialización reducen riesgo demencia. Educación superior asociada menor riesgo Alzheimer. Concepto "úsalo o piérdelo": neuronas no estimuladas pierden conexiones. Novedad y desafío son claves. Bilinguismo retrasa demencia 4-5 años.',
            datos: [
                { l: 'Efecto', v: 'Reserva cognitiva' },
                { l: '↓ Demencia', v: 'Actividad mental' },
                { l: 'Bilinguismo', v: 'Retrasa 4-5 años' },
                { l: 'Clave', v: 'Novedad + desafío' }
            ]
        },
        {
            name: 'Control Factores Cardiovasculares',
            region: 'Salud Vascular — Riesgo Demencia',
            desc: 'Lo que es bueno para corazón es bueno para cerebro. Hipertensión, diabetes, hipercolesterolemia, obesidad, tabaquismo aumentan riesgo demencia vascular y Alzheimer. Hipertensión crónica: daño microvascular cerebral, mayor riesgo ACV. Control PA (<130/80 mmHg), glucosa (HbA1c <7%), colesterol (LDL <100 mg/dL) es neuroprotector. Cesación tabaco reduce riesgo ACV 50% en 2 años.',
            datos: [
                { l: 'PA objetivo', v: '<130/80 mmHg' },
                { l: 'HbA1c', v: '<7%' },
                { l: 'LDL', v: '<100 mg/dL' },
                { l: 'Cesación tabaco', v: '↓50% ACV en 2a' }
            ]
        },
        {
            name: 'Socialización',
            region: 'Conexión Social — Bienestar Mental',
            desc: 'Aislamiento social aumenta riesgo demencia 50%, depresión, ansiedad, mortalidad. Interacción social estimula cognición, regula estado ánimo, reduce estrés (cortisol). Redes sociales fuertes son protectoras. Participar actividades grupales, voluntariado, mantener amistades. Soledad crónica afecta salud comparable a fumar 15 cigarrillos/día. Tecnología ayuda pero no reemplaza interacción cara a cara.',
            datos: [
                { l: 'Aislamiento', v: '↑50% demencia' },
                { l: 'Socialización', v: 'Neuroprotector' },
                { l: 'Soledad = ', v: '15 cigarrillos/día' },
                { l: 'Recomendación', v: 'Interacción regular' }
            ]
        },
        {
            name: 'Manejo del Estrés',
            region: 'Cortisol — Hipocampo',
            desc: 'Estrés crónico eleva cortisol, daña hipocampo (memoria), aumenta riesgo depresión, ansiedad, deterioro cognitivo. Cortisol excesivo inhibe neurogénesis, promueve atrofia hipocampal. Técnicas manejo: meditación mindfulness (reduce volumen amígdala, aumenta corteza prefrontal), ejercicio, respiración profunda, yoga, terapia. 10-20 min/día meditación muestra beneficios en 8 semanas.',
            datos: [
                { l: 'Estrés crónico', v: 'Daño hipocampo' },
                { l: 'Cortisol ↑', v: 'Inhibe neurogénesis' },
                { l: 'Meditación', v: '10-20 min/día' },
                { l: 'Beneficios', v: '8 semanas' }
            ]
        },
        {
            name: 'Protección Traumatismos',
            region: 'Lesión Cerebral Traumática',
            desc: 'Traumatismo craneal aumenta riesgo demencia, Parkinson, epilepsia. Trauma leve repetido (deportes contacto): encefalopatía traumática crónica. Prevención: casco en bicicleta/moto (reduce muerte 69%), cinturón seguridad (50% menos lesión cerebral), prevenir caídas en ancianos (ejercicio equilibrio, eliminar alfombras), protección en deportes contacto. Conmoción: reposo cognitivo/físico hasta recuperación completa.',
            datos: [
                { l: 'Casco bici', v: '↓69% muerte' },
                { l: 'Cinturón', v: '↓50% lesión cerebral' },
                { l: 'Caídas ancianos', v: 'Principal causa' },
                { l: 'Conmoción', v: 'Reposo completo' }
            ]
        },
        {
            name: 'Moderación Alcohol',
            region: 'Neurotoxicidad — Déficit Tiamina',
            desc: 'Consumo excesivo alcohol: neurotoxicidad directa, atrofia cerebral (corteza frontal, hipocampo), déficit tiamina (encefalopatía Wernicke, síndrome Korsakoff - amnesia). Consumo moderado (≤1 bebida/día mujer, ≤2 hombre) puede ser neuroprotector (controversia). Consumo crónico pesado (>4-5 bebidas/día) causa demencia alcohólica, neuropatía periférica. Abstinencia mejora función cognitiva parcialmente.',
            datos: [
                { l: 'Moderado M', v: '≤1 bebida/día' },
                { l: 'Moderado H', v: '≤2 bebidas/día' },
                { l: 'Exceso', v: 'Atrofia cerebral' },
                { l: 'Déficit B1', v: 'Wernicke-Korsakoff' }
            ]
        }
    ]
};

console.log('✅ Nervous Data: Hábitos cargados');
