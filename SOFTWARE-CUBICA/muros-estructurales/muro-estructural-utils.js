/* ========================================
   UTILIDADES - MUROS ESTRUCTURALES
   ======================================== */

// Obtener posición del mouse en el canvas con precisión
function obtenerPosicionCanvasEstructural(event) {
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
function calcularDistanciaEstructural(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Verificar si un punto está cerca de una línea
function puntoEnLineaEstructural(punto, inicio, fin, tolerancia) {
    const dist = distanciaPuntoLineaEstructural(punto, inicio, fin);
    return dist < tolerancia;
}

// Calcular distancia de punto a línea
function distanciaPuntoLineaEstructural(punto, inicio, fin) {
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

// Calcular materiales de muro estructural
function calcularMaterialesEstructural(largo, altura, espesor, niveles) {
    // Convertir espesor a metros
    const espesorM = espesor / 100;
    
    // 1. VOLUMEN DE HORMIGÓN
    const volumenHormigon = largo * altura * espesorM;
    
    // 2. DOSIFICACIÓN HORMIGÓN H20 (para 1m³)
    // Razón típica: 1:2:3 (cemento:arena:ripio) + agua
    const sacosCementoPorM3 = 8.5; // sacos de 42.5kg
    const arenaPorM3 = 0.55; // m³
    const ripioPorM3 = 0.83; // m³
    
    const totalCemento = volumenHormigon * sacosCementoPorM3;
    const totalArena = volumenHormigon * arenaPorM3;
    const totalRipio = volumenHormigon * ripioPorM3;
    
    // 3. ENFIERRADURA (acero)
    // Cuantía típica según espesor y niveles
    let cuantiaAcero; // kg/m³
    
    if (niveles === 1) {
        cuantiaAcero = espesor === 15 ? 80 : 90; // kg/m³
    } else { // 2 niveles
        cuantiaAcero = espesor === 15 ? 100 : 120; // kg/m³
    }
    
    const totalFierro = volumenHormigon * cuantiaAcero;
    
    // Desglose aproximado de fierro
    const fierroVertical = totalFierro * 0.60; // 60% barras verticales
    const fierroHorizontal = totalFierro * 0.25; // 25% barras horizontales
    const estribos = totalFierro * 0.15; // 15% estribos
    
    // 4. MOLDAJE
    const areaMoldaje = (largo * altura) * 2; // ambas caras
    
    return {
        // Hormigón
        volumenHormigon: volumenHormigon,
        cemento: totalCemento,
        arena: totalArena,
        ripio: totalRipio,
        
        // Fierro
        totalFierro: totalFierro,
        fierroVertical: fierroVertical,
        fierroHorizontal: fierroHorizontal,
        estribos: estribos,
        
        // Moldaje
        areaMoldaje: areaMoldaje
    };
}