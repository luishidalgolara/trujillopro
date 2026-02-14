// ═══════════════════════════════════════════════════════════
// FARMACODINAMIA DATA - Base de datos de mecanismos de acción
// Información actualizada 2024-2025 basada en Goodman & Gilman,
// Katzung's Basic & Clinical Pharmacology, y guías clínicas
// ═══════════════════════════════════════════════════════════

const FARMACODINAMIA_DATA = [
  {
    id: 'beta-bloqueantes',
    nombre: 'Antagonistas β-adrenérgicos (Betabloqueantes)',
    subtitulo: 'Bloqueo competitivo de receptores β-adrenérgicos · Clase II antiarrítmicos',
    icono: '💊',
    categorias: ['receptores', 'cardiovascular', 'antagonistas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Antagonismo competitivo reversible de receptores β1 y β2 adrenérgicos',
          'Bloqueo de unión de catecolaminas (noradrenalina, adrenalina)',
          'Receptores β1: Principalmente cardíacos (60-80% miocardio)',
          'Receptores β2: Bronquiales, vasculares, metabólicos',
          'Reducción de AMPc intracelular vía inhibición de adenilato ciclasa',
          'Disminución de Ca²⁺ intracelular en cardiomiocitos',
          'Cardioselectividad: Metoprolol, Bisoprolol, Atenolol (β1 > β2)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Cronotropismo', value: 'Negativo: ↓ frecuencia cardíaca (bloqueo β1 nodo SA)' },
          { label: 'Inotropismo', value: 'Negativo: ↓ contractilidad miocárdica' },
          { label: 'Dromotropismo', value: 'Negativo: ↓ conducción AV (β1)' },
          { label: 'Presión arterial', value: '↓ gasto cardíaco, ↓ liberación renina' },
          { label: 'Broncodilatación', value: 'Bloqueada (β2), contraindicado en asma' },
          { label: 'Metabolismo', value: '↓ glucogenólisis, ↓ lipólisis (β2)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Representativos',
        items: [
          'Propranolol: No selectivo, lipofílico, atraviesa BHE (1ª generación)',
          'Metoprolol: β1-selectivo, metabolismo hepático (CYP2D6)',
          'Bisoprolol: β1-selectivo, vida media larga (10-12h)',
          'Atenolol: β1-selectivo, eliminación renal, no atraviesa BHE',
          'Carvedilol: Bloqueante α1/β no selectivo, antioxidante',
          'Nebivolol: β1-selectivo, liberación de NO endotelial',
          'Labetalol: α1/β bloqueante, uso en hipertensión embarazo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Hipertensión arterial: Reducción 10-15 mmHg (β1-selectivos preferidos)',
          'Insuficiencia cardíaca: Carvedilol, Bisoprolol, Metoprolol (remodelado reverso)',
          'Cardiopatía isquémica: ↓ demanda de O₂ miocárdico, prevención IAM',
          'Arritmias: Fibrilación auricular (control frecuencia), taquicardias supraventriculares',
          'Tirotoxicosis: Control síntomas hipertiroidismo (Propranolol)',
          'Migraña profiláctica: Propranolol, Metoprolol (mecanismo central)',
          'Temblor esencial: Propranolol (efecto SNC)',
          'Ansiedad situacional: Propranolol (bloqueo síntomas somáticos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Contraindicaciones',
        items: [
          'Bradicardia sinusal: FC <50 lpm, bloqueo AV grados II-III',
          'Broncoespasmo: Especialmente no selectivos en asmáticos/EPOC',
          'Fatiga y disfunción eréctil: Efectos SNC y vasculares',
          'Enmascaramiento de hipoglucemia: Bloqueo β2 (precaución DM tipo 1)',
          'Fenómeno de Raynaud: Vasoconstricción periférica (β2)',
          'Síndrome de discontinuación: Retirada gradual (riesgo rebote adrenérgico)',
          'Contraindicaciones absolutas: Asma severa, bloqueo AV, bradicardia <45 lpm',
          'Interacciones: Verapamilo/Diltiazem (↑ riesgo bradicardia)'
        ]
      }
    ]
  },
  {
    id: 'inhibidores-eca',
    nombre: 'Inhibidores de la Enzima Convertidora de Angiotensina (IECA)',
    subtitulo: 'Inhibición competitiva de ECA · Sistema renina-angiotensina-aldosterona',
    icono: '🫀',
    categorias: ['enzimas', 'cardiovascular', 'inhibidores'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Inhibición de enzima convertidora de angiotensina (ECA, peptidil dipeptidasa)',
          'Bloqueo de conversión: Angiotensina I → Angiotensina II',
          'Disminución de Angiotensina II: ↓ vasoconstricción, ↓ aldosterona',
          'Acumulación de bradiquinina: Vasodilatación, efecto natriurético',
          'Unión al sitio activo de ECA: Grupo carboxilo o sulfhidrilo',
          'Inhibición de degradación de bradiquinina (quinasa II = ECA)',
          'Reducción de actividad simpática y secreción de ADH'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Presión arterial', value: '↓ resistencia vascular periférica (↓ Ang II)' },
          { label: 'Postcarga cardíaca', value: '↓ por vasodilatación arterial' },
          { label: 'Aldosterona', value: '↓ secreción → ↓ retención de Na⁺/H₂O, ↑ K⁺' },
          { label: 'Remodelado cardíaco', value: 'Prevención hipertrofia ventricular (↓ Ang II)' },
          { label: 'Función renal', value: 'Vasodilatación arteriola eferente, ↓ presión glomerular' },
          { label: 'Bradiquinina', value: '↑ niveles → vasodilatación, tos seca (10-15%)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Representativos',
        items: [
          'Captopril: Primer IECA (1981), sulfhidrilo, vida media corta (2h), 2-3 dosis/día',
          'Enalapril: Profármaco, metabolito activo enalaprilat, 1-2 dosis/día',
          'Lisinopril: No profármaco, excreción renal sin metabolismo, 1 dosis/día',
          'Ramipril: Alta afinidad tisular, prevención cardiovascular (HOPE trial)',
          'Perindopril: Eficacia en cardiopatía isquémica estable (EUROPA trial)',
          'Benazepril: Uso en nefropatía diabética',
          'Fosinopril: Eliminación dual (hepática/renal), útil en IRC'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Hipertensión arterial: Terapia de primera línea, reducción 10-15 mmHg',
          'Insuficiencia cardíaca: Reducción mortalidad 20-30% (CONSENSUS, SOLVD trials)',
          'Post-IAM: Remodelado ventricular, ↓ mortalidad (inicio <24h)',
          'Nefropatía diabética: Reducción proteinuria, progresión a IRC (DM tipo 1 y 2)',
          'Enfermedad renal crónica: Nefroprotección (↓ presión intraglomerular)',
          'Prevención cardiovascular: Alto riesgo (HOPE: Ramipril ↓ eventos 22%)',
          'Esclerosis sistémica: Crisis renal esclerodérmica',
          'Dosis según función renal: Ajuste en ClCr <30 mL/min'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Contraindicaciones',
        items: [
          'Tos seca: 10-15% pacientes (acumulación bradiquinina), persistente',
          'Hiperpotasemia: Especialmente con IRC, DM, suplementos K⁺, AINEs',
          'Angioedema: 0.1-0.5%, riesgo vital (vía aérea), más en raza negra',
          'Insuficiencia renal aguda: Estenosis arterial renal bilateral',
          'Hipotensión de primera dosis: Depleción de volumen, IC severa',
          'Teratogénesis: CONTRAINDICADO embarazo (2º-3º trimestre, defectos renales/SNC)',
          'Contraindicaciones absolutas: Embarazo, angioedema previo, estenosis bilateral',
          'Monitoreo: Creatinina, K⁺ (basal, 1-2 semanas post-inicio, periódico)'
        ]
      }
    ]
  },
  {
    id: 'estatinas',
    nombre: 'Inhibidores de HMG-CoA Reductasa (Estatinas)',
    subtitulo: 'Inhibición competitiva de síntesis de colesterol · Hipolipemiantes',
    icono: '🧬',
    categorias: ['enzimas', 'metabolismo', 'inhibidores'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Inhibición competitiva de HMG-CoA reductasa (enzima limitante síntesis colesterol)',
          'Bloqueo de conversión: HMG-CoA → mevalonato (vía del mevalonato)',
          'Análogos estructurales del sustrato HMG-CoA (porción farmacofórica)',
          'Reducción de colesterol intrahepatocitario',
          'Upregulación de receptores LDL hepáticos (SREBP-2 activación)',
          'Mayor captación de LDL circulante desde plasma',
          'Efectos pleiotrópicos: Estabilización placa, antiinflamatorio, mejora función endotelial'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'LDL-colesterol', value: '↓ 30-55% según potencia y dosis' },
          { label: 'HDL-colesterol', value: '↑ 5-15% (efecto modesto)' },
          { label: 'Triglicéridos', value: '↓ 15-30% (secundario a ↓ VLDL)' },
          { label: 'Proteína C reactiva', value: '↓ PCR-us (efecto antiinflamatorio)' },
          { label: 'Función endotelial', value: 'Mejora biodisponibilidad de NO' },
          { label: 'Placa aterosclerótica', value: 'Estabilización, ↓ contenido lipídico' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Representativos y Potencia',
        items: [
          'Atorvastatina: Alta potencia, vida media 14h, metabolismo CYP3A4',
          'Rosuvastatina: Máxima potencia, hidrofílica, mínimo metabolismo CYP (50% excreción sin cambio)',
          'Simvastatina: Potencia moderada-alta, profármaco, metabolismo CYP3A4, uso nocturno',
          'Pravastatina: Baja potencia, hidrofílica, no metabolismo CYP, segura en politerapia',
          'Fluvastatina: Baja potencia, vida media corta (1h), metabolismo CYP2C9',
          'Lovastatina: Primera estatina (1987), extraída de Aspergillus terreus, profármaco',
          'Pitavastatina: Potencia moderada, mínima interacción CYP450'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Prevención cardiovascular primaria: Alto riesgo (DM, HTA, tabaquismo, LDL >190 mg/dL)',
          'Prevención secundaria: Post-IAM, ACV, angina, revascularización (↓ eventos 25-35%)',
          'Hipercolesterolemia familiar: Heterocigota (↓ LDL 40-60%), homocigota (combinación)',
          'Síndrome coronario agudo: Alta intensidad (Atorvastatina 80 mg, Rosuvastatina 40 mg)',
          'Enfermedad renal crónica: Reducción eventos CV (no modifica progresión IRC)',
          'Diabetes mellitus: Prevención primaria (>40 años o factores de riesgo)',
          'Meta LDL: <70 mg/dL (muy alto riesgo), <55 mg/dL (ECV establecida)',
          'Terapia alta intensidad: ↓ LDL ≥50% (Atorva 40-80 mg, Rosuva 20-40 mg)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Precauciones',
        items: [
          'Miopatía: 0.1-0.5%, mialgia sin ↑ CK (5-10%), rabdomiólisis (raro <0.01%)',
          'Hepatotoxicidad: Elevación transitoria transaminasas (1-3%), usualmente asintomática',
          'Diabetes de novo: Riesgo aumentado 10-12% (mayor con alta potencia), beneficio CV supera riesgo',
          'Efectos cognitivos: Reportes anecdóticos, sin evidencia consistente en estudios',
          'Interacciones CYP3A4: Gemfibrozil (contraindicado), claritromicina, antifúngicos azoles',
          'Monitoreo: Perfil lipídico (4-12 semanas), transaminasas (solo si síntomas), CK (solo si mialgia)',
          'Contraindicaciones: Hepatopatía activa, embarazo/lactancia, hipersensibilidad',
          'Suspender si: CK >10x LSN, transaminasas >3x LSN persistente, miopatía sintomática'
        ]
      }
    ]
  },
  {
    id: 'isrs',
    nombre: 'Inhibidores Selectivos de Recaptación de Serotonina (ISRS)',
    subtitulo: 'Bloqueo de transportador SERT · Antidepresivos de primera línea',
    icono: '🧠',
    categorias: ['transportadores', 'psiquiatria', 'inhibidores'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Inhibición selectiva de transportador de serotonina (SERT, 5-HTT)',
          'Bloqueo de recaptación presináptica de 5-HT en hendidura sináptica',
          'Aumento de concentración de serotonina en espacio sináptico',
          'Estimulación prolongada de receptores postsinápticos 5-HT1A, 5-HT2A, 5-HT2C',
          'Downregulation de receptores 5-HT2 (efecto tardío, 2-4 semanas)',
          'Neuroplasticidad: ↑ BDNF, neurogénesis hipocampal (efecto crónico)',
          'Selectividad: Mínima afinidad por receptores histamínicos, muscarínicos, α-adrenérgicos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Sistema serotoninérgico', value: '↑ 5-HT sináptico (corteza, hipocampo, amígdala)' },
          { label: 'Latencia terapéutica', value: '2-4 semanas (remodelación receptorial)' },
          { label: 'Regulación emocional', value: 'Corteza prefrontal, sistema límbico' },
          { label: 'Ansiedad inicial', value: 'Posible empeoramiento primeras 1-2 semanas (5-HT2C)' },
          { label: 'Función sexual', value: 'Disfunción 30-70% (5-HT2 ↓ DA, NO)' },
          { label: 'Peso corporal', value: 'Variable: Paroxetina ↑, Fluoxetina neutral/↓' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Representativos',
        items: [
          'Fluoxetina: Vida media larga (4-6 días), metabolito activo norfluoxetina, menos síndrome discontinuación',
          'Sertralina: Inhibición leve recaptación DA, perfil favorable, seguro post-IAM',
          'Escitalopram: S-enantiómero de citalopram, mayor afinidad SERT, dosis 10-20 mg',
          'Paroxetina: Mayor potencia anticolinérgica, vida media corta, ↑ peso, síndrome discontinuación',
          'Citalopram: Racémico, prolongación QTc dosis >40 mg (precaución)',
          'Fluvoxamina: Indicación primaria TOC, múltiples interacciones CYP',
          'Vilazodona: Agonista parcial 5-HT1A, menor disfunción sexual'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Depresión mayor: Primera línea, respuesta 50-60%, remisión 30-40% (monoterapia)',
          'Trastornos de ansiedad: TAG, pánico, fobia social, TEPT (dosis mayores que depresión)',
          'Trastorno obsesivo-compulsivo: Dosis altas (Fluoxetina 60-80 mg, Sertralina 200 mg)',
          'Bulimia nerviosa: Fluoxetina 60 mg/día (única aprobación FDA)',
          'Trastorno disfórico premenstrual: Sertralina, Fluoxetina (continuo o fase lútea)',
          'Depresión post-IAM: Sertralina segura (SADHART trial)',
          'Dolor neuropático: Eficacia modesta (menor que duales)',
          'Inicio de acción: 2-4 semanas (mejoría), 6-8 semanas (respuesta completa)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Precauciones',
        items: [
          'Náuseas y malestar GI: 15-30%, transitorias (1-2 semanas), tomar con alimentos',
          'Disfunción sexual: Anorgasmia, ↓ libido, eyaculación retardada (30-70%)',
          'Insomnio/somnolencia: Activación (Fluoxetina) vs sedación (Paroxetina)',
          'Síndrome serotoninérgico: Raro, combinación con IMAO, tramadol, triptanos (hiperpirexia, rigidez)',
          'Síndrome de discontinuación: Mareos, parestesias, irritabilidad (mayor Paroxetina, menor Fluoxetina)',
          'Ideación suicida: Monitoreo en <25 años (4 primeras semanas)',
          'Hemorragia: Riesgo aumentado con AINEs, anticoagulantes (efecto antiplaquetario)',
          'Hiponatremia: SIADH, especialmente ancianos (monitoreo Na⁺)',
          'Interacciones: IMAO (2 semanas washout), Linezolid, Tramadol, CYP2D6 (Fluoxetina, Paroxetina)'
        ]
      }
    ]
  },
  {
    id: 'ibp',
    nombre: 'Inhibidores de Bomba de Protones (IBP)',
    subtitulo: 'Inhibición irreversible de H⁺/K⁺-ATPasa gástrica · Antisecretores',
    icono: '💊',
    categorias: ['enzimas', 'gastroenterologia', 'inhibidores'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Profármacos: Activación en ambiente ácido de canalículos secretores',
          'Conversión a sulfonamida catiónica activa (pH <4)',
          'Unión covalente irreversible a cisteínas de H⁺/K⁺-ATPasa (bomba de protones)',
          'Inhibición de paso final de secreción ácida gástrica',
          'Localización: Células parietales gástricas (membrana apical)',
          'Recuperación de secreción: Requiere síntesis de nueva ATPasa (24-48h)',
          'Independencia de estímulo: Bloqueo basal, estimulada por gastrina, ACh, histamina'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Supresión ácida', value: '↓ pH gástrico >90% (24h con dosis única)' },
          { label: 'pH intragástrico', value: 'Elevación a pH 4-5 (permite cicatrización)' },
          { label: 'Gastrina sérica', value: '↑ 2-4 veces (retroalimentación negativa)' },
          { label: 'Latencia de acción', value: '2-3 días (acumulación progresiva)' },
          { label: 'Duración de efecto', value: '24-72h post-suspensión (síntesis nueva bomba)' },
          { label: 'Absorción de fármacos', value: 'Alterada si requieren pH ácido (ketoconazol)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Representativos',
        items: [
          'Omeprazol: Primer IBP (1989), racémico, metabolismo CYP2C19/3A4, dosis 20-40 mg',
          'Esomeprazol: S-enantiómero de omeprazol, mejor biodisponibilidad, menos variabilidad',
          'Lansoprazol: Metabolismo CYP2C19/3A4, liberación entérica, dosis 15-30 mg',
          'Pantoprazol: Menor interacción CYP450, administración IV disponible, dosis 40 mg',
          'Rabeprazol: Metabolismo no enzimático parcial, rápida activación, dosis 20 mg',
          'Dexlansoprazol: R-enantiómero, liberación dual (menor variabilidad pH)',
          'Formulaciones: Cápsulas entéricas (protección pH ácido), administración preprandial'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Enfermedad por reflujo gastroesofágico: Esofagitis erosiva (cicatrización 80-90% 8 semanas)',
          'Úlcera péptica: Duodenal/gástrica (cicatrización >90% 4-8 semanas)',
          'Erradicación H. pylori: Triple terapia (IBP + claritromicina + amoxicilina) 10-14 días',
          'Síndrome de Zollinger-Ellison: Dosis altas (40-120 mg/día)',
          'Prevención de úlcera por AINEs: Pantoprazol, Esomeprazol (pacientes alto riesgo)',
          'Hemorragia digestiva alta: IV post-endoscopia (Pantoprazol 80 mg bolo + infusión)',
          'Dispepsia funcional: Prueba terapéutica 4-8 semanas',
          'Barrett\'s esófago: Manejo de ERGE, prevención progresión (controversia)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Precauciones',
        items: [
          'Hipergastrinemia: Elevación crónica (hiperplasia células ECL, debate sobre carcinoides)',
          'Déficit de vitamina B12: Malabsorción (uso >1 año), especialmente ancianos',
          'Hipomagnesemia: Uso prolongado >1 año (3-4 semanas resolución post-suspensión)',
          'Fracturas óseas: Riesgo aumentado (cadera, columna), mecanismo incierto (↓ Ca²⁺ absorción)',
          'Infección por C. difficile: Riesgo 1.5-3x (↓ barrera ácida gástrica)',
          'Neumonía adquirida comunidad: Riesgo aumentado primeros días (aspiración)',
          'Nefritis intersticial aguda: Rara, idiosincrásica, cualquier IBP',
          'Interacciones: Clopidogrel (Omeprazol ↓ activación, controversia clínica), Metotrexato (↑ niveles)',
          'Efecto rebote: Hipersecreción ácida post-suspensión (2-4 semanas), reducción gradual',
          'Uso racional: Indicación clara, menor dosis eficaz, revisión periódica necesidad'
        ]
      }
    ]
  },
  {
    id: 'bloqueadores-calcio',
    nombre: 'Bloqueadores de Canales de Calcio tipo L',
    subtitulo: 'Inhibición de canales Cav1.2 · Vasodilatadores y antiarrítmicos',
    icono: '⚡',
    categorias: ['canales-ionicos', 'cardiovascular', 'bloqueadores'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Bloqueo de canales de Ca²⁺ tipo L (Cav1.2) voltaje-dependientes',
          'Unión a subunidad α1 del canal en conformación inactivada',
          'Inhibición de entrada de Ca²⁺ extracelular durante despolarización',
          'Efecto dependiente de estado: Mayor bloqueo a frecuencias altas (use-dependence)',
          'Distribución: Músculo liso vascular, miocardio, nodo SA/AV',
          'Reducción de Ca²⁺ intracelular → ↓ contracción muscular',
          'Tres clases: Dihidropiridinas (DHP), Fenilalquilaminas (Verapamilo), Benzotiazepinas (Diltiazem)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos por Clase',
        datos: [
          { label: 'DHP (Amlodipino)', value: 'Selectividad vascular >20:1, vasodilatación, ↑ FC refleja' },
          { label: 'Verapamilo', value: 'Efecto miocárdico/nodal, ↓ FC, ↓ contractilidad, ↓ conducción AV' },
          { label: 'Diltiazem', value: 'Intermedio, vasodilatación + efecto nodal moderado' },
          { label: 'Presión arterial', value: '↓ resistencia vascular periférica (todos)' },
          { label: 'Vasodilatación coronaria', value: 'Mejora flujo (angina vasoespástica)' },
          { label: 'Nodo AV', value: 'Prolongación conducción (Verapamilo > Diltiazem >> DHP)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Representativos',
        items: [
          'Amlodipino: DHP, vida media larga (30-50h), vasodilatación sostenida, 1 dosis/día',
          'Nifedipino: DHP, liberación osmótica (GITS), edema maleolar frecuente',
          'Felodipino: DHP, alta selectividad vascular, metabolismo CYP3A4 (interacción jugo toronja)',
          'Verapamilo: No-DHP, efecto inotrópico negativo, arritmias supraventriculares',
          'Diltiazem: No-DHP, menor efecto inotrópico que Verapamilo, control FC en FA',
          'Clevidipino: DHP IV, ultrarrápido (vida media 1 min), crisis hipertensivas',
          'Nimodipino: DHP, atraviesa BHE, vasoespasmo post-hemorragia subaracnoidea'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Hipertensión arterial: DHP primera línea (↓ PA 10-15 mmHg), especialmente ancianos',
          'Angina estable: DHP (↓ demanda O₂) o Verapamilo/Diltiazem (si contraindicados β-bloqueantes)',
          'Angina vasoespástica (Prinzmetal): DHP altamente efectivas (vasodilatación coronaria)',
          'Fibrilación auricular: Verapamilo/Diltiazem (control frecuencia ventricular)',
          'Taquicardia supraventricular: Verapamilo IV (adenosina alternativa)',
          'Hipertensión en embarazo: Nifedipino seguro (Categoría C)',
          'Fenómeno de Raynaud: Nifedipino (vasodilatación periférica)',
          'Hemorragia subaracnoidea: Nimodipino prevención déficit neurológico (vasoespasmo cerebral)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Contraindicaciones',
        items: [
          'Edema maleolar: 5-30% DHP (vasodilatación arteriolar, no responde a diuréticos)',
          'Cefalea y rubor facial: Vasodilatación (DHP), usualmente transitorio',
          'Hipotensión: Especialmente DHP primera dosis, ancianos',
          'Bradicardia/Bloqueo AV: Verapamilo/Diltiazem (contraindicados con β-bloqueantes)',
          'Constipación: Verapamilo (efecto Ca²⁺ músculo liso intestinal)',
          'Insuficiencia cardíaca: No-DHP contraindicados (efecto inotrópico negativo)',
          'Interacciones CYP3A4: Inhibidores (ketoconazol, eritromicina) ↑ niveles',
          'Jugo de toronja: Inhibición CYP3A4 intestinal → ↑ biodisponibilidad DHP',
          'Contraindicaciones absolutas: IC sistólica (Verapamilo/Diltiazem), bloqueo AV grado 2-3'
        ]
      }
    ]
  },
  {
    id: 'metformina',
    nombre: 'Metformina (Biguanida)',
    subtitulo: 'Activador de AMPK · Sensibilizador de insulina · Antidiabético oral',
    icono: '🩺',
    categorias: ['metabolismo', 'receptores', 'diabetes'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Activación de proteína quinasa activada por AMP (AMPK)',
          'Inhibición de complejo I de cadena respiratoria mitocondrial (mecanismo primario)',
          'Supresión de gluconeogénesis hepática: ↓ expresión PEPCK, G6Pasa',
          'Mejora de sensibilidad insulínica: ↑ captación de glucosa muscular (GLUT4)',
          'Reducción de absorción intestinal de glucosa',
          'Modulación de microbiota intestinal (ácidos grasos cadena corta)',
          'Efecto independiente de insulina: No induce hipoglucemia'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Glucemia en ayunas', value: '↓ 50-70 mg/dL (1-2% HbA1c)' },
          { label: 'Gluconeogénesis hepática', value: '↓ 30-40% (principal mecanismo)' },
          { label: 'Peso corporal', value: 'Neutral o ↓ 1-3 kg (vs otros antidiabéticos)' },
          { label: 'Lípidos', value: '↓ LDL 10-15%, ↓ TG 10-20%' },
          { label: 'Insulinemia', value: '↓ niveles (mejora resistencia insulínica)' },
          { label: 'Lactato', value: '↑ leve (usualmente sin relevancia clínica)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Aspectos Farmacológicos',
        items: [
          'Absorción: Intestino delgado, biodisponibilidad 50-60%',
          'No metabolismo: Excreción renal sin cambios (100%)',
          'Vida media: 4-6 horas, formulación extendida (liberación prolongada)',
          'Dosis: 500-2,550 mg/día (dividida en 2-3 tomas, con alimentos)',
          'Titulación: Inicio 500 mg/día, ↑ semanal (tolerancia GI)',
          'Formulación XR: 1 dosis/día, mejor tolerancia GI',
          'Distribución: No unión a proteínas plasmáticas, concentración intrahepática'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Diabetes mellitus tipo 2: Primera línea (ADA/EASD), monoterapia o combinación',
          'Prediabetes: Prevención progresión a DM2 (DPP trial, ↓ riesgo 31%)',
          'Síndrome ovario poliquístico: Mejora ovulación, resistencia insulínica (off-label)',
          'Diabetes gestacional: Alternativa a insulina (controversia, preferir insulina)',
          'Prevención cardiovascular: ↓ eventos CV en DM2 (UKPDS, ↓ IAM 39%)',
          'Cáncer: Potencial efecto preventivo (estudios observacionales)',
          'Ajuste renal: TFGe >30 mL/min (revisar guías actualizadas)',
          'Combinaciones: Insulina, sulfonilureas, iDPP4, iSGLT2, aGLP1'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Precauciones',
        items: [
          'Intolerancia gastrointestinal: Náusea, diarrea, dolor abdominal (30%), inicio gradual ↓ riesgo',
          'Deficiencia vitamina B12: 10-30% uso prolongado (malabsorción), monitoreo anual',
          'Acidosis láctica: Rara (<0.03 casos/1000 pacientes-año), mortalidad alta si ocurre',
          'Contraindicaciones acidosis láctica: TFGe <30, insuficiencia hepática, hipoxia, sepsis, alcoholismo',
          'Suspender temporalmente: Cirugía mayor, medios de contraste IV, enfermedades agudas',
          'Medios de contraste: Suspender día del procedimiento, reiniciar 48h después (TFGe estable)',
          'Sabor metálico: Efecto secundario menor, transitorio',
          'Monitoreo: TFGe anual (semestral si >60 años o IRC), vitamina B12 (anual en uso >4 años)',
          'No hipoglucemia: Excepto combinación con insulina o secretagogos'
        ]
      }
    ]
  },
  {
    id: 'warfarina',
    nombre: 'Warfarina (Antagonista de Vitamina K)',
    subtitulo: 'Inhibición de epóxido reductasa · Anticoagulante oral',
    icono: '🩸',
    categorias: ['enzimas', 'hematologia', 'inhibidores'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Inhibición de vitamina K epóxido reductasa (VKORC1)',
          'Bloqueo de reciclaje de vitamina K epóxido → vitamina K reducida',
          'Impide γ-carboxilación de factores de coagulación dependientes de vitamina K',
          'Factores afectados: II (protrombina), VII, IX, X (procoagulantes)',
          'Proteínas anticoagulantes: Proteína C y S (también afectadas)',
          'Mecanismo indirecto: Depleción de factores funcionales (no inhibe directamente)',
          'Latencia de acción: 36-72h (vida media de factores preexistentes)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Factor VII', value: 'Primer factor en disminuir (vida media 6h)' },
          { label: 'Protrombina (Factor II)', value: 'Último en disminuir (vida media 60h)' },
          { label: 'INR terapéutico', value: '2.0-3.0 (mayoría indicaciones), 2.5-3.5 (válvulas mecánicas)' },
          { label: 'Latencia efecto', value: '2-3 días (pico 5-7 días)' },
          { label: 'Proteína C/S', value: 'Depleción inicial → riesgo trombosis paradójica' },
          { label: 'Vida media Warfarina', value: '36-42 horas (efecto prolongado)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Aspectos Farmacológicos',
        items: [
          'Racemato: S-warfarina (5x más potente), R-warfarina',
          'Metabolismo: S-warfarina (CYP2C9), R-warfarina (CYP1A2, CYP3A4)',
          'Polimorfismos genéticos: CYP2C9*2/*3 (metabolizadores lentos), VKORC1 (sensibilidad)',
          'Absorción: Rápida, biodisponibilidad >90%, pico 2-8h',
          'Unión proteínas: 99% albúmina (interacciones por desplazamiento)',
          'Dosis: Individual (2-10 mg/día), ajuste según INR',
          'Farmacodinámica: Amplia variabilidad interindividual',
          'Monitoreo: INR frecuente (semanal inicio, mensual estable)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Fibrilación auricular: Prevención ACV (CHA2DS2-VASc ≥2 hombres, ≥3 mujeres)',
          'Trombosis venosa profunda/Tromboembolismo pulmonar: 3-6 meses (provocado), ≥6 meses (no provocado)',
          'Válvulas cardíacas mecánicas: Anticoagulación permanente (INR 2.5-3.5)',
          'Síndrome antifosfolípido: INR 2.0-3.0, controversia INR alto',
          'Puente con heparina: Inicio simultáneo (5-7 días overlap), Warfarina sola luego',
          'Reversión: Vitamina K (oral/IV), plasma fresco congelado, concentrado complejo protrombínico',
          'DOACs vs Warfarina: Menor hemorragia intracraneal, sin necesidad monitoreo (alternativa)',
          'Duración tratamiento: Según indicación (3 meses a permanente)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos e Interacciones',
        items: [
          'Hemorragia mayor: 1-3%/año (intracraneal 0.3-0.6%/año), correlación INR',
          'Necrosis cutánea: Rara (0.01-0.1%), primeros días (depleción Proteína C)',
          'Teratogenicidad: CONTRAINDICADO embarazo (embriopatía warfarínica 1er trimestre)',
          'Síndrome dedo púrpura: Microembolismo colesterol (raro)',
          'Interacciones medicamentosas: Antibióticos (↑ INR), antiepilépticos (↓ INR), AINEs (↑ sangrado)',
          'Alimentos vitamina K: Vegetales verdes (espinaca, kale) → ↓ efecto (consistencia, no evitar)',
          'Alcohol: ↑ metabolismo (crónico), ↑ efecto (agudo)',
          'Antibióticos: Metronidazol, trimetoprima (↑↑ INR), rifampicina (↓↓ INR)',
          'Monitoreo INR: Más frecuente si cambios medicación/dieta, enfermedad intercurrente',
          'Educación paciente: Reconocer signos sangrado, dieta consistente, cumplimiento'
        ]
      }
    ]
  },
  {
    id: 'morfina',
    nombre: 'Morfina (Agonista Opioide)',
    subtitulo: 'Agonista µ-opioide · Analgésico narcótico',
    icono: '💉',
    categorias: ['receptores', 'analgesia', 'agonistas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🎯 Mecanismo de Acción Molecular',
        items: [
          'Agonista de receptores opioides µ (mu), κ (kappa), δ (delta)',
          'Mayor afinidad por receptor µ (MOP, OPRM1): Principal efecto analgésico',
          'Activación de proteínas Gi/Go: Inhibición de adenilato ciclasa, ↓ AMPc',
          'Hiperpolarización neuronal: Apertura canales K⁺ (GIRK), cierre canales Ca²⁺',
          'Inhibición liberación de neurotransmisores: Sustancia P, glutamato, GABA',
          'Nivel espinal: Modulación asta dorsal, vías ascendentes nociceptivas',
          'Nivel supraespinal: Sustancia gris periacueductal, núcleo magno del rafe'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Efectos Farmacodinámicos',
        datos: [
          { label: 'Analgesia', value: 'Dolor agudo/crónico severo (receptor µ)' },
          { label: 'Euforia', value: 'Liberación dopamina en nucleus accumbens' },
          { label: 'Depresión respiratoria', value: 'Disminución respuesta a CO₂ (centro respiratorio)' },
          { label: 'Sedación', value: 'Activación µ cortical, efecto dosis-dependiente' },
          { label: 'Constipación', value: 'Receptores µ entéricos, ↓ motilidad GI (no tolerancia)' },
          { label: 'Miosis', value: 'Estimulación parasimpática (núcleo Edinger-Westphal)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: '💊 Fármacos Opioides Relacionados',
        items: [
          'Morfina: Patrón oro, metabolitos M3G (sin actividad) y M6G (activo, acumulación en IRC)',
          'Fentanilo: 50-100x potente que morfina, liposoluble, transdérmico/IV',
          'Oxicodona: Oral, liberación inmediata/prolongada, menor náusea que morfina',
          'Hidrocodona: Combinación con paracetamol, dolor moderado-severo',
          'Metadona: Vida media larga (24-36h), antagonista NMDA, mantenimiento adicción',
          'Buprenorfina: Agonista parcial µ, techo efecto (↓ depresión respiratoria), antagonista κ',
          'Tramadol: Agonista µ débil + inhibición recaptación 5-HT/NA, dolor moderado',
          'Codeína: Profármaco (10% → morfina vía CYP2D6), analgésico/antitusígeno'
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Dolor agudo severo: Post-operatorio, trauma, IAM (IV 2-10 mg)',
          'Dolor oncológico: OMS escalera analgésica (paso 3), liberación prolongada',
          'Disnea refractaria: Cuidados paliativos, IC avanzada (dosis bajas)',
          'Edema pulmonar agudo: Reducción precarga, ansiólisis (controversia uso actual)',
          'Anestesia: Componente balanceada (fentanilo, remifentanilo)',
          'Vía administración: IV, IM, SC, oral, epidural, intratecal',
          'Titulación: Individualizada, rotación de opioides si efectos adversos',
          'Equianalgesia: 10 mg morfina IV = 30 mg oral = 20 mg oxicodona oral'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚠️ Efectos Adversos y Riesgos',
        items: [
          'Depresión respiratoria: Dosis-dependiente, PRINCIPAL CAUSA MUERTE (naloxona reversor)',
          'Constipación: 90% pacientes, no tolerancia, profilaxis laxante siempre',
          'Náusea/vómito: 25-30%, tolerancia 5-7 días, antagonistas (metoclopramida, ondansetrón)',
          'Tolerancia: Desarrollo 2-3 semanas (analgesia), requiere ↑ dosis',
          'Dependencia física: Síndrome abstinencia si suspensión abrupta (mialgias, diarrea, ansiedad)',
          'Adicción: Riesgo aumentado (historia abuso sustancias, trastornos psiquiátricos)',
          'Hipogonadismo: Supresión eje hipotálamo-hipófisis (uso crónico)',
          'Prurito: Liberación histamina (morfina > otros), antagonistas (naloxona dosis baja)',
          'Interacciones: Benzodiacepinas (↑↑ depresión respiratoria), inhibidores CYP3A4',
          'Monitoreo: Función respiratoria, sedación (escala Pasero), signos abuso'
        ]
      }
    ]
  }
];
