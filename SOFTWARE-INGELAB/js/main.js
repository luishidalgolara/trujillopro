// Archivo principal - Inicialización del sistema

// Estado global de la aplicación
const AppState = {
    initialized: false,
    currentLevel: 1,
    isLoading: true
};

// ✨ Variables globales para sistemas
let educationalManager = null;

// Inicializar aplicación
async function initApp() {
    console.log('🚀 Iniciando Sistema Educativo 3D...');
    
    try {
        // Verificar soporte de WebGL
        if (!checkWebGLSupport()) {
            showError('Tu navegador no soporta WebGL. Por favor, actualiza tu navegador.');
            return;
        }
        
        // Mostrar loading
        showLoading();
        
        // Inicializar escena 3D
        initScene();
        
        // Inicializar controles
        initControls();
        
        // ✨ Inicializar sistema educativo
        initEducationalSystem();
        
        // ✨ Inicializar sistema de instalaciones (panel informativo)
        initInstallationsPanel();
        
        // Inicializar shortcuts de teclado
        initKeyboardShortcuts();
        
        // Inicializar efectos de UI
        initUIEffects();
        
        // Construir edificio inicial (1 nivel)
        buildBuilding(1);
        
        // 🆕 Generar sistema de tuberías (si está disponible)
        if (typeof plumbingGenerator !== 'undefined') {
            const plumbingSystem = plumbingGenerator.generateCompletePlumbing(1);
            scene.add(plumbingSystem);
            console.log('✅ Sistema de tuberías agregado a la escena');
        }
        
        // Actualizar lista de componentes
        updateComponentsList();
        
        // Actualizar estadísticas
        updateBuildingStats(1);
        
        // Ocultar loading
        setTimeout(() => {
            hideLoading();
            animateEntry();
        }, 1000);
        
        AppState.initialized = true;
        AppState.isLoading = false;
        
        console.log('✅ Sistema inicializado correctamente');
        console.log('💡 Escribe "help" en la consola para ver los atajos de teclado');
        console.log('💡 Escribe "credits" para ver los créditos');
        console.log('💡 Escribe "stats" para ver estadísticas de rendimiento');
        
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
        showError('Ocurrió un error al inicializar el sistema. Por favor, recarga la página.');
        hideLoading();
    }
}

// ✨ Inicializar Sistema Educativo
function initEducationalSystem() {
    try {
        // Verificar que las clases del sistema educativo estén disponibles
        if (typeof EducationalManager === 'undefined') {
            console.warn('⚠️ Sistema educativo no disponible - archivos no cargados');
            return;
        }
        
        // Verificar que scene, camera y renderer estén disponibles
        if (typeof scene === 'undefined' || typeof camera === 'undefined' || typeof renderer === 'undefined') {
            console.warn('⚠️ Scene, camera o renderer no están disponibles aún');
            return;
        }
        
        // Crear instancia del manager educativo
        educationalManager = new EducationalManager(scene, camera, renderer);
        
        // Hacer accesible globalmente
        window.educationalManager = educationalManager;
        
        // Configurar el botón de toggle
        setupEducationalButton();
        
        // Sincronizar con controles de cámara si existen
        if (typeof controls !== 'undefined' && controls) {
            setupEducationalCameraSync();
        }
        
        console.log('✅ Sistema educativo inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar sistema educativo:', error);
    }
}

// ✨ NUEVO: Inicializar panel de instalaciones
function initInstallationsPanel() {
    try {
        // Verificar que las clases estén disponibles
        if (typeof InstallationsManager === 'undefined') {
            console.warn('⚠️ InstallationsManager no disponible - archivos no cargados');
            return;
        }
        
        if (typeof INSTALLATIONS_CONTENT === 'undefined') {
            console.warn('⚠️ INSTALLATIONS_CONTENT no disponible - config.js no cargado');
            return;
        }
        
        // Crear instancia del manager
        const installationsManager = new InstallationsManager();
        
        // Hacer accesible globalmente para debugging
        window.installationsManager = installationsManager;
        
        console.log('✅ Panel de instalaciones inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar panel de instalaciones:', error);
    }
}

