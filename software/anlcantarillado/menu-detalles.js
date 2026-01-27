// ARCHIVO: menu-detalles.js (CORREGIDO - CLASE CORRECTA)

function toggleMenuDetalles() {
    const dropdown = document.getElementById('dropdownDetalles');
    dropdown.classList.toggle('active');
}

function abrirDetalle(archivo, titulo) {
    let modal = document.getElementById('modalDetalles');
    
    if (!modal) {
        console.log('🔧 Creando modal de detalles...');
        modal = document.createElement('div');
        modal.id = 'modalDetalles';
        modal.className = 'vineta-modal';
        modal.innerHTML = `
            <div class="vineta-window" id="detalleWindow" style="width: 70%; max-width: 1000px; height: 75vh;">
                <div class="vineta-header" id="detalleHeader" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background: #3498db; color: white;">
                    <div class="vineta-title" id="detalleTitle">🔧 Detalle</div>
                    <div class="vineta-header-buttons" style="display: flex; gap: 10px; align-items: center;">
                        <button class="vineta-btn-header close" onclick="cerrarModalDetalle()" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-weight: bold;">✕</button>
                    </div>
                </div>
                <div class="vineta-content" style="flex: 1; overflow: auto; position: relative;">
                    <iframe id="detalleIframe" src="" frameborder="0" style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            </div>
        `;
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        `;
        document.body.appendChild(modal);
        console.log('✅ Modal de detalles creado');
    }
    
    const ventana = modal.querySelector('#detalleWindow');
    const iframe = modal.querySelector('#detalleIframe');
    const titleElement = modal.querySelector('#detalleTitle');
    const header = modal.querySelector('#detalleHeader');
    
    if (!iframe || !titleElement || !ventana || !header) {
        console.error('❌ Error crítico: No se pudo crear el modal correctamente');
        alert('❌ Error crítico al abrir detalle. Contacta soporte.');
        return;
    }
    
    modal.style.display = 'flex';
    titleElement.textContent = `🔧 ${titulo}`;
    iframe.src = archivo;
    
    limpiarBotonesIntegracionDetalle();
    
    setTimeout(() => {
        agregarBotonIntegrarDetalle();
    }, 100);
    
    const dropdown = document.getElementById('dropdownDetalles');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    
    console.log(`✅ Detalle abierto: ${titulo}`);
}

function limpiarBotonesIntegracionDetalle() {
    const modal = document.getElementById('modalDetalles');
    if (!modal) return;
    
    const header = modal.querySelector('#detalleHeader');
    if (!header) return;
    
    const botonesExistentes = header.querySelectorAll('.btn-integrar-detalle, .vineta-scale-controls');
    botonesExistentes.forEach(btn => btn.remove());
}

function agregarBotonIntegrarDetalle() {
    const modal = document.getElementById('modalDetalles');
    if (!modal) return;
    
    const header = modal.querySelector('#detalleHeader');
    if (!header) return;
    
    let headerButtons = header.querySelector('.vineta-header-buttons');
    if (!headerButtons) {
        headerButtons = document.createElement('div');
        headerButtons.className = 'vineta-header-buttons';
        headerButtons.style.cssText = 'display: flex; gap: 10px; align-items: center;';
        header.appendChild(headerButtons);
    }
    
    if (header.querySelector('.btn-integrar-detalle')) {
        return;
    }
    
    const btnIntegrar = document.createElement('button');
    btnIntegrar.className = 'btn-integrar-detalle';
    btnIntegrar.onclick = integrarDetalleAlPlano;
    btnIntegrar.title = 'Integrar detalle al plano';
    btnIntegrar.style.cssText = `
        background: #27ae60;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        font-size: 13px;
    `;
    btnIntegrar.textContent = '📌 INTEGRAR AL PLANO';
    
    header.insertBefore(btnIntegrar, headerButtons);
}

function integrarDetalleAlPlano() {
    const modal = document.getElementById('modalDetalles');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!modal || !drawingBoard) {
        alert('❌ Error: No se encontró el modal o el área de dibujo');
        return;
    }
    
    const iframe = modal.querySelector('#detalleIframe');
    if (!iframe) {
        alert('❌ Error: No se encontró el iframe del detalle');
        return;
    }
    
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const svg = iframeDoc.querySelector('svg');
        
        if (!svg) {
            alert('❌ No se encontró SVG en el detalle');
            return;
        }
        
        const wrapper = document.createElement('div');
        // ⭐ CLASE CORREGIDA: detalle-integrado-alc (para alcantarillado)
        wrapper.className = 'detalle-integrado-alc';
        wrapper.style.cssText = `
            position: absolute;
            left: 50px;
            top: 50px;
            width: 400px;
            cursor: pointer;
            z-index: 50;
            border: 2px solid transparent;
            padding: 5px;
            background: transparent;
            transition: border 0.2s;
        `;
        wrapper.dataset.bloqueado = 'false';
        wrapper.dataset.seleccionado = 'false';
        
        const clonedSvg = svg.cloneNode(true);
        clonedSvg.style.width = '100%';
        clonedSvg.style.height = 'auto';
        clonedSvg.style.display = 'block';
        clonedSvg.style.pointerEvents = 'none';
        
        const controls = document.createElement('div');
        controls.className = 'detalle-controls';
        controls.style.cssText = `
            position: absolute;
            top: -35px;
            right: 0;
            background: rgba(52, 152, 219, 0.95);
            padding: 5px;
            border-radius: 4px;
            display: flex;
            gap: 5px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s, visibility 0.2s;
            pointer-events: none;
        `;
        controls.innerHTML = `
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-size: 12px; pointer-events: auto;" onclick="cambiarTamanoDetalle(this, 1.2)" title="Aumentar">🔍+</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-size: 12px; pointer-events: auto;" onclick="cambiarTamanoDetalle(this, 0.8)" title="Reducir">🔍-</button>
            <button class="btn-bloqueo" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-size: 12px; pointer-events: auto;" onclick="bloquearDetalle(this)" title="Bloquear">🔓</button>
            <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-size: 12px; pointer-events: auto;" onclick="eliminarDetalle(this)" title="Eliminar">🗑️</button>
        `;
        
        wrapper.appendChild(clonedSvg);
        wrapper.appendChild(controls);
        
        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        
        wrapper.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            
            document.querySelectorAll('.detalle-integrado-alc').forEach(d => {
                d.dataset.seleccionado = 'false';
                d.style.border = '2px solid transparent';
                const ctrl = d.querySelector('.detalle-controls');
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
        
        wrapper.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            if (wrapper.dataset.bloqueado === 'true') return;
            
            isDragging = true;
            initialX = e.clientX - parseInt(wrapper.style.left);
            initialY = e.clientY - parseInt(wrapper.style.top);
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
        cerrarModalDetalle();
        
        // ⭐ GUARDADO AUTOMÁTICO DEL PLANO
        setTimeout(() => {
            if (window.PlaneManagerCoreAlc) {
                window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                console.log('💾 Detalle guardado en plano actual');
            }
        }, 100);
        
        alert('✅ Detalle integrado\n\n' +
              '🖱️ Click para mostrar controles\n' +
              '🔍+/🔍- Cambiar tamaño\n' +
              '🔓/🔒 Bloquear posición\n' +
              '🗑️ Eliminar');
              
    } catch (error) {
        console.error('Error al integrar detalle:', error);
        alert('❌ Error al integrar: ' + error.message);
    }
}

function cerrarModalDetalle() {
    const modal = document.getElementById('modalDetalles');
    if (modal) {
        modal.style.display = 'none';
        const iframe = modal.querySelector('#detalleIframe');
        if (iframe) {
            iframe.src = '';
        }
    }
}

function cambiarTamanoDetalle(btn, factor) {
    const wrapper = btn.closest('.detalle-integrado-alc');
    const currentWidth = parseInt(wrapper.style.width);
    const newWidth = currentWidth * factor;
    wrapper.style.width = newWidth + 'px';
    
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function bloquearDetalle(btn) {
    const wrapper = btn.closest('.detalle-integrado-alc');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'pointer';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
    }
    
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        }
    }, 100);
}

function eliminarDetalle(btn) {
    if (confirm('¿Eliminar este detalle del plano?')) {
        const wrapper = btn.closest('.detalle-integrado-alc');
        wrapper.remove();
        
        setTimeout(() => {
            if (window.PlaneManagerCoreAlc) {
                window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            }
        }, 100);
    }
}

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('dropdownDetalles');
    const btn = document.querySelector('.dropdown-detalles-btn');
    
    if (dropdown && !dropdown.contains(e.target) && e.target !== btn) {
        dropdown.classList.remove('active');
    }
    
    if (!e.target.closest('.detalle-integrado-alc') && !e.target.closest('.detalle-controls')) {
        document.querySelectorAll('.detalle-integrado-alc').forEach(wrapper => {
            wrapper.dataset.seleccionado = 'false';
            wrapper.style.border = '2px solid transparent';
            const controls = wrapper.querySelector('.detalle-controls');
            if (controls) {
                controls.style.opacity = '0';
                controls.style.visibility = 'hidden';
                controls.style.pointerEvents = 'none';
            }
        });
    }
});

window.toggleMenuDetalles = toggleMenuDetalles;
window.abrirDetalle = abrirDetalle;
window.integrarDetalleAlPlano = integrarDetalleAlPlano;
window.cerrarModalDetalle = cerrarModalDetalle;
window.cambiarTamanoDetalle = cambiarTamanoDetalle;
window.bloquearDetalle = bloquearDetalle;
window.eliminarDetalle = eliminarDetalle;

console.log('✅ Sistema de detalles inicializado');