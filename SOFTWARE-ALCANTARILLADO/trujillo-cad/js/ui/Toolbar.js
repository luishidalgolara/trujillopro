/**
 * Toolbar.js - Gestor de la barra de herramientas
 * Maneja los botones y la interacción con las herramientas
 */

class Toolbar {
    constructor(canvas) {
        this.canvas = canvas;
        this.tools = new Map();
        this.activeButton = null;
        
        this.init();
    }

    /**
     * Inicializa la barra de herramientas
     */
    init() {
        // Registrar herramientas disponibles
        this.registerTool('line', new LineTool());

        // Configurar eventos de botones
        this.setupToolButtons();
        this.setupZoomButtons();

        // Activar herramienta por defecto
        this.activateTool('line');
    }

    /**
     * Registra una herramienta
     */
    registerTool(name, tool) {
        this.tools.set(name, tool);
    }

    /**
     * Configura los eventos de los botones de herramientas
     */
    setupToolButtons() {
        const toolButtons = document.querySelectorAll('[data-tool]');
        
        toolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const toolName = button.dataset.tool;
                this.activateTool(toolName);
            });
        });

        // Atajos de teclado
        document.addEventListener('keydown', (e) => {
            // Solo si no estamos escribiendo en un input
            if (e.target.tagName === 'INPUT') return;

            switch(e.key.toLowerCase()) {
                case 'l':
                    this.activateTool('line');
                    break;
                case 'escape':
                    // ESC se maneja en las herramientas individuales
                    break;
            }
        });
    }

    /**
     * Configura los botones de zoom
     */
    setupZoomButtons() {
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const zoomFitBtn = document.getElementById('zoom-fit');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                this.canvas.zoomIn();
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                this.canvas.zoomOut();
            });
        }

        if (zoomFitBtn) {
            zoomFitBtn.addEventListener('click', () => {
                this.canvas.zoomExtents();
            });
        }

        // Atajos de teclado para zoom
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '+':
                    case '=':
                        e.preventDefault();
                        this.canvas.zoomIn();
                        break;
                    case '-':
                        e.preventDefault();
                        this.canvas.zoomOut();
                        break;
                    case '0':
                        e.preventDefault();
                        this.canvas.zoomExtents();
                        break;
                }
            }
        });
    }

    /**
     * Activa una herramienta por su nombre
     */
    activateTool(toolName) {
        const tool = this.tools.get(toolName);
        
        if (!tool) {
            console.warn(`Herramienta '${toolName}' no encontrada`);
            return;
        }

        // Actualizar estado visual de los botones
        this.updateActiveButton(toolName);

        // Activar la herramienta en el canvas
        this.canvas.setTool(tool);
    }

    /**
     * Actualiza el botón activo visualmente
     */
    updateActiveButton(toolName) {
        // Remover clase 'active' de todos los botones
        const allButtons = document.querySelectorAll('[data-tool]');
        allButtons.forEach(btn => btn.classList.remove('active'));

        // Agregar clase 'active' al botón seleccionado
        const button = document.querySelector(`[data-tool="${toolName}"]`);
        if (button) {
            button.classList.add('active');
            this.activeButton = button;
        }
    }

    /**
     * Obtiene la herramienta activa actual
     */
    getActiveTool() {
        return this.canvas.currentTool;
    }

    /**
     * Deshabilita una herramienta
     */
    disableTool(toolName) {
        const button = document.querySelector(`[data-tool="${toolName}"]`);
        if (button) {
            button.classList.add('disabled');
            button.disabled = true;
        }
    }

    /**
     * Habilita una herramienta
     */
    enableTool(toolName) {
        const button = document.querySelector(`[data-tool="${toolName}"]`);
        if (button) {
            button.classList.remove('disabled');
            button.disabled = false;
        }
    }
}
