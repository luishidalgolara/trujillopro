// ═══════════════════════════════════════════════════════════
// MUTACIONES-DATA.JS - Base de datos sobre mutaciones genéticas
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const MUTACIONES_DATA = [
  {
    id: 'substituciones',
    nombre: 'Mutaciones por Sustitución de Bases',
    subtitulo: 'Cambios puntuales en un solo nucleótido',
    icono: '🔁',
    categorias: ['puntuales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Tipos de sustituciones',
        items: [
          '<strong>Transiciones:</strong> Purina → Purina (A↔G) o Pirimidina → Pirimidina (C↔T). Más comunes (~2/3 de sustituciones). Menor distorsión estructural',
          '<strong>Transversiones:</strong> Purina ↔ Pirimidina (A/G ↔ C/T). Menos frecuentes (~1/3). Mayor distorsión estructural',
          '<strong>Frecuencia relativa:</strong> Transiciones ~2x más comunes que transversiones. Desaminación espontánea de 5-metilcitosina → timina (mutación C→T en CpG)',
          '<strong>Sitios CpG:</strong> Dinucleótidos CG metilados. Puntos calientes de mutación. 5-metilC se desamina a T. CpG → TpG',
          '<strong>Tasa de mutación:</strong> ~1.2 × 10⁻⁸ mutaciones/nucleótido/generación en humanos. ~70-100 mutaciones de novo por genoma haploide',
          '<strong>Edad paterna:</strong> Aumenta mutaciones de novo (2 mutaciones adicionales/año de edad). Espermatogénesis continua vs ovogénesis finita'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Consecuencias en proteína',
        datos: [
          { label: 'Silente (sinónima)', value: 'No cambia aminoácido (degeneración del código). GAA→GAG (ambos Glu). ~25% de sustituciones en exones. Puede afectar splicing, estabilidad de mRNA, velocidad de traducción.' },
          { label: 'Missense (sin sentido erróneo)', value: 'Cambia aminoácido. GAA→GUA (Glu→Val). ~75% de sustituciones en exones. Efecto variable: neutro, deletéreo, ganancia de función. Ejemplo: HbS (Glu6Val).' },
          { label: 'Nonsense (sin sentido)', value: 'Codón sentido → stop prematuro. CAG→TAG (Gln→Stop). PTC (premature termination codon). Proteína truncada. NMD degrada mRNA. Ejemplos: β-talasemia, Duchenne.' },
          { label: 'Readthrough', value: 'Codón stop → aminoácido. UAG→CAG (Stop→Gln). Extensión de proteína. Raro. Ejemplo: algunas formas de hemofilia A leve.' },
          { label: 'Afecta splicing', value: 'Mutación en sitio donor/aceptor, rama, ESE/ESS. Altera splicing. Skipping de exón, retención de intrón, uso de sitio críptico. 10-15% de mutaciones patogénicas.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismos mutacionales',
        items: [
          '<strong>Errores de replicación:</strong> ADN pol incorpora base incorrecta. Tasa: 1 en 10⁴-10⁵. Proofreading (3\'→5\' exonucleasa): reduce a 1 en 10⁶-10⁷. MMR: reduce a 1 en 10⁹-10¹⁰',
          '<strong>Desaminación espontánea:</strong> Citosina → Uracilo (~100 eventos/célula/día). BER repara. 5-metilcitosina → Timina (no reconocida como anormal). Mutación C→T en CpG',
          '<strong>Daño oxidativo:</strong> 8-oxo-guanina (8-oxoG) por ROS. Aparea con A en vez de C. Mutaciones G→T. BER (OGG1) repara. ~10,000 lesiones/día',
          '<strong>Tautomerización:</strong> Cambios transitorios en estructura de bases. Forma imino de citosina aparea con A. Formas raras causan apareamientos erróneos durante replicación',
          '<strong>Radiación UV:</strong> Dímeros de timina (T-T). Si no reparados correctamente → mutaciones C→T en sitios TC. Cáncer de piel',
          '<strong>Agentes alquilantes:</strong> O⁶-metilguanina aparea con T. Mutaciones G→A. Nitrosaminas, humo de tabaco'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Predicción de patogenicidad',
        items: [
          '<strong>Criterios estructurales:</strong> Cambio en carga, tamaño, hidrofobicidad. Conservación evolutiva. Localización en dominio funcional, sitio activo',
          '<strong>Herramientas in silico:</strong> PolyPhen-2, SIFT, CADD, REVEL, PROVEAN. Predicen patogenicidad basados en conservación, propiedades fisicoquímicas',
          '<strong>Bases de datos:</strong> ClinVar, HGMD, gnomAD. Frecuencia poblacional (MAF >1% sugiere benigno). Reportes clínicos',
          '<strong>Clasificación ACMG:</strong> 5 categorías: Patogénica, Probablemente patogénica, VUS (variante de significado incierto), Probablemente benigna, Benigna',
          '<strong>Evidencia funcional:</strong> Estudios in vitro, modelos animales. Ensayos de actividad enzimática, unión a ligando, complementación',
          '<strong>Segregación familiar:</strong> Cosegregación con enfermedad en familia. LOD score >3 (odds >1000:1) sugiere ligamiento'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Ejemplos clínicos',
        items: [
          '<strong>Anemia falciforme:</strong> HBB c.20A>T, p.Glu6Val. Transversión. HbS polimeriza → eritrocitos falciformes. Autosómica recesiva. Ventaja heterocigota contra malaria',
          '<strong>Fibrosis quística:</strong> CFTR p.Phe508del (deleción, no sustitución, pero relacionada). >2000 mutaciones descritas. p.Gly551Asp (missense) es tercera más común. Ivacaftor trata mutaciones de gating',
          '<strong>Factor V Leiden:</strong> F5 c.1691G>A, p.Arg506Gln. Resistencia a proteína C activada. Trombofilia hereditaria más común (3-5% europeos). Riesgo aumentado de TVP',
          '<strong>Acondroplasia:</strong> FGFR3 c.1138G>A, p.Gly380Arg. Mutación de novo en >80%. Ganancia de función. Enanismo desproporcionado. Autosómica dominante',
          '<strong>Enfermedad de Huntington:</strong> Expansión CAG (dinámica, no sustitución). Pero mutaciones puntuales en HTT pueden causar fenotipos',
          '<strong>TP53 (cáncer):</strong> >50% de cánceres tienen mutaciones en TP53. Hotspots: codones 175, 245, 248, 273, 282. Pérdida de función. Li-Fraumeni (germinal)',
          '<strong>Síndrome de Lynch:</strong> Mutaciones en MMR (MLH1, MSH2, MSH6, PMS2). Substituciones missense, nonsense. Cáncer colorrectal, endometrial',
          '<strong>Hemocromatosis hereditaria:</strong> HFE p.Cys282Tyr. Homocigosis en 0.5% europeos del norte. Sobrecarga de hierro. Cirrosis, diabetes, cardiomiopatía'
        ]
      }
    ]
  },
  {
    id: 'indels',
    nombre: 'Inserciones y Deleciones (Indels)',
    subtitulo: 'Adiciones o pérdidas de nucleótidos',
    icono: '➕➖',
    categorias: ['puntuales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características',
        items: [
          '<strong>Definición:</strong> Inserciones: adición de uno o más nucleótidos. Deleciones: pérdida de uno o más nucleótidos',
          '<strong>Tamaño:</strong> Indels pequeñas (1-50 pb). Indels medianas (50 pb - 1 kb). Deleciones grandes (>1 kb) se consideran estructurales',
          '<strong>Frecuencia:</strong> ~15-20% de variantes en exomas. Más raras que SNVs pero más propensas a ser patogénicas',
          '<strong>Frameshift vs in-frame:</strong> No múltiplo de 3: frameshift (cambio marco de lectura). Múltiplo de 3: in-frame (inserción/deleción de aminoácidos)',
          '<strong>Hotspots:</strong> Repeticiones de mononucleótidos (poly-A, poly-T), microsatélites. Deslizamiento de polimerasa (slippage)',
          '<strong>Nomenclatura HGVS:</strong> c.76_77insT (inserción), c.76delA (deleción), c.76_78delATC (deleción múltiple)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos de formación',
        datos: [
          { label: 'Deslizamiento de replicación', value: 'Slippage en repeticiones. Polimerasa se desliza → inserción o deleción. Común en microsatélites (STRs). Inestabilidad en deficiencia de MMR (cáncer Lynch).' },
          { label: 'Recombinación no homóloga', value: 'Recombinación entre secuencias repetidas no alélicas. NAHR (non-allelic homologous recombination). Deleciones/duplicaciones. Hotspots: LCRs (low copy repeats).' },
          { label: 'Elementos transponibles', value: 'Inserción de LINE, SINE (Alu), SVA. ~0.3% de enfermedades genéticas. Ejemplo: hemofilia A por inserción LINE-1 en F8.' },
          { label: 'Errores de reparación', value: 'NHEJ (unión extremos no homólogos) introduce indels pequeñas en reparación de DSB. Microhomología puede causar deleciones.' },
          { label: 'Fork stalling and template switching (FoSTeS)', value: 'Horquilla de replicación bloqueada → cambio de molde → indels complejas. Puede generar reordenamientos complejos.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Consecuencias',
        items: [
          '<strong>Frameshift:</strong> Cambio del marco de lectura downstream. Codones completamente diferentes. Generalmente stop prematuro. Proteína truncada no funcional',
          '<strong>NMD (nonsense-mediated decay):</strong> mRNA con PTC >50-55 nt upstream del último exon-exon junction → degradación. Protección contra proteínas truncadas dominantes negativas',
          '<strong>In-frame:</strong> Inserción/deleción de aminoácidos completos. Efecto variable. Puede ser tolerado si no en región crítica',
          '<strong>Afecta splicing:</strong> Indels cerca de sitios de splicing pueden alterar reconocimiento. Creación de sitios crípticos. Skipping o retención',
          '<strong>Ganancia de función:</strong> Raro. Inserción puede crear nuevo sitio de fosforilación, modificación. Ejemplo: algunas mutaciones en PIK3CA (cáncer)',
          '<strong>Haploinsuficiencia:</strong> Una copia funcional insuficiente. Común en genes de factores de transcripción, componentes estructurales'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Detección y análisis',
        items: [
          '<strong>Secuenciación Sanger:</strong> Gold standard para validación. Detecta indels hasta ~1 kb. Electroferogramas muestran doble pico post-deleción',
          '<strong>NGS (secuenciación masiva):</strong> Detecta indels. Challenges: regiones repetitivas, indels grandes. Realineamiento crítico. GATK, Dindel',
          '<strong>Análisis de fragmentos:</strong> PCR de microsatélites. Electroforesis capilar. Útil para MSI (inestabilidad de microsatélites) en cáncer',
          '<strong>Algoritmos de variant calling:</strong> GATK HaplotypeCaller, FreeBayes, VarScan. Distinguen indels reales de errores de secuenciación/alineamiento',
          '<strong>MLPA (Multiplex Ligation-dependent Probe Amplification):</strong> Detecta deleciones/duplicaciones de exones. Complementa NGS. No detecta mutaciones puntuales',
          '<strong>Validación ortogonal:</strong> Siempre validar indels candidatas patogénicas con método independiente. Errores de alineamiento comunes en NGS'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Ejemplos clínicos',
        items: [
          '<strong>Fibrosis quística - ΔF508:</strong> CFTR c.1521_1523delCTT, p.Phe508del. Deleción in-frame de 3 pb. 70% de alelos FQ. Proteína mal plegada → degradación. Lumacaftor/ivacaftor mejora tráfico',
          '<strong>Distrofia muscular de Duchenne:</strong> Deleciones de uno o más exones en DMD (65-70%). Out-of-frame → pérdida completa distrofina. In-frame → Becker (más leve). Exon skipping terapéutico',
          '<strong>Tay-Sachs (Ashkenazi):</strong> HEXA c.1278_1279insTATC (inserción 4 pb). Frameshift → PTC. Deficiencia hexosaminidasa A. Acumulación GM2 gangliósido. Neurodegeneración',
          '<strong>Síndrome de Lynch - MSI:</strong> Deficiencia MMR → acumulación de indels en microsatélites. Inestabilidad MSI-H (>30% loci). Marcador diagnóstico. Respuesta a inmunoterapia (pembrolizumab)',
          '<strong>Hemocromatosis neonatal:</strong> Algunas formas por deleciones en genes de metabolismo de hierro. Sobrecarga fetal. Fallo hepático',
          '<strong>Síndrome de Angelman:</strong> 70% por deleción materna 15q11-q13. Otros: UPD paterna, defectos imprinting, mutaciones UBE3A. Retraso desarrollo, epilepsia, risa inapropiada',
          '<strong>Hemofilia A:</strong> Inversión intrón 22 (40-45%), inversión intrón 1 (5%). Deleciones grandes (5%). Inserciones retrotransposón LINE-1 descritas',
          '<strong>Enfermedad de Huntington-like 2:</strong> Expansión CTG/CAG en JPH3 (no HTT). Fenotipo similar a Huntington. Más común en africanos'
        ]
      }
    ]
  },
  {
    id: 'variaciones-numero-copias',
    nombre: 'Variaciones en el Número de Copias (CNVs)',
    subtitulo: 'Duplicaciones y deleciones grandes (>1 kb)',
    icono: '📊',
    categorias: ['estructurales', 'genomicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características',
        items: [
          '<strong>Definición:</strong> Segmentos de ADN >1 kb presentes en número variable de copias. Deleciones (pérdida), duplicaciones (ganancia)',
          '<strong>Tamaño:</strong> 1 kb - varios Mb. CNVs grandes (>100 kb) detectables por cariotipo/FISH. CNVs pequeñas requieren arrays/NGS',
          '<strong>Frecuencia:</strong> ~12-15% del genoma humano está en CNVs. Cada individuo tiene ~1000-2000 CNVs (>1 kb). ~50-100 de novo/generación',
          '<strong>Distribución:</strong> No aleatoria. Hotspots flanqueados por LCRs (segmental duplications). NAHR entre LCRs causa CNVs recurrentes',
          '<strong>Impacto funcional:</strong> Efecto de dosis génica. Haploinsuficiencia (pérdida), triploinsuficiencia (ganancia). Disrupción de genes en puntos de ruptura',
          '<strong>CNVs benignas vs patogénicas:</strong> Mayoría son benignas/polimórficas. ~15-25% de niños con discapacidad intelectual tienen CNV patogénica'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos de formación',
        datos: [
          { label: 'NAHR (recombinación homóloga no alélica)', value: 'Recombinación entre LCRs (>95% identidad, >10 kb). Recurrente (mismos puntos de ruptura). Ejemplos: deleción 22q11.2 (DiGeorge), duplicación 17p11.2 (Charcot-Marie-Tooth 1A).' },
          { label: 'NHEJ (unión extremos no homólogos)', value: 'Reparación de DSB sin homología. No recurrente (puntos de ruptura variables). Inserciones/deleciones pequeñas en juntura. Más error-prone.' },
          { label: 'FoSTeS (fork stalling template switching)', value: 'Horquilla de replicación bloqueada cambia a molde cercano. CNVs complejas (duplicaciones + deleciones). Microhomología en junturas (2-5 bp).' },
          { label: 'Retrotransposición', value: 'Inserción de elementos LINE, SINE, SVA, retropseudogenes. De novo. ~0.3% de enfermedades genéticas. L1 activos: ~100 en genoma humano.' },
          { label: 'Errores de replicación', value: 'Deslizamiento en secuencias repetitivas. Reinicio de replicación. BIR (break-induced replication). CNVs en tándem.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Detección de CNVs',
        items: [
          '<strong>Cariotipo (bandeo G):</strong> Resolución ~5-10 Mb. Detecta aneuploidías, reordenamientos grandes. No detecta CNVs pequeñas. Bajo rendimiento (~3% en ID)',
          '<strong>FISH (hibridación fluorescente in situ):</strong> Confirmación de CNV específica. Resolución ~100 kb. Targeted. Subtelómeros, síndromes microdelecionales',
          '<strong>Array CGH (comparative genomic hybridization):</strong> Resolución ~50-100 kb (arrays clínicos). Detecta CNVs genoma completo. No detecta translocaciones balanceadas, mosaicismo bajo',
          '<strong>SNP arrays:</strong> Detecta CNVs + LOH (pérdida de heterocigosidad), UPD (disomía uniparental). Útil en cáncer, consanguinidad',
          '<strong>NGS (exoma/genoma):</strong> Detección de CNVs por profundidad de lectura (read depth). Algoritmos: XHMM, CODEX, CNVkit. Validación con MLPA, qPCR',
          '<strong>Long-read sequencing:</strong> PacBio, Oxford Nanopore. Mejor caracterización de puntos de ruptura, inserciones complejas. Resolución hasta secuencias repetitivas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Interpretación clínica',
        items: [
          '<strong>Bases de datos:</strong> DGV (Database of Genomic Variants), DECIPHER, ClinGen. Comparar con variantes benignas conocidas',
          '<strong>Criterios de patogenicidad:</strong> Tamaño (>400 kb más probable patogénico), contenido génico, genes haploinsuficientes, segregación familiar, fenotipo',
          '<strong>Genes de dosage sensitivity:</strong> ClinGen Dosage Sensitivity Map. Genes donde haploinsuficiencia/triploinsuficiencia causa enfermedad',
          '<strong>Penetrancia variable:</strong> Misma CNV puede causar fenotipos variables. Factores modificadores, mosaicismo, imprinting',
          '<strong>CNVs de novo:</strong> Mayor probabilidad de patogenicidad. ~1-1.5% de nacimientos vivos. Aumenta con edad paterna avanzada',
          '<strong>Mosaicismo:</strong> CNV en fracción de células. Fenotipo más leve. Importante en cáncer. NGS detecta hasta ~10% mosaicismo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Síndromes por CNV',
        items: [
          '<strong>Síndrome de DiGeorge (22q11.2 deletion):</strong> Deleción 3 Mb (recurrente, NAHR). Cardiopatía congénita, hipoplasia timo, hipocalcemia, facies característica. 1:4000 nacidos vivos',
          '<strong>Síndrome de Williams (7q11.23 deletion):</strong> Deleción 1.5 Mb incluyendo ELN (elastina). Estenosis aórtica supravalvular, facies de duende, hipercalcemia infantil, personalidad amigable',
          '<strong>Charcot-Marie-Tooth tipo 1A:</strong> Duplicación 17p11.2 (PMP22). Neuropatía periférica desmielinizante. Deleción misma región → HNPP (neuropatía con parálisis por presión)',
          '<strong>Síndrome de Prader-Willi:</strong> Deleción paterna 15q11-q13 (70%). También UPD materna (25%), defecto imprinting (5%). Hipotonía neonatal, hiperfagia, obesidad, hipogonadismo',
          '<strong>Síndrome de Angelman:</strong> Deleción materna 15q11-q13 (70%). Región similar a PWS pero impacto diferente (UBE3A materno). Retraso severo, epilepsia, ataxia, risa inapropiada',
          '<strong>Síndrome de Smith-Magenis (17p11.2 deletion):</strong> Incluye RAI1. Discapacidad intelectual, alteración sueño, conductas autolesivas',
          '<strong>Síndrome de velocardiofacial:</strong> Mismo que DiGeorge (22q11.2). Espectro fenotípico amplio. Riesgo aumentado de esquizofrenia en adultos',
          '<strong>CNVs en autismo:</strong> 16p11.2 del/dup, 15q11-q13 dup, 22q11.2, NRXN1, contactina. ~10-20% casos con CNV rara patogénica. Alta heterogeneidad genética'
        ]
      }
    ]
  },
  {
    id: 'reordenamientos',
    nombre: 'Reordenamientos Cromosómicos',
    subtitulo: 'Translocaciones, inversiones, cromosomas en anillo',
    icono: '🔀',
    categorias: ['estructurales', 'genomicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Tipos de reordenamientos',
        items: [
          '<strong>Translocaciones recíprocas:</strong> Intercambio de segmentos entre cromosomas no homólogos. Balanceadas (sin ganancia/pérdida material) o desbalanceadas',
          '<strong>Translocaciones Robertsonianas:</strong> Fusión de cromosomas acrocéntricos (13, 14, 15, 21, 22) en centrómero. Pérdida de brazos cortos (satélites rDNA redundantes)',
          '<strong>Inversiones:</strong> Segmento cromosómico invertido 180°. Pericéntricas (incluyen centrómero), paracéntricas (no incluyen centrómero)',
          '<strong>Cromosomas en anillo:</strong> Deleciones terminales en ambos brazos → fusión de extremos → anillo. Inestable en división. Pérdida, duplicación',
          '<strong>Isocromosomas:</strong> Dos copias de un brazo cromosómico. Pérdida del otro brazo. Isocromosoma Xq (síndrome de Turner)',
          '<strong>Cromosomas marcadores:</strong> Fragmentos cromosómicos pequeños, origen incierto. Pueden ser benignos o patogénicos según contenido génico'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos y consecuencias',
        datos: [
          { label: 'NHEJ aberrante', value: 'Unión de DSB de cromosomas diferentes → translocación. Común en cáncer. Oncogén activado por fusión o promotor fuerte. Ej: BCR-ABL1 (CML).' },
          { label: 'NAHR intercromosómica', value: 'Recombinación entre LCRs en cromosomas diferentes. Translocaciones recurrentes. Raro en germinal, más común en células somáticas/cáncer.' },
          { label: 'Inversiones y recombinación', value: 'Portador de inversión: crossing-over → gametos con duplicación/deleción. Heterocigoto inversión grande: riesgo ~5-10% descendencia desbalanceada.' },
          { label: 'Translocación balanceada', value: 'Portador generalmente asintomático. Riesgo: gametos desbalanceados, disrupción génica en punto de ruptura, efecto de posición. Infertilidad, abortos recurrentes.' },
          { label: 'Genes de fusión', value: 'Translocación une dos genes → proteína quimérica. Oncogénica en leucemias/linfomas. BCR-ABL1, PML-RARA, EWS-FLI1. Targets terapéuticos.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Detección y diagnóstico',
        items: [
          '<strong>Cariotipo convencional:</strong> Detecta translocaciones balanceadas, inversiones grandes (>5-10 Mb). Resolución limitada. 500-550 bandas',
          '<strong>Cariotipo de alta resolución:</strong> Sincronización celular, bandeo mejorado. ~850 bandas. Mejor detección de anomalías sutiles',
          '<strong>FISH:</strong> Confirmación de translocación. Sondas de fusión (BCR-ABL1), sondas break-apart. Detecta translocaciones crípticas. Interfase FISH (no requiere metafases)',
          '<strong>Array CGH/SNP:</strong> NO detecta translocaciones balanceadas (sin cambio de dosis). Detecta desbalances resultantes en descendencia',
          '<strong>Secuenciación de genoma (WGS):</strong> Detecta todos los tipos. Caracteriza puntos de ruptura a nivel de nucleótido. Mate-pair, paired-end, long reads',
          '<strong>Optical genome mapping:</strong> Tecnología emergente (Bionano). Mapas de genoma completo. Detecta reordenamientos estructurales. Complementa NGS'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Asesoramiento genético',
        items: [
          '<strong>Portador de translocación balanceada:</strong> Riesgo de descendencia desbalanceada. Varía según cromosomas involucrados, sexo del portador. Puede requerir DGP',
          '<strong>Translocación Robertsoniana 14;21:</strong> Riesgo síndrome de Down por trisomía 21 desbalanceada. Riesgo ~10-15% si madre portadora, ~2-3% si padre',
          '<strong>Inversión pericéntrica:</strong> Riesgo de recombinación → dup/del. Inversión inv(9)(p11q13) común, generalmente benigna. Otras inversiones: riesgo variable',
          '<strong>Diagnóstico prenatal:</strong> Cariotipo fetal (amniocentesis, CVS). Array-CGH si desbalance detectado. FISH rápida para aneuploidías comunes',
          '<strong>DGP (diagnóstico genético preimplantacional):</strong> FIV + biopsia embrionaria. Selección de embriones balanceados. Opción para portadores',
          '<strong>Mosaicismo gonadal:</strong> Reordenamiento en línea germinal. Riesgo de recurrencia incluso si padres tienen cariotipo normal'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Ejemplos clínicos y cáncer',
        items: [
          '<strong>Leucemia mieloide crónica (CML):</strong> t(9;22)(q34;q11) - Cromosoma Filadelfia. BCR-ABL1. Tirosina quinasa constitutivamente activa. Imatinib (Gleevec) inhibe BCR-ABL1',
          '<strong>Leucemia promielocítica aguda (APL):</strong> t(15;17)(q24;q21). PML-RARA. Bloqueo de diferenciación. ATRA + trióxido de arsénico: curación >90%',
          '<strong>Linfoma de Burkitt:</strong> t(8;14)(q24;q32) en 80%. MYC bajo control de IgH. También t(2;8), t(8;22). Linfoma agresivo. Común en niños, asociado a EBV',
          '<strong>Sarcoma de Ewing:</strong> t(11;22)(q24;q12) en 85%. EWS-FLI1. Factor de transcripción aberrante. Tumor óseo en niños/adolescentes',
          '<strong>Síndrome de Down por translocación:</strong> t(14;21) Robertsoniana desbalanceada. Trisomía 21. ~3-4% de casos de Down. Riesgo recurrencia aumentado si padre portador balanceado',
          '<strong>Síndrome de Emanuel:</strong> t(11;22) desbalanceada. Trisomía parcial 11q + 22q. Discapacidad intelectual, cardiopatía, genitales ambiguos. Padres con t(11;22) balanceada',
          '<strong>Inversión 16 (leucemia):</strong> inv(16)(p13q22) o t(16;16). CBFB-MYH11. Leucemia mieloide aguda M4Eo. Pronóstico favorable',
          '<strong>Hemofilia A por inversión:</strong> inv(X)(q28) - Inversión intrón 22 de F8. 45% de casos severos. Inversión intrón 1: 5%. Detectables por Southern blot, long-range PCR'
        ]
      }
    ]
  },
  {
    id: 'expansiones-repetidos',
    nombre: 'Expansión de Repetidos en Tándem',
    subtitulo: 'Mutaciones dinámicas - Anticipación genética',
    icono: '🔁',
    categorias: ['dinamicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características de mutaciones dinámicas',
        items: [
          '<strong>Definición:</strong> Aumento en número de repeticiones de secuencias cortas (trinucleótidos, tetranucleótidos, etc). Inestable entre generaciones',
          '<strong>Anticipación genética:</strong> Enfermedad más severa y/o inicio más temprano en generaciones sucesivas. Correlación: más repeticiones → fenotipo más severo',
          '<strong>Umbral patológico:</strong> Alelos normales: rango estable. Premutación: expansión incompleta, riesgo de expandir. Mutación completa: enfermedad manifiesta',
          '<strong>Tipos de secuencias:</strong> Trinucleótidos (CAG, CGG, CTG), tetranucleótidos (CCTG), pentanucleótidos (ATTCT), hexanucleótidos (GGGGCC)',
          '<strong>Mecanismo de expansión:</strong> Deslizamiento de replicación, reparación aberrante de ADN. Estructuras secundarias (hairpins, G-quadruplex) favorecen expansión',
          '<strong>Sesgo parental:</strong> Expansión preferencial en transmisión materna o paterna. Varía según enfermedad'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enfermedades por expansión de CAG',
        datos: [
          { label: 'Huntington', value: 'HTT, CAG en exón 1. Normal: 6-35. Patológico: ≥36. Penetrancia completa ≥40. Expansión paterna (espermatogénesis). Corea, demencia, psiquiátricos. Inicio 30-50 años.' },
          { label: 'Ataxia espinocerebelosa 1 (SCA1)', value: 'ATXN1, CAG. Normal: 6-35. Patológico: 39-82. Ataxia progresiva, disartria, oftalmoplejía. Transmisión paterna aumenta expansión.' },
          { label: 'Ataxia espinocerebelosa 3 (SCA3, Machado-Joseph)', value: 'ATXN3, CAG. Normal: 12-40. Patológico: 55-84. Ataxia cerebelosa, parkinsonismo, neuropatía. Más común en portugueses.' },
          { label: 'Atrofia muscular espinobulbar (Kennedy)', value: 'AR (receptor de andrógenos), CAG. Normal: 9-36. Patológico: 38-62. Ligado a X. Debilidad muscular proximal, bulbar, ginecomastia. Adultos.' },
          { label: 'Atrofia dentatorubropalidoluisiana (DRPLA)', value: 'ATN1, CAG. Normal: 6-35. Patológico: 49-88. Ataxia, coreoatetosis, demencia, epilepsia. Común en Japón.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Otros tipos de expansiones',
        items: [
          '<strong>Expansión CGG - Síndrome X frágil:</strong> FMR1 (5\'-UTR). Normal: 5-44. Intermedio: 45-54. Premutación: 55-200 (FXTAS en adultos). Mutación completa: >200 (metilación, silenciamiento). Discapacidad intelectual',
          '<strong>Expansión CTG - Distrofia miotónica tipo 1:</strong> DMPK (3\'-UTR). Normal: 5-34. Mutación: 50-1000+. RNA tóxico secuestra MBNL1 → splicing aberrante. Miotonía, debilidad, cataratas, cardíacos',
          '<strong>Expansión GAA - Ataxia de Friedreich:</strong> FXN (intrón 1). Normal: 5-33. Patológico: 66-1700. Silenciamiento transcripcional. Ataxia, cardiomiopatía, diabetes. Inicio 5-15 años',
          '<strong>Expansión GGGGCC - ELA/FTD:</strong> C9orf72 (intrón). Normal: <30. Patológico: 100-1600+. RNA tóxico, RAN translation (productos DPR), haploinsuficiencia. ELA (esclerosis lateral amiotrófica) + demencia frontotemporal',
          '<strong>Expansión ATTCT - SCA10:</strong> ATXN10 (intrón). Normal: 10-32. Patológico: 800-4500. Ataxia + epilepsia. Común en México',
          '<strong>Expansión CCTG - Distrofia miotónica tipo 2:</strong> CNBP/ZNF9 (intrón 1). Normal: <30. Patológico: 75-11,000. Fenotipo más leve que DM1. Inicio adulto'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Mecanismos patogénicos',
        items: [
          '<strong>Ganancia de función - PoliQ:</strong> Expansiones CAG → poliglutamina. Agregación proteica. Inclusiones nucleares. Toxicidad, disfunción proteasomal. Huntington, SCAs',
          '<strong>RNA tóxico:</strong> Expansiones en UTR/intrones. mRNA con repeticiones forma hairpins → secuestra RBPs (MBNL1, hnRNPs) → splicing aberrante. DM1, DM2, X frágil premutación',
          '<strong>Pérdida de función:</strong> Metilación de repeticiones CGG → silenciamiento. X frágil (mutación completa): sin FMRP. Friedreich: ↓frataxina',
          '<strong>RAN translation (repeat-associated non-AUG):</strong> Traducción de repeticiones sin AUG. Genera polipéptidos tóxicos (DPR - dipeptide repeats). C9orf72, DM1, SCAs',
          '<strong>Inestabilidad somática:</strong> Expansión continúa en células somáticas. Mosaicismo. Tejidos más afectados tienen expansiones mayores. Ejemplo: estriado en Huntington',
          '<strong>Haploinsuficiencia:</strong> Expansión reduce expresión génica. C9orf72 (50% reducción). Contribuye a patogénesis junto con ganancia de función'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Diagnóstico y manejo',
        items: [
          '<strong>PCR + electroforesis capilar:</strong> Detección de alelos en rango normal-premutación. Alelos grandes (>100 repeticiones) no amplifican bien',
          '<strong>Southern blot:</strong> Gold standard para mutaciones completas grandes (X frágil >200, DM1 >50). Detecta metilación (X frágil)',
          '<strong>Repeat-primed PCR (RP-PCR):</strong> Detecta presencia de expansión sin cuantificar tamaño exacto. Útil para screening',
          '<strong>Long-range PCR:</strong> Amplificación de alelos grandes. Combinado con secuenciación de lectura larga (PacBio, Nanopore) para tamaño exacto',
          '<strong>Asesoramiento genético:</strong> Anticipación. Riesgo de expansión en transmisión. Test predictivo en asintomáticos (adultos): decisión compleja, soporte psicológico',
          '<strong>Diagnóstico prenatal:</strong> Disponible. Amniocentesis/CVS. Consideraciones éticas en enfermedades de inicio adulto (Huntington)',
          '<strong>DGP:</strong> Selección de embriones sin mutación. Opción para portadores. Huntington, DM1, X frágil',
          '<strong>Terapias emergentes:</strong> ASOs para reducir RNA/proteína tóxica (Huntington: fase 3 suspendido 2021, rediseño). Gene therapy. Small molecules para estabilizar repeticiones'
        ]
      }
    ]
  },
  {
    id: 'mutaciones-mitocondriales',
    nombre: 'Mutaciones Mitocondriales',
    subtitulo: 'Genoma mitocondrial - Herencia materna',
    icono: '⚡',
    categorias: ['genomicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características del ADN mitocondrial',
        items: [
          '<strong>Estructura:</strong> Circular, 16,569 pb. 37 genes (13 proteínas OXPHOS, 22 tRNAs, 2 rRNAs). Sin intrones. Muy compacto',
          '<strong>Herencia materna:</strong> Transmitido exclusivamente por óvulo. Espermatozoide contribuye <0.1% mitocondrias (eliminadas activamente)',
          '<strong>Copias múltiples:</strong> 1000-100,000 copias de mtDNA por célula. 2-10 por mitocondria. Poliplasmia permite heteroplasmia',
          '<strong>Heteroplasmia:</strong> Mezcla de mtDNA mutante y wild-type. Proporción variable entre tejidos, individuos, generaciones. Efecto umbral',
          '<strong>Tasa de mutación:</strong> 10-17x mayor que ADN nuclear. Sin histonas, reparación limitada, exposición a ROS',
          '<strong>Código genético variante:</strong> AGA/AGG son stop (no Arg). AUA es Met (no Ile). UGA es Trp (no stop)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Tipos de mutaciones mitocondriales',
        datos: [
          { label: 'Mutaciones puntuales', value: 'Substituciones, indels pequeñas. Genes codificantes o tRNAs. Heteroplasmia variable. Ejemplos: MELAS (A3243G), MERRF (A8344G), LHON (G11778A, G3460A, T14484C).' },
          { label: 'Deleciones grandes', value: 'Pérdida de 1-10 kb. Generalmente esporádicas (no heredadas). Homoplasmia o heteroplasmia alta. Síndrome de Kearns-Sayre, oftalmoplejía externa progresiva (PEO).' },
          { label: 'Duplicaciones', value: 'Raras. Duplicación parcial o completa de mtDNA. Puede causar depleción relativa de mtDNA wild-type.' },
          { label: 'Depleción de mtDNA', value: 'Reducción en número de copias. Causada por mutaciones nucleares (POLG, TK2, DGUOK). Síndrome de depleción mitocondrial. Hepatocerebral, miopático.' },
          { label: 'Mutaciones en genes nucleares', value: '~1500 proteínas mitocondriales codificadas por nDNA. POLG (ADN pol mitocondrial), genes de ensamblaje OXPHOS, proteínas estructurales. Herencia mendeliana.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Efecto umbral y heteroplasmia',
        items: [
          '<strong>Umbral patológico:</strong> Tejidos no afectos hasta que % de mtDNA mutante excede umbral (60-90%). Umbral varía según tejido, tipo de mutación',
          '<strong>Segregación mitótica:</strong> Distribución aleatoria de mitocondrias en división celular. Deriva genética → heteroplasmia variable entre células/tejidos',
          '<strong>Cuello de botella genético:</strong> Reducción drástica de mtDNA durante oogénesis temprana. ~200 moléculas mtDNA por ovocito primordial. Amplificación posterior. Explica saltos en heteroplasmia entre generaciones',
          '<strong>Selección:</strong> mtDNA mutante puede tener ventaja replicativa (heteroplasmy shift). Depleción relativa de wild-type en algunos casos',
          '<strong>Tejidos de alta demanda energética:</strong> Cerebro, músculo, corazón, riñón más afectados. Mayor dependencia de OXPHOS. Síntomas neuromusculares predominantes',
          '<strong>Mosaicismo somático:</strong> Heteroplasmia variable entre tejidos del mismo individuo. Sangre puede no reflejar músculo/cerebro. Biopsia muscular importante'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Diagnóstico',
        items: [
          '<strong>Secuenciación de mtDNA:</strong> Sanger (genes candidatos), NGS (genoma completo). Cuantificar heteroplasmia. Múltiples tejidos (sangre, músculo, orina)',
          '<strong>Enzimología:</strong> Actividad de complejos OXPHOS (I-V) en músculo. Deficiencias específicas orientan diagnóstico. Complejo I (NADH-CoQ reductasa) más común',
          '<strong>Histología muscular:</strong> Ragged red fibers (RRF) en tinción tricrómico de Gomori. COX-negativas (citocromo c oxidasa). Proliferación mitocondrial',
          '<strong>Lactato/piruvato:</strong> Elevados en plasma/LCR. Relación lactato/piruvato >20 sugiere defecto OXPHOS. No específico',
          '<strong>Estudios de imagen:</strong> RM cerebral. Stroke-like lesions (MELAS), ganglios basales calcificados (Leigh), leucoencefalopatía',
          '<strong>Panel de genes nucleares:</strong> Exoma/genoma para mutaciones en genes nucleares mitocondriales. POLG, TWNK, MFN2, OPA1, etc'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Enfermedades mitocondriales',
        items: [
          '<strong>MELAS (encefalomiopatía mitocondrial, acidosis láctica, episodios stroke-like):</strong> m.3243A>G en tRNA-Leu (80%). Stroke-like <40 años, demencia, epilepsia, diabetes, sordera. Heteroplasmia variable',
          '<strong>MERRF (epilepsia mioclónica con ragged red fibers):</strong> m.8344A>G en tRNA-Lys (80%). Mioclonías, ataxia, debilidad, demencia. Inicio niñez/adolescencia',
          '<strong>LHON (neuropatía óptica hereditaria de Leber):</strong> Mutaciones en complejos I (ND1, ND4, ND6). Pérdida aguda visión central bilateral (20-30 años). Hombres>mujeres. Homoplasmia. Idebenona puede ayudar',
          '<strong>Síndrome de Leigh (encefalomiopatía necrotizante subaguda):</strong> Múltiples causas (mtDNA, nDNA). Degeneración ganglios basales, tronco. Hipotonía, regresión desarrollo, acidosis láctica. Inicio infancia',
          '<strong>Síndrome de Kearns-Sayre:</strong> Deleción grande única de mtDNA. Oftalmoplejía externa progresiva, retinitis pigmentosa, bloqueo cardíaco, ataxia. Inicio <20 años. Esporádico',
          '<strong>CPEO (oftalmoplejía externa progresiva crónica):</strong> Mutaciones POLG (60%), deleciones mtDNA múltiples. Ptosis, oftalmoplejía. Más leve que Kearns-Sayre',
          '<strong>Síndrome de Pearson:</strong> Deleción mtDNA. Anemia sideroblástica, disfunción pancreática exocrina. Infancia. Puede evolucionar a Kearns-Sayre',
          '<strong>Terapia de reemplazo mitocondrial:</strong> Transferencia pronuclear, transferencia de huso materno. "Three-parent IVF". Aprobado UK (2015). Controversia ética'
        ]
      }
    ]
  }
];
