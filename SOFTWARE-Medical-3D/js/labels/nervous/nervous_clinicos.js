/**
 * ═══════════════════════════════════════════════════
 *  NERVOUS SYSTEM — Datos Clínicos y Pruebas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__NERVOUS_DATA = window.__NERVOUS_DATA || {};

window.__NERVOUS_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Electroencefalograma (EEG)',
            region: 'Actividad Eléctrica Cerebral',
            desc: 'Registro actividad eléctrica cortical mediante electrodos en cuero cabelludo. Mide potenciales sinápticos (no potenciales acción). Ondas: delta (<4 Hz, sueño profundo), theta (4-8 Hz, somnolencia), alfa (8-13 Hz, relajado despierto ojos cerrados), beta (13-30 Hz, alerta), gamma (>30 Hz, cognición). Usos: epilepsia (espigas, complejos espiga-onda), encefalopatías, muerte cerebral, trastornos sueño.',
            datos: [
                { l: 'Mide', v: 'Potenciales sinápticos' },
                { l: 'Ondas alfa', v: '8-13 Hz' },
                { l: 'Principal uso', v: 'Epilepsia' },
                { l: 'Espigas', v: 'Actividad epileptiforme' }
            ]
        },
        {
            name: 'Resonancia Magnética (RMN) Cerebral',
            region: 'Imagen Estructural y Funcional',
            desc: 'Imagen de alta resolución sin radiación. T1: anatomía detallada, sustancia blanca brillante. T2/FLAIR: edema, lesiones brillantes. Aplicaciones: tumores, ACV isquémico, esclerosis múltiple (placas), atrofia (Alzheimer), malformaciones. RMN funcional (fMRI): actividad cerebral por cambio flujo sanguíneo (BOLD). RMN difusión (DWI): ACV hiperagudo (<6h). Angio-RMN: vasos cerebrales sin contraste.',
            datos: [
                { l: 'Resolución', v: 'Alta' },
                { l: 'Radiación', v: 'No' },
                { l: 'T2/FLAIR', v: 'Lesiones/edema' },
                { l: 'DWI', v: 'ACV <6h' }
            ]
        },
        {
            name: 'Tomografía Computarizada (TC) Cerebral',
            region: 'Imagen Rápida — Emergencias',
            desc: 'Imagen rápida (minutos) para urgencias. Uso principal: hemorragia intracraneal (hiperdensa), fracturas cráneo, hidrocefalia, masa con efecto masa. ACV isquémico: aparece hipodensidad tras 6-24h. Contraindicaciones RMN (marcapasos, clips ferromagnéticos) hacen TC opción. Con contraste IV evalúa vascularización, BBB. Angio-TC: embolia pulmonar cerebral, aneurismas. Dosis radiación moderada.',
            datos: [
                { l: 'Velocidad', v: 'Minutos' },
                { l: 'Hemorragia', v: 'Hiperdensa' },
                { l: 'ACV isquémico', v: 'Visible 6-24h' },
                { l: 'Urgencias', v: 'Primera línea' }
            ]
        },
        {
            name: 'Punción Lumbar',
            region: 'Análisis Líquido Cefalorraquídeo',
            desc: 'Obtención LCR por punción entre L3-L4 o L4-L5. LCR normal: cristal, presión 10-20 cmH₂O, glucosa 50-75 mg/dL (2/3 sangre), proteínas 15-45 mg/dL, <5 leucocitos/μL. Meningitis bacteriana: turbio, PMN elevados (>1000), proteínas ↑, glucosa ↓. Meningitis viral: linfocitos, glucosa normal. Hemorragia subaracnoidea: eritrocitos, xantocromía. Esclerosis múltiple: bandas oligoclonales.',
            datos: [
                { l: 'Presión normal', v: '10-20 cmH₂O' },
                { l: 'Glucosa', v: '50-75 mg/dL' },
                { l: 'Proteínas', v: '15-45 mg/dL' },
                { l: 'Leucocitos', v: '<5/μL' }
            ]
        },
        {
            name: 'Electromiografía (EMG) y Velocidad Conducción',
            region: 'Función Nervio y Músculo',
            desc: 'EMG: actividad eléctrica muscular en reposo y contracción. Reposo normal: silencio eléctrico. Denervación: fibrilaciones, ondas agudas positivas. Contracción: unidades motoras. Neuropatía: unidades motoras grandes. Miopatía: unidades motoras pequeñas. Velocidad conducción nerviosa (VCN): velocidad impulso en nervio motor/sensitivo. Desmielinización: VCN lenta. Axonopatía: amplitud disminuida, VCN normal.',
            datos: [
                { l: 'EMG reposo', v: 'Silencio eléctrico' },
                { l: 'Denervación', v: 'Fibrilaciones' },
                { l: 'VCN desmieliniz.', v: 'Lenta' },
                { l: 'VCN axonopatía', v: 'Normal' }
            ]
        },
        {
            name: 'Escala de Coma de Glasgow',
            region: 'Nivel de Consciencia',
            desc: 'Evaluación nivel consciencia en trauma o alteración aguda. 3 componentes: apertura ocular (1-4), respuesta verbal (1-5), respuesta motora (1-6). Puntaje total: 3-15. Grave: ≤8 (coma, intubación). Moderado: 9-12. Leve: 13-15. Apertura espontánea=4, al dolor=2. Verbal orientado=5, confuso=4, inapropiado=3. Motor obedece=6, localiza dolor=5, flexión normal=4, flexión anormal (decorticación)=3, extensión (descerebración)=2.',
            datos: [
                { l: 'Rango', v: '3-15' },
                { l: 'Grave', v: '≤8' },
                { l: 'Moderado', v: '9-12' },
                { l: 'Leve', v: '13-15' }
            ]
        },
        {
            name: 'Mini-Mental State Examination (MMSE)',
            region: 'Screening Función Cognitiva',
            desc: 'Test breve (10 min) de función cognitiva. Evalúa: orientación temporal/espacial, registro memoria, atención/cálculo, recuerdo, lenguaje, construcción visuoespacial. Puntaje máximo: 30. Normal: ≥24-27 (ajustar edad/educación). Deterioro cognitivo leve: 19-23. Demencia leve: 10-18. Demencia moderada: <10. Limitaciones: influenciado por educación, lenguaje, cultura. No detecta demencia frontotemporal. Útil para screening y seguimiento.',
            datos: [
                { l: 'Puntaje máximo', v: '30' },
                { l: 'Normal', v: '≥24-27' },
                { l: 'Demencia leve', v: '10-18' },
                { l: 'Tiempo', v: '~10 min' }
            ]
        },
        {
            name: 'Estudios de Conducción Nerviosa',
            region: 'Velocidad y Amplitud de Impulso',
            desc: 'Estimulación eléctrica nervio, registro respuesta músculo (motor) o nervio (sensitivo). Parámetros: latencia (tiempo), amplitud (nº fibras), velocidad conducción. Motor: latencia distal, amplitud PAMC, velocidad conducción. Sensitivo: latencia pico, amplitud PASC. Normal motor: >40-50 m/s (miembro superior), >40 m/s (inferior). Patrones: desmielinización (velocidad ↓, latencia ↑, amplitud normal), axonopatía (amplitud ↓, velocidad normal).',
            datos: [
                { l: 'Motor normal MMSS', v: '>40-50 m/s' },
                { l: 'Motor normal MMII', v: '>40 m/s' },
                { l: 'Desmielinización', v: 'Velocidad ↓' },
                { l: 'Axonopatía', v: 'Amplitud ↓' }
            ]
        }
    ]
};

console.log('✅ Nervous Data: Datos Clínicos cargados');
