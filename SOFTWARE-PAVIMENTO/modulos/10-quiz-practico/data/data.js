// QUIZ PRÁCTICO - DATOS COMPLETOS
const moduleData = {
    preguntas: [
        {
            id: 1,
            pregunta: "¿Cuál es el tipo de pavimento más adecuado para una zona con alta pluviosidad y tráfico pesado?",
            opciones: ["Flexible estándar", "Rígido de hormigón", "Flexible con RAP", "Adoquines"],
            respuestaCorrecta: 1,
            explicacion: "El pavimento rígido tiene mejor comportamiento ante humedad y cargas pesadas, requiriendo menor mantenimiento en zonas lluviosas."
        },
        {
            id: 2,
            pregunta: "Si un pavimento presenta 'piel de cocodrilo', ¿cuál es la causa más probable?",
            opciones: ["Exceso de temperatura", "Fatiga estructural por cargas repetidas", "Mala calidad del asfalto", "Exceso de agua superficial"],
            respuestaCorrecta: 1,
            explicacion: "La piel de cocodrilo es una falla estructural causada por fatiga de la estructura ante repetición de cargas excesivas."
        },
        {
            id: 3,
            pregunta: "¿Qué significa ESAL en el diseño de pavimentos?",
            opciones: ["Espesor de Asfalto Standard", "Eje Simple Equivalente de 8.2 toneladas", "Estructura de Suelo y Asfalto Laminado", "Estudio de Soporte de Alta Resistencia"],
            respuestaCorrecta: 1,
            explicacion: "ESAL (Equivalent Single Axle Load) es el eje patrón de referencia de 8.2 toneladas (18.000 libras) usado para diseño."
        },
        {
            id: 4,
            pregunta: "En Chile, ¿qué manual del MOP contiene las especificaciones técnicas de construcción?",
            opciones: ["MC-V2", "MC-V3", "MC-V8", "MC-V5"],
            respuestaCorrecta: 2,
            explicacion: "El Manual de Carreteras Volumen 8 (MC-V8) contiene todas las especificaciones técnicas de construcción."
        },
        {
            id: 5,
            pregunta: "¿Cuál es el rango de temperatura típico para colocar mezcla asfáltica en caliente?",
            opciones: ["80-100°C", "130-160°C", "180-220°C", "100-120°C"],
            respuestaCorrecta: 1,
            explicacion: "La mezcla asfáltica debe colocarse entre 130-160°C para asegurar compactación adecuada y trabajabilidad."
        },
        {
            id: 6,
            pregunta: "¿Qué espesor típico tiene una losa de pavimento rígido para tráfico pesado en Chile?",
            opciones: ["15-18 cm", "20-25 cm", "28-32 cm", "10-15 cm"],
            respuestaCorrecta: 1,
            explicacion: "Para tráfico pesado (> 10^7 ESAL) se usan losas de 20-26 cm según el catálogo del MC-V3."
        },
        {
            id: 7,
            pregunta: "¿Cuál es la vida útil esperada de un pavimento flexible bien diseñado y mantenido?",
            opciones: ["5-10 años", "15-20 años", "30-40 años", "40-50 años"],
            respuestaCorrecta: 1,
            explicacion: "Un pavimento flexible tiene vida útil de 15-20 años, aunque puede extenderse con mantenimiento preventivo."
        },
        {
            id: 8,
            pregunta: "¿Qué ensayo se utiliza para medir la capacidad de soporte de la subrasante?",
            opciones: ["Proctor", "CBR", "Marshall", "Granulometría"],
            respuestaCorrecta: 1,
            explicacion: "El CBR (California Bearing Ratio) mide la capacidad de soporte del suelo de subrasante."
        },
        {
            id: 9,
            pregunta: "En zona desértica del norte de Chile, ¿qué grado de asfalto PG es más recomendable?",
            opciones: ["PG 58-22", "PG 64-22", "PG 70-22", "PG 76-22"],
            respuestaCorrecta: 2,
            explicacion: "En zonas de altas temperaturas se requiere PG 70-22 o superior para resistir deformaciones térmicas."
        },
        {
            id: 10,
            pregunta: "¿Cuál es el beneficio principal del reciclaje de pavimentos (RAP)?",
            opciones: ["Mayor resistencia", "Reducción costos y huella carbono", "Mayor velocidad construcción", "Mejor apariencia"],
            respuestaCorrecta: 1,
            explicacion: "El RAP reduce costos en 30-50% y disminuye significativamente emisiones de CO2 al reutilizar materiales."
        }
    ],
    casosEstudio: [
        {
            titulo: "Caso 1: Selección de Pavimento - Ruta Rural Región del Maule",
            contexto: {
                ubicacion: "Región del Maule, zona rural",
                clima: "Mediterráneo, 600 mm lluvia anual",
                trafico: "TMDA = 1.200 veh/día, 15% camiones",
                ESALproyectado: "800.000",
                CBR: "12%",
                presupuesto: "Limitado"
            },
            pregunta: "¿Qué tipo de pavimento recomendarías?",
            opciones: [
                "Pavimento flexible: carpeta 5cm + base 15cm + subbase 15cm",
                "Pavimento rígido: losa 20cm + base 10cm",
                "Tratamiento superficial doble",
                "Pavimento articulado (adoquines)"
            ],
            respuestaCorrecta: 0,
            explicacion: "Para tráfico liviano (< 10^6 ESAL) y presupuesto limitado, pavimento flexible es óptimo. El tratamiento superficial sería insuficiente para ese tráfico."
        },
        {
            titulo: "Caso 2: Falla en Autopista - Ahuellamiento Severo",
            contexto: {
                ubicacion: "Autopista urbana Santiago",
                problema: "Ahuellamiento de 3-5 cm en pista lenta",
                trafico: "200.000 veh/día, 20% buses y camiones",
                edad: "8 años",
                temporada: "Después de verano muy caluroso"
            },
            pregunta: "¿Cuál es la solución más apropiada?",
            opciones: [
                "Solo bacheo de las zonas afectadas",
                "Fresado de capa antigua + recarpeteo con asfalto PG 76-22 modificado",
                "Dejar hasta próximo año y solo marcar",
                "Reconstrucción completa de toda la estructura"
            ],
            respuestaCorrecta: 1,
            explicacion: "El ahuellamiento por temperatura requiere fresado (eliminar daño) y reemplazo con asfalto de mayor grado PG resistente al calor."
        }
    ],
    niveles: {
        principiante: { preguntas: [1, 2, 3, 4], aprobacion: 60 },
        intermedio: { preguntas: [5, 6, 7, 8], aprobacion: 70 },
        avanzado: { preguntas: [9, 10], casosEstudio: [1, 2], aprobacion: 80 }
    }
};
