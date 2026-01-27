// memoria-alcantarillado/memoria-script-alc.js

// ⭐ ARTEFACTOS EXCLUSIVOS PARA ALCANTARILLADO (UEH)
const ARTEFACTOS_UEH = [
    { nombre: 'INODORO', sigla: 'Wc', ueh: 3, id: 'wc' },
    { nombre: 'BAÑOS LLUVIA', sigla: 'BLL', ueh: 2, id: 'ducha' },
    { nombre: 'BAÑO TINA', sigla: 'BT', ueh: 3, id: 'bano-tina' },
    { nombre: 'LAVATORIO', sigla: 'L°', ueh: 1, id: 'lavatorio' },
    { nombre: 'BIDET', sigla: 'Bd', ueh: 1, id: 'bidet' },
    { nombre: 'URINARIO', sigla: 'UR', ueh: 1, id: 'urinario' },
    { nombre: 'LAVAPLATOS', sigla: 'LP', ueh: 3, id: 'lavaplatos' },
    { nombre: 'LAVADERO', sigla: 'Lv', ueh: 3, id: 'lavadero' },
    { nombre: 'LAVADORA', sigla: 'LVA', ueh: 3, id: 'lavadora' },
    { nombre: 'LAVACOPAS', sigla: 'LC', ueh: 3, id: 'lavacopas' }
];

document.addEventListener('DOMContentLoaded', function() {
    const campos = document.querySelectorAll('.campo-editable, .campo-editable-inline');
    
    campos.forEach(campo => {
        campo.addEventListener('input', function() {
            guardarDatos();
        });
        
        campo.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const siguiente = Array.from(campos).indexOf(this) + 1;
                if (siguiente < campos.length) {
                    campos[siguiente].focus();
                }
            }
        });
    });
    
    cargarDatos();
    inicializarTablaUEH();
    
    // ⭐ AUTO-SYNC al cargar la memoria
    setTimeout(() => {
        autoSincronizarAlCargar();
    }, 500);
});

/**
 * ⭐ Inicializa la tabla UEH
 */
function inicializarTablaUEH() {
    const tbodyUEH = document.getElementById('tablaUEHBody');
    
    if (tbodyUEH) {
        tbodyUEH.innerHTML = '';
        ARTEFACTOS_UEH.forEach(art => {
            const tr = document.createElement('tr');
            tr.id = `mem_ueh_row_${art.id}`;
            tr.innerHTML = `
                <td>${art.nombre}</td>
                <td>${art.sigla}</td>
                <td id="mem_ueh_cant_${art.id}">0</td>
                <td>${art.ueh}</td>
                <td id="mem_ueh_subtotal_${art.id}">0</td>
            `;
            tbodyUEH.appendChild(tr);
        });
    }
    
    calcularTotalesUEH();
}

/**
 * ⭐ FUNCIÓN MODIFICADA - Auto-sincronización al cargar la memoria
 * Ahora usa el contador global unificado en lugar de contar elementos manualmente
 */
function autoSincronizarAlCargar() {
    if (!window.parent || !window.parent.location) {
        console.log('ℹ️ No hay parent window');
        return;
    }
    
    console.log('🔴 AUTO-SYNC: Memoria de ALCANTARILLADO cargada');
    
    // ⭐ MODIFICADO: Usar contador global unificado si existe
    let conteoUnificado = null;
    
    if (typeof window.parent.obtenerConteoTotalUnificado === 'function') {
        conteoUnificado = window.parent.obtenerConteoTotalUnificado();
        console.log('✅ Usando CONTEO_ARTEFACTOS global unificado');
        console.log('📊 Conteo detectado:', conteoUnificado);
    } else {
        console.log('⚠️ Fallback: contando desde arrays de elementos');
        // Fallback: contar desde elementos (método anterior)
        let elementsArray = [];
        if (window.parent.elements) {
            elementsArray = [...window.parent.elements];
        } else if (window.parent.plans && window.parent.plans[window.parent.currentPlanIndex]) {
            elementsArray = window.parent.plans[window.parent.currentPlanIndex].tracingElements || [];
        }
        
        // Agregar nivel 2 si existe
        if (window.parent.ELEMENTOS_NIVEL_2) {
            elementsArray = [...elementsArray, ...window.parent.ELEMENTOS_NIVEL_2];
        }
        
        console.log('📊 Elementos detectados:', elementsArray.length);
        sincronizarDesdeAlcantarillado(elementsArray);
        return;
    }
    
    // Actualizar cada artefacto con el conteo unificado
    ARTEFACTOS_UEH.forEach(art => {
        const cantidad = conteoUnificado[art.id] || 0;
        actualizarCantidadMemoriaAlcantarillado(art.id, cantidad);
    });
    
    console.log('✅ Memoria sincronizada con contador global unificado');
}

/**
 * ⭐ Actualiza cantidad de un artefacto en la tabla UEH
 */
