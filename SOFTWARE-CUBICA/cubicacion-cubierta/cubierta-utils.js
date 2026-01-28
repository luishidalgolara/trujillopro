/* ========================================
   UTILIDADES - CUBIERTAS
   ======================================== */

// Obtener posición del mouse en el canvas
function obtenerPosicionCanvasCubierta(event) {
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
function calcularDistanciaCubierta(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Verificar si un punto está dentro de un polígono
function puntoEnPoligonoCubierta(punto, poligono) {
    let inside = false;
    for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
        const xi = poligono[i].x, yi = poligono[i].y;
        const xj = poligono[j].x, yj = poligono[j].y;
        
        const intersect = ((yi > punto.y) !== (yj > punto.y))
            && (punto.x < (xj - xi) * (punto.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Calcular área de polígono (proyección horizontal)
function calcularAreaPoligonoCubierta(puntos) {
    let area = 0;
    for (let i = 0; i < puntos.length; i++) {
        const j = (i + 1) % puntos.length;
        area += puntos[i].x * puntos[j].y;
        area -= puntos[j].x * puntos[i].y;
    }
    return Math.abs(area / 2);
}

// Convertir pendiente de grados a porcentaje
function gradosAPorcentaje(grados) {
    return Math.tan(grados * Math.PI / 180) * 100;
}

// Convertir pendiente de porcentaje a grados
function porcentajeAGrados(porcentaje) {
    return Math.atan(porcentaje / 100) * 180 / Math.PI;
}

// Calcular superficie real del techo considerando pendiente
function calcularSuperficieReal(areaProyeccion, pendienteGrados) {
    // Superficie real = Área proyección / cos(pendiente)
    const radianes = pendienteGrados * Math.PI / 180;
    const factorInclinacion = 1 / Math.cos(radianes);
    return areaProyeccion * factorInclinacion;
}

// Calcular materiales de cubierta
function calcularMaterialesCubierta(areaProyeccion, pendienteGrados, numeroAguas, longitudAleros, tipoCubierta, largoPlanchaUtil) {
    // 1. SUPERFICIE REAL considerando pendiente
    const superficieReal = calcularSuperficieReal(areaProyeccion, pendienteGrados);
    
    // 2. ÁREA DE ALEROS (perímetro aproximado × ancho alero)
    // Estimamos perímetro como 4 × √área para polígono aproximado
    const perimetroAprox = 4 * Math.sqrt(areaProyeccion);
    const areaAleros = longitudAleros > 0 ? (perimetroAprox * longitudAleros) : 0;
    
    // 3. SUPERFICIE TOTAL (techo + aleros)
    const superficieTotal = superficieReal + areaAleros;
    
    // 4. TRASLAPOS según tipo de cubierta
    let factorTraslape = 1.0;
    switch(tipoCubierta) {
        case 'zinc':
            factorTraslape = 1.10; // 10% por traslapos
            break;
        case 'zincalum':
            factorTraslape = 1.08; // 8% por traslapos
            break;
        case 'metalica':
            factorTraslape = 1.08; // 8% por traslapos
            break;
        case 'teja-asfaltica':
            factorTraslape = 1.15; // 15% por traslapos
            break;
    }
    
    // 5. DESPERDICIO (5-10% adicional)
    const factorDesperdicio = 1.08; // 8% promedio
    
    // 6. SUPERFICIE TOTAL A COMPRAR
    const superficieTotalConTraslapes = superficieTotal * factorTraslape;
    const superficieFinal = superficieTotalConTraslapes * factorDesperdicio;
    
    // 7. CANTIDAD DE PLANCHAS (si aplica)
    let cantidadPlanchas = 0;
    let anchoPlanchaUtil = 0;
    
    if (tipoCubierta !== 'teja-asfaltica' && largoPlanchaUtil > 0) {
        // Ancho útil típico de planchas metálicas: 0.85m - 1.00m
        anchoPlanchaUtil = 0.85; // metros
        const areaPlanca = largoPlanchaUtil * anchoPlanchaUtil;
        cantidadPlanchas = Math.ceil(superficieFinal / areaPlanca);
    }
    
    return {
        areaProyeccion: areaProyeccion,
        superficieReal: superficieReal,
        areaAleros: areaAleros,
        superficieTotal: superficieTotal,
        superficieConTraslapes: superficieTotalConTraslapes,
        superficieFinal: superficieFinal,
        desperdicio: superficieFinal - superficieTotal,
        cantidadPlanchas: cantidadPlanchas,
        largoPlanchaUtil: largoPlanchaUtil,
        anchoPlanchaUtil: anchoPlanchaUtil
    };
}
