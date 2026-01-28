/* ========================================
   DIBUJO 2D DE VANOS EN CANVAS
   ======================================== */

// Dibujar todos los vanos de un muro
function dibujarVanosEnMuro(ctx, muro) {
    if (!muro.vanos || muro.vanos.length === 0) return;
    
    const espesor = (muro.espesor || 0.15) * 100;
    
    muro.vanos.forEach(vano => {
        dibujarVano2D(ctx, muro, vano, espesor);
    });
}

// Dibujar un vano individual
function dibujarVano2D(ctx, muro, vano, espesor) {
    const segmento = vano.segmento;
    if (segmento >= muro.puntos.length - 1) return;
    
    const p1 = muro.puntos[segmento];
    const p2 = muro.puntos[segmento + 1];
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const longitud = Math.sqrt(dx * dx + dy * dy);
    
    // Calcular posición del vano
    const factor = (vano.distanciaDesdeInicio * 100) / longitud;
    const vanoX = p1.x + dx * factor;
    const vanoY = p1.y + dy * factor;
    
    // Dimensiones en pixels
    const anchoPixels = vano.ancho * 100;
    const altoPixels = vano.alto * 100;
    
    // Ángulo del muro
    const angulo = Math.atan2(dy, dx);
    
    // Color según tipo
    const color = vano.tipo === 'puerta' ? '#3498db' : '#f39c12';
    
    ctx.save();
    ctx.translate(vanoX, vanoY);
    ctx.rotate(angulo);
    
    // Rectángulo del vano
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(-anchoPixels / 2, -espesor / 2, anchoPixels, espesor);
    
    // Borde
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 1;
    ctx.strokeRect(-anchoPixels / 2, -espesor / 2, anchoPixels, espesor);
    
    // Icono
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icono = vano.tipo === 'puerta' ? '🚪' : '🪟';
    ctx.fillText(icono, 0, 0);
    
    // Dimensiones (opcional)
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 10px Arial';
    ctx.fillText(`${vano.ancho}×${vano.alto}`, 0, espesor / 2 + 12);
    
    ctx.restore();
}

// Dibujar vano temporal (durante colocación)
function dibujarVanoTemporal(ctx, muro, posicion, config) {
    if (!posicion) return;
    
    const espesor = (muro.espesor || 0.15) * 100;
    const anchoPixels = config.ancho * 100;
    const altoPixels = config.alto * 100;
    
    const segmento = posicion.segmento;
    const p1 = muro.puntos[segmento];
    const p2 = muro.puntos[segmento + 1];
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angulo = Math.atan2(dy, dx);
    
    const color = config.tipo === 'puerta' ? '#3498db' : '#f39c12';
    
    ctx.save();
    ctx.translate(posicion.x, posicion.y);
    ctx.rotate(angulo);
    
    // Semi-transparente
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(-anchoPixels / 2, -espesor / 2, anchoPixels, espesor);
    
    // Borde punteado
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(-anchoPixels / 2, -espesor / 2, anchoPixels, espesor);
    ctx.setLineDash([]);
    
    // Icono
    ctx.fillStyle = color;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icono = config.tipo === 'puerta' ? '🚪' : '🪟';
    ctx.fillText(icono, 0, 0);
    
    ctx.restore();
}

window.dibujarVanosEnMuro = dibujarVanosEnMuro;
window.dibujarVanoTemporal = dibujarVanoTemporal;