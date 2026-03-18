import * as THREE from 'three';
import { GLTFLoader }      from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass }        from 'three/addons/postprocessing/SMAAPass.js';
// getCasaMGCategory, getCasaMGFloor, CASA_MG_PART_INFO → cargados via script tag
// EarthquakeSimulator, BuildingCollapseSimulator, AnnotationSystem → script tag

const $ = id => document.getElementById(id);
const setLoad = (p, t) => { $('lbFill').style.width = p + '%'; $('lbTxt').textContent = t; };

/* ═══════════════════════════════════════════════════════
   ESCENA
═══════════════════════════════════════════════════════ */
setLoad(10, 'Configurando escena 3D...');
const canvas = $('mainCanvas');
const scene  = new THREE.Scene();
scene.background = new THREE.Color(0x8a8a8a);
scene.fog        = new THREE.FogExp2(0x8a8a8a, 0.018);

const camera = new THREE.PerspectiveCamera(50, innerWidth / (innerHeight - 58), 0.01, 150);
camera.position.set(12, 8, 12);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setSize(innerWidth, innerHeight - 58);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled   = true;
renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
renderer.toneMapping         = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace    = THREE.SRGBColorSpace;
renderer.useLegacyLights     = false;

const ctrl = new OrbitControls(camera, canvas);
ctrl.enableDamping   = true;
ctrl.dampingFactor   = 0.09;
ctrl.rotateSpeed     = 0.65;
ctrl.zoomSpeed       = 1.0;
ctrl.minDistance     = 3;
ctrl.maxDistance     = 35;
ctrl.target.set(0, 2, 0);
ctrl.autoRotate      = true;
ctrl.autoRotateSpeed = 0.5;

/* ═══════════════════════════════════════════════════════
   ILUMINACIÓN
═══════════════════════════════════════════════════════ */
setLoad(20, 'Generando iluminación...');
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
const envSc = new THREE.Scene();
envSc.add(new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.ShaderMaterial({
        side: THREE.BackSide,
        vertexShader: `varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `varying vec3 vP;void main(){
            vec3 d=normalize(vP);float y=d.y*.5+.5;
            vec3 c=mix(vec3(.04,.04,.06),mix(vec3(.06,.07,.10),vec3(.10,.12,.16),smoothstep(.25,1.,y)),smoothstep(0.,.25,y));
            c+=vec3(.40,.35,.28)*pow(max(0.,dot(d,normalize(vec3(1.,.6,.4)))),14.)*.5;
            c+=vec3(.10,.15,.22)*pow(max(0.,dot(d,normalize(vec3(-.7,.4,-.6)))),10.)*.3;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment = pmrem.fromScene(envSc, 0.04).texture;
pmrem.dispose();

scene.add(new THREE.HemisphereLight(0xb0c4d8, 0x443322, 0.8));

const sunLight = new THREE.DirectionalLight(0xfff4e6, 3.5);
sunLight.position.set(10, 14, 10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near   = 0.5; sunLight.shadow.camera.far    = 40;
sunLight.shadow.camera.left   = -12; sunLight.shadow.camera.right  = 12;
sunLight.shadow.camera.top    = 14;  sunLight.shadow.camera.bottom = -6;
sunLight.shadow.bias          = -0.0006;
sunLight.shadow.normalBias    = 0.03;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x90b0ff, 1.4);
fillLight.position.set(-8, 6, -6);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffc080, 1.8);
rimLight.position.set(-4, -3, -10);
scene.add(rimLight);

const accentLight = new THREE.PointLight(0x00ddaa, 0.8, 20);
accentLight.position.set(4, 8, 6);
scene.add(accentLight);

/* ═══════════════════════════════════════════════════════
   POST-PROCESSING
═══════════════════════════════════════════════════════ */
setLoad(30, 'Post-processing...');
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.12, 0.55, 0.92);
composer.addPass(bloom);

const cgShader = {
    uniforms: { tDiffuse: { value: null }, contrast: { value: 0.55 }, vign: { value: 0.20 } },
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform sampler2D tDiffuse;uniform float contrast;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    c.b+=.020;c.r+=.008;
    float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.15);
    c=(c-.5)*(1.+contrast*.4)+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.38;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass = new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth, innerHeight));

