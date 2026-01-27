// ================================
// EDITOR MANIPULATION
// Sistema de manipulación de imágenes
// ================================

function configurarManipulacionMultiple(bgGroup, bgRect, resizeHandle, pattern, imagenId) {
    let arrastrando = false;
    let redimensionando = false;
    let mouseInicio = { x: 0, y: 0 };
    let rectInicio = { x: 0, y: 0, width: 0, height: 0 };
    let ratioOriginal = 1;
    let bloqueado = false;
    let estabaManipulando = false;
    let temporizadorManipulacion = null;

    const anchoOriginal = parseFloat(bgRect.getAttribute('width'));
    const altoOriginal = parseFloat(bgRect.getAttribute('height'));
    ratioOriginal = anchoOriginal / altoOriginal;

    function establecerEstadoManipulacion(estado) {
        estabaManipulando = estado;
        if (estado) {
            if (temporizadorManipulacion) clearTimeout(temporizadorManipulacion);
            temporizadorManipulacion = setTimeout(() => {
                estabaManipulando = false;
            }, 500);
        }
    }

    const lockButtonId = `lockButton_${imagenId}`;
    const botonCandado = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    botonCandado.setAttribute('id', lockButtonId);
    botonCandado.setAttribute('class', 'lock-button');
    botonCandado.style.cursor = 'pointer';
    botonCandado.style.pointerEvents = 'all';

    const fondoCandado = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fondoCandado.setAttribute('cx', parseFloat(bgRect.getAttribute('x')) + 15);
    fondoCandado.setAttribute('cy', parseFloat(bgRect.getAttribute('y')) + 15);
    fondoCandado.setAttribute('r', '12');
    fondoCandado.setAttribute('fill', '#ffffff');
    fondoCandado.setAttribute('stroke', '#3498db');
    fondoCandado.setAttribute('stroke-width', '2');
    fondoCandado.style.pointerEvents = 'all';

    const iconoCandado = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    iconoCandado.setAttribute('x', parseFloat(bgRect.getAttribute('x')) + 15);
    iconoCandado.setAttribute('y', parseFloat(bgRect.getAttribute('y')) + 20);
    iconoCandado.setAttribute('text-anchor', 'middle');
    iconoCandado.setAttribute('font-size', '12');
    iconoCandado.setAttribute('fill', '#3498db');
    iconoCandado.textContent = '🔓';
    iconoCandado.style.pointerEvents = 'all';

    botonCandado.appendChild(fondoCandado);
    botonCandado.appendChild(iconoCandado);
    bgGroup.appendChild(botonCandado);

    const deleteButtonId = `deleteButton_${imagenId}`;
    const botonEliminar = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    botonEliminar.setAttribute('id', deleteButtonId);
    botonEliminar.setAttribute('class', 'delete-button');
    botonEliminar.style.cursor = 'pointer';
    botonEliminar.style.pointerEvents = 'all';

    const fondoEliminar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fondoEliminar.setAttribute('cx', parseFloat(bgRect.getAttribute('x')) + parseFloat(bgRect.getAttribute('width')) - 15);
    fondoEliminar.setAttribute('cy', parseFloat(bgRect.getAttribute('y')) + 15);
    fondoEliminar.setAttribute('r', '12');
    fondoEliminar.setAttribute('fill', '#e74c3c');
    fondoEliminar.setAttribute('stroke', '#ffffff');
    fondoEliminar.setAttribute('stroke-width', '2');
    fondoEliminar.style.pointerEvents = 'all';

    const iconoEliminar = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    iconoEliminar.setAttribute('x', parseFloat(bgRect.getAttribute('x')) + parseFloat(bgRect.getAttribute('width')) - 15);
    iconoEliminar.setAttribute('y', parseFloat(bgRect.getAttribute('y')) + 20);
    iconoEliminar.setAttribute('text-anchor', 'middle');
    iconoEliminar.setAttribute('font-size', '12');
    iconoEliminar.setAttribute('fill', '#ffffff');
    iconoEliminar.textContent = '❌';
    iconoEliminar.style.pointerEvents = 'all';

    botonEliminar.appendChild(fondoEliminar);
    botonEliminar.appendChild(iconoEliminar);
    bgGroup.appendChild(botonEliminar);

    function alternarCandado() {
        bloqueado = !bloqueado;
        iconoCandado.textContent = bloqueado ? '🔒' : '🔓';
        fondoCandado.setAttribute('fill', bloqueado ? '#e74c3c' : '#ffffff');
        fondoCandado.setAttribute('stroke', bloqueado ? '#e74c3c' : '#3498db');
        iconoCandado.setAttribute('fill', bloqueado ? '#ffffff' : '#3498db');
        
        bgRect.style.cursor = bloqueado ? 'default' : 'move';
        bgRect.style.pointerEvents = bloqueado ? 'none' : 'all';
        resizeHandle.style.cursor = bloqueado ? 'default' : 'nw-resize';
        resizeHandle.style.pointerEvents = bloqueado ? 'none' : 'all';
        
        showStatus(bloqueado ? '🔒 Imagen bloqueada' : '🔓 Imagen desbloqueada');
    }

    function eliminarImagen() {
        if (confirm('¿Eliminar esta imagen?')) {
            bgGroup.remove();
            
            const patternAEliminar = document.getElementById(`pdfPattern_${imagenId}`);
            if (patternAEliminar) patternAEliminar.remove();
            
            const planActual = plans[currentPlanIndex];
            if (planActual.pdfBackgrounds) {
                planActual.pdfBackgrounds = planActual.pdfBackgrounds.filter(img => img.id !== imagenId);
                showStatus(`🗑️ Imagen eliminada. Quedan: ${planActual.pdfBackgrounds.length}`);
            }
        }
    }

    function actualizarPosicionCandado() {
        const x = parseFloat(bgRect.getAttribute('x'));
        const y = parseFloat(bgRect.getAttribute('y'));
        const ancho = parseFloat(bgRect.getAttribute('width'));
        
        fondoCandado.setAttribute('cx', x + 15);
        fondoCandado.setAttribute('cy', y + 15);
        iconoCandado.setAttribute('x', x + 15);
        iconoCandado.setAttribute('y', y + 20);
        
        fondoEliminar.setAttribute('cx', x + ancho - 15);
        fondoEliminar.setAttribute('cy', y + 15);
        iconoEliminar.setAttribute('x', x + ancho - 15);
        iconoEliminar.setAttribute('y', y + 20);
    }

    function actualizarPatronImagen(x, y, ancho, alto) {
        if (pattern) {
            pattern.setAttribute('x', x);
            pattern.setAttribute('y', y);
            pattern.setAttribute('width', ancho);
            pattern.setAttribute('height', alto);
            
            const image = pattern.querySelector('image');
            if (image) {
                image.setAttribute('x', 0);
                image.setAttribute('y', 0);
                image.setAttribute('width', ancho);
                image.setAttribute('height', alto);
            }
        }
    }

    botonCandado.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        alternarCandado();
    });

    botonEliminar.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        eliminarImagen();
    });

    bgRect.addEventListener('mousedown', function(e) {
        if (isNavigationMode || bloqueado) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        arrastrando = true;
        establecerEstadoManipulacion(true);
        
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        mouseInicio.x = coords.x;
        mouseInicio.y = coords.y;
        
        rectInicio.x = parseFloat(bgRect.getAttribute('x'));
        rectInicio.y = parseFloat(bgRect.getAttribute('y'));
        rectInicio.width = parseFloat(bgRect.getAttribute('width'));
        rectInicio.height = parseFloat(bgRect.getAttribute('height'));
        
        document.body.style.userSelect = 'none';
        bgGroup.style.opacity = '0.7';
    });

    resizeHandle.addEventListener('mousedown', function(e) {
        if (isNavigationMode || bloqueado) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        redimensionando = true;
        establecerEstadoManipulacion(true);
        
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        mouseInicio.x = coords.x;
        mouseInicio.y = coords.y;
        
        rectInicio.x = parseFloat(bgRect.getAttribute('x'));
        rectInicio.y = parseFloat(bgRect.getAttribute('y'));
        rectInicio.width = parseFloat(bgRect.getAttribute('width'));
        rectInicio.height = parseFloat(bgRect.getAttribute('height'));
        
        document.body.style.userSelect = 'none';
        bgGroup.style.opacity = '0.7';
    });

    function manejarMovimientoMouse(e) {
        if (!arrastrando && !redimensionando) return;
        
        e.preventDefault();
        
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        
        if (arrastrando) {
            const deltaX = coords.x - mouseInicio.x;
            const deltaY = coords.y - mouseInicio.y;
            
            const nuevaX = rectInicio.x + deltaX;
            const nuevaY = rectInicio.y + deltaY;
            
            bgRect.setAttribute('x', nuevaX);
            bgRect.setAttribute('y', nuevaY);
            
            actualizarPatronImagen(nuevaX, nuevaY, rectInicio.width, rectInicio.height);
            
            resizeHandle.setAttribute('cx', nuevaX + rectInicio.width);
            resizeHandle.setAttribute('cy', nuevaY + rectInicio.height);
            
            actualizarPosicionCandado();
            
        } else if (redimensionando) {
            const deltaX = coords.x - mouseInicio.x;
            const deltaY = coords.y - mouseInicio.y;
            const delta = Math.max(deltaX, deltaY);
            
            const nuevoAncho = Math.max(30, rectInicio.width + delta);
            const nuevoAlto = nuevoAncho / ratioOriginal;
            
            bgRect.setAttribute('width', nuevoAncho);
            bgRect.setAttribute('height', nuevoAlto);
            
            actualizarPatronImagen(rectInicio.x, rectInicio.y, nuevoAncho, nuevoAlto);
            
            resizeHandle.setAttribute('cx', rectInicio.x + nuevoAncho);
            resizeHandle.setAttribute('cy', rectInicio.y + nuevoAlto);
            
            actualizarPosicionCandado();
        }
    }

    function manejarSoltarMouse(e) {
        const estabaManipulandoAhora = arrastrando || redimensionando;
        
        if (arrastrando) {
            arrastrando = false;
            showStatus('📍 Imagen reposicionada - Movimiento COMPLETAMENTE LIBRE');
        }
        if (redimensionando) {
            redimensionando = false;
            showStatus('📏 Imagen redimensionada');
        }
        
        if (estabaManipulandoAhora) {
            document.body.style.userSelect = '';
            bgGroup.style.opacity = '0.9';
            
            const planActual = plans[currentPlanIndex];
            planActual.currentTool = null;
            
            document.querySelectorAll('.tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            setTimeout(() => {
                showStatus('🔧 Herramientas deseleccionadas automáticamente');
            }, 1000);
        }
    }

    document.addEventListener('mousemove', manejarMovimientoMouse);
    document.addEventListener('mouseup', manejarSoltarMouse);

    bgGroup.addEventListener('click', function(e) {
        const planActual = plans[currentPlanIndex];
        
        if (!isNavigationMode && planActual.currentTool && !estabaManipulando) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    bgRect.addEventListener('click', function(e) {
        const planActual = plans[currentPlanIndex];
        
        if (!isNavigationMode && planActual.currentTool && !estabaManipulando) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    resizeHandle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    
    bgGroup.addEventListener('remove', function() {
        document.removeEventListener('mousemove', manejarMovimientoMouse);
        document.removeEventListener('mouseup', manejarSoltarMouse);
    });

    botonCandado.addEventListener('mouseenter', function() {
        fondoCandado.setAttribute('stroke-width', '3');
    });

    botonCandado.addEventListener('mouseleave', function() {
        fondoCandado.setAttribute('stroke-width', '2');
    });
    
    botonEliminar.addEventListener('mouseenter', function() {
        fondoEliminar.setAttribute('stroke-width', '3');
    });

    botonEliminar.addEventListener('mouseleave', function() {
        fondoEliminar.setAttribute('stroke-width', '2');
    });
}

function configurarManipulacionImagen(bgGroup, bgRect, resizeHandle, pattern) {
    let arrastrando = false;
    let redimensionando = false;
    let mouseInicio = { x: 0, y: 0 };
    let rectInicio = { x: 0, y: 0, width: 0, height: 0 };
    let ratioOriginal = 1;
    let bloqueado = false;
    let estabaManipulando = false;
    let temporizadorManipulacion = null;

    const anchoOriginal = parseFloat(bgRect.getAttribute('width'));
    const altoOriginal = parseFloat(bgRect.getAttribute('height'));
    ratioOriginal = anchoOriginal / altoOriginal;

    function establecerEstadoManipulacion(estado) {
        estabaManipulando = estado;
        if (estado) {
            if (temporizadorManipulacion) clearTimeout(temporizadorManipulacion);
            temporizadorManipulacion = setTimeout(() => {
                estabaManipulando = false;
            }, 500);
        }
    }

    const botonCandado = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    botonCandado.setAttribute('id', 'lockButton');
    botonCandado.setAttribute('class', 'lock-button');
    botonCandado.style.cursor = 'pointer';
    botonCandado.style.pointerEvents = 'all';

    const fondoCandado = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fondoCandado.setAttribute('cx', parseFloat(bgRect.getAttribute('x')) + 15);
    fondoCandado.setAttribute('cy', parseFloat(bgRect.getAttribute('y')) + 15);
    fondoCandado.setAttribute('r', '12');
    fondoCandado.setAttribute('fill', '#ffffff');
    fondoCandado.setAttribute('stroke', '#3498db');
    fondoCandado.setAttribute('stroke-width', '2');
    fondoCandado.style.pointerEvents = 'all';

    const iconoCandado = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    iconoCandado.setAttribute('x', parseFloat(bgRect.getAttribute('x')) + 15);
    iconoCandado.setAttribute('y', parseFloat(bgRect.getAttribute('y')) + 20);
    iconoCandado.setAttribute('text-anchor', 'middle');
    iconoCandado.setAttribute('font-size', '12');
    iconoCandado.setAttribute('fill', '#3498db');
    iconoCandado.textContent = '🔓';
    iconoCandado.style.pointerEvents = 'all';

    botonCandado.appendChild(fondoCandado);
    botonCandado.appendChild(iconoCandado);
    bgGroup.appendChild(botonCandado);

    function alternarCandado() {
        bloqueado = !bloqueado;
        iconoCandado.textContent = bloqueado ? '🔒' : '🔓';
        fondoCandado.setAttribute('fill', bloqueado ? '#e74c3c' : '#ffffff');
        fondoCandado.setAttribute('stroke', bloqueado ? '#e74c3c' : '#3498db');
        iconoCandado.setAttribute('fill', bloqueado ? '#ffffff' : '#3498db');
        
        bgRect.style.cursor = bloqueado ? 'default' : 'move';
        bgRect.style.pointerEvents = bloqueado ? 'none' : 'all';
        resizeHandle.style.cursor = bloqueado ? 'default' : 'nw-resize';
        resizeHandle.style.pointerEvents = bloqueado ? 'none' : 'all';
        
        showStatus(bloqueado ? '🔒 Imagen bloqueada' : '🔓 Imagen desbloqueada');
    }

    botonCandado.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        alternarCandado();
    });

    function actualizarPosicionCandado() {
        const x = parseFloat(bgRect.getAttribute('x'));
        const y = parseFloat(bgRect.getAttribute('y'));
        fondoCandado.setAttribute('cx', x + 15);
        fondoCandado.setAttribute('cy', y + 15);
        iconoCandado.setAttribute('x', x + 15);
        iconoCandado.setAttribute('y', y + 20);
    }

    function actualizarPatronImagen(x, y, ancho, alto) {
        if (pattern) {
            pattern.setAttribute('x', x);
            pattern.setAttribute('y', y);
            pattern.setAttribute('width', ancho);
            pattern.setAttribute('height', alto);
            
            const image = pattern.querySelector('image');
            if (image) {
                image.setAttribute('x', 0);
                image.setAttribute('y', 0);
                image.setAttribute('width', ancho);
                image.setAttribute('height', alto);
            }
        }
    }

    bgRect.addEventListener('mousedown', function(e) {
        if (isNavigationMode || bloqueado) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        arrastrando = true;
        establecerEstadoManipulacion(true);
        
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        mouseInicio.x = coords.x;
        mouseInicio.y = coords.y;
        
        rectInicio.x = parseFloat(bgRect.getAttribute('x'));
        rectInicio.y = parseFloat(bgRect.getAttribute('y'));
        rectInicio.width = parseFloat(bgRect.getAttribute('width'));
        rectInicio.height = parseFloat(bgRect.getAttribute('height'));
        
        document.body.style.userSelect = 'none';
        bgGroup.style.opacity = '0.7';
    });

    resizeHandle.addEventListener('mousedown', function(e) {
        if (isNavigationMode || bloqueado) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        redimensionando = true;
        establecerEstadoManipulacion(true);
        
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        mouseInicio.x = coords.x;
        mouseInicio.y = coords.y;
        
        rectInicio.x = parseFloat(bgRect.getAttribute('x'));
        rectInicio.y = parseFloat(bgRect.getAttribute('y'));
        rectInicio.width = parseFloat(bgRect.getAttribute('width'));
        rectInicio.height = parseFloat(bgRect.getAttribute('height'));
        
        document.body.style.userSelect = 'none';
        bgGroup.style.opacity = '0.7';
    });

    function manejarMovimientoMouse(e) {
        if (!arrastrando && !redimensionando) return;
        
        e.preventDefault();
        
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        
        if (arrastrando) {
            const deltaX = coords.x - mouseInicio.x;
            const deltaY = coords.y - mouseInicio.y;
            
            const nuevaX = rectInicio.x + deltaX;
            const nuevaY = rectInicio.y + deltaY;
            
            bgRect.setAttribute('x', nuevaX);
            bgRect.setAttribute('y', nuevaY);
            
            actualizarPatronImagen(nuevaX, nuevaY, rectInicio.width, rectInicio.height);
            
            resizeHandle.setAttribute('cx', nuevaX + rectInicio.width);
            resizeHandle.setAttribute('cy', nuevaY + rectInicio.height);
            
            actualizarPosicionCandado();
            
        } else if (redimensionando) {
            const deltaX = coords.x - mouseInicio.x;
            const deltaY = coords.y - mouseInicio.y;
            const delta = Math.max(deltaX, deltaY);
            
            const nuevoAncho = Math.max(30, rectInicio.width + delta);
            const nuevoAlto = nuevoAncho / ratioOriginal;
            
            bgRect.setAttribute('width', nuevoAncho);
            bgRect.setAttribute('height', nuevoAlto);
            
            actualizarPatronImagen(rectInicio.x, rectInicio.y, nuevoAncho, nuevoAlto);
            
            resizeHandle.setAttribute('cx', rectInicio.x + nuevoAncho);
            resizeHandle.setAttribute('cy', rectInicio.y + nuevoAlto);
            
            actualizarPosicionCandado();
        }
    }

    function manejarSoltarMouse(e) {
        const estabaManipulandoAhora = arrastrando || redimensionando;
        
        if (arrastrando) {
            arrastrando = false;
            showStatus('📍 Imagen reposicionada - Movimiento COMPLETAMENTE LIBRE');
        }
        if (redimensionando) {
            redimensionando = false;
            showStatus('📏 Imagen redimensionada');
        }
        
        if (estabaManipulandoAhora) {
            document.body.style.userSelect = '';
            bgGroup.style.opacity = '0.9';
            
            const planActual = plans[currentPlanIndex];
            planActual.currentTool = null;
            
            document.querySelectorAll('.tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            setTimeout(() => {
                showStatus('🔧 Herramientas deseleccionadas automáticamente');
            }, 1000);
        }
    }

    document.addEventListener('mousemove', manejarMovimientoMouse);
    document.addEventListener('mouseup', manejarSoltarMouse);

    bgGroup.addEventListener('click', function(e) {
        const planActual = plans[currentPlanIndex];
        
        if (!isNavigationMode && planActual.currentTool && !estabaManipulando) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    bgRect.addEventListener('click', function(e) {
        const planActual = plans[currentPlanIndex];
        
        if (!isNavigationMode && planActual.currentTool && !estabaManipulando) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    resizeHandle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    
    bgGroup.addEventListener('remove', function() {
        document.removeEventListener('mousemove', manejarMovimientoMouse);
        document.removeEventListener('mouseup', manejarSoltarMouse);
    });

    botonCandado.addEventListener('mouseenter', function() {
        fondoCandado.setAttribute('stroke-width', '3');
    });

    botonCandado.addEventListener('mouseleave', function() {
        fondoCandado.setAttribute('stroke-width', '2');
    });
}

// Aliases para compatibilidad
window.setupMultipleImageManipulation = configurarManipulacionMultiple;
window.setupImageManipulation = configurarManipulacionImagen;

// Exportar
window.EditorManipulation = {
    configurarManipulacionMultiple,
    configurarManipulacionImagen
};

console.log('✅ editor-manipulation.js cargado');