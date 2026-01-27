// ============================================================
// SIMBOLOGÍA - SISTEMA DE DETECCIÓN Y VISUALIZACIÓN
// Detecta automáticamente elementos del plano y genera tabla
// ============================================================

let simbologiaActiva = false;
let filaSeleccionada = null;

function abrirSimbologia() {
    if (simbologiaActiva) {
        console.log('⚠️ Simbología ya está abierta');
        return;
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        console.error('❌ drawingBoard no encontrado');
        return;
    }
    
    const ventana = document.createElement('div');
    ventana.id = 'simbologiaWindow';
    ventana.className = 'vineta-window';
    ventana.style.cssText = `
        position: absolute;
        width: 75%;
        max-width: 900px;
        height: 85vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 100;
        display: flex;
        flex-direction: column;
    `;
    
    const simbologiaHTML = generarSimbologiaHTML();
    
    ventana.innerHTML = `
        <div id="simbologiaHeader" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: #9b59b6;
            color: white;
            min-height: 40px;
            cursor: grab;
        ">
            <div style="font-size: 16px; font-weight: bold;">📊 SIMBOLOGÍA</div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button onclick="integrarSimbologiaAlPlano()" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                ">📌 INTEGRAR AL PLANO</button>
                <button onclick="cerrarSimbologia()" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 20px;
                    color: white;
                    cursor: pointer;
                ">✕</button>
            </div>
        </div>
        <div style="flex: 1; overflow: auto; position: relative; padding: 20px;">
            ${simbologiaHTML}
        </div>
    `;
    
    drawingBoard.appendChild(ventana);
    simbologiaActiva = true;
    
    setTimeout(() => {
        inicializarArrastreSimbologia();
        inicializarSeleccionFilas();
    }, 100);
    
    console.log('✅ Simbología abierta');
}

function cerrarSimbologia() {
    const ventana = document.getElementById('simbologiaWindow');
    if (ventana) {
        ventana.remove();
        simbologiaActiva = false;
        filaSeleccionada = null;
        console.log('✅ Simbología cerrada');
    }
}

function inicializarArrastreSimbologia() {
    const header = document.getElementById('simbologiaHeader');
    const ventana = document.getElementById('simbologiaWindow');
    
    if (!header || !ventana) return;
    
    let arrastrando = false;
    let mouseInicio = { x: 0, y: 0 };
    let ventanaInicio = { x: 0, y: 0 };
    
    header.onmousedown = function(e) {
        if (e.target.tagName === 'BUTTON') return;
        
        arrastrando = true;
        mouseInicio.x = e.clientX;
        mouseInicio.y = e.clientY;
        
        const rect = ventana.getBoundingClientRect();
        const parentRect = ventana.parentElement.getBoundingClientRect();
        
        ventanaInicio.x = rect.left - parentRect.left;
        ventanaInicio.y = rect.top - parentRect.top;
        
        header.style.cursor = 'grabbing';
        e.preventDefault();
    };
    
    document.onmousemove = function(e) {
        if (!arrastrando) return;
        
        e.preventDefault();
        
        const deltaX = e.clientX - mouseInicio.x;
        const deltaY = e.clientY - mouseInicio.y;
        
        ventana.style.left = (ventanaInicio.x + deltaX) + 'px';
        ventana.style.top = (ventanaInicio.y + deltaY) + 'px';
        ventana.style.transform = 'none';
    };
    
    document.onmouseup = function() {
        if (arrastrando) {
            arrastrando = false;
            header.style.cursor = 'grab';
        }
    };
}

function inicializarSeleccionFilas() {
    const ventana = document.getElementById('simbologiaWindow');
    if (!ventana) return;
    
    const filas = ventana.querySelectorAll('.tabla-simbologia tbody tr');
    filas.forEach(fila => {
        fila.style.cursor = 'pointer';
        fila.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
            seleccionarFila(fila);
        });
    });
}

