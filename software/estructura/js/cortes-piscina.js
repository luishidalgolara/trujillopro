/**
 * CORTES TÉCNICOS PARA PISCINA
 * Sistema independiente de dibujo de cortes A-A y B-B
 */

class CortePiscina {
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
     * Dibujar Corte A-A (Vista Longitudinal)
     */
    dibujarCorteAA(datos) {
        this.clear();
        
        const L = datos.L;
        const H = datos.H;
        const e_muro = datos.e_muro;
        const e_fondo = datos.e_fondo;
        
        // Calcular escala para que quepa en el canvas
        const margen = 100;
        const anchoDisponible = this.width - 2 * margen;
        const altoDisponible = this.height - 2 * margen;
        
        const escalaX = anchoDisponible / (L + 0.5);
        const escalaY = altoDisponible / (H + e_fondo + 0.5);
        this.scale = Math.min(escalaX, escalaY);
        
        // Centrar el dibujo
        this.offsetX = (this.width - L * this.scale) / 2;
        this.offsetY = this.height - margen;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE A-A - Vista Longitudinal', this.width / 2, 40);
        
        // Dibujar sección
        this.dibujarSeccionLongitudinal(L, H, e_muro, e_fondo);
        
        // Dibujar acero
        this.dibujarAceroLongitudinal(datos);
        
        // Dimensiones
        this.dibujarDimensionesLongitudinal(L, H, e_muro, e_fondo);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar Corte B-B (Vista Transversal)
     */
    dibujarCorteBB(datos) {
        this.clear();
        
        const A = datos.A;
        const H = datos.H;
        const e_muro = datos.e_muro;
        const e_fondo = datos.e_fondo;
        
        // Calcular escala
        const margen = 100;
        const anchoDisponible = this.width - 2 * margen;
        const altoDisponible = this.height - 2 * margen;
        
        const escalaX = anchoDisponible / (A + 0.5);
        const escalaY = altoDisponible / (H + e_fondo + 0.5);
        this.scale = Math.min(escalaX, escalaY);
        
        // Centrar el dibujo
        this.offsetX = (this.width - A * this.scale) / 2;
        this.offsetY = this.height - margen;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE B-B - Vista Transversal', this.width / 2, 40);
        
        // Dibujar sección (similar pero con ancho A)
        this.dibujarSeccionTransversal(A, H, e_muro, e_fondo);
        
        // Dibujar acero
        this.dibujarAceroTransversal(datos);
        
        // Dimensiones
        this.dibujarDimensionesTransversal(A, H, e_muro, e_fondo);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar sección longitudinal (hormigón)
     */
    dibujarSeccionLongitudinal(L, H, e_muro, e_fondo) {
        const ctx = this.ctx;
        
        // Convertir a coordenadas canvas
        const x1 = this.offsetX;
        const x2 = this.offsetX + L * this.scale;
        const y_fondo = this.offsetY;
        const y_top = this.offsetY - (H + e_fondo) * this.scale;
        
        // Fondo
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(x1, y_fondo - e_fondo * this.scale, L * this.scale, e_fondo * this.scale);
        
        // Muro izquierdo
        ctx.fillRect(x1, y_top, e_muro * this.scale, H * this.scale);
        
        // Muro derecho
        ctx.fillRect(x2 - e_muro * this.scale, y_top, e_muro * this.scale, H * this.scale);
        
        // Agua (transparente azul)
        ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
        const anchoInterior = L - 2 * e_muro;
        ctx.fillRect(
            x1 + e_muro * this.scale,
            y_top,
            anchoInterior * this.scale,
            H * this.scale * 0.9
        );
        
        // Contornos
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y_fondo - e_fondo * this.scale, L * this.scale, e_fondo * this.scale);
        ctx.strokeRect(x1, y_top, e_muro * this.scale, H * this.scale);
        ctx.strokeRect(x2 - e_muro * this.scale, y_top, e_muro * this.scale, H * this.scale);
    }

    /**
     * Dibujar sección transversal (hormigón)
     */
    dibujarSeccionTransversal(A, H, e_muro, e_fondo) {
        const ctx = this.ctx;
        
        // Convertir a coordenadas canvas
        const x1 = this.offsetX;
        const x2 = this.offsetX + A * this.scale;
        const y_fondo = this.offsetY;
        const y_top = this.offsetY - (H + e_fondo) * this.scale;
        
        // Fondo
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(x1, y_fondo - e_fondo * this.scale, A * this.scale, e_fondo * this.scale);
        
        // Muro frontal
        ctx.fillRect(x1, y_top, e_muro * this.scale, H * this.scale);
        
        // Muro trasero
        ctx.fillRect(x2 - e_muro * this.scale, y_top, e_muro * this.scale, H * this.scale);
        
        // Agua (transparente azul)
        ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
        const anchoInterior = A - 2 * e_muro;
        ctx.fillRect(
            x1 + e_muro * this.scale,
            y_top,
            anchoInterior * this.scale,
            H * this.scale * 0.9
        );
        
        // Contornos
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y_fondo - e_fondo * this.scale, A * this.scale, e_fondo * this.scale);
        ctx.strokeRect(x1, y_top, e_muro * this.scale, H * this.scale);
        ctx.strokeRect(x2 - e_muro * this.scale, y_top, e_muro * this.scale, H * this.scale);
    }