// ✨ NUEVO: Sincronizar sistema educativo con controles de cámara
function setupEducationalButton() {
    const btn = document.getElementById('educationalBtn');
    
    if (!btn) {
        console.warn('⚠️ Botón educativo no encontrado en el DOM');
        return;
    }
    
    btn.addEventListener('click', () => {
        if (!educationalManager) {
            console.warn('⚠️ Sistema educativo no está inicializado');
            return;
        }
        
        const isVisible = educationalManager.toggleMarkers();
        
        // Actualizar estado visual del botón
        if (isVisible) {
            btn.classList.add('educational-active');
            console.log('👁️ Marcadores educativos visibles');
        } else {
            btn.classList.remove('educational-active');
            educationalManager.closeInfoPanel();
            console.log('🚫 Marcadores educativos ocultos');
        }
    });
    
    console.log('✅ Botón educativo configurado');
}

// ✨ Sincronizar sistema educativo con controles de cámara
function setupEducationalCameraSync() {
    if (!controls || !educationalManager) return;
    
    // Verificar que controls tenga addEventListener
    if (typeof controls.addEventListener !== 'function') {
        console.log('⚠️ Controls no soporta addEventListener, saltando sincronización');
        return;
    }
    
    try {
        // Notificar cuando empieza el arrastre
        controls.addEventListener('start', () => {
            if (educationalManager) {
                educationalManager.setDragging(true);
            }
        });
        
        // Notificar cuando termina el arrastre
        controls.addEventListener('end', () => {
            if (educationalManager) {
                educationalManager.setDragging(false);
            }
        });
        
        console.log('✅ Sistema educativo sincronizado con controles de cámara');
    } catch (error) {
        console.log('⚠️ No se pudo sincronizar con controles:', error.message);
    }
}

// ✨ Registrar componentes educativos después de construir edificio
function registerEducationalComponents(levels) {
    if (!educationalManager) return;
    
    console.log('📝 Registrando componentes educativos...');
    
    try {
        // 1. Registrar Fundación
        educationalManager.registerComponent(
            'fundacion_principal',
            'fundacion',
            new THREE.Vector3(0, 0.3, 0)
        );
        
        // 2. Registrar Columnas (4 esquinas)
        const columnPositions = [
            { x: -4, y: 1.5, z: -4 },
            { x: 4, y: 1.5, z: -4 },
            { x: -4, y: 1.5, z: 4 },
            { x: 4, y: 1.5, z: 4 }
        ];
        
        columnPositions.forEach((pos, i) => {
            educationalManager.registerComponent(
                `columna_${i}`,
                'columna',
                new THREE.Vector3(pos.x, pos.y, pos.z)
            );
        });
        
        // 3. Registrar Vigas por nivel
        for (let i = 0; i < levels; i++) {
            educationalManager.registerComponent(
                `viga_nivel${i + 1}`,
                'viga',
                new THREE.Vector3(0, 3 + (i * 3), -4)
            );
        }
        
        // 4. Registrar Losas por nivel
        for (let i = 0; i < levels; i++) {
            educationalManager.registerComponent(
                `losa_nivel${i + 1}`,
                'losa',
                new THREE.Vector3(0, 3 + (i * 3), 0)
            );
        }
        
        // 5. Registrar Fierros (si el sistema está visible)
        if (typeof reinforcementManager !== 'undefined' && reinforcementManager) {
            educationalManager.registerComponent(
                'fierro_estructura',
                'fierro',
                new THREE.Vector3(0, 0.5, 0)
            );
        }
        
        // 6. Registrar Tuberías (si el sistema está visible)
        if (typeof plumbingGenerator !== 'undefined') {
            educationalManager.registerComponent(
                'tuberia_alcantarillado',
                'tuberia',
                new THREE.Vector3(0, -0.3, 0)
            );
        }
        
        const stats = educationalManager.getStats();
        console.log(`✅ ${stats.totalComponents} componentes educativos registrados`);
        
    } catch (error) {
        console.error('❌ Error al registrar componentes educativos:', error);
    }
}

