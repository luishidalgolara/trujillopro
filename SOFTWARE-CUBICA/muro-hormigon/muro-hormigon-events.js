/* ========================================
   EVENTOS - MUROS DE HORMIGÓN CON VANOS
   ======================================== */

// Manejar click en canvas (llamado desde main.js)
function manejarClickMuroHormigon(event) {
    console.log('👆 manejarClickMuroHormigon() llamada');
    
    // 🆕 PRIORIDAD: Si está en modo colocación de vanos, delegar a ese sistema
    if (typeof vanosState !== 'undefined' && vanosState.modoColocacion) {
        const manejado = manejarClickVano(event);
        if (manejado) return;
    }
    
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    if (!muroHormigonActivo) {
        console.log('❌ muroHormigonActivo es false');
        return;
    }
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('📍 Posición:', pos);
    console.log('📊 dibujandoMuro:', dibujandoMuro);
    console.log('📊 puntos actuales:', puntosPolilinea.length);
    
    if (!dibujandoMuro) {
        // Primer click - iniciar polilínea
        puntosPolilinea = [pos];
        dibujandoMuro = true;
        console.log('✅ Polilínea iniciada en:', pos);
        actualizarEstado('🧱 Dibujando muro... Click para agregar puntos, ENTER para finalizar');
    } else {
        // Agregar punto a la polilínea
        puntosPolilinea.push(pos);
        console.log('✅ Punto agregado. Total puntos:', puntosPolilinea.length);
        actualizarEstado(`🧱 ${puntosPolilinea.length} puntos - Click para continuar, ENTER para finalizar`);
        redibujarCanvas();
    }
}

// Manejar DOBLE CLICK en canvas (llamado desde main.js)
function manejarDobleclickMuroHormigon(event) {
    console.log('👆👆 DOBLE CLICK detectado');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) return;
    
    // Verificar click en muro existente
    verificarClickEnMuro(pos);
}

// Manejar movimiento del mouse (llamado desde main.js)
function manejarMovimientoMuroHormigon(event) {
    // 🆕 PRIORIDAD: Si está en modo colocación de vanos, delegar
    if (typeof vanosState !== 'undefined' && vanosState.modoColocacion) {
        const manejado = manejarMouseMoveVano(event);
        if (manejado) return;
    }
    
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    if (!muroHormigonActivo || !dibujandoMuro || puntosPolilinea.length === 0) return;
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) return;
    
    // Actualizar posición temporal del mouse
    puntoTemporalMouse = pos;
    
    // Redibujar canvas inmediatamente
    redibujarCanvas();
}

// Manejar tecla ENTER (llamado desde main.js)
function manejarEnterMuroHormigon(event) {
    console.log('⏎ manejarEnterMuroHormigon() llamada');
    
    // 🆕 PRIORIDAD: Si está en modo colocación de vanos, delegar
    if (typeof vanosState !== 'undefined' && vanosState.modoColocacion) {
        confirmarColocacionVano();
        return;
    }
    
    console.log('Estado: muroHormigonActivo=', muroHormigonActivo, 'dibujandoMuro=', dibujandoMuro, 'puntos=', puntosPolilinea.length);
    
    if (muroHormigonActivo && dibujandoMuro && puntosPolilinea.length >= 2) {
        console.log('✅ Condiciones cumplidas, finalizando muro...');
        finalizarMuro();
    } else {
        console.log('❌ Necesitas al menos 2 puntos para finalizar');
        if (puntosPolilinea.length < 2) {
            actualizarEstado('⚠️ Necesitas al menos 2 puntos - Click para agregar más puntos');
        }
    }
}

// Finalizar muro
function finalizarMuro() {
    console.log('🏁 finalizarMuro() llamada');
    
    if (!puntosPolilinea || puntosPolilinea.length < 2) {
        console.log('❌ No hay suficientes puntos');
        return;
    }
    
    const nuevoMuro = {
        id: 'muro_' + Date.now(),
        puntos: [...puntosPolilinea],
        largo: '',
        nombre: '',
        altura: '',
        espesor: '',
        volumen: 0,
        completado: false,
        temporal: false,
        vanos: [] // 🆕 Inicializar array de vanos
    };
    
    murosHormigon.push(nuevoMuro);
    console.log('✅ Muro agregado:', nuevoMuro);
    console.log('📊 Total muros:', murosHormigon.length);
    
    // Reset
    dibujandoMuro = false;
    puntosPolilinea = [];
    puntoTemporalMouse = null;
    
    redibujarCanvas();
    actualizarEstado('✓ Muro creado - DOBLE CLICK para ingresar datos');
}

// Verificar click en muro existente
function verificarClickEnMuro(pos) {
    for (let muro of murosHormigon) {
        if (!muro.puntos || muro.puntos.length < 2) continue;
        
        // Verificar cada segmento de la polilínea
        for (let i = 0; i < muro.puntos.length - 1; i++) {
            if (puntoEnLinea(pos, muro.puntos[i], muro.puntos[i + 1], 10)) {
                muroSeleccionado = muro;
                abrirModalMuroHormigon(muro);
                return;
            }
        }
    }
}
