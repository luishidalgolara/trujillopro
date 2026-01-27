/**
 * CircleTool.js - Herramienta para dibujar círculos
 * Permite al usuario hacer clic para centro y segundo clic para definir radio
 */

class CircleTool extends Tool {
    constructor() {
        super('circle');
        this.center = null;
        this.previewCircle = null;
        this.entities = [];
    }

    onActivate() {
        this.updateStatus('CÍRCULO: Especifique el centro del círculo');
        this.center = null;
        this.removePreview();
    }

    onDeactivate() {
        this.removePreview();
        this.center = null;
    }

    onMouseDown(event) {
        const point = this.getCanvasPoint(event);

        if (!this.center) {
            // Primer clic: establecer centro
            this.center = point;
            this.updateStatus(`CÍRCULO: Especifique el radio (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`);
        } else {
            // Segundo clic: completar el círculo
            this.completeCircle(point);
        }
    }

    onMouseMove(event) {
        if (!this.center) return;

        const point = this.getCanvasPoint(event);

        // Calcular radio
        const radius = this.center.getDistance(point);

        // Actualizar vista previa
        this.updatePreview(radius);

        // Actualizar coordenadas
        this.updateCoordinates(point);

        // Mostrar radio en estado
        this.updateStatus(`CÍRCULO: Radio = ${radius.toFixed(2)}`);
    }

    onKeyDown(event) {
        if (event.key === 'Escape') {
            this.cancel();
        }
    }

    /**
     * Actualiza la vista previa del círculo
     */
    updatePreview(radius) {
        this.removePreview();

        this.previewCircle = new paper.Path.Circle({
            center: this.center,
            radius: radius,
            strokeColor: '#00a8ff',
            strokeWidth: 1,
            dashArray: [5, 5]
        });
    }

    /**
     * Completa el círculo y lo agrega a las entidades
     */
    completeCircle(point) {
        const radius = this.center.getDistance(point);

        if (radius < 0.01) {
            this.updateStatus('CÍRCULO: Radio muy pequeño. Inténtelo de nuevo.');
            return;
        }

        this.removePreview();

        // Crear el círculo real
        const circle = new Circle(this.center, radius);
        this.entities.push(circle);

        console.log(`Círculo creado: Radio=${radius.toFixed(2)}, Área=${circle.getArea().toFixed(2)}`);

        // Reiniciar para el siguiente círculo
        this.center = null;
        this.updateStatus('CÍRCULO: Especifique el centro del círculo');
    }

    /**
     * Cancela la operación actual
     */
    cancel() {
        this.removePreview();
        this.center = null;
        this.updateStatus('CÍRCULO: Comando cancelado. Especifique el centro del círculo');
    }

    /**
     * Elimina la vista previa temporal
     */
    removePreview() {
        if (this.previewCircle) {
            this.previewCircle.remove();
            this.previewCircle = null;
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
        this.center = null;
    }
}
