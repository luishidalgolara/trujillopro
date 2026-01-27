/**
 * ================================================
 * HANDLER PARA PROYECTOS RELACIONADOS
 * ================================================
 * Gestiona la apertura de proyectos eléctricos y agua potable
 * desde el proyecto de alcantarillado
 */

// ========================================
// FUNCIÓN PROYECTO ELÉCTRICO
// ========================================
function abrirProyectoElectrico() {
    console.log('🔌 Abriendo Proyecto Eléctrico...');
    
    // Confirmación al usuario
    const confirmar = confirm(
        '⚡ PROYECTO ELÉCTRICO DOMICILIARIO\n\n' +
        '¿Deseas abrir el editor de planos eléctricos?\n\n' +
        'Se abrirá en una nueva pestaña con todas las herramientas\n' +
        'para diseño de instalaciones eléctricas domiciliarias.\n\n' +
        '✓ Trazado automático de conductores\n' +
        '✓ Cálculo de cargas\n' +
        '✓ Generación de circuitos\n' +
        '✓ Tableros y cuadros de carga\n' +
        '✓ Cumplimiento NCH Elec. 4/2003'
    );
    
    if (confirmar) {
        try {
            // Ruta al proyecto eléctrico (ajusta según tu estructura)
            // Si está en la misma carpeta padre, usa:
            const rutaProyectoElectrico = '../eléctrico-domiciliario/index-electrico.html';
            
            // Abrir en nueva pestaña
            const ventana = window.open(rutaProyectoElectrico, '_blank');
            
            if (ventana) {
                // Actualizar status bar (si existe)
                actualizarStatus('⚡ Abriendo Proyecto Eléctrico...', '#f39c12', 3000);
                
                console.log('✅ Proyecto Eléctrico abierto correctamente');
            } else {
                // Si el navegador bloqueó la ventana emergente
                alert(
                    '⚠️ VENTANA BLOQUEADA\n\n' +
                    'Tu navegador bloqueó la ventana emergente.\n' +
                    'Por favor, permite ventanas emergentes para este sitio.'
                );
            }
            
        } catch (error) {
            console.error('❌ Error al abrir proyecto eléctrico:', error);
            alert(
                '❌ ERROR\n\n' +
                'No se pudo abrir el proyecto eléctrico.\n' +
                'Verifica que el archivo exista en la ruta correcta.'
            );
        }
    } else {
        console.log('❌ Usuario canceló apertura de proyecto eléctrico');
    }
}

// ========================================
// FUNCIÓN PROYECTO AGUA POTABLE
// ========================================
function abrirProyectoAguaPotable() {
    console.log('💧 Abriendo Proyecto Agua Potable...');
    
    // Confirmación al usuario
    const confirmar = confirm(
        '💧 PROYECTO AGUA POTABLE\n\n' +
        '¿Deseas abrir el editor de planos de agua potable?\n\n' +
        'Se abrirá en una nueva pestaña con todas las herramientas\n' +
        'para diseño de instalaciones de agua potable.\n\n' +
        '✓ Trazado de tuberías\n' +
        '✓ Cálculo de caudales\n' +
        '✓ Dimensionamiento\n' +
        '✓ Artefactos sanitarios\n' +
        '✓ Cumplimiento normativa NCh'
    );
    
    if (confirmar) {
        try {
            // Ruta al proyecto agua potable (ajusta según tu estructura)
            // Si está en la misma carpeta padre, usa:
            const rutaProyectoAguaPotable = '../agua-potable/index-agua-potable.html';
            
            // Abrir en nueva pestaña
            const ventana = window.open(rutaProyectoAguaPotable, '_blank');
            
            if (ventana) {
                // Actualizar status bar (si existe)
                actualizarStatus('💧 Abriendo Proyecto Agua Potable...', '#3498db', 3000);
                
                console.log('✅ Proyecto Agua Potable abierto correctamente');
            } else {
                // Si el navegador bloqueó la ventana emergente
                alert(
                    '⚠️ VENTANA BLOQUEADA\n\n' +
                    'Tu navegador bloqueó la ventana emergente.\n' +
                    'Por favor, permite ventanas emergentes para este sitio.'
                );
            }
            
        } catch (error) {
            console.error('❌ Error al abrir proyecto agua potable:', error);
            alert(
                '❌ ERROR\n\n' +
                'No se pudo abrir el proyecto de agua potable.\n' +
                'Verifica que el archivo exista en la ruta correcta.'
            );
        }
    } else {
        console.log('❌ Usuario canceló apertura de proyecto agua potable');
    }
}

// ========================================
// FUNCIÓN AUXILIAR - ACTUALIZAR STATUS BAR
// ========================================
function actualizarStatus(mensaje, color = '#27ae60', duracion = 3000) {
    const statusBar = document.getElementById('statusBar');
    
    if (statusBar) {
        statusBar.textContent = mensaje;
        statusBar.style.background = color;
        statusBar.style.color = '#fff';
        statusBar.style.padding = '10px';
        statusBar.style.fontWeight = 'bold';
        
        // Restaurar después del tiempo indicado
        setTimeout(() => {
            statusBar.textContent = '';
            statusBar.style.background = '';
            statusBar.style.color = '';
            statusBar.style.padding = '';
            statusBar.style.fontWeight = '';
        }, duracion);
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Handler de Proyectos Relacionados cargado correctamente');
    
    // Verificar que los botones existan
    const btnElectrico = document.getElementById('electricoBtn');
    const btnAguaPotable = document.getElementById('aguaPotableBtn');
    
    if (btnElectrico) {
        console.log('✅ Botón Proyecto Eléctrico encontrado');
    } else {
        console.warn('⚠️ Botón Proyecto Eléctrico no encontrado');
    }
    
    if (btnAguaPotable) {
        console.log('✅ Botón Proyecto Agua Potable encontrado');
    } else {
        console.warn('⚠️ Botón Proyecto Agua Potable no encontrado');
    }
});

console.log('📦 Módulo de Proyectos Relacionados inicializado');