/**
 * CORTES DEL ESTANQUE
 * Genera cortes longitudinal (A-A) y transversal (B-B) del estanque
 * Versión: 1.0
 */

const CortesEstanque = {
    /**
     * CORTE A-A: ESTANQUE VISTA LONGITUDINAL
     * Muestra el estanque cortado a lo largo (por el eje Z)
     */
    generarCorteAA: function(canvas, dimensiones) {
        if (!canvas || !dimensiones) {
            console.error('Canvas o dimensiones no proporcionadas');
            return;
        }

        // Limpiar canvas
        canvas.innerHTML = '';

        const dim = dimensiones;
        if (!dim.altura) {
            UtilidadesSVG.mostrarMensaje(canvas, 'Calcule el estanque para ver el corte');
            return;
        }

        // Crear SVG
        const svg = UtilidadesSVG.crearSVG();

        // Escalas
        const escalaX = 450 / (dim.largo + 2 * dim.espesorMuros + 2);
        const escalaY = 300 / (dim.altura + dim.espesorFondo + 1);
        const offsetX = 125;
        const offsetY = 60;

        // Dibujar título
        UtilidadesSVG.dibujarTexto(svg, 'CORTE A-A - ESTANQUE VISTA LONGITUDINAL', 350, 30, 20, 'bold');

        // Dibujar fondo (losa)
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY + dim.altura * escalaY,
            (dim.largo + 2 * dim.espesorMuros) * escalaX,
            dim.espesorFondo * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Dibujar muro izquierdo
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY,
            dim.espesorMuros * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Dibujar muro derecho
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX + (dim.largo + dim.espesorMuros) * escalaX,
            offsetY,
            dim.espesorMuros * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Dibujar agua (85% altura útil)
        const alturaAgua = dim.altura * 0.85;
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX + dim.espesorMuros * escalaX,
            offsetY + (dim.altura - alturaAgua) * escalaY,
            dim.largo * escalaX,
            alturaAgua * escalaY,
            UtilidadesSVG.colores.agua,
            '#0066CC',
            1,
            0.6
        );

        // Línea de nivel del agua
        UtilidadesSVG.dibujarLinea(svg,
            offsetX + dim.espesorMuros * escalaX,
            offsetY + (dim.altura - alturaAgua) * escalaY,
            offsetX + (dim.largo + dim.espesorMuros) * escalaX,
            offsetY + (dim.altura - alturaAgua) * escalaY,
            '#0044AA',
            2,
            '5,5'
        );

        // Cotas
        UtilidadesSVG.dibujarCotaHorizontal(svg, 
            offsetX + dim.espesorMuros * escalaX,
            offsetX + (dim.largo + dim.espesorMuros) * escalaX,
            offsetY + dim.altura * escalaY + dim.espesorFondo * escalaY + 30,
            `L = ${dim.largo.toFixed(2)} m`
        );

        UtilidadesSVG.dibujarCotaVertical(svg,
            offsetX - 30,
            offsetY,
            offsetY + dim.altura * escalaY,
            `H = ${dim.altura.toFixed(2)} m`
        );

        // Etiqueta de espesor de muro
        UtilidadesSVG.dibujarTexto(svg, `e = ${dim.espesorMuros}m`, offsetX - 10, offsetY + dim.altura * escalaY / 2, 11, 'normal', 'end');

        canvas.appendChild(svg);
    },

    /**
     * CORTE B-B: ESTANQUE VISTA TRANSVERSAL
     * Muestra el estanque cortado por el ancho (por el eje X)
     */
    generarCorteBB: function(canvas, dimensiones) {
        if (!canvas || !dimensiones) {
            console.error('Canvas o dimensiones no proporcionadas');
            return;
        }

        canvas.innerHTML = '';

        const dim = dimensiones;
        if (!dim.altura) {
            UtilidadesSVG.mostrarMensaje(canvas, 'Calcule el estanque para ver el corte');
            return;
        }

        const svg = UtilidadesSVG.crearSVG();

        // Escalas (ahora usamos ANCHO en lugar de largo)
        const escalaX = 450 / (dim.ancho + 2 * dim.espesorMuros + 2);
        const escalaY = 300 / (dim.altura + dim.espesorFondo + 1);
        const offsetX = 125;
        const offsetY = 60;

        // Título
        UtilidadesSVG.dibujarTexto(svg, 'CORTE B-B - ESTANQUE VISTA TRANSVERSAL', 350, 30, 20, 'bold');

        // Fondo
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY + dim.altura * escalaY,
            (dim.ancho + 2 * dim.espesorMuros) * escalaX,
            dim.espesorFondo * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Muro izquierdo
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY,
            dim.espesorMuros * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Muro derecho
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX + (dim.ancho + dim.espesorMuros) * escalaX,
            offsetY,
            dim.espesorMuros * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Agua
        const alturaAgua = dim.altura * 0.85;
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX + dim.espesorMuros * escalaX,
            offsetY + (dim.altura - alturaAgua) * escalaY,
            dim.ancho * escalaX,
            alturaAgua * escalaY,
            UtilidadesSVG.colores.agua,
            '#0066CC',
            1,
            0.6
        );

        // Línea de nivel del agua
        UtilidadesSVG.dibujarLinea(svg,
            offsetX + dim.espesorMuros * escalaX,
            offsetY + (dim.altura - alturaAgua) * escalaY,
            offsetX + (dim.ancho + dim.espesorMuros) * escalaX,
            offsetY + (dim.altura - alturaAgua) * escalaY,
            '#0044AA',
            2,
            '5,5'
        );

        // Cotas
        UtilidadesSVG.dibujarCotaHorizontal(svg,
            offsetX + dim.espesorMuros * escalaX,
            offsetX + (dim.ancho + dim.espesorMuros) * escalaX,
            offsetY + dim.altura * escalaY + dim.espesorFondo * escalaY + 30,
            `A = ${dim.ancho.toFixed(2)} m`
        );

        UtilidadesSVG.dibujarCotaVertical(svg,
            offsetX - 30,
            offsetY,
            offsetY + dim.altura * escalaY,
            `H = ${dim.altura.toFixed(2)} m`
        );

        canvas.appendChild(svg);
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CortesEstanque;
}
