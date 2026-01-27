// ========================================
// RENDERIZADOR ISOMÉTRICO SVG
// ========================================

const IsometricRenderer = {
    
    svgContainer: null,
    isometricGroup: null,
    
    /**
     * Inicializar el canvas isométrico
     */
    initialize() {
        // Buscar o crear SVG para isométrico
        let svg = document.getElementById('isometrico-svg');
        
        if (!svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('id', 'isometrico-svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', `0 0 ${IsometricConfig.viewport.width} ${IsometricConfig.viewport.height}`);
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.style.background = '#f8f9fa';
            svg.style.minHeight = '800px';
        }
        
        this.svgContainer = svg;
        
        // Crear grupo principal
        this.isometricGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.isometricGroup.setAttribute('id', 'isometric-main');
        svg.appendChild(this.isometricGroup);
        
        console.log('✅ Renderizador isométrico inicializado');
        return svg;
    },
    
    /**
     * Limpiar canvas isométrico
     */
    clear() {
        if (this.isometricGroup) {
            this.isometricGroup.innerHTML = '';
        }
    },
    
    /**
     * Dibujar grilla isométrica de fondo
     */
    drawGrid() {
        if (!IsometricConfig.rendering.showGrid) return;
        
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.setAttribute('id', 'isometric-grid');
        gridGroup.setAttribute('opacity', '0.15');
        
        const gridLines = IsometricConverter.generateGrid(50);
        
        gridLines.forEach(line => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            path.setAttribute('x1', line.start.x);
            path.setAttribute('y1', line.start.y);
            path.setAttribute('x2', line.end.x);
            path.setAttribute('y2', line.end.y);
            path.setAttribute('stroke', '#95a5a6');
            path.setAttribute('stroke-width', '0.5');
            gridGroup.appendChild(path);
        });
        
        this.isometricGroup.appendChild(gridGroup);
    },
    
    /**
     * Dibujar tubería isométrica entre dos puntos
     */
    drawPipe(from, to, circuitType = 'C1') {
        const path = IsometricConverter.generateIsometricPath(from, to);
        const color = IsometricConfig.colors[circuitType] || '#95a5a6';
        
        const pipePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pipePath.setAttribute('d', path);
        pipePath.setAttribute('stroke', color);
        pipePath.setAttribute('stroke-width', IsometricConfig.elements.tubeWidth);
        pipePath.setAttribute('fill', 'none');
        pipePath.setAttribute('stroke-linecap', 'round');
        pipePath.setAttribute('stroke-linejoin', 'round');
        pipePath.setAttribute('class', 'isometric-pipe');
        
        // Sombra si está habilitada
        if (IsometricConfig.rendering.shadows) {
            pipePath.setAttribute('filter', 'url(#pipe-shadow)');
        }
        
        this.isometricGroup.appendChild(pipePath);
        
        return pipePath;
    },
    
    /**
     * Dibujar elemento eléctrico (luminaria, enchufe, etc)
     */
    drawElement(element, symbolType) {
        const iso = IsometricConverter.convertElement(element);
        const size = IsometricConfig.elements.boxSize;
        
        // Crear grupo para el elemento
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'isometric-element');
        
        // Cara superior del cubo (rombo isométrico)
        const top = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const topPath = `
            M ${iso.x} ${iso.y}
            L ${iso.x + size * 0.866} ${iso.y + size * 0.5}
            L ${iso.x} ${iso.y + size}
            L ${iso.x - size * 0.866} ${iso.y + size * 0.5}
            Z
        `;
        top.setAttribute('d', topPath);
        top.setAttribute('fill', '#ecf0f1');
        top.setAttribute('stroke', '#2c3e50');
        top.setAttribute('stroke-width', '1.5');
        
        // Cara izquierda
        const left = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const leftPath = `
            M ${iso.x - size * 0.866} ${iso.y + size * 0.5}
            L ${iso.x} ${iso.y + size}
            L ${iso.x} ${iso.y + size * 2}
            L ${iso.x - size * 0.866} ${iso.y + size * 1.5}
            Z
        `;
        left.setAttribute('d', leftPath);
        left.setAttribute('fill', '#bdc3c7');
        left.setAttribute('stroke', '#2c3e50');
        left.setAttribute('stroke-width', '1.5');
        
        // Cara derecha
        const right = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const rightPath = `
            M ${iso.x + size * 0.866} ${iso.y + size * 0.5}
            L ${iso.x} ${iso.y + size}
            L ${iso.x} ${iso.y + size * 2}
            L ${iso.x + size * 0.866} ${iso.y + size * 1.5}
            Z
        `;
        right.setAttribute('d', rightPath);
        right.setAttribute('fill', '#95a5a6');
        right.setAttribute('stroke', '#2c3e50');
        right.setAttribute('stroke-width', '1.5');
        
        group.appendChild(left);
        group.appendChild(right);
        group.appendChild(top);
        
        // Símbolo encima
        const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        symbol.setAttribute('x', iso.x);
        symbol.setAttribute('y', iso.y - 5);
        symbol.setAttribute('text-anchor', 'middle');
        symbol.setAttribute('font-size', '16');
        symbol.textContent = IsometricConfig.symbols[symbolType] || '📍';
        group.appendChild(symbol);
        
        // Etiqueta si está habilitada
        if (IsometricConfig.rendering.showLabels && element.type) {
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', iso.x);
            label.setAttribute('y', iso.y + size * 2 + 15);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '9');
            label.setAttribute('fill', '#2c3e50');
            label.textContent = this.getElementName(element.type);
            group.appendChild(label);
        }
        
        this.isometricGroup.appendChild(group);
        
        return group;
    },
    
    /**
     * Dibujar tubería vertical (subida entre niveles)
     */
    drawVerticalPipe(from, to) {
        const path = IsometricConverter.generateVerticalPath(from, to);
        
        const pipe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pipe.setAttribute('d', path);
        pipe.setAttribute('stroke', IsometricConfig.colors.subida);
        pipe.setAttribute('stroke-width', IsometricConfig.elements.tubeWidth + 1);
        pipe.setAttribute('fill', 'none');
        pipe.setAttribute('stroke-linecap', 'round');
        pipe.setAttribute('stroke-dasharray', '8,4');
        pipe.setAttribute('class', 'isometric-vertical-pipe');
        
        this.isometricGroup.appendChild(pipe);
        
        return pipe;
    },
    
    /**
     * Dibujar plataforma de nivel
     */
    drawLevelPlatform(level, bounds) {
        const z = level === 2 ? IsometricConfig.levelHeight : 0;
        const padding = 50;
        
        const corners = [
            IsometricConverter.toIsometric(bounds.minX - padding, bounds.minY - padding, z),
            IsometricConverter.toIsometric(bounds.maxX + padding, bounds.minY - padding, z),
            IsometricConverter.toIsometric(bounds.maxX + padding, bounds.maxY + padding, z),
            IsometricConverter.toIsometric(bounds.minX - padding, bounds.maxY + padding, z)
        ];
        
        const platformPath = `
            M ${corners[0].x} ${corners[0].y}
            L ${corners[1].x} ${corners[1].y}
            L ${corners[2].x} ${corners[2].y}
            L ${corners[3].x} ${corners[3].y}
            Z
        `;
        
        const platform = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        platform.setAttribute('d', platformPath);
        platform.setAttribute('fill', level === 2 ? 'rgba(155, 89, 182, 0.05)' : 'rgba(52, 152, 219, 0.05)');
        platform.setAttribute('stroke', level === 2 ? '#9b59b6' : '#3498db');
        platform.setAttribute('stroke-width', '2');
        platform.setAttribute('stroke-dasharray', '10,5');
        
        this.isometricGroup.appendChild(platform);
    },
    
    /**
     * Obtener nombre legible del tipo de elemento
     */
    getElementName(type) {
        const names = {
            'luminaria-cielo': 'Luz',
            'enchufe-simple': 'Enchufe',
            'enchufe-doble': 'Enchufe 2x',
            'int-simple': 'Interruptor',
            'lavadora': 'Lavadora',
            'secadora': 'Secadora',
            'refrigerador': 'Refrigerador',
            'microondas': 'Microondas',
            'tablero': 'Tablero',
            'subida-nivel': 'Subida'
        };
        return names[type] || type;
    },
    
    /**
     * Agregar filtros SVG (sombras, etc)
     */
    addFilters() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Filtro de sombra para tuberías
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'pipe-shadow');
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');
        
        const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        shadow.setAttribute('dx', '2');
        shadow.setAttribute('dy', '2');
        shadow.setAttribute('stdDeviation', '2');
        shadow.setAttribute('flood-opacity', '0.3');
        
        filter.appendChild(shadow);
        defs.appendChild(filter);
        this.svgContainer.appendChild(defs);
    },
    
    /**
     * Exportar SVG como imagen
     */
    exportSVG() {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(this.svgContainer);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'isometrico-electrico.svg';
        link.click();
        
        console.log('📥 Isométrico exportado');
    }
};

console.log('✅ Renderizador isométrico cargado');