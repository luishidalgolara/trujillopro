function generateIsometricNivel2() {
    try {
        const elementosNivel2 = obtenerElementosNivel2();
        const conexionesNivel2 = CONEXIONES_NIVEL_2;
        
        if (elementosNivel2.length === 0) {
            showStatus('⚠️ No hay artefactos en 2° nivel para isométrico');
            return;
        }
        if (conexionesNivel2.length === 0) {
            showStatus('⚠️ Genera primero el trazado del 2° nivel');
            return;
        }

        showStatus('⚡ Generando vista isométrica 2° NIVEL...');
        const isometricSVG = window.isometricNivel2Generator.generateIsometricFromTracing(
            elementosNivel2,
            conexionesNivel2,
            `ISOMÉTRICO 2° NIVEL`,
            `1:${plans[currentPlanIndex].tracingScale}`
        );
        showIsometricWindowNivel2(isometricSVG);
        showStatus('✅ Vista isométrica 2° NIVEL generada');
    } catch (error) {
        console.error('Error generando isométrico nivel 2:', error);
        showStatus('❌ Error generando isométrico 2° nivel: ' + error.message);
    }
}

function showIsometricWindowNivel2(svgContent) {
    if (window.isometricNivel2Generator.isWindowOpen) {
        closeIsometricWindowNivel2();
    }

    const windowDiv = document.createElement('div');
    windowDiv.id = 'isometricWindowNivel2';
    windowDiv.className = 'isometric-window-nivel2';
    windowDiv.innerHTML = `
        <div class="isometric-header-nivel2">
            <div class="isometric-title"><span>🔴 Vista Isométrica 2° NIVEL</span></div>
            <div class="isometric-controls">
                <div class="scale-controls">
                    <button class="scale-btn" onclick="adjustIsometricScaleNivel2(-0.2)">🔍-</button>
                    <span class="scale-display" id="scaleDisplayN2">100%</span>
                    <button class="scale-btn" onclick="adjustIsometricScaleNivel2(0.2)">🔍+</button>
                </div>
                <div class="text-controls">
                    <button class="text-btn" onclick="adjustTextScaleNivel2(-0.2)">T-</button>
                    <span class="text-display" id="textDisplayN2">100%</span>
                    <button class="text-btn" onclick="adjustTextScaleNivel2(0.2)">T+</button>
                </div>
                <button class="isometric-btn" onclick="toggleIsometricIntegrationNivel2()" id="integrationBtnN2">📌 Integrar</button>
                <button class="isometric-btn" onclick="exportIsometricSVGNivel2()">💾 Exportar</button>
                <button class="isometric-btn minimize" onclick="minimizeIsometricWindowNivel2()">➖</button>
                <button class="isometric-btn close" onclick="closeIsometricWindowNivel2()">❌</button>
            </div>
        </div>
        <div class="isometric-content-nivel2" id="isometricContentNivel2">${svgContent}</div>
        <div class="isometric-resize-handle-nivel2" onmousedown="startResizeIsometricNivel2(event)"></div>
    `;
    document.body.appendChild(windowDiv);
    
    // ⭐ AGREGAR EVENT LISTENER PARA Z-INDEX MANAGER
    windowDiv.addEventListener('contextmenu', function(e) {
        console.log('🎯 Contextmenu en ventana isométrica Nivel 2');
        // No hacer preventDefault aquí - dejar que ZIndexContextMenu lo maneje
    });
    
    setTimeout(() => {
        const svgElement = windowDiv.querySelector('#isometricSVGNivel2');
        if (svgElement) {
            window.isometricNivel2Generator.setupLabelManipulation(svgElement);
        }
    }, 100);
    
    makeIsometricWindowDraggableNivel2(windowDiv);
    window.isometricNivel2Generator.isWindowOpen = true;
    window.isometricNivel2Generator.windowElement = windowDiv;
    window.isometricNivel2Generator.currentSVG = svgContent;
}

function adjustIsometricScaleNivel2(delta) {
    const generator = window.isometricNivel2Generator;
    generator.currentScale = Math.max(generator.minScale, Math.min(generator.maxScale, generator.currentScale + delta));
    const scaleDisplay = document.getElementById('scaleDisplayN2');
    if (scaleDisplay) {
        scaleDisplay.textContent = `${Math.round(generator.currentScale * 100)}%`;
    }
    regenerateIsometricNivel2();
    showStatus(`Escala 2° nivel ajustada: ${Math.round(generator.currentScale * 100)}%`);
}

function adjustTextScaleNivel2(delta) {
    const generator = window.isometricNivel2Generator;
    generator.textScale = Math.max(0.5, Math.min(2.0, generator.textScale + delta));
    const textDisplay = document.getElementById('textDisplayN2');
    if (textDisplay) {
        textDisplay.textContent = `${Math.round(generator.textScale * 100)}%`;
    }
    regenerateIsometricNivel2();
    showStatus(`Texto 2° nivel ajustado: ${Math.round(generator.textScale * 100)}%`);
}

function regenerateIsometricNivel2() {
    const generator = window.isometricNivel2Generator;
    try {
        const elementosNivel2 = obtenerElementosNivel2();
        const conexionesNivel2 = CONEXIONES_NIVEL_2;
        
        const newSVG = generator.generateIsometricFromTracing(
            elementosNivel2,
            conexionesNivel2,
            `ISOMÉTRICO 2° NIVEL`,
            `1:${plans[currentPlanIndex].tracingScale}`
        );
        generator.currentSVG = newSVG;
        
        const contentDiv = document.getElementById('isometricContentNivel2');
        if (contentDiv) {
            contentDiv.innerHTML = newSVG;
            setTimeout(() => {
                const svgElement = contentDiv.querySelector('#isometricSVGNivel2');
                if (svgElement) {
                    generator.setupLabelManipulation(svgElement);
                }
            }, 100);
        }
    } catch (error) {
        console.error('Error regenerando isométrico nivel 2:', error);
        showStatus('Error actualizando isométrico 2° nivel');
    }
}

function closeIsometricWindowNivel2() {
    const window_elem = document.getElementById('isometricWindowNivel2');
    if (window_elem) window_elem.remove();
    window.isometricNivel2Generator.isWindowOpen = false;
    window.isometricNivel2Generator.windowElement = null;
}

function minimizeIsometricWindowNivel2() {
    const window_elem = document.getElementById('isometricWindowNivel2');
    if (window_elem) window_elem.classList.toggle('minimized');
}

function exportIsometricSVGNivel2() {
    if (!window.isometricNivel2Generator.currentSVG) {
        showStatus('No hay contenido para exportar');
        return;
    }
    const blob = new Blob([window.isometricNivel2Generator.currentSVG], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isometrico_nivel2_${new Date().toISOString().slice(0,10)}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Isométrico 2° nivel exportado');
}

function makeIsometricWindowDraggableNivel2(windowDiv) {
    const header = windowDiv.querySelector('.isometric-header-nivel2');
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

function startResizeIsometricNivel2(e) {
    e.preventDefault();
    const windowDiv = document.getElementById('isometricWindowNivel2');
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

window.generateIsometricNivel2 = generateIsometricNivel2;

console.log('✅ Isométrico Nivel 2 - UI cargado');