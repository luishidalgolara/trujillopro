// ARCHIVO: js/menu-detalles-ap.js (NUEVO - COMPLETO)

function toggleMenuDetallesAP() {
    const dropdown = document.getElementById('dropdownDetallesAP');
    dropdown.classList.toggle('active');
}

function abrirDetalleAP(archivo, titulo) {
    const modal = document.getElementById('modalDetallesAP');
    const iframe = document.getElementById('iframeDetallesAP');
    const titleElement = document.querySelector('.modal-detalle-title');
    const ventana = document.getElementById('ventanaDetallesAP');
    
    // LIMPIEZA PREVIA CRÍTICA
    modal.style.cssText = '';
    ventana.style.cssText = '';
    iframe.style.cssText = '';
    ventana.classList.remove('integrado');
    
    titleElement.textContent = `🔧 ${titulo}`;
    
    ventana.style.width = '70%';
    ventana.style.maxWidth = '1000px';
    ventana.style.height = '75vh';
    ventana.style.transform = 'translateX(-50%)';
    
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.transform = 'scale(0.7)';
    iframe.style.transformOrigin = 'center center';
    
    iframe.src = archivo;
    modal.classList.add('active');
    
    agregarBotonIntegrarAP();
    document.getElementById('dropdownDetallesAP').classList.remove('active');
}

function agregarBotonIntegrarAP() {
    const header = document.getElementById('headerDetallesAP');
    if (header.querySelector('#btnIntegrarDetalleAP')) return;
    
    const botonDiv = document.createElement('div');
    botonDiv.className = 'modal-detalle-controls';
    botonDiv.innerHTML = `
        <button class="btn-modal-detalle" id="btnIntegrarDetalleAP" onclick="integrarDetalleAlPlanoAP()" title="Integrar detalle al plano">
            📌 INTEGRAR AL PLANO
        </button>
    `;
    
    const headerButtons = header.querySelector('.modal-detalle-buttons');
    header.insertBefore(botonDiv, headerButtons);
}

function integrarDetalleAlPlanoAP() {
    const iframe = document.getElementById('iframeDetallesAP');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!iframe || !drawingBoard) return;
    
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const svg = iframeDoc.querySelector('svg');
        
        if (svg) {
            const wrapper = document.createElement('div');
            wrapper.className = 'detalle-integrado-ap';
            wrapper.style.position = 'absolute';
            wrapper.style.left = '50px';
            wrapper.style.top = '50px';
            wrapper.style.width = '400px';
            wrapper.style.cursor = 'move';
            wrapper.style.zIndex = '50';
            wrapper.style.border = '2px solid #3498db';
            wrapper.style.padding = '5px';
            wrapper.style.background = 'transparent';
            wrapper.dataset.bloqueado = 'false';
            
            const clonedSvg = svg.cloneNode(true);
            clonedSvg.style.width = '100%';
            clonedSvg.style.height = 'auto';
            clonedSvg.style.display = 'block';
            
            const controls = document.createElement('div');
            controls.style.position = 'absolute';
            controls.style.top = '-30px';
            controls.style.right = '0';
            controls.style.background = '#3498db';
            controls.style.padding = '5px';
            controls.style.borderRadius = '4px';
            controls.style.display = 'flex';
            controls.style.gap = '5px';
            controls.innerHTML = `
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px;" onclick="cambiarTamanoDetalleAP(this, 1.2)">🔍+</button>
                <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px;" onclick="cambiarTamanoDetalleAP(this, 0.8)">🔍-</button>
                <button class="btn-bloqueo" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px;" onclick="bloquearDetalleAP(this)">🔓</button>
                <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px;" onclick="eliminarDetalleAP(this)">🗑️</button>
            `;
            
            wrapper.appendChild(controls);
            wrapper.appendChild(clonedSvg);
            
            let isDragging = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;
            
            wrapper.addEventListener('mousedown', function(e) {
                if (e.target.tagName === 'BUTTON') return;
                if (wrapper.dataset.bloqueado === 'true') return;
                isDragging = true;
                initialX = e.clientX - parseInt(wrapper.style.left);
                initialY = e.clientY - parseInt(wrapper.style.top);
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
                isDragging = false;
            });
            
            drawingBoard.appendChild(wrapper);
            cerrarDetalleAP();
            alert('✅ Detalle integrado. Arrastra para mover, usa 🔍+/🔍- para cambiar tamaño, 🔓/🔒 para bloquear.');
        }
    } catch (error) {
        alert('❌ Error al integrar: ' + error.message);
    }
}

function cambiarTamanoDetalleAP(btn, factor) {
    const wrapper = btn.closest('.detalle-integrado-ap');
    const currentWidth = parseInt(wrapper.style.width);
    const newWidth = currentWidth * factor;
    wrapper.style.width = newWidth + 'px';
}

function bloquearDetalleAP(btn) {
    const wrapper = btn.closest('.detalle-integrado-ap');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '2px solid #3498db';
        btn.textContent = '🔓';
        btn.style.background = 'white';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '2px solid #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
    }
}

function eliminarDetalleAP(btn) {
    const wrapper = btn.closest('.detalle-integrado-ap');
    wrapper.remove();
}

function cerrarDetalleAP() {
    const modal = document.getElementById('modalDetallesAP');
    const iframe = document.getElementById('iframeDetallesAP');
    const ventana = document.getElementById('ventanaDetallesAP');
    
    if (modal) {
        modal.classList.remove('active');
        modal.style.cssText = '';
    }
    
    if (ventana) {
        ventana.style.cssText = '';
        ventana.classList.remove('integrado');
    }
    
    if (iframe) {
        iframe.src = '';
        iframe.style.cssText = '';
    }
    
    const btnIntegrar = document.getElementById('btnIntegrarDetalleAP');
    if (btnIntegrar) btnIntegrar.remove();
    
    console.log('✅ Modal de detalle cerrado');
}

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('dropdownDetallesAP');
    const btn = document.querySelector('.dropdown-detalles-ap-btn');
    
    if (dropdown && btn && !dropdown.contains(e.target) && e.target !== btn) {
        dropdown.classList.remove('active');
    }
});

window.toggleMenuDetallesAP = toggleMenuDetallesAP;
window.abrirDetalleAP = abrirDetalleAP;
window.integrarDetalleAlPlanoAP = integrarDetalleAlPlanoAP;
window.cambiarTamanoDetalleAP = cambiarTamanoDetalleAP;
window.bloquearDetalleAP = bloquearDetalleAP;
window.eliminarDetalleAP = eliminarDetalleAP;
window.cerrarDetalleAP = cerrarDetalleAP;