function seleccionarFila(fila) {
    const ventana = document.getElementById('simbologiaWindow');
    if (!ventana) return;
    
    // Limpiar selección anterior
    const filas = ventana.querySelectorAll('.tabla-simbologia tbody tr');
    filas.forEach(f => {
        f.style.background = '';
        f.classList.remove('fila-seleccionada');
    });
    
    // Seleccionar nueva fila
    fila.style.background = '#e8f4f8';
    fila.classList.add('fila-seleccionada');
    filaSeleccionada = fila;
    
    // Mostrar botón eliminar
    mostrarBotonEliminar();
}

function mostrarBotonEliminar() {
    const ventana = document.getElementById('simbologiaWindow');
    if (!ventana) return;
    
    // Eliminar botón anterior si existe
    const btnAnterior = ventana.querySelector('#btnEliminarFilaSeleccionada');
    if (btnAnterior) btnAnterior.remove();
    
    // Crear nuevo botón
    const btn = document.createElement('button');
    btn.id = 'btnEliminarFilaSeleccionada';
    btn.innerHTML = '❌ ELIMINAR FILA';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    
    btn.addEventListener('click', function() {
        if (filaSeleccionada && confirm('¿Eliminar esta fila de la simbología?')) {
            filaSeleccionada.remove();
            filaSeleccionada = null;
            btn.remove();
        }
    });
    
    ventana.appendChild(btn);
}

