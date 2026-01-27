// ============================================================
// ISOMÉTRICO INTEGRACIÓN - Integración al plano y controles
// ============================================================

function integrarIsometricoAlPlano() {
    const windowElement = document.getElementById('isometricWindow');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!windowElement || !drawingBoard) {
        alert('❌ No se encontró la ventana isométrica o el área de trabajo');
        return;
    }
    
    try {
        // Obtener el SVG del isométrico actual
        const svgOriginal = windowElement.querySelector('#isometricSVG');
        if (!svgOriginal) {
            alert('❌ No se encontró el SVG del isométrico');
            return;
        }
        
        // Crear wrapper para el isométrico integrado
        const wrapper = document.createElement('div');
        wrapper.className = 'isometrico-integrado';
        wrapper.style.cssText = `
            position: absolute;
            left: 50px;
            top: 50px;
            width: 600px;
            cursor: move;
            z-index: 50;
            border: none;
            background: transparent;
            padding: 0;
            transform-origin: top left;
            transform: scale(1);
            overflow: visible;
        `;
        wrapper.dataset.bloqueado = 'false';
        wrapper.dataset.escala = '1';
        
        // Clonar el SVG
        const svgClonado = svgOriginal.cloneNode(true);
        svgClonado.setAttribute('width', '100%');
        svgClonado.setAttribute('height', 'auto');
        svgClonado.style.display = 'block';
        svgClonado.style.background = 'transparent';
        
        // Crear contenedor para el SVG
        const contenedor = document.createElement('div');
        contenedor.style.cssText = 'padding: 0; background: transparent;';
        contenedor.appendChild(svgClonado);
        
        // Crear controles
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(102, 126, 234, 0.95);
            padding: 4px;
            border-radius: 6px;
            display: flex;
            gap: 4px;
            z-index: 100;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        controls.innerHTML = `
            <button style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="cambiarTamanoIsometrico(this, 1.2)" title="Aumentar tamaño">🔼</button>
            <button style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="cambiarTamanoIsometrico(this, 0.8)" title="Reducir tamaño">🔽</button>
            <button style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="resetTamanoIsometrico(this)" title="Restaurar tamaño">↺</button>
            <button class="btn-bloqueo-isometrico" style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="bloquearIsometrico(this)" title="Bloquear posición">🔓</button>
            <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="eliminarIsometrico(this)" title="Eliminar isométrico">🗑️</button>
        `;
        
        wrapper.appendChild(controls);
        wrapper.appendChild(contenedor);
        
        // Sistema de arrastre
        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        
        wrapper.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            if (wrapper.dataset.bloqueado === 'true') return;
            
            isDragging = true;
            const rect = wrapper.getBoundingClientRect();
            const parentRect = drawingBoard.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            wrapper.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                e.preventDefault();
                const parentRect = drawingBoard.getBoundingClientRect();
                currentX = e.clientX - parentRect.left - initialX;
                currentY = e.clientY - parentRect.top - initialY;
                wrapper.style.left = currentX + 'px';
                wrapper.style.top = currentY + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                if (wrapper.dataset.bloqueado === 'false') {
                    wrapper.style.cursor = 'move';
                }
            }
        });
        
        // Agregar al plano
        drawingBoard.appendChild(wrapper);
        
        // Cerrar ventana flotante
        if (typeof IsometricUI !== 'undefined' && IsometricUI.close) {
            IsometricUI.close();
        }
        
        alert('✅ Isométrico integrado exitosamente\n\n' +
              '🖱️ Arrastra para mover\n' +
              '🔼/🔽 Cambia el tamaño\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina el isométrico');
              
        console.log('✅ Isométrico integrado al plano');
        
    } catch (error) {
        console.error('Error al integrar isométrico:', error);
        alert('❌ Error al integrar el isométrico: ' + error.message);
    }
}

function cambiarTamanoIsometrico(btn, factor) {
    const wrapper = btn.closest('.isometrico-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.3 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.3 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
    
    // 📏 MOSTRAR INDICADOR DE PORCENTAJE
    const porcentaje = nuevaEscala * 100;
    if (typeof showResizeIndicator === 'function') {
        showResizeIndicator(porcentaje);
        setTimeout(() => hideResizeIndicator(1500), 100);
    }
    
    console.log(`📏 Isométrico escalado a ${(nuevaEscala * 100).toFixed(0)}%`);
}

function resetTamanoIsometrico(btn) {
    const wrapper = btn.closest('.isometrico-integrado');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearIsometrico(btn) {
    const wrapper = btn.closest('.isometrico-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.outline = 'none';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear posición';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.outline = 'none'; // ✅ TRANSPARENTE - SIN BORDE
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear posición';
    }
}

function eliminarIsometrico(btn) {
    if (confirm('¿Estás seguro de eliminar este isométrico del plano?')) {
        const wrapper = btn.closest('.isometrico-integrado');
        wrapper.remove();
    }
}

// Exportar funciones al scope global
window.integrarIsometricoAlPlano = integrarIsometricoAlPlano;
window.cambiarTamanoIsometrico = cambiarTamanoIsometrico;
window.resetTamanoIsometrico = resetTamanoIsometrico;
window.bloquearIsometrico = bloquearIsometrico;
window.eliminarIsometrico = eliminarIsometrico;

console.log('✅ Isométrico Integración inicializado');