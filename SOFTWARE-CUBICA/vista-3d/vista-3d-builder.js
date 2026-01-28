/* ========================================
   CONSTRUCTOR 3D - VERSIÓN CORREGIDA
   ESCALA UNIFORME PARA RADIER, MUROS Y CUBIERTAS
   ======================================== */

function construirModelo3D() {
    limpiarEscena3D();

    const grupo = new THREE.Group();
    grupo.name = 'edificio';

    let elementosCreados = 0;

    // CALCULAR CENTRO COMÚN DE TODOS LOS ELEMENTOS
    let todosLosPuntos = [];
    
    if (typeof radieres !== 'undefined' && radieres.length > 0) {
        radieres.forEach(radier => {
            if (radier.puntos) {
                todosLosPuntos.push(...radier.puntos);
            }
        });
    }
    
    if (typeof murosHormigon !== 'undefined' && murosHormigon.length > 0) {
        murosHormigon.forEach(muro => {
            if (muro.puntos) {
                todosLosPuntos.push(...muro.puntos);
            }
        });
    }
    
    if (typeof murosAlbanileria !== 'undefined' && murosAlbanileria.length > 0) {
        murosAlbanileria.forEach(muro => {
            if (muro.puntos) {
                todosLosPuntos.push(...muro.puntos);
            }
        });
    }
    
    if (typeof tabiques !== 'undefined' && tabiques.length > 0) {
        tabiques.forEach(tabique => {
            if (tabique.puntos) {
                todosLosPuntos.push(...tabique.puntos);
            }
        });
    }
    
    if (typeof murosEstructurales !== 'undefined' && murosEstructurales.length > 0) {
        murosEstructurales.forEach(muro => {
            if (muro.puntos) {
                todosLosPuntos.push(...muro.puntos);
            }
        });
    }
    
    if (typeof cubiertas !== 'undefined' && cubiertas.length > 0) {
        cubiertas.forEach(cubierta => {
            if (cubierta.puntos) {
                todosLosPuntos.push(...cubierta.puntos);
            }
        });
    }
    
    // Calcular centro común
    let centroComun = { x: 0, y: 0 };
    if (todosLosPuntos.length > 0) {
        todosLosPuntos.forEach(p => {
            centroComun.x += p.x;
            centroComun.y += p.y;
        });
        centroComun.x /= todosLosPuntos.length;
        centroComun.y /= todosLosPuntos.length;
    }
    
    // CALCULAR ESCALA ÚNICA BASADA EN EL RADIER
    let escalaUnica = 0.1;
    if (typeof radieres !== 'undefined' && radieres.length > 0 && radieres[0].puntos && radieres[0].puntos.length >= 3) {
        const radier = radieres[0];
        const areaReal = parseFloat(radier.ancho) * parseFloat(radier.largo) || 100;
        
        let areaCanvas = 0;
        for (let i = 0; i < radier.puntos.length; i++) {
            const p1 = radier.puntos[i];
            const p2 = radier.puntos[(i + 1) % radier.puntos.length];
            areaCanvas += (p1.x * p2.y - p2.x * p1.y);
        }
        areaCanvas = Math.abs(areaCanvas / 2);
        
        escalaUnica = Math.sqrt(areaReal / areaCanvas);
    }
    
    console.log('🎯 Centro común:', centroComun);
    console.log('📏 Escala única:', escalaUnica.toFixed(4));

    // 1. RADIER
    if (typeof radieres !== 'undefined' && radieres.length > 0) {
        radieres.forEach(radier => {
            if (radier.puntos && radier.puntos.length >= 3) {
                const mesh = crearRadier3D(radier, centroComun, escalaUnica);
                if (mesh) {
                    grupo.add(mesh);
                    elementosCreados++;
                }
            }
        });
    }

    // 2. MUROS DE HORMIGÓN
    if (typeof murosHormigon !== 'undefined' && murosHormigon.length > 0) {
        murosHormigon.forEach(muro => {
            if (muro.puntos && muro.puntos.length >= 2 && muro.altura) {
                const mesh = crearMuro3D(muro, 0xff6b6b, centroComun, escalaUnica);
                if (mesh) {
                    grupo.add(mesh);
                    elementosCreados++;
                }
            }
        });
    }

    // 3. MUROS DE ALBAÑILERÍA
    if (typeof murosAlbanileria !== 'undefined' && murosAlbanileria.length > 0) {
        murosAlbanileria.forEach(muro => {
            if (muro.puntos && muro.puntos.length >= 2 && muro.altura) {
                const mesh = crearMuro3D(muro, 0xffa500, centroComun, escalaUnica);
                if (mesh) {
                    grupo.add(mesh);
                    elementosCreados++;
                }
            }
        });
    }

    // 4. TABIQUES
    if (typeof tabiques !== 'undefined' && tabiques.length > 0) {
        tabiques.forEach(tabique => {
            if (tabique.puntos && tabique.puntos.length >= 2 && tabique.altura) {
                const mesh = crearMuro3D(tabique, 0x4ecdc4, centroComun, escalaUnica);
                if (mesh) {
                    grupo.add(mesh);
                    elementosCreados++;
                }
            }
        });
    }

    // 5. MUROS ESTRUCTURALES
    if (typeof murosEstructurales !== 'undefined' && murosEstructurales.length > 0) {
        murosEstructurales.forEach(muro => {
            if (muro.puntos && muro.puntos.length >= 2 && muro.altura) {
                const mesh = crearMuro3D(muro, 0x95e1d3, centroComun, escalaUnica);
                if (mesh) {
                    grupo.add(mesh);
                    elementosCreados++;
                }
            }
        });
    }

    // 6. CUBIERTAS CON ESCALA UNIFORME
    if (typeof cubiertas !== 'undefined' && cubiertas.length > 0) {
        cubiertas.forEach(cubierta => {
            if (cubierta.puntos && cubierta.puntos.length >= 3) {
                const mesh = crearCubierta3D(cubierta, centroComun, escalaUnica);
                if (mesh) {
                    grupo.add(mesh);
                    elementosCreados++;
                }
            }
        });
    }

    vista3DState.scene.add(grupo);
    
    console.log(`✅ Modelo 3D construido: ${elementosCreados} elementos`);
    
    // Centrar cámara
    if (elementosCreados > 0) {
        ajustarCamara(grupo);
    }

    return elementosCreados;
}

