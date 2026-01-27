// ========================================
// GENERADOR ISOMÉTRICO - ACCESO DIRECTO
// ========================================

const IsometricGenerator = {
    
    generated: false,
    currentSVG: null,
    isGenerating: false,
    
    level1Elements: [],
    level2Elements: [],
    tablero: null,
    subidasNivel1: [],
    llegadasNivel2: [],
    
    /**
     * Buscar elementos en TODAS las estructuras posibles
     */
    findElements() {
        console.log('🔍 Buscando elementos...');
        
        // 1. PRIMERO: Buscar en AppState (variable global directa)
        if (typeof AppState !== 'undefined' && AppState.elements) {
            console.log('✅ Encontrado en AppState.elements');
            console.log(`  Total: ${AppState.elements.length} elementos`);
            return AppState.elements;
        }
        
        // 2. Buscar en window.AppState (por si acaso)
        if (window.AppState && window.AppState.elements) {
            console.log('✅ Encontrado en window.AppState.elements');
            return window.AppState.elements;
        }
        
        // 3. Buscar en otras estructuras
        const searchPaths = [
            'circuitData',
            'electricalHierarchy', 
            'tracedData',
            'elementsData',
            'planoData'
        ];
        
        for (let path of searchPaths) {
            if (window[path]) {
                console.log(`  Revisando window.${path}:`, window[path]);
                
                if (typeof window[path] === 'object') {
                    for (let key in window[path]) {
                        if (Array.isArray(window[path][key]) && window[path][key].length > 0) {
                            const first = window[path][key][0];
                            if (first && first.type && first.x !== undefined) {
                                console.log(`✅ Encontrado en window.${path}.${key}`);
                                return window[path][key];
                            }
                        }
                    }
                }
            }
        }
        
        // 2. Buscar en el canvas/contexto
        const canvas = document.getElementById('mainCanvas');
        if (canvas && canvas.__data__) {
            console.log('  Revisando canvas.__data__');
            if (Array.isArray(canvas.__data__)) {
                return canvas.__data__;
            }
        }
        
        // 3. Leer TODOS los elementos del SVG de forma agresiva
        console.log('  Leyendo TODOS los elementos del SVG...');
        const svg = document.getElementById('mainCanvas') || document.querySelector('svg');
        if (svg) {
            const elements = [];
            
            // Buscar TODO lo que parezca un elemento
            const allGroups = svg.querySelectorAll('g');
            console.log(`  Total de grupos <g> encontrados: ${allGroups.length}`);
            
            allGroups.forEach((g, i) => {
                // Obtener TODOS los atributos
                const attrs = {};
                for (let attr of g.attributes) {
                    attrs[attr.name] = attr.value;
                }
                
                // Buscar tipo en TODOS los atributos posibles
                let type = attrs['data-type'] || 
                          attrs['data-element-type'] ||
                          attrs['data-symbol-type'] ||
                          attrs['symbol-type'] ||
                          attrs['element-type'] ||
                          attrs['tipo'] ||
                          null;
                
                // Si no hay tipo directo, buscar en el id o class
                if (!type) {
                    const id = attrs['id'] || '';
                    const cls = attrs['class'] || '';
                    
                    // Buscar patrones conocidos
                    if (id.includes('tablero') || cls.includes('tablero')) type = 'tablero';
                    else if (id.includes('luminaria') || cls.includes('luminaria')) type = 'luminaria-cielo';
                    else if (id.includes('enchufe') || cls.includes('enchufe')) type = 'enchufe-simple';
                    else if (id.includes('alimentacion')) type = 'alimentacion';
                    else if (id.includes('iluminacion')) type = 'iluminacion';
                }
                
                // Buscar en elementos hijos con use xlink:href
                if (!type || type === 'symbol') {
                    const useEl = g.querySelector('use');
                    if (useEl) {
                        const href = useEl.getAttribute('xlink:href') || useEl.getAttribute('href') || '';
                        if (href) {
                            // Extraer tipo del href: #symbol-tablero -> tablero
                            type = href.replace(/^#(symbol-|element-)?/, '').trim();
                        }
                    }
                }
                
                if (!type) return;
                
                // Limpiar el tipo
                type = type.toLowerCase()
                    .replace(/^(symbol-|element-|electric-|g\.|class |#)/, '')
                    .trim();
                
                // Buscar posición en transform o en atributos
                let x = 0, y = 0;
                
                // 1. Desde transform
                const transform = attrs['transform'];
                if (transform) {
                    const match = transform.match(/translate\(([^,\s]+)[\s,]+([^)]+)\)/);
                    if (match) {
                        x = parseFloat(match[1]);
                        y = parseFloat(match[2]);
                    }
                }
                
                // 2. Desde atributos data-x, data-y
                if (x === 0 && y === 0) {
                    x = parseFloat(attrs['data-x'] || 0);
                    y = parseFloat(attrs['data-y'] || 0);
                }
                
                // 3. Desde primer hijo con cx/cy o x/y
                if (x === 0 && y === 0) {
                    const shapes = g.querySelectorAll('circle, rect, path, use, image');
                    if (shapes.length > 0) {
                        const shape = shapes[0];
                        x = parseFloat(shape.getAttribute('cx') || shape.getAttribute('x') || 0);
                        y = parseFloat(shape.getAttribute('cy') || shape.getAttribute('y') || 0);
                    }
                }
                
                const level = parseInt(attrs['data-level'] || attrs['nivel'] || 1);
                
                // Si tiene tipo Y posición, agregarlo
                if (type && (x !== 0 || y !== 0)) {
                    // Evitar duplicados
                    const exists = elements.some(el => 
                        el.type === type && 
                        Math.abs(el.x - x) < 1 && 
                        Math.abs(el.y - y) < 1
                    );
                    
                    if (!exists) {
                        elements.push({ type, x, y, level });
                        console.log(`  [${i}] ${type} en (${x.toFixed(1)}, ${y.toFixed(1)}) nivel ${level}`);
                    }
                }
            });
            
            if (elements.length > 0) {
                console.log(`✅ Extraídos ${elements.length} elementos del SVG`);
                return elements;
            }
        }
        
        console.error('❌ No se encontraron elementos en ninguna fuente');
        return null;
    },
    
    /**
     * Generar isométrico
     */
    generate() {
        console.log('⚡ GENERANDO ISOMÉTRICO...');
        
        if (this.isGenerating) {
            return this.currentSVG;
        }
        
        this.isGenerating = true;
        
        try {
            const elements = this.findElements();
            
            if (!elements || elements.length === 0) {
                alert(
                    '⚠️ NO SE ENCONTRARON ELEMENTOS\n\n' +
                    'Asegúrate de:\n' +
                    '1. Colocar elementos en el plano\n' +
                    '2. Presionar GENERAR TRAZADO primero\n' +
                    '3. Luego presionar ISOMÉTRICO 3D'
                );
                return null;
            }
            
            console.log(`✅ Procesando ${elements.length} elementos...`);
            this.processElements(elements);
            
            if (!this.tablero) {
                alert('⚠️ No se encontró el tablero');
                return null;
            }
            
            const svg = this.createSVG();
            this.currentSVG = svg;
            this.generated = true;
            
            console.log('✅ Isométrico generado');
            return svg;
            
        } catch (error) {
            console.error('❌ Error:', error);
            alert('Error: ' + error.message);
            return null;
        } finally {
            this.isGenerating = false;
        }
    },
    
    processElements(elements) {
        this.level1Elements = [];
        this.level2Elements = [];
        this.tablero = null;
        this.subidasNivel1 = [];
        this.llegadasNivel2 = [];
        
        elements.forEach(el => {
            if (el.type.includes('empalme') || el.type.includes('medidor')) return;
            
            if (el.type.includes('tablero')) {
                this.tablero = el;
                return;
            }
            
            if (el.type.includes('subida')) {
                if (el.level === 1) this.subidasNivel1.push(el);
                else this.llegadasNivel2.push(el);
                return;
            }
            
            if (el.level === 2) {
                this.level2Elements.push(el);
            } else {
                this.level1Elements.push(el);
            }
        });
        
        console.log('📊 Resumen:');
        console.log(`  Tablero: ${this.tablero ? 'SÍ' : 'NO'}`);
        console.log(`  Nivel 1: ${this.level1Elements.length}`);
        console.log(`  Nivel 2: ${this.level2Elements.length}`);
    },
    
    createSVG() {
        const all = [
            ...this.level1Elements,
            ...this.level2Elements.map(el => ({...el, z: 200})),
            this.tablero
        ].filter(Boolean);
        
        const bounds = IsometricMath.calculateBounds(
            all.map(el => ({x: el.x, y: el.y, z: el.z || 0}))
        );
        
        if (!bounds) throw new Error('Error en bounds');
        
        const p = 100; // Más padding para el título
        const vb = {
            x: bounds.minX - p,
            y: bounds.minY - p - 60, // Espacio extra arriba para el título
            width: bounds.width + p * 2,
            height: bounds.height + p * 2 + 60
        };
        
        return `<svg id="isometricSVG" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}" preserveAspectRatio="xMidYMid meet" style="background:#f8f9fa">
<defs>
    <filter id="shadow"><feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/></filter>
</defs>
<g id="isometric-main">
    <!-- Título DRAGGABLE -->
    <g class="draggable-label draggable-title" transform="translate(${vb.x + vb.width/2}, ${vb.y + 40})" style="cursor: move;">
        <rect x="-180" y="-20" width="360" height="40" fill="rgba(255,255,255,0)" rx="8" stroke="none"/>
        <text x="0" y="5" text-anchor="middle" font-size="28" font-weight="bold" fill="#2c3e50">ISOMÉTRICO ELÉCTRICO 3D</text>
    </g>
    
    ${this.drawGrid()}
    ${this.drawPlatform(1, bounds)}
    ${this.level2Elements.length > 0 ? this.drawPlatform(2, bounds) : ''}
    ${this.drawPipes()}
    ${this.drawElements()}
</g>
</svg>`;
    },
    
    drawGrid() {
        const lines = IsometricMath.generateGrid(1000, 100, 0);
        return `<g opacity="0.3">${lines.map(l => `<line x1="${l.start.x}" y1="${l.start.y}" x2="${l.end.x}" y2="${l.end.y}" stroke="#e0e0e0" stroke-width="0.5"/>`).join('')}</g>`;
    },
    
    drawPlatform(level, bounds) {
        const z = level === 2 ? 200 : 0;
        const p = 30;
        const c = [
            IsometricMath.to2D(bounds.minX - p, bounds.minY - p, z),
            IsometricMath.to2D(bounds.maxX + p, bounds.minY - p, z),
            IsometricMath.to2D(bounds.maxX + p, bounds.maxY + p, z),
            IsometricMath.to2D(bounds.minX - p, bounds.maxY + p, z)
        ];
        const path = c.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ') + ' Z';
        const color = level === 1 ? 'rgba(52,152,219,0.08)' : 'rgba(155,89,182,0.08)';
        return `<g><path d="${path}" fill="${color}" stroke="#34495e" stroke-width="2" stroke-dasharray="10,5"/><text x="${c[0].x + 10}" y="${c[0].y - 10}" font-size="14" font-weight="bold" fill="#34495e">NIVEL ${level}</text></g>`;
    },
    
    drawPipes() {
        let p = '';
        if (!this.tablero) return p;
        
        let labelId = 0; // ID único para cada etiqueta
        
        // NIVEL 1: Tablero → Elementos
        const tPos = {x: this.tablero.x, y: this.tablero.y, z: 0};
        this.level1Elements.forEach((el, idx) => {
            // Luminarias van al techo (z=150), enchufes al suelo (z=0)
            const isLuminaria = el.type.includes('luminaria') || el.type.includes('aplique');
            const zHeight = isLuminaria ? 150 : 0;
            const elPos = {x: el.x, y: el.y, z: zHeight};
            
            const path = IsometricMath.generatePath(tPos, elPos);
            
            // Dibujar tubería
            const color = isLuminaria ? '#f39c12' : '#3498db';
            p += `<path d="${path}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
            
            // Calcular punto medio para etiqueta
            const midX = (tPos.x + elPos.x) / 2;
            const midY = (tPos.y + elPos.y) / 2;
            const midZ = (tPos.z + elPos.z) / 2;
            const midIso = IsometricMath.to2D(midX, midY, midZ);
            
            // Etiqueta con circuito y calibre - DRAGGABLE
            const circuito = this.getCircuitName(el.type);
            const calibre = this.getCalibre(el.type);
            const label = `${circuito} ${calibre}`;
            
            p += `<g class="draggable-label" data-label-id="label-${labelId}" transform="translate(${midIso.x}, ${midIso.y})" style="cursor: move;">
                <rect x="-30" y="-12" width="60" height="20" fill="white" fill-opacity="0.95" rx="4" stroke="${color}" stroke-width="1.5"/>
                <text x="0" y="3" text-anchor="middle" font-size="10" font-weight="bold" fill="${color}">${label}</text>
            </g>`;
            labelId++;
        });
        
        // Si hay elementos en Nivel 2
        if (this.level2Elements.length > 0) {
            
            // CONEXIÓN VERTICAL: Tablero (N1) → Punto Subida (N1) → Punto Llegada (N2)
            if (this.subidasNivel1.length > 0 && this.llegadasNivel2.length > 0) {
                const subidaN1 = this.subidasNivel1[0];
                const llegadaN2 = this.llegadasNivel2[0];
                
                // Tablero → Punto de subida (horizontal en N1)
                const pathToSubida = IsometricMath.generatePath(
                    tPos, 
                    {x: subidaN1.x, y: subidaN1.y, z: 0}
                );
                p += `<path d="${pathToSubida}" stroke="#9c27b0" stroke-width="4" fill="none" stroke-linecap="round"/>`;
                
                // Etiqueta alimentación - DRAGGABLE
                const midSubidaX = (tPos.x + subidaN1.x) / 2;
                const midSubidaY = (tPos.y + subidaN1.y) / 2;
                const midSubidaIso = IsometricMath.to2D(midSubidaX, midSubidaY, 0);
                p += `<g class="draggable-label" data-label-id="label-${labelId}" transform="translate(${midSubidaIso.x}, ${midSubidaIso.y})" style="cursor: move;">
                    <rect x="-40" y="-12" width="80" height="20" fill="white" fill-opacity="0.95" rx="4" stroke="#9c27b0" stroke-width="1.5"/>
                    <text x="0" y="3" text-anchor="middle" font-size="10" font-weight="bold" fill="#9c27b0">ALIM. 6mm²</text>
                </g>`;
                labelId++;
                
                // Subida vertical (N1 → N2)
                const pathVertical = IsometricMath.generatePath(
                    {x: subidaN1.x, y: subidaN1.y, z: 0},
                    {x: llegadaN2.x, y: llegadaN2.y, z: 200}
                );
                p += `<path d="${pathVertical}" stroke="#9c27b0" stroke-width="4" fill="none" stroke-dasharray="8,4" stroke-linecap="round"/>`;
                
                // Etiqueta vertical - DRAGGABLE
                const verticalIso = IsometricMath.to2D(subidaN1.x + 20, subidaN1.y, 100);
                p += `<g class="draggable-label" data-label-id="label-${labelId}" transform="translate(${verticalIso.x}, ${verticalIso.y})" style="cursor: move;">
                    <rect x="-30" y="-12" width="60" height="20" fill="white" fill-opacity="0.95" rx="4" stroke="#9c27b0" stroke-width="1.5"/>
                    <text x="0" y="3" text-anchor="middle" font-size="10" font-weight="bold" fill="#9c27b0">SUBIDA</text>
                </g>`;
                labelId++;
                
                // NIVEL 2: Punto Llegada → Elementos
                const llegadaPos = {x: llegadaN2.x, y: llegadaN2.y, z: 200};
                this.level2Elements.forEach(el => {
                    // Luminarias van al techo (z=350), enchufes al piso N2 (z=200)
                    const isLuminaria = el.type.includes('luminaria') || el.type.includes('aplique');
                    const zHeight = isLuminaria ? 350 : 200;
                    const elPos = {x: el.x, y: el.y, z: zHeight};
                    
                    const path = IsometricMath.generatePath(llegadaPos, elPos);
                    const color = isLuminaria ? '#f39c12' : '#e91e63';
                    p += `<path d="${path}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
                    
                    // Etiqueta N2 - DRAGGABLE
                    const midX = (llegadaPos.x + elPos.x) / 2;
                    const midY = (llegadaPos.y + elPos.y) / 2;
                    const midZ = (llegadaPos.z + elPos.z) / 2;
                    const midIso = IsometricMath.to2D(midX, midY, midZ);
                    
                    const circuito = this.getCircuitName(el.type);
                    const calibre = this.getCalibre(el.type);
                    const label = `${circuito} ${calibre}`;
                    
                    p += `<g class="draggable-label" data-label-id="label-${labelId}" transform="translate(${midIso.x}, ${midIso.y})" style="cursor: move;">
                        <rect x="-30" y="-12" width="60" height="20" fill="white" fill-opacity="0.95" rx="4" stroke="${color}" stroke-width="1.5"/>
                        <text x="0" y="3" text-anchor="middle" font-size="10" font-weight="bold" fill="${color}">${label}</text>
                    </g>`;
                    labelId++;
                });
                
            } else {
                console.warn('⚠️ Hay elementos en N2 pero faltan puntos de conexión');
            }
        }
        
        return `<g>${p}</g>`;
    },
    
    getCircuitName(type) {
        if (type.includes('luminaria') || type.includes('aplique')) return 'C1';
        if (type.includes('enchufe')) return 'C2';
        if (type.includes('lavadora')) return 'C4';
        if (type.includes('refrigerador')) return 'C5';
        return 'C2';
    },
    
    getCalibre(type) {
        if (type.includes('luminaria') || type.includes('aplique')) return '2.5mm²';
        if (type.includes('enchufe')) return '2.5mm²';
        if (type.includes('lavadora')) return '2.5mm²';
        if (type.includes('cocina')) return '6mm²';
        return '2.5mm²';
    },
    
    drawElements() {
        let els = '';
        
        // TABLERO - Con caja 3D
        if (this.tablero) {
            const z = 0;
            const s = 25; // Más grande para el tablero
            const cube = IsometricMath.generateCube(this.tablero.x - s/2, this.tablero.y - s/2, z, s, s, s);
            const sym = '⚡';
            const c = cube.vertices[5];
            
            els += `<g>
                <path d="${cube.left}" fill="#e74c3c" stroke="#2c3e50" stroke-width="1.5"/>
                <path d="${cube.right}" fill="#c0392b" stroke="#2c3e50" stroke-width="1.5"/>
                <path d="${cube.top}" fill="#e74c3c" stroke="#2c3e50" stroke-width="2"/>
                <text x="${c.x}" y="${c.y - 10}" text-anchor="middle" font-size="20">${sym}</text>
            </g>`;
        }
        
        // PUNTOS DE CONEXIÓN (SUBIDA/LLEGADA) - Con caja pequeña
        [...this.subidasNivel1, ...this.llegadasNivel2].forEach(el => {
            const z = el.level === 2 ? 200 : 0;
            const s = 15;
            const cube = IsometricMath.generateCube(el.x - s/2, el.y - s/2, z, s, s, s);
            const c = cube.vertices[5];
            
            els += `<g>
                <path d="${cube.left}" fill="#9c27b0" stroke="#2c3e50"/>
                <path d="${cube.right}" fill="#7b1fa2" stroke="#2c3e50"/>
                <path d="${cube.top}" fill="#9c27b0" stroke="#2c3e50" stroke-width="1.5"/>
                <text x="${c.x}" y="${c.y - 8}" text-anchor="middle" font-size="14">⬆️</text>
            </g>`;
        });
        
        // ELEMENTOS NIVEL 1
        this.level1Elements.forEach(el => {
            // Luminarias van ARRIBA (simulando techo a altura 150)
            const isLuminaria = el.type.includes('luminaria') || el.type.includes('aplique');
            const zHeight = isLuminaria ? 150 : 0; // Luminarias a 150, enchufes a 0
            
            const pos2D = IsometricMath.to2D(el.x, el.y, zHeight);
            const sym = this.getSymbol(el.type);
            
            // Si es luminaria, dibujar línea bajando desde el techo
            if (isLuminaria) {
                const posFloor = IsometricMath.to2D(el.x, el.y, 0);
                els += `<line x1="${posFloor.x}" y1="${posFloor.y}" x2="${pos2D.x}" y2="${pos2D.y}" stroke="#f39c12" stroke-width="1" stroke-dasharray="3,3"/>`;
            }
            
            els += `<g>
                <circle cx="${pos2D.x}" cy="${pos2D.y}" r="8" fill="white" stroke="#3498db" stroke-width="2"/>
                <text x="${pos2D.x}" y="${pos2D.y + 3}" text-anchor="middle" font-size="12">${sym}</text>
            </g>`;
        });
        
        // ELEMENTOS NIVEL 2
        this.level2Elements.forEach(el => {
            // Luminarias van ARRIBA del nivel 2 (techo a altura 350)
            const isLuminaria = el.type.includes('luminaria') || el.type.includes('aplique');
            const zHeight = isLuminaria ? 350 : 200; // Luminarias a 350, enchufes a 200
            
            const pos2D = IsometricMath.to2D(el.x, el.y, zHeight);
            const sym = this.getSymbol(el.type);
            
            // Si es luminaria, dibujar línea bajando desde el techo
            if (isLuminaria) {
                const posFloor = IsometricMath.to2D(el.x, el.y, 200);
                els += `<line x1="${posFloor.x}" y1="${posFloor.y}" x2="${pos2D.x}" y2="${pos2D.y}" stroke="#f39c12" stroke-width="1" stroke-dasharray="3,3"/>`;
            }
            
            els += `<g>
                <circle cx="${pos2D.x}" cy="${pos2D.y}" r="8" fill="white" stroke="#e91e63" stroke-width="2"/>
                <text x="${pos2D.x}" y="${pos2D.y + 3}" text-anchor="middle" font-size="12">${sym}</text>
            </g>`;
        });
        
        return `<g>${els}</g>`;
    },
    
    getSymbol(type) {
        const symbols = {
            'tablero': '⚡',
            'luminaria': '💡',
            'luminaria-cielo': '💡',
            'aplique': '🔆',
            'enchufe': '🔌',
            'enchufe-simple': '🔌',
            'enchufe-doble': '🔌',
            'lavadora': '🧺',
            'refrigerador': '🧊',
            'subida': '⬆️',
            'subida-nivel': '⬆️'
        };
        for (let key in symbols) {
            if (type.includes(key)) return symbols[key];
        }
        return '🔷';
    }
};

console.log('✅ Generador isométrico cargado (v6 - búsqueda agresiva)');