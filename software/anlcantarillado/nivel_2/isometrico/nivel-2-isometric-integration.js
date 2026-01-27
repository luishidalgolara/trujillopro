function toggleIsometricIntegrationNivel2() {
    const generator = window.isometricNivel2Generator;
    const integrationBtn = document.getElementById('integrationBtnN2');
    if (generator.isIntegrated) {
        showIsometricWindowNivel2(generator.currentSVG);
        generator.isIntegrated = false;
        integrationBtn.textContent = '📌 Integrar';
        showStatus('Isométrico 2° nivel en ventana flotante');
    } else {
        integrateIsometricIntoDrawingNivel2();
        generator.isIntegrated = true;
        integrationBtn.textContent = '🪟 Flotante';
        showStatus('Isométrico 2° nivel integrado en el plano');
    }
}

function integrateIsometricIntoDrawingNivel2() {
    const zoomContainer = document.getElementById('zoomContainer');
    const generator = window.isometricNivel2Generator;
    
    const labelPositions = {};
    const labels = document.querySelectorAll('[data-label-id]');
    labels.forEach(label => {
        const labelId = label.getAttribute('data-label-id');
        const transform = label.getAttribute('transform') || 'translate(0,0)';
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        if (match && labelId) {
            labelPositions[labelId] = { x: parseFloat(match[1]), y: parseFloat(match[2]) };
        }
    });
    
    let integratedContainer = document.getElementById('integratedIsometricN2');
    if (integratedContainer) integratedContainer.remove();
    
    integratedContainer = document.createElement('div');
    integratedContainer.id = 'integratedIsometricN2';
    integratedContainer.className = 'integrated-isometric-nivel2';
    integratedContainer.setAttribute('data-locked', 'false');
    
    integratedContainer.style.cssText = `
        position: absolute;
        top: 450px;
        right: 50px;
        width: 350px;
        height: 250px;
        background: transparent;
        border: none;
        overflow: visible;
        z-index: 100;
        cursor: move;
        transition: box-shadow 0.3s ease;
    `;
    
    const svgContainer = document.createElement('div');
    svgContainer.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        border: none;
        transition: all 0.3s ease;
    `;
    svgContainer.innerHTML = generator.currentSVG;
    
    const controls = document.createElement('div');
    controls.style.cssText = `
        position: absolute;
        top: -30px;
        right: 0;
        display: none;
        gap: 4px;
        background: rgba(231, 76, 60, 0.9);
        padding: 4px 8px;
        border-radius: 6px;
        z-index: 101;
    `;
    controls.innerHTML = `
        <button onclick="toggleLockIntegratedIsometricNivel2()" id="lockIsometricBtnN2" title="Fijar posición" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">🔓</button>
        <button onclick="resizeIntegratedIsometricNivel2('smaller')" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">-</button>
        <button onclick="resizeIntegratedIsometricNivel2('bigger')" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">+</button>
        <button onclick="removeIntegratedIsometricNivel2()" style="background: #ff4444; border: none; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">×</button>
    `;
    
    const dragHandle = document.createElement('div');
    dragHandle.id = 'isometricDragHandleN2';
    dragHandle.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: move;
        z-index: 99;
    `;
    
    const resizeHandle = document.createElement('div');
    resizeHandle.id = 'isometricResizeHandleN2';
    resizeHandle.style.cssText = `
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        background: rgba(231, 76, 60, 0.6);
        border-radius: 50%;
        cursor: nwse-resize;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 102;
    `;
    
    integratedContainer.appendChild(svgContainer);
    integratedContainer.appendChild(controls);
    integratedContainer.appendChild(dragHandle);
    integratedContainer.appendChild(resizeHandle);
    zoomContainer.appendChild(integratedContainer);
    
    integratedContainer.addEventListener('mouseenter', () => {
        controls.style.display = 'flex';
        const isLocked = integratedContainer.getAttribute('data-locked') === 'true';
        if (!isLocked) {
            resizeHandle.style.opacity = '1';
        }
        svgContainer.style.boxShadow = '0 4px 20px rgba(231, 76, 60, 0.3)';
        svgContainer.style.border = '1px dashed rgba(231, 76, 60, 0.5)';
    });
    
    integratedContainer.addEventListener('mouseleave', () => {
        controls.style.display = 'none';
        resizeHandle.style.opacity = '0';
        svgContainer.style.boxShadow = 'none';
        svgContainer.style.border = 'none';
    });
    
    makeIntegratedIsometricDraggableNivel2(integratedContainer, dragHandle);
    makeIntegratedIsometricResizableNivel2(integratedContainer, resizeHandle);
    
    closeIsometricWindowNivel2();
    
    setTimeout(() => {
        const svgElement = svgContainer.querySelector('#isometricSVGNivel2');
        if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';
            svgElement.style.width = 'auto';
            svgElement.style.height = 'auto';
            
            generator.setupLabelManipulation(svgElement);
            
            Object.keys(labelPositions).forEach(labelId => {
                const label = svgElement.querySelector(`[data-label-id="${labelId}"]`);
                const guideLine = svgElement.querySelector(`#guide-line-${labelId}`);
                if (label && labelPositions[labelId]) {
                    const pos = labelPositions[labelId];
                    label.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
                    if (guideLine) {
                        guideLine.setAttribute('x2', pos.x);
                        guideLine.setAttribute('y2', pos.y);
                    }
                }
            });
        }
        
        // ⭐ GUARDADO AUTOMÁTICO
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            console.log('💾 Isométrico N2 guardado en plano actual');
        }
    }, 200);
}

