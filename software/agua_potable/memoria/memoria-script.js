// memoria/memoria-script.js
// ============================================
// MEMORIA DE CÁLCULO - AGUA POTABLE
// ============================================

// ⭐ ARTEFACTOS AGUA POTABLE - Definición única y clara
const ARTEFACTOS_AGUA_POTABLE = [
    { nombre: 'INODORO', sigla: 'WC', af: 10, ac: 0, id: 'wc' },
    { nombre: 'DUCHA', sigla: 'D', af: 10, ac: 10, id: 'ducha' },
    { nombre: 'BAÑO TINA', sigla: 'BT', af: 15, ac: 10, id: 'bano-tina' },
    { nombre: 'LAVATORIO', sigla: 'L', af: 8, ac: 8, id: 'lavatorio' },
    { nombre: 'BIDET', sigla: 'BD', af: 6, ac: 6, id: 'bidet' },
    { nombre: 'URINARIO', sigla: 'UR', af: 6, ac: 0, id: 'urinario' },
    { nombre: 'LAVAPLATOS', sigla: 'LP', af: 12, ac: 12, id: 'lavaplatos' },
    { nombre: 'LAVADERO', sigla: 'LV', af: 15, ac: 15, id: 'lavadero' },
    { nombre: 'LAVADORA', sigla: 'LVA', af: 15, ac: 0, id: 'lavadora' },
    { nombre: 'LAVACOPAS', sigla: 'LC', af: 12, ac: 12, id: 'lavacopas' },
    { nombre: 'LLAVE JARDÍN', sigla: 'LJ', af: 20, ac: 0, id: 'llave-jardin' }
];

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Memoria de Cálculo - AGUA POTABLE cargada');
    
    // Configurar campos editables
    configurarCamposEditables();
    
    // Cargar datos guardados
    cargarDatosGuardados();
    
    // Inicializar tabla de gastos
    inicializarTablaGastos();
    
    // Sincronizar con elementos si existen
    sincronizarConProyecto();
});

// ============================================
// CONFIGURACIÓN DE CAMPOS
// ============================================

