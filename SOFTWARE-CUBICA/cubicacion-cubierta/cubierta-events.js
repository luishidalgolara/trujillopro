/* ========================================
   EVENTOS - CUBIERTAS
   ======================================== */

// Manejar click en canvas (llamado desde main.js)
function manejarClickCubierta(event) {
    console.log('👆 manejarClickCubierta() llamada');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    if (!cubiertaActivo) {
        console.log('❌ cubiertaActivo es false');
        return;
    }
    
    const pos = obtenerPosicionCanvasCubierta(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('📍 Posición:', pos);
    console.log('📊 dibujandoCubierta:', dibujandoCubierta);
    console.log('📊 puntos actuales:', puntosPoligonoCubierta.length);
    
    if (!dibujandoCubierta) {
        // Primer click - iniciar polígono
        puntosPoligonoCubierta = [pos];
        dibujandoCubierta = true;
        console.log('✅ Polígono iniciado en:', pos);
        actualizarEstadoCubierta('🏠 Dibujando cubierta... Click para agregar puntos, ENTER para cerrar');
    } else {
        // Agregar punto al polígono
        puntosPoligonoCubierta.push(pos);
        console.log('✅ Punto agregado. Total puntos:', puntosPoligonoCubierta.length);
        actualizarEstadoCubierta(`🏠 ${puntosPoligonoCubierta.length} puntos - Click para continuar, ENTER para cerrar`);
        redibujarCanvasCubierta();
    }
}

// Manejar DOBLE CLICK en canvas (llamado desde main.js)
function manejarDobleclickCubierta(event) {
    console.log('👆👆 DOBLE CLICK detectado');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    
    const pos = obtenerPosicionCanvasCubierta(event);
    if (!pos) return;
    
    // Verificar click en cubierta existente
    verificarClickEnCubierta(pos);
}

// Manejar movimiento del mouse (llamado desde main.js)
function manejarMovimientoCubierta(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    if (!cubiertaActivo || !dibujandoCubierta || puntosPoligonoCubierta.length === 0) return;
    
    const pos = obtenerPosicionCanvasCubierta(event);
    if (!pos) return;
    
    // Actualizar posición temporal del mouse
    puntoTemporalMouseCubierta = pos;
    
    // Redibujar canvas inmediatamente
    redibujarCanvasCubierta();
}

// Manejar tecla ENTER (llamado desde main.js)
function manejarEnterCubierta(event) {
    console.log('⎆ manejarEnterCubierta() llamada');
    console.log('Estado: cubiertaActivo=', cubiertaActivo, 'dibujandoCubierta=', dibujandoCubierta, 'puntos=', puntosPoligonoCubierta.length);
    
    if (cubiertaActivo && dibujandoCubierta && puntosPoligonoCubierta.length >= 3) {
        console.log('✅ Condiciones cumplidas, finalizando cubierta...');
        finalizarCubierta();
    } else {
        console.log('❌ Necesitas al menos 3 puntos para cerrar el polígono');
        if (puntosPoligonoCubierta.length < 3) {
            actualizarEstadoCubierta('⚠️ Necesitas al menos 3 puntos - Click para agregar más puntos');
        }
    }
}

// Finalizar cubierta
function finalizarCubierta() {
    console.log('🏁 finalizarCubierta() llamada');
    
    if (!puntosPoligonoCubierta || puntosPoligonoCubierta.length < 3) {
        console.log('❌ No hay suficientes puntos');
        return;
    }
    
    const nuevaCubierta = {
        id: 'cubierta_' + Date.now(),
        puntos: [...puntosPoligonoCubierta],
        nombre: '',
        tipoCubierta: 'zinc',
        pendienteGrados: 0,
        pendientePorcentaje: 0,
        numeroAguas: 1,
        longitudAleros: 0,
        largoPlanchaUtil: 3.6,
        areaProyeccion: 0,
        superficieReal: 0,
        superficieFinal: 0,
        cantidadPlanchas: 0,
        completado: false,
        temporal: false
    };
    
    cubiertas.push(nuevaCubierta);
    console.log('✅ Cubierta agregada:', nuevaCubierta);
    console.log('📊 Total cubiertas:', cubiertas.length);
    
    // Reset
    dibujandoCubierta = false;
    puntosPoligonoCubierta = [];
    puntoTemporalMouseCubierta = null;
    
    redibujarCanvasCubierta();
    actualizarEstadoCubierta('✓ Cubierta creada - DOBLE CLICK para ingresar datos');
}

// Verificar click en cubierta existente
function verificarClickEnCubierta(pos) {
    for (let cubierta of cubiertas) {
        if (!cubierta.puntos || cubierta.puntos.length < 3) continue;
        
        if (puntoEnPoligonoCubierta(pos, cubierta.puntos)) {
            cubiertaSeleccionada = cubierta;
            abrirModalCubierta(cubierta);
            return;
        }
    }
}