/* ========================================
   RADIER 3D - ESCALA CORREGIDA
   ======================================== */
function crearRadier3D(radier, centroComun, escala) {
    try {
        console.log('🔲 Creando radier 3D:', radier);
        
        const centroX = centroComun.x;
        const centroZ = centroComun.y;
        
        console.log('🎯 Usando centro común:', centroX, centroZ);
        console.log('📏 Usando escala:', escala.toFixed(4));
        
        // Convertir puntos a coordenadas reales en metros (relativos al centro común)
        const puntosReales = radier.puntos.map(p => ({
            x: (p.x - centroX) * escala,
            y: (p.y - centroZ) * escala
        }));
        
        // Crear shape con puntos en metros
        const puntos = puntosReales.map(p => new THREE.Vector2(p.x, p.y));
        const shape = new THREE.Shape(puntos);
        
        const espesor = parseFloat(radier.espesor) || 0.1;
        console.log(`  - Espesor: ${espesor}m`);
        
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: espesor,
            bevelEnabled: false
        });

        const material = new THREE.MeshPhongMaterial({
            color: 0x808080,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.rotation.x = -Math.PI / 2;
        
        mesh.position.set(
            0,
            -espesor / 2,
            0
        );
        
        console.log('✅ Radier creado en escala 1:1 con forma exacta');

        return mesh;
    } catch (error) {
        console.error('❌ Error creando radier 3D:', error);
        return null;
    }
}

/* ========================================
   MURO 3D - ESCALA CORREGIDA
   ======================================== */
