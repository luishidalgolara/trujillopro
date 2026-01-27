// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 03
// NCh Elec 4/2003 - Conductores y Canalizaciones
// ============================================================

const preguntasRespuestas_03 = {
    categoria: "CONDUCTORES Y CANALIZACIONES",
    
    preguntas: [
        {
            id: "03_001",
            pregunta: "¿Qué material de conductor establece la norma?",
            respuesta: "La norma establece que todas las disposiciones consideran el uso de CONDUCTORES DE COBRE AISLADO, con la única excepción de artículos específicos donde se acepta el uso de conductores desnudos (como puesta a tierra).",
            keywords: ["conductor", "cobre", "material", "cable"],
            seccion: "8.0.1.1"
        },
        {
            id: "03_002",
            pregunta: "¿Cuál es la sección mínima permitida en circuitos de potencia?",
            respuesta: "La sección mínima a usar en circuitos de potencia es de 1,5 mm². No se permite usar conductores de menor sección para circuitos de alumbrado, enchufes o fuerza.",
            keywords: ["sección", "mínima", "1.5", "mm2", "calibre"],
            seccion: "8.0.1.2"
        },
        {
            id: "03_003",
            pregunta: "¿Cuándo se debe usar conductor cableado?",
            respuesta: "Todo conductor que se instale en cualquier tipo de ducto y cuya sección sea SUPERIOR A 10 mm² DEBE SER DEL TIPO CABLEADO. Los conductores menores pueden ser sólidos o cableados.",
            keywords: ["cableado", "10mm2", "flexible", "ducto"],
            seccion: "8.0.1.3"
        },
        {
            id: "03_004",
            pregunta: "¿Se pueden mezclar circuitos de distinto servicio en un mismo ducto?",
            respuesta: "NO. En un mismo ducto cerrado SÓLO pueden llevarse conductores de un mismo servicio (potencia, computación, control o comunicaciones) y alimentados por una misma tensión. No se puede mezclar, por ejemplo, cables de potencia con cables de datos.",
            keywords: ["ducto", "mezclar", "servicio", "separación"],
            seccion: "8.0.1.4"
        },
        {
            id: "03_005",
            pregunta: "¿Se pueden llevar varios circuitos en un mismo ducto?",
            respuesta: "NO, como regla general. En un mismo ducto cerrado SÓLO pueden llevarse los conductores de UN MISMO CIRCUITO. Se exceptúan las bandejas, escalerillas y canaletas que tienen disposiciones especiales.",
            keywords: ["circuito", "ducto", "varios", "mismo"],
            seccion: "8.0.1.5"
        },
        {
            id: "03_006",
            pregunta: "¿Qué conductores adicionales se permiten junto al circuito de alimentación?",
            respuesta: "Se permite que en el mismo ducto vayan los conductores de excitación, controles, relés o instrumentos de medida conectados a un artefacto de hasta 15 KW o a un motor, siempre que operen a la MISMA TENSIÓN de servicio.",
            keywords: ["control", "motor", "misma tensión", "auxiliares"],
            seccion: "8.0.1.6"
        },
        {
            id: "03_007",
            pregunta: "¿Cuándo se pueden usar conductores en paralelo?",
            respuesta: "Se permite usar conductores en paralelo en líneas de potencia de 50 mm² o superior, cumpliendo que: tengan el mismo largo, misma sección, misma aislación, mismo tipo de terminales y se les aplique el factor de corrección por cantidad de conductores.",
            keywords: ["paralelo", "50mm2", "varios conductores", "mismo largo"],
            seccion: "8.0.1.7"
        },
        {
            id: "03_008",
            pregunta: "¿Qué son las transposiciones de conductores?",
            respuesta: "Son cambios de posición de los conductores de fase en líneas largas (más de 50m) para mantener el equilibrio de impedancias. Se hacen en bandejas, escalerillas o cámaras para evitar desequilibrio en la distribución de corrientes.",
            keywords: ["transposición", "50m", "equilibrio", "impedancia"],
            seccion: "8.0.1.8"
        },
        {
            id: "03_009",
            pregunta: "¿Cómo proteger conductores expuestos a ambientes agresivos?",
            respuesta: "Los conductores expuestos a aceites, grasas, solventes, vapores, gases o humos deben seleccionarse con características adecuadas al ambiente. Existen aislaciones especiales resistentes a químicos, temperatura, humedad, etc.",
            keywords: ["aceite", "químicos", "ambiente", "protección"],
            seccion: "8.0.2.1"
        },
        {
            id: "03_010",
            pregunta: "¿Qué distancia debe haber entre canalización y muro en locales húmedos?",
            respuesta: "En locales muy húmedos donde los muros son lavados frecuentemente, la canalización a la vista debe quedar separada del muro AL MENOS 1 CM. Si es embutida, solo se permiten tuberías NO METÁLICAS.",
            keywords: ["húmedo", "1cm", "separación", "muro"],
            seccion: "8.0.2.3"
        },
        {
            id: "03_011",
            pregunta: "¿Qué hacer en canalizaciones con diferencias de temperatura?",
            respuesta: "En instalaciones con temperaturas muy dispares (ej: bodegas refrigeradas) se debe evitar la circulación de aire entre zonas calientes y frías mediante SELLOS ADECUADOS. También se deben usar juntas de dilatación en tramos largos.",
            keywords: ["temperatura", "sello", "refrigeración", "dilatación"],
            seccion: "8.0.3.1 y 8.0.3.2"
        },
        {
            id: "03_012",
            pregunta: "¿Qué factores determinan la temperatura de operación de un conductor?",
            respuesta: "Los factores son: 1) Temperatura ambiente (variable día/estación), 2) Calor generado por efecto Joule, 3) Facilidad de disipación del calor, 4) Presencia de conductores vecinos que elevan temperatura y dificultan disipación.",
            keywords: ["temperatura", "operación", "joule", "disipación"],
            seccion: "8.0.3.3"
        },
        {
            id: "03_013",
            pregunta: "¿Cómo deben conectarse los ductos metálicos entre sí?",
            respuesta: "Los ductos metálicos, accesorios, cajas y gabinetes deben estar UNIDOS EN FORMA MECÁNICAMENTE RÍGIDA y el conjunto debe asegurar CONDUCTIVIDAD ELÉCTRICA EFECTIVA. Esto es clave para la continuidad de tierra.",
            keywords: ["ducto metálico", "unión", "conductividad", "rígida"],
            seccion: "8.0.4.1"
        },
        {
            id: "03_014",
            pregunta: "¿Se pueden mezclar ductos metálicos con no metálicos?",
            respuesta: "Se recomienda EVITAR esta mezcla. Si es inevitable, la unión se hace a través de una CAJA METÁLICA conectada al conductor de protección. Si no existe este conductor, debe tenderse para estos fines.",
            keywords: ["metálico", "plástico", "mezcla", "caja"],
            seccion: "8.0.4.2"
        },
        {
            id: "03_015",
            pregunta: "¿Se permiten uniones de conductores dentro de los ductos?",
            respuesta: "NO. Todos los conductores deben ser CONTINUOS entre caja y caja o entre artefactos. NO SE PERMITEN UNIONES DE CONDUCTORES DENTRO DE LOS DUCTOS. Las uniones solo en cajas.",
            keywords: ["unión", "ducto", "continuo", "empalme"],
            seccion: "8.0.4.5"
        },
        {
            id: "03_016",
            pregunta: "¿Qué largo de chicote se debe dejar en las cajas?",
            respuesta: "En cada caja de derivación, enchufes o interruptores se deben dejar CHICOTES DE AL MENOS 15 CM DE LARGO para ejecutar la unión respectiva. Esto facilita las conexiones y futuras reparaciones.",
            keywords: ["chicote", "15cm", "caja", "derivación"],
            seccion: "8.0.4.6"
        },
        {
            id: "03_017",
            pregunta: "¿Cuándo se puede comenzar a alambrar una instalación?",
            respuesta: "Se debe alambrar cuando: 1) Sistema de ductos esté completo, 2) La edificación asegure protección contra daños físicos, humedad y agentes atmosféricos, 3) Los ductos estén limpios y libres de agentes extraños.",
            keywords: ["alambrar", "ductos", "completo", "protección"],
            seccion: "8.0.4.7"
        },
        {
            id: "03_018",
            pregunta: "¿Qué distancia debe haber entre canalización eléctrica y ductos de calefacción?",
            respuesta: "Las canalizaciones eléctricas deben colocarse a NO MENOS DE 0,15 M (15 cm) de ductos de calefacción o gases calientes. Si no es posible, la canalización debe AISLARSE TÉRMICAMENTE en todo el recorrido afectado.",
            keywords: ["distancia", "calefacción", "0.15m", "15cm"],
            seccion: "8.0.4.8"
        },
        {
            id: "03_019",
            pregunta: "¿Qué distancia debe haber entre canalización eléctrica y tuberías de gas?",
            respuesta: "Las canalizaciones eléctricas NO pueden ubicarse en un conducto común con tuberías de gas o combustible, ni a una distancia INFERIOR A 0,60 M (60 cm) en ambientes abiertos. Esto es por seguridad ante fugas.",
            keywords: ["gas", "distancia", "0.60m", "60cm", "combustible"],
            seccion: "8.0.4.8"
        },
        {
            id: "03_020",
            pregunta: "¿Qué características debe tener un entretecho con canalizaciones?",
            respuesta: "Si hay canalizaciones en entretecho: 1) Debe permitir tránsito expedito, 2) Altura mínima en zona más alta: 1,40 m, 3) Altura libre sobre cajas: 0,50 m, 4) Acceso mediante escotilla mínimo 0,50 x 0,50 m.",
            keywords: ["entretecho", "altura", "1.40m", "escotilla"],
            seccion: "8.0.4.9, 8.0.4.10, 8.0.4.11"
        },
        {
            id: "03_021",
            pregunta: "¿Cuál es el código de colores para conductores eléctricos?",
            respuesta: "FASE 1: AZUL, FASE 2: NEGRO, FASE 3: ROJO, NEUTRO y tierra de servicio: BLANCO, CONDUCTOR DE PROTECCIÓN (tierra): VERDE o VERDE/AMARILLO. Este código debe respetarse en toda la instalación.",
            keywords: ["color", "azul", "negro", "rojo", "blanco", "verde"],
            seccion: "8.0.4.15"
        },
        {
            id: "03_022",
            pregunta: "¿Qué hacer si solo hay conductores negros en el mercado?",
            respuesta: "Para secciones mayores a 21 mm², si solo hay conductores negros, se deben MARCAR cada 10 metros con pintura de buena adherencia u otro método permanente, respetando el código de colores (azul, negro, rojo, blanco, verde).",
            keywords: ["marcar", "pintura", "10m", "identificación"],
            seccion: "8.0.4.16"
        },
        {
            id: "03_023",
            pregunta: "¿Qué exigencias hay para cajas de derivación accesibles?",
            respuesta: "Las canalizaciones deben ejecutarse de modo que EN CUALQUIER MOMENTO se pueda: medir aislamiento, localizar fallas o reemplazar conductores. Esto implica que las cajas deben ser accesibles y no quedar selladas permanentemente.",
            keywords: ["accesible", "derivación", "medir", "reemplazar"],
            seccion: "8.0.4.14"
        },
        {
            id: "03_024",
            pregunta: "¿Cómo se identifican las canalizaciones eléctricas?",
            respuesta: "Las canalizaciones eléctricas deben IDENTIFICARSE ADECUADAMENTE para diferenciarlas de las de otros servicios (agua, gas, datos, etc.). Esto previene errores durante mantención o remodelaciones.",
            keywords: ["identificar", "marcar", "diferenciar", "servicio"],
            seccion: "8.0.4.13"
        },
        {
            id: "03_025",
            pregunta: "¿Se permiten instalaciones en entretechos de altura reducida?",
            respuesta: "SÍ, se permiten instalaciones en entretechos que no cumplan las dimensiones mínimas (1,40m altura) SIEMPRE QUE las cajas de derivación sean ACCESIBLES DESDE EL INTERIOR del recinto. Esto evita tener que ingresar al entretecho.",
            keywords: ["entretecho", "altura reducida", "accesible", "interior"],
            seccion: "8.0.4.12"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_03;
}

console.log('✅ Archivo 03 - Conductores y Canalizaciones cargado: ' + preguntasRespuestas_03.preguntas.length + ' preguntas');