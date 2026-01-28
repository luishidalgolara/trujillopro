/* ========================================
   EVENTOS - MUROS ESTRUCTURALES
   ======================================== */

// Manejar click en canvas (llamado desde main.js)
function manejarClickMuroEstructural(event) {
    console.log('👆 manejarClickMuroEstructural() llamada');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    if (!muroEstructuralActivo) {
        console.log('❌ muroEstructuralActivo es false');
        return;
    }
    
    const pos = obtenerPosicionCanvasEstructural(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('📍 Posición:', pos);
    console.log('📊 dibujandoMuroEstructural:', dibujandoMuroEstructural);
    console.log('📊 puntos actuales:', puntosPolilineaEstructural.length);
    
    if (!dibujandoMuroEstructural) {
        // Primer click - iniciar polilínea
        puntosPolilineaEstructural = [pos];
        dibujandoMuroEstructural = true;
        console.log('✅ Polilínea iniciada en:', pos);
        actualizarEstado('🏗️ Dibujando muro estructural... Click para agregar puntos, ENTER para finalizar');
    } else {
        // Agregar punto a la polilínea
        puntosPolilineaEstructural.push(pos);
        console.log('✅ Punto agregado. Total puntos:', puntosPolilineaEstructural.length);
        actualizarEstado(`🏗️ ${puntosPolilineaEstructural.length} puntos - Click para continuar, ENTER para finalizar`);
        redibujarCanvas();
    }
}

// Manejar DOBLE CLICK en canvas (llamado desde main.js)
function manejarDobleclickMuroEstructural(event) {
    console.log('👆👆 DOBLE CLICK detectado');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    
    const pos = obtenerPosicionCanvasEstructural(event);
    if (!pos) return;
    
    // Verificar click en muro existente
    verificarClickEnMuroEstructural(pos);
}

// Manejar movimiento del mouse (llamado desde main.js)
function manejarMovimientoMuroEstructural(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    if (!muroEstructuralActivo || !dibujandoMuroEstructural || puntosPolilineaEstructural.length === 0) return;
    
    const pos = obtenerPosicionCanvasEstructural(event);
    if (!pos) return;
    
    // Actualizar posición temporal del mouse
    puntoTemporalMouseEstructural = pos;
    
    // Redibujar canvas inmediatamente
    redibujarCanvas();
}

// Manejar tecla ENTER (llamado desde main.js)
function manejarEnterMuroEstructural(event) {
    console.log('⎆ manejarEnterMuroEstructural() llamada');
    console.log('Estado: muroEstructuralActivo=', muroEstructuralActivo, 'dibujandoMuroEstructural=', dibujandoMuroEstructural, 'puntos=', puntosPolilineaEstructural.length);
    
    if (muroEstructuralActivo && dibujandoMuroEstructural && puntosPolilineaEstructural.length >= 2) {
        console.log('✅ Condiciones cumplidas, finalizando muro estructural...');
        finalizarMuroEstructural();
    } else {
        console.log('❌ Necesitas al menos 2 puntos para finalizar');
        if (puntosPolilineaEstructural.length < 2) {
            actualizarEstado('⚠️ Necesitas al menos 2 puntos - Click para agregar más puntos');
        }
    }
}

// Finalizar muro estructural
function finalizarMuroEstructural() {
    console.log('🏁 finalizarMuroEstructural() llamada');
    
    if (!puntosPolilineaEstructural || puntosPolilineaEstructural.length < 2) {
        console.log('❌ No hay suficientes puntos');
        return;
    }
    
    const nuevoMuro = {
        id: 'muro_estructural_' + Date.now(),
        puntos: [...puntosPolilineaEstructural],
        largo: '',
        nombre: '',
        altura: '',
        espesor: 15, // Default 15cm
        niveles: 1, // Default 1 nivel
        volumenHormigon: 0,
        cemento: 0,
        arena: 0,
        ripio: 0,
        totalFierro: 0,
        areaMoldaje: 0,
        completado: false,
        temporal: false
    };
    
    murosEstructurales.push(nuevoMuro);
    console.log('✅ Muro estructural agregado:', nuevoMuro);
    console.log('📊 Total muros estructurales:', murosEstructurales.length);
    
    // Reset
    dibujandoMuroEstructural = false;
    puntosPolilineaEstructural = [];
    puntoTemporalMouseEstructural = null;
    
    redibujarCanvas();
    actualizarEstado('✓ Muro estructural creado - DOBLE CLICK para ingresar datos');
}

// Verificar click en muro existente
function verificarClickEnMuroEstructural(pos) {
    for (let muro of murosEstructurales) {
        if (!muro.puntos || muro.puntos.length < 2) continue;
        
        // Verificar cada segmento de la polilínea
        for (let i = 0; i < muro.puntos.length - 1; i++) {
            if (puntoEnLineaEstructural(pos, muro.puntos[i], muro.puntos[i + 1], 10)) {
                muroEstructuralSeleccionado = muro;
                abrirModalMuroEstructural(muro);
                return;
            }
        }
    }
}   