/* ═══════════════════════════════════════════════════════
   COLORES POR TIPO ESTRUCTURAL
═══════════════════════════════════════════════════════ */
const COLORS = {
    column:     { color: [1.00, 0.42, 0.00], roughness: 0.45, metalness: 0.10, ei: 0.18 }, // Naranja
    wall:       { color: [1.00, 0.13, 0.26], roughness: 0.60, metalness: 0.05, ei: 0.12 }, // Rojo
    slab:       { color: [0.67, 0.87, 0.00], roughness: 0.55, metalness: 0.05, ei: 0.15 }, // Verde lima
    roof:       { color: [0.00, 0.87, 1.00], roughness: 0.45, metalness: 0.10, ei: 0.18 }, // Cian
    beam:       { color: [1.00, 0.85, 0.00], roughness: 0.45, metalness: 0.10, ei: 0.18 }, // Amarillo
    foundation: { color: [0.60, 0.20, 1.00], roughness: 0.75, metalness: 0.05, ei: 0.10 }, // Morado
    stair:      { color: [0.80, 0.55, 0.20], roughness: 0.60, metalness: 0.05, ei: 0.10 }, // Café
    facade:     { color: [0.60, 0.85, 1.00], roughness: 0.30, metalness: 0.20, ei: 0.12 }, // Azul claro
    other:      { color: [0.55, 0.60, 0.65], roughness: 0.65, metalness: 0.10, ei: 0.07 }, // Gris
};

const GLOW_COLOR = {
    column:     new THREE.Color(1.00, 0.42, 0.00),
    wall:       new THREE.Color(1.00, 0.13, 0.26),
    slab:       new THREE.Color(0.67, 0.87, 0.00),
    roof:       new THREE.Color(0.00, 0.87, 1.00),
    beam:       new THREE.Color(1.00, 0.85, 0.00),
    foundation: new THREE.Color(0.60, 0.20, 1.00),
    stair:      new THREE.Color(0.80, 0.55, 0.20),
    facade:     new THREE.Color(0.60, 0.85, 1.00),
    other:      new THREE.Color(0.55, 0.60, 0.65),
};

/* ═══════════════════════════════════════════════════════
   CARGA DEL MODELO GLB
═══════════════════════════════════════════════════════ */
setLoad(50, 'Cargando Casa MG...');
let model       = null;
const allMeshes = [];
let floorGroups = [];

