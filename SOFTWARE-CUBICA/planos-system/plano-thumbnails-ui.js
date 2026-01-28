/**
 * UI de Thumbnails - Sistema de Planos
 */
const PlanoThumbnailsUI = {
    container: null,
    isCollapsed: false,
    
    init() {
        this.createContainer();
        this.createShowButton();
        this.attachKeyboardShortcut();
        this.refresh();
    },
    
    createContainer() {
        if (this.container) return;
        
        this.container = document.createElement('div');
        this.container.className = 'plano-thumbnails-container';
        this.container.innerHTML = `
            <div class="plano-thumbnails-header">
                <div class="plano-thumbnails-title">📐 PLANOS DEL PROYECTO</div>
                <div class="plano-thumbnails-actions">
                    <button class="btn-collapse-planos" onclick="PlanoThumbnailsUI.toggleCollapse()">
                        <span id="collapseIcon">⬇️</span>
                        <span id="collapseText">Ocultar</span>
                    </button>
                    <button class="btn-add-plano" onclick="PlanoManager.createPlano()">
                        ➕ AGREGAR PLANO
                    </button>
                </div>
            </div>
            <div class="plano-thumbnails-content" id="planoThumbnailsContent"></div>
        `;
        
        document.body.appendChild(this.container);
    },
    
    createShowButton() {
        const showButton = document.createElement('button');
        showButton.className = 'btn-show-planos';
        showButton.id = 'btnShowPlanos';
        showButton.innerHTML = `
            <span>⬆️</span>
            <span>Mostrar Planos</span>
        `;
        showButton.onclick = () => this.toggleCollapse();
        
        document.body.appendChild(showButton);
    },
    
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        
        const container = this.container;
        const showButton = document.getElementById('btnShowPlanos');
        const collapseIcon = document.getElementById('collapseIcon');
        const collapseText = document.getElementById('collapseText');
        
        if (this.isCollapsed) {
            container.classList.add('collapsed');
            showButton.classList.add('visible');
        } else {
            container.classList.remove('collapsed');
            showButton.classList.remove('visible');
            collapseIcon.textContent = '⬇️';
            collapseText.textContent = 'Ocultar';
        }
    },
    
    attachKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'h' || e.key === 'H') {
                const activeElement = document.activeElement;
                const isTyping = activeElement.tagName === 'INPUT' || 
                                activeElement.tagName === 'TEXTAREA';
                
                if (!isTyping) {
                    e.preventDefault();
                    this.toggleCollapse();
                }
            }
        });
    },
    
    refresh() {
        const content = document.getElementById('planoThumbnailsContent');
        if (!content) return;
        
        content.innerHTML = '';
        
        const planos = PlanoState.getAllPlanos();
        planos.forEach((plano, index) => {
            const thumbnail = this.createThumbnail(plano, index);
            content.appendChild(thumbnail);
        });
    },
    
    createThumbnail(plano, index) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'plano-thumbnail';
        thumbnail.setAttribute('data-index', index + 1);
        
        if (index === PlanoState.activePlanoIndex) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.innerHTML = `
            <div class="plano-thumbnail-actions">
                <button class="plano-thumbnail-btn duplicate" title="Duplicar" onclick="event.stopPropagation(); PlanoManager.duplicatePlano(${index})">📋</button>
                <button class="plano-thumbnail-btn rename" title="Renombrar" onclick="event.stopPropagation(); PlanoThumbnailsUI.renamePlano(${index})">✏️</button>
                <button class="plano-thumbnail-btn delete" title="Eliminar" onclick="event.stopPropagation(); PlanoManager.deletePlano(${index})">🗑️</button>
            </div>
            <div class="plano-thumbnail-preview" id="preview-${index}">
                <div class="empty-plano">Plano vacío</div>
            </div>
            <div class="plano-thumbnail-name">${plano.name}</div>
        `;
        
        thumbnail.addEventListener('click', () => {
            PlanoManager.switchToPlano(index);
        });
        
        setTimeout(() => {
            this.updateThumbnailPreview(index, plano);
        }, 100);
        
        return thumbnail;
    },
    
    updateThumbnailPreview(index, plano) {
        const preview = document.getElementById(`preview-${index}`);
        if (!preview) return;
        
        try {
            const elementCount = PlanoManagerHelpers.getElementCount(plano);
            
            if (elementCount > 0) {
                preview.innerHTML = `
                    <div style="color: #00d4ff; font-size: 11px; text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 5px;">📊</div>
                        <div>${elementCount} elementos</div>
                    </div>
                `;
            } else {
                preview.innerHTML = '<div class="empty-plano">Plano vacío</div>';
            }
        } catch (e) {
            console.warn(`Error al generar preview del plano ${index}:`, e);
            preview.innerHTML = '<div class="empty-plano">Sin preview</div>';
        }
    },
    
    renamePlano(index) {
        const plano = PlanoState.getAllPlanos()[index];
        if (!plano) return;
        
        const newName = prompt('Nuevo nombre para el plano:', plano.name);
        if (newName && newName.trim()) {
            PlanoManager.renamePlano(index, newName);
        }
    },
    
    updateActiveIndicator(activeIndex) {
        const thumbnails = document.querySelectorAll('.plano-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === activeIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
};

window.PlanoThumbnailsUI = PlanoThumbnailsUI;
