IsometricWaterGenerator.prototype.generateMedidor = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 10 * this.textScale);
    
    return `<g class="medidor-symbol" data-type="medidor">
        <rect x="${x - 20*scale}" y="${y - 20*scale}" width="${40*scale}" height="${40*scale}" 
            fill="#3498db" stroke="#2c3e50" stroke-width="${3*scale}" rx="${4*scale}"/>
        <circle cx="${x}" cy="${y}" r="${12*scale}" fill="white" stroke="#2c3e50" stroke-width="${2*scale}"/>
        <line x1="${x - 8*scale}" y1="${y}" x2="${x + 8*scale}" y2="${y}" 
            stroke="#2c3e50" stroke-width="${2*scale}"/>
        <line x1="${x}" y1="${y - 8*scale}" x2="${x}" y2="${y + 8*scale}" 
            stroke="#2c3e50" stroke-width="${2*scale}"/>
        <g transform="translate(${x}, ${y + 35*scale})">
            <rect x="-16" y="-10" width="32" height="20" fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateCalefon = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 10 * this.textScale);
    
    return `<g class="calefon-symbol" data-type="calefon">
        <rect x="${x - 18*scale}" y="${y - 30*scale}" width="${36*scale}" height="${50*scale}" 
            fill="#e74c3c" stroke="#2c3e50" stroke-width="${2.5*scale}" rx="${3*scale}"/>
        <circle cx="${x}" cy="${y - 10*scale}" r="${8*scale}" fill="#f39c12" stroke="#2c3e50" stroke-width="${1.5*scale}"/>
        <path d="M ${x - 4*scale},${y - 14*scale} L ${x},${y - 6*scale} L ${x + 4*scale},${y - 14*scale}" 
            fill="none" stroke="#fff" stroke-width="${2*scale}"/>
        <line x1="${x - 12*scale}" y1="${y + 25*scale}" x2="${x - 12*scale}" y2="${y + 35*scale}" 
            stroke="#3498db" stroke-width="${3*scale}"/>
        <line x1="${x + 12*scale}" y1="${y + 25*scale}" x2="${x + 12*scale}" y2="${y + 35*scale}" 
            stroke="#e74c3c" stroke-width="${3*scale}"/>
        <g transform="translate(${x}, ${y + 50*scale})">
            <rect x="-18" y="-10" width="36" height="20" fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateTermoElectrico = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 10 * this.textScale);
    
    return `<g class="termo-symbol" data-type="termo">
        <ellipse cx="${x}" cy="${y}" rx="${16*scale}" ry="${30*scale}" 
            fill="#95a5a6" stroke="#2c3e50" stroke-width="${2.5*scale}"/>
        <path d="M ${x - 10*scale},${y - 8*scale} L ${x - 6*scale},${y} L ${x - 10*scale},${y + 8*scale} 
                 M ${x + 10*scale},${y - 8*scale} L ${x + 6*scale},${y} L ${x + 10*scale},${y + 8*scale}" 
            fill="none" stroke="#f39c12" stroke-width="${2*scale}"/>
        <line x1="${x}" y1="${y + 35*scale}" x2="${x}" y2="${y + 45*scale}" 
            stroke="#e74c3c" stroke-width="${3*scale}"/>
        <g transform="translate(${x}, ${y + 60*scale})">
            <rect x="-18" y="-10" width="36" height="20" fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateWCSymbol = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 10 * this.textScale);
    
    return `<g class="wc-symbol" data-type="wc">
        <ellipse cx="${x}" cy="${y}" rx="${14*scale}" ry="${18*scale}" 
            fill="white" stroke="#2c3e50" stroke-width="${2.5*scale}"/>
        <ellipse cx="${x}" cy="${y - 5*scale}" rx="${10*scale}" ry="${8*scale}" 
            fill="#ecf0f1" stroke="#2c3e50" stroke-width="${1.5*scale}"/>
        <line x1="${x}" y1="${y + 20*scale}" x2="${x}" y2="${y + 30*scale}" 
            stroke="#3498db" stroke-width="${3*scale}"/>
        <g transform="translate(${x}, ${y + 45*scale})">
            <rect x="-14" y="-10" width="28" height="20" fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateLavatorio = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 9 * this.textScale);
    
    return `<g class="lavatorio-symbol" data-type="lavatorio">
        <rect x="${x - 18*scale}" y="${y - 8*scale}" width="${36*scale}" height="${16*scale}" 
            fill="#ecf0f1" stroke="#2c3e50" stroke-width="${2*scale}" rx="${3*scale}"/>
        <line x1="${x - 10*scale}" y1="${y + 10*scale}" x2="${x - 10*scale}" y2="${y + 25*scale}" 
            stroke="#3498db" stroke-width="${2.5*scale}"/>
        <line x1="${x + 10*scale}" y1="${y + 10*scale}" x2="${x + 10*scale}" y2="${y + 25*scale}" 
            stroke="#e74c3c" stroke-width="${2.5*scale}"/>
        <circle cx="${x}" cy="${y}" r="${4*scale}" fill="#bdc3c7" stroke="#2c3e50" stroke-width="${1*scale}"/>
        <g transform="translate(${x}, ${y + 40*scale})">
            <rect x="${-label.length * 4}" y="-10" width="${label.length * 8}" height="20" 
                fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateDucha = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(7, 9 * this.textScale);
    
    return `<g class="ducha-symbol" data-type="ducha">
        <line x1="${x}" y1="${y - 40*scale}" x2="${x}" y2="${y}" 
            stroke="#7f8c8d" stroke-width="${2*scale}"/>
        <rect x="${x - 12*scale}" y="${y - 42*scale}" width="${24*scale}" height="${8*scale}" 
            fill="#34495e" stroke="#2c3e50" stroke-width="${1.5*scale}" rx="${2*scale}"/>
        ${Array.from({length: 5}, (_, i) => 
            `<line x1="${x - 8*scale + i*4*scale}" y1="${y - 34*scale}" 
                   x2="${x - 8*scale + i*4*scale}" y2="${y - 20*scale}" 
                   stroke="#3498db" stroke-width="${1*scale}" opacity="0.7"/>`
        ).join('')}
        <line x1="${x - 8*scale}" y1="${y + 2*scale}" x2="${x - 8*scale}" y2="${y + 15*scale}" 
            stroke="#3498db" stroke-width="${2.5*scale}"/>
        <line x1="${x + 8*scale}" y1="${y + 2*scale}" x2="${x + 8*scale}" y2="${y + 15*scale}" 
            stroke="#e74c3c" stroke-width="${2.5*scale}"/>
        <g transform="translate(${x}, ${y + 30*scale})">
            <rect x="${-label.length * 4}" y="-10" width="${label.length * 8}" height="20" 
                fill="white" stroke="#2c3e50" stroke-width="1.5" rx="3"/>
            <text x="0" y="6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateValvula = function(x, y, label) {
    const scale = this.currentScale;
    const fontSize = Math.max(6, 8 * this.textScale);
    
    return `<g class="valvula-symbol" data-type="valvula">
        <circle cx="${x}" cy="${y}" r="${10*scale}" fill="#e74c3c" stroke="#2c3e50" stroke-width="${2*scale}"/>
        <rect x="${x - 3*scale}" y="${y - 10*scale}" width="${6*scale}" height="${8*scale}" 
            fill="#7f8c8d" stroke="#2c3e50" stroke-width="${1*scale}"/>
        <g transform="translate(${x}, ${y + 25*scale})">
            <rect x="-14" y="-8" width="28" height="16" fill="white" stroke="#2c3e50" stroke-width="1" rx="2"/>
            <text x="0" y="5" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="#2c3e50">${label}</text>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateFixtureSymbol = function(x, y, type, label) {
    switch(type) {
        case 'MEDIDOR': return this.generateMedidor(x, y, label);
        case 'CALEFON': return this.generateCalefon(x, y, label);
        case 'TERMO': return this.generateTermoElectrico(x, y, label);
        case 'WC': return this.generateWCSymbol(x, y, label);
        case 'LAVATORIO': return this.generateLavatorio(x, y, label);
        case 'DUCHA': return this.generateDucha(x, y, label);
        case 'VALVULA': return this.generateValvula(x, y, label);
        default: return this.generateLavatorio(x, y, label);
    }
};

IsometricWaterGenerator.prototype.generatePipeSegment = function(pipe, drawScale) {
    const scale = this.currentScale;
    const fontSize = Math.max(6, 9 * this.textScale);
    const smallFont = Math.max(5, 7 * this.textScale);
    
    const start = this.toIsometric(pipe.x1 * drawScale, pipe.y1 * drawScale, pipe.z1 * drawScale);
    const end = this.toIsometric(pipe.x2 * drawScale, pipe.y2 * drawScale, pipe.z2 * drawScale);
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    
    const pipeColor = pipe.waterType === 'caliente' ? '#e74c3c' : '#3498db';
    const pipeColorDark = pipe.waterType === 'caliente' ? '#c0392b' : '#2980b9';
    
    const labelX = midX + 35 * scale;
    const labelY = midY - 25 * scale;
    const pipeId = `pipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return `<g class="pipe-segment" data-type="pipe" data-pipe-id="${pipeId}">
        <line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" 
            stroke="${pipeColor}" stroke-width="${5*scale}" stroke-linecap="round"/>
        <line x1="${start.x}" y1="${start.y - 2*scale}" x2="${end.x}" y2="${end.y - 2*scale}" 
            stroke="${pipeColorDark}" stroke-width="${1.5*scale}" stroke-linecap="round" opacity="0.6"/>
        <circle cx="${start.x}" cy="${start.y}" r="${2.5*scale}" fill="${pipeColorDark}" 
            stroke="#2c3e50" stroke-width="${0.8*scale}"/>
        <circle cx="${end.x}" cy="${end.y}" r="${2.5*scale}" fill="${pipeColorDark}" 
            stroke="#2c3e50" stroke-width="${0.8*scale}"/>
        <line id="guide-line-${pipeId}" class="pipe-guide-line"
            x1="${midX}" y1="${midY}" x2="${labelX}" y2="${labelY}" 
            stroke="#000000" stroke-width="${Math.max(0.5, 0.8*scale)}" 
            stroke-dasharray="${2*scale},${1*scale}" opacity="0.6" style="pointer-events: none;"/>
        <g class="pipe-label" data-label-id="${pipeId}" 
           data-pipe-center-x="${midX}" data-pipe-center-y="${midY}"
           transform="translate(${labelX}, ${labelY})">
            <rect x="-32" y="-14" width="64" height="28" fill="white" 
                stroke="#2c3e50" stroke-width="${Math.max(0.8, 0.8*scale)}" rx="3" opacity="0.98"/>
            <text x="0" y="-6" text-anchor="middle" font-family="Arial" 
                font-size="${fontSize}" font-weight="bold" fill="${pipeColor}">
                ${pipe.material} ⌀${pipe.diameter}mm</text>
            <text x="0" y="2" text-anchor="middle" font-family="Arial" 
                font-size="${smallFont}" fill="#34495e">L=${pipe.length}m</text>
            <text x="0" y="10" text-anchor="middle" font-family="Arial" 
                font-size="${smallFont}" fill="${pipe.waterType === 'caliente' ? '#e74c3c' : '#3498db'}">
                ${pipe.waterType === 'caliente' ? 'CALIENTE' : 'FRÍA'}</text>
        </g>
        <g transform="translate(${end.x - 16*scale}, ${end.y}) rotate(${angle})">
            <polygon points="0,0 ${-6*scale},${-2.5*scale} ${-6*scale},${2.5*scale}" 
                fill="${pipeColor}" stroke="${pipeColorDark}" stroke-width="${0.5*scale}"/>
        </g>
    </g>`;
};

