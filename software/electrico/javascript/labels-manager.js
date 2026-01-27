// ============================================================
// LABELS MANAGER - Sistema para mover y eliminar etiquetas
// Versión con eventos directos (onclick/onmousedown)
// ============================================================

let selectedLabel = null;

/**
 * Función auxiliar para mostrar status (con fallback)
 */
function showStatus(msg) {
    if (typeof updateStatus === 'function') {
        updateStatus(msg);
    }
    console.log(msg);
}

/**
 * Hacer una etiqueta arrastrable y eliminable
 */
function makeLabelsInteractive() {
    const svg = document.getElementById('plano');
    if (!svg) {
        console.log('⚠️ No se encontró el SVG del plano');
        return;
    }
    
    // Buscar TODOS los elementos <text> en el SVG
    const labels = svg.querySelectorAll('text');
    
    if (labels.length === 0) {
        console.log('⚠️ No hay textos en el plano todavía');
        return;
    }
    
    let nuevasEtiquetas = 0;
    
    labels.forEach(label => {
        // 🔧 CORRECCIÓN: Ignorar textos de los controles de imagen
        if (label.closest('#image-controls')) {
            return; // Saltar los emojis de los botones
        }
        
        // Si ya está procesada, saltar
        if (label.dataset.interactive === 'true') {
            return;
        }
        
        // Guardar posición original para restaurar después del zoom
        if (!label.dataset.originalX) {
            label.dataset.originalX = label.getAttribute('x') || '0';
            label.dataset.originalY = label.getAttribute('y') || '0';
        }
        
        // Guardar color original para preservarlo
        if (!label.dataset.originalColor) {
            const currentColor = label.getAttribute('fill') || '#2c3e50';
            label.dataset.originalColor = currentColor;
        }
        
        // Guardar font-weight original para preservarlo
        if (!label.dataset.originalWeight) {
            const currentWeight = label.getAttribute('font-weight') || 
                                 window.getComputedStyle(label).fontWeight || 
                                 'normal';
            label.dataset.originalWeight = currentWeight;
        }
        
        label.dataset.interactive = 'true';
        label.style.cursor = 'move';
        label.style.userSelect = 'none';
        label.style.pointerEvents = 'all';
        
        // ===================================
        // EVENTO CLICK - Seleccionar etiqueta
        // ===================================
        label.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            console.log('📝 Click en etiqueta:', this.textContent);
            
            // Deseleccionar anterior
            if (selectedLabel) {
                selectedLabel.style.outline = 'none';
                // Restaurar color original
                const originalColor = selectedLabel.dataset.originalColor || '#2c3e50';
                selectedLabel.setAttribute('fill', originalColor);
                // Restaurar font-weight original
                const originalWeight = selectedLabel.dataset.originalWeight || 'normal';
                selectedLabel.setAttribute('font-weight', originalWeight);
            }
            
            // Deseleccionar elemento de canvas si hay uno
            if (typeof AppState !== 'undefined' && AppState.selectedElement) {
                const circle = AppState.selectedElement.querySelector('circle');
                if (circle) {
                    const zoom = AppState.zoom || 1;
                    circle.setAttribute('stroke-width', 2 / zoom);
                }
                AppState.selectedElement = null;
            }
            
            // Seleccionar esta etiqueta
            selectedLabel = this;
            this.style.outline = '2px dashed #3498db';
            this.setAttribute('fill', '#3498db');
            this.setAttribute('font-weight', 'bold');
            
            console.log('✅ Etiqueta seleccionada:', this.textContent);
            showStatus('📝 Arrastra para mover | DELETE para eliminar');
        };
        
        // ===================================
        // EVENTO MOUSEDOWN - Arrastre
        // ===================================
        label.onmousedown = function(e) {
            const isPanning = (typeof AppState !== 'undefined' && AppState.isPanning);
            if (isPanning) return;
            
            e.stopPropagation();
            e.preventDefault();
            
            console.log('🖱️ Iniciando arrastre de:', this.textContent);
            
            // Seleccionar si no está seleccionada
            if (selectedLabel !== this) {
                this.onclick(e);
            }
            
            const svg = document.getElementById('plano');
            const group = this.closest('g');
            
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            const startX = parseFloat(this.getAttribute('x') || 0);
            const startY = parseFloat(this.getAttribute('y') || 0);
            
            let offsetX, offsetY, groupX = 0, groupY = 0;
            
            // Si está dentro de un grupo, calcular offset considerando el grupo
            if (group) {
                const transform = group.getAttribute('transform');
                const match = transform ? transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/) : null;
                if (match) {
                    groupX = parseFloat(match[1]);
                    groupY = parseFloat(match[2]);
                }
                offsetX = svgP.x - (groupX + startX);
                offsetY = svgP.y - (groupY + startY);
            } else {
                // Texto suelto sin grupo
                offsetX = svgP.x - startX;
                offsetY = svgP.y - startY;
            }
            
            const label = this;
            label.style.cursor = 'grabbing';
            
            // Función de movimiento
            document.onmousemove = function(e) {
                const pt = svg.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
                
                let newX, newY;
                
                if (group) {
                    // Con grupo
                    newX = svgP.x - groupX - offsetX;
                    newY = svgP.y - groupY - offsetY;
                } else {
                    // Sin grupo (texto suelto)
                    newX = svgP.x - offsetX;
                    newY = svgP.y - offsetY;
                }
                
                label.setAttribute('x', newX);
                label.setAttribute('y', newY);
                
                // Marcar como movida manualmente
                label.dataset.manuallyMoved = 'true';
            };
            
            // Función al soltar
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
                label.style.cursor = 'move';
                console.log('✅ Etiqueta reposicionada');
                showStatus('✅ Etiqueta reposicionada');
            };
        };
        
        // ===================================
        // EVENTO DOBLE CLICK - Editar texto
        // ===================================
        label.ondblclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            editLabelText(this);
        };
        
        nuevasEtiquetas++;
    });
    
    console.log(`✅ ${nuevasEtiquetas} etiquetas interactivas (Total: ${labels.length})`);
    
    if (nuevasEtiquetas > 0) {
        showStatus(`📝 ${nuevasEtiquetas} etiquetas movibles`);
    }
}

