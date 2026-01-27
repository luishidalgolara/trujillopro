// trazado-modules/point-editor-detection.js
// ============================================================
// DETECCIÓN DE ELEMENTOS Y LÍNEAS
// ============================================================

// ============================================================
// DETECTAR ELEMENTO O LÍNEA BAJO EL CURSOR
// ============================================================
function detectarElementoBajoCursor(x, y) {
    const RADIO_DETECCION = 25;
    
    console.log(`🔍 Detectando bajo cursor en (${x.toFixed(1)}, ${y.toFixed(1)})`);
    
    // ✅ CORREGIDO: Acceso directo a window.elements
    // PRIORIDAD 1: Detectar elementos (cámaras, artefactos)
    for (const elemento of window.elements) {
        const distancia = Math.sqrt(
            Math.pow(elemento.x - x, 2) + Math.pow(elemento.y - y, 2)
        );
        
        if (distancia <= RADIO_DETECCION) {
            console.log(`✅ Elemento detectado: ${elemento.type} (ID: ${elemento.id})`);
            return elemento;
        }
    }
    
    // PRIORIDAD 2: Detectar líneas existentes (para conectar en 90°, perpendicular, ángulo)
    const tracingSvg = document.getElementById('plano');
    const lineas = tracingSvg.querySelectorAll('.pipe-line');
    
    for (const linea of lineas) {
        const puntoEnLinea = detectarPuntoEnLinea(x, y, linea);
        
        if (puntoEnLinea) {
            console.log(`✅ LÍNEA detectada - Conectando en ángulo`);
            
            // Crear un elemento virtual en el punto de intersección
            return {
                id: `intersection_${Date.now()}`,
                x: puntoEnLinea.x,
                y: puntoEnLinea.y,
                type: 'intersection',
                isVirtual: true,
                parentLine: linea
            };
        }
    }
    
    console.log('❌ No se detectó nada bajo el cursor');
    return null;
}

// ============================================================
// DETECTAR SI UN PUNTO ESTÁ CERCA DE UNA LÍNEA
// ============================================================
function detectarPuntoEnLinea(x, y, linea) {
    const x1 = parseFloat(linea.getAttribute('x1'));
    const y1 = parseFloat(linea.getAttribute('y1'));
    const x2 = parseFloat(linea.getAttribute('x2'));
    const y2 = parseFloat(linea.getAttribute('y2'));
    
    const TOLERANCIA = 15;
    
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    
    let param = -1;
    if (len_sq !== 0) {
        param = dot / len_sq;
    }
    
    let xx, yy;
    
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    
    const dx = x - xx;
    const dy = y - yy;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    
    if (distancia <= TOLERANCIA) {
        console.log(`📏 Punto en línea detectado: (${xx.toFixed(1)}, ${yy.toFixed(1)}) - distancia: ${distancia.toFixed(1)}px`);
        return { x: xx, y: yy };
    }
    
    return null;
}

console.log('✅ Point Editor Detection cargado');