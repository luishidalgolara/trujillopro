/* ============================================================
   GALERIA.JS — PharmaLab Chile | Galería Celular 3D
   Visualización 3D con Canvas API puro (sin dependencias)
   Datos científicos basados en: Alberts et al. "Molecular Biology
   of the Cell" 7ª ed. (2022), Lodish et al. 9ª ed. (2021)
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════════════════════
   BASE DE DATOS CIENTÍFICA — 20 estructuras celulares
   ═══════════════════════════════════════════════════════════ */
const CELL_DATA = [
  {
    id: 0,
    name: 'Célula',
    tag: 'Fundamento Biológico',
    color: '#a855f7',
    desc: 'La célula es la unidad estructural, funcional y de reproducción de todos los organismos vivos. Postulada por la Teoría Celular (Schleiden & Schwann, 1839; Virchow, 1858), toda célula proviene de una célula preexistente. Constituye el nivel de organización donde emergen las propiedades características de la vida: metabolismo, homeostasis, respuesta a estímulos y capacidad reproductiva.',
    datos: [
      { val: '~1–100 μm', key: 'Tamaño típico' },
      { val: '~70%', key: 'Contenido en agua' },
      { val: '37×10¹²', key: 'Células humanas' },
      { val: '1665', key: 'Año descubrimiento' }
    ],
    componentes: [
      { name: 'Membrana plasmática', color: 'purple' },
      { name: 'Citoplasma', color: '' },
      { name: 'Material genético', color: 'green' },
      { name: 'Ribosomas', color: 'gold' },
      { name: 'Enzimas metabólicas', color: '' }
    ],
    func: 'Realiza todas las reacciones metabólicas necesarias para la vida, incluyendo síntesis de macromoléculas (anabolismo), degradación para obtención de energía (catabolismo), transducción de señales y replicación del material genético. La ATP es la moneda energética universal sintetizada principalmente por la fosforilación oxidativa mitocondrial.',
    render: 'genericCell'
  },
  {
    id: 1,
    name: 'Célula Procariota',
    tag: 'Tipo Celular · Dominio Bacteria/Archaea',
    color: '#06b6d4',
    desc: 'Organismo unicelular sin núcleo verdadero ni orgánulos membranosos. El ADN circular (cromosoma bacteriano + plásmidos) reside en el nucleoide, región sin membrana delimitadora. Clasificadas en Dominio Bacteria (con peptidoglucano en pared celular) y Dominio Archaea (sin peptidoglucano, lípidos de membrana con éteres de isoprenol). Constituyen el 80% de la biomasa terrestre.',
    datos: [
      { val: '0.1–10 μm', key: 'Tamaño' },
      { val: '70S', key: 'Ribosomas' },
      { val: '20 min', key: 'Tiempo duplicación (E. coli)' },
      { val: '~4.6 Mb', key: 'Genoma E. coli' }
    ],
    componentes: [
      { name: 'Nucleoide (ADN circular)', color: 'gold' },
      { name: 'Plásmidos', color: 'gold' },
      { name: 'Ribosomas 70S', color: 'purple' },
      { name: 'Pared celular', color: 'green' },
      { name: 'Membrana plasmática', color: '' },
      { name: 'Flagelos/Pili', color: 'red' },
      { name: 'Cápsula (algunas)', color: '' }
    ],
    func: 'Metabolismo extremadamente diverso: fotosíntesis, quimiosíntesis, respiración aeróbica/anaeróbica, fermentación. Fijación de nitrógeno atmosférico (Rhizobium, Azotobacter). División por fisión binaria. Transferencia horizontal de genes mediante transformación, transducción y conjugación. Resistencia a antibióticos mediante betalactamasas, bombas de eflujo y modificación del sitio diana.',
    render: 'prokaryote'
  },
  {
    id: 2,
    name: 'Célula Eucariota',
    tag: 'Tipo Celular · Dominio Eukarya',
    color: '#a855f7',
    desc: 'Célula con núcleo verdadero delimitado por envoltura nuclear de doble membrana perforada por complejos de poro nuclear (CPN). Posee un sistema endomembranoso elaborado (RE, Golgi, vesículas) y orgánulos semiautónomos derivados de endosimbiosis: mitocondrias (proteobacteria α, ~1.5 Ga) y cloroplastos (cianobacteria, ~1.0 Ga). Incluye animales, plantas, hongos y protistas.',
    datos: [
      { val: '10–100 μm', key: 'Tamaño típico' },
      { val: '80S', key: 'Ribosomas citosólicos' },
      { val: '~20,000', key: 'Genes (humano)' },
      { val: '1.5 Ga', key: 'Origen evolutivo estimado' }
    ],
    componentes: [
      { name: 'Núcleo con envoltura', color: 'purple' },
      { name: 'Retículo endoplasmático', color: '' },
      { name: 'Aparato de Golgi', color: 'gold' },
      { name: 'Mitocondrias', color: 'red' },
      { name: 'Ribosomas 80S', color: 'green' },
      { name: 'Citoesqueleto complejo', color: '' }
    ],
    func: 'La compartimentación permite especialización bioquímica: síntesis proteica en ribosomas libres/RE rugoso; modificaciones post-traduccionales en Golgi; β-oxidación y ciclo de Krebs en mitocondria; fotosíntesis en cloroplasto. La mitosis y meiosis permiten reproducción sexual y genética mendeliana. El ciclo celular está regulado por CDKs (quinasas dependientes de ciclinas) y checkpoints de vigilancia genómica.',
    render: 'eukaryote'
  },
  {
    id: 3,
    name: 'Célula Animal',
    tag: 'Tipo Celular · Animalia',
    color: '#f59e0b',
    desc: 'Célula eucariota heterótrofa sin pared celular, sin cloroplastos y con forma irregular moldeable. Presenta centriolos que organizan el huso mitótico y lisosomas para digestión intracelular. La membrana plasmática rica en colesterol le confiere flexibilidad. Es capaz de endocitosis (fagocitosis, pinocitosis) y movimientos ameboides. El glicocálix en su superficie participa en reconocimiento celular e inmunidad.',
    datos: [
      { val: 'Irregular', key: 'Morfología' },
      { val: 'Ausente', key: 'Pared celular' },
      { val: 'Pequeñas/múltiples', key: 'Vacuolas' },
      { val: 'Presentes', key: 'Centriolos' }
    ],
    componentes: [
      { name: 'Centriolos (par)', color: 'purple' },
      { name: 'Lisosomas', color: 'red' },
      { name: 'Mitocondrias', color: 'red' },
      { name: 'Glicocálix', color: 'green' },
      { name: 'Vacuolas pequeñas', color: '' },
      { name: 'RE y Golgi', color: 'gold' }
    ],
    func: 'Diferenciación en +200 tipos celulares especializados: neuronas (conducción eléctrica), eritrocitos (transporte O₂), miocitos (contracción), hepatocitos (metabolismo xenobiótico), células B/T (respuesta inmune). La señalización paracrina y endocrina integra la fisiología multicelular. La apoptosis (programada por caspasas) elimina células dañadas sin inflamación.',
    render: 'animalCell'
  },
  {
    id: 4,
    name: 'Célula Vegetal',
    tag: 'Tipo Celular · Plantae',
    color: '#10b981',
    desc: 'Célula eucariota autótrofa con tres características exclusivas: pared celular de celulosa-hemicelulosa-pectina (rigidez y protección), cloroplastos para fotosíntesis oxigénica y vacuola central grande (hasta 90% del volumen celular) que regula la turgencia osmótica. Carece de centriolos aunque realiza mitosis. La plasmodesmata conecta células adyacentes formando el simplasto.',
    datos: [
      { val: 'Rectangular', key: 'Morfología' },
      { val: 'Celulosa', key: 'Componente pared' },
      { val: '90% vol.', key: 'Vacuola central' },
      { val: '0.5–2 MPa', key: 'Presión de turgencia' }
    ],
    componentes: [
      { name: 'Pared celular (celulosa)', color: 'green' },
      { name: 'Cloroplastos', color: 'green' },
      { name: 'Vacuola central', color: '' },
      { name: 'Plasmodesmata', color: 'gold' },
      { name: 'Tonoplasto', color: '' },
      { name: 'Amiloplastos', color: 'gold' }
    ],
    func: 'Fotosíntesis oxigénica: 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂. Fase luminosa en tilacoides (fotofosforilación); ciclo de Calvin en estroma (fijación de CO₂ por RuBisCO). Asimilación de nitrato y sulfato desde el suelo. Producción de metabolitos secundarios: terpenos, fenoles, alcaloides con funciones defensivas y ecológicas. La fotomorfogénesis es mediada por fitocromos y criptocromos.',
    render: 'plantCell'
  },
  {
    id: 5,
    name: 'Membrana Plasmática',
    tag: 'Membrana · Barrera Selectiva',
    color: '#22d3ee',
    desc: 'Bicapa lipídica de ~7–8 nm de grosor que delimita la célula y regula el transporte de sustancias. El Modelo de Mosaico Fluido (Singer & Nicolson, 1972, actualizado 2014) describe proteínas integrales y periféricas flotando lateralmente en la bicapa, con difusión lateral rápida (~1 μm²/s) pero flip-flop lento. La asimetría lipídica es mantenida activamente: fosfatidilcolina y esfingomielina en hoja externa; fosfatidilserina y fosfatidiletanolamina en hoja interna.',
    datos: [
      { val: '7–8 nm', key: 'Grosor' },
      { val: '~50%', key: 'Contenido proteico (masa)' },
      { val: '1 μm²/s', key: 'Difusión lateral lípidos' },
      { val: '−70 mV', key: 'Potencial de membrana (neurona)' }
    ],
    componentes: [
      { name: 'Fosfolípidos anfipáticos', color: 'purple' },
      { name: 'Colesterol (25-40%)', color: 'gold' },
      { name: 'Proteínas integrales', color: '' },
      { name: 'Proteínas periféricas', color: '' },
      { name: 'Glicolípidos', color: 'green' },
      { name: 'Lipid rafts', color: 'red' }
    ],
    func: 'Barrera semipermeable: libre paso de O₂, CO₂, agua (aquaporinas), etanol y moléculas liposolubles. Impide paso de iones (Na⁺, K⁺, Ca²⁺) y moléculas polares sin proteínas transportadoras. Transporte activo por ATPasas (Na⁺/K⁺-ATPasa: 3Na⁺ salida, 2K⁺ entrada, gasto de 1 ATP/ciclo). Recepción de señales mediante receptores acoplados a proteínas G (GPCRs, >800 en humano) y receptores con actividad tirosina quinasa (RTKs).',
    render: 'membrane'
  },
  {
    id: 6,
    name: 'Bicapa Lipídica',
    tag: 'Membrana · Estructura Lipídica',
    color: '#a855f7',
    desc: 'Estructura de doble capa formada espontáneamente por moléculas de fosfolípidos anfipáticos en medio acuoso, minimizando energía libre (efecto hidrofóbico). Cada fosfolípido tiene una cabeza polar (fosfato + alcohol) hidrofílica y dos colas de ácidos grasos apolares hidrofóbicas. El grosor de la región hidrofóbica es de ~3.5–4 nm. La curvatura de la membrana depende de la geometría lipídica: lípidos cónicos (PE, DAG) favorecen curvatura negativa.',
    datos: [
      { val: '3.5–4 nm', key: 'Región hidrofóbica' },
      { val: '~5×10⁶', key: 'Fosfolípidos/μm²' },
      { val: 'Espontánea', key: 'Formación en H₂O' },
      { val: '−12 kJ/mol', key: 'ΔG por contacto apolar' }
    ],
    componentes: [
      { name: 'Fosfatidilcolina (PC)', color: '' },
      { name: 'Fosfatidiletanolamina (PE)', color: 'green' },
      { name: 'Fosfatidilserina (PS)', color: 'red' },
      { name: 'Esfingomielina (SM)', color: 'purple' },
      { name: 'Fosfatidilinositol (PI)', color: 'gold' },
      { name: 'Colesterol', color: 'gold' }
    ],
    func: 'El efecto hidrofóbico es la fuerza motriz: la exposición de colas al agua aumenta la entropía del agua (estructuración) → ΔG positivo. La autoensamblaje en bicapa o micela elimina contactos desfavorables. La fluidez aumenta con: mayor insaturación de ácidos grasos (dobles enlaces cis crean codos), temperatura y menor colesterol. Colesterol actúa como tampón de fluidez: aumenta fluidez a bajas T° y la reduce a altas T°.',
    render: 'bilayer'
  },
  {
    id: 7,
    name: 'Núcleo',
    tag: 'Núcleo · Centro de Control Genético',
    color: '#a855f7',
    desc: 'Orgánulo más grande de la célula eucariota (~5–10 μm diámetro), delimitado por la envoltura nuclear: doble membrana (membrana nuclear interna y externa, continua con el RE) perforada por complejos de poro nuclear (CPN). Cada CPN mide ~120 nm y permite tráfico bidireccional: importación de proteínas nucleares (histonas, polimerasas) vía señales NLS; exportación de ARNm maduros, ARNr y ARNt vía señales NES.',
    datos: [
      { val: '5–10 μm', key: 'Diámetro' },
      { val: '3,000–4,000', key: 'Poros nucleares/núcleo' },
      { val: '~120 nm', key: 'Diámetro poro nuclear' },
      { val: '~3,000 kDa', key: 'Masa complejo de poro' }
    ],
    componentes: [
      { name: 'Envoltura nuclear (doble)', color: 'purple' },
      { name: 'Complejos de poro nuclear', color: 'gold' },
      { name: 'Lámina nuclear (laminas A/B/C)', color: '' },
      { name: 'Cromatina (eucromatina/heterocromatina)', color: 'green' },
      { name: 'Nucleolo (1-4)', color: 'red' },
      { name: 'Nucleoplasma', color: '' }
    ],
    func: 'Almacena el genoma en forma de cromatina: ADN + histonas octaméricas (H2A, H2B, H3, H4) formando nucleosomas (~147 pb envueltos). La replicación del ADN ocurre en fase S; la transcripción por ARN pol I (ARNr), II (ARNm) y III (ARNt) es regulada por factores de transcripción y remodelación de cromatina (HATs, HDACs, SWI/SNF). El splicing del pre-ARNm ocurre co-transcricionalmente en complejos spliceosomales.',
    render: 'nucleus'
  },
  {
    id: 8,
    name: 'Nucleolo',
    tag: 'Núcleo · Fábrica Ribosómica',
    color: '#06b6d4',
    desc: 'Condensado biomolecular sin membrana dentro del núcleo, formado por separación de fases líquido-líquido (LLPS) mediada por proteínas con dominios de baja complejidad (IDR). Se organiza en torno a los Organizadores Nucleolares (NORs), regiones de los cromosomas que portan los genes de ARNr 45S en tándem (5S-8S-28S). Pueden existir 1–4 nucléolos por núcleo según la demanda biosintética celular.',
    datos: [
      { val: '1–4 por núcleo', key: 'Número típico' },
      { val: '1–10 μm', key: 'Diámetro' },
      { val: '~200 copias', key: 'Genes ARNr/célula haploid.' },
      { val: '~7,500 nt', key: 'Longitud pre-ARNr 47S' }
    ],
    componentes: [
      { name: 'Centro fibrilar (CF) — transcripción ARNr', color: '' },
      { name: 'Componente fibrilar denso (CFD) — procesamiento', color: 'purple' },
      { name: 'Componente granular (CG) — ensamblaje', color: 'gold' },
      { name: 'ARNr 18S, 5.8S, 28S', color: 'green' },
      { name: 'ARN pol I y factores asociados', color: 'red' }
    ],
    func: 'Produce las subunidades ribosomales: ARN pol I transcribe el gen ARNr 45S → pre-ARNr 47S → procesamiento en 18S (subunidad 40S) + 5.8S + 28S (subunidad 60S). El ARNr 5S es transcrito por ARN pol III en el nucleoplasma. Ensamblaje co-transcripcional de proteínas ribosomales importadas del citoplasma. Una célula HeLa produce ~10⁶ ribosomas/hora. El nucleolo también regula la respuesta a estrés, el envejecimiento y la actividad de p53.',
    render: 'nucleolus'
  },
  {
    id: 9,
    name: 'Citoplasma',
    tag: 'Compartimento · Interior Celular',
    color: '#10b981',
    desc: 'Todo el contenido celular excepto el núcleo, delimitado por la membrana plasmática. Compuesto por el citosol (solución coloidal viscosa con pH ~7.2, [K⁺] ~140 mM, [Na⁺] ~12 mM, [Mg²⁺] ~0.5 mM libre) más todos los orgánulos. El citosol no es un líquido homogéneo: contiene condensados biomoleculares sin membrana (gránulos de estrés, cuerpos P, centros de procesamiento de ARN) y macromoléculas que forman redes transitorias.',
    datos: [
      { val: 'pH 7.0–7.4', key: 'pH citosólico' },
      { val: '~140 mM', key: '[K⁺] citosólico' },
      { val: '~20–30%', key: 'Proteína total (v/v)' },
      { val: '~10⁹', key: 'Proteínas/μm³ citosol' }
    ],
    componentes: [
      { name: 'Citosol (solución coloidal)', color: '' },
      { name: 'Glucólisis (10 enzimas)', color: 'green' },
      { name: 'Ribosomas libres', color: 'gold' },
      { name: 'Vesículas de tráfico', color: 'purple' },
      { name: 'Condensados sin membrana', color: '' },
      { name: 'Citoesqueleto', color: 'red' }
    ],
    func: 'Sede de la glucólisis (conversión de glucosa en piruvato + 2 ATP + 2 NADH), síntesis de aminoácidos no esenciales, síntesis de nucleótidos, activación de ácidos grasos (Acil-CoA sintetasa), vía de las pentosas fosfato (NADPH + ribosa-5P) y síntesis de proteínas citoplasmáticas en ribosomas libres. La difusión molecular en el citosol es 3–10 veces más lenta que en agua por el macromolecular crowding.',
    render: 'cytoplasm'
  },
  {
    id: 10,
    name: 'Ribosomas',
    tag: 'Orgánulo · Síntesis Proteica',
    color: '#f59e0b',
    desc: 'Nanomáquinas ribonucleoproteicas (~2.5 MDa en eucariontes) que catalizan la síntesis de proteínas (traducción) usando ARNm como molde. Constan de dos subunidades: grande (60S: ARNr 28S, 5.8S, 5S + ~49 proteínas) y pequeña (40S: ARNr 18S + ~33 proteínas). La actividad peptidiltransferasa reside en el ARNr 23S/28S (ribozima), confirmando el origen RNA World. Pueden estar libres en citosol o asociados al RE rugoso.',
    datos: [
      { val: '80S (eucar.)', key: 'Coeficiente sedimentación' },
      { val: '~2.5 MDa', key: 'Masa molecular' },
      { val: '~25 nm', key: 'Diámetro' },
      { val: '15–20 aa/s', key: 'Velocidad traducción' }
    ],
    componentes: [
      { name: 'Subunidad grande 60S', color: 'purple' },
      { name: 'Subunidad pequeña 40S', color: 'gold' },
      { name: 'Sitio A (aminoacil-ARNt)', color: 'green' },
      { name: 'Sitio P (peptidil-ARNt)', color: 'red' },
      { name: 'Sitio E (exit-ARNt)', color: '' },
      { name: 'Canal de salida del péptido', color: '' }
    ],
    func: 'Ciclo de traducción: (1) Iniciación: cap-dependiente en eucariontes — eIF4E reconoce cap m⁷G del ARNm; eIF2-GTP-Met-ARNti carga la subunidad 40S; reconocimiento del codón de inicio AUG. (2) Elongación: eEF1A-GTP entrega Aa-ARNt al sitio A; translocación catalizada por eEF2 con GTP. (3) Terminación: factores eRF1/eRF3 reconocen codón stop; liberación del péptido. Velocidad: ~15–20 aminoácidos/seg.',
    render: 'ribosome'
  },
  {
    id: 11,
    name: 'Mitocondrias',
    tag: 'Orgánulo · Central Energética',
    color: '#ef4444',
    desc: 'Orgánulo de doble membrana (membrana mitocondrial interna —MMI— y externa —MME—) derivado de una α-proteobacteria endosimbionte (~1.5 Ga). La MMI forma invaginaciones llamadas crestas que aumentan la superficie para la cadena de transporte de electrones (CTE). Posee genoma propio circular de 16,569 pb (humano) que codifica 13 proteínas de la CTE, 22 ARNt y 2 ARNr. Se hereda exclusivamente por vía materna.',
    datos: [
      { val: '30–32 ATP', key: 'ATP/glucosa (aeróbico)' },
      { val: '16,569 pb', key: 'ADNmt humano' },
      { val: '0.5–10 μm', key: 'Longitud (dinámica)' },
      { val: '−180 mV', key: 'Potencial de membrana (ΔΨm)' }
    ],
    componentes: [
      { name: 'Membrana externa (porina VDAC)', color: '' },
      { name: 'Espacio intermembrana', color: '' },
      { name: 'Membrana interna + crestas', color: 'red' },
      { name: 'Complejo I-II-III-IV (CTE)', color: 'purple' },
      { name: 'ATP sintasa (complejo V)', color: 'gold' },
      { name: 'Matriz (ciclo de Krebs)', color: 'green' }
    ],
    func: 'Ciclo de Krebs (matriz): piruvato → acetil-CoA (piruvato deshidrogenasa) → 8 ciclos producen 3 NADH + 1 FADH₂ + 1 GTP/vuelta. CTE: NADH dona e⁻ al Complejo I; FADH₂ al Complejo II; los electrones fluyen hasta el O₂ (aceptor final). El bombeo de H⁺ genera gradiente electroquímico (fuerza protón-motriz, Δp ~220 mV). ATP sintasa usa este gradiente para sintetizar ATP (1 ATP/3 H⁺). Regula también Ca²⁺ intracelular, apoptosis intrínseca (citocromo c) y producción de ROS.',
    render: 'mitochondria'
  },
  {
    id: 12,
    name: 'Cloroplastos',
    tag: 'Orgánulo · Fotosíntesis',
    color: '#10b981',
    desc: 'Plastidio de triple membrana (membrana externa, interna y sistema de tilacoides) derivado de cianobacteria endosimbionte (~1.0 Ga). Los tilacoides se apilan en grana (10–100 tilacoides/grana) interconectados por tilacoides del estroma. El genoma plastidial (plastoma) tiene ~120–160 kb (plantas superiores) y codifica ~80–100 genes. Pertenece a la familia de los plastidios junto con cromoplastos (carotenoides), leucoplastos y amiloplastos.',
    datos: [
      { val: '4–8 μm', key: 'Longitud' },
      { val: '~120 kb', key: 'Plastoma (trigo)' },
      { val: '680 nm', key: 'Absorción clorofila a' },
      { val: '100–500/célula', key: 'Número por célula vegetal' }
    ],
    componentes: [
      { name: 'Membrana externa (permeable)', color: 'green' },
      { name: 'Membrana interna (selectiva)', color: 'green' },
      { name: 'Grana (tilacoides apilados)', color: '' },
      { name: 'Fotosistema II (P680)', color: 'gold' },
      { name: 'Fotosistema I (P700)', color: 'gold' },
      { name: 'RuBisCO (ciclo Calvin)', color: 'purple' },
      { name: 'Estroma (Calvin)', color: 'red' }
    ],
    func: 'FASE LUMINOSA (tilacoides): H₂O → O₂ + 4H⁺ + 4e⁻ (PSII, P680). Electrones fluyen a PSI (P700) vía plastoquinona, citocromo b6f, plastocianina → NADP⁺ + H⁺ → NADPH. ATP se sintetiza por fotofosforilación (ATP sintasa cloroplástica). CICLO DE CALVIN (estroma): CO₂ + RuBP (5C) → 2×3-fosfoglicerato (3-PGA) [RuBisCO]. Fijación: 3CO₂ + 9ATP + 6NADPH → G3P → glucosa/sacarosa. Enzima RuBisCO: la más abundante de la biosfera (~5×10⁸ ton).',
    render: 'chloroplast'
  },
  {
    id: 13,
    name: 'Lisosomas',
    tag: 'Orgánulo · Digestión Celular',
    color: '#ef4444',
    desc: 'Vesículas membranosas de una sola membrana con interior acidificado (pH 4.5–5.0) mantenido por la V-ATPasa (protón-bomba dependiente de ATP). Contienen +60 hidrolasas ácidas (proteasas, lipasas, nucleasas, glucosidasas, sulfatasas). Descubiertos por Christian de Duve (Nobel 1974). Su membrana tiene el glicocálix luminal LAMP-1/LAMP-2 que la protege de autodigestión.',
    datos: [
      { val: 'pH 4.5–5.0', key: 'pH interno' },
      { val: '+60', key: 'Tipos de hidrolasas' },
      { val: '0.1–1.2 μm', key: 'Diámetro' },
      { val: '~300', key: 'Lisosomas/célula hepática' }
    ],
    componentes: [
      { name: 'V-ATPasa (acidificación)', color: 'red' },
      { name: 'LAMP-1, LAMP-2 (protección)', color: 'purple' },
      { name: 'Catepsinas B, D, L (proteasas)', color: 'gold' },
      { name: 'α-glucosidasa ácida (GAA)', color: '' },
      { name: 'Esfingomielinasa ácida', color: 'green' },
      { name: 'DNasa II, ARNasa ácida', color: '' }
    ],
    func: 'Digestión intracelular por tres vías: (1) Heterofagia: digestión de material exógeno (fagosoma → fagolisosoma). (2) Macroautofagia: secuestro de orgánulos dañados en autofagosoma de doble membrana → autolisosoma. (3) Mitofagia: autofagia selectiva de mitocondrias disfuncionales. Errores enzimáticos causan enfermedades lisosomales de depósito (ELD): +70 tipos, ej. Gaucher (β-glucosidasa), Niemann-Pick (esfingomielinasa), Tay-Sachs (β-hexosaminidasa). Tratamiento: terapia de reemplazo enzimático (TRE).',
    render: 'lysosome'
  },
  {
    id: 14,
    name: 'Peroxisomas',
    tag: 'Orgánulo · Detoxificación',
    color: '#f59e0b',
    desc: 'Organelos de una membrana sin genoma propio, que se proliferan por fisión a partir de peroxisomas preexistentes y de forma de novo desde el RE (debatido). Contienen oxidasas que utilizan O₂ y generan H₂O₂ como subproducto, y catalasa que descompone este peróxido (2H₂O₂ → 2H₂O + O₂). La membrana peroxisomal tiene canales de porina para moléculas pequeñas. Las proteínas se importan post-traduccionalmente vía señales PTS1 o PTS2.',
    datos: [
      { val: '0.1–1.0 μm', key: 'Diámetro' },
      { val: '70–100', key: 'Peroxisomas/hepatocito' },
      { val: 'PTS1/PTS2', key: 'Señales de importación' },
      { val: 'Catalasa', key: 'Enzima marcadora' }
    ],
    componentes: [
      { name: 'Catalasa (detox H₂O₂)', color: 'gold' },
      { name: 'Acil-CoA oxidasa (β-oxidación)', color: 'red' },
      { name: 'D-aminoácido oxidasa', color: '' },
      { name: 'Xantina oxidasa', color: 'green' },
      { name: 'Peroxinas (PEX, biogénesis)', color: 'purple' },
      { name: 'ABCD1 (transportador VLCFA)', color: '' }
    ],
    func: 'β-Oxidación peroxisomal: indispensable para ácidos grasos de cadena muy larga (AGCML, >C22), ácidos grasos de cadena ramificada y ácidos biliares. Distinto a β-oxidación mitocondrial: los electrones van directamente a O₂ (no CTE), generando calor + H₂O₂ (manejado por catalasa). Síntesis de éter-fosfolípidos (plasmalógenos) esenciales para membranas cerebrales. Síntesis de ácido biliar. Defectos en peroxinas causan Síndrome de Zellweger (adrenoleucodistrofia ligada al X: mutación ABCD1).',
    render: 'peroxisome'
  },
  {
    id: 15,
    name: 'Retículo Endoplasmático',
    tag: 'Orgánulo · Sistema Endomembranoso',
    color: '#06b6d4',
    desc: 'Red membranosa continua con la envoltura nuclear que forma cisternas aplanadas y túbulos ramificados. Constituye >50% de las membranas celulares totales. Existen dos dominios funcionales: RE Rugoso (RER), con ribosomas asociados, especializado en síntesis y control de calidad de proteínas de secreción/membrana; y RE Liso (REL), sin ribosomas, rico en enzimas de síntesis lipídica y detoxificación.',
    datos: [
      { val: '>50%', key: 'Membranas celulares totales' },
      { val: '10⁶/hepático', key: 'Ribosomas en RER' },
      { val: 'BiP/GRP78', key: 'Chaperona principal RE' },
      { val: 'Ca²⁺ 0.5 mM', key: 'Concentración luminal Ca²⁺' }
    ],
    componentes: [
      { name: 'RER — síntesis proteica', color: 'purple' },
      { name: 'REL — síntesis lípidos', color: '' },
      { name: 'Translocón Sec61 (RER)', color: 'green' },
      { name: 'BiP/GRP78 (chaperona)', color: 'gold' },
      { name: 'Calnexina/Calreticulina', color: '' },
      { name: 'Citocromo P450 (REL)', color: 'red' }
    ],
    func: 'RER: Las proteínas con péptido señal N-terminal son co-traduccionalmente insertadas en el translocón Sec61 → lumen RE → plegamiento asistido por chaperonas (BiP, calnexina). El control de calidad ERAD (ER-associated degradation) dirige proteínas mal plegadas al proteasoma. N-glicosilación co-traduccional. La Respuesta a Proteínas Mal Plegadas (UPR, Unfolded Protein Response) activa IRE1, PERK y ATF6. REL: síntesis de fosfatidilcolina (vía CDP-colina), TG, colesterol; metabolismo de glucógeno; detoxificación de xenobióticos por CYP450s (más de 50 isoformas en humano).',
    render: 'reticulum'
  },
  {
    id: 16,
    name: 'Aparato de Golgi',
    tag: 'Orgánulo · Centro de Distribución',
    color: '#a855f7',
    desc: 'Sistema de cisternas aplanadas apiladas (3–8 pilas en células animales, decenas en células vegetales) con una polaridad funcional definida: cara cis (recibe vesículas del RE), región medial y cara trans (envía vesículas al destino final). En células animales existe el Complejo de Golgi como una única cinta perinuclear. En plantas, los dictiosomas están dispersos. Es esencial para el tráfico vesicular intracelular.',
    datos: [
      { val: '3–8 cisternas', key: 'Pilas por complejo' },
      { val: '~1–3 μm', key: 'Diámetro pila' },
      { val: 'cis → trans', key: 'Polaridad funcional' },
      { val: '~400', key: 'Enzimas glicosilatransferasas' }
    ],
    componentes: [
      { name: 'Cara cis (recepción)', color: '' },
      { name: 'Red cis-Golgi (CGN)', color: 'green' },
      { name: 'Cisternas mediales', color: 'gold' },
      { name: 'Red trans-Golgi (TGN)', color: 'purple' },
      { name: 'Vesículas COP-I y COP-II', color: 'red' },
      { name: 'Vesículas de clatrina', color: '' }
    ],
    func: 'Procesamiento proteico en tránsito: maduración de N-glicanos (procesamiento de oligosacárido Man9 → estructuras complejas/híbridas), adición de O-glicanos, sulfatación de tirosinas y carbohidratos, proteólisis limitada (prohormonas → hormonas activas, ej. proinsulina → insulina). Clasificación y envío: proteínas lisosomales (M6P-receptor), proteínas de secreción constitutiva, proteínas de secreción regulada (vesículas secretoras) y proteínas de membrana plasmática.',
    render: 'golgi'
  },
  {
    id: 17,
    name: 'Citoesqueleto',
    tag: 'Citoesqueleto · Andamiaje Dinámico',
    color: '#22d3ee',
    desc: 'Red dinámica de filamentos proteicos que determina la forma celular, organiza los orgánulos, genera y transmite fuerzas mecánicas y sirve de pista para motores moleculares. Consta de tres tipos: microtúbulos (MT, 25 nm), microfilamentos de actina (MF, 7 nm) y filamentos intermedios (FI, 10 nm, no en levaduras). Su dinamismo (polimerización/despolimerización) está regulado por GTPasas de la familia Rho (RhoA, Rac1, Cdc42) y quinasas.',
    datos: [
      { val: '3 tipos', key: 'Polímeros principales' },
      { val: '>100', key: 'Proteínas asociadas (MAPs)' },
      { val: 'GTP/ATP', key: 'Energía polimerización' },
      { val: 'pN-nN', key: 'Fuerzas generadas' }
    ],
    componentes: [
      { name: 'Microtúbulos (α/β-tubulina)', color: 'purple' },
      { name: 'Microfilamentos (actina-F)', color: 'green' },
      { name: 'Filamentos intermedios (vimentina, FN)', color: 'gold' },
      { name: 'Cinesina/Dineína (motores MT)', color: 'red' },
      { name: 'Miosinas II/V/VI (motores actina)', color: '' },
      { name: 'Arp2/3, WASP, forminas', color: '' }
    ],
    func: 'MT: organización del huso mitótico (segregación cromosómica), transporte intracelular (cinesina → + extremo; dineína → − extremo), estructura de cilios y flagelos (9+2). MF: contracción muscular (actina-miosina II), lamelipodios y filipodios (migración), anillo contráctil en citocinesis. FI: resistencia mecánica a deformación, anclaje de núcleo (laminas nucleares). La disrupción del citoesqueleto por fármacos (taxol, vincristina, citocalasina) tiene aplicación oncológica.',
    render: 'cytoskeleton'
  },
  {
    id: 18,
    name: 'Microtúbulos',
    tag: 'Citoesqueleto · Polímeros de Tubulina',
    color: '#a855f7',
    desc: 'Polímeros huecos de 13 protofilamentos de heterodímeros α/β-tubulina (cada subunidad ~50 kDa), organizados helicoidalmente. La β-tubulina une GTP que se hidroliza a GDP tras la incorporación al polímero (inestabilidad dinámica). Presentan extremo + (crecimiento rápido, β-tubulina expuesta) y extremo − (crecimiento lento, α-tubulina expuesta). Los centros organizadores (MTOC/centrosoma) nuclean la polimerización con γ-tubulina.',
    datos: [
      { val: '25 nm', key: 'Diámetro externo' },
      { val: '13', key: 'Protofilamentos' },
      { val: '8 nm/s', key: 'Velocidad crecimiento (+)' },
      { val: '~40 μm/min', key: 'Velocidad depolimerización' }
    ],
    componentes: [
      { name: 'α-tubulina (GTP permanente)', color: 'purple' },
      { name: 'β-tubulina (GTP hidrolizable)', color: 'gold' },
      { name: 'γ-tubulina (nucleación, MTOC)', color: 'green' },
      { name: 'MAPs estabilizadoras (Tau, MAP2)', color: '' },
      { name: 'Kinesinas (+extremo, antergrado)', color: 'red' },
      { name: 'Dineína (−extremo, retrogrado)', color: '' }
    ],
    func: 'Inestabilidad dinámica: la "tapa de GTP" en el extremo + previene la depolimerización. Al hidrolizarse GTP→GDP, el dímero adopta curvatura → depolimerización rápida (catastrophe). Regrowth (rescue) cuando se reestablece la tapa. Aplicación clínica: Taxol (estabiliza MT, bloquea mitosis) y vincristina/vinblastina (inhiben polimerización) son quimioterápicos de primera línea. La disfunción del axonema cilio (9+2: 9 dobletes + 2 singuletes centrales con dineína cilio) causa Discinesia Ciliar Primaria.',
    render: 'microtubule'
  },
  {
    id: 19,
    name: 'Microfilamentos',
    tag: 'Citoesqueleto · Filamentos de Actina',
    color: '#10b981',
    desc: 'Polímeros helicoidales de actina-G (globular, ~42 kDa, une ATP) que forman actina-F (filamentosa). Diámetro de ~7 nm. Presentan extremo (+) de inserción rápida (barba, "pointed" en nomenclatura inversa anglosajona: "barbed end" es el + en actina) y extremo (−) de disociación. La nucleación de novo es catalizada por el complejo Arp2/3 (ramificación en ángulo de 70°) activado por WASP/N-WASP, y por forminas (polimerización lineal).',
    datos: [
      { val: '7 nm', key: 'Diámetro' },
      { val: '~42 kDa', key: 'Masa actina-G' },
      { val: '1 μm/min', key: 'Treadmilling (+ extremo)' },
      { val: '~100 μM', key: 'Concentración celular actina' }
    ],
    componentes: [
      { name: 'Actina-G (monómero, ATP)', color: 'green' },
      { name: 'Actina-F (filamento, ADP)', color: 'green' },
      { name: 'Arp2/3 (nucleación/ramificación)', color: 'purple' },
      { name: 'Forminas (DIA1, mDIA)', color: 'gold' },
      { name: 'Miosina II (contracción)', color: 'red' },
      { name: 'Cofilina/ADF (despolimerización)', color: '' },
      { name: 'Profilina (intercambio ADP→ATP)', color: '' }
    ],
    func: 'Treadmilling: adición de actina-ATP en extremo (+) e hidrólisis/disociación en extremo (−) → flujo de monómeros sin desplazamiento neto del filamento → propulsión de lamelipodio. Estructuras: lamelipodios (redes ramificadas Arp2/3, migración), filipodios (haces paralelos con forminas, exploración), estrés (haces contractiles con miosina II, matriz extracelular). Anillo contráctil: actina-F + miosina II → constricción del ecuador en citocinesis. Defectos en actina (ACTA2) → malformaciones vasculares. Cofilin regula la dinámica y es diana en invasividad tumoral.',
    render: 'microfilament'
  }
];

