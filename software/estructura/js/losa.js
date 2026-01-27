/**
 * LOSA DE HORMIGÓN ARMADO
 * Cálculos y visualización 3D
 */

let threeScene = null;
let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let datosLosaActual = null;
let aceroSceneInitialized = false;

window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
});

/**
 * Inicializar escena 3D para Solo Acero
 */
function initAceroScene() {
    const container = document.getElementById('canvasAcero');
    
    sceneAcero = new THREE.Scene();
    sceneAcero.background = new THREE.Color(0x1a1a1a);
    
    cameraAcero = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    cameraAcero.position.set(5, 4, 5);
    cameraAcero.lookAt(0, 0, 0);
    
    rendererAcero = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    rendererAcero.setSize(container.clientWidth, container.clientHeight);
    rendererAcero.setPixelRatio(window.devicePixelRatio);
    container.appendChild(rendererAcero.domElement);
    
    controlsAcero = new THREE.OrbitControls(cameraAcero, rendererAcero.domElement);
    controlsAcero.enableDamping = true;
    controlsAcero.dampingFactor = 0.05;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    sceneAcero.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(10, 15, 10);
    sceneAcero.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 5, -5);
    sceneAcero.add(fillLight);
    
    animateAcero();
}

function animateAcero() {
    requestAnimationFrame(animateAcero);
    if (controlsAcero) {
        controlsAcero.update();
    }
    if (rendererAcero && sceneAcero && cameraAcero) {
        rendererAcero.render(sceneAcero, cameraAcero);
    }
}

function cambiarVista(vista) {
    console.log('Cambiando a vista:', vista);
    
    try {
        const btn3d = document.getElementById('btn3d');
        const btnCorte = document.getElementById('btnCorte');
        const btnAcero = document.getElementById('btnAcero');
        
        if (btn3d) btn3d.classList.remove('active');
        if (btnCorte) btnCorte.classList.remove('active');
        if (btnAcero) btnAcero.classList.remove('active');
        
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
            
            if (!aceroSceneInitialized) {
                console.log('Inicializando escena de acero...');
                setTimeout(() => {
                    initAceroScene();
                    aceroSceneInitialized = true;
                    
                    if (datosLosaActual) {
                        setTimeout(() => {
                            actualizarVisualizacionSoloAcero(datosLosaActual);
                        }, 100);
                    }
                }, 50);
            } else {
                if (datosLosaActual) {
                    setTimeout(() => {
                        actualizarVisualizacionSoloAcero(datosLosaActual);
                    }, 50);
                }
            }
        }
    } catch (error) {
        console.error('Error en cambiarVista:', error);
    }
}

