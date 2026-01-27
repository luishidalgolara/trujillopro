// ============================================================
// TABLERO INTEGRACIÓN CORE - Funciones principales
// ============================================================

/**
 * Integrar tablero eléctrico al plano
 * Se llama desde el botón en el modal del tablero
 */
function integrarTableroAlPlano() {
    console.log('⚡ Integrando Tablero Eléctrico al plano...');
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        alert('❌ No se encontró el área de trabajo');
        return;
    }
    
    // Verificar que haya datos del tablero
    if (typeof CuadroState === 'undefined' || !CuadroState.circuits) {
        alert('⚠️ No hay circuitos en el tablero.\nAgrega elementos al plano primero.');
        return;
    }
    
    try {
        // Crear wrapper del tablero integrado
        const wrapper = document.createElement('div');
        wrapper.className = 'tablero-integrado';
        wrapper.style.cssText = `
            position: absolute;
            left: 50px;
            top: 50px;
            width: 400px;
            cursor: move;
            z-index: 50;
            border: 3px solid #e74c3c;
            background: white;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            transform-origin: top left;
            transform: scale(1);
            overflow: visible;
            font-family: Arial, sans-serif;
        `;
        wrapper.dataset.bloqueado = 'false';
        wrapper.dataset.escala = '1';
        
        // Generar contenido del tablero
        const tableroHTML = generarTableroVisualHTML();
        
        // Controles superiores
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: #e74c3c;
            padding: 6px;
            border-radius: 4px;
            display: flex;
            gap: 5px;
            z-index: 10;
        `;
        controls.innerHTML = `
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="cambiarTamanoTablero(this, 1.2)" title="Aumentar tamaño">🔼</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="cambiarTamanoTablero(this, 0.8)" title="Reducir tamaño">🔽</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="resetTamanoTablero(this)" title="Restaurar tamaño">↺</button>
            <button class="btn-bloqueo-tablero" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="bloquearTablero(this)" title="Bloquear posición">🔓</button>
            <button style="background: #c0392b; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="eliminarTablero(this)" title="Eliminar tablero">🗑️</button>
        `;
        
        wrapper.appendChild(controls);
        wrapper.innerHTML += tableroHTML;
        
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
        
        drawingBoard.appendChild(wrapper);
        
        alert('✅ Tablero Eléctrico integrado exitosamente\n\n' +
              '🖱️ Arrastra para mover\n' +
              '🔼/🔽 Cambia el tamaño\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina el tablero');
              
        console.log('✅ Tablero integrado al plano');
    } catch (error) {
        console.error('Error al integrar tablero:', error);
        alert('❌ Error al integrar el tablero: ' + error.message);
    }
}

function cambiarTamanoTablero(btn, factor) {
    const wrapper = btn.closest('.tablero-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.1 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.1 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
}

function resetTamanoTablero(btn) {
    const wrapper = btn.closest('.tablero-integrado');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearTablero(btn) {
    const wrapper = btn.closest('.tablero-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '3px solid #e74c3c';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear posición';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '3px solid #c0392b';
        btn.textContent = '🔒';
        btn.style.background = '#c0392b';
        btn.style.color = 'white';
        btn.title = 'Desbloquear posición';
    }
}

function eliminarTablero(btn) {
    if (confirm('¿Estás seguro de eliminar este tablero del plano?')) {
        const wrapper = btn.closest('.tablero-integrado');
        wrapper.remove();
    }
}

console.log('✅ Tablero Integración Core inicializado');
