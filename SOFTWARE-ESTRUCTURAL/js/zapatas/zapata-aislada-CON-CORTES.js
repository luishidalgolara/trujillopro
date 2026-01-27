/**
 * ZAPATA AISLADA
 * Cálculos y visualización 3D + Cortes A-A y B-B
 */

let threeScene = null;
let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let datosZapataActual = null;
let aceroSceneInitialized = false;
let corteZapataA = null;
let corteZapataB = null;

window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
    
    // Inicializar cortes A-A y B-B
    corteZapataA = new CorteZapataAislada('canvasCorteA');
    corteZapataB = new CorteZapataAislada('canvasCorteB');
    
    console.log('✅ Zapata aislada inicializada con cortes A-A y B-B');
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
    cameraAcero.position.set(4, 3, 4);
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

// [RESTO DEL CÓDIGO calcularZapataAislada, mostrarResultados, etc. - SIN CAMBIOS]
// El código existente se mantiene igual...

function calcularZapataAislada() {
    // Obtener valores de entrada
    const D = parseFloat(document.getElementById('cargaMuerta').value);
    const L = parseFloat(document.getElementById('cargaViva').value);
    const c = parseFloat(document.getElementById('dimColumna').value);
    const h_input = parseFloat(document.getElementById('alturaZapata').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    const qadm = parseFloat(document.getElementById('qadm').value);
    const Df = parseFloat(document.getElementById('profundidad').value);
    
    // Validaciones
    if (D <= 0 || L <= 0 || c <= 0 || qadm <= 0 || Df <= 0 || h_input <= 0) {
        alert('Por favor ingrese valores válidos mayores a cero');
        return;
    }
    
    // CÁLCULO DE CARGAS ÚLTIMAS
    const Pu = 1.2 * D + 1.6 * L; // kN (Combinación U2)
    const Pservicio = D + L; // kN
    
    // DIMENSIONAMIENTO DE LA ZAPATA (cuadrada)
    const pesoSueloEstimado = 18 * Df; // kN/m²
    const qneto = qadm - pesoSueloEstimado;
    const A_requerida = Pservicio / qneto; // m²
    const B_requerido = Math.sqrt(A_requerida); // m
    
    // Redondear hacia arriba a múltiplo de 0.1m
    const B = Math.ceil(B_requerido * 10) / 10;
    const A_zapata = B * B;
    
    // Usar altura ingresada por el usuario
    const h = h_input;
    const voladizo = (B - c) / 2;
    
    // Recubrimiento y altura efectiva
    const recubrimiento = NormativaChile.hormigon.recubrimiento.contactoTerreno / 1000; // m
    const d = h - recubrimiento - 0.012; // m (altura efectiva)
    
    // VERIFICACIÓN DE PRESIÓN EN EL SUELO
    const pesoZapata = A_zapata * h * NormativaChile.hormigon.pesoEspecifico.armado; // kN
    const pesoSuelo = A_zapata * Df * 18; // kN
    const Ptotal = Pservicio + pesoZapata + pesoSuelo;
    const qactual = Ptotal / A_zapata;
    
    // DISEÑO POR FLEXIÓN (dirección X y Y - simétrico)
    const qu = Pu / A_zapata; // kN/m²
    const Mu = qu * B * Math.pow(voladizo, 2) / 2; // kN·m
    
    // Área de acero requerida por flexión
    const As_req = CalculosComunes.calcularAceroFlexion(Mu, B, d, fc, fy); // cm²
    const As_min = CalculosComunes.calcularAceroMinimo(B * 100, d * 100, fy); // cm²
    const As = Math.max(As_req, As_min);
    
    // Distribución de barras (en ambas direcciones)
    const distribucion = CalculosComunes.distribuirBarras(As, B * 100);
    
    // VERIFICACIÓN POR PUNZONAMIENTO
    const bo = 4 * (c + d); // Perímetro crítico (m)
    const Vc_punz = 0.85 * 1.06 * Math.sqrt(fc) * bo * d * 1000; // kN (NCh430)
    const verificacionPunz = {
        cumple: Pu <= Vc_punz,
        porcentaje: ((Pu / Vc_punz) * 100).toFixed(1),
        Vc: Vc_punz.toFixed(2)
    };
    
    // VERIFICACIÓN POR CORTANTE EN UNA DIRECCIÓN
    const d_cm = d * 100;
    const Vu = qu * B * (voladizo - d); // kN
    const cortante = CalculosComunes.calcularCortante(Vu, B * 100, d_cm, fc);
    
    // SUGERENCIAS CORTANTE
    if (cortante.necesitaEstribos && typeof SugerenciasInteligentes !== 'undefined') {
        cortante.sugerencias = SugerenciasInteligentes.sugerirCortante({
            Vu: Vu,
            phiVc: parseFloat(cortante.Vc),
            b: B,
            d: d,
            fc: fc
        });
    }
    
    // VERIFICACIÓN DE PRESIÓN
    const verificacionPresion = {
        cumple: qactual <= qadm,
        porcentaje: ((qactual / qadm) * 100).toFixed(1)
    };
    
    // SUGERENCIAS INTELIGENTES - PRESIÓN
    if (!verificacionPresion.cumple && typeof SugerenciasInteligentes !== 'undefined') {
        verificacionPresion.sugerencias = SugerenciasInteligentes.sugerirPresionSuelo({
            qactual: qactual,
            qadm: qadm,
            B_actual: B,
            h_actual: h,
            Pservicio: Pservicio,
            Df: Df
        });
    }
    
    // SUGERENCIAS INTELIGENTES - PUNZONAMIENTO
    if (!verificacionPunz.cumple && typeof SugerenciasInteligentes !== 'undefined') {
        verificacionPunz.sugerencias = SugerenciasInteligentes.sugerirPunzonamiento({
            Pu: Pu,
            phiVc: Vc_punz,
            h_actual: h,
            c: c,
            fc: fc
        });
    }
    
    // Guardar datos para Solo Acero Y CORTES
    datosZapataActual = {
        B: B,
        h: h,
        c: c,
        Df: Df,
        distribucion: distribucion
    };
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        B: B,
        h: h,
        d: d,
        c: c,
        Pu: Pu,
        Mu: Mu,
        As: As,
        distribucion: distribucion,
        qactual: qactual,
        qadm: qadm,
        verificacionPresion: verificacionPresion,
        verificacionPunz: verificacionPunz,
        cortante: cortante,
        voladizo: voladizo
    });
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D({
        B: B,
        h: h,
        c: c,
        Df: Df
    });
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Dimensiones de la Zapata</h3>';
    html += `<div class="result-item">
        <strong>Dimensiones en Planta (B x B): <span class="tooltip-icon" data-tooltip="ancho-zapata">❓</span></strong>
        <span class="result-value">${datos.B.toFixed(2)} x ${datos.B.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura de Zapata (h): <span class="tooltip-icon" data-tooltip="altura-zapata">❓</span></strong>
        <span class="result-value">${datos.h.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura Efectiva (d): <span class="tooltip-icon" data-tooltip="altura-efectiva">❓</span></strong>
        <span class="result-value">${(datos.d * 100).toFixed(1)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Voladizo:</strong>
        <span class="result-value">${datos.voladizo.toFixed(2)} m</span>
    </div>`;
    
    html += '<h3>🔧 Cargas y Momentos</h3>';
    html += `<div class="result-item">
        <strong>Carga Última (Pu): <span class="tooltip-icon" data-tooltip="carga-ultima">❓</span></strong>
        <span class="result-value">${datos.Pu.toFixed(2)} kN</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Momento Último (Mu): <span class="tooltip-icon" data-tooltip="momento-ultimo">❓</span></strong>
        <span class="result-value">${datos.Mu.toFixed(2)} kN·m</span>
    </div>`;
    
    html += '<h3>🔩 Diseño de Acero</h3>';
    html += `<div class="result-item">
        <strong>Acero Requerido (As) por dirección: <span class="tooltip-icon" data-tooltip="acero-requerido">❓</span></strong>
        <span class="result-value">${datos.As.toFixed(2)} cm²</span>
    </div>`;
    
    if (datos.distribucion) {
        html += `<div class="result-item">
            <strong>Configuración en cada dirección: <span class="tooltip-icon" data-tooltip="configuracion-barras">❓</span></strong>
            <span class="result-value">${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm</span>
        </div>`;
    }
    
    html += '<h3>✓ Verificaciones</h3>';
    
    // Presión en el suelo
    const clasePres = datos.verificacionPresion.cumple ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${clasePres}">
        <strong>Presión en el Suelo: <span class="tooltip-icon" data-tooltip="presion-suelo">❓</span></strong><br>
        qactual = ${datos.qactual.toFixed(2)} kPa | qadm = ${datos.qadm.toFixed(2)} kPa<br>
        Uso: ${datos.verificacionPresion.porcentaje}%<br>
        ${datos.verificacionPresion.cumple ? '✓ CUMPLE' : '✗ NO CUMPLE'}
    </div>`;
    
    // SUGERENCIAS PRESIÓN
    if (datos.verificacionPresion.sugerencias && typeof SugerenciasInteligentes !== 'undefined') {
        html += SugerenciasInteligentes.generarHTML(datos.verificacionPresion.sugerencias);
    }
    
    // Punzonamiento
    const clasePunz = datos.verificacionPunz.cumple ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${clasePunz}">
        <strong>Verificación por Punzonamiento: <span class="tooltip-icon" data-tooltip="punzonamiento">❓</span></strong><br>
        Pu = ${datos.Pu.toFixed(2)} kN | φVc = ${datos.verificacionPunz.Vc} kN<br>
        Uso: ${datos.verificacionPunz.porcentaje}%<br>
        ${datos.verificacionPunz.cumple ? '✓ CUMPLE' : '✗ NO CUMPLE - Aumentar altura'}
    </div>`;
    
    // SUGERENCIAS PUNZONAMIENTO
    if (datos.verificacionPunz.sugerencias && typeof SugerenciasInteligentes !== 'undefined') {
        html += SugerenciasInteligentes.generarHTML(datos.verificacionPunz.sugerencias);
    }
    
    // Cortante
    const claseCort = !datos.cortante.necesitaEstribos ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseCort}">
        <strong>Verificación por Cortante en Una Dirección: <span class="tooltip-icon" data-tooltip="cortante-zapata">❓</span></strong><br>
        Vu = ${datos.cortante.phiVc} kN | φVc = ${datos.cortante.Vc} kN<br>
        ${datos.cortante.necesitaEstribos ? '⚠ Verificar cortante en detalle' : '✓ Hormigón resiste el cortante'}
    </div>`;
    
    // SUGERENCIAS CORTANTE
    if (datos.cortante.sugerencias && typeof SugerenciasInteligentes !== 'undefined') {
        html += SugerenciasInteligentes.generarHTML(datos.cortante.sugerencias);
    }
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    html += `<div class="alert alert-success">
        <strong>ZAPATA AISLADA ${datos.B.toFixed(2)} x ${datos.B.toFixed(2)} x ${datos.h.toFixed(2)} m</strong><br>
        Acero dirección X: ${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm<br>
        Acero dirección Y: ${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm<br>
        Recubrimiento: 70 mm (contacto con terreno)<br>
        Columna: ${datos.c.toFixed(2)} x ${datos.c.toFixed(2)} m
    </div>`;
    
    resultadosDiv.innerHTML = html;
}

function actualizarVisualizacion3D(datos) {
    threeScene.clearObjects();
    
    const B = datos.B;
    const h = datos.h;
    const c = datos.c;
    const Df = datos.Df;
    
    // Crear el suelo
    const suelo = threeScene.createPlane(B + 2, B + 2, 0x8B4513, {x: 0, y: -Df, z: 0});
    
    // Crear la zapata
    const zapata = threeScene.createBox(B, h, B, 0xBDBDBD, {x: 0, y: -Df + h/2, z: 0});
    
    // Crear la columna
    const alturaColumna = 3.0;
    const columna = threeScene.createBox(c, alturaColumna, c, 0x3498db, {x: 0, y: -Df + h + alturaColumna/2, z: 0});
    
    // Wireframes
    threeScene.createWireframe(B, h, B, {x: 0, y: -Df + h/2, z: 0});
    threeScene.createWireframe(c, alturaColumna, c, {x: 0, y: -Df + h + alturaColumna/2, z: 0});
    
    // Dimensiones
    threeScene.addDimension(
        {x: -B/2, y: -Df + h, z: B/2 + 0.3},
        {x: B/2, y: -Df + h, z: B/2 + 0.3},
        `B = ${B.toFixed(2)} m`,
        0.2
    );
    
    threeScene.addDimension(
        {x: B/2 + 0.3, y: -Df, z: 0},
        {x: B/2 + 0.3, y: -Df + h, z: 0},
        `h = ${h.toFixed(2)} m`,
        0.2
    );
    
    threeScene.resetCamera({x: B * 2, y: B * 1.5, z: B * 2});
}

/**
 * Visualización SOLO ACERO - Malla ortogonal PROFESIONAL + columna
 */
function actualizarVisualizacionSoloAcero(datos) {
    console.log('Iniciando visualización solo acero zapata aislada...');
    
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
        
        const B = datos.B;
        const h = datos.h;
        const c = datos.c;
        const Df = datos.Df || 0;
        
        console.log('Parámetros:', { B, h, c, Df });
        
        // ========================================
        // SUELO SEMI-TRANSPARENTE
        // ========================================
        const sueloSize = B * 2.5;
        const sueloGeometry = new THREE.PlaneGeometry(sueloSize, sueloSize);
        const sueloMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.9,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const suelo = new THREE.Mesh(sueloGeometry, sueloMaterial);
        suelo.rotation.x = -Math.PI / 2;
        suelo.position.y = -Df;
        sceneAcero.add(suelo);
        
        // ========================================
        // MALLA DE ACERO EN ZAPATA (AZUL BRILLANTE)
        // ========================================
        const espaciamiento = 0.15; // 15cm fijo para que se vea bien la malla
        const diametroReal = datos.distribucion ? datos.distribucion.diametro / 1000 : 0.012;
        
        // Radio MUY GRANDE para que se vea bien
        const barRadius = 0.008; // 8mm de radio visual
        const recubrimiento = 0.07;
        const yZapata = -Df + 0.05; // Cerca del fondo de zapata
        
        // Material AZUL MUY BRILLANTE
        const barMaterial = new THREE.MeshStandardMaterial({
            color: 0x0099ff,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0x0066ff,
            emissiveIntensity: 0.8
        });
        
        const largoUtil = B - 2 * recubrimiento;
        const inicioX = -B/2 + recubrimiento;
        const inicioZ = -B/2 + recubrimiento;
        
        // Calcular número de barras
        const numBarras = Math.floor(largoUtil / espaciamiento) + 1;
        
        console.log('===================================');
        console.log('CREANDO MALLA PROFESIONAL');
        console.log('Número de barras por dirección:', numBarras);
        console.log('Espaciamiento:', espaciamiento, 'm');
        console.log('Largo útil:', largoUtil, 'm');
        console.log('===================================');
        
        // ========================================
        // BARRAS EN DIRECCIÓN X (van de izquierda a derecha) + GANCHOS
        // ========================================
        const barGeomX = new THREE.CylinderGeometry(barRadius, barRadius, largoUtil, 16);
        const longitudGancho = 0.12; // 12cm de gancho
        const ganchoGeomX = new THREE.CylinderGeometry(barRadius, barRadius, longitudGancho, 16);
        
        for (let i = 0; i < numBarras; i++) {
            const z = inicioZ + (i * espaciamiento);
            
            // Barra principal horizontal
            const barra = new THREE.Mesh(barGeomX, barMaterial);
            barra.rotation.z = Math.PI / 2; // Horizontal en X
            barra.position.set(0, yZapata, z);
            sceneAcero.add(barra);
            
            // GANCHO IZQUIERDO (sube verticalmente)
            const ganchoIzq = new THREE.Mesh(ganchoGeomX, barMaterial);
            ganchoIzq.position.set(inicioX, yZapata + longitudGancho/2, z);
            sceneAcero.add(ganchoIzq);
            
            // GANCHO DERECHO (sube verticalmente)
            const ganchoDer = new THREE.Mesh(ganchoGeomX, barMaterial);
            ganchoDer.position.set(inicioX + largoUtil, yZapata + longitudGancho/2, z);
            sceneAcero.add(ganchoDer);
        }
        
        console.log('✓ Barras en dirección X creadas con ganchos:', numBarras);
        
        // ========================================
        // BARRAS EN DIRECCIÓN Z (van de adelante hacia atrás) + GANCHOS
        // ========================================
        const barGeomZ = new THREE.CylinderGeometry(barRadius, barRadius, largoUtil, 16);
        const ganchoGeomZ = new THREE.CylinderGeometry(barRadius, barRadius, longitudGancho, 16);
        
        for (let i = 0; i < numBarras; i++) {
            const x = inicioX + (i * espaciamiento);
            
            // Barra principal horizontal
            const barra = new THREE.Mesh(barGeomZ, barMaterial);
            barra.rotation.x = Math.PI / 2; // Horizontal en Z
            barra.position.set(x, yZapata + 0.02, 0); // Un poco arriba para que se crucen
            sceneAcero.add(barra);
            
            // GANCHO FRONTAL (sube verticalmente)
            const ganchoFront = new THREE.Mesh(ganchoGeomZ, barMaterial);
            ganchoFront.position.set(x, yZapata + 0.02 + longitudGancho/2, inicioZ);
            sceneAcero.add(ganchoFront);
            
            // GANCHO TRASERO (sube verticalmente)
            const ganchoBack = new THREE.Mesh(ganchoGeomZ, barMaterial);
            ganchoBack.position.set(x, yZapata + 0.02 + longitudGancho/2, inicioZ + largoUtil);
            sceneAcero.add(ganchoBack);
        }
        
        console.log('✓ Barras en dirección Z creadas con ganchos:', numBarras);
        console.log('✓ MALLA COMPLETA con ganchos en 4 caras:', numBarras * numBarras, 'intersecciones');
        
        // ========================================
        // BARRAS VERTICALES DE COLUMNA (ROJAS) - ANCLADAS EN ZAPATA CON GANCHO L
        // ========================================
        const alturaColumna = 2.0;
        const numBarrasColumna = 8;
        const recubCol = 0.04;
        const radioBarrasCol = (c / 2) - recubCol;
        
        const barRadiusCol = 0.012; // 12mm de radio visual
        
        // ALTURA TOTAL: desde dentro de la zapata hasta arriba de la columna
        const profundidadAnclaje = h - recubrimiento - 0.05; // Anclaje en zapata
        const alturaTotalBarra = alturaColumna + profundidadAnclaje;
        const y_inicio_barra = -Df + recubrimiento + 0.05; // Cerca del fondo de zapata
        const longitudGanchoBase = 0.30; // 30cm de gancho horizontal en L
        
        const barGeomCol = new THREE.CylinderGeometry(barRadiusCol, barRadiusCol, alturaTotalBarra, 16);
        const ganchoGeomCol = new THREE.CylinderGeometry(barRadiusCol, barRadiusCol, longitudGanchoBase, 16);
        
        const barMaterialCol = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0xff3333,
            emissiveIntensity: 0.8
        });
        
        console.log('Creando', numBarrasColumna, 'barras de columna ancladas con gancho en L...');
        console.log('Profundidad de anclaje en zapata:', profundidadAnclaje.toFixed(3), 'm');
        console.log('Longitud de gancho en L:', longitudGanchoBase, 'm');
        
        for (let i = 0; i < numBarrasColumna; i++) {
            const angulo = (2 * Math.PI * i) / numBarrasColumna;
            const x = radioBarrasCol * Math.cos(angulo);
            const z = radioBarrasCol * Math.sin(angulo);
            
            // BARRA VERTICAL
            const barra = new THREE.Mesh(barGeomCol, barMaterialCol);
            barra.position.set(x, y_inicio_barra + alturaTotalBarra/2, z);
            sceneAcero.add(barra);
            
            // GANCHO EN L HORIZONTAL (en la base, hacia afuera desde el centro)
            // Calcular dirección radial hacia afuera
            const dirX = Math.cos(angulo);
            const dirZ = Math.sin(angulo);
            
            const gancho = new THREE.Mesh(ganchoGeomCol, barMaterialCol);
            
            // Rotar el gancho para que vaya horizontal en dirección radial
            if (Math.abs(dirX) > Math.abs(dirZ)) {
                // Más horizontal en X
                gancho.rotation.z = Math.PI / 2;
                gancho.position.set(
                    x + (dirX * longitudGanchoBase / 2),
                    y_inicio_barra,
                    z
                );
            } else {
                // Más horizontal en Z
                gancho.rotation.x = Math.PI / 2;
                gancho.position.set(
                    x,
                    y_inicio_barra,
                    z + (dirZ * longitudGanchoBase / 2)
                );
            }
            
            sceneAcero.add(gancho);
        }
        
        console.log('✓ Barras de columna creadas con ganchos en L entrelazan con malla de zapata');
        
        // ========================================
        // ESTRIBOS DE COLUMNA (VERDES - ANILLOS)
        // ========================================
        const stirrupMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0x00ff00,
            emissiveIntensity: 0.9
        });
        
        const espaciamientoEstribos = 0.12; // 12cm
        const numEstribos = Math.floor(alturaColumna / espaciamientoEstribos);
        const anchoEstribo = c - 2 * recubCol;
        const stirrupRadius = 0.004; // Radio MÁS DELGADO (4mm en lugar de 6mm)
        
        console.log('Creando', numEstribos, 'estribos...');
        
        function crearEstribo(ancho, altura) {
            const shape = new THREE.Shape();
            const halfW = ancho / 2;
            
            // Rectángulo exterior
            shape.moveTo(-halfW, -halfW);
            shape.lineTo(halfW, -halfW);
            shape.lineTo(halfW, halfW);
            shape.lineTo(-halfW, halfW);
            shape.lineTo(-halfW, -halfW);
            
            // Agujero interior
            const innerOffset = stirrupRadius * 2; // Reducido también
            const hole = new THREE.Path();
            hole.moveTo(-halfW + innerOffset, -halfW + innerOffset);
            hole.lineTo(halfW - innerOffset, -halfW + innerOffset);
            hole.lineTo(halfW - innerOffset, halfW - innerOffset);
            hole.lineTo(-halfW + innerOffset, halfW - innerOffset);
            hole.lineTo(-halfW + innerOffset, -halfW + innerOffset);
            shape.holes.push(hole);
            
            const extrudeSettings = {
                depth: stirrupRadius * 3, // Profundidad más delgada
                bevelEnabled: true,
                bevelThickness: stirrupRadius * 1.0, // Bevel más delgado
                bevelSize: stirrupRadius * 1.0,
                bevelSegments: 2
            };
            
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, stirrupMaterial);
            mesh.rotation.x = Math.PI / 2;
            mesh.position.y = altura;
            sceneAcero.add(mesh);
        }
        
        for (let i = 0; i < numEstribos; i++) {
            const y = -Df + h + 0.1 + (i * espaciamientoEstribos);
            crearEstribo(anchoEstribo, y);
        }
        
        console.log('✓ Estribos creados (más delgados)');
        
        // ========================================
        // POSICIONAR CÁMARA PARA VISTA ÓPTIMA
        // ========================================
        const distancia = B * 1.5;
        cameraAcero.position.set(distancia, distancia * 0.8, distancia);
        cameraAcero.lookAt(0, -Df + h/2, 0);
        controlsAcero.target.set(0, -Df + h/2, 0);
        controlsAcero.update();
        
        console.log('===================================');
        console.log('✓ VISUALIZACIÓN COMPLETADA');
        console.log('Total barras zapata:', numBarras * 2);
        console.log('Total barras columna:', numBarrasColumna);
        console.log('Total estribos:', numEstribos);
        console.log('===================================');
        
    } catch (error) {
        console.error('ERROR en actualizarVisualizacionSoloAcero:', error);
        console.error(error.stack);
    }
}