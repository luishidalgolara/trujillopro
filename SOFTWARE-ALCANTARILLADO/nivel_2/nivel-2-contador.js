// Sistema de conteo para segundo nivel
const CONTEO_ARTEFACTOS_NIVEL2 = {
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

function actualizarConteoArtefactosNivel2(tipo, accion = 'agregar') {
    if (!CONTEO_ARTEFACTOS_NIVEL2.hasOwnProperty(tipo)) {
        console.warn(`Tipo no reconocido: ${tipo}`);
        return;
    }

    if (accion === 'agregar') {
        CONTEO_ARTEFACTOS_NIVEL2[tipo]++;
        console.log(`✅ ${tipo.toUpperCase()} - 2° NIVEL agregado. Total: ${CONTEO_ARTEFACTOS_NIVEL2[tipo]}`);
    } else if (accion === 'eliminar') {
        if (CONTEO_ARTEFACTOS_NIVEL2[tipo] > 0) {
            CONTEO_ARTEFACTOS_NIVEL2[tipo]--;
            console.log(`🗑️ ${tipo.toUpperCase()} - 2° NIVEL eliminado. Total: ${CONTEO_ARTEFACTOS_NIVEL2[tipo]}`);
        }
    }

    mostrarResumenConteoNivel2();
    
    // ⭐ NUEVO: Sincronizar con Cuadro UEH si está abierto
    if (typeof sincronizarCuadroUEH === 'function') {
        sincronizarCuadroUEH();
    }
    
    // ⭐ NUEVO: Notificar a la memoria si está abierta
    if (typeof notificarMemoriaUEH === 'function') {
        notificarMemoriaUEH();
    }
}

function mostrarResumenConteoNivel2() {
    const totalArtefactos = Object.values(CONTEO_ARTEFACTOS_NIVEL2).reduce((a, b) => a + b, 0);
    const totalUEH = calcularTotalUEHNivel2();
    
    console.log('📊 CONTEO 2° NIVEL:');
    console.table(CONTEO_ARTEFACTOS_NIVEL2);
    console.log(`📈 Total Artefactos 2° Nivel: ${totalArtefactos}`);
    console.log(`🎯 Total U.E.H 2° Nivel: ${totalUEH}`);
}

function calcularTotalUEHNivel2() {
    let total = 0;
    for (let tipo in CONTEO_ARTEFACTOS_NIVEL2) {
        total += CONTEO_ARTEFACTOS_NIVEL2[tipo] * EQUIVALENCIAS_UEH[tipo];
    }
    return total;
}

function obtenerConteoActualNivel2() {
    return {
        conteo: { ...CONTEO_ARTEFACTOS_NIVEL2 },
        totalArtefactos: Object.values(CONTEO_ARTEFACTOS_NIVEL2).reduce((a, b) => a + b, 0),
        totalUEH: calcularTotalUEHNivel2()
    };
}

function reiniciarConteoNivel2() {
    for (let tipo in CONTEO_ARTEFACTOS_NIVEL2) {
        CONTEO_ARTEFACTOS_NIVEL2[tipo] = 0;
    }
    console.log('🔄 Conteo 2° Nivel reiniciado');
    
    // ⭐ NUEVO: Sincronizar después de reiniciar
    if (typeof sincronizarCuadroUEH === 'function') {
        sincronizarCuadroUEH();
    }
    if (typeof notificarMemoriaUEH === 'function') {
        notificarMemoriaUEH();
    }
}

window.actualizarConteoArtefactosNivel2 = actualizarConteoArtefactosNivel2;
window.obtenerConteoActualNivel2 = obtenerConteoActualNivel2;
window.reiniciarConteoNivel2 = reiniciarConteoNivel2;
window.mostrarResumenConteoNivel2 = mostrarResumenConteoNivel2;
window.CONTEO_ARTEFACTOS_NIVEL2 = CONTEO_ARTEFACTOS_NIVEL2;

console.log('📊 nivel-2-contador.js cargado');