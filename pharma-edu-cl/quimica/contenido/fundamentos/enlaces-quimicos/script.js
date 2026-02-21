/* 3D MOLECULE VIEWER - Enlaces Químicos */
const MOLECULES = {
    h2o: {
        label: '<strong>H₂O — Agua</strong><br><span>Enlace covalente polar · Ángulo 104.5° · Solvente farmacéutico universal</span>',
        atoms: [
            { pos: [0, 0, 0], color: 0xe056a0, size: 0.5, label: 'O' },
            { pos: [-1.2, 0.8, 0], color: 0x00e5a0, size: 0.3, label: 'H' },
            { pos: [1.2, 0.8, 0], color: 0x00e5a0, size: 0.3, label: 'H' }
        ],
        bonds: [[0,1],[0,2]]
    },
    nacl: {
        label: '<strong>NaCl — Cloruro de Sodio</strong><br><span>Enlace iónico · Red cristalina · Base de solución salina farmacéutica</span>',
        atoms: [
            { pos: [0, 0, 0], color: 0x5b8dee, size: 0.55, label: 'Na⁺' },
            { pos: [1.8, 0, 0], color: 0x44cc88, size: 0.5, label: 'Cl⁻' },
            { pos: [-1.8, 0, 0], color: 0x44cc88, size: 0.5, label: 'Cl⁻' },
            { pos: [0, 1.8, 0], color: 0x44cc88, size: 0.5, label: 'Cl⁻' },
            { pos: [0, -1.8, 0], color: 0x44cc88, size: 0.5, label: 'Cl⁻' },
            { pos: [1.8, 1.8, 0], color: 0x5b8dee, size: 0.55, label: 'Na⁺' },
            { pos: [-1.8, 1.8, 0], color: 0x5b8dee, size: 0.55, label: 'Na⁺' },
            { pos: [1.8, -1.8, 0], color: 0x5b8dee, size: 0.55, label: 'Na⁺' },
        ],
        bonds: []
    },
    ch4: {
        label: '<strong>CH₄ — Metano</strong><br><span>Enlace covalente apolar · Geometría tetraédrica · Hidrocarburo base</span>',
        atoms: [
            { pos: [0, 0, 0], color: 0x5b8dee, size: 0.5, label: 'C' },
            { pos: [1, 1, 1], color: 0x00e5a0, size: 0.3, label: 'H' },
            { pos: [-1, -1, 1], color: 0x00e5a0, size: 0.3, label: 'H' },
            { pos: [-1, 1, -1], color: 0x00e5a0, size: 0.3, label: 'H' },
            { pos: [1, -1, -1], color: 0x00e5a0, size: 0.3, label: 'H' }
        ],
        bonds: [[0,1],[0,2],[0,3],[0,4]]
    },
    co2: {
        label: '<strong>CO₂ — Dióxido de Carbono</strong><br><span>Doble enlace covalente · Lineal 180° · Producto del metabolismo</span>',
        atoms: [
            { pos: [0, 0, 0], color: 0x5b8dee, size: 0.45, label: 'C' },
            { pos: [-1.6, 0, 0], color: 0xe056a0, size: 0.5, label: 'O' },
            { pos: [1.6, 0, 0], color: 0xe056a0, size: 0.5, label: 'O' }
        ],
        bonds: [[0,1],[0,2]],
        doubleBonds: true
    },
    nh3: {
        label: '<strong>NH₃ — Amoníaco</strong><br><span>Covalente polar · Piramidal trigonal · Base en síntesis farmacéutica</span>',
        atoms: [
            { pos: [0, 0.5, 0], color: 0x4488ff, size: 0.5, label: 'N' },
            { pos: [-1, -0.6, 0.5], color: 0x00e5a0, size: 0.3, label: 'H' },
            { pos: [1, -0.6, 0.5], color: 0x00e5a0, size: 0.3, label: 'H' },
            { pos: [0, -0.6, -1], color: 0x00e5a0, size: 0.3, label: 'H' }
        ],
        bonds: [[0,1],[0,2],[0,3]]
    }
};

let scene, camera, renderer, molGroup;
let mouseDown=false, mouseX=0, mouseY=0, tRX=0, tRY=0, cRX=0, cRY=0;

document.addEventListener('DOMContentLoaded', () => {
    initViewer();
    initControls();
    animate();
});

