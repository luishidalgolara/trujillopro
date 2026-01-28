/**
 * SISTEMA ORTHO - UI
 * Interfaz de usuario: botón, indicadores, tooltips
 */

OrthoSystem.ui = {
    
    elements: {
        button: null,
        statusIndicator: null
    },
    
    /**
     * Inicializar UI del sistema ORTHO
     */
    init: function() {
        this.createButton();
        this.updateButton();
        this.setupKeyboardShortcut();
        console.log('[ORTHO] UI inicializada');
    },
    
    /**
     * Crear botón ORTHO en la toolbar
     */
    createButton: function() {
        // Buscar la sección de acciones en la toolbar
        const accionesSection = document.querySelector('.section-acciones');
        
        if (!accionesSection) {
            console.error('[ORTHO] No se encontró la sección de acciones');
            return;
        }
        
        // Crear botón ORTHO
        const button = document.createElement('button');
        button.id = 'btnOrtho';
        button.className = 'btn-tool btn-ortho';
        button.innerHTML = '🔲 ORTHO';
        button.title = 'Modo Ortogonal (F8): Restringir líneas a 90°';
        button.onclick = () => this.toggleOrtho();
        
        // Insertar antes del botón LIMPIAR
        const btnLimpiar = accionesSection.querySelector('.btn-danger');
        if (btnLimpiar) {
            accionesSection.insertBefore(button, btnLimpiar);
        } else {
            accionesSection.appendChild(button);
        }
        
        this.elements.button = button;
        
        console.log('[ORTHO] Botón creado en toolbar');
    },
    
    /**
     * Toggle ORTHO desde UI
     */
    toggleOrtho: function() {
        const enabled = OrthoSystem.toggle();
        this.updateButton();
        
        // Actualizar barra de estado
        this.updateStatusBar(enabled);
        
        // Feedback sonoro (opcional)
        // this.playSound(enabled);
    },
    
    /**
     * Actualizar apariencia del botón
     */
    updateButton: function() {
        const button = this.elements.button;
        if (!button) return;
        
        const enabled = OrthoSystem.isEnabled();
        
        if (enabled) {
            button.classList.add('active');
            button.style.background = '#27ae60';
            button.style.color = '#ffffff';
            button.style.boxShadow = '0 0 10px rgba(39, 174, 96, 0.6)';
            button.style.fontWeight = 'bold';
            button.innerHTML = '🔲 ORTHO ✓';
        } else {
            button.classList.remove('active');
            button.style.background = '#7f8c8d';
            button.style.color = '#ffffff';
            button.style.boxShadow = 'none';
            button.style.fontWeight = 'normal';
            button.innerHTML = '🔲 ORTHO';
        }
    },
    
    /**
     * Actualizar barra de estado
     */
    updateStatusBar: function(enabled) {
        const statusBar = document.getElementById('status');
        if (!statusBar) return;
        
        if (enabled) {
            statusBar.innerHTML = '✓ ORTHO ACTIVADO - Líneas restringidas a 90°';
            statusBar.style.background = '#27ae60';
            statusBar.style.color = '#ffffff';
        } else {
            statusBar.innerHTML = '✓ Listo para cubicar';
            statusBar.style.background = '';
            statusBar.style.color = '';
        }
    },
    
    /**
     * Setup atajo de teclado F8
     */
    setupKeyboardShortcut: function() {
        document.addEventListener('keydown', (e) => {
            // F8 para toggle ORTHO
            if (e.key === 'F8') {
                e.preventDefault();
                this.toggleOrtho();
                console.log('[ORTHO] Toggle desde F8');
            }
        });
        
        console.log('[ORTHO] Atajo F8 configurado');
    },
    
    /**
     * Mostrar tooltip temporal
     */
    showTooltip: function(message, duration = 2000) {
        // Crear tooltip flotante
        const tooltip = document.createElement('div');
        tooltip.className = 'ortho-tooltip';
        tooltip.innerHTML = message;
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut 2s;
        `;
        
        document.body.appendChild(tooltip);
        
        // Remover después de duration
        setTimeout(() => {
            tooltip.remove();
        }, duration);
    },
    
    /**
     * Mostrar indicador de dirección
     */
    showDirectionIndicator: function(direction) {
        const coordenadas = document.getElementById('coordenadas');
        if (!coordenadas) return;
        
        const symbols = {
            'HORIZONTAL_RIGHT': '→ HORIZONTAL',
            'VERTICAL_UP': '↑ VERTICAL',
            'HORIZONTAL_LEFT': '← HORIZONTAL',
            'VERTICAL_DOWN': '↓ VERTICAL'
        };
        
        coordenadas.innerHTML = symbols[direction] || '';
    },
    
    /**
     * Actualizar indicador de medición
     */
    updateMeasurement: function(distance, angle) {
        const coordenadas = document.getElementById('coordenadas');
        if (!coordenadas) return;
        
        coordenadas.innerHTML = `📏 ${distance.toFixed(2)}m | ${Math.round(angle)}°`;
    },
    
    /**
     * Limpiar indicadores
     */
    clearIndicators: function() {
        const coordenadas = document.getElementById('coordenadas');
        if (coordenadas) {
            coordenadas.innerHTML = '';
        }
    },
    
    /**
     * Efecto de pulsación en botón
     */
    pulseButton: function() {
        const button = this.elements.button;
        if (!button) return;
        
        button.style.animation = 'pulse 0.3s';
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }
};

// Función global para actualizar UI (llamada desde ortho-state.js)
OrthoSystem.updateUI = function() {
    if (OrthoSystem.ui && OrthoSystem.ui.updateButton) {
        OrthoSystem.ui.updateButton();
    }
};

console.log('[ORTHO] Sistema UI inicializado');
