/**
 * SISTEMA ORTHO - ESTADO GLOBAL
 * Sistema de restricción ortogonal a 90 grados para todas las herramientas
 */

window.OrthoSystem = window.OrthoSystem || {};

OrthoSystem.state = {
    // Estado principal
    enabled: false,
    
    // Configuración
    config: {
        snapAngle: 90,           // Ángulo de snap (90 grados)
        tolerance: 10,            // Tolerancia en píxeles para snap
        showGuides: true,         // Mostrar líneas guía
        showAngle: true,          // Mostrar ángulo actual
        guideColor: '#00ff00',    // Color de líneas guía
        guideWidth: 1,            // Grosor de líneas guía
        dashPattern: [5, 5]       // Patrón de línea punteada
    },
    
    // Estado temporal
    temp: {
        startPoint: null,         // Punto inicial de la línea
        currentPoint: null,       // Punto actual del cursor
        snappedPoint: null,       // Punto ajustado ortogonalmente
        angle: 0,                 // Ángulo actual
        distance: 0,              // Distancia actual
        direction: null           // Dirección: 'horizontal' o 'vertical'
    },
    
    // Direcciones ortogonales permitidas
    directions: {
        HORIZONTAL_RIGHT: 0,      // 0°
        VERTICAL_UP: 90,          // 90°
        HORIZONTAL_LEFT: 180,     // 180°
        VERTICAL_DOWN: 270        // 270°
    }
};

/**
 * Toggle estado ORTHO
 */
OrthoSystem.toggle = function() {
    this.state.enabled = !this.state.enabled;
    console.log(`[ORTHO] ${this.state.enabled ? 'ACTIVADO' : 'DESACTIVADO'}`);
    
    // Actualizar UI
    if (typeof OrthoSystem.updateUI === 'function') {
        OrthoSystem.updateUI();
    }
    
    // Limpiar estado temporal si se desactiva
    if (!this.state.enabled) {
        this.reset();
    }
    
    return this.state.enabled;
};

/**
 * Activar ORTHO
 */
OrthoSystem.enable = function() {
    if (!this.state.enabled) {
        this.toggle();
    }
};

/**
 * Desactivar ORTHO
 */
OrthoSystem.disable = function() {
    if (this.state.enabled) {
        this.toggle();
    }
};

/**
 * Verificar si ORTHO está activo
 */
OrthoSystem.isEnabled = function() {
    return this.state.enabled;
};

/**
 * Resetear estado temporal
 */
OrthoSystem.reset = function() {
    this.state.temp = {
        startPoint: null,
        currentPoint: null,
        snappedPoint: null,
        angle: 0,
        distance: 0,
        direction: null
    };
};

/**
 * Establecer punto inicial
 */
OrthoSystem.setStartPoint = function(x, y) {
    this.state.temp.startPoint = { x, y };
};

/**
 * Obtener estado actual
 */
OrthoSystem.getState = function() {
    return this.state;
};

console.log('[ORTHO] Sistema de estado inicializado');
