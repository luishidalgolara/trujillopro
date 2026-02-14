const moduleData = {
    tecnologiasVerdes: [
        {
            nombre: "Reciclaje de Pavimento (RAP)",
            descripcion: "Reutilización de asfalto fresado en nuevas mezclas",
            beneficios: ["Ahorro 30-50% en materiales", "Reducción emisiones CO2", "Menos extracción agregados"],
            aplicacionChile: "Autopista Central, Costanera Norte - hasta 25% RAP",
            limitaciones: "Máximo 30% en carpetas de alto tráfico"
        },
        {
            nombre: "Mezclas Tibias (WMA)",
            descripcion: "Asfalto producido a 120-140°C vs 160-180°C tradicional",
            beneficios: ["20-40% menos consumo energía", "Menor envejecimiento asfalto", "Mejor condiciones trabajo"],
            tecnologias: ["Aditivos químicos", "Procesos con agua", "Aditivos orgánicos"]
        },
        {
            nombre: "Pavimentos Permeables",
            descripcion: "Permiten infiltración agua hacia subrasante",
            beneficios: ["Recarga napas freáticas", "Reducción escorrentía", "Menor riesgo inundaciones"],
            aplicacionChile: "Estacionamientos, ciclovías, plazas",
            limitaciones: "No apto para tráfico pesado"
        },
        {
            nombre: "Pavimentos Cool (Reflectantes)",
            descripcion: "Superficies claras que reflejan radiación solar",
            beneficios: ["Reducción isla de calor urbana", "Menor temperatura pavimento", "Ahorro energético edificios"],
            tecnologia: "Agregados claros, revestimientos especiales"
        },
        {
            nombre: "Hormigón con Cemento Sustentable",
            descripcion: "Remplazo parcial cemento por puzolanas, escoria",
            beneficios: ["30-50% menos CO2", "Uso subproductos industriales", "Similar resistencia"],
            materialesChile: "Escoria de alto horno, cenizas volantes (termoeléctricas)"
        }
    ],
    certificaciones: [
        { nombre: "Envision", tipo: "Infraestructura sustentable", aplicacion: "Proyectos viales grandes" },
        { nombre: "LEED", tipo: "Edificación sustentable", aplicacion: "Áreas pavimentadas en proyectos inmobiliarios" }
    ],
    huellaCarbono: {
        flexible: "35-50 kg CO2/m²",
        rigido: "60-80 kg CO2/m²",
        factoresEmision: ["Producción cemento/asfalto", "Transporte materiales", "Energía en planta", "Maquinaria"]
    },
    proyectosChile: [
        { nombre: "Ruta G-21 Temuco", innovacion: "Primera ruta 100% reciclada (fresado)", año: 2021, ahorroCO2: "40%" },
        { nombre: "Ciclovía Las Condes", innovacion: "Pavimento permeable", año: 2019, infiltracion: "80 L/m²/min" }
    ]
};