new GLTFLoader().load(
    'models/casa_mg.glb',
    (gltf) => {
        setLoad(80, 'Optimizando materiales...');
        model = gltf.scene;

        // Escalar y centrar
        const box  = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const sc   = 10 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(sc);

        const sb  = new THREE.Box3().setFromObject(model);
        const ctr = sb.getCenter(new THREE.Vector3());
        model.position.x -= ctr.x;
        model.position.z -= ctr.z;
        model.position.y  = -sb.min.y;

        const totalH = sb.max.y - sb.min.y;
        const numFloors = 3;
        const floorH = totalH / numFloors;
        let meshIdx = 0;

        model.traverse(child => {
            if (!child.isMesh) return;
            child.castShadow    = true;
            child.receiveShadow = true;
            child._idx          = meshIdx++;

            const nodeName = child.parent ? child.parent.name : child.name;
            const category = getCasaMGCategory(nodeName);
            const floor    = getCasaMGFloor(nodeName);

            child._type  = category;
            child._floor = floor >= 0
                ? floor
                : Math.floor((child.getWorldPosition(new THREE.Vector3()).y - sb.min.y) / floorH);
            child._floor = Math.max(0, Math.min(numFloors, child._floor));

            allMeshes.push(child);
            if (!floorGroups[child._floor]) floorGroups[child._floor] = [];
            floorGroups[child._floor].push(child);

            // Aplicar material con color fuerte por tipo
            const cfg = COLORS[category] || COLORS.other;
            const mat = new THREE.MeshStandardMaterial({
                color:             new THREE.Color(...cfg.color),
                roughness:         cfg.roughness,
                metalness:         cfg.metalness,
                emissive:          new THREE.Color(...cfg.color).multiplyScalar(0.08),
                emissiveIntensity: cfg.ei,
                envMapIntensity:   1.1,
            });

            // Preservar textura original si existe
            const origMat = Array.isArray(child.material) ? child.material[0] : child.material;
            if (origMat && origMat.map) mat.map = origMat.map;

            mat._origColor    = mat.color.clone();
            mat._origEmissive = mat.emissive.clone();
            mat._origEI       = mat.emissiveIntensity;
            child._origColor  = mat.color.clone();
            child.material    = mat;
        });

        scene.add(model);

        // Plataforma base
        const platform = new THREE.Mesh(
            new THREE.BoxGeometry(20, 0.4, 20),
            new THREE.MeshStandardMaterial({
                color: 0x909090, roughness: 0.95, metalness: 0.05,
                emissive: 0x808080, emissiveIntensity: 0.1
            })
        );
        platform.position.y = -0.5;
        platform.receiveShadow = true;
        scene.add(platform);

        const grid = new THREE.GridHelper(18, 36, 0x3a4a5a, 0x1f2a38);
        grid.position.y = -0.25;
        grid.material.opacity = 0.35;
        grid.material.transparent = true;
        scene.add(grid);

        setLoad(100, '¡Casa MG lista!');
        setTimeout(() => $('ls').classList.add('hidden'), 500);
    },
    p => { if (p.total) setLoad(50 + (p.loaded / p.total) * 30, 'Descargando... ' + (p.loaded / 1024).toFixed(0) + 'KB'); },
    e => { console.error(e); setLoad(0, 'Error: Verifica que casa_mg.glb esté en models/.'); }
);

/* ═══════════════════════════════════════════════════════
   RESIZE
═══════════════════════════════════════════════════════ */
addEventListener('resize', () => {
    const w = innerWidth, h = innerHeight - 58;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h); composer.setSize(w, h); bloom.setSize(w, h);
});

/* ═══════════════════════════════════════════════════════
   CONTROLES DE CÁMARA
═══════════════════════════════════════════════════════ */
let ar = true;
$('bRot').onclick = e  => { ar = !ar; ctrl.autoRotate = ar; e.currentTarget.classList.toggle('active', ar); };
$('bRst').onclick = () => { ctrl.target.set(0,2,0); camera.position.set(12,8,12); currentFloor=3; $('floorRange').value=3; updateFloors(); };
$('bZi').onclick  = () => camera.position.lerp(ctrl.target, 0.20);
$('bZo').onclick  = () => { const d = camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(0.9)); };
$('bFr').onclick  = () => { camera.position.set(0, 3, 18);  ctrl.target.set(0, 2, 0); };
$('bTo').onclick  = () => { camera.position.set(0, 20, 0.1); ctrl.target.set(0, 2, 0); };
$('bSi').onclick  = () => { camera.position.set(18, 3, 0);  ctrl.target.set(0, 2, 0); };
$('bIso').onclick = () => { camera.position.set(12, 8, 12); ctrl.target.set(0, 2, 0); };

/* ═══════════════════════════════════════════════════════
   PANEL DE INFORMACIÓN
═══════════════════════════════════════════════════════ */
let ipVis = true;
$('bIn').onclick = () => { ipVis = !ipVis; $('ip').classList.toggle('hide', !ipVis); };
$('bPP').onclick = e  => { $('ppP').classList.toggle('vis'); e.currentTarget.classList.toggle('active'); };
$('ppB').oninput = e  => bloom.strength = e.target.value / 100 * 0.65;
$('ppE').oninput = e  => renderer.toneMappingExposure = e.target.value / 100;
$('ppC').oninput = e  => cgPass.uniforms.contrast.value = e.target.value / 100;
$('ppV').oninput = e  => cgPass.uniforms.vign.value = e.target.value / 100;