function initViewer() {
    const c = document.getElementById('moleculeViewer');
    if (!c) return;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, c.clientWidth/c.clientHeight, 0.1, 100);
    camera.position.z = 8;
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(c.clientWidth, c.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setClearColor(0x000000,0);
    c.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff,0.5));
    const pl = new THREE.PointLight(0x00e5a0,1,50); pl.position.set(8,8,8); scene.add(pl);
    const pl2 = new THREE.PointLight(0x5b8dee,0.5,50); pl2.position.set(-8,-4,6); scene.add(pl2);

    molGroup = new THREE.Group(); scene.add(molGroup);
    buildMolecule('h2o');

    c.addEventListener('mousedown', e=>{mouseDown=true;mouseX=e.clientX;mouseY=e.clientY});
    c.addEventListener('mousemove', e=>{if(!mouseDown)return;tRY+=(e.clientX-mouseX)*.005;tRX+=(e.clientY-mouseY)*.005;mouseX=e.clientX;mouseY=e.clientY});
    c.addEventListener('mouseup',()=>{mouseDown=false});
    c.addEventListener('mouseleave',()=>{mouseDown=false});
    c.addEventListener('touchstart',e=>{mouseDown=true;mouseX=e.touches[0].clientX;mouseY=e.touches[0].clientY});
    c.addEventListener('touchmove',e=>{if(!mouseDown)return;e.preventDefault();tRY+=(e.touches[0].clientX-mouseX)*.005;tRX+=(e.touches[0].clientY-mouseY)*.005;mouseX=e.touches[0].clientX;mouseY=e.touches[0].clientY},{passive:false});
    c.addEventListener('touchend',()=>{mouseDown=false});
    c.addEventListener('wheel',e=>{e.preventDefault();camera.position.z=Math.max(4,Math.min(16,camera.position.z+e.deltaY*.01))},{passive:false});
    window.addEventListener('resize',()=>{camera.aspect=c.clientWidth/c.clientHeight;camera.updateProjectionMatrix();renderer.setSize(c.clientWidth,c.clientHeight)});
}

function buildMolecule(id) {
    while(molGroup.children.length>0){const ch=molGroup.children[0];if(ch.geometry)ch.geometry.dispose();if(ch.material)ch.material.dispose();molGroup.remove(ch)}
    const mol = MOLECULES[id]; if(!mol)return;
    document.getElementById('molLabel').innerHTML = mol.label;

    mol.atoms.forEach(a => {
        const geo = new THREE.SphereGeometry(a.size,32,32);
        const mat = new THREE.MeshPhongMaterial({color:a.color,emissive:a.color,emissiveIntensity:0.3,transparent:true,opacity:0.9});
        const mesh = new THREE.Mesh(geo,mat);
        mesh.position.set(...a.pos);
        molGroup.add(mesh);
        // Glow
        const gg = new THREE.SphereGeometry(a.size*1.6,16,16);
        const gm = new THREE.MeshBasicMaterial({color:a.color,transparent:true,opacity:0.1});
        const glow = new THREE.Mesh(gg,gm);
        glow.position.set(...a.pos);
        molGroup.add(glow);
    });

    mol.bonds.forEach(([i,j]) => {
        const a1 = mol.atoms[i], a2 = mol.atoms[j];
        const start = new THREE.Vector3(...a1.pos);
        const end = new THREE.Vector3(...a2.pos);
        const mid = new THREE.Vector3().addVectors(start,end).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(end,start);
        const len = dir.length();
        const geo = new THREE.CylinderGeometry(0.06,0.06,len,8);
        const mat = new THREE.MeshPhongMaterial({color:0xffffff,transparent:true,opacity:0.4});
        const bond = new THREE.Mesh(geo,mat);
        bond.position.copy(mid);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());
        molGroup.add(bond);

        if (mol.doubleBonds) {
            const offset = 0.12;
            [-1,1].forEach(s => {
                const g2 = new THREE.CylinderGeometry(0.04,0.04,len,8);
                const m2 = new THREE.MeshPhongMaterial({color:0xffffff,transparent:true,opacity:0.25});
                const b2 = new THREE.Mesh(g2,m2);
                b2.position.copy(mid);
                b2.position.x += s*offset;
                b2.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
                molGroup.add(b2);
            });
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    cRX+=(tRX-cRX)*.05; cRY+=(tRY-cRY)*.05;
    if(molGroup){molGroup.rotation.x=cRX;molGroup.rotation.y=cRY+Date.now()*.0003}
    if(renderer&&scene&&camera)renderer.render(scene,camera);
}

function initControls() {
    const btns = document.querySelectorAll('.ctrl-btn');
    btns.forEach(b => b.addEventListener('click', ()=>{
        btns.forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        buildMolecule(b.dataset.mol);
    }));
}
