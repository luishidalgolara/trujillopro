// ============================================================
// CUADRO DE CARGAS TABLA - Actualización de datos en modal
// ============================================================

/**
 * Actualizar la tabla del modal con los datos del CuadroState
 */
function actualizarTablaCuadroCargasModal() {
    const tbody = document.getElementById('tablaCargasBody');
    
    if (!tbody || typeof CuadroState === 'undefined') return;
    
    // Combinar circuitos de ambos niveles
    const todosCircuitos = [
        ...CuadroState.circuits.level1.map(c => ({...c, nivelLabel: 'N1'})),
        ...CuadroState.circuits.level2.map(c => ({...c, nivelLabel: 'N2'}))
    ];
    
    // Si no hay circuitos, mostrar mensaje
    if (todosCircuitos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic; font-size: 15px;">
                    <div style="margin-bottom: 10px; font-size: 48px;">📋</div>
                    <div style="font-weight: 600; margin-bottom: 8px;">Sin elementos en el plano</div>
                    <div style="font-size: 13px;">Agrega símbolos eléctricos para generar el cuadro de cargas automáticamente</div>
                </td>
            </tr>
        `;
        
        // Actualizar totales a cero
        actualizarTotalesModal(0, 0, 0, 0, '-');
        return;
    }
    
    // Agrupar circuitos por categoría
    const iluminacion = todosCircuitos.filter(c => c.categoria === 'iluminacion');
    const enchufes = todosCircuitos.filter(c => c.categoria === 'enchufes');
    const electrodomesticos = todosCircuitos.filter(c => c.categoria === 'electrodomesticos');
    
    let html = '';
    let numeroCircuito = 1;
    
    // SECCIÓN ILUMINACIÓN
    if (iluminacion.length > 0) {
        html += `
            <tr style="background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); color: #2d3436; font-weight: bold;">
                <td colspan="8" style="padding: 12px; font-size: 14px; letter-spacing: 0.5px;">
                    💡 CIRCUITOS DE ILUMINACIÓN
                </td>
            </tr>
        `;
        iluminacion.forEach(circuito => {
            html += generarFilaCircuitoModal(circuito, numeroCircuito, '#fff9e6');
            numeroCircuito++;
        });
    }
    
    // SECCIÓN ENCHUFES
    if (enchufes.length > 0) {
        html += `
            <tr style="background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); color: white; font-weight: bold;">
                <td colspan="8" style="padding: 12px; font-size: 14px; letter-spacing: 0.5px;">
                    🔌 CIRCUITOS DE TOMACORRIENTES
                </td>
            </tr>
        `;
        enchufes.forEach(circuito => {
            html += generarFilaCircuitoModal(circuito, numeroCircuito, '#e8f4ff');
            numeroCircuito++;
        });
    }
    
    // SECCIÓN ELECTRODOMÉSTICOS
    if (electrodomesticos.length > 0) {
        html += `
            <tr style="background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%); color: white; font-weight: bold;">
                <td colspan="8" style="padding: 12px; font-size: 14px; letter-spacing: 0.5px;">
                    ⚡ CIRCUITOS ESPECIALES (Electrodomésticos)
                </td>
            </tr>
        `;
        electrodomesticos.forEach(circuito => {
            html += generarFilaCircuitoModal(circuito, numeroCircuito, '#f3f2ff');
            numeroCircuito++;
        });
    }
    
    tbody.innerHTML = html;
    
    // Actualizar totales
    actualizarTotalesModal(
        CuadroState.totalPotencia,
        CuadroState.totalCorriente,
        CuadroState.demandaPotencia,
        CuadroState.demandaCorriente,
        CuadroState.interruptorGeneral
    );
}

/**
 * Generar fila de circuito para el modal
 */
function generarFilaCircuitoModal(circuito, numero, colorFondo) {
    const nombre = circuito.cantidad > 1 
        ? `${circuito.tipo} <span style="color: #e74c3c; font-weight: bold;">(×${circuito.cantidad})</span>` 
        : circuito.tipo;
    
    const colorNivel = circuito.nivel === 1 ? '#3498db' : '#9b59b6';
    
    return `
        <tr style="background: ${colorFondo}; transition: all 0.3s ease;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='${colorFondo}'">
            <td style="font-weight: bold; color: #2c3e50;">
                C${numero} 
                <span style="color: ${colorNivel}; font-weight: bold; font-size: 11px; padding: 2px 6px; background: ${colorNivel}22; border-radius: 3px; margin-left: 5px;">
                    ${circuito.nivelLabel}
                </span>
            </td>
            <td style="color: #34495e; font-weight: 500;">${nombre}</td>
            <td style="text-align: center; font-weight: 600; color: #2c3e50;">${circuito.potencia} W</td>
            <td style="text-align: center; font-weight: 600; color: #e74c3c;">${circuito.corriente} A</td>
            <td style="text-align: center; font-weight: 600; color: #16a085;">${circuito.seccion} mm²</td>
            <td style="text-align: center; font-weight: 600; color: #27ae60;">${circuito.tierra} mm²</td>
            <td style="text-align: center; font-size: 12px; color: #34495e;">${circuito.automatico}</td>
            <td style="text-align: center; font-size: 12px; color: ${circuito.diferencial !== '-' ? '#e67e22' : '#95a5a6'}; font-weight: ${circuito.diferencial !== '-' ? '600' : 'normal'};">
                ${circuito.diferencial}
            </td>
        </tr>
    `;
}

/**
 * Actualizar totales en el footer del modal
 */
function actualizarTotalesModal(totalPot, totalCorr, demandaPot, demandaCorr, iga) {
    const elementos = {
        totalPotenciaModal: document.getElementById('totalPotenciaModal'),
        totalCorrienteModal: document.getElementById('totalCorrienteModal'),
        demandaPotenciaModal: document.getElementById('demandaPotenciaModal'),
        demandaCorrienteModal: document.getElementById('demandaCorrienteModal'),
        interruptorGeneralModal: document.getElementById('interruptorGeneralModal')
    };
    
    if (elementos.totalPotenciaModal) elementos.totalPotenciaModal.textContent = `${totalPot} W`;
    if (elementos.totalCorrienteModal) elementos.totalCorrienteModal.textContent = `${totalCorr} A`;
    if (elementos.demandaPotenciaModal) elementos.demandaPotenciaModal.textContent = `${demandaPot} W`;
    if (elementos.demandaCorrienteModal) elementos.demandaCorrienteModal.textContent = `${demandaCorr} A`;
    if (elementos.interruptorGeneralModal) elementos.interruptorGeneralModal.textContent = iga;
}

console.log('✅ Cuadro de Cargas Tabla inicializado');
