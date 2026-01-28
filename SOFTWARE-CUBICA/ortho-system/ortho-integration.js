/**
 * SISTEMA ORTHO - INTEGRACIÓN
 * Hooks y funciones para integrar ORTHO con todas las herramientas
 */

OrthoSystem.integration = {
    
    /**
     * Procesar punto con ORTHO si está habilitado
     * @param {Object} startPoint - {x, y} punto inicial
     * @param {Object} currentPoint - {x, y} punto actual del cursor
     * @returns {Object} - Punto procesado (ajustado o original)
     */
    processPoint: function(startPoint, currentPoint) {
        // Si ORTHO no está habilitado, retornar punto original
        if (!OrthoSystem.isEnabled()) {
            return {
                point: currentPoint,
                original: currentPoint,
                isOrtho: false
            };
        }
        
        // Si no hay punto inicial, retornar punto actual
        if (!startPoint) {
            return {
                point: currentPoint,
                original: currentPoint,
                isOrtho: false
            };
        }
        
        // Calcular punto ajustado ortogonalmente
        const orthoData = OrthoSystem.calculator.calculateOrthoPoint(startPoint, currentPoint);
        
        if (!orthoData) {
            return {
                point: currentPoint,
                original: currentPoint,
                isOrtho: false
            };
        }
        
        // Actualizar estado temporal
        OrthoSystem.state.temp.currentPoint = currentPoint;
        OrthoSystem.state.temp.snappedPoint = { x: orthoData.x, y: orthoData.y };
        OrthoSystem.state.temp.angle = orthoData.angle;
        OrthoSystem.state.temp.distance = orthoData.distance;
        OrthoSystem.state.temp.direction = orthoData.direction;
        
        return {
            point: { x: orthoData.x, y: orthoData.y },
            original: currentPoint,
            isOrtho: true,
            angle: orthoData.angle,
            distance: orthoData.distance,
            direction: orthoData.direction,
            isHorizontal: orthoData.isHorizontal,
            isVertical: orthoData.isVertical
        };
    },
    
    /**
     * Dibujar feedback visual de ORTHO
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {Object} startPoint - {x, y} punto inicial
     * @param {Object} currentPoint - {x, y} punto actual
     */
    drawOrthoFeedback: function(ctx, startPoint, currentPoint) {
        if (!OrthoSystem.isEnabled() || !startPoint || !currentPoint) {
            return;
        }
        
        const orthoData = OrthoSystem.calculator.calculateOrthoPoint(startPoint, currentPoint);
        if (!orthoData) return;
        
        const config = OrthoSystem.state.config;
        
        // Dibujar líneas guía
        if (config.showGuides) {
            OrthoSystem.visual.drawGuideLines(
                ctx, 
                startPoint, 
                { x: orthoData.x, y: orthoData.y },
                {
                    color: config.guideColor,
                    width: config.guideWidth,
                    dashPattern: config.dashPattern
                }
            );
        }
        
        // Dibujar indicador de medición
        if (config.showAngle && orthoData.distance > 10) {
            OrthoSystem.visual.drawMeasurementLabel(
                ctx,
                { x: orthoData.x, y: orthoData.y },
                orthoData.angle,
                orthoData.distance / 100, // Convertir a metros (escala 1:100)
                orthoData.direction
            );
        }
        
        // Dibujar indicador ORTHO en canvas
        OrthoSystem.visual.drawOrthoIndicator(ctx, true);
    },
    
    /**
     * Hook para evento mousemove en herramientas
     * Uso: En el mousemove de cada herramienta, llamar esta función
     * @param {MouseEvent} e - Evento del mouse
     * @param {Object} canvas - Canvas donde ocurre el evento
     * @param {Object} startPoint - Punto inicial de la línea
     * @returns {Object} - Punto procesado
     */
    onMouseMove: function(e, canvas, startPoint) {
        const rect = canvas.getBoundingClientRect();
        const currentPoint = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        // Procesar punto con ORTHO
        const processed = this.processPoint(startPoint, currentPoint);
        
        // Actualizar UI
        if (processed.isOrtho) {
            OrthoSystem.ui.showDirectionIndicator(processed.direction);
            OrthoSystem.ui.updateMeasurement(processed.distance / 100, processed.angle);
        } else {
            OrthoSystem.ui.clearIndicators();
        }
        
        return processed;
    },
    
    /**
     * Hook para evento click en herramientas
     * @param {Object} point - Punto clickeado
     * @param {Object} startPoint - Punto inicial (si existe)
     * @returns {Object} - Punto procesado
     */
    onClick: function(point, startPoint) {
        return this.processPoint(startPoint, point);
    },
    
    /**
     * Inicializar punto de inicio
     * @param {Object} point - {x, y} punto inicial
     */
    initStartPoint: function(point) {
        OrthoSystem.setStartPoint(point.x, point.y);
    },
    
    /**
     * Resetear estado de ORTHO (fin de dibujo)
     */
    reset: function() {
        OrthoSystem.reset();
        OrthoSystem.ui.clearIndicators();
    },
    
    /**
     * Verificar si un punto fue ajustado por ORTHO
     * @param {Object} point - Punto a verificar
     * @returns {boolean}
     */
    isOrthoPoint: function(point) {
        if (!OrthoSystem.isEnabled()) return false;
        
        const temp = OrthoSystem.state.temp;
        return temp.snappedPoint && 
               temp.snappedPoint.x === point.x && 
               temp.snappedPoint.y === point.y;
    },
    
    /**
     * Obtener información del último snap
     * @returns {Object} - Información del snap
     */
    getLastSnapInfo: function() {
        return {
            enabled: OrthoSystem.isEnabled(),
            angle: OrthoSystem.state.temp.angle,
            distance: OrthoSystem.state.temp.distance,
            direction: OrthoSystem.state.temp.direction
        };
    }
};

// Funciones globales para fácil acceso desde herramientas
window.orthoProcessPoint = function(startPoint, currentPoint) {
    return OrthoSystem.integration.processPoint(startPoint, currentPoint);
};

window.orthoDrawFeedback = function(ctx, startPoint, currentPoint) {
    return OrthoSystem.integration.drawOrthoFeedback(ctx, startPoint, currentPoint);
};

window.orthoIsEnabled = function() {
    return OrthoSystem.isEnabled();
};

console.log('[ORTHO] Sistema de integración inicializado');
