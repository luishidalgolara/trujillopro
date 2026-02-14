/**
 * ═══════════════════════════════════════════════════
 *  CIRCULATORY — Patologías Cardiovasculares
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__CIRC_DATA = window.__CIRC_DATA || {};

window.__CIRC_DATA.patologias = {
    title: 'Patologías Cardiovasculares',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Infarto Agudo de Miocardio',
            region: 'Arterias Coronarias — Miocardio',
            desc: 'Necrosis del músculo cardíaco por oclusión coronaria aguda, generalmente por rotura de placa aterosclerótica y trombosis. La arteria descendente anterior izquierda es la más frecuentemente afectada. El tiempo puerta-balón debe ser <90 minutos.',
            datos: [
                { l: 'Causa principal', v: 'Trombosis coron.' },
                { l: 'Marcador', v: 'Troponina I/T' },
                { l: 'Tiempo crítico', v: '<90 min (PCI)' },
                { l: 'Arteria común', v: 'DA izquierda' }
            ]
        },
        {
            name: 'Insuficiencia Cardíaca',
            region: 'Ventrículos — Global',
            desc: 'Incapacidad del corazón para bombear sangre suficiente. IC izquierda: congestión pulmonar (disnea, ortopnea). IC derecha: congestión sistémica (edema periférico, hepatomegalia). La fracción de eyección normal es 55-70%.',
            datos: [
                { l: 'FEVI reducida', v: '<40%' },
                { l: 'FEVI preserv.', v: '≥50%' },
                { l: 'Clasificación', v: 'NYHA I-IV' },
                { l: 'Marcador', v: 'BNP / NT-proBNP' }
            ]
        },
        {
            name: 'Hipertensión Arterial',
            region: 'Arterias Sistémicas — Global',
            desc: 'Elevación sostenida de la presión arterial ≥140/90 mmHg. Factor de riesgo principal para ACV, infarto, IC y enfermedad renal. El 90-95% es hipertensión esencial (sin causa identificable). Daña progresivamente los órganos blanco.',
            datos: [
                { l: 'Normal', v: '<120/80 mmHg' },
                { l: 'Estadio 1', v: '130-139/80-89' },
                { l: 'Estadio 2', v: '≥140/90 mmHg' },
                { l: 'Prevalencia', v: '~1.280 millones' }
            ]
        },
        {
            name: 'Fibrilación Auricular',
            region: 'Aurículas — Sistema de Conducción',
            desc: 'Arritmia más frecuente. Activación eléctrica caótica de las aurículas (350-600 impulsos/min) con respuesta ventricular irregular. Aumenta 5 veces el riesgo de ACV por formación de trombos en la orejuela auricular izquierda.',
            datos: [
                { l: 'Prevalencia', v: '~2-4% adultos' },
                { l: 'Frecuencia aur.', v: '350-600/min' },
                { l: 'Riesgo ACV', v: '×5' },
                { l: 'Escala riesgo', v: 'CHA₂DS₂-VASc' }
            ]
        },
        {
            name: 'Aterosclerosis',
            region: 'Íntima Arterial — Sistémica',
            desc: 'Enfermedad inflamatoria crónica de la pared arterial. El LDL oxidado se deposita en la íntima, los macrófagos lo fagocitan formando células espumosas. La placa fibrosa puede romperse causando trombosis aguda (infarto o ACV).',
            datos: [
                { l: 'Inicio', v: 'Estrías grasas' },
                { l: 'Progresión', v: 'Placa fibrosa' },
                { l: 'Complicación', v: 'Rotura de placa' },
                { l: 'Factor clave', v: 'LDL oxidado' }
            ]
        },
        {
            name: 'Tromboembolismo Pulmonar',
            region: 'Arterias Pulmonares',
            desc: 'Obstrucción de arterias pulmonares por trombos, generalmente originados en venas profundas de miembros inferiores (TVP). La tríada de Virchow (estasis, lesión endotelial, hipercoagulabilidad) describe los factores predisponentes.',
            datos: [
                { l: 'Origen', v: '~90% TVP MMII' },
                { l: 'Mortalidad', v: '~3-7%' },
                { l: 'Diagnóstico', v: 'AngioTC pulm.' },
                { l: 'Marcador', v: 'Dímero D' }
            ]
        },
        {
            name: 'Aneurisma Aórtico',
            region: 'Aorta Abdominal / Torácica',
            desc: 'Dilatación patológica de la aorta >50% de su diámetro normal. El aneurisma aórtico abdominal (AAA) es el más común, localizado frecuentemente infrarrenal. La ruptura tiene mortalidad >80%. El riesgo aumenta con diámetro >5.5 cm.',
            datos: [
                { l: 'Más frecuente', v: 'Aorta abdominal' },
                { l: 'Riesgo ruptura', v: '>5.5 cm Ø' },
                { l: 'Mortalidad rupt.', v: '>80%' },
                { l: 'Screening', v: 'Eco abdominal' }
            ]
        },
        {
            name: 'Endocarditis Infecciosa',
            region: 'Válvulas Cardíacas — Endocardio',
            desc: 'Infección del endocardio, generalmente en válvulas cardíacas. Formación de vegetaciones (acúmulos de plaquetas, fibrina y microorganismos). Staphylococcus aureus es el agente más frecuente en válvulas nativas. Diagnóstico por criterios de Duke.',
            datos: [
                { l: 'Agente común', v: 'S. aureus' },
                { l: 'Válvula nativa', v: 'Mitral > Aórt.' },
                { l: 'Diagnóstico', v: 'Criterios Duke' },
                { l: 'Complicación', v: 'Embolia séptica' }
            ]
        },
        {
            name: 'Cardiopatías Congénitas',
            region: 'Estructuras Cardíacas — Neonatal',
            desc: 'Defectos estructurales del corazón presentes al nacimiento. La comunicación interventricular (CIV) es la más frecuente. La Tetralogía de Fallot es la cardiopatía cianótica más común. Incidencia: ~8-10 por cada 1000 nacidos vivos.',
            datos: [
                { l: 'Más frecuente', v: 'CIV' },
                { l: 'Cianótica común', v: 'T. de Fallot' },
                { l: 'Incidencia', v: '8-10/1000 NV' },
                { l: 'Fallot componentes', v: '4 defectos' }
            ]
        },
        {
            name: 'Enfermedad Arterial Periférica',
            region: 'Arterias de Miembros Inferiores',
            desc: 'Aterosclerosis de arterias periféricas, principalmente en miembros inferiores. Produce claudicación intermitente (dolor al caminar que cede con reposo). El índice tobillo-brazo (ITB) <0.9 confirma el diagnóstico. Marcador de riesgo cardiovascular global.',
            datos: [
                { l: 'Síntoma', v: 'Claudicación' },
                { l: 'Diagnóstico', v: 'ITB <0.9' },
                { l: 'Normal ITB', v: '1.0-1.3' },
                { l: 'Prevalencia', v: '~200 millones' }
            ]
        }
    ]
};

console.log('✅ Circulatory Data: Patologías cargadas');