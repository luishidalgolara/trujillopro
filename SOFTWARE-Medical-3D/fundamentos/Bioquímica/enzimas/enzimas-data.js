// ═══════════════════════════════════════════════════════════
// ENZIMAS-DATA.JS - Base de datos de enzimas
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const ENZIMAS_DATA = [
  {
    id: 'hexoquinasa',
    nombre: 'Hexoquinasa',
    subtitulo: 'EC 2.7.1.1 - Fosforilación de glucosa',
    icono: '🎯',
    categorias: ['transferasas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Clasificación:</strong> Transferasa (EC 2.7.1.1). Transfiere grupo fosfato desde ATP a glucosa',
          '<strong>Reacción catalizada:</strong> Glucosa + ATP → Glucosa-6-fosfato (G6P) + ADP + H⁺',
          '<strong>Localización:</strong> Citosol de todas las células. Isoformas tisulares específicas',
          '<strong>Función biológica:</strong> Primer paso comprometido de la glucólisis. Atrapa glucosa en la célula (G6P no atraviesa membrana)',
          '<strong>Isoformas en humanos:</strong> HK-I (ubicua), HK-II (músculo, adiposo), HK-III (rara), HK-IV/glucoquinasa (hígado, páncreas)',
          '<strong>Cofactores:</strong> Requiere Mg²⁺ para quelar ATP. No requiere coenzimas orgánicas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Propiedades cinéticas y regulación',
        datos: [
          { label: 'Km para glucosa (HK-I/II)', value: '0.01-0.1 mM. Alta afinidad. Activa incluso con glucosa baja (hipoglucemia). Saturación a concentraciones fisiológicas.' },
          { label: 'Km para glucosa (HK-IV/glucoquinasa)', value: '~10 mM. Baja afinidad. Actúa como sensor de glucosa. No saturada en rango fisiológico (3-15 mM).' },
          { label: 'Inhibición por producto', value: 'HK-I/II inhibidas por G6P (retroalimentación negativa). Glucoquinasa NO inhibida por G6P (permite almacenamiento continuo).' },
          { label: 'Cooperatividad', value: 'HK-I/II: cinética Michaeliana. Glucoquinasa: cinética sigmoidal (cooperatividad positiva, Hill n≈1.7). Sensor glucémico.' },
          { label: 'Regulación hormonal', value: 'Glucoquinasa inducida por insulina (transcripcionalmente). Reprimida por glucagón. HK-I/II constitutivas.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo catalítico',
        items: [
          '<strong>Cambio conformacional inducido:</strong> Modelo de "ajuste inducido" (induced fit). Glucosa induce cierre de dominios enzimáticos',
          '<strong>Exclusión de agua:</strong> Al cerrar, excluye H₂O del sitio activo. Previene hidrólisis improductiva de ATP',
          '<strong>Transferencia directa:</strong> Grupo γ-fosfato de ATP transferido a C-6 de glucosa. Mecanismo de transferencia en línea',
          '<strong>Especificidad de sustrato:</strong> Fosforila glucosa, manosa, fructosa (menor eficiencia). Glucoquinasa es altamente específica para glucosa',
          '<strong>Acoplamiento energético:</strong> Utiliza energía de hidrólisis de ATP (ΔG°\' = -16.7 kJ/mol) para crear G6P (ΔG°\' global = -33.5 kJ/mol, irreversible)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Isoformas y funciones específicas',
        items: [
          '<strong>Hexoquinasa I:</strong> Ubicua, expresada en todos los tejidos. Unida a membrana mitocondrial externa. Acceso preferencial a ATP mitocondrial',
          '<strong>Hexoquinasa II:</strong> Músculo esquelético, cardíaco, tejido adiposo. Sobreexpresada en células cancerosas (efecto Warburg)',
          '<strong>Hexoquinasa IV (Glucoquinasa):</strong> Hígado (regulación de gluconeogénesis/glucogenogénesis), células β pancreáticas (sensor de glucosa para secreción de insulina)',
          '<strong>Sensor de glucosa pancreático:</strong> Glucoquinasa determina umbral de glucosa para liberación de insulina (~5 mM)',
          '<strong>Regulador proteico de glucoquinasa (GKRP):</strong> En hígado, secuestra glucoquinasa en núcleo cuando glucosa baja. Fructosa-6-P estabiliza complejo, fructosa-1-P lo disocia'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>MODY tipo 2 (diabetes juvenil de inicio en la madurez):</strong> Mutaciones inactivantes en glucoquinasa. Hiperglucemia leve crónica (110-150 mg/dL). Usualmente no requiere tratamiento',
          '<strong>Hipoglucemia hiperinsulinémica persistente de la infancia (PHHI):</strong> Mutaciones activantes en glucoquinasa. Secreción inadecuada de insulina con glucosa baja. Hipoglucemia severa neonatal',
          '<strong>Activadores de glucoquinasa:</strong> Fármacos experimentales para diabetes tipo 2. Pequeñas moléculas que reducen Km (aumentan afinidad). Problemas de hipoglucemia limitan uso',
          '<strong>Cáncer:</strong> Sobreexpresión de HK-II en tumores sólidos. Favorece glucólisis aeróbica (Warburg). Target terapéutico (inhibidores selectivos en desarrollo)',
          '<strong>Deficiencia de hexoquinasa (muy rara):</strong> Anemia hemolítica no esferocítica. Eritrocitos dependen exclusivamente de glucólisis para ATP',
          '<strong>2-desoxiglucosa (2-DG):</strong> Análogo de glucosa, fosforilado por hexoquinasa pero no metabolizable. Usado en PET-scan (¹⁸F-FDG) y como inhibidor metabólico experimental'
        ]
      }
    ]
  },
  {
    id: 'lactato-deshidrogenasa',
    nombre: 'Lactato Deshidrogenasa',
    subtitulo: 'EC 1.1.1.27 - Interconversión lactato-piruvato',
    icono: '🔄',
    categorias: ['oxidorreductasas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Clasificación:</strong> Oxidorreductasa (EC 1.1.1.27). Cataliza reacciones redox',
          '<strong>Reacción catalizada:</strong> Piruvato + NADH + H⁺ ⇌ Lactato + NAD⁺ (reversible)',
          '<strong>Localización:</strong> Citosol. Presente en prácticamente todas las células',
          '<strong>Función biológica:</strong> Regenera NAD⁺ en condiciones anaeróbicas (glucólisis). Permite fermentación láctica',
          '<strong>Estructura:</strong> Tetrámero (4 subunidades). Dos tipos de subunidades: M (músculo) y H (corazón)',
          '<strong>Cofactor:</strong> NAD⁺/NADH (nicotinamida adenina dinucleótido). Aceptor/donador de hidruro'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Isoenzimas y distribución tisular',
        datos: [
          { label: 'LDH-1 (H₄)', value: 'Corazón, eritrocitos, riñón. Favorece oxidación de lactato → piruvato. Alta afinidad por lactato. Usada como marcador cardíaco (obsoleto, reemplazado por troponinas).' },
          { label: 'LDH-2 (H₃M)', value: 'Corazón, eritrocitos, riñón. Propiedades intermedias entre LDH-1 y LDH-3.' },
          { label: 'LDH-3 (H₂M₂)', value: 'Pulmón, riñón, leucocitos. Distribución amplia. Intermedia en características.' },
          { label: 'LDH-4 (HM₃)', value: 'Hígado, músculo esquelético. Favorece reducción de piruvato → lactato.' },
          { label: 'LDH-5 (M₄)', value: 'Hígado, músculo esquelético. Km alta para piruvato. Activa cuando piruvato elevado (ejercicio, hipoxia). Isoforma glucolítica.' },
          { label: 'Patrón electroforético', value: 'LDH-1 migra más hacia ánodo (+). LDH-5 migra menos. Separación por carga neta diferencial.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo catalítico',
        items: [
          '<strong>Mecanismo ordenado:</strong> NAD⁺/NADH se une primero, luego sustrato (piruvato/lactato). Producto se libera primero, luego coenzima',
          '<strong>Transferencia de hidruro:</strong> NADH transfiere ion hidruro (H⁻) al C2 del piruvato, generando lactato. Reacción estereoespecífica (genera L-lactato)',
          '<strong>Residuo catalítico:</strong> His-195 actúa como ácido-base general. Arg-171 estabiliza carga negativa del carbonilo de piruvato',
          '<strong>Especificidad de coenzima:</strong> Alta selectividad por NADH vs NADPH. Bolsillo de unión reconoce grupo 2\'-fosfato ausente en NAD⁺',
          '<strong>Cinética reversible:</strong> Dirección de reacción depende de [NADH]/[NAD⁺] y [lactato]/[piruvato]. En músculo anaeróbico: piruvato → lactato. En corazón aeróbico: lactato → piruvato'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Funciones fisiológicas',
        items: [
          '<strong>Regeneración de NAD⁺ anaeróbico:</strong> Durante ejercicio intenso, músculo convierte piruvato → lactato para regenerar NAD⁺ y mantener glucólisis',
          '<strong>Ciclo de Cori:</strong> Lactato del músculo → hígado (vía sangre) → gluconeogénesis → glucosa → músculo. Redistribución de carga metabólica',
          '<strong>Metabolismo cardíaco:</strong> Corazón oxida lactato preferentemente (LDH-1). Lactato → piruvato → acetil-CoA → ciclo de Krebs. Combustible más eficiente que glucosa',
          '<strong>Metabolismo cerebral:</strong> Astrocitos producen lactato (vía LDH-5) → neuronas consumen lactato (vía LDH-1). Lanzadera astrocito-neurona de lactato',
          '<strong>Cáncer (efecto Warburg):</strong> Tumores sobreexpresan LDH-A (subunidad M). Producción aumentada de lactato incluso con O₂ disponible. Acidificación del microambiente tumoral'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Marcador de daño tisular:</strong> LDH total elevada en suero indica necrosis celular (cualquier tejido). Elevación inespecífica',
          '<strong>Isoenzimas como marcadores:</strong> Patrón de isoenzimas identifica tejido afectado. LDH-1 > LDH-2 sugiere infarto miocárdico (patrón "flippeado"). Obsoleto, reemplazado por troponinas cardíacas',
          '<strong>Hemólisis:</strong> Eritrocitos ricos en LDH-1. Hemólisis in vivo o in vitro (muestra) eleva LDH total y LDH-1',
          '<strong>Anemia megaloblástica:</strong> Eritropoyesis ineficaz → destrucción intramedular de precursores → LDH muy elevada (principalmente LDH-1/2)',
          '<strong>Cáncer:</strong> LDH elevada en linfomas, leucemias, tumores sólidos metastásicos. Marcador pronóstico (correlación inversa con supervivencia)',
          '<strong>Deficiencia de LDH-A (muy rara):</strong> Intolerancia al ejercicio, mioglobinuria con ejercicio. Músculo no puede regenerar NAD⁺ anaeróbicamente',
          '<strong>Deficiencia de LDH-B (muy rara):</strong> Asintomática. Descubierta incidentalmente en estudios de isoenzimas',
          '<strong>Inhibidores de LDH:</strong> Oxamato, FX11, gosipol. Investigados como anticancerígenos (bloquean metabolismo Warburg). Toxicidad limita uso clínico'
        ]
      }
    ]
  },
  {
    id: 'atp-sintasa',
    nombre: 'ATP Sintasa',
    subtitulo: 'EC 7.1.2.2 - Síntesis de ATP acoplada a gradiente de protones',
    icono: '⚡',
    categorias: ['ligasas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Clasificación:</strong> Ligasa (ATP sintasa) / Hidrolasa (ATPasa). Anteriormente EC 3.6.3.14, reclasificada como EC 7.1.2.2',
          '<strong>Reacción catalizada:</strong> ADP + Pi + nH⁺(fuera) → ATP + H₂O + nH⁺(dentro). Acoplada a gradiente electroquímico',
          '<strong>Localización:</strong> Membrana mitocondrial interna (eucariotas), membrana plasmática (bacterias), membrana tilacoide (cloroplastos)',
          '<strong>Función biológica:</strong> Síntesis de la mayoría del ATP celular (>95%). Convierte energía del gradiente de protones en enlace fosfato de alta energía',
          '<strong>Estructura:</strong> Complejo F₁F₀. F₁ (catalítico, 5 subunidades α₃β₃γδε). F₀ (canal de H⁺, subunidades a, b₂, c₁₀₋₁₅)',
          '<strong>Mecanismo rotatorio:</strong> Motor molecular nanométrico. Flujo de H⁺ induce rotación física de subunidades'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Estructura y función de subunidades',
        datos: [
          { label: 'Subunidades α y β (F₁)', value: 'Tres de cada una, alternadas en anillo hexamérico. Subunidades β contienen sitios catalíticos. α son estructurales. Estátor.' },
          { label: 'Subunidad γ (F₁)', value: 'Eje central rotatorio. Atraviesa centro del anillo α₃β₃. Rotación cambia conformación de sitios β. Conecta F₁ con F₀.' },
          { label: 'Subunidades δ y ε (F₁)', value: 'δ conecta F₁ al estátor b₂. ε regula actividad (inhibidor en ausencia de gradiente). Parte del rotor.' },
          { label: 'Anillo c (F₀)', value: '10-15 subunidades c (dependiendo de especie). Rotor del motor. Cada subunidad c tiene sitio de unión a H⁺. Rotación acoplada a flujo de protones.' },
          { label: 'Subunidad a (F₀)', value: 'Estátor. Forma hemicanalas para entrada y salida de H⁺. Interactúa con anillo c durante rotación.' },
          { label: 'Subunidades b (F₀)', value: 'Brazo lateral del estátor. b₂ conecta parte a de F₀ con α₃β₃ de F₁. Previene rotación del anillo α₃β₃ mientras γ rota.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo de catálisis rotatoria (Boyer)',
        items: [
          '<strong>Hipótesis del cambio de unión (Binding Change Mechanism):</strong> Paul Boyer, 1997 (Nobel). Tres sitios β en diferentes estados conformacionales simultáneamente',
          '<strong>Estado O (Open/abierto):</strong> Afinidad baja por sustratos. Sitio accesible. ADP + Pi se unen laxamente',
          '<strong>Estado L (Loose/laxo):</strong> Afinidad intermedia. ADP + Pi unidos sin reacción. Conformación de transición',
          '<strong>Estado T (Tight/apretado):</strong> Afinidad muy alta. Cataliza formación de ATP espontáneamente. ATP unido fuertemente',
          '<strong>Ciclo catalítico:</strong> Rotación de γ (120° por paso) cambia conformación de cada sitio β secuencialmente. O→L→T→O. Liberación de ATP requiere cambio conformacional (no energía química)',
          '<strong>Estequiometría H⁺/ATP:</strong> ~3-4 H⁺ por ATP (depende de número de subunidades c). Anillo c₁₀ → 3.3 H⁺/ATP. Anillo c₁₅ → 5 H⁺/ATP'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y acoplamiento',
        items: [
          '<strong>Control respiratorio:</strong> Velocidad de síntesis de ATP determinada por disponibilidad de ADP (Estado 3 vs Estado 4)',
          '<strong>Inhibidor proteico IF₁:</strong> Bloquea actividad ATPasa en ausencia de gradiente. Previene hidrólisis reversa de ATP (protección en isquemia)',
          '<strong>Fuerza protón-motriz requerida:</strong> ΔμH⁺ ≈ 200-220 mV. Umbral mínimo para síntesis neta de ATP',
          '<strong>Reversibilidad:</strong> Puede funcionar en reversa (hidrólisis de ATP → bombeo de H⁺) cuando ΔμH⁺ bajo. Ocurre en isquemia severa (depleta ATP)',
          '<strong>Acoplamiento con cadena respiratoria:</strong> Complejos I, III, IV generan gradiente → ATP sintasa lo consume. Balance dinámico'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Síndrome de Leigh (encefalomielopatía necrotizante):</strong> Mutaciones en subunidades de ATP sintasa (genes MT-ATP6, MT-ATP8 mitocondriales). Neurodegeneración progresiva, acidosis láctica',
          '<strong>Neuropatía, ataxia y retinitis pigmentosa (NARP):</strong> Mutación T8993G en MT-ATP6. Severidad depende de heteroplasmia. >90% → NARP. >95% → Leigh',
          '<strong>Oligomicina:</strong> Antibiótico que inhibe canal F₀. Bloquea síntesis de ATP. Herramienta experimental. Aumenta consumo de O₂ si hay desacopladores presentes',
          '<strong>Bedaquilina:</strong> Antituberculoso aprobado. Inhibe ATP sintasa de Mycobacterium tuberculosis (especialmente cepas multirresistentes). Selectividad por enzima bacteriana vs humana',
          '<strong>Diclorofenol indolfenol (DCPIP):</strong> Desacoplador. Permite flujo de H⁺ sin ATP sintasa → disipa gradiente como calor. Mecanismo de termogénesis en tejido adiposo marrón (UCP1)',
          '<strong>Estudios estructurales:</strong> John Walker (Nobel 1997) resolvió estructura cristalográfica. Visualización de rotación por microscopía de fluorescencia (Noji et al., 1997) confirmó mecanismo rotatorio',
          '<strong>Enfermedades mitocondriales:</strong> Defectos en ATP sintasa representan ~20% de enfermedades OXPHOS. Fenotipos: encefalopatía, cardiomiopatía, miopatía'
        ]
      }
    ]
  },
  {
    id: 'pepsina',
    nombre: 'Pepsina',
    subtitulo: 'EC 3.4.23.1 - Proteasa ácida gástrica',
    icono: '✂️',
    categorias: ['hidrolasas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Clasificación:</strong> Hidrolasa - Peptidasa aspártica (EC 3.4.23.1). Familia de proteasas ácidas',
          '<strong>Reacción catalizada:</strong> Hidrólisis de enlaces peptídicos (preferentemente entre aminoácidos aromáticos: Phe, Trp, Tyr)',
          '<strong>Localización:</strong> Lumen del estómago. Secretada por células principales (chief cells) de glándulas gástricas',
          '<strong>Función biológica:</strong> Digestión inicial de proteínas dietéticas. Desnaturalización y fragmentación en péptidos más pequeños',
          '<strong>Forma inactiva:</strong> Pepsinógeno (zimógeno). Activación autocatalítica y por HCl en pH ácido',
          '<strong>pH óptimo:</strong> 1.5-2.5. Inactiva a pH >6 (irreversible por desnaturalización)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Propiedades y mecanismo',
        datos: [
          { label: 'Familia de pepsinógenos', value: 'Pepsinógeno A (PGA, más abundante) → pepsina A. Pepsinógeno C (PGC) → pepsina C (gastricina). Expresión diferencial en mucosa gástrica.' },
          { label: 'Activación por HCl', value: 'pH <5: H⁺ protona pepsinógeno → cambio conformacional → autohidrólisis de propéptido (44 aa). Activación autocatalítica subsecuente (pepsina activa más pepsinógeno).' },
          { label: 'Residuos catalíticos', value: 'Dos ácidos aspárticos (Asp-32 y Asp-215) en sitio activo. Mecanismo general ácido-base. No requiere cofactores.' },
          { label: 'Especificidad de sustrato', value: 'Endopeptidasa. Preferencia por enlaces entre residuos hidrofóbicos grandes (Phe-Phe, Phe-Tyr, Tyr-Trp, Leu-Glu). Poco específica comparada con tripsina/quimotripsina.' },
          { label: 'Productos de digestión', value: 'Fragmentos peptídicos de 3-30 aminoácidos. NO genera aminoácidos libres. Digestión completa requiere peptidasas intestinales (tripsina, quimotripsina, carboxipeptidasas).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo catalítico',
        items: [
          '<strong>Catálisis ácido-base general:</strong> Asp-32 actúa como base (desprotona H₂O). Asp-215 actúa como ácido (protona grupo NH del enlace peptídico)',
          '<strong>Intermediario tetraédrico:</strong> Molécula de agua atacante genera intermediario tetraédrico en carbonilo del enlace peptídico',
          '<strong>Ruptura del enlace C-N:</strong> Colapso del intermediario libera fragmentos peptídicos. Mecanismo de un solo desplazamiento',
          '<strong>Dependencia del pH:</strong> Requiere un Asp protonado y uno desprotonado. Solo ocurre en pH ácido. A pH neutro, ambos Asp ionizados (repulsión electrostática inactiva enzima)',
          '<strong>Estabilidad en pH ácido:</strong> Estructura rica en enlaces de hidrógeno entre cadenas laterales ácidas. Resistente a desnaturalización ácida (a diferencia de mayoría de proteínas)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y función fisiológica',
        items: [
          '<strong>Secreción de pepsinógeno:</strong> Estimulada por acetilcolina (vagal), gastrina (hormona), histamina. Respuesta a comida y fase cefálica de digestión',
          '<strong>Secreción de HCl:</strong> Células parietales secretan HCl (pH ~1.5-2). Necesario para activación de pepsinógeno y actividad de pepsina',
          '<strong>Protección de mucosa gástrica:</strong> Capa de moco y bicarbonato protege células epiteliales. Pepsina no digiere mucosa sana (gradiente de pH)',
          '<strong>Contribución a digestión proteica:</strong> Digestión gástrica aporta ~10-15% de digestión total de proteínas. Principalmente desnaturaliza y fragmenta',
          '<strong>Inactivación duodenal:</strong> Bicarbonato pancreático eleva pH >6 en duodeno → pepsina irreversiblemente inactiva. Previene daño a intestino delgado'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Úlcera péptica:</strong> Desequilibrio entre factores agresivos (HCl, pepsina) y defensivos (moco, bicarbonato). H. pylori aumenta secreción ácida y disminuye defensa mucosa',
          '<strong>Enfermedad por reflujo gastroesofágico (ERGE):</strong> Reflujo de contenido ácido + pepsina al esófago. Daño mucosa esofágica (no tiene protección gástrica). Esofagitis, esófago de Barrett',
          '<strong>Inhibidores de bomba de protones (IBP):</strong> Omeprazol, lansoprazol. Bloquean H⁺/K⁺-ATPasa de células parietales → ↓HCl → ↓activación de pepsinógeno',
          '<strong>Antagonistas H₂:</strong> Ranitidina, famotidina. Bloquean receptor de histamina H₂ → ↓secreción de HCl por células parietales',
          '<strong>Pepsinógeno sérico como marcador:</strong> PGA/PGC séricos reflejan estado de mucosa gástrica. ↓PGA o ↓ratio PGA/PGC sugiere gastritis atrófica (precursor de cáncer gástrico)',
          '<strong>Gastritis atrófica y anemia perniciosa:</strong> Destrucción autoinmune de células parietales y principales → ↓HCl, ↓pepsina, ↓factor intrínseco → aclorhidria, malabsorción B₁₂',
          '<strong>Síndrome de Zollinger-Ellison:</strong> Gastrinoma (tumor secretor de gastrina) → hipersecreción de HCl y pepsinógeno → úlceras pépticas múltiples y severas'
        ]
      }
    ]
  },
  {
    id: 'adn-polimerasa',
    nombre: 'ADN Polimerasa',
    subtitulo: 'EC 2.7.7.7 - Síntesis de ADN',
    icono: '🧬',
    categorias: ['transferasas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Clasificación:</strong> Transferasa - Nucleotidiltransferasa (EC 2.7.7.7). Transfiere grupos nucleotidilo',
          '<strong>Reacción catalizada:</strong> (ADN)ₙ + dNTP → (ADN)ₙ₊₁ + PPi. Elongación de cadena de ADN en dirección 5\'→3\'',
          '<strong>Localización:</strong> Núcleo (replicación, reparación), mitocondria (replicación mtDNA)',
          '<strong>Función biológica:</strong> Replicación del genoma, reparación de ADN, síntesis de fragmentos de Okazaki',
          '<strong>Familias en eucariotas:</strong> A (Pol γ, θ, ν), B (Pol α, δ, ε, ζ), X (Pol β, λ, μ, TdT), Y (Pol η, ι, κ, Rev1)',
          '<strong>Cofactores:</strong> Requiere Mg²⁺ o Mn²⁺. No requiere coenzimas orgánicas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ ADN polimerasas replicativas (humanas)',
        datos: [
          { label: 'ADN Pol α (primasa-polimerasa)', value: 'Sintetiza primers de ARN (~10 nt) + ADN (~20 nt). Inicia fragmentos de Okazaki. NO tiene actividad 3\'→5\' exonucleasa. Baja fidelidad.' },
          { label: 'ADN Pol δ', value: 'Polimerasa principal de cadena retrasada. Completa fragmentos de Okazaki. Actividad 3\'→5\' exonucleasa (corrección de errores). Alta fidelidad (~10⁻⁹ errores/nt).' },
          { label: 'ADN Pol ε', value: 'Polimerasa principal de cadena líder. Participa en reparación. Actividad 3\'→5\' exonucleasa. Interactúa con PCNA. Alta fidelidad.' },
          { label: 'ADN Pol γ', value: 'Única polimerasa mitocondrial. Replica mtDNA. Actividad 3\'→5\' exonucleasa. Heterotrímero (1 subunidad catalítica + 2 accesorias).' },
          { label: 'PCNA (antígeno nuclear de proliferación celular)', value: 'Sliding clamp (abrazadera deslizante). Trímero que encircla ADN. Aumenta procesividad de Pol δ/ε (miles de nt sin disociarse).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo catalítico',
        items: [
          '<strong>Mecanismo de dos iones metálicos:</strong> Dos Mg²⁺ coordinan trifosfato de dNTP y activan 3\'-OH del cebador. Favorecen ataque nucleofílico',
          '<strong>Complementariedad de bases:</strong> Reconocimiento de Watson-Crick. Geometría del sitio activo solo acomoda pares correctos (A-T, G-C)',
          '<strong>Cambio conformacional inducido:</strong> Unión de dNTP correcto induce cierre de "dedos" de polimerasa. Excluye agua del sitio activo',
          '<strong>Formación de enlace fosfodiéster:</strong> Grupo 3\'-OH del extremo de la cadena ataca fosfato α del dNTP entrante. Liberación de pirofosfato (PPi)',
          '<strong>Actividad exonucleasa 3\'→5\':</strong> Sitio separado del catalítico. Remueve nucleótidos mal apareados. Mecanismo de corrección de pruebas (proofreading). Mejora fidelidad ~100 veces',
          '<strong>Translocación:</strong> Tras catálisis, polimerasa se mueve un nucleótido en dirección 3\'. Ciclo se repite'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Polimerasas de reparación y translesión',
        items: [
          '<strong>ADN Pol β:</strong> Reparación por escisión de bases (BER). Llena gaps de 1 nt. Sin actividad exonucleasa. Expresión ubicua',
          '<strong>ADN Pol η, ι, κ (familia Y):</strong> Polimerasas de translesión. Bypasean lesiones de ADN (dímeros de pirimidina UV). Baja fidelidad pero permiten replicación. Previenen bloqueos de horquilla',
          '<strong>Síndrome XP-V (xeroderma pigmentosum variante):</strong> Deficiencia de Pol η. Hipersensibilidad UV, alto riesgo de cáncer piel',
          '<strong>ADN Pol λ, μ:</strong> Reparación de rupturas de doble cadena (NHEJ - non-homologous end joining). Síntesis de relleno en gaps',
          '<strong>Deaminasa terminal (TdT):</strong> Familia X. Agrega nucleótidos sin molde. Genera diversidad de receptores de células B/T (recombinación V(D)J)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Mutaciones en POLG (Pol γ mitocondrial):</strong> Síndrome de Alpers (epilepsia mioclónica progresiva), oftalmoplejía externa progresiva, ataxia espinocerebelosa. Depleción de mtDNA',
          '<strong>Defectos en Pol δ/ε:</strong> Síndromes de predisposición a cáncer colorrectal. Síndrome de Lynch-like. Mutaciones en dominio exonucleasa → acumulación de mutaciones',
          '<strong>Inhibidores antivirales:</strong> Análogos de nucleósidos (AZT, aciclovir, tenofovir) inhiben polimerasas virales (VIH, herpes). Terminadores de cadena (carecen 3\'-OH)',
          '<strong>Quimioterapia:</strong> Citarabina (ara-C) inhibida Pol α/δ. Gemcitabina inhibe Pol α. Tratamiento de leucemias y tumores sólidos',
          '<strong>PCR y biotecnología:</strong> Taq polimerasa (Thermus aquaticus) termoestable. Revolucionó biología molecular. Pfu polimerasa (alta fidelidad) para clonación',
          '<strong>Secuenciación de ADN:</strong> Didesoxinucleótidos (ddNTPs) terminadores de cadena. Método Sanger. Secuenciación de nueva generación usa polimerasas modificadas',
          '<strong>Envejecimiento:</strong> Acumulación de mutaciones en mtDNA por errores de Pol γ. Teoría mitocondrial del envejecimiento'
        ]
      }
    ]
  },
  {
    id: 'acetilcolinesterasa',
    nombre: 'Acetilcolinesterasa',
    subtitulo: 'EC 3.1.1.7 - Hidrólisis de acetilcolina',
    icono: '⚡',
    categorias: ['hidrolasas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Clasificación:</strong> Hidrolasa - Esterasa (EC 3.1.1.7). Familia de serina hidrolasas',
          '<strong>Reacción catalizada:</strong> Acetilcolina + H₂O → Colina + Acetato. Hidrólisis del neurotransmisor',
          '<strong>Localización:</strong> Hendidura sináptica (sistema nervioso), unión neuromuscular, eritrocitos',
          '<strong>Función biológica:</strong> Termina señalización colinérgica. Hidroliza acetilcolina liberada por neurona presináptica',
          '<strong>Velocidad catalítica:</strong> kcat ~10⁴ s⁻¹. Una de las enzimas más rápidas conocidas. Difusión-limitada',
          '<strong>Especificidad:</strong> Altamente específica para acetilcolina. También hidroliza butirilcolina (menor eficiencia)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo y estructura',
        datos: [
          { label: 'Tríada catalítica', value: 'Ser-203 (nucleófilo), His-447 (base general), Glu-334 (estabiliza His). Mecanismo similar a serina proteasas (quimotripsina).' },
          { label: 'Sitio aniónico periférico', value: 'Trp-86, Tyr-72, Tyr-124. Sitio de unión inicial. Atrae acetilcolina cargada positivamente (N⁺ de colina). Guía sustrato al sitio activo.' },
          { label: 'Sitio acil', value: 'Garganta del sitio activo (~20 Å de profundidad). Contiene Ser-203. Acilación durante catálisis (intermediario acetil-enzima).' },
          { label: 'Sitio de unión a colina', value: 'Trp-86, Phe-338. Interacciones aromáticas con grupo N⁺(CH₃)₃ de colina. Catión-π y interacciones hidrofóbicas.' },
          { label: 'Gorge (garganta)', value: 'Cavidad estrecha que conecta superficie con sitio catalítico. 50% de superficie es aromática. Acelera difusión de sustrato cargado.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mecanismo catalítico',
        items: [
          '<strong>Fase 1 - Acilación:</strong> Ser-203 ataca carbonilo de acetilcolina → intermediario tetraédrico → liberación de colina + acetil-enzima',
          '<strong>His-447 actúa como base:</strong> Abstrae protón de Ser-203-OH. Glu-334 orienta y estabiliza His protonada',
          '<strong>Fase 2 - Desacilación:</strong> H₂O ataca acetil-enzima → intermediario tetraédrico → liberación de acetato + regeneración de enzima',
          '<strong>Paso limitante:</strong> Desacilación (ruptura de acetil-enzima). kcat determinado por esta etapa',
          '<strong>Velocidad extrema:</strong> Limitada por difusión de sustrato/producto. Cada colisión productiva con sustrato resulta en catálisis'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Inhibidores y farmacología',
        items: [
          '<strong>Inhibidores reversibles (fármacos):</strong> Neostigmina, piridostigmina, fisostigmina. Carbamatos. Tratamiento de miastenia gravis, íleo paralítico',
          '<strong>Mecanismo de carbamatos:</strong> Carbamoilación de Ser-203. Análogo al acetil-enzima pero mucho más estable (desacilación lenta). Inhibición reversible (horas)',
          '<strong>Inhibidores irreversibles (organofosforados):</strong> Paratión, malatión (insecticidas), sarín, VX (agentes nerviosos). Fosforilan Ser-203 irreversiblemente',
          '<strong>Envejecimiento del complejo:</strong> Fosforil-enzima pierde grupo alquilo → complejo estable irreversible. Previene reactivación',
          '<strong>Reactivadores:</strong> Pralidoxima (2-PAM). Reactiva AChE fosforilada antes del "envejecimiento". Tratamiento de intoxicación por organofosforados',
          '<strong>Atropina:</strong> Antagonista muscarínico (no inhibe AChE). Bloquea receptores. Tratamiento coadyuvante en intoxicación organofosforada'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Miastenia gravis:</strong> Autoanticuerpos contra receptores nicotínicos. Debilidad muscular. Inhibidores de AChE (neostigmina, piridostigmina) aumentan [ACh] en hendidura → mejoran transmisión',
          '<strong>Enfermedad de Alzheimer:</strong> Déficit colinérgico en corteza cerebral. Inhibidores de AChE (donepezilo, rivastigmina, galantamina) mejoran cognición modestamente',
          '<strong>Intoxicación por organofosforados:</strong> Pesticidas, armas químicas. Crisis colinérgica: miosis, sialorrea, broncoespasmo, fasciculaciones, parálisis, convulsiones. Tratamiento: atropina + pralidoxima',
          '<strong>Síndrome intermedio:</strong> 24-96 h post-exposición a organofosforados. Debilidad de músculos respiratorios, proximales. Puede requerir ventilación mecánica',
          '<strong>Neuropatía retardada inducida por organofosforados (OPIDN):</strong> 2-3 semanas post-exposición. Desmielinización de nervios periféricos. Debilidad distal, parestesias',
          '<strong>Deficiencia de butirilcolinesterasa:</strong> Pseudocolinesterasa. Variantes genéticas. Apnea prolongada tras succinilcolina (relajante muscular). Screening prequirúrgico en poblaciones de riesgo',
          '<strong>Biomarcador en eritrocitos:</strong> Actividad de AChE eritrocitaria como marcador de exposición a organofosforados. Monitoreo ocupacional'
        ]
      }
    ]
  }
];
