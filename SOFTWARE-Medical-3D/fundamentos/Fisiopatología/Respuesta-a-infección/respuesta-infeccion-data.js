// ═══════════════════════════════════════════════════════════
// RESPUESTA-INFECCION-DATA.JS - Base de datos educativa
// ═══════════════════════════════════════════════════════════

const RESPUESTA_INFECCION_DATA = [
  {
    id: "piretogenos-exogenos",
    nombre: "Piretógenos Exógenos",
    subtitulo: "Componentes microbianos inductores de fiebre",
    icono: "🦠",
    categorias: ["fiebre", "patogenos"],
    secciones: [
      {
        titulo: "🔬 Definición y Características",
        tipo: "lista",
        items: [
          "Sustancias de origen externo (microorganismos) que inducen fiebre al activar respuesta inmune",
          "NO actúan directamente sobre hipotálamo; requieren intermediarios (piretógenos endógenos: citocinas)",
          "Son PAMPs (Pathogen-Associated Molecular Patterns): estructuras conservadas evolutivamente en patógenos",
          "Reconocidos por PRRs (Pattern Recognition Receptors): TLRs, NLRs, RLRs en células inmunes innatas"
        ]
      },
      {
        titulo: "🧬 Principales Piretógenos Exógenos",
        tipo: "tabla",
        datos: [
          { label: "LPS (lipopolisacárido)", value: "Componente membrana externa bacterias Gram-negativas; lípido A (tóxico) + polisacárido O; reconocido TLR4 (con MD-2, CD14); piretógeno más potente conocido (ng/kg)" },
          { label: "Peptidoglicano", value: "Pared celular bacterias Gram-positivas; reconocido TLR2/TLR6; induce TNF-α, IL-1β" },
          { label: "Ácido lipoteicoico (LTA)", value: "Membrana bacterias Gram-positivas (Staphylococcus, Streptococcus); TLR2; potente inductor IL-1, IL-6" },
          { label: "Flagelina", value: "Proteína flagelar bacterias móviles (Salmonella, E. coli); reconocida TLR5 y NLRC4 (inflamasoma)" },
          { label: "DNA bacteriano (CpG no-metilados)", value: "Motivos CpG (citosina-guanina) bacterianos; TLR9 (endosomas); induce IFN tipo I, IL-12" },
          { label: "dsRNA viral", value: "RNA doble cadena de virus; TLR3, MDA5, RIG-I; induce IFN-α/β (antiviral)" }
        ]
      },
      {
        titulo: "⚙️ Vía de Señalización LPS → Fiebre",
        tipo: "lista",
        items: [
          "1. LPS circulante se une LBP (LPS-binding protein plasmática)",
          "2. Complejo LPS-LBP transferido a CD14 (membrana monocitos/macrófagos) o sCD14 (soluble)",
          "3. CD14 presenta LPS a complejo TLR4-MD-2 → dimerización receptor",
          "4. Señalización intracelular: vía MyD88 (rápida, NF-κB) y TRIF (tardía, IRF3)",
          "5. NF-κB → núcleo → transcripción genes pro-inflamatorios: IL-1β, IL-6, TNF-α (piretógenos endógenos)",
          "6. Citocinas circulan → atraviesan BHE (regiones circunventriculares) o actúan órganos circunventriculares → hipotálamo → ↑ PGE2 → fiebre"
        ]
      },
      {
        titulo: "🧪 Endotoxinas vs Exotoxinas",
        tipo: "tabla",
        datos: [
          { label: "Endotoxinas (LPS)", value: "Componente estructural bacteria (membrana); liberado muerte/lisis bacteriana; termoestable; piretógeno potente; shock séptico" },
          { label: "Exotoxinas proteicas", value: "Secretadas activamente por bacteria viva; termolábiles (mayoría); específicas (toxina difteria, tetánica, botulínica); algunas son superantígenos" },
          { label: "Superantígenos", value: "Exotoxinas que activan policlonalmente células T (15-25% vs 0.01% antígeno normal); ej: toxina shock tóxico estafilocócica (TSST-1), enterotoxinas; liberación masiva citocinas → shock" },
          { label: "Test LAL (Limulus)", value: "Detecta LPS mediante coagulación hemolinfa cangrejo herradura; usado control pirógenos en fármacos parenterales, dispositivos médicos" }
        ]
      },
      {
        titulo: "🔥 Tolerancia a Endotoxinas",
        tipo: "lista",
        items: [
          "Fenómeno: exposición repetida LPS → respuesta inflamatoria atenuada en exposiciones subsecuentes",
          "Mecanismo: ↑ expresión reguladores negativos (IRAK-M, SOCS1, A20/TNFAIP3), ↓ expresión TLR4, cambio fenotipo macrófagos",
          "Significado clínico: protección contra sepsis en infecciones crónicas, pero también ↓ inmunidad (inmunoparálisis post-sepsis)",
          "Paradoja sepsis: fase hiperinflamatoria inicial (tormenta citocinas) seguida de fase inmunosupresora (tolerancia, anergia)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Shock endotóxico (sepsis Gram-negativa): LPS → liberación masiva TNF-α, IL-1 → vasodilatación (NO), aumento permeabilidad capilar, CID, fallo multiorgánico; mortalidad 30-50%",
          "Síndrome shock tóxico (TSS): superantígeno (TSST-1 de S. aureus) → activación masiva células T → tormenta citocinas → shock, fiebre alta, rash, descamación palmo-plantar",
          "Reacción pirógena post-transfusión: contaminación bacteriana hemoderivados → LPS/citocinas → fiebre, escalofríos, hipotensión durante/post-transfusión; prevención: leucorreducción, filtros",
          "Fiebre neutropénica: pacientes inmunosuprimidos (quimio) con neutropenia (<500/μL) + fiebre ≥38.3°C → riesgo sepsis; antibióticos empíricos urgentes (cefepime, piperacilina-tazobactam)"
        ]
      }
    ]
  },
  {
    id: "piretogenos-endogenos",
    nombre: "Piretógenos Endógenos (Citocinas Pirogénicas)",
    subtitulo: "Mediadores del huésped que inducen fiebre",
    icono: "🌡️",
    categorias: ["fiebre", "citocinas"],
    secciones: [
      {
        titulo: "🔬 Concepto y Función",
        tipo: "lista",
        items: [
          "Citocinas pro-inflamatorias producidas por células huésped (monocitos, macrófagos, células endoteliales) en respuesta a piretógenos exógenos o DAMPs",
          "Actúan sobre centro termorregulador hipotalámico (núcleo preóptico anterior) → ↑ punto de ajuste temperatura corporal",
          "Mecanismo final común: inducción COX-2 en células endoteliales vasculares hipotalámicas → síntesis PGE2 → activación neuronas termorreguladoras",
          "Efectos pleiotrópicos: además de fiebre → respuesta fase aguda, leucocitosis, somnolencia, anorexia, caquexia"
        ]
      },
      {
        titulo: "🧬 Principales Piretógenos Endógenos",
        tipo: "tabla",
        datos: [
          { label: "IL-1β (interleucina-1 beta)", value: "Producida por macrófagos, células dendríticas; procesada por caspasa-1 (inflamasoma NLRP3); receptor IL-1R1 → MyD88 → NF-κB; piretógeno más potente endógeno" },
          { label: "IL-6 (interleucina-6)", value: "Macrófagos, células T, endotelio; receptor IL-6R (gp130); induce proteínas fase aguda hepáticas (CRP, SAA, fibrinógeno); fiebre + respuesta sistémica" },
          { label: "TNF-α (factor necrosis tumoral alfa)", value: "Macrófagos principalmente; receptor TNFR1 → caspasa-8 (apoptosis), NF-κB (inflamación); piretógeno temprano, induce IL-1, IL-6; caquexia crónica" },
          { label: "IFN-α/β (interferones tipo I)", value: "Células dendríticas plasmocitoides, fibroblastos; respuesta antiviral; receptor IFNAR → JAK-STAT; fiebre en infecciones virales; IFN-α terapéutico → síndrome gripal" },
          { label: "IFN-γ (interferón gamma)", value: "Células T CD4+ Th1, NK; activación macrófagos; receptor IFNGR → JAK-STAT; fiebre en infecciones intracelulares (TB, Salmonella)" }
        ]
      },
      {
        titulo: "🔥 Inflamasoma NLRP3 y Procesamiento IL-1β",
        tipo: "lista",
        items: [
          "SEÑAL 1 (priming): TLR activado → NF-κB → transcripción pro-IL-1β, pro-IL-18, NLRP3 (forma inactiva)",
          "SEÑAL 2 (activación): DAMPs (ATP, cristales urato, cristales colesterol, Aβ amiloide) o PAMPs → cambios iónicos (↓ K+ intracelular, ↑ Ca²+, ROS mitocondrial)",
          "Ensamblaje inflamasoma: NLRP3 + ASC (adaptador) + pro-caspasa-1 → complejo multimérico → autocatálisis caspasa-1",
          "Caspasa-1 activa: escinde pro-IL-1β → IL-1β madura (secretada); pro-IL-18 → IL-18; induce piroptosis (muerte celular inflamatoria)"
        ]
      },
      {
        titulo: "⚙️ Vía Final Común: PGE2 Hipotalámica",
        tipo: "tabla",
        datos: [
          { label: "Paso 1", value: "IL-1β, IL-6, TNF-α circulantes → atraviesan BHE en órganos circunventriculares (OVLT, área postrema) o se unen receptores endotelio vascular cerebral" },
          { label: "Paso 2", value: "Citocinas inducen COX-2 (ciclooxigenasa-2) en células endoteliales vasculares hipotalámicas y microglía" },
          { label: "Paso 3", value: "COX-2 convierte ácido araquidónico → PGE2 (prostaglandina E2); PGE2 difunde a núcleo preóptico anterior hipotálamo" },
          { label: "Paso 4", value: "PGE2 → receptor EP3 en neuronas termorreguladoras → ↑ AMPc → ↑ punto ajuste termostato (~39-40°C vs 37°C normal)" },
          { label: "Resultado", value: "Hipotálamo 'percibe' temperatura actual como baja → activa mecanismos conservación/producción calor: vasoconstricción periférica (piel fría), tiritona (termogénesis muscular)" }
        ]
      },
      {
        titulo: "🧪 Regulación y Resolución Fiebre",
        tipo: "lista",
        items: [
          "ANTI-INFLAMATORIOS: IL-10, TGF-β, IL-1Ra (antagonista receptor IL-1), glucocorticoides → suprimen producción citocinas pirogénicas",
          "ANTIPIRÉTICOS: AINEs (paracetamol, ibuprofeno, aspirina) inhiben COX-1/2 → ↓ PGE2 → normaliza punto ajuste → vasodilatación, sudoración (disipación calor)",
          "CRIÓGENOS ENDÓGENOS: α-MSH (melanocortina), lipoxinas, resolvinas → señales anti-inflamatorias, pro-resolución",
          "RETROALIMENTACIÓN NEGATIVA: cortisol (eje HPA activado por fiebre/estrés) → inhibe producción IL-1, TNF-α; glucocorticoides exógenos (dexametasona) potentes antipiréticos"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Fiebre medicamentosa: fármacos actúan como haptenos (β-lactámicos, fenitoína, alopurinol) → reacción hipersensibilidad → liberación citocinas; eosinofilia; resolución al suspender fármaco",
          "Síndromes autoinflamatorios: mutaciones genes inflamasoma (NLRP3, MEFV, TNFRSF1A) → activación espontánea → fiebre recurrente; ej: fiebre mediterránea familiar (colchicina), CAPS (anakinra anti-IL-1)",
          "Hipertermia maligna: reacción anestésicos volátiles (halotano) + relajantes (succinilcolina) en susceptibles (mutación RYR1) → liberación Ca²+ masiva músculo → contractura, rabdomiólisis, ↑↑ temperatura (>41°C); NO mediada por PGE2 (antipiréticos ineficaces); tratamiento: dantroleno",
          "Golpe de calor: ejercicio intenso o ambiente caluroso extremo → fallo termorregulación → temperatura >40°C, disfunción SNC, fallo multiorgánico; diferencia fiebre: NO por PGE2, tratamiento: enfriamiento físico (NO antipiréticos)"
        ]
      }
    ]
  },
  {
    id: "respuesta-fase-aguda",
    nombre: "Respuesta de Fase Aguda",
    subtitulo: "Cambios sistémicos inducidos por infección e inflamación",
    icono: "📈",
    categorias: ["respuesta-sistemica"],
    secciones: [
      {
        titulo: "🔬 Definición y Componentes",
        tipo: "lista",
        items: [
          "Respuesta sistémica inespecífica a infección, trauma, inflamación, neoplasia; mediada por citocinas (IL-6 principal)",
          "Objetivo: limitar daño tisular, aislar/destruir patógeno, activar procesos reparativos",
          "Componentes: fiebre, leucocitosis, síntesis proteínas fase aguda hepáticas, cambios metabólicos/endocrinos/conductuales",
          "Cronología: horas-días; si persiste >semanas → inflamación crónica"
        ]
      },
      {
        titulo: "🧬 Proteínas de Fase Aguda",
        tipo: "tabla",
        datos: [
          { label: "↑ Proteína C reactiva (PCR)", value: "↑ 100-1000×; opsonina (se une fosforilcolina bacterias, células apoptóticas) → activación complemento vía clásica; marcador inflamación/infección (normal <1 mg/dL)" },
          { label: "↑ Amiloide sérico A (SAA)", value: "↑ 100-1000×; recluta leucocitos, induce metaloproteinasas; precursor amiloide AA (amiloidosis reactiva en inflamación crónica: AR, EII)" },
          { label: "↑ Fibrinógeno", value: "↑ 2-4×; coagulación → contención infección; ↑ VSG (velocidad sedimentación globular); trombosis en sepsis" },
          { label: "↑ Haptoglobina", value: "↑ 2-4×; se une Hb libre (hemólisis) → previene daño oxidativo renal, recicla hierro" },
          { label: "↑ Ferritina", value: "↑ 2-10×; secuestra hierro → limita disponibilidad para patógenos (anemia inflamación); marcador tormentas citocinas (síndrome activación macrofágica)" },
          { label: "↓ Albúmina", value: "↓ síntesis hepática (desviación recursos a proteínas fase aguda); ↑ permeabilidad capilar → pérdida espacios extravasculares; hipoalbuminemia" },
          { label: "↓ Transferrina", value: "↓ transporte hierro; junto ↑ ferritina → secuestro hierro intracelular (anemia inflamación: ↓ hierro sérico, ↑ ferritina, ↓ transferrina)" }
        ]
      },
      {
        titulo: "🔥 Regulación Hepática por IL-6",
        tipo: "lista",
        items: [
          "IL-6 (de macrófagos, células endoteliales en foco inflamatorio) → circulación → hígado",
          "IL-6 → receptor IL-6R (hepatocitos) → gp130 → vía JAK-STAT3 → núcleo",
          "STAT3 induce transcripción genes proteínas fase aguda: CRP, SAA, fibrinógeno, haptoglobina, α1-antitripsina, ceruloplasmina",
          "STAT3 reprime albúmina, transferrina (prioriza síntesis proteínas defensa sobre transporte)"
        ]
      },
      {
        titulo: "⚖️ Cambios Metabólicos y Endocrinos",
        tipo: "tabla",
        datos: [
          { label: "Catabolismo muscular", value: "TNF-α, IL-1 → proteólisis (ubiquitina-proteasoma) → libera aminoácidos (gluconeogénesis hepática, síntesis proteínas fase aguda); pérdida masa muscular (caquexia)" },
          { label: "Lipolisis", value: "TNF-α, cortisol → lipólisis tejido adiposo → ácidos grasos libres (energía), glicerol (gluconeogénesis); hipertrigliceridemia" },
          { label: "Resistencia insulina", value: "TNF-α, IL-6 → ↓ señalización insulina → hiperglucemia; desviación glucosa a células inmunes (no requieren insulina para captación)" },
          { label: "Activación eje HPA", value: "IL-1, IL-6 → CRH hipotalámico → ACTH hipófisis → cortisol suprarrenal; cortisol: anti-inflamatorio (retroalimentación), metabolismo glucosa, cardiovascular" },
          { label: "Anemia inflamación", value: "Hepcidina (proteína fase aguda) → bloquea ferroportina → secuestro hierro macrófagos/hepatocitos → ↓ hierro disponible eritropoyesis; anemia normocítica/microcítica" }
        ]
      },
      {
        titulo: "🧠 Síndrome de Comportamiento de Enfermedad (Sickness Behavior)",
        tipo: "lista",
        items: [
          "Cambios conductuales adaptativos mediados por citocinas (IL-1β principalmente) actuando en SNC",
          "Componentes: letargia (↓ actividad, reposo), anorexia (↓ ingesta, ↓ gasto energético), somnolencia (↑ sueño NREM reparador), anhedonia (↓ interacciones sociales)",
          "Mecanismo: citocinas → nervio vago aferente o paso BHE → activación microglía → PGE2, IL-1β local → neuronas hipotálamo, núcleos tronco cerebral",
          "Función evolutiva: conservar energía para respuesta inmune (febríl, síntesis proteínas fase aguda consumen ATP); reducir exposición (aislamiento social limita contagio)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "PCR elevada: indicador sensible (pero inespecífico) infección/inflamación; útil monitorizar respuesta antibióticos, distinguir infección bacteriana (↑↑ PCR) vs viral (↑ moderado); PCR >100 mg/L sugiere infección bacteriana",
          "Procalcitonina (PCT): mejor especificidad que PCR para infección bacteriana/sepsis; PCT >0.5 ng/mL sugiere sepsis; guía inicio/suspensión antibióticos en UCI; NO útil infecciones virales, localizadas",
          "Amiloidosis AA: inflamación crónica no controlada (AR, EII, FMF, osteomielitis crónica) → depósito amiloide AA (de SAA) en riñón, hígado, bazo → síndrome nefrótico, insuficiencia renal, hepatomegalia",
          "Síndrome activación macrofágica (linfohistiocitosis hemofagocítica): tormenta citocinas → fiebre, citopenias, ferritina muy alta (>10,000 ng/mL), hipertrigliceridemia, coagulopatía; tratamiento: inmunosupresión (etopósido, dexametasona)"
        ]
      }
    ]
  },
  {
    id: "inmunidad-innata",
    nombre: "Inmunidad Innata: Primera Línea de Defensa",
    subtitulo: "Reconocimiento y respuesta inmediata a patógenos",
    icono: "🛡️",
    categorias: ["inmunidad-innata"],
    secciones: [
      {
        titulo: "🔬 Características Inmunidad Innata",
        tipo: "lista",
        items: [
          "Respuesta inmediata (minutos-horas) vs adaptativa (días); presente desde nacimiento (no requiere exposición previa)",
          "Reconocimiento: PAMPs/DAMPs vía PRRs → respuesta estereotipada (no específica para antígenos individuales)",
          "Sin memoria inmunológica (misma intensidad en exposiciones repetidas) vs adaptativa (memoria, respuesta amplificada)",
          "Componentes: barreras físico-químicas, células (fagocitos, NK, mastocitos), proteínas solubles (complemento, lectinas, citocinas)"
        ]
      },
      {
        titulo: "🛡️ Barreras Físico-Químicas",
        tipo: "tabla",
        datos: [
          { label: "Piel", value: "Barrera mecánica (queratina), pH ácido (5.5), ácidos grasos antimicrobianos (sebo), microbiota comensal competitiva; pérdida (quemaduras) → infección masiva" },
          { label: "Mucosas respiratorias", value: "Epitelio ciliar → clearance mucociliar (expulsa patógenos); moco (mucinas): atrapa, lisozima, lactoferrina, defensinas, IgA secretoria" },
          { label: "Tracto GI", value: "pH gástrico ácido (<2, mata mayoría bacterias), enzimas digestivas, microbiota (resistencia colonización), células Paneth (defensinas), IgA secretoria" },
          { label: "Tracto genitourinario", value: "Flujo urinario (arrastre mecánico), pH vaginal ácido (Lactobacillus produce ácido láctico), lisozima" }
        ]
      },
      {
        titulo: "🧬 Receptores de Reconocimiento de Patrones (PRRs)",
        tipo: "tabla",
        datos: [
          { label: "TLRs (Toll-like receptors)", value: "Membrana/endosomas; TLR4 (LPS), TLR2 (peptidoglicano), TLR3 (dsRNA), TLR5 (flagelina), TLR9 (CpG DNA); señalización → NF-κB, IRFs → citocinas" },
          { label: "NLRs (NOD-like receptors)", value: "Citoplasma; NOD1/2 (peptidoglicano); NLRP3 (inflamasoma, activado por ATP, cristales, ROS) → caspasa-1 → IL-1β, IL-18" },
          { label: "RLRs (RIG-I-like receptors)", value: "Citoplasma; RIG-I, MDA5 (RNA viral citoplásmico) → MAVS → IRF3/7 → IFN tipo I (respuesta antiviral)" },
          { label: "CLRs (C-type lectin receptors)", value: "Membrana; Dectina-1 (β-glucanos fúngicos), receptor manosa; fagocitosis, señalización anti-fúngica" }
        ]
      },
      {
        titulo: "🦠 Células Efectoras Inmunidad Innata",
        tipo: "tabla",
        datos: [
          { label: "Neutrófilos", value: "Fagocitos más abundantes (50-70% leucocitos); primera línea vs bacterias extracelulares; estallido respiratorio (ROS), NETs (trampas DNA extracelular), degranulación; vida corta (horas)" },
          { label: "Macrófagos", value: "Fagocitos residentes tisulares; presentadores antígeno; secretan citocinas (TNF-α, IL-1, IL-12); activación clásica M1 (IFN-γ, microbicida) vs alternativa M2 (IL-4, reparación)" },
          { label: "Células dendríticas", value: "Centinelas tisulares; captura antígeno → migración linfonodo → presentación células T naive (puente inmunidad innata-adaptativa); DC plasmocitoides: IFN-α/β (antiviral)" },
          { label: "Células NK", value: "Linfocitos innatos; citotoxicidad sin sensibilización previa; reconocen ↓ MHC-I (células infectadas, tumorales); liberan perforina/granzimas, IFN-γ" },
          { label: "Mastocitos/Basófilos", value: "Gránulos histamina, heparina, proteasas; respuesta alérgica (IgE), parásitos; vasodilatación, permeabilidad vascular, reclutamiento eosinófilos" },
          { label: "Eosinófilos", value: "Defensa anti-parasitaria (helmintos); degranulación (proteína básica mayor, peroxidasa, neurotoxina); hipersensibilidad tipo I, asma alérgica" }
        ]
      },
      {
        titulo: "💥 Sistema Complemento",
        tipo: "lista",
        items: [
          "Cascada proteolítica plasmática >30 proteínas; 3 vías activación: clásica (anticuerpos), alternativa (espontánea, superficie patógeno), lectinas (MBL se une manosa)",
          "Convergencia: formación C3 convertasa → C3a + C3b → C5 convertasa → C5a + C5b → C5b-9 (MAC, complejo ataque membrana)",
          "Funciones: opsonización (C3b, iC3b), quimiotaxis (C3a, C5a: anafilatoxinas), lisis celular (MAC), clearance complejos inmunes",
          "Regulación: inhibidores (C1-INH, factor H, DAF/CD55, protectina/CD59); deficiencias → autoinmunidad (LES), infecciones recurrentes (Neisseria)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Deficiencia mieloperoxidasa (MPO): neutrófilo no genera HOCl → infecciones fúngicas (Candida) recurrentes; relativamente benigna (redundancia ROS)",
          "Deficiencia complemento: C3 (infecciones piógenas recurrentes, glomerulonefritis), C5-C9 (susceptibilidad Neisseria), C1-INH (angioedema hereditario: edema submucoso sin urticaria)",
          "Hemoglobinuria paroxística nocturna (HPN): mutación PIG-A → déficit GPI-anchor → pérdida CD55, CD59 → eritrocitos susceptibles MAC → hemólisis intravascular, anemia, trombosis",
          "Síndrome hiper-IgE (Job): mutación STAT3 → neutrófilos disfuncionales, ↓ Th17 → infecciones estafilocócicas recurrentes (abscesos fríos), candidiasis, neumonías, eczema, IgE >2000 UI/mL"
        ]
      }
    ]
  },
  {
    id: "inmunidad-adaptativa",
    nombre: "Inmunidad Adaptativa: Respuesta Específica",
    subtitulo: "Células T, B y generación de memoria inmunológica",
    icono: "🎯",
    categorias: ["inmunidad-adaptativa"],
    secciones: [
      {
        titulo: "🔬 Características Inmunidad Adaptativa",
        tipo: "lista",
        items: [
          "Especificidad antigénica: receptores únicos TCR (células T), BCR/Ig (células B) reconocen epitopos específicos mediante recombinación V(D)J",
          "Diversidad: >10¹¹ especificidades diferentes TCR/BCR posibles (recombinación, inserción/deleción nucleótidos, apareamiento cadenas)",
          "Memoria: células memoria de vida larga → respuesta secundaria más rápida/intensa que primaria (días vs semanas)",
          "Autotolerancia: selección tímica (células T), edición receptor/deleción (células B) eliminan clones autorreactivos"
        ]
      },
      {
        titulo: "🧬 Células T: Subtipos y Funciones",
        tipo: "tabla",
        datos: [
          { label: "Células T CD4+ (helper)", value: "Reconocen MHC-II (APCs); dirigen respuesta inmune; subtipos: Th1 (IFN-γ, activación macrófagos, inmunidad celular), Th2 (IL-4, IL-5, respuesta alérgica/anti-parasitaria), Th17 (IL-17, defensa extracelular, autoinmunidad)" },
          { label: "Células T CD8+ (citotóxicas)", value: "Reconocen MHC-I (todas células nucleadas); matan células infectadas (virus), tumorales; perforina/granzimas, FasL → apoptosis" },
          { label: "Células T reguladoras (Tregs)", value: "CD4+CD25+FoxP3+; suprimen respuesta inmune (IL-10, TGF-β, contacto CTLA-4); previenen autoinmunidad, limitan inflamación; déficit FoxP3 → IPEX" },
          { label: "Células T memoria", value: "Memoria central (Tcm): linfonodos, alta capacidad proliferativa; Memoria efectora (Tem): tejidos periféricos, función inmediata; Memoria residentes tejido (Trm): no circulan, vigilancia local" }
        ]
      },
      {
        titulo: "💉 Activación Células T (Señales 1, 2, 3)",
        tipo: "lista",
        items: [
          "SEÑAL 1 (especificidad): TCR reconoce péptido-MHC (CD4→MHC-II, CD8→MHC-I); coreceptores CD4/CD8 estabilizan interacción",
          "SEÑAL 2 (coestimulación): CD28 (célula T) + B7 (CD80/CD86, APC) → activación completa; sin señal 2 → anergia; CTLA-4 (inhibe, compite con CD28)",
          "SEÑAL 3 (polarización): citocinas del microambiente determinan diferenciación: IL-12 → Th1, IL-4 → Th2, TGF-β+IL-6 → Th17, TGF-β solo → Treg",
          "Resultado: proliferación clonal (expansión 1000-10000×), diferenciación efectoras/memoria, producción citocinas específicas linaje"
        ]
      },
      {
        titulo: "🧬 Células B y Producción de Anticuerpos",
        tipo: "tabla",
        datos: [
          { label: "Activación T-dependiente", value: "Célula B presenta antígeno (MHC-II) a célula T CD4+; T helper (CD40L-CD40, citocinas IL-4, IL-21) → proliferación B, centro germinal, cambio isotipo, hipermutación somática, afinidad maduración" },
          { label: "Cambio de isotipo (class switching)", value: "IgM → IgG (opsonización, complemento, transplacenta), IgA (mucosas, leche), IgE (alergia, parásitos); mediado citocinas: IFN-γ → IgG2a, IL-4 → IgE, TGF-β → IgA" },
          { label: "Afinidad maduración", value: "Hipermutación somática en centro germinal → variantes BCR; selección por FDCs (células dendríticas foliculares presentan antígeno) → sobreviven B alta afinidad" },
          { label: "Células plasmáticas", value: "Fábricas anticuerpos (secretan 2000 moléculas/s); vida corta (días) en bazo/linfonodo o larga (años-décadas) en médula ósea; responsables inmunidad humoral" },
          { label: "Células B memoria", value: "Vida larga, BCR alta afinidad, isotipo cambiado; respuesta secundaria rápida (días vs semanas); base vacunación" }
        ]
      },
      {
        titulo: "🎯 Funciones de Anticuerpos",
        tipo: "tabla",
        datos: [
          { label: "Neutralización", value: "Bloquean sitios unión patógeno (virus, toxinas) a células huésped; ej: anticuerpos anti-toxina difteria, tétanos; IgA neutraliza virus entéricos" },
          { label: "Opsonización", value: "Recubren patógeno → Fc reconocido por FcR en fagocitos → fagocitosis mejorada; IgG (IgG1, IgG3 humano)" },
          { label: "Activación complemento", value: "IgM, IgG → fijan C1q → vía clásica → opsonización (C3b), MAC; IgM más eficiente (pentámero, 10 sitios Fc)" },
          { label: "ADCC (citotoxicidad celular dependiente anticuerpos)", value: "IgG recubre célula diana → NK, macrófago (FcγRIII/CD16) reconoce Fc → liberan perforina/granzimas, TNF → lisis célula" },
          { label: "Activación mastocitos", value: "IgE → FcεRI en mastocitos/basófilos; re-exposición antígeno → entrecruzamiento IgE → degranulación → hipersensibilidad tipo I (alergia, anafilaxia)" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Inmunodeficiencia combinada severa (SCID): múltiples defectos genéticos (γc, ADA, RAG1/2) → déficit células T (y B si T-dependiente); infecciones oportunistas desde lactancia; burbujas niño, trasplante médula",
          "Agammaglobulinemia ligada-X (Bruton): mutación BTK → bloqueo maduración células B → ausencia Ig → infecciones bacterianas recurrentes (Streptococcus, Haemophilus) desde 6 meses (desaparece IgG materna); tratamiento: IVIG",
          "Deficiencia IgA selectiva: IgA <7 mg/dL (más común, 1:500); mayoría asintomáticos; algunos infecciones sinopulmonares, GI, autoinmunidad, alergia; riesgo reacciones transfusionales (anti-IgA)",
          "Mieloma múltiple: proliferación clonal células plasmáticas → pico monoclonal Ig (IgG/IgA), proteinuria Bence-Jones (cadenas ligeras); hipercalcemia, lesiones líticas óseas, insuficiencia renal, inmunosupresión (↓ Ig normales)"
        ]
      }
    ]
  },
  {
    id: "citocinas-quimiocinas",
    nombre: "Red de Citocinas y Quimiocinas",
    subtitulo: "Comunicación célula-célula en respuesta inmune",
    icono: "📡",
    categorias: ["citocinas"],
    secciones: [
      {
        titulo: "🔬 Características Generales Citocinas",
        tipo: "lista",
        items: [
          "Proteínas señalización <30 kDa; acción: autocrina (misma célula), paracrina (células cercanas), endocrina (circulación, rara)",
          "Pleiotropía: una citocina múltiples efectos en diferentes células; Redundancia: múltiples citocinas mismo efecto",
          "Sinergismo: IL-4 + IL-13 (ambas inducen Th2); Antagonismo: IFN-γ (Th1) inhibe Th2, IL-10 inhibe Th1",
          "Producción transitoria, picos concentración locales altos; vida media corta (minutos-horas)"
        ]
      },
      {
        titulo: "🧬 Familias de Citocinas Pro-inflamatorias",
        tipo: "tabla",
        datos: [
          { label: "Familia IL-1 (IL-1α, IL-1β, IL-18)", value: "Piretógenos, activación endotelio, inducción quimiocinas; IL-18 con IL-12 → IFN-γ (Th1); antagonista: IL-1Ra (anakinra terapéutico)" },
          { label: "Familia TNF (TNF-α, linfotoxina)", value: "Inflamación, apoptosis (TNFR1), activación NF-κB; shock séptico; anti-TNF: infliximab, adalimumab, etanercept (AR, Crohn, psoriasis)" },
          { label: "Familia IL-6 (IL-6, IL-11, LIF, OSM)", value: "Proteínas fase aguda, fiebre, diferenciación células B; IL-6 + TGF-β → Th17; anti-IL-6R: tocilizumab (AR, síndrome liberación citocinas)" },
          { label: "Quimiocinas", value: "Familia >50 miembros; gradientes químicos dirigir migración leucocitos; CCL2/MCP-1 (monocitos), CXCL8/IL-8 (neutrófilos), CCL5/RANTES (células T, eosinófilos)" }
        ]
      },
      {
        titulo: "🛡️ Citocinas Anti-inflamatorias/Reguladoras",
        tipo: "tabla",
        datos: [
          { label: "IL-10", value: "Tregs, macrófagos M2; inhibe producción citocinas Th1 (IFN-γ, TNF-α, IL-12), presentación antígeno (↓ MHC-II, coestimuladores); limita inflamación, previene autoinmunidad" },
          { label: "TGF-β", value: "Células T, macrófagos; inhibe proliferación células T, diferenciación Th1/Th2; induce Treg (con IL-2), Th17 (con IL-6); pro-fibrótico (cicatrización, fibrosis patológica)" },
          { label: "IL-35", value: "Tregs; suprime proliferación Tefectoras, induce Tregs; deficiencia → autoinmunidad (modelos animales)" },
          { label: "IL-1Ra (antagonista receptor IL-1)", value: "Bloquea competitivamente IL-1R; producido macrófagos, hepatocitos; anakinra recombinante: AR, síndromes autoinflamatorios" }
        ]
      },
      {
        titulo: "⚙️ Interferones: Familia y Funciones",
        tipo: "tabla",
        datos: [
          { label: "Tipo I (IFN-α, IFN-β)", value: "Todas células nucleadas (IFN-β), DC plasmocitoides (IFN-α); respuesta antiviral; ↑ MHC-I, proteasoma, proteínas antivirales (PKR, OAS, Mx); tratamiento hepatitis C, EM" },
          { label: "Tipo II (IFN-γ)", value: "Células T CD4+ Th1, CD8+, NK; activa macrófagos M1 (microbicida), ↑ MHC-I/II, induce cambio isotipo IgG, inhibe Th2; deficiencia → susceptibilidad micobacterias" },
          { label: "Tipo III (IFN-λ)", value: "Células epiteliales; respuesta antiviral mucosas (respiratoria, GI); menor inflamación que tipo I (expresión receptor limitada)" }
        ]
      },
      {
        titulo: "🌐 Tormenta de Citocinas (Cytokine Storm)",
        tipo: "lista",
        items: [
          "Liberación masiva descontrolada citocinas pro-inflamatorias → inflamación sistémica severa, daño tisular, fallo multiorgánico",
          "Causas: sepsis severa, COVID-19 grave, CAR-T (síndrome liberación citocinas), linfohistiocitosis hemofagocítica",
          "Citocinas implicadas: IL-6 (principal), TNF-α, IL-1β, IFN-γ, IL-8, IL-18; niveles 10-100× normales",
          "Manifestaciones: fiebre alta refractaria, hipotensión, SDRA, coagulopatía, disfunción multiorgánica; laboratorio: ↑↑ ferritina, IL-6, PCR, D-dímero",
          "Tratamiento: inmunosupresión (corticoides, tocilizumab anti-IL-6, anakinra anti-IL-1); soporte orgánico (ventilación, vasopresores)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Síndrome liberación citocinas (CAR-T): terapia células T modificadas anti-cáncer → activación masiva → IL-6, IFN-γ; fiebre, hipotensión, hipoxia; tratamiento: tocilizumab (anti-IL-6R)",
          "COVID-19 severo: SARS-CoV-2 → hiperactivación inmune innata → tormenta citocinas (IL-6, TNF-α) → SDRA, trombosis; dexametasona, tocilizumab reducen mortalidad",
          "Artritis reumatoide: desbalance citocinas; ↑ TNF-α, IL-1, IL-6 en sinovio → inflamación, destrucción articular; anti-TNF (adalimumab), anti-IL-6 (tocilizumab) altamente efectivos",
          "Enfermedad Crohn: desbalance Th1/Th17; ↑ TNF-α, IL-12, IL-23, IFN-γ → inflamación transmural; anti-TNF (infliximab), anti-IL-12/23 (ustekinumab) inducen remisión"
        ]
      }
    ]
  },
  {
    id: "sepsis-sirs",
    nombre: "Sepsis y Síndrome de Respuesta Inflamatoria Sistémica",
    subtitulo: "Respuesta desregulada a infección con disfunción orgánica",
    icono: "⚠️",
    categorias: ["respuesta-sistemica", "emergencia"],
    secciones: [
      {
        titulo: "📊 Definiciones Sepsis-3 (2016)",
        tipo: "tabla",
        datos: [
          { label: "Sepsis", value: "Disfunción orgánica potencialmente mortal causada por respuesta desregulada del huésped a infección; operacionalmente: infección + SOFA ≥2 (Sequential Organ Failure Assessment)" },
          { label: "Shock séptico", value: "Subgrupo sepsis con disfunción circulatoria/celular/metabólica profunda; hipotensión requiere vasopresores (PAM ≥65 mmHg) + lactato >2 mmol/L a pesar reanimación fluidos; mortalidad >40%" },
          { label: "qSOFA (quick SOFA)", value: "Screening fuera UCI: ≥2 de: alteración mental (GCS <15), PAS ≤100 mmHg, FR ≥22/min; predice mayor mortalidad, mal pronóstico" },
          { label: "SIRS (retirado definición sepsis)", value: "≥2 de: T >38°C o <36°C, FC >90, FR >20 (PaCO2 <32), leucocitos >12000 o <4000 o >10% inmaduros; inespecífico (trauma, pancreatitis, quemaduras)" }
        ]
      },
      {
        titulo: "⚙️ Fisiopatología Sepsis",
        tipo: "lista",
        items: [
          "FASE HIPERINFLAMATORIA TEMPRANA: PAMPs/DAMPs → activación masiva inmunidad innata → tormenta citocinas (TNF-α, IL-1β, IL-6) → activación complemento, coagulación, endotelio",
          "Disfunción endotelial: ↑ permeabilidad (gaps intercelulares) → fuga capilar → edema intersticial, hipotensión; activación procoagulante (factor tisular) → CID; ↓ respuesta vasoconstrictora",
          "Vasodilatación refractaria: iNOS → NO excesivo → hipotensión severa no responde completamente a catecolaminas; acidosis metabólica (lactato), disfunción mitocondrial",
          "FASE INMUNOSUPRESORA TARDÍA (días): apoptosis linfocitos, monocitos; anergia (tolerancia endotoxinas); ↑ IL-10, TGF-β; susceptibilidad infecciones oportunistas (fungemia, CMV)"
        ]
      },
      {
        titulo: "🩸 Coagulación Intravascular Diseminada (CID) en Sepsis",
        tipo: "tabla",
        datos: [
          { label: "Activación coagulación", value: "Factor tisular (monocitos, endotelio) + ↓ anticoagulantes (antitrombina, proteína C) → generación trombina masiva → microtrombos difusos" },
          { label: "Consumo factores", value: "Coagulación continua → depleción plaquetas, fibrinógeno, factores V, VIII → sangrado paradójico; D-dímero ↑↑ (degradación fibrina)" },
          { label: "Hipofibrinolisis", value: "↑ PAI-1 (inhibidor activador plasminógeno) → impide lisis coágulos → persistencia microtrombos → isquemia órganos" },
          { label: "Manifestaciones", value: "Purpura fulminans (necrosis cutánea, gangrena), SDRA, insuficiencia renal aguda, isquemia intestinal; laboratorio: ↓ plaquetas, ↓ fibrinógeno, ↑ TP/TTPa, ↑↑ D-dímero, esquistocitos" }
        ]
      },
      {
        titulo: "🧬 Biomarcadores Sepsis",
        tipo: "tabla",
        datos: [
          { label: "Lactato", value: "Hipoperfusión tisular, metabolismo anaeróbico; lactato >2 mmol/L → hipoperfusión, >4 mmol/L → shock; clearance lactato guía reanimación" },
          { label: "Procalcitonina (PCT)", value: "Mejor especificidad que PCR para sepsis bacteriana; PCT >2 ng/mL → sepsis probable, >10 ng/mL → shock séptico; guía duración antibióticos" },
          { label: "Presepsina (sCD14-ST)", value: "Fragmento CD14; ↑ rápido sepsis; valor pronóstico (niveles altos → peor outcome); aún en investigación, no ampliamente disponible" },
          { label: "IL-6", value: "↑ muy temprano sepsis; vida media corta; correlaciona gravedad; no uso rutinario clínico (investigación, ensayos tormenta citocinas)" }
        ]
      },
      {
        titulo: "💊 Manejo Sepsis (Surviving Sepsis Campaign)",
        tipo: "lista",
        items: [
          "PRIMERA HORA (bundle hour-1): hemocultivos antes antibióticos, antibióticos empíricos amplios (1h), reanimación fluidos (30 mL/kg cristaloides si hipotensión/lactato ≥4), medir lactato",
          "ANTIBIÓTICOS: empíricos amplios precoces (cada hora retraso ↑ mortalidad 7%); desescalamiento según cultivos/sensibilidad; duración típica 7-10 días",
          "REANIMACIÓN HEMODINÁMICA: fluidos IV (cristaloides, evitar coloides), vasopresores si hipotensión persistente (noradrenalina 1ª línea), objetivos: PAM ≥65 mmHg, diuresis ≥0.5 mL/kg/h, ↓ lactato",
          "SOPORTE ORGÁNICO: ventilación mecánica protectora (Vt bajo si SDRA), terapia reemplazo renal (insuficiencia renal), corticoides (hidrocortisona si shock refractario)",
          "CONTROL FOCO: drenaje abscesos, desbridamiento tejido necrótico, remoción dispositivos infectados (catéteres, prótesis)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Shock séptico meningocócico (púrpura fulminans): Neisseria meningitidis → LPS masivo → CID severa → trombosis microvascular → necrosis cutánea extensa, gangrena distal; mortalidad 40-50%",
          "Fascitis necrotizante: infección tejidos blandos profundos (S. pyogenes, polimicrobiana) → toxinas, enzimas → necrosis rápida → shock tóxico; tratamiento: desbridamiento quirúrgico urgente + antibióticos",
          "Neutropenia febril + sepsis: paciente quimioterapia, neutrófilos <500 → riesgo alto Gram-negativos (E. coli, Pseudomonas), hongos (Candida, Aspergillus); antibióticos empíricos: cefepime o piperacilina-tazobactam",
          "Sepsis post-esplenectomía: déficit opsonización (↓ IgM, complemento) → susceptibilidad bacterias encapsuladas (Streptococcus pneumoniae, Haemophilus, Neisseria); profilaxis: vacunas, penicilina oral"
        ]
      }
    ]
  }
];
