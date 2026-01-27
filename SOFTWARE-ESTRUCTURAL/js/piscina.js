/**
 * PISCINA DE HORMIGÓN ARMADO
 * Cálculos con presión hidrostática
 */

let threeScene = null;
let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let datosPiscinaActual = null;
let aceroSceneInitialized = false;

window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
});

function calcularPiscina() {
    const L = parseFloat(document.getElementById('largo').value);
    const A = parseFloat(document.getElementById('ancho').value);
    const H = parseFloat(document.getElementById('profundidad').value);
    const e_muro = parseFloat(document.getElementById('espesorMuro').value);
    const e_fondo = parseFloat(document.getElementById('espesorFondo').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    
    if (L <= 0 || A <= 0 || H <= 0 || e_muro <= 0 || e_fondo <= 0) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // PRESIÓN HIDROSTÁTICA
    const gamma_agua = 10; // kN/m³
    const p_max = gamma_agua * H; // kPa (presión en el fondo)
    
    // DISEÑO DE MUROS LATERALES (empotrados en base)
    // Momento máximo en la base del muro (empotrado)
    const Mu_muro = (gamma_agua * Math.pow(H, 3)) / 12; // kN·m/m
    
    const d_muro = e_muro - 0.05; // altura efectiva
    const As_muro = CalculosComunes.calcularAceroFlexion(Mu_muro, 1.0, d_muro, fc, fy);
    const As_min_muro = CalculosComunes.calcularAceroMinimo(100, d_muro * 100, fy);
    const As_muro_final = Math.max(As_muro, As_min_muro);
    const dist_muro = CalculosComunes.distribuirBarras(As_muro_final, 100, [10, 12, 16]);
    
    // ACERO DE TEMPERATURA (cara exterior)
    const As_temp = 0.0018 * e_muro * 100 * 100; // cm²/m
    const dist_temp = CalculosComunes.distribuirBarras(As_temp, 100, [8, 10]);
    
    // DISEÑO DEL FONDO
    // Considerando losa sobre terreno con presión del agua hacia arriba
    const q_fondo = p_max; // kPa
    const L_corta = Math.min(L, A);
    const Mu_fondo = q_fondo * Math.pow(L_corta, 2) / 10; // kN·m/m (simplificado)
    
    const d_fondo = e_fondo - 0.05;
    const As_fondo = CalculosComunes.calcularAceroFlexion(Mu_fondo, 1.0, d_fondo, fc, fy);
    const As_min_fondo = CalculosComunes.calcularAceroMinimo(100, d_fondo * 100, fy);
    const As_fondo_final = Math.max(As_fondo, As_min_fondo);
    const dist_fondo = CalculosComunes.distribuirBarras(As_fondo_final, 100, [10, 12, 16]);
    
    // VOLUMEN DE AGUA
    const Vol_agua = L * A * H; // m³
    const Peso_agua = Vol_agua * gamma_agua; // kN
    
    // VERIFICACIÓN POR CORTANTE EN MUROS
    const Vu_muro = (gamma_agua * Math.pow(H, 2)) / 2; // kN/m
    const cortante_muro = CalculosComunes.calcularCortante(Vu_muro, 100, d_muro * 100, fc);
    
    // Guardar datos para Solo Acero
    datosPiscinaActual = {
        L: L,
        A: A,
        H: H,
        e_muro: e_muro,
        e_fondo: e_fondo,
        dist_muro: dist_muro,
        dist_temp: dist_temp,
        dist_fondo: dist_fondo
    };
    
    mostrarResultados({
        L, A, H, e_muro, e_fondo,
        p_max, Mu_muro, Mu_fondo,
        As_muro: As_muro_final, dist_muro,
        As_temp, dist_temp,
        As_fondo: As_fondo_final, dist_fondo,
        Vol_agua, Peso_agua,
        cortante_muro
    });
    
    actualizarVisualizacion3D({ L, A, H, e_muro, e_fondo });
}

function mostrarResultados(d) {
    const html = `
        <h3>📐 Dimensiones</h3>
        <div class="result-item"><strong>Dimensiones:</strong> <span class="result-value">${d.L} x ${d.A} x ${d.H} m</span></div>
        <div class="result-item"><strong>Volumen de Agua:</strong> <span class="result-value">${d.Vol_agua.toFixed(2)} m³</span></div>
        <div class="result-item"><strong>Peso del Agua:</strong> <span class="result-value">${d.Peso_agua.toFixed(2)} kN</span></div>
        
        <h3>💧 Presión Hidrostática</h3>
        <div class="result-item"><strong>Presión Máxima (fondo):</strong> <span class="result-value">${d.p_max.toFixed(2)} kPa</span></div>
        <div class="result-item"><strong>Momento en Muro:</strong> <span class="result-value">${d.Mu_muro.toFixed(2)} kN·m/m</span></div>
        
        <h3>🔩 Diseño de Acero - Muros</h3>
        <div class="result-item"><strong>Acero Interior (momento):</strong> <span class="result-value">φ${d.dist_muro.diametro} @ ${d.dist_muro.espaciamiento} cm</span></div>
        <div class="result-item"><strong>Acero Exterior (temperatura):</strong> <span class="result-value">φ${d.dist_temp.diametro} @ ${d.dist_temp.espaciamiento} cm</span></div>
        
        <h3>🔩 Diseño de Acero - Fondo</h3>
        <div class="result-item"><strong>Acero Principal:</strong> <span class="result-value">φ${d.dist_fondo.diametro} @ ${d.dist_fondo.espaciamiento} cm (ambas direcciones)</span></div>
        
        <h3>✓ Verificación</h3>
        <div class="alert ${!d.cortante_muro.necesitaEstribos ? 'alert-success' : 'alert-warning'}">
            <strong>Cortante en Muros:</strong> ${!d.cortante_muro.necesitaEstribos ? '✓ OK' : '⚠ Verificar'}
        </div>
        
        <h3>📋 Resumen</h3>
        <div class="alert alert-success">
            <strong>PISCINA ${d.L}x${d.A}x${d.H}m</strong><br>
            Muros: ${(d.e_muro*100).toFixed(0)}cm - φ${d.dist_muro.diametro}@${d.dist_muro.espaciamiento}cm<br>
            Fondo: ${(d.e_fondo*100).toFixed(0)}cm - φ${d.dist_fondo.diametro}@${d.dist_fondo.espaciamiento}cm<br>
            Impermeabilización: Necesaria en todas las caras interiores
        </div>
    `;
    document.getElementById('resultados').innerHTML = html;
}

function actualizarVisualizacion3D(d) {
    threeScene.clearObjects();
    
    // Fondo
    threeScene.createBox(d.L, d.e_fondo, d.A, 0xBDBDBD, {x:0, y:d.e_fondo/2, z:0});
    
    // Muros
    threeScene.createBox(d.e_muro, d.H, d.A, 0x95a5a6, {x:-d.L/2+d.e_muro/2, y:d.e_fondo+d.H/2, z:0});
    threeScene.createBox(d.e_muro, d.H, d.A, 0x95a5a6, {x:d.L/2-d.e_muro/2, y:d.e_fondo+d.H/2, z:0});
    threeScene.createBox(d.L, d.H, d.e_muro, 0x95a5a6, {x:0, y:d.e_fondo+d.H/2, z:-d.A/2+d.e_muro/2});
    threeScene.createBox(d.L, d.H, d.e_muro, 0x95a5a6, {x:0, y:d.e_fondo+d.H/2, z:d.A/2-d.e_muro/2});
    
    // Agua (transparente)
    const agua = threeScene.createBox(d.L-2*d.e_muro, d.H*0.9, d.A-2*d.e_muro, 0x1E90FF, 
        {x:0, y:d.e_fondo+d.H*0.45, z:0});
    agua.material.transparent = true;
    agua.material.opacity = 0.6;
    
    threeScene.addDimension({x:-d.L/2, y:d.e_fondo+d.H+0.3, z:0}, 
        {x:d.L/2, y:d.e_fondo+d.H+0.3, z:0}, `L=${d.L}m`, 0.2);
    threeScene.addDimension({x:d.L/2+0.5, y:d.e_fondo, z:0}, 
        {x:d.L/2+0.5, y:d.e_fondo+d.H, z:0}, `H=${d.H}m`, 0.2);
    
    threeScene.resetCamera({x:d.L*1.2, y:d.H*1.5, z:d.A*1.2});
}


// ==========================================
// SISTEMA DE CORTES Y CUANTIFICACIÓN
// ==========================================

let cortePiscinaA = null;
let cortePiscinaB = null;
let vistaActual = '3d';

// Inicializar sistema de cortes
window.addEventListener('DOMContentLoaded', (event) => {
    cortePiscinaA = new CortePiscina('canvasCorteA');
    cortePiscinaB = new CortePiscina('canvasCorteB');
});

// Función para cambiar entre vistas
function cambiarVista(vista) {
    vistaActual = vista;
    
    const canvas3d = document.getElementById('canvas3d');
    const canvasCorteA = document.getElementById('canvasCorteA');
    const canvasCorteB = document.getElementById('canvasCorteB');
    const canvasAcero = document.getElementById('canvasAcero');
    const btn3d = document.getElementById('btn3d');
    const btnCorteA = document.getElementById('btnCorteA');
    const btnCorteB = document.getElementById('btnCorteB');
    const btnAcero = document.getElementById('btnAcero');
    
    // Remover todas las clases active
    if (canvas3d) canvas3d.classList.remove('active');
    if (canvasCorteA) canvasCorteA.classList.remove('active');
    if (canvasCorteB) canvasCorteB.classList.remove('active');
    if (canvasAcero) canvasAcero.classList.remove('active');
    if (btn3d) btn3d.classList.remove('active');
    if (btnCorteA) btnCorteA.classList.remove('active');
    if (btnCorteB) btnCorteB.classList.remove('active');
    if (btnAcero) btnAcero.classList.remove('active');
    
    if (vista === '3d') {
        canvas3d.classList.add('active');
        btn3d.classList.add('active');
    } else if (vista === 'corteA') {
        canvasCorteA.classList.add('active');
        btnCorteA.classList.add('active');
        
        if (datosPiscinaActual && cortePiscinaA) {
            cortePiscinaA.dibujarCorteAA(datosPiscinaActual);
        }
    } else if (vista === 'corteB') {
        canvasCorteB.classList.add('active');
        btnCorteB.classList.add('active');
        
        if (datosPiscinaActual && cortePiscinaB) {
            cortePiscinaB.dibujarCorteBB(datosPiscinaActual);
        }
    } else if (vista === 'acero') {
        canvasAcero.classList.add('active');
        btnAcero.classList.add('active');
        
        if (!aceroSceneInitialized) {
            console.log('Inicializando escena de acero por primera vez...');
            setTimeout(() => {
                initAceroScene();
                aceroSceneInitialized = true;
                
                if (datosPiscinaActual) {
                    setTimeout(() => {
                        actualizarVisualizacionSoloAcero(datosPiscinaActual);
                    }, 100);
                }
            }, 50);
        } else {
            if (datosPiscinaActual) {
                setTimeout(() => {
                    actualizarVisualizacionSoloAcero(datosPiscinaActual);
                }, 50);
            }
        }
    }
}


// ==========================================
// VISUALIZACIÓN SOLO ACERO - PISCINA
// ==========================================

/**
 * Inicializar escena 3D para Solo Acero
 */
function initAceroScene() {
    const container = document.getElementById('canvasAcero');
    
    // Crear escena
    sceneAcero = new THREE.Scene();
    sceneAcero.background = new THREE.Color(0x1a1a1a);
    
    // Configurar cámara
    cameraAcero = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    cameraAcero.position.set(8, 6, 8);
    cameraAcero.lookAt(0, 0, 0);
    
    // Configurar renderer
    rendererAcero = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    rendererAcero.setSize(container.clientWidth, container.clientHeight);
    rendererAcero.setPixelRatio(window.devicePixelRatio);
    container.appendChild(rendererAcero.domElement);
    
    // Controles orbitales
    controlsAcero = new THREE.OrbitControls(cameraAcero, rendererAcero.domElement);
    controlsAcero.enableDamping = true;
    controlsAcero.dampingFactor = 0.05;
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    sceneAcero.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 10, 10);
    sceneAcero.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -5);
    sceneAcero.add(fillLight);
    
    // Iniciar animación
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
 * Visualización 3D de SOLO ACERO para piscina
 */
