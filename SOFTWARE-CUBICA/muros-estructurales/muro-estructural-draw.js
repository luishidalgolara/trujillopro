/* ========================================
   DIBUJO EN CANVAS - MUROS ESTRUCTURALES
   ======================================== */

// Función para redibujar canvas (usa función global)
function redibujarCanvas() {
    if (typeof redibujarCanvasGlobal === 'function') {
        redibujarCanvasGlobal();
    }
}

// Dibujar todos los muros estructurales en el canvas
function dibujarMurosEstructuralesEnCanvas(ctx) {
    // Dibujar muros finalizados (polilíneas)
    murosEstructurales.forEach(muro => {
        if (!muro.puntos || muro.puntos.length < 2) return;
        
        // Color según estado: AZUL OSCURO si completo, GRIS si incompleto
        const colorLinea = muro.completado ? '#2c3e50' : '#7f8c8d';
        const colorPuntos = muro.completado ? '#2c3e50' : '#7f8c8d';
        
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = muro.completado ? 8 : 6;
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
            ctx.arc(punto.x, punto.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Dibujar etiqueta del muro
        const puntoMedio = muro.puntos[Math.floor(muro.puntos.length / 2)];
        ctx.font = 'bold 14px Arial';
        
        if (muro.completado && muro.nombre) {
            // MURO COMPLETO - AZUL OSCURO
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, ctx.measureText(muro.nombre + ' ✓ OK').width + 10, 22);
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(muro.nombre + ' ✓ OK', puntoMedio.x + 10, puntoMedio.y - 10);
        } else {
            // MURO INCOMPLETO - GRIS
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, 150, 22);
            ctx.fillStyle = '#7f8c8d';
            ctx.fillText('⚠️ INCOMPLETO', puntoMedio.x + 10, puntoMedio.y - 10);
        }
    });
    
    // Dibujar polilínea temporal (en construcción - celeste)
    if (dibujandoMuroEstructural && puntosPolilineaEstructural.length > 0) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(puntosPolilineaEstructural[0].x, puntosPolilineaEstructural[0].y);
        
        // Dibujar segmentos confirmados
        for (let i = 1; i < puntosPolilineaEstructural.length; i++) {
            ctx.lineTo(puntosPolilineaEstructural[i].x, puntosPolilineaEstructural[i].y);
        }
        
        // Dibujar línea temporal hasta el mouse
        if (puntoTemporalMouseEstructural) {
            ctx.lineTo(puntoTemporalMouseEstructural.x, puntoTemporalMouseEstructural.y);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar puntos confirmados
        ctx.fillStyle = '#3498db';
        puntosPolilineaEstructural.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}