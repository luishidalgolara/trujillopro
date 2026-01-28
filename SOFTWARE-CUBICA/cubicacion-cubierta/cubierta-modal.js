/* ========================================
   MODAL DINÁMICO - CUBIERTAS
   ======================================== */

function crearModalCubierta() {
    if (document.getElementById('modalCubierta')) return;
    
    const modalHTML = `
    <div class="modal" id="modalCubierta">
        <div class="modal-cubierta-window">
            <div class="modal-cubierta-header">
                <div class="modal-cubierta-title">
                    🏠 CONFIGURACIÓN CUBIERTA LIVIANA
                </div>
                <button class="btn-close" onclick="cerrarModalCubierta()">✕</button>
            </div>
            <div class="modal-cubierta-content">
                
                <!-- DATOS BÁSICOS -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group-cubierta" style="margin-bottom: 0;">
                        <label>📝 Nombre de la Cubierta:</label>
                        <input type="text" id="cubiertaNombre" placeholder="Ej: Cubierta Principal">
                    </div>
                    
                    <div class="form-group-cubierta" style="margin-bottom: 0;">
                        <label>💧 Número de Aguas:</label>
                        <select id="cubiertaNumeroAguas" onchange="calcularCubiertaCompleto()">
                            <option value="1">1 Agua</option>
                            <option value="2">2 Aguas</option>
                            <option value="4">4 Aguas</option>
                        </select>
                    </div>
                </div>
                
                <!-- MEDIDAS REALES DE CADA LADO -->
                <div class="form-group-cubierta" style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <label style="color: #856404; font-weight: bold;">📐 MEDIDAS REALES DE CADA LADO:</label>
                    <small style="color: #856404; font-size: 11px; display: block; margin-bottom: 10px;">
                        ⚠️ <strong>IMPORTANTE:</strong> Ingrese la longitud REAL en metros de cada lado del polígono dibujado.
                    </small>
                    <div id="ladosContainer" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <!-- Se genera dinámicamente según cantidad de lados -->
                    </div>
                </div>
                
                <!-- TIPO DE CUBIERTA -->
                <div class="form-group-cubierta">
                    <label>🏗️ Tipo de Cubierta Liviana:</label>
                    <div class="tipo-cubierta-selector">
                        <div class="tipo-cubierta-option selected" data-tipo="zinc" onclick="seleccionarTipoCubierta('zinc')">
                            <div class="icono">🔩</div>
                            <div class="nombre">Zinc Ondulado</div>
                        </div>
                        <div class="tipo-cubierta-option" data-tipo="zincalum" onclick="seleccionarTipoCubierta('zincalum')">
                            <div class="icono">✨</div>
                            <div class="nombre">Zincalum</div>
                        </div>
                        <div class="tipo-cubierta-option" data-tipo="metalica" onclick="seleccionarTipoCubierta('metalica')">
                            <div class="icono">🔧</div>
                            <div class="nombre">Metálica Prepintada</div>
                        </div>
                        <div class="tipo-cubierta-option" data-tipo="teja-asfaltica" onclick="seleccionarTipoCubierta('teja-asfaltica')">
                            <div class="icono">🏠</div>
                            <div class="nombre">Teja Asfáltica</div>
                        </div>
                    </div>
                </div>
                
                <!-- PENDIENTE Y MEDIDAS -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group-cubierta" style="margin-bottom: 0;">
                        <label>📐 Pendiente (%):</label>
                        <input type="number" id="cubiertaPendientePorcentaje" placeholder="25" step="1" value="25" oninput="actualizarPendienteDesdeP(); calcularCubiertaCompleto()">
                    </div>
                    
                    <div class="form-group-cubierta" style="margin-bottom: 0;">
                        <label>📐 Pendiente (°):</label>
                        <input type="number" id="cubiertaPendienteGrados" placeholder="14" step="0.1" oninput="actualizarPendienteDesdeG(); calcularCubiertaCompleto()">
                    </div>
                    
                    <div class="form-group-cubierta" style="margin-bottom: 0;">
                        <label>🏗️ Longitud Aleros (m):</label>
                        <input type="number" id="cubiertaLongitudAleros" placeholder="0.50" step="0.01" value="0.50" oninput="calcularCubiertaCompleto()">
                    </div>
                </div>
                
                <!-- DIMENSIONES PLANCHA -->
                <div class="form-group-cubierta">
                    <label>📏 Largo de Plancha Útil (m):</label>
                    <input type="number" id="cubiertaLargoPlanchaUtil" placeholder="3.60" step="0.01" value="3.60" oninput="calcularCubiertaCompleto()">
                    <small style="color: #7f8c8d; font-size: 11px;">Largos típicos: 0.80m, 1.80m, 2.40m, 3.00m, 3.60m, 6.00m</small>
                </div>
                
                <!-- RESULTADOS -->
                <div class="resultado-cubicacion-cubierta">
                    <h4>📊 CUBICACIÓN COMPLETA DE CUBIERTA</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <div class="resultado-item-cubierta">
                                <span class="label">Área Proyección (plano)</span>
                                <span class="valor" id="cubiertaAreaProyeccion">0.00 m²</span>
                            </div>
                            <div class="resultado-item-cubierta">
                                <span class="label">Superficie Real (inclinada)</span>
                                <span class="valor" id="cubiertaSuperficieReal">0.00 m²</span>
                            </div>
                            <div class="resultado-item-cubierta">
                                <span class="label">Área de Aleros</span>
                                <span class="valor" id="cubiertaAreaAleros">0.00 m²</span>
                            </div>
                            <div class="resultado-item-cubierta">
                                <span class="label">Superficie Total</span>
                                <span class="valor" id="cubiertaSuperficieTotal">0.00 m²</span>
                            </div>
                        </div>
                        <div>
                            <div class="resultado-item-cubierta">
                                <span class="label">+ Traslapos</span>
                                <span class="valor" id="cubiertaConTraslapes">0.00 m²</span>
                            </div>
                            <div class="resultado-item-cubierta">
                                <span class="label">+ Desperdicio (8%)</span>
                                <span class="valor" id="cubiertaDesperdicio">0.00 m²</span>
                            </div>
                            <div class="resultado-item-cubierta" style="border-top: 2px solid white; margin-top: 10px; padding-top: 10px;">
                                <span class="label" style="font-size: 15px;">TOTAL A COMPRAR</span>
                                <span class="valor" style="font-size: 20px;" id="cubiertaSuperficieFinal">0.00 m²</span>
                            </div>
                            <div class="resultado-item-cubierta" id="resultadoPlanchas" style="display: none;">
                                <span class="label">Cantidad de Planchas</span>
                                <span class="valor" id="cubiertaCantidadPlanchas">0 un</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="nota-ayuda-cubierta">
                    <strong>💡 Fórmula utilizada:</strong>
                    Superficie real = Área proyección / cos(pendiente). Incluye traslapos según tipo de cubierta y 8% de desperdicio por cortes.
                </div>
                
                <div class="modal-cubierta-actions">
                    <button class="btn-cubierta btn-cubierta-eliminar" onclick="eliminarCubiertaSeleccionada()">
                        🗑️ Eliminar
                    </button>
                    <button class="btn-cubierta btn-cubierta-cancelar" onclick="cerrarModalCubierta()">
                        ✕ Cancelar
                    </button>
                    <button class="btn-cubierta btn-cubierta-guardar" onclick="guardarDatosCubierta()">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Seleccionar tipo de cubierta
function seleccionarTipoCubierta(tipo) {
    document.querySelectorAll('.tipo-cubierta-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    const opcion = document.querySelector(`[data-tipo="${tipo}"]`);
    if (opcion) {
        opcion.classList.add('selected');
    }
    
    // Mostrar/ocultar campo de planchas según tipo
    const resultadoPlanchas = document.getElementById('resultadoPlanchas');
    if (tipo === 'teja-asfaltica') {
        resultadoPlanchas.style.display = 'none';
    } else {
        resultadoPlanchas.style.display = 'flex';
    }
    
    calcularCubiertaCompleto();
}

// Generar campos dinámicos para cada lado del polígono
function generarCamposLados() {
    if (!cubiertaSeleccionada || !cubiertaSeleccionada.puntos) return;
    
    const container = document.getElementById('ladosContainer');
    if (!container) return;
    
    const numLados = cubiertaSeleccionada.puntos.length;
    let html = '';
    
    // Generar un campo por cada lado
    for (let i = 0; i < numLados; i++) {
        const valorActual = cubiertaSeleccionada.ladosReales && cubiertaSeleccionada.ladosReales[i] 
            ? cubiertaSeleccionada.ladosReales[i] 
            : '';
        
        html += `
            <div style="margin-bottom: 8px;">
                <label style="font-size: 12px; color: #856404; font-weight: bold;">Lado ${i + 1}:</label>
                <input type="number" 
                       id="lado_${i}" 
                       class="input-lado" 
                       placeholder="0.00" 
                       step="0.01" 
                       value="${valorActual}"
                       oninput="calcularCubiertaCompleto()"
                       style="width: 100%; padding: 8px; border: 2px solid #ffc107; border-radius: 4px;">
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Calcular área usando las medidas reales de los lados
function calcularAreaDesdeLados() {
    if (!cubiertaSeleccionada || !cubiertaSeleccionada.puntos) return 0;
    
    const numLados = cubiertaSeleccionada.puntos.length;
    const lados = [];
    
    // Leer todos los valores ingresados
    for (let i = 0; i < numLados; i++) {
        const input = document.getElementById(`lado_${i}`);
        const valor = parseFloat(input?.value);
        if (!valor || valor <= 0) {
            return 0; // Si falta algún lado, retornar 0
        }
        lados.push(valor);
    }
    
    // Guardar lados en la cubierta
    cubiertaSeleccionada.ladosReales = lados;
    
    // CALCULAR ÁREA según número de lados
    let area = 0;
    
    if (numLados === 4) {
        // Rectángulo o cuadrilátero: (lado1+lado3)/2 × (lado2+lado4)/2
        area = ((lados[0] + lados[2]) / 2) * ((lados[1] + lados[3]) / 2);
    } else if (numLados === 3) {
        // Triángulo: usar fórmula de Herón
        const s = (lados[0] + lados[1] + lados[2]) / 2; // semiperímetro
        area = Math.sqrt(s * (s - lados[0]) * (s - lados[1]) * (s - lados[2]));
    } else {
        // Para polígonos irregulares: aproximación rectangular
        // Usar lados opuestos para estimar área
        const ladosImpares = lados.filter((_, i) => i % 2 === 0);
        const ladosPares = lados.filter((_, i) => i % 2 === 1);
        const promedioImpares = ladosImpares.reduce((a, b) => a + b, 0) / ladosImpares.length;
        const promedioPares = ladosPares.reduce((a, b) => a + b, 0) / ladosPares.length;
        area = promedioImpares * promedioPares;
    }
    
    return area;
}

// Actualizar pendiente desde porcentaje
function actualizarPendienteDesdeP() {
    const porcentaje = parseFloat(document.getElementById('cubiertaPendientePorcentaje').value) || 0;
    const grados = porcentajeAGrados(porcentaje);
    document.getElementById('cubiertaPendienteGrados').value = grados.toFixed(1);
}

// Actualizar pendiente desde grados
function actualizarPendienteDesdeG() {
    const grados = parseFloat(document.getElementById('cubiertaPendienteGrados').value) || 0;
    const porcentaje = gradosAPorcentaje(grados);
    document.getElementById('cubiertaPendientePorcentaje').value = porcentaje.toFixed(0);
}

// Calcular cubierta completo
function calcularCubiertaCompleto() {
    if (!cubiertaSeleccionada || !cubiertaSeleccionada.puntos) return;
    
    // CALCULAR ÁREA DESDE LOS LADOS REALES INGRESADOS
    const areaProyeccion = calcularAreaDesdeLados();
    
    // Si no hay área válida, limpiar resultados
    if (!areaProyeccion || areaProyeccion <= 0) {
        document.getElementById('cubiertaAreaProyeccion').textContent = '0.00 m²';
        document.getElementById('cubiertaSuperficieReal').textContent = '0.00 m²';
        document.getElementById('cubiertaAreaAleros').textContent = '0.00 m²';
        document.getElementById('cubiertaSuperficieTotal').textContent = '0.00 m²';
        document.getElementById('cubiertaConTraslapes').textContent = '0.00 m²';
        document.getElementById('cubiertaDesperdicio').textContent = '0.00 m²';
        document.getElementById('cubiertaSuperficieFinal').textContent = '0.00 m²';
        document.getElementById('cubiertaCantidadPlanchas').textContent = '0 un';
        return;
    }
    
    const pendienteGrados = parseFloat(document.getElementById('cubiertaPendienteGrados').value) || 0;
    const numeroAguas = parseInt(document.getElementById('cubiertaNumeroAguas').value) || 1;
    const longitudAleros = parseFloat(document.getElementById('cubiertaLongitudAleros').value) || 0;
    const largoPlanchaUtil = parseFloat(document.getElementById('cubiertaLargoPlanchaUtil').value) || 3.6;
    
    const opcionSeleccionada = document.querySelector('.tipo-cubierta-option.selected');
    const tipoCubierta = opcionSeleccionada ? opcionSeleccionada.dataset.tipo : 'zinc';
    
    // Calcular materiales
    const materiales = calcularMaterialesCubierta(
        areaProyeccion,
        pendienteGrados,
        numeroAguas,
        longitudAleros,
        tipoCubierta,
        largoPlanchaUtil
    );
    
    // Mostrar resultados
    document.getElementById('cubiertaAreaProyeccion').textContent = materiales.areaProyeccion.toFixed(2) + ' m²';
    document.getElementById('cubiertaSuperficieReal').textContent = materiales.superficieReal.toFixed(2) + ' m²';
    document.getElementById('cubiertaAreaAleros').textContent = materiales.areaAleros.toFixed(2) + ' m²';
    document.getElementById('cubiertaSuperficieTotal').textContent = materiales.superficieTotal.toFixed(2) + ' m²';
    document.getElementById('cubiertaConTraslapes').textContent = materiales.superficieConTraslapes.toFixed(2) + ' m²';
    document.getElementById('cubiertaDesperdicio').textContent = materiales.desperdicio.toFixed(2) + ' m²';
    document.getElementById('cubiertaSuperficieFinal').textContent = materiales.superficieFinal.toFixed(2) + ' m²';
    
    if (tipoCubierta !== 'teja-asfaltica' && materiales.cantidadPlanchas > 0) {
        document.getElementById('cubiertaCantidadPlanchas').textContent = materiales.cantidadPlanchas + ' un';
    }
}

// Abrir modal de configuración
function abrirModalCubierta(cubierta) {
    crearModalCubierta();
    
    const modal = document.getElementById('modalCubierta');
    if (!modal) return;
    
    // Llenar campos con valores actuales
    document.getElementById('cubiertaNombre').value = cubierta.nombre || '';
    document.getElementById('cubiertaPendientePorcentaje').value = cubierta.pendientePorcentaje || 25;
    document.getElementById('cubiertaPendienteGrados').value = cubierta.pendienteGrados || 14;
    document.getElementById('cubiertaNumeroAguas').value = cubierta.numeroAguas || 1;
    document.getElementById('cubiertaLongitudAleros').value = cubierta.longitudAleros || 0.50;
    document.getElementById('cubiertaLargoPlanchaUtil').value = cubierta.largoPlanchaUtil || 3.6;
    
    // Seleccionar tipo de cubierta
    const tipo = cubierta.tipoCubierta || 'zinc';
    seleccionarTipoCubierta(tipo);
    
    // GENERAR CAMPOS DINÁMICOS PARA CADA LADO
    generarCamposLados();
    
    // Calcular resultados
    calcularCubiertaCompleto();
    
    modal.classList.add('active');
}

// Cerrar modal
function cerrarModalCubierta() {
    const modal = document.getElementById('modalCubierta');
    if (modal) {
        modal.classList.remove('active');
    }
    cubiertaSeleccionada = null;
}

// Guardar datos de cubierta
function guardarDatosCubierta() {
    if (!cubiertaSeleccionada) return;
    
    const nombre = document.getElementById('cubiertaNombre').value;
    const pendientePorcentaje = parseFloat(document.getElementById('cubiertaPendientePorcentaje').value);
    const pendienteGrados = parseFloat(document.getElementById('cubiertaPendienteGrados').value);
    const numeroAguas = parseInt(document.getElementById('cubiertaNumeroAguas').value);
    const longitudAleros = parseFloat(document.getElementById('cubiertaLongitudAleros').value);
    const largoPlanchaUtil = parseFloat(document.getElementById('cubiertaLargoPlanchaUtil').value);
    
    const opcionSeleccionada = document.querySelector('.tipo-cubierta-option.selected');
    const tipoCubierta = opcionSeleccionada ? opcionSeleccionada.dataset.tipo : 'zinc';
    
    if (!nombre) {
        alert('Por favor ingresa un nombre para la cubierta');
        return;
    }
    
    // CALCULAR ÁREA DESDE LOS LADOS
    const areaProyeccion = calcularAreaDesdeLados();
    
    if (!areaProyeccion || areaProyeccion <= 0) {
        alert('⚠️ Por favor ingresa las medidas REALES de todos los lados del polígono');
        return;
    }
    
    // Calcular materiales finales
    const materiales = calcularMaterialesCubierta(
        areaProyeccion,
        pendienteGrados,
        numeroAguas,
        longitudAleros,
        tipoCubierta,
        largoPlanchaUtil
    );
    
    // Actualizar cubierta
    cubiertaSeleccionada.nombre = nombre;
    cubiertaSeleccionada.tipo = tipoCubierta;
    cubiertaSeleccionada.materialCubierta = tipoCubierta;
    cubiertaSeleccionada.tipoCubierta = tipoCubierta;
    cubiertaSeleccionada.pendienteGrados = pendienteGrados;
    cubiertaSeleccionada.pendientePorcentaje = pendientePorcentaje;
    cubiertaSeleccionada.numeroAguas = numeroAguas;
    cubiertaSeleccionada.longitudAleros = longitudAleros;
    cubiertaSeleccionada.largoPlanchaUtil = largoPlanchaUtil;
    cubiertaSeleccionada.areaProyeccion = materiales.areaProyeccion;
    cubiertaSeleccionada.superficieReal = materiales.superficieReal;
    cubiertaSeleccionada.superficieFinal = materiales.superficieFinal;
    cubiertaSeleccionada.cantidadPlanchas = materiales.cantidadPlanchas;
    
    // PARA EL INFORME DE CUBICACIÓN
    cubiertaSeleccionada.area = materiales.superficieFinal; // Área total para comprar
    cubiertaSeleccionada.perimetro = cubiertaSeleccionada.perimetro || 0;
    cubiertaSeleccionada.completado = true;
    
    console.log(`💾 Cubierta guardada:`, cubiertaSeleccionada);
    
    cerrarModalCubierta();
    redibujarCanvasCubierta();
    actualizarEstadoCubierta(`✓ ${nombre} guardado - ${materiales.superficieFinal.toFixed(2)} m²`);
}

// Eliminar cubierta seleccionada
function eliminarCubiertaSeleccionada() {
    if (!cubiertaSeleccionada) return;
    
    if (confirm('¿Está seguro de eliminar esta cubierta?')) {
        cubiertas = cubiertas.filter(c => c.id !== cubiertaSeleccionada.id);
        cerrarModalCubierta();
        redibujarCanvasCubierta();
        actualizarEstadoCubierta('✓ Cubierta eliminada');
    }
}