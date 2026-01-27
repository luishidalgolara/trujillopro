// ============================================================
// SISTEMA DE CONTEO AUTOMÁTICO DE ARTEFACTOS
// Sincroniza automáticamente con Cuadro U.E.H y MEMORIA
// MODIFICADO: Ahora incluye conteo unificado de ambos niveles
// ============================================================

// OBJETO GLOBAL DE CONTEO
const CONTEO_ARTEFACTOS = {
    wc: 0,
    lavatorio: 0,
    'bano-tina': 0,
    ducha: 0,
    bidet: 0,
    urinario: 0,
    lavadora: 0,
    lavacopas: 0,
    lavadero: 0,
    lavaplatos: 0
};

// MAPEO DE TIPOS A ÍNDICES DE TABLA EN CUADRO UEH
const MAPEO_CUADRO_UEH = {
    'wc': 0,
    'lavatorio': 1,
    'bano-tina': 2,
    'ducha': 3,
    'bidet': 4,
    'urinario': 5,
    'lavadora': 6,
    'lavacopas': 7,
    'lavadero': 8,
    'lavaplatos': 9
};

// EQUIVALENCIAS U.E.H (según normativa)
const EQUIVALENCIAS_UEH = {
    'wc': 3,
    'lavatorio': 1,
    'bano-tina': 3,
    'ducha': 2,
    'bidet': 1,
    'urinario': 1,
    'lavadora': 3,
    'lavacopas': 3,
    'lavadero': 3,
    'lavaplatos': 3
};

/**
 * ⭐ NUEVA FUNCIÓN UNIFICADA - OBTIENE CONTEO TOTAL DE AMBOS NIVELES
 * @returns {Object} Conteo combinado de nivel 1 y nivel 2
 */
function obtenerConteoTotalUnificado() {
    const conteoUnificado = {};
    
    // Inicializar con ceros
    for (let tipo in CONTEO_ARTEFACTOS) {
        conteoUnificado[tipo] = 0;
    }
    
    // Sumar nivel 1
    for (let tipo in CONTEO_ARTEFACTOS) {
        conteoUnificado[tipo] += CONTEO_ARTEFACTOS[tipo];
    }
    
    // Sumar nivel 2 (si existe)
    if (window.CONTEO_ARTEFACTOS_NIVEL2) {
        for (let tipo in window.CONTEO_ARTEFACTOS_NIVEL2) {
            if (conteoUnificado.hasOwnProperty(tipo)) {
                conteoUnificado[tipo] += window.CONTEO_ARTEFACTOS_NIVEL2[tipo];
            }
        }
    }
    
    return conteoUnificado;
}

/**
 * ⭐ NUEVA FUNCIÓN - CALCULA TOTAL UEH UNIFICADO
 * @returns {number} Total UEH de ambos niveles
 */
function calcularTotalUEHUnificado() {
    const conteoUnificado = obtenerConteoTotalUnificado();
    let total = 0;
    
    for (let tipo in conteoUnificado) {
        total += conteoUnificado[tipo] * EQUIVALENCIAS_UEH[tipo];
    }
    
    return total;
}

/**
 * Actualiza el conteo cuando se agrega o elimina un artefacto
 * @param {string} tipo - Tipo de artefacto (wc, lavatorio, etc)
 * @param {string} accion - 'agregar' o 'eliminar'
 */
