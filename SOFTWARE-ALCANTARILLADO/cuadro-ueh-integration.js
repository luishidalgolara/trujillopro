// ============================================================
// CUADRO U.E.H - SISTEMA DE INTEGRACIÓN CON SINCRONIZACIÓN AUTOMÁTICA
// MODIFICADO: Ahora sincroniza con ambos niveles unificados + BOTÓN MANUAL
// ⭐ CORREGIDO: Guardado automático y clase correcta
// ============================================================

let cuadroActivo = false;

function abrirCuadroUEH() {
    if (cuadroActivo) {
        console.log('⚠️ Cuadro UEH ya está abierto');
        return;
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        console.error('❌ drawingBoard no encontrado');
        return;
    }
    
    const ventana = document.createElement('div');
    ventana.id = 'cuadroUEHWindow';
    ventana.className = 'vineta-window';
    ventana.style.cssText = `
        position: absolute;
        width: 80%;
        max-width: 900px;
        height: 85vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 100;
        display: flex;
        flex-direction: column;
    `;
    
    ventana.innerHTML = `
        <div id="cuadroHeader" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: #3498db;
            color: white;
            min-height: 40px;
            cursor: grab;
        ">
            <div style="font-size: 16px; font-weight: bold;">📊 CUADRO U.E.H</div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button onclick="sincronizarMemoriaManual()" style="
                    background: #9b59b6;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                " title="Sincronizar con Memoria de Cálculo">🔄 SINCRONIZAR MEMORIA</button>
                <button onclick="integrarCuadroAlPlano()" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                ">📌 INTEGRAR AL PLANO</button>
                <button onclick="cerrarCuadroUEH()" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 20px;
                    color: white;
                    cursor: pointer;
                ">✕</button>
            </div>
        </div>
        <div style="flex: 1; overflow: auto; position: relative;">
            <iframe id="cuadroIframe" src="cuadro-ueh.html" frameborder="0" style="
                width: 100%;
                height: 100%;
                border: none;
                display: block;
            "></iframe>
        </div>
    `;
    
    drawingBoard.appendChild(ventana);
    cuadroActivo = true;
    
    const iframe = document.getElementById('cuadroIframe');
    iframe.onload = function() {
        setTimeout(() => {
            sincronizarCuadroUEHConPlano();
        }, 300);
    };
    
    setTimeout(() => {
        inicializarArrastreCuadro();
    }, 100);
    
    console.log('✅ Cuadro UEH abierto');
}

/**
 * ⭐ NUEVA FUNCIÓN - Botón manual para sincronizar con memoria
 */
function sincronizarMemoriaManual() {
    const conteoUnificado = obtenerConteoTotalUnificado();
    sincronizarMemoriaAlcantarillado(conteoUnificado);
    
    // Feedback visual
    const btn = event.target;
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '✅ SINCRONIZADO';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
        btn.innerHTML = textoOriginal;
        btn.style.background = '#9b59b6';
    }, 2000);
}

/**
 * ⭐ FUNCIÓN MODIFICADA - Sincroniza con conteo UNIFICADO de ambos niveles
 * Y actualiza SOLO la tabla UEH en la memoria
 */
function sincronizarCuadroUEHConPlano() {
    const iframe = document.getElementById('cuadroIframe');
    if (!iframe || !iframe.contentWindow) {
        console.warn('⚠️ iframe UEH no disponible');
        return;
    }
    
    const iframeWindow = iframe.contentWindow;
    
    // ⭐ USAR CONTEO UNIFICADO (NIVEL 1 + NIVEL 2)
    let conteoUnificado;
    
    if (typeof window.obtenerConteoTotalUnificado === 'function') {
        conteoUnificado = window.obtenerConteoTotalUnificado();
        console.log('📊 UEH - Usando conteo unificado de ambos niveles');
    } else {
        console.log('📊 UEH - Fallback: contando desde arrays');
        conteoUnificado = contarDesdeArraysUnificados();
    }
    
    console.log('📊 UEH - Conteo unificado:', conteoUnificado);
    
    // Actualizar cada artefacto en el iframe
    Object.keys(conteoUnificado).forEach(tipo => {
        if (iframeWindow.actualizarCantidadUEH) {
            iframeWindow.actualizarCantidadUEH(tipo, conteoUnificado[tipo]);
        }
    });
    
    // ⭐ NUEVO: Sincronizar con MEMORIA DE CÁLCULO (solo tabla UEH)
    sincronizarMemoriaAlcantarillado(conteoUnificado);
    
    console.log('✅ Cuadro UEH sincronizado con ambos niveles');
}

