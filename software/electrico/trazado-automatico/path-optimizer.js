// ========================================
// OPTIMIZADOR DE RUTAS - PATHFINDING
// ========================================
// Genera rutas optimizadas entre elementos eléctricos

const PathOptimizer = {
    
    // Generar ruta simple (línea directa con esquinas en 90°)
    generateOrthogonalPath(start, end) {
        const points = [];
        
        points.push({ x: start.x, y: start.y });
        
        // Decidir si va primero horizontal o vertical
        const deltaX = Math.abs(end.x - start.x);
        const deltaY = Math.abs(end.y - start.y);
        
        if (deltaX > deltaY) {
            // Primero horizontal, luego vertical
            points.push({ x: end.x, y: start.y });
        } else {
            // Primero vertical, luego horizontal
            points.push({ x: start.x, y: end.y });
        }
        
        points.push({ x: end.x, y: end.y });
        
        return points;
    },
    
    // Generar ruta con múltiples segmentos (más natural)
    generateSmartPath(start, end, obstacles = []) {
        const points = [];
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        
        points.push({ x: start.x, y: start.y });
        
        // Calcular punto intermedio inteligente
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        
        // Ruta en "L" o "U" según geometría
        if (Math.abs(deltaX) > 100 && Math.abs(deltaY) > 100) {
            // Ruta en "L"
            const cornerX = start.x + deltaX * 0.7;
            const cornerY = start.y + deltaY * 0.3;
            
            points.push({ x: cornerX, y: start.y });
            points.push({ x: cornerX, y: end.y });
        } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Mayormente horizontal
            points.push({ x: end.x, y: start.y });
        } else {
            // Mayormente vertical
            points.push({ x: start.x, y: end.y });
        }
        
        points.push({ x: end.x, y: end.y });
        
        return this.smoothPath(points);
    },
    
    // Suavizar esquinas (opcional)
    smoothPath(points) {
        // Por ahora retorna los puntos sin modificar
        // En el futuro se puede implementar curvas Bézier
        return points;
    },
    
    // Convertir puntos a path SVG
    pointsToSVGPath(points) {
        if (points.length < 2) return '';
        
        let path = `M ${points[0].x} ${points[0].y}`;
        
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }
        
        return path;
    },
    
    // Generar conexión entre dos elementos
    generateConnection(elementA, elementB, style = 'smart') {
        const connection = {
            from: elementA,
            to: elementB,
            points: [],
            pathData: '',
            length: 0
        };
        
        // Generar puntos según estilo
        if (style === 'direct') {
            connection.points = [
                { x: elementA.x, y: elementA.y },
                { x: elementB.x, y: elementB.y }
            ];
        } else if (style === 'orthogonal') {
            connection.points = this.generateOrthogonalPath(elementA, elementB);
        } else {
            connection.points = this.generateSmartPath(elementA, elementB);
        }
        
        // Convertir a SVG path
        connection.pathData = this.pointsToSVGPath(connection.points);
        
        // Calcular longitud aproximada
        connection.length = this.calculatePathLength(connection.points);
        
        return connection;
    },
    
    // Calcular longitud de un path
    calculatePathLength(points) {
        let length = 0;
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i-1].x;
            const dy = points[i].y - points[i-1].y;
            length += Math.sqrt(dx * dx + dy * dy);
        }
        return length;
    },
    
    // Optimizar múltiples conexiones desde un punto (estrella)
    optimizeStarConnections(center, targets) {
        const connections = [];
        
        // Ordenar targets por ángulo desde el centro
        const sortedTargets = targets.slice().sort((a, b) => {
            const angleA = Math.atan2(a.y - center.y, a.x - center.x);
            const angleB = Math.atan2(b.y - center.y, b.x - center.x);
            return angleA - angleB;
        });
        
        // Generar conexión para cada target
        sortedTargets.forEach(target => {
            const connection = this.generateConnection(center, target, 'smart');
            connections.push(connection);
        });
        
        return connections;
    },
    
    // Optimizar ruta que pasa por múltiples puntos (TSP simplificado)
    optimizeMultiPointPath(points) {
        if (points.length <= 2) {
            return points;
        }
        
        // Algoritmo greedy del vecino más cercano
        const visited = [points[0]];
        const remaining = points.slice(1);
        
        while (remaining.length > 0) {
            const current = visited[visited.length - 1];
            
            // Encontrar el más cercano
            let minDist = Infinity;
            let minIndex = 0;
            
            remaining.forEach((point, index) => {
                const dx = point.x - current.x;
                const dy = point.y - current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < minDist) {
                    minDist = dist;
                    minIndex = index;
                }
            });
            
            visited.push(remaining[minIndex]);
            remaining.splice(minIndex, 1);
        }
        
        return visited;
    },
    
    // Calcular punto óptimo para caja de derivación
    calculateOptimalJunctionPoint(points) {
        if (points.length === 0) return null;
        
        // Centroide simple
        let sumX = 0, sumY = 0;
        points.forEach(p => {
            sumX += p.x;
            sumY += p.y;
        });
        
        return {
            x: sumX / points.length,
            y: sumY / points.length,
            type: 'junction-point'
        };
    }
};

console.log('✅ Optimizador de rutas cargado');
