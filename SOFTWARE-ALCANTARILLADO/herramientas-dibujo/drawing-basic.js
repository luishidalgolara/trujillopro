// ================================
// DRAWING BASIC
// Herramientas básicas: LINE, CIRCLE, RECTANGLE
// ================================

// ================================
// LINE (LÍNEA)
// ================================

function manejarClickLinea(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        window.DrawingCore.establecerEstaDibujando(true);
        crearLineaTemporal(punto);
        showStatus('📍 Primer punto - Click para segundo punto');
    } else if (puntos.length === 2) {
        finalizarLinea();
        showStatus('✅ Línea creada - Clic derecho para repetir LINE');
    }
}

function crearLineaTemporal(puntoInicio) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    temp.setAttribute('x1', puntoInicio.x);
    temp.setAttribute('y1', puntoInicio.y);
    temp.setAttribute('x2', puntoInicio.x);
    temp.setAttribute('y2', puntoInicio.y);
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarLineaTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    if (!temp) return;
    
    temp.setAttribute('x2', puntoActual.x);
    temp.setAttribute('y2', puntoActual.y);
}

function finalizarLinea() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 2) return;
    
    const tracingSvg = document.getElementById('tracingSvg');
    
    const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    linea.setAttribute('x1', puntos[0].x);
    linea.setAttribute('y1', puntos[0].y);
    linea.setAttribute('x2', puntos[1].x);
    linea.setAttribute('y2', puntos[1].y);
    linea.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    linea.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    linea.setAttribute('stroke-linecap', window.DrawingCore.ESTILOS_DIBUJO.strokeLinecap);
    linea.setAttribute('class', 'drawing-line');
    linea.style.cursor = 'pointer';
    linea.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(linea);
    tracingSvg.appendChild(linea);
    
    temp.remove();
    window.DrawingCore.establecerElementoTemporal(null);
    window.DrawingCore.establecerPuntos([]);
    window.DrawingCore.establecerEstaDibujando(false);
    
    if (window.CADHelpers) {
        window.CADHelpers.addTemporarySnapPoints([]);
    }
    
    document.querySelectorAll('[class^="drawing-"]').forEach(el => {
        el.style.pointerEvents = 'all';
    });
    
    window.DrawingCore.establecerHerramientaActual(null);
    document.querySelectorAll('.cad-tool-btn').forEach(btn => btn.classList.remove('active'));
}

// ================================
// CIRCLE (CÍRCULO)
// ================================

function manejarClickCirculo(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        window.DrawingCore.establecerEstaDibujando(true);
        crearCirculoTemporal(punto);
        showStatus('📍 Centro definido - Click para radio');
    } else if (puntos.length === 2) {
        finalizarCirculo();
    }
}

function crearCirculoTemporal(centro) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    temp.setAttribute('cx', centro.x);
    temp.setAttribute('cy', centro.y);
    temp.setAttribute('r', 1);
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('fill', 'none');
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarCirculoTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length === 0) return;
    
    const centro = puntos[0];
    const radio = Math.sqrt(
        Math.pow(puntoActual.x - centro.x, 2) + 
        Math.pow(puntoActual.y - centro.y, 2)
    );
    
    temp.setAttribute('r', radio);
}

function finalizarCirculo() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 2) return;
    
    const tracingSvg = document.getElementById('tracingSvg');
    const centro = puntos[0];
    const puntoBorde = puntos[1];
    
    const radio = Math.sqrt(
        Math.pow(puntoBorde.x - centro.x, 2) + 
        Math.pow(puntoBorde.y - centro.y, 2)
    );
    
    const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circulo.setAttribute('cx', centro.x);
    circulo.setAttribute('cy', centro.y);
    circulo.setAttribute('r', radio);
    circulo.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    circulo.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    circulo.setAttribute('fill', 'none');
    circulo.setAttribute('class', 'drawing-circle');
    circulo.style.cursor = 'pointer';
    circulo.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(circulo);
    tracingSvg.appendChild(circulo);
    
    temp.remove();
    window.DrawingCore.establecerElementoTemporal(null);
    window.DrawingCore.establecerPuntos([]);
    window.DrawingCore.establecerEstaDibujando(false);
    
    if (window.CADHelpers) {
        window.CADHelpers.addTemporarySnapPoints([]);
    }
    
    document.querySelectorAll('[class^="drawing-"]').forEach(el => {
        el.style.pointerEvents = 'all';
    });
    
    window.DrawingCore.establecerHerramientaActual(null);
    document.querySelectorAll('.cad-tool-btn').forEach(btn => btn.classList.remove('active'));
    showStatus('✅ Círculo creado');
}

