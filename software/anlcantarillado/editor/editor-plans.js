// editor/editor-plans.js
// ================================
// EDITOR PLANS
// Sistema de gestión de planos
// ================================

function agregarNuevoPlano() {
    const nuevoPlanoId = plans.length;
    const nuevoPlano = {
        id: nuevoPlanoId,
        title: `Plano ${nuevoPlanoId + 1}`,
        format: currentFormat,
        mainTitle: 'NUEVO PROYECTO',
        subtitle: 'Descripción del plano',
        svgs: [],
        northRotation: 0,
        titlePosition: { x: 30, y: 30 },
        subtitlePosition: { x: 30, y: 70 },
        northPosition: { x: null, y: 30 },
        tracingElements: [],
        tracingConnections: [],
        tracingScale: 50,
        tracingMode: false,
        currentTool: null,
        pdfBackground: null
    };
    
    plans.push(nuevoPlano);
    actualizarPanelPlanos();
    cambiarAPlano(nuevoPlanoId);
    
    showStatus(`✅ Nuevo plano creado: ${nuevoPlano.title}`);
}

function cambiarAPlano(indicePlano) {
    if (indicePlano >= 0 && indicePlano < plans.length) {
        guardarEstadoPlanoActual();
        currentPlanIndex = indicePlano;
        cargarPlanoActual();
        actualizarPanelPlanos();
        
        showStatus(`📋 Cambiado a: ${plans[indicePlano].title}`);
    }
}

function guardarEstadoPlanoActual() {
    const planoActual = plans[currentPlanIndex];
    
    planoActual.format = currentFormat;
    planoActual.tracingMode = isNavigationMode;
    
    const bgRect = document.getElementById('pdfBackground');
    if (bgRect && planoActual.pdfBackground) {
        planoActual.pdfBackground.x = parseFloat(bgRect.getAttribute('x'));
        planoActual.pdfBackground.y = parseFloat(bgRect.getAttribute('y'));
        planoActual.pdfBackground.width = parseFloat(bgRect.getAttribute('width'));
        planoActual.pdfBackground.height = parseFloat(bgRect.getAttribute('height'));
    }
}

function cargarPlanoActual() {
    const planoActual = plans[currentPlanIndex];
    
    currentFormat = planoActual.format;
    changeFormat(currentFormat);
    
    loadedSVGs = [...planoActual.svgs];
    
    loadedSVGs.forEach(svg => {
        window.EditorLoaders.agregarSVGAlTablero(svg.content, svg.name, svg.id);
    });
    
    if (typeof clearTracingSVG === 'function') {
        clearTracingSVG();
    }
    
    if (typeof createTracingSVGElement === 'function') {
        planoActual.tracingElements.forEach(element => {
            createTracingSVGElement(element);
        });
    }
    
    if (typeof createTracingConnectionVisual === 'function') {
        planoActual.tracingConnections.forEach(conn => {
            createTracingConnectionVisual(conn.from, conn.to);
        });
    }
    
    if (planoActual.pdfBackground) {
        const bg = planoActual.pdfBackground;
        window.EditorLoaders.agregarFondoPDF(bg.imageData, bg.width, bg.height);
        
        setTimeout(() => {
            const bgRect = document.getElementById('pdfBackground');
            const resizeHandle = document.getElementById('resizeHandle');
            
            if (bgRect && bg.x !== undefined && bg.y !== undefined) {
                bgRect.setAttribute('x', bg.x);
                bgRect.setAttribute('y', bg.y);
                
                if (resizeHandle) {
                    resizeHandle.setAttribute('cx', bg.x + bg.width);
                    resizeHandle.setAttribute('cy', bg.y + bg.height);
                }
            }
        }, 100);
    }
    
    isNavigationMode = planoActual.tracingMode;
    if (typeof updateModeButton === 'function') {
        updateModeButton();
    }
    if (typeof updateScaleButton === 'function') {
        updateScaleButton(planoActual.tracingScale);
    }
    
    zoomLevel = 1;
    const zoomContainer = document.getElementById('zoomContainer');
    if (zoomContainer) {
        zoomContainer.style.transform = `scale(${zoomLevel})`;
    }
    
    if (typeof reposicionarVinetaSegunFormato === 'function') {
        setTimeout(reposicionarVinetaSegunFormato, 150);
    }
    
    actualizarInfoPlano();
}

function actualizarInfoPlano() {
    // Función vacía - ya no actualiza la información de dimensiones
}

function actualizarPanelPlanos() {
    const listaPlan = document.getElementById('plansList');
    const contadorPlanos = document.getElementById('plansCounter');
    
    contadorPlanos.textContent = `Planos generados: ${plans.length}`;
    listaPlan.innerHTML = '';
    
    plans.forEach((plano, indice) => {
        const itemPlano = document.createElement('div');
        itemPlano.className = `plan-item ${indice === currentPlanIndex ? 'active' : ''}`;
        
        itemPlano.innerHTML = `
            <div class="plan-item-content" onclick="cambiarAPlano(${indice})">
                <div class="plan-item-title">📄 ${plano.title}</div>
                <div class="plan-item-info">${plano.format} • ${indice === currentPlanIndex ? 'Activo' : 'Inactivo'}</div>
            </div>
        `;
        
        listaPlan.appendChild(itemPlano);
    });
}

window.addNewPlan = agregarNuevoPlano;
window.switchToPlan = cambiarAPlano;
window.saveCurrentPlanState = guardarEstadoPlanoActual;
window.loadCurrentPlan = cargarPlanoActual;
window.updatePlanInfo = actualizarInfoPlano;
window.updatePlansPanel = actualizarPanelPlanos;

window.EditorPlans = {
    agregarNuevoPlano,
    cambiarAPlano,
    guardarEstadoPlanoActual,
    cargarPlanoActual,
    actualizarInfoPlano,
    actualizarPanelPlanos
};

console.log('✅ editor-plans.js cargado');