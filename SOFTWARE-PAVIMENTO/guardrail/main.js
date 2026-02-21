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

setLoad(10,'Configurando escena metálica...');
const canvas=$('mainCanvas');
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a0a0f);
scene.fog=new THREE.FogExp2(0x0a0a0f, 0.015);

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

setLoad(20,'Generando iluminación metálica...');
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
            // Entorno frío y limpio para acero galvanizado
            vec3 c=mix(vec3(.04,.05,.07),mix(vec3(.07,.09,.13),vec3(.12,.16,.22),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.30,.35,.45)*pow(max(0.,dot(d,normalize(vec3(1.,.5,.3)))),10.)*.5;
            c+=vec3(.15,.20,.30)*pow(max(0.,dot(d,normalize(vec3(-.8,.3,-.5)))),8.)*.35;
            // Highlight cenital brillante para reflejos metálicos
            c+=vec3(.40,.45,.55)*pow(max(0.,dot(d,normalize(vec3(0.,1.,0.)))),20.)*.6;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.08).texture;
pmrem.dispose();

// Iluminación de estudio metálico — alta intensidad para reflejos en galvanizado
const hemi=new THREE.HemisphereLight(0xb0c8e0,0x303848,0.7); scene.add(hemi);
const keyLight=new THREE.DirectionalLight(0xffffff,4.0);
keyLight.castShadow=true; keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.025; scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0x99bbdd,1.5); scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xddeeff,2.5); scene.add(rimLight);
// Luz inferior para reflejos en la parte baja del rail
const bottomLight=new THREE.DirectionalLight(0x8899aa,0.8); scene.add(bottomLight);
const accentLight=new THREE.PointLight(0xc8d8e8,0.8,0); scene.add(accentLight);

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
// Bloom alto para resaltar reflejos metálicos
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.25,0.4,0.85);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},metallic:{value:0.55},vign:{value:0.22}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float metallic;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.2126,.7152,.0722));
    // Realce metálico — azul-gris frío para galvanizado
    c+=vec3(.10,.14,.20)*metallic*smoothstep(.20,.75,lum)*.35;
    c.b+=.020;c.g+=.008;
    float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.08);
    c=(c-.5)*1.08+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.35;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando guardarraíl...');
let model=null;
const allMeshes=[];
const originalPositions=new Map();

// 1 solo material — diferenciamos por posición/geometría de cada mesh
// Los 17 meshes son: vigas W-beam, postes de hinca, separadores/bloques, tornillería
// Estrategia: agrupar por índice (distribución típica de guardarraíl)
// meshes 0-4: viga longitudinal W-beam (los más largos/planos)
// meshes 5-10: postes verticales de hinca
// meshes 11-14: bloques separadores / spacers
// meshes 15-16: tornillería y elementos pequeños de unión
// Como todos comparten el mismo material, el highlight lo hacemos por grupo de mesh

const meshGroups=[]; // se llenará al cargar

function categorizeMesh(mesh, idx, totalMeshes, bbox){
    // Usar el bounding box del mesh para inferir tipo
    const b=new THREE.Box3().setFromObject(mesh);
    const s=b.getSize(new THREE.Vector3());
    const maxDim=Math.max(s.x,s.y,s.z);
    const minDim=Math.min(s.x,s.y,s.z);
    const ratio=maxDim/Math.max(minDim,0.001);

    // Piezas muy elongadas → viga rail o poste
    // Piezas cuadradas/compactas → separador o tornillo
    if(ratio > 8){
        // Elongado — diferenciar horizontal (rail) vs vertical (poste) por orientación
        if(s.y > s.x && s.y > s.z) return 'posts';    // más alto → poste
        return 'rail';                                   // más largo → viga
    }
    if(ratio > 3) return 'spacers';
    return 'bolts';
}

