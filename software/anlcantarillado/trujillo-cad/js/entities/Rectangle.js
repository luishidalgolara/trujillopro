/**
 * Rectangle.js - Entidad de rectángulo para el CAD
 * Representa un rectángulo con dos puntos opuestos
 */

class Rectangle {
    constructor(firstCorner, secondCorner, options = {}) {
        this.type = 'rectangle';
        this.firstCorner = firstCorner;
        this.secondCorner = secondCorner;
        
        // Propiedades visuales
        this.color = options.color || '#00ff88';
        this.strokeWidth = options.strokeWidth || 1.5;
        this.fillColor = options.fillColor || null;
        this.layer = options.layer || 'default';
        
        // Referencia al objeto Paper.js
        this.path = null;
        
        // Crear la representación visual
        this.create();
    }

    /**
     * Crea el rectángulo en el canvas usando Paper.js
     */
    create() {
        const rect = new paper.Rectangle(this.firstCorner, this.secondCorner);
        this.path = new paper.Path.Rectangle({
            rectangle: rect,
            strokeColor: this.color,
            strokeWidth: this.strokeWidth,
            fillColor: this.fillColor
        });
    }

    /**
     * Actualiza la segunda esquina del rectángulo
     */
    updateSecondCorner(point) {
        this.secondCorner = point;
        if (this.path) {
            this.path.remove();
            this.create();
        }
    }

    /**
     * Calcula el ancho del rectángulo
     */
    getWidth() {
        return Math.abs(this.secondCorner.x - this.firstCorner.x);
    }

    /**
     * Calcula la altura del rectángulo
     */
    getHeight() {
        return Math.abs(this.secondCorner.y - this.firstCorner.y);
    }

    /**
     * Calcula el área
     */
    getArea() {
        return this.getWidth() * this.getHeight();
    }

    /**
     * Calcula el perímetro
     */
    getPerimeter() {
        return 2 * (this.getWidth() + this.getHeight());
    }

    /**
     * Elimina el rectángulo del canvas
     */
    remove() {
        if (this.path) {
            this.path.remove();
            this.path = null;
        }
    }

    /**
     * Resalta el rectángulo (para selección)
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
     * Serializa el rectángulo a JSON
     */
    toJSON() {
        return {
            type: this.type,
            firstCorner: { x: this.firstCorner.x, y: this.firstCorner.y },
            secondCorner: { x: this.secondCorner.x, y: this.secondCorner.y },
            color: this.color,
            strokeWidth: this.strokeWidth,
            fillColor: this.fillColor,
            layer: this.layer
        };
    }

    /**
     * Crea un rectángulo desde datos JSON
     */
    static fromJSON(data) {
        return new Rectangle(
            new paper.Point(data.firstCorner.x, data.firstCorner.y),
            new paper.Point(data.secondCorner.x, data.secondCorner.y),
            {
                color: data.color,
                strokeWidth: data.strokeWidth,
                fillColor: data.fillColor,
                layer: data.layer
            }
        );
    }
}
