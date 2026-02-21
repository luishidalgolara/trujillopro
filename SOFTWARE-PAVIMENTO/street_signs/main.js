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

setLoad(10,'Configurando escena 3D...');
const canvas=$('mainCanvas');
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a0a0f);
scene.fog=new THREE.FogExp2(0x0a0a0f, 0.016);

const camera=new THREE.PerspectiveCamera(50, innerWidth/(innerHeight-56), 0.01, 10000);
camera.position.set(0, 5, 10);

const renderer=new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setSize(innerWidth, innerHeight-56);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.20;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera, canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.08;
ctrl.rotateSpeed=0.6; ctrl.zoomSpeed=0.9;
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.5;

setLoad(20,'Generando iluminación...');
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
            vec3 c=mix(vec3(.03,.03,.05),mix(vec3(.05,.05,.08),vec3(.08,.08,.12),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.35,.28,.20)*pow(max(0.,dot(d,normalize(vec3(1.,.5,.3)))),12.)*.4;
            c+=vec3(.08,.12,.18)*pow(max(0.,dot(d,normalize(vec3(-.8,.3,-.5)))),8.)*.25;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

const hemi=new THREE.HemisphereLight(0xaabbcc,0x332211,0.6); scene.add(hemi);
const keyLight=new THREE.DirectionalLight(0xffeedd,3.2);
keyLight.castShadow=true; keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.025; scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0x88aaff,1.2); scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xffaa66,1.8); scene.add(rimLight);
const accentLight=new THREE.PointLight(0xff6b35,0.8,0); scene.add(accentLight);

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.22,0.5,0.88);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},metallic:{value:0.50},vign:{value:0.22}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float metallic;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.2126,.7152,.0722));
    c+=vec3(.12,.15,.20)*metallic*smoothstep(.15,.65,lum)*.25;
    c.b+=.018;c.r+=.012;
    float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.12);
    c=(c-.5)*1.06+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.35;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando señalización vial...');
let model=null;
const allMeshes=[];
const originalPositions=new Map();

// Mapeo de materiales a grupos de componentes
const materialGroups={
    stop:['StopSign_1N','StopSign_2N'],
    oneway:['OneWaySign'],
    direction:['DirectionSign_1N','DirectionSign_2N','DirectionSign_3N','DirectionSign_4N','DirectionSign_5N','DirectionSign_6N'],
    lamp:['LampOutdoors']
};

function getMeshGroup(mesh){
    const matName=mesh.material?.name||'';
    for(const [group,names] of Object.entries(materialGroups)){
        if(names.some(n=>matName.startsWith(n))) return group;
    }
    return 'all';
}

