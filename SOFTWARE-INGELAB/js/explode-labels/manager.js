// ============================================================================
// MANAGER DE ETIQUETAS EXPLOSIVAS - CORREGIDO (SIN PARPADEO)
// ============================================================================
// Archivo: js/explode-labels/manager.js
// Descripción: Orquesta el sistema de etiquetas en vista explosiva
// ============================================================================

class ExplodeLabelsManager {
    
    constructor() {
        this.renderer = new ExplodeLabelsRenderer();
        this.isActive = false;
        this.updateInterval = null;
        this.initialized = false;
        this.labelsCreated = false; // ✨ NUEVO: Flag para saber si ya se crearon
    }
    
    // ========================================================================
    // INICIALIZAR
    // ========================================================================
    init() {
        if (this.initialized) return;
        
        this.renderer.init();
        this.initialized = true;
        
        console.log('✅ Manager de etiquetas explosivas inicializado');
    }
    
    // ========================================================================
    // ACTIVAR ETIQUETAS (cuando se activa vista explosiva)
    // ========================================================================
    activate() {
        if (!this.initialized) this.init();
        
        this.isActive = true;
        
        // Esperar a que la animación de explosión termine (1 segundo)
        setTimeout(() => {
            if (!this.isActive) return;
            
            // ✨ CREAR ETIQUETAS SOLO UNA VEZ
            this.renderer.render(componentsMap);
            this.renderer.show();
            this.labelsCreated = true;
            
            // ✨ ACTUALIZAR POSICIONES (sin recrear todo)
            this._startUpdating();
            
            console.log('🏷️ Etiquetas explosivas activadas');
        }, 1100); // Ligeramente después de que termine la animación de explosión
    }
    
    // ========================================================================
    // DESACTIVAR ETIQUETAS (cuando se desactiva vista explosiva)
    // ========================================================================
    deactivate() {
        this.isActive = false;
        this.labelsCreated = false; // ✨ Reset flag
        this.renderer.hide();
        
        // Detener actualización
        this._stopUpdating();
        
        // Limpiar después de la animación de salida
        setTimeout(() => {
            this.renderer.clear();
        }, 400);
        
        console.log('🏷️ Etiquetas explosivas desactivadas');
    }
    
    // ========================================================================
    // TOGGLE (para usar desde toggleExplode)
    // ========================================================================
    toggle(isExploded) {
        if (isExploded) {
            this.activate();
        } else {
            this.deactivate();
        }
    }
    
    // ========================================================================
    // ACTUALIZACIÓN CONTINUA DE POSICIONES - ✨ CORREGIDO (SIN PARPADEO)
    // ========================================================================
    _startUpdating() {
        // ✨ SOLUCIÓN: Actualizar solo cada cierto tiempo en lugar de cada frame
        this._stopUpdating();
        
        const update = () => {
            if (!this.isActive) return;
            
            // ✨ SOLO actualizar posiciones si ya se crearon las etiquetas
            if (this.labelsCreated) {
                this.renderer.updatePositions(componentsMap);
            }
            
            // ✨ Actualizar cada 100ms en lugar de cada frame (reduce parpadeo)
            this.updateInterval = setTimeout(update, 100);
        };
        
        // Iniciar actualización
        this.updateInterval = setTimeout(update, 100);
    }
    
    _stopUpdating() {
        if (this.updateInterval) {
            clearTimeout(this.updateInterval);
            this.updateInterval = null;
        }
    }
    
    // ========================================================================
    // DESTRUIR
    // ========================================================================
    destroy() {
        this._stopUpdating();
        this.renderer.destroy();
        this.isActive = false;
        this.initialized = false;
        this.labelsCreated = false;
    }
}

// ============================================================================
// INSTANCIA GLOBAL
// ============================================================================

const explodeLabelsManager = new ExplodeLabelsManager();
window.explodeLabelsManager = explodeLabelsManager;

console.log('✅ Manager de etiquetas explosivas cargado (VERSIÓN SIN PARPADEO)');
console.log('🏷️ Se activa automáticamente con la vista explosiva');