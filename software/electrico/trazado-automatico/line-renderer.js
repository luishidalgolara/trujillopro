// ========================================
// RENDERIZADOR DE LÍNEAS - SVG
// ========================================
// Dibuja conductores eléctricos en el plano SVG

const LineRenderer = {
    
    // Contenedor de líneas generadas
    linesGroup: null,
    generatedLines: [],
    
    // Inicializar grupo SVG para líneas
    initialize() {
        const svg = document.getElementById('plano');
        if (!svg) {
            console.error('❌ SVG no encontrado');
            return false;
        }
        
        // Buscar o crear grupo de líneas
        this.linesGroup = svg.querySelector('#trazado-lines');
        if (!this.linesGroup) {
            this.linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.linesGroup.setAttribute('id', 'trazado-lines');
            this.linesGroup.setAttribute('class', 'trazado-automatico');
            svg.appendChild(this.linesGroup);
        }
        
        console.log('✅ Renderizador de líneas inicializado');
        return true;
    },
    
    // Limpiar todas las líneas generadas
    clearAll() {
        if (this.linesGroup) {
            this.linesGroup.innerHTML = '';
        }
        this.generatedLines = [];
        console.log('🧹 Líneas de trazado limpiadas');
    },
    
    // Dibujar una conexión
    drawConnection(connection, options = {}) {
        const {
            color = '#3498db',
            width = 2.5,
            dashArray = null,
            label = null,
            circuitName = null,
            animated = false
        } = options;
        
        if (!this.linesGroup) {
            console.error('❌ Renderizador no inicializado');
            return null;
        }
        
        // Crear path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', connection.pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', width / AppState.zoom); // Ajustar por zoom
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('class', 'conductor-line');
        
        // Aplicar estilo dash si se especifica
        if (dashArray) {
            path.setAttribute('stroke-dasharray', dashArray);
        }
        
        // Animación opcional
        if (animated) {
            path.style.strokeDasharray = connection.length;
            path.style.strokeDashoffset = connection.length;
            path.style.animation = 'drawLine 0.8s ease-out forwards';
        }
        
        // Agregar al grupo
        this.linesGroup.appendChild(path);
        
        // Agregar etiqueta si existe
        if (label || circuitName) {
            this.addLabel(connection, label, circuitName, color);
        }
        
        // Guardar referencia
        this.generatedLines.push({
            path: path,
            connection: connection,
            options: options
        });
        
        return path;
    },
    
    // Agregar etiqueta a una línea
    addLabel(connection, label, circuitName, color) {
        // Calcular punto medio de la conexión
        const points = connection.points;
        const midIndex = Math.floor(points.length / 2);
        const midPoint = points[midIndex];
        
        // Crear texto
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midPoint.x);
        text.setAttribute('y', midPoint.y - 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', 9 / AppState.zoom); // Ajustar por zoom
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', color);
        text.setAttribute('class', 'conductor-label');
        
        // Contenido de la etiqueta
        let labelText = '';
        if (circuitName) labelText += circuitName + ' ';
        if (label) labelText += label;
        
        text.textContent = labelText.trim();
        
        // Fondo blanco para legibilidad
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const bbox = text.getBBox ? text.getBBox() : { x: midPoint.x - 20, y: midPoint.y - 12, width: 40, height: 14 };
        
        bgRect.setAttribute('x', bbox.x - 2);
        bgRect.setAttribute('y', bbox.y - 1);
        bgRect.setAttribute('width', bbox.width + 4);
        bgRect.setAttribute('height', bbox.height + 2);
        bgRect.setAttribute('fill', 'white');
        bgRect.setAttribute('fill-opacity', '0.8');
        bgRect.setAttribute('rx', '2');
        
        this.linesGroup.appendChild(bgRect);
        this.linesGroup.appendChild(text);
    },
    
    // Dibujar línea de alimentación principal (Empalme → Medidor → Tablero)
    drawMainFeed(infrastructure) {
        const sequence = [
            infrastructure.empalme,
            infrastructure.medidor,
            infrastructure.tablero
        ];
        
        for (let i = 0; i < sequence.length - 1; i++) {
            const connection = PathOptimizer.generateConnection(
                sequence[i],
                sequence[i + 1],
                'smart'
            );
            
            this.drawConnection(connection, {
                color: TracerConfig.circuitColors.alimentacion,
                width: TracerConfig.lineWidth.alimentacion,
                label: TracerConfig.conductorSize.alimentacion,
                circuitName: 'ALIMENTACIÓN',
                animated: true
            });
        }
        
        console.log('✅ Línea de alimentación principal dibujada');
    },
    
    // Dibujar circuito desde tablero a elementos
    drawCircuit(tablero, elements, circuitName) {
        if (elements.length === 0) return;
        
        const color = this.getCircuitColor(circuitName);
        const calibre = this.getCircuitCalibre(circuitName);
        
        // Generar conexiones en estrella desde tablero
        const connections = PathOptimizer.optimizeStarConnections(tablero, elements);
        
        connections.forEach((connection, index) => {
            setTimeout(() => {
                this.drawConnection(connection, {
                    color: color,
                    width: TracerConfig.lineWidth.circuito,
                    label: calibre,
                    circuitName: circuitName,
                    animated: true
                });
            }, index * 100); // Animación escalonada
        });
        
        console.log(`✅ Circuito ${circuitName} dibujado (${elements.length} elementos)`);
    },
    
    // Dibujar línea simple entre dos puntos
    drawSingleLine(from, to, color = '#9c27b0', width = 3, style = 'solid') {
        if (!this.linesGroup) {
            console.error('❌ Renderizador no inicializado');
            return null;
        }
        
        // Crear path simple directo
        const pathData = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', width / AppState.zoom);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('class', 'conductor-line level-connector');
        
        if (style === 'dashed') {
            path.setAttribute('stroke-dasharray', '8,4');
        }
        
        this.linesGroup.appendChild(path);
        
        this.generatedLines.push({
            path: path,
            connection: { from, to },
            options: { color, width, style }
        });
        
        return path;
    },
    
    // Obtener color según nombre de circuito
    getCircuitColor(circuitName) {
        const colors = {
            'C1': '#f39c12',  // Naranja - Iluminación
            'C2': '#3498db',  // Azul - Enchufes
            'C3': '#9b59b6',  // Morado - Cocina
            'C4': '#1abc9c',  // Verde agua - Lavadora
            'C5': '#e91e63',  // Rosa - Especiales
            'C6': '#e67e22',  // Naranja oscuro - Secadora
            'C7': '#c0392b',  // Rojo - Horno
            'C8': '#d35400',  // Naranja quemado - Calefón
            'PE': '#27ae60'   // Verde - Tierra
        };
        return colors[circuitName] || '#95a5a6';
    },
    
    // Obtener calibre según circuito
    getCircuitCalibre(circuitName) {
        const calibres = {
            'C1': '2.5mm²',  // Iluminación
            'C2': '2.5mm²',  // Enchufes
            'C3': '6mm²',    // Cocina
            'C4': '2.5mm²',  // Lavadora
            'C5': '2.5mm²',  // Especiales
            'C6': '4mm²',    // Secadora
            'C7': '4mm²',    // Horno
            'C8': '6mm²',    // Calefón
            'PE': '2.5mm²'   // Tierra
        };
        return calibres[circuitName] || '2.5mm²';
    },
    
    // Actualizar líneas al hacer zoom
    updateForZoom(zoomLevel) {
        this.generatedLines.forEach(lineData => {
            const path = lineData.path;
            const options = lineData.options;
            
            // Actualizar grosor
            const baseWidth = options.width || TracerConfig.lineWidth.circuito;
            path.setAttribute('stroke-width', baseWidth / zoomLevel);
        });
        
        // Actualizar etiquetas
        const labels = this.linesGroup.querySelectorAll('.conductor-label');
        labels.forEach(label => {
            const baseFontSize = 9;
            label.setAttribute('font-size', baseFontSize / zoomLevel);
        });
    }
};

// Agregar estilo de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }
    
    .conductor-line {
        transition: stroke-width 0.2s;
    }
    
    .conductor-line:hover {
        stroke-width: 4px;
        filter: drop-shadow(0 0 3px currentColor);
    }
    
    .conductor-label {
        pointer-events: none;
        user-select: none;
    }
`;
document.head.appendChild(style);

console.log('✅ Renderizador de líneas cargado');