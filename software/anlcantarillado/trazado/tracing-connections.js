function createTracingConnection(desde, hacia) {
    const currentPlan = plans[currentPlanIndex];
    const tracingSvg = document.getElementById('tracingSvg');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', desde.x);
    line.setAttribute('y1', desde.y);
    line.setAttribute('x2', hacia.x);
    line.setAttribute('y2', hacia.y);
    line.setAttribute('stroke', '#ef4444');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('class', 'pipe-line');
    line.setAttribute('data-from', desde.id);
    line.setAttribute('data-to', hacia.id);

    tracingSvg.appendChild(line);

    createTracingArrow(desde, hacia);

    const distanceMillimeters = calcularDistancia(desde, hacia);
    const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, currentPlan.tracingScale);

    const diameter = desde.tuberia_diametro || 110;

    createPipeLabel(desde, hacia, diameter, distanceMeters);

    currentPlan.tracingConnections.push({
        from: desde,
        to: hacia,
        distance: distanceMeters,
        diameter: diameter
    });

    updateTracingElementSizes();
}

function createTracingConnectionVisual(desde, hacia) {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) return;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', desde.x);
    line.setAttribute('y1', desde.y);
    line.setAttribute('x2', hacia.x);
    line.setAttribute('y2', hacia.y);
    line.setAttribute('stroke', '#ef4444');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('class', 'pipe-line');
    line.setAttribute('data-from', desde.id);
    line.setAttribute('data-to', hacia.id);

    tracingSvg.appendChild(line);
    createTracingArrow(desde, hacia);
    
    const distanceMillimeters = calcularDistancia(desde, hacia);
    const currentPlan = plans[currentPlanIndex];
    const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, currentPlan.tracingScale);
    const diameter = desde.tuberia_diametro || 110;
    createPipeLabel(desde, hacia, diameter, distanceMeters);
}

function createTracingArrow(desde, hacia) {
    const tracingSvg = document.getElementById('tracingSvg');
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const arrowX = desde.x + (deltaX * 0.75);
    const arrowY = desde.y + (deltaY * 0.75);
    
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    const arrowGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    arrowGroup.setAttribute('class', 'flow-arrow');
    arrowGroup.setAttribute('data-connection', `${desde.id}-${hacia.id}`);
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '0,-4 8,0 0,4');
    arrow.setAttribute('fill', '#ef4444');
    arrow.setAttribute('stroke', '#ffffff');
    arrow.setAttribute('stroke-width', '1');
    
    arrowGroup.setAttribute('transform', `translate(${arrowX}, ${arrowY}) rotate(${angle})`);
    arrowGroup.appendChild(arrow);
    tracingSvg.appendChild(arrowGroup);
}

function updateArrowForLine(line) {
    const fromId = line.getAttribute('data-from');
    const toId = line.getAttribute('data-to');
    const connectionId = `${fromId}-${toId}`;
    
    const arrow = document.querySelector(`[data-connection="${connectionId}"].flow-arrow`);
    if (!arrow) return;
    
    const x1 = parseFloat(line.getAttribute('x1'));
    const y1 = parseFloat(line.getAttribute('y1'));
    const x2 = parseFloat(line.getAttribute('x2'));
    const y2 = parseFloat(line.getAttribute('y2'));
    
    const arrowX = x1 + (x2 - x1) * 0.75;
    const arrowY = y1 + (y2 - y1) * 0.75;
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    arrow.setAttribute('transform', `translate(${arrowX}, ${arrowY}) rotate(${angle})`);
}

function calcularDistancia(elemento1, elemento2) {
    return Math.sqrt(
        Math.pow(elemento2.x - elemento1.x, 2) + Math.pow(elemento2.y - elemento1.y, 2)
    );
}

function convertMillimetersToRealMeters(distanceMillimeters, scale) {
    return (distanceMillimeters * scale) / 1000;
}

console.log('Trazado - Connections cargado');