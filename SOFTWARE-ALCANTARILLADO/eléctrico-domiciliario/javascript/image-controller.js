// ========================================
// CONTROLADOR DE IMAGEN DE FONDO
// ========================================
// Maneja selección, redimensionamiento, movimiento y bloqueo de imagen

const ImageController = {
    // Estado
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
    
    // Inicializar
    initialize() {
        console.log('🖼️ Inicializando controlador de imagen...');
        
        // Crear grupo de controles en el SVG
        const svg = document.getElementById('plano');
        if (!svg) return;
        
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
            return; // Ya está seleccionada
        }
        
        this.selectedImage = imageElement;
        this.showControls();
        updateStatus('🖼️ Imagen seleccionada - Arrastra para mover, esquinas para redimensionar');
        console.log('✅ Imagen seleccionada');
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
        if (!this.selectedImage) return;
        
        // Limpiar controles anteriores
        this.controlsGroup.innerHTML = '';
        
        const x = parseFloat(this.selectedImage.getAttribute('x'));
        const y = parseFloat(this.selectedImage.getAttribute('y'));
        const width = parseFloat(this.selectedImage.getAttribute('width'));
        const height = parseFloat(this.selectedImage.getAttribute('height'));
        
        // 1. BORDE PUNTEADO AZUL
        this.borderRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.borderRect.setAttribute('x', x);
        this.borderRect.setAttribute('y', y);
        this.borderRect.setAttribute('width', width);
        this.borderRect.setAttribute('height', height);
        this.borderRect.setAttribute('fill', 'none');
        this.borderRect.setAttribute('stroke', '#3498db');
        this.borderRect.setAttribute('stroke-width', 2 / AppState.zoom);
        this.borderRect.setAttribute('stroke-dasharray', '8,4');
        this.borderRect.setAttribute('pointer-events', 'none');
        this.controlsGroup.appendChild(this.borderRect);
        
        // 2. HANDLES EN LAS 4 ESQUINAS
        const handleSize = 16 / AppState.zoom;
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
            handle.setAttribute('stroke-width', 2 / AppState.zoom);
            handle.setAttribute('cursor', pos.cursor);
            handle.setAttribute('data-position', pos.position);
            handle.style.pointerEvents = 'all';
            
            // Eventos de resize
            handle.addEventListener('mousedown', (e) => this.startResize(e, pos.position));
            
            this.handles.push(handle);
            this.controlsGroup.appendChild(handle);
        });
        
        // 3. BOTÓN CANDADO (arriba derecha)
        const buttonY = y - 30 / AppState.zoom;
        const buttonSize = 24 / AppState.zoom;
        
        // Fondo del botón candado
        const lockBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        lockBg.setAttribute('x', x + width - buttonSize - 35 / AppState.zoom);
        lockBg.setAttribute('y', buttonY);
        lockBg.setAttribute('width', buttonSize);
        lockBg.setAttribute('height', buttonSize);
        lockBg.setAttribute('fill', this.isLocked ? '#e74c3c' : '#3498db');
        lockBg.setAttribute('rx', 4 / AppState.zoom);
        lockBg.setAttribute('cursor', 'pointer');
        lockBg.style.pointerEvents = 'all';
        this.controlsGroup.appendChild(lockBg);
        
        // Icono candado
        const lockIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lockIcon.setAttribute('x', x + width - buttonSize / 2 - 35 / AppState.zoom);
        lockIcon.setAttribute('y', buttonY + buttonSize * 0.7);
        lockIcon.setAttribute('text-anchor', 'middle');
        lockIcon.setAttribute('font-size', 14 / AppState.zoom);
        lockIcon.setAttribute('fill', 'white');
        lockIcon.setAttribute('cursor', 'pointer');
        lockIcon.textContent = this.isLocked ? '🔒' : '🔓';
        lockIcon.style.pointerEvents = 'none';
        this.controlsGroup.appendChild(lockIcon);
        
        this.lockButton = lockBg;
        this.lockButton.addEventListener('click', () => this.toggleLock(lockBg, lockIcon));
        
        // 4. BOTÓN CERRAR/ELIMINAR (arriba derecha)
        const closeBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        closeBg.setAttribute('x', x + width - buttonSize - 5 / AppState.zoom);
        closeBg.setAttribute('y', buttonY);
        closeBg.setAttribute('width', buttonSize);
        closeBg.setAttribute('height', buttonSize);
        closeBg.setAttribute('fill', '#e74c3c');
        closeBg.setAttribute('rx', 4 / AppState.zoom);
        closeBg.setAttribute('cursor', 'pointer');
        closeBg.style.pointerEvents = 'all';
        this.controlsGroup.appendChild(closeBg);
        
        // Icono X
        const closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        closeIcon.setAttribute('x', x + width - buttonSize / 2 - 5 / AppState.zoom);
        closeIcon.setAttribute('y', buttonY + buttonSize * 0.7);
        closeIcon.setAttribute('text-anchor', 'middle');
        closeIcon.setAttribute('font-size', 14 / AppState.zoom);
        closeIcon.setAttribute('fill', 'white');
        closeIcon.setAttribute('cursor', 'pointer');
        closeIcon.textContent = '❌';
        closeIcon.style.pointerEvents = 'none';
        this.controlsGroup.appendChild(closeIcon);
        
        this.closeButton = closeBg;
        this.closeButton.addEventListener('click', () => this.deleteImage());
        
        // Habilitar drag en la imagen si no está bloqueada
        if (!this.isLocked) {
            this.selectedImage.style.cursor = 'move';
            this.selectedImage.addEventListener('mousedown', (e) => this.startDrag(e));
        }
        
        this.controlsGroup.style.display = 'block';
    },
    
    // Ocultar controles
    hideControls() {
        if (this.controlsGroup) {
            this.controlsGroup.style.display = 'none';
        }
        if (this.selectedImage) {
            this.selectedImage.style.cursor = 'default';
        }
    },
    
    // Toggle lock/unlock
    toggleLock(bgElement, iconElement) {
        this.isLocked = !this.isLocked;
        
        bgElement.setAttribute('fill', this.isLocked ? '#e74c3c' : '#3498db');
        iconElement.textContent = this.isLocked ? '🔒' : '🔓';
        
        if (this.isLocked) {
            this.selectedImage.style.cursor = 'default';
            updateStatus('🔒 Imagen bloqueada - No se puede mover ni redimensionar');
        } else {
            this.selectedImage.style.cursor = 'move';
            updateStatus('🔓 Imagen desbloqueada');
        }
        
        console.log(this.isLocked ? '🔒 Imagen bloqueada' : '🔓 Imagen desbloqueada');
    },
    
    // Eliminar imagen
    deleteImage() {
        if (!this.selectedImage) return;
        
        const confirmar = confirm('¿Deseas eliminar la imagen de fondo?');
        if (!confirmar) return;
        
        this.selectedImage.remove();
        this.hideControls();
        this.selectedImage = null;
        this.isLocked = false;
        
        updateStatus('🗑️ Imagen eliminada');
        console.log('🗑️ Imagen eliminada');
    },
    
    // Iniciar drag (mover)
    startDrag(e) {
        if (this.isLocked || AppState.isPanning) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        this.isDragging = true;
        AppState.isDraggingElement = true;
        
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
        
        updateStatus('🖐️ Moviendo imagen...');
    },
    
    // Manejar drag
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
        
        // Actualizar controles
        ImageController.updateControlsPosition();
    },
    
    // Detener drag
    stopDrag: (e) => {
        if (!ImageController.isDragging) return;
        
        ImageController.isDragging = false;
        AppState.isDraggingElement = false;
        
        document.removeEventListener('mousemove', ImageController.handleDrag);
        document.removeEventListener('mouseup', ImageController.stopDrag);
        
        updateStatus('✅ Imagen reposicionada');
    },
    
    // Iniciar resize
    startResize(e, position) {
        if (this.isLocked || AppState.isPanning) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        this.isResizing = true;
        this.resizeHandle = position;
        AppState.isDraggingElement = true;
        
        const svg = document.getElementById('plano');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        this.dragStartX = svgP.x;
        this.dragStartY = svgP.y;
        
        // Guardar dimensiones originales
        this.originalX = parseFloat(this.selectedImage.getAttribute('x'));
        this.originalY = parseFloat(this.selectedImage.getAttribute('y'));
        this.originalWidth = parseFloat(this.selectedImage.getAttribute('width'));
        this.originalHeight = parseFloat(this.selectedImage.getAttribute('height'));
        this.aspectRatio = this.originalWidth / this.originalHeight;
        
        document.addEventListener('mousemove', this.handleResize);
        document.addEventListener('mouseup', this.stopResize);
        
        updateStatus('🔄 Redimensionando imagen...');
    },
    
    // Manejar resize
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
        
        // Calcular nuevas dimensiones según handle
        switch (ImageController.resizeHandle) {
            case 'se': // Sureste (abajo derecha)
                newWidth = ImageController.originalWidth + deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                break;
                
            case 'sw': // Suroeste (abajo izquierda)
                newWidth = ImageController.originalWidth - deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                newX = ImageController.originalX + deltaX;
                break;
                
            case 'ne': // Noreste (arriba derecha)
                newWidth = ImageController.originalWidth + deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                newY = ImageController.originalY + ImageController.originalHeight - newHeight;
                break;
                
            case 'nw': // Noroeste (arriba izquierda)
                newWidth = ImageController.originalWidth - deltaX;
                newHeight = newWidth / ImageController.aspectRatio;
                newX = ImageController.originalX + deltaX;
                newY = ImageController.originalY + ImageController.originalHeight - newHeight;
                break;
        }
        
        // Aplicar dimensiones mínimas
        if (newWidth < 50 || newHeight < 50) return;
        
        ImageController.selectedImage.setAttribute('x', newX);
        ImageController.selectedImage.setAttribute('y', newY);
        ImageController.selectedImage.setAttribute('width', newWidth);
        ImageController.selectedImage.setAttribute('height', newHeight);
        
        // Actualizar controles
        ImageController.updateControlsPosition();
    },
    
    // Detener resize
    stopResize: (e) => {
        if (!ImageController.isResizing) return;
        
        ImageController.isResizing = false;
        ImageController.resizeHandle = null;
        AppState.isDraggingElement = false;
        
        document.removeEventListener('mousemove', ImageController.handleResize);
        document.removeEventListener('mouseup', ImageController.stopResize);
        
        updateStatus('✅ Imagen redimensionada');
    },
    
    // Actualizar posición de controles
    updateControlsPosition() {
        if (!this.selectedImage) return;
        
        this.hideControls();
        this.showControls();
    },
    
    // Actualizar al hacer zoom
    updateForZoom(zoomLevel) {
        if (this.controlsGroup && this.controlsGroup.style.display !== 'none') {
            this.updateControlsPosition();
        }
    }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que el SVG existe
    setTimeout(() => {
        ImageController.initialize();
    }, 100);
});

console.log('✅ Controlador de imagen cargado');