// herramientas-dibujo/drawing-edit.js

function hacerElementoEditable(elemento) {
    elemento.addEventListener('click', function(e) {
        if (isNavigationMode || window.DrawingCore.obtenerHerramientaActual()) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        document.querySelectorAll('[class^="drawing-"]').forEach(el => {
            deseleccionarElementoDibujo(el);
        });
        
        document.querySelectorAll('.measurement-group').forEach(el => {
            deseleccionarMedicion(el);
        });
        
        seleccionarElementoDibujo(elemento);
    });
}

function seleccionarElementoDibujo(elemento) {
    elemento.setAttribute('stroke', '#3498db');
    elemento.setAttribute('stroke-width', parseFloat(elemento.getAttribute('stroke-width')) + 1);
    elemento.style.filter = 'drop-shadow(0 0 5px rgba(52, 152, 219, 0.8))';
    elemento.setAttribute('data-selected', 'true');
    showStatus('✅ Elemento seleccionado - Presiona SUPRIMIR para eliminar');
}

function deseleccionarElementoDibujo(elemento) {
    elemento.setAttribute('stroke', window.DrawingCore.ESTILOS_DIBUJO.stroke);
    elemento.setAttribute('stroke-width', window.DrawingCore.ESTILOS_DIBUJO.strokeWidth);
    elemento.style.filter = 'none';
    elemento.removeAttribute('data-selected');
}

function hacerMedicionEditable(grupo) {
    grupo.style.cursor = 'pointer';
    
    grupo.addEventListener('click', function(e) {
        if (isNavigationMode || window.DrawingCore.obtenerHerramientaActual() || window.MeasuringTool.estaMidiendo()) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        document.querySelectorAll('[class^="drawing-"]').forEach(el => {
            deseleccionarElementoDibujo(el);
        });
        document.querySelectorAll('.measurement-group').forEach(el => {
            deseleccionarMedicion(el);
        });
        
        seleccionarMedicion(grupo);
    });
}

function seleccionarMedicion(grupo) {
    const linea = grupo.querySelector('line');
    const rect = grupo.querySelector('rect');
    const texto = grupo.querySelector('text');
    
    if (linea) {
        linea.setAttribute('stroke', '#e74c3c');
        linea.setAttribute('stroke-width', '3');
    }
    if (rect) {
        rect.setAttribute('stroke', '#e74c3c');
        rect.setAttribute('stroke-width', '2');
    }
    if (texto) {
        texto.setAttribute('fill', '#e74c3c');
    }
    
    grupo.style.filter = 'drop-shadow(0 0 5px rgba(231, 76, 60, 0.8))';
    grupo.setAttribute('data-selected', 'true');
    showStatus('✅ Medición seleccionada - Presiona SUPRIMIR para eliminar');
}

function deseleccionarMedicion(grupo) {
    const linea = grupo.querySelector('line');
    const rect = grupo.querySelector('rect');
    const texto = grupo.querySelector('text');
    
    if (linea) {
        linea.setAttribute('stroke', '#3498db');
        linea.setAttribute('stroke-width', '2');
    }
    if (rect) {
        rect.setAttribute('stroke', '#3498db');
        rect.setAttribute('stroke-width', '1');
    }
    if (texto) {
        texto.setAttribute('fill', '#3498db');
    }
    
    grupo.style.filter = 'none';
    grupo.removeAttribute('data-selected');
}

function eliminarElementoDibujoSeleccionado() {
    const elementoSeleccionado = document.querySelector('[class^="drawing-"][data-selected="true"]');
    
    if (elementoSeleccionado) {
        elementoSeleccionado.remove();
        showStatus('🗑️ Elemento eliminado');
        return;
    }
    
    const medicionSeleccionada = document.querySelector('.measurement-group[data-selected="true"]');
    
    if (medicionSeleccionada) {
        medicionSeleccionada.remove();
        showStatus('🗑️ Medición eliminada');
        return;
    }
    
    const elementoTrazado = document.querySelector('g[id^="tracing-element-"][data-selected="true"]');
    
    if (elementoTrazado) {
        const elementId = elementoTrazado.id.replace('tracing-element-', '');
        const cameraContainer = document.getElementById(`camera-info-${elementId}`);
        if (cameraContainer) {
            cameraContainer.remove();
        }
        elementoTrazado.remove();
        showStatus('🗑️ Elemento eliminado');
        return;
    }
}

window.makeDrawingElementEditable = hacerElementoEditable;
window.selectDrawingElement = seleccionarElementoDibujo;
window.deselectDrawingElement = deseleccionarElementoDibujo;
window.deleteSelectedDrawingElement = eliminarElementoDibujoSeleccionado;

window.DrawingEdit = {
    hacerElementoEditable,
    seleccionarElemento: seleccionarElementoDibujo,
    deseleccionarElemento: deseleccionarElementoDibujo,
    seleccionarElementoDibujo,
    deseleccionarElementoDibujo,
    eliminarElementoDibujoSeleccionado,
    hacerMedicionEditable,
    seleccionarMedicion,
    deseleccionarMedicion
};

console.log('✅ drawing-edit.js cargado');