function actualizarCantidadMemoriaAlcantarillado(artefactoId, cantidad) {
    console.log(`📊 ALCANTARILLADO - Actualizando UEH ${artefactoId} = ${cantidad}`);
    
    // Solo actualizar si el artefacto existe en ARTEFACTOS_UEH
    const existeEnUEH = ARTEFACTOS_UEH.find(art => art.id === artefactoId);
    if (!existeEnUEH) {
        console.warn(`⚠️ ${artefactoId} no pertenece a UEH`);
        return;
    }
    
    const cantUEHElement = document.getElementById(`mem_ueh_cant_${artefactoId}`);
    
    if (cantUEHElement) {
        cantUEHElement.textContent = cantidad;
    }
    
    calcularTotalesUEH();
}

/**
 * ⭐ Calcula totales de UEH
 */
function calcularTotalesUEH() {
    let totalUEH = 0;
    
    ARTEFACTOS_UEH.forEach(art => {
        const cantidad = parseInt(document.getElementById(`mem_ueh_cant_${art.id}`)?.textContent || 0);
        const subtotalUEH = cantidad * art.ueh;
        
        const subtotalUEHElement = document.getElementById(`mem_ueh_subtotal_${art.id}`);
        if (subtotalUEHElement) subtotalUEHElement.textContent = subtotalUEH;
        
        totalUEH += subtotalUEH;
    });
    
    const totalUEHElement = document.getElementById('totalUEH');
    const totalUEHFinalElement = document.getElementById('totalUEHFinal');
    
    if (totalUEHElement) totalUEHElement.textContent = totalUEH;
    if (totalUEHFinalElement) totalUEHFinalElement.textContent = totalUEH;
    
    console.log('✅ Total UEH calculado:', totalUEH);
}

/**
 * ⭐ Sincroniza desde ALCANTARILLADO
 */
function sincronizarDesdeAlcantarillado(elementos) {
    console.log('🔴 SINCRONIZACIÓN DESDE ALCANTARILLADO (UEH)');
    
    const contadores = {};
    ARTEFACTOS_UEH.forEach(art => {
        contadores[art.id] = 0;
    });
    
    if (elementos && Array.isArray(elementos)) {
        elementos.forEach(el => {
            if (contadores.hasOwnProperty(el.type)) {
                contadores[el.type]++;
            }
        });
    }
    
    console.log('📊 Contadores UEH:', contadores);
    
    Object.keys(contadores).forEach(artefactoId => {
        actualizarCantidadMemoriaAlcantarillado(artefactoId, contadores[artefactoId]);
    });
    
    console.log('✅ ALCANTARILLADO - Cuadro UEH sincronizado');
}

/**
 * Guarda datos del formulario
 */
function guardarDatos() {
    const datos = {
        nombreProyecto: document.getElementById('nombreProyecto')?.value || '',
        ubicacion: document.getElementById('ubicacion')?.value || '',
        comuna: document.getElementById('comuna')?.value || '',
        ciudad: document.getElementById('ciudad')?.value || '',
        propietario: document.getElementById('propietario')?.value || '',
        fecha: document.getElementById('fecha')?.value || '',
        ubicacionMemoria: document.getElementById('ubicacionMemoria')?.value || '',
        comunaMemoria: document.getElementById('comunaMemoria')?.value || ''
    };
    localStorage.setItem('memoriaCalculoAlc', JSON.stringify(datos));
}

/**
 * Carga datos guardados del formulario
 */
function cargarDatos() {
    const datosGuardados = localStorage.getItem('memoriaCalculoAlc');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        const nombreProyecto = document.getElementById('nombreProyecto');
        const ubicacion = document.getElementById('ubicacion');
        const comuna = document.getElementById('comuna');
        const ciudad = document.getElementById('ciudad');
        const propietario = document.getElementById('propietario');
        const fecha = document.getElementById('fecha');
        const ubicacionMemoria = document.getElementById('ubicacionMemoria');
        const comunaMemoria = document.getElementById('comunaMemoria');
        
        if (nombreProyecto) nombreProyecto.value = datos.nombreProyecto || '';
        if (ubicacion) ubicacion.value = datos.ubicacion || '';
        if (comuna) comuna.value = datos.comuna || '';
        if (ciudad) ciudad.value = datos.ciudad || '';
        if (propietario) propietario.value = datos.propietario || '';
        if (fecha) fecha.value = datos.fecha || '';
        if (ubicacionMemoria) ubicacionMemoria.value = datos.ubicacionMemoria || '';
        if (comunaMemoria) comunaMemoria.value = datos.comunaMemoria || '';
    }
}

/**
 * Limpia el formulario
 */
function limpiarFormulario() {
    document.querySelectorAll('.campo-editable, .campo-editable-inline').forEach(campo => {
        campo.value = '';
    });
    localStorage.removeItem('memoriaCalculoAlc');
}

/**
 * Imprime el documento
 */
function imprimirDocumento() {
    window.print();
}

// Exportar funciones
window.limpiarFormulario = limpiarFormulario;
window.imprimirDocumento = imprimirDocumento;
window.actualizarCantidadMemoriaAlcantarillado = actualizarCantidadMemoriaAlcantarillado;
window.sincronizarDesdeAlcantarillado = sincronizarDesdeAlcantarillado;
window.autoSincronizarAlCargar = autoSincronizarAlCargar;
window.calcularTotalesUEH = calcularTotalesUEH;

console.log('✅ Memoria de Cálculo ALCANTARILLADO cargada - Solo UEH');