function crearMuro3D(muro, color, centroComun, escala) {
    try {
        const puntos = muro.puntos;
        const altura = parseFloat(muro.altura) || 2.4;
        const espesor = parseFloat(muro.espesor) || 0.15;

        const group = new THREE.Group();

        // Determinar si el polígono está cerrado
        const primerPunto = puntos[0];
        const ultimoPunto = puntos[puntos.length - 1];
        const distancia = Math.sqrt(
            Math.pow(ultimoPunto.x - primerPunto.x, 2) + 
            Math.pow(ultimoPunto.y - primerPunto.y, 2)
        );
        
        const estaCerrado = distancia < 50;
        
        console.log(`🔍 Muro con ${puntos.length} puntos, altura: ${altura}m, espesor: ${espesor}m`);
        console.log(`📏 Usando escala: ${escala.toFixed(4)}`);

        const limite = estaCerrado ? puntos.length - 1 : puntos.length - 1;

        const centroMuroX = centroComun.x;
        const centroMuroZ = centroComun.y;
        
        console.log('🎯 Usando centro común para muro:', centroMuroX, centroMuroZ);

        for (let i = 0; i < limite; i++) {
            const p1 = puntos[i];
            const p2 = puntos[i + 1];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const longitudSegmentoCanvas = Math.sqrt(dx * dx + dy * dy);
            
            // Convertir a metros reales
            const longitudSegmento = longitudSegmentoCanvas * escala;

            // Ignorar segmentos muy pequeños
            if (longitudSegmento < 0.01) {
                console.log(`⚠️ Segmento ${i} ignorado (muy pequeño: ${longitudSegmento.toFixed(3)}m)`);
                continue;
            }

            // Geometría del segmento en METROS REALES
            const geometry = new THREE.BoxGeometry(longitudSegmento, altura, espesor);
            const material = new THREE.MeshPhongMaterial({ color: color });
            const mesh = new THREE.Mesh(geometry, material);

            // Posición relativa al centro común
            const centerX = ((p1.x + p2.x) / 2 - centroMuroX) * escala;
            const centerZ = ((p1.y + p2.y) / 2 - centroMuroZ) * escala;
            
            mesh.position.set(centerX, altura / 2, centerZ);
            mesh.rotation.y = Math.atan2(dy, dx);

            group.add(mesh);
        }

        console.log(`✅ Muro creado con ${group.children.length} segmentos en escala 1:1`);
        return group;
    } catch (error) {
        console.error('Error creando muro 3D:', error);
        return null;
    }
}

// ========================================
// CUBIERTA 3D CON ESCALA UNIFORME
// ========================================
function crearCubierta3D(cubierta, centroComun, escala) {
    try {
        console.log('🏠 Creando cubierta 3D:', cubierta);
        console.log('📏 Usando escala:', escala.toFixed(4));
        
        const puntos2D = cubierta.puntos;
        const pendienteGrados = parseFloat(cubierta.pendienteGrados) || 0;
        const numeroAguas = parseInt(cubierta.numeroAguas) || 1;
        
        // Altura de los muros en metros (no en escala /10)
        const alturaMuros = 2.4;
        
        if (pendienteGrados === 0) {
            return crearTechoPlano(puntos2D, alturaMuros, centroComun, escala);
        }
        
        if (numeroAguas === 1) {
            return crearTechoUnAgua(puntos2D, pendienteGrados, alturaMuros, centroComun, escala);
        } else if (numeroAguas === 2) {
            return crearTechoDosAguas(puntos2D, pendienteGrados, alturaMuros, centroComun, escala);
        } else {
            return crearTechoCuatroAguas(puntos2D, pendienteGrados, alturaMuros, centroComun, escala);
        }
        
    } catch (error) {
        console.error('Error creando cubierta 3D:', error);
        return null;
    }
}

