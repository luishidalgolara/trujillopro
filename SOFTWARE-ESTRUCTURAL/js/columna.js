/**
 * COLUMNA DE HORMIGÓN ARMADO
 * Cálculos y visualización 3D
 */

let threeScene = null;
let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let datosColumnaActual = null; // Almacenar datos del último cálculo
let aceroSceneInitialized = false; // Flag para saber si ya se inicializó

window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
    // NO inicializar la escena de acero aquí - se hará cuando el usuario haga clic
});

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
    cameraAcero.position.set(5, 3, 5);
    cameraAcero.lookAt(0, 1.5, 0);
    
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    sceneAcero.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 10, 10);
    sceneAcero.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.3);
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

function calcularColumna() {
    // Obtener valores de entrada
    const PD = parseFloat(document.getElementById('cargaMuerta').value);
    const PL = parseFloat(document.getElementById('cargaViva').value);
    const Mx = parseFloat(document.getElementById('momentoX').value);
    const My = parseFloat(document.getElementById('momentoY').value);
    const H = parseFloat(document.getElementById('altura').value);
    const b = parseFloat(document.getElementById('dimB').value);
    const h = parseFloat(document.getElementById('dimH').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    
    // Validaciones
    if (PD <= 0 || PL < 0 || H <= 0 || b <= 0 || h <= 0) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // CARGAS ÚLTIMAS
    const Pu = 1.2 * PD + 1.6 * PL; // kN
    const Mux = 1.2 * Mx; // Simplificado, usar combinaciones completas en diseño real
    const Muy = 1.2 * My;
    
    // VERIFICACIÓN DE ESBELTEZ
    const k = 1.0; // Factor de longitud efectiva (asumido arriostrado)
    const r_x = h / Math.sqrt(12); // Radio de giro en x
    const r_y = b / Math.sqrt(12); // Radio de giro en y
    const esbeltez_x = (k * H) / r_x;
    const esbeltez_y = (k * H) / r_y;
    const esbeltez_max = Math.max(esbeltez_x, esbeltez_y);
    
    // Clasificación de columna
    let tipoColumna = '';
    if (esbeltez_max < 22) {
        tipoColumna = 'Columna Corta';
    } else if (esbeltez_max < 100) {
        tipoColumna = 'Columna Esbelta';
    } else {
        tipoColumna = 'Muy Esbelta - Revisar diseño';
    }
    
    // CAPACIDAD AXIAL
    const Ag = b * h * 10000; // cm²
    const phi = 0.70; // Factor de reducción para compresión con estribos
    
    // Cuantía de acero estimada inicial (1-4% es típico)
    const rho_estimado = 0.02; // 2%
    const Ast_estimado = rho_estimado * Ag; // cm²
    
    // Capacidad axial nominal (fórmula simplificada NCh430)
    const Pn = 0.80 * (0.85 * fc * (Ag - Ast_estimado) + fy * Ast_estimado) / 10; // kN
    const phiPn = phi * Pn;
    
    // DISEÑO DE ACERO LONGITUDINAL
    // Verificar si la carga axial está dentro de la capacidad
    const ratioCapacidad = Pu / phiPn;
    
    // Ajustar cuantía de acero según la demanda
    let rho_final = 0.01; // Mínimo 1%
    
    if (ratioCapacidad > 0.7) {
        rho_final = 0.03; // 3% para cargas altas
    } else if (ratioCapacidad > 0.5) {
        rho_final = 0.02; // 2% para cargas medias
    } else {
        rho_final = 0.01; // 1% para cargas bajas
    }
    
    // Verificar límites NCh430 (1% - 6%)
    rho_final = Math.max(0.01, Math.min(rho_final, 0.06));
    
    const Ast_req = rho_final * Ag; // cm²
    
    // Distribución de barras
    const perimetro = 2 * (b * 100 + h * 100); // cm
    const numBarrasEstimado = Math.ceil(perimetro / 20); // Cada 20cm aprox
    const numBarras = Math.max(4, numBarrasEstimado); // Mínimo 4 barras
    
    const areaXbarra = Ast_req / numBarras;
    
    // Encontrar diámetro adecuado
    let diametroSeleccionado = 16;
    const diametrosDisponibles = [16, 18, 20, 22, 25, 28, 32];
    
    for (let diam of diametrosDisponibles) {
        const area = NormativaChile.acero.areas[diam] / 100; // cm²
        if (area >= areaXbarra * 0.9) {
            diametroSeleccionado = diam;
            break;
        }
    }
    
    const areaBarraReal = NormativaChile.acero.areas[diametroSeleccionado] / 100;
    const Ast_real = numBarras * areaBarraReal;
    const rho_real = Ast_real / Ag;
    
    // Recalcular capacidad con acero real
    const Pn_real = 0.80 * (0.85 * fc * (Ag - Ast_real) + fy * Ast_real) / 10; // kN
    const phiPn_real = phi * Pn_real;
    const cumpleAxial = Pu <= phiPn_real;
    
    // DISEÑO DE ESTRIBOS
    // Espaciamiento máximo según NCh430
    const s_max = Math.min(
        16 * diametroSeleccionado / 10, // 16 veces el diámetro de barras long.
        48 * 8 / 10, // 48 veces el diámetro del estribo (φ8)
        Math.min(b, h) * 100 // Menor dimensión de la columna
    );
    
    const espaciamientoEstribos = Math.floor(s_max / 5) * 5; // Redondear a múltiplo de 5cm
    
    // En zonas de confinamiento (extremos): s/2
    const espaciamientoConfinamiento = Math.max(10, Math.floor(espaciamientoEstribos / 2 / 5) * 5);
    
    // VERIFICACIÓN DE MOMENTOS (simplificado)
    // Para diseño completo se requiere diagrama de interacción
    const e_x = Mux / Pu; // m
    const e_y = Muy / Pu; // m
    
    const excentricidadSignificativa = e_x > h / 6 || e_y > b / 6;
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        b: b,
        h: h,
        H: H,
        Pu: Pu,
        Mux: Mux,
        Muy: Muy,
        esbeltez_x: esbeltez_x.toFixed(1),
        esbeltez_y: esbeltez_y.toFixed(1),
        tipoColumna: tipoColumna,
        Ast_req: Ast_req.toFixed(2),
        Ast_real: Ast_real.toFixed(2),
        rho_real: (rho_real * 100).toFixed(2),
        numBarras: numBarras,
        diametro: diametroSeleccionado,
        espaciamientoEstribos: espaciamientoEstribos,
        espaciamientoConfinamiento: espaciamientoConfinamiento,
        phiPn: phiPn_real.toFixed(2),
        cumpleAxial: cumpleAxial,
        ratioCapacidad: (ratioCapacidad * 100).toFixed(1),
        excentricidadSignificativa: excentricidadSignificativa,
        e_x: (e_x * 100).toFixed(2),
        e_y: (e_y * 100).toFixed(2)
    });
    
    // Guardar datos para la vista de solo acero
    datosColumnaActual = {
        b: b,
        h: h,
        H: H,
        numBarras: numBarras,
        diametro: diametroSeleccionado,
        espaciamientoEstribos: espaciamientoEstribos,
        espaciamientoConfinamiento: espaciamientoConfinamiento
    };
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D({
        b: b,
        h: h,
        H: H,
        numBarras: numBarras
    });
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Dimensiones y Geometría</h3>';
    html += `<div class="result-item">
        <strong>Sección (b x h):</strong>
        <span class="result-value">${(datos.b * 100).toFixed(0)} x ${(datos.h * 100).toFixed(0)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura Libre (H):</strong>
        <span class="result-value">${datos.H.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Esbeltez (kH/r):</strong>
        <span class="result-value">λx = ${datos.esbeltez_x}, λy = ${datos.esbeltez_y}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Clasificación:</strong>
        <span class="result-value">${datos.tipoColumna}</span>
    </div>`;
    
    html += '<h3>🔧 Solicitaciones Últimas</h3>';
    html += `<div class="result-item">
        <strong>Carga Axial Última (Pu):</strong>
        <span class="result-value">${datos.Pu.toFixed(2)} kN</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Momento Último Mx:</strong>
        <span class="result-value">${datos.Mux.toFixed(2)} kN·m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Momento Último My:</strong>
        <span class="result-value">${datos.Muy.toFixed(2)} kN·m</span>
    </div>`;
    
    if (datos.excentricidadSignificativa) {
        html += `<div class="alert alert-warning">
            ⚠ Excentricidades significativas detectadas (ex = ${datos.e_x} cm, ey = ${datos.e_y} cm)<br>
            Se recomienda diseño completo con diagrama de interacción
        </div>`;
    }
    
    html += '<h3>🔩 Diseño de Acero Longitudinal</h3>';
    html += `<div class="result-item">
        <strong>Acero Requerido:</strong>
        <span class="result-value">${datos.Ast_req} cm²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Configuración de Barras:</strong>
        <span class="result-value">${datos.numBarras} φ${datos.diametro}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Acero Provisto:</strong>
        <span class="result-value">${datos.Ast_real} cm²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Cuantía de Acero (ρ):</strong>
        <span class="result-value">${datos.rho_real}%</span>
    </div>`;
    
    html += '<h3>⚡ Diseño de Estribos</h3>';
    html += `<div class="result-item">
        <strong>Estribos en Zona Central:</strong>
        <span class="result-value">φ8 @ ${datos.espaciamientoEstribos} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Estribos en Confinamiento (extremos):</strong>
        <span class="result-value">φ8 @ ${datos.espaciamientoConfinamiento} cm</span>
    </div>`;
    
    html += '<h3>✓ Verificación de Capacidad</h3>';
    const claseCapacidad = datos.cumpleAxial ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${claseCapacidad}">
        <strong>Capacidad Axial:</strong><br>
        Pu = ${datos.Pu.toFixed(2)} kN<br>
        φPn = ${datos.phiPn} kN<br>
        Uso: ${datos.ratioCapacidad}%<br>
        ${datos.cumpleAxial ? '✓ La sección es adecuada' : '✗ Aumentar sección o resistencia del hormigón'}
    </div>`;
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    html += `<div class="alert alert-success">
        <strong>COLUMNA ${(datos.b * 100).toFixed(0)} x ${(datos.h * 100).toFixed(0)} cm</strong><br>
        Acero longitudinal: ${datos.numBarras} φ${datos.diametro}<br>
        Estribos zona central: φ8 @ ${datos.espaciamientoEstribos} cm<br>
        Estribos confinamiento: φ8 @ ${datos.espaciamientoConfinamiento} cm (0.5H desde extremos)<br>
        Recubrimiento: 20 mm<br>
        ${datos.tipoColumna}
    </div>`;
    
    resultadosDiv.innerHTML = html;
}

function actualizarVisualizacion3D(datos) {
    threeScene.clearObjects();
    
    const b = datos.b;
    const h = datos.h;
    const H = datos.H;
    
    // Crear la columna
    const columna = threeScene.createBox(b, H, h, 0x95a5a6, {x: 0, y: H/2, z: 0});
    threeScene.createWireframe(b, H, h, {x: 0, y: H/2, z: 0});
    
    // Crear barras longitudinales (visualización simplificada)
    const recubrimiento = 0.02; // 2cm
    const radioBarras = (Math.min(b, h) / 2) - recubrimiento;
    
    for (let i = 0; i < datos.numBarras; i++) {
        const angulo = (2 * Math.PI * i) / datos.numBarras;
        const x = radioBarras * Math.cos(angulo);
        const z = radioBarras * Math.sin(angulo);
        
        const barra = threeScene.createCylinder(
            0.008, 0.008, H, 0xe74c3c,
            {x: x, y: H/2, z: z}
        );
    }
    
    // Crear base (zapata simplificada)
    const baseSize = Math.max(b, h) * 2;
    const baseHeight = 0.3;
    const base = threeScene.createBox(baseSize, baseHeight, baseSize, 0xBDBDBD, 
        {x: 0, y: -baseHeight/2, z: 0});
    
    // Dimensiones
    threeScene.addDimension(
        {x: 0, y: H + 0.1, z: -h/2},
        {x: 0, y: H + 0.1, z: h/2},
        `h = ${(h * 100).toFixed(0)} cm`,
        0.15
    );
    
    threeScene.addDimension(
        {x: b/2 + 0.1, y: 0, z: h/2 + 0.2},
        {x: b/2 + 0.1, y: H, z: h/2 + 0.2},
        `H = ${H.toFixed(2)} m`,
        0.15
    );
    
    threeScene.resetCamera({x: H * 1.5, y: H * 0.8, z: H * 1.5});
}

/**
 * Cambiar entre vistas (3D, Corte, Solo Acero)
 */
function cambiarVista(vista) {
    console.log('Cambiando a vista:', vista);
    
    try {
        // Desactivar todos los botones
        const btn3d = document.getElementById('btn3d');
        const btnCorte = document.getElementById('btnCorte');
        const btnAcero = document.getElementById('btnAcero');
        
        if (btn3d) btn3d.classList.remove('active');
        if (btnCorte) btnCorte.classList.remove('active');
        if (btnAcero) btnAcero.classList.remove('active');
        
        // Ocultar todos los canvas
        const canvas3d = document.getElementById('canvas3d');
        const canvasCorte = document.getElementById('canvasCorte');
        const canvasAcero = document.getElementById('canvasAcero');
        
        if (canvas3d) {
            canvas3d.style.display = 'none';
            canvas3d.classList.remove('active');
        }
        if (canvasCorte) {
            canvasCorte.style.display = 'none';
            canvasCorte.classList.remove('active');
        }
        if (canvasAcero) {
            canvasAcero.style.display = 'none';
            canvasAcero.classList.remove('active');
        }
        
        // Activar la vista seleccionada
        if (vista === '3d') {
            if (btn3d) btn3d.classList.add('active');
            if (canvas3d) {
                canvas3d.style.display = 'block';
                canvas3d.classList.add('active');
            }
        } else if (vista === 'corte') {
            if (btnCorte) btnCorte.classList.add('active');
            if (canvasCorte) {
                canvasCorte.style.display = 'block';
                canvasCorte.classList.add('active');
            }
        } else if (vista === 'acero') {
            if (btnAcero) btnAcero.classList.add('active');
            if (canvasAcero) {
                canvasAcero.style.display = 'block';
                canvasAcero.classList.add('active');
            }
            
            // Inicializar escena de acero SI AÚN NO SE HA HECHO
            if (!aceroSceneInitialized) {
                console.log('Inicializando escena de acero por primera vez...');
                setTimeout(() => {
                    initAceroScene();
                    aceroSceneInitialized = true;
                    
                    // Actualizar visualización si hay datos
                    if (datosColumnaActual) {
                        setTimeout(() => {
                            actualizarVisualizacionSoloAcero(datosColumnaActual);
                        }, 100);
                    }
                }, 50);
            } else {
                // Ya está inicializada, solo actualizar datos
                if (datosColumnaActual) {
                    console.log('Actualizando visualización de acero con datos:', datosColumnaActual);
                    setTimeout(() => {
                        actualizarVisualizacionSoloAcero(datosColumnaActual);
                    }, 50);
                } else {
                    console.warn('No hay datos de columna. Ejecute primero el cálculo.');
                }
            }
        }
    } catch (error) {
        console.error('Error en cambiarVista:', error);
    }
}

/**
 * Visualización 3D de SOLO ACERO (barras + estribos)
 */
function actualizarVisualizacionSoloAcero(datos) {
    console.log('Iniciando visualización de solo acero...');
    
    // Verificar que la escena esté inicializada
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
        
        // Re-agregar luces MÁS POTENTES
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Aumentado de 0.6 a 0.9
        sceneAcero.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2); // Aumentado de 0.8 a 1.2
        mainLight.position.set(10, 10, 10);
        sceneAcero.add(mainLight);
        
        const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.6); // Nueva luz de relleno
        fillLight1.position.set(-10, 10, -10);
        sceneAcero.add(fillLight1);
        
        const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.5); // Otra luz de relleno
        fillLight2.position.set(5, -5, 5);
        sceneAcero.add(fillLight2);
        
        const b = datos.b;
        const h = datos.h;
        const H = datos.H;
        const numBarras = datos.numBarras;
        const diametro = datos.diametro / 1000; // Convertir mm a metros
        const espaciamientoEstribos = datos.espaciamientoEstribos / 100; // cm a m
        const espaciamientoConfinamiento = datos.espaciamientoConfinamiento / 100; // cm a m
        
        console.log('Parámetros:', { b, h, H, numBarras, diametro });
        
        // ========================================
        // CREAR ZAPATA (BASE)
        // ========================================
        const zapataSize = Math.max(b, h) * 2.5;
        const zapataHeight = 0.4;
        const zapataGeometry = new THREE.BoxGeometry(zapataSize, zapataHeight, zapataSize);
        const zapataMaterial = new THREE.MeshStandardMaterial({
            color: 0x8899aa,  // Gris claro
            roughness: 0.7,
            metalness: 0.2,
            transparent: true,
            opacity: 0.4
        });
        const zapata = new THREE.Mesh(zapataGeometry, zapataMaterial);
        zapata.position.set(0, -zapataHeight/2, 0);
        sceneAcero.add(zapata);
        
        // Parámetros
        const recubrimiento = 0.02; // 2cm
        const radioDistribucion = (Math.min(b, h) / 2) - recubrimiento;
        const barDiameter = diametro * 3; // Multiplicar por 3 para mejor visualización
        const stirrupDiameter = 0.015; // φ8 = 8mm, MÁS GRUESO para mejor visibilidad
        
        // ========================================
        // CREAR BARRAS LONGITUDINALES (ROJAS MÁS BRILLANTES)
        // ========================================
        const barRadius = barDiameter / 2;
        const barGeometry = new THREE.CylinderGeometry(barRadius, barRadius, H, 12);
        const barMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,           // Rojo puro más brillante
            roughness: 0.2,            // Más brillante (antes 0.3)
            metalness: 1.0,            // Totalmente metálico (antes 0.9)
            emissive: 0xff2222,        // Emisión más fuerte
            emissiveIntensity: 0.6     // Intensidad mayor (antes 0.3)
        });
        
        console.log('Creando', numBarras, 'barras longitudinales...');
        
        // Barras principales
        for (let i = 0; i < numBarras; i++) {
            const angulo = (2 * Math.PI * i) / numBarras;
            const x = radioDistribucion * Math.cos(angulo);
            const z = radioDistribucion * Math.sin(angulo);
            
            const barra = new THREE.Mesh(barGeometry, barMaterial);
            barra.position.set(x, H/2, z);
            sceneAcero.add(barra);
        }
        
        // Barras de anclaje (que salen hacia la zapata)
        const anclajeHeight = 0.3;
        const anclajeGeometry = new THREE.CylinderGeometry(barRadius, barRadius, anclajeHeight, 12);
        for (let i = 0; i < numBarras; i++) {
            const angulo = (2 * Math.PI * i) / numBarras;
            const x = radioDistribucion * Math.cos(angulo);
            const z = radioDistribucion * Math.sin(angulo);
            
            const anclaje = new THREE.Mesh(anclajeGeometry, barMaterial);
            anclaje.position.set(x, -anclajeHeight/2, z);
            sceneAcero.add(anclaje);
        }
        
        console.log('Barras longitudinales creadas');
        
        // ========================================
        // CREAR ESTRIBOS (VERDES MÁS BRILLANTES)
        // ========================================
        const stirrupMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,           // Verde puro más brillante
            roughness: 0.2,            // Más brillante (antes 0.4)
            metalness: 1.0,            // Totalmente metálico (antes 0.8)
            emissive: 0x00ff00,        // Emisión verde
            emissiveIntensity: 0.7     // Intensidad mayor (antes 0.4)
        });
        
        const stirrupRadius = stirrupDiameter / 2;
        
        // Dimensiones del estribo (rectángulo cerrado)
        const anchoEstribo = b - 2 * recubrimiento;
        const altoEstribo = h - 2 * recubrimiento;
        
        console.log('Creando estribos...');
        
        // Zona de confinamiento inferior (0.5H desde la base)
        const alturaConfinamiento = Math.min(H * 0.5, 1.5); // Máximo 1.5m
        let yPos = 0.05; // Empezar un poco arriba
        let contadorEstribos = 0;
        
        // Función auxiliar para crear un estribo rectangular como ANILLO CONTINUO
        function crearEstribo(ancho, alto, altura, radio, material) {
            // Crear un anillo rectangular usando TorusGeometry modificado
            // o mejor aún, usar una curva cerrada
            
            const shape = new THREE.Shape();
            const halfW = ancho / 2;
            const halfH = alto / 2;
            
            // Dibujar el rectángulo exterior
            shape.moveTo(-halfW, -halfH);
            shape.lineTo(halfW, -halfH);
            shape.lineTo(halfW, halfH);
            shape.lineTo(-halfW, halfH);
            shape.lineTo(-halfW, -halfH);
            
            // Crear el agujero interior (para que sea un anillo)
            const innerOffset = radio * 2;
            const hole = new THREE.Path();
            hole.moveTo(-halfW + innerOffset, -halfH + innerOffset);
            hole.lineTo(halfW - innerOffset, -halfH + innerOffset);
            hole.lineTo(halfW - innerOffset, halfH - innerOffset);
            hole.lineTo(-halfW + innerOffset, halfH - innerOffset);
            hole.lineTo(-halfW + innerOffset, -halfH + innerOffset);
            shape.holes.push(hole);
            
            // Extruir para darle grosor (el diámetro del estribo)
            const extrudeSettings = {
                depth: radio * 2,
                bevelEnabled: true,
                bevelThickness: radio * 0.5,
                bevelSize: radio * 0.5,
                bevelSegments: 3
            };
            
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            
            // Rotar para que quede horizontal
            mesh.rotation.x = Math.PI / 2;
            mesh.position.y = altura;
            
            sceneAcero.add(mesh);
        }
        
        // Estribos en zona de confinamiento inferior
        while (yPos <= alturaConfinamiento) {
            crearEstribo(anchoEstribo, altoEstribo, yPos, stirrupRadius, stirrupMaterial);
            yPos += espaciamientoConfinamiento;
            contadorEstribos++;
        }
        
        // Estribos en zona central
        yPos = alturaConfinamiento + espaciamientoEstribos;
        const alturaZonaCentralFin = H - alturaConfinamiento;
        
        while (yPos < alturaZonaCentralFin) {
            crearEstribo(anchoEstribo, altoEstribo, yPos, stirrupRadius, stirrupMaterial);
            yPos += espaciamientoEstribos;
            contadorEstribos++;
        }
        
        // Estribos en zona de confinamiento superior
        yPos = alturaZonaCentralFin;
        while (yPos <= H - 0.05) {
            crearEstribo(anchoEstribo, altoEstribo, yPos, stirrupRadius, stirrupMaterial);
            yPos += espaciamientoConfinamiento;
            contadorEstribos++;
        }
        
        console.log('Total de estribos creados:', contadorEstribos);
        
        // Resetear cámara para buena vista (ver desde abajo hacia arriba)
        cameraAcero.position.set(H * 1.5, H * 0.4, H * 1.5);
        cameraAcero.lookAt(0, H/2, 0);
        controlsAcero.target.set(0, H/2, 0);
        controlsAcero.update();
        
        console.log('Visualización de acero completada exitosamente');
        
    } catch (error) {
        console.error('Error en actualizarVisualizacionSoloAcero:', error);
    }
}