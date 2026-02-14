// ═══════════════════════════════════════════════════════════
// ORGANELOS DATA - Información completa de todos los organelos
// ═══════════════════════════════════════════════════════════

const ORGANELOS_DATA = [
  {
    id: 'nucleo',
    nombre: 'Núcleo',
    subtitulo: 'Centro de Control Genético',
    icono: '🧬',
    categorias: ['membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Envoltura nuclear:</strong> Doble membrana con poros nucleares (NPCs) que regulan el transporte de moléculas entre núcleo y citoplasma',
          '<strong>Nucleoplasma:</strong> Gel acuoso que contiene cromatina y nucleolo',
          '<strong>Cromatina:</strong> ADN + proteínas histónicas (H1, H2A, H2B, H3, H4) organizadas en nucleosomas',
          '<strong>Nucleolo:</strong> Región no delimitada por membrana donde se ensamblan los ribosomas (rRNA + proteínas)',
          '<strong>Lámina nuclear:</strong> Red de proteínas (laminas A, B, C) que da soporte estructural'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Almacenamiento del material genético:</strong> Contiene el ADN organizado en cromosomas (46 en humanos)',
          '<strong>Replicación del ADN:</strong> Durante la fase S del ciclo celular',
          '<strong>Transcripción:</strong> Síntesis de ARNm, ARNt, ARNr a partir del ADN mediante ARN polimerasas I, II, III',
          '<strong>Procesamiento de ARN:</strong> Splicing, capping 5\', poliadenilación 3\'',
          '<strong>Biogénesis de ribosomas:</strong> Ensamblaje de subunidades ribosomales en el nucleolo'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'ADN', value: '~3.2 × 10⁹ pares de bases en humanos' },
          { label: 'Histonas', value: 'Proteínas básicas H1, H2A, H2B, H3, H4' },
          { label: 'Poros nucleares', value: '~3000-4000 por núcleo, formados por ~30 nucleoporinas' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Retículo endoplásmico:</strong> La envoltura nuclear es continua con el RE rugoso',
          '<strong>Ribosomas:</strong> Las subunidades ribosomales se ensamblan en el nucleolo y se exportan al citoplasma',
          '<strong>Mitocondrias:</strong> Algunos genes mitocondriales requieren proteínas codificadas por el núcleo'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Laminopatías:</strong> Mutaciones en genes de laminas (progeria, distrofia muscular de Emery-Dreifuss)',
          '<strong>Nucleopatías:</strong> Defectos en nucleoporinas asociados a leucemias',
          '<strong>Cáncer:</strong> Alteraciones en la estructura nuclear son marcadores diagnósticos'
        ]
      }
    ]
  },
  {
    id: 'mitocondria',
    nombre: 'Mitocondria',
    subtitulo: 'Central Energética Celular',
    icono: '⚡',
    categorias: ['membranosos', 'energia'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Membrana externa:</strong> Lisa, permeable a moléculas <5 kDa (porinas/VDAC)',
          '<strong>Espacio intermembrana:</strong> Entre membrana externa e interna (~10-20 nm)',
          '<strong>Membrana interna:</strong> Altamente plegada en crestas, impermeable, contiene cadena de transporte de electrones',
          '<strong>Matriz mitocondrial:</strong> Gel acuoso con ADN mitocondrial circular, ribosomas 70S, enzimas del ciclo de Krebs',
          '<strong>Crestas mitocondriales:</strong> Pliegues de la membrana interna que aumentan superficie (~5x)'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Producción de ATP:</strong> Fosforilación oxidativa mediante cadena respiratoria (complejos I-IV) y ATP sintasa (complejo V)',
          '<strong>Ciclo de Krebs:</strong> Oxidación completa de acetil-CoA produciendo NADH, FADH₂, GTP, CO₂',
          '<strong>β-oxidación de ácidos grasos:</strong> Degradación de lípidos para producir acetil-CoA',
          '<strong>Regulación del calcio:</strong> Almacenamiento y liberación de Ca²⁺ intracelular',
          '<strong>Apoptosis:</strong> Liberación de citocromo c que activa caspasas',
          '<strong>Termogénesis:</strong> Producción de calor mediante desacoplamiento (proteína UCP1 en tejido adiposo pardo)'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'ADN mitocondrial', value: '~16,569 pb circular, 37 genes (13 proteínas, 22 tRNAs, 2 rRNAs)' },
          { label: 'Cardiolipina', value: 'Fosfolípido exclusivo de membrana interna (20%)' },
          { label: 'Complejos respiratorios', value: 'I (~1000 kDa), II (~140 kDa), III (~500 kDa), IV (~200 kDa), V (~600 kDa)' },
          { label: 'Producción ATP', value: '~30-32 ATP por glucosa (respiración aeróbica completa)' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>RE:</strong> Sitios de contacto (MAMs) para transferencia de lípidos y Ca²⁺',
          '<strong>Peroxisomas:</strong> Colaboran en β-oxidación de ácidos grasos muy largos',
          '<strong>Citosol:</strong> Intercambio de metabolitos mediante transportadores específicos'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Enfermedades mitocondriales:</strong> MELAS, MERRF, Leigh (mutaciones en ADNmt)',
          '<strong>Diabetes tipo 2:</strong> Disfunción mitocondrial en células β pancreáticas',
          '<strong>Enfermedades neurodegenerativas:</strong> Parkinson, Alzheimer (estrés oxidativo mitocondrial)',
          '<strong>Ejercicio:</strong> El entrenamiento aumenta densidad mitocondrial (biogénesis vía PGC-1α)'
        ]
      }
    ]
  },
  {
    id: 'rer',
    nombre: 'Retículo Endoplásmico Rugoso',
    subtitulo: 'Síntesis de Proteínas de Secreción',
    icono: '🏭',
    categorias: ['membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Cisternas aplanadas:</strong> Sacos membranosos interconectados paralelos al núcleo',
          '<strong>Ribosomas adheridos:</strong> Subunidades 60S + 40S unidas a la membrana mediante proteína Sec61',
          '<strong>Lumen:</strong> Espacio interno donde se pliegan las proteínas con ayuda de chaperonas (BiP/GRP78, calnexina, calreticulina)',
          '<strong>Continuidad con envoltura nuclear:</strong> El RER es una extensión directa de la membrana nuclear externa'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Síntesis de proteínas:</strong> Proteínas de membrana, secretadas, lisosomales (con péptido señal)',
          '<strong>Plegamiento de proteínas:</strong> Mediante chaperonas moleculares (sistema de control de calidad)',
          '<strong>Glicosilación N-ligada:</strong> Adición de oligosacáridos a residuos de asparagina (Asn-X-Ser/Thr)',
          '<strong>Formación de enlaces disulfuro:</strong> Por la enzima PDI (protein disulfide isomerase) en ambiente oxidante del lumen',
          '<strong>Control de calidad ERAD:</strong> Degradación de proteínas mal plegadas (ER-associated degradation)'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'Translocón Sec61', value: 'Canal proteico que permite paso de cadena polipeptídica naciente' },
          { label: 'Chaperonas', value: 'BiP/GRP78, calnexina, calreticulina, GRP94' },
          { label: 'Enzimas', value: 'Oligosacariltransferasa, PDI, peptidil prolil isomerasa' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Aparato de Golgi:</strong> Vesículas COPII transportan proteínas del RER al Golgi',
          '<strong>Núcleo:</strong> Continuidad directa con membrana nuclear externa',
          '<strong>Ribosomas libres:</strong> Equilibrio dinámico entre ribosomas libres y adheridos'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Estrés del RE:</strong> Acumulación de proteínas mal plegadas → respuesta UPR (unfolded protein response)',
          '<strong>Diabetes tipo 2:</strong> Estrés del RE en células β pancreáticas reduce secreción de insulina',
          '<strong>Enfermedades neurodegenerativas:</strong> Alzheimer, Parkinson (agregación de proteínas mal plegadas)',
          '<strong>Fibrosis quística:</strong> Mutación ΔF508 en CFTR causa mal plegamiento y degradación prematura'
        ]
      }
    ]
  },
  {
    id: 'rel',
    nombre: 'Retículo Endoplásmico Liso',
    subtitulo: 'Síntesis de Lípidos y Detoxificación',
    icono: '🧪',
    categorias: ['membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Túbulos anastomosados:</strong> Red tubular interconectada sin ribosomas adheridos',
          '<strong>Abundante en células especializadas:</strong> Hepatocitos (detoxificación), células de Leydig (esteroidogénesis), músculo esquelético (retículo sarcoplásmico)',
          '<strong>Continuo con RER:</strong> Transición gradual entre ambos tipos'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Síntesis de lípidos:</strong> Fosfolípidos, colesterol, hormonas esteroideas (cortisol, testosterona, estrógeno)',
          '<strong>Detoxificación:</strong> Sistema citocromo P450 (CYP) metaboliza fármacos, alcohol, toxinas liposolubles',
          '<strong>Metabolismo de carbohidratos:</strong> Glucosa-6-fosfatasa convierte G6P → glucosa (gluconeogénesis hepática)',
          '<strong>Almacenamiento de calcio:</strong> En retículo sarcoplásmico (músculo) y células no musculares',
          '<strong>Liberación de Ca²⁺:</strong> Receptores IP₃ y rianodina regulan liberación para señalización'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'Citocromo P450', value: 'Superfamilia de ~57 isoformas en humanos (CYP1-CYP51)' },
          { label: 'HMG-CoA reductasa', value: 'Enzima limitante en síntesis de colesterol (blanco de estatinas)' },
          { label: 'SERCA pump', value: 'Ca²⁺-ATPasa que bombea calcio al lumen del REL' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Mitocondrias:</strong> Sitios de contacto para transferencia de lípidos y Ca²⁺',
          '<strong>Peroxisomas:</strong> Cooperan en síntesis de lípidos especializados (plasmalógenos)',
          '<strong>Aparato de Golgi:</strong> Transporte de lípidos y proteínas membranales'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Hipercolesterolemia familiar:</strong> Defecto en síntesis/regulación de colesterol',
          '<strong>Farmacología:</strong> Inducción de CYP450 por fármacos (rifampicina) o inhibición (ketoconazol)',
          '<strong>Alcoholismo crónico:</strong> Proliferación del REL en hepatocitos (tolerancia metabólica)',
          '<strong>Porfirias:</strong> Defectos enzimáticos en síntesis de grupo hemo'
        ]
      }
    ]
  },
  {
    id: 'golgi',
    nombre: 'Aparato de Golgi',
    subtitulo: 'Centro de Procesamiento y Distribución',
    icono: '📦',
    categorias: ['membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Cisternas apiladas:</strong> 4-8 sacos aplanados (dictiosomas) organizados en pilas',
          '<strong>Polaridad funcional:</strong> Cara cis (formación) recibe vesículas del RE; cisternas mediales procesan; cara trans (maduración) empaqueta; red trans-Golgi (TGN) clasifica y distribuye',
          '<strong>Vesículas:</strong> COPI (retrógrado Golgi→RE), COPII (anterógrado RE→Golgi), clatrina (TGN→destinos)'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Modificación de proteínas:</strong> Glicosilación O-ligada (Ser/Thr), modificación de oligosacáridos N-ligados, sulfatación, fosforilación, proteólisis',
          '<strong>Clasificación de proteínas:</strong> Adición de señales para dirigir a lisosomas (M6P), membrana plasmática, o secreción (constitutiva o regulada)',
          '<strong>Síntesis de polisacáridos:</strong> Heparina, ácido hialurónico, pectina (plantas)',
          '<strong>Formación de lisosomas:</strong> Empaquetamiento de enzimas hidrolíticas'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'Glicosiltransferasas', value: '>200 enzimas diferentes (sialiltransferasas, fucosiltransferasas, etc.)' },
          { label: 'Proteínas SNARE', value: 'Mediadores de fusión vesicular (sintaxinas, SNAPs, NSF)' },
          { label: 'GTPasas Rab', value: '~60 isoformas regulan tráfico vesicular específico' },
          { label: 'Clatrina', value: 'Proteína que forma jaulas en vesículas de la TGN' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>RE:</strong> Recibe proteínas vía vesículas COPII, envía vesículas COPI de vuelta',
          '<strong>Lisosomas:</strong> Suministra enzimas lisosomales marcadas con M6P',
          '<strong>Membrana plasmática:</strong> Suministra proteínas, lípidos, receptores',
          '<strong>Vesículas secretoras:</strong> Genera gránulos de secreción (hormonas, neurotransmisores)'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Enfermedad de células I (mucolipidosis II):</strong> Deficiencia de GlcNAc-fosfotransferasa → no se marca M6P',
          '<strong>Defectos de glicosilación congénita (CDG):</strong> Alteraciones en glicosilación afectan múltiples órganos',
          '<strong>Cáncer:</strong> Alteraciones en glicosilación asociadas a metástasis',
          '<strong>Toxina del cólera:</strong> Se une a gangliósidos sintetizados en Golgi'
        ]
      }
    ]
  },
  {
    id: 'lisosoma',
    nombre: 'Lisosomas',
    subtitulo: 'Sistema de Digestión Celular',
    icono: '♻️',
    categorias: ['membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Vesículas membranosas:</strong> 0.1-1.2 μm de diámetro, limitadas por membrana única',
          '<strong>pH ácido:</strong> ~4.5-5.0 mantenido por H⁺-ATPasa (bomba de protones)',
          '<strong>Membrana protegida:</strong> Glicoproteínas altamente glicosiladas (LAMP-1, LAMP-2) protegen de autodigestión',
          '<strong>Lumen:</strong> Contiene ~60 enzimas hidrolíticas diferentes'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Digestión intracelular:</strong> Degradación de macromoléculas mediante proteasas (catepsinas B, D, L), lipasas, nucleasas, glicosidasas',
          '<strong>Autofagia:</strong> Degradación de organelos dañados o proteínas mal plegadas',
          '<strong>Fagocitosis:</strong> Digestión de material endocitado (bacterias, virus, partículas)',
          '<strong>Reciclaje molecular:</strong> Aminoácidos, nucleótidos, azúcares se reciclan al citosol',
          '<strong>Muerte celular:</strong> Ruptura lisosomal puede inducir apoptosis o necrosis'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'Hidrolasas ácidas', value: '~60 enzimas con pH óptimo 4.5-5.0' },
          { label: 'V-ATPasa', value: 'Bomba de protones que acidifica el lumen' },
          { label: 'LAMP-1/LAMP-2', value: 'Glicoproteínas de membrana (50% carbohidratos)' },
          { label: 'Catepsinas', value: 'Proteasas principales (B, D, L, S, K)' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Aparato de Golgi:</strong> Recibe enzimas lisosomales marcadas con M6P desde TGN',
          '<strong>Endosomas:</strong> Se fusionan con endosomas tardíos para degradar material endocitado',
          '<strong>Autofagosomas:</strong> Se fusionan con autofagosomas formando autolisosomas',
          '<strong>Peroxisomas:</strong> Degradación de peroxisomas por vía autofágica (pexofagia)'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Enfermedad de Gaucher:</strong> Deficiencia de β-glucocerebrosidasa → acumulación de glucocerebrosidos',
          '<strong>Enfermedad de Tay-Sachs:</strong> Deficiencia de hexosaminidasa A → acumulación de gangliósido GM2',
          '<strong>Enfermedad de Niemann-Pick:</strong> Deficiencia de esfingomielinasa → acumulación de esfingomielina',
          '<strong>Mucopolisacaridosis:</strong> Defectos en degradación de GAGs (Hurler, Hunter, Sanfilippo)',
          '<strong>Silicosis:</strong> Cristales de sílice dañan lisosomas en macrófagos pulmonares'
        ]
      }
    ]
  },
  {
    id: 'peroxisoma',
    nombre: 'Peroxisomas',
    subtitulo: 'Detoxificación y Metabolismo Lipídico',
    icono: '🧹',
    categorias: ['membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Vesículas pequeñas:</strong> 0.1-1 μm de diámetro, limitadas por membrana única',
          '<strong>Matriz peroxisomal:</strong> Contiene ~50 enzimas oxidativas',
          '<strong>Núcleo cristaloide:</strong> En algunos peroxisomas (cristales de urato oxidasa en roedores)',
          '<strong>Biogénesis:</strong> Gemación del RE + importación de proteínas (peroxinas PEX)'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>β-oxidación de ácidos grasos:</strong> Ácidos grasos muy largos (>C22), ácidos grasos ramificados (ácido fitánico, pristánico), producción de acetil-CoA que va a mitocondrias',
          '<strong>Biosíntesis de plasmalógenos:</strong> Fosfolípidos especiales abundantes en mielina y corazón',
          '<strong>Metabolismo del peróxido de hidrógeno:</strong> Oxidasas producen H₂O₂; catalasa degrada H₂O₂ → H₂O + O₂',
          '<strong>Síntesis de ácidos biliares:</strong> Modificación de colesterol en hígado',
          '<strong>Catabolismo de purinas:</strong> Urato oxidasa (ausente en humanos)'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'Catalasa', value: '40% del total de proteínas peroxisomales, degrada H₂O₂' },
          { label: 'Acil-CoA oxidasa', value: 'Primera enzima de β-oxidación peroxisomal' },
          { label: 'Peroxinas (PEX)', value: '~32 proteínas (PEX1-PEX32) involucradas en biogénesis' },
          { label: 'Señal PTS1/PTS2', value: 'Secuencias de importación (SKL terminal, N-terminal)' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Mitocondrias:</strong> Cooperan en β-oxidación (peroxisomas acortan, mitocondrias completan)',
          '<strong>RE:</strong> Los peroxisomas se forman por gemación del RE',
          '<strong>Lisosomas:</strong> Peroxisomas dañados se degradan por pexofagia'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Síndrome de Zellweger:</strong> Defecto en biogénesis peroxisomal (mutaciones PEX) → muerte neonatal',
          '<strong>Adrenoleucodistrofia (ALD):</strong> Defecto en transportador ABCD1 → acumulación de ácidos grasos muy largos → desmielinización',
          '<strong>Enfermedad de Refsum:</strong> Defecto en α-oxidación del ácido fitánico → neuropatía, retinitis pigmentosa',
          '<strong>Déficit de catalasa:</strong> Acatalasemia (generalmente asintomática en humanos)'
        ]
      }
    ]
  },
  {
    id: 'ribosoma',
    nombre: 'Ribosomas',
    subtitulo: 'Fábricas de Síntesis Proteica',
    icono: '🔨',
    categorias: ['no-membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Ribosomas 80S eucariotas:</strong> Compuestos de subunidad grande 60S (rRNA 28S, 5.8S, 5S + ~49 proteínas) y subunidad pequeña 40S (rRNA 18S + ~33 proteínas)',
          '<strong>Sitios funcionales:</strong> Sitio A (aminoacil), sitio P (peptidil), sitio E (exit)',
          '<strong>Ribosomas libres:</strong> Sintetizan proteínas citosólicas',
          '<strong>Ribosomas del RER:</strong> Sintetizan proteínas de secreción, membrana, lisosomales',
          '<strong>Ribosomas mitocondriales:</strong> 70S (similares a bacterias), codificados parcialmente por ADNmt'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Traducción del ARNm:</strong> Síntesis de proteínas siguiendo código genético (iniciación con codón AUG, elongación con peptidil transferasa, terminación con UAA/UAG/UGA)',
          '<strong>Actividad catalítica:</strong> El rRNA 28S tiene actividad de ribozima (peptidil transferasa)',
          '<strong>Polisomas:</strong> Múltiples ribosomas traduciendo un mismo ARNm simultáneamente',
          '<strong>Regulación:</strong> Control por factores de iniciación (eIFs), fosforilación (eIF2α en estrés)'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'ARN ribosomal', value: '~60% de la masa; 28S (4718 nt), 18S (1869 nt), 5.8S, 5S' },
          { label: 'Proteínas ribosomales', value: '~82 proteínas diferentes (RPL/RPS)' },
          { label: 'Velocidad de síntesis', value: '~5-10 aminoácidos/segundo en eucariotas' },
          { label: 'Tamaño', value: '~25-30 nm de diámetro, peso molecular ~4.2 MDa' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Núcleo/nucleolo:</strong> Ensamblaje de subunidades ribosomales, transcripción de rRNA',
          '<strong>RE rugoso:</strong> Ribosomas adheridos sintetizan proteínas de secreción',
          '<strong>Mitocondrias:</strong> Ribosomas 70S propios sintetizan 13 proteínas mitocondriales'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Antibióticos bacterianos:</strong> Aminoglucósidos (inhiben 30S), macrólidos (inhiben 50S), tetraciclinas (bloquean sitio A)',
          '<strong>Ribosomopatías:</strong> Síndrome de Diamond-Blackfan (mutaciones en RPL/RPS) → anemia',
          '<strong>Toxinas:</strong> Ricina, toxina Shiga inhiben ribosomas → muerte celular',
          '<strong>Síndrome de Treacher Collins:</strong> Mutación en TCOF1 afecta biogénesis ribosomal'
        ]
      }
    ]
  },
  {
    id: 'citoesqueleto',
    nombre: 'Citoesqueleto',
    subtitulo: 'Estructura y Movimiento Celular',
    icono: '🏗️',
    categorias: ['no-membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura - Tres componentes principales',
        items: [
          '<strong>Microfilamentos (actina):</strong> Filamentos de 7 nm; polímeros de actina G→F; polaridad: extremo (+) barbed, extremo (-) pointed; asociados a miosina, tropomiosina, α-actinina',
          '<strong>Filamentos intermedios:</strong> 8-10 nm; mayor resistencia mecánica; tipos: queratinas (epitelios), vimentina (mesenquimales), desmina (músculo), neurofilamentos (neuronas), láminas (núcleo)',
          '<strong>Microtúbulos:</strong> 25 nm; 13 protofilamentos de heterodímeros α/β-tubulina; polaridad: extremo (+) crece, extremo (-) anclado en MTOC; MAPs: tau, MAP2, MAP4, kinesina, dineína'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Microfilamentos:</strong> Contracción muscular (con miosina II), citocinesis (anillo contráctil), movimiento celular (lamelipodios, filopodios), cambios de forma, endocitosis/exocitosis',
          '<strong>Filamentos intermedios:</strong> Soporte mecánico y resistencia a tensión, mantenimiento de posición nuclear, adhesión célula-célula (desmosomas), integridad tisular',
          '<strong>Microtúbulos:</strong> Transporte intracelular (kinesina +, dineína -), formación del huso mitótico, estructura de cilios y flagelos (9+2), organización de organelos, mantenimiento de forma celular'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'Actina', value: '42 kDa, proteína más abundante en células eucariotas (~5-10%)' },
          { label: 'Tubulina', value: 'Heterodímero α/β ~100 kDa, polimerización dependiente de GTP' },
          { label: 'Proteínas motoras', value: 'Kinesina (hacia +), dineína (hacia -), miosina (en actina)' },
          { label: 'Inestabilidad dinámica', value: 'Microtúbulos alternan entre crecimiento y despolimerización' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Mitocondrias/RE/Golgi:</strong> Posicionamiento y transporte mediado por microtúbulos',
          '<strong>Núcleo:</strong> Lámina nuclear (filamentos intermedios) da soporte estructural',
          '<strong>Vesículas:</strong> Transporte dirigido por kinesinas y dineínas en microtúbulos',
          '<strong>Membrana plasmática:</strong> Anclaje y organización de receptores y canales'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Distrofias musculares:</strong> Mutaciones en distrofina (conecta actina a membrana)',
          '<strong>Epidermólisis bullosa:</strong> Mutaciones en queratinas → fragilidad cutánea',
          '<strong>Enfermedad de Alzheimer:</strong> Hiperfosforilación de tau → ovillos neurofibrilares',
          '<strong>Agentes antineoplásicos:</strong> Taxol (estabiliza microtúbulos), vincristina/vinblastina (despolimerizan), colchicina (inhibe polimerización)',
          '<strong>Síndrome de Kartagener:</strong> Defecto en dineína ciliar → infertilidad, sinusitis'
        ]
      }
    ]
  },
  {
    id: 'centrosoma',
    nombre: 'Centrosoma y Centriolos',
    subtitulo: 'Centro Organizador de Microtúbulos',
    icono: '📍',
    categorias: ['no-membranosos'],
    secciones: [
      {
        titulo: '📋 Estructura',
        items: [
          '<strong>Centrosoma (MTOC):</strong> Material pericentriolar (PCM) con γ-tubulina, pericentrina; par de centriolos perpendiculares; centro de nucleación de microtúbulos',
          '<strong>Centriolos:</strong> Cilindros de 9 tripletes de microtúbulos (estructura 9+0); 0.4 μm de longitud, 0.2 μm de diámetro',
          '<strong>Centríolo madre:</strong> Con apéndices distales y subdistales',
          '<strong>Centríolo hijo:</strong> Sin apéndices'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Organización de microtúbulos:</strong> Nucleación y anclaje del extremo (-) de microtúbulos',
          '<strong>Formación del huso mitótico:</strong> Duplicación del centrosoma → polos del huso en mitosis',
          '<strong>Formación de cilios y flagelos:</strong> Centríolo madre migra y se convierte en cuerpo basal',
          '<strong>Polaridad celular:</strong> Posicionamiento del centrosoma define eje celular',
          '<strong>División celular:</strong> Segregación correcta de cromosomas'
        ]
      },
      {
        titulo: '🔬 Composición Molecular',
        tipo: 'tabla',
        datos: [
          { label: 'γ-tubulina', value: 'Complejo γ-TuRC nucleación de microtúbulos en PCM' },
          { label: 'Pericentrina', value: 'Proteína de andamiaje del PCM (~220 kDa)' },
          { label: 'Plk1/Aurora A', value: 'Quinasas que regulan maduración del centrosoma' },
          { label: 'Ciclo de duplicación', value: 'G1/S: separación; S/G2: elongación; G2: maduración' }
        ]
      },
      {
        titulo: '🔗 Relaciones con otros organelos',
        items: [
          '<strong>Núcleo:</strong> Posición del centrosoma cerca del núcleo determina polaridad',
          '<strong>Aparato de Golgi:</strong> Posicionamiento del Golgi mediado por centrosoma',
          '<strong>Cilios primarios:</strong> Centríolo madre forma el cuerpo basal del cilio'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Cáncer:</strong> Amplificación de centrosomas → aneuploidía y inestabilidad genómica',
          '<strong>Ciliopatías:</strong> Defectos en formación de cuerpo basal (Síndrome de Bardet-Biedl, enfermedad poliquística renal, retinosis pigmentaria)',
          '<strong>Enanismo microcefálico primordial:</strong> Mutaciones en proteínas del centrosoma (CPAP, CEP152)',
          '<strong>Infertilidad masculina:</strong> Defectos en formación del flagelo espermático'
        ]
      }
    ]
  }
];