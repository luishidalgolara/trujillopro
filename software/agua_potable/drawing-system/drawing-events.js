const DrawingEvents = {
    svg: null,
    lastClickTime: 0,
    doubleClickDelay: 300,
    
    init() {
        this.svg = document.getElementById('plano');
        if (!this.svg) return;
        
        this.svg.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.svg.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.svg.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        document.addEventListener('mousemove', (e) => this.handleDocumentMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleDocumentMouseUp(e));
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        console.log('✅ DrawingEvents inicializado');
    },
    
    getMousePosition(e) {
        const svg = this.svg;
        const CTM = svg.getScreenCTM();
        return {
            x: (e.clientX - CTM.e) / CTM.a,
            y: (e.clientY - CTM.f) / CTM.d
        };
    },
    
    handleMouseDown(e) {
        if (!DrawingState.isActive || !DrawingState.currentTool) return;
        
        console.log('🖱️ Click detectado, herramienta:', DrawingState.currentTool);
        
        let point = this.getMousePosition(e);
        const tool = DrawingTools[DrawingState.currentTool];
        
        const currentTime = Date.now();
        const isDoubleClick = (currentTime - this.lastClickTime) < this.doubleClickDelay;
        this.lastClickTime = currentTime;
        
        if (DrawingState.currentTool === 'text') {
            console.log('📝 Activando herramienta de texto');
            e.preventDefault();
            e.stopPropagation();
            tool.start(point, e);
            return;
        }
        
        if (DrawingState.currentTool === 'polyline') {
            if (isDoubleClick && DrawingState.polylinePoints.length >= 2) {
                const element = tool.end(true);
                if (element) {
                    const svgElement = DrawingRenderer.createElement(element, false);
                    DrawingRenderer.addToSVG(svgElement);
                    DrawingState.drawnElements.push(element);
                    DrawingRenderer.removeTempElement();
                }
            } else {
                if (DrawingState.polylinePoints.length > 0 && DrawingOrtho.enabled) {
                    const lastPoint = DrawingState.polylinePoints[DrawingState.polylinePoints.length - 1];
                    point = DrawingOrtho.snapToOrtho(lastPoint, point);
                }
                tool.start(point);
            }
        } else {
            tool.start(point);
        }
    },
    
    handleMouseMove(e) {
        if (DrawingText.draggedElement) {
            DrawingText.handleDragMove(e);
            return;
        }
        
        if (!DrawingState.isActive || !DrawingState.currentTool) return;
        if (DrawingState.currentTool === 'text') return;
        
        let point = this.getMousePosition(e);
        const tool = DrawingTools[DrawingState.currentTool];
        
        if (DrawingState.currentTool === 'line' && DrawingState.startPoint && DrawingOrtho.enabled) {
            point = DrawingOrtho.snapToOrtho(DrawingState.startPoint, point);
        } else if (DrawingState.currentTool === 'polyline' && DrawingState.polylinePoints.length > 0 && DrawingOrtho.enabled) {
            const lastPoint = DrawingState.polylinePoints[DrawingState.polylinePoints.length - 1];
            point = DrawingOrtho.snapToOrtho(lastPoint, point);
        }
        
        const tempData = tool.move(point);
        
        if (tempData) {
            DrawingRenderer.removeTempElement();
            const tempElement = DrawingRenderer.createElement(tempData, true);
            DrawingRenderer.addToSVG(tempElement);
        }
    },
    
    handleMouseUp(e) {
        if (DrawingText.draggedElement) {
            DrawingText.handleDragEnd();
            return;
        }
        
        if (!DrawingState.isActive || !DrawingState.currentTool) return;
        if (DrawingState.currentTool === 'polyline' || DrawingState.currentTool === 'text') return;
        
        let point = this.getMousePosition(e);
        const tool = DrawingTools[DrawingState.currentTool];
        
        if (DrawingState.currentTool === 'line' && DrawingState.startPoint && DrawingOrtho.enabled) {
            point = DrawingOrtho.snapToOrtho(DrawingState.startPoint, point);
        }
        
        const element = tool.end(point);
        
        if (element) {
            DrawingRenderer.removeTempElement();
            const svgElement = DrawingRenderer.createElement(element, false);
            DrawingRenderer.addToSVG(svgElement);
            DrawingState.drawnElements.push(element);
        }
    },
    
    handleDocumentMouseMove(e) {
        if (DrawingText.draggedElement) {
            DrawingText.handleDragMove(e);
        }
    },
    
    handleDocumentMouseUp(e) {
        if (DrawingText.draggedElement) {
            DrawingText.handleDragEnd();
        }
    },
    
    handleKeyDown(e) {
        if (DrawingText.currentInput) {
            return;
        }
        
        if (e.key === 'Escape' && DrawingState.currentTool === 'polyline') {
            DrawingState.reset();
            DrawingRenderer.removeTempElement();
        }
        
        if (e.key === 'F8' || (e.key === 'o' && e.ctrlKey)) {
            e.preventDefault();
            DrawingOrtho.toggle();
        }
    }
};

window.DrawingEvents = DrawingEvents;