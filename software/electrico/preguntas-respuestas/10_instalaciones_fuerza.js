// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 10
// NCh Elec 4/2003 - Instalaciones de Fuerza
// ============================================================

const preguntasRespuestas_10 = {
    categoria: "INSTALACIONES DE FUERZA",
    
    preguntas: [
        {
            id: "10_001",
            pregunta: "¿Qué dato se debe usar como base para dimensionar conductores y protecciones de motores?",
            respuesta: "Se debe usar como base la corriente indicada en la placa del motor.",
            keywords: ["motores", "placa", "corriente", "dimensionamiento"],
            seccion: "12.0.1"
        },
        {
            id: "10_002",
            pregunta: "¿Cuál es la sección mínima de conductor para alimentar motores fijos?",
            respuesta: "La sección mínima de conductor para alimentar motores fijos es de 2,5 mm².",
            keywords: ["motores", "sección mínima", "2.5mm2"],
            seccion: "12.0.1"
        },
        {
            id: "10_003",
            pregunta: "¿Deben estar separados los circuitos de fuerza de otros consumos?",
            respuesta: "Sí, pero pueden tener alimentadores comunes.",
            keywords: ["circuitos", "fuerza", "separados", "alimentadores"],
            seccion: "12.0.1"
        },
        {
            id: "10_004",
            pregunta: "Para un motor de régimen permanente, ¿qué capacidad de transporte mínima deben tener los conductores?",
            respuesta: "Los conductores deben tener una capacidad de transporte mínima de 1,25 veces la corriente de placa.",
            keywords: ["motores", "1.25", "conductores", "capacidad"],
            seccion: "12.1.1"
        },
        {
            id: "10_005",
            pregunta: "Para un grupo de motores de régimen permanente, ¿cómo se calcula la capacidad de los conductores?",
            respuesta: "La capacidad debe ser 1,25 veces la corriente del mayor motor más la suma de las corrientes del resto.",
            keywords: ["grupo motores", "1.25", "suma"],
            seccion: "12.1.1"
        },
        {
            id: "10_006",
            pregunta: "Para motores de breve duración (5 min), ¿cuál es el factor de dimensionamiento?",
            respuesta: "Para motores de breve duración (5 min), el factor de dimensionamiento es 1,1.",
            keywords: ["breve duración", "5 min", "1.1"],
            seccion: "12.1.1 - Tabla 12.28"
        },
        {
            id: "10_007",
            pregunta: "Para motores intermitentes (30-60 min), ¿cuál es el factor de dimensionamiento?",
            respuesta: "Para motores intermitentes (30-60 min), el factor de dimensionamiento es 0,9.",
            keywords: ["intermitente", "30-60 min", "0.9"],
            seccion: "12.1.1 - Tabla 12.28"
        },
        {
            id: "10_008",
            pregunta: "¿Qué motores de régimen permanente deben protegerse contra sobrecarga?",
            respuesta: "Todos los motores de régimen permanente mayores a 1 HP deben protegerse contra sobrecarga.",
            keywords: ["sobrecarga", "1 HP", "protección"],
            seccion: "12.2.1"
        },
        {
            id: "10_009",
            pregunta: "Para motores con factor de servicio ≥ 1,15, ¿a cuánto se regula la protección de sobrecarga?",
            respuesta: "Para motores con factor de servicio ≥ 1,15, la protección de sobrecarga se regula a 1,25 veces la corriente nominal.",
            keywords: ["factor servicio", "1.15", "1.25"],
            seccion: "12.2.1"
        },
        {
            id: "10_010",
            pregunta: "Para motores con factor de servicio < 1,15, ¿a cuánto se regula la protección de sobrecarga?",
            respuesta: "Para motores con factor de servicio < 1,15, la protección de sobrecarga se regula a 1,15 veces la corriente nominal.",
            keywords: ["factor servicio", "1.15", "protección"],
            seccion: "12.2.1"
        },
        {
            id: "10_011",
            pregunta: "Motores < 1 HP con partida manual, ¿necesitan protección de sobrecarga separada?",
            respuesta: "No, si están protegidos por las protecciones de cortocircuito del circuito.",
            keywords: ["menor 1 HP", "manual", "no requiere"],
            seccion: "12.2.1"
        },
        {
            id: "10_012",
            pregunta: "Motores < 1 HP con partida automática, ¿necesitan protección de sobrecarga?",
            respuesta: "Sí, deben protegerse contra sobrecarga.",
            keywords: ["menor 1 HP", "automática", "sí requiere"],
            seccion: "12.2.1"
        },
        {
            id: "10_013",
            pregunta: "¿Cómo se dimensiona la protección de cortocircuito de un motor?",
            respuesta: "La protección de cortocircuito debe ser capaz de soportar la corriente de partida sin operar.",
            keywords: ["cortocircuito", "partida", "soportar"],
            seccion: "12.3.1"
        },
        {
            id: "10_014",
            pregunta: "¿Puede un grupo de motores < 1 HP compartir una protección de cortocircuito única?",
            respuesta: "Sí, si la protección no excede 15 A y cada motor no excede 8 A.",
            keywords: ["grupo", "1 HP", "15A", "8A"],
            seccion: "12.3.1"
        },
        {
            id: "10_015",
            pregunta: "¿Deben las protecciones de circuitos de motores actuar sobre todos los conductores activos?",
            respuesta: "Sí, sobre todos los conductores activos.",
            keywords: ["protecciones", "todos", "conductores activos"],
            seccion: "12.3.1"
        },
        {
            id: "10_016",
            pregunta: "¿Qué potencia máxima pueden tener motores de funcionamiento permanente sin necesidad de partidor?",
            respuesta: "Los motores de funcionamiento permanente pueden tener hasta 200 W sin necesidad de partidor.",
            keywords: ["200W", "sin partidor", "permanente"],
            seccion: "12.4.1"
        },
        {
            id: "10_017",
            pregunta: "¿Qué potencia máxima pueden tener motores portátiles sin necesidad de partidor?",
            respuesta: "Los motores portátiles pueden tener hasta 300 W sin necesidad de partidor.",
            keywords: ["300W", "portátiles", "sin partidor"],
            seccion: "12.4.1"
        },
        {
            id: "10_018",
            pregunta: "¿Dónde debe ubicarse el interruptor de desconexión del motor?",
            respuesta: "El interruptor de desconexión debe ubicarse con vista al partidor y fácilmente accesible.",
            keywords: ["interruptor", "vista", "partidor", "accesible"],
            seccion: "12.4.2"
        },
        {
            id: "10_019",
            pregunta: "¿Puede el interruptor del tablero usarse como interruptor de desconexión?",
            respuesta: "Sí, si está ubicado con vista al motor.",
            keywords: ["tablero", "interruptor", "vista", "motor"],
            seccion: "12.4.2"
        },
        {
            id: "10_020",
            pregunta: "¿El interruptor de desconexión debe interrumpir todos los conductores activos?",
            respuesta: "Sí, todos los conductores activos.",
            keywords: ["desconexión", "todos", "conductores"],
            seccion: "12.4.2"
        },
        {
            id: "10_021",
            pregunta: "Los conductores de control dentro de la caja del partidor, ¿necesitan protección separada?",
            respuesta: "No, se consideran protegidos por las protecciones del motor.",
            keywords: ["control", "caja", "no requiere"],
            seccion: "12.5.1"
        },
        {
            id: "10_022",
            pregunta: "Los circuitos de control fuera de la caja, ¿deben protegerse?",
            respuesta: "Sí, según capacidad de transporte de conductores.",
            keywords: ["control", "fuera", "protección"],
            seccion: "12.5.1"
        },
        {
            id: "10_023",
            pregunta: "Para soldadoras tipo transformador con factor de funcionamiento 0,5, ¿cuál es el coeficiente?",
            respuesta: "Para soldadoras tipo transformador con factor 0,5, el coeficiente es 0,71.",
            keywords: ["soldadora", "transformador", "0.5", "0.71"],
            seccion: "12.6.1 - Tabla 12.29"
        },
        {
            id: "10_024",
            pregunta: "Para soldadoras no automáticas con ciclo de 1 hora, ¿cuál es el multiplicador?",
            respuesta: "Para soldadoras no automáticas con ciclo de 1 hora, el multiplicador es 1,0.",
            keywords: ["soldadora", "1 hora", "1.0"],
            seccion: "12.6.1 - Tabla 12.30"
        },
        {
            id: "10_025",
            pregunta: "¿Cuál es la capacidad máxima de protección de cortocircuito para soldadoras tipo transformador?",
            respuesta: "La capacidad máxima es de 2 veces la corriente nominal del primario.",
            keywords: ["soldadora", "cortocircuito", "2 veces"],
            seccion: "12.6.1"
        },
        {
            id: "10_026",
            pregunta: "Para soldadoras por resistencia con carga variable y control automático, ¿cuál es el factor?",
            respuesta: "Para soldadoras por resistencia con control automático, el factor es 0,7.",
            keywords: ["resistencia", "automático", "0.7"],
            seccion: "12.6.2 - Tabla 12.31"
        },
        {
            id: "10_027",
            pregunta: "Para soldadoras por resistencia con carga variable y control manual, ¿cuál es el factor?",
            respuesta: "Para soldadoras por resistencia con control manual, el factor es 0,6.",
            keywords: ["resistencia", "manual", "0.6"],
            seccion: "12.6.2 - Tabla 12.31"
        },
        {
            id: "10_028",
            pregunta: "¿Cuál es la capacidad máxima de protección para soldadoras por resistencia?",
            respuesta: "La capacidad máxima es de 2,5 veces la corriente.",
            keywords: ["resistencia", "protección", "2.5 veces"],
            seccion: "12.6.2"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_10;
}

console.log('✅ Archivo 10 - Instalaciones de Fuerza cargado: ' + preguntasRespuestas_10.preguntas.length + ' preguntas');
