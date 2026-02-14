// ═══════════════════════════════════════════════════════════
// SISTEMA-ENDOCRINO-DATA.JS - Base de datos sobre Sistema Endocrino
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const SISTEMA_ENDOCRINO_DATA = [
  {
    id: 'hipotalamo-hipofisis',
    nombre: 'Eje Hipotálamo-Hipófisis',
    subtitulo: 'Centro de control endocrino maestro',
    icono: '🧠',
    categorias: ['ejes-hormonales'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Hipotálamo:</strong> Núcleo paraventricular (PVN), núcleo supraóptico (SON), núcleo arcuato. Neuronas magnocelulares (ADH, oxitocina) y parvocelulares (hormonas liberadoras)',
          '<strong>Hipófisis anterior (adenohipófisis):</strong> Derivación ectodérmica (bolsa de Rathke). 5 tipos celulares: somatotropos (GH), lactotropos (PRL), tirotropos (TSH), gonadotropos (LH/FSH), corticotropos (ACTH)',
          '<strong>Hipófisis posterior (neurohipófisis):</strong> Extensión neural. Almacena y libera ADH (vasopresina) y oxitocina. Sin síntesis hormonal (producción en hipotálamo)',
          '<strong>Sistema porta hipotálamo-hipofisario:</strong> Red capilar primaria (eminencia media) → venas portales → red capilar secundaria (adenohipófisis). Permite alta concentración local de hormonas liberadoras',
          '<strong>Retroalimentación negativa:</strong> Hormonas periféricas (T3/T4, cortisol, esteroides sexuales) inhiben hipotálamo e hipófisis. Conserva homeostasis. Retroalimentación positiva rara (pico LH ovulación)',
          '<strong>Ritmos circadianos:</strong> Núcleo supraquiasmático (NSQ). Regula ACTH/cortisol (pico matutino), GH (pico nocturno), melatonina (pineal, nocturna)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Hormonas hipotalámicas y sus efectos',
        datos: [
          { label: 'TRH (tirotropina)', value: 'Tripéptido. Estimula TSH y PRL. Hipotiroidismo primario → ↑TRH → ↑TSH. Test TRH: respuesta exagerada en hipotiroidismo primario, ausente en secundario.' },
          { label: 'CRH (corticotropina)', value: 'Péptido 41 aa. Estimula ACTH y β-endorfinas. Estrés (físico, psicológico) → ↑CRH. Test CRH: diagnóstico enfermedad Cushing (adenoma) vs síndrome Cushing ectópico.' },
          { label: 'GnRH (gonadotropina)', value: 'Decapéptido. Pulsátil (90-120 min). Estimula LH y FSH. Pulsos rápidos favorecen LH, lentos FSH. Análogos: agonistas (leuprolide) vs antagonistas (cetrorelix).' },
          { label: 'GHRH (somatotropina)', value: 'Péptido 44 aa. Estimula GH. Antagonizado por somatostatina (SS-14, SS-28). Somatostatina también inhibe TSH, insulina, glucagón. Análogo: octreotide (acromegalia).' },
          { label: 'Dopamina', value: 'Catecolamina. Inhibe prolactina (PIF = prolactin inhibiting factor). Vía tuberoinfundibular. Antagonistas dopaminérgicos (metoclopramida, antipsicóticos) → hiperprolactinemia.' },
          { label: 'ADH (vasopresina)', value: 'Nonapéptido. Sintetizado en SON/PVN, liberado en neurohipófisis. V2R (riñón) → acuaporina-2 → reabsorción H₂O. V1R (vascular) → vasoconstricción. Osmolaridad >280 mOsm/kg → liberación.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Hormonas de la adenohipófisis',
        items: [
          '<strong>GH (hormona de crecimiento):</strong> 191 aa. Pulsátil (pico nocturno). Efectos directos (lipólisis, gluconeogénesis, cetogénesis) e indirectos vía IGF-1 (crecimiento lineal, síntesis proteica). Receptor GHR (JAK-STAT)',
          '<strong>IGF-1 (factor de crecimiento similar insulina):</strong> Hepático (endocrino) y local (paracrino). Vida media larga (12-15 h vs GH 20 min). Marcador mejor de exceso/deficiencia GH. IGFBP-3 prolonga vida media',
          '<strong>Prolactina:</strong> 199 aa. Lactogénesis (con cortisol, insulina, T3). Supresión GnRH (amenorrea lactacional). Estrógenos ↑transcripción PRL. Dopamina inhibe. Prolactinoma: tumor hipofisario más común',
          '<strong>TSH (tirotropina):</strong> Glicoproteína (subunidad α común, β específica). Estimula tiroides (síntesis T3/T4, captación yodo, crecimiento folicular). Retroalimentación: T3/T4 ↑ → TSH ↓',
          '<strong>ACTH (corticotropina):</strong> 39 aa. Precursor POMC (proopiomelanocortina) → ACTH, β-endorfina, α-MSH. Estimula cortisol (zona fasciculada). Ritmo circadiano (pico 6-8 AM). Estrés agudo ↑↑ACTH',
          '<strong>LH y FSH (gonadotropinas):</strong> Glicoproteínas (subunidad α común). LH: células de Leydig (testosterona), cuerpo lúteo (progesterona). FSH: espermatogénesis (Sertoli), foliculogénesis (granulosa)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y feedback',
        items: [
          '<strong>Eje hipotálamo-hipófisis-tiroides (HHT):</strong> TRH → TSH → T3/T4. T3 libre inhibe TSH (set point). Hipotiroidismo 1°: ↑TSH, ↓T4. 2°: ↓TSH, ↓T4. Subclínico: ↑TSH, T4 normal',
          '<strong>Eje hipotálamo-hipófisis-adrenal (HHA):</strong> CRH → ACTH → cortisol. Estrés activa. Cortisol pico matutino. Test supresión dexametasona: normal ↓cortisol. Cushing: no suprime (dosis baja), adenoma sí (dosis alta)',
          '<strong>Eje hipotálamo-hipófisis-gonadal (HHG):</strong> GnRH pulsátil → LH/FSH. Hombres: retroalimentación negativa testosterona/inhibina B. Mujeres: fase folicular (negativa), preovulatoria (positiva estrógenos → pico LH)',
          '<strong>Regulación GH-IGF-1:</strong> GHRH (+), somatostatina (-), ghrelina (+), glucosa (-), ácidos grasos libres (-). IGF-1 inhibe GH (retroalimentación negativa). Ayuno/hipoglucemia → ↑GH',
          '<strong>Control de prolactina:</strong> Inhibición tónica por dopamina. Estrógenos ↑síntesis y liberación PRL. Succión mamaria → ↓dopamina → ↑PRL. TRH también estimula (hipotiroidismo → hiperprolactinemia leve)',
          '<strong>Test de estimulación:</strong> Hipoglucemia insulínica (GH, ACTH), GHRH (GH), CRH (ACTH), GnRH (LH/FSH). Test de supresión: carga glucosa (GH en acromegalia), dexametasona (cortisol en Cushing)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Acromegalia:</strong> Exceso GH adulto (adenoma somatotropo). Crecimiento acral, prognatismo, macroglosia, organomegalia. Complicaciones: diabetes, HTA, cardiomiopatía, apnea sueño. IGF-1 ↑↑. Tx: cirugía transesfenoidal, análogos somatostatina (octreotide), antagonista GH (pegvisomant)',
          '<strong>Déficit GH adulto:</strong> Hipopituitarismo. Sarcopenia, obesidad central, dislipidemia, osteoporosis, fatiga, ↓calidad vida. Test estimulación (hipoglucemia insulínica, GHRH-arginina). Tx: GH recombinante (somatropina)',
          '<strong>Prolactinoma:</strong> Adenoma hipofisario secretor PRL. Más común (40% adenomas). Mujeres: amenorrea, galactorrea, infertilidad. Hombres: disfunción eréctil, ginecomastia, infertilidad. PRL >200 ng/mL prácticamente diagnóstico. Tx: agonistas dopamina (cabergolina > bromocriptina)',
          '<strong>Diabetes insípida central:</strong> Déficit ADH. Poliuria (>3 L/día), polidipsia, nicturia. Osmolaridad urinaria baja (<300 mOsm/kg), sérica alta (>295). Causas: idiopática, trauma, cirugía, tumor. Test deprivación agua + desmopresina. Tx: desmopresina (análogo ADH)',
          '<strong>SIADH (secreción inapropiada ADH):</strong> Exceso ADH. Hiponatremia dilucional (<135 mEq/L), osmolaridad urinaria inapropiadamente alta (>100). Euvolémico. Causas: malignidad (SCLC), fármacos (ISRS, carbamacepina), pulmonar, SNC. Tx: restricción hídrica, tolvaptán (antagonista V2)',
          '<strong>Síndrome de Sheehan:</strong> Necrosis hipofisaria postparto. Hemorragia obstétrica → shock → infarto hipofisario (hipertrofiada en embarazo). Agalactia, amenorrea, fatiga. Panhipopituitarismo. Tx: reemplazo hormonal múltiple',
          '<strong>Apoplejía hipofisaria:</strong> Hemorragia/infarto adenoma. Cefalea súbita severa, alteración visual (compresión quiasma), oftalmoplejía (III, IV, VI). Emergencia neuroquirúrgica. Insuficiencia suprarrenal aguda. Tx: corticoides, cirugía descompresiva urgente',
          '<strong>Adenoma no funcionante:</strong> 25-30% adenomas hipofisarios. Efecto masa: cefalea, hemianopsia bitemporal (compresión quiasma), hipopituitarismo (compresión tejido normal). Incidentaloma común (microadenoma <1 cm en 10% población). Macroadenoma: vigilancia vs cirugía'
        ]
      }
    ]
  },
  {
    id: 'tiroides-paratiroides',
    nombre: 'Glándula Tiroides y Paratiroides',
    subtitulo: 'Metabolismo y homeostasis del calcio',
    icono: '🦋',
    categorias: ['glandulas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Anatomía tiroides:</strong> Lóbulos derecho/izquierdo + istmo. Localización: anterior tráquea, debajo cartílago tiroides. Irrigación: arteria tiroidea superior (carótida externa) e inferior (tronco tirocervical)',
          '<strong>Folículo tiroideo:</strong> Unidad funcional. Células foliculares (tirocitos) rodean coloide (tiroglobulina). Células C parafoliculares (calcitonina). Coloide: almacén hormonal (reserva 2-3 meses)',
          '<strong>Síntesis hormonal:</strong> Captación I⁻ (NIS, simporter Na⁺/I⁻) → oxidación (tiroperoxidasa, TPO) → organificación (yodación tirosinas en tiroglobulina) → acoplamiento (MIT + DIT = T3, DIT + DIT = T4)',
          '<strong>T4 vs T3:</strong> T4 (tiroxina): 93% secreción tiroidea, prohormona, vida media 7 días. T3 (triyodotironina): 7% secreción, 80% conversión periférica (5\'-deiodinasa), 3-4x más potente, vida media 1 día',
          '<strong>Proteínas transportadoras:</strong> 99.97% T4 unida (TBG 70%, albúmina 20%, TBPA 10%). Solo fracción libre (0.03% T4, 0.3% T3) biológicamente activa. Embarazo/estrógenos → ↑TBG → ↑T4 total (T4 libre normal)',
          '<strong>Paratiroides:</strong> 4 glándulas (2 superiores, 2 inferiores). Células principales (PTH), oxífilas (función incierta). Receptor sensor calcio (CaSR): ↓Ca²⁺ → ↑PTH. Localización variable (riesgo cirugía tiroidea)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Hormonas tiroideas y sus efectos',
        datos: [
          { label: 'Metabolismo basal', value: 'Aumentan consumo O₂ y producción calor (termogénesis). Estimulan Na⁺/K⁺-ATPasa. ↑metabolismo basal 60-100%. Hipotiroidismo: intolerancia frío, hipotermia. Hipertiroidismo: intolerancia calor, sudoración.' },
          { label: 'Sistema cardiovascular', value: 'Efectos inotrópicos y cronotrópicos positivos. ↑expresión receptores β-adrenérgicos. ↑GC, ↓RVS. Hipertiroidismo: taquicardia, FA, IC alto gasto. Hipotiroidismo: bradicardia, derrame pericárdico.' },
          { label: 'Crecimiento y desarrollo', value: 'Esenciales para desarrollo cerebral fetal/neonatal. Sinergismo con GH/IGF-1 (crecimiento lineal). Hipotiroidismo congénito no tratado → cretinismo (retraso mental irreversible, talla baja).' },
          { label: 'Metabolismo de nutrientes', value: 'Lipólisis, gluconeogénesis, síntesis proteica (dosis fisiológicas) vs catabolismo (exceso). Hipertiroidismo: pérdida peso pese a hiperfagia. Hipotiroidismo: ganancia peso, hipercolesterolemia.' },
          { label: 'Sistema nervioso', value: 'Maduración SNC, mielinización. Adulto: alerta mental. Hipertiroidismo: ansiedad, tremor, hiperreflexia. Hipotiroidismo: letargia, bradipsiquia, hiporreflexia (relajación fase tardía).' },
          { label: 'PTH (parathormona)', value: 'Péptido 84 aa. ↑Ca²⁺ sérico: ↑reabsorción renal Ca²⁺, ↑resorción ósea (osteoclastos), ↑1,25(OH)₂D₃ (↑absorción intestinal). ↓fosfato (↑excreción renal). Pulsos: anabólico óseo (teriparatida). Continuo: catabólico.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Regulación y metabolismo del calcio',
        items: [
          '<strong>Calcio sérico normal:</strong> 8.5-10.5 mg/dL (2.1-2.6 mmol/L). 50% ionizado (activo), 40% unido albúmina, 10% complejos (citrato, fosfato). Calcio corregido = Ca medido + 0.8 × (4 - albúmina)',
          '<strong>Vitamina D:</strong> 7-dehidrocolesterol (piel) + UVB → D3 (colecalciferol) → 25(OH)D₃ (hígado, forma circulante) → 1,25(OH)₂D₃ (riñón, calcitriol, forma activa). 1α-hidroxilasa renal estimulada por PTH, ↓fosfato',
          '<strong>Calcitriol (1,25(OH)₂D₃):</strong> ↑absorción intestinal Ca²⁺ y PO₄³⁻ (calbindina). ↑reabsorción renal. Permisivo para PTH en hueso. Inmunomodulador. Receptor nuclear VDR',
          '<strong>Calcitonina:</strong> Péptido 32 aa. Células C (parafoliculares) tiroides. ↓Ca²⁺ sérico (inhibe osteoclastos). Importancia fisiológica limitada en adultos (tiroidectomía sin hipercalcemia). Marcador: carcinoma medular tiroides',
          '<strong>FGF23 (factor crecimiento fibroblástico 23):</strong> Osteocitos. ↓reabsorción renal PO₄³⁻ (fosfatúrico). ↓1α-hidroxilasa (↓calcitriol). Exceso: raquitismo/osteomalacia hipofosfatémica. Deficiencia/resistencia: hiperfosfatemia, calcificación vascular',
          '<strong>Balance del calcio:</strong> Ingesta 1000 mg/día. Absorción intestinal 30-80% (calcitriol-dependiente). Filtrado renal 10 g/día, reabsorción 98-99% (TCP 60%, asa Henle 30%, TCD 10% PTH-regulado). Pérdidas: orina, heces, sudor'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Bocio y nódulos tiroideos',
        items: [
          '<strong>Bocio simple (no tóxico):</strong> Aumento tamaño tiroideo sin disfunción. Causas: deficiencia yodo (endémico), bociógenos (yuca, col), idiopático. TSH elevación compensatoria → hiperplasia. Evolución: multinodular',
          '<strong>Bocio multinodular tóxico:</strong> Nódulos autónomos (mutaciones TSHR). Hipertiroidismo en ancianos. TSH suprimido, captación heterogénea (gammagrafía). Fenómeno Jod-Basedow: hipertiroidismo tras carga yodo',
          '<strong>Nódulo tiroideo:</strong> Prevalencia 5% palpación, 50-70% ecografía. 90-95% benignos. Riesgo malignidad: historia radiación cuello, <20 o >70 años, hombre, crecimiento rápido, adenopatías, fijación',
          '<strong>Clasificación Bethesda (citología PAAF):</strong> I: no diagnóstico. II: benigno (coloide, tiroiditis Hashimoto). III: atepia. IV: neoplasia folicular. V: sospechoso malignidad. VI: maligno. III-IV: considerar panel molecular',
          '<strong>Características ecográficas sospechosas:</strong> Hipoecogénico, taller que ancho, microcalcificaciones, márgenes irregulares, vascularización central. TI-RADS: clasificación riesgo. >1 cm + sospecha → PAAF',
          '<strong>Carcinoma papilar:</strong> 80-85% cánceres tiroides. Cuerpos de psammoma, núcleos en vidrio esmerilado. Metástasis linfáticas (30-40%). Excelente pronóstico (supervivencia 10 años >95%). Tx: tiroidectomía, yodo radioactivo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Enfermedad de Graves:</strong> Hipertiroidismo autoinmune (0.5% población). Anticuerpos estimulantes TSHRAb (TRAb). Triada: hipertiroidismo, oftalmopatía (30-50%, exoftalmos, diplopía), dermopatía (mixedema pretibial, raro). Tx: antitiroideos (metimazol, propiltiouracilo), yodo radioactivo, cirugía',
          '<strong>Tiroiditis de Hashimoto:</strong> Hipotiroidismo autoinmune. Anti-TPO (90%), anti-tiroglobulina (50%). Infiltración linfocitaria, metaplasia de Hürthle. Bocio inicial (10x riesgo linfoma tiroides). Asociación: enfermedades autoinmunes, síndrome Down, Turner. Tx: levotiroxina',
          '<strong>Hipotiroidismo subclínico:</strong> TSH 4.5-10 mU/L, T4 libre normal. Prevalencia 4-10%. Progresión a franco: 2-5%/año (mayor si anti-TPO+). Controversia tratamiento. Considerar si: TSH >10, síntomas, embarazo, anti-TPO+, dislipidemia',
          '<strong>Tirotoxicosis:</strong> Síndrome por exceso hormonas tiroideas. Causas: Graves (60-80%), multinodular tóxico, adenoma tóxico, tiroiditis (subaguda, linfocítica), facticia, amiodarona. Tormenta tiroidea: emergencia (FC >140, fiebre >40°C, delirio). Tx: PTU, β-bloqueantes, corticoides, yodo',
          '<strong>Hiperparatiroidismo primario:</strong> Adenoma (85%), hiperplasia (15%), carcinoma (<1%). Hipercalcemia (>90% asintomática). Síntomas: nefrolitiasis, osteoporosis, debilidad, depresión. "Stones, bones, groans, psychiatric overtones". PTH inapropiadamente elevada. Tx: paratiroidectomía si sintomático, Ca >1 mg/dL sobre límite, <50 años',
          '<strong>Hipoparatiroidismo:</strong> Postquirúrgico (95%), autoinmune (APECED), genético (DiGeorge). Hipocalcemia, hiperfosfatemia, PTH baja/indetectable. Síntomas: parestesias, Chvostek, Trousseau, tetania, QT largo. Tx: calcio, calcitriol. PTH recombinante si refractario',
          '<strong>Hipercalcemia maligna:</strong> Metástasis óseas (mama, próstata, mieloma) vs PTHrP (pulmón, renal, escamoso). PTHrP mimetiza PTH pero no detectado en ensayo PTH. Hipercalcemia + PTH suprimida + PTHrP elevada. Tx: hidratación, bifosfonatos, calcitonina, denosumab',
          '<strong>Osteoporosis:</strong> DMO T-score ≤-2.5 (DEXA). Postmenopáusica (↓estrógenos), senil, secundaria (corticoides, hipertiroidismo, hiperparatiroidismo). Fracturas: vertebral, cadera, Colles. Tx: bifosfonatos (alendronato), denosumab, teriparatida (PTH), romosozumab (anti-esclerostina)'
        ]
      }
    ]
  },
  {
    id: 'pancreas-endocrino',
    nombre: 'Páncreas Endocrino y Metabolismo Glucosa',
    subtitulo: 'Regulación de la glucemia',
    icono: '🩸',
    categorias: ['glandulas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Islotes de Langerhans:</strong> 1-2% masa pancreática. ~1 millón de islotes. Células β (65-80%, insulina), α (15-20%, glucagón), δ (3-10%, somatostatina), PP (<1%, polipéptido pancreático), ε (rara, ghrelina)',
          '<strong>Arquitectura islote:</strong> Células β en núcleo, α y δ en periferia. Rica vascularización (10% flujo pancreático). Flujo sanguíneo β → α permite regulación paracrina (insulina inhibe glucagón)',
          '<strong>Glucosa normal:</strong> Ayunas 70-100 mg/dL (3.9-5.6 mmol/L). Postprandial <140 mg/dL. Homeostasis estrecha. Cerebro: 120 g glucosa/día (~50% consumo basal). No almacena glucógeno → hipoglucemia → neuroglicopenia',
          '<strong>Transportadores de glucosa:</strong> GLUT1 (ubicuo, basal), GLUT2 (β, hígado, sensor), GLUT3 (neuronal), GLUT4 (músculo, tejido adiposo, insulina-dependiente), SGLT1/2 (intestino/riñón, Na⁺-acoplado)',
          '<strong>Gluconeogénesis:</strong> Hígado (90%), riñón (10%). Sustratos: lactato (Cori), alanina (glucosa-alanina), glicerol (lipólisis). Enzimas clave: PEPCK, fructosa-1,6-bisfosfatasa, glucosa-6-fosfatasa. Cortisol, glucagón estimulan',
          '<strong>Glucogenólisis:</strong> Degradación glucógeno. Glucagón (hígado) y epinefrina (músculo) activan fosforilasa. Hígado libera glucosa (G6Pasa). Músculo usa internamente (sin G6Pasa)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Insulina y glucagón',
        datos: [
          { label: 'Insulina - Estructura', value: 'Péptido 51 aa (cadena A 21 aa, cadena B 30 aa, puente disulfuro). Preproinsulina → proinsulina (ER) → insulina + péptido C (Golgi). Péptido C vida media larga: marcador secreción endógena.' },
          { label: 'Insulina - Secreción', value: 'Glucosa entra β vía GLUT2 → glucoquinasa (sensor) → ↑ATP/ADP → cierre canal KATP → despolarización → apertura canal Ca²⁺ → ↑Ca²⁺ intracelular → exocitosis. Sulfonilureas cierran KATP (secretagogos).' },
          { label: 'Insulina - Efectos metabólicos', value: '↑captación glucosa (GLUT4 en músculo/adiposo), ↑glucólisis, ↑síntesis glucógeno, ↑lipogénesis, ↑síntesis proteica. ↓gluconeogénesis, ↓glucogenólisis, ↓lipólisis, ↓cetogénesis. Hormona anabólica.' },
          { label: 'Insulina - Señalización', value: 'Receptor tirosina quinasa (α₂β₂). Fosforilación IRS → PI3K/Akt (metabolismo, GLUT4) y Ras/MAPK (proliferación). Resistencia: ↓señalización IRS (fosforilación serina, inflamación).' },
          { label: 'Glucagón - Síntesis y secreción', value: 'Péptido 29 aa. Células α. Secretado en hipoglucemia (<70 mg/dL). Aminoácidos (alanina, arginina) estimulan. Insulina, somatostatina, GLP-1 inhiben. Respuesta ↓ en DM1 (déficit contrarregulación).' },
          { label: 'Glucagón - Efectos', value: 'Hepático principalmente. ↑glucogenólisis (minutos), ↑gluconeogénesis (horas), ↑cetogénesis (ayuno). Lipólisis en adipocito. Receptor acoplado Gs → cAMP → PKA. Antagonista de insulina. Ratio insulina/glucagón determina estado metabólico.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Incretinas y hormonas gastrointestinales',
        items: [
          '<strong>GLP-1 (péptido similar glucagón 1):</strong> Células L intestinales (íleon, colon). Liberado por nutrientes orales. ↑secreción insulina glucosa-dependiente (sin hipoglucemia), ↓glucagón, ↓vaciamiento gástrico, ↑saciedad. DPP-4 degrada rápidamente (t½ 1-2 min)',
          '<strong>GIP (polipéptido insulinotrópico dependiente glucosa):</strong> Células K (duodeno, yeyuno). ↑insulina. Efecto incretina: 50-70% respuesta insulina oral vs IV. Preservado GLP-1, alterado GIP en DM2',
          '<strong>Agonistas GLP-1:</strong> Exenatida, liraglutida, semaglutida, dulaglutida. Resistentes DPP-4. Pérdida peso 5-15%. Beneficio CV (MACE) demostrado. Efectos: náusea (transitoria), pancreatitis (raro), cáncer medular tiroides (roedores, no humanos)',
          '<strong>Inhibidores DPP-4 (gliptinas):</strong> Sitagliptina, linagliptina, saxagliptina. ↑GLP-1 endógeno 2-3x. Neutro peso. Sin beneficio CV. Bien tolerados',
          '<strong>Amilina:</strong> Co-secretada con insulina (células β). ↓glucagón, ↓vaciamiento gástrico, ↑saciedad. Deficiente en DM1. Pramlintida (análogo): adyuvante insulina',
          '<strong>Ghrelina:</strong> "Hormona del hambre". Estómago (células X). ↑antes comidas, ↓postprandial. ↑apetito, ↑GH. Niveles bajos en obesidad (resistencia). Altos en Prader-Willi'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Respuesta a hipoglucemia',
        items: [
          '<strong>Umbral glucémico:</strong> <70 mg/dL: ↓insulina. <65-70: ↑glucagón, ↑epinefrina. <55: ↑GH, ↑cortisol. <50: síntomas autonómicos. <30: neuroglucopenia',
          '<strong>Contrarregulación:</strong> Primera línea: glucagón (minutos). Segunda: epinefrina (catecolaminas, 5-10 min). Tercera: GH y cortisol (horas). Falla secuencial en DM1 larga evolución',
          '<strong>Síntomas autonómicos:</strong> Adrenérgicos: palpitaciones, tremor, ansiedad, sudoración. Colinérgicos: hambre, sudoración. Mediados por epinefrina. Atenuados en desconocimiento hipoglucemia',
          '<strong>Síntomas neuroglucopénicos:</strong> Confusión, dificultad concentración, cambio personalidad, visión borrosa, parestesias, debilidad, convulsiones, coma. <20-30 mg/dL: riesgo daño cerebral',
          '<strong>Desconocimiento de hipoglucemia:</strong> Pérdida respuesta autonómica. Hipoglucemias recurrentes → umbral ↓. Mayor riesgo hipoglucemia severa (3-6x). DM1 larga evolución, neuropatía autonómica. Evitar hipoglucemias estrictas restaura parcialmente',
          '<strong>Tratamiento hipoglucemia:</strong> Consciente: 15 g carbohidratos rápidos (jugo, tabletas glucosa). Esperar 15 min, re-evaluar. Repetir si persiste. Inconsciente: glucagón IM/SC 1 mg (kit emergencia) o glucosa IV 25 g (50 mL dextrosa 50%)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica y aplicaciones',
        items: [
          '<strong>Diabetes mellitus tipo 1 (DM1):</strong> Destrucción autoinmune células β (85-90% anticuerpos: anti-GAD, anti-IA2, anti-ZnT8). Deficiencia insulina absoluta. Inicio juvenil típico (pico 10-14 años) pero cualquier edad. Cetoacidosis debut 25-40%. HLA-DR3, DR4. Tx: insulina (basal-bolo, bomba)',
          '<strong>Diabetes mellitus tipo 2 (DM2):</strong> Resistencia insulina + déficit relativo. 90-95% casos. Obesidad 80-90%. Genética fuerte (concordancia gemelos >90%). Progresión: prediabetes → DM2 (pérdida 50% función β al diagnóstico). Tx escalonado: metformina → GLP-1/SGLT2 → insulina',
          '<strong>Criterios diagnóstico diabetes:</strong> Glucosa ayunas ≥126 mg/dL (x2) o glucosa 2h-PTOG ≥200 mg/dL o HbA1c ≥6.5% o glucosa aleatoria ≥200 mg/dL + síntomas. Prediabetes: glucosa ayunas 100-125, 2h-PTOG 140-199, HbA1c 5.7-6.4%. Progresión DM2: 5-10%/año',
          '<strong>Cetoacidosis diabética (CAD):</strong> Déficit insulina + exceso glucagón. Hiperglucemia >250 mg/dL, cetonemia/cetonuria, acidosis metabólica (pH <7.3, HCO₃ <18). Brecha aniónica ↑. Deshidratación, Kussmaul, aliento cetónico. Precipitantes: infección, omisión insulina. Tx: fluidos IV, insulina IV, K⁺',
          '<strong>Estado hiperosmolar hiperglucémico (EHH):</strong> DM2. Hiperglucemia severa >600 mg/dL, osmolaridad >320 mOsm/kg. Sin cetosis significativa (insulina residual previene lipólisis). Deshidratación extrema, alteración mental. Mortalidad 10-20% (>CAD). Tx: rehidratación agresiva, insulina',
          '<strong>Complicaciones microvasculares:</strong> Retinopatía (causa #1 ceguera 20-74 años), nefropatía (causa #1 ERT), neuropatía (50% DM >10 años). Hiperglucemia → vía poliol, AGEs, estrés oxidativo, PKC. Control glucémico estricto previene/retrasa (DCCT, UKPDS)',
          '<strong>Complicaciones macrovasculares:</strong> Enfermedad cardiovascular (IAM, ACV), enfermedad arterial periférica. Riesgo CV 2-4x. DM = equivalente coronario. Control multifactorial (glucosa, PA, lípidos). Objetivos: HbA1c <7% (individualizar), PA <130/80, LDL <70 mg/dL (si ASCVD)',
          '<strong>Insulinoma:</strong> Tumor células β (90% benignos). Tríada Whipple: síntomas hipoglucemia, glucosa <55 mg/dL, alivio con glucosa. Test ayuno 72h: hipoglucemia + insulina/péptido C inapropiados. Localización: TC, RM, ecoendoscopia, cateterismo selectivo. Tx: resección quirúrgica'
        ]
      }
    ]
  }
];
