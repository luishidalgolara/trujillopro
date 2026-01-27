/**
 * ZAPATA CORRIDA - INICIALIZACIÓN
 * Manejo de escenas 3D, vistas y eventos iniciales
 */

let threeScene = null;
let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let datosZapataActual = null;
let aceroSceneInitialized = false;
let corteZapataA = null;
let corteZapataB = null;

// Inicializar escena 3D cuando cargue la página
window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
    
    // Inicializar cortes A-A y B-B
    corteZapataA = new CorteZapataCorrida('canvasCorteA');
    corteZapataB = new CorteZapataCorrida('canvasCorteB');
    
    console.log('✅ Zapata corrida inicializada con cortes A-A y B-B');
});

/**
 * Inicializar escena 3D para Solo Acero
 */
function initAceroScene() {
    const container = document.getElementById('canvasAcero');
    
    // CORREGIDO: Obtener dimensiones reales del contenedor padre
    // Si el container está oculto (display: none), usar dimensiones de la vista-container
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Si las dimensiones son 0 (porque está oculto), usar dimensiones por defecto
    if (width === 0 || height === 0) {
        const vistaContainer = container.parentElement;
        width = vistaContainer ? vistaContainer.clientWidth : 800;
        height = vistaContainer ? vistaContainer.clientHeight : 600;
    }
    
    sceneAcero = new THREE.Scene();
    sceneAcero.background = new THREE.Color(0x1a1a1a);
    
    cameraAcero = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );
    cameraAcero.position.set(3, 2, 3);
    cameraAcero.lookAt(0, 0, 0);
    
    rendererAcero = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    rendererAcero.setSize(width, height);
    rendererAcero.setPixelRatio(window.devicePixelRatio);
    container.appendChild(rendererAcero.domElement);
    
    controlsAcero = new THREE.OrbitControls(cameraAcero, rendererAcero.domElement);
    controlsAcero.enableDamping = true;
    controlsAcero.dampingFactor = 0.05;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    sceneAcero.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 10, 10);
    sceneAcero.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -5);
    sceneAcero.add(fillLight);
    
    animateAcero();
}

/**
 * Loop de animación para escena de acero
 */
function animateAcero() {
    requestAnimationFrame(animateAcero);
    if (controlsAcero) {
        controlsAcero.update();
    }
    if (rendererAcero && sceneAcero && cameraAcero) {
        rendererAcero.render(sceneAcero, cameraAcero);
    }
}

/**
 * Cambiar entre vistas
 */
function cambiarVista(vista) {
    console.log('Cambiando a vista:', vista);
    
    try {
        const btn3d = document.getElementById('btn3d');
        const btnCorteA = document.getElementById('btnCorteA');
        const btnCorteB = document.getElementById('btnCorteB');
        const btnAcero = document.getElementById('btnAcero');
        
        if (btn3d) btn3d.classList.remove('active');
        if (btnCorteA) btnCorteA.classList.remove('active');
        if (btnCorteB) btnCorteB.classList.remove('active');
        if (btnAcero) btnAcero.classList.remove('active');
        
        const canvas3d = document.getElementById('canvas3d');
        const canvasCorteA = document.getElementById('canvasCorteA');
        const canvasCorteB = document.getElementById('canvasCorteB');
        const canvasAcero = document.getElementById('canvasAcero');
        
        if (canvas3d) {
            canvas3d.style.display = 'none';
            canvas3d.classList.remove('active');
        }
        if (canvasCorteA) {
            canvasCorteA.style.display = 'none';
            canvasCorteA.classList.remove('active');
        }
        if (canvasCorteB) {
            canvasCorteB.style.display = 'none';
            canvasCorteB.classList.remove('active');
        }
        if (canvasAcero) {
            canvasAcero.style.display = 'none';
            canvasAcero.classList.remove('active');
        }
        
        if (vista === '3d') {
            if (btn3d) btn3d.classList.add('active');
            if (canvas3d) {
                canvas3d.style.display = 'block';
                canvas3d.classList.add('active');
            }
        } else if (vista === 'corteA') {
            if (btnCorteA) btnCorteA.classList.add('active');
            if (canvasCorteA) {
                canvasCorteA.style.display = 'block';
                canvasCorteA.classList.add('active');
            }
            
            if (datosZapataActual && corteZapataA) {
                setTimeout(() => {
                    corteZapataA.dibujarCorteAA(datosZapataActual);
                }, 50);
            }
        } else if (vista === 'corteB') {
            if (btnCorteB) btnCorteB.classList.add('active');
            if (canvasCorteB) {
                canvasCorteB.style.display = 'block';
                canvasCorteB.classList.add('active');
            }
            
            if (datosZapataActual && corteZapataB) {
                setTimeout(() => {
                    corteZapataB.dibujarCorteBB(datosZapataActual);
                }, 50);
            }
        } else if (vista === 'acero') {
            if (btnAcero) btnAcero.classList.add('active');
            if (canvasAcero) {
                canvasAcero.style.display = 'block';
                canvasAcero.classList.add('active');
            }
            
            if (!aceroSceneInitialized) {
                console.log('Inicializando escena de acero por primera vez...');
                setTimeout(() => {
                    initAceroScene();
                    aceroSceneInitialized = true;
                    
                    if (datosZapataActual) {
                        setTimeout(() => {
                            actualizarVisualizacionSoloAcero(datosZapataActual);
                        }, 100);
                    }
                }, 50);
            } else {
                if (datosZapataActual) {
                    setTimeout(() => {
                        actualizarVisualizacionSoloAcero(datosZapataActual);
                    }, 50);
                }
            }
        }
    } catch (error) {
        console.error('Error en cambiarVista:', error);
    }
}