// ============================================
// HERRAMIENTAS DE DIBUJO
// ============================================

class DrawingTools {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentTool = 'line';
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.polylinePoints = [];
        this.drawings = [];
        this.tempDrawing = null;
        this.strokeWidth = 2;
        
        this.init();
    }

    init() {
        // Configurar tamaño del canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Event listeners para herramientas
        const toolButtons = document.querySelectorAll('.tool-btn');
        toolButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectTool(e.currentTarget);
            });
        });

        // Event listeners del canvas
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));

        // Event listener para cambio de color
        document.addEventListener('colorChanged', (e) => {
            this.redrawAll();
        });

        // Event listener para grosor de línea
        const strokeWidthInput = document.getElementById('strokeWidth');
        const strokeValue = document.getElementById('strokeValue');
        if (strokeWidthInput) {
            strokeWidthInput.addEventListener('input', (e) => {
                this.strokeWidth = parseInt(e.target.value);
                strokeValue.textContent = this.strokeWidth;
            });
        }

        // Event listeners para acciones
        const clearBtn = document.getElementById('clearCanvas');
        const undoBtn = document.getElementById('undoBtn');
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCanvas());
        }
        if (undoBtn) {
            undoBtn.addEventListener('click', () => this.undo());
        }
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.redrawAll();
    }

    selectTool(button) {
        // Remover clase active de todos los botones
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Agregar clase active al botón seleccionado
        button.classList.add('active');

        // Establecer herramienta actual
        this.currentTool = button.dataset.tool;

        // Resetear polilínea si se cambia de herramienta
        if (this.currentTool !== 'polyline') {
            this.polylinePoints = [];
        }
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleMouseDown(e) {
        const pos = this.getMousePos(e);

        if (this.currentTool === 'polyline') {
            // Para polilínea, agregar puntos
            this.polylinePoints.push({ x: pos.x, y: pos.y });
            if (this.polylinePoints.length > 1) {
                this.redrawAll();
                this.drawPolylinePreview();
            }
        } else {
            // Para otras herramientas
            this.isDrawing = true;
            this.startX = pos.x;
            this.startY = pos.y;
        }
    }

    handleMouseMove(e) {
        const pos = this.getMousePos(e);
        this.currentX = pos.x;
        this.currentY = pos.y;

        if (this.isDrawing) {
            this.redrawAll();
            this.drawPreview();
        }
    }

    handleMouseUp(e) {
        if (!this.isDrawing && this.currentTool !== 'polyline') return;

        if (this.currentTool !== 'polyline') {
            const pos = this.getMousePos(e);
            
            // Guardar el dibujo
            const drawing = {
                tool: this.currentTool,
                startX: this.startX,
                startY: this.startY,
                endX: pos.x,
                endY: pos.y,
                color: window.colorPalette.getCurrentColor(),
                strokeWidth: this.strokeWidth
            };

            this.drawings.push(drawing);
            this.isDrawing = false;
            this.redrawAll();
        }
    }

    handleDoubleClick(e) {
        if (this.currentTool === 'polyline' && this.polylinePoints.length > 1) {
            // Finalizar polilínea
            const drawing = {
                tool: 'polyline',
                points: [...this.polylinePoints],
                color: window.colorPalette.getCurrentColor(),
                strokeWidth: this.strokeWidth
            };

            this.drawings.push(drawing);
            this.polylinePoints = [];
            this.redrawAll();
        }
    }

    drawPreview() {
        this.ctx.strokeStyle = window.colorPalette.getCurrentColor();
        this.ctx.lineWidth = this.strokeWidth;

        switch (this.currentTool) {
            case 'line':
                this.drawLine(this.startX, this.startY, this.currentX, this.currentY);
                break;
            case 'circle':
                this.drawCircle(this.startX, this.startY, this.currentX, this.currentY);
                break;
            case 'square':
                this.drawSquare(this.startX, this.startY, this.currentX, this.currentY);
                break;
            case 'rectangle':
                this.drawRectangle(this.startX, this.startY, this.currentX, this.currentY);
                break;
        }
    }

    drawPolylinePreview() {
        this.ctx.strokeStyle = window.colorPalette.getCurrentColor();
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.beginPath();
        
        for (let i = 0; i < this.polylinePoints.length; i++) {
            const point = this.polylinePoints[i];
            if (i === 0) {
                this.ctx.moveTo(point.x, point.y);
            } else {
                this.ctx.lineTo(point.x, point.y);
            }
        }
        
        this.ctx.stroke();

        // Dibujar puntos
        this.polylinePoints.forEach(point => {
            this.ctx.fillStyle = window.colorPalette.getCurrentColor();
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawCircle(centerX, centerY, pointX, pointY) {
        const radius = Math.sqrt(
            Math.pow(pointX - centerX, 2) + Math.pow(pointY - centerY, 2)
        );
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawSquare(x1, y1, x2, y2) {
        const side = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        const signX = x2 > x1 ? 1 : -1;
        const signY = y2 > y1 ? 1 : -1;
        
        this.ctx.beginPath();
        this.ctx.rect(x1, y1, side * signX, side * signY);
        this.ctx.stroke();
    }

    drawRectangle(x1, y1, x2, y2) {
        const width = x2 - x1;
        const height = y2 - y1;
        
        this.ctx.beginPath();
        this.ctx.rect(x1, y1, width, height);
        this.ctx.stroke();
    }

    redrawAll() {
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Redibujar todos los dibujos guardados
        this.drawings.forEach(drawing => {
            this.ctx.strokeStyle = drawing.color;
            this.ctx.lineWidth = drawing.strokeWidth;

            if (drawing.tool === 'polyline') {
                this.ctx.beginPath();
                drawing.points.forEach((point, index) => {
                    if (index === 0) {
                        this.ctx.moveTo(point.x, point.y);
                    } else {
                        this.ctx.lineTo(point.x, point.y);
                    }
                });
                this.ctx.stroke();
            } else if (drawing.tool === 'line') {
                this.drawLine(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
            } else if (drawing.tool === 'circle') {
                this.drawCircle(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
            } else if (drawing.tool === 'square') {
                this.drawSquare(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
            } else if (drawing.tool === 'rectangle') {
                this.drawRectangle(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
            }
        });

        // Dibujar polilínea en progreso
        if (this.polylinePoints.length > 0) {
            this.drawPolylinePreview();
        }
    }

    clearCanvas() {
        if (confirm('¿Estás seguro de que deseas limpiar todo el canvas?')) {
            this.drawings = [];
            this.polylinePoints = [];
            this.redrawAll();
        }
    }

    undo() {
        if (this.drawings.length > 0) {
            this.drawings.pop();
            this.redrawAll();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.drawingTools = new DrawingTools();
});
