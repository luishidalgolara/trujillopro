/**
 * GESTOR DEL SISTEMA DE INSTALACIONES
 * Coordina el panel y la interacción con el botón
 */

class InstallationsManager {
    constructor() {
        this.panel = null;
        this.button = null;
        this.initialized = false;
        
        this.init();
    }
    
    /**
     * Inicializa el sistema
     */
    init() {
        try {
            // Verificar que el contenido esté disponible
            if (typeof INSTALLATIONS_CONTENT === 'undefined') {
                console.error('❌ INSTALLATIONS_CONTENT no está definido');
                return;
            }
            
            // Crear panel
            this.panel = new InstallationsPanel();
            
            // Configurar botón
            this.setupButton();
            
            this.initialized = true;
            console.log('✅ Sistema de instalaciones inicializado');
            
        } catch (error) {
            console.error('❌ Error al inicializar sistema de instalaciones:', error);
        }
    }
    
    /**
     * Configura el botón de instalaciones
     */
    setupButton() {
        // Buscar el botón en el DOM
        this.button = document.getElementById('installationsBtn');
        
        if (!this.button) {
            console.warn('⚠️ Botón de instalaciones no encontrado. Creando botón...');
            this.createButton();
            return;
        }
        
        // Agregar event listener
        this.button.addEventListener('click', () => {
            this.toggle();
        });
        
        console.log('✅ Botón de instalaciones configurado');
    }
    
    /**
     * Crea el botón si no existe en el HTML
     */
    createButton() {
        const viewOptions = document.querySelector('.view-options');
        
        if (!viewOptions) {
            console.error('❌ No se encontró contenedor .view-options');
            return;
        }
        
        // Crear botón
        this.button = document.createElement('button');
        this.button.className = 'option-btn';
        this.button.id = 'installationsBtn';
        this.button.innerHTML = '<span>📋</span> Instalaciones';
        
        // Agregar al DOM (después del botón de tuberías)
        const plumbingBtn = document.getElementById('plumbingBtn');
        if (plumbingBtn) {
            plumbingBtn.after(this.button);
        } else {
            viewOptions.appendChild(this.button);
        }
        
        // Event listener
        this.button.addEventListener('click', () => {
            this.toggle();
        });
        
        console.log('✅ Botón de instalaciones creado dinámicamente');
    }
    
    /**
     * Toggle del panel
     */
    toggle() {
        if (!this.panel) {
            console.error('❌ Panel no inicializado');
            return;
        }
        
        this.panel.toggle();
        
        // Actualizar estado visual del botón
        if (this.panel.getIsVisible()) {
            this.button.classList.add('active');
        } else {
            this.button.classList.remove('active');
        }
    }
    
    /**
     * Muestra el panel
     */
    show() {
        if (this.panel) {
            this.panel.show();
            if (this.button) {
                this.button.classList.add('active');
            }
        }
    }
    
    /**
     * Oculta el panel
     */
    hide() {
        if (this.panel) {
            this.panel.hide();
            if (this.button) {
                this.button.classList.remove('active');
            }
        }
    }
    
    /**
     * Abre una pestaña específica
     */
    openTab(tabName) {
        if (this.panel) {
            this.panel.switchTab(tabName);
            this.show();
        }
    }
    
    /**
     * Verifica si está inicializado
     */
    isInitialized() {
        return this.initialized;
    }
    
    /**
     * Verifica si está visible
     */
    isVisible() {
        return this.panel ? this.panel.getIsVisible() : false;
    }
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.InstallationsManager = InstallationsManager;
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstallationsManager;
}
