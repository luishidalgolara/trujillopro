import * as THREE from 'three';
import { GLTFLoader }      from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass }        from 'three/addons/postprocessing/SMAAPass.js';
// EarthquakeSimulator, BuildingCollapseSimulator, AnnotationSystem,
// getRibeiroCategory, getRibeiroFloor, RIBEIRO_PART_INFO → cargados via script tag

/* ═══════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const setLoad = (p, t) => { $('lbFill').style.width = p + '%'; $('lbTxt').textContent = t; };

/* ═══════════════════════════════════════════════════════
   ESCENA
═══════════════════════════════════════════════════════ */
setLoad(10, 'Configurando escena 3D...');
const canvas = $('mainCanvas');
const scene  = new THREE.Scene();
scene.background = new THREE.Color(0x8a8a8a);
scene.fog        = new THREE.FogExp2(0x8a8a8a, 0.012);

const camera = new THREE.PerspectiveCamera(55, innerWidth / (innerHeight - 58), 0.01, 150);
camera.position.set(15, 12, 15);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setSize(innerWidth, innerHeight - 58);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
renderer.toneMapping        = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace   = THREE.SRGBColorSpace;
renderer.useLegacyLights    = false;

const ctrl = new OrbitControls(camera, canvas);
ctrl.enableDamping   = true;
ctrl.dampingFactor   = 0.09;
ctrl.rotateSpeed     = 0.65;
ctrl.zoomSpeed       = 1.0;
ctrl.minDistance     = 5;
ctrl.maxDistance     = 40;
ctrl.target.set(0, 4, 0);
ctrl.autoRotate      = true;
ctrl.autoRotateSpeed = 0.6;

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

scene.add(new THREE.HemisphereLight(0xb0c4d8, 0x443322, 0.7));

const sunLight = new THREE.DirectionalLight(0xfff4e6, 3.5);
sunLight.position.set(12, 18, 14);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near   = 0.5; sunLight.shadow.camera.far    = 50;
sunLight.shadow.camera.left   = -15; sunLight.shadow.camera.right  = 15;
sunLight.shadow.camera.top    = 20;  sunLight.shadow.camera.bottom = -8;
sunLight.shadow.bias          = -0.0006;
sunLight.shadow.normalBias    = 0.03;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x90b0ff, 1.4);
fillLight.position.set(-10, 8, -8);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffc080, 2.0);
rimLight.position.set(-6, -4, -14);
scene.add(rimLight);

const accentLight = new THREE.PointLight(0x00c9ff, 1.0, 25);
accentLight.position.set(6, 12, 8);
scene.add(accentLight);

scene.add(new THREE.PointLight(0xffffff, 0.7, 22).translateX(-7).translateY(5).translateZ(10));

/* ═══════════════════════════════════════════════════════
   POST-PROCESSING
═══════════════════════════════════════════════════════ */
setLoad(30, 'Post-processing...');
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.15, 0.55, 0.92);
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
   CARGA DEL MODELO GLB
═══════════════════════════════════════════════════════ */
setLoad(50, 'Cargando modelo Ribeiro...');
let model      = null;
const allMeshes = [];
let floorGroups = [];

// Colores por tipo estructural
const COLORS = {
    column:         { color: [0.58, 0.62, 0.68], roughness: 0.50, metalness: 0.15, ei: 0.10 },
    beam:           { color: [0.72, 0.52, 0.30], roughness: 0.55, metalness: 0.10, ei: 0.12 },
    beam_secondary: { color: [0.65, 0.50, 0.32], roughness: 0.60, metalness: 0.08, ei: 0.08 },
    slab:           { color: [0.66, 0.73, 0.80], roughness: 0.60, metalness: 0.08, ei: 0.08 },
    foundation:     { color: [0.33, 0.38, 0.44], roughness: 0.80, metalness: 0.05, ei: 0.05 },
    other:          { color: [0.60, 0.64, 0.68], roughness: 0.65, metalness: 0.10, ei: 0.07 },
};

