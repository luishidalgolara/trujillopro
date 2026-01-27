/**
 * UI de thumbnails y gestión visual de planos
 */
const PlaneThumbnailsUIAlc = {
    container: null,
    isCollapsed: false,
    
    init() {
        this.createThumbnailsContainer();
        this.attachKeyboardShortcut();
        this.renderThumbnails();
        console.log('✅ PlaneThumbnailsUIAlc UI inicializado');
    },
    
    createThumbnailsContainer() {
        const existingContainer = document.getElementById('planeThumbnailsContainerAlc');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        const container = document.createElement('div');
        container.id = 'planeThumbnailsContainerAlc';
        container.className = 'plane-thumbnails-container-alc';
        container.innerHTML = `
            <div class="plane-thumbnails-header-alc">
                <div class="plane-thumbnails-title-alc">📋 PLANOS DE ALCANTARILLADO</div>
                <div class="plane-thumbnails-actions-alc">
                    <button class="btn-add-plane-alc" onclick="PlaneManagerCoreAlc.createPlane()">
                        ➕ Nuevo Plano
                    </button>
                    <button class="btn-export-planes-alc" onclick="PlaneManagerCoreAlc.exportProject()">
                        💾 Exportar
                    </button>
                    <button class="btn-import-planes-alc" onclick="document.getElementById('importPlanesAlc').click()">
                        📂 Importar
                    </button>
                    <input type="file" id="importPlanesAlc" accept=".json" style="display: none;" 
                           onchange="PlaneManagerCoreAlc.importProject(this.files[0])">
                    <button class="btn-collapse-planes-alc" onclick="PlaneThumbnailsUIAlc.toggleCollapse()">
                        👁️ Ocultar
                    </button>
                </div>
            </div>
            <div class="plane-thumbnails-content-alc" id="planeThumbnailsContentAlc">
                <!-- Los thumbnails se generan aquí -->
            </div>
        `;
        
        document.body.appendChild(container);
        this.container = container;
        
        const showButton = document.createElement('button');
        showButton.className = 'btn-show-planes-alc';
        showButton.onclick = () => this.toggleCollapse();
        showButton.innerHTML = '📋 Mostrar Planos';
        document.body.appendChild(showButton);
    },
    
    renderThumbnails() {
        const content = document.getElementById('planeThumbnailsContentAlc');
        if (!content) return;
        
        content.innerHTML = '';
        
        PlaneStateAlc.planes.forEach((plane, index) => {
            const thumbnail = this.createThumbnail(plane, index);
            content.appendChild(thumbnail);
        });
    },
    
    createThumbnail(plane, index) {
        const div = document.createElement('div');
        div.className = 'plane-thumbnail-alc';
        div.setAttribute('data-index', index + 1);
        
        if (plane.id === PlaneStateAlc.activePlaneId) {
            div.classList.add('active');
        }
        
        div.onclick = () => {
            if (window.PlaneManagerCoreAlc) {
                window.PlaneManagerCoreAlc.switchToPlane(plane.id);
            }
        };
        
        const preview = this.generatePreview(plane);
        
        div.innerHTML = `
            <div class="plane-thumbnail-preview-alc">
                ${preview}
            </div>
            <div class="plane-thumbnail-name-alc">${plane.name}</div>
            <div class="plane-thumbnail-actions-alc">
                <button class="plane-thumbnail-btn-alc duplicate" 
                        onclick="event.stopPropagation(); PlaneManagerCoreAlc.duplicatePlane(${plane.id})"
                        title="Duplicar plano">
                    📋
                </button>
                <button class="plane-thumbnail-btn-alc rename" 
                        onclick="event.stopPropagation(); PlaneThumbnailsUIAlc.promptRename(${plane.id})"
                        title="Renombrar plano">
                    ✏️
                </button>
                <button class="plane-thumbnail-btn-alc delete" 
                        onclick="event.stopPropagation(); PlaneManagerCoreAlc.deletePlane(${plane.id})"
                        title="Eliminar plano">
                    🗑️
                </button>
            </div>
        `;
        
        return div;
    },
    
    generatePreview(plane) {
        if (plane.svgInnerHTML && plane.svgInnerHTML.length > 50) {
            const viewBox = plane.format === 'A0' ? '0 0 1189 841' : '0 0 841 594';
            return `
                <svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
                    ${plane.svgInnerHTML}
                </svg>
            `;
        }
        
        return '<div class="empty-plane">Plano vacío</div>';
    },
    
    promptRename(planeId) {
        const plane = PlaneStateAlc.getPlaneById(planeId);
        if (!plane) return;
        
        const newName = prompt('Nuevo nombre del plano:', plane.name);
        if (newName !== null) {
            if (window.PlaneManagerCoreAlc) {
                window.PlaneManagerCoreAlc.renamePlane(planeId, newName);
            }
        }
    },
    
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        const container = document.getElementById('planeThumbnailsContainerAlc');
        const showButton = document.querySelector('.btn-show-planes-alc');
        
        if (this.isCollapsed) {
            container.classList.add('collapsed');
            showButton.classList.add('visible');
        } else {
            container.classList.remove('collapsed');
            showButton.classList.remove('visible');
        }
    },
    
    attachKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            const isTyping = e.target.tagName === 'INPUT' || 
                           e.target.tagName === 'TEXTAREA' || 
                           e.target.isContentEditable;
            
            if ((e.key === 'h' || e.key === 'H') && !isTyping && !e.ctrlKey && !e.altKey) {
                this.toggleCollapse();
                e.preventDefault();
            }
        });
    }
};

window.PlaneThumbnailsUIAlc = PlaneThumbnailsUIAlc;

console.log('✅ PlaneThumbnailsUIAlc cargado');