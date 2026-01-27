function abrirCuadroPiezas() {
    const existingModal = document.getElementById('modalCuadroPiezas');
    if (existingModal) existingModal.remove();
    
    const modalHTML = `
        <div class="modal-cuadro-piezas active" id="modalCuadroPiezas">
            <div class="ventana-cuadro-piezas" id="ventanaCuadroPiezas">
                <div class="modal-cuadro-piezas-header" id="headerCuadroPiezas">
                    <div class="modal-cuadro-piezas-title">📋 CUADRO DE PIEZAS</div>
                    <div class="modal-cuadro-piezas-controls">
                        <button class="btn-modal-cuadro-piezas" onclick="integrarCuadroPiezasAlPlano()" title="Integrar al plano">
                            📌 INTEGRAR AL PLANO
                        </button>
                    </div>
                    <div class="modal-cuadro-piezas-buttons">
                        <button class="btn-modal-cuadro-piezas close" onclick="cerrarCuadroPiezas()">✕</button>
                    </div>
                </div>
                <div class="modal-cuadro-piezas-content">
                    <iframe id="iframeCuadroPiezas" src="cuadro-piezas/cuadro-piezas.html"></iframe>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function integrarCuadroPiezasAlPlano() {
    const iframe = document.getElementById('iframeCuadroPiezas');
    const drawingBoard = document.getElementById('drawingBoard');
    const modal = document.getElementById('modalCuadroPiezas');
    
    if (!iframe || !drawingBoard) return;
    
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const cuadroContainer = iframeDoc.querySelector('.container');
        
        if (cuadroContainer) {
            const wrapper = document.createElement('div');
            wrapper.className = 'cuadro-piezas-integrado';
            wrapper.style.cssText = `
                position: absolute;
                left: 50px;
                top: 50px;
                width: 1000px;
                cursor: move;
                z-index: 50;
                border: 3px solid #e67e22;
                background: white;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                transform-origin: top left;
                transform: scale(1);
                pointer-events: auto;
            `;
            wrapper.dataset.bloqueado = 'false';
            wrapper.dataset.escala = '1';
            
            // INYECTAR ESTILOS COMPLETOS
            const styleTag = document.createElement('style');
            styleTag.textContent = `
                .cuadro-piezas-integrado * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                .cuadro-piezas-integrado .container {
                    max-width: 100%;
                    margin: 0;
                    background: white;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                
                .cuadro-piezas-integrado h1 {
                    text-align: center;
                    color: #1a1a1a !important;
                    margin-bottom: 20px;
                    font-size: 28px;
                    font-weight: 900 !important;
                    text-decoration: underline;
                    letter-spacing: 2px;
                    border-bottom: 3px solid #e67e22;
                    padding-bottom: 15px;
                }
                
                .cuadro-piezas-integrado table {
                    width: 100%;
                    border-collapse: collapse;
                    border: 2px solid #000;
                }
                
                .cuadro-piezas-integrado thead {
                    background: #e67e22;
                }
                
                .cuadro-piezas-integrado th {
                    border: 1px solid #000;
                    padding: 12px 8px;
                    text-align: center;
                    font-weight: 900 !important;
                    font-size: 13px;
                    background: #e67e22 !important;
                    color: white !important;
                }
                
                .cuadro-piezas-integrado td {
                    border: 1px solid #000;
                    padding: 8px;
                    font-size: 11px;
                    vertical-align: top;
                    min-height: 30px;
                    color: #1a1a1a !important;
                    font-weight: 600 !important;
                    background: white;
                }
                
                .cuadro-piezas-integrado .col-num {
                    text-align: center;
                    font-weight: 900 !important;
                    width: 50px;
                    background: #f9fafb !important;
                    color: #000 !important;
                }
                
                .cuadro-piezas-integrado tr:nth-child(even) {
                    background: #fafafa;
                }
                
                .cuadro-piezas-integrado tr:hover {
                    background: #fff3e0;
                }
            `;
            
            const clonedCuadro = cuadroContainer.cloneNode(true);
            
            // ELIMINAR CONTROLES Y BOTONES
            const controls = clonedCuadro.querySelector('.controls');
            if (controls) controls.remove();
            
            const headerSection = clonedCuadro.querySelector('.header-section');
            if (headerSection) {
                const h1 = headerSection.querySelector('h1');
                headerSection.innerHTML = '';
                if (h1) headerSection.appendChild(h1);
            }
            
            const botonesEliminar = clonedCuadro.querySelectorAll('.btn-delete');
            botonesEliminar.forEach(btn => {
                const td = btn.closest('td');
                if (td) td.remove();
            });
            
            const thAcciones = clonedCuadro.querySelector('th:last-child');
            if (thAcciones && thAcciones.textContent.includes('ACCIONES')) {
                thAcciones.remove();
            }
            
            // FORZAR ESTILOS DIRECTOS
            const h1 = clonedCuadro.querySelector('h1');
            if (h1) {
                h1.style.cssText = `
                    color: #1a1a1a !important;
                    font-weight: 900 !important;
                    font-size: 28px !important;
                    text-align: center;
                    text-decoration: underline;
                    border-bottom: 3px solid #e67e22;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                `;
            }
            
            const thElements = clonedCuadro.querySelectorAll('th');
            thElements.forEach(th => {
                th.style.cssText = `
                    background: #e67e22 !important;
                    color: white !important;
                    font-weight: 900 !important;
                    padding: 12px 8px;
                    border: 1px solid #000;
                `;
            });
            
            const tdElements = clonedCuadro.querySelectorAll('td');
            tdElements.forEach(td => {
                td.style.cssText = `
                    color: #1a1a1a !important;
                    font-weight: 600 !important;
                    padding: 8px;
                    border: 1px solid #000;
                    background: white;
                `;
            });
            
            const colNums = clonedCuadro.querySelectorAll('.col-num');
            colNums.forEach(col => {
                col.style.cssText = `
                    color: #000 !important;
                    font-weight: 900 !important;
                    text-align: center;
                    background: #f9fafb !important;
                `;
            });
            
            // CONTROLES FLOTANTES
            const controlsDiv = document.createElement('div');
            controlsDiv.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: #e67e22;
                padding: 6px;
                border-radius: 6px;
                display: flex;
                gap: 6px;
                z-index: 100;
                pointer-events: auto;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            `;
            controlsDiv.innerHTML = `
                <button style="background: white; color: #e67e22; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="cambiarTamanoCuadroPiezas(this, 1.2)" title="Aumentar">🔍+</button>
                <button style="background: white; color: #e67e22; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="cambiarTamanoCuadroPiezas(this, 0.8)" title="Reducir">🔍-</button>
                <button style="background: white; color: #e67e22; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="resetTamanoCuadroPiezas(this)" title="Restaurar">↺</button>
                <button class="btn-bloqueo" style="background: white; color: #e67e22; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="bloquearCuadroPiezas(this)" title="Bloquear">🔓</button>
                <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="eliminarCuadroPiezas(this)" title="Eliminar">🗑️</button>
            `;
            
            wrapper.appendChild(styleTag);
            wrapper.appendChild(controlsDiv);
            wrapper.appendChild(clonedCuadro);
            
            // SISTEMA DE ARRASTRE
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;
            
            wrapper.addEventListener('mousedown', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                if (wrapper.dataset.bloqueado === 'true') return;
                
                isDragging = true;
                
                const rect = wrapper.getBoundingClientRect();
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
            
            cerrarCuadroPiezas();
            
            alert('✅ Cuadro de Piezas integrado al plano');
        }
    } catch (error) {
        console.error('Error al integrar cuadro de piezas:', error);
        alert('❌ Error: ' + error.message);
    }
}

function cambiarTamanoCuadroPiezas(btn, factor) {
    const wrapper = btn.closest('.cuadro-piezas-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.2 || nuevaEscala > 2) {
        alert(nuevaEscala < 0.2 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala.toFixed(2);
    wrapper.style.transform = `scale(${nuevaEscala})`;
    
    console.log('📏 Nueva escala:', nuevaEscala);
}

function resetTamanoCuadroPiezas(btn) {
    const wrapper = btn.closest('.cuadro-piezas-integrado');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearCuadroPiezas(btn) {
    const wrapper = btn.closest('.cuadro-piezas-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '3px solid #e67e22';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = '#e67e22';
        btn.title = 'Bloquear';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '3px solid #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear';
    }
}

function eliminarCuadroPiezas(btn) {
    if (confirm('¿Eliminar cuadro del plano?')) {
        const wrapper = btn.closest('.cuadro-piezas-integrado');
        wrapper.remove();
    }
}

function cerrarCuadroPiezas() {
    const modal = document.getElementById('modalCuadroPiezas');
    if (modal) {
        modal.remove();
    }
}

window.abrirCuadroPiezas = abrirCuadroPiezas;
window.integrarCuadroPiezasAlPlano = integrarCuadroPiezasAlPlano;
window.cambiarTamanoCuadroPiezas = cambiarTamanoCuadroPiezas;
window.resetTamanoCuadroPiezas = resetTamanoCuadroPiezas;
window.bloquearCuadroPiezas = bloquearCuadroPiezas;
window.eliminarCuadroPiezas = eliminarCuadroPiezas;
window.cerrarCuadroPiezas = cerrarCuadroPiezas;