IsometricWaterGenerator.prototype.generateNorthIndicator = function(x, y) {
    const scale = this.currentScale;
    const fontSize = Math.max(6, 10 * this.textScale);
    
    return `<g class="north-indicator" transform="translate(${x}, ${y})">
        <circle cx="0" cy="0" r="${25*scale}" fill="white" stroke="#2c3e50" stroke-width="${2*scale}"/>
        <polygon points="0,${-15*scale} ${-8*scale},${12*scale} 0,${6*scale} ${8*scale},${12*scale}" fill="#3498db"/>
        <text x="0" y="${42*scale}" text-anchor="middle" font-family="Arial" font-size="${fontSize}" fill="#2c3e50">N</text>
    </g>`;
};

IsometricWaterGenerator.prototype.generateIsometricFromTracing = function(tracingElements, tracingConnections, title = "ISOMÉTRICO - AGUA POTABLE", scale = "SIN ESCALA") {
    if (tracingElements.length === 0 && tracingConnections.length === 0) {
        throw new Error('No hay elementos de trazado para convertir');
    }
    const { fixtures, pipes } = this.convertTracingToIsometric(tracingElements, tracingConnections);
    return this.generateIsometricSVG(pipes, fixtures, title, scale);
};

IsometricWaterGenerator.prototype.generateIsometricSVG = function(pipes = [], fixtures = [], title = "ISOMÉTRICO - AGUA POTABLE", scale = "SIN ESCALA") {
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
    
    const margin = 100;
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
    
    let svg = `<svg width="${finalWidth}" height="${finalHeight + 80}" 
        viewBox="${minX} ${minY - 40} ${finalWidth} ${finalHeight + 80}" 
        xmlns="http://www.w3.org/2000/svg" id="isometricSVG" style="background: transparent;">
        <defs>
            <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
        </defs>
        <g class="title-group" transform="translate(${minX + 20}, ${minY - 20})">
            <text x="0" y="0" font-family="Arial" font-size="${Math.max(10, 14 * this.textScale)}" 
                font-weight="bold" fill="#2c3e50">${title}</text>
            <text x="0" y="14" font-family="Arial" font-size="${Math.max(6, 9 * this.textScale)}" 
                fill="#7f8c8d">${scale}</text>
        </g>`;
    
    pipes.forEach(pipe => {
        svg += this.generatePipeSegment(pipe, scaleValue);
    });
    
    fixtures.forEach(fixture => {
        const pos = this.toIsometric(fixture.x * scaleValue, fixture.y * scaleValue, fixture.z * scaleValue);
        svg += this.generateFixtureSymbol(pos.x, pos.y, fixture.type, fixture.label);
        svg += `<line x1="${pos.x}" y1="${pos.y + 15 * this.currentScale}" x2="${pos.x}" y2="${pos.y + 25 * this.currentScale}" 
            stroke="#95a5a6" stroke-width="${1 * this.currentScale}" stroke-dasharray="${2 * this.currentScale},${1.5 * this.currentScale}" 
            opacity="0.3"/>`;
    });
    
    svg += this.generateNorthIndicator(maxX - 80, minY + 60);
    svg += '</svg>';
    return svg;
};

console.log('✅ Motor Isométrico - SVG cargado');