new GLTFLoader().load(
    'models/projeto_estrutural_-_edificio_ribeiro.glb',
    (gltf) => {
        setLoad(80, 'Optimizando materiales...');
        model = gltf.scene;

        // Escalar y centrar
        const box  = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const sc   = 12 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(sc);

        const sb  = new THREE.Box3().setFromObject(model);
        const ctr = sb.getCenter(new THREE.Vector3());
        model.position.sub(ctr);
        model.position.y = -sb.min.y * sc;

        const totalH    = (sb.max.y - sb.min.y);
        const floorH    = totalH / 6; // 6 niveles
        let meshIdx = 0;

        model.traverse(child => {
            if (!child.isMesh) return;
            child.castShadow    = true;
            child.receiveShadow = true;
            child._idx          = meshIdx++;

            // Clasificar por nombre real del nodo padre
            const nodeName = child.parent ? child.parent.name : child.name;
            const category = getRibeiroCategory(nodeName);
            const floor    = getRibeiroFloor(nodeName);

            child._type  = category;
            child._floor = floor >= 0 ? floor : Math.floor((child.getWorldPosition(new THREE.Vector3()).y - sb.min.y) / floorH);
            child._floor = Math.max(0, Math.min(5, child._floor));

            if (!floorGroups[child._floor]) floorGroups[child._floor] = [];
            floorGroups[child._floor].push(child);

            // Aplicar material
            const cfg = COLORS[category] || COLORS.other;
            const mat = new THREE.MeshStandardMaterial({
                color:            new THREE.Color(...cfg.color),
                roughness:        cfg.roughness,
                metalness:        cfg.metalness,
                emissive:         new THREE.Color(0.03, 0.03, 0.04),
                emissiveIntensity: cfg.ei,
                envMapIntensity:  1.1,
            });
            mat._origColor    = mat.color.clone();
            mat._origEmissive = mat.emissive.clone();
            mat._origEI       = mat.emissiveIntensity;
            child._origColor  = mat.color.clone();
            child.material    = mat;

            allMeshes.push(child);
        });

        scene.add(model);

        // Plataforma base
        const platform = new THREE.Mesh(
            new THREE.BoxGeometry(25, 0.4, 25),
            new THREE.MeshStandardMaterial({
                color: 0x909090, roughness: 0.95, metalness: 0.05,
                emissive: 0x808080, emissiveIntensity: 0.1
            })
        );
        platform.position.y = -0.5;
        platform.receiveShadow = true;
        scene.add(platform);

        const grid = new THREE.GridHelper(24, 48, 0x3a4a5a, 0x1f2a38);
        grid.position.y = -0.25;
        grid.material.opacity = 0.35;
        grid.material.transparent = true;
        scene.add(grid);

        setLoad(100, '¡Estructura Ribeiro lista!');
        setTimeout(() => $('ls').classList.add('hidden'), 500);
    },
    p => { if (p.total) setLoad(50 + (p.loaded / p.total) * 30, 'Descargando... ' + (p.loaded / 1024).toFixed(0) + 'KB'); },
    e => { console.error(e); setLoad(0, 'Error: Verifica que o arquivo .glb esteja na pasta models/.'); }
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
$('bRot').onclick = e => { ar = !ar; ctrl.autoRotate = ar; e.currentTarget.classList.toggle('active', ar); };
$('bRst').onclick = () => { ctrl.target.set(0,4,0); camera.position.set(15,12,15); currentFloor=5; $('floorRange').value=5; updateFloors(); };
$('bZi').onclick  = () => camera.position.lerp(ctrl.target, 0.20);
$('bZo').onclick  = () => { const d = camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(0.9)); };
$('bFr').onclick  = () => { camera.position.set(0,5,25);  ctrl.target.set(0,4,0); };
$('bTo').onclick  = () => { camera.position.set(0,30,0.1); ctrl.target.set(0,4,0); };
$('bSi').onclick  = () => { camera.position.set(25,5,0);  ctrl.target.set(0,4,0); };
$('bIso').onclick = () => { camera.position.set(15,12,15); ctrl.target.set(0,4,0); };

/* ═══════════════════════════════════════════════════════
   PANEL DE INFORMACIÓN
═══════════════════════════════════════════════════════ */
let ipVis = true;
$('bIn').onclick  = () => { ipVis = !ipVis; $('ip').classList.toggle('hide', !ipVis); };
$('bPP').onclick  = e  => { $('ppP').classList.toggle('vis'); e.currentTarget.classList.toggle('active'); };
$('ppB').oninput  = e  => bloom.strength = e.target.value / 100 * 0.65;
$('ppE').oninput  = e  => renderer.toneMappingExposure = e.target.value / 100;
$('ppC').oninput  = e  => cgPass.uniforms.contrast.value = e.target.value / 100;
$('ppV').oninput  = e  => cgPass.uniforms.vign.value = e.target.value / 100;

/* ═══════════════════════════════════════════════════════
   CONTROL DE PISOS (6 niveles)
═══════════════════════════════════════════════════════ */
const FLOOR_NAMES = ['Térreo', '2º Pavto', '3º Pavto', 'Ático', 'Cobertura', 'Cx. Água', 'Todos'];
let floorActive = false, currentFloor = 6;

$('bFloor').onclick = e => {
    floorActive = !floorActive;
    $('floorSlider').classList.toggle('vis', floorActive);
    e.currentTarget.classList.toggle('active', floorActive);
    if (!floorActive) { currentFloor = 6; $('floorRange').value = 6; updateFloors(); }
};
$('floorRange').setAttribute('max', '6');
$('floorRange').oninput = e => { currentFloor = parseInt(e.target.value); updateFloors(); };

