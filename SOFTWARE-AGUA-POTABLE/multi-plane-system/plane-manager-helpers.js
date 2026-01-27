/**
 * Funciones auxiliares del sistema multi-plano
 */
const PlaneManagerHelpers = {
    
    // Actualizar botón de modo
    updateModeButton() {
        const modeBtn = document.getElementById('modeToggle');
        const plane = PlaneState.getActivePlane();
        
        if (modeBtn && plane) {
            if (plane.mode === 'edit') {
                modeBtn.textContent = '🖱️ Modo: Edición';
                modeBtn.classList.remove('btn-primary');
                modeBtn.classList.add('btn-secondary');
            } else {
                modeBtn.textContent = '🧭 Modo: Navegación';
                modeBtn.classList.remove('btn-secondary');
                modeBtn.classList.add('btn-primary');
            }
        }
    },
    
    // Actualizar lista de elementos
    updateElementList(plane) {
        const elementList = document.getElementById('elementList');
        if (!elementList) return;
        
        if (!plane.elements || plane.elements.length === 0) {
            elementList.innerHTML = '<p class="empty-message">Haz clic en el plano para agregar elementos</p>';
            return;
        }
        
        elementList.innerHTML = plane.elements.map((el, index) => `
            <div class="element-item">
                <span class="element-icon">${this.getElementIcon(el.type)}</span>
                <span class="element-name">${this.getElementName(el.type)}</span>
            </div>
        `).join('');
    },
    
    // Obtener icono del elemento
    getElementIcon(type) {
        const icons = {
            'medidor-agua': '💧',
            'wc': '🚽',
            'lavatorio': '🚰',
            'ducha': '🚿',
            'bano-tina': '🛁',
            'bidet': '🪑',
            'lavaplatos': '🍽️',
            'lavadora': '🧺',
            'lavadero': '🧽',
            'calefon': '🔥',
            'termo-electrico': '⚡',
            'caldera': '🏠',
            'llave-jardin': '🌿',
            'valvula-corte': '🔴',
            'conexion-nivel-1': '🟢',
            'conexion-nivel-2': '🔵'
        };
        return icons[type] || '⚫';
    },
    
    // Obtener nombre del elemento
    getElementName(type) {
        const names = {
            'medidor-agua': 'Medidor',
            'wc': 'WC',
            'lavatorio': 'Lavatorio',
            'ducha': 'Ducha',
            'bano-tina': 'Tina',
            'bidet': 'Bidet',
            'lavaplatos': 'Lavaplatos',
            'lavadora': 'Lavadora',
            'lavadero': 'Lavadero',
            'calefon': 'Calefón',
            'termo-electrico': 'Termo',
            'caldera': 'Caldera',
            'llave-jardin': 'Llave Jardín',
            'valvula-corte': 'Válvula',
            'conexion-nivel-1': 'Conexión 1° Nivel',
            'conexion-nivel-2': 'Conexión 2° Nivel'
        };
        return names[type] || type;
    },
    
    // Resetear display de cálculos
    resetCalculationsDisplay() {
        try {
            const calculations = {
                'totalPipe': '0.00 m',
                'total20mm': '0.00 m',
                'total25mm': '0.00 m',
                'total32mm': '0.00 m',
                'total40mm': '0.00 m',
                'totalFria': '0.00 m',
                'totalCaliente': '0.00 m',
                'totalCost': '$0.00',
                'efficiency': '0%'
            };
            
            Object.keys(calculations).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = calculations[key];
                }
            });
        } catch (e) {
            console.warn('No se pudieron resetear cálculos:', e);
        }
    }
};

// Exportar para uso global
window.PlaneManagerHelpers = PlaneManagerHelpers;

console.log('✅ PlaneManagerHelpers cargado');