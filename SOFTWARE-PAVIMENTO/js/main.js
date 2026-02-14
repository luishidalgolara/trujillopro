// Archivo principal - Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛣️ Iniciando Software Educativo de Pavimentos de Chile...');
    
    // Inicializar controlador de UI
    uiController = new UIController();
    
    // Inicializar visor 3D
    try {
        viewer3D = new Viewer3D('viewer3d');
        console.log('✅ Visor 3D inicializado correctamente');
        
        // Cargar pavimento inicial (flexible)
        viewer3D.cargarPavimento('flexible');
        console.log('✅ Pavimento flexible cargado');
        
        // Actualizar panel de información
        uiController.actualizarInfoPanel('flexible');
        uiController.actualizarCheckboxesCapas('flexible');
        console.log('✅ Panel de información actualizado');
        
        // Ocultar loading
        setTimeout(() => {
            uiController.ocultarLoading();
            console.log('✅ Aplicación lista para usar');
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error al inicializar el visor 3D:', error);
        mostrarError();
    }
    
    // Mensaje de bienvenida en consola
    mostrarMensajeBienvenida();
});

// Función para mostrar error si falla la inicialización
function mostrarError() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Error al cargar el visor 3D</h3>
                <p>Por favor, recarga la página o intenta con otro navegador.</p>
                <p>Este software requiere un navegador moderno con soporte para WebGL.</p>
                <button onclick="location.reload()" class="reload-btn">Recargar Página</button>
            </div>
        `;
    }
}

// Mensaje de bienvenida para desarrolladores/profesores
function mostrarMensajeBienvenida() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🛣️  SOFTWARE EDUCATIVO DE PAVIMENTOS DE CHILE  🇨🇱     ║
║                                                           ║
║   Versión: 1.0                                           ║
║   Desarrollado para: Educación en Ingeniería Civil      ║
║                                                           ║
║   Características:                                       ║
║   ✓ Visualización 3D interactiva                        ║
║   ✓ 3 tipos de pavimentos (Flexible, Rígido, Semi)     ║
║   ✓ Información técnica completa                        ║
║   ✓ Datos específicos de Chile                          ║
║   ✓ Normas chilenas aplicables                          ║
║                                                           ║
║   Controles:                                             ║
║   • Click + Arrastrar: Rotar vista                      ║
║   • Scroll: Zoom                                         ║
║   • Click en capas: Ver información                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
    
    console.log('💡 Tip: Haz click en "Explotar Capas" para ver cada capa separada');
    console.log('📚 Información basada en Manual de Carreteras MOP Chile y normas NCh');
}

// Información adicional para modo debug
window.appInfo = {
    version: '1.0.0',
    autor: 'Sistema Educativo',
    fecha: '2026',
    proposito: 'Enseñanza de tipos de pavimentación en Chile',
    tecnologias: ['Three.js', 'HTML5', 'CSS3', 'JavaScript ES6'],
    datos: pavimentosData,
    
    // Función de ayuda
    ayuda: function() {
        console.log(`
Funciones disponibles en consola:

• appInfo.version - Ver versión
• appInfo.datos - Ver base de datos completa
• viewer3D - Acceder al visor 3D
• uiController - Acceder al controlador de UI
• viewer3D.cargarPavimento('flexible'|'rigido'|'semirigido') - Cambiar pavimento
• viewer3D.explotar() - Explotar/contraer capas
• viewer3D.toggleRotacion() - Activar/desactivar rotación automática
• viewer3D.resetVista() - Resetear cámara
        `);
    },
    
    // Función para exportar datos
    exportarDatos: function() {
        const dataStr = JSON.stringify(pavimentosData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'pavimentos-chile-data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        console.log('✅ Datos exportados a JSON');
    }
};

// Atajos de teclado útiles
document.addEventListener('keydown', (e) => {
    // E - Explotar
    if (e.key === 'e' || e.key === 'E') {
        document.getElementById('btn-explotar').click();
    }
    
    // R - Rotar
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('btn-rotar').click();
    }
    
    // Espacio - Reset
    if (e.key === ' ') {
        e.preventDefault();
        document.getElementById('btn-reset').click();
    }
    
    // 1, 2, 3 - Cambiar tipo
    if (e.key === '1') {
        document.querySelector('[data-tipo="flexible"]').click();
    }
    if (e.key === '2') {
        document.querySelector('[data-tipo="rigido"]').click();
    }
    if (e.key === '3') {
        document.querySelector('[data-tipo="semirigido"]').click();
    }
});

// Prevenir zoom con Ctrl+Scroll en el visor
document.getElementById('viewer3d').addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

console.log('⌨️ Atajos de teclado: E=Explotar | R=Rotar | Espacio=Reset | 1,2,3=Cambiar tipo');
