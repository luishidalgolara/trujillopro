/**
 * Tool.js - Clase base para todas las herramientas de dibujo
 * Define la interfaz común que deben implementar todas las herramientas
 */

class Tool {
    constructor(name) {
        this.name = name;
        this.isActive = false;
        this.canvas = null;
    }

    /**
     * Activa la herramienta
     */
    activate(canvas) {
        this.isActive = true;
        this.canvas = canvas;
        this.onActivate();
    }

    /**
     * Desactiva la herramienta
     */
    deactivate() {
        this.isActive = false;
        this.onDeactivate();
        this.canvas = null;
    }

    /**
     * Método llamado al activar la herramienta
     * Las subclases pueden sobrescribir esto
     */
    onActivate() {
        // Implementar en subclases
    }

    /**
     * Método llamado al desactivar la herramienta
     * Las subclases pueden sobrescribir esto
     */
    onDeactivate() {
        // Implementar en subclases
    }

    /**
     * Maneja el evento mousedown
     */
    onMouseDown(event) {
        // Implementar en subclases
    }

    /**
     * Maneja el evento mousemove
     */
    onMouseMove(event) {
        // Implementar en subclases
    }

    /**
     * Maneja el evento mouseup
     */
    onMouseUp(event) {
        // Implementar en subclases
    }

    /**
     * Maneja el evento de tecla presionada
     */
    onKeyDown(event) {
        // Implementar en subclases
    }

    /**
     * Actualiza el mensaje de estado
     */
    updateStatus(message) {
        const statusElement = document.getElementById('status-message');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    /**
     * Obtiene el punto en coordenadas del canvas
     */
    getCanvasPoint(event) {
        if (this.canvas && this.canvas.coordinateSystem) {
            return this.canvas.coordinateSystem.screenToWorld(event.point);
        }
        return event.point;
    }
}
