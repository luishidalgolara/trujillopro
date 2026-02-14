// ═══════════════════════════════════════════════════════════
// HONGOS DATA - Base de datos de hongos
// ═══════════════════════════════════════════════════════════

const HONGOS_DATA = [
  {
    id: 'candida-albicans',
    nombre: 'Candida albicans',
    subtitulo: 'Levadura dimórfica · Ascomycota · Oportunista',
    icono: '🍄',
    categorias: ['levaduras', 'dimorficos', 'oportunistas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Levadura ovoide de 4-6 μm, dimórfica (levadura ⟷ hifa)',
          'Pared celular: Glucanos (β-1,3 y β-1,6), mananos, quitina',
          'Dimorfismo: Pseudohifas e hifas verdaderas bajo ciertas condiciones',
          'Gemación: Reproducción asexual por brotación',
          'Blastoconidias: Forma de levadura predominante',
          'Clamidosporas: Estructuras de resistencia en agar arroz con Tween 80'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Aerobio facultativo: Metabolismo respiratorio y fermentativo',
          'Temperatura óptima: 28-37°C (termotolerante)',
          'pH óptimo: 4.5-6.5 (acidófilo)',
          'Tubo germinal: Test diagnóstico (37°C en suero humano)',
          'Asimilación: Glucosa, maltosa, sacarosa',
          'No asimila lactosa ni produce ureasa',
          'Formación de biofilm: En superficies bióticas y abióticas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '8 cromosomas, ~14-16 Mb haploide' },
          { label: 'Contenido GC', value: '33.5%' },
          { label: 'Número de genes', value: '~6,000 genes' },
          { label: 'Reproducción', value: 'Principalmente clonal (sin fase sexual conocida)' },
          { label: 'Variación genética', value: 'Pérdida de heterocigosidad (LOH)' },
          { label: 'Plasticidad', value: 'Switching fenotípico white-opaque' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Candidiasis mucocutánea: Oral (muguet), vaginal, esofágica',
          'Candidiasis invasiva: Candidemia, endocarditis, endoftalmitis',
          'Infecciones nosocomiales: 4ta causa de bacteriemia hospitalaria',
          'Grupos de riesgo: Inmunocomprometidos, diabetes, antibioticoterapia prolongada',
          'Candidiasis diseminada: Sepsis en neutropénicos, prematuros',
          'Mortalidad: 40-60% en candidemia no tratada',
          'Tratamiento: Azoles (fluconazol), equinocandinas, anfotericina B'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Dimorfismo: Hifas invaden tejidos, levaduras diseminan',
          'Adhesinas: Als (agglutinin-like sequence), hwp1',
          'Enzimas hidrolíticas: Proteasas (Sap1-10), fosfolipasas, lipasas',
          'Formación de biofilm: Resistencia a antifúngicos y fagocitosis',
          'Switching fenotípico: Variación white-opaque (adaptación)',
          'Evasión inmune: Enmascaramiento de β-glucano, inhibición fagocitosis',
          'Captación de hierro: Sideróforos, reductasas ferrosas'
        ]
      }
    ]
  },
  {
    id: 'aspergillus-fumigatus',
    nombre: 'Aspergillus fumigatus',
    subtitulo: 'Hongo filamentoso · Ascomycota · Ubicuo ambiental',
    icono: '🌿',
    categorias: ['filamentosos', 'oportunistas', 'alergenos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Hifas: Septadas, hialinas, 2-4 μm de diámetro',
          'Conidióforos: Vesícula en forma de matraz',
          'Fiálides: Uniseriadas, cubren 2/3 superiores de vesícula',
          'Conidios: Esféricos, 2-3 μm, verde-grisáceos, hidrofóbicos',
          'Cabeza conidial: Columnar (característica diagnóstica)',
          'Termotolerante: Crece hasta 55°C'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Aerobio estricto obligado',
          'Temperatura: 15-55°C, óptimo 37-40°C',
          'Ubicuidad ambiental: Suelo, compost, material en descomposición',
          'Esporulación abundante: 10⁸ conidios/día por colonia',
          'Dispersión aérea: Conidios inhalados (2-3 μm, alcanzan alvéolos)',
          'Pigmentos: Verde-grisáceo (dihidroxynaphthalene melanin)',
          'Metabolismo secundario: Gliotoxina, fumagilina'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '8 cromosomas, ~29.4 Mb' },
          { label: 'Contenido GC', value: '49.8%' },
          { label: 'Número de genes', value: '~9,900 genes' },
          { label: 'Reproducción sexual', value: 'Teleomorfo: Neosartorya fumigata' },
          { label: 'Variación', value: 'Recombinación sexual y mitótica' },
          { label: 'Genes de virulencia', value: 'Clusters de metabolitos secundarios' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Aspergilosis invasiva (AI): Neumonía necrotizante en inmunocomprometidos',
          'Aspergilosis pulmonar crónica: Cavitación, aspergiloma ("bola fúngica")',
          'Aspergilosis broncopulmonar alérgica (ABPA): Asma, fibrosis quística',
          'Sinusitis alérgica fúngica: Obstrucción sinusal',
          'Mortalidad AI: 50-90% en neutropénicos sin tratamiento',
          'Grupos de riesgo: Leucemia, trasplante, EPOC, corticoides',
          'Tratamiento: Voriconazol (1ª línea), anfotericina B, posaconazol',
          'Diagnóstico: Galactomanano sérico, (1→3)-β-D-glucano, PCR'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Tamaño conidial: 2-3 μm (depósito alveolar)',
          'Termotolerancia: Crecimiento a 37-50°C',
          'Germinación rápida: 6-8 horas en pulmón',
          'Gliotoxina: Inmunosupresor, induce apoptosis en fagocitos',
          'Melanina: Protección contra estrés oxidativo',
          'Enzimas: Proteasas (elastasas), fosfolipasas',
          'Angioinvasión: Invasión de vasos sanguíneos (trombosis, infarto)',
          'Resistencia antifúngica: Mutaciones cyp51A (azoles)'
        ]
      }
    ]
  },
  {
    id: 'cryptococcus-neoformans',
    nombre: 'Cryptococcus neoformans',
    subtitulo: 'Levadura encapsulada · Basidiomycota · Neurotrópico',
    icono: '🧠',
    categorias: ['levaduras', 'encapsulados', 'oportunistas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Levadura redonda u ovoide de 4-6 μm',
          'Cápsula: Polisacárido (glucuronoxilomanano), hasta 30 μm',
          'Pared celular: Quitina, glucanos, melanina',
          'Gemación: Estrecha (narrow-based budding)',
          'Tinta china: Halo claro capsular (diagnóstico)',
          'Teleomorfo: Filobasidiella neoformans (basidiomiceto)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Aerobio obligado',
          'Temperatura: 25-37°C',
          'Hábitat: Excretas de aves (palomas), suelo, árboles (eucalipto)',
          'Ureasa positiva: Test diagnóstico (color rosado en agar urea)',
          'Producción de melanina: Agar semilla de girasol (café-negro)',
          'Fenoloxidasa: Lacasa (convierte L-DOPA en melanina)',
          'No fermenta azúcares: Asimilación aerobia'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '14 cromosomas, ~19 Mb' },
          { label: 'Contenido GC', value: '48.2%' },
          { label: 'Número de genes', value: '~6,500 genes' },
          { label: 'Serotipos', value: 'A, D (C. neoformans), B, C (C. gattii)' },
          { label: 'Tipo sexual', value: 'MATα y MATa (heterotálico)' },
          { label: 'Reproducción sexual', value: 'Basidiosporas (infecciosas)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Meningitis criptocócica: Principal manifestación (60-70%)',
          'Criptococosis pulmonar: Neumonía, nódulos',
          'Criptococosis diseminada: Piel, huesos, próstata',
          'VIH/SIDA: Principal infección fúngica del SNC (CD4+ <100)',
          'Prevalencia: 220,000 casos/año meningitis, 180,000 muertes',
          'Criptococoma: Masa cerebral en inmunocompetentes (C. gattii)',
          'Tratamiento: Anfotericina B + flucitosina (inducción), fluconazol (mantenimiento)',
          'Diagnóstico: Antígeno criptocócico (LCR, suero), tinta china'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Cápsula polisacárida: Antifagocítica, principal factor de virulencia',
          'Melanina: Protección contra estrés oxidativo, radicales libres',
          'Termotolerancia: Crecimiento a 37-39°C',
          'Tropismo SNC: Cruce de barrera hematoencefálica ("caballo de Troya")',
          'Ureasa: Alcalinización, daño neuronal',
          'Fosfolipasa B: Invasión tisular',
          'Evasión inmune: Cápsula inhibe opsonización y presentación antigénica',
          'Formación de células gigantes: Titán cells (>10 μm, resistentes)'
        ]
      }
    ]
  },
  {
    id: 'histoplasma-capsulatum',
    nombre: 'Histoplasma capsulatum',
    subtitulo: 'Hongo dimórfico · Ascomycota · Intracelular',
    icono: '🗺️',
    categorias: ['dimorficos', 'endemicos', 'intracelulares'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Dimorfismo térmico: Micelio (25°C) ⟷ Levadura (37°C)',
          'Fase micelial: Hifas septadas, microconidios (2-4 μm), macroconidios (8-15 μm) tuberculados',
          'Fase levaduriforme: Células ovoides pequeñas (2-4 μm)',
          'Intracelular: Dentro de macrófagos',
          'Gemación: Estrecha en fase de levadura',
          'No encapsulado: Nombre "capsulatum" es histórico erróneo'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Dimorfismo térmico: <30°C micelio, 37°C levadura',
          'Hábitat: Suelo enriquecido con excretas de aves y murciélagos',
          'Distribución: Endémico en valles fluviales (Ohio, Mississippi)',
          'pH ácido: Favorece crecimiento',
          'Microconidios: Estructura infectante (aerosol)',
          'Conversión a levadura: En macrófagos alveolares',
          'Supervivencia intracelular: Parásito intracelular facultativo'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~33 Mb' },
          { label: 'Contenido GC', value: '39%' },
          { label: 'Número de genes', value: '~9,000 genes' },
          { label: 'Teleomorfo', value: 'Ajellomyces capsulatus' },
          { label: 'Variedades', value: 'var. capsulatum, var. duboisii, var. farciminosum' },
          { label: 'Reproducción sexual', value: 'Heterotálica (+ y -)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Histoplasmosis pulmonar aguda: Neumonía, 90% asintomática',
          'Histoplasmosis pulmonar crónica: Cavitación (EPOC)',
          'Histoplasmosis diseminada progresiva: VIH/SIDA, inmunosupresión',
          'Manifestaciones: Hepatoesplenomegalia, pancitopenia, úlceras mucocutáneas',
          'Exposición: Excavaciones, cuevas, derribo de edificios antiguos',
          'Epidemiología: Endémico en zonas templadas y tropicales',
          'Tratamiento: Itraconazol (leve-moderado), anfotericina B (severo)',
          'Diagnóstico: Antígeno urinario, cultivo (conversión a levadura), histopatología'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Dimorfismo térmico: Adaptación a temperatura del hospedador',
          'Supervivencia intracelular: Dentro de macrófagos',
          'Inhibición de fusión fagolisosoma: Escape de destrucción',
          'Calcio-binding protein (CBP1): Captación de calcio, virulencia',
          'Sideróforos: Captación de hierro intracelular',
          'α-(1,3)-glucano: Enmascaramiento de β-glucano (evasión)',
          'Modulación pH fagosoma: Alcalinización para supervivencia',
          'Dispersión hematógena: Desde macrófagos infectados'
        ]
      }
    ]
  },
  {
    id: 'coccidioides-immitis',
    nombre: 'Coccidioides immitis',
    subtitulo: 'Hongo dimórfico · Ascomycota · Altamente contagioso',
    icono: '🌵',
    categorias: ['dimorficos', 'endemicos', 'altamente-patogenos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Dimorfismo: Micelio (ambiente) ⟷ Esférula (tejido)',
          'Fase micelial: Hifas septadas con artroconidios alternantes (3-6 μm)',
          'Artroconidios: Altamente infecciosos, dispersión aérea',
          'Esférulas: 20-200 μm, pared gruesa, llenas de endosporas',
          'Endosporas: 2-5 μm, 100-300 por esférula',
          'Ruptura de esférula: Libera endosporas que forman nuevas esférulas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Dimorfismo: 25°C micelio, 37-40°C esférulas',
          'Hábitat: Suelo árido del suroeste de EE.UU., México, Sudamérica',
          'Dispersión: Tormentas de polvo, excavaciones, terremotos',
          'Aerosol: Artroconidios pequeños, llegan a alvéolos',
          'Altamente contagioso: Nivel de bioseguridad 3 (BSL-3)',
          'Esférula-endospora: Único en tejido (no micelio)',
          'Temperatura: Conversión a esférula a temperatura corporal'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~28.9 Mb' },
          { label: 'Contenido GC', value: '48.6%' },
          { label: 'Número de genes', value: '~10,000 genes' },
          { label: 'Especies', value: 'C. immitis (California), C. posadasii (no-California)' },
          { label: 'Reproducción sexual', value: 'No conocida (asexual)' },
          { label: 'Teleomorfo', value: 'Desconocido' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Coccidioidomicosis primaria: 60% asintomática, "fiebre del valle"',
          'Síntomas: Neumonía, eritema nodoso, artralgia',
          'Coccidioidomicosis diseminada: 1% (meningitis, hueso, piel)',
          'Meningitis coccidioidal: Crónica, requiere tratamiento de por vida',
          'Grupos de riesgo: Filipinos, afroamericanos, embarazadas, VIH+',
          'Epidemiología: 10,000-15,000 casos/año en EE.UU.',
          'Tratamiento: Fluconazol (leve), anfotericina B (severo/meningitis)',
          'Diagnóstico: Serología (IgM, IgG), cultivo (BSL-3), histopatología'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Artroconidios: Tamaño ideal para inhalación profunda (3-6 μm)',
          'Esférula: Estructura única, altamente resistente',
          'Amplificación exponencial: Endosporas (100-300) forman nuevas esférulas',
          'Evasión inmune: Esférula grande (>20 μm) resiste fagocitosis',
          'Proteínas SOWgp: Adhesión y patogenicidad',
          'Enzimas: Proteasas, urease',
          'Polisacáridos de pared: Modulación de respuesta inmune',
          'Diseminación: Filipinos y afroamericanos (susceptibilidad genética)'
        ]
      }
    ]
  },
  {
    id: 'pneumocystis-jirovecii',
    nombre: 'Pneumocystis jirovecii',
    subtitulo: 'Hongo atípico · Ascomycota · Oportunista estricto',
    icono: '🫁',
    categorias: ['levaduras', 'oportunistas', 'atipicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma trófica: 1-4 μm, pleomórfica, delgada',
          'Quiste (ascus): 5-8 μm, pared gruesa (β-glucano)',
          'Esporas internas: 8 núcleos haploides por quiste',
          'Sin ergosterol: Esteroles únicos (no responde a azoles)',
          'Pared celular: Quitina y β-1,3-glucano',
          'No cultivable in vitro: Parásito obligado'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Parásito obligado: Requiere hospedador mamífero',
          'Transmisión: Aérea (persona-persona)',
          'Tropismo: Neumocitos tipo I (alvéolos)',
          'Ciclo de vida: Trófico → pre-quiste → quiste maduro → liberación esporas',
          'No cultivable: Diagnóstico molecular y microscópico',
          'Especificidad de hospedador: P. jirovecii (humano), otras especies (animales)',
          'Colonización: Asintomática en inmunocompetentes'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~8 Mb (pequeño)' },
          { label: 'Contenido GC', value: '~35%' },
          { label: 'Número de genes', value: '~3,600 genes' },
          { label: 'Clasificación', value: 'Ascomycota (filogenia molecular)' },
          { label: 'Peculiaridad', value: 'Sin ergosterol (esteroles atípicos)' },
          { label: 'Genotipos', value: 'Múltiples basados en mtLSU, ITS' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Neumonía por Pneumocystis (PCP): VIH/SIDA (CD4+ <200)',
          'Síntomas: Disnea progresiva, tos seca, fiebre, hipoxemia',
          'Radiografía: Infiltrados intersticiales bilaterales ("vidrio esmerilado")',
          'Grupos de riesgo: VIH, trasplante, corticoides, quimioterapia',
          'Incidencia: Disminuyó con TAR y profilaxis (VIH)',
          'Mortalidad: 10-20% con tratamiento, 100% sin tratamiento',
          'Tratamiento: Trimetoprim-sulfametoxazol (1ª línea), pentamidina, atovaquona',
          'Profilaxis: TMP-SMX en CD4+ <200 (VIH) o inmunosupresión'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Adhesión: Glicoproteína A de superficie (gpA), fibronectina',
          'Tropismo alveolar: Unión específica a neumocitos tipo I',
          'Daño pulmonar: Respuesta inflamatoria del hospedador (no directa)',
          'Bloqueo intercambio gaseoso: Ocupación masiva de alvéolos',
          'Surfactante alterado: Compromiso función pulmonar',
          'Transmisión eficiente: Aerosol, quistes resistentes',
          'Escape inmune: En inmunocomprometidos',
          'Sin ergosterol: Resistencia natural a azoles (fluconazol inefectivo)'
        ]
      }
    ]
  },
  {
    id: 'mucor-rhizopus',
    nombre: 'Mucor y Rhizopus spp.',
    subtitulo: 'Zigomicetos · Mucorales · Angioinvasivos',
    icono: '⚫',
    categorias: ['filamentosos', 'oportunistas', 'angioinvasivos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Hifas: Anchas (6-25 μm), cenocíticas (no septadas), en ángulo recto',
          'Esporangios: Estructuras esféricas con esporangiosporas',
          'Esporangióforos: Rhizopus tiene rizoides y estolones',
          'Rizoides: Estructuras de anclaje (Rhizopus)',
          'Crecimiento rápido: Colonias algodonosas blanco-grisáceas',
          'Termotolerancia: Crecen a 37-42°C'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Aerobios: Ubicuos en ambiente (suelo, alimentos en descomposición)',
          'Temperatura: 25-37°C, algunos hasta 50°C',
          'Crecimiento rápido: Colonias maduras en 2-5 días',
          'Esporulación abundante: Dispersión aérea masiva',
          'Saprofitos: Descomponedores en naturaleza',
          'Captación de hierro: Sideróforos, reductasas (alta afinidad)',
          'Cetoacidosis: Entorno favorable (bajo pH, hiperglucemia, hierro libre)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma (R. delemar)', value: '~45.3 Mb' },
          { label: 'Contenido GC', value: '~37%' },
          { label: 'Número de genes', value: '~17,000 genes' },
          { label: 'Especies comunes', value: 'Rhizopus oryzae/delemar, Mucor circinelloides' },
          { label: 'Reproducción', value: 'Asexual (esporangios) y sexual (cigosporas)' },
          { label: 'Orden', value: 'Mucorales (Zigomicetos)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Mucormicosis rinocerebral: Diabetes cetoacidosis, invasión desde senos',
          'Mucormicosis pulmonar: Neutropenia, trasplante, hematológicos',
          'Mucormicosis cutánea: Quemaduras, trauma, vendajes contaminados',
          'Mucormicosis gastrointestinal: Prematuros, malnutrición',
          'Mucormicosis diseminada: Múltiples órganos, mortalidad >90%',
          'Angioinvasión: Trombosis, necrosis, infartos (tejido negro)',
          'Tratamiento: Anfotericina B liposomal, desbridamiento quirúrgico urgente, posaconazol',
          'Mortalidad: 30-70% (rinocerebral), >90% (diseminada)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Angioinvasión: Invasión de vasos sanguíneos, trombosis',
          'Termotolerancia: Crecimiento a temperatura corporal',
          'Captación de hierro: Ventaja en hiperglucemia, cetoacidosis (hierro libre)',
          'Enzimas: Proteasas, lipasas (invasión tisular)',
          'Crecimiento rápido: Progresión fulminante',
          'Resistencia a azoles: Intrínseca (anfotericina B es tratamiento)',
          'Ketone reductase: Uso de cuerpos cetónicos (cetoacidosis)',
          'Rizoides: Penetración y anclaje tisular (Rhizopus)'
        ]
      }
    ]
  },
  {
    id: 'sporothrix-schenckii',
    nombre: 'Sporothrix schenckii',
    subtitulo: 'Hongo dimórfico · Ascomycota · Linfocutáneo',
    icono: '🌹',
    categorias: ['dimorficos', 'subcutaneos', 'ambientales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Dimorfismo térmico: Micelio (25°C) ⟷ Levadura (37°C)',
          'Fase micelial: Hifas delgadas septadas, conidios en "margarita"',
          'Fase levaduriforme: Células ovoides, elongadas, en "cigarro"',
          'Conidióforos: Simpodiales con conidios en racimo',
          'Gemación: Única o múltiple en fase de levadura',
          'Pigmentación: Colonias blancas → marrón oscuro'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Dimorfismo: 25°C micelio, 35-37°C levadura',
          'Hábitat: Vegetación, suelo, musgo, espinas, madera',
          'Transmisión: Inoculación traumática (espinas de rosa, astillas)',
          'Distribución: Mundial, tropical y templado',
          'Ocupaciones de riesgo: Jardineros, agricultores, floristas',
          'Crecimiento: Lento (1-2 semanas)',
          'Melanina: Producción en cultivo (oscurecimiento)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~33 Mb' },
          { label: 'Contenido GC', value: '~56%' },
          { label: 'Número de genes', value: '~8,800 genes' },
          { label: 'Complejo S. schenckii', value: '6 especies crípticas' },
          { label: 'Especies clínicas', value: 'S. brasiliensis, S. schenckii, S. globosa' },
          { label: 'Reproducción sexual', value: 'Ophiostoma stenoceras (teleomorfo)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Esporotricosis linfocutánea: Nódulos subcutáneos ascendentes (linfangitis nodular)',
          'Esporotricosis cutánea fija: Lesión única sin diseminación linfática',
          'Esporotricosis diseminada: Múltiples órganos (rara, VIH, alcoholismo)',
          'Esporotricosis osteoarticular: Artritis, osteomielitis',
          'Esporotricosis pulmonar: EPOC, cavitación',
          'Epidemiología: Brotes (Brasil - gatos, Perú - heno)',
          'Transmisión zoonótica: Arañazo/mordedura de gato (S. brasiliensis)',
          'Tratamiento: Itraconazol (1ª línea), terbinafina, anfotericina B (severo)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Dimorfismo térmico: Conversión a levadura en tejido',
          'Adhesinas: Glucoproteínas de superficie (Gp70)',
          'Melanina: Protección contra fagocitosis y estrés oxidativo',
          'Ergosterol peroxidasa: Resistencia a especies reactivas de oxígeno',
          'Enzimas: Proteasas, lipasas, fosfatasas',
          'Diseminación linfática: Drenaje linfático ascendente',
          'Evasión inmune: Supresión de TNF-α, IL-12',
          'Termotolerancia: Crecimiento a 35-37°C'
        ]
      }
    ]
  },
  {
    id: 'malassezia-furfur',
    nombre: 'Malassezia furfur',
    subtitulo: 'Levadura lipofílica · Basidiomycota · Comensal cutáneo',
    icono: '🎨',
    categorias: ['levaduras', 'comensales', 'lipofílicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Levadura ovoide a cilíndrica, 1.5-4.5 μm',
          'Gemación unipolar: En base ancha',
          'Hifas cortas: En pitiriasis versicolor (micelio)',
          'Pared celular: Multicapa con lípidos',
          'Morfología "espagueti y albóndigas": Hifas + levaduras (PV)',
          'No cultivable sin lípidos: Requiere ácidos grasos'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Lipofílica obligada: Requiere ácidos grasos exógenos (C12-C24)',
          'Hábitat: Flora normal de piel (90% población)',
          'Áreas ricas en sebo: Cuero cabelludo, cara, espalda, pecho',
          'Temperatura: 30-35°C',
          'Cultivo: Agar Dixon, agar Sabouraud + aceite de oliva',
          'Producción de ácidos: Azelaico (despigmentante)',
          'Catalasa y lipasa positivas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma (M. globosa)', value: '~9 Mb (reducido)' },
          { label: 'Contenido GC', value: '~58%' },
          { label: 'Número de genes', value: '~4,200 genes' },
          { label: 'Especies', value: '18+ especies (M. furfur, M. globosa, M. restricta)' },
          { label: 'Reducción genómica', value: 'Pérdida de síntesis de ácidos grasos' },
          { label: 'Clasificación', value: 'Basidiomycota (Ustilaginomycetes)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Pitiriasis versicolor: Manchas hipo/hiperpigmentadas (tronco)',
          'Dermatitis seborreica: Descamación, eritema (cuero cabelludo, cara)',
          'Foliculitis por Malassezia: Pápulas pruriginosas (espalda, pecho)',
          'Funguemia: Neonatos prematuros (nutrición parenteral con lípidos)',
          'Otitis externa: Inflamación del conducto auditivo',
          'Asociación con dermatitis atópica: Exacerbación',
          'Tratamiento: Azoles tópicos (ketoconazol), sulfuro de selenio, zinc-piritiona',
          'Factores predisponentes: Calor, humedad, inmunosupresión, corticoides'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Lipofilia: Adaptación única a nicho cutáneo sebáceo',
          'Ácido azelaico: Inhibe tirosinasa (hipopigmentación)',
          'Lipasas y fosfolipasas: Degradación de lípidos cutáneos',
          'Biofilm: Formación en catéteres vasculares',
          'Inducción de respuesta inflamatoria: Dermatitis seborreica',
          'Alérgenos: IgE-mediado (dermatitis atópica)',
          'Resistencia a antifúngicos: Biofilm, penetración limitada',
          'Indoles: Activación del receptor de aril hidrocarburos (AhR)'
        ]
      }
    ]
  },
  {
    id: 'trichophyton-rubrum',
    nombre: 'Trichophyton rubrum',
    subtitulo: 'Dermatofito · Ascomycota · Queratinofílico',
    icono: '🦶',
    categorias: ['filamentosos', 'dermatofitos', 'superficiales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Hifas: Septadas, hialinas, ramificadas',
          'Macroconidios: Raros, forma de lápiz, pared delgada',
          'Microconidios: Abundantes, piriformes, laterales',
          'Pigmento rojo: Reverso de colonia (característico)',
          'Artroconidios: En pelo y uña (infección)',
          'Queratinofílico: Digiere queratina (piel, pelo, uña)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Antropofílico: Principal hospedador humano',
          'Crecimiento: Lento (2-3 semanas)',
          'Temperatura: 25-30°C óptimo',
          'Queratinasas: Enzimas proteolíticas (degradan queratina)',
          'Colonias: Blancas algodonosas, reverso rojo vino',
          'Agar papa dextrosa: Medio de cultivo preferido',
          'Transmisión: Contacto directo, fómites (toallas, calzado)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~22.5 Mb' },
          { label: 'Contenido GC', value: '~48%' },
          { label: 'Número de genes', value: '~11,600 genes' },
          { label: 'Genes de queratinasas', value: 'Familia SUBS (secreted subtilisins)' },
          { label: 'Reproducción', value: 'Asexual (teleomorfo desconocido)' },
          { label: 'Especificidad', value: 'Antropofílico (humanos)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Tiña pedis (pie de atleta): Interdigital, mocasín, vesicular',
          'Onicomicosis: Infección de uñas (50% casos), subungueal distal',
          'Tiña corporis: Lesiones anulares con borde activo',
          'Tiña cruris: Ingle, pliegues (atletas)',
          'Tiña unguium: Uñas engrosadas, amarillentas, quebradizas',
          'Prevalencia: Dermatofito más común mundialmente',
          'Tratamiento: Tópico (azoles, terbinafina), oral (terbinafina, itraconazol)',
          'Factores: Humedad, oclusión, inmunosupresión, diabetes'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Queratinasas: SUB1-7, degradación de queratina',
          'Proteasas: Degradación de componentes epidérmicos',
          'Adhesinas: Unión a queratina',
          'Adaptación a pH alcalino: Alcalinización del medio',
          'Artroconidios: Resistencia, dispersión',
          'Evasión inmune: Mannan-like structures (modulación)',
          'Biofilm ungueal: Resistencia a antifúngicos',
          'Invasión superficial: Limitada a estrato córneo (no viable)'
        ]
      }
    ]
  },
  {
    id: 'blastomyces-dermatitidis',
    nombre: 'Blastomyces dermatitidis',
    subtitulo: 'Hongo dimórfico · Ascomycota · Endémico norteamericano',
    icono: '🌲',
    categorias: ['dimorficos', 'endemicos', 'pulmonares'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Dimorfismo térmico: Micelio (25°C) ⟷ Levadura (37°C)',
          'Fase micelial: Hifas septadas con conidios ovoides (2-10 μm)',
          'Fase levaduriforme: Células esféricas grandes (8-15 μm)',
          'Gemación de base ancha: Característica diagnóstica',
          'Pared celular gruesa: Refringente, doble contorno',
          'Una sola yema: Por célula madre'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Dimorfismo: <30°C micelio, 37°C levadura',
          'Hábitat: Suelo húmedo rico en materia orgánica (hojas, madera)',
          'Distribución: Endémico en región de Grandes Lagos, Mississippi, Ohio',
          'Transmisión: Inhalación de conidios (aerosol)',
          'Actividades de riesgo: Caza, pesca, construcción cerca de agua',
          'No contagioso: Persona a persona (no transmisible)',
          'Conversión a levadura: En pulmón (temperatura corporal)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~75 Mb' },
          { label: 'Contenido GC', value: '~43%' },
          { label: 'Número de genes', value: '~10,000 genes' },
          { label: 'Teleomorfo', value: 'Ajellomyces dermatitidis' },
          { label: 'Reproducción sexual', value: 'Heterotálica (+ y -)' },
          { label: 'Variantes', value: 'Complejo de especies crípticas' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Blastomicosis pulmonar: Neumonía aguda o crónica',
          'Blastomicosis cutánea: Lesiones verrugosas, ulceradas (50%)',
          'Blastomicosis diseminada: Hueso, próstata, SNC',
          'Síntomas pulmonares: Tos, fiebre, dolor torácico, pérdida peso',
          'SDRA: En formas fulminantes',
          'Epidemiología: Endémica en noreste EE.UU., Canadá',
          'Tratamiento: Itraconazol (leve-moderado), anfotericina B (severo)',
          'Diagnóstico: Cultivo, histopatología (gemación base ancha), antígeno urinario'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Dimorfismo térmico: Adaptación a temperatura del hospedador',
          'Adhesina BAD1: Unión a macrófagos, supresión TNF-α',
          'α-(1,3)-glucano: Enmascaramiento de β-glucano',
          'Tamaño de levadura: 8-15 μm (dificulta fagocitosis)',
          'Gemación base ancha: Característica única',
          'Evasión inmune: Modulación de citoquinas proinflamatorias',
          'Catalasa y superóxido dismutasa: Protección contra estrés oxidativo',
          'Diseminación hematógena: Pulmón → piel, hueso, SNC'
        ]
      }
    ]
  },
  {
    id: 'paracoccidioides-brasiliensis',
    nombre: 'Paracoccidioides brasiliensis',
    subtitulo: 'Hongo dimórfico · Ascomycota · Endémico latinoamericano',
    icono: '🌎',
    categorias: ['dimorficos', 'endemicos', 'pulmonares'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Dimorfismo térmico: Micelio (25°C) ⟷ Levadura (37°C)',
          'Fase micelial: Hifas delgadas septadas con clamidosporas',
          'Fase levaduriforme: Células grandes (10-40 μm)',
          'Gemación múltiple: "Rueda de timón" o "timón de Mickey Mouse" (patognomónico)',
          'Levaduras hijas: Pequeñas, rodeando célula madre',
          'Pared gruesa: Refringente'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Fisiología y Metabolismo',
        items: [
          'Dimorfismo: 25°C micelio, 37°C levadura',
          'Hábitat: Suelo húmedo, áreas de vegetación, cafetales',
          'Distribución: Endémico en Latinoamérica (Brasil, Colombia, Venezuela, Argentina)',
          'Transmisión: Inhalación de conidios (actividades agrícolas)',
          'Latencia: Reactivación años después de exposición',
          'Predominio masculino: Hormonas (estrógenos protectores)',
          'No contagioso: Persona a persona'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~30 Mb' },
          { label: 'Contenido GC', value: '~47%' },
          { label: 'Número de genes', value: '~8,500 genes' },
          { label: 'Complejo de especies', value: 'P. brasiliensis (S1, PS2, PS3, PS4), P. lutzii' },
          { label: 'Reproducción sexual', value: 'Desconocida (asexual)' },
          { label: 'Teleomorfo', value: 'No identificado' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Paracoccidioidomicosis crónica (adultos): Pulmonar, mucocutánea',
          'Forma aguda/subaguda (juvenil): Linfática, hepatoesplenomegalia',
          'Lesiones mucocutáneas: Úlceras orales, nasales ("boca de tapir")',
          'Afectación pulmonar: Infiltrados, fibrosis (secuela)',
          'Diseminación: Hígado, bazo, ganglios linfáticos, suprarrenales',
          'Epidemiología: 10 millones expuestos, endémico rural',
          'Tratamiento: Itraconazol, sulfametoxazol-trimetoprim, anfotericina B',
          'Predominio: Hombres 10-15:1 (estrógenos bloquean conversión a levadura)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Dimorfismo térmico: Conversión a levadura patogénica',
          'Gemación múltiple: "Rueda de timón" (característica única)',
          'Glicoproteína gp43: Adhesión a fibronectina y laminina',
          'α-(1,3)-glucano: Evasión inmune',
          'Melanina: Protección contra fagocitosis',
          'Hormonas: Estrógenos inhiben dimorfismo (protección mujeres)',
          'Latencia prolongada: Reactivación endógena años después',
          'Granulomas: Inflamación crónica, fibrosis pulmonar'
        ]
      }
    ]
  }
];