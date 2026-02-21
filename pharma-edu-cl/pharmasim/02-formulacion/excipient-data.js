/**
 * PHARMASIM — excipient-data.js
 * Base de datos de excipientes y principios activos para formulación
 */

// ── API SELECTION ─────────────────────────────────────────────────────────
window.API_LIST = [
    {
        id: 'aspirin', name: 'Aspirina', formula: 'C₉H₈O₄', icon: '💊',
        category: 'analgesico', mw: 180.16, logP: 1.19, pka: 3.5, solubility: 3.3,
        challenges: ['Hidrólisis ácida del grupo éster', 'Incompatibilidad con bases', 'Inestabilidad a la humedad'],
        solubilityClass: 'BCS Clase I',
        recommendedExcipients: ['microcel', 'crosscarmellose', 'magnesium_stearate', 'povidone'],
        targetWeight: 325, // mg
        targetDissolution: { t50: 15, t85: 30, q30: 70 } // min
    },
    {
        id: 'paracetamol', name: 'Paracetamol', formula: 'C₈H₉NO₂', icon: '🔴',
        category: 'analgesico', mw: 151.16, logP: 0.46, pka: 9.38, solubility: 14.0,
        challenges: ['Baja compresibilidad directa', 'Alta dosis (500-1000mg)', 'Toxicidad hepática por sobredosis'],
        solubilityClass: 'BCS Clase I',
        recommendedExcipients: ['microcel', 'starch', 'crosscarmellose', 'magnesium_stearate'],
        targetWeight: 500,
        targetDissolution: { t50: 10, t85: 20, q30: 80 }
    },
    {
        id: 'ibuprofen', name: 'Ibuprofeno', formula: 'C₁₃H₁₈O₂', icon: '🟠',
        category: 'analgesico', mw: 206.28, logP: 3.97, pka: 4.91, solubility: 0.021,
        challenges: ['Muy baja solubilidad acuosa (BCS II)', 'Punto de fusión bajo (75°C)', 'Incompatibilidad con catiónicos'],
        solubilityClass: 'BCS Clase II',
        recommendedExcipients: ['lactose', 'hpmc', 'poloxamer', 'crosspovidone', 'silicon_dioxide'],
        targetWeight: 400,
        targetDissolution: { t50: 25, t85: 45, q30: 55 }
    },
    {
        id: 'metformin', name: 'Metformina', formula: 'C₄H₁₁N₅', icon: '🔵',
        category: 'antidiabético', mw: 129.16, logP: -1.43, pka: 11.5, solubility: 300.0,
        challenges: ['Alta dosis (500-1000mg) — tableta grande', 'Sabor amargo intenso', 'Requiere recubrimiento film para aceptabilidad'],
        solubilityClass: 'BCS Clase III',
        recommendedExcipients: ['microcel', 'povidone', 'hpmc', 'talc', 'magnesium_stearate'],
        targetWeight: 750,
        targetDissolution: { t50: 8, t85: 18, q30: 85 }
    },
    {
        id: 'atorvastatin', name: 'Atorvastatina', formula: 'C₃₃H₃₅FN₂O₅', icon: '🟣',
        category: 'antihipertensivo', mw: 558.64, logP: 4.46, pka: 4.46, solubility: 0.0038,
        challenges: ['Extremadamente insoluble en agua', 'BCS Clase II/IV', 'Alta sensibilidad a la degradación oxidativa'],
        solubilityClass: 'BCS Clase II',
        recommendedExcipients: ['lactose', 'microcel', 'poloxamer', 'crosscarmellose', 'magnesium_stearate'],
        targetWeight: 200,
        targetDissolution: { t50: 30, t85: 60, q30: 45 }
    }
];

