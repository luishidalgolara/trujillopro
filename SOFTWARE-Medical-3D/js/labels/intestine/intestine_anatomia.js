/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__INTESTINE_DATA = window.__INTESTINE_DATA || {};

window.__INTESTINE_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#d4785a',
    items: [
        {
            name: 'Válvula Ileocecal',
            region: 'Unión Íleon-Ciego — Esfínter',
            desc: 'Válvula unidireccional entre el íleon terminal y el ciego. Estructura formada por dos pliegues (labios superior e inferior) que impide el reflujo del contenido colónico al intestino delgado. Controla el paso de 1-4 mL/min de quimo. La incompetencia valvular causa contaminación bacteriana del intestino delgado.',
            datos: [
                { l: 'Flujo', v: '1-4 mL/min' },
                { l: 'Tipo', v: 'Esfínter pasivo' },
                { l: 'Presión', v: '20-30 mmHg' },
                { l: 'Reflujo', v: 'Prevención' }
            ]
        },
        {
            name: 'Tenias Coli',
            region: 'Capa Muscular Longitudinal Externa',
            desc: 'Tres bandas musculares longitudinales que recorren el colon desde el ciego hasta el recto: tenia mesocólica (inserta en mesocolon), tenia libre y tenia omental. Son más cortas que el colon, generando las haustras. Ausentes en recto. Contienen los plexos nerviosos mioentéricos.',
            datos: [
                { l: 'Número', v: '3 bandas' },
                { l: 'Anchura', v: '~1 cm' },
                { l: 'Terminan en', v: 'Unión rectosigmoidea' },
                { l: 'Generan', v: 'Haustras' }
            ]
        },
        {
            name: 'Haustras Colónicas',
            region: 'Saculaciones — Pared Colónica',
            desc: 'Saculaciones características del colon causadas por la contracción de las tenias coli más cortas que la pared intestinal. No son estructuras fijas sino funcionales, cambian con la motilidad. Aumentan la superficie de contacto para absorción. Ausentes en recto y colon sigmoide distal.',
            datos: [
                { l: 'Naturaleza', v: 'Funcional' },
                { l: 'Causa', v: 'Acort. tenias' },
                { l: 'Función', v: '↑ Superficie' },
                { l: 'Ausentes', v: 'Recto' }
            ]
        },
        {
            name: 'Apéndices Epiploicos',
            region: 'Serosa — Grasa Peritoneal',
            desc: 'Pequeños sacos pediculados de grasa peritoneal cubiertos de peritoneo visceral que penden del colon (50-100 en total). Presentes desde el ciego hasta la unión rectosigmoidea, en hileras paralelas a las tenias libre y omental. Función incierta, posible reserva energética o inmunológica. Pueden torsionarse causando apendicitis epiploica.',
            datos: [
                { l: 'Número', v: '~50-100' },
                { l: 'Tamaño', v: '0.5-5 cm' },
                { l: 'Contenido', v: 'Grasa + vasos' },
                { l: 'Complicación', v: 'Torsión (dolor)' }
            ]
        },
        {
            name: 'Plexo Nervioso de Auerbach',
            region: 'Entre Capas Musculares',
            desc: 'Plexo nervioso mioentérico ubicado entre las capas musculares circular y longitudinal. Contiene neuronas del sistema nervioso entérico que controlan la motilidad colónica de forma autónoma. Produce contracciones segmentarias (mezclado) y movimientos de masa (propulsivos). Daño causa dismotilidad (megacolon).',
            datos: [
                { l: 'Ubicación', v: 'Entre muscular' },
                { l: 'Neuronas', v: '~100 millones' },
                { l: 'Control', v: 'Motilidad' },
                { l: 'Autónomo', v: 'Independ. SNC' }
            ]
        },
        {
            name: 'Plexo Nervioso de Meissner',
            region: 'Submucosa — Bajo la Mucosa',
            desc: 'Plexo submucoso que regula la secreción de moco, flujo sanguíneo local y absorción de agua/electrolitos. Trabaja en conjunto con el plexo de Auerbach formando el sistema nervioso entérico. Contiene neuronas secretomotoras y sensitivas que detectan distensión y composición química del contenido luminal.',
            datos: [
                { l: 'Ubicación', v: 'Submucosa' },
                { l: 'Función', v: 'Secreción + absorc.' },
                { l: 'Sensores', v: 'Químicos + mecán.' },
                { l: 'Coopera con', v: 'Plexo Auerbach' }
            ]
        },
        {
            name: 'Criptas de Lieberkühn',
            region: 'Mucosa Colónica — Glándulas Tubulares',
            desc: 'Invaginaciones tubulares simples de la mucosa colónica que contienen células madre en la base, células caliciformes (abundantes, 25-50% en colon), enterocitos absortivos y células enteroendocrinas. Se renuevan cada 3-5 días. Producen moco protector rico en mucina (MUC2) que forma la barrera físico-química.',
            datos: [
                { l: 'Profundidad', v: '~500 μm' },
                { l: 'Renovación', v: '3-5 días' },
                { l: 'Células calic.', v: '25-50%' },
                { l: 'Mucina', v: 'MUC2' }
            ]
        },
        {
            name: 'Vascularización Colónica',
            region: 'Arterias Mesentéricas Superior e Inferior',
            desc: 'El colon derecho (ciego a 2/3 transverso) recibe sangre de ramas de la arteria mesentérica superior: ileocólica, cólica derecha, cólica media. El colon izquierdo (1/3 transverso a recto) de la mesentérica inferior: cólica izquierda, sigmoideas, rectal superior. El punto de Griffiths (flexura esplénica) es zona de transición vulnerable a isquemia.',
            datos: [
                { l: 'AMS', v: 'Colon derecho' },
                { l: 'AMI', v: 'Colon izquierdo' },
                { l: 'Zona crítica', v: 'Flexura esplénica' },
                { l: 'Anastomosis', v: 'Arco Riolan' }
            ]
        }
    ]
};

console.log('✅ Intestine Data: Anatomía cargada');
