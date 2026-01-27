/**
 * Módulo de guardado de estado para el sistema multi-plano
 * Funciones para guardar el estado completo de un plano
 */

const PlaneManagerStateSaveAlc = {
    
    saveCurrentPlaneState() {
        const currentPlane = PlaneStateAlc.getActivePlane();
        if (!currentPlane) return;
        
        try {
            console.log(`💾 Guardando estado completo de: ${currentPlane.name}`);
            
            // Guardar elementos del appState
            if (window.appState && window.appState.elements) {
                currentPlane.elements = JSON.parse(JSON.stringify(window.appState.elements));
                console.log(`  ✓ ${currentPlane.elements.length} elementos guardados`);
            }
            
            // Guardar escala
            if (window.appState && window.appState.currentScale) {
                currentPlane.scale = window.appState.currentScale;
            }
            
            // Guardar formato
            if (window.appState && window.appState.currentFormat) {
                currentPlane.format = window.appState.currentFormat;
            }
            
            // Guardar modo
            if (window.appState && window.appState.mode) {
                currentPlane.mode = window.appState.mode;
            }
            
            // Guardar dirección del proyecto
            const addressInput = document.getElementById('addressInput');
            if (addressInput) {
                currentPlane.projectAddress = addressInput.value;
            }
            
            // Guardar SVG
            const svgElement = document.getElementById('tracingSvg');
            if (svgElement) {
                try {
                    currentPlane.svgInnerHTML = svgElement.innerHTML;
                    console.log(`  ✓ SVG guardado (${currentPlane.svgInnerHTML.length} caracteres)`);
                } catch (e) {
                    console.warn('No se pudo guardar SVG innerHTML:', e);
                }
            }
            
            // Guardar elementos integrados
            this.guardarElementosIntegrados(currentPlane);
            
            // Guardar conexiones
            if (window.appState && window.appState.connections) {
                currentPlane.connections = JSON.parse(JSON.stringify(window.appState.connections));
            }
            
            console.log(`✅ Estado guardado completamente: ${currentPlane.name}`);
            
        } catch (error) {
            console.error('❌ Error al guardar estado del plano:', error);
        }
    },
    
    guardarElementosIntegrados(currentPlane) {
        const drawingBoard = document.getElementById('drawingBoard');
        const zoomContainer = document.getElementById('zoomContainer');
        
        if (!drawingBoard) return;
        
        const elementosIntegrados = {
            simbologia: [],
            cuadroPiezas: [],
            vineta: null,
            cuadroGastos: [],
            detalles: [],
            isometricoN1: null,
            isometricoN2: null,
            notasObligatorias: [],
            cuadroUEH: []
        };
        
        // Guardar simbologías
        const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
        simbologias.forEach(simb => {
            elementosIntegrados.simbologia.push({
                html: simb.outerHTML,
                left: simb.style.left,
                top: simb.style.top
            });
        });
        
        // Guardar cuadros de piezas
        const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
        cuadrosPiezas.forEach(cuadro => {
            elementosIntegrados.cuadroPiezas.push({
                html: cuadro.outerHTML,
                left: cuadro.style.left,
                top: cuadro.style.top
            });
        });
        
        // Guardar viñeta
        this.guardarVineta(elementosIntegrados, drawingBoard);
        
        // Guardar cuadros de gastos
        const cuadrosGastos = drawingBoard.querySelectorAll('.cuadro-gastos-integrado');
        cuadrosGastos.forEach(cuadro => {
            elementosIntegrados.cuadroGastos.push({
                html: cuadro.outerHTML,
                left: cuadro.style.left,
                top: cuadro.style.top
            });
        });
        
        // Guardar detalles
        const detallesAP = drawingBoard.querySelectorAll('.detalle-integrado-ap');
        const detallesALC = drawingBoard.querySelectorAll('.detalle-integrado-alc');
        const todosLosDetalles = [...detallesAP, ...detallesALC];
        
        todosLosDetalles.forEach(detalle => {
            elementosIntegrados.detalles.push({
                html: detalle.outerHTML,
                left: detalle.style.left,
                top: detalle.style.top
            });
        });
        
        // Guardar isométricos
        this.guardarIsometricos(elementosIntegrados, zoomContainer);
        
        // Guardar notas obligatorias
        const notasObligatorias = drawingBoard.querySelectorAll('.nota-plano-container');
        notasObligatorias.forEach(notas => {
            elementosIntegrados.notasObligatorias.push({
                html: notas.outerHTML,
                left: notas.style.left,
                top: notas.style.top,
                width: notas.style.width,
                height: notas.style.height,
                anclada: notas.getAttribute('data-anclada'),
                tipo: notas.getAttribute('data-tipo')
            });
        });
        if (notasObligatorias.length > 0) {
            console.log(`  ✓ ${notasObligatorias.length} nota(s) obligatoria(s) guardada(s)`);
        }
        
        // Guardar cuadros UEH
        const cuadrosUEH = drawingBoard.querySelectorAll('.cuadro-ueh-integrado');
        cuadrosUEH.forEach(cuadro => {
            elementosIntegrados.cuadroUEH.push({
                html: cuadro.outerHTML,
                left: cuadro.style.left,
                top: cuadro.style.top
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
            elementosIntegrados.notasObligatorias.length +
            elementosIntegrados.cuadroUEH.length;
        
        console.log(`  ✓ ${totalIntegrados} elementos integrados guardados`);
    },
    
    guardarVineta(elementosIntegrados, drawingBoard) {
        let vineta = drawingBoard.querySelector('#vinetaWindow');
        let estaIntegrada = true;
        
        if (!vineta) {
            const vinetaModal = document.getElementById('vinetaModal');
            if (vinetaModal && vinetaModal.classList.contains('active')) {
                vineta = vinetaModal.querySelector('#vinetaWindow');
                estaIntegrada = false;
            }
        }
        
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
                integrada: estaIntegrada,
                iframeData: iframeData,
                zoom: window.zoomVinetaActual || 1,
                posicion: {
                    left: vineta.style.left,
                    top: vineta.style.top,
                    width: vineta.style.width,
                    height: vineta.style.height
                }
            };
            
            console.log(`  ✓ Viñeta guardada (${estaIntegrada ? 'integrada' : 'modal'}, posición: ${vineta.style.left}, ${vineta.style.top})`);
        }
    },
    
    guardarIsometricos(elementosIntegrados, zoomContainer) {
        const isometricoN1 = zoomContainer ? zoomContainer.querySelector('#integratedIsometric') : null;
        if (isometricoN1) {
            elementosIntegrados.isometricoN1 = {
                html: isometricoN1.outerHTML,
                left: isometricoN1.style.left,
                top: isometricoN1.style.top,
                width: isometricoN1.style.width,
                height: isometricoN1.style.height,
                locked: isometricoN1.getAttribute('data-locked')
            };
            console.log(`  ✓ Isométrico N1 guardado (desde zoomContainer)`);
        }
        
        const isometricoN2 = zoomContainer ? zoomContainer.querySelector('#integratedIsometricN2') : null;
        if (isometricoN2) {
            elementosIntegrados.isometricoN2 = {
                html: isometricoN2.outerHTML,
                left: isometricoN2.style.left,
                top: isometricoN2.style.top,
                width: isometricoN2.style.width,
                height: isometricoN2.style.height,
                locked: isometricoN2.getAttribute('data-locked')
            };
            console.log(`  ✓ Isométrico N2 guardado (desde zoomContainer)`);
        }
    }
};

window.PlaneManagerStateSaveAlc = PlaneManagerStateSaveAlc;
console.log('✅ PlaneManagerStateSaveAlc cargado');