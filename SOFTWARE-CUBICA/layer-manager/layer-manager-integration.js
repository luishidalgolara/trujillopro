/* ========================================
   LAYER MANAGER - INTEGRACIÓN (ARREGLADO)
   ======================================== */

// Interceptar doble clicks para usar el sistema de capas
function interceptarDobleclickConCapas(event, tipo) {
    console.log('🔍 Doble click interceptado, tipo:', tipo);
    
    const pos = obtenerPosicionCanvas(event);
    if (!pos) return null;
    
    // Obtener TODAS las capas del tipo solicitado
    const capasPosibles = layerManagerState.layers.filter(c => {
        // Si se especifica tipo, filtrar por tipo
        if (tipo && c.type !== tipo) return false;
        
        // Debe estar visible
        if (!c.visible) return false;
        
        // No debe estar bloqueada
        if (c.locked) return false;
        
        return true;
    });
    
    console.log(`📋 Capas posibles del tipo ${tipo}:`, capasPosibles.length);
    
    if (capasPosibles.length === 0) {
        console.log('❌ No hay capas desbloqueadas del tipo solicitado');
        return null;
    }
    
    // Si hay capa activa del tipo correcto, usar esa
    if (layerManagerState.activeLayer && layerManagerState.activeLayer.type === tipo) {
        console.log('✅ Usando capa activa:', layerManagerState.activeLayer.name);
        return layerManagerState.activeLayer;
    }
    
    // Si solo hay una capa del tipo, usar esa
    if (capasPosibles.length === 1) {
        console.log('✅ Solo hay una capa del tipo, usando:', capasPosibles[0].name);
        seleccionarCapa(capasPosibles[0].id);
        return capasPosibles[0];
    }
    
    // Si hay múltiples, buscar la que está en la posición del click
    for (const capa of capasPosibles) {
        if (puntoEnCapa(pos, capa)) {
            console.log('✅ Capa encontrada por posición:', capa.name);
            seleccionarCapa(capa.id);
            return capa;
        }
    }
    
    // Si ninguna coincide por posición, usar la de mayor zIndex
    const capaMayor = capasPosibles.sort((a, b) => b.zIndex - a.zIndex)[0];
    console.log('⚠️ Ninguna coincide exactamente, usando la de mayor zIndex:', capaMayor.name);
    seleccionarCapa(capaMayor.id);
    return capaMayor;
}

