/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS — Datos Clínicos de Referencia
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__PANCREAS_DATA = window.__PANCREAS_DATA || {};

window.__PANCREAS_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Amilasa Sérica',
            region: 'Marcador Enzimático Pancreático',
            desc: 'Enzima digestiva presente en suero proveniente de páncreas (60%, isoenzima P) y glándulas salivales (40%, isoenzima S). Se eleva tempranamente en pancreatitis aguda (3-6 horas), pico a 24h, normaliza en 3-5 días. Amilasa >3× límite superior normal (LSN) es criterio diagnóstico de pancreatitis aguda. Puede elevarse en macroamilasemia.',
            datos: [
                { l: 'Valor normal', v: '30-110 U/L' },
                { l: 'Pancreatitis', v: '>3× LSN' },
                { l: 'Pico', v: '24 horas' },
                { l: 'Normalización', v: '3-5 días' }
            ]
        },
        {
            name: 'Lipasa Sérica',
            region: 'Gold Standard para Pancreatitis',
            desc: 'Enzima más específica que amilasa para páncreas (amilasa también está en saliva). Lipasa >3× LSN es criterio diagnóstico de pancreatitis aguda según Clasificación Atlanta. Se eleva 4-8 horas post-inicio, pico 24h, permanece elevada 8-14 días (más que amilasa). Mayor sensibilidad (85-100%) y especificidad (96-99%) que amilasa.',
            datos: [
                { l: 'Valor normal', v: '13-60 U/L' },
                { l: 'Pancreatitis', v: '>3× LSN' },
                { l: 'Sensibilidad', v: '85-100%' },
                { l: 'Elevada', v: '8-14 días' }
            ]
        },
        {
            name: 'Glucemia y HbA1c',
            region: 'Control Glucémico — Diagnóstico DM',
            desc: 'Glucemia plasmática en ayuno (GPA): normal <100 mg/dL, prediabetes 100-125, diabetes ≥126 (en dos ocasiones). Glucemia 2h post-carga 75g: diabetes ≥200. HbA1c (hemoglobina glicosilada): refleja promedio glucémico últimos 2-3 meses. Diabetes ≥6.5%, prediabetes 5.7-6.4%. Objetivo terapéutico DM: <7% (individualizar).',
            datos: [
                { l: 'GPA normal', v: '<100 mg/dL' },
                { l: 'Diabetes', v: '≥126 mg/dL (2×)' },
                { l: 'HbA1c diabetes', v: '≥6.5%' },
                { l: 'Objetivo tto.', v: '<7%' }
            ]
        },
        {
            name: 'Péptido C',
            region: 'Evaluación Reserva de Células β',
            desc: 'Péptido liberado equimolarmente con insulina durante su síntesis (proinsulina → insulina + péptido C). Útil para diferenciar diabetes tipo 1 (bajo/indetectable) de tipo 2 (normal/alto). En insulinoma: péptido C elevado con hipoglucemia. En insulina exógena: péptido C bajo (insulina alta). Vida media más larga que insulina (30 vs 5 min).',
            datos: [
                { l: 'Normal ayuno', v: '0.8-3.1 ng/mL' },
                { l: 'DM tipo 1', v: 'Bajo/indetectable' },
                { l: 'DM tipo 2', v: 'Normal/alto' },
                { l: 'Insulinoma', v: 'Elevado + hipoglu.' }
            ]
        },
        {
            name: 'CA 19-9',
            region: 'Marcador Tumoral Pancreático',
            desc: 'Antígeno carbohidrato 19-9, marcador tumoral para adenocarcinoma pancreático. Sensibilidad 80%, especificidad 90% (valores >1000 U/mL sugieren enfermedad avanzada). 10% de población (Lewis negativo) no expresa CA 19-9. No es útil para screening por baja especificidad, pero sí para monitorización post-tratamiento y detección de recurrencia.',
            datos: [
                { l: 'Normal', v: '<37 U/mL' },
                { l: 'Sensibilidad', v: '~80%' },
                { l: 'Avanzado', v: '>1000 U/mL' },
                { l: 'Lewis negativo', v: '10% no produce' }
            ]
        },
        {
            name: 'Elastasa Fecal',
            region: 'Evaluación Insuficiencia Exocrina',
            desc: 'Enzima pancreática que permanece estable durante tránsito intestinal. Marcador no invasivo de función exocrina. Elastasa fecal <200 μg/g indica insuficiencia pancreática exocrina (IPE). <100 μg/g: IPE severa. Indicaciones: esteatorrea, pancreatitis crónica, fibrosis quística, cirugía pancreática. Puede ser falso positivo en diarrea acuosa (dilución).',
            datos: [
                { l: 'Normal', v: '>200 μg/g' },
                { l: 'IPE', v: '<200 μg/g' },
                { l: 'IPE severa', v: '<100 μg/g' },
                { l: 'Ventaja', v: 'No invasivo' }
            ]
        },
        {
            name: 'Prueba de Tolerancia Oral (PTOG)',
            region: 'Diagnóstico Diabetes y Prediabetes',
            desc: 'Carga oral de 75g glucosa tras ayuno 8-12h. Se mide glucemia basal y a las 2 horas. Normal: 2h <140 mg/dL. Intolerancia glucosa (prediabetes): 2h 140-199. Diabetes: 2h ≥200. Más sensible que glucemia ayuno para detectar diabetes. Durante embarazo (semana 24-28): screening diabetes gestacional con carga de 50g o 75g (criterios Carpenter-Coustan).',
            datos: [
                { l: 'Carga', v: '75g glucosa VO' },
                { l: 'Normal 2h', v: '<140 mg/dL' },
                { l: 'Prediabetes 2h', v: '140-199' },
                { l: 'Diabetes 2h', v: '≥200' }
            ]
        },
        {
            name: 'Marcadores Autoinmunes DM1',
            region: 'Autoanticuerpos Diabetes Tipo 1',
            desc: 'Anticuerpos contra antígenos de células β: Anti-GAD65 (descarboxilasa ácido glutámico, 70-80% sensibilidad), Anti-IA2 (tirosin fosfatasa, 50-70%), Anti-insulina (40-70%, más en niños), Anti-ZnT8 (transportador zinc, 60-80%). Presencia ≥2 anticuerpos confirma etiología autoinmune. Útiles para diferenciar DM1 de DM2, LADA (DM1 de inicio tardío) y MODY.',
            datos: [
                { l: 'Anti-GAD65', v: '70-80% sensib.' },
                { l: 'Anti-IA2', v: '50-70%' },
                { l: 'Anti-insulina', v: '40-70%' },
                { l: 'Diagnóstico', v: '≥2 positivos' }
            ]
        },
        {
            name: 'Imagenología: TAC Abdomen',
            region: 'Gold Standard Evaluación Páncreas',
            desc: 'TAC con contraste IV (protocolo pancreático: fase arterial, pancreática y portal) es el estándar para evaluar pancreatitis aguda (criterios Atlanta modificados), pancreatitis crónica (calcificaciones), pseudoquistes y tumores. Escala CTSI (CT Severity Index) estratifica severidad de pancreatitis: grado A-E + necrosis. Detecta tumores >1-2 cm.',
            datos: [
                { l: 'Protocolo', v: '3 fases contraste' },
                { l: 'Severidad PA', v: 'Índice CTSI' },
                { l: 'Detecta tumor', v: '>1-2 cm' },
                { l: 'Ventaja', v: 'Complicaciones PA' }
            ]
        },
        {
            name: 'CPRE (Colangiopancreatografía)',
            region: 'Procedimiento Diagnóstico-Terapéutico',
            desc: 'Endoscopia con cateterización de papila duodenal para inyectar contraste en vía biliar y conducto pancreático. Diagnóstica: pancreatitis crónica (irregularidades conducto), estenosis, cálculos. Terapéutica: esfinterotomía, extracción cálculos, colocación stents. Complicación principal: pancreatitis post-CPRE (3-15%, reducible con indometacina rectal profiláctica).',
            datos: [
                { l: 'Técnica', v: 'Endoscópica' },
                { l: 'Visualiza', v: 'Conductos' },
                { l: 'Complicación', v: 'Pancreatitis 3-15%' },
                { l: 'Profilaxis', v: 'Indometacina rectal' }
            ]
        }
    ]
};

console.log('✅ Páncreas Data: Datos Clínicos cargados');
