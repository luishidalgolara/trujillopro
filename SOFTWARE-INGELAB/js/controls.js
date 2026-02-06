// Controles e interacciones de usuario

// Mostrar información de componente
function showComponentInfo(componentType) {
    const componentData = STRUCTURAL_DATA.components[componentType];
    if (!componentData) return;
    
    const infoPanel = document.getElementById('infoPanel');
    const componentName = document.getElementById('componentName');
    const infoContent = document.getElementById('infoContent');
    
    componentName.textContent = componentData.name;
    
    // Construir contenido HTML
    let html = `
        <p style="margin-bottom: 1rem;"><strong>${componentData.description}</strong></p>
        
        <div class="component-info-card">
            <h5>🎯 Función Principal</h5>
            <p>${componentData.details.function}</p>
        </div>
        
        <h5>📋 Materiales</h5>
        <div class="material-tags">
            ${componentData.details.materials.map(material => 
                `<span class="material-tag">${material}</span>`
            ).join('')}
        </div>
        
        <div class="component-info-card">
            <h5>⚠️ Importancia</h5>
            <p>${componentData.details.importance}</p>
        </div>
        
        <h5>📐 Especificaciones Técnicas</h5>
        <ul>
            ${Object.entries(componentData.specifications).map(([key, value]) => 
                `<li><strong>${key}:</strong> ${value}</li>`
            ).join('')}
        </ul>
        
        <h5>🔧 Tipos</h5>
        <ul>
            ${componentData.details.types.map(type => 
                `<li>${type}</li>`
            ).join('')}
        </ul>
    `;
    
    infoContent.innerHTML = html;
    infoPanel.classList.add('active');
}

// Cerrar panel de información
function closeInfoPanel() {
    const infoPanel = document.getElementById('infoPanel');
    infoPanel.classList.remove('active');
}

// Toggle visibilidad de componente
function toggleComponentVisibility(componentType) {
    const component = componentsMap.get(componentType);
    if (component) {
        component.visible = !component.visible;
        updateComponentsList();
    }
}

