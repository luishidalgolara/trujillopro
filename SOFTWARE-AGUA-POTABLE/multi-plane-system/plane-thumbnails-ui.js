/**
 * UI de thumbnails para el sistema multi-plano
 */
const PlaneThumbnailsUI = {
    container: null,
    isCollapsed: false, // ✅ NUEVO: Estado de colapso
    
    // Inicializar UI
    init() {
        this.createContainer();
        this.createShowButton(); // ✅ NUEVO: Botón flotante
        this.attachKeyboardShortcut(); // ✅ NUEVO: Atajo de teclado
        this.refresh();
    },
    
    // Crear contenedor principal
    createContainer() {
        if (this.container) return;
        
        this.container = document.createElement('div');
        this.container.className = 'plane-thumbnails-container';
        this.container.innerHTML = `
            <div class="plane-thumbnails-header">
                <div class="plane-thumbnails-title">📐 PLANOS DEL PROYECTO</div>
                <div class="plane-thumbnails-actions">
                    <button class="btn-collapse-planes" onclick="PlaneThumbnailsUI.toggleCollapse()">
                        <span id="collapseIcon">⬇️</span>
                        <span id="collapseText">Ocultar</span>
                    </button>
                    <button class="btn-add-plane" onclick="PlaneManager.createPlane()">
                        ➕ AGREGAR PLANO
                    </button>
                </div>
            </div>
            <div class="plane-thumbnails-content" id="planeThumbnailsContent"></div>
        `;
        
        document.body.appendChild(this.container);
    },
    
    // ✅ NUEVO: Crear botón flotante para mostrar planos
    createShowButton() {
        const showButton = document.createElement('button');
        showButton.className = 'btn-show-planes';
        showButton.id = 'btnShowPlanes';
        showButton.innerHTML = `
            <span>⬆️</span>
            <span>Mostrar Planos</span>
        `;
        showButton.onclick = () => this.toggleCollapse();
        
        document.body.appendChild(showButton);
    },
    
    // ✅ NUEVO: Toggle colapsar/expandir
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        const container = this.container;
        const showButton = document.getElementById('btnShowPlanes');
        const collapseIcon = document.getElementById('collapseIcon');
        const collapseText = document.getElementById('collapseText');
        
        if (this.isCollapsed) {
            // Ocultar barra de planos
            container.classList.add('collapsed');
            showButton.classList.add('visible');
            console.log('📐 Barra de planos ocultada');
        } else {
            // Mostrar barra de planos
            container.classList.remove('collapsed');
            showButton.classList.remove('visible');
            collapseIcon.textContent = '⬇️';
            collapseText.textContent = 'Ocultar';
            console.log('📐 Barra de planos mostrada');
        }
    },
    
    // ✅ NUEVO: Atajo de teclado H para toggle
    attachKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Tecla H (solo si no está escribiendo en un input)
            if (e.key === 'h' || e.key === 'H') {
                const activeElement = document.activeElement;
                const isTyping = activeElement.tagName === 'INPUT' || 
                                activeElement.tagName === 'TEXTAREA' ||
                                activeElement.isContentEditable;
                
                if (!isTyping) {
                    e.preventDefault();
                    this.toggleCollapse();
                }
            }
        });
        
        console.log('⌨️ Atajo de teclado: Presiona "H" para ocultar/mostrar planos');
    },
    
    // Refrescar thumbnails
    refresh() {
        const content = document.getElementById('planeThumbnailsContent');
        if (!content) return;
        
        content.innerHTML = '';
        
        const planes = PlaneState.getAllPlanes();
        planes.forEach((plane, index) => {
            const thumbnail = this.createThumbnail(plane, index);
            content.appendChild(thumbnail);
        });
    },
    
    // Crear thumbnail individual
    createThumbnail(plane, index) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'plane-thumbnail';
        
        if (index === PlaneState.activePlaneIndex) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.innerHTML = `
            <div class="plane-thumbnail-actions">
                <button class="plane-thumbnail-btn duplicate" title="Duplicar" onclick="event.stopPropagation(); PlaneManager.duplicatePlane(${index})">📋</button>
                <button class="plane-thumbnail-btn rename" title="Renombrar" onclick="event.stopPropagation(); PlaneThumbnailsUI.renamePlane(${index})">✏️</button>
                <button class="plane-thumbnail-btn delete" title="Eliminar" onclick="event.stopPropagation(); PlaneManager.deletePlane(${index})">🗑️</button>
            </div>
            <div class="plane-thumbnail-preview" id="preview-${index}">
                <div style="color: #999; font-size: 12px;">Cargando...</div>
            </div>
            <div class="plane-thumbnail-name">${plane.name}</div>
        `;
        
        thumbnail.addEventListener('click', () => {
            PlaneManager.switchToPlane(index);
        });
        
        setTimeout(() => {
            this.updateThumbnailPreview(index, plane);
        }, 100);
        
        return thumbnail;
    },
    
    // Actualizar preview del thumbnail
    updateThumbnailPreview(index, plane) {
        const preview = document.getElementById(`preview-${index}`);
        if (!preview) return;
        
        try {
            if (plane.svgInnerHTML && plane.svgInnerHTML.length > 0) {
                const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                tempSvg.setAttribute('viewBox', '0 0 1189 841');
                tempSvg.setAttribute('width', '100%');
                tempSvg.setAttribute('height', '100%');
                tempSvg.innerHTML = plane.svgInnerHTML;
                
                preview.innerHTML = '';
                preview.appendChild(tempSvg);
            } else {
                preview.innerHTML = '<div style="color: #666; font-size: 10px;">Plano vacío</div>';
            }
        } catch (e) {
            console.warn(`Error al generar preview del plano ${index}:`, e);
            preview.innerHTML = '<div style="color: #999; font-size: 10px;">Sin preview</div>';
        }
    },
    
    // Renombrar plano
    renamePlane(index) {
        const plane = PlaneState.getAllPlanes()[index];
        if (!plane) return;
        
        const newName = prompt('Nuevo nombre para el plano:', plane.name);
        if (newName && newName.trim()) {
            PlaneManager.renamePlane(index, newName);
        }
    },
    
    // Actualizar indicador de plano activo
    updateActiveIndicator(activeIndex) {
        const thumbnails = document.querySelectorAll('.plane-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === activeIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
};

// Exportar para uso global
window.PlaneThumbnailsUI = PlaneThumbnailsUI;

console.log('✅ PlaneThumbnailsUI cargado');