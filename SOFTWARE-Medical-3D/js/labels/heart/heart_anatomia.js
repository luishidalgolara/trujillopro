/**
 * ═══════════════════════════════════════════════════
 *  HEART — Anatomía Cardíaca Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__HEART_DATA = window.__HEART_DATA || {};

window.__HEART_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#a78bfa',
    items: [
        {
            name: 'Pericardio',
            region: 'Saco Pericárdico — Envoltorio',
            desc: 'Saco fibroseroso que envuelve el corazón. Pericardio fibroso (externo): resistente e inelástico, fija el corazón al diafragma y esternón. Pericardio seroso: capa parietal (interna al fibroso) y visceral (epicardio, sobre el miocardio). El espacio pericárdico contiene 15-50 mL de líquido lubricante.',
            datos: [
                { l: 'Capas', v: 'Fibroso + Seroso' },
                { l: 'Líquido normal', v: '15-50 mL' },
                { l: 'Seroso', v: 'Parietal+Visceral' },
                { l: 'Función', v: 'Protección+fijación' }
            ]
        },
        {
            name: 'Septo Interventricular',
            region: 'Entre Ventrículos — Central',
            desc: 'Pared muscular que separa los ventrículos derecho e izquierdo. Porción muscular (inferior, gruesa): forma la mayor parte. Porción membranosa (superior, delgada): zona más frecuente de defectos septales congénitos (CIV). El septo recibe irrigación de la arteria descendente anterior.',
            datos: [
                { l: 'Espesor', v: '~10-12 mm' },
                { l: 'Porción muscular', v: '~2/3 inferiores' },
                { l: 'Porción membr.', v: 'CIV frecuente' },
                { l: 'Irrigación', v: 'DA (septal)' }
            ]
        },
        {
            name: 'Cuerdas Tendinosas',
            region: 'Válvulas AV — Músculos Papilares',
            desc: 'Cordones fibrosos (colágeno tipo I) que conectan los bordes libres de las valvas mitral y tricúspide con los músculos papilares. Impiden la eversión (prolapso) de las valvas durante la sístole ventricular. Su rotura (por infarto o endocarditis) causa insuficiencia valvular aguda severa.',
            datos: [
                { l: 'Composición', v: 'Colágeno tipo I' },
                { l: 'Mitral', v: '~120 cuerdas' },
                { l: 'Función', v: 'Anti-prolapso' },
                { l: 'Rotura →', v: 'Insuf. aguda' }
            ]
        },
        {
            name: 'Músculos Papilares',
            region: 'Pared Ventricular — Interno',
            desc: 'Proyecciones musculares cónicas del miocardio ventricular que se insertan en las cuerdas tendinosas. En el VI hay dos: anterolateral y posteromedial. Se contraen durante la sístole tensando las cuerdas. El posteromedial tiene irrigación única (coronaria derecha) y es más vulnerable al infarto.',
            datos: [
                { l: 'VI', v: '2 (AL + PM)' },
                { l: 'VD', v: '3 principales' },
                { l: 'Vulnerable', v: 'PM (irrigac. única)' },
                { l: 'Disfunción →', v: 'Insuf. mitral' }
            ]
        },
        {
            name: 'Seno Coronario',
            region: 'Surco AV Posterior — Drenaje Venoso',
            desc: 'Principal vena de drenaje del corazón. Recibe la vena cardíaca magna, vena cardíaca media y vena cardíaca menor. Desemboca en la aurícula derecha cerca del septo interauricular. Drena ~60% de la sangre venosa coronaria. Es utilizado como vía de acceso para electrodos de resincronización.',
            datos: [
                { l: 'Longitud', v: '~3-5 cm' },
                { l: 'Drenaje', v: '~60% venoso card.' },
                { l: 'Desemboca', v: 'Aurícula derecha' },
                { l: 'Uso clínico', v: 'CRT (resincr.)' }
            ]
        },
        {
            name: 'Anillos Fibrosos (Esqueleto)',
            region: 'Base del Corazón — Plano Valvular',
            desc: 'Estructura de tejido conectivo denso que forma los anillos de las cuatro válvulas y el trígono fibroso central. Proporciona inserción para las valvas, separa eléctricamente aurículas de ventrículos (la conducción solo pasa por el nodo AV/haz de His) y sirve de anclaje para el miocardio.',
            datos: [
                { l: 'Anillos', v: '4 valvulares' },
                { l: 'Trígono', v: 'Central fibroso' },
                { l: 'Aislamiento', v: 'Eléctrico AV' },
                { l: 'Calcificación', v: '→ Estenosis' }
            ]
        },
        {
            name: 'Capas del Corazón',
            region: 'Endocardio → Miocardio → Epicardio',
            desc: 'Endocardio: capa endotelial interna que recubre cámaras y válvulas (afectada en endocarditis). Miocardio: músculo cardíaco estriado involuntario, ~1 cm en VI (contracción). Epicardio: capa visceral del pericardio seroso, contiene grasa y arterias coronarias.',
            datos: [
                { l: 'Endocardio', v: 'Endotelio interno' },
                { l: 'Miocardio VI', v: '~13-15 mm' },
                { l: 'Miocardio VD', v: '~3-5 mm' },
                { l: 'Epicardio', v: 'Coronarias+grasa' }
            ]
        },
        {
            name: 'Orejuela Auricular Izquierda',
            region: 'Apéndice de Aurícula Izquierda',
            desc: 'Divertículo trabecular de la aurícula izquierda. En fibrilación auricular, el flujo estancado favorece la formación de trombos en su interior (~90% de los trombos auriculares se originan aquí). Su oclusión percutánea (dispositivo Watchman) es alternativa a anticoagulación oral crónica.',
            datos: [
                { l: 'Trombos en FA', v: '~90% aquí' },
                { l: 'Oclusión', v: 'Watchman/Amulet' },
                { l: 'Forma', v: 'Variable (4 tipos)' },
                { l: 'Volumen', v: '~5-8 mL' }
            ]
        }
    ]
};

console.log('✅ Heart Data: Anatomía cargada');
