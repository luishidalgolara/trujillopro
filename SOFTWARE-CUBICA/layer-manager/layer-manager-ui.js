/* ========================================
   LAYER MANAGER - INTERFAZ VISUAL
   CON PESTAÑA SIEMPRE VISIBLE
   ======================================== */

function crearPanelCapas() {
    if (document.getElementById('layerManager')) return;
    
    const panelHTML = `
    <div class="layer-manager" id="layerManager">
        <!-- PESTAÑA SIEMPRE VISIBLE -->
        <div class="layer-manager-tab" onclick="toggleLayerPanel()">
            <div class="layer-manager-tab-icon">📑</div>
            <div class="layer-manager-tab-text">CAPAS</div>
        </div>
        
        <div class="layer-manager-header">
            <div class="layer-manager-title">
                <span>📋</span>
                <span>CAPAS</span>
            </div>
            <span class="layer-count-badge" id="layerCount">0</span>
        </div>
        
        <div class="layer-manager-content" id="layerContent">
            <ul class="layer-list" id="layerList">
                <!-- Capas generadas dinámicamente -->
            </ul>
        </div>
        
        <div class="layer-manager-footer">
            <button class="layer-footer-btn" onclick="mostrarTodasLasCapas()" title="Mostrar todas">
                👁️ Todo
            </button>
            <button class="layer-footer-btn" onclick="bloquearTodasLasCapas()" title="Bloquear todas">
                🔒 Todo
            </button>
            <button class="layer-footer-btn" onclick="actualizarListaCapas()" title="Actualizar">
                🔄
            </button>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    console.log('✅ Panel de capas creado');
}

function toggleLayerPanel() {
    const panel = document.getElementById('layerManager');
    if (panel) {
        panel.classList.toggle('open');
    }
}

function actualizarListaCapas() {
    console.log('🔄 Actualizando lista de capas...');
    
    // Recolectar todas las capas de los arrays globales
    const todasLasCapas = [];
    
    // RADIERES
    if (typeof radieres !== 'undefined') {
        radieres.forEach((item, index) => {
            todasLasCapas.push({
                id: item.id || `radier_${index}`,
                type: 'RADIER',
                name: item.nombre || `Radier ${index + 1}`,
                data: item,
                visible: item.visible !== false,
                locked: item.locked || false,
                zIndex: item.zIndex || 0,
                arrayIndex: index
            });
        });
    }
    
    // MUROS HORMIGÓN
    if (typeof murosHormigon !== 'undefined') {
        murosHormigon.forEach((item, index) => {
            todasLasCapas.push({
                id: item.id || `muro_hormigon_${index}`,
                type: 'MURO_HORMIGON',
                name: item.nombre || `Muro H ${index + 1}`,
                data: item,
                visible: item.visible !== false,
                locked: item.locked || false,
                zIndex: item.zIndex || 10,
                arrayIndex: index
            });
        });
    }
    
    // MUROS ALBAÑILERÍA
    if (typeof murosAlbanileria !== 'undefined') {
        murosAlbanileria.forEach((item, index) => {
            todasLasCapas.push({
                id: item.id || `muro_albanileria_${index}`,
                type: 'MURO_ALBANILERIA',
                name: item.nombre || `Muro A ${index + 1}`,
                data: item,
                visible: item.visible !== false,
                locked: item.locked || false,
                zIndex: item.zIndex || 10,
                arrayIndex: index
            });
        });
    }
    
    // TABIQUES
    if (typeof tabiques !== 'undefined') {
        tabiques.forEach((item, index) => {
            todasLasCapas.push({
                id: item.id || `tabique_${index}`,
                type: 'TABIQUE',
                name: item.nombre || `Tabique ${index + 1}`,
                data: item,
                visible: item.visible !== false,
                locked: item.locked || false,
                zIndex: item.zIndex || 10,
                arrayIndex: index
            });
        });
    }
    
    // MUROS ESTRUCTURALES
    if (typeof murosEstructurales !== 'undefined') {
        murosEstructurales.forEach((item, index) => {
            todasLasCapas.push({
                id: item.id || `muro_estructural_${index}`,
                type: 'MURO_ESTRUCTURAL',
                name: item.nombre || `Muro E ${index + 1}`,
                data: item,
                visible: item.visible !== false,
                locked: item.locked || false,
                zIndex: item.zIndex || 10,
                arrayIndex: index
            });
        });
    }
    
    // CUBIERTAS
    if (typeof cubiertas !== 'undefined') {
        cubiertas.forEach((item, index) => {
            todasLasCapas.push({
                id: item.id || `cubierta_${index}`,
                type: 'CUBIERTA',
                name: item.nombre || `Cubierta ${index + 1}`,
                data: item,
                visible: item.visible !== false,
                locked: item.locked || false,
                zIndex: item.zIndex || 20,
                arrayIndex: index
            });
        });
    }
    
    // Ordenar por zIndex (mayor arriba)
    todasLasCapas.sort((a, b) => b.zIndex - a.zIndex);
    
    layerManagerState.layers = todasLasCapas;
    
    console.log(`✅ ${todasLasCapas.length} capas encontradas`);
    
    // Renderizar
    renderizarListaCapas();
}

function renderizarListaCapas() {
    const lista = document.getElementById('layerList');
    const contador = document.getElementById('layerCount');
    
    if (!lista) return;
    
    const capas = layerManagerState.layers;
    
    // Actualizar contador
    if (contador) {
        contador.textContent = capas.length;
    }
    
    if (capas.length === 0) {
        lista.innerHTML = '<li style="padding: 20px; text-align: center; color: #95a5a6;">No hay capas</li>';
        return;
    }
    
    let html = '';
    
    capas.forEach((capa, index) => {
        const typeInfo = LAYER_TYPES[capa.type];
        const isActive = layerManagerState.activeLayer?.id === capa.id;
        const isFirst = index === 0;
        const isLast = index === capas.length - 1;
        
        html += `
        <li class="layer-item ${isActive ? 'active' : ''} ${capa.locked ? 'locked' : ''} ${!capa.visible ? 'hidden' : ''}" 
            data-layer-id="${capa.id}"
            onclick="seleccionarCapa('${capa.id}')">
            
            <div class="layer-icon">${typeInfo.icon}</div>
            
            <div class="layer-info">
                <div class="layer-name">${capa.name}</div>
                <div class="layer-type">${typeInfo.name}</div>
            </div>
            
            <div class="layer-order-controls">
                <button class="layer-order-btn" 
                        onclick="event.stopPropagation(); moverCapaArriba('${capa.id}')"
                        ${isFirst ? 'disabled' : ''}
                        title="Traer adelante">
                    ▲
                </button>
                <button class="layer-order-btn" 
                        onclick="event.stopPropagation(); moverCapaAbajo('${capa.id}')"
                        ${isLast ? 'disabled' : ''}
                        title="Enviar atrás">
                    ▼
                </button>
            </div>
            
            <div class="layer-controls">
                <button class="layer-btn layer-btn-visibility ${!capa.visible ? 'hidden' : ''}" 
                        onclick="event.stopPropagation(); toggleVisibilidadCapa('${capa.id}')"
                        title="${capa.visible ? 'Ocultar' : 'Mostrar'}">
                    ${capa.visible ? '👁️' : '🚫'}
                </button>
                
                <button class="layer-btn layer-btn-lock ${capa.locked ? 'locked' : ''}" 
                        onclick="event.stopPropagation(); toggleBloquearCapa('${capa.id}')"
                        title="${capa.locked ? 'Desbloquear' : 'Bloquear'}">
                    ${capa.locked ? '🔒' : '🔓'}
                </button>
            </div>
        </li>
        `;
    });
    
    lista.innerHTML = html;
}

function mostrarTodasLasCapas() {
    layerManagerState.layers.forEach(capa => {
        capa.visible = true;
        capa.data.visible = true;
    });
    renderizarListaCapas();
    redibujarCanvasGlobal();
}

function bloquearTodasLasCapas() {
    const todasBloqueadas = layerManagerState.layers.every(c => c.locked);
    
    layerManagerState.layers.forEach(capa => {
        capa.locked = !todasBloqueadas;
        capa.data.locked = !todasBloqueadas;
    });
    
    renderizarListaCapas();
}

window.crearPanelCapas = crearPanelCapas;
window.toggleLayerPanel = toggleLayerPanel;
window.actualizarListaCapas = actualizarListaCapas;
window.renderizarListaCapas = renderizarListaCapas;
window.mostrarTodasLasCapas = mostrarTodasLasCapas;
window.bloquearTodasLasCapas = bloquearTodasLasCapas;