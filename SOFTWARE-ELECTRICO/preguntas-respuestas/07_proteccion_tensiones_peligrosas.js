// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 07
// NCh Elec 4/2003 - Protección contra Tensiones Peligrosas
// ============================================================

const preguntasRespuestas_07 = {
    categoria: "PROTECCIÓN CONTRA TENSIONES PELIGROSAS",
    
    preguntas: [
        {
            id: "07_001",
            pregunta: "¿Cuál es el valor de resistencia del cuerpo humano considerado en la norma?",
            respuesta: "La norma considera una resistencia del cuerpo humano de 2.000 Ohm para efectos de cálculo de protecciones.",
            keywords: ["resistencia", "cuerpo humano", "2000 ohm"],
            seccion: "9.0.1"
        },
        {
            id: "07_002",
            pregunta: "¿Cuál es la tensión de seguridad máxima en lugares secos?",
            respuesta: "La tensión de seguridad máxima en lugares secos es de 50 V.",
            keywords: ["tensión seguridad", "50v", "secos"],
            seccion: "9.0.1"
        },
        {
            id: "07_003",
            pregunta: "¿Cuál es la tensión de seguridad máxima en lugares húmedos o mojados?",
            respuesta: "La tensión de seguridad máxima en lugares húmedos o mojados es de 24 V.",
            keywords: ["tensión seguridad", "24v", "húmedos", "mojados"],
            seccion: "9.0.1"
        },
        {
            id: "07_004",
            pregunta: "¿Cuál es la resistencia mínima para que un piso sea considerado aislante?",
            respuesta: "Un piso se considera aislante si tiene una resistencia mínima de 50.000 Ohm.",
            keywords: ["piso aislante", "50000 ohm", "resistencia"],
            seccion: "9.0.1"
        },
        {
            id: "07_005",
            pregunta: "¿Qué es un contacto directo?",
            respuesta: "Un contacto directo es cuando se toca una parte del circuito que normalmente está energizada, como un conductor de fase o neutro activo.",
            keywords: ["contacto directo", "conductor energizado"],
            seccion: "9.0.2"
        },
        {
            id: "07_006",
            pregunta: "¿Cuál es el límite de tensión para transformadores de aislación monofásicos?",
            respuesta: "Los transformadores de aislación monofásicos tienen un límite de 220 V y 5 KVA.",
            keywords: ["transformador aislación", "220v", "5kva", "monofásico"],
            seccion: "9.1.1"
        },
        {
            id: "07_007",
            pregunta: "¿Cuál es el límite de tensión y potencia para transformadores de aislación trifásicos?",
            respuesta: "Los transformadores de aislación trifásicos tienen un límite de 380 V y 18 KVA.",
            keywords: ["transformador aislación", "380v", "18kva", "trifásico"],
            seccion: "9.1.1"
        },
        {
            id: "07_008",
            pregunta: "En el sistema de protección por tensiones extra bajas, ¿cuál es la tensión máxima en lugares secos?",
            respuesta: "En el sistema de tensiones extra bajas, la tensión máxima en lugares secos es de 42 V.",
            keywords: ["extra baja", "42v", "secos"],
            seccion: "9.1.2"
        },
        {
            id: "07_009",
            pregunta: "¿Se puede hacer transformación directa de media o alta tensión a tensión extra baja?",
            respuesta: "No, está prohibida la transformación directa de media o alta tensión a tensión extra baja.",
            keywords: ["transformación", "media tensión", "prohibido"],
            seccion: "9.1.2"
        },
        {
            id: "07_010",
            pregunta: "En el sistema de doble aislación, ¿cuál es la corriente de fuga máxima permitida?",
            respuesta: "En el sistema de doble aislación, la corriente de fuga máxima permitida es de 1 mA.",
            keywords: ["doble aislación", "fuga", "1ma"],
            seccion: "9.1.3"
        },
        {
            id: "07_011",
            pregunta: "En instalaciones con neutro a tierra, ¿en cuánto tiempo máximo debe operar la protección ante una falla?",
            respuesta: "La protección debe operar en un tiempo máximo de 5 segundos ante una falla.",
            keywords: ["tiempo", "5 segundos", "protección", "falla"],
            seccion: "9.2.1"
        },
        {
            id: "07_012",
            pregunta: "¿Cuál es la sensibilidad máxima recomendada para protectores diferenciales en uso doméstico?",
            respuesta: "La sensibilidad máxima recomendada para protectores diferenciales en uso doméstico es de 30 mA.",
            keywords: ["diferencial", "30ma", "doméstico"],
            seccion: "9.2.2"
        },
        {
            id: "07_013",
            pregunta: "Para un diferencial de 30 mA, ¿cuál es la resistencia máxima de puesta a tierra en lugares secos?",
            respuesta: "Para un diferencial de 30 mA en lugares secos, la resistencia máxima de puesta a tierra es R = 50/0.03 = 1.667 Ohm.",
            keywords: ["diferencial", "30ma", "resistencia tierra", "1667 ohm"],
            seccion: "9.2.2"
        },
        {
            id: "07_014",
            pregunta: "En el sistema de neutralización, ¿cuál debe ser la sección del conductor de protección?",
            respuesta: "En el sistema de neutralización, la sección del conductor de protección debe ser igual a la del conductor de fase.",
            keywords: ["neutralización", "conductor protección", "sección igual"],
            seccion: "9.2.3"
        },
        {
            id: "07_015",
            pregunta: "¿Cuál es la resistencia máxima de puesta a tierra de servicio cuando se usa neutralización?",
            respuesta: "Cuando se usa neutralización, la resistencia máxima de puesta a tierra de servicio es de 20 Ohm.",
            keywords: ["neutralización", "tierra servicio", "20 ohm"],
            seccion: "9.2.3"
        },
        {
            id: "07_016",
            pregunta: "¿Cuál es el valor mínimo de resistencia de aislación para instalaciones de hasta 220 V?",
            respuesta: "El valor mínimo de resistencia de aislación para instalaciones de hasta 220 V es de 300.000 Ohm.",
            keywords: ["resistencia aislación", "220v", "300000 ohm"],
            seccion: "9.0.3"
        },
        {
            id: "07_017",
            pregunta: "Para instalaciones con tensión superior a 220 V, ¿cuál es la resistencia de aislación mínima?",
            respuesta: "Para instalaciones con tensión superior a 220 V, la resistencia de aislación mínima es de 1.000 Ohm/volt.",
            keywords: ["resistencia aislación", "1000 ohm/volt"],
            seccion: "9.0.3"
        },
        {
            id: "07_018",
            pregunta: "¿Con qué tensión se debe medir la resistencia de aislación en instalaciones de baja tensión?",
            respuesta: "La resistencia de aislación en instalaciones de baja tensión se debe medir con una tensión mínima de 500 V.",
            keywords: ["medición", "aislación", "500v"],
            seccion: "9.0.3"
        },
        {
            id: "07_019",
            pregunta: "Al medir resistencia de aislación, ¿qué posición deben tener los interruptores?",
            respuesta: "Al medir resistencia de aislación, todos los interruptores deben estar cerrados (ON).",
            keywords: ["medición", "interruptores", "cerrados"],
            seccion: "9.0.3"
        },
        {
            id: "07_020",
            pregunta: "¿Cuál es la sensibilidad máxima para diferenciales en recintos húmedos?",
            respuesta: "La sensibilidad máxima para diferenciales en recintos húmedos es de 30 mA.",
            keywords: ["diferencial", "húmedos", "30ma"],
            seccion: "9.2.2"
        },
        {
            id: "07_021",
            pregunta: "¿Cuál es la sensibilidad máxima para diferenciales en recintos mojados?",
            respuesta: "La sensibilidad máxima para diferenciales en recintos mojados es de 10 mA.",
            keywords: ["diferencial", "mojados", "10ma"],
            seccion: "9.2.2"
        },
        {
            id: "07_022",
            pregunta: "¿Qué es una conexión equipotencial?",
            respuesta: "Una conexión equipotencial es la unión de todas las partes metálicas accesibles simultáneamente para evitar tensiones peligrosas entre ellas.",
            keywords: ["equipotencial", "partes metálicas", "unión"],
            seccion: "9.1.4"
        },
        {
            id: "07_023",
            pregunta: "¿Se consideran las pinturas y barnices una aislación satisfactoria contra contactos directos?",
            respuesta: "No, las pinturas y barnices no se consideran una aislación satisfactoria contra contactos directos.",
            keywords: ["pinturas", "barnices", "no aislación"],
            seccion: "9.0.2"
        },
        {
            id: "07_024",
            pregunta: "¿En qué tipo de instalaciones se recomienda instalar dispositivos protectores contra sobretensiones?",
            respuesta: "Se recomienda instalar dispositivos protectores contra sobretensiones en instalaciones que alimenten equipos electrónicos sensibles.",
            keywords: ["sobretensiones", "equipos electrónicos", "protección"],
            seccion: "9.0.4"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_07;
}

console.log('✅ Archivo 07 - Protección Tensiones Peligrosas cargado: ' + preguntasRespuestas_07.preguntas.length + ' preguntas');
