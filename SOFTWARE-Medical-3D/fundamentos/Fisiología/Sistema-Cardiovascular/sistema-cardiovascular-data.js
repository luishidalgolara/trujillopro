// ═══════════════════════════════════════════════════════════
// SISTEMA-CARDIOVASCULAR-DATA.JS - Base de datos sobre Sistema Cardiovascular
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const SISTEMA_CARDIOVASCULAR_DATA = [
  {
    id: 'corazon-estructura',
    nombre: 'Anatomía y Estructura del Corazón',
    subtitulo: 'Organización anatómica y arquitectura cardíaca',
    icono: '❤️',
    categorias: ['anatomia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Ubicación:</strong> Mediastino medio. Apex apunta ínfero-anterior-izquierda. 2/3 en hemitórax izquierdo. Entre pulmones, sobre diafragma',
          '<strong>Dimensiones:</strong> Adulto: ~12 cm largo, ~9 cm ancho, ~6 cm grosor. Peso: 250-350 g (♂), 200-300 g (♀). Tamaño aproximado de puño cerrado',
          '<strong>Cavidades:</strong> 4 cámaras. Atrios (aurícula derecha e izquierda, paredes delgadas). Ventrículos (derecho e izquierdo, paredes gruesas)',
          '<strong>Pericardio:</strong> Saco fibro-seroso. Pericardio fibroso (externo, resistente) y seroso (parietal y visceral/epicardio). Líquido pericárdico (~15-50 mL)',
          '<strong>Pared cardíaca:</strong> 3 capas. Epicardio (serosa), miocardio (muscular, contráctil), endocardio (endotelial, recubre cavidades)',
          '<strong>Septum interventricular:</strong> Pared muscular separa ventrículos. Porción membranosa (superior, 1 cm) y muscular (inferior, gruesa). Defectos → CIV (comunicación interventricular)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Válvulas cardíacas',
        datos: [
          { label: 'Válvula tricúspide', value: 'Atrioventricular derecha. 3 valvas (anterior, posterior, septal). Cuerdas tendinosas → músculos papilares. Área normal ~7-9 cm². Previene regurgitación AD → VD. Insuficiencia en hipertensión pulmonar.' },
          { label: 'Válvula pulmonar', value: 'Semilunar. Salida VD → arteria pulmonar. 3 valvas (anterior, izquierda, derecha). Sin cuerdas tendinosas. Apertura en sístole. Estenosis congénita común. Reemplazo menos frecuente que aórtica.' },
          { label: 'Válvula mitral', value: 'Atrioventricular izquierda. 2 valvas (anterior/aórtica y posterior). Anillo fibroso. Cuerdas → 2 músculos papilares (anterolateral, posteromedial). Área normal ~4-6 cm². Prolapso mitral: 2-3% población.' },
          { label: 'Válvula aórtica', value: 'Semilunar. Salida VI → aorta. 3 valvas (coronariana derecha, coronariana izquierda, no coronariana). Ostium coronarios en senos de Valsalva. Estenosis aórtica: causa #1 de reemplazo valvular.' },
          { label: 'Anillo fibroso', value: 'Esqueleto cardíaco. Tejido conectivo denso. Inserción de válvulas AV. Separación eléctrica atrios-ventrículos. Anclaje de miocitos. Calcificación en edad avanzada.' },
          { label: 'Cuerdas tendinosas', value: 'Cordones fibrosos. Valvas AV → músculos papilares. Previenen eversión valvular en sístole. Ruptura (isquemia, trauma) → regurgitación aguda severa.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Irrigación coronaria',
        items: [
          '<strong>Arteria coronaria derecha (ACD):</strong> Ostium en seno aórtico derecho. Surco AV derecho. Ramas: AM (arteria marginal), DP (descendente posterior en 70%). Irriga: AD, VD, nodo SA (60%), nodo AV (90%)',
          '<strong>Arteria coronaria izquierda (ACI):</strong> Tronco coronario izquierdo (1-2 cm). Bifurcación: DA (descendente anterior) y Cx (circunfleja). Irriga: AI, VI, septum anterior',
          '<strong>Arteria descendente anterior (DA):</strong> Surco interventricular anterior. Ramas septales (penetran septum) y diagonales (pared libre VI). Irriga 2/3 anteriores del septum, pared anterior VI, apex',
          '<strong>Arteria circunfleja (Cx):</strong> Surco AV izquierdo. Ramas marginales obtusas (OM). Irriga: pared lateral VI, AI. Dominancia izquierda (10%): Cx da DP',
          '<strong>Dominancia coronaria:</strong> Arteria que da ramas a pared posterior/inferior. Derecha (70%), izquierda (10%), codominante (20%). Determina área de infarto en oclusión',
          '<strong>Circulación colateral:</strong> Conexiones interarteriales. Se desarrollan con estenosis progresiva. Protección relativa en enfermedad coronaria crónica. Insuficiente en oclusión aguda'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Sistema de conducción',
        items: [
          '<strong>Nodo sinusal (SA):</strong> Marcapasos natural. Unión de VCS y AD. Células P (pacemaker). Automaticidad: 60-100 lpm. Inervación: simpática (↑frecuencia) y parasimpática (↓frecuencia)',
          '<strong>Vías internodales:</strong> Bachmann (preferencial a AI), anterior, media, posterior. Conducción atrial rápida (~1 m/s). Contribuyen a contracción atrial sincrónica',
          '<strong>Nodo atrioventricular (AV):</strong> Triángulo de Koch (septum atrial). Única conexión eléctrica normal atrios-ventrículos. Retraso fisiológico (~100 ms). Permite llenado ventricular',
          '<strong>Haz de His:</strong> Porción penetrante septum membranoso. Bifurcación en rama derecha e izquierda. Conducción rápida (Purkinje)',
          '<strong>Ramas del haz:</strong> Rama derecha (VD, delgada). Rama izquierda (fascículo anterior y posterior). Distribución subendocárdica. Fibras de Purkinje',
          '<strong>Sistema de Purkinje:</strong> Red subendocárdica. Células especializadas. Conducción muy rápida (2-4 m/s). Despolarización ventrículo endocardio → epicardio. Automaticidad: 20-40 lpm (escape)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Infarto agudo de miocardio (IAM):</strong> Oclusión coronaria → necrosis miocárdica. STEMI (elevación ST, oclusión transmural) vs NSTEMI. Biomarcadores: troponina I/T (↑3-12 h, pico 24 h). Tx: reperfusión <12 h (ICP primaria, fibrinólisis)',
          '<strong>Territorios de infarto:</strong> Anterior/apical (DA), inferior (ACD o Cx), lateral (Cx), posterior (ACD dominante). Complicaciones: insuficiencia cardíaca, arritmias, ruptura libre/septal, insuficiencia mitral',
          '<strong>Estenosis aórtica:</strong> Calcificación degenerativa (>65 años), bicúspide congénita, fiebre reumática. Gradiente medio >40 mmHg (severa). Síntomas: angina, síncope, IC. Tx: TAVI (transcatéter) o cirugía',
          '<strong>Insuficiencia mitral:</strong> Degenerativa (prolapso, rotura cuerdas), isquémica (disfunción músculos papilares), reumática. Aguda vs crónica. Ecocardiografía: jet regurgitante, vena contracta. Tx: reparación > reemplazo',
          '<strong>Comunicación interventricular (CIV):</strong> Defecto congénito más común (30-40%). Perimembranosa (80%) vs muscular. Shunt I→D. Cierre espontáneo (muscular pequeña). Cirugía si Qp:Qs >2:1',
          '<strong>Taponamiento cardíaco:</strong> Acumulación pericárdica rápida. Colapso diastólico AD/VD. Tríada de Beck: hipotensión, ingurgitación yugular, tonos apagados. Pulso paradójico >10 mmHg. Tx urgente: pericardiocentesis',
          '<strong>Pericarditis:</strong> Inflamación pericárdica. Dolor pleurítico (mejora inclinación anterior), roce pericárdico, elevación ST difusa. Causas: viral, post-IAM (Dressler), uremia, autoinmune. Tx: AINEs, colchicina',
          '<strong>Miocardiopatía hipertrófica:</strong> Genética (sarcómeros, MYH7, MYBPC3). Hipertrofia septal asimétrica. Obstrucción tracto salida VI (HOCM). Muerte súbita (jóvenes atletas). Tx: β-bloqueantes, miectomía, alcohol septal'
        ]
      }
    ]
  },
  {
    id: 'ciclo-cardiaco',
    nombre: 'Ciclo Cardíaco y Hemodinámica',
    subtitulo: 'Eventos mecánicos y eléctricos del corazón',
    icono: '🔄',
    categorias: ['fisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Duración:</strong> ~0.8 s (75 lpm). Sístole ~0.3 s (1/3). Diástole ~0.5 s (2/3). Mayor frecuencia acorta principalmente diástole',
          '<strong>Fases del ciclo:</strong> Diástole (llenado ventricular). Sístole (contracción y eyección). Coordinación aurículo-ventricular precisa',
          '<strong>Volúmenes ventriculares:</strong> Volumen telediastólico (VTD/EDV ~120-140 mL). Volumen telesistólico (VTS/ESV ~50-60 mL). Volumen sistólico (VS = VTD - VTS ~70 mL)',
          '<strong>Fracción de eyección (FE):</strong> FE = VS/VTD × 100. Normal: 55-70%. Reducida <40% (IC sistólica). Preservada ≥50% (IC diastólica)',
          '<strong>Gasto cardíaco (GC):</strong> GC = VS × FC. Normal: 5-6 L/min en reposo. Índice cardíaco (IC) = GC/superficie corporal. Normal: 2.5-4 L/min/m²',
          '<strong>Presiones intracardíacas:</strong> AD: 2-8 mmHg. VD: 15-30/0-8 mmHg. AP: 15-30/4-12 mmHg. AI: 4-12 mmHg. VI: 100-140/3-12 mmHg. Ao: 100-140/60-90 mmHg'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Fases del ciclo cardíaco',
        datos: [
          { label: 'Llenado ventricular rápido', value: 'Inicio diástole. Apertura válvulas AV. Flujo pasivo atrio → ventrículo. 70% del llenado. Gradiente presión AI-VI. Tercer ruido (S3) si flujo aumentado/compliance↓.' },
          { label: 'Diastasis', value: 'Llenado lento. Presiones AI y VI equalizadas. Flujo continuo pero lento desde venas. Acortada en taquicardia. Representa ~15% del llenado total.' },
          { label: 'Contracción atrial', value: 'Sístole atrial. Onda P del ECG. "Patada atrial": 10-15% del llenado (hasta 40% en IC o hipertrofia VI). Cuarto ruido (S4) si ventrículo rígido. Pérdida en FA.' },
          { label: 'Contracción isovolumétrica', value: 'Inicio sístole ventricular. Complejo QRS. Válvulas AV cerradas (S1), aórtica/pulmonar aún cerradas. Presión VI↑ sin cambio volumen. Máxima dP/dt. ~50 ms.' },
          { label: 'Eyección rápida', value: 'Apertura válvulas semilunares. 2/3 del VS eyectado. Presión aórtica sube. Flujo aórtico máximo: ~500 mL/s. Pico presión VI: 120 mmHg.' },
          { label: 'Eyección lenta', value: 'Final sístole. Presión VI y Ao caen. Eyección continúa pero desacelera. Fin onda T del ECG. Escotadura dícrotica (cierre válvula aórtica).' },
          { label: 'Relajación isovolumétrica', value: 'Válvulas semilunares cerradas (S2), AV aún cerradas. Presión VI cae rápidamente sin cambio volumen. Relajación activa (ATP-dependiente). ~80 ms. Presión VI < AI → apertura mitral.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Curvas de presión-volumen',
        items: [
          '<strong>Loop P-V del VI:</strong> Eje X: volumen VI. Eje Y: presión VI. Loop rectangular sentido horario. Área del loop = trabajo sistólico del ventrículo',
          '<strong>RPVD (relación presión-volumen diastólica):</strong> Curva llenado pasivo. Pendiente = compliance ventricular. Hipertrofia/fibrosis → shift izquierda/arriba (↓compliance)',
          '<strong>RPVS (relación presión-volumen sistólica):</strong> Línea recta máxima presión al final sístole. Pendiente (Ees) = elastancia = contractilidad. Inotrópicos + → Ees↑',
          '<strong>Precarga:</strong> VTD o presión telediastólica. Determina estiramiento de sarcómero. Frank-Starling: ↑precarga → ↑VS (hasta cierto punto)',
          '<strong>Poscarga:</strong> Resistencia a eyección. Aproximado por presión aórtica. ↑poscarga → ↓VS (si contractilidad constante). Hipertensión → ↑trabajo cardíaco',
          '<strong>Contractilidad (inotropismo):</strong> Fuerza de contracción independiente de precarga/poscarga. Simpático (β1) → ↑contractilidad. IC → ↓contractilidad. Medida: dP/dt máx, Ees'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Ruidos cardíacos y fonocardiograma',
        items: [
          '<strong>S1 (primer ruido):</strong> Cierre válvulas AV (mitral > tricúspide). Inicio sístole. Componentes M1-T1 (normal <30 ms). Aumentado en estenosis mitral. Disminuido en insuficiencia mitral',
          '<strong>S2 (segundo ruido):</strong> Cierre válvulas semilunares. Componentes A2 (aórtica) y P2 (pulmonar). Desdoblamiento fisiológico en inspiración (↑retorno VD). Patológico: fijo (CIA), paradójico (bloqueo rama izquierda)',
          '<strong>S3 (tercer ruido):</strong> Llenado ventricular rápido. "Galope ventricular". Normal en niños/jóvenes. Patológico >40 años: IC sistólica, sobrecarga volumen. Coincide con onda Y descendente',
          '<strong>S4 (cuarto ruido):</strong> Contracción atrial contra ventrículo rígido. "Galope atrial". Siempre patológico. Hipertensión, hipertrofia VI, IAM. Ausente en FA',
          '<strong>Soplos sistólicos:</strong> Eyección (estenosis aórtica/pulmonar, crecendo-decrescendo) vs regurgitación (insuficiencia mitral/tricúspide, holosistólico)',
          '<strong>Soplos diastólicos:</strong> Regurgitación aórtica/pulmonar (decrescendo). Estenosis mitral/tricúspide (retumbo, refuerzo presistólico). Siempre patológicos'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Insuficiencia cardíaca con FE reducida (IC-FEr):</strong> FE <40%. Disfunción sistólica. Dilatación ventricular. Causas: IAM, miocardiopatía dilatada, valvulopatía. Tx: IECA/ARA, β-bloqueantes, SGLT2i, ARM, diuréticos',
          '<strong>Insuficiencia cardíaca con FE preservada (IC-FEp):</strong> FE ≥50%. Disfunción diastólica. Relajación/compliance↓. Causas: HTA, diabetes, edad, obesidad. Tx: diuréticos, control PA, SGLT2i (empagliflozina)',
          '<strong>Choque cardiogénico:</strong> GC↓↓ → hipoperfusión. Causas: IAM extenso, miocarditis, valvulopatía aguda. Criterios: PAS <90 mmHg, IC <1.8 L/min/m², PCWP >18 mmHg. Tx: inotrópicos, soporte mecánico (IABP, ECMO, Impella)',
          '<strong>Cateterismo cardíaco derecho:</strong> Swan-Ganz. Medición presiones: AD, VD, AP, PCWP (wedge ~presión AI). Termodilución → GC. Cálculo resistencias. Diagnóstico hipertensión pulmonar, IC',
          '<strong>Ecocardiografía:</strong> No invasiva. FE (Simpson), función diastólica (E/A, e\'), valvulopatías (Doppler), derrame pericárdico. Strain (deformación miocárdica). TEE (transesofágico) para válvulas',
          '<strong>Ley de Frank-Starling:</strong> ↑precarga → ↑VS (hasta plateau). Mecanismo: longitud óptima sarcómero → ↑sensibilidad Ca²⁺. IC → curva aplanada. Sobrecarga volumen → edema pulmonar',
          '<strong>Adaptación al ejercicio:</strong> FC↑ (3-4x), VS↑ (~1.5x), GC↑ (5-6x). Redistribución: vasoconstricción esplácnica, vasodilatación muscular. Entrenamiento → ↑VS reposo, ↓FC reposo (bradicardia atleta)',
          '<strong>Miocardiopatía de estrés (Takotsubo):</strong> Disfunción apical transitoria. Mimetiza IAM. Estrés emocional/físico intenso. Catecolaminas↑. Recuperación completa en semanas. Mujeres postmenopáusicas'
        ]
      }
    ]
  },
  {
    id: 'potencial-accion-cardiaco',
    nombre: 'Potencial de Acción Cardíaco',
    subtitulo: 'Electrofisiología del miocardio',
    icono: '⚡',
    categorias: ['electrofisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Duración:</strong> 200-400 ms (vs 1-2 ms en neurona). Permite contracción sostenida. Varía según región: Purkinje >ventrículo >atrio >nodo SA',
          '<strong>Meseta:</strong> Característica única del PA cardíaco. Fase 2. Entrada de Ca²⁺ balanceada con salida de K⁺. Previene tetania',
          '<strong>Período refractario largo:</strong> Absoluto ~200 ms, relativo ~50 ms adicionales. Protege contra reentrada. Permite llenado diastólico',
          '<strong>Heterogeneidad regional:</strong> Epicardio vs endocardio vs células M. Diferencias en duración PA y corrientes iónicas. Dispersión de repolarización',
          '<strong>Acoplamiento excitación-contracción:</strong> PA → entrada Ca²⁺ → liberación Ca²⁺ del retículo sarcoplásmico (CICR) → contracción',
          '<strong>Automaticidad:</strong> Células marcapasos generan PA espontáneos. Nodo SA: 60-100 lpm. Nodo AV: 40-60 lpm. Purkinje: 20-40 lpm'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Fases del potencial de acción ventricular',
        datos: [
          { label: 'Fase 0 - Despolarización', value: 'Apertura rápida de canales Nav1.5. Entrada masiva de Na⁺. Vm: -90 → +20 mV. dV/dt máx ~400 V/s. Bloqueados por clase I antiarrítmicos (quinidina, lidocaína, flecainida).' },
          { label: 'Fase 1 - Repolarización inicial', value: 'Inactivación Nav. Apertura transitoria de Ito (corriente transitoria K⁺). Repolarización parcial a ~0 mV. Prominente en epicardio. Más corta en endocardio.' },
          { label: 'Fase 2 - Meseta', value: 'Entrada Ca²⁺ (Cav1.2, L-type) balanceada con salida K⁺ (IKs, IKr). Duración ~200-300 ms. Entrada Ca²⁺ dispara liberación Ca²⁺ RS. Acoplamiento E-C. Bloqueadores Ca²⁺: verapamilo, diltiazem.' },
          { label: 'Fase 3 - Repolarización', value: 'Cierre canales Ca²⁺. Aumento de corrientes K⁺ (IKr, IKs, IK1). Vm retorna a reposo. IKr (HERG/Kv11.1): target de múltiples drogas → QT largo. IKs: estimulado por simpático.' },
          { label: 'Fase 4 - Reposo', value: 'Vm estable ~-90 mV. IK1 (Kir2.1) domina. Bomba Na⁺/K⁺-ATPasa restaura gradientes. Intercambiador Na⁺/Ca²⁺ (NCX) extruye Ca²⁺. En marcapasos: despolarización diastólica espontánea.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Células marcapasos (nodo SA)',
        items: [
          '<strong>Potencial de reposo inestable:</strong> No hay meseta. Vm oscila entre -60 mV (máximo negativo) y +10 mV (overshoot). Sin fase 0 rápida',
          '<strong>Corriente funny (If):</strong> Canales HCN (hyperpolarization-activated cyclic nucleotide-gated). Activos en hiperpolarización. Entrada Na⁺ mixta. Responsable de despolarización diastólica. Ivabradina bloquea',
          '<strong>Corriente Ca²⁺ T-type (Cav3.1):</strong> Bajo umbral. Activa en -50 mV. Contribuye a despolarización diastólica tardía. Transición a L-type',
          '<strong>Corriente Ca²⁺ L-type (Cav1.3):</strong> Fase 0 en marcapasos (no Nav). Entrada Ca²⁴ domina despolarización. Más lenta que Nav → upstroke gradual',
          '<strong>Corrientes K⁺:</strong> IKr, IKs. Repolarización. Balance con entrada Ca²⁺. Modulación autonómica: simpático ↓IK (↑FC), parasimpático ↑IK (↓FC)',
          '<strong>Modulación autonómica de FC:</strong> Simpático (β1) → cAMP → ↑If, ↑ICaL → ↑automaticidad. Parasimpático (M2) → ↓cAMP, ↑IKACh → ↓automaticidad. ACh domina en reposo'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Propagación del impulso',
        items: [
          '<strong>Conducción atrial:</strong> Velocidad ~1 m/s. Haces internodales preferentes. Conducción anisotrópica (más rápida longitudinal que transversal)',
          '<strong>Retraso nodo AV:</strong> Conducción lenta (~0.05 m/s). PA tipo Ca²⁺-dependiente. Permite llenado ventricular. Modulación autonómica: simpático ↑velocidad, parasimpático ↓velocidad',
          '<strong>Conducción His-Purkinje:</strong> Muy rápida (2-4 m/s). Cells especializadas con gap junctions abundantes (Cx40, Cx43). Distribución rápida a ventrículos',
          '<strong>Conducción ventricular:</strong> ~0.3-0.5 m/s. Endocardio → epicardio. Apex → base. Coordinación espaciotemporal precisa para eyección eficiente',
          '<strong>Acoplamiento celular:</strong> Gap junctions (conexinas). Cx43 (ventrículos), Cx40 (atrios, Purkinje), Cx45 (nodo AV). Permeables a iones y pequeñas moléculas',
          '<strong>Anisotropía cardíaca:</strong> Conducción más rápida paralela a fibras que perpendicular. Ratio ~3:1. Sustrato para reentrada. Fibrosis ↑anisotropía'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Síndrome QT largo (SQTL):</strong> Congénito (canalopatías) o adquirido (drogas, electrolitos). Mutaciones: KCNQ1 (LQT1), KCNH2/HERG (LQT2), SCN5A (LQT3). QTc >470 ms (♀) o >450 ms (♂). Torsades de pointes, muerte súbita. Tx: β-bloqueantes, DAI',
          '<strong>Síndrome Brugada:</strong> Canalopatía (SCN5A 70% casos). Patrón ECG: elevación ST V1-V3 tipo 1. Fibrilación ventricular nocturna. Asiáticos, hombres jóvenes. Muerte súbita. Tx: DAI',
          '<strong>Bloqueo AV:</strong> Primer grado (PR >200 ms). Segundo grado: Mobitz I (Wenckebach, progresión PR) vs II (PR fijo, QRS caídos). Tercer grado (disociación completa). Tx: marcapasos si sintomático',
          '<strong>Síndrome del seno enfermo:</strong> Disfunción nodo SA. Bradicardia, pausas, incompetencia cronotrópica. Síndrome bradi-taqui (FA paroxística + bradicardia). Tx: marcapasos',
          '<strong>Fibrilación atrial (FA):</strong> Despolarización atrial desorganizada (>300 lpm). Múltiples frentes de onda. RR irregular. Pérdida contracción atrial. Embolismo (ictus). Anticoagulación (CHA₂DS₂-VASc). Cardioversión, ablación',
          '<strong>Taquicardia ventricular (TV):</strong> ≥3 latidos ventriculares >100 lpm. Monomórfica (QRS uniforme, sustrato cicatriz) vs polimórfica (QRS variable). Sostenida >30 s. Riesgo degeneración a FV. Tx: amiodarona, cardioversión, DAI',
          '<strong>Antiarrítmicos clasificación Vaughan Williams:</strong> Clase I (bloqueadores Nav), II (β-bloqueantes), III (prolongan repolarización, K⁺), IV (bloqueadores Ca²⁺). Ia: quinidina, Ib: lidocaína, Ic: flecainida',
          '<strong>Digoxina:</strong> Inhibidor Na⁺/K⁺-ATPasa. ↑Ca²⁺ intracelular → inotropismo+. ↑tono vagal → ↓conducción AV. IC con FA. Margen terapéutico estrecho. Intoxicación: arritmias (bidireccional TV)'
        ]
      }
    ]
  },
  {
    id: 'regulacion-presion',
    nombre: 'Regulación de la Presión Arterial',
    subtitulo: 'Control a corto y largo plazo de la PA',
    icono: '📊',
    categorias: ['regulacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Presión arterial:</strong> PA = GC × RVS (resistencia vascular sistémica). GC = VS × FC. RVS determinada por arteriolas',
          '<strong>Presión normal:</strong> PAS <120 mmHg, PAD <80 mmHg. Elevada: 120-129/<80. HTA estadio 1: 130-139/80-89. Estadio 2: ≥140/90',
          '<strong>Presión de perfusión:</strong> PP = PAM - presión venosa. PAM (presión arterial media) = PAD + (PAS-PAD)/3 ≈ PAD + 1/3 PP',
          '<strong>Control a corto plazo:</strong> Segundos-minutos. Neural (barorreceptores, quimiorreceptores). Humoral rápido (catecolaminas)',
          '<strong>Control a mediano plazo:</strong> Minutos-horas. Sistema renina-angiotensina-aldosterona (SRAA). Péptidos natriuréticos',
          '<strong>Control a largo plazo:</strong> Días-semanas. Regulación renal de volumen (natriuresis por presión). Remodelado vascular'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos de control de PA',
        datos: [
          { label: 'Barorreceptores', value: 'Seno carotídeo (IX par, Hering) y cayado aórtico (X par). Mecanorreceptores de estiramiento. ↑PA → ↑disparo → ↑parasimpático, ↓simpático → ↓FC, ↓contractilidad, vasodilatación. Respuesta rápida (s). Adaptación (reseteo) en HTA crónica.' },
          { label: 'Quimiorreceptores', value: 'Cuerpos carotídeos y aórticos. Detectan ↓PO₂, ↑PCO₂, ↓pH. Hipoxia → ↑simpático → vasoconstricción, ↑FC. Importante en apnea del sueño, EPOC, altitud. Contribuyen a HTA en enfermedad renal crónica.' },
          { label: 'Sistema simpático', value: 'Vasoconstrictor. α1-receptores (arteriolas) → vasoconstricción → ↑RVS. β1-receptores (corazón) → ↑FC, ↑contractilidad → ↑GC. Liberación norepinefrina. Médula adrenal libera epinefrina (80%) y NE (20%).' },
          { label: 'Sistema parasimpático', value: 'Vago (X par). Actúa principalmente en corazón (nodo SA, AV). ACh en receptores M2 → ↓FC, ↓conducción AV. Poco efecto en vasculatura. Tono vagal dominante en reposo (FC ~70 vs intrínseca ~100).' },
          { label: 'Renina-angiotensina-aldosterona', value: '↓PA renal → liberación renina (células yuxtaglomerulares) → angiotensinógeno → Ang I → ECA (pulmón) → Ang II. Ang II: vasoconstricción potente, libera aldosterona (retención Na⁺/H₂O), sed, ADH. IECA y ARA bloquean.' },
          { label: 'Péptidos natriuréticos', value: 'ANP (atrial), BNP (ventricular), CNP (endotelial). Liberados por distensión. Efectos: natriuresis, diuresis, vasodilatación, ↓renina, ↓aldosterona. Contraregulan SRAA. BNP marcador de IC. Neprilisina degrada (sacubitrilo inhibe).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Regulación renal a largo plazo',
        items: [
          '<strong>Natriuresis por presión:</strong> ↑PA → ↑perfusión renal → ↓reabsorción Na⁺ → ↑excreción Na⁺ y H₂O → ↓volumen → ↓PA. Mecanismo dominante a largo plazo (Guyton)',
          '<strong>Renina:</strong> Liberada por: ↓perfusión arteriola aferente (barorreceptores renales), ↓NaCl en mácula densa, ↑simpático (β1). Enzima limitante del SRAA',
          '<strong>Angiotensina II:</strong> Vasoconstricción (AT1R). Arteriola eferente > aferente → ↑filtración glomerular. Reabsorción Na⁺ (túbulo proximal). Liberación aldosterona (zona glomerulosa suprarrenal)',
          '<strong>Aldosterona:</strong> Mineralocorticoide. Receptor nuclear en túbulo colector. Aumenta ENaC (canal Na⁺ apical) y Na⁺/K⁺-ATPasa (basolateral). Retención Na⁺ → expansión volumen. Antagonistas: espironolactona, eplerenona',
          '<strong>ADH (vasopresina):</strong> Neurohipófisis. Liberada por: osmolaridad↑, volumen↓, Ang II. V2R (túbulo colector) → acuaporina-2 → reabsorción H₂O. V1R (vasos) → vasoconstricción',
          '<strong>Sistema calicreína-cinina:</strong> Vasodilatador. Bradicinina (BK). ECA degrada BK. IECA → ↑BK → tos (10-15% pacientes), angioedema (raro). Rol protector renal y cardíaco'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Autorregulación vascular',
        items: [
          '<strong>Autorregulación miogénica:</strong> Estiramiento arteriolar → despolarización músculo liso → entrada Ca²⁺ → contracción. Mantiene flujo constante (60-160 mmHg). Cerebro, riñón, corazón',
          '<strong>Autorregulación metabólica:</strong> Hipoxia/metabolitos (adenosina, K⁺, H⁺, CO₂, lactato) → vasodilatación. Hiperemia activa (ejercicio) y reactiva (post-oclusión)',
          '<strong>Óxido nítrico (NO):</strong> eNOS en endotelio. Liberado por flujo (shear stress), ACh, bradicinina. Difunde a músculo liso → guanilato ciclasa → cGMP → relajación. Disfunción endotelial → ↓NO → HTA',
          '<strong>Endotelina:</strong> Vasoconstrictor más potente. ET-1 liberado por endotelio lesionado, hipoxia, Ang II. ETₐ (músculo liso) → vasoconstricción. ET_B (endotelio) → NO. Antagonistas: bosentán (hipertensión pulmonar)',
          '<strong>Prostaciclina (PGI₂):</strong> Vasodilatador, antiagregante. COX-2 en endotelio. cAMP. Análogos: epoprostenol (hipertensión pulmonar). AINEs ↓PGI₂ → riesgo CV',
          '<strong>Disfunción endotelial:</strong> ↓NO, ↑ET-1, ↑ROS, inflamación. Factores: HTA, diabetes, hiperlipidemia, tabaco. Precede aterosclerosis. Test: dilatación flujo-mediada (FMD) braquial'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Hipertensión esencial:</strong> 90-95% HTA. Idiopática. Multifactorial: genética, obesidad, sal, estrés. Daño órgano: hipertrofia VI, ERC, retinopatía, ACV. Tx: cambios estilo de vida + fármacos. Meta: <130/80 mmHg',
          '<strong>Hipertensión secundaria:</strong> 5-10%. Causas: estenosis a. renal (HTA renovascular), aldosteronismo primario (Conn), feocromocitoma, Cushing, coartación aorta, AOS, enfermedad renal. Investigar si: <30 años, resistente, inicio abrupto',
          '<strong>Crisis hipertensiva:</strong> PA ≥180/120 mmHg. Urgencia (asintomática) vs emergencia (daño órgano: encefalopatía, IAM, edema pulmonar, disección). Tx emergencia: nitroprusiato, nicardipino, labetalol IV. Reducción gradual (25% en 1h)',
          '<strong>Hipotensión ortostática:</strong> Caída ≥20/10 mmHg al ponerse de pie. Causas: deshidratación, fármacos (α-bloqueantes), neuropatía autonómica (diabetes, Parkinson), edad. Síncope, caídas. Tx: hidratación, medias compresión, fludrocortisona, midodrina',
          '<strong>Síncope vasovagal:</strong> Activación parasimpática excesiva. Bradicardia + vasodilatación. Precipitantes: dolor, miedo, ortostatismo prolongado. Pródromos: náusea, palidez, sudor. Benigno. Tx: hidratación, evitar desencadenantes',
          '<strong>Estenosis arteria renal:</strong> Aterosclerosis (90%, ancianos, bilateral) vs displasia fibromuscular (10%, jóvenes, mujeres). HTA resistente, soplo abdominal, asimetría renal. Diagnóstico: Doppler, angio-TC. Angioplastia/stent si indicado',
          '<strong>Aldosteronismo primario:</strong> 5-10% HTA. Adenoma (Conn) vs hiperplasia bilateral. HTA + hipopotasemia (50%), alcalosis. Screening: aldosterona/renina >20. Confirmación: prueba supresión salina. Tx: adrenalectomía vs ARM',
          '<strong>Terapia antihipertensiva:</strong> Primera línea: IECA/ARA, BCC, tiazidas. Negros: BCC o tiazida. DM/ERC: IECA/ARA. Combinaciones: IECA+BCC, IECA+tiazida, BCC+tiazida. Evitar IECA+ARA. β-bloqueantes: IC, post-IAM, FA'
        ]
      }
    ]
  }
];