// js/mst-algorithm.js - CON LOGS DE DEBUGGING
import { calcularDistancia } from './utils.js';
import { addConnection } from './config.js';

export class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            return true;
        }
        return false;
    }
}

export function kruskalMST(points, medidorPrincipal) {
    const edges = [];
    const n = points.length;
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const weight = calcularDistancia(points[i], points[j]);
            
            let adjustedWeight = weight;
            
            if (points[i] === medidorPrincipal || points[j] === medidorPrincipal) {
                adjustedWeight *= 0.7;
            }
            
            const deltaX = Math.abs(points[j].x - points[i].x);
            const deltaY = Math.abs(points[j].y - points[i].y);
            
            if (deltaX > 5 && deltaY > 5) {
                adjustedWeight *= 1.3;
            }
            
            edges.push({
                from: i,
                to: j,
                weight: adjustedWeight,
                originalWeight: weight,
                fromElement: points[i],
                toElement: points[j]
            });
        }
    }
    
    edges.sort((a, b) => a.weight - b.weight);
    
    const unionFind = new UnionFind(n);
    const mstEdges = [];
    
    for (const edge of edges) {
        if (unionFind.union(edge.from, edge.to)) {
            mstEdges.push(edge);
            if (mstEdges.length === n - 1) break;
        }
    }
    
    return mstEdges;
}

export function clusterElementsByProximity(elementosConsumo, maxDistance = 80) {
    const clusters = [];
    const visited = new Set();
    
    for (const elemento of elementosConsumo) {
        if (visited.has(elemento.id)) continue;
        
        const cluster = [elemento];
        visited.add(elemento.id);
        
        for (const otroElemento of elementosConsumo) {
            if (visited.has(otroElemento.id)) continue;
            
            const distancia = calcularDistancia(elemento, otroElemento);
            if (distancia <= maxDistance) {
                cluster.push(otroElemento);
                visited.add(otroElemento.id);
            }
        }
        
        clusters.push(cluster);
    }
    
    return clusters;
}

export function findOptimalConnectionPoint(cluster, medidorPrincipal) {
    if (cluster.length === 1) {
        return cluster[0];
    }
    
    const centroide = {
        x: cluster.reduce((sum, el) => sum + el.x, 0) / cluster.length,
        y: cluster.reduce((sum, el) => sum + el.y, 0) / cluster.length,
        id: `cluster-${Date.now()}`,
        type: 'cluster-center'
    };
    
    let mejorElemento = cluster[0];
    let menorDistancia = calcularDistancia(centroide, cluster[0]);
    
    for (const elemento of cluster) {
        const distancia = calcularDistancia(centroide, elemento);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            mejorElemento = elemento;
        }
    }
    
    return mejorElemento;
}

export function findClosestPipeConnection(elemento, connections) {
    let mejorConexion = null;
    let menorDistancia = Infinity;
    let mejorPunto = null;
    
    for (const conn of connections) {
        const puntoProyectado = projectPointOnLine(
            elemento,
            conn.from,
            conn.to
        );
        
        const distancia = calcularDistancia(elemento, puntoProyectado);
        
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            mejorConexion = conn;
            mejorPunto = puntoProyectado;
        }
    }
    
    return {
        connection: mejorConexion,
        point: mejorPunto,
        distance: menorDistancia
    };
}

function projectPointOnLine(punto, lineStart, lineEnd) {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    
    if (dx === 0 && dy === 0) {
        return { x: lineStart.x, y: lineStart.y };
    }
    
    const t = Math.max(0, Math.min(1, 
        ((punto.x - lineStart.x) * dx + (punto.y - lineStart.y) * dy) / 
        (dx * dx + dy * dy)
    ));
    
    return {
        x: lineStart.x + t * dx,
        y: lineStart.y + t * dy,
        id: `projection-${Date.now()}`,
        type: 'punto-derivacion'
    };
}

