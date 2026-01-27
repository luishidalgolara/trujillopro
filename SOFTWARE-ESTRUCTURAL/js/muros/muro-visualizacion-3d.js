/**
 * MURO-VISUALIZACION-3D.JS
 * Renderizado 3D del muro de contención (geometría básica)
 */

const MuroVisualizacion3D = {
    /**
     * Actualizar visualización 3D del muro
     */
    actualizar(threeScene, datos) {
        threeScene.clearObjects();
        
        const H = datos.H;
        const B = datos.B;
        const t_base = datos.t_base;
        const t_corona = datos.t_corona;
        const h_zapata = datos.h_zapata;
        
        // Dimensiones de puntera y talón
        const puntera = 0.3;
        const talon = B - t_base - puntera;
        
        // Crear zapata como base
        const zapata = threeScene.createBox(B, h_zapata, 1.5, 0xBDBDBD, {
            x: 0, 
            y: h_zapata/2, 
            z: 0
        });
        
        // Crear shear key (llave de corte)
        const shear_key_width = 0.3;
        const shear_key_height = 0.3;
        const shear_key = threeScene.createBox(
            shear_key_width, 
            shear_key_height, 
            1.5, 
            0xA0A0A0, 
            {
                x: -puntera - t_base/2 + shear_key_width/2, 
                y: -shear_key_height/2, 
                z: 0
            }
        );
        
        // Crear muro trapezoidal
        this.crearMuroTrapezoidal(threeScene, H, t_base, t_corona, h_zapata, puntera);
        
        // Crear suelo retenido
        const suelo = threeScene.createBox(
            talon + 1.5, 
            H, 
            1.5, 
            0x8B4513, 
            {
                x: -puntera + t_base + (talon + 1.5)/2, 
                y: h_zapata + H/2, 
                z: 0
            }
        );
        suelo.material.transparent = true;
        suelo.material.opacity = 0.4;
        
        // Wireframes para mejor visualización
        this.agregarWireframes(threeScene, zapata, shear_key, H, t_base, t_corona, h_zapata, puntera);
        
        // Dimensiones principales
        this.agregarDimensiones(threeScene, B, H, t_base, t_corona, h_zapata, puntera);
        
        // Ajustar cámara
        threeScene.resetCamera({x: B * 1.8, y: H * 1.2, z: B * 2});
    },

    /**
     * Crear geometría trapezoidal del muro
     */
    crearMuroTrapezoidal(threeScene, H, t_base, t_corona, h_zapata, puntera) {
        const depth = 1.5;
        const geometry = new THREE.BufferGeometry();
        
        const x_base = -puntera - t_base/2;
        const x_top = -puntera - t_corona/2;
        
        const vertices = new Float32Array([
            // Cara frontal (z = depth/2)
            x_base, h_zapata, depth/2,
            x_base + t_base, h_zapata, depth/2,
            x_top + t_corona, h_zapata + H, depth/2,
            x_top, h_zapata + H, depth/2,
            
            // Cara trasera (z = -depth/2)
            x_base, h_zapata, -depth/2,
            x_base + t_base, h_zapata, -depth/2,
            x_top + t_corona, h_zapata + H, -depth/2,
            x_top, h_zapata + H, -depth/2
        ]);
        
        const indices = [
            0, 1, 2,  0, 2, 3,
            4, 6, 5,  4, 7, 6,
            0, 3, 7,  0, 7, 4,
            1, 5, 6,  1, 6, 2,
            3, 2, 6,  3, 6, 7,
            0, 4, 5,  0, 5, 1
        ];
        
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x95a5a6,
            side: THREE.DoubleSide
        });
        
        const muro = new THREE.Mesh(geometry, material);
        threeScene.scene.add(muro);
        
        return geometry;
    },

    /**
     * Agregar wireframes (bordes negros)
     */
    agregarWireframes(threeScene, zapata, shear_key, H, t_base, t_corona, h_zapata, puntera) {
        // Wireframe zapata
        const edges_zapata = new THREE.EdgesGeometry(zapata.geometry);
        const line_zapata = new THREE.LineSegments(
            edges_zapata, 
            new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
        );
        line_zapata.position.copy(zapata.position);
        threeScene.scene.add(line_zapata);
        
        // Wireframe muro
        const depth = 1.5;
        const x_base = -puntera - t_base/2;
        const x_top = -puntera - t_corona/2;
        
        const muroGeometry = this.crearMuroTrapezoidal(
            threeScene, H, t_base, t_corona, h_zapata, puntera
        );
        const edges_muro = new THREE.EdgesGeometry(muroGeometry);
        const line_muro = new THREE.LineSegments(
            edges_muro, 
            new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
        );
        threeScene.scene.add(line_muro);
        
        // Wireframe shear key
        const edges_shear = new THREE.EdgesGeometry(shear_key.geometry);
        const line_shear = new THREE.LineSegments(
            edges_shear, 
            new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
        );
        line_shear.position.copy(shear_key.position);
        threeScene.scene.add(line_shear);
    },

    /**
     * Agregar dimensiones al modelo 3D
     */
    agregarDimensiones(threeScene, B, H, t_base, t_corona, h_zapata, puntera) {
        const x_base = -puntera - t_base/2;
        const x_top = -puntera - t_corona/2;
        
        // Dimensión: Ancho total de zapata
        threeScene.addDimension(
            {x: -B/2, y: h_zapata + H + 0.4, z: 0}, 
            {x: B/2, y: h_zapata + H + 0.4, z: 0}, 
            `B = ${B.toFixed(2)} m`, 
            0.15
        );
        
        // Dimensión: Altura del muro
        threeScene.addDimension(
            {x: -B/2 - 0.6, y: h_zapata, z: 0}, 
            {x: -B/2 - 0.6, y: h_zapata + H, z: 0}, 
            `H = ${H.toFixed(2)} m`, 
            0.15
        );
        
        // Dimensión: Espesor en la base
        threeScene.addDimension(
            {x: x_base, y: h_zapata - 0.3, z: 0}, 
            {x: x_base + t_base, y: h_zapata - 0.3, z: 0}, 
            `${(t_base * 100).toFixed(0)} cm`, 
            0.1
        );
        
        // Dimensión: Espesor en la corona
        threeScene.addDimension(
            {x: x_top, y: h_zapata + H + 0.15, z: 0}, 
            {x: x_top + t_corona, y: h_zapata + H + 0.15, z: 0}, 
            `${(t_corona * 100).toFixed(0)} cm`, 
            0.1
        );
    }
};
