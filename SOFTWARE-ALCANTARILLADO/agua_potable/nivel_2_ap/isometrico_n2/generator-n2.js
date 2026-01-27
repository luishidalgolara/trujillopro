// nivel_2_ap/isometrico_n2/generator-n2.js - GENERADOR ISOMÉTRICO NIVEL 2

function IsometricWaterGeneratorN2() {
    this.isWindowOpen = false;
    this.currentSVG = null;
    this.windowElement = null;
    this.isIntegrated = false;
    this.currentScale = 1.0;
    this.textScale = 1.0;
    this.minScale = 0.3;
    this.maxScale = 3.0;
    this.isDraggingLabel = false;
}

IsometricWaterGeneratorN2.prototype.toIsometric = function(x, y, z = 0) {
    const angle = Math.PI / 6;
    const cos30 = Math.cos(angle);
    const sin30 = Math.sin(angle);
    return {
        x: (x - z) * cos30,
        y: (x + z) * sin30 + y
    };
};

IsometricWaterGeneratorN2.prototype.convertTracingToIsometric = function(elementosNivel2, conexionesNivel2) {
    console.log('🔍 Convirtiendo trazado a isométrico nivel 2...');
    console.log('📦 Elementos:', elementosNivel2.length);
    console.log('🔗 Conexiones:', conexionesNivel2.length);
    
    const fixtures = elementosNivel2.map(element => ({
        x: element.x,
        y: 0,
        z: element.y,
        type: this.mapElementTypeToFixtureType(element.type),
        label: this.generateElementLabel(element),
        diameter: element.tuberia_diametro || 110,
        nivel: 2
    }));

    const pipes = conexionesNivel2.map((connection, index) => {
        // ✅ CAMBIO: connection.from y connection.to YA SON los objetos completos
        const fromElement = connection.from;
        const toElement = connection.to;
        
        if (!fromElement || !toElement) {
            console.warn(`⚠️ Conexión ${index} inválida:`, connection);
            return null;
        }

        console.log(`✅ Pipe ${index}: (${fromElement.x},${fromElement.y}) → (${toElement.x},${toElement.y})`);

        return {
            x1: fromElement.x,
            y1: 0,
            z1: fromElement.y,
            x2: toElement.x,
            y2: 0,
            z2: toElement.y,
            diameter: connection.diameter || 20,
            material: 'PPR',
            waterType: connection.type || 'fria',
            length: (connection.distance || 10).toFixed(1)
        };
    }).filter(pipe => pipe !== null);

    console.log('✅ Tuberías convertidas:', pipes.length);
    
    return { fixtures, pipes };
};

IsometricWaterGeneratorN2.prototype.mapElementTypeToFixtureType = function(elementType) {
    const mapping = {
        'conexion-nivel-2': 'CONEXION-N2',
        'calefon': 'CALEFON',
        'termo-electrico': 'TERMO',
        'caldera': 'CALDERA',
        'wc': 'WC',
        'lavatorio': 'LAVATORIO',
        'bano-tina': 'TINA',
        'ducha': 'DUCHA',
        'bidet': 'BIDET',
        'urinario': 'URINARIO',
        'lavaplatos': 'LAVAPLATOS',
        'lavacopas': 'LAVACOPAS',
        'lavadora': 'LAVADORA',
        'lavadero': 'LAVADERO',
        'llave-jardin': 'JARDIN',
        'valvula-corte': 'VALVULA',
        'union-tee': 'TEE'
    };
    return mapping[elementType] || 'ARTEFACTO';
};

IsometricWaterGeneratorN2.prototype.generateElementLabel = function(element) {
    const labels = {
        'conexion-nivel-2': 'CN2',
        'calefon': 'CAL',
        'termo-electrico': 'TER',
        'caldera': 'CLD',
        'wc': 'WC',
        'lavatorio': 'LAV',
        'bano-tina': 'TIN',
        'ducha': 'DUC',
        'bidet': 'BID',
        'urinario': 'URI',
        'lavaplatos': 'LPL',
        'lavacopas': 'LCP',
        'lavadora': 'LAV',
        'lavadero': 'LAD',
        'llave-jardin': 'JAR',
        'valvula-corte': 'VLV',
        'union-tee': 'TEE'
    };
    return element.label || labels[element.type] || 'ARF';
};

IsometricWaterGeneratorN2.prototype.generateIsometricFromTracing = function(elementosNivel2, conexionesNivel2, title = "ISOMÉTRICO 2° NIVEL - AGUA POTABLE", scale = "SIN ESCALA") {
    if (elementosNivel2.length === 0 && conexionesNivel2.length === 0) {
        throw new Error('No hay elementos de nivel 2 para convertir');
    }
    const { fixtures, pipes } = this.convertTracingToIsometric(elementosNivel2, conexionesNivel2);
    return this.generateIsometricSVG(pipes, fixtures, title, scale);
};

IsometricWaterGeneratorN2.prototype.generateIsometricSVG = function(pipes = [], fixtures = [], title = "ISOMÉTRICO 2° NIVEL - AGUA POTABLE", scale = "SIN ESCALA") {
    if (pipes.length === 0 && fixtures.length === 0) {
        throw new Error('Se requiere al menos una tubería o artefacto en nivel 2');
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
        xmlns="http://www.w3.org/2000/svg" id="isometricSVGNivel2" style="background: transparent;">
        <defs>
            <filter id="dropShadowN2" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
        </defs>
        <g class="title-group" transform="translate(${minX + 20}, ${minY - 20})">
            <text x="0" y="0" font-family="Arial" font-size="${Math.max(10, 14 * this.textScale)}" 
                font-weight="bold" fill="#e74c3c">${title}</text>
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

window.isometricGeneratorN2 = new IsometricWaterGeneratorN2();
console.log('✅ Motor Isométrico NIVEL 2 - Generator cargado');