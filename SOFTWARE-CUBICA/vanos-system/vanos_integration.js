/* ========================================
   INTEGRACIÓN CON SISTEMA PRINCIPAL
   ======================================== */

// Interceptar eventos del canvas principal
function integrarVanosEnCanvas() {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return;
    
    // Interceptar clicks
    const clickOriginal = canvas.onclick;
    canvas.onclick = function(event) {
        // Si está en modo vanos, manejar aquí
        if (vanosState.modoColocacion) {
            const manejado = manejarClickVano(event);
            if (manejado) return;
        }
        
        // Si no, llamar al handler original
        if (clickOriginal) clickOriginal.call(this, event);
    };
    
    // Interceptar movimiento del mouse
    const mouseMoveOriginal = canvas.onmousemove;
    canvas.onmousemove = function(event) {
        // Si está en modo vanos, manejar preview
        if (vanosState.modoColocacion) {
            const manejado = manejarMouseMoveVano(event);
            if (manejado) return;
        }
        
        // Si no, llamar al handler original
        if (mouseMoveOriginal) mouseMoveOriginal.call(this, event);
    };
}

// Interceptar teclas globales
function integrarVanosTeclas() {
    const teclasOriginal = document.onkeydown;
    
    document.onkeydown = function(event) {
        // Si está en modo vanos
        if (vanosState.modoColocacion) {
            if (event.key === 'Enter') {
                confirmarColocacionVano();
                event.preventDefault();
                return;
            }
            
            if (event.key === 'Escape') {
                cancelarColocacionVano();
                event.preventDefault();
                return;
            }
        }
        
        // Llamar al handler original
        if (teclasOriginal) teclasOriginal.call(this, event);
    };
}

// Modificar función de dibujo principal
function integrarVanosEnDibujo() {
    // Guardar función original
    if (typeof dibujarMurosEnCanvas !== 'undefined') {
        const dibujarOriginal = dibujarMurosEnCanvas;
        
        window.dibujarMurosEnCanvas = function(ctx) {
            // Llamar función original
            dibujarOriginal.call(this, ctx);
            
            // Agregar preview de vanos
            dibujarPreviewVano(ctx);
        };
    }
}

// 🆕 INTEGRACIÓN 3D - SOLO REEMPLAZAR FUNCIÓN DE CREACIÓN DE MUROS
function integrarVanosEn3D() {
    // Guardar la función original de crear muro 3D
    if (typeof crearMuro3D !== 'undefined') {
        const crearMuro3DOriginal = crearMuro3D;
        
        // Reemplazar crearMuro3D para que use crearMuro3DConVanos si el muro tiene vanos
        window.crearMuro3D = function(muro, color, centroComun, escala) {
            // Si el muro tiene vanos, usar la función con vanos
            if (muro.vanos && muro.vanos.length > 0) {
                return crearMuro3DConVanos(muro, color, centroComun, escala);
            }
            // Si no tiene vanos, usar la función original
            return crearMuro3DOriginal(muro, color, centroComun, escala);
        };
        
        console.log('✅ Sistema de vanos integrado en 3D (wrapper sobre crearMuro3D)');
    }
}

// Agregar botón en modal de muro
function agregarBotonVanosEnModal() {
    const modalOriginal = window.abrirModalMuroHormigon;
    
    window.abrirModalMuroHormigon = function(muro) {
        modalOriginal.call(this, muro);
        
        // Agregar botón de vanos si no existe
        const modal = document.getElementById('modalMuroHormigon');
        if (modal && !document.getElementById('btnAgregarVanos')) {
            const actions = modal.querySelector('.modal-muro-actions');
            
            const btnVanos = document.createElement('button');
            btnVanos.id = 'btnAgregarVanos';
            btnVanos.className = 'btn-muro';
            btnVanos.style.background = '#3498db';
            btnVanos.innerHTML = '🗝️ AGREGAR VANOS';
            btnVanos.onclick = function() {
                abrirModalVanos(muroSeleccionado);
            };
            
            actions.insertBefore(btnVanos, actions.firstChild);
        }
    };
}

window.integrarVanosEnCanvas = integrarVanosEnCanvas;
window.integrarVanosTeclas = integrarVanosTeclas;
window.integrarVanosEnDibujo = integrarVanosEnDibujo;
window.integrarVanosEn3D = integrarVanosEn3D;
window.agregarBotonVanosEnModal = agregarBotonVanosEnModal;