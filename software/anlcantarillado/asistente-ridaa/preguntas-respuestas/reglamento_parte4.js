/**
 * ============================================
 * PREGUNTAS Y RESPUESTAS - REGLAMENTO PARTE 4
 * Fuente: RIDAA - Presentación de Proyectos y Diseño de Agua Potable
 * ============================================
 */

const RIDAA_FAQ_PARTE4 = {
    categoria: "Proyectos y Diseño de Agua Potable",
    fuente: "RIDAA - Título II y III (Segunda Parte)",
    preguntas: [
        {
            id: "p4_01",
            pregunta: "¿Qué es un proyecto de envergadura?",
            respuesta: "Se califican como proyectos de envergadura aquellos que NO correspondan a viviendas hasta de dos pisos, con 75 UEH o menos y diámetro máximo de arranque y medidor de agua potable de 25 mm.\n\nTambién son de envergadura si incluyen obras complementarias, tales como estanques, sistema de elevación u otros.\n\nLos proyectos simples (no de envergadura) pueden establecer la memoria y especificaciones técnicas mínimas directamente en el plano.",
            articulo: "Artículo 50º",
            tags: ["proyectos", "envergadura", "clasificación"]
        },
        {
            id: "p4_02",
            pregunta: "¿En qué formatos debo presentar los planos?",
            respuesta: "El tamaño de los planos estará comprendido entre los formatos A-3 y A-0, conforme a las Normas NCh 13 y 494.\n\nDeben presentarse en forma que puedan plegarse en formatos de 210 mm de ancho por 297 mm de alto (tamaño carta) con una tolerancia de ± 10 mm.\n\nSe emplea poliéster translúcido con tinta indeleble negra.",
            articulo: "Artículo 49º - b.b",
            tags: ["planos", "formatos", "presentación"]
        },
        {
            id: "p4_03",
            pregunta: "¿Qué escalas puedo usar para los planos?",
            respuesta: "Las escalas se seleccionarán entre las siguientes:\n\n• Planos de conjuntos o loteos: 1:100; 1:200; 1:250, 1:500 y 1:1000\n\n• Planos de la propiedad, plantas de pisos: 1:50; 1:100; 1:200; 1:250; 1:500\n\n• Planos de detalles y cortes: 1:1; 1:5; 1:10; 1:20; 1:25 ó 1:50\n\nEn general se usará la escala 1:100 para plantas de pisos.",
            articulo: "Artículo 49º - b.a",
            tags: ["planos", "escalas", "dibujo técnico"]
        },
        {
            id: "p4_04",
            pregunta: "¿Dónde debe ir ubicada la carátula del plano?",
            respuesta: "La carátula deberá ir ubicada en la esquina inferior derecha, debiendo plegarse el plano de manera que ésta quede siempre ubicada en primer plano, tanto en los proyectos de agua potable como en los de alcantarillado.",
            articulo: "Artículo 49º - b.c",
            tags: ["planos", "carátula", "presentación"]
        },
        {
            id: "p4_05",
            pregunta: "¿Los planos de agua potable y alcantarillado van juntos?",
            respuesta: "NO. Las instalaciones de agua potable y alcantarillado deberán ir en planos separados.\n\nLos proyectos de las instalaciones de agua fría y caliente podrán ir en un mismo plano, pero en plantas separadas.",
            articulo: "Artículo 50º - planos f y g",
            tags: ["planos", "separación", "presentación"]
        },
        {
            id: "p4_06",
            pregunta: "¿Qué debe incluir la memoria del proyecto de agua potable?",
            respuesta: "La memoria del proyecto de agua potable debe contener:\n\na) Número estimado de usuarios\nb) Dotaciones consideradas\nc) Materiales utilizados\nd) Cálculo de gastos instalados, probable y consumo máximo diario\ne) Cálculo de presiones\nf) Cálculo del medidor\ng) Cálculo y características de obras y equipos especiales\nh) Cálculo del consumo del período de punta\ni) Bases técnicas del sistema de riego, si lo hubiera",
            articulo: "Artículo 50º - a",
            tags: ["memoria", "proyecto", "agua potable"]
        },
        {
            id: "p4_07",
            pregunta: "¿Qué debe incluir la memoria del proyecto de alcantarillado?",
            respuesta: "La memoria del proyecto de alcantarillado debe contener:\n\na) Número estimado de usuarios\nb) Número de artefactos a instalar\nc) Gasto instalado de cada artefacto\nd) Dotaciones y cuadro de UEH\ne) Caudales de aguas servidas\nf) Criterios de diseño y dimensionamiento, bases de cálculo utilizadas\ng) Solución de aguas lluvia independiente del sistema de alcantarillado de aguas servidas",
            articulo: "Artículo 50º - b",
            tags: ["memoria", "proyecto", "alcantarillado"]
        },
        {
            id: "p4_08",
            pregunta: "¿Cuál es el diámetro mínimo de tuberías de agua potable?",
            respuesta: "El diámetro mínimo será:\n\n• Tuberías de cobre: D = 13 mm\n• Tuberías de material plástico: D = 16 mm\n\nTodos los diámetros deberán determinarse mediante cálculo.\n\nExcepción: Se podrá utilizar tubería de cobre de diámetro D = 10 mm en el tramo a la vista de la conexión a la llave o artefacto, con una longitud máxima de 20 cm.",
            articulo: "Artículo 52º - a",
            tags: ["diámetros", "tuberías", "agua potable"]
        },
        {
            id: "p4_09",
            pregunta: "¿Cómo se calcula el Gasto Máximo Probable (QMP)?",
            respuesta: "El gasto máximo probable (QMP) en L/min se calcula a partir del gasto instalado mediante la siguiente fórmula:\n\nPara ramales con grifería corriente:\nQ.M.P. = 1.7391 × QI^0.6891\n\nDonde:\n• QI: Gasto instalado en L/min\n• QMP: Gasto máximo probable en L/min\n\nPara ramales con válvulas automáticas se deberán cumplir con las especificaciones del fabricante.",
            articulo: "Artículo 52º - b.b",
            tags: ["cálculo", "QMP", "agua potable", "diseño"]
        },
        {
            id: "p4_10",
            pregunta: "¿Cuál es la presión mínima que debe tener la instalación?",
            respuesta: "No se aceptará sobre el punto de salida del artefacto situado más desfavorablemente, una presión menor a:\n\n• 4 m.c.a. (metros columna de agua) para instalaciones alimentadas desde la matriz\n\n• 7 m.c.a. cuando se abastece desde medios mecánicos (bombas)\n\nLa presión mínima para el diseño será la establecida en la Norma Chilena NCh 2485.",
            articulo: "Artículo 52º - d.a y d.d",
            tags: ["presión", "diseño", "agua potable"]
        },
        {
            id: "p4_11",
            pregunta: "¿Cuál es la velocidad máxima permitida en tuberías?",
            respuesta: "No se aceptará una velocidad superior a:\n\n• 2.5 m/s en las tuberías exteriores y de distribución principal\n\n• 2 m/s en las tuberías de la red interior\n\nEn casos de materiales con nuevas tecnologías que acepten velocidades mayores, éstas podrán utilizarse previa justificación técnica del fabricante ante la Superintendencia.",
            articulo: "Artículo 52º - d.a",
            tags: ["velocidad", "tuberías", "diseño"]
        },
        {
            id: "p4_12",
            pregunta: "¿Cómo se determina el diámetro del medidor de agua potable?",
            respuesta: "Para diámetros hasta 38 mm se usa esta tabla:\n\n• 13 mm: Consumo máximo 3 m³/día - QMP 50 l/min\n• 19 mm: Consumo máximo 5 m³/día - QMP 80 l/min\n• 25 mm: Consumo máximo 7 m³/día - QMP 117 l/min\n• 38 mm: Consumo máximo 20 m³/día - QMP 333 l/min\n\nSe calcula en función de la demanda máxima de la instalación en m³/día. En instalaciones sin estanque, también se calcula el gasto de diseño en l/min. En caso de discordancia, se adopta el mayor.",
            articulo: "Artículo 52º - c.b",
            tags: ["medidor", "dimensionamiento", "agua potable"]
        },
        {
            id: "p4_13",
            pregunta: "¿Dónde debe instalarse el medidor de agua potable?",
            respuesta: "Los medidores se instalarán junto a la línea oficial a la entrada del inmueble si es posible y en todo caso, en un lugar de fácil acceso y sin obstáculos para su lectura.\n\nDeben ser colocados en posición horizontal, salvo aquellos expresamente fabricados para ser colocados en otras posiciones.\n\nDeben ir instalados con protección adecuada contra daños producidos por golpes y factores climáticos.",
            articulo: "Artículo 52º - c.c",
            tags: ["medidor", "instalación", "ubicación"]
        },
        {
            id: "p4_14",
            pregunta: "¿Qué son los medidores remarcadores y cuándo se usan?",
            respuesta: "En edificios y conjuntos habitacionales que tengan una conexión única a la matriz pública de agua potable, el proyecto debe incluir la instalación de un medidor remarcador en los espacios comunes para cada departamento o inmueble.\n\nTambién se deben instalar medidores remarcadores para registrar los consumos comunes del edificio o conjunto.\n\nLas pasadas de tuberías a pisos superiores no podrán proyectarse por el interior de los departamentos, debiendo ubicarse en sitios comunes.",
            articulo: "Artículo 52º - c.c",
            tags: ["remarcadores", "edificios", "medición"]
        },
        {
            id: "p4_15",
            pregunta: "¿Cómo se calcula la pérdida de carga en el medidor?",
            respuesta: "Para medidores de transmisión mecánica de diámetro igual o inferior a 38 mm se usa:\n\nK = 0.036 × (QMP/C)²\n\nDonde:\n• QMP: Gasto máximo probable en L/min\n• C: Capacidad máxima del medidor en m³/día\n• K: Pérdida de carga en metros\n\nPara medidores de diámetros superiores a 38 mm deben utilizarse las tablas del fabricante.",
            articulo: "Artículo 52º - c.a",
            tags: ["pérdida de carga", "medidor", "cálculo"]
        },
        {
            id: "p4_16",
            pregunta: "¿Cuántas llaves de paso debe tener cada sala de servicio?",
            respuesta: "Toda sala de servicio (baño, cocina, etc.) deberá llevar a lo menos UNA llave de paso de agua fría y OTRA de agua caliente, que permita independizarla del resto de los servicios del inmueble.",
            articulo: "Artículo 52º - d.c",
            tags: ["llaves de paso", "agua potable", "instalación"]
        },
        {
            id: "p4_17",
            pregunta: "¿Qué es el gasto instalado?",
            respuesta: "El gasto instalado es la suma de los gastos de todos los artefactos de agua potable de la instalación.\n\nSe indican los gastos instalados por artefactos en el Anexo Nº 3 del reglamento. Se emplean los mismos valores para instalaciones de agua fría como para agua caliente.\n\nLa suma de los gastos instalados con agua fría determinará el gasto máximo instalado en L/min.",
            articulo: "Artículo 52º - b.a",
            tags: ["gasto instalado", "artefactos", "cálculo"]
        },
        {
            id: "p4_18",
            pregunta: "¿Debo instalar filtro antes del medidor?",
            respuesta: "En los arranques cuyo diámetro sea igual o superior a 50 mm, debe considerarse la instalación de un filtro de rejilla ANTES del medidor si éste no lo lleva incorporado.",
            articulo: "Artículo 52º - c.c",
            tags: ["filtro", "medidor", "instalación"]
        },
        {
            id: "p4_19",
            pregunta: "¿El prestador puede cambiar el diámetro del medidor instalado?",
            respuesta: "Sí, excepcionalmente. Con notificación previa al usuario, el prestador podrá modificar, a su costo, el diámetro del medidor, basándose en mediciones efectivas del consumo que registre el inmueble.\n\nCualquier discrepancia con relación a esta disposición, entre el prestador y el interesado, a solicitud de cualquiera de las partes, resolverá la Superintendencia.",
            articulo: "Artículo 52º - c.b",
            tags: ["medidor", "modificación", "prestador"]
        },
        {
            id: "p4_20",
            pregunta: "¿Cuándo debo incluir un esquema isométrico en el proyecto?",
            respuesta: "Cuando sea necesario en los proyectos de envergadura deberá incluirse un esquema isométrico.\n\nLos proyectos de envergadura son aquellos que NO corresponden a viviendas de hasta dos pisos con 75 UEH o menos, o que incluyen obras complementarias como estanques o sistemas de elevación.",
            articulo: "Artículo 50º - planos e",
            tags: ["isométrico", "proyectos", "planos"]
        }
    ]
};

// Exportar globalmente
window.RIDAA_FAQ_PARTE4 = RIDAA_FAQ_PARTE4;
console.log('✅ FAQ RIDAA Parte 4 cargado - 20 preguntas disponibles');
