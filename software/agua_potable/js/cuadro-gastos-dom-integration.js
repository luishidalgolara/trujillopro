// js/cuadro-gastos-dom-integration.js
function abrirCuadroGastosDom() {
    const modal = document.getElementById('modalCuadroGastos');
    const iframe = document.getElementById('iframeCuadroGastos');
    const titleElement = document.querySelector('.modal-cuadro-title');
    const ventana = document.getElementById('ventanaCuadroGastos');
    
    modal.style.cssText = '';
    ventana.style.cssText = '';
    iframe.style.cssText = '';
    ventana.classList.remove('integrado');
    
    titleElement.textContent = '📊 CUADRO DE GASTOS DOMICILIARIO';
    
    ventana.style.width = '80%';
    ventana.style.maxWidth = '900px';
    ventana.style.height = '85vh';
    ventana.style.transform = 'translateX(-50%)';
    
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.transform = 'scale(1)';
    
    iframe.src = 'cuadro-gastos-dom.html';
    
    iframe.onload = function() {
        setTimeout(() => {
            sincronizarCuadroConPlano();
        }, 300);
    };
    
    modal.classList.add('active');
    
    agregarBotonIntegrarCuadroGastos();
}

function sincronizarCuadroConPlano() {
    const iframe = document.getElementById('iframeCuadroGastos');
    const cuadroIntegrado = document.querySelector('.cuadro-gastos-integrado');
    
    let targetWindow = null;
    
    if (iframe && iframe.contentWindow) {
        targetWindow = iframe.contentWindow;
    } else if (cuadroIntegrado) {
        targetWindow = window;
    }
    
    if (!targetWindow) {
        console.warn('⚠️ No hay cuadro disponible para sincronizar');
        return;
    }
    
    let elementsArray = window.elements || window.elementsGlobal || [];
    
    console.log('📊 Total elementos detectados:', elementsArray.length);
    console.log('📊 Elementos completos:', elementsArray);
    
    const contadores = {
        'wc': 0,
        'ducha': 0,
        'bano-tina': 0,
        'lavatorio': 0,
        'bidet': 0,
        'urinario': 0,
        'lavaplatos': 0,
        'lavadero': 0,
        'lavadora': 0,
        'lavacopas': 0,
        'llave-jardin': 0
    };
    
    elementsArray.forEach(el => {
        console.log(`🔍 Procesando: tipo="${el.type}", nivel=${el.nivel}`);
        if (contadores.hasOwnProperty(el.type)) {
            contadores[el.type]++;
            console.log(`✅ Contador ${el.type} incrementado a ${contadores[el.type]}`);
        }
    });
    
    console.log('📊 Contadores finales:', contadores);
    
    Object.keys(contadores).forEach(type => {
        if (cuadroIntegrado) {
            const input = document.getElementById(`cant_${type}`);
            if (input) {
                input.value = contadores[type];
            }
            if (window.calcularTotales) {
                window.calcularTotales();
            }
        } else if (targetWindow.actualizarCantidad) {
            targetWindow.actualizarCantidad(type, contadores[type]);
            console.log(`📝 Actualizando ${type} = ${contadores[type]}`);
        }
    });
    
    console.log('✅ Sincronización completada');
}

function notificarCambioArtefacto(type, operacion) {
    const iframe = document.getElementById('iframeCuadroGastos');
    const cuadroIntegrado = document.querySelector('.cuadro-gastos-integrado');
    const modal = document.getElementById('modalCuadroGastos');
    
    const artefactosSanitarios = [
        'wc', 'ducha', 'bano-tina', 'lavatorio', 'bidet', 
        'urinario', 'lavaplatos', 'lavadero', 'lavadora', 
        'lavacopas', 'llave-jardin'
    ];
    
    if (!artefactosSanitarios.includes(type)) return;
    
    console.log(`🔔 Notificación cuadro: ${operacion} ${type}`);
    
    if (cuadroIntegrado) {
        const input = cuadroIntegrado.querySelector(`#cant_${type}`);
        if (input) {
            let valorActual = parseInt(input.value) || 0;
            if (operacion === 'agregar') {
                input.value = valorActual + 1;
            } else if (operacion === 'eliminar' && valorActual > 0) {
                input.value = valorActual - 1;
            }
            if (window.calcularTotales) {
                window.calcularTotales();
            }
        }
    } else if (iframe && iframe.contentWindow && modal && modal.classList.contains('active')) {
        const iframeWindow = iframe.contentWindow;
        if (operacion === 'agregar') {
            if (iframeWindow.incrementarArtefacto) {
                iframeWindow.incrementarArtefacto(type);
            }
        } else if (operacion === 'eliminar') {
            if (iframeWindow.decrementarArtefacto) {
                iframeWindow.decrementarArtefacto(type);
            }
        }
    }
    
    notificarMemoriaCalculo(type, operacion);
}

