/**
 * SISTEMA ORTHO - VISUAL
 * Feedback visual: líneas guía, ángulos, distancias
 */

OrthoSystem.visual = {
    
    /**
     * Dibujar líneas guía ortogonales
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {Object} startPoint - {x, y} punto inicial
     * @param {Object} snappedPoint - {x, y} punto ajustado
     * @param {Object} config - Configuración visual
     */
    drawGuideLines: function(ctx, startPoint, snappedPoint, config = {}) {
        if (!startPoint || !snappedPoint) return;
        
        const {
            color = '#00ff00',
            width = 1,
            dashPattern = [5, 5],
            showCrosshair = true
        } = config;
        
        ctx.save();
        
        // Configurar estilo
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dashPattern);
        ctx.globalAlpha = 0.7;
        
        // Dibujar línea guía
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(snappedPoint.x, snappedPoint.y);
        ctx.stroke();
        
        // Dibujar cruz en punto inicial
        if (showCrosshair) {
            this.drawCrosshair(ctx, startPoint, color, 10);
        }
        
        ctx.restore();
    },
    
    /**
     * Dibujar cruz de referencia
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {Object} point - {x, y} punto central
     * @param {string} color - Color de la cruz
     * @param {number} size - Tamaño de la cruz
     */
    drawCrosshair: function(ctx, point, color = '#00ff00', size = 10) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        
        // Línea horizontal
        ctx.beginPath();
        ctx.moveTo(point.x - size, point.y);
        ctx.lineTo(point.x + size, point.y);
        ctx.stroke();
        
        // Línea vertical
        ctx.beginPath();
        ctx.moveTo(point.x, point.y - size);
        ctx.lineTo(point.x, point.y + size);
        ctx.stroke();
        
        ctx.restore();
    },
    
    /**
     * Dibujar indicador de ángulo y distancia
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {Object} point - {x, y} punto de referencia
     * @param {number} angle - Ángulo en grados
     * @param {number} distance - Distancia en metros
     * @param {string} direction - Dirección ortogonal
     */
    drawMeasurementLabel: function(ctx, point, angle, distance, direction) {
        if (!point) return;
        
        ctx.save();
        
        // Preparar texto
        const angleText = `${Math.round(angle)}°`;
        const distanceText = `${distance.toFixed(2)}m`;
        const directionText = this.getDirectionSymbol(direction);
        
        const text = `${directionText} ${distanceText} ${angleText}`;
        
        // Configurar estilo
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        
        // Calcular dimensiones
        const metrics = ctx.measureText(text);
        const padding = 8;
        const boxWidth = metrics.width + padding * 2;
        const boxHeight = 20;
        
        // Posición del label (offset del cursor)
        const labelX = point.x + 15;
        const labelY = point.y - 15;
        
        // Dibujar fondo
        ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
        ctx.fillRect(labelX, labelY - boxHeight, boxWidth, boxHeight);
        
        // Dibujar borde
        ctx.strokeStyle = '#00aa00';
        ctx.lineWidth = 2;
        ctx.strokeRect(labelX, labelY - boxHeight, boxWidth, boxHeight);
        
        // Dibujar texto
        ctx.fillStyle = '#000000';
        ctx.fillText(text, labelX + padding, labelY - 6);
        
        ctx.restore();
    },
    
    /**
     * Obtener símbolo de dirección
     * @param {string} direction - Dirección ortogonal
     * @returns {string} - Símbolo
     */
    getDirectionSymbol: function(direction) {
        const symbols = {
            'HORIZONTAL_RIGHT': '→',
            'VERTICAL_UP': '↑',
            'HORIZONTAL_LEFT': '←',
            'VERTICAL_DOWN': '↓'
        };
        return symbols[direction] || '•';
    },
    
    /**
     * Dibujar indicador de modo ORTHO en canvas
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {boolean} enabled - Estado ORTHO
     */
    drawOrthoIndicator: function(ctx, enabled) {
        if (!enabled) return;
        
        ctx.save();
        
        // Posición: esquina superior derecha
        const x = ctx.canvas.width - 80;
        const y = 10;
        
        // Fondo
        ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
        ctx.fillRect(x, y, 70, 25);
        
        // Borde
        ctx.strokeStyle = '#00aa00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 70, 25);
        
        // Texto
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText('ORTHO', x + 10, y + 17);
        
        ctx.restore();
    },
    
    /**
     * Limpiar líneas guía
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     */
    clearGuides: function(ctx) {
        // Las guías se limpian automáticamente al redibujar el canvas
        // Este método está aquí por compatibilidad
    },
    
    /**
     * Dibujar grid ortogonal (opcional)
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {number} gridSize - Tamaño de la cuadrícula
     * @param {string} color - Color del grid
     */
    drawOrthoGrid: function(ctx, gridSize = 50, color = 'rgba(0, 255, 0, 0.1)') {
        ctx.save();
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 2]);
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Líneas verticales
        for (let x = 0; x <= width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Líneas horizontales
        for (let y = 0; y <= height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        ctx.restore();
    }
};

console.log('[ORTHO] Sistema visual inicializado');
