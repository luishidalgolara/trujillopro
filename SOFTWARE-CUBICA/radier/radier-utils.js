/* ========================================
   UTILIDADES - RADIER
   ======================================== */

function obtenerPosicionCanvasRadier(event) {
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

function calcularDistanciaRadier(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function puntoEnPoligonoRadier(punto, poligono) {
    let inside = false;
    for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
        const xi = poligono[i].x, yi = poligono[i].y;
        const xj = poligono[j].x, yj = poligono[j].y;
        
        const intersect = ((yi > punto.y) !== (yj > punto.y))
            && (punto.x < (xj - xi) * (punto.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function calcularAreaPoligono(puntos) {
    let area = 0;
    for (let i = 0; i < puntos.length; i++) {
        const j = (i + 1) % puntos.length;
        area += puntos[i].x * puntos[j].y;
        area -= puntos[j].x * puntos[i].y;
    }
    return Math.abs(area / 2);
}

function calcularVolumenRadier(areaPixels, espesor, escalaMetrosPorPixel) {
    const areaMetros = areaPixels * Math.pow(escalaMetrosPorPixel, 2);
    return areaMetros * espesor;
}
