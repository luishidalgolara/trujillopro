// ============================================================
// ESQUEMA UNIFILAR INTEGRACIÓN - Integración al plano
// VERSIÓN FINAL: Fondo transparente + Arrastre funcionando
// ============================================================

/**
 * Integrar esquema unifilar al plano SVG
 */
function integrarUnifilarAlPlano() {
    console.log('📌 Integrando esquema unifilar al plano...');
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        alert('❌ No se encontró el área de trabajo');
        return;
    }
    
    // Obtener el contenido del diagrama
    const diagramaOriginal = document.getElementById('unifilarDiagrama');
    if (!diagramaOriginal) {
        alert('❌ No se encontró el diagrama');
        return;
    }
    
    try {
        // Crear wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'unifilar-integrado';
        wrapper.style.cssText = `
            position: absolute;
            left: 50px;
            top: 50px;
            width: fit-content;
            height: fit-content;
            cursor: move;
            z-index: 50;
            border: 2px dashed #3498db;
            background: transparent;
            border-radius: 4px;
            transform-origin: top left;
            transform: scale(0.4);
            overflow: visible;
            padding: 45px 5px 5px 5px;
        `;
        wrapper.dataset.bloqueado = 'false';
        wrapper.dataset.escala = '0.4';
        
        // Clonar contenido del diagrama PRESERVANDO TODO
        const contenidoClonado = diagramaOriginal.cloneNode(true);
        contenidoClonado.id = 'unifilarDiagramaClonado';
        
        // IMPORTANTE: Preservar estilos y no sobrescribir
        contenidoClonado.style.border = 'none';
        contenidoClonado.style.minHeight = 'auto';
        contenidoClonado.style.display = 'block';
        contenidoClonado.style.overflow = 'visible';
        contenidoClonado.style.width = 'auto';
        contenidoClonado.style.height = 'auto';
        
        // Obtener el SVG dentro del contenido clonado
        const svgClonado = contenidoClonado.querySelector('#diagramaSVG');
        if (svgClonado) {
            // Preservar dimensiones exactas del SVG
            const ancho = svgClonado.getAttribute('width');
            const alto = svgClonado.getAttribute('height');
            svgClonado.style.width = ancho + 'px';
            svgClonado.style.height = alto + 'px';
            svgClonado.style.display = 'block';
            
            // CRÍTICO: Preservar todos los transforms de los contenedores
            const contenedoresOriginales = document.querySelectorAll('#diagramaSVG .contenedor-arrastrable');
            const contenedoresClonados = svgClonado.querySelectorAll('.contenedor-arrastrable');
            
            contenedoresOriginales.forEach((original, index) => {
                const transform = original.getAttribute('transform');
                if (transform && contenedoresClonados[index]) {
                    contenedoresClonados[index].setAttribute('transform', transform);
                }
            });
            
            // CRÍTICO: Preservar posiciones de textos movidos
            const textosOriginales = document.querySelectorAll('#diagramaSVG .texto-movible');
            const textosClonados = svgClonado.querySelectorAll('.texto-movible');
            
            textosOriginales.forEach((original, index) => {
                const x = original.getAttribute('x');
                const y = original.getAttribute('y');
                if (textosClonados[index]) {
                    if (x) textosClonados[index].setAttribute('x', x);
                    if (y) textosClonados[index].setAttribute('y', y);
                }
            });
        }
        
        // Agregar contenido
        wrapper.appendChild(contenidoClonado);
        
        // Crear barra de arrastre y controles
        const dragHandle = document.createElement('div');
        dragHandle.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 40px;
            cursor: move;
            z-index: 100;
            background: rgba(52, 152, 219, 0.15);
            border-bottom: 1px dashed #3498db;
            border-radius: 4px 4px 0 0;
        `;
        dragHandle.title = '🖱️ Arrastra aquí para mover';
        
        // Controles
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(52, 152, 219, 0.95);
            padding: 4px;
            border-radius: 4px;
            display: flex;
            gap: 4px;
        `;
        controls.innerHTML = `
            <button style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="cambiarTamanoUnifilar(this, 1.2)" title="Aumentar tamaño">🔼</button>
            <button style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="cambiarTamanoUnifilar(this, 0.8)" title="Reducir tamaño">🔽</button>
            <button style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="resetTamanoUnifilar(this)" title="Restaurar tamaño">↺</button>
            <button class="btn-bloqueo-unifilar" style="background: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="bloquearUnifilar(this)" title="Bloquear posición">🔓</button>
            <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-size: 11px;" onclick="eliminarUnifilar(this)" title="Eliminar esquema">🗑️</button>
        `;
        
        dragHandle.appendChild(controls);
        wrapper.appendChild(dragHandle);
        
        // Sistema de arrastre
        let isDragging = false;
        let initialX, initialY;
        
        dragHandle.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            if (wrapper.dataset.bloqueado === 'true') return;
            
            e.preventDefault();
            isDragging = true;
            
            const rect = wrapper.getBoundingClientRect();
            const parentRect = drawingBoard.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            
            wrapper.style.cursor = 'grabbing';
            dragHandle.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                e.preventDefault();
                const parentRect = drawingBoard.getBoundingClientRect();
                const newX = e.clientX - parentRect.left - initialX;
                const newY = e.clientY - parentRect.top - initialY;
                wrapper.style.left = newX + 'px';
                wrapper.style.top = newY + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                if (wrapper.dataset.bloqueado === 'false') {
                    wrapper.style.cursor = 'move';
                    dragHandle.style.cursor = 'move';
                }
            }
        });
        
        drawingBoard.appendChild(wrapper);
        cerrarUnifilar();
        
        alert('✅ Esquema Unifilar integrado exitosamente\n\n' +
              '🖱️ Arrastra desde la barra superior para mover\n' +
              '🔼/🔽 Cambia el tamaño\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina el esquema\n\n' +
              '💡 El fondo es transparente para no ocupar espacio visual');
              
        console.log('✅ Esquema unifilar integrado al plano con configuración preservada');
    } catch (error) {
        console.error('Error al integrar esquema:', error);
        alert('❌ Error al integrar el esquema: ' + error.message);
    }
}

function cambiarTamanoUnifilar(btn, factor) {
    const wrapper = btn.closest('.unifilar-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.05 || nuevaEscala > 5) {
        alert(nuevaEscala < 0.05 ? '⚠️ Tamaño mínimo alcanzado (5%)' : '⚠️ Tamaño máximo alcanzado (500%)');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
    
    const porcentaje = nuevaEscala * 100;
    if (typeof showResizeIndicator === 'function') {
        showResizeIndicator(porcentaje);
        setTimeout(() => hideResizeIndicator(1500), 100);
    }
    
    console.log(`📏 Escala del unifilar: ${(nuevaEscala * 100).toFixed(0)}%`);
}

function resetTamanoUnifilar(btn) {
    const wrapper = btn.closest('.unifilar-integrado');
    wrapper.dataset.escala = '0.4';
    wrapper.style.transform = 'scale(0.4)';
}

function bloquearUnifilar(btn) {
    const wrapper = btn.closest('.unifilar-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '2px dashed #3498db';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear posición';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '2px dashed #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear posición';
    }
}

function eliminarUnifilar(btn) {
    if (confirm('¿Estás seguro de eliminar este esquema del plano?')) {
        const wrapper = btn.closest('.unifilar-integrado');
        wrapper.remove();
    }
}

console.log('✅ Esquema Unifilar Integración FINAL inicializado (Transparente + Arrastrable)');