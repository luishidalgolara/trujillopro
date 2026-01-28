/* ========================================
   MODAL DINÁMICO - MUROS ESTRUCTURALES
   ======================================== */

function crearModalMuroEstructural() {
    if (document.getElementById('modalMuroEstructural')) return;
    
    const modalHTML = `
    <div class="modal" id="modalMuroEstructural">
        <div class="modal-estructural-window" style="max-width: 1400px; max-height: 85vh; overflow-y: auto;">
            <div class="modal-estructural-header">
                <div class="modal-estructural-title">
                    🏗️ MURO ESTRUCTURAL - HORMIGÓN ARMADO
                </div>
                <button class="btn-close" onclick="cerrarModalMuroEstructural()">✕</button>
            </div>
            <div class="modal-estructural-content" style="padding: 20px;">
                
                <!-- FILA 1: DATOS BÁSICOS -->
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group-estructural" style="margin-bottom: 0;">
                        <label>📝 Nombre del Muro:</label>
                        <input type="text" id="muroEstructuralNombre" placeholder="Ej: Muro Estructural Norte">
                    </div>
                    
                    <div class="form-group-estructural" style="margin-bottom: 0;">
                        <label>📏 Largo (m):</label>
                        <input type="number" id="muroEstructuralLargo" placeholder="0.00" step="0.01" oninput="actualizarMaterialesEstructural()">
                    </div>
                    
                    <div class="form-group-estructural" style="margin-bottom: 0;">
                        <label>⬆️ Altura (m):</label>
                        <input type="number" id="muroEstructuralAltura" placeholder="2.40" step="0.01" value="2.40" oninput="actualizarMaterialesEstructural()">
                    </div>
                    
                    <div class="form-group-estructural" style="margin-bottom: 0;">
                        <label>🏠 Vivienda:</label>
                        <select id="tipoVivienda" onchange="actualizarMaterialesEstructural()">
                            <option value="1">1 Piso</option>
                            <option value="2">2 Pisos</option>
                        </select>
                    </div>
                </div>
                
                <!-- FILA 2: ESPESOR -->
                <div class="form-group-estructural" style="margin-bottom: 15px;">
                    <label>📐 Espesor del Muro:</label>
                    <div class="espesor-selector">
                        <div class="espesor-option" data-espesor="15" onclick="seleccionarEspesor(15)">
                            <div class="numero">15 cm</div>
                            <div class="texto">Estándar</div>
                        </div>
                        <div class="espesor-option" data-espesor="20" onclick="seleccionarEspesor(20)">
                            <div class="numero">20 cm</div>
                            <div class="texto">Reforzado</div>
                        </div>
                    </div>
                </div>
                
                <!-- CUBICACIÓN EN 1 FILA -->
                <div class="resultado-cubicacion-estructural" style="padding: 20px;">
                    <h4 style="margin-bottom: 15px;">📊 CUBICACIÓN COMPLETA DE MATERIALES</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                        <div class="material-categoria">
                            <h5>🏗️ HORMIGÓN H20</h5>
                            <div class="material-item">
                                <span class="label">Volumen</span>
                                <span class="valor" id="volumenHormigon">0.00 m³</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Cemento</span>
                                <span class="valor" id="cemento">0.0 scs</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Arena</span>
                                <span class="valor" id="arena">0.00 m³</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Ripio</span>
                                <span class="valor" id="ripio">0.00 m³</span>
                            </div>
                        </div>
                        
                        <div class="material-categoria">
                            <h5>🔩 ENFIERRADURA</h5>
                            <div class="material-item">
                                <span class="label">Total Fierro</span>
                                <span class="valor" id="totalFierro">0.0 kg</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Barras Verticales</span>
                                <span class="valor" id="fierroVertical">0.0 kg</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Barras Horizontales</span>
                                <span class="valor" id="fierroHorizontal">0.0 kg</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Estribos</span>
                                <span class="valor" id="estribos">0.0 kg</span>
                            </div>
                        </div>
                        
                        <div class="material-categoria">
                            <h5>📋 MOLDAJE</h5>
                            <div class="material-item">
                                <span class="label">Área Total</span>
                                <span class="valor" id="areaMoldaje">0.00 m²</span>
                            </div>
                            <div class="material-item">
                                <span class="label">Madera (est)</span>
                                <span class="valor" id="maderaMoldaje">0.00 m²</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="nota-ayuda" style="margin-top: 15px; margin-bottom: 10px;">
                    <strong>💡 Cubicación Profesional:</strong>
                    Dosificación H20 (8.5 scs/m³). Cuantía de acero según espesor y niveles.
                </div>
                
                <div class="nota-normativa" style="margin-bottom: 15px;">
                    <strong>⚖️ Normativa:</strong> NCh430 + NCh204. El cálculo estructural debe ser validado por ingeniero calculista.
                </div>
                
                <div class="modal-estructural-actions">
                    <button class="btn-estructural btn-estructural-eliminar" onclick="eliminarMuroEstructuralSeleccionado()">
                        🗑️ Eliminar
                    </button>
                    <button class="btn-estructural btn-estructural-cancelar" onclick="cerrarModalMuroEstructural()">
                        ✕ Cancelar
                    </button>
                    <button class="btn-estructural btn-estructural-guardar" onclick="guardarDatosMuroEstructural()">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Abrir modal de configuración del muro estructural
function abrirModalMuroEstructural(muro) {
    crearModalMuroEstructural();
    
    const modal = document.getElementById('modalMuroEstructural');
    if (!modal) return;
    
    // Llenar campos con valores actuales (vacíos si es nuevo)
    document.getElementById('muroEstructuralNombre').value = muro.nombre || '';
    document.getElementById('muroEstructuralAltura').value = muro.altura || 2.40;
    document.getElementById('muroEstructuralLargo').value = muro.largo || '';
    document.getElementById('tipoVivienda').value = muro.niveles || 1;
    
    // Seleccionar espesor (default 15cm)
    const espesor = muro.espesor || 15;
    seleccionarEspesor(espesor);
    
    // Calcular materiales si hay datos
    actualizarMaterialesEstructural();
    
    modal.classList.add('active');
}

// Seleccionar espesor
function seleccionarEspesor(espesor) {
    // Remover selección anterior
    document.querySelectorAll('.espesor-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Marcar nueva selección
    const opcion = document.querySelector(`[data-espesor="${espesor}"]`);
    if (opcion) {
        opcion.classList.add('selected');
    }
    
    // Actualizar cálculos
    actualizarMaterialesEstructural();
}

// Actualizar materiales en el modal
function actualizarMaterialesEstructural() {
    const largo = parseFloat(document.getElementById('muroEstructuralLargo').value) || 0;
    const altura = parseFloat(document.getElementById('muroEstructuralAltura').value) || 0;
    const niveles = parseInt(document.getElementById('tipoVivienda').value) || 1;
    
    // Obtener espesor seleccionado
    const opcionSeleccionada = document.querySelector('.espesor-option.selected');
    const espesor = opcionSeleccionada ? parseInt(opcionSeleccionada.dataset.espesor) : 15;
    
    if (largo && altura) {
        const materiales = calcularMaterialesEstructural(largo, altura, espesor, niveles);
        
        // Actualizar todos los campos
        document.getElementById('volumenHormigon').textContent = materiales.volumenHormigon.toFixed(2) + ' m³';
        document.getElementById('cemento').textContent = materiales.cemento.toFixed(1) + ' scs';
        document.getElementById('arena').textContent = materiales.arena.toFixed(2) + ' m³';
        document.getElementById('ripio').textContent = materiales.ripio.toFixed(2) + ' m³';
        
        document.getElementById('totalFierro').textContent = materiales.totalFierro.toFixed(1) + ' kg';
        document.getElementById('fierroVertical').textContent = materiales.fierroVertical.toFixed(1) + ' kg';
        document.getElementById('fierroHorizontal').textContent = materiales.fierroHorizontal.toFixed(1) + ' kg';
        document.getElementById('estribos').textContent = materiales.estribos.toFixed(1) + ' kg';
        
        document.getElementById('areaMoldaje').textContent = materiales.areaMoldaje.toFixed(2) + ' m²';
        document.getElementById('maderaMoldaje').textContent = materiales.areaMoldaje.toFixed(2) + ' m²';
    } else {
        // Resetear valores
        document.getElementById('volumenHormigon').textContent = '0.00 m³';
        document.getElementById('cemento').textContent = '0.0 scs';
        document.getElementById('arena').textContent = '0.00 m³';
        document.getElementById('ripio').textContent = '0.00 m³';
        
        document.getElementById('totalFierro').textContent = '0.0 kg';
        document.getElementById('fierroVertical').textContent = '0.0 kg';
        document.getElementById('fierroHorizontal').textContent = '0.0 kg';
        document.getElementById('estribos').textContent = '0.0 kg';
        
        document.getElementById('areaMoldaje').textContent = '0.00 m²';
        document.getElementById('maderaMoldaje').textContent = '0.00 m²';
    }
}

// Cerrar modal de muro estructural
function cerrarModalMuroEstructural() {
    const modal = document.getElementById('modalMuroEstructural');
    if (modal) {
        modal.classList.remove('active');
    }
    muroEstructuralSeleccionado = null;
}

// Guardar datos del muro estructural
function guardarDatosMuroEstructural() {
    if (!muroEstructuralSeleccionado) return;
    
    const nombre = document.getElementById('muroEstructuralNombre').value;
    const altura = parseFloat(document.getElementById('muroEstructuralAltura').value);
    const largo = parseFloat(document.getElementById('muroEstructuralLargo').value);
    const niveles = parseInt(document.getElementById('tipoVivienda').value);
    
    // Obtener espesor seleccionado
    const opcionSeleccionada = document.querySelector('.espesor-option.selected');
    const espesor = opcionSeleccionada ? parseInt(opcionSeleccionada.dataset.espesor) : 15;
    
    if (!nombre || !altura || !largo) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    // Calcular materiales completos
    const materiales = calcularMaterialesEstructural(largo, altura, espesor, niveles);
    
    // Actualizar muro
    muroEstructuralSeleccionado.nombre = nombre;
    muroEstructuralSeleccionado.altura = altura;
    muroEstructuralSeleccionado.largo = largo;
    muroEstructuralSeleccionado.espesor = espesor;
    muroEstructuralSeleccionado.niveles = niveles;
    
    // Guardar todos los materiales
    muroEstructuralSeleccionado.volumenHormigon = materiales.volumenHormigon;
    muroEstructuralSeleccionado.cemento = materiales.cemento;
    muroEstructuralSeleccionado.arena = materiales.arena;
    muroEstructuralSeleccionado.ripio = materiales.ripio;
    muroEstructuralSeleccionado.totalFierro = materiales.totalFierro;
    muroEstructuralSeleccionado.fierroVertical = materiales.fierroVertical;
    muroEstructuralSeleccionado.fierroHorizontal = materiales.fierroHorizontal;
    muroEstructuralSeleccionado.estribos = materiales.estribos;
    muroEstructuralSeleccionado.areaMoldaje = materiales.areaMoldaje;
    muroEstructuralSeleccionado.completado = true;
    
    cerrarModalMuroEstructural();
    redibujarCanvas();
    actualizarEstado(`✓ ${nombre} guardado - ${materiales.volumenHormigon.toFixed(2)} m³ hormigón, ${materiales.totalFierro.toFixed(1)} kg fierro`);
}

// Eliminar muro estructural seleccionado
function eliminarMuroEstructuralSeleccionado() {
    if (!muroEstructuralSeleccionado) return;
    
    if (confirm('¿Está seguro de eliminar este muro estructural?')) {
        murosEstructurales = murosEstructurales.filter(m => m.id !== muroEstructuralSeleccionado.id);
        cerrarModalMuroEstructural();
        redibujarCanvas();
        actualizarEstado('✓ Muro estructural eliminado');
    }
}