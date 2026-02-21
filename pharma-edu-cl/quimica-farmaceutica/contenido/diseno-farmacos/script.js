/* ============================================================
   DISEÑO DE FÁRMACOS — 3D Molecular Viewer + Interactives
   PharmaLab Chile — Química Farmacéutica
   ============================================================ */

'use strict';

/* ── DRUG MOLECULES DATABASE ─────────────────────────────── */
const DRUG_MOLECULES = {
    aspirina: {
        label: '<strong>Ácido Acetilsalicílico (Aspirina)</strong><br><span>AINE · Inhibidor irreversible de COX-1/COX-2 · PM: 180.2 g/mol</span>',
        atoms: [
            // Anillo bencénico (6 carbonos)
            { pos: [0,    1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.21, 0.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.21,-0.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [0,   -1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.21,-0.7, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.21, 0.7, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Grupo carboxílico -COOH
            { pos: [2.5,  1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [3.4,  0.7,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [2.5,  2.5,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [3.6,  2.8,  0], color: 0x00e5a0, size: 0.22, label: 'H' },
            // Grupo acetilo -OCOCH3
            { pos: [-2.5, 1.4,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [-3.5, 0.8,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-3.5,-0.5,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [-4.8, 1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
        ],
        bonds: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,0], // anillo
            [0,6],[6,7],[6,8],[8,9],              // COOH
            [5,10],[10,11],[11,12],[11,13]         // acetilo
        ],
        aromaticRing: true
    },
    imatinib: {
        label: '<strong>Imatinib (Gleevec®)</strong><br><span>Inhibidor BCR-ABL · Leucemia mieloide crónica · PM: 493.6 g/mol</span>',
        atoms: [
            // Core pirimidina
            { pos: [0,    0,    0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [1.35, 0.78, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.35,-0.78, 0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [0,   -1.56, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.35,-0.78,0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.35, 0.78,0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Enlazador amida
            { pos: [2.7,  1.4,  0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [3.9,  0.8,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [3.9, -0.5,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            // Anillo bencénico 1
            { pos: [5.1,  1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [6.2,  0.9,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [6.2, -0.3,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [5.1, -0.9,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [4.0, -0.3,  0.8], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Piperazina
            { pos: [-2.7, 1.5,  0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [-3.9, 0.8,  0.8],color:0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-4.9, 1.5,  0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [-3.9, 2.2, -0.8],color:0x5b8dee, size: 0.38, label: 'C' },
            // Metilo terminal
            { pos: [-6.1, 1.0,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
        ],
        bonds: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
            [1,6],[6,7],[7,8],[7,9],
            [9,10],[10,11],[11,12],[12,13],
            [5,14],[14,15],[15,16],[16,17],[17,14],
            [16,18]
        ]
    },
    ibuprofeno: {
        label: '<strong>Ibuprofeno</strong><br><span>AINE · Inhibidor reversible de COX · PM: 206.3 g/mol</span>',
        atoms: [
            // Anillo bencénico
            { pos: [0,    1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.21, 0.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.21,-0.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [0,   -1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.21,-0.7, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.21, 0.7, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Cadena isobutilo
            { pos: [2.4,  1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [3.6,  0.8,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [4.8,  1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [3.6, -0.6,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Ácido propiónico
            { pos: [-2.4, 1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-3.2, 0.6,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-4.5, 0.6,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [-3.0,-0.6,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [-4.2,-0.6,  0], color: 0x00e5a0, size: 0.22, label: 'H' },
            { pos: [-1.8, 2.6,  0], color: 0x5b8dee, size: 0.32, label: 'CH₃' },
        ],
        bonds: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
            [1,6],[6,7],[7,8],[7,9],
            [5,10],[10,11],[11,12],[11,13],[13,14],[10,15]
        ],
        aromaticRing: true
    },
    sildenafil: {
        label: '<strong>Sildenafil (Viagra®)</strong><br><span>Inhibidor PDE-5 · Disfunción eréctil e hipertensión pulmonar · PM: 474.6 g/mol</span>',
        atoms: [
            // Núcleo pirazino[1,2,3-cd]indazol
            { pos: [0,    0,    0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [1.3,  0.75, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [2.6,  0,    0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [2.6, -1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.3, -2.25, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [0,   -1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Grupo sulfonilo -SO2-
            { pos: [3.9,  0.75, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [5.1,  0,    0], color: 0xffaa00, size: 0.46, label: 'S' },
            { pos: [5.1,  1.4,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [5.1, -1.4,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            // Piperazina
            { pos: [6.4,  0,    0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [7.2,  1.2,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [8.5,  1.2,  0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [9.3,  0,    0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [8.5, -1.2,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [7.2, -1.2,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // Metil
            { pos: [9.8,  1.0,  0], color: 0x5b8dee, size: 0.32, label: 'CH₃' },
            // Etoxifenilo
            { pos: [-1.3,-2.25, 0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [-2.6,-1.5,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
        ],
        bonds: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
            [2,6],[6,7],[7,8],[7,9],[7,10],
            [10,11],[11,12],[12,13],[13,14],[14,15],[15,10],
            [12,16],
            [4,17],[17,18]
        ]
    },
    paracetamol: {
        label: '<strong>Paracetamol (Acetaminofén)</strong><br><span>Analgésico/antipirético · Mecanismo central · PM: 151.2 g/mol</span>',
        atoms: [
            // Anillo bencénico
            { pos: [0,    1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.21, 0.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.21,-0.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [0,   -1.4,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.21,-0.7, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [-1.21, 0.7, 0], color: 0x5b8dee, size: 0.38, label: 'C' },
            // OH para
            { pos: [0,   -2.7,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [0,   -3.8,  0], color: 0x00e5a0, size: 0.22, label: 'H' },
            // Amida
            { pos: [0,    2.75, 0], color: 0x4488ff, size: 0.42, label: 'N' },
            { pos: [0,    4.0,  0], color: 0x5b8dee, size: 0.38, label: 'C' },
            { pos: [1.2,  4.7,  0], color: 0xe056a0, size: 0.42, label: 'O' },
            { pos: [-1.2, 4.7,  0], color: 0x5b8dee, size: 0.38, label: 'C' }, // CH3
        ],
        bonds: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
            [3,6],[6,7],
            [0,8],[8,9],[9,10],[9,11]
        ],
        aromaticRing: true
    }
};

/* ── THREE.JS VIEWER ─────────────────────────────────────── */
let scene, camera, renderer, molGroup;
let mouseDown = false, mouseX = 0, mouseY = 0;
let targetRotX = 0, targetRotY = 0, currentRotX = 0, currentRotY = 0;

document.addEventListener('DOMContentLoaded', () => {
    initViewer();
    initMolControls();
    initPropertyBars();
    initFunnelAnimation();
    animate();
});

function initViewer() {
    const container = document.getElementById('drugViewer');
    if (!container || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.z = 14;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light1 = new THREE.PointLight(0xe056a0, 1.2, 80);
    light1.position.set(10, 10, 10);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x5b8dee, 0.7, 80);
    light2.position.set(-10, -6, 8);
    scene.add(light2);
    const light3 = new THREE.PointLight(0x00e5a0, 0.4, 60);
    light3.position.set(0, -12, 5);
    scene.add(light3);

    molGroup = new THREE.Group();
    scene.add(molGroup);
    buildDrugMolecule('aspirina');

    // Mouse events
    container.addEventListener('mousedown', e => { mouseDown = true; mouseX = e.clientX; mouseY = e.clientY; });
    container.addEventListener('mousemove', e => {
        if (!mouseDown) return;
        targetRotY += (e.clientX - mouseX) * 0.006;
        targetRotX += (e.clientY - mouseY) * 0.006;
        mouseX = e.clientX; mouseY = e.clientY;
    });
    container.addEventListener('mouseup', () => { mouseDown = false; });
    container.addEventListener('mouseleave', () => { mouseDown = false; });

    // Touch events
    container.addEventListener('touchstart', e => { mouseDown = true; mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; });
    container.addEventListener('touchmove', e => {
        if (!mouseDown) return;
        e.preventDefault();
        targetRotY += (e.touches[0].clientX - mouseX) * 0.006;
        targetRotX += (e.touches[0].clientY - mouseY) * 0.006;
        mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY;
    }, { passive: false });
    container.addEventListener('touchend', () => { mouseDown = false; });

    // Wheel zoom
    container.addEventListener('wheel', e => {
        e.preventDefault();
        camera.position.z = Math.max(6, Math.min(22, camera.position.z + e.deltaY * 0.015));
    }, { passive: false });

    // Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function buildDrugMolecule(id) {
    // Clear
    while (molGroup.children.length > 0) {
        const ch = molGroup.children[0];
        if (ch.geometry) ch.geometry.dispose();
        if (ch.material) ch.material.dispose();
        molGroup.remove(ch);
    }

    const mol = DRUG_MOLECULES[id];
    if (!mol) return;

    const labelEl = document.getElementById('drugLabel');
    if (labelEl) labelEl.innerHTML = mol.label;

    // Build atoms
    mol.atoms.forEach(a => {
        const geo = new THREE.SphereGeometry(a.size, 32, 32);
        const mat = new THREE.MeshPhongMaterial({
            color: a.color,
            emissive: a.color,
            emissiveIntensity: 0.25,
            transparent: true,
            opacity: 0.92,
            shininess: 80
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...a.pos);
        molGroup.add(mesh);

        // Glow sphere
        const glowGeo = new THREE.SphereGeometry(a.size * 1.8, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({ color: a.color, transparent: true, opacity: 0.07 });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.set(...a.pos);
        molGroup.add(glow);
    });

    // Build bonds
    mol.bonds.forEach(([i, j]) => {
        if (i >= mol.atoms.length || j >= mol.atoms.length) return;
        const a1 = mol.atoms[i], a2 = mol.atoms[j];
        const start = new THREE.Vector3(...a1.pos);
        const end   = new THREE.Vector3(...a2.pos);
        const mid   = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const dir   = new THREE.Vector3().subVectors(end, start);
        const len   = dir.length();

        const cyl = new THREE.CylinderGeometry(0.07, 0.07, len, 8);
        const mat = new THREE.MeshPhongMaterial({ color: 0xdddddd, transparent: true, opacity: 0.35 });
        const bond = new THREE.Mesh(cyl, mat);
        bond.position.copy(mid);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
        molGroup.add(bond);
    });

    // Aromatic ring indicator (torus)
    if (mol.aromaticRing) {
        const torusGeo = new THREE.TorusGeometry(1.4, 0.04, 8, 48);
        const torusMat = new THREE.MeshBasicMaterial({ color: 0xe056a0, transparent: true, opacity: 0.25 });
        const torus = new THREE.Mesh(torusGeo, torusMat);
        torus.rotation.x = Math.PI / 2;
        molGroup.add(torus);
    }

    // Center molecule
    const box = new THREE.Box3().setFromObject(molGroup);
    const center = box.getCenter(new THREE.Vector3());
    molGroup.position.sub(center);
}

function animate() {
    requestAnimationFrame(animate);
    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;
    if (molGroup) {
        molGroup.rotation.x = currentRotX;
        molGroup.rotation.y = currentRotY + Date.now() * 0.00025;
    }
    if (renderer && scene && camera) renderer.render(scene, camera);
}

function initMolControls() {
    const btns = document.querySelectorAll('.drug-ctrl-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mol = btn.dataset.drug;
            buildDrugMolecule(mol);
            // Reset rotation for new molecule
            targetRotX = 0; targetRotY = 0;
        });
    });
}

/* ── ANIMATED PROPERTY BARS ──────────────────────────────── */
function initPropertyBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.property-bar-fill');
                if (fill) {
                    const target = fill.dataset.width;
                    setTimeout(() => { fill.style.width = target; }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.property-bar').forEach(bar => {
        const fill = bar.querySelector('.property-bar-fill');
        if (fill) { fill.style.width = '0'; observer.observe(bar); }
    });
}

/* ── FUNNEL ANIMATION ─────────────────────────────────────── */
function initFunnelAnimation() {
    const funnelSteps = document.querySelectorAll('.funnel-step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                funnelSteps.forEach((step, i) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, i * 150);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    funnelSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.5s ease';
    });

    const funnel = document.querySelector('.funnel-container');
    if (funnel) observer.observe(funnel);
}

/* ── SMOOTH SCROLL for internal anchors ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});