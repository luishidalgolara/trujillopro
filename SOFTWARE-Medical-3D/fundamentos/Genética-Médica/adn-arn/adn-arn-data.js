// ═══════════════════════════════════════════════════════════
// ADN-ARN-DATA.JS - Base de datos sobre ADN y ARN
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const ADN_ARN_DATA = [
  {
    id: 'estructura-adn',
    nombre: 'Estructura del ADN',
    subtitulo: 'Ácido desoxirribonucleico - Doble hélice de Watson-Crick',
    icono: '🧬',
    categorias: ['estructura'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Composición:</strong> Polímero de desoxirribonucleótidos. Bases nitrogenadas (A, T, G, C) + desoxirribosa + grupo fosfato',
          '<strong>Estructura primaria:</strong> Secuencia lineal de nucleótidos unidos por enlaces fosfodiéster 3\'→5\'. Direccionalidad: extremo 5\'-fosfato y 3\'-hidroxilo',
          '<strong>Estructura secundaria:</strong> Doble hélice antiparalela. Modelo de Watson-Crick (1953). Premio Nobel 1962',
          '<strong>Apareamiento de bases:</strong> A-T (2 puentes de hidrógeno), G-C (3 puentes de hidrógeno). Complementariedad de bases',
          '<strong>Conformación B-DNA:</strong> Forma predominante in vivo. Hélice dextrógira. Diámetro ~2 nm. Paso de hélice 3.4 nm (10 pares de bases)',
          '<strong>Surcos:</strong> Surco mayor (12 Å) y surco menor (6 Å). Proteínas reguladoras se unen principalmente a surco mayor'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Formas del ADN',
        datos: [
          { label: 'B-DNA', value: 'Forma estándar. Hélice dextrógira. 10 pb/vuelta. Predominante en condiciones fisiológicas (humedad >92%). Descrita por Watson-Crick.' },
          { label: 'A-DNA', value: 'Hélice dextrógira. 11 pb/vuelta. Más compacta. Predomina en condiciones de baja humedad (<75%). ARN-ADN híbridos adoptan forma A.' },
          { label: 'Z-DNA', value: 'Hélice levógira (zigzag). Secuencias alternantes GC (ej: GCGCGC). Regiones de alta superhelicidad. Rol en regulación transcripcional.' },
          { label: 'Tripletes (H-DNA)', value: 'Triple hélice. Secuencias de purinas/pirimidinas. Estructura transitoria. Implicada en recombinación, regulación génica.' },
          { label: 'Cuádruplex G (G4)', value: 'Cuatro cadenas. Guaninas apiladas (tétradas de Hoogsteen). Telómeros, promotores. Estabilizado por K⁺/Na⁺. Target terapéutico en cáncer.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Niveles de organización',
        items: [
          '<strong>ADN desnudo:</strong> Doble hélice sin proteínas. 2 nm diámetro. Genoma humano: ~2 metros si se estira completamente',
          '<strong>Nucleosoma:</strong> Unidad básica de cromatina. 147 pb de ADN enrolladas (1.65 vueltas) alrededor de octámero de histonas (H2A, H2B, H3, H4)₂',
          '<strong>Fibra de 10 nm:</strong> Collar de perlas. Nucleosomas conectados por ADN linker (~20-80 pb). Histona H1 estabiliza',
          '<strong>Fibra de 30 nm:</strong> Solenoide. 6 nucleosomas por vuelta. Compactación ~40x. Modelo: zigzag de dos filas',
          '<strong>Dominios de cromatina:</strong> Bucles de 50-200 kb anclados a matriz nuclear. Unidades de replicación y transcripción',
          '<strong>Cromosoma metafásico:</strong> Compactación máxima (~10,000x). Cromátidas hermanas unidas por centrómero. Estructura en X característica'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Propiedades fisicoquímicas',
        items: [
          '<strong>Desnaturalización (fusión):</strong> Separación de cadenas por calor, pH extremo, agentes desnaturalizantes. Tm (temperatura de fusión): 50% desnaturalizado. Mayor contenido GC → mayor Tm',
          '<strong>Renaturalización (reannealing):</strong> Enfriamiento lento permite rehibridación. Base de técnicas: Southern blot, hibridación in situ, PCR',
          '<strong>Absorción UV:</strong> Máximo a 260 nm (bases aromáticas). Efecto hipercromático: ADN desnaturalizado absorbe ~40% más que ADN nativo',
          '<strong>Relación A260/A280:</strong> ADN puro ~1.8. <1.8 sugiere contaminación proteica. >2.0 sugiere contaminación con ARN',
          '<strong>Superenrollamiento:</strong> ADN circular puede adoptar configuración superhelicoidal. Negativo (subhelical) predomina in vivo. Topoisomerasas regulan',
          '<strong>Estabilidad química:</strong> Desoxirribosa más estable que ribosa (sin grupo 2\'-OH). Resistente a hidrólisis alcalina. Susceptible a depurinación espontánea (~10,000 eventos/célula/día)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Secuenciación del genoma humano:</strong> Proyecto Genoma Humano (1990-2003). ~3.2 mil millones de pares de bases. ~20,000-25,000 genes codificantes. Telómero a telómero completado en 2022',
          '<strong>Fingerprinting genético (huella de ADN):</strong> STRs (microsatélites). Identificación forense, pruebas de paternidad. CODIS (FBI) usa 20 loci STR',
          '<strong>Detección de mutaciones:</strong> PCR, secuenciación Sanger, NGS (next-generation sequencing). Diagnóstico de enfermedades genéticas, farmacogenómica',
          '<strong>Terapia génica:</strong> Corrección de genes defectuosos. Vectores virales (AAV, lentivirus), CRISPR-Cas9. Aprobaciones: Luxturna (ceguera), Zolgensma (atrofia muscular espinal)',
          '<strong>ADN libre circulante (cfDNA):</strong> Fragmentos de ADN en plasma. Diagnóstico prenatal no invasivo (NIPT), detección de cáncer (biopsia líquida), monitoreo post-trasplante',
          '<strong>Edición genómica CRISPR:</strong> CRISPR-Cas9 revolucionó edición génica (2012). Premio Nobel 2020 (Charpentier, Doudna). Terapias: anemia falciforme (Casgevy, aprobado 2023)',
          '<strong>ADN mitocondrial (mtDNA):</strong> Circular, 16.5 kb. Herencia materna. 37 genes. Mutaciones: enfermedades mitocondriales (MELAS, MERRF, LHON)',
          '<strong>Daño al ADN y cáncer:</strong> Mutaciones en oncogenes (ej: KRAS, BRAF), genes supresores tumorales (TP53, BRCA1/2). Carcinógenos (UV, tabaco, aflatoxinas) causan lesiones. Defectos en reparación → cáncer'
        ]
      }
    ]
  },
  {
    id: 'replicacion-adn',
    nombre: 'Replicación del ADN',
    subtitulo: 'Síntesis semiconservativa del material genético',
    icono: '♻️',
    categorias: ['replicacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Modelo semiconservativo:</strong> Cada cadena hija contiene una cadena parental y una nueva. Demostrado por Meselson-Stahl (1958)',
          '<strong>Direccionalidad:</strong> Síntesis siempre 5\'→3\'. ADN polimerasa añade nucleótidos al extremo 3\'-OH',
          '<strong>Requerimiento de cebador:</strong> ADN polimerasas requieren cebador (primer) de ARN con extremo 3\'-OH libre. Primasa sintetiza primers',
          '<strong>Velocidad:</strong> Procariotas: ~1000 nt/segundo. Eucariotas: ~50 nt/segundo. Más lento pero más preciso',
          '<strong>Fidelidad:</strong> Error 1 en 10⁷ nucleótidos (corrección de errores). Con reparación post-replicativa: 1 en 10⁹-10¹⁰',
          '<strong>Origen de replicación:</strong> Procariotas: único (oriC en E. coli). Eucariotas: múltiples (~30,000-50,000 en humanos)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas clave en eucariotas',
        datos: [
          { label: 'ADN polimerasa α (primasa-pol)', value: 'Complejo primasa-polimerasa. Sintetiza primers de ARN (~10 nt) + ADN (~20 nt). Inicia fragmentos de Okazaki. Sin actividad 3\'→5\' exonucleasa.' },
          { label: 'ADN polimerasa δ', value: 'Polimerasa principal de cadena retrasada. Alta procesividad con PCNA. Actividad 3\'→5\' exonucleasa (proofreading). Completa fragmentos de Okazaki.' },
          { label: 'ADN polimerasa ε', value: 'Polimerasa principal de cadena líder. Alta fidelidad. Actividad 3\'→5\' exonucleasa. Interactúa con helicasa CMG (Cdc45-MCM-GINS).' },
          { label: 'Helicasa MCM2-7', value: 'Motor de horquilla de replicación. Desenrolla ADN. Actividad ATPasa. Licenciada en G1, activada en S (fosforilación por CDK).' },
          { label: 'Topoisomerasa I y II', value: 'Alivian tensión topológica. Topo I: corte de una hebra, sin ATP. Topo II: corte de ambas hebras, requiere ATP. Targets de quimioterapia (etopósido, doxorrubicina).' },
          { label: 'PCNA (sliding clamp)', value: 'Abrazadera deslizante. Trímero que encircla ADN. Aumenta procesividad de Pol δ/ε (añaden miles de nt sin disociarse). Cargado por RFC (factor de carga).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Proceso de replicación',
        items: [
          '<strong>Licenciamiento (G1):</strong> Carga del complejo pre-RC (pre-replication complex) en orígenes. ORC reconoce origen → recluta Cdc6, Cdt1 → carga helicasa MCM2-7',
          '<strong>Inicio (transición G1/S):</strong> CDK y DDK fosforilan MCM → activación. Reclutamiento de Cdc45, GINS → complejo CMG activo. Desenrollamiento del ADN',
          '<strong>Elongación - Cadena líder:</strong> Síntesis continua 5\'→3\' por Pol ε. Un solo primer de ARN. Procesiva con PCNA',
          '<strong>Elongación - Cadena retrasada:</strong> Síntesis discontinua. Fragmentos de Okazaki (~100-200 nt eucariotas, ~1000-2000 nt procariotas). Pol α sintetiza primer → Pol δ completa fragmento',
          '<strong>Eliminación de primers:</strong> RNasa H degrada ARN. FEN1 (flap endonuclease 1) elimina oligonucleótidos residuales. Pol δ rellena gaps',
          '<strong>Ligación:</strong> ADN ligasa I sella enlaces fosfodiéster entre fragmentos de Okazaki. Deficiencia → síndrome de Bloom-like',
          '<strong>Terminación:</strong> Encuentro de horquillas convergentes. Disolución de estructuras intermedias. Decatenación de cromátidas (Topoisomerasa II)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Problemas especiales',
        items: [
          '<strong>Problema del extremo (end-replication problem):</strong> ADN polimerasa no puede replicar extremo 5\'. Pérdida progresiva de telómeros. 50-200 pb perdidos por división',
          '<strong>Telomerasa:</strong> Transcriptasa reversa especializada. Añade repeticiones TTAGGG al extremo 3\'. Componente ARN (TR o TERC) como molde. Subunidad catalítica TERT',
          '<strong>Expresión de telomerasa:</strong> Alta en células germinales, células madre, 85-90% de cánceres. Inactiva en células somáticas (acortamiento → senescencia)',
          '<strong>Lesiones del ADN durante replicación:</strong> Dímeros de timina (UV), aductos químicos, roturas. Síntesis translesión (TLS) por polimerasas de la familia Y (Pol η, ι, κ). Baja fidelidad pero evita bloqueo',
          '<strong>Estrés replicativo:</strong> Colisión con maquinaria transcripcional, regiones de difícil replicación (CG-rich, G4), deficiencia de nucleótidos. Activación de checkpoint (ATR-Chk1)',
          '<strong>Fragilidad cromosómica:</strong> Sitios frágiles comunes (FRA3B, FRA16D). Regiones de replicación tardía. Puntos calientes de reordenamientos en cáncer'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Síndromes de inestabilidad cromosómica:</strong> Defectos en replicación/reparación. Xeroderma pigmentosum (XP), síndrome de Bloom (BLM), anemia de Fanconi. Alta susceptibilidad a cáncer',
          '<strong>Síndrome de Bloom:</strong> Mutación en helicasa BLM (RecQ). Talla baja, fotosensibilidad, inmunodeficiencia, cáncer temprano. Intercambios de cromátidas hermanas elevados',
          '<strong>Síndrome de Werner (progeria del adulto):</strong> Mutación en WRN (RecQ helicasa). Envejecimiento prematuro, cáncer, aterosclerosis. Defecto en resolución de estructuras de replicación',
          '<strong>Inhibidores de topoisomerasas:</strong> Quimioterapia. Topo I: irinotecán, topotecán. Topo II: etopósido, doxorrubicina. Estabilizan complejo enzima-ADN → roturas → apoptosis',
          '<strong>Aflatoxina B1:</strong> Carcinógeno (hongo Aspergillus). Forma aducto G→T en TP53 (codón 249). Hepatocarcinoma. Común en África subsahariana, Asia',
          '<strong>Inhibidores de PARP:</strong> Olaparib, rucaparib. Terapia en cáncer BRCA-mutante (mama, ovario). Letalidad sintética: células BRCA-/- + PARP inhibido → muerte por roturas DSB no reparadas',
          '<strong>Hidroxiurea:</strong> Inhibe ribonucleótido reductasa → depleción de dNTPs → bloqueo de replicación. Tratamiento: anemia falciforme (↑HbF), leucemia mieloide crónica',
          '<strong>Telómeros y envejecimiento:</strong> Acortamiento telómérico correlaciona con edad. Telómeros muy cortos → senescencia celular. Teoría telomèrica del envejecimiento. Disqueratosis congénita: mutaciones en telomerasa'
        ]
      }
    ]
  },
  {
    id: 'estructura-arn',
    nombre: 'Estructura del ARN',
    subtitulo: 'Ácido ribonucleico - Molécula versátil',
    icono: '📜',
    categorias: ['estructura'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Composición:</strong> Polímero de ribonucleótidos. Bases nitrogenadas (A, U, G, C) + ribosa + grupo fosfato',
          '<strong>Diferencias con ADN:</strong> Ribosa (2\'-OH), uracilo en lugar de timina, generalmente monocatenario',
          '<strong>Estructura:</strong> Cadena simple plegada. Apareamiento intramolecular forma estructuras secundarias (horquillas, bucles)',
          '<strong>Inestabilidad:</strong> Grupo 2\'-OH hace ARN susceptible a hidrólisis alcalina. Vida media corta (minutos-horas)',
          '<strong>Funciones múltiples:</strong> Mensajero (mRNA), transferencia (tRNA), ribosomal (rRNA), regulador (miRNA, siRNA, lncRNA)',
          '<strong>Catálisis:</strong> Ribozimas. ARN con actividad catalítica. Hipótesis del mundo de ARN (origen de la vida)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Tipos de ARN',
        datos: [
          { label: 'mRNA (mensajero)', value: '2-5% del ARN total. Codifica proteínas. Cap 5\' (7-metilguanosina), cola poli-A 3\'. Eucariotas: monocistrónico. Procariotas: policistrónico. Vida media variable (30 min - 24 h).' },
          { label: 'rRNA (ribosomal)', value: '~80% del ARN celular. Componente estructural y catalítico del ribosoma. Eucariotas: 18S, 5.8S, 28S, 5S. Procariotas: 16S, 23S, 5S. Peptidil transferasa (23S/28S) es ribozima.' },
          { label: 'tRNA (transferencia)', value: '~15% del ARN total. Adaptador en traducción. Estructura de hoja de trébol (2D) o L invertida (3D). Anticodón reconoce codón. Aminoacil-tRNA sintetasa carga aminoácido. ~60-90 nt.' },
          { label: 'snRNA (nuclear pequeño)', value: 'Componente del espliceosoma. U1, U2, U4, U5, U6 (splicing mayor). U11, U12, U4atac, U6atac (splicing menor). snRNP = snRNA + proteínas.' },
          { label: 'miRNA (micro ARN)', value: '~22 nt. Regulación post-transcripcional. Apareamiento parcial con 3\'-UTR de mRNA → represión traduccional o degradación. >2000 miRNAs humanos. Un miRNA regula >100 mRNAs.' },
          { label: 'lncRNA (ARN largo no codificante)', value: '>200 nt. Regulación epigenética, transcripcional. Ej: XIST (inactivación X), HOTAIR (silenciamiento HOX). Miles en genoma humano. Funciones diversas, muchas desconocidas.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Estructura del mRNA eucariota',
        items: [
          '<strong>Cap 5\' (7-metilguanosina):</strong> Protección contra exonucleasas. Reconocimiento por ribosoma (eIF4E). Añadido co-transcripcionalmente por enzima capping',
          '<strong>5\'-UTR (región no traducida):</strong> Entre cap y AUG. Contiene elementos regulatorios (IRES, uORFs). Influye en eficiencia traduccional',
          '<strong>ORF (marco abierto de lectura):</strong> Región codificante. Inicia con AUG (metionina). Termina con codón stop (UAA, UAG, UGA)',
          '<strong>3\'-UTR:</strong> Entre codón stop y cola poli-A. Contiene sitios de unión para miRNAs, RBPs (proteínas de unión a ARN). Regula estabilidad y localización',
          '<strong>Cola poli-A:</strong> ~200-250 residuos de adenina en extremo 3\'. Poliadenilación por complejo CPSF/CstF. Estabilidad, exportación nuclear, traducción',
          '<strong>Modificaciones:</strong> N6-metiladenosina (m⁶A) más abundante. Regula splicing, exportación, traducción, degradación. Pseudouridina (Ψ), inosina (I) en tRNAs'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ ARNs reguladores',
        items: [
          '<strong>Biogénesis de miRNA:</strong> Gen transcrito (pri-miRNA) → procesado en núcleo por Drosha/DGCR8 (pre-miRNA) → exportado (Exportina-5) → procesado en citoplasma por Dicer (miRNA maduro ~22 nt)',
          '<strong>RISC (RNA-induced silencing complex):</strong> miRNA cargado en Argonauta (AGO). Apareamiento con mRNA target → represión o degradación. Apareamiento perfecto (raro) → corte por AGO2',
          '<strong>siRNA (small interfering RNA):</strong> dsRNA largo → Dicer → siRNA (~21-23 nt). Apareamiento perfecto con mRNA → degradación. Herramienta de knockdown génico. Terapias: patisiran (amiloidosis)',
          '<strong>piRNA (PIWI-interacting RNA):</strong> 24-31 nt. Silenciamiento de transposones en células germinales. Proteínas PIWI. Mantenimiento de integridad genómica',
          '<strong>circRNA (ARN circular):</strong> ARN sin extremos 5\'/3\'. Formado por backsplicing. Funciones: esponja de miRNAs, regulación transcripcional. Muy estables',
          '<strong>lncRNA nuclear:</strong> XIST (inactivación del cromosoma X en mujeres). Recluta complejo PRC2 → metilación H3K27 → heterocromatina. ~17 kb'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Vacunas de mRNA:</strong> COVID-19 (Pfizer-BioNTech, Moderna). mRNA modificado (pseudouridina) → traducción de proteína Spike → inmunidad. Ventaja: desarrollo rápido, sin ADN',
          '<strong>Terapia con siRNA:</strong> Patisiran (amiloidosis hATTR, aprobado 2018). Givosiran (porfiria hepática aguda). Lumasiran (hiperoxaluria primaria). GalNAc-conjugados para delivery hepático',
          '<strong>Terapia antisense (ASO):</strong> Oligonucleótidos que unen mRNA. Nusinersen (atrofia muscular espinal, aprobado 2016). Eteplirsen (distrofia muscular Duchenne). Modificaciones químicas (2\'-O-metil, fosforotioato)',
          '<strong>Aptámeros de ARN:</strong> ARN que une targets específicos. Pegaptanib (degeneración macular, anti-VEGF). Selección por SELEX. Alternativa a anticuerpos',
          '<strong>RT-PCR (transcripción reversa-PCR):</strong> Detección y cuantificación de ARN. Diagnóstico: COVID-19, carga viral (VIH, hepatitis). qRT-PCR para cuantificación. Digital droplet PCR (ddPCR) para precisión',
          '<strong>RNA-seq (secuenciación de ARN):</strong> Transcriptómica completa. Cuantificación de expresión génica, descubrimiento de isoformas, análisis de splicing alternativo. Single-cell RNA-seq para heterogeneidad',
          '<strong>miRNAs como biomarcadores:</strong> miR-21 (oncogénico), miR-122 (daño hepático), miR-208 (daño cardíaco). Estables en sangre. Diagnóstico y pronóstico de cáncer, enfermedad cardiovascular',
          '<strong>Enfermedad por expansión de repetidos:</strong> Huntington (CAG en HTT), distrofia miotónica (CTG en DMPK), X frágil (CGG en FMR1). RNA tóxico secuestra RBPs. Agregados proteicos'
        ]
      }
    ]
  },
  {
    id: 'transcripcion',
    nombre: 'Transcripción',
    subtitulo: 'Síntesis de ARN a partir de molde de ADN',
    icono: '📝',
    categorias: ['transcripcion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Definición:</strong> Proceso de síntesis de ARN usando ADN como molde. Primera etapa de expresión génica',
          '<strong>Enzima:</strong> ARN polimerasa. No requiere cebador (inicia de novo). Sintetiza 5\'→3\' leyendo molde 3\'→5\'',
          '<strong>Producto:</strong> Transcrito primario (pre-mRNA en eucariotas). Requiere procesamiento post-transcripcional',
          '<strong>Selectividad:</strong> Solo una cadena de ADN es transcrita (cadena molde o antisense). Cadena codificante (sense) tiene misma secuencia que ARN (T→U)',
          '<strong>Regulación:</strong> Control principal de expresión génica. Factores de transcripción, elementos reguladores, modificaciones epigenéticas',
          '<strong>Acoplamiento:</strong> En eucariotas, transcripción acoplada con procesamiento de ARN (capping, splicing, poliadenilación)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ ARN polimerasas eucariotas',
        datos: [
          { label: 'ARN Pol I', value: 'Transcribe rRNA (18S, 5.8S, 28S). ~50% de actividad transcripcional total. Nucléolo. No responde a α-amanitina. Gen único altamente repetido (rDNA).' },
          { label: 'ARN Pol II', value: 'Transcribe mRNA, miRNA, lncRNA, snRNA (excepto U6). CTD (dominio C-terminal) con repeticiones YSPTSPS. Fosforilación de CTD regula etapas. Sensible a α-amanitina (baja concentración).' },
          { label: 'ARN Pol III', value: 'Transcribe tRNA, rRNA 5S, U6 snRNA, otros ARNs pequeños. Promotores internos (tipo I, II) o externos (tipo III). Moderadamente sensible a α-amanitina.' },
          { label: 'ARN Pol IV y V (plantas)', value: 'Específicas de plantas. Rol en silenciamiento génico mediado por ARN, defensa antiviral. No presentes en animales.' },
          { label: 'ARN Pol mitocondrial', value: 'Codificada por genoma nuclear. Transcribe genoma mitocondrial. Similar a ARN pol bacteriana (origen endosimbiótico).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Etapas de la transcripción (Pol II)',
        items: [
          '<strong>Iniciación - Reconocimiento del promotor:</strong> Factores de transcripción generales (TFIIA, TFIIB, TFIID, TFIIE, TFIIF, TFIIH) ensamblan en promotor. TFIID contiene TBP (proteína de unión a TATA box)',
          '<strong>Formación del complejo de pre-iniciación (PIC):</strong> TBP se une a TATA box (-25 a -30). TFIIB reconoce BRE. Reclutamiento de Pol II-TFIIF. Adición de TFIIE, TFIIH',
          '<strong>Apertura del promotor:</strong> TFIIH tiene actividad helicasa (XPB, XPD). Desenrolla ADN (~13 pb). Burbuja de transcripción. TFIIH también fosforila CTD de Pol II (Ser5)',
          '<strong>Escape del promotor (promoter clearance):</strong> Pol II sintetiza primeros ~10 nt. Liberación de factores generales. Fosforilación de CTD-Ser5 → transición a elongación',
          '<strong>Elongación:</strong> Pol II avanza ~20-50 nt/seg. Factores de elongación (DSIF, NELF, P-TEFb). Fosforilación CTD-Ser2 (P-TEFb). Nucleosomas reorganizados por remodeladores',
          '<strong>Terminación:</strong> Reconocimiento de señal de poliadenilación (AAUAAA + elemento rico en U/GU). Corte por CPSF/CstF. Poliadenilación por PAP. Pol II continúa ~1-2 kb → corte por torpedo (Rat1/Xrn2)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Procesamiento del pre-mRNA',
        items: [
          '<strong>Capping (5\'):</strong> Co-transcripcional (primeros ~25 nt). Enzima capping añade 7-metilguanosina invertida (m⁷G). Protección, reconocimiento ribosomal',
          '<strong>Splicing:</strong> Eliminación de intrones, unión de exones. Espliceosoma (complejo de ~150 proteínas + snRNAs). Secuencias consenso: sitio donor 5\' (GU), rama (A), aceptor 3\' (AG)',
          '<strong>Mecanismo de splicing:</strong> 2 transesterificaciones. Ataque de adenina del punto de rama al sitio 5\' → intermediario lariat. Ataque del exón 5\' al sitio 3\' → exones unidos, liberación de lariat',
          '<strong>Splicing alternativo:</strong> >95% de genes humanos multi-exón tienen splicing alternativo. Genera diversidad proteica. Regulado por SR proteins, hnRNPs, secuencias ESE/ESS',
          '<strong>Poliadenilación:</strong> Reconocimiento de AAUAAA por CPSF. Corte 10-30 nt downstream. Poliadenilación por PAP. ~250 adeninas añadidas. Estabilidad y traducción',
          '<strong>Edición de ARN:</strong> A-to-I (ADAR), C-to-U (APOBEC). Cambia secuencia de ARN vs ADN. APOBEC1: edita APOB → ApoB48 (intestino) vs ApoB100 (hígado)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Intoxicación por α-amanitina:</strong> Toxina de Amanita phalloides (hongo). Inhibe Pol II y III. Insuficiencia hepática aguda (48-72 h). Mortalidad >50% sin trasplante. No hay antídoto específico',
          '<strong>Síndrome de Cockayne:</strong> Defecto en reparación acoplada a transcripción (TCR). Mutaciones en CSA, CSB. Fotosensibilidad, neurodegeneración, envejecimiento prematuro. CSB es factor de elongación',
          '<strong>Talasemias:</strong> Mutaciones en splicing de genes de globina. β⁺-talasemia: mutación en sitio donor/aceptor → splicing reducido. Anemia microcítica. Común en Mediterráneo, Asia',
          '<strong>Atrofia muscular espinal (AME):</strong> Deleciones/mutaciones en SMN1. Gen parálogo SMN2 existe pero exón 7 frecuentemente saltado (splicing alternativo). Nusinersen (ASO) corrige splicing de SMN2',
          '<strong>Distrofia miotónica tipo 1:</strong> Expansión CTG en 3\'-UTR de DMPK. RNA tóxico secuestra MBNL1 (regulador de splicing) → splicing aberrante en múltiples genes',
          '<strong>Inhibidores de transcripción:</strong> Actinomicina D (intercalante, bloquea elongación). Rifampicina (inhibe ARN pol bacteriana, antituberculoso). CDK7/9 inhibidores en cáncer',
          '<strong>Terapia con oligonucleótidos antisense:</strong> Eteplirsen (Duchenne): induce salto de exón 51 en distrofina. Nusinersen (AME): modifica splicing de SMN2',
          '<strong>Errores de splicing en cáncer:</strong> Mutaciones en SF3B1, U2AF1, SRSF2 (factores de splicing). Común en leucemia mieloide aguda, síndromes mielodisplásicos. Spliceostatin A, pladienolide (inhibidores en desarrollo)'
        ]
      }
    ]
  },
  {
    id: 'codigo-genetico',
    nombre: 'Código Genético y Traducción',
    subtitulo: 'De mRNA a proteína - El dogma central',
    icono: '🔤',
    categorias: ['traduccion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características del código genético',
        items: [
          '<strong>Tripletes (codones):</strong> 3 nucleótidos especifican 1 aminoácido. 4³ = 64 codones posibles. 20 aminoácidos estándar',
          '<strong>Degenerado (redundante):</strong> Múltiples codones para el mismo aminoácido. Excepción: Met (AUG) y Trp (UGG) tienen un solo codón',
          '<strong>No ambiguo:</strong> Cada codón especifica solo un aminoácido. Sin superposición en lectura estándar',
          '<strong>Universal (casi):</strong> Mismo código en la mayoría de organismos. Excepciones: mitocondrias, algunos ciliados, Mycoplasma',
          '<strong>Codón de inicio:</strong> AUG (metionina). Ocasionalmente GUG, UUG en procariotas. Contexto Kozak en eucariotas (GCCRCCAUGG)',
          '<strong>Codones de stop:</strong> UAA (ocre), UAG (ámbar), UGA (ópalo). No codifican aminoácido. Reconocidos por factores de liberación'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Componentes de la traducción',
        datos: [
          { label: 'Ribosoma (80S eucariota)', value: 'Subunidad 40S (18S rRNA + ~33 proteínas) + 60S (28S, 5.8S, 5S rRNA + ~49 proteínas). Sitios A (aminoacil), P (peptidil), E (exit). Peptidil transferasa en 28S rRNA (ribozima).' },
          { label: 'tRNA', value: '~80 nucleótidos. Estructura L invertida. Anticodón (3 nt) reconoce codón. Extremo 3\' CCA cargado con aminoácido. Modificaciones (inosina, pseudouridina) en anticodón permiten wobble.' },
          { label: 'Aminoacil-tRNA sintetasa', value: '20 enzimas (una por aminoácido). Especificidad dual: aminoácido correcto + tRNA correcto. Activación: aminoácido + ATP → aminoacil-AMP + PPi. Transferencia a tRNA. Corrección de errores (editing).' },
          { label: 'Factores de iniciación (eIF)', value: 'eIF1, eIF2 (une Met-tRNAi), eIF3 (previene asociación prematura), eIF4E (reconoce cap), eIF4G (scaffold), eIF4A (helicasa). Complejo 43S escanea hasta AUG.' },
          { label: 'Factores de elongación (eEF)', value: 'eEF1A (entrega aminoacil-tRNA a sitio A), eEF2 (translocación). Consumo GTP. Ciclo de elongación ~50 aa/segundo en eucariotas.' },
          { label: 'Factores de liberación', value: 'eRF1 (reconoce codón stop), eRF3 (GTPasa). Hidrólisis del enlace peptidil-tRNA. Liberación de polipéptido.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Proceso de traducción',
        items: [
          '<strong>Iniciación - Reconocimiento del cap:</strong> eIF4E une cap 5\'. eIF4G conecta con PABP (poly-A binding protein) → circularización funcional del mRNA',
          '<strong>Escaneo (scanning):</strong> Complejo 43S (40S + eIF1 + eIF2-GTP-Met-tRNAi + eIF3) se une y escanea 5\'→3\' hasta AUG en contexto Kozak. Helicasa eIF4A desenrolla estructura secundaria',
          '<strong>Reconocimiento de AUG:</strong> Met-tRNAi en sitio P. eIF1 disociada. eIF5 induce hidrólisis de GTP de eIF2. Unión de 60S (eIF5B-GTP) → ribosoma 80S completo. Liberación de eIFs',
          '<strong>Elongación - Decodificación:</strong> eEF1A-GTP entrega aminoacil-tRNA al sitio A. Reconocimiento codón-anticodón. Hidrólisis GTP → cambio conformacional → acomodo',
          '<strong>Formación del enlace peptídico:</strong> Peptidil transferasa (23S/28S rRNA) cataliza. Transferencia de cadena peptídica de P a A. Nuevo enlace peptídico formado',
          '<strong>Translocación:</strong> eEF2-GTP mueve ribosoma 3 nt. tRNA en A → P, P → E. E libera tRNA desacilado. GTP hidrolizado. Ciclo se repite',
          '<strong>Terminación:</strong> Codón stop en A. eRF1 reconoce stop. eRF3-GTP. Hidrólisis de peptidil-tRNA. Liberación de polipéptido. Disociación del ribosoma'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación de la traducción',
        items: [
          '<strong>Disponibilidad de factores:</strong> Fosforilación de eIF2α (por PKR, PERK, GCN2, HRI) inhibe iniciación. Respuesta a estrés (ISR - integrated stress response)',
          '<strong>Cap-dependiente vs IRES:</strong> Mayoría de mRNAs requieren cap. IRES (internal ribosome entry site) permite iniciación independiente de cap. Virus, algunos mRNAs celulares (estrés)',
          '<strong>uORFs (upstream ORFs):</strong> ORFs en 5\'-UTR. Regulación negativa. Ribosoma traduce uORF → no llega a ORF principal. Ej: GCN4 (levadura), ATF4 (mamíferos)',
          '<strong>Secuencias en 3\'-UTR:</strong> miRNAs se unen → represión. IREs (iron response elements) + IRPs regulan ferritina, receptor de transferrina según hierro disponible',
          '<strong>Modificaciones de mRNA:</strong> m⁶A (N6-metiladenosina) en 5\'-UTR puede promover traducción cap-independiente. m⁶A en CDS puede inhibir',
          '<strong>Granulos de estrés:</strong> Condensados de mRNAs + proteínas. Almacenamiento de mRNAs no traducidos durante estrés. Dinámicos, reversibles'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Mutaciones sin sentido (nonsense):</strong> Codón sentido → stop prematuro. PTC (premature termination codon). Ej: β-talasemia (β⁰), Duchenne. NMD (nonsense-mediated decay) degrada mRNA',
          '<strong>Mutaciones sin sentido erróneo (missense):</strong> Cambio de aminoácido. Anemia falciforme: Glu6Val en β-globina. HbS polimeriza en desoxigenación. >70% de mutaciones patogénicas',
          '<strong>Mutaciones del marco de lectura (frameshift):</strong> Inserción/deleción no múltiplo de 3. Cambia todo el marco downstream. Frecuentemente introduce stop prematuro. Ej: Tay-Sachs (inserción 4 pb)',
          '<strong>Terapia de supresión de codones stop:</strong> Ataluren (PTC124). Lee codones stop prematuros. Fibrosis quística, Duchenne. Eficacia limitada, controversial',
          '<strong>Antibióticos que inhiben traducción:</strong> Procariotas. Aminoglucósidos (estreptomicina, gentamicina): subunidad 30S, errores de lectura. Macrólidos (eritromicina): 50S, bloqueo del túnel. Cloranfenicol: peptidil transferasa',
          '<strong>Toxinas que inhiben traducción:</strong> Ricina (planta Ricinus): N-glicosidasa, inactiva 28S rRNA. Toxina diftérica: ADP-ribosilación de eEF2. Toxina Shiga (E. coli O157:H7): similar a ricina',
          '<strong>Defectos en aminoacil-tRNA sintetasas:</strong> Síndrome AARS. Mutaciones en sintetasas específicas. Fenotipos diversos: neuropatía (GARS, YARS), leucoencefalopatía (DARS2 mitocondrial)',
          '<strong>Enfermedades por expansión de repetidos:</strong> Huntington (CAG → poliQ), distrofia miotónica (CTG). Traducción no-AUG (RAN translation) de repetidos genera polipéptidos tóxicos',
          '<strong>Supresión de NMD:</strong> Algunos cánceres suprimen NMD para mantener expresión de oncogenes con PTCs. Inhibidores de NMD en desarrollo para β-talasemia, Duchenne'
        ]
      }
    ]
  },
  {
    id: 'reparacion-adn',
    nombre: 'Reparación del ADN',
    subtitulo: 'Mecanismos de mantenimiento de la integridad genómica',
    icono: '🔧',
    categorias: ['reparacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Tipos de daño al ADN',
        items: [
          '<strong>Daño espontáneo:</strong> Depurinación (~10,000/célula/día), desaminación (C→U, 5-metilC→T, ~100/célula/día), errores de replicación (1 en 10⁹-10¹⁰ tras corrección)',
          '<strong>Daño oxidativo:</strong> ROS (especies reactivas de oxígeno). 8-oxo-guanina (aparea con A, mutaciones G→T). ~10,000 lesiones/célula/día',
          '<strong>Radiación UV:</strong> Dímeros de pirimidina (T-T, C-T). Fotoproductos 6-4. Distorsión de hélice. Cáncer de piel',
          '<strong>Radiación ionizante:</strong> Roturas de cadena sencilla (SSB) y doble (DSB). Radicales libres. Terapia de radiación, exposición ambiental',
          '<strong>Agentes alquilantes:</strong> Metilación, etilación de bases. O⁶-metilguanina (aparea con T). Quimioterapia (temozolomida), carcinógenos (nitrosaminas)',
          '<strong>Aductos voluminosos:</strong> Hidrocarburos aromáticos policíclicos (PAH, humo de tabaco), aflatoxina B1. Distorsión mayor de hélice'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Vías de reparación',
        datos: [
          { label: 'Reparación de mal apareamiento (MMR)', value: 'Corrige errores de replicación escapados de proofreading. MutS (MSH2-MSH6) reconoce mismatch. MutL (MLH1-PML2) recluta exonucleasa. Excisión y resíntesis. Defectos → síndrome de Lynch (cáncer colorrectal).' },
          { label: 'Reparación por escisión de bases (BER)', value: 'Daño a base única (oxidación, alquilación, desaminación). ADN glicosilasa elimina base dañada → sitio AP. APE1 corta. Pol β rellena (short-patch) o Pol δ/ε (long-patch). Ligasa sella. Defectos: MUTYH → poliposis.' },
          { label: 'Reparación por escisión de nucleótidos (NER)', value: 'Aductos voluminosos, dímeros de pirimidina. Global (GG-NER, todo genoma) o acoplada a transcripción (TC-NER). Complejo XPC-RAD23B reconoce. TFIIH desenrolla. XPG, XPF-ERCC1 cortan. Pol δ/ε rellenan. Defectos: xeroderma pigmentosum.' },
          { label: 'Reparación directa', value: 'Reversión enzimática sin escisión. O⁶-metilguanina-metiltransferasa (MGMT) transfiere metilo a Cys propia (suicida). Fotoliasa (bacterias, plantas, no mamíferos) revierte dímeros UV.' },
          { label: 'Recombinación homóloga (HR)', value: 'Reparación de DSB. Requiere cromátida hermana (S/G2). Sin errores. Resección 5\'→3\' (CtIP, EXO1). RAD51 invade dúplex intacto (BRCA1/2 facilitan). Síntesis usando cromátida como molde. Resolución de unión Holliday.' },
          { label: 'Unión de extremos no homólogos (NHEJ)', value: 'Reparación de DSB. No requiere homología. Activo en G1. Propenso a errores (deleciones, inserciones). Ku70/80 une extremos. DNA-PKcs recluta. Artemis procesa. XRCC4-Ligasa IV sella. Defectos: SCID.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Checkpoints y respuesta a daño',
        items: [
          '<strong>Sensores de daño:</strong> ATM (roturas DSB), ATR (ADN monocatenario, estrés replicativo), DNA-PK (DSB). Quinasas PIKK',
          '<strong>Checkpoint G1/S:</strong> p53 activado por ATM/ATR. Induce p21 (inhibidor de CDK) → parada en G1. Permite reparación antes de replicación',
          '<strong>Checkpoint intra-S:</strong> ATR-Chk1 ralentiza replicación. Previene entrada de nuevos orígenes. Estabiliza horquillas bloqueadas',
          '<strong>Checkpoint G2/M:</strong> ATM/ATR activan Chk1/Chk2 → inhiben CDC25 (fosfatasa de CDK1) → no se entra en mitosis. Reparación antes de segregación',
          '<strong>Checkpoint de ensamblaje del huso (SAC):</strong> No directamente de daño ADN. Previene anafase hasta que cromosomas estén correctamente unidos. BubR1, Mad2',
          '<strong>Apoptosis:</strong> Si daño irreparable, p53 induce genes pro-apoptóticos (BAX, PUMA, NOXA). Muerte celular programada. "Guardián del genoma"'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Mecanismos especializados',
        items: [
          '<strong>Síntesis translesión (TLS):</strong> Polimerasas de familia Y (Pol η, ι, κ, REV1). Bypasean lesiones. Baja fidelidad pero previenen bloqueo de replicación. Pol η: dímeros T-T sin mutagénesis',
          '<strong>Recombinación de cambio de molde (template switching):</strong> Horquilla bloqueada usa cromátida hermana como molde transitorio. Mecanismo libre de errores',
          '<strong>Reparación de entrecruzamientos (ICL):</strong> Vía de Fanconi. 22 proteínas FANC. ICL detectados en replicación. Incisión, TLS, HR. Defectos: anemia de Fanconi (fallo medular, cáncer, malformaciones)',
          '<strong>Segregación de cromátidas con errores (break-induced replication):</strong> Rescate de horquillas colapsadas con un solo extremo. HR no convencional. Puede generar reordenamientos',
          '<strong>Reparación acoplada a transcripción (TCR):</strong> Subvía de NER. Lesiones en cadena transcrita reparadas preferencialmente. RNA Pol II bloqueada recluta CSA, CSB. Defectos: síndrome de Cockayne'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Xeroderma pigmentosum (XP):</strong> Defectos en NER (XPA-XPG, 8 grupos de complementación). Hipersensibilidad UV extrema. Cáncer de piel 10,000x aumentado. Fotofobia, neurodegeneración (20% XP-A)',
          '<strong>Síndrome de Lynch (HNPCC):</strong> Mutaciones en MMR (MLH1, MSH2, MSH6, PMS2). Cáncer colorrectal (70-80% vida), endometrio, ovario. Inestabilidad de microsatélites (MSI-H). Screening: IHC de proteínas MMR',
          '<strong>Síndrome BRCA:</strong> Mutaciones en BRCA1/2 (HR). Cáncer de mama (50-70%), ovario (20-40%), próstata, páncreas. Judíos Ashkenazi: frecuencia alta de mutaciones fundadoras',
          '<strong>Anemia de Fanconi:</strong> 22 genes (FANC). Fallo medular progresivo, malformaciones (pulgares, riñones, microcefalia), cáncer (leucemia, tumores sólidos). Test: fragilidad cromosómica con DEB/MMC',
          '<strong>Ataxia-telangiectasia (A-T):</strong> Mutación en ATM. Ataxia cerebelosa, telangiectasias, inmunodeficiencia, cáncer (linfoma, leucemia). Hipersensibilidad a radiación ionizante. Diagnóstico: ↓AFP, ↓IgA',
          '<strong>PARP inhibidores:</strong> Olaparib, rucaparib, niraparib. Letalidad sintética en tumores BRCA-mutantes. PARP repara SSB; su inhibición → conversión a DSB → HR deficiente no repara → muerte celular',
          '<strong>Inhibidores de DNA-PK:</strong> Radiosensibilizadores. M3814, AZD7648 en desarrollo. Combinación con radioterapia en cáncer',
          '<strong>Temozolomida (TMZ):</strong> Agente alquilante (glioblastoma). Metila guanina en O⁶. Células con MGMT bajo son sensibles. Promotor de MGMT metilado predice respuesta',
          '<strong>Inestabilidad cromosómica hereditaria:</strong> Síndrome de Bloom (BLM helicasa), síndrome de Werner (WRN helicasa), síndrome de Rothmund-Thomson (RECQL4). Intercambios de cromátidas hermanas, cáncer temprano'
        ]
      }
    ]
  }
];