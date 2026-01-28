/* ========================================
   EVENTOS - TABIQUERÍA
   ======================================== */

// Manejar click en canvas (llamado desde main.js)
function manejarClickTabique(event) {
    console.log('👆 manejarClickTabique() llamada');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') {
        console.log('❌ Canvas no visible');
        return;
    }
    if (!tabiqueActivo) {
        console.log('❌ tabiqueActivo es false');
        return;
    }
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) {
        console.log('❌ No se pudo obtener posición');
        return;
    }
    
    console.log('📍 Posición:', pos);
    console.log('📊 dibujandoTabique:', dibujandoTabique);
    console.log('📊 puntos actuales:', puntosPolilineaTabique.length);
    
    if (!dibujandoTabique) {
        // Primer click - iniciar polilínea
        puntosPolilineaTabique = [pos];
        dibujandoTabique = true;
        console.log('✅ Polilínea iniciada en:', pos);
        actualizarEstado('📏 Dibujando tabique... Click para agregar puntos, ENTER para finalizar');
    } else {
        // Agregar punto a la polilínea
        puntosPolilineaTabique.push(pos);
        console.log('✅ Punto agregado. Total puntos:', puntosPolilineaTabique.length);
        actualizarEstado(`📏 ${puntosPolilineaTabique.length} puntos - Click para continuar, ENTER para finalizar`);
        redibujarCanvas();
    }
}

// Manejar DOBLE CLICK en canvas (llamado desde main.js)
function manejarDobleclickTabique(event) {
    console.log('👆👆 DOBLE CLICK detectado');
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) return;
    
    // Verificar click en tabique existente
    verificarClickEnTabique(pos);
}

// Manejar movimiento del mouse (llamado desde main.js)
function manejarMovimientoTabique(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || canvas.style.display === 'none') return;
    if (!tabiqueActivo || !dibujandoTabique || puntosPolilineaTabique.length === 0) return;
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) return;
    
    // Actualizar posición temporal del mouse
    puntoTemporalMouseTabique = pos;
    
    // Redibujar canvas inmediatamente
    redibujarCanvas();
}

// Manejar tecla ENTER (llamado desde main.js)
function manejarEnterTabique(event) {
    console.log('⎆ manejarEnterTabique() llamada');
    console.log('Estado: tabiqueActivo=', tabiqueActivo, 'dibujandoTabique=', dibujandoTabique, 'puntos=', puntosPolilineaTabique.length);
    
    if (tabiqueActivo && dibujandoTabique && puntosPolilineaTabique.length >= 2) {
        console.log('✅ Condiciones cumplidas, finalizando tabique...');
        finalizarTabique();
    } else {
        console.log('❌ Necesitas al menos 2 puntos para finalizar');
        if (puntosPolilineaTabique.length < 2) {
            actualizarEstado('⚠️ Necesitas al menos 2 puntos - Click para agregar más puntos');
        }
    }
}

// Finalizar tabique
function finalizarTabique() {
    console.log('🏁 finalizarTabique() llamada');
    
    if (!puntosPolilineaTabique || puntosPolilineaTabique.length < 2) {
        console.log('❌ No hay suficientes puntos');
        return;
    }
    
    const nuevoTabique = {
        id: 'tabique_' + Date.now(),
        puntos: [...puntosPolilineaTabique],
        largo: '',
        nombre: '',
        altura: '',
        separacion: 40, // Default 40cm
        montantes: 0,
        montantesMetros: 0,
        solerasMetros: 0,
        areaPlacas: 0,
        completado: false,
        temporal: false
    };
    
    tabiques.push(nuevoTabique);
    console.log('✅ Tabique agregado:', nuevoTabique);
    console.log('📊 Total tabiques:', tabiques.length);
    
    // Reset
    dibujandoTabique = false;
    puntosPolilineaTabique = [];
    puntoTemporalMouseTabique = null;
    
    redibujarCanvas();
    actualizarEstado('✓ Tabique creado - DOBLE CLICK para ingresar datos');
}

// Verificar click en tabique existente
function verificarClickEnTabique(pos) {
    for (let tabique of tabiques) {
        if (!tabique.puntos || tabique.puntos.length < 2) continue;
        
        // Verificar cada segmento de la polilínea
        for (let i = 0; i < tabique.puntos.length - 1; i++) {
            if (puntoEnLinea(pos, tabique.puntos[i], tabique.puntos[i + 1], 10)) {
                tabiqueSeleccionado = tabique;
                abrirModalTabique(tabique);
                return;
            }
        }
    }
}
