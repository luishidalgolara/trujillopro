// ================================
// OSNAP DETECTORS - Detectores por Tipo
// Funciones especializadas para cada tipo de elemento
// ================================

function obtenerPuntosSnapElemento(elemento, puntoActual) {
    const nombreTag = elemento.tagName.toLowerCase();
    
    if (nombreTag === 'line') {
        return obtenerSnapDeLinea(elemento, puntoActual);
    }
    
    if (nombreTag === 'circle') {
        return obtenerSnapDeCirculo(elemento, puntoActual);
    }
    
    if (nombreTag === 'rect') {
        return obtenerSnapDeRectangulo(elemento, puntoActual);
    }
    
    if (nombreTag === 'polyline' || nombreTag === 'polygon') {
        return obtenerSnapDePoli(elemento, puntoActual);
    }
    
    if (nombreTag === 'path') {
        return obtenerSnapDePath(elemento, puntoActual);
    }
    
    return null;
}

function obtenerSnapDeLinea(linea, puntoActual) {
    const radioSnap = window.OSNAPCore.obtenerRadioSnap();
    const distancia = window.OSNAPCore.distancia;
    
    const x1 = parseFloat(linea.getAttribute('x1'));
    const y1 = parseFloat(linea.getAttribute('y1'));
    const x2 = parseFloat(linea.getAttribute('x2'));
    const y2 = parseFloat(linea.getAttribute('y2'));
    
    // Endpoint 1
    if (distancia(puntoActual, { x: x1, y: y1 }) < radioSnap) {
        return { x: x1, y: y1, type: 'endpoint' };
    }
    
    // Endpoint 2
    if (distancia(puntoActual, { x: x2, y: y2 }) < radioSnap) {
        return { x: x2, y: y2, type: 'endpoint' };
    }
    
    // Midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    if (distancia(puntoActual, { x: midX, y: midY }) < radioSnap) {
        return { x: midX, y: midY, type: 'midpoint' };
    }
    
    return null;
}

function obtenerSnapDeCirculo(circulo, puntoActual) {
    const radioSnap = window.OSNAPCore.obtenerRadioSnap();
    const distancia = window.OSNAPCore.distancia;
    
    const cx = parseFloat(circulo.getAttribute('cx'));
    const cy = parseFloat(circulo.getAttribute('cy'));
    const r = parseFloat(circulo.getAttribute('r'));
    
    // Center
    if (distancia(puntoActual, { x: cx, y: cy }) < radioSnap) {
        return { x: cx, y: cy, type: 'center' };
    }
    
    // Cuadrantes del círculo (top, right, bottom, left)
    const cuadrantes = [
        { x: cx, y: cy - r }, // top
        { x: cx + r, y: cy }, // right
        { x: cx, y: cy + r }, // bottom
        { x: cx - r, y: cy }  // left
    ];
    
    for (const cuad of cuadrantes) {
        if (distancia(puntoActual, cuad) < radioSnap) {
            return { ...cuad, type: 'quadrant' };
        }
    }
    
    return null;
}

function obtenerSnapDeRectangulo(rect, puntoActual) {
    const radioSnap = window.OSNAPCore.obtenerRadioSnap();
    const distancia = window.OSNAPCore.distancia;
    
    const x = parseFloat(rect.getAttribute('x'));
    const y = parseFloat(rect.getAttribute('y'));
    const ancho = parseFloat(rect.getAttribute('width'));
    const alto = parseFloat(rect.getAttribute('height'));
    
    // Esquinas
    const esquinas = [
        { x, y, type: 'endpoint' },
        { x: x + ancho, y, type: 'endpoint' },
        { x, y: y + alto, type: 'endpoint' },
        { x: x + ancho, y: y + alto, type: 'endpoint' }
    ];
    
    for (const esquina of esquinas) {
        if (distancia(puntoActual, esquina) < radioSnap) {
            return esquina;
        }
    }
    
    // Puntos medios de lados
    const puntosMedios = [
        { x: x + ancho/2, y, type: 'midpoint' },
        { x: x + ancho, y: y + alto/2, type: 'midpoint' },
        { x: x + ancho/2, y: y + alto, type: 'midpoint' },
        { x, y: y + alto/2, type: 'midpoint' }
    ];
    
    for (const medio of puntosMedios) {
        if (distancia(puntoActual, medio) < radioSnap) {
            return medio;
        }
    }
    
    // Centro
    const centro = { x: x + ancho/2, y: y + alto/2, type: 'center' };
    if (distancia(puntoActual, centro) < radioSnap) {
        return centro;
    }
    
    return null;
}

