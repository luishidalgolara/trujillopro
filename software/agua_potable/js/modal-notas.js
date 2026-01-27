/* ========================================
   SISTEMA NOTAS OBLIGATORIAS - ESSBIO
   ======================================== */

const TEXTO_NOTAS_COMPLETO = `I.— LAS CAÑERÍAS DESDE LA PIEZA N°6 HASTA LA PIEZA N°11 DEL VARAL DE SUBIDA, DEBERÁN SER DE COBRE DE DIÁMETRO IGUAL AL DIÁMETRO DEL ARRANQUE. PARA EL CASO QUE EL DIÁMETRO DEL MAP SEA MENOR QUE LA TUBERÍA DEL ARRANQUE SE DEBERÁ CONSIDERAR CODO CON REDUCCIÓN
II.— EN ATRAVIESO BAJO CALZADA SE EXIGIRÁ ENCAMISADO DE CAÑERÍA PVC CLASE 4 Ó SANITARIO DE DIÁMETRO IGUAL AL DOBLE DE LA CAÑERÍA DEL ARRANQUE COMO MÍNIMO LO QUE ESTÉ ENCALCCE Ó NORMA CHILENA NCh 399 Y NCh 2252. SE DEBERÁ SELLAR Ó RELLENAR ESTE ENCAMISADO EN LOS EXTREMOS DE LA TUBERÍA CON AISLAPOL PARA EVITAR EL INGRESO DE ARENA Ó TIERRA Y FACILITAR EL RETIRO DE LA CAÑERÍA EN CASO DE REEMPLAZO.
III.— LA DISTANCIA MÁXIMA ENTRE LA TUBERÍA DE LA RED DE DISTRIBUCIÓN Y LA LÍNEA OFICIAL DE LA PROPIEDAD SERÁ DE 20m, SALVO EN CASOS EXCEPCIONALES QUE SERÁN DEFINIDOS POR ESSBIO S.A. Y NUEVOSUR S.A.
IV.— EN SUELOS AGRESIVOS APROBADOS POR ESSBIO S.A. Y NUEVOSUR S.A. EXIGIRÁ UNA PROTECCIÓN ANTICORROSIVA EPÓXICA EN LOS PERNOS DEL COLLARÍN (CASO Fe Fdo.)
V.— SE DEBEN REALIZAR LOS TRABAJOS NECESARIOS PARA DEJAR HABILITADAS LAS CALLES, CAMINOS Y BERMAS, QUE DEBERÁN QUEDAR EN LAS MISMAS CONDICIONES QUE TENÍAN ANTES DE COMENZAR LOS TRABAJOS
VI.— EL RADIER DE LA BASE DEL NICHO SERÁ DE HORMIGÓN DE 170 Kg–cem/m3, CON UN ESPESOR MÍNIMO DE 5cm.
VII.— EN CASO QUE EL ARRANQUE DOMICILIARIO DEBA CRUZAR ALGÚN CURSO DE AGUA, SE DEBERÁ PROTEGER LA CAÑERÍA MEDIANTE UNA TUBERÍA DE ACERO GALVANIZADO DE DIÁMETRO IGUAL AL DOBLE DE LA CAÑERÍA COMO MÍNIMO
VIII.— LA INSTALACIÓN DEL ARRANQUE DEBE CUMPLIR CON LA NCh 2459 Y 2836
IX.— PARA MEDIDOR DE 13mm (½") PODRÁ EJECUTAR EL ARRANQUE CON CAÑERÍA DE 13mm DE DIÁMETRO, SIEMPRE QUE CUMPLA CON EL PUNTO 7.2.1. DE LA NCh 691 OF 98.
X.— NO SE PERMITE LLAVE DE JARDÍN EN VARAL DE SALIDA DEL MEDIDOR NI DENTRO DEL NICHO, ESTA DEBERÁ TENER UN DIÁMETRO IGUAL AL MAP (NCh 2836)
XI.— LA MARCA DEL MEDIDOR DEBERÁ CUMPLIR CON LA NCh 1730 MÍNIMO CLASE B, CON CÚPULA DE VIDRIO, TRANSMISIÓN MAGNÉTICA, HERMÉTICO Y ROSCAS DIFERENCIADAS.
XII.— CUANDO EL DIÁMETRO DEL ARRANQUE SEA MAYOR A 1/3 DEL DIÁMETRO DE LA TUBERÍA DE LA RED DE DISTRIBUCIÓN, SE DEBE PROYECTAR UN NUDO DE CONEXIÓN APROBADO POR ESSBIO S.A. Y NUEVOSUR S.A. (EN EL CASO QUE EXISTAN ATRAVIESOS SE DEBE CONSIDERAR LLAVE COLLAR)
XIII.— SE DEBE CONSIDERAR DISTANCIA MÍNIMA DESDE LA LÍNEA DE CIERRE HACIA VEREDA 30 CM PARA CAMBIO DE MATERIAL EN ZONA DE ARRANQUE. (VER CUADRO DE PIEZA N°7). ESTA DISTANCIA MÍNIMA NO SE CONSIDERA PARA LOS ARRANQUES CON ATRAVIESOS, LO CUAL SE MANTIENE 80 CM, COMO SE MUESTRA EN DETALLES.
XIV.— TODO CAMBIO DE DIRECCIÓN DEBERÁ CONSIDERAR LAS CORRESPONDIENTES PIEZAS ESPECIALES
XV.— EL NICHO DEL MAP DEBERÁ SER PARALELO A LA LÍNEA DE CIERRE EN SU MAYOR LONGITUD
XVI.— EN EL SECTOR MEDIDOR, LOS DIÁMETROS DE LAS TUBERÍAS UBICADAS ANTES Y DESPUÉS DEL MEDIDOR DEBERÁN SER IGUALES A LO MENOS EN UNA EXTENSIÓN DE 5 DIÁMETROS, O DE ACUERDO A LAS ESPECIFICACIONES DEL FABRICANTE, SEGÚN ARTÍCULO 52° LETRA c.c. DEL REGLAMENTO DE INSTALACIONES DOMICILIARIAS DE AGUA POTABLE Y ALCANTARILLADO.`;

