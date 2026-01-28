/**
 * VÁLVULAS DEL SISTEMA - Modelo 3D
 * Crea válvulas de compuerta, check, etc
 */

const ValvulasSistema = {
    /**
     * Crear todas las válvulas del sistema
     */
    crearValvulas: function(posicionesBombas, datos) {
        const grupo = new THREE.Group();
        grupo.name = 'Valvulas';

        posicionesBombas.forEach((posBomba, index) => {
            // Válvula de succión (antes de la bomba)
            const valvulaSuccion = this.crearValvulaCompuerta(0.08);
            valvulaSuccion.position.set(posBomba.x - 0.7, 0.3, posBomba.z);
            valvulaSuccion.rotation.y = Math.PI / 2;
            grupo.add(valvulaSuccion);

            // Válvula check (después de la bomba)
            const valvulaCheck = this.crearValvulaCheck(0.08);
            valvulaCheck.position.set(posBomba.x, 1.2, posBomba.z);
            grupo.add(valvulaCheck);

            // Válvula de impulsión
            const valvulaImpulsion = this.crearValvulaCompuerta(0.08);
            valvulaImpulsion.position.set(posBomba.x, 1.5, posBomba.z);
            grupo.add(valvulaImpulsion);
        });

        return grupo;
    },

    /**
     * Crear válvula de compuerta
     */
    crearValvulaCompuerta: function(diametro) {
        const grupo = new THREE.Group();
        const materiales = MaterialesSala.obtenerMateriales();

        // Cuerpo de la válvula
        const geometriaCuerpo = new THREE.CylinderGeometry(
            diametro * 1.5,
            diametro * 1.5,
            diametro * 2,
            8
        );
        const cuerpo = new THREE.Mesh(geometriaCuerpo, materiales.metalBronce);
        grupo.add(cuerpo);

        // Volante (rueda de operación)
        const geometriaVolante = new THREE.CylinderGeometry(
            diametro * 0.8,
            diametro * 0.8,
            diametro * 0.2,
            16
        );
        const volante = new THREE.Mesh(geometriaVolante, materiales.metalGris);
        volante.position.y = diametro * 2;
        grupo.add(volante);

        // Vástago (eje del volante)
        const geometriaVastago = new THREE.CylinderGeometry(
            diametro * 0.15,
            diametro * 0.15,
            diametro * 1.8,
            8
        );
        const vastago = new THREE.Mesh(geometriaVastago, materiales.acero);
        vastago.position.y = diametro * 1.1;
        grupo.add(vastago);

        // Radios del volante (4 brazos)
        for (let i = 0; i < 4; i++) {
            const angulo = (Math.PI * 2 * i) / 4;
            const geometriaRadio = new THREE.CylinderGeometry(
                diametro * 0.1,
                diametro * 0.1,
                diametro * 0.6,
                8
            );
            const radio = new THREE.Mesh(geometriaRadio, materiales.metalGris);
            radio.position.set(
                Math.cos(angulo) * diametro * 0.4,
                diametro * 2,
                Math.sin(angulo) * diametro * 0.4
            );
            radio.rotation.z = angulo + Math.PI / 2;
            grupo.add(radio);
        }

        return grupo;
    },

    /**
     * Crear válvula check (antirretorno)
     */
    crearValvulaCheck: function(diametro) {
        const grupo = new THREE.Group();
        const materiales = MaterialesSala.obtenerMateriales();

        // Cuerpo principal (más alargado que compuerta)
        const geometriaCuerpo = new THREE.CylinderGeometry(
            diametro * 1.3,
            diametro * 1.3,
            diametro * 3,
            8
        );
        const cuerpo = new THREE.Mesh(geometriaCuerpo, materiales.metalBronce);
        grupo.add(cuerpo);

        // Tapa superior (característica de la check)
        const geometriaTapa = new THREE.SphereGeometry(diametro * 1.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const tapa = new THREE.Mesh(geometriaTapa, materiales.metalBronce);
        tapa.position.y = diametro * 1.5;
        grupo.add(tapa);

        // Indicador de flujo (flecha)
        const geometriaFlecha = new THREE.ConeGeometry(diametro * 0.3, diametro * 0.5, 8);
        const materialFlecha = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
        const flecha = new THREE.Mesh(geometriaFlecha, materialFlecha);
        flecha.position.y = diametro * 1.5;
        flecha.rotation.x = Math.PI;
        grupo.add(flecha);

        return grupo;
    },

    /**
     * Crear válvula de bola
     */
    crearValvulaBola: function(diametro) {
        const grupo = new THREE.Group();
        const materiales = MaterialesSala.obtenerMateriales();

        // Cuerpo (más compacto)
        const geometriaCuerpo = new THREE.SphereGeometry(diametro * 1.2, 16, 16);
        const cuerpo = new THREE.Mesh(geometriaCuerpo, materiales.metalBronce);
        grupo.add(cuerpo);

        // Manija de operación
        const geometriaManija = new THREE.BoxGeometry(
            diametro * 2,
            diametro * 0.2,
            diametro * 0.3
        );
        const manija = new THREE.Mesh(geometriaManija, materiales.metalGris);
        manija.position.y = diametro * 1.2;
        grupo.add(manija);

        return grupo;
    },

    /**
     * Crear manómetro
     */
    crearManometro: function(posicion) {
        const grupo = new THREE.Group();
        const materiales = MaterialesSala.obtenerMateriales();

        // Cuerpo del manómetro (cilindro delgado)
        const geometriaCuerpo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 32);
        const cuerpo = new THREE.Mesh(geometriaCuerpo, materiales.metalGris);
        cuerpo.rotation.x = Math.PI / 2;
        grupo.add(cuerpo);

        // Carátula (círculo blanco)
        const geometriaCaratula = new THREE.CircleGeometry(0.075, 32);
        const materialCaratula = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        const caratula = new THREE.Mesh(geometriaCaratula, materialCaratula);
        caratula.position.z = 0.026;
        grupo.add(caratula);

        // Aguja indicadora
        const geometriaAguja = new THREE.CylinderGeometry(0.002, 0.002, 0.06, 8);
        const materialAguja = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
        const aguja = new THREE.Mesh(geometriaAguja, materialAguja);
        aguja.position.set(0.03, 0, 0.027);
        aguja.rotation.z = Math.PI / 2;
        grupo.add(aguja);

        // Conexión (pequeña tubería)
        const geometriaConexion = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 8);
        const conexion = new THREE.Mesh(geometriaConexion, materiales.metalBronce);
        conexion.position.z = -0.05;
        conexion.rotation.x = Math.PI / 2;
        grupo.add(conexion);

        grupo.position.set(posicion.x, posicion.y, posicion.z);
        return grupo;
    },

    /**
     * Crear filtro Y
     */
    crearFiltroY: function(diametro) {
        const grupo = new THREE.Group();
        const materiales = MaterialesSala.obtenerMateriales();

        // Cuerpo principal
        const geometriaCuerpo = new THREE.CylinderGeometry(
            diametro * 1.2,
            diametro * 1.2,
            diametro * 2,
            8
        );
        const cuerpo = new THREE.Mesh(geometriaCuerpo, materiales.metalBronce);
        grupo.add(cuerpo);

        // Cámara del filtro (en ángulo)
        const geometriaCamara = new THREE.CylinderGeometry(
            diametro * 0.8,
            diametro * 0.6,
            diametro * 2,
            8
        );
        const camara = new THREE.Mesh(geometriaCamara, materiales.metalBronce);
        camara.position.set(diametro * 0.8, -diametro * 0.8, 0);
        camara.rotation.z = Math.PI / 4;
        grupo.add(camara);

        // Tapa de limpieza
        const geometriaTapa = new THREE.CylinderGeometry(
            diametro * 0.7,
            diametro * 0.7,
            diametro * 0.2,
            6
        );
        const tapa = new THREE.Mesh(geometriaTapa, materiales.metalGris);
        tapa.position.set(diametro * 1.5, -diametro * 1.5, 0);
        tapa.rotation.z = Math.PI / 4;
        grupo.add(tapa);

        return grupo;
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValvulasSistema;
}
