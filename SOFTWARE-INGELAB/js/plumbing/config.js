// ============================================================================
// CONFIGURACIÓN DE TUBERÍAS DE ALCANTARILLADO
// ============================================================================

const PLUMBING_CONFIG = {
    // Diámetros de tuberías en metros (REALISTAS - más delgadas)
    diameters: {
        '2"': 0.050,    // 50mm - desagües lavamanos
        '3"': 0.075,    // 75mm - desagües generales
        '4"': 0.110,    // 110mm - bajadas y WC (estándar PVC)
        '6"': 0.160,    // 160mm - colector principal
        'vent': 0.050   // 50mm - ventilación
    },
    
    // Colores PROFESIONALES (PVC gris claro realista)
    colors: {
        '2"': 0xC8C8C8,      // Gris claro PVC
        '3"': 0xC0C0C0,      // Gris claro PVC
        '4"': 0xB8B8B8,      // Gris medio PVC
        '6"': 0xB0B0B0,      // Gris medio PVC
        'box': 0x606060,     // Gris oscuro cemento
        'vent': 0xD0D0D0     // Gris muy claro ventilación
    },
    
    // Pendientes mínimas (en porcentaje)
    slopes: {
        horizontal: 0.02,    // 2% pendiente mínima
        vertical: 90         // 90° para bajadas verticales
    },
    
    // Dimensiones de cajas de registro (ancho, alto, profundidad en metros)
    boxes: {
        small: { width: 0.20, height: 0.20, depth: 0.30 },   // 20x20x30cm
        medium: { width: 0.30, height: 0.30, depth: 0.40 },  // 30x30x40cm
        large: { width: 0.40, height: 0.40, depth: 0.60 }    // 40x40x60cm
    },
    
    // Ubicaciones típicas por nivel (relativas)
    locations: {
        // Baño (típicamente en esquina)
        bathroom: { 
            x: 2.5, 
            z: 2.5,
            // Posiciones específicas de artefactos
            toilet: { x: 2.3, z: 2.7 },
            sink: { x: 2.7, z: 2.5 },
            shower: { x: 2.5, z: 2.2 }
        },
        // Cocina (al lado opuesto)
        kitchen: { 
            x: -2.5, 
            z: 2.5,
            sink: { x: -2.5, z: 2.6 }
        },
        // Colector principal (centro)
        mainCollector: { x: 0, z: 0 }
    },
    
    // Alturas relativas
    heights: {
        underSlab: -0.10,        // 10cm bajo losa
        drainHeight: -0.05,      // 5cm para desagües horizontales
        boxTop: -0.15,           // Tapa de caja 15cm bajo losa
        collectorDepth: -0.60    // Profundidad colector
    }
};