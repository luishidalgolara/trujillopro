/* gc-data.js — Base de datos científica | PharmaLab Chile */
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
