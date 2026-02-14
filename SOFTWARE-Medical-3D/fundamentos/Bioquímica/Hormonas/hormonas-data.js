// ═══════════════════════════════════════════════════════════
// HORMONAS-DATA.JS - Base de datos de hormonas
// Información basada en fuentes científicas actualizadas (2023-2026)
// ═══════════════════════════════════════════════════════════

const HORMONAS_DATA = [
  {
    id: 'insulina',
    nombre: 'Insulina',
    subtitulo: 'Hormona peptídica anabólica pancreática',
    icono: '🔽',
    categorias: ['peptidicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Hormona peptídica (51 aminoácidos, 2 cadenas: A de 21 aa, B de 30 aa, unidas por 2 puentes disulfuro)',
          '<strong>Glándula secretora:</strong> Células β de los islotes de Langerhans (páncreas endocrino)',
          '<strong>Síntesis:</strong> Preproinsulina → proinsulina (RE) → insulina + péptido C (aparato de Golgi)',
          '<strong>Vida media:</strong> 4-6 minutos en plasma. Degradada principalmente en hígado y riñón',
          '<strong>Estímulo principal:</strong> Hiperglucemia (>5.5 mM). También aminoácidos (leucina, arginina), ácidos grasos, hormonas GI (GLP-1, GIP)',
          '<strong>Función principal:</strong> Hormona anabólica. Promueve captación de glucosa, síntesis de glucógeno, lípidos y proteínas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo de acción y receptor',
        datos: [
          { label: 'Receptor de insulina', value: 'Receptor tirosina quinasa (RTK). Heterotetrámero (α₂β₂). Subunidades α extracelulares (unión a insulina), β transmembrana (actividad quinasa).' },
          { label: 'Cascada de señalización PI3K-AKT', value: 'Insulina → autofosforilación de receptor → IRS-1/2 → PI3K → PIP₃ → AKT/PKB. Efectos metabólicos principales (captación de glucosa, síntesis glucógeno/lípidos).' },
          { label: 'Cascada MAPK/ERK', value: 'Insulina → IRS → Grb2/SOS → Ras → RAF → MEK → ERK. Efectos mitogénicos (proliferación celular, expresión génica).' },
          { label: 'GLUT4 (transportador de glucosa)', value: 'Vesículas con GLUT4 en citoplasma. AKT activa → translocación a membrana plasmática → ↑captación de glucosa (músculo, adiposo). Efecto rápido (minutos).' },
          { label: 'Efectos transcripcionales', value: 'Activa FoxO (gluconeogénesis), SREBP-1c (lipogénesis), mTOR (síntesis proteica). Inhibe GSK-3 (activa glucógeno sintasa).' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Acciones metabólicas',
        items: [
          '<strong>Metabolismo de carbohidratos:</strong> ↑Captación de glucosa (músculo, adiposo), ↑glucogenogénesis (hígado, músculo), ↓glucogenólisis, ↓gluconeogénesis',
          '<strong>Metabolismo de lípidos:</strong> ↑Lipogénesis (síntesis de AG y TG), ↑captación de lípidos, ↓lipólisis (inhibe lipasa sensible a hormonas)',
          '<strong>Metabolismo de proteínas:</strong> ↑Captación de aminoácidos, ↑síntesis proteica (vía mTOR), ↓proteólisis muscular',
          '<strong>Homeostasis del potasio:</strong> ↑Captación celular de K⁺ (activa bomba Na⁺/K⁺-ATPasa). Mecanismo de emergencia en hiperpotasemia',
          '<strong>Crecimiento:</strong> Sinergismo con GH (hormona de crecimiento). Efectos mitogénicos via MAPK/ERK. Esencial para crecimiento fetal y posnatal'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación de la secreción',
        items: [
          '<strong>Sensor de glucosa:</strong> Glucoquinasa en células β determina umbral de glucosa (~5 mM). Glucosa → ATP → cierre canales K-ATP → despolarización → apertura canales Ca²⁺ → ↑Ca²⁺ intracelular → exocitosis',
          '<strong>Potenciadores:</strong> GLP-1 (péptido similar al glucagón-1), GIP (polipéptido insulinotrópico dependiente de glucosa). Incretinas secretadas por intestino tras comida',
          '<strong>Inhibidores:</strong> Somatostatina (células δ pancreáticas), adrenalina/noradrenalina (vía α₂-adrenérgicos), cortisol (crónico)',
          '<strong>Retroalimentación:</strong> Hipoglucemia → ↓secreción insulina. Hiperglucemia prolongada → desensibilización de células β (lipotoxicidad, glucotoxicidad)',
          '<strong>Péptido C:</strong> Coproducto equimolar con insulina. Vida media larga (~30 min). Marcador de secreción endógena de insulina (útil en diabetes tipo 1 tratada)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Diabetes mellitus tipo 1:</strong> Destrucción autoinmune de células β. Deficiencia absoluta de insulina. Debut típico en infancia/adolescencia. Tratamiento: insulina exógena obligatoria',
          '<strong>Diabetes mellitus tipo 2:</strong> Resistencia a insulina + deficiencia relativa. >90% de casos de diabetes. Asociada a obesidad, síndrome metabólico. Tratamiento escalonado (metformina → otros antidiabéticos → insulina)',
          '<strong>Resistencia a insulina:</strong> Disminución de respuesta tisular. Mecanismos: defectos post-receptor (IRS-1/2), ↓GLUT4, inflamación (TNF-α, IL-6), lípidos ectópicos. Compensación inicial: hiperinsulinemia',
          '<strong>Hipoglucemia hiperinsulinémica:</strong> Insulinoma (tumor de células β), nesidioblastosis (hiperplasia difusa), mutaciones activantes en receptor de sulfonilureas (KATP). Tríada de Whipple',
          '<strong>Síndrome de Rabson-Mendenhall:</strong> Mutaciones en receptor de insulina. Resistencia extrema, acantosis nigricans, hiperandrogenismo. Muy rara',
          '<strong>Insulinas terapéuticas:</strong> Ultrarrápida (lispro, aspart), rápida (regular), intermedia (NPH), larga (glargina, detemir), ultralarga (degludec). Análogos con farmacocinética optimizada',
          '<strong>Complicaciones de DM:</strong> Microvasculares (retinopatía, nefropatía, neuropatía), macrovasculares (cardiopatía isquémica, ACV, arteriopatía periférica). Relacionadas con hiperglucemia crónica',
          '<strong>Cetoacidosis diabética (CAD):</strong> Déficit severo de insulina (DM1) → lipólisis → cetogénesis → acidosis metabólica. Emergencia endocrina. pH <7.3, cetonemia, hiperglucemia >250 mg/dL'
        ]
      }
    ]
  },
  {
    id: 'cortisol',
    nombre: 'Cortisol',
    subtitulo: 'Glucocorticoide - Hormona esteroide suprarrenal',
    icono: '🔺',
    categorias: ['esteroideas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Hormona esteroide (derivado del colesterol). Glucocorticoide endógeno principal en humanos',
          '<strong>Glándula secretora:</strong> Zona fasciculada de la corteza suprarrenal',
          '<strong>Síntesis:</strong> Colesterol → pregnenolona → progesterona → 17-OH-progesterona → 11-desoxicortisol → cortisol (vía enzimas CYP)',
          '<strong>Transporte:</strong> 90-95% unido a CBG (globulina ligadora de corticosteroides) y albúmina. 5-10% libre (biológicamente activo)',
          '<strong>Vida media:</strong> 60-90 minutos. Metabolizado en hígado a cortisona (inactivo) y conjugados glucurónidos',
          '<strong>Ritmo circadiano:</strong> Pico máximo 6-8 AM (despertar). Mínimo ~medianoche. Controlado por ACTH hipofisario'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo de acción y receptor',
        datos: [
          { label: 'Receptor de glucocorticoides (GR)', value: 'Receptor nuclear intracelular. Familia de receptores esteroides. En ausencia de ligando: citoplasma unido a chaperonas (Hsp90, Hsp70).' },
          { label: 'Mecanismo genómico', value: 'Cortisol difunde a célula → une GR → disociación de chaperonas → translocación nuclear → dimerización → unión a GRE (elementos de respuesta) → ↑/↓transcripción génica.' },
          { label: 'Efectos no genómicos (rápidos)', value: 'Efectos en minutos (vs horas para genómicos). Mecanismos: interacción con membrana, señalización por receptor de membrana putativo, modulación directa de canales iónicos.' },
          { label: 'Especificidad MR vs GR', value: 'Receptor mineralocorticoide (MR) tiene igual afinidad por cortisol. 11β-HSD2 convierte cortisol → cortisona (inactiva) en riñón, protege MR. Déficit de 11β-HSD2 → exceso mineralocorticoide.' },
          { label: 'Modulación epigenética', value: 'Cortisol recluta complejos remodeladores de cromatina. Acetilación/desacetilación de histonas. Efectos duraderos en expresión génica.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Acciones fisiológicas',
        items: [
          '<strong>Metabolismo de carbohidratos:</strong> ↑Gluconeogénesis hepática, ↑resistencia a insulina periférica, ↓captación de glucosa (músculo). Efecto hiperglucemiante',
          '<strong>Metabolismo de proteínas:</strong> ↑Catabolismo proteico (músculo), ↑liberación de aminoácidos → sustrato para gluconeogénesis. Balance nitrogenado negativo',
          '<strong>Metabolismo de lípidos:</strong> ↑Lipólisis (extremidades), ↑deposición de grasa (tronco, cara, cuello). Redistribución de grasa corporal en exceso crónico',
          '<strong>Sistema inmune:</strong> ↓Respuesta inflamatoria, ↓proliferación linfocitos T, ↓producción citoquinas (IL-1, IL-6, TNF-α), ↑apoptosis de eosinófilos. Inmunosupresor potente',
          '<strong>Sistema cardiovascular:</strong> ↑Sensibilidad a catecolaminas, ↑tono vascular, ↑gasto cardíaco. Permisivo para acción de adrenalina',
          '<strong>Sistema nervioso:</strong> Modulación del humor y cognición. Niveles altos crónicos → cambios estructurales en hipocampo, amígdala. Asociado a depresión',
          '<strong>Hueso:</strong> ↓Formación ósea (↓osteoblastos), ↑resorción, ↓absorción intestinal de Ca²⁺. Osteoporosis con uso crónico',
          '<strong>Piel:</strong> ↓Síntesis de colágeno, ↓proliferación fibroblastos. Adelgazamiento cutáneo, estrías, fragilidad capilar'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Eje HHA (hipotálamo-hipófisis-adrenal)',
        items: [
          '<strong>CRH (hormona liberadora de corticotropina):</strong> Núcleo paraventricular del hipotálamo → circulación porta hipofisaria → corticotropos hipofisarios',
          '<strong>ACTH (corticotropina):</strong> Hipófisis anterior → circulación sistémica → corteza suprarrenal. Estimula síntesis y secreción de cortisol',
          '<strong>Retroalimentación negativa:</strong> Cortisol inhibe CRH (hipotálamo) y ACTH (hipófisis). Circuito de control. Supresión crónica por glucocorticoides exógenos',
          '<strong>Estrés:</strong> Activación del eje HHA. Respuesta adaptativa a corto plazo. Estrés crónico → desregulación del eje, resistencia a glucocorticoides',
          '<strong>Ritmo circadiano:</strong> CRH/ACTH máximos en madrugada (antes del despertar). Cortisol pico 30-45 min post-despertar (CAR - cortisol awakening response)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Síndrome de Cushing:</strong> Hipercortisolismo crónico. Causas: adenoma hipofisario (enfermedad de Cushing, 70%), tumor suprarrenal, ectópico (ACTH por tumor pulmonar). Manifestaciones: obesidad central, estrías, cara de luna, joroba de búfalo, HTA, diabetes, osteoporosis',
          '<strong>Enfermedad de Addison:</strong> Insuficiencia suprarrenal primaria. Destrucción autoinmune (80%). Hiperpigmentación (↑ACTH), hipotensión, hiponatremia, hiperpotasemia, hipoglucemia. Crisis addisoniana: emergencia médica',
          '<strong>Insuficiencia suprarrenal secundaria:</strong> Déficit de ACTH (hipofisaria). Sin hiperpigmentación. Causa común: supresión por glucocorticoides exógenos crónicos. Recuperación del eje: meses tras suspensión',
          '<strong>Síndrome de Cushing iatrogénico:</strong> Uso prolongado de glucocorticoides (prednisona, dexametasona). Causa más común de síndrome de Cushing. Riesgo aumenta con dosis >7.5 mg/día prednisona equivalente >3 semanas',
          '<strong>Hiperplasia suprarrenal congénita (HSC):</strong> Déficit de 21-hidroxilasa (90% de casos). ↓Cortisol, ↑andrógenos suprarrenales. Virilización en niñas, pérdida de sal (forma clásica). Screening neonatal',
          '<strong>Síndrome de Apparent Mineralocorticoid Excess (AME):</strong> Déficit de 11β-HSD2. Cortisol activa MR renal → HTA, hipopotasemia, alcalosis. Regaliz (ácido glicirrícico) inhibe 11β-HSD2',
          '<strong>Glucocorticoides terapéuticos:</strong> Potentes antiinflamatorios. Indicaciones: asma, EPOC, artritis reumatoide, lupus, colitis ulcerosa, rechazo de trasplante. Efectos adversos: síndrome cushingoide, osteoporosis, infecciones, HTA, diabetes',
          '<strong>Test de supresión con dexametasona:</strong> Screening de Cushing. Dexametasona 1 mg 11 PM → cortisol 8 AM. Supresión normal: <1.8 μg/dL. No supresión: sospecha Cushing'
        ]
      }
    ]
  },
  {
    id: 'tiroxina',
    nombre: 'Tiroxina (T4) y Triyodotironina (T3)',
    subtitulo: 'Hormonas tiroideas yodadas',
    icono: '🦋',
    categorias: ['tiroideas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Hormonas derivadas de tirosina yodada. T4 (tetrayodotironina, 4 yodos), T3 (triyodotironina, 3 yodos)',
          '<strong>Glándula secretora:</strong> Glándula tiroides (células foliculares)',
          '<strong>Síntesis:</strong> Yoduro captado (NIS - simportador Na⁺/I⁻) → oxidación (tiroperoxidasa) → yodación de tirosina en tiroglobulina → acoplamiento → T4/T3',
          '<strong>Secreción:</strong> 90% T4, 10% T3. T4 es prohormona. T3 es forma activa (3-4 veces más potente)',
          '<strong>Conversión periférica:</strong> T4 → T3 por desyodasas (D1, D2). 80% de T3 circulante proviene de conversión periférica',
          '<strong>Transporte:</strong> >99% unidas a proteínas (TBG - globulina ligadora de tiroxina 70%, transtiretina, albúmina). <1% libre (activo)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo de acción y receptor',
        datos: [
          { label: 'Receptores de hormona tiroidea (TR)', value: 'Receptores nucleares. Isoformas: TRα1, TRβ1, TRβ2. Expresión tisular diferencial. TRα1 (corazón, músculo, hueso), TRβ (hígado, hipófisis, hipotálamo).' },
          { label: 'Mecanismo genómico', value: 'T3 difunde o es transportada (MCT8) → núcleo → une TR en ADN (TRE - elementos de respuesta) → heterodímero con RXR → recluta correguladores → ↑/↓transcripción.' },
          { label: 'Efectos no genómicos', value: 'Efectos rápidos (minutos). Integrina αVβ3 en membrana plasmática une T4/T3 → MAPK/ERK, PI3K-AKT. Modulación de transporte iónico, angiogénesis.' },
          { label: 'Desyodasas', value: 'D1 (hígado, riñón): T4→T3, rT3→T2. D2 (SNC, hipófisis, músculo): T4→T3 (local). D3 (placenta, SNC fetal): inactiva T4→rT3, T3→T2. Regulación de disponibilidad tisular.' },
          { label: 'T3 reversa (rT3)', value: 'Isómero inactivo de T3. Formado por D3. ↑en enfermedad crítica ("síndrome del eutiroideo enfermo"). Mecanismo adaptativo para ↓metabolismo.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Acciones fisiológicas',
        items: [
          '<strong>Metabolismo basal:</strong> ↑Consumo de O₂ (todos los tejidos excepto cerebro, testículos, bazo). ↑Termogénesis. ↑Síntesis de Na⁺/K⁺-ATPasa (25-40% del consumo O₂ basal)',
          '<strong>Metabolismo de carbohidratos:</strong> ↑Gluconeogénesis, ↑glucogenólisis, ↑absorción intestinal de glucosa. Efecto hiperglucemiante. Sinergismo con catecolaminas',
          '<strong>Metabolismo de lípidos:</strong> ↑Lipólisis, ↑β-oxidación, ↑síntesis y degradación de colesterol (degradación > síntesis → ↓colesterol plasmático). ↑Expresión de receptores LDL',
          '<strong>Metabolismo de proteínas:</strong> Dosis fisiológicas: anabólico. Dosis altas: catabólico. Esencial para crecimiento y desarrollo',
          '<strong>Sistema cardiovascular:</strong> ↑Frecuencia cardíaca, ↑contractilidad, ↑gasto cardíaco. ↑Expresión de receptores β-adrenérgicos. ↓Resistencia vascular periférica',
          '<strong>Sistema nervioso:</strong> Esencial para desarrollo cerebral fetal/neonatal (mielinización, migración neuronal, sinaptogénesis). Hipotiroidismo congénito no tratado → cretinismo (retraso mental irreversible)',
          '<strong>Crecimiento:</strong> Sinergismo con GH. Necesaria para secreción de GH y efectos de IGF-1. Maduración esquelética. Cierre de epífisis',
          '<strong>Sistema reproductor:</strong> Modulación de GnRH, LH, FSH. Hiper/hipotiroidismo → alteraciones menstruales, infertilidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Eje hipotálamo-hipófisis-tiroides',
        items: [
          '<strong>TRH (hormona liberadora de tirotropina):</strong> Núcleo paraventricular hipotálamo → circulación porta hipofisaria → tirotropos hipofisarios',
          '<strong>TSH (tirotropina):</strong> Hipófisis anterior → receptores en tiroides. Estimula captación de yodo, síntesis y secreción de T4/T3, crecimiento tiroideo',
          '<strong>Retroalimentación negativa:</strong> T4/T3 inhiben TSH (hipófisis) y TRH (hipotálamo). Set-point individual (genéticamente determinado)',
          '<strong>Regulación no dependiente de TSH:</strong> Autoinmunidad (anticuerpos anti-receptor TSH), yodo (efecto Wolff-Chaikoff), desyodasas tisulares',
          '<strong>Enfermedad no tiroidea (síndrome del eutiroideo enfermo):</strong> ↓T3, ↑rT3, TSH normal/bajo en enfermedad crítica. Adaptación al catabolismo. No requiere tratamiento con hormonas tiroideas'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Hipotiroidismo primario:</strong> Déficit tiroideo. TSH↑, T4/T3↓. Causa más común: tiroiditis de Hashimoto (autoinmune, anti-TPO+). Síntomas: fatiga, intolerancia al frío, aumento de peso, bradicardia, piel seca, estreñimiento, bocio',
          '<strong>Hipotiroidismo subclínico:</strong> TSH↑, T4 normal. Prevalencia 4-10% población. Controversia en tratamiento (levotiroxina si TSH >10 mU/L o síntomas)',
          '<strong>Hipotiroidismo congénito:</strong> 1:2000-4000 nacidos vivos. Screening neonatal obligatorio (TSH en gota de sangre). Tratamiento precoz (levotiroxina) previene retraso mental',
          '<strong>Hipertiroidismo:</strong> TSH↓, T4/T3↑. Causas: enfermedad de Graves (anticuerpos estimulantes anti-receptor TSH, 60-80%), bocio multinodular tóxico, adenoma tóxico. Síntomas: pérdida de peso, intolerancia al calor, taquicardia, ansiedad, temblor, diarrea',
          '<strong>Enfermedad de Graves:</strong> Autoinmune. TRAb (anticuerpos anti-receptor TSH) estimulantes. Oftalmopatía (40%), dermopatía pretibial (<5%). Tratamiento: antitiroideos (metimazol), yodo radioactivo, tiroidectomía',
          '<strong>Tiroiditis:</strong> Subaguda (de Quervain): viral, dolorosa, fase hiper→hipo→eutiroideo. Hashimoto: autoinmune, bocio, hipotiroidismo progresivo. Postparto: 5-10% mujeres, transitoria',
          '<strong>Cáncer de tiroides:</strong> Papilar (80-85%, mejor pronóstico), folicular (10-15%), medular (células C, calcitonina↑, asociado a MEN2), anaplásico (<2%, muy agresivo)',
          '<strong>Levotiroxina (T4 sintética):</strong> Tratamiento de hipotiroidismo. Dosis según peso (~1.6 μg/kg/día), ajuste por TSH. Absorción en yeyuno, tomar en ayunas. Interacciones: hierro, calcio, IBP',
          '<strong>T3 (liotironina):</strong> Raramente usada (vida media corta, difícil dosificación). Indicaciones: coma mixedematoso, preparación para ablación con I-131'
        ]
      }
    ]
  },
  {
    id: 'adrenalina',
    nombre: 'Adrenalina (Epinefrina)',
    subtitulo: 'Catecolamina - Hormona y neurotransmisor',
    icono: '⚡',
    categorias: ['aminas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Catecolamina (derivada de tirosina). Amina biogénica',
          '<strong>Glándula secretora:</strong> Médula suprarrenal (80% adrenalina, 20% noradrenalina). También por neuronas simpáticas postganglionares',
          '<strong>Síntesis:</strong> Tirosina → L-DOPA (tirosina hidroxilasa) → dopamina (DOPA descarboxilasa) → noradrenalina (dopamina β-hidroxilasa) → adrenalina (PNMT)',
          '<strong>Almacenamiento:</strong> Vesículas cromafines en células cromafines de médula suprarrenal. Complejos con ATP y cromogranina A',
          '<strong>Liberación:</strong> Estimulación simpática (nervio esplácnico) → despolarización → entrada Ca²⁺ → exocitosis. Respuesta de lucha o huida',
          '<strong>Vida media:</strong> 2-3 minutos. Metabolismo rápido por MAO (monoamino oxidasa) y COMT (catecol-O-metiltransferasa)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Receptores adrenérgicos',
        datos: [
          { label: 'Receptores α₁ (Gq)', value: 'Músculo liso vascular, esfínteres. Vasoconstricción, midriasis, contracción de esfínter vesical. Aumenta Ca²⁺ intracelular vía PLC-IP₃-DAG.' },
          { label: 'Receptores α₂ (Gi)', value: 'Presinápticos (retroalimentación negativa), páncreas. ↓Secreción de noradrenalina, ↓secreción de insulina. Inhibe adenilato ciclasa → ↓AMPc.' },
          { label: 'Receptores β₁ (Gs)', value: 'Corazón, riñón (aparato yuxtaglomerular). ↑Frecuencia cardíaca, ↑contractilidad, ↑conducción AV, ↑secreción de renina. Activa adenilato ciclasa → ↑AMPc → PKA.' },
          { label: 'Receptores β₂ (Gs)', value: 'Músculo liso (bronquios, vasos, útero), músculo esquelético, hígado. Broncodilatación, vasodilatación, relajación uterina, glucogenólisis, captación de K⁺. ↑AMPc.' },
          { label: 'Receptores β₃ (Gs)', value: 'Tejido adiposo (principalmente). Lipólisis, termogénesis (tejido adiposo marrón). ↑AMPc.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Acciones fisiológicas',
        items: [
          '<strong>Sistema cardiovascular:</strong> ↑FC (β₁), ↑contractilidad (β₁), ↑volumen sistólico, ↑gasto cardíaco. Vasoconstricción (α₁) en piel/mucosas, vasodilatación (β₂) en músculo esquelético. Presión sistólica↑, diastólica↓ o sin cambio',
          '<strong>Sistema respiratorio:</strong> Broncodilatación (β₂). ↓Secreción mucosa. Mecanismo terapéutico en asma/anafilaxia',
          '<strong>Metabolismo de carbohidratos:</strong> ↑Glucogenólisis hepática (β₂, α₁) y muscular (β₂). ↑Gluconeogénesis. ↓Secreción de insulina (α₂), ↑glucagón (β₂). Hiperglucemia aguda',
          '<strong>Metabolismo de lípidos:</strong> ↑Lipólisis (β₁, β₃). Movilización de ácidos grasos libres. Sustrato para β-oxidación en estrés',
          '<strong>Sistema nervioso:</strong> ↑Estado de alerta, ansiedad. Dilatación pupilar (α₁). Vasoconstricción cerebral (dosis altas)',
          '<strong>Músculo liso no vascular:</strong> Relajación de detrusor vesical (β₂), contracción de esfínter (α₁). Relajación uterina (β₂). Disminución de motilidad GI',
          '<strong>Homeostasis del potasio:</strong> ↑Captación celular de K⁺ (β₂, activa bomba Na⁺/K⁺-ATPasa). Hipopotasemia transitoria en sobredosis'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación y control',
        items: [
          '<strong>Estimulación simpática:</strong> Sistema nervioso simpático (eje simpático-adrenomedular). Respuesta al estrés agudo (segundos-minutos)',
          '<strong>Cortisol potencia síntesis:</strong> Induce PNMT (feniletanolamina N-metiltransferasa), enzima que convierte noradrenalina → adrenalina. Sinergismo HHA-simpático',
          '<strong>Retroalimentación:</strong> Receptores α₂ presinápticos inhiben liberación adicional de catecolaminas. Autorregulación',
          '<strong>Degradación:</strong> MAO (mitocondrial) convierte adrenalina → DOPEGAL. COMT (citosólica) metila → metanefrina. Producto final: ácido vainillilmandélico (VMA)',
          '<strong>Metanefrinas plasmáticas/urinarias:</strong> Marcadores de secreción de catecolaminas. Útil para diagnóstico de feocromocitoma'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Feocromocitoma:</strong> Tumor de células cromafines (médula suprarrenal 90%, extraadrenal 10%). Secreción excesiva de catecolaminas. Tríada: cefalea, palpitaciones, sudoración. HTA paroxística o sostenida. Diagnóstico: metanefrinas plasmáticas/urinarias',
          '<strong>Paraganglioma:</strong> Feocromocitoma extraadrenal. Asociado a síndromes hereditarios (VHL, NF1, SDH). Mayoría no funcional (no secretor)',
          '<strong>Anafilaxia:</strong> Emergencia alérgica. Adrenalina IM (0.3-0.5 mg) es tratamiento de elección. Revierte broncoespasmo, vasodilatación, edema. Salva vidas',
          '<strong>Paro cardíaco:</strong> Adrenalina IV (1 mg cada 3-5 min) en RCP avanzada. ↑Presión de perfusión coronaria. Controversia sobre beneficio en supervivencia neurológica',
          '<strong>Asma aguda:</strong> Broncodilatador potente (β₂). Uso principalmente en emergencias (nebulizado o SC). Salbutamol (β₂ selectivo) preferido para uso crónico',
          '<strong>Shock anafiláctico:</strong> Adrenalina única terapia efectiva. Administración IM muslo (vasto lateral). Retraso en administración → aumento de mortalidad',
          '<strong>Anestesia local con adrenalina:</strong> Vasoconstricción local prolonga duración de anestésico, reduce sangrado, disminuye absorción sistémica. Contraindicado en extremidades (riesgo de isquemia)',
          '<strong>Bloqueadores β (beta-bloqueadores):</strong> Propranolol (no selectivo), atenolol, metoprolol (β₁ selectivos). Tratamiento de HTA, angina, arritmias, ICC. Contraindicados en asma (bloqueo β₂)',
          '<strong>Agonistas β₂:</strong> Salbutamol, formoterol. Broncodilatadores en asma/EPOC. Efectos adversos: taquicardia (β₁), temblor, hipopotasemia',
          '<strong>Antagonistas α₁:</strong> Prazosina, doxazosina. Tratamiento de HTA, hiperplasia prostática benigna. Efecto adverso: hipotensión ortostática (primera dosis)'
        ]
      }
    ]
  },
  {
    id: 'hormona-crecimiento',
    nombre: 'Hormona de Crecimiento (GH)',
    subtitulo: 'Somatotropina - Hormona peptídica hipofisaria',
    icono: '📈',
    categorias: ['peptidicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Hormona peptídica (191 aminoácidos, ~22 kDa). Familia de hormonas relacionadas (prolactina, lactógeno placentario)',
          '<strong>Glándula secretora:</strong> Células somatotropas de la adenohipófisis (hipófisis anterior, 40-50% de células)',
          '<strong>Secreción:</strong> Pulsátil. Picos máximos durante sueño profundo (ondas lentas, estadios 3-4). Mínimo en vigilia',
          '<strong>Vida media:</strong> 20-30 minutos. Circula libre (50%) y unida a GHBP (proteína ligadora de GH, 50%)',
          '<strong>Factores estimulantes:</strong> GHRH (hormona liberadora de GH), ghrelina (estómago), ejercicio, sueño, hipoglucemia, estrés, aminoácidos (arginina)',
          '<strong>Factores inhibitorios:</strong> Somatostatina (SRIF), IGF-1 (retroalimentación negativa), glucosa, ácidos grasos libres, obesidad'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo de acción y receptor',
        datos: [
          { label: 'Receptor de GH (GHR)', value: 'Receptor de citoquinas clase I. Preformado como homodímero en membrana. GH une simultáneamente ambos protómeros → cambio conformacional → activación.' },
          { label: 'Cascada JAK-STAT', value: 'GH → GHR → activación JAK2 (tirosina quinasa asociada) → fosforilación STAT (1, 3, 5) → translocación nuclear → transcripción génica. Efectos rápidos (minutos-horas).' },
          { label: 'Eje GH-IGF-1', value: 'GH estimula síntesis de IGF-1 (factor de crecimiento insulina-like) en hígado y tejidos. IGF-1 media la mayoría de efectos de crecimiento de GH. Actúa de forma endocrina y paracrina.' },
          { label: 'Acciones directas de GH', value: 'Independientes de IGF-1. Lipolíticas, antiinsulina (diabetes). Efectos agudos metabólicos. Predominan en adultos.' },
          { label: 'Acciones indirectas (vía IGF-1)', value: 'Crecimiento lineal, proliferación condrocitos, síntesis proteica, crecimiento de órganos. Predominan en niños/adolescentes.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Acciones fisiológicas',
        items: [
          '<strong>Crecimiento lineal:</strong> ↑Proliferación y diferenciación de condrocitos en placa epifisaria. IGF-1 local (paracrina) en cartílago. Cierre de epífisis en pubertad (estrógenos, andrógenos)',
          '<strong>Metabolismo de proteínas:</strong> Anabólico. ↑Captación de aminoácidos, ↑síntesis proteica, ↓catabolismo. Balance nitrogenado positivo. Efecto mediado por GH e IGF-1',
          '<strong>Metabolismo de carbohidratos:</strong> Efecto diabetogénico (anti-insulina). ↑Gluconeogénesis, ↓captación de glucosa periférica, ↑resistencia a insulina. Hiperglucemia en exceso crónico',
          '<strong>Metabolismo de lípidos:</strong> Lipolítico. ↑Lipólisis (↑HSL - lipasa sensible a hormonas), ↑β-oxidación, ↓depósitos de grasa. Movilización de ácidos grasos como combustible',
          '<strong>Masa muscular:</strong> ↑Hipertrofia muscular, ↑síntesis proteica. Combinación de GH directo + IGF-1. Efectos ergogénicos (abuso en deportes)',
          '<strong>Hueso:</strong> ↑Formación y remodelación ósea. ↑Densidad mineral ósea. Crecimiento en grosor (aposición perióstica). Continúa tras cierre epifisario',
          '<strong>Órganos viscerales:</strong> ↑Tamaño de hígado, riñón, corazón, intestino. Efecto trófico. Visceromegalia en acromegalia',
          '<strong>Sistema inmune:</strong> Estimula timo, linfopoyesis. IGF-1 y GH tienen efectos inmunomoduladores. Atrofia tímica en déficit de GH'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Regulación del eje somatotropo',
        items: [
          '<strong>GHRH (hormona liberadora de GH):</strong> Núcleo arcuato hipotálamo → circulación porta hipofisaria → somatotropos. Estimula síntesis y secreción de GH',
          '<strong>Somatostatina (SRIF):</strong> Núcleo periventricular hipotálamo → hipófisis. Inhibe secreción de GH (no síntesis). Liberación pulsátil inversa a GHRH',
          '<strong>Ghrelina:</strong> Péptido del estómago (células oxínticas). Agonista del receptor secretagogo de GH (GHS-R). ↑Secreción de GH, ↑apetito. Señal de hambre',
          '<strong>IGF-1 (retroalimentación negativa):</strong> Inhibe GH (hipófisis) y GHRH (hipotálamo). Circuito de control. Base del eje GH-IGF-1',
          '<strong>Moduladores:</strong> Estrógenos (↑GH, sensibilidad reducida), testosterona (↑GH vía aromatización), leptina (↑), obesidad (↓), envejecimiento (↓)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Déficit de GH en niños:</strong> Talla baja (velocidad de crecimiento <4 cm/año), proporciones normales, retraso edad ósea. Causas: idiopático, mutaciones GH/GHR, daño hipofisario. Tratamiento: GH recombinante (somatropina)',
          '<strong>Síndrome de Laron:</strong> Resistencia a GH. Mutaciones en receptor de GH. GH alta, IGF-1 baja. Talla baja severa, obesidad. No responde a GH, tratamiento: IGF-1 recombinante',
          '<strong>Déficit de GH en adultos:</strong> ↓Masa muscular, ↑grasa visceral, ↓densidad ósea, ↓calidad de vida, dislipidemia. Causas: adenoma hipofisario, cirugía, radiación. Tratamiento: GH (dosis menores que niños)',
          '<strong>Acromegalia:</strong> Exceso de GH en adulto (post-cierre epifisario). Adenoma hipofisario secretor de GH (>95%). Crecimiento acral (manos, pies, cara), prognatismo, visceromegalia, HTA, diabetes, artropatía, apnea del sueño',
          '<strong>Gigantismo:</strong> Exceso de GH pre-cierre epifisario. Talla extrema (>2.1 m típicamente). Mismo adenoma que acromegalia pero debut en infancia/adolescencia',
          '<strong>Diagnóstico de déficit de GH:</strong> Test de estimulación (insulina, arginina, clonidina, glucagón). GH <5-10 ng/mL post-estímulo sugiere déficit. IGF-1 bajo para edad/sexo',
          '<strong>Diagnóstico de acromegalia:</strong> IGF-1 elevada. Test de supresión con glucosa oral (TTOG): GH no suprime <1 ng/mL. RM hipófisis (adenoma)',
          '<strong>Tratamiento de acromegalia:</strong> Cirugía transesfenoidal (primera línea). Análogos de somatostatina (octreotide, lanreotide), antagonista del receptor GH (pegvisomant), agonistas dopaminérgicos (cabergolina)',
          '<strong>GH recombinante (somatropina):</strong> Indicaciones aprobadas: déficit de GH, síndrome de Turner, Prader-Willi, insuficiencia renal crónica, niños pequeños para edad gestacional. Abuso en dopaje deportivo',
          '<strong>Efectos adversos de GH exógena:</strong> Edema, artralgias, síndrome del túnel carpiano, hiperglucemia, hipotiroidismo central (↑conversión T4→T3), hipertensión intracraneal benigna (niños)'
        ]
      }
    ]
  },
  {
    id: 'testosterona',
    nombre: 'Testosterona',
    subtitulo: 'Andrógeno - Hormona esteroide gonadal',
    icono: '💪',
    categorias: ['esteroideas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '📍 Características principales',
        items: [
          '<strong>Tipo:</strong> Hormona esteroide androgénica (derivado de colesterol). C19',
          '<strong>Glándula secretora:</strong> Células de Leydig (testículo, 95% en hombres), zona reticular suprarrenal (5%), ovarios (mujeres)',
          '<strong>Síntesis:</strong> Colesterol → pregnenolona → 17-OH-pregnenolona → DHEA → androstenediona → testosterona (vía enzimas CYP, 17β-HSD)',
          '<strong>Transporte:</strong> 60% unida a SHBG (globulina ligadora de hormonas sexuales), 38% a albúmina, 2% libre (biodisponible)',
          '<strong>Metabolismo:</strong> 5α-reductasa → dihidrotestosterona (DHT, más potente). Aromatasa → estradiol (en tejido adiposo, cerebro)',
          '<strong>Vida media:</strong> 10-100 minutos (testosterona libre). Formulaciones depot IM duran semanas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo de acción y receptor',
        datos: [
          { label: 'Receptor de andrógenos (AR)', value: 'Receptor nuclear intracelular. Familia de receptores esteroides. Gen en cromosoma X (Xq11-12). Mutaciones → síndrome de insensibilidad androgénica.' },
          { label: 'Mecanismo genómico', value: 'Testosterona/DHT difunden → unen AR citoplásmico → disociación chaperonas → translocación nuclear → homodímero → unión a ARE (elementos de respuesta) → transcripción.' },
          { label: 'Dihidrotestosterona (DHT)', value: 'Conversión por 5α-reductasa (tipo 1: piel, hígado; tipo 2: próstata, genitales, folículo piloso). Afinidad 2-3x mayor por AR. Andrógeno más potente. Efectos en próstata, piel.' },
          { label: 'Aromatización a estradiol', value: 'Conversión por aromatasa (CYP19). Tejido adiposo, cerebro, hueso. Efectos estrogénicos de testosterona (cierre epifisario, densidad ósea, libido). Importante en hombres.' },
          { label: 'Efectos no genómicos', value: 'Efectos rápidos (minutos). Modulación de canales iónicos, MAPK, PI3K-AKT. Mecanismos no completamente elucidados.' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Acciones fisiológicas',
        items: [
          '<strong>Desarrollo sexual masculino:</strong> Diferenciación de genitales externos (DHT, fetal), crecimiento peneano, descenso testicular. Esencial en periodo crítico de desarrollo (8-12 semanas gestación)',
          '<strong>Espermatogénesis:</strong> Concentraciones altas intratesticulares necesarias. Testosterona + FSH estimulan células de Sertoli. Maduración de espermatozoides',
          '<strong>Características sexuales secundarias:</strong> Vello facial/corporal (DHT), voz grave (cuerdas vocales), desarrollo muscular, aumento masa ósea, distribución androide de grasa',
          '<strong>Masa muscular:</strong> Anabólico potente. ↑Síntesis proteica, ↑satelites celulares, ↑miofibrilas. Base de esteroides anabólicos androgénicos (abuso deportivo)',
          '<strong>Hueso:</strong> ↑Densidad mineral ósea. Cierre de epífisis (vía aromatización → estradiol). Anabólico óseo (↑osteoblastos). Déficit → osteoporosis',
          '<strong>Eritropoyesis:</strong> Estimula producción de eritropoyetina. ↑Hematocrito/hemoglobina. Hombres tienen valores ~1 g/dL mayor que mujeres',
          '<strong>Metabolismo:</strong> ↓Grasa corporal, ↑masa magra, ↑tasa metabólica basal. Distribución androide de grasa (visceral)',
          '<strong>Sistema nervioso:</strong> Modulación de libido (hombres y mujeres), agresividad, cognición espacial. Neuroprotección. Conversión a estradiol en cerebro es importante'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚡ Eje hipotálamo-hipófisis-testículo',
        items: [
          '<strong>GnRH (hormona liberadora de gonadotropinas):</strong> Núcleo arcuato hipotálamo → secreción pulsátil (cada 90-120 min) → circulación porta hipofisaria → gonadotropos',
          '<strong>LH (hormona luteinizante):</strong> Hipófisis anterior → células de Leydig testiculares → síntesis y secreción de testosterona',
          '<strong>FSH (hormona foliculoestimulante):</strong> Hipófisis anterior → células de Sertoli → espermatogénesis + síntesis de inhibina B',
          '<strong>Retroalimentación negativa:</strong> Testosterona inhibe LH (hipófisis) y GnRH (hipotálamo). Inhibina B inhibe FSH. Estradiol (de aromatización) también contribuye',
          '<strong>Pulsos de GnRH:</strong> Esenciales para secreción adecuada de LH/FSH. Administración continua de GnRH → desensibilización → ↓LH/FSH (base de análogos GnRH en cáncer de próstata)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🩺 Relevancia clínica',
        items: [
          '<strong>Hipogonadismo primario:</strong> Déficit testicular. LH/FSH↑, testosterona↓. Causas: síndrome de Klinefelter (47,XXY), orquitis, criptorquidia, quimioterapia, radiación. Infertilidad, ↓libido, ↓masa muscular, osteoporosis',
          '<strong>Hipogonadismo secundario:</strong> Déficit hipotalámico/hipofisario. LH/FSH↓, testosterona↓. Causas: adenoma hipofisario, hiperprolactinemia, síndrome de Kallmann (déficit GnRH + anosmia), obesidad',
          '<strong>Síndrome de Klinefelter:</strong> 47,XXY (1:500 hombres). Testículos pequeños firmes, azoospermia, ginecomastia, talla alta, ↓testosterona. Infertilidad. Tratamiento: testosterona (no restaura fertilidad)',
          '<strong>Síndrome de insensibilidad a andrógenos (AIS):</strong> Mutaciones en receptor de andrógenos (AR). Cariotipo 46,XY. Forma completa: fenotipo femenino, testículos intraabdominales, amenorrea primaria. Forma parcial: genitales ambiguos',
          '<strong>Déficit de 5α-reductasa:</strong> Genitales ambiguos al nacer (DHT↓). Masculinización en pubertad (testosterona↑). Próstata pequeña, sin calvicie. Más común en República Dominicana',
          '<strong>Hiperplasia suprarrenal congénita (déficit 21-hidroxilasa):</strong> ↑Andrógenos suprarrenales (DHEA, androstenediona). Virilización en niñas. Pubertad precoz en niños',
          '<strong>Terapia de reemplazo de testosterona (TRT):</strong> Indicaciones: hipogonadismo sintomático confirmado (testosterona <300 ng/dL en 2 ocasiones). Formulaciones: IM (enantato, cipionato), gel transdérmico, parches, oral (undecanoato)',
          '<strong>Efectos adversos de testosterona exógena:</strong> Policitemia, apnea del sueño, acné, ginecomastia, supresión de espermatogénesis (infertilidad), crecimiento prostático benigno. Monitoreo: hematocrito, PSA',
          '<strong>Contraindicaciones de TRT:</strong> Cáncer de próstata, PSA >4 ng/mL sin evaluación, hematocrito >50%, insuficiencia cardíaca severa, deseo de fertilidad',
          '<strong>Esteroides anabólicos androgénicos (EAA):</strong> Abuso en deportes/culturismo. Dosis suprafisiológicas (10-100x). Efectos adversos: atrofia testicular, infertilidad, hepatotoxicidad, cambios de humor, cardiopatía'
        ]
      }
    ]
  }
];
