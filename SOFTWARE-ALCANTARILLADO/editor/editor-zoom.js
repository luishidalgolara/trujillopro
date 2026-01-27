// ================================
// EDITOR ZOOM (OPTIMIZADO + SIN CONFLICTOS)
// Sistema de zoom y pan
// ================================
function configurarZoom() {
    const workspace = document.getElementById('workspace');
    if (!workspace) {
        console.warn('Workspace element not found');
        return;
    }
    
    let panX = 0, panY = 0;
    let haciendomPan = false;
    let inicioPanX = 0, inicioPanY = 0;
    let zoomAnimationFrame = null;
    let ultimoZoomTime = 0;
    const ZOOM_THROTTLE = 16; // ~60fps
    
    workspace.addEventListener('wheel', function(e) {
        if (isNavigationMode) return;
        
        // NO INTERFERIR CON ZOOM DE VIÑETA
        const vinetaWindow = document.getElementById('vinetaWindow');
        if (vinetaWindow) {
            const rect = vinetaWindow.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                return; // DEJAR QUE LA VIÑETA MANEJE SU ZOOM
            }
        }
        
        e.preventDefault();
        // NO USAR stopPropagation() AQUÍ
        
        const ahora = Date.now();
        if (ahora - ultimoZoomTime < ZOOM_THROTTLE) return;
        ultimoZoomTime = ahora;
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const nuevoZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel + delta));
        
        if (nuevoZoom !== zoomLevel) {
            zoomLevel = nuevoZoom;
            
            if (zoomAnimationFrame) {
                cancelAnimationFrame(zoomAnimationFrame);
            }
            
            zoomAnimationFrame = requestAnimationFrame(() => {
                const zoomContainer = document.getElementById('zoomContainer');
                if (zoomContainer) {
                    zoomContainer.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
                    zoomContainer.style.transformOrigin = 'center center';
                    showStatus(`🔍 Zoom: ${Math.round(zoomLevel * 100)}%`);
                }
                zoomAnimationFrame = null;
            });
        }
    }, { passive: false });
    
    workspace.addEventListener('mousedown', function(e) {
        if (e.button === 1) {
            e.preventDefault();
            haciendomPan = true;
            inicioPanX = e.clientX - panX;
            inicioPanY = e.clientY - panY;
            workspace.style.cursor = 'move';
        }
    });
    
    workspace.addEventListener('mousemove', function(e) {
        if (haciendomPan) {
            e.preventDefault();
            
            if (zoomAnimationFrame) {
                cancelAnimationFrame(zoomAnimationFrame);
            }
            
            zoomAnimationFrame = requestAnimationFrame(() => {
                panX = e.clientX - inicioPanX;
                panY = e.clientY - inicioPanY;
                const zoomContainer = document.getElementById('zoomContainer');
                if (zoomContainer) {
                    zoomContainer.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
                }
                zoomAnimationFrame = null;
            });
        }
    });
    
    workspace.addEventListener('mouseup', function(e) {
        if (e.button === 1) {
            haciendomPan = false;
            workspace.style.cursor = 'auto';
        }
    });
    
    workspace.addEventListener('contextmenu', function(e) {
        if (e.button === 1) {
            e.preventDefault();
        }
    });
    
    console.log('✅ Zoom optimizado con detección de viñeta');
}

// Alias para compatibilidad
window.setupZoom = configurarZoom;

// Exportar
window.EditorZoom = {
    configurarZoom
};

console.log('✅ editor-zoom.js cargado (optimizado)');
