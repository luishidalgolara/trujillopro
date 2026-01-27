// trazado-modules/point-editor-ui.js
// ============================================================
// INTERFAZ DE USUARIO DEL EDITOR DE PUNTOS
// ============================================================

// ============================================================
// TOGGLE MODO EDICIÓN (FUNCIÓN PRINCIPAL)
// ============================================================
function toggleModoEdicionTrazado() {
    const tracingSvg = document.getElementById('plano');
    const puntos = tracingSvg.querySelectorAll('.edit-point');
    const boton = document.getElementById('btnEditarPuntos');
    
    if (puntos.length > 0) {
        // DESACTIVAR modo edición
        removerPuntosEditables();
        editorPuntos.modoEdicion = false;
        
        if (boton) {
            boton.style.background = '#f59e0b';
            boton.innerHTML = '✏️ Editar Puntos Trazado';
        }
        
        showStatus('❌ Modo edición desactivado');
        console.log('❌ Modo edición de puntos DESACTIVADO');
    } else {
        // ACTIVAR modo edición
        agregarPuntosEditablesAlTrazado();
        editorPuntos.modoEdicion = true;
        
        if (boton) {
            boton.style.background = '#22c55e';
            boton.innerHTML = '✅ Edición Activa (Click para desactivar)';
        }
        
        showStatus('✅ Modo edición activado - Arrastra los círculos rojos');
        console.log('✅ Modo edición de puntos ACTIVADO');
    }
}

// ============================================================
// AGREGAR PUNTOS EDITABLES A TODAS LAS LÍNEAS DEL TRAZADO
// ============================================================
function agregarPuntosEditablesAlTrazado() {
    console.log('🎯 Agregando puntos editables al trazado...');
    
    const tracingSvg = document.getElementById('plano');
    const lineas = tracingSvg.querySelectorAll('.pipe-line');
    
    if (lineas.length === 0) {
        console.log('⚠️ No hay líneas de trazado para editar');
        showStatus('⚠️ Primero genera el trazado automático');
        return;
    }
    
    // Remover puntos editables anteriores
    removerPuntosEditables();
    
    let contador = 0;
    lineas.forEach(linea => {
        agregarPuntoEditableALinea(linea);
        contador++;
    });
    
    console.log(`✅ ${contador} puntos editables agregados`);
}

// ============================================================
// AGREGAR PUNTO EDITABLE A UNA LÍNEA ESPECÍFICA
// ============================================================
function agregarPuntoEditableALinea(linea) {
    const tracingSvg = document.getElementById('plano');
    
    // ⭐ CAMBIO: Ahora lee x1, y1 (punto final LEJOS del artefacto)
    const x1 = parseFloat(linea.getAttribute('x1'));
    const y1 = parseFloat(linea.getAttribute('y1'));
    const fromId = linea.getAttribute('data-from');
    const toId = linea.getAttribute('data-to');
    
    // Crear círculo editable en el punto final (x1, y1)
    const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circulo.setAttribute('cx', x1);
    circulo.setAttribute('cy', y1);
    circulo.setAttribute('r', '10');
    circulo.setAttribute('fill', '#ef4444');
    circulo.setAttribute('fill-opacity', '0.6');
    circulo.setAttribute('stroke', '#ffffff');
    circulo.setAttribute('stroke-width', '3');
    circulo.setAttribute('class', 'edit-point');
    circulo.setAttribute('data-line-from', fromId);
    circulo.setAttribute('data-line-to', toId);
    
    // Configuración crítica
    circulo.style.cursor = 'move';
    circulo.style.pointerEvents = 'all';
    
    // Configurar eventos de drag
    configurarDragPuntoEditable(circulo, linea);
    
    // Agregar al SVG
    tracingSvg.appendChild(circulo);
}

// ============================================================
// REMOVER PUNTOS EDITABLES
// ============================================================
function removerPuntosEditables() {
    const tracingSvg = document.getElementById('plano');
    const puntos = tracingSvg.querySelectorAll('.edit-point');
    puntos.forEach(punto => punto.remove());
}

console.log('✅ Point Editor UI cargado');