function calcularLosa() {
    // Obtener valores de entrada
    const Lx = parseFloat(document.getElementById('luzX').value);
    const Ly = parseFloat(document.getElementById('luzY').value);
    const e = parseFloat(document.getElementById('espesor').value);
    const SC = parseFloat(document.getElementById('sobrecarga').value);
    const tabiqueria = parseFloat(document.getElementById('tabiqueria').value);
    const pisoTerminado = parseFloat(document.getElementById('pisoTerminado').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    const borde = document.getElementById('borde').value;
    
    // Validaciones
    if (Lx <= 0 || Ly <= 0 || e <= 0 || SC < 0) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // Determinar luz corta y larga
    const Lcorta = Math.min(Lx, Ly);
    const Llarga = Math.max(Lx, Ly);
    const m = Lcorta / Llarga; // Relación de luces
    
    // Verificar si es losa unidireccional o bidireccional
    const tipoLosa = m >= 0.5 ? 'Bidireccional' : 'Unidireccional';
    
    // CÁLCULO DE CARGAS
    const pesoPropio = e * NormativaChile.hormigon.pesoEspecifico.armado; // kN/m²
    const CM = pesoPropio + tabiqueria + pisoTerminado; // Carga muerta total
    const CV = SC; // Carga viva
    
    // Carga última
    const wu = 1.2 * CM + 1.6 * CV; // kN/m²
    
    // CÁLCULO DE MOMENTOS
    let Mx_pos, My_pos, Mx_neg, My_neg;
    
    if (tipoLosa === 'Bidireccional') {
        // Coeficientes según método elástico simplificado
        let coef_x_pos, coef_y_pos, coef_x_neg, coef_y_neg;
        
        switch(borde) {
            case 'apoyada':
                // Tablas simplificadas para losas apoyadas
                coef_x_pos = 0.036 * (1 + Math.pow(m, 2));
                coef_y_pos = 0.036 * Math.pow(m, 2);
                coef_x_neg = 0;
                coef_y_neg = 0;
                break;
            case 'continua':
                coef_x_pos = 0.024 * (1 + Math.pow(m, 2));
                coef_y_pos = 0.024 * Math.pow(m, 2);
                coef_x_neg = 0.045 * (1 + Math.pow(m, 2));
                coef_y_neg = 0.045 * Math.pow(m, 2);
                break;
            case 'empotrada':
                coef_x_pos = 0.018 * (1 + Math.pow(m, 2));
                coef_y_pos = 0.018 * Math.pow(m, 2);
                coef_x_neg = 0.054 * (1 + Math.pow(m, 2));
                coef_y_neg = 0.054 * Math.pow(m, 2);
                break;
            default:
                coef_x_pos = 0.036 * (1 + Math.pow(m, 2));
                coef_y_pos = 0.036 * Math.pow(m, 2);
                coef_x_neg = 0;
                coef_y_neg = 0;
        }
        
        // Momentos por unidad de ancho (kN·m/m)
        Mx_pos = coef_x_pos * wu * Math.pow(Lcorta, 2);
        My_pos = coef_y_pos * wu * Math.pow(Lcorta, 2);
        Mx_neg = coef_x_neg * wu * Math.pow(Lcorta, 2);
        My_neg = coef_y_neg * wu * Math.pow(Lcorta, 2);
        
    } else {
        // Losa unidireccional
        const coefM = borde === 'apoyada' ? 1/8 : (borde === 'continua' ? 1/10 : 1/12);
        Mx_pos = wu * Math.pow(Lcorta, 2) * coefM;
        My_pos = 0; // No trabaja en dirección larga
        Mx_neg = borde !== 'apoyada' ? wu * Math.pow(Lcorta, 2) / 12 : 0;
        My_neg = 0;
    }
    
    // DISEÑO DE ACERO
    const recubrimiento = NormativaChile.hormigon.recubrimiento.noExpuesto / 1000; // m
    const d = e - recubrimiento - 0.006; // m (altura efectiva)
    
    // Acero en dirección X (momento positivo)
    const As_x_pos = CalculosComunes.calcularAceroFlexion(Mx_pos, 1.0, d, fc, fy);
    const As_x_min = CalculosComunes.calcularAceroMinimo(100, d * 100, fy);
    const As_x_pos_final = Math.max(As_x_pos, As_x_min);
    
    // Distribución de barras dirección X
    const dist_x_pos = CalculosComunes.distribuirBarras(As_x_pos_final, 100, [8, 10, 12]);
    
    // Acero en dirección Y (momento positivo)
    const As_y_pos = tipoLosa === 'Bidireccional' ? 
        CalculosComunes.calcularAceroFlexion(My_pos, 1.0, d, fc, fy) : As_x_min * 0.2;
    const As_y_pos_final = Math.max(As_y_pos, As_x_min * 0.2); // Mínimo 20% del acero principal
    
    // Distribución de barras dirección Y
    const dist_y_pos = CalculosComunes.distribuirBarras(As_y_pos_final, 100, [8, 10, 12]);
    
    // Acero negativo (si existe)
    let As_x_neg_final = 0;
    let dist_x_neg = null;
    if (Mx_neg > 0) {
        const As_x_neg = CalculosComunes.calcularAceroFlexion(Mx_neg, 1.0, d, fc, fy);
        As_x_neg_final = Math.max(As_x_neg, As_x_min);
        dist_x_neg = CalculosComunes.distribuirBarras(As_x_neg_final, 100, [8, 10, 12]);
    }
    
    // VERIFICACIÓN DE DEFLEXIÓN
    const relacionEspesorMin = tipoLosa === 'Bidireccional' ? Lcorta / 30 : Lcorta / 25;
    const cumpleEspesor = e >= relacionEspesorMin;
    
    // VERIFICACIÓN POR CORTANTE (simplificado)
    const Vu = wu * Lcorta / 2; // kN/m (cortante en el apoyo)
    const cortante = CalculosComunes.calcularCortante(Vu, 100, d * 100, fc);
    
    // Guardar datos para Solo Acero
    datosLosaActual = {
        Lx: Lx,
        Ly: Ly,
        e: e,
        dist_x_pos: dist_x_pos,
        dist_y_pos: dist_y_pos,
        dist_x_neg: dist_x_neg,
        tipoLosa: tipoLosa
    };
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        Lx: Lx,
        Ly: Ly,
        Lcorta: Lcorta,
        Llarga: Llarga,
        m: m.toFixed(2),
        e: e,
        d: d,
        tipoLosa: tipoLosa,
        CM: CM.toFixed(2),
        CV: CV.toFixed(2),
        wu: wu.toFixed(2),
        Mx_pos: Mx_pos.toFixed(2),
        My_pos: My_pos.toFixed(2),
        Mx_neg: Mx_neg.toFixed(2),
        My_neg: My_neg.toFixed(2),
        As_x_pos: As_x_pos_final.toFixed(2),
        As_y_pos: As_y_pos_final.toFixed(2),
        As_x_neg: As_x_neg_final.toFixed(2),
        dist_x_pos: dist_x_pos,
        dist_y_pos: dist_y_pos,
        dist_x_neg: dist_x_neg,
        cortante: cortante,
        relacionEspesorMin: (relacionEspesorMin * 100).toFixed(1),
        cumpleEspesor: cumpleEspesor,
        borde: borde
    });
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D({
        Lx: Lx,
        Ly: Ly,
        e: e
    });
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Geometría y Clasificación</h3>';
    html += `<div class="result-item">
        <strong>Dimensiones en Planta:</strong>
        <span class="result-value">${datos.Lx.toFixed(2)} x ${datos.Ly.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Espesor de Losa:</strong>
        <span class="result-value">${(datos.e * 100).toFixed(0)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura Efectiva (d):</strong>
        <span class="result-value">${(datos.d * 100).toFixed(1)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Relación de Luces (m = Lcorta/Llarga):</strong>
        <span class="result-value">${datos.m}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Tipo de Losa:</strong>
        <span class="result-value">${datos.tipoLosa}</span>
    </div>`;
    
    // Verificación de espesor
    const claseEspesor = datos.cumpleEspesor ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseEspesor}">
        <strong>Verificación de Espesor:</strong><br>
        Espesor mínimo recomendado: ${datos.relacionEspesorMin} cm<br>
        Espesor provisto: ${(datos.e * 100).toFixed(0)} cm<br>
        ${datos.cumpleEspesor ? '✓ Espesor adecuado' : '⚠ Verificar deflexiones en detalle'}
    </div>`;
    
    html += '<h3>🔧 Cargas</h3>';
    html += `<div class="result-item">
        <strong>Carga Muerta (CM):</strong>
        <span class="result-value">${datos.CM} kN/m²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Carga Viva (CV):</strong>
        <span class="result-value">${datos.CV} kN/m²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Carga Última (wu):</strong>
        <span class="result-value">${datos.wu} kN/m²</span>
    </div>`;
    
    html += '<h3>📊 Momentos de Diseño</h3>';
    html += `<div class="result-item">
        <strong>Momento Positivo Mx:</strong>
        <span class="result-value">${datos.Mx_pos} kN·m/m</span>
    </div>`;
    
    if (datos.tipoLosa === 'Bidireccional') {
        html += `<div class="result-item">
            <strong>Momento Positivo My:</strong>
            <span class="result-value">${datos.My_pos} kN·m/m</span>
        </div>`;
    }
    
    if (parseFloat(datos.Mx_neg) > 0) {
        html += `<div class="result-item">
            <strong>Momento Negativo Mx:</strong>
            <span class="result-value">${datos.Mx_neg} kN·m/m</span>
        </div>`;
    }
    
    html += '<h3>🔩 Diseño de Acero</h3>';
    html += `<div class="result-item">
        <strong>Acero Dirección X (inferior):</strong>
        <span class="result-value">${datos.As_x_pos} cm²/m</span>
    </div>`;
    
    if (datos.dist_x_pos) {
        html += `<div class="result-item">
            <strong>Configuración X:</strong>
            <span class="result-value">φ${datos.dist_x_pos.diametro} @ ${datos.dist_x_pos.espaciamiento} cm</span>
        </div>`;
    }
    
    html += `<div class="result-item">
        <strong>Acero Dirección Y (inferior):</strong>
        <span class="result-value">${datos.As_y_pos} cm²/m</span>
    </div>`;
    
    if (datos.dist_y_pos) {
        html += `<div class="result-item">
            <strong>Configuración Y:</strong>
            <span class="result-value">φ${datos.dist_y_pos.diametro} @ ${datos.dist_y_pos.espaciamiento} cm</span>
        </div>`;
    }
    
    if (parseFloat(datos.As_x_neg) > 0 && datos.dist_x_neg) {
        html += `<div class="result-item">
            <strong>Acero Negativo (superior):</strong>
            <span class="result-value">${datos.As_x_neg} cm²/m</span>
        </div>`;
        
        html += `<div class="result-item">
            <strong>Configuración Negativo:</strong>
            <span class="result-value">φ${datos.dist_x_neg.diametro} @ ${datos.dist_x_neg.espaciamiento} cm</span>
        </div>`;
    }
    
    html += '<h3>✓ Verificación por Cortante</h3>';
    const claseCort = !datos.cortante.necesitaEstribos ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseCort}">
        <strong>Resistencia al Cortante:</strong><br>
        φVc = ${datos.cortante.Vc} kN/m<br>
        ${datos.cortante.necesitaEstribos ? '⚠ Verificar punzonamiento en apoyos puntuales' : '✓ Hormigón resiste el cortante'}
    </div>`;
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    html += `<div class="alert alert-success">
        <strong>LOSA ${datos.tipoLosa.toUpperCase()} - ${(datos.e * 100).toFixed(0)} cm de espesor</strong><br>
        Dimensiones: ${datos.Lx.toFixed(2)} x ${datos.Ly.toFixed(2)} m<br>
        Acero inferior X: φ${datos.dist_x_pos.diametro} @ ${datos.dist_x_pos.espaciamiento} cm<br>
        Acero inferior Y: φ${datos.dist_y_pos.diametro} @ ${datos.dist_y_pos.espaciamiento} cm`;
    
    if (datos.dist_x_neg) {
        html += `<br>Acero superior: φ${datos.dist_x_neg.diametro} @ ${datos.dist_x_neg.espaciamiento} cm en apoyos`;
    }
    
    html += `<br>Recubrimiento: 20 mm<br>
        Condición: ${datos.borde}
    </div>`;
    
    resultadosDiv.innerHTML = html;
}

