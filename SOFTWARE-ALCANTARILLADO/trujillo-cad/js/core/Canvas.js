/**
 * Canvas.js - Gestor principal del canvas CAD
 * Maneja el canvas, eventos, grid, y coordina las herramientas
 */

class CADCanvas {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.currentTool = null;
        this.coordinateSystem = new CoordinateSystem();
        
        // Estado de pan
        this.isPanning = false;
        this.lastPanPoint = null;
        
        // Inicializar Paper.js
        this.initPaper();
        
        // Crear grid
        this.createGrid();
        
        // Configurar eventos
        this.setupEvents();
    }

    /**
     * Inicializa Paper.js
     */
    initPaper() {
        paper.setup(this.canvas);
        
        // Configurar view de Paper.js
        paper.view.onResize = () => {
            this.coordinateSystem.updateCenter();
            this.redrawGrid();
        };
    }

    /**
     * Crea el grid de fondo
     */
    createGrid() {
        this.gridGroup = new paper.Group();
        this.redrawGrid();
    }

    /**
     * Redibuja el grid según el zoom actual
     */
    redrawGrid() {
        // Limpiar grid anterior
        if (this.gridGroup) {
            this.gridGroup.removeChildren();
        }

        const viewSize = paper.view.size;
        const scale = this.coordinateSystem.scale;
        
        // Espaciado dinámico según el zoom
        let spacing = 50;
        if (scale < 0.5) spacing = 100;
        if (scale < 0.2) spacing = 200;
        if (scale > 2) spacing = 25;
        if (scale > 5) spacing = 10;

        const gridColor = 'rgba(255, 255, 255, 0.08)';
        const originColor = 'rgba(0, 168, 255, 0.3)';

        // Líneas verticales
        for (let x = 0; x < viewSize.width; x += spacing) {
            const isOrigin = Math.abs(x - viewSize.width / 2) < 1;
            const color = isOrigin ? originColor : gridColor;
            
            const line = new paper.Path.Line({
                from: [x, 0],
                to: [x, viewSize.height],
                strokeColor: color,
                strokeWidth: isOrigin ? 1.5 : 0.5
            });
            this.gridGroup.addChild(line);
        }

        // Líneas horizontales
        for (let y = 0; y < viewSize.height; y += spacing) {
            const isOrigin = Math.abs(y - viewSize.height / 2) < 1;
            const color = isOrigin ? originColor : gridColor;
            
            const line = new paper.Path.Line({
                from: [0, y],
                to: [viewSize.width, y],
                strokeColor: color,
                strokeWidth: isOrigin ? 1.5 : 0.5
            });
            this.gridGroup.addChild(line);
        }

        // Enviar grid al fondo
        this.gridGroup.sendToBack();
    }

    /**
     * Configura los eventos del canvas
     */
    setupEvents() {
        const tool = new paper.Tool();

        // Mouse down
        tool.onMouseDown = (event) => {
            // Click medio o Shift+Click para pan
            if (event.event.button === 1 || event.event.shiftKey) {
                this.isPanning = true;
                this.lastPanPoint = event.point;
                this.canvas.style.cursor = 'grab';
                return;
            }

            // Delegar a la herramienta actual
            if (this.currentTool && this.currentTool.isActive) {
                this.currentTool.onMouseDown(event);
            }
        };

        // Mouse move
        tool.onMouseMove = (event) => {
            // Actualizar coordenadas
            this.updateCoordinates(event.point);

            // Pan
            if (this.isPanning && this.lastPanPoint) {
                const delta = event.point.subtract(this.lastPanPoint);
                this.coordinateSystem.pan(delta.x, delta.y);
                paper.view.translate(delta);
                this.lastPanPoint = event.point;
                this.redrawGrid();
                return;
            }

            // Delegar a la herramienta actual
            if (this.currentTool && this.currentTool.isActive) {
                this.currentTool.onMouseMove(event);
            }
        };

        // Mouse up
        tool.onMouseUp = (event) => {
            if (this.isPanning) {
                this.isPanning = false;
                this.lastPanPoint = null;
                this.canvas.style.cursor = 'crosshair';
                return;
            }

            // Delegar a la herramienta actual
            if (this.currentTool && this.currentTool.isActive) {
                this.currentTool.onMouseUp(event);
            }
        };

        // Mouse drag
        tool.onMouseDrag = (event) => {
            if (this.isPanning && this.lastPanPoint) {
                const delta = event.point.subtract(this.lastPanPoint);
                this.coordinateSystem.pan(delta.x, delta.y);
                paper.view.translate(delta);
                this.lastPanPoint = event.point;
                this.redrawGrid();
            }
        };

        // Rueda del mouse para zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY;
            const point = paper.view.viewToProject(new paper.Point(e.offsetX, e.offsetY));
            
            this.zoom(delta, point);
        });

        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            if (this.currentTool && this.currentTool.isActive) {
                this.currentTool.onKeyDown(e);
            }
        });
    }

    /**
     * Actualiza las coordenadas mostradas
     */
    updateCoordinates(screenPoint) {
        const worldPoint = this.coordinateSystem.screenToWorld(screenPoint);
        
        const coordX = document.getElementById('coord-x');
        const coordY = document.getElementById('coord-y');
        
        if (coordX) coordX.textContent = worldPoint.x.toFixed(2);
        if (coordY) coordY.textContent = worldPoint.y.toFixed(2);
    }

    /**
     * Aplica zoom
     */
    zoom(delta, center) {
        const factor = delta > 0 ? 0.9 : 1.1;
        paper.view.scale(factor, center);
        this.coordinateSystem.zoom(delta, center);
        this.redrawGrid();
    }

    /**
     * Zoom in
     */
    zoomIn() {
        const center = paper.view.center;
        this.zoom(-1, center);
    }

    /**
     * Zoom out
     */
    zoomOut() {
        const center = paper.view.center;
        this.zoom(1, center);
    }

    /**
     * Zoom a todo el contenido
     */
    zoomExtents() {
        const bounds = paper.project.activeLayer.bounds;
        if (bounds && bounds.width > 0 && bounds.height > 0) {
            paper.view.center = bounds.center;
            const scale = Math.min(
                paper.view.size.width / bounds.width,
                paper.view.size.height / bounds.height
            ) * 0.8;
            paper.view.zoom = scale;
            this.coordinateSystem.zoomExtents(bounds);
            this.redrawGrid();
        }
    }

    /**
     * Establece la herramienta actual
     */
    setTool(tool) {
        // Desactivar herramienta anterior
        if (this.currentTool) {
            this.currentTool.deactivate();
        }

        // Activar nueva herramienta
        this.currentTool = tool;
        if (this.currentTool) {
            this.currentTool.activate(this);
        }
    }

    /**
     * Limpia el canvas
     */
    clear() {
        paper.project.activeLayer.removeChildren();
        this.createGrid();
    }

    /**
     * Redibuja el canvas
     */
    refresh() {
        paper.view.update();
    }
}
