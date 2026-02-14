// ═══════════════════════════════════════════════════════════
// MEMBRANAS-DATA.JS - Base de datos de membranas celulares
// Fuente: Alberts et al. (2022), Lodish et al. (2021)
// ═══════════════════════════════════════════════════════════

const MEMBRANAS_DATA = [
  {
    id: "modelo-mosaico-fluido",
    nombre: "Modelo de Mosaico Fluido",
    icono: "🧬",
    subtitulo: "Singer & Nicolson (1972) - Paradigma actual",
    categorias: ["estructura", "modelos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Postulados principales",
        items: [
          "La membrana es una bicapa lipídica fluida bidimensional",
          "Las proteínas están insertadas en la bicapa como un mosaico discontinuo",
          "Los componentes lipídicos y proteicos tienen libertad de movimiento lateral",
          "La distribución de proteínas es asimétrica entre las dos monocapas",
          "La fluidez es esencial para la función de membrana",
          "Las interacciones hidrofóbicas mantienen la estructura básica"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Características dinámicas",
        datos: [
          { label: "Viscosidad", value: "~100× menor que el aceite de oliva (0.1 poise)" },
          { label: "Difusión lateral lípidos", value: "~1 μm²/s (10⁻⁸ cm²/s)" },
          { label: "Difusión lateral proteínas", value: "10⁻¹⁰ - 10⁻¹² cm²/s (variable)" },
          { label: "Flip-flop espontáneo", value: "t½ = días a semanas (muy lento)" },
          { label: "Rotación molecular", value: "10⁹ veces/segundo" },
          { label: "Espesor bicapa", value: "~5 nm (50 Å)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Evidencia experimental histórica",
        items: [
          "Experimentos FRAP (Fluorescence Recovery After Photobleaching) demostraron movilidad lateral",
          "Fusión celular heterocariónica (Frye & Edidin, 1970) mostró difusión de proteínas",
          "Criofractura electrónica reveló proteínas intramembranales",
          "Espectroscopía EPR confirmó fluidez lipídica",
          "Técnicas de reconstitución validaron la estructura de bicapa"
        ]
      }
    ]
  },

  {
    id: "bicapa-lipidica",
    nombre: "Bicapa Lipídica",
    icono: "🫧",
    subtitulo: "Arquitectura fundamental - 50% masa membrana",
    categorias: ["estructura", "lipidos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Composición lipídica",
        items: [
          "Fosfolípidos (50-60%): fosfatidilcolina, fosfatidiletanolamina, fosfatidilserina, fosfatidilinositol",
          "Esfingolípidos (10-20%): esfingomielina, cerebrosidos, gangliósidos",
          "Colesterol (20-25% en membranas animales): regula fluidez y organiza dominios",
          "Glucolípidos (<5%): siempre en monocapa externa, función en reconocimiento celular",
          "Cardiolipina (exclusiva de membrana mitocondrial interna): forma dímeros"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Propiedades termodinámicas",
        datos: [
          { label: "Temperatura transición (Tm)", value: "Varía según longitud/saturación cadenas (-20°C a +60°C)" },
          { label: "Grosor región hidrofóbica", value: "~3 nm (30 Å)" },
          { label: "Área por fosfolípido", value: "~0.7 nm² (70 Å²)" },
          { label: "Energía formación bicapa", value: "ΔG ≈ -30 kJ/mol (proceso espontáneo)" },
          { label: "Permeabilidad H₂O", value: "~10⁻³ cm/s (alta para molécula polar)" },
          { label: "Permeabilidad iones", value: "<10⁻¹⁰ cm/s (prácticamente impermeable)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Organización estructural",
        items: [
          "Asimetría transbilayer: PS y PE predominan en monocapa citosólica, PC y esfingomielina en externa",
          "Cabezas polares hidrofílicas orientadas hacia ambientes acuosos",
          "Colas hidrocarbonadas interdigitadas en núcleo hidrofóbico",
          "Empaquetamiento líquido-cristalino por encima de Tm",
          "Curvatura local inducida por lípidos de forma cónica/invertida",
          "Formación espontánea de vesículas en medio acuoso"
        ]
      }
    ]
  },

  {
    id: "colesterol",
    nombre: "Colesterol de Membrana",
    icono: "💎",
    subtitulo: "Regulador de fluidez - 25% lípidos totales",
    categorias: ["lipidos", "estructura"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Funciones estructurales",
        items: [
          "Reduce fluidez a altas temperaturas (efecto condensante sobre fosfolípidos)",
          "Aumenta fluidez a bajas temperaturas (previene empaquetamiento cristalino)",
          "Reduce permeabilidad a moléculas pequeñas hidrosolubles",
          "Organiza dominios lipídicos (lipid rafts con esfingolípidos)",
          "Modula grosor y rigidez de la bicapa",
          "Rellena irregularidades del empaquetamiento lipídico"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Parámetros moleculares",
        datos: [
          { label: "Estructura", value: "Núcleo esteroide rígido + cadena alifática + grupo -OH polar" },
          { label: "Orientación", value: "Grupo -OH hacia interfase agua-lípido, cuerpo en región hidrofóbica" },
          { label: "Distribución", value: "Asimétricamente distribuido (más en monocapa externa)" },
          { label: "Rotación", value: "~10⁹ revoluciones/segundo alrededor del eje largo" },
          { label: "Efecto orden", value: "Aumenta orden de cadenas hasta C9-C10, desordena porción terminal" },
          { label: "Proporción óptima", value: "1:1 a 1:2 colesterol:fosfolípido en rafts" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Hipercolesterolemia familiar: defecto en receptor LDL causa acumulación plasmática y aterosclerosis",
          "Síndrome de Smith-Lemli-Opitz: defecto en síntesis de colesterol causa malformaciones congénitas",
          "Enfermedad de Niemann-Pick tipo C: acumulación lisosomal de colesterol causa neurodegeneración",
          "Estatinas: inhiben HMG-CoA reductasa para reducir síntesis de colesterol",
          "Depleción de colesterol altera señalización en rafts lipídicos y tráfico de proteínas"
        ]
      }
    ]
  },

  {
    id: "proteinas-integrales",
    nombre: "Proteínas Integrales de Membrana",
    icono: "🔌",
    subtitulo: "Atraviesan bicapa - 50% masa membrana",
    categorias: ["proteinas", "estructura"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características estructurales",
        items: [
          "Dominios transmembrana con α-hélices (20-25 aminoácidos hidrofóbicos) o β-barril",
          "Proteínas multipaso: 1-20+ segmentos transmembrana (GPCR=7, rodopsina=7, bacteriorodopsina=7)",
          "Residuos hidrofóbicos (Leu, Ile, Val, Phe, Trp) en región transmembrana",
          "Residuos cargados en regiones citosólicas y extracelulares",
          "Glicosilación exclusivamente en lado extracelular (marca orientación)",
          "Asociación con colesterol y esfingolípidos en dominios específicos"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Clases funcionales principales",
        datos: [
          { label: "Transportadores", value: "GLUT1-4, bomba Na⁺/K⁺-ATPasa, CFTR, ABC transporters" },
          { label: "Canales iónicos", value: "Nav, Kv, Cav, Cl⁻, VGCC, ligand-gated (nAChR, GABA)" },
          { label: "Receptores", value: "GPCR (>800 en humanos), RTK (EGFR, PDGFR), citoquinas" },
          { label: "Adhesión", value: "Integrinas, cadherinas, selectinas, IgCAMs" },
          { label: "Enzimas", value: "Adenilato ciclasa, guanilato ciclasa, fosfolipasa C" },
          { label: "Estructurales", value: "Glucoforinas, proteínas de mielina (PLP, MBP)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Inserción y plegamiento",
        items: [
          "Reconocimiento por SRP (Signal Recognition Particle) en ribosoma",
          "Inserción cotraduccional en retículo endoplásmico vía translocón Sec61",
          "Secuencias señal de inicio-transferencia definen topología",
          "Secuencias stop-transferencia determinan múltiples pases",
          "Plegamiento asistido por chaperonas del RE (calnexina, calreticulina, BiP)",
          "Control de calidad por ERAD (ER-Associated Degradation) elimina proteínas mal plegadas"
        ]
      }
    ]
  },

  {
    id: "proteinas-perifericas",
    nombre: "Proteínas Periféricas de Membrana",
    icono: "🧲",
    subtitulo: "Asociadas a superficie - no atraviesan bicapa",
    categorias: ["proteinas", "estructura"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Mecanismos de asociación",
        items: [
          "Interacciones electrostáticas con cabezas polares de fosfolípidos (Ej: PI(4,5)P₂)",
          "Unión a proteínas integrales (ankyrina con banda 3, espectrina con actina)",
          "Inserción de hélices anfipáticas en monocapa citosólica",
          "Anclaje mediante lípidos covalentes: palmitoilación (Cys), miristoilación (Gly N-terminal)",
          "Interacción con dominios citoplasmáticos de receptores transmembrana",
          "Reclutamiento transitorio mediante dominios específicos (PH, C2, FYVE, PX)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Ejemplos funcionales importantes",
        datos: [
          { label: "Citoesqueleto", value: "Espectrina (eritrocitos), ankyrina, α-actinina, filamina" },
          { label: "Señalización", value: "Src, Ras, proteínas Gα, PKC, PI3K, PLC" },
          { label: "Tráfico", value: "Clatrina, AP complexes, COPs (COPI/COPII), SNAREs" },
          { label: "Reguladoras", value: "Calmodulina, anexinas, 14-3-3 proteins" },
          { label: "Enzimas", value: "PKA, PKC, CaMKII, fosfolipasas" },
          { label: "Adaptadoras", value: "Grb2, Shc, IRS, proteínas con dominios SH2/SH3/PTB" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación dinámica",
        items: [
          "Fosforilación regula interacciones con membrana (PKC transloca al activarse)",
          "Ca²⁺ controla reclutamiento de proteínas con dominios C2 (anexinas, PKC)",
          "PI(4,5)P₂ e IP₃ regulan localización de proteínas con dominios PH",
          "Proteólisis libera proteínas de membrana (ej: caspasas en apoptosis)",
          "GTPasas pequeñas (Ras, Rho, Rab) ciclan entre membrana y citosol",
          "Modificaciones lipídicas reversibles permiten ciclo membrana-citosol"
        ]
      }
    ]
  },

  {
    id: "lipid-rafts",
    nombre: "Lipid Rafts (Balsas Lipídicas)",
    icono: "🏝️",
    subtitulo: "Dominios ordenados - plataformas de señalización",
    categorias: ["estructura", "lipidos", "señalizacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características estructurales",
        items: [
          "Microdominios enriquecidos en colesterol (30-50%) y esfingolípidos",
          "Fase líquido-ordenada (Lo) más densa que membrana circundante (Ld)",
          "Tamaño: 10-200 nm de diámetro, altamente dinámicos (vida media ~ms)",
          "Grosor mayor (~4 nm vs 3.5 nm) que bicapa circundante",
          "Proteínas específicas: GPI-ancladas, Src-family kinases, caveolinas",
          "Resistentes a extracción con detergentes fríos (DRMs = Detergent-Resistant Membranes)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Composición molecular típica",
        datos: [
          { label: "Colesterol", value: "30-50% de lípidos totales (3× más que membrana bulk)" },
          { label: "Esfingomielina", value: "Principal fosfolípido (cadenas saturadas largas)" },
          { label: "Gangliósidos", value: "GM1, GM3 (marcadores clásicos de rafts)" },
          { label: "Lípidos excluidos", value: "Fosfatidilserina, fosfolípidos insaturados" },
          { label: "Proteínas GPI-ancladas", value: "CD59, Thy-1, PLAP, fosfatasa alcalina" },
          { label: "Proteínas palmitoiladas", value: "LAT, flotilinas, eNOS, H-Ras" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones celulares",
        items: [
          "Plataformas de señalización: concentran receptores y efectores (TCR, BCR, EGFR)",
          "Organización de cascadas de señalización: segregan o agrupan componentes",
          "Entrada de patógenos: virus (influenza, HIV), toxinas (cólera, ántrax)",
          "Tráfico de membrana: endocitosis mediada por caveolas, transporte polarizado",
          "Regulación de actividad enzimática: eNOS, Src-family kinases",
          "Formación de sinapsis inmunológicas en linfocitos T"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Alzheimer: procesamiento de APP en rafts genera β-amiloide",
          "Priones: conversión PrPc → PrPsc ocurre en rafts lipídicos",
          "Cáncer: alteración de rafts afecta señalización de receptores (EGFR, Her2)",
          "Infecciones virales: HIV, influenza, SV40 explotan rafts para entrada",
          "Estatinas pueden alterar estructura de rafts y señalización celular"
        ]
      }
    ]
  },

  {
    id: "caveolas",
    nombre: "Caveolas",
    icono: "🫧",
    subtitulo: "Invaginaciones flask-shaped - 50-100 nm diámetro",
    categorias: ["estructura", "señalizacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y componentes",
        items: [
          "Invaginaciones de membrana plasmática en forma de matraz (caveola = pequeña cueva)",
          "Caveolinas (Cav-1, Cav-2, Cav-3): proteínas estructurales oligoméricas (14-24 kDa)",
          "Cavinas (PTRF/Cavin-1 a 4): estabilizan curvatura y regulan formación",
          "Enriquecidas en colesterol (45%) y esfingolípidos (tipo específico de raft)",
          "Recubrimiento proteico del lado citosólico (no clatrina)",
          "Abundantes en adipocitos, células endoteliales, músculo liso y estriado"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Funciones celulares principales",
        datos: [
          { label: "Endocitosis", value: "Transcitosis, entrada de albúmina, folato, virus SV40" },
          { label: "Señalización", value: "Concentran eNOS, receptores RTK, PKC, Src-kinases" },
          { label: "Mecanosensación", value: "Respuesta a estrés mecánico (desplegamiento de caveolas)" },
          { label: "Homeostasis lipídica", value: "Regulación de colesterol y tráfico de lípidos" },
          { label: "Regulación Ca²⁺", value: "Asociadas a depósitos de calcio subplasmalemal" },
          { label: "Protección vascular", value: "Generación NO, regulación permeabilidad endotelial" }
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Distrofia muscular: mutaciones en CAV3 causan distrofia de cinturas tipo 1C (LGMD1C)",
          "Lipodistrofias: mutaciones en CAV1 causan lipodistrofia congénita generalizada tipo 3",
          "Hipertensión pulmonar: pérdida de CAV1 en células endoteliales",
          "Cáncer: Cav-1 actúa como supresor tumoral (pérdida en próstata, mama)",
          "Aterosclerosis: disfunción de caveolas afecta producción de NO y función endotelial"
        ]
      }
    ]
  },

  {
    id: "glicocálix",
    nombre: "Glicocálix",
    icono: "🎋",
    subtitulo: "Cubierta de carbohidratos - lado extracelular",
    categorias: ["estructura"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Composición y estructura",
        items: [
          "Capa de oligosacáridos unidos a lípidos (glucolípidos) y proteínas (glucoproteínas)",
          "Exclusivamente en monocapa externa (exoplásmica) de membrana plasmática",
          "Grosor variable: 10-100 nm (hasta 1-2 μm en células mucosas)",
          "Carbohidratos representan 2-10% peso membrana plasmática",
          "Cadenas de oligosacáridos ramificadas: N-glucanos y O-glucanos",
          "Proteoglicanos con cadenas de glucosaminoglucanos (GAGs) en superficie"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Tipos de glucoconjugados",
        datos: [
          { label: "Glucoproteínas", value: "N-glucanos (Asn) y O-glucanos (Ser/Thr), mayoría de proteínas membrana" },
          { label: "Glucolípidos", value: "Cerebrosidos, gangliósidos (ácido siálico terminal)" },
          { label: "Proteoglicanos", value: "Syndecans (transmembrana), glipicanos (GPI-anclados)" },
          { label: "GAGs", value: "Heparán sulfato, condroitín sulfato, ácido hialurónico" },
          { label: "Lectinas", value: "Selectinas, siglecs reconocen motivos específicos" },
          { label: "Enzimas glicosilación", value: "Golgi: glucosiltransferasas, glucosidasas" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones biológicas",
        items: [
          "Reconocimiento célula-célula: grupos sanguíneos ABO, interacciones leucocito-endotelio",
          "Protección mecánica y química: barrera contra daño, carga negativa repele proteínas",
          "Hidratación celular: GAGs retienen agua (componente de mucinas)",
          "Adhesión selectiva: selectinas reconocen sialil-Lewis X en inflamación",
          "Señalización: syndecans modulan receptores de factores de crecimiento",
          "Barrera contra patógenos: capa de mucina protege epitelios"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Grupos sanguíneos: determinantes antigénicos ABO y Rh en glucolípidos eritrocitarios",
          "Fibrosis quística: defecto en CFTR altera mucina y deshidrata mucus",
          "CDG (Congenital Disorders of Glycosylation): defectos en N-glicosilación causan síndromes multisistémicos",
          "Metástasis: sobreexpresión de sialiltransferasas facilita invasión tumoral",
          "Sepsis: endotoxinas bacterianas dañan glicocálix endotelial causando permeabilidad vascular"
        ]
      }
    ]
  },

  {
    id: "uniones-estrechas",
    nombre: "Uniones Estrechas (Tight Junctions)",
    icono: "🔒",
    subtitulo: "Sellan espacio intercelular - barrera paracelular",
    categorias: ["estructura", "adhesion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura molecular",
        items: [
          "Proteínas transmembrana: claudinas (24 tipos), ocludina, JAMs (Junction Adhesion Molecules)",
          "Proteínas citoplasmáticas: ZO-1, ZO-2, ZO-3 (scaffolding con PDZ domains)",
          "Conexión con citoesqueleto: ZO proteins unen TJ a actina",
          "Formación de cordones anastomosados (red de hebras en criofractura)",
          "Localización: banda apical en células epiteliales polarizadas",
          "Resistencia eléctrica transepitelial: 100-2000 Ω·cm² (epitelio intestinal)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Componentes proteicos principales",
        datos: [
          { label: "Claudinas 1-24", value: "4 dominios TM, determinan selectividad iónica y resistencia" },
          { label: "Ocludina", value: "4 dominios TM, regulación dinámica de permeabilidad" },
          { label: "Tricelulina", value: "Especializada en contactos tricelulares" },
          { label: "JAM-A, -B, -C", value: "1 dominio TM, superfamilia Ig, adhesión y señalización" },
          { label: "ZO-1, -2, -3", value: "Proteínas MAGUK, dominios PDZ, adaptadoras con actina" },
          { label: "Cingulina", value: "Regulación de formación y señalización de TJ" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones fisiológicas",
        items: [
          "Barrera paracelular: impide paso de solutos entre células (gate function)",
          "Fence function: separa dominios apical y basolateral de membrana plasmática",
          "Selectividad iónica: claudinas determinan permeabilidad diferencial a Na⁺, Cl⁻, Ca²⁺",
          "Regulación dinámica: fosforilación, endocitosis modulan permeabilidad",
          "Señalización: reclutan proteínas de polaridad (Par3/Par6/aPKC)",
          "Organización tisular: mantienen arquitectura epitelial y endotelial"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Enfermedad celíaca: gliadina aumenta permeabilidad intestinal vía zonulina",
          "Síndrome FHHNC: mutaciones en claudina-16 causan pérdida renal de Mg²⁺ y Ca²⁺",
          "Edema cerebral: ruptura de barrera hematoencefálica (claudina-5)",
          "Colangitis esclerosante: autoanticuerpos contra claudinas biliares",
          "Cáncer: pérdida de TJ facilita invasión y metástasis tumoral"
        ]
      }
    ]
  },

  {
    id: "uniones-adherentes",
    nombre: "Uniones Adherentes (Adherens Junctions)",
    icono: "🔗",
    subtitulo: "Cadherinas - adhesión Ca²⁺-dependiente",
    categorias: ["estructura", "adhesion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes moleculares",
        items: [
          "Cadherinas clásicas: E-cadherina (epitelial), N-cadherina (neural), P-cadherina (placenta)",
          "Dominio extracelular: 5 repeticiones EC con sitios de unión Ca²⁺",
          "Cateninas: α-catenina (une actina), β-catenina (une cadherina), p120-catenina (estabiliza)",
          "Interacción homofílica: cadherinas del mismo tipo entre células adyacentes",
          "Unión a citoesqueleto: α-catenina conecta con filamentos de actina",
          "Localización: banda subapical (debajo de tight junctions) en epitelios"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Arquitectura del complejo",
        datos: [
          { label: "E-cadherina", value: "120 kDa, 5 dominios EC, dominio citoplasmático une β-catenina" },
          { label: "β-catenina (β-cat)", value: "Dual: adhesión y señalización Wnt, 12 repeticiones ARM" },
          { label: "α-catenina", value: "Homodímero, dominio VH1 une actina/α-actinina/vinculina" },
          { label: "p120-catenina", value: "Estabiliza cadherinas, regula endocitosis" },
          { label: "α-actinina/vinculina", value: "Refuerzan conexión con red de actina cortical" },
          { label: "Ca²⁺ extracelular", value: "2-5 mM necesario para rigidez de dominios EC" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones celulares",
        items: [
          "Adhesión célula-célula: mantiene integridad tisular y polaridad epitelial",
          "Mecanotransducción: responden a fuerzas mecánicas y tensión citoesquelética",
          "Morfogénesis: movimientos celulares coordinados en desarrollo embrionario",
          "Señalización: β-catenina libre activa vía Wnt cuando no está unida",
          "Reconocimiento específico: expresión tisular diferencial de cadherinas",
          "Plasticidad: endocitosis/exocitosis regula fuerza adhesiva"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer invasivo: pérdida de E-cadherina en transición epitelio-mesenquimal (EMT)",
          "Cáncer gástrico difuso: mutaciones germinales en CDH1 (gen de E-cadherina)",
          "Pénfigo vulgar: autoanticuerpos contra desmogleoína-3 causan ampollas",
          "Gastrosquisis: defectos en cadherinas durante cierre de pared abdominal",
          "Arritmias cardíacas: mutaciones en desmosomas causan displasia arritmogénica"
        ]
      }
    ]
  },

  {
    id: "gap-junctions",
    nombre: "Gap Junctions (Uniones Comunicantes)",
    icono: "⚡",
    subtitulo: "Conexinas - canales intercelulares directos",
    categorias: ["estructura", "señalizacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura molecular",
        items: [
          "Conexinas (Cx): familia de 21 proteínas (26-62 kDa) nombradas por peso molecular",
          "Conexón (hemicanal): hexámero de 6 conexinas, forma poro de ~1.5 nm diámetro",
          "Gap junction: alineación de 2 conexones de células adyacentes",
          "4 dominios transmembrana por conexina, loops extracelulares E1 y E2",
          "Permeabilidad: iones (Na⁺, K⁺, Ca²⁺, IP₃), metabolitos <1000-1500 Da",
          "Agrupación en placas: cientos a miles de canales (2-3 μm diámetro)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Principales conexinas y distribución",
        datos: [
          { label: "Cx43 (GJA1)", value: "Ubicua: corazón, cerebro, hueso, piel (más abundante)" },
          { label: "Cx26 (GJB2)", value: "Cóclea, hígado, piel (mutada en sordera congénita)" },
          { label: "Cx32 (GJB1)", value: "Hígado, páncreas, mielina (Charcot-Marie-Tooth ligado a X)" },
          { label: "Cx40 (GJA5)", value: "Sistema de conducción cardíaco, endotelio" },
          { label: "Cx46/Cx50", value: "Cristalino ocular (cataratas congénitas)" },
          { label: "Cx36", value: "Neuronas, células β pancreáticas (sincronización)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones fisiológicas",
        items: [
          "Acoplamiento eléctrico: propagación de potenciales de acción (corazón, músculo liso)",
          "Acoplamiento metabólico: difusión de nutrientes, segundos mensajeros (Ca²⁺, IP₃, cAMP)",
          "Sincronización celular: coordinación de actividad en tejidos (islotes pancreáticos)",
          "Amortiguación de señales: distribución de iones y metabolitos entre células",
          "Desarrollo embrionario: comunicación para patrones morfogenéticos",
          "Homeostasis tisular: cooperación metabólica entre células vecinas"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación dinámica",
        items: [
          "pH intracelular: acidificación (<6.5) cierra canales (protección en isquemia)",
          "Ca²⁺ citosólico: alta [Ca²⁺]i cierra canales (toxicidad celular)",
          "Fosforilación: PKC, MAPK, Src modulan conductancia y trafficking",
          "Voltaje transjuncional: cierre dependiente de voltaje (gating)",
          "Vida media corta: ~1-5 horas (recambio rápido, degradación lisosomal)",
          "Factores de crecimiento: EGF, FGF reducen comunicación gap junctional"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Sordera hereditaria: mutaciones en GJB2 (Cx26) causan >50% sordera no sindrómica",
          "Enfermedad de Charcot-Marie-Tooth tipo X: mutación en GJB1 (Cx32) en células de Schwann",
          "Cataratas zonulares: mutaciones en GJA3 (Cx46) y GJA8 (Cx50)",
          "Arritmias cardíacas: remodelado de Cx43 en infarto, fibrilación atrial",
          "Oculodentodigital dysplasia: mutaciones en GJA1 (Cx43) causan síndrome multisistémico"
        ]
      }
    ]
  },

  {
    id: "desmosomas",
    nombre: "Desmosomas",
    icono: "🔩",
    subtitulo: "Unión a filamentos intermedios - resistencia mecánica",
    categorias: ["estructura", "adhesion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes estructurales",
        items: [
          "Cadherinas desmosomales: desmogleínas (Dsg1-4) y desmocolinas (Dsc1-3)",
          "Proteínas de placa: placoglobina (γ-catenina), plakofilinas (Pkp1-3), desmoplakina",
          "Anclaje a filamentos intermedios: queratinas (epitelios), desmina (músculo)",
          "Estructura simétrica: placas densas citoplasmáticas en ambas células",
          "Espacio intercelular: ~30 nm con línea densa media",
          "Abundantes en tejidos sujetos a estrés mecánico: piel, corazón"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Proteínas principales y función",
        datos: [
          { label: "Desmogleína 1-4", value: "Cadherinas de adhesión, isoformas tejido-específicas" },
          { label: "Desmocolina 1-3", value: "Cadherinas, dominio citoplasmático más corto que Dsg" },
          { label: "Placoglobina (γ-cat)", value: "Homóloga a β-catenina, une cadherinas y desmoplakina" },
          { label: "Plakofilinas 1-3", value: "Familia armadillo, organizan placa desmosomal" },
          { label: "Desmoplakina", value: "Proteína más grande (260 kDa), une filamentos intermedios" },
          { label: "Plakoglobina", value: "Dual: desmosomas y adherens junctions" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones tisulares",
        items: [
          "Resistencia mecánica: distribuyen tensión a través de red de filamentos intermedios",
          "Integridad epitelial: mantienen cohesión en piel, mucosas, epitelios estratificados",
          "Cardiomiocitos: discos intercalares contienen desmosomas para transmitir fuerzas contráctiles",
          "Distribución estratégica: más numerosos en capas basales de epidermis",
          "Maduración progresiva: ensamblaje gradual de componentes citoplasmáticos",
          "Respuesta a estrés: refuerzo adaptativo bajo tensión mecánica"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Pénfigo: autoanticuerpos contra Dsg1 (superficial) o Dsg3 (vulgar) causan ampollas",
          "Cardiomiopatía arritmogénica: mutaciones en PKP2, DSP, DSG2 causan displasia ventricular",
          "Epidermólisis bullosa: mutaciones en plakoglobina, desmoplakina causan fragilidad cutánea",
          "Síndrome de Naxos: mutación en plakoglobina causa miocardiopatía y queratodermia palmoplantar",
          "Síndrome de Carvajal: mutación en desmoplakina, similar a Naxos con miocardiopatía dilatada"
        ]
      }
    ]
  },

  {
    id: "difusion-simple",
    nombre: "Difusión Simple",
    icono: "🌊",
    subtitulo: "Transporte pasivo - a favor de gradiente",
    categorias: ["transporte"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Principios fisicoquímicos",
        items: [
          "Movimiento neto de soluto desde alta a baja concentración (ΔC)",
          "No requiere energía metabólica (ATP-independiente)",
          "Obedece la ecuación de Fick: J = -D(dC/dx) donde D es coeficiente de difusión",
          "Permeabilidad (P) depende de: tamaño, hidrofobicidad, carga del soluto",
          "Velocidad proporcional al gradiente de concentración",
          "Alcanza equilibrio electroquímico (no necesariamente concentraciones iguales)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Permeabilidad relativa de moléculas",
        datos: [
          { label: "Gases (O₂, CO₂, N₂)", value: "P ≈ 10⁻² cm/s (muy alta, atraviesan libremente)" },
          { label: "Moléculas pequeñas sin carga (urea, etanol)", value: "P ≈ 10⁻⁵ cm/s (moderada)" },
          { label: "Agua", value: "P ≈ 10⁻³ cm/s (alta, pero mejorada por acuaporinas)" },
          { label: "Iones (Na⁺, K⁺, Ca²⁺, Cl⁻)", value: "P < 10⁻¹⁰ cm/s (prácticamente impermeable)" },
          { label: "Glucosa, aminoácidos", value: "P < 10⁻⁸ cm/s (requieren transportadores)" },
          { label: "Moléculas grandes/polares", value: "P ≈ 0 (impermeables, necesitan vesículas)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Factores determinantes",
        items: [
          "Coeficiente de partición lípido/agua: moléculas hidrofóbicas cruzan más rápido",
          "Tamaño molecular: inversamente proporcional a permeabilidad (ley de Stokes-Einstein)",
          "Carga eléctrica: iones atraviesan muy lentamente sin canales",
          "Temperatura: aumenta energía cinética y velocidad de difusión",
          "Viscosidad de membrana: colesterol reduce permeabilidad a moléculas pequeñas",
          "Grosor de membrana: mayor distancia reduce velocidad de difusión"
        ]
      }
    ]
  },

  {
    id: "canales-ionicos",
    nombre: "Canales Iónicos",
    icono: "🚪",
    subtitulo: "Difusión facilitada - 10⁶-10⁸ iones/s",
    categorias: ["transporte"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características generales",
        items: [
          "Proteínas transmembrana que forman poros acuosos selectivos",
          "Transporte pasivo: a favor de gradiente electroquímico (no gastan ATP)",
          "Alta velocidad: ~10⁷ iones/segundo (cerca de límite de difusión)",
          "Selectividad iónica: filtro de selectividad discrimina por tamaño y carga",
          "Gating (compuerta): regulados por voltaje, ligandos, tensión mecánica, temperatura",
          "Dos estados: abierto (conducción) y cerrado (no conductivo)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Familias principales de canales",
        datos: [
          { label: "Canales de Na⁺ (Nav)", value: "Potenciales de acción (cerebro, corazón), 9 subtipos (Nav1.1-1.9)" },
          { label: "Canales de K⁺ (Kv, Kir, K2P)", value: ">80 genes, repolarización, potencial de reposo" },
          { label: "Canales de Ca²⁺ (Cav)", value: "L, N, P/Q, R, T types, señalización Ca²⁺, contracción" },
          { label: "Canales de Cl⁻", value: "CFTR, ClC family, volumen celular, secreción" },
          { label: "Canales activados por ligando", value: "nAChR, GABA, NMDA, P2X (neurotransmisores)" },
          { label: "Canales TRP", value: "28 miembros, temperatura, dolor, mecanosensación" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismos de selectividad",
        items: [
          "Filtro de selectividad: secuencia de residuos conservados en poro",
          "Canal K⁺: secuencia TVGYG forma sitios de unión (Doyle et al., Nature 1998)",
          "Deshidratación selectiva: energía de interacción compensa pérdida de hidratación",
          "Discriminación por diámetro: poro de ~3 Å selecciona K⁺ (1.33 Å) vs Na⁺ (0.95 Å)",
          "Canal Na⁺: residuos DEKA forman filtro más amplio y flexible",
          "Coordinación electrostática: cargas negativas atraen cationes, repelen aniones"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica (canalopatías)",
        items: [
          "Epilepsia: mutaciones en Nav1.1 (SCN1A) causan síndrome de Dravet",
          "Síndrome de QT largo: mutaciones en canales K⁺ (KCNQ1, KCNH2) o Na⁺ (SCN5A)",
          "Fibrosis quística: mutación ΔF508 en CFTR (canal Cl⁻) causa deshidratación mucus",
          "Parálisis periódica: mutaciones en canales Ca²⁺ o Na⁺ musculares",
          "Migraña hemipléjica familiar: mutaciones en canales Ca²⁺ (CACNA1A)"
        ]
      }
    ]
  },

  {
    id: "transportadores",
    nombre: "Transportadores (Carriers)",
    icono: "🚛",
    subtitulo: "Cambio conformacional - 10²-10⁴ moléculas/s",
    categorias: ["transporte"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Mecanismo de transporte",
        items: [
          "Proteínas transmembrana que unen sustrato específicamente",
          "Cambio conformacional expone sitio de unión a lado opuesto de membrana",
          "Velocidad menor que canales: 10²-10⁴ moléculas/segundo (limitado por cambio conformacional)",
          "Saturables: cinética Michaelis-Menten con Km y Vmax",
          "Especificidad: reconocen estructura química precisa del sustrato",
          "Pueden ser pasivos (a favor) o activos (contra gradiente con ATP)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Tipos funcionales de transportadores",
        datos: [
          { label: "Uniporte", value: "Un sustrato, una dirección. Ej: GLUT1-4 (glucosa)" },
          { label: "Simporte (cotransporte)", value: "Dos sustratos, misma dirección. Ej: SGLT1 (Na⁺/glucosa)" },
          { label: "Antiporte (intercambio)", value: "Dos sustratos, direcciones opuestas. Ej: intercambiador Na⁺/Ca²⁺" },
          { label: "Transportadores ABC", value: "ATP-Binding Cassette, activos, 48 en humanos" },
          { label: "Transportadores SLC", value: "SoLute Carriers, >400 en humanos, mayoría secundarios" },
          { label: "ATPasas tipo P", value: "Fosforilación, bombas iónicas. Na⁺/K⁺-ATPasa, Ca²⁺-ATPasa" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Ejemplos importantes",
        items: [
          "GLUT1-4: uniporte glucosa, pasivo, ubicuo (GLUT1) o músculo/adipocitos (GLUT4 regulado por insulina)",
          "SGLT1/2: simporte Na⁺/glucosa, secundario activo, intestino y riñón",
          "Intercambiador Na⁺/Ca²⁺ (NCX): antiporte 3Na⁺:1Ca²⁺, expulsa Ca²⁺ de citosol",
          "Banda 3 (AE1): antiporte Cl⁻/HCO₃⁻, eritrocitos, homeostasis pH sanguíneo",
          "CFTR: canal Cl⁻ regulado por ATP y PKA, epitelios secretorios",
          "P-glicoproteína (ABCB1/MDR1): exporta drogas hidrófobas, resistencia multidrogas"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Diabetes tipo 2: resistencia insulina reduce translocación GLUT4 a membrana",
          "Cistinuria: mutaciones en rBAT/b0,+AT (transportadores aminoácidos) causan cálculos renales",
          "Síndrome de Fanconi: defectos en transportadores renales causan pérdida de glucosa, aminoácidos, fosfato",
          "Resistencia a quimioterapia: sobreexpresión de P-glicoproteína expulsa fármacos",
          "Glucosuria renal familiar: mutaciones en SGLT2 causan excreción urinaria de glucosa"
        ]
      }
    ]
  },

  {
    id: "bomba-sodio-potasio",
    nombre: "Bomba Na⁺/K⁺-ATPasa",
    icono: "⚡",
    subtitulo: "Transporte activo primario - consume 30% ATP celular",
    categorias: ["transporte", "energia"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y mecanismo",
        items: [
          "Heterotrímero: subunidad α (catalítica, 10 TM, ~110 kDa), β (glicosilada, 1 TM), γ (reguladora, FXYD)",
          "Estequiometría: 3 Na⁺ fuera, 2 K⁺ dentro por ATP hidrolizado (electrogénico)",
          "Ciclo de Albers-Post: dos conformaciones principales E1 (alta afinidad Na⁺) y E2 (alta afinidad K⁺)",
          "Sitio de unión ATP: dominio N en región citoplasmática de subunidad α",
          "Fosforilación reversible: residuo Asp conservado (D369 en α1) forma fosfoenzima",
          "Inhibición: ouabaína, digoxina (glucósidos cardíacos) se unen a conformación E2-P"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Parámetros cinéticos y distribución",
        datos: [
          { label: "Isoformas α", value: "α1 (ubicua), α2 (músculo, glía), α3 (neuronas), α4 (testículo)" },
          { label: "Km para Na⁺", value: "~10-20 mM ([Na⁺]i típica ~10-15 mM)" },
          { label: "Km para K⁺", value: "~1-2 mM ([K⁺]e típica ~4-5 mM)" },
          { label: "Km para ATP", value: "~0.1-1 mM ([ATP]i típica 3-5 mM)" },
          { label: "Velocidad máxima", value: "~100-200 ciclos/segundo por bomba" },
          { label: "Densidad membrana", value: "800-30,000 bombas/μm² (variable por tipo celular)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones fisiológicas",
        items: [
          "Mantenimiento de gradientes iónicos: [Na⁺]e ~145 mM, [Na⁺]i ~12 mM; [K⁺]e ~4 mM, [K⁺]i ~140 mM",
          "Potencial de membrana: contribuye directamente -5 a -10 mV por ser electrogénica",
          "Volumen celular: previene hinchamiento osmótico al limitar Na⁺ intracelular",
          "Energización de transporte secundario: gradiente Na⁺ impulsa 7 familias de cotransportadores",
          "Señalización celular: interactúa con Src kinase, PI3K, regula expresión génica",
          "Termorregulación: genera calor en tejido adiposo marrón"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Insuficiencia cardíaca: digoxina inhibe bomba, aumenta [Ca²⁺]i vía intercambiador Na⁺/Ca²⁺ (inotrópico positivo)",
          "Migraña hemipléjica familiar tipo 2: mutaciones en ATP1A2 (α2) causan episodios neurológicos",
          "FXYD dysplasia: mutaciones en subunidad γ causan hipomagnesemia, convulsiones",
          "Intoxicación digitálica: náuseas, arritmias por inhibición excesiva de bomba",
          "Hipopotasemia: reduce actividad de bomba, predispone a arritmias cardíacas"
        ]
      }
    ]
  },

  {
    id: "endocitosis",
    nombre: "Endocitosis",
    icono: "📥",
    subtitulo: "Internalización de membrana y carga extracelular",
    categorias: ["transporte"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Tipos de endocitosis",
        items: [
          "Fagocitosis: ingestión partículas >0.5 μm (bacterias, células apoptóticas) por células especializadas",
          "Pinocitosis: ingestión fluido y solutos disueltos (constitutiva o regulada)",
          "Endocitosis mediada por receptor: captación selectiva de ligandos (LDL, transferrina, hormonas)",
          "Endocitosis mediada por clatrina: vesículas recubiertas ~100 nm, receptores con señales YXXØ o [DE]XXXL[LI]",
          "Endocitosis mediada por caveolas: invaginaciones de 50-100 nm, entrada de virus, transcitosis",
          "Endocitosis independiente de clatrina/caveolina: múltiples rutas (CLIC/GEEC, flotilina, Arf6)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Endocitosis mediada por clatrina - componentes",
        datos: [
          { label: "Clatrina", value: "Trisquelion (3 cadenas pesadas + 3 ligeras), forma jaula hexagonal/pentagonal" },
          { label: "Adaptadores AP-2", value: "Reconocen señales en receptores cargo, unen clatrina a membrana" },
          { label: "Dinamina", value: "GTPasa, escinde cuello de vesícula (GTP-dependiente)" },
          { label: "Auxilina/Hsc70", value: "Desensamblaje de clatrina usando ATP" },
          { label: "Eps15, epsinas", value: "Reclutamiento de cargo, curvatura de membrana (dominios ENTH)" },
          { label: "PI(4,5)P₂", value: "Recluta proteínas con dominios PH, ANTH, ENTH" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismo endocitosis mediada por clatrina",
        items: [
          "1. Nucleación: AP-2 se une a PI(4,5)P₂ y colas citoplásmicas de receptores",
          "2. Reclutamiento clatrina: formación de jaula, curvatura progresiva de membrana",
          "3. Invaginación: proteínas BAR (amphiphysin) estabilizan curvatura alta",
          "4. Escisión: dinamina forma espiral GTPasa, constricción y corte del cuello",
          "5. Desensamblaje: auxilina/Hsc70 despolimerizan clatrina usando ATP",
          "6. Fusión con endosomas tempranos: Rab5, EEA1, tethering factors, SNAREs"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Hipercolesterolemia familiar: defecto en receptor LDL impide endocitosis, acumulación colesterol plasmático",
          "Intoxicación por toxina diftérica: endocitosis mediada por receptor precede entrada citosol",
          "Entrada viral: influenza (endocitosis mediada por clatrina), HIV (fusión directa o endocitosis)",
          "Síndrome nefrótico congénito: mutaciones en podocina afectan endocitosis en glomérulo",
          "Enfermedad de Alzheimer: procesamiento de APP en endosomas genera β-amiloide"
        ]
      }
    ]
  },

  {
    id: "exocitosis",
    nombre: "Exocitosis",
    icono: "📤",
    subtitulo: "Fusión vesicular - secreción constitutiva y regulada",
    categorias: ["transporte"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Tipos de exocitosis",
        items: [
          "Constitutiva: continua, no regulada, libera proteínas de secreción, renueva membrana plasmática",
          "Regulada: desencadenada por señal (Ca²⁺, hormonas), vesículas secretoras especializadas",
          "Exocitosis neuronal: liberación de neurotransmisores en sinapsis (ms, ultra-rápida)",
          "Exocitosis endocrina: hormonas peptídicas (insulina, GH, ACTH) en gránulos secretores",
          "Exocitosis exocrina: enzimas digestivas (páncreas), mucinas (glándulas salivales)",
          "Kiss-and-run: fusión transitoria, recuperación rápida sin colapso completo de vesícula"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Maquinaria molecular de fusión (SNAREs)",
        datos: [
          { label: "v-SNAREs (vesícula)", value: "Sinaptobrevina/VAMP (VAMP1, 2, 3, 7), reconocimiento específico" },
          { label: "t-SNAREs (target)", value: "Sintaxina-1 (Qa), SNAP-25 (Qb,Qc) forman complejo aceptor" },
          { label: "Complejo trans-SNARE", value: "4-helix bundle (Qa-Qb-Qc-R), energía de ensamblaje impulsa fusión" },
          { label: "Sinaptotagmina", value: "Sensor Ca²⁺ (dominios C2A, C2B), dispara fusión rápida" },
          { label: "Complexina", value: "Clamp, estabiliza complejo SNARE pre-fusión hasta señal Ca²⁺" },
          { label: "NSF/α-SNAP", value: "ATPasas desensamblan cis-SNAREs post-fusión (reciclaje)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Etapas de fusión vesicular",
        items: [
          "1. Tethering: Rab-GTPasas y tethering factors acercan vesícula a membrana",
          "2. Docking: formación de complejo trans-SNARE entre v-SNARE y t-SNAREs",
          "3. Priming: ATP-dependent, preparación de vesícula para fusión ultrarrápida",
          "4. Fusión: Ca²⁺ se une a sinaptotagmina, desplaza complexina, cataliza fusión",
          "5. Expansión de poro: apertura y colapso de vesícula en membrana plasmática",
          "6. Reciclaje: endocitosis de componentes vesiculares, desensamblaje SNAREs por NSF"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Diabetes tipo 1: autoinmunidad destruye células β, pérdida de exocitosis de insulina",
          "Botulismo: toxina botulínica proteoliza SNAP-25, bloquea neurotransmisión (parálisis flácida)",
          "Tétanos: toxina tetánica escinde sinaptobrevina en neuronas inhibitorias (espasmos)",
          "Miastenia gravis: autoanticuerpos contra receptor nicotínico reducen exocitosis efectiva",
          "Síndrome de Lambert-Eaton: autoanticuerpos contra canales Ca²⁺ reducen exocitosis en NMJ"
        ]
      }
    ]
  },

  {
    id: "receptores-gpcr",
    nombre: "Receptores Acoplados a Proteína G (GPCR)",
    icono: "📡",
    subtitulo: "Superfamilia más grande - >800 en humanos",
    categorias: ["señalizacion", "proteinas"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y clasificación",
        items: [
          "7 dominios transmembrana α-hélice (estructura característica 7TM)",
          "Loop intracelular 3 y cola C-terminal interactúan con proteína G",
          "Familias: Clase A (rodopsina-like, 80%), B (secretina), C (metabotrópica), F (frizzled)",
          "Ligandos: fotones, iones, aminas, péptidos, proteínas, lípidos, nucleótidos",
          "Estados conformacionales: inactivo, activo (agonista), parcialmente activo (agonista parcial)",
          "~35% de fármacos aprobados actúan sobre GPCRs (β-bloqueadores, antihistamínicos, opioides)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Principales familias de proteínas G",
        datos: [
          { label: "Gs (estimulatoria)", value: "Activa adenilato ciclasa → ↑cAMP → PKA. Ej: β-adrenérgicos, D1" },
          { label: "Gi/o (inhibitoria)", value: "Inhibe adenilato ciclasa → ↓cAMP. Activa canales K⁺. Ej: α2, D2, opioides" },
          { label: "Gq/11", value: "Activa fosfolipasa C-β → IP₃ + DAG → ↑Ca²⁺ + PKC. Ej: α1, M1, H1" },
          { label: "G12/13", value: "Activa RhoGEFs → Rho → reorganización actina. Ej: trombina, LPA" },
          { label: "Transducina (Gt)", value: "Especializada en visión, activa fosfodiesterasa → ↓cGMP" },
          { label: "Golf", value: "Neuronas olfatorias, activa adenilato ciclasa tipo III" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Ciclo de activación GPCR",
        items: [
          "1. Unión de agonista induce cambio conformacional en GPCR",
          "2. GPCR actúa como GEF (guanine exchange factor) para proteína G heterotrímero",
          "3. Subunidad Gα libera GDP, une GTP, se disocia de Gβγ",
          "4. Gα-GTP y Gβγ activan efectores independientes (adenilato ciclasa, PLC-β, canales iónicos)",
          "5. Actividad GTPasa intrínseca de Gα hidroliza GTP → GDP (terminación)",
          "6. RGS proteins (Regulators of G protein Signaling) aceleran hidrólisis de GTP"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y desensibilización",
        items: [
          "Fosforilación por GRKs (GPCR kinases): fosforilan residuos Ser/Thr en cola C-terminal",
          "Reclutamiento de β-arrestinas: bloquean acoplamiento a proteína G (desensibilización)",
          "Internalización: β-arrestinas reclutan AP-2 y clatrina, endocitosis del receptor",
          "Reciclaje o degradación: endosomas de reciclaje devuelven receptor a membrana o lisosoma lo degrada",
          "Downregulation: exposición prolongada a agonista reduce expresión total de receptor",
          "Biased signaling: ligandos pueden activar preferentemente vía proteína G o β-arrestina"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Asma: β2-agonistas (salbutamol) activan Gs en músculo liso bronquial (broncodilatación)",
          "Hipertensión: bloqueadores β-adrenérgicos (propranolol), antagonistas AT1 (losartán)",
          "Esquizofrenia: antipsicóticos bloquean receptores D2 dopaminérgicos",
          "Dolor: opioides (morfina, fentanilo) activan receptores μ, δ, κ acoplados a Gi/o",
          "Úlcera péptica: inhibidores H2 (ranitidina) bloquean receptores histamínicos Gq"
        ]
      }
    ]
  },

  {
    id: "receptores-rtk",
    nombre: "Receptores Tirosina Quinasa (RTK)",
    icono: "🔱",
    subtitulo: "58 en humanos - crecimiento y diferenciación",
    categorias: ["señalizacion", "proteinas"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y familias",
        items: [
          "Dominio extracelular (unión ligando), dominio transmembrana único, dominio citoplasmático (tirosina quinasa)",
          "Familias: EGFR (ErbB1-4), PDGFR (α/β), FGFR (1-4), VEGFR (1-3), InsR/IGFR, Trk (A/B/C), c-Met, c-Kit",
          "Ligandos: factores de crecimiento (EGF, PDGF, FGF, NGF, insulina), citoquinas",
          "Activación por dimerización: unión de ligando induce homo/heterodimerización",
          "Autofosforilación: trans-fosforilación de residuos Tyr en dominios yuxtamembrana y C-terminal",
          "Sitios de acoplamiento: Tyr fosforiladas reclutan proteínas con dominios SH2, PTB"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Principales vías de señalización activadas",
        datos: [
          { label: "Ras/MAPK", value: "Grb2-SOS → Ras-GTP → Raf → MEK → ERK → proliferación" },
          { label: "PI3K/Akt", value: "PI3K → PIP₃ → PDK1/mTORC2 → Akt → supervivencia, metabolismo" },
          { label: "PLCγ", value: "Fosforilación directa → IP₃ + DAG → Ca²⁺ + PKC → diferenciación" },
          { label: "JAK/STAT", value: "Fosforilación STAT → dimerización → núcleo → transcripción" },
          { label: "Src family kinases", value: "Amplificación de señal, reorganización citoesqueleto" },
          { label: "Feedback negativo", value: "PTEN (fosfatasa PIP₃), MKPs (fosfatasas MAPK), Sprouty" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismo de activación (EGFR)",
        items: [
          "1. EGF se une a dominio extracelular, induce cambio conformacional",
          "2. Dimerización de receptores (simetría 2:2, ligando:receptor)",
          "3. Dominios quinasa intracelulares entran en contacto (activación alostérica)",
          "4. Trans-autofosforilación de múltiples residuos Tyr (~10-20 sitios)",
          "5. Reclutamiento de proteínas adaptadoras (Grb2, Shc) y efectoras (PI3K, PLCγ)",
          "6. Activación en cascada de vías Ras/MAPK y PI3K/Akt"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación negativa",
        items: [
          "Fosfatasas de tirosina: PTP1B, SHP2 defosforilan RTKs y efectores",
          "Ubiquitinación: Cbl ubiquitina RTKs activados → endocitosis → degradación lisosomal",
          "Inhibidores endógenos: SOCS proteins secuestran sitios de unión pTyr",
          "Feedback transcripcional: Sprouty, Spred bloquean señalización Ras/MAPK",
          "Compartimentalización: endocitosis puede perpetuar señal desde endosomas",
          "Heterodimerización no productiva: ErbB2 (sin ligando conocido) forma dímeros inactivos"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer de mama Her2+: sobreexpresión/amplificación ErbB2, trastuzumab (anticuerpo anti-Her2)",
          "Cáncer de pulmón: mutaciones activadoras en EGFR, tratamiento con gefitinib, erlotinib",
          "Leucemia mieloide crónica: translocación BCR-ABL genera RTK constitutivamente activa, imatinib",
          "GIST (tumores estroma gastrointestinal): mutaciones activadoras c-Kit, tratamiento imatinib",
          "Diabetes tipo 2: resistencia a insulina, receptor de insulina (IR) señalización alterada"
        ]
      }
    ]
  },

  {
    id: "fluidez-membrana",
    nombre: "Fluidez de Membrana",
    icono: "🌡️",
    subtitulo: "Viscosidad y movimiento molecular - regulación dinámica",
    categorias: ["estructura", "lipidos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Factores determinantes de fluidez",
        items: [
          "Temperatura: aumenta energía cinética, fluidifica membrana (transición fase gel → líquido-cristalino)",
          "Longitud cadenas hidrocarbonadas: cadenas largas (C18-20) reducen fluidez vs cortas (C14-16)",
          "Grado de insaturación: dobles enlaces cis introducen torceduras, aumentan fluidez",
          "Contenido de colesterol: efecto dual (reduce fluidez a alta T, aumenta a baja T)",
          "Composición lipídica: proporción PC/PE/PS/esfingomielina afecta empaquetamiento",
          "Proteínas de membrana: ocupan ~30-50% área, restringen movimiento lipídico local"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Tipos de movimiento molecular",
        datos: [
          { label: "Difusión lateral", value: "~1 μm²/s para lípidos, células ~10 μm intercambian lípidos en ~1s" },
          { label: "Rotación alrededor eje", value: "~10⁹ revoluciones/segundo (nanosegundos)" },
          { label: "Flexión cadenas", value: "Frecuencia ~10⁸-10⁹ s⁻¹, aumenta hacia extremo metilo terminal" },
          { label: "Flip-flop (transversal)", value: "t½ = días-semanas espontáneo, facilitado por flipasas (ms-s)" },
          { label: "Difusión proteínas", value: "10⁻¹⁰-10⁻¹² cm²/s, 100-10,000× más lento que lípidos" },
          { label: "Temperatura transición Tm", value: "-20°C (DOPC) a +60°C (dipalmitoil PC)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismos de adaptación homeoviscosa",
        items: [
          "Bacterias: ajustan proporción de ácidos grasos saturados/insaturados según temperatura",
          "Plantas: aumentan insaturación en membranas cloroplásticas en clima frío",
          "Mamíferos: mantienen fluidez constante ajustando colesterol y composición lipídica",
          "Peces de aguas frías: alto contenido de ácidos grasos poliinsaturados (EPA, DHA)",
          "Termófilos: lípidos con cadenas ramificadas o enlaces éter (archaea)",
          "Regulación transcripcional: desaturasas de ácidos grasos responden a temperatura"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Hipotermia: reducción de fluidez compromete función de transportadores y receptores",
          "Fiebre: aumento de fluidez puede alterar dominios lipídicos y señalización",
          "Anestesia: anestésicos generales aumentan fluidez, alteran canales iónicos",
          "Alcoholismo crónico: etanol aumenta fluidez, adaptación compensatoria aumenta colesterol",
          "Síndrome de Sjögren-Larsson: defecto en oxidación alcoholes grasos altera composición membrana"
        ]
      }
    ]
  },

  {
    id: "asimetria-membrana",
    nombre: "Asimetría de Membrana",
    icono: "⚖️",
    subtitulo: "Distribución diferencial - dos monocapas distintas",
    categorias: ["estructura", "lipidos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Distribución lipídica transbilayer",
        items: [
          "Monocapa externa (exoplásmica): PC (fosfatidilcolina), esfingomielina, glucolípidos (100%)",
          "Monocapa interna (citoplásmica): PS (fosfatidilserina, 80-90%), PE (fosfatidiletanolamina, 80%)",
          "Fosfatidilinositol: exclusivamente en monocapa citoplásmica (señalización PI(4,5)P₂)",
          "Cardiolipina: exclusiva de membrana mitocondrial interna",
          "Colesterol: distribución asimétrica, ligeramente más en monocapa externa",
          "Asimetría establece identidad funcional de cada monocapa"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Enzimas que mantienen/alteran asimetría",
        datos: [
          { label: "Flipasas (tipo P4-ATPasas)", value: "ATP-dependientes, PS y PE hacia monocapa citosólica" },
          { label: "Flopasas (ABC transporters)", value: "ATP-dependientes, exportan lípidos hacia monocapa externa" },
          { label: "Scramblasas", value: "Bidireccionales, colapsan asimetría (activadas por Ca²⁺ en apoptosis)" },
          { label: "Flippasas mitocondria", value: "Específicas para cardiolipina y fosfatidilglicerol" },
          { label: "TMEM16F (scramblasa)", value: "Canal fosfolípidos activado por Ca²⁺, exposición PS" },
          { label: "XK-related protein 8", value: "Scramblasa constitutiva en eritrocitos" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Significado funcional",
        items: [
          "Señal 'eat-me': exposición PS en apoptosis recluta macrófagos (reconocimiento por receptor TAM)",
          "Coagulación: PS expuesta en plaquetas activadas nuclea complejos de coagulación (factor Xa, trombina)",
          "Señalización: PI(4,5)P₂ en monocapa citosólica recluta proteínas con dominios PH, PX",
          "Curvatura de membrana: lípidos de forma cónica (PS, PE) inducen curvatura negativa",
          "Anclaje proteico: PS proporciona carga negativa para atracción electrostática",
          "Identidad organular: composición lipídica específica marca compartimentos (ER, Golgi, endosomas)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Síndrome de Scott: defecto en scramblasa (TMEM16F), deficiencia hemostática (no exposición PS)",
          "Trombosis: exposición anormal de PS en eritrocitos (drepanocitosis) promueve coagulación",
          "Síndrome antifosfolípido: autoanticuerpos reconocen PS, causan trombosis",
          "Estomatocitosis hereditaria: defectos en flipasas (ATP11C) causan anemia hemolítica",
          "Colestasis intrahepática familiar: mutaciones en FIC1 (flipasa) causan acumulación biliar"
        ]
      }
    ]
  }
];