function configurarCamposEditables() {
    const campos = document.querySelectorAll('.campo-editable');
    
    campos.forEach(campo => {
        // Guardar al modificar
        campo.addEventListener('input', function() {
            guardarDatos();
            actualizarTextosReferencia();
        });
        
        // Navegación con Tab
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
}

// ============================================
// TABLA DE GASTOS
// ============================================

function inicializarTablaGastos() {
    const tbody = document.getElementById('tablaBodyMemoria');
    
    if (!tbody) {
        console.warn('⚠️ No se encontró tabla de gastos');
        return;
    }
    
    tbody.innerHTML = '';
    
    ARTEFACTOS_AGUA_POTABLE.forEach(art => {
        const tr = document.createElement('tr');
        tr.id = `mem_row_${art.id}`;
        tr.innerHTML = `
            <td>${art.nombre}</td>
            <td>${art.sigla}</td>
            <td id="mem_cant_${art.id}">0</td>
            <td>${art.af}</td>
            <td id="mem_subtotal_af_${art.id}">0</td>
            <td>${art.ac > 0 ? art.ac : '-'}</td>
            <td id="mem_subtotal_ac_${art.id}">${art.ac > 0 ? '0' : '-'}</td>
        `;
        tbody.appendChild(tr);
    });
    
    calcularTotales();
    console.log('✅ Tabla de gastos inicializada');
}

// ============================================
// ACTUALIZAR CANTIDADES
// ============================================

function actualizarCantidadArtefacto(artefactoId, cantidad) {
    console.log(`📊 Actualizando ${artefactoId} = ${cantidad}`);
    
    const cantElement = document.getElementById(`mem_cant_${artefactoId}`);
    
    if (cantElement) {
        cantElement.textContent = cantidad;
        calcularTotales();
    } else {
        console.warn(`⚠️ No se encontró elemento para ${artefactoId}`);
    }
}

// ============================================
// CALCULAR TOTALES
// ============================================

function calcularTotales() {
    let totalAF = 0;
    let totalAC = 0;
    
    // Calcular subtotales por artefacto
    ARTEFACTOS_AGUA_POTABLE.forEach(art => {
        const cantidad = parseInt(document.getElementById(`mem_cant_${art.id}`)?.textContent || 0);
        
        const subtotalAF = cantidad * art.af;
        const subtotalAC = cantidad * art.ac;
        
        // Actualizar subtotales en tabla
        const subtotalAFElement = document.getElementById(`mem_subtotal_af_${art.id}`);
        const subtotalACElement = document.getElementById(`mem_subtotal_ac_${art.id}`);
        
        if (subtotalAFElement) subtotalAFElement.textContent = subtotalAF;
        if (subtotalACElement && art.ac > 0) subtotalACElement.textContent = subtotalAC;
        
        totalAF += subtotalAF;
        totalAC += subtotalAC;
    });
    
    // Actualizar totales generales
    actualizarElemento('totalAF', totalAF);
    actualizarElemento('totalAC', totalAC);
    
    const qiTotal = totalAF + totalAC;
    actualizarElemento('qiTotal', qiTotal);
    actualizarElemento('qiAF', totalAF);
    actualizarElemento('qiAC', totalAC);
    
    // Calcular QMP según fórmula chilena: 1.7391 × Q.I.^0.6891
    const qmp = Math.round(1.7391 * Math.pow(totalAF, 0.6891) * 100) / 100;
    actualizarElemento('qmpMemoria', qmp);
    actualizarElemento('qmpResultado', qmp);
    actualizarElemento('qmpMedidor', qmp);
    
    // Determinar diámetro del medidor según QMP
    const diametroMedidor = calcularDiametroMedidor(qmp);
    actualizarElemento('diametroMedidor', diametroMedidor);
    
    console.log('✅ Totales calculados:', { totalAF, totalAC, qiTotal, qmp });
}

// ============================================
// SINCRONIZACIÓN CON PROYECTO
// ============================================

function sincronizarConProyecto() {
    // Intentar sincronizar desde ventana padre
    if (window.parent && window.parent.elements) {
        sincronizarDesdeElementos(window.parent.elements);
    }
    
    // Sincronizar datos de tuberías
    sincronizarDatosTuberias();
}

function sincronizarDatosTuberias() {
    if (!window.parent) return;
    
    // Obtener datos desde el proyecto principal
    const total20mm = obtenerTextoElementoPadre('total20mm');
    const total25mm = obtenerTextoElementoPadre('total25mm');
    const total32mm = obtenerTextoElementoPadre('total32mm');
    const total40mm = obtenerTextoElementoPadre('total40mm');
    const totalFria = obtenerTextoElementoPadre('totalFria');
    const totalCaliente = obtenerTextoElementoPadre('totalCaliente');
    
    // Actualizar en la memoria
    if (total20mm) actualizarElemento('totalPPR20', total20mm);
    if (total25mm) actualizarElemento('totalPPR25', total25mm);
    if (total32mm) actualizarElemento('totalPPR32', total32mm);
    if (total40mm) actualizarElemento('totalPPR40', total40mm);
    if (totalFria) actualizarElemento('totalRedFria', totalFria);
    if (totalCaliente) actualizarElemento('totalRedCaliente', totalCaliente);
    
    console.log('📏 Datos de tuberías sincronizados:', {
        total20mm, total25mm, total32mm, total40mm, totalFria, totalCaliente
    });
}

function obtenerTextoElementoPadre(id) {
    if (!window.parent || !window.parent.document) return null;
    const elemento = window.parent.document.getElementById(id);
    return elemento ? elemento.textContent : null;
}

function sincronizarDesdeElementos(elementos) {
    console.log('🔄 Sincronizando con proyecto...');
    
    // Contar artefactos
    const contadores = {};
    ARTEFACTOS_AGUA_POTABLE.forEach(art => {
        contadores[art.id] = 0;
    });
    
    if (elementos && Array.isArray(elementos)) {
        elementos.forEach(el => {
            if (contadores.hasOwnProperty(el.type)) {
                contadores[el.type]++;
            }
        });
    }
    
    // Actualizar cantidades
    Object.keys(contadores).forEach(artefactoId => {
        actualizarCantidadArtefacto(artefactoId, contadores[artefactoId]);
    });
    
    console.log('✅ Sincronización completa:', contadores);
}

// ============================================
// PERSISTENCIA DE DATOS
// ============================================

function guardarDatos() {
    const datos = {
        nombreProyecto: obtenerValor('nombreProyecto'),
        ubicacion: obtenerValor('ubicacion'),
        comuna: obtenerValor('comuna'),
        ciudad: obtenerValor('ciudad'),
        propietario: obtenerValor('propietario'),
        fecha: obtenerValor('fecha')
    };
    
    localStorage.setItem('memoriaCalculoAP', JSON.stringify(datos));
    console.log('💾 Datos guardados');
}

function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('memoriaCalculoAP');
    
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            
            establecerValor('nombreProyecto', datos.nombreProyecto);
            establecerValor('ubicacion', datos.ubicacion);
            establecerValor('comuna', datos.comuna);
            establecerValor('ciudad', datos.ciudad);
            establecerValor('propietario', datos.propietario);
            establecerValor('fecha', datos.fecha);
            
            actualizarTextosReferencia();
            
            console.log('✅ Datos cargados desde localStorage');
        } catch (e) {
            console.error('❌ Error al cargar datos:', e);
        }
    }
}

function actualizarTextosReferencia() {
    // Actualizar textos que referencian los datos del proyecto
    const nombreProyecto = obtenerValor('nombreProyecto') || '_______________';
    const ubicacion = obtenerValor('ubicacion') || '_______________';
    const comuna = obtenerValor('comuna') || '_______________';
    
    actualizarElemento('nombreProyectoTexto', nombreProyecto);
    actualizarElemento('ubicacionTexto', ubicacion);
    actualizarElemento('comunaTexto', comuna);
}

// ============================================
// CALCULAR DIÁMETRO DE MEDIDOR
// ============================================

function calcularDiametroMedidor(qmp) {
    if (qmp <= 50) return '13 mm';
    if (qmp <= 83) return '19 mm';
    if (qmp <= 116) return '25 mm';
    if (qmp <= 333) return '38 mm';
    if (qmp <= 583) return '50 mm';
    return '80 mm';
}

// ============================================
// UTILIDADES
// ============================================

function obtenerValor(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value : '';
}

function establecerValor(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) elemento.value = valor || '';
}

function actualizarElemento(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = valor;
    }
}

// ============================================
// ACCIONES PÚBLICAS
// ============================================

function limpiarFormulario() {
    document.querySelectorAll('.campo-editable').forEach(campo => {
        campo.value = '';
    });
    localStorage.removeItem('memoriaCalculoAP');
    actualizarTextosReferencia();
    console.log('🗑️ Formulario limpiado');
}

function imprimirDocumento() {
    window.print();
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================

window.limpiarFormulario = limpiarFormulario;
window.imprimirDocumento = imprimirDocumento;
window.actualizarCantidadArtefacto = actualizarCantidadArtefacto;
window.sincronizarDesdeElementos = sincronizarDesdeElementos;
window.calcularTotales = calcularTotales;
window.sincronizarDatosTuberias = sincronizarDatosTuberias;

console.log('✅ Memoria de Cálculo - AGUA POTABLE lista');