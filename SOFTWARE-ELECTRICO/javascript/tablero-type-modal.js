// ========================================
// MODAL DE SELECCIÓN DE TIPO DE TABLERO
// ========================================

let pendingTableroData = null;
let modalTableroIsOpen = false; // ✅ BANDERA DE CONTROL

/**
 * Mostrar modal de selección de tipo de tablero
 */
function showTableroTypeModal(x, y, toolName) {
    // ✅ EVITAR MÚLTIPLES LLAMADAS
    if (modalTableroIsOpen) {
        console.log('⚠️ Modal ya está abierto, ignorando llamada');
        return;
    }
    
    console.log('🎯 showTableroTypeModal llamado:', { x, y, toolName });
    
    pendingTableroData = { x, y, toolName };
    modalTableroIsOpen = true; // ✅ MARCAR COMO ABIERTO
    
    const modal = document.getElementById('tableroTypeModal');
    if (!modal) {
        console.error('❌ Modal tableroTypeModal no encontrado en el DOM');
        alert('Error: Modal de selección no encontrado. Verifica que el HTML esté correcto.');
        modalTableroIsOpen = false; // ✅ RESETEAR
        return;
    }
    
    // ✅ FORZAR VISIBILIDAD TOTAL CON !important simulado
    modal.setAttribute('style', 
        'display: flex !important; ' +
        'position: fixed !important; ' +
        'top: 0 !important; ' +
        'left: 0 !important; ' +
        'width: 100vw !important; ' +
        'height: 100vh !important; ' +
        'background: rgba(0, 0, 0, 0.9) !important; ' +
        'z-index: 999999 !important; ' +
        'justify-content: center !important; ' +
        'align-items: center !important; ' +
        'pointer-events: auto !important;'
    );
    
    // ✅ FORZAR VISIBILIDAD DEL CONTENIDO INTERNO
    const innerContent = modal.querySelector('div');
    if (innerContent) {
        innerContent.style.display = 'block';
        innerContent.style.visibility = 'visible';
        innerContent.style.opacity = '1';
    }
    
    console.log('📋 Modal de tipo de tablero mostrado');
    console.log('📋 Modal HTML:', modal.innerHTML.substring(0, 200));
}

/**
 * Seleccionar tipo de tablero (iluminación o enchufes)
 */
function selectTableroType(type) {
    console.log('⚡ Tipo de tablero seleccionado:', type);
    
    if (!pendingTableroData) {
        console.error('❌ No hay datos pendientes de tablero');
        modalTableroIsOpen = false; // ✅ RESETEAR
        return;
    }
    
    const { x, y, toolName } = pendingTableroData;
    
    console.log('📍 Colocando tablero en:', { x, y, tipo: type });
    
    // Colocar tablero con tipo específico
    if (typeof placeTableroWithType === 'function') {
        placeTableroWithType(x, y, toolName, type);
    } else {
        console.error('❌ Función placeTableroWithType no existe');
        alert('Error: No se pudo colocar el tablero');
    }
    
    // Cerrar modal (esto también resetea la bandera)
    closeTableroTypeModal();
    
    console.log(`✅ Tablero tipo "${type}" procesado`);
}

/**
 * Colocar tablero con tipo específico
 */
function placeTableroWithType(x, y, toolName, tableroTipo) {
    const symbol = ElectricSymbols[toolName];
    if (!symbol) return;
    
    const svg = document.getElementById('plano');
    
    // Crear grupo para el símbolo
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', `electric-symbol ${symbol.category}`);
    group.setAttribute('transform', `translate(${x}, ${y})`);
    group.setAttribute('data-tablero-tipo', tableroTipo);
    
    // Crear círculo de fondo
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', 6 / AppState.zoom);
    circle.setAttribute('fill', symbol.color);
    circle.setAttribute('stroke', '#2c3e50');
    circle.setAttribute('stroke-width', 1 / AppState.zoom);
    circle.classList.add('scalable-symbol');
    
    // Crear texto con el símbolo
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '0');
    text.setAttribute('y', '2.5');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', 9 / AppState.zoom);
    text.classList.add('scalable-text');
    text.textContent = symbol.symbol;
    
    // Crear etiqueta con tipo de tablero
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', 16 / AppState.zoom);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', 8 / AppState.zoom);
    label.setAttribute('fill', '#2c3e50');
    label.classList.add('scalable-label');
    label.textContent = `${symbol.name} (${tableroTipo === 'iluminacion' ? '💡' : '🔌'})`;
    
    // Badge de tipo de tablero
    const typeBadge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    typeBadge.setAttribute('cx', '7');
    typeBadge.setAttribute('cy', '-7');
    typeBadge.setAttribute('r', 6 / AppState.zoom);
    typeBadge.setAttribute('fill', tableroTipo === 'iluminacion' ? '#f39c12' : '#3498db');
    typeBadge.setAttribute('stroke', '#fff');
    typeBadge.setAttribute('stroke-width', 2 / AppState.zoom);
    typeBadge.classList.add('scalable-level-badge');
    
    const typeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    typeText.setAttribute('x', '7');
    typeText.setAttribute('y', '-5');
    typeText.setAttribute('text-anchor', 'middle');
    typeText.setAttribute('font-size', 8 / AppState.zoom);
    typeText.setAttribute('font-weight', 'bold');
    typeText.setAttribute('fill', '#fff');
    typeText.classList.add('scalable-level-text');
    typeText.textContent = tableroTipo === 'iluminacion' ? '💡' : '🔌';
    
    group.appendChild(circle);
    group.appendChild(text);
    group.appendChild(label);
    group.appendChild(typeBadge);
    group.appendChild(typeText);
    
    // Agregar interactividad
    group.style.cursor = 'move';
    group.addEventListener('mousedown', function(e) {
        if (e.button === 0 && !AppState.isPanning) {
            e.stopPropagation();
            selectElement(group);
            startDragElement(e, group);
        }
    });
    
    svg.appendChild(group);
    
    // Guardar en el estado CON tipo de tablero
    AppState.elements.push({
        type: toolName,
        x: x,
        y: y,
        level: null,
        tableroTipo: tableroTipo,
        element: group
    });
    
    // Hacer etiquetas interactivas
    if (typeof makeLabelsInteractive === 'function') {
        setTimeout(makeLabelsInteractive, 10);
    }
    
    const tipoLabel = tableroTipo === 'iluminacion' ? 'ILUMINACIÓN 💡' : 'ENCHUFES 🔌';
    updateStatus(`⚡ Tablero de ${tipoLabel} colocado en (${Math.round(x)}, ${Math.round(y)})`);
    console.log('✅ Tablero colocado con tipo:', tableroTipo);
}

/**
 * Cancelar selección de tipo
 */
function cancelTableroTypeSelection() {
    closeTableroTypeModal(); // Esto resetea la bandera
    updateStatus('❌ Colocación de tablero cancelada');
    console.log('❌ Selección de tipo de tablero cancelada');
}

/**
 * Cerrar modal
 */
function closeTableroTypeModal() {
    const modal = document.getElementById('tableroTypeModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('✅ Modal cerrado');
    }
    pendingTableroData = null;
    modalTableroIsOpen = false; // ✅ RESETEAR BANDERA
    
    // Limpiar herramienta seleccionada
    AppState.currentTool = null;
    
    // Remover clase active de botones
    document.querySelectorAll('.btn-tool').forEach(btn => {
        btn.classList.remove('active');
    });
}

console.log('✅ Sistema de modal de tipo de tablero cargado');