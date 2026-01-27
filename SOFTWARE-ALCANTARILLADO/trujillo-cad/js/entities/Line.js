/**
 * Line.js - Entidad de línea para el CAD
 * Representa una línea con punto inicial y final
 */

class Line {
    constructor(startPoint, endPoint, options = {}) {
        this.type = 'line';
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        
        // Propiedades visuales
        this.color = options.color || '#00ff88';
        this.strokeWidth = options.strokeWidth || 1.5;
        this.layer = options.layer || 'default';
        
        // Referencia al objeto Paper.js
        this.path = null;
        
        // Crear la representación visual
        this.create();
    }

    /**
     * Crea la línea en el canvas usando Paper.js
     */
    create() {
        this.path = new paper.Path.Line({
            from: this.startPoint,
            to: this.endPoint,
            strokeColor: this.color,
            strokeWidth: this.strokeWidth,
            strokeCap: 'round'
        });
    }

    /**
     * Actualiza el punto final de la línea (usado durante el dibujo)
     */
    updateEndPoint(point) {
        this.endPoint = point;
        if (this.path) {
            this.path.segments[1].point = point;
        }
    }

    /**
     * Calcula la longitud de la línea
     */
    getLength() {
        const dx = this.endPoint.x - this.startPoint.x;
        const dy = this.endPoint.y - this.startPoint.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calcula el ángulo de la línea en grados
     */
    getAngle() {
        const dx = this.endPoint.x - this.startPoint.x;
        const dy = this.endPoint.y - this.startPoint.y;
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    /**
     * Elimina la línea del canvas
     */
    remove() {
        if (this.path) {
            this.path.remove();
            this.path = null;
        }
    }

    /**
     * Resalta la línea (para selección)
     */
    highlight() {
        if (this.path) {
            this.path.strokeColor = '#00a8ff';
            this.path.strokeWidth = this.strokeWidth + 1;
        }
    }

    /**
     * Quita el resaltado
     */
    unhighlight() {
        if (this.path) {
            this.path.strokeColor = this.color;
            this.path.strokeWidth = this.strokeWidth;
        }
    }

    /**
     * Serializa la línea a JSON
     */
    toJSON() {
        return {
            type: this.type,
            startPoint: { x: this.startPoint.x, y: this.startPoint.y },
            endPoint: { x: this.endPoint.x, y: this.endPoint.y },
            color: this.color,
            strokeWidth: this.strokeWidth,
            layer: this.layer
        };
    }

    /**
     * Crea una línea desde datos JSON
     */
    static fromJSON(data) {
        return new Line(
            new paper.Point(data.startPoint.x, data.startPoint.y),
            new paper.Point(data.endPoint.x, data.endPoint.y),
            {
                color: data.color,
                strokeWidth: data.strokeWidth,
                layer: data.layer
            }
        );
    }
}
