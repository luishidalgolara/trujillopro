/* ========================================
   DIBUJO EN CANVAS - TABIQUERÍA
   ======================================== */

// Función para redibujar canvas (ahora usa función global)
function redibujarCanvas() {
    if (typeof redibujarCanvasGlobal === 'function') {
        redibujarCanvasGlobal();
    }
}

// Dibujar todos los tabiques en el canvas
function dibujarTabiquesEnCanvas(ctx) {
    // Dibujar tabiques finalizados (polilíneas)
    tabiques.forEach(tabique => {
        if (!tabique.puntos || tabique.puntos.length < 2) return;
        
        // Color según estado: VERDE si completo, NARANJA si incompleto
        const colorLinea = tabique.completado ? '#27ae60' : '#f39c12';
        const colorPuntos = tabique.completado ? '#27ae60' : '#f39c12';
        
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = tabique.completado ? 6 : 5;
        ctx.beginPath();
        ctx.moveTo(tabique.puntos[0].x, tabique.puntos[0].y);
        
        // Dibujar todos los segmentos
        for (let i = 1; i < tabique.puntos.length; i++) {
            ctx.lineTo(tabique.puntos[i].x, tabique.puntos[i].y);
        }
        ctx.stroke();
        
        // Dibujar puntos de la polilínea
        ctx.fillStyle = colorPuntos;
        tabique.puntos.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Dibujar etiqueta del tabique
        const puntoMedio = tabique.puntos[Math.floor(tabique.puntos.length / 2)];
        ctx.font = 'bold 14px Arial';
        
        if (tabique.completado && tabique.nombre) {
            // TABIQUE COMPLETO - VERDE
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, ctx.measureText(tabique.nombre + ' ✓ OK').width + 10, 22);
            ctx.fillStyle = '#27ae60';
            ctx.fillText(tabique.nombre + ' ✓ OK', puntoMedio.x + 10, puntoMedio.y - 10);
        } else {
            // TABIQUE INCOMPLETO - NARANJA
            ctx.fillStyle = 'white';
            ctx.fillRect(puntoMedio.x + 5, puntoMedio.y - 25, 150, 22);
            ctx.fillStyle = '#f39c12';
            ctx.fillText('⚠️ INCOMPLETO', puntoMedio.x + 10, puntoMedio.y - 10);
        }
    });
    
    // Dibujar polilínea temporal (en construcción - azul)
    if (dibujandoTabique && puntosPolilineaTabique.length > 0) {
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(puntosPolilineaTabique[0].x, puntosPolilineaTabique[0].y);
        
        // Dibujar segmentos confirmados
        for (let i = 1; i < puntosPolilineaTabique.length; i++) {
            ctx.lineTo(puntosPolilineaTabique[i].x, puntosPolilineaTabique[i].y);
        }
        
        // Dibujar línea temporal hasta el mouse
        if (puntoTemporalMouseTabique) {
            ctx.lineTo(puntoTemporalMouseTabique.x, puntoTemporalMouseTabique.y);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar puntos confirmados
        ctx.fillStyle = '#3498db';
        puntosPolilineaTabique.forEach(punto => {
            ctx.beginPath();
            ctx.arc(punto.x, punto.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}
