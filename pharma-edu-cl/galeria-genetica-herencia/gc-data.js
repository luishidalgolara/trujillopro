/* gc-data.js — Base de datos científica | PharmaLab Chile */
/* ============================================================
   GALERÍA GENÉTICA Y HERENCIA — PharmaLab Chile
   Visualización 3D con Canvas API puro (sin dependencias)
   Datos científicos basados en: Lewin "Genes XII" (2022),
   Strachan & Read "Human Molecular Genetics" 5ª ed. (2019),
   Alberts "Molecular Biology of the Cell" 7ª ed. (2022)
   ============================================================ */

'use strict';

const CELL_DATA = [
  {
    id: 0,
    name: 'ADN',
    tag: 'Molécula · Ácido Desoxirribonucleico',
    color: '#10b981',
    desc: 'El ácido desoxirribonucleico (ADN) es la molécula portadora de la información genética en todos los organismos celulares y muchos virus. Estructura de doble hélice antiparalela (Watson & Crick, 1953) formada por dos cadenas de desoxirribonucleótidos unidas por puentes de hidrógeno entre bases nitrogenadas complementarias: A=T (2 PH) y G≡C (3 PH). El esqueleto azúcar-fosfato es hidrofílico; las bases apiladas en el interior son hidrofóbicas. En células eucarióticas, el ADN se organiza en nucleosomas (unidad básica de la cromatina): 147 pb enrollados alrededor de un octámero de histonas (2×H2A, H2B, H3, H4).',
    datos: [
      { val: '~2 m', key: 'ADN total por célula humana' },
      { val: '3.4 Å/pb', key: 'Distancia entre pares de bases' },
      { val: '10 pb/vuelta', key: 'Hélice B (forma dominante)' },
      { val: '6×10⁹ pb', key: 'Genoma humano diploide' }
    ],
    componentes: [
      { name: 'Desoxirribosa (azúcar)', color: 'green' },
      { name: 'Fosfato (esqueleto)', color: '' },
      { name: 'Adenina (A) ↔ Timina (T)', color: 'gold' },
      { name: 'Guanina (G) ↔ Citosina (C)', color: 'purple' },
      { name: 'Puentes de hidrógeno (2 y 3)', color: 'red' }
    ],
    func: 'El ADN almacena información genética en la secuencia de bases (código genético). La replicación semiconservativa (Meselson-Stahl, 1958) duplica el ADN antes de cada división celular mediante ADN polimerasas, helicasas, primasa, ligasa y topoisomerasas. La transcripción produce ARN a partir de la cadena molde (3′→5′) sintetizando ARN en dirección 5′→3′. La reparación del ADN (escisión de bases/nucleótidos, recombinación homóloga, NHEJ) mantiene la integridad genómica. Alteraciones en genes supresores de tumores (p53, BRCA1/2) y protooncogenes conducen a cáncer.',
    render: 'dna'
  },
  {
    id: 1,
    name: 'ARN',
    tag: 'Molécula · Ácido Ribonucleico',
    color: '#f59e0b',
    desc: 'El ácido ribonucleico (ARN) es una molécula de cadena sencilla (generalmente) compuesta por ribonucleótidos con ribosa como azúcar y uracilo (U) en lugar de timina. Actúa como intermediario entre el ADN y las proteínas (dogma central: ADN→ARN→Proteína, Crick, 1958). Existen múltiples tipos funcionales: ARNm (mensajero), ARNr (ribosomal), ARNt (transferencia), ARNsn (pequeño nuclear), ARNsi (interferencia), ARNmi (micro), ARNlnc (no codificante largo) y ribozimas. El ARN puede plegarse en estructuras secundarias y terciarias complejas (stem-loops, pseudonudos) que le confieren actividad catalítica.',
    datos: [
      { val: 'Ribosa + U', key: 'Diferencias vs ADN' },
      { val: 'Cadena simple', key: 'Estructura primaria' },
      { val: '>80%', key: 'ARN ribosomal del total celular' },
      { val: '~20 tipos', key: 'Clases funcionales conocidas' }
    ],
    componentes: [
      { name: 'Ribosa (azúcar, −OH en 2′)', color: 'gold' },
      { name: 'Adenina, Guanina, Citosina', color: '' },
      { name: 'Uracilo (U, reemplaza T)', color: 'red' },
      { name: 'Grupos fosfato', color: 'green' },
      { name: 'Estructuras stem-loop', color: 'purple' }
    ],
    func: 'El ARN es central en la expresión génica. El procesamiento del pre-ARNm en eucariotas incluye: capping 5′ (7-metilguanosina), poliadenilación 3′ (cola poli-A, 150-250 nt) y splicing (eliminación de intrones por el espliceosoma, complejo de 5 snARN + ~150 proteínas). El ARN puede catalizar reacciones (ribozimas): el ARNr 23S/28S cataliza la formación del enlace peptídico en el ribosoma. El mundo ARN hipotético (Gilbert, 1986) propone que el ARN precedió al ADN y las proteínas en el origen de la vida. Los ARNsi y ARNmi median la interferencia de ARN (RNAi), mecanismo de silenciamiento génico postranscripcional.',
    render: 'rna'
  },
  {
    id: 2,
    name: 'ARN Mensajero',
    tag: 'ARN · Intermediario Traduccional',
    color: '#06b6d4',
    desc: 'El ARN mensajero (ARNm) es la molécula de ARN que transporta la información de un gen desde el núcleo hasta los ribosomas citoplásmicos para su traducción en proteína. En eucariotas, el ARNm maduro es monocistrónivo (un solo marco de lectura), posee cap 5′ (protege de la degradación y facilita el reconocimiento ribosomal), cola poli-A 3′ (estabilidad y exportación nuclear) y UTRs (regiones no traducidas 5′ y 3′ con elementos reguladores). La vida media varía de minutos a horas, permitiendo regulación rápida de la expresión génica. La ARN polimerasa II transcribe los genes codificantes de proteínas.',
    datos: [
      { val: '5′-Cap', key: '7-metilguanosina (protección)' },
      { val: '150–250 nt', key: 'Cola poli-A 3′' },
      { val: 'AUG', key: 'Codón de inicio (Met)' },
      { val: 'UAA/UAG/UGA', key: 'Codones de parada' }
    ],
    componentes: [
      { name: '5′-UTR (regulación inicio trad.)', color: 'purple' },
      { name: 'Cap 5′ (7-metilguanosina)', color: 'gold' },
      { name: 'ORF (marco de lectura abierto)', color: 'green' },
      { name: '3′-UTR (estabilidad, regulación)', color: '' },
      { name: 'Cola poli-A 3′ (estabilidad)', color: 'red' }
    ],
    func: 'La traducción del ARNm ocurre en tres fases: iniciación (reconocimiento del cap por eIF4E, ensamblaje del ribosoma 80S en AUG), elongación (incorporación de aminoacil-ARNt en el sitio A, translocación: A→P→E, 15-20 aa/s) y terminación (reconocimiento del codón de parada por factores de liberación). Un ARNm puede ser traducido simultáneamente por múltiples ribosomas (polirribosoma). La tecnología de ARNm sintético (vacunas COVID-19: Pfizer-BioNTech y Moderna) introduce ARNm encapsulado en nanopartículas lipídicas para producción de antígenos in vivo. La terapia génica basada en ARNm tiene potencial para enfermedades raras y cáncer.',
    render: 'mrna'
  },
  {
    id: 3,
    name: 'ARN Ribosomal',
    tag: 'ARN · Componente Estructural Ribosoma',
    color: '#a855f7',
    desc: 'El ARN ribosomal (ARNr) es el componente principal y catalíticamente activo del ribosoma. Constituye el ~65% de la masa ribosomal (el 35% restante son proteínas ribosomales). En procariotas: ribosoma 70S = subunidad pequeña 30S (ARNr 16S + 21 proteínas) + subunidad grande 50S (ARNr 23S + 5S + 31 proteínas). En eucariotas: ribosoma 80S = subunidad pequeña 40S (ARNr 18S) + subunidad grande 60S (ARNr 28S + 5.8S + 5S). El ARNr 23S/28S es una ribozima que cataliza directamente la formación del enlace peptídico (Nobel de Química 2009: Ramakrishnan, Steitz, Yonath).',
    datos: [
      { val: '~65%', key: 'Masa ribosomal (ARNr)' },
      { val: '70S / 80S', key: 'Constante de sedimentación' },
      { val: '16S ARNr', key: 'Marcador filogenético bacteriano' },
      { val: '~10⁶/célula', key: 'Ribosomas por célula hepática' }
    ],
    componentes: [
      { name: 'ARNr 16S/18S (subunidad pequeña)', color: 'green' },
      { name: 'ARNr 23S/28S (subunidad grande)', color: 'purple' },
      { name: 'ARNr 5S y 5.8S', color: 'gold' },
      { name: 'Proteínas ribosomales (r-proteínas)', color: '' },
      { name: 'Sitios A, P, E (traducción)', color: 'red' }
    ],
    func: 'El ARNr 16S de la subunidad pequeña decodifica el ARNm (interacción con el anticodón del ARNt y reconocimiento del codón AUG mediante la secuencia Shine-Dalgarno en procariotas). El ARNr 23S/28S de la subunidad grande cataliza la reacción de peptidiltransferasa: nucléofilo (amino grupo del aminoacil-ARNt en sitio A) ataca al carbonilo del peptidil-ARNt en sitio P, formando el enlace peptídico sin requerir proteínas. El ARNr 16S es el marcador estándar en metagenómica: su secuenciación identifica comunidades microbianas. Antibióticos que inhiben el ribosoma bacteriano: aminoglucósidos (30S), macrólidos y cloranfenicol (50S).',
    render: 'rrna'
  },
  {
    id: 4,
    name: 'ARN de Transferencia',
    tag: 'ARN · Adaptador Traduccional',
    color: '#10b981',
    desc: 'El ARN de transferencia (ARNt) es la molécula adaptadora que conecta la información del ARNm (secuencia de codones) con la secuencia de aminoácidos de la proteína. Con ~73–93 nucleótidos, adopta una estructura secundaria en hoja de trébol (4 stem-loops: aceptor, D, anticodón y TΨC) y una estructura terciaria en forma de L invertida. El extremo 3′-CCA universal porta el aminoácido. El bucle anticodón (posiciones 34-36) reconoce el codón complementario del ARNm. Existen ~60 ARNt diferentes en eucariotas (código degenerado: 61 codones sentido, 64 total).',
    datos: [
      { val: '73–93 nt', key: 'Longitud típica' },
      { val: '3′-CCA', key: 'Extremo universal aminoácido' },
      { val: '~60', key: 'ARNt diferentes en eucariotas' },
      { val: '7.5 nm', key: 'Longitud forma L (cristalografía)' }
    ],
    componentes: [
      { name: 'Tallo aceptor 3′-CCA (aa)', color: 'gold' },
      { name: 'Bucle D (dihidrouridina)', color: '' },
      { name: 'Bucle anticodón (34-36)', color: 'purple' },
      { name: 'Bucle TΨC (interacción ribosoma)', color: 'green' },
      { name: 'Aminoacil-ARNt sintetasas (20)', color: 'red' }
    ],
    func: 'Las aminoacil-ARNt sintetasas (aaRS) son las enzimas que "leen" el código genético: catalizan la unión del aminoácido específico al extremo 3′-CCA de su ARNt cognado en 2 pasos: (1) aa + ATP → aminoacil-AMP + PPi; (2) aminoacil-AMP + ARNt → aminoacil-ARNt + AMP. La fidelidad de aminoacilación (~1 error en 10⁴) es mayor que la de la traducción ribosomal (~1 error en 10³). El tambaleo (wobble, Crick, 1966) permite que un ARNt reconozca más de un codón: la posición 34 del anticodón puede aparearse con múltiples bases en la posición 3 del codón. Aplicaciones: ARNt sintéticos con anticodones diseñados permiten incorporar aminoácidos no naturales (biología sintética).',
    render: 'trna'
  },
  {
    id: 5,
    name: 'Genes',
    tag: 'Unidad Funcional · Información Hereditaria',
    color: '#06b6d4',
    desc: 'Un gen es la unidad básica de la herencia, definida actualmente como una secuencia de ADN que codifica un producto funcional (ARN o proteína). El concepto ha evolucionado: de "factor hereditario" (Mendel, 1866) a "unidad de función, recombinación y mutación" (Benzer, 1955) hasta la definición molecular actual. Los genes eucarióticos están divididos en exones (secuencias codificantes) e intrones (secuencias no codificantes eliminadas por splicing). Un gen puede originar múltiples isoformas proteicas por splicing alternativo (el 95% de genes humanos multiexónicos se procesan alternativamente). El genoma humano contiene ~20,000-25,000 genes codificantes de proteínas (solo ~1.5% del ADN total).',
    datos: [
      { val: '~20,000–25,000', key: 'Genes codificantes humanos' },
      { val: '~1.5%', key: 'ADN codificante en humanos' },
      { val: '~95%', key: 'Genes con splicing alternativo' },
      { val: '1866', key: 'Concepto de Mendel (factor)' }
    ],
    componentes: [
      { name: 'Promotor (TATA box, CpG islands)', color: 'red' },
      { name: 'Exones (secuencias codificantes)', color: 'green' },
      { name: 'Intrones (eliminados por splicing)', color: '' },
      { name: 'Potenciadores/Silenciadores (enhancers)', color: 'gold' },
      { name: 'Terminador de transcripción', color: 'purple' }
    ],
    func: 'La expresión génica está regulada a múltiples niveles: (1) epigenético (metilación ADN, modificaciones de histonas); (2) transcripcional (factores de transcripción, potenciadores, TATA box, inicio de transcripción); (3) postranscripcional (splicing alternativo, estabilidad ARNm, ARNmi); (4) traduccional (IRES, estructuras 5′-UTR); (5) postraduccional (modificaciones proteicas, degradación por proteasoma). La regulación génica determina la diferenciación celular: ~200 tipos celulares humanos expresan el mismo genoma de forma diferencial. Genes de desarrollo (HOX, PAX, SOX) coordinan la morfogénesis. Oncogenes y genes supresores de tumores regulan la proliferación celular.',
    render: 'gene'
  },
  {
    id: 6,
    name: 'Genoma',
    tag: 'Información Total · Secuencia Completa',
    color: '#a855f7',
    desc: 'El genoma es el conjunto completo de información genética de un organismo, incluyendo todos sus genes y secuencias de ADN no codificante. El Proyecto Genoma Humano (HGP, 2003) secuenció los ~3×10⁹ pares de bases del genoma haploide humano distribuidos en 23 cromosomas. Solo el ~1.5% codifica proteínas; el resto incluye: intrones (~25%), secuencias reguladoras, elementos repetitivos (>50%: SINEs, LINEs, LTRs, ADN satélite), pseudogenes y secuencias de origen viral (endogenous retroviruses, ~8% del genoma). El "genoma oscuro" (dark genome) contiene miles de genes no anotados de función desconocida. Cada especie tiene un cariotipo característico (número y forma de cromosomas).',
    datos: [
      { val: '3×10⁹ pb', key: 'Genoma humano haploide' },
      { val: '23', key: 'Cromosomas (haploide humano)' },
      { val: '>50%', key: 'Elementos repetitivos en humanos' },
      { val: '2003', key: 'Secuenciación completa (HGP)' }
    ],
    componentes: [
      { name: 'Genes codificantes de proteína', color: 'green' },
      { name: 'ARN no codificante (lncRNA, miRNA)', color: 'gold' },
      { name: 'Elementos repetitivos (SINEs, LINEs)', color: '' },
      { name: 'Secuencias reguladoras (enhancers)', color: 'purple' },
      { name: 'Telómeros y centrómeros', color: 'red' }
    ],
    func: 'La genómica comparativa revela la evolución: el genoma humano comparte ~98.7% con el chimpancé, ~85% con el ratón, ~31% con la levadura. La secuenciación de nueva generación (NGS/WGS) permite secuenciar un genoma humano en <24 h por <$1,000. La genómica funcional (ENCODE Project) mapea todos los elementos funcionales del genoma. La medicina genómica utiliza el perfil genómico individual para diagnóstico (enfermedades raras, OMIM >7,000), pronóstico y terapia personalizada. La edición genómica (CRISPR-Cas9, base editors, prime editors) permite modificar secuencias específicas con alta precisión para investigación y terapia génica.',
    render: 'genome'
  },
  {
    id: 7,
    name: 'Epigenoma',
    tag: 'Regulación · Más Allá del ADN',
    color: '#ef4444',
    desc: 'El epigenoma comprende el conjunto de modificaciones químicas del ADN y las histonas que regulan la expresión génica sin alterar la secuencia nucleotídica, y que pueden ser heredadas durante la división celular (y en algunos casos transgeneracionalmente). Las principales marcas epigenéticas son: (1) Metilación del ADN: adición de CH₃ en citosinas de dinucleótidos CpG por ADN metiltransferasas (DNMT1, 3A, 3B). Las islas CpG metiladas silencian genes; (2) Modificaciones de histonas: acetilación (HAT/HDAC), metilación, fosforilación, ubiquitinación en colas N-terminales de H3 y H4, que constituyen el "código de histonas"; (3) Remodelación de cromatina (SWI/SNF, ISWI); (4) ARN no codificantes.',
    datos: [
      { val: 'CpG', key: 'Dinucleótido de metilación' },
      { val: '5-mC', key: '5-metilcitosina (marca principal)' },
      { val: 'H3K27me3', key: 'Marca represiva (PRC2)' },
      { val: 'H3K4me3', key: 'Marca activa (promotores)' }
    ],
    componentes: [
      { name: 'Metilación ADN (DNMT1/3A/3B)', color: 'red' },
      { name: 'Acetilación histonas (HAT/HDAC)', color: 'gold' },
      { name: 'Metilación histonas (HMT/HDM)', color: 'purple' },
      { name: 'Remodelación cromatina (SWI/SNF)', color: '' },
      { name: 'ARN no codificantes (lncRNA)', color: 'green' }
    ],
    func: 'El epigenoma es dinámico y responde al ambiente: nutrición, estrés, toxinas, edad y experiencias modifican el patrón epigenético. La reprogramación epigenética ocurre en dos ventanas críticas: gametogénesis y desarrollo embrionario temprano. La impronta genómica es un fenómeno epigenético. El cáncer muestra hipometilación global (activación de oncogenes y elementos repetitivos) e hipermetilación local en promotores de genes supresores de tumor. Fármacos epigenéticos (epidrogas): inhibidores de HDAC (vorinostat, romidepsina), inhibidores de DNMT (azacitidina, decitabina) y inhibidores de BET (JQ1) tienen aplicaciones oncológicas aprobadas por FDA.',
    render: 'epigenome'
  },
  {
    id: 8,
    name: 'Alelos',
    tag: 'Variantes · Formas del Gen',
    color: '#22d3ee',
    desc: 'Los alelos son las diferentes versiones o variantes de un gen que pueden existir en el mismo locus cromosómico. En organismos diploides, cada individuo posee dos alelos de cada gen (uno por cromosoma homólogo): si son idénticos, es homocigoto; si son diferentes, es heterocigoto. Los alelos surgen por mutación del alelo silvestre (wild-type). La mayoría de los loci en humanos son bialélicos (SNPs: polimorfismos de un solo nucleótido, >10⁷ en el genoma humano), aunque algunos loci tienen múltiples alelos (sistemas multiálélicos como HLA con miles de alelos). El genotipo (combinación alélica) determina el fenotipo junto con el ambiente.',
    datos: [
      { val: '>10⁷', key: 'SNPs en el genoma humano' },
      { val: 'HLA', key: 'Locus más polimórfico (miles de alelos)' },
      { val: 'AA/Aa/aa', key: 'Genotipos posibles (2 alelos)' },
      { val: '~1/300 pb', key: 'Frecuencia de SNPs entre humanos' }
    ],
    componentes: [
      { name: 'Alelo dominante (A)', color: 'purple' },
      { name: 'Alelo recesivo (a)', color: 'gold' },
      { name: 'Locus (posición en cromosoma)', color: '' },
      { name: 'Genotipo (AA, Aa, aa)', color: 'green' },
      { name: 'Fenotipo (expresión observable)', color: 'red' }
    ],
    func: 'Los alelos determinan la variabilidad genética intrapoblacional. Las frecuencias alélicas están descritas por el equilibrio de Hardy-Weinberg (p² + 2pq + q² = 1) bajo ausencia de selección, mutación, deriva génica, migración y apareamiento no aleatorio. La desviación del equilibrio indica evolución en curso. Los SNPs son marcadores en estudios de asociación del genoma completo (GWAS) que identifican variantes asociadas a enfermedades complejas. El ABO sanguíneo es un sistema de 3 alelos (Iᴬ, Iᴮ, i) con dominancia y codominancia. Las variantes de número de copia (CNV) son otro tipo de variación alélica: duplicaciones/deleciones de segmentos >1 kb.',
    render: 'alleles'
  },
  {
    id: 9,
    name: 'Mutaciones',
    tag: 'Cambio · Secuencia de ADN',
    color: '#ef4444',
    desc: 'Una mutación es un cambio permanente y heredable en la secuencia de ADN. Pueden ser: (1) Génicas/puntuales: sustituciones (transición: purina↔purina o pirimidina↔pirimidina; transversión: purina↔pirimidina), inserciones o deleciones de 1-varios nucleótidos; (2) Cromosómicas estructurales: deleciones, duplicaciones, inversiones, translocaciones de segmentos; (3) Cromosómicas numéricas: aneuploidías (trisomía, monosomía) o poliploidías. Las sustituciones génicas se clasifican en: sinónimas/silenciosas (no cambian aa), missense (cambian aa), nonsense (crean codón de parada prematuro) o en sitio de splicing. La tasa de mutación espontánea humana es ~1-2 × 10⁻⁸ por pb por generación.',
    datos: [
      { val: '~1–2×10⁻⁸', key: 'Tasa mutación/pb/generación' },
      { val: '~60–70', key: 'Mutaciones de novo por individuo' },
      { val: '~25,000', key: 'Enfermedades genéticas conocidas' },
      { val: 'p.Glu6Val', key: 'Mutación HbS (drepanocitosis)' }
    ],
    componentes: [
      { name: 'Mutación puntual (SNV)', color: 'red' },
      { name: 'Inserción/Deleción (indel)', color: 'gold' },
      { name: 'Variante de número de copia (CNV)', color: '' },
      { name: 'Aneuploidía (trisomía, monosomía)', color: 'purple' },
      { name: 'Translocación cromosómica', color: 'green' }
    ],
    func: 'Las mutaciones son el motor de la evolución (variabilidad + selección natural). Pueden ser: neutras (sin efecto fenotípico), beneficiosas (ventaja selectiva) o perjudiciales (enfermedades genéticas). Los mutágenos incluyen: agentes físicos (radiación UV, rayos X), químicos (aflatoxinas, nitrosaminas, agentes alquilantes) y biológicos (virus, transposones). Los mecanismos de reparación del ADN (>150 genes de reparación en humanos) corrigen la mayoría de mutaciones espontáneas. Las mutaciones somáticas (en células no germinales) causan cáncer; las germinales se transmiten a la descendencia. La edición genómica precisa (CRISPR base editors) permite corregir mutaciones patogénicas específicas sin producir dobles roturas del ADN.',
    render: 'mutation'
  },
  {
    id: 10,
    name: 'Recombinación Genética',
    tag: 'Proceso · Intercambio de Segmentos',
    color: '#10b981',
    desc: 'La recombinación genética es el proceso de intercambio de segmentos de ADN entre cromátidas homólogas (recombinación homóloga, RH) durante la meiosis I (profase I: paquiteno). Produce nuevas combinaciones alélicas (recombinantes) que no existían en los parentales. El crossing-over (quiasma) es el punto físico de intercambio, mediado por el complejo sinaptonémico. La frecuencia de recombinación entre dos loci es proporcional a su distancia (mapa genético: 1 centimorgan, cM = 1% de recombinación). El genoma humano tiene ~600 eventos de crossing-over por meiosis (~1–2 por par cromosómico). La recombinación también es mecanismo de reparación del ADN de dobles roturas (RH y NHEJ).',
    datos: [
      { val: '~600', key: 'Crossing-over por meiosis humana' },
      { val: '1 cM', key: '= 1% frecuencia recombinación' },
      { val: '~1 Mb', key: '≈ 1 cM (promedio genoma humano)' },
      { val: 'RAD51', key: 'Recombinasa principal (RH)' }
    ],
    componentes: [
      { name: 'Cromátidas homólogas (no hermanas)', color: 'green' },
      { name: 'Quiasma (punto de cruce)', color: 'gold' },
      { name: 'Complejo sinaptonémico', color: 'purple' },
      { name: 'RAD51/RecA (recombinasa)', color: 'red' },
      { name: 'Intermediario de Holliday (unión H)', color: '' }
    ],
    func: 'La recombinación meiótica cumple dos funciones: (1) genera diversidad genética en los gametos (junto con la segregación independiente de cromosomas, produce 2²³ × crossing-overs combinaciones posibles en humanos); (2) garantiza la segregación correcta de cromosomas homólogos en meiosis I (los quiasmas mantienen físicamente los bivalentes). El mecanismo molecular involucra: iniciación (doble rotura por SPO11), resección 5′→3′, invasión de la cadena (RAD51), síntesis de ADN, formación de uniones de Holliday y resolución (endonucleasas: GEN1, MUS81). La recombinación no homóloga (NAHR) entre repeticiones produce CNVs y síndromes de microdeleción/microduplicación (p.ej. síndrome de DiGeorge: del 22q11).',
    render: 'recombination'
  },
  {
    id: 11,
    name: 'Dominancia',
    tag: 'Herencia · Relación entre Alelos',
    color: '#f59e0b',
    desc: 'La dominancia describe la relación entre dos alelos de un gen en un heterocigoto, donde el alelo dominante determina el fenotipo observado, enmascarando al alelo recesivo. La dominancia no es una propiedad intrínseca del alelo, sino de la relación entre alelos en un contexto fenotípico: un alelo puede ser dominante para un fenotipo y recesivo para otro. La dominancia completa ocurre cuando el heterocigoto es indistinguible del homocigoto dominante (AA = Aa). La dominancia incompleta (semidominancia) produce un fenotipo intermedio en el heterocigoto. La haploinsuficiencia (un solo alelo funcional no es suficiente) explica la dominancia de muchas mutaciones de pérdida de función (p.ej. BRCA1).',
    datos: [
      { val: 'AA = Aa', key: 'Dominancia completa' },
      { val: 'Aa intermedio', key: 'Dominancia incompleta' },
      { val: 'aa recesivo', key: 'Solo homozig. recesivo se expresa' },
      { val: '3:1', key: 'Razón fenotípica F2 (Mendel)' }
    ],
    componentes: [
      { name: 'Alelo dominante (A)', color: 'purple' },
      { name: 'Alelo recesivo (a)', color: 'gold' },
      { name: 'Heterocigoto (Aa)', color: 'green' },
      { name: 'Fenotipo dominante (A_)', color: '' },
      { name: 'Fenotipo recesivo (aa)', color: 'red' }
    ],
    func: 'La dominancia molecular tiene varias bases mecanísticas: (1) Haploinsuficiencia: el alelo mutante produce proteína no funcional; una copia del alelo WT no produce suficiente proteína → dominancia de la mutación nula (p.ej. NF1: neurofibromatosis); (2) Dominancia negativa (efecto negativo dominante): proteína mutante interfiere con la proteína WT (p.ej. mutaciones p53 en cáncer: el tetrámero mutante-WT es no funcional); (3) Ganancia de función: el alelo mutante adquiere actividad nueva (p.ej. FGFR3: acondroplasia). En asesoramiento genético, la distinción entre herencia AD y AR es crucial para calcular riesgo de recurrencia: AD 50% por hijo de afectado; AR 25% por hijo de dos portadores.',
    render: 'dominance'
  },
  {
    id: 12,
    name: 'Codominancia',
    tag: 'Herencia · Expresión Simultánea',
    color: '#06b6d4',
    desc: 'La codominancia ocurre cuando dos alelos de un gen se expresan simultáneamente e independientemente en el heterocigoto, produciendo un fenotipo que muestra características de ambos alelos, sin que ninguno enmascare al otro. Se diferencia de la dominancia incompleta en que no produce un fenotipo intermedio "mezclado", sino la expresión completa de ambos alelos. El ejemplo clásico es el sistema sanguíneo ABO: el genotipo IᴬIᴮ expresa simultáneamente los antígenos A y B en la superficie eritrocitaria → grupo AB. Otro ejemplo: electroforesis de hemoglobina en drepanocitosis heterocigota (HbA + HbS) o en hemoglobinopatía C (HbA + HbC).',
    datos: [
      { val: 'IᴬIᴮ → AB', key: 'Ejemplo clásico (ABO)' },
      { val: 'HbA + HbS', key: 'Drepanocitosis heterocigota' },
      { val: 'Ambos alelos', key: 'Se expresan simultáneamente' },
      { val: '1:2:1', key: 'Razón genotípica F2' }
    ],
    componentes: [
      { name: 'Alelo Iᴬ (antígeno A)', color: 'red' },
      { name: 'Alelo Iᴮ (antígeno B)', color: 'purple' },
      { name: 'Heterocigoto IᴬIᴮ (grupo AB)', color: 'gold' },
      { name: 'Expresión independiente y completa', color: 'green' },
      { name: 'Sin fenotipo intermedio', color: '' }
    ],
    func: 'La codominancia es la base molecular del sistema HLA (antígenos leucocitarios humanos): cada individuo expresa simultáneamente los alelos heredados de ambos progenitores en los loci HLA-A, B, C, DR, DQ, DP → mayor diversidad para presentación de antígenos. En transfusiones y trasplantes, la compatibilidad ABO y HLA es crítica. La electroforesis de hemoglobina en recién nacidos permite identificar drepanocitosis (HbSS), portadores (HbAS) y otras hemoglobinopatías. En genética forense, la codominancia de microsatélites (STRs) permite identificación individual con probabilidad de error <10⁻¹⁶. La genómica de poblaciones usa la codominancia de SNPs para estudios de ancestría.',
    render: 'codominance'
  },
  {
    id: 13,
    name: 'Herencia Mendeliana',
    tag: 'Herencia · Leyes de Mendel',
    color: '#a855f7',
    desc: 'La herencia mendeliana describe los patrones de transmisión de rasgos genéticos según las leyes formuladas por Gregor Mendel (1865) en sus experimentos con guisantes (Pisum sativum). Las tres leyes son: (1) Ley de la uniformidad: todos los híbridos F1 son uniformes; (2) Ley de la segregación (1ª ley): los dos alelos de un gen se separan en la formación de gametos, cada gameto recibe un alelo; (3) Ley de la distribución independiente (2ª ley): los alelos de diferentes genes se segregan independientemente (para genes en cromosomas diferentes o muy alejados). En humanos se aplica a enfermedades monogénicas: autosómicas dominantes (AD), autosómicas recesivas (AR), ligadas al X dominantes/recesivas.',
    datos: [
      { val: '1865', key: 'Publicación de Mendel' },
      { val: '3:1', key: 'Razón fenotípica F2 (monohibrido)' },
      { val: '9:3:3:1', key: 'Razón fenotípica F2 (dihibrido)' },
      { val: '>8,000', key: 'Rasgos mendelianos humanos (OMIM)' }
    ],
    componentes: [
      { name: 'Cuadro de Punnett (probabilidades)', color: 'purple' },
      { name: 'F1 (primera generación filial)', color: 'gold' },
      { name: 'F2 (segunda generación filial)', color: 'green' },
      { name: 'Segregación de alelos (meiosis)', color: '' },
      { name: 'Distribución independiente', color: 'red' }
    ],
    func: 'Los patrones de herencia mendeliana en humanos se identifican por análisis de pedigríes. AD: afectados en cada generación, padre/madre afectado transmite 50%; ejemplos: Huntington, NF1, síndrome de Marfan, acondroplasia. AR: padres portadores no afectados, riesgo 25% por hijo; ejemplos: fibrosis quística, fenilcetonuria, galactosemia, atrofia muscular espinal. El asesoramiento genético aplica las leyes mendelianas con el teorema de Bayes para calcular probabilidades de riesgo actualizado. La excepción a la 2ª ley es el ligamiento (linked genes): genes en el mismo cromosoma se transmiten juntos con mayor frecuencia (solo separados por recombinación meiótica).',
    render: 'mendelian'
  },
  {
    id: 14,
    name: 'Herencia Ligada al Sexo',
    tag: 'Herencia · Cromosomas Sexuales',
    color: '#ef4444',
    desc: 'La herencia ligada al sexo se refiere a los patrones de transmisión de genes ubicados en los cromosomas sexuales (X e Y). El cromosoma X humano (~155 Mb, ~800 genes) es grande y contiene muchos genes no relacionados con la determinación sexual. El cromosoma Y (~57 Mb, ~70 genes) contiene el gen SRY (determinación testicular) y genes de espermatogénesis. Los varones (XY) son hemicigotos para los genes ligados al X: expresan cualquier alelo del X (incluso recesivos). Las hembras (XX) pueden ser portadoras de alelos recesivos ligados al X sin expresarlos. La lionización (inactivación del X, Lyon, 1961) silencia aleatoriamente uno de los dos cromosomas X en cada célula somática femenina → mosaicismo fenotípico.',
    datos: [
      { val: '~800 genes', key: 'Genes en el cromosoma X' },
      { val: '~70 genes', key: 'Genes en el cromosoma Y' },
      { val: 'XY hemicigoto', key: 'Varones: un solo alelo X' },
      { val: 'Xce', key: 'Centro de inactivación X (XIST)' }
    ],
    componentes: [
      { name: 'Cromosoma X (grande, ~155 Mb)', color: 'red' },
      { name: 'Cromosoma Y (pequeño, ~57 Mb)', color: 'gold' },
      { name: 'Hemicigosidad masculina (XY)', color: 'purple' },
      { name: 'Portadora femenina (X^A X^a)', color: 'green' },
      { name: 'Inactivación X (XIST lncRNA)', color: '' }
    ],
    func: 'Enfermedades X-ligadas recesivas: afectan principalmente a varones; la madre portadora transmite el alelo mutante con 50% de probabilidad a hijos e hijas. Ejemplos: hemofilia A (F8) y B (F9), distrofia muscular de Duchenne (DMD, frameshift en distrofina), daltonismo (OPN1LW/MW), síndrome del X frágil (expansión CGG en FMR1, causa más común de discapacidad intelectual heredada). Enfermedades X-ligadas dominantes: afectan a ambos sexos pero más graves en varones (p.ej. incontinentia pigmenti: letal en XY). Los genes PAR (pseudoautosómicos) en las regiones terminales de X e Y se heredan como autosómicos. La terapia génica para hemofilia (p.ej. etranacogene dezaparvovec para hemofilia B) restaura la producción del factor de coagulación.',
    render: 'xlinked'
  },
  {
    id: 15,
    name: 'Impronta Genética',
    tag: 'Epigenética · Expresión Parental',
    color: '#10b981',
    desc: 'La impronta genómica (genomic imprinting) es un fenómeno epigenético en el cual la expresión de ciertos genes depende del origen parental del cromosoma que los porta: un alelo se expresa y el otro se silencia según sea heredado del padre o de la madre. Se conocen ~100-200 genes imprintados en mamíferos, generalmente agrupados en regiones cromosómicas reguladas por centros de impronta (IC) con diferente metilación en los gametos masculino y femenino. Ejemplos clásicos: IGF2 (expresado solo del alelo paterno), H19 (expresado solo del alelo materno), SNRPN (impronta paterna: expresado del paterno). La impronta se establece en las células germinales y se mantiene durante el desarrollo.',
    datos: [
      { val: '~100–200', key: 'Genes imprintados en mamíferos' },
      { val: 'IGF2/H19', key: 'Par imprintado clásico (chr 11)' },
      { val: 'CpG DMRs', key: 'Regiones de metilación diferencial' },
      { val: 'ICR (IC)', key: 'Centro de impronta (regulador)' }
    ],
    componentes: [
      { name: 'Alelo materno (expresado o silenciado)', color: 'green' },
      { name: 'Alelo paterno (expresado o silenciado)', color: 'purple' },
      { name: 'Metilación diferencial (DMR)', color: 'gold' },
      { name: 'CTCF (aislador en H19/IGF2)', color: '' },
      { name: 'Macrosatélite de ARN no codificante', color: 'red' }
    ],
    func: 'Trastornos por alteración de la impronta: síndrome de Prader-Willi (PWS: pérdida de expresión de genes paternos en 15q11-q13, por deleción paterna o disomía uniparental materna → obesidad, hipotonía, discapacidad intelectual) y síndrome de Angelman (AS: pérdida de UBE3A materno en misma región → epilepsia, ataxia, risa inapropiada, ausencia de habla). El síndrome de Beckwith-Wiedemann (BWS) involucra pérdida de impronta en 11p15 (IGF2 biálico → sobrecrecimiento). La disomía uniparental (ambos cromosomas del mismo progenitor) causa trastornos de impronta sin mutación de secuencia. La clonación (oveja Dolly, 1996) y la reproducción partenogenética fallan parcialmente por la impronta (los embriones necesitan ambos aportes parentales).',
    render: 'imprinting'
  },
  {
    id: 16,
    name: 'Transposones',
    tag: 'Genoma · Elementos Móviles',
    color: '#f59e0b',
    desc: 'Los transposones (elementos transponibles, TEs) son secuencias de ADN capaces de moverse a diferentes posiciones dentro del genoma (transposición), descritos primero por Barbara McClintock en maíz (1950, Nobel 1983). Constituyen >50% del genoma humano. Se clasifican en: Clase I (retrotransposones, "copiar y pegar"): se transcriben a ARN, se retrotranscriben a ADNc y se insertan en nueva posición (LINEs: L1, ~17%; SINEs: Alu, ~11%; LTR-retrotransposones: ~8%); Clase II (transposones de ADN, "cortar y pegar"): la transposasa escinde y reinserta el elemento (hAT, Tc1/Mariner; <3% activos en humanos). La mayor parte de los TEs humanos son inactivos (mutados o silenciados por metilación y piARN).',
    datos: [
      { val: '>50%', key: 'Del genoma humano son TEs' },
      { val: '~17%', key: 'LINEs (L1) en genoma humano' },
      { val: '~11%', key: 'SINEs (Alu) en genoma humano' },
      { val: '1950', key: 'Descubrimiento (McClintock)' }
    ],
    componentes: [
      { name: 'LINEs (L1: ~500,000 copias)', color: 'gold' },
      { name: 'SINEs (Alu: ~1,000,000 copias)', color: 'purple' },
      { name: 'LTR-retrotransposones (ERVs)', color: 'red' },
      { name: 'Transposones ADN (Clase II)', color: 'green' },
      { name: 'piARN (silenciamiento en germline)', color: '' }
    ],
    func: 'Los transposones activos son mutagénicos: la inserción de L1 en el gen F8 causa hemofilia A; inserciones en APC causan cáncer colorrectal; inserciones en BRCA2 causan cáncer de mama. Sin embargo, los TEs han contribuido enormemente a la evolución genómica: exaptación de TEs como exones (exonización), promotores, potenciadores y elementos CTCF; el gen SYNCITINA (fusinas placentarias) deriva de una envoltura de retrovirus endógeno; ~25% de los promotores humanos contienen elementos derivados de TEs. En cáncer, la hipometilación global reactiva LINEs (indicador epigenético). Los sistemas CRISPR de defensa bacteriana contra fagos tienen analogía funcional con los mecanismos de defensa de eucariotas contra transposones (piARN pathway).',
    render: 'transposon'
  }
];
