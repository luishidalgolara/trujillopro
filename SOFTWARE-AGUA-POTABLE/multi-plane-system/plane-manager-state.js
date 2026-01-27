/**
 * Funciones de guardado y carga de estado del sistema multi-plano
 */
const PlaneManagerState = {
    
    // Guardar estado completo del plano actual
    saveCurrentPlaneState() {
        const currentPlane = PlaneState.getActivePlane();
        if (!currentPlane) return;
        
        try {
            console.log(`💾 Guardando estado completo de: ${currentPlane.name}`);
            
            // 1. Guardar elementos actuales
            if (window.appState && window.appState.elements) {
                currentPlane.elements = JSON.parse(JSON.stringify(window.appState.elements));
                console.log(`  ✓ ${currentPlane.elements.length} elementos guardados`);
            }
            
            // 2. Guardar escala actual
            if (window.appState && window.appState.currentScale) {
                currentPlane.scale = window.appState.currentScale;
            }
            
            // 3. Guardar formato actual
            if (window.appState && window.appState.currentFormat) {
                currentPlane.format = window.appState.currentFormat;
            }
            
            // 4. Guardar modo actual
            if (window.appState && window.appState.mode) {
                currentPlane.mode = window.appState.mode;
            }
            
            // 5. Guardar dirección del proyecto
            const addressInput = document.getElementById('addressInput');
            if (addressInput) {
                currentPlane.projectAddress = addressInput.value;
            }
            
            // 6. Guardar el HTML COMPLETO del SVG
            const svgElement = document.getElementById('plano');
            if (svgElement) {
                try {
                    currentPlane.svgInnerHTML = svgElement.innerHTML;
                    console.log(`  ✓ SVG visual guardado (${currentPlane.svgInnerHTML.length} caracteres)`);
                } catch (e) {
                    console.warn('No se pudo guardar SVG innerHTML:', e);
                }
            }
            
            // 7. GUARDAR TODOS LOS ELEMENTOS INTEGRADOS
            const drawingBoard = document.getElementById('drawingBoard');
            if (drawingBoard) {
                const elementosIntegrados = {
                    simbologia: [],
                    cuadroPiezas: [],
                    vineta: null,
                    cuadroGastos: [],
                    detalles: [],
                    isometricoN1: null,
                    isometricoN2: null,
                    notasObligatorias: []
                };
                
                // Guardar Simbologías
                const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
                simbologias.forEach(simb => {
                    elementosIntegrados.simbologia.push({
                        html: simb.outerHTML,
                        left: simb.style.left,
                        top: simb.style.top
                    });
                });
                
                // Guardar Cuadros de Piezas
                const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
                cuadrosPiezas.forEach(cuadro => {
                    elementosIntegrados.cuadroPiezas.push({
                        html: cuadro.outerHTML,
                        left: cuadro.style.left,
                        top: cuadro.style.top
                    });
                });
                
                // Guardar Viñeta (posición custom + contenido)
                const vineta = drawingBoard.querySelector('#vinetaWindow');
                if (vineta) {
                    const iframe = vineta.querySelector('#vinetaIframe');
                    let iframeData = null;
                    
                    if (iframe && iframe.contentWindow) {
                        try {
                            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                            const inputs = iframeDoc.querySelectorAll('input, textarea');
                            iframeData = {};
                            inputs.forEach(input => {
                                if (input.id) {
                                    iframeData[input.id] = input.value;
                                }
                            });
                        } catch (e) {
                            console.warn('No se pudo leer contenido del iframe de viñeta:', e);
                        }
                    }
                    
                    elementosIntegrados.vineta = {
                        existe: true,
                        iframeData: iframeData,
                        zoom: window.zoomVinetaActual || 1,
                        posicion: {
                            left: vineta.style.left,
                            top: vineta.style.top,
                            width: vineta.style.width,
                            height: vineta.style.height
                        }
                    };
                    
                    console.log(`  ✓ Viñeta guardada (posición: ${vineta.style.left}, ${vineta.style.top})`);
                }
                
                // Guardar Cuadros de Gastos
                const cuadrosGastos = drawingBoard.querySelectorAll('.cuadro-gastos-integrado');
                cuadrosGastos.forEach(cuadro => {
                    elementosIntegrados.cuadroGastos.push({
                        html: cuadro.outerHTML,
                        left: cuadro.style.left,
                        top: cuadro.style.top
                    });
                });
                
                // Guardar Detalles AP
                const detalles = drawingBoard.querySelectorAll('.detalle-integrado-ap');
                detalles.forEach(detalle => {
                    elementosIntegrados.detalles.push({
                        html: detalle.outerHTML,
                        left: detalle.style.left,
                        top: detalle.style.top
                    });
                });
                
                // Guardar Isométrico Nivel 1
                const isometricoN1 = drawingBoard.querySelector('#integratedIsometric');
                if (isometricoN1) {
                    elementosIntegrados.isometricoN1 = {
                        html: isometricoN1.outerHTML,
                        left: isometricoN1.style.left,
                        top: isometricoN1.style.top,
                        width: isometricoN1.style.width,
                        height: isometricoN1.style.height,
                        locked: isometricoN1.getAttribute('data-locked')
                    };
                }
                
                // Guardar Isométrico Nivel 2
                const isometricoN2 = drawingBoard.querySelector('#integratedIsometricN2');
                if (isometricoN2) {
                    elementosIntegrados.isometricoN2 = {
                        html: isometricoN2.outerHTML,
                        left: isometricoN2.style.left,
                        top: isometricoN2.style.top,
                        width: isometricoN2.style.width,
                        height: isometricoN2.style.height,
                        locked: isometricoN2.getAttribute('data-locked')
                    };
                }
                
                // Guardar Notas Obligatorias
                const notasObligatorias = drawingBoard.querySelectorAll('.notas-integradas');
                notasObligatorias.forEach(notas => {
                    elementosIntegrados.notasObligatorias.push({
                        html: notas.outerHTML,
                        left: notas.style.left,
                        top: notas.style.top
                    });
                });
                
                currentPlane.elementosIntegrados = elementosIntegrados;
                
                const totalIntegrados = 
                    elementosIntegrados.simbologia.length +
                    elementosIntegrados.cuadroPiezas.length +
                    (elementosIntegrados.vineta ? 1 : 0) +
                    elementosIntegrados.cuadroGastos.length +
                    elementosIntegrados.detalles.length +
                    (elementosIntegrados.isometricoN1 ? 1 : 0) +
                    (elementosIntegrados.isometricoN2 ? 1 : 0) +
                    elementosIntegrados.notasObligatorias.length;
                
                console.log(`  ✓ ${totalIntegrados} elementos integrados guardados`);
            }
            
            // 8. Guardar conexiones/trazados si existen
            if (window.appState && window.appState.connections) {
                currentPlane.connections = JSON.parse(JSON.stringify(window.appState.connections));
            }
            
            console.log(`✅ Estado guardado completamente: ${currentPlane.name}`);
            
        } catch (error) {
            console.error('❌ Error al guardar estado del plano:', error);
        }
    },
    
    // Cargar estado completo de un plano
    loadPlaneState(plane) {
        console.log(`📂 Cargando estado completo de: ${plane.name}`);
        
        try {
            // 1. Limpiar canvas actual Y elementos integrados
            if (window.PlaneManagerCleanup) {
                window.PlaneManagerCleanup.clearCanvas();
                window.PlaneManagerCleanup.clearIntegratedElements();
                window.PlaneManagerCleanup.resetIntegratedStates();
            }
            
            // 2. Restaurar el HTML completo del SVG
            const svgElement = document.getElementById('plano');
            if (svgElement && plane.svgInnerHTML) {
                try {
                    svgElement.innerHTML = plane.svgInnerHTML;
                    console.log(`  ✓ SVG visual restaurado (${plane.svgInnerHTML.length} caracteres)`);
                } catch (e) {
                    console.warn('No se pudo restaurar SVG innerHTML:', e);
                }
            } else if (window.PlaneManagerCleanup) {
                window.PlaneManagerCleanup.createEmptyCanvas();
            }
            
            // 3. RESTAURAR TODOS LOS ELEMENTOS INTEGRADOS
            const drawingBoard = document.getElementById('drawingBoard');
            if (drawingBoard && plane.elementosIntegrados) {
                const elementos = plane.elementosIntegrados;
                
                // Restaurar Simbologías
                if (elementos.simbologia && elementos.simbologia.length > 0) {
                    elementos.simbologia.forEach(simb => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = simb.html;
                        const elemento = tempDiv.firstChild;
                        drawingBoard.appendChild(elemento);
                    });
                    console.log(`  ✓ ${elementos.simbologia.length} simbología(s) restaurada(s)`);
                }
                
                // Restaurar Cuadros de Piezas
                if (elementos.cuadroPiezas && elementos.cuadroPiezas.length > 0) {
                    elementos.cuadroPiezas.forEach(cuadro => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = cuadro.html;
                        const elemento = tempDiv.firstChild;
                        drawingBoard.appendChild(elemento);
                    });
                    console.log(`  ✓ ${elementos.cuadroPiezas.length} cuadro(s) de piezas restaurado(s)`);
                }
                
                // Restaurar Viñeta (con posición exacta)
                if (elementos.vineta && elementos.vineta.existe) {
                    if (typeof window.abrirVineta === 'function') {
                        setTimeout(() => {
                            window.abrirVineta();
                            
                            setTimeout(() => {
                                const vinetaRestaurada = document.getElementById('vinetaWindow');
                                if (vinetaRestaurada && elementos.vineta.posicion) {
                                    const pos = elementos.vineta.posicion;
                                    
                                    if (pos.left) vinetaRestaurada.style.left = pos.left;
                                    if (pos.top) vinetaRestaurada.style.top = pos.top;
                                    if (pos.width) vinetaRestaurada.style.width = pos.width;
                                    if (pos.height) vinetaRestaurada.style.height = pos.height;
                                    
                                    console.log(`  ✓ Viñeta posicionada en: ${pos.left}, ${pos.top}`);
                                }
                                
                                if (elementos.vineta.iframeData) {
                                    const iframe = document.getElementById('vinetaIframe');
                                    if (iframe && iframe.contentWindow) {
                                        try {
                                            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                                            Object.keys(elementos.vineta.iframeData).forEach(id => {
                                                const input = iframeDoc.getElementById(id);
                                                if (input) {
                                                    input.value = elementos.vineta.iframeData[id];
                                                }
                                            });
                                            console.log('  ✓ Datos de viñeta restaurados');
                                        } catch (e) {
                                            console.warn('No se pudieron restaurar datos del iframe:', e);
                                        }
                                    }
                                }
                                
                                if (elementos.vineta.zoom && elementos.vineta.zoom !== 1) {
                                    setTimeout(() => {
                                        const delta = elementos.vineta.zoom - 1;
                                        if (typeof window.cambiarZoomVineta === 'function') {
                                            window.cambiarZoomVineta(delta);
                                        }
                                    }, 100);
                                }
                                
                            }, 200);
                            
                            console.log(`  ✓ Viñeta restaurada completamente`);
                        }, 100);
                    }
                }
                
                // Restaurar Cuadros de Gastos
                if (elementos.cuadroGastos && elementos.cuadroGastos.length > 0) {
                    elementos.cuadroGastos.forEach(cuadro => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = cuadro.html;
                        const elemento = tempDiv.firstChild;
                        drawingBoard.appendChild(elemento);
                    });
                    console.log(`  ✓ ${elementos.cuadroGastos.length} cuadro(s) de gastos restaurado(s)`);
                }
                
                // Restaurar Detalles AP
                if (elementos.detalles && elementos.detalles.length > 0) {
                    elementos.detalles.forEach(detalle => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = detalle.html;
                        const elemento = tempDiv.firstChild;
                        drawingBoard.appendChild(elemento);
                    });
                    console.log(`  ✓ ${elementos.detalles.length} detalle(s) restaurado(s)`);
                }
                
                // Restaurar Isométrico Nivel 1
                if (elementos.isometricoN1) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = elementos.isometricoN1.html;
                    const elemento = tempDiv.firstChild;
                    drawingBoard.appendChild(elemento);
                    console.log(`  ✓ Isométrico Nivel 1 restaurado`);
                    
                    if (window.isometricGenerator) {
                        window.isometricGenerator.isIntegrated = true;
                    }
                }
                
                // Restaurar Isométrico Nivel 2
                if (elementos.isometricoN2) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = elementos.isometricoN2.html;
                    const elemento = tempDiv.firstChild;
                    drawingBoard.appendChild(elemento);
                    console.log(`  ✓ Isométrico Nivel 2 restaurado`);
                    
                    if (window.isometricGeneratorN2) {
                        window.isometricGeneratorN2.isIntegrated = true;
                    }
                }
                
                // Restaurar Notas Obligatorias
                if (elementos.notasObligatorias && elementos.notasObligatorias.length > 0) {
                    elementos.notasObligatorias.forEach(notas => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = notas.html;
                        const elemento = tempDiv.firstChild;
                        drawingBoard.appendChild(elemento);
                    });
                    console.log(`  ✓ ${elementos.notasObligatorias.length} nota(s) obligatoria(s) restaurada(s)`);
                }
            }
            
            // 4. Cargar elementos al estado
            if (window.appState) {
                try {
                    window.appState.elements = JSON.parse(JSON.stringify(plane.elements));
                    console.log(`  ✓ ${plane.elements.length} elementos restaurados`);
                } catch (e) {
                    console.warn('No se pudieron cargar elementos:', e);
                    window.appState.elements = [];
                }
            }
            
            // 5. Cargar conexiones si existen
            if (window.appState && plane.connections) {
                try {
                    window.appState.connections = JSON.parse(JSON.stringify(plane.connections));
                } catch (e) {
                    console.warn('No se pudieron cargar conexiones:', e);
                }
            }
            
            // 6. Cargar escala
            if (plane.scale) {
                try {
                    if (window.appState) {
                        window.appState.currentScale = plane.scale;
                    }
                    
                    const scaleButtons = document.querySelectorAll('.btn-scale');
                    scaleButtons.forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.dataset.scale === plane.scale.replace('1:', '')) {
                            btn.classList.add('active');
                        }
                    });
                } catch (e) {
                    console.warn('No se pudo actualizar escala:', e);
                }
            }
            
            // 7. Cargar formato (INDEPENDIENTE POR PLANO)
            if (plane.format) {
                try {
                    if (window.appState) {
                        window.appState.currentFormat = plane.format;
                    }
                    
                    const formatBtns = document.querySelectorAll('.format-btn');
                    formatBtns.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    const activeBtn = plane.format === 'A0' ? 
                        document.getElementById('btnA0') : 
                        document.getElementById('btnA1');
                        
                    if (activeBtn) {
                        activeBtn.classList.add('active');
                    }
                    
                    const drawingBoard = document.getElementById('drawingBoard');
                    if (drawingBoard) {
                        drawingBoard.classList.remove('format-a0', 'format-a1');
                        drawingBoard.classList.add(`format-${plane.format.toLowerCase()}`);
                    }
                    
                    const svgPlano = document.getElementById('plano');
                    if (svgPlano) {
                        if (plane.format === 'A0') {
                            svgPlano.setAttribute('viewBox', '0 0 1189 841');
                            svgPlano.setAttribute('width', '1189mm');
                            svgPlano.setAttribute('height', '841mm');
                        } else if (plane.format === 'A1') {
                            svgPlano.setAttribute('viewBox', '0 0 841 594');
                            svgPlano.setAttribute('width', '841mm');
                            svgPlano.setAttribute('height', '594mm');
                        }
                    }
                    
                    console.log(`  ✓ Formato ${plane.format} aplicado al plano`);
                    
                } catch (e) {
                    console.warn('No se pudo actualizar formato:', e);
                }
            }
            
            // 8. Cargar modo
            if (plane.mode && window.appState) {
                try {
                    window.appState.mode = plane.mode;
                    if (window.PlaneManagerHelpers) {
                        window.PlaneManagerHelpers.updateModeButton();
                    }
                } catch (e) {
                    console.warn('No se pudo actualizar modo:', e);
                }
            }
            
            // 9. Cargar dirección
            try {
                const addressInput = document.getElementById('addressInput');
                if (addressInput) {
                    addressInput.value = plane.projectAddress || '';
                }
            } catch (e) {
                console.warn('No se pudo cargar dirección:', e);
            }
            
            // 10. Actualizar lista de elementos en el panel
            if (window.PlaneManagerHelpers) {
                window.PlaneManagerHelpers.updateElementList(plane);
            }
            
            // 11. Limpiar cálculos
            if (window.PlaneManagerHelpers) {
                window.PlaneManagerHelpers.resetCalculationsDisplay();
            }
            
            // 12. RE-INICIALIZAR CONTROLES DE ELEMENTOS INTEGRADOS
            setTimeout(() => {
                this.reinicializarControlesIntegrados();
            }, 200);
            
            console.log(`✅ Estado cargado completamente: ${plane.name}`);
            
        } catch (error) {
            console.error('❌ Error al cargar estado del plano:', error);
            alert('Hubo un error al cargar el plano. Intenta nuevamente.');
        }
    },
    
    // Re-inicializar controles interactivos de elementos integrados
    reinicializarControlesIntegrados() {
        console.log('🔄 Re-inicializando controles de elementos integrados...');
        
        try {
            const drawingBoard = document.getElementById('drawingBoard');
            if (!drawingBoard) return;
            
            // Re-inicializar Isométricos
            const isometricoN1 = drawingBoard.querySelector('#integratedIsometric');
            if (isometricoN1) {
                this.reinicializarControlIsometrico(isometricoN1, 'N1');
            }
            
            const isometricoN2 = drawingBoard.querySelector('#integratedIsometricN2');
            if (isometricoN2) {
                this.reinicializarControlIsometrico(isometricoN2, 'N2');
            }
            
            // Re-inicializar Simbologías
            const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
            simbologias.forEach((simb, index) => {
                this.reinicializarControlGenerico(simb, `Simbología ${index + 1}`);
            });
            
            // Re-inicializar Cuadros de Piezas
            const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
            cuadrosPiezas.forEach((cuadro, index) => {
                this.reinicializarControlGenerico(cuadro, `Cuadro Piezas ${index + 1}`);
            });
            
            // Re-inicializar Cuadros de Gastos
            const cuadrosGastos = drawingBoard.querySelectorAll('.cuadro-gastos-integrado');
            cuadrosGastos.forEach((cuadro, index) => {
                this.reinicializarControlGenerico(cuadro, `Cuadro Gastos ${index + 1}`);
            });
            
            // Re-inicializar Detalles AP
            const detalles = drawingBoard.querySelectorAll('.detalle-integrado-ap');
            detalles.forEach((detalle, index) => {
                this.reinicializarControlGenerico(detalle, `Detalle AP ${index + 1}`);
            });
            
            // Re-inicializar Notas Obligatorias
            const notasObligatorias = drawingBoard.querySelectorAll('.notas-integradas');
            notasObligatorias.forEach((notas, index) => {
                this.reinicializarControlNotas(notas, index);
            });
            
            console.log('✅ Controles de elementos integrados re-inicializados');
            
        } catch (error) {
            console.error('❌ Error al re-inicializar controles:', error);
        }
    },
    
    // Re-inicializar control de isométrico
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
                    if (typeof window.makeIntegratedIsometricDraggableN2 === 'function') {
                        window.makeIntegratedIsometricDraggableN2(elemento, dragHandle);
                    }
                    if (typeof window.makeIntegratedIsometricResizableN2 === 'function') {
                        window.makeIntegratedIsometricResizableN2(elemento, resizeHandle);
                    }
                }
                console.log(`  ✓ Isométrico ${nivel} controles re-inicializados`);
            }
        } catch (e) {
            console.warn(`No se pudieron re-inicializar controles de Isométrico ${nivel}:`, e);
        }
    },
    
    // Re-inicializar controles genéricos (drag basado en mousedown)
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
    
    // Re-inicializar controles de notas obligatorias
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

window.PlaneManagerState = PlaneManagerState;

console.log('✅ PlaneManagerState cargado');