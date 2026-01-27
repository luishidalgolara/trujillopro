// ============================================
// MEMORIA TÉCNICA ELÉCTRICA - JAVASCRIPT
// Funcionalidades: Impresión, Navegación, Auto-guardado
// ============================================

// ============================================
// VARIABLES GLOBALES
// ============================================

let indexVisible = true;
const STORAGE_KEY = 'memoria_electrica_data';

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Memoria Técnica Eléctrica - Inicializada');
    
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
    
    // Mensaje de bienvenida
    mostrarMensajeBienvenida();
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
                
                // Resaltar temporalmente la sección
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
    
    // Actualizar pie de página
    const footer = document.querySelector('.page-footer p');
    if (footer) {
        footer.innerHTML = `Memoria Técnica - Instalación Eléctrica Domiciliaria | Total de páginas: ${totalPages}`;
    }
}

// ============================================
// FUNCIÓN: AUTO-GUARDADO DE DATOS
// ============================================

function configurarAutoGuardado() {
    const editables = document.querySelectorAll('.editable');
    
    editables.forEach(campo => {
        // Guardar al perder el foco
        campo.addEventListener('blur', guardarDatos);
        
        // Guardar cada 30 segundos mientras se edita
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
        
        // Mostrar notificación temporal
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
        // Seleccionar todo el texto al hacer clic
        campo.addEventListener('focus', function() {
            const range = document.createRange();
            range.selectNodeContents(this);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
        
        // Prevenir saltos de línea
        campo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.blur();
            }
        });
    });
}

// ============================================
// FUNCIÓN: EXPORTAR A PDF
// ============================================

function exportarPDF() {
    // Nota: Esta función usa window.print() que permite "Guardar como PDF"
    // en la mayoría de los navegadores modernos
    
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
        location.reload();
    }
}

// ============================================
// FUNCIÓN: VALIDAR CAMPOS REQUERIDOS
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
// FUNCIÓN: MOSTRAR NOTIFICACIONES
// ============================================

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Eliminar notificación anterior si existe
    const notificacionAnterior = document.querySelector('.notificacion');
    if (notificacionAnterior) {
        notificacionAnterior.remove();
    }
    
    // Crear nueva notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos
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
    
    // Eliminar después de 3 segundos
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
            mostrarNotificacion('Bienvenido de vuelta. Datos cargados.', 'info');
        } else {
            mostrarNotificacion('Complete los campos destacados en amarillo', 'info');
        }
    }, 1000);
}

// ============================================
// FUNCIÓN: GENERAR RESUMEN
// ============================================

function generarResumen() {
    const resumen = {
        fecha: new Date().toLocaleDateString('es-CL'),
        propietario: document.querySelector('.info-grupo:nth-child(3) .editable')?.textContent || 'No especificado',
        instalador: document.querySelector('.info-grupo:nth-child(2) .editable')?.textContent || 'No especificado',
        ubicacion: document.querySelector('.info-grupo:nth-child(1) .editable:nth-child(1)')?.textContent || 'No especificado'
    };
    
    console.log('Resumen del proyecto:', resumen);
    return resumen;
}

// ============================================
// FUNCIÓN: IMPRIMIR SECCIÓN ESPECÍFICA
// ============================================

function imprimirSeccion(seccionId) {
    const seccion = document.getElementById(seccionId);
    
    if (!seccion) {
        mostrarNotificacion('Sección no encontrada', 'error');
        return;
    }
    
    const ventanaImpresion = window.open('', '', 'width=800,height=600');
    ventanaImpresion.document.write(`
        <html>
        <head>
            <title>Impresión - Sección ${seccionId}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            ${seccion.innerHTML}
        </body>
        </html>
    `);
    
    ventanaImpresion.document.close();
    ventanaImpresion.print();
}

// ============================================
// UTILIDADES
// ============================================

// Debounce para optimizar eventos
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

// Formatear RUT chileno
function formatearRUT(rut) {
    // Eliminar puntos y guión
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    
    // Separar número y dígito verificador
    const numero = rut.slice(0, -1);
    const dv = rut.slice(-1);
    
    // Formatear con puntos
    const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${numeroFormateado}-${dv}`;
}

// Validar RUT chileno
function validarRUT(rut) {
    // Limpiar formato
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    
    const numero = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = numero.length - 1; i >= 0; i--) {
        suma += parseInt(numero.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    return dv === dvCalculado;
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
});

// ============================================
// ANIMACIONES CSS (inyectadas dinámicamente)
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
window.generarResumen = generarResumen;
window.imprimirSeccion = imprimirSeccion;

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================

console.log(`
╔═══════════════════════════════════════════════╗
║   MEMORIA TÉCNICA ELÉCTRICA - SISTEMA        ║
║   Versión: 1.0                                ║
║   Fecha: ${new Date().toLocaleDateString('es-CL')}                        ║
║                                               ║
║   Atajos de teclado:                          ║
║   - Ctrl + P: Imprimir                        ║
║   - Ctrl + S: Guardar                         ║
║   - Ctrl + I: Mostrar/Ocultar índice          ║
╚═══════════════════════════════════════════════╝
`);
