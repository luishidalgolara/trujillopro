// NORMATIVA CHILENA - DATOS COMPLETOS
const moduleData = {
    moduleName: 'Normativa Chilena',
    normasPrincipales: [
        {
            nombre: "Manual de Carreteras Volumen 3 (MC-V3)",
            entidad: "Ministerio de Obras Públicas (MOP)",
            descripcion: "Norma principal para diseño de pavimentos en Chile",
            contenido: [
                "Métodos de diseño AASHTO 93",
                "Catálogo de estructuras de pavimentos",
                "Especificaciones geométricas",
                "Parámetros de diseño por zona climática"
            ],
            url: "https://mc.mop.gob.cl/",
            vigencia: "Actualizado 2023"
        },
        {
            nombre: "Manual de Carreteras Volumen 8 (MC-V8)",
            entidad: "MOP",
            descripcion: "Especificaciones técnicas de construcción",
            contenido: [
                "Normas de calidad de materiales",
                "Procedimientos constructivos",
                "Control de calidad y ensayos",
                "Tolerancias dimensionales"
            ],
            vigencia: "Actualizado 2024"
        },
        {
            nombre: "NCh 148 - Cemento Portland",
            entidad: "Instituto Nacional de Normalización (INN)",
            aplicacion: "Pavimentos rígidos",
            descripcion: "Requisitos físicos y químicos del cemento"
        },
        {
            nombre: "NCh 163 - Áridos para morteros y hormigones",
            entidad: "INN",
            aplicacion: "Todos los pavimentos",
            descripcion: "Requisitos granulométricos y físicos"
        },
        {
            nombre: "MC 8.302.4 - Mezclas Asfálticas en Caliente",
            entidad: "MOP",
            aplicacion: "Pavimentos flexibles",
            tiposMezclas: ["Densa", "Abierta", "SMA", "Microaglomerado"]
        }
    ],
    procesoDiseño: {
        etapas: [
            {
                fase: "1. Estudio de Tráfico",
                descripcion: "Determinación de ejes equivalentes (ESAL)",
                metodos: ["Conteo vehicular", "Pesaje", "Proyección 20 años"],
                parametros: ["TMDA", "% Camiones", "Factor camión"]
            },
            {
                fase: "2. Estudio de Suelos",
                descripcion: "Caracterización de subrasante",
                ensayos: ["CBR", "Proctor", "Granulometría", "Límites Atterberg"],
                clasificacion: ["Muy buena: CBR > 20%", "Buena: 10-20%", "Regular: 5-10%", "Mala: < 5%"]
            },
            {
                fase: "3. Selección de Estructura",
                descripcion: "Según catálogo MC-V3",
                factores: ["ESAL proyectados", "CBR de diseño", "Zona climática", "Disponibilidad materiales"]
            },
            {
                fase: "4. Diseño de Mezclas",
                descripcion: "Formulación en laboratorio",
                metodos: ["Marshall (asfalto)", "Resistencia compresión (hormigón)"]
            }
        ]
    },
    catalogoEstructuras: {
        flexible: [
            { trafico: "< 10^6 ESAL", CBR: "> 10%", carpeta: "5 cm", base: "15 cm", subbase: "15 cm" },
            { trafico: "10^6 - 10^7 ESAL", CBR: "> 10%", carpeta: "8 cm", base: "20 cm", subbase: "20 cm" },
            { trafico: "> 10^7 ESAL", CBR: "> 10%", carpeta: "10 cm", base: "25 cm", subbase: "25 cm" }
        ],
        rigido: [
            { trafico: "< 10^6 ESAL", losa: "18 cm", base: "10 cm" },
            { trafico: "10^6 - 10^7 ESAL", losa: "22 cm", base: "15 cm" },
            { trafico: "> 10^7 ESAL", losa: "26 cm", base: "15 cm" }
        ]
    },
    especificacionesMateriales: {
        asfalto: {
            tipos: ["CA 40-50", "CA 60-70", "CA 85-100"],
            modificados: ["SBS", "Crumb Rubber", "EVA"],
            gradosPG: ["PG 64-22", "PG 70-22", "PG 76-22"],
            criterios: ["Penetración", "Viscosidad", "Punto ablandamiento"]
        },
        agregados: {
            granulares: "Chancados, CBR > 80%, LL < 25%",
            asfalticos: "Desgaste Los Ángeles < 30%, Caras fracturadas > 75%"
        },
        hormigon: {
            resistencia: "H-40 MPa (28 días)",
            asentamiento: "5-10 cm",
            razónA_C: "< 0.50"
        }
    },
    
    // ========== DATOS SERVIU (NUEVO) ==========
    serviu: {
        nombre: "Manual de Pavimentación SERVIU",
        icono: "🏘️",
        subtitulo: "Servicio de Vivienda y Urbanización - MINVU",
        descripcion: "Normas y programas para pavimentación urbana en Chile",
        
        normasPrincipales: [
            {
                nombre: "REDEVU - Recomendaciones para el Diseño del Espacio Vial Urbano",
                entidad: "MINVU - Ministerio de Vivienda y Urbanismo",
                descripcion: "Guía principal para diseño de calles urbanas en Chile",
                contenido: [
                    "Diseño geométrico de calles urbanas",
                    "Criterios de accesibilidad universal",
                    "Integración de ciclovías",
                    "Diseño de aceras y cruces peatonales"
                ],
                vigencia: "Actualizado 2009 (en revisión 2025)"
            },
            {
                nombre: "Guía de Diseño de Pavimentos SERVIU",
                entidad: "SERVIU Regional",
                descripcion: "Metodología específica para pavimentos urbanos",
                contenido: [
                    "Método AASHTO adaptado a vías urbanas",
                    "Catálogo de soluciones tipo",
                    "Pavimentos permeables y sustentables",
                    "Diseño de pavimentos peatonales"
                ],
                vigencia: "Actualizado 2022"
            },
            {
                nombre: "OGUC - Ordenanza General de Urbanismo y Construcciones",
                entidad: "MINVU",
                aplicacion: "Normativa urbana general",
                descripcion: "Artículos sobre espacios públicos y vialidad urbana"
            },
            {
                nombre: "Manual de Carreteras MOP (Adaptado)",
                entidad: "MOP/SERVIU",
                aplicacion: "Especificaciones técnicas",
                descripcion: "Se usa MC Vol. 8 adaptado para contexto urbano"
            }
        ],
        
        tiposPavimentoUrbano: [
            {
                tipo: "Pavimento Flexible (Asfalto)",
                uso: "85% de calles urbanas",
                estructura: "5-7 cm carpeta asfáltica / 15-20 cm base granular",
                ventajas: "Bajo costo, rápida ejecución, fácil reparación",
                aplicacion: "Calles residenciales, avenidas de bajo tráfico"
            },
            {
                tipo: "Pavimento de Adoquines",
                uso: "Calles residenciales y zonas patrimoniales",
                estructura: "8 cm adoquines hormigón / 5 cm arena / base granular",
                ventajas: "Estética, fácil reparación, permeable",
                aplicacion: "Barrios históricos, pasajes"
            },
            {
                tipo: "Pavimento de Hormigón",
                uso: "Vías estructurantes urbanas",
                estructura: "15-20 cm losa de hormigón / base granular",
                ventajas: "Larga vida útil, soporta tráfico pesado",
                aplicacion: "Avenidas principales, vías con locomoción colectiva"
            },
            {
                tipo: "Tratamiento Superficial",
                uso: "Calles de bajo tráfico",
                estructura: "2-3 cm emulsión asfáltica + áridos",
                ventajas: "Muy económico, rápida aplicación",
                aplicacion: "Pasajes, poblaciones periféricas"
            }
        ],
        
        programasViales: [
            {
                nombre: "Pavimentación Participativa",
                descripcion: "Cofinanciamiento entre SERVIU, municipio y vecinos",
                aportes: "33% vecinos, 33% municipio, 34% SERVIU",
                beneficio: "Pavimentación de pasajes y calles locales"
            },
            {
                nombre: "Programa Pavimentos Urbanos",
                descripcion: "Pavimentación directa de vías estructurantes",
                financiamiento: "100% SERVIU",
                aplicacion: "Avenidas principales, vías de alto flujo"
            },
            {
                nombre: "Quiero Mi Barrio",
                descripcion: "Recuperación integral de espacios públicos",
                incluye: "Pavimentación + áreas verdes + iluminación"
            },
            {
                nombre: "Ciclovías Urbanas",
                descripcion: "Red de ciclovías con pavimento especializado",
                tipos: ["Segregadas (hormigón)", "Compartidas", "Ciclo-bandas"],
                meta2026: "300 km nuevos en ciudades principales"
            }
        ],
        
        proyectosReferencia: [
            {
                ciudad: "Santiago",
                proyecto: "Av. Grecia - Pavimentación integral",
                extension: "4.2 km",
                tipo: "Pavimento flexible + ciclovías",
                año: "2019-2020"
            },
            {
                ciudad: "Valparaíso",
                proyecto: "Pavimentación Cerros",
                caracteristica: "Calles con hasta 20% pendiente",
                tipo: "Adoquines y hormigón"
            },
            {
                ciudad: "Concepción",
                proyecto: "Reconstrucción Post-Terremoto 2010",
                extension: "~150 km calles",
                periodo: "2010-2015"
            },
            {
                ciudad: "Temuco",
                proyecto: "Plan Pavimentación Participativa",
                alcance: "180 cuadras",
                beneficiarios: "~8.000 familias"
            }
        ]
    }
};