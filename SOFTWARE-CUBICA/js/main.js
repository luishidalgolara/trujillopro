// ========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ========================================
const appState = {
    currentTool: null,
    planoLoaded: false,
    vista: '2D',
    escala: '1:100',
    mediciones: [],
    proyecto: {
        nombre: '',
        codigo: ''
    }
};

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ Sistema de Cubicación Iniciado');
    initializeApp();
});

function initializeApp() {
    // Configurar input de archivo
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Configurar canvas
    const canvas = document.getElementById('mainCanvas');
    if (canvas) {
        setupCanvas(canvas);
    }
    
    // Inicializar módulo de hormigón
    setTimeout(() => {
        initHormigonModule();
    }, 100);
    
    updateStatus('✓ Sistema listo para cubicar');
}

// ========================================
// GESTIÓN DE HERRAMIENTAS
// ========================================
function selectTool(toolName) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.btn-tool').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('hormigon-active');
    });
    
    // Desactivar todos los módulos primero
    if (typeof desactivarMuroHormigon === 'function') {
        desactivarMuroHormigon();
    }
    if (typeof desactivarMuroAlbanileria === 'function') {
        desactivarMuroAlbanileria();
    }
    if (typeof desactivarRadier === 'function') {
        desactivarRadier();
    }
    if (typeof desactivarTabique === 'function') {
        desactivarTabique();
    }
    if (typeof desactivarMuroEstructural === 'function') {
        desactivarMuroEstructural();
    }
    if (typeof desactivarCubierta === 'function') {
        desactivarCubierta();
    }
    if (typeof hormigonModule !== 'undefined' && hormigonModule.active) {
        desactivarHormigon();
    }
    
    // Si es muro de hormigón, activar módulo
    if (toolName === 'muro-hormigon') {
        console.log('🧱 Activando muro de hormigón...');
        if (event && event.target) {
            event.target.classList.add('active');
        }
        appState.currentTool = toolName;
        console.log('appState.currentTool =', appState.currentTool);
        if (typeof activarMuroHormigon === 'function') {
            activarMuroHormigon();
        } else {
            console.error('activarMuroHormigon no está definida');
        }
        return;
    }
    
    // Si es muro de albañilería, activar módulo
    if (toolName === 'muro-albanileria') {
        console.log('🧱 Activando muro de albañilería...');
        if (event && event.target) {
            event.target.classList.add('active');
        }
        appState.currentTool = toolName;
        console.log('appState.currentTool =', appState.currentTool);
        if (typeof activarMuroAlbanileria === 'function') {
            activarMuroAlbanileria();
        } else {
            console.error('activarMuroAlbanileria no está definida');
        }
        return;
    }
    
    // Si es tabique, activar módulo
    if (toolName === 'tabique') {
        console.log('📏 Activando tabiquería...');
        if (event && event.target) {
            event.target.classList.add('active');
        }
        appState.currentTool = toolName;
        console.log('appState.currentTool =', appState.currentTool);
        if (typeof activarTabique === 'function') {
            activarTabique();
        } else {
            console.error('activarTabique no está definida');
        }
        return;
    }
    
    // Si es muro estructural, activar módulo
    if (toolName === 'muro-estructural') {
        console.log('🏗️ Activando muro estructural...');
        if (event && event.target) {
            event.target.classList.add('active');
        }
        appState.currentTool = toolName;
        console.log('appState.currentTool =', appState.currentTool);
        if (typeof activarMuroEstructural === 'function') {
            activarMuroEstructural();
        } else {
            console.error('activarMuroEstructural no está definida');
        }
        return;
    }
    
    // Si es radier, activar módulo
    if (toolName === 'radier') {
        console.log('🔲 Activando radier...');
        if (event && event.target) {
            event.target.classList.add('active');
        }
        appState.currentTool = toolName;
        console.log('appState.currentTool =', appState.currentTool);
        if (typeof activarRadier === 'function') {
            activarRadier();
        } else {
            console.error('activarRadier no está definida');
        }
        return;
    }
    
    // Si es cubierta, activar módulo
    if (toolName === 'cubierta') {
        console.log('🏠 Activando cubierta...');
        if (event && event.target) {
            event.target.classList.add('active');
        }
        appState.currentTool = toolName;
        console.log('appState.currentTool =', appState.currentTool);
        if (typeof activarCubierta === 'function') {
            activarCubierta();
        } else {
            console.error('activarCubierta no está definida');
        }
        return;
    }
    
    // Si es la herramienta de hormigón, activar módulo especial
    if (toolName === 'volumen-hormigon') {
        if (event && event.target) {
            event.target.classList.add('active');
            event.target.classList.add('hormigon-active');
        }
        appState.currentTool = toolName;
        activarHormigon();
        return;
    }
    
    // Activar herramienta seleccionada
    if (event && event.target) {
        event.target.classList.add('active');
    }
    appState.currentTool = toolName;
    
    updateStatus(`🔧 Herramienta seleccionada: ${getToolDisplayName(toolName)}`);
    console.log('Herramienta seleccionada:', toolName);
}

