// isometrico/ui.js - CORREGIDO PARA FILTRAR SOLO NIVEL 1 Y EXCLUIR CONEXIONES VIRTUALES

async function generateIsometric() {
    try {
        const { elements, connections } = await import('../js/config.js');
        const { showStatus } = await import('../js/utils.js');
        
        const elementosNivel1 = elements.filter(el => !el.nivel || el.nivel === 1);
        const conexionesNivel1 = connections.filter(conn => 
            (!conn.from.nivel || conn.from.nivel === 1) && 
            (!conn.to.nivel || conn.to.nivel === 1) &&
            !conn.isVirtual
        );
        
        if (!elementosNivel1 || elementosNivel1.length === 0) {
            showStatus('⚠️ Coloca elementos de nivel 1 en el plano antes de crear el isométrico');
            return;
        }
        if (!conexionesNivel1 || conexionesNivel1.length === 0) {
            showStatus('⚠️ Genera primero un trazado MST de nivel 1 antes de crear el isométrico');
            return;
        }

        showStatus('⚡ Generando vista isométrica profesional NIVEL 1...');
        const isometricSVG = window.isometricGenerator.generateIsometricFromTracing(
            elementosNivel1,
            conexionesNivel1,
            'ISOMÉTRICO NIVEL 1 - AGUA POTABLE',
            '1:50'
        );
        showIsometricWindow(isometricSVG);
        showStatus('✅ Vista isométrica NIVEL 1 generada');
    } catch (error) {
        console.error('Error generando isométrico:', error);
        alert('❌ Error generando isométrico: ' + error.message);
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
    
    const style = document.createElement('style');
    style.textContent = `
        .isometric-window {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 900px;
            height: 700px;
            background: white;
            border: 2px solid #2c3e50;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            overflow: visible;
        }
        .isometric-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: grab;
            user-select: none;
        }
        .isometric-header:active {
            cursor: grabbing;
        }
        .isometric-title {
            font-size: 16px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .isometric-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .scale-controls, .text-controls {
            display: flex;
            gap: 4px;
            align-items: center;
            background: rgba(255,255,255,0.2);
            padding: 4px 8px;
            border-radius: 6px;
        }
        .scale-display, .text-display {
            min-width: 45px;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
        }
        .scale-btn, .text-btn {
            background: rgba(255,255,255,0.3);
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            color: white;
            transition: all 0.2s;
        }
        .scale-btn:hover, .text-btn:hover {
            background: rgba(255,255,255,0.5);
            transform: scale(1.05);
        }
        .isometric-btn {
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.2s;
        }
        .isometric-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-1px);
        }
        .isometric-btn.minimize {
            background: rgba(241, 196, 15, 0.3);
        }
        .isometric-btn.close {
            background: rgba(231, 76, 60, 0.3);
        }
        .isometric-content {
            flex: 1;
            overflow: visible;
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        .isometric-resize-handle {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, transparent 50%, #667eea 50%);
            cursor: nwse-resize;
            border-bottom-right-radius: 12px;
        }
        .isometric-window.minimized {
            height: 52px;
        }
        .isometric-window.minimized .isometric-content,
        .isometric-window.minimized .isometric-resize-handle {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(windowDiv);
    
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

async function adjustIsometricScale(delta) {
    const generator = window.isometricGenerator;
    generator.currentScale = Math.max(generator.minScale, Math.min(generator.maxScale, generator.currentScale + delta));
    const scaleDisplay = document.getElementById('scaleDisplay');
    if (scaleDisplay) {
        scaleDisplay.textContent = `${Math.round(generator.currentScale * 100)}%`;
    }
    await regenerateIsometric();
    const { showStatus } = await import('../js/utils.js');
    showStatus(`Escala ajustada: ${Math.round(generator.currentScale * 100)}%`);
}

async function adjustTextScale(delta) {
    const generator = window.isometricGenerator;
    generator.textScale = Math.max(0.5, Math.min(2.0, generator.textScale + delta));
    const textDisplay = document.getElementById('textDisplay');
    if (textDisplay) {
        textDisplay.textContent = `${Math.round(generator.textScale * 100)}%`;
    }
    await regenerateIsometric();
    const { showStatus } = await import('../js/utils.js');
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

async function exportIsometricSVG() {
    if (!window.isometricGenerator.currentSVG) {
        const { showStatus } = await import('../js/utils.js');
        showStatus('No hay contenido para exportar');
        return;
    }
    const blob = new Blob([window.isometricGenerator.currentSVG], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isometrico_agua_potable_${new Date().toISOString().slice(0,10)}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    const { showStatus } = await import('../js/utils.js');
    showStatus('✅ Isométrico exportado');
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
            windowDiv.style.transform = 'none';
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

console.log('✅ Motor Isométrico - UI cargado');