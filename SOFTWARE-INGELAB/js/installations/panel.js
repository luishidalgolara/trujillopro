/**
 * PANEL DE INSTALACIONES
 * Gestiona la visualización del contenido educativo de instalaciones
 */

class InstallationsPanel {
    constructor() {
        this.isVisible = false;
        this.currentTab = 'electrica';
        this.panel = null;
        
        this.createPanel();
        this.setupEvents();
    }
    
    /**
     * Crea la estructura HTML del panel
     */
    createPanel() {
        // Crear contenedor principal
        this.panel = document.createElement('div');
        this.panel.id = 'installationsPanel';
        this.panel.className = 'installations-panel';
        
        this.panel.innerHTML = `
            <div class="installations-header">
                <h3>📋 Instalaciones del Edificio</h3>
                <button class="installations-close-btn" id="installationsCloseBtn">✕</button>
            </div>
            
            <div class="installations-tabs">
                <button class="installations-tab active" data-tab="electrica">
                    <span class="tab-icon">⚡</span>
                    <span class="tab-text">Eléctrica</span>
                </button>
                <button class="installations-tab" data-tab="agua">
                    <span class="tab-icon">💧</span>
                    <span class="tab-text">Agua Potable</span>
                </button>
                <button class="installations-tab" data-tab="sanitaria">
                    <span class="tab-icon">🚿</span>
                    <span class="tab-text">Sanitaria</span>
                </button>
                <button class="installations-tab" data-tab="climatizacion">
                    <span class="tab-icon">❄️</span>
                    <span class="tab-text">Climatización</span>
                </button>
                <button class="installations-tab" data-tab="gas">
                    <span class="tab-icon">🔥</span>
                    <span class="tab-text">Gas</span>
                </button>
                <button class="installations-tab" data-tab="seguridad">
                    <span class="tab-icon">🔔</span>
                    <span class="tab-text">Seguridad</span>
                </button>
            </div>
            
            <div class="installations-content" id="installationsContent">
                <!-- Contenido dinámico -->
            </div>
        `;
        
        document.body.appendChild(this.panel);
    }
    
    /**
     * Configura los event listeners
     */
    setupEvents() {
        // Botón cerrar
        const closeBtn = document.getElementById('installationsCloseBtn');
        closeBtn.addEventListener('click', () => {
            this.hide();
        });
        
        // Tabs
        const tabs = document.querySelectorAll('.installations-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    
    /**
     * Cambia de pestaña
     */
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Actualizar tabs activas
        const tabs = document.querySelectorAll('.installations-tab');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Actualizar contenido
        this.updateContent(tabName);
    }
    
    /**
     * Actualiza el contenido según la pestaña
     */
    updateContent(tabName) {
        const content = INSTALLATIONS_CONTENT[tabName];
        if (!content) return;
        
        const contentDiv = document.getElementById('installationsContent');
        
        contentDiv.innerHTML = `
            <div class="installation-info">
                <div class="installation-title">
                    <span class="title-icon">${content.icon}</span>
                    <h2>${content.name}</h2>
                </div>
                
                <div class="installation-intro">
                    <p>${content.intro}</p>
                </div>
                
                <div class="installation-section">
                    <h3>📦 Componentes</h3>
                    <div class="section-content">
                        ${content.components}
                    </div>
                </div>
                
                ${content.process ? `
                    <div class="installation-section">
                        <h3>🔧 Proceso de Instalación</h3>
                        <div class="section-content">
                            ${content.process}
                        </div>
                    </div>
                ` : ''}
                
                ${content.design ? `
                    <div class="installation-section">
                        <h3>📐 Diseño y Cálculo</h3>
                        <div class="section-content">
                            ${content.design}
                        </div>
                    </div>
                ` : ''}
                
                ${content.installation ? `
                    <div class="installation-section">
                        <h3>⚙️ Instalación</h3>
                        <div class="section-content">
                            ${content.installation}
                        </div>
                    </div>
                ` : ''}
                
                ${content.safety ? `
                    <div class="installation-section">
                        <h3>⚠️ Seguridad</h3>
                        <div class="section-content">
                            ${content.safety}
                        </div>
                    </div>
                ` : ''}
                
                ${content.maintenance ? `
                    <div class="installation-section">
                        <h3>🔧 Mantención</h3>
                        <div class="section-content">
                            ${content.maintenance}
                        </div>
                    </div>
                ` : ''}
                
                ${content.regulations ? `
                    <div class="installation-section">
                        <h3>📜 Normativa</h3>
                        <div class="section-content">
                            ${content.regulations}
                        </div>
                    </div>
                ` : ''}
                
                ${content.costs ? `
                    <div class="installation-section">
                        <h3>💰 Costos</h3>
                        <div class="section-content">
                            ${content.costs}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Scroll al inicio
        contentDiv.scrollTop = 0;
    }
    
    /**
     * Muestra el panel
     */
    show() {
        this.isVisible = true;
        this.panel.classList.add('visible');
        
        // Actualizar contenido de la pestaña actual
        this.updateContent(this.currentTab);
        
        console.log('📋 Panel de instalaciones abierto');
    }
    
    /**
     * Oculta el panel
     */
    hide() {
        this.isVisible = false;
        this.panel.classList.remove('visible');
        
        console.log('📋 Panel de instalaciones cerrado');
    }
    
    /**
     * Toggle del panel
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    /**
     * Verifica si está visible
     */
    getIsVisible() {
        return this.isVisible;
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstallationsPanel;
}
