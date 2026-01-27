// ===================================
// MODAL EETT - ESPECIFICACIONES TÉCNICAS
// ===================================

function abrirEETT() {
    const modal = document.getElementById('modalEETT');
    const iframe = document.getElementById('iframeEETT');
    
    if (modal && iframe) {
        iframe.src = 'eett/index.html';
        modal.classList.add('active');
        console.log('📄 EETT abierto');
    }
}

function cerrarEETT() {
    const modal = document.getElementById('modalEETT');
    const iframe = document.getElementById('iframeEETT');
    
    if (modal && iframe) {
        modal.classList.remove('active');
        // Limpiar iframe después de cerrar
        setTimeout(() => {
            iframe.src = '';
        }, 300);
        console.log('📄 EETT cerrado');
    }
}

// Cerrar modal al hacer clic fuera de la ventana
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalEETT');
    if (e.target === modal) {
        cerrarEETT();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalEETT');
        if (modal && modal.classList.contains('active')) {
            cerrarEETT();
        }
    }
});

console.log('✅ Modal EETT inicializado');