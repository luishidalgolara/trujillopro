// ============================================================
// CUADRO DE CARGAS ARRASTRE - Funcionalidad de drag & drop
// ============================================================

function inicializarArrastreCuadroCargas() {
    const header = document.getElementById('cuadroCargasHeader');
    const ventana = document.getElementById('cuadroCargasWindow');
    
    if (!header || !ventana) return;
    
    let arrastrando = false;
    let mouseInicio = { x: 0, y: 0 };
    let ventanaInicio = { x: 0, y: 0 };
    
    header.onmousedown = function(e) {
        if (e.target.tagName === 'BUTTON') return;
        
        arrastrando = true;
        mouseInicio.x = e.clientX;
        mouseInicio.y = e.clientY;
        
        const rect = ventana.getBoundingClientRect();
        const parentRect = ventana.parentElement.getBoundingClientRect();
        
        ventanaInicio.x = rect.left - parentRect.left;
        ventanaInicio.y = rect.top - parentRect.top;
        
        header.style.cursor = 'grabbing';
        e.preventDefault();
    };
    
    document.onmousemove = function(e) {
        if (!arrastrando) return;
        
        e.preventDefault();
        
        const deltaX = e.clientX - mouseInicio.x;
        const deltaY = e.clientY - mouseInicio.y;
        
        ventana.style.left = (ventanaInicio.x + deltaX) + 'px';
        ventana.style.top = (ventanaInicio.y + deltaY) + 'px';
        ventana.style.transform = 'none';
    };
    
    document.onmouseup = function() {
        if (arrastrando) {
            arrastrando = false;
            header.style.cursor = 'grab';
        }
    };
}

console.log('✅ Cuadro de Cargas Arrastre inicializado');
