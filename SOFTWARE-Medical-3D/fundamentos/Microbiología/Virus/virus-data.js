// ═══════════════════════════════════════════════════════════
// VIRUS DATA - Base de datos de virus
// ═══════════════════════════════════════════════════════════

const VIRUS_DATA = [
  {
    id: 'sars-cov-2',
    nombre: 'SARS-CoV-2',
    subtitulo: 'Coronavirus · RNA(+) monocatenario · Envoltura lipídica',
    icono: '🦠',
    categorias: ['rna', 'envueltos', 'respiratorios', 'pandemicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 80-120 nm de diámetro',
          'Envoltura lipídica: Bicapa derivada de célula huésped',
          'Proteína Spike (S): Proyecciones en corona, receptor ACE2',
          'Proteínas de envoltura: M (membrana), E (envoltura)',
          'Nucleocápside: Proteína N + RNA genómico helicoidal',
          'Genoma: RNA(+) monocatenario de ~30 kb (el más grande de RNA)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: Unión de Spike a receptor ACE2, fusión de membranas',
          'Liberación de RNA(+) al citoplasma',
          'Traducción directa: RNA viral actúa como mRNA',
          'Síntesis de poliproteínas pp1a y pp1ab (proteasa 3CL, RdRp)',
          'Replicación: RNA(-) como intermediario, luego RNA(+) progenie',
          'Ensamblaje: Retículo endoplásmico-Golgi (ERGIC)',
          'Liberación: Exocitosis sin lisis celular'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(+) monocatenario lineal' },
          { label: 'Tamaño genómico', value: '~29.9 kb (29,903 nt)' },
          { label: 'Genes principales', value: 'ORF1ab, S, E, M, N' },
          { label: 'Proteínas estructurales', value: 'S, E, M, N (4 proteínas)' },
          { label: 'Proteínas no estructurales', value: '16 nsps (nsp1-16)' },
          { label: 'Tasa de mutación', value: '~10⁻⁴ sust/sitio/año' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'COVID-19: Enfermedad respiratoria pandémica (2019-presente)',
          'Espectro clínico: Asintomático a SDRA, fallo multiorgánico',
          'Transmisión: Aerosoles, gotitas respiratorias, fómites',
          'Periodo de incubación: 2-14 días (mediana 5 días)',
          'Complicaciones: Neumonía bilateral, tormenta de citoquinas, COVID largo',
          'Variantes de preocupación: Alpha, Beta, Gamma, Delta, Omicron',
          'Vacunas: mRNA (Pfizer, Moderna), vector viral (AstraZeneca)',
          'Mortalidad global: >7 millones (OMS, 2024)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Proteína Spike: Unión ACE2, fusión de membranas, principal antígeno',
          'Sitio de clivaje furina (S1/S2): Aumenta infectividad',
          'Evasión inmune: Antagonismo de interferón (ORF3b, ORF6)',
          'Inhibición de respuesta antiviral: nsp1, nsp3, nsp16',
          'Tropismo amplio: Pulmón, corazón, riñón, cerebro, vasos sanguíneos',
          'Inflamación sistémica: IL-6, IL-1β, TNF-α (tormenta de citoquinas)'
        ]
      }
    ]
  },
  {
    id: 'influenza-a',
    nombre: 'Virus de la Influenza A',
    subtitulo: 'Orthomyxovirus · RNA(-) segmentado · Envoltura lipídica',
    icono: '🌡️',
    categorias: ['rna', 'envueltos', 'respiratorios', 'pandemicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica o filamentosa de 80-120 nm',
          'Envoltura lipídica: Con espículas de glicoproteínas',
          'Hemaglutinina (HA): 18 subtipos (H1-H18), receptor de ácido siálico',
          'Neuraminidasa (NA): 11 subtipos (N1-N11), liberación viral',
          'Proteína M2: Canal iónico, entrada viral',
          'Genoma segmentado: 8 segmentos de RNA(-), 10 proteínas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: HA se une a ácido siálico, endocitosis',
          'Fusión: Acidificación endosomal, cambio conformacional de HA',
          'Liberación de vRNPs al citoplasma, transporte nuclear',
          'Transcripción: RNA polimerasa viral (PB1, PB2, PA) en núcleo',
          'Cap-snatching: Robo de cap 5\' de mRNA celulares',
          'Replicación: cRNA como intermediario',
          'Ensamblaje: Membrana plasmática (lipid rafts)',
          'Liberación: NA corta ácido siálico, gemación'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(-) segmentado (8 segmentos)' },
          { label: 'Tamaño genómico', value: '~13.5 kb total' },
          { label: 'Proteínas codificadas', value: '10 proteínas (algunas alternativas)' },
          { label: 'Variación antigénica', value: 'Drift (mutaciones) y Shift (reasociación)' },
          { label: 'Subtipos actuales', value: 'H1N1, H3N2 (humanos)' },
          { label: 'Reservorio natural', value: 'Aves acuáticas silvestres' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Gripe estacional: 3-5 millones casos severos/año',
          'Síntomas: Fiebre, mialgias, tos, cefalea, fatiga',
          'Complicaciones: Neumonía viral/bacteriana secundaria',
          'Pandemias históricas: 1918 (H1N1 "Española"), 1957 (H2N2), 1968 (H3N2), 2009 (H1N1)',
          'Mortalidad: 290,000-650,000 muertes/año (OMS)',
          'Grupos de riesgo: >65 años, embarazadas, inmunocomprometidos',
          'Tratamiento: Inhibidores de neuraminidasa (oseltamivir)',
          'Vacuna anual: Actualizada según cepas circulantes'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Hemaglutinina: Unión a receptor, fusión de membrana',
          'Neuraminidasa: Liberación viral, diseminación',
          'Proteína NS1: Antagonista de interferón, evasión inmune',
          'PB1-F2: Apoptosis, virulencia aumentada',
          'Variación antigénica: Drift (mutaciones puntuales) y Shift (reasociación)',
          'Tropismo: Epitelio respiratorio (α-2,6 humano, α-2,3 aviar)',
          'Neumonía viral primaria: Daño alveolar difuso'
        ]
      }
    ]
  },
  {
    id: 'hiv-1',
    nombre: 'Virus de Inmunodeficiencia Humana tipo 1 (VIH-1)',
    subtitulo: 'Retrovirus · RNA(+) diploide · Envoltura lipídica',
    icono: '🔴',
    categorias: ['rna', 'envueltos', 'retrovirus', 'pandemicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 100-120 nm con núcleo cónico',
          'Envoltura: Bicapa lipídica con espículas de gp120/gp41',
          'Cápside cónica: Proteína p24 (marcador diagnóstico)',
          'Genoma diploide: 2 copias de RNA(+) monocatenario',
          'Enzimas virales: Transcriptasa reversa (RT), integrasa (IN), proteasa (PR)',
          'Proteínas accesorias: Vif, Vpr, Vpu, Nef, Tat, Rev'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: gp120 se une a CD4 + correceptor (CCR5 o CXCR4)',
          'Fusión: gp41 media fusión de membranas',
          'Transcripción reversa: RNA → DNA proviral (RT)',
          'Integración: DNA proviral se integra en cromosoma (integrasa)',
          'Latencia: Provirus puede permanecer silente años',
          'Transcripción: RNA polimerasa II celular (activado por Tat)',
          'Procesamiento: Proteasa viral escinde poliproteínas',
          'Ensamblaje y gemación: Membrana plasmática',
          'Maduración: Proteólisis post-gemación'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(+) diploide' },
          { label: 'Tamaño genómico', value: '~9.7 kb (cada copia)' },
          { label: 'Genes estructurales', value: 'gag, pol, env' },
          { label: 'Genes reguladores', value: 'tat, rev' },
          { label: 'Genes accesorios', value: 'vif, vpr, vpu, nef' },
          { label: 'Variabilidad', value: '~1% mutaciones/genoma/ciclo' },
          { label: 'Grupos y subtipos', value: 'M (A-K), N, O, P' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'SIDA: Síndrome de inmunodeficiencia adquirida',
          'Transmisión: Sexual, sanguínea, vertical (madre-hijo)',
          'Fases: Infección aguda → latencia → SIDA (CD4+ <200)',
          'Infecciones oportunistas: Pneumocystis, Toxoplasma, CMV, TB',
          'Neoplasias: Sarcoma de Kaposi, linfomas',
          'Pandemia: ~39 millones viviendo con VIH (2023)',
          'Tratamiento: TAR (terapia antirretroviral) - supresión viral',
          'Profilaxis: PrEP (profilaxis pre-exposición) con tenofovir/emtricitabina',
          'Sin cura: Latencia viral en reservorios (linfocitos memoria)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Tropismo CD4+: Destrucción de linfocitos T helper',
          'Variación antigénica: Escape inmune continuo (hipermutación)',
          'Latencia viral: Provirus integrado en células de memoria',
          'Proteína Nef: Down-regulation de CD4 y MHC-I',
          'Proteína Vpu: Degradación de CD4, liberación viral',
          'Proteína Vif: Inhibe APOBEC3G (defensa celular)',
          'Integración: Persistencia permanente en genoma',
          'Inmunosupresión progresiva: Depleción CD4+, disfunción inmune'
        ]
      }
    ]
  },
  {
    id: 'hepatitis-b',
    nombre: 'Virus de la Hepatitis B (VHB)',
    subtitulo: 'Hepadnavirus · DNA circular parcialmente bicatenario · Envoltura',
    icono: '🟡',
    categorias: ['dna', 'envueltos', 'hepatotropicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 42 nm (partícula de Dane)',
          'Envoltura: HBsAg (antígeno de superficie), 3 proteínas (S, M, L)',
          'Nucleocápside: HBcAg (antígeno core), forma icosaédrica',
          'Genoma: DNA circular parcialmente bicatenario (~3.2 kb)',
          'Polimerasa viral: Con actividad transcriptasa reversa',
          'Partículas subvirales: Esferas y filamentos de HBsAg (exceso)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: HBsAg se une a NTCP (cotransportador hepatocítico)',
          'Liberación del core al citoplasma, transporte nuclear',
          'Reparación de DNA: Completar hebra (+) usando polimerasa viral',
          'Formación de cccDNA: DNA superenrollado estable (minicromosoma)',
          'Transcripción: RNA polimerasa II celular produce RNA pregenómico',
          'Encapsidación: RNA pregenómico + polimerasa en nucleocápside',
          'Transcripción reversa: RNA → DNA(-) → DNA(+) parcial',
          'Ensamblaje: Retículo endoplásmico, adquisición de envoltura',
          'Liberación: Vía secretora, sin lisis celular'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'DNA circular parcialmente bicatenario' },
          { label: 'Tamaño genómico', value: '3.2 kb' },
          { label: 'Genes', value: 'S, C, P, X (4 marcos de lectura solapados)' },
          { label: 'Genotipos', value: '10 genotipos (A-J)' },
          { label: 'Antígenos diagnósticos', value: 'HBsAg, HBeAg, HBcAg' },
          { label: 'Persistencia', value: 'cccDNA nuclear (reservorio estable)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Hepatitis B aguda: Ictericia, fatiga, náusea (70% asintomático)',
          'Hepatitis B crónica: 5-10% adultos, >90% neonatos',
          'Transmisión: Sanguínea, sexual, vertical (perinatal)',
          'Complicaciones crónicas: Cirrosis (20-30%), hepatocarcinoma (HCC)',
          'Carga global: 296 millones infectados crónicos (OMS, 2023)',
          'Mortalidad: ~820,000 muertes/año (cirrosis, HCC)',
          'Vacuna: Altamente efectiva (>95%), desde 1982',
          'Tratamiento: Análogos nucleós(t)idos (tenofovir, entecavir), interferón'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Persistencia: cccDNA nuclear estable, difícil de eliminar',
          'Integración genómica: Fragmentos de DNA viral en cromosomas (HCC)',
          'Proteína HBx: Transactivación, desregulación celular, oncogénesis',
          'Evasión inmune: HBeAg soluble (tolerancia), variantes escape',
          'Daño hepático: Principalmente inmunomediado (CTL)',
          'Reactivación: En inmunosupresión (quimioterapia)',
          'Mutantes escape: Variantes de HBsAg (escape vacunal)',
          'Coinfección: Agrava con VHD (virus delta)'
        ]
      }
    ]
  },
  {
    id: 'herpes-simplex-1',
    nombre: 'Virus Herpes Simple tipo 1 (VHS-1)',
    subtitulo: 'Alphaherpesvirus · DNA bicatenario · Envoltura lipídica',
    icono: '💋',
    categorias: ['dna', 'envueltos', 'neurotropicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 150-200 nm con estructura compleja',
          'Nucleocápside: Icosaédrica de 125 nm, 162 capsómeros',
          'Tegumento: Capa proteica entre cápside y envoltura',
          'Envoltura: Bicapa lipídica con 12+ glicoproteínas (gB, gD, gH/gL)',
          'Genoma: DNA bicatenario lineal de 152 kb',
          'Estructura: Core → Cápside → Tegumento → Envoltura'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: gD se une a nectin-1 o HVEM, fusión de membranas',
          'Liberación de cápside y tegumento al citoplasma',
          'Transporte al núcleo, liberación de DNA',
          'Expresión génica en cascada: IE (inmediato-temprano) → E (temprano) → L (tardío)',
          'Replicación: Círculo rodante (rolling circle) en núcleo',
          'Ensamblaje primario: Nucleocápside en núcleo',
          'Envoltura: Gemación en membrana nuclear interna',
          'Transporte: Vesículas trans-Golgi, exocitosis',
          'Latencia: Genoma episomal circular en neuronas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'DNA bicatenario lineal' },
          { label: 'Tamaño genómico', value: '~152 kb' },
          { label: 'Número de genes', value: '~80 genes' },
          { label: 'Estructura genómica', value: 'UL-IRS-US-TRS (segmentos únicos y repetidos)' },
          { label: 'Genes de latencia', value: 'LAT (latency-associated transcripts)' },
          { label: 'Genes esenciales', value: '~40 genes para replicación' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Herpes labial: Lesiones vesiculares orolabiales recurrentes',
          'Gingivoestomatitis primaria: Primera infección (niños)',
          'Queratitis herpética: Infección corneal, causa de ceguera',
          'Encefalitis herpética: Grave, afecta lóbulo temporal',
          'Herpes neonatal: Transmisión perinatal, diseminado',
          'Prevalencia: 50-80% adultos seropositivos globalmente',
          'Reactivación: Estrés, UV, fiebre, inmunosupresión',
          'Tratamiento: Aciclovir, valaciclovir (análogos nucleósidos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Latencia neuronal: Genoma episomal en ganglios sensitivos (trigémino)',
          'Reactivación periódica: Desde neuronas a epitelio',
          'Evasión inmune: ICP47 (bloquea TAP), vIL-10, gE-gI (bloquea Fc)',
          'Bloqueo de apoptosis: Múltiples proteínas antiapoptóticas',
          'Diseminación célula-célula: Evita anticuerpos neutralizantes',
          'Neurovirulencia: Tropismo por SNC, encefalitis',
          'Destrucción tisular: Efecto citopático directo',
          'Transmisión asintomática: Shedding viral sin lesiones'
        ]
      }
    ]
  },
  {
    id: 'papilomavirus',
    nombre: 'Virus del Papiloma Humano (VPH)',
    subtitulo: 'Papillomavirus · DNA circular bicatenario · Sin envoltura',
    icono: '🎗️',
    categorias: ['dna', 'no-envueltos', 'oncogenicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Icosaédrica de 50-60 nm',
          'Cápside: 72 capsómeros pentaméricos (L1 y L2)',
          'Sin envoltura: Virus desnudo, muy resistente',
          'Genoma: DNA circular bicatenario de ~8 kb',
          'Proteínas L: L1 (mayor, 80%), L2 (menor)',
          'Más de 200 tipos: Clasificados por secuencia L1'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: Micro-abrasiones en epitelio estratificado',
          'Unión: L1 a heparán sulfato, receptor secundario (α6-integrina)',
          'Internalización: Endocitosis mediada por clatrina',
          'Transporte nuclear: DNA viral liberado en núcleo',
          'Replicación en capa basal: Bajo nivel, episomal (30-100 copias)',
          'Amplificación en capa suprabasal: Diferenciación celular activa genes tardíos',
          'Producción de viriones: Solo en células diferenciadas superficiales',
          'Liberación: Descamación de queratinocitos',
          'Persistencia: Replicación episomal en células basales'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'DNA circular bicatenario' },
          { label: 'Tamaño genómico', value: '~8 kb' },
          { label: 'Genes tempranos', value: 'E1, E2, E4, E5, E6, E7' },
          { label: 'Genes tardíos', value: 'L1, L2' },
          { label: 'Oncogenes', value: 'E6, E7 (tipos alto riesgo)' },
          { label: 'Tipos alto riesgo', value: '16, 18, 31, 33, 45, 52, 58' },
          { label: 'Tipos bajo riesgo', value: '6, 11 (verrugas genitales)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Verrugas cutáneas: VPH 1, 2, 4 (comunes, plantares)',
          'Condilomas acuminados: VPH 6, 11 (verrugas genitales)',
          'Cáncer cervicouterino: VPH 16, 18 (70% de casos)',
          'Cánceres anogenitales: Vulva, vagina, pene, ano',
          'Cáncer orofaríngeo: VPH 16 principalmente',
          'Carga global: 570,000 casos cáncer cervical/año',
          'Mortalidad: ~311,000 muertes/año (cáncer cervical)',
          'Vacunas: Bivalente (16,18), Cuadrivalente (6,11,16,18), Nonavalente',
          'Detección: Papanicolaou, test VPH, genotipificación'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Oncoproteína E6: Degrada p53 (guardián del genoma)',
          'Oncoproteína E7: Inactiva pRb (regulador ciclo celular)',
          'Resultado E6+E7: Proliferación descontrolada, inestabilidad genómica',
          'Integración genómica: Disrupción de E2, sobreexpresión E6/E7',
          'Evasión inmune: Ciclo intraepitelial, sin viremia, bajo IFN',
          'Persistencia: Infección crónica (10-20 años hasta cáncer)',
          'Transformación neoplásica: Multietapa (displasia → carcinoma)',
          'Cofactores: Tabaco, inmunosupresión, coinfecciones'
        ]
      }
    ]
  },
  {
    id: 'hepatitis-c',
    nombre: 'Virus de la Hepatitis C (VHC)',
    subtitulo: 'Hepacivirus · RNA(+) monocatenario · Envoltura lipídica',
    icono: '🟠',
    categorias: ['rna', 'envueltos', 'hepatotropicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 50-80 nm',
          'Envoltura: Glicoproteínas E1 y E2 (alta variabilidad)',
          'Nucleocápside: Proteína Core formando cápside icosaédrica',
          'Genoma: RNA(+) monocatenario de ~9.6 kb',
          'Poliproteína única: Procesada por proteasas celulares y virales',
          'Sin fase DNA: Replicación exclusivamente por RNA'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: E2 se une a CD81, SR-BI, claudina-1, ocludina',
          'Endocitosis: Mediada por clatrina, fusión pH-dependiente',
          'Liberación de RNA(+) al citoplasma',
          'Traducción: IRES (internal ribosome entry site) independiente de cap',
          'Procesamiento: Poliproteína escindida por peptidasas celulares y NS2/3, NS3/4A',
          'Replicación: Membranous web (retículo endoplásmico), RNA(-) intermediario',
          'Ensamblaje: Asociado a gotículas lipídicas',
          'Liberación: Vía secretora (VLDL), lipoviropartículas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(+) monocatenario' },
          { label: 'Tamaño genómico', value: '~9.6 kb' },
          { label: 'Poliproteína', value: '~3,000 aminoácidos' },
          { label: 'Proteínas estructurales', value: 'Core, E1, E2' },
          { label: 'Proteínas no estructurales', value: 'p7, NS2, NS3, NS4A, NS4B, NS5A, NS5B' },
          { label: 'Genotipos', value: '8 genotipos principales (1-8)' },
          { label: 'Cuasiespecies', value: 'Alta variabilidad (10⁻³ mutaciones/nt/año)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Hepatitis C aguda: 70-80% asintomática',
          'Hepatitis C crónica: 55-85% de infectados agudos',
          'Transmisión: Parenteral (sangre), raramente sexual/vertical',
          'Complicaciones: Cirrosis (20% a 20 años), hepatocarcinoma',
          'Manifestaciones extrahepáticas: Crioglobulinemia, glomerulonefritis',
          'Carga global: ~50 millones infectados crónicos (OMS, 2024)',
          'Mortalidad: ~290,000 muertes/año',
          'Tratamiento: DAAs (antivirales de acción directa) - curación >95%',
          'Sin vacuna: Alta variabilidad antigénica'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Persistencia viral: 55-85% cronificación (única entre hepatitis virales)',
          'Evasión inmune: Hipervariabilidad E2 (HVR1), interferencia con IFN',
          'NS3/4A proteasa: Cliva MAVS (señalización antiviral)',
          'Cuasiespecies: Población viral heterogénea, escape inmune',
          'Asociación a lípidos: Lipoviropartículas (LVP), escape de anticuerpos',
          'Daño hepático: Principalmente inmunomediado, esteatosis',
          'Sin integración: Replicación citoplasmática exclusiva',
          'Resistencia a antivirales: Mutaciones en NS3, NS5A, NS5B (pre-DAAs)'
        ]
      }
    ]
  },
  {
    id: 'ebola',
    nombre: 'Virus Ébola (EBOV)',
    subtitulo: 'Filovirus · RNA(-) monocatenario · Envoltura lipídica',
    icono: '🩸',
    categorias: ['rna', 'envueltos', 'hemorragicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Filamentosa pleomórfica, longitud variable (800-1,000 nm)',
          'Diámetro: ~80 nm uniforme',
          'Envoltura: Glicoproteína GP en espículas triméricas',
          'Nucleocápside: Helicoidal con proteína NP',
          'Genoma: RNA(-) monocatenario de ~19 kb',
          'Morfología característica: Forma de "bastón de pastor" o "6"'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: GP se une a NPC1 (Niemann-Pick C1) tras endocitosis',
          'Fusión: Procesamiento de GP por catepsina B/L, fusión pH-baja',
          'Liberación de nucleocápside al citoplasma',
          'Transcripción: RNA polimerasa viral (L) produce mRNA',
          'Replicación: Antigenoma (+) como intermediario',
          'Traducción: Ribosomas celulares',
          'Ensamblaje: Proteína VP40 (matriz) en membrana plasmática',
          'Gemación: Liberación de viriones filamentosos',
          'Cuerpos de inclusión: Sitios de replicación citoplasmáticos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(-) monocatenario no segmentado' },
          { label: 'Tamaño genómico', value: '~19 kb' },
          { label: 'Número de genes', value: '7 genes (NP, VP35, VP40, GP, VP30, VP24, L)' },
          { label: 'Proteínas estructurales', value: 'NP, VP35, VP40, GP, VP30, VP24, L' },
          { label: 'Especies', value: 'Zaire (EBOV), Sudan, Bundibugyo, Taï Forest, Reston' },
          { label: 'Reservorio natural', value: 'Murciélagos frugívoros (Pteropodidae)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Enfermedad por virus Ébola (EVE): Fiebre hemorrágica viral',
          'Síntomas: Fiebre, vómito, diarrea, hemorragias, fallo multiorgánico',
          'Transmisión: Contacto directo con fluidos corporales',
          'Periodo de incubación: 2-21 días (promedio 8-10)',
          'Mortalidad: 25-90% según brote (promedio ~50%)',
          'Brotes mayores: África Occidental 2014-2016 (>11,000 muertes)',
          'República Democrática del Congo: Brotes recurrentes',
          'Tratamiento: Cuidados de soporte, anticuerpos monoclonales (mAb114, REGN-EB3)',
          'Vacunas: rVSV-ZEBOV (Ervebo) - eficacia >97%'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Glicoproteína soluble (sGP): Señuelo para anticuerpos',
          'VP35 y VP24: Antagonistas de interferón, evasión inmune',
          'Tropismo amplio: Macrófagos, células dendríticas, hepatocitos, endotelio',
          'Tormenta de citoquinas: Producción masiva IL-6, TNF-α, IL-1β',
          'Disfunción endotelial: Aumento de permeabilidad, hemorragia',
          'Linfopenia: Apoptosis de linfocitos (bystander)',
          'Coagulopatía: Consumo de factores, CID',
          'Shock y fallo multiorgánico: Disfunción hepática, renal, cardiaca'
        ]
      }
    ]
  },
  {
    id: 'varicela-zoster',
    nombre: 'Virus Varicela-Zóster (VVZ)',
    subtitulo: 'Alphaherpesvirus · DNA bicatenario · Envoltura lipídica',
    icono: '🔵',
    categorias: ['dna', 'envueltos', 'neurotropicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 150-200 nm',
          'Nucleocápside: Icosaédrica de 100 nm',
          'Tegumento: Capa proteica entre cápside y envoltura',
          'Envoltura: 7 glicoproteínas principales (gE, gI, gB, gH, gL, gC, gK)',
          'Genoma: DNA bicatenario lineal de ~125 kb',
          'Estructura similar a VHS: Familia Herpesviridae'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: Fusión directa o endocitosis',
          'Transporte al núcleo, liberación de DNA',
          'Expresión génica cascada: α (IE) → β (E) → γ (L)',
          'Replicación: Rolling circle en núcleo',
          'Ensamblaje: Nucleocápside en núcleo',
          'Envoltura primaria: Gemación en membrana nuclear interna',
          'Desenvoltura y re-envoltura: Trans-Golgi',
          'Diseminación célula-célula: Principalmente por fusión',
          'Latencia: Ganglios sensitivos dorsales, craneales'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'DNA bicatenario lineal' },
          { label: 'Tamaño genómico', value: '~125 kb' },
          { label: 'Número de genes', value: '~70 genes' },
          { label: 'Homología con VHS', value: '~50% (mismo género)' },
          { label: 'Genes de latencia', value: 'VLT (VZV latency transcript)' },
          { label: 'Cepa única', value: 'Una sola especie (variantes clados)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Varicela (primoinfección): Exantema vesicular generalizado, fiebre',
          'Herpes zóster (reactivación): Erupción vesicular dermatomal dolorosa',
          'Neuralgia postherpética: Dolor crónico post-zóster (>50 años)',
          'Complicaciones varicela: Neumonía, encefalitis, síndrome de Reye',
          'Varicela congénita: Infección materna primer trimestre',
          'Infección neonatal: Transmisión periparto, puede ser severa',
          'Prevalencia: >90% adultos seropositivos (pre-vacuna)',
          'Vacuna: Virus vivo atenuado (cepa Oka), eficacia >90%',
          'Tratamiento: Aciclovir, valaciclovir, famciclovir'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Latencia neuronal: DNA episomal en ganglios sensitivos',
          'Reactivación: Declive inmunidad celular (edad, inmunosupresión)',
          'Diseminación célula-célula: Evasión de anticuerpos neutralizantes',
          'Proteína gE-gI: Bloqueo de Fc, diseminación',
          'Tropismo dual: Piel (varicela) y nervios (latencia, zóster)',
          'Viremia: Dos ondas (primaria y secundaria)',
          'Neuralgia: Inflamación ganglionar, daño nervioso',
          'Inmunidad: Celular esencial (CMI), protección de por vida'
        ]
      }
    ]
  },
  {
    id: 'rotavirus',
    nombre: 'Rotavirus',
    subtitulo: 'Reoviridae · RNA bicatenario segmentado · Sin envoltura',
    icono: '🎡',
    categorias: ['rna', 'no-envueltos', 'gastrointestinales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Icosaédrica de 70-75 nm, apariencia de "rueda" al ME',
          'Triple cápside: Core, cápside interna, cápside externa',
          'Proteínas VP (viral protein): VP1-VP7',
          'Proteínas NSP (no estructurales): NSP1-NSP6',
          'Genoma: 11 segmentos de RNA bicatenario (~18 kb total)',
          'Sin envoltura: Virus desnudo, muy estable'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: VP4 se une a ácido siálico, integrinas, hsc70',
          'Penetración: Endocitosis, pérdida de capa externa',
          'Partícula de doble capa (DLP) activa en citoplasma',
          'Transcripción: Dentro de DLP intacta, mRNA sale por canales',
          'Traducción: Ribosomas celulares',
          'Replicación: (+)RNA templado para (-)RNA en viroplasma',
          'Ensamblaje: Viroplasma citoplasmático (NSP2, NSP5)',
          'Maduración: Adquisición de capa externa en RE',
          'Liberación: Lisis celular o exocitosis no lítica'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA bicatenario segmentado' },
          { label: 'Número de segmentos', value: '11 segmentos' },
          { label: 'Tamaño total', value: '~18.5 kb' },
          { label: 'Proteínas codificadas', value: '12 proteínas (6 VP, 6 NSP)' },
          { label: 'Grupos', value: '10 grupos (A-J), A es predominante' },
          { label: 'Serotipos', value: 'Dual: G (VP7) y P (VP4)' },
          { label: 'Serotipos comunes', value: 'G1P[8], G2P[4], G3P[8], G4P[8], G9P[8]' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Gastroenteritis aguda: Diarrea acuosa, vómito, fiebre, deshidratación',
          'Principal causa: Diarrea severa en lactantes/niños <5 años',
          'Transmisión: Fecal-oral, altamente contagioso',
          'Periodo de incubación: 1-3 días',
          'Duración: 3-8 días de síntomas',
          'Mortalidad: ~200,000 muertes/año globalmente (pre-vacuna)',
          'Vacunas: Rotarix (monovalente), RotaTeq (pentavalente)',
          'Impacto vacunal: Reducción >85% hospitalizaciones',
          'Tratamiento: Rehidratación oral/IV (no antivirales específicos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Tropismo: Enterocitos maduros de vellosidades intestinales',
          'Destrucción de enterocitos: Acortamiento de vellosidades',
          'Malabsorción: Pérdida de disacaridasas (lactasa)',
          'NSP4 (enterotoxina viral): Secretagoogo, aumenta Ca²⁺ intracelular',
          'Diarrea secretora: Secreción de Cl⁻ y agua',
          'Resistencia ambiental: Estable a pH bajo, desinfectantes',
          'Dosis infectiva baja: 10-100 partículas virales',
          'Excreción masiva: 10¹⁰-10¹² partículas/g heces',
          'Evasión inmune: NSP1 degrada IRF3/IRF7 (señalización IFN)'
        ]
      }
    ]
  },
  {
    id: 'dengue',
    nombre: 'Virus del Dengue (DENV)',
    subtitulo: 'Flavivirus · RNA(+) monocatenario · Envoltura lipídica',
    icono: '🦟',
    categorias: ['rna', 'envueltos', 'arbovirus'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Esférica de 50 nm',
          'Envoltura: Proteína E (envelope) en simetría icosaédrica',
          'Proteína M (membrana): Pequeña, en envoltura',
          'Nucleocápside: Proteína C + RNA genómico',
          'Genoma: RNA(+) monocatenario de ~11 kb',
          '4 serotipos: DENV-1, DENV-2, DENV-3, DENV-4'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: Proteína E se une a receptores celulares (DC-SIGN, heparan sulfato)',
          'Endocitosis: Mediada por receptor',
          'Fusión: Cambio conformacional de E a pH bajo endosomal',
          'Liberación de RNA(+) al citoplasma',
          'Traducción: Poliproteína única (3,391 aa)',
          'Procesamiento: Proteasas celulares y viral (NS2B/NS3)',
          'Replicación: RE, RNA(-) intermediario, vesículas inducidas',
          'Ensamblaje: Lumen del RE',
          'Maduración: Proteólisis de prM → M en Golgi (furina)',
          'Liberación: Exocitosis'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(+) monocatenario' },
          { label: 'Tamaño genómico', value: '~10.7 kb' },
          { label: 'Marco de lectura único', value: 'Poliproteína 3,391 aa' },
          { label: 'Proteínas estructurales', value: 'C, prM/M, E' },
          { label: 'Proteínas no estructurales', value: 'NS1, NS2A, NS2B, NS3, NS4A, NS4B, NS5' },
          { label: 'Genotipos', value: 'Múltiples por serotipo' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Fiebre del dengue: Fiebre, cefalea, dolor retro-orbital, mialgias, rash',
          'Dengue severo: Hemorragias, extravasación plasmática, shock (DSS)',
          'Transmisión: Mosquito Aedes aegypti (urbano), A. albopictus',
          'Distribución: Tropical y subtropical (>100 países)',
          'Incidencia: ~390 millones infecciones/año',
          'Mortalidad: 2-5% dengue severo sin tratamiento, <1% con manejo',
          'Dengue secundario: Mayor riesgo de severidad (ADE)',
          'Vacuna: Dengvaxia (solo para seropositivos), TAK-003, Qdenga',
          'Tratamiento: Sintomático, hidratación (no aspirina)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'ADE (antibody-dependent enhancement): Infección secundaria heterotípica agravada',
          'Anticuerpos no neutralizantes: Facilitan entrada a células Fcγ+',
          'Tormenta de citoquinas: TNF-α, IL-6, IL-10 en dengue severo',
          'Aumento permeabilidad vascular: Extravasación plasmática, shock',
          'NS1 secretada: Disfunción endotelial, marcador diagnóstico',
          'Trombocitopenia: Supresión medular, destrucción periférica',
          'Hepatotropismo: Elevación transaminasas',
          'Escape inmune: NS2B/3 cliva STING, NS4B antagoniza IFN'
        ]
      }
    ]
  },
  {
    id: 'rabia',
    nombre: 'Virus de la Rabia (RABV)',
    subtitulo: 'Lyssavirus · RNA(-) monocatenario · Envoltura lipídica',
    icono: '🦇',
    categorias: ['rna', 'envueltos', 'neurotropicos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilliforme (forma de bala) de 180 x 75 nm',
          'Envoltura: Glicoproteína G en espículas triméricas',
          'Matriz: Proteína M bajo envoltura',
          'Nucleocápside: Helicoidal con proteína N',
          'Genoma: RNA(-) monocatenario de ~12 kb',
          'Complejo RNA-polimerasa: Proteínas L y P'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Replicación',
        items: [
          'Entrada: Proteína G se une a receptores neuronales (nAChR, NCAM)',
          'Endocitosis: Mediada por receptor',
          'Fusión: pH bajo endosomal',
          'Liberación de RNP al citoplasma',
          'Transcripción: Polimerasa L en RNP, mRNA 5\'-cap',
          'Replicación: Antigenoma (+) intermediario',
          'Ensamblaje: Sitios perinucleares, condensación con proteína M',
          'Gemación: Membrana plasmática o intracelular',
          'Transporte neuronal: Retrógrado (sitio mordida → SNC)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tipo de genoma', value: 'RNA(-) monocatenario no segmentado' },
          { label: 'Tamaño genómico', value: '~12 kb' },
          { label: 'Número de genes', value: '5 genes (N, P, M, G, L)' },
          { label: 'Orden de genes', value: '3\'-N-P-M-G-L-5\'' },
          { label: 'Genotipos', value: 'Genotipo 1 clásico + 16 Lyssavirus relacionados' },
          { label: 'Reservorios', value: 'Murciélagos, carnívoros (perros, zorros, mapaches)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Rabia (hidrofobia): Encefalitis aguda progresiva, casi 100% mortal',
          'Transmisión: Mordedura de animal infectado (saliva)',
          'Periodo de incubación: 1-3 meses (rango: 1 semana - 1 año)',
          'Síntomas prodrómicos: Fiebre, parestesia en sitio de mordida',
          'Fase neurológica: Hidrofobia, aerofobia, hiperestesia, parálisis',
          'Rabia furiosa: 80%, agitación, hipersalivación',
          'Rabia paralítica: 20%, parálisis ascendente',
          'Mortalidad: ~59,000 muertes/año (95% África y Asia)',
          'Profilaxis post-exposición: Vacuna + inmunoglobulina (99% efectiva)',
          'Sin tratamiento: Casi siempre fatal una vez sintomático'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Patogenicidad',
        items: [
          'Neurotropismo: Receptores nicotínicos, NCAM en neuronas',
          'Transporte axonal retrógrado: Nervio periférico → SNC',
          'Evasión inmune: Proteína P antagoniza IFN, proteína M bloquea transcripción',
          'Replicación sin CPE: Mínimo efecto citopático, disfunción neuronal',
          'Cuerpos de Negri: Inclusiones citoplasmáticas (patognomónicas)',
          'Diseminación centrífuga: SNC → glándulas salivales',
          'Alteración conductual: Agresividad aumenta transmisión',
          'Barrera hematoencefálica: Escasa respuesta inflamatoria inicial'
        ]
      }
    ]
  }
];
