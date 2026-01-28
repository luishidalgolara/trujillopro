/**
 * CORTES DE LA SALA DE BOMBAS
 * Genera cortes longitudinal (C-C) y transversal (D-D) de la sala
 * Versión: 1.0
 */

const CortesSala = {
    /**
     * CORTE C-C: SALA DE BOMBAS LONGITUDINAL
     * Muestra la sala cortada a lo largo (profundidad)
     */
    generarCorteCC: function(canvas, dimensionesSala) {
        if (!canvas || !dimensionesSala) {
            console.error('Canvas o dimensiones no proporcionadas');
            return;
        }

        canvas.innerHTML = '';

        const dim = dimensionesSala;
        if (!dim.altura) {
            UtilidadesSVG.mostrarMensaje(canvas, 'Active la sala de bombas para ver el corte');
            return;
        }

        const svg = UtilidadesSVG.crearSVG();

        const espesorPared = 0.2;
        const escalaX = 450 / (dim.profundidad + 2);
        const escalaY = 280 / (dim.altura + 1);
        const offsetX = 125;
        const offsetY = 60;

        // Título
        UtilidadesSVG.dibujarTexto(svg, 'CORTE C-C - SALA DE BOMBAS VISTA LONGITUDINAL', 350, 30, 20, 'bold');

        // Piso
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY + dim.altura * escalaY,
            dim.profundidad * escalaX,
            espesorPared * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Pared frontal (con puerta)
        const anchoPuerta = 1.2;
        const altoPuerta = 2.2;
        
        // Parte superior sobre puerta
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY,
            dim.profundidad * escalaX,
            (dim.altura - altoPuerta) * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Laterales de puerta
        const anchoPuertaEscalada = (anchoPuerta / dim.profundidad) * dim.profundidad * escalaX;
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY + (dim.altura - altoPuerta) * escalaY,
            (dim.profundidad - anchoPuerta) * escalaX / 2,
            altoPuerta * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX + dim.profundidad * escalaX - (dim.profundidad - anchoPuerta) * escalaX / 2,
            offsetY + (dim.altura - altoPuerta) * escalaY,
            (dim.profundidad - anchoPuerta) * escalaX / 2,
            altoPuerta * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Puerta
        const puertaX = offsetX + (dim.profundidad * escalaX - anchoPuertaEscalada) / 2;
        UtilidadesSVG.dibujarRectangulo(svg,
            puertaX,
            offsetY + (dim.altura - altoPuerta) * escalaY,
            anchoPuertaEscalada,
            altoPuerta * escalaY,
            UtilidadesSVG.colores.puerta,
            '#333',
            2
        );

        // Pared trasera
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY,
            espesorPared * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2,
            0.3
        );

        // Techo
        UtilidadesSVG.dibujarLinea(svg,
            offsetX,
            offsetY,
            offsetX + dim.profundidad * escalaX,
            offsetY,
            '#666',
            3
        );

        // Bombas (representadas como rectángulos)
        const numBombas = 2;
        const espacioBombas = dim.profundidad / (numBombas + 1);
        for (let i = 0; i < numBombas; i++) {
            const bombaX = offsetX + (i + 1) * espacioBombas * escalaX - 15;
            const bombaY = offsetY + dim.altura * escalaY - 40;
            
            UtilidadesSVG.dibujarRectangulo(svg,
                bombaX,
                bombaY,
                30,
                40,
                UtilidadesSVG.colores.bomba,
                '#CC4A2A',
                2
            );
            
            // Etiqueta bomba
            UtilidadesSVG.dibujarTexto(svg, `B${i + 1}`, bombaX + 15, bombaY - 5, 11, 'bold', 'middle');
        }

        // Cotas
        UtilidadesSVG.dibujarCotaHorizontal(svg,
            offsetX,
            offsetX + dim.profundidad * escalaX,
            offsetY + dim.altura * escalaY + espesorPared * escalaY + 30,
            `Profundidad = ${dim.profundidad.toFixed(2)} m`
        );

        UtilidadesSVG.dibujarCotaVertical(svg,
            offsetX - 30,
            offsetY,
            offsetY + dim.altura * escalaY,
            `H = ${dim.altura.toFixed(2)} m`
        );

        canvas.appendChild(svg);
    },

    /**
     * CORTE D-D: SALA DE BOMBAS TRANSVERSAL
     * Muestra la sala cortada por el ancho
     */
    generarCorteDD: function(canvas, dimensionesSala) {
        if (!canvas || !dimensionesSala) {
            console.error('Canvas o dimensiones no proporcionadas');
            return;
        }

        canvas.innerHTML = '';

        const dim = dimensionesSala;
        if (!dim.altura) {
            UtilidadesSVG.mostrarMensaje(canvas, 'Active la sala de bombas para ver el corte');
            return;
        }

        const svg = UtilidadesSVG.crearSVG();

        const espesorPared = 0.2;
        const escalaX = 450 / (dim.ancho + 2);
        const escalaY = 280 / (dim.altura + 1);
        const offsetX = 125;
        const offsetY = 60;

        // Título
        UtilidadesSVG.dibujarTexto(svg, 'CORTE D-D - SALA DE BOMBAS VISTA TRANSVERSAL', 350, 30, 20, 'bold');

        // Piso
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY + dim.altura * escalaY,
            dim.ancho * escalaX,
            espesorPared * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Pared izquierda
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX,
            offsetY,
            espesorPared * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Pared derecha
        UtilidadesSVG.dibujarRectangulo(svg,
            offsetX + (dim.ancho - espesorPared) * escalaX,
            offsetY,
            espesorPared * escalaX,
            dim.altura * escalaY,
            UtilidadesSVG.colores.hormigon,
            '#666',
            2
        );

        // Techo
        UtilidadesSVG.dibujarLinea(svg,
            offsetX,
            offsetY,
            offsetX + dim.ancho * escalaX,
            offsetY,
            '#666',
            3
        );

        // Bombas (vista frontal)
        const numBombas = 2;
        const espacioBombas = dim.ancho / (numBombas + 1);
        for (let i = 0; i < numBombas; i++) {
            const bombaX = offsetX + (i + 1) * espacioBombas * escalaX - 20;
            const bombaY = offsetY + dim.altura * escalaY - 50;
            
            // Base de la bomba
            UtilidadesSVG.dibujarRectangulo(svg,
                bombaX,
                bombaY,
                40,
                50,
                UtilidadesSVG.colores.bomba,
                '#CC4A2A',
                2
            );
            
            // Motor (círculo arriba)
            UtilidadesSVG.dibujarCirculo(svg,
                bombaX + 20,
                bombaY - 15,
                15,
                '#FFB84D',
                '#CC8A2A',
                2
            );
            
            // Tubería de salida
            UtilidadesSVG.dibujarRectangulo(svg,
                bombaX + 15,
                bombaY - 30,
                10,
                15,
                UtilidadesSVG.colores.tuberia,
                '#444',
                1
            );
            
            // Etiqueta
            UtilidadesSVG.dibujarTexto(svg, `B${i + 1}`, bombaX + 20, bombaY + 65, 12, 'bold', 'middle');
        }

        // Tablero eléctrico (en la pared derecha)
        const tableroX = offsetX + (dim.ancho - espesorPared - 0.3) * escalaX;
        const tableroY = offsetY + dim.altura * escalaY / 2 - 30;
        UtilidadesSVG.dibujarRectangulo(svg,
            tableroX,
            tableroY,
            25,
            60,
            '#5A5A5A',
            '#333',
            2
        );
        UtilidadesSVG.dibujarTexto(svg, 'T', tableroX + 12, tableroY + 30, 16, 'bold', 'middle', '#FFF');

        // Cotas
        UtilidadesSVG.dibujarCotaHorizontal(svg,
            offsetX,
            offsetX + dim.ancho * escalaX,
            offsetY + dim.altura * escalaY + espesorPared * escalaY + 30,
            `Ancho = ${dim.ancho.toFixed(2)} m`
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
    module.exports = CortesSala;
}
