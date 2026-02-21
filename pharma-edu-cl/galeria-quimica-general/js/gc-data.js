/* gc-data.js — Base de datos científica | PharmaLab Chile */
/* ============================================================
   GALERIA QUÍMICA GENERAL — PharmaLab Chile
   Visualización 3D con Canvas API puro (sin dependencias)
   Datos científicos basados en: Chang & Goldsby "Chemistry" 12ª ed.,
   Atkins "Physical Chemistry" 11ª ed., IUPAC Recommendations 2021
   ============================================================ */

'use strict';

const CELL_DATA = [
  {
    id: 0,
    name: 'Átomo',
    tag: 'Fundamento · Química General',
    color: '#a855f7',
    desc: 'El átomo es la unidad fundamental de la materia que conserva las propiedades de un elemento químico. Compuesto por un núcleo denso (protones y neutrones) rodeado por una nube electrónica organizada en orbitales cuánticos. El modelo mecánico-cuántico describe los electrones mediante funciones de onda (orbitales s, p, d, f) con probabilidades de densidad electrónica. El radio atómico varía desde 31 pm (He) hasta 343 pm (Cs).',
    datos: [
      { val: '~10⁻¹⁰ m', key: 'Radio atómico típico' },
      { val: '~99.9%', key: 'Volumen ocupado por orbitales' },
      { val: '1913', key: 'Modelo de Bohr' },
      { val: '118', key: 'Elementos conocidos' }
    ],
    componentes: [
      { name: 'Núcleo (protones + neutrones)', color: 'red' },
      { name: 'Orbitales s (esféricos)', color: 'purple' },
      { name: 'Orbitales p (lobulares)', color: 'gold' },
      { name: 'Orbitales d y f', color: 'green' },
      { name: 'Electrones de valencia', color: '' }
    ],
    func: 'Los átomos interaccionan mediante fuerzas electrostáticas entre sus cargas. Los electrones de valencia determinan la reactividad química. La configuración electrónica sigue el principio de Aufbau, la regla de Hund y el principio de exclusión de Pauli. Los orbitales atómicos se combinan linealmente (LCAO) para formar orbitales moleculares en los enlaces. La espectroscopía atómica (líneas de emisión/absorción) permite identificar elementos: base del análisis elemental y de la astrofísica.',
    render: 'atom'
  },
  {
    id: 1,
    name: 'Molécula',
    tag: 'Estructura · Química General',
    color: '#06b6d4',
    desc: 'Agrupación neutra de dos o más átomos unidos por enlaces covalentes con geometría definida. La geometría molecular se predice por la Teoría VSEPR (Repulsión de Pares Electrónicos de Valencia): los pares enlazantes y no enlazantes se disponen para minimizar repulsiones. Ejemplos: H₂O (angular, 104.5°), CO₂ (lineal, 180°), NH₃ (piramidal, 107°), CH₄ (tetraédrica, 109.5°). Las propiedades macroscópicas (punto de ebullición, solubilidad, reactividad) emergen de su estructura.',
    datos: [
      { val: '0.074 nm', key: 'Enlace H-H (más corto)' },
      { val: '104.5°', key: 'Ángulo H-O-H (agua)' },
      { val: 'VSEPR', key: 'Teoría de geometría' },
      { val: '10⁻²³ g', key: 'Masa típica molécula' }
    ],
    componentes: [
      { name: 'Átomos enlazados', color: '' },
      { name: 'Pares enlazantes (σ, π)', color: 'purple' },
      { name: 'Pares libres (lone pairs)', color: 'gold' },
      { name: 'Momento dipolar', color: 'green' },
      { name: 'Geometría electrónica', color: 'red' }
    ],
    func: 'La forma molecular determina su polaridad, reactividad y función biológica. La teoría del enlace de valencia (Pauling) describe hibridaciones sp, sp², sp³, sp³d, sp³d². La teoría de orbitales moleculares (MO) explica el diamagnetismo del O₂, la aromaticidad del benceno y la deslocalización electrónica. La espectroscopía IR, Raman y RMN determinan estructura molecular. En química farmacéutica, la geometría molecular determina la complementariedad receptor-ligando (lock-and-key, induced fit).',
    render: 'molecule'
  },
  {
    id: 2,
    name: 'Elemento',
    tag: 'Tabla Periódica · Sustancia Pura',
    color: '#10b981',
    desc: 'Sustancia pura que no puede descomponerse en otras sustancias más simples por métodos químicos ordinarios. Definido por su número atómico Z (número de protones). La Tabla Periódica moderna (Mendeleiev, 1869; Moseley, 1913) organiza los 118 elementos por Z creciente en períodos y grupos. Las propiedades periódicas (radio atómico, energía de ionización, afinidad electrónica, electronegatividad) muestran tendencias sistemáticas producto de la configuración electrónica.',
    datos: [
      { val: '118', key: 'Elementos conocidos' },
      { val: '94', key: 'Presentes en la naturaleza' },
      { val: '1869', key: 'Tabla Periódica (Mendeleiev)' },
      { val: 'H→Og', key: 'Rango Z=1 a Z=118' }
    ],
    componentes: [
      { name: 'Período (fila horizontal)', color: '' },
      { name: 'Grupo (columna vertical)', color: 'purple' },
      { name: 'Metales (izquierda/centro)', color: 'gold' },
      { name: 'No metales (derecha)', color: 'green' },
      { name: 'Semimetales/metaloides', color: 'red' }
    ],
    func: 'Los elementos se clasifican en metales (conductores, maleables), no metales (aislantes, quebradizos) y metaloides (semiconductores). Las propiedades periódicas permiten predecir reactividad: la electronegatividad (escala de Pauling) va de Cs (0.79) a F (3.98). La energía de ionización (IE) aumenta en el período → estabilidad de gases nobles. Los elementos del bloque d forman compuestos de coordinación con propiedades catalíticas y colorimétricas. En farmacia: elementos traza (Fe, Zn, Cu, Se, I) son esenciales para enzimas y cofactores.',
    render: 'element'
  },
  {
    id: 3,
    name: 'Compuesto',
    tag: 'Sustancia · Combinación Definida',
    color: '#f59e0b',
    desc: 'Sustancia pura formada por dos o más elementos diferentes en proporción definida y constante, unidos por enlaces químicos. Sus propiedades difieren completamente de los elementos constituyentes (ley de proporciones definidas, Proust, 1799). Se clasifican en compuestos iónicos (red cristalina, alto P.E.), moleculares (fuerzas intermoleculares débiles, bajo P.E.) y covalentes de red (diamante, cuarzo, P.E. muy alto). La fórmula empírica da la razón atómica mínima; la molecular, la composición real.',
    datos: [
      { val: 'Fija', key: 'Proporción atómica (Ley Proust)' },
      { val: 'Distinta', key: 'Propiedades vs elementos' },
      { val: 'NaCl, H₂O', key: 'Ejemplos clásicos' },
      { val: '>10⁷', key: 'Compuestos orgánicos conocidos' }
    ],
    componentes: [
      { name: 'Elementos en razón fija', color: '' },
      { name: 'Enlace iónico, covalente o metálico', color: 'purple' },
      { name: 'Fórmula empírica', color: 'gold' },
      { name: 'Fórmula molecular', color: 'green' },
      { name: 'Masa molar (g/mol)', color: 'red' }
    ],
    func: 'Los compuestos se forman mediante reacciones de síntesis y se separan por descomposición (termólisis, electrólisis). La nomenclatura IUPAC sistemática permite identificar la composición. En química orgánica, los compuestos se clasifican por grupos funcionales: alcoholes, cetonas, ácidos carboxílicos, aminas, ésteres. Los compuestos farmacéuticos activos (IFA) son diseñados racionalmente para interactuar con dianas biológicas específicas, explotando su composición, geometría y grupos funcionales reactivos.',
    render: 'compound'
  },
  {
    id: 4,
    name: 'Enlace Químico',
    tag: 'Interacción · Teoría del Enlace',
    color: '#a855f7',
    desc: 'Fuerza de atracción que mantiene unidos a los átomos en moléculas o iones en redes cristalinas. Surge del balance entre repulsión internuclear y atracción núcleo-electrón. Tipos principales: enlace covalente (compartición de electrones), enlace iónico (transferencia de electrones, diferencia de EN > 1.7) y enlace metálico (mar de electrones delocalizados). La energía de enlace (kJ/mol) mide su fortaleza; la longitud de enlace (pm) su distancia de equilibrio. Ambas correlacionan inversamente.',
    datos: [
      { val: '436 kJ/mol', key: 'Energía enlace H-H' },
      { val: '74 pm', key: 'Longitud enlace H-H' },
      { val: '∆EN > 1.7', key: 'Umbral carácter iónico' },
      { val: '3 tipos', key: 'Covalente, iónico, metálico' }
    ],
    componentes: [
      { name: 'Electrones compartidos/transferidos', color: 'purple' },
      { name: 'Diferencia de electronegatividad', color: 'gold' },
      { name: 'Energía de enlace (kJ/mol)', color: 'green' },
      { name: 'Longitud de enlace (pm)', color: 'red' },
      { name: 'Orden de enlace (simple/doble/triple)', color: '' }
    ],
    func: 'La teoría del enlace de valencia (VB) describe el enlace como superposición de orbitales atómicos. La teoría de orbitales moleculares (MO) produce OM enlazantes (menor energía) y antienlazantes (mayor energía). El orden de enlace = (electrons enlazantes − antienlazantes)/2. La resonancia (múltiples estructuras de Lewis) estabiliza moléculas por deslocalización electrónica. En farmacología, la ruptura y formación selectiva de enlaces determina el mecanismo de acción de antibióticos β-lactámicos, inhibidores de proteasa y agentes alquilantes anticancerígenos.',
    render: 'chemicalBond'
  },
  {
    id: 5,
    name: 'Enlace Covalente',
    tag: 'Enlace · Compartición Electrónica',
    color: '#06b6d4',
    desc: 'Enlace formado por la compartición de uno o más pares de electrones entre dos átomos. Predomina entre no metales con diferencia de electronegatividad (ΔEN) < 1.7. Puede ser simple (σ, 1 par), doble (σ+π, 2 pares) o triple (σ+2π, 3 pares). El enlace σ se forma por superposición axial de orbitales; el π por superposición lateral. Los enlaces covalentes polares tienen un extremo δ⁺ y δ⁻ que genera un momento dipolar. El enlace covalente coordinado (dativo) ocurre cuando un átomo aporta ambos electrones del par.',
    datos: [
      { val: '346 kJ/mol', key: 'Energía C-C (simple)' },
      { val: '602 kJ/mol', key: 'Energía C=C (doble)' },
      { val: '835 kJ/mol', key: 'Energía C≡C (triple)' },
      { val: '154 pm', key: 'Longitud C-C típica' }
    ],
    componentes: [
      { name: 'Par de electrones compartido', color: 'purple' },
      { name: 'Orbital σ (superposición axial)', color: '' },
      { name: 'Orbital π (superposición lateral)', color: 'gold' },
      { name: 'Enlace polar vs apolar', color: 'green' },
      { name: 'Deslocalización/resonancia', color: 'red' }
    ],
    func: 'Los enlaces covalentes son la base de la química orgánica. La hibridación sp³ (CH₄, tetraédrico) forma 4 enlaces σ con ángulos 109.5°. La hibridación sp² (C₂H₄, plano) forma 3 σ + 1 π; sp (C₂H₂, lineal) 2 σ + 2 π. Los sistemas π conjugados (benceno, carotenos, porfirina del grupo hemo) absorben luz visible dando color. La ruptura homolítica (radicales) y heterolítica (iones) determinan mecanismos de reacción orgánica SN1, SN2, E1, E2, adición electrofílica y nucleofílica. En bioquímica, todos los macronutrientes (proteínas, lípidos, glúcidos, ácidos nucleicos) son redes de enlaces covalentes.',
    render: 'covalentBond'
  },
  {
    id: 6,
    name: 'Enlace Iónico',
    tag: 'Enlace · Transferencia Electrónica',
    color: '#ef4444',
    desc: 'Fuerza de atracción electrostática entre cationes y aniones con carga opuesta, formados por transferencia de uno o más electrones de un átomo a otro (ΔEN > 1.7). Se produce generalmente entre metales alcalinos o alcalinotérreos y no metales electronegatividades (halógenos, oxígeno, azufre). Los compuestos iónicos forman redes cristalinas (estructura tipo NaCl, CsCl, ZnS) con coordinaciones de 4, 6 u 8 que maximizan la atracción y minimizan la repulsión. La energía de red (ciclo de Born-Haber) estabiliza la estructura.',
    datos: [
      { val: '∆EN > 1.7', key: 'Criterio enlace iónico' },
      { val: '787 kJ/mol', key: 'Energía de red NaCl' },
      { val: '801 °C', key: 'P.F. NaCl' },
      { val: '6', key: 'Coordinación NaCl (octaédrica)' }
    ],
    componentes: [
      { name: 'Catión (pierde e⁻, metal)', color: 'gold' },
      { name: 'Anión (gana e⁻, no metal)', color: 'purple' },
      { name: 'Red cristalina', color: 'red' },
      { name: 'Energía de red (ciclo Born-Haber)', color: 'green' },
      { name: 'Conductividad eléctrica (fundido/disuelto)', color: '' }
    ],
    func: 'Los compuestos iónicos son sólidos duros y frágiles a T ambiente (planos cristalinos se deslizan cuando cationes/aniones iguales se alinean → repulsión). Alto punto de fusión y ebullición por energía de red elevada. Son buenos conductores en estado fundido o en solución acuosa (electrolitos fuertes). La solubilidad en agua se debe a la solvación iónica (ΔH_hidratación > |energía de red|). Aplicaciones farmacéuticas: sales de fármacos (clorhidrato, sulfato, citrato) mejoran solubilidad, estabilidad y biodisponibilidad de moléculas activas (p.ej. morfina HCl, metformina HCl).',
    render: 'ionicBond'
  },
  {
    id: 7,
    name: 'Enlace Metálico',
    tag: 'Enlace · Mar de Electrones',
    color: '#f59e0b',
    desc: 'Unión entre átomos metálicos mediante electrones de valencia delocalizados ("mar de electrones" o "gas de electrones libres") que se mueven libremente por toda la estructura cristalina. El modelo del mar de electrones (Drude, 1900) explica la conductividad eléctrica y térmica. La teoría de bandas (quantum) describe bandas de valencia (llenas) y bandas de conducción (parcialmente llenas o vacías) separadas por una brecha de energía (band gap): metales (sin gap), semiconductores (gap pequeño), aislantes (gap grande).',
    datos: [
      { val: 'Sin gap', key: 'Banda de conducción (metales)' },
      { val: '~10⁷ S/m', key: 'Conductividad eléctrica Cu' },
      { val: '400 W/m·K', key: 'Conductividad térmica Cu' },
      { val: 'FCC/BCC/HCP', key: 'Empaquetamientos metálicos' }
    ],
    componentes: [
      { name: 'Cationes metálicos (red fija)', color: 'gold' },
      { name: 'Mar de electrones libres (delocalizados)', color: 'purple' },
      { name: 'Banda de valencia', color: 'green' },
      { name: 'Banda de conducción', color: 'red' },
      { name: 'Energía de cohesión', color: '' }
    ],
    func: 'La deslocalización electrónica confiere a los metales sus propiedades características: conductividad eléctrica (electrones libres transportan carga), conductividad térmica (fonones + electrones), maleabilidad y ductilidad (capas iónicas se deslizan sin romper el "mar"), opacidad y brillo metálico (reflexión de fotones por electrones libres). Las aleaciones (acero, bronce, latón) modifican propiedades mecánicas. En aplicaciones biomédicas: implantes de titanio, amalgamas dentales (Hg-Ag), nanopartículas de oro para drug delivery y diagnóstico por imagen.',
    render: 'metallicBond'
  },
  {
    id: 8,
    name: 'Enlace de Hidrógeno',
    tag: 'Interacción · Fuerza Intermolecular',
    color: '#22d3ee',
    desc: 'Interacción atractiva entre un átomo de hidrógeno unido covalentemente a un átomo muy electronegativo (F, O, N) y un par de electrones no enlazantes de otro átomo electronegativo. Energía: 4–40 kJ/mol (más fuerte que fuerzas de Van der Waals, más débil que enlace covalente). Es altamente direccional (ángulo D-H···A ≈ 180°). Responsable de propiedades anómalas del agua: alto punto de ebullición (100°C, vs −61°C si fuese solo London), alta capacidad calorífica y tensión superficial.',
    datos: [
      { val: '4–40 kJ/mol', key: 'Energía de enlace H' },
      { val: '~180°', key: 'Ángulo D-H···A óptimo' },
      { val: '1.5–2.2 Å', key: 'Distancia H···A' },
      { val: '100 °C', key: 'P.E. agua (por enlaces H)' }
    ],
    componentes: [
      { name: 'Donor D-H (N-H, O-H, F-H)', color: 'purple' },
      { name: 'Aceptor :A (O, N, F)', color: 'gold' },
      { name: 'Par de electrones no enlazante', color: 'green' },
      { name: 'Interacción electrostática parcial', color: '' },
      { name: 'Red de puentes H (agua, hielo)', color: 'red' }
    ],
    func: 'Los puentes de hidrógeno son fundamentales en biología: estabilizan la doble hélice del ADN (A=T: 2 PH; G≡C: 3 PH), la estructura secundaria de proteínas (hélice α: 4 residuos separados; lámina β: inter o intramolecular), y la actividad de agua como disolvente universal. La estructura del hielo es menos densa que el agua líquida (densidad máx. a 4°C) por la red tetraédrica de PH → el hielo flota → ecosistemas acuáticos subsisten bajo hielo. En formulación farmacéutica: los PH determinan solubilidad, absorción, permeabilidad de membrana (regla de Lipinski: ≤5 donors y ≤10 aceptores para buena biodisponibilidad oral).',
    render: 'hydrogenBond'
  },
  {
    id: 9,
    name: 'Electrón',
    tag: 'Partícula Subatómica · Carga Negativa',
    color: '#a855f7',
    desc: 'Partícula subatómica fundamental con carga eléctrica negativa (−1.602×10⁻¹⁹ C), masa de 9.109×10⁻³¹ kg (≈1/1836 masa del protón) y espín ½ (fermión). Los electrones orbitan el núcleo en orbitales cuánticos descritos por 4 números cuánticos: n (principal), l (azimutal, forma), mₗ (magnético, orientación) y ms (espín, ±½). El principio de exclusión de Pauli prohíbe que dos electrones compartan los mismos 4 números cuánticos. La dualidad onda-partícula es demostrada por el experimento de la doble rendija.',
    datos: [
      { val: '−1.602×10⁻¹⁹ C', key: 'Carga elemental' },
      { val: '9.109×10⁻³¹ kg', key: 'Masa en reposo' },
      { val: '½', key: 'Espín' },
      { val: '2.818 fm', key: 'Radio clásico (r_e)' }
    ],
    componentes: [
      { name: 'Carga eléctrica negativa', color: 'purple' },
      { name: 'Función de onda ψ (orbital)', color: '' },
      { name: 'Números cuánticos n, l, mₗ, ms', color: 'gold' },
      { name: 'Espín ½ (fermión)', color: 'green' },
      { name: 'Nube de probabilidad |ψ|²', color: 'red' }
    ],
    func: 'Los electrones de valencia determinan toda la reactividad química. En el modelo de Bohr (1913), los electrones orbitan en niveles discretos de energía Eₙ = −13.6/n² eV. La ecuación de Schrödinger (1926) reemplaza las órbitas por funciones de onda ψ. La densidad de probabilidad |ψ|²dV da la probabilidad de encontrar el electrón. Los electrones en bandas de conducción metálica transportan corriente eléctrica. En medicina nuclear, los positrones (antielectrón) se utilizan en PET (tomografía por emisión de positrones) para diagnóstico oncológico y neurológico.',
    render: 'electron'
  },
  {
    id: 10,
    name: 'Protón',
    tag: 'Partícula Subatómica · Carga Positiva',
    color: '#ef4444',
    desc: 'Partícula subatómica con carga positiva (+1.602×10⁻¹⁹ C) y masa de 1.672×10⁻²⁷ kg (1836× masa del electrón). Está compuesto por dos quarks "up" y un quark "down" mantenidos por gluones (cromodinámica cuántica, QCD). El número de protones (Z) define el elemento químico y es invariante: Z = 1 (H) hasta Z = 118 (Og). Los protones junto a los neutrones forman el núcleo atómico en un espacio de ~10⁻¹⁵ m (femtómetro), 100,000× más pequeño que el átomo.',
    datos: [
      { val: '+1.602×10⁻¹⁹ C', key: 'Carga eléctrica' },
      { val: '1.672×10⁻²⁷ kg', key: 'Masa en reposo' },
      { val: '0.877 fm', key: 'Radio del protón (CODATA)' },
      { val: 'uud', key: 'Composición en quarks' }
    ],
    componentes: [
      { name: '2 quarks up (carga +2/3 cada uno)', color: 'red' },
      { name: '1 quark down (carga −1/3)', color: 'gold' },
      { name: 'Gluones (fuerza nuclear fuerte)', color: 'purple' },
      { name: 'Carga total +1 (unidad elemental)', color: 'green' },
      { name: 'Espín ½ (barión, fermión)', color: '' }
    ],
    func: 'El número atómico Z = número de protones define inequívocamente el elemento: cambiar el número de protones transmuta el elemento (fisión nuclear, aceleradores de partículas). El ácido de Brønsted-Lowry se define como donador de protones (H⁺); la acidez/basicidad se cuantifica mediante el pH = −log[H⁺]. El protón es central en la fosforilación oxidativa: la ATP-sintasa usa el gradiente de protones (fuerza protomotriz) a través de la membrana mitocondrial interna para sintetizar ATP (quimioósmosis, Mitchell, 1961). En radioterapia, la protonterapia utiliza haces de protones para tratamiento de tumores con mayor precisión que rayos X.',
    render: 'proton'
  },
  {
    id: 11,
    name: 'Neutrón',
    tag: 'Partícula Subatómica · Sin Carga',
    color: '#10b981',
    desc: 'Partícula subatómica eléctricamente neutra con masa de 1.675×10⁻²⁷ kg (1838.7× masa del electrón, ligeramente mayor al protón). Compuesto por un quark up y dos quarks down (udd). Reside en el núcleo junto a los protones, estabilizado por la fuerza nuclear fuerte (residual). Fuera del núcleo, el neutrón libre es inestable: decae β⁻ con vida media ~15 minutos (n → p + e⁻ + antineutrino_e). El número de neutrones (N) varía en isótopos: mismo Z, diferente masa atómica.',
    datos: [
      { val: '1.675×10⁻²⁷ kg', key: 'Masa en reposo' },
      { val: '0 C', key: 'Carga eléctrica' },
      { val: '~15 min', key: 'Vida media (libre)' },
      { val: 'udd', key: 'Composición en quarks' }
    ],
    componentes: [
      { name: '1 quark up (carga +2/3)', color: 'green' },
      { name: '2 quarks down (carga −1/3 c/u)', color: 'gold' },
      { name: 'Gluones (QCD)', color: '' },
      { name: 'Carga neta 0', color: 'purple' },
      { name: 'Espín ½ (barión, fermión)', color: 'red' }
    ],
    func: 'Los neutrones estabilizan el núcleo compensando la repulsión coulombiana entre protones. Los isótopos (mismo Z, diferente N) tienen propiedades químicas idénticas pero masa diferente: ¹H, ²H (deuterio), ³H (tritio). Los isótopos radioactivos (radioisótopos) decaen emitiendo α, β o γ. En medicina nuclear: ⁹⁹ᵐTc (gammagrafía), ¹³¹I (tiroides), ¹⁸F-FDG (PET), ¹⁷⁷Lu-PSMA (terapia radionuclídica de próstata). La fisión nuclear (²³⁵U + n → productos de fisión + 2-3 n → reacción en cadena) libera ~200 MeV/fisión. La activación neutrónica analítica (NAA) permite análisis elemental ultrasensible.',
    render: 'neutron'
  },
  {
    id: 12,
    name: 'Número Atómico',
    tag: 'Propiedad Nuclear · Identidad Elemental',
    color: '#f59e0b',
    desc: 'El número atómico (Z) es el número de protones en el núcleo de un átomo y define inequívocamente el elemento químico. En un átomo neutro, Z también es igual al número de electrones. Es el parámetro fundamental que organiza la Tabla Periódica moderna (ordenamiento de Moseley, 1913, por rayos X de fluorescencia, superando el criterio de masa atómica de Mendeleiev). La identidad química del elemento es invariante mientras Z no cambie: solo reacciones nucleares pueden alterar Z.',
    datos: [
      { val: 'Z = n° protones', key: 'Definición fundamental' },
      { val: 'Z = 1 (H) → 118 (Og)', key: 'Rango de la Tabla Periódica' },
      { val: '1913', key: 'Ordenamiento por Moseley' },
      { val: 'Z = N_e⁻ (neutro)', key: 'Átomo neutro' }
    ],
    componentes: [
      { name: 'Número de protones (Z)', color: 'red' },
      { name: 'Igual a N_e en átomo neutro', color: 'purple' },
      { name: 'Define el elemento (identidad)', color: 'gold' },
      { name: 'Organiza Tabla Periódica', color: 'green' },
      { name: 'Invariante en reacciones químicas', color: '' }
    ],
    func: 'Z determina la configuración electrónica y por ende todas las propiedades químicas: valencia, electronegatividad, radio atómico, energías de ionización. En la Tabla Periódica, las propiedades presentan periodicidad al repetirse la configuración de la última capa electrónica (grupo IA: ns¹; grupo VIIA: ns²np⁵). La espectroscopía de fluorescencia de rayos X (XRF) detecta Z por la energía de emisión característica (Ley de Moseley: √ν = a(Z − b)). En medicina forense y arqueometría, la determinación del Z por XRF y espectrometría de masas identifica composición elemental de muestras.',
    render: 'atomicNumber'
  },
  {
    id: 13,
    name: 'Masa Atómica',
    tag: 'Propiedad Atómica · Escala de Dalton',
    color: '#22d3ee',
    desc: 'La masa atómica (también llamada peso atómico) es la masa promedio ponderada de todos los isótopos naturales de un elemento, expresada en unidades de masa atómica (u.m.a. o Da), donde 1 u = 1/12 de la masa del isótopo ¹²C. La masa atómica relativa (Ar) es adimensional. La masa molar (M) es numéricamente igual a Ar pero en g/mol, conectando la escala atómica con la macroscópica mediante la constante de Avogadro (Nₐ = 6.022×10²³ mol⁻¹). El defecto de masa nuclear refleja la energía de ligadura nuclear (E = mc²).',
    datos: [
      { val: '1 u = 1.661×10⁻²⁷ kg', key: 'Unidad de masa atómica' },
      { val: '6.022×10²³', key: 'Constante de Avogadro' },
      { val: '1.008 u', key: 'Masa atómica H' },
      { val: '238.03 u', key: 'Masa atómica U (más pesado nat.)' }
    ],
    componentes: [
      { name: 'Masa del protón (1.0073 u)', color: 'red' },
      { name: 'Masa del neutrón (1.0087 u)', color: 'green' },
      { name: 'Masa del electrón (0.000549 u)', color: 'purple' },
      { name: 'Defecto de masa (energía ligadura)', color: 'gold' },
      { name: 'Abundancia isotópica natural', color: '' }
    ],
    func: 'La masa molar (g/mol) permite convertir gramos a moles (n = m/M) y calcular estequiometría de reacciones. El mol es la unidad SI de cantidad de materia. La espectrometría de masas (MS) mide la relación m/z de iones con precisión de partes por millón, permitiendo determinar fórmulas moleculares exactas, identificar compuestos y cuantificar mezclas. En farmacia: el cálculo de dosis se basa en la masa molar del principio activo (PA) y su sal farmacéutica. La biodisponibilidad considera el peso molecular del fármaco (MW < 500 Da según regla de Lipinski para absorción oral).',
    render: 'atomicMass'
  }
];
