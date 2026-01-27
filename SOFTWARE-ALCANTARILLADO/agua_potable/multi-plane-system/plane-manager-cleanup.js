/**
 * Funciones de limpieza y reseteo del sistema multi-plano
 */
const PlaneManagerCleanup = {
    
    // Limpiar canvas de forma segura
    clearCanvas() {
        const svgElement = document.getElementById('plano');
        if (!svgElement) return;
        
        try {
            const defs = svgElement.querySelector('defs');
            const defsHTML = defs ? defs.outerHTML : '';
            
            const backgroundRect = svgElement.querySelector('rect[fill="#ffffff"]');
            const backgroundHTML = backgroundRect ? backgroundRect.outerHTML : '';
            
            const gridRect = svgElement.querySelector('rect[fill="url(#grid)"]');
            const gridHTML = gridRect ? gridRect.outerHTML : '';
            
            svgElement.innerHTML = '';
            svgElement.innerHTML = defsHTML + backgroundHTML + gridHTML;
            
            console.log('🧹 Canvas limpiado (grid preservado)');
            
        } catch (e) {
            console.warn('Error al limpiar canvas:', e);
        }
    },
    
    // Limpiar todos los elementos integrados
    clearIntegratedElements() {
        const drawingBoard = document.getElementById('drawingBoard');
        if (!drawingBoard) return;
        
        try {
            // Eliminar Simbologías
            const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
            simbologias.forEach(simb => simb.remove());
            
            // Eliminar Cuadros de Piezas
            const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
            cuadrosPiezas.forEach(cuadro => cuadro.remove());
            
            // Eliminar Viñeta
            const vineta = drawingBoard.querySelector('#vinetaWindow');
            if (vineta) vineta.remove();
            
            // Eliminar Cuadros de Gastos
            const cuadrosGastos = drawingBoard.querySelectorAll('.cuadro-gastos-integrado');
            cuadrosGastos.forEach(cuadro => cuadro.remove());
            
            // Eliminar Detalles AP
            const detalles = drawingBoard.querySelectorAll('.detalle-integrado-ap');
            detalles.forEach(detalle => detalle.remove());
            
            // Eliminar Isométrico Nivel 1
            const isometricoN1 = drawingBoard.querySelector('#integratedIsometric');
            if (isometricoN1) {
                isometricoN1.remove();
                // Actualizar flag global
                if (window.isometricGenerator) {
                    window.isometricGenerator.isIntegrated = false;
                }
            }
            
            // Eliminar Isométrico Nivel 2
            const isometricoN2 = drawingBoard.querySelector('#integratedIsometricN2');
            if (isometricoN2) {
                isometricoN2.remove();
                // Actualizar flag global
                if (window.isometricGeneratorN2) {
                    window.isometricGeneratorN2.isIntegrated = false;
                }
            }
            
            // Eliminar Notas Obligatorias
            const notasObligatorias = drawingBoard.querySelectorAll('.notas-integradas');
            notasObligatorias.forEach(notas => notas.remove());
            
            console.log('🧹 Elementos integrados limpiados');
            
        } catch (e) {
            console.warn('Error al limpiar elementos integrados:', e);
        }
    },
    
    // Resetear estados globales de elementos integrados
    resetIntegratedStates() {
        try {
            // Resetear estado de viñeta
            if (typeof window.vinetaActiva !== 'undefined') {
                window.vinetaActiva = false;
            }
            
            // Resetear zoom de viñeta
            if (typeof window.zoomVinetaActual !== 'undefined') {
                window.zoomVinetaActual = 1;
            }
            
            // Resetear pan de viñeta
            if (typeof window.vinetaPanActivo !== 'undefined') {
                window.vinetaPanActivo = false;
            }
            
            // Resetear arrastre de viñeta
            if (typeof window.vinetaArrastrando !== 'undefined') {
                window.vinetaArrastrando = false;
            }
            
            // Resetear redimensionamiento de viñeta
            if (typeof window.vinetaRedimensionando !== 'undefined') {
                window.vinetaRedimensionando = false;
            }
            
            console.log('🔄 Estados globales de elementos integrados reseteados');
            
        } catch (e) {
            console.warn('Error al resetear estados integrados:', e);
        }
    },
    
    // Crear canvas vacío con grid
    createEmptyCanvas() {
        const svgElement = document.getElementById('plano');
        if (!svgElement) return;
        
        svgElement.innerHTML = `
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e5e5" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="#ffffff" />
            <rect width="100%" height="100%" fill="url(#grid)" />
        `;
    }
};

// Exportar para uso global
window.PlaneManagerCleanup = PlaneManagerCleanup;

console.log('✅ PlaneManagerCleanup cargado');