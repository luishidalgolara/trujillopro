// ═══════════════════════════════════════════════════════════
// RESPIRACION-CELULAR-DATA.JS - Base de datos educativa
// ═══════════════════════════════════════════════════════════

const RESPIRACION_CELULAR_DATA = [
  {
    id: "glucolisis",
    nombre: "Glucólisis",
    subtitulo: "Vía citoplásmica de degradación de glucosa",
    icono: "🔥",
    categorias: ["anaerobico", "citoplasmico"],
    secciones: [
      {
        titulo: "📍 Localización y Características Generales",
        tipo: "lista",
        items: [
          "Ocurre en el citoplasma de todas las células (no requiere mitocondrias)",
          "Vía anaeróbica: no requiere oxígeno molecular",
          "Única fuente de ATP en eritrocitos (carecen de mitocondrias) y fuente principal en células con pocas mitocondrias",
          "Evolutivamente antigua: presente en prácticamente todos los organismos"
        ]
      },
      {
        titulo: "⚙️ Fases de la Glucólisis",
        tipo: "lista",
        items: [
          "FASE DE INVERSIÓN (pasos 1-5): consume 2 ATP, fosforila glucosa y la divide en dos triosas-fosfato (G3P)",
          "FASE DE BENEFICIO (pasos 6-10): genera 4 ATP (fosforilación a nivel de sustrato) y 2 NADH por oxidación de G3P",
          "Balance neto por glucosa: 2 ATP, 2 NADH, 2 piruvato",
          "Rendimiento energético bajo comparado con respiración aeróbica completa"
        ]
      },
      {
        titulo: "🧪 Reacciones Clave y Enzimas",
        tipo: "tabla",
        datos: [
          { label: "Paso 1: Hexoquinasa/Glucoquinasa", value: "Glucosa + ATP → Glucosa-6-P + ADP (irreversible, atrapamiento de glucosa)" },
          { label: "Paso 3: Fosfofructoquinasa-1 (PFK-1)", value: "Fructosa-6-P + ATP → Fructosa-1,6-bisfosfato (paso limitante, principal regulación)" },
          { label: "Paso 6: G3P deshidrogenasa", value: "G3P + NAD+ + Pi → 1,3-bifosfoglicerato + NADH (generación NADH)" },
          { label: "Paso 7: Fosfoglicerato quinasa", value: "1,3-BPG + ADP → 3-fosfoglicerato + ATP (fosforilación sustrato)" },
          { label: "Paso 10: Piruvato quinasa", value: "Fosfoenolpiruvato + ADP → Piruvato + ATP (irreversible, genera ATP)" }
        ]
      },
      {
        titulo: "⚖️ Regulación de la Glucólisis",
        tipo: "lista",
        items: [
          "PFK-1 (punto de control principal): INHIBIDA por ATP, citrato; ACTIVADA por AMP, fructosa-2,6-bisfosfato",
          "Hexoquinasa: inhibida por producto (glucosa-6-P); glucoquinasa hepática NO inhibida (permite almacenar glucógeno)",
          "Piruvato quinasa: inhibida por ATP, acetil-CoA, alanina; activada por fructosa-1,6-bisfosfato (feedforward)",
          "Regulación hormonal: insulina activa glucólisis (desfosforila PFK-2), glucagón la inhibe"
        ]
      },
      {
        titulo: "📊 Balance Energético",
        tipo: "tabla",
        datos: [
          { label: "ATP invertido", value: "2 ATP (pasos 1 y 3)" },
          { label: "ATP generado", value: "4 ATP (2 en paso 7, 2 en paso 10)" },
          { label: "NADH generado", value: "2 NADH (paso 6, × 2 porque hay 2 G3P)" },
          { label: "Balance neto", value: "2 ATP + 2 NADH + 2 Piruvato por glucosa" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Efecto Warburg: células cancerosas usan glucólisis aeróbica (alta tasa glucólisis incluso con O₂, base de PET-FDG)",
          "Deficiencia piruvato quinasa: anemia hemolítica hereditaria (eritrocitos dependen 100% de glucólisis)",
          "Hipoglucemia hiperinsulinémica: mutaciones glucoquinasa → umbral insulina bajo → hipoglucemia neonatal",
          "Acidosis láctica tipo A: hipoxia tisular → acumulación lactato (shock, insuficiencia cardíaca)"
        ]
      }
    ]
  },
  {
    id: "ciclo-krebs",
    nombre: "Ciclo de Krebs (Ciclo del Ácido Cítrico)",
    subtitulo: "Hub metabólico central en matriz mitocondrial",
    icono: "🔄",
    categorias: ["aerobico", "mitocondrial"],
    secciones: [
      {
        titulo: "📍 Localización y Función",
        tipo: "lista",
        items: [
          "Ocurre en la matriz mitocondrial (requiere mitocondrias funcionales)",
          "Vía aeróbica: depende indirectamente de O₂ (para reoxidar FADH₂ y NADH en cadena respiratoria)",
          "Funciones: oxidación completa acetil-CoA a CO₂, generación poder reductor (NADH, FADH₂), intermediarios biosintéticos",
          "Vía anfibólica: participa en catabolismo (degradación) y anabolismo (síntesis ácidos grasos, aminoácidos, hemo)"
        ]
      },
      {
        titulo: "🧬 Entrada al Ciclo: Complejo Piruvato Deshidrogenasa",
        tipo: "lista",
        items: [
          "Piruvato (del citoplasma) entra a mitocondria vía transportador",
          "Piruvato deshidrogenasa (PDH): Piruvato + CoA + NAD⁺ → Acetil-CoA + CO₂ + NADH (irreversible, descarboxilación oxidativa)",
          "PDH es complejo multienzimático (E1, E2, E3) con cofactores: TPP, lipoamida, CoA, FAD, NAD⁺",
          "Regulación PDH: INHIBIDA por acetil-CoA, NADH, ATP; ACTIVADA por Ca²⁺, ADP; inactivada por fosforilación (PDH quinasa)"
        ]
      },
      {
        titulo: "⚙️ Ocho Pasos del Ciclo de Krebs",
        tipo: "tabla",
        datos: [
          { label: "Paso 1: Citrato sintasa", value: "Acetil-CoA + Oxaloacetato → Citrato (condensación, irreversible)" },
          { label: "Paso 2-3: Aconitasa", value: "Citrato → Isocitrato (isomerización vía cis-aconitato)" },
          { label: "Paso 4: Isocitrato DH", value: "Isocitrato + NAD⁺ → α-cetoglutarato + CO₂ + NADH (descarboxilación oxidativa, regulada)" },
          { label: "Paso 5: α-cetoglutarato DH", value: "α-cetoglutarato + NAD⁺ + CoA → Succinil-CoA + CO₂ + NADH (similar a PDH)" },
          { label: "Paso 6: Succinil-CoA sintetasa", value: "Succinil-CoA + GDP/ADP → Succinato + GTP/ATP (fosforilación sustrato)" },
          { label: "Paso 7: Succinato DH", value: "Succinato + FAD → Fumarato + FADH₂ (enzima unida a membrana interna, Complejo II)" },
          { label: "Paso 8-9: Fumarasa, Malato DH", value: "Fumarato → Malato → Oxaloacetato + NADH (regenera aceptor acetil-CoA)" }
        ]
      },
      {
        titulo: "📊 Balance Energético por Acetil-CoA",
        tipo: "tabla",
        datos: [
          { label: "NADH generado", value: "3 NADH (pasos 4, 5, 9)" },
          { label: "FADH₂ generado", value: "1 FADH₂ (paso 7)" },
          { label: "GTP/ATP directo", value: "1 GTP (o ATP) (paso 6)" },
          { label: "CO₂ liberado", value: "2 CO₂ (pasos 4 y 5)" }
        ]
      },
      {
        titulo: "⚖️ Regulación del Ciclo",
        tipo: "lista",
        items: [
          "Isocitrato deshidrogenasa: ACTIVADA por ADP, Ca²⁺; INHIBIDA por ATP, NADH (sensor energético)",
          "α-cetoglutarato deshidrogenasa: INHIBIDA por succinil-CoA, NADH (inhibición producto)",
          "Citrato sintasa: inhibida por NADH, succinil-CoA, citrato (retroalimentación negativa)",
          "Disponibilidad sustratos: nivel acetil-CoA, NAD⁺/NADH, oxaloacetato modulan velocidad"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Deficiencia α-cetoglutarato DH: acidosis láctica congénita, retraso psicomotor (mutaciones subunidades E1, E2, E3)",
          "Deficiencia fumarasa: encefalopatía mitocondrial, policitemia (acumulación fumarato activa HIF, estimula eritropoyesis)",
          "Intoxicación arsenito: inhibe PDH y α-cetoglutarato DH (reacciona con grupos -SH de lipoamida)",
          "Deficiencia tiamina (B1): beri-beri, encefalopatía Wernicke (PDH y α-KGDH requieren TPP como cofactor)"
        ]
      }
    ]
  },
  {
    id: "cadena-respiratoria",
    nombre: "Cadena de Transporte de Electrones",
    subtitulo: "Generación de gradiente protónico en membrana interna mitocondrial",
    icono: "⚡",
    categorias: ["aerobico", "mitocondrial"],
    secciones: [
      {
        titulo: "📍 Localización y Componentes",
        tipo: "lista",
        items: [
          "Localizada en membrana interna mitocondrial (crestas mitocondriales)",
          "Compuesta por 4 complejos proteicos transmembrana (I, II, III, IV) + ATP sintasa (V)",
          "Transportadores móviles: Coenzima Q (ubiquinona, liposoluble) y citocromo c (soluble, espacio intermembrana)",
          "Acepta electrones de NADH (Complejo I) y FADH₂ (Complejo II), donante final: O₂"
        ]
      },
      {
        titulo: "⚙️ Complejos de la Cadena Respiratoria",
        tipo: "tabla",
        datos: [
          { label: "Complejo I (NADH-Q reductasa)", value: "NADH + H⁺ + Q → NAD⁺ + QH₂; bombea 4 H⁺ al espacio intermembrana (FMN, centros Fe-S)" },
          { label: "Complejo II (Succinato-Q reductasa)", value: "FADH₂ + Q → FAD + QH₂; NO bombea protones (también es succinato DH del Krebs)" },
          { label: "Complejo III (Citocromo bc₁)", value: "QH₂ + 2 Cit c (ox) → Q + 2 Cit c (red) + 4 H⁺ bombeados (ciclo Q, citocromos b, c₁)" },
          { label: "Complejo IV (Citocromo c oxidasa)", value: "4 Cit c (red) + O₂ + 8 H⁺ → 4 Cit c (ox) + 2 H₂O; bombea 4 H⁺ (citocromos a, a₃, Cu)" },
          { label: "Oxígeno (aceptor final)", value: "Reducción tetravalente: O₂ + 4e⁻ + 4H⁺ → 2 H₂O (previene formación ROS)" }
        ]
      },
      {
        titulo: "🔋 Gradiente Electroquímico de Protones",
        tipo: "lista",
        items: [
          "Bombeo protones (Complejos I, III, IV) → espacio intermembrana más ácido (pH ~6.5) que matriz (pH ~7.8)",
          "Gradiente de pH + potencial eléctrico (matriz negativa) = fuerza protón-motriz (ΔμH⁺ ≈ 220 mV)",
          "Por cada NADH: ~10 H⁺ bombeados; por FADH₂: ~6 H⁺ (entra después de Complejo I)",
          "Energía almacenada en gradiente usada por ATP sintasa para fosforilar ADP"
        ]
      },
      {
        titulo: "💊 Inhibidores Clásicos de la Cadena",
        tipo: "tabla",
        datos: [
          { label: "Rotenona, Amital", value: "Inhiben Complejo I (insecticidas, barbitúricos)" },
          { label: "Antimicina A", value: "Inhibe Complejo III (antibiótico, bloquea ciclo Q)" },
          { label: "Cianuro, CO, azida", value: "Inhiben Complejo IV (intoxicación por cianuro: hipoxia histotóxica)" },
          { label: "Oligomicina", value: "Inhibe ATP sintasa (bloquea canal Fo, detiene síntesis ATP y cadena)" }
        ]
      },
      {
        titulo: "🔬 Especies Reactivas de Oxígeno (ROS)",
        tipo: "lista",
        items: [
          "1-2% de O₂ forma superóxido (O₂⁻) en Complejos I y III por fuga de electrones",
          "Superóxido dismutasa (SOD): O₂⁻ → H₂O₂; catalasa/glutatión peroxidasa: H₂O₂ → H₂O",
          "ROS excesivas: daño oxidativo DNA, proteínas, lípidos → envejecimiento, enfermedades neurodegenerativas",
          "Balance ROS: señalización celular (bajas concentraciones) vs. estrés oxidativo (altas concentraciones)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Intoxicación cianuro: bloqueo Complejo IV → imposibilidad usar O₂ → acidosis láctica, muerte celular rápida (tratamiento: hidroxicobalamina, nitrito sódico)",
          "Neuropatía óptica hereditaria de Leber (LHON): mutaciones DNA mitocondrial en Complejo I → pérdida visión central",
          "MELAS (encefalomiopatía mitocondrial): mutaciones tRNA mitocondrial → disfunción cadena respiratoria → acidosis láctica, stroke-like episodes",
          "Síndrome Leigh: defectos genéticos múltiples complejos → encefalopatía necrotizante subaguda infantil"
        ]
      }
    ]
  },
  {
    id: "fosforilacion-oxidativa",
    nombre: "Fosforilación Oxidativa y ATP Sintasa",
    subtitulo: "Acoplamiento quimiosmótico para síntesis de ATP",
    icono: "⚙️",
    categorias: ["aerobico", "mitocondrial"],
    secciones: [
      {
        titulo: "🧬 Teoría Quimiosmótica (Peter Mitchell, 1961)",
        tipo: "lista",
        items: [
          "La energía de oxidación no se captura directamente como ATP, sino como gradiente de protones",
          "Gradiente electroquímico impulsa ATP sintasa (turbina molecular) para sintetizar ATP",
          "Acoplamiento flexible: cadena respiratoria y síntesis ATP están acopladas pero NO estequiométricamente fijas",
          "Permite regulación: control respiratorio (la velocidad depende de disponibilidad ADP)"
        ]
      },
      {
        titulo: "⚙️ Estructura de ATP Sintasa (Complejo V)",
        tipo: "tabla",
        datos: [
          { label: "Sector Fo (membrana)", value: "Canal de protones (subunidades a, b, c); rotación subunidad c por flujo H⁺" },
          { label: "Sector F1 (matriz)", value: "Complejo catalítico (α₃β₃γδε); sitios activos en subunidades β" },
          { label: "Mecanismo rotacional", value: "Flujo ~3-4 H⁺ rota γ 120° → cambio conformacional β → síntesis ATP" },
          { label: "Estequiometría aproximada", value: "~3-4 H⁺/ATP sintetizado (varía según organismo y condiciones)" }
        ]
      },
      {
        titulo: "📊 Rendimiento de ATP por Glucosa",
        tipo: "lista",
        items: [
          "GLUCÓLISIS: 2 ATP (neto sustrato) + 2 NADH citoplásmico",
          "CONVERSIÓN PIRUVATO: 2 NADH (por PDH, 1 por piruvato × 2)",
          "CICLO DE KREBS: 2 GTP + 6 NADH + 2 FADH₂ (por acetil-CoA × 2)",
          "FOSFORILACIÓN OXIDATIVA: NADH → ~2.5 ATP; FADH₂ → ~1.5 ATP (estimaciones modernas P/O ratio)",
          "TOTAL TEÓRICO: ~30-32 ATP por glucosa (depende de lanzaderas NADH citoplásmico, eficiencia sintasa)"
        ]
      },
      {
        titulo: "🔄 Lanzaderas de NADH Citoplásmico",
        tipo: "tabla",
        datos: [
          { label: "Lanzadera glicerol-3-fosfato", value: "Músculo, cerebro; NADH citoplásmico → FADH₂ mitocondrial (~1.5 ATP/NADH)" },
          { label: "Lanzadera malato-aspartato", value: "Hígado, corazón, riñón; NADH citoplásmico → NADH mitocondrial (~2.5 ATP/NADH)" },
          { label: "Diferencia rendimiento", value: "Por lanzadera usada, 2 NADH glucólisis → 3 o 5 ATP según tejido" }
        ]
      },
      {
        titulo: "🌡️ Desacoplamiento y Termogénesis",
        tipo: "lista",
        items: [
          "Proteínas desacopladoras (UCP): permiten reentrada H⁺ sin síntesis ATP → disipa energía como calor",
          "UCP1 (termogenina) en tejido adiposo marrón: esencial en neonatos, termorregulación en frío",
          "UCP2, UCP3: tejidos diversos, rol en regulación ROS, metabolismo (menor actividad que UCP1)",
          "Desacopladores químicos: DNP (2,4-dinitrofenol, tóxico), ácidos grasos libres (fisiológico)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Intoxicación DNP: usado como adelgazante (prohibido) → hipertermia maligna, muerte (desacoplamiento irreversible)",
          "Síndrome de Luft: mutación causa desacoplamiento parcial → hipermetabolismo, debilidad muscular, intolerancia calor (raro)",
          "Hipotermia neonatal: deficiencia grasa marrón o UCP1 → incapacidad termorregulación",
          "Oligomicina (investigación): bloquea ATP sintasa → acumulación gradiente, detiene cadena respiratoria (estado 4)"
        ]
      }
    ]
  },
  {
    id: "fermentacion",
    nombre: "Fermentación: Metabolismo Anaeróbico",
    subtitulo: "Regeneración de NAD⁺ sin cadena respiratoria",
    icono: "🧪",
    categorias: ["anaerobico", "citoplasmico"],
    secciones: [
      {
        titulo: "🎯 Función y Contextos Fisiológicos",
        tipo: "lista",
        items: [
          "Objetivo: reoxidar NADH a NAD⁺ para mantener glucólisis en ausencia de O₂",
          "Sin regeneración NAD⁺, glucólisis se detiene (consumiría todo el NAD⁺ disponible)",
          "Ocurre en: ejercicio intenso (músculo esquelético), eritrocitos, microorganismos anaeróbicos",
          "Rendimiento energético: solo 2 ATP/glucosa (de glucólisis, fermentación no genera ATP adicional)"
        ]
      },
      {
        titulo: "🥛 Fermentación Láctica",
        tipo: "tabla",
        datos: [
          { label: "Reacción", value: "Piruvato + NADH + H⁺ → Lactato + NAD⁺ (enzima: lactato deshidrogenasa, LDH)" },
          { label: "Isozimas LDH", value: "LDH-M₄ (músculo): favorece lactato; LDH-H₄ (corazón): favorece piruvato → acetil-CoA" },
          { label: "Contexto fisiológico", value: "Ejercicio anaeróbico intenso (>85% VO₂max), músculo produce lactato" },
          { label: "Destino lactato", value: "Transportado a hígado → gluconeogénesis (Ciclo de Cori), corazón/riñón → oxidación" }
        ]
      },
      {
        titulo: "🍺 Fermentación Alcohólica",
        tipo: "tabla",
        datos: [
          { label: "Reacción", value: "Piruvato → Acetaldehído + CO₂ (piruvato descarboxilasa); Acetaldehído + NADH → Etanol + NAD⁺ (alcohol DH)" },
          { label: "Organismos", value: "Levaduras (Saccharomyces cerevisiae), algunas bacterias" },
          { label: "Aplicaciones", value: "Producción cerveza, vino, pan (CO₂ fermenta masa)" },
          { label: "En humanos", value: "NO ocurre (carecemos de piruvato descarboxilasa)" }
        ]
      },
      {
        titulo: "⚖️ Ciclo de Cori",
        tipo: "lista",
        items: [
          "Músculo (ejercicio): glucosa → lactato (glucólisis anaeróbica)",
          "Lactato → sangre → hígado",
          "Hígado: lactato → piruvato (LDH reversa) → glucosa (gluconeogénesis)",
          "Glucosa → sangre → músculo (reciclaje, costo energético neto para hígado: 4 ATP consumidos en gluconeogénesis vs 2 ATP producidos en glucólisis muscular)"
        ]
      },
      {
        titulo: "📊 Acidosis Láctica",
        tipo: "lista",
        items: [
          "TIPO A (hipoxia tisular): shock, infarto, insuficiencia cardíaca/respiratoria, ejercicio extremo",
          "TIPO B (sin hipoxia): déficits metabólicos (deficiencia PDH, glucosa-6-fosfatasa), fármacos (metformina, nucleósidos análogos), cáncer, sepsis",
          "Manifestaciones: hiperventilación compensatoria, confusión, hipotensión, pH <7.35, lactato >4 mM",
          "Tratamiento: corregir causa subyacente, soporte hemodinámico; bicarbonato controvertido (puede empeorar paradójicamente)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Deficiencia LDH-A: miopatía por ejercicio (incapacidad músculo producir lactato → calambres, mioglobinuria)",
          "LDH elevada sérica: marcador daño tisular (infarto miocárdico, hemólisis, hepatopatía; isoenzimas ayudan localizar)",
          "Acidosis láctica asociada a metformina: rara pero grave en insuficiencia renal (metformina se acumula, inhibe Complejo I mitocondrial)",
          "Síndrome de Reye: disfunción mitocondrial (aspirina + virus) → hiperamonemia, hipoglucemia, acidosis láctica"
        ]
      }
    ]
  },
  {
    id: "balance-energetico",
    nombre: "Balance Energético Total",
    subtitulo: "Rendimiento de ATP y eficiencia metabólica",
    icono: "💰",
    categorias: ["aerobico", "anaerobico"],
    secciones: [
      {
        titulo: "📊 Rendimiento ATP: Respiración Aeróbica Completa",
        tipo: "tabla",
        datos: [
          { label: "Glucólisis", value: "2 ATP (sustrato) + 2 NADH" },
          { label: "Oxidación Piruvato", value: "2 NADH (1 por piruvato × 2)" },
          { label: "Ciclo de Krebs", value: "2 GTP + 6 NADH + 2 FADH₂ (acetil-CoA × 2)" },
          { label: "Cadena respiratoria", value: "10 NADH × 2.5 ATP = 25 ATP; 2 FADH₂ × 1.5 ATP = 3 ATP" },
          { label: "TOTAL (estimación moderna)", value: "~30-32 ATP/glucosa (vs. 38 en textos antiguos con P/O optimista)" }
        ]
      },
      {
        titulo: "🔬 Relación P/O (ATP/O₂)",
        tipo: "lista",
        items: [
          "Relación P/O clásica: NADH → 3 ATP, FADH₂ → 2 ATP (actualmente considerada sobrestimada)",
          "Relación P/O moderna: NADH → ~2.5 ATP, FADH₂ → ~1.5 ATP (basada en estequiometría H⁺/ATP sintasa más precisa)",
          "Variabilidad: eficiencia depende de 'fuga' de protones, transporte ADP/ATP, uso energético matriz",
          "Máximo teórico inalcanzable: ~38% eficiencia conversión energía glucosa → ATP (resto = calor)"
        ]
      },
      {
        titulo: "⚡ Comparación Aeróbico vs Anaeróbico",
        tipo: "tabla",
        datos: [
          { label: "Glucólisis anaeróbica", value: "2 ATP/glucosa (solo fosforilación sustrato)" },
          { label: "Respiración aeróbica", value: "~30-32 ATP/glucosa (glucólisis + Krebs + cadena)" },
          { label: "Eficiencia relativa", value: "Aeróbica es ~15-16× más eficiente" },
          { label: "Velocidad producción", value: "Anaeróbica más rápida (corto plazo), aeróbica sostenida (largo plazo)" }
        ]
      },
      {
        titulo: "🏃 Metabolismo Energético durante Ejercicio",
        tipo: "lista",
        items: [
          "0-10 seg: fosfocreatina (PCr + ADP → ATP + Cr, sistema inmediato, sin O₂)",
          "10 seg - 2 min: glucólisis anaeróbica (rápida pero limitada, acumulación lactato)",
          ">2 min: oxidación aeróbica (glucosa, ácidos grasos; eficiente, sostenida con O₂)",
          "Umbral anaeróbico: intensidad donde producción lactato > clearance (típicamente 50-85% VO₂max según entrenamiento)"
        ]
      },
      {
        titulo: "🧬 Sustratos Alternativos a Glucosa",
        tipo: "tabla",
        datos: [
          { label: "Ácidos grasos", value: "β-oxidación → acetil-CoA → Krebs; ~106 ATP/palmitato (C16), más eficiente por gramo" },
          { label: "Aminoácidos", value: "Desaminación → intermediarios glucogénicos/cetogénicos → glucosa o acetil-CoA" },
          { label: "Cuerpos cetónicos", value: "Acetoacetato, β-hidroxibutirato → acetil-CoA (cerebro en ayuno, ~22 ATP/acetoacetato)" },
          { label: "Glucógeno", value: "Glucosa-1-P → glucosa-6-P (ahorra 1 ATP vs glucosa libre)" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Diabetes mellitus: deficiencia insulina/resistencia → incapacidad células usar glucosa → hiperglucemia, cetoacidosis (tipo 1)",
          "Deficiencia glucosa-6-fosfato DH: anemia hemolítica por estrés oxidativo (eritrocitos dependen de vía pentosas para NADPH)",
          "Enfermedades mitocondriales: déficit cadena respiratoria → dependencia glucólisis → acidosis láctica, intolerancia ejercicio",
          "Hipoglucemia en ayuno prolongado: depleción glucógeno → gluconeogénesis; cerebro cambia a cuerpos cetónicos (adaptación)"
        ]
      }
    ]
  },
  {
    id: "regulacion-metabolica",
    nombre: "Regulación Metabólica Integrada",
    subtitulo: "Control hormonal y alostérico del metabolismo energético",
    icono: "🎛️",
    categorias: ["aerobico", "anaerobico"],
    secciones: [
      {
        titulo: "🧬 Puntos de Control Clave",
        tipo: "lista",
        items: [
          "GLUCÓLISIS: PFK-1 (paso limitante), hexoquinasa, piruvato quinasa",
          "GLUCONEOGÉNESIS: fructosa-1,6-bifosfatasa, PEPCK, glucosa-6-fosfatasa (hígado, riñón)",
          "CICLO DE KREBS: piruvato DH, isocitrato DH, α-cetoglutarato DH",
          "CADENA RESPIRATORIA: control respiratorio (disponibilidad ADP, estado 3 vs estado 4)"
        ]
      },
      {
        titulo: "💊 Regulación Hormonal",
        tipo: "tabla",
        datos: [
          { label: "Insulina (estado fed)", value: "↑ glucólisis, ↑ glucógeno síntesis, ↑ lipogénesis; desfosforila enzimas (activa PFK-2, piruvato DH)" },
          { label: "Glucagón (ayuno)", value: "↑ gluconeogénesis, ↑ glucogenólisis, ↑ β-oxidación; fosforila enzimas (inactiva PFK-2, piruvato DH)" },
          { label: "Epinefrina (estrés)", value: "↑ glucogenólisis muscular/hepática, ↑ glucólisis muscular, ↑ lipólisis (moviliza combustibles)" },
          { label: "Cortisol (ayuno prolongado)", value: "↑ gluconeogénesis, ↑ proteólisis (provee aminoácidos), efecto permisivo glucagón/epinefrina" }
        ]
      },
      {
        titulo: "⚖️ Regulación Alostérica",
        tipo: "lista",
        items: [
          "Sensores energéticos: ATP (inhibidor), AMP/ADP (activadores) → balance carga energética celular",
          "Productos finales: NADH, acetil-CoA, citrato inhiben vías que los producen (retroalimentación negativa)",
          "Intermediarios: fructosa-2,6-bisfosfato (F-2,6-BP) activa PFK-1, inhibe F-1,6-BPasa (control recíproco glucólisis/gluconeogénesis)",
          "Calcio: activa PDH, isocitrato DH, α-KGDH (señal contracción muscular/neuronal → ↑ demanda ATP)"
        ]
      },
      {
        titulo: "🔄 Control Recíproco Glucólisis/Gluconeogénesis",
        tipo: "tabla",
        datos: [
          { label: "F-2,6-BP (estado fed)", value: "Insulina → desfosforila PFK-2 → activa PFK-2 quinasa → ↑ F-2,6-BP → ↑ glucólisis" },
          { label: "Estado ayuno", value: "Glucagón → fosforila PFK-2 → activa F-2,6-BPasa → ↓ F-2,6-BP → ↓ glucólisis, ↑ gluconeogénesis" },
          { label: "Ciclo fútil", value: "Control previene ciclo simultáneo glucólisis-gluconeogénesis (desperdiciaría ATP)" },
          { label: "Segregación", value: "Hígado puede hacer ambas (según señal); músculo NO hace gluconeogénesis (carece glucosa-6-fosfatasa)" }
        ]
      },
      {
        titulo: "🌡️ Efecto Pasteur y Crabtree",
        tipo: "lista",
        items: [
          "EFECTO PASTEUR: O₂ inhibe glucólisis anaeróbica (respiración aeróbica más eficiente → menor necesidad glucosa)",
          "EFECTO CRABTREE: alta glucosa inhibe respiración (en levaduras, células tumorales; fermentación aeróbica)",
          "Efecto Warburg (cáncer): células tumorales prefieren glucólisis incluso con O₂ (ventaja: intermediarios biosíntesis rápida)",
          "Consecuencia clínica: PET-FDG detecta tumores por alta captación glucosa"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Diabetes tipo 2: resistencia insulina → gluconeogénesis hepática descontrolada → hiperglucemia en ayunas (metformina inhibe)",
          "Enfermedad von Gierke (glucogenosis tipo I): deficiencia glucosa-6-fosfatasa → hipoglucemia severa, hepatomegalia, acidosis láctica",
          "Deficiencia piruvato carboxilasa: imposibilidad gluconeogénesis → hipoglucemia, acidosis láctica, retraso desarrollo",
          "AMPK (AMP-activated protein kinase): sensor maestro energía, activado por ejercicio/metformina → ↑ oxidación, ↓ síntesis (diana terapéutica)"
        ]
      }
    ]
  },
  {
    id: "integracion-metabolica",
    nombre: "Integración Metabólica en Tejidos",
    subtitulo: "Especialización metabólica según función tisular",
    icono: "🧩",
    categorias: ["aerobico", "anaerobico"],
    secciones: [
      {
        titulo: "🧠 Metabolismo Cerebral",
        tipo: "lista",
        items: [
          "Depende casi exclusivamente de glucosa (~120 g/día, 25% del consumo corporal total)",
          "Metabolismo 100% aeróbico (alta densidad mitocondrial, capilares), NO almacena glucógeno significativo",
          "En ayuno prolongado (>3 días): adapta a cuerpos cetónicos (pueden proveer hasta 60-70% energía)",
          "Barrera hematoencefálica: GLUT1 transporta glucosa, lactato puede usarse en neuronas (astrocitos producen lactato)"
        ]
      },
      {
        titulo: "💪 Metabolismo Muscular",
        tipo: "tabla",
        datos: [
          { label: "Reposo", value: "Ácidos grasos (70-80% energía), glucosa, cuerpos cetónicos" },
          { label: "Ejercicio moderado", value: "Glucógeno muscular + ácidos grasos (oxidación aeróbica sostenida)" },
          { label: "Ejercicio intenso", value: "Glucólisis anaeróbica (glucógeno → lactato), fosfocreatina" },
          { label: "Recuperación", value: "Resintetiza glucógeno (glucosa sangre), oxida lactato, repara tejido" }
        ]
      },
      {
        titulo: "🏥 Metabolismo Hepático",
        tipo: "lista",
        items: [
          "Hub metabólico central: gluconeogénesis, glucogenogénesis/glucogenólisis, cetogénesis, síntesis urea",
          "Estado fed: almacena glucosa como glucógeno (hasta ~100 g), sintetiza ácidos grasos (lipogénesis de novo)",
          "Estado ayuno: libera glucosa (glucogenólisis primeras 12h, luego gluconeogénesis), produce cuerpos cetónicos",
          "Detoxificación: metaboliza lactato (Cori), amonio (ciclo urea), xenobióticos (citocromo P450)"
        ]
      },
      {
        titulo: "❤️ Metabolismo Cardíaco",
        tipo: "lista",
        items: [
          "Metabolismo 100% aeróbico, alta densidad mitocondrial (35% volumen cardiomiocito)",
          "Sustratos preferidos: ácidos grasos (60-70%), glucosa, lactato, cuerpos cetónicos (flexibilidad metabólica)",
          "NO almacena energía significativa, depende suministro continuo O₂ y sustratos",
          "Isquemia: cambio forzado a glucólisis anaeróbica (ineficiente) → disfunción contráctil rápida, necrosis si prolongada"
        ]
      },
      {
        titulo: "🩸 Metabolismo Eritrocitario",
        tipo: "lista",
        items: [
          "Carece de mitocondrias, núcleo, ribosomas → NO respiración aeróbica, NO síntesis proteica",
          "Glucólisis anaeróbica exclusiva: 2 ATP/glucosa (mantiene gradientes iónicos, forma)",
          "Vía pentosas fosfato: genera NADPH (glutatión reducido → protege contra oxidación hemoglobina)",
          "2,3-BPG: derivado glucólisis, disminuye afinidad O₂ hemoglobina (facilita liberación O₂ tejidos)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Infarto cerebral: neuronas mueren rápidamente sin glucosa/O₂ (minutos), ventana terapéutica estrecha",
          "Insuficiencia cardíaca: metabolismo cardíaco cambia hacia glucosa (menos eficiente) → círculo vicioso",
          "Rabdomiólisis: daño muscular masivo (trauma, estatinas, ejercicio extremo) → mioglobinuria, insuficiencia renal aguda",
          "Cetoacidosis diabética: déficit insulina absoluto → cetogénesis descontrolada → acidosis metabólica severa (tipo 1)"
        ]
      }
    ]
  }
];
