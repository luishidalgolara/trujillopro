/* ========================================
   EVENTOS - SISTEMA DE VANOS
   ======================================== */

// Manejar clicks para colocación de vanos
function manejarClickVano(event) {
    if (!vanosState.modoColocacion || !vanosState.muroObjetivo) return false;
    
    const canvas = document.getElementById('mainCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calcular posición en el muro
    const posicion = calcularPosicionVano(vanosState.muroObjetivo, x, y);
    
    if (!posicion) {
        alert('⚠️ Click fuera del muro. Intente hacer click sobre la línea del muro.');
        return true;
    }
    
    // Guardar posición temporal
    vanosState.posicionTemporal = posicion;
    
    // Redibujar con preview
    redibujarCanvas();
    
    actualizarEstado('✅ Posición seleccionada - Presione ENTER para confirmar, ESC para cancelar');
    
    return true;
}

// Manejar movimiento del mouse (preview)
function manejarMouseMoveVano(event) {
    if (!vanosState.modoColocacion || !vanosState.muroObjetivo) return false;
    
    const canvas = document.getElementById('mainCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calcular posición en tiempo real
    const posicion = calcularPosicionVano(vanosState.muroObjetivo, x, y);
    
    if (posicion) {
        vanosState.vanoTemporal = posicion;
        redibujarCanvas();
    }
    
    return true;
}

// Confirmar colocación (ENTER)
function confirmarColocacionVano() {
    if (!vanosState.posicionTemporal) {
        alert('⚠️ Primero haga click en el muro para seleccionar la posición');
        return;
    }
    
    const vano = {
        tipo: vanosState.config.tipo,
        ancho: vanosState.config.ancho,
        alto: vanosState.config.alto,
        alturaDesdeBase: vanosState.config.alturaDesdeBase,
        segmento: vanosState.posicionTemporal.segmento,
        distanciaDesdeInicio: vanosState.posicionTemporal.distanciaDesdeInicio
    };
    
    const exito = agregarVanoAlMuro(vanosState.muroObjetivo, vano);
    
    if (exito) {
        const icono = vano.tipo === 'puerta' ? '🚪' : '🪟';
        actualizarEstado(`✅ ${icono} ${vano.tipo} agregado - ${vano.ancho}×${vano.alto}m`);
        
        const muroTemp = vanosState.muroObjetivo;
        resetearVanosState();
        redibujarCanvas();
        
        // 🆕 Reabrir modal después de agregar vano
        setTimeout(() => {
            abrirModalMuroHormigon(muroTemp);
        }, 500);
    }
}

// Dibujar preview en canvas
function dibujarPreviewVano(ctx) {
    if (!vanosState.modoColocacion) return;
    
    // Dibujar vano temporal (siguiendo el mouse)
    if (vanosState.vanoTemporal) {
        dibujarVanoTemporal(ctx, vanosState.muroObjetivo, vanosState.vanoTemporal, vanosState.config);
    }
    
    // Resaltar muro objetivo
    if (vanosState.muroObjetivo) {
        resaltarMuroObjetivo(ctx, vanosState.muroObjetivo);
    }
}

function resaltarMuroObjetivo(ctx, muro) {
    if (!muro.puntos || muro.puntos.length < 2) return;
    
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.4;
    ctx.setLineDash([10, 10]);
    
    ctx.beginPath();
    ctx.moveTo(muro.puntos[0].x, muro.puntos[0].y);
    
    for (let i = 1; i < muro.puntos.length; i++) {
        ctx.lineTo(muro.puntos[i].x, muro.puntos[i].y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
}

window.manejarClickVano = manejarClickVano;
window.manejarMouseMoveVano = manejarMouseMoveVano;
window.confirmarColocacionVano = confirmarColocacionVano;
window.dibujarPreviewVano = dibujarPreviewVano;
