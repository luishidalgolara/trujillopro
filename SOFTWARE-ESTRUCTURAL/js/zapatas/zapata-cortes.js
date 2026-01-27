/**
 * ZAPATA-CORTES.JS
 * Sistema independiente de cortes técnicos A-A y B-B para zapata aislada
 */

class CorteZapataAislada {
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
     * Dibujar Corte A-A (Vista en dirección X)
     */
    dibujarCorteAA(datos) {
        this.clear();
        
        const B = datos.B;
        const h = datos.h;
        const c = datos.c;
        const Df = datos.Df || 1.5;
        
        // Calcular escala (dejando espacio para leyenda)
        const margenIzq = 250;
        const margenDer = 80;
        const margenVert = 80;
        const anchoDisponible = this.width - margenIzq - margenDer;
        const altoDisponible = this.height - 2 * margenVert;
        
        const escalaX = anchoDisponible / (B + 1.0);
        const escalaY = altoDisponible / (Df + h + 1.5);
        this.scale = Math.min(escalaX, escalaY);
        
        // Mover el dibujo más a la derecha
        this.offsetX = margenIzq;
        this.offsetY = this.height - margenVert;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE A-A - Vista Longitudinal', this.width / 2, 40);
        
        // Dibujar sección
        this.dibujarSeccionLongitudinal(B, h, c, Df);
        
        // Dibujar acero
        this.dibujarAceroLongitudinal(datos, B, h, c, Df);
        
        // Dimensiones
        this.dibujarDimensionesLongitudinal(B, h, c, Df);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar Corte B-B (Vista en dirección Y - perpendicular)
     */
    dibujarCorteBB(datos) {
        this.clear();
        
        const B = datos.B;
        const h = datos.h;
        const c = datos.c;
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
        
        // Centrar
        this.offsetX = margenIzq;
        this.offsetY = this.height - margenVert;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE B-B - Vista Transversal', this.width / 2, 40);
        
        // Dibujar sección (idéntica por ser zapata cuadrada)
        this.dibujarSeccionTransversal(B, h, c, Df);
        
        // Dibujar acero
        this.dibujarAceroTransversal(datos, B, h, c, Df);
        
        // Dimensiones
        this.dibujarDimensionesTransversal(B, h, c, Df);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar sección longitudinal (hormigón)
     */
    dibujarSeccionLongitudinal(B, h, c, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_superficie = this.offsetY - Df * this.scale;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        
        // SUELO (gris oscuro)
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
        
        // ZAPATA (gris claro)
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(
            x_inicio,
            y_top_zapata,
            B * this.scale,
            h * this.scale
        );
        
        // Contorno zapata
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            x_inicio,
            y_top_zapata,
            B * this.scale,
            h * this.scale
        );
        
        // COLUMNA (azul)
        const alturaColumna = 2.0;
        const x_columna = x_inicio + (B - c) / 2 * this.scale;
        
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(
            x_columna,
            y_top_zapata - alturaColumna * this.scale,
            c * this.scale,
            alturaColumna * this.scale
        );
        
        ctx.strokeRect(
            x_columna,
            y_top_zapata - alturaColumna * this.scale,
            c * this.scale,
            alturaColumna * this.scale
        );
        
        // Etiqueta Nivel de Suelo
        ctx.font = 'italic 12px Arial';
        ctx.fillStyle = '#654321';
        ctx.textAlign = 'left';
        ctx.fillText('N.S. (Nivel de Suelo)', x_inicio - 0.4 * this.scale, y_superficie - 10);
    }

    /**
     * Dibujar sección transversal (idéntica por simetría)
     */
    dibujarSeccionTransversal(B, h, c, Df) {
        // Para zapata cuadrada, es idéntico
        this.dibujarSeccionLongitudinal(B, h, c, Df);
    }

    /**
     * Dibujar acero en corte longitudinal (dirección X)
     */
    dibujarAceroLongitudinal(datos, B, h, c, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        const y_superficie = this.offsetY - Df * this.scale;
        
        const recubrimiento = 0.07; // 7cm
        const radioBarra = 4;
        
        // Espaciamiento del acero
        const espaciamiento = datos.distribucion ? datos.distribucion.espaciamiento / 100 : 0.15;
        const numBarras = Math.floor(B / espaciamiento);
        
        // ========================================
        // BARRAS EN DIRECCIÓN X (AZULES - inferiores)
        // ========================================
        ctx.fillStyle = '#3498db';
        const y_acero_inf = y_fondo_zapata - recubrimiento * this.scale - 0.01 * this.scale;
        
        for (let i = 0; i < numBarras; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamiento * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_inf, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Ganchos en los extremos
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        
        // Gancho izquierdo
        ctx.beginPath();
        ctx.moveTo(x_inicio + recubrimiento * this.scale, y_acero_inf);
        ctx.lineTo(x_inicio + recubrimiento * this.scale, y_acero_inf - 0.12 * this.scale);
        ctx.stroke();
        
        // Gancho derecho
        ctx.beginPath();
        ctx.moveTo(x_inicio + B * this.scale - recubrimiento * this.scale, y_acero_inf);
        ctx.lineTo(x_inicio + B * this.scale - recubrimiento * this.scale, y_acero_inf - 0.12 * this.scale);
        ctx.stroke();
        
        // ========================================
        // BARRAS EN DIRECCIÓN Y (VERDES - superiores, vistas de canto)
        // ========================================
        ctx.fillStyle = '#27ae60';
        const y_acero_sup = y_acero_inf + 0.02 * this.scale; // Ligeramente arriba
        
        // Como van perpendiculares, se ven solo como puntos
        for (let i = 0; i < numBarras; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamiento * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_sup, radioBarra * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // ========================================
        // BARRAS VERTICALES DE COLUMNA (ROJAS)
        // ========================================
        ctx.fillStyle = '#e74c3c';
        const numBarrasCol = 4; // Barras en las esquinas
        const x_columna = x_inicio + (B - c) / 2 * this.scale;
        const alturaColumna = 2.0;
        const recubCol = 0.04;
        
        // Barra esquina izquierda
        ctx.beginPath();
        ctx.arc(
            x_columna + recubCol * this.scale,
            y_top_zapata - alturaColumna * this.scale / 2,
            radioBarra * 1.1,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Barra esquina derecha
        ctx.beginPath();
        ctx.arc(
            x_columna + c * this.scale - recubCol * this.scale,
            y_top_zapata - alturaColumna * this.scale / 2,
            radioBarra * 1.1,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // ========================================
        // ESTRIBOS DE COLUMNA (AMARILLOS)
        // ========================================
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2.5;
        const numEstribos = 5;
        const espacioEstribo = alturaColumna / (numEstribos + 1);
        
        for (let i = 1; i <= numEstribos; i++) {
            const y = y_top_zapata - (i * espacioEstribo * this.scale);
            
            ctx.strokeRect(
                x_columna + recubCol * this.scale * 0.5,
                y - 0.04 * this.scale,
                c * this.scale - recubCol * this.scale,
                0.08 * this.scale
            );
        }
    }

    /**
     * Dibujar acero en corte transversal (dirección Y)
     */
    dibujarAceroTransversal(datos, B, h, c, Df) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_fondo_zapata = this.offsetY;
        const y_top_zapata = y_fondo_zapata - h * this.scale;
        
        const recubrimiento = 0.07;
        const radioBarra = 4;
        
        const espaciamiento = datos.distribucion ? datos.distribucion.espaciamiento / 100 : 0.15;
        const numBarras = Math.floor(B / espaciamiento);
        
        // ========================================
        // BARRAS EN DIRECCIÓN Y (VERDES - inferiores)
        // ========================================
        ctx.fillStyle = '#27ae60';
        const y_acero_inf = y_fondo_zapata - recubrimiento * this.scale - 0.01 * this.scale;
        
        for (let i = 0; i < numBarras; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamiento * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_inf, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Ganchos
        ctx.strokeStyle = '#27ae60';
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
        // BARRAS EN DIRECCIÓN X (AZULES - superiores, vistas de canto)
        // ========================================
        ctx.fillStyle = '#3498db';
        const y_acero_sup = y_acero_inf + 0.02 * this.scale;
        
        for (let i = 0; i < numBarras; i++) {
            const x = x_inicio + recubrimiento * this.scale + (i * espaciamiento * this.scale);
            
            ctx.beginPath();
            ctx.arc(x, y_acero_sup, radioBarra * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Barras de columna y estribos (idénticos)
        const x_columna = x_inicio + (B - c) / 2 * this.scale;
        const alturaColumna = 2.0;
        const recubCol = 0.04;
        
        ctx.fillStyle = '#e74c3c';
        
        ctx.beginPath();
        ctx.arc(
            x_columna + recubCol * this.scale,
            y_top_zapata - alturaColumna * this.scale / 2,
            radioBarra * 1.1,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(
            x_columna + c * this.scale - recubCol * this.scale,
            y_top_zapata - alturaColumna * this.scale / 2,
            radioBarra * 1.1,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2.5;
        const numEstribos = 5;
        const espacioEstribo = alturaColumna / (numEstribos + 1);
        
        for (let i = 1; i <= numEstribos; i++) {
            const y = y_top_zapata - (i * espacioEstribo * this.scale);
            
            ctx.strokeRect(
                x_columna + recubCol * this.scale * 0.5,
                y - 0.04 * this.scale,
                c * this.scale - recubCol * this.scale,
                0.08 * this.scale
            );
        }
    }

    /**
     * Dibujar dimensiones longitudinales
     */
    dibujarDimensionesLongitudinal(B, h, c, Df) {
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
        
        // Dimensión h (altura zapata)
        const x_dim_h = x_inicio + B * this.scale + 40;
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
        
        // Dimensión columna
        const x_columna = x_inicio + (B - c) / 2 * this.scale;
        ctx.font = '11px Arial';
        ctx.fillText(
            `c = ${(c * 100).toFixed(0)} cm`,
            x_columna + c * this.scale / 2,
            y_top_zapata - 10
        );
    }

    /**
     * Dibujar dimensiones transversales
     */
    dibujarDimensionesTransversal(B, h, c, Df) {
        // Idéntico por simetría
        this.dibujarDimensionesLongitudinal(B, h, c, Df);
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
            ctx.fillStyle = '#3498db';
            ctx.fillText(`● Dirección X: ${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#27ae60';
            ctx.fillText(`● Dirección Y: ${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
        }
        
        ctx.fillStyle = '#e74c3c';
        ctx.fillText(`● Columna: 8 φ16 (longitudinal)`, x, yPos);
        yPos += lineHeight;
        
        ctx.fillStyle = '#f39c12';
        ctx.fillText(`● Estribos columna: φ10 @ 12 cm`, x, yPos);
        yPos += lineHeight;
        
        ctx.fillStyle = '#7f8c8d';
        ctx.fillText(`Recubrimiento zapata: 70 mm`, x, yPos);
    }
}