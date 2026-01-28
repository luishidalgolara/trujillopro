/* ========================================
   GEOMETRÍA 3D DE MUROS CON VANOS - CORREGIDO
   ======================================== */

// Crear muro 3D con vanos (compatible con nueva firma)
function crearMuro3DConVanos(muro, color, centroComun, escala) {
    try {
        const puntos = muro.puntos;
        const altura = parseFloat(muro.altura) || 2.4;
        const espesor = parseFloat(muro.espesor) || 0.15;
        const tieneVanos = muro.vanos && muro.vanos.length > 0;

        const group = new THREE.Group();

        const primerPunto = puntos[0];
        const ultimoPunto = puntos[puntos.length - 1];
        const distancia = Math.sqrt(
            Math.pow(ultimoPunto.x - primerPunto.x, 2) + 
            Math.pow(ultimoPunto.y - primerPunto.y, 2)
        );
        
        const estaCerrado = distancia < 50;
        const limite = estaCerrado ? puntos.length - 1 : puntos.length - 1;

        // Usar centro común y escala
        const centroMuroX = centroComun ? centroComun.x : 0;
        const centroMuroZ = centroComun ? centroComun.y : 0;
        const escalaReal = escala || 0.1;

        for (let i = 0; i < limite; i++) {
            const p1 = puntos[i];
            const p2 = puntos[i + 1];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const longitudPixels = Math.sqrt(dx * dx + dy * dy);
            const longitudMetros = longitudPixels * escalaReal;

            if (longitudMetros < 0.01) continue;

            // Obtener vanos de este segmento
            const vanosSegmento = tieneVanos ? 
                muro.vanos.filter(v => v.segmento === i) : [];

            if (vanosSegmento.length === 0) {
                // Segmento sin vanos - método clásico
                const mesh = crearSegmentoSimple(p1, p2, altura, espesor, color, centroMuroX, centroMuroZ, escalaReal, dx, dy);
                group.add(mesh);
            } else {
                // Segmento con vanos - geometría dividida
                const meshes = crearSegmentoConVanos(p1, p2, altura, espesor, vanosSegmento, color, longitudMetros, centroMuroX, centroMuroZ, escalaReal, dx, dy);
                meshes.forEach(m => {
                    if (m) group.add(m);
                });
            }
        }

        return group;
    } catch (error) {
        console.error('Error creando muro 3D con vanos:', error);
        return null;
    }
}

// Segmento simple sin vanos
function crearSegmentoSimple(p1, p2, altura, espesor, color, centroX, centroZ, escala, dx, dy) {
    const longitudPixels = Math.sqrt(dx * dx + dy * dy);
    const longitudMetros = longitudPixels * escala;

    const geometry = new THREE.BoxGeometry(longitudMetros, altura, espesor);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    const centerX = ((p1.x + p2.x) / 2 - centroX) * escala;
    const centerZ = ((p1.y + p2.y) / 2 - centroZ) * escala;
    
    mesh.position.set(centerX, altura / 2, centerZ);
    mesh.rotation.y = Math.atan2(dy, dx);

    return mesh;
}

