import * as THREE from 'three';
import { GLTFLoader }      from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls }   from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass }      from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass }        from 'three/addons/postprocessing/SMAAPass.js';
// getGoldenCategory, getGoldenFloor, GOLDEN_PART_INFO → cargados via script tag
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
scene.fog        = new THREE.FogExp2(0x8a8a8a, 0.008); // menos niebla para torre alta

const camera = new THREE.PerspectiveCamera(50, innerWidth / (innerHeight - 58), 0.01, 300);
camera.position.set(25, 20, 25);

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
ctrl.minDistance     = 8;
ctrl.maxDistance     = 80;
ctrl.target.set(0, 8, 0);
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

scene.add(new THREE.HemisphereLight(0xb0c4d8, 0x443322, 0.7));

const sunLight = new THREE.DirectionalLight(0xfff4e6, 3.5);
sunLight.position.set(20, 35, 18);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near   = 0.5;  sunLight.shadow.camera.far    = 100;
sunLight.shadow.camera.left   = -30;  sunLight.shadow.camera.right  = 30;
sunLight.shadow.camera.top    = 50;   sunLight.shadow.camera.bottom = -10;
sunLight.shadow.bias          = -0.0006;
sunLight.shadow.normalBias    = 0.03;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x90b0ff, 1.4);
fillLight.position.set(-15, 12, -10);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffc080, 2.0);
rimLight.position.set(-8, -4, -18);
scene.add(rimLight);

const accentLight = new THREE.PointLight(0xffd700, 1.2, 40);
accentLight.position.set(8, 20, 10);
scene.add(accentLight);

scene.add(new THREE.PointLight(0xffffff, 0.7, 30).translateX(-10).translateY(8).translateZ(12));

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
   CARGA DEL MODELO GLB — COLORES ORIGINALES PRESERVADOS
═══════════════════════════════════════════════════════ */
setLoad(50, 'Cargando Edificio Golden...');
let model       = null;
const allMeshes = [];
let floorGroups = [];

