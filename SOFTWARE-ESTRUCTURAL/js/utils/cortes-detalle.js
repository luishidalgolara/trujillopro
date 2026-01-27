/**
 * SISTEMA DE CORTES TÉCNICOS 2D
 * Dibuja secciones transversales profesionales en canvas 2D
 */

class CorteTecnico {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scale = 100; // pixels por metro
        this.offsetX = 50;
        this.offsetY = 50;
        
        // Configuración de estilo técnico
        this.estilos = {
            hormigon: {
                fill: '#FFFFFF',
                stroke: '#000000',
                lineWidth: 2
            },
            acero: {
                fill: '#000000',
                stroke: '#000000',
                lineWidth: 1.5
            },
            estribo: {
                fill: 'none',
                stroke: '#000000',
                lineWidth: 1,
                lineDash: []
            },
            acotacion: {
                stroke: '#000000',
                lineWidth: 0.5,
                font: '12px Arial',
                textAlign: 'center'
            },
            recubrimiento: {
                stroke: '#888888',
                lineWidth: 0.5,
                lineDash: [3, 3]
            }
        };
        
        this.clear();
    }
    
    clear() {
        this.ctx.fillStyle = '#F5F5F5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Convierte coordenadas reales (m) a píxeles
     */
    toPixels(value) {
        return value * this.scale;
    }
    
    /**
     * Dibuja rectángulo (hormigón)
     */
    drawRect(x, y, width, height, style = 'hormigon') {
        const px = this.offsetX + this.toPixels(x);
        const py = this.offsetY + this.toPixels(y);
        const pw = this.toPixels(width);
        const ph = this.toPixels(height);
        
        const s = this.estilos[style];
        
        // Relleno
        this.ctx.fillStyle = s.fill;
        this.ctx.fillRect(px, py, pw, ph);
        
        // Borde
        this.ctx.strokeStyle = s.stroke;
        this.ctx.lineWidth = s.lineWidth;
        this.ctx.setLineDash(s.lineDash || []);
        this.ctx.strokeRect(px, py, pw, ph);
    }
    
    /**
     * Dibuja círculo (barra de acero)
     */
    drawCircle(x, y, diameter, style = 'acero') {
        const px = this.offsetX + this.toPixels(x);
        const py = this.offsetY + this.toPixels(y);
        const radius = this.toPixels(diameter / 2 / 1000); // diametro en mm a m
        
        const s = this.estilos[style];
        
        this.ctx.beginPath();
        this.ctx.arc(px, py, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = s.fill;
        this.ctx.fill();
        this.ctx.strokeStyle = s.stroke;
        this.ctx.lineWidth = s.lineWidth;
        this.ctx.stroke();
    }
    
    /**
     * Dibuja línea
     */
    drawLine(x1, y1, x2, y2, style = 'acotacion') {
        const px1 = this.offsetX + this.toPixels(x1);
        const py1 = this.offsetY + this.toPixels(y1);
        const px2 = this.offsetX + this.toPixels(x2);
        const py2 = this.offsetY + this.toPixels(y2);
        
        const s = this.estilos[style];
        
        this.ctx.beginPath();
        this.ctx.moveTo(px1, py1);
        this.ctx.lineTo(px2, py2);
        this.ctx.strokeStyle = s.stroke;
        this.ctx.lineWidth = s.lineWidth;
        this.ctx.setLineDash(s.lineDash || []);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }
    
    /**
     * Dibuja texto
     */
    drawText(text, x, y, align = 'center') {
        const px = this.offsetX + this.toPixels(x);
        const py = this.offsetY + this.toPixels(y);
        
        const s = this.estilos.acotacion;
        
        this.ctx.fillStyle = '#000000';
        this.ctx.font = s.font;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, px, py);
    }
    
    /**
     * Dibuja acotación con flechas
     */
    drawDimension(x1, y1, x2, y2, text, offset = 0.15) {
        // Línea de cota
        this.drawLine(x1, y1 - offset, x2, y1 - offset, 'acotacion');
        
        // Flechas
        const arrowSize = 0.03;
        this.drawLine(x1, y1 - offset, x1 + arrowSize, y1 - offset + arrowSize, 'acotacion');
        this.drawLine(x1, y1 - offset, x1 + arrowSize, y1 - offset - arrowSize, 'acotacion');
        this.drawLine(x2, y2 - offset, x2 - arrowSize, y2 - offset + arrowSize, 'acotacion');
        this.drawLine(x2, y2 - offset, x2 - arrowSize, y2 - offset - arrowSize, 'acotacion');
        
        // Texto
        this.drawText(text, (x1 + x2) / 2, y1 - offset - 0.08);
    }
    
    /**
     * CORTE DE ZAPATA CORRIDA
     */
    dibujarCorteZapataCorrida(datos) {
        this.clear();
        
        const { B, h, bMuro, acero } = datos;
        
        // Dibujar zapata
        this.drawRect(0, 0, B, h, 'hormigon');
        
        // Dibujar muro sobre zapata
        const xMuro = (B - bMuro) / 2;
        this.drawRect(xMuro, -0.5, bMuro, 0.5, 'hormigon');
        
        // Acero inferior (longitudinal)
        const recubInf = 0.07;
        const yAcero = h - recubInf;
        const espaciamiento = acero.espaciamiento / 100;
        const numBarras = Math.floor(B / espaciamiento);
        
        for (let i = 0; i <= numBarras; i++) {
            const x = i * espaciamiento;
            this.drawCircle(x, yAcero, acero.diametro);
        }
        
        // Acero transversal (esquemático)
        const numBarrasTrans = 3;
        for (let i = 0; i < numBarrasTrans; i++) {
            const y = recubInf + i * (h - 2 * recubInf) / (numBarrasTrans - 1);
            this.drawLine(recubInf, y, B - recubInf, y, 'estribo');
        }
        
        // Líneas de recubrimiento
        this.drawLine(0, recubInf, B, recubInf, 'recubrimiento');
        this.drawLine(recubInf, 0, recubInf, h, 'recubrimiento');
        this.drawLine(B - recubInf, 0, B - recubInf, h, 'recubrimiento');
        
        // Acotaciones
        this.drawDimension(0, h, B, h, `B = ${(B * 100).toFixed(0)} cm`, 0.15);
        this.drawDimension(B + 0.1, 0, B + 0.1, h, `h = ${(h * 100).toFixed(0)} cm`, -0.05);
        
        // Etiquetas
        this.drawText(`φ${acero.diametro} @ ${acero.espaciamiento}cm`, B / 2, h + 0.25);
        this.drawText(`Recub. = 7cm`, B + 0.35, h / 2, 'left');
    }
    
    /**
     * CORTE DE VIGA
     */
    dibujarCorteViga(datos) {
        this.clear();
        
        const { b, h, aceroInf, aceroSup, estribos } = datos;
        
        // Dibujar sección de viga
        this.drawRect(0, 0, b, h, 'hormigon');
        
        const recub = 0.02;
        
        // Acero inferior
        const yInf = h - recub - 0.01;
        const numBarrasInf = aceroInf.cantidad;
        const espacioInf = (b - 2 * recub) / (numBarrasInf - 1);
        
        for (let i = 0; i < numBarrasInf; i++) {
            const x = recub + i * espacioInf;
            this.drawCircle(x, yInf, aceroInf.diametro);
        }
        
        // Acero superior (si existe)
        if (aceroSup && aceroSup.cantidad > 0) {
            const ySup = recub + 0.01;
            const numBarrasSup = aceroSup.cantidad;
            const espacioSup = (b - 2 * recub) / (numBarrasSup - 1);
            
            for (let i = 0; i < numBarrasSup; i++) {
                const x = recub + i * espacioSup;
                this.drawCircle(x, ySup, aceroSup.diametro);
            }
        }
        
        // Estribos
        const xEst1 = recub;
        const xEst2 = b - recub;
        const yEst1 = recub;
        const yEst2 = h - recub;
        
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(
            this.offsetX + this.toPixels(xEst1),
            this.offsetY + this.toPixels(yEst1),
            this.toPixels(xEst2 - xEst1),
            this.toPixels(yEst2 - yEst1)
        );
        
        // Líneas de recubrimiento
        this.drawLine(0, recub, b, recub, 'recubrimiento');
        this.drawLine(0, h - recub, b, h - recub, 'recubrimiento');
        this.drawLine(recub, 0, recub, h, 'recubrimiento');
        this.drawLine(b - recub, 0, b - recub, h, 'recubrimiento');
        
        // Acotaciones
        this.drawDimension(0, h, b, h, `b = ${(b * 100).toFixed(0)} cm`, 0.15);
        this.drawDimension(b + 0.08, 0, b + 0.08, h, `h = ${(h * 100).toFixed(0)} cm`, -0.03);
        
        const d = h - recub - 0.01;
        this.drawLine(b + 0.15, recub + 0.01, b + 0.15, h - recub - 0.01, 'acotacion');
        this.drawText(`d = ${(d * 100).toFixed(0)} cm`, b + 0.22, h / 2, 'left');
        
        // Etiquetas
        this.drawText(`${numBarrasInf} φ${aceroInf.diametro}`, b / 2, h + 0.20);
        if (aceroSup && aceroSup.cantidad > 0) {
            this.drawText(`${numBarrasSup} φ${aceroSup.diametro}`, b / 2, -0.10);
        }
        this.drawText(`Estribos φ${estribos.diametro} @ ${estribos.espaciamiento}cm`, b / 2, h + 0.35);
    }
    
    /**
     * CORTE DE COLUMNA
     */
    dibujarCorteColumna(datos) {
        this.clear();
        
        const { b, h, numBarras, diametro, estribos } = datos;
        
        // Dibujar sección
        this.drawRect(0, 0, b, h, 'hormigon');
        
        const recub = 0.02;
        
        // Distribuir barras en el perímetro
        const barrasPorLado = Math.ceil(numBarras / 4);
        
        // Lado inferior
        for (let i = 0; i < barrasPorLado; i++) {
            const x = recub + i * (b - 2 * recub) / (barrasPorLado - 1);
            this.drawCircle(x, h - recub, diametro);
        }
        
        // Lado superior
        for (let i = 0; i < barrasPorLado; i++) {
            const x = recub + i * (b - 2 * recub) / (barrasPorLado - 1);
            this.drawCircle(x, recub, diametro);
        }
        
        // Lados laterales (solo intermedias)
        const barrasLaterales = Math.max(0, barrasPorLado - 2);
        for (let i = 1; i <= barrasLaterales; i++) {
            const y = recub + i * (h - 2 * recub) / (barrasLaterales + 1);
            this.drawCircle(recub, y, diametro);
            this.drawCircle(b - recub, y, diametro);
        }
        
        // Estribos
        const xEst1 = recub;
        const xEst2 = b - recub;
        const yEst1 = recub;
        const yEst2 = h - recub;
        
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(
            this.offsetX + this.toPixels(xEst1),
            this.offsetY + this.toPixels(yEst1),
            this.toPixels(xEst2 - xEst1),
            this.toPixels(yEst2 - yEst1)
        );
        
        // Acotaciones
        this.drawDimension(0, h, b, h, `${(b * 100).toFixed(0)} cm`, 0.15);
        this.drawDimension(b + 0.08, 0, b + 0.08, h, `${(h * 100).toFixed(0)} cm`, -0.03);
        
        // Etiquetas
        this.drawText(`${numBarras} φ${diametro}`, b / 2, h + 0.25);
        this.drawText(`Est. φ${estribos.diametro} @ ${estribos.espaciamiento}cm`, b / 2, h + 0.40);
        this.drawText(`Recub. = 2cm`, b + 0.30, h / 2, 'left');
    }
    
    /**
     * Ajustar escala automáticamente
     */
    autoScale(maxDimension) {
        const availableWidth = this.canvas.width - 2 * this.offsetX;
        const availableHeight = this.canvas.height - 2 * this.offsetY;
        const minAvailable = Math.min(availableWidth, availableHeight);
        
        this.scale = minAvailable / maxDimension * 0.8; // 80% del espacio disponible
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CorteTecnico;
}
