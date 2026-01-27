// ================================
// DRAWING ADVANCED
// Herramientas avanzadas: PLINE, ARC, SPLINE, POLYGON
// ================================

// ================================
// PLINE (POLILÍNEA)
// ================================

function manejarClickPolilinea(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        window.DrawingCore.establecerEstaDibujando(true);
        crearPolilineaTemporal(punto);
        showStatus('📍 Primer punto - Click=Continuar, Enter/Doble-click=Finalizar');
    } else {
        actualizarPuntosPolilineaTemporal();
        showStatus(`📍 ${puntos.length} puntos - Enter/Doble-click=Finalizar`);
    }
}

function crearPolilineaTemporal(puntoInicio) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    temp.setAttribute('points', `${puntoInicio.x},${puntoInicio.y}`);
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('fill', 'none');
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarPolilineaTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length === 0) return;
    
    let puntosStr = puntos.map(p => `${p.x},${p.y}`).join(' ');
    puntosStr += ` ${puntoActual.x},${puntoActual.y}`;
    
    temp.setAttribute('points', puntosStr);
}

function actualizarPuntosPolilineaTemporal() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp) return;
    
    const puntosStr = puntos.map(p => `${p.x},${p.y}`).join(' ');
    temp.setAttribute('points', puntosStr);
}

function finalizarPolilinea() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 2) {
        showStatus('⚠️ Se necesitan al menos 2 puntos');
        window.DrawingCore.cancelarDibujoActual();
        return;
    }
    
    const tracingSvg = document.getElementById('tracingSvg');
    
    const pline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    const puntosStr = puntos.map(p => `${p.x},${p.y}`).join(' ');
    pline.setAttribute('points', puntosStr);
    pline.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    pline.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    pline.setAttribute('stroke-linecap', window.DrawingCore.ESTILOS_DIBUJO.strokeLinecap);
    pline.setAttribute('stroke-linejoin', window.DrawingCore.ESTILOS_DIBUJO.strokeLinejoin);
    pline.setAttribute('fill', 'none');
    pline.setAttribute('class', 'drawing-pline');
    pline.style.cursor = 'pointer';
    pline.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(pline);
    tracingSvg.appendChild(pline);
    
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
    showStatus('✅ Polilínea creada - Clic derecho para repetir');
}

// ================================
// ARC (ARCO)
// ================================

function manejarClickArco(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        window.DrawingCore.establecerEstaDibujando(true);
        showStatus('📍 Punto inicial - Click para punto medio');
    } else if (puntos.length === 2) {
        crearArcoTemporal();
        showStatus('📍 Punto medio - Click para punto final');
    } else if (puntos.length === 3) {
        finalizarArco();
    }
}

function crearArcoTemporal() {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('fill', 'none');
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarArcoTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 2) return;
    
    const inicio = puntos[0];
    const medio = puntos[1];
    const fin = puntoActual;
    
    const pathD = crearRutaArco(inicio, medio, fin);
    temp.setAttribute('d', pathD);
}

function crearRutaArco(inicio, medio, fin) {
    const path = `M ${inicio.x} ${inicio.y} Q ${medio.x} ${medio.y} ${fin.x} ${fin.y}`;
    return path;
}

function finalizarArco() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 3) return;
    
    const tracingSvg = document.getElementById('tracingSvg');
    const inicio = puntos[0];
    const medio = puntos[1];
    const fin = puntos[2];
    
    const arco = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathD = crearRutaArco(inicio, medio, fin);
    arco.setAttribute('d', pathD);
    arco.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    arco.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    arco.setAttribute('fill', 'none');
    arco.setAttribute('stroke-linecap', window.DrawingCore.ESTILOS_DIBUJO.strokeLinecap);
    arco.setAttribute('class', 'drawing-arc');
    arco.style.cursor = 'pointer';
    arco.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(arco);
    tracingSvg.appendChild(arco);
    
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
    showStatus('✅ Arco creado');
}

// ================================
// SPLINE (CURVA SUAVE)
// ================================

function manejarClickSpline(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        window.DrawingCore.establecerEstaDibujando(true);
        crearSplineTemporal(punto);
        showStatus('📍 Primer punto - Click=Continuar, Enter/Doble-click=Finalizar (mín. 3)');
    } else {
        actualizarPuntosSplineTemporal();
        showStatus(`📍 ${puntos.length} puntos - Enter/Doble-click=Finalizar`);
    }
}

function crearSplineTemporal(puntoInicio) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('fill', 'none');
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarSplineTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length === 0) return;
    
    const todosPuntos = [...puntos, puntoActual];
    const pathD = crearRutaSpline(todosPuntos);
    temp.setAttribute('d', pathD);
}

function actualizarPuntosSplineTemporal() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp) return;
    
    const pathD = crearRutaSpline(puntos);
    temp.setAttribute('d', pathD);
}

function crearRutaSpline(puntos) {
    if (puntos.length < 2) return '';
    
    if (puntos.length === 2) {
        return `M ${puntos[0].x} ${puntos[0].y} L ${puntos[1].x} ${puntos[1].y}`;
    }
    
    let path = `M ${puntos[0].x} ${puntos[0].y}`;
    
    for (let i = 0; i < puntos.length - 1; i++) {
        const p0 = puntos[i === 0 ? i : i - 1];
        const p1 = puntos[i];
        const p2 = puntos[i + 1];
        const p3 = puntos[i + 2 < puntos.length ? i + 2 : i + 1];
        
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    
    return path;
}

function finalizarSpline() {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length < 3) {
        showStatus('⚠️ Se necesitan al menos 3 puntos');
        window.DrawingCore.cancelarDibujoActual();
        return;
    }
    
    const tracingSvg = document.getElementById('tracingSvg');
    
    const spline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathD = crearRutaSpline(puntos);
    spline.setAttribute('d', pathD);
    spline.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    spline.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    spline.setAttribute('fill', 'none');
    spline.setAttribute('stroke-linecap', window.DrawingCore.ESTILOS_DIBUJO.strokeLinecap);
    spline.setAttribute('stroke-linejoin', window.DrawingCore.ESTILOS_DIBUJO.strokeLinejoin);
    spline.setAttribute('class', 'drawing-spline');
    spline.style.cursor = 'pointer';
    spline.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(spline);
    tracingSvg.appendChild(spline);
    
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
    showStatus('✅ Spline creado');
}

