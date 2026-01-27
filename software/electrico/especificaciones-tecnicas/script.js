// ============================================
// ESPECIFICACIONES TÉCNICAS - JAVASCRIPT
// Funcionalidades: Presupuesto, Impresión, Auto-guardado
// ============================================

// ============================================
// VARIABLES GLOBALES
// ============================================

let indexVisible = true;
const STORAGE_KEY = 'eett_electrica_data';

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Especificaciones Técnicas - Sistema Inicializado');
    
    // Cargar datos guardados
    cargarDatosGuardados();
    
    // Configurar auto-guardado
    configurarAutoGuardado();
    
    // Numerar páginas
    numerarPaginas();
    
    // Configurar navegación suave
    configurarNavegacionSuave();
    
    // Agregar eventos a campos editables
    agregarEventosEditables();
    
    // Configurar eventos de presupuesto
    configurarEventosPresupuesto();
    
    // Mensaje de bienvenida
    mostrarMensajeBienvenida();
    
    // Calcular presupuesto inicial
    calcularPresupuesto();
});

// ============================================
// FUNCIÓN: MOSTRAR/OCULTAR ÍNDICE
// ============================================

function toggleIndex() {
    const indice = document.getElementById('indice');
    
    if (indexVisible) {
        indice.style.display = 'none';
        indexVisible = false;
    } else {
        indice.style.display = 'block';
        indexVisible = true;
    }
}

// ============================================
// FUNCIÓN: NAVEGACIÓN SUAVE
// ============================================

function configurarNavegacionSuave() {
    const enlaces = document.querySelectorAll('.tabla-contenidos a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                resaltarSeccion(targetElement);
            }
        });
    });
}

function resaltarSeccion(elemento) {
    elemento.style.transition = 'background-color 0.5s ease';
    elemento.style.backgroundColor = '#e3f2fd';
    
    setTimeout(() => {
        elemento.style.backgroundColor = '';
    }, 2000);
}

// ============================================
// FUNCIÓN: NUMERACIÓN DE PÁGINAS
// ============================================

function numerarPaginas() {
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;
    
    const footer = document.querySelector('.page-footer p');
    if (footer) {
        footer.innerHTML = `Especificaciones Técnicas - Instalación Eléctrica | Total de páginas: ${totalPages}`;
    }
}

// ============================================
// FUNCIÓN: CÁLCULO DE PRESUPUESTO
// ============================================

function calcularPresupuesto() {
    try {
        // Obtener todos los precios de partidas
        const preciosPartidas = document.querySelectorAll('.precio-partida');
        let subtotalPartidas = 0;
        
        preciosPartidas.forEach((elemento, index) => {
            const valor = parsearMoneda(elemento.textContent);
            subtotalPartidas += valor;
            
            // Calcular porcentaje
            const filaPorcentaje = elemento.closest('tr').querySelector('.porcentaje');
            if (filaPorcentaje && subtotalPartidas > 0) {
                const porcentaje = ((valor / subtotalPartidas) * 100).toFixed(1);
                filaPorcentaje.textContent = `${porcentaje}%`;
            }
        });
        
        // Actualizar subtotal de partidas
        const subtotalPartidasElem = document.getElementById('subtotal-partidas');
        if (subtotalPartidasElem) {
            subtotalPartidasElem.innerHTML = `<strong>${formatearMoneda(subtotalPartidas)}</strong>`;
        }
        
        // Calcular costos adicionales
        const tablaAdicionales = document.querySelectorAll('#subtotal-adicionales').length > 0;
        let subtotalAdicionales = 0;
        
        if (tablaAdicionales) {
            const preciosAdicionales = document.querySelectorAll('table:has(#subtotal-adicionales) .editable');
            preciosAdicionales.forEach(elemento => {
                if (elemento.id !== 'subtotal-adicionales') {
                    subtotalAdicionales += parsearMoneda(elemento.textContent);
                }
            });
            
            const subtotalAdicionalesElem = document.getElementById('subtotal-adicionales');
            if (subtotalAdicionalesElem) {
                subtotalAdicionalesElem.innerHTML = `<strong>${formatearMoneda(subtotalAdicionales)}</strong>`;
            }
        }
        
        // Calcular totales finales
        const totalNeto = subtotalPartidas + subtotalAdicionales;
        const iva = Math.round(totalNeto * 0.19);
        const totalFinal = totalNeto + iva;
        
        // Actualizar tabla de resumen final
        actualizarElemento('final-partidas', formatearMoneda(subtotalPartidas));
        actualizarElemento('final-adicionales', formatearMoneda(subtotalAdicionales));
        actualizarElemento('total-neto', formatearMoneda(totalNeto), true);
        actualizarElemento('iva', formatearMoneda(iva));
        actualizarElemento('total-final', formatearMoneda(totalFinal), true);
        
        // Recalcular porcentajes
        recalcularPorcentajes(subtotalPartidas);
        
        console.log('Presupuesto actualizado:', {
            subtotalPartidas,
            subtotalAdicionales,
            totalNeto,
            iva,
            totalFinal
        });
        
    } catch (error) {
        console.error('Error al calcular presupuesto:', error);
    }
}

