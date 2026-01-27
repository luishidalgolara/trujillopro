/**
 * Circle.js - Entidad de círculo para el CAD
 * Representa un círculo con centro y radio
 */

class Circle {
    constructor(center, radius, options = {}) {
        this.type = 'circle';
        this.center = center;
        this.radius = radius;
        
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
     * Crea el círculo en el canvas usando Paper.js
     */
    create() {
        this.path = new paper.Path.Circle({
            center: this.center,
            radius: this.radius,
            strokeColor: this.color,
            strokeWidth: this.strokeWidth,
            fillColor: this.fillColor
        });
    }

    /**
     * Actualiza el radio del círculo
     */
    updateRadius(radius) {
        this.radius = Math.abs(radius);
        if (this.path) {
            this.path.remove();
            this.create();
        }
    }

    /**
     * Calcula el diámetro
     */
    getDiameter() {
        return this.radius * 2;
    }

    /**
     * Calcula el área
     */
    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    /**
     * Calcula la circunferencia
     */
    getCircumference() {
        return 2 * Math.PI * this.radius;
    }

    /**
     * Elimina el círculo del canvas
     */
    remove() {
        if (this.path) {
            this.path.remove();
            this.path = null;
        }
    }

    /**
     * Resalta el círculo (para selección)
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
     * Serializa el círculo a JSON
     */
    toJSON() {
        return {
            type: this.type,
            center: { x: this.center.x, y: this.center.y },
            radius: this.radius,
            color: this.color,
            strokeWidth: this.strokeWidth,
            fillColor: this.fillColor,
            layer: this.layer
        };
    }

    /**
     * Crea un círculo desde datos JSON
     */
    static fromJSON(data) {
        return new Circle(
            new paper.Point(data.center.x, data.center.y),
            data.radius,
            {
                color: data.color,
                strokeWidth: data.strokeWidth,
                fillColor: data.fillColor,
                layer: data.layer
            }
        );
    }
}
