// ================================
// OSNAP CORE - Sistema Principal
// Indicadores visuales y búsqueda de puntos
// ================================

// ================================
// VARIABLES GLOBALES OSNAP
// ================================
let indicadorSnap = null;
let radioSnap = 15; // Radio de detección en píxeles
let puntoSnap = null;
let snapHabilitado = true;
let puntosSnapTemporales = []; // Para puntos temporales

// ================================
// INDICADORES VISUALES
// ================================

function crearIndicadorSnap() {
    if (indicadorSnap) return;
    
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) return;
    
    indicadorSnap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    indicadorSnap.setAttribute('id', 'snap-indicator');
    indicadorSnap.style.pointerEvents = 'none';
    indicadorSnap.style.display = 'none';
    
    // Círculo exterior
    const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    outerCircle.setAttribute('r', '8');
    outerCircle.setAttribute('fill', 'none');
    outerCircle.setAttribute('stroke', '#00ff88');
    outerCircle.setAttribute('stroke-width', '2');
    
    // Círculo interior
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    innerCircle.setAttribute('r', '3');
    innerCircle.setAttribute('fill', '#00ff88');
    
    // Cruz interior (para mayor precisión visual)
    const crossH = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    crossH.setAttribute('x1', '-6');
    crossH.setAttribute('y1', '0');
    crossH.setAttribute('x2', '6');
    crossH.setAttribute('y2', '0');
    crossH.setAttribute('stroke', '#00ff88');
    crossH.setAttribute('stroke-width', '1.5');
    
    const crossV = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    crossV.setAttribute('x1', '0');
    crossV.setAttribute('y1', '-6');
    crossV.setAttribute('x2', '0');
    crossV.setAttribute('y2', '6');
    crossV.setAttribute('stroke', '#00ff88');
    crossV.setAttribute('stroke-width', '1.5');
    
    indicadorSnap.appendChild(outerCircle);
    indicadorSnap.appendChild(crossH);
    indicadorSnap.appendChild(crossV);
    indicadorSnap.appendChild(innerCircle);
    
    tracingSvg.appendChild(indicadorSnap);
}

function actualizarIndicadorSnap(punto) {
    if (!indicadorSnap) crearIndicadorSnap();
    
    indicadorSnap.setAttribute('transform', `translate(${punto.x}, ${punto.y})`);
    indicadorSnap.style.display = 'block';
    
    // Animación de pulso
    indicadorSnap.style.animation = 'none';
    setTimeout(() => {
        indicadorSnap.style.animation = 'snapPulse 0.3s ease-out';
    }, 10);
}

function ocultarIndicadorSnap() {
    if (indicadorSnap) {
        indicadorSnap.style.display = 'none';
    }
}

// ================================
// BÚSQUEDA PRINCIPAL DE PUNTOS
// ================================

function agregarPuntosSnapTemporales(puntos) {
    puntosSnapTemporales = puntos || [];
}

function encontrarPuntoSnap(puntoActual) {
    if (!snapHabilitado) return null;
    
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) return null;
    
    // PRIMERO: Buscar en puntos temporales (drawingPoints actuales)
    for (const puntoTemp of puntosSnapTemporales) {
        if (distancia(puntoActual, puntoTemp) < radioSnap) {
            return { x: puntoTemp.x, y: puntoTemp.y, type: 'endpoint' };
        }
    }
    
    // 📏 NUEVO: Buscar extremos de COTAS existentes
    const mediciones = tracingSvg.querySelectorAll('.measurement-group');
    for (const medicion of mediciones) {
        const p1x = parseFloat(medicion.getAttribute('data-p1x'));
        const p1y = parseFloat(medicion.getAttribute('data-p1y'));
        const p2x = parseFloat(medicion.getAttribute('data-p2x'));
        const p2y = parseFloat(medicion.getAttribute('data-p2y'));
        
        // Verificar punto 1
        if (distancia(puntoActual, { x: p1x, y: p1y }) < radioSnap) {
            return { x: p1x, y: p1y, type: 'measurement-endpoint' };
        }
        
        // Verificar punto 2
        if (distancia(puntoActual, { x: p2x, y: p2y }) < radioSnap) {
            return { x: p2x, y: p2y, type: 'measurement-endpoint' };
        }
        
        // Verificar punto medio
        const midX = (p1x + p2x) / 2;
        const midY = (p1y + p2y) / 2;
        if (distancia(puntoActual, { x: midX, y: midY }) < radioSnap) {
            return { x: midX, y: midY, type: 'measurement-midpoint' };
        }
    }
    
    // Buscar puntos en elementos dibujados
    const elementosDibujo = tracingSvg.querySelectorAll('[class^="drawing-"]');
    for (const elemento of elementosDibujo) {
        const resultadoSnap = window.OSNAPDetectors.obtenerPuntosSnapElemento(elemento, puntoActual);
        if (resultadoSnap) return resultadoSnap;
    }
    
    // Buscar puntos en líneas de trazado
    const lineasTuberia = tracingSvg.querySelectorAll('.pipe-line');
    for (const linea of lineasTuberia) {
        const resultadoSnap = window.OSNAPDetectors.obtenerPuntosSnapLinea(linea, puntoActual);
        if (resultadoSnap) return resultadoSnap;
    }
    
    // Buscar puntos en elementos de trazado (círculos de artefactos)
    const puntosConexion = tracingSvg.querySelectorAll('.connection-point');
    for (const circulo of puntosConexion) {
        const cx = parseFloat(circulo.getAttribute('cx'));
        const cy = parseFloat(circulo.getAttribute('cy'));
        
        if (distancia(puntoActual, { x: cx, y: cy }) < radioSnap) {
            return { x: cx, y: cy, type: 'center' };
        }
    }
    
    return null;
}

function distancia(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// ================================
// FUNCIONES DE GESTIÓN
// ================================

function obtenerPuntoSnap() {
    return puntoSnap;
}

function establecerPuntoSnap(punto) {
    puntoSnap = punto;
}

function limpiarPuntoSnap() {
    puntoSnap = null;
}

function estaSnapHabilitado() {
    return snapHabilitado;
}

function alternarSnap() {
    snapHabilitado = !snapHabilitado;
    if (!snapHabilitado) {
        ocultarIndicadorSnap();
    }
}

// ================================
// EXPORTAR
// ================================

window.OSNAPCore = {
    crearIndicadorSnap,
    actualizarIndicadorSnap,
    ocultarIndicadorSnap,
    agregarPuntosSnapTemporales,
    encontrarPuntoSnap,
    distancia,
    obtenerPuntoSnap,
    establecerPuntoSnap,
    limpiarPuntoSnap,
    estaSnapHabilitado,
    alternarSnap,
    // Exponer variables para otros módulos
    obtenerRadioSnap: () => radioSnap
};

console.log('✅ osnap-core.js cargado');