// TECHO PLANO
function crearTechoPlano(puntos2D, alturaBase, centroComun, escala) {
    const centroX = centroComun.x;
    const centroZ = centroComun.y;
    
    // Convertir puntos usando escala uniforme
    const puntosReales = puntos2D.map(p => ({
        x: (p.x - centroX) * escala,
        y: (p.y - centroZ) * escala
    }));
    
    const puntos = puntosReales.map(p => new THREE.Vector2(p.x, p.y));
    const shape = new THREE.Shape(puntos);
    
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshPhongMaterial({
        color: 0x8b4513,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = alturaBase + 0.1;

    return mesh;
}

// TECHO 1 AGUA
function crearTechoUnAgua(puntos2D, pendienteGrados, alturaBase, centroComun, escala) {
    const geometry = new THREE.BufferGeometry();
    
    const centroX = centroComun.x;
    const centroZ = centroComun.y;
    
    // Convertir puntos usando escala uniforme
    const puntosReales = puntos2D.map(p => ({
        x: (p.x - centroX) * escala,
        y: (p.y - centroZ) * escala
    }));
    
    let minY = Infinity, maxY = -Infinity;
    puntosReales.forEach(p => {
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    });
    
    const rangoY = maxY - minY;
    const elevacionMax = rangoY * Math.tan(pendienteGrados * Math.PI / 180);
    
    const vertices = [];
    const indices = [];
    
    puntosReales.forEach(p => {
        const factorAltura = (p.y - minY) / rangoY;
        const altura = alturaBase + (elevacionMax * factorAltura);
        vertices.push(p.x, altura, p.y);
    });
    
    for (let i = 1; i < puntosReales.length - 1; i++) {
        indices.push(0, i, i + 1);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x8b4513,
        side: THREE.DoubleSide
    });
    
    return new THREE.Mesh(geometry, material);
}

// TECHO 2 AGUAS
function crearTechoDosAguas(puntos2D, pendienteGrados, alturaBase, centroComun, escala) {
    const geometry = new THREE.BufferGeometry();
    
    const centroX = centroComun.x;
    const centroZ = centroComun.y;
    
    // Convertir puntos usando escala uniforme
    const puntosReales = puntos2D.map(p => ({
        x: (p.x - centroX) * escala,
        y: (p.y - centroZ) * escala
    }));
    
    let centroRealX = 0, centroRealY = 0;
    puntosReales.forEach(p => {
        centroRealX += p.x;
        centroRealY += p.y;
    });
    centroRealX /= puntosReales.length;
    centroRealY /= puntosReales.length;
    
    let maxDist = 0;
    puntosReales.forEach(p => {
        const dist = Math.sqrt((p.x - centroRealX) ** 2 + (p.y - centroRealY) ** 2);
        if (dist > maxDist) maxDist = dist;
    });
    
    const elevacionCumbrera = maxDist * Math.tan(pendienteGrados * Math.PI / 180);
    const alturaCumbrera = alturaBase + elevacionCumbrera;
    
    const vertices = [];
    const indices = [];
    
    vertices.push(centroRealX, alturaCumbrera, centroRealY);
    
    puntosReales.forEach(p => {
        vertices.push(p.x, alturaBase, p.y);
    });
    
    for (let i = 0; i < puntosReales.length; i++) {
        const next = (i + 1) % puntosReales.length;
        indices.push(0, i + 1, next + 1);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x8b4513,
        side: THREE.DoubleSide
    });
    
    return new THREE.Mesh(geometry, material);
}

// TECHO 4 AGUAS
function crearTechoCuatroAguas(puntos2D, pendienteGrados, alturaBase, centroComun, escala) {
    const geometry = new THREE.BufferGeometry();
    
    const centroX = centroComun.x;
    const centroZ = centroComun.y;
    
    // Convertir puntos usando escala uniforme
    const puntosReales = puntos2D.map(p => ({
        x: (p.x - centroX) * escala,
        y: (p.y - centroZ) * escala
    }));
    
    let centroRealX = 0, centroRealY = 0;
    puntosReales.forEach(p => {
        centroRealX += p.x;
        centroRealY += p.y;
    });
    centroRealX /= puntosReales.length;
    centroRealY /= puntosReales.length;
    
    let maxDist = 0;
    puntosReales.forEach(p => {
        const dist = Math.sqrt((p.x - centroRealX) ** 2 + (p.y - centroRealY) ** 2);
        if (dist > maxDist) maxDist = dist;
    });
    
    const elevacionCuspide = maxDist * Math.tan(pendienteGrados * Math.PI / 180);
    const alturaCuspide = alturaBase + elevacionCuspide;
    
    const vertices = [];
    const indices = [];
    
    vertices.push(centroRealX, alturaCuspide, centroRealY);
    
    puntosReales.forEach(p => {
        vertices.push(p.x, alturaBase, p.y);
    });
    
    for (let i = 0; i < puntosReales.length; i++) {
        const next = (i + 1) % puntosReales.length;
        indices.push(0, i + 1, next + 1);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x8b4513,
        side: THREE.DoubleSide
    });
    
    return new THREE.Mesh(geometry, material);
}

function ajustarCamara(grupo) {
    const box = new THREE.Box3().setFromObject(grupo);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = vista3DState.camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    
    cameraZ *= 2;
    
    vista3DState.camera.position.set(center.x + cameraZ, center.y + cameraZ, center.z + cameraZ);
    vista3DState.camera.lookAt(center);
}

window.construirModelo3D = construirModelo3D;