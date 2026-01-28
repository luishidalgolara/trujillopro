/* ========================================
   DIBUJO EN CANVAS - CUBIERTAS
   ======================================== */

// Dibujar todas las cubiertas en el canvas
function dibujarCubiertasEnCanvas(ctx) {
    // Dibujar cubiertas finalizadas
    cubiertas.forEach(cubierta => {
        if (!cubierta.puntos || cubierta.puntos.length < 3) return;
        
        // Color según estado: NARANJA si completo, GRIS si incompleto
        const colorLinea = cubierta.completado ? '#e67e22' : '#95a5a6';
        const colorRelleno = cubierta.completado ? 'rgba(230, 126, 34, 0.2)' : 'rgba(149, 165, 166, 0.2)';
        
        // Dibujar polígono relleno
        ctx.fillStyle = colorRelleno;
        ctx.beginPath();
        ctx.moveTo(cubierta.puntos[0].x, cubierta.puntos[0].y);
        for (let i = 1; i < cubierta.puntos.length; i++) {
            ctx.lineTo(cubierta.puntos[i].x, cubierta.puntos[i].y);
        }
        ctx.closePath();
        ctx.fill();
        
        // Dibujar borde
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = cubierta.completado ? 4 : 3;
        ctx.stroke();
        
        // Dibujar puntos
        ctx.fillStyle = colorLinea;
        cubierta.puntos.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // DIBUJAR ETIQUETAS DE NÚMERO DE LADO
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = 3;
        
        for (let i = 0; i < cubierta.puntos.length; i++) {
            const p1 = cubierta.puntos[i];
            const p2 = cubierta.puntos[(i + 1) % cubierta.puntos.length];
            
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
        
        // Dibujar etiqueta de nombre/estado
        const puntoMedio = cubierta.puntos[Math.floor(cubierta.puntos.length / 2)];
        ctx.font = 'bold 14px Arial';
        
        if (cubierta.completado && cubierta.nombre) {
            // CUBIERTA COMPLETA - NARANJA
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, ctx.measureText(cubierta.nombre + ' ✓ OK').width + 10, 22);
            ctx.fillStyle = '#e67e22';
            ctx.fillText(cubierta.nombre + ' ✓ OK', puntoMedio.x + 10, puntoMedio.y - 10);
        } else {
            // CUBIERTA INCOMPLETA - GRIS
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, 150, 22);
            ctx.fillStyle = '#95a5a6';
            ctx.fillText('⚠️ INCOMPLETO', puntoMedio.x + 10, puntoMedio.y - 10);
        }
    });
    
    // Dibujar polígono temporal (en construcción - celeste)
    if (dibujandoCubierta && puntosPoligonoCubierta.length > 0) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(puntosPoligonoCubierta[0].x, puntosPoligonoCubierta[0].y);
        
        // Dibujar segmentos confirmados
        for (let i = 1; i < puntosPoligonoCubierta.length; i++) {
            ctx.lineTo(puntosPoligonoCubierta[i].x, puntosPoligonoCubierta[i].y);
        }
        
        // Dibujar línea temporal hasta el mouse
        if (puntoTemporalMouseCubierta) {
            ctx.lineTo(puntoTemporalMouseCubierta.x, puntoTemporalMouseCubierta.y);
            // Línea de cierre al primer punto
            ctx.lineTo(puntosPoligonoCubierta[0].x, puntosPoligonoCubierta[0].y);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // DIBUJAR ETIQUETAS DE NÚMERO DE LADO EN POLÍGONO TEMPORAL
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        
        // Lados confirmados
        for (let i = 0; i < puntosPoligonoCubierta.length - 1; i++) {
            const p1 = puntosPoligonoCubierta[i];
            const p2 = puntosPoligonoCubierta[i + 1];
            
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
        if (puntoTemporalMouseCubierta && puntosPoligonoCubierta.length > 0) {
            const ultimoPunto = puntosPoligonoCubierta[puntosPoligonoCubierta.length - 1];
            const puntoMedio = {
                x: (ultimoPunto.x + puntoTemporalMouseCubierta.x) / 2,
                y: (ultimoPunto.y + puntoTemporalMouseCubierta.y) / 2
            };
            
            const texto = `Lado ${puntosPoligonoCubierta.length}`;
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
        puntosPoligonoCubierta.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}