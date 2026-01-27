// ========================================
// MATEMÁTICA ISOMÉTRICA REAL
// ========================================
// Proyección isométrica con ángulos correctos 30°-30°-120°

const IsometricMath = {
    
    // Constantes isométricas
    ANGLE_X: 30 * Math.PI / 180,  // 30° para eje X
    ANGLE_Y: 30 * Math.PI / 180,  // 30° para eje Y
    ANGLE_Z: 90 * Math.PI / 180,  // 90° para eje Z (vertical)
    
    // Factores de escala para perspectiva isométrica
    SCALE_X: Math.cos(30 * Math.PI / 180),  // ≈ 0.866
    SCALE_Y: Math.sin(30 * Math.PI / 180),  // = 0.5
    SCALE_Z: 1.0,                            // Sin escala en altura
    
    /**
     * Convertir coordenadas 3D a 2D isométrico
     * @param {number} x - Coordenada X del mundo real
     * @param {number} y - Coordenada Y del mundo real (profundidad)
     * @param {number} z - Coordenada Z del mundo real (altura)
     * @returns {object} - {x, y} en coordenadas isométricas 2D
     */
    to2D(x, y, z) {
        // Fórmulas de proyección isométrica estándar:
        // isoX = (x - y) * cos(30°)
        // isoY = (x + y) * sin(30°) - z
        
        const isoX = (x - y) * this.SCALE_X;
        const isoY = (x + y) * this.SCALE_Y - z;
        
        return { x: isoX, y: isoY };
    },
    
    /**
     * Convertir elemento del plano eléctrico a coordenadas isométricas
     * @param {object} element - Elemento con {x, y, level}
     * @param {number} levelHeight - Altura entre niveles
     * @returns {object} - Coordenadas isométricas 2D
     */
    elementTo2D(element, levelHeight = 200) {
        const level = element.level || 1;
        const z = level === 2 ? levelHeight : 0;
        
        return this.to2D(element.x, element.y, z);
    },
    
    /**
     * Generar path isométrico entre dos puntos
     * @param {object} from - Punto origen {x, y, z}
     * @param {object} to - Punto destino {x, y, z}
     * @returns {string} - Path SVG
     */
    generatePath(from, to) {
        const start = this.to2D(from.x, from.y, from.z || 0);
        const end = this.to2D(to.x, to.y, to.z || 0);
        
        // Si es el mismo nivel, usar path ortogonal isométrico
        if (Math.abs((from.z || 0) - (to.z || 0)) < 1) {
            return this.generateHorizontalPath(from, to);
        }
        
        // Si cambia de nivel, incluir segmento vertical
        return this.generateVerticalPath(from, to);
    },
    
    /**
     * Generar path horizontal con ángulos isométricos (30° o 150°)
     * MEJORADO: Sigue los ejes isométricos correctamente
     */
    generateHorizontalPath(from, to) {
        const start = this.to2D(from.x, from.y, from.z || 0);
        const end = this.to2D(to.x, to.y, to.z || 0);
        
        // Calcular diferencias en el espacio 3D
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        
        // MEJORADO: Crear camino en pasos isométricos
        // Primero: moverse en un eje, luego en el otro
        
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            // Distancia muy corta, línea directa
            return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
        }
        
        // Determinar cuál movimiento es mayor
        if (Math.abs(dx) > Math.abs(dy)) {
            // Primero mover en X, luego en Y
            const mid = this.to2D(to.x, from.y, from.z || 0);
            return `M ${start.x} ${start.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
        } else {
            // Primero mover en Y, luego en X
            const mid = this.to2D(from.x, to.y, from.z || 0);
            return `M ${start.x} ${start.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
        }
    },
    
    /**
     * Generar path vertical (entre niveles o bajadas desde techo)
     * MEJORADO: Maneja correctamente bajadas de luminarias y conexiones entre niveles
     */
    generateVerticalPath(from, to) {
        const start = this.to2D(from.x, from.y, from.z || 0);
        
        // Punto intermedio: subir/bajar verticalmente en el origen
        const midZ = Math.max(from.z || 0, to.z || 0);
        const mid1 = this.to2D(from.x, from.y, midZ);
        
        // Verificar si los puntos X,Y son diferentes
        const dx = Math.abs(from.x - to.x);
        const dy = Math.abs(from.y - to.y);
        
        if (dx > 1 || dy > 1) {
            // Los puntos están separados en X,Y
            // Crear path: subir → mover horizontal → bajar
            
            // Determinar dirección horizontal (X o Y primero)
            if (dx > dy) {
                // Mover primero en X
                const mid2 = this.to2D(to.x, from.y, midZ);
                const mid3 = this.to2D(to.x, to.y, midZ);
                const end = this.to2D(to.x, to.y, to.z || 0);
                return `M ${start.x} ${start.y} L ${mid1.x} ${mid1.y} L ${mid2.x} ${mid2.y} L ${mid3.x} ${mid3.y} L ${end.x} ${end.y}`;
            } else {
                // Mover primero en Y
                const mid2 = this.to2D(from.x, to.y, midZ);
                const mid3 = this.to2D(to.x, to.y, midZ);
                const end = this.to2D(to.x, to.y, to.z || 0);
                return `M ${start.x} ${start.y} L ${mid1.x} ${mid1.y} L ${mid2.x} ${mid2.y} L ${mid3.x} ${mid3.y} L ${end.x} ${end.y}`;
            }
        }
        
        // Si suben/bajan del mismo punto (línea vertical pura)
        const end = this.to2D(to.x, to.y, to.z || 0);
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    },
    
    /**
     * Crear cubo isométrico (para elementos)
     */
    generateCube(x, y, z, width, height, depth) {
        const w = width;
        const h = height;
        const d = depth;
        
        // 8 vértices del cubo en coordenadas 3D
        const vertices = [
            this.to2D(x, y, z),         // 0: inferior-frente-izq
            this.to2D(x + w, y, z),     // 1: inferior-frente-der
            this.to2D(x + w, y + d, z), // 2: inferior-atrás-der
            this.to2D(x, y + d, z),     // 3: inferior-atrás-izq
            this.to2D(x, y, z + h),     // 4: superior-frente-izq
            this.to2D(x + w, y, z + h), // 5: superior-frente-der
            this.to2D(x + w, y + d, z + h), // 6: superior-atrás-der
            this.to2D(x, y + d, z + h)  // 7: superior-atrás-izq
        ];
        
        // 3 caras visibles en isométrico (superior, izquierda, derecha)
        return {
            top: `M ${vertices[4].x} ${vertices[4].y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[6].x} ${vertices[6].y} L ${vertices[7].x} ${vertices[7].y} Z`,
            left: `M ${vertices[0].x} ${vertices[0].y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[7].x} ${vertices[7].y} L ${vertices[4].x} ${vertices[4].y} Z`,
            right: `M ${vertices[1].x} ${vertices[1].y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[6].x} ${vertices[6].y} L ${vertices[2].x} ${vertices[2].y} Z`,
            vertices: vertices
        };
    },
    
    /**
     * Calcular centro de un cubo
     */
    getCubeCenter(x, y, z, width, height, depth) {
        const centerX = x + width / 2;
        const centerY = y + depth / 2;
        const centerZ = z + height;
        
        return this.to2D(centerX, centerY, centerZ);
    },
    
    /**
     * Generar grilla isométrica
     */
    generateGrid(size, spacing, levelHeight = 0) {
        const lines = [];
        
        // Líneas paralelas al eje X (30° hacia derecha)
        for (let y = 0; y <= size; y += spacing) {
            const start = this.to2D(0, y, levelHeight);
            const end = this.to2D(size, y, levelHeight);
            lines.push({ start, end, type: 'x' });
        }
        
        // Líneas paralelas al eje Y (30° hacia izquierda)
        for (let x = 0; x <= size; x += spacing) {
            const start = this.to2D(x, 0, levelHeight);
            const end = this.to2D(x, size, levelHeight);
            lines.push({ start, end, type: 'y' });
        }
        
        return lines;
    },
    
    /**
     * Calcular bounding box en coordenadas isométricas
     */
    calculateBounds(points) {
        if (points.length === 0) return null;
        
        const isoPoints = points.map(p => this.to2D(p.x, p.y, p.z || 0));
        
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        isoPoints.forEach(p => {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        });
        
        return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
    }
};

console.log('✅ Matemática isométrica REAL cargada');