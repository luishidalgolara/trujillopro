/**
 * UTILIDADES SVG
 * Funciones auxiliares para dibujo de elementos SVG
 * Versión: 1.0
 */

const UtilidadesSVG = {
    // Colores estandarizados
    colores: {
        hormigon: '#A9A9A9',
        agua: '#1E90FF',
        tierra: '#8B7355',
        puerta: '#4A4A4A',
        tuberia: '#666666',
        bomba: '#FF6B35',
        texto: '#000000',
        linea: '#333333',
        cota: '#000000'
    },

    /**
     * Dibujar rectángulo SVG
     */
    dibujarRectangulo: function(svg, x, y, width, height, fill, stroke, strokeWidth, opacity = 1) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', fill);
        rect.setAttribute('stroke', stroke);
        rect.setAttribute('stroke-width', strokeWidth);
        rect.setAttribute('opacity', opacity);
        svg.appendChild(rect);
    },

    /**
     * Dibujar círculo SVG
     */
    dibujarCirculo: function(svg, cx, cy, r, fill, stroke, strokeWidth) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', fill);
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('stroke-width', strokeWidth);
        svg.appendChild(circle);
    },

    /**
     * Dibujar línea SVG
     */
    dibujarLinea: function(svg, x1, y1, x2, y2, stroke, strokeWidth, dashArray = null) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', stroke);
        line.setAttribute('stroke-width', strokeWidth);
        if (dashArray) {
            line.setAttribute('stroke-dasharray', dashArray);
        }
        svg.appendChild(line);
    },

    /**
     * Dibujar texto SVG
     */
    dibujarTexto: function(svg, texto, x, y, fontSize, fontWeight = 'normal', anchor = 'middle', fill = '#000') {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', anchor);
        text.setAttribute('font-size', fontSize);
        text.setAttribute('font-weight', fontWeight);
        text.setAttribute('fill', fill);
        text.textContent = texto;
        svg.appendChild(text);
    },

    /**
     * Dibujar cota horizontal
     */
    dibujarCotaHorizontal: function(svg, x1, x2, y, texto) {
        // Línea principal
        this.dibujarLinea(svg, x1, y, x2, y, this.colores.cota, 1);
        
        // Flechas
        this.dibujarLinea(svg, x1, y - 5, x1, y + 5, this.colores.cota, 1);
        this.dibujarLinea(svg, x2, y - 5, x2, y + 5, this.colores.cota, 1);
        
        // Texto
        this.dibujarTexto(svg, texto, (x1 + x2) / 2, y + 15, 12, 'normal');
    },

    /**
     * Dibujar cota vertical
     */
    dibujarCotaVertical: function(svg, x, y1, y2, texto) {
        // Línea principal
        this.dibujarLinea(svg, x, y1, x, y2, this.colores.cota, 1);
        
        // Flechas
        this.dibujarLinea(svg, x - 5, y1, x + 5, y1, this.colores.cota, 1);
        this.dibujarLinea(svg, x - 5, y2, x + 5, y2, this.colores.cota, 1);
        
        // Texto (rotado)
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x - 15);
        text.setAttribute('y', (y1 + y2) / 2);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.setAttribute('transform', `rotate(-90, ${x - 15}, ${(y1 + y2) / 2})`);
        text.textContent = texto;
        svg.appendChild(text);
    },

    /**
     * Dibujar línea de corte con identificadores
     */
    dibujarLineaCorte: function(svg, x1, y1, x2, y2, label1, label2) {
        // Línea punteada
        this.dibujarLinea(svg, x1, y1, x2, y2, '#FF0000', 2, '10,5');
        
        // Círculos en los extremos
        this.dibujarCirculo(svg, x1, y1, 12, '#FF0000', '#CC0000', 2);
        this.dibujarCirculo(svg, x2, y2, 12, '#FF0000', '#CC0000', 2);
        
        // Letras
        this.dibujarTexto(svg, label1, x1, y1 + 5, 14, 'bold', 'middle', '#FFF');
        this.dibujarTexto(svg, label2, x2, y2 + 5, 14, 'bold', 'middle', '#FFF');
    },

    /**
     * Dibujar leyenda
     */
    dibujarLeyenda: function(svg, x, y) {
        // Título
        this.dibujarTexto(svg, 'SIMBOLOGÍA:', x, y, 12, 'bold', 'start');
        
        // Items
        const items = [
            { color: this.colores.agua, texto: 'Agua' },
            { color: this.colores.hormigon, texto: 'Hormigón' },
            { color: this.colores.bomba, texto: 'Bombas' },
            { color: '#FF0000', texto: 'Líneas de corte' }
        ];
        
        items.forEach((item, i) => {
            const itemY = y + 18 + i * 18;
            this.dibujarRectangulo(svg, x, itemY, 18, 10, item.color, '#333', 1);
            this.dibujarTexto(svg, item.texto, x + 25, itemY + 8, 10, 'normal', 'start');
        });
    },

    /**
     * Crear SVG base
     */
    crearSVG: function(viewBox = '0 0 700 450') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', viewBox);
        return svg;
    },

    /**
     * Limpiar canvas y mostrar mensaje
     */
    mostrarMensaje: function(canvas, mensaje) {
        canvas.innerHTML = `<p style="text-align:center; padding:50px; color:#666;">${mensaje}</p>`;
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UtilidadesSVG;
}