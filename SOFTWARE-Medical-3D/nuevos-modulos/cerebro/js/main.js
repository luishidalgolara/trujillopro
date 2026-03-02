import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {SMAAPass} from 'three/addons/postprocessing/SMAAPass.js';

const $=id=>document.getElementById(id);
const lbFill=$('lbFill'), lbTxt=$('lbTxt'), ls=$('ls');
const setLoad=(p,t)=>{lbFill.style.width=p+'%';lbTxt.textContent=t};

// ===== SCENE =====
setLoad(10,'Configurando escena...');
const canvas=$('mainCanvas');
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xf5f7fa);
scene.fog=new THREE.FogExp2(0xf5f7fa,0.016);

const camera=new THREE.PerspectiveCamera(42,innerWidth/(innerHeight-52),0.01,100);
camera.position.set(0,0.5,4.0);

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setSize(innerWidth,innerHeight-52);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.05;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera,canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.06;
ctrl.rotateSpeed=0.7; ctrl.zoomSpeed=0.8;
ctrl.minDistance=1.0; ctrl.maxDistance=12;
ctrl.target.set(0,0,0);
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.35;

// ===== ENVIRONMENT =====
setLoad(20,'Generando environment...');
const pmrem=new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
const envSc=new THREE.Scene();
envSc.add(new THREE.Mesh(new THREE.SphereGeometry(10,32,32),new THREE.ShaderMaterial({
    side:THREE.BackSide,
    vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`varying vec3 vP;void main(){
        vec3 d=normalize(vP);float y=d.y*.5+.5;
        vec3 c=mix(vec3(.88,.90,.94),mix(vec3(.94,.96,.98),vec3(.98,.99,1.0),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
        c+=vec3(.80,.88,1.0)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.4)))),8.)*.18;
        c+=vec3(.70,.80,.90)*pow(max(0.,dot(d,normalize(vec3(-.6,.3,-.5)))),5.)*.10;
        gl_FragColor=vec4(c,1.);}`
})));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

// ===== LIGHTING =====
setLoad(30,'Iluminación...');
scene.add(new THREE.HemisphereLight(0xddeeff,0xaabbcc,1.10));
const keyLight=new THREE.DirectionalLight(0xffffff,3.8);
keyLight.position.set(3,5,4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0xccddf0,1.4);
fillLight.position.set(-5,3,-2); scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xffffff,1.6);
rimLight.position.set(-2,-1,-5); scene.add(rimLight);
const sssLight=new THREE.PointLight(0xffccaa,0.60,8);
sssLight.position.set(0,-1,1.5); scene.add(sssLight);
const topLight=new THREE.PointLight(0xffffff,1.20,14);
topLight.position.set(0,5,3); scene.add(topLight);

// ===== POST-PROCESSING =====
setLoad(40,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.08,0.40,0.88);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},sss:{value:0.25},vign:{value:0.82}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sss;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.299,.587,.114));float sm=smoothstep(.55,.80,lum)*(1.-smoothstep(.80,.99,lum));
    c+=vec3(.60,.25,.15)*sss*sm*.07;c=(c-.5)*1.05+.5;
    vec2 u=vUv*2.-1.;float dist=dot(u,u);
    float v1=1.-smoothstep(0.0,1.0,dist)*vign*0.75;
    float v2=1.-pow(dist,1.4)*vign*0.55;
    float v3=1.-pow(max(0.,dist-0.2),2.0)*vign*0.40;
    c*=min(v1,min(v2,v3));
    float corner=pow(max(abs(vUv.x-.5),abs(vUv.y-.5))*2.0,3.0)*vign*0.35;
    c*=1.-corner;gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

