/**
 * Funciones auxiliares del gestor de planos
 */
const PlaneManagerHelpersAlc = {
    
    updateModeButton() {
        const modeBtn = document.getElementById('modeToggle');
        if (modeBtn && window.appState) {
            if (window.appState.mode === 'tracing') {
                modeBtn.textContent = '🔗 Trazado';
                modeBtn.classList.add('active');
            } else {
                modeBtn.textContent = '🖱️ Edición';
                modeBtn.classList.remove('active');
            }
        }
    },
    
    updateElementList(plane) {
        // Actualizar contador si existe
        const counter = document.getElementById('plansCounter');
        if (counter) {
            const totalElements = plane.elements ? plane.elements.length : 0;
            counter.textContent = `Elementos: ${totalElements}`;
        }
    },
    
    getElementIcon(type) {
        const icons = {
            'wc': '🚽',
            'lavatorio': '🚰',
            'ducha': '🚿',
            'bano-tina': '🛁',
            'bidet': '🪑',
            'urinario': '🚹',
            'lavaplatos': '🍽️',
            'lavacopas': '🍷',
            'lavadora': '🧺',
            'lavadero': '🧽',
            'camara-inspeccion': '⚫',
            'camara-publica': '🔴',
            'caja-registro': '▣',
            'punto-descarga': '💧'
        };
        return icons[type] || '📍';
    },
    
    getElementName(type) {
        const names = {
            'wc': 'WC',
            'lavatorio': 'Lavatorio',
            'ducha': 'Ducha',
            'bano-tina': 'Baño Tina',
            'bidet': 'Bidet',
            'urinario': 'Urinario',
            'lavaplatos': 'Lavaplatos',
            'lavacopas': 'Lavacopas',
            'lavadora': 'Lavadora',
            'lavadero': 'Lavadero',
            'camara-inspeccion': 'Cámara Inspección',
            'camara-publica': 'Cámara Pública',
            'caja-registro': 'Caja Registro',
            'punto-descarga': 'Punto Descarga'
        };
        return names[type] || 'Elemento';
    },
    
    resetCalculationsDisplay() {
        // Resetear displays de cálculos si existen
    }
};

window.PlaneManagerHelpersAlc = PlaneManagerHelpersAlc;

console.log('✅ PlaneManagerHelpersAlc cargado');