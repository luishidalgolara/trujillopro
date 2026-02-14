const moduleData = {
    costosUnitarios2025: {
        flexible: {
            carpetaAsfaltica: "$8.500/m²",
            baseAsfaltica: "$7.000/m²",
            baseGranular: "$4.500/m²",
            subbaseGranular: "$3.500/m²",
            total8cm: "$30.000/m²"
        },
        rigido: {
            losaHormigon25cm: "$28.000/m²",
            baseGranular15cm: "$5.500/m²",
            barrasTransferencia: "$2.500/m²",
            total: "$45.000/m²"
        },
        mantenimiento: {
            selladoFisuras: "$800/m²",
            bacheoSuperficial: "$12.000/m²",
            bacheoEstructural: "$25.000/m²",
            recarpeteo5cm: "$15.000/m²",
            fresado: "$3.500/m²"
        }
    },
    analisisVidaUtil: {
        flexible: {
            inversionInicial: "$30.000/m²",
            mantencionAño5: "$2.000/m²",
            recarpeteoAño12: "$15.000/m²",
            costoTotal20años: "$70.000/m²",
            costoAnualizado: "$3.500/m²/año"
        },
        rigido: {
            inversionInicial: "$45.000/m²",
            mantencionAño10: "$500/m²",
            reparacionJuntasAño15: "$2.000/m²",
            costoTotal30años: "$55.000/m²",
            costoAnualizado: "$1.833/m²/año"
        }
    },
    factoresVariacion: [
        "Ubicación geográfica (logística)",
        "Disponibilidad de materiales locales",
        "Volumen de obra (economías de escala)",
        "Condiciones de subrasante",
        "Accesibilidad del proyecto"
    ],
    ejemploProyecto1km: {
        descripcion: "1 km de ruta 2 pistas (7m ancho c/u) = 14.000 m²",
        flexible: "$420 millones CLP",
        rigido: "$630 millones CLP",
        diferencia: "$210 millones más (pero 10 años más de vida útil)"
    }
};
