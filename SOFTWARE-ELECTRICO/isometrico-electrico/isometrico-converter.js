// ========================================
// CONVERSOR 2D → ISOMÉTRICO 3D
// ========================================

const IsometricConverter = {
    
    /**
     * Convertir coordenadas 2D del plano a coordenadas isométricas 3D
     * @param {number} x - Coordenada X del plano 2D
     * @param {number} y - Coordenada Y del plano 2D
     * @param {number} z - Altura (0 = Nivel 1, levelHeight = Nivel 2)
     * @returns {object} - {isoX, isoY} coordenadas isométricas
     */
    toIsometric(x, y, z = 0) {
        // Fórmulas de conversión isométrica
        // isoX = (x - y) * cos(30°)
        // isoY = (x + y) * sin(30°) - z
        
        const isoX = (x - y) * IsometricConfig.scale.x;
        const isoY = (x + y) * IsometricConfig.scale.y - z;
        
        return {
            x: isoX + IsometricConfig.viewport.offsetX,
            y: isoY + IsometricConfig.viewport.offsetY
        };
    },
    
    /**
     * Convertir elemento del plano a posición isométrica
     * @param {object} element - Elemento con {x, y, level}
     * @returns {object} - Coordenadas isométricas
     */
    convertElement(element) {
        const level = element.level || 1;
        const z = level === 2 ? IsometricConfig.levelHeight : 0;
        
        return this.toIsometric(element.x, element.y, z);
    },
    
    /**
     * Generar path isométrico entre dos puntos
     * @param {object} from - Punto origen {x, y, level}
     * @param {object} to - Punto destino {x, y, level}
     * @returns {string} - Path SVG para dibujar tubería isométrica
     */
    generateIsometricPath(from, to) {
        const fromLevel = from.level || 1;
        const toLevel = to.level || 1;
        
        const z1 = fromLevel === 2 ? IsometricConfig.levelHeight : 0;
        const z2 = toLevel === 2 ? IsometricConfig.levelHeight : 0;
        
        const start = this.toIsometric(from.x, from.y, z1);
        const end = this.toIsometric(to.x, to.y, z2);
        
        // Si es conexión vertical (cambio de nivel)
        if (fromLevel !== toLevel) {
            return this.generateVerticalPath(from, to);
        }
        
        // Si es conexión horizontal (mismo nivel)
        return this.generateHorizontalPath(start, end);
    },
    
    /**
     * Generar path horizontal con ángulos isométricos
     * @param {object} start - Punto inicial isométrico
     * @param {object} end - Punto final isométrico
     * @returns {string} - Path SVG
     */
    generateHorizontalPath(start, end) {
        // Calcular punto intermedio para crear ángulos de 30° y 150°
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        
        // Determinar si va más horizontal o vertical
        if (Math.abs(dx) > Math.abs(dy)) {
            // Primero horizontal, luego vertical
            const mid = { x: end.x, y: start.y };
            return `M ${start.x} ${start.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
        } else {
            // Primero vertical, luego horizontal
            const mid = { x: start.x, y: end.y };
            return `M ${start.x} ${start.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
        }
    },
    
    /**
     * Generar path vertical (subida entre niveles)
     * @param {object} from - Punto origen
     * @param {object} to - Punto destino
     * @returns {string} - Path SVG con línea vertical
     */
    generateVerticalPath(from, to) {
        const fromLevel = from.level || 1;
        const toLevel = to.level || 1;
        
        // Punto de subida (nivel 1)
        const z1 = fromLevel === 2 ? IsometricConfig.levelHeight : 0;
        const bottom = this.toIsometric(from.x, from.y, z1);
        
        // Punto de llegada (nivel 2)
        const z2 = toLevel === 2 ? IsometricConfig.levelHeight : 0;
        const top = this.toIsometric(to.x, to.y, z2);
        
        // Si suben del mismo punto (x,y iguales)
        if (Math.abs(from.x - to.x) < 10 && Math.abs(from.y - to.y) < 10) {
            // Línea vertical directa
            return `M ${bottom.x} ${bottom.y} L ${top.x} ${top.y}`;
        } else {
            // Tubería que sube y luego se desplaza
            const midHeight = this.toIsometric(from.x, from.y, IsometricConfig.levelHeight);
            return `M ${bottom.x} ${bottom.y} L ${midHeight.x} ${midHeight.y} L ${top.x} ${top.y}`;
        }
    },
    
    /**
     * Calcular bounding box isométrico de todos los elementos
     * @param {array} elements - Lista de elementos
     * @returns {object} - {minX, maxX, minY, maxY}
     */
    calculateBounds(elements) {
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        elements.forEach(el => {
            const iso = this.convertElement(el);
            minX = Math.min(minX, iso.x);
            maxX = Math.max(maxX, iso.x);
            minY = Math.min(minY, iso.y);
            maxY = Math.max(maxY, iso.y);
        });
        
        return { minX, maxX, minY, maxY };
    },
    
    /**
     * Generar grilla isométrica de fondo
     * @param {number} gridSize - Tamaño de cada celda
     * @returns {array} - Array de líneas de grilla
     */
    generateGrid(gridSize = 50) {
        const lines = [];
        const width = IsometricConfig.viewport.width;
        const height = IsometricConfig.viewport.height;
        
        // Líneas a 30° (eje X isométrico)
        for (let i = -width; i < width * 2; i += gridSize) {
            const start = this.toIsometric(i, -height, 0);
            const end = this.toIsometric(i, height * 2, 0);
            lines.push({ start, end, type: 'x' });
        }
        
        // Líneas a 150° (eje Y isométrico)
        for (let i = -height; i < height * 2; i += gridSize) {
            const start = this.toIsometric(-width, i, 0);
            const end = this.toIsometric(width * 2, i, 0);
            lines.push({ start, end, type: 'y' });
        }
        
        return lines;
    }
};

console.log('✅ Conversor isométrico cargado');