/* ═══════════════════════════════════════════════════════
   CONTROL DE NIVELES (3 niveles)
═══════════════════════════════════════════════════════ */
const FLOOR_NAMES = ['Planta Baja', 'Segundo Nivel', 'Cubierta', 'Todos'];
let floorActive = false, currentFloor = 3;

$('bFloor').onclick = e => {
    floorActive = !floorActive;
    $('floorSlider').classList.toggle('vis', floorActive);
    e.currentTarget.classList.toggle('active', floorActive);
    if (!floorActive) { currentFloor = 3; $('floorRange').value = 3; updateFloors(); }
};
$('floorRange').setAttribute('max', '3');
$('floorRange').oninput = e => { currentFloor = parseInt(e.target.value); updateFloors(); };

function updateFloors() {
    $('floorLevel').textContent = FLOOR_NAMES[currentFloor] || `Nivel ${currentFloor}`;
    if (!model) return;
    allMeshes.forEach(mesh => {
        const mat = mesh.material; if (!mat) return;
        if (currentFloor === 3) {
            mat.transparent = false; mat.opacity = 1; mat.depthWrite = true;
        } else {
            const visible = mesh._floor <= currentFloor;
            mat.transparent = !visible; mat.opacity = visible ? 1 : 0.06; mat.depthWrite = visible;
        }
    });
}

/* ═══════════════════════════════════════════════════════
   MODO RAYOS X
═══════════════════════════════════════════════════════ */
let xrayActive = false, xrayValue = 0;
$('bXray').onclick = e => {
    xrayActive = !xrayActive;
    $('xrayMode').classList.toggle('vis', xrayActive);
    e.currentTarget.classList.toggle('active', xrayActive);
    if (!xrayActive) { xrayValue = 0; $('xrayRange').value = 0; updateXray(); }
};
$('xrayRange').oninput = e => { xrayValue = e.target.value / 100; updateXray(); };
function updateXray() {
    if (!model) return;
    allMeshes.forEach(mesh => {
        const mat = mesh.material; if (!mat) return;
        if (xrayValue === 0) { mat.transparent = false; mat.opacity = 1; }
        else { mat.transparent = true; mat.opacity = 1 - xrayValue * 0.85; }
    });
}

/* ═══════════════════════════════════════════════════════
   HIGHLIGHT DE COMPONENTES — con brillo fuerte
═══════════════════════════════════════════════════════ */
function isTargetMesh(sel, mesh) {
    const t = mesh._type, f = mesh._floor;
    if (sel === 'all')          return true;
    if (sel === 'columns'       && t === 'column')                              return true;
    if (sel === 'walls'         && (t === 'wall' || t === 'column'))            return true;
    if (sel === 'shear_walls'   && t === 'wall')                                return true;
    if (sel === 'slabs'         && t === 'slab')                                return true;
    if (sel === 'roof'          && (t === 'roof' || f >= 2))                    return true;
    if (sel === 'beams'         && t === 'beam')                                return true;
    if (sel === 'foundation'    && t === 'foundation')                          return true;
    if (sel === 'core'          && (t === 'stair' || t === 'column'))           return true;
    if (sel === 'frame'         && (t === 'column' || t === 'beam'))            return true;
    if (sel === 'ground_floor'  && f === 0)                                     return true;
    if (sel === 'typical_floor' && f === 1)                                     return true;
    if (sel === 'top_floor'     && f >= 2)                                      return true;
    if (sel === 'facade'        && (t === 'facade' || t === 'wall'))            return true;
    if (sel === 'stair'         && t === 'stair')                               return true;
    if (sel === 'load_path'     && (t === 'slab' || t === 'wall' || t === 'foundation')) return true;
    if (sel === 'seismic'       && (t === 'wall' || t === 'column'))            return true;
    return false;
}

let currentSel = 'all';

