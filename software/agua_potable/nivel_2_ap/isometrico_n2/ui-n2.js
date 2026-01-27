// nivel_2_ap/isometrico_n2/ui-n2.js

async function generateIsometricN2() {
    const generator = window.isometricGeneratorN2;
    
    console.log('🎯 generateIsometricN2 ejecutándose...');
    
    try {
        const { showStatus } = await import('../../js/utils.js');
        const { elements } = await import('../../js/config.js');
        
        const elementosNivel2 = elements.filter(el => el.nivel === 2);
        
        console.log('📊 Elementos nivel 2:', elementosNivel2);
        
        if (elementosNivel2.length === 0) {
            showStatus('⚠️ No hay elementos en el 2° nivel para generar isométrico');
            return;
        }
        
        const conexionNivel2 = elementosNivel2.find(el => el.type === 'conexion-nivel-2');
        if (!conexionNivel2) {
            showStatus('⚠️ Necesitas agregar una CONEXIÓN 2° NIVEL primero');
            return;
        }
        
        // ✅ LEER IGUAL QUE ALCANTARILLADO
        const conexionesNivel2 = window.CONEXIONES_NIVEL_2;
        console.log('🔍 window.CONEXIONES_NIVEL_2:', conexionesNivel2);
        
        if (!conexionesNivel2 || conexionesNivel2.length === 0) {
            showStatus('⚠️ Debes generar el trazado del 2° nivel primero');
            return;
        }
        
        showStatus('⚡ Generando isométrico 2° nivel...');
        
        const svgContent = generator.generateIsometricFromTracing(
            elementosNivel2,
            conexionesNivel2,
            'ISOMÉTRICO 2° NIVEL - AGUA POTABLE',
            'ESCALA 1:50'
        );
        
        generator.currentSVG = svgContent;
        showIsometricWindowN2(svgContent);
        
        showStatus('✅ Isométrico 2° nivel generado exitosamente', 3000);
        
    } catch (error) {
        console.error('❌ Error generando isométrico nivel 2:', error);
        alert('❌ Error: ' + error.message);
    }
}

// ✅ EXPONER GLOBALMENTE
window.generateIsometricN2 = generateIsometricN2;

function showIsometricWindowN2(svgContent) {
    const generator = window.isometricGeneratorN2;
    
    if (generator.isWindowOpen) {
        const existingWindow = document.getElementById('isometricWindowN2');
        if (existingWindow) {
            existingWindow.style.display = 'flex';
            const content = existingWindow.querySelector('#isometricContentN2');
            if (content) {
                content.innerHTML = svgContent;
                setTimeout(() => {
                    const svgElement = content.querySelector('#isometricSVGNivel2');
                    if (svgElement) {
                        generator.setupLabelManipulation(svgElement);
                    }
                }, 100);
            }
            return;
        }
    }
    
    const windowDiv = document.createElement('div');
    windowDiv.id = 'isometricWindowN2';
    windowDiv.className = 'isometric-window-n2';
    windowDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        height: 85vh;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;
    
    const header = document.createElement('div');
    header.className = 'isometric-header-n2';
    header.style.cssText = `
        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid #c0392b;
        cursor: move;
    `;
    header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">🎯</span>
            <h3 style="margin: 0; font-size: 18px; font-weight: 600;">ISOMÉTRICO 2° NIVEL - AGUA POTABLE</h3>
        </div>
        <div style="display: flex; gap: 8px;">
            <button id="zoomInBtnN2" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold;">🔍+</button>
            <button id="zoomOutBtnN2" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold;">🔍-</button>
            <button id="resetZoomBtnN2" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 14px;">↺</button>
            <button id="integrationBtnN2" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 14px;">📌 Integrar</button>
            <button id="downloadIsometricBtnN2" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 14px;">💾</button>
            <button id="closeIsometricBtnN2" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 18px; font-weight: bold;">✕</button>
        </div>
    `;
    
    const content = document.createElement('div');
    content.id = 'isometricContentN2';
    content.className = 'isometric-content-n2';
    content.style.cssText = `
        flex: 1;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f8f9fa;
        padding: 20px;
        position: relative;
    `;
    content.innerHTML = svgContent;
    
    windowDiv.appendChild(header);
    windowDiv.appendChild(content);
    document.body.appendChild(windowDiv);
    
    generator.isWindowOpen = true;
    generator.windowElement = windowDiv;
    
    makeIsometricWindowDraggableN2(windowDiv, header);
    setupIsometricZoomN2(content);
    
    setTimeout(() => {
        const svgElement = content.querySelector('#isometricSVGNivel2');
        if (svgElement) {
            generator.setupLabelManipulation(svgElement);
        }
    }, 100);
    
    document.getElementById('closeIsometricBtnN2').addEventListener('click', closeIsometricWindowN2);
    document.getElementById('downloadIsometricBtnN2').addEventListener('click', downloadIsometricSVGN2);
    document.getElementById('integrationBtnN2').addEventListener('click', toggleIsometricIntegrationN2);
}

function closeIsometricWindowN2() {
    const generator = window.isometricGeneratorN2;
    const windowDiv = document.getElementById('isometricWindowN2');
    if (windowDiv) {
        windowDiv.remove();
        generator.isWindowOpen = false;
        generator.windowElement = null;
    }
}

function makeIsometricWindowDraggableN2(windowDiv, header) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    
    header.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        
        isDragging = true;
        initialX = e.clientX - windowDiv.offsetLeft;
        initialY = e.clientY - windowDiv.offsetTop;
        
        windowDiv.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            windowDiv.style.left = currentX + 'px';
            windowDiv.style.top = currentY + 'px';
            windowDiv.style.transform = 'none';
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

function setupIsometricZoomN2(content) {
    const generator = window.isometricGeneratorN2;
    let currentScale = 1.0;
    
    document.getElementById('zoomInBtnN2').addEventListener('click', function() {
        if (currentScale < generator.maxScale) {
            currentScale += 0.2;
            content.style.transform = `scale(${currentScale})`;
        }
    });
    
    document.getElementById('zoomOutBtnN2').addEventListener('click', function() {
        if (currentScale > generator.minScale) {
            currentScale -= 0.2;
            content.style.transform = `scale(${currentScale})`;
        }
    });
    
    document.getElementById('resetZoomBtnN2').addEventListener('click', function() {
        currentScale = 1.0;
        content.style.transform = 'scale(1)';
        content.scrollLeft = 0;
        content.scrollTop = 0;
    });
}

async function downloadIsometricSVGN2() {
    const generator = window.isometricGeneratorN2;
    const { showStatus } = await import('../../js/utils.js');
    
    if (!generator.currentSVG) {
        showStatus('⚠️ No hay isométrico para descargar');
        return;
    }
    
    const blob = new Blob([generator.currentSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isometrico-nivel-2-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showStatus('✅ Isométrico Nivel 2 descargado');
}

console.log('✅ Motor Isométrico NIVEL 2 - UI cargado');
console.log('✅ generateIsometricN2 expuesta globalmente');