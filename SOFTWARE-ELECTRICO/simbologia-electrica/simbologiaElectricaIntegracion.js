// ============================================================
// SIMBOLOGÍA ELÉCTRICA INTEGRACIÓN - Integración al plano y controles
// ============================================================

function integrarSimbologiaElectricaAlPlano() {
    const ventana = document.getElementById('simbologiaElectricaWindow');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!ventana || !drawingBoard) {
        alert('❌ No se encontró el área de trabajo');
        return;
    }
    
    try {
        const wrapper = document.createElement('div');
        wrapper.className = 'simbologia-electrica-integrada';
        wrapper.style.cssText = `
            position: absolute;
            left: 50px;
            top: 50px;
            width: 450px;
            cursor: move;
            z-index: 50;
            border: 2px solid #9b59b6;
            background: white;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transform-origin: top left;
            transform: scale(1);
            overflow: visible;
        `;
        wrapper.dataset.bloqueado = 'false';
        wrapper.dataset.escala = '1';
        
        const tablaOriginal = ventana.querySelector('#tablaSimbologiaElectrica tbody');
        const filasOriginales = Array.from(tablaOriginal.querySelectorAll('tr'));
        
        const datosFilas = filasOriginales.map(fila => {
            const celdas = fila.querySelectorAll('td');
            const datos = {
                elemento: '',
                simbolo: ''
            };
            
            const inputElemento = celdas[0]?.querySelector('input');
            if (inputElemento) {
                datos.elemento = inputElemento.value;
                datos.esEditable = true;
            } else {
                datos.elemento = celdas[0]?.textContent || '';
                datos.esEditable = false;
            }
            
            const inputSimbolo = celdas[1]?.querySelector('input');
            if (inputSimbolo) {
                datos.simbolo = inputSimbolo.value;
            } else {
                datos.simbolo = celdas[1]?.innerHTML || '';
            }
            
            return datos;
        });
        
        const clonedContainer = document.createElement('div');
        clonedContainer.style.cssText = 'padding: 12px;';
        
        clonedContainer.innerHTML = `
            <style>
                .simbologia-electrica-integrada .simbologia-electrica-container {
                    font-family: Arial, sans-serif;
                    background: white;
                }
                
                .simbologia-electrica-integrada .simbologia-electrica-container h1 {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 12px;
                    color: #000000;
                    border-bottom: 3px solid #000000;
                    padding-bottom: 8px;
                }
                
                .simbologia-electrica-integrada .tabla-simbologia-electrica {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                
                .simbologia-electrica-integrada .tabla-simbologia-electrica th {
                    background: #000000;
                    color: white;
                    padding: 8px;
                    text-align: left;
                    font-weight: bold;
                    border: 2px solid #000000;
                    font-size: 13px;
                }
                
                .simbologia-electrica-integrada .tabla-simbologia-electrica td {
                    padding: 6px 8px;
                    border: 2px solid #000000;
                    font-size: 12px;
                    color: #000000;
                    font-weight: bold;
                }
                
                .simbologia-electrica-integrada .tabla-simbologia-electrica input {
                    width: 95%;
                    padding: 3px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    font-size: 11px;
                    font-weight: bold;
                }
                
                .simbologia-electrica-integrada .tabla-simbologia-electrica tr:nth-child(even) {
                    background: #f8f9fa;
                }
                
                .simbologia-electrica-integrada .tabla-simbologia-electrica tbody tr:hover {
                    background: #e3f2fd !important;
                }
                
                .simbologia-electrica-integrada .simbolo-celda-electrica {
                    text-align: center;
                    font-weight: bold;
                    font-size: 14px;
                    color: #000000;
                }
            </style>
            
            <div class="simbologia-electrica-container">
                <h1>SIMBOLOGÍA ELÉCTRICA</h1>
                
                <table class="tabla-simbologia-electrica" id="tablaSimbologiaElectricaIntegrada">
                    <thead>
                        <tr>
                            <th style="width: 70%;">ELEMENTO</th>
                            <th style="width: 30%;">SÍMBOLO</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        `;
        
        const tbodyNuevo = clonedContainer.querySelector('tbody');
        datosFilas.forEach(dato => {
            const nuevaFila = document.createElement('tr');
            nuevaFila.style.cursor = 'pointer';
            
            if (dato.esEditable) {
                nuevaFila.innerHTML = `
                    <td><input type="text" value="${dato.elemento}"></td>
                    <td class="simbolo-celda-electrica"><input type="text" value="${dato.simbolo}" style="text-align: center;"></td>
                `;
            } else {
                nuevaFila.innerHTML = `
                    <td>${dato.elemento}</td>
                    <td class="simbolo-celda-electrica">${dato.simbolo}</td>
                `;
            }
            
            nuevaFila.addEventListener('click', function(e) {
                if (e.target.tagName === 'INPUT') return;
                seleccionarFilaElectricaIntegrada(wrapper, nuevaFila);
            });
            
            tbodyNuevo.appendChild(nuevaFila);
        });
        
        const controls = document.createElement('div');
        controls.style.cssText = `
            position: absolute;
            top: -35px;
            right: 0;
            background: #9b59b6;
            padding: 5px;
            border-radius: 4px;
            display: flex;
            gap: 5px;
            z-index: 10;
        `;
        controls.innerHTML = `
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="cambiarTamanoSimbologiaElectrica(this, 1.2)" title="Aumentar tamaño">🔼</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="cambiarTamanoSimbologiaElectrica(this, 0.8)" title="Reducir tamaño">🔽</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="resetTamanoSimbologiaElectrica(this)" title="Restaurar tamaño">↺</button>
            <button class="btn-bloqueo-electrica" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="bloquearSimbologiaElectrica(this)" title="Bloquear posición">🔓</button>
            <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="eliminarSimbologiaElectrica(this)" title="Eliminar simbología">🗑️</button>
        `;
        
        wrapper.appendChild(controls);
        wrapper.appendChild(clonedContainer);
        
        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        
        wrapper.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
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
        cerrarSimbologiaElectrica();
        
        alert('✅ Simbología eléctrica integrada exitosamente\n\n' +
              '🖱️ Arrastra para mover\n' +
              '🔼/🔽 Cambia el tamaño\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina la simbología\n' +
              'Click en fila → Botón eliminar aparece');
              
        console.log('✅ Simbología eléctrica integrada al plano');
    } catch (error) {
        console.error('Error al integrar simbología:', error);
        alert('❌ Error al integrar la simbología: ' + error.message);
    }
}

function cambiarTamanoSimbologiaElectrica(btn, factor) {
    const wrapper = btn.closest('.simbologia-electrica-integrada');
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

function resetTamanoSimbologiaElectrica(btn) {
    const wrapper = btn.closest('.simbologia-electrica-integrada');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearSimbologiaElectrica(btn) {
    const wrapper = btn.closest('.simbologia-electrica-integrada');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '2px solid #9b59b6';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = 'black';
        btn.title = 'Bloquear posición';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '2px solid #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear posición';
    }
}

function eliminarSimbologiaElectrica(btn) {
    if (confirm('¿Estás seguro de eliminar esta simbología del plano?')) {
        const wrapper = btn.closest('.simbologia-electrica-integrada');
        wrapper.remove();
    }
}

console.log('✅ Simbología Eléctrica Integración inicializado');