function setHighlight(sel) {
    currentSel = sel;
    allMeshes.forEach(mesh => {
        const mat = mesh.material; if (!mat) return;
        const baseColor = GLOW_COLOR[mesh._type] || GLOW_COLOR.other;

        if (sel === 'all') {
            mat.color.copy(baseColor);
            mat.transparent = false; mat.opacity = 1; mat.depthWrite = true;
            mat.emissive.copy(baseColor); mat.emissiveIntensity = 0.08;
            return;
        }

        const isTarget = isTargetMesh(sel, mesh);
        if (isTarget) {
            mat.color.copy(baseColor);
            mat.transparent = false; mat.opacity = 1; mat.depthWrite = true;
            mat.emissive.copy(baseColor); mat.emissiveIntensity = 0.75;
        } else {
            mat.color.set(0x111111);
            mat.transparent = true; mat.opacity = 0.06; mat.depthWrite = false;
            mat.emissive.set(0x000000); mat.emissiveIntensity = 0;
        }
    });
}

function showPartInfo(partKey) {
    const info = CASA_MG_PART_INFO[partKey];
    if (!info) return;
    $('ipN').textContent = info.n;
    $('ipS').textContent = info.s;
    $('ipD').textContent = info.d;
    $('ipSt').innerHTML  = info.st.map(s =>
        `<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`
    ).join('');
    if (!ipVis) { ipVis = true; $('ip').classList.remove('hide'); }
}

// Mapa tipo → parte del panel
const TYPE_TO_PART = {
    column:     'columns',
    wall:       'walls',
    slab:       'slabs',
    roof:       'roof',
    beam:       'beams',
    foundation: 'foundation',
    stair:      'stair',
    facade:     'facade',
    other:      'all',
};

document.querySelectorAll('.hl-btn').forEach(btn => {
    btn.onclick = () => {
        const p = btn.dataset.part;
        const alreadyActive = btn.classList.contains('active');
        document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
        if (alreadyActive && p !== 'all') {
            document.querySelector('.hl-btn[data-part="all"]')?.classList.add('active');
            showPartInfo('all'); setHighlight('all');
        } else {
            btn.classList.add('active');
            showPartInfo(p); setHighlight(p);
        }
    };
});

/* ═══════════════════════════════════════════════════════
   RAYCASTER — clic directo sobre el modelo
═══════════════════════════════════════════════════════ */
const raycaster    = new THREE.Raycaster();
const mouse        = new THREE.Vector2();
let mouseDownPos   = { x: 0, y: 0 };

const tooltip = document.createElement('div');
tooltip.style.cssText = `
    position:fixed; pointer-events:none; display:none; z-index:500;
    background:rgba(10,12,18,0.92); border:1px solid rgba(255,255,255,0.12);
    border-radius:8px; padding:8px 14px; color:#fff;
    font-family:'Space Mono',monospace; font-size:0.68rem;
    backdrop-filter:blur(12px); box-shadow:0 4px 24px rgba(0,0,0,0.5);
`;
document.body.appendChild(tooltip);

canvas.addEventListener('mousedown', e => { mouseDownPos = { x: e.clientX, y: e.clientY }; });

canvas.addEventListener('mousemove', e => {
    if (!model || allMeshes.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
    mouse.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(allMeshes, false);
    if (hits.length > 0) {
        const hit  = hits[0].object;
        const type = hit._type || 'other';
        const info = CASA_MG_PART_INFO[TYPE_TO_PART[type]] || CASA_MG_PART_INFO['all'];
        const col  = GLOW_COLOR[type] || GLOW_COLOR.other;
        const hex  = '#' + col.getHexString();
        tooltip.innerHTML = `
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;
                background:${hex};margin-right:6px;vertical-align:middle;"></span>
            <strong style="color:${hex}">${info.n}</strong><br>
            <span style="color:#9da5b2;font-size:0.62rem">${info.s}</span>`;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top  = (e.clientY - 10) + 'px';
        canvas.style.cursor = 'pointer';
    } else {
        tooltip.style.display = 'none';
        canvas.style.cursor = '';
    }
});

canvas.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; canvas.style.cursor = ''; });

