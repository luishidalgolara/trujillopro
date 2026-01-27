// ============================================================
// RESIZE INDICATOR - Indicador sutil de porcentaje al redimensionar
// ============================================================

const ResizeIndicator = {
    // Elementos
    indicator: null,
    hideTimeout: null,
    
    // Estado
    isVisible: false,
    currentScale: 100,
    
    /**
     * Inicializar el indicador
     */
    initialize() {
        console.log('📏 Inicializando Resize Indicator...');
        
        // Crear elemento del indicador
        this.indicator = document.createElement('div');
        this.indicator.id = 'resize-indicator';
        this.indicator.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(52, 152, 219, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.2s, transform 0.2s;
            display: none;
        `;
        
        document.body.appendChild(this.indicator);
        
        console.log('✅ Resize Indicator inicializado');
    },
    
    /**
     * Mostrar indicador con porcentaje
     */
    show(percentage) {
        if (!this.indicator) this.initialize();
        
        // Limpiar timeout anterior
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        
        // Actualizar porcentaje
        this.currentScale = Math.round(percentage);
        this.indicator.innerHTML = `🔍 ${this.currentScale}%`;
        
        // Mostrar con animación
        this.indicator.style.display = 'block';
        
        // Forzar reflow para que la transición funcione
        this.indicator.offsetHeight;
        
        this.indicator.style.opacity = '1';
        this.indicator.style.transform = 'scale(1)';
        this.isVisible = true;
    },
    
    /**
     * Actualizar porcentaje (sin animación de entrada)
     */
    update(percentage) {
        if (!this.indicator) return;
        
        this.currentScale = Math.round(percentage);
        this.indicator.innerHTML = `🔍 ${this.currentScale}%`;
    },
    
    /**
     * Ocultar indicador (con delay)
     */
    hide(delay = 2000) {
        if (!this.indicator) return;
        
        // Limpiar timeout anterior
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        
        // Programar ocultamiento
        this.hideTimeout = setTimeout(() => {
            this.indicator.style.opacity = '0';
            this.indicator.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                this.indicator.style.display = 'none';
                this.isVisible = false;
            }, 200);
        }, delay);
    },
    
    /**
     * Ocultar inmediatamente
     */
    hideNow() {
        if (!this.indicator) return;
        
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        
        this.indicator.style.opacity = '0';
        this.indicator.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.indicator.style.display = 'none';
            this.isVisible = false;
        }, 200);
    }
};

// ============================================================
// INTEGRACIÓN AUTOMÁTICA CON SISTEMAS EXISTENTES
// ============================================================

/**
 * Interceptar eventos de resize en elementos arrastrables
 */
function setupResizeMonitoring() {
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    // Observer para detectar cambios en width/height de grupos SVG
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                const element = mutation.target;
                
                // Detectar si es un resize de elementos integrables
                if (element.tagName === 'g' && 
                    (element.id.includes('cuadro-cargas') ||
                     element.id.includes('simbologia') ||
                     element.id.includes('unifilar') ||
                     element.id.includes('tablero') ||
                     element.id.includes('isometrico'))) {
                    
                    // Extraer escala del transform
                    const transform = element.getAttribute('transform');
                    if (transform && transform.includes('scale')) {
                        const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
                        if (scaleMatch) {
                            const scale = parseFloat(scaleMatch[1]);
                            const percentage = scale * 100;
                            
                            if (ResizeIndicator.isVisible) {
                                ResizeIndicator.update(percentage);
                            }
                        }
                    }
                }
            }
        });
    });
    
    observer.observe(svg, {
        attributes: true,
        attributeFilter: ['transform', 'width', 'height'],
        subtree: true
    });
    
    console.log('👁️ Resize monitoring activo');
}

// ============================================================
// FUNCIONES AUXILIARES PARA INTEGRACIÓN MANUAL
// ============================================================

/**
 * Llamar al iniciar resize
 */
window.showResizeIndicator = function(initialPercentage) {
    if (!ResizeIndicator.indicator) {
        ResizeIndicator.initialize();
    }
    ResizeIndicator.show(initialPercentage || 100);
};

/**
 * Llamar durante el resize
 */
window.updateResizeIndicator = function(percentage) {
    ResizeIndicator.update(percentage);
};

/**
 * Llamar al terminar resize
 */
window.hideResizeIndicator = function(delay) {
    ResizeIndicator.hide(delay);
};

// ============================================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================================

window.addEventListener('load', function() {
    console.log('🔄 Activando Resize Indicator...');
    
    setTimeout(() => {
        ResizeIndicator.initialize();
        setupResizeMonitoring();
    }, 500);
});

// Exportar globalmente
window.ResizeIndicator = ResizeIndicator;

console.log('✅ Resize Indicator cargado');
console.log('📏 Uso:');
console.log('  • showResizeIndicator(100) - Mostrar');
console.log('  • updateResizeIndicator(85) - Actualizar');
console.log('  • hideResizeIndicator() - Ocultar');