function actualizarVisualizacionSoloAcero(datos) {
    console.log('Iniciando visualización de solo acero piscina...');
    
    if (!sceneAcero) {
        console.error('sceneAcero no está inicializado');
        return;
    }
    
    try {
        // Limpiar escena
        while(sceneAcero.children.length > 0) { 
            const object = sceneAcero.children[0];
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
            sceneAcero.remove(object);
        }
        
        // Re-agregar luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        sceneAcero.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(10, 10, 10);
        sceneAcero.add(mainLight);
        
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight.position.set(-5, 5, -5);
        sceneAcero.add(fillLight);
        
        const L = datos.L;
        const A = datos.A;
        const H = datos.H;
        const e_muro = datos.e_muro;
        const e_fondo = datos.e_fondo;
        
        console.log('Parámetros piscina:', { L, A, H, e_muro, e_fondo });
        
        // Radio de barras (más grueso para visualización)
        const barRadius = 0.008; // 8mm visible
        
        // ========================================
        // 1. ACERO DEL FONDO (MALLA) CON ANCLAJES
        // ========================================
        
        // Barras principales dirección LARGA (ROJO)
        const espacFondoLargo = 0.12; // 12cm espaciamiento
        const numBarrasLargo = Math.floor(A / espacFondoLargo);
        const alturaAnclaje = 0.40; // 40cm de anclaje vertical
        
        const fondoLargoMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0xff0000,
            emissiveIntensity: 0.6
        });
        
        console.log('Creando', numBarrasLargo, 'barras longitudinales del fondo con anclajes (ROJO)...');
        
        for (let i = 0; i < numBarrasLargo; i++) {
            const z = -A/2 + (i * espacFondoLargo) + espacFondoLargo/2;
            
            // Crear barra con forma de U usando curva
            const puntos = [];
            
            // Anclaje izquierdo (vertical hacia arriba)
            puntos.push(new THREE.Vector3(-L/2 + 0.07, e_fondo/2, z));
            puntos.push(new THREE.Vector3(-L/2 + 0.07, e_fondo/2 + alturaAnclaje, z));
            
            // Transición suave (curva)
            puntos.push(new THREE.Vector3(-L/2 + 0.10, e_fondo/2 + alturaAnclaje - 0.05, z));
            puntos.push(new THREE.Vector3(-L/2 + 0.15, e_fondo/2, z));
            
            // Tramo horizontal
            puntos.push(new THREE.Vector3(0, e_fondo/2, z));
            puntos.push(new THREE.Vector3(L/2 - 0.15, e_fondo/2, z));
            
            // Transición derecha
            puntos.push(new THREE.Vector3(L/2 - 0.10, e_fondo/2 + alturaAnclaje - 0.05, z));
            
            // Anclaje derecho (vertical hacia arriba)
            puntos.push(new THREE.Vector3(L/2 - 0.07, e_fondo/2 + alturaAnclaje, z));
            puntos.push(new THREE.Vector3(L/2 - 0.07, e_fondo/2, z));
            
            const curva = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curva, 64, barRadius, 8, false);
            const barra = new THREE.Mesh(tubeGeometry, fondoLargoMaterial);
            sceneAcero.add(barra);
        }
        
        // Barras distribución dirección CORTA (VERDE)
        const numBarrasCorto = Math.floor(L / espacFondoLargo);
        
        const fondoCortoMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0x00ff00,
            emissiveIntensity: 0.6
        });
        
        console.log('Creando', numBarrasCorto, 'barras transversales del fondo con anclajes (VERDE)...');
        
        for (let i = 0; i < numBarrasCorto; i++) {
            const x = -L/2 + (i * espacFondoLargo) + espacFondoLargo/2;
            
            // Crear barra con forma de U
            const puntos = [];
            
            // Anclaje frontal (vertical hacia arriba)
            puntos.push(new THREE.Vector3(x, e_fondo/2, -A/2 + 0.07));
            puntos.push(new THREE.Vector3(x, e_fondo/2 + alturaAnclaje, -A/2 + 0.07));
            
            // Transición suave
            puntos.push(new THREE.Vector3(x, e_fondo/2 + alturaAnclaje - 0.05, -A/2 + 0.10));
            puntos.push(new THREE.Vector3(x, e_fondo/2, -A/2 + 0.15));
            
            // Tramo horizontal
            puntos.push(new THREE.Vector3(x, e_fondo/2, 0));
            puntos.push(new THREE.Vector3(x, e_fondo/2, A/2 - 0.15));
            
            // Transición trasera
            puntos.push(new THREE.Vector3(x, e_fondo/2 + alturaAnclaje - 0.05, A/2 - 0.10));
            
            // Anclaje trasero (vertical hacia arriba)
            puntos.push(new THREE.Vector3(x, e_fondo/2 + alturaAnclaje, A/2 - 0.07));
            puntos.push(new THREE.Vector3(x, e_fondo/2, A/2 - 0.07));
            
            const curva = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curva, 64, barRadius, 8, false);
            const barra = new THREE.Mesh(tubeGeometry, fondoCortoMaterial);
            sceneAcero.add(barra);
        }
        
        // ========================================
        // 2. ACERO VERTICAL DE MUROS CON GANCHO SUPERIOR (AZUL)
        // ========================================
        
        const espacMuroVert = 0.15; // 15cm espaciamiento
        const alturaBarraVertical = H - 0.05; // Con anclaje
        const longitudGancho = 0.20; // 20cm gancho superior horizontal
        
        const muroVertMaterial = new THREE.MeshStandardMaterial({
            color: 0x0080ff,
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0x0080ff,
            emissiveIntensity: 0.7
        });
        
        console.log('Creando barras verticales de muros con gancho superior (AZUL)...');
        
        // Muro izquierdo (ganchos hacia la izquierda/AFUERA)
        const numVertIzq = Math.floor(A / espacMuroVert);
        for (let i = 0; i < numVertIzq; i++) {
            const z = -A/2 + (i * espacMuroVert) + espacMuroVert/2;
            
            const puntos = [];
            // Base (desde el fondo)
            puntos.push(new THREE.Vector3(-L/2 + e_muro/2, e_fondo, z));
            // Subir verticalmente
            puntos.push(new THREE.Vector3(-L/2 + e_muro/2, e_fondo + alturaBarraVertical - 0.05, z));
            // Curva hacia AFUERA
            puntos.push(new THREE.Vector3(-L/2 + e_muro/2 - 0.03, e_fondo + alturaBarraVertical, z));
            // Gancho horizontal hacia AFUERA
            puntos.push(new THREE.Vector3(-L/2 + e_muro/2 - longitudGancho, e_fondo + alturaBarraVertical, z));
            
            const curva = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curva, 32, barRadius * 1.2, 8, false);
            const barra = new THREE.Mesh(tubeGeometry, muroVertMaterial);
            sceneAcero.add(barra);
        }
        
        // Muro derecho (ganchos hacia la derecha/AFUERA)
        for (let i = 0; i < numVertIzq; i++) {
            const z = -A/2 + (i * espacMuroVert) + espacMuroVert/2;
            
            const puntos = [];
            puntos.push(new THREE.Vector3(L/2 - e_muro/2, e_fondo, z));
            puntos.push(new THREE.Vector3(L/2 - e_muro/2, e_fondo + alturaBarraVertical - 0.05, z));
            puntos.push(new THREE.Vector3(L/2 - e_muro/2 + 0.03, e_fondo + alturaBarraVertical, z));
            puntos.push(new THREE.Vector3(L/2 - e_muro/2 + longitudGancho, e_fondo + alturaBarraVertical, z));
            
            const curva = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curva, 32, barRadius * 1.2, 8, false);
            const barra = new THREE.Mesh(tubeGeometry, muroVertMaterial);
            sceneAcero.add(barra);
        }
        
        // Muro frontal (ganchos hacia adelante/AFUERA)
        const numVertFront = Math.floor(L / espacMuroVert);
        for (let i = 0; i < numVertFront; i++) {
            const x = -L/2 + (i * espacMuroVert) + espacMuroVert/2;
            
            const puntos = [];
            puntos.push(new THREE.Vector3(x, e_fondo, -A/2 + e_muro/2));
            puntos.push(new THREE.Vector3(x, e_fondo + alturaBarraVertical - 0.05, -A/2 + e_muro/2));
            puntos.push(new THREE.Vector3(x, e_fondo + alturaBarraVertical, -A/2 + e_muro/2 - 0.03));
            puntos.push(new THREE.Vector3(x, e_fondo + alturaBarraVertical, -A/2 + e_muro/2 - longitudGancho));
            
            const curva = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curva, 32, barRadius * 1.2, 8, false);
            const barra = new THREE.Mesh(tubeGeometry, muroVertMaterial);
            sceneAcero.add(barra);
        }
        
        // Muro trasero (ganchos hacia atrás/AFUERA)
        for (let i = 0; i < numVertFront; i++) {
            const x = -L/2 + (i * espacMuroVert) + espacMuroVert/2;
            
            const puntos = [];
            puntos.push(new THREE.Vector3(x, e_fondo, A/2 - e_muro/2));
            puntos.push(new THREE.Vector3(x, e_fondo + alturaBarraVertical - 0.05, A/2 - e_muro/2));
            puntos.push(new THREE.Vector3(x, e_fondo + alturaBarraVertical, A/2 - e_muro/2 + 0.03));
            puntos.push(new THREE.Vector3(x, e_fondo + alturaBarraVertical, A/2 - e_muro/2 + longitudGancho));
            
            const curva = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curva, 32, barRadius * 1.2, 8, false);
            const barra = new THREE.Mesh(tubeGeometry, muroVertMaterial);
            sceneAcero.add(barra);
        }
        
        // ========================================
        // 3. ACERO HORIZONTAL DE MUROS (AMARILLO)
        // ========================================
        
        const espacMuroHoriz = 0.15; // 15cm típico
        const numHoriz = Math.floor(H / espacMuroHoriz);
        
        const muroHorizGeometry1 = new THREE.CylinderGeometry(barRadius, barRadius, A - 2*e_muro, 12);
        const muroHorizGeometry2 = new THREE.CylinderGeometry(barRadius, barRadius, L - 2*e_muro, 12);
        const muroHorizMaterial = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0xffff00,
            emissiveIntensity: 0.6
        });
        
        console.log('Creando barras horizontales de muros (AMARILLO)...');
        
        for (let i = 0; i < numHoriz; i++) {
            const y = e_fondo + (i * espacMuroHoriz) + espacMuroHoriz/2;
            
            // Muros laterales (izq/der)
            const barraIzq = new THREE.Mesh(muroHorizGeometry1, muroHorizMaterial);
            barraIzq.rotation.x = Math.PI / 2;
            barraIzq.position.set(-L/2 + e_muro/2, y, 0);
            sceneAcero.add(barraIzq);
            
            const barraDer = new THREE.Mesh(muroHorizGeometry1, muroHorizMaterial);
            barraDer.rotation.x = Math.PI / 2;
            barraDer.position.set(L/2 - e_muro/2, y, 0);
            sceneAcero.add(barraDer);
            
            // Muros frontales
            const barraFront = new THREE.Mesh(muroHorizGeometry2, muroHorizMaterial);
            barraFront.rotation.z = Math.PI / 2;
            barraFront.position.set(0, y, -A/2 + e_muro/2);
            sceneAcero.add(barraFront);
            
            const barraTras = new THREE.Mesh(muroHorizGeometry2, muroHorizMaterial);
            barraTras.rotation.z = Math.PI / 2;
            barraTras.position.set(0, y, A/2 - e_muro/2);
            sceneAcero.add(barraTras);
        }
        
        // ========================================
        // 4. ACERO DE TEMPERATURA EXTERIOR (BLANCO)
        // ========================================
        
        const espacTemp = 0.20; // 20cm espaciamiento
        const numTempVert = Math.floor(H / espacTemp);
        
        const tempGeometry1 = new THREE.CylinderGeometry(barRadius * 0.7, barRadius * 0.7, A - 2*e_muro, 12);
        const tempGeometry2 = new THREE.CylinderGeometry(barRadius * 0.7, barRadius * 0.7, L - 2*e_muro, 12);
        const tempMaterial = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            roughness: 0.3,
            metalness: 0.8,
            emissive: 0x666666,
            emissiveIntensity: 0.4
        });
        
        console.log('Creando acero de temperatura (GRIS)...');
        
        for (let i = 0; i < numTempVert; i++) {
            const y = e_fondo + (i * espacTemp) + espacTemp/2;
            
            // Exteriores
            const barraIzq = new THREE.Mesh(tempGeometry1, tempMaterial);
            barraIzq.rotation.x = Math.PI / 2;
            barraIzq.position.set(-L/2 - e_muro/2 + 0.02, y, 0);
            sceneAcero.add(barraIzq);
            
            const barraDer = new THREE.Mesh(tempGeometry1, tempMaterial);
            barraDer.rotation.x = Math.PI / 2;
            barraDer.position.set(L/2 + e_muro/2 - 0.02, y, 0);
            sceneAcero.add(barraDer);
        }
        
        // Resetear cámara
        const maxDim = Math.max(L, A, H);
        cameraAcero.position.set(maxDim * 1.2, maxDim * 0.8, maxDim * 1.2);
        cameraAcero.lookAt(0, H/2, 0);
        controlsAcero.target.set(0, H/2, 0);
        controlsAcero.update();
        
        console.log('Visualización de acero piscina completada');
        
    } catch (error) {
        console.error('Error en actualizarVisualizacionSoloAcero:', error);
    }
}