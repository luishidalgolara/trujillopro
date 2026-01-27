// ============================================================
// HANDLER TABLA NCh 2702 - INTEGRACIÓN CON PLANO
// Sistema de ventana flotante con resize y drag
// Versión mejorada con escalado proporcional y selección
// ============================================================

let tablaNch2702Window = null;
let tablaNch2702Iframe = null;
let tablaNch2702IsMinimized = false;
let tablaNch2702IsDragging = false;
let tablaNch2702IsResizing = false;
let tablaNch2702DragOffset = { x: 0, y: 0 };
let tablaNch2702ResizeStart = { x: 0, y: 0, width: 0, height: 0 };

function abrirTablaNch2702() {
    // Si ya existe, solo mostrarla
    if (tablaNch2702Window) {
        tablaNch2702Window.style.display = 'flex';
        if (tablaNch2702IsMinimized) {
            maximizarTablaNch2702();
        }
        return;
    }
    
    // Crear ventana flotante
    tablaNch2702Window = document.createElement('div');
    tablaNch2702Window.id = 'tablaNch2702Window';
    tablaNch2702Window.className = 'tabla-nch2702-window';
    tablaNch2702Window.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 920px;
        height: 400px;
        background: white;
        border: 1px solid #000;
        border-radius: 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        resize: both;
        min-width: 600px;
        min-height: 300px;
    `;
    
    // Header de la ventana
    const header = document.createElement('div');
    header.className = 'tabla-nch2702-header';
    header.style.cssText = `
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        color: white;
        padding: 8px 12px;
        cursor: grab;
        user-select: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 35px;
    `;
    
    const headerTitle = document.createElement('div');
    headerTitle.textContent = '📋 REQUISITOS CÁMARAS NCh 2702';
    headerTitle.style.cssText = `
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `;
    
    const headerButtons = document.createElement('div');
    headerButtons.style.cssText = 'display: flex; gap: 5px;';
    
    const btnMinimize = document.createElement('button');
    btnMinimize.textContent = '━';
    btnMinimize.onclick = minimizarTablaNch2702;
    btnMinimize.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        padding: 2px 6px;
        opacity: 0.9;
        transition: all 0.2s;
    `;
    
    const btnClose = document.createElement('button');
    btnClose.textContent = '✕';
    btnClose.onclick = cerrarTablaNch2702;
    btnClose.style.cssText = btnMinimize.style.cssText;
    
    headerButtons.appendChild(btnMinimize);
    headerButtons.appendChild(btnClose);
    header.appendChild(headerTitle);
    header.appendChild(headerButtons);
    
    // Contenido (iframe)
    const content = document.createElement('div');
    content.className = 'tabla-nch2702-content';
    content.style.cssText = `
        flex: 1;
        padding: 0;
        overflow: auto;
        background: white;
        position: relative;
    `;
    
    tablaNch2702Iframe = document.createElement('iframe');
    tablaNch2702Iframe.src = 'requisitos-camaras-nch2702.html';
    tablaNch2702Iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
    `;
    
    content.appendChild(tablaNch2702Iframe);
    
    tablaNch2702Window.appendChild(header);
    tablaNch2702Window.appendChild(content);
    document.body.appendChild(tablaNch2702Window);
    
    // Setup drag
    setupTablaNch2702Drag(header);
    
    console.log('✅ Ventana Tabla NCh 2702 abierta');
}

function cerrarTablaNch2702() {
    if (tablaNch2702Window) {
        tablaNch2702Window.remove();
        tablaNch2702Window = null;
        tablaNch2702Iframe = null;
        tablaNch2702IsMinimized = false;
    }
}

function minimizarTablaNch2702() {
    if (!tablaNch2702Window) return;
    
    tablaNch2702IsMinimized = true;
    tablaNch2702Window.style.height = '40px';
    tablaNch2702Window.classList.add('minimized');
    
    const content = tablaNch2702Window.querySelector('.tabla-nch2702-content');
    if (content) content.style.display = 'none';
}

function maximizarTablaNch2702() {
    if (!tablaNch2702Window) return;
    
    tablaNch2702IsMinimized = false;
    tablaNch2702Window.style.height = '400px';
    tablaNch2702Window.classList.remove('minimized');
    
    const content = tablaNch2702Window.querySelector('.tabla-nch2702-content');
    if (content) content.style.display = 'block';
}

function setupTablaNch2702Drag(header) {
    header.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        
        tablaNch2702IsDragging = true;
        const rect = tablaNch2702Window.getBoundingClientRect();
        tablaNch2702DragOffset.x = e.clientX - rect.left;
        tablaNch2702DragOffset.y = e.clientY - rect.top;
        
        header.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!tablaNch2702IsDragging) return;
        
        const x = e.clientX - tablaNch2702DragOffset.x;
        const y = e.clientY - tablaNch2702DragOffset.y;
        
        tablaNch2702Window.style.left = x + 'px';
        tablaNch2702Window.style.top = y + 'px';
        tablaNch2702Window.style.right = 'auto';
        tablaNch2702Window.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', function() {
        if (tablaNch2702IsDragging) {
            tablaNch2702IsDragging = false;
            header.style.cursor = 'grab';
        }
    });
}

// Escuchar mensajes del iframe
window.addEventListener('message', function(event) {
    if (event.data.tipo === 'insertarTablaNch2702') {
        insertarTablaNch2702EnPlano();
    }
});

function insertarTablaNch2702EnPlano() {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) {
        showStatus('⚠️ No se encontró el SVG del plano');
        return;
    }
    
    const tableId = `tabla-nch2702-${Date.now()}`;
    
    // Crear grupo foreignObject para HTML
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.setAttribute('x', '50');
    foreignObject.setAttribute('y', '50');
    foreignObject.setAttribute('width', '700');
    foreignObject.setAttribute('height', '250');
    foreignObject.setAttribute('class', 'tabla-nch2702-plano');
    foreignObject.setAttribute('data-type', 'tabla-nch2702');
    foreignObject.setAttribute('data-selectable', 'true');
    foreignObject.id = tableId;
    
    // Crear contenedor HTML dentro del foreignObject
    const div = document.createElement('div');
    div.style.cssText = `
        width: 700px;
        height: 250px;
        background: transparent;
        border: none;
        padding: 0;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
        transform-origin: top left;
        pointer-events: none;
    `;
    
    div.innerHTML = `
        <div class="tabla-inner" style="padding: 8px; background: white; width: 684px; height: 234px; margin: 8px; box-sizing: border-box; box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: move; pointer-events: auto;">
            <div style="text-align: center; font-size: 10px; font-weight: bold; margin-bottom: 8px; text-decoration: underline; color: #000000;">
                REQUISITOS DE CÁMARAS PREFABRICADAS SEGÚN NCh 2702
            </div>
            <table style="width: 100%; border-collapse: collapse; border: 2px solid #000000; font-size: 7px;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; font-weight: bold; color: #000000; line-height: 1.2;">COMPONENTE</th>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; color: #000000; line-height: 1.2;">PROFUNDIDAD<br><span style="font-size: 6px;">m</span></th>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; color: #000000; line-height: 1.2;">DIAMETRO<br>INTERIOR<br><span style="font-size: 6px;">m</span></th>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; color: #000000; line-height: 1.2;">DIAMETRO<br>INTERIOR<br>ULTIMA<br>CAMARA<br><span style="font-size: 6px;">m</span></th>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; color: #000000; line-height: 1.2;">ESPESOR<br>MINIMO DE<br>PARED<br><span style="font-size: 6px;">mm</span></th>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; color: #000000; line-height: 1.2;">RESISTENCIA<br>MINIMA A LA<br>COMPRESION<br>DIAMETRAL<br><span style="font-size: 6px;">KN/m</span></th>
                        <th style="border: 1px solid #000000; padding: 3px; background: #f0f0f0; color: #000000; line-height: 1.2;">IMPERMEABILIDAD<br>MAXIMA DE<br>EDICION DE AGUA<br><span style="font-size: 6px;">cm³/m</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #000000; padding: 3px; font-weight: bold; color: #000000;" rowspan="4">MODULO</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">0.45 – 1</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">0.60</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">0.80</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">57</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">28</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">300</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">1 – 2</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">0.80</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">1.00</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">77</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">33</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">360</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;" rowspan="2">MAYOR DE 2</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">1.00</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000; font-size: 10px;">–</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">95</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">37</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">440</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000; font-size: 10px;">–</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">1.20</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">105</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">39</td>
                        <td style="border: 1px solid #000000; padding: 3px; text-align: center; color: #000000;">520</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    foreignObject.appendChild(div);
    tracingSvg.appendChild(foreignObject);
    
    // Setup drag, resize y SELECCIÓN
    setupTablaNch2702DragInPlano(foreignObject);
    setupTablaNch2702ResizeInPlano(foreignObject);
    setupTablaNch2702Selection(foreignObject);
    
    // Cerrar ventana flotante
    cerrarTablaNch2702();
    
    showStatus('✅ Tabla NCh 2702 insertada (Click para seleccionar, Delete para eliminar)');
}