// Función auxiliar para obtener posición del canvas (compatible con todos los módulos)
function obtenerPosicionCanvas(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

// Verificar si un punto está dentro de una capa (mejorado)
function puntoEnCapa(pos, capa) {
    const data = capa.data;
    
    // Si tiene puntos (polígonos como radier, cubierta)
    if (data.puntos && data.puntos.length >= 3) {
        return puntoEnPoligono(pos, data.puntos);
    }
    
    // Si es una línea (muros)
    if (data.p1 && data.p2) {
        return puntoEnLinea(pos, data.p1, data.p2, 10); // 10px de tolerancia
    }
    
    // Si no podemos determinar, aceptar
    return true;
}

// Algoritmo punto en polígono
function puntoEnPoligono(pos, puntos) {
    let inside = false;
    
    for (let i = 0, j = puntos.length - 1; i < puntos.length; j = i++) {
        const xi = puntos[i].x, yi = puntos[i].y;
        const xj = puntos[j].x, yj = puntos[j].y;
        
        const intersect = ((yi > pos.y) !== (yj > pos.y))
            && (pos.x < (xj - xi) * (pos.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}

// Verificar si un punto está cerca de una línea
function puntoEnLinea(pos, p1, p2, tolerancia) {
    // Distancia punto-línea
    const A = pos.x - p1.x;
    const B = pos.y - p1.y;
    const C = p2.x - p1.x;
    const D = p2.y - p1.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
        param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
        xx = p1.x;
        yy = p1.y;
    } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
    } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
    }
    
    const dx = pos.x - xx;
    const dy = pos.y - yy;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    
    return distancia <= tolerancia;
}

// Hook para dibujar solo capas visibles
function deberDibujarCapa(tipo, item) {
    // Si no hay sistema de capas activo, dibujar todo
    if (layerManagerState.layers.length === 0) return true;
    
    // Buscar la capa correspondiente
    const capa = layerManagerState.layers.find(c => 
        c.data === item || c.id === item.id
    );
    
    if (!capa) return true; // Si no está en el sistema, dibujar
    
    return capa.visible;
}

// Modificar las funciones de doble click existentes
function patchearDobleClickRadier() {
    if (typeof manejarDobleclickRadier === 'undefined') {
        console.warn('⚠️ manejarDobleclickRadier no existe');
        return;
    }
    
    const original = window.manejarDobleclickRadier;
    
    window.manejarDobleclickRadier = function(event) {
        console.log('🔲 Doble click en radier interceptado');
        const capa = interceptarDobleclickConCapas(event, 'RADIER');
        
        if (!capa) {
            console.log('⚠️ No se detectó radier o está bloqueado');
            return;
        }
        
        // Llamar función original con el radier de la capa
        radierSeleccionado = capa.data;
        abrirModalRadier(capa.data);
    };
    
    console.log('✅ Radier patcheado');
}

function patchearDobleClickCubierta() {
    if (typeof manejarDobleclickCubierta === 'undefined') {
        console.warn('⚠️ manejarDobleclickCubierta no existe');
        return;
    }
    
    const original = window.manejarDobleclickCubierta;
    
    window.manejarDobleclickCubierta = function(event) {
        console.log('🏠 Doble click en cubierta interceptado');
        const capa = interceptarDobleclickConCapas(event, 'CUBIERTA');
        
        if (!capa) {
            console.log('⚠️ No se detectó cubierta o está bloqueada');
            return;
        }
        
        // Llamar función original con la cubierta de la capa
        cubiertaSeleccionada = capa.data;
        abrirModalCubierta(capa.data);
    };
    
    console.log('✅ Cubierta patcheada');
}

function patchearDobleClickMuros() {
    // Hook para muro hormigón
    if (typeof manejarDobleclickMuroHormigon !== 'undefined') {
        const original = window.manejarDobleclickMuroHormigon;
        
        window.manejarDobleclickMuroHormigon = function(event) {
            console.log('🧱 Doble click en muro hormigón interceptado');
            const capa = interceptarDobleclickConCapas(event, 'MURO_HORMIGON');
            
            if (!capa) {
                console.log('⚠️ No se detectó muro hormigón o está bloqueado');
                return;
            }
            
            muroSeleccionado = capa.data;
            abrirModalMuroHormigon(capa.data);
        };
        
        console.log('✅ Muro hormigón patcheado');
    }
    
    // Hook para muro albañilería
    if (typeof manejarDobleclickMuroAlbanileria !== 'undefined') {
        const original = window.manejarDobleclickMuroAlbanileria;
        
        window.manejarDobleclickMuroAlbanileria = function(event) {
            console.log('🧱 Doble click en muro albañilería interceptado');
            const capa = interceptarDobleclickConCapas(event, 'MURO_ALBANILERIA');
            
            if (!capa) {
                console.log('⚠️ No se detectó muro albañilería o está bloqueado');
                return;
            }
            
            muroAlbanileriaSeleccionado = capa.data;
            abrirModalMuroAlbanileria(capa.data);
        };
        
        console.log('✅ Muro albañilería patcheado');
    }
    
    // Hook para tabique
    if (typeof manejarDobleclickTabique !== 'undefined') {
        const original = window.manejarDobleclickTabique;
        
        window.manejarDobleclickTabique = function(event) {
            console.log('📏 Doble click en tabique interceptado');
            const capa = interceptarDobleclickConCapas(event, 'TABIQUE');
            
            if (!capa) {
                console.log('⚠️ No se detectó tabique o está bloqueado');
                return;
            }
            
            tabiqueSeleccionado = capa.data;
            abrirModalTabique(capa.data);
        };
        
        console.log('✅ Tabique patcheado');
    }
    
    // Hook para muro estructural
    if (typeof manejarDobleclickMuroEstructural !== 'undefined') {
        const original = window.manejarDobleclickMuroEstructural;
        
        window.manejarDobleclickMuroEstructural = function(event) {
            console.log('🏗️ Doble click en muro estructural interceptado');
            const capa = interceptarDobleclickConCapas(event, 'MURO_ESTRUCTURAL');
            
            if (!capa) {
                console.log('⚠️ No se detectó muro estructural o está bloqueado');
                return;
            }
            
            muroEstructuralSeleccionado = capa.data;
            abrirModalMuroEstructural(capa.data);
        };
        
        console.log('✅ Muro estructural patcheado');
    }
}

// Aplicar todos los patches
function inicializarIntegracionCapas() {
    console.log('🔗 Inicializando integración de capas...');
    
    // Esperar a que los módulos estén cargados
    setTimeout(() => {
        patchearDobleClickRadier();
        patchearDobleClickCubierta();
        patchearDobleClickMuros();
        
        console.log('✅ Integración de capas completada');
    }, 1000); // Aumentado a 1 segundo para dar más tiempo
}

// Hook para actualizar capas cuando se crea un nuevo elemento
function registrarNuevoElemento(tipo, elemento) {
    // Asignar zIndex si no tiene
    if (!elemento.zIndex) {
        switch(tipo) {
            case 'RADIER':
                elemento.zIndex = 0;
                break;
            case 'MURO_HORMIGON':
            case 'MURO_ALBANILERIA':
            case 'TABIQUE':
            case 'MURO_ESTRUCTURAL':
                elemento.zIndex = 10;
                break;
            case 'CUBIERTA':
                elemento.zIndex = 20;
                break;
        }
    }
    
    // Actualizar lista de capas
    actualizarListaCapas();
}

window.interceptarDobleclickConCapas = interceptarDobleclickConCapas;
window.deberDibujarCapa = deberDibujarCapa;
window.inicializarIntegracionCapas = inicializarIntegracionCapas;
window.registrarNuevoElemento = registrarNuevoElemento;
window.puntoEnCapa = puntoEnCapa;
window.puntoEnPoligono = puntoEnPoligono;
window.puntoEnLinea = puntoEnLinea;