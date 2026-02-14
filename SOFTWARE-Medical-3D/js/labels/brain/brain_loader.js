/**
 * brain_loader.js — GLTFLoader, PBR materials, partes, ground plane
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

(function waitEngine() {
    const B = window.__BRAIN3D;
    if (!B || !B.scene || !B.setLoad || !B.ls) { requestAnimationFrame(waitEngine); return; }

    const { scene, setLoad, ls } = B;

    setLoad(50, 'Cargando cerebro...');
    const parts = { cerebrum: null, cerebellum: null, brainstem: null };

    new GLTFLoader().load('brain.glb',
        (gltf) => {
            setLoad(80, 'Materiales PBR...');
            const brainModel = gltf.scene;

            // Center and scale
            const box = new THREE.Box3().setFromObject(brainModel);
            const size = box.getSize(new THREE.Vector3());
            const sc = 3.0 / Math.max(size.x, size.y, size.z);
            brainModel.scale.setScalar(sc);

            const scaledBox = new THREE.Box3().setFromObject(brainModel);
            const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
            brainModel.position.x -= scaledCenter.x;
            brainModel.position.y -= scaledCenter.y;
            brainModel.position.z -= scaledCenter.z;

            // Enhance materials
            brainModel.traverse((child) => {
                if (!child.isMesh) return;
                child.castShadow = true;
                child.receiveShadow = true;

                const mat = child.material;
                const mn = (mat.name || '').toLowerCase();

                const pm = new THREE.MeshPhysicalMaterial();
                if (mat.map) pm.map = mat.map;
                if (mat.normalMap) { pm.normalMap = mat.normalMap; pm.normalScale = new THREE.Vector2(1.5, 1.5) }
                if (mat.roughnessMap) pm.roughnessMap = mat.roughnessMap;
                if (mat.metalnessMap) pm.metalnessMap = mat.metalnessMap;

                pm.roughness = 0.65; pm.metalness = 0;
                pm.clearcoat = 0.15; pm.clearcoatRoughness = 0.4;
                pm.thickness = 0.5;
                pm.attenuationColor = new THREE.Color(0.85, 0.45, 0.38);
                pm.attenuationDistance = 2.0;
                pm.sheen = 0.25; pm.sheenRoughness = 0.5;
                pm.sheenColor = new THREE.Color(0.8, 0.5, 0.45);
                pm.emissive = new THREE.Color(0.15, 0.06, 0.05);
                pm.emissiveIntensity = 0.08;
                pm.envMapIntensity = 0.6;

                if (mn.includes('brain_low') || mn.includes('1001')) {
                    parts.cerebrum = child; pm.normalScale.set(1.8, 1.8); pm.clearcoat = 0.2;
                } else if (mn.includes('cerebellum') || mn.includes('1003')) {
                    parts.cerebellum = child; pm.roughness = 0.7; pm.normalScale.set(2.0, 2.0);
                } else if (mn.includes('stem') || mn.includes('1002')) {
                    parts.brainstem = child; pm.roughness = 0.55; pm.clearcoat = 0.1;
                }
                child.material = pm;
            });

            scene.add(brainModel);

            // Ground plane
            const gnd = new THREE.Mesh(
                new THREE.PlaneGeometry(20, 20),
                new THREE.MeshStandardMaterial({ color: 0x080b12, roughness: 0.95, transparent: true, opacity: 0.5 })
            );
            gnd.rotation.x = -Math.PI / 2;
            gnd.position.y = -2.5;
            gnd.receiveShadow = true;
            scene.add(gnd);

            // Exponer partes y modelo
            B.parts = parts;
            B.brainModel = brainModel;

            setLoad(100, '¡Listo!');
            setTimeout(() => ls.classList.add('hidden'), 500);
        },
        (p) => { if (p.total) setLoad(50 + (p.loaded / p.total) * 30, 'Descargando... ' + (p.loaded / 1024 | 0) + 'KB') },
        (e) => { console.error(e); setLoad(0, 'Error al cargar. Verifica que brain.glb esté en la misma carpeta.') }
    );
})();