// Segmento con vanos (dividir en secciones)
function crearSegmentoConVanos(p1, p2, altura, espesor, vanos, color, longitudTotal, centroX, centroZ, escala, dx, dy) {
    const meshes = [];
    
    const angulo = Math.atan2(dy, dx);

    // Ordenar vanos por posición
    vanos.sort((a, b) => a.distanciaDesdeInicio - b.distanciaDesdeInicio);

    // Crear secciones entre vanos
    let posicionActual = 0;

    vanos.forEach((vano) => {
        const inicioVano = vano.distanciaDesdeInicio;
        const finVano = inicioVano + vano.ancho;

        // Sección ANTES del vano
        if (inicioVano > posicionActual) {
            const seccionAntes = crearSeccionMuro(
                p1, p2, altura, espesor, color,
                posicionActual, inicioVano, angulo, longitudTotal,
                centroX, centroZ, escala
            );
            if (seccionAntes) meshes.push(seccionAntes);
        }

        // Secciones ALREDEDOR del vano (arriba/abajo si es ventana)
        if (vano.tipo === 'ventana') {
            const alturaDesdeBase = vano.alturaDesdeBase || 1.0;
            const alturaVano = vano.alto;

            // Sección ABAJO de ventana
            if (alturaDesdeBase > 0.05) {
                const seccionAbajo = crearSeccionMuroAltura(
                    p1, p2, alturaDesdeBase, espesor, color,
                    inicioVano, finVano, angulo, 0, longitudTotal,
                    centroX, centroZ, escala
                );
                if (seccionAbajo) meshes.push(seccionAbajo);
            }

            // Sección ARRIBA de ventana
            const alturaArriba = altura - alturaDesdeBase - alturaVano;
            if (alturaArriba > 0.05) {
                const seccionArriba = crearSeccionMuroAltura(
                    p1, p2, alturaArriba, espesor, color,
                    inicioVano, finVano, angulo, alturaDesdeBase + alturaVano, longitudTotal,
                    centroX, centroZ, escala
                );
                if (seccionArriba) meshes.push(seccionArriba);
            }
        } else if (vano.tipo === 'puerta') {
            // PUERTAS: Agregar dintel arriba (si hay espacio)
            const alturaPuerta = vano.alto;
            const alturaDintel = altura - alturaPuerta;
            
            if (alturaDintel > 0.05) {
                const seccionDintel = crearSeccionMuroAltura(
                    p1, p2, alturaDintel, espesor, color,
                    inicioVano, finVano, angulo, alturaPuerta, longitudTotal,
                    centroX, centroZ, escala
                );
                if (seccionDintel) meshes.push(seccionDintel);
            }
        }

        posicionActual = finVano;
    });

    // Sección DESPUÉS del último vano
    if (posicionActual < longitudTotal - 0.05) {
        const seccionDespues = crearSeccionMuro(
            p1, p2, altura, espesor, color,
            posicionActual, longitudTotal, angulo, longitudTotal,
            centroX, centroZ, escala
        );
        if (seccionDespues) meshes.push(seccionDespues);
    }

    return meshes;
}

// Crear sección horizontal de muro
function crearSeccionMuro(p1, p2, altura, espesor, color, inicio, fin, angulo, longitudTotal, centroX, centroZ, escala) {
    const longitud = fin - inicio;
    if (longitud <= 0.01) return null;

    const factorMedio = (inicio + fin) / 2 / longitudTotal;

    const centerX = ((p1.x + (p2.x - p1.x) * factorMedio) - centroX) * escala;
    const centerZ = ((p1.y + (p2.y - p1.y) * factorMedio) - centroZ) * escala;

    const geometry = new THREE.BoxGeometry(longitud, altura, espesor);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(centerX, altura / 2, centerZ);
    mesh.rotation.y = angulo;

    return mesh;
}

// Crear sección vertical de muro (para ventanas)
function crearSeccionMuroAltura(p1, p2, alturaSeccion, espesor, color, inicio, fin, angulo, offsetY, longitudTotal, centroX, centroZ, escala) {
    const longitud = fin - inicio;
    if (longitud <= 0.01 || alturaSeccion <= 0.01) return null;

    const factorMedio = (inicio + fin) / 2 / longitudTotal;

    const centerX = ((p1.x + (p2.x - p1.x) * factorMedio) - centroX) * escala;
    const centerZ = ((p1.y + (p2.y - p1.y) * factorMedio) - centroZ) * escala;

    const geometry = new THREE.BoxGeometry(longitud, alturaSeccion, espesor);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(centerX, offsetY + alturaSeccion / 2, centerZ);
    mesh.rotation.y = angulo;

    return mesh;
}

window.crearMuro3DConVanos = crearMuro3DConVanos;