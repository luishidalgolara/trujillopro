// ========================================
// SISTEMA DE ZOOM Y PAN ISOMÉTRICO
// ========================================

const IsometricZoom = {
    
    // Estado del zoom y pan
    scale: 1.0,
    minScale: 0.3,
    maxScale: 3.0,
    translateX: 0,
    translateY: 0,
    
    // Estado de arrastre
    isPanning: false,
    startX: 0,
    startY: 0,
    
    // Referencias
    svgElement: null,
    containerElement: null,
    mainGroup: null,
    
    /**
     * Inicializar sistema de zoom/pan
     */
    initialize(svg, container) {
        this.svgElement = svg;
        this.containerElement = container;
        this.mainGroup = svg.querySelector('#isometric-main');
        
        if (!this.mainGroup) {
            console.error('❌ No se encontró el grupo principal del isométrico');
            return false;
        }
        
        // Eventos de zoom con rueda del mouse
        container.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Eventos de pan (arrastrar)
        svg.addEventListener('mousedown', (e) => this.startPan(e));
        svg.addEventListener('mousemove', (e) => this.doPan(e));
        svg.addEventListener('mouseup', () => this.endPan());
        svg.addEventListener('mouseleave', () => this.endPan());
        
        // Prevenir menú contextual
        svg.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Agregar controles visuales
        this.addZoomControls();
        
        // Centrar vista inicial
        this.resetView();
        
        console.log('✅ Sistema de zoom/pan isométrico inicializado');
        return true;
    },
    
    /**
     * Manejar zoom con rueda del mouse
     */
    handleWheel(event) {
        event.preventDefault();
        
        // Calcular nuevo scale
        const delta = event.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * delta));
        
        // Calcular punto de zoom (cursor)
        const rect = this.containerElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Ajustar translate para zoom hacia el cursor
        const scaleDiff = newScale - this.scale;
        this.translateX -= (mouseX - rect.width / 2) * scaleDiff / this.scale;
        this.translateY -= (mouseY - rect.height / 2) * scaleDiff / this.scale;
        
        this.scale = newScale;
        this.applyTransform();
        this.updateZoomIndicator();
    },
    
    /**
     * Iniciar pan (arrastre)
     */
    startPan(event) {
        // Solo con botón izquierdo o central
        if (event.button !== 0 && event.button !== 1) return;
        
        this.isPanning = true;
        this.startX = event.clientX - this.translateX;
        this.startY = event.clientY - this.translateY;
        
        this.svgElement.style.cursor = 'grabbing';
        event.preventDefault();
    },
    
    /**
     * Realizar pan (arrastre)
     */
    doPan(event) {
        if (!this.isPanning) return;
        
        this.translateX = event.clientX - this.startX;
        this.translateY = event.clientY - this.startY;
        
        this.applyTransform();
    },
    
    /**
     * Finalizar pan
     */
    endPan() {
        this.isPanning = false;
        this.svgElement.style.cursor = 'grab';
    },
    
    /**
     * Aplicar transformación al grupo principal
     */
    applyTransform() {
        if (!this.mainGroup) return;
        
        const transform = `translate(${this.translateX}, ${this.translateY}) scale(${this.scale})`;
        this.mainGroup.setAttribute('transform', transform);
    },
    
    /**
     * Zoom In (acercar)
     */
    zoomIn() {
        const newScale = Math.min(this.maxScale, this.scale * 1.2);
        this.scale = newScale;
        this.applyTransform();
        this.updateZoomIndicator();
    },
    
    /**
     * Zoom Out (alejar)
     */
    zoomOut() {
        const newScale = Math.max(this.minScale, this.scale / 1.2);
        this.scale = newScale;
        this.applyTransform();
        this.updateZoomIndicator();
    },
    
    /**
     * Reset vista (centrar y escala 1:1)
     */
    resetView() {
        this.scale = 0.8; // Escala inicial más pequeña para ver todo
        this.translateX = 0;
        this.translateY = 0;
        this.applyTransform();
        this.updateZoomIndicator();
    },
    
    /**
     * Fit to view (ajustar para ver todo)
     */
    fitToView() {
        if (!this.mainGroup || !this.containerElement) return;
        
        try {
            const bbox = this.mainGroup.getBBox();
            const containerWidth = this.containerElement.clientWidth;
            const containerHeight = this.containerElement.clientHeight;
            
            // Calcular escala para que quepa todo
            const scaleX = containerWidth / (bbox.width + 100);
            const scaleY = containerHeight / (bbox.height + 100);
            const newScale = Math.min(scaleX, scaleY, this.maxScale);
            
            // Centrar
            this.scale = newScale;
            this.translateX = (containerWidth - bbox.width * newScale) / 2 - bbox.x * newScale;
            this.translateY = (containerHeight - bbox.height * newScale) / 2 - bbox.y * newScale;
            
            this.applyTransform();
            this.updateZoomIndicator();
        } catch (e) {
            console.warn('⚠️ No se pudo calcular bbox, usando reset estándar');
            this.resetView();
        }
    },
    
    /**
     * Agregar controles visuales de zoom
     */
    addZoomControls() {
        // Crear contenedor de controles
        const controls = document.createElement('div');
        controls.className = 'isometric-zoom-controls';
        controls.innerHTML = `
            <button class="zoom-btn" id="iso-zoom-in" title="Acercar">
                <span style="font-size: 20px; font-weight: bold;">+</span>
            </button>
            <div class="zoom-indicator" id="iso-zoom-level">100%</div>
            <button class="zoom-btn" id="iso-zoom-out" title="Alejar">
                <span style="font-size: 20px; font-weight: bold;">−</span>
            </button>
            <button class="zoom-btn" id="iso-zoom-reset" title="Restablecer vista">
                <span style="font-size: 16px;">⟲</span>
            </button>
            <button class="zoom-btn" id="iso-zoom-fit" title="Ajustar a pantalla">
                <span style="font-size: 14px;">⛶</span>
            </button>
        `;
        
        // Insertar en el contenedor
        this.containerElement.style.position = 'relative';
        this.containerElement.appendChild(controls);
        
        // Eventos de los botones
        document.getElementById('iso-zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('iso-zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('iso-zoom-reset').addEventListener('click', () => this.resetView());
        document.getElementById('iso-zoom-fit').addEventListener('click', () => this.fitToView());
        
        // Cursor grab en SVG
        this.svgElement.style.cursor = 'grab';
    },
    
    /**
     * Actualizar indicador de zoom
     */
    updateZoomIndicator() {
        const indicator = document.getElementById('iso-zoom-level');
        if (indicator) {
            const percentage = Math.round(this.scale * 100);
            indicator.textContent = `${percentage}%`;
        }
    },
    
    /**
     * Limpiar eventos
     */
    destroy() {
        if (this.containerElement) {
            const controls = this.containerElement.querySelector('.isometric-zoom-controls');
            if (controls) {
                controls.remove();
            }
        }
        this.svgElement = null;
        this.containerElement = null;
        this.mainGroup = null;
    }
};

console.log('✅ Sistema de zoom/pan isométrico cargado');