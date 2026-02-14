// ═══════════════════════════════════════════════════════════
// PROTEINAS-DATA.JS - Base de datos de proteínas
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const PROTEINAS_DATA = [
  {
    id: 'hemoglobina',
    nombre: 'Hemoglobina',
    subtitulo: 'Proteína transportadora de oxígeno',
    icono: '🔴',
    categorias: ['transporte'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Metaloproteína conjugada. Contiene grupo prostético hemo (porfirina + Fe²⁺)',
          '<strong>Localización:</strong> Eritrocitos (glóbulos rojos). Concentración ~15 g/dL en sangre (hombres), ~13.5 g/dL (mujeres)',
          '<strong>Estructura cuaternaria:</strong> Tetrámero (α₂β₂). 2 cadenas α (141 aa cada una), 2 cadenas β (146 aa). Peso molecular ~64.5 kDa',
          '<strong>Función principal:</strong> Transporte de O₂ desde pulmones a tejidos. También transporta CO₂ (10-20%) y H⁺ (efecto Bohr)',
          '<strong>Vida media:</strong> 120 días (vida media del eritrocito). Degradación en bazo e hígado',
          '<strong>Cooperatividad:</strong> Unión cooperativa de O₂. Curva de saturación sigmoidal (vs hiperbólica de mioglobina)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Estructura y grupo hemo',
        datos: [
          { label: 'Grupo hemo', value: 'Protoporfirina IX + Fe²⁺. Un hemo por subunidad (4 totales). Fe²⁺ se coordina con 4 nitrógenos de porfirina, His proximal (F8) y O₂.' },
          { label: 'Estado T (tenso)', value: 'Desoxihemoglobina. Baja afinidad por O₂. Estabilizada por enlaces salinos entre subunidades. Conformación predominante en tejidos (PO₂ baja).' },
          { label: 'Estado R (relajado)', value: 'Oxihemoglobina. Alta afinidad por O₂. Ruptura de enlaces salinos tras unión de primer O₂. Conformación predominante en pulmones (PO₂ alta).' },
          { label: 'Transición alostérica', value: 'Unión de O₂ a una subunidad facilita unión en otras (cooperatividad positiva). Coeficiente de Hill n ≈ 2.8-3.0. Cambio conformacional T→R.' },
          { label: 'His distal (E7)', value: 'Impide unión de CO en ángulo óptimo. Discrimina contra CO (aún así, CO tiene 250x más afinidad que O₂). Esencial para función.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Regulación alostérica',
        items: [
          '<strong>2,3-BPG (2,3-bisfosfoglicerato):</strong> Regulador alostérico negativo. Se une en cavidad central (estado T). ↓Afinidad por O₂. Concentración aumenta en hipoxia crónica (altitud)',
          '<strong>Efecto Bohr:</strong> ↓pH (↑H⁺) y ↑CO₂ → ↓afinidad por O₂. Favorece liberación de O₂ en tejidos activos (producen CO₂, lactato). His146 (β) se protona',
          '<strong>Temperatura:</strong> ↑Temperatura → ↓afinidad por O₂. Liberación facilitada en tejidos metabólicamente activos (músculos en ejercicio)',
          '<strong>P50:</strong> PO₂ a la que hemoglobina está 50% saturada. Normal: ~27 mmHg. Desplazamiento a derecha (↑P50) = ↓afinidad. Izquierda (↓P50) = ↑afinidad',
          '<strong>Transporte de CO₂:</strong> 10-20% como carbamino-hemoglobina (CO₂ unido a grupos amino N-terminal). 70% como HCO₃⁻ (catalizado por anhidrasa carbónica). 10% disuelto'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Variantes de hemoglobina',
        items: [
          '<strong>HbA (adulto):</strong> α₂β₂. 97% de Hb en adultos. Variante normal predominante post-nacimiento',
          '<strong>HbA₂:</strong> α₂δ₂. 2-3% de Hb adulta. Aumentada en β-talasemia minor (mecanismo compensatorio)',
          '<strong>HbF (fetal):</strong> α₂γ₂. Predominante en feto. Mayor afinidad por O₂ que HbA (no une 2,3-BPG eficientemente). Facilita transferencia O₂ placentaria. <1% en adultos',
          '<strong>HbA₁c (hemoglobina glicosilada):</strong> HbA con glucosa unida no enzimáticamente a Val N-terminal de cadena β. Refleja glucemia promedio de 2-3 meses. Marcador de control diabético (objetivo <7%)',
          '<strong>Hemoglobina embrionaria:</strong> Gower 1 (ζ₂ε₂), Portland (ζ₂γ₂), Gower 2 (α₂ε₂). Primeras semanas de gestación. Reemplazadas por HbF'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Anemia drepanocítica (células falciformes):</strong> Mutación puntual en gen β-globina (Glu6→Val). HbS polimeriza en desoxigenación → eritrocitos falciformes → hemólisis, oclusión vascular. Crisis vasooclusivas dolorosas, infartos, susceptibilidad a infecciones',
          '<strong>Talasemias:</strong> Déficit cuantitativo de cadenas de globina. α-talasemia: deleciones de genes α (4 copias normales). β-talasemia: mutaciones en gen β. Anemia microcítica hipocrómica. Talasemia major (β⁰/β⁰): dependencia transfusional',
          '<strong>HbH (β₄):</strong> α-talasemia severa (3 genes α deletados). Tetrámeros de cadena β inestables. Anemia hemolítica moderada-severa. Cuerpos de inclusión en eritrocitos',
          '<strong>Intoxicación por CO:</strong> CO tiene ~250x más afinidad que O₂ por hemoglobina. Carboxihemoglobina (HbCO) no transporta O₂. Hipoxia tisular. Tratamiento: O₂ al 100%, cámara hiperbárica en casos severos',
          '<strong>Metahemoglobinemia:</strong> Fe²⁺ oxidado a Fe³⁺. Metahemoglobina (MetHb) no une O₂. Causas: fármacos (dapsona, lidocaína, nitratos), déficit de citocromo b5 reductasa. Cianosis, hipoxia. Tratamiento: azul de metileno',
          '<strong>HbA₁c como marcador:</strong> Diagnóstico de diabetes (≥6.5%), prediabetes (5.7-6.4%). Monitor de control glucémico. Limitaciones: anemias hemolíticas (falsamente bajo), uremia (falsamente alto)',
          '<strong>Electroforesis de hemoglobina:</strong> Separa variantes por carga. Diagnóstico de hemoglobinopatías. HbS migra diferente que HbA. HbA₂ cuantificable (↑en β-talasemia minor)',
          '<strong>Enfermedad de hemoglobina C:</strong> Mutación Glu6→Lys en β-globina. Anemia hemolítica leve. Cristales de HbC en eritrocitos. Común en África Occidental'
        ]
      }
    ]
  },
  {
    id: 'colageno',
    nombre: 'Colágeno',
    subtitulo: 'Proteína estructural de tejido conectivo',
    icono: '🧵',
    categorias: ['estructurales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Proteína fibrosa estructural. Familia de proteínas (>28 tipos en humanos)',
          '<strong>Abundancia:</strong> Proteína más abundante en mamíferos (~30% de proteína total). Componente principal de matriz extracelular',
          '<strong>Estructura primaria:</strong> Secuencia repetitiva Gly-X-Y (X frecuentemente Pro, Y frecuentemente Hidroxiprolina). Glicina cada tercer residuo es crítico',
          '<strong>Triple hélice:</strong> 3 cadenas α enrolladas (hélice levógira individual, superhélice dextrógira). Estructura característica de colágenos fibrilares',
          '<strong>Localización:</strong> Piel, hueso, tendones, ligamentos, cartílago, vasos sanguíneos, córnea. Tisular-específico según tipo',
          '<strong>Función:</strong> Resistencia tensil, estructura, soporte mecánico, adhesión celular, morfogénesis'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Tipos de colágeno',
        datos: [
          { label: 'Tipo I', value: 'Más abundante (90% del colágeno corporal). Piel, hueso, tendones, ligamentos, córnea. Estructura fibrilar. [α1(I)]₂α2(I). Resistencia tensil.' },
          { label: 'Tipo II', value: 'Cartílago (hialino, elástico), humor vítreo, núcleo pulposo. Fibrilar. [α1(II)]₃. Resistencia a presión. Condrogénesis.' },
          { label: 'Tipo III', value: 'Piel fetal, vasos sanguíneos, órganos internos (hígado, bazo). Fibrilar. [α1(III)]₃. Reticulina. Junto con tipo I en tejidos distensibles.' },
          { label: 'Tipo IV', value: 'Membrana basal (lámina basal). No fibrilar (formador de red). Filtración glomerular, barrera hematoencefálica. Mutaciones → síndrome de Alport.' },
          { label: 'Tipo V', value: 'Ubicuo, junto con tipo I. Fibrilar. Núcleo de fibrillas heterotípicas (V + I). Córnea, placenta. Mutaciones → síndrome de Ehlers-Danlos clásico.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Biosíntesis y modificaciones postraduccionales',
        items: [
          '<strong>Síntesis intracelular:</strong> Procolágeno sintetizado en RE rugoso. Cadenas α (pre-pro-α) con péptidos N- y C-terminales (propéptidos)',
          '<strong>Hidroxilación:</strong> Prolil hidroxilasa y lisil hidroxilasa (requieren vitamina C, α-cetoglutarato, Fe²⁺). Hidroxiprolina e hidroxilisina estabilizan triple hélice',
          '<strong>Glicosilación:</strong> Residuos de hidroxilisina glicosilados (galactosa, glucosa-galactosa). En RE',
          '<strong>Ensamblaje:</strong> Alineación de cadenas α por propéptidos C-terminales → formación de puentes disulfuro → plegamiento de triple hélice (dirección C→N)',
          '<strong>Secreción:</strong> Procolágeno secretado por exocitosis → espacio extracelular',
          '<strong>Procesamiento extracelular:</strong> Procolágeno peptidasa escinde propéptidos N- y C-terminales → tropocolágeno (colágeno maduro)',
          '<strong>Fibrilogénesis:</strong> Autoensamblaje de tropocolágeno en fibrillas. Patrón escalonado (67 nm de periodicidad). Entrecruzamiento covalente (lisil oxidasa, requiere cobre)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Entrecruzamiento y maduración',
        items: [
          '<strong>Lisil oxidasa:</strong> Desaminación oxidativa de lisina e hidroxilisina → alisilina, hidroxialisilina (aldehídos reactivos). Enzima dependiente de cobre',
          '<strong>Condensación aldólica:</strong> Aldehídos reaccionan con lisinas/hidroxilisinas de moléculas adyacentes → enlaces covalentes (bases de Schiff → aldol)',
          '<strong>Enlaces maduros:</strong> Histidinoalanina, aldol-histidina, piridolinas. Aumentan resistencia tensil. Acumulación con edad (rigidez)',
          '<strong>Glicosilación avanzada (AGEs):</strong> Glicación no enzimática aumenta con edad y diabetes. Productos finales de glicosilación avanzada. Rigidez vascular, complicaciones diabéticas',
          '<strong>Degradación:</strong> Colagenasas (MMP-1, MMP-8, MMP-13). Cortan triple hélice. Gelatinasas degradan fragmentos. Balance síntesis/degradación regula remodelación tisular'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Escorbuto (déficit de vitamina C):</strong> Ácido ascórbico es cofactor de prolil/lisil hidroxilasas. Síntesis defectuosa de colágeno → fragilidad capilar, hemorragias (petequias, equimosis, gingivales), cicatrización deficiente. Hemorragias perifoliculares',
          '<strong>Osteogénesis imperfecta (huesos de cristal):</strong> Mutaciones en COL1A1/COL1A2 (colágeno tipo I). Fragilidad ósea, fracturas múltiples, escleras azules, dentinogénesis imperfecta. Tipos I-IV por severidad. Tipo II letal perinatal',
          '<strong>Síndrome de Ehlers-Danlos (EDS):</strong> Grupo heterogéneo. EDS clásico: mutaciones en COL5A1/COL5A2. Hipermovilidad articular, hiperextensibilidad cutánea, fragilidad tisular, cicatrización anormal. EDS vascular: COL3A1, rupturas arteriales',
          '<strong>Síndrome de Alport:</strong> Mutaciones en COL4A3/4/5 (colágeno tipo IV de membrana basal glomerular). Hematuria, insuficiencia renal progresiva, sordera neurosensorial, lenticono. Ligado a X (80%) o autosómico recesivo',
          '<strong>Fibrosis:</strong> Deposición excesiva de colágeno. Cirrosis hepática, fibrosis pulmonar idiopática, esclerodermia. Desequilibrio síntesis/degradación (↑TGF-β, ↓MMPs)',
          '<strong>Latirismo:</strong> Intoxicación por β-aminopropionitrilo (BAPN, guisantes Lathyrus). Inhibe lisil oxidasa → déficit de entrecruzamiento → laxitud de ligamentos, aneurismas',
          '<strong>Enfermedad de Menkes:</strong> Déficit de cobre (defecto en ATP7A). ↓Lisil oxidasa → colágeno defectuoso. Cabello ensortijado, retraso del desarrollo, aneurismas, osteoporosis',
          '<strong>Biomarcadores de recambio óseo:</strong> Telopéptidos C-terminal/N-terminal de colágeno tipo I (CTX, NTX) en orina/suero. Marcadores de resorción ósea. Osteoporosis, Paget'
        ]
      }
    ]
  },
  {
    id: 'anticuerpos',
    nombre: 'Anticuerpos (Inmunoglobulinas)',
    subtitulo: 'Proteínas de defensa inmunológica',
    icono: '🛡️',
    categorias: ['defensa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Glicoproteínas. Familia de inmunoglobulinas (Ig). Proteínas de defensa inmune adaptativa',
          '<strong>Producción:</strong> Células B y células plasmáticas (células B diferenciadas). Respuesta a antígenos específicos',
          '<strong>Estructura básica:</strong> Forma de Y. 4 cadenas polipeptídicas: 2 cadenas pesadas (H, heavy, ~50 kDa), 2 cadenas ligeras (L, light, ~25 kDa)',
          '<strong>Dominios:</strong> Dominios inmunoglobulina (~110 aa, estructura β-plegada). Cadena pesada: 4-5 dominios. Cadena ligera: 2 dominios',
          '<strong>Regiones variables y constantes:</strong> Región V (N-terminal, une antígeno), región C (funciones efectoras)',
          '<strong>Diversidad:</strong> >10¹⁰ especificidades posibles. Recombinación V(D)J, mutación somática, diversidad combinatoria'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Clases de inmunoglobulinas',
        datos: [
          { label: 'IgG', value: 'Más abundante en suero (75%). Atraviesa placenta. Opsonización, fijación de complemento (IgG1, IgG3), ADCC. 4 subclases. Vida media ~21 días. Respuesta secundaria.' },
          { label: 'IgM', value: 'Pentámero (cadena J). Primera en respuesta primaria. Potente activador de complemento. No atraviesa placenta. Marcador de infección aguda. IgM fetal sugiere infección intrauterina.' },
          { label: 'IgA', value: 'Predominante en secreciones (saliva, lágrimas, leche, mucosas). Dímero secretorio (componente secretorio protege de proteólisis). Inmunidad de mucosas. Deficiencia de IgA: más común (1:600).' },
          { label: 'IgE', value: 'Concentración muy baja en suero. Une mastocitos/basófilos vía FcεRI. Degranulación → hipersensibilidad inmediata (alergia, asma). Defensa contra parásitos. ↑en atopia.' },
          { label: 'IgD', value: 'Función poco clara. Receptor de células B maduras naive (junto con IgM). Baja concentración sérica. Posible rol en inmunidad de mucosas.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Estructura y función',
        items: [
          '<strong>Regiones hipervariables (CDRs):</strong> Complementarity-determining regions. 3 CDRs en VL, 3 en VH. Forman sitio de unión a antígeno (parátopo). Alta variabilidad',
          '<strong>Región Fab:</strong> Fragment antigen-binding. Contiene sitio de unión a antígeno. 2 Fab por molécula de IgG (bivalente)',
          '<strong>Región Fc:</strong> Fragment crystallizable. Región constante. Funciones efectoras: unión a receptores Fc (FcγR, FcεR), fijación de complemento (C1q)',
          '<strong>Bisagra:</strong> Región flexible entre Fab y Fc. Permite movimiento de brazos Fab. Rico en prolina. Susceptible a proteólisis (papaína, pepsina)',
          '<strong>Puentes disulfuro:</strong> Interchain (H-H, H-L), intrachain (dentro de dominios Ig). Estabilizan estructura cuaternaria',
          '<strong>Glicosilación:</strong> Región Fc tiene N-glicanos. Afectan funciones efectoras (ADCC, CDC). Modificación de glicanos cambia actividad (IgG afucosiladas ↑ADCC)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Mecanismos efectores',
        items: [
          '<strong>Opsonización:</strong> Anticuerpo recubre patógeno → fagocitosis por macrófagos/neutrófilos vía receptores FcγR. Mejora clearance',
          '<strong>Fijación de complemento:</strong> IgM (muy eficiente), IgG1, IgG3 unen C1q → cascada de complemento → MAC (complejo de ataque a membrana) → lisis celular',
          '<strong>ADCC (citotoxicidad celular dependiente de anticuerpos):</strong> Células NK, macrófagos reconocen Fc de IgG unida a célula diana → muerte de célula diana. Importante en antitumoral/antiviral',
          '<strong>Neutralización:</strong> Anticuerpo bloquea sitios de unión de patógeno/toxina. Previene entrada viral, bloquea toxinas (antitoxinas: difteria, tétanos)',
          '<strong>Aglutinación:</strong> Entrecruzamiento de antígenos particulados. Facilita fagocitosis. Test de Coombs (anemia hemolítica autoinmune)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Deficiencia selectiva de IgA:</strong> Inmunodeficiencia primaria más común (1:600 caucásicos). Mayoría asintomáticos. Infecciones respiratorias/GI recurrentes. Alergia alimentaria, autoinmunidad. Riesgo de reacciones transfusionales (anti-IgA)',
          '<strong>Agammaglobulinemia ligada al X (XLA, Bruton):</strong> Mutación en BTK (tirosina quinasa). Ausencia de células B maduras. Infecciones bacterianas recurrentes (Streptococcus, Haemophilus). IgG, IgA, IgM muy bajas. Tratamiento: IVIG',
          '<strong>Inmunodeficiencia variable común (CVID):</strong> Hipogammaglobulinemia (↓IgG + ↓IgA o ↓IgM). Infecciones sinopulmonares recurrentes, autoinmunidad, granulomas, linfomas. Tratamiento: IVIG',
          '<strong>Mieloma múltiple:</strong> Neoplasia de células plasmáticas. Pico monoclonal (proteína M) en electroforesis. IgG (55%), IgA (20%), cadenas ligeras (15%). Anemia, hipercalcemia, insuficiencia renal, lesiones líticas óseas',
          '<strong>Macroglobulinemia de Waldenström:</strong> Linfoma linfoplasmocitoide. IgM monoclonal. Síndrome de hiperviscosidad (sangrado, déficits neurológicos, insuficiencia cardíaca). Citopenias',
          '<strong>Gammapatía monoclonal de significado incierto (MGUS):</strong> Proteína M <3 g/dL, células plasmáticas <10%, asintomático. Riesgo 1%/año de progresión a mieloma. Seguimiento',
          '<strong>Anticuerpos monoclonales terapéuticos:</strong> Rituximab (anti-CD20, linfomas), trastuzumab (anti-HER2, cáncer mama), adalimumab (anti-TNF, artritis reumatoide). Revolucionaron oncología/autoinmunidad',
          '<strong>Enfermedad hemolítica del recién nacido:</strong> IgG materna anti-D (Rh) atraviesa placenta → hemólisis fetal. Prevención: RhoGAM (anti-D) a madres Rh- en embarazo',
          '<strong>Test de Coombs:</strong> Directo (detecta IgG/C3 en eritrocitos, anemia hemolítica autoinmune). Indirecto (detecta anticuerpos en suero, screening pre-transfusional)'
        ]
      }
    ]
  },
  {
    id: 'actina-miosina',
    nombre: 'Actina y Miosina',
    subtitulo: 'Proteínas motoras del citoesqueleto',
    icono: '💪',
    categorias: ['motoras', 'estructurales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Actina:</strong> Proteína globular (G-actina, 42 kDa) que polimeriza en filamentos (F-actina). Componente principal de filamentos delgados',
          '<strong>Miosina:</strong> Superfamilia de proteínas motoras. Miosina II (músculo) es hexámero: 2 cadenas pesadas (MHC, ~220 kDa), 4 cadenas ligeras',
          '<strong>Localización:</strong> Músculo esquelético, cardíaco, liso. Células no musculares (citoesqueleto, citocinesis, migración)',
          '<strong>Función:</strong> Contracción muscular, motilidad celular, transporte intracelular, citocinesis, cambios de forma celular',
          '<strong>Interacción:</strong> Ciclo de puente cruzado actina-miosina acoplado a hidrólisis de ATP. Motor molecular',
          '<strong>Regulación:</strong> Ca²⁺-dependiente. Troponina-tropomiosina (músculo esquelético/cardíaco), fosforilación de cadena ligera (músculo liso)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Estructura del sarcómero',
        datos: [
          { label: 'Filamento delgado', value: 'F-actina (doble hélice de G-actina), tropomiosina (bloquea sitios de unión a miosina en reposo), troponina (complejo TnT-TnI-TnC, sensor de Ca²⁺).' },
          { label: 'Filamento grueso', value: 'Miosina II (~300 moléculas). Cabezas de miosina (S1) proyectan de tallo. Orientación bipolar (zona H central sin cabezas). Puentes cruzados con actina.' },
          { label: 'Banda A', value: 'Anisótropa (birrefringente). Longitud del filamento grueso (~1.6 μm). No cambia en contracción. Zona oscura al microscopio.' },
          { label: 'Banda I', value: 'Isótropa. Solo filamento delgado. Se acorta en contracción. Zona clara. Bisecada por línea Z.' },
          { label: 'Línea Z', value: 'Disco Z. Ancla filamentos delgados. Define límites del sarcómero. Contiene α-actinina (proteína de entrecruzamiento).' },
          { label: 'Sarcómero', value: 'Unidad contráctil. Z a Z. Longitud óptima ~2.0-2.2 μm (máxima superposición actina-miosina). Acortamiento en contracción.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Ciclo de puente cruzado',
        items: [
          '<strong>1. Estado de rigor:</strong> Miosina unida fuertemente a actina (sin nucleótido). Muerte: rigidez cadavérica (depleción ATP)',
          '<strong>2. Unión de ATP:</strong> ATP une cabeza de miosina → cambio conformacional → disociación de actina. Miosina-ATP tiene baja afinidad por actina',
          '<strong>3. Hidrólisis de ATP:</strong> Miosina hidroliza ATP → ADP + Pi (quedan unidos). Cabeza en estado "cocked" (alta energía). Aún no unida a actina',
          '<strong>4. Unión débil:</strong> Miosina-ADP-Pi se une débilmente a actina. Sitios de unión expuestos (Ca²⁺ movió tropomiosina)',
          '<strong>5. Power stroke (golpe de fuerza):</strong> Liberación de Pi → cambio conformacional → rotación de cabeza (~10 nm) → filamento delgado desliza. Fuerza generada',
          '<strong>6. Liberación de ADP:</strong> ADP se libera → estado de rigor fuerte. Ciclo se repite con unión de nuevo ATP',
          '<strong>Velocidad:</strong> ~5 ciclos/segundo (músculo esquelético). 100-1000x/segundo (músculo liso/no muscular, miosinas no convencionales)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación por Ca²⁺',
        items: [
          '<strong>Músculo esquelético/cardíaco (troponina-tropomiosina):</strong> [Ca²⁺] baja: tropomiosina bloquea sitios de unión en actina. Ca²⁺ une TnC → cambio conformacional → TnI libera actina → tropomiosina se desplaza → exposición de sitios',
          '<strong>Troponina C (TnC):</strong> Subunidad sensora de Ca²⁺. 4 sitios de unión a Ca²⁺ (2 regulatorios de alta afinidad). Homólogo a calmodulina',
          '<strong>Troponina I (TnI):</strong> Subunidad inhibitoria. En reposo, se une a actina y previene interacción con miosina. Ca²⁺ a TnC libera inhibición',
          '<strong>Troponina T (TnT):</strong> Une complejo troponina a tropomiosina. Ancla sistema regulatorio a filamento delgado',
          '<strong>Músculo liso (fosforilación de cadena ligera):</strong> Ca²⁺ → Ca²⁺-calmodulina → activa MLCK (quinasa de cadena ligera de miosina) → fosforila Ser19 de cadena ligera regulatoria → activa miosina → contracción',
          '<strong>Fosforilación de MLC:</strong> Incrementa actividad ATPasa de miosina. Desfosforilación por MLCP (fosfatasa) → relajación. Balance MLCK/MLCP determina tono'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Distrofia muscular de Duchenne (DMD):</strong> Déficit de distrofina (proteína que conecta actina citoplasmática a matriz extracelular). Ligado a X. Debilidad muscular progresiva, inicio ~3-5 años. Cardiomiopatía, insuficiencia respiratoria. CK muy elevada',
          '<strong>Distrofia muscular de Becker (BMD):</strong> Mutaciones en distrofina (menos severas que DMD). Distrofina parcialmente funcional. Inicio más tardío, progresión más lenta',
          '<strong>Cardiomiopatía hipertrófica (CMH):</strong> Mutaciones en genes sarcoméricos (β-miosina cadena pesada 30-40%, MYBPC3, TnT, TnI, actina). Hipertrofia ventricular, obstrucción tracto salida, arritmias, muerte súbita. Causa más común en atletas jóvenes',
          '<strong>Miopatías por cuerpos de inclusión:</strong> Acumulación de proteínas mal plegadas (actina, miosina). Debilidad muscular progresiva (cuádriceps, flexores de dedos). Resistente a inmunosupresión',
          '<strong>Miopatía nemalínica:</strong> Mutaciones en α-actina, nebulina, tropomiosina. Bastones nemalínicos (agregados de α-actinina, actina). Debilidad muscular, hipotonía. Severidad variable',
          '<strong>Intoxicación por toxina botulínica:</strong> Bloquea liberación de ACh en unión neuromuscular → parálisis flácida. Uso terapéutico: distonías, espasticidad, cosmético (Botox)',
          '<strong>Troponinas cardíacas (cTnI, cTnT):</strong> Marcadores de daño miocárdico. Elevadas en infarto agudo de miocardio (IAM), miocarditis. Alta sensibilidad y especificidad. TnI/TnT-hs (alta sensibilidad) detectan microinfartos',
          '<strong>Estatinas y miopatía:</strong> Inhibidores de HMG-CoA reductasa. Efectos adversos: mialgias (5-10%), miopatía (<0.1%), rabdomiólisis (muy rara). CK elevada. Mecanismo: ↓ubiquinona, ↓prenilación',
          '<strong>Hipertermia maligna:</strong> Mutaciones en receptor de rianodina (RyR1, canal de Ca²⁺ de retículo sarcoplásmico). Anestésicos volátiles + succinilcolina → liberación masiva de Ca²⁺ → contractura, hipertermia, rabdomiólisis. Emergencia. Tratamiento: dantroleno'
        ]
      }
    ]
  },
  {
    id: 'albumina',
    nombre: 'Albúmina Sérica',
    subtitulo: 'Proteína plasmática transportadora',
    icono: '🩸',
    categorias: ['transporte'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Proteína globular. Cadena polipeptídica única de 585 aminoácidos (~66.5 kDa)',
          '<strong>Síntesis:</strong> Hepatocitos. Producción ~12-15 g/día. Principal proteína sintetizada por hígado',
          '<strong>Concentración sérica:</strong> 3.5-5.5 g/dL (35-55 g/L). Proteína más abundante en plasma (55-60% de proteínas totales)',
          '<strong>Vida media:</strong> ~20 días. Degradación principalmente en músculo esquelético, piel, hígado',
          '<strong>Estructura:</strong> 3 dominios homólogos (I, II, III). Cada dominio tiene 2 subdominios (A y B). 17 puentes disulfuro. Forma de corazón',
          '<strong>Carga neta:</strong> Negativa a pH fisiológico (pI ~4.7). Alta concentración de residuos ácidos (Asp, Glu)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Funciones principales',
        datos: [
          { label: 'Presión oncótica', value: '~80% de presión oncótica plasmática (~25 mmHg). Mantiene volumen intravascular. Hipoalbuminemia → edema (↓presión oncótica → extravasación fluido).' },
          { label: 'Transporte de lípidos', value: 'Ácidos grasos libres (6-7 sitios de unión de alta afinidad). Facilita movilización desde tejido adiposo. Transporte a tejidos para β-oxidación.' },
          { label: 'Transporte de hormonas', value: 'Hormonas tiroideas (T4, T3), cortisol, aldosterona, testosterona, progesterona. Modulación de biodisponibilidad (solo fracción libre es activa).' },
          { label: 'Transporte de fármacos', value: 'Warfarina, fenilbutazona, AINEs, penicilinas, sulfonamidas. Competencia por sitios de unión. Desplazamiento aumenta fracción libre → toxicidad.' },
          { label: 'Transporte de metales', value: 'Cu²⁺, Ni²⁺, Ca²⁺, Zn²⁺. Sitio N-terminal para Cu²⁺ y Ni²⁺. Protección contra toxicidad de metales pesados.' },
          { label: 'Capacidad antioxidante', value: 'Cisteína-34 (único tiol libre). Scavenger de radicales libres. Contribuye significativamente a capacidad antioxidante plasmática.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Sitios de unión a ligandos',
        items: [
          '<strong>Sitio de unión a ácidos grasos:</strong> 7 sitios principales (FA1-FA7). Distribución asimétrica. FA2, FA4, FA5 de mayor afinidad. Dominios IIA, IIIA principalmente',
          '<strong>Sitio Sudlow I:</strong> Subdominio IIA. Une warfarina, fenilbutazona, digitoxina. Cavidad hidrofóbica grande. Flexibilidad conformacional',
          '<strong>Sitio Sudlow II:</strong> Subdominio IIIA. Une ibuprofeno, ketoprofeno, diazepam. Cavidad con residuos polares',
          '<strong>Sitio N-terminal de metales:</strong> Asp-Ala-His-Lys. Sitio de alta afinidad para Cu²⁺ y Ni²⁺. Actividad esterasa y peroxidasa débiles',
          '<strong>Modificaciones alostéricas:</strong> Unión de ligando en un sitio afecta afinidad en otros. Cooperatividad heterótropa (ácidos grasos modulan unión de fármacos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Marcador clínico',
        items: [
          '<strong>Estado nutricional:</strong> Hipoalbuminemia crónica sugiere malnutrición proteica. Vida media larga → no refleja cambios agudos (usar prealbúmina/transferrina para agudos)',
          '<strong>Función hepática:</strong> Síntesis exclusivamente hepática. ↓Albúmina en enfermedad hepática crónica (cirrosis). Prueba de síntesis hepática',
          '<strong>Inflamación:</strong> Reactante de fase aguda negativo. ↓En inflamación (↑IL-6 → ↓transcripción de albúmina). No específico de desnutrición',
          '<strong>Pérdida renal:</strong> Albuminuria en enfermedad glomerular. Síndrome nefrótico: proteinuria >3.5 g/día, hipoalbuminemia, edema, hiperlipidemia',
          '<strong>Pérdida gastrointestinal:</strong> Enteropatía pierde-proteínas. Enfermedad de Ménétrier, linfangiectasia intestinal. Hipoalbuminemia sin proteinuria'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Analbuminemia congénita:</strong> Muy rara. Mutaciones en gen ALB. Albúmina <1 g/dL. Sorprendentemente asintomáticos (lipoproteínas compensan transporte). Edema leve, hiperlipidemia, hipotensión ortostática',
          '<strong>Síndrome nefrótico:</strong> Albúmina <3 g/dL, proteinuria >3.5 g/día. Edema generalizado (anasarca). Hipercoagulabilidad (pérdida de antitrombina III). Infecciones (pérdida de inmunoglobulinas)',
          '<strong>Cirrosis hepática:</strong> Hipoalbuminemia por ↓síntesis + ↓vida media + dilución (retención Na⁺/H₂O). Ascitis (↓presión oncótica + hipertensión portal). Albúmina <2.8 g/dL → ascitis refractaria',
          '<strong>Kwashiorkor:</strong> Malnutrición proteica severa con ingesta calórica relativamente preservada. Edema (hipoalbuminemia), hepatomegalia, cambios en piel/cabello. África subsahariana',
          '<strong>Albúmina humana terapéutica:</strong> Expansor de volumen (shock, hipovolemia). Paracentesis de gran volumen (cirrosis). Síndrome hepatorrenal. No mejora mortalidad en críticos (vs cristaloides)',
          '<strong>Gradiente albúmina suero-ascitis (GASA):</strong> [Albúmina suero] - [Albúmina ascitis]. ≥1.1 g/dL sugiere hipertensión portal (cirrosis). <1.1 g/dL sugiere otras causas (peritonitis, cáncer, TB)',
          '<strong>Albúmina glicosilada (fructosamina):</strong> Refleja glucemia promedio de 2-3 semanas. Alternativa a HbA₁c cuando esta no es confiable (hemoglobinopatías, anemia hemolítica)',
          '<strong>Bilirrubina-albúmina:</strong> Neonatos. Relación bilirrubina/albúmina predice riesgo de kernicterus mejor que bilirrubina sola. Albúmina une bilirrubina (previene paso a SNC)'
        ]
      }
    ]
  }
];