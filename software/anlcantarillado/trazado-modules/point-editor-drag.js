// trazado-modules/point-editor-drag.js
// ============================================================
// SISTEMA DE ARRASTRE DEL EDITOR DE PUNTOS
// ============================================================

// ============================================================
// CONFIGURAR DRAG PARA PUNTO EDITABLE
// ============================================================
function configurarDragPuntoEditable(circulo, linea) {
    let isDragging = false;
    
    function handleMouseDown(e) {
        if (isNavigationMode) return;
        
        console.log('🔴 CLICK en círculo editable');
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        isDragging = true;
        editorPuntos.activo = true;
        editorPuntos.puntoArrastrado = circulo;
        editorPuntos.lineaEditada = linea;
        
        const fromId = linea.getAttribute('data-from');
        editorPuntos.elementoOrigen = encontrarElementoPorId(parseInt(fromId));
        
        editorPuntos.posicionInicial = {
            x: parseFloat(circulo.getAttribute('cx')),
            y: parseFloat(circulo.getAttribute('cy'))
        };
        
        // Visual feedback
        circulo.setAttribute('fill-opacity', '1');
        circulo.setAttribute('r', '15');
        circulo.setAttribute('fill', '#22c55e');
        linea.setAttribute('stroke-dasharray', '5,5');
        linea.setAttribute('stroke-width', '6');
        linea.setAttribute('stroke', '#22c55e');
        
        document.body.style.userSelect = 'none';
        
        showStatus('🔴 ARRASTRANDO - Suelta o presiona ENTER para confirmar');
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const coords = convertirCoordenadas(e.clientX, e.clientY);
        
        // Actualizar posición del círculo
        circulo.setAttribute('cx', coords.x);
        circulo.setAttribute('cy', coords.y);
        
        // Actualizar punto final de la línea
        linea.setAttribute('x2', coords.x);
        linea.setAttribute('y2', coords.y);
        
        // Actualizar flecha y etiqueta
        if (typeof updateArrowForLine === 'function') {
            updateArrowForLine(linea);
        }
        if (typeof updateLabelForLine === 'function') {
            updateLabelForLine(linea);
        }
        
        // Detectar elemento bajo el cursor
        const elementoBajo = detectarElementoBajoCursor(coords.x, coords.y);
        if (elementoBajo) {
            circulo.setAttribute('fill', '#22c55e');
            circulo.setAttribute('stroke', '#10b981');
            
            if (elementoBajo.isVirtual) {
                showStatus(`🎯 ENTER para confirmar conexión en ángulo`);
            } else {
                showStatus(`🎯 ENTER para confirmar → ${elementoBajo.type || 'Cámara'}`);
            }
        } else {
            circulo.setAttribute('fill', '#f59e0b');
            showStatus('⚠️ Presiona ENTER para confirmar posición');
        }
    }
    
    function handleKeyPress(e) {
        if (!isDragging) return;
        
        // DETECTAR TECLA ENTER
        if (e.key === 'Enter' || e.keyCode === 13) {
            console.log('✅ ENTER presionado - Confirmando nueva posición');
            
            e.preventDefault();
            e.stopPropagation();
            
            // Obtener coordenadas actuales
            const cx = parseFloat(circulo.getAttribute('cx'));
            const cy = parseFloat(circulo.getAttribute('cy'));
            
            // Verificar si hay un elemento bajo el cursor
            const nuevoDestino = detectarElementoBajoCursor(cx, cy);
            
            if (nuevoDestino && validarReconexion(editorPuntos.elementoOrigen, nuevoDestino)) {
                // RECONEXIÓN A ELEMENTO O LÍNEA
                reconectarLineaANuevoDestino(linea, circulo, nuevoDestino);
                
                if (nuevoDestino.isVirtual) {
                    showStatus(`✅ Confirmado: Conexión en ángulo creada`);
                } else {
                    showStatus(`✅ Confirmado: Reconectado a ${nuevoDestino.type}`);
                }
            } else {
                // SOLO ACTUALIZAR LONGITUD (sin reconectar)
                actualizarSoloLongitud(linea, cx, cy);
                showStatus('✅ Confirmado: Longitud actualizada');
            }
            
            // ELIMINAR el círculo editable
            circulo.remove();
            
            // Restaurar visual de la línea
            linea.removeAttribute('stroke-dasharray');
            linea.setAttribute('stroke-width', '4');
            linea.setAttribute('stroke', '#ef4444');
            
            // Finalizar drag
            isDragging = false;
            editorPuntos.activo = false;
            editorPuntos.puntoArrastrado = null;
            editorPuntos.lineaEditada = null;
            editorPuntos.elementoOrigen = null;
            
            document.body.style.userSelect = '';
            
            console.log('✅ Nueva posición confirmada y círculo eliminado');
        }
        
        // DETECTAR TECLA ESC (cancelar)
        if (e.key === 'Escape' || e.keyCode === 27) {
            console.log('❌ ESC presionado - Cancelando edición');
            
            e.preventDefault();
            e.stopPropagation();
            
            // Restaurar posición original
            circulo.setAttribute('cx', editorPuntos.posicionInicial.x);
            circulo.setAttribute('cy', editorPuntos.posicionInicial.y);
            linea.setAttribute('x2', editorPuntos.posicionInicial.x);
            linea.setAttribute('y2', editorPuntos.posicionInicial.y);
            
            if (typeof updateArrowForLine === 'function') {
                updateArrowForLine(linea);
            }
            if (typeof updateLabelForLine === 'function') {
                updateLabelForLine(linea);
            }
            
            // Restaurar visual
            circulo.setAttribute('fill', '#ef4444');
            circulo.setAttribute('fill-opacity', '0.6');
            circulo.setAttribute('r', '10');
            circulo.setAttribute('stroke', '#ffffff');
            linea.removeAttribute('stroke-dasharray');
            linea.setAttribute('stroke-width', '4');
            linea.setAttribute('stroke', '#ef4444');
            
            // Finalizar drag
            isDragging = false;
            editorPuntos.activo = false;
            editorPuntos.puntoArrastrado = null;
            editorPuntos.lineaEditada = null;
            editorPuntos.elementoOrigen = null;
            
            document.body.style.userSelect = '';
            
            showStatus('❌ Edición cancelada - Posición restaurada');
        }
    }
    
    function handleMouseUp(e) {
        if (!isDragging) return;
        
        console.log('🔴 SOLTANDO círculo - Esperando ENTER para confirmar');
        
        // NO hacer nada al soltar - esperar ENTER
        // El usuario debe presionar ENTER explícitamente
        
        showStatus('⏳ Presiona ENTER para confirmar o ESC para cancelar');
    }
    
    // Eventos principales
    circulo.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyPress);
    
    // Efecto hover
    circulo.addEventListener('mouseenter', () => {
        if (!editorPuntos.activo) {
            circulo.setAttribute('fill-opacity', '0.9');
            circulo.setAttribute('r', '12');
            showStatus('🔴 Click y arrastra para mover');
        }
    });
    
    circulo.addEventListener('mouseleave', () => {
        if (!editorPuntos.activo) {
            circulo.setAttribute('fill-opacity', '0.6');
            circulo.setAttribute('r', '10');
        }
    });
}

console.log('✅ Point Editor Drag cargado');