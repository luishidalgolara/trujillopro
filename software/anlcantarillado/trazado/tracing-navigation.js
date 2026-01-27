function handleTracingZoom(e) {
    if (!isNavigationMode) return;
    
    const target = e.target;
    if (target.id === 'pdfBackground' || target.id === 'resizeHandle' || 
        target.closest('#pdfBackgroundGroup')) {
        return;
    }
    
    e.preventDefault();
    
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoomLevel = zoomLevel * zoomFactor;
    
    if (newZoomLevel < MIN_ZOOM || newZoomLevel > MAX_ZOOM) return;
    
    zoomLevel = newZoomLevel;
    
    const tracingSvg = document.getElementById('tracingSvg');
    const rect = tracingSvg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const formatData = formats[plans[currentPlanIndex].format];
    const newWidth = formatData.width / zoomLevel;
    const newHeight = formatData.height / zoomLevel;
    
    currentViewBox.x = (mouseX / rect.width) * formatData.width - (mouseX / rect.width) * newWidth;
    currentViewBox.y = (mouseY / rect.height) * formatData.height - (mouseY / rect.height) * newHeight;
    currentViewBox.width = newWidth;
    currentViewBox.height = newHeight;
    
    updateTracingViewBox();
    updateTracingElementSizes();
    
    showStatus(`🔍 Zoom: ${Math.round(zoomLevel * 100)}%`);
}

function handleTracingPanStart(e) {
    if (!isNavigationMode) return;
    
    const target = e.target;
    if (target.id === 'pdfBackground' || target.id === 'resizeHandle' || 
        target.closest('#pdfBackgroundGroup')) {
        return;
    }
    
    isPanning = true;
    const rect = e.target.getBoundingClientRect();
    startPanPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function handleTracingPanMove(e) {
    if (!isNavigationMode || !isPanning) return;
    
    e.preventDefault();
    
    const rect = e.target.getBoundingClientRect();
    const currentPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    
    const deltaX = (startPanPoint.x - currentPoint.x) * (currentViewBox.width / rect.width);
    const deltaY = (startPanPoint.y - currentPoint.y) * (currentViewBox.height / rect.height);
    
    currentViewBox.x += deltaX;
    currentViewBox.y += deltaY;
    
    updateTracingViewBox();
    startPanPoint = currentPoint;
}

function handleTracingPanEnd(e) {
    if (!isNavigationMode) return;
    isPanning = false;
}

function updateTracingViewBox() {
    const tracingSvg = document.getElementById('tracingSvg');
    tracingSvg.setAttribute('viewBox', 
        `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`
    );
}

function updateTracingElementSizes() {
    const zoomFactor = 1 / zoomLevel;
    const currentPlan = plans[currentPlanIndex];
    
    currentPlan.tracingElements.forEach(element => {
        const group = document.querySelector(`#tracing-element-${element.id}`);
        if (group) {
            const circle = group.querySelector('circle');
            const text = group.querySelector('text');
            
            if (circle) {
                const baseRadius = element.categoria === 'infraestructura' 
                    ? BASE_CIRCLE_RADIUS.infraestructura 
                    : BASE_CIRCLE_RADIUS.sanitario;
                
                circle.setAttribute('r', baseRadius * zoomFactor);
                
                if (element.type === 'camara-inspeccion' || element.type === 'camara-publica') {
                    circle.setAttribute('stroke-width', 2 * zoomFactor);
                } else {
                    circle.setAttribute('stroke-width', BASE_STROKE_WIDTH.element * zoomFactor);
                }
            }
            
            if (text) {
                const baseFontSize = element.categoria === 'infraestructura' 
                    ? BASE_FONT_SIZE.elementLarge 
                    : BASE_FONT_SIZE.element;
                
                text.setAttribute('font-size', baseFontSize * zoomFactor);
            }
        }
    });
    
    const tracingSvg = document.getElementById('tracingSvg');
    const pipeLines = tracingSvg.querySelectorAll('.pipe-line');
    pipeLines.forEach(line => {
        line.setAttribute('stroke-width', BASE_STROKE_WIDTH.pipe * zoomFactor);
    });
    
    const pipeLabels = tracingSvg.querySelectorAll('.pipe-label-group');
    pipeLabels.forEach(labelGroup => {
        const guideLine = labelGroup.querySelector('.guide-line');
        if (guideLine) {
            guideLine.setAttribute('stroke-width', Math.max(0.5, 1 * zoomFactor));
        }
        
        const texts = labelGroup.querySelectorAll('text');
        texts.forEach(text => {
            const currentSize = parseFloat(text.getAttribute('font-size')) || 8;
            text.setAttribute('font-size', Math.max(6, currentSize * zoomFactor));
        });
        
        const rects = labelGroup.querySelectorAll('rect');
        rects.forEach(rect => {
            const currentStroke = parseFloat(rect.getAttribute('stroke-width')) || 1;
            rect.setAttribute('stroke-width', Math.max(0.5, currentStroke * zoomFactor));
        });
    });
}

function updateModeButton() {
    const modeButton = document.getElementById('modeToggle');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!modeButton || !drawingBoard) return;
    
    if (isNavigationMode) {
        modeButton.textContent = '🔍 Navegación';
        modeButton.classList.add('navigation');
        drawingBoard.classList.add('navigation-mode');
    } else {
        modeButton.textContent = '🖱️ Edición';
        modeButton.classList.remove('navigation');
        drawingBoard.classList.remove('navigation-mode');
    }
}

function updateScaleButton(scale) {
    document.querySelectorAll('.scale-btn').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[data-scale="${scale}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

console.log('Trazado - Navigation cargado');