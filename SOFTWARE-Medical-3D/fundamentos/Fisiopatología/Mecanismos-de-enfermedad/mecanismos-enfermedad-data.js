// ═══════════════════════════════════════════════════════════
// MECANISMOS-ENFERMEDAD-DATA.JS - Base de datos educativa
// ═══════════════════════════════════════════════════════════

const MECANISMOS_ENFERMEDAD_DATA = [
  {
    id: "inflamacion-aguda",
    nombre: "Inflamación Aguda",
    subtitulo: "Respuesta vascular y celular inmediata a la lesión",
    icono: "🔥",
    categorias: ["inflamacion", "respuesta-inmune"],
    secciones: [
      {
        titulo: "📊 Signos Cardinales de la Inflamación",
        tipo: "tabla",
        datos: [
          { label: "Rubor (enrojecimiento)", value: "Vasodilatación arteriolar → ↑ flujo sanguíneo local" },
          { label: "Calor", value: "↑ flujo sangre caliente + metabolismo tisular acelerado" },
          { label: "Tumor (edema)", value: "↑ permeabilidad vascular → exudación plasma al intersticio" },
          { label: "Dolor", value: "Mediadores (bradicinina, PGE2, H⁺) estimulan nociceptores; edema comprime nervios" },
          { label: "Functio laesa (pérdida función)", value: "Combinación dolor + edema → inhibición movimiento/función (agregado por Virchow)" }
        ]
      },
      {
        titulo: "⚙️ Cambios Vasculares",
        tipo: "lista",
        items: [
          "VASOCONSTRICCIÓN TRANSITORIA: segundos, mediada por reflejo neurógeno (respuesta inicial)",
          "VASODILATACIÓN: minutos, mediada por histamina, óxido nítrico (NO), prostaciclina (PGI2) → ↑ flujo (hiperemia activa)",
          "↑ PERMEABILIDAD VASCULAR: retracción células endoteliales (histamina, leucotrienos), lesión endotelial directa → gaps intercelulares",
          "ESTASIS: enlentecimiento flujo por ↑ viscosidad (hemoconcentración por pérdida líquido), marginación leucocitos en endotelio"
        ]
      },
      {
        titulo: "🔬 Mediadores Químicos de la Inflamación",
        tipo: "tabla",
        datos: [
          { label: "Histamina", value: "Mastocitos, basófilos; vasodilatación, ↑ permeabilidad (gaps endoteliales); antagonistas: antihistamínicos H1" },
          { label: "Prostaglandinas (PGE2, PGI2)", value: "De ácido araquidónico (COX-1/2); vasodilatación, dolor, fiebre; inhibidores: AINEs (ibuprofeno, aspirina)" },
          { label: "Leucotrienos (LTB4, LTC4, LTD4, LTE4)", value: "De ácido araquidónico (5-LOX); quimiotaxis (LTB4), broncoconstricción (LTC4-E4); inhibidores: montelukast" },
          { label: "Bradicinina", value: "Sistema de cininas (cininógeno → calicreína); dolor, ↑ permeabilidad, vasodilatación; degradada por ECA" },
          { label: "Óxido nítrico (NO)", value: "eNOS/iNOS; vasodilatación, ↓ agregación plaquetaria; exceso → hipotensión séptica" },
          { label: "Factor activador plaquetas (PAF)", value: "Fosfolípidos membrana; agregación plaquetaria, broncoconstricción, ↑ permeabilidad" }
        ]
      },
      {
        titulo: "🦠 Reclutamiento Leucocitario",
        tipo: "lista",
        items: [
          "MARGINACIÓN: enlentecimiento flujo → leucocitos se desplazan a periferia vascular (rodamiento)",
          "RODAMIENTO (rolling): selectinas endoteliales (E-selectina, P-selectina) se unen a carbohidratos leucocitarios sialil-Lewis X",
          "ADHESIÓN FIRME: integrinas leucocitarias (LFA-1, Mac-1) se unen a ICAM-1, VCAM-1 endotelial (activadas por quimiocinas)",
          "DIAPÉDESIS (transmigración): leucocitos atraviesan endotelio entre células (paracelular) o a través de células (transcelular) vía PECAM-1 (CD31)"
        ]
      },
      {
        titulo: "⚔️ Eventos Celulares: Neutrófilos",
        tipo: "tabla",
        datos: [
          { label: "Quimiotaxis", value: "Migración dirigida hacia gradiente químico: LTB4, C5a, IL-8, productos bacterianos (fMLP)" },
          { label: "Fagocitosis", value: "Reconocimiento (opsoninas: IgG, C3b) → englobamiento → formación fagosoma → fusión lisosoma (fagolisosoma)" },
          { label: "Estallido respiratorio", value: "NADPH oxidasa → O2⁻ (superóxido) → H2O2 + MPO → HOCl (hipoclorito, potente microbicida)" },
          { label: "Degranulación", value: "Liberación enzimas lisosomales: elastasa, colagenasa, catepsinas; proteasas neutras destruyen patógenos y tejido" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Enfermedad granulomatosa crónica (EGC): deficiencia NADPH oxidasa → neutrófilos no generan ROS → infecciones bacterianas/fúngicas recurrentes (Staphylococcus, Aspergillus)",
          "Deficiencia adhesión leucocitaria (LAD): mutación CD18 (integrina β2) → leucocitos no pueden adherirse/migrar → infecciones graves, periodontitis, retardo caída cordón umbilical",
          "Síndrome Chediak-Higashi: defecto tráfico lisosomas → degranulación anormal → infecciones piógenas recurrentes, albinismo parcial",
          "AINEs y gastropatía: inhibición COX-1 → ↓ PGE2 gástrica → pérdida protección mucosa → úlceras, sangrado (usar COX-2 selectivos o IBP)"
        ]
      }
    ]
  },
  {
    id: "inflamacion-cronica",
    nombre: "Inflamación Crónica",
    subtitulo: "Inflamación prolongada con destrucción y reparación simultáneas",
    icono: "♻️",
    categorias: ["inflamacion", "cronicidad"],
    secciones: [
      {
        titulo: "📊 Características Generales",
        tipo: "lista",
        items: [
          "Duración prolongada (semanas-meses-años), puede seguir inflamación aguda o ser primaria de novo",
          "Infiltrado celular: linfocitos (T y B), macrófagos, células plasmáticas (vs neutrófilos en aguda)",
          "Destrucción tisular: mediada por enzimas células inflamatorias y especies reactivas oxígeno (ROS)",
          "Reparación: angiogénesis, fibrosis (colágeno por fibroblastos), puede llevar a pérdida función/cicatrización patológica"
        ]
      },
      {
        titulo: "🔬 Macrófagos: Células Efectoras Principales",
        tipo: "tabla",
        datos: [
          { label: "Origen", value: "Monocitos sanguíneos → migran a tejidos → diferenciación → macrófagos residentes (Kupffer hígado, microglía cerebro, osteoclastos hueso)" },
          { label: "Activación M1 (clásica)", value: "IFN-γ, LPS → fenotipo pro-inflamatorio → TNF-α, IL-1, IL-12, ROS, NO → destrucción patógenos, daño tisular" },
          { label: "Activación M2 (alternativa)", value: "IL-4, IL-13 → fenotipo anti-inflamatorio/reparador → IL-10, TGF-β, factores crecimiento → reparación, fibrosis" },
          { label: "Productos secretados", value: "Citocinas (TNF-α, IL-1, IL-6), quimiocinas (MCP-1), enzimas (metaloproteinasas), factores crecimiento (PDGF, VEGF, TGF-β)" }
        ]
      },
      {
        titulo: "🧬 Inflamación Granulomatosa",
        tipo: "lista",
        items: [
          "GRANULOMA: agregado focal macrófagos epitelioides (activados, citoplasma abundante) rodeados por linfocitos",
          "Células gigantes multinucleadas: fusión macrófagos; Langhans (núcleos periféricos, TB), cuerpo extraño (núcleos dispersos)",
          "GRANULOMA CASEOSO: necrosis central (caseosa = queso); tuberculosis, histoplasmosis (patógenos intracelulares persistentes)",
          "GRANULOMA NO-CASEOSO: sin necrosis; sarcoidosis, enfermedad Crohn, beriliosis, reacciones cuerpo extraño"
        ]
      },
      {
        titulo: "⚙️ Mediadores de Inflamación Crónica",
        tipo: "tabla",
        datos: [
          { label: "TNF-α (factor necrosis tumoral)", value: "Macrófagos, células T; fiebre, síntesis reactantes fase aguda, activación endotelio, caquexia; anti-TNF: infliximab, adalimumab (AR, EII)" },
          { label: "IL-1 (interleucina-1)", value: "Macrófagos; fiebre (actúa en hipotálamo), activación células T, síntesis PGE2; antagonista: anakinra (artritis, autoinflamación)" },
          { label: "IL-6", value: "Macrófagos, células T; síntesis proteínas fase aguda (PCR, fibrinógeno), fiebre, diferenciación células B; anti-IL-6: tocilizumab (AR, COVID-19 severo)" },
          { label: "TGF-β", value: "Macrófagos M2, Tregs; anti-inflamatorio, pro-fibrótico (deposición colágeno); exceso → fibrosis pulmonar, renal, hepática" },
          { label: "IFN-γ (interferón gamma)", value: "Células T CD4+ Th1, NK; activación macrófagos M1, ↑ MHC-II, actividad microbicida; deficiencia → susceptibilidad micobacterias" }
        ]
      },
      {
        titulo: "🔄 Causas de Inflamación Crónica",
        tipo: "lista",
        items: [
          "INFECCIONES PERSISTENTES: organismos intracelulares (Mycobacterium tuberculosis, virus hepatitis B/C, H. pylori)",
          "ENFERMEDADES AUTOINMUNES: autoanticuerpos/células T autorreactivas → daño tisular continuo (AR, LES, enfermedad Crohn)",
          "EXPOSICIÓN PROLONGADA AGENTES TÓXICOS: sílice (silicosis), asbesto (asbestosis), humo tabaco (EPOC), obesidad (inflamación metabólica)",
          "RESPUESTA INMUNE EXAGERADA: alergias crónicas, asma, hipersensibilidad tipo IV (dermatitis contacto)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Artritis reumatoide: inflamación crónica sinovial → pannus (tejido granulación) → erosión cartílago/hueso; tratamiento: DMARDs (metotrexato), anti-TNF",
          "Enfermedad inflamatoria intestinal (Crohn, colitis ulcerosa): inflamación transmural/mucosa → úlceras, fístulas, estenosis; tratamiento: corticoides, anti-TNF, anti-integrinas",
          "Sarcoidosis: granulomas no-caseosos multisistémicos (pulmón, piel, ojo) → fibrosis pulmonar, uveítis, hipercalcemia; diagnóstico: biopsia, elevación ECA",
          "Aterosclerosis: inflamación crónica arterial (LDL oxidada → activación macrófagos → células espumosas) → placa, estenosis, trombosis"
        ]
      }
    ]
  },
  {
    id: "lesion-celular",
    nombre: "Lesión Celular y Adaptación",
    subtitulo: "Mecanismos de daño celular y respuestas adaptativas",
    icono: "⚠️",
    categorias: ["patologia-celular"],
    secciones: [
      {
        titulo: "🔄 Adaptaciones Celulares",
        tipo: "tabla",
        datos: [
          { label: "Hipertrofia", value: "↑ tamaño células (↑ síntesis proteínas/organelos) → ↑ tamaño órgano; ej: hipertrofia cardíaca (HTA), músculo esquelético (ejercicio)" },
          { label: "Hiperplasia", value: "↑ número células por mitosis; ej: hiperplasia endometrial (estrógenos), hiperplasia prostática benigna (BPH), hígado post-resección" },
          { label: "Atrofia", value: "↓ tamaño célula/órgano por pérdida proteínas/organelos; ej: denervación, desuso, isquemia, malnutrición, envejecimiento" },
          { label: "Metaplasia", value: "Cambio fenotipo celular (un tipo célula diferenciada → otro); ej: epitelio respiratorio cilíndrico → escamoso (tabaquismo), esófago Barrett (reflujo)" }
        ]
      },
      {
        titulo: "⚠️ Causas de Lesión Celular",
        tipo: "lista",
        items: [
          "HIPOXIA/ISQUEMIA: ↓ O2 → ↓ ATP (↓ fosforilación oxidativa) → fallo bomba Na⁺/K⁺ → edema celular, disfunción mitocondrial",
          "AGENTES FÍSICOS: trauma mecánico, temperaturas extremas (quemaduras, congelación), radiación (ionizante, UV), shock eléctrico, cambios presión osmótica",
          "AGENTES QUÍMICOS: toxinas (CCl4, paracetamol, cianuro), drogas (quimioterapia, alcohol), venenos (arsénico, plomo), radicales libres (ROS)",
          "AGENTES BIOLÓGICOS: virus (lisis, efecto citopático), bacterias (toxinas: difteria, tétanos), parásitos, hongos, priones"
        ]
      },
      {
        titulo: "🔬 Mecanismos Moleculares de Lesión",
        tipo: "tabla",
        datos: [
          { label: "Depleción ATP", value: "↓ ATP → fallo bomba Na⁺/K⁺ → ↑ Na⁺/Ca²⁺ intra, ↑ K⁺ extra → edema, pérdida gradientes, despolarización membrana" },
          { label: "Disfunción mitocondrial", value: "Apertura poro transición permeabilidad (MPTP) → liberación citocromo c → activación caspasas (apoptosis); ↓ ATP, ↑ ROS" },
          { label: "Sobrecarga Ca²⁺", value: "↑ Ca²⁺ citoplasmático → activación enzimas destructivas: fosfolipasas (membrana), proteasas (calpaínas), endonucleasas (fragmentación DNA)" },
          { label: "Estrés oxidativo", value: "Exceso ROS (O2⁻, H2O2, •OH) → peroxidación lipídica membrana, oxidación proteínas, daño DNA; déficit antioxidantes (SOD, catalasa, glutatión)" },
          { label: "Daño membrana", value: "Peroxidación lipídica, fosfolipasas activadas, complemento (MAC) → pérdida integridad → lisis osmótica" }
        ]
      },
      {
        titulo: "📊 Lesión Reversible vs Irreversible",
        tipo: "tabla",
        datos: [
          { label: "Reversible", value: "Tumefacción celular, degeneración grasa; mitocondrias/membranas preservadas; retorno función si se elimina noxa" },
          { label: "Punto sin retorno", value: "Pérdida irreversible ATP, daño masivo membrana, sobrecarga Ca²⁺ irreversible → muerte celular inevitable" },
          { label: "Irreversible (necrosis)", value: "Ruptura membrana, pérdida núcleo (picnosis, cariorexis, cariólisis), liberación contenido → inflamación" },
          { label: "Morfología reversible", value: "Microscopía electrónica: ampollas membrana, tumefacción mitocondrial, dilatación RE; microscopía óptica: tumefacción, vacuolización" }
        ]
      },
      {
        titulo: "🧬 Estrés del Retículo Endoplásmico (ER Stress)",
        tipo: "lista",
        items: [
          "Acumulación proteínas mal plegadas en RE → activación UPR (Unfolded Protein Response)",
          "Sensores: PERK, IRE1, ATF6 detectan proteínas mal plegadas → señalización",
          "Respuesta adaptativa: ↑ chaperonas (BiP/GRP78), ↓ traducción (PERK → fosforilación eIF2α), ↑ degradación (ERAD)",
          "Fallo adaptación → apoptosis vía CHOP/GADD153; implicado en diabetes (células β), neurodegeneración, esteatosis hepática"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Infarto miocárdico: isquemia → depleción ATP → necrosis coagulativa cardiomiocitos → ↑ troponinas séricas (diagnóstico), disfunción contráctil, arritmias",
          "Intoxicación paracetamol: metabolito NAPQI → depleción glutatión hepático → estrés oxidativo → necrosis hepatocitos (zona 3, centrolobulillar); antídoto: N-acetilcisteína",
          "Esófago de Barrett: reflujo ácido crónico → metaplasia columnar (escamoso → cilíndrico) → riesgo adenocarcinoma; vigilancia endoscópica, IBP",
          "Miocardiopatía hipertrófica: hipertrofia cardiaca genética (mutaciones sarcómero) → obstrucción tracto salida, arritmias, muerte súbita"
        ]
      }
    ]
  },
  {
    id: "muerte-celular",
    nombre: "Tipos de Muerte Celular",
    subtitulo: "Necrosis, apoptosis, autofagia y otras formas de muerte",
    icono: "💀",
    categorias: ["patologia-celular"],
    secciones: [
      {
        titulo: "💥 Necrosis: Muerte Celular Accidental",
        tipo: "lista",
        items: [
          "Muerte no programada por lesión severa, pérdida homeostasis energética e iónica",
          "Morfología: tumefacción celular, ruptura membrana, disolución organelos, liberación contenido → INFLAMACIÓN",
          "Núcleo: picnosis (condensación cromatina) → cariorexis (fragmentación) → cariólisis (disolución por DNasas)",
          "Resultado: respuesta inflamatoria aguda (neutrófilos) por liberación DAMPs (damage-associated molecular patterns: HMGB1, ATP, ácidos nucleicos)"
        ]
      },
      {
        titulo: "🔬 Tipos de Necrosis",
        tipo: "tabla",
        datos: [
          { label: "Necrosis coagulativa", value: "Isquemia (excepto cerebro); arquitectura tisular preservada; eosinofilia; ej: infarto miocárdico, renal, esplénico" },
          { label: "Necrosis licuefactiva", value: "Infecciones bacterianas, infarto cerebral; digestión enzimática → licuefacción; ej: abscesos, infarto cerebral (masa viscosa)" },
          { label: "Necrosis caseosa", value: "Tuberculosis, hongos; aspecto friable blanquecino (tipo queso); granulomas con necrosis central" },
          { label: "Necrosis grasa", value: "Pancreatitis aguda, trauma mama; lipasas → saponificación (ácidos grasos + Ca²⁺); focos blanquecinos calcificados" },
          { label: "Necrosis fibrinoide", value: "Vasculitis, enfermedades autoinmunes; depósito fibrina en paredes vasculares; HTA maligna, LES" },
          { label: "Gangrena", value: "Necrosis coagulativa + putrefacción bacteriana (húmeda) o desecación (seca); extremidades isquémicas, diabetes" }
        ]
      },
      {
        titulo: "🧬 Apoptosis: Muerte Celular Programada",
        tipo: "lista",
        items: [
          "Proceso activo, dependiente de energía (ATP), regulado genéticamente",
          "Morfología: contracción celular, condensación cromatina (marginación), fragmentación DNA (patrón escalera, nucleosomas 180-200 bp), formación cuerpos apoptóticos",
          "SIN ruptura membrana (hasta fases finales) → SIN INFLAMACIÓN (fagocitosis rápida por macrófagos)",
          "Funciones fisiológicas: desarrollo embrionario (separación dedos), homeostasis (renovación epitelios), eliminación células autorreactivas (selección negativa timo)"
        ]
      },
      {
        titulo: "⚙️ Vías de Apoptosis",
        tipo: "tabla",
        datos: [
          { label: "Vía intrínseca (mitocondrial)", value: "Estrés celular → Bax/Bak → permeabilización mitocondrial → citocromo c → apoptosoma (cit c + Apaf-1 + procaspasa-9) → caspasa-9 → caspasas efectoras (3,6,7)" },
          { label: "Regulación vía intrínseca", value: "Pro-apoptóticos: Bax, Bak, Bid, Bim, Puma; Anti-apoptóticos: Bcl-2, Bcl-xL, Mcl-1 (sobreexpresados en cáncer)" },
          { label: "Vía extrínseca (receptores muerte)", value: "Ligandos (FasL, TNF-α, TRAIL) → receptores (Fas/CD95, TNFR1, DR4/5) → DISC (complejo señalización) → caspasa-8 → caspasas efectoras" },
          { label: "Ejecución", value: "Caspasas efectoras (3,6,7) escinden: PARP, láminas nucleares, ICAD/CAD (fragmenta DNA), fodrina citoesqueleto → desmantelamiento celular ordenado" }
        ]
      },
      {
        titulo: "♻️ Autofagia",
        tipo: "lista",
        items: [
          "Proceso catabólico: degradación organelos/proteínas vía lisosomas; reciclaje componentes celulares",
          "Mecanismo: aislamiento (fagóforo) → autofagosoma (doble membrana) → fusión lisosoma → autofaligosoma → digestión",
          "Regulación: mTOR (inhibe autofagia en nutrientes abundantes), AMPK (activa en ayuno), proteínas Atg (autophagy-related genes)",
          "Funciones: supervivencia en ayuno, control calidad (mitofagia, reticulofagia), inmunidad (xenofagia), longevidad"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Linfoma folicular: traslocación t(14;18) → sobreexpresión Bcl-2 → bloqueo apoptosis → acumulación linfocitos B neoplásicos",
          "Síndrome linfoproliferativo autoinmune (ALPS): mutaciones Fas/FasL → fallo apoptosis linfocitos autorreactivos → linfadenopatía, autoinmunidad, esplenomegalia",
          "Enfermedad Alzheimer: acumulación Aβ → activación caspasas → apoptosis neuronal; neurofibrillas tau interfieren transporte axonal",
          "Pancreatitis aguda: activación prematura enzimas pancreáticas → autodigestión → necrosis grasa peripancreática, hipocalcemia (saponificación)"
        ]
      }
    ]
  },
  {
    id: "trombosis-embolia",
    nombre: "Trombosis y Embolia",
    subtitulo: "Alteraciones hemodinámicas y formación de coágulos patológicos",
    icono: "🩸",
    categorias: ["hemodinamica", "coagulacion"],
    secciones: [
      {
        titulo: "🔺 Tríada de Virchow (Trombogénesis)",
        tipo: "tabla",
        datos: [
          { label: "Lesión endotelial", value: "Trauma, aterosclerosis, vasculitis, hipertensión, toxinas (tabaco, endotoxinas); exposición subendotelio → factor tisular, colágeno → activación plaquetas/coagulación" },
          { label: "Flujo sanguíneo anormal", value: "ESTASIS: insuficiencia cardíaca, reposo prolongado, FA; TURBULENCIA: placas ateroscleróticas, bifurcaciones, aneurismas; ambas → ↓ dilución factores, ↑ contacto plaquetas/endotelio" },
          { label: "Hipercoagulabilidad", value: "PRIMARIA: Factor V Leiden (resistencia proteína C), mutación protrombina G20210A, déficit antitrombina/proteína C/S; SECUNDARIA: cáncer, embarazo, ACO, síndrome antifosfolípidos" }
        ]
      },
      {
        titulo: "🧬 Formación del Trombo",
        tipo: "lista",
        items: [
          "TROMBOS ARTERIALES (blancos): flujo rápido, alto shear stress → agregación plaquetaria predominante (pálidos, friables); aterosclerosis → oclusión arterias (IAM, ACV)",
          "TROMBOS VENOSOS (rojos): flujo lento, estasis → activación cascada coagulación predominante (ricos eritrocitos/fibrina); TVP (trombosis venosa profunda) → embolia pulmonar",
          "Líneas de Zahn: capas alternantes plaquetas/fibrina (pálidas) y eritrocitos (oscuras); indican trombo formado in vivo (vs coágulo post-mortem)",
          "Evolución: propagación → embolización → disolución (fibrinolisis) → organización (fibroblastos, angiogénesis) → recanalización"
        ]
      },
      {
        titulo: "🚀 Embolia",
        tipo: "tabla",
        datos: [
          { label: "Embolia pulmonar (EP)", value: "95% origen TVP miembros inferiores; obstrucción arterias pulmonares → hipertensión pulmonar aguda, ICC derecha; masiva → shock, muerte súbita" },
          { label: "Embolia sistémica", value: "Origen: trombos cardíacos (FA, IAM, endocarditis), placas ateroscleróticas; destinos: cerebro (ACV embólico 80%), riñón, bazo, intestino, extremidades" },
          { label: "Embolia grasa", value: "Fracturas huesos largos, trauma tejidos blandos; glóbulos grasa médula → pulmón/cerebro → SDRA, petequias, confusión (tríada: hipoxemia, síntomas neurológicos, petequias)" },
          { label: "Embolia gaseosa", value: "Descompresión rápida (buceo), cirugía cardíaca/neurocirugía; burbujas N2 → obstrucción microcirculación → enfermedad descompresión (dolor articular, parestesias, parálisis)" },
          { label: "Embolia líquido amniótico", value: "Parto/cesárea; líquido amniótico → circulación materna → CID, shock, SDRA; mortalidad ~60-80%" }
        ]
      },
      {
        titulo: "🧪 Coagulación Intravascular Diseminada (CID)",
        tipo: "lista",
        items: [
          "Activación sistémica coagulación → formación microtrombos difusos + consumo factores coagulación/plaquetas → sangrado paradójico",
          "Causas: sepsis (endotoxinas), trauma masivo, cáncer (leucemia promielocítica), complicaciones obstétricas (desprendimiento placenta)",
          "Laboratorio: ↓ plaquetas, ↓ fibrinógeno, ↑ PDF (productos degradación fibrina), ↑ D-dímero, ↑ TP/TTPa; frotis: esquistocitos (fragmentación eritrocitos)",
          "Tratamiento: causa subyacente (antibióticos sepsis, quimio leucemia), soporte (plaquetas, plasma fresco, crioprecipitado), ± heparina (formas crónicas)"
        ]
      },
      {
        titulo: "🔬 Infarto",
        tipo: "tabla",
        datos: [
          { label: "Definición", value: "Necrosis tisular por isquemia (oclusión arterial o venosa raramente)" },
          { label: "Infarto rojo (hemorrágico)", value: "Oclusión venosa, tejidos laxos (pulmón), circulación dual/colateral, reperfusión; sangrado en tejido necrótico" },
          { label: "Infarto blanco (anémico)", value: "Oclusión arterial, órganos sólidos (corazón, riñón, bazo), circulación terminal; necrosis coagulativa pálida" },
          { label: "Evolución", value: "Agudo (horas): necrosis coagulativa; Subagudo (días): infiltrado inflamatorio, reabsorción; Crónico (semanas): cicatriz fibrosa" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Trombosis venosa profunda (TVP): dolor gemelar, edema, signo Homans; diagnóstico: D-dímero (screening), ultrasonido Doppler; tratamiento: anticoagulación (HBPM → warfarina/DOAC)",
          "Embolia pulmonar aguda: disnea súbita, dolor torácico pleurítico, taquicardia, hipoxemia; diagnóstico: angio-TC; tratamiento: anticoagulación, trombolisis (masiva inestable)",
          "Síndrome antifosfolípidos: anticuerpos antifosfolípidos (anticoagulante lúpico, anticardiolipina, anti-β2-GPI) → trombosis arterial/venosa recurrente, abortos; tratamiento: anticoagulación crónica",
          "Factor V Leiden: mutación Factor V (resistencia proteína C activada) → trombofilia hereditaria más común (5% caucásicos); ↑ riesgo TVP, contraindicación ACO"
        ]
      }
    ]
  },
  {
    id: "neoplasia",
    nombre: "Neoplasia y Carcinogénesis",
    subtitulo: "Transformación maligna y desarrollo tumoral",
    icono: "🧬",
    categorias: ["oncologia", "genetica"],
    secciones: [
      {
        titulo: "📊 Características Tumores Benignos vs Malignos",
        tipo: "tabla",
        datos: [
          { label: "Diferenciación", value: "Benignos: bien diferenciados (parecen tejido origen); Malignos: anaplasia (pérdida diferenciación), pleomorfismo, atipias" },
          { label: "Velocidad crecimiento", value: "Benignos: lento; Malignos: rápido (índice mitótico alto, mitosis atípicas)" },
          { label: "Invasión local", value: "Benignos: crecimiento expansivo, cápsula; Malignos: invasión destructiva, sin cápsula" },
          { label: "Metástasis", value: "Benignos: NO metastatizan; Malignos: capacidad metastatizar (diseminación linfática, hematógena, serosa)" }
        ]
      },
      {
        titulo: "🧬 Hallmarks del Cáncer (Hanahan & Weinberg)",
        tipo: "lista",
        items: [
          "AUTOSUFICIENCIA SEÑALES CRECIMIENTO: mutaciones oncogenes (RAS, MYC, HER2) → señalización mitogénica constitutiva sin factores crecimiento",
          "INSENSIBILIDAD SEÑALES ANTI-CRECIMIENTO: inactivación genes supresores (RB, p16/INK4a) → pérdida control ciclo celular, proliferación desregulada",
          "EVASIÓN APOPTOSIS: inactivación p53, sobreexpresión Bcl-2 → supervivencia células con DNA dañado",
          "POTENCIAL REPLICATIVO ILIMITADO: reactivación telomerasa (85-95% cánceres) → bypass senescencia replicativa, inmortalización",
          "ANGIOGÉNESIS SOSTENIDA: VEGF, bFGF → neovascularización → suministro nutrientes/O2, remoción desechos",
          "CAPACIDAD INVASIÓN/METÁSTASIS: transición epitelio-mesénquima (EMT), degradación matriz (MMPs), adhesión alterada (pérdida E-cadherina)"
        ]
      },
      {
        titulo: "🔬 Oncogenes vs Genes Supresores Tumorales",
        tipo: "tabla",
        datos: [
          { label: "Oncogenes (función ganancia)", value: "Versiones mutadas proto-oncogenes; 1 alelo mutado suficiente (dominante); ej: RAS (transducción señal), MYC (factor transcripción), BCL2 (anti-apoptosis)" },
          { label: "RAS", value: "Mutación puntual (codón 12, 13, 61) → GTPasa defectuosa → RAS-GTP constitutivamente activa → proliferación; 30% cánceres humanos" },
          { label: "Genes supresores (pérdida función)", value: "Frenan proliferación; requiere inactivación ambos alelos (hipótesis Knudson dos-hits); ej: RB, p53, APC, BRCA1/2" },
          { label: "p53 (guardián genoma)", value: "Detiene ciclo (p21), induce reparación DNA, activa apoptosis (Bax); mutado en >50% cánceres; síndrome Li-Fraumeni (mutación germinal)" },
          { label: "RB (retinoblastoma)", value: "Retiene E2F (factor transcripción genes fase S); inactivado → descontrol G1/S; retinoblastoma (herencia + hit somático)" }
        ]
      },
      {
        titulo: "⚙️ Carcinogénesis Multietapa",
        tipo: "lista",
        items: [
          "INICIACIÓN: mutación irreversible DNA por carcinógeno (químico, radiación, virus); célula iniciada, clonalmente expandible",
          "PROMOCIÓN: proliferación clonal células iniciadas por promotores (ésteres forbol, hormonas); reversible en etapas tempranas",
          "PROGRESIÓN: acumulación mutaciones adicionales (inestabilidad genómica) → heterogeneidad, anaplasia, invasión, metástasis",
          "Modelo cáncer colorrectal (secuencia adenoma-carcinoma): normal → APC (adenoma pequeño) → KRAS (adenoma grande) → p53 (carcinoma) (~10-15 años)"
        ]
      },
      {
        titulo: "🚀 Cascada Metastásica",
        tipo: "tabla",
        datos: [
          { label: "1. Invasión local", value: "Degradación membrana basal (MMP-2, MMP-9), motilidad celular (pérdida E-cadherina, ↑ N-cadherina/vimentina = EMT)" },
          { label: "2. Intravasación", value: "Entrada a vasos sanguíneos/linfáticos; penetración pared vascular" },
          { label: "3. Supervivencia circulación", value: "Evasión sistema inmune (↓ MHC-I, ↑ PD-L1), anoikis (apoptosis por pérdida adhesión); agregados plaquetas protegen" },
          { label: "4. Extravasación", value: "Adhesión endotelio órgano diana (selectinas, integrinas), salida vascular" },
          { label: "5. Colonización", value: "Proliferación en microambiente distante; angiogénesis, evasión inmune local; mayoría células diseminadas permanecen latentes" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Leucemia mieloide crónica (LMC): traslocación t(9;22) cromosoma Philadelphia → gen fusión BCR-ABL (tirosina quinasa constitutiva); tratamiento: imatinib (inhibidor BCR-ABL)",
          "Cáncer mama HER2+: amplificación/sobreexpresión HER2 (receptor tirosina quinasa); mal pronóstico; tratamiento: trastuzumab (anticuerpo anti-HER2), pertuzumab",
          "Síndrome Lynch (HNPCC): mutaciones genes reparación mismatch (MLH1, MSH2, MSH6, PMS2) → inestabilidad microsatélites → cáncer colorrectal, endometrial hereditario",
          "Melanoma BRAF V600E: mutación activadora BRAF (50% melanomas) → señalización MAPK constitutiva; tratamiento: vemurafenib + cobimetinib (inhibidor MEK)"
        ]
      }
    ]
  },
  {
    id: "autoinmunidad",
    nombre: "Trastornos Autoinmunes",
    subtitulo: "Pérdida de tolerancia y ataque al tejido propio",
    icono: "🎯",
    categorias: ["inmunologia", "autoinmunidad"],
    secciones: [
      {
        titulo: "⚖️ Tolerancia Central vs Periférica",
        tipo: "tabla",
        datos: [
          { label: "Tolerancia central (timo, médula ósea)", value: "Eliminación linfocitos autorreactivos durante maduración; células T: selección negativa (AIRE presenta antígenos); células B: edición receptor, deleción" },
          { label: "Tolerancia periférica", value: "Supresión linfocitos autorreactivos escapan tolerancia central; mecanismos: anergia (falta coestimulación), supresión (Tregs CD4+CD25+FoxP3+), ignorancia (sitios privilegiados)" },
          { label: "Regulación Tregs", value: "Secretan IL-10, TGF-β (suprimen Tefectoras); contacto celular (CTLA-4 compite con CD28 por B7); deficiencia FoxP3 → IPEX (enteritis, endocrinopatía, dermatitis)" },
          { label: "Sitios inmunológicamente privilegiados", value: "Cerebro, ojo, testículo, feto; barrera anatómica, expresión FasL (induce apoptosis células T), factores inmunosupresores locales" }
        ]
      },
      {
        titulo: "🧬 Mecanismos de Autoinmunidad",
        tipo: "lista",
        items: [
          "FACTORES GENÉTICOS: HLA (MHC-II); LES: HLA-DR2, DR3; AR: HLA-DR4; DM1: HLA-DR3, DR4; polimorfismos genes inmunes (PTPN22, CTLA-4)",
          "MIMETISMO MOLECULAR: similitud antigénica entre patógeno y auto-antígeno; ej: fiebre reumática (proteína M estreptocócica vs miosina cardíaca), Guillain-Barré (Campylobacter vs gangliósidos)",
          "LIBERACIÓN ANTÍGENOS SECUESTRADOS: trauma, infección → exposición antígenos normalmente ocultos (espermatozoides, proteínas oculares, mielina); ruptura sitios privilegiados",
          "DISREGULACIÓN LINFOCITOS: defecto Tregs, hiperactividad células T efectoras, déficit apoptosis (mutaciones Fas/FasL); bypass coestimulación"
        ]
      },
      {
        titulo: "🔬 Mecanismos Efectores de Daño",
        tipo: "tabla",
        datos: [
          { label: "Hipersensibilidad tipo II (citotóxica)", value: "Autoanticuerpos vs antígenos superficie celular → lisis (complemento, ADCC); ej: anemia hemolítica autoinmune (anti-eritrocitos), miastenia gravis (anti-AChR)" },
          { label: "Hipersensibilidad tipo III (complejos inmunes)", value: "Depósito complejos Ag-Ac en tejidos → activación complemento, inflamación; ej: LES (anti-dsDNA), glomerulonefritis post-estreptocócica" },
          { label: "Hipersensibilidad tipo IV (mediada células)", value: "Células T CD4+ (Th1, Th17) → activación macrófagos, inflamación; ej: DM1 (células T vs células β), esclerosis múltiple (células T vs mielina)" },
          { label: "Autoanticuerpos estimulantes", value: "Mimetizan ligando natural → hiperestimulación receptor; ej: enfermedad Graves (anti-receptor TSH → hipertiroidismo)" }
        ]
      },
      {
        titulo: "🩺 Enfermedades Autoinmunes Órgano-Específicas",
        tipo: "tabla",
        datos: [
          { label: "Diabetes mellitus tipo 1", value: "Células T CD8+ → destrucción células β pancreáticas; autoanticuerpos: anti-GAD, anti-IA2, anti-insulina; HLA-DR3/DR4; hiperglucemia, cetoacidosis" },
          { label: "Tiroiditis Hashimoto", value: "Células T, anticuerpos anti-tiroglobulina, anti-TPO → destrucción tiroides; hipotiroidismo, bocio; asociación enfermedad celíaca, síndrome Sjögren" },
          { label: "Enfermedad Graves", value: "Anticuerpos estimulantes receptor TSH → hipertiroidismo; oftalmopatía (exoftalmos), dermopatía pretibial (mixedema); tratamiento: antitiroideos, I-131, cirugía" },
          { label: "Esclerosis múltiple", value: "Células T vs mielina SNC (proteína básica mielina, MOG); desmielinización, placas; síntomas: debilidad, alteraciones visuales, ataxia; tratamiento: inmunomoduladores" }
        ]
      },
      {
        titulo: "🌐 Enfermedades Autoinmunes Sistémicas",
        tipo: "lista",
        items: [
          "LUPUS ERITEMATOSO SISTÉMICO (LES): anti-dsDNA, anti-Sm, anti-fosfolípidos; nefritis (clase IV proliferativa difusa), serositis, rash malar, artritis; tratamiento: corticoides, hidroxicloroquina, inmunosupresores",
          "ARTRITIS REUMATOIDE: factor reumatoide (anti-IgG Fc), anti-CCP (péptidos citrulinados); pannus sinovial → erosión cartílago/hueso; nódulos subcutáneos, vasculitis; tratamiento: DMARDs, anti-TNF",
          "SÍNDROME SJÖGREN: anti-Ro (SS-A), anti-La (SS-B); infiltrado linfocitario glándulas salivales/lagrimales → xerostomía, xeroftalmía; complicación: linfoma MALT",
          "ESCLERODERMIA (esclerosis sistémica): anti-topoisomerasa I (Scl-70, difusa), anti-centrómero (limitada/CREST); fibrosis piel, órganos internos (pulmón, riñón, esófago)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Crisis renal esclerodérmica: vasculopatía renal proliferativa → HTA maligna, insuficiencia renal aguda; tratamiento: IECA (captopril)",
          "Síndrome antifosfolípidos: anticuerpos anti-β2-GPI, anticardiolipina, anticoagulante lúpico → trombosis, abortos recurrentes; puede ser primario o asociado LES",
          "Polimiositis/dermatomiositis: debilidad muscular proximal, enzimas musculares elevadas (CPK, aldolasa); dermatomiositis: rash heliotropo, pápulas Gottron; riesgo neoplasia (paraneoplásico)",
          "Síndrome IPEX: mutación FoxP3 → deficiencia Tregs → autoinmunidad neonatal (enteritis, diabetes, eccema, tiroiditis); tratamiento: trasplante médula ósea"
        ]
      }
    ]
  },
  {
    id: "shock",
    nombre: "Shock y Fallo Multiorgánico",
    subtitulo: "Hipoperfusión tisular sistémica y disfunción orgánica",
    icono: "⚠️",
    categorias: ["hemodinamica", "emergencia"],
    secciones: [
      {
        titulo: "📊 Tipos de Shock",
        tipo: "tabla",
        datos: [
          { label: "Shock hipovolémico", value: "↓ volumen intravascular; hemorrágico (trauma, hemorragia GI, rotura aneurisma), no-hemorrágico (diarrea, vómitos, quemaduras, poliuria); ↓ precarga → ↓ GC" },
          { label: "Shock cardiogénico", value: "Fallo bomba cardíaca; IAM extenso, miocarditis, arritmias, taponamiento, embolia pulmonar masiva; ↓ contractilidad → ↓ GC, ↑ presión llenado" },
          { label: "Shock distributivo (vasodilatación)", value: "Séptico (endotoxinas, citocinas → NO ↑↑), anafiláctico (histamina, leucotrienos), neurogénico (lesión medular → pérdida tono simpático); ↓ RVS → maldistribución flujo" },
          { label: "Shock obstructivo", value: "Obstrucción flujo: taponamiento cardíaco, neumotórax tensión, embolia pulmonar masiva; impedimento retorno venoso/eyección ventricular" }
        ]
      },
      {
        titulo: "⚙️ Fases del Shock",
        tipo: "lista",
        items: [
          "FASE NO-PROGRESIVA (compensada): mecanismos compensatorios preservan perfusión órganos vitales; taquicardia, vasoconstricción, ↑ contractilidad (catecolaminas), ↑ RAA, ADH; PA normal o levemente ↓",
          "FASE PROGRESIVA (descompensada): fallo mecanismos compensatorios; acidosis metabólica (lactato), ↓ perfusión cerebral/coronaria → ↓ contractilidad → círculo vicioso; oliguria, confusión, hipotensión",
          "FASE IRREVERSIBLE: daño celular masivo irreversible; fallo multiorgánico, necrosis tisular extensa (intestino, hígado, riñón); muerte inevitable a pesar de reanimación"
        ]
      },
      {
        titulo: "🔬 Fisiopatología Shock Séptico",
        tipo: "tabla",
        datos: [
          { label: "Activación inflamatoria", value: "PAMPs (LPS, peptidoglicano) → TLRs → liberación masiva citocinas (TNF-α, IL-1, IL-6); 'tormenta citocinas'" },
          { label: "Disfunción endotelial", value: "↑ permeabilidad (pérdida líquido → edema intersticial), activación coagulación (CID), ↓ tono vascular (iNOS → NO ↑↑ → vasodilatación refractaria)" },
          { label: "Disfunción miocárdica", value: "Citocinas (TNF-α) → ↓ contractilidad, ↓ respuesta catecolaminas; depresión miocárdica reversible (si sobrevive)" },
          { label: "Alteraciones metabólicas", value: "Disfunción mitocondrial → metabolismo anaeróbico → acidosis láctica; hiperglucemia (resistencia insulina), hipertrigliceridemia" }
        ]
      },
      {
        titulo: "🧬 Síndrome Dificultad Respiratoria Aguda (SDRA)",
        tipo: "lista",
        items: [
          "Lesión pulmonar aguda difusa (shock, sepsis, trauma, neumonía, aspiración); daño alveolo-capilar",
          "Fase exudativa (1-7 días): edema alveolar rico-proteínas, membranas hialinas, infiltrado inflamatorio; ↓ compliance, hipoxemia refractaria",
          "Fase proliferativa (7-21 días): proliferación neumocitos tipo II, fibroblastos; organización exudado",
          "Fase fibrótica (>21 días): fibrosis intersticial difusa, obliteración arquitectura alveolar; secuela: restricción crónica"
        ]
      },
      {
        titulo: "💀 Síndrome Fallo Multiorgánico (MODS)",
        tipo: "tabla",
        datos: [
          { label: "Pulmón", value: "SDRA → hipoxemia, infiltrados bilaterales, ↓ compliance; requiere ventilación mecánica" },
          { label: "Riñón", value: "Necrosis tubular aguda (NTA) → oliguria, ↑ creatinina, acidosis; puede requerir diálisis" },
          { label: "Hígado", value: "Necrosis centrolobulillar (zona 3) → ↑ transaminasas, bilirrubina, coagulopatía (↑ TP/INR), hipoglucemia" },
          { label: "Corazón", value: "Depresión miocárdica → ↓ fracción eyección, arritmias; necrosis subendocárdica" },
          { label: "GI", value: "Isquemia intestinal → translocación bacteriana, íleo, hemorragia; úlceras estrés" },
          { label: "SNC", value: "Encefalopatía (confusión, coma); edema cerebral en shock refractario" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Shock séptico: hipotensión refractaria (PAM <65 mmHg) a pesar reanimación fluidos → requiere vasopresores (noradrenalina); antibióticos empíricos precoces, control foco infeccioso",
          "Shock anafiláctico: exposición alérgeno (alimentos, fármacos, picaduras) → liberación masiva histamina → colapso cardiovascular, broncoespasmo, angioedema; tratamiento: epinefrina IM urgente",
          "Criterios Berlín SDRA: inicio agudo (<1 semana), infiltrados bilaterales Rx, PaO2/FiO2 <300 (leve), <200 (moderado), <100 (grave); ventilación protectora (Vt bajo 6 ml/kg)",
          "Reanimación guiada objetivos (early goal-directed therapy): en sepsis severa/shock primeras 6h → fluidos IV, vasopresores, inotrópicos según ScvO2 ≥70%, PAM ≥65 mmHg, diuresis ≥0.5 ml/kg/h"
        ]
      }
    ]
  }
];
