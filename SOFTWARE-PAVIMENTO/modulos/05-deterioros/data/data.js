const moduleData = {
    fallas: [
        { 
            nombre: "Piel de Cocodrilo", 
            tipo: "Estructural", 
            severidad: "Alta",
            causa: "Fatiga por repetición de cargas - falla de base o subrasante",
            aspecto: "Fisuras interconectadas formando polígonos pequeños",
            solucion: "Fresado y recarpeteo (bajo-medio) | Reconstrucción (alto)",
            prevencion: "Diseño adecuado para tráfico, drenaje eficiente"
        },
        { 
            nombre: "Ahuellamiento", 
            tipo: "Funcional/Estructural", 
            severidad: "Media-Alta",
            causa: "Deformación permanente por cargas repetidas - temperatura alta",
            aspecto: "Depresiones longitudinales en huellas de ruedas",
            solucion: "Fresado y recarpeteo con mezcla más resistente",
            prevencion: "Asfalto modificado, control de espesor"
        },
        { 
            nombre: "Baches", 
            tipo: "Funcional", 
            severidad: "Alta",
            causa: "Desintegración localizada - infiltración agua",
            aspecto: "Cavidades en el pavimento",
            solucion: "Bacheo inmediato - reparación de base si necesario",
            prevencion: "Sellado preventivo de fisuras, drenaje"
        },
        { 
            nombre: "Fisura Longitudinal", 
            tipo: "Funcional", 
            severidad: "Baja-Media",
            causa: "Junta mal ejecutada o contracción térmica",
            aspecto: "Grieta paralela al eje del camino",
            solucion: "Sellado con material elastomérico",
            prevencion: "Control de temperatura de colocación"
        },
        { 
            nombre: "Descascaramiento (Hormigón)", 
            tipo: "Superficial", 
            severidad: "Media",
            causa: "Ciclos hielo-deshielo - mala calidad superficial",
            aspecto: "Pérdida de material superficial",
            solucion: "Reparación superficial con mortero especial",
            prevencion: "Curado adecuado, aditivos aire-incorporado"
        }
    ],
    clasificacion: {
        estructurales: ["Fatiga", "Hundimientos", "Ahuellamiento profundo"],
        funcionales: ["Fisuras", "Baches", "Pérdida textura", "Ahuellamiento leve"],
        superficiales: ["Exudación", "Pulimento agregados", "Descascaramiento"]
    },
    indicePCI: {
        descripcion: "Pavement Condition Index - 0 a 100",
        rangos: [
            { valor: "85-100", estado: "Excelente", accion: "Mantención rutinaria" },
            { valor: "70-85", estado: "Muy Bueno", accion: "Mantención preventiva" },
            { valor: "55-70", estado: "Bueno", accion: "Mantención menor" },
            { valor: "40-55", estado: "Regular", accion: "Mantención mayor" },
            { valor: "25-40", estado: "Malo", accion: "Rehabilitación" },
            { valor: "10-25", estado: "Muy Malo", accion: "Reconstrucción" },
            { valor: "0-10", estado: "Fallado", accion: "Reconstrucción urgente" }
        ]
    }
};
