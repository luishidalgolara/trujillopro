// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 04
// NCh Elec 4/2003 - Tipos de Conductores y Capacidades
// ============================================================

const preguntasRespuestas_04 = {
    categoria: "TIPOS DE CONDUCTORES Y CAPACIDADES",
    
    preguntas: [
        {
            id: "04_001",
            pregunta: "¿Qué aspectos se deben considerar al seleccionar un conductor?",
            respuesta: "Se debe asegurar: 1) Suficiente CAPACIDAD DE TRANSPORTE DE CORRIENTE, 2) Adecuada capacidad de soportar CORRIENTES DE CORTOCIRCUITO, 3) Adecuada RESISTENCIA MECÁNICA, 4) Buen comportamiento ante CONDICIONES AMBIENTALES.",
            keywords: ["selección", "conductor", "capacidad", "criterios"],
            seccion: "8.1.1.1"
        },
        {
            id: "04_002",
            pregunta: "¿Qué es un conductor tipo NYA?",
            respuesta: "Es un conductor UNIPOLAR (alambre) con aislación de PVC, temperatura máxima 70°C, para ambientes SECOS, canalizado en tuberías, bandejas o molduras. Es el más básico, solo para uso interior protegido. Tensión 600V.",
            keywords: ["nya", "pvc", "seco", "70 grados"],
            seccion: "Tabla 8.6"
        },
        {
            id: "04_003",
            pregunta: "¿Qué es un conductor tipo NSYA?",
            respuesta: "Es un conductor UNIPOLAR con aislación de PVC reforzada, 70°C, para ambientes secos O HÚMEDOS. Puede usarse EN TENDIDOS AÉREOS A LA INTEMPERIE en acometidas, fuera del alcance de la mano. Más versátil que el NYA. Tensión 600V.",
            keywords: ["nsya", "húmedo", "intemperie", "acometida"],
            seccion: "Tabla 8.6"
        },
        {
            id: "04_004",
            pregunta: "¿Qué es un cable tipo NYY?",
            respuesta: "Es un cable MULTICONDUCTOR con aislación PVC y CHAQUETA exterior. 70°C, para ambientes secos, húmedos, intemperie SIN EXPOSICIÓN SOLAR. Se puede tender SUBTERRÁNEO en ducto o DIRECTAMENTE EN TIERRA. Tensión 600V.",
            keywords: ["nyy", "multiconductor", "subterráneo", "tierra"],
            seccion: "Tabla 8.6"
        },
        {
            id: "04_005",
            pregunta: "¿Qué es un cable tipo NYFY (TPS)?",
            respuesta: "Es un cable PLANO multiconductor (2 o 3 alambres) con aislación PVC y chaqueta. 70°C, para instalaciones SOBREPUESTAS en interiores, NO NECESITA DUCTO. También se usa en BAJADAS DE ACOMETIDAS. Fácil instalación. Tensión 600V.",
            keywords: ["nyfy", "tps", "plano", "sobrepuesto", "sin ducto"],
            seccion: "Tabla 8.6"
        },
        {
            id: "04_006",
            pregunta: "¿Qué es un conductor tipo THW?",
            respuesta: "Conductor unipolar AWG con aislación PVC, temperatura 75°C (mayor que NYA). Para ambientes secos y HÚMEDOS, canalizado en tuberías, bandejas, escalerillas. Muy usado en instalaciones industriales. Tensión 600V.",
            keywords: ["thw", "75 grados", "awg", "industrial"],
            seccion: "Tabla 8.6a"
        },
        {
            id: "04_007",
            pregunta: "¿Qué es un conductor tipo THHN?",
            respuesta: "Conductor unipolar AWG con aislación PVC y cubierta de NYLON, temperatura 90°C (la más alta común). Resistente a aceites, grasas, ácidos y gasolina. Para ambientes agresivos. Muy usado en industrias. Tensión 600V.",
            keywords: ["thhn", "90 grados", "nylon", "aceite", "químicos"],
            seccion: "Tabla 8.6a"
        },
        {
            id: "04_008",
            pregunta: "¿Qué es un conductor tipo EVA?",
            respuesta: "Conductor con aislación de ETIL VINIL ACETATO, 90°C. MUY RETARDANTE A LA LLAMA, AUTOEXTINGUENTE, se quema SIN EMITIR GASES TÓXICOS ni corrosivos. Obligatorio en MINAS, TÚNELES y LUGARES DE REUNIÓN DE PERSONAS. Tensión 1000V.",
            keywords: ["eva", "sin tóxicos", "minas", "túneles", "reunión personas"],
            seccion: "Tabla 8.6a"
        },
        {
            id: "04_009",
            pregunta: "¿Qué conductor se usa para instalaciones subterráneas directas?",
            respuesta: "Se usan cables con CHAQUETA exterior: NYY (métrico), TTU, TTMU, XTU, XTMU (AWG). También USE-RHH con chaqueta de NEOPRENO. Todos permiten instalación directamente enterrados o bajo agua.",
            keywords: ["subterráneo", "enterrado", "ttu", "xtu", "chaqueta"],
            seccion: "Tabla 8.6a"
        },
        {
            id: "04_010",
            pregunta: "¿Qué información debe tener impresa un conductor?",
            respuesta: "Debe llevar impreso: 1) Nombre del FABRICANTE o marca, 2) TIPO de conductor (THW, NYA, etc.), 3) SECCIÓN en mm², 4) TENSIÓN de servicio, 5) Número de CERTIFICACIÓN. Repetido cada 0,50 m máximo, en color de contraste.",
            keywords: ["marcado", "impresión", "identificación", "0.50m"],
            seccion: "8.1.2.4"
        },
        {
            id: "04_011",
            pregunta: "¿Cuál es el radio de curvatura mínimo de conductores?",
            respuesta: "El radio de curvatura NO debe ser menor a 8 VECES EL DIÁMETRO del conductor (incluida aislación). Para cables CON PANTALLA: mínimo 12 VECES el diámetro. Esto evita daños a la aislación.",
            keywords: ["curvatura", "radio", "8 veces", "12 veces", "doblar"],
            seccion: "8.1.2.5"
        },
        {
            id: "04_012",
            pregunta: "¿Cómo afecta la cantidad de conductores en un ducto a la capacidad?",
            respuesta: "Las tablas son para 3 conductores. Si hay MÁS, se aplica factor fn: 4-6 conductores → 0.8, 7-24 → 0.7, 25-42 → 0.6, más de 42 → 0.5. Ejemplo: 10 cables de 20A → capacidad real 20 × 0.7 = 14A cada uno.",
            keywords: ["cantidad", "factor", "fn", "0.8", "0.7", "0.6"],
            seccion: "8.1.2.3 - Tabla 8.8"
        },
        {
            id: "04_013",
            pregunta: "¿Cómo afecta la temperatura ambiente a la capacidad del conductor?",
            respuesta: "Las tablas son para 30°C. Si la temperatura es MAYOR, se aplica factor ft. Ejemplo a 40°C: conductores 70°C → ft=0.87, conductores 90°C → ft=0.91. Si hay 45°C: 70°C → ft=0.79, 90°C → ft=0.87. Por eso THHN (90°C) es mejor en zonas calurosas.",
            keywords: ["temperatura", "ambiente", "factor", "ft", "calor"],
            seccion: "8.1.2.3 - Tabla 8.9"
        },
        {
            id: "04_014",
            pregunta: "¿Cómo se calcula la corriente real de un conductor?",
            respuesta: "La fórmula es: Is = It × ft × fn. Donde Is = corriente de servicio real, It = corriente de tabla, ft = factor por temperatura, fn = factor por cantidad. Ejemplo: cable tabla 20A, a 40°C (ft=0.87), con 8 cables (fn=0.7) → Is = 20 × 0.87 × 0.7 = 12.18A",
            keywords: ["cálculo", "corriente", "is", "it", "ft", "fn"],
            seccion: "8.1.2.3"
        },
        {
            id: "04_015",
            pregunta: "¿Cuánta corriente soporta un cable de 2.5 mm² NYA?",
            respuesta: "Según Tabla 8.7 para conductores métricos 70°C: En tubería (Grupo 1) = 20A, En cable multipolar (Grupo 2) = 25A, Al aire libre separado (Grupo 3) = 32A. La capacidad aumenta con mejor ventilación.",
            keywords: ["2.5mm2", "capacidad", "20a", "25a", "32a"],
            seccion: "Tabla 8.7"
        },
        {
            id: "04_016",
            pregunta: "¿Cuánta corriente soporta un cable de 10 mm² NYA?",
            respuesta: "Según Tabla 8.7: En tubería = 45A, En cable multipolar = 61A, Al aire = 73A. Es un calibre común para circuitos de fuerza y subalimentadores en viviendas.",
            keywords: ["10mm2", "capacidad", "45a", "61a"],
            seccion: "Tabla 8.7"
        },
        {
            id: "04_017",
            pregunta: "¿Qué diferencia hay entre conductores AWG y métricos?",
            respuesta: "Los MÉTRICOS se miden en mm² (1.5, 2.5, 4, 6, 10, 16, etc.). Los AWG en números (14, 12, 10, 8, 6, etc.) donde A MENOR NÚMERO = MAYOR SECCIÓN. AWG 12 = 3.31mm², AWG 10 = 5.26mm², AWG 8 = 8.37mm².",
            keywords: ["awg", "métrico", "diferencia", "número", "mm2"],
            seccion: "Tabla 8.6a"
        },
        {
            id: "04_018",
            pregunta: "¿Cuál es la protección máxima para cables pequeños AWG?",
            respuesta: "Aunque las tablas indiquen más, las PROTECCIONES MÁXIMAS son: AWG 14 (2.08mm²) → 16A, AWG 12 (3.31mm²) → 20A, AWG 10 (5.26mm²) → 32A. Esto es por seguridad ante cortocircuitos.",
            keywords: ["protección", "máxima", "16a", "20a", "32a", "awg"],
            seccion: "Nota Tabla 8.7a"
        },
        {
            id: "04_019",
            pregunta: "¿Qué conductor es mejor para alta temperatura: THW o THHN?",
            respuesta: "THHN es MEJOR porque soporta 90°C vs 75°C del THW. En zonas calurosas (40°C ambiente): THW tiene ft=0.88 pero THHN ft=0.91. Además, THHN resiste aceites y químicos por su cubierta de nylon.",
            keywords: ["thw", "thhn", "temperatura", "90 grados", "mejor"],
            seccion: "Tabla 8.6a - Tabla 8.9a"
        },
        {
            id: "04_020",
            pregunta: "¿Cuándo es obligatorio usar conductor EVA?",
            respuesta: "Es OBLIGATORIO en: 1) MINAS subterráneas, 2) TÚNELES, 3) LUGARES DE REUNIÓN DE PERSONAS (teatros, cines, colegios, hospitales). Porque al quemarse NO emite gases tóxicos ni corrosivos, protegiendo vidas en evacuaciones.",
            keywords: ["eva", "obligatorio", "minas", "reunión", "tóxico"],
            seccion: "Tabla 8.6a"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_04;
}

console.log('✅ Archivo 04 - Tipos de Conductores y Capacidades cargado: ' + preguntasRespuestas_04.preguntas.length + ' preguntas');