function generarSimbologiaHTML() {
    const conteo = contarElementosPlano();
    
    return `
        <style>
            .simbologia-container {
                font-family: Arial, sans-serif;
                background: white;
            }
            
            .simbologia-container h1 {
                text-align: center;
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #000000;
                border-bottom: 4px solid #000000;
                padding-bottom: 10px;
            }
            
            .btn-agregar-fila {
                display: block;
                margin: 0 auto 20px auto;
                background: #27ae60;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
            }
            
            .btn-agregar-fila:hover {
                background: #229954;
            }
            
            .tabla-simbologia {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            
            .tabla-simbologia th {
                background: #000000;
                color: white;
                padding: 15px;
                text-align: left;
                font-weight: bold;
                border: 2px solid #000000;
                font-size: 18px;
            }
            
            .tabla-simbologia td {
                padding: 12px 15px;
                border: 2px solid #000000;
                font-size: 18px;
                color: #000000;
                font-weight: bold;
            }
            
            .tabla-simbologia input {
                width: 95%;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 16px;
                font-weight: bold;
            }
            
            .tabla-simbologia tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .tabla-simbologia tbody tr:hover {
                background: #e3f2fd !important;
            }
            
            .simbolo-celda {
                text-align: center;
                font-weight: bold;
                font-size: 20px;
                color: #000000;
            }
            
            .flecha-tuberia {
                color: #ff6600;
                font-size: 28px;
            }
            
            .circulo-camara {
                color: #ff6600;
                font-size: 28px;
            }
            
            .linea-punteada {
                border-top: 4px dashed #000;
                width: 80px;
                margin: 0 auto;
            }
        </style>
        
        <div class="simbologia-container">
            <h1>SIMBOLOGÍA</h1>
            
            <button class="btn-agregar-fila" onclick="agregarFilaSimbologia()">
                ➕ AGREGAR FILA
            </button>
            
            <table class="tabla-simbologia" id="tablaSimbologia">
                <thead>
                    <tr>
                        <th style="width: 70%;">ELEMENTO</th>
                        <th style="width: 30%;">SÍMBOLO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LÍNEA OFICIAL</td>
                        <td class="simbolo-celda"><div class="linea-punteada"></div></td>
                    </tr>
                    <tr>
                        <td>TUBERÍA SANITARIA ALCANTARILLADO</td>
                        <td class="simbolo-celda"><span class="flecha-tuberia">⟶</span></td>
                    </tr>
                    <tr>
                        <td>CÁMARA PREFABRICADA PROY.</td>
                        <td class="simbolo-celda"><span class="circulo-camara">⬤</span></td>
                    </tr>
                    <tr>
                        <td>CÁMARA INSPECCIÓN</td>
                        <td class="simbolo-celda"><span class="circulo-camara">⚫</span></td>
                    </tr>
                    <tr>
                        <td>CÁMARA PÚBLICA</td>
                        <td class="simbolo-celda"><span style="color: #ff0000; font-size: 28px;">🔴</span></td>
                    </tr>
                    <tr>
                        <td>LAVAMANO</td>
                        <td class="simbolo-celda">L</td>
                    </tr>
                    <tr>
                        <td>INODORO</td>
                        <td class="simbolo-celda">WC</td>
                    </tr>
                    <tr>
                        <td>BAÑO LLUVIA</td>
                        <td class="simbolo-celda">BLL</td>
                    </tr>
                    <tr>
                        <td>LAVAPLATOS</td>
                        <td class="simbolo-celda">Lp</td>
                    </tr>
                    <tr>
                        <td>CAJA REGISTRO</td>
                        <td class="simbolo-celda">CR</td>
                    </tr>
                    <tr>
                        <td>BIDET</td>
                        <td class="simbolo-celda">Bd</td>
                    </tr>
                    <tr>
                        <td>URINARIO</td>
                        <td class="simbolo-celda">U</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function agregarFilaSimbologia() {
    const ventana = document.getElementById('simbologiaWindow');
    if (!ventana) return;
    
    const tabla = ventana.querySelector('#tablaSimbologia');
    if (!tabla) return;
    
    const tbody = tabla.querySelector('tbody');
    const nuevaFila = document.createElement('tr');
    nuevaFila.style.cursor = 'pointer';
    
    nuevaFila.innerHTML = `
        <td><input type="text" placeholder="Nombre del elemento" value="NUEVO ELEMENTO"></td>
        <td class="simbolo-celda"><input type="text" placeholder="Símbolo" value="--" style="text-align: center;"></td>
    `;
    
    nuevaFila.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT') return;
        seleccionarFila(nuevaFila);
    });
    
    tbody.appendChild(nuevaFila);
}

function contarElementosPlano() {
    const svg = document.getElementById('tracingSvg');
    if (!svg) return {};
    
    const conteo = {
        wc: 0,
        lavatorio: 0,
        ducha: 0,
        lavaplatos: 0,
        camaras: 0,
        cajaRegistro: 0,
        bidet: 0,
        urinario: 0,
        tuberias: 0,
        camaraInspeccion: 0,
        camaraPublica: 0
    };
    
    const elementos = svg.querySelectorAll('[data-artefacto]');
    elementos.forEach(elem => {
        const tipo = elem.getAttribute('data-artefacto');
        if (tipo === 'camara-inspeccion') {
            conteo.camaraInspeccion++;
        } else if (tipo === 'camara-publica') {
            conteo.camaraPublica++;
        } else if (tipo === 'caja-registro') {
            conteo.cajaRegistro++;
        } else if (conteo.hasOwnProperty(tipo)) {
            conteo[tipo]++;
        }
    });
    
    const tuberias = svg.querySelectorAll('line[stroke="#FF6B35"]');
    conteo.tuberias = tuberias.length;
    conteo.camaras = conteo.camaraInspeccion + conteo.camaraPublica;
    
    return conteo;
}

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
            width: 550px;
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
        clonedContainer.style.cssText = 'padding: 15px;';
        
        clonedContainer.innerHTML = `
            <style>
                .simbologia-integrada .simbologia-container {
                    font-family: Arial, sans-serif;
                    background: white;
                }
                
                .simbologia-integrada .simbologia-container h1 {
                    text-align: center;
                    font-size: 36px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #000000;
                    border-bottom: 4px solid #000000;
                    padding-bottom: 10px;
                }
                
                .simbologia-integrada .btn-agregar-fila {
                    display: block;
                    margin: 0 auto 20px auto;
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                }
                
                .simbologia-integrada .tabla-simbologia {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                
                .simbologia-integrada .tabla-simbologia th {
                    background: #000000;
                    color: white;
                    padding: 15px;
                    text-align: left;
                    font-weight: bold;
                    border: 2px solid #000000;
                    font-size: 18px;
                }
                
                .simbologia-integrada .tabla-simbologia td {
                    padding: 12px 15px;
                    border: 2px solid #000000;
                    font-size: 18px;
                    color: #000000;
                    font-weight: bold;
                }
                
                .simbologia-integrada .tabla-simbologia input {
                    width: 95%;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    font-size: 16px;
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
                    font-size: 20px;
                    color: #000000;
                }
                
                .simbologia-integrada .flecha-tuberia {
                    color: #ff6600;
                    font-size: 28px;
                }
                
                .simbologia-integrada .circulo-camara {
                    color: #ff6600;
                    font-size: 28px;
                }
                
                .simbologia-integrada .linea-punteada {
                    border-top: 4px dashed #000;
                    width: 80px;
                    margin: 0 auto;
                }
            </style>
            
            <div class="simbologia-container">
                <h1>SIMBOLOGÍA</h1>
                
                <button class="btn-agregar-fila">
                    ➕ AGREGAR FILA
                </button>
                
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
        
        const botonAgregar = clonedContainer.querySelector('.btn-agregar-fila');
        if (botonAgregar) {
            botonAgregar.addEventListener('click', function() {
                const tbody = clonedContainer.querySelector('tbody');
                const nuevaFila = document.createElement('tr');
                nuevaFila.style.cursor = 'pointer';
                
                nuevaFila.innerHTML = `
                    <td><input type="text" placeholder="Nombre del elemento" value="NUEVO ELEMENTO"></td>
                    <td class="simbolo-celda"><input type="text" placeholder="Símbolo" value="--" style="text-align: center;"></td>
                `;
                
                nuevaFila.addEventListener('click', function(e) {
                    if (e.target.tagName === 'INPUT') return;
                    seleccionarFilaIntegrada(wrapper, nuevaFila);
                });
                
                tbody.appendChild(nuevaFila);
            });
        }
        
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
              '🔍+/🔍- Cambia el tamaño\n' +
              '↺ Restaura tamaño original\n' +
              '🔓/🔒 Bloquea posición\n' +
              '🗑️ Elimina la simbología\n' +
              '➕ Agrega filas\n' +
              'Click en fila → Botón eliminar aparece');
    } catch (error) {
        console.error('Error al integrar simbología:', error);
        alert('❌ Error al integrar la simbología: ' + error.message);
    }
}