    /**
     * Dibujar acero en corte longitudinal
     */
    dibujarAceroLongitudinal(datos) {
        const ctx = this.ctx;
        const L = datos.L;
        const H = datos.H;
        const e_muro = datos.e_muro;
        const e_fondo = datos.e_fondo;
        
        const x1 = this.offsetX;
        const x2 = this.offsetX + L * this.scale;
        const y_fondo = this.offsetY;
        const y_top = this.offsetY - (H + e_fondo) * this.scale;
        
        const radioBarraFondo = 3;
        const radioBarra = 4;
        
        // Barras del fondo (rojas) - horizontales
        ctx.fillStyle = '#e74c3c';
        const numBarrasFondo = 8;
        for (let i = 0; i < numBarrasFondo; i++) {
            const x = x1 + (i / (numBarrasFondo - 1)) * L * this.scale;
            ctx.beginPath();
            ctx.arc(x, y_fondo - e_fondo * this.scale / 2, radioBarraFondo, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Barras verticales muros (azules)
        ctx.fillStyle = '#3498db';
        const espacioVert = 0.15;
        const numBarrasVert = Math.floor(H / espacioVert);
        
        // Muro izquierdo
        for (let i = 0; i <= numBarrasVert; i++) {
            const y = y_top + (i * espacioVert * this.scale);
            ctx.beginPath();
            ctx.arc(x1 + e_muro * this.scale / 2, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
            
            // Gancho superior
            if (i === 0) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x1 + e_muro * this.scale / 2, y);
                ctx.lineTo(x1 - 0.15 * this.scale, y);
                ctx.stroke();
            }
        }
        
        // Muro derecho
        for (let i = 0; i <= numBarrasVert; i++) {
            const y = y_top + (i * espacioVert * this.scale);
            ctx.beginPath();
            ctx.arc(x2 - e_muro * this.scale / 2, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
            
            // Gancho superior
            if (i === 0) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x2 - e_muro * this.scale / 2, y);
                ctx.lineTo(x2 + 0.15 * this.scale, y);
                ctx.stroke();
            }
        }
        
        // Anclajes del fondo hacia muros
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        
        // Izquierdo
        ctx.beginPath();
        ctx.moveTo(x1 + e_muro * this.scale, y_fondo - e_fondo * this.scale / 2);
        ctx.lineTo(x1 + e_muro * this.scale, y_fondo - e_fondo * this.scale - 0.3 * this.scale);
        ctx.stroke();
        
        // Derecho
        ctx.beginPath();
        ctx.moveTo(x2 - e_muro * this.scale, y_fondo - e_fondo * this.scale / 2);
        ctx.lineTo(x2 - e_muro * this.scale, y_fondo - e_fondo * this.scale - 0.3 * this.scale);
        ctx.stroke();
    }