// ✨ MODIFICACIÓN: Extender buildBuilding para incluir registro educativo
const originalBuildBuilding = window.buildBuilding || function() {};
window.buildBuilding = function(levels) {
    // Llamar a la función original
    if (typeof originalBuildBuilding === 'function') {
        originalBuildBuilding(levels);
    }
    
    // Resetear sistema educativo antes de registrar nuevos componentes
    if (educationalManager) {
        educationalManager.reset();
    }
    
    // Registrar componentes educativos del nuevo edificio
    setTimeout(() => {
        registerEducationalComponents(levels);
    }, 100);
};

// Verificar soporte de WebGL
function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
                 (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

// Mostrar error
function showError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #e74c3c;
        color: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        max-width: 500px;
    `;
    
    errorContainer.innerHTML = `
        <h3 style="margin-bottom: 1rem;">⚠️ Error</h3>
        <p style="line-height: 1.6;">${message}</p>
        <button onclick="location.reload()" style="
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: white;
            color: #e74c3c;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
        ">Recargar Página</button>
    `;
    
    document.body.appendChild(errorContainer);
}

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
    if (!AppState.initialized) {
        showError('Ocurrió un error inesperado. Por favor, recarga la página.');
    }
});

// Prevenir errores de Three.js sin OrbitControls integrado
// Implementar OrbitControls básico
THREE.OrbitControls = function(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    
    // Propiedades
    this.enabled = true;
    this.target = new THREE.Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.zoomSpeed = 1.0;
    this.enableRotate = true;
    this.rotateSpeed = 1.0;
    this.enablePan = true;
    this.panSpeed = 1.0;
    this.screenSpacePanning = true;
    
    // Estado interno
    const scope = this;
    const spherical = new THREE.Spherical();
    const sphericalDelta = new THREE.Spherical();
    let scale = 1;
    const panOffset = new THREE.Vector3();
    let zoomChanged = false;
    
    const rotateStart = new THREE.Vector2();
    const rotateEnd = new THREE.Vector2();
    const rotateDelta = new THREE.Vector2();
    
    const panStart = new THREE.Vector2();
    const panEnd = new THREE.Vector2();
    const panDelta = new THREE.Vector2();
    
    const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 };
    let state = STATE.NONE;
    
    // Eventos de mouse
    function onMouseDown(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
        
        if (event.button === 0) {
            state = STATE.ROTATE;
            rotateStart.set(event.clientX, event.clientY);
        } else if (event.button === 2) {
            state = STATE.PAN;
            panStart.set(event.clientX, event.clientY);
        }
        
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);
    }
    
    function onMouseMove(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
        
        if (state === STATE.ROTATE) {
            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            
            const element = scope.domElement;
            sphericalDelta.theta -= 2 * Math.PI * rotateDelta.x / element.clientHeight;
            sphericalDelta.phi -= 2 * Math.PI * rotateDelta.y / element.clientHeight;
            
            rotateStart.copy(rotateEnd);
        } else if (state === STATE.PAN) {
            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
        }
    }
    
    function onMouseUp() {
        if (scope.enabled === false) return;
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
        state = STATE.NONE;
    }
    
    function onMouseWheel(event) {
        if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE) return;
        event.preventDefault();
        
        if (event.deltaY < 0) {
            scale /= Math.pow(0.95, scope.zoomSpeed);
        } else if (event.deltaY > 0) {
            scale *= Math.pow(0.95, scope.zoomSpeed);
        }
        
        zoomChanged = true;
    }
    
    function pan(deltaX, deltaY) {
        const offset = new THREE.Vector3();
        const element = scope.domElement;
        
        offset.copy(scope.camera.position).sub(scope.target);
        let targetDistance = offset.length();
        targetDistance *= Math.tan((scope.camera.fov / 2) * Math.PI / 180.0);
        
        const panLeft = new THREE.Vector3();
        panLeft.setFromMatrixColumn(scope.camera.matrix, 0);
        panLeft.multiplyScalar(-2 * deltaX * targetDistance / element.clientHeight);
        
        const panUp = new THREE.Vector3();
        panUp.setFromMatrixColumn(scope.camera.matrix, 1);
        panUp.multiplyScalar(2 * deltaY * targetDistance / element.clientHeight);
        
        panOffset.add(panLeft).add(panUp);
    }
    
    this.update = function() {
        const offset = new THREE.Vector3();
        const quat = new THREE.Quaternion().setFromUnitVectors(camera.up, new THREE.Vector3(0, 1, 0));
        const quatInverse = quat.clone().invert();
        
        const lastPosition = new THREE.Vector3();
        const lastQuaternion = new THREE.Quaternion();
        
        return function update() {
            const position = scope.camera.position;
            offset.copy(position).sub(scope.target);
            offset.applyQuaternion(quat);
            
            spherical.setFromVector3(offset);
            
            spherical.theta += sphericalDelta.theta;
            spherical.phi += sphericalDelta.phi;
            
            spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
            spherical.makeSafe();
            spherical.radius *= scale;
            spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));
            
            scope.target.add(panOffset);
            
            offset.setFromSpherical(spherical);
            offset.applyQuaternion(quatInverse);
            position.copy(scope.target).add(offset);
            scope.camera.lookAt(scope.target);
            
            if (scope.enableDamping === true) {
                sphericalDelta.theta *= (1 - scope.dampingFactor);
                sphericalDelta.phi *= (1 - scope.dampingFactor);
                panOffset.multiplyScalar(1 - scope.dampingFactor);
            } else {
                sphericalDelta.set(0, 0, 0);
                panOffset.set(0, 0, 0);
            }
            
            scale = 1;
            
            if (zoomChanged ||
                lastPosition.distanceToSquared(scope.camera.position) > 0.000001 ||
                8 * (1 - lastQuaternion.dot(scope.camera.quaternion)) > 0.000001) {
                
                lastPosition.copy(scope.camera.position);
                lastQuaternion.copy(scope.camera.quaternion);
                zoomChanged = false;
                
                return true;
            }
            
            return false;
        };
    }();
    
    this.dispose = function() {
        scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
        scope.domElement.removeEventListener('mousedown', onMouseDown, false);
        scope.domElement.removeEventListener('wheel', onMouseWheel, false);
    };
    
    function onContextMenu(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
    }
    
    this.domElement.addEventListener('contextmenu', onContextMenu, false);
    this.domElement.addEventListener('mousedown', onMouseDown, false);
    this.domElement.addEventListener('wheel', onMouseWheel, false);
    
    this.update();
};

// ✨ Extender el loop de animación para actualizar sistemas
const originalAnimate = window.animate || function() {};
window.animate = function() {
    // Llamar a la función original de animación
    if (typeof originalAnimate === 'function') {
        originalAnimate();
    }
    
    // Actualizar sistema educativo si existe
    if (educationalManager && typeof clock !== 'undefined') {
        const delta = clock.getDelta();
        educationalManager.update(delta);
    }
};

// ✨ Función de debugging para el sistema educativo
window.debugEducational = function() {
    if (!educationalManager) {
        console.log('❌ Sistema educativo no inicializado');
        return;
    }
    
    console.log('%c📊 ESTADO DEL SISTEMA EDUCATIVO', 'color: #4CAF50; font-size: 16px; font-weight: bold');
    console.log(educationalManager.getStats());
    console.log('\n%c📝 COMPONENTES REGISTRADOS', 'color: #2196F3; font-size: 14px; font-weight: bold');
    console.table(educationalManager.exportComponentsInfo());
};

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Exportar estado para debugging
window.AppState = AppState;

console.log('✅ Módulo principal cargado');
console.log('%c📚 Sistema Educativo Integrado', 'color: #4CAF50; font-size: 14px; font-weight: bold');
console.log('%c📋 Panel de Instalaciones disponible', 'color: #FF9800; font-size: 14px; font-weight: bold');
console.log('💡 Usa debugEducational() en la consola para ver el estado del sistema educativo');