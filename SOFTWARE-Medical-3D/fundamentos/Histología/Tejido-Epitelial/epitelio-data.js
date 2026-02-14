// ═══════════════════════════════════════════════════════════
// EPITELIO DATA - Base de datos de tejido epitelial
// ═══════════════════════════════════════════════════════════

const EPITELIO_DATA = [
  {
    id: 'simple-plano',
    nombre: 'Epitelio Simple Plano (Escamoso)',
    subtitulo: 'Monocapa · Células aplanadas · Difusión y filtración',
    icono: '▭',
    categorias: ['revestimiento', 'simple', 'difusion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Una sola capa de células aplanadas',
          'Núcleo central, aplanado, ovoide que protruye',
          'Citoplasma muy delgado, difícil de visualizar',
          'Células poligonales en vista superficial (forma de baldosa)',
          'Espesor: 0.2-0.5 μm (excepto donde está el núcleo)',
          'Límites celulares visibles con tinción argéntica',
          'Lámina basal: Presente, visible con PAS o microscopía electrónica'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Endotelio: Revestimiento de vasos sanguíneos y linfáticos',
          'Mesotelio: Cavidades serosas (pleura, pericardio, peritoneo)',
          'Alvéolos pulmonares: Neumocitos tipo I (95% superficie)',
          'Cápsula de Bowman: Hoja parietal (riñón)',
          'Asa de Henle: Segmento delgado',
          'Oído interno: Laberinto membranoso',
          'Córnea: Endotelio corneal'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Difusión, filtración, secreción serosa' },
          { label: 'Barrera de permeabilidad', value: 'Mínima (facilita intercambio)' },
          { label: 'Superficie', value: 'Lisa, reducción de fricción' },
          { label: 'Renovación celular', value: 'Baja (excepto mesotelio)' },
          { label: 'Tipo de sustancias', value: 'Gases (O₂, CO₂), líquidos, moléculas pequeñas' },
          { label: 'Especializaciones', value: 'Caveolas (endotelio), microvellosidades (mesotelio)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Enfisema pulmonar: Destrucción de neumocitos tipo I, pérdida superficie de intercambio',
          'Aterosclerosis: Daño endotelial, disfunción barrera vascular',
          'Mesotelioma: Neoplasia maligna del mesotelio (exposición a asbesto)',
          'Edema pulmonar: Alteración barrera alvéolo-capilar',
          'Glomerulonefritis: Daño a epitelio de cápsula de Bowman',
          'Trombosis: Activación endotelial, pérdida propiedades antitrombóticas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Caveolas: Endotelio (transcitosis, señalización)',
          'Uniones estrechas (tight junctions): Control permeabilidad paracelular',
          'Uniones adherentes: Estabilidad estructural',
          'Glucocáliz: Endotelio (carga negativa, antitrombótica)',
          'Microvellosidades: Mesotelio (aumenta superficie)',
          'Receptores específicos: Endotelio (factores crecimiento, hormonas)',
          'Producción de sustancias: Óxido nítrico (NO), prostaciclina (endotelio)'
        ]
      }
    ]
  },
  {
    id: 'simple-cubico',
    nombre: 'Epitelio Simple Cúbico',
    subtitulo: 'Monocapa · Células cuboidales · Secreción y absorción',
    icono: '□',
    categorias: ['revestimiento', 'simple', 'secrecion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Una sola capa de células con altura y ancho similares',
          'Núcleo esférico, central, eucromático',
          'Forma cuboidal en corte transversal',
          'Citoplasma abundante, basófilo (RER desarrollado)',
          'Superficie apical puede tener microvellosidades',
          'Vista superficial: Células poligonales (hexagonales)',
          'Altura celular: 10-20 μm aproximadamente'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Túbulos renales: Túbulo contorneado proximal (con borde en cepillo), distal',
          'Conductos excretores: Glándulas salivales, páncreas, hígado',
          'Folículos tiroideos: Células foliculares (producen tiroglobulina)',
          'Superficie del ovario: Epitelio germinal',
          'Plexos coroideos: Células ependimarias modificadas',
          'Cristalino: Epitelio anterior',
          'Bronquiolos terminales: Células de Clara'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Secreción, absorción, protección' },
          { label: 'Actividad metabólica', value: 'Alta (organelos abundantes)' },
          { label: 'Capacidad secretora', value: 'Moderada a alta' },
          { label: 'Polaridad celular', value: 'Bien definida (apical-basal)' },
          { label: 'Renovación', value: 'Variable según localización' },
          { label: 'Transporte', value: 'Bidireccional (absorción/secreción)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Síndrome de Fanconi: Disfunción túbulo proximal, pérdida de glucosa, aminoácidos',
          'Hipotiroidismo: Células foliculares aplanadas, escasa actividad',
          'Hipertiroidismo: Células foliculares cilíndricas, actividad aumentada',
          'Enfermedad quística renal: Proliferación anormal de epitelio tubular',
          'Tumores renales: Origen en epitelio tubular (carcinoma células claras)',
          'Cataratas: Alteración del epitelio del cristalino'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Microvellosidades (borde en cepillo): Túbulo proximal (aumenta 30-40x superficie)',
          'Invaginaciones basales: Plegamiento membrana basal (transporte iónico)',
          'Mitocondrias abundantes: Base celular (energía para transporte activo)',
          'Retículo endoplásmico: Abundante (síntesis proteica)',
          'Aparato de Golgi: Desarrollo variable según función',
          'Uniones estrechas apicales: Control paso de sustancias',
          'Acuaporinas: Túbulo renal (reabsorción agua)'
        ]
      }
    ]
  },
  {
    id: 'simple-cilindrico',
    nombre: 'Epitelio Simple Cilíndrico (Columnar)',
    subtitulo: 'Monocapa · Células alargadas · Secreción y absorción',
    icono: '▯',
    categorias: ['revestimiento', 'simple', 'secrecion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Una sola capa de células cilíndricas altas',
          'Núcleo ovoide, basal o central, eucromático',
          'Altura mayor que anchura (relación 3:1 o más)',
          'Citoplasma basófilo en región basal (RER)',
          'Aparato de Golgi supranuclear',
          'Células caliciformes intercaladas (productoras de moco)',
          'Chapa estriada o borde en cepillo en superficie apical'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Tubo digestivo: Estómago, intestino delgado, intestino grueso',
          'Vesícula biliar: Revestimiento interno',
          'Conductos excretores: Glándulas mayores',
          'Útero: Endometrio (fase proliferativa)',
          'Trompas de Falopio: Epitelio con células ciliadas y secretoras',
          'Apéndice: Con abundantes células caliciformes',
          'Conductos eferentes del testículo: Células con estereocilios'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Absorción, secreción de moco, protección' },
          { label: 'Capacidad secretora', value: 'Alta (células caliciformes, glándulas)' },
          { label: 'Absorción', value: 'Intestino delgado (nutrientes)' },
          { label: 'Renovación celular', value: 'Alta (intestino: 3-5 días)' },
          { label: 'Producción de moco', value: 'Células caliciformes (glucoproteínas)' },
          { label: 'Transporte', value: 'Cilios (trompas), microvellosidades (intestino)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Enfermedad celíaca: Atrofia de vellosidades, pérdida de borde en cepillo',
          'Colitis ulcerosa: Pérdida de células caliciformes, úlceras mucosas',
          'Enfermedad de Crohn: Inflamación transmural, granulomas',
          'Adenocarcinoma colorrectal: Transformación neoplásica de epitelio',
          'Metaplasia de Barrett: Epitelio esofágico → cilíndrico (reflujo crónico)',
          'Gastritis crónica: Atrofia glandular, metaplasia intestinal',
          'Embarazo ectópico: Disfunción del epitelio tubárico'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Microvellosidades (chapa estriada): Intestino delgado (enterocitos)',
          'Glucocáliz: Capa rica en carbohidratos (protección, absorción)',
          'Células caliciformes: Secreción de mucinas (MUC2 en intestino)',
          'Uniones estrechas: Barrera selectiva (zonula occludens)',
          'Cilios: Trompas uterinas (transporte ovocito)',
          'Desmosomas: Adhesión celular',
          'Transportadores: SGLT1 (glucosa-sodio), aminoácidos, péptidos'
        ]
      }
    ]
  },
  {
    id: 'pseudoestratificado-ciliado',
    nombre: 'Epitelio Pseudoestratificado Cilíndrico Ciliado',
    subtitulo: 'Monocapa aparentemente estratificada · Células ciliadas · Vía respiratoria',
    icono: '🫁',
    categorias: ['revestimiento', 'simple', 'ciliado'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Todas las células contactan la lámina basal (monocapa)',
          'Núcleos a diferentes alturas (aspecto estratificado)',
          'Células cilíndricas ciliadas: Núcleo apical, cilios en superficie',
          'Células caliciformes: Núcleo basal, citoplasma con mucígeno',
          'Células basales: Pequeñas, núcleo basal, células madre',
          'Células en cepillo: Microvellosidades, quimiorreceptoras',
          'Cilios: 200-300 por célula, movimiento coordinado'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Vías respiratorias: Fosas nasales, tráquea, bronquios',
          'Trompa de Eustaquio: Oído medio',
          'Senos paranasales: Revestimiento mucoso',
          'Epidídimo: Sin cilios, con estereocilios',
          'Conductos deferentes: Estereocilios (no ciliado)',
          'Uretra prostática: Segmento proximal',
          'Saco lagrimal: Conducto nasolagrimal'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Transporte mucociliar, protección' },
          { label: 'Batido ciliar', value: '10-20 Hz, dirección coordinada' },
          { label: 'Capa de moco', value: 'Bicapa: sol (periciliar) y gel (superficial)' },
          { label: 'Limpieza mucociliar', value: '1-2 cm/min hacia faringe' },
          { label: 'Células caliciformes', value: '20-30% del epitelio' },
          { label: 'Renovación celular', value: 'Células basales (multipotentes)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Discinesia ciliar primaria (síndrome de Kartagener): Cilios inmóviles, infecciones respiratorias, sinusitis, infertilidad',
          'EPOC: Hiperplasia células caliciformes, hipersecreción mucosa',
          'Fibrosis quística: Moco espeso (mutación CFTR), obstrucción',
          'Metaplasia escamosa: Tabaquismo (reemplazo por epitelio estratificado)',
          'Asma: Descamación epitelial, engrosamiento membrana basal',
          'Bronquitis crónica: Hipertrofia glándulas, aumento células caliciformes',
          'Rinitis alérgica: Hipersecreción, congestión'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Cilios: 250-300/célula, axonema 9+2 (microtúbulos)',
          'Cuerpos basales: Centríolos modificados, anclan cilios',
          'Dineína ciliar: Motor molecular (batido ciliar)',
          'Células caliciformes: Mucinas (MUC5AC, MUC5B)',
          'Glándulas submucosas: Seromucosas (Bowman en nariz)',
          'Lisozima: Actividad antibacteriana en secreciones',
          'IgA secretora: Inmunidad de mucosas',
          'Células basales: Citoqueratinas 5 y 14 (células madre)'
        ]
      }
    ]
  },
  {
    id: 'estratificado-plano-queratinizado',
    nombre: 'Epitelio Estratificado Plano Queratinizado',
    subtitulo: 'Múltiples capas · Queratinización · Piel',
    icono: '🧱',
    categorias: ['revestimiento', 'estratificado', 'proteccion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Múltiples capas celulares (estrato basal → córneo)',
          'Estrato basal: Células cilíndricas, mitóticamente activas',
          'Estrato espinoso: Células poligonales, desmosomas prominentes',
          'Estrato granuloso: Gránulos de queratohialina, laminillas',
          'Estrato lúcido: Células aplanadas, translúcidas (piel gruesa)',
          'Estrato córneo: Células muertas queratinizadas (corneocitos)',
          'Espesor variable: 75 μm (párpados) a 1.5 mm (palmas, plantas)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Epidermis: Toda la superficie corporal',
          'Piel gruesa: Palmas, plantas (5 estratos)',
          'Piel delgada: Resto del cuerpo (sin estrato lúcido)',
          'Sin presencia en mucosas húmedas',
          'Anexos cutáneos: Folículos pilosos, uñas',
          'Libre de vasos sanguíneos (avascular)',
          'Nutrición por difusión desde dermis'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Protección mecánica, barrera impermeable' },
          { label: 'Renovación celular', value: '28-30 días (epidermis completa)' },
          { label: 'Barrera al agua', value: 'Laminillas lipídicas (ceramidas)' },
          { label: 'Resistencia mecánica', value: 'Queratina, desmosomas' },
          { label: 'Protección UV', value: 'Melanina (melanocitos)' },
          { label: 'Descamación', value: 'Corneocitos (30,000-40,000 células/min)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Psoriasis: Hiperproliferación queratinocitos, acantosis, paraqueratosis',
          'Ictiosis: Alteración queratinización, piel escamosa (mutaciones filagrina)',
          'Pénfigo vulgar: Autoanticuerpos contra desmogleína 3, acantólisis',
          'Melanoma: Transformación maligna melanocitos',
          'Carcinoma escamoso: Neoplasia queratinocitos (UV, tabaco)',
          'Queratosis actínica: Lesión precancerosa (daño solar crónico)',
          'Epidermólisis bullosa: Mutaciones en proteínas de adhesión'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Desmosomas: Uniones célula-célula (desmogleínas, desmocolinas)',
          'Hemidesmosomas: Anclaje a lámina basal (integrinas α6β4)',
          'Tonofilamentos: Citoqueratinas 1 y 10 (K1/K10)',
          'Gránulos lamelares (cuerpos de Odland): Lípidos de barrera',
          'Queratohialina: Profilagrina → filagrina (agregación)',
          'Involucrina, loricrina: Envoltura cornificada',
          'Melanosomas: Transferidos de melanocitos (protección UV)',
          'Células de Langerhans: Presentadoras de antígeno (inmunidad)'
        ]
      }
    ]
  },
  {
    id: 'estratificado-plano-no-queratinizado',
    nombre: 'Epitelio Estratificado Plano No Queratinizado',
    subtitulo: 'Múltiples capas · Sin queratina · Mucosas húmedas',
    icono: '👄',
    categorias: ['revestimiento', 'estratificado', 'proteccion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Múltiples capas de células planas',
          'Capa basal: Células cilíndricas, basófilas, mitosis',
          'Capas intermedias: Células poligonales con desmosomas',
          'Capa superficial: Células planas nucleadas (vivas)',
          'Sin estrato córneo queratinizado',
          'Núcleos presentes en todas las capas',
          'Superficie húmeda, lubricada por saliva o secreciones'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Cavidad oral: Mucosa bucal, lengua (dorso ventral)',
          'Esófago: Toda su extensión',
          'Faringe y epiglotis: Cara anterior',
          'Vagina: Todo el revestimiento',
          'Ectocérvix: Porción vaginal del cuello uterino',
          'Conjuntiva palpebral: Cara interna párpados',
          'Córnea: Epitelio corneal anterior',
          'Uretra distal femenina: Segmento terminal'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Protección mecánica, barrera flexible' },
          { label: 'Hidratación', value: 'Superficie húmeda (saliva, moco)' },
          { label: 'Renovación celular', value: '5-7 días (cavidad oral)' },
          { label: 'Resistencia a fricción', value: 'Alta (desmosomas abundantes)' },
          { label: 'Permeabilidad', value: 'Mayor que queratinizado' },
          { label: 'Elasticidad', value: 'Alta (mucosas dinámicas)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Leucoplasia: Queratinización anormal de mucosa oral (premaligna)',
          'Candidiasis oral: Infección fúngica (muguet, seudomembranosa)',
          'Carcinoma escamoso oral: Tabaco, alcohol, VPH (orofaringe)',
          'Esofagitis: Reflujo ácido, inflamación, ulceración',
          'Vaginitis: Infección (Candida, Trichomonas, bacteriana)',
          'Displasia cervical (CIN): VPH 16/18, precursor cáncer cervical',
          'Queratitis: Inflamación córnea (infecciosa, traumática)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Desmosomas: Adhesión intercelular (desmogleína 1 y 3)',
          'Tonofilamentos: Citoqueratinas 4 y 13 (mucosas)',
          'Uniones gap: Comunicación intercelular',
          'Glucógeno citoplasmático: Abundante (vagina)',
          'Glándulas salivales menores: Lubricación (oral)',
          'Células de Langerhans: Inmunidad (presentación antígeno)',
          'Microbiota normal: Lactobacillus (vagina), Streptococcus (oral)',
          'IgA secretora: Inmunidad de mucosas'
        ]
      }
    ]
  },
  {
    id: 'transicional',
    nombre: 'Epitelio de Transición (Urotelio)',
    subtitulo: 'Estratificado especializado · Distensible · Vías urinarias',
    icono: '🫧',
    categorias: ['revestimiento', 'estratificado', 'especial'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Número de capas variable según distensión (3-6 capas)',
          'Capa basal: Células pequeñas, cilíndricas o cuboidales',
          'Capas intermedias: Células poliédricas (en forma de pera)',
          'Capa superficial: Células grandes en "paraguas" (umbrella cells)',
          'Células en paraguas: Binucleadas o polilobuladas',
          'Vejiga vacía: 6 capas, células superficiales convexas',
          'Vejiga distendida: 3 capas, células superficiales aplanadas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Localización Anatómica',
        items: [
          'Pelvis renal: Cálices, pelvis',
          'Uréteres: Toda su extensión',
          'Vejiga urinaria: Revestimiento completo',
          'Uretra proximal: Segmentos prostático y membranoso',
          'Exclusivamente en vías urinarias',
          'Desde cálices renales hasta uretra proximal',
          'No presente en uretra distal'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Funcionales',
        datos: [
          { label: 'Función principal', value: 'Distensión, impermeabilidad a orina' },
          { label: 'Barrera osmótica', value: 'Placas de uroplaquina (impermeabilidad)' },
          { label: 'Capacidad de estiramiento', value: 'Hasta 400% superficie' },
          { label: 'Resistencia química', value: 'Orina (pH 4.5-8, urea, sales)' },
          { label: 'Renovación celular', value: 'Lenta (meses a años)' },
          { label: 'Células en paraguas', value: '≥90% superficie apical' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Carcinoma urotelial: Neoplasia más común de vejiga (tabaco, aminas aromáticas)',
          'Cistitis: Inflamación vesical (E. coli, cistitis intersticial)',
          'Cistitis hemorrágica: Ciclofosfamida, radiación',
          'Carcinoma in situ (CIS): Displasia de alto grado, plano',
          'Hidronefrosis: Obstrucción ureteral, dilatación pelvis',
          'Reflujo vesicoureteral: Disfunción válvula ureterovesical',
          'Citología de orina: Detección de células neoplásicas (test de Papanicolaou)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Especializaciones de Membrana',
        items: [
          'Placas de uroplaquina: Cristales hexagonales 16 nm (UPIa, Ib, II, IIIa)',
          'Membrana apical asimétrica: Fosfolípidos únicos (impermeabilidad)',
          'Vesículas de descarte fusiformes: Reserva de membrana (distensión)',
          'Uniones estrechas: Barrera a paso de agua y solutos',
          'Citoqueratinas 7, 20: Marcadores diagnósticos',
          'Desmosomas y hemidesmosomas: Adhesión celular',
          'Glucosaminoglicanos: Capa protectora superficial',
          'Regeneración desde células basales: Multipotenciales'
        ]
      }
    ]
  },
  {
    id: 'glandular-exocrino',
    nombre: 'Epitelio Glandular Exocrino',
    subtitulo: 'Secretor · Conductos excretores · Secreción externa',
    icono: '💧',
    categorias: ['glandular', 'exocrino', 'secrecion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Clasificación Morfológica',
        items: [
          'Simples: Un conducto no ramificado (tubular, acinar, alveolar)',
          'Compuestas: Conducto ramificado (túbulo-acinar)',
          'Tubulares: Forma de tubo (glándulas intestinales)',
          'Acinares: Forma de saco (páncreas exocrino)',
          'Alveolares: Forma de saco grande (glándulas sebáceas)',
          'Ramificadas: Varios adenómeros en un conducto',
          'En espiral: Glándulas sudoríparas ecrinas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Ejemplos según Tipo',
        items: [
          'Tubulares simples: Glándulas intestinales (criptas de Lieberkühn)',
          'Acinares simples: Glándulas de Littré (uretra)',
          'Alveolares simples ramificadas: Glándulas sebáceas',
          'Tubulares simples en espiral: Glándulas sudoríparas ecrinas',
          'Túbulo-acinares compuestas: Glándulas salivales (parótida, submandibular)',
          'Acinares compuestas: Páncreas exocrino',
          'Tubulares compuestas: Glándulas de Brunner (duodeno)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Clasificación Funcional',
        datos: [
          { label: 'Merocrinas', value: 'Exocitosis (mayoría) - glándulas salivales, páncreas' },
          { label: 'Apocrinas', value: 'Parte apical celular - glándulas mamarias, sudoríparas apocrinas' },
          { label: 'Holocrinas', value: 'Célula completa - glándulas sebáceas' },
          { label: 'Serosas', value: 'Secreción acuosa, enzimática - páncreas, parótida' },
          { label: 'Mucosas', value: 'Secreción viscosa, mucinas - glándulas sublinguales' },
          { label: 'Mixtas', value: 'Serosas y mucosas - submandibular, glándulas bronquiales' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Fibrosis quística: Secreción espesa (mutación CFTR), páncreas, pulmón',
          'Síndrome de Sjögren: Autoinmune, destrucción glándulas salivales y lagrimales',
          'Pancreatitis crónica: Fibrosis, pérdida de acinos, insuficiencia exocrina',
          'Acné: Obstrucción glándulas sebáceas, inflamación (Propionibacterium)',
          'Hiperhidrosis: Hiperactividad glándulas sudoríparas ecrinas',
          'Cálculos salivales (sialolitiasis): Obstrucción conductos, inflamación',
          'Tumores de glándulas salivales: Adenoma pleomorfo, carcinoma mucoepidermoide'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Características Celulares',
        items: [
          'Células serosas: RER abundante, gránulos de zimógeno, núcleo basal',
          'Células mucosas: Aparato de Golgi prominente, mucígeno apical, núcleo basal',
          'Células mioepiteliales: Contráctiles, rodean acinos y conductos',
          'Conductos intercalares: Células cúbicas, centroacinares (páncreas)',
          'Conductos estriados: Invaginaciones basales, mitocondrias (transporte iónico)',
          'Conductos excretores: Epitelio estratificado, aumenta calibre',
          'Semilunas serosas de von Ebner: Complemento seroso en glándulas mixtas'
        ]
      }
    ]
  },
  {
    id: 'glandular-endocrino',
    nombre: 'Epitelio Glandular Endocrino',
    subtitulo: 'Secretor · Sin conductos · Secreción a sangre',
    icono: '🩸',
    categorias: ['glandular', 'endocrino', 'hormonas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Organización Estructural',
        items: [
          'Cordones celulares: Células dispuestas en cordones (paratiroides, adenohipófisis)',
          'Folículos: Estructura esférica (tiroides, folículos ováricos)',
          'Nidos celulares: Grupos aislados (islotes de Langerhans)',
          'Células individuales: Dispersas en epitelios (células APUD/neuroendocrinas)',
          'Red capilar fenestrada: Altamente vascularizado',
          'Sin conductos excretores: Secreción directa a sangre',
          'Células cromafines: Médula suprarrenal (catecolaminas)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '📍 Glándulas Endocrinas Principales',
        items: [
          'Hipófisis (adenohipófisis): Cordones, GH, ACTH, TSH, LH, FSH, PRL',
          'Tiroides: Folículos, T3, T4, calcitonina (células C)',
          'Paratiroides: Cordones, PTH (células principales)',
          'Suprarrenal (corteza): Cordones zonales (mineralocorticoides, glucocorticoides, andrógenos)',
          'Suprarrenal (médula): Nidos, adrenalina, noradrenalina',
          'Islotes de Langerhans: Insulina (β), glucagon (α), somatostatina (δ)',
          'Células de Leydig: Testosterona (intersticial testicular)',
          'Células de la granulosa/teca: Estrógenos, progesterona (ovario)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Tipos Celulares Endocrinos',
        datos: [
          { label: 'Células acidófilas', value: 'Adenohipófisis - somatotropas (GH), lactotropas (PRL)' },
          { label: 'Células basófilas', value: 'Adenohipófisis - corticotropas, tirotropas, gonadotropas' },
          { label: 'Células foliculares', value: 'Tiroides - tiroglobulina, T3/T4' },
          { label: 'Células C (parafoliculares)', value: 'Tiroides - calcitonina' },
          { label: 'Células principales', value: 'Paratiroides - PTH' },
          { label: 'Células cromafines', value: 'Médula suprarrenal - catecolaminas' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Diabetes mellitus tipo 1: Destrucción autoinmune células β, déficit insulina',
          'Hipertiroidismo (Graves): Autoanticuerpos contra receptor TSH',
          'Hipotiroidismo: Déficit T3/T4 (tiroiditis de Hashimoto, déficit yodo)',
          'Hiperparatiroidismo: Adenoma paratiroideo, hipercalcemia',
          'Síndrome de Cushing: Hipercortisolismo (adenoma, hiperplasia suprarrenal)',
          'Feocromocitoma: Tumor médula suprarrenal, crisis hipertensivas',
          'Acromegalia: Exceso GH (adenoma hipofisario)',
          'Adenomas hipofisarios: Prolactinoma (más común), no funcionantes'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismos de Secreción',
        items: [
          'Secreción regulada: Gránulos secretores, estimulación hormonal/neural',
          'Exocitosis: Fusión de vesículas con membrana plasmática',
          'Hormonas peptídicas: Almacenadas en gránulos (insulina, GH, ACTH)',
          'Hormonas esteroideas: Síntesis de novo, no almacenadas (cortisol, testosterona)',
          'Hormonas tiroideas: Almacenadas extracelularmente (tiroglobulina)',
          'Retroalimentación negativa: Eje hipotálamo-hipófisis-órgano diana',
          'Células APUD: Sistema neuroendocrino difuso (gastrina, serotonina, CCK)',
          'Capilares fenestrados: Facilitación paso de hormonas a sangre'
        ]
      }
    ]
  },
  {
    id: 'especializaciones-apicales',
    nombre: 'Especializaciones de Membrana Apical',
    subtitulo: 'Microvellosidades · Estereocilios · Cilios',
    icono: '🧬',
    categorias: ['especializaciones', 'membrana', 'funcional'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Microvellosidades',
        items: [
          'Prolongaciones citoplasmáticas de 1-2 μm de altura',
          'Núcleo de actina: 20-30 filamentos por microvellosidad',
          'Borde en cepillo: Intestino delgado (3,000 microvellosidades/célula)',
          'Chapa estriada: Túbulo contorneado proximal renal',
          'Aumento de superficie: 20-30 veces',
          'Glucocáliz: Capa rica en carbohidratos (enzimas, absorción)',
          'Villo: Fructosa, sacarasa, lactasa, aminopeptidasas',
          'Función: Absorción (nutrientes, iones, agua)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Estereocilios',
        items: [
          'Prolongaciones largas (hasta 120 μm), inmóviles',
          'No son cilios verdaderos (sin axonema 9+2)',
          'Núcleo de actina: Similares a microvellosidades gigantes',
          'Localización: Epidídimo, conducto deferente',
          'Células ciliadas del oído: Mecanotransducción (no son estereocilios verdaderos)',
          'Función: Absorción, reabsorción de fluidos',
          'Ramificados en ápice (epidídimo)',
          'Maduración de espermatozoides (epidídimo)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Cilios Móviles',
        datos: [
          { label: 'Estructura', value: 'Axonema 9+2 (9 dobletes + 2 centrales)' },
          { label: 'Longitud', value: '5-10 μm' },
          { label: 'Número por célula', value: '200-300 cilios' },
          { label: 'Batido', value: '10-20 Hz, coordinado' },
          { label: 'Motor molecular', value: 'Dineína (ATP-dependiente)' },
          { label: 'Localización', value: 'Vías respiratorias, trompas, epidídimo' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Enfermedad celíaca: Atrofia de microvellosidades intestinales, malabsorción',
          'Síndrome de Kartagener: Dineína ausente/defectuosa, cilios inmóviles, situs inversus',
          'Discinesia ciliar primaria: Infecciones respiratorias recurrentes, bronquiectasias',
          'Enfermedad de inclusión de microvellosidades: Diarrea congénita, defecto genético',
          'Sordera genética: Defectos en estereocilios del órgano de Corti',
          'Hidrocefalia: Disfunción cilios ependimarios, acúmulo LCR',
          'Infertilidad masculina: Defectos flagelares espermatozoides (similar a cilios)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Componentes Moleculares',
        items: [
          'Microvellosidades - actina: Fimbrina, villina, miosina I',
          'Microvellosidades - membrana: Transportadores (SGLT1, aminoácidos)',
          'Cilios - dineína: Brazos externos e internos (batido)',
          'Cilios - nexina: Conexión entre dobletes (coordinación)',
          'Cilios - radios radiales: Conexión dobletes-par central',
          'Cuerpo basal: Centríolo modificado, 9 tripletes',
          'Zona de transición: Conexión cuerpo basal-axonema',
          'Rootlets ciliares: Filamentos estriados (anclaje)'
        ]
      }
    ]
  },
  {
    id: 'uniones-celulares',
    nombre: 'Complejos de Unión Intercelular',
    subtitulo: 'Zonula occludens · Zonula adherens · Desmosomas',
    icono: '🔗',
    categorias: ['especializaciones', 'union', 'adhesion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Uniones Estrechas (Tight Junctions)',
        items: [
          'Zonula occludens: Cinturón continuo en región apical',
          'Sellado de espacio intercelular: Barrera paracelular',
          'Proteínas transmembranales: Claudinas, ocludinas, JAMs',
          'Proteínas adaptadoras: ZO-1, ZO-2, ZO-3 (unión a actina)',
          'Función: Control permeabilidad, polaridad celular',
          'Resistencia transepitelial: Variable según tejido',
          'Epitelios "apretados": Vejiga (urotelio), túbulo distal',
          'Epitelios "sueltos": Intestino delgado, túbulo proximal'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Uniones Adherentes (Adherens Junctions)',
        items: [
          'Zonula adherens: Cinturón continuo bajo uniones estrechas',
          'Proteínas transmembranales: E-cadherina (Ca²⁺-dependiente)',
          'Proteínas adaptadoras: β-catenina, α-catenina (unión a actina)',
          'Unión a citoesqueleto: Filamentos de actina',
          'Función: Adhesión mecánica, señalización',
          'Cinturón de adhesión: Confiere resistencia mecánica',
          'Importante en morfogénesis: Migración celular, epitelización',
          'Pérdida en cáncer: Transición epitelio-mesénquima'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Desmosomas y Hemidesmosomas',
        datos: [
          { label: 'Desmosomas (macula adherens)', value: 'Adhesión célula-célula, filamentos intermedios' },
          { label: 'Proteínas transmembranales', value: 'Desmogleínas, desmocolinas (cadherinas)' },
          { label: 'Placa densa citoplasmática', value: 'Desmoplaquina, placofilina, placoglobina' },
          { label: 'Filamentos intermedios', value: 'Citoqueratinas (epitelios)' },
          { label: 'Hemidesmosomas', value: 'Adhesión célula-matriz extracelular' },
          { label: 'Proteínas hemidesmosomas', value: 'Integrina α6β4, colágeno XVII, plectina' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Pénfigo vulgar: Autoanticuerpos anti-desmogleína 3, acantólisis (separación celular)',
          'Pénfigo foliáceo: Autoanticuerpos anti-desmogleína 1, ampollas superficiales',
          'Epidermólisis bullosa: Mutaciones en hemidesmosomas, ampollas con trauma mínimo',
          'Carcinoma invasivo: Pérdida E-cadherina, disminución adhesión célula-célula',
          'Enfermedad inflamatoria intestinal: Disfunción barrera (tight junctions)',
          'Síndrome nefrótico: Alteración podocitos (slit diaphragm - símil tight junction)',
          'Toxina Vibrio cholerae: Aumenta permeabilidad tight junctions'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Uniones Comunicantes (Gap Junctions)',
        items: [
          'Conexones: 6 conexinas forman canal',
          'Comunicación directa: Iones, moléculas <1 kDa',
          'Acoplamiento eléctrico: Músculo cardíaco, liso',
          'Acoplamiento metabólico: Coordinación celular',
          'Localización: Mayoría de tejidos (excepto músculo esquelético, eritrocitos)',
          'Regulación: pH, Ca²⁺, fosforilación',
          'Función: Homeostasis, desarrollo, señalización',
          'Conexinas: Cx43 (ubicua), Cx26 (oído), Cx32 (hígado)'
        ]
      }
    ]
  }
];
