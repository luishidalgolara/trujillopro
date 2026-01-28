/* ========================================
   LAYER MANAGER - CONTROLADOR
   ======================================== */

function seleccionarCapa(layerId) {
    console.log('🎯 Seleccionando capa:', layerId);
    
    const capa = layerManagerState.layers.find(c => c.id === layerId);
    
    if (!capa) {
        console.error('❌ Capa no encontrada:', layerId);
        return;
    }
    
    // Si está bloqueada, no permitir selección
    if (capa.locked) {
        alert('⚠️ Esta capa está bloqueada. Desbloquéala primero para editarla.');
        return;
    }
    
    layerManagerState.activeLayer = capa;
    renderizarListaCapas();
    
    console.log('✅ Capa seleccionada:', capa.name);
    
    // Callback
    if (layerManagerState.callbacks.onLayerSelect) {
        layerManagerState.callbacks.onLayerSelect(capa);
    }
}

function toggleVisibilidadCapa(layerId) {
    const capa = layerManagerState.layers.find(c => c.id === layerId);
    
    if (!capa) return;
    
    capa.visible = !capa.visible;
    capa.data.visible = capa.visible;
    
    renderizarListaCapas();
    redibujarCanvasGlobal();
    
    console.log(`👁️ Capa "${capa.name}" ${capa.visible ? 'visible' : 'oculta'}`);
}

function toggleBloquearCapa(layerId) {
    const capa = layerManagerState.layers.find(c => c.id === layerId);
    
    if (!capa) return;
    
    capa.locked = !capa.locked;
    capa.data.locked = capa.locked;
    
    renderizarListaCapas();
    
    console.log(`🔒 Capa "${capa.name}" ${capa.locked ? 'bloqueada' : 'desbloqueada'}`);
}

function moverCapaArriba(layerId) {
    const index = layerManagerState.layers.findIndex(c => c.id === layerId);
    
    if (index <= 0) return; // Ya está arriba
    
    // Intercambiar con la capa de arriba
    const temp = layerManagerState.layers[index];
    layerManagerState.layers[index] = layerManagerState.layers[index - 1];
    layerManagerState.layers[index - 1] = temp;
    
    // Actualizar zIndex
    layerManagerState.layers.forEach((capa, i) => {
        capa.zIndex = layerManagerState.layers.length - i;
        capa.data.zIndex = capa.zIndex;
    });
    
    renderizarListaCapas();
    redibujarCanvasGlobal();
    
    console.log('⬆️ Capa movida arriba');
}

function moverCapaAbajo(layerId) {
    const index = layerManagerState.layers.findIndex(c => c.id === layerId);
    
    if (index < 0 || index >= layerManagerState.layers.length - 1) return; // Ya está abajo
    
    // Intercambiar con la capa de abajo
    const temp = layerManagerState.layers[index];
    layerManagerState.layers[index] = layerManagerState.layers[index + 1];
    layerManagerState.layers[index + 1] = temp;
    
    // Actualizar zIndex
    layerManagerState.layers.forEach((capa, i) => {
        capa.zIndex = layerManagerState.layers.length - i;
        capa.data.zIndex = capa.zIndex;
    });
    
    renderizarListaCapas();
    redibujarCanvasGlobal();
    
    console.log('⬇️ Capa movida abajo');
}

// Función para verificar si una capa debe ser detectada en un click
function esCapaDetectable(capa) {
    // No detectar si está oculta
    if (!capa.visible) return false;
    
    // No detectar si está bloqueada
    if (capa.locked) return false;
    
    // Si hay una capa activa seleccionada, solo detectar esa
    if (layerManagerState.activeLayer) {
        return capa.id === layerManagerState.activeLayer.id;
    }
    
    // Si no hay capa activa, detectar todas las desbloqueadas
    return true;
}

// Función para obtener la capa más alta en una posición
function obtenerCapaEnPosicion(pos) {
    // Buscar en orden de zIndex (de mayor a menor)
    const capasOrdenadas = [...layerManagerState.layers].sort((a, b) => b.zIndex - a.zIndex);
    
    for (const capa of capasOrdenadas) {
        if (!esCapaDetectable(capa)) continue;
        
        // Verificar si el punto está dentro de esta capa
        if (puntoEnCapa(pos, capa)) {
            return capa;
        }
    }
    
    return null;
}

function puntoEnCapa(pos, capa) {
    if (!capa.data.puntos || capa.data.puntos.length < 3) return false;
    
    // Algoritmo de punto en polígono
    let inside = false;
    const puntos = capa.data.puntos;
    
    for (let i = 0, j = puntos.length - 1; i < puntos.length; j = i++) {
        const xi = puntos[i].x, yi = puntos[i].y;
        const xj = puntos[j].x, yj = puntos[j].y;
        
        const intersect = ((yi > pos.y) !== (yj > pos.y))
            && (pos.x < (xj - xi) * (pos.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}

window.seleccionarCapa = seleccionarCapa;
window.toggleVisibilidadCapa = toggleVisibilidadCapa;
window.toggleBloquearCapa = toggleBloquearCapa;
window.moverCapaArriba = moverCapaArriba;
window.moverCapaAbajo = moverCapaAbajo;
window.esCapaDetectable = esCapaDetectable;
window.obtenerCapaEnPosicion = obtenerCapaEnPosicion;
window.puntoEnCapa = puntoEnCapa;
