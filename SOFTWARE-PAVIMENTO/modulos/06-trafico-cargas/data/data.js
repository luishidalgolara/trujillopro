const moduleData = {
    ejesEquivalentes: {
        definicion: "ESAL - Equivalent Single Axle Load - Eje Patrón de 8.2 ton (18.000 lb)",
        formula: "ESAL = TMDA × % Camiones × Factor Camión × 365 × Factor Crecimiento × Período Diseño",
        factoresCamion: [
            { vehiculo: "Auto/Camioneta", ejes: "2", carga: "2 ton", factorESAL: "0.0002" },
            { vehiculo: "Camión C2 (2 ejes)", ejes: "2", carga: "16 ton", factorESAL: "0.89" },
            { vehiculo: "Camión C3 (3 ejes)", ejes: "3", carga: "25 ton", factorESAL: "2.15" },
            { vehiculo: "Semi C2-R2", ejes: "4", carga: "35 ton", factorESAL: "3.85" },
            { vehiculo: "Semi C3-R3", ejes: "6", carga: "45 ton", factorESAL: "5.20" }
        ]
    },
    categorias: [
        { tipo: "Tráfico Liviano", ESAL: "< 10^5", ejemplo: "Caminos rurales, urbanos locales" },
        { tipo: "Tráfico Medio", ESAL: "10^5 - 10^6", ejemplo: "Colectoras, urbanas secundarias" },
        { tipo: "Tráfico Pesado", ESAL: "10^6 - 10^7", ejemplo: "Carreteras interurbanas, urbanas principales" },
        { tipo: "Tráfico Muy Pesado", ESAL: "> 10^7", ejemplo: "Autopistas, rutas con alto % camiones" }
    ],
    ejemplosChile: [
        { ruta: "Autopista Central (RM)", TMDA: "200.000 veh/día", camionesPorcentaje: "15%", ESALproyectado: "50 millones" },
        { ruta: "Ruta 5 Tramo Santiago-Talca", TMDA: "40.000 veh/día", camionesPorcentaje: "35%", ESALproyectado: "30 millones" },
        { ruta: "Camino Rural Región Maule", TMDA: "800 veh/día", camionesPorcentaje: "10%", ESALproyectado: "200.000" }
    ],
    distribucionCargas: {
        descripcion: "Distribución de presión según tipo de neumático y carga por eje",
        presiones: {
            camionEstandar: "560-700 kPa (80-100 psi)",
            camionSobrecargado: "> 800 kPa (> 115 psi)",
            daño: "Presión excesiva causa deformaciones permanentes"
        }
    }
};
