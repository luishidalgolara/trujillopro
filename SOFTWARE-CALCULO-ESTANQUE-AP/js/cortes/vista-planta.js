/**
 * VISTA EN PLANTA
 * Genera vista superior del estanque y sala de bombas
 * Versión: 1.0
 */

const VistaPlanta = {
    /**
     * Generar vista en planta completa
     */
    generar: function(canvas, dimensionesEstanque, dimensionesSala) {
        if (!canvas) {
            console.error('Canvas no proporcionado');
            return;
        }

        canvas.innerHTML = '';

        const svg = UtilidadesSVG.crearSVG('0 0 800 500');

        // Título
        UtilidadesSVG.dibujarTexto(svg, 'VISTA EN PLANTA - DISPOSICIÓN GENERAL', 400, 30, 22, 'bold');

        // Calcular escala
        let anchoTotal = dimensionesEstanque ? dimensionesEstanque.largo : 5;
        if (dimensionesSala) {
            anchoTotal += dimensionesSala.ancho + 2;
        }
        
        const escala = 500 / anchoTotal;
        const offsetX = 250; // Aumentado de 150 a 250 para centrar mejor
        const offsetY = 80;  // Ajustado de 100 a 80 para mejor centrado vertical

        // Dibujar estanque
        if (dimensionesEstanque && dimensionesEstanque.largo) {
            this.dibujarEstanque(svg, dimensionesEstanque, escala, offsetX, offsetY);
        }

        // Dibujar sala de bombas
        if (dimensionesSala && dimensionesSala.ancho) {
            this.dibujarSalaBombas(svg, dimensionesSala, dimensionesEstanque, escala, offsetX, offsetY);
        }

        // Leyenda (movida a esquina inferior derecha)
        UtilidadesSVG.dibujarLeyenda(svg, 580, 380);

        canvas.appendChild(svg);
    },

    /**
     * Dibujar estanque en planta
     */
    dibujarEstanque: function(svg, dim, escala, offsetX, offsetY) {
        const estanqueX = offsetX;
        const estanqueY = offsetY + 100;
        
        // Muros externos
        UtilidadesSVG.dibujarRectangulo(svg,
            estanqueX,
            estanqueY,
            (dim.largo + 2 * dim.espesorMuros) * escala,
            (dim.ancho + 2 * dim.espesorMuros) * escala,
            '#CCCCCC',
            '#666',
            3
        );
        
        // Interior (agua)
        UtilidadesSVG.dibujarRectangulo(svg,
            estanqueX + dim.espesorMuros * escala,
            estanqueY + dim.espesorMuros * escala,
            dim.largo * escala,
            dim.ancho * escala,
            UtilidadesSVG.colores.agua,
            '#0066CC',
            2,
            0.4
        );
        
        // Líneas de corte A-A (longitudinal)
        const medioY = estanqueY + (dim.ancho + 2 * dim.espesorMuros) * escala / 2;
        UtilidadesSVG.dibujarLineaCorte(svg,
            estanqueX - 20,
            medioY,
            estanqueX + (dim.largo + 2 * dim.espesorMuros) * escala + 20,
            medioY,
            'A',
            'A'
        );
        
        // Líneas de corte B-B (transversal)
        const medioX = estanqueX + (dim.largo + 2 * dim.espesorMuros) * escala / 2;
        UtilidadesSVG.dibujarLineaCorte(svg,
            medioX,
            estanqueY - 20,
            medioX,
            estanqueY + (dim.ancho + 2 * dim.espesorMuros) * escala + 20,
            'B',
            'B'
        );
        
        // Cotas estanque
        UtilidadesSVG.dibujarCotaHorizontal(svg,
            estanqueX,
            estanqueX + (dim.largo + 2 * dim.espesorMuros) * escala,
            estanqueY - 15,
            `${dim.largo.toFixed(2)} m`
        );
        
        UtilidadesSVG.dibujarCotaVertical(svg,
            estanqueX - 15,
            estanqueY,
            estanqueY + (dim.ancho + 2 * dim.espesorMuros) * escala,
            `${dim.ancho.toFixed(2)} m`
        );
        
        // Etiqueta
        UtilidadesSVG.dibujarTexto(svg, 'ESTANQUE', 
            estanqueX + (dim.largo + 2 * dim.espesorMuros) * escala / 2,
            estanqueY + (dim.ancho + 2 * dim.espesorMuros) * escala / 2,
            18, 'bold', 'middle');
    },

    /**
     * Dibujar sala de bombas en planta
     */
    dibujarSalaBombas: function(svg, dimS, dim, escala, offsetX, offsetY) {
        const salaX = offsetX - (dimS.ancho * escala) - 30;
        const salaY = offsetY + 100;
        
        // Paredes sala
        UtilidadesSVG.dibujarRectangulo(svg,
            salaX,
            salaY,
            dimS.ancho * escala,
            dimS.profundidad * escala,
            '#F0E6D2',
            '#8B7355',
            3
        );
        
        // Puerta
        const puertaAncho = 1.2 * escala;
        const puertaY = salaY + dimS.profundidad * escala - 0.5;
        UtilidadesSVG.dibujarRectangulo(svg,
            salaX + (dimS.ancho * escala - puertaAncho) / 2,
            puertaY,
            puertaAncho,
            8,
            UtilidadesSVG.colores.puerta,
            '#333',
            2
        );
        
        // Bombas (círculos)
        const numBombas = 2;
        for (let i = 0; i < numBombas; i++) {
            const bombaX = salaX + dimS.ancho * escala / (numBombas + 1) * (i + 1);
            const bombaY = salaY + dimS.profundidad * escala / 3;
            
            UtilidadesSVG.dibujarCirculo(svg, bombaX, bombaY, 12, UtilidadesSVG.colores.bomba, '#CC4A2A', 2);
            UtilidadesSVG.dibujarTexto(svg, `B${i + 1}`, bombaX, bombaY, 10, 'bold', 'middle', '#FFF');
        }
        
        // Líneas de corte C-C (longitudinal)
        const medioYS = salaY + dimS.profundidad * escala / 2;
        UtilidadesSVG.dibujarLineaCorte(svg,
            salaX - 20,
            medioYS,
            salaX + dimS.ancho * escala + 20,
            medioYS,
            'C',
            'C'
        );
        
        // Líneas de corte D-D (transversal)
        const medioXS = salaX + dimS.ancho * escala / 2;
        UtilidadesSVG.dibujarLineaCorte(svg,
            medioXS,
            salaY - 20,
            medioXS,
            salaY + dimS.profundidad * escala + 20,
            'D',
            'D'
        );
        
        // Cotas sala
        UtilidadesSVG.dibujarCotaHorizontal(svg,
            salaX,
            salaX + dimS.ancho * escala,
            salaY - 15,
            `${dimS.ancho.toFixed(2)} m`
        );
        
        UtilidadesSVG.dibujarCotaVertical(svg,
            salaX - 15,
            salaY,
            salaY + dimS.profundidad * escala,
            `${dimS.profundidad.toFixed(2)} m`
        );
        
        // Etiqueta
        UtilidadesSVG.dibujarTexto(svg, 'SALA BOMBAS',
            salaX + dimS.ancho * escala / 2,
            salaY + dimS.profundidad * escala + 30,
            14, 'bold', 'middle');
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VistaPlanta;
}