canvas.addEventListener('click', e => {
    if (!model || allMeshes.length === 0) return;
    const dx = Math.abs(e.clientX - mouseDownPos.x);
    const dy = Math.abs(e.clientY - mouseDownPos.y);
    if (dx > 5 || dy > 5) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
    mouse.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(allMeshes, false);
    if (hits.length > 0) {
        const hit     = hits[0].object;
        const type    = hit._type || 'other';
        const partKey = TYPE_TO_PART[type] || 'all';
        const matchBtn = document.querySelector(`.hl-btn[data-part="${partKey}"]`);
        const alreadyActive = matchBtn && matchBtn.classList.contains('active');
        document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
        if (alreadyActive && partKey !== 'all') {
            document.querySelector('.hl-btn[data-part="all"]')?.classList.add('active');
            showPartInfo('all'); setHighlight('all');
        } else {
            matchBtn?.classList.add('active');
            showPartInfo(partKey); setHighlight(partKey);
        }
    }
});

/* ═══════════════════════════════════════════════════════
   SIMULADORES SÍSMICOS
═══════════════════════════════════════════════════════ */
let earthquakeSimulator = null;
let collapseSimulator   = null;

function initializeSeismicSimulators() {
    if (!model || allMeshes.length === 0) { setTimeout(initializeSeismicSimulators, 500); return; }

    const bbox           = new THREE.Box3().setFromObject(model);
    const buildingHeight = bbox.max.y - bbox.min.y;

    earthquakeSimulator = new EarthquakeSimulator(THREE, model, scene, {
        buildingHeight, numFloors: 3, camera,
        damping: 0.06, magnitude: 6.5, duration: 30, soilType: 'firm',
        onUpdate: (data) => {
            $('seismicDrift').textContent = data.driftPercent + '%';
            $('seismicTime').textContent  = data.time.toFixed(1) + 's';
            $('seismicMiniStatus').textContent = `M${earthquakeSimulator.config.magnitude} · ${data.time.toFixed(0)}s · ${data.driftPercent}%`;
            const driftEl = $('seismicDrift');
            driftEl.className = data.drift > 0.05 ? 'seismic-status-value danger'
                              : data.drift > 0.02 ? 'seismic-status-value warning'
                              : 'seismic-status-value';
            if (collapseSimulator && data.drift > 0.04) {
                allMeshes.forEach(mesh => collapseSimulator.applyDamage(mesh, data.drift * 2));
            }
        },
        onDamage: (drift) => {
            $('seismicState').textContent = '⚠️ DAÑADO';
            $('seismicState').className   = 'seismic-status-value warning';
            if ($('allowCollapse').checked && collapseSimulator) {
                collapseSimulator.initiateCollapse('seismic');
            }
        },
        onComplete: () => { $('seismicState').textContent = 'Sismo finalizado'; }
    });
    earthquakeSimulator.initialize();

    collapseSimulator = new BuildingCollapseSimulator(THREE, model, scene, {
        collapseType: 'progressive', criticalDrift: 0.08,
        gravity: 9.81, debrisGeneration: true, dustEffect: true,
        showCracks: $('showCracks').checked,
        onPhaseChange: (phase) => {
            const names = { stable:'Estable', cracking:'🔴 Agrietando', failing:'🔴 Fallando', collapsing:'💥 COLAPSANDO', collapsed:'💀 Colapsado' };
            $('seismicState').textContent = names[phase] || phase;
            if (phase === 'collapsing' || phase === 'collapsed') $('seismicState').className = 'seismic-status-value danger';
        },
        onComplete: () => { $('seismicState').textContent = '💀 COLAPSADO'; $('collapseProgress').textContent = '100%'; }
    });
    collapseSimulator.initialize(earthquakeSimulator);
    console.log('✅ Simuladores Casa MG inicializados');
}
setTimeout(initializeSeismicSimulators, 2000);

