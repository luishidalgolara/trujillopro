// ═══════════════════════════════════════════════════════════
// INMUNOLOGÍA - Base de datos de conceptos
// ═══════════════════════════════════════════════════════════

const INMUNOLOGIA_DATA = [
  {
    id: 'inmunidad-innata',
    nombre: 'Inmunidad Innata',
    icono: '🛡️',
    subtitulo: 'Primera línea de defensa del organismo',
    categorias: ['innata', 'respuesta'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características principales',
        items: [
          'Respuesta rápida (minutos a horas)',
          'No específica, reconoce patrones moleculares conservados (PAMPs)',
          'No genera memoria inmunológica',
          'Presente desde el nacimiento',
          'Idéntica en cada exposición al patógeno',
          'Activación mediante receptores de reconocimiento de patrones (PRRs)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Componentes celulares',
        items: [
          'Neutrófilos: fagocitosis y degranulación',
          'Macrófagos: fagocitosis, presentación antigénica, citocinas',
          'Células dendríticas: presentación antigénica, puente con inmunidad adaptativa',
          'Células NK (Natural Killer): citotoxicidad contra células infectadas o tumorales',
          'Basófilos y eosinófilos: respuesta a parásitos y alérgenos',
          'Mastocitos: respuesta inflamatoria y alérgica'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Componentes moleculares',
        items: [
          'Sistema del complemento (C1-C9)',
          'Citocinas proinflamatorias (IL-1, IL-6, TNF-α)',
          'Interferones tipo I (IFN-α, IFN-β)',
          'Proteínas de fase aguda (PCR, SAA)',
          'Lisozima, lactoferrina, defensinas',
          'Colectinas y pentraxinas'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Defectos en inmunidad innata: infecciones bacterianas recurrentes (enfermedad granulomatosa crónica)',
          'Sepsis: respuesta innata descontrolada con liberación masiva de citocinas',
          'Enfermedades autoinflamatorias: activación inapropiada de inmunidad innata (fiebre mediterránea familiar)',
          'Vacunas: adjuvantes activan inmunidad innata para potenciar respuesta adaptativa'
        ]
      }
    ]
  },

  {
    id: 'inmunidad-adaptativa',
    nombre: 'Inmunidad Adaptativa',
    icono: '🎯',
    subtitulo: 'Respuesta específica y con memoria',
    categorias: ['adaptativa', 'respuesta'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características principales',
        items: [
          'Respuesta lenta (días a semanas)',
          'Altamente específica para antígenos particulares',
          'Genera memoria inmunológica de larga duración',
          'Mejora con exposiciones repetidas (respuesta secundaria)',
          'Mediada por linfocitos T y B',
          'Diversidad generada por recombinación somática (10¹² especificidades posibles)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inmunidad celular (Linfocitos T)',
        items: [
          'Linfocitos T CD8⁺ citotóxicos: eliminan células infectadas por virus o tumorales',
          'Linfocitos T CD4⁺ helper (Th): coordinan respuesta inmune',
          'Th1: activan macrófagos, inmunidad contra patógenos intracelulares',
          'Th2: activan eosinófilos y mastocitos, respuesta contra parásitos',
          'Th17: reclutan neutrófilos, defensa contra hongos y bacterias extracelulares',
          'Linfocitos T reguladores (Treg): suprimen respuesta inmune, previenen autoinmunidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inmunidad humoral (Linfocitos B)',
        items: [
          'Producción de anticuerpos específicos',
          'IgM: primera respuesta, pentámero, activa complemento',
          'IgG: respuesta secundaria, cruza placenta, opsonización',
          'IgA: mucosas (secretora), leche materna',
          'IgE: respuesta alérgica y antiparasitaria',
          'Células B de memoria: respuesta rápida en reexposición',
          'Células plasmáticas: secretan anticuerpos (hasta 2000/segundo)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Diferencias clave entre respuestas',
        datos: [
          { label: 'Velocidad', value: 'Innata: horas / Adaptativa: días-semanas' },
          { label: 'Especificidad', value: 'Innata: PAMPs / Adaptativa: antígenos específicos' },
          { label: 'Memoria', value: 'Innata: NO / Adaptativa: SÍ (décadas)' },
          { label: 'Diversidad', value: 'Innata: limitada (~100 receptores) / Adaptativa: >10¹²' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Inmunodeficiencias combinadas severas (SCID): ausencia de linfocitos T y B funcionales',
          'VIH/SIDA: destrucción de linfocitos T CD4⁺',
          'Enfermedades autoinmunes: pérdida de tolerancia (lupus, artritis reumatoide, diabetes tipo 1)',
          'Rechazo de trasplantes: respuesta adaptativa contra aloantígenos',
          'Vacunación: genera memoria inmunológica protectora'
        ]
      }
    ]
  },

  {
    id: 'linfocito-t',
    nombre: 'Linfocitos T',
    icono: '🔴',
    subtitulo: 'Células efectoras de inmunidad celular',
    categorias: ['celulas', 'adaptativa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Origen y maduración',
        items: [
          'Originan en médula ósea de células madre hematopoyéticas',
          'Maduran en el timo (selección positiva y negativa)',
          'Selección positiva: reconocen MHC propio',
          'Selección negativa: eliminan autorreactivos (tolerancia central)',
          '95-98% de timocitos mueren durante selección',
          'Emigran como células T naive a tejidos linfoides secundarios'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Marcadores de superficie y receptores',
        datos: [
          { label: 'TCR (Receptor de células T)', value: 'Reconoce péptidos en MHC' },
          { label: 'CD3', value: 'Complejo de señalización del TCR' },
          { label: 'CD4', value: 'Correceptor, reconoce MHC-II' },
          { label: 'CD8', value: 'Correceptor, reconoce MHC-I' },
          { label: 'CD28', value: 'Receptor coestimulador (señal 2)' },
          { label: 'CTLA-4', value: 'Receptor inhibidor (checkpoint)' },
          { label: 'PD-1', value: 'Receptor inhibidor (checkpoint)' },
          { label: 'CD25', value: 'Receptor de IL-2 (activación)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Subpoblaciones de linfocitos T CD4⁺',
        items: [
          'Th1: producen IFN-γ, IL-2; activan macrófagos; patógenos intracelulares',
          'Th2: producen IL-4, IL-5, IL-13; activan eosinófilos; parásitos helmínticos',
          'Th17: producen IL-17, IL-22; reclutan neutrófilos; hongos y bacterias extracelulares',
          'Tfh (T folicular helper): ayudan a células B en centros germinales',
          'Treg: producen IL-10, TGF-β; suprimen respuesta inmune; expresan FoxP3',
          'Diferenciación determinada por citocinas del microambiente'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Linfocitos T CD8⁺ citotóxicos (CTL)',
        items: [
          'Reconocen antígenos presentados en MHC-I',
          'Eliminan células infectadas por virus o tumorales',
          'Mecanismos citotóxicos: perforinas y granzimas',
          'Inducen apoptosis vía Fas-FasL',
          'Secretan IFN-γ y TNF-α',
          'Células de memoria CD8⁺ persisten décadas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Activación de linfocitos T',
        items: [
          'Señal 1: TCR reconoce péptido-MHC en célula presentadora de antígeno (APC)',
          'Señal 2: CD28 interactúa con B7 (CD80/CD86) en APC (coestimulación)',
          'Señal 3: citocinas (IL-12, IL-4, TGF-β) determinan diferenciación',
          'Sin señal 2: anergia o muerte celular',
          'Activación completa: proliferación clonal, diferenciación a efectoras y memoria',
          'Células de memoria: circulan décadas, respuesta rápida en reexposición'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'VIH: infecta y destruye linfocitos T CD4⁺ (receptor CD4 + CCR5/CXCR4)',
          'Inmunoterapia contra cáncer: inhibidores de checkpoints (anti-PD-1, anti-CTLA-4)',
          'CAR-T cells: linfocitos T modificados genéticamente para atacar tumores',
          'Enfermedad injerto contra huésped: linfocitos T del donante atacan tejidos del receptor',
          'Síndrome de DiGeorge: ausencia de timo, deficiencia de linfocitos T'
        ]
      }
    ]
  },

  {
    id: 'linfocito-b',
    nombre: 'Linfocitos B',
    icono: '🔵',
    subtitulo: 'Células productoras de anticuerpos',
    categorias: ['celulas', 'adaptativa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Origen y maduración',
        items: [
          'Originan y maduran en médula ósea',
          'Reordenamiento VDJ genera diversidad de BCR (10¹² especificidades)',
          'Selección negativa elimina células autorreactivas (tolerancia central)',
          'Células B naive expresan IgM e IgD de superficie',
          'Migran a órganos linfoides secundarios (bazo, ganglios linfáticos)',
          'Zonas B: folículos linfoides en corteza de ganglios'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Marcadores de superficie',
        datos: [
          { label: 'BCR (Receptor de células B)', value: 'Inmunoglobulina de membrana + Igα/Igβ' },
          { label: 'CD19, CD20, CD21', value: 'Marcadores pan-B' },
          { label: 'CD40', value: 'Recibe señal de ayuda de Th (CD40L)' },
          { label: 'MHC-II', value: 'Presenta antígenos a linfocitos T CD4⁺' },
          { label: 'CD27', value: 'Marcador de células B de memoria' },
          { label: 'CD138', value: 'Marcador de células plasmáticas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Activación y respuesta',
        items: [
          'Respuesta T-independiente: antígenos polisacáridos, IgM, sin memoria',
          'Respuesta T-dependiente: antígenos proteicos, requiere ayuda de Th',
          'Formación de centros germinales en folículos linfoides',
          'Hipermutación somática: aumenta afinidad del anticuerpo',
          'Cambio de isotipo (class switching): IgM → IgG/IgA/IgE',
          'Diferenciación: células plasmáticas (vida corta) y células B de memoria (vida larga)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Células plasmáticas',
        items: [
          'Células B diferenciadas especializadas en secretar anticuerpos',
          'Producen hasta 2000 moléculas de anticuerpo por segundo',
          'Retículo endoplasmático rugoso muy desarrollado',
          'Vida corta (3-5 días) excepto en médula ósea (meses-años)',
          'Pierden expresión de MHC-II y BCR de superficie',
          'Expresan CD138 (sindecan-1)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Células B de memoria',
        items: [
          'Vida larga (décadas)',
          'Circulan por sangre y tejidos linfoides',
          'Expresan BCR de alta afinidad por hipermutación somática',
          'Respuesta rápida y potente en reexposición (respuesta secundaria)',
          'Expresan isotipo cambiado (IgG, IgA)',
          'Base de la memoria inmunológica y eficacia vacunal'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Agammaglobulinemia de Bruton: mutación BTK, ausencia de células B maduras',
          'Deficiencia de IgA: más común, infecciones respiratorias y gastrointestinales',
          'Linfomas B: linfoma de Hodgkin, linfoma no Hodgkin, mieloma múltiple',
          'Rituximab (anti-CD20): terapia contra linfomas y enfermedades autoinmunes',
          'Leucemia linfocítica crónica (LLC): más común en adultos mayores'
        ]
      }
    ]
  },

  {
    id: 'anticuerpos',
    nombre: 'Anticuerpos (Inmunoglobulinas)',
    icono: '🧬',
    subtitulo: 'Proteínas efectoras de inmunidad humoral',
    categorias: ['moleculas', 'adaptativa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Estructura básica',
        items: [
          'Forma de Y: 2 cadenas pesadas + 2 cadenas ligeras',
          'Región Fab: fragmento de unión a antígeno (variable)',
          'Región Fc: fragmento cristalizable (constante), efectora',
          'Regiones variables (VH, VL): determinan especificidad',
          'Regiones constantes (CH, CL): determinan isotipo y función efectora',
          'Puentes disulfuro unen las cadenas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Isotipos de inmunoglobulinas',
        datos: [
          { label: 'IgM', value: 'Pentámero, 970 kDa, primera respuesta, activa complemento eficientemente' },
          { label: 'IgG', value: 'Monómero, 150 kDa, más abundante (75%), cruza placenta, opsonización' },
          { label: 'IgA', value: 'Dímero en mucosas, protege superficies, leche materna, saliva' },
          { label: 'IgE', value: 'Monómero, alergias, parásitos, degranula mastocitos y basófilos' },
          { label: 'IgD', value: 'Monómero, BCR de células B naive, función poco conocida' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Subclases de IgG (humana)',
        items: [
          'IgG1: 60-65%, opsonización, activa complemento, cruza placenta',
          'IgG2: 20-25%, respuesta a polisacáridos bacterianos',
          'IgG3: 5-10%, activa complemento más eficientemente, vida media corta',
          'IgG4: 5%, no activa complemento, respuesta Th2, alergias'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Funciones efectoras',
        items: [
          'Neutralización: bloquea toxinas y previene entrada viral',
          'Opsonización: marca patógenos para fagocitosis (vía receptores Fc)',
          'Activación del complemento: cascada lítica (IgM, IgG1, IgG3)',
          'Citotoxicidad celular dependiente de anticuerpos (ADCC): células NK',
          'Degranulación de mastocitos: IgE induce liberación de histamina',
          'Transporte a través de epitelios: IgA secretora'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Receptores Fc',
        datos: [
          { label: 'FcγRI (CD64)', value: 'Alta afinidad, macrófagos/neutrófilos, opsonización' },
          { label: 'FcγRII (CD32)', value: 'Baja afinidad, fagocitos, modulación' },
          { label: 'FcγRIII (CD16)', value: 'Baja afinidad, NK cells, ADCC' },
          { label: 'FcεRI', value: 'Alta afinidad, mastocitos/basófilos, IgE, alergia' },
          { label: 'FcαR (CD89)', value: 'IgA, fagocitos de mucosas' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Terapia con anticuerpos monoclonales: trastuzumab (cáncer), rituximab (linfoma)',
          'Inmunoglobulina intravenosa (IVIG): inmunodeficiencias, enfermedades autoinmunes',
          'Enfermedad hemolítica del recién nacido: IgG anti-Rh cruza placenta',
          'Hipersensibilidad tipo I: IgE media anafilaxia y asma alérgica',
          'Deficiencia selectiva de IgA: infecciones respiratorias recurrentes'
        ]
      }
    ]
  },

  {
    id: 'mhc',
    nombre: 'Complejo Mayor de Histocompatibilidad (MHC)',
    icono: '🧩',
    subtitulo: 'Moléculas presentadoras de antígenos',
    categorias: ['moleculas', 'adaptativa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'MHC (ratón) = HLA (humano, Human Leukocyte Antigen)',
          'Genes más polimórficos del genoma humano',
          'Expresión codominante (ambos alelos se expresan)',
          'Cada individuo expresa 6 MHC-I y 6-8 MHC-II diferentes',
          'Polimorfismo permite presentar amplio repertorio de péptidos',
          'Determina compatibilidad en trasplantes'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'MHC Clase I vs Clase II',
        datos: [
          { label: 'MHC-I', value: 'Cadena α + β2-microglobulina, presenta péptidos 8-10 aa' },
          { label: 'Expresión MHC-I', value: 'Todas las células nucleadas' },
          { label: 'Origen péptidos I', value: 'Citosol (vía endógena: virus, tumores)' },
          { label: 'Reconocido por', value: 'Linfocitos T CD8⁺' },
          { label: 'MHC-II', value: 'Cadena α + cadena β, presenta péptidos 13-25 aa' },
          { label: 'Expresión MHC-II', value: 'APCs (células dendríticas, macrófagos, células B)' },
          { label: 'Origen péptidos II', value: 'Endosomas (vía exógena: bacterias, toxinas)' },
          { label: 'Reconocido por', value: 'Linfocitos T CD4⁺' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Genes HLA en humanos',
        items: [
          'MHC Clase I: HLA-A, HLA-B, HLA-C (cromosoma 6)',
          'MHC Clase II: HLA-DP, HLA-DQ, HLA-DR (cromosoma 6)',
          'MHC Clase III: componentes del complemento, TNF',
          'Alelos HLA: >10,000 variantes descritas',
          'Haplotipo HLA: conjunto de alelos heredados en bloque',
          'Desequilibrio de ligamiento: alelos heredados juntos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Procesamiento de antígenos',
        items: [
          'Vía MHC-I: proteínas citosólicas → proteosoma → TAP → RE → péptido-MHC-I → superficie',
          'Vía MHC-II: proteínas endocitadas → endosomas → CLIP → HLA-DM → péptido-MHC-II → superficie',
          'Presentación cruzada: APCs presentan antígenos exógenos en MHC-I',
          'Chaperones: calnexina, calreticulina, tapasina en MHC-I',
          'Invariant chain (Ii) y HLA-DM en MHC-II',
          'Células dendríticas: APCs profesionales más eficientes'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Trasplantes: tipificación HLA esencial para compatibilidad',
          'Asociaciones con enfermedades: HLA-B27 (espondilitis anquilosante), HLA-DQ2/DQ8 (celiaquía)',
          'Diabetes tipo 1: HLA-DR3/DR4',
          'Escape viral: virus inhiben expresión de MHC-I (HSV, CMV)',
          'Tumores: pérdida de MHC-I evita CTL',
          'Síndrome del linfocito desnudo: mutaciones en genes de MHC-II, inmunodeficiencia'
        ]
      }
    ]
  },

  {
    id: 'complemento',
    nombre: 'Sistema del Complemento',
    icono: '⚡',
    subtitulo: 'Cascada proteica de inmunidad innata',
    categorias: ['moleculas', 'innata'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Sistema de >30 proteínas plasmáticas y de membrana',
          'Cascada enzimática de amplificación',
          'Proteínas inactivas (zimógenos) activadas secuencialmente',
          'Nomenclatura: C1, C2, C3... (orden de descubrimiento)',
          'Fragmentos: "a" (pequeño, anafilatoxina), "b" (grande, opsonina)',
          'Excepción: C2a es grande, C2b es pequeño'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vía clásica',
        items: [
          'Iniciada por: anticuerpos (IgM, IgG) unidos a antígeno',
          'C1q reconoce región Fc de anticuerpos',
          'C1r y C1s: serina proteasas del complejo C1',
          'C4 y C2: forman C3 convertasa (C4b2a)',
          'Requiere al menos 2 moléculas de IgG o 1 pentámero de IgM',
          'Vía más específica pero requiere respuesta adaptativa previa'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vía alternativa',
        items: [
          'Iniciada por: superficies microbianas (LPS, ácido teicoico)',
          'Hidrólisis espontánea de C3: C3(H2O)',
          'Factor B y Factor D: forman C3 convertasa alternativa (C3bBb)',
          'Properdina: estabiliza C3bBb',
          'Amplificación positiva: cada C3b genera más convertasa',
          'Vía más antigua evolutivamente, no requiere anticuerpos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vía de las lectinas',
        items: [
          'Iniciada por: lectinas de unión a manosa (MBL) y ficolinas',
          'MBL reconoce carbohidratos en superficie microbiana',
          'MASP-1, MASP-2: serina proteasas asociadas a MBL',
          'Activa C4 y C2 (similar a vía clásica)',
          'Independiente de anticuerpos',
          'Importante en neonatos antes de respuesta adaptativa'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Complejo de ataque a membrana (MAC)',
        items: [
          'C5b + C6 + C7 + C8 + C9 polímero',
          'Forma poro en membrana microbiana',
          'Lisis osmótica de bacteria o célula infectada',
          'C9 polimeriza formando canal transmembrana',
          'Más efectivo contra bacterias Gram-negativas',
          'Neisseria: especialmente susceptible a deficiencias de complemento tardío'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Funciones efectoras del complemento',
        datos: [
          { label: 'Opsonización', value: 'C3b, C4b: marcan patógenos para fagocitosis' },
          { label: 'Quimiotaxis', value: 'C5a: atrae neutrófilos y macrófagos' },
          { label: 'Anafilotoxinas', value: 'C3a, C4a, C5a: degranulación de mastocitos' },
          { label: 'Lisis', value: 'MAC (C5b-9): destrucción directa de patógenos' },
          { label: 'Aclaramiento', value: 'CR1: remoción de inmunocomplejos' },
          { label: 'Potenciación de Ac', value: 'C3d: aumenta respuesta de células B' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Regulación del complemento',
        items: [
          'C1-INH: inhibidor de C1 esterasa (controla vía clásica)',
          'Factor H y Factor I: inactivan C3b (protegen células propias)',
          'DAF (CD55): acelera disociación de convertasas',
          'CD59 (protectina): inhibe formación de MAC',
          'MCP (CD46): cofactor para inactivación de C3b',
          'Regulación evita daño a células propias'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Angioedema hereditario: deficiencia de C1-INH, edema de mucosas',
          'Hemoglobinuria paroxística nocturna: deficiencia de CD59, lisis de eritrocitos',
          'Síndrome urémico hemolítico atípico: mutaciones en Factor H',
          'Infecciones por Neisseria: deficiencias de C5-C9',
          'Lupus eritematoso sistémico: deficiencias de C1q, C4, C2',
          'Eculizumab: anticuerpo anti-C5, trata HPN y SUHa'
        ]
      }
    ]
  },

  {
    id: 'citocinas',
    nombre: 'Citocinas',
    icono: '📡',
    subtitulo: 'Mediadores solubles de comunicación inmune',
    categorias: ['moleculas', 'respuesta'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Proteínas señalizadoras de bajo peso molecular (<30 kDa)',
          'Secretadas por células inmunes y no inmunes',
          'Acción autocrina, paracrina o endocrina',
          'Pleiotropía: una citocina tiene múltiples efectos',
          'Redundancia: varias citocinas tienen efectos similares',
          'Sinergismo o antagonismo entre citocinas',
          'Producción transitoria tras activación celular'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Interleucinas proinflamatorias',
        items: [
          'IL-1β: pirógeno endógeno, activa células T, induce proteínas de fase aguda',
          'IL-6: diferenciación de células B, proteínas de fase aguda, fiebre',
          'TNF-α: activación endotelial, fiebre, caquexia, apoptosis tumoral',
          'IL-12: diferencia Th1, activa NK cells, induce IFN-γ',
          'IL-18: sinergiza con IL-12, produce IFN-γ',
          'IL-23: mantiene Th17, inflamación crónica'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Interferones',
        items: [
          'IFN-α/β (tipo I): antivirales, inducen estado antiviral en células vecinas',
          'IFN-γ (tipo II): activa macrófagos, aumenta MHC-I/II, Th1',
          'IFN-λ (tipo III): antivirales en mucosas',
          'Señalización: JAK-STAT pathway',
          'Inducen: proteína kinasa R (PKR), 2\',5\'-oligoadenilato sintetasa, Mx proteins',
          'Aplicación: IFN-α en hepatitis C, IFN-β en esclerosis múltiple'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Citocinas Th1',
        items: [
          'IFN-γ: principal citocina Th1, activa macrófagos',
          'IL-2: proliferación de células T, desarrollo de Treg',
          'TNF-β (linfotoxina): similar a TNF-α',
          'Promueven inmunidad celular contra patógenos intracelulares',
          'Activan macrófagos para matar bacterias fagocitadas',
          'Inhiben diferenciación Th2'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Citocinas Th2',
        items: [
          'IL-4: diferenciación Th2, cambio de isotipo a IgE',
          'IL-5: eosinofilia, activación de eosinófilos, IgA',
          'IL-13: producción de moco, hiperreactividad bronquial',
          'Promueven inmunidad humoral y contra parásitos',
          'Asociadas con respuestas alérgicas',
          'Inhiben diferenciación Th1 y activación de macrófagos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Citocinas Th17',
        items: [
          'IL-17A/F: reclutamiento de neutrófilos',
          'IL-22: antimicrobianos en epitelios',
          'Defensa contra hongos y bacterias extracelulares',
          'Inducen G-CSF, quimiocinas (CXCL8)',
          'Implicadas en autoinmunidad (artritis, psoriasis)',
          'Diferenciación requiere TGF-β + IL-6/IL-21'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Citocinas reguladoras/antiinflamatorias',
        items: [
          'IL-10: suprime Th1 y macrófagos, producida por Treg',
          'TGF-β: supresión inmune, diferenciación Treg, fibrosis',
          'IL-35: producida por Treg, suprime Th17',
          'Previenen daño tisular por inflamación excesiva',
          'Deficiencia de IL-10: colitis severa en ratones',
          'TGF-β: crítico para tolerancia oral'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Familias de citocinas por estructura',
        datos: [
          { label: 'Familia IL-1', value: 'IL-1α/β, IL-18, IL-33; dominio β-trefoil' },
          { label: 'Familia hematopoyetina', value: 'IL-2, IL-3, IL-4, IL-6, IL-7; haz de 4 α-hélices' },
          { label: 'Familia IFN', value: 'IFN-α/β/γ; señalización JAK-STAT' },
          { label: 'Familia TNF', value: 'TNF-α/β, CD40L, FasL; trímeros' },
          { label: 'Familia IL-17', value: 'IL-17A-F; homodímeros glicosilados' },
          { label: 'Quimiocinas', value: 'CCL, CXCL, CX3CL; quimiotaxis' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Tormenta de citocinas: sepsis, COVID-19 severo, síndrome de liberación de citocinas (CAR-T)',
          'Terapia anti-TNF: infliximab, etanercept (artritis reumatoide, Crohn)',
          'Anti-IL-6: tocilizumab (artritis reumatoide, COVID-19)',
          'Anti-IL-17: secukinumab (psoriasis)',
          'Anti-IL-4Rα: dupilumab (dermatitis atópica, asma)',
          'IL-2 recombinante: tratamiento de cáncer renal',
          'Síndrome de liberación de citocinas: efecto adverso de inmunoterapias'
        ]
      }
    ]
  },

  {
    id: 'celulas-dendriticas',
    nombre: 'Células Dendríticas',
    icono: '🌳',
    subtitulo: 'Puente entre inmunidad innata y adaptativa',
    categorias: ['celulas', 'innata', 'adaptativa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'APCs profesionales más potentes',
          'Forma estrellada con prolongaciones dendríticas',
          'Origen: precursores mieloides y linfoides en médula ósea',
          'Inmaduras: alta capacidad fagocítica, bajo MHC-II',
          'Maduras: baja fagocitosis, alto MHC-II, alta coestimulación',
          'Migran de tejidos periféricos a ganglios linfáticos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Subtipos principales',
        items: [
          'DCs convencionales (cDCs): presentación de antígenos',
          'cDC1: presentación cruzada en MHC-I, Th1, expresan XCR1',
          'cDC2: presentación en MHC-II, Th2/Th17, expresan CD1c',
          'DCs plasmacitoides (pDCs): producen grandes cantidades de IFN-α/β',
          'DCs derivadas de monocitos: reclutadas en inflamación',
          'Células de Langerhans: DCs residentes en epidermis'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Maduración de células dendríticas',
        items: [
          'Señales de maduración: PAMPs (vía TLRs), DAMPs, citocinas',
          'Cambios morfológicos: pierden prolongaciones, se vuelven móviles',
          'Aumentan: MHC-I/II, CD80/CD86, CD40, CCR7',
          'Disminuyen: capacidad fagocítica, receptores de captura',
          'Migración: CCR7 responde a CCL19/CCL21 en ganglios',
          'Presentan antígenos a células T naive en zonas T de ganglios'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Funciones clave',
        items: [
          'Captura de antígenos en tejidos periféricos',
          'Presentación cruzada: antígenos exógenos en MHC-I',
          'Activación de células T naive (señal 1 + 2 + 3)',
          'Polarización de respuesta Th: IL-12→Th1, IL-4→Th2, TGF-β+IL-6→Th17',
          'Inducción de tolerancia: DCs inmaduras o tolerogénicas',
          'Producción de citocinas que dirigen respuesta inmune'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Receptores de reconocimiento de patrones (PRRs)',
        datos: [
          { label: 'TLR4', value: 'LPS bacteriano (Gram-negativas)' },
          { label: 'TLR3', value: 'dsRNA viral' },
          { label: 'TLR7/8', value: 'ssRNA viral' },
          { label: 'TLR9', value: 'DNA no metilado (CpG bacteriano)' },
          { label: 'Receptores tipo NOD', value: 'Peptidoglicano citosólico' },
          { label: 'Receptores tipo RIG', value: 'RNA viral citosólico' },
          { label: 'Receptores lectina tipo C', value: 'Carbohidratos microbianos' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Vacunas de células dendríticas: cargan antígenos tumorales ex vivo',
          'Sipuleucel-T: vacuna de DCs para cáncer de próstata (FDA aprobada)',
          'VIH: infecta DCs que transmiten virus a linfocitos T CD4⁺',
          'Adjuvantes vacunales: activan TLRs en DCs (alumbre, CpG-ODN)',
          'Tolerancia en trasplantes: DCs tolerogénicas suprimen rechazo',
          'Enfermedades autoinflamatorias: DCs hiperactivas'
        ]
      }
    ]
  },

  {
    id: 'macrofagos',
    nombre: 'Macrófagos',
    icono: '🔬',
    subtitulo: 'Fagocitos profesionales y reguladores de inflamación',
    categorias: ['celulas', 'innata'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Células mononucleares fagocíticas de vida larga',
          'Origen: monocitos circulantes y precursores tisulares',
          'Presentes en todos los tejidos del organismo',
          'Heterogeneidad según tejido: células de Kupffer (hígado), microglía (cerebro), osteoclastos (hueso)',
          'Funciones: fagocitosis, presentación antigénica, remodelación tisular',
          'Plasticidad funcional: M1 (proinflamatorio) vs M2 (reparador)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Macrófagos M1 (clásicamente activados)',
        items: [
          'Inducidos por: IFN-γ (Th1) + LPS o TNF-α',
          'Producen: IL-1, IL-6, IL-12, IL-23, TNF-α, NO, ROS',
          'Funciones: muerte de patógenos intracelulares, presentación antigénica',
          'Expresan: iNOS (óxido nítrico sintasa inducible)',
          'Promueven inflamación y respuesta Th1',
          'Asociados: resistencia a infecciones, daño tisular, autoinmunidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Macrófagos M2 (alternativamente activados)',
        items: [
          'Inducidos por: IL-4, IL-13 (Th2), IL-10, TGF-β',
          'Producen: IL-10, TGF-β, arginasa-1, factores de crecimiento',
          'Funciones: reparación tisular, angiogénesis, remodelación',
          'Expresan: CD206 (receptor de manosa), arginasa',
          'Suprimen inflamación, promueven fibrosis',
          'Asociados: resolución de inflamación, cicatrización, progresión tumoral'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fagocitosis',
        items: [
          'Reconocimiento: receptores Fc, receptores del complemento, receptores scavenger',
          'Opsonización mejora fagocitosis: IgG (FcγR), C3b (CR1)',
          'Formación de fagosoma: invaginación de membrana',
          'Fusión fagosoma-lisosoma: fagolisosoma',
          'Muerte intracelular: ROS (estallido respiratorio), NO, enzimas lisosomales',
          'NADPH oxidasa: genera superóxido (O2⁻) → H2O2 → HOCl'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Receptores de macrófagos',
        datos: [
          { label: 'TLRs', value: 'Reconocen PAMPs, inician respuesta inflamatoria' },
          { label: 'FcγRI/II/III', value: 'Unen IgG, opsonización, ADCC' },
          { label: 'CR1, CR3, CR4', value: 'Unen C3b/iC3b, opsonización' },
          { label: 'Receptor de manosa', value: 'Une carbohidratos microbianos' },
          { label: 'Scavenger receptors', value: 'Fagocitan células apoptóticas, LDL oxidado' },
          { label: 'CD36', value: 'Fagocitosis, metabolismo lipídico' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Macrófagos residentes tisulares',
        items: [
          'Células de Kupffer: hígado, filtran sangre portal',
          'Macrófagos alveolares: pulmón, eliminan partículas inhaladas',
          'Microglía: SNC, vigilancia inmune cerebral',
          'Células de Langerhans: piel (son DCs, no macrófagos)',
          'Macrófagos esplénicos: filtran sangre, eliminan eritrocitos viejos',
          'Histiocitos: tejido conectivo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Enfermedad granulomatosa crónica: defecto en NADPH oxidasa, infecciones recurrentes',
          'Tuberculosis: Mycobacterium sobrevive en macrófagos, formación de granulomas',
          'Aterosclerosis: macrófagos cargados de lípidos (células espumosas)',
          'Macrófagos asociados a tumores (TAMs): fenotipo M2, promueven crecimiento tumoral',
          'Síndrome de activación macrofágica: linfohistiocitosis hemofagocítica',
          'Terapia anti-CSF1R: depleta macrófagos, investigación en cáncer'
        ]
      }
    ]
  },

  {
    id: 'neutrofilos',
    nombre: 'Neutrófilos',
    icono: '⚪',
    subtitulo: 'Primera línea de defensa celular',
    categorias: ['celulas', 'innata'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Granulocitos polimorfonucleares (PMN)',
          'Leucocitos más abundantes (50-70% en sangre)',
          'Vida corta: 6-8 horas en circulación, 1-2 días en tejidos',
          'Núcleo multilobulado (3-5 lóbulos)',
          'Producidos en médula ósea: 10¹¹ células/día',
          'Primer respondedor en inflamación aguda'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Gránulos citoplasmáticos',
        items: [
          'Gránulos azurófilos (primarios): mieloperoxidasa, elastasa, catepsinas, defensinas',
          'Gránulos específicos (secundarios): lactoferrina, colagenasa, gelatinasa',
          'Gránulos de gelatinasa (terciarios): gelatinasa, catepsinas',
          'Vesículas secretoras: plasmina, CD11b/CD18',
          'Liberación secuencial según tipo de gránulo',
          'Degranulación: fusión con fagosoma o exocitosis'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Reclutamiento y migración',
        items: [
          'Quimiotaxis: responden a IL-8 (CXCL8), C5a, LTB4, fMLP bacteriano',
          'Rodamiento (rolling): selectinas (L-selectina) en endotelio activado',
          'Adhesión firme: integrinas (CD11b/CD18) + ICAM-1',
          'Diapédesis: migración transendotelial',
          'Migración en tejido: siguiendo gradiente de quimioatrayentes',
          'Proceso completo: 30-60 minutos desde señal inicial'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mecanismos microbicidas',
        items: [
          'Fagocitosis: 10-20 bacterias por neutrófilo',
          'Estallido respiratorio: NADPH oxidasa genera O2⁻, H2O2',
          'Mieloperoxidasa: H2O2 + Cl⁻ → HOCl (lejía)',
          'Óxido nítrico: iNOS genera NO',
          'Enzimas lisosomales: elastasa, catepsinas, proteinasa 3',
          'Péptidos antimicrobianos: defensinas, catelicidinas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'NETs (Neutrophil Extracellular Traps)',
        items: [
          'Descubiertas en 2004: trampas de ADN extracelular',
          'Composición: cromatina + histonas + proteínas granulares',
          'Formación (NETosis): tipo letal (muerte celular) o vital',
          'Función: atrapan y matan bacterias, hongos, parásitos',
          'Efectos adversos: daño tisular, trombosis, autoinmunidad',
          'Implicadas en: sepsis, lupus, trombosis, COVID-19'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Receptores de neutrófilos',
        datos: [
          { label: 'FcγRIIa/IIIb', value: 'Unen IgG, opsonización' },
          { label: 'CR1, CR3', value: 'Unen complemento (C3b, iC3b)' },
          { label: 'CXCR1/2', value: 'Receptores de IL-8, quimiotaxis' },
          { label: 'C5aR', value: 'Receptor de C5a, activación' },
          { label: 'TLR2/4', value: 'Reconocen PAMPs bacterianos' },
          { label: 'CD11b/CD18', value: 'Integrina, adhesión endotelial' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Neutropenia: <1500 células/μL, riesgo de infecciones bacterianas/fúngicas',
          'Neutropenia febril: emergencia oncológica (quimioterapia)',
          'Enfermedad granulomatosa crónica: defecto NADPH oxidasa, infecciones por Aspergillus, Staphylococcus',
          'Deficiencia de adhesión leucocitaria (LAD): mutación CD18, infecciones sin pus',
          'G-CSF (filgrastim): estimula producción de neutrófilos post-quimioterapia',
          'Sepsis: neutrófilos activados causan daño endotelial y SIRS'
        ]
      }
    ]
  },

  {
    id: 'nk-cells',
    nombre: 'Células NK (Natural Killer)',
    icono: '🎯',
    subtitulo: 'Linfocitos innatos citotóxicos',
    categorias: ['celulas', 'innata'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Linfocitos grandes granulares (15% de linfocitos)',
          'Innatos: no requieren sensibilización previa',
          'No expresan TCR ni BCR',
          'Respuesta rápida (horas) contra células infectadas o tumorales',
          'Producen IFN-γ y TNF-α',
          'Origen: médula ósea, maduran en ganglios y bazo'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Reconocimiento de células diana',
        items: [
          'Balance de señales: activadoras vs inhibidoras',
          'Receptores inhibidores: KIR (reconocen MHC-I propio)',
          'Receptores activadores: NKG2D, NCR (NKp46, NKp30, NKp44)',
          'Hipótesis del "missing self": células sin MHC-I son eliminadas',
          'Stress-induced ligands: MICA/B, ULBPs (activan NKG2D)',
          'Células normales: MHC-I inhibe NK, no son atacadas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mecanismos citotóxicos',
        items: [
          'Gránulos citotóxicos: perforinas y granzimas',
          'Perforina: forma poros en membrana diana',
          'Granzimas: serina proteasas inducen apoptosis',
          'Vía Fas-FasL: induce apoptosis en células diana',
          'TRAIL (TNF-related apoptosis-inducing ligand)',
          'Muerte en minutos tras reconocimiento'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'ADCC (Citotoxicidad celular dependiente de anticuerpos)',
        items: [
          'Receptor FcγRIIIa (CD16): une IgG',
          'Reconoce células opsonizadas con anticuerpos',
          'Induce degranulación y liberación de citocinas',
          'Mecanismo clave de terapias con anticuerpos monoclonales',
          'Trastuzumab, rituximab: requieren ADCC por NK',
          'Polimorfismo CD16: afecta afinidad por IgG'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Receptores de células NK',
        datos: [
          { label: 'KIR (inhibidores)', value: 'Reconocen MHC-I, previenen autorreactividad' },
          { label: 'NKG2A (inhibidor)', value: 'Reconoce HLA-E (MHC-I no clásico)' },
          { label: 'NKG2D (activador)', value: 'Reconoce MICA/B, ULBPs (estrés celular)' },
          { label: 'NCRs (activadores)', value: 'NKp46, NKp30, NKp44; ligandos virales/tumorales' },
          { label: 'CD16 (FcγRIIIa)', value: 'ADCC, une IgG' },
          { label: 'CD56', value: 'Marcador de NK (NCAM), adhesión' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Subpoblaciones de NK',
        items: [
          'CD56bright CD16dim: 10%, producen citocinas (IFN-γ), baja citotoxicidad',
          'CD56dim CD16bright: 90%, alta citotoxicidad, ADCC',
          'NK de memoria: respuesta potenciada en reexposición (CMV)',
          'NK residentes tisulares: útero (decidua), hígado',
          'NK uterinas: importantes en implantación y embarazo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Deficiencia de NK: susceptibilidad a infecciones virales (VHS, VVZ)',
          'Inmunovigilancia tumoral: NK eliminan células tumorales con bajo MHC-I',
          'Terapia adoptiva: infusión de NK alogénicas en leucemia',
          'Inhibidores de checkpoint NK: anti-KIR, anti-NKG2A (investigación)',
          'HCMV: proteínas virales imitan MHC-I, evaden NK',
          'Embarazo: NK uterinas regulan invasión trofoblástica'
        ]
      }
    ]
  }
];