// ── EXCIPIENT DATABASE ────────────────────────────────────────────────────
window.EXCIPIENT_DB = [
    // DILUYENTES
    {
        id: 'microcel', name: 'Celulosa Microcristalina', abbrev: 'MCC (Avicel®)',
        category: 'diluent', catLabel: 'Diluyente',
        color: '#93c5fd',
        typical_pct: 40, max_pct: 70, min_pct: 10,
        function: 'Diluyente / aglutinante seco. Excelente compresibilidad directa y fluidez.',
        properties: { compressibility: 95, flowability: 80, moisture: 5 },
        incompatible_with: [],
        advantages: ['Excelente compresibilidad', 'Buena fluidez', 'Inercia química'],
        note: 'El excipiente más versátil para compresión directa. Estándar de la industria.'
    },
    {
        id: 'lactose', name: 'Lactosa Monohidrato', abbrev: 'Lactosa',
        category: 'diluent', catLabel: 'Diluyente',
        color: '#fde68a',
        typical_pct: 35, max_pct: 65, min_pct: 10,
        function: 'Diluyente clásico. Alta solubilidad, buena fluidez. Contraindicado en intolerancia.',
        properties: { compressibility: 70, flowability: 85, moisture: 5.5 },
        incompatible_with: ['amines'],
        advantages: ['Alta solubilidad', 'Bajo costo', 'Amplio uso'],
        warning_apis: ['amoxicillin'], // Maillard reaction
        note: '⚠️ Reacción de Maillard con aminas primarias (APIs básicos). Contraindicado en intolerancia a lactosa.'
    },
    {
        id: 'starch', name: 'Almidón de Maíz', abbrev: 'Almidón',
        category: 'diluent', catLabel: 'Diluyente',
        color: '#d4d4d4',
        typical_pct: 20, max_pct: 40, min_pct: 5,
        function: 'Diluyente y disgregante dual. Baja higroscopicidad. Requiere compresión húmeda.',
        properties: { compressibility: 55, flowability: 60, moisture: 12 },
        incompatible_with: [],
        advantages: ['Dual diluyente/disgregante', 'Bajo costo', 'Biocompatible'],
        note: 'A concentraciones >15% también actúa como disgregante interno.'
    },
    {
        id: 'dcp', name: 'Fosfato Dicálcico', abbrev: 'DCP',
        category: 'diluent', catLabel: 'Diluyente',
        color: '#e5e7eb',
        typical_pct: 30, max_pct: 60, min_pct: 10,
        function: 'Diluyente inorgánico para alta dosificación. pH alcalino (~8.8).',
        properties: { compressibility: 75, flowability: 90, moisture: 1 },
        incompatible_with: ['acids'],
        warning_apis: ['aspirin', 'ibuprofen'],
        note: '⚠️ pH alcalino puede acelerar hidrólisis de fármacos ácido-lábiles (ácido acetilsalicílico).'
    },

    // AGLUTINANTES
    {
        id: 'povidone', name: 'Polivinilpirrolidona', abbrev: 'PVP K30',
        category: 'binder', catLabel: 'Aglutinante',
        color: '#c4b5fd',
        typical_pct: 5, max_pct: 10, min_pct: 1,
        function: 'Aglutinante para granulación húmeda. Alta adhesividad y solubilidad en agua.',
        properties: { compressibility: 85, flowability: 50, moisture: 8 },
        incompatible_with: [],
        advantages: ['Gran adhesividad', 'Soluble en agua y alcohol', 'Amplio rango pKa'],
        note: 'Usar 3-7% en solución acuosa para granulación húmeda. Higroscópico.'
    },
    {
        id: 'hpmc', name: 'Hidroxipropilmetilcelulosa', abbrev: 'HPMC (Methocel®)',
        category: 'binder', catLabel: 'Aglutinante/Matriz',
        color: '#6ee7b7',
        typical_pct: 8, max_pct: 40, min_pct: 2,
        function: 'Aglutinante y formador de matriz retardada. Controla la liberación del API.',
        properties: { compressibility: 70, flowability: 60, moisture: 5 },
        incompatible_with: [],
        advantages: ['Forma matrices de liberación controlada', 'Compatible con mayoría de APIs', 'GRAS'],
        note: '>15%: genera tabletas de liberación sostenida (MS). Útil en formulaciones ER/XR.'
    },
    {
        id: 'hpc', name: 'Hidroxipropilcelulosa', abbrev: 'HPC (Klucel®)',
        category: 'binder', catLabel: 'Aglutinante',
        color: '#7dd3fc',
        typical_pct: 4, max_pct: 8, min_pct: 1,
        function: 'Aglutinante de bajo viscosidad. Soluble en agua y etanol. Buena compresibilidad.',
        properties: { compressibility: 80, flowability: 65, moisture: 6 },
        incompatible_with: [],
        note: 'Excelente para granulación alcohólica. Compatible con fármacos sensibles al agua.'
    },

    // DISGREGANTES
    {
        id: 'crosscarmellose', name: 'Croscarmelosa Sódica', abbrev: 'Croscarmelosa (Ac-Di-Sol®)',
        category: 'disintegrant', catLabel: 'Disgregante',
        color: '#fde68a',
        typical_pct: 4, max_pct: 8, min_pct: 1,
        function: 'Superdisintegrante moderno. Hinchamiento + capilaridad. Alta eficacia a baja concentración.',
        properties: { compressibility: 60, flowability: 55, moisture: 10 },
        incompatible_with: ['acids'],
        advantages: ['Acción a <5%', 'pH-independiente', 'Rápida desintegración'],
        note: 'Usar mitad intra-granular + mitad extra-granular para máxima eficacia.'
    },
    {
        id: 'crosspovidone', name: 'Crospovidona', abbrev: 'PVPP (Kollidon CL®)',
        category: 'disintegrant', catLabel: 'Disgregante',
        color: '#fca5a5',
        typical_pct: 3, max_pct: 6, min_pct: 1,
        function: 'Superdisintegrante insoluble. Absorción de agua extremadamente rápida por acción capilar.',
        properties: { compressibility: 65, flowability: 50, moisture: 8 },
        incompatible_with: [],
        advantages: ['Más rápido que croscarmelosa', 'Insoluble (no forma gel)', 'Muy buena fluidez'],
        note: 'Preferido en tabletas efervescentes y formulaciones palatables.'
    },

    // LUBRICANTES
    {
        id: 'magnesium_stearate', name: 'Estearato de Magnesio', abbrev: 'Mg Stearate',
        category: 'lubricant', catLabel: 'Lubricante',
        color: '#fca5a5',
        typical_pct: 0.5, max_pct: 2, min_pct: 0.25,
        function: 'Lubricante hidrófobo estándar. Reduce fricción punzón-matriz. Máx 0.5-1% recomendado.',
        properties: { compressibility: 30, flowability: 95, moisture: 2 },
        incompatible_with: ['acids', 'oxidants'],
        warning_apis: ['aspirin'],
        advantages: ['Excelente lubricación', 'Muy bajo porcentaje', 'Universal'],
        note: '⚠️ Hidrófobo: retrasa disgregación si se usa >1%. Mezclar solo 2-3 min (sobremezcla = menor dureza).'
    },
    {
        id: 'talc', name: 'Talco', abbrev: 'Talco Farmacéutico',
        category: 'lubricant', catLabel: 'Lubricante/Deslizante',
        color: '#e5e7eb',
        typical_pct: 2, max_pct: 5, min_pct: 0.5,
        function: 'Lubricante + deslizante. Menos hidrófobo que estearato Mg. Mejora fluidez del gránulo.',
        properties: { compressibility: 40, flowability: 90, moisture: 1 },
        incompatible_with: [],
        note: 'Combinado con estearato Mg provee lubricación + deslizamiento óptimos.'
    },

    // AGENTES SOLUBILIZANTES / OTROS
    {
        id: 'poloxamer', name: 'Poloxámero 188', abbrev: 'Poloxamer 188',
        category: 'coating', catLabel: 'Solubilizante',
        color: '#86efac',
        typical_pct: 3, max_pct: 8, min_pct: 1,
        function: 'Surfactante no-iónico. Aumenta solubilidad y mojabilidad de APIs hidrofóbicos (BCS II).',
        properties: { compressibility: 50, flowability: 60, moisture: 4 },
        incompatible_with: [],
        advantages: ['Solubiliza BCS II/IV', 'Compatibilidad amplia', 'GRAS'],
        note: 'Esencial en formulaciones de ibuprofeno, atorvastatina y otros de baja solubilidad.'
    },
    {
        id: 'silicon_dioxide', name: 'Dióxido de Silicio Coloidal', abbrev: 'Aerosil® 200',
        category: 'lubricant', catLabel: 'Deslizante',
        color: '#f1f5f9',
        typical_pct: 0.5, max_pct: 2, min_pct: 0.1,
        function: 'Deslizante de alta superficie. Previene apelmazamiento y mejora fluidez a bajas concentraciones.',
        properties: { compressibility: 20, flowability: 98, moisture: 0.5 },
        incompatible_with: [],
        note: 'Usar 0.1-0.5% para máxima efectividad. Dosis altas pueden inhibir compresibilidad.'
    },
];