// ===== MAPA DE MATERIALES POR ESTRUCTURA =====
// Cada entrada: regex del nombre del mesh → propiedades del material
const STRUCTURE_MATERIALS = [
    {
        re: /t.?lamo/i,
        r:0.55, m:0, sheen:0.3, sheenC:[0.80,0.30,0.30],
        emissive:[0.18,0.05,0.05], emI:0.12, env:0.30,
        label:'tálamo'
    },
    {
        re: /tronco|pedunculo|pedúnculo/i,
        r:0.70, m:0, sheen:0.25, sheenC:[0.75,0.55,0.35],
        emissive:[0.10,0.07,0.03], emI:0.10, env:0.20,
        label:'tronco'
    },
    {
        re: /septum|pel.?cido/i,
        r:0.40, m:0, clearcoat:0.30, clearcoatR:0.40,
        sheen:0.15, sheenC:[0.70,0.70,0.75],
        emissive:[0.05,0.05,0.08], emI:0.08, env:0.35,
        transparent:true, opacity:0.72,
        label:'septum'
    },
    {
        re: /quiasma|.?ptico/i,
        r:0.45, m:0, clearcoat:0.40, clearcoatR:0.25,
        sheen:0.20, sheenC:[0.80,0.80,0.50],
        emissive:[0.08,0.08,0.03], emI:0.10, env:0.40,
        label:'quiasma'
    },
    {
        re: /nucleo.?caudado|núcleo.?caudado/i,
        r:0.60, m:0, sheen:0.35, sheenC:[0.70,0.45,0.25],
        emissive:[0.12,0.07,0.02], emI:0.12, env:0.25,
        label:'gangbasales'
    },
    {
        re: /materia.?gris|materia gris/i,
        r:0.72, m:0, sheen:0.40, sheenC:[0.80,0.55,0.52],
        thickness:1.2, attC:[0.90,0.60,0.55], attD:0.8,
        emissive:[0.10,0.05,0.04], emI:0.10, env:0.25,
        label:'frontal'
    },
    {
        re: /materia.?blanca|materia blanca/i,
        r:0.55, m:0, clearcoat:0.15, clearcoatR:0.50,
        sheen:0.20, sheenC:[0.92,0.88,0.82],
        emissive:[0.07,0.06,0.05], emI:0.08, env:0.30,
        label:'cuerpocalloso'
    },
    {
        re: /hipofisis|hipófisis/i,
        r:0.50, m:0, sheen:0.30, sheenC:[0.80,0.35,0.35],
        emissive:[0.15,0.04,0.04], emI:0.14, env:0.30,
        label:'hipotálamo'
    },
    {
        re: /hipocampo/i,
        r:0.62, m:0, sheen:0.35, sheenC:[0.30,0.75,0.70],
        emissive:[0.03,0.12,0.11], emI:0.14, env:0.28,
        label:'hipocampo'
    },
    {
        re: /pineal|gl.?ndula/i,
        r:0.48, m:0.02, clearcoat:0.35, clearcoatR:0.30,
        sheen:0.25, sheenC:[0.75,0.40,0.70],
        emissive:[0.10,0.03,0.10], emI:0.14, env:0.40,
        label:'gangbasales'
    },
    {
        re: /globo.?p.?lido|globo pálido/i,
        r:0.58, m:0, sheen:0.30, sheenC:[0.65,0.72,0.40],
        emissive:[0.06,0.10,0.03], emI:0.12, env:0.25,
        label:'gangbasales'
    },
    {
        re: /f.?rnix|fórnix/i,
        r:0.50, m:0, clearcoat:0.20, clearcoatR:0.40,
        sheen:0.25, sheenC:[0.35,0.75,0.72],
        emissive:[0.03,0.10,0.10], emI:0.12, env:0.35,
        label:'hipocampo'
    },
    {
        re: /c.?psula.?interna|cápsula/i,
        r:0.55, m:0, sheen:0.20, sheenC:[0.75,0.73,0.75],
        emissive:[0.06,0.06,0.08], emI:0.09, env:0.28,
        label:'cuerpocalloso'
    },
    {
        re: /mamilar/i,
        r:0.52, m:0, sheen:0.28, sheenC:[0.80,0.25,0.20],
        emissive:[0.14,0.03,0.02], emI:0.12, env:0.28,
        label:'hipotálamo'
    },
    {
        re: /cuerpo.?calloso/i,
        r:0.48, m:0, clearcoat:0.25, clearcoatR:0.35,
        sheen:0.25, sheenC:[0.72,0.70,0.90],
        emissive:[0.06,0.05,0.14], emI:0.12, env:0.38,
        label:'cuerpocalloso'
    },
    {
        re: /comisura/i,
        r:0.50, m:0, clearcoat:0.20, clearcoatR:0.40,
        sheen:0.22, sheenC:[0.80,0.76,0.80],
        emissive:[0.06,0.05,0.10], emI:0.10, env:0.32,
        label:'cuerpocalloso'
    },
    {
        re: /cerebelo/i,
        r:0.68, m:0, sheen:0.35, sheenC:[0.45,0.72,0.58],
        emissive:[0.04,0.12,0.06], emI:0.12, env:0.24,
        label:'cerebelo'
    },
    {
        re: /am.?gdala|amígdala/i,
        r:0.60, m:0, sheen:0.38, sheenC:[0.80,0.30,0.55],
        emissive:[0.12,0.03,0.08], emI:0.14, env:0.28,
        label:'amígdala'
    },
    {
        re: /putamen/i,
        r:0.62, m:0, sheen:0.32, sheenC:[0.65,0.30,0.28],
        emissive:[0.14,0.04,0.04], emI:0.13, env:0.26,
        label:'gangbasales'
    },
];