function actualizarVisualizacion3D(datos) {
    threeScene.clearObjects();
    
    const Lx = datos.Lx;
    const Ly = datos.Ly;
    const e = datos.e;
    
    // Crear la losa
    const losa = threeScene.createBox(Lx, e, Ly, 0x95a5a6, {x: 0, y: e/2, z: 0});
    threeScene.createWireframe(Lx, e, Ly, {x: 0, y: e/2, z: 0});
    
    // Crear columnas de apoyo en las esquinas
    const tamColumna = 0.3;
    const alturaColumna = 3.0;
    
    const posiciones = [
        {x: -Lx/2, z: -Ly/2},
        {x: Lx/2, z: -Ly/2},
        {x: -Lx/2, z: Ly/2},
        {x: Lx/2, z: Ly/2}
    ];
    
    posiciones.forEach(pos => {
        const columna = threeScene.createBox(
            tamColumna, alturaColumna, tamColumna, 
            0x3498db,
            {x: pos.x, y: -alturaColumna/2, z: pos.z}
        );
    });
    
    // Visualizar malla de acero (simplificado)
    const espaciamientoMalla = 0.2; // 20cm
    const colorAcero = 0xe74c3c;
    
    // Barras en dirección X
    for (let z = -Ly/2; z <= Ly/2; z += espaciamientoMalla) {
        const barra = threeScene.createBox(
            Lx - 0.1, 0.008, 0.008,
            colorAcero,
            {x: 0, y: e * 0.3, z: z}
        );
    }
    
    // Barras en dirección Y
    for (let x = -Lx/2; x <= Lx/2; x += espaciamientoMalla) {
        const barra = threeScene.createBox(
            0.008, 0.008, Ly - 0.1,
            colorAcero,
            {x: x, y: e * 0.4, z: 0}
        );
    }
    
    // Dimensiones
    threeScene.addDimension(
        {x: -Lx/2, y: e + 0.05, z: Ly/2 + 0.2},
        {x: Lx/2, y: e + 0.05, z: Ly/2 + 0.2},
        `Lx = ${Lx.toFixed(2)} m`,
        0.15
    );
    
    threeScene.addDimension(
        {x: Lx/2 + 0.2, y: e + 0.05, z: -Ly/2},
        {x: Lx/2 + 0.2, y: e + 0.05, z: Ly/2},
        `Ly = ${Ly.toFixed(2)} m`,
        0.15
    );
    
    threeScene.resetCamera({x: Math.max(Lx, Ly) * 1.5, y: Math.max(Lx, Ly) * 0.8, z: Math.max(Lx, Ly) * 1.5});
}

