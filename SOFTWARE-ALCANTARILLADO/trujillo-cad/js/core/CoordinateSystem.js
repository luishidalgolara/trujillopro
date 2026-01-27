/**
 * CoordinateSystem.js - Sistema de coordenadas del CAD
 * Maneja conversiones entre coordenadas de pantalla y coordenadas del mundo CAD
 */

class CoordinateSystem {
    constructor() {
        // Escala: 1 unidad CAD = X píxeles
        this.scale = 1.0;
        
        // Offset del origen (pan)
        this.offsetX = 0;
        this.offsetY = 0;
        
        // Centro del viewport
        this.centerX = 0;
        this.centerY = 0;
        
        // Límites de zoom
        this.minScale = 0.01;
        this.maxScale = 100.0;
        
        this.updateCenter();
    }

    /**
     * Actualiza el centro del viewport según el tamaño del canvas
     */
    updateCenter() {
        if (paper.view) {
            this.centerX = paper.view.size.width / 2;
            this.centerY = paper.view.size.height / 2;
        }
    }

    /**
     * Convierte coordenadas de pantalla a coordenadas del mundo CAD
     */
    screenToWorld(screenPoint) {
        // Invertir Y porque en CAD Y positivo es hacia arriba
        const worldX = (screenPoint.x - this.centerX - this.offsetX) / this.scale;
        const worldY = -(screenPoint.y - this.centerY - this.offsetY) / this.scale;
        
        return new paper.Point(worldX, worldY);
    }

    /**
     * Convierte coordenadas del mundo CAD a coordenadas de pantalla
     */
    worldToScreen(worldPoint) {
        const screenX = worldPoint.x * this.scale + this.centerX + this.offsetX;
        const screenY = -worldPoint.y * this.scale + this.centerY + this.offsetY;
        
        return new paper.Point(screenX, screenY);
    }

    /**
     * Aplica zoom en un punto específico
     */
    zoom(delta, center) {
        const oldScale = this.scale;
        const factor = delta > 0 ? 1.1 : 0.9;
        
        this.scale *= factor;
        
        // Limitar escala
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale));
        
        // Ajustar offset para que el zoom sea centrado en el punto
        if (center) {
            const scaleChange = this.scale / oldScale;
            this.offsetX = center.x - (center.x - this.offsetX) * scaleChange;
            this.offsetY = center.y - (center.y - this.offsetY) * scaleChange;
        }
        
        this.updateZoomDisplay();
        return this.scale;
    }

    /**
     * Realiza pan (desplazamiento)
     */
    pan(deltaX, deltaY) {
        this.offsetX += deltaX;
        this.offsetY += deltaY;
    }

    /**
     * Ajusta la vista para mostrar todos los objetos
     */
    zoomExtents(bounds) {
        if (!bounds || bounds.width === 0 || bounds.height === 0) {
            this.reset();
            return;
        }

        const viewWidth = paper.view.size.width;
        const viewHeight = paper.view.size.height;
        
        const scaleX = viewWidth / (bounds.width * 1.2);
        const scaleY = viewHeight / (bounds.height * 1.2);
        
        this.scale = Math.min(scaleX, scaleY);
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale));
        
        // Centrar en el bounds
        const centerX = (bounds.left + bounds.right) / 2;
        const centerY = (bounds.top + bounds.bottom) / 2;
        
        this.offsetX = -centerX * this.scale;
        this.offsetY = centerY * this.scale;
        
        this.updateZoomDisplay();
    }

    /**
     * Resetea la vista a valores por defecto
     */
    reset() {
        this.scale = 1.0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.updateCenter();
        this.updateZoomDisplay();
    }

    /**
     * Actualiza el display del nivel de zoom en la UI
     */
    updateZoomDisplay() {
        const zoomElement = document.getElementById('zoom-level');
        if (zoomElement) {
            const ratio = Math.round(this.scale * 100) / 100;
            zoomElement.textContent = `${ratio.toFixed(2)}x`;
        }
    }

    /**
     * Obtiene la escala actual
     */
    getScale() {
        return this.scale;
    }

    /**
     * Obtiene la matriz de transformación actual
     */
    getTransformMatrix() {
        return {
            scale: this.scale,
            offsetX: this.offsetX,
            offsetY: this.offsetY
        };
    }
}