function obtenerSnapDePoli(poli, puntoActual) {
    const radioSnap = window.OSNAPCore.obtenerRadioSnap();
    const distancia = window.OSNAPCore.distancia;
    
    const puntosStr = poli.getAttribute('points');
    if (!puntosStr) return null;
    
    const puntos = puntosStr.trim().split(/\s+/);
    
    for (const puntoStr of puntos) {
        const [x, y] = puntoStr.split(',').map(parseFloat);
        if (distancia(puntoActual, { x, y }) < radioSnap) {
            return { x, y, type: 'endpoint' };
        }
    }
    
    return null;
}

function obtenerSnapDePath(path, puntoActual) {
    const radioSnap = window.OSNAPCore.obtenerRadioSnap();
    const distancia = window.OSNAPCore.distancia;
    
    // Para paths (arcos, splines), intentar extraer puntos del atributo 'd'
    const d = path.getAttribute('d');
    if (!d) return null;
    
    // Extraer coordenadas M (moveto) y puntos finales
    const moveMatch = d.match(/M\s*([\d.]+)\s+([\d.]+)/);
    if (moveMatch) {
        const x = parseFloat(moveMatch[1]);
        const y = parseFloat(moveMatch[2]);
        if (distancia(puntoActual, { x, y }) < radioSnap) {
            return { x, y, type: 'endpoint' };
        }
    }
    
    // Extraer último punto (buscar última coordenada numérica)
    const coords = d.match(/[\d.]+/g);
    if (coords && coords.length >= 2) {
        const x = parseFloat(coords[coords.length - 2]);
        const y = parseFloat(coords[coords.length - 1]);
        if (distancia(puntoActual, { x, y }) < radioSnap) {
            return { x, y, type: 'endpoint' };
        }
    }
    
    return null;
}

function obtenerPuntosSnapLinea(linea, puntoActual) {
    const radioSnap = window.OSNAPCore.obtenerRadioSnap();
    const distancia = window.OSNAPCore.distancia;
    
    const x1 = parseFloat(linea.getAttribute('x1'));
    const y1 = parseFloat(linea.getAttribute('y1'));
    const x2 = parseFloat(linea.getAttribute('x2'));
    const y2 = parseFloat(linea.getAttribute('y2'));
    
    // Endpoint 1
    if (distancia(puntoActual, { x: x1, y: y1 }) < radioSnap) {
        return { x: x1, y: y1, type: 'endpoint' };
    }
    
    // Endpoint 2
    if (distancia(puntoActual, { x: x2, y: y2 }) < radioSnap) {
        return { x: x2, y: y2, type: 'endpoint' };
    }
    
    // Midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    if (distancia(puntoActual, { x: midX, y: midY }) < radioSnap) {
        return { x: midX, y: midY, type: 'midpoint' };
    }
    
    return null;
}

// ================================
// EXPORTAR
// ================================

window.OSNAPDetectors = {
    obtenerPuntosSnapElemento,
    obtenerSnapDeLinea,
    obtenerSnapDeCirculo,
    obtenerSnapDeRectangulo,
    obtenerSnapDePoli,
    obtenerSnapDePath,
    obtenerPuntosSnapLinea
};

console.log('✅ osnap-detectors.js cargado');