new GLTFLoader().load(
    'models/edificio_golden.glb',
    (gltf) => {
        setLoad(80, 'Optimizando materiales...');
        model = gltf.scene;

        const box  = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const sc   = 22 / Math.max(size.x, size.y, size.z); // más grande para torre de 20+
        model.scale.setScalar(sc);

        const sb  = new THREE.Box3().setFromObject(model);
        const ctr = sb.getCenter(new THREE.Vector3());
        model.position.sub(ctr);
        model.position.y = -sb.min.y * sc;

        const totalH = sb.max.y - sb.min.y;
        const numFloors = 22;
        const floorH = totalH / numFloors;
        let meshIdx  = 0;

        model.traverse(child => {
            if (!child.isMesh) return;
            child.castShadow    = true;
            child.receiveShadow = true;
            child._idx          = meshIdx++;

            const nodeName = child.parent ? child.parent.name : child.name;
            const category = getGoldenCategory(nodeName);
            const floor    = getGoldenFloor(nodeName);

            child._type  = category;
            child._floor = floor >= 0
                ? Math.min(floor, numFloors)
                : Math.floor((child.getWorldPosition(new THREE.Vector3()).y - sb.min.y) / floorH);
            child._floor = Math.max(0, Math.min(numFloors, child._floor));

            if (!floorGroups[child._floor]) floorGroups[child._floor] = [];
            floorGroups[child._floor].push(child);

            // ── PRESERVAR COLORES ORIGINALES DEL GLB ──
            const origMat = Array.isArray(child.material) ? child.material[0] : child.material;
            const mat = new THREE.MeshStandardMaterial();

            if (origMat && origMat.color) mat.color.copy(origMat.color);
            if (origMat && origMat.map)   mat.map = origMat.map;

            // Propiedades físicas según tipo — sin cambiar color
            switch (category) {
                case 'column':
                    mat.roughness = 0.65; mat.metalness = 0.10; mat.emissiveIntensity = 0.06; break;
                case 'beam':
                    mat.roughness = 0.70; mat.metalness = 0.08; mat.emissiveIntensity = 0.05; break;
                case 'wall':
                    mat.roughness = 0.75; mat.metalness = 0.05; mat.emissiveIntensity = 0.04; break;
                case 'slab':
                    mat.roughness = 0.72; mat.metalness = 0.06; mat.emissiveIntensity = 0.04; break;
                case 'roof':
                    mat.roughness = 0.60; mat.metalness = 0.12; mat.emissiveIntensity = 0.06; break;
                case 'foundation':
                    mat.roughness = 0.88; mat.metalness = 0.04; mat.emissiveIntensity = 0.03; break;
                case 'core':
                    mat.roughness = 0.68; mat.metalness = 0.08; mat.emissiveIntensity = 0.07; break;
                case 'facade':
                    mat.roughness = 0.15; mat.metalness = 0.55; mat.emissiveIntensity = 0.08;
                    if (origMat && origMat.transparent) { mat.transparent = true; mat.opacity = origMat.opacity || 0.7; }
                    break;
                default:
                    mat.roughness = 0.70; mat.metalness = 0.07; mat.emissiveIntensity = 0.04;
            }

            mat.emissive        = new THREE.Color(0.02, 0.02, 0.03);
            mat.envMapIntensity = 1.2;
            mat.needsUpdate     = true;

            mat._origColor    = mat.color.clone();
            mat._origEmissive = mat.emissive.clone();
            mat._origEI       = mat.emissiveIntensity;
            child._origColor  = mat.color.clone();
            child.material    = mat;

            allMeshes.push(child);
        });

        scene.add(model);

        // Plataforma base más grande para torre alta
        const platform = new THREE.Mesh(
            new THREE.BoxGeometry(40, 0.4, 40),
            new THREE.MeshStandardMaterial({
                color: 0x909090, roughness: 0.95, metalness: 0.05,
                emissive: 0x808080, emissiveIntensity: 0.1
            })
        );
        platform.position.y = -0.5;
        platform.receiveShadow = true;
        scene.add(platform);

        const grid = new THREE.GridHelper(38, 60, 0x3a4a5a, 0x1f2a38);
        grid.position.y = -0.25;
        grid.material.opacity    = 0.35;
        grid.material.transparent = true;
        scene.add(grid);

        setLoad(100, '¡Edificio Golden listo!');
        setTimeout(() => $('ls').classList.add('hidden'), 500);

        setTimeout(() => {
            initializeSeismicSimulators();
            initializeAnnotations();
        }, 600);
    },
    p => {
        if (p.total) setLoad(50 + (p.loaded / p.total) * 30,
            'Descargando... ' + (p.loaded / 1024).toFixed(0) + 'KB');
    },
    e => {
        console.error(e);
        setLoad(0, 'Error: Verifica que edificio_golden.glb esté en models/.');
    }
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
$('bRst').onclick = ()  => { ctrl.target.set(0,8,0); camera.position.set(25,20,25); currentFloor=22; $('floorRange').value=22; updateFloors(); };
$('bZi').onclick  = ()  => camera.position.lerp(ctrl.target, 0.20);
$('bZo').onclick  = ()  => { const d = camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(1.2)); };
$('bFr').onclick  = ()  => { camera.position.set(0,10,40);  ctrl.target.set(0,8,0); };
$('bTo').onclick  = ()  => { camera.position.set(0,60,0.1); ctrl.target.set(0,8,0); };
$('bSi').onclick  = ()  => { camera.position.set(40,10,0);  ctrl.target.set(0,8,0); };
$('bIso').onclick = ()  => { camera.position.set(25,20,25); ctrl.target.set(0,8,0); };

/* ═══════════════════════════════════════════════════════
   PANEL DE INFORMACIÓN
═══════════════════════════════════════════════════════ */
let ipVis = true;
$('bIn').onclick  = ()  => { ipVis = !ipVis; $('ip').classList.toggle('hide', !ipVis); };
$('bPP').onclick  = e   => { $('ppP').classList.toggle('vis'); e.currentTarget.classList.toggle('active'); };
$('ppB').oninput  = e   => bloom.strength = e.target.value / 100 * 0.65;
$('ppE').oninput  = e   => renderer.toneMappingExposure = e.target.value / 100;
$('ppC').oninput  = e   => cgPass.uniforms.contrast.value = e.target.value / 100;
$('ppV').oninput  = e   => cgPass.uniforms.vign.value = e.target.value / 100;

/* ═══════════════════════════════════════════════════════
   CONTROL DE PISOS (22 niveles)
═══════════════════════════════════════════════════════ */
const FLOOR_NAMES = [
    'Planta Baja','Piso 1','Piso 2','Piso 3','Piso 4','Piso 5',
    'Piso 6','Piso 7','Piso 8','Piso 9','Piso 10','Piso 11',
    'Piso 12','Piso 13','Piso 14','Piso 15','Piso 16','Piso 17',
    'Piso 18','Piso 19','Piso 20','Ático','Cubierta','Todos'
];
let floorActive = false, currentFloor = 22;

