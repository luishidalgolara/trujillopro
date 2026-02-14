// ═══════════════════════════════════════════════════════════
// METABOLISMO-DATA.JS - Base de datos de rutas metabólicas
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const METABOLISMO_DATA = [
  {
    id: 'glucolisis',
    nombre: 'Glucólisis',
    subtitulo: 'Oxidación de glucosa a piruvato',
    icono: '🔥',
    categorias: ['catabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Citosol de todas las células',
          '<strong>Sustrato inicial:</strong> Glucosa (C₆H₁₂O₆)',
          '<strong>Producto final:</strong> 2 piruvato (condiciones aeróbicas) o 2 lactato (condiciones anaeróbicas)',
          '<strong>Balance energético neto:</strong> 2 ATP + 2 NADH por molécula de glucosa',
          '<strong>Tipo de vía:</strong> Secuencia de 10 reacciones enzimáticas',
          '<strong>Regulación:</strong> Control alostérico en hexoquinasa, fosfofructoquinasa-1 (PFK-1) y piruvato quinasa'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas clave y regulación',
        datos: [
          { label: 'Hexoquinasa', value: 'Fosforila glucosa → G6P. Inhibida por producto (G6P). Km baja, asegura captación constante de glucosa.' },
          { label: 'Fosfofructoquinasa-1', value: 'Paso limitante. Activada por AMP, ADP, F-2,6-BP. Inhibida por ATP, citrato. Principal punto de control.' },
          { label: 'Piruvato quinasa', value: 'Genera ATP. Activada por F-1,6-BP (feed-forward). Inhibida por ATP, alanina, acetil-CoA (hígado).' },
          { label: 'GAPDH', value: 'Gliceraldehído-3-fosfato deshidrogenasa. Genera NADH. Requiere NAD⁺ oxidado para continuar la vía.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Fases de la glucólisis',
        items: [
          '<strong>Fase de inversión (pasos 1-5):</strong> Consume 2 ATP. Fosforilación de glucosa y fragmentación en dos triosas fosfato (DHAP y G3P)',
          '<strong>Fase de beneficio (pasos 6-10):</strong> Genera 4 ATP y 2 NADH. Oxidación de G3P a piruvato con fosforilación a nivel de sustrato',
          '<strong>Reacciones irreversibles:</strong> Hexoquinasa (paso 1), PFK-1 (paso 3), piruvato quinasa (paso 10) - puntos de control metabólico',
          '<strong>Reacciones reversibles:</strong> Pueden ser revertidas en gluconeogénesis mediante enzimas específicas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Destinos del piruvato',
        items: [
          '<strong>Condiciones aeróbicas:</strong> Piruvato → Acetil-CoA (vía piruvato deshidrogenasa) → ingresa al ciclo de Krebs en mitocondria',
          '<strong>Condiciones anaeróbicas (músculo):</strong> Piruvato → Lactato (vía lactato deshidrogenasa). Regenera NAD⁺ para continuar glucólisis',
          '<strong>Fermentación (levaduras):</strong> Piruvato → Etanol + CO₂. Regenera NAD⁺ sin consumo de O₂',
          '<strong>Gluconeogénesis (hígado):</strong> Piruvato puede revertirse a glucosa en ayuno o ejercicio prolongado'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Deficiencia de piruvato quinasa:</strong> Anemia hemolítica no esferocítica hereditaria. Eritrocitos no generan suficiente ATP para mantener integridad de membrana',
          '<strong>Deficiencia de glucosa-6-fosfato deshidrogenasa (G6PD):</strong> Anemia hemolítica por estrés oxidativo. Afecta vía de pentosas fosfato, pero relacionada con metabolismo de G6P',
          '<strong>Efecto Warburg (cáncer):</strong> Células cancerosas aumentan glucólisis aeróbica incluso con O₂ disponible. Base de PET-scan con ¹⁸F-FDG',
          '<strong>Diabetes mellitus:</strong> Hiperglucemia por deficiencia de insulina o resistencia. Afecta captación de glucosa y actividad de hexoquinasa II',
          '<strong>Acidosis láctica:</strong> Acumulación de lactato por hipoxia tisular, sepsis o defectos en cadena respiratoria mitocondrial'
        ]
      }
    ]
  },
  {
    id: 'ciclo-krebs',
    nombre: 'Ciclo de Krebs',
    subtitulo: 'Ciclo del ácido cítrico / Ciclo de los ácidos tricarboxílicos',
    icono: '🔄',
    categorias: ['catabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Matriz mitocondrial (eucariotas) o citoplasma (procariotas)',
          '<strong>Función:</strong> Oxidación completa de acetil-CoA a CO₂ con generación de poder reductor (NADH, FADH₂)',
          '<strong>Balance por acetil-CoA:</strong> 3 NADH + 1 FADH₂ + 1 GTP (equivalente a ATP) + 2 CO₂',
          '<strong>Tipo de vía:</strong> Ciclo anfibólico (catabólico y anabólico)',
          '<strong>Intermediarios:</strong> 8 compuestos (citrato, isocitrato, α-cetoglutarato, succinil-CoA, succinato, fumarato, malato, oxaloacetato)',
          '<strong>Integración:</strong> Conecta glucólisis, β-oxidación de ácidos grasos y catabolismo de aminoácidos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas reguladoras',
        datos: [
          { label: 'Citrato sintasa', value: 'Condensa acetil-CoA + oxaloacetato → citrato. Inhibida por ATP, NADH, succinil-CoA, citrato. Activada por Ca²⁺ (músculo).' },
          { label: 'Isocitrato deshidrogenasa', value: 'Genera NADH + CO₂. Paso limitante principal. Activada por ADP, Ca²⁺. Inhibida por ATP, NADH.' },
          { label: 'α-cetoglutarato deshidrogenasa', value: 'Complejo multienzimático similar a piruvato DH. Genera NADH + CO₂ + succinil-CoA. Inhibida por NADH, succinil-CoA, ATP.' },
          { label: 'Succinato deshidrogenasa', value: 'Única enzima del ciclo embebida en membrana mitocondrial interna (Complejo II). Genera FADH₂. No es regulada alostéricamente.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Reacciones del ciclo',
        items: [
          '<strong>Paso 1 (Citrato sintasa):</strong> Acetil-CoA (2C) + Oxaloacetato (4C) → Citrato (6C) + CoA-SH. Reacción irreversible, altamente exergónica',
          '<strong>Pasos 2-3:</strong> Citrato → Isocitrato (isomerización). Isocitrato → α-cetoglutarato + NADH + CO₂ (oxidación descarboxilante)',
          '<strong>Paso 4:</strong> α-cetoglutarato (5C) → Succinil-CoA (4C) + NADH + CO₂. Complejo multienzimático similar a piruvato DH',
          '<strong>Paso 5:</strong> Succinil-CoA → Succinato + GTP/ATP. Fosforilación a nivel de sustrato (único ATP directo del ciclo)',
          '<strong>Pasos 6-8:</strong> Succinato → Fumarato (genera FADH₂) → Malato → Oxaloacetato (genera NADH). Regenera aceptor de acetil-CoA',
          '<strong>Balance neto por vuelta:</strong> 1 acetil-CoA oxidado genera 3 NADH, 1 FADH₂, 1 GTP, 2 CO₂'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Funciones anabólicas',
        items: [
          '<strong>Biosíntesis de aminoácidos:</strong> α-cetoglutarato → glutamato/glutamina. Oxaloacetato → aspartato/asparagina',
          '<strong>Síntesis de hemo:</strong> Succinil-CoA + glicina → ácido δ-aminolevulínico (ALA), precursor de porfirinas',
          '<strong>Gluconeogénesis:</strong> Oxaloacetato → fosfoenolpiruvato (vía PEPCK) → glucosa en hígado y riñón',
          '<strong>Lipogénesis:</strong> Citrato exportado al citosol → acetil-CoA → síntesis de ácidos grasos y colesterol',
          '<strong>Reacciones anapleróticas:</strong> Piruvato carboxilasa (piruvato → oxaloacetato) repone intermediarios del ciclo consumidos en biosíntesis'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Deficiencia de fumarasa:</strong> Enfermedad autosómica recesiva rara. Acumulación de fumarato. Retraso del desarrollo, convulsiones, encefalopatía',
          '<strong>Paragangliomas/feocromocitomas hereditarios:</strong> Mutaciones en subunidades de succinato deshidrogenasa (SDH). Tumores neuroendocrinos por pseudohipoxia',
          '<strong>Síndrome de Leigh (encefalomielopatía necrotizante subaguda):</strong> Defectos en piruvato DH o componentes del ciclo. Neurodegeneración progresiva',
          '<strong>Acidurias orgánicas:</strong> Déficit de α-cetoglutarato DH, succinil-CoA sintetasa. Acidosis metabólica, encefalopatía, hiperamonemia',
          '<strong>Intoxicación por arsenito:</strong> Inhibe piruvato DH y α-cetoglutarato DH (requieren ácido lipoico). Bloquea ingreso al ciclo de Krebs'
        ]
      }
    ]
  },
  {
    id: 'cadena-respiratoria',
    nombre: 'Cadena de Transporte de Electrones',
    subtitulo: 'Fosforilación oxidativa mitocondrial',
    icono: '⚡',
    categorias: ['catabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Membrana mitocondrial interna (crestas mitocondriales)',
          '<strong>Función:</strong> Oxidación de NADH y FADH₂ con reducción de O₂ a H₂O. Genera gradiente de protones (fuerza protón-motriz)',
          '<strong>Componentes:</strong> 4 complejos proteicos (I, II, III, IV) + ubiquinona (CoQ) + citocromo c + ATP sintasa (Complejo V)',
          '<strong>Balance energético:</strong> 1 NADH → ~2.5 ATP, 1 FADH₂ → ~1.5 ATP (relación P/O moderna)',
          '<strong>Rendimiento total (glucosa):</strong> ~30-32 ATP por molécula de glucosa en condiciones fisiológicas',
          '<strong>Acoplamiento:</strong> Transferencia de electrones acoplada a síntesis de ATP vía gradiente electroquímico'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Complejos de la cadena respiratoria',
        datos: [
          { label: 'Complejo I (NADH-CoQ reductasa)', value: 'Transfiere e⁻ de NADH a ubiquinona. Bombea 4 H⁺ al espacio intermembrana. Contiene FMN y centros Fe-S. Inhibido por rotenona, piericidina A.' },
          { label: 'Complejo II (Succinato-CoQ reductasa)', value: 'Transfiere e⁻ de FADH₂ (succinato DH) a ubiquinona. NO bombea protones. Único complejo anclado a membrana del ciclo de Krebs. Inhibido por malonato.' },
          { label: 'Complejo III (CoQ-citocromo c reductasa)', value: 'Transfiere e⁻ de ubiquinol a citocromo c. Bombea 4 H⁺ vía ciclo Q. Contiene citocromos b y c₁, proteína Fe-S. Inhibido por antimicina A.' },
          { label: 'Complejo IV (Citocromo c oxidasa)', value: 'Transfiere e⁻ de citocromo c a O₂ → H₂O. Bombea 2 H⁺. Contiene citocromos a y a₃, centros Cu. Inhibido por cianuro, CO, azida.' },
          { label: 'Complejo V (ATP sintasa)', value: 'Aprovecha gradiente de H⁺ para fosforilar ADP → ATP. Compuesto por F₀ (canal) y F₁ (sitios catalíticos). Inhibido por oligomicina.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo de acoplamiento quimiosmótico',
        items: [
          '<strong>Hipótesis quimiosmótica (Peter Mitchell, 1961):</strong> Energía de oxidación genera gradiente electroquímico de protones (ΔpH + Δψ)',
          '<strong>Fuerza protón-motriz:</strong> Δp = Δψ - 2.3(RT/F)ΔpH ≈ 200-220 mV. Impulsa síntesis de ATP',
          '<strong>Relación H⁺/ATP:</strong> Se requieren ~3-4 H⁺ para sintetizar 1 ATP (incluyendo transporte de ATP al citosol)',
          '<strong>Desacoplamiento:</strong> Proteínas UCP permiten retorno de H⁺ sin ATP (termogénesis). UCP1 en tejido adiposo marrón',
          '<strong>Respiración basal vs fosforilante:</strong> Estado 4 (sin ADP, mínima) vs Estado 3 (con ADP, máxima). Control respiratorio por disponibilidad de ADP'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y eficiencia',
        items: [
          '<strong>Control por ADP:</strong> Aumento de ADP estimula respiración (Estado 3). Relación ATP/ADP controla velocidad de fosforilación oxidativa',
          '<strong>Inhibición por ATP:</strong> Exceso de ATP inhibe Complejo IV y ATP sintasa (retroalimentación negativa)',
          '<strong>Disponibilidad de O₂:</strong> Hipoxia limita aceptor final de electrones, reduce síntesis de ATP, activa HIF-1α (factor inducible por hipoxia)',
          '<strong>Relación P/O:</strong> Moles de ATP / átomos de O consumidos. NADH: ~2.5, FADH₂: ~1.5 (valores actualizados vs históricos 3 y 2)',
          '<strong>Eficiencia energética:</strong> ~40% de energía de oxidación se convierte en ATP. Resto se disipa como calor'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Enfermedades mitocondriales:</strong> Mutaciones en DNA mitocondrial (herencia materna) o nuclear. Afectan músculos, cerebro, corazón (MELAS, MERRF, LHON)',
          '<strong>Neuropatía óptica hereditaria de Leber (LHON):</strong> Mutaciones en Complejo I. Pérdida bilateral aguda de visión central en adultos jóvenes',
          '<strong>Síndrome de Leigh (forma mitocondrial):</strong> Defectos en Complejos I, II, IV o ATP sintasa. Encefalopatía necrotizante subaguda',
          '<strong>Intoxicación por cianuro/CO:</strong> Bloqueo de Complejo IV impide uso de O₂. Hipoxia citotóxica (nivel celular) con PaO₂ normal',
          '<strong>Síndrome de Luft:</strong> Primera enfermedad mitocondrial descrita. Desacoplamiento constitutivo, hipermetabolismo, hipertermia',
          '<strong>Farmacología:</strong> Metformina (diabetes) inhibe levemente Complejo I. Estatinas pueden causar miopatía mitocondrial en algunos pacientes'
        ]
      }
    ]
  },
  {
    id: 'gluconeogenesis',
    nombre: 'Gluconeogénesis',
    subtitulo: 'Síntesis de glucosa a partir de precursores no glucídicos',
    icono: '🔼',
    categorias: ['anabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Principalmente hígado (90%) y riñón (10%). Intestino en ayuno prolongado',
          '<strong>Función:</strong> Mantener glucemia durante ayuno (4-6 h tras última comida), ejercicio prolongado, dieta baja en carbohidratos',
          '<strong>Sustratos:</strong> Lactato (ciclo de Cori), aminoácidos glucogénicos (alanina, glutamina), glicerol, propionato',
          '<strong>Coste energético:</strong> 6 ATP por molécula de glucosa sintetizada (proceso endergónico)',
          '<strong>Regulación hormonal:</strong> Estimulada por glucagón, cortisol. Inhibida por insulina',
          '<strong>Relación con glucólisis:</strong> No es simple reversión. Utiliza 4 enzimas específicas para bypasear pasos irreversibles'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas exclusivas de gluconeogénesis',
        datos: [
          { label: 'Piruvato carboxilasa', value: 'Mitocondria. Piruvato + CO₂ + ATP → oxaloacetato. Activada por acetil-CoA (señal de exceso de grasas). Requiere biotina como cofactor.' },
          { label: 'PEPCK (fosfoenolpiruvato carboxiquinasa)', value: 'Oxaloacetato + GTP → fosfoenolpiruvato + CO₂. Isoforma citosólica (hígado) y mitocondrial (riñón). Inducida por glucagón/cortisol, reprimida por insulina.' },
          { label: 'Fructosa-1,6-bisfosfatasa', value: 'F-1,6-BP → F-6-P + Pi. Paso clave de regulación recíproca con PFK-1. Inhibida por AMP, F-2,6-BP. Activada por citrato, ATP.' },
          { label: 'Glucosa-6-fosfatasa', value: 'Retículo endoplasmático (hígado, riñón, intestino). G6P → glucosa + Pi. Ausente en músculo (no libera glucosa). Deficiencia: enfermedad de von Gierke (GSD tipo I).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Ciclos metabólicos integrados',
        items: [
          '<strong>Ciclo de Cori:</strong> Músculo (glucosa → lactato) → hígado (lactato → glucosa) → músculo. Redistribuye carga metabólica entre tejidos durante ejercicio',
          '<strong>Ciclo glucosa-alanina:</strong> Músculo cataboliza aminoácidos → alanina (transporta NH₃) → hígado (alanina → glucosa + urea) → músculo',
          '<strong>Integración con β-oxidación:</strong> Acetil-CoA de ácidos grasos activa piruvato carboxilasa, favorece gluconeogénesis en ayuno',
          '<strong>Ciclo de Randle (ciclo glucosa-ácidos grasos):</strong> Oxidación de ácidos grasos inhibe glucólisis, favorece gluconeogénesis en hígado',
          '<strong>Papel del glicerol:</strong> Liberado por lipólisis en tejido adiposo → hígado → gluconeogénesis (vía glicerol quinasa)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación coordinada',
        items: [
          '<strong>Fructosa-2,6-bisfosfato (F-2,6-BP):</strong> Regulador maestro. Activa PFK-1 (glucólisis), inhibe F-1,6-BPasa (gluconeogénesis). Controlado por PFK-2/FBPasa-2 bifuncional',
          '<strong>Estado nutricional:</strong> Ayuno → ↑glucagón → ↑AMPc → ↓F-2,6-BP → ↑gluconeogénesis, ↓glucólisis',
          '<strong>Estado alimentado:</strong> ↑Insulina → ↓AMPc → ↑F-2,6-BP → ↓gluconeogénesis, ↑glucólisis',
          '<strong>Regulación transcripcional:</strong> Glucagón/cortisol inducen PEPCK, G6Pasa, F-1,6-BPasa. Insulina reprime estos genes',
          '<strong>Disponibilidad de sustratos:</strong> Niveles altos de lactato, alanina, glicerol estimulan gluconeogénesis independientemente de hormonas'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Enfermedad de von Gierke (GSD tipo Ia):</strong> Deficiencia de glucosa-6-fosfatasa. Hipoglucemia severa, hepatomegalia, acidosis láctica, hiperuricemia',
          '<strong>Deficiencia de fructosa-1,6-bisfosfatasa:</strong> Hipoglucemia cetósica en ayuno, acidosis láctica. Síntomas aparecen tras ayuno prolongado',
          '<strong>Deficiencia de piruvato carboxilasa:</strong> Hipoglucemia, acidosis láctica, hiperamonemia. Retraso del desarrollo neurológico',
          '<strong>Alcoholismo crónico:</strong> Etanol → ↑NADH/NAD⁺ → bloquea conversión de lactato a piruvato. Hipoglucemia por inhibición de gluconeogénesis',
          '<strong>Diabetes tipo 2:</strong> Resistencia a insulina → gluconeogénesis hepática no suprimida → hiperglucemia en ayuno. Metformina inhibe gluconeogénesis',
          '<strong>Acidemia propiónica/metilmalónica:</strong> Acumulación de precursores tóxicos. Afecta gluconeogénesis y ciclo de Krebs'
        ]
      }
    ]
  },
  {
    id: 'pentosas-fosfato',
    nombre: 'Vía de las Pentosas Fosfato',
    subtitulo: 'Generación de NADPH y ribosa-5-fosfato',
    icono: '🛡️',
    categorias: ['anabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Citosol. Muy activa en hígado, glándula mamaria, tejido adiposo, córtex adrenal, eritrocitos',
          '<strong>Sustrato inicial:</strong> Glucosa-6-fosfato (G6P)',
          '<strong>Productos principales:</strong> NADPH (poder reductor) y ribosa-5-fosfato (síntesis de nucleótidos)',
          '<strong>Fases:</strong> Fase oxidativa (irreversible, genera NADPH) y fase no oxidativa (reversible, interconversión de azúcares)',
          '<strong>Balance:</strong> 3 G6P + 6 NADP⁺ → 6 NADPH + 3 CO₂ + 2 F6P + 1 G3P (modo oxidativo completo)',
          '<strong>Regulación:</strong> Controlada por relación NADP⁺/NADPH y demanda de ribosa-5-P'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas clave',
        datos: [
          { label: 'Glucosa-6-fosfato deshidrogenasa (G6PD)', value: 'Paso limitante. G6P + NADP⁺ → 6-fosfogluconolactona + NADPH. Inhibida por NADPH (producto). Activa en tejidos biosintéticos.' },
          { label: '6-fosfogluconato deshidrogenasa', value: 'Genera segundo NADPH + CO₂. 6-fosfogluconato → ribulosa-5-P + NADPH + CO₂. Completa fase oxidativa.' },
          { label: 'Transcetolasa', value: 'Transfiere unidades de 2 carbonos. Requiere TPP (tiamina pirofosfato, vitamina B₁). Deficiencia: beriberi afecta metabolismo de pentosas.' },
          { label: 'Transaldolasa', value: 'Transfiere unidades de 3 carbonos. Interconvierte azúcares en fase no oxidativa. Permite flexibilidad metabólica.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Fase oxidativa (irreversible)',
        items: [
          '<strong>Paso 1:</strong> G6P + NADP⁺ → 6-fosfogluconolactona + NADPH (G6PD)',
          '<strong>Paso 2:</strong> 6-fosfogluconolactona + H₂O → 6-fosfogluconato (lactonasa)',
          '<strong>Paso 3:</strong> 6-fosfogluconato + NADP⁺ → ribulosa-5-P + NADPH + CO₂ (6-fosfogluconato DH)',
          '<strong>Rendimiento:</strong> 2 NADPH + 1 CO₂ + ribulosa-5-P por cada G6P oxidado',
          '<strong>Regulación:</strong> Velocidad determinada por disponibilidad de NADP⁺. NADPH inhibe G6PD (retroalimentación negativa)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Funciones del NADPH',
        items: [
          '<strong>Biosíntesis reductora:</strong> Síntesis de ácidos grasos (lipogénesis), colesterol, esteroides, neurotransmisores',
          '<strong>Defensa antioxidante:</strong> Regeneración de glutatión reducido (GSH) vía glutatión reductasa. GSH neutraliza H₂O₂ y radicales libres',
          '<strong>Detoxificación:</strong> Citocromo P450 usa NADPH para hidroxilar xenobióticos (fármacos, toxinas) en hígado',
          '<strong>Fagocitosis:</strong> NADPH oxidasa en neutrófilos genera superóxido (O₂⁻) para destruir patógenos (estallido respiratorio)',
          '<strong>Síntesis de óxido nítrico (NO):</strong> Óxido nítrico sintasa (NOS) requiere NADPH como cofactor',
          '<strong>Diferencia con NADH:</strong> NADPH es principalmente anabólico/reductor. NADH es catabólico/oxidativo (cadena respiratoria)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Deficiencia de G6PD:</strong> Enfermedad ligada al cromosoma X, más común en varones. >400 millones de personas afectadas mundialmente',
          '<strong>Anemia hemolítica por estrés oxidativo:</strong> Fármacos oxidantes (primaquina, sulfonamidas), habas (favismo), infecciones → hemólisis aguda por déficit de GSH en eritrocitos',
          '<strong>Variantes de G6PD:</strong> Clase I (severa, <10% actividad), Clase II (severa, <10%), Clase III (moderada, 10-60%), Clase IV (normal), Clase V (aumentada)',
          '<strong>Variante africana (A-):</strong> 10-60% actividad. Hemólisis autolimitada (eritrocitos viejos). Variante mediterránea: <10% actividad, más severa',
          '<strong>Protección contra malaria:</strong> Deficiencia parcial de G6PD confiere resistencia a Plasmodium falciparum. Ventaja selectiva en zonas endémicas',
          '<strong>Enfermedad granulomatosa crónica (CGD):</strong> Defecto en NADPH oxidasa de fagocitos. Infecciones bacterianas/fúngicas recurrentes. No relacionada con vía de pentosas, pero ilustra rol de NADPH'
        ]
      }
    ]
  },
  {
    id: 'beta-oxidacion',
    nombre: 'β-Oxidación de Ácidos Grasos',
    subtitulo: 'Catabolismo mitocondrial de ácidos grasos',
    icono: '🔥',
    categorias: ['catabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Matriz mitocondrial (AG de cadena larga y media). Peroxisomas (AG de cadena muy larga >C22)',
          '<strong>Función:</strong> Oxidación secuencial de ácidos grasos saturados generando acetil-CoA, NADH y FADH₂',
          '<strong>Rendimiento energético:</strong> Ácido palmítico (C16:0) → 8 acetil-CoA + 7 FADH₂ + 7 NADH → ~106 ATP neto',
          '<strong>Ciclo β-oxidación:</strong> 4 reacciones enzimáticas se repiten eliminando 2 carbonos (acetil-CoA) por ciclo',
          '<strong>Regulación:</strong> Controlada por transporte a mitocondria (CPT-I) y disponibilidad de NAD⁺, FAD',
          '<strong>Integración:</strong> Activada en ayuno, ejercicio, diabetes. Inhibida en estado alimentado por malonil-CoA'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Activación y transporte',
        datos: [
          { label: 'Acil-CoA sintetasa', value: 'Membrana mitocondrial externa. Ácido graso + CoA + ATP → acil-CoA + AMP + PPi. Activación del ácido graso (paso irreversible).' },
          { label: 'Carnitina palmitoiltransferasa I (CPT-I)', value: 'Membrana externa. Acil-CoA + carnitina → acilcarnitina + CoA. Paso regulador clave. Inhibida por malonil-CoA (señal de síntesis de AG).' },
          { label: 'Translocasa (CACT)', value: 'Membrana interna. Intercambia acilcarnitina (entra) por carnitina libre (sale). Transportador antiporte.' },
          { label: 'Carnitina palmitoiltransferasa II (CPT-II)', value: 'Membrana interna (lado matriz). Acilcarnitina + CoA → acil-CoA + carnitina. Regenera acil-CoA en matriz mitocondrial.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Ciclo de β-oxidación (4 pasos)',
        items: [
          '<strong>1. Oxidación (acil-CoA deshidrogenasa):</strong> Acil-CoA → trans-Δ²-enoil-CoA + FADH₂. Enzimas específicas: VLCAD (cadena muy larga), LCAD (larga), MCAD (media), SCAD (corta)',
          '<strong>2. Hidratación (enoil-CoA hidratasa):</strong> trans-Δ²-enoil-CoA + H₂O → L-3-hidroxiacil-CoA. Adición de H₂O al doble enlace',
          '<strong>3. Oxidación (3-hidroxiacil-CoA deshidrogenasa):</strong> L-3-hidroxiacil-CoA + NAD⁺ → 3-cetoacil-CoA + NADH. Genera poder reductor',
          '<strong>4. Tiólisis (tiolasa/β-cetotiolasa):</strong> 3-cetoacil-CoA + CoA-SH → acetil-CoA + acil-CoA (n-2). Libera acetil-CoA, acorta cadena en 2C',
          '<strong>Ciclo se repite:</strong> n/2 ciclos para ácido graso saturado de n carbonos. Genera n/2 acetil-CoA, (n/2)-1 FADH₂, (n/2)-1 NADH'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Destinos del acetil-CoA',
        items: [
          '<strong>Ciclo de Krebs:</strong> Oxidación completa a CO₂ en músculo, corazón, riñón. Genera ATP máximo',
          '<strong>Cetogénesis (hígado):</strong> En ayuno prolongado, exceso de acetil-CoA → cuerpos cetónicos (acetoacetato, β-hidroxibutirato, acetona)',
          '<strong>Cuerpos cetónicos:</strong> Exportados del hígado → cerebro, músculo, corazón (combustible alternativo a glucosa). Atraviesan barrera hematoencefálica',
          '<strong>Cetoacidosis diabética:</strong> Déficit severo de insulina → lipólisis masiva → exceso de cuerpos cetónicos → acidosis metabólica (pH <7.3)',
          '<strong>Regulación recíproca:</strong> β-oxidación activa genera acetil-CoA → inhibe piruvato DH y glucólisis → ahorra glucosa (ciclo de Randle)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Deficiencia de MCAD (acil-CoA deshidrogenasa de cadena media):</strong> Trastorno más común de β-oxidación. Hipoglucemia hipocetósica, encefalopatía, muerte súbita. Screening neonatal',
          '<strong>Deficiencia de CPT-I:</strong> Rara. Hipoglucemia, hepatomegalia, hipocetonemia. Toleran ayuno mejor que déficits de acil-CoA DH',
          '<strong>Deficiencia de CPT-II:</strong> Forma muscular adulta (más común): mioglobinuria, rabdomiólisis desencadenada por ejercicio prolongado o ayuno',
          '<strong>Deficiencia de VLCAD:</strong> Tres fenotipos: neonatal severo, hepatopatía infantil, miopatía adulta. Cardiomiopatía, hipoglucemia hipocetósica',
          '<strong>Síndrome de Reye:</strong> Encefalopatía aguda + esteatosis hepática. Asociado a aspirina en infecciones virales. Inhibe β-oxidación mitocondrial',
          '<strong>Adrenoleucodistrofia (X-ALD):</strong> Defecto en β-oxidación peroxisomal de AG de cadena muy larga. Acumulación en cerebro, médula adrenal. Desmielinización',
          '<strong>Manejo clínico:</strong> Evitar ayuno, dieta baja en grasas, suplementar carbohidratos. Triglicéridos de cadena media (MCT) bypasean CPT-I/II'
        ]
      }
    ]
  },
  {
    id: 'cetogenesis',
    nombre: 'Cetogénesis',
    subtitulo: 'Síntesis de cuerpos cetónicos',
    icono: '🔶',
    categorias: ['catabolismo', 'energia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Exclusivamente en mitocondrias de hepatocitos',
          '<strong>Función:</strong> Convertir exceso de acetil-CoA en cuerpos cetónicos solubles exportables',
          '<strong>Cuerpos cetónicos:</strong> Acetoacetato, β-hidroxibutirato (95% del total), acetona (volátil, exhalada)',
          '<strong>Condiciones de activación:</strong> Ayuno >12-16 h, ejercicio prolongado, dieta cetogénica, diabetes tipo 1 no controlada',
          '<strong>Órgano productor:</strong> Hígado (no puede utilizarlos, carece de succinil-CoA:acetoacetato-CoA transferasa)',
          '<strong>Órganos consumidores:</strong> Cerebro (hasta 70% de energía en ayuno prolongado), músculo cardíaco, músculo esquelético, riñón'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas de la cetogénesis',
        datos: [
          { label: 'Tiolasa (acetil-CoA acetiltransferasa)', value: '2 acetil-CoA → acetoacetil-CoA + CoA. Primera condensación. Reversible (también participa en β-oxidación).' },
          { label: 'HMG-CoA sintasa', value: 'Acetoacetil-CoA + acetil-CoA → HMG-CoA (β-hidroxi-β-metilglutaril-CoA). Paso comprometido de la cetogénesis. Mitocondrial (distinta de isoforma citosólica para colesterol).' },
          { label: 'HMG-CoA liasa', value: 'HMG-CoA → acetoacetato + acetil-CoA. Paso específico de cetogénesis. Solo en hígado. Genera primer cuerpo cetónico.' },
          { label: 'β-hidroxibutirato deshidrogenasa', value: 'Acetoacetato + NADH ⇌ β-hidroxibutirato + NAD⁺. Dependiente de relación NADH/NAD⁺ mitocondrial. Reversible.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Síntesis y utilización',
        items: [
          '<strong>Síntesis en hígado:</strong> Acetil-CoA (de β-oxidación) → acetoacetil-CoA → HMG-CoA → acetoacetato ⇌ β-hidroxibutirato',
          '<strong>Relación β-HB/AcAc:</strong> ~3:1 en ayuno (depende de estado redox mitocondrial). β-hidroxibutirato es más estable, no descarboxila espontáneamente',
          '<strong>Acetona:</strong> Descarboxilación espontánea de acetoacetato. Volátil, olor frutal característico en aliento (cetoacidosis)',
          '<strong>Utilización en tejidos periféricos:</strong> β-hidroxibutirato → acetoacetato → acetoacetil-CoA (vía succinil-CoA transferasa) → 2 acetil-CoA → ciclo de Krebs',
          '<strong>Cerebro en ayuno:</strong> Tras 3 días de ayuno, cuerpos cetónicos aportan ~30% de energía. Tras >1 semana: >60%. Mecanismo de ahorro de glucosa y proteína muscular'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y balance',
        items: [
          '<strong>Regulación hormonal:</strong> Glucagón y cortisol (ayuno) → ↑lipólisis → ↑ácidos grasos libres → ↑β-oxidación → ↑acetil-CoA → ↑cetogénesis',
          '<strong>Inhibición por insulina:</strong> ↓Lipólisis → ↓sustrato. Favorece glucólisis y lipogénesis (malonil-CoA inhibe CPT-I)',
          '<strong>Disponibilidad de oxaloacetato:</strong> Baja gluconeogénesis activa consume OAA → menos condensación de acetil-CoA en ciclo de Krebs → desvío a cetogénesis',
          '<strong>Relación NADH/NAD⁺:</strong> Determina ratio β-hidroxibutirato/acetoacetato. Alta en cetoacidosis diabética',
          '<strong>Capacidad de utilización:</strong> Limitada por actividad de succinil-CoA transferasa en tejidos. Exceso → acumulación en sangre'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Cetoacidosis diabética (CAD):</strong> Déficit absoluto de insulina (DM1) → lipólisis masiva → cetogénesis no controlada. pH <7.3, bicarbonato <15 mmol/L, cetonemia >3 mmol/L',
          '<strong>Cetoacidosis alcohólica:</strong> Alcoholismo + ayuno → NADH/NAD⁺ alto → favorece β-hidroxibutirato. Puede tener glucemia normal/baja',
          '<strong>Cetosis fisiológica:</strong> Ayuno >16 h, ejercicio prolongado, dieta cetogénica. Cetonemia 1-3 mmol/L, pH normal. Adaptación metabólica beneficiosa',
          '<strong>Deficiencia de HMG-CoA liasa:</strong> Hipoglucemia hipocetósica, acidosis metabólica, hepatomegalia. Emergencia en infancia tras ayuno/enfermedad',
          '<strong>Deficiencia de succinil-CoA:acetoacetato transferasa:</strong> No pueden usar cuerpos cetónicos. Cetoacidosis persistente incluso con insulina',
          '<strong>Dieta cetogénica terapéutica:</strong> Epilepsia refractaria (reducción >50% convulsiones en ~50% pacientes). Posible beneficio en cáncer (metabolismo Warburg), Alzheimer'
        ]
      }
    ]
  },
  {
    id: 'sintesis-acidos-grasos',
    nombre: 'Síntesis de Ácidos Grasos',
    subtitulo: 'Lipogénesis de novo',
    icono: '🧈',
    categorias: ['anabolismo'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Localización:</strong> Citosol (síntesis). Principalmente hígado, tejido adiposo, glándula mamaria lactante',
          '<strong>Función:</strong> Síntesis de palmitato (C16:0) a partir de acetil-CoA y malonil-CoA',
          '<strong>Enzima principal:</strong> Ácido graso sintasa (FAS) - complejo multienzimático con 7 actividades catalíticas',
          '<strong>Cofactores:</strong> NADPH (poder reductor), biotina (acetil-CoA carboxilasa)',
          '<strong>Producto final:</strong> Palmitato (16:0). Elongasas y desaturasas del RE generan otros ácidos grasos',
          '<strong>Regulación:</strong> Insulina estimula (estado alimentado). Glucagón y epinefrina inhiben (ayuno/estrés)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Enzimas clave',
        datos: [
          { label: 'Acetil-CoA carboxilasa (ACC)', value: 'Paso comprometido y limitante. Acetil-CoA + CO₂ + ATP → malonil-CoA. Activada por citrato, insulina. Inhibida por palmitoil-CoA, AMP, glucagón, epinefrina (fosforilación).' },
          { label: 'Ácido graso sintasa (FAS)', value: 'Homodímero con 7 dominios enzimáticos + ACP (proteína transportadora de acilos). Sintetiza palmitato mediante 7 ciclos de elongación (2C cada uno).' },
          { label: 'Enzima málica', value: 'Malato + NADP⁺ → piruvato + CO₂ + NADPH. Genera NADPH citosólico (50% del requerido). Inducida por insulina, glucosa.' },
          { label: 'ATP citrato liasa', value: 'Citrato + CoA + ATP → acetil-CoA + oxaloacetato + ADP + Pi. Exporta acetil-CoA mitocondrial al citosol. Activada en estado alimentado.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Proceso de síntesis',
        items: [
          '<strong>Transporte de acetil-CoA:</strong> Acetil-CoA mitocondrial + oxaloacetato → citrato (citrato sintasa) → citrato sale al citosol → acetil-CoA + OAA (ATP citrato liasa)',
          '<strong>Generación de malonil-CoA:</strong> Acetil-CoA + CO₂ + ATP → malonil-CoA (acetil-CoA carboxilasa). Malonil-CoA es donador de 2C activado',
          '<strong>Ciclo de elongación (7 veces):</strong> Condensación (con pérdida de CO₂) → reducción (NADPH) → deshidratación → reducción (NADPH)',
          '<strong>Balance:</strong> 8 acetil-CoA + 7 ATP + 14 NADPH → palmitato + 8 CoA + 7 ADP + 7 Pi + 14 NADP⁺ + 6 H₂O',
          '<strong>Fuentes de NADPH:</strong> Vía pentosas fosfato (50-60%), enzima málica (30-40%), isocitrato DH citosólica (10%)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y modificaciones',
        items: [
          '<strong>Regulación alostérica:</strong> Citrato activa ACC (señal de exceso de acetil-CoA). Palmitoil-CoA inhibe ACC (retroalimentación)',
          '<strong>Regulación hormonal:</strong> Insulina → desfosforila ACC (activa). Glucagón/epinefrina → fosforila ACC vía AMPc/PKA (inactiva)',
          '<strong>Regulación transcripcional:</strong> Insulina + glucosa → SREBP-1c → induce FAS, ACC, ATP citrato liasa. Ayuno las reprime',
          '<strong>Malonil-CoA inhibe CPT-I:</strong> Previene β-oxidación simultánea (ciclo fútil). Integra señalización nutricional',
          '<strong>Elongación de palmitato:</strong> Elongasas del RE añaden 2C. Palmitato (16:0) → estearato (18:0) → ácidos grasos de cadena muy larga',
          '<strong>Desaturación:</strong> Δ9-desaturasa (SCD1) introduce doble enlace. Estearato (18:0) → oleato (18:1n-9). Humanos carecen de Δ12 y Δ15 (no sintetizan ácidos grasos esenciales)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Esteatosis hepática no alcohólica (NAFLD):</strong> Lipogénesis de novo aumentada en resistencia a insulina. Exceso de síntesis de triglicéridos en hígado',
          '<strong>Síndrome metabólico:</strong> Hiperinsulinemia → ↑ACC, FAS → ↑síntesis de AG → dislipidemia (↑VLDL, ↓HDL)',
          '<strong>Obesidad:</strong> Consumo crónico de carbohidratos → insulina elevada → lipogénesis de novo activa → expansión de tejido adiposo',
          '<strong>Diabetes tipo 2:</strong> Resistencia a insulina en músculo/adiposo, pero hígado responde → lipogénesis paradójicamente aumentada',
          '<strong>Inhibidores de ACC/FAS:</strong> En desarrollo para NAFLD/NASH. Firsocostat (ACC inhibidor) en ensayos clínicos',
          '<strong>Deficiencia de ácidos grasos esenciales:</strong> Dietas muy bajas en grasa → déficit de linoleico (18:2n-6) y α-linolénico (18:3n-3). Dermatitis, retraso en crecimiento'
        ]
      }
    ]
  }
];
