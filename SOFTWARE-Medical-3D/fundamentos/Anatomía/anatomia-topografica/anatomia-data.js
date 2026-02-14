// ═══════════════════════════════════════════════════════════
// ANATOMIA DATA - Información completa de regiones topográficas
// Basado en: Gray's Anatomy (2021), Moore (2023), Netter (2023)
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA = [
  // ═══════════════════════════════════════════════════════════
  // CABEZA Y CUELLO
  // ═══════════════════════════════════════════════════════════
  {
    id: 'triangulo-carotideo',
    nombre: 'Triángulo Carotídeo',
    subtitulo: 'Región cervical lateral anterior',
    icono: '🔺',
    categorias: ['cabeza-cuello'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Superior:</strong> Vientre posterior del músculo digástrico',
          '<strong>Anterior:</strong> Vientre superior del músculo omohioideo',
          '<strong>Posterior:</strong> Borde anterior del músculo esternocleidomastoideo',
          '<strong>Piso:</strong> Músculos tirohioideo, hiogloso, constrictores medio e inferior de la faringe',
          '<strong>Techo:</strong> Fascia cervical superficial y músculo platisma'
        ]
      },
      {
        titulo: '🩸 Estructuras Vasculares',
        items: [
          '<strong>Arteria carótida común:</strong> Asciende verticalmente, bifurcación a nivel C3-C4 (borde superior del cartílago tiroides)',
          '<strong>Arteria carótida externa:</strong> Rama anterior en la bifurcación, irriga cara y cuero cabelludo',
          '<strong>Arteria carótida interna:</strong> Rama posterior, no da ramas cervicales, entra al cráneo por canal carotídeo',
          '<strong>Seno carotídeo:</strong> Barorreceptor en el bulbo de la carótida interna, inervado por nervio del seno carotídeo (IX)',
          '<strong>Cuerpo carotídeo:</strong> Quimiorreceptor en la bifurcación, detecta O₂, CO₂, pH',
          '<strong>Vena yugular interna:</strong> Lateral a la arteria carótida común, drenaje venoso craneal',
          '<strong>Arteria tiroidea superior:</strong> Primera rama de carótida externa, irriga glándula tiroides'
        ]
      },
      {
        titulo: '⚡ Estructuras Nerviosas',
        items: [
          '<strong>Nervio vago (X):</strong> Posterior en la vaina carotídea, entre arteria y vena yugular',
          '<strong>Nervio hipogloso (XII):</strong> Cruza superficialmente por debajo del digástrico, inerva músculos de la lengua',
          '<strong>Asa cervical:</strong> Formada por C1-C3, inerva músculos infrahioideos (omohioideo, esternohioideo, esternotiroideo)',
          '<strong>Nervio laríngeo superior:</strong> Rama del vago, rama interna sensitiva, rama externa motora (cricotiroideo)',
          '<strong>Ramas cervicales del plexo cervical:</strong> C2-C4, inervan piel del cuello',
          '<strong>Nervio del seno carotídeo:</strong> Rama del glosofaríngeo (IX), transmite información barorreflex'
        ]
      },
      {
        titulo: '🏗️ Músculos y Fascias',
        items: [
          '<strong>Vaina carotídea:</strong> Condensación de fascia cervical profunda, contiene carótida común, yugular interna, vago',
          '<strong>Músculo esternocleidomastoideo:</strong> Límite posterior, inervado por nervio accesorio (XI)',
          '<strong>Músculo digástrico (vientre posterior):</strong> Inervado por nervio facial (VII)',
          '<strong>Músculo omohioideo (vientre superior):</strong> Inervado por asa cervical (C1-C3)',
          '<strong>Fascia pretraqueal:</strong> Rodea tráquea, tiroides y esófago'
        ]
      },
      {
        titulo: '🎯 Puntos de Referencia Quirúrgicos',
        tipo: 'tabla',
        datos: [
          { label: 'Bifurcación carotídea', value: 'Nivel C3-C4 (borde superior cartílago tiroides), palpable lateral a este' },
          { label: 'Tubérculo carotídeo (C6)', value: 'Proceso transverso de C6, punto de compresión de arteria carótida común' },
          { label: 'Línea medio-clavicular', value: 'Referencia para acceso a vena yugular interna' },
          { label: 'Cartílago cricoides', value: 'Nivel C6, punto de referencia para cricotiroidotomía' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Abordajes Quirúrgicos:',
        items: [
          '<strong>Endarterectomía carotídea:</strong> Incisión a lo largo del borde anterior del ECM, exposición de bifurcación carotídea para remover placa aterosclerótica',
          '<strong>Ligadura de carótida externa:</strong> En hemorragias faciales masivas, preservando carótida interna',
          '<strong>Masaje del seno carotídeo:</strong> Maniobra vagal para taquicardia supraventricular',
          '<strong>Traqueostomía:</strong> Acceso infraistmico o supraistmico, cuidado con vena yugular anterior',
          '<strong>Cateterización de yugular interna:</strong> Vía central, abordaje anterior o posterior al ECM',
          '<strong>Biopsia de cuerpo carotídeo:</strong> En paragangliomas (tumores quimiorreceptores)',
          '<strong>Síndrome del seno carotídeo:</strong> Hipersensibilidad puede causar síncope al girar el cuello o afeitarse'
        ]
      }
    ]
  },

  {
    id: 'triangulo-posterior-cuello',
    nombre: 'Triángulo Posterior del Cuello',
    subtitulo: 'Región cervical lateral posterior',
    icono: '◣',
    categorias: ['cabeza-cuello'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Anterior:</strong> Borde posterior del músculo esternocleidomastoideo',
          '<strong>Posterior:</strong> Borde anterior del músculo trapecio',
          '<strong>Inferior:</strong> Tercio medio de la clavícula',
          '<strong>Piso:</strong> Músculos prevertebrales (escalenos anterior, medio y posterior, elevador de la escápula, esplenio)',
          '<strong>Techo:</strong> Fascia cervical superficial que envuelve al platisma'
        ]
      },
      {
        titulo: '🩸 Estructuras Vasculares',
        items: [
          '<strong>Arteria subclavia:</strong> Tercera porción emerge entre escaleno anterior y medio',
          '<strong>Arteria cervical transversa:</strong> Rama del tronco tirocervical, cruza el triángulo',
          '<strong>Arteria supraescapular:</strong> Pasa superior al ligamento escapular transverso',
          '<strong>Vena yugular externa:</strong> Cruza superficialmente sobre el ECM, drenar en vena subclavia',
          '<strong>Vena subclavia:</strong> Anterior al escaleno anterior, continuación de vena axilar'
        ]
      },
      {
        titulo: '⚡ Estructuras Nerviosas',
        items: [
          '<strong>Nervio accesorio espinal (XI):</strong> Atraviesa el triángulo diagonalmente, inerva ECM y trapecio',
          '<strong>Plexo braquial:</strong> Troncos superior, medio e inferior emergen entre escalenos anterior y medio',
          '<strong>Raíces C5-C8, T1:</strong> Forman el plexo braquial entre los músculos escalenos',
          '<strong>Nervio frénico:</strong> Desciende sobre escaleno anterior, C3-C5 (C3, C4, C5 keeps the diaphragm alive)',
          '<strong>Ramas cutáneas cervicales:</strong> Emergen del punto nervioso (punto de Erb) en borde posterior ECM'
        ]
      },
      {
        titulo: '🏗️ Músculos y Compartimentos',
        items: [
          '<strong>Músculo escaleno anterior:</strong> Inserción: tubérculos anteriores C3-C6 → primera costilla',
          '<strong>Músculo escaleno medio:</strong> Inserción: procesos transversos C2-C7 → primera costilla',
          '<strong>Músculo escaleno posterior:</strong> Inserción: procesos transversos C5-C7 → segunda costilla',
          '<strong>Músculo omohioideo (vientre inferior):</strong> Divide el triángulo en superior (occipital) e inferior (supraclavicular)',
          '<strong>Espacio interescalénico:</strong> Entre escaleno anterior y medio, contiene plexo braquial y arteria subclavia'
        ]
      },
      {
        titulo: '🎯 Puntos de Referencia Quirúrgicos',
        tipo: 'tabla',
        datos: [
          { label: 'Punto de Erb', value: 'Borde posterior ECM a nivel C6, emerge plexo cervical superficial' },
          { label: 'Espacio interescalénico', value: 'Bloqueo anestésico de plexo braquial, entre escalenos anterior y medio' },
          { label: 'Triángulo supraclavicular', value: 'Inferior al omohioideo, contiene subclavian vessels y plexo braquial' },
          { label: 'Primera costilla', value: 'Palpable en fosa supraclavicular, referencia para arteria subclavia' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Abordajes y Patologías:',
        items: [
          '<strong>Bloqueo del plexo braquial:</strong> Abordaje interescalénico para cirugía de hombro/brazo',
          '<strong>Biopsia de ganglio linfático:</strong> Acceso a cadena cervical posterior',
          '<strong>Síndrome del opérculo torácico:</strong> Compresión de plexo braquial/arteria subclavia entre escalenos o por costilla cervical',
          '<strong>Lesión del nervio accesorio:</strong> Iatrogénica en biopsias, causa debilidad del trapecio (hombro caído)',
          '<strong>Cateterización de vena subclavia:</strong> Abordaje infraclavicular, riesgo de neumotórax',
          '<strong>Aneurisma de arteria subclavia:</strong> Masa pulsátil en fosa supraclavicular',
          '<strong>Linfadenopatía de Virchow:</strong> Ganglio supraclavicular izquierdo en malignidad abdominal (ganglio de Troisier)'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // TÓRAX
  // ═══════════════════════════════════════════════════════════
  {
    id: 'mediastino-superior',
    nombre: 'Mediastino Superior',
    subtitulo: 'Compartimento torácico superior',
    icono: '🫁',
    categorias: ['torax'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Superior:</strong> Abertura torácica superior (plano de T1)',
          '<strong>Inferior:</strong> Plano horizontal que pasa por ángulo esternal (unión T4-T5 con manubrio)',
          '<strong>Anterior:</strong> Manubrio esternal',
          '<strong>Posterior:</strong> Cuerpos vertebrales T1-T4',
          '<strong>Lateral:</strong> Pleuras mediastínicas derecha e izquierda'
        ]
      },
      {
        titulo: '🩸 Grandes Vasos',
        items: [
          '<strong>Arco aórtico:</strong> Se origina posterior al ángulo esternal (T4), cruza hacia la izquierda',
          '<strong>Tronco braquiocefálico:</strong> Primera rama del arco, se bifurca en carótida común derecha y subclavia derecha',
          '<strong>Arteria carótida común izquierda:</strong> Segunda rama del arco aórtico',
          '<strong>Arteria subclavia izquierda:</strong> Tercera rama del arco aórtico',
          '<strong>Vena cava superior:</strong> Formada por unión de venas braquiocefálicas derecha e izquierda a nivel 1ª costilla',
          '<strong>Vena ácigos:</strong> Desemboca en VCS posterior a nivel T4',
          '<strong>Vena braquiocefálica izquierda:</strong> Cruza anteriormente de izquierda a derecha, más larga que la derecha'
        ]
      },
      {
        titulo: '⚡ Estructuras Nerviosas',
        items: [
          '<strong>Nervio vago derecho:</strong> Desciende lateral a tráquea, da origen al nervio laríngeo recurrente derecho',
          '<strong>Nervio vago izquierdo:</strong> Desciende entre carótida común y arteria subclavia izquierdas',
          '<strong>Nervio laríngeo recurrente izquierdo:</strong> Rodea el arco aórtico por debajo del ligamento arterioso, asciende en surco traqueoesofágico',
          '<strong>Nervio frénico derecho:</strong> Desciende lateral a VCS, anterior a raíz pulmonar derecha',
          '<strong>Nervio frénico izquierdo:</strong> Desciende lateral al arco aórtico, anterior a raíz pulmonar izquierda',
          '<strong>Tronco simpático:</strong> Cadena ganglionar paravertebral'
        ]
      },
      {
        titulo: '🫁 Vías Respiratorias y Digestivas',
        items: [
          '<strong>Tráquea:</strong> Desciende en línea media desde C6 hasta bifurcación en carina (T4-T5)',
          '<strong>Esófago:</strong> Posterior a tráquea, desciende ligeramente hacia la izquierda',
          '<strong>Timo:</strong> Anterior a grandes vasos, involuciona con la edad (tejido adiposo en adultos)',
          '<strong>Ligamento arterioso:</strong> Remanente del ductus arteriosus fetal, conecta arco aórtico con arteria pulmonar'
        ]
      },
      {
        titulo: '🎯 Puntos de Referencia Quirúrgicos',
        tipo: 'tabla',
        datos: [
          { label: 'Ángulo esternal (Louis)', value: 'Nivel T4-T5, marca bifurcación traqueal, límite inferior del mediastino superior' },
          { label: 'Carina traqueal', value: 'Bifurcación de tráquea en bronquios principales a nivel T4-T5' },
          { label: 'Arco aórtico', value: 'Nivel T4, cruza anteriormente al esófago y tráquea' },
          { label: 'Ligamento arterioso', value: 'Conecta aorta y arteria pulmonar, rodea nervio laríngeo recurrente izquierdo' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Patologías y Procedimientos:',
        items: [
          '<strong>Mediastinitis:</strong> Infección del mediastino, emergencia quirúrgica, alta mortalidad',
          '<strong>Timectomía:</strong> En miastenia gravis o timoma, abordaje por esternotomía media',
          '<strong>Aneurisma del arco aórtico:</strong> Puede comprimir tráquea (disnea), esófago (disfagia), nervio laríngeo recurrente (disfonía)',
          '<strong>Síndrome de vena cava superior:</strong> Obstrucción por tumor/trombosis, edema facial y de cuello, circulación colateral',
          '<strong>Lesión de nervio laríngeo recurrente:</strong> En cirugía tiroidea o de arco aórtico, causa parálisis de cuerda vocal (disfonía)',
          '<strong>Ductus arteriosus persistente:</strong> Cortocircuito izquierda-derecha, soplo continuo en "maquinaria"',
          '<strong>Coartación aórtica:</strong> Estrechamiento del arco aórtico, típicamente postductal, HTA en miembros superiores',
          '<strong>Signo de Pemberton:</strong> Elevación de brazos causa congestión facial en bocio retroesternal'
        ]
      }
    ]
  },

  {
    id: 'espacio-intercostal',
    nombre: 'Espacio Intercostal',
    subtitulo: 'Región entre costillas adyacentes',
    icono: '〰️',
    categorias: ['torax'],
    secciones: [
      {
        titulo: '📍 Límites y Estructura',
        items: [
          '<strong>Superior:</strong> Borde inferior de la costilla superior',
          '<strong>Inferior:</strong> Borde superior de la costilla inferior',
          '<strong>Anterior:</strong> Esternón y cartílagos costales',
          '<strong>Posterior:</strong> Columna vertebral',
          '<strong>Membrana intercostal externa:</strong> Fibras oblicuas hacia abajo y adelante',
          '<strong>Membrana intercostal interna:</strong> Fibras oblicuas hacia abajo y atrás'
        ]
      },
      {
        titulo: '🏗️ Músculos Intercostales (3 capas)',
        items: [
          '<strong>Intercostal externo:</strong> Más superficial, fibras oblicuas hacia abajo y adelante, activo en inspiración',
          '<strong>Intercostal interno:</strong> Capa media, fibras oblicuas hacia abajo y atrás, activo en espiración forzada',
          '<strong>Intercostal íntimo:</strong> Capa más profunda, separada de la interna por vasos y nervio intercostal',
          '<strong>Inervación:</strong> Nervios intercostales (ramos ventrales de T1-T11)',
          '<strong>Músculo transverso del tórax:</strong> Cara posterior del esternón, deprime costillas (espiración)'
        ]
      },
      {
        titulo: '🩸 Paquete Neurovascular Intercostal',
        items: [
          '<strong>Disposición (de superior a inferior):</strong> Vena intercostal, Arteria intercostal, Nervio intercostal (VAN)',
          '<strong>Ubicación:</strong> En el surco costal (borde inferior de costilla), entre intercostal interno e íntimo',
          '<strong>Arteria intercostal posterior:</strong> Ramas de aorta torácica (espacios 3-11) y arteria intercostal suprema (espacios 1-2)',
          '<strong>Arteria intercostal anterior:</strong> Ramas de arteria torácica interna (mamaria interna)',
          '<strong>Vena intercostal:</strong> Drenan en vena ácigos (derecha), hemiácigos y hemiácigos accesoria (izquierda)',
          '<strong>Nervio intercostal:</strong> Ramo ventral de nervio espinal torácico, inerva músculos intercostales y piel',
          '<strong>Ramo cutáneo lateral:</strong> Emerge en línea axilar media',
          '<strong>Ramo cutáneo anterior:</strong> Emerge paraesternalmente'
        ]
      },
      {
        titulo: '⚡ Inervación',
        items: [
          '<strong>T1:</strong> Contribuye al plexo braquial, inerva piel de axila',
          '<strong>T2-T6:</strong> Inervan pared torácica anterior',
          '<strong>T4:</strong> Dermatoma a nivel del pezón (referencia clínica)',
          '<strong>T7-T11:</strong> Descienden oblicuamente para inervar pared abdominal anterior',
          '<strong>T10:</strong> Dermatoma a nivel del ombligo (referencia clínica)',
          '<strong>T12:</strong> Nervio subcostal, discurre inferior a 12ª costilla'
        ]
      },
      {
        titulo: '🎯 Puntos de Referencia Quirúrgicos',
        tipo: 'tabla',
        datos: [
          { label: 'Surco costal', value: 'Borde inferior de costilla, contiene paquete VAN' },
          { label: 'Línea axilar media', value: 'Emergencia de ramos cutáneos laterales' },
          { label: 'Ángulo de la costilla', value: 'Punto de máxima curvatura posterior, ~5-6 cm lateral a vértebra' },
          { label: '5º espacio intercostal', value: 'Línea medioclavicular, acceso para toracocentesis' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Procedimientos y Patologías:',
        items: [
          '<strong>Toracocentesis:</strong> Punción en borde superior de costilla inferior (evitar paquete VAN), generalmente 5º-6º espacio intercostal en línea axilar media',
          '<strong>Tubo de tórax (pleurostomía):</strong> Inserción en "triángulo de seguridad" (4º-5º espacio, entre borde lateral pectoral mayor, lateral dorsal ancho, línea axilar media, superior al pezón)',
          '<strong>Bloqueo intercostal:</strong> Anestesia regional para cirugía o fracturas costales, inyección en ángulo costal',
          '<strong>Neuralgia intercostal:</strong> Dolor neuropático en distribución de nervio intercostal',
          '<strong>Herpes zoster:</strong> Reactivación de varicela-zóster en ganglio dorsal, distribución dermatomal',
          '<strong>Fractura costal:</strong> Complicación: neumotórax, hemotórax, lesión de paquete neurovascular',
          '<strong>Toracotomía:</strong> Incisión a través de espacio intercostal para acceso quirúrgico, generalmente 4º-5º espacio',
          '<strong>Regla del "2":</strong> Aguja/tubo 2 espacios inferior al ángulo de Louis (ángulo esternal) para toracocentesis estándar'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // ABDOMEN Y PELVIS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'triangulo-hesselbach',
    nombre: 'Triángulo de Hesselbach',
    subtitulo: 'Región inguinal medial - Sitio de hernias directas',
    icono: '▽',
    categorias: ['abdomen-pelvis'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Lateral:</strong> Vasos epigástricos inferiores (borde lateral del músculo recto abdominal)',
          '<strong>Medial:</strong> Borde lateral del músculo recto abdominal',
          '<strong>Inferior:</strong> Ligamento inguinal (ligamento de Poupart)',
          '<strong>Piso:</strong> Fascia transversalis',
          '<strong>Techo:</strong> Aponeurosis del músculo oblicuo externo'
        ]
      },
      {
        titulo: '🏗️ Capas de la Pared Abdominal',
        items: [
          '<strong>Piel y tejido subcutáneo:</strong> Fascia de Camper (superficial) y fascia de Scarpa (profunda)',
          '<strong>Músculo oblicuo externo:</strong> Fibras hacia abajo y medial, aponeurosis forma ligamento inguinal',
          '<strong>Músculo oblicuo interno:</strong> Fibras hacia arriba y medial, contribuye al cordón espermático',
          '<strong>Músculo transverso del abdomen:</strong> Fibras transversales, forma tendón conjunto con oblicuo interno',
          '<strong>Fascia transversalis:</strong> Capa profunda, debilitada en triángulo de Hesselbach',
          '<strong>Grasa preperitoneal:</strong> Entre fascia transversalis y peritoneo parietal',
          '<strong>Peritoneo parietal:</strong> Capa más interna'
        ]
      },
      {
        titulo: '🩸 Estructuras Vasculares',
        items: [
          '<strong>Arteria epigástrica inferior:</strong> Rama de arteria ilíaca externa, asciende medial al anillo inguinal profundo',
          '<strong>Arteria epigástrica superior:</strong> Rama terminal de arteria torácica interna (mamaria interna)',
          '<strong>Vena epigástrica inferior:</strong> Drena en vena ilíaca externa',
          '<strong>Arteria cremastérica:</strong> Rama de epigástrica inferior, irriga cordón espermático/ligamento redondo',
          '<strong>Arteria circunfleja ilíaca profunda:</strong> Rama de ilíaca externa, corre paralela al ligamento inguinal'
        ]
      },
      {
        titulo: '⚡ Estructuras Nerviosas',
        items: [
          '<strong>Nervio ilioinguinal (L1):</strong> Atraviesa canal inguinal, emerge por anillo superficial, inerva piel del escroto/labios mayores y raíz del muslo',
          '<strong>Nervio iliohipogástrico (T12-L1):</strong> Más superior, inerva piel suprapúbica',
          '<strong>Rama genital del nervio genitofemoral (L1-L2):</strong> Inerva músculo cremáster y piel del escroto/labios mayores',
          '<strong>Rama femoral del nervio genitofemoral:</strong> Inerva piel del triángulo femoral'
        ]
      },
      {
        titulo: '🎯 Clasificación de Hernias Inguinales',
        tipo: 'tabla',
        datos: [
          { label: 'Hernia inguinal DIRECTA', value: 'Protrusión MEDIAL a vasos epigástricos inferiores, a través del triángulo de Hesselbach (fascia transversalis débil)' },
          { label: 'Hernia inguinal INDIRECTA', value: 'Protrusión LATERAL a vasos epigástricos inferiores, a través del anillo inguinal profundo, sigue canal inguinal (persistencia de proceso vaginal)' },
          { label: 'Hernia femoral', value: 'Protrusión INFERIOR al ligamento inguinal, a través del canal femoral (medial a vena femoral)' },
          { label: 'Factores de riesgo', value: 'Obesidad, tos crónica, estreñimiento, ascitis, embarazo, levantamiento de peso, edad avanzada' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Reparación Quirúrgica:',
        items: [
          '<strong>Hernioplastia de Lichtenstein:</strong> Reparación con malla de polipropileno, refuerza pared posterior del canal inguinal',
          '<strong>Reparación laparoscópica (TAPP/TEP):</strong> Abordaje transabdominal o totalmente extraperitoneal, colocación de malla en espacio preperitoneal',
          '<strong>Técnica de Shouldice:</strong> Reparación sin malla, sutura de fascia transversalis y músculos',
          '<strong>Hernia encarcelada:</strong> Contenido herniario irreducible pero sin isquemia',
          '<strong>Hernia estrangulada:</strong> Emergencia quirúrgica, compromiso vascular del contenido herniario (intestino), puede llevar a necrosis',
          '<strong>Signos de estrangulación:</strong> Dolor intenso, eritema/edema de piel, fiebre, leucocitosis, ausencia de ruidos intestinales si intestino involucrado',
          '<strong>Lesión nerviosa iatrogénica:</strong> Atrapamiento de nervio ilioinguinal/iliohipogástrico causa dolor crónico postoperatorio, parestesias',
          '<strong>Índice de recurrencia:</strong> Hernia directa: 10-15%, Hernia indirecta: 5-10%, reducido a <3% con mallas modernas'
        ]
      }
    ]
  },

  {
    id: 'espacio-retroperitoneal',
    nombre: 'Espacio Retroperitoneal',
    subtitulo: 'Región posterior al peritoneo parietal',
    icono: '◈',
    categorias: ['abdomen-pelvis'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Anterior:</strong> Peritoneo parietal posterior',
          '<strong>Posterior:</strong> Músculos psoas mayor, cuadrado lumbar, transverso del abdomen',
          '<strong>Superior:</strong> Diafragma (pilares y arcadas)',
          '<strong>Inferior:</strong> Borde pélvico (línea terminal)',
          '<strong>Lateral:</strong> Bordes laterales de músculos cuadrados lumbares'
        ]
      },
      {
        titulo: '🏗️ Compartimentos Retroperitoneales',
        items: [
          '<strong>Espacio perirrenal:</strong> Contiene riñones y glándulas suprarrenales, limitado por fascia de Gerota (renal)',
          '<strong>Espacio pararrenal anterior:</strong> Entre peritoneo parietal y fascia de Gerota, contiene páncreas, duodeno descendente/ascendente, colon ascendente/descendente',
          '<strong>Espacio pararrenal posterior:</strong> Entre fascia de Gerota y músculos posteriores, contiene grasa retroperitoneal',
          '<strong>Fascia de Gerota:</strong> Envuelve riñón y glándula suprarrenal, abierta inferiormente',
          '<strong>Fascia de Zuckerkandl:</strong> Posterior al colon ascendente/descendente, separa colon de estructuras retroperitoneales'
        ]
      },
      {
        titulo: '🩸 Grandes Vasos Retroperitoneales',
        items: [
          '<strong>Aorta abdominal:</strong> Desde hiato aórtico (T12) hasta bifurcación (L4), da ramas parietales y viscerales',
          '<strong>Vena cava inferior:</strong> Formada por unión de venas ilíacas comunes (L5), asciende a la derecha de aorta',
          '<strong>Tronco celíaco (T12):</strong> Primera rama visceral de aorta, trifurcación en gástrica izquierda, esplénica, hepática común',
          '<strong>Arteria mesentérica superior (L1):</strong> Irriga intestino delgado y colon derecho',
          '<strong>Arterias renales (L1-L2):</strong> Rama derecha más larga (pasa posterior a VCI), rama izquierda más corta',
          '<strong>Arteria mesentérica inferior (L3):</strong> Irriga colon izquierdo, recto superior',
          '<strong>Venas renales:</strong> Vena renal izquierda más larga, cruza anteriormente a aorta, recibe vena gonadal izquierda'
        ]
      },
      {
        titulo: '⚡ Estructuras Nerviosas',
        items: [
          '<strong>Tronco simpático lumbar:</strong> Cadena ganglionar paravertebral',
          '<strong>Plexo celíaco:</strong> Alrededor del tronco celíaco, nervios esplácnicos toracicos mayores (T5-T9) y menores (T10-T11)',
          '<strong>Plexo aórtico:</strong> Anterior a aorta abdominal',
          '<strong>Plexo hipogástrico superior:</strong> Bifurcación de aorta (L5), se divide en plexos hipogástricos inferiores',
          '<strong>Nervios esplácnicos lumbares:</strong> L1-L2, se unen a plexos preaórticos',
          '<strong>Ganglio impar:</strong> Fusión de cadenas simpáticas a nivel coccígeo'
        ]
      },
      {
        titulo: '🫘 Órganos Retroperitoneales',
        tipo: 'tabla',
        datos: [
          { label: 'PRIMARIOS (siempre)', value: 'Riñones, uréteres, glándulas suprarrenales, aorta abdominal, VCI' },
          { label: 'SECUNDARIOS (desarrollo)', value: 'Páncreas (excepto cola), duodeno (2ª-4ª porción), colon ascendente y descendente' },
          { label: 'Mnemotecnia', value: 'SAD PUCKER: Suprarenal, Aorta/VCI, Duodeno (2-4), Páncreas, Uréteres, Colon (ascendente/descendente), Kidneys (riñones), Esófago (porción abdominal), Recto (porción superior)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Patologías y Abordajes:',
        items: [
          '<strong>Hemorragia retroperitoneal:</strong> Trauma renal, rotura de aneurisma aórtico, coagulopatía; el espacio puede acumular >4L de sangre',
          '<strong>Signo de Grey-Turner:</strong> Equimosis en flancos en pancreatitis hemorrágica/hemorragia retroperitoneal',
          '<strong>Signo de Cullen:</strong> Equimosis periumbilical en pancreatitis/embarazo ectópico roto',
          '<strong>Absceso del psoas:</strong> Infección del músculo psoas, puede extenderse desde columna (espondilitis) o riñón (pielonefritis)',
          '<strong>Nefrectomía:</strong> Abordaje retroperitoneal lateral, incisión en línea del lecho costal',
          '<strong>Linfadenectomía retroperitoneal:</strong> En cáncer testicular, disección de ganglios paraaórticos',
          '<strong>Bloqueo del plexo celíaco:</strong> Manejo del dolor en cáncer pancreático/abdominal superior',
          '<strong>Fibrosis retroperitoneal (enfermedad de Ormond):</strong> Proceso inflamatorio que atrapa uréteres, causa hidronefrosis',
          '<strong>Aneurisma de aorta abdominal:</strong> Dilatación >3 cm, riesgo de rotura si >5.5 cm, reparación endovascular (EVAR) o abierta'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // EXTREMIDAD SUPERIOR
  // ═══════════════════════════════════════════════════════════
  {
    id: 'fosa-cubital',
    nombre: 'Fosa Cubital',
    subtitulo: 'Depresión triangular anterior del codo',
    icono: '💪',
    categorias: ['extremidad-superior'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Superior (base):</strong> Línea imaginaria entre epicóndilos medial y lateral del húmero',
          '<strong>Lateral:</strong> Borde medial del músculo braquiorradial',
          '<strong>Medial:</strong> Borde lateral del músculo pronador redondo',
          '<strong>Piso:</strong> Músculo braquial (proximalmente) y músculo supinador (distalmente)',
          '<strong>Techo:</strong> Piel, fascia superficial, vena cubital mediana, fascia profunda reforzada por aponeurosis bicipital'
        ]
      },
      {
        titulo: '🏗️ Contenido (de lateral a medial)',
        items: [
          '<strong>Tendón del bíceps braquial:</strong> Más lateral, se inserta en tuberosidad del radio',
          '<strong>Arteria braquial:</strong> Medial al tendón del bíceps, se bifurca en arterias radial y ulnar',
          '<strong>Nervio mediano:</strong> Medial a la arteria braquial, puede pasar superficial o profundo a la cabeza humeral del pronador redondo',
          '<strong>Mnemotecnia "TAN":</strong> De lateral a medial: Tendón (bíceps), Arteria (braquial), Nervio (mediano)'
        ]
      },
      {
        titulo: '🩸 Estructuras Vasculares',
        items: [
          '<strong>Arteria braquial:</strong> Continuación de arteria axilar, se bifurca en fosa cubital a nivel del cuello del radio',
          '<strong>Arteria radial:</strong> Rama lateral, desciende bajo braquiorradial',
          '<strong>Arteria ulnar:</strong> Rama medial, más grande, desciende bajo pronador redondo y flexor superficial de los dedos',
          '<strong>Arteria recurrente radial:</strong> Rama de arteria radial, asciende anterior al epicóndilo lateral',
          '<strong>Vena cubital mediana:</strong> Superficial en el techo de la fosa, conecta venas cefálica y basílica, sitio común de venopunción',
          '<strong>Venas braquiales:</strong> Venas profundas que acompañan a la arteria braquial'
        ]
      },
      {
        titulo: '⚡ Estructuras Nerviosas',
        items: [
          '<strong>Nervio mediano:</strong> Medial a arteria braquial, sin ramas en fosa cubital, pasa entre dos cabezas del pronador redondo',
          '<strong>Nervio radial:</strong> Lateral a fosa cubital, entre braquial y braquiorradial, se divide en ramas superficial (sensitiva) y profunda (motora/interóseo posterior)',
          '<strong>Nervio ulnar:</strong> NO pasa por la fosa cubital, pasa posterior al epicóndilo medial en el surco del nervio ulnar',
          '<strong>Nervio cutáneo lateral del antebrazo:</strong> Continuación del nervio musculocutáneo, emerge lateral al tendón del bíceps',
          '<strong>Nervio cutáneo medial del antebrazo:</strong> Rama del fascículo medial del plexo braquial, superficial'
        ]
      },
      {
        titulo: '🎯 Aponeurosis Bicipital (Lacertus Fibrosus)',
        tipo: 'tabla',
        datos: [
          { label: 'Origen', value: 'Expansión fascial del tendón del bíceps braquial' },
          { label: 'Inserción', value: 'Se fusiona con fascia profunda del antebrazo sobre los flexores' },
          { label: 'Función', value: 'Protege arteria braquial y nervio mediano durante venopunción' },
          { label: 'Importancia clínica', value: 'Debe ser seccionado cuidadosamente en exposición quirúrgica de la fosa cubital' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Procedimientos y Patologías:',
        items: [
          '<strong>Venopunción:</strong> Vena cubital mediana es el sitio preferido para extracción de sangre y acceso IV',
          '<strong>Medición de presión arterial:</strong> Auscultación de arteria braquial medial al tendón del bíceps',
          '<strong>Luxación anterior del codo:</strong> Puede lesionar arteria braquial, requiere evaluación vascular inmediata',
          '<strong>Fractura supracondílea del húmero:</strong> Lesión pediátrica común, riesgo de síndrome compartimental de Volkmann',
          '<strong>Síndrome de Volkmann:</strong> Contractura isquémica por lesión de arteria braquial, emergencia quirúrgica',
          '<strong>Lesión del nervio mediano:</strong> En fracturas supracondíleas, causa pérdida de pronación y flexión débil de muñeca',
          '<strong>Atrapamiento del nervio mediano:</strong> Entre cabezas del pronador redondo (síndrome del pronador)',
          '<strong>Exposición quirúrgica:</strong> Incisión en S a lo largo del pliegue cubital, cuidado con nervio mediano y arteria braquial',
          '<strong>Bolsa olecraniana:</strong> Bursa superficial posterior al olécranon, puede inflamarse (bursitis del "codo del estudiante")'
        ]
      }
    ]
  },

  {
    id: 'tunel-carpo',
    nombre: 'Túnel del Carpo',
    subtitulo: 'Canal osteofibroso de la muñeca',
    icono: '🤚',
    categorias: ['extremidad-superior'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Piso y paredes:</strong> Huesos del carpo (8 huesos en 2 hileras)',
          '<strong>Techo:</strong> Retináculo flexor (ligamento transverso del carpo)',
          '<strong>Proximal:</strong> Articulación radiocarpiana',
          '<strong>Distal:</strong> Punto donde el nervio mediano emerge bajo el retináculo',
          '<strong>Radial:</strong> Tubérculo del escafoides y tubérculo del trapecio',
          '<strong>Ulnar:</strong> Pisiforme y gancho del ganchoso'
        ]
      },
      {
        titulo: '🏗️ Contenido del Túnel (10 estructuras)',
        items: [
          '<strong>Nervio mediano:</strong> Más superficial, anterior a los tendones flexores',
          '<strong>4 tendones del flexor superficial de los dedos (FSD):</strong> Para dedos 2-5',
          '<strong>4 tendones del flexor profundo de los dedos (FPD):</strong> Para dedos 2-5',
          '<strong>Tendón del flexor largo del pulgar:</strong> Radial, separado de otros tendones flexores',
          '<strong>Mnemotecnia:</strong> 1 nervio (mediano) + 9 tendones = 10 estructuras totales',
          '<strong>NO pasan por el túnel:</strong> Nervio ulnar (pasa en canal de Guyon), arteria radial, tendón del palmar largo (superficial al retináculo)'
        ]
      },
      {
        titulo: '⚡ Nervio Mediano - Anatomía y Distribución',
        items: [
          '<strong>Origen:</strong> Fascículos lateral (C5-C7) y medial (C8-T1) del plexo braquial',
          '<strong>Ramos en el túnel:</strong> Nervio mediano NO da ramas motoras dentro del túnel',
          '<strong>Rama motora recurrente (tenar):</strong> Emerge inmediatamente distal al retináculo, inerva músculos tenares',
          '<strong>Músculos tenares inervados:</strong> Abductor corto del pulgar, oponente del pulgar, cabeza superficial del flexor corto del pulgar',
          '<strong>Ramos digitales palmares:</strong> Inervan piel palmar de dedos 1-3 y mitad radial del 4º dedo',
          '<strong>Ramo palmar cutáneo:</strong> Emerge PROXIMAL al túnel, inerva piel de eminencia tenar (preservado en síndrome del túnel del carpo)'
        ]
      },
      {
        titulo: '🩸 Irrigación',
        items: [
          '<strong>Arteria radial:</strong> Lateral al túnel del carpo, NO pasa a través de él',
          '<strong>Arteria ulnar:</strong> Medial, pasa con nervio ulnar en canal de Guyon (superficial al retináculo flexor)',
          '<strong>Arco palmar superficial:</strong> Formado principalmente por arteria ulnar',
          '<strong>Arco palmar profundo:</strong> Formado principalmente por arteria radial',
          '<strong>Irrigación del nervio mediano:</strong> Ramas de arterias radial y ulnar'
        ]
      },
      {
        titulo: '🎯 Retináculo Flexor',
        tipo: 'tabla',
        datos: [
          { label: 'Inserción radial', value: 'Tubérculo del escafoides y tubérculo del trapecio' },
          { label: 'Inserción ulnar', value: 'Pisiforme y gancho del ganchoso' },
          { label: 'Dimensiones', value: 'Aproximadamente 2-3 cm de ancho' },
          { label: 'Función', value: 'Mantiene tendones flexores en posición, previene arqueamiento palmar (bowstringing)' }
        ]
      },
      {
        titulo: '⚕️ Síndrome del Túnel del Carpo',
        tipo: 'clinica',
        subtitulo: '🔪 Patología más común de compresión nerviosa:',
        items: [
          '<strong>Etiología:</strong> Compresión del nervio mediano por aumento de presión en el túnel (tenosinovitis, edema, engrosamiento del retináculo)',
          '<strong>Factores de riesgo:</strong> Embarazo, diabetes, hipotiroidismo, artritis reumatoide, trabajo repetitivo de muñeca, obesidad',
          '<strong>Síntomas:</strong> Parestesias nocturnas en dedos 1-3 y mitad radial del 4º (distribución del mediano), dolor que irradia al antebrazo',
          '<strong>Signo de Tinel:</strong> Percusión sobre el nervio mediano en muñeca reproduce parestesias distales',
          '<strong>Signo de Phalen:</strong> Flexión pasiva de muñeca por 60 segundos reproduce síntomas',
          '<strong>Atrofia tenar:</strong> En casos crónicos severos, debilidad de abducción y oposición del pulgar',
          '<strong>Test de Durkan:</strong> Compresión directa sobre el túnel reproduce síntomas',
          '<strong>Electromiografía:</strong> Muestra retraso en latencia sensitiva y motora del nervio mediano',
          '<strong>Tratamiento conservador:</strong> Férula nocturna en posición neutra, AINEs, inyección de corticosteroides',
          '<strong>Liberación quirúrgica:</strong> División del retináculo flexor (abordaje abierto o endoscópico), cuidado con rama motora recurrente',
          '<strong>Complicaciones quirúrgicas:</strong> Lesión de rama motora recurrente (debilidad tenar), síndrome de dolor regional complejo, cicatriz hipertrófica dolorosa'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // EXTREMIDAD INFERIOR
  // ═══════════════════════════════════════════════════════════
  {
    id: 'triangulo-femoral',
    nombre: 'Triángulo Femoral (Escarpas)',
    subtitulo: 'Región inguinofemoral anterior del muslo',
    icono: '🦵',
    categorias: ['extremidad-inferior'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Superior (base):</strong> Ligamento inguinal',
          '<strong>Lateral:</strong> Borde medial del músculo sartorio',
          '<strong>Medial:</strong> Borde lateral del músculo aductor largo',
          '<strong>Piso:</strong> Músculo iliopsoas (lateral) y músculo pectíneo (medial)',
          '<strong>Techo:</strong> Fascia lata, fascia cribiforme (sobre hiato safeno)',
          '<strong>Vértice:</strong> Punto de cruce entre sartorio y aductor largo'
        ]
      },
      {
        titulo: '🏗️ Contenido (de lateral a medial)',
        items: [
          '<strong>Nervio femoral:</strong> Más lateral, inmediatamente lateral a arteria femoral',
          '<strong>Arteria femoral:</strong> Central, continuación de arteria ilíaca externa bajo ligamento inguinal',
          '<strong>Vena femoral:</strong> Más medial, continuación de vena poplítea',
          '<strong>Canal femoral:</strong> Espacio medial a vena femoral, contiene ganglio de Cloquet',
          '<strong>Mnemotecnia "NAVEL":</strong> De lateral a medial: Nervio, Arteria, Vena, Espacio (canal femoral), Linfáticos'
        ]
      },
      {
        titulo: '🩸 Estructuras Vasculares',
        items: [
          '<strong>Arteria femoral:</strong> Punto medio entre EIAS y sínfisis púbica, bifurcación en femoral superficial y femoral profunda',
          '<strong>Arteria femoral profunda (profunda femoris):</strong> Rama posterolateral, principal irrigación del muslo',
          '<strong>Arteria femoral superficial:</strong> Continuación, entra en canal aductor (Hunter)',
          '<strong>Arteria circunfleja femoral lateral:</strong> Rama de femoral profunda, irriga región trocantérica',
          '<strong>Arteria circunfleja femoral medial:</strong> Rama de femoral profunda, principal irrigación de cabeza femoral',
          '<strong>Vena femoral:</strong> Medial a arteria femoral, recibe vena safena magna',
          '<strong>Vena safena magna:</strong> Drena en vena femoral a través del hiato safeno',
          '<strong>Hiato safeno (fosa oval):</strong> Apertura en fascia lata donde la safena magna perfora para drenar en femoral'
        ]
      },
      {
        titulo: '⚡ Nervio Femoral',
        items: [
          '<strong>Origen:</strong> Ramos dorsales de L2-L4 del plexo lumbar',
          '<strong>Trayecto:</strong> Desciende entre psoas e ilíaco, pasa bajo ligamento inguinal lateral a arteria femoral',
          '<strong>División:</strong> Se divide en ramas superficiales (cutáneas) y profundas (motoras) inmediatamente distal al ligamento',
          '<strong>Ramas motoras:</strong> Inervan cuádriceps femoral (recto femoral, vastos medial/lateral/intermedio), sartorio, pectíneo',
          '<strong>Ramas sensitivas:</strong> Nervios cutáneos anterior y medial del muslo',
          '<strong>Nervio safeno:</strong> Rama más larga, desciende en canal aductor, inerva piel medial de pierna y pie'
        ]
      },
      {
        titulo: '🎯 Canal Femoral',
        tipo: 'tabla',
        datos: [
          { label: 'Ubicación', value: 'Compartimento más medial del triángulo, medial a vena femoral' },
          { label: 'Contenido', value: 'Ganglio linfático de Cloquet (Rosenmüller), tejido adiposo, vasos linfáticos' },
          { label: 'Límites', value: 'Anterior: ligamento inguinal, Posterior: ligamento pectíneo, Lateral: vena femoral, Medial: ligamento lacunar' },
          { label: 'Importancia', value: 'Sitio de hernias femorales (más común en mujeres)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Procedimientos y Patologías:',
        items: [
          '<strong>Cateterización femoral:</strong> Acceso arterial/venoso para angiografía, hemodiálisis, línea central, punto de punción 2 cm inferior al ligamento inguinal',
          '<strong>Palpación del pulso femoral:</strong> Punto medio entre EIAS y sínfisis púbica, evaluación de flujo arterial',
          '<strong>Hernia femoral:</strong> Protrusión a través del canal femoral, más común en mujeres multiíparas, alto riesgo de estrangulación',
          '<strong>Absceso del psoas:</strong> Puede extenderse al triángulo femoral, signo de Thomas positivo',
          '<strong>Bloqueo del nervio femoral:</strong> Anestesia regional para cirugía de fémur/rodilla, inyección lateral a arteria femoral',
          '<strong>Trombosis venosa profunda:</strong> Vena femoral común, puede causar edema de miembro inferior',
          '<strong>Pseudoaneurisma femoral:</strong> Complicación de cateterización, hematoma pulsátil en sitio de punción',
          '<strong>Linfadenopatía inguinal:</strong> Ganglios del triángulo, drenan genitales externos, periné, extremidad inferior',
          '<strong>Necrosis avascular de cabeza femoral:</strong> Por lesión de arteria circunfleja femoral medial en fractura de cuello femoral',
          '<strong>Síndrome compartimental:</strong> Aumento de presión en compartimento anterior del muslo, emergencia quirúrgica',
          '<strong>Signo de Ludloff:</strong> Equimosis en triángulo femoral en fractura de rama púbica'
        ]
      }
    ]
  },

  {
    id: 'fosa-poplitea',
    nombre: 'Fosa Poplítea',
    subtitulo: 'Región posterior de la rodilla',
    icono: '🦴',
    categorias: ['extremidad-inferior'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Superolateral:</strong> Músculo bíceps femoral (tendón lateral)',
          '<strong>Superomedial:</strong> Músculos semimembranoso y semitendinoso (tendones mediales)',
          '<strong>Inferolateral:</strong> Cabeza lateral del músculo gastrocnemio',
          '<strong>Inferomedial:</strong> Cabeza medial del músculo gastrocnemio',
          '<strong>Piso (anterior):</strong> Superficie poplítea del fémur (superior), cápsula articular posterior de la rodilla (medio), músculo poplíteo (inferior)',
          '<strong>Techo (posterior):</strong> Fascia poplítea y piel'
        ]
      },
      {
        titulo: '🏗️ Contenido (de superficial a profundo)',
        items: [
          '<strong>Nervio tibial:</strong> Más superficial, línea media, rama del nervio ciático',
          '<strong>Vena poplítea:</strong> Superficial a arteria, formada por unión de venas tibiales anterior y posterior',
          '<strong>Arteria poplítea:</strong> Más profunda, adyacente a superficie posterior del fémur, continuación de arteria femoral',
          '<strong>Nervio peroneo común (fibular común):</strong> Lateral, sigue borde medial del bíceps femoral, rodea cuello del peroné',
          '<strong>Mnemotecnia (superficial a profundo):</strong> "VENA": Vena, (nervio tibial), Nervio (tibial), Arteria'
        ]
      },
      {
        titulo: '🩸 Arteria Poplítea',
        items: [
          '<strong>Origen:</strong> Continuación de arteria femoral superficial en el hiato aductor (hiato de Hunter)',
          '<strong>Trayecto:</strong> Desciende verticalmente, adyacente a superficie poplítea del fémur',
          '<strong>Terminación:</strong> A nivel del borde inferior del músculo poplíteo, se divide en arterias tibial anterior y tronco tibioperóneo',
          '<strong>Ramas:</strong> Arterias geniculares superior lateral/medial, media, inferior lateral/medial',
          '<strong>Arteria genicular descendente:</strong> Rama de femoral superficial, anastomosis alrededor de la rodilla',
          '<strong>Tronco tibioperóneo:</strong> Se divide en arterias tibial posterior y peronea (fibular)'
        ]
      },
      {
        titulo: '⚡ Nervios',
        items: [
          '<strong>Nervio ciático:</strong> Se divide en tibial y peroneo común proximal a la fosa (generalmente a nivel del tercio inferior del muslo)',
          '<strong>Nervio tibial (L4-S3):</strong> Más grande, continúa en línea media, da ramas a gastrocnemio, sóleo, poplíteo, plantar',
          '<strong>Nervio peroneo común (L4-S2):</strong> Lateral, vulnerable en cuello del peroné, se divide en peroneo superficial y profundo',
          '<strong>Nervio cutáneo sural medial:</strong> Rama del tibial, desciende entre cabezas del gastrocnemio',
          '<strong>Nervio cutáneo sural lateral:</strong> Rama del peroneo común',
          '<strong>Nervio sural:</strong> Formado por ramas cutáneas medial y lateral, inerva piel lateral de pierna y pie'
        ]
      },
      {
        titulo: '🎯 Quiste de Baker',
        tipo: 'tabla',
        datos: [
          { label: 'Definición', value: 'Distensión quística de la bursa gastrocnemio-semimembranosa' },
          { label: 'Ubicación', value: 'Entre tendón del semimembranoso y cabeza medial del gastrocnemio' },
          { label: 'Causa', value: 'Comunicación con articulación de rodilla, derrame articular (artritis, menisco roto)' },
          { label: 'Clínica', value: 'Masa palpable poplítea, dolor, limitación de flexión/extensión, puede romperse (simula TVP)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Patologías y Procedimientos:',
        items: [
          '<strong>Aneurisma de arteria poplítea:</strong> Más común de extremidades inferiores, riesgo de trombosis/embolia, puede causar isquemia aguda',
          '<strong>Atrapamiento de arteria poplítea:</strong> Compresión por variante muscular (gastrocnemio/poplíteo), claudicación en jóvenes',
          '<strong>Lesión de arteria poplítea:</strong> Luxación posterior de rodilla, fractura supracondílea de fémur, emergencia vascular',
          '<strong>Lesión del nervio peroneo común:</strong> Trauma en cuello del peroné, fractura de cabeza del peroné, pie caído (steppage gait)',
          '<strong>Trombosis venosa profunda:</strong> Vena poplítea, signo de Homans (dolor con dorsiflexión), ultrasonido Doppler',
          '<strong>Abordaje posterior de rodilla:</strong> Incisión en S o recta, cuidado con nervio tibial y vasos poplíteos',
          '<strong>Bloqueo del nervio ciático:</strong> Abordaje poplíteo para anestesia de pie/tobillo',
          '<strong>Biopsia de nervio sural:</strong> Evaluación de neuropatías periféricas',
          '<strong>Quiste de Baker roto:</strong> Simula TVP, dolor agudo en pantorrilla, equimosis (signo de media luna)',
          '<strong>Signo de Foucher:</strong> Palpación de pulso poplíteo, pierna en flexión de 30°, comparación bilateral'
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // COLUMNA VERTEBRAL
  // ═══════════════════════════════════════════════════════════
  {
    id: 'triangulo-suboccipital',
    nombre: 'Triángulo Suboccipital',
    subtitulo: 'Región posterior superior del cuello',
    icono: '◭',
    categorias: ['columna'],
    secciones: [
      {
        titulo: '📍 Límites Topográficos',
        items: [
          '<strong>Superomedial:</strong> Músculo recto posterior mayor de la cabeza',
          '<strong>Superolateral:</strong> Músculo oblicuo superior de la cabeza',
          '<strong>Inferolateral:</strong> Músculo oblicuo inferior de la cabeza',
          '<strong>Piso:</strong> Membrana atlantooccipital posterior y arco posterior del atlas (C1)',
          '<strong>Techo:</strong> Músculo semiespinoso de la cabeza (complexo mayor)'
        ]
      },
      {
        titulo: '🏗️ Músculos del Triángulo',
        items: [
          '<strong>Recto posterior mayor:</strong> Inserción: proceso espinoso de C2 (axis) → línea nucal inferior del occipital',
          '<strong>Oblicuo superior:</strong> Inserción: proceso transverso de C1 (atlas) → entre líneas nucales superior e inferior del occipital',
          '<strong>Oblicuo inferior:</strong> Inserción: proceso espinoso de C2 → proceso transverso de C1',
          '<strong>Función:</strong> Extensión y rotación de la cabeza, propiocepción (alta densidad de husos musculares)',
          '<strong>Inervación:</strong> Ramo dorsal del nervio C1 (nervio suboccipital)'
        ]
      },
      {
        titulo: '🩸 Contenido Vascular',
        items: [
          '<strong>Arteria vertebral:</strong> Cruza el triángulo horizontalmente sobre arco posterior de C1',
          '<strong>Segmento V3:</strong> Desde C2 hasta penetración dural, vulnerable en esta región',
          '<strong>Arco arterial:</strong> La vertebral hace un giro en S sobre el atlas antes de penetrar la duramadre',
          '<strong>Vena vertebral:</strong> Acompaña a la arteria, forma plexo venoso',
          '<strong>Plexo venoso suboccipital:</strong> Red venosa anastomótica extensa'
        ]
      },
      {
        titulo: '⚡ Nervio Suboccipital',
        items: [
          '<strong>Origen:</strong> Ramo dorsal del nervio espinal C1',
          '<strong>Trayecto:</strong> Emerge entre arteria vertebral y arco posterior de C1',
          '<strong>Inervación motora:</strong> Músculos recto posterior mayor, oblicuo superior, oblicuo inferior, recto posterior menor',
          '<strong>NO tiene componente sensitivo cutáneo:</strong> C1 generalmente no tiene dermatoma',
          '<strong>Nervio occipital mayor:</strong> Ramo dorsal de C2, emerge inferior al oblicuo inferior, inerva cuero cabelludo posterior'
        ]
      },
      {
        titulo: '🎯 Anatomía Regional',
        tipo: 'tabla',
        datos: [
          { label: 'Articulación atlantooccipital', value: 'Permite flexión-extensión de cabeza (movimiento de "sí")' },
          { label: 'Articulación atlantoaxial', value: 'Permite rotación de cabeza (movimiento de "no"), odontoides (diente) del axis' },
          { label: 'Ligamento transverso', value: 'Mantiene odontoides contra arco anterior de atlas, estabilidad crucial' },
          { label: 'Membrana tectoria', value: 'Continuación del ligamento longitudinal posterior, estabiliza articulación atlantoaxial' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica y Quirúrgica',
        tipo: 'clinica',
        subtitulo: '🔪 Patologías y Abordajes:',
        items: [
          '<strong>Cefalea cervicogénica:</strong> Dolor referido de articulaciones C1-C3, irritación de nervio occipital mayor',
          '<strong>Neuralgia occipital:</strong> Compresión del nervio occipital mayor, dolor punzante en cuero cabelludo posterior',
          '<strong>Bloqueo del nervio occipital:</strong> Anestesia local para neuralgia, punto de inyección inferior a oblicuo inferior',
          '<strong>Lesión de arteria vertebral:</strong> Trauma cervical, manipulación quiropráctica, riesgo de disección/stroke',
          '<strong>Síndrome de Bow Hunter:</strong> Isquemia vertebrobasilar con rotación cervical',
          '<strong>Inestabilidad atlantoaxial:</strong> Artritis reumatoide, síndrome de Down, subluxación de odontoides',
          '<strong>Fractura de Jefferson (C1):</strong> Fractura en estallido del atlas, carga axial, puede ser estable si ligamento transverso intacto',
          '<strong>Fractura de Hangman (C2):</strong> Fractura bilateral de pars interarticularis de axis, hiperextensión',
          '<strong>Fractura de odontoides:</strong> Tipo I (ápex), II (base, inestable), III (cuerpo de axis)',
          '<strong>Abordaje posterior de craneocervical:</strong> Incisión en línea media, disección de músculos suboccipitales, exposición de C1-C2',
          '<strong>Cefalea post-punción dural:</strong> Puede irradiarse a región suboccipital'
        ]
      }
    ]
  }
];
