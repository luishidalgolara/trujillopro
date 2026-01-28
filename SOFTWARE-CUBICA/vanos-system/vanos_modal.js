/* ========================================
   MODAL DE GESTIÓN DE VANOS
   ======================================== */

function crearModalVanos() {
    if (document.getElementById('modalVanos')) return;
    
    const modalHTML = `
    <div class="modal" id="modalVanos">
        <div class="modal-muro-window" style="max-width: 600px;">
            <div class="modal-muro-header">
                <div class="modal-muro-title">
                    🏗️ AGREGAR VANOS AL MURO
                </div>
                <button class="btn-close" onclick="cerrarModalVanos()">✕</button>
            </div>
            <div class="modal-muro-content">
                <div class="tabs-vanos">
                    <button class="tab-vano active" onclick="cambiarTabVano('puerta')">
                        🚪 PUERTA
                    </button>
                    <button class="tab-vano" onclick="cambiarTabVano('ventana')">
                        🪟 VENTANA
                    </button>
                </div>
                
                <div id="formPuerta" class="form-vano active">
                    <h4>📐 DIMENSIONES PUERTA</h4>
                    <div class="form-row">
                        <div class="form-group-muro">
                            <label>Ancho (m):</label>
                            <input type="number" id="puertaAncho" value="0.90" step="0.05" min="0.6" max="2.5">
                        </div>
                        <div class="form-group-muro">
                            <label>Alto (m):</label>
                            <input type="number" id="puertaAlto" value="2.10" step="0.05" min="1.8" max="2.5">
                        </div>
                    </div>
                    <p class="nota-vano">💡 Las puertas se colocan desde el suelo</p>
                </div>
                
                <div id="formVentana" class="form-vano">
                    <h4>📐 DIMENSIONES VENTANA</h4>
                    <div class="form-row">
                        <div class="form-group-muro">
                            <label>Ancho (m):</label>
                            <input type="number" id="ventanaAncho" value="1.20" step="0.05" min="0.4" max="3.0">
                        </div>
                        <div class="form-group-muro">
                            <label>Alto (m):</label>
                            <input type="number" id="ventanaAlto" value="1.00" step="0.05" min="0.4" max="2.0">
                        </div>
                    </div>
                    <div class="form-group-muro">
                        <label>⬆️ Altura desde piso (m):</label>
                        <input type="number" id="ventanaAlturaBase" value="1.00" step="0.05" min="0.5" max="2.0">
                    </div>
                    <p class="nota-vano">💡 La altura es desde el nivel del piso hasta la base de la ventana</p>
                </div>
                
                <div class="lista-vanos" id="listaVanosActuales">
                    <!-- Se llenará dinámicamente -->
                </div>
                
                <div class="modal-muro-actions">
                    <button class="btn-muro btn-muro-cancelar" onclick="cerrarModalVanos()">
                        ✕ Cerrar
                    </button>
                    <button class="btn-muro btn-muro-guardar" onclick="iniciarColocacionVano()">
                        ➕ COLOCAR
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function abrirModalVanos(muro) {
    crearModalVanos();
    
    vanosState.muroObjetivo = muro;
    
    const modal = document.getElementById('modalVanos');
    modal.classList.add('active');
    
    // Actualizar lista de vanos existentes
    actualizarListaVanos(muro);
}

function cerrarModalVanos() {
    const modal = document.getElementById('modalVanos');
    if (modal) {
        modal.classList.remove('active');
    }
    resetearVanosState();
}

function cambiarTabVano(tipo) {
    // Cambiar tabs activos
    document.querySelectorAll('.tab-vano').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Cambiar forms activos
    document.getElementById('formPuerta').classList.remove('active');
    document.getElementById('formVentana').classList.remove('active');
    
    if (tipo === 'puerta') {
        document.getElementById('formPuerta').classList.add('active');
    } else {
        document.getElementById('formVentana').classList.add('active');
    }
}

function iniciarColocacionVano() {
    const tabActivo = document.querySelector('.tab-vano.active').textContent.includes('PUERTA') ? 'puerta' : 'ventana';
    
    let ancho, alto, alturaBase;
    
    if (tabActivo === 'puerta') {
        ancho = parseFloat(document.getElementById('puertaAncho').value);
        alto = parseFloat(document.getElementById('puertaAlto').value);
        alturaBase = 0;
    } else {
        ancho = parseFloat(document.getElementById('ventanaAncho').value);
        alto = parseFloat(document.getElementById('ventanaAlto').value);
        alturaBase = parseFloat(document.getElementById('ventanaAlturaBase').value);
    }
    
    if (!ancho || !alto) {
        alert('⚠️ Complete las dimensiones');
        return;
    }
    
    // Cerrar modal
    cerrarModalVanos();
    
    // Activar modo colocación
    activarModoColocacionVano(vanosState.muroObjetivo, tabActivo, ancho, alto, alturaBase);
}

function actualizarListaVanos(muro) {
    const lista = document.getElementById('listaVanosActuales');
    
    if (!muro.vanos || muro.vanos.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#95a5a6; padding:20px;">Sin vanos agregados</p>';
        return;
    }
    
    let html = '<h4>📋 VANOS ACTUALES:</h4><div class="vanos-list">';
    
    muro.vanos.forEach((vano, idx) => {
        const icono = vano.tipo === 'puerta' ? '🚪' : '🪟';
        html += `
        <div class="vano-item">
            <span>${icono} ${vano.tipo.toUpperCase()} - ${vano.ancho}×${vano.alto}m</span>
            <button class="btn-eliminar-vano" onclick="eliminarVano(${idx})">🗑️</button>
        </div>
        `;
    });
    
    html += '</div>';
    lista.innerHTML = html;
}

function eliminarVano(indice) {
    if (!vanosState.muroObjetivo) return;
    
    if (confirm('¿Eliminar este vano?')) {
        vanosState.muroObjetivo.vanos.splice(indice, 1);
        recalcularVolumenMuro(vanosState.muroObjetivo);
        actualizarListaVanos(vanosState.muroObjetivo);
        redibujarCanvas();
    }
}

window.abrirModalVanos = abrirModalVanos;
window.cerrarModalVanos = cerrarModalVanos;
window.cambiarTabVano = cambiarTabVano;
window.iniciarColocacionVano = iniciarColocacionVano;
window.eliminarVano = eliminarVano;