// boton-flotante-asistente.js - LÓGICA BOTÓN FLOTANTE

(function() {
    'use strict';
    
    console.log('🤖 Inicializando botón flotante asistente...');
    
    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        
        // ============================================================
        // ELEMENTOS DEL DOM
        // ============================================================
        const btnFlotante = document.getElementById('btnAsistenteFlotante');
        const modalOverlay = document.getElementById('modalAsistenteOverlay');
        const btnCerrar = document.getElementById('btnCerrarAsistente');
        
        if (!btnFlotante || !modalOverlay || !btnCerrar) {
            console.error('❌ Elementos del asistente no encontrados');
            return;
        }
        
        // ============================================================
        // ABRIR MODAL
        // ============================================================
        btnFlotante.addEventListener('click', function() {
            console.log('🤖 Abriendo asistente virtual...');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
        
        // ============================================================
        // CERRAR MODAL
        // ============================================================
        btnCerrar.addEventListener('click', function() {
            console.log('🤖 Cerrando asistente virtual...');
            cerrarModal();
        });
        
        // Cerrar al hacer clic fuera del modal
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                cerrarModal();
            }
        });
        
        // ============================================================
        // FUNCIÓN CERRAR MODAL
        // ============================================================
        function cerrarModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        }
        
        // ============================================================
        // ATAJO DE TECLADO
        // ============================================================
        document.addEventListener('keydown', function(e) {
            // ESC para cerrar
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                cerrarModal();
            }
            
            // Ctrl + H para abrir asistente
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                btnFlotante.click();
            }
        });
        
        console.log('✅ Botón flotante asistente cargado correctamente');
        console.log('💡 Atajo: Ctrl + H para abrir el asistente');
        console.log('💡 Atajo: ESC para cerrar el asistente');
    });
    
})();