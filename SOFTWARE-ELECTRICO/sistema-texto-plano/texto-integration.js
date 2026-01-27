// ========================================
// INTEGRACIÓN DEL SISTEMA DE TEXTO - VERSIÓN DEFINITIVA
// ========================================

/**
 * Función global para abrir el sistema de texto
 */
function abrirSistemaTexto() {
    console.log('📝 Abriendo sistema de texto...');
    TextoUI.abrirCrear();
}

/**
 * Función global para limpiar todos los textos
 */
function limpiarTodosLosTextos() {
    if (confirm('¿Estás seguro de eliminar todos los textos del plano?')) {
        TextoCore.limpiarTodos();
        if (typeof updateStatus === 'function') {
            updateStatus('🧹 Todos los textos eliminados');
        }
    }
}

/**
 * ✅ SOLUCIÓN DEFINITIVA: Listener de Delete con MÁXIMA PRIORIDAD
 * Usa capture=true para ejecutarse ANTES que otros listeners
 */
document.addEventListener('keydown', function(e) {
    // Verificar si el foco está en un input o textarea
    const elementoActivo = document.activeElement;
    const esInputOTextarea = elementoActivo && (
        elementoActivo.tagName === 'INPUT' || 
        elementoActivo.tagName === 'TEXTAREA' ||
        elementoActivo.isContentEditable
    );
    
    // Si estás escribiendo, NO hacer nada (permitir comportamiento normal)
    if (esInputOTextarea) {
        return;
    }
    
    // Solo procesar Delete/Backspace si hay un texto seleccionado
    if ((e.key === 'Delete' || e.key === 'Backspace') && TextoCore.textoSeleccionado) {
        // ✅ DETENER INMEDIATAMENTE la propagación a otros listeners
        e.stopImmediatePropagation();
        e.preventDefault();
        
        if (confirm('¿Eliminar este texto?')) {
            TextoCore.eliminarTexto(TextoCore.textoSeleccionado);
            TextoCore.textoSeleccionado = null;
            if (typeof updateStatus === 'function') {
                updateStatus('🗑️ Texto eliminado');
            }
        }
    }
}, true);  // ✅ CAPTURE = TRUE para máxima prioridad

/**
 * ✅ SOLUCIÓN DEFINITIVA: Click con prioridad y sin interferencias
 */
document.addEventListener('click', function(e) {
    const textoElement = e.target.closest('.texto-personalizado');
    
    if (textoElement) {
        // ✅ DETENER propagación para que no llegue a otros handlers
        e.stopPropagation();
        
        // Deseleccionar todos
        document.querySelectorAll('.texto-personalizado').forEach(el => {
            el.style.outline = 'none';
        });
        
        // Seleccionar este
        textoElement.style.outline = '2px dashed #667eea';
        
        // Buscar el objeto de texto
        const id = textoElement.id;
        TextoCore.textoSeleccionado = TextoCore.textosActivos.find(t => t.id === id);
        
        if (typeof updateStatus === 'function') {
            updateStatus('📝 Texto seleccionado (doble click para editar, Delete para eliminar)');
        }
    } else {
        // Deseleccionar si se hace click fuera
        document.querySelectorAll('.texto-personalizado').forEach(el => {
            el.style.outline = 'none';
        });
        TextoCore.textoSeleccionado = null;
    }
}, true);  // ✅ CAPTURE = TRUE

console.log('✅ Sistema de texto integrado completamente - VERSIÓN DEFINITIVA');
console.log('✅ Prioridad máxima en eventos Delete y Click');
console.log('✅ Sin conflictos con otros sistemas');