new GLTFLoader().load('scene_embedded.gltf',
    (gltf)=>{
        setLoad(80,'Optimizando materiales...');
        model=gltf.scene;
        scene.add(model);

        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const center=box.getCenter(new THREE.Vector3());
        const maxDim=Math.max(size.x,size.y,size.z);

        const scale=6/maxDim;
        model.scale.setScalar(scale);
        model.position.set(-center.x*scale,-center.y*scale,-center.z*scale);

        const box2=new THREE.Box3().setFromObject(model);
        const size2=box2.getSize(new THREE.Vector3());
        const m=Math.max(size2.x,size2.y,size2.z);

        camera.position.set(m*1.2, m*0.8, m*1.6);
        camera.near=m*0.001; camera.far=m*50;
        camera.updateProjectionMatrix();

        ctrl.target.set(0,0,0);
        ctrl.minDistance=m*0.3; ctrl.maxDistance=m*8;
        ctrl.update();

        keyLight.position.set(m*1.5,m*2,m*1.5);
        keyLight.shadow.camera.left=-m*2; keyLight.shadow.camera.right=m*2;
        keyLight.shadow.camera.top=m*2; keyLight.shadow.camera.bottom=-m*2;
        keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=m*10;
        keyLight.shadow.camera.updateProjectionMatrix();
        fillLight.position.set(-m*1.5,m,-m);
        rimLight.position.set(-m*0.5,-m*0.5,-m*1.5);
        accentLight.position.set(m,m*1.5,m);
        accentLight.distance=m*10;

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            allMeshes.push(child);
            originalPositions.set(child.uuid, child.position.clone());

            // Preservar texturas originales, ajustar solo envMap
            if(child.material){
                child.material.envMapIntensity=1.4;
                child.material.needsUpdate=true;
            }
        });

        // Plataforma base
        const platform=new THREE.Mesh(
            new THREE.CylinderGeometry(m*0.7,m*0.75,m*0.025,64),
            new THREE.MeshStandardMaterial({color:0x0f0f14,roughness:0.85,metalness:0.15,emissive:0x0a0a0d,emissiveIntensity:0.3})
        );
        platform.position.y=box2.min.y-m*0.02;
        platform.receiveShadow=true;
        scene.add(platform);

        const grid=new THREE.GridHelper(m*1.4,32,0x334455,0x1a2030);
        grid.position.y=box2.min.y-m*0.015;
        grid.material.opacity=0.3;
        grid.material.transparent=true;
        scene.add(grid);

        setLoad(100,'¡Señalización lista!');
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
    accentLight.intensity=0.8+Math.sin(t*0.001)*0.15;
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
    if(model){const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.2,mv*0.8,mv*1.6);}
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.18);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(1))};
$('bFr').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,0,mv*2);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,mv*2,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*2,0,0);ctrl.target.set(0,0,0)};
$('bIso').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.2,mv*0.8,mv*1.6);ctrl.target.set(0,0,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.6;
$('ppE').oninput=e=>renderer.toneMappingExposure=e.target.value/100;
$('ppM').oninput=e=>cgPass.uniforms.metallic.value=e.target.value/100;
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
        n:'Señalización Vial — Asset Pack',
        s:'Infraestructura Urbana — Elementos Viales 3D',
        d:'Pack de assets 3D de señalización vial y mobiliario urbano de alta calidad. Incluye señales de STOP, dirección única, señales informativas de dirección y lámparas exteriores. Todos los modelos incluyen mapas PBR completos: color base, roughness/metallic y normales.',
        st:[{l:'Modelos',v:'10 meshes'},{l:'Materiales',v:'10 PBR'},{l:'Texturas',v:'29 mapas HD'},{l:'Licencia',v:'CC-BY-4.0'}]
    },
    stop:{
        n:'Señal de STOP',
        s:'Señalización Regulatoria de Prioridad',
        d:'Señal octogonal de detención obligatoria (STOP). Fabricada en chapa de acero galvanizado con retrorrefractante de alta intensidad. El modelo incluye poste de soporte y presenta textura realista con desgaste superficial. Elemento crítico de regulación de tráfico.',
        st:[{l:'Forma',v:'Octogonal'},{l:'Color',v:'Rojo + blanco'},{l:'Material',v:'Acero galvanizado'},{l:'Mapas',v:'Color + MetalRough'}]
    },
    oneway:{
        n:'Señal Dirección Única',
        s:'Señal Regulatoria de Circulación',
        d:'Señal de dirección única que indica el sentido obligatorio de circulación. Panel rectangular de aluminio extruido con película retrorrefractante. Incluye soporte metálico tubular. Material PBR con mapa de normales para detalles superficiales.',
        st:[{l:'Forma',v:'Rectangular'},{l:'Color',v:'Negro + blanco'},{l:'Material',v:'Aluminio extruido'},{l:'Mapas',v:'Color + Normal + MR'}]
    },
    direction:{
        n:'Señales de Dirección',
        s:'Señalización Informativa — 6 Variantes',
        d:'Conjunto de 6 señales informativas de dirección con diferentes configuraciones de destinos y flechas. Paneles de aluminio con retrorrefractante azul/verde para señalización urbana e interurbana. Cada variante tiene textura única con texto y pictogramas.',
        st:[{l:'Variantes',v:'6 modelos'},{l:'Color',v:'Azul / Verde'},{l:'Material',v:'Aluminio + vinilo'},{l:'Mapas',v:'Color + Normal + MR'}]
    },
    lamp:{
        n:'Lámpara Exterior',
        s:'Mobiliario Urbano — Alumbrado Público',
        d:'Luminaria de alumbrado público para vía urbana. Estructura de acero con cabezal de iluminación LED. El modelo incluye mapa emisivo para simular la luz activa de la lámpara, además de mapas de color, metallic/roughness y normales para máximo realismo.',
        st:[{l:'Tipo',v:'Alumbrado LED'},{l:'Material',v:'Acero pintado'},{l:'Emisivo',v:'Sí (mapa HD)'},{l:'Mapas',v:'Color+Emissive+MR+N'}]
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
