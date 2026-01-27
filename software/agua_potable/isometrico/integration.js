// isometrico/integration.js - CORREGIDO PARA LEER CONEXIONES ACTUALIZADAS
async function toggleIsometricIntegration() {
    const generator = window.isometricGenerator;
    const integrationBtn = document.getElementById('integrationBtn');
    const { showStatus } = await import('../js/utils.js');
    
    if (generator.isIntegrated) {
        showIsometricWindow(generator.currentSVG);
        generator.isIntegrated = false;
        integrationBtn.textContent = '📌 Integrar';
        showStatus('Isométrico en ventana flotante');
    } else {
        await integrateIsometricIntoDrawing();
        generator.isIntegrated = true;
        integrationBtn.textContent = '🪟 Flotante';
        showStatus('Isométrico integrado en el plano');
    }
}

async function integrateIsometricIntoDrawing() {
    const drawingBoard = document.getElementById('plano');
    const generator = window.isometricGenerator;
    const { showStatus } = await import('../js/utils.js');
    
    if (!drawingBoard) {
        showStatus('❌ No se encontró el área de dibujo');
        return;
    }
    
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
    
    let integratedContainer = document.getElementById('integratedIsometric');
    if (integratedContainer) integratedContainer.remove();
    
    integratedContainer = document.createElement('div');
    integratedContainer.id = 'integratedIsometric';
    integratedContainer.className = 'integrated-isometric';
    integratedContainer.setAttribute('data-locked', 'false');
    
    integratedContainer.style.cssText = `
        position: absolute;
        top: 50px;
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
        background: rgba(0, 0, 0, 0.8);
        padding: 4px 8px;
        border-radius: 6px;
        z-index: 101;
    `;
    controls.innerHTML = `
        <button onclick="toggleLockIntegratedIsometric()" id="lockIsometricBtn" title="Fijar posición" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">🔓</button>
        <button onclick="resizeIntegratedIsometric('smaller')" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">-</button>
        <button onclick="resizeIntegratedIsometric('bigger')" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">+</button>
        <button onclick="removeIntegratedIsometric()" style="background: #ff4444; border: none; color: #fff; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: bold;">×</button>
    `;
    
    const dragHandle = document.createElement('div');
    dragHandle.id = 'isometricDragHandle';
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
    resizeHandle.id = 'isometricResizeHandle';
    resizeHandle.style.cssText = `
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.6);
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
    
    const parentContainer = drawingBoard.parentElement;
    parentContainer.style.position = 'relative';
    parentContainer.appendChild(integratedContainer);
    
    integratedContainer.addEventListener('mouseenter', () => {
        controls.style.display = 'flex';
        const isLocked = integratedContainer.getAttribute('data-locked') === 'true';
        if (!isLocked) {
            resizeHandle.style.opacity = '1';
        }
        svgContainer.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2)';
        svgContainer.style.border = '1px dashed rgba(0, 212, 255, 0.4)';
    });
    
    integratedContainer.addEventListener('mouseleave', () => {
        controls.style.display = 'none';
        resizeHandle.style.opacity = '0';
        svgContainer.style.boxShadow = 'none';
        svgContainer.style.border = 'none';
    });
    
    makeIntegratedIsometricDraggable(integratedContainer, dragHandle);
    makeIntegratedIsometricResizable(integratedContainer, resizeHandle);
    
    closeIsometricWindow();
    
    setTimeout(() => {
        const svgElement = svgContainer.querySelector('#isometricSVG');
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
    }, 100);
}

async function toggleLockIntegratedIsometric() {
    const container = document.getElementById('integratedIsometric');
    const lockBtn = document.getElementById('lockIsometricBtn');
    const dragHandle = document.getElementById('isometricDragHandle');
    const resizeHandle = document.getElementById('isometricResizeHandle');
    const { showStatus } = await import('../js/utils.js');
    
    if (!container || !lockBtn) return;
    
    const isLocked = container.getAttribute('data-locked') === 'true';
    
    if (isLocked) {
        container.setAttribute('data-locked', 'false');
        lockBtn.textContent = '🔓';
        lockBtn.title = 'Fijar posición';
        container.style.cursor = 'move';
        dragHandle.style.pointerEvents = 'auto';
        resizeHandle.style.pointerEvents = 'auto';
        showStatus('Isométrico desbloqueado');
    } else {
        container.setAttribute('data-locked', 'true');
        lockBtn.textContent = '🔒';
        lockBtn.title = 'Desbloquear posición';
        container.style.cursor = 'default';
        dragHandle.style.pointerEvents = 'none';
        resizeHandle.style.pointerEvents = 'none';
        resizeHandle.style.opacity = '0';
        showStatus('Isométrico bloqueado');
    }
}

function makeIntegratedIsometricDraggable(container, handle) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    handle.addEventListener('mousedown', function(e) {
        const isLocked = container.getAttribute('data-locked') === 'true';
        if (isLocked || e.target.tagName === 'BUTTON') return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = container.getBoundingClientRect();
        const boardRect = container.parentElement.getBoundingClientRect();
        startLeft = rect.left - boardRect.left;
        startTop = rect.top - boardRect.top;
        
        container.style.cursor = 'grabbing';
        e.preventDefault();
        e.stopPropagation();
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            let newLeft = startLeft + deltaX;
            let newTop = startTop + deltaY;
            
            container.style.left = newLeft + 'px';
            container.style.top = newTop + 'px';
            container.style.right = 'auto';
        }
        
        function handleMouseUp() {
            isDragging = false;
            container.style.cursor = 'move';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

function makeIntegratedIsometricResizable(container, handle) {
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
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

function resizeIntegratedIsometric(action) {
    const container = document.getElementById('integratedIsometric');
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
}

async function removeIntegratedIsometric() {
    const container = document.getElementById('integratedIsometric');
    const { showStatus } = await import('../js/utils.js');
    if (container) {
        container.remove();
        window.isometricGenerator.isIntegrated = false;
        showStatus('Isométrico removido del plano');
    }
}

async function regenerateIsometric() {
    const generator = window.isometricGenerator;
    const { showStatus } = await import('../js/utils.js');
    
    try {
        // ✅ CORREGIDO: Leer directamente de window en lugar de import
        const elements = window.elements || [];
        const connections = window.connections || [];
        
        if (!elements || elements.length === 0) {
            showStatus('⚠️ No hay elementos para regenerar isométrico');
            return;
        }
        
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
        
        const newSVG = generator.generateIsometricFromTracing(
            elements,
            connections,
            'ISOMÉTRICO - AGUA POTABLE',
            '1:50'
        );
        generator.currentSVG = newSVG;
        
        const updateContainer = (container) => {
            if (container) {
                container.innerHTML = newSVG;
                setTimeout(() => {
                    const svgElement = container.querySelector('#isometricSVG');
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
            const integratedContainer = document.getElementById('integratedIsometric');
            if (integratedContainer) {
                const svgContainer = integratedContainer.querySelector('div');
                updateContainer(svgContainer);
            }
        } else {
            updateContainer(document.getElementById('isometricContent'));
        }
    } catch (error) {
        console.error('Error regenerando isométrico:', error);
        showStatus('Error actualizando isométrico');
    }
}

console.log('✅ Motor Isométrico - Integration cargado');