function setupTablaNch2702Selection(foreignObject) {
    const innerDiv = foreignObject.querySelector('.tabla-inner');
    
    innerDiv.addEventListener('click', function(e) {
        if (isNavigationMode) return;
        
        // Si está en modo resize, no seleccionar
        const rect = innerDiv.getBoundingClientRect();
        const edge = 20;
        const isNearEdge = (
            e.clientX > rect.right - edge || 
            e.clientY > rect.bottom - edge ||
            e.clientX < rect.left + edge ||
            e.clientY < rect.top + edge
        );
        
        if (isNearEdge) return;
        
        e.stopPropagation();
        
        // Toggle selección
        if (e.ctrlKey || e.metaKey) {
            toggleElementSelection(foreignObject);
        } else {
            clearSelection();
            selectTracingElement(foreignObject);
        }
    });
}

function setupTablaNch2702DragInPlano(foreignObject) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    const innerDiv = foreignObject.querySelector('.tabla-inner');
    
    // Solo permitir drag desde el área blanca interior
    innerDiv.addEventListener('mousedown', function(e) {
        // Solo drag si no está en las esquinas (para resize)
        const rect = innerDiv.getBoundingClientRect();
        const edge = 20;
        const isNearEdge = (
            e.clientX > rect.right - edge || 
            e.clientY > rect.bottom - edge ||
            e.clientX < rect.left + edge ||
            e.clientY < rect.top + edge
        );
        
        if (isNearEdge) return;
        
        isDragging = true;
        const tracingSvg = document.getElementById('tracingSvg');
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(tracingSvg.getScreenCTM().inverse());
        
        startX = svgP.x;
        startY = svgP.y;
        initialX = parseFloat(foreignObject.getAttribute('x'));
        initialY = parseFloat(foreignObject.getAttribute('y'));
        
        innerDiv.style.cursor = 'grabbing';
        e.preventDefault();
        e.stopPropagation();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const tracingSvg = document.getElementById('tracingSvg');
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(tracingSvg.getScreenCTM().inverse());
        
        const dx = svgP.x - startX;
        const dy = svgP.y - startY;
        
        foreignObject.setAttribute('x', initialX + dx);
        foreignObject.setAttribute('y', initialY + dy);
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            innerDiv.style.cursor = 'move';
        }
    });
}

