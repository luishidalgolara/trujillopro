/* ========================================
   COLOCACIÓN DE VANOS EN MUROS
   ======================================== */

// Calcular posición del vano en el muro
function calcularPosicionVano(muro, clickX, clickY) {
    const puntos = muro.puntos;
    let mejorSegmento = 0;
    let menorDistancia = Infinity;
    let mejorPosicion = null;
    
    // Encontrar el segmento más cercano al click
    for (let i = 0; i < puntos.length - 1; i++) {
        const p1 = puntos[i];
        const p2 = puntos[i + 1];
        
        const resultado = puntoMasCercanoEnSegmento(clickX, clickY, p1, p2);
        
        if (resultado.distancia < menorDistancia) {
            menorDistancia = resultado.distancia;
            mejorSegmento = i;
            mejorPosicion = resultado;
        }
    }
    
    // Si el click está muy lejos del muro (>50px), rechazar
    if (menorDistancia > 50) {
        return null;
    }
    
    return {
        segmento: mejorSegmento,
        x: mejorPosicion.x,
        y: mejorPosicion.y,
        distanciaDesdeInicio: mejorPosicion.distanciaDesdeInicio
    };
}

// Calcular punto más cercano en un segmento
function puntoMasCercanoEnSegmento(px, py, p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const longitud = Math.sqrt(dx * dx + dy * dy);
    
    if (longitud === 0) {
        return {
            x: p1.x,
            y: p1.y,
            distancia: Math.sqrt((px - p1.x) ** 2 + (py - p1.y) ** 2),
            distanciaDesdeInicio: 0
        };
    }
    
    // Proyección del punto sobre la línea
    const t = Math.max(0, Math.min(1, ((px - p1.x) * dx + (py - p1.y) * dy) / (longitud * longitud)));
    
    const proyX = p1.x + t * dx;
    const proyY = p1.y + t * dy;
    
    const distancia = Math.sqrt((px - proyX) ** 2 + (py - proyY) ** 2);
    const distanciaDesdeInicio = t * longitud / 100; // Convertir a metros
    
    return {
        x: proyX,
        y: proyY,
        distancia: distancia,
        distanciaDesdeInicio: distanciaDesdeInicio
    };
}

// Agregar vano al muro
function agregarVanoAlMuro(muro, vano) {
    if (!muro.vanos) {
        muro.vanos = [];
    }
    
    // Validar que el vano no se solape con otros
    const solapa = validarSolapamiento(muro, vano);
    if (solapa) {
        alert('⚠️ El vano se solapa con otro existente');
        return false;
    }
    
    // Validar que el vano quepa en el segmento
    const segmento = vano.segmento;
    const p1 = muro.puntos[segmento];
    const p2 = muro.puntos[segmento + 1];
    const longitudSegmento = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) / 100;
    
    if (vano.distanciaDesdeInicio + vano.ancho > longitudSegmento) {
        alert('⚠️ El vano no cabe en este segmento');
        return false;
    }
    
    muro.vanos.push(vano);
    
    // Recalcular volumen
    recalcularVolumenMuro(muro);
    
    return true;
}

// Validar solapamiento
function validarSolapamiento(muro, nuevoVano) {
    if (!muro.vanos || muro.vanos.length === 0) return false;
    
    return muro.vanos.some(vano => {
        if (vano.segmento !== nuevoVano.segmento) return false;
        
        const inicio1 = vano.distanciaDesdeInicio;
        const fin1 = inicio1 + vano.ancho;
        const inicio2 = nuevoVano.distanciaDesdeInicio;
        const fin2 = inicio2 + nuevoVano.ancho;
        
        return !(fin1 < inicio2 || fin2 < inicio1);
    });
}

// Recalcular volumen con vanos
function recalcularVolumenMuro(muro) {
    const largo = parseFloat(muro.largo) || 0;
    const altura = parseFloat(muro.altura) || 0;
    const espesor = parseFloat(muro.espesor) || 0.15;
    
    let volumenTotal = largo * altura * espesor;
    
    // Descontar vanos
    if (muro.vanos && muro.vanos.length > 0) {
        muro.vanos.forEach(vano => {
            const volumenVano = vano.ancho * vano.alto * espesor;
            volumenTotal -= volumenVano;
        });
    }
    
    muro.volumen = volumenTotal;
    return volumenTotal;
}

window.calcularPosicionVano = calcularPosicionVano;
window.agregarVanoAlMuro = agregarVanoAlMuro;
window.recalcularVolumenMuro = recalcularVolumenMuro;