    /**
     * Dibujar acero en corte transversal
     */
    dibujarAceroTransversal(datos) {
        const ctx = this.ctx;
        const A = datos.A;
        const H = datos.H;
        const e_muro = datos.e_muro;
        const e_fondo = datos.e_fondo;
        
        const x1 = this.offsetX;
        const x2 = this.offsetX + A * this.scale;
        const y_fondo = this.offsetY;
        const y_top = this.offsetY - (H + e_fondo) * this.scale;
        
        const radioBarraFondo = 3;
        const radioBarra = 4;
        
        // Barras del fondo (verdes) - transversales
        ctx.fillStyle = '#27ae60';
        const numBarrasFondo = 8;
        for (let i = 0; i < numBarrasFondo; i++) {
            const x = x1 + (i / (numBarrasFondo - 1)) * A * this.scale;
            ctx.beginPath();
            ctx.arc(x, y_fondo - e_fondo * this.scale / 2, radioBarraFondo, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Barras verticales muros (azules)
        ctx.fillStyle = '#3498db';
        const espacioVert = 0.15;
        const numBarrasVert = Math.floor(H / espacioVert);
        
        // Muro frontal
        for (let i = 0; i <= numBarrasVert; i++) {
            const y = y_top + (i * espacioVert * this.scale);
            ctx.beginPath();
            ctx.arc(x1 + e_muro * this.scale / 2, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
            
            // Gancho superior
            if (i === 0) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x1 + e_muro * this.scale / 2, y);
                ctx.lineTo(x1 - 0.15 * this.scale, y);
                ctx.stroke();
            }
        }
        
        // Muro trasero
        for (let i = 0; i <= numBarrasVert; i++) {
            const y = y_top + (i * espacioVert * this.scale);
            ctx.beginPath();
            ctx.arc(x2 - e_muro * this.scale / 2, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
            
            // Gancho superior
            if (i === 0) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x2 - e_muro * this.scale / 2, y);
                ctx.lineTo(x2 + 0.15 * this.scale, y);
                ctx.stroke();
            }
        }
        
        // Anclajes del fondo hacia muros
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        
        // Frontal
        ctx.beginPath();
        ctx.moveTo(x1 + e_muro * this.scale, y_fondo - e_fondo * this.scale / 2);
        ctx.lineTo(x1 + e_muro * this.scale, y_fondo - e_fondo * this.scale - 0.3 * this.scale);
        ctx.stroke();
        
        // Trasero
        ctx.beginPath();
        ctx.moveTo(x2 - e_muro * this.scale, y_fondo - e_fondo * this.scale / 2);
        ctx.lineTo(x2 - e_muro * this.scale, y_fondo - e_fondo * this.scale - 0.3 * this.scale);
        ctx.stroke();
    }

    /**
     * Dibujar dimensiones longitudinales
     */
    dibujarDimensionesLongitudinal(L, H, e_muro, e_fondo) {
        const ctx = this.ctx;
        
        const x1 = this.offsetX;
        const x2 = this.offsetX + L * this.scale;
        const y_fondo = this.offsetY;
        const y_top = this.offsetY - (H + e_fondo) * this.scale;
        
        ctx.strokeStyle = '#2c3e50';
        ctx.fillStyle = '#2c3e50';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        
        // Dimensión L (largo total)
        const y_dim_L = y_fondo + 30;
        this.dibujarLineaDimension(x1, y_dim_L, x2, y_dim_L, `L = ${L.toFixed(2)} m`);
        
        // Dimensión H (altura)
        const x_dim_H = x2 + 40;
        this.dibujarLineaDimension(x_dim_H, y_top, x_dim_H, y_fondo - e_fondo * this.scale, `H = ${H.toFixed(2)} m`);
        
        // Espesor muro
        ctx.font = '12px Arial';
        ctx.fillText(`e = ${(e_muro * 100).toFixed(0)} cm`, x1 + e_muro * this.scale / 2, y_top - 10);
        
        // Espesor fondo
        ctx.fillText(`e = ${(e_fondo * 100).toFixed(0)} cm`, x1 + L * this.scale / 2, y_fondo - e_fondo * this.scale / 2);
    }

