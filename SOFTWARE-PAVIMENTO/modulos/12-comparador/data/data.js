// COMPARADOR DE PAVIMENTOS - DATOS COMPLETOS
const moduleData = {
    tiposPavimento: {
        flexible: {
            nombre: "Pavimento Flexible (Asfáltico)",
            descripcionCorta: "Estructura en capas con carpeta asfáltica",
            materialPrincipal: "Mezcla asfáltica (asfalto + agregados)",
            capasMinimas: 3,
            capasEstructura: [
                { nombre: "Carpeta de Rodadura", material: "Mezcla asfáltica", espesor: "5-12 cm" },
                { nombre: "Base Granular", material: "Piedra chancada", espesor: "15-25 cm" },
                { nombre: "Subbase Granular", material: "Grava o estabilizado", espesor: "15-30 cm" },
                { nombre: "Subrasante", material: "Suelo natural mejorado", espesor: "Variable" }
            ]
        },
        rigido: {
            nombre: "Pavimento Rígido (Hormigón)",
            descripcionCorta: "Losa de hormigón que trabaja por flexión",
            materialPrincipal: "Hormigón (cemento + agregados + agua)",
            capasMinimas: 2,
            capasEstructura: [
                { nombre: "Losa de Hormigón", material: "Hormigón H-40", espesor: "18-28 cm" },
                { nombre: "Base Granular", material: "Piedra chancada", espesor: "10-15 cm" },
                { nombre: "Subrasante", material: "Suelo natural mejorado", espesor: "Variable" }
            ]
        },
        semirigido: {
            nombre: "Pavimento Semirrígido",
            descripcionCorta: "Combinación: base tratada + carpeta asfáltica",
            materialPrincipal: "Base estabilizada + asfalto",
            capasMinimas: 3,
            capasEstructura: [
                { nombre: "Carpeta Asfáltica", material: "Mezcla asfáltica", espesor: "5-10 cm" },
                { nombre: "Base Tratada", material: "Suelo-cemento o Base negra", espesor: "15-20 cm" },
                { nombre: "Subbase Granular", material: "Grava", espesor: "15-20 cm" },
                { nombre: "Subrasante", material: "Suelo natural", espesor: "Variable" }
            ]
        }
    },
    comparacionDetallada: {
        costos: {
            flexible: { inicial: "$30.000/m²", mantencionAnual: "$2.000/m²", vidaUtil: "15-20 años", costoTotal20años: "$70.000/m²" },
            rigido: { inicial: "$45.000/m²", mantencionAnual: "$500/m²", vidaUtil: "30-40 años", costoTotal30años: "$55.000/m²" },
            semirigido: { inicial: "$35.000/m²", mantencionAnual: "$1.200/m²", vidaUtil: "20-25 años", costoTotal20años: "$59.000/m²" }
        },
        construccion: {
            flexible: { tiempo: "Rápido (2-4 días/km)", complejidad: "Media", curado: "6-12 horas", habitacionInmediata: "Sí" },
            rigido: { tiempo: "Lento (1-2 semanas/km)", complejidad: "Alta", curado: "7-28 días", habitacionInmediata: "No" },
            semirigido: { tiempo: "Medio (3-5 días/km)", complejidad: "Media-Alta", curado: "24-72 horas", habitacionInmediata: "Parcial" }
        },
        estructural: {
            flexible: { 
                distribucionCargas: "Disipa cargas en todas las capas", 
                rigidez: "Baja - flexible", 
                espesorTotal: "35-70 cm",
                mecanismoFalla: "Fatiga, ahuellamiento"
            },
            rigido: { 
                distribucionCargas: "Losa trabaja como placa por flexión", 
                rigidez: "Alta - rígida", 
                espesorTotal: "25-45 cm",
                mecanismoFalla: "Fisuración de losa, escalonamiento juntas"
            },
            semirigido: { 
                distribucionCargas: "Intermedio - base rígida + superficie flexible", 
                rigidez: "Media", 
                espesorTotal: "35-50 cm",
                mecanismoFalla: "Reflexión de fisuras, fatiga"
            }
        },
        clima: {
            flexible: {
                calor: "❌ Susceptible a ahuellamiento (T > 30°C)",
                frio: "✅ Buen comportamiento si PG adecuado",
                lluvia: "⚠️ Vulnerable a stripping sin aditivos",
                nieve: "✅ Buen comportamiento"
            },
            rigido: {
                calor: "✅ Excelente - no se deforma",
                frio: "⚠️ Riesgo fisuras si juntas mal selladas",
                lluvia: "✅ Excelente - impermeable",
                nieve: "✅ Muy bueno"
            },
            semirigido: {
                calor: "✅ Bueno - base rígida previene deformación",
                frio: "⚠️ Riesgo reflexión de fisuras",
                lluvia: "✅ Bueno con impermeabilización",
                nieve: "✅ Bueno"
            }
        },
        trafico: {
            flexible: { ligero: "✅✅", medio: "✅✅", pesado: "✅", muyPesado: "⚠️" },
            rigido: { ligero: "✅", medio: "✅✅", pesado: "✅✅", muyPesado: "✅✅" },
            semirigido: { ligero: "✅", medio: "✅✅", pesado: "✅✅", muyPesado: "✅" }
        },
        mantenimiento: {
            flexible: {
                frecuencia: "Alta - cada 5-8 años",
                tiposMantención: ["Sellado fisuras", "Bacheo", "Recarpeteo"],
                facilidad: "✅ Fácil y rápido",
                costoRecurrente: "Alto"
            },
            rigido: {
                frecuencia: "Baja - cada 10-15 años",
                tiposMantención: ["Sellado juntas", "Reparación losas puntuales"],
                facilidad: "⚠️ Complejo",
                costoRecurrente: "Bajo"
            },
            semirigido: {
                frecuencia: "Media - cada 7-10 años",
                tiposMantención: ["Sellado fisuras", "Recarpeteo superficial"],
                facilidad: "✅ Moderado",
                costoRecurrente: "Medio"
            }
        }
    },
    criteriosSeleccion: {
        traficoLigero: {
            condicion: "TMDA < 2.000 veh/día, < 10% camiones",
            recomendacion: "Flexible",
            razon: "Menor inversión inicial, suficiente capacidad"
        },
        traficoMedio: {
            condicion: "TMDA 2.000-15.000 veh/día, 10-30% camiones",
            recomendacion: "Flexible o Semirrígido",
            razon: "Balance costo-desempeño óptimo"
        },
        traficoPesado: {
            condicion: "TMDA > 15.000 veh/día, > 30% camiones",
            recomendacion: "Rígido o Semirrígido",
            razon: "Menor mantenimiento, mayor vida útil, mejor costo ciclo vida"
        },
        climaHumedo: {
            condicion: "Precipitación > 1.200 mm/año",
            recomendacion: "Rígido preferente",
            razon: "Menor susceptibilidad a daño por agua"
        },
        climaSeco: {
            condicion: "Precipitación < 300 mm/año",
            recomendacion: "Flexible o Rígido",
            razon: "Ambos funcionan bien - decidir por tráfico y costos"
        },
        presupuestoLimitado: {
            condicion: "Restricción presupuestaria importante",
            recomendacion: "Flexible",
            razon: "Menor inversión inicial (aunque mayor costo vida útil)"
        },
        largoplazo: {
            condicion: "Análisis 30+ años",
            recomendacion: "Rígido",
            razon: "Menor costo ciclo de vida total"
        }
    },
    ventajasDesventajas: {
        flexible: {
            ventajas: [
                "Menor inversión inicial",
                "Construcción rápida",
                "Habilitación inmediata al tráfico",
                "Reparaciones fáciles y rápidas",
                "Superficie cómoda y silenciosa",
                "Flexible ante asentamientos"
            ],
            desventajas: [
                "Mayor mantenimiento recurrente",
                "Vida útil menor (15-20 años)",
                "Susceptible a ahuellamiento por calor",
                "Vulnerable a daño por agua (stripping)",
                "Mayor costo en ciclo vida completo"
            ]
        },
        rigido: {
            ventajas: [
                "Larga vida útil (30-40 años)",
                "Bajo mantenimiento",
                "Excelente para tráfico pesado",
                "No se deforma por temperatura",
                "Resistente al agua",
                "Menor costo ciclo de vida"
            ],
            desventajas: [
                "Mayor inversión inicial (50% más)",
                "Construcción lenta",
                "Curado largo (7-28 días)",
                "Reparaciones complejas y costosas",
                "Ruidoso para usuarios",
                "Juntas requieren mantención específica"
            ]
        },
        semirigido: {
            ventajas: [
                "Balance costo-desempeño",
                "Buena capacidad estructural",
                "Construcción moderada",
                "Combina ventajas de ambos tipos"
            ],
            desventajas: [
                "Riesgo reflexión de fisuras",
                "Menos usado (menos experiencia)",
                "Requiere control calidad estricto",
                "Complejidad en diseño de mezclas"
            ]
        }
    },
    casosUsoChile: {
        flexible: [
            "Ruta 5 Norte y Sur (mayoría de tramos)",
            "Autopistas urbanas Santiago (Central, Vespucio)",
            "Calles urbanas y caminos rurales",
            "Aeropuertos (pistas auxiliares)"
        ],
        rigido: [
            "Ruta Interportuaria Biobío",
            "Puerto accesos (alto % camiones)",
            "Túnel El Melón",
            "Aeropuertos (pistas principales)"
        ],
        semirigido: [
            "Algunos tramos experimentales Ruta 5",
            "Accesos industriales",
            "Zonas de frenado intenso"
        ]
    }
};