function actualizarConteoArtefactos(tipo, accion = 'agregar') {
    if (!CONTEO_ARTEFACTOS.hasOwnProperty(tipo)) {
        console.warn(`Tipo de artefacto no reconocido: ${tipo}`);
        return;
    }

    if (accion === 'agregar') {
        CONTEO_ARTEFACTOS[tipo]++;
        console.log(`✅ NIVEL 1 - ${tipo.toUpperCase()} agregado. Total: ${CONTEO_ARTEFACTOS[tipo]}`);
    } else if (accion === 'eliminar') {
        if (CONTEO_ARTEFACTOS[tipo] > 0) {
            CONTEO_ARTEFACTOS[tipo]--;
            console.log(`🗑️ NIVEL 1 - ${tipo.toUpperCase()} eliminado. Total: ${CONTEO_ARTEFACTOS[tipo]}`);
        }
    }

    // Mostrar resumen en consola
    mostrarResumenConteo();
    
    // Actualizar cuadro si está abierto
    sincronizarCuadroUEH();
    
    // ⭐ NUEVO: Notificar a la memoria si está abierta
    notificarMemoriaUEH();
}

/**
 * Muestra un resumen del conteo actual en consola
 */
function mostrarResumenConteo() {
    const conteoUnificado = obtenerConteoTotalUnificado();
    const totalArtefactos = Object.values(conteoUnificado).reduce((a, b) => a + b, 0);
    const totalUEH = calcularTotalUEHUnificado();
    
    console.log('📊 CONTEO UNIFICADO (NIVEL 1 + NIVEL 2):');
    console.table(conteoUnificado);
    console.log(`📈 Total Artefactos: ${totalArtefactos}`);
    console.log(`🎯 Total U.E.H: ${totalUEH}`);
}

/**
 * Calcula el total de U.E.H según el conteo actual (solo nivel 1)
 */
function calcularTotalUEH() {
    let total = 0;
    for (let tipo in CONTEO_ARTEFACTOS) {
        total += CONTEO_ARTEFACTOS[tipo] * EQUIVALENCIAS_UEH[tipo];
    }
    return total;
}

/**
 * Obtiene el conteo actual (para uso externo)
 */
function obtenerConteoActual() {
    return {
        conteo: { ...CONTEO_ARTEFACTOS },
        totalArtefactos: Object.values(CONTEO_ARTEFACTOS).reduce((a, b) => a + b, 0),
        totalUEH: calcularTotalUEH()
    };
}

/**
 * Reinicia todo el conteo a cero
 */
function reiniciarConteo() {
    for (let tipo in CONTEO_ARTEFACTOS) {
        CONTEO_ARTEFACTOS[tipo] = 0;
    }
    console.log('🔄 Conteo NIVEL 1 reiniciado');
    sincronizarCuadroUEH();
    notificarMemoriaUEH();
}

/**
 * Sincroniza los datos con el Cuadro U.E.H si está abierto o integrado
 */
function sincronizarCuadroUEH() {
    // Intentar sincronizar con iframe abierto
    const iframe = document.getElementById('cuadroIframe');
    if (iframe && iframe.contentWindow) {
        try {
            const iframeWindow = iframe.contentWindow;
            inyectarDatosEnCuadroUnificado(iframeWindow);
        } catch (error) {
            console.log('No se pudo sincronizar con iframe UEH:', error);
        }
    }

    // Intentar sincronizar con cuadros integrados en el plano
    const cuadrosIntegrados = document.querySelectorAll('.cuadro-integrado');
    cuadrosIntegrados.forEach(cuadro => {
        inyectarDatosEnCuadroIntegrado(cuadro);
    });
}

/**
 * ⭐ MODIFICADO - Notifica a la MEMORIA DE ALCANTARILLADO si está abierta
 */
function notificarMemoriaUEH() {
    const iframeMemoria = document.getElementById('iframeMemoriaAlc');
    
    if (!iframeMemoria || !iframeMemoria.contentWindow) {
        return;
    }
    
    const memoriaWindow = iframeMemoria.contentWindow;
    
    if (!memoriaWindow.sincronizarDesdeAlcantarillado) {
        return;
    }
    
    // Obtener elementos actuales
    let elementsArray = [];
    if (window.elements) {
        elementsArray = window.elements;
    } else if (window.plans && window.plans[window.currentPlanIndex]) {
        elementsArray = window.plans[window.currentPlanIndex].tracingElements || [];
    }
    
    // Agregar elementos de nivel 2 si existen
    if (window.ELEMENTOS_NIVEL_2) {
        elementsArray = [...elementsArray, ...window.ELEMENTOS_NIVEL_2];
    }
    
    memoriaWindow.sincronizarDesdeAlcantarillado(elementsArray);
    console.log('📋 Memoria Alcantarillado actualizada automáticamente');
}

