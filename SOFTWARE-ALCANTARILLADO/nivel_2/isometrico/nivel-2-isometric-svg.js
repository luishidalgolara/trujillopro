IsometricNivel2Generator.prototype.generatePuntoDescarga = function(x, y, radius, label) {
    const scale = this.currentScale;
    const scaledRadius = radius * scale * 0.8;
    const fontSize = Math.max(6, 10 * this.textScale);
    const infoX = x + 80 * scale;
    const infoY = y - 60 * scale;
    
    const arrowId = `pdesc-arrow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return `<g class="punto-descarga" data-type="punto-descarga">
        <ellipse cx="${x}" cy="${y - 40 * scale}" rx="${scaledRadius}" ry="${scaledRadius * 0.6}" 
            fill="#f8f9fa" stroke="#2c3e50" stroke-width="${3 * scale}"/>
        <ellipse cx="${x}" cy="${y}" rx="${scaledRadius}" ry="${scaledRadius * 0.6}" 
            fill="none" stroke="#2c3e50" stroke-width="${3 * scale}"/>
        <line x1="${x - scaledRadius}" y1="${y}" x2="${x - scaledRadius}" y2="${y - 40 * scale}" 
            stroke="#2c3e50" stroke-width="${3 * scale}"/>
        <line x1="${x + scaledRadius}" y1="${y}" x2="${x + scaledRadius}" y2="${y - 40 * scale}" 
            stroke="#2c3e50" stroke-width="${3 * scale}"/>
        <ellipse cx="${x}" cy="${y - 40 * scale}" rx="${scaledRadius * 0.8}" ry="${scaledRadius * 0.5}" 
            fill="white" stroke="#34495e" stroke-width="${2 * scale}"/>
        
        <line id="${arrowId}" class="pdesc-arrow-line" 
            x1="${x}" y1="${y}" 
            x2="${infoX}" y2="${infoY + 30}" 
            stroke="#000000" stroke-width="2" 
            marker-end="url(#arrow-iso-nivel2)" 
            style="pointer-events: none;"/>
        
        <g class="pdesc-info-isometric" 
           data-pdesc-label="${label}" 
           data-pdesc-x="${x}" 
           data-pdesc-y="${y}"
           data-arrow-id="${arrowId}"
           transform="translate(${infoX}, ${infoY})">
            <rect x="${-35}" y="0" width="70" height="40" 
                fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="12" text-anchor="middle" font-size="8" font-weight="bold" fill="#2c3e50">CAÑERIA PVC ⌀110mm</text>
            <text x="0" y="24" text-anchor="middle" font-size="7" fill="#34495e">────────────</text>
            <text x="0" y="36" text-anchor="middle" font-size="7" fill="#34495e">cañeria descarga</text>
        </g>
    </g>`;
};

IsometricNivel2Generator.prototype.generateWCSymbol = function(x, y) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 10 * this.textScale);
    const wcId = `wc-n2-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const labelId = `label-${wcId}`;
    
    return `<g class="wc-symbol-nivel2" data-type="wc" data-element-id="${wcId}">
        <line x1="${x}" y1="${y-45*scale}" x2="${x}" y2="${y+8*scale}" 
            stroke="#D2691E" stroke-width="${5*scale}" stroke-linecap="butt"/>
        <path d="M ${x},${y-48*scale} L ${x-15*scale},${y-25*scale} L ${x},${y-35*scale} L ${x+15*scale},${y-25*scale} Z" 
            fill="#D2691E" stroke="none"/>
        <circle cx="${x}" cy="${y+8*scale}" r="${4*scale}" 
            fill="#8B4513" stroke="#654321" stroke-width="${1.5*scale}"/>
        <g class="fixture-label-draggable-n2" 
           data-fixture-label-id="${labelId}"
           data-fixture-x="${x}"
           data-fixture-y="${y-60*scale}"
           transform="translate(${x}, ${y-60*scale})">
            <rect x="-14" y="-10" width="28" height="20" fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">WC</text>
        </g>
    </g>`;
};