function updateFloors() {
    $('floorLevel').textContent = FLOOR_NAMES[currentFloor] || `Nivel ${currentFloor}`;
    if (!model) return;
    allMeshes.forEach(mesh => {
        const mat = mesh.material; if (!mat) return;
        if (currentFloor === 6) {
            mat.transparent = false; mat.opacity = 1; mat.depthWrite = true;
        } else {
            const visible = mesh._floor <= currentFloor;
            mat.transparent = !visible; mat.opacity = visible ? 1 : 0.08; mat.depthWrite = visible;
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
   HIGHLIGHT DE COMPONENTES
═══════════════════════════════════════════════════════ */
function setHighlight(sel) {
    allMeshes.forEach(mesh => {
        const mat = mesh.material; if (!mat) return;
        if (sel === 'all') {
            mat.transparent = false; mat.opacity = 1; mat.depthWrite = true; mat.emissiveIntensity = 0.08;
            return;
        }
        let isTarget = false;
        const t = mesh._type, f = mesh._floor;

        if      (sel === 'columns'       && t === 'column')                        isTarget = true;
        else if (sel === 'walls'         && t === 'column')                        isTarget = true;
        else if (sel === 'shear_walls'   && t === 'column')                        isTarget = true;
        else if (sel === 'slabs'         && t === 'slab')                          isTarget = true;
        else if (sel === 'roof'          && (f === 4 || f === 5))                  isTarget = true;
        else if (sel === 'beams'         && (t === 'beam' || t === 'beam_secondary')) isTarget = true;
        else if (sel === 'foundation'    && (t === 'foundation' || f === 0))       isTarget = true;
        else if (sel === 'core'          && t === 'column')                        isTarget = true;
        else if (sel === 'frame'         && (t === 'column' || t === 'beam'))      isTarget = true;
        else if (sel === 'ground_floor'  && f === 0)                               isTarget = true;
        else if (sel === 'typical_floor' && (f === 1 || f === 2))                  isTarget = true;
        else if (sel === 'top_floor'     && (f === 3 || f === 4 || f === 5))       isTarget = true;
        else if (sel === 'load_path'     && (t === 'slab' || t === 'column'))      isTarget = true;
        else if (sel === 'seismic'       && (t === 'column' || t === 'beam'))      isTarget = true;

        mat.transparent      = !isTarget;
        mat.opacity          = isTarget ? 1 : 0.07;
        mat.depthWrite       = isTarget;
        mat.emissiveIntensity = isTarget ? 0.28 : 0.02;
    });
}

document.querySelectorAll('.hl-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const p    = btn.dataset.part;
        const info = RIBEIRO_PART_INFO[p];
        if (info) {
            $('ipN').textContent = info.n;
            $('ipS').textContent = info.s;
            $('ipD').textContent = info.d;
            $('ipSt').innerHTML  = info.st.map(s =>
                `<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`
            ).join('');
        }
        setHighlight(p);
    };
});

/* ═══════════════════════════════════════════════════════
   SIMULADORES SÍSMICOS
═══════════════════════════════════════════════════════ */
let earthquakeSimulator = null;
let collapseSimulator   = null;

function initializeSeismicSimulators() {
    if (!model || allMeshes.length === 0) {
        setTimeout(initializeSeismicSimulators, 1000); return;
    }
    const bbox           = new THREE.Box3().setFromObject(model);
    const buildingHeight = bbox.max.y - bbox.min.y;

    earthquakeSimulator = new EarthquakeSimulator(THREE, model, scene, {
        buildingHeight, numFloors: 6, camera,
        damping: 0.05, magnitude: 6.5, duration: 30, soilType: 'firm',
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
            $('seismicState').textContent  = '⚠️ DAÑADO';
            $('seismicState').className    = 'seismic-status-value warning';
            const mag = earthquakeSimulator.config.magnitude;
            const thr = mag >= 8.0 ? 0.15 : mag >= 7.0 ? 0.25 : 0.40;
            if ($('allowCollapse').checked && drift > thr && collapseSimulator) {
                collapseSimulator.initiateCollapse('seismic');
            }
        },
        onComplete: () => { $('seismicState').textContent = 'Terremoto finalizado'; }
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
    $('seismicState').textContent  = 'Estable';
    $('seismicState').className    = 'seismic-status-value';
    $('seismicDrift').textContent  = '0.00%';
    $('seismicDrift').className    = 'seismic-status-value';
    $('seismicTime').textContent   = '0.0s';
    $('collapseProgress').textContent = '0%';
    setHighlight('all');
};
$('showCracks').onchange = e => { if (collapseSimulator) collapseSimulator.config.showCracks = e.target.checked; };

/* ═══════════════════════════════════════════════════════
   ANOTACIONES
═══════════════════════════════════════════════════════ */
let annotationSystem = null;
function initializeAnnotations() {
    if (!model || allMeshes.length === 0) { setTimeout(initializeAnnotations, 1000); return; }
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
    accentLight.intensity = 1.0 + Math.sin(t * 0.0012) * 0.18;
    if (annotationSystem?.visible) annotationSystem.update();
    composer.render();
})(performance.now());