// ================================
// RECTANGLE (RECTÁNGULO)
// ================================

function manejarClickRectangulo(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        window.DrawingCore.establecerEstaDibujando(true);
        crearRectanguloTemporal(punto);
        showStatus('📍 Primera esquina - Click para esquina opuesta');
    } else if (puntos.length === 2) {
        finalizarRectangulo();
    }
}

function crearRectanguloTemporal(puntoInicio) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    temp.setAttribute('x', puntoInicio.x);
    temp.setAttribute('y', puntoInicio.y);
    temp.setAttribute('width', 1);
    temp.setAttribute('height', 1);
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('fill', 'none');
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarRectanguloTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length === 0) return;
    
    const puntoInicio = puntos[0];
    const x = Math.min(puntoInicio.x, puntoActual.x);
    const y = Math.min(puntoInicio.y, puntoActual.y);
    const ancho = Math.abs(puntoActual.x - puntoInicio.x);
    const alto = Math.abs(puntoActual.y - puntoInicio.y);
    
    temp.setAttribute('x', x);
    temp.setAttribute('y', y);
    temp.setAttribute('width', ancho);
    temp.setAttribute('height', alto);
}

function finalizarRectangulo() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 2) return;
    
    const tracingSvg = document.getElementById('tracingSvg');
    const puntoInicio = puntos[0];
    const puntoFin = puntos[1];
    
    const x = Math.min(puntoInicio.x, puntoFin.x);
    const y = Math.min(puntoInicio.y, puntoFin.y);
    const ancho = Math.abs(puntoFin.x - puntoInicio.x);
    const alto = Math.abs(puntoFin.y - puntoInicio.y);
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', ancho);
    rect.setAttribute('height', alto);
    rect.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    rect.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    rect.setAttribute('fill', 'none');
    rect.setAttribute('class', 'drawing-rectangle');
    rect.style.cursor = 'pointer';
    rect.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(rect);
    tracingSvg.appendChild(rect);
    
    temp.remove();
    window.DrawingCore.establecerElementoTemporal(null);
    window.DrawingCore.establecerPuntos([]);
    window.DrawingCore.establecerEstaDibujando(false);
    
    if (window.CADHelpers) {
        window.CADHelpers.addTemporarySnapPoints([]);
    }
    
    document.querySelectorAll('[class^="drawing-"]').forEach(el => {
        el.style.pointerEvents = 'all';
    });
    
    window.DrawingCore.establecerHerramientaActual(null);
    document.querySelectorAll('.cad-tool-btn').forEach(btn => btn.classList.remove('active'));
    showStatus('✅ Rectángulo creado');
}

// Aliases para compatibilidad
window.handleLineClick = manejarClickLinea;
window.createTempLine = crearLineaTemporal;
window.updateTempLine = actualizarLineaTemporal;
window.finalizeLine = finalizarLinea;
window.handleCircleClick = manejarClickCirculo;
window.createTempCircle = crearCirculoTemporal;
window.updateTempCircle = actualizarCirculoTemporal;
window.finalizeCircle = finalizarCirculo;
window.handleRectangleClick = manejarClickRectangulo;
window.createTempRectangle = crearRectanguloTemporal;
window.updateTempRectangle = actualizarRectanguloTemporal;
window.finalizeRectangle = finalizarRectangulo;

// Exportar
window.DrawingBasic = {
    manejarClickLinea,
    crearLineaTemporal,
    actualizarLineaTemporal,
    finalizarLinea,
    manejarClickCirculo,
    crearCirculoTemporal,
    actualizarCirculoTemporal,
    finalizarCirculo,
    manejarClickRectangulo,
    crearRectanguloTemporal,
    actualizarRectanguloTemporal,
    finalizarRectangulo
};

console.log('✅ drawing-basic.js cargado');