    /**
     * Dibujar dimensiones transversales
     */
    dibujarDimensionesTransversal(A, H, e_muro, e_fondo) {
        const ctx = this.ctx;
        
        const x1 = this.offsetX;
        const x2 = this.offsetX + A * this.scale;
        const y_fondo = this.offsetY;
        const y_top = this.offsetY - (H + e_fondo) * this.scale;
        
        ctx.strokeStyle = '#2c3e50';
        ctx.fillStyle = '#2c3e50';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        
        // Dimensión A (ancho total)
        const y_dim_A = y_fondo + 30;
        this.dibujarLineaDimension(x1, y_dim_A, x2, y_dim_A, `A = ${A.toFixed(2)} m`);
        
        // Dimensión H (altura)
        const x_dim_H = x2 + 40;
        this.dibujarLineaDimension(x_dim_H, y_top, x_dim_H, y_fondo - e_fondo * this.scale, `H = ${H.toFixed(2)} m`);
        
        // Espesor muro
        ctx.font = '12px Arial';
        ctx.fillText(`e = ${(e_muro * 100).toFixed(0)} cm`, x1 + e_muro * this.scale / 2, y_top - 10);
        
        // Espesor fondo
        ctx.fillText(`e = ${(e_fondo * 100).toFixed(0)} cm`, x1 + A * this.scale / 2, y_fondo - e_fondo * this.scale / 2);
    }

    /**
     * Dibujar línea de dimensión con flechas
     */
    dibujarLineaDimension(x1, y1, x2, y2, texto) {
        const ctx = this.ctx;
        
        // Línea principal
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Flechas
        const tamFlecha = 8;
        
        if (x1 === x2) { // Vertical
            // Flecha superior
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 - tamFlecha/2, y1 + tamFlecha);
            ctx.lineTo(x1 + tamFlecha/2, y1 + tamFlecha);
            ctx.closePath();
            ctx.fill();
            
            // Flecha inferior
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - tamFlecha/2, y2 - tamFlecha);
            ctx.lineTo(x2 + tamFlecha/2, y2 - tamFlecha);
            ctx.closePath();
            ctx.fill();
            
            // Texto (rotado)
            ctx.save();
            ctx.translate(x1 + 20, (y1 + y2) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(texto, 0, 0);
            ctx.restore();
        } else { // Horizontal
            // Flecha izquierda
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + tamFlecha, y1 - tamFlecha/2);
            ctx.lineTo(x1 + tamFlecha, y1 + tamFlecha/2);
            ctx.closePath();
            ctx.fill();
            
            // Flecha derecha
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - tamFlecha, y2 - tamFlecha/2);
            ctx.lineTo(x2 - tamFlecha, y2 + tamFlecha/2);
            ctx.closePath();
            ctx.fill();
            
            // Texto
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
        const lineHeight = 25;
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'left';
        ctx.fillText('ARMADURA:', x, y);
        
        ctx.font = '12px Arial';
        let yPos = y + lineHeight;
        
        // Acero muros
        if (datos.dist_muro) {
            ctx.fillStyle = '#3498db';
            ctx.fillText(`● Muros verticales: φ${datos.dist_muro.diametro} @ ${datos.dist_muro.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
        }
        
        // Acero fondo
        if (datos.dist_fondo) {
            ctx.fillStyle = '#e74c3c';
            ctx.fillText(`● Fondo (longitudinal): φ${datos.dist_fondo.diametro} @ 12 cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#27ae60';
            ctx.fillText(`● Fondo (transversal): φ${datos.dist_fondo.diametro} @ 12 cm`, x, yPos);
            yPos += lineHeight;
        }
        
        // Acero temperatura
        if (datos.dist_temp) {
            ctx.fillStyle = '#95a5a6';
            ctx.fillText(`● Temperatura exterior: φ${datos.dist_temp.diametro} @ ${datos.dist_temp.espaciamiento} cm`, x, yPos);
        }
    }
}