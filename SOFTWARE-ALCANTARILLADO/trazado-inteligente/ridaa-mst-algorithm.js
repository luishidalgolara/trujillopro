// trazado-inteligente/ridaa-mst-algorithm.js

function generarTrazadoProfesional(camarasDomiciliarias, colectorPublico) {
    console.log('🎯 Generando trazado profesional con MST optimizado...');
    
    const camaraFinal = camarasDomiciliarias.reduce((masCercana, camara) => {
        const distanciaActual = calcularDistancia(camara, colectorPublico);
        const distanciaMasCercana = calcularDistancia(masCercana, colectorPublico);
        return distanciaActual < distanciaMasCercana ? camara : masCercana;
    });
    
    console.log(`├─ Cámara FINAL identificada: ${camaraFinal.numeroCamera || camaraFinal.id}`);
    
    const conexiones = [];
    const camarasRestantes = camarasDomiciliarias.filter(c => c.id !== camaraFinal.id);
    
    if (camarasRestantes.length === 0) {
        conexiones.push({
            desde: camaraFinal,
            hacia: colectorPublico,
            tipo: 'final-a-publico',
            distancia: calcularDistancia(camaraFinal, colectorPublico)
        });
    } else {
        const mstConexiones = algoritmoMSTOptimizado(camarasRestantes, camaraFinal);
        
        mstConexiones.forEach(conexion => {
            conexiones.push({
                desde: conexion.desde,
                hacia: conexion.hacia,
                tipo: 'camara-a-camara',
                distancia: conexion.distancia
            });
        });
        
        conexiones.push({
            desde: camaraFinal,
            hacia: colectorPublico,
            tipo: 'final-a-publico',
            distancia: calcularDistancia(camaraFinal, colectorPublico)
        });
    }
    
    console.log(`├─ ${conexiones.length} conexiones profesionales generadas`);
    return conexiones;
}

function algoritmoMSTOptimizado(camarasRestantes, camaraFinal) {
    console.log('🌳 Aplicando algoritmo MST optimizado...');
    
    const conexiones = [];
    const visitadas = new Set([camaraFinal.id]);
    const noVisitadas = [...camarasRestantes];
    
    while (noVisitadas.length > 0) {
        let mejorConexion = null;
        let distanciaMinima = Infinity;
        let indiceAEliminar = -1;
        
        for (let i = 0; i < noVisitadas.length; i++) {
            const camaraNoVisitada = noVisitadas[i];
            
            for (const camaraId of visitadas) {
                const camaraVisitada = [...camarasRestantes, camaraFinal].find(c => c.id === camaraId);
                if (!camaraVisitada) continue;
                
                const distancia = calcularDistancia(camaraNoVisitada, camaraVisitada);
                const distanciaOptimizada = aplicarFactorOptimizacion(camaraNoVisitada, camaraVisitada, distancia);
                
                if (distanciaOptimizada < distanciaMinima) {
                    distanciaMinima = distanciaOptimizada;
                    mejorConexion = {
                        desde: camaraNoVisitada,
                        hacia: camaraVisitada,
                        distancia: distancia
                    };
                    indiceAEliminar = i;
                }
            }
        }
        
        if (mejorConexion) {
            conexiones.push(mejorConexion);
            visitadas.add(mejorConexion.desde.id);
            noVisitadas.splice(indiceAEliminar, 1);
            
            console.log(`│  ├─ MST: ${mejorConexion.desde.numeroCamera || mejorConexion.desde.id} → ${mejorConexion.hacia.numeroCamera || mejorConexion.hacia.id}`);
        } else {
            break;
        }
    }
    
    return conexiones;
}

function aplicarFactorOptimizacion(camara1, camara2, distanciaReal) {
    let factor = 1.0;
    
    const deltaX = Math.abs(camara2.x - camara1.x);
    const deltaY = Math.abs(camara2.y - camara1.y);
    
    const relacionAspecto = Math.min(deltaX, deltaY) / Math.max(deltaX, deltaY);
    if (relacionAspecto < 0.3) {
        factor *= 0.8;
    }
    
    return distanciaReal * factor;
}