function getToolDisplayName(toolName) {
    const toolNames = {
        'muro-hormigon': 'Muro de Hormigón',
        'muro-albanileria': 'Muro de Albañilería',
        'tabique': 'Tabique',
        'muro-estructural': 'Muro Estructural',
        'radier': 'Radier',
        'fundacion': 'Fundación',
        'sobrecimiento': 'Sobrecimiento',
        'estructura-techo': 'Estructura de Techo',
        'cubierta': 'Cubierta',
        'aislacion': 'Aislación',
        'viga': 'Viga',
        'pilar': 'Pilar',
        'marcos': 'Marcos',
        'volumen-hormigon': 'Volumen de Hormigón',
        'enfierradura': 'Enfierradura',
        'moldaje': 'Moldaje'
    };
    return toolNames[toolName] || toolName;
}

// ========================================
// CARGA DE ARCHIVOS
// ========================================
function cargarPlano() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    updateStatus('📁 Cargando plano...');
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const placeholder = document.querySelector('.canvas-placeholder');
        const canvas = document.getElementById('mainCanvas');
        
        if (placeholder) placeholder.style.display = 'none';
        if (canvas) {
            canvas.style.display = 'block';
            loadImageToCanvas(e.target.result, canvas);
        }
        
        // Guardar imagen en el plano activo
        if (window.PlanoManager) {
            const planoActivo = window.PlanoManager.getActivePlano();
            if (planoActivo) {
                planoActivo.setBackgroundImage(e.target.result);
                
                // Limpiar caché de imagen anterior
                if (typeof window.limpiarCacheImagenPlano === 'function') {
                    window.limpiarCacheImagenPlano(planoActivo.id);
                }
                
                console.log(`✅ Imagen guardada en: ${planoActivo.name}`);
            }
        }
        
        appState.planoLoaded = true;
        updateStatus(`✓ Plano cargado: ${file.name}`);
    };
    
    reader.onerror = function() {
        updateStatus('❌ Error al cargar el archivo');
    };
    
    if (file.type === 'application/pdf') {
        updateStatus('⚠️ Carga de PDF pendiente de implementación');
        // TODO: Implementar carga de PDF
    } else {
        reader.readAsDataURL(file);
    }
}

function loadImageToCanvas(imageSrc, canvas) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // NO guardar en window.imagenPlano - cada plano tiene su propia imagen
        
        // Inicializar sistema de zoom/pan
        setTimeout(() => {
            if (typeof initializeZoomPan === 'function') {
                initializeZoomPan();
            }
        }, 100);
        
        // Re-inicializar módulo hormigón después de cargar imagen
        setTimeout(() => {
            if (typeof initHormigonModule === 'function') {
                initHormigonModule();
                console.log('✅ Módulo hormigón reinicializado después de cargar imagen');
            }
        }, 100);
    };
    
    img.src = imageSrc;
}

function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Configuración básica del canvas
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('dblclick', handleCanvasDblclick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
}

function handleCanvasClick(event) {
    // Delegar al módulo de muro-hormigón si está activo
    if (appState.currentTool === 'muro-hormigon' && typeof manejarClickMuroHormigon === 'function') {
        manejarClickMuroHormigon(event);
        return;
    }
    
    // Delegar al módulo de muro-albañilería si está activo
    if (appState.currentTool === 'muro-albanileria' && typeof manejarClickMuroAlbanileria === 'function') {
        manejarClickMuroAlbanileria(event);
        return;
    }
    
    // Delegar al módulo de tabiquería si está activo
    if (appState.currentTool === 'tabique' && typeof manejarClickTabique === 'function') {
        manejarClickTabique(event);
        return;
    }
    
    // Delegar al módulo de muro estructural si está activo
    if (appState.currentTool === 'muro-estructural' && typeof manejarClickMuroEstructural === 'function') {
        manejarClickMuroEstructural(event);
        return;
    }
    
    // Delegar al módulo de radier si está activo
    if (appState.currentTool === 'radier' && typeof manejarClickRadier === 'function') {
        manejarClickRadier(event);
        return;
    }
    
    // Delegar al módulo de cubierta si está activo
    if (appState.currentTool === 'cubierta' && typeof manejarClickCubierta === 'function') {
        manejarClickCubierta(event);
        return;
    }
    
    if (!appState.currentTool) {
        updateStatus('⚠️ Selecciona una herramienta primero');
        return;
    }
    
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    console.log(`Click en: (${x}, ${y}) con herramienta: ${appState.currentTool}`);
    updateStatus(`📍 Punto marcado: (${Math.round(x)}, ${Math.round(y)})`);
}