function getMaterialConfig(name) {
    for(const s of STRUCTURE_MATERIALS){
        if(s.re.test(name)) return s;
    }
    return null;
}

function buildPhysicalMat(origMat, cfg) {
    const pm = new THREE.MeshPhysicalMaterial();

    // Heredar color original del GLB (ya tiene buenos colores)
    if(origMat){
        if(origMat.map)        { pm.map = origMat.map; }
        if(origMat.normalMap)  { pm.normalMap = origMat.normalMap; pm.normalScale = new THREE.Vector2(1.2,1.2); }
        if(origMat.color)        pm.color.copy(origMat.color);
        // Convertir de linear a sRGB para que los colores del GLB se vean correctos
        pm.color.convertLinearToSRGB();
    }

    if(cfg){
        pm.roughness   = cfg.r    ?? 0.68;
        pm.metalness   = cfg.m    ?? 0;
        if(cfg.clearcoat  != null){ pm.clearcoat = cfg.clearcoat; pm.clearcoatRoughness = cfg.clearcoatR ?? 0.40; }
        if(cfg.sheen      != null){ pm.sheen = cfg.sheen; pm.sheenRoughness = 0.55; pm.sheenColor = new THREE.Color(...(cfg.sheenC||[0.8,0.6,0.5])); }
        if(cfg.thickness  != null){ pm.thickness = cfg.thickness; pm.attenuationColor = new THREE.Color(...(cfg.attC||[0.9,0.6,0.55])); pm.attenuationDistance = cfg.attD ?? 1.0; }
        if(cfg.transparent){ pm.transparent = true; pm.opacity = cfg.opacity ?? 0.75; pm.depthWrite = false; }
        pm.emissive = new THREE.Color(...(cfg.emissive||[0.05,0.04,0.04]));
        pm.emissiveIntensity = cfg.emI ?? 0.09;
        pm.envMapIntensity   = cfg.env ?? 0.28;
    } else {
        // Default genérico
        pm.roughness = 0.68; pm.metalness = 0;
        pm.sheen = 0.28; pm.sheenRoughness = 0.55;
        pm.sheenColor = new THREE.Color(0.80,0.60,0.55);
        pm.emissive = new THREE.Color(0.06,0.04,0.04); pm.emissiveIntensity = 0.09;
        pm.envMapIntensity = 0.25;
    }

    pm.side = THREE.DoubleSide;
    return pm;
}

// ===== MATERIALES CEREBRO COMPLETO =====
function applyCompletoBrainMaterials(model, meshes) {
    model.traverse(child=>{
        if(!child.isMesh) return;
        child.castShadow=true; child.receiveShadow=true;
        meshes.push(child);
        const mat = child.material;
        const pm  = new THREE.MeshPhysicalMaterial();
        if(mat){
            if(mat.map) pm.map=mat.map;
            if(mat.normalMap){ pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.4,1.4); }
            if(mat.color) pm.color.copy(mat.color);
        }
        pm.roughness=0.72; pm.metalness=0;
        pm.sheen=0.40; pm.sheenRoughness=0.55;
        pm.sheenColor=new THREE.Color(0.80,0.55,0.52);
        pm.thickness=1.2; pm.attenuationColor=new THREE.Color(0.90,0.60,0.55); pm.attenuationDistance=0.8;
        pm.emissive=new THREE.Color(0.08,0.04,0.04); pm.emissiveIntensity=0.10;
        pm.envMapIntensity=0.25; pm.side=THREE.DoubleSide;
        child.material=pm;
    });
}

