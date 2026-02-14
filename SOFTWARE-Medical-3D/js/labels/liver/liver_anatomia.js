/**
 * ═══════════════════════════════════════════════════
 *  LIVER — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LIVER_DATA = window.__LIVER_DATA || {};

window.__LIVER_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#b8704a',
    items: [
        {
            name: 'Lóbulos Hepáticos',
            region: 'Clasificación Anatómica — Couinaud',
            desc: 'Anatómicamente: lóbulo derecho (mayor, 60-65%) y lóbulo izquierdo (35-40%), separados por ligamento falciforme. Funcionalmente: clasificación de Couinaud divide el hígado en 8 segmentos independientes (I-VIII) basados en irrigación portal y drenaje venoso. Cada segmento puede resecarse quirúrgicamente de forma independiente.',
            datos: [
                { l: 'Lób. derecho', v: '60-65%' },
                { l: 'Lób. izquierdo', v: '35-40%' },
                { l: 'Segmentos', v: '8 (I-VIII)' },
                { l: 'Base división', v: 'Vascular' }
            ]
        },
        {
            name: 'Lobulillo Hepático Clásico',
            region: 'Unidad Estructural — Hexagonal',
            desc: 'Estructura hexagonal de ~1-2 mm de diámetro. Centro: vena central (tributaria de venas hepáticas). Periferia: tríadas portales (vena porta, arteria hepática, conducto biliar). Hepatocitos dispuestos en placas radiales de 1-2 células de grosor, separadas por sinusoides. Representa la unidad estructural histológica clásica.',
            datos: [
                { l: 'Diámetro', v: '~1-2 mm' },
                { l: 'Forma', v: 'Hexagonal' },
                { l: 'Centro', v: 'Vena central' },
                { l: 'Periferia', v: 'Tríadas portales' }
            ]
        },
        {
            name: 'Acino Hepático (Rappaport)',
            region: 'Unidad Funcional — Zonas Metabólicas',
            desc: 'Unidad funcional con forma romboidal. Centro: tríada portal (aporte sanguíneo). Periferia: venas centrales. Zona 1 (periportal): mayor O₂, gluconeogénesis, β-oxidación. Zona 2: intermedia. Zona 3 (pericentral): menor O₂, glucólisis, metabolismo de fármacos (CYP450), más vulnerable a hipoxia y tóxicos.',
            datos: [
                { l: 'Zona 1', v: 'Periportal (↑O₂)' },
                { l: 'Zona 2', v: 'Intermedia' },
                { l: 'Zona 3', v: 'Pericentral (↓O₂)' },
                { l: 'Vulnerable', v: 'Zona 3' }
            ]
        },
        {
            name: 'Hepatocitos',
            region: 'Células Parenquimales — 60-80%',
            desc: 'Células poliédricas que constituyen 60-80% de la masa hepática. Realizan >500 funciones metabólicas. Polarizados: polo sinusoidal (con microvellosidades, intercambio sangre), polo biliar (secreción de bilis). Vida media: ~150-200 días. Tras hepatectomía parcial, los hepatocitos restantes entran en mitosis (regeneración hepática).',
            datos: [
                { l: 'Proporción', v: '60-80% masa' },
                { l: 'Núcleos', v: 'Mono/binucleados' },
                { l: 'Vida media', v: '~150-200 días' },
                { l: 'Funciones', v: '>500' }
            ]
        },
        {
            name: 'Células de Kupffer',
            region: 'Macrófagos Residentes — Sinusoides',
            desc: 'Macrófagos fijos del sistema reticuloendotelial que revisten los sinusoides. Constituyen ~80-90% de los macrófagos tisulares del cuerpo. Funciones: fagocitosis de bacterias, eritrocitos envejecidos, partículas; producción de citoquinas; presentación antigénica. Protegen hígado de infecciones provenientes del intestino vía vena porta.',
            datos: [
                { l: 'Tipo', v: 'Macrófagos fijos' },
                { l: 'Ubicación', v: 'Luz sinusoidal' },
                { l: 'Proporción', v: '~15% células hep.' },
                { l: 'Función', v: 'Fagocitosis + inmune' }
            ]
        },
        {
            name: 'Células Estrelladas (Ito)',
            region: 'Espacio de Disse — Fibrosis',
            desc: 'Células perisinusoidales en el espacio de Disse. Estado normal: quiescentes, almacenan vitamina A (80-90% de reservas corporales). Tras daño hepático: se activan transformándose en miofibroblastos que producen colágeno y matriz extracelular. Responsables principales de la fibrosis hepática y cirrosis.',
            datos: [
                { l: 'Ubicación', v: 'Espacio Disse' },
                { l: 'Almacén vit. A', v: '80-90% corporal' },
                { l: 'Activadas', v: 'Miofibroblastos' },
                { l: 'Causa', v: 'Fibrosis/cirrosis' }
            ]
        },
        {
            name: 'Espacio de Disse',
            region: 'Espacio Perisinusoidal',
            desc: 'Espacio estrecho (~0.5 μm) entre endotelio sinusoidal fenestrado y hepatocitos. Contiene microvellosidades de hepatocitos y células estrelladas. Lleno de plasma que permite intercambio directo entre sangre y hepatocitos. La fibrosis de este espacio (capilarización sinusoidal) altera el intercambio en cirrosis.',
            datos: [
                { l: 'Anchura', v: '~0.5 μm' },
                { l: 'Contenido', v: 'Plasma + microvel.' },
                { l: 'Función', v: 'Intercambio' },
                { l: 'Fibrosis', v: 'Capilarización' }
            ]
        },
        {
            name: 'Doble Irrigación Sanguínea',
            region: 'Vena Porta + Arteria Hepática',
            desc: 'Hígado recibe ~1.5 L/min de sangre (25% del gasto cardíaco). Vena porta: 75% del flujo, sangre desoxigenada rica en nutrientes desde intestino. Arteria hepática: 25% del flujo, pero aporta 50% del O₂. La sangre se mezcla en sinusoides y drena por venas hepáticas a vena cava inferior.',
            datos: [
                { l: 'Flujo total', v: '~1.5 L/min' },
                { l: 'Vena porta', v: '75% flujo' },
                { l: 'Art. hepática', v: '25% flujo, 50% O₂' },
                { l: 'Drenaje', v: 'V. hepáticas → VCI' }
            ]
        }
    ]
};

console.log('✅ Liver Data: Anatomía cargada');
