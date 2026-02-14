// ═══════════════════════════════════════════════════════════
// EPIGENETICA-DATA.JS - Base de datos sobre Epigenética
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const EPIGENETICA_DATA = [
  {
    id: 'metilacion-adn',
    nombre: 'Metilación del ADN',
    subtitulo: 'Modificación química en citosinas',
    icono: '🔬',
    categorias: ['mecanismos', 'regulacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características Generales',
        items: [
          '<strong>Proceso:</strong> Adición de grupos metilo (CH₃) en posición 5 de citosinas, principalmente en dinucleótidos CpG',
          '<strong>Enzimas:</strong> ADN metiltransferasas (DNMTs): DNMT1 (mantenimiento), DNMT3A y DNMT3B (metilación de novo)',
          '<strong>Cofactor:</strong> S-adenosil metionina (SAM) como donador de grupos metilo',
          '<strong>Resultado:</strong> Formación de 5-metilcitosina (5mC), conocida como la "quinta base" del ADN',
          '<strong>Distribución:</strong> ~70-80% de los CpG están metilados en células de mamíferos, excepto en islas CpG de promotores'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Tipos de Regiones CpG',
        datos: [
          { label: 'Islas CpG', value: 'Regiones >500 pb con >55% GC y ratio CpG >0.65. Presentes en ~60% de promotores humanos' },
          { label: 'Costas CpG', value: 'Regiones flanqueantes de islas CpG (~2 kb). Altamente reguladas en diferenciación' },
          { label: 'Mares CpG', value: 'Regiones distales a islas (>2 kb). Función en regulación tejido-específica' },
          { label: 'CpG dispersos', value: 'Dinucleótidos aislados en genoma. Generalmente metilados en secuencias repetitivas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Funciones Biológicas',
        items: [
          '<strong>Silenciamiento génico:</strong> Metilación de promotores impide unión de factores de transcripción',
          '<strong>Inactivación X:</strong> Mantenimiento del estado inactivo del cromosoma X en hembras',
          '<strong>Impronta genómica:</strong> Expresión monoalélica dependiente del origen parental',
          '<strong>Supresión de transposones:</strong> Silenciamiento de elementos repetitivos (LINE, SINE, retrovirus endógenos)',
          '<strong>Estabilidad cromosómica:</strong> Prevención de recombinación ilegítima entre repeticiones'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia Clínica',
        items: [
          '<strong>Cáncer:</strong> Hipermetilación de islas CpG en genes supresores (p16, VHL, BRCA1) y hipometilación global',
          '<strong>Síndrome ICF:</strong> Mutaciones en DNMT3B causan inmunodeficiencia, inestabilidad centromérica y anomalías faciales',
          '<strong>Síndrome Rett:</strong> Mutaciones en MeCP2 (proteína de unión a metil-CpG) causan trastorno del neurodesarrollo',
          '<strong>Terapéutica:</strong> Inhibidores de DNMTs (azacitidina, decitabina) aprobados para síndromes mielodisplásicos',
          '<strong>Diagnóstico:</strong> Perfiles de metilación como biomarcadores en cáncer colorrectal (SEPT9) y otros tumores'
        ]
      }
    ]
  },
  {
    id: 'modificaciones-histonas',
    nombre: 'Modificaciones de Histonas',
    subtitulo: 'Código de histonas y remodelación cromatínica',
    icono: '🧬',
    categorias: ['mecanismos', 'regulacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Tipos de Modificaciones Post-traduccionales',
        items: [
          '<strong>Acetilación:</strong> Adición de grupos acetilo (HATs) en lisinas. Neutraliza carga positiva → cromatina abierta',
          '<strong>Desacetilación:</strong> Remoción de acetilos (HDACs). Restaura carga positiva → cromatina compacta',
          '<strong>Metilación:</strong> Adición de 1-3 grupos metilo en lisinas (K) o argininas (R). Efecto depende del sitio',
          '<strong>Fosforilación:</strong> Adición de fosfatos en serinas, treoninas o tirosinas. Rol en condensación mitótica',
          '<strong>Ubiquitinación:</strong> Unión de ubiquitina en lisinas. Señalización para activación o represión',
          '<strong>Sumoilación:</strong> Unión de SUMO (Small Ubiquitin-like MOdifier). Generalmente asociada a represión'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Marcas Epigenéticas Clave',
        datos: [
          { label: 'H3K4me3', value: 'Trimetilación de lisina 4 en H3. Marca de promotores activos (set por complejos MLL/SET1)' },
          { label: 'H3K9me3', value: 'Trimetilación de lisina 9 en H3. Heterocromatina constitutiva (set por SUV39H1)' },
          { label: 'H3K27me3', value: 'Trimetilación de lisina 27 en H3. Represión por Polycomb (PRC2/EZH2)' },
          { label: 'H3K36me3', value: 'Trimetilación de lisina 36 en H3. Cuerpo de genes activos (set por SETD2)' },
          { label: 'H3K9ac', value: 'Acetilación de lisina 9 en H3. Promotores y enhancers activos' },
          { label: 'H4K20me3', value: 'Trimetilación de lisina 20 en H4. Heterocromatina y regiones pericentroméricas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Complejos Remodeladores de Cromatina',
        items: [
          '<strong>SWI/SNF:</strong> Usa ATP para deslizar/expulsar nucleosomas. Crucial en activación transcripcional',
          '<strong>ISWI:</strong> Espaciamiento regular de nucleosomas. Rol en ensamblaje y organización cromatínica',
          '<strong>CHD:</strong> Remodela cromatina durante diferenciación. CHD7 mutado en síndrome CHARGE',
          '<strong>INO80:</strong> Intercambio de variantes de histonas. Rol en reparación de ADN y replicación',
          '<strong>Variantes de histonas:</strong> H2A.Z (regulación), H3.3 (genes activos), CENP-A (centrómeros), macroH2A (inactivación X)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia Clínica',
        items: [
          '<strong>Cáncer:</strong> Mutaciones en enzimas modificadoras (EZH2 en linfomas, SETD2 en tumores renales)',
          '<strong>Leucemias:</strong> Fusiones MLL generan desregulación de H3K4me3 y expresión aberrante de genes HOX',
          '<strong>Síndrome Kabuki:</strong> Mutaciones en KMT2D (metiltransferasa H3K4) causan discapacidad intelectual',
          '<strong>Síndrome Rubinstein-Taybi:</strong> Mutaciones en CBP/p300 (HATs) causan retraso del desarrollo',
          '<strong>Terapéutica:</strong> Inhibidores de HDACs (vorinostat, romidepsina) aprobados para linfomas cutáneos'
        ]
      }
    ]
  },
  {
    id: 'arn-no-codificantes',
    nombre: 'ARN no Codificantes Reguladores',
    subtitulo: 'miRNA, lncRNA, siRNA y otros ncRNAs',
    icono: '📜',
    categorias: ['mecanismos', 'regulacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 MicroARN (miRNA)',
        items: [
          '<strong>Estructura:</strong> ARN pequeños de ~22 nucleótidos que regulan expresión génica post-transcripcional',
          '<strong>Biogénesis:</strong> Transcripción por Pol II → Pri-miRNA → Drosha (núcleo) → Pre-miRNA → Dicer (citoplasma) → miRNA maduro',
          '<strong>Mecanismo:</strong> Unión a región 3\' UTR de mRNAs mediante secuencia "seed" (nt 2-8). Guía complejo RISC',
          '<strong>Efecto:</strong> Degradación de mRNA (complementariedad perfecta) o represión traduccional (complementariedad parcial)',
          '<strong>Números:</strong> >2600 miRNAs humanos anotados. Cada uno puede regular cientos de mRNAs diana'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ ARN no Codificantes Largos (lncRNA)',
        datos: [
          { label: 'Definición', value: 'Transcritos >200 nt sin potencial codificante. >16,000 lncRNAs humanos anotados' },
          { label: 'XIST', value: '17 kb. Inicia inactivación del cromosoma X recubriendo el cromosoma en cis' },
          { label: 'HOTAIR', value: '2.2 kb. Recluta complejo PRC2 para silenciar genes HOXD en trans' },
          { label: 'MALAT1', value: '8 kb. Regulación de splicing alternativo. Sobreexpresado en múltiples cánceres' },
          { label: 'H19', value: '2.3 kb. Gen imprintado. Precursor de miR-675. Rol en crecimiento embrionario' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Otros ARN Reguladores',
        items: [
          '<strong>siRNA:</strong> ARN interferentes pequeños (~21 nt). Complementariedad perfecta → degradación de mRNA diana',
          '<strong>piRNA:</strong> ARN que interactúan con proteínas PIWI (~24-31 nt). Silencian transposones en línea germinal',
          '<strong>circRNA:</strong> ARN circulares por splicing back-splicing. Funcionan como esponjas de miRNA o regulan traducción',
          '<strong>snoRNA:</strong> ARN nucleolares pequeños. Guían modificaciones químicas de rRNA (metilación, pseudouridilación)',
          '<strong>enhancer RNA (eRNA):</strong> Transcritos de enhancers activos. Facilitan interacciones promotor-enhancer'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia Clínica',
        items: [
          '<strong>Oncomieres:</strong> miR-21 sobreexpresado en tumores (antiapoptótico). Let-7 suprimido (pro-proliferativo)',
          '<strong>Terapéutica:</strong> Miravirsen (anti-miR-122) para hepatitis C. Tecnologías de modulación de miRNAs en desarrollo',
          '<strong>Biomarcadores:</strong> miRNAs circulantes en sangre como detectores de cáncer, infarto, enfermedades neurodegenerativas',
          '<strong>Enfermedades genéticas:</strong> Expansión de repeticiones CGG en FMR1 silenciada por metilación causa síndrome X frágil',
          '<strong>Terapia génica:</strong> shRNAs y siRNAs como estrategias para knockdown génico específico'
        ]
      }
    ]
  },
  {
    id: 'impronta-genomica',
    nombre: 'Impronta Genómica',
    subtitulo: 'Expresión monoalélica dependiente del origen parental',
    icono: '👨‍👩‍👧‍👦',
    categorias: ['regulacion', 'herencia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Mecanismo Molecular',
        items: [
          '<strong>Definición:</strong> Expresión de solo uno de los dos alelos basada en el origen parental (materno o paterno)',
          '<strong>Establecimiento:</strong> Metilación diferencial en ICRs (Imprinting Control Regions) durante gametogénesis',
          '<strong>Mantenimiento:</strong> Marcas epigenéticas preservadas tras fertilización y divisiones celulares',
          '<strong>Borrado:</strong> Reprogramación en células germinales primordiales (~E10.5-E13.5 en ratón)',
          '<strong>Prevalencia:</strong> ~150 genes imprintados en humanos, organizados en clusters (~1% del genoma)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Genes Imprintados Clásicos',
        datos: [
          { label: 'IGF2/H19', value: 'IGF2 expresado del alelo paterno (factor de crecimiento). H19 del materno (lncRNA regulador)' },
          { label: 'SNRPN', value: 'Expresado del alelo paterno. Centro de impronta en región 15q11-q13 (Prader-Willi/Angelman)' },
          { label: 'UBE3A', value: 'Expresado del alelo materno en neuronas. Ubicuitina ligasa E3A crítica en desarrollo cerebral' },
          { label: 'CDKN1C', value: 'Expresado del alelo materno. Inhibidor de quinasas dependientes de ciclina (p57)' },
          { label: 'PEG3', value: 'Expresado del alelo paterno. Factor de transcripción zinc-finger en desarrollo cerebral' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Teorías Evolutivas',
        items: [
          '<strong>Hipótesis del conflicto parental:</strong> Genes paternos promueven crecimiento fetal; maternos lo restringen',
          '<strong>Hipótesis de dosificación:</strong> Control fino de dosis génica crítica en desarrollo',
          '<strong>Supresión de partenogénesis:</strong> Impronta hace imposible desarrollo con solo genoma materno o paterno',
          '<strong>Defensa contra transposones:</strong> Silenciamiento de elementos móviles en línea germinal',
          '<strong>Coevolución huésped-parásito:</strong> Protección contra infecciones placentarias'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Síndromes por Impronta',
        items: [
          '<strong>Síndrome Prader-Willi:</strong> Deleción/UPD materna 15q11-q13. Hipotonía, hiperfagia, obesidad, hipogonadismo',
          '<strong>Síndrome Angelman:</strong> Deleción/UPD paterna 15q11-q13 o mutación UBE3A materna. Retraso severo, risa inapropiada, ataxia',
          '<strong>Síndrome Beckwith-Wiedemann:</strong> Desregulación de región 11p15.5. Macrosomía, onfalocele, riesgo tumoral (Wilms)',
          '<strong>Síndrome Silver-Russell:</strong> Hipometilación de ICR1 en 11p15.5. Retraso crecimiento intrauterino, asimetría corporal',
          '<strong>Disomía uniparental:</strong> Dos copias de cromosoma del mismo progenitor. Fenotipos según genes imprintados presentes'
        ]
      }
    ]
  },
  {
    id: 'inactivacion-x',
    nombre: 'Inactivación del Cromosoma X',
    subtitulo: 'Compensación de dosis en mamíferos',
    icono: '🔇',
    categorias: ['regulacion', 'herencia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Proceso de Inactivación',
        items: [
          '<strong>Conteo:</strong> Detección del ratio X:autosomas. Inicia cuando hay >1 cromosoma X activo',
          '<strong>Elección:</strong> Selección aleatoria del X a inactivar en células somáticas (determinístico en marsupiales: X paterno)',
          '<strong>Iniciación:</strong> Expresión de Xist desde el X a inactivar. Silenciamiento de Tsix (antisentido de Xist)',
          '<strong>Propagación:</strong> ARN Xist recubre el cromosoma X en cis (~17 kb, sin traducción)',
          '<strong>Mantenimiento:</strong> Reclutamiento de PRC2, metilación de ADN, modificaciones de histonas represivas (H3K27me3, H3K9me3)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Moleculares',
        datos: [
          { label: 'Xist', value: 'lncRNA de 17 kb. Esencial para inactivación. Knockout embrionario letal en hembras XX' },
          { label: 'Tsix', value: 'Antisentido de Xist (~40 kb). Reprime Xist en X activo. Rol en elección del X a inactivar' },
          { label: 'Xite', value: 'Enhancer intergénico de Tsix. Modula probabilidad de que X sea elegido como activo' },
          { label: 'Cuerpo de Barr', value: 'Heterocromatina facultativa. X inactivo visible en interfase (descubierto 1949)' },
          { label: 'Escape', value: '15-25% de genes escapan inactivación (PAR1, PAR2, otros). Explica diferencias XX vs XY' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Cronología del Desarrollo',
        items: [
          '<strong>Mórula/blastocisto temprano:</strong> Inactivación imprintada del X paterno en todas las células',
          '<strong>Epiblasto (E6.5):</strong> Reactivación de Xi, seguida de inactivación aleatoria (E6.5-E7.5 en ratón)',
          '<strong>Tejidos extraembrionarios:</strong> Mantienen inactivación imprintada del X paterno',
          '<strong>Células germinales:</strong> Reactivación de Xi en células germinales primordiales para reprogramación',
          '<strong>Estabilidad:</strong> Una vez establecida, inactivación es estable y heredable mitóticamente (excepto en células germinales)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia Clínica',
        items: [
          '<strong>Mosaicismo funcional:</strong> Hembras son mosaico para expresión X. Base de manifestaciones variables en portadoras',
          '<strong>Hemofilia:</strong> Portadoras con inactivación sesgada pueden tener manifestaciones hemorrágicas',
          '<strong>Distrofia muscular Duchenne:</strong> Portadoras con patrón desfavorable pueden tener debilidad muscular',
          '<strong>Síndrome Turner (45,X):</strong> Ausencia de segundo X causa fenotipo debido a genes que escapan inactivación',
          '<strong>Cáncer:</strong> Inactivación sesgada no aleatoria puede indicar ventaja clonal. Usado como marcador de clonalidad'
        ]
      }
    ]
  },
  {
    id: 'reprogramacion-epigenetica',
    nombre: 'Reprogramación Epigenética',
    subtitulo: 'Borrado y establecimiento de marcas epigenéticas',
    icono: '🔄',
    categorias: ['desarrollo', 'regulacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Oleadas de Reprogramación',
        items: [
          '<strong>Primera onda - Desarrollo temprano:</strong> Desmetilación masiva post-fertilización. Protección de impronta',
          '<strong>Patrón:</strong> Genoma paterno desmetilado activamente en cigoto. Materno pasivamente durante divisiones',
          '<strong>Segunda onda - Células germinales:</strong> Borrado completo en PGCs (E10.5-E13.5 ratón, semana 8-11 humano)',
          '<strong>Restablecimiento:</strong> Metilación de novo durante gametogénesis (espermatogénesis: nacimiento-pubertad; ovogénesis: fetal)',
          '<strong>Impronta:</strong> Establecimiento específico de sexo de marcas de impronta en gametos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos de Desmetilación',
        datos: [
          { label: 'Pasiva', value: 'Pérdida de metilación por falta de mantenimiento en replicación. Rol de dilución durante divisiones' },
          { label: 'Activa - TET', value: 'Familia TET (TET1/2/3) oxida 5mC → 5hmC → 5fC → 5caC → escisión por BER' },
          { label: 'BER', value: 'Reparación por escisión de base. TDG/SMUG1 remueven citosinas oxidadas, APE1 y Polβ restauran C' },
          { label: '5hmC', value: '5-hidroximetilcitosina. Intermediario de desmetilación y marca epigenética por derecho propio' },
          { label: 'AID/APOBEC', value: 'Deaminasas de citosina. Convierten 5mC a timina, generando mismatch U:G reparado por BER' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Células Madre Pluripotentes Inducidas (iPSCs)',
        items: [
          '<strong>Descubrimiento:</strong> Yamanaka 2006. Reprogramación de células somáticas con 4 factores (OCT4, SOX2, KLF4, c-MYC)',
          '<strong>Proceso:</strong> Cambios epigenéticos masivos: reactivación de genes pluripotencia, silenciamiento de genes diferenciados',
          '<strong>Metilación:</strong> Desmetilación de promotores de OCT4/NANOG. Remetilación de genes tejido-específicos',
          '<strong>Histonas:</strong> Enriquecimiento de marcas bivalentes (H3K4me3 + H3K27me3) en genes del desarrollo',
          '<strong>Aplicaciones:</strong> Modelado de enfermedades, screening de fármacos, medicina regenerativa potencial'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia Clínica',
        items: [
          '<strong>Tecnologías reproductivas:</strong> Fertilización in vitro puede alterar impronta (riesgo aumentado Beckwith-Wiedemann)',
          '<strong>Clonación:</strong> Reprogramación incompleta de núcleo donante explica baja eficiencia y anomalías en clonación reproductiva',
          '<strong>Envejecimiento:</strong> Pérdida progresiva de metilación global y cambios en marcas de histonas con la edad',
          '<strong>Memoria epigenética:</strong> Exposiciones tempranas (desnutrición, tóxicos) pueden dejar marcas epigenéticas duraderas',
          '<strong>Terapia celular:</strong> Reprogramación directa (fibroblastos → neuronas/cardiomiocitos) evitando estado pluripotente'
        ]
      }
    ]
  },
  {
    id: 'epigenetica-cancer',
    nombre: 'Epigenética del Cáncer',
    subtitulo: 'Alteraciones epigenéticas en oncogénesis',
    icono: '🎗️',
    categorias: ['clinica', 'regulacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Alteraciones Globales',
        items: [
          '<strong>Hipometilación global:</strong> Pérdida de metilación en secuencias repetitivas y cuerpo de genes',
          '<strong>Consecuencias:</strong> Inestabilidad cromosómica, reactivación de transposones, pérdida de impronta',
          '<strong>Hipermetilación focal:</strong> Metilación aberrante de islas CpG en promotores de genes supresores',
          '<strong>CIMP:</strong> Fenotipo metilador de islas CpG. Subgrupo de tumores con hipermetilación coordinada',
          '<strong>Progresión:</strong> Cambios epigenéticos ocurren temprano y se acumulan durante progresión tumoral'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Genes Supresores Silenciados',
        datos: [
          { label: 'VHL', value: 'Cáncer renal de células claras (~80% silenciado). Causa acumulación de HIF y angiogénesis' },
          { label: 'MLH1', value: 'Cáncer colorrectal. Pérdida de reparación mismatch → inestabilidad microsatelital' },
          { label: 'BRCA1', value: 'Cáncer de mama/ovario. Reparación recombinación homóloga deficiente' },
          { label: 'CDKN2A (p16)', value: 'Múltiples tumores. Regulador ciclo celular (inhibidor CDK4/6)' },
          { label: 'MGMT', value: 'Glioblastoma. Predictor de respuesta a temozolomida (alquilante)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Modificaciones de Histonas en Cáncer',
        items: [
          '<strong>Pérdida de acetilación:</strong> Sobreexpresión de HDACs. Silenciamiento de genes supresores',
          '<strong>Mutaciones en modificadores:</strong> EZH2 (ganancia de función en linfomas), SETD2 (pérdida en renales)',
          '<strong>Fusiones oncogénicas:</strong> PML-RARα en leucemia promielocítica recluta HDACs y represores',
          '<strong>Desregulación de lectores:</strong> Proteínas con bromodominios (BRD4) críticas en leucemias y tumores sólidos',
          '<strong>Pérdida de marcas represivas:</strong> H3K9me3 reducida en heteroctromatina favorece inestabilidad'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Terapias Epigenéticas',
        items: [
          '<strong>Inhibidores de DNMTs:</strong> Azacitidina, decitabina (aprobados MDS/AML). Reactivación de genes supresores',
          '<strong>Inhibidores de HDACs:</strong> Vorinostat, romidepsina (linfomas). Panobinostat (mieloma múltiple)',
          '<strong>Inhibidores de EZH2:</strong> Tazemetostat (linfomas con EZH2 mutado, sarcoma epitelioide)',
          '<strong>Inhibidores de LSD1:</strong> Iadademstat en desarrollo. Modulación de H3K4me1/2 en leucemias',
          '<strong>Combinaciones:</strong> Sinergia de agentes epigenéticos con quimioterapia, inmunoterapia (checkpoint inhibitors)'
        ]
      }
    ]
  },
  {
    id: 'herencia-transgeneracional',
    nombre: 'Herencia Epigenética Transgeneracional',
    subtitulo: 'Transmisión de información más allá del ADN',
    icono: '🧬',
    categorias: ['herencia', 'desarrollo'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Conceptos Fundamentales',
        items: [
          '<strong>Definición:</strong> Transmisión de fenotipos a través de generaciones sin cambios en secuencia de ADN',
          '<strong>Criterios:</strong> Persistencia más allá de F2 (para descartar efectos directos sobre F1 gestante y F2 germinal)',
          '<strong>Mecanismos:</strong> Metilación ADN escapando reprogramación, modificaciones histonas, ARNs en gametos',
          '<strong>Controversia:</strong> Evidencia robusta en plantas y C. elegans; más limitada y debatida en mamíferos',
          '<strong>Ventanas críticas:</strong> Exposiciones durante gametogénesis o desarrollo temprano más propensas a efectos transgeneracionales'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Evidencia Experimental',
        datos: [
          { label: 'Agouti viable yellow (Avy)', value: 'Ratones. Color pelaje y obesidad determinados por metilación de IAP. Transmisible maternal' },
          { label: 'Paramutación', value: 'Plantas (maíz). Interacción alélica donde un alelo induce cambio epigenético en otro, heredable' },
          { label: 'Hambruna holandesa', value: 'Humanos (1944-45). Descendientes de embarazadas desnutridas: ↑riesgo obesidad, diabetes, cardiovascular' },
          { label: 'Överkalix', value: 'Suecia. Disponibilidad alimentaria abuelos paternos correlaciona con mortalidad nietos' },
          { label: 'Modelo trauma (ratón)', value: 'Estrés/miedo en padres transmite hipersensibilidad al estrés vía metilación de glucocorticoides' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Vectores de Herencia Epigenética',
        items: [
          '<strong>Metilación resistente:</strong> Algunas regiones (IAPs, DMRs específicas) escapan desmetilación en PGCs',
          '<strong>Modificaciones de histonas:</strong> H3K4me3, H3K27me3 pueden transmitirse a través de espermatozoides (debate activo)',
          '<strong>ARN en esperma:</strong> tRNA fragmentos (tsRNAs), miRNAs, piRNAs presentes en espermatozoides pueden afectar cigoto',
          '<strong>Fluido seminal:</strong> Componentes no espermáticos pueden influir en ambiente uterino y desarrollo embrionario',
          '<strong>Mitocondrias:</strong> Herencia materna de mtDNA con modificaciones epigenéticas potenciales'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Implicaciones Biomédicas',
        items: [
          '<strong>DOHaD:</strong> Orígenes del desarrollo de salud y enfermedad. Programación fetal por ambiente materno',
          '<strong>Obesidad:</strong> Dieta y metabolismo parentales pueden predisponer a descendencia a obesidad/diabetes',
          '<strong>Exposiciones ambientales:</strong> Tabaco, alcohol, tóxicos, endocrinos disruptores pueden tener efectos multigeneracionales',
          '<strong>Trauma y estrés:</strong> Evidencia emergente de transmisión de respuestas al estrés (debate metodológico intenso)',
          '<strong>Salud pública:</strong> Reconocimiento de que salud ancestral puede impactar generaciones futuras más allá de genética'
        ]
      }
    ]
  },
  {
    id: 'metodos-estudio',
    nombre: 'Métodos de Estudio Epigenético',
    subtitulo: 'Técnicas de análisis epigenómico',
    icono: '🔬',
    categorias: ['metodologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Análisis de Metilación de ADN',
        items: [
          '<strong>Secuenciación bisulfito (BS-seq):</strong> Gold standard. Bisulfito convierte C→U, pero no 5mC. Resolución nucleotídica',
          '<strong>WGBS:</strong> Whole-genome bisulfite sequencing. Cobertura genoma completo. Costoso (~30× cobertura)',
          '<strong>RRBS:</strong> Reduced representation BS-seq. Enriquece islas CpG con MspI. Más económico (~5% genoma)',
          '<strong>Arrays de metilación:</strong> Illumina EPIC (850K sitios CpG). Reproducible, económico, limitado a sitios pre-diseñados',
          '<strong>Pirosecuenciación:</strong> Cuantitativa para regiones específicas. Validación y diagnóstico clínico'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Análisis de Modificaciones de Histonas',
        datos: [
          { label: 'ChIP-seq', value: 'Inmunoprecipitación de cromatina + secuenciación. Mapeo genómico de modificaciones específicas' },
          { label: 'CUT&RUN', value: 'Cleavage Under Targets & Release. Menos células, menos fondo que ChIP. Nucleasa MNase fusionada a pA' },
          { label: 'CUT&Tag', value: 'Similar a CUT&RUN pero con transposasa. Tagmentación in situ para preparación bibliotecas' },
          { label: 'ATAC-seq', value: 'Accesibilidad cromatínica. Tn5 inserta adaptadores en regiones abiertas. Identifica regiones reguladoras' },
          { label: 'Espectrometría masas', value: 'Cuantificación absoluta de modificaciones. Identifica PTMs no caracterizadas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Tecnologías de Tercera Generación',
        items: [
          '<strong>Nanopore:</strong> Oxford Nanopore detecta 5mC y 5hmC directamente sin bisulfito. Lecturas ultra-largas',
          '<strong>PacBio:</strong> Detección de metilación por cinética de incorporación. Lecturas largas (>10 kb)',
          '<strong>Hi-C:</strong> Mapeo de interacciones cromosómicas 3D. Arquitectura nuclear y regulación génica',
          '<strong>scRNA-seq + ATAC:</strong> Perfil multiómico de células individuales. Epigenoma y transcriptoma simultáneos',
          '<strong>Spatial epigenomics:</strong> Tecnologías emergentes para mapear epigenoma con resolución espacial en tejidos'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Aplicaciones Clínicas',
        items: [
          '<strong>Diagnóstico cáncer:</strong> Detección de metilación SEPT9 en sangre para screening cáncer colorrectal (Epi proColon)',
          '<strong>Biopsia líquida:</strong> cfDNA con patrones de metilación específicos de tejido para detección temprana tumores',
          '<strong>Test prenatal:</strong> Análisis epigenético de cfDNA fetal para detección aneuploidías y síndromes impronta',
          '<strong>Relojes epigenéticos:</strong> Algoritmos predictores edad biológica basados en metilación (Horvath, Hannum, PhenoAge)',
          '<strong>Medicina de precisión:</strong> Perfiles epigenéticos para estratificar pacientes y predecir respuesta terapéutica'
        ]
      }
    ]
  }
];
