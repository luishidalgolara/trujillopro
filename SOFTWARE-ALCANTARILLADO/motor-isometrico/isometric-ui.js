function generateIsometric() {
    try {
        const currentPlan = plans[currentPlanIndex];
        
        if (!currentPlan.tracingElements || currentPlan.tracingElements.length === 0) {
            showStatus('⚠️ Genera primero un trazado antes de crear el isométrico');
            return;
        }
        if (!currentPlan.tracingConnections || currentPlan.tracingConnections.length === 0) {
            showStatus('⚠️ No hay conexiones en el trazado para crear isométrico');
            return;
        }

        showStatus('⚡ Generando vista isométrica profesional optimizada...');
        const isometricSVG = window.isometricGenerator.generateIsometricFromTracing(
            currentPlan.tracingElements,
            currentPlan.tracingConnections,
            `ISOMÉTRICO - ${currentPlan.title}`,
            `1:${currentPlan.tracingScale}`
        );
        showIsometricWindow(isometricSVG);
        showStatus('✅ Vista isométrica profesional generada');
    } catch (error) {
        console.error('Error generando isométrico:', error);
        showStatus('❌ Error generando isométrico: ' + error.message);
    }
}

function showIsometricWindow(svgContent) {
    if (window.isometricGenerator.isWindowOpen) {
        closeIsometricWindow();
    }

    const labelPositions = {};
    const integratedContainer = document.getElementById('integratedIsometric');
    if (integratedContainer) {
        const labels = integratedContainer.querySelectorAll('[data-label-id]');
        labels.forEach(label => {
            const labelId = label.getAttribute('data-label-id');
            const transform = label.getAttribute('transform') || 'translate(0,0)';
            const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
            if (match && labelId) {
                labelPositions[labelId] = { x: parseFloat(match[1]), y: parseFloat(match[2]) };
            }
        });
    }

    const windowDiv = document.createElement('div');
    windowDiv.id = 'isometricWindow';
    windowDiv.className = 'isometric-window';
    windowDiv.innerHTML = `
        <div class="isometric-header">
            <div class="isometric-title"><span>🎯 Vista Isométrica Profesional</span></div>
            <div class="isometric-controls">
                <div class="scale-controls">
                    <button class="scale-btn" onclick="adjustIsometricScale(-0.2)">🔍-</button>
                    <span class="scale-display" id="scaleDisplay">100%</span>
                    <button class="scale-btn" onclick="adjustIsometricScale(0.2)">🔍+</button>
                </div>
                <div class="text-controls">
                    <button class="text-btn" onclick="adjustTextScale(-0.2)">T-</button>
                    <span class="text-display" id="textDisplay">100%</span>
                    <button class="text-btn" onclick="adjustTextScale(0.2)">T+</button>
                </div>
                <button class="isometric-btn" onclick="toggleIsometricIntegration()" id="integrationBtn">📌 Integrar</button>
                <button class="isometric-btn" onclick="exportIsometricSVG()">💾 Exportar</button>
                <button class="isometric-btn minimize" onclick="minimizeIsometricWindow()">➖</button>
                <button class="isometric-btn close" onclick="closeIsometricWindow()">❌</button>
            </div>
        </div>
        <div class="isometric-content" id="isometricContent">${svgContent}</div>
        <div class="isometric-resize-handle" onmousedown="startResizeIsometric(event)"></div>
    `;
    document.body.appendChild(windowDiv);
    
    // ⭐ AGREGAR EVENT LISTENER PARA Z-INDEX MANAGER
    windowDiv.addEventListener('contextmenu', function(e) {
        console.log('🎯 Contextmenu en ventana isométrica Nivel 1');
        // No hacer preventDefault aquí - dejar que ZIndexContextMenu lo maneje
    });
    
    setTimeout(() => {
        const svgElement = windowDiv.querySelector('#isometricSVG');
        if (svgElement) {
            window.isometricGenerator.setupLabelManipulation(svgElement);
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
    
    makeIsometricWindowDraggable(windowDiv);
    window.isometricGenerator.isWindowOpen = true;
    window.isometricGenerator.windowElement = windowDiv;
    window.isometricGenerator.currentSVG = svgContent;
}

function adjustIsometricScale(delta) {
    const generator = window.isometricGenerator;
    generator.currentScale = Math.max(generator.minScale, Math.min(generator.maxScale, generator.currentScale + delta));
    const scaleDisplay = document.getElementById('scaleDisplay');
    if (scaleDisplay) {
        scaleDisplay.textContent = `${Math.round(generator.currentScale * 100)}%`;
    }
    regenerateIsometric();
    showStatus(`Escala ajustada: ${Math.round(generator.currentScale * 100)}%`);
}

function adjustTextScale(delta) {
    const generator = window.isometricGenerator;
    generator.textScale = Math.max(0.5, Math.min(2.0, generator.textScale + delta));
    const textDisplay = document.getElementById('textDisplay');
    if (textDisplay) {
        textDisplay.textContent = `${Math.round(generator.textScale * 100)}%`;
    }
    regenerateIsometric();
    showStatus(`Texto ajustado: ${Math.round(generator.textScale * 100)}%`);
}

function closeIsometricWindow() {
    const window_elem = document.getElementById('isometricWindow');
    if (window_elem) window_elem.remove();
    window.isometricGenerator.isWindowOpen = false;
    window.isometricGenerator.windowElement = null;
}

function minimizeIsometricWindow() {
    const window_elem = document.getElementById('isometricWindow');
    if (window_elem) window_elem.classList.toggle('minimized');
}

function exportIsometricSVG() {
    if (!window.isometricGenerator.currentSVG) {
        showStatus('No hay contenido para exportar');
        return;
    }
    const blob = new Blob([window.isometricGenerator.currentSVG], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isometrico_profesional_${new Date().toISOString().slice(0,10)}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Isométrico exportado');
}

function makeIsometricWindowDraggable(windowDiv) {
    const header = windowDiv.querySelector('.isometric-header');
    let isDragging = false, startX, startY, startLeft, startTop;
    header.addEventListener('mousedown', function(e) {
        if (e.target.closest('.isometric-controls')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = windowDiv.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        header.style.cursor = 'grabbing';
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            windowDiv.style.left = (startLeft + e.clientX - startX) + 'px';
            windowDiv.style.top = (startTop + e.clientY - startY) + 'px';
        }
        function handleMouseUp() {
            isDragging = false;
            header.style.cursor = 'grab';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

function startResizeIsometric(e) {
    e.preventDefault();
    const windowDiv = document.getElementById('isometricWindow');
    const startX = e.clientX, startY = e.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(windowDiv).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(windowDiv).height, 10);
    function handleMouseMove(e) {
        windowDiv.style.width = Math.max(500, startWidth + e.clientX - startX) + 'px';
        windowDiv.style.height = Math.max(400, startHeight + e.clientY - startY) + 'px';
    }
    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

console.log('Motor Isométrico - UI cargado');