// ================================
// POLYGON (POLÍGONO)
// ================================

let ladosPoligono = 6;

function manejarClickPoligono(punto) {
    const puntos = window.DrawingCore.obtenerPuntos();
    puntos.push(punto);
    window.DrawingCore.establecerPuntos(puntos);
    
    if (puntos.length === 1) {
        const lados = prompt('Número de lados (3-20):', ladosPoligono);
        if (lados && !isNaN(lados)) {
            ladosPoligono = Math.max(3, Math.min(20, parseInt(lados)));
        }
        
        window.DrawingCore.establecerEstaDibujando(true);
        crearPoligonoTemporal(punto);
        showStatus(`📍 Centro - Click para radio (${ladosPoligono} lados)`);
    } else if (puntos.length === 2) {
        finalizarPoligono();
    }
}

function crearPoligonoTemporal(centro) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const temp = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    temp.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    temp.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    temp.setAttribute('fill', 'none');
    temp.setAttribute('stroke-dasharray', '5,5');
    temp.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(temp);
    window.DrawingCore.establecerElementoTemporal(temp);
}

function actualizarPoligonoTemporal(puntoActual) {
    const temp = window.DrawingCore.obtenerElementoTemporal();
    const puntos = window.DrawingCore.obtenerPuntos();
    if (!temp || puntos.length === 0) return;
    
    const centro = puntos[0];
    const radio = Math.sqrt(
        Math.pow(puntoActual.x - centro.x, 2) + 
        Math.pow(puntoActual.y - centro.y, 2)
    );
    
    const puntosPoligono = calcularPuntosPoligono(centro, radio, ladosPoligono);
    temp.setAttribute('points', puntosPoligono);
}

function calcularPuntosPoligono(centro, radio, lados) {
    const puntos = [];
    const pasoAngulo = (Math.PI * 2) / lados;
    const anguloInicio = -Math.PI / 2;
    
    for (let i = 0; i < lados; i++) {
        const angulo = anguloInicio + (pasoAngulo * i);
        const x = centro.x + radio * Math.cos(angulo);
        const y = centro.y + radio * Math.sin(angulo);
        puntos.push(`${x},${y}`);
    }
    
    return puntos.join(' ');
}

function finalizarPoligono() {
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
    
    const poligono = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const puntosPoligono = calcularPuntosPoligono(centro, radio, ladosPoligono);
    poligono.setAttribute('points', puntosPoligono);
    poligono.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    poligono.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    poligono.setAttribute('fill', 'none');
    poligono.setAttribute('stroke-linejoin', window.DrawingCore.ESTILOS_DIBUJO.strokeLinejoin);
    poligono.setAttribute('class', 'drawing-polygon');
    poligono.style.cursor = 'pointer';
    poligono.style.pointerEvents = 'all';
    
    window.DrawingEdit.hacerElementoEditable(poligono);
    tracingSvg.appendChild(poligono);
    
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
    showStatus(`✅ Polígono de ${ladosPoligono} lados creado`);
}

// Aliases para compatibilidad
window.handlePlineClick = manejarClickPolilinea;
window.createTempPline = crearPolilineaTemporal;
window.updateTempPline = actualizarPolilineaTemporal;
window.updateTempPlinePoints = actualizarPuntosPolilineaTemporal;
window.finalizePline = finalizarPolilinea;
window.handleArcClick = manejarClickArco;
window.createTempArc = crearArcoTemporal;
window.updateTempArc = actualizarArcoTemporal;
window.createArcPath = crearRutaArco;
window.finalizeArc = finalizarArco;
window.handleSplineClick = manejarClickSpline;
window.createTempSpline = crearSplineTemporal;
window.updateTempSpline = actualizarSplineTemporal;
window.updateTempSplinePoints = actualizarPuntosSplineTemporal;
window.createSplinePath = crearRutaSpline;
window.finalizeSpline = finalizarSpline;
window.handlePolygonClick = manejarClickPoligono;
window.createTempPolygon = crearPoligonoTemporal;
window.updateTempPolygon = actualizarPoligonoTemporal;
window.calculatePolygonPoints = calcularPuntosPoligono;
window.finalizePolygon = finalizarPoligono;
window.polygonSides = ladosPoligono;

// Exportar
window.DrawingAdvanced = {
    manejarClickPolilinea,
    crearPolilineaTemporal,
    actualizarPolilineaTemporal,
    actualizarPuntosPolilineaTemporal,
    finalizarPolilinea,
    manejarClickArco,
    crearArcoTemporal,
    actualizarArcoTemporal,
    crearRutaArco,
    finalizarArco,
    manejarClickSpline,
    crearSplineTemporal,
    actualizarSplineTemporal,
    actualizarPuntosSplineTemporal,
    crearRutaSpline,
    finalizarSpline,
    manejarClickPoligono,
    crearPoligonoTemporal,
    actualizarPoligonoTemporal,
    calcularPuntosPoligono,
    finalizarPoligono,
    ladosPoligono
};

console.log('✅ drawing-advanced.js cargado');