new GLTFLoader().load('scene_embedded.gltf',
    (gltf)=>{
        setLoad(80,'Optimizando materiales PBR...');
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

        // Vista lateral ligeramente elevada — ideal para ver el guardarraíl en perspectiva
        camera.position.set(m*1.0, m*0.6, m*1.8);
        camera.near=m*0.001; camera.far=m*50;
        camera.updateProjectionMatrix();

        ctrl.target.set(0,0,0);
        ctrl.minDistance=m*0.2; ctrl.maxDistance=m*8;
        ctrl.update();

        keyLight.position.set(m*1.5,m*2.5,m*1.5);
        keyLight.shadow.camera.left=-m*2; keyLight.shadow.camera.right=m*2;
        keyLight.shadow.camera.top=m*2; keyLight.shadow.camera.bottom=-m*2;
        keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=m*10;
        keyLight.shadow.camera.updateProjectionMatrix();
        fillLight.position.set(-m*1.5,m*1.2,-m);
        rimLight.position.set(-m*0.5,m*0.8,-m*1.5);
        bottomLight.position.set(0,-m*1.5,0);
        accentLight.position.set(m*0.5,m*1.5,m*0.5);
        accentLight.distance=m*10;

        let idx=0;
        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            allMeshes.push(child);
            originalPositions.set(child.uuid,child.position.clone());
            // Guardar categoría en userData
            child.userData.group=categorizeMesh(child, idx, 17, box2);
            idx++;

            if(child.material){
                // Mejorar envMap para maximizar reflejos del acero galvanizado
                child.material.envMapIntensity=2.0;
                child.material.needsUpdate=true;
            }
        });

        // Plataforma base
        const platform=new THREE.Mesh(
            new THREE.CylinderGeometry(m*0.7,m*0.75,m*0.025,64),
            new THREE.MeshStandardMaterial({color:0x0d0d12,roughness:0.88,metalness:0.15,emissive:0x080810,emissiveIntensity:0.25})
        );
        platform.position.y=box2.min.y-m*0.018;
        platform.receiveShadow=true;
        scene.add(platform);

        const grid=new THREE.GridHelper(m*1.4,32,0x223344,0x111822);
        grid.position.y=box2.min.y-m*0.012;
        grid.material.opacity=0.22;
        grid.material.transparent=true;
        scene.add(grid);

        setLoad(100,'¡Guard Rail listo!');
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
    accentLight.intensity=0.8+Math.sin(t*0.0012)*0.18;
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
    if(model){const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.0,mv*0.6,mv*1.8);}
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.18);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(1))};
$('bFr').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,0,mv*2.2);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,mv*2.5,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*2.2,0,0);ctrl.target.set(0,0,0)};
$('bIso').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.0,mv*0.6,mv*1.8);ctrl.target.set(0,0,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.7;
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
        n:'Guard Rail',
        s:'Barrera de Contención Metálica — Seguridad Vial',
        d:'Modelo 3D técnico de alta fidelidad de un guardarraíl vial estándar con mapas PBR completos (color base, metallicRoughness, normales). El guardarraíl es un sistema de contención diseñado para retener y redirigir vehículos, minimizando daños en accidentes. Fabricado en acero galvanizado de alta resistencia con perfil en W (W-beam).',
        st:[{l:'Meshes',v:'17 piezas'},{l:'Material',v:'1 PBR completo'},{l:'Mapas',v:'Color + MR + N'},{l:'Metal',v:'Acero galv.'}]
    },
    rail:{
        n:'Viga de Contención W-Beam',
        s:'Perfil Metálico Longitudinal Principal',
        d:'Viga longitudinal de perfil en W (W-beam o "onda doble") que es el elemento de contención principal del guardarraíl. Fabricada en chapa de acero de 3mm galvanizada en caliente. Su perfil ondulado proporciona la rigidez y capacidad de deformación controlada necesaria para absorber impactos de vehículos.',
        st:[{l:'Perfil',v:'W-beam (onda doble)'},{l:'Material',v:'Acero galv. S235'},{l:'Espesor',v:'3mm chapa'},{l:'Norma',v:'EN 1317 / AASHTO'}]
    },
    posts:{
        n:'Postes de Anclaje',
        s:'Soportes Verticales de Hinca',
        d:'Postes verticales en perfil C o I hincados en el terreno que soportan y anclan la viga W-beam. Su flexibilidad controlada permite la deformación progresiva durante el impacto, absorbiendo energía cinética. Separados típicamente entre 1.0 y 1.5m según el nivel de contención requerido.',
        st:[{l:'Perfil',v:'C-140 o IPE'},{l:'Longitud',v:'1.5 – 2.0m'},{l:'Separación',v:'1.0 – 1.5m'},{l:'Hinca',v:'Directa o con dado'}]
    },
    spacers:{
        n:'Separadores y Bloques',
        s:'Elementos de Distanciamiento',
        d:'Bloques separadores de madera o polietileno de alta densidad situados entre el poste y la viga W-beam. Crean la distancia de trabajo necesaria para que el sistema funcione correctamente ante impactos, permitiendo la deformación adecuada sin contacto directo con el vehículo.',
        st:[{l:'Material',v:'Madera / PEAD'},{l:'Función',v:'Distanciamiento'},{l:'Altura',v:'200 – 300mm'},{l:'Tipo',v:'Bloque rectangular'}]
    },
    metal:{
        n:'Acero Galvanizado',
        s:'Material Estructural — PBR Completo',
        d:'El mapa PBR de metallicRoughness captura la alta metalicidad (>0.9) y baja rugosidad del acero galvanizado en caliente. El galvanizado (recubrimiento de zinc) proporciona protección anticorrosiva de larga duración. El mapa de normales detalla las microgeometrías de la chapa, soldaduras y marcas de proceso de fabricación.',
        st:[{l:'Metalicidad',v:'Alta (>0.90)'},{l:'Rugosidad',v:'Baja-media'},{l:'Recubrim.',v:'Zinc galvanizado'},{l:'Durabilidad',v:'+50 años'}]
    },
    bolts:{
        n:'Tornillería y Uniones',
        s:'Elementos de Fijación y Conexión',
        d:'Conjunto de tornillos, tuercas, arandelas y elementos de conexión que unen la viga W-beam con los separadores y postes. Fabricados en acero de alta resistencia con tratamiento superficial anticorrosivo. Son los puntos de unión críticos que garantizan la integridad estructural del sistema completo.',
        st:[{l:'Tipo',v:'M16 / M20 hex.'},{l:'Calidad',v:'8.8 / 10.9'},{l:'Tratamiento',v:'Galvanizado'},{l:'Función',v:'Unión estructural'}]
    }
};

function setHighlight(sel){
    allMeshes.forEach(mesh=>{
        const mat=mesh.material; if(!mat) return;
        if(sel==='all'||sel==='metal'){
            // metal = ver todo con énfasis en material → mostrar completo
            mat.transparent=false; mat.opacity=1; mat.depthWrite=true;
        } else {
            const grp=mesh.userData.group||'rail';
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