function handleCanvasDblclick(event) {
    console.log('👆👆 DOBLE CLICK en canvas');
    
    // Intentar abrir modal de hormigón (sin importar appState)
    if (typeof manejarDobleclickMuroHormigon === 'function') {
        manejarDobleclickMuroHormigon(event);
    }
    
    // Intentar abrir modal de albañilería (sin importar appState)
    if (typeof manejarDobleclickMuroAlbanileria === 'function') {
        manejarDobleclickMuroAlbanileria(event);
    }
    
    // Intentar abrir modal de tabiquería (sin importar appState)
    if (typeof manejarDobleclickTabique === 'function') {
        manejarDobleclickTabique(event);
    }
    
    // Intentar abrir modal de muro estructural (sin importar appState)
    if (typeof manejarDobleclickMuroEstructural === 'function') {
        manejarDobleclickMuroEstructural(event);
    }
    
    // Intentar abrir modal de radier (sin importar appState)
    if (typeof manejarDobleclickRadier === 'function') {
        manejarDobleclickRadier(event);
    }
    
    // Intentar abrir modal de cubierta (sin importar appState)
    if (typeof manejarDobleclickCubierta === 'function') {
        manejarDobleclickCubierta(event);
    }
}

function handleCanvasMouseMove(event) {
    // Delegar al módulo de muro-hormigón si está activo
    if (appState.currentTool === 'muro-hormigon' && typeof manejarMovimientoMuroHormigon === 'function') {
        manejarMovimientoMuroHormigon(event);
    }
    
    // Delegar al módulo de muro-albañilería si está activo
    if (appState.currentTool === 'muro-albanileria' && typeof manejarMovimientoMuroAlbanileria === 'function') {
        manejarMovimientoMuroAlbanileria(event);
    }
    
    // Delegar al módulo de tabiquería si está activo
    if (appState.currentTool === 'tabique' && typeof manejarMovimientoTabique === 'function') {
        manejarMovimientoTabique(event);
    }
    
    // Delegar al módulo de muro estructural si está activo
    if (appState.currentTool === 'muro-estructural' && typeof manejarMovimientoMuroEstructural === 'function') {
        manejarMovimientoMuroEstructural(event);
    }
    
    // Delegar al módulo de radier si está activo
    if (appState.currentTool === 'radier' && typeof manejarMovimientoRadier === 'function') {
        manejarMovimientoRadier(event);
    }
    
    // Delegar al módulo de cubierta si está activo
    if (appState.currentTool === 'cubierta' && typeof manejarMovimientoCubierta === 'function') {
        manejarMovimientoCubierta(event);
    }
    
    const rect = event.target.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    
    const coordElement = document.getElementById('coordenadas');
    if (coordElement) {
        coordElement.textContent = `X: ${x}px | Y: ${y}px`;
    }
}

// ========================================
// ACCIONES DE MEDICIÓN
// ========================================
function medirDistancia() {
    selectToolByName('medicion-distancia');
    updateStatus('📏 Modo: Medir distancia - Click en dos puntos');
}

function calcularArea() {
    selectToolByName('calculo-area');
    updateStatus('📐 Modo: Calcular área - Dibuja el perímetro');
}

function calcularVolumen() {
    selectToolByName('calculo-volumen');
    updateStatus('📦 Modo: Calcular volumen - Define área y altura');
}

function selectToolByName(toolName) {
    appState.currentTool = toolName;
}

// ========================================
// GESTIÓN DE MODALES
// ========================================
function abrirCubicacion() {
    abrirInformeCubicacion();
}

function abrirPresupuesto() {
    updateStatus('💰 Módulo de presupuesto en desarrollo');
}

