// ═══════════════════════════════════════════════════════════
// SEÑALIZACION-DATA.JS - Base de datos de señalización celular
// Fuente: Alberts et al. (2022), Lodish et al. (2021)
// ═══════════════════════════════════════════════════════════

const SEÑALIZACION_DATA = [
  {
    id: "principios-generales",
    nombre: "Principios Generales de Señalización",
    icono: "📡",
    subtitulo: "Conceptos fundamentales - comunicación celular",
    categorias: ["fundamentos"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características básicas",
        items: [
          "Comunicación celular: permite coordinación de actividades entre células individuales",
          "Señal extracelular: ligando (primera mensajero) se une a receptor específico",
          "Transducción de señal: conversión de señal externa en respuesta intracelular",
          "Amplificación: una molécula señal puede generar múltiples moléculas efectoras (cascada)",
          "Especificidad: receptores reconocen ligandos específicos (Kd típico nM-pM)",
          "Integración: múltiples vías convergen para generar respuesta coordinada"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Tipos de señalización",
        datos: [
          { label: "Endocrina", value: "Hormonas viajan por sangre, larga distancia (insulina, cortisol, TSH)" },
          { label: "Paracrina", value: "Señal difunde localmente a células cercanas (factores crecimiento, citoquinas)" },
          { label: "Autocrina", value: "Célula responde a sus propias señales (células T, factores crecimiento)" },
          { label: "Yuxtacrina", value: "Contacto directo célula-célula (Notch-Delta, CAMs)" },
          { label: "Sináptica", value: "Neurotransmisores en hendidura sináptica (ACh, glutamato, dopamina)" },
          { label: "Neuroendocrina", value: "Neuronas secretan hormonas (ADH, oxitocina desde hipófisis)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Componentes básicos de vías",
        items: [
          "Ligando: molécula señal (hormona, neurotransmisor, factor crecimiento, citoquina)",
          "Receptor: proteína que detecta señal y inicia transducción (membrana o intracelular)",
          "Proteínas transductoras: transmiten señal (proteínas G, kinasas, fosfatasas)",
          "Segundos mensajeros: moléculas pequeñas difusibles (cAMP, Ca²⁺, IP₃, DAG)",
          "Proteínas efectoras: ejecutan respuesta celular (enzimas, factores transcripción)",
          "Terminación: mecanismos de apagado (fosfodiesterasas, fosfatasas, desensibilización)"
        ]
      }
    ]
  },

  {
    id: "receptores-gpcr",
    nombre: "Receptores GPCR (7TM)",
    icono: "🎯",
    subtitulo: "Superfamilia más grande - >800 en humanos",
    categorias: ["receptores", "gproteinas"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y clasificación",
        items: [
          "7 dominios transmembrana α-hélice (arquitectura 7TM característica)",
          "Loop intracelular 3 (ICL3) y cola C-terminal interactúan con proteína G",
          "Familias: Clase A (rodopsina-like, 80%), B (secretina), C (metabotrópica), F (frizzled)",
          "Ligandos diversos: fotones, iones, aminas biogénicas, péptidos, proteínas, lípidos",
          "Estados conformacionales: inactivo (R), activo (R*), parcialmente activo",
          "~35% de fármacos aprobados actúan sobre GPCRs (mayor target farmacológico)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Proteínas G heterotriméricas",
        datos: [
          { label: "Gs (estimulatoria)", value: "Gαs activa adenilato ciclasa → ↑cAMP → PKA. Ej: β-adrenérgicos, receptores glucagón" },
          { label: "Gi/o (inhibitoria)", value: "Gαi inhibe adenilato ciclasa → ↓cAMP. Activa canales K⁺ (GIRK). Ej: α2, M2, D2, opioides" },
          { label: "Gq/11", value: "Gαq activa fosfolipasa C-β → IP₃ + DAG → Ca²⁺ + PKC. Ej: α1, M1/M3, H1" },
          { label: "G12/13", value: "Gα12 activa RhoGEFs → RhoA → reorganización citoesqueleto. Ej: receptores trombina" },
          { label: "Subunidad Gβγ", value: "Activa efectores: GIRK, adenilato ciclasa II/IV, fosfolipasa C-β2/3, PI3Kγ" },
          { label: "Transducina (Gt)", value: "Especializada visión, Gαt activa fosfodiesterasa cGMP en fotorreceptores" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Ciclo de activación",
        items: [
          "1. Agonista se une → cambio conformacional GPCR (R → R*, estado activo)",
          "2. GPCR actúa como GEF para proteína G: Gα libera GDP, une GTP",
          "3. Disociación: Gα-GTP se separa de Gβγ, ambos activan efectores independientes",
          "4. Actividad GTPasa intrínseca: Gα hidroliza GTP → GDP (kt ~0.02-0.2 s⁻¹)",
          "5. RGS proteins (Regulators of G protein Signaling) aceleran hidrólisis 100-2000×",
          "6. Reassociación: Gα-GDP + Gβγ → heterotrímero inactivo, listo para nuevo ciclo"
        ]
      },
      {
        tipo: "lista",
        titulo: "Desensibilización y tráfico",
        items: [
          "Fosforilación homóloga: GRKs (GRK2-6) fosforilan Ser/Thr en cola C-terminal de GPCR activo",
          "Reclutamiento β-arrestinas: se unen a GPCR fosforilado, bloquean acoplamiento a proteína G",
          "Internalización: β-arrestinas reclutan AP-2/clatrina → endocitosis del receptor (minutos)",
          "Reciclaje: endosomas de reciclaje desfosforilan receptor → retorno a membrana (clase A)",
          "Degradación: receptores clase B van a lisosomas (downregulation con exposición prolongada)",
          "Biased signaling: ligandos pueden estabilizar conformaciones que favorecen proteína G o β-arrestina"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Asma: β2-agonistas (salbutamol, salmeterol) activan Gs → relajación músculo liso bronquial",
          "Hipertensión: β-bloqueadores (propranolol, metoprolol), antagonistas AT1 (losartán, valsartán)",
          "Esquizofrenia: antipsicóticos (haloperidol, clozapina) bloquean receptores D2 dopaminérgicos",
          "Dolor crónico: agonistas opioides μ (morfina, fentanilo) activan Gi → analgesia",
          "Toxina pertussis: ADP-ribosila Gαi → bloquea señalización → tos ferina",
          "Toxina cólera: ADP-ribosila Gαs → activación constitutiva → diarrea secretoria masiva"
        ]
      }
    ]
  },

  {
    id: "via-camp-pka",
    nombre: "Vía cAMP-PKA",
    icono: "⚡",
    subtitulo: "Segundo mensajero clásico - amplificación en cascada",
    categorias: ["segundos-mensajeros", "gproteinas"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Síntesis y degradación de cAMP",
        items: [
          "Adenilato ciclasa: convierte ATP → cAMP + PPi (9 isoformas transmembrana, 1 soluble)",
          "Activación: Gαs-GTP estimula AC (hasta 1000× actividad basal), Gβγ modula AC2/4/7",
          "Inhibición: Gαi-GTP inhibe AC, Ca²⁺/CaM inhibe AC5/6, PKA fosforila/inhibe AC",
          "Fosfodiesterasas (PDEs): hidrolizan cAMP → 5'-AMP (terminan señal, 11 familias, >50 isoformas)",
          "PDE3: inhibida por cGMP (crosstalk), target de milrinona (inotrópico)",
          "PDE4: familia más abundante, target de roflumilast (EPOC), rolipram (antidepresivo experimental)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Componentes de la vía",
        datos: [
          { label: "Adenilato ciclasa", value: "Vmax ~1000 cAMP/s por enzima, Km ATP ~100 μM, [cAMP] basal ~100 nM → 10 μM" },
          { label: "PKA holoenzima", value: "Tetrámero inactivo R₂C₂ (2 reguladoras + 2 catalíticas)" },
          { label: "Activación PKA", value: "4 cAMP unen subunidades R → disociación → 2C activas (cooperatividad)" },
          { label: "Sustratos PKA", value: "Fosforila Ser/Thr en motivo R-R-X-S*/T* (básicos en -2/-3)" },
          { label: "CREB (PKA nuclear)", value: "Fosforilación Ser133 → recluta CBP/p300 → transcripción genes CRE" },
          { label: "Fosfolamban cardíaco", value: "PKA fosforila PLN → desinhibe SERCA2 → ↑relajación ventricular" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones fisiológicas",
        items: [
          "Metabolismo: glucagón → Gs → cAMP → PKA → glucogenólisis hepática (fosforila fosforilasa kinasa)",
          "Cardíaco: β1-adrenérgicos → Gs → cAMP → PKA → ↑contractilidad, ↑frecuencia (fosforila canales Ca²⁺, PLN)",
          "Lipolisis: epinefrina → β3 → cAMP → PKA → fosforila lipasa sensible hormona → ácidos grasos",
          "Agregación plaquetaria: PGI₂ → IP receptor → Gs → cAMP → PKA → inhibe agregación",
          "Secreción ácida gástrica: histamina → H2 → Gs → cAMP → PKA → activación bomba H⁺/K⁺-ATPasa",
          "Reabsorción agua renal: vasopresina → V2 → cAMP → PKA → inserción AQP2 en túbulo colector"
        ]
      },
      {
        tipo: "lista",
        titulo: "Proteínas AKAP (A-Kinase Anchoring Proteins)",
        items: [
          "Scaffold proteins: anclan PKA cerca de sustratos específicos (compartimentalización)",
          ">50 AKAPs identificadas, localizan PKA en membrana, mitocondria, núcleo, centrosomas",
          "AKAP79/150: ancla PKA, PKC, calcineurina en postsinapsis (plasticidad sináptica LTD)",
          "mAKAP: dirige PKA a retículo sarcoplásmico cardíaco (fosforila RyR2, fosfolamban)",
          "D-AKAP1: mitocondrial, regula metabolismo oxidativo",
          "Péptidos disruptores (AKAP-IS): herramientas experimentales, potencial terapéutico"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Síndrome de Cushing: adenoma pituitario ACTH-secretor, exceso cortisol vía cAMP",
          "Cólera: toxina CT ADP-ribosila Gαs → cAMP↑↑ → secreción Cl⁻/H₂O intestinal → diarrea",
          "Acrodinia (complejo Carney): mutaciones inactivadoras subunidad R de PKA → tumores endocrinos",
          "Insuficiencia cardíaca: desensibilización β1 reduce respuesta cAMP, downregulation receptores",
          "Asma: teofilina (inhibidor no selectivo PDE) aumenta cAMP → broncodilatación"
        ]
      }
    ]
  },

  {
    id: "via-fosfoinositidos",
    nombre: "Vía Fosfoinositidos (PLC-β)",
    icono: "🔥",
    subtitulo: "IP₃ y DAG - Ca²⁺ y PKC",
    categorias: ["segundos-mensajeros", "gproteinas", "calcio"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Hidrólisis de PIP₂",
        items: [
          "Fosfolipasa C-β (PLC-β): hidroliza PI(4,5)P₂ → IP₃ + DAG (6 isoformas PLC-β)",
          "Activación: Gαq-GTP activa PLC-β directamente, Gβγ activa PLC-β2/β3",
          "PI(4,5)P₂: fosfoinositol bifosfato, ~1% fosfolípidos membrana, precursor esencial",
          "IP₃ (inositol 1,4,5-trisfosfato): soluble, difunde al citoplasma → libera Ca²⁺ de RE",
          "DAG (diacilglicerol): hidrofóbico, permanece en membrana → activa PKC",
          "Cinética rápida: [IP₃] y [DAG] aumentan en <1 segundo tras estimulación"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Señalización por Ca²⁺",
        datos: [
          { label: "Receptor IP₃ (IP₃R)", value: "Canal Ca²⁺ en RE, tetrámero, 3 isoformas, abre con IP₃ + Ca²⁺ (CICR)" },
          { label: "[Ca²⁺] basal", value: "~50-100 nM citosol, ~1-2 mM RE, ~1-2 mM extracelular (gradiente 20,000×)" },
          { label: "[Ca²⁺] activado", value: "↑ hasta 1-10 μM (picos, oscilaciones), duración milisegundos-segundos" },
          { label: "Oscilaciones Ca²⁺", value: "Frecuencia codifica intensidad señal, decodificadas por CaM, calcineurina" },
          { label: "Calmodulina (CaM)", value: "Sensor Ca²⁺ universal, 4 sitios EF-hand, activa CaMKs, adenilato ciclasa, PDE1" },
          { label: "Remoción Ca²⁺", value: "SERCA (RE), PMCA (membrana), NCX, mitocondria (buffer)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Proteína kinasa C (PKC)",
        items: [
          "Familia de 10 isoformas: clásicas (α,β,γ - Ca²⁺+DAG), novel (δ,ε,η,θ - solo DAG), atípicas (ζ,ι - independientes)",
          "Activación PKC clásica: Ca²⁺ + DAG + fosfatidilserina → translocación membrana",
          "Dominio C1: une DAG/ésteres forbol (tumor promoters), dominio C2: une Ca²⁺/fosfolípidos",
          "Sustratos: MARCKS, GAP-43 (crecimiento axonal), receptores (fosforila/desensibiliza)",
          "Funciones: proliferación, diferenciación, apoptosis, secreción, contracción músculo liso",
          "Downregulation: activación prolongada → fosforilación → ubiquitinación → degradación proteasomal"
        ]
      },
      {
        tipo: "lista",
        titulo: "Terminación de señal",
        items: [
          "IP₃ 5-fosfatasa: IP₃ → IP₂ (inactivo), rápida (t½ ~5 s)",
          "IP₃ 3-kinasa: IP₃ → IP₄ (señalización alternativa, menos potente para liberar Ca²⁺)",
          "DAG kinasa: DAG → ácido fosfatídico (PA, mensajero secundario con funciones propias)",
          "DAG lipasa: DAG → 2-araquidonoilglicerol (2-AG, endocannabinoide)",
          "Recaptación Ca²⁺: SERCA (mayor contribución), PMCA, NCX restauran [Ca²⁺] basal",
          "Desensibilización receptor: PKC fosforila GPCR → desacoplamiento de Gq"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Litio (trastorno bipolar): inhibe inositol monofosfatasa → depleción inositol → ↓señalización PLC",
          "Activación plaquetaria: trombina/TXA₂ → Gq → PLC → IP₃/DAG → agregación y secreción",
          "Contracción músculo liso vascular: angiotensina II/endotelina → Gq → PKC → contracción",
          "Síndrome de Bartter tipo 5: mutaciones en CaSR renal causan hipercalciuria",
          "Ésteres de forbol (PMA): superactivadores PKC, promotores tumorales experimentales"
        ]
      }
    ]
  },

  {
    id: "receptores-rtk",
    nombre: "Receptores Tirosina Kinasa (RTK)",
    icono: "🔱",
    subtitulo: "58 en humanos - crecimiento y diferenciación",
    categorias: ["receptores", "kinasas"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y familias",
        items: [
          "Arquitectura: dominio extracelular (ligando), TM único, dominio citoplasmático (tirosina kinasa)",
          "Familias: EGFR/ErbB (4), PDGFR (α/β), FGFR (1-4), VEGFR (1-3), InsR/IGF1R, Trk (A/B/C), c-Met, c-Kit",
          "Ligandos: factores de crecimiento (EGF, PDGF, FGF, VEGF, NGF), hormonas (insulina, IGF-1)",
          "Activación: unión ligando → dimerización (homo/hetero) → trans-autofosforilación",
          "Dominios kinasa: conservados, loop de activación con Tyr críticas",
          "Sitios pTyr: sirven como docking sites para proteínas con dominios SH2, PTB"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Vías de señalización principales",
        datos: [
          { label: "Ras/MAPK (ERK1/2)", value: "Grb2-SOS → Ras-GTP → Raf → MEK → ERK → proliferación, diferenciación" },
          { label: "PI3K/Akt", value: "p85-p110 → PIP₃ → PDK1/mTORC2 → Akt → supervivencia, crecimiento, metabolismo" },
          { label: "PLCγ", value: "Fosforilación directa Tyr783 → activa → IP₃/DAG → Ca²⁺/PKC → diferenciación" },
          { label: "JAK/STAT", value: "Fosforilación STAT → homo/heterodimerización → núcleo → transcripción" },
          { label: "Src family kinases", value: "Fyn, Yes, Lyn amplifican señal, reorganización citoesqueleto" },
          { label: "Crosstalk", value: "ERK fosforila/inhibe TSC2 → activa mTOR, Akt fosforila/inhibe Raf" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismo receptor insulina",
        items: [
          "Estructura única: heterotetrámero (α₂β₂) preformado, unido por puentes disulfuro",
          "Activación: insulina une subunidades α → cambio conformacional β → autofosforilación Tyr",
          "IRS proteins (IRS1-4): sustratos principales, múltiples motivos YXXM fosforilados",
          "Vía metabólica: PI3K → Akt → AS160 inactivo → Rab-GTP → translocación GLUT4",
          "Vía mitogénica: Grb2/SOS → Ras → MAPK → crecimiento celular",
          "Inhibición: PTP1B (fosfatasa), SOCS (feedback negativo), Ser/Thr kinasas (mTOR, PKC, JNK)"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación negativa",
        items: [
          "Fosfatasas proteína-tirosina: PTP1B, SHP2 defosforilan RTKs y efectores downstream",
          "Ubiquitinación: Cbl (E3 ligasa) ubiquitina RTKs activados → endocitosis → degradación lisosomal",
          "Inhibidores endógenos: SOCS proteins secuestran sitios pTyr, marcan para degradación",
          "Feedback transcripcional: Sprouty, Spred bloquean Ras/MAPK, inducidos por ERK",
          "Compartimentalización: endocitosis puede prolongar señal desde endosomas (señalización sostenida)",
          "Balance kinasa/fosfatasa: determina duración y amplitud de señalización"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer mama Her2+: amplificación/sobreexpresión ErbB2, trastuzumab (anti-Her2), pertuzumab",
          "Cáncer pulmón NSCLC: mutaciones activadoras EGFR (del19, L858R), gefitinib, erlotinib, osimertinib",
          "Leucemia mieloide crónica: translocación BCR-ABL genera RTK constitutiva, imatinib (Gleevec)",
          "GIST: mutaciones activadoras c-Kit, tratamiento imatinib, sunitinib",
          "Diabetes tipo 2: resistencia insulina, defecto señalización IR/IRS, metformina activa AMPK",
          "Acondroplasia: mutación activadora FGFR3 causa enanismo, vosoritide (análogo CNP) aprobado"
        ]
      }
    ]
  },

  {
    id: "via-ras-mapk",
    nombre: "Vía Ras/MAPK (ERK1/2)",
    icono: "🧬",
    subtitulo: "Cascada de kinasas - proliferación celular",
    categorias: ["kinasas", "proliferacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes de la cascada",
        items: [
          "Ras (H-Ras, K-Ras, N-Ras): GTPasa pequeña (21 kDa), anclada a membrana (farnesilación)",
          "Raf (A-Raf, B-Raf, C-Raf/Raf-1): MAP3K (MAPK kinase kinase), Ser/Thr kinasa",
          "MEK1/2 (MAP2K): kinasa dual, fosforila Thr y Tyr en loop activación de ERK",
          "ERK1/2 (MAPK): efectores finales, fosforilan >100 sustratos (citosol y núcleo)",
          "Scaffold proteins: KSR1/2, MP1 organizan complejo, aumentan eficiencia señalización",
          "Arquitectura modular: cada nivel amplifica señal (1 RTK → 10 Ras → 100 Raf → 1000 MEK → 10,000 ERK)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Activación secuencial",
        datos: [
          { label: "1. RTK activado", value: "pTyr recluta Grb2 (adaptador SH2-SH3) + SOS (GEF, unido vía SH3)" },
          { label: "2. Ras-GDP → Ras-GTP", value: "SOS cataliza intercambio nucleótido, Ras se activa (t½ ~min sin GAP)" },
          { label: "3. Raf reclutamiento", value: "Ras-GTP une dominio RBD de Raf → membrana, fosforilación activadora" },
          { label: "4. MEK1/2 activación", value: "Raf fosforila Ser217/221 en MEK (kinasa dual específica)" },
          { label: "5. ERK1/2 activación", value: "MEK fosforila Thr202/Tyr204 en ERK (motivo TEY en loop)" },
          { label: "6. Translocación nuclear", value: "ERK activo → núcleo vía importinas, fosforila factores transcripción" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Sustratos de ERK",
        items: [
          "Factores transcripción: Elk-1 (complejo SRF, genes inmediatos tempranos c-fos), c-Myc, CREB",
          "Kinasas: RSK (p90 ribosomal S6 kinase) → CREB, histona H3, fosforila/inactiva Bad",
          "Fosfatasas: MKPs (MAPK phosphatases, dual specificity) feedback negativo (inducidas por ERK)",
          "Proteínas citoesqueleto: paxilina, calpaina (migración celular)",
          "Proteínas apoptóticas: Bad (inactivación por fosforilación), Bim (degradación)",
          "Reguladores ciclo celular: p27Kip1 (degradación), ciclina D1 (estabilización)"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y terminación",
        items: [
          "GAPs (GTPase Activating Proteins): NF1, p120RasGAP aceleran hidrólisis Ras-GTP (103-105×)",
          "Fosfatasas MKP/DUSP: defosforilan pThr y pTyr de ERK (feedback negativo, inducibles)",
          "Sprouty/Spred: inhiben Ras, inducidos por ERK (feedback transcripcional)",
          "Degradación: ubiquitinación de componentes vía (Raf, MEK), downregulation RTK",
          "Compartimentalización: secuestro en citoplasma vs núcleo modula sustratos accesibles",
          "Duración señal: señal transitoria (10-30 min) → proliferación, sostenida (>1 h) → diferenciación"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Mutaciones Ras oncogénicas: K-Ras (páncreas, colon), N-Ras (melanoma), H-Ras (vejiga) - 30% cánceres",
          "Mutaciones B-Raf: V600E (90% mutaciones B-Raf) en melanoma, vemurafenib, dabrafenib",
          "Síndrome Noonan: mutaciones germinales Ras/Raf/MEK causan RASopatía (cardiopatía, baja estatura)",
          "Inhibidores MEK: trametinib, cobimetinib (combinados con inhibidores B-Raf en melanoma)",
          "Neurofibromatosis tipo 1: pérdida NF1 (RasGAP) → Ras hiperactivo → neurofibromas, gliomas"
        ]
      }
    ]
  },

  {
    id: "via-pi3k-akt",
    nombre: "Vía PI3K/Akt",
    icono: "🛡️",
    subtitulo: "Supervivencia celular y metabolismo",
    categorias: ["kinasas", "supervivencia"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes principales",
        items: [
          "PI3K (fosfoinositido 3-kinasa): heterodímero p85 (reguladora) + p110 (catalítica)",
          "Clases PI3K: Clase IA (p110α/β/δ, regulada por RTK), Clase IB (p110γ, GPCR), Clase II/III",
          "Reacción: fosforila PI(4,5)P₂ → PI(3,4,5)P₃ (PIP₃) en posición 3' del inositol",
          "PIP₃: segundo mensajero lipídico, recluta proteínas con dominios PH (pleckstrin homology)",
          "PDK1: fosforila Thr308 en loop activación Akt (constitutivamente activo)",
          "mTORC2: fosforila Ser473 en motivo hidrofóbico Akt (activación completa)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Sustratos de Akt y funciones",
        datos: [
          { label: "GSK3β", value: "Fosforilación Ser9 → inactiva → ↑glucógeno sintasa, ↑síntesis proteínas" },
          { label: "TSC2", value: "Fosforilación → inactiva complejo TSC1/2 → Rheb-GTP activo → mTORC1 activo" },
          { label: "FoxO (1/3a/4)", value: "Fosforilación → exclusión nuclear → ↓genes proapoptóticos (Bim, FasL)" },
          { label: "Bad", value: "Fosforilación Ser136 → secuestro por 14-3-3 → antiapoptosis (no inhibe Bcl-2)" },
          { label: "MDM2", value: "Fosforilación → núcleo → ubiquitina p53 → ↓apoptosis" },
          { label: "AS160/TBC1D4", value: "Fosforilación → inactiva GAP → Rab-GTP → translocación GLUT4" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Vía mTOR downstream",
        items: [
          "mTORC1: complejo mTOR + Raptor + mLST8, sensor nutrientes/energía/factores crecimiento",
          "Activación: Rheb-GTP (regulado por TSC1/2) + aminoácidos (Rag GTPasas) + energía (AMPK)",
          "Sustratos mTORC1: S6K (fosforila S6 ribosomal → síntesis proteínas), 4E-BP1 (libera eIF4E → traducción)",
          "Lipogénesis: mTORC1 → SREBP1/2 → síntesis ácidos grasos, colesterol",
          "Autofagia: mTORC1 activo inhibe ULK1 → bloquea autofagia (vía catabólica)",
          "Feedback negativo: S6K fosforila/inhibe IRS1 → resistencia insulina con hiperactivación crónica"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación negativa (PTEN)",
        items: [
          "PTEN (fosfatasa): desfosforila PIP₃ → PI(4,5)P₂ (revierte acción PI3K)",
          "Supresor tumoral: mutado/perdido en ~50% cánceres (próstata, endometrio, glioblastoma)",
          "Localización: membrana (activo), citoplasma/núcleo (inactivo, regulado por fosforilación)",
          "Regulación: fosforilación Ser/Thr (C-terminal) reduce actividad, oxidación reversible (H₂O₂)",
          "PHLPP: fosfatasa desfosforila Akt Ser473 (terminación señal)",
          "PP2A: fosfatasa desfosforila Akt Thr308, regulación compleja (activación/inhibición según contexto)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer: mutaciones activadoras PI3K (PIK3CA-H1047R, E545K), pérdida PTEN, amplificación Akt",
          "Síndrome de Cowden: mutaciones germinales PTEN → hamartomas, riesgo cáncer mama/tiroides",
          "Diabetes tipo 2: resistencia insulina, defecto señalización Akt, feedback negativo S6K/IRS1",
          "Inhibidores clínicos: everolimus/temsirolimus (rapálogos, mTORC1), alpelisib (PI3Kα), capivasertib (Akt)",
          "Síndrome PTEN hamartoma tumor: macrocefalia, lipomas, pólipos intestinales"
        ]
      }
    ]
  },

  {
    id: "jak-stat",
    nombre: "Vía JAK/STAT",
    icono: "📊",
    subtitulo: "Citoquinas e interferones - respuesta inmune",
    categorias: ["kinasas", "inmunologia"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes y activación",
        items: [
          "JAKs (Janus kinases): 4 miembros (JAK1, JAK2, JAK3, TYK2), tirosina kinasas no receptoras",
          "Asociación constitutiva: JAKs se unen a dominios intracelulares de receptores citoquinas",
          "Receptores tipo I/II: sin actividad kinasa intrínseca, dependen de JAKs (>40 citoquinas)",
          "Trans-autofosforilación: dimerización receptor → JAKs fosforilan mutuamente loop activación",
          "STATs (Signal Transducers and Activators of Transcription): 7 miembros (STAT1-6, incluye 5a/5b)",
          "Estructura STAT: dominio SH2 (une pTyr), dominio trans-activación, dominio unión DNA"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Parejas receptor-JAK-STAT",
        datos: [
          { label: "IFN-α/β (tipo I)", value: "IFNAR1/2 → JAK1/TYK2 → STAT1/STAT2 + IRF9 (ISGF3) → genes antivirales" },
          { label: "IFN-γ (tipo II)", value: "IFNGR1/2 → JAK1/JAK2 → STAT1 homodímero (GAF) → inmunidad celular" },
          { label: "IL-6 familia", value: "gp130 → JAK1/JAK2/TYK2 → STAT3 → inflamación, fase aguda" },
          { label: "IL-2, IL-7, IL-15", value: "Cadena γc → JAK1/JAK3 → STAT5 → proliferación linfocitos T/NK" },
          { label: "Eritropoyetina", value: "EPOR → JAK2 → STAT5 → eritropoyesis" },
          { label: "Hormona crecimiento", value: "GHR → JAK2 → STAT5 → crecimiento, IGF-1" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismo de señalización",
        items: [
          "1. Citoquina une receptor → dimerización/oligomerización",
          "2. JAKs activadas fosforilan Tyr en dominios intracelulares receptor (docking sites)",
          "3. STATs reclutadas vía dominios SH2 → fosforilación Tyr por JAKs (ej: STAT3 Tyr705)",
          "4. STATs fosforiladas dimerizán (SH2:pTyr recíproco) → exponen señal localización nuclear",
          "5. Translocación nuclear → unión secuencias GAS/ISRE en promotores",
          "6. Transcripción genes target: citoquinas, factores transcripción, reguladores ciclo celular"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación negativa",
        items: [
          "SOCS (Suppressors of Cytokine Signaling): 8 miembros, feedback negativo (inducidos por STATs)",
          "Mecanismos SOCS: bloquean sitios pTyr, inhiben actividad catalítica JAK, marcan para ubiquitinación",
          "SOCS1/3: reguladores críticos JAK2, mutaciones/pérdida → enfermedades mieloproliferativas",
          "PIAS (Protein Inhibitors of Activated STATs): bloquean unión DNA, promueven SUMOilación",
          "Fosfatasas: SHP1/2, PTP1B, CD45 defosforilan JAKs y STATs",
          "Proteínas nucleares: PIAS, SMRT, corepresores modulan actividad transcripcional STATs"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Policitemia vera: mutación JAK2 V617F (>95% casos) → activación constitutiva → eritrocitosis",
          "SCID ligado a X: mutaciones cadena γc → pérdida señalización IL-2/7/15 → inmunodeficiencia severa",
          "Artritis reumatoide: tofacitinib (inhibidor JAK1/3), baricitinib (JAK1/2) reducen inflamación",
          "Enfermedad inflamatoria intestinal: upadacitinib, filgotinib (inhibidores JAK)",
          "Mielofibrosis: ruxolitinib (inhibidor JAK1/2) controla síntomas, reduce esplenomegalia"
        ]
      }
    ]
  },

  {
    id: "tgf-beta-smad",
    nombre: "Vía TGF-β/Smad",
    icono: "🧪",
    subtitulo: "Superfamilia TGF-β - desarrollo y homeostasis",
    categorias: ["receptores", "desarrollo"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes de la vía",
        items: [
          "Ligandos: >30 miembros (TGF-β1/2/3, activinas, BMPs, GDF, nodal, inhibinas)",
          "Receptores tipo I y II: Ser/Thr kinasas (7 tipo I, 5 tipo II), heterotetraméricas",
          "Smads R-Smads: Smad2/3 (TGF-β/activina), Smad1/5/8 (BMP), fosforiladas por receptores",
          "Co-Smad: Smad4 común, heterodimeriza con R-Smads → translocación nuclear",
          "I-Smads: Smad6/7 inhibitorias, feedback negativo, compiten por receptor",
          "Nomenclatura: Smad = fusión de nombres C. elegans (Sma) y Drosophila (Mad)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Dos vías principales",
        datos: [
          { label: "TGF-β/Activina", value: "TβRI (ALK5) fosforila Smad2/3 → Smad4 → núcleo → inhibición proliferación, EMT" },
          { label: "BMP/GDF", value: "BMPRI (ALK2/3/6) fosforila Smad1/5/8 → Smad4 → núcleo → diferenciación, desarrollo óseo" },
          { label: "Señal canónica", value: "Ligando → RII fosforila RI → RI fosforila R-Smad motivo SSXS C-terminal" },
          { label: "Smad2/3 diana", value: "PAI-1, p15INK4b, p21CIP1 (parada ciclo), colágeno, fibronectina (ECM)" },
          { label: "Smad1/5/8 diana", value: "Id1/2/3, Msx2, Runx2 (osteogénesis), factores condrogénesis" },
          { label: "Cofactores nucleares", value: "FoxH1, Mixer, p300/CBP, TFE3 modulan especificidad transcripcional" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Señalización no canónica (Smad-independiente)",
        items: [
          "MAPK: TβRI activa TAK1 → p38, JNK, ERK (estrés, apoptosis)",
          "PI3K/Akt: activación directa por TβRI/II, modulación supervivencia",
          "Rho GTPasas: RhoA, Rac1, Cdc42 activadas → reorganización citoesqueleto, migración",
          "Par6: TβRII fosforila Par6 → ubiquitinación RhoA → pérdida polaridad epitelial (EMT)",
          "mTOR: activación vía PI3K o directa, síntesis proteínas",
          "Crosstalk extenso: integra señales Wnt, Notch, RTK, contextual (tipo celular, estadio desarrollo)"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y terminación",
        items: [
          "Smad7: inducida por TGF-β, recluta Smurf1/2 (E3 ubiquitin ligasas) → ubiquitinación receptor",
          "Fosfatasas: PPM1A desfosforila Smad2/3, terminación señal nuclear",
          "Exportación nuclear: Smad4 exportado continuamente (señal NES), balance con importación",
          "Competencia Smad4: limitante, ratio R-Smad:Smad4 determina intensidad",
          "Moduladores extracelulares: noggin, chordin (antagonistas BMP), folistatina (antagonista activina)",
          "Proteínas co-represoras: Ski, SnoN reclutadas por Smads → represión transcripcional"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer: mutaciones inactivadoras Smad4 (páncreas, colon), TβRII (colon MSI), función dual TGF-β",
          "Síndrome de Marfan: mutaciones fibrilina-1 → desregulación TGF-β → aneurismas aórticos",
          "Displasia fibromuscular: mutaciones ALK1/Endoglina → telangiectasias, AVMs",
          "Osteoartritis: desbalance TGF-β/BMP contribuye degradación cartílago",
          "Fibrosis: TGF-β promueve deposición matriz extracelular (pulmón, hígado, riñón), pirfenidona/nintedanib"
        ]
      }
    ]
  },

  {
    id: "wnt-beta-catenina",
    nombre: "Vía Wnt/β-catenina",
    icono: "🔮",
    subtitulo: "Desarrollo embrionario y homeostasis tisular",
    categorias: ["desarrollo", "proliferacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes principales",
        items: [
          "Ligandos Wnt: 19 miembros (Wnt1, Wnt3a, etc.), glicoproteínas secretadas palmitoiladas",
          "Receptores Frizzled: 7TM (10 isoformas), co-receptor LRP5/6 (vía canónica)",
          "β-catenina: proteína multifuncional (adhesión celular + señalización transcripcional)",
          "Complejo de destrucción: APC, Axina, GSK3β, CK1α → fosforilan β-catenina para degradación",
          "Dishevelled (Dvl): proteína scaffold, activada por Fz, inhibe complejo destrucción",
          "Tres vías: canónica (β-catenina), planar cell polarity (PCP), Wnt/Ca²⁺"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Vía canónica: ausencia vs presencia Wnt",
        datos: [
          { label: "Sin Wnt (OFF)", value: "Complejo APC/Axina/GSK3β/CK1 fosforila β-catenina Ser33/37/Thr41" },
          { label: "Fosforilación β-cat", value: "β-TrCP reconoce β-cat fosforilada → ubiquitinación → degradación proteasomal" },
          { label: "[β-catenina] basal", value: "Muy baja citoplasma (~100 moléculas), supresión transcripcional por Groucho/TLE" },
          { label: "Con Wnt (ON)", value: "Wnt une Fz + LRP5/6 → recluta Dvl → fosforilación LRP (PPPSP motifs)" },
          { label: "Inhibición destrucción", value: "Axina reclutada a membrana, GSK3β secuestrada → β-cat acumula citoplasma" },
          { label: "Transcripción", value: "β-cat → núcleo, desplaza Groucho de TCF/LEF → recluta CBP/p300 → transcripción" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Genes target y funciones",
        items: [
          "Proliferación: c-Myc, ciclina D1, Id2 (mantienen células madre, cáncer)",
          "Supervivencia: survivina, Bcl-2 (antiapoptosis)",
          "Diferenciación: PPAR-γ (adipogénesis), Runx2 (osteoblastos), Sox9 (condrocitos)",
          "Feedback: Axina2, Dickkopf-1 (DKK1) inducidos por Wnt (autorregulación)",
          "EMT: Slug, Twist, Snail (invasión tumoral, desarrollo embrionario)",
          "Angiogénesis: VEGF (formación vasos)"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación extracelular e intracelular",
        items: [
          "Secreted Frizzled-Related Proteins (sFRP): dominios CRD solubles, secuestran Wnt",
          "DKK1-4: unen LRP5/6, bloquean señalización, inducidos por Wnt (feedback negativo)",
          "Sclerostina: antagonista LRP5/6, inhibidor osteoblástico",
          "R-spondins: potenciadores Wnt, se unen LGR4/5/6, estabilizan Fz",
          "Tankyrasas: poli-ADP-ribosilación Axina → degradación → ↑señalización Wnt",
          "GSK3 inhibición: Akt, ERK también inhiben GSK3 → crosstalk con insulina, factores crecimiento"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer colorrectal: mutaciones APC (80%), β-catenina (10%) → activación constitutiva",
          "Hepatoblastoma: mutaciones activadoras β-catenina en >90% casos",
          "Osteoporosis-pseudoglioma: mutaciones pérdida función LRP5 → baja masa ósea, ceguera",
          "Sclerosteosis: mutaciones SOST (esclerostina) → hueso denso, gigantismo",
          "Melanoma: reactivación vía Wnt contribuye progresión, resistencia terapia",
          "Fármacos: romosozumab (anti-esclerostina, osteoporosis), tankyrasas inhibidores (cáncer, experimental)"
        ]
      }
    ]
  },

  {
    id: "notch",
    nombre: "Vía Notch",
    icono: "✂️",
    subtitulo: "Comunicación yuxtacrina - decisiones celulares",
    categorias: ["desarrollo", "diferenciacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes y arquitectura",
        items: [
          "Receptores Notch: 4 en mamíferos (Notch1-4), proteínas transmembrana tipo I",
          "Estructura: 36 repeticiones EGF-like extracelulares, región transmembrana, dominio intracelular NICD",
          "Ligandos: Delta-like (Dll1, 3, 4), Jagged (Jag1, 2), proteínas transmembrana en célula adyacente",
          "Procesamiento: S1 (Furin en Golgi), S2 (ADAM10/17 tras unión ligando), S3 (γ-secretasa libera NICD)",
          "Señalización yuxtacrina: requiere contacto directo célula-célula",
          "Inhibición lateral: célula con Notch alto inhibe vecinas (patrón salt-and-pepper)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Mecanismo de señalización",
        datos: [
          { label: "1. Trans-activación", value: "Ligando en célula vecina (trans) une Notch, no ligando cis (mismo célula)" },
          { label: "2. Endocitosis ligando", value: "Fuerza mecánica por endocitosis expone sitio S2 en Notch" },
          { label: "3. Corte S2 (ADAM)", value: "ADAM10/17 (metaloproteasas) cortan dominio extracelular (NECD shed)" },
          { label: "4. Corte S3 (γ-secretasa)", value: "Complejo presenilin libera NICD (dominio intracelular) del TM" },
          { label: "5. Translocación nuclear", value: "NICD → núcleo, se une CSL/RBP-Jκ (factor transcripción)" },
          { label: "6. Coactivación", value: "NICD recluta Mastermind-like (MAML) + p300 → transcripción genes target" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Genes target y funciones",
        items: [
          "Hairy/Enhancer of Split (Hes1, 5, 7): represores transcripcionales bHLH",
          "Hey1/2: represores, desarrollo cardiovascular, somitogénesis",
          "Destinos celulares: neuronas vs glía, linfocitos T vs B, arterias vs venas",
          "Células madre: mantiene estado indiferenciado en intestino, piel, hematopoyéticas",
          "Inhibición diferenciación: Hes1 reprime genes proneurales (Mash1, Neurogenin)",
          "Patrón iterativo: oscilaciones Hes1 (reloj segmentación) controlan somitogénesis"
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y modulación",
        items: [
          "Glicosilación: O-fucosa, O-glucosa en repeticiones EGF modulan afinidad ligando (Fringe)",
          "Lunatic fringe: β1,3-N-acetilglucosaminiltransferasa, aumenta respuesta Delta, reduce Jagged",
          "Ubiquitinación: Numb, Itch, Fbw7 promueven degradación NICD",
          "Fosforilación: CDKs fosforilan NICD → reclutamiento Fbw7 → degradación",
          "Inhibición cis: ligandos en misma célula inhiben Notch (E3 ligasas Neuralized, Mib)",
          "Endocitosis: reciclaje continuo receptores y ligandos, crítico para activación"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Leucemia linfoblástica aguda T: mutaciones activadoras Notch1 (~60% casos), inhibidores γ-secretasa",
          "Síndrome Alagille: mutaciones Jagged1 → defectos hígado, corazón, vértebras, ojos",
          "CADASIL: mutaciones Notch3 → demencia vascular, strokes recurrentes",
          "Cáncer: papel dual, oncogén (T-ALL) o supresor tumoral (piel, hígado) según contexto",
          "Enfermedad de Alzheimer: inhibidores γ-secretasa empeoran (procesamiento APP), ensayos fracasaron"
        ]
      }
    ]
  },

  {
    id: "hedgehog",
    nombre: "Vía Hedgehog",
    icono: "🦔",
    subtitulo: "Morfógeno - patrón desarrollo embrionario",
    categorias: ["desarrollo", "proliferacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Componentes principales",
        items: [
          "Ligandos: Sonic (Shh), Indian (Ihh), Desert (Dhh) Hedgehog, proteínas secretadas modificadas",
          "Modificaciones: palmitoilación N-terminal, colesterol C-terminal (anclaje membrana, gradiente)",
          "Patched1 (Ptch1): receptor 12TM, homólogo RND transporters, inhibe Smoothened (Smo)",
          "Smoothened (Smo): GPCR atípico (7TM), transductor señal, regulado por esteroles",
          "Factores transcripción Gli: Gli1 (activador), Gli2 (activador/represor), Gli3 (principalmente represor)",
          "Cilium primario: organela esencial para señalización Hh en vertebrados (antena sensorial)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Mecanismo en cilium primario",
        datos: [
          { label: "Estado OFF (sin Hh)", value: "Ptch1 en cilium, Smo excluido, PKA/GSK3/CK1 fosforilan Gli2/3" },
          { label: "Procesamiento Gli", value: "Gli3 fosforilado → proteólisis parcial → Gli3R (represor) → núcleo" },
          { label: "Represión transcripcional", value: "Gli3R reprime genes target Hh (Ptch1, Gli1, dHand, HNF3β)" },
          { label: "Estado ON (con Hh)", value: "Shh une Ptch1 → Ptch1 sale de cilium, Smo entra y acumula" },
          { label: "Activación Smo", value: "Esteroles (oxysteroles) unen dominio CRD, fosforilación C-terminal" },
          { label: "Activación Gli", value: "Supresión Sufu/PKA → Gli2/3 forma completa (activadores) → núcleo" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Genes target y funciones",
        items: [
          "Feedback: Ptch1, Gli1 inducidos (Gli1 es marcador de activación Hh)",
          "Proliferación: ciclina D1, ciclina E, N-Myc (expansión progenitores)",
          "Supervivencia: Bcl-2 (antiapoptosis)",
          "Diferenciación: factores específicos de linaje (Nkx2.2, Pax6 en tubo neural)",
          "Angiogénesis: VEGF, Ang1/2",
          "Patrón AP: genes Hox, determinación identidad segmentos corporales"
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones en desarrollo y adulto",
        items: [
          "Desarrollo: patrón tubo neural ventral (5 dominios neuronales), somitas, extremidades",
          "Morfógeno: gradiente Shh especifica tipos neuronales según concentración",
          "Crecimiento óseo: Ihh regula proliferación condrocitos, diferenciación osteoblastos",
          "Células madre: mantiene nichos (folículo piloso, intestino, cerebro)",
          "Regeneración: reactivación en reparación tisular y cicatrización",
          "Homeostasis: quiescencia en adulto, reactivación patológica en cáncer"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Holoprosencefalia: mutaciones SHH causan fusión hemisferios cerebrales, defectos craneofaciales",
          "Síndrome de Gorlin: mutaciones PTCH1 → predisposición carcinoma basocelular, meduloblastoma",
          "Meduloblastoma: 30% activación Hh (mutaciones PTCH1, SMO, SUFU), vismodegib/sonidegib",
          "Carcinoma basocelular: 90% mutaciones Hh, vismodegib (anti-Smo) aprobado FDA",
          "Ciclopamina: teratógeno natural (planta Veratrum), inhibe Smo, causó holoprosencefalia en ovejas"
        ]
      }
    ]
  },

  {
    id: "nfkb",
    nombre: "Vía NF-κB",
    icono: "🔥",
    subtitulo: "Inflamación e inmunidad - respuesta estrés",
    categorias: ["inmunologia", "inflamacion"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Familia NF-κB",
        items: [
          "5 miembros: RelA (p65), RelB, c-Rel, NF-κB1 (p105→p50), NF-κB2 (p100→p52)",
          "Homo/heterodímeros: p65/p50 más común (vía clásica), p52/RelB (vía alternativa)",
          "Dominio RHD: unión DNA (secuencias κB), dimerización, interacción IκB",
          "Activación canónica: TNF-α, IL-1β, LPS, antígenos (TCR, BCR)",
          "Activación no canónica: CD40L, BAFF, linfotoxina-β (desarrollo linfoide)",
          "Estado basal: NF-κB secuestrado en citoplasma por proteínas IκB"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Vía canónica vs no canónica",
        datos: [
          { label: "Vía canónica (rápida)", value: "TNF-α, IL-1, LPS → IKKβ/γ/NEMO → fosforila IκBα → ubiquitinación" },
          { label: "Degradación IκBα", value: "Proteasoma degrada IκBα → libera p65/p50 → núcleo (min)" },
          { label: "Genes inmediatos", value: "IL-6, IL-8, TNF-α, COX-2, iNOS (inflamación aguda)" },
          { label: "Vía no canónica (lenta)", value: "CD40L, BAFF → NIK acumula → IKKα fosforila p100" },
          { label: "Procesamiento p100", value: "p100 → p52 (proteólisis parcial) + RelB → núcleo (horas)" },
          { label: "Genes desarrollo", value: "CXCL12, CXCL13, BAFF (organogénesis linfoide, maduración células B)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Complejo IKK y regulación",
        items: [
          "IKK complejo: IKKα, IKKβ (catalíticas), IKKγ/NEMO (reguladora, esencial vía canónica)",
          "Activación IKK: TAK1 (MAP3K7) fosforila loop activación IKKβ tras señales upstream",
          "Upstream: TRAF2/6 (E3 ligasas) median señal desde receptores TNF, TLR, IL-1R",
          "Ubiquitinación K63: cadenas Lys63-ubiquitina (no degradativas) reclutan IKK vía NEMO",
          "Feedback negativo: IκBα re-expresada (gen target NF-κB) → secuestra NF-κB → terminación",
          "Crosstalk: ERK, Akt, p38 modulan actividad NF-κB por fosforilación p65 (Ser536)"
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones fisiológicas",
        items: [
          "Inmunidad innata: producción citoquinas proinflamatorias (IL-1β, TNF-α, IL-6)",
          "Inmunidad adaptativa: activación linfocitos T y B, supervivencia",
          "Inflamación: expresión COX-2, iNOS, quimioquinas (reclutamiento leucocitos)",
          "Antiapoptosis: induce Bcl-xL, c-FLIP, IAPs (supervivencia celular)",
          "Proliferación: ciclina D1, c-Myc (crecimiento tumoral cuando constitutivo)",
          "Respuesta estrés: protección contra ROS, UV, hipoxia"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Artritis reumatoide: activación crónica NF-κB en sinoviocitos, anti-TNF (etanercept, infliximab)",
          "Enfermedad inflamatoria intestinal: NF-κB hiperactivo, anti-TNF, anti-integrinas",
          "Linfoma DLBCL subtipo ABC: mutaciones activadoras vía NF-κB, ibrutinib (inhibe BTK)",
          "Inmunodeficiencias: mutaciones NEMO, IκBα causan susceptibilidad infecciones",
          "Cáncer: NF-κB constitutivo en muchos tumores (mama, próstata, páncreas), promueve inflamación tumoral"
        ]
      }
    ]
  },

  {
    id: "p53-apoptosis",
    nombre: "Vía p53 y Apoptosis",
    icono: "💀",
    subtitulo: "Guardián del genoma - muerte celular programada",
    categorias: ["apoptosis", "ciclo-celular"],
    secciones: [
      {
        tipo: "lista",
        titulo: "p53: estructura y activación",
        items: [
          "Factor de transcripción: tetrámero, dominio de unión DNA central, dominios trans-activación N/C",
          "Guardián del genoma: responde a estrés genotóxico (DNA dañado, oncogenes, hipoxia)",
          "Vida media corta: ~20 min en estado basal, constantemente ubiquitinada por MDM2",
          "Activación por fosforilación: ATM/ATR (DNA damage), Chk1/Chk2 fosforilan Ser15/20",
          "Estabilización: fosforilación bloquea interacción MDM2, acetilación (p300) aumenta actividad",
          "Respuestas celulares: parada ciclo (p21), reparación DNA, senescencia, apoptosis"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Vías apoptóticas",
        datos: [
          { label: "Vía intrínseca (mitocondrial)", value: "Estrés interno → p53 → Bax/Bak → MOMP → citocromo c → caspasas" },
          { label: "Vía extrínseca (receptores muerte)", value: "FasL, TRAIL → Fas, DR4/5 → FADD → caspasa-8 → caspasa-3" },
          { label: "MOMP", value: "Permeabilización membrana mitocondrial externa, irreversible, punto sin retorno" },
          { label: "Apoptosoma", value: "Citocromo c + Apaf-1 + caspasa-9 (complejo activador)" },
          { label: "Caspasas ejecutoras", value: "Caspasa-3, -6, -7 escinden >1000 sustratos (PARP, laminas, ICAD)" },
          { label: "Clearance", value: "Fosfatidilserina externa → 'eat-me' → fagocitosis por macrófagos" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Proteínas familia Bcl-2",
        items: [
          "Antiapoptóticas (3 grupos): Bcl-2, Bcl-xL, Mcl-1 secuestran Bax/Bak, previenen MOMP",
          "Proapoptóticas efectoras: Bax, Bak oligomerizan en mitocondria → poros → citocromo c sale",
          "BH3-only proteins: Bad, Bid, Bim, Puma, Noxa (sensores estrés, neutralizan antiapoptóticas)",
          "Regulación: fosforilación Bad por Akt → secuestro 14-3-3 → antiapoptosis",
          "tBid: Bid truncada por caspasa-8, activa Bax/Bak (enlace extrínseca-intrínseca)",
          "Balance Bcl-2/Bax: determina sensibilidad apoptótica, target terapéutico (venetoclax)"
        ]
      },
      {
        tipo: "lista",
        titulo: "Genes target de p53",
        items: [
          "Parada ciclo: p21CIP1 (inhibe CDK2/4/6), 14-3-3σ (secuestra Cdc25C)",
          "Reparación DNA: GADD45, XPC (NER), MSH2 (MMR)",
          "Apoptosis: Bax, Puma, Noxa, Fas/CD95, Apaf-1",
          "Senescencia: p21, PAI-1, DEC1 (parada irreversible proliferación)",
          "Metabolismo: TIGAR (baja glucólisis), SCO2 (fosforilación oxidativa)",
          "Feedback: MDM2 (E3 ligasa p53), Wip1 fosfatasa (inactivación p53)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Cáncer: TP53 mutado en >50% tumores (pérdida función, dominante negativo)",
          "Síndrome Li-Fraumeni: mutaciones germinales TP53 → múltiples cánceres tempranos",
          "Leucemia linfocítica crónica: deleciones 17p (TP53) predicen mal pronóstico, resistencia quimio",
          "Venetoclax: inhibidor Bcl-2, aprobado para LLC y LMA (especialmente con mutaciones TP53)",
          "Inmunoterapia: restauración p53 (ej. APR-246) en ensayos clínicos para tumores mutados"
        ]
      }
    ]
  }
];
