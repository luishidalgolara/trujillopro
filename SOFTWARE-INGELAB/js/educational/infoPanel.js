/**
 * PANEL DE INFORMACIÓN EDUCATIVA
 * Gestiona la visualización del contenido educativo
 */

class EducationalInfoPanel {
    constructor() {
        this.panel = document.getElementById('infoPanel');
        this.nameElement = document.getElementById('componentName');
        this.contentElement = document.getElementById('infoContent');
        this.closeBtn = document.getElementById('closePanelBtn');
        this.currentComponent = null;
        this.isVisible = false;
        
        // Configurar eventos
        this.setupEvents();
    }
    
    /**
     * Configura los event listeners
     */
    setupEvents() {
        this.closeBtn.addEventListener('click', () => {
            this.hide();
        });
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    
    /**
     * Muestra el panel con información de un componente
     */
    show(contentData) {
        this.currentComponent = contentData;
        this.isVisible = true;
        
        // Actualizar contenido
        this.nameElement.innerHTML = `${contentData.icon} ${contentData.name}`;
        this.contentElement.innerHTML = this.generateContent(contentData);
        
        // Mostrar panel con animación
        this.panel.classList.add('visible');
        
        // Animar la entrada
        setTimeout(() => {
            this.panel.classList.add('animated');
        }, 10);
    }
    
    /**
     * Oculta el panel
     */
    hide() {
        this.panel.classList.remove('animated');
        
        setTimeout(() => {
            this.panel.classList.remove('visible');
            this.isVisible = false;
            this.currentComponent = null;
        }, 300);
    }
    
    /**
     * Genera el HTML del contenido educativo
     */
    generateContent(data) {
        return `
            <div class="educational-content">
                <!-- QUÉ ES -->
                <div class="content-section">
                    <h3 class="section-title">
                        <span class="section-icon">❓</span>
                        ¿Qué es?
                    </h3>
                    <div class="section-content">
                        <p>${data.what}</p>
                    </div>
                </div>
                
                <!-- CÓMO SE CONSTRUYE -->
                <div class="content-section">
                    <h3 class="section-title">
                        <span class="section-icon">🔨</span>
                        ¿Cómo se construye?
                    </h3>
                    <div class="section-content">
                        ${data.how}
                    </div>
                </div>
                
                <!-- PARA QUÉ SIRVE -->
                <div class="content-section">
                    <h3 class="section-title">
                        <span class="section-icon">⚡</span>
                        ¿Para qué sirve?
                    </h3>
                    <div class="section-content">
                        ${data.purpose}
                    </div>
                </div>
                
                <!-- NOTA INFORMATIVA -->
                <div class="info-note">
                    <span class="note-icon">💡</span>
                    <span>Haz clic en otros componentes para aprender más sobre la construcción</span>
                </div>
            </div>
        `;
    }
    
    /**
     * Alterna la visibilidad del panel
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else if (this.currentComponent) {
            this.show(this.currentComponent);
        }
    }
    
    /**
     * Verifica si el panel está visible
     */
    getIsVisible() {
        return this.isVisible;
    }
    
    /**
     * Obtiene el componente actual
     */
    getCurrentComponent() {
        return this.currentComponent;
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationalInfoPanel;
}
