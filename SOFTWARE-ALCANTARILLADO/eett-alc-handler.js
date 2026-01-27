// ========================================
// EETT ALCANTARILLADO HANDLER
// ========================================

function abrirEETTAlcantarillado() {
    const modal = document.getElementById('modalEETTAlc');
    const iframe = document.getElementById('iframeEETTAlc');
    
    if (!modal || !iframe) {
        console.error('❌ Modal EETT Alcantarillado no encontrado');
        return;
    }
    
    // Cargar el HTML de EETT Alcantarillado
    iframe.src = 'eett/eett-alcantarillado.html';
    
    // Mostrar modal
    modal.classList.add('active');
    
    console.log('✅ Modal EETT Alcantarillado abierto');
}

function cerrarEETTAlc() {
    const modal = document.getElementById('modalEETTAlc');
    const iframe = document.getElementById('iframeEETTAlc');
    
    if (modal) {
        modal.classList.remove('active');
    }
    
    if (iframe) {
        iframe.src = '';
    }
    
    console.log('✅ Modal EETT Alcantarillado cerrado');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalEETTAlc');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarEETTAlc();
            }
        });
    }
});

console.log('✅ EETT Alcantarillado Handler cargado');