$('bFloor').onclick = e => {
    floorActive = !floorActive;
    $('floorSlider').classList.toggle('vis', floorActive);
    e.currentTarget.classList.toggle('active', floorActive);
    if (!floorActive) { currentFloor = 22; $('floorRange').value = 22; updateFloors(); }
};
$('floorRange').setAttribute('max', '22');
$('floorRange').oninput = e => { currentFloor = parseInt(e.target.value); updateFloors(); };

function updateFloors() {
    $('floorLevel').textContent = FLOOR_NAMES[currentFloor] || `Nivel ${currentFloor}`;
    if (!model) return;
    allMeshes.forEach(mesh => {
        const mat = mesh.material; if (!mat) return;
        if (currentFloor === 22) {
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
let xrayActive = false;
$('bXray').onclick = e => {
    xrayActive = !xrayActive;
    $('xrayMode').classList.toggle('vis', xrayActive);
    e.currentTarget.classList.toggle('active', xrayActive);
    if (!xrayActive) {
        allMeshes.forEach(m => { m.material.transparent = false; m.material.opacity = 1; m.material.depthWrite = true; });
    }
};
$('xrayRange').oninput = e => {
    if (!xrayActive) return;
    const v = e.target.value / 100;
    allMeshes.forEach(m => {
        m.material.transparent = true;
        m.material.opacity = Math.max(0.04, 1 - v);
        m.material.depthWrite = v < 0.5;
    });
};

/* ═══════════════════════════════════════════════════════
   HIGHLIGHT DE COMPONENTES
═══════════════════════════════════════════════════════ */
const HL_MAP = {
    all:          null,
    columns:      ['column'],
    walls:        ['wall'],
    shear_walls:  ['wall', 'core'],
    slabs:        ['slab'],
    roof:         ['roof'],
    beams:        ['beam'],
    foundation:   ['foundation'],
    core:         ['core'],
    frame:        ['column', 'beam'],
    ground_floor: null,
    typical_floor: null,
    top_floor:    null,
    load_path:    ['slab', 'beam', 'column', 'foundation'],
    seismic:      ['wall', 'core'],
    facade:       ['facade'],
    stair:        ['stair'],
};

const DIM_OPACITY = 0.06;

function setHighlight(part) {
    if (!model) return;
    const info = GOLDEN_PART_INFO[part] || GOLDEN_PART_INFO.all;
    $('ipN').textContent = info.n;
    $('ipS').textContent = info.s;
    $('ipD').textContent = info.d;
    const st = $('ipSt');
    st.innerHTML = '';
    (info.st || []).forEach(s => {
        st.innerHTML += `<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`;
    });

    const types = HL_MAP[part];

    if (part === 'ground_floor' || part === 'typical_floor' || part === 'top_floor') {
        const tf = part === 'ground_floor' ? [0] : part === 'typical_floor'
            ? Array.from({length: 19}, (_, i) => i + 1)
            : [20, 21, 22];
        allMeshes.forEach(m => {
            const vis = tf.includes(m._floor);
            m.material.color.copy(vis ? m._origColor : new THREE.Color(0.1, 0.1, 0.12));
            m.material.transparent    = !vis;
            m.material.opacity        = vis ? 1 : DIM_OPACITY;
            m.material.emissiveIntensity = vis ? 0.08 : 0.0;
            m.material.depthWrite     = vis;
        });
        return;
    }

    allMeshes.forEach(m => {
        if (!types) {
            m.material.color.copy(m._origColor);
            m.material.transparent    = false;
            m.material.opacity        = 1;
            m.material.emissiveIntensity = 0.04;
            m.material.depthWrite     = true;
        } else {
            const match = types.includes(m._type);
            m.material.color.copy(match ? m._origColor : new THREE.Color(0.08, 0.09, 0.11));
            m.material.transparent    = !match;
            m.material.opacity        = match ? 1 : DIM_OPACITY;
            m.material.emissiveIntensity = match ? 0.14 : 0.0;
            m.material.depthWrite     = match;
        }
    });
}

document.querySelectorAll('.hl-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setHighlight(btn.dataset.part);
    };
});

/* ═══════════════════════════════════════════════════════
   SIMULADORES SÍSMICOS
═══════════════════════════════════════════════════════ */
let earthquakeSimulator = null;
let collapseSimulator   = null;

function initializeSeismicSimulators() {
    if (!model || allMeshes.length === 0) { setTimeout(initializeSeismicSimulators, 500); return; }

    const box = new THREE.Box3().setFromObject(model);
    const bH  = box.max.y - box.min.y;

    earthquakeSimulator = new EarthquakeSimulator(THREE, model, scene, {
        camera,
        buildingHeight: bH,
        numFloors: 22,
        damping: 0.03,
        magnitude: 6.5,
        duration: 30,
        soilType: 'firm',
        onUpdate: (data) => {
            $('seismicDrift').textContent = data.driftPercent + '%';
            $('seismicTime').textContent  = data.time.toFixed(1) + 's';
            $('seismicMiniStatus').textContent = `M${earthquakeSimulator.config.magnitude} · ${data.time.toFixed(0)}s · ${data.driftPercent}%`;
            const dc = data.drift > 0.05 ? 'danger' : data.drift > 0.02 ? 'warning' : '';
            $('seismicDrift').className = 'seismic-status-value ' + dc;
            if (collapseSimulator && data.drift > 0.04) {
                allMeshes.forEach(mesh => collapseSimulator.applyDamage(mesh, data.drift * 2));
            }
        },
        onDamage: (drift) => {
            $('seismicState').textContent = '⚠️ DAÑADO';
            $('seismicState').className   = 'seismic-status-value warning';
            if (collapseSimulator && $('allowCollapse').checked) {
                collapseSimulator.initiateCollapse('seismic');
            }
        },
        onComplete: () => {
            $('seismicState').textContent = 'Completado';
            $('seismicState').className   = 'seismic-status-value';
        }
    });

    earthquakeSimulator.initialize();

    collapseSimulator = new BuildingCollapseSimulator(THREE, model, scene, {
        collapseType: 'progressive', criticalDrift: 0.08,
        gravity: 9.81, debrisGeneration: true, dustEffect: true,
        showCracks: $('showCracks').checked,
        onPhaseChange: (phase) => {
            const n = { stable:'Estable', cracking:'🔴 Agrietando', failing:'🔴 Fallando', collapsing:'💥 COLAPSANDO', collapsed:'💀 Colapsado' };
            $('seismicState').textContent = n[phase] || phase;
            if (phase === 'collapsing' || phase === 'collapsed') $('seismicState').className = 'seismic-status-value danger';
        },
        onComplete: () => { $('seismicState').textContent = '💀 COLAPSADO'; $('collapseProgress').textContent = '100%'; }
    });

    collapseSimulator.initialize(earthquakeSimulator);
    console.log('✅ Simuladores Edificio Golden inicializados');
}

/* ═══════════════════════════════════════════════════════
   ANOTACIONES
═══════════════════════════════════════════════════════ */
let annotationSystem = null;

function initializeAnnotations() {
    if (!model || allMeshes.length === 0) { setTimeout(initializeAnnotations, 500); return; }
    annotationSystem = new AnnotationSystem(THREE, scene, camera, renderer, model, allMeshes);
    console.log('📌 Anotaciones Edificio Golden inicializadas');
}

$('bAnn').onclick = e => {
    if (!annotationSystem) { alert('Sistema de anotaciones cargando...'); return; }
    e.currentTarget.classList.toggle('active', annotationSystem.toggle());
};

/* ═══════════════════════════════════════════════════════
   CONTROLES PANEL SÍSMICO
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
    $('seismicState').textContent    = 'Estable';
    $('seismicState').className      = 'seismic-status-value';
    $('seismicDrift').textContent    = '0.00%';
    $('seismicDrift').className      = 'seismic-status-value';
    $('seismicTime').textContent     = '0.0s';
    $('collapseProgress').textContent = '0%';
    setHighlight('all');
};
$('showCracks').onchange = e => { if (collapseSimulator) collapseSimulator.config.showCracks = e.target.checked; };

/* ═══════════════════════════════════════════════════════
   LOOP DE ANIMACIÓN
═══════════════════════════════════════════════════════ */
let lastTime = performance.now();
let lt = performance.now(), fc = 0;

(function animLoop(t) {
    requestAnimationFrame(animLoop);
    const dt = (t - lastTime) / 1000;
    lastTime = t;
    if (earthquakeSimulator && earthquakeSimulator.config.active) earthquakeSimulator.update(dt);
    if (collapseSimulator   && collapseSimulator.config.active) {
        collapseSimulator.update(dt);
        $('collapseProgress').textContent = (collapseSimulator.state.collapseProgress * 100).toFixed(0) + '%';
    }
    fc++;
    if (t - lt >= 1000) { $('fps').textContent = fc + ' FPS'; fc = 0; lt = t; }
    ctrl.update();
    accentLight.intensity = 1.2 + Math.sin(t * 0.0010) * 0.22;
    if (annotationSystem && annotationSystem.visible) annotationSystem.update();
    composer.render();
})(performance.now());