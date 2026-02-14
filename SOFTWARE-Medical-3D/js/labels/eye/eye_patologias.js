/**
 * ═══════════════════════════════════════════════════
 *  EYE — Patologías Oculares
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__EYE_DATA = window.__EYE_DATA || {};

window.__EYE_DATA.patologias = {
    title: 'Patologías Oculares',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Glaucoma',
            region: 'Nervio Óptico — Humor Acuoso',
            desc: 'Neuropatía óptica progresiva por daño de fibras ganglionares retinianas. El principal factor de riesgo es la presión intraocular elevada (>21 mmHg), aunque existe glaucoma normotensivo. El de ángulo abierto es crónico y asintomático hasta fases avanzadas con pérdida del campo visual periférico.',
            datos: [
                { l: 'PIO riesgo', v: '>21 mmHg' },
                { l: 'Tipo común', v: 'Ángulo abierto' },
                { l: 'Pérdida', v: 'Campo periférico' },
                { l: 'Prevalencia', v: '~80 millones' }
            ]
        },
        {
            name: 'Cataratas',
            region: 'Cristalino — Opacificación',
            desc: 'Opacificación progresiva del cristalino que causa visión borrosa, deslumbramiento y pérdida de contraste. La catarata senil es la causa más frecuente de ceguera reversible en el mundo. El tratamiento es quirúrgico con facoemulsificación e implante de lente intraocular.',
            datos: [
                { l: 'Causa ceguera', v: '#1 reversible' },
                { l: 'Edad típica', v: '>60 años' },
                { l: 'Cirugía', v: 'Facoemulsific.' },
                { l: 'Éxito quirúrg.', v: '>95%' }
            ]
        },
        {
            name: 'Degeneración Macular (DMAE)',
            region: 'Mácula — Retina Central',
            desc: 'Deterioro progresivo de la mácula que afecta la visión central. Forma seca (85-90%): acumulación de drusas y atrofia geográfica. Forma húmeda (10-15%): neovascularización coroidea con edema y hemorragia. Principal causa de ceguera legal en mayores de 50 años en países desarrollados.',
            datos: [
                { l: 'Forma seca', v: '85-90%' },
                { l: 'Forma húmeda', v: '10-15%' },
                { l: 'Pérdida', v: 'Visión central' },
                { l: 'Tratamiento húm.', v: 'Anti-VEGF' }
            ]
        },
        {
            name: 'Retinopatía Diabética',
            region: 'Retina — Microvasculatura',
            desc: 'Daño microvascular retiniano por hiperglucemia crónica. No proliferativa: microaneurismas, hemorragias, exudados. Proliferativa: neovascularización anómala con riesgo de hemorragia vítrea y desprendimiento traccional. El edema macular diabético puede ocurrir en cualquier estadio.',
            datos: [
                { l: 'Tras 20 años DM', v: '~80% afectados' },
                { l: 'No proliferativa', v: 'Microaneurismas' },
                { l: 'Proliferativa', v: 'Neovasos' },
                { l: 'Tratamiento', v: 'Láser/Anti-VEGF' }
            ]
        },
        {
            name: 'Desprendimiento de Retina',
            region: 'Retina Neurosensorial — EPR',
            desc: 'Separación de la retina neurosensorial del epitelio pigmentario retiniano (EPR). Regmatógeno (más frecuente): por desgarro retiniano que permite entrada de humor vítreo. Síntomas: fotopsias (flashes), miodesopsias (moscas volantes) y pérdida de campo visual como un "telón".',
            datos: [
                { l: 'Tipo común', v: 'Regmatógeno' },
                { l: 'Incidencia', v: '~1/10.000/año' },
                { l: 'Síntoma clave', v: 'Telón oscuro' },
                { l: 'Urgencia', v: 'Quirúrgica' }
            ]
        },
        {
            name: 'Conjuntivitis',
            region: 'Conjuntiva — Superficie Ocular',
            desc: 'Inflamación de la conjuntiva, membrana que recubre la esclerótica anterior y párpados internos. Viral (adenovirus, más frecuente): secreción acuosa, muy contagiosa. Bacteriana: secreción purulenta. Alérgica: prurito intenso, bilateral, estacional.',
            datos: [
                { l: 'Más frecuente', v: 'Viral (adenov.)' },
                { l: 'Bacteriana', v: 'Secreción purul.' },
                { l: 'Alérgica', v: 'Prurito bilateral' },
                { l: 'Contagio viral', v: '10-14 días' }
            ]
        },
        {
            name: 'Queratocono',
            region: 'Córnea — Ectasia Progresiva',
            desc: 'Adelgazamiento y protrusión cónica progresiva de la córnea central o paracentral. Causa astigmatismo irregular severo y miopía progresiva. Inicio típico en adolescencia. El cross-linking corneal con riboflavina y UV-A detiene la progresión al rigidizar el colágeno estromal.',
            datos: [
                { l: 'Prevalencia', v: '~1/2000' },
                { l: 'Inicio', v: 'Adolescencia' },
                { l: 'Tratamiento', v: 'Cross-linking' },
                { l: 'Avanzado', v: 'Trasplante corn.' }
            ]
        },
        {
            name: 'Uveítis',
            region: 'Úvea — Iris, Cuerpo Ciliar, Coroides',
            desc: 'Inflamación de la úvea que puede ser anterior (iritis, más común), intermedia, posterior o panuveítis. Causa dolor, fotofobia, ojo rojo y visión borrosa. Puede ser idiopática, autoinmune (espondilitis, sarcoidosis) o infecciosa (toxoplasma, herpes).',
            datos: [
                { l: 'Tipo común', v: 'Anterior (iritis)' },
                { l: 'Síntomas', v: 'Dolor+Fotofobia' },
                { l: 'Tratamiento', v: 'Corticoides tóp.' },
                { l: 'Complicación', v: 'Sinequias' }
            ]
        },
        {
            name: 'Síndrome de Ojo Seco',
            region: 'Película Lagrimal — Superficie Ocular',
            desc: 'Enfermedad multifactorial de la superficie ocular por inestabilidad de la película lagrimal. Deficiencia acuosa (glándula lagrimal) o evaporativa (disfunción meibomiana, la más frecuente). Causa sensación de cuerpo extraño, ardor, visión fluctuante y paradójicamente lagrimeo reflejo.',
            datos: [
                { l: 'Prevalencia', v: '~15-30% >50 años' },
                { l: 'Tipo común', v: 'Evaporativo' },
                { l: 'Test diagnóst.', v: 'Schirmer / BUT' },
                { l: 'Tratamiento', v: 'Lágrimas artif.' }
            ]
        },
        {
            name: 'Retinosis Pigmentaria',
            region: 'Fotorreceptores — Bastones → Conos',
            desc: 'Grupo de distrofias retinianas hereditarias con degeneración progresiva de fotorreceptores. Inicia con pérdida de bastones (visión nocturna), avanza a pérdida de campo periférico ("visión en túnel") y finalmente afecta conos centrales. No tiene cura actual, terapia génica en investigación.',
            datos: [
                { l: 'Prevalencia', v: '~1/4000' },
                { l: 'Herencia', v: 'AD, AR, X-linked' },
                { l: 'Síntoma inicial', v: 'Nictalopía' },
                { l: 'Progresión', v: 'Visión en túnel' }
            ]
        }
    ]
};

console.log('✅ Eye Data: Patologías cargadas');
