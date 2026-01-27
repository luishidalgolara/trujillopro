// ============================================================
// CUADRO DE CARGAS INTEGRACIÓN - Integración al plano SVG
// ============================================================

function integrarCuadroCargasAlPlano() {
    const ventana = document.getElementById('cuadroCargasWindow');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!ventana || !drawingBoard) {
        alert('❌ No se encontró el área de trabajo');
        return;
    }
    
    if (typeof CuadroState === 'undefined') {
        alert('❌ No hay datos de cuadro de cargas disponibles');
        return;
    }
    
    try {
        const wrapper = document.createElement('div');
        wrapper.className = 'cuadro-cargas-integrado';
        wrapper.style.cssText = `
            position: absolute;
            left: 50px;
            top: 50px;
            width: 700px;
            cursor: move;
            z-index: 50;
            border: 3px solid #f39c12;
            background: white;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            transform-origin: top left;
            transform: scale(1);
            overflow: visible;
        `;
        wrapper.dataset.bloqueado = 'false';
        wrapper.dataset.escala = '1';
        
        // Clonar datos de circuitos
        const todosCircuitos = [
            ...CuadroState.circuits.level1.map(c => ({...c, nivelLabel: 'N1'})),
            ...CuadroState.circuits.level2.map(c => ({...c, nivelLabel: 'N2'}))
        ];
        
        const clonedContainer = document.createElement('div');
        clonedContainer.style.cssText = 'padding: 15px;';
        
        clonedContainer.innerHTML = `
            <style>
                .cuadro-cargas-integrado .cuadro-cargas-container-int {
                    font-family: Arial, sans-serif;
                    background: white;
                }
                
                .cuadro-cargas-integrado .cuadro-cargas-container-int h1 {
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    color: #2c3e50;
                    border-bottom: 3px solid #f39c12;
                    padding-bottom: 8px;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 11px;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int thead tr {
                    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
                    color: white;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int th {
                    padding: 8px 5px;
                    text-align: center;
                    font-weight: bold;
                    border: 2px solid #34495e;
                    font-size: 10px;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int td {
                    padding: 6px 5px;
                    border: 1px solid #bdc3c7;
                    text-align: center;
                    color: #2c3e50;
                    font-size: 10px;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int tbody tr:hover {
                    background: #ecf0f1 !important;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int tfoot {
                    font-weight: bold;
                    font-size: 11px;
                }
                
                .cuadro-cargas-integrado .tabla-cargas-int tfoot td {
                    padding: 8px 5px;
                    border: 2px solid #34495e;
                }
            </style>
            
            <div class="cuadro-cargas-container-int">
                <h1>⚡ CUADRO DE CARGAS ELÉCTRICO</h1>
                
                <table class="tabla-cargas-int">
                    <thead>
                        <tr>
                            <th style="width: 8%;">Circ.</th>
                            <th style="width: 25%;">Tipo de Uso</th>
                            <th style="width: 12%;">Pot. (W)</th>
                            <th style="width: 12%;">Corr. (A)</th>
                            <th style="width: 10%;">Secc. (mm²)</th>
                            <th style="width: 10%;">Tierra (mm²)</th>
                            <th style="width: 13%;">Automático</th>
                            <th style="width: 10%;">Dif.</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyIntegrado">
                    </tbody>
                    <tfoot>
                        <tr style="background: #ecf0f1;">
                            <td colspan="2"><strong>TOTAL</strong></td>
                            <td><strong id="totalPotInt">${CuadroState.totalPotencia} W</strong></td>
                            <td><strong id="totalCorrInt">${CuadroState.totalCorriente} A</strong></td>
                            <td colspan="4"></td>
                        </tr>
                        <tr style="background: #fff3cd; color: #856404;">
                            <td colspan="2"><strong>⚡ DEMANDA</strong></td>
                            <td><strong id="demandaPotInt">${CuadroState.demandaPotencia} W</strong></td>
                            <td><strong id="demandaCorrInt">${CuadroState.demandaCorriente} A</strong></td>
                            <td colspan="4"></td>
                        </tr>
                        <tr style="background: #d1ecf1; color: #0c5460;">
                            <td colspan="2"><strong>🔌 IGA</strong></td>
                            <td colspan="6"><strong id="igaInt">${CuadroState.interruptorGeneral}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
        
        // Generar filas de circuitos
        const tbodyIntegrado = clonedContainer.querySelector('#tbodyIntegrado');
        
        if (todosCircuitos.length === 0) {
            tbodyIntegrado.innerHTML = `
                <tr>
                    <td colspan="8" style="padding: 20px; color: #7f8c8d; font-style: italic;">
                        Sin elementos en el plano
                    </td>
                </tr>
            `;
        } else {
            // Agrupar por categoría
            const iluminacion = todosCircuitos.filter(c => c.categoria === 'iluminacion');
            const enchufes = todosCircuitos.filter(c => c.categoria === 'enchufes');
            const electrodomesticos = todosCircuitos.filter(c => c.categoria === 'electrodomesticos');
            
            let html = '';
            let numeroCircuito = 1;
            
            if (iluminacion.length > 0) {
                html += `<tr style="background: #ffeaa7; color: #2d3436; font-weight: bold;">
                    <td colspan="8" style="padding: 8px; font-size: 11px;">💡 ILUMINACIÓN</td>
                </tr>`;
                iluminacion.forEach(c => {
                    html += generarFilaIntegrada(c, numeroCircuito, '#fff9e6');
                    numeroCircuito++;
                });
            }
            
            if (enchufes.length > 0) {
                html += `<tr style="background: #74b9ff; color: white; font-weight: bold;">
                    <td colspan="8" style="padding: 8px; font-size: 11px;">🔌 TOMACORRIENTES</td>
                </tr>`;
                enchufes.forEach(c => {
                    html += generarFilaIntegrada(c, numeroCircuito, '#e8f4ff');
                    numeroCircuito++;
                });
            }
            
            if (electrodomesticos.length > 0) {
                html += `<tr style="background: #a29bfe; color: white; font-weight: bold;">
                    <td colspan="8" style="padding: 8px; font-size: 11px;">⚡ ESPECIALES</td>
                </tr>`;
                electrodomesticos.forEach(c => {
                    html += generarFilaIntegrada(c, numeroCircuito, '#f3f2ff');
                    numeroCircuito++;
                });
            }
            
            tbodyIntegrado.innerHTML = html;
        }
        
        // Controles superiores
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: #f39c12;
            padding: 6px;
            border-radius: 4px;
            display: flex;
            gap: 5px;
            z-index: 10;
        `;
        controls.innerHTML = `
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="cambiarTamanoCuadroCargas(this, 1.2)" title="Aumentar tamaño">🔼</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="cambiarTamanoCuadroCargas(this, 0.8)" title="Reducir tamaño">🔽</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="resetTamanoCuadroCargas(this)" title="Restaurar tamaño">↺</button>
            <button class="btn-bloqueo-cuadro" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="bloquearCuadroCargas(this)" title="Bloquear posición">🔓</button>
            <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold; font-size: 12px;" onclick="eliminarCuadroCargas(this)" title="Eliminar cuadro">🗑️</button>
        `;
        
        wrapper.appendChild(controls);
        wrapper.appendChild(clonedContainer);
        
        // Sistema de arrastre
        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        
        wrapper.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            if (wrapper.dataset.bloqueado === 'true') return;
            
            isDragging = true;
            const rect = wrapper.getBoundingClientRect();
            const parentRect = drawingBoard.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            wrapper.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                e.preventDefault();
                const parentRect = drawingBoard.getBoundingClientRect();
                currentX = e.clientX - parentRect.left - initialX;
                currentY = e.clientY - parentRect.top - initialY;
                wrapper.style.left = currentX + 'px';
                wrapper.style.top = currentY + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                if (wrapper.dataset.bloqueado === 'false') {
                    wrapper.style.cursor = 'move';
                }
            }
        });
        
        drawingBoard.appendChild(wrapper);
        cerrarCuadroCargas();
        
        alert('✅ Cuadro de Cargas integrado exitosamente\n\n' +
              '🖱️ Arrastra para mover\n' +
              '🔼/🔽 Cambia el tamaño\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina el cuadro');
              
        console.log('✅ Cuadro de Cargas integrado al plano');
    } catch (error) {
        console.error('Error al integrar cuadro:', error);
        alert('❌ Error al integrar el cuadro: ' + error.message);
    }
}

