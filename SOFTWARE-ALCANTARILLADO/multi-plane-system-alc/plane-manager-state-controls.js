/**
 * Módulo de re-inicialización de controles para elementos integrados
 * Funciones para restaurar la funcionalidad de arrastre, redimensión y eventos
 */

const PlaneManagerStateControlsAlc = {
    
    reinicializarControlesIntegrados() {
        console.log('🔄 Re-inicializando controles de elementos integrados...');
        
        try {
            const drawingBoard = document.getElementById('drawingBoard');
            const zoomContainer = document.getElementById('zoomContainer');
            if (!drawingBoard) return;
            
            // Isométricos
            const isometricoN1 = zoomContainer ? zoomContainer.querySelector('#integratedIsometric') : null;
            if (isometricoN1) {
                this.reinicializarControlIsometrico(isometricoN1, 'N1');
            }
            
            const isometricoN2 = zoomContainer ? zoomContainer.querySelector('#integratedIsometricN2') : null;
            if (isometricoN2) {
                this.reinicializarControlIsometrico(isometricoN2, 'N2');
            }
            
            // Simbologías
            const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
            simbologias.forEach((simb, index) => {
                this.reinicializarControlGenerico(simb, `Simbología ${index + 1}`);
            });
            
            // Cuadros de piezas
            const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
            cuadrosPiezas.forEach((cuadro, index) => {
                this.reinicializarControlGenerico(cuadro, `Cuadro Piezas ${index + 1}`);
            });
            
            // Cuadros de gastos
            const cuadrosGastos = drawingBoard.querySelectorAll('.cuadro-gastos-integrado');
            cuadrosGastos.forEach((cuadro, index) => {
                this.reinicializarControlGenerico(cuadro, `Cuadro Gastos ${index + 1}`);
            });
            
            // Detalles
            const detallesAP = drawingBoard.querySelectorAll('.detalle-integrado-ap');
            const detallesALC = drawingBoard.querySelectorAll('.detalle-integrado-alc');
            const todosLosDetalles = [...detallesAP, ...detallesALC];
            
            todosLosDetalles.forEach((detalle, index) => {
                this.reinicializarControlGenerico(detalle, `Detalle ${index + 1}`);
            });
            
            // Notas obligatorias
            const notasObligatorias = drawingBoard.querySelectorAll('.nota-plano-container');
            notasObligatorias.forEach((notas, index) => {
                this.reinicializarControlNotas(notas, index);
            });
            
            // Cuadros UEH
            const cuadrosUEH = drawingBoard.querySelectorAll('.cuadro-ueh-integrado');
            cuadrosUEH.forEach((cuadro, index) => {
                this.reinicializarControlGenerico(cuadro, `Cuadro UEH ${index + 1}`);
            });
            
            console.log('✅ Controles de elementos integrados re-inicializados');
            
        } catch (error) {
            console.error('❌ Error al re-inicializar controles:', error);
        }
    },
    
    reinicializarControlIsometrico(elemento, nivel) {
        try {
            const dragHandle = elemento.querySelector('[id*="DragHandle"]');
            const resizeHandle = elemento.querySelector('[id*="ResizeHandle"]');
            
            if (dragHandle && resizeHandle) {
                if (nivel === 'N1') {
                    if (typeof window.makeIntegratedIsometricDraggable === 'function') {
                        window.makeIntegratedIsometricDraggable(elemento, dragHandle);
                    }
                    if (typeof window.makeIntegratedIsometricResizable === 'function') {
                        window.makeIntegratedIsometricResizable(elemento, resizeHandle);
                    }
                } else if (nivel === 'N2') {
                    if (typeof window.makeIntegratedIsometricDraggableNivel2 === 'function') {
                        window.makeIntegratedIsometricDraggableNivel2(elemento, dragHandle);
                    }
                    if (typeof window.makeIntegratedIsometricResizableNivel2 === 'function') {
                        window.makeIntegratedIsometricResizableNivel2(elemento, resizeHandle);
                    }
                }
                console.log(`  ✓ Isométrico ${nivel} controles re-inicializados`);
            }
        } catch (e) {
            console.warn(`No se pudieron re-inicializar controles de Isométrico ${nivel}:`, e);
        }
    },
    
    reinicializarControlGenerico(elemento, nombre) {
        try {
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let startLeft = 0;
            let startTop = 0;
            
            elemento.style.cursor = 'move';
            elemento.style.pointerEvents = 'auto';
            
            elemento.addEventListener('mousedown', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                
                const rect = elemento.getBoundingClientRect();
                const parentRect = elemento.parentElement.getBoundingClientRect();
                startLeft = rect.left - parentRect.left;
                startTop = rect.top - parentRect.top;
                
                elemento.style.cursor = 'grabbing';
                e.preventDefault();
                e.stopPropagation();
            });
            
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                elemento.style.left = (startLeft + deltaX) + 'px';
                elemento.style.top = (startTop + deltaY) + 'px';
            });
            
            document.addEventListener('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    elemento.style.cursor = 'move';
                }
            });
            
            console.log(`  ✓ ${nombre} controles re-inicializados`);
        } catch (e) {
            console.warn(`No se pudieron re-inicializar controles de ${nombre}:`, e);
        }
    },
    
    reinicializarControlNotas(elemento, index) {
        try {
            const botones = elemento.querySelectorAll('button');
            botones.forEach(btn => {
                const onclick = btn.getAttribute('onclick');
                if (onclick) {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        eval(onclick);
                    });
                }
            });
            
            this.reinicializarControlGenerico(elemento, `Notas Obligatorias ${index + 1}`);
        } catch (e) {
            console.warn(`No se pudieron re-inicializar controles de Notas ${index + 1}:`, e);
        }
    }
};

window.PlaneManagerStateControlsAlc = PlaneManagerStateControlsAlc;
console.log('✅ PlaneManagerStateControlsAlc cargado');