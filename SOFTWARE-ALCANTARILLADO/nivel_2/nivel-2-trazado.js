const CONEXIONES_NIVEL_2 = [];

function generarTrazadoNivel2() {
    const elementosNivel2 = obtenerElementosNivel2();
    
    if (elementosNivel2.length === 0) {
        showStatus('⚠️ No hay artefactos en 2° nivel');
        return;
    }
    
    console.log('🎯 Generando trazado jerárquico 2° nivel...');
    limpiarConexionesNivel2();
    
    const elementos = clasificarElementosNivel2(elementosNivel2);
    
    if (elementos.puntosDescarga.length === 0) {
        showStatus('⚠️ Necesitas agregar PUNTOS DE DESCARGA para 2° nivel');
        return;
    }
    
    ejecutarSecuenciaJerarquicaNivel2(elementos);
    
    showStatus(`⚡ Trazado 2° nivel generado - ${CONEXIONES_NIVEL_2.length} conexiones`);
}

function ejecutarSecuenciaJerarquicaNivel2(elementos) {
    console.log('🔗 Ejecutando secuencia jerárquica 2° NIVEL...');
    
    conectarColectoresPrincipalesNivel2(
        elementos.colectoresPrincipales,
        elementos.derivacionesSecundarias,
        elementos.puntosDescarga
    );
    
    conectarDerivacionesSecundariasNivel2(
        elementos.derivacionesSecundarias,
        elementos.colectoresPrincipales,
        elementos.puntosDescarga
    );
    
    console.log('✅ Secuencia jerárquica 2° NIVEL completada');
}

function conectarColectoresPrincipalesNivel2(colectores, derivaciones, puntosDescarga) {
    if (colectores.length === 0 || puntosDescarga.length === 0) return;
    
    console.log('🔵 Conectando colectores principales WC a puntos de descarga...');
    
    colectores.forEach(wc => {
        const puntoMasCercano = encontrarMasCercano(wc, puntosDescarga);
        if (puntoMasCercano) {
            createTracingConnectionNivel2(wc, puntoMasCercano);
        }
    });
}

function conectarDerivacionesSecundariasNivel2(derivaciones, colectores, puntosDescarga) {
    if (derivaciones.length === 0) return;
    
    console.log('🟢 Conectando derivaciones secundarias...');
    
    derivaciones.forEach(artefacto => {
        if (colectores.length > 0) {
            const wcMasCercano = encontrarMasCercano(artefacto, colectores);
            if (wcMasCercano) {
                createTracingConnectionNivel2(artefacto, wcMasCercano);
            }
        } else {
            const puntoMasCercano = encontrarMasCercano(artefacto, puntosDescarga);
            if (puntoMasCercano) {
                createTracingConnectionNivel2(artefacto, puntoMasCercano);
            }
        }
    });
}

function encontrarMasCercano(elemento, lista) {
    if (!lista || lista.length === 0) return null;
    
    let minDistancia = Infinity;
    let masProximo = null;
    
    lista.forEach(item => {
        const distancia = calcularDistancia(elemento, item);
        if (distancia < minDistancia) {
            minDistancia = distancia;
            masProximo = item;
        }
    });
    
    return masProximo;
}

function createTracingConnectionNivel2(desde, hacia) {
    const currentPlan = plans[currentPlanIndex];
    const tracingSvg = document.getElementById('tracingSvg');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', desde.x);
    line.setAttribute('y1', desde.y);
    line.setAttribute('x2', hacia.x);
    line.setAttribute('y2', hacia.y);
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('class', 'pipe-line nivel-2');
    line.setAttribute('data-from', desde.id);
    line.setAttribute('data-to', hacia.id);
    line.setAttribute('data-nivel', '2');

    tracingSvg.appendChild(line);
    createTracingArrowNivel2(desde, hacia);

    const distanceMillimeters = calcularDistancia(desde, hacia);
    const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, currentPlan.tracingScale);
    const diameter = desde.tuberia_diametro || 110;

    createPipeLabelNivel2(desde, hacia, diameter, distanceMeters);

    CONEXIONES_NIVEL_2.push({
        from: desde,
        to: hacia,
        distance: distanceMeters,
        diameter: diameter
    });
    
    if (typeof updateTracingElementSizes === 'function') {
        updateTracingElementSizes();
    }
}

function createTracingArrowNivel2(desde, hacia) {
    const tracingSvg = document.getElementById('tracingSvg');
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const arrowX = desde.x + (deltaX * 0.75);
    const arrowY = desde.y + (deltaY * 0.75);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    const arrowGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    arrowGroup.setAttribute('class', 'flow-arrow nivel-2');
    arrowGroup.setAttribute('data-connection', `${desde.id}-${hacia.id}`);
    arrowGroup.setAttribute('data-nivel', '2');
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '0,-4 8,0 0,4');
    arrow.setAttribute('fill', '#000000');
    arrow.setAttribute('stroke', '#ffffff');
    arrow.setAttribute('stroke-width', '1');
    
    arrowGroup.setAttribute('transform', `translate(${arrowX}, ${arrowY}) rotate(${angle})`);
    arrowGroup.appendChild(arrow);
    tracingSvg.appendChild(arrowGroup);
}

function limpiarConexionesNivel2() {
    const tracingSvg = document.getElementById('tracingSvg');
    const lines = tracingSvg.querySelectorAll('.pipe-line.nivel-2');
    const arrows = tracingSvg.querySelectorAll('.flow-arrow.nivel-2');
    const labels = tracingSvg.querySelectorAll('.pipe-label-group.nivel-2');
    
    lines.forEach(line => line.remove());
    arrows.forEach(arrow => arrow.remove());
    labels.forEach(label => label.remove());
    
    CONEXIONES_NIVEL_2.length = 0;
}

function obtenerPuntosDescarga() {
    const currentPlan = plans[currentPlanIndex];
    return currentPlan.tracingElements.filter(el => el.type === 'punto-descarga');
}

window.generarTrazadoNivel2 = generarTrazadoNivel2;
window.limpiarConexionesNivel2 = limpiarConexionesNivel2;
window.clasificarElementosNivel2 = clasificarElementosNivel2;
window.CONEXIONES_NIVEL_2 = CONEXIONES_NIVEL_2;

console.log('✅ nivel-2-trazado.js cargado');