// ===== MATERIALES ENCÉFALO DETALLADO (26 meshes) =====
// meshMap: nombre del mesh → material THREE para poder hacer highlight
const encefaloMeshMap = {};

function applyEncefaloMaterials(model, meshes) {
    model.traverse(child=>{
        if(!child.isMesh) return;
        child.castShadow=true; child.receiveShadow=true;
        meshes.push(child);

        const name   = child.name || '';
        const cfg    = getMaterialConfig(name);
        const pm     = buildPhysicalMat(child.material, cfg);
        child.material = pm;

        // Guardar para highlight
        const label = cfg ? cfg.label : 'all';
        if(!encefaloMeshMap[label]) encefaloMeshMap[label]=[];
        encefaloMeshMap[label].push(child);
    });
}

// ===== CARGA DE MODELOS =====
setLoad(50,'Cargando cerebro completo...');
let modelCompleto=null, modelEncefalo=null;
let meshesCompleto=[], meshesEncefalo=[];
let cortandoActivo=false, cargaCompleta=false;
const loader=new GLTFLoader();

function normalizarModelo(gltf){
    const m=gltf.scene;
    const box=new THREE.Box3().setFromObject(m);
    const sz=box.getSize(new THREE.Vector3());
    const sc=3.0/Math.max(sz.x,sz.y,sz.z);
    m.scale.setScalar(sc);
    const sb=new THREE.Box3().setFromObject(m);
    m.position.sub(sb.getCenter(new THREE.Vector3()));
    return m;
}

function addGround(model){
    const box=new THREE.Box3().setFromObject(model);
    const gnd=new THREE.Mesh(
        new THREE.PlaneGeometry(18,18),
        new THREE.MeshStandardMaterial({color:0xf0f2f6,roughness:0.96,transparent:true,opacity:0.5})
    );
    gnd.rotation.x=-Math.PI/2;
    gnd.position.y=box.min.y-0.06;
    gnd.receiveShadow=true;
    scene.add(gnd);
}

loader.load('CEREBRO-COMPLETO.glb',
    (gltf)=>{
        setLoad(75,'Mejorando materiales...');
        modelCompleto=normalizarModelo(gltf);
        applyCompletoBrainMaterials(modelCompleto,meshesCompleto);
        scene.add(modelCompleto);
        addGround(modelCompleto);

        setLoad(80,'Cargando encéfalo detallado...');
        loader.load('encefalo_humano.glb',
            (gltf2)=>{
                modelEncefalo=normalizarModelo(gltf2);
                applyEncefaloMaterials(modelEncefalo,meshesEncefalo);
                modelEncefalo.visible=false;
                scene.add(modelEncefalo);
                setLoad(100,'¡Listo!');
                cargaCompleta=true;
                setTimeout(()=>ls.classList.add('hidden'),500);
            },
            p=>{if(p.total) setLoad(80+(p.loaded/p.total)*18,'Cargando encéfalo... '+(p.loaded/1024|0)+'KB')},
            e=>{
                console.warn('encefalo_humano.glb no encontrado:',e);
                setLoad(100,'¡Listo! (sin modelo de corte)');
                cargaCompleta=true;
                setTimeout(()=>ls.classList.add('hidden'),500);
            }
        );
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*25,'Descargando cerebro... '+(p.loaded/1024|0)+'KB')},
    e=>{console.error(e); setLoad(0,'Error: verifica CEREBRO-COMPLETO.glb en la misma carpeta.');}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS';fc=0;lt=t;}
    ctrl.update();
    sssLight.intensity=0.60+Math.sin(t*0.0007)*0.08;
    topLight.intensity=0.70+Math.cos(t*0.0009)*0.05;
    composer.render();
})(0);

addEventListener('resize',()=>{
    const w=innerWidth, h=innerHeight-52;
    camera.aspect=w/h; camera.updateProjectionMatrix();
    renderer.setSize(w,h); composer.setSize(w,h); bloom.setSize(w,h);
});

// ===== TOAST =====
let toastEl=document.createElement('div');
toastEl.className='toast'; document.body.appendChild(toastEl);
let toastTimer=null;
function showToast(msg){
    toastEl.textContent=msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2400);
}

