/* ============================================
   ATENCIÓN FARMACÉUTICA — 3D VIEWER
   Red de nodos: servicios de AF
   ============================================ */

const AF_NODES = {
    dispensacion:     { icon:'💊', name:'Dispensación',        desc:'Entrega responsable del medicamento',     legal:'Base: Código Sanitario Art. 127',    color:0x5b8dee },
    seguimiento:      { icon:'🔄', name:'Seguimiento Farmacot.', desc:'Método Dáder — Detección de RNM',       legal:'Consenso Granada 2007',               color:0x00e5a0 },
    indicacion:       { icon:'🎯', name:'Indicación Farm.',     desc:'Recomendación OTC — Síntomas menores',   legal:'Ley 20.724 — D.S. 3/2010',           color:0xa855f7 },
    educacion:        { icon:'📢', name:'Educación en Salud',   desc:'Uso racional de medicamentos',           legal:'Programa MINSAL APS',                 color:0xf59e0b },
    farmacovigilancia:{ icon:'🚨', name:'Farmacovigilancia',    desc:'Notificación RAM al ISP',                legal:'Res. Ex. 1679/2009 ISP',              color:0xff5050 },
};

let scene, camera, renderer;
let nodesGroup;
let isDragging = false, prevMouseX = 0, prevMouseY = 0;
let rotVelX = 0, rotVelY = 0;
let currentNode = 'dispensacion';

document.addEventListener('DOMContentLoaded', () => {
    initViewer();
    initControls();
    initSidebarScroll();
    animate();
});

function initViewer() {
    const container = document.getElementById('afViewer');
    if (!container || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 14;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pLight = new THREE.PointLight(0x5b8dee, 1.5, 100);
    pLight.position.set(8, 8, 8);
    scene.add(pLight);
    const pLight2 = new THREE.PointLight(0x00e5a0, 0.8, 100);
    pLight2.position.set(-8, -5, 6);
    scene.add(pLight2);

    nodesGroup = new THREE.Group();
    scene.add(nodesGroup);
    buildNetwork('dispensacion');

    // Mouse drag
    container.addEventListener('mousedown', e => { isDragging = true; prevMouseX = e.clientX; prevMouseY = e.clientY; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        rotVelY = (e.clientX - prevMouseX) * 0.012;
        rotVelX = (e.clientY - prevMouseY) * 0.012;
        prevMouseX = e.clientX; prevMouseY = e.clientY;
    });

    // Touch
    let prevTouch = null;
    container.addEventListener('touchstart', e => { prevTouch = e.touches[0]; }, { passive:true });
    container.addEventListener('touchmove', e => {
        if (!prevTouch) return;
        rotVelY = (e.touches[0].clientX - prevTouch.clientX) * 0.015;
        rotVelX = (e.touches[0].clientY - prevTouch.clientY) * 0.015;
        prevTouch = e.touches[0];
    }, { passive:true });
    container.addEventListener('touchend', () => { prevTouch = null; }, { passive:true });
}

function buildNetwork(activeKey) {
    // Limpiar
    while (nodesGroup.children.length) nodesGroup.remove(nodesGroup.children[0]);

    const keys = Object.keys(AF_NODES);
    const total = keys.length;

    keys.forEach((key, i) => {
        const node = AF_NODES[key];
        const angle = (i / total) * Math.PI * 2;
        const radius = 4.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.5;
        const z = Math.sin(angle) * radius * 0.6;

        const isActive = key === activeKey;
        const size = isActive ? 0.6 : 0.35;

        // Esfera nodo
        const geo = new THREE.SphereGeometry(size, 24, 24);
        const mat = new THREE.MeshPhongMaterial({
            color: node.color,
            shininess: 80,
            transparent: true,
            opacity: isActive ? 1 : 0.55,
        });
        const sphere = new THREE.Mesh(geo, mat);
        sphere.position.set(x, y, z);
        nodesGroup.add(sphere);

        // Halo para nodo activo
        if (isActive) {
            const haloGeo = new THREE.SphereGeometry(size * 1.6, 20, 20);
            const haloMat = new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.08, wireframe: false });
            const halo = new THREE.Mesh(haloGeo, haloMat);
            halo.position.set(x, y, z);
            nodesGroup.add(halo);
        }

        // Líneas de conexión al centro
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, y, z),
            new THREE.Vector3(0, 0, 0)
        ]);
        const lineMat = new THREE.LineBasicMaterial({
            color: node.color,
            transparent: true,
            opacity: isActive ? 0.5 : 0.12
        });
        nodesGroup.add(new THREE.Line(lineGeo, lineMat));
    });

    // Nodo central
    const centerGeo = new THREE.SphereGeometry(0.8, 28, 28);
    const centerMat = new THREE.MeshPhongMaterial({ color: 0x5b8dee, shininess: 100 });
    nodesGroup.add(new THREE.Mesh(centerGeo, centerMat));

    // Anillo decorativo
    const ringGeo = new THREE.TorusGeometry(4.5, 0.04, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x5b8dee, transparent: true, opacity: 0.1 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 6;
    nodesGroup.add(ring);
}

function initControls() {
    document.querySelectorAll('.ctrl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.getAttribute('data-node');
            currentNode = key;
            buildNetwork(key);
            updateInfo(key);
        });
    });
}

function updateInfo(key) {
    const node = AF_NODES[key];
    if (!node) return;
    const el = id => document.getElementById(id);
    if (el('infoSymbol')) el('infoSymbol').textContent = node.icon;
    if (el('infoName'))   el('infoName').textContent   = node.name;
    if (el('infoDesc'))   el('infoDesc').textContent   = node.desc;
    if (el('infoLegal'))  el('infoLegal').textContent  = node.legal;
}

function initSidebarScroll() {
    const links = document.querySelectorAll('.sidebar-link');
    if (!links.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const match = document.querySelector(`.sidebar-link[href="#${e.target.id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }, { rootMargin:'-40% 0px -55% 0px' });
    document.querySelectorAll('.content-section[id]').forEach(s => observer.observe(s));
}

function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
        rotVelX *= 0.92; rotVelY *= 0.92;
        nodesGroup.rotation.y += 0.004 + rotVelY;
        nodesGroup.rotation.x += rotVelX * 0.3;
    } else {
        nodesGroup.rotation.y += rotVelY;
        nodesGroup.rotation.x += rotVelX * 0.3;
        rotVelX = 0; rotVelY = 0;
    }
    if (renderer) renderer.render(scene, camera);
}
