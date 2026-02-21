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

setLoad(10,'Configurando escena lowpoly...');
const canvas=$('mainCanvas');
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a0a0f);
scene.fog=new THREE.FogExp2(0x0a0a0f, 0.014);

const camera=new THREE.PerspectiveCamera(50, innerWidth/(innerHeight-56), 0.01, 10000);
camera.position.set(0, 5, 10);

const renderer=new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setSize(innerWidth, innerHeight-56);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.30;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera, canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.08;
ctrl.rotateSpeed=0.6; ctrl.zoomSpeed=0.9;
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.5;

setLoad(20,'Generando iluminación estilizada...');
const pmrem=new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
const envSc=new THREE.Scene();
envSc.add(new THREE.Mesh(
    new THREE.SphereGeometry(10,32,32),
    new THREE.ShaderMaterial({
        side:THREE.BackSide,
        vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`varying vec3 vP;void main(){
            vec3 d=normalize(vP);float y=d.y*.5+.5;
            vec3 c=mix(vec3(.03,.04,.03),mix(vec3(.04,.06,.04),vec3(.06,.09,.05),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.25,.35,.10)*pow(max(0.,dot(d,normalize(vec3(.8,.6,.3)))),10.)*.45;
            c+=vec3(.05,.10,.15)*pow(max(0.,dot(d,normalize(vec3(-.6,.4,-.5)))),7.)*.25;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

// Iluminación cálida para estilo lowpoly — contraste fuerte para resaltar geometría
const hemi=new THREE.HemisphereLight(0xcceeaa,0x223322,0.8); scene.add(hemi);
const keyLight=new THREE.DirectionalLight(0xffffff,3.5);
keyLight.castShadow=true; keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.025; scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0x88ccaa,1.2); scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xddff88,1.8); scene.add(rimLight);
const accentLight=new THREE.PointLight(0xa8ff00,0.7,0); scene.add(accentLight);

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.20,0.5,0.88);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},sat:{value:0.55},vign:{value:0.22}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sat;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float g=dot(c,vec3(.2126,.7152,.0722));
    // Saturación controlada para resaltar los colores sólidos del lowpoly
    c=mix(vec3(g),c,1.0+sat*0.6);
    c=(c-.5)*1.06+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.35;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando intersección lowpoly...');
let model=null;
const allMeshes=[];
const originalPositions=new Map();

// Mapeo por color del material
// Material.005 / .006 → gris 0.25 → aceras/bordillos
// Material.007 / .008 → verde-amarillo → vegetación
// Material.001 → sin color definido → probablemente base/suelo
// Material.002 → negro puro → calzada asfalto
// Material.004 / .003 → casi negro 0.078 → detalles oscuros/mobiliario

function getMeshGroup(mesh){
    const name = mesh.material?.name || '';
    if(name === 'Material.002') return 'road';             // negro puro = asfalto
    if(name === 'Material.005' || name === 'Material.006') return 'markings'; // gris = aceras
    if(name === 'Material.007' || name === 'Material.008') return 'vegetation'; // verde = vegetación
    if(name === 'Material.001') return 'buildings';        // base/edificios
    if(name === 'Material.003' || name === 'Material.004') return 'details';   // casi negro = detalles
    return 'buildings';
}

new GLTFLoader().load('scene.gltf',
    (gltf)=>{
        setLoad(80,'Optimizando geometría lowpoly...');
        model=gltf.scene;
        scene.add(model);

        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const center=box.getCenter(new THREE.Vector3());
        const maxDim=Math.max(size.x,size.y,size.z);

        // Escalar a 7 unidades
        const scale=7/maxDim;
        model.scale.setScalar(scale);
        model.position.set(-center.x*scale,-center.y*scale,-center.z*scale);

        const box2=new THREE.Box3().setFromObject(model);
        const size2=box2.getSize(new THREE.Vector3());
        const m=Math.max(size2.x,size2.y,size2.z);

        // Vista isométrica aérea — ideal para escena urbana lowpoly
        camera.position.set(m*1.3, m*1.1, m*1.4);
        camera.near=m*0.001; camera.far=m*50;
        camera.updateProjectionMatrix();

        ctrl.target.set(0,0,0);
        ctrl.minDistance=m*0.25; ctrl.maxDistance=m*8;
        ctrl.update();

        keyLight.position.set(m*1.8, m*2.5, m*1.5);
        keyLight.shadow.camera.left=-m*2.5; keyLight.shadow.camera.right=m*2.5;
        keyLight.shadow.camera.top=m*2.5; keyLight.shadow.camera.bottom=-m*2.5;
        keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=m*12;
        keyLight.shadow.camera.updateProjectionMatrix();
        fillLight.position.set(-m*1.5, m*1.2, -m);
        rimLight.position.set(-m*0.5, m*0.5, -m*1.5);
        accentLight.position.set(0, m*2.2, 0);
        accentLight.distance=m*12;

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            allMeshes.push(child);
            originalPositions.set(child.uuid, child.position.clone());

            // Para lowpoly — aumentar roughness para un look mate y limpio
            if(child.material){
                child.material.roughness=0.85;
                child.material.metalness=0.0;
                child.material.envMapIntensity=0.6;
                child.material.needsUpdate=true;
            }
        });

        // Grid sutil
        const grid=new THREE.GridHelper(m*1.6,36,0x334422,0x111a0a);
        grid.position.y=box2.min.y-m*0.010;
        grid.material.opacity=0.20;
        grid.material.transparent=true;
        scene.add(grid);

        setLoad(100,'¡Intersección lista!');
        setTimeout(()=>ls.classList.add('hidden'),500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1048576).toFixed(1)+'MB')},
    e=>{console.error(e); setLoad(0,'Error: '+e.message);}
);

let lt=performance.now(),fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS';fc=0;lt=t;}
    ctrl.update();
    accentLight.intensity=0.7+Math.sin(t*0.001)*0.15;
    composer.render();
})(0);

addEventListener('resize',()=>{
    const w=innerWidth,h=innerHeight-56;
    camera.aspect=w/h; camera.updateProjectionMatrix();
    renderer.setSize(w,h); composer.setSize(w,h); bloom.setSize(w,h);
});

let ar=true;
$('bRot').onclick=e=>{ar=!ar;ctrl.autoRotate=ar;e.currentTarget.classList.toggle('active',ar)};
$('bRst').onclick=()=>{
    ctrl.target.set(0,0,0); explodeFactor=0; $('expRange').value=0; updateExplode();
    if(model){const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.3,mv*1.1,mv*1.4);}
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.18);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(1))};
$('bFr').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,0,mv*2.2);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,mv*2.8,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*2.2,0,0);ctrl.target.set(0,0,0)};
$('bIso').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.3,mv*1.1,mv*1.4);ctrl.target.set(0,0,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.6;
$('ppE').oninput=e=>renderer.toneMappingExposure=e.target.value/100;
$('ppM').oninput=e=>cgPass.uniforms.sat.value=e.target.value/100;
$('ppV').oninput=e=>cgPass.uniforms.vign.value=e.target.value/100;

let explodeActive=false, explodeFactor=0;
$('bExp').onclick=e=>{
    explodeActive=!explodeActive;
    $('expSlider').classList.toggle('vis',explodeActive);
    e.currentTarget.classList.toggle('active',explodeActive);
    if(!explodeActive){explodeFactor=0;$('expRange').value=0;updateExplode()}
};
$('expRange').oninput=e=>{explodeFactor=e.target.value/100;updateExplode()};

function updateExplode(){
    if(!model) return;
    allMeshes.forEach(mesh=>{
        const o=originalPositions.get(mesh.uuid); if(!o) return;
        const d=o.clone().normalize();
        mesh.position.copy(o).add(d.multiplyScalar(Math.max(o.length(),0.01)*explodeFactor*3));
    });
}

const partInfo={
    all:{
        n:'Lowpoly Intersection',
        s:'Escena Urbana Estilizada — Diseño Lowpoly',
        d:'Modelo 3D de intersección urbana en estilo lowpoly. Composición geométrica estilizada con calzada, vegetación, edificios y mobiliario urbano. El estilo lowpoly usa geometría poligonal simplificada y colores sólidos para una estética limpia. 73 meshes con solo 8 materiales de color.',
        st:[{l:'Meshes',v:'73 objetos'},{l:'Materiales',v:'8 colores'},{l:'Texturas',v:'Sin texturas'},{l:'Estilo',v:'Lowpoly puro'}]
    },
    road:{
        n:'Calzada y Asfalto',
        s:'Red Vial — Superficie de Rodadura',
        d:'Superficie asfaltada de la intersección y calzadas conectadas. Representada con material negro puro que captura el aspecto característico del asfalto en el estilo lowpoly. La intersección es el punto de encuentro de las vías y elemento central de la composición.',
        st:[{l:'Color',v:'Negro puro'},{l:'Material',v:'Material.002'},{l:'Estilo',v:'Lowpoly flat'},{l:'Tipo',v:'Intersección 4 vías'}]
    },
    markings:{
        n:'Aceras y Bordillos',
        s:'Infraestructura Peatonal',
        d:'Aceras, andenes y bordillos perimetrales que delimitan las zonas peatonales de la intersección. Color gris claro (0.25) que contrasta con el asfalto negro y define visualmente el espacio peatonal en la estética lowpoly.',
        st:[{l:'Color',v:'Gris claro'},{l:'Materiales',v:'Mat.005 + .006'},{l:'Función',v:'Zona peatonal'},{l:'Contraste',v:'Alto vs asfalto'}]
    },
    vegetation:{
        n:'Vegetación y Zonas Verdes',
        s:'Elementos Naturales Estilizados',
        d:'Árboles, arbustos y zonas ajardinadas representadas con el color verde-amarillo característico del estilo lowpoly. La vegetación aporta vida y contraste cromático a la escena urbana, siendo uno de los elementos más reconocibles de este estilo de diseño 3D.',
        st:[{l:'Color',v:'Verde-amarillo'},{l:'Materiales',v:'Mat.007 + .008'},{l:'RGB',v:'[0.80, 1.0, 0.0]'},{l:'Tipo',v:'Árboles + arbustos'}]
    },
    buildings:{
        n:'Edificios y Estructuras',
        s:'Volúmenes Construidos',
        d:'Edificios y construcciones que bordean la intersección. Volumetría simple y geométrica propia del estilo lowpoly. Representan el tejido urbano circundante a la intersección, aportando escala y contexto a la composición.',
        st:[{l:'Geometría',v:'Cubos / prismas'},{l:'Material',v:'Material.001'},{l:'Detalle',v:'Lowpoly simplif.'},{l:'Función',v:'Contexto urbano'}]
    },
    details:{
        n:'Detalles y Mobiliario',
        s:'Elementos Complementarios',
        d:'Conjunto de pequeños elementos de detalle y mobiliario urbano que complementan la escena. Señales, postes, farolas y otros elementos representados con material casi negro (0.078). Aportan escala humana y detalle a la composición lowpoly.',
        st:[{l:'Color',v:'Casi negro'},{l:'Materiales',v:'Mat.003 + .004'},{l:'RGB',v:'[0.078, 0.078, 0.078]'},{l:'Tipo',v:'Mobiliario urbano'}]
    }
};

function setHighlight(sel){
    allMeshes.forEach(mesh=>{
        const mat=mesh.material; if(!mat) return;
        if(sel==='all'){
            mat.transparent=false; mat.opacity=1; mat.depthWrite=true;
        } else {
            const grp=getMeshGroup(mesh);
            const isTarget=(grp===sel);
            mat.transparent=!isTarget; mat.opacity=isTarget?1:0.06; mat.depthWrite=isTarget;
        }
        mat.needsUpdate=true;
    });
}

document.querySelectorAll('.hl-btn').forEach(btn=>{
    btn.onclick=()=>{
        document.querySelectorAll('.hl-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const p=btn.dataset.part, info=partInfo[p];
        if(info){
            $('ipN').textContent=info.n; $('ipS').textContent=info.s; $('ipD').textContent=info.d;
            $('ipSt').innerHTML=info.st.map(s=>`<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`).join('');
        }
        setHighlight(p);
    };
});
