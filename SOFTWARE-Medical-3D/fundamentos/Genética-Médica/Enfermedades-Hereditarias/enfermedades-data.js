// ═══════════════════════════════════════════════════════════
// ENFERMEDADES-DATA.JS - Base de datos de enfermedades hereditarias
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const ENFERMEDADES_DATA = [
  {
    id: 'fibrosis-quistica',
    nombre: 'Fibrosis Quística',
    subtitulo: 'Enfermedad autosómica recesiva - Gen CFTR',
    icono: '🫁',
    categorias: ['autosomica-recesiva'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Genética y epidemiología',
        items: [
          '<strong>Gen afectado:</strong> CFTR (Cystic Fibrosis Transmembrane conductance Regulator) en cromosoma 7q31.2',
          '<strong>Herencia:</strong> Autosómica recesiva. Ambos padres portadores (1/25 en europeos). Riesgo 25% por embarazo',
          '<strong>Incidencia:</strong> 1:2,500-3,500 nacidos vivos (europeos). Más alta en irlandeses (1:1,353). Rara en africanos, asiáticos',
          '<strong>Mutaciones:</strong> >2,000 mutaciones descritas. ΔF508 (p.Phe508del): 70% de alelos. Población dependiente',
          '<strong>Correlación genotipo-fenotipo:</strong> Clases I-III (sin proteína funcional): severa. Clases IV-V (función residual): más leve',
          '<strong>Frecuencia de portadores:</strong> 1:25 europeos. Screening de portadores recomendado en parejas de alto riesgo'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Clasificación de mutaciones CFTR',
        datos: [
          { label: 'Clase I - Defecto de síntesis', value: 'Nonsense, frameshift. No produce proteína CFTR. Fenotipo severo. Ejemplos: G542X, W1282X. ~10% de mutaciones.' },
          { label: 'Clase II - Defecto de procesamiento', value: 'Plegamiento incorrecto → degradación. ΔF508 (90% clase II). Lumacaftor/tezacaftor mejoran tráfico. Fenotipo severo.' },
          { label: 'Clase III - Defecto de regulación (gating)', value: 'Proteína en membrana pero canal cerrado. G551D (4% pacientes). Ivacaftor abre canal. Revolucionó tratamiento.' },
          { label: 'Clase IV - Defecto de conducción', value: 'Flujo iónico reducido. R117H, R347P. Fenotipo variable, frecuentemente más leve. Suficiencia pancreática posible.' },
          { label: 'Clase V - Síntesis reducida', value: 'Splicing aberrante, promotor débil. 3849+10kbC>T. Cantidad reducida de CFTR normal. Fenotipo leve.' },
          { label: 'Clase VI - Inestabilidad', value: 'Recambio acelerado de proteína en superficie. Raro. Fenotipo variable.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Fisiopatología',
        items: [
          '<strong>Función CFTR:</strong> Canal de cloruro regulado por AMPc. Esencial para secreciones epiteliales (pulmón, páncreas, intestino, glándulas sudoríparas)',
          '<strong>Pulmón:</strong> ↓Secreción Cl⁻, ↑absorción Na⁺/H₂O → deshidratación de superficie → moco espeso → obstrucción → infección crónica (Pseudomonas, S. aureus)',
          '<strong>Páncreas:</strong> Obstrucción ductal → destrucción acinar → insuficiencia pancreática exocrina (85-90%) → malabsorción. Diabetes (CFRD) en 20-50% adultos',
          '<strong>Intestino:</strong> Secreciones espesas → íleo meconial neonatal (10-20%), DIOS (síndrome obstrucción intestinal distal) en niños/adultos',
          '<strong>Glándulas sudoríparas:</strong> ↓Reabsorción NaCl → sudor salado (>60 mEq/L Cl⁻). Base del test diagnóstico',
          '<strong>Tracto reproductor masculino:</strong> Agenesia bilateral congénita de conductos deferentes (CBAVD) → azoospermia obstructiva (98-99% hombres infértiles)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚡ Manifestaciones clínicas',
        datos: [
          { label: 'Respiratorio', value: 'Infecciones pulmonares recurrentes, bronquiectasias, tos crónica productiva, sinusitis, pólipos nasales, hemoptisis. Colonización: S. aureus (infancia), P. aeruginosa (adolescencia/adultos), B. cepacia (mal pronóstico).' },
          { label: 'Gastrointestinal', value: 'Íleo meconial (10-20% neonatos), insuficiencia pancreática (85-90%), esteatorrea, malabsorción, retraso ponderoestatural, DIOS, prolapso rectal, cirrosis biliar (5-10%).' },
          { label: 'Endocrino/Metabólico', value: 'Diabetes relacionada con FQ (CFRD, 20-50% adultos), osteopenia/osteoporosis, alcalosis metabólica hipoclorémica (pérdida de sal en sudor).' },
          { label: 'Fertilidad', value: 'Hombres: 98% infértiles (CBAVD). Mujeres: fertilidad reducida (moco cervical espeso), embarazos posibles pero alto riesgo.' },
          { label: 'Otros', value: 'Dedos en palillo de tambor (clubbing), acropaquia, artropatía, vasculitis. Sudor salado (cristales de sal en piel).' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Diagnóstico y tratamiento',
        items: [
          '<strong>Screening neonatal:</strong> Tripsina inmunorreactiva (IRT) elevada → test genético o test de sudor. Implementado en la mayoría de países desarrollados. Diagnóstico temprano mejora pronóstico',
          '<strong>Test de sudor:</strong> Iontoforesis con pilocarpina. [Cl⁻] >60 mEq/L diagnóstico (>30 mg sudor). Gold standard. Falsos negativos raros',
          '<strong>Test genético:</strong> Panel de mutaciones comunes. Secuenciación completa de CFTR si clínica sugestiva y test negativo. Confirma diagnóstico',
          '<strong>Antibióticos:</strong> Profilaxis anti-estafilocócica en lactantes. Tratamiento agresivo de exacerbaciones. Antibióticos inhalados (tobramicina, aztreonam) para Pseudomonas',
          '<strong>Moduladores de CFTR:</strong> Ivacaftor (G551D, otras mutaciones gating). Lumacaftor/ivacaftor o tezacaftor/ivacaftor (ΔF508 heterocigoto). Elexacaftor/tezacaftor/ivacaftor (Trikafta, ΔF508 homocigoto, aprobado 2019) - revolucionario, mejora FEV1 ~10-14%',
          '<strong>Terapia de reemplazo enzimático:</strong> Enzimas pancreáticas con comidas (insuficiencia exocrina). Vitaminas liposolubles (ADEK)',
          '<strong>Fisioterapia respiratoria:</strong> Diaria. Drenaje postural, percusión, dispositivos oscilatorios (vest). DNasa inhalada (dornasa alfa) reduce viscosidad de moco',
          '<strong>Trasplante pulmonar:</strong> FEV1 <30%, hipoxemia refractaria, hemoptisis masiva. Mediana supervivencia post-trasplante ~9 años. No cura (CFTR en otros órganos)',
          '<strong>Expectativa de vida:</strong> Mediana ~47-50 años (2020, países desarrollados). En 1960 era <10 años. Trikafta puede extender significativamente'
        ]
      }
    ]
  },
  {
    id: 'huntington',
    nombre: 'Enfermedad de Huntington',
    subtitulo: 'Enfermedad autosómica dominante - Gen HTT',
    icono: '🧠',
    categorias: ['autosomica-dominante'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Genética y epidemiología',
        items: [
          '<strong>Gen afectado:</strong> HTT (huntingtina) en cromosoma 4p16.3. Expansión de repeticiones CAG',
          '<strong>Herencia:</strong> Autosómica dominante. Penetrancia completa. Hijo de afectado: 50% riesgo. Nueva mutación <1%',
          '<strong>Incidencia:</strong> 5-10:100,000 (europeos). Rara en asiáticos (<1:100,000), africanos',
          '<strong>Expansión CAG:</strong> Normal: 6-35 repeticiones. Intermedio: 27-35 (no causa enfermedad). Penetrancia reducida: 36-39. Completa: ≥40',
          '<strong>Anticipación genética:</strong> Aumento de repeticiones en transmisión → inicio más temprano en generaciones sucesivas. Sesgo paterno',
          '<strong>Inestabilidad somática:</strong> Expansión continúa en neuronas. Estriado (más afectado) tiene mayores expansiones'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Correlación CAG y fenot ipo',
        datos: [
          { label: '36-39 repeticiones', value: 'Penetrancia incompleta (60-90%). Inicio tardío (>60 años frecuente). Progresión lenta. Algunos asintomáticos toda la vida.' },
          { label: '40-50 repeticiones', value: 'Penetrancia completa. Inicio típico 30-50 años (adulto). Curso clásico 15-20 años. 60-70% variabilidad explicada por CAG.' },
          { label: '51-60 repeticiones', value: 'Inicio 20-40 años. Progresión más rápida. Síntomas psiquiátricos prominentes.' },
          { label: '>60 repeticiones', value: 'Huntington juvenil (<20 años, 5-10% casos). Rigidez (no corea), declive cognitivo rápido, convulsiones. Transmisión paterna en >90%.' },
          { label: 'Factores modificadores', value: 'Genes modificadores: ~40% variabilidad residual. MSH3, MLH1, PMS2 (reparación de ADN). Influyen en edad de inicio.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Fisiopatología',
        items: [
          '<strong>PoliQ expandida:</strong> Huntingtina mutante con tracto largo de poliglutamina. Plegamiento anormal → agregación',
          '<strong>Inclusiones nucleares:</strong> Agregados de huntingtina mutante en núcleo neuronal. Secuestran factores de transcripción, proteínas de reparación',
          '<strong>Neurodegeneración selectiva:</strong> Neuronas espinosas medianas del estriado (caudado, putamen) más vulnerables. Después: corteza cerebral',
          '<strong>Pérdida de BDNF:</strong> Huntingtina normal transporta BDNF (factor neurotrófico). Mutante pierde función → ↓BDNF en estriado → muerte neuronal',
          '<strong>Disfunción mitocondrial:</strong> Defectos en complejo II-III. ↓ATP, ↑ROS. Vulnerabilidad a excitotoxicidad',
          '<strong>Excitotoxicidad:</strong> ↑Sensibilidad a glutamato. Sobreactivación de receptores NMDA → entrada Ca²⁺ → apoptosis'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚡ Manifestaciones clínicas',
        datos: [
          { label: 'Movimientos involuntarios (corea)', value: 'Movimientos danzantes, irregulares, no repetitivos. Empeoran con estrés. Inicialmente sutiles (inquietud). Progresan a incapacitantes. Pueden disminuir en etapa tardía (rigidez).' },
          { label: 'Trastornos cognitivos', value: 'Disfunción ejecutiva, atención, memoria de trabajo. Demencia subcortical progresiva. Preservación inicial de memoria episódica. Apatía, pérdida insight.' },
          { label: 'Trastornos psiquiátricos', value: 'Depresión (40-50%, frecuentemente precede síntomas motores), irritabilidad, agresión, ansiedad, psicosis (5-10%), TOC. Suicidio: riesgo 4-6x población general.' },
          { label: 'Otros motores', value: 'Disartria, disfagia (riesgo aspiración), marcha inestable, caídas. Movimientos oculares sacádicos lentos. Rigidez en juvenil.' },
          { label: 'Progresión', value: 'Pérdida independencia funcional. Confinamiento a cama (etapa tardía). Muerte por aspiración, infección, inanición. 15-20 años desde inicio.' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Diagnóstico, asesoramiento y manejo',
        items: [
          '<strong>Diagnóstico genético:</strong> Test de CAG en HTT. ≥36 confirma diagnóstico (sintomático). Test predictivo posible en asintomáticos (requiere asesoramiento genético extenso)',
          '<strong>Neuroimagen:</strong> RM: atrofia de caudado y putamen (estriado). Pérdida de convexidad normal del núcleo caudado. Dilatación ventrículos laterales',
          '<strong>Test predictivo:</strong> Protocolo estricto (múltiples sesiones, evaluación psiquiátrica). 10-20% elegibles optan por testearse. Manejo de resultados: soporte psicológico crucial',
          '<strong>Diagnóstico prenatal/DGP:</strong> Opciones disponibles. Consideraciones éticas (enfermedad de inicio adulto). Test de exclusión (determina si cromosoma del abuelo, no CAG exacto)',
          '<strong>Tetrabenazina:</strong> Depleta dopamina. Reduce corea (~20-30% mejoría). Efectos adversos: depresión, parkinsonismo, somnolencia. Screening depresión antes/durante',
          '<strong>Antipsicóticos:</strong> Olanzapina, risperidona, aripiprazol para psicosis, irritabilidad. También reducen corea. Vigilar síndrome metabólico',
          '<strong>Antidepresivos:</strong> ISRSs (sertralina, citalopram) para depresión, ansiedad. Vigilancia de suicidalidad',
          '<strong>Apoyo multidisciplinario:</strong> Logopedia (disfagia, disartria), fisioterapia, terapia ocupacional, soporte social. Planificación anticipada de cuidados',
          '<strong>Investigación terapéutica:</strong> ASOs (oligonucleótidos antisense) para reducir huntingtina (tominersen fase 3 pausado 2021). Small molecules, terapia génica en desarrollo'
        ]
      }
    ]
  },
  {
    id: 'hemofilia-a',
    nombre: 'Hemofilia A',
    subtitulo: 'Enfermedad recesiva ligada al X - Gen F8',
    icono: '🩸',
    categorias: ['ligada-x'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Genética y epidemiología',
        items: [
          '<strong>Gen afectado:</strong> F8 (factor VIII de coagulación) en Xq28. 186 kb, 26 exones',
          '<strong>Herencia:</strong> Recesiva ligada al X. Afecta principalmente a hombres. Mujeres portadoras (generalmente asintomáticas, 10% síntomas leves)',
          '<strong>Incidencia:</strong> 1:5,000 varones nacidos vivos. Hemofilia A es 5x más común que hemofilia B (factor IX)',
          '<strong>Mutaciones:</strong> Inversión intrón 22 (45%), inversión intrón 1 (5%), mutaciones puntuales (30-40%), deleciones (5%). Nuevas mutaciones: 30%',
          '<strong>Portadoras sintomáticas:</strong> Inactivación sesgada del X (lyonización desfavorable). Niveles FVIII <40% pueden causar sangrado',
          '<strong>Detección de portadoras:</strong> Dosaje de FVIII/vWF. Test genético. Asesoramiento en familia con historial'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Clasificación por severidad',
        datos: [
          { label: 'Severa', value: 'FVIII <1% de normal. ~60% de casos. Sangrado espontáneo frecuente (hemartrosis, hematomas musculares). 20-30 episodios/año sin profilaxis. Inicio temprano (primeros años).' },
          { label: 'Moderada', value: 'FVIII 1-5%. ~15% de casos. Sangrado con trauma menor. Ocasionalmente espontáneo. 4-6 episodios/año. Diagnóstico frecuentemente en niñez.' },
          { label: 'Leve', value: 'FVIII 5-40%. ~25% de casos. Sangrado solo con trauma/cirugía significativa. Diagnóstico frecuentemente en adultos (cirugía, extracción dental). Algunos sin diagnóstico.' },
          { label: 'Correlación genotipo-fenotipo', value: 'Inversiones, nonsense, frameshift → severa. Missense → variable (depende de residuo afectado, dominio). Algunas mutaciones permiten actividad residual.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Fisiopatología',
        items: [
          '<strong>Cascada de coagulación:</strong> FVIII es cofactor de FIXa (vía intrínseca). Complejo FVIIIa-FIXa activa FX → trombina → fibrina',
          '<strong>Activación de FVIII:</strong> Trombina escinde FVIII → FVIIIa (activo). Estabilizado por vWF en circulación. Disociación de vWF al activarse',
          '<strong>Vida media de FVIII:</strong> 8-12 horas. Requiere infusiones frecuentes para profilaxis/tratamiento. FVIII recombinante de vida media extendida: 12-19 horas',
          '<strong>Hemostasia primaria normal:</strong> Plaquetas, vWF funcionan normalmente. Tiempo de sangrado normal. aPTT prolongado, PT normal',
          '<strong>Sangrado característico:</strong> Hemartrosis (rodillas, codos, tobillos). Hematomas musculares profundos. Hemorragia SNC (2-8%, alta mortalidad)',
          '<strong>Artropatía hemofílica:</strong> Sangrados articulares repetidos → sinovitis → destrucción cartílago → artritis degenerativa. Deformidad, discapacidad'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚡ Manifestaciones clínicas',
        datos: [
          { label: 'Hemartrosis', value: 'Sangrado en articulaciones (80% de sangrados). Rodilla, codo, tobillo. Dolor, hinchazón, limitación movimiento. Crónico → artropatía (sinovitis crónica, anquilosis).' },
          { label: 'Hematomas musculares', value: 'Profundos (psoas, gemelos). Síndrome compartimental (riesgo). Compresión neurovascular. Calcificación crónica posible.' },
          { label: 'Hemorragia SNC', value: '2-8% pacientes (25-30% mortalidad). Espontánea o post-trauma. Intracraneal, subdural, intraventricular. Emergencia médica.' },
          { label: 'Sangrado mucoso', value: 'Epistaxis, sangrado gingival (extracción dental), hematuria, sangrado GI. Menos común que hemartrosis/hematomas.' },
          { label: 'Cirugía/Trauma', value: 'Sangrado prolongado, masivo si no tratado. Requiere reemplazo FVIII pre/postoperatorio. Hematoma de cordón umbilical, cefalohematoma en neonatos.' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Diagnóstico y tratamiento',
        items: [
          '<strong>Pruebas de coagulación:</strong> aPTT prolongado (vía intrínseca), PT normal, TT normal. Dosaje específico de FVIII (actividad <1%, 1-5%, 5-40%)',
          '<strong>Test genético:</strong> Inversión intrón 22 (Southern blot, long-range PCR), secuenciación F8. Identifica mutación en 98%. Asesoramiento familiar, detección portadoras',
          '<strong>Concentrados de FVIII:</strong> Profilaxis (3x/semana) previene sangrado, artropatía. A demanda (episodios agudos). Recombinante (sin riesgo viral) vs plasmático',
          '<strong>FVIII de vida media extendida:</strong> Pegilación, fusión con Fc. Efalizumab, rurioctocog alfa pegol. Permite dosificación 2x/semana. Mejora adherencia',
          '<strong>Emicizumab:</strong> Anticuerpo biespecífico (FIXa-FX). Imita función de FVIIIa. SC semanal/quincenal. Revolucionario. Eficaz en pacientes con/sin inhibidores. Aprobado 2017',
          '<strong>Terapia génica:</strong> Valoctocogene roxaparvovec (Roctavian, aprobado FDA 2023). Vector AAV-FVIII. Infusión única IV. FVIII >5% sostenido (>4 años datos). Reduce sangrados ~90%. $2.9 millones/dosis',
          '<strong>Manejo de inhibidores:</strong> 20-30% severos desarrollan aloanticuerpos anti-FVIII. Dificulta tratamiento. Inducción de tolerancia inmune (ITI): infusiones altas FVIII. Agentes bypass: FVIIa recombinante, FEIBA',
          '<strong>Desmopresina (DDAVP):</strong> Libera FVIII/vWF de células endoteliales. Útil en leve/moderada (aumenta FVIII 2-5x). No en severa. Dosis: 0.3 μg/kg IV/SC',
          '<strong>Cuidados de soporte:</strong> Evitar aspirina, AINEs (antiagregantes). Vacuna hepatitis A/B. Fisioterapia articular. Acceso venoso (port-a-cath si profilaxis). ID médica'
        ]
      }
    ]
  },
  {
    id: 'anemia-falciforme',
    nombre: 'Anemia Falciforme',
    subtitulo: 'Enfermedad autosómica recesiva - Gen HBB',
    icono: '🌙',
    categorias: ['autosomica-recesiva'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Genética y epidemiología',
        items: [
          '<strong>Gen afectado:</strong> HBB (β-globina) en cromosoma 11p15.5. Mutación puntual: c.20A>T, p.Glu6Val',
          '<strong>Herencia:</strong> Autosómica recesiva. HbSS (homocigoto) = anemia falciforme. HbAS (heterocigoto) = rasgo falciforme (portador)',
          '<strong>Incidencia:</strong> 1:365 afroamericanos. Alta en África subsahariana, India, Mediterráneo, Medio Oriente',
          '<strong>Ventaja heterocigota:</strong> Protección contra malaria (P. falciparum). Selección balanceada mantiene alelo en zonas endémicas',
          '<strong>Variantes compuestas:</strong> HbSC (HbS + HbC), HbS/β-talasemia. Fenotipos variables, generalmente más leves que HbSS',
          '<strong>Screening neonatal:</strong> Universal en USA desde 2006. HPLC, electroforesis, IEF. Permite inicio temprano de profilaxis'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Fisiopatología molecular',
        datos: [
          { label: 'HbS polimerización', value: 'Glu6Val crea parche hidrofóbico. En desoxigenación: HbS polimeriza (fibras táctoides). Distorsión de eritrocito → forma de hoz. Daño membrana, rigidez.' },
          { label: 'Factores que favorecen polimerización', value: 'Hipoxia, acidosis, deshidratación, ↑2,3-BPG, ↑temperatura, ↑[HbS]. Tiempo de tránsito capilar (0.75 seg) vs tiempo polimerización (1-2 seg): crítico.' },
          { label: 'HbF protectora', value: 'Hemoglobina fetal (α₂γ₂) no participa en polímeros HbS. Interfiere con polimerización. Pacientes con ↑HbF (15-30%) tienen curso más leve. Base de hidroxiurea.' },
          { label: 'Vaso-oclusión', value: 'Eritrocitos falciformes ocluyen microcirculación. Adherencia aumentada a endotelio (↑moléculas adhesión). Activación leucocitos, plaquetas. Isquemia tisular.' },
          { label: 'Hemólisis crónica', value: 'Vida media eritrocitos: 10-20 días (vs 120 normal). Hemólisis intravascular/extravascular. Liberación Hb libre → consume NO → vasoconstricción, disfunción endotelial.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Manifestaciones clínicas',
        items: [
          '<strong>Crisis vaso-oclusivas (CVO):</strong> Episodios agudos de dolor severo. Huesos, tórax, abdomen. Desencadenantes: infección, deshidratación, frío, estrés. Tratamiento: hidratación IV, analgesia (opioides)',
          '<strong>Síndrome torácico agudo (STA):</strong> Infiltrado pulmonar + fiebre/hipoxia/dolor. Vaso-oclusión pulmonar, infección, embolia grasa. Segunda causa de hospitalización. 3% mortalidad. Tratamiento: O₂, antibióticos, transfusión',
          '<strong>ACV (accidente cerebrovascular):</strong> 10% niños <20 años sin profilaxis. Isquémico (niños) o hemorrágico (adultos). Screening: Doppler transcraneal. Profilaxis: transfusiones crónicas',
          '<strong>Secuestro esplénico:</strong> Sangre acumulada en bazo → hipovolemia, anemia aguda. Emergencia. Más común <5 años. Esplenectomía si recurrente',
          '<strong>Dactilitis (hand-foot syndrome):</strong> Primera manifestación (6-24 meses). Dolor, hinchazón manos/pies. Infartos óseos (metacarpos, metatarsos)',
          '<strong>Priapismo:</strong> Erección dolorosa prolongada. 30-45% hombres. Isquémico (bajo flujo). Riesgo de disfunción eréctil permanente. Emergencia urológica'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚡ Complicaciones crónicas',
        datos: [
          { label: 'Nefropatía', value: 'Hiperfiltración → proteinuria → insuficiencia renal crónica (30% adultos). Necrosis papilar. Hematuria. Uso de IECA retrasa progresión.' },
          { label: 'Retinopatía', value: 'Proliferativa (neovascularización) en 10-20%. Riesgo de hemorragia vítrea, desprendimiento. Screening oftalmológico anual. Fotocoagulación láser.' },
          { label: 'Hipertensión pulmonar', value: '10-30% adultos (eco). 6-11% por cateterismo. Insuficiencia tricúspidea. Asociada a ↑mortalidad. Tratamiento: hidroxiurea, transfusiones.' },
          { label: 'Úlceras en piernas', value: '10-20% adultos. Tobillo, maléolo medial. Crónicas, recurrentes. Difíciles de curar. Vendajes, desbridamiento, transfusiones.' },
          { label: 'Sobrecarga de hierro', value: 'Transfusiones crónicas → hemocromatosis secundaria. Cirrosis, diabetes, cardiomiopatía. Quelación: deferasirox, deferoxamina.' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Tratamiento y prevención',
        items: [
          '<strong>Hidroxiurea:</strong> Aumenta HbF (↓polimerización). ↓CVO (50%), ↓STA, ↓mortalidad. Dosis: 15-35 mg/kg/día. Monitoreo: hemograma (mielosupresión). Indicado en todo paciente severo >9 meses',
          '<strong>L-glutamina:</strong> Reduce estrés oxidativo. ↓CVO. Aprobado FDA 2017. Dosis: 5-15 g VO BID según peso. Complementario a hidroxiurea',
          '<strong>Crizanlizumab:</strong> Anticuerpo anti-P-selectina. Bloquea adhesión célula-endotelio. ↓CVO. IV mensual. Aprobado 2019. Dosis: 5 mg/kg',
          '<strong>Voxelotor:</strong> Aumenta afinidad Hb por O₂. Reduce polimerización. ↑Hemoglobina. VO diario. Aprobado 2019. 1500 mg/día',
          '<strong>Transfusiones crónicas:</strong> Profilaxis ACV (Doppler anormal >200 cm/s). Prevención recurrencia ACV. Mantener HbS <30%. Riesgo: aloinmunización, sobrecarga hierro',
          '<strong>Trasplante de médula ósea:</strong> Único tratamiento curativo. Indicaciones: ACV, CVO frecuentes, STA recurrente. Donante HLA compatible (hermano). Supervivencia libre enfermedad >90%. Mortalidad 5-10%',
          '<strong>Terapia génica:</strong> Lovotibeglogene autotemcel (Lovo-cel, aprobado FDA 2023). Lentivirus con gen HBB-T87Q. Infusión única. HbF funcional >20%. ↓CVO. Seguimiento largo plazo necesario',
          '<strong>Profilaxis antibiótica:</strong> Penicilina VO (125 mg BID <3 años, 250 mg BID 3-5 años). Previene sepsis neumocócica (asplenia funcional). Vacunas: neumococo, H. influenzae, meningococo',
          '<strong>Manejo del dolor:</strong> Escalera analgésica OMS. AINEs, opioides. Evitar meperidina (normeperidina → convulsiones). PCA (analgesia controlada paciente) en hospitalizados'
        ]
      }
    ]
  }
];
