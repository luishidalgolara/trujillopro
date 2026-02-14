// ═══════════════════════════════════════════════════════════
// NEURO DATA - Información completa de neuroanatomía
// Basado en: Nolte (2024), Kandel (2021), Snell (2023)
// ═══════════════════════════════════════════════════════════

const NEURO_DATA = [
  // ═══════════════════════════════════════════════════════════
  // ENCÉFALO - CORTEZA CEREBRAL
  // ═══════════════════════════════════════════════════════════
  {
    id: 'corteza-motora',
    nombre: 'Corteza Motora Primaria (M1)',
    subtitulo: 'Área 4 de Brodmann - Giro precentral',
    icono: '🧠',
    categorias: ['encefalo', 'vias-descendentes'],
    secciones: [
      {
        titulo: '📍 Localización Anatómica',
        items: [
          '<strong>Ubicación:</strong> Giro precentral del lóbulo frontal, inmediatamente anterior al surco central (Rolando)',
          '<strong>Área de Brodmann:</strong> Área 4',
          '<strong>Límites:</strong> Anterior: área premotora (área 6), Posterior: surco central, Superior: surco cingulado',
          '<strong>Homúnculo motor:</strong> Representación somatotópica invertida, zona facial lateral-inferior, miembros superiores lateral, miembros inferiores medial (lóbulo paracentral)',
          '<strong>Irrigación:</strong> Ramas de arteria cerebral media (convexidad lateral) y arteria cerebral anterior (cara medial)'
        ]
      },
      {
        titulo: '🏗️ Citoarquitectura',
        items: [
          '<strong>Capa I (molecular):</strong> Escasas células, principalmente axones y dendritas',
          '<strong>Capa II-III (granular externa y piramidal externa):</strong> Proyecciones corticocorticales',
          '<strong>Capa IV (granular interna):</strong> Muy reducida en M1 (característica de corteza agranular motora)',
          '<strong>Capa V (piramidal interna):</strong> Contiene células piramidales gigantes de Betz (neuronas motoras superiores)',
          '<strong>Células de Betz:</strong> 3-5% de neuronas de capa V, cuerpos celulares de 60-120 μm, axones de hasta 1 metro',
          '<strong>Capa VI (multiforme):</strong> Proyecciones talamocorticales'
        ]
      },
      {
        titulo: '⚡ Vías Eferentes - Tracto Corticoespinal',
        items: [
          '<strong>Tracto corticoespinal lateral (90%):</strong> Decusación en pirámides bulbares, desciende por cordón lateral contralateral, control fino de extremidades',
          '<strong>Tracto corticoespinal anterior (10%):</strong> No decusa en bulbo, desciende por cordón anterior ipsilateral, decusa a nivel segmentario, controla musculatura axial',
          '<strong>Fibras corticonucleares (corticobulbares):</strong> Inervan núcleos motores de nervios craneales, mayoría decusa',
          '<strong>Cápsula interna:</strong> Fibras pasan por brazo posterior, organización somatotópica (rodilla: cara, posterior: extremidades)',
          '<strong>Pedúnculos cerebrales:</strong> Fibras ocupan 2/3 mediales del pie del pedúnculo cerebral',
          '<strong>Pirámides bulbares:</strong> Protrusiones en cara ventral del bulbo, sitio de decusación motora'
        ]
      },
      {
        titulo: '🎯 Organización Somatotópica (Homúnculo de Penfield)',
        tipo: 'tabla',
        datos: [
          { label: 'Región facial-laríngea', value: 'Porción lateral inferior del giro precentral (mayor representación)' },
          { label: 'Extremidad superior', value: 'Porción lateral media (mano tiene gran representación - "mano hábil")' },
          { label: 'Tronco', value: 'Porción medial superior, cerca del surco central' },
          { label: 'Extremidad inferior', value: 'Lóbulo paracentral (cara medial del hemisferio), irrigado por A. cerebral anterior' },
          { label: 'Principio de representación', value: 'Áreas con mayor precisión motora tienen mayor representación cortical' }
        ]
      },
      {
        titulo: '🔄 Aferencias y Conexiones',
        items: [
          '<strong>Tálamo ventrolateral (VL):</strong> Recibe información del cerebelo, proyecta a M1',
          '<strong>Núcleo ventral posterolateral (VPL):</strong> Información somatosensorial',
          '<strong>Corteza somatosensorial primaria (S1):</strong> Retroalimentación sensorial del movimiento',
          '<strong>Corteza premotora y área motora suplementaria:</strong> Planificación motora',
          '<strong>Corteza parietal posterior:</strong> Integración visoespacial para movimientos dirigidos',
          '<strong>Ganglios basales:</strong> Modulación del movimiento vía tálamo'
        ]
      },
      {
        titulo: '⚕️ Correlaciones Clínicas',
        tipo: 'clinica',
        items: [
          '<strong>Infarto de arteria cerebral media:</strong> Hemiparesia contralateral faciobraquial (cara y brazo), preserva pierna',
          '<strong>Infarto de arteria cerebral anterior:</strong> Monoparesia contralateral de miembro inferior',
          '<strong>Lesión de cápsula interna:</strong> Hemiparesia contralateral densa (cara, brazo, pierna), más común que lesiones corticales',
          '<strong>Síndrome de neurona motora superior:</strong> Espasticidad, hiperreflexia, signo de Babinski, clonus, pérdida de movimientos finos',
          '<strong>Convulsiones motoras focales (Jacksonianas):</strong> Actividad epiléptica que progresa siguiendo homúnculo motor',
          '<strong>Afasia de Broca con hemiparesia:</strong> Lesión extensa de área frontal inferior izquierda con extensión a M1',
          '<strong>Atrofia cortical focal (síndrome de Foix-Chavany-Marie):</strong> Diplejía facial con preservación de movimientos emocionales',
          '<strong>Estimulación cortical (cirugía de epilepsia):</strong> Mapeo funcional de M1 mediante estimulación directa intraoperatoria'
        ]
      }
    ]
  },

  {
    id: 'ganglios-basales',
    nombre: 'Ganglios Basales',
    subtitulo: 'Núcleos subcorticales del control motor',
    icono: '⚙️',
    categorias: ['encefalo', 'vias-descendentes'],
    secciones: [
      {
        titulo: '📍 Componentes Anatómicos',
        items: [
          '<strong>Cuerpo estriado:</strong> Núcleo caudado + putamen (separados por cápsula interna)',
          '<strong>Núcleo caudado:</strong> Cabeza (adyacente al ventrículo lateral), cuerpo, cola',
          '<strong>Putamen:</strong> Lateral al globo pálido, juntos forman el núcleo lenticular',
          '<strong>Globo pálido:</strong> Segmento externo (GPe) y segmento interno (GPi)',
          '<strong>Núcleo subtalámico (NST):</strong> Núcleo de Luys, zona incierta',
          '<strong>Sustancia negra:</strong> Pars compacta (SNpc, neuronas dopaminérgicas) y pars reticulata (SNpr)',
          '<strong>Núcleo accumbens:</strong> Estriado ventral, parte del sistema límbico'
        ]
      },
      {
        titulo: '🔄 Circuitos Funcionales',
        items: [
          '<strong>VÍA DIRECTA (facilitadora del movimiento):</strong> Corteza → Estriado (D1) → GPi/SNpr → Tálamo (VL/VA) → Corteza',
          '<strong>Mecanismo vía directa:</strong> Estriado inhibe GPi/SNpr → disminuye inhibición talámica → FACILITA movimiento',
          '<strong>VÍA INDIRECTA (supresora del movimiento):</strong> Corteza → Estriado (D2) → GPe → NST → GPi/SNpr → Tálamo → Corteza',
          '<strong>Mecanismo vía indirecta:</strong> Estriado inhibe GPe → GPe libera NST → NST excita GPi/SNpr → aumenta inhibición talámica → SUPRIME movimiento',
          '<strong>VÍA HIPERDIRECTA:</strong> Corteza → NST → GPi/SNpr (supresión rápida del movimiento)',
          '<strong>Balance normal:</strong> Equilibrio entre vía directa (Go) e indirecta (NoGo)'
        ]
      },
      {
        titulo: '⚡ Neurotransmisores',
        items: [
          '<strong>Dopamina (DA):</strong> SNpc → Estriado (nigroestriatal), modula vías directa e indirecta',
          '<strong>Receptores D1:</strong> En vía directa, la dopamina FACILITA (excita)',
          '<strong>Receptores D2:</strong> En vía indirecta, la dopamina INHIBE (frena la vía indirecta = facilita movimiento)',
          '<strong>GABA:</strong> Neurotransmisor inhibitorio principal (estriado, GPi/GPe, SNpr)',
          '<strong>Glutamato:</strong> Excitatorio, proyecciones corticoestriatales y NST',
          '<strong>Acetilcolina:</strong> Interneuronas colinérgicas del estriado'
        ]
      },
      {
        titulo: '🎯 Funciones',
        tipo: 'tabla',
        datos: [
          { label: 'Iniciación del movimiento', value: 'Facilita movimientos voluntarios vía circuito directo' },
          { label: 'Supresión de movimientos no deseados', value: 'Inhibe movimientos competidores vía circuito indirecto' },
          { label: 'Modulación de la amplitud', value: 'Regula la fuerza y velocidad del movimiento' },
          { label: 'Aprendizaje motor', value: 'Automatización de secuencias motoras aprendidas' },
          { label: 'Funciones cognitivas', value: 'Circuitos prefrontales: funciones ejecutivas, memoria de trabajo' },
          { label: 'Funciones límbicas', value: 'Circuitos límbicos: motivación, recompensa (núcleo accumbens)' }
        ]
      },
      {
        titulo: '⚕️ Patologías de Ganglios Basales',
        tipo: 'clinica',
        items: [
          '<strong>ENFERMEDAD DE PARKINSON:</strong> Degeneración de SNpc → déficit de dopamina → predominio vía indirecta → HIPOCINESIA',
          '<strong>Tríada parkinsoniana:</strong> Bradicinesia/acinesia, rigidez en "rueda dentada", temblor de reposo (4-6 Hz)',
          '<strong>Otros signos parkinsonianos:</strong> Marcha festinante, hipomimia facial, micrografía, hipofonia, inestabilidad postural',
          '<strong>Tratamiento Parkinson:</strong> Levodopa (precursor de DA), agonistas dopaminérgicos, inhibidores MAO-B/COMT, estimulación cerebral profunda del NST',
          '<strong>ENFERMEDAD DE HUNTINGTON:</strong> Degeneración de neuronas estriatales (D2) → pérdida vía indirecta → predominio vía directa → HIPERCINESIA',
          '<strong>Corea de Huntington:</strong> Movimientos involuntarios, irregulares, en sacudidas (danza), demencia, expansión CAG (cromosoma 4)',
          '<strong>HEMIBALISMO:</strong> Lesión del NST contralateral (ACV) → hipercinesia extrema de hemicuerpo (movimientos violentos de lanzamiento)',
          '<strong>DISTONÍA:</strong> Contracciones musculares sostenidas, posturas anormales, puede ser focal (blefaroespasmo, tortícolis) o generalizada',
          '<strong>Enfermedad de Wilson:</strong> Acumulación de cobre en putamen y GPe, movimientos coreiformes, anillo de Kayser-Fleischer corneal',
          '<strong>Síndrome neuroléptico maligno:</strong> Antagonistas dopaminérgicos, rigidez extrema, fiebre, rabdomiólisis, emergencia médica'
        ]
      }
    ]
  },

  {
    id: 'cerebelo',
    nombre: 'Cerebelo',
    subtitulo: 'Coordinación motora y equilibrio',
    icono: '🎯',
    categorias: ['encefalo', 'vias-ascendentes', 'vias-descendentes'],
    secciones: [
      {
        titulo: '📍 Anatomía Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Fosa craneal posterior, inferior al tentorio del cerebelo, posterior al puente y bulbo',
          '<strong>Hemisferios cerebelosos:</strong> Derecho e izquierdo, conectados por vermis mediano',
          '<strong>Lóbulos:</strong> Anterior (paleocerebelo), posterior (neocerebelo), floculonodular (arquicerebelo)',
          '<strong>Fisura primaria:</strong> Separa lóbulo anterior de posterior',
          '<strong>Pedúnculos cerebelosos:</strong> Superior (eferencias a tálamo/núcleo rojo), medio (aferencias pontinas), inferior (aferencias espinales/vestibulares)',
          '<strong>Núcleos profundos:</strong> Dentado (lateral, mayor), emboliforme, globoso, fastigial (medial)'
        ]
      },
      {
        titulo: '🏗️ Organización Funcional',
        items: [
          '<strong>VESTIBULOCEREBELO (Arquicerebelo):</strong> Lóbulo floculonodular + vermis inferior',
          '<strong>Función vestibulocerebelo:</strong> Equilibrio, control de movimientos oculares, recibe aferencias vestibulares',
          '<strong>Salida vestibulocerebelo:</strong> Núcleo fastigial → núcleos vestibulares → tractos vestibuloespinales',
          '<strong>ESPINOCEREBELO (Paleocerebelo):</strong> Vermis + zona intermedia (paravermal)',
          '<strong>Función espinocerebelo:</strong> Tono muscular, postura, coordinación de tronco y extremidades proximales',
          '<strong>Salida espinocerebelo:</strong> Núcleos emboliforme/globoso → núcleo rojo → tracto rubroespinal',
          '<strong>CEREBROCEREBELO (Neocerebelo):</strong> Hemisferios laterales (mayor parte)',
          '<strong>Función cerebrocerebelo:</strong> Planificación motora, coordinación fina de extremidades distales, funciones cognitivas',
          '<strong>Salida cerebrocerebelo:</strong> Núcleo dentado → tálamo (VL) → corteza motora'
        ]
      },
      {
        titulo: '⚡ Circuitos Aferentes y Eferentes',
        items: [
          '<strong>Fibras musgosas:</strong> Aferencias de médula espinal (espinocerebelosas), núcleos pontinos, vestibulares',
          '<strong>Fibras trepadoras:</strong> Desde oliva inferior, una fibra trepa sobre múltiples células de Purkinje',
          '<strong>Tracto espinocerebeloso dorsal:</strong> Propioocepción consciente/inconsciente de miembros inferiores, no decusa',
          '<strong>Tracto espinocerebeloso ventral:</strong> Información de interneuronas medulares, decusa 2 veces (retorna ipsilateral)',
          '<strong>Tracto cuneocerebeloso:</strong> Propioocepción de miembros superiores, análogo a espinocerebeloso dorsal',
          '<strong>Tracto olivocerebeloso:</strong> Oliva inferior → cerebelo contralateral (decusa)',
          '<strong>Eferencias:</strong> Células de Purkinje (GABAérgicas) → núcleos profundos → tálamo/tronco encefálico'
        ]
      },
      {
        titulo: '🔬 Citoarquitectura Cortical',
        tipo: 'tabla',
        datos: [
          { label: 'Capa molecular (superficial)', value: 'Dendritas de células de Purkinje, axones de células granulares (fibras paralelas)' },
          { label: 'Capa de células de Purkinje', value: 'Neurona principal, GABA inhibitoria, dendritas en forma de abanico, eferencia única' },
          { label: 'Capa granular (profunda)', value: 'Células granulares (excitatorias), células de Golgi (inhibitorias)' },
          { label: 'Relación numérica', value: '1 célula de Purkinje recibe input de ~200,000 células granulares' }
        ]
      },
      {
        titulo: '⚕️ Síndromes Cerebelosos',
        tipo: 'clinica',
        items: [
          '<strong>LESIÓN DEL VERMIS:</strong> Ataxia de tronco, marcha ebria (ataxia truncal), imposibilidad de mantenerse de pie (astasia)',
          '<strong>Causa vermis:</strong> Meduloblastoma en niños, degeneración alcohólica (vermis anterior)',
          '<strong>LESIÓN HEMISFÉRICA:</strong> Ataxia apendicular IPSILATERAL (mismo lado de lesión), dismetría, disdiadococinesia',
          '<strong>Dismetría:</strong> Incapacidad de medir distancias, prueba dedo-nariz con sobrepaso (past-pointing)',
          '<strong>Disdiadococinesia:</strong> Incapacidad de realizar movimientos alternantes rápidos (pronar-supinar)',
          '<strong>Temblor intencional:</strong> Aumenta al aproximarse al objetivo (diferente del temblor de reposo parkinsoniano)',
          '<strong>Nistagmo:</strong> Movimientos oculares rítmicos involuntarios, lesiones floculonodulares/vestibulares',
          '<strong>Disartria cerebelosa:</strong> Habla escandida (separación silábica), lenguaje explosivo',
          '<strong>Hipotonía:</strong> Disminución del tono muscular ipsilateral',
          '<strong>Síndrome de Wallenberg (infarto bulbar lateral):</strong> Incluye signos cerebelosos por compromiso de pedúnculo inferior',
          '<strong>Degeneración cerebelosa paraneoplásica:</strong> Anticuerpos anti-Yo en cáncer de ovario, ataxia pancerebelosa',
          '<strong>Ataxia de Friedreich:</strong> Degeneración espinocerebelosa, herencia autosómica recesiva, expansión GAA, cardiomiopatía'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // TÁLAMO Y SISTEMAS SENSORIALES
  // ═══════════════════════════════════════════════════════════
  {
    id: 'talamo',
    nombre: 'Tálamo',
    subtitulo: 'Estación de relevo sensorial y motor',
    icono: '🔄',
    categorias: ['encefalo', 'vias-ascendentes'],
    secciones: [
      {
        titulo: '📍 Anatomía y Organización',
        items: [
          '<strong>Ubicación:</strong> Diencéfalo, forma las paredes laterales del tercer ventrículo',
          '<strong>Lámina medular interna:</strong> Sustancia blanca en forma de Y que divide núcleos talámicos',
          '<strong>Grupos nucleares:</strong> Anterior, medial, lateral, posterior, intralaminares, reticulares',
          '<strong>Adhesión intertalámica:</strong> Puente de sustancia gris que conecta ambos tálamos (70% de personas)',
          '<strong>Irrigación:</strong> Arterias talamogeniculadas (ramas de A. cerebral posterior), arterias tuberotalámicas (A. comunicante posterior)'
        ]
      },
      {
        titulo: '🎯 Núcleos Talámicos Principales',
        tipo: 'tabla',
        datos: [
          { label: 'VPL (Ventral posterolateral)', value: 'Somestesia de cuerpo (lemnisco medial, espinotalámico) → S1 parietal' },
          { label: 'VPM (Ventral posteromedial)', value: 'Somestesia de cara (lemnisco trigeminal) → S1 parietal' },
          { label: 'VL (Ventrolateral)', value: 'Motor - de cerebelo y globo pálido → corteza motora (M1)' },
          { label: 'VA (Ventral anterior)', value: 'Motor - de globo pálido → corteza premotora' },
          { label: 'MGN (Medial geniculate)', value: 'Auditivo - de colículo inferior → corteza auditiva primaria (A1)' },
          { label: 'LGN (Lateral geniculate)', value: 'Visual - de retina → corteza visual primaria (V1) calcarina' },
          { label: 'Anterior', value: 'Sistema límbico - de cuerpos mamilares → cingulado (circuito de Papez)' },
          { label: 'DM (Dorsomedial)', value: 'Prefrontal - integración cognitiva y emocional → corteza prefrontal' },
          { label: 'Pulvinar', value: 'Asociativo - mayor núcleo, integración visual y atencional' },
          { label: 'Intralaminares (CM/Pf)', value: 'Activación cortical difusa, estado de alerta, dolor' },
          { label: 'Reticular', value: 'No proyecta a corteza, modula actividad de otros núcleos talámicos' }
        ]
      },
      {
        titulo: '🔄 Funciones Generales',
        items: [
          '<strong>Relevo sensorial:</strong> TODA la información sensorial (excepto olfato) pasa por tálamo antes de llegar a corteza',
          '<strong>Procesamiento sensorial:</strong> No es solo relevo pasivo, modifica y filtra información',
          '<strong>Integración motora:</strong> Recibe información de ganglios basales y cerebelo, modula actividad cortical motora',
          '<strong>Regulación de conciencia:</strong> Núcleos intralaminares y reticulares participan en alerta y sueño',
          '<strong>Memoria y emoción:</strong> Núcleo anterior (circuito de Papez), núcleo dorsomedial (conexiones límbicas)',
          '<strong>Modulación atencional:</strong> Pulvinar participa en atención visual espacial'
        ]
      },
      {
        titulo: '⚕️ Síndromes Talámicos',
        tipo: 'clinica',
        items: [
          '<strong>SÍNDROME TALÁMICO DE DEJERINE-ROUSSY:</strong> Infarto de rama talamogeniculada (VPL/VPM)',
          '<strong>Síntomas agudos:</strong> Hemianestesia contralateral (pérdida de todas las modalidades sensoriales)',
          '<strong>Dolor talámico (fase crónica):</strong> Dolor neuropático intenso, quemante, exacerbado por estímulos (alodinia)',
          '<strong>Asterognosia:</strong> Incapacidad de reconocer objetos por tacto',
          '<strong>Hemiataxia:</strong> Ataxia contralateral por desaferenciación sensorial',
          '<strong>Movimientos coreoatetósicos:</strong> Mano talámica, movimientos involuntarios',
          '<strong>Infarto de arteria basilar superior:</strong> Compromiso bilateral de tálamos, somnolencia, alteración de conciencia',
          '<strong>Afasia talámica:</strong> Lesión de núcleo DM izquierdo, afasia fluente con parafasias',
          '<strong>Síndrome amnésico talámico:</strong> Lesión bilateral de núcleos anteriores/DM, similar a Korsakoff',
          '<strong>Síndrome de Korsakoff:</strong> Deficiencia tiamina (B1), lesión de cuerpos mamilares y núcleo anterior talámico',
          '<strong>Hemianopsia homónima:</strong> Lesión de cuerpo geniculado lateral, déficit campo visual contralateral',
          '<strong>Heminegligencia:</strong> Lesión de pulvinar, especialmente derecho, inatención espacial contralateral'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // TRONCO ENCEFÁLICO
  // ═══════════════════════════════════════════════════════════
  {
    id: 'formacion-reticular',
    nombre: 'Formación Reticular',
    subtitulo: 'Sistema de activación y modulación',
    icono: '🌐',
    categorias: ['encefalo'],
    secciones: [
      {
        titulo: '📍 Anatomía y Localización',
        items: [
          '<strong>Extensión:</strong> Desde médula espinal superior hasta diencéfalo (tálamo, hipotálamo)',
          '<strong>Ubicación:</strong> Núcleo central (tegmento) del tronco encefálico',
          '<strong>Estructura:</strong> Red difusa de núcleos y tractos interconectados (no columnar)',
          '<strong>Regiones:</strong> Bulbar, pontina, mesencefálica',
          '<strong>Grupos nucleares:</strong> Rafe (línea media), central (paramediano), lateral'
        ]
      },
      {
        titulo: '🏗️ Núcleos Principales y Neurotransmisores',
        items: [
          '<strong>Núcleos del rafe (línea media):</strong> Neuronas serotoninérgicas (5-HT)',
          '<strong>Rafe dorsal:</strong> Proyecciones ascendentes a corteza, tálamo, sistema límbico',
          '<strong>Función serotonina:</strong> Regulación del humor, sueño, percepción del dolor, apetito',
          '<strong>Locus coeruleus (pontino):</strong> Neuronas noradrenérgicas (NE), único núcleo noradrenérgico mayor',
          '<strong>Función noradrenalina:</strong> Alerta, atención, respuesta al estrés, ciclo sueño-vigilia',
          '<strong>Núcleos colinérgicos (PPT/LDT):</strong> Pedunculopontino (PPT) y laterodorsal tegmental (LDT)',
          '<strong>Función acetilcolina:</strong> Activación cortical durante vigilia y sueño REM',
          '<strong>Área tegmental ventral (VTA):</strong> Neuronas dopaminérgicas, sistema de recompensa'
        ]
      },
      {
        titulo: '⚡ Sistemas Funcionales',
        items: [
          '<strong>SISTEMA ACTIVADOR RETICULAR ASCENDENTE (ARAS):</strong> Mantiene vigilia y conciencia',
          '<strong>Componentes ARAS:</strong> Locus coeruleus, núcleos del rafe, núcleos colinérgicos, núcleos tuberomamilares (histamina)',
          '<strong>Vías ARAS:</strong> Vía dorsal (a través de tálamo) y vía ventral (bypass del tálamo → hipotálamo lateral → corteza)',
          '<strong>SISTEMA RETICULAR DESCENDENTE:</strong> Modula tono muscular y reflejos espinales',
          '<strong>Tracto reticuloespinal medial:</strong> Facilita extensores (postura antigravitacional)',
          '<strong>Tracto reticuloespinal lateral:</strong> Inhibe extensores, facilita flexores',
          '<strong>CENTROS AUTONÓMICOS:</strong> Control cardiovascular, respiratorio, gastrointestinal',
          '<strong>Centro respiratorio:</strong> Grupos respiratorios dorsal (bulbar) y ventral (pontino)',
          '<strong>Centro vasomotor:</strong> Regulación de presión arterial',
          '<strong>MODULACIÓN DEL DOLOR:</strong> Sustancia gris periacueductal (PAG) + núcleos del rafe → analgesia descendente'
        ]
      },
      {
        titulo: '🎯 Funciones Integradas',
        tipo: 'tabla',
        datos: [
          { label: 'Conciencia y alerta', value: 'ARAS mantiene estado de vigilia, proyecciones talámicas y corticales' },
          { label: 'Ciclo sueño-vigilia', value: 'Integración de núcleos monoaminérgicos y colinérgicos' },
          { label: 'Control postural', value: 'Tractos reticuloespinales modulan tono extensor/flexor' },
          { label: 'Funciones autonómicas', value: 'Centros cardiorrespiratorios, control visceral' },
          { label: 'Modulación del dolor', value: 'Analgesia descendente desde PAG y rafe' },
          { label: 'Reflejos protectores', value: 'Tos, vómito, estornudo, deglución' }
        ]
      },
      {
        titulo: '⚕️ Correlaciones Clínicas',
        tipo: 'clinica',
        items: [
          '<strong>LESIONES DEL ARAS - Estados de conciencia alterada:</strong>',
          '<strong>Coma:</strong> Lesión bilateral extensa de ARAS (tronco superior) o corteza bilateral',
          '<strong>Estado vegetativo:</strong> ARAS intacto (ciclo sueño-vigilia), corteza dañada, sin conciencia de entorno',
          '<strong>Estado de mínima conciencia:</strong> Respuestas inconsistentes pero reproducibles',
          '<strong>Síndrome de enclaustramiento (locked-in):</strong> Lesión ventral del puente, ARAS intacto, paciente consciente pero paralizado',
          '<strong>Muerte cerebral:</strong> Pérdida irreversible de función del tronco encefálico, ausencia de reflejos troncoencefálicos',
          '<strong>Herniación transtentorial:</strong> Compresión del mesencéfalo, deterioro rostrocaudal de conciencia',
          '<strong>Síndrome de Parinaud (mesencéfalo dorsal):</strong> Parálisis de mirada vertical, hidrocefalia, compresión de tectum',
          '<strong>Narcolepsia:</strong> Disfunción de neuronas de hipocretina (orexina) en hipotálamo lateral, somnolencia diurna, cataplexia',
          '<strong>Síndrome de apnea obstructiva del sueño:</strong> Hipoxia intermitente afecta centros respiratorios',
          '<strong>Farmacología:</strong> Benzodiacepinas potencian GABA → sedación, barbitúricos deprimen ARAS, anfetaminas potencian catecolaminas → alerta',
          '<strong>Síndrome serotoninérgico:</strong> Exceso de serotonina (ISRS, IMAO), agitación, hipertermia, clonus, emergencia médica'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÉDULA ESPINAL
  // ═══════════════════════════════════════════════════════════
  {
    id: 'medula-espinal-anatomia',
    nombre: 'Médula Espinal - Anatomía General',
    subtitulo: 'Estructura segmentaria y sustancia gris/blanca',
    icono: '🦴',
    categorias: ['medula-espinal'],
    secciones: [
      {
        titulo: '📍 Anatomía Macroscópica',
        items: [
          '<strong>Extensión:</strong> Desde agujero magno (bulbo raquídeo) hasta L1-L2 en adultos (L3 en neonatos)',
          '<strong>Cono medular:</strong> Terminación cónica de médula espinal a nivel L1-L2',
          '<strong>Filum terminale:</strong> Prolongación de piamadre desde cono hasta cóccix',
          '<strong>Cauda equina:</strong> Raíces nerviosas lumbares y sacras que descienden en canal vertebral',
          '<strong>Engrosamientos:</strong> Cervical (C5-T1, plexo braquial) y lumbar (L1-S2, plexo lumbosacro)',
          '<strong>Segmentos medulares:</strong> 31 pares - 8 cervicales, 12 torácicos, 5 lumbares, 5 sacros, 1 coccígeo',
          '<strong>Surcos:</strong> Medio anterior (ventral), medio posterior (dorsal), posterolateral (entrada raíz dorsal)'
        ]
      },
      {
        titulo: '🏗️ Sustancia Gris - Organización Laminar de Rexed',
        items: [
          '<strong>Asta anterior (ventral):</strong> Láminas VII-IX, neuronas motoras (motoneuronas alfa y gamma)',
          '<strong>Lámina IX:</strong> Motoneuronas alfa (inervación muscular), organización somatotópica (flexores dorsal, extensores ventral)',
          '<strong>Asta posterior (dorsal):</strong> Láminas I-VI, procesamiento sensorial',
          '<strong>Lámina I (zona marginal):</strong> Dolor y temperatura, tracto espinotalámico',
          '<strong>Láminas II-III (sustancia gelatinosa):</strong> Modulación del dolor, interneuronas',
          '<strong>Láminas IV-VI:</strong> Tacto, presión, propiocepción',
          '<strong>Asta lateral:</strong> Lámina VII, núcleo intermedio lateral (T1-L2), neuronas preganglionares simpáticas',
          '<strong>Núcleo de Clarke:</strong> C8-L2, origen del tracto espinocerebeloso dorsal',
          '<strong>Comisura gris:</strong> Conecta ambos lados, contiene canal central'
        ]
      },
      {
        titulo: '⚕️ Síndromes Medulares',
        tipo: 'clinica',
        items: [
          '<strong>SÍNDROME DE SECCIÓN COMPLETA:</strong> Paraplejia/cuadriplejia, anestesia bajo nivel lesión',
          '<strong>SÍNDROME DE HEMISECCIÓN (Brown-Séquard):</strong> Ipsilateral: paresia + pérdida tacto fino; Contralateral: pérdida dolor/temperatura',
          '<strong>SÍNDROME CENTROMEDULAR:</strong> Paresia brazos > piernas, pérdida dolor/temperatura en "capa"',
          '<strong>SIRINGOMIELIA:</strong> Cavidad quística central, pérdida dolor/temperatura bilateral "en capa"',
          '<strong>ESCLEROSIS LATERAL AMIOTRÓFICA (ELA):</strong> Degeneración neurona motora superior e inferior, sin déficit sensitivo'
        ]
      }
    ]
  },

  {
    id: 'vias-sensoriales',
    nombre: 'Vías Sensoriales Ascendentes',
    subtitulo: 'Lemnisco medial y tracto espinotalámico',
    icono: '⬆️',
    categorias: ['vias-ascendentes'],
    secciones: [
      {
        titulo: '📍 VÍA DEL LEMNISCO MEDIAL (Cordones Posteriores)',
        items: [
          '<strong>Función:</strong> Tacto fino discriminativo, vibración, propiocepción consciente',
          '<strong>1ª neurona:</strong> Ganglio de raíz dorsal → asciende IPSILATERAL por cordón posterior',
          '<strong>Fascículo grácil:</strong> Miembros inferiores (medial)',
          '<strong>Fascículo cuneiforme:</strong> Miembros superiores (lateral)',
          '<strong>2ª neurona:</strong> Núcleo grácil/cuneiforme (bulbo)',
          '<strong>DECUSACIÓN:</strong> Decusación lemniscal en bulbo',
          '<strong>3ª neurona:</strong> Núcleo VPL del tálamo → Corteza S1'
        ]
      },
      {
        titulo: '📍 VÍA ESPINOTALÁMICA',
        items: [
          '<strong>Función:</strong> Dolor, temperatura, tacto burdo',
          '<strong>1ª neurona:</strong> Ganglio raíz dorsal → sinapsis asta posterior',
          '<strong>DECUSACIÓN:</strong> Comisura blanca anterior, 1-2 segmentos SUPERIOR',
          '<strong>Tracto espinotalámico lateral:</strong> Dolor/temperatura CONTRALATERAL',
          '<strong>3ª neurona:</strong> VPL talámico → S1'
        ]
      },
      {
        titulo: '⚕️ Síndromes Clínicos',
        tipo: 'clinica',
        items: [
          '<strong>Siringomielia:</strong> Pérdida BILATERAL dolor/temperatura "en capa", preserva tacto fino',
          '<strong>Síndrome de Brown-Séquard:</strong> Ipsilateral tacto fino/propiocepción, contralateral dolor/temperatura',
          '<strong>Tabes dorsalis:</strong> Degeneración cordones posteriores, ataxia sensorial, Romberg+',
          '<strong>Síndrome de Wallenberg:</strong> Pérdida dolor/temperatura IPSILATERAL facial + CONTRALATERAL corporal'
        ]
      }
    ]
  },

  {
    id: 'nervio-facial',
    nombre: 'Nervio Facial (VII)',
    subtitulo: 'Motor facial, gusto, parasimpático lacrimal/salival',
    icono: '😊',
    categorias: ['nervios-craneales'],
    secciones: [
      {
        titulo: '📍 Componentes y Trayecto',
        items: [
          '<strong>Componente motor:</strong> Músculos de expresión facial',
          '<strong>Componente sensitivo:</strong> Gusto 2/3 anteriores lengua (cuerda del tímpano)',
          '<strong>Componente parasimpático:</strong> Glándulas lagrimal, submandibular, sublingual',
          '<strong>Canal facial:</strong> Recorrido por peñasco temporal',
          '<strong>Ganglio geniculado:</strong> Primer giro, neuronas del gusto',
          '<strong>Nervio petroso mayor:</strong> Glándula lagrimal',
          '<strong>Cuerda del tímpano:</strong> Gusto + parasimpático salival',
          '<strong>Salida:</strong> Agujero estilomastoideo',
          '<strong>Ramas terminales:</strong> Temporal, Cigomática, Bucal, Mandibular, Cervical'
        ]
      },
      {
        titulo: '⚕️ Parálisis Facial',
        tipo: 'clinica',
        items: [
          '<strong>PARÁLISIS DE BELL:</strong> Neuropatía idiopática, parálisis facial TOTAL ipsilateral, inicio agudo',
          '<strong>Tratamiento Bell:</strong> Corticoides dentro 72h, protección ocular, 70% recuperación',
          '<strong>PARÁLISIS CENTRAL:</strong> Lesión cortical, debilidad facial INFERIOR contralateral, PRESERVA frente',
          '<strong>Diferenciación:</strong> Central preserva cierre ocular y frente, periférica afecta TODO',
          '<strong>SÍNDROME DE RAMSAY HUNT:</strong> Herpes zóster ganglio geniculado, vesículas auriculares + parálisis',
          '<strong>SCHWANNOMA DEL ACÚSTICO:</strong> Tumor ángulo pontocerebeloso, comprime VII y VIII'
        ]
      }
    ]
  },

  {
    id: 'nervio-vago',
    nombre: 'Nervio Vago (X)',
    subtitulo: 'Principal nervio parasimpático',
    icono: '🫁',
    categorias: ['nervios-craneales', 'sistema-autonomo'],
    secciones: [
      {
        titulo: '📍 Componentes y Ramas',
        items: [
          '<strong>Parasimpático:</strong> Vísceras torácicas/abdominales hasta flexura esplénica',
          '<strong>Motor branquial:</strong> Músculos faríngeos, laríngeos, velo del paladar',
          '<strong>NERVIO LARÍNGEO SUPERIOR:</strong> Rama interna (sensitiva laringe) + externa (cricotiroideo)',
          '<strong>LARÍNGEO RECURRENTE DERECHO:</strong> Rodea subclavia derecha',
          '<strong>LARÍNGEO RECURRENTE IZQUIERDO:</strong> Rodea arco aórtico y ligamento arterioso',
          '<strong>Función laríngeo recurrente:</strong> Todos los músculos intrínsecos laríngeos excepto cricotiroideo'
        ]
      },
      {
        titulo: '⚕️ Lesiones del Vago',
        tipo: 'clinica',
        items: [
          '<strong>LESIÓN UNILATERAL:</strong> Úvula desviada al lado SANO, disfonía, disfagia leve',
          '<strong>LESIÓN LARÍNGEO RECURRENTE:</strong> Cuerda vocal paralizada, voz ronca',
          '<strong>Bilateral laríngeo recurrente:</strong> Estridor, disnea severa, EMERGENCIA',
          '<strong>Laríngeo izquierdo:</strong> Vulnerable en cirugía arco aórtico',
          '<strong>Laríngeo derecho:</strong> Vulnerable en cirugía tiroides',
          '<strong>SÍNDROME DE WALLENBERG:</strong> Infarto bulbar lateral, disfagia, disfonía, ataxia, Horner'
        ]
      }
    ]
  },

  {
    id: 'sistema-nervioso-autonomo',
    nombre: 'Sistema Nervioso Autónomo',
    subtitulo: 'Simpático y parasimpático',
    icono: '🔀',
    categorias: ['sistema-autonomo'],
    secciones: [
      {
        titulo: '📍 División Simpática vs Parasimpática',
        items: [
          '<strong>SIMPÁTICO - Origen:</strong> Toracolumbar (T1-L2)',
          '<strong>SIMPÁTICO - Ganglio:</strong> Paravertebral, lejos del órgano',
          '<strong>SIMPÁTICO - Neurotransmisor:</strong> Noradrenalina (excepto sudor: ACh)',
          '<strong>PARASIMPÁTICO - Origen:</strong> Craneosacral (III, VII, IX, X + S2-S4)',
          '<strong>PARASIMPÁTICO - Ganglio:</strong> Cerca o dentro del órgano',
          '<strong>PARASIMPÁTICO - Neurotransmisor:</strong> Acetilcolina'
        ]
      },
      {
        titulo: '🎯 Efectos en Órganos',
        tipo: 'tabla',
        datos: [
          { label: 'Pupila - Simpático', value: 'Midriasis (α1)' },
          { label: 'Pupila - Parasimpático', value: 'Miosis (M3)' },
          { label: 'Corazón - Simpático', value: '↑ FC y contractilidad (β1)' },
          { label: 'Corazón - Parasimpático', value: '↓ FC y contractilidad (M2)' },
          { label: 'Bronquios - Simpático', value: 'Broncodilatación (β2)' },
          { label: 'Bronquios - Parasimpático', value: 'Broncoconstricción (M3)' },
          { label: 'Vejiga - Simpático', value: 'Retención (β3 detrusor, α1 esfínter)' },
          { label: 'Vejiga - Parasimpático', value: 'Micción (M3 detrusor)' }
        ]
      },
      {
        titulo: '⚕️ Patologías Autonómicas',
        tipo: 'clinica',
        items: [
          '<strong>SÍNDROME DE HORNER:</strong> Lesión simpática → Ptosis + Miosis + Anhidrosis facial',
          '<strong>Causas Horner:</strong> Wallenberg (central), Pancoast (preganglionar), disección carotídea (postganglionar)',
          '<strong>DISAUTONOMÍA DIABÉTICA:</strong> Hipotensión ortostática, gastroparesia, vejiga neurogénica',
          '<strong>FEOCROMOCITOMA:</strong> Tumor médula suprarrenal, HTA paroxística, cefalea, sudoración',
          '<strong>CRISIS COLINÉRGICA:</strong> Intoxicación organofosforados, SLUDGE + miosis + bradicardia'
        ]
      }
    ]
  }
];
