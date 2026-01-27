/**
 * ZAPATA-CORRIDA-CORTES.JS
 * Sistema independiente de cortes técnicos A-A y B-B para zapata corrida
 */

class CorteZapataCorrida {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas ${canvasId} no encontrado`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Dibujar Corte A-A (Vista Longitudinal - a lo largo del muro)
     */
    dibujarCorteAA(datos) {
        this.clear();
        
        const B = datos.B;
        const h = datos.h;
        const L = datos.L;
        const bMuro = datos.bMuro;
        const Df = datos.Df || 1.5;
        
        // Calcular escala (dejando espacio para leyenda)
        const margenIzq = 250;
        const margenDer = 80;
        const margenVert = 80;
        const anchoDisponible = this.width - margenIzq - margenDer;
        const altoDisponible = this.height - 2 * margenVert;
        
        const escalaX = anchoDisponible / (L + 1.0);
        const escalaY = altoDisponible / (Df + h + 1.5);
        this.scale = Math.min(escalaX, escalaY);
        
        this.offsetX = margenIzq;
        this.offsetY = this.height - margenVert;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE A-A - Vista Longitudinal (Perfil del Muro)', this.width / 2, 40);
        
        // Dibujar sección
        this.dibujarSeccionLongitudinal(B, h, L, bMuro, Df);
        
        // Dibujar acero
        this.dibujarAceroLongitudinal(datos, B, h, L, bMuro, Df);
        
        // Dimensiones
        this.dibujarDimensionesLongitudinal(B, h, L, bMuro, Df);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar Corte B-B (Vista Transversal - perpendicular al muro)
     */
    dibujarCorteBB(datos) {
        this.clear();
        
        const B = datos.B;
        const h = datos.h;
        const bMuro = datos.bMuro;
        const Df = datos.Df || 1.5;
        
        // Calcular escala
        const margenIzq = 250;
        const margenDer = 80;
        const margenVert = 80;
        const anchoDisponible = this.width - margenIzq - margenDer;
        const altoDisponible = this.height - 2 * margenVert;
        
        const escalaX = anchoDisponible / (B + 1.0);
        const escalaY = altoDisponible / (Df + h + 1.5);
        this.scale = Math.min(escalaX, escalaY);
        
        this.offsetX = margenIzq;
        this.offsetY = this.height - margenVert;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE B-B - Vista Transversal', this.width / 2, 40);
        
        // Dibujar sección
        this.dibujarSeccionTransversal(B, h, bMuro, Df);
        
        // Dibujar acero
        this.dibujarAceroTransversal(datos, B, h, bMuro, Df);
        
        // Dimensiones
        this.dibujarDimensionesTransversal(B, h, bMuro, Df);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar sección longitudinal (hormigón) - Vista a lo largo
     */
    dibujarSeccionLongitudinal(B, h, L, bMuro, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_superficie = this.offsetY - Df * this.scale;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        
        // SUELO (marrón)
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(
            x_inicio - 0.5 * this.scale,
            y_superficie,
            (L + 1.0) * this.scale,
            Df * this.scale
        );
        
        // Línea de superficie
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(x_inicio - 0.5 * this.scale, y_superficie);
        ctx.lineTo(x_inicio + (L + 0.5) * this.scale, y_superficie);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // ZAPATA (gris claro)
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(
            x_inicio,
            y_top_zapata,
            L * this.scale,
            h * this.scale
        );
        
        // Contorno zapata
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            x_inicio,
            y_top_zapata,
            L * this.scale,
            h * this.scale
        );
        
        // MURO (gris medio) - 1 metro de alto
        const alturaMuro = 1.0;
        const x_muro = x_inicio;
        
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(
            x_muro,
            y_top_zapata - alturaMuro * this.scale,
            L * this.scale,
            alturaMuro * this.scale
        );
        
        ctx.strokeRect(
            x_muro,
            y_top_zapata - alturaMuro * this.scale,
            L * this.scale,
            alturaMuro * this.scale
        );
        
        // Etiqueta Nivel de Suelo
        ctx.font = 'italic 12px Arial';
        ctx.fillStyle = '#654321';
        ctx.textAlign = 'left';
        ctx.fillText('N.S. (Nivel de Suelo)', x_inicio - 0.4 * this.scale, y_superficie - 10);
        
        // Etiqueta espesor muro
        ctx.font = '11px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.fillText(`t = ${(bMuro * 100).toFixed(0)} cm`, x_inicio + L * this.scale / 2 - 30, y_top_zapata - alturaMuro * this.scale / 2);
    }

    /**
     * Dibujar sección transversal (hormigón) - Vista perpendicular
     */
    dibujarSeccionTransversal(B, h, bMuro, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_superficie = this.offsetY - Df * this.scale;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        
        // SUELO
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(
            x_inicio - 0.5 * this.scale,
            y_superficie,
            (B + 1.0) * this.scale,
            Df * this.scale
        );
        
        // Línea de superficie
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(x_inicio - 0.5 * this.scale, y_superficie);
        ctx.lineTo(x_inicio + (B + 0.5) * this.scale, y_superficie);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // ZAPATA
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(
            x_inicio,
            y_top_zapata,
            B * this.scale,
            h * this.scale
        );
        
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            x_inicio,
            y_top_zapata,
            B * this.scale,
            h * this.scale
        );
        
        // MURO (centrado)
        const alturaMuro = 1.0;
        const x_muro = x_inicio + (B - bMuro) / 2 * this.scale;
        
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(
            x_muro,
            y_top_zapata - alturaMuro * this.scale,
            bMuro * this.scale,
            alturaMuro * this.scale
        );
        
        ctx.strokeRect(
            x_muro,
            y_top_zapata - alturaMuro * this.scale,
            bMuro * this.scale,
            alturaMuro * this.scale
        );
        
        // Etiqueta Nivel de Suelo
        ctx.font = 'italic 12px Arial';
        ctx.fillStyle = '#654321';
        ctx.textAlign = 'left';
        ctx.fillText('N.S. (Nivel de Suelo)', x_inicio - 0.4 * this.scale, y_superficie - 10);
    }

    /**
     * Dibujar acero en corte longitudinal
     */
    dibujarAceroLongitudinal(datos, B, h, L, bMuro, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        
        const recubrimiento = 0.07;
        const radioBarra = 4;
        
        // Espaciamiento del acero longitudinal (amarillo)
        const espaciamientoLong = 0.15;
        const numBarrasLong = Math.floor(L / espaciamientoLong);
        
        // ========================================
        // BARRAS LONGITUDINALES (AMARILLAS - a lo largo)
        // Se ven como círculos (vista frontal)
        // ========================================
        ctx.fillStyle = '#FFD700';
        const y_acero_inf = y_fondo_zapata - recubrimiento * this.scale - 0.01 * this.scale;
        
        for (let i = 0; i < numBarrasLong; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamientoLong * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_inf, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // ========================================
        // BARRAS TRANSVERSALES (AZULES - perpendiculares)
        // Se ven como líneas horizontales (vista de canto)
        // ========================================
        ctx.strokeStyle = '#0099ff';
        ctx.lineWidth = 3;
        const espaciamientoTrans = 0.20;
        const numBarrasTrans = Math.floor(L / espaciamientoTrans);
        
        for (let i = 0; i < numBarrasTrans; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamientoTrans * this.scale);
            
            ctx.beginPath();
            ctx.moveTo(x, y_acero_inf + 0.015 * this.scale);
            ctx.lineTo(x + B * 0.1 * this.scale, y_acero_inf + 0.015 * this.scale);
            ctx.stroke();
        }
        
        // ========================================
        // BARRAS VERTICALES DEL MURO (ROJAS)
        // ========================================
        ctx.fillStyle = '#ff0000';
        const alturaMuro = 1.0;
        const espaciamientoMuro = 0.20;
        const numBarrasMuro = Math.floor(L / espaciamientoMuro);
        
        for (let i = 0; i < numBarrasMuro; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamientoMuro * this.scale);
            
            // Barra vertical
            ctx.fillRect(
                x - 1.5,
                y_top_zapata - alturaMuro * this.scale - 0.2 * this.scale,
                3,
                alturaMuro * this.scale + 0.2 * this.scale
            );
        }
        
        // ========================================
        // ESTRIBOS HORIZONTALES (VERDES)
        // ========================================
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2.5;
        const numEstribos = 6;
        const espacioEstribo = alturaMuro / (numEstribos + 1);
        
        for (let i = 1; i <= numEstribos; i++) {
            const y = y_top_zapata - (i * espacioEstribo * this.scale);
            
            ctx.beginPath();
            ctx.moveTo(x_inicio + recubrimiento * this.scale, y);
            ctx.lineTo(x_inicio + L * this.scale - recubrimiento * this.scale, y);
            ctx.stroke();
        }
        
        // ========================================
        // BARRAS DE BORDE AZULES/VIOLETAS
        // ========================================
        ctx.fillStyle = '#6A5ACD';
        const xBordeIzq = x_inicio + 0.10 * this.scale;
        const xBordeDer = x_inicio + L * this.scale - 0.10 * this.scale;
        
        // Barras verticales en bordes (vista frontal)
        for (let i = 0; i < numBarrasMuro; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamientoMuro * this.scale);
            
            // Solo dibujar en los extremos
            if (i < 3 || i > numBarrasMuro - 4) {
                ctx.fillRect(
                    x - 1.5,
                    y_top_zapata - 0.15 * this.scale,
                    3,
                    0.15 * this.scale
                );
            }
        }
    }

    /**
     * Dibujar acero en corte transversal
     */
    dibujarAceroTransversal(datos, B, h, bMuro, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        
        const recubrimiento = 0.07;
        const radioBarra = 4;
        
        const espaciamiento = 0.15;
        const numBarras = Math.floor(B / espaciamiento);
        
        // ========================================
        // BARRAS TRANSVERSALES (AZULES - perpendiculares)
        // ========================================
        ctx.fillStyle = '#0099ff';
        const y_acero_inf = y_fondo_zapata - recubrimiento * this.scale - 0.01 * this.scale;
        
        for (let i = 0; i < numBarras; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamiento * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_inf, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Ganchos en los extremos
        ctx.strokeStyle = '#0099ff';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.moveTo(x_inicio + recubrimiento * this.scale, y_acero_inf);
        ctx.lineTo(x_inicio + recubrimiento * this.scale, y_acero_inf - 0.12 * this.scale);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x_inicio + B * this.scale - recubrimiento * this.scale, y_acero_inf);
        ctx.lineTo(x_inicio + B * this.scale - recubrimiento * this.scale, y_acero_inf - 0.12 * this.scale);
        ctx.stroke();
        
        // ========================================
        // BARRAS LONGITUDINALES (AMARILLAS)
        // Se ven como puntos pequeños (vista de canto)
        // ========================================
        ctx.fillStyle = '#FFD700';
        
        for (let i = 0; i < numBarras; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamiento * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_inf + 0.02 * this.scale, radioBarra * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // ========================================
        // BARRAS VERTICALES DEL MURO (ROJAS) - Agrupadas en el centro
        // ========================================
        const alturaMuro = 1.0;
        const x_muro = x_inicio + (B - bMuro) / 2 * this.scale;
        const numBarrasMuroAncho = 4;
        const anchoGrupo = bMuro * 0.6;
        
        ctx.fillStyle = '#ff0000';
        
        for (let i = 0; i < numBarrasMuroAncho; i++) {
            const x = x_muro + (bMuro * this.scale - anchoGrupo * this.scale) / 2 + (i * anchoGrupo * this.scale / (numBarrasMuroAncho - 1));
            
            ctx.beginPath();
            ctx.arc(x, y_top_zapata - alturaMuro * this.scale / 2, radioBarra * 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // ========================================
        // ESTRIBOS (VERDES) - Rectángulos
        // ========================================
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2.5;
        const numEstribos = 6;
        const espacioEstribo = alturaMuro / (numEstribos + 1);
        
        for (let i = 1; i <= numEstribos; i++) {
            const y = y_top_zapata - (i * espacioEstribo * this.scale);
            
            ctx.strokeRect(
                x_muro + (bMuro * this.scale * 0.1),
                y - 0.04 * this.scale,
                bMuro * this.scale * 0.8,
                0.08 * this.scale
            );
        }
        
        // ========================================
        // BARRAS DE BORDE (AZUL/VIOLETA)
        // ========================================
        ctx.fillStyle = '#6A5ACD';
        const xBordeIzq = x_inicio + 0.10 * this.scale;
        const xBordeDer = x_inicio + B * this.scale - 0.10 * this.scale;
        
        ctx.beginPath();
        ctx.arc(xBordeIzq, y_top_zapata - 0.15 * this.scale / 2, radioBarra, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(xBordeDer, y_top_zapata - 0.15 * this.scale / 2, radioBarra, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Dibujar dimensiones longitudinales
     */
    dibujarDimensionesLongitudinal(B, h, L, bMuro, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        const y_superficie = this.offsetY - Df * this.scale;
        
        ctx.strokeStyle = '#2c3e50';
        ctx.fillStyle = '#2c3e50';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        
        // Dimensión L (largo zapata)
        const y_dim_L = y_fondo_zapata + 30;
        this.dibujarLineaDimension(
            x_inicio,
            y_dim_L,
            x_inicio + L * this.scale,
            y_dim_L,
            `L = ${L.toFixed(2)} m`
        );
        
        // Dimensión h (altura zapata)
        const x_dim_h = x_inicio + L * this.scale + 40;
        this.dibujarLineaDimension(
            x_dim_h,
            y_top_zapata,
            x_dim_h,
            y_fondo_zapata,
            `h = ${h.toFixed(2)} m`
        );
        
        // Dimensión Df (profundidad)
        const x_dim_Df = x_inicio - 40;
        this.dibujarLineaDimension(
            x_dim_Df,
            y_superficie,
            x_dim_Df,
            y_fondo_zapata,
            `Df = ${Df.toFixed(2)} m`
        );
        
        // Altura muro
        const alturaMuro = 1.0;
        ctx.font = '11px Arial';
        ctx.fillText(
            `H = ${alturaMuro.toFixed(2)} m`,
            x_inicio + L * this.scale / 2,
            y_top_zapata - alturaMuro * this.scale / 2
        );
    }

    /**
     * Dibujar dimensiones transversales
     */
    dibujarDimensionesTransversal(B, h, bMuro, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        const y_superficie = this.offsetY - Df * this.scale;
        
        ctx.strokeStyle = '#2c3e50';
        ctx.fillStyle = '#2c3e50';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        
        // Dimensión B (ancho zapata)
        const y_dim_B = y_fondo_zapata + 30;
        this.dibujarLineaDimension(
            x_inicio,
            y_dim_B,
            x_inicio + B * this.scale,
            y_dim_B,
            `B = ${B.toFixed(2)} m`
        );
        
        // Dimensión h
        const x_dim_h = x_inicio + B * this.scale + 40;
        this.dibujarLineaDimension(
            x_dim_h,
            y_top_zapata,
            x_dim_h,
            y_fondo_zapata,
            `h = ${h.toFixed(2)} m`
        );
        
        // Dimensión Df
        const x_dim_Df = x_inicio - 40;
        this.dibujarLineaDimension(
            x_dim_Df,
            y_superficie,
            x_dim_Df,
            y_fondo_zapata,
            `Df = ${Df.toFixed(2)} m`
        );
        
        // Espesor muro
        ctx.font = '11px Arial';
        const x_muro = x_inicio + (B - bMuro) / 2 * this.scale;
        const alturaMuro = 1.0;
        ctx.fillText(
            `t_muro = ${(bMuro * 100).toFixed(0)} cm`,
            x_muro + bMuro * this.scale / 2,
            y_top_zapata - alturaMuro * this.scale / 2
        );
    }

    /**
     * Dibujar línea de dimensión con flechas
     */
    dibujarLineaDimension(x1, y1, x2, y2, texto) {
        const ctx = this.ctx;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        const tamFlecha = 8;
        
        if (x1 === x2) {
            // Vertical
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 - tamFlecha/2, y1 + tamFlecha);
            ctx.lineTo(x1 + tamFlecha/2, y1 + tamFlecha);
            ctx.closePath();
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - tamFlecha/2, y2 - tamFlecha);
            ctx.lineTo(x2 + tamFlecha/2, y2 - tamFlecha);
            ctx.closePath();
            ctx.fill();
            
            ctx.save();
            ctx.translate(x1 + 20, (y1 + y2) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(texto, 0, 0);
            ctx.restore();
        } else {
            // Horizontal
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + tamFlecha, y1 - tamFlecha/2);
            ctx.lineTo(x1 + tamFlecha, y1 + tamFlecha/2);
            ctx.closePath();
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - tamFlecha, y2 - tamFlecha/2);
            ctx.lineTo(x2 - tamFlecha, y2 + tamFlecha/2);
            ctx.closePath();
            ctx.fill();
            
            ctx.fillText(texto, (x1 + x2) / 2, y1 - 10);
        }
    }

    /**
     * Dibujar leyenda del acero
     */
    dibujarLeyendaAcero(datos) {
        const ctx = this.ctx;
        const x = 50;
        const y = 80;
        const lineHeight = 22;
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'left';
        ctx.fillText('ARMADURA:', x, y);
        
        ctx.font = '11px Arial';
        let yPos = y + lineHeight;
        
        if (datos.distribucion) {
            ctx.fillStyle = '#FFD700';
            ctx.fillText(`● Longitudinal (amarillo): ${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#0099ff';
            ctx.fillText(`● Transversal (azul): φ10 @ 20 cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#6A5ACD';
            ctx.fillText(`● Refuerzo bordes (violeta): φ12 @ 20 cm`, x, yPos);
            yPos += lineHeight;
        }
        
        ctx.fillStyle = '#ff0000';
        ctx.fillText(`● Muro vertical (rojo): 4 φ16`, x, yPos);
        yPos += lineHeight;
        
        ctx.fillStyle = '#00ff00';
        ctx.fillText(`● Estribos muro (verde): φ10 @ 15 cm`, x, yPos);
        yPos += lineHeight;
        
        ctx.fillStyle = '#7f8c8d';
        ctx.fillText(`Recubrimiento zapata: 70 mm`, x, yPos);
    }
}