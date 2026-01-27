const DrawingCore = {
    initialized: false,
    
    init() {
        if (this.initialized) return;
        
        const toolbar = DrawingUI.createToolbar();
        document.body.appendChild(toolbar);
        
        DrawingEvents.init();
        
        this.initialized = true;
        console.log('✅ Sistema de dibujo inicializado');
    },
    
    activate() {
        if (!this.initialized) {
            this.init();
        }
        
        DrawingState.activate();
        DrawingUI.show();
        console.log('🎨 Modo dibujo activado');
    },
    
    deactivate() {
        DrawingState.deactivate();
        DrawingUI.hide();
        DrawingRenderer.removeTempElement();
        console.log('🎨 Modo dibujo desactivado');
    },
    
    toggle() {
        if (DrawingState.isActive) {
            this.deactivate();
        } else {
            this.activate();
        }
    },
    
    exportDrawings() {
        return DrawingState.drawnElements;
    },
    
    importDrawings(elements) {
        elements.forEach(element => {
            const svgElement = DrawingRenderer.createElement(element, false);
            DrawingRenderer.addToSVG(svgElement);
        });
        DrawingState.drawnElements.push(...elements);
    }
};

window.DrawingCore = DrawingCore;