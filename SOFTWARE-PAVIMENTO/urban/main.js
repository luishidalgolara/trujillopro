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
scene.fog=new THREE.FogExp2(0x0a0a0f, 0.012);

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
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.4;

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
            vec3 c=mix(vec3(.03,.04,.06),mix(vec3(.05,.07,.10),vec3(.07,.10,.16),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.20,.25,.35)*pow(max(0.,dot(d,normalize(vec3(.8,.6,.3)))),10.)*.5;
            c+=vec3(.10,.15,.22)*pow(max(0.,dot(d,normalize(vec3(-.5,.4,-.6)))),6.)*.3;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

// Iluminación para escena urbana exterior — luz de día suave
const hemi=new THREE.HemisphereLight(0xb0c8e8, 0x404830, 0.8);
scene.add(hemi);
const keyLight=new THREE.DirectionalLight(0xfff5e0, 2.8);
keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.bias=-0.0005;
keyLight.shadow.normalBias=0.025;
scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0x8ab0d8, 1.0);
scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xffeebb, 1.4);
scene.add(rimLight);
const accentLight=new THREE.PointLight(0x00d9ff, 0.5, 0);
scene.add(accentLight);

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.15,0.5,0.92);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},ambient:{value:0.35},vign:{value:0.20}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float ambient;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.2126,.7152,.0722));
    c+=vec3(.08,.12,.18)*ambient*smoothstep(.15,.65,lum)*.3;
    c.b+=.015;c.g+=.008;
    float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.10);
    c=(c-.5)*1.04+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.35;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando escena urbana...');
let model=null;
const allMeshes=[];
const originalPositions=new Map();

// Mapeo de nombres de material a grupos de componentes
const materialGroups={
    pavement:['Blacktop','Foregrou','FrontCol','0010_Sno'],
    concrete:['Concrete','Polished','Terrazzo'],
    markings:['0020_Red'],
    ground:['Groundco'],
    pedestrians:['Niraj_01','Niraj_02','Niraj_03','Niraj_04','Niraj_Ha','Niraj_Pa','Niraj_Sh','Niraj_Sk'],
    details:[]
};

// Función para obtener el grupo de un mesh según su material
function getMeshGroup(mesh){
    const matName=mesh.material?.name||'';
    for(const [group,names] of Object.entries(materialGroups)){
        if(names.some(n=>matName.startsWith(n))) return group;
    }
    return 'details';
}

new GLTFLoader().load('scene_embedded.gltf',
    (gltf)=>{
        setLoad(80,'Optimizando materiales...');
        model=gltf.scene;
        scene.add(model);

        // Bounding box para escalar y centrar
        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const center=box.getCenter(new THREE.Vector3());
        const maxDim=Math.max(size.x,size.y,size.z);

        // Escalar a tamaño estándar de 8 unidades
        const scale=8/maxDim;
        model.scale.setScalar(scale);

        // Centrar el modelo en el origen
        model.position.set(
            -center.x*scale,
            -center.y*scale,
            -center.z*scale
        );

        // Bounding box final
        const box2=new THREE.Box3().setFromObject(model);
        const size2=box2.getSize(new THREE.Vector3());
        const m=Math.max(size2.x,size2.y,size2.z);

        // Cámara aérea isométrica — ideal para escena urbana
        camera.position.set(m*1.4, m*1.0, m*1.6);
        camera.near=m*0.001;
        camera.far=m*50;
        camera.updateProjectionMatrix();

        ctrl.target.set(0,0,0);
        ctrl.minDistance=m*0.3;
        ctrl.maxDistance=m*8;
        ctrl.update();

        // Luces proporcionales — luz solar diurna
        keyLight.position.set(m*2, m*3, m*1.5);
        keyLight.shadow.camera.left=-m*3; keyLight.shadow.camera.right=m*3;
        keyLight.shadow.camera.top=m*3; keyLight.shadow.camera.bottom=-m*3;
        keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=m*12;
        keyLight.shadow.camera.updateProjectionMatrix();
        fillLight.position.set(-m*1.5, m*1.5, -m);
        rimLight.position.set(-m*0.5, -m*0.3, -m*1.5);
        accentLight.position.set(0, m*2, 0);
        accentLight.distance=m*12;

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            allMeshes.push(child);
            originalPositions.set(child.uuid, child.position.clone());

            // Preservar materiales originales con texturas — solo ajustar parámetros PBR
            if(child.material){
                const mat=child.material;
                // Mejorar parámetros PBR según el tipo de material
                const mn=mat.name||'';
                if(mn.startsWith('Blacktop')){
                    mat.roughness=0.85; mat.metalness=0.05;
                } else if(mn.startsWith('Concrete')||mn.startsWith('Polished')||mn.startsWith('Terrazzo')){
                    mat.roughness=0.75; mat.metalness=0.02;
                } else if(mn.startsWith('0020_Red')){
                    mat.roughness=0.60; mat.metalness=0.02;
                    mat.emissive=new THREE.Color(0.15,0,0); mat.emissiveIntensity=0.3;
                } else if(mn.startsWith('Groundco')){
                    mat.roughness=0.95; mat.metalness=0.00;
                } else if(mn.startsWith('Niraj')){
                    mat.roughness=0.65; mat.metalness=0.05;
                }
                mat.envMapIntensity=0.8;
                mat.needsUpdate=true;
            }
        });

        // Plataforma base
        const platform=new THREE.Mesh(
            new THREE.CylinderGeometry(m*0.9,m*0.95,m*0.02,64),
            new THREE.MeshStandardMaterial({color:0x0f0f14,roughness:0.90,metalness:0.10,emissive:0x080810,emissiveIntensity:0.2})
        );
        platform.position.y=box2.min.y-m*0.015;
        platform.receiveShadow=true;
        scene.add(platform);

        const grid=new THREE.GridHelper(m*1.8,40,0x223344,0x111820);
        grid.position.y=box2.min.y-m*0.010;
        grid.material.opacity=0.25;
        grid.material.transparent=true;
        scene.add(grid);

        setLoad(100,'¡Escena urbana lista!');
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
    accentLight.intensity=0.5+Math.sin(t*0.0008)*0.12;
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
    if(model){const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.4,mv*1.0,mv*1.6);}
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.18);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(1))};
$('bFr').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,0,mv*2);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,mv*2.5,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*2,0,0);ctrl.target.set(0,0,0)};
$('bIso').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.4,mv*1.0,mv*1.6);ctrl.target.set(0,0,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.5;
$('ppE').oninput=e=>renderer.toneMappingExposure=e.target.value/100;
$('ppM').oninput=e=>cgPass.uniforms.ambient.value=e.target.value/100;
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
        mesh.position.copy(o).add(d.multiplyScalar(Math.max(o.length(),0.01)*explodeFactor*2.5));
    });
}

