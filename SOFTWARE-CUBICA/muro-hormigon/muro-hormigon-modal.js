/* ========================================
   MODAL DINÁMICO - MUROS DE HORMIGÓN CON VANOS
   ======================================== */

function crearModalMuroHormigon() {
    if (document.getElementById('modalMuroHormigon')) return;
    
    const modalHTML = `
    <div class="modal" id="modalMuroHormigon">
        <div class="modal-muro-window" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-muro-header">
                <div class="modal-muro-title">
                    🧱 CONFIGURACIÓN MURO DE HORMIGÓN
                </div>
                <button class="btn-close" onclick="cerrarModalMuroHormigon()">✕</button>
            </div>
            <div class="modal-muro-content">
                <div class="form-group-muro">
                    <label>📝 Nombre del Muro:</label>
                    <input type="text" id="muroNombre" placeholder="Ej: Muro Norte">
                </div>
                
                <div class="form-row">
                    <div class="form-group-muro">
                        <label>📏 Largo (m):</label>
                        <input type="number" id="muroLargo" placeholder="0.00" step="0.01" oninput="actualizarVolumenModal()">
                    </div>
                    
                    <div class="form-group-muro">
                        <label>⬆️ Altura (m):</label>
                        <input type="number" id="muroAltura" placeholder="0.00" step="0.01" oninput="actualizarVolumenModal()">
                    </div>
                    
                    <div class="form-group-muro">
                        <label>📐 Espesor (m):</label>
                        <input type="number" id="muroEspesor" placeholder="0.15" step="0.01" value="0.15" oninput="actualizarVolumenModal()">
                    </div>
                </div>
                
                <!-- NUEVA SECCIÓN DE VANOS -->
                <div class="seccion-vanos">
                    <h3 style="margin: 20px 0 15px 0; color: #2c3e50; font-size: 16px;">🏗️ VANOS (Puertas y Ventanas)</h3>
                    
                    <div id="listaVanosModal">
                        <p style="text-align: center; color: #95a5a6; padding: 15px;">
                            No hay vanos agregados
                        </p>
                    </div>
                    
                    <button class="btn-muro" style="background: #3498db; color: white; width: 100%; margin-top: 10px;" 
                            onclick="abrirMenuVanos()">
                        ➕ AGREGAR VANO
                    </button>
                </div>
                
                <div class="resultado-cubicacion">
                    <h4>📦 VOLUMEN DE HORMIGÓN</h4>
                    <div class="volumen" id="muroVolumen">0.000 m³</div>
                    <div id="detalleDescuento" style="font-size: 12px; margin-top: 5px; opacity: 0.9;"></div>
                </div>
                
                <div class="nota-ayuda">
                    <strong>💡 Nota:</strong>
                    El largo se calcula automáticamente. Los vanos se descuentan del volumen total.
                </div>
                
                <div class="modal-muro-actions">
                    <button class="btn-muro btn-muro-eliminar" onclick="eliminarMuroSeleccionado()">
                        🗑️ Eliminar
                    </button>
                    <button class="btn-muro btn-muro-cancelar" onclick="cerrarModalMuroHormigon()">
                        ✕ Cancelar
                    </button>
                    <button class="btn-muro btn-muro-guardar" onclick="guardarDatosMuro()">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- MENÚ SELECCIÓN DE VANO -->
    <div class="modal" id="menuVanos" style="display: none;">
        <div class="modal-muro-window" style="max-width: 500px;">
            <div class="modal-muro-header">
                <div class="modal-muro-title">🏗️ AGREGAR VANO</div>
                <button class="btn-close" onclick="cerrarMenuVanos()">✕</button>
            </div>
            <div class="modal-muro-content">
                <p style="margin-bottom: 20px; color: #7f8c8d;">Seleccione el tipo de vano:</p>
                
                <button class="btn-tipo-vano" onclick="seleccionarTipoVano('puerta')" 
                        style="background: #3498db;">
                    🚪 PUERTA
                </button>
                
                <button class="btn-tipo-vano" onclick="seleccionarTipoVano('ventana')"
                        style="background: #f39c12;">
                    🪟 VENTANA
                </button>
            </div>
        </div>
    </div>
    
    <!-- FORMULARIO PUERTA -->
    <div class="modal" id="formPuerta" style="display: none;">
        <div class="modal-muro-window" style="max-width: 500px;">
            <div class="modal-muro-header">
                <div class="modal-muro-title">🚪 DIMENSIONES PUERTA</div>
                <button class="btn-close" onclick="cerrarFormVano()">✕</button>
            </div>
            <div class="modal-muro-content">
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
                
                <div class="modal-muro-actions">
                    <button class="btn-muro btn-muro-cancelar" onclick="cerrarFormVano()">✕ Cancelar</button>
                    <button class="btn-muro btn-muro-guardar" onclick="iniciarColocacionVanoDirecto('puerta')">
                        ➕ COLOCAR
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- FORMULARIO VENTANA -->
    <div class="modal" id="formVentana" style="display: none;">
        <div class="modal-muro-window" style="max-width: 500px;">
            <div class="modal-muro-header">
                <div class="modal-muro-title">🪟 DIMENSIONES VENTANA</div>
                <button class="btn-close" onclick="cerrarFormVano()">✕</button>
            </div>
            <div class="modal-muro-content">
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
                
                <div class="modal-muro-actions">
                    <button class="btn-muro btn-muro-cancelar" onclick="cerrarFormVano()">✕ Cancelar</button>
                    <button class="btn-muro btn-muro-guardar" onclick="iniciarColocacionVanoDirecto('ventana')">
                        ➕ COLOCAR
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Abrir modal de configuración del muro
function abrirModalMuroHormigon(muro) {
    crearModalMuroHormigon();
    
    const modal = document.getElementById('modalMuroHormigon');
    if (!modal) return;
    
    // Calcular largo automático si no existe
    if (muro.puntos && muro.puntos.length >= 2 && !muro.largo) {
        let largoTotal = 0;
        for (let i = 0; i < muro.puntos.length - 1; i++) {
            const p1 = muro.puntos[i];
            const p2 = muro.puntos[i + 1];
            const distancia = Math.sqrt(
                Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
            );
            largoTotal += distancia;
        }
        muro.largo = (largoTotal / 100).toFixed(2);
    }
    
    // Llenar campos con valores actuales del muro
    document.getElementById('muroNombre').value = muro.nombre || '';
    document.getElementById('muroAltura').value = muro.altura || '';
    document.getElementById('muroLargo').value = muro.largo || '';
    document.getElementById('muroEspesor').value = muro.espesor || 0.15;
    
    // Mostrar vanos existentes
    actualizarListaVanosEnModal(muro);
    
    // Calcular volumen
    actualizarVolumenModal();
    
    modal.classList.add('active');
}

// Actualizar lista de vanos en modal
function actualizarListaVanosEnModal(muro) {
    const lista = document.getElementById('listaVanosModal');
    
    if (!muro.vanos || muro.vanos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #95a5a6; padding: 15px;">No hay vanos agregados</p>';
        return;
    }
    
    let html = '<div class="vanos-list">';
    muro.vanos.forEach((vano, idx) => {
        const icono = vano.tipo === 'puerta' ? '🚪' : '🪟';
        html += `
        <div class="vano-item">
            <span>${icono} ${vano.tipo.toUpperCase()} - ${vano.ancho}×${vano.alto}m</span>
            <button class="btn-eliminar-vano" onclick="eliminarVanoDelMuro(${idx})">🗑️</button>
        </div>
        `;
    });
    html += '</div>';
    lista.innerHTML = html;
}

// Eliminar vano del muro
function eliminarVanoDelMuro(indice) {
    if (!muroSeleccionado) return;
    
    if (confirm('¿Eliminar este vano?')) {
        muroSeleccionado.vanos.splice(indice, 1);
        actualizarListaVanosEnModal(muroSeleccionado);
        actualizarVolumenModal();
        redibujarCanvas();
    }
}

// Abrir menú de selección de vano
function abrirMenuVanos() {
    document.getElementById('menuVanos').style.display = 'flex';
}

function cerrarMenuVanos() {
    document.getElementById('menuVanos').style.display = 'none';
}

// Seleccionar tipo de vano
function seleccionarTipoVano(tipo) {
    cerrarMenuVanos();
    
    if (tipo === 'puerta') {
        document.getElementById('formPuerta').style.display = 'flex';
    } else {
        document.getElementById('formVentana').style.display = 'flex';
    }
}

function cerrarFormVano() {
    document.getElementById('formPuerta').style.display = 'none';
    document.getElementById('formVentana').style.display = 'none';
}

// Iniciar colocación de vano
function iniciarColocacionVanoDirecto(tipo) {
    let ancho, alto, alturaBase;
    
    if (tipo === 'puerta') {
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
    
    // 🆕 CRÍTICO: Desactivar herramienta de muro ANTES de colocar vano
    if (typeof desactivarMuroHormigon === 'function') {
        desactivarMuroHormigon();
    }
    
    // Cerrar todos los modales
    cerrarFormVano();
    document.getElementById('modalMuroHormigon').classList.remove('active');
    
    // Activar modo colocación
    activarModoColocacionVano(muroSeleccionado, tipo, ancho, alto, alturaBase);
    
    // Mostrar mensaje con el cursor
    console.log('✅ Modo colocación activado');
    console.log('Estado vanosState:', vanosState);
}

// Actualizar volumen con descuento de vanos
function actualizarVolumenModal() {
    const largo = parseFloat(document.getElementById('muroLargo').value) || 0;
    const altura = parseFloat(document.getElementById('muroAltura').value) || 0;
    const espesor = parseFloat(document.getElementById('muroEspesor').value) || 0;
    
    if (largo && altura && espesor) {
        let volumenTotal = largo * altura * espesor;
        let volumenDescuento = 0;
        
        // Descontar vanos
        if (muroSeleccionado && muroSeleccionado.vanos && muroSeleccionado.vanos.length > 0) {
            muroSeleccionado.vanos.forEach(vano => {
                volumenDescuento += vano.ancho * vano.alto * espesor;
            });
        }
        
        const volumenFinal = volumenTotal - volumenDescuento;
        
        document.getElementById('muroVolumen').textContent = volumenFinal.toFixed(3) + ' m³';
        
        if (volumenDescuento > 0) {
            document.getElementById('detalleDescuento').textContent = 
                `(Descontado ${volumenDescuento.toFixed(3)} m³ de vanos)`;
        } else {
            document.getElementById('detalleDescuento').textContent = '';
        }
    } else {
        document.getElementById('muroVolumen').textContent = '0.000 m³';
        document.getElementById('detalleDescuento').textContent = '';
    }
}

// Cerrar modal de muro
function cerrarModalMuroHormigon() {
    const modal = document.getElementById('modalMuroHormigon');
    if (modal) {
        modal.classList.remove('active');
    }
    muroSeleccionado = null;
}

// Guardar datos del muro
function guardarDatosMuro() {
    if (!muroSeleccionado) return;
    
    const nombre = document.getElementById('muroNombre').value.trim();
    const altura = parseFloat(document.getElementById('muroAltura').value);
    const largo = parseFloat(document.getElementById('muroLargo').value);
    const espesor = parseFloat(document.getElementById('muroEspesor').value);
    
    // Validación
    if (!nombre) {
        alert('⚠️ Ingrese el nombre del muro');
        return;
    }
    
    if (!altura || altura <= 0) {
        alert('⚠️ Ingrese la altura del muro');
        return;
    }
    
    if (!largo || largo <= 0) {
        alert('⚠️ El largo del muro es inválido');
        return;
    }
    
    if (!espesor || espesor <= 0) {
        alert('⚠️ Ingrese el espesor del muro');
        return;
    }
    
    // Calcular volumen con descuento de vanos
    let volumen = largo * altura * espesor;
    
    if (muroSeleccionado.vanos && muroSeleccionado.vanos.length > 0) {
        muroSeleccionado.vanos.forEach(vano => {
            volumen -= vano.ancho * vano.alto * espesor;
        });
    }
    
    // Actualizar muro
    muroSeleccionado.nombre = nombre;
    muroSeleccionado.altura = altura;
    muroSeleccionado.largo = largo;
    muroSeleccionado.espesor = espesor;
    muroSeleccionado.volumen = volumen;
    muroSeleccionado.completado = true;
    
    cerrarModalMuroHormigon();
    redibujarCanvas();
    
    const cantVanos = muroSeleccionado.vanos ? muroSeleccionado.vanos.length : 0;
    const msgVanos = cantVanos > 0 ? ` (${cantVanos} vano${cantVanos > 1 ? 's' : ''})` : '';
    actualizarEstado('✅ ' + nombre + ' guardado - ' + volumen.toFixed(3) + ' m³' + msgVanos);
}

// Eliminar muro seleccionado
function eliminarMuroSeleccionado() {
    if (!muroSeleccionado) return;
    
    if (confirm('¿Está seguro de eliminar este muro?')) {
        murosHormigon = murosHormigon.filter(m => m.id !== muroSeleccionado.id);
        cerrarModalMuroHormigon();
        redibujarCanvas();
        actualizarEstado('✅ Muro eliminado');
    }
}