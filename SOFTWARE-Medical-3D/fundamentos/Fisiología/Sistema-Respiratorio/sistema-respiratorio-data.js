// ═══════════════════════════════════════════════════════════
// SISTEMA-RESPIRATORIO-DATA.JS - Base de datos sobre Sistema Respiratorio
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const SISTEMA_RESPIRATORIO_DATA = [
  {
    id: 'anatomia-vias-aereas',
    nombre: 'Anatomía de las Vías Aéreas',
    subtitulo: 'Estructura y organización del sistema respiratorio',
    icono: '🫁',
    categorias: ['anatomia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Vías aéreas superiores:</strong> Nariz, faringe (nasofaringe, orofaringe, laringofaringe), laringe. Funciones: filtración, humidificación, calentamiento del aire. Fonación (cuerdas vocales)',
          '<strong>Vías aéreas inferiores:</strong> Tráquea, bronquios principales (derecho e izquierdo), bronquios lobares, segmentarios, bronquiolos, bronquiolos terminales',
          '<strong>Tráquea:</strong> ~12 cm largo, 2 cm diámetro. 16-20 anillos cartilaginosos en forma de C (cara posterior membranosa). Bifurcación: carina (T4-T5). Epitelio cilíndrico ciliado pseudoestratificado',
          '<strong>Árbol bronquial:</strong> 23 generaciones de división (dicotómica). Generación 0 (tráquea) → 16 (bronquiolos terminales) → 23 (sacos alveolares). Zona conductora (0-16) vs zona respiratoria (17-23)',
          '<strong>Bronquios:</strong> Cartílago en placas (vs anillos traqueales). Músculo liso circular. Disminución progresiva de diámetro y cartílago. Bronquio derecho: más vertical, corto, ancho (aspiración cuerpos extraños)',
          '<strong>Bronquiolos:</strong> <1 mm diámetro. Sin cartílago (soporte por tracción radial). Músculo liso prominente (broncoconstricción/dilatación). Epitelio cúbico ciliado → cúbico simple'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Zona respiratoria',
        datos: [
          { label: 'Bronquiolos respiratorios', value: 'Generaciones 17-19. Transición conducción-intercambio. Pared con alvéolos ocasionales. Epitelio cúbico. Diámetro ~0.5 mm. Primera aparición de alvéolos.' },
          { label: 'Conductos alveolares', value: 'Generaciones 20-22. Completamente revestidos de alvéolos. Sin epitelio continuo. Estructuras tubulares con apertura a sacos alveolares. Soporte por fibras elásticas y colágeno.' },
          { label: 'Sacos alveolares', value: 'Generación 23. Clusters de alvéolos. Forma de racimo de uvas. Punto final del árbol bronquial. Intercambio gaseoso exclusivo.' },
          { label: 'Alvéolos', value: '~300-500 millones en adulto. Diámetro ~200-300 μm. Área superficial total ~70 m² (cancha de tenis). Pared: neumocitos tipo I (95% área, intercambio), tipo II (5% área, surfactante).' },
          { label: 'Membrana alvéolo-capilar', value: 'Barrera gas-sangre. Grosor: 0.2-0.5 μm. Capas: surfactante, neumocito I, membrana basal (fusionada), endotelio capilar. Difusión facilitada por grosor mínimo y área extensa.' },
          { label: 'Red capilar pulmonar', value: 'Densa malla alrededor de alvéolos. Longitud total ~2000 km. Volumen sanguíneo ~70-100 mL (capacitancia). Tiempo tránsito eritrocito: ~0.75 s (reposo), ~0.25 s (ejercicio).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Células del epitelio respiratorio',
        items: [
          '<strong>Células ciliadas:</strong> Principal tipo celular en vías conductoras. 200-300 cilios/célula. Batido sincronizado (metacronal) 12-15 Hz. Escalera mucociliar: moco hacia faringe (~1-2 cm/min)',
          '<strong>Células caliciformes:</strong> Secretan muco. Aumentadas en inflamación crónica (EPOC, asma). Muco: 95% agua, mucinas (MUC5AC, MUC5B), defensinas, lisozima, lactoferrina',
          '<strong>Células en cepillo (brush):</strong> Microvellosidades. Quimiorreceptores (sabor amargo). Respuesta inmune innata. Activan nervios sensoriales',
          '<strong>Neumocitos tipo I:</strong> 40% de células, 95% de área alveolar. Muy aplanados (<0.1 μm). Uniones estrechas (barrera). Intercambio gaseoso. Vulnerables a daño (no proliferan)',
          '<strong>Neumocitos tipo II:</strong> 60% de células, 5% de área. Cúbicos. Cuerpos lamelares (surfactante). Progenitores (proliferan, diferencian a tipo I tras daño). Transportan Na⁺ (reabsorción líquido)',
          '<strong>Macrófagos alveolares:</strong> Primera línea defensa. Fagocitan patógenos, partículas, surfactante. Residentes (90%) vs reclutados (monocitos). Antracosis en fumadores/urbanitas (depósitos carbón)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Pleuras y mecánica respiratoria',
        items: [
          '<strong>Pleura parietal:</strong> Recubre pared torácica, diafragma, mediastino. Inervada (dolor). Irrigada por arterias sistémicas (intercostales, mamaria interna)',
          '<strong>Pleura visceral:</strong> Recubre pulmones (hasta cisuras). No inervada (indolora). Irrigada por arterias bronquiales. Adherida íntimamente al parénquima',
          '<strong>Espacio pleural:</strong> Virtual (~10-20 μm). Líquido pleural 0.1-0.2 mL/kg. Presión subatmosférica (-5 cmH₂O al final espiración, -8 cmH₂O inspiración). Permite deslizamiento',
          '<strong>Surfactante pleural:</strong> Lubricante. Fosfolípidos (fosfatidilcolina). Reduce fricción. Origen: neumocitos tipo II, filtración capilar',
          '<strong>Presión intrapleural negativa:</strong> Generada por retroceso elástico pulmón (colapso) vs pared torácica (expansión). Balance crea presión negativa. Mantiene pulmón expandido',
          '<strong>Neumotórax:</strong> Aire en espacio pleural → pérdida presión negativa → colapso pulmonar. Espontáneo (bulla apical), traumático, iatrogénico. Tx: drenaje torácico si >20%, sintomático'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Asma:</strong> Inflamación crónica vías aéreas. Hiperreactividad bronquial. Broncoconstricción, edema, hipersecreción moco. Obstrucción variable y reversible. Tx: β2-agonistas (salbutamol), corticoides inhalados (fluticasona), anti-IgE (omalizumab)',
          '<strong>EPOC (enfermedad pulmonar obstructiva crónica):</strong> Bronquitis crónica + enfisema. Tabaquismo 85-90% casos. Destrucción parénquima (enfisema), inflamación (bronquitis). Obstrucción irreversible. FEV1/FVC <0.7. Tx: broncodilatadores, oxígeno',
          '<strong>Fibrosis quística:</strong> Mutación CFTR (regulador conductancia transmembrana). ΔF508 (70%). Moco espeso (↓clearance, infecciones). Bronquiectasias. Insuficiencia pancreática. Tx: moduladores CFTR (elexacaftor/tezacaftor/ivacaftor)',
          '<strong>Bronquiectasias:</strong> Dilatación irreversible bronquios. Destrucción pared (elastina, músculo). Causas: infecciones (TBC, tos ferina), FQ, inmunodeficiencias. Imagen: TC (signo anillo sello). Tx: antibióticos, fisioterapia',
          '<strong>Síndrome de distrés respiratorio agudo (SDRA):</strong> Daño alveolar difuso. Edema pulmonar no cardiogénico. PaO₂/FiO₂ <300 (leve), <200 (moderado), <100 (severo). Causas: sepsis, neumonía, trauma. Tx: VM protectiva (6 mL/kg), PEEP, prono',
          '<strong>Derrame pleural:</strong> Trasudado (IC, cirrosis, síndrome nefrótico) vs exudado (neumonía, cáncer, TBC). Criterios Light: proteínas pleura/suero >0.5, LDH pleura/suero >0.6, LDH pleura >2/3 límite superior normal. Toracocentesis diagnóstica/terapéutica',
          '<strong>Mesotelioma pleural:</strong> Neoplasia maligna. Asociación asbestos (latencia 20-40 años). Dolor torácico, disnea, derrame. Pronóstico pobre (mediana supervivencia 12 meses). Tx: cirugía (pleurectomía), quimio (cisplatino/pemetrexed)',
          '<strong>Cuerpo extraño en vía aérea:</strong> Niños <5 años. Triada: tos, estridor, sibilancias. Bronquio derecho más afectado. Dx: broncoscopia (diagnóstica y terapéutica). Maniobra Heimlich si obstrucción completa'
        ]
      }
    ]
  },
  {
    id: 'mecanica-ventilatoria',
    nombre: 'Mecánica Ventilatoria',
    subtitulo: 'Volúmenes, capacidades y mecánica pulmonar',
    icono: '💨',
    categorias: ['fisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Ventilación pulmonar:</strong> Movimiento de aire dentro/fuera de pulmones. Frecuencia respiratoria normal: 12-20 rpm (adulto). Ventilación minuto: ~6 L/min (reposo)',
          '<strong>Músculos inspiratorios:</strong> Diafragma (principal, 70% esfuerzo). Intercostales externos. Accesorios (ECM, escalenos) en ejercicio/disnea. Nervio frénico (C3-C5): diafragma',
          '<strong>Músculos espiratorios:</strong> Espiración pasiva en reposo (retroceso elástico). Activa en ejercicio: abdominales (recto, oblicuos), intercostales internos',
          '<strong>Presiones respiratorias:</strong> Presión alveolar (Palv), pleural (Ppl), transpulmonar (Ptp = Palv - Ppl). Presión transmural vía aérea. Ley de Boyle: P × V = constante',
          '<strong>Compliance pulmonar:</strong> ΔV/ΔP. Distensibilidad. Normal: 200 mL/cmH₂O. ↓compliance: fibrosis, edema, atelectasia. ↑compliance: enfisema',
          '<strong>Resistencia de vías aéreas:</strong> ΔP/flujo. Normal: 1-2 cmH₂O/L/s. 80% en vías grandes (generaciones 0-7). Ley Poiseuille: R ∝ 1/r⁴. Broncoconstricción ↑↑resistencia'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Volúmenes y capacidades pulmonares',
        datos: [
          { label: 'Volumen corriente (VC/Vt)', value: 'Volumen de aire en respiración normal. ~500 mL (adulto, 70 kg). ~6-8 mL/kg peso ideal. Aumenta en ejercicio. Ventilación minuto = VC × FR.' },
          { label: 'Volumen de reserva inspiratorio (VRI)', value: 'Máximo aire adicional tras inspiración normal. ~3000 mL. Usado en ejercicio intenso. Aumenta capacidad inspiratoria.' },
          { label: 'Volumen de reserva espiratorio (VRE)', value: 'Máximo aire espirado tras espiración normal. ~1200 mL. Disminuido en obesidad, embarazo, ascitis. Parte de capacidad residual funcional.' },
          { label: 'Volumen residual (VR)', value: 'Aire que permanece tras espiración máxima. ~1200 mL. No medible por espirometría (requiere pletismografía, dilución He). Aumentado en EPOC/enfisema.' },
          { label: 'Capacidad inspiratoria (CI)', value: 'VC + VRI. ~3500 mL. Máximo aire inspirado desde reposo. CI/TLC <25% sugiere hiperinflación en EPOC.' },
          { label: 'Capacidad residual funcional (CRF)', value: 'VRE + VR. ~2400 mL. Volumen al final espiración pasiva. Punto de equilibrio fuerzas elásticas. Reservorio de O₂. Buffer de cambios PO₂/PCO₂.' },
          { label: 'Capacidad vital (CV)', value: 'VRI + VC + VRE. ~4700 mL. Máximo aire movilizable. Reducida en restrictivas. CV forzada (CVF) en espirometría.' },
          { label: 'Capacidad pulmonar total (CPT)', value: 'Suma de todos volúmenes. CV + VR. ~6000 mL. Volumen máximo tras inspiración máxima. Aumentada en enfisema. Disminuida en restrictivas.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Espirometría y función pulmonar',
        items: [
          '<strong>FEV1 (volumen espiratorio forzado 1s):</strong> Volumen aire espirado en primer segundo de CVF. Normal: >80% predicho. Índice de obstrucción. Reducido en asma, EPOC',
          '<strong>CVF (capacidad vital forzada):</strong> Máximo aire espirado con esfuerzo máximo. Normal: >80% predicho. Reducida en restrictivas y obstructivas',
          '<strong>Ratio FEV1/CVF (índice de Tiffeneau):</strong> Normal: >0.70 (>70%). <0.70: obstrucción (asma, EPOC). Normal o ↑ en restrictivas (fibrosis)',
          '<strong>FEF25-75% (flujo espiratorio forzado medio):</strong> Flujo entre 25-75% de CVF. Sensible a obstrucción vías pequeñas. Reducido temprano en asma',
          '<strong>Curva flujo-volumen:</strong> Gráfica flujo vs volumen. Forma característica: obstructiva (cóncava en espiración) vs restrictiva (proporcionalmente reducida)',
          '<strong>Reversibilidad:</strong> Test broncodilatador. ↑FEV1 >200 mL y >12% sugiere asma. EPOC: respuesta menor pero presente'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Surfactante pulmonar',
        items: [
          '<strong>Composición:</strong> 90% lípidos (75% fosfatidilcolina, 10% fosfatidilglicerol), 10% proteínas (SP-A, SP-B, SP-C, SP-D)',
          '<strong>Dipalmitoilfosfatidilcolina (DPPC):</strong> Principal componente. Reduce tensión superficial a ~0 mN/m (vs 70 mN/m agua). Crucial en alvéolos pequeños',
          '<strong>Proteínas del surfactante:</strong> SP-B y SP-C: hidrofóbicas, facilitan dispersión lípidos. SP-A y SP-D: inmunidad innata, opsoninas',
          '<strong>Ley de Laplace:</strong> P = 2T/r. Sin surfactante: alvéolos pequeños colapsarían (↑presión). Surfactante ↓T proporcionalmente más en alvéolos pequeños → estabilización',
          '<strong>Síntesis:</strong> Neumocitos tipo II. Cuerpos lamelares (almacenamiento). Secreción estimulada por estiramiento, β-agonistas. Reciclaje por macrófagos y neumocitos II',
          '<strong>Desarrollo:</strong> Producción significativa desde semana 24-28 gestación. Maduración completa semana 35-36. Corticoides prenatales aceleran maduración'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Síndrome de distrés respiratorio neonatal (SDR):</strong> Déficit surfactante en prematuros <34 semanas. Atelectasia, compliance↓, hipoxemia. Radiografía: vidrio esmerilado. Tx: surfactante exógeno (beractant, poractant), CPAP, ventilación',
          '<strong>Fibrosis pulmonar idiopática (FPI):</strong> Enfermedad restrictiva. Cicatrización progresiva. Compliance↓↓, CPT↓, DLCO↓. Patrón UIP en TC (panal abejas, bronquiectasias tracción). Tx: pirfenidona, nintedanib (antifibróticos)',
          '<strong>Enfisema:</strong> Destrucción parénquima. VR↑, CRF↑, CPT↑, compliance↑. Atrapamiento aéreo. Subtipos: centroacinar (tabaco, lóbulos superiores), panacinar (déficit α1-antitripsina). Bullectomía, reducción volumen pulmonar',
          '<strong>Neumotórax a tensión:</strong> Aire entra sin salir (mecanismo válvula). Colapso pulmonar progresivo. Desviación mediastino. Compromiso hemodinámico. Emergencia: descompresión urgente (aguja 2° EIC línea medioclavicular), luego tubo torácico',
          '<strong>Obesidad e hipoventilación:</strong> Síndrome obesidad-hipoventilación (SOH). IMC >30, PaCO₂ >45 mmHg. Compliance pared torácica↓, CRF↓, trabajo respiratorio↑. Hipoxemia nocturna. Tx: pérdida peso, BiPAP, oxígeno',
          '<strong>Enfermedades neuromusculares:</strong> Debilidad músculos respiratorios. ELA, distrofias musculares, miastenia. Restrictivas. Insuficiencia respiratoria hipercápnica. Tx: ventilación no invasiva (BiPAP), asistencia tos',
          '<strong>Test de broncoprovocación:</strong> Metacolina (agonista muscarínico). Broncoconstricción en hiperreactividad. ↓FEV1 ≥20% (PC20). Diagnóstico asma cuando espirometría normal. Contraindicaciones: FEV1 <60%, embarazo, IAM reciente',
          '<strong>Pletismografía corporal:</strong> Cabina hermética. Mide CPT, VR, CRF, Raw (resistencia). Técnica patrón oro para volúmenes pulmonares. Útil en obstrucción severa (dilución He subestima)'
        ]
      }
    ]
  },
  {
    id: 'intercambio-gaseoso',
    nombre: 'Intercambio Gaseoso y Transporte',
    subtitulo: 'Difusión, perfusión y transporte de O₂ y CO₂',
    icono: '🔄',
    categorias: ['fisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Ley de Fick (difusión):</strong> V̇gas = (A/T) × D × (P1 - P2). Área (A), grosor (T), coeficiente difusión (D), gradiente presión (ΔP)',
          '<strong>Presiones parciales normales:</strong> Aire: PO₂ 160 mmHg, PCO₂ 0.3 mmHg. Alveolar: PO₂ ~100 mmHg, PCO₂ ~40 mmHg. Arterial: PO₂ 80-100 mmHg, PCO₂ 35-45 mmHg',
          '<strong>Gradientes de difusión:</strong> O₂ alveolar-capilar: 60 mmHg (inicio) → 0 mmHg (equilibrio 0.25 s). CO₂: 6 mmHg (sangre venosa-alveolar)',
          '<strong>CO₂ difunde 20x más rápido que O₂:</strong> Mayor solubilidad en agua. Raramente limitado por difusión (excepto ejercicio extremo, enfermedad intersticial)',
          '<strong>DLCO (capacidad difusión CO):</strong> Test función pulmonar. CO usado (afinidad Hb, no limitado por perfusión). Normal: >75% predicho. ↓ en enfisema, FPI, hipertensión pulmonar',
          '<strong>Limitación difusión vs perfusión:</strong> O₂ normalmente limitado por perfusión (equilibra <0.25 s). Difusión limita en: ejercicio extremo, altitud, intersticial'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Transporte de oxígeno',
        datos: [
          { label: 'Hemoglobina', value: 'Tetrámero (2α, 2β). Hierro ferroso (Fe²⁺). 4 sitios unión O₂. Cooperatividad positiva (curva sigmoide). 1 g Hb une 1.34 mL O₂. [Hb] normal: 15 g/dL (♂), 13.5 g/dL (♀).' },
          { label: 'Contenido O₂ arterial (CaO₂)', value: 'CaO₂ = (1.34 × [Hb] × SaO₂) + (0.003 × PaO₂). ~20 mL O₂/dL sangre. 98% unido a Hb, 2% disuelto. Crítico: [Hb] y SaO₂, no tanto PaO₂.' },
          { label: 'Curva disociación O₂-Hb', value: 'Sigmoide. P50 normal: 27 mmHg (PO₂ donde SaO₂ = 50%). Plateau: >60 mmHg SaO₂ >90%. Parte empinada: 20-60 mmHg (descarga O₂ tejidos).' },
          { label: 'Shift derecha (↓afinidad)', value: 'Facilita descarga O₂ a tejidos. Causas: ↑temperatura, ↑PCO₂ (efecto Bohr), ↑H⁺ (acidosis), ↑2,3-DPG (altitud, anemia). P50 aumenta.' },
          { label: 'Shift izquierda (↑afinidad)', value: 'Dificulta descarga O₂. Causas: ↓temperatura, ↓PCO₂ (alcalosis), ↓2,3-DPG, HbF (fetal), carboxihemoglobina. P50 disminuye.' },
          { label: '2,3-DPG (difosfoglicerato)', value: 'Producto glucólisis eritrocitaria. Se une Hb desoxigenada → ↓afinidad O₂. Aumenta en: altitud crónica, anemia, EPOC. Adaptación a hipoxia crónica.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Transporte de CO₂',
        items: [
          '<strong>Tres formas de transporte:</strong> Disuelto (7%), carbaminohemoglobina (23%), bicarbonato (70%). Total: ~48-53 mL CO₂/dL sangre',
          '<strong>CO₂ disuelto:</strong> 0.03 mL CO₂/dL/mmHg. Menos que O₂ pero 20x más soluble. PCO₂ venoso ~46 mmHg, arterial ~40 mmHg',
          '<strong>Carbaminohemoglobina:</strong> CO₂ + grupos amino (NH₂) de Hb. No hemo. Desoxihemoglobina une más CO₂ (efecto Haldane). Reversible en pulmones',
          '<strong>Bicarbonato (HCO₃⁻):</strong> CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. Anhidrasa carbónica (AC) en eritrocitos acelera 13,000x. HCO₃⁻ sale a plasma (intercambiador Cl⁻/HCO₃⁻, AE1)',
          '<strong>Efecto Haldane:</strong> Desoxigenación de Hb ↑capacidad transporte CO₂ (20%). Mecanismo: desoxiHb es base más débil, acepta H⁺, ↑formación HCO₃⁻. Recíproco a Bohr',
          '<strong>Curva disociación CO₂:</strong> Casi lineal (vs sigmoide O₂). Diferencia arteriovenosa CO₂: ~4 mL/dL. Mayor capacidad buffer que O₂'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Relación ventilación-perfusión (V/Q)',
        items: [
          '<strong>V/Q ideal = 1:</strong> Ventilación (V̇) y perfusión (Q̇) pareadas. V̇/Q̇ global normal: ~0.8 (4 L/min ventilación alveolar, 5 L/min gasto cardíaco)',
          '<strong>Heterogeneidad V/Q:</strong> Bases: V/Q ~0.6 (↑perfusión por gravedad). Ápices: V/Q ~3 (↓perfusión). Heterogeneidad normal compensada. Patología exacerba',
          '<strong>Shunt (V/Q = 0):</strong> Perfusión sin ventilación. Sangre venosa → arterial sin oxigenar. Causas: atelectasia, neumonía, edema. No responde a O₂ suplementario',
          '<strong>Espacio muerto (V/Q = ∞):</strong> Ventilación sin perfusión. Aire "desperdiciado". Anatómico (~150 mL vías conductoras) + alveolar (no perfundidos). Aumentado: embolia pulmonar, EPOC',
          '<strong>Vasoconstricción pulmonar hipóxica (VPH):</strong> Mecanismo compensatorio. Baja PAO₂ → vasoconstricción arteriola local → redistribución flujo a áreas mejor ventiladas. Único lecho vascular con respuesta constrictora a hipoxia',
          '<strong>Ecuación del shunt:</strong> Q̇s/Q̇t = (CcO₂ - CaO₂)/(CcO₂ - Cv̄O₂). Normal <5%. >10%: hipoxemia significativa. >20%: O₂ suplementario inefectivo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Hipoxemia:</strong> PaO₂ <80 mmHg. Causas: hipoventilación (↑PCO₂), difusión↓, shunt, V/Q mismatch, baja PiO₂ (altitud). Gradiente A-a O₂ normal <15 mmHg (aumenta con edad). Hipoxemia con A-a normal: hipoventilación',
          '<strong>Embolia pulmonar:</strong> Espacio muerto↑↑ (V/Q ∞). Hipoxemia por shunt en áreas atelectásicas. Hipocapnia (hiperventilación compensatoria). Dx: angio-TC, D-dímero, score Wells. Tx: anticoagulación, trombolisis si inestable',
          '<strong>Síndrome hepatopulmonar:</strong> Vasodilatación pulmonar en cirrosis. Shunt + difusión↓. Hipoxemia (PaO₂ <80 mmHg) que empeora de pie (ortodesoxia). Platipnea. Diagnóstico: ecocardiograma contraste, gammagrafía MAA. Tx definitivo: trasplante hepático',
          '<strong>Intoxicación por CO:</strong> COHb (carboxihemoglobina). CO afinidad 200-250x mayor que O₂. Desplaza curva O₂ izquierda. PaO₂ normal pero contenido O₂↓↓. Síntomas: cefalea, náusea, confusión, coma. Tx: O₂ al 100% (t½ COHb: 4-6 h → 40-90 min), cámara hiperbárica si severo',
          '<strong>Metahemoglobinemia:</strong> Fe²⁺ → Fe³⁺ (no une O₂). Causas: nitratos, dapsona, anestésicos locales, deficiencia citocromo b5 reductasa. Cianosis con PaO₂ normal. Sangre marrón chocolate. MetHb >1.5 g/dL: cianosis. >20%: síntomas. Tx: azul de metileno',
          '<strong>Mal de montaña agudo (AMS):</strong> >2500 m. Hipoxia hipobárica. Síntomas: cefalea, náusea, fatiga, insomnio. Edema cerebral altitud (HACE): ataxia, confusión. Edema pulmonar altitud (HAPE): disnea, tos, crepitantes. Tx: descenso, O₂, acetazolamida (AMS), dexametasona (HACE), nifedipino (HAPE)',
          '<strong>Policitemia:</strong> Hb ↑. Primaria (policitemia vera, neoplasia mieloproliferativa). Secundaria: hipoxia crónica (EPOC, altitud), tumor (RCC, hepatoma). Hct >60%: hiperviscosidad. Tx: flebotomía, hidroxiurea',
          '<strong>Gasometría arterial:</strong> pH (7.35-7.45), PaCO₂ (35-45 mmHg), PaO₂ (80-100 mmHg), HCO₃⁻ (22-26 mEq/L), SaO₂ (>95%). Gradiente A-a = 150 - 1.25×PaCO₂ - PaO₂ (FiO₂ 0.21, nivel mar)'
        ]
      }
    ]
  }
];
