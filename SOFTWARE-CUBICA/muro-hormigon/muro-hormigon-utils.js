/* ========================================
   UTILIDADES - MUROS DE HORMIGÓN
   ======================================== */

// Obtener posición del mouse en el canvas con precisión
function obtenerPosicionCanvas(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

// Calcular distancia entre dos puntos
function calcularDistancia(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Verificar si un punto está cerca de una línea
function puntoEnLinea(punto, inicio, fin, tolerancia) {
    const dist = distanciaPuntoLinea(punto, inicio, fin);
    return dist < tolerancia;
}

// Calcular distancia de punto a línea
function distanciaPuntoLinea(punto, inicio, fin) {
    const A = punto.x - inicio.x;
    const B = punto.y - inicio.y;
    const C = fin.x - inicio.x;
    const D = fin.y - inicio.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;
    
    let xx, yy;
    
    if (param < 0) {
        xx = inicio.x;
        yy = inicio.y;
    } else if (param > 1) {
        xx = fin.x;
        yy = fin.y;
    } else {
        xx = inicio.x + param * C;
        yy = inicio.y + param * D;
    }
    
    const dx = punto.x - xx;
    const dy = punto.y - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
}

// Calcular volumen del muro
function calcularVolumenMuro(largo, altura, espesor) {
    return largo * altura * espesor;
}
