// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 08
// NCh Elec 4/2003 - Puestas a Tierra
// ============================================================

const preguntasRespuestas_08 = {
    categoria: "PUESTAS A TIERRA",
    
    preguntas: [
        {
            id: "08_001",
            pregunta: "¿Qué es la tierra de servicio?",
            respuesta: "La tierra de servicio es la puesta a tierra de un punto de la alimentación, en particular el neutro del sistema eléctrico.",
            keywords: ["tierra servicio", "neutro", "alimentación"],
            seccion: "10.0.1"
        },
        {
            id: "08_002",
            pregunta: "¿Qué es la tierra de protección?",
            respuesta: "La tierra de protección es la puesta a tierra de toda pieza conductora que no forma parte del circuito activo, como carcasas metálicas de equipos.",
            keywords: ["tierra protección", "carcasas", "equipos"],
            seccion: "10.0.2"
        },
        {
            id: "08_003",
            pregunta: "¿Dónde se debe efectuar la puesta a tierra de servicio?",
            respuesta: "La puesta a tierra de servicio se debe efectuar lo más próximo posible al empalme.",
            keywords: ["tierra servicio", "empalme", "ubicación"],
            seccion: "10.1.1"
        },
        {
            id: "08_004",
            pregunta: "¿Se pueden colocar protecciones o interruptores en el conductor neutro?",
            respuesta: "Solo se pueden colocar si actúan simultáneamente sobre todos los conductores activos y el neutro.",
            keywords: ["neutro", "protecciones", "interruptores", "simultáneos"],
            seccion: "10.1.1"
        },
        {
            id: "08_005",
            pregunta: "¿De qué color debe ser la aislación del conductor de tierra de servicio?",
            respuesta: "La aislación del conductor de tierra de servicio debe ser de color blanco o azul claro.",
            keywords: ["tierra servicio", "color", "blanco", "azul"],
            seccion: "10.1.1"
        },
        {
            id: "08_006",
            pregunta: "¿Cuál es la sección mínima del conductor de tierra de servicio en subestaciones?",
            respuesta: "La sección mínima del conductor de tierra de servicio en subestaciones es de 21 mm².",
            keywords: ["tierra servicio", "subestación", "21mm2"],
            seccion: "10.1.1"
        },
        {
            id: "08_007",
            pregunta: "Si la acometida es de 50 mm², ¿cuál es la sección del conductor de tierra de servicio?",
            respuesta: "Si la acometida es de 50 mm², el conductor de tierra de servicio debe ser de 16 mm².",
            keywords: ["acometida", "50mm2", "tierra servicio", "16mm2"],
            seccion: "10.1.1 - Tabla 10.21"
        },
        {
            id: "08_008",
            pregunta: "Si la acometida es de 150 mm², ¿cuál es la sección del conductor de tierra de servicio?",
            respuesta: "Si la acometida es de 150 mm², el conductor de tierra de servicio debe ser de 50 mm².",
            keywords: ["acometida", "150mm2", "tierra servicio", "50mm2"],
            seccion: "10.1.1 - Tabla 10.21"
        },
        {
            id: "08_009",
            pregunta: "En redes internas de distribución, ¿a qué distancia máxima se debe poner a tierra el neutro?",
            respuesta: "En redes internas de distribución, el neutro se debe poner a tierra cada 200 m como máximo.",
            keywords: ["neutro", "200m", "redes distribución"],
            seccion: "10.1.1"
        },
        {
            id: "08_010",
            pregunta: "¿Cuál debe ser la resistencia combinada máxima de todas las puestas a tierra en una red de distribución interna?",
            respuesta: "La resistencia combinada máxima de todas las puestas a tierra en una red de distribución interna debe ser de 5 Ohm.",
            keywords: ["resistencia", "5 ohm", "red distribución"],
            seccion: "10.1.1"
        },
        {
            id: "08_011",
            pregunta: "¿Cuál es la fórmula para calcular la resistencia de tierra de protección?",
            respuesta: "La fórmula es RTP = VS / IO = VS / (K × IN), donde VS es la tensión de seguridad, IO es la corriente de operación de la protección, K es el factor de disparo e IN es la corriente nominal.",
            keywords: ["RTP", "fórmula", "resistencia", "tierra protección"],
            seccion: "10.2.1"
        },
        {
            id: "08_012",
            pregunta: "Para fusibles rápidos en tableros de distribución, ¿cuál es el factor K?",
            respuesta: "Para fusibles rápidos en tableros de distribución, el factor K es 2,5.",
            keywords: ["fusibles", "factor K", "2.5"],
            seccion: "10.2.1 - Tabla 10.22"
        },
        {
            id: "08_013",
            pregunta: "Para disyuntores pequeños curva tipo C en tableros de distribución, ¿cuál es el factor K?",
            respuesta: "Para disyuntores pequeños curva tipo C en tableros de distribución, el factor K es 5.",
            keywords: ["disyuntores", "curva C", "factor K", "5"],
            seccion: "10.2.1 - Tabla 10.22"
        },
        {
            id: "08_014",
            pregunta: "Si los conductores activos son de 10 mm², ¿cuál es la sección del conductor de protección?",
            respuesta: "Si los conductores activos son de 10 mm², el conductor de protección debe ser de 10 mm².",
            keywords: ["10mm2", "conductor protección"],
            seccion: "10.2.1 - Tabla 10.23"
        },
        {
            id: "08_015",
            pregunta: "Si los conductores activos son de 70 mm², ¿cuál es la sección del conductor de protección?",
            respuesta: "Si los conductores activos son de 70 mm², el conductor de protección debe ser de 25 mm².",
            keywords: ["70mm2", "protección", "25mm2"],
            seccion: "10.2.1 - Tabla 10.23"
        },
        {
            id: "08_016",
            pregunta: "Si los conductores activos son de 240 mm², ¿cuál es la sección del conductor de protección?",
            respuesta: "Si los conductores activos son de 240 mm², el conductor de protección debe ser de 70 mm².",
            keywords: ["240mm2", "protección", "70mm2"],
            seccion: "10.2.1 - Tabla 10.23"
        },
        {
            id: "08_017",
            pregunta: "¿De qué color debe ser la aislación del conductor de protección?",
            respuesta: "La aislación del conductor de protección debe ser de color verde-amarillo.",
            keywords: ["conductor protección", "color", "verde-amarillo"],
            seccion: "10.2.1"
        },
        {
            id: "08_018",
            pregunta: "¿Se puede usar soldadura plomo-estaño como único método de unión en puestas a tierra?",
            respuesta: "No, pero se puede usar como complemento a abrazaderas mecánicas.",
            keywords: ["soldadura", "plomo-estaño", "complemento"],
            seccion: "10.2.1"
        },
        {
            id: "08_019",
            pregunta: "¿Se aceptan las barras de hormigón armado de fundaciones como electrodos de tierra?",
            respuesta: "Sí, si la longitud total no es inferior a 0,75 m y el diámetro no es inferior a 10 mm.",
            keywords: ["hormigón armado", "electrodos", "0.75m", "10mm"],
            seccion: "10.3.1"
        },
        {
            id: "08_020",
            pregunta: "Si se usan varias barras de electrodo vertical, ¿cuál es la distancia mínima entre ellas?",
            respuesta: "La distancia mínima entre barras de electrodo vertical debe ser 2 veces el largo de cada barra.",
            keywords: ["barras", "distancia", "2 veces", "largo"],
            seccion: "10.3.1"
        },
        {
            id: "08_021",
            pregunta: "Para electrodos de plancha, ¿cuál es la distancia mínima entre planchas?",
            respuesta: "La distancia mínima entre electrodos de plancha es de 3 m.",
            keywords: ["planchas", "distancia", "3m"],
            seccion: "10.3.1"
        },
        {
            id: "08_022",
            pregunta: "¿Cuál es la sección mínima de un conductor de cobre desnudo usado como electrodo en cimientos?",
            respuesta: "La sección mínima de un conductor de cobre desnudo usado como electrodo en cimientos es de 25 mm².",
            keywords: ["conductor", "cimientos", "25mm2"],
            seccion: "10.3.1"
        },
        {
            id: "08_023",
            pregunta: "¿Cuál es la longitud mínima del conductor usado como electrodo en cimientos?",
            respuesta: "La longitud mínima del conductor usado como electrodo en cimientos es de 20 m.",
            keywords: ["conductor", "cimientos", "20m"],
            seccion: "10.3.1"
        },
        {
            id: "08_024",
            pregunta: "El conductor usado como electrodo en cimientos debe estar cubierto por un mínimo de:",
            respuesta: "El conductor usado como electrodo en cimientos debe estar cubierto por un mínimo de 5 cm de hormigón.",
            keywords: ["conductor", "cimientos", "5cm", "hormigón"],
            seccion: "10.3.1"
        },
        {
            id: "08_025",
            pregunta: "¿Qué se debe dejar durante la construcción de una puesta a tierra para facilitar su medición?",
            respuesta: "Se debe dejar al menos un punto de desconexión accesible para facilitar la medición de la puesta a tierra.",
            keywords: ["punto desconexión", "medición", "accesible"],
            seccion: "10.4.1"
        },
        {
            id: "08_026",
            pregunta: "¿De quién es la responsabilidad del correcto diseño y construcción de una puesta a tierra?",
            respuesta: "La responsabilidad del correcto diseño y construcción de una puesta a tierra es del proyectista y/o instalador.",
            keywords: ["responsabilidad", "proyectista", "instalador"],
            seccion: "10.4.1"
        },
        {
            id: "08_027",
            pregunta: "¿De quién es la responsabilidad del mantenimiento de las características de operación de la puesta a tierra?",
            respuesta: "La responsabilidad del mantenimiento de las características de operación de la puesta a tierra es del usuario de la instalación.",
            keywords: ["responsabilidad", "mantenimiento", "usuario"],
            seccion: "10.4.1"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_08;
}

console.log('✅ Archivo 08 - Puestas a Tierra cargado: ' + preguntasRespuestas_08.preguntas.length + ' preguntas');
