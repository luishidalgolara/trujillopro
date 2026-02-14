// ═══════════════════════════════════════════════════════════
// DOLOR-OBSTRUCCION-DATA.JS - Base de datos educativa
// ═══════════════════════════════════════════════════════════

const DOLOR_OBSTRUCCION_DATA = [
  {
    id: "fisiopatologia-dolor",
    nombre: "Fisiopatología del Dolor",
    subtitulo: "Mecanismos de transducción y transmisión nociceptiva",
    icono: "⚡",
    categorias: ["dolor", "nociocepcion"],
    secciones: [
      {
        titulo: "🔬 Nociceptores: Receptores del Dolor",
        tipo: "lista",
        items: [
          "Terminaciones nerviosas libres de fibras aferentes primarias (sin cápsula especializada); amplia distribución: piel, músculo, articulaciones, vísceras",
          "Fibras A-delta: mielinizadas finas (2-5 μm), conducción 5-30 m/s; dolor rápido/agudo, bien localizado (pinchazo, corte)",
          "Fibras C: amielínicas (0.2-1.5 μm), conducción 0.5-2 m/s; dolor lento/sordo, mal localizado, persistente (quemadura, isquemia)",
          "Umbral alto: solo se activan con estímulos nocivos (intensidad suficiente para causar daño tisular actual o potencial)"
        ]
      },
      {
        titulo: "⚙️ Transducción: Estímulo → Señal Eléctrica",
        tipo: "tabla",
        datos: [
          { label: "Canales TRP (transient receptor potential)", value: "TRPV1 (capsaicina, calor >43°C, H⁺), TRPA1 (frío <17°C, irritantes químicos), TRPM8 (mentol, frío 8-28°C); entrada Na⁺/Ca²⁺ → despolarización" },
          { label: "Canales sodio voltaje-dependientes", value: "Nav1.7, Nav1.8, Nav1.9 (nociceptores); mutaciones Nav1.7: ganancia función → eritromelalgia (dolor quemante), pérdida función → insensibilidad congénita dolor" },
          { label: "Canales activados ácido (ASIC)", value: "Detectan pH bajo (<6.5); isquemia, inflamación → acumulación H⁺, lactato → activación ASIC → dolor" },
          { label: "Receptores purinérgicos (P2X)", value: "P2X3, P2X2/3; ATP liberado células dañadas → activación → dolor (señal 'alarma' daño celular)" }
        ]
      },
      {
        titulo: "🧬 Sensibilización Periférica",
        tipo: "lista",
        items: [
          "↓ umbral activación nociceptores por mediadores inflamatorios ('sopa inflamatoria') → hiperalgesia primaria (↑ sensibilidad en sitio lesión)",
          "Mediadores: prostaglandinas (PGE2, COX-2), bradicinina, serotonina, histamina, ATP, H⁺, NGF (factor crecimiento nervioso)",
          "Mecanismos: fosforilación canales TRP/Nav → ↑ excitabilidad; ↑ expresión canales (transcripción mediada por NGF → TrkA → MAPK/PI3K)",
          "Alodinia: dolor por estímulo normalmente no doloroso (roce suave); ejemplo: piel quemada por sol duele al tacto ligero"
        ]
      },
      {
        titulo: "📡 Vías Ascendentes del Dolor",
        tipo: "tabla",
        datos: [
          { label: "1ª neurona (aferente primaria)", value: "Ganglio raíz dorsal (cuerpo celular); axón periférico (nociceptor) + axón central (asta dorsal médula)" },
          { label: "Asta dorsal médula", value: "Sinapsis en láminas I, II (sustancia gelatinosa), V; liberan glutamato (rápido, AMPA/NMDA) + sustancia P (lento, NK1); modulación local (opioides, GABA)" },
          { label: "2ª neurona (tracto espinotalámico)", value: "Decusa (cruza línea media) → tracto espinotalámico lateral (asciende contralateral); tracto espinotalámico anterior (tacto burdo, bilateral)" },
          { label: "Tálamo", value: "Núcleo ventral posterolateral (VPL); relevo → corteza; aspecto sensorial-discriminativo dolor (localización, intensidad)" },
          { label: "Corteza", value: "S1/S2 (somatosensorial): localización; ínsula, cingulado anterior: componente afectivo-emocional (sufrimiento, desagrado)" }
        ]
      },
      {
        titulo: "🧠 Modulación Descendente del Dolor",
        tipo: "lista",
        items: [
          "Sustancia gris periacueductal (PAG) → núcleo magno del rafe (NMR) → asta dorsal medular → inhibición transmisión nociceptiva",
          "Neurotransmisores inhibitorios: serotonina (5-HT), noradrenalina (NA), encefalinas/endorfinas (opioides endógenos)",
          "Mecanismo: activación interneuronas inhibitorias (GABA, glicina) en asta dorsal → ↓ liberación glutamato/sustancia P desde aferentes primarias",
          "Opioides: morfina, fentanilo activan receptores μ, δ, κ (acoplan Gi/o) → ↓ AMPc, ↑ K⁺ out (hiperpolarización), ↓ Ca²⁺ in (↓ liberación neurotransmisor)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Neuralgia post-herpética: infección VZV (varicela-zoster) → daño nervioso → sensibilización central, dolor neuropático crónico; tratamiento: gabapentina, pregabalina (↓ liberación glutamato), antidepresivos tricíclicos",
          "Síndrome dolor regional complejo (SDRC): trauma → dolor desproporcionado, alodinia, cambios tróficos (edema, temperatura, sudoración); tipo I (sin lesión nerviosa), tipo II (con lesión nerviosa identificable)",
          "Fibromialgia: sensibilización central → dolor difuso crónico, fatiga, trastornos sueño; ↓ umbrales dolor (wind-up), ↓ inhibición descendente; tratamiento: duloxetina (IRSN), pregabalina, ejercicio",
          "Analgesia controlada por paciente (PCA): morfina IV auto-administrada → mejor control dolor post-operatorio, ↓ dosis total (dosificación preventiva vs reactiva)"
        ]
      }
    ]
  },
  {
    id: "dolor-visceral",
    nombre: "Dolor Visceral",
    subtitulo: "Características y mecanismos del dolor de órganos internos",
    icono: "🫀",
    categorias: ["dolor", "visceras"],
    secciones: [
      {
        titulo: "🔬 Características del Dolor Visceral",
        tipo: "lista",
        items: [
          "Mal localizado (difuso, vago): baja densidad nociceptores viscerales, convergencia víscero-somática (misma neurona asta dorsal recibe aferencias viscerales + somáticas)",
          "Referido: percibido en área somática distante inervada por mismo segmento espinal (ej: IAM → dolor hombro/brazo izquierdo, colecistitis → escápula derecha)",
          "Desencadenantes específicos: distensión (obstrucción, íleo), isquemia (angina, isquemia mesentérica), inflamación (apendicitis, peritonitis), tracción mesentérica",
          "Vísceras insensibles a: corte, quemadura, aplastamiento (cirugía intestinal sin dolor si no hay distensión/tracción); altamente sensibles a distensión rápida"
        ]
      },
      {
        titulo: "⚙️ Aferentes Viscerales",
        tipo: "tabla",
        datos: [
          { label: "Fibras C viscerales", value: "Mayormente amielínicas; acompañan nervios autonómicos (simpáticos, parasimpáticos); conducción lenta → dolor difuso, profundo" },
          { label: "Vía simpática", value: "Vísceras toracoabdominales (corazón, pulmón, esófago, estómago, intestino delgado, riñón, uréter); ganglios T1-L2 → cadena simpática → nervio esplácnico → médula espinal" },
          { label: "Vía parasimpática (vago)", value: "Vísceras torácicas superiores, abdomen superior; núcleo tracto solitario (tronco cerebral); rol menor en dolor (más regulación homeostática)" },
          { label: "Nervios pélvicos (parasimpáticos)", value: "Colon descendente, recto, vejiga, útero, próstata; S2-S4 → médula sacra; dolor pélvico (cistitis, dismenorrea)" }
        ]
      },
      {
        titulo: "📍 Patrones de Dolor Referido",
        tipo: "tabla",
        datos: [
          { label: "Corazón (C8-T4)", value: "Dolor precordial (anginoso) → irradiación hombro, brazo, mandíbula izquierda; mujeres: epigastrio, espalda, náuseas (presentación atípica)" },
          { label: "Diafragma (C3-C5)", value: "Irritación diafragmática (peritonitis, sangrado subdiafragmático) → dolor hombro ipsilateral (nervio frénico C3-C5)" },
          { label: "Vesícula biliar (T7-T9)", value: "Cólico biliar → dolor hipocondrio derecho → escápula/ángulo inferior escápula derecha (signo Murphy)" },
          { label: "Páncreas (T6-T10)", value: "Pancreatitis → dolor epigástrico en barra/cinturón → espalda (retroperitoneal); alivia inclinarse hacia adelante" },
          { label: "Uréter (T10-L1)", value: "Cólico renal (litiasis) → dolor flanco → ingle ipsilateral, genitales; inquietud psicomotora (vs peritonitis: quieto)" },
          { label: "Apéndice (T10 inicial, luego parietal)", value: "Apendicitis temprana: dolor periumbilical difuso (T10, visceral) → migra a fosa ilíaca derecha (parietal, irritación peritoneo)" }
        ]
      },
      {
        titulo: "🔥 Dolor Somático Parietal vs Visceral",
        tipo: "tabla",
        datos: [
          { label: "Somático parietal", value: "Peritoneum parietal, pleura parietal, pericardio parietal; bien localizado, agudo, intenso; exacerbado movimiento; signos peritoneales (defensa, rebote)" },
          { label: "Visceral puro", value: "Órganos huecos, cápsulas; difuso, sordo, profundo; náuseas, diaforesis, palidez (respuesta autonómica); paciente inquieto" },
          { label: "Irritación peritoneal", value: "Inflamación alcanza peritoneum parietal → cambio dolor: difuso → localizado; rigidez muscular (defensa voluntaria/involuntaria), rebote (Blumberg)" },
          { label: "Dolor mixto", value: "Apendicitis evolucionada, colecistitis, pancreatitis: inicio visceral → progresa parietal; ayuda localizar lesión" }
        ]
      },
      {
        titulo: "⚠️ Distensión: Principal Estímulo Visceral",
        tipo: "lista",
        items: [
          "Órganos huecos (intestino, uréter, vesícula, útero) tienen mecanorreceptores en capa muscular detectan estiramiento",
          "Distensión lenta (gradual): tolerada, poco dolor; distensión rápida/intensa: dolor severo (↑ frecuencia descarga nociceptores)",
          "Obstrucción intestinal: peristalsis contra obstrucción → distensión segmento proximal → dolor cólico (intermitente, ondulante, coincide con ondas peristálticas)",
          "Cólico biliar/renal: obstrucción aguda → contracción músculo liso contra resistencia → dolor severo tipo cólico (puede llegar a ser continuo si obstrucción completa)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Apendicitis aguda: evolución típica dolor visceral (periumbilical) → parietal (FID); pérdida apetito, fiebre baja, leucocitosis; signo Rovsing (dolor FID al palpar FII), signo psoas, signo obturador",
          "Isquemia mesentérica aguda: 'dolor fuera de proporción a hallazgos físicos'; inicio súbito, dolor periumbilical severo, abdomen blando (inicialmente); acidosis láctica, leucocitosis; mortalidad >60% si tardío",
          "Perforación víscera hueca: dolor súbito, intenso, difuso; rigidez abdominal (vientre en tabla), ausencia ruidos intestinales; neumoperitoneo (aire bajo diafragma en Rx); peritonitis química (ácido gástrico) o bacteriana",
          "Síndrome intestino irritable (SII): hipersensibilidad visceral (↓ umbral distensión) + dismotilidad; dolor abdominal recurrente alivia con defecación, cambio patrón deposiciones; sin alarma (sangrado, pérdida peso, anemia)"
        ]
      }
    ]
  },
  {
    id: "obstruccion-intestinal",
    nombre: "Obstrucción Intestinal",
    subtitulo: "Patofisiología de la obstrucción mecánica e íleo funcional",
    icono: "🚫",
    categorias: ["obstruccion", "intestino"],
    secciones: [
      {
        titulo: "📊 Clasificación",
        tipo: "tabla",
        datos: [
          { label: "Obstrucción mecánica", value: "Barrera física impide tránsito intestinal; causas: adherencias (60-75%, cirugía previa), hernias (15-20%), tumores, vólvulo, íleo biliar, invaginación, cuerpos extraños" },
          { label: "Obstrucción simple", value: "Un punto obstrucción, flujo sanguíneo preservado; evolución: distensión proximal, deshidratación, desequilibrio electrolítico; raramente estrangulación si no progresa" },
          { label: "Obstrucción estrangulada", value: "Compromiso vascular (arteria, vena); vólvulo, hernia incarcerada; isquemia → necrosis → perforación; emergencia quirúrgica (mortalidad 8-35% vs <5% simple)" },
          { label: "Íleo funcional (adinámico)", value: "Ausencia peristalsis sin obstrucción mecánica; causas: post-operatorio (manipulación intestinal), peritonitis, hipokalemia, opioides, neuropatía diabética" }
        ]
      },
      {
        titulo: "⚙️ Fisiopatología Obstrucción Mecánica",
        tipo: "lista",
        items: [
          "DISTENSIÓN PROXIMAL: acumulación gas (70% aire deglutido, 30% producción bacteriana CO₂, H₂, CH₄) + secreciones GI (6-8 L/día); intestino distendido → ↓ absorción, ↑ secreción",
          "PÉRDIDAS HIDROELECTROLÍTICAS: secuestro líquidos (tercer espacio), vómitos; deshidratación, hipovolemia, ↓ perfusión renal → azoemia pre-renal",
          "DESEQUILIBRIO ÁCIDO-BASE: vómitos gástricos → alcalosis metabólica hipoclorémica (pérdida HCl, H⁺); obstrucción baja → pérdida bicarbonato intestinal → acidosis metabólica",
          "TRANSLOCACIÓN BACTERIANA: distensión + edema pared → ↑ permeabilidad → bacterias/toxinas atraviesan mucosa → bacteriemia, sepsis (especialmente si estrangulación)"
        ]
      },
      {
        titulo: "🔥 Estrangulación Vascular",
        tipo: "tabla",
        datos: [
          { label: "Secuencia isquémica", value: "Compresión venosa → estasis, edema, congestión → compresión arterial → isquemia → necrosis (6-8h); mucosa más vulnerable (primera en necrosarse)" },
          { label: "Signos estrangulación", value: "Dolor continuo intenso (vs cólico), fiebre, taquicardia desproporcionada, dolor localizado persistente, sangre oculta heces, leucocitosis >15,000, acidosis metabólica (lactato)" },
          { label: "Cambios isquémicos pared", value: "Edema → hemorragia transmural → gangrena → perforación; liberación mediadores inflamatorios → SIRS, shock" },
          { label: "Reperfusión", value: "Restauración flujo genera ROS → daño adicional (paradoja reperfusión); liberación potasio, mioglobina, citocinas → arritmias, insuficiencia renal, MODS" }
        ]
      },
      {
        titulo: "📐 Vólvulo",
        tipo: "lista",
        items: [
          "Rotación segmento intestinal sobre su mesenterio → obstrucción asa cerrada + estrangulación vascular",
          "VÓLVULO SIGMOIDE: más común (60-80%); pacientes añosos, estreñimiento crónico, megacolon; riesgo alto gangrena; Rx: dilatación sigmoidea masiva ('grano café'), descompresión endoscópica urgente",
          "VÓLVULO CIEGO: 20-30%; rotación alrededor eje longitudinal o antimesentérico; Rx: dilatación ciego (cuadrante superior derecho); tratamiento: cecostomía/resección",
          "VÓLVULO INTESTINO MEDIO (neonatos): malrotación intestinal → vólvulo alrededor arteria mesentérica superior → isquemia intestino medio → catástrofe (síndrome Ladd)"
        ]
      },
      {
        titulo: "🧪 Íleo Funcional",
        tipo: "tabla",
        datos: [
          { label: "Íleo post-operatorio", value: "Duración normal: intestino delgado 24h, estómago 24-48h, colon 48-72h; prolongado >5 días = íleo paralítico; factores: manipulación intestinal, opioides, balance fluidos, electrolitos" },
          { label: "Mecanismos", value: "Inhibición refleja neural (aferentes simpáticos), inflamación (citocinas), disfunción músculo liso, alteración células marcapasos (células intersticiales Cajal)" },
          { label: "Íleo metabólico", value: "Hipokalemia (<3 mEq/L), hipomagnesemia, hipocalcemia, uremia; corregir electrolitos restaura motilidad" },
          { label: "Prevención/manejo", value: "Movilización precoz, minimizar opioides (anestesia epidural, AINEs), goma mascar (estimula nervio vago), evitar sobrecarga líquidos, alvimopan (antagonista opioide periférico)" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Obstrucción adherencias: antecedente cirugía abdominal; dolor cólico, distensión, vómitos, ausencia deposiciones/gases; Rx: niveles hidroaéreos, asas dilatadas; manejo inicial conservador (NPO, SNG, fluidos), cirugía si no resuelve 48-72h o estrangulación",
          "Hernia incarcerada: masa inguinal/femoral/umbilical dolorosa, no reductible; riesgo estrangulación; signo Howship-Romberg (dolor cara interna muslo, hernia obturatriz comprime nervio obturador); cirugía urgente",
          "Íleo biliar: cálculo >2.5 cm erode vesícula → fístula colecistoduodenal → impacta íleon terminal (sitio más estrecho); Rx: neumatosis biliar (aire vía biliar), nivel hidroaéreo, cálculo ectópico (tríada Rigler); resección segmento + extracción cálculo",
          "Síndrome Ogilvie (pseudo-obstrucción colónica aguda): dilatación colónica masiva sin obstrucción mecánica; pacientes hospitalizados, post-op, enfermos crónicos; riesgo perforación si ciego >12 cm; descompresión colonoscópica, neostigmina"
        ]
      }
    ]
  },
  {
    id: "isquemia-tisular",
    nombre: "Isquemia Tisular y Daño Celular",
    subtitulo: "Consecuencias de la hipoperfusión y deprivación de oxígeno",
    icono: "💔",
    categorias: ["isquemia", "hipoxia"],
    secciones: [
      {
        titulo: "🔬 Definiciones",
        tipo: "tabla",
        datos: [
          { label: "Hipoxia", value: "↓ oxígeno tisular por cualquier causa: hipoxémica (↓ PaO2), anémica (↓ Hb), histotóxica (envenenamiento cianuro), isquémica (↓ flujo)" },
          { label: "Isquemia", value: "↓ flujo sanguíneo → hipoxia + déficit nutrientes + acumulación metabolitos; más dañina que hipoxia pura (la sangre remueve CO2, H+, lactato)" },
          { label: "Infarto", value: "Necrosis tisular por isquemia; causas: oclusión arterial (trombo, émbolo, vasoespasmo), obstrucción venosa (menos común), hipoperfusión sistémica (shock)" },
          { label: "Tiempo crítico", value: "Varía según tejido: cerebro 3-5 min, corazón 20-40 min, riñón 1-2 h, músculo esquelético 4-6 h; relacionado con demanda metabólica y capacidad anaeróbica" }
        ]
      },
      {
        titulo: "⚙️ Cascada de Eventos Isquemia → Necrosis",
        tipo: "lista",
        items: [
          "MINUTOS (0-5): ↓ O2 → cambio metabolismo aeróbico a anaeróbico → ↓ ATP (de ~5 mM a <1 mM); glucólisis anaeróbica → lactato, acidosis (pH <6.5)",
          "MINUTOS (5-30): fallo bomba Na+/K+-ATPasa → ↑ Na+/H2O intracelular (edema celular, tumefacción), ↑ K+ extracelular; pérdida gradientes → despolarización membrana",
          "MINUTOS-HORAS: ↑ Ca2+ intracelular (fallo bombas, liberación RE) → activación enzimas destructivas: fosfolipasas (membrana), proteasas (calpaínas), endonucleasas (DNA)",
          "HORAS: disfunción mitocondrial irreversible (apertura MPTP), daño masivo membrana (peroxidación lipídica), pérdida integridad celular → NECROSIS"
        ]
      },
      {
        titulo: "🔥 Lesión por Reperfusión",
        tipo: "tabla",
        datos: [
          { label: "Paradoja O2", value: "Restauración flujo (necesaria) genera ROS masivo: O2 + xantina oxidasa (↑ en isquemia) → O2⁻ → H2O2 → •OH (radical hidroxilo, altamente reactivo)" },
          { label: "Activación neutrófilos", value: "Reperfusión → activación complemento, expresión selectinas/integrinas endotelio → reclutamiento neutrófilos → estallido respiratorio, degranulación → daño adicional" },
          { label: "No-reflow", value: "Isquemia prolongada → edema células endoteliales, agregación plaquetas/leucocitos, microtrombos → obstrucción microcirculación persiste post-reperfusión" },
          { label: "Arritmias reperfusión", value: "↑ K+ extracelular (washout desde tejido isquémico) + ROS → alteraciones electrofisiológicas → fibrilación ventricular (primera causa muerte post-ICP)" }
        ]
      },
      {
        titulo: "🧬 Vulnerabilidad Diferencial",
        tipo: "tabla",
        datos: [
          { label: "Cerebro", value: "Extremadamente sensible (3-5 min); neuronas CA1 hipocampo, células Purkinje cerebelares más vulnerables; daño irreversible rápido" },
          { label: "Corazón", value: "Subendocardio más vulnerable (mayor distancia perfusión, ↑ tensión pared); necrosis coagulativa, fibrosis cicatricial (no regeneración cardiomiocitos adultos)" },
          { label: "Riñón", value: "Médula renal (baja PO2 basal, alta actividad metabólica) y segmento S3 túbulo proximal más sensibles; necrosis tubular aguda (NTA) → insuficiencia renal aguda" },
          { label: "Hígado", value: "Zona 3 (centrolobulillar, alrededor vena central) más vulnerable (último en recibir sangre oxigenada); esteatosis, necrosis centrolobulillar (shock, ICC derecha)" },
          { label: "Intestino", value: "Mucosa (villi) más vulnerable que serosa; isquemia transmural (todas capas) → perforación, peritonitis" }
        ]
      },
      {
        titulo: "💊 Estrategias Protección Isquémica",
        tipo: "lista",
        items: [
          "PRECONDICIONAMIENTO ISQUÉMICO: episodios isquemia breve repetidos antes evento isquémico prolongado → ↑ resistencia (adenosina, óxido nítrico, canales K-ATP); usado cirugía cardíaca",
          "POST-CONDICIONAMIENTO: reperfusión intermitente (breves oclusiones/reperfusiones) inmediatamente post-isquemia → ↓ daño reperfusión; en ICP primaria post-IAM",
          "HIPOTERMIA TERAPÉUTICA: ↓ temperatura corporal 32-34°C → ↓ metabolismo cerebral, ↓ liberación glutamato, ↓ edema; post-paro cardíaco, neonato asfixia",
          "ANTIOXIDANTES/SCAVENGERS ROS: N-acetilcisteína, alopurinol (inhibe xantina oxidasa), SOD, vitamina E; eficacia clínica limitada (estudios mixtos)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Síndrome isquemia-reperfusión post-trasplante: órgano sólido (riñón, hígado, pulmón) sufre isquemia fría → reperfusión → ROS, infiltrado inflamatorio → disfunción primaria injerto; minimizar tiempo isquemia, preservación órgano (solución Wisconsin)",
          "Síndrome compartimental: trauma, quemaduras, reperfusión post-isquemia → edema muscular en compartimento cerrado (fascia no distensible) → ↑ presión (>30 mmHg) → colapso venular → isquemia → necrosis muscular, nerviosa; fasciotomía urgente",
          "Fenómeno no-reflow cerebral: ACV isquémico, reperfusión tardía (>6h) → edema, microtrombos → perfusión no restaurada a pesar recanalizar arteria grande; limita ventana terapéutica trombólisis (3-4.5h), trombectomía (6-24h según colaterales)",
          "Rabdomiólisis: necrosis muscular masiva (trauma, isquemia, ejercicio extremo, estatinas, tóxicos) → liberación mioglobina, K+, fosfato, ácidos nucleicos → insuficiencia renal aguda (obstrucción tubular mioglobina, nefrotoxicidad), hiperpotasemia, CID"
        ]
      }
    ]
  },
  {
    id: "dolor-isquemico",
    nombre: "Dolor Isquémico",
    subtitulo: "Mecanismos del dolor por deprivación de oxígeno",
    icono: "💥",
    categorias: ["dolor", "isquemia"],
    secciones: [
      {
        titulo: "🔬 Mecanismos Generación Dolor Isquémico",
        tipo: "lista",
        items: [
          "ACIDOSIS: metabolismo anaeróbico → lactato, H+ → pH <6.5 → activación ASIC (canales activados ácido) y TRPV1 en nociceptores",
          "MEDIADORES INFLAMATORIOS: células dañadas liberan ATP (P2X3), bradicinina, prostaglandinas (PGE2, COX-2), sustancia P → sensibilización nociceptores",
          "POTASIO: ↑ K+ extracelular (4 → 8-12 mM) por fallo bomba Na+/K+ → despolarización nociceptores → ↑ excitabilidad",
          "ADENOSINA: degradación ATP → adenosina; receptor A1 (nociceptores) → dolor; receptor A2A (vasodilatación, cardioprotección)"
        ]
      },
      {
        titulo: "💔 Angina de Pecho",
        tipo: "tabla",
        datos: [
          { label: "Angina estable (esfuerzo)", value: "Estenosis coronaria fija (>70%); dolor precordial opresivo esfuerzo/estrés, alivio reposo/nitroglicerina (<5 min); isquemia transitoria sin necrosis; manejo: antiangina (nitratos, β-bloq, CCB), revascularización (PCI, CABG)" },
          { label: "Angina inestable", value: "Ruptura placa vulnerable, trombo no-oclusivo; dolor reposo/mínimo esfuerzo, nuevo inicio, patrón creciente; síndrome coronario agudo (SCA); troponinas normales (vs IAM); riesgo inminente infarto; antiagregación urgente, angiografía" },
          { label: "Angina variante (Prinzmetal)", value: "Vasoespasmo coronaria (sin obstrucción fija significativa); dolor reposo (típicamente nocturno/madrugada), elevación transitoria ST (vs depresión ST típica); asociado tabaco, cocaína, trastornos autoinmunes; tratamiento: nitratos, CCB (NO β-bloqueadores)" },
          { label: "Equivalentes anginosos", value: "Síntomas isquemia sin dolor torácico: disnea, fatiga extrema, náuseas; más común diabéticos (neuropatía), ancianos, mujeres" }
        ]
      },
      {
        titulo: "🔥 Infarto Agudo de Miocardio (IAM)",
        tipo: "lista",
        items: [
          "PRESENTACIÓN CLÍNICA: dolor torácico opresivo/constrictivo severo (>20 min), irradiación brazo/mandíbula izquierda, diaforesis, náuseas, disnea; NO alivia nitroglicerina/reposo",
          "STEMI (elevación ST): oclusión coronaria completa (trombo); elevación ST ≥1 mm en 2 derivadas contiguas; necrosis transmural; reperfusión urgente (<90 min puerta-balón ICP primaria o <30 min puerta-aguja fibrinólisis)",
          "NSTEMI (sin elevación ST): trombo suboclusivo, necrosis subendocárdica; depresión ST, inversión T; troponinas elevadas; estratificación riesgo (GRACE, TIMI), angiografía 24-72h",
          "COMPLICACIONES: arritmias (FV primeras 48h), insuficiencia cardíaca (necrosis extensa, choque cardiogénico), ruptura mecánica (pared libre, septum, músculo papilar), pericarditis (síndrome Dressler)"
        ]
      },
      {
        titulo: "🌀 Isquemia Mesentérica",
        tipo: "tabla",
        datos: [
          { label: "Isquemia mesentérica aguda", value: "Oclusión arteria mesentérica superior (émbolo 50%, trombosis 25%, no-oclusiva 20%); dolor periumbilical severo desprop", value: "orcionado a hallazgos físicos; 'intestino vacío se vacía' (diarrea sanguinolenta); acidosis láctica, leucocitosis; angio-TC; mortalidad 60-80% si tardío" },
          { label: "Angina intestinal (crónica)", value: "Aterosclerosis mesentérica; dolor post-prandial (30-60 min, 'miedo a comer'), pérdida peso (evitan comer); requiere estenosis ≥2 de 3 arterias mesentéricas (SMA, celíaca, IMA); revascularización (bypass, stent)" },
          { label: "Colitis isquémica", value: "Hipoperfusión transitoria colon (zonas 'watershed': flexura esplénica, unión rectosigmoidea); dolor cólico, hematoquezia, diarrea; autolimitada mayoría; colonoscopia: mucosa edematosa, ulcerada" },
          { label: "Trombosis venosa mesentérica", value: "Estados hipercoagulables, cirrosis (hipertensión portal), trauma; dolor abdominal difuso, distensión, ascitis; angio-TC: falta opacificación venas; anticoagulación" }
        ]
      },
      {
        titulo: "🦵 Enfermedad Arterial Periférica (EAP)",
        tipo: "lista",
        items: [
          "CLAUDICACIÓN INTERMITENTE: dolor muscular pierna (gemelar típicamente) con ejercicio, alivia reposo (<10 min); aterosclerosis arteria femoral/poplítea; distancia claudicación predecible",
          "ISQUEMIA CRÍTICA MIEMBROS: dolor reposo (especialmente nocturno, pies colgando alivia), úlceras isquémicas, gangrena; ITB <0.4, presión tobillo <50 mmHg; riesgo amputación/muerte",
          "ISQUEMIA AGUDA MIEMBROS (5 P's): Pain (dolor), Pallor (palidez), Pulselessness (ausencia pulsos), Paresthesias (parestesias), Paralysis (parálisis); causa: émbolo (fibrilación auricular), trombosis in situ; emergencia vascular (revascularización <6h)",
          "Índice tobillo-brazo (ITB): PAS tobillo / PAS brazo; normal 1.0-1.4; EAP <0.9; isquemia severa <0.5; ITB >1.4 sugiere calcificación arterial (diabetes, ERC)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Síndrome X cardíaco: angina típica, prueba esfuerzo positiva, coronariografía normal; disfunción microvascular (arteriolas); más común mujeres; pronóstico benigno; tratamiento: nitratos, CCB, ranolazina",
          "Takotsubo (miocardiopatía estrés): mimetiza IAM; dolor torácico, elevación ST, ↑ troponinas post-estrés emocional intenso; discinesia apical (aspecto pulpo japonés); coronarias normales; recuperación completa mayoría",
          "Oclusión arteria central retina: 'IAM ocular'; pérdida visión súbita indolora, monocular; isquemia retina; causa: émbolo carotídeo, arteritis células gigantes; ventana terapéutica estrecha (<90-100 min); masaje ocular, paracentesis cámara anterior, hiperbárico",
          "Síndrome robo subclavio: estenosis/oclusión arteria subclavia proximal; ejercicio brazo → flujo retrógrado arteria vertebral (suple brazo) → isquemia vertebrobasilar; síncope, vértigo, diplopía con ejercicio brazo"
        ]
      }
    ]
  },
  {
    id: "necrosis",
    nombre: "Necrosis: Muerte Celular Patológica",
    subtitulo: "Tipos, evolución y consecuencias de la necrosis tisular",
    icono: "☠️",
    categorias: ["muerte-celular", "isquemia"],
    secciones: [
      {
        titulo: "🔬 Necrosis vs Apoptosis",
        tipo: "tabla",
        datos: [
          { label: "Necrosis", value: "Muerte celular pasiva, no regulada; pérdida ATP, fallo homeostasis iónica; tumefacción, lisis; ruptura membrana → liberación contenido → INFLAMACIÓN" },
          { label: "Apoptosis", value: "Muerte celular programada, activa, regulada; requiere ATP; contracción, fragmentación DNA, cuerpos apoptóticos; SIN ruptura membrana (hasta final) → SIN inflamación (fagocitosis rápida)" },
          { label: "Morfología necrosis", value: "Células aumentadas tamaño, citoplasma eosinofílico (pérdida RNA), núcleo picnótico → cariorréxico → cariolítico; infiltrado inflamatorio (neutrófilos agudo)" },
          { label: "Causas necrosis", value: "Isquemia, toxinas, infecciones, trauma, temperaturas extremas; siempre patológica (vs apoptosis: fisiológica o patológica)" }
        ]
      },
      {
        titulo: "💥 Tipos de Necrosis (Revisión)",
        tipo: "tabla",
        datos: [
          { label: "Necrosis coagulativa", value: "Isquemia (excepto cerebro); arquitectura tisular preservada (horas-días); desnaturalización proteínas enzimáticas (bloquea autólisis); ej: infarto MI, renal, esplénico; eosinofilia, núcleos fantasma" },
          { label: "Necrosis licuefactiva", value: "Infección bacteriana, infarto cerebral; digestión enzimática completa → transformación líquida; neutrófilos (abscesos) o macrófagos (cerebro) liberan hidrolasas" },
          { label: "Necrosis caseosa", value: "Tuberculosis, hongos (histoplasma); apariencia queso blanco friable; granulomas con necrosis central; pérdida completa arquitectura; tinción Ziehl-Neelsen (BAAR)" },
          { label: "Necrosis grasa", value: "Pancreatitis aguda (lipasas), trauma mama/abdomen; saponificación (TG + lipasa → ácidos grasos + Ca²⁺ → jabones calcio); focos tiza blanquecinos" },
          { label: "Necrosis fibrinoide", value: "Vasculitis, HTA maligna; depósito fibrina + complejos inmunes en pared vascular; apariencia vidrio esmerilado rosado; cambios necróticos células musculares lisas" },
          { label: "Gangrena", value: "Necrosis coagulativa masiva + putrefacción bacteriana (húmeda) o desecación (seca); extremidades, intestino; seca: momificación; húmeda: licuefacción, gas (Clostridium), shock séptico" }
        ]
      },
      {
        titulo: "🔄 Evolución y Resolución Necrosis",
        tipo: "lista",
        items: [
          "FASE AGUDA (horas-días): infiltrado neutrofílico, edema, hiperemia; neutrófilos fagocitan debris, liberan enzimas → digestión parcial tejido necrótico",
          "FASE SUBAGUDA (días-semanas): reemplazo neutrófilos por macrófagos; fagocitosis debris, liberación factores crecimiento (PDGF, TGF-β, VEGF) → angiogénesis, proliferación fibroblastos",
          "FASE CRÓNICA (semanas-meses): formación tejido granulación (fibroblastos, capilares neoformados, macrófagos) → deposición colágeno → CICATRIZ fibrosa",
          "Resultado final: cicatriz (fibrosis), calcificación distrófica (depósito Ca²⁺ en tejido necrótico), encapsulamiento (granuloma, absceso crónico)"
        ]
      },
      {
        titulo: "💀 Calcificación Distrófica",
        tipo: "tabla",
        datos: [
          { label: "Definición", value: "Depósito calcio en tejido necrótico o dañado; Ca²⁺ sérico NORMAL (vs calcificación metastásica: hipercalcemia)" },
          { label: "Mecanismo", value: "Tejido necrótico libera fosfatos → precipitan con Ca²⁺; membrana células dañadas nuclean cristalización; pH alcalino local favorece" },
          { label: "Ejemplos", value: "Aterosclerosis (placas calcificadas), válvulas cardíacas (estenosis aórtica calcificada), necrosis caseosa (TB, nódulos calcificados Ghon), necrosis grasa pancreática" },
          { label: "Significado clínico", value: "Marca cicatrices antiguas; calcificaciones vasculares → rigidez arterial, HTA; calcificación valvular → estenosis; visible Rx (radiopacidad)" }
        ]
      },
      {
        titulo: "🧬 Necroptosis: Necrosis Programada",
        tipo: "lista",
        items: [
          "Forma muerte celular programada con morfología necrosis (vs apoptosis); requiere señalización activa (no pasiva como necrosis clásica)",
          "Vía: TNF-α → TNFR1 → (si caspasa-8 inhibida) → RIPK1/RIPK3 (quinasas) → MLKL (fosforilada) → poros membrana → entrada Na⁺/Ca²⁺ → tumefacción, lisis",
          "Funciones: defensa antiviral (virus inhiben apoptosis), inflamación (libera DAMPs como necrosis); patología: isquemia-reperfusión, NASH, neurodegeneración",
          "Inhibidores: necrostatina-1 (RIPK1), útil experimentalmente; potencial terapéutico enfermedades inflamatorias, IAM"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Gangrena gaseosa: infección Clostridium perfringens (Gram+ anaerobio); trauma penetrante, cirugía contaminada; toxinas (α-toxina: lecitinasa) → necrosis muscular masiva, crepitación (gas), shock; desbridamiento radical urgente, hiperbárico, penicilina + clindamicina",
          "Fasceítis necrotizante: infección tejidos blandos profundos (Streptococcus pyogenes, polimicrobiana); necrosis rápida fascia/músculo; dolor desproporcionado, crepitación, shock; LRINEC score; desbridamiento quirúrgico agresivo urgente, antibióticos amplios",
          "Necrosis avascular (osteonecrosis): isquemia ósea → necrosis; causas: trauma (fractura cuello fémur), corticoides, alcohol, anemia células falciformes, enfermedad descompresión; cabeza femoral, húmero más común; colapso articular, artrosis secundaria",
          "Pancreatitis necrotizante: 10-20% pancreatitis aguda; necrosis pancreática/peripancreática; colecciones necróticas (walled-off necrosis); infección secundaria (30%, mortalidad ↑↑); manejo conservador inicial, drenaje/necrosectomía si infectada/sintomática"
        ]
      }
    ]
  }
];