/**
 * ⭐ MODIFICADO - Sincroniza SOLO tabla UEH en la memoria de ALCANTARILLADO
 */
function sincronizarMemoriaAlcantarillado(conteoUnificado) {
    const iframeMemoria = document.getElementById('iframeMemoriaAlc');
    
    if (!iframeMemoria || !iframeMemoria.contentWindow) {
        console.log('ℹ️ Memoria Alcantarillado no está abierta (esto es normal)');
        return;
    }
    
    const memoriaWindow = iframeMemoria.contentWindow;
    
    if (memoriaWindow.sincronizarDesdeAlcantarillado) {
        // Convertir conteo a array de elementos (formato esperado)
        const elementosArray = [];
        Object.keys(conteoUnificado).forEach(type => {
            for (let i = 0; i < conteoUnificado[type]; i++) {
                elementosArray.push({ type });
            }
        });
        
        memoriaWindow.sincronizarDesdeAlcantarillado(elementosArray);
        console.log('✅ Memoria ALCANTARILLADO (UEH) sincronizada');
    } else if (memoriaWindow.actualizarCantidadMemoriaAlcantarillado) {
        // Fallback: usar función individual
        Object.keys(conteoUnificado).forEach(tipo => {
            memoriaWindow.actualizarCantidadMemoriaAlcantarillado(tipo, conteoUnificado[tipo]);
        });
        console.log('✅ Memoria ALCANTARILLADO (UEH) actualizada individualmente');
    }
}

/**
 * ⭐ NUEVA FUNCIÓN - Cuenta artefactos desde arrays cuando no hay contadores
 */
function contarDesdeArraysUnificados() {
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
        'lavacopas': 0
    };
    
    // Contar elementos del NIVEL 1
    let elementsNivel1 = [];
    if (window.elements) {
        elementsNivel1 = window.elements;
    } else if (window.plans && window.plans[window.currentPlanIndex]) {
        elementsNivel1 = window.plans[window.currentPlanIndex].tracingElements || [];
    }
    
    elementsNivel1.forEach(el => {
        if (contadores.hasOwnProperty(el.type)) {
            contadores[el.type]++;
        }
    });
    
    console.log(`📊 UEH Nivel 1: ${elementsNivel1.length} elementos`);
    
    // Contar elementos del NIVEL 2
    const elementsNivel2 = window.ELEMENTOS_NIVEL_2 || [];
    elementsNivel2.forEach(el => {
        if (contadores.hasOwnProperty(el.type)) {
            contadores[el.type]++;
        }
    });
    
    console.log(`📊 UEH Nivel 2: ${elementsNivel2.length} elementos`);
    
    return contadores;
}

function notificarCambioArtefactoUEH(type, operacion) {
    const iframe = document.getElementById('cuadroIframe');
    const modal = document.getElementById('cuadroUEHWindow');
    
    const artefactosSanitarios = [
        'wc', 'ducha', 'bano-tina', 'lavatorio', 'bidet', 
        'urinario', 'lavaplatos', 'lavadero', 'lavadora', 
        'lavacopas'
    ];
    
    if (!artefactosSanitarios.includes(type)) return;
    
    console.log(`🔔 UEH - Notificación: ${operacion} ${type}`);
    
    if (iframe && iframe.contentWindow && modal) {
        const iframeWindow = iframe.contentWindow;
        if (operacion === 'agregar') {
            if (iframeWindow.incrementarArtefactoUEH) {
                iframeWindow.incrementarArtefactoUEH(type);
            }
        } else if (operacion === 'eliminar') {
            if (iframeWindow.decrementarArtefactoUEH) {
                iframeWindow.decrementarArtefactoUEH(type);
            }
        }
    }
}

function cerrarCuadroUEH() {
    const ventana = document.getElementById('cuadroUEHWindow');
    if (ventana) {
        ventana.remove();
        cuadroActivo = false;
        console.log('✅ Cuadro UEH cerrado');
    }
}