function notificarMemoriaCalculo(type, operacion) {
    const iframeMemoria = document.getElementById('iframeMemoriaCalculo');
    
    if (!iframeMemoria || !iframeMemoria.contentWindow) {
        return;
    }
    
    const memoriaWindow = iframeMemoria.contentWindow;
    
    if (!memoriaWindow.sincronizarDesdeAguaPotable && !memoriaWindow.actualizarCantidadMemoriaAguaPotable) {
        return;
    }
    
    let elementsArray = window.elements || window.elementsGlobal || [];
    
    const contadores = {
        'wc': 0,
        'ducha': 0,
        'bano-tina': 0,
        'lavatorio': 0,
        'bidet': 0,
        'urinario': 0,
        'lavaplatos': 0,
        'lavadero': 0,
        'lavadora': 0,
        'lavacopas': 0,
        'llave-jardin': 0
    };
    
    elementsArray.forEach(el => {
        if (contadores.hasOwnProperty(el.type)) {
            contadores[el.type]++;
        }
    });
    
    if (memoriaWindow.sincronizarDesdeAguaPotable) {
        memoriaWindow.sincronizarDesdeAguaPotable(elementsArray);
        console.log('📋 Memoria - Tabla GASTOS sincronizada desde AGUA POTABLE');
    } else {
        Object.keys(contadores).forEach(artefactoId => {
            if (memoriaWindow.actualizarCantidadMemoriaAguaPotable) {
                memoriaWindow.actualizarCantidadMemoriaAguaPotable(artefactoId, contadores[artefactoId]);
            }
        });
        console.log('📋 Memoria - Tabla GASTOS actualizada individualmente');
    }
}

function agregarBotonIntegrarCuadroGastos() {
    const header = document.getElementById('headerCuadroGastos');
    const existingBtn = header.querySelector('#btnIntegrarCuadroGastos');
    if (existingBtn) existingBtn.remove();
    
    const botonDiv = document.createElement('div');
    botonDiv.className = 'modal-cuadro-controls';
    botonDiv.innerHTML = `
        <button class="btn-modal-cuadro" id="btnIntegrarCuadroGastos" onclick="integrarCuadroGastosAlPlano()" title="Integrar cuadro al plano">
            📌 INTEGRAR AL PLANO
        </button>
    `;
    
    const headerButtons = header.querySelector('.modal-cuadro-buttons');
    header.insertBefore(botonDiv, headerButtons);
}

