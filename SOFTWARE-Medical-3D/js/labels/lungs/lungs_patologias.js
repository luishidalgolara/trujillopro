/**
 * ═══════════════════════════════════════════════════
 *  LUNGS — Patologías Pulmonares
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LUNGS_DATA = window.__LUNGS_DATA || {};

window.__LUNGS_DATA.patologias = {
    title: 'Patologías Pulmonares',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'EPOC (Enfermedad Pulmonar Obstructiva Crónica)',
            region: 'Obstrucción Crónica — Enfisema + Bronquitis',
            desc: 'Obstrucción progresiva del flujo aéreo, parcialmente reversible. Enfisema: destrucción de paredes alveolares, pérdida elasticidad, atrapamiento aéreo. Bronquitis crónica: tos productiva ≥3 meses durante ≥2 años consecutivos. Causa principal: tabaquismo (80-90%). Diagnóstico: FEV1/FVC <0.70 post-broncodilatador. Clasificación GOLD según FEV1.',
            datos: [
                { l: 'Causa #1', v: 'Tabaco (80-90%)' },
                { l: 'Diagnóstico', v: 'FEV1/FVC <0.70' },
                { l: 'Prevalencia', v: '~10% >40 años' },
                { l: 'Mortalidad', v: '3ª causa global' }
            ]
        },
        {
            name: 'Asma Bronquial',
            region: 'Inflamación Crónica — Hiperreactividad',
            desc: 'Inflamación crónica de vías aéreas con hiperreactividad bronquial. Síntomas episódicos: disnea, sibilancias, opresión torácica, tos (especialmente nocturna). Obstrucción reversible espontánea o con broncodilatadores. Tipos: alérgica (atópica), no alérgica, inducida por ejercicio, ocupacional. Eosinofilia en sangre/esputo. Tratamiento: corticoides inhalados + β2-agonistas.',
            datos: [
                { l: 'Prevalencia', v: '~5-10% global' },
                { l: 'Obstrucción', v: 'Reversible' },
                { l: 'Eosinófilos', v: 'Elevados' },
                { l: 'Tx base', v: 'Corticoides inh.' }
            ]
        },
        {
            name: 'Neumonía',
            region: 'Infección Parenquimatosa',
            desc: 'Infección aguda del parénquima pulmonar. Bacteriana más común: Streptococcus pneumoniae (30-50%). Atípicas: Mycoplasma, Chlamydia, Legionella. Viral: influenza, SARS-CoV-2. Clínica: fiebre, tos productiva, disnea, dolor pleurítico. Consolidación en radiografía. Diagnóstico: clínica + imagen + cultivos. Tratamiento: antibióticos según etiología, soporte respiratorio si hipoxemia.',
            datos: [
                { l: 'Bacteria común', v: 'S. pneumoniae' },
                { l: 'Imagen', v: 'Consolidación' },
                { l: 'Mortalidad', v: '~5-15%' },
                { l: 'Neumonía grave', v: 'UCI 20-50%' }
            ]
        },
        {
            name: 'Cáncer de Pulmón',
            region: 'Neoplasia Broncopulmonar',
            desc: 'Primera causa de muerte por cáncer. Tipos: células no pequeñas (85%: adenocarcinoma, escamoso, células grandes) y células pequeñas (15%, más agresivo). Tabaquismo causa 85% de casos. Síntomas tardíos: tos persistente, hemoptisis, disnea, dolor torácico, pérdida peso. Diagnóstico: TC tórax, broncoscopia, biopsia. Pronóstico pobre: supervivencia 5 años 15-20% global.',
            datos: [
                { l: 'Mortalidad cáncer', v: '#1 causa' },
                { l: 'Tabaco', v: '~85% casos' },
                { l: 'Tipo común', v: 'Adenocarcinoma' },
                { l: 'Supervivencia 5a', v: '15-20%' }
            ]
        },
        {
            name: 'Fibrosis Pulmonar Idiopática',
            region: 'Enfermedad Intersticial — Cicatrización',
            desc: 'Cicatrización progresiva del intersticio pulmonar de causa desconocida. Edad típica: >50 años. Clínica: disnea progresiva, tos seca, crepitantes "velcro" en bases. TC: patrón neumonía intersticial usual (NIU) con panalización. Espirometría: patrón restrictivo (↓CV, ↓CPT, FEV1/FVC normal). Progresión inexorable, mediana supervivencia 3-5 años. Tratamiento: antifibróticos (pirfenidona, nintedanib), trasplante.',
            datos: [
                { l: 'Edad típica', v: '>50 años' },
                { l: 'Patrón', v: 'Restrictivo' },
                { l: 'Supervivencia', v: '3-5 años' },
                { l: 'Tx', v: 'Antifibróticos' }
            ]
        },
        {
            name: 'Tuberculosis Pulmonar',
            region: 'Infección por Mycobacterium tuberculosis',
            desc: 'Infección crónica granulomatosa. Transmisión aérea. Infección latente (90%): sin síntomas, no contagiosa, PPD+. Tuberculosis activa (10%): tos >3 semanas, hemoptisis, fiebre, sudores nocturnos, pérdida peso. Diagnóstico: baciloscopia esputo, cultivo, PCR. Radiografía: infiltrados apicales, cavitaciones. Tratamiento: 6 meses (isoniazida, rifampicina, pirazinamida, etambutol).',
            datos: [
                { l: 'Latente', v: '~90%' },
                { l: 'Activa', v: '~10%' },
                { l: 'Tratamiento', v: '6 meses (RIPE)' },
                { l: 'Mortalidad global', v: '~1.5 mill/año' }
            ]
        },
        {
            name: 'Embolia Pulmonar',
            region: 'Obstrucción Arterial — Tromboembolismo',
            desc: 'Obstrucción de arteria pulmonar por trombo (95% origen venoso profundo miembros inferiores). Clínica: disnea súbita, dolor pleurítico, taquicardia, hemoptisis. Tríada de Virchow: estasis, hipercoagulabilidad, daño endotelial. Diagnóstico: angio-TC, D-dímero elevado. Complicación: hipertensión pulmonar, cor pulmonale. Tratamiento: anticoagulación, trombolisis si masiva, embolectomía.',
            datos: [
                { l: 'Origen', v: '95% TVP MMII' },
                { l: 'Mortalidad', v: '~15% sin Tx' },
                { l: 'Dx gold', v: 'Angio-TC' },
                { l: 'Tx', v: 'Anticoagulación' }
            ]
        },
        {
            name: 'Neumotórax',
            region: 'Aire en Espacio Pleural — Colapso',
            desc: 'Presencia de aire en espacio pleural causando colapso pulmonar parcial/total. Espontáneo primario: jóvenes altos sin patología (ruptura bulla apical). Espontáneo secundario: EPOC, asma, fibrosis. Traumático: penetrante, barotrauma. Clínica: dolor torácico súbito, disnea. Diagnóstico: radiografía (línea pleural, ausencia trama vascular). Tratamiento: observación si <20%, drenaje pleural si mayor.',
            datos: [
                { l: 'Primario', v: 'Jóvenes altos' },
                { l: 'Secundario', v: 'EPOC, asma' },
                { l: 'Dx', v: 'Radiografía' },
                { l: 'Tx >20%', v: 'Drenaje pleural' }
            ]
        },
        {
            name: 'Síndrome de Distrés Respiratorio Agudo (SDRA)',
            region: 'Insuficiencia Respiratoria Aguda',
            desc: 'Falla respiratoria aguda con edema pulmonar no cardiogénico. Causas: sepsis (más común), neumonía, aspiración, trauma, pancreatitis. Criterios de Berlín: inicio agudo (<1 semana), infiltrados bilaterales en imagen, PaO₂/FiO₂ <300 mmHg, no explicado por insuficiencia cardíaca. Leve: 200-300, moderado: 100-200, severo: <100. Mortalidad 30-40%. Tratamiento: ventilación protectora, pronación.',
            datos: [
                { l: 'Causa común', v: 'Sepsis' },
                { l: 'PaO₂/FiO₂', v: '<300 mmHg' },
                { l: 'Mortalidad', v: '30-40%' },
                { l: 'Tx', v: 'Vent. protectora' }
            ]
        },
        {
            name: 'Derrame Pleural',
            region: 'Líquido en Espacio Pleural',
            desc: 'Acumulación anormal de líquido (>15 mL) en espacio pleural. Trasudado (proteínas <3 g/dL): insuficiencia cardíaca, cirrosis, síndrome nefrótico. Exudado (proteínas >3 g/dL): neumonía, cáncer, tuberculosis, embolia pulmonar. Criterios de Light diferencian. Clínica: disnea, dolor pleurítico. Diagnóstico: radiografía (borramiento ángulo costofrénico), toracocentesis. Tratamiento según etiología.',
            datos: [
                { l: 'Normal', v: '<15 mL' },
                { l: 'Trasudado', v: 'Prot. <3 g/dL' },
                { l: 'Exudado', v: 'Prot. >3 g/dL' },
                { l: 'Criterios', v: 'Light' }
            ]
        }
    ]
};

console.log('✅ Lungs Data: Patologías cargadas');
