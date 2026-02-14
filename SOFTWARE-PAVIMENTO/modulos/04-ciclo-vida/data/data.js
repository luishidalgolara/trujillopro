const moduleData = {
    etapas: [
        { fase: "Diseño", duracion: "6-12 meses", costo: "3-5% total", actividades: ["Estudios tráfico", "Suelos", "Diseño estructural", "Especificaciones"] },
        { fase: "Construcción", duracion: "12-24 meses", costo: "70-80% total", actividades: ["Movimiento tierras", "Capas granulares", "Pavimentación", "Señalización"] },
        { fase: "Mantención Preventiva", duracion: "5-10 años", costo: "5-10% total", actividades: ["Sellado fisuras", "Bacheo", "Recarpeteo", "Limpieza drenajes"] },
        { fase: "Rehabilitación", duracion: "15-20 años", costo: "40-60% inicial", actividades: ["Fresado", "Refuerzo estructural", "Nueva carpeta"] },
        { fase: "Reconstrucción", duracion: "20-40 años", costo: "80-100% inicial", actividades: ["Demolición", "Nueva estructura completa"] }
    ],
    vidaUtil: { flexible: "15-20 años", rigido: "30-40 años", semirigido: "20-30 años" },
    costoVidaUtil: { 
        flexible: { inicial: "$30.000/m²", mantencion: "$2.000/m²/año", total20años: "$70.000/m²" },
        rigido: { inicial: "$45.000/m²", mantencion: "$500/m²/año", total20años: "$55.000/m²" }
    }
};