function abrirEspecificaciones() {
    updateStatus('📋 Módulo de especificaciones en desarrollo');
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// ========================================
// EXPORTACIÓN
// ========================================
function exportarResultados() {
    if (!appState.planoLoaded) {
        updateStatus('⚠️ Carga un plano primero');
        return;
    }
    updateStatus('💾 Exportando resultados...');
    setTimeout(() => {
        updateStatus('✓ Exportación completada (simulada)');
    }, 1000);
}

function exportarCubicacion() {
    updateStatus('📥 Exportando cuadro de cubicación...');
    setTimeout(() => {
        updateStatus('✓ Excel exportado (simulado)');
        cerrarModal('modalCubicacion');
    }, 1000);
}

// ========================================
// ACCIONES GENERALES
// ========================================
function toggleVista() {
    const btn = event.target;
    if (appState.vista === '2D') {
        appState.vista = '3D';
        btn.textContent = '👁️ Vista 3D';
    } else {
        appState.vista = '2D';
        btn.textContent = '👁️ Vista 2D';
    }
    updateStatus(`Vista cambiada a: ${appState.vista}`);
}

function limpiarTodo() {
    if (confirm('¿Seguro que deseas limpiar todo?')) {
        const canvas = document.getElementById('mainCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Redibujar imagen del plano activo si existe
        if (window.PlanoManager) {
            const planoActivo = window.PlanoManager.getActivePlano();
            if (planoActivo && planoActivo.backgroundImage) {
                const img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = planoActivo.backgroundImage;
            }
        }
        
        appState.mediciones = [];
        appState.currentTool = null;
        
        // Limpiar módulo hormigón
        if (typeof limpiarHormigon === 'function') {
            hormigonModule.points = [];
            hormigonModule.polygons = [];
            hormigonModule.isDrawing = false;
            clearOverlay();
        }
        
        // Limpiar muros de hormigón
        if (typeof limpiarMurosHormigon === 'function') {
            limpiarMurosHormigon();
        }
        
        // Limpiar muros de albañilería
        if (typeof limpiarMurosAlbanileria === 'function') {
            limpiarMurosAlbanileria();
        }
        
        // Limpiar tabiquería
        if (typeof limpiarTabiques === 'function') {
            limpiarTabiques();
        }
        
        // Limpiar muros estructurales
        if (typeof limpiarMurosEstructurales === 'function') {
            limpiarMurosEstructurales();
        }
        
        // Limpiar radieres
        if (typeof limpiarRadieres === 'function') {
            limpiarRadieres();
        }
        
        // Limpiar cubiertas
        if (typeof limpiarCubiertas === 'function') {
            limpiarCubiertas();
        }
        
        updateStatus('🗑️ Todo limpiado');
    }
}

// ========================================
// UTILIDADES
// ========================================
function updateStatus(message) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = message;
    }
    console.log('Status:', message);
}