function seleccionarFilaIntegrada(wrapper, fila) {
    const filas = wrapper.querySelectorAll('.tabla-simbologia tbody tr');
    filas.forEach(f => {
        f.style.background = '';
    });
    
    fila.style.background = '#e8f4f8';
    
    let btnEliminar = wrapper.querySelector('.btn-eliminar-fila-integrada');
    if (btnEliminar) btnEliminar.remove();
    
    btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar-fila-integrada';
    btnEliminar.innerHTML = '❌ ELIMINAR FILA';
    btnEliminar.style.cssText = `
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: #e74c3c;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        font-size: 12px;
        z-index: 100;
    `;
    
    btnEliminar.addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('¿Eliminar esta fila de la simbología?')) {
            fila.remove();
            btnEliminar.remove();
        }
    });
    
    wrapper.appendChild(btnEliminar);
}

function cambiarTamanoSimbologia(btn, factor) {
    const wrapper = btn.closest('.simbologia-integrada');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.3 || nuevaEscala > 3) {
        alert(nuevaEscala < 0.3 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
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

window.abrirSimbologia = abrirSimbologia;
window.cerrarSimbologia = cerrarSimbologia;
window.integrarSimbologiaAlPlano = integrarSimbologiaAlPlano;
window.cambiarTamanoSimbologia = cambiarTamanoSimbologia;
window.resetTamanoSimbologia = resetTamanoSimbologia;
window.bloquearSimbologia = bloquearSimbologia;
window.eliminarSimbologia = eliminarSimbologia;
window.agregarFilaSimbologia = agregarFilaSimbologia;

console.log('✅ Simbología Handler inicializado');