const partInfo={
    all:{
        n:'Acera y Paso de Peatones',
        s:'Escena Urbana 3D — Entorno Arquitectónico',
        d:'Modelo 3D de alta fidelidad de una escena urbana contemporánea. Incluye aceras, paso de peatones, pavimento asfaltado, vegetación y peatones. Materiales PBR con texturas reales de alta resolución para una representación realista del entorno.',
        st:[{l:'Meshes',v:'151 objetos'},{l:'Materiales',v:'17 PBR'},{l:'Texturas',v:'5 HD reales'},{l:'Licencia',v:'CC-BY-4.0'}]
    },
    pavement:{
        n:'Pavimento y Asfalto',
        s:'Superficie Vial Principal',
        d:'Superficie asfaltada de la calzada con textura Blacktop de alta resolución. El material PBR captura la rugosidad característica del asfalto urbano, sus variaciones tonales y el acabado mate propio del bitumen envejecido.',
        st:[{l:'Material',v:'Blacktop PBR'},{l:'Acabado',v:'Mate rugoso'},{l:'Rugosidad',v:'0.85'},{l:'Textura',v:'Mapa HD real'}]
    },
    concrete:{
        n:'Concreto y Aceras',
        s:'Superficies Peatonales y Estructurales',
        d:'Conjunto de superficies de concreto, terrazo y polished que conforman las aceras y elementos peatonales. Cada material presenta su propia textura fotorrealista capturando el aspecto real del hormigón urbano.',
        st:[{l:'Materiales',v:'Concrete / Terrazzo'},{l:'Polished',v:'Pulido premium'},{l:'Rugosidad',v:'0.70 – 0.80'},{l:'Uso',v:'Aceras + rampas'}]
    },
    markings:{
        n:'Señalización Vial',
        s:'Paso de Cebra y Marcas Horizontales',
        d:'Elementos de señalización horizontal pintados sobre el asfalto. El paso de peatones (cruce de cebra) está representado con color rojo brillante y ligera emisión para destacar visualmente la zona de cruce regulada.',
        st:[{l:'Color',v:'Rojo señalización'},{l:'Tipo',v:'Paso de cebra'},{l:'Emisión',v:'0.30 (glow)'},{l:'Normativa',v:'Tráfico urbano'}]
    },
    ground:{
        n:'Suelo y Vegetación',
        s:'Superficie Natural del Entorno',
        d:'Área de suelo natural con textura Groundcover que representa las zonas verdes o de tierra compactada adyacentes a la infraestructura urbana. Acabado de alta rugosidad sin metalicidad para máximo realismo orgánico.',
        st:[{l:'Material',v:'Groundcover HD'},{l:'Rugosidad',v:'0.95'},{l:'Metalicidad',v:'0.00'},{l:'Uso',v:'Áreas verdes'}]
    },
    pedestrians:{
        n:'Peatones y Figuras',
        s:'Elementos Humanos de la Escena',
        d:'Figuras humanas que dan escala y vida a la escena urbana. Modeladas con múltiples materiales PBR diferenciados para piel, ropa, cabello, calzado y accesorios. Cada figura presenta una paleta de colores realista y coherente.',
        st:[{l:'Materiales',v:'8 por figura'},{l:'Piel',v:'Niraj_Sk PBR'},{l:'Ropa',v:'Multi-capa'},{l:'Escala',v:'1:1 real'}]
    },
    details:{
        n:'Elementos de Detalle',
        s:'Objetos y Accesorios Urbanos',
        d:'Conjunto de elementos menores que complementan la escena urbana. Incluye objetos de mobiliario urbano, accesorios y detalles arquitectónicos que enriquecen la composición y aportan realismo al conjunto.',
        st:[{l:'Cantidad',v:'Múltiples'},{l:'Tipo',v:'Mobiliario urbano'},{l:'Detalle',v:'Alto nivel'},{l:'Integración',v:'PBR coherente'}]
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