// Abrir modal
function abrirNotasObligatorias() {
    const modal = document.getElementById('modalNotasObligatorias');
    if (!modal) {
        console.error('❌ Modal de notas no encontrado');
        return;
    }
    
    // Generar contenido
    generarContenidoNotas();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Modal Notas Obligatorias abierto');
}

// Cerrar modal
function cerrarNotasObligatorias() {
    const modal = document.getElementById('modalNotasObligatorias');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    console.log('✅ Modal Notas Obligatorias cerrado');
}

// Generar contenido completo
function generarContenidoNotas() {
    const contenedor = document.getElementById('contenidoNotasCompleto');
    if (!contenedor) {
        console.error('❌ Contenedor de notas no encontrado');
        return;
    }
    
    contenedor.textContent = TEXTO_NOTAS_COMPLETO;
    console.log('✅ Notas generadas correctamente');
}

// Exportar notas a texto
function exportarNotasTexto() {
    let texto = "NOTAS OBLIGATORIAS - ESSBIO / NUEVOSUR\n";
    texto += "=".repeat(80) + "\n\n";
    texto += "NOTAS:\n\n";
    texto += TEXTO_NOTAS_COMPLETO;
    texto += "\n\n" + "=".repeat(80) + "\n";
    texto += "Generado por TRUKILLO AGUA POTABLE\n";
    texto += `Fecha: ${new Date().toLocaleDateString('es-CL')}\n`;
    
    // Crear y descargar archivo
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Notas_Obligatorias_ESSBIO_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✅ Notas exportadas correctamente');
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalNotasObligatorias');
        if (modal && modal.classList.contains('active')) {
            cerrarNotasObligatorias();
        }
    }
});

// Cerrar haciendo clic fuera del modal
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalNotasObligatorias');
    if (e.target === modal) {
        cerrarNotasObligatorias();
    }
});

console.log('✅ Sistema Notas Obligatorias cargado correctamente');