function recalcularPorcentajes(total) {
    if (total === 0) return;
    
    const preciosPartidas = document.querySelectorAll('.precio-partida');
    preciosPartidas.forEach(elemento => {
        const valor = parsearMoneda(elemento.textContent);
        const porcentaje = ((valor / total) * 100).toFixed(1);
        const filaPorcentaje = elemento.closest('tr').querySelector('.porcentaje');
        if (filaPorcentaje) {
            filaPorcentaje.textContent = `${porcentaje}%`;
        }
    });
}

function actualizarElemento(id, valor, negrita = false) {
    const elemento = document.getElementById(id);
    if (elemento) {
        if (negrita) {
            elemento.innerHTML = `<strong>${valor}</strong>`;
        } else {
            elemento.textContent = valor;
        }
    }
}

function parsearMoneda(texto) {
    // Eliminar símbolo $, puntos de miles y espacios
    const numero = texto.replace(/\$/g, '').replace(/\./g, '').replace(/\s/g, '').replace(/,/g, '');
    return parseInt(numero) || 0;
}

function formatearMoneda(valor) {
    return `$${valor.toLocaleString('es-CL')}`;
}

// ============================================
// FUNCIÓN: CONFIGURAR EVENTOS DE PRESUPUESTO
// ============================================

function configurarEventosPresupuesto() {
    // Eventos para campos de precios
    const camposPrecios = document.querySelectorAll('.precio-partida, table:has(#subtotal-adicionales) .editable');
    
    camposPrecios.forEach(campo => {
        campo.addEventListener('blur', function() {
            // Formatear el valor ingresado
            const valor = parsearMoneda(this.textContent);
            this.textContent = formatearMoneda(valor);
            
            // Recalcular presupuesto
            calcularPresupuesto();
            
            // Guardar datos
            guardarDatos();
        });
        
        campo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.blur();
            }
        });
    });
}

// ============================================
// FUNCIÓN: AUTO-GUARDADO
// ============================================

function configurarAutoGuardado() {
    const editables = document.querySelectorAll('.editable');
    
    editables.forEach(campo => {
        campo.addEventListener('blur', guardarDatos);
        campo.addEventListener('input', debounce(guardarDatos, 30000));
    });
}

function guardarDatos() {
    const editables = document.querySelectorAll('.editable');
    const datos = {};
    
    editables.forEach((campo, index) => {
        datos[`campo_${index}`] = campo.textContent;
    });
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
        console.log('Datos guardados automáticamente');
        mostrarNotificacion('✓ Cambios guardados', 'success');
    } catch (error) {
        console.error('Error al guardar datos:', error);
        mostrarNotificacion('⚠ Error al guardar', 'error');
    }
}