/* ═══════════════════════════════════════════════════════
   CONTROLES UI — SÍSMICA
═══════════════════════════════════════════════════════ */
let seismicPanelVisible = false;
$('bSeismic').onclick = e => {
    seismicPanelVisible = !seismicPanelVisible;
    $('seismicPanel').classList.toggle('vis', seismicPanelVisible);
    e.currentTarget.classList.toggle('active', seismicPanelVisible);
};
$('seismicToggle').onclick = e => { e.stopPropagation(); $('seismicPanel').classList.toggle('minimized'); };
$('seismicHeader').onclick = () => $('seismicPanel').classList.toggle('minimized');

$('seismicMagnitude').oninput = e => {
    const mag = e.target.value / 10;
    $('magnitudeValue').textContent = mag.toFixed(1);
    if (earthquakeSimulator) earthquakeSimulator.setMagnitude(mag);
};
$('seismicDuration').oninput = e => {
    const dur = parseInt(e.target.value);
    $('durationValue').textContent = dur + 's';
    if (earthquakeSimulator) earthquakeSimulator.setDuration(dur);
};
document.querySelectorAll('input[name="soilType"]').forEach(r => {
    r.onchange = e => { if (e.target.checked && earthquakeSimulator) earthquakeSimulator.setSoilType(e.target.value); };
});
document.querySelectorAll('input[name="collapseType"]').forEach(r => {
    r.onchange = e => { if (e.target.checked && collapseSimulator) collapseSimulator.setCollapseType(e.target.value); };
});

$('startEarthquake').onclick = () => {
    if (!earthquakeSimulator) { alert('Simuladores aún no inicializados. Espera un momento...'); return; }
    earthquakeSimulator.start();
    $('seismicState').textContent = '🌊 En curso...';
    $('seismicState').className   = 'seismic-status-value warning';
};
$('pauseEarthquake').onclick = () => {
    if (earthquakeSimulator) earthquakeSimulator.pause();
    if (collapseSimulator)   collapseSimulator.stop();
    $('seismicState').textContent = '⏸ Pausado';
};
$('resetEarthquake').onclick = () => {
    if (earthquakeSimulator) earthquakeSimulator.reset();
    if (collapseSimulator)   collapseSimulator.reset();
    $('seismicState').textContent     = 'Estable';
    $('seismicState').className       = 'seismic-status-value';
    $('seismicDrift').textContent     = '0.00%';
    $('seismicDrift').className       = 'seismic-status-value';
    $('seismicTime').textContent      = '0.0s';
    $('collapseProgress').textContent = '0%';
    setHighlight(currentSel);
};
$('showCracks').onchange = e => { if (collapseSimulator) collapseSimulator.config.showCracks = e.target.checked; };

/* ═══════════════════════════════════════════════════════
   ANOTACIONES
═══════════════════════════════════════════════════════ */
let annotationSystem = null;
function initializeAnnotations() {
    if (!model || allMeshes.length === 0) { setTimeout(initializeAnnotations, 500); return; }
    annotationSystem = new AnnotationSystem(THREE, scene, camera, renderer, model, allMeshes);
}
setTimeout(initializeAnnotations, 2500);

$('bAnn').onclick = e => {
    if (!annotationSystem) { alert('Sistema de anotaciones cargando...'); return; }
    e.currentTarget.classList.toggle('active', annotationSystem.toggle());
};

/* ═══════════════════════════════════════════════════════
   LOOP DE ANIMACIÓN
═══════════════════════════════════════════════════════ */
let lastTime = performance.now(), lt = performance.now(), fc = 0;

(function animLoop(t) {
    requestAnimationFrame(animLoop);
    const dt = (t - lastTime) / 1000;
    lastTime = t;

    if (earthquakeSimulator?.config.active) earthquakeSimulator.update(dt);
    if (collapseSimulator?.config.active) {
        collapseSimulator.update(dt);
        $('collapseProgress').textContent = (collapseSimulator.state.collapseProgress * 100).toFixed(0) + '%';
    }

    fc++;
    if (t - lt >= 1000) { $('fps').textContent = fc + ' FPS'; fc = 0; lt = t; }
    ctrl.update();
    accentLight.intensity = 0.8 + Math.sin(t * 0.0012) * 0.15;
    if (annotationSystem?.visible) annotationSystem.update();
    composer.render();
})(performance.now());