// ===== BOTÓN TIJERA ✂️ =====
$('bCut').onclick=()=>{
    if(!cargaCompleta) return;
    cortandoActivo=!cortandoActivo;
    canvas.classList.add('switching');
    setTimeout(()=>{
        if(cortandoActivo){
            if(modelCompleto) modelCompleto.visible=false;
            if(modelEncefalo){ modelEncefalo.visible=true; }
            else { cortandoActivo=false; showToast('Modelo de corte no disponible'); canvas.classList.remove('switching'); return; }
            $('bCut').classList.add('active');
            $('modelBadge').textContent='ESTRUCTURAS INTERNAS';
            $('modelBadge').classList.add('corte');
            camera.position.set(0,0.2,3.8);
            ctrl.target.set(0,0,0);
            showToast('✂️ Encéfalo detallado — 26 estructuras anatómicas');
        } else {
            if(modelEncefalo) modelEncefalo.visible=false;
            if(modelCompleto)  modelCompleto.visible=true;
            $('bCut').classList.remove('active');
            $('modelBadge').textContent='COMPLETO';
            $('modelBadge').classList.remove('corte');
            camera.position.set(0,0.5,4.0);
            ctrl.target.set(0,0,0);
            showToast('🧠 Cerebro completo restaurado');
        }
        canvas.classList.remove('switching');
    },250);
};

