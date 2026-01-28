/* ========================================
   EVENTOS - MUROS DE ALBAÑILERÍA
   ======================================== */

// Manejar click en canvas (llamado desde main.js)
function manejarClickMuroAlbanileria(event) {
    console.log('👆 manejarClickMuroAlbanileria() llamada');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    if (!muroAlbanileriaActivo) {
        console.log('❌ muroAlbanileriaActivo es false');
        return;
    }
    
    const pos = obtenerPosicionCanvasAlbanileria(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('📍 Posición:', pos);
    console.log('📊 dibujandoMuroAlbanileria:', dibujandoMuroAlbanileria);
    console.log('📊 puntos actuales:', puntosPolilineaAlbanileria.length);
    
    if (!dibujandoMuroAlbanileria) {
        // Primer click - iniciar polilínea
        puntosPolilineaAlbanileria = [pos];
        dibujandoMuroAlbanileria = true;
        console.log('✅ Polilínea iniciada en:', pos);
        actualizarEstadoAlbanileria('🧱 Dibujando muro albañilería... Click para agregar puntos, ENTER para finalizar');
    } else {
        // Agregar punto a la polilínea
        puntosPolilineaAlbanileria.push(pos);
        console.log('✅ Punto agregado. Total puntos:', puntosPolilineaAlbanileria.length);
        actualizarEstadoAlbanileria(`🧱 ${puntosPolilineaAlbanileria.length} puntos - Click para continuar, ENTER para finalizar`);
        redibujarCanvasAlbanileria();
    }
}

// Manejar DOBLE CLICK en canvas (llamado desde main.js)
function manejarDobleclickMuroAlbanileria(event) {
    console.log('👆👆 DOBLE CLICK detectado');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    
    const pos = obtenerPosicionCanvasAlbanileria(event);
    if (!pos) return;
    
    // Verificar click en muro existente
    verificarClickEnMuroAlbanileria(pos);
}

// Manejar movimiento del mouse (llamado desde main.js)
function manejarMovimientoMuroAlbanileria(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    if (!muroAlbanileriaActivo || !dibujandoMuroAlbanileria || puntosPolilineaAlbanileria.length === 0) return;
    
    const pos = obtenerPosicionCanvasAlbanileria(event);
    if (!pos) return;
    
    // Actualizar posición temporal del mouse
    puntoTemporalMouseAlbanileria = pos;
    
    // Redibujar canvas inmediatamente
    redibujarCanvasAlbanileria();
}

// Manejar tecla ENTER (llamado desde main.js)
function manejarEnterMuroAlbanileria(event) {
    console.log('⏎ manejarEnterMuroAlbanileria() llamada');
    console.log('Estado: muroAlbanileriaActivo=', muroAlbanileriaActivo, 'dibujandoMuroAlbanileria=', dibujandoMuroAlbanileria, 'puntos=', puntosPolilineaAlbanileria.length);
    
    if (muroAlbanileriaActivo && dibujandoMuroAlbanileria && puntosPolilineaAlbanileria.length >= 2) {
        console.log('✅ Condiciones cumplidas, finalizando muro...');
        finalizarMuroAlbanileria();
    } else {
        console.log('❌ Necesitas al menos 2 puntos para finalizar');
        if (puntosPolilineaAlbanileria.length < 2) {
            actualizarEstadoAlbanileria('⚠️ Necesitas al menos 2 puntos - Click para agregar más puntos');
        }
    }
}

// Finalizar muro
function finalizarMuroAlbanileria() {
    console.log('🏁 finalizarMuroAlbanileria() llamada');
    
    if (!puntosPolilineaAlbanileria || puntosPolilineaAlbanileria.length < 2) {
        console.log('❌ No hay suficientes puntos');
        return;
    }
    
    const nuevoMuro = {
        id: 'muro_alb_' + Date.now(),
        puntos: [...puntosPolilineaAlbanileria],
        largo: '',
        nombre: '',
        altura: '',
        espesor: '',
        volumen: 0,
        completado: false,
        temporal: false
    };
    
    murosAlbanileria.push(nuevoMuro);
    console.log('✅ Muro agregado:', nuevoMuro);
    console.log('📊 Total muros:', murosAlbanileria.length);
    
    // Reset
    dibujandoMuroAlbanileria = false;
    puntosPolilineaAlbanileria = [];
    puntoTemporalMouseAlbanileria = null;
    
    redibujarCanvasAlbanileria();
    actualizarEstadoAlbanileria('✓ Muro creado - DOBLE CLICK para ingresar datos');
}

// Verificar click en muro existente
function verificarClickEnMuroAlbanileria(pos) {
    for (let muro of murosAlbanileria) {
        if (!muro.puntos || muro.puntos.length < 2) continue;
        
        // Verificar cada segmento de la polilínea
        for (let i = 0; i < muro.puntos.length - 1; i++) {
            if (puntoEnLineaAlbanileria(pos, muro.puntos[i], muro.puntos[i + 1], 10)) {
                muroAlbanileriaSeleccionado = muro;
                abrirModalMuroAlbanileria(muro);
                return;
            }
        }
    }
}