function inicializarArrastreCuadro() {
    const header = document.getElementById('cuadroHeader');
    const ventana = document.getElementById('cuadroUEHWindow');
    
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

function integrarCuadroAlPlano() {
    const drawingBoard = document.getElementById('drawingBoard');
    const iframe = document.getElementById('cuadroIframe');
    
    if (!drawingBoard || !iframe) return;
    
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const cuadroContainer = iframeDoc.getElementById('cuadroContainer');
        
        if (cuadroContainer) {
            const wrapper = document.createElement('div');
            // ⭐ CLASE CORREGIDA
            wrapper.className = 'cuadro-ueh-integrado';
            wrapper.style.cssText = `
                position: absolute;
                left: 50px;
                top: 50px;
                width: fit-content;
                max-width: 800px;
                cursor: pointer;
                z-index: 50;
                border: 2px solid transparent;
                background: white;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                transform-origin: top left;
                transform: scale(1);
                transition: border 0.2s;
            `;
            wrapper.dataset.bloqueado = 'false';
            wrapper.dataset.escala = '1';
            wrapper.dataset.seleccionado = 'false';
            
            const styleTag = document.createElement('style');
            const iframeStyles = iframeDoc.querySelector('style');
            if (iframeStyles) {
                let cssContent = iframeStyles.textContent;
                cssContent = cssContent.replace(/\* \{[^}]*\}/g, '');
                cssContent = cssContent.replace(/body \{[^}]*\}/g, '');
                cssContent = '.cuadro-ueh-integrado ' + cssContent.replace(/\n/g, '\n.cuadro-ueh-integrado ');
                styleTag.textContent = cssContent;
            }
            
            const clonedCuadro = cuadroContainer.cloneNode(true);
            
            const h1 = clonedCuadro.querySelector('h1');
            if (h1) {
                h1.style.color = '#2c3e50';
                h1.style.borderBottom = '3px solid #3498db';
            }
            
            const thElements = clonedCuadro.querySelectorAll('th');
            thElements.forEach(th => {
                th.style.background = '#3498db';
                th.style.color = 'white';
                th.style.border = '2px solid #2c3e50';
            });
            
            const tdElements = clonedCuadro.querySelectorAll('td');
            tdElements.forEach(td => {
                td.style.border = '1px solid #ddd';
                td.style.color = '#000';
            });
            
            const totalRow = clonedCuadro.querySelector('.total-row');
            if (totalRow) {
                totalRow.style.background = '#2c3e50';
                totalRow.style.color = 'white';
                const totalTds = totalRow.querySelectorAll('td');
                totalTds.forEach(td => {
                    td.style.color = 'white';
                    td.style.border = '2px solid #2c3e50';
                });
            }
            
            const totalGeneral = clonedCuadro.querySelector('.total-general');
            if (totalGeneral) {
                totalGeneral.style.color = '#27ae60';
            }
            
            const nota = clonedCuadro.querySelector('.nota');
            if (nota) {
                nota.style.background = '#fff3cd';
                nota.style.borderLeft = '5px solid #ffc107';
                nota.style.color = '#333';
                const notaStrong = nota.querySelector('strong');
                if (notaStrong) {
                    notaStrong.style.color = '#856404';
                }
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
            controls.className = 'cuadro-controls';
            controls.style.cssText = `
                position: absolute;
                top: -35px;
                right: 0;
                background: rgba(52, 152, 219, 0.95);
                padding: 5px;
                border-radius: 4px;
                display: flex;
                gap: 5px;
                z-index: 10;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s, visibility 0.2s;
                pointer-events: none;
            `;
            controls.innerHTML = `
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px; pointer-events: auto;" onclick="cambiarTamanoCuadro(this, 1.2)" title="Aumentar tamaño">🔍+</button>
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px; pointer-events: auto;" onclick="cambiarTamanoCuadro(this, 0.8)" title="Reducir tamaño">🔍-</button>
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px; pointer-events: auto;" onclick="resetTamanoCuadro(this)" title="Restaurar tamaño">↺</button>
                <button class="btn-bloqueo" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px; pointer-events: auto;" onclick="bloquearCuadro(this)" title="Bloquear posición">🔓</button>
                <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px; pointer-events: auto;" onclick="eliminarCuadro(this)" title="Eliminar cuadro">🗑️</button>
            `;
            
            wrapper.appendChild(styleTag);
            wrapper.appendChild(controls);
            wrapper.appendChild(clonedCuadro);
            
            wrapper.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                
                document.querySelectorAll('.cuadro-ueh-integrado').forEach(c => {
                    c.dataset.seleccionado = 'false';
                    c.style.border = '2px solid transparent';
                    const ctrl = c.querySelector('.cuadro-controls');
                    if (ctrl) {
                        ctrl.style.opacity = '0';
                        ctrl.style.visibility = 'hidden';
                        ctrl.style.pointerEvents = 'none';
                    }
                });
                
                wrapper.dataset.seleccionado = 'true';
                wrapper.style.border = '2px solid #3498db';
                controls.style.opacity = '1';
                controls.style.visibility = 'visible';
                controls.style.pointerEvents = 'auto';
                
                e.stopPropagation();
            });
            
            let isDragging = false;
            let currentX, currentY, initialX, initialY;
            
            wrapper.addEventListener('mousedown', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                if (wrapper.dataset.bloqueado === 'true') return;
                
                isDragging = true;
                const rect = wrapper.getBoundingClientRect();
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
                wrapper.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                    wrapper.style.left = currentX + 'px';
                    wrapper.style.top = currentY + 'px';
                }
            });
            
            document.addEventListener('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    if (wrapper.dataset.bloqueado === 'false') {
                        wrapper.style.cursor = 'pointer';
                    }
                }
            });
            
            drawingBoard.appendChild(wrapper);
            cerrarCuadroUEH();
            
            // ⭐ GUARDADO AUTOMÁTICO DEL PLANO
            setTimeout(() => {
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                    console.log('💾 Cuadro UEH guardado en plano actual');
                }
            }, 100);
            
            alert('✅ Cuadro U.E.H integrado exitosamente');
        }
    } catch (error) {
        console.error('Error al integrar cuadro:', error);
        alert('❌ Error al integrar el cuadro: ' + error.message);
    }
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.cuadro-ueh-integrado') && !e.target.closest('.cuadro-controls')) {
        document.querySelectorAll('.cuadro-ueh-integrado').forEach(wrapper => {
            wrapper.dataset.seleccionado = 'false';
            wrapper.style.border = '2px solid transparent';
            const controls = wrapper.querySelector('.cuadro-controls');
            if (controls) {
                controls.style.opacity = '0';
                controls.style.visibility = 'hidden';
                controls.style.pointerEvents = 'none';
            }
        });
    }
});