function toggleLockIntegratedIsometricNivel2() {
    const container = document.getElementById('integratedIsometricN2');
    const lockBtn = document.getElementById('lockIsometricBtnN2');
    const dragHandle = document.getElementById('isometricDragHandleN2');
    const resizeHandle = document.getElementById('isometricResizeHandleN2');
    
    if (!container || !lockBtn) return;
    
    const isLocked = container.getAttribute('data-locked') === 'true';
    
    if (isLocked) {
        container.setAttribute('data-locked', 'false');
        lockBtn.textContent = '🔓';
        lockBtn.title = 'Fijar posición';
        container.style.cursor = 'move';
        dragHandle.style.pointerEvents = 'auto';
        resizeHandle.style.pointerEvents = 'auto';
        showStatus('Isométrico 2° nivel desbloqueado - puede moverse');
    } else {
        container.setAttribute('data-locked', 'true');
        lockBtn.textContent = '🔒';
        lockBtn.title = 'Desbloquear posición';
        container.style.cursor = 'default';
        dragHandle.style.pointerEvents = 'none';
        resizeHandle.style.pointerEvents = 'none';
        resizeHandle.style.opacity = '0';
        showStatus('Isométrico 2° nivel bloqueado en posición');
    }
    
    // ⭐ GUARDADO AUTOMÁTICO
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function makeIntegratedIsometricDraggableNivel2(container, handle) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    handle.addEventListener('mousedown', function(e) {
        const isLocked = container.getAttribute('data-locked') === 'true';
        if (isLocked || e.target.tagName === 'BUTTON') return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = container.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        container.style.cursor = 'grabbing';
        e.preventDefault();
        e.stopPropagation();
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newLeft = startLeft + deltaX;
            const newTop = startTop + deltaY;
            
            container.style.left = newLeft + 'px';
            container.style.top = newTop + 'px';
            container.style.right = 'auto';
        }
        
        function handleMouseUp() {
            isDragging = false;
            container.style.cursor = 'move';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            
            // ⭐ GUARDADO AUTOMÁTICO AL SOLTAR
            setTimeout(() => {
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                }
            }, 100);
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

function makeIntegratedIsometricResizableNivel2(container, handle) {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    
    handle.addEventListener('mousedown', function(e) {
        const isLocked = container.getAttribute('data-locked') === 'true';
        if (isLocked) return;
        
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(container.style.width);
        startHeight = parseInt(container.style.height);
        
        e.preventDefault();
        e.stopPropagation();
        
        function handleMouseMove(e) {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newWidth = Math.max(150, Math.min(800, startWidth + deltaX));
            const newHeight = Math.max(100, Math.min(600, startHeight + deltaY));
            
            container.style.width = newWidth + 'px';
            container.style.height = newHeight + 'px';
        }
        
        function handleMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            
            // ⭐ GUARDADO AUTOMÁTICO AL SOLTAR
            setTimeout(() => {
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                }
            }, 100);
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

function resizeIntegratedIsometricNivel2(action) {
    const container = document.getElementById('integratedIsometricN2');
    if (!container) return;
    
    const currentWidth = parseInt(container.style.width);
    const currentHeight = parseInt(container.style.height);
    
    if (action === 'bigger') {
        container.style.width = Math.min(800, currentWidth + 50) + 'px';
        container.style.height = Math.min(600, currentHeight + 50) + 'px';
    } else if (action === 'smaller') {
        container.style.width = Math.max(150, currentWidth - 50) + 'px';
        container.style.height = Math.max(100, currentHeight - 50) + 'px';
    }
    
    // ⭐ GUARDADO AUTOMÁTICO
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function removeIntegratedIsometricNivel2() {
    const container = document.getElementById('integratedIsometricN2');
    if (container) {
        container.remove();
        window.isometricNivel2Generator.isIntegrated = false;
        showStatus('Isométrico 2° nivel removido del plano');
        
        // ⭐ GUARDADO AUTOMÁTICO
        setTimeout(() => {
            if (window.PlaneManagerCoreAlc) {
                window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            }
        }, 100);
    }
}

function regenerateIsometricNivel2() {
    const generator = window.isometricNivel2Generator;
    try {
        const labelPositions = {};
        const labels = document.querySelectorAll('[data-label-id]');
        labels.forEach(label => {
            const labelId = label.getAttribute('data-label-id');
            const transform = label.getAttribute('transform') || 'translate(0,0)';
            const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
            if (match && labelId) {
                labelPositions[labelId] = { x: parseFloat(match[1]), y: parseFloat(match[2]) };
            }
        });
        
        const elementosNivel2 = obtenerElementosNivel2();
        const conexionesNivel2 = CONEXIONES_NIVEL_2;
        
        const newSVG = generator.generateIsometricFromTracing(
            elementosNivel2,
            conexionesNivel2,
            `ISOMÉTRICO 2° NIVEL`,
            `1:${plans[currentPlanIndex].tracingScale}`
        );
        generator.currentSVG = newSVG;
        
        const updateContainer = (container) => {
            if (container) {
                container.innerHTML = newSVG;
                setTimeout(() => {
                    const svgElement = container.querySelector('#isometricSVGNivel2');
                    if (svgElement) {
                        generator.setupLabelManipulation(svgElement);
                        Object.keys(labelPositions).forEach(labelId => {
                            const label = svgElement.querySelector(`[data-label-id="${labelId}"]`);
                            const guideLine = svgElement.querySelector(`#guide-line-${labelId}`);
                            if (label && labelPositions[labelId]) {
                                const pos = labelPositions[labelId];
                                label.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
                                if (guideLine) {
                                    guideLine.setAttribute('x2', pos.x);
                                    guideLine.setAttribute('y2', pos.y);
                                }
                            }
                        });
                    }
                }, 100);
            }
        };
        
        if (generator.isIntegrated) {
            const integratedContainer = document.getElementById('integratedIsometricN2');
            if (integratedContainer) {
                const svgContainer = integratedContainer.querySelector('div');
                updateContainer(svgContainer);
            }
        } else {
            updateContainer(document.getElementById('isometricContentNivel2'));
        }
    } catch (error) {
        console.error('Error regenerando isométrico 2° nivel:', error);
        showStatus('Error actualizando isométrico 2° nivel');
    }
}

window.toggleIsometricIntegrationNivel2 = toggleIsometricIntegrationNivel2;
window.regenerateIsometricNivel2 = regenerateIsometricNivel2;

console.log('✅ Isométrico Nivel 2 - Integration con GUARDADO AUTOMÁTICO cargado');