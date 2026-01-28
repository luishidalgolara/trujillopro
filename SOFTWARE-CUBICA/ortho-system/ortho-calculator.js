/**
 * SISTEMA ORTHO - CALCULADORA
 * Cálculos de snap ortogonal y ajuste a 90 grados
 */

OrthoSystem.calculator = {
    
    /**
     * Calcular punto ajustado ortogonalmente
     * @param {Object} startPoint - {x, y} punto inicial
     * @param {Object} currentPoint - {x, y} punto actual del cursor
     * @returns {Object} - {x, y, angle, distance, direction}
     */
    calculateOrthoPoint: function(startPoint, currentPoint) {
        if (!startPoint || !currentPoint) {
            return null;
        }
        
        const dx = currentPoint.x - startPoint.x;
        const dy = currentPoint.y - startPoint.y;
        
        // Calcular ángulo y distancia
        const angle = Math.atan2(-dy, dx) * (180 / Math.PI);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Determinar dirección ortogonal más cercana
        const direction = this.getClosestOrthoDirection(angle);
        
        // Calcular punto ajustado según la dirección
        let snappedPoint;
        
        switch(direction) {
            case 'HORIZONTAL_RIGHT': // 0°
                snappedPoint = {
                    x: currentPoint.x,
                    y: startPoint.y
                };
                break;
                
            case 'VERTICAL_UP': // 90°
                snappedPoint = {
                    x: startPoint.x,
                    y: currentPoint.y
                };
                break;
                
            case 'HORIZONTAL_LEFT': // 180°
                snappedPoint = {
                    x: currentPoint.x,
                    y: startPoint.y
                };
                break;
                
            case 'VERTICAL_DOWN': // 270°
                snappedPoint = {
                    x: startPoint.x,
                    y: currentPoint.y
                };
                break;
                
            default:
                snappedPoint = currentPoint;
        }
        
        // Calcular distancia ajustada
        const snappedDx = snappedPoint.x - startPoint.x;
        const snappedDy = snappedPoint.y - startPoint.y;
        const snappedDistance = Math.sqrt(snappedDx * snappedDx + snappedDy * snappedDy);
        
        return {
            x: snappedPoint.x,
            y: snappedPoint.y,
            angle: this.getDirectionAngle(direction),
            distance: snappedDistance,
            direction: direction,
            isHorizontal: direction === 'HORIZONTAL_RIGHT' || direction === 'HORIZONTAL_LEFT',
            isVertical: direction === 'VERTICAL_UP' || direction === 'VERTICAL_DOWN'
        };
    },
    
    /**
     * Obtener dirección ortogonal más cercana
     * @param {number} angle - Ángulo en grados
     * @returns {string} - Dirección ortogonal
     */
    getClosestOrthoDirection: function(angle) {
        // Normalizar ángulo a rango 0-360
        let normalizedAngle = angle;
        while (normalizedAngle < 0) normalizedAngle += 360;
        while (normalizedAngle >= 360) normalizedAngle -= 360;
        
        // Determinar cuadrante
        if (normalizedAngle >= 315 || normalizedAngle < 45) {
            return 'HORIZONTAL_RIGHT'; // 0°
        } else if (normalizedAngle >= 45 && normalizedAngle < 135) {
            return 'VERTICAL_UP'; // 90°
        } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
            return 'HORIZONTAL_LEFT'; // 180°
        } else {
            return 'VERTICAL_DOWN'; // 270°
        }
    },
    
    /**
     * Obtener ángulo de una dirección
     * @param {string} direction - Dirección ortogonal
     * @returns {number} - Ángulo en grados
     */
    getDirectionAngle: function(direction) {
        const angles = {
            'HORIZONTAL_RIGHT': 0,
            'VERTICAL_UP': 90,
            'HORIZONTAL_LEFT': 180,
            'VERTICAL_DOWN': 270
        };
        return angles[direction] || 0;
    },
    
    /**
     * Verificar si un punto está dentro de la tolerancia ortogonal
     * @param {Object} point1 - {x, y}
     * @param {Object} point2 - {x, y}
     * @param {number} tolerance - Tolerancia en píxeles
     * @returns {boolean}
     */
    isWithinTolerance: function(point1, point2, tolerance = 10) {
        const dx = Math.abs(point2.x - point1.x);
        const dy = Math.abs(point2.y - point1.y);
        
        // Verificar si está cerca de horizontal o vertical
        return (dx < tolerance || dy < tolerance);
    },
    
    /**
     * Calcular distancia entre dos puntos
     * @param {Object} point1 - {x, y}
     * @param {Object} point2 - {x, y}
     * @returns {number} - Distancia en píxeles
     */
    calculateDistance: function(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    /**
     * Formatear distancia para mostrar
     * @param {number} distance - Distancia en píxeles
     * @param {number} scale - Escala del plano (default 100)
     * @returns {string} - Distancia formateada
     */
    formatDistance: function(distance, scale = 100) {
        const realDistance = (distance / scale).toFixed(2);
        return `${realDistance}m`;
    },
    
    /**
     * Formatear ángulo para mostrar
     * @param {number} angle - Ángulo en grados
     * @returns {string} - Ángulo formateado
     */
    formatAngle: function(angle) {
        return `${Math.round(angle)}°`;
    }
};

console.log('[ORTHO] Calculadora inicializada');
