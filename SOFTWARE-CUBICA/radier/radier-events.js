/* ========================================
   EVENTOS - RADIER
   ======================================== */

// Flag para prevenir doble clicks múltiples
let radierModalAbriendose = false;

function manejarClickRadier(event) {
    console.log('👆 manejarClickRadier() llamada');
    
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    
    if (!radierActivo) {
        console.log('❌ radierActivo es false');
        return;
    }
    
    const pos = obtenerPosicionCanvasRadier(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('🔍 Posición:', pos);
    console.log('📊 dibujandoRadier:', dibujandoRadier);
    console.log('📊 puntos actuales:', puntosPoligonoRadier.length);
    
    if (!dibujandoRadier) {
        puntosPoligonoRadier = [pos];
        dibujandoRadier = true;
        console.log('✅ Polígono iniciado en:', pos);
        actualizarEstadoRadier('🔲 Dibujando radier... Click para agregar puntos, ENTER para cerrar');
        redibujarCanvasRadier();
    } else {
        puntosPoligonoRadier.push(pos);
        console.log('✅ Punto agregado. Total puntos:', puntosPoligonoRadier.length);
        actualizarEstadoRadier(`🔲 ${puntosPoligonoRadier.length} puntos - Click para continuar, ENTER para cerrar`);
        redibujarCanvasRadier();
    }
}

function manejarDobleclickRadier(event) {
    console.log('👆👆 DOBLE CLICK detectado - Radier');
    
    // PROTECCIÓN: Si ya se está abriendo el modal, ignorar
    if (radierModalAbriendose) {
        console.log('⚠️ Modal ya abriéndose, ignorando doble click adicional');
        return;
    }
    
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    
    const pos = obtenerPosicionCanvasRadier(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('🔍 Buscando radier en posición:', pos);
    
    // Buscar si se hizo click en un radier existente
    let radierEncontrado = null;
    for (let radier of radieres) {
        if (!radier.puntos || radier.puntos.length < 3) continue;
        
        if (puntoEnPoligonoRadier(pos, radier.puntos)) {
            radierEncontrado = radier;
            console.log('✅ Radier encontrado:', radier);
            break;
        }
    }
    
    if (!radierEncontrado) {
        console.log('❌ No se encontró radier en la posición del click');
        return;
    }
    
    // ACTIVAR FLAG DE PROTECCIÓN
    radierModalAbriendose = true;
    console.log('🔒 Flag radierModalAbriendose activado');
    
    // Asignar radier seleccionado
    radierSeleccionado = radierEncontrado;
    
    // Abrir modal
    abrirModalRadier(radierEncontrado);
    
    // DESACTIVAR FLAG después de que el modal se haya abierto completamente
    setTimeout(() => {
        radierModalAbriendose = false;
        console.log('🔓 Flag radierModalAbriendose desactivado');
    }, 500);
}

function manejarMovimientoRadier(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    
    if (!radierActivo || !dibujandoRadier || puntosPoligonoRadier.length === 0) return;
    
    const pos = obtenerPosicionCanvasRadier(event);
    if (!pos) return;
    
    puntoTemporalMouseRadier = pos;
    redibujarCanvasRadier();
}

function manejarEnterRadier(event) {
    console.log('⏎ manejarEnterRadier() llamada');
    console.log('Estado: radierActivo=', radierActivo, 'dibujandoRadier=', dibujandoRadier, 'puntos=', puntosPoligonoRadier.length);
    
    if (radierActivo && dibujandoRadier && puntosPoligonoRadier.length >= 3) {
        console.log('✅ Condiciones cumplidas, finalizando radier...');
        finalizarRadier();
    } else {
        console.log('❌ Necesitas al menos 3 puntos para cerrar polígono');
        if (puntosPoligonoRadier.length < 3) {
            actualizarEstadoRadier('⚠️ Necesitas al menos 3 puntos - Click para agregar más puntos');
        }
    }
}

function finalizarRadier() {
    console.log('🏁 finalizarRadier() llamada');
    
    if (!puntosPoligonoRadier || puntosPoligonoRadier.length < 3) {
        console.log('❌ No hay suficientes puntos');
        return;
    }
    
    const nuevoRadier = {
        id: 'radier_' + Date.now(),
        puntos: [...puntosPoligonoRadier],
        nombre: '',
        area: 0,
        espesor: '',
        volumen: 0,
        completado: false
    };
    
    radieres.push(nuevoRadier);
    console.log('✅ Radier agregado:', nuevoRadier);
    console.log('📊 Total radieres:', radieres.length);
    
    // Limpiar estado de dibujo
    dibujandoRadier = false;
    puntosPoligonoRadier = [];
    puntoTemporalMouseRadier = null;
    
    redibujarCanvasRadier();
    actualizarEstadoRadier('✓ Radier creado - DOBLE CLICK para ingresar datos');
}