function generarFilaIntegrada(circuito, numero, colorFondo) {
    const nombre = circuito.cantidad > 1 
        ? `${circuito.tipo} (×${circuito.cantidad})` 
        : circuito.tipo;
    
    const colorNivel = circuito.nivel === 1 ? '#3498db' : '#9b59b6';
    
    return `
        <tr style="background: ${colorFondo};">
            <td style="font-weight: bold;">C${numero} <span style="color: ${colorNivel}; font-size: 9px;">${circuito.nivelLabel}</span></td>
            <td style="text-align: left; padding-left: 8px;">${nombre}</td>
            <td>${circuito.potencia}</td>
            <td style="color: #e74c3c; font-weight: bold;">${circuito.corriente}</td>
            <td style="color: #16a085; font-weight: bold;">${circuito.seccion}</td>
            <td style="color: #27ae60; font-weight: bold;">${circuito.tierra}</td>
            <td style="font-size: 9px;">${circuito.automatico}</td>
            <td style="font-size: 9px; color: ${circuito.diferencial !== '-' ? '#e67e22' : '#95a5a6'};">${circuito.diferencial}</td>
        </tr>
    `;
}

function cambiarTamanoCuadroCargas(btn, factor) {
    const wrapper = btn.closest('.cuadro-cargas-integrado');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.1 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.1 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
    
    // 📏 MOSTRAR INDICADOR DE PORCENTAJE
    const porcentaje = nuevaEscala * 100;
    if (typeof showResizeIndicator === 'function') {
        showResizeIndicator(porcentaje);
        setTimeout(() => hideResizeIndicator(1500), 100);
    }
}

function resetTamanoCuadroCargas(btn) {
    const wrapper = btn.closest('.cuadro-cargas-integrado');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearCuadroCargas(btn) {
    const wrapper = btn.closest('.cuadro-cargas-integrado');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '3px solid #f39c12';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear posición';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '3px solid #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear posición';
    }
}

function eliminarCuadroCargas(btn) {
    if (confirm('¿Estás seguro de eliminar este cuadro del plano?')) {
        const wrapper = btn.closest('.cuadro-cargas-integrado');
        wrapper.remove();
    }
}

console.log('✅ Cuadro de Cargas Integración inicializado');