/* ========================================
   ESTADO GLOBAL - SISTEMA DE VANOS
   ======================================== */

const vanosState = {
    modoColocacion: false,
    muroObjetivo: null,
    vanoTemporal: null,
    posicionTemporal: null,
    
    // Configuración del vano a colocar
    config: {
        tipo: 'puerta',
        ancho: 0.9,
        alto: 2.1,
        alturaDesdeBase: 0
    }
};

// Resetear estado
function resetearVanosState() {
    vanosState.modoColocacion = false;
    vanosState.muroObjetivo = null;
    vanosState.vanoTemporal = null;
    vanosState.posicionTemporal = null;
}

// Activar modo colocación
function activarModoColocacionVano(muro, tipo, ancho, alto, alturaDesdeBase = 0) {
    vanosState.modoColocacion = true;
    vanosState.muroObjetivo = muro;
    vanosState.config = {
        tipo: tipo,
        ancho: parseFloat(ancho),
        alto: parseFloat(alto),
        alturaDesdeBase: parseFloat(alturaDesdeBase)
    };
    
    actualizarEstado(`🎯 Click en el muro para colocar ${tipo} - ENTER para confirmar, ESC para cancelar`);
}

// Cancelar colocación
function cancelarColocacionVano() {
    resetearVanosState();
    redibujarCanvas();
    actualizarEstado('✓ Colocación cancelada');
}

window.vanosState = vanosState;
window.resetearVanosState = resetearVanosState;
window.activarModoColocacionVano = activarModoColocacionVano;
window.cancelarColocacionVano = cancelarColocacionVano;