// ── INCOMPATIBILITY MATRIX ─────────────────────────────────────────────────
window.INCOMPATIBILITIES = [
    {
        exc1: 'dcp', apiIds: ['aspirin', 'ibuprofen'],
        type: 'error',
        message: '🔴 INCOMPATIBILIDAD: Fosfato Dicálcico (DCP) tiene pH ~8.8 (alcalino). El ácido acetilsalicílico se hidroliza rápidamente a pH >5, generando ácido salicílico y ácido acético. Se observará cambio de color y pérdida de potencia.',
        effect: { dissolution: -30, stability: -40 }
    },
    {
        exc1: 'dcp', exc2: 'aspirin',
        type: 'error',
        message: '🔴 Incompatibilidad DCP + Aspirina: hidrolisis alcalina del grupo éster.',
        effect: { dissolution: -25 }
    },
    {
        exc1: 'magnesium_stearate', apiIds: ['aspirin'],
        type: 'warn',
        message: '⚠️ ADVERTENCIA: Estearato de Magnesio >1% con aspirina puede catalizar la hidrólisis del grupo éster. Usar máximo 0.5% y almacenar con desecante.',
        effect: { stability: -15 }
    },
    {
        exc1: 'lactose', apiIds: ['amoxicillin'],
        type: 'warn',
        message: '⚠️ Reacción de Maillard: Lactosa + grupo amino de amoxicilina → degradación parda. Usar celulosa microcristalina como diluyente alternativo.',
        effect: { stability: -20, dissolution: -10 }
    },
    {
        exc1: 'hpmc', threshold_pct: 15,
        type: 'info',
        message: 'ℹ️ HPMC >15%: Se formará una tableta de LIBERACIÓN SOSTENIDA (MS/XR). El API difunde lentamente desde la matriz hidrogel. Curva de disolución bifásica esperada.',
        effect: { dissolution_type: 'sustained' }
    },
    {
        exc1: 'magnesium_stearate', threshold_pct: 1.5,
        type: 'warn',
        message: '⚠️ Estearato de Magnesio >1%: lubricante hidrófobo en exceso. Puede repeler agua, retrasando desintegración >50%. Reducir a 0.5-1% máximo.',
        effect: { dissolution: -20, disintegration: +30 }
    },
    {
        exc1: 'poloxamer', exc2: 'crosspovidone',
        type: 'info',
        message: 'ℹ️ Sinergia positiva: Poloxámero + Crospovidona mejoran la velocidad de disgregación de APIs hidrofóbicos. Combinación recomendada para BCS II.',
        effect: { dissolution: +15 }
    }
];

