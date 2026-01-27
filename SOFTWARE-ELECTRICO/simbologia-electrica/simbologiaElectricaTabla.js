// ============================================================
// SIMBOLOGÍA ELÉCTRICA TABLA - Gestión de filas y selección
// ============================================================

function inicializarSeleccionFilasElectricas() {
    const ventana = document.getElementById('simbologiaElectricaWindow');
    if (!ventana) return;
    
    const filas = ventana.querySelectorAll('.tabla-simbologia-electrica tbody tr');
    filas.forEach(fila => {
        fila.style.cursor = 'pointer';
        fila.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
            seleccionarFilaElectrica(fila);
        });
    });
}

function seleccionarFilaElectrica(fila) {
    const ventana = document.getElementById('simbologiaElectricaWindow');
    if (!ventana) return;
    
    const filas = ventana.querySelectorAll('.tabla-simbologia-electrica tbody tr');
    filas.forEach(f => {
        f.style.background = '';
        f.classList.remove('fila-seleccionada');
    });
    
    fila.style.background = '#e8f4f8';
    fila.classList.add('fila-seleccionada');
    filaElectricaSeleccionada = fila;
    
    mostrarBotonEliminarElectrica();
}

function mostrarBotonEliminarElectrica() {
    const ventana = document.getElementById('simbologiaElectricaWindow');
    if (!ventana) return;
    
    const btnAnterior = ventana.querySelector('#btnEliminarFilaElectricaSeleccionada');
    if (btnAnterior) btnAnterior.remove();
    
    const btn = document.createElement('button');
    btn.id = 'btnEliminarFilaElectricaSeleccionada';
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
        if (filaElectricaSeleccionada && confirm('¿Eliminar esta fila de la simbología?')) {
            filaElectricaSeleccionada.remove();
            filaElectricaSeleccionada = null;
            btn.remove();
        }
    });
    
    ventana.appendChild(btn);
}

function agregarFilaElectrica() {
    const ventana = document.getElementById('simbologiaElectricaWindow');
    if (!ventana) return;
    
    const tabla = ventana.querySelector('#tablaSimbologiaElectrica');
    if (!tabla) return;
    
    const tbody = tabla.querySelector('tbody');
    const nuevaFila = document.createElement('tr');
    nuevaFila.style.cursor = 'pointer';
    
    nuevaFila.innerHTML = `
        <td><input type="text" placeholder="Nombre del elemento" value="NUEVO ELEMENTO"></td>
        <td class="simbolo-celda-electrica"><input type="text" placeholder="Símbolo" value="--" style="text-align: center;"></td>
    `;
    
    nuevaFila.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT') return;
        seleccionarFilaElectrica(nuevaFila);
    });
    
    tbody.appendChild(nuevaFila);
}

function seleccionarFilaElectricaIntegrada(wrapper, fila) {
    const filas = wrapper.querySelectorAll('.tabla-simbologia-electrica tbody tr');
    filas.forEach(f => {
        f.style.background = '';
    });
    
    fila.style.background = '#e8f4f8';
    
    let btnEliminar = wrapper.querySelector('.btn-eliminar-fila-electrica-integrada');
    if (btnEliminar) btnEliminar.remove();
    
    btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar-fila-electrica-integrada';
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

console.log('✅ Simbología Eléctrica Tabla inicializado');