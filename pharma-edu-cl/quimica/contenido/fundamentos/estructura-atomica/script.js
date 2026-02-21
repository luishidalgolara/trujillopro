/* ============================================
   ESTRUCTURA ATÓMICA — 3D ATOM VIEWER
   Three.js Interactive Atom Visualization
   ============================================ */

const ELEMENTS = {
    H:  { z:1,  name:'Hidrógeno',  config:'1s¹',                    shells:[1],           color:0x00e5a0 },
    C:  { z:6,  name:'Carbono',    config:'1s² 2s² 2p²',            shells:[2,4],         color:0x5b8dee },
    N:  { z:7,  name:'Nitrógeno',  config:'1s² 2s² 2p³',            shells:[2,5],         color:0x4488ff },
    O:  { z:8,  name:'Oxígeno',    config:'1s² 2s² 2p⁴',            shells:[2,6],         color:0xe056a0 },
    Na: { z:11, name:'Sodio',      config:'[Ne] 3s¹',               shells:[2,8,1],       color:0xf0a030 },
    Cl: { z:17, name:'Cloro',      config:'[Ne] 3s² 3p⁵',           shells:[2,8,7],       color:0x44cc88 },
    Fe: { z:26, name:'Hierro',     config:'[Ar] 3d⁶ 4s²',           shells:[2,8,14,2],    color:0xcc6644 },
};

let scene, camera, renderer, atomGroup;
let mouseDown = false, mouseX = 0, mouseY = 0;
let targetRotX = 0, targetRotY = 0, currentRotX = 0, currentRotY = 0;
let currentElement = 'H';

document.addEventListener('DOMContentLoaded', () => {
    initViewer();
    initControls();
    initSidebarScroll();
    animate();
});

