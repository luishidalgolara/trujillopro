// ============================================================
// SIMBOLOGÍA INTEGRACIÓN - Integración al plano y controles
// ============================================================

function integrarSimbologiaAlPlano() {
    const ventana = document.getElementById('simbologiaWindow');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!ventana || !drawingBoard) return;
    
    try {
        const wrapper = document.createElement('div');
        wrapper.className = 'simbologia-integrada';
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
        
        const tablaOriginal = ventana.querySelector('#tablaSimbologia tbody');
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
                .simbologia-integrada .simbologia-container {
                    font-family: Arial, sans-serif;
                    background: white;
                }
                
                .simbologia-integrada .simbologia-container h1 {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 12px;
                    color: #000000;
                    border-bottom: 3px solid #000000;
                    padding-bottom: 8px;
                }
                
                .simbologia-integrada .tabla-simbologia {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                
                .simbologia-integrada .tabla-simbologia th {
                    background: #000000;
                    color: white;
                    padding: 8px;
                    text-align: left;
                    font-weight: bold;
                    border: 2px solid #000000;
                    font-size: 13px;
                }
                
                .simbologia-integrada .tabla-simbologia td {
                    padding: 6px 8px;
                    border: 2px solid #000000;
                    font-size: 12px;
                    color: #000000;
                    font-weight: bold;
                }
                
                .simbologia-integrada .tabla-simbologia input {
                    width: 95%;
                    padding: 3px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    font-size: 11px;
                    font-weight: bold;
                }
                
                .simbologia-integrada .tabla-simbologia tr:nth-child(even) {
                    background: #f8f9fa;
                }
                
                .simbologia-integrada .tabla-simbologia tbody tr:hover {
                    background: #e3f2fd !important;
                }
                
                .simbologia-integrada .simbolo-celda {
                    text-align: center;
                    font-weight: bold;
                    font-size: 14px;
                    color: #000000;
                }
                
                .simbologia-integrada .flecha-tuberia {
                    color: #ff6600;
                    font-size: 18px;
                }
                
                .simbologia-integrada .circulo-camara {
                    color: #ff6600;
                    font-size: 18px;
                }
                
                .simbologia-integrada .linea-punteada {
                    border-top: 3px dashed #000;
                    width: 60px;
                    margin: 0 auto;
                }
            </style>
            
            <div class="simbologia-container">
                <h1>SIMBOLOGÍA</h1>
                
                <table class="tabla-simbologia" id="tablaSimbologiaIntegrada">
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
                    <td class="simbolo-celda"><input type="text" value="${dato.simbolo}" style="text-align: center;"></td>
                `;
            } else {
                nuevaFila.innerHTML = `
                    <td>${dato.elemento}</td>
                    <td class="simbolo-celda">${dato.simbolo}</td>
                `;
            }
            
            nuevaFila.addEventListener('click', function(e) {
                if (e.target.tagName === 'INPUT') return;
                seleccionarFilaIntegrada(wrapper, nuevaFila);
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
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="cambiarTamanoSimbologia(this, 1.2)" title="Aumentar tamaño">🔍+</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="cambiarTamanoSimbologia(this, 0.8)" title="Reducir tamaño">🔍-</button>
            <button style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="resetTamanoSimbologia(this)" title="Restaurar tamaño">↺</button>
            <button class="btn-bloqueo" style="background: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="bloquearSimbologia(this)" title="Bloquear posición">🔓</button>
            <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 5px 10px; border-radius: 3px; font-weight: bold;" onclick="eliminarSimbologia(this)" title="Eliminar simbología">🗑️</button>
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
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            wrapper.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
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
        cerrarSimbologia();
        
        alert('✅ Simbología integrada exitosamente\n\n' +
              '🖱️ Arrastra para mover\n' +
              '🔍+/🔍- Cambia el tamaño (ahora puedes reducir mucho más)\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina la simbología\n' +
              'Click en fila → Botón eliminar aparece');
    } catch (error) {
        console.error('Error al integrar simbología:', error);
        alert('❌ Error al integrar la simbología: ' + error.message);
    }
}

function cambiarTamanoSimbologia(btn, factor) {
    const wrapper = btn.closest('.simbologia-integrada');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.1 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.1 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala;
    wrapper.style.transform = `scale(${nuevaEscala})`;
}

function resetTamanoSimbologia(btn) {
    const wrapper = btn.closest('.simbologia-integrada');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearSimbologia(btn) {
    const wrapper = btn.closest('.simbologia-integrada');
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

function eliminarSimbologia(btn) {
    if (confirm('¿Estás seguro de eliminar esta simbología del plano?')) {
        const wrapper = btn.closest('.simbologia-integrada');
        wrapper.remove();
    }
}

console.log('✅ Simbología Integración inicializado');