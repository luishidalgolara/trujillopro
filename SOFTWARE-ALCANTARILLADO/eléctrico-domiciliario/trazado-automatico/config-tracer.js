// ========================================
// CONFIGURACIÓN DEL TRAZADO AUTOMÁTICO
// ========================================

const TracerConfig = {
    // Colores por tipo de circuito
    circuitColors: {
        'alimentacion': '#e74c3c',      // Rojo - Empalme → Medidor → Tablero
        'iluminacion': '#f39c12',       // Naranja - C1: Luminarias
        'enchufes': '#3498db',          // Azul - C2: Enchufes
        'cocina': '#9b59b6',            // Morado - C3: Cocina
        'lavadora': '#1abc9c',          // Verde agua - C4: Lavadora
        'especial': '#e91e63',          // Rosa - Enchufes especiales
        'tierra': '#27ae60'             // Verde - Conductor de tierra
    },
    
    // Calibres de conductores según circuito
    conductorSize: {
        'alimentacion': '6mm²',         // Acometida principal
        'iluminacion': '2.5mm²',        // C1
        'enchufes': '2.5mm²',           // C2
        'cocina': '4mm²',               // C3
        'lavadora': '2.5mm²',           // C4
        'especial': '2.5mm²',           // Especiales
        'tierra': '2.5mm²'              // PE
    },
    
    // Diámetros de ducto según cantidad de conductores
    ductDiameter: {
        2: 'Ø16mm',
        3: 'Ø16mm',
        4: 'Ø20mm',
        5: 'Ø20mm',
        6: 'Ø25mm',
        7: 'Ø25mm',
        8: 'Ø25mm'
    },
    
    // Grosor de líneas en SVG
    lineWidth: {
        'alimentacion': 4,
        'circuito': 2.5,
        'tierra': 2
    },
    
    // Estilo de líneas
    lineStyle: {
        'alimentacion': 'solid',
        'circuito': 'solid',
        'tierra': 'dashed'
    },
    
    // Categorías de elementos eléctricos
    elementCategories: {
        infraestructura: ['empalme', 'medidor', 'tablero'],
        iluminacion: ['luminaria-cielo', 'aplique', 'luminaria-exterior', 'luz-simple', 'luz-doble', 'conmutado'],
        enchufes: ['enchufe-simple', 'enchufe-doble', 'enchufe-exterior'],
        especiales: ['enchufe-especial'], // Refrigerador, etc
        interruptores: ['int-simple', 'int-doble', 'conmutador', 'pulsador'],
        tierra: ['jabalina', 'conductor-tierra', 'tierra-enchufe']
    },
    
    // Mapeo de elementos a circuitos
    circuitMapping: {
        'luminaria-cielo': 'C1',
        'aplique': 'C1',
        'luminaria-exterior': 'C1',
        'luz-simple': 'C1',
        'luz-doble': 'C1',
        'conmutado': 'C1',
        'enchufe-simple': 'C2',
        'enchufe-doble': 'C2',
        'enchufe-exterior': 'C2',
        'enchufe-especial': 'C5', // Refrigerador
        'int-simple': 'C1',
        'int-doble': 'C1',
        'conmutador': 'C1',
        'pulsador': 'C1'
    },
    
    // Prioridad de conexión (orden)
    connectionPriority: [
        'empalme',
        'medidor',
        'tablero',
        'enchufe-especial',     // Primero especiales (refrigerador)
        'luminaria-cielo',
        'aplique',
        'luminaria-exterior',
        'enchufe-simple',
        'enchufe-doble',
        'enchufe-exterior',
        'int-simple',
        'int-doble',
        'conmutador'
    ],
    
    // Configuración de optimización de rutas
    pathfinding: {
        gridSize: 10,           // Tamaño de celda para pathfinding
        diagonalAllowed: false, // Solo movimientos ortogonales (90°)
        cornerRadius: 5,        // Radio de esquinas suavizadas
        minDistance: 30,        // Distancia mínima entre líneas paralelas
        avoidCrossings: true    // Intentar evitar cruces
    },
    
    // Etiquetas automáticas
    autoLabels: {
        showCalibre: true,      // Mostrar calibre (2.5mm²)
        showDucto: true,        // Mostrar diámetro ducto (Ø16mm)
        showCircuit: true,      // Mostrar nombre circuito (C1, C2)
        fontSize: 10,
        color: '#2c3e50'
    }
};

// Función auxiliar para obtener categoría de un elemento
function getElementCategory(elementType) {
    for (const [category, types] of Object.entries(TracerConfig.elementCategories)) {
        if (types.includes(elementType)) {
            return category;
        }
    }
    return 'unknown';
}

// Función auxiliar para obtener color de circuito
function getCircuitColor(elementType) {
    const category = getElementCategory(elementType);
    
    if (category === 'infraestructura') return TracerConfig.circuitColors.alimentacion;
    if (category === 'iluminacion') return TracerConfig.circuitColors.iluminacion;
    if (category === 'enchufes') return TracerConfig.circuitColors.enchufes;
    if (category === 'especiales') return TracerConfig.circuitColors.especial;
    if (category === 'tierra') return TracerConfig.circuitColors.tierra;
    
    return '#95a5a6'; // Gris por defecto
}

// Función auxiliar para obtener calibre
function getConductorSize(elementType) {
    const category = getElementCategory(elementType);
    
    if (category === 'infraestructura') return TracerConfig.conductorSize.alimentacion;
    if (category === 'iluminacion') return TracerConfig.conductorSize.iluminacion;
    if (category === 'enchufes') return TracerConfig.conductorSize.enchufes;
    if (category === 'especiales') return TracerConfig.conductorSize.especial;
    
    return TracerConfig.conductorSize.enchufes; // Por defecto
}

console.log('✅ Configuración de trazado cargada');