function initViewer() {
    const container = document.getElementById('atomViewer');
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00e5a0, 1.2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x5b8dee, 0.6, 100);
    pointLight2.position.set(-10, -5, 8);
    scene.add(pointLight2);

    atomGroup = new THREE.Group();
    scene.add(atomGroup);

    buildAtom('H');

    // Mouse controls
    container.addEventListener('mousedown', (e) => { mouseDown = true; mouseX = e.clientX; mouseY = e.clientY; });
    container.addEventListener('mousemove', (e) => {
        if (!mouseDown) return;
        targetRotY += (e.clientX - mouseX) * 0.005;
        targetRotX += (e.clientY - mouseY) * 0.005;
        mouseX = e.clientX; mouseY = e.clientY;
    });
    container.addEventListener('mouseup', () => { mouseDown = false; });
    container.addEventListener('mouseleave', () => { mouseDown = false; });

    // Touch controls
    container.addEventListener('touchstart', (e) => { mouseDown = true; mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; });
    container.addEventListener('touchmove', (e) => {
        if (!mouseDown) return;
        e.preventDefault();
        targetRotY += (e.touches[0].clientX - mouseX) * 0.005;
        targetRotX += (e.touches[0].clientY - mouseY) * 0.005;
        mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY;
    }, { passive: false });
    container.addEventListener('touchend', () => { mouseDown = false; });

    // Scroll zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z = Math.max(5, Math.min(25, camera.position.z + e.deltaY * 0.01));
    }, { passive: false });

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function buildAtom(symbol) {
    // Clear previous
    while (atomGroup.children.length > 0) {
        const child = atomGroup.children[0];
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
        atomGroup.remove(child);
    }

    const el = ELEMENTS[symbol];
    if (!el) return;
    currentElement = symbol;

    // Update info panel
    document.getElementById('infoSymbol').textContent = symbol;
    document.getElementById('infoName').textContent = el.name;
    document.getElementById('infoZ').textContent = `Z = ${el.z}`;
    document.getElementById('infoConfig').textContent = `Config: ${el.config}`;
    const totalE = el.shells.reduce((a, b) => a + b, 0);
    document.getElementById('infoElectrons').textContent = `Electrones: ${totalE}`;

    // Nucleus
    const nucleusSize = 0.3 + Math.log(el.z + 1) * 0.15;
    const nucleusGeo = new THREE.SphereGeometry(nucleusSize, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({
        color: el.color,
        emissive: el.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    atomGroup.add(nucleus);

    // Nucleus glow
    const glowGeo = new THREE.SphereGeometry(nucleusSize * 1.8, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: el.color,
        transparent: true,
        opacity: 0.12,
    });
    atomGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // Proton/Neutron dots inside nucleus
    const numNucleons = Math.min(el.z * 2, 20);
    for (let i = 0; i < numNucleons; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.random() * nucleusSize * 0.7;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const isProton = i < el.z;
        const dotMat = new THREE.MeshBasicMaterial({
            color: isProton ? 0xff5050 : 0xaaaaaa,
            transparent: true,
            opacity: 0.8
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(x, y, z);
        atomGroup.add(dot);
    }

    // Electron shells
    el.shells.forEach((electronCount, shellIndex) => {
        const radius = 1.8 + shellIndex * 1.6;

        // Orbit ring
        const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 128);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.06,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);

        // Random tilt for each shell
        const tiltX = shellIndex * 0.4 + Math.random() * 0.3;
        const tiltZ = shellIndex * 0.3 + Math.random() * 0.2;
        ring.rotation.x = tiltX;
        ring.rotation.z = tiltZ;
        atomGroup.add(ring);

        // Additional orbit ring at different angle
        if (electronCount > 3) {
            const ring2 = ring.clone();
            ring2.rotation.x = tiltX + Math.PI / 3;
            ring2.rotation.y = Math.PI / 4;
            atomGroup.add(ring2);
        }

        // Electrons
        for (let e = 0; e < electronCount; e++) {
            const electronGeo = new THREE.SphereGeometry(0.12, 16, 16);
            const electronMat = new THREE.MeshPhongMaterial({
                color: 0x00e5a0,
                emissive: 0x00e5a0,
                emissiveIntensity: 0.8,
            });
            const electron = new THREE.Mesh(electronGeo, electronMat);

            // Electron glow
            const eGlowGeo = new THREE.SphereGeometry(0.22, 16, 16);
            const eGlowMat = new THREE.MeshBasicMaterial({
                color: 0x00e5a0,
                transparent: true,
                opacity: 0.2,
            });
            const eGlow = new THREE.Mesh(eGlowGeo, eGlowMat);
            electron.add(eGlow);

            electron.userData = {
                radius: radius,
                speed: 0.5 + Math.random() * 0.3 - shellIndex * 0.08,
                angle: (e / electronCount) * Math.PI * 2,
                tiltX: tiltX + (e % 2 === 0 ? 0 : Math.PI / (3 + shellIndex)),
                tiltZ: tiltZ + (e % 3 === 0 ? Math.PI / 5 : 0),
                shellIndex: shellIndex,
            };
            atomGroup.add(electron);
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Smooth rotation
    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;

    if (atomGroup) {
        atomGroup.rotation.x = currentRotX;
        atomGroup.rotation.y = currentRotY + time * 0.1;

        // Animate electrons
        atomGroup.children.forEach(child => {
            if (child.userData && child.userData.radius) {
                const d = child.userData;
                const angle = d.angle + time * d.speed;
                const r = d.radius;
                child.position.x = r * Math.cos(angle) * Math.cos(d.tiltZ) - r * Math.sin(angle) * Math.sin(d.tiltX) * Math.sin(d.tiltZ);
                child.position.y = r * Math.sin(angle) * Math.cos(d.tiltX);
                child.position.z = r * Math.cos(angle) * Math.sin(d.tiltZ) + r * Math.sin(angle) * Math.sin(d.tiltX) * Math.cos(d.tiltZ);
            }
        });
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function initControls() {
    const buttons = document.querySelectorAll('.ctrl-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            buildAtom(btn.dataset.element);
        });
    });
}

function initSidebarScroll() {
    const links = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');

    if (links.length === 0 || sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.sidebar-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
}