/**
 * Eliminar etiqueta seleccionada
 */
function deleteSelectedLabel() {
    if (!selectedLabel) {
        console.log('⚠️ No hay etiqueta seleccionada');
        showStatus('⚠️ Selecciona una etiqueta primero');
        return;
    }
    
    const labelText = selectedLabel.textContent;
    if (confirm('¿Eliminar esta etiqueta?\n\n"' + labelText + '"')) {
        selectedLabel.remove();
        selectedLabel = null;
        console.log('✅ Etiqueta eliminada');
        showStatus('🗑️ Etiqueta eliminada');
    } else {
        // Si cancela, restaurar color original
        const originalColor = selectedLabel.dataset.originalColor || '#2c3e50';
        selectedLabel.setAttribute('fill', originalColor);
    }
}

/**
 * Editar texto de la etiqueta
 */
function editLabelText(label) {
    const currentText = label.textContent;
    const newText = prompt('Editar texto de la etiqueta:', currentText);
    
    if (newText !== null && newText.trim() !== '') {
        label.textContent = newText.trim();
        console.log('✅ Texto actualizado');
        showStatus('✅ Texto actualizado');
    }
}

/**
 * Listener para teclas
 */
document.addEventListener('keydown', function(e) {
    // DELETE o BACKSPACE para eliminar
    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedLabel && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            deleteSelectedLabel();
        }
    }
    
    // ESC para deseleccionar
    if (e.key === 'Escape') {
        if (selectedLabel) {
            selectedLabel.style.outline = 'none';
            const originalColor = selectedLabel.dataset.originalColor || '#2c3e50';
            selectedLabel.setAttribute('fill', originalColor);
            const originalWeight = selectedLabel.dataset.originalWeight || 'normal';
            selectedLabel.setAttribute('font-weight', originalWeight);
            selectedLabel = null;
            showStatus('Etiqueta deseleccionada');
        }
    }
});

/**
 * Activar cuando se carga la página
 */
window.addEventListener('load', function() {
    console.log('🔄 Activando Labels Manager...');
    
    setTimeout(function() {
        makeLabelsInteractive();
        
        // Observer para detectar nuevas etiquetas
        const observer = new MutationObserver(function(mutations) {
            let hayNuevosNodos = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    hayNuevosNodos = true;
                }
            });
            
            if (hayNuevosNodos) {
                setTimeout(makeLabelsInteractive, 100);
            }
        });
        
        const plano = document.getElementById('plano');
        if (plano) {
            observer.observe(plano, {
                childList: true,
                subtree: true
            });
            console.log('👁️ Observer activo - detectará nuevas etiquetas');
            
            // Click en canvas deselecciona
            plano.addEventListener('click', function(e) {
                if (e.target.tagName === 'svg' || e.target.id === 'plano') {
                    if (selectedLabel) {
                        selectedLabel.style.outline = 'none';
                        const originalColor = selectedLabel.dataset.originalColor || '#2c3e50';
                        selectedLabel.setAttribute('fill', originalColor);
                        const originalWeight = selectedLabel.dataset.originalWeight || 'normal';
                        selectedLabel.setAttribute('font-weight', originalWeight);
                        selectedLabel = null;
                    }
                }
            });
        }
    }, 1000);
});

// Exportar funciones globales
window.makeLabelsInteractive = makeLabelsInteractive;
window.deleteSelectedLabel = deleteSelectedLabel;
window.selectedLabel = selectedLabel;

console.log('✅ Labels Manager cargado');
console.log('📝 Controles:');
console.log('  • Click: Seleccionar etiqueta');
console.log('  • Arrastrar: Mover etiqueta');
console.log('  • DELETE: Eliminar');
console.log('  • Doble click: Editar texto');
console.log('  • ESC: Deseleccionar');