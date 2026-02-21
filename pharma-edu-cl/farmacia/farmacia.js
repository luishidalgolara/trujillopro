/* ============================================================
   FARMACIA MODULE JS — PharmaLab Chile
   Three.js 3D: Hero background + Molécula Paracetamol 3D
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. CANVAS HERO: partículas de fondo ──────────────────
    initHeroBackground();

    // ── 2. CANVAS 3D: Molécula de Paracetamol ───────────────
    initMolecula3D();

    // ── 3. NAV TOGGLE ────────────────────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
    }
});

/* ─── HERO BACKGROUND con Three.js ──────────────────────── */
function initHeroBackground() {
    const canvas = document.getElementById('farmaciaCanvas3D');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 8;

    // Partículas flotantes (pastillas / puntos)
    const geo = new THREE.BufferGeometry();
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
        color: 0x5b8dee,
        size: 0.08,
        transparent: true,
        opacity: 0.7
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Líneas de conexión (red farmacéutica)
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < 60; i++) {
        linePositions.push(
            (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10
        );
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x5b8dee, transparent: true, opacity: 0.12 });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    let frame = 0;
    function animate() {
        requestAnimationFrame(animate);
        frame++;
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0003;

        // Resize
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        if (canvas.width !== w || canvas.height !== h) {
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
    }
    animate();
}

/* ─── MOLÉCULA 3D — Paracetamol (C₈H₉NO₂) ──────────────── */
function initMolecula3D() {
    const canvas = document.getElementById('molecula3D');
    if (!canvas || typeof THREE === 'undefined') return;

    const W = canvas.offsetWidth || 700;
    const H = 420;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2, 9);
    camera.lookAt(0, 0, 0);

    // Luz ambiente + direccional
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0x5b8dee, 2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x7aa5ff, 1);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    // Colores por tipo de átomo (CPK)
    const COLORS = {
        C: 0x888888,  // Carbono gris
        H: 0xffffff,  // Hidrógeno blanco
        N: 0x3d7aff,  // Nitrógeno azul
        O: 0xff4444   // Oxígeno rojo
    };

    const RADII = {
        C: 0.35, H: 0.22, N: 0.35, O: 0.33
    };

    // Coordenadas aproximadas del Paracetamol (C₈H₉NO₂)
    // Anillo bencénico + grupo amida + grupo hidroxilo
    const atoms = [
        // Anillo bencénico (6 C)
        { type: 'C', pos: [ 0.00,  1.40, 0] },  // 0
        { type: 'C', pos: [ 1.21,  0.70, 0] },  // 1
        { type: 'C', pos: [ 1.21, -0.70, 0] },  // 2
        { type: 'C', pos: [ 0.00, -1.40, 0] },  // 3
        { type: 'C', pos: [-1.21, -0.70, 0] },  // 4
        { type: 'C', pos: [-1.21,  0.70, 0] },  // 5

        // Grupo -OH (hidroxilo, para-)
        { type: 'O', pos: [ 0.00,  2.80, 0] },  // 6
        { type: 'H', pos: [ 0.00,  3.55, 0.3] },// 7

        // Grupo -NHCOCH₃ (amida, para-)
        { type: 'N', pos: [ 0.00, -2.80, 0] },  // 8
        { type: 'C', pos: [ 0.00, -4.10, 0] },  // 9  carbonilo
        { type: 'O', pos: [ 1.10, -4.75, 0] },  // 10 O carbonilo
        { type: 'C', pos: [-1.30, -4.80, 0] },  // 11 metilo
        { type: 'H', pos: [-1.30, -5.90, 0.4] },// 12
        { type: 'H', pos: [-2.20, -4.35, 0.4] },// 13
        { type: 'H', pos: [-1.30, -4.80,-0.9] },// 14

        // H del NH
        { type: 'H', pos: [ 0.90, -3.25, 0.3] },// 15

        // H aromáticos (posiciones 1,3,5)
        { type: 'H', pos: [ 2.10,  1.15, 0.3] },// 16
        { type: 'H', pos: [ 2.10, -1.15, 0.3] },// 17
        { type: 'H', pos: [-2.10,  1.15, 0.3] },// 18
        { type: 'H', pos: [-2.10, -1.15, 0.3] },// 19
    ];

    const bonds = [
        // Anillo
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
        // OH
        [0,6],[6,7],
        // NHCOCH₃
        [3,8],[8,9],[9,10],[9,11],
        [11,12],[11,13],[11,14],
        // H aromáticos
        [1,16],[2,17],[5,18],[4,19],
        // H del NH
        [8,15]
    ];

    const molGroup = new THREE.Group();
    scene.add(molGroup);

    // Crear átomos (esferas)
    atoms.forEach(atom => {
        const geo = new THREE.SphereGeometry(RADII[atom.type], 20, 20);
        const mat = new THREE.MeshPhongMaterial({
            color: COLORS[atom.type],
            shininess: 90,
            specular: 0x444444
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...atom.pos);
        molGroup.add(mesh);
    });

    // Crear enlaces (cilindros)
    bonds.forEach(([i, j]) => {
        const a = new THREE.Vector3(...atoms[i].pos);
        const b = new THREE.Vector3(...atoms[j].pos);
        const dir = new THREE.Vector3().subVectors(b, a);
        const len = dir.length();
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

        const geo = new THREE.CylinderGeometry(0.07, 0.07, len, 10);
        const mat = new THREE.MeshPhongMaterial({
            color: 0x4a6fa5,
            shininess: 60,
            transparent: true,
            opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(mid);
        mesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir.normalize()
        );
        molGroup.add(mesh);
    });

    // Centrar molécula
    molGroup.position.y = 0.5;
    molGroup.scale.setScalar(0.62);

    // Mouse drag
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVel = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', e => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rotVel.y = dx * 0.012;
        rotVel.x = dy * 0.012;
        prevMouse = { x: e.clientX, y: e.clientY };
    });

    // Touch
    let prevTouch = null;
    canvas.addEventListener('touchstart', e => {
        prevTouch = e.touches[0];
    }, { passive: true });
    canvas.addEventListener('touchmove', e => {
        if (!prevTouch) return;
        const t = e.touches[0];
        rotVel.y = (t.clientX - prevTouch.clientX) * 0.015;
        rotVel.x = (t.clientY - prevTouch.clientY) * 0.015;
        prevTouch = t;
    }, { passive: true });
    canvas.addEventListener('touchend', () => { prevTouch = null; }, { passive: true });

    function animate() {
        requestAnimationFrame(animate);

        if (!isDragging) {
            rotVel.y *= 0.92;
            rotVel.x *= 0.92;
            molGroup.rotation.y += 0.006 + rotVel.y;
            molGroup.rotation.x += rotVel.x;
        } else {
            molGroup.rotation.y += rotVel.y;
            molGroup.rotation.x += rotVel.x;
            rotVel.y = 0;
            rotVel.x = 0;
        }

        // Resize
        const w = canvas.offsetWidth;
        if (renderer.domElement.width !== w) {
            renderer.setSize(w, H);
            camera.aspect = w / H;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
    }
    animate();
}
