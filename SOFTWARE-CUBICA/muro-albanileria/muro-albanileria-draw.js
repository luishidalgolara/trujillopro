/* ========================================
   DIBUJO EN CANVAS - MUROS DE ALBAÑILERÍA
   ======================================== */

// Función para redibujar canvas (ahora usa función global)
function redibujarCanvasAlbanileria() {
    if (typeof redibujarCanvasGlobal === 'function') {
        redibujarCanvasGlobal();
    }
}

// Dibujar todos los muros en el canvas
function dibujarMurosAlbanileriaEnCanvas(ctx) {
    // Dibujar muros finalizados (polilíneas)
    murosAlbanileria.forEach(muro => {
        if (!muro.puntos || muro.puntos.length < 2) return;
        
        // Color según estado: VERDE si completo, NARANJA si incompleto
        const colorLinea = muro.completado ? '#27ae60' : '#e67e22';
        const colorPuntos = muro.completado ? '#27ae60' : '#e67e22';
        
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = muro.completado ? 6 : 5;
        ctx.beginPath();
        ctx.moveTo(muro.puntos[0].x, muro.puntos[0].y);
        
        // Dibujar todos los segmentos
        for (let i = 1; i < muro.puntos.length; i++) {
            ctx.lineTo(muro.puntos[i].x, muro.puntos[i].y);
        }
        ctx.stroke();
        
        // Dibujar puntos de la polilínea
        ctx.fillStyle = colorPuntos;
        muro.puntos.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Dibujar etiqueta del muro
        const puntoMedio = muro.puntos[Math.floor(muro.puntos.length / 2)];
        ctx.font = 'bold 14px Arial';
        
        if (muro.completado && muro.nombre) {
            // MURO COMPLETO - VERDE
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, ctx.measureText(muro.nombre + ' ✓ OK').width + 10, 22);
            ctx.fillStyle = '#27ae60';
            ctx.fillText(muro.nombre + ' ✓ OK', puntoMedio.x + 10, puntoMedio.y - 10);
        } else {
            // MURO INCOMPLETO - NARANJA
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, 150, 22);
            ctx.fillStyle = '#e67e22';
            ctx.fillText('⚠️ INCOMPLETO', puntoMedio.x + 10, puntoMedio.y - 10);
        }
    });
    
    // Dibujar polilínea temporal (en construcción - azul)
    if (dibujandoMuroAlbanileria && puntosPolilineaAlbanileria.length > 0) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(puntosPolilineaAlbanileria[0].x, puntosPolilineaAlbanileria[0].y);
        
        // Dibujar segmentos confirmados
        for (let i = 1; i < puntosPolilineaAlbanileria.length; i++) {
            ctx.lineTo(puntosPolilineaAlbanileria[i].x, puntosPolilineaAlbanileria[i].y);
        }
        
        // Dibujar línea temporal hasta el mouse
        if (puntoTemporalMouseAlbanileria) {
            ctx.lineTo(puntoTemporalMouseAlbanileria.x, puntoTemporalMouseAlbanileria.y);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar puntos confirmados
        ctx.fillStyle = '#3498db';
        puntosPolilineaAlbanileria.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}