/* ========================================
   MODAL DINÁMICO - MUROS DE ALBAÑILERÍA
   ======================================== */

function crearModalMuroAlbanileria() {
    if (document.getElementById('modalMuroAlbanileria')) return;
    
    const modalHTML = `
    <div class="modal" id="modalMuroAlbanileria">
        <div class="modal-muro-window" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-muro-header" style="background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);">
                <div class="modal-muro-title">
                    🧱 CONFIGURACIÓN MURO DE ALBAÑILERÍA
                </div>
                <button class="btn-close" onclick="cerrarModalMuroAlbanileria()">✕</button>
            </div>
            <div class="modal-muro-content">
                <div class="form-group-muro">
                    <label>📝 Nombre del Muro:</label>
                    <input type="text" id="muroAlbanileriaNombre" placeholder="Ej: Muro Norte">
                </div>
                
                <div class="form-row">
                    <div class="form-group-muro">
                        <label>📏 Largo (m):</label>
                        <input type="number" id="muroAlbanileriaLargo" placeholder="0.00" step="0.01" oninput="calcularAlbanileriaCompleto()">
                    </div>
                    
                    <div class="form-group-muro">
                        <label>⬆️ Altura (m):</label>
                        <input type="number" id="muroAlbanileriaAltura" placeholder="0.00" step="0.01" oninput="calcularAlbanileriaCompleto()">
                    </div>
                    
                    <div class="form-group-muro">
                        <label>📐 Espesor (m):</label>
                        <input type="number" id="muroAlbanileriaEspesor" placeholder="0.14" step="0.01" value="0.14" oninput="calcularAlbanileriaCompleto()">
                    </div>
                </div>
                
                <div class="form-group-muro">
                    <label>🚪 ¿Lleva Ventana o Puerta?</label>
                    <select id="muroAlbanileriaTipoAbertura" onchange="toggleAberturaFieldsAlbanileriaDinamico()">
                        <option value="ninguna">Ninguna</option>
                        <option value="ventana">Ventana</option>
                        <option value="puerta">Puerta</option>
                    </select>
                </div>
                
                <div id="camposAberturaAlbanileriaDinamico" style="display: none;">
                    <div class="form-row">
                        <div class="form-group-muro">
                            <label id="labelAnchoAberturaAlbanileriaDinamico">📏 Ancho (m):</label>
                            <input type="number" id="aberturaAlbanileriaAnchoDinamico" placeholder="0.00" step="0.01" oninput="calcularAlbanileriaCompleto()">
                        </div>
                        
                        <div class="form-group-muro">
                            <label id="labelAltoAberturaAlbanileriaDinamico">📏 Alto (m):</label>
                            <input type="number" id="aberturaAlbanileriaAltoDinamico" placeholder="0.00" step="0.01" oninput="calcularAlbanileriaCompleto()">
                        </div>
                    </div>
                </div>
                
                <div style="background: #fff3e0; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px 0; color: #e67e22;">🧱 ESPECIFICACIONES LADRILLO</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px;">
                        <div>
                            <label style="font-size: 12px; color: #7f8c8d; font-weight: 600;">Largo (m):</label>
                            <input type="number" id="ladrilloLargo" value="0.24" step="0.01" 
                                   style="width: 100%; padding: 6px; border: 2px solid #bdc3c7; border-radius: 4px;"
                                   oninput="calcularAlbanileriaCompleto()">
                        </div>
                        <div>
                            <label style="font-size: 12px; color: #7f8c8d; font-weight: 600;">Alto (m):</label>
                            <input type="number" id="ladrilloAlto" value="0.09" step="0.01" 
                                   style="width: 100%; padding: 6px; border: 2px solid #bdc3c7; border-radius: 4px;"
                                   oninput="calcularAlbanileriaCompleto()">
                        </div>
                        <div>
                            <label style="font-size: 12px; color: #7f8c8d; font-weight: 600;">Junta H (m):</label>
                            <input type="number" id="ladrilloJuntaH" value="0.015" step="0.001" 
                                   style="width: 100%; padding: 6px; border: 2px solid #bdc3c7; border-radius: 4px;"
                                   oninput="calcularAlbanileriaCompleto()">
                        </div>
                        <div>
                            <label style="font-size: 12px; color: #7f8c8d; font-weight: 600;">Junta V (m):</label>
                            <input type="number" id="ladrilloJuntaV" value="0.015" step="0.001" 
                                   style="width: 100%; padding: 6px; border: 2px solid #bdc3c7; border-radius: 4px;"
                                   oninput="calcularAlbanileriaCompleto()">
                        </div>
                    </div>
                </div>
                
                <div class="resultado-cubicacion" style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%);">
                    <h4>📊 RESULTADOS</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; font-size: 14px; margin-top: 10px;">
                        <div style="text-align: center;">
                            <strong>Área Muro</strong><br>
                            <span id="albanileriaArea" style="font-size: 18px; font-weight: bold;">0.00 m²</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Volumen</strong><br>
                            <span id="albanileriaVolumen" style="font-size: 18px; font-weight: bold;">0.000 m³</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Ladrillos/m²</strong><br>
                            <span id="albanileriaLadrillosM2" style="font-size: 18px; font-weight: bold;">0 uds</span>
                        </div>
                    </div>
                </div>
                
                <div class="resultado-cubicacion" style="background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);">
                    <h4>🧱 CANTIDAD TOTAL DE LADRILLOS</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px;">
                        <div style="text-align: center;">
                            <strong style="font-size: 14px;">Sin Desperdicio</strong><br>
                            <span id="albanileriaLadrillosSin" style="font-size: 24px; font-weight: bold;">0 uds</span>
                        </div>
                        <div style="text-align: center;">
                            <strong style="font-size: 14px;">Con Desperdicio (5%)</strong><br>
                            <span id="albanileriaLadrillosCon" style="font-size: 24px; font-weight: bold;">0 uds</span>
                        </div>
                    </div>
                </div>
                
                <div class="nota-ayuda" style="background: #fff3e0; border-left: 4px solid #e67e22;">
                    <strong>💡 Fórmula:</strong>
                    CL = 1 / ((L + Jh)(H + Jv)) donde L=largo, H=alto, Jh=junta horizontal, Jv=junta vertical
                </div>
                
                <div class="modal-muro-actions">
                    <button class="btn-muro btn-muro-eliminar" onclick="eliminarMuroAlbanileriaSeleccionado()">
                        🗑️ Eliminar
                    </button>
                    <button class="btn-muro btn-muro-cancelar" onclick="cerrarModalMuroAlbanileria()">
                        ✕ Cancelar
                    </button>
                    <button class="btn-muro btn-muro-guardar" onclick="guardarDatosMuroAlbanileriaDinamico()">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function toggleAberturaFieldsAlbanileriaDinamico() {
    const tipoAbertura = document.getElementById('muroAlbanileriaTipoAbertura').value;
    const camposAbertura = document.getElementById('camposAberturaAlbanileriaDinamico');
    const labelAncho = document.getElementById('labelAnchoAberturaAlbanileriaDinamico');
    const labelAlto = document.getElementById('labelAltoAberturaAlbanileriaDinamico');
    
    if (tipoAbertura === 'ninguna') {
        camposAbertura.style.display = 'none';
    } else {
        camposAbertura.style.display = 'block';
        if (tipoAbertura === 'ventana') {
            labelAncho.textContent = '📏 Ancho Ventana (m):';
            labelAlto.textContent = '📏 Alto Ventana (m):';
        } else if (tipoAbertura === 'puerta') {
            labelAncho.textContent = '🚪 Ancho Puerta (m):';
            labelAlto.textContent = '🚪 Alto Puerta (m):';
        }
    }
    
    calcularAlbanileriaCompleto();
}

function calcularAlbanileriaCompleto() {
    const largo = parseFloat(document.getElementById('muroAlbanileriaLargo').value) || 0;
    const altura = parseFloat(document.getElementById('muroAlbanileriaAltura').value) || 0;
    const espesor = parseFloat(document.getElementById('muroAlbanileriaEspesor').value) || 0;
    const tipoAbertura = document.getElementById('muroAlbanileriaTipoAbertura').value;
    const aberturaAncho = parseFloat(document.getElementById('aberturaAlbanileriaAnchoDinamico').value) || 0;
    const aberturaAlto = parseFloat(document.getElementById('aberturaAlbanileriaAltoDinamico').value) || 0;
    
    const ladrilloL = parseFloat(document.getElementById('ladrilloLargo').value) || 0.24;
    const ladrilloH = parseFloat(document.getElementById('ladrilloAlto').value) || 0.09;
    const juntaH = parseFloat(document.getElementById('ladrilloJuntaH').value) || 0.015;
    const juntaV = parseFloat(document.getElementById('ladrilloJuntaV').value) || 0.015;
    
    if (!largo || !altura || !espesor) {
        document.getElementById('albanileriaArea').textContent = '0.00 m²';
        document.getElementById('albanileriaVolumen').textContent = '0.000 m³';
        document.getElementById('albanileriaLadrillosM2').textContent = '0 uds';
        document.getElementById('albanileriaLadrillosSin').textContent = '0 uds';
        document.getElementById('albanileriaLadrillosCon').textContent = '0 uds';
        return;
    }
    
    // Calcular área
    let area = largo * altura;
    
    // Descontar abertura si existe
    if (tipoAbertura !== 'ninguna' && aberturaAncho && aberturaAlto) {
        const areaAbertura = aberturaAncho * aberturaAlto;
        area = area - areaAbertura;
    }
    
    // Calcular volumen
    const volumen = area * espesor;
    
    // Calcular ladrillos por m² usando fórmula: CL = 1 / ((L + Jh)(H + Jv))
    const ladrillosPorM2 = 1 / ((ladrilloL + juntaH) * (ladrilloH + juntaV));
    
    // Calcular total de ladrillos
    const ladrillosTotales = Math.ceil(area * ladrillosPorM2);
    const ladrillosConDesperdicio = Math.ceil(ladrillosTotales * 1.05);
    
    // Mostrar resultados
    document.getElementById('albanileriaArea').textContent = area.toFixed(2) + ' m²';
    document.getElementById('albanileriaVolumen').textContent = volumen.toFixed(3) + ' m³';
    document.getElementById('albanileriaLadrillosM2').textContent = Math.round(ladrillosPorM2) + ' uds';
    document.getElementById('albanileriaLadrillosSin').textContent = ladrillosTotales + ' uds';
    document.getElementById('albanileriaLadrillosCon').textContent = ladrillosConDesperdicio + ' uds';
}

function abrirModalMuroAlbanileria(muro) {
    crearModalMuroAlbanileria();
    
    const modal = document.getElementById('modalMuroAlbanileria');
    if (!modal) return;
    
    // Llenar campos con valores actuales
    document.getElementById('muroAlbanileriaNombre').value = muro.nombre || '';
    document.getElementById('muroAlbanileriaAltura').value = muro.altura || '';
    document.getElementById('muroAlbanileriaLargo').value = muro.largo || '';
    document.getElementById('muroAlbanileriaEspesor').value = muro.espesor || 0.14;
    
    // Cargar datos de abertura
    document.getElementById('muroAlbanileriaTipoAbertura').value = muro.tipoAbertura || 'ninguna';
    if (muro.aberturaAncho) document.getElementById('aberturaAlbanileriaAnchoDinamico').value = muro.aberturaAncho;
    if (muro.aberturaAlto) document.getElementById('aberturaAlbanileriaAltoDinamico').value = muro.aberturaAlto;
    
    // Cargar especificaciones de ladrillo si existen
    if (muro.ladrilloLargo) document.getElementById('ladrilloLargo').value = muro.ladrilloLargo;
    if (muro.ladrilloAlto) document.getElementById('ladrilloAlto').value = muro.ladrilloAlto;
    if (muro.ladrilloJuntaH) document.getElementById('ladrilloJuntaH').value = muro.ladrilloJuntaH;
    if (muro.ladrilloJuntaV) document.getElementById('ladrilloJuntaV').value = muro.ladrilloJuntaV;
    
    // Mostrar/ocultar campos de abertura
    toggleAberturaFieldsAlbanileriaDinamico();
    
    // Calcular resultados
    calcularAlbanileriaCompleto();
    
    modal.classList.add('active');
}

function cerrarModalMuroAlbanileria() {
    const modal = document.getElementById('modalMuroAlbanileria');
    if (modal) {
        modal.classList.remove('active');
    }
    muroAlbanileriaSeleccionado = null;
}

function guardarDatosMuroAlbanileriaDinamico() {
    if (!muroAlbanileriaSeleccionado) return;
    
    const nombre = document.getElementById('muroAlbanileriaNombre').value;
    const altura = parseFloat(document.getElementById('muroAlbanileriaAltura').value);
    const largo = parseFloat(document.getElementById('muroAlbanileriaLargo').value);
    const espesor = parseFloat(document.getElementById('muroAlbanileriaEspesor').value);
    const tipoAbertura = document.getElementById('muroAlbanileriaTipoAbertura').value;
    const aberturaAncho = parseFloat(document.getElementById('aberturaAlbanileriaAnchoDinamico').value) || 0;
    const aberturaAlto = parseFloat(document.getElementById('aberturaAlbanileriaAltoDinamico').value) || 0;
    
    const ladrilloL = parseFloat(document.getElementById('ladrilloLargo').value) || 0.24;
    const ladrilloH = parseFloat(document.getElementById('ladrilloAlto').value) || 0.09;
    const juntaH = parseFloat(document.getElementById('ladrilloJuntaH').value) || 0.015;
    const juntaV = parseFloat(document.getElementById('ladrilloJuntaV').value) || 0.015;
    
    if (!nombre || !altura || !largo || !espesor) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    // Validar campos de abertura si no es "ninguna"
    if (tipoAbertura !== 'ninguna' && (!aberturaAncho || !aberturaAlto)) {
        alert('Por favor complete las medidas de la ' + tipoAbertura);
        return;
    }
    
    // Calcular área
    let area = largo * altura;
    if (tipoAbertura !== 'ninguna' && aberturaAncho && aberturaAlto) {
        const areaAbertura = aberturaAncho * aberturaAlto;
        area = area - areaAbertura;
    }
    
    // Calcular volumen
    const volumen = area * espesor;
    
    // Calcular ladrillos
    const ladrillosPorM2 = 1 / ((ladrilloL + juntaH) * (ladrilloH + juntaV));
    const ladrillosTotales = Math.ceil(area * ladrillosPorM2);
    const ladrillosConDesperdicio = Math.ceil(ladrillosTotales * 1.05);
    
    // Actualizar muro
    muroAlbanileriaSeleccionado.nombre = nombre;
    muroAlbanileriaSeleccionado.altura = altura;
    muroAlbanileriaSeleccionado.largo = largo;
    muroAlbanileriaSeleccionado.espesor = espesor;
    muroAlbanileriaSeleccionado.tipoAbertura = tipoAbertura;
    muroAlbanileriaSeleccionado.aberturaAncho = aberturaAncho;
    muroAlbanileriaSeleccionado.aberturaAlto = aberturaAlto;
    muroAlbanileriaSeleccionado.ladrilloLargo = ladrilloL;
    muroAlbanileriaSeleccionado.ladrilloAlto = ladrilloH;
    muroAlbanileriaSeleccionado.ladrilloJuntaH = juntaH;
    muroAlbanileriaSeleccionado.ladrilloJuntaV = juntaV;
    muroAlbanileriaSeleccionado.area = area;
    muroAlbanileriaSeleccionado.volumen = volumen;
    muroAlbanileriaSeleccionado.ladrillosPorM2 = Math.round(ladrillosPorM2);
    muroAlbanileriaSeleccionado.ladrillosTotales = ladrillosTotales;
    muroAlbanileriaSeleccionado.ladrillosConDesperdicio = ladrillosConDesperdicio;
    muroAlbanileriaSeleccionado.completado = true;
    
    cerrarModalMuroAlbanileria();
    redibujarCanvasAlbanileria();
    actualizarEstadoAlbanileria(`✓ ${nombre} guardado - ${ladrillosConDesperdicio} ladrillos (con desperdicio)`);
}

// Eliminar muro seleccionado
function eliminarMuroAlbanileriaSeleccionado() {
    if (!muroAlbanileriaSeleccionado) return;
    
    if (confirm('¿Está seguro de eliminar este muro?')) {
        murosAlbanileria = murosAlbanileria.filter(m => m.id !== muroAlbanileriaSeleccionado.id);
        cerrarModalMuroAlbanileria();
        redibujarCanvasAlbanileria();
        actualizarEstadoAlbanileria('✓ Muro eliminado');
    }
}