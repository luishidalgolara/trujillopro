/**
 * LineTool.js - Herramienta para dibujar líneas
 * Permite al usuario hacer clic para definir punto inicial y final
 */

class LineTool extends Tool {
    constructor() {
        super('line');
        this.startPoint = null;
        this.currentLine = null;
        this.previewPath = null;
        this.entities = [];
    }

    onActivate() {
        this.updateStatus('LÍNEA: Especifique el primer punto');
        this.startPoint = null;
        this.currentLine = null;
        this.removePreview();
    }

    onDeactivate() {
        this.removePreview();
        this.startPoint = null;
        this.currentLine = null;
    }

    onMouseDown(event) {
        const point = this.getCanvasPoint(event);

        if (!this.startPoint) {
            // Primer clic: establecer punto inicial
            this.startPoint = point;
            this.updateStatus(`LÍNEA: Especifique el siguiente punto (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`);
        } else {
            // Segundo clic: completar la línea
            this.completeLine(point);
        }
    }

    onMouseMove(event) {
        if (!this.startPoint) return;

        const point = this.getCanvasPoint(event);

        // Actualizar vista previa de la línea
        this.updatePreview(point);

        // Actualizar coordenadas en barra de estado
        this.updateCoordinates(point);
    }

    onKeyDown(event) {
        // ESC cancela la operación actual
        if (event.key === 'Escape') {
            this.cancel();
        }
    }

    /**
     * Actualiza la vista previa de la línea mientras el mouse se mueve
     */
    updatePreview(endPoint) {
        // Eliminar preview anterior
        this.removePreview();

        // Crear nueva línea de preview
        this.previewPath = new paper.Path.Line({
            from: this.startPoint,
            to: endPoint,
            strokeColor: '#00a8ff',
            strokeWidth: 1,
            dashArray: [5, 5]
        });
    }

    /**
     * Completa la línea y la agrega a las entidades
     */
    completeLine(endPoint) {
        // Eliminar vista previa
        this.removePreview();

        // Crear la línea real
        const line = new Line(this.startPoint, endPoint);
        this.entities.push(line);

        // Calcular longitud y ángulo para mostrar info
        const length = line.getLength();
        const angle = line.getAngle();

        console.log(`Línea creada: Longitud=${length.toFixed(2)}, Ángulo=${angle.toFixed(2)}°`);

        // Reiniciar para la siguiente línea
        this.startPoint = null;
        this.updateStatus('LÍNEA: Especifique el primer punto');
    }

    /**
     * Cancela la operación actual
     */
    cancel() {
        this.removePreview();
        this.startPoint = null;
        this.updateStatus('LÍNEA: Comando cancelado. Especifique el primer punto');
    }

    /**
     * Elimina la vista previa temporal
     */
    removePreview() {
        if (this.previewPath) {
            this.previewPath.remove();
            this.previewPath = null;
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
        this.startPoint = null;
    }
}