/**
 * ⭐ NUEVA FUNCIÓN - Inyecta datos UNIFICADOS en iframe de cuadro UEH
 */
function inyectarDatosEnCuadroUnificado(iframeWindow) {
    try {
        const conteoUnificado = obtenerConteoTotalUnificado();
        
        // Actualizar cada artefacto con el conteo unificado
        Object.keys(conteoUnificado).forEach(tipo => {
            if (iframeWindow.actualizarCantidadUEH) {
                iframeWindow.actualizarCantidadUEH(tipo, conteoUnificado[tipo]);
            }
        });
        
        console.log('✅ Cuadro UEH iframe sincronizado con conteo unificado');
    } catch (error) {
        console.error('Error al inyectar datos en iframe:', error);
    }
}

/**
 * ⭐ NUEVA FUNCIÓN - Inyecta datos UNIFICADOS en cuadros integrados
 */
function inyectarDatosEnCuadroIntegrado(cuadroElement) {
    try {
        const conteoUnificado = obtenerConteoTotalUnificado();
        const inputs = cuadroElement.querySelectorAll('input[type="number"]');
        
        inputs.forEach(input => {
            const artefactoId = input.dataset.artefacto;
            if (artefactoId && conteoUnificado.hasOwnProperty(artefactoId)) {
                input.value = conteoUnificado[artefactoId];
            }
        });

        // Disparar cálculo
        const calcularFunc = cuadroElement.querySelector('script');
        if (calcularFunc) {
            inputs.forEach(input => {
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            });
        }

        console.log('✅ Cuadro integrado sincronizado con conteo unificado');
    } catch (error) {
        console.error('Error al inyectar datos en cuadro integrado:', error);
    }
}

/**
 * Inyecta los datos de conteo en un documento/elemento del cuadro (LEGACY)
 */
function inyectarDatosEnCuadro(docOrElement) {
    try {
        const inputs = docOrElement.querySelectorAll('input[type="number"]');
        
        inputs.forEach((input, index) => {
            const tipoCorrespondiente = Object.keys(MAPEO_CUADRO_UEH).find(
                tipo => MAPEO_CUADRO_UEH[tipo] === index
            );
            
            if (tipoCorrespondiente) {
                input.value = CONTEO_ARTEFACTOS[tipoCorrespondiente];
            }
        });

        const calcularFunc = docOrElement.defaultView?.calcular || window.calcular;
        if (typeof calcularFunc === 'function') {
            calcularFunc();
        } else {
            inputs.forEach(input => {
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            });
        }

        console.log('✅ Datos sincronizados con Cuadro U.E.H');
    } catch (error) {
        console.error('Error al inyectar datos:', error);
    }
}

// Exportar funciones al scope global
window.actualizarConteoArtefactos = actualizarConteoArtefactos;
window.obtenerConteoActual = obtenerConteoActual;
window.reiniciarConteo = reiniciarConteo;
window.sincronizarCuadroUEH = sincronizarCuadroUEH;
window.mostrarResumenConteo = mostrarResumenConteo;
window.notificarMemoriaUEH = notificarMemoriaUEH;
window.CONTEO_ARTEFACTOS = CONTEO_ARTEFACTOS;

// ⭐ NUEVAS EXPORTACIONES UNIFICADAS
window.obtenerConteoTotalUnificado = obtenerConteoTotalUnificado;
window.calcularTotalUEHUnificado = calcularTotalUEHUnificado;

console.log('📊 Sistema de conteo automático cargado (UNIFICADO + NOTIFICACIÓN MEMORIA ALCANTARILLADO)');