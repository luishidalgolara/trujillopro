/**
 * ═══════════════════════════════════════════════════
 *  LUNGS — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LUNGS_DATA = window.__LUNGS_DATA || {};

window.__LUNGS_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#d4708a',
    items: [
        {
            name: 'Segmentación Pulmonar (Boyden)',
            region: 'Unidades Broncopulmonares',
            desc: 'División funcional en segmentos broncopulmonares, cada uno con bronquio, arteria y vena propios. Pulmón derecho: 10 segmentos (superior: 3, medio: 2, inferior: 5). Pulmón izquierdo: 8-9 segmentos (superior: 4-5 incluyendo língula, inferior: 4). Cada segmento puede resecarse quirúrgicamente de forma independiente sin afectar a los adyacentes.',
            datos: [
                { l: 'Pulmón derecho', v: '10 segmentos' },
                { l: 'Pulmón izquierdo', v: '8-9 segmentos' },
                { l: 'Base división', v: 'Vascular' },
                { l: 'Resección', v: 'Independiente' }
            ]
        },
        {
            name: 'Árbol Bronquial',
            region: 'Vía Aérea de Conducción — 23 Generaciones',
            desc: 'La tráquea se divide en bronquios principales (generación 0) en la carina. Continúa con bronquios lobulares (gen. 1), segmentarios (gen. 2-5), bronquiolos (gen. 6-16) hasta bronquiolos terminales (gen. 17-23). Las primeras 16 generaciones son de conducción (zona muerta anatómica ~150 mL). Las generaciones 17-23 participan en intercambio gaseoso (zona respiratoria).',
            datos: [
                { l: 'Generaciones', v: '23 totales' },
                { l: 'Conducción', v: '0-16 (150 mL)' },
                { l: 'Respiratoria', v: '17-23' },
                { l: 'Bifurcación', v: 'Dicotómica' }
            ]
        },
        {
            name: 'Unidad Alvéolo-Capilar',
            region: 'Membrana Respiratoria',
            desc: 'Barrera de intercambio gaseoso de ~0.5 μm de espesor. Compuesta por: neumocito tipo I (95% superficie alveolar, intercambio), membrana basal fusionada, endotelio capilar. Superficie total ~70 m² (tamaño cancha tenis). El grosor mínimo permite difusión rápida de O₂ (~0.25 s) y CO₂ (~0.25 s) según gradientes de presión.',
            datos: [
                { l: 'Espesor', v: '~0.5 μm' },
                { l: 'Superficie', v: '~70 m²' },
                { l: 'Tiempo difusión', v: '~0.25 s' },
                { l: 'Capas', v: '3 (epitelio+BM+endot.)' }
            ]
        },
        {
            name: 'Neumocitos Tipo I y II',
            region: 'Epitelio Alveolar',
            desc: 'Neumocitos tipo I: células escamosas muy delgadas, 95% de superficie alveolar, intercambio gaseoso. Neumocitos tipo II: células cuboidales, 5% superficie pero 60% de células, producen surfactante pulmonar (fosfolípidos que reducen tensión superficial), se diferencian en tipo I tras daño. Células regenerativas del epitelio alveolar.',
            datos: [
                { l: 'Tipo I superficie', v: '95%' },
                { l: 'Tipo II células', v: '~60%' },
                { l: 'Surfactante', v: 'Tipo II' },
                { l: 'Regeneración', v: 'II → I' }
            ]
        },
        {
            name: 'Surfactante Pulmonar',
            region: 'Película Alveolar — Tensión Superficial',
            desc: 'Complejo de fosfolípidos (90%, principalmente dipalmitoilfosfatidilcolina) y proteínas (10%, SP-A, SP-B, SP-C, SP-D) secretado por neumocitos tipo II. Reduce tensión superficial de 70 a <5 dyn/cm, evitando colapso alveolar (atelectasia) en espiración. Déficit en prematuros causa síndrome de distrés respiratorio neonatal. Vida media ~10-20 horas.',
            datos: [
                { l: 'Fosfolípidos', v: '~90%' },
                { l: 'Proteínas SP', v: '~10%' },
                { l: 'Reduce tensión', v: '70 → <5 dyn/cm' },
                { l: 'Vida media', v: '10-20 h' }
            ]
        },
        {
            name: 'Macrófagos Alveolares',
            region: 'Células de Defensa — Luz Alveolar',
            desc: 'Macrófagos móviles en la luz alveolar y septos. Fagocitan partículas inhaladas, bacterias, restos celulares. Producen citoquinas, modulan inflamación. Migran hacia bronquiolos siendo eliminados por cilios (escalera mucociliar) o atraviesan hacia intersticio. El tabaco altera su función. Llamados "células del polvo" por acumulación de partículas carbonosas en fumadores.',
            datos: [
                { l: 'Ubicación', v: 'Luz alveolar' },
                { l: 'Función', v: 'Fagocitosis' },
                { l: 'Eliminación', v: 'Escalera mucociliar' },
                { l: 'Tabaco', v: 'Altera función' }
            ]
        },
        {
            name: 'Circulación Pulmonar vs Bronquial',
            region: 'Doble Irrigación',
            desc: 'Circulación pulmonar (funcional): arteria pulmonar transporta sangre desoxigenada desde ventrículo derecho a capilares alveolares para oxigenación (~5 L/min, baja presión 25/8 mmHg). Circulación bronquial (nutritiva): arterias bronquiales desde aorta irrigan bronquios, pleura visceral (~1-2% gasto cardíaco, presión sistémica). Ambas drenan mayormente por venas pulmonares.',
            datos: [
                { l: 'Pulmonar flujo', v: '~5 L/min' },
                { l: 'Presión pulm.', v: '25/8 mmHg' },
                { l: 'Bronquial', v: '1-2% GC' },
                { l: 'Función', v: 'Oxigen. vs nutrición' }
            ]
        },
        {
            name: 'Pleura Parietal y Visceral',
            region: 'Membranas Serosas — Espacio Pleural',
            desc: 'Pleura visceral: adherida firmemente al pulmón. Pleura parietal: reviste caja torácica, diafragma y mediastino. Espacio pleural: virtual, contiene ~15 mL líquido seroso (producción parietal, absorción visceral). Presión intrapleural subatmosférica (-5 a -8 cmH₂O) mantiene pulmones expandidos. Neumotórax: entrada de aire rompe presión negativa → colapso pulmonar.',
            datos: [
                { l: 'Líquido', v: '~15 mL' },
                { l: 'Presión', v: '-5 a -8 cmH₂O' },
                { l: 'Producción', v: 'Pleura parietal' },
                { l: 'Absorción', v: 'Pleura visceral' }
            ]
        }
    ]
};

console.log('✅ Lungs Data: Anatomía cargada');
