/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE — Patologías Colónicas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__INTESTINE_DATA = window.__INTESTINE_DATA || {};

window.__INTESTINE_DATA.patologias = {
    title: 'Patologías Colónicas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Cáncer Colorrectal',
            region: 'Mucosa Colónica — Adenocarcinoma',
            desc: 'Tercera causa de cáncer más común y segunda en mortalidad. Surge en 95% de casos de adenomas (pólipos) por secuencia adenoma-carcinoma (10-15 años). Factores de riesgo: edad >50 años, dieta baja en fibra/alta en carne roja procesada, enfermedad inflamatoria intestinal, síndromes hereditarios (Lynch, poliposis adenomatosa familiar).',
            datos: [
                { l: 'Incidencia', v: '~55/100.000' },
                { l: 'Edad pico', v: '>50 años' },
                { l: 'Supervivencia 5a', v: '65% (global)' },
                { l: 'Screening', v: 'Colonoscopia' }
            ]
        },
        {
            name: 'Enfermedad de Crohn',
            region: 'Todo el TGI — Transmural',
            desc: 'Enfermedad inflamatoria intestinal crónica que puede afectar cualquier parte del tracto digestivo (boca a ano), pero típicamente el íleon terminal y colon derecho. Inflamación transmural (todas las capas) con patrón discontinuo ("skip lesions"). Complicaciones: fístulas, estenosis, abscesos. Incurable, tratamiento inmunosupresor.',
            datos: [
                { l: 'Prevalencia', v: '~300/100.000' },
                { l: 'Edad inicio', v: '15-35 años' },
                { l: 'Patrón', v: 'Transmural' },
                { l: 'Complicación', v: 'Fístulas (30%)' }
            ]
        },
        {
            name: 'Colitis Ulcerosa',
            region: 'Colon — Mucosa y Submucosa',
            desc: 'Enfermedad inflamatoria intestinal limitada al colon, siempre afecta recto y se extiende proximalmente de forma continua. Inflamación superficial (mucosa/submucosa únicamente). Síntomas: diarrea sanguinolenta, urgencia fecal, tenesmo. Aumenta riesgo de cáncer colorrectal (displasia después de 8-10 años). El megacolon tóxico es complicación mortal.',
            datos: [
                { l: 'Prevalencia', v: '~250/100.000' },
                { l: 'Siempre afecta', v: 'Recto' },
                { l: 'Patrón', v: 'Continuo' },
                { l: 'Riesgo cáncer', v: 'Tras 8-10 años' }
            ]
        },
        {
            name: 'Síndrome de Intestino Irritable (SII)',
            region: 'Funcional — Sin Lesión Orgánica',
            desc: 'Trastorno funcional más común del intestino. Dolor abdominal recurrente relacionado con defecación, cambios en frecuencia/forma de heces. Subtipos: SII-D (diarrea), SII-E (estreñimiento), SII-M (mixto). Criterios de Roma IV. Fisiopatología: hipersensibilidad visceral, dismotilidad, disbiosis, eje intestino-cerebro alterado.',
            datos: [
                { l: 'Prevalencia', v: '~10-15%' },
                { l: 'Mujeres:Hombres', v: '2:1' },
                { l: 'Edad típica', v: '<50 años' },
                { l: 'Diagnóstico', v: 'Roma IV' }
            ]
        },
        {
            name: 'Diverticulosis y Diverticulitis',
            region: 'Colon Sigmoide — Herniación Mucosa',
            desc: 'Diverticulosis: herniaciones saculares de mucosa/submucosa a través de la capa muscular donde penetran vasos (puntos débiles). Común en >60 años (50-70%). Asintomática en 80%. Diverticulitis: inflamación/infección de divertículos (4% de diverticulosis). Complicaciones: absceso, perforación, fístula, estenosis.',
            datos: [
                { l: 'Prevalencia >60a', v: '50-70%' },
                { l: 'Asintomática', v: '~80%' },
                { l: 'Diverticulitis', v: '4% casos' },
                { l: 'Ubicación', v: 'Sigmoide (95%)' }
            ]
        },
        {
            name: 'Colitis Isquémica',
            region: 'Colon — Hipoperfusión',
            desc: 'Isquemia colónica por reducción de flujo sanguíneo. Causa más común: hipotensión sistémica (shock, cirugía cardíaca). Zonas vulnerables: flexura esplénica (punto de Griffiths) y unión rectosigmoidea. Síntomas: dolor abdominal súbito, diarrea sanguinolenta. Mayoría (85%) se resuelve espontáneamente. Forma grave: gangrena colónica (20% mortalidad).',
            datos: [
                { l: 'Edad típica', v: '>60 años' },
                { l: 'Zona vulnerable', v: 'Flexura esplénica' },
                { l: 'Resolución espon.', v: '~85%' },
                { l: 'Mortalidad grave', v: '~20%' }
            ]
        },
        {
            name: 'Megacolon Tóxico',
            region: 'Colon — Dilatación Aguda Severa',
            desc: 'Complicación potencialmente mortal de colitis severa (ulcerosa, Crohn, infecciosa por C. difficile). Dilatación colónica >6 cm con signos de toxicidad sistémica. Fisiopatología: inflamación transmural causa parálisis neuromuscular, acumula gas. Riesgo de perforación (15-30%). Tratamiento: descompresión, antibióticos, cirugía urgente si no responde.',
            datos: [
                { l: 'Diámetro', v: '>6 cm' },
                { l: 'Mortalidad', v: '~20%' },
                { l: 'Perforación', v: '15-30%' },
                { l: 'Causa común', v: 'C. difficile' }
            ]
        },
        {
            name: 'Pólipos Colónicos',
            region: 'Mucosa — Crecimiento Anormal',
            desc: 'Proyecciones de tejido hacia la luz intestinal. Tipos: adenomatosos (neoplásicos, 70%, riesgo cáncer), hiperplásicos (benignos, 30%), serrados (10%, riesgo cáncer variable). Pólipos adenomatosos >1 cm, vellosos o con displasia de alto grado tienen mayor riesgo maligno (30-50%). Screening colonoscópico cada 10 años desde los 45-50 años.',
            datos: [
                { l: 'Prevalencia >50a', v: '~25-40%' },
                { l: 'Adenomatosos', v: '~70% (riesgo)' },
                { l: 'Riesgo cáncer >1cm', v: '30-50%' },
                { l: 'Polipectomía', v: 'Previene cáncer' }
            ]
        },
        {
            name: 'Colitis por Clostridium difficile',
            region: 'Colon — Infección Nosocomial',
            desc: 'Infección por C. difficile tras antibióticos que alteran microbiota (clindamicina, fluoroquinolonas, cefalosporinas). Bacteria produce toxinas A y B que dañan mucosa. Espectro: diarrea leve hasta megacolon tóxico. Pseudomembranas (exudado fibrinoso) en colonoscopia. Tratamiento: metronidazol/vancomicina oral, trasplante fecal en recurrencias.',
            datos: [
                { l: 'Causa', v: 'Post-antibióticos' },
                { l: 'Recurrencia', v: '~20-30%' },
                { l: 'Pseudomembranas', v: 'Signo típico' },
                { l: 'Trasplante fecal', v: '90% éxito' }
            ]
        },
        {
            name: 'Obstrucción Intestinal',
            region: 'Colon — Bloqueo Mecánico',
            desc: 'Bloqueo del tránsito intestinal. Causas: cáncer colorrectal (60%), diverticulitis, vólvulo (torsión, común en sigmoide y ciego), hernia incarcerada. Síntomas: dolor abdominal cólico, distensión, vómitos, ausencia de evacuación. Radiografía: niveles hidroaéreos, dilatación. Tratamiento: descompresión, cirugía si perforación o isquemia.',
            datos: [
                { l: 'Causa #1', v: 'Cáncer (60%)' },
                { l: 'Vólvulo sigmoide', v: '~5% casos' },
                { l: 'Signo Rx', v: 'Niveles hidroaér.' },
                { l: 'Mortalidad', v: '~5-15%' }
            ]
        }
    ]
};

console.log('✅ Intestine Data: Patologías cargadas');
