/* ========================================
   MODAL DINÁMICO - TABIQUERÍA
   ======================================== */

function crearModalTabique() {
    if (document.getElementById('modalTabique')) return;
    
    const modalHTML = `
    <div class="modal" id="modalTabique">
        <div class="modal-tabique-window" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-tabique-header">
                <div class="modal-tabique-title">
                    📏 CONFIGURACIÓN TABIQUERÍA
                </div>
                <button class="btn-close" onclick="cerrarModalTabique()">✕</button>
            </div>
            <div class="modal-tabique-content">
                <div class="form-group-tabique">
                    <label>📝 Nombre del Tabique:</label>
                    <input type="text" id="tabiqueNombre" placeholder="Ej: Tabique Dormitorio">
                </div>
                
                <div class="form-group-tabique">
                    <label>🏗️ Tipo de Tabiquería:</label>
                    <div class="tipo-tabique-selector">
                        <div class="tipo-tabique-option" data-tipo="interior" onclick="seleccionarTipoTabique('interior')">
                            <div class="icono">🏠</div>
                            <div class="titulo">INTERIOR</div>
                            <div class="descripcion">Divisiones internas</div>
                        </div>
                        <div class="tipo-tabique-option" data-tipo="exterior" onclick="seleccionarTipoTabique('exterior')">
                            <div class="icono">🌤️</div>
                            <div class="titulo">EXTERIOR</div>
                            <div class="descripcion">Muros perimetrales</div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group-tabique" id="espesorContainer" style="display: none;">
                    <label>📐 Espesor del Tabique:</label>
                    <div class="espesor-selector" id="espesorSelector">
                        <!-- Opciones dinámicas según tipo -->
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group-tabique">
                        <label>📏 Largo (m):</label>
                        <input type="number" id="tabiqueLargo" placeholder="0.00" step="0.01" oninput="actualizarMaterialesModal()">
                    </div>
                    
                    <div class="form-group-tabique">
                        <label>⬆️ Altura (m):</label>
                        <input type="number" id="tabiqueAltura" placeholder="0.00" step="0.01" oninput="actualizarMaterialesModal()">
                    </div>
                </div>
                
                <div class="form-group-tabique">
                    <label>📏 Separación entre Montantes:</label>
                    <div class="separacion-selector">
                        <div class="separacion-option" data-separacion="40" onclick="seleccionarSeparacion(40)">
                            <div class="numero">40 cm</div>
                            <div class="texto">Más resistente</div>
                        </div>
                        <div class="separacion-option" data-separacion="60" onclick="seleccionarSeparacion(60)">
                            <div class="numero">60 cm</div>
                            <div class="texto">Estándar</div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group-tabique">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" id="conAislacion" onchange="actualizarMaterialesModal()" style="width: auto; cursor: pointer;">
                        🧊 Incluir Aislación Térmica
                    </label>
                </div>
                
                <div class="resultado-cubicacion-tabique">
                    <h4>📊 CUBICACIÓN COMPLETA DE MATERIALES</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                        <div>
                            <h5 style="color: white; margin-bottom: 15px; font-size: 13px;">ESTRUCTURA METÁLICA/MADERA</h5>
                            <div class="resultado-item">
                                <div class="label">📏 Solera Inferior</div>
                                <div class="valor" id="soleraInferior">0.00 m</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">📏 Solera Superior</div>
                                <div class="valor" id="soleraSuperior">0.00 m</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">📏 Total Soleras</div>
                                <div class="valor" id="totalSoleras">0.00 m</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">🔩 Pies Derechos (cant)</div>
                                <div class="valor" id="cantidadPiesDerechos">0</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">📏 Metros Pies Derechos</div>
                                <div class="valor" id="metrosPiesDerechos">0.00 m</div>
                            </div>
                        </div>
                        
                        <div>
                            <h5 style="color: white; margin-bottom: 15px; font-size: 13px;">REFUERZOS Y REVESTIMIENTO</h5>
                            <div class="resultado-item">
                                <div class="label">➕ Refuerzos Horizontales</div>
                                <div class="valor" id="cantidadRefuerzos">0</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">📏 Metros Refuerzos</div>
                                <div class="valor" id="metrosRefuerzos">0.00 m</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">📄 Área Placas (2 caras)</div>
                                <div class="valor" id="areaPlacas">0.00 m²</div>
                            </div>
                            <div class="resultado-item" id="aislacionItem" style="display: none;">
                                <div class="label">🧊 Área Aislación</div>
                                <div class="valor" id="areaAislacion">0.00 m²</div>
                            </div>
                            <div class="resultado-item">
                                <div class="label">🔩 Tornillos Aprox.</div>
                                <div class="valor" id="totalTornillos">0 un</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="nota-ayuda">
                    <strong>💡 Cubicación Profesional:</strong>
                    Incluye soleras, pies derechos según separación elegida, refuerzos horizontales cada 1.2m, placas ambas caras, aislación opcional y tornillos estimados.
                </div>
                
                <div class="modal-tabique-actions">
                    <button class="btn-tabique btn-tabique-eliminar" onclick="eliminarTabiqueSeleccionado()">
                        🗑️ Eliminar
                    </button>
                    <button class="btn-tabique btn-tabique-cancelar" onclick="cerrarModalTabique()">
                        ✕ Cancelar
                    </button>
                    <button class="btn-tabique btn-tabique-guardar" onclick="guardarDatosTabique()">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Seleccionar tipo de tabiquería
function seleccionarTipoTabique(tipo) {
    // Remover selección anterior
    document.querySelectorAll('.tipo-tabique-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Marcar nueva selección
    const opcion = document.querySelector(`[data-tipo="${tipo}"]`);
    if (opcion) {
        opcion.classList.add('selected');
    }
    
    // Mostrar contenedor de espesores
    const espesorContainer = document.getElementById('espesorContainer');
    const espesorSelector = document.getElementById('espesorSelector');
    
    espesorContainer.style.display = 'block';
    
    // Generar opciones de espesor según tipo
    if (tipo === 'interior') {
        espesorSelector.innerHTML = `
            <div class="espesor-option" data-espesor="0.07" onclick="seleccionarEspesor(0.07)">
                <div class="numero">0.07 m</div>
                <div class="texto">Estándar</div>
            </div>
            <div class="espesor-option" data-espesor="0.09" onclick="seleccionarEspesor(0.09)">
                <div class="numero">0.09 m</div>
                <div class="texto">Reforzado</div>
            </div>
        `;
    } else if (tipo === 'exterior') {
        espesorSelector.innerHTML = `
            <div class="espesor-option" data-espesor="0.09" onclick="seleccionarEspesor(0.09)">
                <div class="numero">0.09 m</div>
                <div class="texto">Estructural</div>
            </div>
            <div class="espesor-option" data-espesor="0.14" onclick="seleccionarEspesor(0.14)">
                <div class="numero">0.12 - 0.14 m</div>
                <div class="texto">Total terminado</div>
            </div>
        `;
    }
    
    actualizarMaterialesModal();
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
    
    actualizarMaterialesModal();
}

// Abrir modal de configuración del tabique
function abrirModalTabique(tabique) {
    crearModalTabique();
    
    const modal = document.getElementById('modalTabique');
    if (!modal) return;
    
    // Llenar campos con valores actuales (vacíos si es nuevo)
    document.getElementById('tabiqueNombre').value = tabique.nombre || '';
    document.getElementById('tabiqueAltura').value = tabique.altura || '';
    document.getElementById('tabiqueLargo').value = tabique.largo || '';
    document.getElementById('conAislacion').checked = tabique.conAislacion || false;
    
    // Seleccionar tipo si existe
    if (tabique.tipo) {
        seleccionarTipoTabique(tabique.tipo);
        if (tabique.espesor) {
            setTimeout(() => {
                seleccionarEspesor(tabique.espesor);
            }, 100);
        }
    }
    
    // Seleccionar separación (default 40cm)
    const separacion = tabique.separacion || 40;
    seleccionarSeparacion(separacion);
    
    // Calcular materiales si hay datos
    actualizarMaterialesModal();
    
    modal.classList.add('active');
}

// Seleccionar separación entre montantes
function seleccionarSeparacion(separacion) {
    // Remover selección anterior
    document.querySelectorAll('.separacion-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Marcar nueva selección
    const opcion = document.querySelector(`[data-separacion="${separacion}"]`);
    if (opcion) {
        opcion.classList.add('selected');
    }
    
    // Actualizar cálculos
    actualizarMaterialesModal();
}

// Actualizar materiales en el modal
function actualizarMaterialesModal() {
    const largo = parseFloat(document.getElementById('tabiqueLargo').value) || 0;
    const altura = parseFloat(document.getElementById('tabiqueAltura').value) || 0;
    const conAislacion = document.getElementById('conAislacion').checked;
    
    // Obtener separación seleccionada
    const opcionSeleccionada = document.querySelector('.separacion-option.selected');
    const separacion = opcionSeleccionada ? parseInt(opcionSeleccionada.dataset.separacion) : 40;
    
    if (largo && altura) {
        const materiales = calcularMaterialesTabique(largo, altura, separacion, conAislacion);
        
        // Actualizar todos los campos
        document.getElementById('soleraInferior').textContent = materiales.soleraInferior.toFixed(2) + ' m';
        document.getElementById('soleraSuperior').textContent = materiales.soleraSuperior.toFixed(2) + ' m';
        document.getElementById('totalSoleras').textContent = materiales.totalSoleras.toFixed(2) + ' m';
        document.getElementById('cantidadPiesDerechos').textContent = materiales.cantidadPiesDerechos;
        document.getElementById('metrosPiesDerechos').textContent = materiales.metrosPiesDerechos.toFixed(2) + ' m';
        document.getElementById('cantidadRefuerzos').textContent = materiales.cantidadRefuerzosHorizontales;
        document.getElementById('metrosRefuerzos').textContent = materiales.metrosRefuerzosHorizontales.toFixed(2) + ' m';
        document.getElementById('areaPlacas').textContent = materiales.areaPlacas.toFixed(2) + ' m²';
        document.getElementById('totalTornillos').textContent = materiales.totalTornillos + ' un';
        
        // Mostrar/ocultar aislación
        const aislacionItem = document.getElementById('aislacionItem');
        if (conAislacion) {
            aislacionItem.style.display = 'block';
            document.getElementById('areaAislacion').textContent = materiales.areaAislacion.toFixed(2) + ' m²';
        } else {
            aislacionItem.style.display = 'none';
        }
    } else {
        // Resetear valores
        document.getElementById('soleraInferior').textContent = '0.00 m';
        document.getElementById('soleraSuperior').textContent = '0.00 m';
        document.getElementById('totalSoleras').textContent = '0.00 m';
        document.getElementById('cantidadPiesDerechos').textContent = '0';
        document.getElementById('metrosPiesDerechos').textContent = '0.00 m';
        document.getElementById('cantidadRefuerzos').textContent = '0';
        document.getElementById('metrosRefuerzos').textContent = '0.00 m';
        document.getElementById('areaPlacas').textContent = '0.00 m²';
        document.getElementById('totalTornillos').textContent = '0 un';
        document.getElementById('aislacionItem').style.display = 'none';
    }
}

// Cerrar modal de tabique
function cerrarModalTabique() {
    const modal = document.getElementById('modalTabique');
    if (modal) {
        modal.classList.remove('active');
    }
    tabiqueSeleccionado = null;
}

// Guardar datos del tabique
function guardarDatosTabique() {
    if (!tabiqueSeleccionado) return;
    
    const nombre = document.getElementById('tabiqueNombre').value;
    const altura = parseFloat(document.getElementById('tabiqueAltura').value);
    const largo = parseFloat(document.getElementById('tabiqueLargo').value);
    const conAislacion = document.getElementById('conAislacion').checked;
    
    // Obtener tipo seleccionado
    const tipoSeleccionado = document.querySelector('.tipo-tabique-option.selected');
    const tipo = tipoSeleccionado ? tipoSeleccionado.dataset.tipo : null;
    
    // Obtener espesor seleccionado
    const espesorSeleccionado = document.querySelector('.espesor-option.selected');
    const espesor = espesorSeleccionado ? parseFloat(espesorSeleccionado.dataset.espesor) : null;
    
    // Obtener separación seleccionada
    const opcionSeleccionada = document.querySelector('.separacion-option.selected');
    const separacion = opcionSeleccionada ? parseInt(opcionSeleccionada.dataset.separacion) : 40;
    
    if (!nombre || !altura || !largo || !tipo || !espesor) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    // Calcular materiales completos
    const materiales = calcularMaterialesTabique(largo, altura, separacion, conAislacion);
    
    // Actualizar tabique
    tabiqueSeleccionado.nombre = nombre;
    tabiqueSeleccionado.tipo = tipo;
    tabiqueSeleccionado.espesor = espesor;
    tabiqueSeleccionado.altura = altura;
    tabiqueSeleccionado.largo = largo;
    tabiqueSeleccionado.separacion = separacion;
    tabiqueSeleccionado.conAislacion = conAislacion;
    
    // Guardar todos los materiales
    tabiqueSeleccionado.soleraInferior = materiales.soleraInferior;
    tabiqueSeleccionado.soleraSuperior = materiales.soleraSuperior;
    tabiqueSeleccionado.totalSoleras = materiales.totalSoleras;
    tabiqueSeleccionado.cantidadPiesDerechos = materiales.cantidadPiesDerechos;
    tabiqueSeleccionado.metrosPiesDerechos = materiales.metrosPiesDerechos;
    tabiqueSeleccionado.cantidadRefuerzosHorizontales = materiales.cantidadRefuerzosHorizontales;
    tabiqueSeleccionado.metrosRefuerzosHorizontales = materiales.metrosRefuerzosHorizontales;
    tabiqueSeleccionado.areaPlacas = materiales.areaPlacas;
    tabiqueSeleccionado.areaAislacion = materiales.areaAislacion;
    tabiqueSeleccionado.totalTornillos = materiales.totalTornillos;
    tabiqueSeleccionado.completado = true;
    
    cerrarModalTabique();
    redibujarCanvas();
    
    const tipoTexto = tipo === 'interior' ? 'Interior' : 'Exterior';
    actualizarEstado(`✓ ${nombre} guardado - Tipo: ${tipoTexto}, Espesor: ${espesor}m, ${materiales.cantidadPiesDerechos} pies derechos, ${materiales.areaPlacas.toFixed(2)} m² placas`);
}

// Eliminar tabique seleccionado
function eliminarTabiqueSeleccionado() {
    if (!tabiqueSeleccionado) return;
    
    if (confirm('¿Está seguro de eliminar este tabique?')) {
        tabiques = tabiques.filter(t => t.id !== tabiqueSeleccionado.id);
        cerrarModalTabique();
        redibujarCanvas();
        actualizarEstado('✓ Tabique eliminado');
    }
}