// ── CONCEPTS ──────────────────────────────────────────────────────────────
window.FORMULATION_CONCEPTS = [
    'La Regla BCS (Biopharmaceutics Classification System) clasifica los APIs según solubilidad y permeabilidad. Los fármacos BCS II (alta permeabilidad, baja solubilidad) como el ibuprofeno son los más desafiantes: requieren técnicas especiales como micronización, solubilización con surfactantes o dispersiones sólidas.',
    'La Regla de Lipinski predice biodisponibilidad oral: MW<500, LogP<5, HBD<5, HBA<10. Fármacos que violan >2 reglas raramente se absorben bien por vía oral sin formulación especial.',
    'El Factor f₂ mide similitud entre dos curvas de disolución. f₂ ≥50 indica perfiles similares según FDA/EMA. Es el criterio oficial para aprobar formulaciones genéricas sin estudios de bioequivalencia in vivo.',
    'La granulación húmeda es el proceso más robusto para mejorar compresibilidad pero requiere control de temperatura y humedad. La granulación seca (roller compaction) es preferida para APIs termolábiles o sensibles a agua.',
    'Los superdisintegrantes modernos (croscarmelosa, crospovidona) actúan por doble mecanismo: absorción capilar de agua + hinchamiento. Son efectivos a 2-5% vs 15-20% del almidón convencional.',
];