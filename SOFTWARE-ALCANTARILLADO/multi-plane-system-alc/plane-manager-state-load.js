/**
 * Módulo de carga de estado para el sistema multi-plano
 * Funciones para cargar y restaurar el estado completo de un plano
 */

const PlaneManagerStateLoadAlc = {
    
    loadPlaneState(plane) {
        console.log(`📂 Cargando estado completo de: ${plane.name}`);
        
        try {
            // Limpiar canvas y elementos actuales
            if (window.PlaneManagerCleanupAlc) {
                window.PlaneManagerCleanupAlc.clearCanvas();
                window.PlaneManagerCleanupAlc.clearIntegratedElements();
                window.PlaneManagerCleanupAlc.resetIntegratedStates();
            }
            
            // Restaurar SVG
            this.restaurarSVG(plane);
            
            // Restaurar elementos integrados
            this.restaurarElementosIntegrados(plane);
            
            // Restaurar elementos del appState
            this.restaurarAppState(plane);
            
            // Restaurar escala y formato
            this.restaurarEscalaYFormato(plane);
            
            // Restaurar modo
            this.restaurarModo(plane);
            
            // Restaurar dirección
            this.restaurarDireccion(plane);
            
            // Actualizar UI
            if (window.PlaneManagerHelpersAlc) {
                window.PlaneManagerHelpersAlc.updateElementList(plane);
                window.PlaneManagerHelpersAlc.resetCalculationsDisplay();
            }
            
            // Re-inicializar controles
            setTimeout(() => {
                if (window.PlaneManagerStateControlsAlc) {
                    window.PlaneManagerStateControlsAlc.reinicializarControlesIntegrados();
                }
            }, 200);
            
            console.log(`✅ Estado cargado completamente: ${plane.name}`);
            
        } catch (error) {
            console.error('❌ Error al cargar estado del plano:', error);
            alert('Hubo un error al cargar el plano. Intenta nuevamente.');
        }
    },
    
    restaurarSVG(plane) {
        const svgElement = document.getElementById('tracingSvg');
        if (svgElement && plane.svgInnerHTML) {
            try {
                svgElement.innerHTML = plane.svgInnerHTML;
                console.log(`  ✓ SVG restaurado (${plane.svgInnerHTML.length} caracteres)`);
            } catch (e) {
                console.warn('No se pudo restaurar SVG innerHTML:', e);
            }
        } else if (window.PlaneManagerCleanupAlc) {
            window.PlaneManagerCleanupAlc.createEmptyCanvas();
        }
    },
    
    restaurarElementosIntegrados(plane) {
        const drawingBoard = document.getElementById('drawingBoard');
        const zoomContainer = document.getElementById('zoomContainer');
        
        if (!drawingBoard || !plane.elementosIntegrados) return;
        
        const elementos = plane.elementosIntegrados;
        
        // Restaurar simbologías
        if (elementos.simbologia && elementos.simbologia.length > 0) {
            elementos.simbologia.forEach(simb => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = simb.html;
                const elemento = tempDiv.firstChild;
                drawingBoard.appendChild(elemento);
            });
            console.log(`  ✓ ${elementos.simbologia.length} simbología(s) restaurada(s)`);
        }
        
        // Restaurar cuadros de piezas
        if (elementos.cuadroPiezas && elementos.cuadroPiezas.length > 0) {
            elementos.cuadroPiezas.forEach(cuadro => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cuadro.html;
                const elemento = tempDiv.firstChild;
                drawingBoard.appendChild(elemento);
            });
            console.log(`  ✓ ${elementos.cuadroPiezas.length} cuadro(s) de piezas restaurado(s)`);
        }
        
        // Restaurar viñeta
        this.restaurarVineta(elementos);
        
        // Restaurar cuadros de gastos
        if (elementos.cuadroGastos && elementos.cuadroGastos.length > 0) {
            elementos.cuadroGastos.forEach(cuadro => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cuadro.html;
                const elemento = tempDiv.firstChild;
                drawingBoard.appendChild(elemento);
            });
            console.log(`  ✓ ${elementos.cuadroGastos.length} cuadro(s) de gastos restaurado(s)`);
        }
        
        // Restaurar detalles
        if (elementos.detalles && elementos.detalles.length > 0) {
            elementos.detalles.forEach(detalle => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = detalle.html;
                const elemento = tempDiv.firstChild;
                drawingBoard.appendChild(elemento);
            });
            console.log(`  ✓ ${elementos.detalles.length} detalle(s) restaurado(s)`);
        }
        
        // Restaurar isométricos
        this.restaurarIsometricos(elementos, zoomContainer);
        
        // Restaurar notas obligatorias
        if (elementos.notasObligatorias && elementos.notasObligatorias.length > 0) {
            elementos.notasObligatorias.forEach(notas => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = notas.html;
                const elemento = tempDiv.firstChild;
                drawingBoard.appendChild(elemento);
                
                // Restaurar controles de arrastre y redimensión
                setTimeout(() => {
                    if (typeof window.inicializarArrastreNota === 'function') {
                        window.inicializarArrastreNota(elemento);
                    }
                    if (typeof window.inicializarRedimensionNota === 'function') {
                        window.inicializarRedimensionNota(elemento);
                    }
                    if (typeof window.actualizarFontSize === 'function') {
                        window.actualizarFontSize(elemento);
                    }
                }, 100);
            });
            console.log(`  ✓ ${elementos.notasObligatorias.length} nota(s) obligatoria(s) restaurada(s)`);
        }
        
        // Restaurar cuadros UEH
        if (elementos.cuadroUEH && elementos.cuadroUEH.length > 0) {
            elementos.cuadroUEH.forEach(cuadro => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cuadro.html;
                const elemento = tempDiv.firstChild;
                drawingBoard.appendChild(elemento);
            });
            console.log(`  ✓ ${elementos.cuadroUEH.length} cuadro(s) UEH restaurado(s)`);
        }
    },
    
    restaurarVineta(elementos) {
        if (!elementos.vineta || !elementos.vineta.existe) return;
        
        console.log('🔄 Restaurando viñeta...');
        
        // Limpiar viñetas existentes
        const vinetaEnDrawing = document.querySelector('#drawingBoard #vinetaWindow');
        if (vinetaEnDrawing) {
            console.log('  🗑️ Eliminando viñeta del drawingBoard...');
            vinetaEnDrawing.remove();
        }
        
        const vinetaEnModal = document.querySelector('#vinetaModal #vinetaWindow');
        if (vinetaEnModal) {
            console.log('  🗑️ Eliminando viñeta del modal...');
            vinetaEnModal.remove();
        }
        
        if (typeof window.abrirVineta === 'function') {
            setTimeout(() => {
                try {
                    window.abrirVineta();
                    
                    setTimeout(() => {
                        let vinetaRestaurada = document.querySelector('#drawingBoard #vinetaWindow');
                        if (!vinetaRestaurada) {
                            vinetaRestaurada = document.querySelector('#vinetaModal #vinetaWindow');
                        }
                        
                        if (!vinetaRestaurada) {
                            console.error('❌ Error: viñeta no se creó correctamente');
                            return;
                        }
                        
                        console.log('  ✓ Viñeta encontrada y restaurada');
                        
                        if (elementos.vineta.posicion) {
                            const pos = elementos.vineta.posicion;
                            if (pos.left) vinetaRestaurada.style.left = pos.left;
                            if (pos.top) vinetaRestaurada.style.top = pos.top;
                            if (pos.width) vinetaRestaurada.style.width = pos.width;
                            if (pos.height) vinetaRestaurada.style.height = pos.height;
                            console.log(`  ✓ Viñeta posicionada en: ${pos.left}, ${pos.top}`);
                        }
                        
                        if (elementos.vineta.iframeData) {
                            setTimeout(() => {
                                const iframe = document.getElementById('vinetaIframe');
                                if (iframe && iframe.contentWindow) {
                                    try {
                                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                                        if (iframeDoc) {
                                            Object.keys(elementos.vineta.iframeData).forEach(id => {
                                                const input = iframeDoc.getElementById(id);
                                                if (input) {
                                                    input.value = elementos.vineta.iframeData[id];
                                                }
                                            });
                                            console.log('  ✓ Datos de viñeta restaurados');
                                        }
                                    } catch (e) {
                                        console.warn('No se pudieron restaurar datos del iframe:', e);
                                    }
                                }
                            }, 400);
                        }
                        
                        if (elementos.vineta.zoom && elementos.vineta.zoom !== 1) {
                            setTimeout(() => {
                                if (typeof window.cambiarZoomVineta === 'function') {
                                    const delta = elementos.vineta.zoom - 1;
                                    window.cambiarZoomVineta(delta);
                                    console.log(`  ✓ Zoom restaurado: ${elementos.vineta.zoom}`);
                                }
                            }, 500);
                        }
                        
                        console.log('  ✅ Viñeta restaurada completamente');
                        
                    }, 350);
                    
                } catch (error) {
                    console.error('❌ Error al restaurar viñeta:', error);
                }
            }, 150);
        } else {
            console.error('❌ Función abrirVineta no disponible');
        }
    },
    
    restaurarIsometricos(elementos, zoomContainer) {
        if (elementos.isometricoN1 && zoomContainer) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = elementos.isometricoN1.html;
            const elemento = tempDiv.firstChild;
            zoomContainer.appendChild(elemento);
            console.log(`  ✓ Isométrico Nivel 1 restaurado (en zoomContainer)`);
            
            if (window.isometricGenerator) {
                window.isometricGenerator.isIntegrated = true;
            }
        }
        
        if (elementos.isometricoN2 && zoomContainer) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = elementos.isometricoN2.html;
            const elemento = tempDiv.firstChild;
            zoomContainer.appendChild(elemento);
            console.log(`  ✓ Isométrico Nivel 2 restaurado (en zoomContainer)`);
            
            if (window.isometricGeneratorN2) {
                window.isometricGeneratorN2.isIntegrated = true;
            }
            if (window.isometricNivel2Generator) {
                window.isometricNivel2Generator.isIntegrated = true;
            }
        }
    },
    
    restaurarAppState(plane) {
        if (window.appState) {
            try {
                window.appState.elements = JSON.parse(JSON.stringify(plane.elements));
                console.log(`  ✓ ${plane.elements.length} elementos restaurados`);
            } catch (e) {
                console.warn('No se pudieron cargar elementos:', e);
                window.appState.elements = [];
            }
        }
        
        if (window.appState && plane.connections) {
            try {
                window.appState.connections = JSON.parse(JSON.stringify(plane.connections));
            } catch (e) {
                console.warn('No se pudieron cargar conexiones:', e);
            }
        }
    },
    
    restaurarEscalaYFormato(plane) {
        // Restaurar escala
        if (plane.scale) {
            try {
                if (window.appState) {
                    window.appState.currentScale = plane.scale;
                }
                
                const scaleButtons = document.querySelectorAll('.scale-btn');
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
        
        // Restaurar formato
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
                
                const svgPlano = document.getElementById('tracingSvg');
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
    },
    
    restaurarModo(plane) {
        if (plane.mode && window.appState) {
            try {
                window.appState.mode = plane.mode;
                if (window.PlaneManagerHelpersAlc) {
                    window.PlaneManagerHelpersAlc.updateModeButton();
                }
            } catch (e) {
                console.warn('No se pudo actualizar modo:', e);
            }
        }
    },
    
    restaurarDireccion(plane) {
        try {
            const addressInput = document.getElementById('addressInput');
            if (addressInput) {
                addressInput.value = plane.projectAddress || '';
            }
        } catch (e) {
            console.warn('No se pudo cargar dirección:', e);
        }
    }
};

window.PlaneManagerStateLoadAlc = PlaneManagerStateLoadAlc;
console.log('✅ PlaneManagerStateLoadAlc cargado');