function cargarDatosGuardados() {
    try {
        const datosGuardados = localStorage.getItem(STORAGE_KEY);
        
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            const editables = document.querySelectorAll('.editable');
            
            editables.forEach((campo, index) => {
                const valorGuardado = datos[`campo_${index}`];
                if (valorGuardado && valorGuardado !== campo.textContent) {
                    campo.textContent = valorGuardado;
                }
            });
            
            console.log('Datos cargados desde almacenamiento local');
            mostrarNotificacion('Datos anteriores cargados', 'info');
            
            // Recalcular presupuesto después de cargar
            setTimeout(() => calcularPresupuesto(), 500);
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// ============================================
// FUNCIÓN: AGREGAR EVENTOS A CAMPOS EDITABLES
// ============================================

function agregarEventosEditables() {
    const editables = document.querySelectorAll('.editable');
    
    editables.forEach(campo => {
        campo.addEventListener('focus', function() {
            const range = document.createRange();
            range.selectNodeContents(this);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
        
        campo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !campo.classList.contains('precio-partida')) {
                e.preventDefault();
                this.blur();
            }
        });
    });
}

// ============================================
// FUNCIÓN: EXPORTAR/IMPRIMIR
// ============================================

function exportarPDF() {
    mostrarNotificacion('Preparando documento para impresión...', 'info');
    
    setTimeout(() => {
        window.print();
    }, 500);
}

// ============================================
// FUNCIÓN: LIMPIAR DATOS
// ============================================

function limpiarDatos() {
    if (confirm('¿Está seguro de que desea limpiar todos los datos guardados?')) {
        localStorage.removeItem(STORAGE_KEY);
        mostrarNotificacion('Datos eliminados. Recargando...', 'info');
        setTimeout(() => location.reload(), 1500);
    }
}

// ============================================
// FUNCIÓN: GENERAR REPORTE
// ============================================

function generarReporte() {
    const reporte = {
        fecha: new Date().toLocaleDateString('es-CL'),
        proyecto: document.querySelector('.info-grupo:nth-child(1) .editable')?.textContent || 'No especificado',
        instalador: document.querySelector('.info-grupo:nth-child(2) .editable')?.textContent || 'No especificado',
        codigo: document.querySelector('.info-grupo:nth-child(3) .editable')?.textContent || 'No especificado',
        presupuesto: {
            totalNeto: document.getElementById('total-neto')?.textContent || '$0',
            iva: document.getElementById('iva')?.textContent || '$0',
            totalFinal: document.getElementById('total-final')?.textContent || '$0'
        }
    };
    
    console.log('Reporte del proyecto:', reporte);
    return reporte;
}

// ============================================
// FUNCIÓN: MOSTRAR NOTIFICACIONES
// ============================================

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacionAnterior = document.querySelector('.notificacion');
    if (notificacionAnterior) {
        notificacionAnterior.remove();
    }
    
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    notificacion.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${getColorNotificacion(tipo)};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

function getColorNotificacion(tipo) {
    const colores = {
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3'
    };
    return colores[tipo] || colores.info;
}

// ============================================
// FUNCIÓN: MENSAJE DE BIENVENIDA
// ============================================

function mostrarMensajeBienvenida() {
    setTimeout(() => {
        const hayDatosGuardados = localStorage.getItem(STORAGE_KEY);
        
        if (hayDatosGuardados) {
            mostrarNotificacion('Bienvenido. Datos cargados correctamente.', 'info');
        } else {
            mostrarNotificacion('Complete los campos y use "Calcular Presupuesto"', 'info');
        }
    }, 1000);
}

// ============================================
// FUNCIÓN: VALIDAR CAMPOS
// ============================================

function validarCampos() {
    const editables = document.querySelectorAll('.editable');
    const camposVacios = [];
    
    editables.forEach((campo, index) => {
        const texto = campo.textContent.trim();
        if (texto.startsWith('[') && texto.endsWith(']')) {
            camposVacios.push(index + 1);
        }
    });
    
    if (camposVacios.length > 0) {
        mostrarNotificacion(
            `⚠ Hay ${camposVacios.length} campos sin completar`,
            'warning'
        );
        return false;
    }
    
    mostrarNotificacion('✓ Todos los campos están completos', 'success');
    return true;
}

// ============================================
// FUNCIÓN: EXPORTAR A EXCEL (BÁSICO)
// ============================================

function exportarExcel() {
    // Esta es una versión simplificada
    // En producción, usar una librería como XLSX.js
    
    const datosPresupuesto = [];
    const filasTabla = document.querySelectorAll('#tabla-presupuesto tbody tr');
    
    filasTabla.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length >= 3) {
            datosPresupuesto.push({
                partida: celdas[1].textContent,
                subtotal: celdas[2].textContent
            });
        }
    });
    
    console.log('Datos de presupuesto para exportar:', datosPresupuesto);
    mostrarNotificacion('Función de exportación a Excel en desarrollo', 'info');
}

// ============================================
// UTILIDADES
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ATAJOS DE TECLADO
// ============================================

document.addEventListener('keydown', function(e) {
    // Ctrl + P: Imprimir
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl + S: Guardar
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        guardarDatos();
        mostrarNotificacion('Datos guardados manualmente', 'success');
    }
    
    // Ctrl + I: Mostrar/Ocultar índice
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        toggleIndex();
    }
    
    // Ctrl + K: Calcular presupuesto
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        calcularPresupuesto();
        mostrarNotificacion('Presupuesto recalculado', 'success');
    }
});

// ============================================
// ANIMACIONES CSS
// ============================================

const estilosAnimacion = document.createElement('style');
estilosAnimacion.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(estilosAnimacion);

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================

window.toggleIndex = toggleIndex;
window.exportarPDF = exportarPDF;
window.limpiarDatos = limpiarDatos;
window.validarCampos = validarCampos;
window.generarReporte = generarReporte;
window.calcularPresupuesto = calcularPresupuesto;
window.exportarExcel = exportarExcel;

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================

console.log(`
╔═══════════════════════════════════════════════╗
║  ESPECIFICACIONES TÉCNICAS - SISTEMA          ║
║  Versión: 1.0                                 ║
║  Fecha: ${new Date().toLocaleDateString('es-CL')}                        ║
║                                               ║
║  Atajos de teclado:                           ║
║  - Ctrl + P: Imprimir                         ║
║  - Ctrl + S: Guardar                          ║
║  - Ctrl + I: Mostrar/Ocultar índice           ║
║  - Ctrl + K: Calcular presupuesto             ║
╚═══════════════════════════════════════════════╝
`);
