// ============================================================================
// CONFIGURACIÓN DE VENTANAS Y PUERTAS
// ============================================================================
// Archivo: js/openings/config.js
// Descripción: Configuración de posiciones, dimensiones y estilos de aberturas
// ============================================================================

const OPENINGS_CONFIG = {
    
    // ========================================================================
    // DIMENSIONES DE VENTANAS
    // ========================================================================
    window: {
        width: 1.2,          // Ancho de ventana estándar
        height: 1.2,         // Alto de ventana estándar
        frameWidth: 0.06,    // Ancho del marco
        frameDepth: 0.18,    // Profundidad del marco (sobresale del muro)
        glassDepth: 0.02,    // Grosor del vidrio
        sillHeight: 0.08,    // Alto del alféizar (repisa inferior)
        sillDepth: 0.22,     // Profundidad del alféizar (sobresale más)
        dividerWidth: 0.03,  // Ancho de los divisores del vidrio
        bottomOffset: 1.0,   // Altura desde el piso del nivel hasta la base de la ventana
    },
    
    // ========================================================================
    // DIMENSIONES DE PUERTAS
    // ========================================================================
    door: {
        width: 1.0,          // Ancho de puerta estándar
        height: 2.2,         // Alto de puerta estándar
        frameWidth: 0.08,    // Ancho del marco
        frameDepth: 0.20,    // Profundidad del marco
        panelDepth: 0.05,    // Grosor de la hoja de puerta
        handleSize: 0.04,    // Tamaño de la manilla
        handleHeight: 1.0,   // Altura de la manilla desde la base
        topFrameHeight: 0.10, // Alto del dintel superior del marco
    },
    
    // ========================================================================
    // DISTRIBUCIÓN POR CARA DEL EDIFICIO
    // ========================================================================
    // Cada cara tiene su configuración de aberturas
    // wallId: 'front' | 'back' | 'left' | 'right'
    // type: 'window' | 'door'
    // position: offset horizontal desde el centro del muro
    // level: en qué niveles aparece (array o 'all')
    
    layouts: {
        // --- MURO FRONTAL (z = +3) ---
        front: [
            {
                type: 'door',
                position: 0,           // Centrada
                levels: [0],           // Solo planta baja
                id: 'puerta_principal'
            },
            {
                type: 'window',
                position: -1.8,        // Izquierda
                levels: [0],           // Planta baja
                id: 'ventana_front_izq_0'
            },
            {
                type: 'window',
                position: 1.8,         // Derecha
                levels: [0],           // Planta baja
                id: 'ventana_front_der_0'
            },
            {
                type: 'window',
                position: -1.8,        // Izquierda
                levels: [1, 2],        // Pisos superiores
                id: 'ventana_front_izq_sup'
            },
            {
                type: 'window',
                position: 0,           // Centro
                levels: [1, 2],        // Pisos superiores
                id: 'ventana_front_cen_sup'
            },
            {
                type: 'window',
                position: 1.8,         // Derecha
                levels: [1, 2],        // Pisos superiores
                id: 'ventana_front_der_sup'
            }
        ],
        
        // --- MURO TRASERO (z = -3) ---
        back: [
            {
                type: 'door',
                position: 0,
                levels: [0],
                id: 'puerta_trasera'
            },
            {
                type: 'window',
                position: -1.8,
                levels: [0],
                id: 'ventana_back_izq_0'
            },
            {
                type: 'window',
                position: 1.8,
                levels: [0],
                id: 'ventana_back_der_0'
            },
            {
                type: 'window',
                position: -1.8,
                levels: [1, 2],
                id: 'ventana_back_izq_sup'
            },
            {
                type: 'window',
                position: 0,
                levels: [1, 2],
                id: 'ventana_back_cen_sup'
            },
            {
                type: 'window',
                position: 1.8,
                levels: [1, 2],
                id: 'ventana_back_der_sup'
            }
        ],
        
        // --- MURO IZQUIERDO (x = -3) ---
        left: [
            {
                type: 'window',
                position: -1.5,
                levels: 'all',
                id: 'ventana_left_1'
            },
            {
                type: 'window',
                position: 1.5,
                levels: 'all',
                id: 'ventana_left_2'
            }
        ],
        
        // --- MURO DERECHO (x = +3) - Lado de escaleras ---
        right: [
            {
                type: 'window',
                position: -1.5,
                levels: 'all',
                id: 'ventana_right_1'
            },
            {
                type: 'window',
                position: 1.5,
                levels: 'all',
                id: 'ventana_right_2'
            }
        ]
    }
};

// Hacer disponible globalmente
window.OPENINGS_CONFIG = OPENINGS_CONFIG;

console.log('✅ Configuración de ventanas y puertas cargada');