function setupTablaNch2702ResizeInPlano(foreignObject) {
    let isResizing = false;
    let resizeMode = null;
    let startX, startY, initialX, initialY, initialWidth, initialHeight;
    
    const div = foreignObject.querySelector('div');
    const innerDiv = foreignObject.querySelector('.tabla-inner');
    
    // Función para actualizar la escala automáticamente
    function updateScale() {
        const currentWidth = parseFloat(foreignObject.getAttribute('width'));
        const currentHeight = parseFloat(foreignObject.getAttribute('height'));
        const baseWidth = 700;
        const baseHeight = 250;
        
        const scaleX = currentWidth / baseWidth;
        const scaleY = currentHeight / baseHeight;
        const scale = Math.min(scaleX, scaleY);
        
        div.style.transform = `scale(${scale})`;
    }
    
    innerDiv.addEventListener('mousedown', function(e) {
        const rect = innerDiv.getBoundingClientRect();
        const edge = 20;
        
        // Detectar en qué esquina/borde está el mouse
        const isRight = e.clientX > rect.right - edge;
        const isBottom = e.clientY > rect.bottom - edge;
        const isLeft = e.clientX < rect.left + edge;
        const isTop = e.clientY < rect.top + edge;
        
        if (isRight && isBottom) {
            resizeMode = 'se';
        } else if (isLeft && isBottom) {
            resizeMode = 'sw';
        } else if (isRight && isTop) {
            resizeMode = 'ne';
        } else if (isLeft && isTop) {
            resizeMode = 'nw';
        } else if (isRight) {
            resizeMode = 'e';
        } else if (isBottom) {
            resizeMode = 's';
        } else if (isLeft) {
            resizeMode = 'w';
        } else if (isTop) {
            resizeMode = 'n';
        } else {
            return;
        }
        
        isResizing = true;
        const tracingSvg = document.getElementById('tracingSvg');
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(tracingSvg.getScreenCTM().inverse());
        
        startX = svgP.x;
        startY = svgP.y;
        initialX = parseFloat(foreignObject.getAttribute('x'));
        initialY = parseFloat(foreignObject.getAttribute('y'));
        initialWidth = parseFloat(foreignObject.getAttribute('width'));
        initialHeight = parseFloat(foreignObject.getAttribute('height'));
        
        e.preventDefault();
        e.stopPropagation();
    });
    
    innerDiv.addEventListener('mousemove', function(e) {
        if (isResizing) return;
        
        const rect = innerDiv.getBoundingClientRect();
        const edge = 20;
        
        const isRight = e.clientX > rect.right - edge;
        const isBottom = e.clientY > rect.bottom - edge;
        const isLeft = e.clientX < rect.left + edge;
        const isTop = e.clientY < rect.top + edge;
        
        if ((isRight && isBottom) || (isLeft && isTop)) {
            innerDiv.style.cursor = 'nwse-resize';
        } else if ((isLeft && isBottom) || (isRight && isTop)) {
            innerDiv.style.cursor = 'nesw-resize';
        } else if (isRight || isLeft) {
            innerDiv.style.cursor = 'ew-resize';
        } else if (isBottom || isTop) {
            innerDiv.style.cursor = 'ns-resize';
        } else {
            innerDiv.style.cursor = 'move';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const tracingSvg = document.getElementById('tracingSvg');
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(tracingSvg.getScreenCTM().inverse());
        
        const dx = svgP.x - startX;
        const dy = svgP.y - startY;
        
        let newX = initialX;
        let newY = initialY;
        let newWidth = initialWidth;
        let newHeight = initialHeight;
        
        // Sin límite mínimo - permite reducción extrema
        if (resizeMode.includes('e')) {
            newWidth = Math.max(1, initialWidth + dx);
        }
        if (resizeMode.includes('s')) {
            newHeight = Math.max(1, initialHeight + dy);
        }
        if (resizeMode.includes('w')) {
            newWidth = Math.max(1, initialWidth - dx);
            newX = initialX + (initialWidth - newWidth);
        }
        if (resizeMode.includes('n')) {
            newHeight = Math.max(1, initialHeight - dy);
            newY = initialY + (initialHeight - newHeight);
        }
        
        foreignObject.setAttribute('x', newX);
        foreignObject.setAttribute('y', newY);
        foreignObject.setAttribute('width', newWidth);
        foreignObject.setAttribute('height', newHeight);
        
        // Actualizar la escala del contenido
        updateScale();
    });
    
    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            resizeMode = null;
        }
    });
    
    // Aplicar escala inicial
    updateScale();
}

window.abrirTablaNch2702 = abrirTablaNch2702;

console.log('✅ Tabla NCh 2702 Handler cargado - área transparente + movible');