/**
 * ESTRUCTURA DE LA SALA - Modelo 3D
 * Crea paredes, piso, techo de la sala de bombas
 */

const SalaEstructura = {
    /**
     * Crear estructura completa de la sala
     */
    crear: function(posiciones) {
        const grupo = new THREE.Group();
        grupo.name = 'EstructuraSala';

        const dim = posiciones.sala;
        const offset = posiciones.offsetSala || { x: 0, y: 0, z: 0 }; // ✅ AGREGADO
        const materiales = MaterialesSala.obtenerMateriales();

        // 1. Piso de la sala
        const piso = this.crearPiso(dim, materiales.pisoConcreto);
        grupo.add(piso);

        // 2. Paredes
        const paredes = this.crearParedes(dim, materiales.paredConcreto);
        grupo.add(paredes);

        // 3. Techo
        const techo = this.crearTecho(dim, materiales.techo);
        grupo.add(techo);

        // 4. Puerta de acceso
        const puerta = this.crearPuerta(dim);
        grupo.add(puerta);

        // 5. Drenaje
        const drenaje = this.crearDrenaje(dim);
        grupo.add(drenaje);

        // ✅ AGREGADO: Posicionar toda la estructura en el offset
        grupo.position.set(offset.x, offset.y, offset.z);

        return grupo;
    },

    /**
     * Crear piso de concreto
     */
    crearPiso: function(dim, material) {
        const grupo = new THREE.Group();

        // Losa de piso
        const geometriaPiso = new THREE.BoxGeometry(
            dim.ancho,
            0.2,
            dim.profundidad
        );
        const piso = new THREE.Mesh(geometriaPiso, material);
        piso.position.set(0, 0.1, 0);
        piso.receiveShadow = true;
        grupo.add(piso);

        // Líneas de juntas (detalles visuales)
        const numLineasX = 4;
        const numLineasZ = 4;

        for (let i = 1; i < numLineasX; i++) {
            const linea = this.crearLineaJunta(dim.profundidad, 'z');
            linea.position.set(
                -dim.ancho / 2 + (dim.ancho / numLineasX) * i,
                0.21,
                0
            );
            grupo.add(linea);
        }

        for (let i = 1; i < numLineasZ; i++) {
            const linea = this.crearLineaJunta(dim.ancho, 'x');
            linea.position.set(
                0,
                0.21,
                -dim.profundidad / 2 + (dim.profundidad / numLineasZ) * i
            );
            grupo.add(linea);
        }

        return grupo;
    },

    /**
     * Crear línea de junta en el piso
     */
    crearLineaJunta: function(longitud, direccion) {
        const geometria = new THREE.BoxGeometry(
            direccion === 'x' ? longitud : 0.01,
            0.005,
            direccion === 'z' ? longitud : 0.01
        );
        const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
        return new THREE.Mesh(geometria, material);
    },

    /**
     * Crear paredes de la sala
     */
    crearParedes: function(dim, material) {
        const grupo = new THREE.Group();
        const espesor = 0.2;

        // Pared frontal (con abertura para puerta)
        const paredFrontal = this.crearParedConPuerta(dim, material, espesor);
        paredFrontal.position.set(0, dim.altura / 2 + 0.2, -dim.profundidad / 2 - espesor / 2);
        grupo.add(paredFrontal);

        // Pared trasera
        const geometriaTrasera = new THREE.BoxGeometry(dim.ancho, dim.altura, espesor);
        const paredTrasera = new THREE.Mesh(geometriaTrasera, material);
        paredTrasera.position.set(0, dim.altura / 2 + 0.2, dim.profundidad / 2 + espesor / 2);
        paredTrasera.receiveShadow = true;
        paredTrasera.castShadow = true;
        grupo.add(paredTrasera);

        // Pared izquierda
        const geometriaIzq = new THREE.BoxGeometry(espesor, dim.altura, dim.profundidad + 2 * espesor);
        const paredIzq = new THREE.Mesh(geometriaIzq, material);
        paredIzq.position.set(-dim.ancho / 2 - espesor / 2, dim.altura / 2 + 0.2, 0);
        paredIzq.receiveShadow = true;
        paredIzq.castShadow = true;
        grupo.add(paredIzq);

        // Pared derecha (lado del estanque - más transparente o con ventana)
        const geometriaDer = new THREE.BoxGeometry(espesor, dim.altura, dim.profundidad + 2 * espesor);
        const paredDer = new THREE.Mesh(geometriaDer, material);
        paredDer.position.set(dim.ancho / 2 + espesor / 2, dim.altura / 2 + 0.2, 0);
        paredDer.receiveShadow = true;
        paredDer.castShadow = true;
        grupo.add(paredDer);

        return grupo;
    },

    /**
     * Crear pared frontal con abertura para puerta
     */
    crearParedConPuerta: function(dim, material, espesor) {
        const grupo = new THREE.Group();

        const anchoPuerta = 1.2;
        const altoPuerta = 2.2;

        // Parte superior de la pared (sobre la puerta)
        const geometriaSuperior = new THREE.BoxGeometry(
            dim.ancho,
            dim.altura - altoPuerta,
            espesor
        );
        const parteSuperior = new THREE.Mesh(geometriaSuperior, material);
        parteSuperior.position.y = (dim.altura - altoPuerta) / 2 + altoPuerta;
        parteSuperior.receiveShadow = true;
        parteSuperior.castShadow = true;
        grupo.add(parteSuperior);

        // Parte izquierda de la pared
        const geometriaIzq = new THREE.BoxGeometry(
            (dim.ancho - anchoPuerta) / 2,
            altoPuerta,
            espesor
        );
        const parteIzq = new THREE.Mesh(geometriaIzq, material);
        parteIzq.position.set(
            -dim.ancho / 2 + (dim.ancho - anchoPuerta) / 4,
            altoPuerta / 2,
            0
        );
        parteIzq.receiveShadow = true;
        parteIzq.castShadow = true;
        grupo.add(parteIzq);

        // Parte derecha de la pared
        const geometriaDer = new THREE.BoxGeometry(
            (dim.ancho - anchoPuerta) / 2,
            altoPuerta,
            espesor
        );
        const parteDer = new THREE.Mesh(geometriaDer, material);
        parteDer.position.set(
            dim.ancho / 2 - (dim.ancho - anchoPuerta) / 4,
            altoPuerta / 2,
            0
        );
        parteDer.receiveShadow = true;
        parteDer.castShadow = true;
        grupo.add(parteDer);

        // Marco de la puerta
        const marco = this.crearMarcoPuerta(anchoPuerta, altoPuerta);
        marco.position.y = altoPuerta / 2;
        grupo.add(marco);

        return grupo;
    },

    /**
     * Crear marco de puerta
     */
    crearMarcoPuerta: function(ancho, alto) {
        const grupo = new THREE.Group();
        const espesorMarco = 0.1;
        const profundidadMarco = 0.15;

        const materialMarco = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513,
            roughness: 0.8
        });

        // Lateral izquierdo
        const geometriaLateral = new THREE.BoxGeometry(espesorMarco, alto, profundidadMarco);
        const lateralIzq = new THREE.Mesh(geometriaLateral, materialMarco);
        lateralIzq.position.x = -ancho / 2 - espesorMarco / 2;
        grupo.add(lateralIzq);

        // Lateral derecho
        const lateralDer = new THREE.Mesh(geometriaLateral, materialMarco);
        lateralDer.position.x = ancho / 2 + espesorMarco / 2;
        grupo.add(lateralDer);

        // Superior
        const geometriaSuperior = new THREE.BoxGeometry(ancho + 2 * espesorMarco, espesorMarco, profundidadMarco);
        const superior = new THREE.Mesh(geometriaSuperior, materialMarco);
        superior.position.y = alto / 2 + espesorMarco / 2;
        grupo.add(superior);

        return grupo;
    },

    /**
     * Crear puerta metálica
     */
    crearPuerta: function(dim) {
        const grupo = new THREE.Group();

        const anchoPuerta = 1.0;
        const altoPuerta = 2.2;

        const materialPuerta = new THREE.MeshStandardMaterial({ 
            color: 0x4A4A4A,
            metalness: 0.6,
            roughness: 0.4
        });

        // Hoja de la puerta
        const geometriaPuerta = new THREE.BoxGeometry(anchoPuerta, altoPuerta, 0.05);
        const puerta = new THREE.Mesh(geometriaPuerta, materialPuerta);
        puerta.position.set(
            -0.5,
            altoPuerta / 2 + 0.2,
            -dim.profundidad / 2 - 0.15
        );
        puerta.castShadow = true;
        grupo.add(puerta);

        // Manija
        const geometriaManija = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 16);
        const materialManija = new THREE.MeshStandardMaterial({ 
            color: 0xFFD700,
            metalness: 0.8,
            roughness: 0.2
        });
        const manija = new THREE.Mesh(geometriaManija, materialManija);
        manija.position.set(
            -0.1,
            altoPuerta / 2 + 0.2,
            -dim.profundidad / 2 - 0.18
        );
        manija.rotation.z = Math.PI / 2;
        grupo.add(manija);

        return grupo;
    },

    /**
     * Crear techo
     */
    crearTecho: function(dim, material) {
        const espesor = 0.2;
        const geometria = new THREE.BoxGeometry(
            dim.ancho + 0.4,
            espesor,
            dim.profundidad + 0.4
        );
        const techo = new THREE.Mesh(geometria, material);
        techo.position.set(0, dim.altura + 0.2 + espesor / 2, 0);
        techo.receiveShadow = true;
        techo.castShadow = true;
        return techo;
    },

    /**
     * Crear sistema de drenaje
     */
    crearDrenaje: function(dim) {
        const grupo = new THREE.Group();

        // Rejilla de drenaje
        const geometriaRejilla = new THREE.BoxGeometry(0.3, 0.02, 0.3);
        const materialRejilla = new THREE.MeshStandardMaterial({ 
            color: 0x666666,
            metalness: 0.5
        });
        const rejilla = new THREE.Mesh(geometriaRejilla, materialRejilla);
        rejilla.position.set(dim.ancho / 3, 0.21, dim.profundidad / 3);
        grupo.add(rejilla);

        // Líneas de la rejilla
        for (let i = 0; i < 5; i++) {
            const linea = new THREE.Mesh(
                new THREE.BoxGeometry(0.28, 0.01, 0.02),
                materialRejilla
            );
            linea.position.set(
                dim.ancho / 3,
                0.22,
                dim.profundidad / 3 - 0.12 + i * 0.06
            );
            grupo.add(linea);
        }

        return grupo;
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SalaEstructura;
}