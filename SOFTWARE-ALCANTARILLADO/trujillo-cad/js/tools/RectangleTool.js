/**
 * RectangleTool.js - Herramienta para dibujar rectángulos
 * Permite al usuario hacer clic para primera esquina y segunda esquina
 */

class RectangleTool extends Tool {
    constructor() {
        super('rectangle');
        this.firstCorner = null;
        this.previewRect = null;
        this.entities = [];
    }

    onActivate() {
        this.updateStatus('RECTÁNGULO: Especifique la primera esquina');
        this.firstCorner = null;
        this.removePreview();
    }

    onDeactivate() {
        this.removePreview();
        this.firstCorner = null;
    }

    onMouseDown(event) {
        const point = this.getCanvasPoint(event);

        if (!this.firstCorner) {
            // Primer clic: establecer primera esquina
            this.firstCorner = point;
            this.updateStatus(`RECTÁNGULO: Especifique la esquina opuesta (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`);
        } else {
            // Segundo clic: completar el rectángulo
            this.completeRectangle(point);
        }
    }

    onMouseMove(event) {
        if (!this.firstCorner) return;

        const point = this.getCanvasPoint(event);

        // Actualizar vista previa
        this.updatePreview(point);

        // Actualizar coordenadas
        this.updateCoordinates(point);

        // Mostrar dimensiones
        const width = Math.abs(point.x - this.firstCorner.x);
        const height = Math.abs(point.y - this.firstCorner.y);
        this.updateStatus(`RECTÁNGULO: ${width.toFixed(2)} × ${height.toFixed(2)}`);
    }

    onKeyDown(event) {
        if (event.key === 'Escape') {
            this.cancel();
        }
    }

    /**
     * Actualiza la vista previa del rectángulo
     */
    updatePreview(secondCorner) {
        this.removePreview();

        const rect = new paper.Rectangle(this.firstCorner, secondCorner);
        this.previewRect = new paper.Path.Rectangle({
            rectangle: rect,
            strokeColor: '#00a8ff',
            strokeWidth: 1,
            dashArray: [5, 5]
        });
    }

    /**
     * Completa el rectángulo y lo agrega a las entidades
     */
    completeRectangle(secondCorner) {
        const width = Math.abs(secondCorner.x - this.firstCorner.x);
        const height = Math.abs(secondCorner.y - this.firstCorner.y);

        if (width < 0.01 || height < 0.01) {
            this.updateStatus('RECTÁNGULO: Dimensiones muy pequeñas. Inténtelo de nuevo.');
            return;
        }

        this.removePreview();

        // Crear el rectángulo real
        const rectangle = new Rectangle(this.firstCorner, secondCorner);
        this.entities.push(rectangle);

        console.log(`Rectángulo creado: ${width.toFixed(2)} × ${height.toFixed(2)}, Área=${rectangle.getArea().toFixed(2)}`);

        // Reiniciar para el siguiente rectángulo
        this.firstCorner = null;
        this.updateStatus('RECTÁNGULO: Especifique la primera esquina');
    }

    /**
     * Cancela la operación actual
     */
    cancel() {
        this.removePreview();
        this.firstCorner = null;
        this.updateStatus('RECTÁNGULO: Comando cancelado. Especifique la primera esquina');
    }

    /**
     * Elimina la vista previa temporal
     */
    removePreview() {
        if (this.previewRect) {
            this.previewRect.remove();
            this.previewRect = null;
        }
    }

    /**
     * Actualiza las coordenadas en la barra de estado
     */
    updateCoordinates(point) {
        const coordX = document.getElementById('coord-x');
        const coordY = document.getElementById('coord-y');
        
        if (coordX) coordX.textContent = point.x.toFixed(2);
        if (coordY) coordY.textContent = point.y.toFixed(2);
    }

    /**
     * Obtiene todas las entidades dibujadas
     */
    getEntities() {
        return this.entities;
    }

    /**
     * Limpia todas las entidades
     */
    clear() {
        this.entities.forEach(entity => entity.remove());
        this.entities = [];
        this.removePreview();
        this.firstCorner = null;
    }
}