/* ═══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ═══════════════════════════════════════════════════════════ */
let currentModalId = 0;
let modalCanvas, modalCtx;
let modalAnim = null;
let autoRotate = true;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
let rotX = 0.3, rotY = 0;
let zoom = 1;
let miniAnims = [];

/* ═══════════════════════════════════════════════════════════
   UTILIDADES MATEMÁTICAS 3D
   ═══════════════════════════════════════════════════════════ */
function rotateX(p, a) {
  return [p[0], p[1]*Math.cos(a) - p[2]*Math.sin(a), p[1]*Math.sin(a) + p[2]*Math.cos(a)];
}
function rotateY(p, a) {
  return [p[0]*Math.cos(a) + p[2]*Math.sin(a), p[1], -p[0]*Math.sin(a) + p[2]*Math.cos(a)];
}
function project(p, cx, cy, scale, fov) {
  const z = p[2] * scale + fov;
  const f = fov / z;
  return [cx + p[0]*scale*f, cy + p[1]*scale*f, f];
}

/* ═══════════════════════════════════════════════════════════
   RENDERERS 3D — uno por cada estructura celular
   ═══════════════════════════════════════════════════════════ */
const Renderers = {

  /* ─── Célula genérica ─── */
  genericCell(ctx, w, h, t, rx, ry, zm) {
    const cx = w/2, cy = h/2;
    ctx.clearRect(0,0,w,h);
    // Sombra exterior
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160*zm);
    grad.addColorStop(0, 'rgba(168,85,247,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);
    // Membrana
    ctx.beginPath();
    ctx.arc(cx, cy, 130*zm, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(168,85,247,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();
    const mGrad = ctx.createRadialGradient(cx-20, cy-20, 0, cx, cy, 135*zm);
    mGrad.addColorStop(0, 'rgba(168,85,247,0.07)');
    mGrad.addColorStop(1, 'rgba(168,85,247,0.02)');
    ctx.fillStyle = mGrad;
    ctx.fill();
    // Núcleo
    ctx.beginPath();
    ctx.arc(cx + Math.sin(ry)*10, cy + Math.cos(rx)*10, 48*zm, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(168,85,247,0.9)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(168,85,247,0.12)';
    ctx.fill();
    // Orgánulos flotando
    const orgs = [{r:12,ox:55,oy:-30,col:'rgba(239,68,68,0.75)',label:'Mit'},{r:8,ox:-60,oy:20,col:'rgba(6,182,212,0.75)',label:'RE'},{r:7,ox:40,oy:55,col:'rgba(245,158,11,0.75)',label:'Gol'},{r:6,ox:-40,oy:-55,col:'rgba(16,185,129,0.75)',label:'Lis'}];
    orgs.forEach(o => {
      const ang = t*0.001*o.r*0.08;
      const ox = o.ox*Math.cos(ang) - o.oy*Math.sin(ang);
      const oy = o.ox*Math.sin(ang) + o.oy*Math.cos(ang);
      ctx.beginPath();
      ctx.ellipse(cx+ox*zm, cy+oy*zm, o.r*zm, o.r*0.6*zm, ang, 0, Math.PI*2);
      ctx.fillStyle = o.col;
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = `${7*zm}px JetBrains Mono,monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(o.label, cx+ox*zm, cy+oy*zm+3*zm);
    });
    // Partículas ribosomales
    for(let i=0;i<18;i++){
      const ang = (i/18)*Math.PI*2 + t*0.0003;
      const r = (70+Math.sin(ang*3+t*0.001)*15)*zm;
      const px = cx + r*Math.cos(ang), py = cy + r*Math.sin(ang)*0.65;
      ctx.beginPath(); ctx.arc(px,py,2*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.6)'; ctx.fill();
    }
    // Label
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA', cx, cy-135*zm);
  },

  /* ─── Procariota ─── */
  prokaryote(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Cuerpo bacilar
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(ry*0.3);
    ctx.beginPath();
    const bw=160*zm, bh=80*zm;
    ctx.ellipse(0,0,bw,bh,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=3; ctx.stroke();
    const bg = ctx.createRadialGradient(0,-20,0,0,0,bw);
    bg.addColorStop(0,'rgba(6,182,212,0.12)'); bg.addColorStop(1,'rgba(6,182,212,0.02)');
    ctx.fillStyle=bg; ctx.fill();
    // Pared celular
    ctx.beginPath();
    ctx.ellipse(0,0,bw+8,bh+8,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=4; ctx.stroke();
    // Nucleoide (ADN circular)
    ctx.beginPath();
    for(let i=0;i<=60;i++){
      const a=(i/60)*Math.PI*2;
      const r=32*zm+Math.sin(a*8+t*0.002)*5*zm;
      const x=r*Math.cos(a), y=r*Math.sin(a)*0.5;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(245,158,11,0.85)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.07)'; ctx.fill();
    // Ribosomas 70S
    for(let i=0;i<14;i++){
      const a=(i/14)*Math.PI*2;
      const r=60*zm, px=r*Math.cos(a), py=r*Math.sin(a)*0.5;
      ctx.beginPath(); ctx.arc(px,py,3.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fill();
    }
    // Flagelo
    ctx.beginPath();
    ctx.moveTo(bw, 0);
    for(let i=0;i<=50;i++){
      const x=bw+i*2*zm, y=Math.sin(i*0.4+t*0.004)*20*zm;
      ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.restore();
    // Labels
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA PROCARIOTA', cx, cy-120*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${9*zm}px JetBrains Mono,monospace`;
    ctx.fillText('● Nucleoide', cx-60*zm, cy+110*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)';
    ctx.fillText('● Ribosomas 70S', cx+50*zm, cy+110*zm);
  },

  /* ─── Eucariota ─── */
  eukaryote(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,160*zm);
    bg.addColorStop(0,'rgba(168,85,247,0.06)'); bg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
    // Membrana
    ctx.beginPath(); ctx.arc(cx,cy,140*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.6)'; ctx.lineWidth=3; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.04)'; ctx.fill();
    // RE rugoso (espiral)
    ctx.save(); ctx.translate(cx+40*zm, cy-10*zm);
    ctx.beginPath();
    for(let i=0;i<80;i++){
      const a=i*0.25, r=12+i*0.45;
      const x=r*Math.cos(a+ry), y=r*Math.sin(a+ry)*0.5;
      i===0?ctx.moveTo(x*zm,y*zm):ctx.lineTo(x*zm,y*zm);
    }
    ctx.strokeStyle='rgba(6,182,212,0.55)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.restore();
    // Mitocondria
    ctx.save(); ctx.translate(cx-70*zm, cy+30*zm); ctx.rotate(0.6+ry*0.2);
    ctx.beginPath(); ctx.ellipse(0,0,28*zm,14*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(239,68,68,0.75)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.1)'; ctx.fill();
    // crestas internas
    for(let i=-2;i<=2;i++){
      ctx.beginPath(); ctx.moveTo(i*7*zm,-12*zm); ctx.lineTo(i*7*zm,12*zm);
      ctx.strokeStyle='rgba(239,68,68,0.35)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.restore();
    // Núcleo
    ctx.beginPath(); ctx.arc(cx+Math.sin(ry)*15, cy+Math.cos(rx)*10, 52*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.95)'; ctx.lineWidth=3; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.13)'; ctx.fill();
    // Envoltura nuclear (doble)
    ctx.beginPath(); ctx.arc(cx+Math.sin(ry)*15, cy+Math.cos(rx)*10, 56*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.35)'; ctx.lineWidth=1.5; ctx.stroke();
    // Poros nucleares
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2, r=56*zm;
      ctx.beginPath(); ctx.arc(cx+Math.sin(ry)*15+r*Math.cos(a), cy+Math.cos(rx)*10+r*Math.sin(a), 3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.8)'; ctx.fill();
    }
    // Golgi
    ctx.save(); ctx.translate(cx+60*zm, cy+50*zm);
    for(let i=0;i<4;i++){
      ctx.beginPath(); ctx.ellipse(0,i*8*zm-16*zm,30*zm,4*zm,ry*0.3,0,Math.PI*2);
      ctx.strokeStyle=`rgba(168,85,247,${0.3+i*0.15})`; ctx.lineWidth=1.5; ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA EUCARIOTA', cx, cy-150*zm);
  },

  /* ─── Célula Animal ─── */
  animalCell(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Forma irregular (poligonal suavizada)
    ctx.save(); ctx.translate(cx,cy);
    ctx.beginPath();
    const pts=[];
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2;
      const r=(120+Math.sin(i*2.3+t*0.001)*18)*zm;
      pts.push([r*Math.cos(a), r*Math.sin(a)]);
    }
    ctx.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.closePath();
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.05)'; ctx.fill();
    // Núcleo central
    ctx.beginPath(); ctx.arc(Math.sin(ry)*8,Math.cos(rx)*8,50*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.12)'; ctx.fill();
    // Centrosoma (par de centriolos)
    ctx.save(); ctx.translate(70*zm,-50*zm);
    for(let c=0;c<2;c++){
      ctx.beginPath(); ctx.arc(c*12*zm,0,5*zm,0,Math.PI*2);
      ctx.strokeStyle='rgba(22,211,238,0.85)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    ctx.restore();
    // Lisosomas
    const lyso=[{x:-70,y:-40},{x:-80,y:30},{x:55,y:60},{x:80,y:-20}];
    lyso.forEach(l=>{
      ctx.beginPath(); ctx.arc(l.x*zm,l.y*zm,8*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(239,68,68,0.65)'; ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    });
    // Mitocondrias
    const mitos=[{x:80,y:30},{x:-55,y:65}];
    mitos.forEach((m,i)=>{
      ctx.save(); ctx.translate(m.x*zm,m.y*zm); ctx.rotate(i*0.8+ry*0.2);
      ctx.beginPath(); ctx.ellipse(0,0,22*zm,10*zm,0,0,Math.PI*2);
      ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle='rgba(239,68,68,0.1)'; ctx.fill();
      ctx.restore();
    });
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA ANIMAL', cx, cy-145*zm);
  },

  /* ─── Célula Vegetal ─── */
  plantCell(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    const W=135*zm, H=110*zm;
    // Pared celular
    ctx.beginPath(); ctx.roundRect(-W-8,-H-8,W*2+16,H*2+16,6*zm);
    ctx.strokeStyle='rgba(16,185,129,0.7)'; ctx.lineWidth=5; ctx.stroke();
    // Membrana
    ctx.beginPath(); ctx.roundRect(-W,-H,W*2,H*2,4*zm);
    ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.04)'; ctx.fill();
    // Vacuola central
    ctx.beginPath(); ctx.ellipse(0,10*zm,80*zm,70*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(6,182,212,0.1)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(6,182,212,0.4)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Vacuola', 0, 12*zm);
    // Cloroplastos
    const chloro=[{x:-95,y:-40},{x:95,y:-50},{x:-100,y:40},{x:95,y:55},{x:0,y:-90}];
    chloro.forEach(c=>{
      ctx.save(); ctx.translate(c.x*zm,c.y*zm); ctx.rotate(c.x*0.02+ry*0.15);
      ctx.beginPath(); ctx.ellipse(0,0,18*zm,10*zm,0,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.7)'; ctx.fill();
      ctx.strokeStyle='rgba(16,185,129,0.95)'; ctx.lineWidth=1.5; ctx.stroke();
      // grana interno
      for(let g=-1;g<=1;g++){
        ctx.beginPath(); ctx.ellipse(g*6*zm,0,3*zm,7*zm,0,0,Math.PI*2);
        ctx.fillStyle='rgba(0,100,50,0.5)'; ctx.fill();
      }
      ctx.restore();
    });
    // Núcleo
    ctx.beginPath(); ctx.arc(-70*zm,-60*zm,30*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.1)'; ctx.fill();
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CÉLULA VEGETAL', cx, cy-130*zm);
  },

  /* ─── Membrana plasmática ─── */
  membrane(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Bicapa
    const nLip=20, lipW=190*zm;
    for(let layer=0;layer<2;layer++){
      const yOff=(layer===0?-20:20)*zm;
      for(let i=0;i<nLip;i++){
        const x=(-nLip/2+i)*(lipW/nLip);
        const wave=Math.sin(i*0.5+t*0.002+ry)*4*zm;
        // Cabeza
        ctx.beginPath(); ctx.arc(x, yOff+wave, 7*zm, 0, Math.PI*2);
        ctx.fillStyle=layer===0?'rgba(168,85,247,0.8)':'rgba(6,182,212,0.8)'; ctx.fill();
        // Cola
        ctx.beginPath(); ctx.moveTo(x,yOff+wave+(layer===0?7:-7)*zm);
        const tailLen=32*zm;
        ctx.lineTo(x+(Math.random()-0.5)*3*zm, yOff+wave+(layer===0?tailLen:-tailLen)*zm);
        ctx.strokeStyle=layer===0?'rgba(168,85,247,0.45)':'rgba(6,182,212,0.45)'; ctx.lineWidth=3*zm; ctx.stroke();
      }
    }
    // Proteína integral (alfa-hélice)
    ctx.save(); ctx.translate(0,0);
    ctx.beginPath();
    for(let i=0;i<40;i++){
      const y=-50*zm+i*2.5*zm, x=Math.sin(i*0.7+t*0.002)*8*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=5*zm; ctx.stroke();
    ctx.restore();
    ctx.restore();
    ctx.fillStyle='rgba(22,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MEMBRANA PLASMÁTICA', cx, cy-115*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.fillText('● Hoja externa', cx-70*zm, cy+90*zm);
    ctx.fillStyle='rgba(6,182,212,0.7)'; ctx.fillText('● Hoja interna', cx+50*zm, cy+90*zm);
  },

  /* ─── Bicapa lipídica ─── */
  bilayer(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    const nLip=22;
    const startX=cx-110*zm;
    for(let layer=0;layer<2;layer++){
      const yBase=(layer===0?cy-18:cy+18)*zm/zm;
      const dir=layer===0?1:-1;
      for(let i=0;i<nLip;i++){
        const x=startX+i*(220*zm/nLip);
        const wave=Math.sin(i*0.8+t*0.0015)*5*zm;
        // Cabeza polar
        ctx.beginPath(); ctx.arc(x, yBase+wave, 9*zm, 0, Math.PI*2);
        const hg=ctx.createRadialGradient(x,yBase+wave,0,x,yBase+wave,9*zm);
        hg.addColorStop(0,layer===0?'rgba(168,85,247,1)':'rgba(6,182,212,1)');
        hg.addColorStop(1,layer===0?'rgba(168,85,247,0.4)':'rgba(6,182,212,0.4)');
        ctx.fillStyle=hg; ctx.fill();
        // Cola 1
        const t1x=x-3*zm, t1end=yBase+wave+dir*38*zm;
        ctx.beginPath(); ctx.moveTo(t1x, yBase+wave+dir*9*zm);
        ctx.bezierCurveTo(t1x-2*zm, yBase+wave+dir*20*zm, t1x+1*zm, yBase+wave+dir*30*zm, t1x, t1end);
        ctx.strokeStyle='rgba(200,170,230,0.6)'; ctx.lineWidth=3*zm; ctx.stroke();
        // Cola 2
        const t2x=x+3*zm, t2end=yBase+wave+dir*35*zm;
        ctx.beginPath(); ctx.moveTo(t2x, yBase+wave+dir*9*zm);
        ctx.bezierCurveTo(t2x+2*zm, yBase+wave+dir*18*zm, t2x-1*zm, yBase+wave+dir*28*zm, t2x+1*zm, t2end);
        ctx.strokeStyle='rgba(160,130,200,0.5)'; ctx.lineWidth=3*zm; ctx.stroke();
      }
    }
    // Zona hidrofóbica
    const zg=ctx.createLinearGradient(0, cy-10*zm, 0, cy+10*zm);
    zg.addColorStop(0,'rgba(0,0,0,0)'); zg.addColorStop(0.5,'rgba(168,85,247,0.04)'); zg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=zg; ctx.fillRect(cx-115*zm, cy-55*zm, 230*zm, 110*zm);
    // Colesterol
    ctx.beginPath();
    ctx.moveTo(cx,cy-50*zm); ctx.lineTo(cx,cy+50*zm);
    ctx.moveTo(cx-8*zm,cy-35*zm); ctx.lineTo(cx+8*zm,cy-35*zm);
    ctx.moveTo(cx-8*zm,cy-15*zm); ctx.lineTo(cx+8*zm,cy-15*zm);
    ctx.moveTo(cx-8*zm,cy+15*zm); ctx.lineTo(cx+8*zm,cy+15*zm);
    ctx.moveTo(cx-8*zm,cy+35*zm); ctx.lineTo(cx+8*zm,cy+35*zm);
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2*zm; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('BICAPA LIPÍDICA', cx, cy-95*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.fillText('⬤ Colesterol', cx+80*zm, cy+5*zm);
  },

  /* ─── Núcleo ─── */
  nucleus(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Envoltura nuclear doble
    ctx.beginPath(); ctx.arc(0,0,105*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.3)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(0,0,98*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.85)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.08)'; ctx.fill();
    // Lámina nuclear
    ctx.beginPath(); ctx.arc(0,0,90*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.25)'; ctx.lineWidth=5*zm; ctx.stroke();
    // Cromatina (hilo de ADN)
    ctx.beginPath();
    for(let i=0;i<=200;i++){
      const a=i*0.18+t*0.0005, r=(55+Math.sin(i*0.4)*28)*zm;
      const x=r*Math.cos(a+ry), y=r*Math.sin(a+rx)*0.7;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(16,185,129,0.6)'; ctx.lineWidth=1.5; ctx.stroke();
    // Nucleolo
    ctx.beginPath(); ctx.arc(-15*zm,-10*zm,25*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(239,68,68,0.2)'; ctx.fill();
    ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.8)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Nucleolo', -15*zm, -8*zm);
    // Poros nucleares
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2+t*0.0003, r=102*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a);
      ctx.beginPath(); ctx.arc(px,py,4.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.fill();
      ctx.strokeStyle='rgba(245,158,11,0.4)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('NÚCLEO', cx, cy-118*zm);
  },

  /* ─── Nucleolo ─── */
  nucleolus(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Núcleo de fondo
    ctx.beginPath(); ctx.arc(0,0,110*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.3)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.04)'; ctx.fill();
    // Nucleolo (3 capas)
    // CG - componente granular (exterior)
    ctx.beginPath(); ctx.arc(0,0,68*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(6,182,212,0.1)'; ctx.fill();
    ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=2; ctx.stroke();
    // CFD - componente fibrilar denso
    ctx.beginPath(); ctx.arc(-8*zm,5*zm,42*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(168,85,247,0.15)'; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    // CF - centro fibrilar
    ctx.beginPath(); ctx.arc(-12*zm,8*zm,18*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(245,158,11,0.25)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=2; ctx.stroke();
    // ARNr transcribiéndose
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2+t*0.0008;
      const r=22*zm, lx=-12*zm+r*Math.cos(a), ly=8*zm+r*Math.sin(a);
      ctx.beginPath(); ctx.moveTo(-12*zm,8*zm); ctx.lineTo(lx,ly);
      ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.arc(lx,ly,2.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.75)'; ctx.fill();
    }
    // Labels dentro
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('CF', -12*zm, 10*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)';
    ctx.fillText('CFD', 20*zm, -20*zm);
    ctx.fillStyle='rgba(6,182,212,0.7)';
    ctx.fillText('CG', 55*zm, 0);
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('NUCLEOLO', cx, cy-125*zm);
  },

  /* ─── Citoplasma ─── */
  cytoplasm(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    // Partículas en movimiento browniano
    const seed=Date.now()*0; // Usamos t para animación
    ctx.save(); ctx.translate(cx,cy);
    // Membrana
    ctx.beginPath(); ctx.arc(0,0,130*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.55)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.03)'; ctx.fill();
    // Partículas de metabolitos
    const nPart=40;
    for(let i=0;i<nPart;i++){
      const a=(i/nPart)*Math.PI*2, spd=0.0003+i%5*0.0001;
      const r=(20+i*2.8)*zm;
      const px=r*Math.cos(a+t*spd*(i%2?1:-1)+i), py=r*Math.sin(a+t*spd*(i%2?1:-1)+i)*0.7;
      if(px*px+py*py>=(125*zm)*(125*zm)) continue;
      ctx.beginPath(); ctx.arc(px,py,1.5+i%3,0,Math.PI*2);
      const cols=['rgba(16,185,129,0.5)','rgba(6,182,212,0.4)','rgba(168,85,247,0.4)','rgba(245,158,11,0.5)'];
      ctx.fillStyle=cols[i%4]; ctx.fill();
    }
    // Ribosomas libres
    for(let i=0;i<18;i++){
      const a=(i/18)*Math.PI*2+t*0.0002, r=(85+Math.sin(a*3)*20)*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a)*0.6;
      ctx.beginPath(); ctx.arc(px,py,3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.65)'; ctx.fill();
    }
    // Núcleo central
    ctx.beginPath(); ctx.arc(0,0,42*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(168,85,247,0.8)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(168,85,247,0.1)'; ctx.fill();
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CITOPLASMA', cx, cy-148*zm);
  },

  /* ─── Ribosoma ─── */
  ribosome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Subunidad grande 60S
    const r1=65*zm;
    ctx.beginPath();
    ctx.arc(0,-15*zm,r1,0,Math.PI*2);
    const g1=ctx.createRadialGradient(0,-15*zm,0,0,-15*zm,r1);
    g1.addColorStop(0,'rgba(168,85,247,0.25)'); g1.addColorStop(1,'rgba(168,85,247,0.04)');
    ctx.fillStyle=g1; ctx.fill();
    ctx.strokeStyle='rgba(168,85,247,0.8)'; ctx.lineWidth=2.5; ctx.stroke();
    // Subunidad pequeña 40S
    const r2=45*zm;
    ctx.beginPath();
    ctx.arc(Math.sin(ry)*10,50*zm,r2,0,Math.PI*2);
    const g2=ctx.createRadialGradient(0,50*zm,0,0,50*zm,r2);
    g2.addColorStop(0,'rgba(245,158,11,0.25)'); g2.addColorStop(1,'rgba(245,158,11,0.04)');
    ctx.fillStyle=g2; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=2; ctx.stroke();
    // ARNm atravesando
    ctx.beginPath();
    for(let i=0;i<80;i++){
      const x=-120*zm+i*3*zm, y=25*zm+Math.sin(i*0.4+t*0.002)*5*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(16,185,129,0.75)'; ctx.lineWidth=2.5; ctx.stroke();
    // Cadena polipeptídica emergente
    ctx.beginPath();
    for(let i=0;i<25;i++){
      const x=i*4*zm, y=-80*zm-i*3*zm+Math.sin(i*0.6+t*0.002)*6*zm;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(239,68,68,0.75)'; ctx.lineWidth=2.5; ctx.stroke();
    // Sitios A, P, E
    const sites=[{x:-15,y:18,l:'P',c:'rgba(239,68,68,0.9)'},{x:15,y:18,l:'A',c:'rgba(16,185,129,0.9)'},{x:-45,y:18,l:'E',c:'rgba(6,182,212,0.9)'}];
    sites.forEach(s=>{
      ctx.fillStyle=s.c; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(s.l, s.x*zm, s.y*zm);
    });
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('RIBOSOMA 80S', cx, cy-105*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● 60S', cx-60*zm, cy+105*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)';
    ctx.fillText('● 40S', cx+40*zm, cy+105*zm);
  },

  /* ─── Mitocondria ─── */
  mitochondria(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.25);
    // Membrana externa
    ctx.beginPath(); ctx.ellipse(0,0,145*zm,78*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(239,68,68,0.5)'; ctx.lineWidth=2; ctx.stroke();
    // Membrana interna
    ctx.beginPath(); ctx.ellipse(0,0,130*zm,65*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(239,68,68,0.85)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.06)'; ctx.fill();
    // Crestas mitocondriales
    const nCrestas=7;
    for(let i=0;i<nCrestas;i++){
      const x=(-3+i)*38*zm;
      ctx.beginPath();
      ctx.moveTo(x,-65*zm);
      ctx.bezierCurveTo(x-15*zm,-30*zm,x+15*zm,-30*zm,x,0);
      ctx.bezierCurveTo(x-15*zm,30*zm,x+15*zm,30*zm,x,65*zm);
      ctx.strokeStyle='rgba(239,68,68,0.45)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // ATP sintasa en membrana interna
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      const px=130*zm*Math.cos(a), py=65*zm*Math.sin(a);
      ctx.beginPath(); ctx.arc(px,py,5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.fill();
    }
    // ADNmt circular
    ctx.beginPath();
    for(let i=0;i<=50;i++){
      const a=(i/50)*Math.PI*2;
      const r=(28+Math.sin(a*4+t*0.002)*5)*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a)*0.6;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    // Partículas de ATP
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2+t*0.0008, r=100*zm;
      const px=r*Math.cos(a), py=r*Math.sin(a)*0.5;
      ctx.beginPath(); ctx.arc(px,py,3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.6)'; ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MITOCONDRIA', cx, cy-95*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('⬤ ATP sintasa  ⬤ ADNmt', cx, cy+100*zm);
  },

  /* ─── Cloroplasto ─── */
  chloroplast(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.2);
    // Doble membrana
    ctx.beginPath(); ctx.ellipse(0,0,148*zm,88*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.45)'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0,0,136*zm,78*zm,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.fillStyle='rgba(16,185,129,0.05)'; ctx.fill();
    // Grana (pilas de tilacoides)
    const grana=[{x:-65,y:0},{x:0,y:15},{x:65,y:0},{x:-30,y:-25},{x:30,y:-25}];
    grana.forEach(g=>{
      const nTil=5+Math.floor(Math.random()*2);
      for(let i=0;i<nTil;i++){
        ctx.beginPath();
        ctx.ellipse(g.x*zm, (g.y+(i-nTil/2)*12)*zm, 22*zm, 6*zm, 0, 0, Math.PI*2);
        ctx.fillStyle=`rgba(0,${120+i*15},60,0.7)`; ctx.fill();
        ctx.strokeStyle='rgba(0,180,80,0.5)'; ctx.lineWidth=0.5; ctx.stroke();
      }
    });
    // Estroma (zona alrededor)
    ctx.fillStyle='rgba(16,185,129,0.15)';
    ctx.beginPath(); ctx.ellipse(-80*zm,35*zm,25*zm,18*zm,0.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(80*zm,-30*zm,20*zm,15*zm,-0.3,0,Math.PI*2); ctx.fill();
    // RuBisCO
    ctx.beginPath(); ctx.arc(10*zm,40*zm,12*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(245,158,11,0.35)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.85)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('RuBisCO', 10*zm, 43*zm);
    // Plastoma ADN
    ctx.beginPath();
    for(let i=0;i<=40;i++){
      const a=(i/40)*Math.PI*2, r=18*zm;
      const px=-80*zm+r*Math.cos(a+t*0.001), py=-30*zm+r*Math.sin(a+t*0.001)*0.6;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath(); ctx.strokeStyle='rgba(6,182,212,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CLOROPLASTO', cx, cy-102*zm);
  },

  /* ─── Lisosoma ─── */
  lysosome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Membrana lisosomal
    const wave=Math.sin(t*0.002)*5*zm;
    ctx.beginPath();
    for(let i=0;i<=60;i++){
      const a=(i/60)*Math.PI*2;
      const r=(90+Math.sin(a*5+t*0.001)*6)*zm;
      const x=r*Math.cos(a), y=r*Math.sin(a);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=3; ctx.stroke();
    const lg=ctx.createRadialGradient(0,0,0,0,0,90*zm);
    lg.addColorStop(0,'rgba(239,68,68,0.2)'); lg.addColorStop(0.6,'rgba(239,68,68,0.12)'); lg.addColorStop(1,'rgba(239,68,68,0.04)');
    ctx.fillStyle=lg; ctx.fill();
    // Enzimas hidrolíticas (representadas como manchas)
    const enzymes=[{x:0,y:-40,r:15,label:'Cat'},{x:-35,y:15,r:12,label:'HSD'},{x:35,y:20,r:12,label:'Lip'},{x:15,y:-15,r:10,label:'DNs'},{x:-20,y:-5,r:8,label:'Sulf'}];
    enzymes.forEach(e=>{
      const ea=t*0.0005*e.r*0.06;
      ctx.beginPath(); ctx.ellipse(e.x*zm,e.y*zm,e.r*zm,e.r*0.75*zm,ea,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.35)'; ctx.fill();
      ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,0.65)'; ctx.font=`${6*zm}px JetBrains Mono`; ctx.textAlign='center';
      ctx.fillText(e.label, e.x*zm, e.y*zm+2*zm);
    });
    // pH label
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${14*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('pH 4.8', 0, 55*zm);
    // V-ATPasa en membrana
    for(let i=0;i<7;i++){
      const a=(i/7)*Math.PI*2;
      const r=92*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a), r*Math.sin(a), 4*zm, 0, Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.8)'; ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('LISOSOMA', cx, cy-108*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● V-ATPasa', cx+60*zm, cy+100*zm);
  },

  /* ─── Peroxisoma ─── */
  peroxisome(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Membrana peroxisomal
    ctx.beginPath(); ctx.arc(0,0,95*zm,0,Math.PI*2);
    ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=3; ctx.stroke();
    const pg=ctx.createRadialGradient(0,0,0,0,0,95*zm);
    pg.addColorStop(0,'rgba(245,158,11,0.15)'); pg.addColorStop(1,'rgba(245,158,11,0.03)');
    ctx.fillStyle=pg; ctx.fill();
    // Nucleoide cristalino (catalasa)
    ctx.beginPath(); ctx.roundRect(-30*zm,-30*zm,60*zm,60*zm,8*zm);
    ctx.fillStyle='rgba(245,158,11,0.2)'; ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,0.9)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${9*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Catalasa', 0, 3*zm);
    // H₂O₂ burbujas
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2+t*0.001, r=(55+Math.sin(t*0.003+i)*20)*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a),r*Math.sin(a),4*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(6,182,212,0.5)'; ctx.fill();
    }
    // H2O producida
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2+t*0.0008;
      const r=(75+Math.cos(t*0.002+i)*10)*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a),r*Math.sin(a),3*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.6)'; ctx.fill();
    }
    // Porinas
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      ctx.beginPath(); ctx.arc(95*zm*Math.cos(a),95*zm*Math.sin(a),4.5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fill();
    }
    // Legend
    ctx.fillStyle='rgba(6,182,212,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● H₂O₂', -60*zm, 80*zm);
    ctx.fillStyle='rgba(16,185,129,0.7)';
    ctx.fillText('● H₂O', 40*zm, 80*zm);
    ctx.restore();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('PEROXISOMA', cx, cy-110*zm);
  },

  /* ─── Retículo endoplasmático ─── */
  reticulum(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // RE rugoso (cisternas con ribosomas)
    for(let l=0;l<4;l++){
      const yBase=(-45+l*30)*zm;
      ctx.beginPath();
      ctx.bezierCurveTo(-110*zm,yBase-8*zm,-60*zm,yBase+8*zm,0,yBase);
      ctx.bezierCurveTo(60*zm,yBase-8*zm,110*zm,yBase+8*zm,120*zm,yBase);
      ctx.moveTo(-120*zm,yBase);
      for(let x=-110;x<=110;x+=5){
        ctx.lineTo(x*zm,yBase+Math.sin((x+t*0.05)*0.12)*4*zm);
      }
      ctx.strokeStyle='rgba(6,182,212,0.6)'; ctx.lineWidth=3; ctx.stroke();
      // Ribosomas pegados
      for(let r=-100;r<=100;r+=12){
        ctx.beginPath(); ctx.arc(r*zm,yBase-5*zm,3*zm,0,Math.PI*2);
        ctx.fillStyle='rgba(245,158,11,0.75)'; ctx.fill();
      }
    }
    // RE liso (túbulos curvados)
    ctx.save(); ctx.translate(-40*zm,60*zm);
    for(let t2=0;t2<3;t2++){
      ctx.beginPath();
      ctx.moveTo(-60*zm,t2*15*zm);
      ctx.bezierCurveTo(-20*zm,t2*15*zm-20*zm,30*zm,t2*15*zm+20*zm,70*zm,t2*15*zm);
      ctx.strokeStyle='rgba(168,85,247,0.5)'; ctx.lineWidth=4; ctx.stroke();
    }
    ctx.restore();
    // Luz del RE (brillo interior)
    ctx.fillStyle='rgba(6,182,212,0.06)';
    ctx.fillRect(-115*zm,-60*zm,230*zm,110*zm);
    ctx.restore();
    ctx.fillStyle='rgba(6,182,212,0.9)'; ctx.font=`bold ${10*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('RETÍCULO ENDOPLASMÁTICO', cx, cy-100*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('● RE rugoso  ● Ribosomas', cx, cy+110*zm);
  },

  /* ─── Aparato de Golgi ─── */
  golgi(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ry*0.15);
    const nCist=6;
    const colors=['rgba(168,85,247,0.75)','rgba(168,85,247,0.65)','rgba(168,85,247,0.55)','rgba(168,85,247,0.45)','rgba(168,85,247,0.35)','rgba(168,85,247,0.25)'];
    const widths=[140,130,120,110,100,90];
    for(let i=0;i<nCist;i++){
      const yC=(-2.5+i)*26*zm;
      const w2=widths[i]*zm;
      const wave=Math.sin(i*0.8+t*0.001)*4*zm;
      ctx.beginPath();
      ctx.moveTo(-w2, yC+wave);
      ctx.bezierCurveTo(-w2+15*zm, yC-8*zm+wave, w2-15*zm, yC+8*zm+wave, w2, yC+wave);
      ctx.bezierCurveTo(w2, yC+14*zm+wave, -w2, yC+14*zm+wave, -w2, yC+wave);
      ctx.fillStyle=colors[i]; ctx.fill();
      ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // Vesículas COP-II (lado cis, desde RE)
    for(let v=0;v<3;v++){
      const vx=-160*zm+v*8*zm, vy=-70*zm+v*20*zm;
      ctx.beginPath(); ctx.arc(vx,vy,9*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(6,182,212,0.4)'; ctx.fill();
      ctx.strokeStyle='rgba(6,182,212,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // Vesículas trans (hacia lisosoma/membrana)
    for(let v=0;v<4;v++){
      const a=((v+4)/10)*Math.PI*2, r=(120+v*10)*zm;
      ctx.beginPath(); ctx.arc(r*Math.cos(a),80*zm+v*15*zm,8*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,0.4)'; ctx.fill();
      ctx.strokeStyle='rgba(16,185,129,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    // Labels cis/trans
    ctx.fillStyle='rgba(6,182,212,0.8)'; ctx.font=`${9*zm}px JetBrains Mono`; ctx.textAlign='left';
    ctx.fillText('cis ←', -170*zm, -60*zm);
    ctx.fillStyle='rgba(16,185,129,0.8)'; ctx.textAlign='left';
    ctx.fillText('→ trans', 100*zm, 80*zm);
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('APARATO DE GOLGI', cx, cy-105*zm);
  },

  /* ─── Citoesqueleto ─── */
  cytoskeleton(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Microtúbulos (azul/violeta)
    for(let i=0;i<5;i++){
      const a=(i/5)*Math.PI+ry;
      ctx.beginPath();
      ctx.moveTo(-130*zm*Math.cos(a),-130*zm*Math.sin(a));
      const mid=(Math.sin(t*0.001+i)*20)*zm;
      ctx.bezierCurveTo(-50*zm*Math.cos(a)+mid,-50*zm*Math.sin(a),50*zm*Math.cos(a)-mid,50*zm*Math.sin(a),130*zm*Math.cos(a),130*zm*Math.sin(a));
      ctx.strokeStyle='rgba(168,85,247,0.65)'; ctx.lineWidth=4.5; ctx.stroke();
    }
    // Microfilamentos (verde)
    for(let i=0;i<7;i++){
      const a=(i/7)*Math.PI*2+rx+0.5;
      ctx.beginPath();
      ctx.moveTo(-100*zm*Math.cos(a),-100*zm*Math.sin(a));
      for(let s=0;s<=20;s++){
        const frac=s/20, r=100*zm;
        const x=r*Math.cos(a)*(frac*2-1);
        const y=r*Math.sin(a)*(frac*2-1)+Math.sin(s*0.8+t*0.002)*8*zm;
        s===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(16,185,129,0.5)'; ctx.lineWidth=2; ctx.stroke();
    }
    // Filamentos intermedios (dorado)
    for(let i=0;i<4;i++){
      const a=(i/4)*Math.PI*2+0.3;
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.lineTo(90*zm*Math.cos(a),90*zm*Math.sin(a));
      ctx.strokeStyle='rgba(245,158,11,0.5)'; ctx.lineWidth=2.5; ctx.stroke();
    }
    // Centrosoma
    ctx.beginPath(); ctx.arc(0,0,15*zm,0,Math.PI*2);
    ctx.fillStyle='rgba(22,211,238,0.3)'; ctx.fill();
    ctx.strokeStyle='rgba(22,211,238,0.9)'; ctx.lineWidth=2; ctx.stroke();
    ctx.restore();
    ctx.fillStyle='rgba(22,211,238,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('CITOESQUELETO', cx, cy-148*zm);
    ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('■ Microtúbulos', cx-90*zm, cy+130*zm);
    ctx.fillStyle='rgba(16,185,129,0.7)';
    ctx.fillText('■ Microfilamentos', cx+20*zm, cy+130*zm);
  },

  /* ─── Microtúbulo ─── */
  microtubule(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // Tubo hueco (13 protofilamentos)
    const nProto=13, tubLen=200*zm, tubR=18*zm;
    // Vista lateral del microtúbulo
    ctx.beginPath(); ctx.rect(-tubLen/2,-tubR,tubLen,tubR*2);
    ctx.strokeStyle='rgba(168,85,247,0.3)'; ctx.lineWidth=0.5; ctx.stroke();
    // Protofilamentos
    for(let p=0;p<nProto;p++){
      const yOff=(-6+p)*3*zm-6*zm;
      if(Math.abs(yOff)>tubR*1.1) continue;
      const alpha=1-Math.abs(yOff)/(tubR*1.2);
      for(let d=0;d<=50;d++){
        const x=-tubLen/2+d*(tubLen/50);
        const col=d%2===0?`rgba(168,85,247,${0.7*alpha})`:`rgba(245,158,11,${0.55*alpha})`;
        ctx.beginPath(); ctx.arc(x,yOff,5*zm*alpha,0,Math.PI*2);
        ctx.fillStyle=col; ctx.fill();
      }
    }
    // Motor molecular (kinesina) caminando
    const kx=-tubLen/2+((t*0.04)%(tubLen/zm))*zm;
    ctx.save(); ctx.translate(kx,-tubR-15*zm);
    ctx.beginPath(); ctx.rect(-10*zm,-14*zm,20*zm,14*zm);
    ctx.fillStyle='rgba(239,68,68,0.6)'; ctx.fill();
    ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    // pies de kinesina
    const legPhase=Math.sin(t*0.05)*8*zm;
    ctx.beginPath(); ctx.moveTo(-5*zm,0); ctx.lineTo(-5*zm-legPhase,tubR+15*zm);
    ctx.moveTo(5*zm,0); ctx.lineTo(5*zm+legPhase,tubR+15*zm);
    ctx.strokeStyle='rgba(239,68,68,0.7)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('KIN', 0, -8*zm);
    ctx.restore();
    // Extremo + y −
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${13*zm}px JetBrains Mono`;
    ctx.textAlign='center'; ctx.fillText('+', tubLen/2+15*zm, 4*zm);
    ctx.fillStyle='rgba(239,68,68,0.9)';
    ctx.fillText('−', -tubLen/2-15*zm, 4*zm);
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MICROTÚBULO', cx, cy-55*zm);
    ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.font=`${8*zm}px JetBrains Mono`;
    ctx.fillText('α-tubulina  β-tubulina', cx, cy+45*zm);
  },

  /* ─── Microfilamento ─── */
  microfilament(ctx, w, h, t, rx, ry, zm) {
    const cx=w/2, cy=h/2;
    ctx.clearRect(0,0,w,h);
    ctx.save(); ctx.translate(cx,cy);
    // F-actina: doble hélice de actina-G
    const nMono=28, filLen=220*zm, pitch=60*zm;
    for(let strand=0;strand<2;strand++){
      ctx.beginPath();
      for(let m=0;m<=nMono;m++){
        const x=-filLen/2+m*(filLen/nMono);
        const phaseOffset=strand*Math.PI;
        const y=Math.sin((m/nMono)*Math.PI*6+phaseOffset+ry)*12*zm;
        m===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle=`rgba(16,185,129,${0.5+strand*0.2})`; ctx.lineWidth=1; ctx.stroke();
      // Monómeros
      for(let m=0;m<nMono;m++){
        const x=-filLen/2+m*(filLen/nMono)+(filLen/nMono/2);
        const y=Math.sin((m/nMono)*Math.PI*6+strand*Math.PI+ry)*12*zm;
        ctx.beginPath(); ctx.arc(x,y,6*zm,0,Math.PI*2);
        const mg=ctx.createRadialGradient(x,y,0,x,y,6*zm);
        mg.addColorStop(0,'rgba(16,185,129,0.9)'); mg.addColorStop(1,'rgba(0,100,50,0.4)');
        ctx.fillStyle=mg; ctx.fill();
        ctx.strokeStyle='rgba(16,185,129,0.9)'; ctx.lineWidth=1; ctx.stroke();
        // ADP en algunos monómeros (interior del filamento)
        if(m>2 && m<nMono-2){
          ctx.fillStyle='rgba(239,68,68,0.5)'; ctx.font=`${5*zm}px sans-serif`; ctx.textAlign='center';
          ctx.fillText('D', x, y+2*zm);
        }
      }
    }
    // Miosina II (motor)
    const myoX=-filLen/2+((t*0.025)%(filLen/zm))*zm;
    ctx.save(); ctx.translate(myoX, -35*zm);
    ctx.beginPath(); ctx.ellipse(0,-8*zm,12*zm,8*zm,0,0,Math.PI*2);
    ctx.fillStyle='rgba(239,68,68,0.55)'; ctx.fill(); ctx.strokeStyle='rgba(239,68,68,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,35*zm);
    ctx.strokeStyle='rgba(239,68,68,0.6)'; ctx.lineWidth=4; ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.9)'; ctx.font=`${7*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('MYO II', 0, -15*zm);
    ctx.restore();
    // Ramificación Arp2/3
    ctx.save(); ctx.translate(20*zm,-15*zm); ctx.rotate(-0.7);
    for(let m=0;m<8;m++){
      const x=m*16*zm, y=Math.sin(m*0.8)*6*zm;
      ctx.beginPath(); ctx.arc(x,y,5*zm,0,Math.PI*2);
      ctx.fillStyle='rgba(168,85,247,0.7)'; ctx.fill();
      ctx.strokeStyle='rgba(168,85,247,0.9)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='rgba(168,85,247,0.8)'; ctx.font=`${8*zm}px JetBrains Mono`; ctx.textAlign='center';
    ctx.fillText('Arp2/3', 50*zm,-20*zm);
    // Extremo + y −
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${13*zm}px JetBrains Mono`;
    ctx.textAlign='center'; ctx.fillText('+', filLen/2+15*zm, 4*zm);
    ctx.fillStyle='rgba(239,68,68,0.9)';
    ctx.fillText('−', -filLen/2-15*zm, 4*zm);
    ctx.restore();
    ctx.fillStyle='rgba(16,185,129,0.9)'; ctx.font=`bold ${11*zm}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillText('MICROFILAMENTOS (F-ACTINA)', cx, cy-60*zm);
  }
};

/* ═══════════════════════════════════════════════════════════
   MINI CANVAS (tarjetas de la galería)
   ═══════════════════════════════════════════════════════════ */
function initMiniCanvas() {
  document.querySelectorAll('.gc-mini-canvas').forEach(canvas => {
    const id = parseInt(canvas.dataset.id);
    const data = CELL_DATA[id];
    if (!data) return;
    canvas.width = canvas.offsetWidth * devicePixelRatio || 290;
    canvas.height = canvas.offsetHeight * devicePixelRatio || 180;
    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const w = canvas.offsetWidth || 290;
    const h = canvas.offsetHeight || 180;
    let t = 0;
    const renderFn = Renderers[data.render];
    function loop() {
      t += 16;
      if (renderFn) renderFn(ctx, w, h, t, 0.2, t*0.0004, 0.58);
      const raf = requestAnimationFrame(loop);
      miniAnims.push(raf);
    }
    loop();
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL 3D
   ═══════════════════════════════════════════════════════════ */
function openModal(id) {
  currentModalId = id;
  const data = CELL_DATA[id];
  if (!data) return;
  // Rellenar info
  document.getElementById('gcModalTag').textContent = data.tag;
  document.getElementById('gcModalTitle').textContent = data.name;
  document.getElementById('gcModalDesc').textContent = data.desc;
  document.getElementById('gcModalFunc').textContent = data.func;
  document.getElementById('gcModalCanvasLabel').textContent = `⟳ Arrastra para rotar · ${data.name}`;
  document.getElementById('gcModalCounter').textContent = `${id+1} / ${CELL_DATA.length}`;
  // Datos clave
  const datosEl = document.getElementById('gcModalDatos');
  datosEl.innerHTML = data.datos.map(d =>
    `<div class="gc-modal-dato">
      <span class="gc-modal-dato-val">${d.val}</span>
      <span class="gc-modal-dato-key">${d.key}</span>
    </div>`
  ).join('');
  // Componentes
  const compsEl = document.getElementById('gcModalComps');
  compsEl.innerHTML = data.componentes.map(c =>
    `<span class="gc-comp-tag ${c.color}">${c.name}</span>`
  ).join('');
  // Navegación
  document.getElementById('btnPrev').disabled = id === 0;
  document.getElementById('btnNext').disabled = id === CELL_DATA.length-1;
  // Abrir overlay
  const overlay = document.getElementById('gcModal');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
  // Init canvas modal
  setTimeout(() => startModalCanvas(data), 50);
}

function closeModal(event, force=false) {
  if (!force && event && event.target !== document.getElementById('gcModal')) return;
  const overlay = document.getElementById('gcModal');
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display='none'; }, 350);
  document.body.style.overflow = '';
  if (modalAnim) { cancelAnimationFrame(modalAnim); modalAnim=null; }
}

function navigateModal(dir) {
  const newId = currentModalId + dir;
  if (newId < 0 || newId >= CELL_DATA.length) return;
  if (modalAnim) { cancelAnimationFrame(modalAnim); modalAnim=null; }
  openModal(newId);
}

function toggleAutoRotate() {
  autoRotate = !autoRotate;
  document.getElementById('btnRotate').classList.toggle('active', autoRotate);
}
function resetView() { rotX=0.3; rotY=0; zoom=1; }

/* ─── Canvas modal con interacción drag ─── */
function startModalCanvas(data) {
  if (modalAnim) { cancelAnimationFrame(modalAnim); modalAnim=null; }
  const canvas = document.getElementById('gcModalCanvas');
  if (!canvas) return;
  const dpr = devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const renderFn = Renderers[data.render];
  if (!renderFn) return;
  let t2 = 0;
  function loop() {
    t2 += 16;
    if (autoRotate) rotY += 0.008;
    ctx.clearRect(0, 0, w, h);
    renderFn(ctx, w, h, t2, rotX, rotY, zoom);
    modalAnim = requestAnimationFrame(loop);
  }
  loop();
  // Eventos drag
  canvas.onmousedown = e => { isDragging=true; lastMouseX=e.clientX; lastMouseY=e.clientY; };
  window.onmousemove = e => {
    if (!isDragging) return;
    rotY += (e.clientX - lastMouseX) * 0.012;
    rotX += (e.clientY - lastMouseY) * 0.012;
    rotX = Math.max(-1.2, Math.min(1.2, rotX));
    lastMouseX=e.clientX; lastMouseY=e.clientY;
  };
  window.onmouseup = () => { isDragging=false; };
  // Touch
  canvas.ontouchstart = e => { isDragging=true; lastMouseX=e.touches[0].clientX; lastMouseY=e.touches[0].clientY; e.preventDefault(); };
  canvas.ontouchmove = e => {
    if (!isDragging) return;
    rotY += (e.touches[0].clientX - lastMouseX) * 0.012;
    rotX += (e.touches[0].clientY - lastMouseY) * 0.012;
    rotX = Math.max(-1.2, Math.min(1.2, rotX));
    lastMouseX=e.touches[0].clientX; lastMouseY=e.touches[0].clientY;
    e.preventDefault();
  };
  canvas.ontouchend = () => { isDragging=false; };
  // Scroll zoom
  canvas.onwheel = e => {
    zoom += e.deltaY > 0 ? -0.08 : 0.08;
    zoom = Math.max(0.5, Math.min(2, zoom));
    e.preventDefault();
  };
}

/* ─── Teclado ─── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal(null, true);
  if (e.key === 'ArrowRight') navigateModal(1);
  if (e.key === 'ArrowLeft') navigateModal(-1);
});

/* ═══════════════════════════════════════════════════════════
   FILTROS DE GALERÍA
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.gc-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gc-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gc-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

/* ═══════════════════════════════════════════════════════════
   HERO CANVAS — Partículas moleculares
   ═══════════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = document.getElementById('gc-hero-canvas');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: 1+Math.random()*3,
      col: ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(16,185,129,', 'rgba(245,158,11,'][Math.floor(Math.random()*4)]
    });
  }
  function loop() {
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0;
      if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col+'0.5)'; ctx.fill();
    });
    // Líneas entre partículas cercanas
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<80){
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(168,85,247,${(1-dist/80)*0.15})`; ctx.lineWidth=0.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ═══════════════════════════════════════════════════════════
   REVEAL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════════════════════ */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('gc-revealed'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-gc-reveal]').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.style.background = window.scrollY > 40 ? 'rgba(4,2,14,0.95)' : 'rgba(4,2,14,0.85)';
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT COMPLETO
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initHeroCanvas();
  setTimeout(initMiniCanvas, 200);
});

window.addEventListener('resize', () => {
  initHeroCanvas();
});