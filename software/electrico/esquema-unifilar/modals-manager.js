// ========================================
// FUNCIONES DE MODALES
// ========================================
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ========================================
// FUNCIÓN ACTUALIZADA PARA TABLERO INTERACTIVO
// ========================================
function abrirTablero() {
    console.log('⚡ Abriendo Tablero Eléctrico Interactivo');
    // Marcar como abierto
    window.TableroState.isOpen = true;
    // Sincronizar con elementos existentes
    if (typeof syncTableroFromElements === 'function') {
        syncTableroFromElements();
    }
    // Abrir modal
    abrirModal('modalTableroInteractivo');
    updateStatus('⚡ Tablero Eléctrico sincronizado con el plano');
}

function cerrarTablero() {
    window.TableroState.isOpen = false;
    cerrarModal('modalTableroInteractivo');
    updateStatus('Tablero cerrado');
}

function abrirUnifilar() {
    // La función está en esquema-unifilar/unifilarCore.js
    // Se exporta en unifilarIndex.js
    console.log('📊 Llamando a sistema de Esquema Unifilar');
}

// ========================================
// ⚠️ ESTA FUNCIÓN YA NO SE USA
// La nueva función está en cuadro-cargas-integracion/cuadroCargasCore.js
// y se exporta en cuadroCargasIndex.js
// El HTML llama directamente a esa función
// ========================================

function abrirSimbologia() {
    abrirModal('modalSimbologia');
    console.log('📊 Abriendo simbología');
}

function abrirMemoriaCalculo() {
    updateStatus('📄 Generando memoria de cálculo...');
    console.log('📄 Memoria de cálculo');
}

function abrirEspecificaciones() {
    updateStatus('📋 Abriendo especificaciones técnicas...');
    console.log('📋 Especificaciones técnicas');
}

function exportarCuadroCargas() {
    console.log('📥 Exportando cuadro de cargas');
    updateStatus('📥 Exportando cuadro de cargas a Excel...');
    alert('📥 Funcionalidad de exportación en desarrollo\n\nPróximamente podrás exportar a:\n• Excel (.xlsx)\n• PDF\n• CSV');
}

console.log('✅ Modals Manager cargado - Compatible con sistema de Cuadro de Cargas');
