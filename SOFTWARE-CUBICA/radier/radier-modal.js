/* ========================================
   MODAL DINÁMICO - RADIER (SOLUCIÓN DEFINITIVA)
   ======================================== */

// Variable global temporal para el radier que se está editando
let radierTemp = null;

function crearModalRadierConCampos(radier) {
    console.log('🔧 crearModalRadierConCampos() - Generando HTML completo');
    
    if (!radier || !radier.puntos || radier.puntos.length < 3) {
        console.error('❌ Radier inválido para crear modal');
        return null;
    }
    
    const numLados = radier.puntos.length;
    console.log(`✅ Creando modal para radier con ${numLados} lados`);
    
    // Generar HTML de campos de lados DIRECTAMENTE
    let camposLadosHTML = '<div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 2px solid #ffc107;">';
    camposLadosHTML += '<h4 style="margin: 0 0 5px 0; color: #856404; font-size: 13px;">📏 MEDIDAS REALES DE LOS LADOS</h4>';
    camposLadosHTML += '<small style="color: #856404; font-size: 11px; display: block; margin-bottom: 10px;">⚠️ Ingrese la medida REAL en metros de cada lado del polígono dibujado</small>';
    camposLadosHTML += '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">';
    
    for (let i = 0; i < numLados; i++) {
        const valorActual = radier.ladosReales && radier.ladosReales[i] ? radier.ladosReales[i] : '';
        
        camposLadosHTML += `
            <div>
                <label style="font-size: 12px; color: #856404; font-weight: 600;">Lado ${i + 1}:</label>
                <input type="number" id="lado_${i}" class="input-lado" placeholder="0.00" step="0.01" 
                       value="${valorActual}"
                       style="width: 100%; padding: 8px; border: 2px solid #ffc107; border-radius: 4px; font-size: 14px;"
                       oninput="calcularRadierCompleto()">
            </div>
        `;
    }
    
    camposLadosHTML += '</div></div>';
    
    console.log('✅ HTML de campos generado');
    
    const modalHTML = `
    <div class="modal active" id="modalRadier">
        <div class="modal-radier-window" style="max-width: 1400px; max-height: 90vh;">
            <div class="modal-radier-header">
                <div class="modal-radier-title">
                    🔲 CONFIGURACIÓN RADIER
                </div>
                <button class="btn-close" onclick="cerrarModalRadier()">✕</button>
            </div>
            <div class="modal-radier-content" style="padding: 20px;">
                
                <!-- DATOS BÁSICOS -->
                <div style="display: grid; grid-template-columns: 3fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="form-group-radier" style="margin-bottom: 0;">
                        <label>📝 Nombre del Radier:</label>
                        <input type="text" id="radierNombre" placeholder="Ej: Radier Principal" value="${radier.nombre || ''}">
                    </div>
                    
                    <div class="form-group-radier" style="margin-bottom: 0;">
                        <label>📏 Espesor (m):</label>
                        <input type="number" id="radierEspesor" placeholder="0.10" step="0.01" value="${radier.espesor || 0.10}" oninput="calcularRadierCompleto()">
                    </div>
                    
                    <div class="form-group-radier" style="margin-bottom: 0;">
                        <label>🗝️ Tipo Bolsa:</label>
                        <select id="radierTipoBolsa" onchange="calcularRadierCompleto()">
                            <option value="42.5" ${radier.tipoBolsa === 42.5 ? 'selected' : ''}>42.5 kg</option>
                            <option value="25" ${radier.tipoBolsa === 25 ? 'selected' : ''}>25 kg</option>
                        </select>
                    </div>
                </div>
                
                <!-- MEDIDAS DE LADOS - YA GENERADAS -->
                <div id="camposLados" style="margin-bottom: 15px;">
                    ${camposLadosHTML}
                </div>
                
                <!-- OPCIONES ADICIONALES EN GRID -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 15px;">
                    
                    <!-- CADENA -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 2px solid #dee2e6;">
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 13px;">🔗 CADENA</h4>
                        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; cursor: pointer;">
                            <input type="checkbox" id="radierLlevaCadena" ${radier.llevaCadena ? 'checked' : ''} onchange="toggleCadenaFields()" style="width: auto;">
                            ¿Lleva cadena?
                        </label>
                        <div id="camposCadena" style="display: ${radier.llevaCadena ? 'block' : 'none'};">
                            <div style="margin-bottom: 8px;">
                                <label style="font-size: 11px; color: #7f8c8d;">Alto (m):</label>
                                <input type="number" id="cadenaAlto" placeholder="0.20" step="0.01" value="${radier.cadenaAlto || 0.20}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                            </div>
                            <div>
                                <label style="font-size: 11px; color: #7f8c8d;">Ancho (m):</label>
                                <input type="number" id="cadenaAncho" placeholder="0.15" step="0.01" value="${radier.cadenaAncho || 0.15}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                            </div>
                        </div>
                    </div>
                    
                    <!-- SOBRECIMIENTO -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 2px solid #dee2e6;">
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 13px;">🧱 SOBRECIMIENTO</h4>
                        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; cursor: pointer;">
                            <input type="checkbox" id="radierLlevaSobrecimiento" ${radier.llevaSobrecimiento ? 'checked' : ''} onchange="toggleSobrecimientoFields()" style="width: auto;">
                            ¿Lleva sobrecimiento?
                        </label>
                        <div id="camposSobrecimiento" style="display: ${radier.llevaSobrecimiento ? 'block' : 'none'};">
                            <div style="margin-bottom: 8px;">
                                <label style="font-size: 11px; color: #7f8c8d;">Alto (m):</label>
                                <input type="number" id="sobrecimientoAlto" placeholder="0.20" step="0.01" value="${radier.sobrecimientoAlto || 0.20}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                            </div>
                            <div>
                                <label style="font-size: 11px; color: #7f8c8d;">Ancho (m):</label>
                                <input type="number" id="sobrecimientoAncho" placeholder="0.20" step="0.01" value="${radier.sobrecimientoAncho || 0.20}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                            </div>
                        </div>
                    </div>
                    
                    <!-- PILARES -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 2px solid #dee2e6;">
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 13px;">🏗️ PILARES</h4>
                        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; cursor: pointer;">
                            <input type="checkbox" id="radierLlevaPilares" ${radier.llevaPilares ? 'checked' : ''} onchange="togglePilaresFields()" style="width: auto;">
                            ¿Lleva pilares?
                        </label>
                        <div id="camposPilares" style="display: ${radier.llevaPilares ? 'block' : 'none'};">
                            <div style="margin-bottom: 8px;">
                                <label style="font-size: 11px; color: #7f8c8d;">Cantidad:</label>
                                <input type="number" id="pilaresCantidad" placeholder="4" step="1" value="${radier.pilaresCantidad || 4}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                            </div>
                            <div style="margin-bottom: 8px;">
                                <label style="font-size: 11px; color: #7f8c8d;">Alto (m):</label>
                                <input type="number" id="pilaresAlto" placeholder="2.40" step="0.01" value="${radier.pilaresAlto || 2.40}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                                <div>
                                    <label style="font-size: 11px; color: #7f8c8d;">Ancho (m):</label>
                                    <input type="number" id="pilaresAncho" placeholder="0.20" step="0.01" value="${radier.pilaresAncho || 0.20}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                                </div>
                                <div>
                                    <label style="font-size: 11px; color: #7f8c8d;">Largo (m):</label>
                                    <input type="number" id="pilaresLargo" placeholder="0.20" step="0.01" value="${radier.pilaresLargo || 0.20}" style="width: 100%; padding: 6px; border: 1px solid #ced4da; border-radius: 4px;" oninput="calcularRadierCompleto()">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- RESULTADOS EN GRID HORIZONTAL -->
                <div class="resultado-cubicacion" style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 20px; border-radius: 8px; margin-bottom: 15px; color: white;">
                    <h4 style="margin: 0 0 15px 0; text-align: center;">📊 CUBICACIÓN COMPLETA</h4>
                    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; font-size: 11px; margin-bottom: 15px;">
                        <div style="text-align: center;">
                            <strong>Área</strong><br>
                            <span id="radierAreaCalc" style="font-size: 16px; font-weight: bold;">0.00 m²</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Excavación</strong><br>
                            <span id="radierExcavacion" style="font-size: 16px; font-weight: bold;">0.00 m³</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Vol. Radier</strong><br>
                            <span id="radierVolumenCalc" style="font-size: 16px; font-weight: bold;">0.00 m³</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Cemento</strong><br>
                            <span id="radierBolsas" style="font-size: 16px; font-weight: bold;">0 scs</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Arena</strong><br>
                            <span id="radierArena" style="font-size: 16px; font-weight: bold;">0.00 m³</span>
                        </div>
                        <div style="text-align: center;">
                            <strong>Ripio</strong><br>
                            <span id="radierRipio" style="font-size: 16px; font-weight: bold;">0.00 m³</span>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 11px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 15px;">
                        <div style="text-align: center;" id="resultadoCadena">
                            <strong>Cadena</strong><br>
                            <span id="cadenaVolumen" style="font-size: 16px; font-weight: bold;">-</span>
                        </div>
                        <div style="text-align: center;" id="resultadoSobrecimiento">
                            <strong>Sobrecim.</strong><br>
                            <span id="sobrecimientoVolumen" style="font-size: 16px; font-weight: bold;">-</span>
                        </div>
                        <div style="text-align: center;" id="resultadoPilares">
                            <strong>Pilares</strong><br>
                            <span id="pilaresVolumen" style="font-size: 16px; font-weight: bold;">-</span>
                        </div>
                    </div>
                </div>
                
                <div class="nota-ayuda" style="margin-bottom: 15px; background: #e8f5e9; border-left: 4px solid #27ae60; padding: 12px 15px; border-radius: 6px; font-size: 12px; color: #2c3e50;">
                    <strong>💡 Nota:</strong>
                    Excavación 0.20m profundidad. Dosificación: 1:3:3 (8.5 scs cemento/m³, 0.55 m³ arena, 0.83 m³ ripio por m³ hormigón).
                </div>
                
                <div class="modal-radier-actions">
                    <button class="btn-radier btn-radier-eliminar" onclick="eliminarRadierSeleccionado()" style="background: #e74c3c; color: white; padding: 12px 25px; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
                        🗑️ Eliminar
                    </button>
                    <button class="btn-radier btn-radier-cancelar" onclick="cerrarModalRadier()" style="background: #95a5a6; color: white; padding: 12px 25px; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
                        ✕ Cancelar
                    </button>
                    <button class="btn-radier btn-radier-guardar" onclick="guardarDatosRadier()" style="background: #27ae60; color: white; padding: 12px 25px; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
                        💾 Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    return modalHTML;
}

function toggleCadenaFields() {
    const checkbox = document.getElementById('radierLlevaCadena');
    const campos = document.getElementById('camposCadena');
    if (checkbox && campos) {
        campos.style.display = checkbox.checked ? 'block' : 'none';
        calcularRadierCompleto();
    }
}

function toggleSobrecimientoFields() {
    const checkbox = document.getElementById('radierLlevaSobrecimiento');
    const campos = document.getElementById('camposSobrecimiento');
    if (checkbox && campos) {
        campos.style.display = checkbox.checked ? 'block' : 'none';
        calcularRadierCompleto();
    }
}

function togglePilaresFields() {
    const checkbox = document.getElementById('radierLlevaPilares');
    const campos = document.getElementById('camposPilares');
    if (checkbox && campos) {
        campos.style.display = checkbox.checked ? 'block' : 'none';
        calcularRadierCompleto();
    }
}

function calcularAreaDesdeLadosV2() {
    console.log('🔢 ========== calcularAreaDesdeLadosV2() INICIADA ==========');
    
    // VALIDACIÓN 1: radierSeleccionado existe
    if (!radierSeleccionado) {
        console.error('❌ CRÍTICO: radierSeleccionado es NULL o undefined');
        console.error('Tipo:', typeof radierSeleccionado);
        console.error('Valor:', radierSeleccionado);
        return 0;
    }
    console.log('✅ radierSeleccionado existe:', radierSeleccionado);
    
    // VALIDACIÓN 2: radierSeleccionado.puntos existe
    if (!radierSeleccionado.puntos) {
        console.error('❌ CRÍTICO: radierSeleccionado.puntos es NULL o undefined');
        console.error('radierSeleccionado completo:', radierSeleccionado);
        
        // FALLBACK: Usar radierTemp si existe
        if (radierTemp && radierTemp.puntos) {
            console.warn('⚠️ FALLBACK: Usando radierTemp.puntos');
            radierSeleccionado.puntos = radierTemp.puntos;
        } else {
            console.error('❌ FALLBACK FALLÓ: radierTemp tampoco tiene puntos');
            return 0;
        }
    }
    console.log('✅ radierSeleccionado.puntos existe:', radierSeleccionado.puntos);
    
    // VALIDACIÓN 3: radierSeleccionado.puntos es array con elementos
    if (!Array.isArray(radierSeleccionado.puntos)) {
        console.error('❌ CRÍTICO: radierSeleccionado.puntos NO es un array');
        console.error('Tipo:', typeof radierSeleccionado.puntos);
        console.error('Valor:', radierSeleccionado.puntos);
        return 0;
    }
    console.log('✅ radierSeleccionado.puntos es array');
    
    if (radierSeleccionado.puntos.length < 3) {
        console.error(`❌ CRÍTICO: radierSeleccionado.puntos tiene ${radierSeleccionado.puntos.length} elementos (mínimo 3)`);
        return 0;
    }
    console.log(`✅ radierSeleccionado.puntos tiene ${radierSeleccionado.puntos.length} elementos`);
    
    const numLados = radierSeleccionado.puntos.length;
    const lados = [];
    
    console.log(`📏 Leyendo ${numLados} lados...`);
    
    // LEER VALORES DE LOS INPUTS
    for (let i = 0; i < numLados; i++) {
        const input = document.getElementById(`lado_${i}`);
        
        if (!input) {
            console.error(`❌ Input lado_${i} NO encontrado en el DOM`);
            console.error('Container #camposLados existe?', !!document.getElementById('camposLados'));
            return 0;
        }
        
        console.log(`🔍 Lado ${i}:`);
        console.log(`  - Input encontrado: SÍ`);
        console.log(`  - input.value: "${input.value}"`);
        console.log(`  - input.value tipo: ${typeof input.value}`);
        
        const valorString = String(input.value).trim();
        console.log(`  - Después de trim: "${valorString}"`);
        
        const valor = parseFloat(valorString);
        console.log(`  - parseFloat resultado: ${valor}`);
        console.log(`  - Es NaN? ${isNaN(valor)}`);
        console.log(`  - Es <= 0? ${valor <= 0}`);
        
        if (isNaN(valor) || valor <= 0) {
            console.error(`❌ Lado ${i} tiene valor inválido:`);
            console.error(`  - Valor original: "${input.value}"`);
            console.error(`  - Valor parseado: ${valor}`);
            return 0;
        }
        
        lados.push(valor);
        console.log(`✅ Lado ${i}: ${valor}m agregado al array`);
    }
    
    console.log('✅ TODOS los lados leídos correctamente:', lados);
    
    // Guardar lados en el radier
    radierSeleccionado.ladosReales = lados;
    console.log('✅ Lados guardados en radierSeleccionado.ladosReales');
    
    let area = 0;
    
    if (numLados === 3) {
        // TRIÁNGULO - Fórmula de Herón
        console.log('📐 Calculando área de TRIÁNGULO (Fórmula de Herón)');
        const s = (lados[0] + lados[1] + lados[2]) / 2;
        console.log(`  - Semiperímetro s = ${s}`);
        area = Math.sqrt(s * (s - lados[0]) * (s - lados[1]) * (s - lados[2]));
        console.log(`🔺 Triángulo: área = ${area.toFixed(2)} m²`);
        
    } else if (numLados === 4) {
        // CUADRILÁTERO - Fórmula de Bretschneider
        console.log('📐 Calculando área de CUADRILÁTERO (Fórmula de Bretschneider)');
        const a = lados[0], b = lados[1], c = lados[2], d = lados[3];
        const s = (a + b + c + d) / 2;
        console.log(`  - Lados: a=${a}, b=${b}, c=${c}, d=${d}`);
        console.log(`  - Semiperímetro s = ${s}`);
        area = Math.sqrt((s - a) * (s - b) * (s - c) * (s - d));
        console.log(`🔶 Cuadrilátero: área = ${area.toFixed(2)} m²`);
        
    } else {
        // POLÍGONOS 5+ lados
        console.log(`📐 Calculando área de POLÍGONO de ${numLados} lados (Aproximación)`);
        const ladosImpares = lados.filter((_, i) => i % 2 === 0);
        const ladosPares = lados.filter((_, i) => i % 2 === 1);
        const promedioImpares = ladosImpares.reduce((a, b) => a + b, 0) / ladosImpares.length;
        const promedioPares = ladosPares.reduce((a, b) => a + b, 0) / ladosPares.length;
        console.log(`  - Lados impares promedio: ${promedioImpares}`);
        console.log(`  - Lados pares promedio: ${promedioPares}`);
        area = promedioImpares * promedioPares;
        console.log(`⬡ Polígono ${numLados} lados: área = ${area.toFixed(2)} m²`);
    }
    
    console.log(`📊 ÁREA FINAL CALCULADA: ${area.toFixed(4)} m²`);
    console.log(`  - Es NaN? ${isNaN(area)}`);
    console.log(`  - Es > 0? ${area > 0}`);
    console.log('🔢 ========== FIN calcularAreaDesdeLadosV2() ==========');
    
    return area;
}

function calcularRadierCompleto() {
    if (!radierSeleccionado || !radierSeleccionado.puntos) return;
    
    const espesor = parseFloat(document.getElementById('radierEspesor')?.value) || 0;
    const tipoBolsa = parseFloat(document.getElementById('radierTipoBolsa')?.value) || 42.5;
    
    const area = calcularAreaDesdeLadosV2();  // ← LLAMADA A V2
    
    if (!area || area <= 0 || !espesor) {
        document.getElementById('radierAreaCalc').textContent = '0.00 m²';
        document.getElementById('radierExcavacion').textContent = '0.00 m³';
        document.getElementById('radierVolumenCalc').textContent = '0.00 m³';
        document.getElementById('radierBolsas').textContent = '0 scs';
        document.getElementById('radierArena').textContent = '0.00 m³';
        document.getElementById('radierRipio').textContent = '0.00 m³';
        document.getElementById('cadenaVolumen').textContent = '-';
        document.getElementById('sobrecimientoVolumen').textContent = '-';
        document.getElementById('pilaresVolumen').textContent = '-';
        return;
    }
    
    const lados = radierSeleccionado.ladosReales || [];
    const perimetro = lados.reduce((sum, lado) => sum + lado, 0);
    
    const excavacion = area * 0.20;
    const volumen = area * espesor;
    
    const cementoPorM3 = tipoBolsa === 42.5 ? 8.5 : 11;
    const bolsasNecesarias = Math.ceil(volumen * cementoPorM3);
    const arenaTotal = volumen * 0.55;
    const ripioTotal = volumen * 0.83;
    
    // Cadena
    if (document.getElementById('radierLlevaCadena')?.checked) {
        const cadenaAlto = parseFloat(document.getElementById('cadenaAlto').value) || 0;
        const cadenaAncho = parseFloat(document.getElementById('cadenaAncho').value) || 0;
        const volumenCadena = perimetro * cadenaAlto * cadenaAncho;
        document.getElementById('cadenaVolumen').textContent = volumenCadena.toFixed(3) + ' m³';
    } else {
        document.getElementById('cadenaVolumen').textContent = '-';
    }
    
    // Sobrecimiento
    if (document.getElementById('radierLlevaSobrecimiento')?.checked) {
        const sobrecimientoAlto = parseFloat(document.getElementById('sobrecimientoAlto').value) || 0;
        const sobrecimientoAncho = parseFloat(document.getElementById('sobrecimientoAncho').value) || 0;
        const volumenSobrecimiento = perimetro * sobrecimientoAlto * sobrecimientoAncho;
        document.getElementById('sobrecimientoVolumen').textContent = volumenSobrecimiento.toFixed(3) + ' m³';
    } else {
        document.getElementById('sobrecimientoVolumen').textContent = '-';
    }
    
    // Pilares
    if (document.getElementById('radierLlevaPilares')?.checked) {
        const cantidad = parseInt(document.getElementById('pilaresCantidad').value) || 0;
        const alto = parseFloat(document.getElementById('pilaresAlto').value) || 0;
        const ancho = parseFloat(document.getElementById('pilaresAncho').value) || 0;
        const largo = parseFloat(document.getElementById('pilaresLargo').value) || 0;
        const volumenPilares = cantidad * alto * ancho * largo;
        document.getElementById('pilaresVolumen').textContent = volumenPilares.toFixed(3) + ' m³';
    } else {
        document.getElementById('pilaresVolumen').textContent = '-';
    }
    
    document.getElementById('radierAreaCalc').textContent = area.toFixed(2) + ' m²';
    document.getElementById('radierExcavacion').textContent = excavacion.toFixed(2) + ' m³';
    document.getElementById('radierVolumenCalc').textContent = volumen.toFixed(3) + ' m³';
    document.getElementById('radierBolsas').textContent = bolsasNecesarias + ' scs';
    document.getElementById('radierArena').textContent = arenaTotal.toFixed(2) + ' m³';
    document.getElementById('radierRipio').textContent = ripioTotal.toFixed(2) + ' m³';
}

function abrirModalRadier(radier) {
    console.log('🚪 ========== ABRIENDO MODAL RADIER (MÉTODO DEFINITIVO) ==========');
    console.log('📦 Radier recibido:', radier);
    
    if (!radier || !radier.puntos || radier.puntos.length < 3) {
        console.error('❌ Radier inválido');
        alert('Error: Radier no tiene puntos válidos');
        return;
    }
    
    // PASO 1: Asignar a variable global
    radierSeleccionado = radier;
    radierTemp = radier;
    console.log('✅ Variables globales asignadas');
    
    // PASO 2: Eliminar modal anterior si existe
    const modalAnterior = document.getElementById('modalRadier');
    if (modalAnterior) {
        modalAnterior.remove();
        console.log('🗑️ Modal anterior eliminado');
    }
    
    // PASO 3: Crear HTML completo con campos ya incluidos
    const modalHTML = crearModalRadierConCampos(radier);
    if (!modalHTML) {
        console.error('❌ No se pudo generar HTML del modal');
        return;
    }
    
    console.log('✅ HTML del modal generado');
    
    // PASO 4: Insertar en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('✅ Modal insertado en el DOM');
    
    // PASO 5: Verificar que los inputs existen
    requestAnimationFrame(() => {
        const numLados = radier.puntos.length;
        let todosExisten = true;
        
        for (let i = 0; i < numLados; i++) {
            const input = document.getElementById(`lado_${i}`);
            if (!input) {
                console.error(`❌ Input lado_${i} NO existe`);
                todosExisten = false;
            } else {
                console.log(`✅ Input lado_${i} existe`);
            }
        }
        
        if (todosExisten) {
            console.log('✅ TODOS los inputs de lados existen correctamente');
            // Calcular inmediatamente
            calcularRadierCompleto();
        } else {
            console.error('❌ FALTAN inputs de lados');
            alert('Error crítico: No se pudieron crear los campos de lados. Por favor recarga la página.');
        }
    });
    
    console.log('🚪 ========== FIN APERTURA MODAL ==========');
}

function cerrarModalRadier() {
    const modal = document.getElementById('modalRadier');
    if (modal) {
        modal.remove();
    }
    radierSeleccionado = null;
    radierTemp = null;
}

function guardarDatosRadier() {
    console.log('💾 ========== GUARDANDO RADIER ==========');
    
    if (!radierSeleccionado) {
        console.error('❌ No hay radierSeleccionado');
        alert('Error: No hay radier seleccionado');
        return;
    }
    
    const nombre = document.getElementById('radierNombre').value;
    const espesor = parseFloat(document.getElementById('radierEspesor').value);
    const tipoBolsa = parseFloat(document.getElementById('radierTipoBolsa').value);
    
    console.log('📝 Datos básicos:');
    console.log('  - Nombre:', nombre);
    console.log('  - Espesor:', espesor);
    console.log('  - Tipo bolsa:', tipoBolsa);
    
    if (!nombre || !espesor) {
        console.error('❌ Faltan datos básicos');
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    console.log('🔢 Calculando área...');
    const area = calcularAreaDesdeLadosV2();  // ← LLAMADA A V2
    
    console.log('📊 Área calculada:', area);
    
    if (!area || area <= 0 || isNaN(area)) {
        console.error('❌ Área inválida:', area);
        console.error('📋 Estado de radierSeleccionado:', radierSeleccionado);
        console.error('📋 Lados reales:', radierSeleccionado.ladosReales);
        
        // Verificar inputs uno por uno
        const numLados = radierSeleccionado.puntos.length;
        for (let i = 0; i < numLados; i++) {
            const input = document.getElementById(`lado_${i}`);
            console.error(`  Input lado_${i}:`, input ? input.value : 'NO EXISTE');
        }
        
        alert('⚠️ Por favor ingresa las medidas REALES de todos los lados del polígono');
        return;
    }
    
    console.log('✅ Área válida, continuando...');
    
    const lados = radierSeleccionado.ladosReales || [];
    const perimetro = lados.reduce((sum, lado) => sum + lado, 0);
    const volumen = area * espesor;
    const excavacion = area * 0.20;
    
    const cementoPorM3 = tipoBolsa === 42.5 ? 8.5 : 11;
    const bolsas = Math.ceil(volumen * cementoPorM3);
    const arena = volumen * 0.55;
    const ripio = volumen * 0.83;
    
    console.log('📊 Resultados calculados:');
    console.log('  - Área:', area.toFixed(2), 'm²');
    console.log('  - Perímetro:', perimetro.toFixed(2), 'm');
    console.log('  - Volumen:', volumen.toFixed(3), 'm³');
    console.log('  - Bolsas:', bolsas);
    
    radierSeleccionado.nombre = nombre;
    radierSeleccionado.espesor = espesor;
    radierSeleccionado.ladosReales = lados;
    radierSeleccionado.tipoBolsa = tipoBolsa;
    radierSeleccionado.area = area;
    radierSeleccionado.perimetro = perimetro;
    radierSeleccionado.volumen = volumen;
    radierSeleccionado.excavacion = excavacion;
    radierSeleccionado.bolsas = bolsas;
    radierSeleccionado.arena = arena;
    radierSeleccionado.ripio = ripio;
    
    radierSeleccionado.llevaCadena = document.getElementById('radierLlevaCadena').checked;
    if (radierSeleccionado.llevaCadena) {
        radierSeleccionado.cadenaAlto = parseFloat(document.getElementById('cadenaAlto').value);
        radierSeleccionado.cadenaAncho = parseFloat(document.getElementById('cadenaAncho').value);
        radierSeleccionado.volumenCadena = perimetro * radierSeleccionado.cadenaAlto * radierSeleccionado.cadenaAncho;
    }
    
    radierSeleccionado.llevaSobrecimiento = document.getElementById('radierLlevaSobrecimiento').checked;
    if (radierSeleccionado.llevaSobrecimiento) {
        radierSeleccionado.sobrecimientoAlto = parseFloat(document.getElementById('sobrecimientoAlto').value);
        radierSeleccionado.sobrecimientoAncho = parseFloat(document.getElementById('sobrecimientoAncho').value);
        radierSeleccionado.volumenSobrecimiento = perimetro * radierSeleccionado.sobrecimientoAlto * radierSeleccionado.sobrecimientoAncho;
    }
    
    radierSeleccionado.llevaPilares = document.getElementById('radierLlevaPilares').checked;
    if (radierSeleccionado.llevaPilares) {
        radierSeleccionado.pilaresCantidad = parseInt(document.getElementById('pilaresCantidad').value);
        radierSeleccionado.pilaresAlto = parseFloat(document.getElementById('pilaresAlto').value);
        radierSeleccionado.pilaresAncho = parseFloat(document.getElementById('pilaresAncho').value);
        radierSeleccionado.pilaresLargo = parseFloat(document.getElementById('pilaresLargo').value);
        radierSeleccionado.volumenPilares = radierSeleccionado.pilaresCantidad * radierSeleccionado.pilaresAlto * radierSeleccionado.pilaresAncho * radierSeleccionado.pilaresLargo;
    }
    
    radierSeleccionado.completado = true;
    
    console.log('✅ Radier guardado exitosamente:', radierSeleccionado);
    console.log('💾 ========== FIN GUARDADO ==========');
    
    cerrarModalRadier();
    redibujarCanvasRadier();
    actualizarEstadoRadier(`✓ ${nombre} guardado - ${volumen.toFixed(3)} m³ - ${bolsas} scs`);
}

function eliminarRadierSeleccionado() {
    if (!radierSeleccionado) return;
    
    if (confirm('¿Está seguro de eliminar este radier?')) {
        radieres = radieres.filter(r => r.id !== radierSeleccionado.id);
        cerrarModalRadier();
        redibujarCanvasRadier();
        actualizarEstadoRadier('✓ Radier eliminado');
    }
}