// Actualizar lista de componentes
function updateComponentsList() {
    const componentsList = document.getElementById('componentsList');
    componentsList.innerHTML = '';
    
    const buildingData = STRUCTURAL_DATA.buildingLevels[currentBuilding];
    
    buildingData.components.forEach(componentType => {
        const componentData = STRUCTURAL_DATA.components[componentType];
        const component = componentsMap.get(componentType);
        const isVisible = component ? component.visible : true;
        
        const item = document.createElement('div');
        item.className = 'component-item';
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="color-indicator" style="background-color: ${componentData.color};"></div>
                <span>${componentData.name}</span>
            </div>
            <div class="component-toggle ${isVisible ? 'active' : ''}"></div>
        `;
        
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleComponentVisibility(componentType);
        });
        
        componentsList.appendChild(item);
    });
}

// Toggle etiquetas
function toggleLabels() {
    labelsVisible = !labelsVisible;
    const btn = document.getElementById('labelsBtn');
    
    if (labelsVisible) {
        btn.style.background = 'var(--success-color)';
        updateLabels();
    } else {
        btn.style.background = 'var(--primary-color)';
        labelsContainer.innerHTML = '';
    }
}

// Cambiar nivel de edificio
function changeBuildingLevel(level) {
    currentBuilding = level;
    
    // Actualizar botones
    document.querySelectorAll('.building-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.levels) === level) {
            btn.classList.add('active');
        }
    });
    
    // Reconstruir edificio
    buildBuilding(level);
    
    // Actualizar lista de componentes
    updateComponentsList();
    
    // Reset vista explosiva
    if (isExploded) {
        isExploded = false;
        const explodeBtn = document.getElementById('explodeBtn');
        explodeBtn.style.background = 'var(--primary-color)';
        
        // ✨ Desactivar etiquetas explosivas
        if (typeof explodeLabelsManager !== 'undefined') {
            explodeLabelsManager.deactivate();
        }
    }
    
    // Reset etiquetas
    if (labelsVisible) {
        labelsVisible = false;
        const labelsBtn = document.getElementById('labelsBtn');
        labelsBtn.style.background = 'var(--primary-color)';
        labelsContainer.innerHTML = '';
    }
    
    // Reset transparencia si estaba activa
    if (isTransparent) {
        isTransparent = false;
        const transparencyBtn = document.getElementById('transparencyBtn');
        if (transparencyBtn) {
            transparencyBtn.style.background = 'var(--primary-color)';
            transparencyBtn.innerHTML = '<span>👁️</span> Ver Fierros';
        }
    }
    
    // Reset tuberías si estaban visibles
    if (plumbingVisible) {
        plumbingVisible = false;
        const plumbingBtn = document.getElementById('plumbingBtn');
        if (plumbingBtn) {
            plumbingBtn.style.background = 'var(--primary-color)';
            plumbingBtn.innerHTML = '<span>🚰</span> Ver Tuberías';
        }
        if (typeof plumbingGenerator !== 'undefined') {
            plumbingGenerator.setVisibility(false);
        }
    }
}

// Toggle vista explosiva
function toggleExplode() {
    toggleExplodeView();
    const btn = document.getElementById('explodeBtn');
    
    if (isExploded) {
        btn.style.background = 'var(--warning-color)';
        btn.innerHTML = '<span>📥</span> Vista Normal';
    } else {
        btn.style.background = 'var(--primary-color)';
        btn.innerHTML = '<span>📤</span> Vista Explosiva';
    }
    
    // ✨ Activar/desactivar etiquetas explosivas
    if (typeof explodeLabelsManager !== 'undefined') {
        explodeLabelsManager.toggle(isExploded);
    }
}

// ============================================================================
// 🆕 NUEVA FUNCIONALIDAD: TRANSPARENCIA PARA VER FIERROS
// ============================================================================

// Variable global para controlar estado de transparencia
let isTransparent = false;

// Toggle transparencia de concreto para ver enfierradura
function toggleTransparency() {
    isTransparent = !isTransparent;
    const opacity = isTransparent ? 0.3 : 1.0;
    
    // ✨ Mostrar/ocultar enfierradura al activar/desactivar transparencia
    if (typeof reinforcementGenerator !== 'undefined') {
        reinforcementGenerator.setVisibility(isTransparent);
    }
    
    // Recorrer todos los objetos del edificio
    buildingGroup.traverse((object) => {
        if (object.isMesh) {
            const type = object.userData.componentType;
            
            // Solo hacer transparente el concreto (NO los fierros)
            if (type === 'foundation' || type === 'columns' || 
                type === 'beams' || type === 'slabs' || 
                type === 'walls' || type === 'roof' || type === 'stairs') {
                
                object.material.transparent = true;
                object.material.opacity = opacity;
                object.material.depthWrite = !isTransparent; // Importante para transparencias
                object.material.needsUpdate = true;
            }
        }
    });
    
    // Actualizar botón
    const btn = document.getElementById('transparencyBtn');
    if (btn) {
        if (isTransparent) {
            btn.style.background = 'var(--warning-color)';
            btn.innerHTML = '<span>🔲</span> Concreto Sólido';
        } else {
            btn.style.background = 'var(--primary-color)';
            btn.innerHTML = '<span>👁️</span> Ver Fierros';
        }
    }
    
    console.log(`👁️ Concreto ${isTransparent ? 'transparente - Fierros visibles' : 'sólido'}`);
}

// ============================================================================
// 🆕 NUEVA FUNCIONALIDAD: TUBERÍAS DE ALCANTARILLADO
// ============================================================================

// Variable global para controlar estado de tuberías
let plumbingVisible = false;

// Toggle visibilidad de tuberías
function togglePlumbing() {
    if (typeof plumbingGenerator === 'undefined') {
        console.warn('⚠️ Sistema de tuberías no disponible');
        return;
    }
    
    plumbingVisible = !plumbingVisible;
    plumbingGenerator.setVisibility(plumbingVisible);
    
    // Actualizar botón
    const btn = document.getElementById('plumbingBtn');
    if (btn) {
        if (plumbingVisible) {
            btn.style.background = 'var(--info-color)';
            btn.innerHTML = '<span>🚫</span> Ocultar Tuberías';
        } else {
            btn.style.background = 'var(--primary-color)';
            btn.innerHTML = '<span>🚰</span> Ver Tuberías';
        }
    }
    
    console.log(`🚰 Tuberías ${plumbingVisible ? 'visibles' : 'ocultas'}`);
}

// ============================================================================
// FIN DE NUEVAS FUNCIONALIDADES
// ============================================================================

// Inicializar controles
function initControls() {
    // Botones de edificio
    document.querySelectorAll('.building-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = parseInt(btn.dataset.levels);
            changeBuildingLevel(level);
        });
    });
    
    // Botón de vista explosiva
    document.getElementById('explodeBtn').addEventListener('click', toggleExplode);
    
    // Botón de resetear vista
    document.getElementById('resetViewBtn').addEventListener('click', resetCameraView);
    
    // Botón de etiquetas
    document.getElementById('labelsBtn').addEventListener('click', toggleLabels);
    
    // 🆕 Botón de transparencia para ver fierros
    const transparencyBtn = document.getElementById('transparencyBtn');
    if (transparencyBtn) {
        transparencyBtn.addEventListener('click', toggleTransparency);
    }
    
    // 🆕 Botón de tuberías
    const plumbingBtn = document.getElementById('plumbingBtn');
    if (plumbingBtn) {
        plumbingBtn.addEventListener('click', togglePlumbing);
    }
    
    // Cerrar panel de información
    document.getElementById('closePanelBtn').addEventListener('click', closeInfoPanel);
    
    // Cerrar panel al hacer click fuera
    document.addEventListener('click', (e) => {
        const infoPanel = document.getElementById('infoPanel');
        if (infoPanel.classList.contains('active') && 
            !infoPanel.contains(e.target) && 
            !e.target.closest('.component-item')) {
            closeInfoPanel();
        }
    });
}

// Shortcuts de teclado
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case '1':
                changeBuildingLevel(1);
                break;
            case '2':
                changeBuildingLevel(2);
                break;
            case '3':
                changeBuildingLevel(3);
                break;
            case 'e':
            case 'E':
                toggleExplode();
                break;
            case 'r':
            case 'R':
                resetCameraView();
                break;
            case 'l':
            case 'L':
                toggleLabels();
                break;
            case 't':
            case 'T':
                toggleTransparency(); // 🆕 Atajo de teclado T
                break;
            case 'p':
            case 'P':
                togglePlumbing(); // 🆕 Atajo de teclado P
                break;
            case 'Escape':
                closeInfoPanel();
                break;
        }
    });
}

// Información de ayuda
function showHelpInfo() {
    const shortcuts = [
        { key: '1, 2, 3', action: 'Cambiar niveles de edificio' },
        { key: 'E', action: 'Vista explosiva' },
        { key: 'R', action: 'Resetear cámara' },
        { key: 'L', action: 'Mostrar/ocultar etiquetas' },
        { key: 'T', action: 'Ver fierros (transparencia)' },
        { key: 'P', action: 'Ver tuberías' }, // 🆕
        { key: 'ESC', action: 'Cerrar panel' }
    ];
    
    console.log('⌨️ Atajos de teclado disponibles:');
    shortcuts.forEach(shortcut => {
        console.log(`  ${shortcut.key}: ${shortcut.action}`);
    });
}

console.log('✅ Módulo de controles cargado');