/* ========================================
   DIBUJO EN CANVAS - RADIER
   ======================================== */

function redibujarCanvasRadier() {
    if (typeof redibujarCanvasGlobal === 'function') {
        redibujarCanvasGlobal();
    }
}

function dibujarRadieresEnCanvas(ctx) {
    // Dibujar radieres finalizados
    radieres.forEach(radier => {
        if (!radier.puntos || radier.puntos.length < 3) return;
        
        const colorRelleno = radier.completado ? 'rgba(52, 152, 219, 0.3)' : 'rgba(149, 165, 166, 0.3)';
        const colorLinea = radier.completado ? '#3498db' : '#95a5a6';
        
        // Rellenar polígono
        ctx.fillStyle = colorRelleno;
        ctx.beginPath();
        ctx.moveTo(radier.puntos[0].x, radier.puntos[0].y);
        for (let i = 1; i < radier.puntos.length; i++) {
            ctx.lineTo(radier.puntos[i].x, radier.puntos[i].y);
        }
        ctx.closePath();
        ctx.fill();
        
        // Dibujar borde
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Dibujar puntos
        ctx.fillStyle = colorLinea;
        radier.puntos.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // ========================================
        // DIBUJAR ETIQUETAS DE NÚMERO DE LADO
        // ========================================
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = 3;
        
        for (let i = 0; i < radier.puntos.length; i++) {
            const p1 = radier.puntos[i];
            const p2 = radier.puntos[(i + 1) % radier.puntos.length];
            
            // Calcular punto medio del lado
            const puntoMedio = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            
            const texto = `Lado ${i + 1}`;
            const medida = ctx.measureText(texto);
            
            // Fondo para el texto
            ctx.fillStyle = colorLinea;
            ctx.fillRect(puntoMedio.x - medida.width/2 - 4, puntoMedio.y - 10, medida.width + 8, 18);
            
            // Texto
            ctx.fillStyle = 'white';
            ctx.fillText(texto, puntoMedio.x - medida.width/2, puntoMedio.y + 4);
        }
        
        // Etiqueta de nombre/estado en el centro
        const centroX = radier.puntos.reduce((sum, p) => sum + p.x, 0) / radier.puntos.length;
        const centroY = radier.puntos.reduce((sum, p) => sum + p.y, 0) / radier.puntos.length;
        
        ctx.font = 'bold 14px Arial';
        
        if (radier.completado && radier.nombre) {
            // RADIER COMPLETO - AZUL
            ctx.fillStyle = 'white';
            ctx.fillRect(centroX - 50, centroY - 25, ctx.measureText(radier.nombre + ' ✓ OK').width + 10, 22);
            ctx.fillStyle = '#3498db';
            ctx.fillText(radier.nombre + ' ✓ OK', centroX - 45, centroY - 10);
        } else {
            // RADIER INCOMPLETO - GRIS
            ctx.fillStyle = 'white';
            ctx.fillRect(centroX - 50, centroY - 25, 150, 22);
            ctx.fillStyle = '#95a5a6';
            ctx.fillText('⚠️ INCOMPLETO', centroX - 45, centroY - 10);
        }
    });
    
    // Dibujar polígono temporal (en construcción - celeste)
    if (dibujandoRadier && puntosPoligonoRadier.length > 0) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(puntosPoligonoRadier[0].x, puntosPoligonoRadier[0].y);
        
        for (let i = 1; i < puntosPoligonoRadier.length; i++) {
            ctx.lineTo(puntosPoligonoRadier[i].x, puntosPoligonoRadier[i].y);
        }
        
        if (puntoTemporalMouseRadier) {
            ctx.lineTo(puntoTemporalMouseRadier.x, puntoTemporalMouseRadier.y);
            ctx.lineTo(puntosPoligonoRadier[0].x, puntosPoligonoRadier[0].y);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // ========================================
        // DIBUJAR ETIQUETAS EN POLÍGONO TEMPORAL
        // ========================================
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        
        // Lados confirmados
        for (let i = 0; i < puntosPoligonoRadier.length - 1; i++) {
            const p1 = puntosPoligonoRadier[i];
            const p2 = puntosPoligonoRadier[i + 1];
            
            const puntoMedio = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
            
            const texto = `Lado ${i + 1}`;
            const medida = ctx.measureText(texto);
            
            // Fondo
            ctx.fillStyle = '#3498db';
            ctx.fillRect(puntoMedio.x - medida.width/2 - 4, puntoMedio.y - 10, medida.width + 8, 18);
            
            // Texto
            ctx.fillStyle = 'white';
            ctx.fillText(texto, puntoMedio.x - medida.width/2, puntoMedio.y + 4);
        }
        
        // Lado temporal (desde último punto al mouse)
        if (puntoTemporalMouseRadier && puntosPoligonoRadier.length > 0) {
            const ultimoPunto = puntosPoligonoRadier[puntosPoligonoRadier.length - 1];
            const puntoMedio = {
                x: (ultimoPunto.x + puntoTemporalMouseRadier.x) / 2,
                y: (ultimoPunto.y + puntoTemporalMouseRadier.y) / 2
            };
            
            const texto = `Lado ${puntosPoligonoRadier.length}`;
            const medida = ctx.measureText(texto);
            
            // Fondo semi-transparente
            ctx.fillStyle = 'rgba(52, 152, 219, 0.7)';
            ctx.fillRect(puntoMedio.x - medida.width/2 - 4, puntoMedio.y - 10, medida.width + 8, 18);
            
            // Texto
            ctx.fillStyle = 'white';
            ctx.fillText(texto, puntoMedio.x - medida.width/2, puntoMedio.y + 4);
        }
        
        // Dibujar puntos confirmados
        ctx.fillStyle = '#3498db';
        puntosPoligonoRadier.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}