// ========================================
// ATAJOS DE TECLADO
// ========================================
document.addEventListener('keydown', function(event) {
    // Delegar ENTER al módulo de muro-hormigón si está activo
    if (event.key === 'Enter' && appState.currentTool === 'muro-hormigon') {
        console.log('ENTER detectado con muro-hormigon activo');
        if (typeof manejarEnterMuroHormigon === 'function') {
            console.log('Llamando a manejarEnterMuroHormigon');
            manejarEnterMuroHormigon(event);
        } else {
            console.error('manejarEnterMuroHormigon no está definida');
        }
        return;
    }
    
    // Delegar ENTER al módulo de muro-albañilería si está activo
    if (event.key === 'Enter' && appState.currentTool === 'muro-albanileria') {
        console.log('ENTER detectado con muro-albanileria activo');
        if (typeof manejarEnterMuroAlbanileria === 'function') {
            console.log('Llamando a manejarEnterMuroAlbanileria');
            manejarEnterMuroAlbanileria(event);
        } else {
            console.error('manejarEnterMuroAlbanileria no está definida');
        }
        return;
    }
    
    // Delegar ENTER al módulo de tabiquería si está activo
    if (event.key === 'Enter' && appState.currentTool === 'tabique') {
        console.log('ENTER detectado con tabique activo');
        if (typeof manejarEnterTabique === 'function') {
            console.log('Llamando a manejarEnterTabique');
            manejarEnterTabique(event);
        } else {
            console.error('manejarEnterTabique no está definida');
        }
        return;
    }
    
    // Delegar ENTER al módulo de muro estructural si está activo
    if (event.key === 'Enter' && appState.currentTool === 'muro-estructural') {
        console.log('ENTER detectado con muro-estructural activo');
        if (typeof manejarEnterMuroEstructural === 'function') {
            console.log('Llamando a manejarEnterMuroEstructural');
            manejarEnterMuroEstructural(event);
        } else {
            console.error('manejarEnterMuroEstructural no está definida');
        }
        return;
    }
    
    // Delegar ENTER al módulo de radier si está activo
    if (event.key === 'Enter' && appState.currentTool === 'radier') {
        console.log('ENTER detectado con radier activo');
        if (typeof manejarEnterRadier === 'function') {
            console.log('Llamando a manejarEnterRadier');
            manejarEnterRadier(event);
        } else {
            console.error('manejarEnterRadier no está definida');
        }
        return;
    }
    
    // Delegar ENTER al módulo de cubierta si está activo
    if (event.key === 'Enter' && appState.currentTool === 'cubierta') {
        console.log('ENTER detectado con cubierta activo');
        if (typeof manejarEnterCubierta === 'function') {
            console.log('Llamando a manejarEnterCubierta');
            manejarEnterCubierta(event);
        } else {
            console.error('manejarEnterCubierta no está definida');
        }
        return;
    }
    
    // Escape - Cancelar polilínea actual o desactivar herramienta
    if (event.key === 'Escape') {
        // CRÍTICO: NO cancelar si hay un modal de radier abierto
        if (window._radierModalAbierto) {
            console.log('⚠️ Modal de radier abierto, ignorando Escape');
            return;
        }
        
        // Para muro de hormigón
        if (appState.currentTool === 'muro-hormigon' && typeof cancelarPolilineaActual === 'function') {
            const seCancel = cancelarPolilineaActual();
            // Si no había polilínea en curso, desactivar la herramienta
            if (!seCancel && typeof desactivarMuroHormigon === 'function') {
                desactivarMuroHormigon();
                appState.currentTool = null;
                document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
                updateStatus('✓ Herramienta desactivada');
            }
        }
        
        // Para muro de albañilería
        if (appState.currentTool === 'muro-albanileria' && typeof cancelarPolilineaAlbanileria === 'function') {
            const seCancel = cancelarPolilineaAlbanileria();
            // Si no había polilínea en curso, desactivar la herramienta
            if (!seCancel && typeof desactivarMuroAlbanileria === 'function') {
                desactivarMuroAlbanileria();
                appState.currentTool = null;
                document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
                updateStatus('✓ Herramienta desactivada');
            }
        }
        
        // Para tabiquería
        if (appState.currentTool === 'tabique' && typeof cancelarPolilineaTabique === 'function') {
            const seCancel = cancelarPolilineaTabique();
            // Si no había polilínea en curso, desactivar la herramienta
            if (!seCancel && typeof desactivarTabique === 'function') {
                desactivarTabique();
                appState.currentTool = null;
                document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
                updateStatus('✓ Herramienta desactivada');
            }
        }
        
        // Para muro estructural
        if (appState.currentTool === 'muro-estructural' && typeof cancelarPolilineaEstructural === 'function') {
            const seCancel = cancelarPolilineaEstructural();
            // Si no había polilínea en curso, desactivar la herramienta
            if (!seCancel && typeof desactivarMuroEstructural === 'function') {
                desactivarMuroEstructural();
                appState.currentTool = null;
                document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
                updateStatus('✓ Herramienta desactivada');
            }
        }
        
        // Para radier
        if (appState.currentTool === 'radier' && typeof cancelarPoligonoRadier === 'function') {
            const seCancel = cancelarPoligonoRadier();
            // Si no había polígono en curso, desactivar la herramienta
            if (!seCancel && typeof desactivarRadier === 'function') {
                desactivarRadier();
                appState.currentTool = null;
                document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
                updateStatus('✓ Herramienta desactivada');
            }
        }
        
        // Para cubierta
        if (appState.currentTool === 'cubierta' && typeof cancelarPoligonoCubierta === 'function') {
            const seCancel = cancelarPoligonoCubierta();
            // Si no había polígono en curso, desactivar la herramienta
            if (!seCancel && typeof desactivarCubierta === 'function') {
                desactivarCubierta();
                appState.currentTool = null;
                document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
                updateStatus('✓ Herramienta desactivada');
            }
        }
        
        // Cerrar modales
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        return;
    }
    
    // M - Medir
    if (event.key === 'm' || event.key === 'M') {
        medirDistancia();
    }
    // A - Área
    if (event.key === 'a' || event.key === 'A') {
        calcularArea();
    }
    // V - Volumen
    if (event.key === 'v' || event.key === 'V') {
        calcularVolumen();
    }
    // Delete - Limpiar
    if (event.key === 'Delete') {
        limpiarTodo();
    }
});

console.log('✅ Sistema de Cubicación cargado correctamente');
