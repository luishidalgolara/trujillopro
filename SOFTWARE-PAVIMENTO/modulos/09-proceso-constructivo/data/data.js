const moduleData = {
    etapasFlexible: [
        {
            etapa: "1. Preparación Terreno",
            actividades: ["Despeje y limpieza", "Excavación/relleno", "Compactación subrasante"],
            equipos: ["Bulldozer", "Motoniveladora", "Rodillo pata de cabra"],
            tiempoEst: "2-3 semanas/km",
            controlCalidad: ["Densidad Proctor (95% mínimo)", "CBR > diseño"]
        },
        {
            etapa: "2. Subbase Granular",
            actividades: ["Transporte material", "Esparcido", "Humectación", "Compactación"],
            equipos: ["Camiones", "Motoniveladora", "Camión aljibe", "Rodillo vibratorio"],
            tiempoEst: "1-2 semanas/km",
            controlCalidad: ["Granulometría", "Densidad 95-100% PM", "CBR > 40%"]
        },
        {
            etapa: "3. Base Granular",
            actividades: ["Similar subbase pero material mejor calidad"],
            equipos: ["Igual anterior", "Rodillo neumático"],
            tiempoEst: "1-2 semanas/km",
            controlCalidad: ["Densidad 98-100% PM", "CBR > 80%"]
        },
        {
            etapa: "4. Imprimación",
            actividades: ["Riego asfalto diluido (MC-30, MC-70)"],
            equipos: ["Camión imprimador"],
            dosis: "0.5-1.5 L/m²",
            tiempoEst: "1 día/km",
            curado: "24-48 horas"
        },
        {
            etapa: "5. Carpeta Asfáltica",
            actividades: ["Producción mezcla en planta", "Transporte (T° > 130°C)", "Extendido", "Compactación"],
            equipos: ["Planta asfáltica", "Camiones tolva", "Pavimentadora", "Rodillos"],
            temperatura: "Colocación: 130-160°C",
            compactacion: "Inmediata, en 3 pasadas",
            tiempoEst: "2-4 días/km",
            controlCalidad: ["Temperatura", "Espesor", "Densidad 95-98%", "Granulometría", "% Asfalto"]
        },
        {
            etapa: "6. Señalización y Terminaciones",
            actividades: ["Demarcación", "Señalética vertical", "Tachas", "Defensas"],
            tiempoEst: "3-5 días/km"
        }
    ],
    etapasRigido: [
        {
            etapa: "1-3. Preparación + Subbase",
            descripcion: "Similar pavimento flexible"
        },
        {
            etapa: "4. Moldajes y Barras",
            actividades: ["Colocación moldajes laterales", "Instalación barras transferencia", "Instalación barras amarre"],
            barrasTransferencia: "Ø25mm cada 30cm, L=45cm (juntas transversales)",
            barrasAmarre: "Ø12mm cada 75cm (juntas longitudinales)"
        },
        {
            etapa: "5. Hormigonado",
            actividades: ["Transporte hormigón (T° < 30°C)", "Vaciado", "Vibrado", "Enrase", "Texturizado"],
            equipos: ["Camiones mixer", "Extendedora de hormigón", "Vibradores", "Regla enrasadora", "Texturizadora"],
            tiempoTrabajoMax: "60-90 minutos post-amasado",
            espesorTipico: "20-28 cm"
        },
        {
            etapa: "6. Curado",
            actividades: ["Riego con compound o mantas húmedas"],
            duracion: "7 días mínimo",
            temperaturaAmbiente: "Evitar < 5°C o > 30°C"
        },
        {
            etapa: "7. Corte de Juntas",
            actividades: ["Aserrado juntas con disco diamantado"],
            momento: "12-24 horas post-hormigonado",
            profundidad: "1/3 del espesor losa",
            separacion: "4-5 metros (juntas transversales)"
        },
        {
            etapa: "8. Sellado Juntas",
            actividades: ["Limpieza", "Sellado con elastómero"],
            momento: "28 días post-hormigonado"
        }
    ],
    maquinaria: {
        movimientoTierras: ["Bulldozer D6-D8", "Excavadora 320", "Camión tolva 20m³"],
        compactacion: ["Rodillo liso vibratorio 10-12 ton", "Rodillo neumático 12 ruedas", "Rodillo pata cabra"],
        pavimentacion: ["Pavimentadora asfáltica Vögele", "Planta asfáltica 180-320 ton/h", "Terminadora hormigón Gómaco"],
        control: ["Geo-Radar GPR", "Extracción testigos", "Viga Benkelman"]
    },
    condicionesClimaticas: {
        asfalto: ["No lluvia", "T° ambiente > 10°C", "Viento < 30 km/h"],
        hormigon: ["No lluvia", "T° 5-30°C", "Humedad < 85%"]
    }
};
