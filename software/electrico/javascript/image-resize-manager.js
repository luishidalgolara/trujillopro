/**
 * IMAGE RESIZE MANAGER
 * Gestor INDEPENDIENTE para redimensionamiento de imágenes
 * NO interfiere con el sistema de planos
 */

const ImageResizeManager = {
    // Estado de redimensionamiento
    isResizing: false,
    isDragging: false,
    
    // ========================================
    // DETECTAR CUANDO INICIA RESIZE/DRAG
    // ========================================
    onResizeStart() {
        this.isResizing = true;
        console.log('🔒 ImageResizeManager: Resize iniciado');
    },
    
    onResizeEnd() {
        this.isResizing = false;
        console.log('🔓 ImageResizeManager: Resize finalizado');
    },
    
    onDragStart() {
        this.isDragging = true;
        console.log('🔒 ImageResizeManager: Drag iniciado');
    },
    
    onDragEnd() {
        this.isDragging = false;
        console.log('🔓 ImageResizeManager: Drag finalizado');
    },
    
    // ========================================
    // VERIFICAR SI ESTÁ ACTIVO
    // ========================================
    isActive() {
        return this.isResizing || this.isDragging;
    }
};

// Exportar globalmente
window.ImageResizeManager = ImageResizeManager;

console.log('✅ ImageResizeManager cargado (independiente del sistema de planos)');