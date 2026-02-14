// ═══════════════════════════════════════════════════════════
// SISTEMA-NERVIOSO-DATA.JS - Base de datos sobre Sistema Nervioso
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const SISTEMA_NERVIOSO_DATA = [
  {
    id: 'neurona-estructura',
    nombre: 'Neurona y Potencial de Membrana',
    subtitulo: 'Estructura celular y propiedades eléctricas básicas',
    icono: '🧠',
    categorias: ['neurofisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Célula excitable:</strong> Capacidad de generar y propagar señales eléctricas. Base de la comunicación neuronal y procesamiento de información',
          '<strong>Estructura:</strong> Soma (cuerpo celular, núcleo, orgánulos), dendritas (recepción de señales), axón (conducción), terminales sinápticas (transmisión)',
          '<strong>Mielinización:</strong> Vaina de mielina formada por oligodendrocitos (SNC) o células de Schwann (SNP). Aumenta velocidad de conducción 10-100x',
          '<strong>Potencial de membrana en reposo:</strong> ~-70 mV en neuronas típicas. Mantenido por distribución asimétrica de iones y permeabilidad selectiva',
          '<strong>Gradientes iónicos:</strong> Na⁺ alto extracelular (~145 mM) vs intracelular (~12 mM). K⁺ alto intracelular (~140 mM) vs extracelular (~4 mM)',
          '<strong>Capacitancia de membrana:</strong> ~1 μF/cm². Bicapa lipídica actúa como condensador. Afecta velocidad de cambios de voltaje'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Canales iónicos y transportadores',
        datos: [
          { label: 'Bomba Na⁺/K⁺-ATPasa', value: 'Transportador activo primario. 3 Na⁺ out, 2 K⁺ in por ATP. Electrogénico (-10 mV contribución). Esencial para mantener gradientes. Inhibida por ouabaína.' },
          { label: 'Canales de K⁺ de fuga', value: 'Siempre abiertos. Principalmente responsables del potencial de reposo. Familias: KCNK (K2P), Kir. Alta permeabilidad a K⁺ → Vm cercano a EK.' },
          { label: 'Canales Na⁺ voltaje-dependientes', value: 'Responsables de fase ascendente del PA. Nav1.1-Nav1.9. Rápida activación e inactivación. Bloqueados por tetrodotoxina (TTX), lidocaína, carbamazepina.' },
          { label: 'Canales K⁺ voltaje-dependientes', value: 'Repolarización del PA. Kv1-Kv4 (delayed rectifier), BK (Ca²⁺-activados). Bloqueados por 4-aminopiridina, dendrotoxina.' },
          { label: 'Canales Ca²⁺ voltaje-dependientes', value: 'Entrada de Ca²⁺ en despolarización. Cav1 (L-type), Cav2.1 (P/Q), Cav2.2 (N), Cav3 (T). Liberación de neurotransmisores. Bloqueados por verapamilo, ω-conotoxinas.' },
          { label: 'Canales activados por ligando', value: 'Receptores ionotrópicos. Nicotínicos (ACh), NMDA/AMPA (glutamato), GABAA/glicinérgicos (Cl⁻). Transmisión sináptica rápida (ms).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Ecuación de Nernst y Goldman',
        items: [
          '<strong>Ecuación de Nernst:</strong> Eion = (RT/zF) × ln([ion]out/[ion]in). A 37°C: Eion = 61.5/z × log([ion]out/[ion]in) mV',
          '<strong>Potenciales de equilibrio:</strong> EK ≈ -90 mV, ENa ≈ +60 mV, ECa ≈ +123 mV, ECl ≈ -65 mV (varía según tipo neuronal)',
          '<strong>Ecuación de Goldman-Hodgkin-Katz:</strong> Vm considerando permeabilidades relativas de múltiples iones. Vm = (RT/F) × ln[(PK[K⁺]out + PNa[Na⁺]out + PCl[Cl⁻]in)/(PK[K⁺]in + PNa[Na⁺]in + PCl[Cl⁻]out)]',
          '<strong>Permeabilidades en reposo:</strong> PK:PNa:PCl ≈ 1:0.04:0.45. Alta permeabilidad K⁺ domina potencial de reposo',
          '<strong>Conductancia vs permeabilidad:</strong> Conductancia (g) = corriente/fuerza impulsora. Permeabilidad (P) = propiedad del canal. Relacionadas pero distintas',
          '<strong>Constante de tiempo de membrana:</strong> τm = Rm × Cm. Típicamente 10-20 ms en neuronas. Determina rapidez de respuesta a corriente'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Propiedades pasivas',
        items: [
          '<strong>Propagación electrotónica:</strong> Diseminación pasiva de voltaje. Decae exponencialmente con distancia. No regenerativa',
          '<strong>Constante de longitud (λ):</strong> Distancia donde voltaje cae a 37% (1/e). λ = √(Rm/Ri). Típicamente 0.1-1 mm. Mielina aumenta λ',
          '<strong>Constante de tiempo (τ):</strong> Tiempo para alcanzar 63% (1-1/e) del cambio final. τ = Rm × Cm. Afecta integración temporal',
          '<strong>Integración espacial:</strong> Sumación de múltiples inputs sinápticos simultáneos en dendritas. Lineal si no hay canales voltaje-dependientes',
          '<strong>Integración temporal:</strong> Sumación de inputs repetidos. Facilitación si intervalo < τm. Crítico para disparo neuronal',
          '<strong>Cable pasivo vs activo:</strong> Dendritas tienen canales voltaje-dependientes. Amplificación de señales distales. Hot spots dendríticos'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Canalopatías:</strong> Mutaciones en genes de canales iónicos. Epilepsia (SCN1A, KCNQ2/3), ataxia episódica (KCNA1), migraña hemipléjica familiar (CACNA1A)',
          '<strong>Síndrome de Dravet:</strong> Mutaciones en SCN1A (Nav1.1). Epilepsia infantil refractaria, deterioro cognitivo, SUDEP. Tratamiento: estiripentol, cannabidiol (Epidiolex)',
          '<strong>Miastenia gravis:</strong> Autoanticuerpos anti-receptor nicotínico (AChR). Debilidad muscular fluctuante, ptosis, diplopia. Tratamiento: anticolinesterásicos (piridostigmina), inmunosupresión',
          '<strong>Síndrome de Lambert-Eaton:</strong> Autoanticuerpos anti-canales Ca²⁺ presinápticos (P/Q-type). Asociado a cáncer de pulmón (paraneoplásico). Debilidad proximal, facilitación post-ejercicio',
          '<strong>Anestésicos locales:</strong> Lidocaína, bupivacaína. Bloquean canales Nav. Uso: anestesia dental, epidural, infiltración. Toxicidad: arritmias (bloqueo cardíaco Nav1.5)',
          '<strong>Toxinas naturales:</strong> Tetrodotoxina (pez globo, bloquea Nav), saxitoxina (marea roja, bloquea Nav), batracotoxina (rana dardo, mantiene Nav abierto)',
          '<strong>Antiepilépticos:</strong> Múltiples mecanismos. Fenitoína, carbamazepina (bloqueo Nav dependiente de uso), ácido valproico (múltiples targets), levetiracetam (SV2A)',
          '<strong>Esclerosis múltiple:</strong> Desmielinización autoinmune. Conducción saltatoria afectada. Bloqueo de conducción en fibras parcialmente desmielinizadas. Fampridina (4-aminopiridina) mejora conducción'
        ]
      }
    ]
  },
  {
    id: 'potencial-accion',
    nombre: 'Potencial de Acción',
    subtitulo: 'Señal eléctrica regenerativa todo-o-nada',
    icono: '⚡',
    categorias: ['neurofisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Principio todo-o-nada:</strong> Se genera completamente o no se genera. Amplitud constante (~100 mV). Independiente de intensidad del estímulo (si supera umbral)',
          '<strong>Umbral de disparo:</strong> Típicamente -55 a -50 mV. Nivel donde entrada de Na⁺ supera salida de K⁺. Determinado por densidad y propiedades de Nav',
          '<strong>Fases del PA:</strong> Despolarización (apertura Nav), overshoot (+30 a +40 mV), repolarización (cierre Nav, apertura Kv), hiperpolarización posterior (AHP)',
          '<strong>Duración:</strong> ~1-2 ms en neuronas, ~200-400 ms en músculo cardíaco. Varía según densidad y tipos de canales',
          '<strong>Propagación unidireccional:</strong> Período refractario absoluto previene retropropagación. Nav inactivados no se reabren inmediatamente',
          '<strong>Velocidad de conducción:</strong> 0.5-2 m/s (axones no mielinizados), 50-120 m/s (axones mielinizados gruesos tipo Aα)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos moleculares del PA',
        datos: [
          { label: 'Fase ascendente (despolarización)', value: 'Apertura de canales Nav. Entrada masiva de Na⁺ (conductancia Na⁺ aumenta 500x). dV/dt máxima ~400 V/s. Amplitud ~100 mV (de -70 a +30 mV).' },
          { label: 'Overshoot', value: 'Vm se acerca a ENa (+60 mV) pero no lo alcanza. Duración ~0.5 ms. Simultáneamente: inactivación rápida de Nav (compuerta h), activación lenta de Kv.' },
          { label: 'Repolarización', value: 'Inactivación de Nav (gate h cerrado). Apertura de Kv (delayed rectifier, Kv1-4). Salida de K⁺ domina. Vm retorna hacia EK.' },
          { label: 'Hiperpolarización posterior (AHP)', value: 'Kv aún abiertos. Vm cae por debajo de reposo (-75 a -80 mV). Duración 2-5 ms. Limita frecuencia de disparo máxima. Canales BK (Ca²⁺-activados) contribuyen.' },
          { label: 'Período refractario absoluto', value: '1-2 ms. Nav en estado inactivado. Imposible generar nuevo PA independiente de estímulo. Garantiza unidireccionalidad.' },
          { label: 'Período refractario relativo', value: '2-4 ms adicionales. Nav recuperándose. Posible PA con estímulo supraumral. Explica codificación de frecuencia máxima (~500 Hz).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Conducción del potencial de acción',
        items: [
          '<strong>Conducción continua:</strong> Axones no mielinizados. PA regenerado en cada punto adyacente. Corrientes locales despolarzan membrana vecina. Lenta pero segura',
          '<strong>Conducción saltatoria:</strong> Axones mielinizados. PA salta entre nodos de Ranvier (gaps de 1-2 μm cada 1-2 mm). 10-100x más rápida. Menor gasto energético',
          '<strong>Nodos de Ranvier:</strong> Alta densidad de Nav (>1000/μm²). Sin mielina. Regiones de regeneración del PA. Ankyrina-G ancla Nav. Contactina y neurofascina organizan nodo',
          '<strong>Factores que afectan velocidad:</strong> Diámetro axonal (mayor → menor Ri → más rápido), mielinización (saltatoria >> continua), temperatura (Q10 ~1.8-2)',
          '<strong>Clasificación de fibras:</strong> Tipo Aα (13-20 μm, 80-120 m/s, motoras), Aβ (6-12 μm, 35-75 m/s, tacto), Aδ (1-5 μm, 5-30 m/s, dolor rápido), C (0.2-1.5 μm, 0.5-2 m/s, dolor lento)',
          '<strong>Bloqueo de conducción:</strong> Anestésicos locales (bloqueo Nav), desmielinización (conducción saltatoria fallida), isquemia (fallo bomba Na⁺/K⁺), frío (disminución velocidad)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Codificación de información',
        items: [
          '<strong>Código de frecuencia:</strong> Intensidad del estímulo codificada como frecuencia de disparo (rate code). Estímulo fuerte → mayor frecuencia. Rango típico: 1-500 Hz',
          '<strong>Adaptación:</strong> Disminución de frecuencia con estímulo constante. Adaptación rápida (fásica, ej: corpúsculos Pacini) vs lenta (tónica, ej: husos musculares)',
          '<strong>Patrón temporal:</strong> Información en timing preciso de spikes (temporal code). Importante en sistema auditivo (localización sonido), olfato',
          '<strong>Sincronización:</strong> Neuronas disparan juntas. Gamma oscillations (30-100 Hz), theta rhythms (4-8 Hz). Rol en atención, memoria, consciencia',
          '<strong>Población neuronal:</strong> Información distribuida en conjunto de neuronas. Redundancia y robustez. Decodificación por integración downstream',
          '<strong>Ruido neuronal:</strong> Variabilidad ensayo a ensayo. Origen: apertura estocástica de canales, input sináptico fluctuante. Coeficiente de variación (CV) ~0.5-1.0'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Electrodiagnóstico:</strong> EMG (electromiografía) registra PA musculares. Velocidad de conducción nerviosa (NCV) evalúa integridad de nervios periféricos',
          '<strong>Neuropatías desmielinizantes:</strong> Síndrome Guillain-Barré (agudo), neuropatía inflamatoria desmielinizante crónica (CIDP). NCV ↓↓, latencias ↑↑. Tratamiento: IVIG, plasmaféresis',
          '<strong>Neuropatías axonales:</strong> Diabetes, alcohol, quimioterapia (cisplatino, vincristina). Amplitud de PA ↓, NCV normal o ↓ leve. Manejo: control glucémico, suplementos (B12, ácido α-lipoico)',
          '<strong>Esclerosis lateral amiotrófica (ELA):</strong> Degeneración de motoneuronas superiores e inferiores. Fasciculaciones (PA espontáneos), debilidad progresiva, muerte por insuficiencia respiratoria. Riluzol prolonga supervivencia ~3 meses',
          '<strong>Síndrome del túnel carpiano:</strong> Compresión de nervio mediano en muñeca. Parestesias nocturnas, debilidad tenar. EMG: latencia distal motora prolongada. Tratamiento: férula nocturna, esteroides, cirugía descompresiva',
          '<strong>Marcapasos cardíaco:</strong> Células nodales SA/AV generan PA espontáneos. Funny current (If, HCN channels) + reducción de gK. Disfunción → bradicardia → implante de marcapasos electrónico',
          '<strong>Arritmias:</strong> QT largo congénito (KCNQ1, KCNH2, SCN5A). Prolongación de PA ventricular. Riesgo de torsades de pointes, muerte súbita. Betabloqueantes, desfibrilador implantable',
          '<strong>Toxinas y venenos:</strong> Tetrodotoxina (pez globo, bloqueo Nav, parálisis respiratoria), batracotoxina (rana dardo, apertura Nav, paro cardíaco), ciguatoxina (pescado tropical, apertura Nav)'
        ]
      }
    ]
  },
  {
    id: 'sinapsis-quimica',
    nombre: 'Sinapsis Química',
    subtitulo: 'Transmisión de señales entre neuronas',
    icono: '🔗',
    categorias: ['sinapsis'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Hendidura sináptica:</strong> Espacio de 20-40 nm entre terminales presináptica y postsináptica. Permite comunicación química unidireccional',
          '<strong>Vesículas sinápticas:</strong> ~40-50 nm diámetro. Contienen neurotransmisor (1000-10,000 moléculas). Pool fácilmente liberable (~10-20 vesículas), pool de reserva (cientos)',
          '<strong>Zona activa:</strong> Región especializada de membrana presináptica. Alta densidad de canales Ca²⁺ voltaje-dependientes. Maquinaria de fusión vesicular (SNARE)',
          '<strong>Densidad postsináptica (PSD):</strong> Estructura proteica compleja. Anclaje de receptores, moléculas de señalización, proteínas de andamiaje (PSD-95). Espesor ~50 nm',
          '<strong>Latencia sináptica:</strong> 0.3-1 ms (química). Incluye apertura Ca²⁺, difusión Ca²⁺, fusión vesicular, difusión neurotransmisor, unión a receptor',
          '<strong>Plasticidad sináptica:</strong> Cambios en eficacia de transmisión. Corto plazo (facilitación, depresión) y largo plazo (LTP, LTD). Base de aprendizaje y memoria'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Maquinaria molecular de liberación',
        datos: [
          { label: 'Complejo SNARE', value: 'Sinaptobrevina (VAMP, vesicular), sintaxina (membrana presináptica), SNAP-25 (presináptica). Forma hélice 4-cadenas. Fusión de membranas. Toxinas botulínica/tetánica proteasean SNAREs.' },
          { label: 'Sinaptotagmina', value: 'Sensor de Ca²⁺. Dominio C2 une 5 Ca²⁺. Dispara fusión rápida. Isoformas: Syt1/2 (liberación rápida evocada), Syt7 (liberación asíncrona). Mutaciones → trastornos neuromusculares.' },
          { label: 'Complexina', value: 'Regula fusión SNARE. Clamp en ausencia Ca²⁺. Facilita liberación tras entrada Ca²⁺. Mantiene vesículas en estado primed.' },
          { label: 'Munc13 y Munc18', value: 'Munc13: priming de vesículas. Munc18: chaperona de sintaxina. Esenciales para docking. Knockout Munc13 → pérdida completa de liberación evocada.' },
          { label: 'Rab3 y RIM', value: 'Rab3 (GTPasa): tethering vesicular. RIM (Rab3-interacting molecule): organiza zona activa. RIM une canales Ca²⁺ con sitios de liberación. Espaciamiento nano preciso.' },
          { label: 'Canales Ca²⁺ P/Q y N-type', value: 'Cav2.1 (P/Q, mayoritario en neuronas centrales), Cav2.2 (N, neuronas periféricas). Nano-dominio Ca²⁺ local (>100 μM). Bloqueados por ω-agatoxina, ω-conotoxina.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Proceso de transmisión sináptica',
        items: [
          '<strong>1. Llegada del PA presináptico:</strong> Despolarización de terminal. Apertura de canales Ca²⁺ voltaje-dependientes (Cav2.1, Cav2.2)',
          '<strong>2. Entrada de Ca²⁺:</strong> [Ca²⁺] sube de ~100 nM (reposo) a >100 μM (micro-dominio cerca del canal). Relación no-lineal con liberación (Hill coef ~4)',
          '<strong>3. Fusión vesicular:</strong> Ca²⁺ une sinaptotagmina → cambio conformacional → desestabiliza complejo SNARE → fusión de membranas. <1 ms tras entrada Ca²⁺',
          '<strong>4. Liberación cuántica:</strong> Una vesícula = 1 quantum. MEPP (miniature end-plate potential) ~0.5 mV. EPP evocado = suma de ~200 quanta',
          '<strong>5. Difusión de neurotransmisor:</strong> Atraviesa hendidura en ~100 μs. Concentración pico ~1 mM. Decae por difusión y recaptación',
          '<strong>6. Unión a receptor postsináptico:</strong> Ionotrópico (apertura canal, <1 ms) o metabotrópico (cascada de señalización, 10-100 ms)',
          '<strong>7. Reciclaje vesicular:</strong> Endocitosis mediada por clatrina (~20 s). Kiss-and-run (rápida, ~1 s). Recarga de neurotransmisor por transportadores vesiculares'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Modulación de transmisión sináptica',
        items: [
          '<strong>Facilitación:</strong> Aumento transitorio de liberación con disparo repetido. Ca²⁺ residual en terminal. Duración ~100 ms. Implica buffer lento de Ca²⁺',
          '<strong>Depresión sináptica:</strong> Disminución con uso repetido. Agotamiento de pool de vesículas listas. Común en sinapsis tónico-fásicas. Recuperación con descanso',
          '<strong>Potenciación post-tetánica (PTP):</strong> Aumento prolongado tras estimulación de alta frecuencia. Duración minutos. Ca²⁺ residual, PKC, Munc13',
          '<strong>Receptores presinápticos:</strong> Autoreceptores (feedback negativo, ej: D2 en dopaminérgicas). Heteroreceptores (modulación por otros transmisores)',
          '<strong>Modulación por neuropéptidos:</strong> Co-liberados con transmisores clásicos. Actúan en receptores metabotrópicos. Efectos lentos (minutos-horas). Ej: sustancia P, NPY, opioides',
          '<strong>Endocannabinoides:</strong> Mensajeros retrógrados. Postsináptico → presináptico. CB1 receptores reducen liberación. DSI (depolarization-induced suppression of inhibition)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Miastenia gravis:</strong> Autoanticuerpos anti-AChR. Bloqueo competitivo y degradación de receptores. Debilidad fluctuante, empeora con uso. Test: Tensilon (edrofonio), EMG decremental. Tx: piridostigmina, timectomía, inmunosupresión',
          '<strong>Síndrome de Lambert-Eaton:</strong> Anticuerpos anti-Cav2.1 (P/Q). Liberación de ACh ↓. Asociado a cáncer pulmonar (SCLC). Debilidad proximal, facilitación post-tetánica en EMG. Tx: 3,4-diaminopiridina, IVIG',
          '<strong>Botulismo:</strong> Toxina botulínica protease SNARE. Bloqueo de liberación ACh. Parálisis fláccida descendente. Fuente: Clostridium botulinum (conservas). Tx: antitoxina, soporte respiratorio',
          '<strong>Tétanos:</strong> Toxina tetánica bloquea liberación de glicina/GABA (interneuronas inhibitorias). Espasmos musculares, rigidez, opistotonos. Fuente: Clostridium tetani (heridas). Tx: antitoxina, benzodiacepinas, soporte',
          '<strong>Uso terapéutico de toxina botulínica:</strong> Botox (OnabotulinumtoxinA). Distonía cervical, blefaroespasmo, hiperhidrosis, migraña crónica, arrugas faciales. Duración efecto ~3-4 meses',
          '<strong>Enfermedad de Alzheimer - hipótesis colinérgica:</strong> Pérdida de neuronas colinérgicas del núcleo basal de Meynert. Déficit de ACh en corteza/hipocampo. Inhibidores de colinesterasa (donepezilo, rivastigmina) mejoran cognición levemente',
          '<strong>Anticoagulantes:</strong> Ziconotide (Prialt). Bloqueador selectivo de Cav2.2 (N-type). Dolor crónico severo (intratecal). Péptido de caracol cono Conus magus',
          '<strong>α2-agonistas:</strong> Clonidina, dexmedetomidina. Reducen liberación de norepinefrina. Usos: hipertensión, sedación, abstinencia de opioides. Actúan en receptores presinápticos α2'
        ]
      }
    ]
  },
  {
    id: 'neurotransmisores',
    nombre: 'Neurotransmisores y Receptores',
    subtitulo: 'Mensajeros químicos del sistema nervioso',
    icono: '💊',
    categorias: ['sinapsis'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Criterios de neurotransmisor:</strong> Síntesis en neurona, almacenamiento en vesículas, liberación Ca²⁺-dependiente, receptores postsinápticos específicos, mecanismo de terminación',
          '<strong>Clasificación:</strong> Aminoácidos (glutamato, GABA, glicina), aminas biogénicas (ACh, dopamina, serotonina, norepinefrina), neuropéptidos (sustancia P, endorfinas, NPY)',
          '<strong>Co-transmisión:</strong> Una neurona libera múltiples transmisores. Ej: motoneuronas (ACh + CGRP), neuronas simpáticas (norepinefrina + NPY + ATP)',
          '<strong>Receptores ionotrópicos:</strong> Canales iónicos activados por ligando. Respuesta rápida (ms). Nicotínicos, NMDA, AMPA, GABAA, glicinérgicos',
          '<strong>Receptores metabotrópicos:</strong> Proteína G acoplada (GPCR). Respuesta lenta (s-min). Modulación amplificada. M1-M5 (muscarínicos), D1-D5 (dopamina), 5-HT1-7 (serotonina)',
          '<strong>Terminación de señal:</strong> Recaptación (transportadores), degradación enzimática (AChE, MAO, COMT), difusión fuera de hendidura'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Neurotransmisores principales',
        datos: [
          { label: 'Glutamato', value: 'Principal excitatorio del SNC. Síntesis: glutaminasa. Receptores: AMPA (Na⁺), NMDA (Na⁺/Ca²⁺, Mg²⁺-block), kainate, mGluR1-8. Transportadores: EAAT1-5. Excitotoxicidad en isquemia/trauma.' },
          { label: 'GABA', value: 'Principal inhibitorio del SNC. Síntesis: GAD65/67 (descarboxilación de glutamato). Receptores: GABAA (Cl⁻, benzodiacepinas), GABAB (GPCR, ↓Ca²⁺, ↑K⁺). Recaptación: GAT1-4. Degradación: GABA transaminasa.' },
          { label: 'Glicina', value: 'Inhibitorio en tronco cerebral y médula espinal. Receptor: GlyR (Cl⁻, pentámero α/β). Cofactor de NMDA. Recaptación: GlyT1/2. Estricnina antagonista (convulsiones, rigidez).' },
          { label: 'Acetilcolina (ACh)', value: 'Unión neuromuscular, SNC (atención, memoria). Síntesis: CAT (colina + acetil-CoA). Nicotínicos (Na⁺/K⁺), muscarínicos (M1-M5 GPCR). Degradación: AChE (muy rápida, <1 ms). Recaptación: colina.' },
          { label: 'Dopamina (DA)', value: 'Vías: nigroestriatal (motor), mesolímbica (recompensa), mesocortical (cognición), tuberoinfundibular (prolactina). Síntesis: tirosina → L-DOPA (TH) → DA (AADC). Receptores: D1/5 (Gs, ↑cAMP), D2/3/4 (Gi, ↓cAMP). Recaptación: DAT. Degradación: MAO, COMT.' },
          { label: 'Norepinefrina (NE)', value: 'Locus coeruleus → arousal, atención. Síntesis: DA → NE (DBH). Receptores: α1 (Gq), α2 (Gi), β1/2/3 (Gs). Recaptación: NET. Degradación: MAO, COMT. Efectores: noradrenérgicos SNS.' },
          { label: 'Serotonina (5-HT)', value: 'Núcleos del rafe → estado de ánimo, sueño, apetito. Síntesis: triptófano → 5-HTP (TPH) → 5-HT (AADC). Receptores: 14 subtipos (5-HT1-7), mayoría GPCR, 5-HT3 ionotrópico. Recaptación: SERT. Degradación: MAO.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Sistemas de neurotransmisión específicos',
        items: [
          '<strong>Sistema glutamatérgico:</strong> 80-90% de sinapsis excitatorias. AMPA media transmisión rápida. NMDA coincidence detector (requiere despolarización + glutamato). LTP/LTD. Excitotoxicidad por sobreactivación (ACV, TBI)',
          '<strong>Sistema GABAérgico:</strong> Interneuronas inhibitorias. Controla excitabilidad, oscilaciones. GABAA: inhibición rápida (phasic), tónica (extrasináptica α5). GABAB: inhibición lenta, presináptica y postsináptica',
          '<strong>Sistema colinérgico:</strong> Núcleo basal de Meynert (corteza), núcleo septal medial (hipocampo). Atención, memoria. Pérdida en Alzheimer. Nicotínicos en unión neuromuscular, ganglios autonómicos',
          '<strong>Sistema dopaminérgico:</strong> VTA (área tegmental ventral) → núcleo accumbens (recompensa). Sustancia nigra → striatum (movimiento). Déficit → Parkinson. Exceso → psicosis',
          '<strong>Sistema noradrenérgico:</strong> Locus coeruleus → proyección difusa. Arousal, vigilancia, respuesta a estrés. Desregulación en ansiedad, PTSD, depresión',
          '<strong>Sistema serotoninérgico:</strong> Núcleos del rafe → proyección difusa. Modulación de estado de ánimo, sueño, apetito. Déficit en depresión (hipótesis monoaminérgica). SSRIs bloquean SERT'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Receptores NMDA y plasticidad sináptica',
        items: [
          '<strong>Receptor NMDA:</strong> Coincidence detector. Requiere glutamato + despolarización (libera Mg²⁺ de canal). Permeable a Ca²⁺. Subunidades: GluN1 (obligatoria), GluN2A-D, GluN3A-B',
          '<strong>Bloqueo por Mg²⁺:</strong> Voltaje-dependiente. -70 mV → bloqueado. -40 mV → desbloqueado. Permite detección de coincidencia temporal de inputs',
          '<strong>LTP (potenciación a largo plazo):</strong> Fortalecimiento duradero de sinapsis. Entrada Ca²⁺ por NMDA → CaMKII → fosforilación AMPA → inserción de AMPA. Consolidación: síntesis proteica',
          '<strong>LTD (depresión a largo plazo):</strong> Debilitamiento duradero. Ca²⁺ moderado → fosfatasas (calcineurina) → desfosforilación AMPA → endocitosis de AMPA',
          '<strong>Regla BCM (Bienenstock-Cooper-Munro):</strong> Umbral de modificación sináptica. Alta frecuencia → LTP. Baja frecuencia → LTD. Explica refinamiento de circuitos',
          '<strong>STDP (spike-timing-dependent plasticity):</strong> Timing preciso importa. Pre antes de post (<20 ms) → LTP. Post antes de pre → LTD. Hebbiano: "cells that fire together, wire together"'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Enfermedad de Parkinson:</strong> Degeneración de neuronas dopaminérgicas de sustancia nigra. Tremor, rigidez, bradicinesia, inestabilidad postural. Tx: L-DOPA (precursor DA), agonistas DA (pramipexol), MAO-B inhibidores (selegilina)',
          '<strong>Esquizofrenia - hipótesis dopaminérgica:</strong> Hiperactividad DA mesolímbica (síntomas positivos), hipoactividad mesocortical (negativos, cognitivos). Antipsicóticos: antagonistas D2 (haloperidol), antagonistas D2/5-HT2A (risperidona, olanzapina)',
          '<strong>Depresión mayor:</strong> Déficit de monoaminas (5-HT, NE, DA). SSRIs (fluoxetina, sertralina), SNRIs (venlafaxina, duloxetina), NDRIs (bupropión). Ketamina: antagonista NMDA, efecto antidepresivo rápido',
          '<strong>Epilepsia:</strong> Desbalance excitación/inhibición. Anticonvulsivantes: ↑GABA (valproato, vigabatrina, tiagabina), antagonistas glutamato (perampanel), múltiples mecanismos (levetiracetam)',
          '<strong>Enfermedad de Alzheimer:</strong> Déficit colinérgico. Inhibidores de AChE (donepezilo, rivastigmina, galantamina) mejoran cognición modestamente. Memantina: antagonista NMDA no competitivo (excitotoxicidad)',
          '<strong>Esclerosis lateral amiotrófica (ELA):</strong> Excitotoxicidad glutamatérgica implicada. Riluzol: reduce liberación glutamato, prolonga supervivencia ~3 meses. Edaravone: antioxidante',
          '<strong>Adicción:</strong> Dopamina en sistema de recompensa. Todas las drogas de abuso aumentan DA en núcleo accumbens. Cocaína (bloquea DAT), anfetaminas (liberan DA), opioides (desinhiben neuronas DA vía µ)',
          '<strong>Trastorno de ansiedad:</strong> Desregulación GABAérgica y serotoninérgica. Benzodiacepinas (potencian GABAA, uso agudo), SSRIs (primera línea, uso crónico), buspirona (agonista parcial 5-HT1A)'
        ]
      }
    ]
  },
  {
    id: 'integracion-sensorial',
    nombre: 'Integración Sensorial',
    subtitulo: 'Transducción y procesamiento de información sensorial',
    icono: '👁️',
    categorias: ['sensorial'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Transducción sensorial:</strong> Conversión de estímulo físico/químico en señal eléctrica. Receptor sensorial (neurona especializada o célula sensorial)',
          '<strong>Modalidad sensorial:</strong> Tipo de estímulo detectado. Visión (fotones), audición (ondas sonoras), tacto (presión/vibración), dolor (nociceptores), temperatura, gusto, olfato, propiocepción',
          '<strong>Codificación de intensidad:</strong> Frecuencia de disparo neuronal (rate code). Reclutamiento de mayor número de receptores. Rango dinámico ~6 órdenes de magnitud',
          '<strong>Adaptación:</strong> Disminución de respuesta con estímulo constante. Rápida (fásica, detecta cambios) vs lenta (tónica, detecta intensidad sostenida)',
          '<strong>Campo receptivo:</strong> Región del espacio sensorial que, al estimularse, modifica actividad neuronal. Organización centro-periferia (ON-center/OFF-surround)',
          '<strong>Vías ascendentes:</strong> Receptor → neurona de primer orden (ganglio) → segundo orden (tronco/tálamo) → tercer orden (corteza primaria). Decusación en mayoría de vías'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Sistemas sensoriales principales',
        datos: [
          { label: 'Sistema visual', value: 'Fotorreceptores: conos (3 tipos, visión color, alta agudeza) y bastones (visión escotópica). Fototransducción: rodopsina → transducina → PDE → ↓cGMP → cierre canales → hiperpolarización. Vía: retina → quiasma → LGN (tálamo) → V1 (corteza occipital).' },
          { label: 'Sistema auditivo', value: 'Células ciliadas internas (detección sonido, 3500 células) y externas (amplificación, 12000). Mecanotransducción: deflexión cilios → apertura canales TRP → despolarización. Vía: cóclea → núcleo coclear → oliva superior → colículo inferior → MGB (tálamo) → A1.' },
          { label: 'Sistema somatosensorial', value: 'Tacto: mecanorreceptores (Meissner, Pacini, Merkel, Ruffini). Termorreceptores: TRP channels (TRPV1 calor, TRPM8 frío). Nociceptores: fibras Aδ (dolor rápido) y C (lento). Vías: columna dorsal-lemnisco medial (tacto fino) y espinotalámica (dolor/temperatura).' },
          { label: 'Sistema gustativo', value: '5 sabores básicos: dulce (T1R2+T1R3), umami (T1R1+T1R3), amargo (T2R), salado (ENaC), ácido (PKD2L1). Células gustativas en papilas. Nervios: VII (2/3 anteriores lengua), IX (1/3 posterior), X (epiglotis). Vía: núcleo del tracto solitario → tálamo (VPM) → ínsula/corteza frontal.' },
          { label: 'Sistema olfatorio', value: 'Neuronas olfatorias bipolares (~400 tipos de receptores OR en humanos). GPCRs. Convergencia en glomérulos del bulbo olfatorio. Única vía sensorial sin relevo talámico directo. Proyección: bulbo → corteza piriforme, amígdala, corteza orbitofrontal.' },
          { label: 'Sistema vestibular', value: 'Canales semicirculares (rotación, 3 planos), utrículo/sáculo (aceleración lineal, gravedad). Células ciliadas con kinocilio y estereocilios. Vía: ganglio de Scarpa → núcleos vestibulares → cerebelo, médula espinal (reflejos), tálamo.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Procesamiento cortical',
        items: [
          '<strong>Organización somatotópica:</strong> Mapeo ordenado de cuerpo en corteza. Homúnculo de Penfield en S1 (giro postcentral). Representación desproporcionada (manos, cara > tronco)',
          '<strong>Organización retinotópica:</strong> Mapeo de campo visual en V1. Fóvea central sobre-representada (magnificación cortical). Columnas de orientación y dominancia ocular',
          '<strong>Organización tonotópica:</strong> Mapeo de frecuencias en A1. Bajas frecuencias rostral, altas caudal. Preservado desde cóclea hasta corteza',
          '<strong>Jerarquía de procesamiento:</strong> Corteza primaria (características simples: bordes, frecuencias) → secundaria → asociativa (características complejas: objetos, caras)',
          '<strong>Vía ventral (qué):</strong> V1 → V2 → V4 → corteza temporal inferior. Reconocimiento de objetos, caras, colores. Lesión → agnosia visual',
          '<strong>Vía dorsal (dónde/cómo):</strong> V1 → V2 → V5/MT → corteza parietal posterior. Localización espacial, movimiento, guía de acciones. Lesión → ataxia óptica, negligencia'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Plasticidad sensorial',
        items: [
          '<strong>Períodos críticos:</strong> Ventanas temporales de alta plasticidad. Sistema visual (humanos: 0-8 años). Privación monocular → pérdida permanente de agudeza visual (ambliopía)',
          '<strong>Plasticidad cruzada modal:</strong> Ceguera temprana → reclutamiento de V1 para procesamiento táctil y auditivo. Base de Braille',
          '<strong>Reorganización tras amputación:</strong> Áreas corticales de miembro amputado reocupadas por inputs de regiones adyacentes. Dolor de miembro fantasma',
          '<strong>Expansión de representación:</strong> Entrenamiento intenso aumenta área cortical dedicada. Músicos: mayor representación de dedos en S1. Lectores de Braille: expansión de dedo índice',
          '<strong>Adaptación perceptual:</strong> Exposición prolongada a estímulo sesgado cambia percepción. Ej: prismas que invierten visión → adaptación motora y perceptual en días',
          '<strong>Perceptual learning:</strong> Mejora de discriminación con práctica. Específico de estímulo y tarea. Involucra cambios en corteza primaria y áreas de alto nivel'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Degeneración macular relacionada con edad (DMRE):</strong> Pérdida de visión central (fóvea). Seca (atrofia) vs húmeda (neovascularización). Húmeda: anti-VEGF (ranibizumab, aflibercept). Seca: suplementos (AREDS2)',
          '<strong>Glaucoma:</strong> Neuropatía óptica. Pérdida de células ganglionares retinales. Presión intraocular elevada (no siempre). Pérdida de campo visual periférico. Tx: reducir PIO (prostaglandinas, β-bloqueantes, cirugía)',
          '<strong>Sordera neurosensorial:</strong> Daño células ciliadas o nervio auditivo. Presbiacusia (edad), ruido, ototoxicidad (gentamicina, cisplatino). Audífonos, implante coclear (estimulación eléctrica directa de nervio)',
          '<strong>Vértigo posicional paroxístico benigno (VPPB):</strong> Otolitos desplazados en canales semicirculares. Vértigo con cambio de posición. Maniobra de Epley (reposicionamiento de otolitos)',
          '<strong>Neuropatía periférica diabética:</strong> Polineuropatía distal simétrica. Pérdida de sensibilidad vibratoria, propioceptiva, dolor. Riesgo de úlceras, caídas. Control glucémico, gabapentinoides, duloxetina',
          '<strong>Síndrome de dolor regional complejo (SDRC):</strong> Dolor desproporcionado tras trauma. Alodinia, cambios vasomotores, sudoración. Sensibilización central. Tx: fisioterapia, bloqueos simpáticos, ketamina',
          '<strong>Anosmia post-COVID:</strong> Pérdida de olfato en COVID-19 (50-80% de pacientes). Mecanismo: inflamación, daño de neuronas olfatorias o células de sostén. Mayoría recupera en semanas-meses. Entrenamiento olfatorio ayuda',
          '<strong>Prótesis sensoriales:</strong> Implante coclear (sordera profunda), prótesis retiniana (Argus II para retinitis pigmentosa), lengua electrotáctil (substitución sensorial visual)'
        ]
      }
    ]
  }
];