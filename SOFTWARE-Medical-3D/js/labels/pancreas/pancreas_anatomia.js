/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__PANCREAS_DATA = window.__PANCREAS_DATA || {};

window.__PANCREAS_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#c4a455',
    items: [
        {
            name: 'Acinos Pancreáticos',
            region: 'Parénquima Exocrino — 98% del Volumen',
            desc: 'Unidades funcionales de la porción exocrina. Cada acino es una estructura redondeada formada por 5-8 células acinares piramidales que rodean un lumen central. Producen zimógenos (enzimas inactivas) almacenados en gránulos de zimógeno. Las células centroacinares inician el sistema ductal.',
            datos: [
                { l: 'Volumen páncreas', v: '98-99%' },
                { l: 'Células/acino', v: '5-8 piramidales' },
                { l: 'Gránulos', v: 'Zimógeno' },
                { l: 'Producción', v: '~20 enzimas' }
            ]
        },
        {
            name: 'Islotes de Langerhans',
            region: 'Parénquima Endocrino — 1-2% del Volumen',
            desc: 'Microórganos endocrinos dispersos en el parénquima, más abundantes en cola. Cada islote contiene 1000-3000 células. Células β (60-70%, centro): insulina. Células α (20-30%, periferia): glucagón. Células δ: somatostatina. Células PP: polipéptido pancreático. Células ε: grelina.',
            datos: [
                { l: 'Total islotes', v: '1-2 millones' },
                { l: 'Células/islote', v: '1000-3000' },
                { l: 'Diámetro', v: '50-400 μm' },
                { l: 'Células β', v: '60-70%' }
            ]
        },
        {
            name: 'Conducto de Wirsung',
            region: 'Sistema Ductal Principal',
            desc: 'Conducto pancreático principal que recorre longitudinalmente el páncreas de cola a cabeza, aumentando su calibre progresivamente (1-3 mm en cola, 3-4 mm en cabeza). Recoge los conductos interlobulares. Desemboca en la ampolla de Vater junto al colédoco en la papila duodenal mayor.',
            datos: [
                { l: 'Longitud', v: '~20 cm' },
                { l: 'Calibre cola', v: '1-3 mm' },
                { l: 'Calibre cabeza', v: '3-4 mm' },
                { l: 'Desemboca', v: 'Ampolla Vater' }
            ]
        },
        {
            name: 'Conducto de Santorini',
            region: 'Conducto Pancreático Accesorio',
            desc: 'Drena la porción ventral de la cabeza pancreática. Presente en 40-70% de la población. Desemboca independientemente en la papila duodenal menor, proximal a la papila mayor. Su persistencia puede causar "pancreas divisum", una variante anatómica asociada a pancreatitis recurrente.',
            datos: [
                { l: 'Prevalencia', v: '40-70%' },
                { l: 'Desemboca', v: 'Papila menor' },
                { l: 'Drena', v: 'Cabeza ventral' },
                { l: 'Variante', v: 'Pancreas divisum' }
            ]
        },
        {
            name: 'Proceso Uncinado',
            region: 'Prolongación Inferior de la Cabeza',
            desc: 'Proyección en forma de gancho que se extiende posteriormente por detrás de los vasos mesentéricos superiores (vena y arteria). Embriológicamente deriva del esbozo pancreático ventral. Irrigado por ramas de la arteria pancreaticoduodenal inferior. Importante en cirugía de Whipple.',
            datos: [
                { l: 'Origen embrio.', v: 'Esbozo ventral' },
                { l: 'Relación post.', v: 'Vasos mesentér.' },
                { l: 'Irrigación', v: 'Pancreaticoduo. inf.' },
                { l: 'Cirugía', v: 'Whipple' }
            ]
        },
        {
            name: 'Cápsula y Septos',
            region: 'Tejido Conectivo Estromal',
            desc: 'El páncreas carece de cápsula fibrosa verdadera, solo tiene una delgada cubierta de tejido conectivo laxo. Los septos interlobulares de tejido conectivo dividen el parénquima en lóbulos y lobulillos, conteniendo vasos, nervios y conductos excretores. Estas características facilitan la pancreatitis necrosante.',
            datos: [
                { l: 'Cápsula', v: 'Ausente/delgada' },
                { l: 'Septos', v: 'Interlobulares' },
                { l: 'Contenido septo', v: 'Vasos+nervios' },
                { l: 'Implicación', v: 'Pancreatitis necr.' }
            ]
        },
        {
            name: 'Vascularización Arterial',
            region: 'Irrigación Pancreática Dual',
            desc: 'Irrigación dual: 1) Cabeza: arterias pancreaticoduodenales superiores (tronco celíaco) e inferiores (mesentérica superior), formando arcadas anterior y posterior. 2) Cuerpo-Cola: ramas de arteria esplénica (pancreática dorsal, magna, caudal e inferior). Importante anastomosis entre tronco celíaco y mesentérica superior.',
            datos: [
                { l: 'Cabeza origen', v: 'Celíaco + AMS' },
                { l: 'Cuerpo-cola', v: 'A. esplénica' },
                { l: 'Arcadas cabeza', v: 'Ant. + post.' },
                { l: 'Anastomosis', v: 'Celíaco-AMS' }
            ]
        },
        {
            name: 'Drenaje Venoso',
            region: 'Sistema Porta',
            desc: 'El drenaje venoso sigue el patrón arterial pero drena al sistema porta. Cabeza: venas pancreaticoduodenales → vena mesentérica superior y porta. Cuerpo-Cola: venas pancreáticas → vena esplénica → confluencia esplenomesentérica → vena porta. Esta disposición explica metástasis hepáticas precoces en adenocarcinoma.',
            datos: [
                { l: 'Destino final', v: 'Vena porta' },
                { l: 'Cabeza', v: '→ VMS y porta' },
                { l: 'Cola', v: '→ V. esplénica' },
                { l: 'Implicación', v: 'Metástasis hepát.' }
            ]
        }
    ]
};

console.log('✅ Páncreas Data: Anatomía cargada');