/**
 * Visualización SOLO ACERO - Malla de losa PROFESIONAL
 */
function actualizarVisualizacionSoloAcero(datos) {
    console.log('Iniciando visualización solo acero losa...');
    
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
        
        // Luces potentes
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        sceneAcero.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
        mainLight.position.set(10, 15, 10);
        sceneAcero.add(mainLight);
        
        const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight1.position.set(-10, 10, -10);
        sceneAcero.add(fillLight1);
        
        const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight2.position.set(5, -5, 5);
        sceneAcero.add(fillLight2);
        
        const Lx = datos.Lx;
        const Ly = datos.Ly;
        const e = datos.e;
        
        console.log('Parámetros losa:', { Lx, Ly, e });
        
        // ========================================
        // MALLA INFERIOR (CAPA 1) - AZUL BRILLANTE
        // ========================================
        const espaciamientoX = datos.dist_x_pos ? Math.min(datos.dist_x_pos.espaciamiento / 100, 0.15) : 0.12;
        const espaciamientoY = datos.dist_y_pos ? Math.min(datos.dist_y_pos.espaciamiento / 100, 0.15) : 0.12;
        
        const barRadiusX = 0.008; // Radio visual MÁS GRUESO
        const barRadiusY = 0.008;
        const recubrimiento = 0.02;
        const yInferior = recubrimiento; // Altura de la malla inferior
        
        // Material AZUL MUY BRILLANTE
        const barMaterialInf = new THREE.MeshStandardMaterial({
            color: 0x00ccff, // Azul cian brillante
            roughness: 0.1,
            metalness: 1.0,
            emissive: 0x0099ff,
            emissiveIntensity: 1.0 // MÁXIMA intensidad
        });
        
        const largoUtilX = Lx - 2 * recubrimiento;
        const largoUtilY = Ly - 2 * recubrimiento;
        
        // Barras en dirección X (capa inferior)
        const numBarrasX = Math.floor(Ly / espaciamientoX) + 1;
        const barGeomX = new THREE.CylinderGeometry(barRadiusX, barRadiusX, largoUtilX, 16);
        
        console.log('===================================');
        console.log('CREANDO MALLA PROFESIONAL');
        console.log('Espaciamiento X:', espaciamientoX * 100, 'cm');
        console.log('Espaciamiento Y:', espaciamientoY * 100, 'cm');
        console.log('Número de barras X:', numBarrasX);
        
        for (let i = 0; i < numBarrasX; i++) {
            const z = -Ly/2 + (i * espaciamientoX);
            const barra = new THREE.Mesh(barGeomX, barMaterialInf);
            barra.rotation.z = Math.PI / 2;
            barra.position.set(0, yInferior, z);
            sceneAcero.add(barra);
        }
        
        console.log('✓ Barras en X creadas:', numBarrasX);
        
        // Barras en dirección Y (capa inferior, arriba de las X)
        const numBarrasY = Math.floor(Lx / espaciamientoY) + 1;
        const barGeomY = new THREE.CylinderGeometry(barRadiusY, barRadiusY, largoUtilY, 16);
        
        console.log('Número de barras Y:', numBarrasY);
        
        for (let i = 0; i < numBarrasY; i++) {
            const x = -Lx/2 + (i * espaciamientoY);
            const barra = new THREE.Mesh(barGeomY, barMaterialInf);
            barra.rotation.x = Math.PI / 2;
            barra.position.set(x, yInferior + 0.018, 0);
            sceneAcero.add(barra);
        }
        
        console.log('✓ Barras en Y creadas:', numBarrasY);
        console.log('✓ MALLA COMPLETA:', (numBarrasX * numBarrasY), 'intersecciones');
        
        // ========================================
        // MALLA SUPERIOR (si existe) - VERDE MUY BRILLANTE
        // ========================================
        if (datos.dist_x_neg) {
            const espaciamientoNeg = Math.min(datos.dist_x_neg.espaciamiento / 100, 0.15);
            const ySuperior = e - recubrimiento;
            
            const barMaterialSup = new THREE.MeshStandardMaterial({
                color: 0x00ff88, // Verde brillante
                roughness: 0.1,
                metalness: 1.0,
                emissive: 0x00ff44,
                emissiveIntensity: 1.0 // MÁXIMA intensidad
            });
            
            const numBarrasNeg = Math.floor(Ly / espaciamientoNeg) + 1;
            
            console.log('Creando', numBarrasNeg, 'barras superiores...');
            
            for (let i = 0; i < numBarrasNeg; i++) {
                const z = -Ly/2 + (i * espaciamientoNeg);
                const barra = new THREE.Mesh(barGeomX, barMaterialSup);
                barra.rotation.z = Math.PI / 2;
                barra.position.set(0, ySuperior, z);
                sceneAcero.add(barra);
            }
            
            console.log('✓ Malla superior creada');
        }
        
        // ========================================
        // COLUMNAS DE REFERENCIA (semi-transparentes)
        // ========================================
        const tamColumna = 0.3;
        const alturaColumna = 1.5;
        
        const columnMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            transparent: true,
            opacity: 0.3,
            roughness: 0.7
        });
        
        const posiciones = [
            {x: -Lx/2, z: -Ly/2},
            {x: Lx/2, z: -Ly/2},
            {x: -Lx/2, z: Ly/2},
            {x: Lx/2, z: Ly/2}
        ];
        
        posiciones.forEach(pos => {
            const colGeom = new THREE.BoxGeometry(tamColumna, alturaColumna, tamColumna);
            const col = new THREE.Mesh(colGeom, columnMaterial);
            col.position.set(pos.x, -alturaColumna/2, pos.z);
            sceneAcero.add(col);
        });
        
        // Posicionar cámara
        const distancia = Math.max(Lx, Ly) * 1.2;
        cameraAcero.position.set(distancia, distancia * 0.6, distancia);
        cameraAcero.lookAt(0, e/2, 0);
        controlsAcero.target.set(0, e/2, 0);
        controlsAcero.update();
        
        console.log('===================================');
        console.log('✓ VISUALIZACIÓN LOSA COMPLETADA');
        console.log('Barras dirección X:', numBarrasX);
        console.log('Barras dirección Y:', numBarrasY);
        console.log('===================================');
        
    } catch (error) {
        console.error('ERROR en actualizarVisualizacionSoloAcero:', error);
        console.error(error.stack);
    }
}