function integrarCuadroGastosAlPlano() {
    const iframe = document.getElementById('iframeCuadroGastos');
    const drawingBoard = document.getElementById('drawingBoard');
    const modal = document.getElementById('modalCuadroGastos');
    
    if (!iframe || !drawingBoard) return;
    
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const cuadroContainer = iframeDoc.getElementById('cuadroContainer');
        
        if (cuadroContainer) {
            const wrapper = document.createElement('div');
            wrapper.className = 'cuadro-gastos-integrado';
            wrapper.style.cssText = `
                position: absolute;
                left: 50px;
                top: 50px;
                width: 600px;
                cursor: move;
                z-index: 50;
                border: 2px solid #3498db;
                background: white;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                transform-origin: top left;
                transform: scale(1);
                pointer-events: auto;
            `;
            wrapper.dataset.bloqueado = 'false';
            wrapper.dataset.escala = '1';
            
            const styleTag = document.createElement('style');
            const iframeStyles = iframeDoc.querySelector('style');
            if (iframeStyles) {
                styleTag.textContent = iframeStyles.textContent;
            }
            
            const clonedCuadro = cuadroContainer.cloneNode(true);
            
            const h1 = clonedCuadro.querySelector('h1');
            if (h1) {
                h1.style.color = '#2c3e50';
                h1.style.borderBottom = '3px solid #3498db';
            }
            
            const subtitulo = clonedCuadro.querySelector('.subtitulo');
            if (subtitulo) {
                subtitulo.style.color = '#2c3e50';
                subtitulo.style.fontWeight = '700';
            }
            
            const thElements = clonedCuadro.querySelectorAll('th');
            thElements.forEach(th => {
                th.style.background = '#3498db';
                th.style.color = 'white';
                th.style.border = '2px solid #2c3e50';
            });
            
            const tdElements = clonedCuadro.querySelectorAll('td');
            tdElements.forEach(td => {
                td.style.color = '#2c3e50';
                td.style.fontWeight = '600';
            });
            
            const totalRow = clonedCuadro.querySelector('.total-row');
            if (totalRow) {
                totalRow.style.background = '#2c3e50';
                totalRow.style.color = 'white';
                const totalTds = totalRow.querySelectorAll('td');
                totalTds.forEach(td => {
                    td.style.color = 'white';
                    td.style.fontWeight = '700';
                });
            }
            
            const qmpResultado = clonedCuadro.querySelector('.qmp-resultado');
            if (qmpResultado) {
                qmpResultado.style.background = '#27ae60';
                qmpResultado.style.color = 'white';
            }
            
            const iframeScripts = iframeDoc.querySelectorAll('script');
            iframeScripts.forEach(script => {
                if (script.textContent.includes('calcular')) {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    clonedCuadro.appendChild(newScript);
                }
            });
            
            const controls = document.createElement('div');
            controls.style.cssText = `
                position: absolute;
                top: -35px;
                right: 0;
                background: #3498db;
                padding: 5px;
                border-radius: 4px;
                display: flex;
                gap: 5px;
                z-index: 10;
                pointer-events: auto;
            `;
            controls.innerHTML = `
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="cambiarTamanoCuadroGastos(this, 1.2)" title="Aumentar">🔍+</button>
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="cambiarTamanoCuadroGastos(this, 0.8)" title="Reducir">🔍-</button>
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="resetTamanoCuadroGastos(this)" title="Restaurar">↺</button>
                <button class="btn-bloqueo" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="bloquearCuadroGastos(this)" title="Bloquear">🔓</button>
                <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="eliminarCuadroGastos(this)" title="Eliminar">🗑️</button>
            `;
            
            wrapper.appendChild(styleTag);
            wrapper.appendChild(controls);
            wrapper.appendChild(clonedCuadro);
            
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;
            
            wrapper.addEventListener('mousedown', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                if (wrapper.dataset.bloqueado === 'true') return;
                
                isDragging = true;
                
                const rect = wrapper.getBoundingClientRect();
                const parentRect = drawingBoard.getBoundingClientRect();
                
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                wrapper.style.cursor = 'grabbing';
                e.preventDefault();
                e.stopPropagation();
            });
            
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                e.preventDefault();
                
                const parentRect = drawingBoard.getBoundingClientRect();
                let newLeft = e.clientX - parentRect.left - offsetX;
                let newTop = e.clientY - parentRect.top - offsetY;
                
                wrapper.style.left = newLeft + 'px';
                wrapper.style.top = newTop + 'px';
            });
            
            document.addEventListener('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    if (wrapper.dataset.bloqueado === 'false') {
                        wrapper.style.cursor = 'move';
                    }
                }
            });
            
            drawingBoard.appendChild(wrapper);
            
            cerrarCuadroGastos();
            
            setTimeout(() => {
                if (modal) {
                    modal.style.display = 'none';
                    modal.style.visibility = 'hidden';
                    modal.style.opacity = '0';
                    modal.style.pointerEvents = 'none';
                }
            }, 100);
            
            alert('✅ Cuadro integrado al plano');
        }
    } catch (error) {
        console.error('Error al integrar cuadro:', error);
        alert('❌ Error: ' + error.message);
    }
}

function cambiarTamanoCuadroGastos(btn, factor) {
    const wrapper = btn.closest('.cuadro-gastos-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.3 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.3 ? '⚠️ Tamaño mínimo' : '⚠️ Tamaño máximo');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
}

function resetTamanoCuadroGastos(btn) {
    const wrapper = btn.closest('.cuadro-gastos-integrado');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearCuadroGastos(btn) {
    const wrapper = btn.closest('.cuadro-gastos-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '2px solid #3498db';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '2px solid #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear';
    }
}

function eliminarCuadroGastos(btn) {
    if (confirm('¿Eliminar cuadro del plano?')) {
        const wrapper = btn.closest('.cuadro-gastos-integrado');
        wrapper.remove();
    }
}

function cerrarCuadroGastos() {
    const modal = document.getElementById('modalCuadroGastos');
    const iframe = document.getElementById('iframeCuadroGastos');
    const ventana = document.getElementById('ventanaCuadroGastos');
    
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
    }
    
    if (ventana) {
        ventana.style.cssText = '';
        ventana.classList.remove('integrado');
    }
    
    if (iframe) {
        iframe.src = '';
        iframe.style.cssText = '';
    }
    
    const btnIntegrar = document.getElementById('btnIntegrarCuadroGastos');
    if (btnIntegrar) btnIntegrar.remove();
}

window.abrirCuadroGastosDom = abrirCuadroGastosDom;
window.integrarCuadroGastosAlPlano = integrarCuadroGastosAlPlano;
window.cambiarTamanoCuadroGastos = cambiarTamanoCuadroGastos;
window.resetTamanoCuadroGastos = resetTamanoCuadroGastos;
window.bloquearCuadroGastos = bloquearCuadroGastos;
window.eliminarCuadroGastos = eliminarCuadroGastos;
window.cerrarCuadroGastos = cerrarCuadroGastos;
window.notificarCambioArtefacto = notificarCambioArtefacto;
window.sincronizarCuadroConPlano = sincronizarCuadroConPlano;
window.notificarMemoriaCalculo = notificarMemoriaCalculo;