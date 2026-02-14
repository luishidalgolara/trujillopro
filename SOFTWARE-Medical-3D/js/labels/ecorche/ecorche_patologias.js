/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ — Patologías Musculoesqueléticas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__ECORCHE_DATA = window.__ECORCHE_DATA || {};

window.__ECORCHE_DATA.patologias = {
    title: 'Patologías Musculoesqueléticas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Rabdomiólisis',
            region: 'Músculo Esquelético — Sistémico',
            desc: 'Destrucción masiva de fibras musculares con liberación de contenido intracelular (mioglobina, CPK, potasio, LDH) a la circulación. La mioglobina precipita en túbulos renales causando insuficiencia renal aguda en el 15-33% de casos. Causas: aplastamiento, ejercicio extremo, estatinas, golpe de calor, convulsiones prolongadas.',
            datos: [
                { l: 'CPK sérica', v: '>5× normal (>1000 U/L)' },
                { l: 'Riesgo IRA', v: '15-33%' },
                { l: 'Marcador orina', v: 'Mioglobinuria' },
                { l: 'Tratamiento', v: 'Hidratación IV agresiva' }
            ]
        },
        {
            name: 'Síndrome Compartimental Agudo',
            region: 'Compartimentos Fasciales Cerrados',
            desc: 'Aumento de presión dentro de un compartimento fascial cerrado que compromete la perfusión capilar y la viabilidad tisular. Presión >30 mmHg o diferencia <30 mmHg respecto a la diastólica indica fasciotomía urgente. Sin tratamiento en 6-8 horas produce necrosis muscular irreversible y contractura isquémica (Volkmann en antebrazo).',
            datos: [
                { l: 'Presión crítica', v: '>30 mmHg' },
                { l: 'Ventana quirúrg.', v: '6-8 horas' },
                { l: 'Síntoma cardinal', v: 'Dolor estiramiento pasivo' },
                { l: 'Tratamiento', v: 'Fasciotomía urgente' }
            ]
        },
        {
            name: 'Distrofia Muscular de Duchenne',
            region: 'Músculo Esquelético — Genético',
            desc: 'Distrofia muscular progresiva ligada al cromosoma X por mutación del gen de la distrofina (Xp21). Afecta 1/3500 varones. Inicio 2-5 años con debilidad proximal, signo de Gowers positivo, pseudohipertrofia de pantorrillas. Pérdida de la marcha ~12 años. CPK elevada 50-100× desde el nacimiento.',
            datos: [
                { l: 'Gen afectado', v: 'Distrofina (Xp21)' },
                { l: 'Incidencia', v: '1/3500 varones' },
                { l: 'CPK', v: '50-100× normal' },
                { l: 'Signo clásico', v: 'Gowers positivo' }
            ]
        },
        {
            name: 'Miastenia Gravis',
            region: 'Unión Neuromuscular — Autoinmune',
            desc: 'Enfermedad autoinmune con anticuerpos contra receptores de acetilcolina (AChR) en la placa motora. Causa debilidad fluctuante que empeora con actividad y mejora con reposo. Afecta músculos oculares (ptosis, diplopía), bulbares (disfonía, disfagia) y proximales. Crisis miasténica: insuficiencia respiratoria aguda.',
            datos: [
                { l: 'Anticuerpos', v: 'Anti-AChR (85%)' },
                { l: 'Patrón', v: 'Fluctuante (fatiga)' },
                { l: 'Test diagnóst.', v: 'Edrofonio / EMG repet.' },
                { l: 'Asociación', v: 'Timoma (10-15%)' }
            ]
        },
        {
            name: 'Rotura del Tendón de Aquiles',
            region: 'Tendón Calcáneo — Tríceps Sural',
            desc: 'Rotura completa o parcial del tendón más fuerte del cuerpo, generalmente a 2-6 cm de la inserción calcánea (zona hipovascular). Típica en varones 30-50 años durante deportes explosivos. Signo de Thompson positivo: ausencia de flexión plantar al comprimir la pantorrilla con el paciente en prono.',
            datos: [
                { l: 'Zona vulnerable', v: '2-6 cm proximal' },
                { l: 'Test clínico', v: 'Thompson (squeeze)' },
                { l: 'Re-rotura quirúrg.', v: '~3-5%' },
                { l: 'Re-rotura conserv.', v: '~12-15%' }
            ]
        },
        {
            name: 'Fibromialgia',
            region: 'Sistémico — Dolor Crónico Difuso',
            desc: 'Síndrome de dolor crónico difuso con sensibilización central del procesamiento nociceptivo. Criterios ACR 2010: índice de dolor generalizado (WPI ≥7) + escala de severidad (SS ≥5), síntomas ≥3 meses. Asociado a fatiga, trastorno del sueño, disfunción cognitiva ("fibro-niebla"). Sin hallazgos inflamatorios ni de laboratorio específicos.',
            datos: [
                { l: 'Prevalencia', v: '2-4% población' },
                { l: 'Relación F:M', v: '~7:1' },
                { l: 'Laboratorio', v: 'Normal (dx exclusión)' },
                { l: 'Tratamiento', v: 'Multimodal (ejerc+fárm)' }
            ]
        },
        {
            name: 'Rotura del Manguito Rotador',
            region: 'Hombro — Tendones SITS',
            desc: 'Rotura parcial o completa de uno o más tendones del manguito rotador (supraespinoso el más frecuente, 90%). Puede ser degenerativa (>50 años) o traumática. Causa dolor nocturno, debilidad en abducción/rotación externa y arco doloroso (60-120°). Diagnóstico por ecografía o RMN de hombro.',
            datos: [
                { l: 'Tendón más afect.', v: 'Supraespinoso (90%)' },
                { l: 'Arco doloroso', v: '60-120°' },
                { l: 'Imagen gold std.', v: 'RMN de hombro' },
                { l: 'Prevalencia >60a', v: '~25-50%' }
            ]
        },
        {
            name: 'Miopatía por Estatinas',
            region: 'Músculo Esquelético — Iatrogénica',
            desc: 'Efecto adverso de las estatinas (inhibidores de HMG-CoA reductasa) que varía desde mialgias simples (5-10%) hasta rabdomiólisis severa (<0.1%). La depleción de coenzima Q10 mitocondrial y la disfunción de canales de calcio contribuyen a la fisiopatología. CPK >10× normal indica suspensión inmediata del fármaco.',
            datos: [
                { l: 'Mialgias', v: '5-10% usuarios' },
                { l: 'Rabdomiólisis', v: '<0.1%' },
                { l: 'Suspender si CPK', v: '>10× normal' },
                { l: 'Mecanismo', v: '↓ CoQ10 mitocondrial' }
            ]
        },
        {
            name: 'Desgarro Muscular (Distensión)',
            region: 'Unión Miotendinosa — Deportivo',
            desc: 'Rotura de fibras musculares, generalmente en la unión miotendinosa. Grado I: <5% fibras, dolor leve. Grado II: rotura parcial, hematoma, impotencia funcional. Grado III: rotura completa con retracción y defecto palpable. Isquiotibiales, gemelos y recto femoral son los más afectados en deportistas.',
            datos: [
                { l: 'Grado I', v: '<5% fibras' },
                { l: 'Grado III', v: 'Rotura completa' },
                { l: 'Músc. más afect.', v: 'Isquiotibiales' },
                { l: 'Imagen', v: 'Ecografía / RMN' }
            ]
        },
        {
            name: 'Esclerosis Lateral Amiotrófica',
            region: 'Motoneuronas Superior e Inferior',
            desc: 'Enfermedad neurodegenerativa progresiva que afecta motoneuronas superiores (corteza) e inferiores (asta anterior medular). Produce debilidad asimétrica progresiva con fasciculaciones e hiperreflexia/espasticidad simultáneas. La EMG muestra denervación activa en múltiples segmentos. Supervivencia media 3-5 años.',
            datos: [
                { l: 'Incidencia', v: '2-3/100.000/año' },
                { l: 'Inicio medio', v: '55-65 años' },
                { l: 'Supervivencia', v: '3-5 años (media)' },
                { l: 'Diagnóstico', v: 'El Escorial + EMG' }
            ]
        }
    ]
};

console.log('✅ Écorché Data: Patologías cargadas');