// ===== CONTROLES =====
let ar=true;
$('bRot').onclick=e=>{ar=!ar;ctrl.autoRotate=ar;e.currentTarget.classList.toggle('active',ar)};
$('bRst').onclick=()=>{ctrl.target.set(0,0,0);camera.position.set(cortandoActivo?0:0,cortandoActivo?0.2:0.5,cortandoActivo?3.8:4.0)};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.15);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(0.5))};
$('bFr').onclick=()=>{camera.position.set(0,0,4);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{camera.position.set(0,4,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{camera.position.set(4,0,0);ctrl.target.set(0,0,0)};
$('bBk').onclick=()=>{camera.position.set(0,0,-4);ctrl.target.set(0,0,0)};
let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.5;
$('ppE').oninput=e=>renderer.toneMappingExposure=e.target.value/100;
$('ppS').oninput=e=>cgPass.uniforms.sss.value=e.target.value/100;
$('ppV').oninput=e=>cgPass.uniforms.vign.value=e.target.value/100;

// ===== HIGHLIGHT =====
const GLOW_MAP = {
    all:           [0.05,0.03,0.03, 0.09],
    frontal:       [0.04,0.06,0.18, 0.26],
    parietal:      [0.04,0.16,0.06, 0.24],
    temporal:      [0.18,0.08,0.03, 0.24],
    occipital:     [0.18,0.14,0.02, 0.24],
    insula:        [0.12,0.04,0.18, 0.24],
    gangbasales:   [0.20,0.05,0.04, 0.28],
    tálamo:        [0.20,0.05,0.05, 0.26],
    hipocampo:     [0.02,0.16,0.14, 0.26],
    amígdala:      [0.16,0.03,0.12, 0.26],
    hipotálamo:    [0.03,0.14,0.18, 0.26],
    cerebelo:      [0.04,0.16,0.06, 0.24],
    tronco:        [0.14,0.09,0.03, 0.22],
    cuerpocalloso: [0.05,0.06,0.18, 0.24],
    arterias:      [0.22,0.03,0.03, 0.30],
    venas:         [0.03,0.05,0.22, 0.26],
    lcr:           [0.02,0.12,0.18, 0.22],
    cortezamotora: [0.20,0.04,0.04, 0.28],
    cortezasensorial:[0.04,0.18,0.04,0.28],
    broca:         [0.16,0.14,0.02, 0.26],
    septum:        [0.05,0.05,0.10, 0.18],
};

function setHighlight(sel){
    const g = GLOW_MAP[sel] || GLOW_MAP.all;

    // Modelo completo — emissive uniforme
    meshesCompleto.forEach(mesh=>{
        mesh.material.emissive.setRGB(g[0],g[1],g[2]);
        mesh.material.emissiveIntensity=g[3];
    });

    // Modelo encéfalo — highlight selectivo por estructura
    // 1. Primero apagar todos
    meshesEncefalo.forEach(mesh=>{
        mesh.material.emissive.setRGB(0.03,0.02,0.02);
        mesh.material.emissiveIntensity=0.06;
        mesh.material.transparent = mesh.material.opacity < 1;
        mesh.material.opacity = (mesh.material.transmission>0) ? 0.60 : 1.0;
    });

    // 2. Encender los de la categoría seleccionada
    if(sel !== 'all' && encefaloMeshMap[sel]){
        encefaloMeshMap[sel].forEach(mesh=>{
            mesh.material.emissive.setRGB(g[0]*1.8, g[1]*1.8, g[2]*1.8);
            mesh.material.emissiveIntensity = Math.min(g[3]*1.6, 0.55);
        });
        // Hacer los demás más transparentes para destacar
        meshesEncefalo.forEach(mesh=>{
            const isTarget = encefaloMeshMap[sel]&&encefaloMeshMap[sel].includes(mesh);
            if(!isTarget){
                mesh.material.transparent=true;
                mesh.material.opacity=0.22;
                mesh.material.depthWrite=false;
            }
        });
    } else {
        // "all" — restaurar opacidad
        meshesEncefalo.forEach(mesh=>{
            mesh.material.emissive.setRGB(g[0],g[1],g[2]);
            mesh.material.emissiveIntensity=g[3]*0.6;
            mesh.material.transparent=(mesh.material.opacity<0.99);
        });
    }
}

// ===== PART INFO =====
const partInfo={
    all:{n:'Cerebro Humano',s:'Sistema Nervioso Central — Encéfalo',
        d:'El cerebro humano es el órgano más complejo conocido. Pesa ~1,400 g y contiene aproximadamente 86,000 millones de neuronas. El modelo de corte muestra 26 estructuras internas diferenciadas por color: tálamo, hipocampo, amígdala, ganglios basales, cuerpo calloso, cerebelo, tronco y más.',
        st:[{l:'Peso promedio',v:'~1,400 g'},{l:'Neuronas',v:'~86 mil mill.'},{l:'Estructuras (corte)',v:'26 identificadas'},{l:'Consumo O₂',v:'20% corporal'}]},
    frontal:{n:'Lóbulo Frontal',s:'Control Ejecutivo y Motor',
        d:'El lóbulo frontal es el más grande del cerebro humano. Contiene la corteza motora primaria, área premotora y corteza prefrontal. Responsable de planificación, toma de decisiones, personalidad y el lenguaje expresivo (área de Broca).',
        st:[{l:'Porcentaje cerebro',v:'~41%'},{l:'Área de Broca',v:'Hemisferio izq.'},{l:'Corteza motora',v:'Giro precentral'},{l:'Función clave',v:'Control ejecutivo'}]},
    parietal:{n:'Lóbulo Parietal',s:'Integración Sensorial y Espacial',
        d:'Procesa información sensorial táctil, propioceptiva y térmica en la corteza somatosensorial primaria. Integra información multisensorial para la percepción espacial y el cálculo matemático.',
        st:[{l:'Corteza somatosens.',v:'Giro postcentral'},{l:'Función',v:'Integración sensorial'},{l:'Lesión dominante',v:'Agnosia, apraxia'},{l:'Lesión no domin.',v:'Negligencia espacial'}]},
    temporal:{n:'Lóbulo Temporal',s:'Memoria, Audición y Lenguaje',
        d:'Contiene la corteza auditiva primaria (giros de Heschl) y el área de Wernicke. Clave para la formación de memoria declarativa a través de su conexión con el hipocampo.',
        st:[{l:'Corteza auditiva',v:'Giros de Heschl'},{l:'Área de Wernicke',v:'Hemisferio izq.'},{l:'Memoria',v:'Conexión hipocampo'},{l:'Gnosias',v:'Corteza temporal inf.'}]},
    occipital:{n:'Lóbulo Occipital',s:'Procesamiento Visual',
        d:'Alberga la corteza visual primaria (V1) en el surco calcarino. Las áreas V2-V5 procesan color, movimiento, profundidad y reconocimiento de formas.',
        st:[{l:'Corteza visual V1',v:'Surco calcarino'},{l:'Área 17 Brodmann',v:'Visual primaria'},{l:'V5 (MT)',v:'Movimiento visual'},{l:'Lesión bilateral',v:'Ceguera cortical'}]},
    insula:{n:'Ínsula (5° Lóbulo)',s:'Conciencia Interoceptiva',
        d:'Localizada en el surco lateral. Corteza interoceptiva primaria: procesa señales viscerales, dolor, temperatura, sabor y emociones somáticas.',
        st:[{l:'Localización',v:'Surco lateral (Silvio)'},{l:'Función principal',v:'Interocepción'},{l:'Gusto',v:'Corteza gustativa'},{l:'Adicciones',v:'Craving/recaída'}]},
    gangbasales:{n:'Ganglios Basales',s:'Control Motor y Aprendizaje Procedimental',
        d:'Incluye núcleo caudado, putamen, globo pálido, núcleo subtalámico y sustancia negra. Modulan el movimiento voluntario. Su disfunción causa Parkinson y Huntington.',
        st:[{l:'Núcleos',v:'Caudado, Putamen, GP'},{l:'Neurotransmisor',v:'Dopamina'},{l:'Parkinson',v:'Déficit dopamina SN'},{l:'Huntington',v:'Degeneración estriado'}]},
    tálamo:{n:'Tálamo',s:'Estación de Relevo Sensorial',
        d:'Principal estación de relevo sensorial hacia la corteza. Todo input sensorial (excepto el olfato) hace sinapsis en el tálamo. También regula consciencia y ciclo sueño-vigilia.',
        st:[{l:'Estructura',v:'Diencéfalo'},{l:'Núcleos',v:'~50 pares bilaterales'},{l:'Relay sensorial',v:'Todo excepto olfato'},{l:'Función',v:'Consciencia y atención'}]},
    hipocampo:{n:'Hipocampo',s:'Memoria Declarativa y Navegación Espacial',
        d:'Esencial para la consolidación de la memoria declarativa. Contiene "células de lugar" para mapas cognitivos espaciales. La lesión bilateral produce amnesia anterógrada severa.',
        st:[{l:'Sistema',v:'Límbico — temporal'},{l:'Memoria',v:'Declarativa/episódica'},{l:'Células de lugar',v:'Mapa espacial'},{l:'Lesión bilateral',v:'Amnesia anterógrada'}]},
    amígdala:{n:'Amígdala',s:'Emociones y Respuesta al Miedo',
        d:'Centro del miedo y la alarma emocional. Coordina la respuesta "lucha o huida" vía hipotálamo y SNA. Clave en PTSD, ansiedad y condicionamiento del miedo.',
        st:[{l:'Forma',v:'Almendra'},{l:'Emoción clave',v:'Miedo y alarma'},{l:'Respuesta',v:'Fight-or-flight'},{l:'Relevancia',v:'PTSD, ansiedad, fobias'}]},
    hipotálamo:{n:'Hipotálamo',s:'Regulación Neuroendocrina y Autónoma',
        d:'~4 g. Regula temperatura, ingesta, sueño, comportamiento sexual y estrés. Controla la hipófisis mediante factores liberadores e inhibidores.',
        st:[{l:'Peso',v:'~4 g'},{l:'Eje',v:'HPA, HPT, HPG'},{l:'Regula',v:'Temperatura, hambre, sed'},{l:'Reloj',v:'Núcleo supraquiasmático'}]},
    cerebelo:{n:'Cerebelo',s:'Coordinación Motora y Equilibrio',
        d:'Más del 50% de las neuronas cerebrales. Coordina movimiento, equilibrio y tono muscular. La lesión causa ataxia y dismetría.',
        st:[{l:'Neuronas',v:'>50% del total'},{l:'Peso',v:'~150 g'},{l:'Función',v:'Coordinación motora'},{l:'Lesión',v:'Ataxia, dismetría'}]},
    tronco:{n:'Tronco Encefálico',s:'Funciones Vitales del Organismo',
        d:'Mesencéfalo, pons y bulbo. Pares craneales III-XII, centros cardíaco y respiratorio, y SRAA (consciencia).',
        st:[{l:'Componentes',v:'Mesencéfalo, Pons, Bulbo'},{l:'Pares craneales',v:'III-XII'},{l:'Centros vitales',v:'Cardíaco, respiratorio'},{l:'SRAA',v:'Consciencia/vigilia'}]},
    cuerpocalloso:{n:'Cuerpo Calloso',s:'Comisura Interhemisférica Principal',
        d:'~250-300 millones de fibras mielinizadas que conectan ambos hemisferios. Su sección produce el síndrome del cerebro dividido.',
        st:[{l:'Fibras',v:'~250-300 millones'},{l:'Tipo',v:'Axones mielinizados'},{l:'Función',v:'Comunicación hemisférica'},{l:'Lesión',v:'Cerebro dividido'}]},
    arterias:{n:'Arterias Cerebrales',s:'Irrigación Arterial del Encéfalo',
        d:'Carótidas internas (ACA, ACM) y vertebrales→basilar (ACP), comunicadas en el Polígono de Willis. 20% del gasto cardíaco. Isquemia irreversible en 4-6 min.',
        st:[{l:'Circulación anterior',v:'ACI → ACA + ACM'},{l:'Circulación posterior',v:'Vertebral → ACP'},{l:'Anastomosis',v:'Polígono de Willis'},{l:'Tolerancia',v:'4-6 minutos'}]},
    venas:{n:'Venas Cerebrales',s:'Drenaje Venoso Encefálico',
        d:'Venas superficiales (corteza→senos durales) y profundas (vena de Galeno). Los senos durales drenan en la yugular interna.',
        st:[{l:'Drenaje superficial',v:'→ senos durales'},{l:'Drenaje profundo',v:'Vena de Galeno'},{l:'Destino',v:'Vena yugular interna'},{l:'Patología',v:'Trombosis sinus'}]},
    lcr:{n:'Líquido Cefalorraquídeo',s:'Protección y Homeostasis del SNC',
        d:'~500 mL/día producidos por plexos coroideos. Circula por el sistema ventricular. Reabsorbido por granulaciones aracnoideas. Volumen total ~150 mL.',
        st:[{l:'Volumen total',v:'~150 mL'},{l:'Producción/día',v:'~500 mL'},{l:'Producción',v:'Plexos coroideos'},{l:'Reabsorción',v:'Granulaciones aracnoideas'}]},
    cortezamotora:{n:'Corteza Motora Primaria',s:'Ejecución del Movimiento Voluntario',
        d:'Giro precentral (área 4 de Brodmann). Neuronas motoras superiores → tracto corticoespinal. Homúnculo motor de Penfield.',
        st:[{l:'Localización',v:'Giro precentral'},{l:'Área Brodmann',v:'Área 4'},{l:'Vía',v:'Tracto corticoespinal'},{l:'Mapa',v:'Homúnculo motor'}]},
    cortezasensorial:{n:'Corteza Somatosensorial',s:'Procesamiento de la Sensación Corporal',
        d:'Giro postcentral (áreas 3, 1 y 2). Recibe información táctil y propioceptiva del cuerpo contralateral vía tálamo VPL.',
        st:[{l:'Localización',v:'Giro postcentral'},{l:'Áreas Brodmann',v:'3, 1 y 2'},{l:'Relay',v:'Tálamo VPL'},{l:'Mapa',v:'Homúnculo sensorial'}]},
    broca:{n:'Áreas de Broca y Wernicke',s:'Lenguaje — Producción y Comprensión',
        d:'Broca (áreas 44-45, frontal inferior): producción. Wernicke (área 22, temporal): comprensión. Conectadas por el fascículo arqueado. Hemisferio izquierdo.',
        st:[{l:'Broca',v:'Áreas 44-45'},{l:'Wernicke',v:'Área 22'},{l:'Conexión',v:'Fascículo arqueado'},{l:'Hemisferio',v:'Izquierdo (95%)'}]},
};

// ===== PANEL BUTTONS =====
document.querySelectorAll('.hl-btn').forEach(btn=>{
    btn.onclick=()=>{
        document.querySelectorAll('.hl-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const p=btn.dataset.part, info=partInfo[p];
        if(info){
            $('ipN').textContent=info.n;
            $('ipS').textContent=info.s;
            $('ipD').textContent=info.d;
            $('ipSt').innerHTML=info.st.map(s=>`<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`).join('');
        }
        setHighlight(p);
    };
});
