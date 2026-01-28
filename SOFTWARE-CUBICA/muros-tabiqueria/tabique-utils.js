/* ========================================
   UTILIDADES - TABIQUERÍA
   ======================================== */

// Obtener posición del mouse en el canvas con precisión
function obtenerPosicionCanvas(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

// Calcular distancia entre dos puntos
function calcularDistancia(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Verificar si un punto está cerca de una línea
function puntoEnLinea(punto, inicio, fin, tolerancia) {
    const dist = distanciaPuntoLinea(punto, inicio, fin);
    return dist < tolerancia;
}

// Calcular distancia de punto a línea
function distanciaPuntoLinea(punto, inicio, fin) {
    const A = punto.x - inicio.x;
    const B = punto.y - inicio.y;
    const C = fin.x - inicio.x;
    const D = fin.y - inicio.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;
    
    let xx, yy;
    
    if (param < 0) {
        xx = inicio.x;
        yy = inicio.y;
    } else if (param > 1) {
        xx = fin.x;
        yy = fin.y;
    } else {
        xx = inicio.x + param * C;
        yy = inicio.y + param * D;
    }
    
    const dx = punto.x - xx;
    const dy = punto.y - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
}

// Calcular cantidad de montantes según largo y separación
function calcularMontantes(largo, separacion) {
    // Separación en metros (0.40 o 0.60)
    const separacionMetros = separacion / 100;
    
    // Cantidad de espacios = largo / separación
    const espacios = Math.floor(largo / separacionMetros);
    
    // Cantidad de montantes = espacios + 1 (incluye inicial y final)
    const cantidadMontantes = espacios + 1;
    
    return cantidadMontantes;
}

// Calcular materiales de tabique
function calcularMaterialesTabique(largo, altura, separacion, conAislacion = false) {
    const cantidadMontantes = calcularMontantes(largo, separacion);
    
    // 1. SOLERAS (superior e inferior)
    const soleraInferior = largo;
    const soleraSuperior = largo;
    const totalSoleras = soleraInferior + soleraSuperior;
    
    // 2. PIES DERECHOS (montantes verticales)
    const metrosPiesDerechos = cantidadMontantes * altura;
    
    // 3. REFUERZOS HORIZONTALES (cada 1.2m de altura)
    const cantidadRefuerzosHorizontales = Math.floor(altura / 1.2);
    const metrosRefuerzosHorizontales = cantidadRefuerzosHorizontales * largo;
    
    // 4. PLACAS (ambas caras)
    const areaPlacas = (largo * altura) * 2;
    
    // 5. AISLACIÓN (si aplica)
    const areaAislacion = conAislacion ? (largo * altura) : 0;
    
    // 6. TORNILLOS APROXIMADOS (cada 20cm en perímetro y cada 30cm en campo)
    const perimetroPlaca = (largo + altura) * 2;
    const tornillosPerimetro = Math.ceil(perimetroPlaca / 0.20) * 2; // ambas caras
    const tornillosCampo = Math.ceil((areaPlacas / 2) / 0.09) * 2; // cada 30cm x 30cm
    const totalTornillos = tornillosPerimetro + tornillosCampo;
    
    return {
        // Soleras
        soleraInferior: soleraInferior,
        soleraSuperior: soleraSuperior,
        totalSoleras: totalSoleras,
        
        // Pies derechos
        cantidadPiesDerechos: cantidadMontantes,
        metrosPiesDerechos: metrosPiesDerechos,
        
        // Refuerzos
        cantidadRefuerzosHorizontales: cantidadRefuerzosHorizontales,
        metrosRefuerzosHorizontales: metrosRefuerzosHorizontales,
        
        // Placas
        areaPlacas: areaPlacas,
        
        // Aislación
        areaAislacion: areaAislacion,
        
        // Tornillos
        totalTornillos: totalTornillos
    };
}