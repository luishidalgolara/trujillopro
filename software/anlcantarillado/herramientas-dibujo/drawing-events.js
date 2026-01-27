// herramientas-dibujo/drawing-events.js

function inicializarHerramientasDibujo() {
    const tracingSvg = document.getElementById('tracingSvg');
    
    if (!tracingSvg) {
        setTimeout(inicializarHerramientasDibujo, 100);
        return;
    }

    tracingSvg.addEventListener('click', function(e) {
        // 🔧 PRIORIDAD: Si hay herramienta de dibujo activa, procesarla PRIMERO
        if (window.DrawingCore.obtenerHerramientaActual() && !isNavigationMode) {
            window.DrawingCore.manejarClickDibujo(e);
            return;
        }
        
        // 📏 Si NO hay herramienta de dibujo, verificar modo medición
        if (window.MeasuringTool && window.MeasuringTool.estaMidiendo()) {
            const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
            const handled = window.MeasuringTool.handleMeasuringClick(coords);
            if (handled) return;
        }
    });

    tracingSvg.addEventListener('contextmenu', function(e) {
        if (isNavigationMode) return;
        
        e.preventDefault();
        
        const ultimaHerramienta = window.DrawingCore.obtenerUltimaHerramienta();
        const herramientaActual = window.DrawingCore.obtenerHerramientaActual();
        
        if (ultimaHerramienta && !herramientaActual) {
            window.DrawingCore.seleccionarHerramientaDibujo(ultimaHerramienta);
            showStatus(`🔁 Repitiendo: ${ultimaHerramienta.toUpperCase()}`);
        }
    });

    tracingSvg.addEventListener('mousemove', function(e) {
        // 🔧 PRIORIDAD: Si hay herramienta de dibujo activa, procesarla PRIMERO
        if (window.DrawingCore.obtenerHerramientaActual() && !isNavigationMode) {
            window.DrawingCore.manejarMovimientoDibujo(e);
            return;
        }
        
        // 📏 Si NO hay herramienta de dibujo, actualizar línea temporal de medición
        if (window.MeasuringTool && window.MeasuringTool.estaMidiendo()) {
            const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
            window.MeasuringTool.actualizarLineaTemporal(coords);
        }
    });

    tracingSvg.addEventListener('dblclick', function(e) {
        const herramientaActual = window.DrawingCore.obtenerHerramientaActual();
        
        if (!herramientaActual || isNavigationMode) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        if (herramientaActual === 'pline') {
            window.DrawingAdvanced.finalizarPolilinea();
        } else if (herramientaActual === 'spline') {
            window.DrawingAdvanced.finalizarSpline();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 🔧 PRIORIDAD: Si hay herramienta de dibujo, cancelarla PRIMERO
            if (window.DrawingCore.obtenerHerramientaActual()) {
                window.DrawingCore.cancelarDibujoActual();
                showStatus('❌ Comando cancelado (ESC)');
                return;
            }
            
            // 📏 Si NO hay herramienta de dibujo, desactivar modo medición
            if (window.MeasuringTool && window.MeasuringTool.estaMidiendo()) {
                window.MeasuringTool.toggleMeasuringMode();
                showStatus('❌ Modo medición cancelado (ESC)');
                return;
            }
        }
        
        const herramientaActual = window.DrawingCore.obtenerHerramientaActual();
        
        if (!herramientaActual || isNavigationMode) return;
        
        if (e.key === 'Enter') {
            if (herramientaActual === 'pline') {
                window.DrawingAdvanced.finalizarPolilinea();
            } else if (herramientaActual === 'spline') {
                window.DrawingAdvanced.finalizarSpline();
            }
        }
        
        if (e.key === 'Delete' || e.key === 'Suprimir') {
            window.DrawingEdit.eliminarElementoDibujoSeleccionado();
        }
    });

    console.log('✅ Drawing tools initialized (integrado con CAD Helpers)');
}

window.initializeDrawingTools = inicializarHerramientasDibujo;

window.DrawingEvents = {
    inicializarHerramientasDibujo
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarHerramientasDibujo);
} else {
    inicializarHerramientasDibujo();
}

console.log('✅ drawing-events.js cargado');