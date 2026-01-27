// ================================
// ORTHO SYSTEM - Modo Ortogonal
// Sistema completo para restricciones horizontales/verticales
// ================================

// ================================
// VARIABLES GLOBALES ORTHO
// ================================
let modoOrtho = false;
let indicadorOrtho = null;
let ultimoPuntoOrtho = null;

// ================================
// INDICADOR VISUAL
// ================================

function crearIndicadorOrtho() {
    indicadorOrtho = document.createElement('div');
    indicadorOrtho.className = 'ortho-indicator';
    indicadorOrtho.textContent = '⊥ ORTHO: OFF';
    indicadorOrtho.title = 'Presiona F8 para activar/desactivar modo ortogonal';
    
    // Click para toggle
    indicadorOrtho.addEventListener('click', alternarModoOrtho);
    
    document.body.appendChild(indicadorOrtho);
}

// ================================
// FUNCIONES PRINCIPALES
// ================================

function alternarModoOrtho() {
    modoOrtho = !modoOrtho;
    
    if (modoOrtho) {
        indicadorOrtho.textContent = '⊥ ORTHO: ON';
        indicadorOrtho.classList.add('active');
        if (typeof showStatus === 'function') {
            showStatus('🔲 Modo ORTHO activado (F8) - Líneas horizontales/verticales');
        }
    } else {
        indicadorOrtho.textContent = '⊥ ORTHO: OFF';
        indicadorOrtho.classList.remove('active');
        if (typeof showStatus === 'function') {
            showStatus('🔲 Modo ORTHO desactivado (F8)');
        }
    }
    
    ultimoPuntoOrtho = null;
}

function aplicarRestriccionOrtho(puntoInicio, puntoActual) {
    if (!modoOrtho || !puntoInicio) return puntoActual;
    
    const deltaX = Math.abs(puntoActual.x - puntoInicio.x);
    const deltaY = Math.abs(puntoActual.y - puntoInicio.y);
    
    // Determinar si debe ser horizontal o vertical
    if (deltaX > deltaY) {
        // Más horizontal - fijar Y
        return { x: puntoActual.x, y: puntoInicio.y };
    } else {
        // Más vertical - fijar X
        return { x: puntoInicio.x, y: puntoActual.y };
    }
}

function obtenerPuntoInicioOrtho() {
    return ultimoPuntoOrtho;
}

function establecerPuntoInicioOrtho(punto) {
    ultimoPuntoOrtho = punto;
}

function limpiarPuntoInicioOrtho() {
    ultimoPuntoOrtho = null;
}

function estaOrthoActivo() {
    return modoOrtho;
}

// ================================
// EXPORTAR
// ================================

window.ORTHOSystem = {
    crearIndicadorOrtho,
    alternarModoOrtho,
    aplicarRestriccionOrtho,
    obtenerPuntoInicioOrtho,
    establecerPuntoInicioOrtho,
    limpiarPuntoInicioOrtho,
    estaOrthoActivo
};

console.log('✅ ortho-system.js cargado');