IsometricNivel2Generator.prototype.generateFixtureSymbol = function(x, y, type, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 9 * this.textScale);
    
    if (type === 'WC' || type === 'wc') {
        return this.generateWCSymbol(x, y);
    }
    
    const fixtureId = `fixture-n2-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const labelId = `label-${fixtureId}`;
    
    return `<g class="fixture-symbol-nivel2" data-type="${type}" data-element-id="${fixtureId}">
        <line x1="${x}" y1="${y-40*scale}" x2="${x}" y2="${y+8*scale}" 
            stroke="#D2691E" stroke-width="${5*scale}" stroke-linecap="butt"/>
        <path d="M ${x},${y-43*scale} L ${x-14*scale},${y-22*scale} L ${x},${y-32*scale} L ${x+14*scale},${y-22*scale} Z" 
            fill="#D2691E" stroke="none"/>
        <circle cx="${x}" cy="${y+8*scale}" r="${4*scale}" 
            fill="#8B4513" stroke="#654321" stroke-width="${1.5*scale}"/>
        <g class="fixture-label-draggable-n2" 
           data-fixture-label-id="${labelId}"
           data-fixture-x="${x}"
           data-fixture-y="${y-54*scale}"
           transform="translate(${x}, ${y-54*scale})">
            <rect x="${-label.length * 4}" y="-10" width="${label.length * 8}" height="20" 
                fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricNivel2Generator.prototype.generatePipeSegment = function(pipe, drawScale) {
    const scale = this.currentScale;
    const fontSize = Math.max(6, 9 * this.textScale);
    const smallFont = Math.max(5, 7 * this.textScale);
    
    const start = this.toIsometric(pipe.x1 * drawScale, pipe.y1 * drawScale, pipe.z1 * drawScale);
    const end = this.toIsometric(pipe.x2 * drawScale, pipe.y2 * drawScale, pipe.z2 * drawScale);
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    
    const labelX = midX + 35 * scale;
    const labelY = midY - 25 * scale;
    const pipeId = `pipe-n2-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return `<g class="pipe-segment-nivel2" data-type="pipe" data-pipe-id="${pipeId}">
        <line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" 
            stroke="#D2691E" stroke-width="${5*scale}" stroke-linecap="round"/>
        <line x1="${start.x}" y1="${start.y - 2*scale}" x2="${end.x}" y2="${end.y - 2*scale}" 
            stroke="#A0522D" stroke-width="${1.5*scale}" stroke-linecap="round"/>
        <circle cx="${start.x}" cy="${start.y}" r="${2.5*scale}" fill="#8B4513" stroke="#654321" stroke-width="${0.8*scale}"/>
        <circle cx="${end.x}" cy="${end.y}" r="${2.5*scale}" fill="#8B4513" stroke="#654321" stroke-width="${0.8*scale}"/>
        <line id="guide-line-${pipeId}" class="pipe-guide-line-n2"
            x1="${midX}" y1="${midY}" x2="${labelX}" y2="${labelY}" 
            stroke="#000000" stroke-width="${Math.max(0.5, 0.8*scale)}" 
            stroke-dasharray="${2*scale},${1*scale}" opacity="0.6" style="pointer-events: none;"/>
        <g class="pipe-label-n2" data-label-id="${pipeId}" 
           data-pipe-center-x="${midX}" data-pipe-center-y="${midY}"
           transform="translate(${labelX}, ${labelY})">
            <rect x="-32" y="-14" width="64" height="28" fill="white" 
                stroke="#2c3e50" stroke-width="${Math.max(0.8, 0.8*scale)}" rx="3" opacity="0.98"/>
            <text x="0" y="-6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">
                ${pipe.material} ⌀${pipe.diameter}mm</text>
            <text x="0" y="2" text-anchor="middle" font-family="Arial" 
                font-size="${smallFont}" fill="#34495e">L=${pipe.length}m</text>
            <text x="0" y="10" text-anchor="middle" font-family="Arial" 
                font-size="${smallFont}" fill="#34495e">i=${pipe.slope}%</text>
        </g>
        <g transform="translate(${end.x - 16*scale}, ${end.y}) rotate(${angle})">
            <polygon points="0,0 ${-6*scale},${-2.5*scale} ${-6*scale},${2.5*scale}" 
                fill="#D2691E" stroke="#8B4513" stroke-width="${0.5*scale}"/>
        </g>
    </g>`;
};

IsometricNivel2Generator.prototype.generateIsometricFromTracing = function(elementosNivel2, conexionesNivel2, title = "ISOMÉTRICO 2° NIVEL", scale = "SIN ESCALA") {
    if (elementosNivel2.length === 0 && conexionesNivel2.length === 0) {
        throw new Error('No hay elementos de 2° nivel para convertir');
    }
    const { fixtures, pipes } = this.convertTracingToIsometric(elementosNivel2, conexionesNivel2);
    return this.generateIsometricSVG(pipes, fixtures, title, scale);
};

IsometricNivel2Generator.prototype.generateIsometricSVG = function(pipes = [], fixtures = [], title = "ISOMÉTRICO 2° NIVEL", scale = "SIN ESCALA") {
    if (pipes.length === 0 && fixtures.length === 0) {
        throw new Error('Se requiere al menos una tubería o artefacto');
    }

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const scaleValue = 1.5;
    
    pipes.forEach(pipe => {
        const start = this.toIsometric(pipe.x1 * scaleValue, pipe.y1 * scaleValue, pipe.z1 * scaleValue);
        const end = this.toIsometric(pipe.x2 * scaleValue, pipe.y2 * scaleValue, pipe.z2 * scaleValue);
        minX = Math.min(minX, start.x, end.x);
        maxX = Math.max(maxX, start.x, end.x);
        minY = Math.min(minY, start.y, end.y);
        maxY = Math.max(maxY, start.y, end.y);
    });
    
    fixtures.forEach(fixture => {
        const pos = this.toIsometric(fixture.x * scaleValue, fixture.y * scaleValue, fixture.z * scaleValue);
        minX = Math.min(minX, pos.x);
        maxX = Math.max(maxX, pos.x);
        minY = Math.min(minY, pos.y);
        maxY = Math.max(maxY, pos.y);
    });
    
    const margin = 150;
    minX -= margin;
    maxX += margin;
    minY -= margin;
    maxY += margin;
    
    if (!isFinite(minX) || !isFinite(maxX) || !isFinite(minY) || !isFinite(maxY)) {
        minX = -200;
        maxX = 400;
        minY = -200;
        maxY = 400;
    }
    
    const finalWidth = maxX - minX;
    const finalHeight = maxY - minY;
    
    let svg = `<svg width="${finalWidth}" height="${finalHeight}" 
        viewBox="${minX} ${minY} ${finalWidth} ${finalHeight}" 
        xmlns="http://www.w3.org/2000/svg" id="isometricSVGNivel2" style="background: transparent;">
        <defs>
            <filter id="dropShadowN2" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
            <marker id="arrow-iso-nivel2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#000000"/>
            </marker>
        </defs>`;
    
    pipes.forEach(pipe => {
        svg += this.generatePipeSegment(pipe, scaleValue);
    });
    
    fixtures.forEach(fixture => {
        const pos = this.toIsometric(fixture.x * scaleValue, fixture.y * scaleValue, fixture.z * scaleValue);
        if (fixture.type === 'PUNTO_DESCARGA') {
            svg += this.generatePuntoDescarga(pos.x, pos.y, 20 * this.currentScale, fixture.label);
        } else {
            svg += this.generateFixtureSymbol(pos.x, pos.y, fixture.type, fixture.label);
        }
        svg += `<line x1="${pos.x}" y1="${pos.y + 15 * this.currentScale}" x2="${pos.x}" y2="${pos.y + 25 * this.currentScale}" 
            stroke="#95a5a6" stroke-width="${1 * this.currentScale}" stroke-dasharray="${2 * this.currentScale},${1.5 * this.currentScale}" 
            opacity="0.3"/>`;
    });
    
    svg += '</svg>';
    return svg;
};

console.log('✅ Isométrico Nivel 2 - SVG cargado');