export function createPerpendicularPath(desde, hacia, tipoRed, diameter, createTuberiaFunc, nivel = 1) {
    const deltaX = Math.abs(hacia.x - desde.x);
    const deltaY = Math.abs(hacia.y - desde.y);
    
    console.log(`📏 createPerpendicularPath: ${desde.id} → ${hacia.id}, deltaX=${deltaX.toFixed(2)}, deltaY=${deltaY.toFixed(2)}`);
    
    // ✅ SI ES LÍNEA RECTA (horizontal o vertical pura), CREAR CON ETIQUETA
    if (deltaX < 5 || deltaY < 5) {
        console.log(`  ✅ Línea RECTA detectada - Creando con etiqueta`);
        createTuberiaFunc(desde, hacia, tipoRed, diameter, nivel, true);
        return;
    }
    
    console.log(`  🔄 Línea en "L" detectada - Creando sin etiquetas en segmentos`);
    
    // ✅ SI ES PERPENDICULAR (EN "L"), CREAR SEGMENTOS SIN ETIQUETAS
    let puntoIntermedio;
    
    if (deltaX > deltaY) {
        puntoIntermedio = {
            x: hacia.x,
            y: desde.y,
            id: `intermediate-${Date.now()}`,
            type: 'punto-intermedio'
        };
    } else {
        puntoIntermedio = {
            x: desde.x,
            y: hacia.y,
            id: `intermediate-${Date.now()}`,
            type: 'punto-intermedio'
        };
    }
    
    // ✅ CREAR PRIMER SEGMENTO SIN ETIQUETA
    createTuberiaFunc(desde, puntoIntermedio, tipoRed, diameter, nivel, false);
    
    // ✅ CALCULAR DIÁMETRO FINAL PARA SEGUNDO SEGMENTO
    let finalDiameter = diameter;
    if (diameter >= 32 && hacia.categoria === 'consumo') {
        if (hacia.especificaciones?.categoria_demanda === 'alta' || hacia.type === 'ducha') {
            finalDiameter = 25;
        } else {
            finalDiameter = 20;
        }
    } else if (diameter === 25 && hacia.categoria === 'consumo' && hacia.especificaciones?.categoria_demanda !== 'alta') {
        finalDiameter = 20;
    }
    
    // ✅ CREAR SEGUNDO SEGMENTO SIN ETIQUETA
    createTuberiaFunc(puntoIntermedio, hacia, tipoRed, finalDiameter, nivel, false);
    
    // ✅ CALCULAR DISTANCIA TOTAL DE LA CONEXIÓN COMPLETA
    const distanciaTotal = calcularDistancia(desde, hacia);
    const distanciaMetrosTotal = distanciaTotal * (window.currentScale || 50) / 1000;
    
    // Determinar el color según el diámetro principal
    let color;
    switch(diameter) {
        case 40: color = '#8b5cf6'; break;
        case 32: color = '#2563eb'; break;
        case 25: color = '#10b981'; break;
        case 20: color = '#ef4444'; break;
        default: color = '#6b7280';
    }
    
    // ✅ GUARDAR CONEXIÓN VIRTUAL PARA QUE LA ETIQUETA PUEDA ENCONTRARLA
    addConnection({
        from: desde,
        to: hacia,
        distance: distanciaMetrosTotal,
        diameter: diameter,
        type: tipoRed,
        material: 'PPR',
        lineType: 'conexion-compuesta',
        isVirtual: true
    });
    
    console.log(`  🏷️ Creando etiqueta para conexión virtual: ${desde.id}-${hacia.id}`);
    
    // ✅ IMPORTAR DINÁMICAMENTE Y CREAR LA ETIQUETA
    import('./draggable-texts.js').then(module => {
        module.createTextWithDivider(desde, hacia, distanciaMetrosTotal, diameter, tipoRed, color);
    }).catch(err => {
        console.error('❌ Error al crear etiqueta:', err);
    });
}