function cambiarTamanoCuadro(btn, factor) {
    const wrapper = btn.closest('.cuadro-ueh-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.3 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.3 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
    
    // ⭐ GUARDADO AUTOMÁTICO
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function resetTamanoCuadro(btn) {
    const wrapper = btn.closest('.cuadro-ueh-integrado');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
    
    // ⭐ GUARDADO AUTOMÁTICO
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function bloquearCuadro(btn) {
    const wrapper = btn.closest('.cuadro-ueh-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'pointer';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear posición';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear posición';
    }
    
    // ⭐ GUARDADO AUTOMÁTICO
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function eliminarCuadro(btn) {
    if (confirm('¿Estás seguro de eliminar este cuadro del plano?')) {
        const wrapper = btn.closest('.cuadro-ueh-integrado');
        wrapper.remove();
        
        // ⭐ GUARDADO AUTOMÁTICO
        setTimeout(() => {
            if (window.PlaneManagerCoreAlc) {
                window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            }
        }, 100);
    }
}

window.abrirCuadroUEH = abrirCuadroUEH;
window.cerrarCuadroUEH = cerrarCuadroUEH;
window.integrarCuadroAlPlano = integrarCuadroAlPlano;
window.cambiarTamanoCuadro = cambiarTamanoCuadro;
window.resetTamanoCuadro = resetTamanoCuadro;
window.bloquearCuadro = bloquearCuadro;
window.eliminarCuadro = eliminarCuadro;
window.notificarCambioArtefactoUEH = notificarCambioArtefactoUEH;
window.sincronizarCuadroUEHConPlano = sincronizarCuadroUEHConPlano;
window.sincronizarMemoriaAlcantarillado = sincronizarMemoriaAlcantarillado;
window.sincronizarMemoriaManual = sincronizarMemoriaManual;

console.log('✅ Cuadro UEH Handler con AUTO-SYNC + BOTÓN MANUAL + MEMORIA ALCANTARILLADO + GUARDADO AUTOMÁTICO inicializado');