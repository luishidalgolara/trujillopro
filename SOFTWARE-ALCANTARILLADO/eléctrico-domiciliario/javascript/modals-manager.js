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

function abrirTablero() {
    abrirModal('modalTablero');
    console.log('⚡ Abriendo configuración de tablero');
}

function abrirUnifilar() {
    updateStatus('📊 Generando esquema unifilar...');
    console.log('📊 Esquema unifilar');
}

function abrirCuadroCargas() {
    abrirModal('modalCuadroCargas');
    console.log('📋 Abriendo cuadro de cargas');
}

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

function generarTablero() {
    const intGeneral = document.getElementById('intGeneral').value;
    const diferencial = document.getElementById('diferencial').value;
    
    console.log('⚡ Generando tablero:', { intGeneral, diferencial });
    updateStatus('✅ Tablero eléctrico generado');
    
    cerrarModal('modalTablero');
}

function exportarCuadroCargas() {
    console.log('📥 Exportando cuadro de cargas');
    updateStatus('📥 Exportando cuadro de cargas a Excel...');
}
