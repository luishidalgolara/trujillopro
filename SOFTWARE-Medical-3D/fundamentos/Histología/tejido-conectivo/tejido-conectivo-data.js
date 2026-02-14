// ═══════════════════════════════════════════════════════════
// TEJIDO CONECTIVO DATA - Base de datos de tejidos conectivos
// ═══════════════════════════════════════════════════════════

const TEJIDO_CONECTIVO_DATA = [
  {
    id: "conectivo-laxo-areolar",
    nombre: "Tejido Conectivo Laxo Areolar",
    icono: "🧬",
    subtitulo: "Tejido de soporte general y defensa",
    categorias: ["laxo-denso", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Fibroblastos: células principales productoras de matriz extracelular",
          "Fibras colágenas tipo I dispersas (orientación aleatoria)",
          "Fibras elásticas formando red laxa tridimensional",
          "Sustancia fundamental amorfa: GAGs (ácido hialurónico, condroitín sulfato)",
          "Células residentes: macrófagos, mastocitos, adipocitos, células plasmáticas",
          "Células migratorias: linfocitos, neutrófilos, eosinófilos",
          "Espacios amplios entre fibras permitiendo difusión"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Soporte estructural flexible para órganos y tejidos epiteliales",
          "Primera línea de defensa inmunológica (mastocitos y macrófagos)",
          "Reservorio de agua, sales y metabolitos",
          "Medio para difusión de oxígeno y nutrientes desde capilares",
          "Reparación tisular y cicatrización de heridas",
          "Amortiguación mecánica de órganos"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Lámina propia debajo de epitelios (tracto digestivo, respiratorio)",
          "Dermis papilar de la piel",
          "Alrededor de vasos sanguíneos y nervios",
          "Entre haces musculares",
          "Mesenterio y omento",
          "Tejido subcutáneo superficial"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Fibras dominantes", value: "Colágeno tipo I (50-60%), fibras elásticas (10-15%)" },
          { label: "Proteoglicanos", value: "Versicano, decorina, biglicano" },
          { label: "Glicosaminoglicanos", value: "Ácido hialurónico, condroitín-4-sulfato, dermatán sulfato" },
          { label: "Densidad celular", value: "Moderada (fibroblastos predominantes)" },
          { label: "Proporción matriz/células", value: "Equilibrada con espacios amplios" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Edema: acumulación patológica de líquido en sustancia fundamental (insuficiencia cardíaca, renal)",
          "Escorbuto: deficiencia de vitamina C impide hidroxilación de prolina/lisina en colágeno, causa fragilidad capilar y hemorragias",
          "Inflamación aguda: infiltración masiva de neutrófilos y exudado proteico",
          "Síndrome de Ehlers-Danlos: mutaciones en colágeno tipo I/III causan hiperextensibilidad cutánea",
          "Fibrosis: depósito excesivo de colágeno por activación crónica de fibroblastos"
        ]
      }
    ]
  },
  {
    id: "conectivo-laxo-reticular",
    nombre: "Tejido Conectivo Laxo Reticular",
    icono: "🕸️",
    subtitulo: "Soporte estructural de órganos linfoides",
    categorias: ["laxo-denso", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Células reticulares: fibroblastos especializados productores de fibras reticulares",
          "Fibras reticulares (colágeno tipo III): red tridimensional delicada",
          "Glucoproteínas adheridas a fibras reticulares",
          "Linfocitos, células plasmáticas y macrófagos en los espacios",
          "Tinción especial: impregnación argéntica (fibras negras)",
          "Matriz mínima, espacio ocupado principalmente por células libres"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Soporte estructural de órganos hematopoyéticos y linfoides",
          "Marco arquitectónico para proliferación y maduración de células sanguíneas",
          "Filtración de linfa y sangre (bazo, ganglios linfáticos)",
          "Ambiente microambiental para interacciones inmunológicas",
          "Retención selectiva de antígenos y células presentadoras"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Médula ósea roja (estroma hematopoyético)",
          "Ganglios linfáticos (corteza y médula)",
          "Bazo (pulpa blanca y roja)",
          "Timo (corteza y médula)",
          "Hígado (espacio de Disse alrededor de hepatocitos)",
          "Mucosa intestinal (lámina propia con tejido linfoide)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Fibras exclusivas", value: "Colágeno tipo III (fibras reticulares)" },
          { label: "Diámetro fibrilar", value: "20-50 nm (menor que colágeno tipo I)" },
          { label: "Glucoproteínas asociadas", value: "Laminina, fibronectina, colágeno IV" },
          { label: "Tinción histológica", value: "PAS positivo, impregnación argéntica positiva" },
          { label: "Células asociadas", value: "Células reticulares (CAR-25+), macrófagos CD68+" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Mielofibrosis: reemplazo de médula ósea por tejido fibroso, pérdida de hematopoyesis",
          "Linfomas: proliferación neoplásica de linfocitos altera arquitectura reticular",
          "Esplenomegalia: hipertrofia de red reticular por hemólisis excesiva o almacenamiento patológico",
          "Síndrome de Felty: destrucción de red reticular esplénica en artritis reumatoide",
          "Enfermedad de Gaucher: acumulación de glucocerebrósidos en macrófagos reticulares"
        ]
      }
    ]
  },
  {
    id: "conectivo-denso-regular",
    nombre: "Tejido Conectivo Denso Regular",
    icono: "💪",
    subtitulo: "Resistencia tensil unidireccional",
    categorias: ["laxo-denso", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Haces paralelos de fibras colágenas tipo I (orientación unidireccional)",
          "Fibroblastos aplanados (fibrocitos) entre haces colágenos",
          "Matriz extracelular mínima",
          "Fibras organizadas en fascículos primarios, secundarios y terciarios",
          "Vascularización escasa (nutrición por difusión)",
          "Ondulación crimping de fibras colágenas en reposo"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Resistencia máxima a fuerzas de tracción unidireccionales",
          "Transmisión de fuerzas musculares a huesos (tendones)",
          "Conexión hueso-hueso para estabilidad articular (ligamentos)",
          "Almacenamiento de energía elástica durante movimiento",
          "Protección de globo ocular manteniendo forma (córnea)",
          "Resistencia a deformación con mínimo peso estructural"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Tendones (músculo-hueso): tendón de Aquiles, rotuliano, supraespinoso",
          "Ligamentos (hueso-hueso): cruzados, colaterales, inguinal",
          "Aponeurosis: plantar, palmar, epicraneal",
          "Córnea: láminas de colágeno ortogonal (transparencia óptica)",
          "Fascias musculares profundas"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Composición fibrilar", value: "80-90% colágeno tipo I" },
          { label: "Proteoglicanos", value: "Decorina, biglicano, fibromodulina (regulan fibrilogénesis)" },
          { label: "Glicoproteínas", value: "Tenascina-C, fibronectina" },
          { label: "Diámetro de fibrillas", value: "50-500 nm (heterogéneo para resistencia)" },
          { label: "Resistencia tensil", value: "50-100 MPa (comparable a acero estructural)" },
          { label: "Módulo de Young", value: "1-2 GPa en tendones" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Tendinopatías: degeneración colágena por sobrecarga mecánica repetitiva (epicondilitis, manguito rotador)",
          "Ruptura de ligamento cruzado anterior (LCA): trauma deportivo, requiere reconstrucción quirúrgica",
          "Síndrome del túnel carpiano: engrosamiento del ligamento transverso comprime nervio mediano",
          "Queratocono: adelgazamiento progresivo de córnea por degradación de colágeno",
          "Fluoroquinolonas: antibióticos asociados a ruptura tendinosa por inhibición de síntesis de colágeno"
        ]
      }
    ]
  },
  {
    id: "conectivo-denso-irregular",
    nombre: "Tejido Conectivo Denso Irregular",
    icono: "🛡️",
    subtitulo: "Resistencia multidireccional",
    categorias: ["laxo-denso", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Haces gruesos de colágeno tipo I orientados en múltiples direcciones",
          "Fibras entrelazadas formando red tridimensional",
          "Fibroblastos dispersos entre haces colágenos",
          "Fibras elásticas intercaladas (10-20% en algunas localizaciones)",
          "Sustancia fundamental escasa",
          "Mayor densidad celular que tejido denso regular"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Resistencia a tensión multidireccional",
          "Protección mecánica de órganos internos",
          "Barrera física contra invasión microbiana",
          "Soporte estructural manteniendo forma de órganos",
          "Resistencia a desgarro y punción",
          "Anclaje de epidermis a tejidos profundos"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Dermis reticular de la piel (capa profunda)",
          "Cápsulas fibrosas de órganos (hígado, bazo, riñón, testículo)",
          "Periósteo y pericondrio",
          "Cápsulas articulares",
          "Adventicia de grandes vasos sanguíneos",
          "Válvulas cardíacas (capa fibrosa)",
          "Duramadre (meninge externa)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Composición", value: "70-80% colágeno tipo I, 10-15% colágeno tipo III" },
          { label: "Elastina", value: "5-20% (variable según localización)" },
          { label: "Proteoglicanos", value: "Decorina, versicano, dermatán sulfato" },
          { label: "Organización", value: "Haces de 10-40 μm en orientación aleatoria" },
          { label: "Resistencia", value: "Isotrópica (igual en todas direcciones)" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Queloides y cicatrices hipertróficas: depósito excesivo de colágeno durante cicatrización anormal",
          "Síndrome de Marfan: mutaciones en fibrilina-1 debilitan componente elástico de dermis y vasos",
          "Dermatosparaxis: deficiencia de procolágeno N-peptidasa causa piel extremadamente frágil",
          "Úlceras por presión: isquemia causa necrosis de dermis reticular en pacientes inmovilizados",
          "Quemaduras de tercer grado: destrucción completa de dermis reticular requiere injertos"
        ]
      }
    ]
  },
  {
    id: "adiposo-blanco",
    nombre: "Tejido Adiposo Blanco",
    icono: "🔵",
    subtitulo: "Reserva energética y endocrina",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Adipocitos uniloculares: célula con única gota lipídica grande (95% del volumen celular)",
          "Núcleo periférico desplazado (aspecto de 'anillo de sello')",
          "Citoplasma reducido a banda delgada periférica",
          "Lámina basal rodeando cada adipocito",
          "Capilares sanguíneos abundantes entre adipocitos",
          "Estroma de tejido conectivo laxo con fibras reticulares (colágeno tipo III)",
          "Células precursoras: preadipocitos y células mesenquimales"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Almacenamiento de energía como triglicéridos (9 kcal/g)",
          "Aislamiento térmico (capa subcutánea)",
          "Amortiguación mecánica (órbitas, palmas, plantas)",
          "Órgano endocrino: secreción de leptina, adiponectina, resistina",
          "Regulación de metabolismo sistémico y sensibilidad a insulina",
          "Fuente de ácidos grasos libres durante ayuno/ejercicio",
          "Protección de órganos vitales"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Tejido subcutáneo (hipodermis) de todo el cuerpo",
          "Grasa visceral: omento mayor, mesenterio, retroperitoneo",
          "Médula ósea amarilla (adultos)",
          "Alrededor de riñones (grasa perirrenal)",
          "Órbitas oculares (cojinete retro-ocular)",
          "Palmas de manos y plantas de pies (almohadillas)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Contenido lipídico", value: "Triglicéridos 95%, fosfolípidos, colesterol" },
          { label: "Lipogénesis", value: "Insulina activa ACC, FAS (síntesis de ácidos grasos)" },
          { label: "Lipólisis", value: "Catecolaminas, glucagón activan lipasa sensible a hormonas (HSL)" },
          { label: "Adipocinas principales", value: "Leptina (saciedad), adiponectina (sensibilidad insulina)" },
          { label: "Receptores", value: "Insulina (GLUT4), β3-adrenérgicos, PPAR-γ" },
          { label: "Marcadores celulares", value: "Perilipina, FABP4/aP2, adiponectina" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Obesidad: hiperplasia e hipertrofia de adipocitos, resistencia a insulina, síndrome metabólico",
          "Diabetes tipo 2: disfunción adipocitaria causa resistencia periférica a insulina",
          "Lipodistrofias: pérdida patológica de tejido adiposo (congénita o adquirida por VIH)",
          "Lipomas: tumores benignos de adipocitos maduros (más comunes del tejido blando)",
          "Inflamación crónica de bajo grado: adipocitos hipertróficos secretan TNF-α, IL-6 (aterosclerosis)",
          "Liposucción: remoción quirúrgica de grasa subcutánea (estética, no terapéutica)"
        ]
      }
    ]
  },
  {
    id: "adiposo-pardo",
    nombre: "Tejido Adiposo Pardo",
    icono: "🟤",
    subtitulo: "Termogénesis sin escalofríos",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Adipocitos multiloculares: múltiples gotas lipídicas pequeñas",
          "Núcleo central (no periférico como en adiposo blanco)",
          "Citoplasma abundante con mitocondrias numerosas",
          "Mitocondrias ricas en proteína desacoplante 1 (UCP1/termogenina)",
          "Crestas mitocondriales densamente empaquetadas",
          "Vascularización extremadamente rica (color pardo por mioglobina)",
          "Inervación simpática abundante (noradrenalina)"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Termogénesis sin escalofríos (producción de calor sin contracción muscular)",
          "Regulación de temperatura corporal en neonatos",
          "Oxidación de ácidos grasos para generar calor (no ATP)",
          "Protección contra hipotermia en recién nacidos",
          "Gasto energético adaptativo en adultos (exposición al frío)",
          "Participación en homeostasis metabólica"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Región interescapular (neonatos abundante, adultos reducido)",
          "Región cervical profunda",
          "Región axilar",
          "Mediastino superior (alrededor de grandes vasos)",
          "Región perirrenal (polo superior)",
          "En adultos: depósitos pequeños activables por frío crónico"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Proteína clave", value: "UCP1 (termogenina) - desacoplador mitocondrial" },
          { label: "Mecanismo", value: "UCP1 permite fuga de protones, energía como calor no ATP" },
          { label: "Activación", value: "Noradrenalina → β3-receptores → lipólisis → termogénesis" },
          { label: "Marcadores", value: "UCP1, PGC-1α, PRDM16, Cidea" },
          { label: "Densidad mitocondrial", value: "3-5 veces mayor que adiposo blanco" },
          { label: "Capacidad termogénica", value: "300 W/kg de tejido (máximo estimulado)" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Hipotermia neonatal: deficiencia o disfunción de grasa parda causa termorregulación inadecuada",
          "Activación en adultos: exposición crónica al frío induce beige/brite adipocytes (fenotipo intermedio)",
          "Potencial terapéutico: activación de UCP1 para combatir obesidad y diabetes (investigación activa)",
          "PET-CT: grasa parda aparece como captación intensa de FDG-18F (puede confundirse con tumor)",
          "Feocromocitoma: exceso de catecolaminas activa masivamente grasa parda (pérdida de peso, hipertermia)",
          "Bebés prematuros: déficit de grasa parda aumenta mortalidad por hipotermia"
        ]
      }
    ]
  },
  {
    id: "cartilago-hialino",
    nombre: "Cartílago Hialino",
    icono: "💎",
    subtitulo: "Soporte flexible y superficie articular",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Condrocitos en lagunas dentro de matriz extracelular",
          "Grupos isógenos: 2-8 células derivadas de mitosis reciente",
          "Matriz territorial: rica en GAGs alrededor de lagunas (basófila)",
          "Matriz interterritorial: más fibrilar, menos GAGs",
          "Fibras colágenas tipo II (enmascaradas por matriz amorfa)",
          "Pericondrio bicapa: externa fibrosa, interna condrogénica",
          "Avascular (nutrición por difusión desde pericondrio)"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Soporte estructural flexible (esqueleto fetal, costillas, tráquea)",
          "Superficie articular de bajo fricción (lubricada por líquido sinovial)",
          "Absorción de impactos en articulaciones",
          "Crecimiento longitudinal de huesos largos (placa epifisaria)",
          "Molde para osificación endocondral durante desarrollo",
          "Conducción del aire (anillos traqueales y bronquiales)"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Cartílagos costales (unión costilla-esternón)",
          "Anillos traqueales y bronquiales",
          "Cartílagos nasales",
          "Cartílago articular de articulaciones sinoviales (rodilla, cadera, hombro)",
          "Placa epifisaria (cartílago de crecimiento en huesos largos)",
          "Esqueleto fetal (antes de osificación)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Colágeno principal", value: "Tipo II (90-95% del colágeno total)" },
          { label: "Colágenos menores", value: "Tipo IX (interfibrilar), tipo XI (nucleador fibrilar)" },
          { label: "Proteoglicanos", value: "Agrecano (condroitín sulfato, queratán sulfato)" },
          { label: "Glicoproteínas", value: "Fibronectina, laminina, tenascina" },
          { label: "Agua", value: "60-80% del peso húmedo" },
          { label: "Presión osmótica", value: "GAGs aniónicos retienen agua, resistencia a compresión" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Osteoartritis: degeneración de cartílago articular, pérdida de agrecano, fisuras en matriz",
          "Condromalacia rotuliana: reblandecimiento de cartílago patelar, dolor anterior de rodilla",
          "Acondroplasia: mutación FGFR3 inhibe proliferación condrocítica en placa epifisaria, enanismo",
          "Policondritis recidivante: autoinmune, destrucción de cartílago (oreja, nariz, tráquea)",
          "Escorbuto: deficiencia vitamina C causa matriz defectuosa, hemorragias pericondrales",
          "Capacidad regenerativa limitada: lesiones cartílago articular no cicatrizan (avascular)"
        ]
      }
    ]
  },
  {
    id: "cartilago-elastico",
    nombre: "Cartílago Elástico",
    icono: "🎺",
    subtitulo: "Soporte flexible con recuperación de forma",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Condrocitos en lagunas (similar a hialino pero más pequeños)",
          "Red densa de fibras elásticas entrelazadas con colágeno tipo II",
          "Fibras elásticas visibles con tinción de orceína o resorcina-fucsina",
          "Matriz menos abundante que cartílago hialino",
          "Pericondrio bien desarrollado",
          "Mayor celularidad que cartílago hialino",
          "Color amarillento en fresco (por elastina)"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Soporte estructural con gran flexibilidad",
          "Recuperación de forma original después de deformación",
          "Mantenimiento de permeabilidad de conductos (oreja, trompa de Eustaquio)",
          "Flexibilidad sin colapso (epiglotis durante deglución)",
          "Resistencia a deformaciones repetitivas"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Pabellón auricular (oreja externa)",
          "Conducto auditivo externo",
          "Trompa de Eustaquio (auditiva)",
          "Epiglotis",
          "Cartílagos cuneiformes y corniculados de laringe",
          "Porción cartilaginosa del tabique nasal"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Componentes fibrilares", value: "Colágeno tipo II + red densa de fibras elásticas" },
          { label: "Elastina", value: "Proteína altamente hidrofóbica (ricos en valina, prolina)" },
          { label: "Fibrilina", value: "Microfibrillas de fibrilina-1 como andamiaje para elastina" },
          { label: "Proteoglicanos", value: "Menor concentración de agrecano que hialino" },
          { label: "Tinción característica", value: "Orceína (+), resorcina-fucsina (+)" },
          { label: "Proporción elástica", value: "Fibras elásticas ocupan 30-40% del volumen matricial" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Policondritis recidivante: destrucción autoinmune de cartílago elástico (oreja roja, edema pabellón auricular)",
          "Síndrome de Marfan: mutación fibrilina-1 debilita fibras elásticas, deformidad de pabellón auricular",
          "Otohematoma: hemorragia entre pericondrio y cartílago (deportes de contacto), riesgo de 'oreja de coliflor'",
          "Colapso de trompa de Eustaquio: disfunción cartílago elástico causa otitis media serosa crónica",
          "Envejecimiento: calcificación progresiva de cartílago elástico auricular (rigidez)",
          "Condritis auricular: infección bacteriana (Pseudomonas) en perforación de oreja"
        ]
      }
    ]
  },
  {
    id: "cartilago-fibroso",
    nombre: "Cartílago Fibroso (Fibrocartílago)",
    icono: "⚙️",
    subtitulo: "Resistencia tensil y absorción de impactos",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Condrocitos en lagunas alineados en filas entre haces colágenos",
          "Haces densos de colágeno tipo I (predominante, no tipo II)",
          "Transición gradual entre tejido conectivo denso y cartílago hialino",
          "Ausencia de pericondrio (se continúa con tejido conectivo adyacente)",
          "Matriz territorial escasa alrededor de condrocitos",
          "Menor concentración de GAGs que cartílago hialino",
          "Aspecto histológico intermedio entre cartílago y tendón"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Absorción de impactos compresivos en articulaciones de carga",
          "Resistencia a fuerzas tensiles y de cizallamiento",
          "Amortiguación de presión entre vértebras (discos intervertebrales)",
          "Profundización de cavidades articulares (labrum glenoideo, acetabular)",
          "Unión resistente de tendones/ligamentos a hueso",
          "Distribución de fuerzas en articulaciones complejas"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Discos intervertebrales (núcleo pulposo + anillo fibroso)",
          "Meniscos de rodilla (medial y lateral)",
          "Sínfisis púbica",
          "Discos articulares de articulación temporomandibular (ATM)",
          "Labrum glenoideo (hombro) y acetabular (cadera)",
          "Inserción de tendones en hueso (entesis)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Colágeno dominante", value: "Tipo I (80-90%), no tipo II como otros cartílagos" },
          { label: "Proteoglicanos", value: "Agrecano (reducido), decorina, biglicano" },
          { label: "GAGs", value: "Condroitín sulfato, dermatán sulfato (menor que hialino)" },
          { label: "Resistencia compresiva", value: "5-10 MPa (intermedia)" },
          { label: "Resistencia tensil", value: "10-20 MPa (mayor que hialino)" },
          { label: "Contenido acuoso", value: "60-70% (menor que hialino)" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Hernia discal (núcleo pulposo): protrusión de núcleo a través de anillo fibroso, compresión radicular",
          "Degeneración discal: pérdida de agua y GAGs con edad, colapso de espacio intervertebral, dolor lumbar",
          "Rotura de menisco: trauma rotacional de rodilla, dolor, bloqueo articular, requiere meniscectomía",
          "Osteítis púbica: inflamación de sínfisis púbica (deportistas, embarazo)",
          "Lesión SLAP: desgarro del labrum superior glenoideo (lanzadores, deportes overhead)",
          "Capacidad regenerativa limitada: reparación con fibrocartílago inferior al original"
        ]
      }
    ]
  },
  {
    id: "oseo-compacto",
    nombre: "Tejido Óseo Compacto (Cortical)",
    icono: "🦴",
    subtitulo: "Estructura resistente y protectora",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Osteonas (sistemas de Havers): unidad estructural cilíndrica",
          "Canal de Havers central: vaso sanguíneo y nervio",
          "Laminillas concéntricas (4-20) de matriz ósea mineralizada alrededor del canal",
          "Osteocitos en lagunas conectados por canalículos (uniones gap)",
          "Canales de Volkmann: comunicación transversal entre canales de Havers",
          "Laminillas circunferenciales externas e internas",
          "Laminillas intersticiales: restos de osteonas antiguas (remodelación)",
          "Líneas de cemento: bordes de osteonas (bajo contenido mineral)"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Soporte mecánico del cuerpo (resistencia a compresión, torsión, flexión)",
          "Protección de órganos vitales (cráneo, caja torácica, pelvis)",
          "Anclaje para músculos esqueléticos (palancas biomecánicas)",
          "Reservorio de calcio y fosfato (homeostasis mineral)",
          "Producción de células sanguíneas (médula ósea en cavidad medular)",
          "Transmisión de fuerzas sin fractura (resistencia ~170 MPa)"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Diáfisis de huesos largos (fémur, tibia, húmero, radio)",
          "Capa externa de huesos planos (cráneo, escápula, ilion)",
          "Superficie externa de vértebras",
          "Costillas (capa cortical externa)",
          "80% del esqueleto adulto"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Composición orgánica", value: "Colágeno tipo I (90%), osteocalcina, osteopontina, sialoproteína ósea" },
          { label: "Fase inorgánica", value: "Hidroxiapatita Ca₁₀(PO₄)₆(OH)₂ (65% peso seco)" },
          { label: "Densidad", value: "1.8-2.0 g/cm³" },
          { label: "Porosidad", value: "5-10% (vs 50-90% en esponjoso)" },
          { label: "Módulo de Young", value: "17-20 GPa (comparable a concreto)" },
          { label: "Células", value: "Osteoblastos (formación), osteoclastos (resorción), osteocitos (mantenimiento)" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Osteoporosis: disminución de densidad mineral ósea, porosidad aumentada, fracturas de fragilidad (cadera, vértebras)",
          "Enfermedad de Paget: remodelación ósea desorganizada, hueso denso pero débil (mosaico de osteonas)",
          "Osteogénesis imperfecta: mutaciones en colágeno I, huesos frágiles con fracturas múltiples",
          "Osteomielitis: infección bacteriana (Staphylococcus aureus), secuestro óseo, osteonecrosis",
          "Fracturas de estrés: microfracturas por sobrecarga repetitiva (militares, corredores)",
          "Osteopetrosis: deficiencia de osteoclastos, hueso excesivamente denso, fracturas patológicas"
        ]
      }
    ]
  },
  {
    id: "oseo-esponjoso",
    nombre: "Tejido Óseo Esponjoso (Trabecular)",
    icono: "🧽",
    subtitulo: "Estructura liviana y metabólicamente activa",
    categorias: ["especializado", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Trabéculas (espículas óseas) orientadas según líneas de estrés mecánico",
          "Red tridimensional de trabéculas delgadas (100-300 μm espesor)",
          "Espacios intertrabecular ocupados por médula ósea roja (hematopoyética)",
          "Laminillas irregulares (no osteonas organizadas)",
          "Osteocitos en lagunas dentro de trabéculas",
          "Superficie ósea expuesta muy alta (alta tasa de remodelación)",
          "Sin canales de Havers (nutrición directa desde médula)"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Reducción de peso óseo manteniendo resistencia estructural",
          "Distribución de fuerzas compresivas (arquitectura según ley de Wolff)",
          "Microambiente para hematopoyesis (médula ósea roja)",
          "Reserva metabólica de calcio (remodelación rápida)",
          "Absorción de impactos en articulaciones",
          "Adaptación dinámica a cargas mecánicas"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Epífisis de huesos largos (fémur proximal/distal, húmero)",
          "Cuerpos vertebrales",
          "Huesos planos del cráneo (diploe)",
          "Esternón",
          "Costillas (porción central)",
          "Pelvis (ilion, isquion, pubis)",
          "20% del esqueleto adulto"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Composición", value: "Idéntica a hueso compacto (colágeno I + hidroxiapatita)" },
          { label: "Porosidad", value: "50-90% (vs 5-10% en compacto)" },
          { label: "Superficie/volumen", value: "10-30 mm⁻¹ (20x mayor que compacto)" },
          { label: "Remodelación", value: "Tasa 5-10 veces mayor que hueso compacto" },
          { label: "Resistencia", value: "2-12 MPa (menor que compacto, suficiente para cargas compresivas)" },
          { label: "Densidad aparente", value: "0.1-1.0 g/cm³ (variable según porosidad)" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Osteoporosis: pérdida preferencial de hueso trabecular, fracturas vertebrales por compresión, fractura de Colles",
          "Metástasis óseas: cánceres (mama, próstata, pulmón) colonizan médula ósea trabecular (osteolíticas/osteoblásticas)",
          "Mieloma múltiple: proliferación de células plasmáticas en médula, lesiones líticas 'en sacabocados'",
          "Aplasia medular: falla de hematopoyesis en médula ósea roja (anemia, leucopenia, trombocitopenia)",
          "Leucemia aguda: infiltración de médula ósea por blastos, desplaza hematopoyesis normal",
          "Biopsia de médula ósea: punción de cresta ilíaca (hueso esponjoso) para diagnóstico hematológico"
        ]
      }
    ]
  },
  {
    id: "sangre",
    nombre: "Sangre (Tejido Conectivo Líquido)",
    icono: "🩸",
    subtitulo: "Transporte y defensa sistémica",
    categorias: ["liquido", "todos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "🔬 Estructura",
        items: [
          "Plasma (55% del volumen): matriz extracelular líquida",
          "Elementos formes (45%): eritrocitos, leucocitos, plaquetas",
          "Eritrocitos (4.5-5.5 millones/μL): discos bicóncavos anucleados, ricos en hemoglobina",
          "Leucocitos (4,000-11,000/μL): granulocitos (neutrófilos, eosinófilos, basófilos) y agranulocitos (linfocitos, monocitos)",
          "Plaquetas (150,000-400,000/μL): fragmentos megacariocíticos, hemostasia",
          "Proteínas plasmáticas: albúmina (60%), globulinas (35%), fibrinógeno (4%)",
          "Electrolitos, nutrientes, gases, productos de desecho"
        ]
      },
      {
        tipo: "lista",
        titulo: "⚡ Función",
        items: [
          "Transporte de oxígeno (hemoglobina) y CO₂ (bicarbonato, carbamino)",
          "Distribución de nutrientes (glucosa, aminoácidos, lípidos)",
          "Eliminación de desechos metabólicos (urea, creatinina, bilirrubina)",
          "Defensa inmunológica (leucocitos, anticuerpos IgG, IgM, IgA)",
          "Hemostasia y coagulación (plaquetas, factores de coagulación)",
          "Termorregulación (redistribución de calor)",
          "Homeostasis de pH (sistemas buffer)"
        ]
      },
      {
        tipo: "lista",
        titulo: "📍 Localización",
        items: [
          "Sistema cardiovascular: corazón, arterias, venas, capilares",
          "Volemia total: 5-6 litros en adulto promedio (70 kg)",
          "Hematopoyesis: médula ósea roja (huesos planos, epífisis)",
          "Bazo: reservorio y destrucción de eritrocitos senescentes",
          "Hígado: síntesis de factores de coagulación, metabolismo"
        ]
      },
      {
        tipo: "tabla",
        titulo: "🧪 Características Moleculares",
        datos: [
          { label: "Hemoglobina", value: "Tetrámero α₂β₂, grupo hemo con Fe²⁺, 12-16 g/dL" },
          { label: "Albúmina", value: "66 kDa, presión oncótica, transporte de fármacos/hormonas" },
          { label: "Inmunoglobulinas", value: "IgG (75%), IgA (15%), IgM (10%), IgD, IgE" },
          { label: "Factores coagulación", value: "I-XIII, cascada intrínseca/extrínseca, vía común" },
          { label: "pH sanguíneo", value: "7.35-7.45 (regulado por bicarbonato, fosfatos, proteínas)" },
          { label: "Osmolaridad", value: "280-300 mOsm/kg (Na⁺, Cl⁻, glucosa, urea)" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "🏥 Relevancia Clínica",
        items: [
          "Anemia: disminución de hemoglobina/eritrocitos (ferropénica, perniciosa, hemolítica, aplásica)",
          "Leucemia: proliferación neoplásica de leucocitos (aguda linfoblástica/mieloide, crónica linfocítica/mieloide)",
          "Trombocitopenia: plaquetas <150,000/μL, riesgo de hemorragia (PTI, quimioterapia, sepsis)",
          "Hemofilia: deficiencia de factor VIII (A) o IX (B), coagulopatía hereditaria ligada a X",
          "Policitemia vera: eritrocitos >6 millones/μL, hiperviscosidad, trombosis, neoplasia mieloproliferativa",
          "Sepsis: respuesta inflamatoria sistémica, coagulación intravascular diseminada (CID)"
        ]
      }
    ]
  }
];
