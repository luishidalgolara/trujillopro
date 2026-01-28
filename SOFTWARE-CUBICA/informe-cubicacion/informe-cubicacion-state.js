/* ========================================
   ESTADO - INFORME DE CUBICACIÓN
   ======================================== */

// Variables globales
let informeCubicacionActivo = false;

// Datos del proyecto
let datosProyecto = {
    nombre: '',
    codigo: '',
    fecha: '',
    ubicacion: ''
};

// Inicializar sistema de informe
function inicializarInformeCubicacion() {
    console.log('Sistema de informe de cubicación inicializado');
    
    // Obtener fecha actual
    const hoy = new Date();
    datosProyecto.fecha = hoy.toLocaleDateString('es-CL');
}
