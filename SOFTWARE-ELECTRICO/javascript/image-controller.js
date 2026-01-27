// ========================================
// CONTROLADOR DE IMAGEN DE FONDO - MEJORADO
// ========================================
// Maneja selección, redimensionamiento, movimiento y bloqueo de imagen
// COMPATIBLE CON Y SIN AppState
// ✅ NOTIFICA al ImageResizeManager cuando está activo

const ImageController = {
    // Estado
    images: [], // Array para múltiples imágenes
    selectedImage: null,
    isLocked: false,
    isDragging: false,
    isResizing: false,
    dragStartX: 0,
    dragStartY: 0,
    resizeHandle: null,
    
    // Elementos de control
    controlsGroup: null,
    borderRect: null,
    handles: [],
    lockButton: null,
    closeButton: null,
    
    // Helper para obtener zoom (con fallback)
    getZoom() {
        return (typeof AppState !== 'undefined' && AppState.zoom) ? AppState.zoom : 1;
    },
    
    // Helper para verificar si está en modo pan
    isPanning() {
        return (typeof AppState !== 'undefined' && AppState.isPanning) ? AppState.isPanning : false;
    },
    
    // Inicializar
    initialize() {
        console.log('🖼️ Inicializando controlador de imagen...');
        
        // Crear grupo de controles en el SVG
        const svg = document.getElementById('plano');
        if (!svg) {
            console.error('❌ SVG #plano no encontrado');
            return;
        }
        
        this.controlsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.controlsGroup.setAttribute('id', 'image-controls');
        this.controlsGroup.style.display = 'none';
        svg.appendChild(this.controlsGroup);
        
        // Event listeners
        this.setupEventListeners();
        
        console.log('✅ Controlador de imagen inicializado');
    },
    
    // Configurar eventos
    setupEventListeners() {
        const svg = document.getElementById('plano');
        if (!svg) return;
        
        // Click en el SVG para detectar selección/deselección
        svg.addEventListener('click', (e) => {
            const target = e.target;
            
            // Si click en imagen de fondo
            if (target.tagName === 'image' && target.getAttribute('data-background') === 'true') {
                e.stopPropagation();
                this.selectImage(target);
            } 
            // Si click fuera de controles, deseleccionar
            else if (!target.closest('#image-controls')) {
                this.deselectImage();
            }
        });
        
        console.log('✅ Event listeners configurados');
    },
    
    // Seleccionar imagen y mostrar controles
    selectImage(imageElement) {
        if (this.selectedImage === imageElement && this.controlsGroup.style.display !== 'none') {
            console.log('ℹ️ Imagen ya está seleccionada');
            return; // Ya está seleccionada
        }
        
        // Registrar imagen si no existe en el array
        if (!this.images.includes(imageElement)) {
            this.images.push(imageElement);
            console.log(`📸 Nueva imagen registrada. Total: ${this.images.length}`);
        }
        
        this.selectedImage = imageElement;
        this.showControls();
        
        if (typeof updateStatus === 'function') {
            updateStatus('🖼️ Imagen seleccionada - Arrastra esquinas azules para redimensionar');
        }
        console.log('✅ Imagen seleccionada, controles mostrados');
    },
    
    // Deseleccionar imagen
    deselectImage() {
        if (!this.selectedImage) return;
        
        this.selectedImage = null;
        this.hideControls();
        console.log('📤 Imagen deseleccionada');
    },
    
    // Mostrar controles
    showControls() {
        // Validación
        if (!this.selectedImage || !this.selectedImage.isConnected) {
            console.warn('⚠️ No hay imagen seleccionada o no está en el DOM');
            this.selectedImage = null;
            return;
        }
        
        // Limpiar controles anteriores
        this.controlsGroup.innerHTML = '';
        
        const x = parseFloat(this.selectedImage.getAttribute('x'));
        const y = parseFloat(this.selectedImage.getAttribute('y'));
        const width = parseFloat(this.selectedImage.getAttribute('width'));
        const height = parseFloat(this.selectedImage.getAttribute('height'));
        
        const zoom = this.getZoom();
        
        console.log(`🎨 Creando controles: x=${x}, y=${y}, w=${width}, h=${height}, zoom=${zoom}`);
        
        // 1. BORDE PUNTEADO AZUL
        this.borderRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.borderRect.setAttribute('x', x);
        this.borderRect.setAttribute('y', y);
        this.borderRect.setAttribute('width', width);
        this.borderRect.setAttribute('height', height);
        this.borderRect.setAttribute('fill', 'none');
        this.borderRect.setAttribute('stroke', '#3498db');
        this.borderRect.setAttribute('stroke-width', 3);
        this.borderRect.setAttribute('stroke-dasharray', '10,5');
        this.borderRect.setAttribute('pointer-events', 'none');
        this.controlsGroup.appendChild(this.borderRect);
        
        // 2. HANDLES EN LAS 4 ESQUINAS
        const handleSize = 20;
        const handlePositions = [
            { x: x, y: y, cursor: 'nwse-resize', position: 'nw' },
            { x: x + width, y: y, cursor: 'nesw-resize', position: 'ne' },
            { x: x, y: y + height, cursor: 'nesw-resize', position: 'sw' },
            { x: x + width, y: y + height, cursor: 'nwse-resize', position: 'se' }
        ];
        
        this.handles = [];
        handlePositions.forEach(pos => {
            const handle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            handle.setAttribute('cx', pos.x);
            handle.setAttribute('cy', pos.y);
            handle.setAttribute('r', handleSize / 2);
            handle.setAttribute('fill', '#3498db');
            handle.setAttribute('stroke', 'white');
            handle.setAttribute('stroke-width', 3);
            handle.setAttribute('cursor', pos.cursor);
            handle.setAttribute('data-position', pos.position);
            handle.style.pointerEvents = 'all';
            
            // Eventos de resize
            handle.addEventListener('mousedown', (e) => this.startResize(e, pos.position));
            
            this.handles.push(handle);
            this.controlsGroup.appendChild(handle);
        });
        
        // 3. BOTÓN CANDADO
        const buttonY = y - 40;
        const buttonSize = 30;
        
        const lockBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        lockBg.setAttribute('x', x + width - buttonSize - 45);
        lockBg.setAttribute('y', buttonY);
        lockBg.setAttribute('width', buttonSize);
        lockBg.setAttribute('height', buttonSize);
        lockBg.setAttribute('fill', this.isLocked ? '#e74c3c' : '#3498db');
        lockBg.setAttribute('rx', 5);
        lockBg.setAttribute('cursor', 'pointer');
        lockBg.style.pointerEvents = 'all';
        this.controlsGroup.appendChild(lockBg);
        
        const lockIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lockIcon.setAttribute('x', x + width - buttonSize / 2 - 45);
        lockIcon.setAttribute('y', buttonY + buttonSize * 0.7);
        lockIcon.setAttribute('text-anchor', 'middle');
        lockIcon.setAttribute('font-size', 18);
        lockIcon.setAttribute('fill', 'white');
        lockIcon.setAttribute('cursor', 'pointer');
        lockIcon.textContent = this.isLocked ? '🔒' : '🔓';
        lockIcon.style.pointerEvents = 'none';
        this.controlsGroup.appendChild(lockIcon);
        
        this.lockButton = lockBg;
        this.lockButton.addEventListener('click', () => this.toggleLock(lockBg, lockIcon));
        
        // 4. BOTÓN ELIMINAR
        const closeBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        closeBg.setAttribute('x', x + width - buttonSize - 5);
        closeBg.setAttribute('y', buttonY);
        closeBg.setAttribute('width', buttonSize);
        closeBg.setAttribute('height', buttonSize);
        closeBg.setAttribute('fill', '#e74c3c');
        closeBg.setAttribute('rx', 5);
        closeBg.setAttribute('cursor', 'pointer');
        closeBg.style.pointerEvents = 'all';
        this.controlsGroup.appendChild(closeBg);
        
        const closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        closeIcon.setAttribute('x', x + width - buttonSize / 2 - 5);
        closeIcon.setAttribute('y', buttonY + buttonSize * 0.7);
        closeIcon.setAttribute('text-anchor', 'middle');
        closeIcon.setAttribute('font-size', 18);
        closeIcon.setAttribute('fill', 'white');
        closeIcon.setAttribute('cursor', 'pointer');
        closeIcon.textContent = '✕';
        closeIcon.style.pointerEvents = 'none';
        this.controlsGroup.appendChild(closeIcon);
        
        this.closeButton = closeBg;
        this.closeButton.addEventListener('click', () => this.deleteImage());
        
        // Mostrar controles
        this.controlsGroup.style.display = 'block';
        
        // Hacer la imagen arrastrable
        this.selectedImage.style.cursor = 'move';
        this.selectedImage.style.pointerEvents = 'all';
        this.selectedImage.addEventListener('mousedown', (e) => this.startDrag(e));
    },
    
    // Ocultar controles
    hideControls() {
        if (this.controlsGroup) {
            this.controlsGroup.style.display = 'none';
        }
        
        if (this.selectedImage) {
            this.selectedImage.removeEventListener('mousedown', (e) => this.startDrag(e));
        }
    },
    
    // Toggle lock
    toggleLock(lockBg, lockIcon) {
        this.isLocked = !this.isLocked;
        lockBg.setAttribute('fill', this.isLocked ? '#e74c3c' : '#3498db');
        lockIcon.textContent = this.isLocked ? '🔒' : '🔓';
        
        if (typeof updateStatus === 'function') {
            updateStatus(this.isLocked ? '🔒 Imagen bloqueada' : '🔓 Imagen desbloqueada');
        }
        console.log(this.isLocked ? '🔒 Bloqueada' : '🔓 Desbloqueada');
    },
    
    // Eliminar imagen
    deleteImage() {
        if (!this.selectedImage) return;
        
        if (confirm('¿Eliminar imagen de fondo?')) {
            const index = this.images.indexOf(this.selectedImage);
            if (index > -1) {
                this.images.splice(index, 1);
            }
            
            this.selectedImage.remove();
            this.hideControls();
            this.selectedImage = null;
            this.isLocked = false;
            
            if (typeof updateStatus === 'function') {
                updateStatus('🗑️ Imagen eliminada');
            }
            console.log('🗑️ Imagen eliminada');
        }
    },
    
    // Iniciar drag
    startDrag(e) {
        if (this.isLocked || this.isPanning()) return;
        if (!this.selectedImage) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        this.isDragging = true;
        
        // ✅ NOTIFICAR al ImageResizeManager
        if (window.ImageResizeManager) {
            window.ImageResizeManager.onDragStart();
        }
        
        if (typeof AppState !== 'undefined') {
            AppState.isDraggingElement = true;
        }
        
        const svg = document.getElementById('plano');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        const imgX = parseFloat(this.selectedImage.getAttribute('x'));
        const imgY = parseFloat(this.selectedImage.getAttribute('y'));
        
        this.dragStartX = svgP.x - imgX;
        this.dragStartY = svgP.y - imgY;
        
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.stopDrag);
    },
    
    handleDrag: (e) => {
        if (!ImageController.isDragging || !ImageController.selectedImage) return;
        
        e.preventDefault();
        
        const svg = document.getElementById('plano');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        const newX = svgP.x - ImageController.dragStartX;
        const newY = svgP.y - ImageController.dragStartY;
        
        ImageController.selectedImage.setAttribute('x', newX);
        ImageController.selectedImage.setAttribute('y', newY);
        ImageController.updateControlsPosition();
    },
    
    stopDrag: (e) => {
        if (!ImageController.isDragging) return;
        
        ImageController.isDragging = false;
        
        // ✅ NOTIFICAR al ImageResizeManager
        if (window.ImageResizeManager) {
            window.ImageResizeManager.onDragEnd();
        }
        
        if (typeof AppState !== 'undefined') {
            AppState.isDraggingElement = false;
        }
        
        document.removeEventListener('mousemove', ImageController.handleDrag);
        document.removeEventListener('mouseup', ImageController.stopDrag);
    },
    
    // Iniciar resize
    startResize(e, position) {
        if (this.isLocked || this.isPanning()) return;
        if (!this.selectedImage) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        this.isResizing = true;
        this.resizeHandle = position;
        
        // ✅ NOTIFICAR al ImageResizeManager
        if (window.ImageResizeManager) {
            window.ImageResizeManager.onResizeStart();
        }
        
        if (typeof AppState !== 'undefined') {
            AppState.isDraggingElement = true;
        }
        
        const svg = document.getElementById('plano');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        this.dragStartX = svgP.x;
        this.dragStartY = svgP.y;
        this.originalX = parseFloat(this.selectedImage.getAttribute('x'));
        this.originalY = parseFloat(this.selectedImage.getAttribute('y'));
        this.originalWidth = parseFloat(this.selectedImage.getAttribute('width'));
        this.originalHeight = parseFloat(this.selectedImage.getAttribute('height'));
        this.aspectRatio = this.originalWidth / this.originalHeight;
        
        document.addEventListener('mousemove', this.handleResize);
        document.addEventListener('mouseup', this.stopResize);
        
        console.log('🔄 Iniciando resize desde:', position);
    },
    
    handleResize: (e) => {
        if (!ImageController.isResizing || !ImageController.selectedImage) return;
        
        e.preventDefault();
        
        const svg = document.getElementById('plano');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        const deltaX = svgP.x - ImageController.dragStartX;
        const deltaY = svgP.y - ImageController.dragStartY;
        
        let newX = ImageController.originalX;
        let newY = ImageController.originalY;
        let newWidth = ImageController.originalWidth;
        let newHeight = ImageController.originalHeight;
        
        switch (ImageController.resizeHandle) {
            case 'se':
                newWidth = ImageController.originalWidth + deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                break;
            case 'sw':
                newWidth = ImageController.originalWidth - deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                newX = ImageController.originalX + deltaX;
                break;
            case 'ne':
                newWidth = ImageController.originalWidth + deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                newY = ImageController.originalY + ImageController.originalHeight - newHeight;
                break;
            case 'nw':
                newWidth = ImageController.originalWidth - deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                newX = ImageController.originalX + deltaX;
                newY = ImageController.originalY + ImageController.originalHeight - newHeight;
                break;
        }
        
        if (newWidth < 50 || newHeight < 50) return;
        
        ImageController.selectedImage.setAttribute('x', newX);
        ImageController.selectedImage.setAttribute('y', newY);
        ImageController.selectedImage.setAttribute('width', newWidth);
        ImageController.selectedImage.setAttribute('height', newHeight);
        ImageController.updateControlsPosition();
    },
    
    stopResize: (e) => {
        if (!ImageController.isResizing) return;
        
        ImageController.isResizing = false;
        ImageController.resizeHandle = null;
        
        // ✅ NOTIFICAR al ImageResizeManager
        if (window.ImageResizeManager) {
            window.ImageResizeManager.onResizeEnd();
        }
        
        if (typeof AppState !== 'undefined') {
            AppState.isDraggingElement = false;
        }
        
        document.removeEventListener('mousemove', ImageController.handleResize);
        document.removeEventListener('mouseup', ImageController.stopResize);
        
        console.log('✅ Resize completado');
    },
    
    updateControlsPosition() {
        if (!this.selectedImage || !this.selectedImage.isConnected) {
            this.selectedImage = null;
            this.hideControls();
            return;
        }
        this.hideControls();
        this.showControls();
    },
    
    updateForZoom(zoomLevel) {
        if (!this.controlsGroup || !this.selectedImage || !this.selectedImage.isConnected) {
            return;
        }
        if (this.controlsGroup.style.display !== 'none') {
            this.updateControlsPosition();
        }
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        ImageController.initialize();
    }, 100);
});

console.log('✅ ImageController mejorado cargado (con notificaciones a ImageResizeManager)');