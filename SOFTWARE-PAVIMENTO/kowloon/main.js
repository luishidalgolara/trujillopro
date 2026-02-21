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
renderer.toneMappingExposure=1.20;
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
            vec3 c=mix(vec3(.03,.04,.07),mix(vec3(.04,.07,.12),vec3(.06,.10,.18),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.20,.28,.40)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.3)))),10.)*.5;
            c+=vec3(.05,.12,.20)*pow(max(0.,dot(d,normalize(vec3(-.6,.4,-.5)))),7.)*.3;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

// Iluminación para infraestructura de hormigón — tono fría urbana
const hemi=new THREE.HemisphereLight(0x99bbdd,0x223322,0.65); scene.add(hemi);
const keyLight=new THREE.DirectionalLight(0xeef5ff,3.0);
keyLight.castShadow=true; keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.025; scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0x7799cc,1.1); scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xaaccff,1.6); scene.add(rimLight);
const accentLight=new THREE.PointLight(0x00d9ff,0.7,0); scene.add(accentLight);

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.18,0.5,0.90);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},metallic:{value:0.45},vign:{value:0.22}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float metallic;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.2126,.7152,.0722));
    c+=vec3(.08,.12,.20)*metallic*smoothstep(.15,.65,lum)*.28;
    c.b+=.022;c.g+=.008;
    float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.10);
    c=(c-.5)*1.05+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.35;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando flyover de Kowloon...');
let model=null;
const allMeshes=[];
const originalPositions=new Map();

// Mapeo por índice de material (0-20)
// El modelo es fotogramétrico — agrupamos por número de material
// 001-004: texturas de pavimento/tablero (deck + surface)
// 005,006,010,012-016,020: gris sólido → vigas/pilas/barreras/estructura
// 007,011,017: pequeñas texturas → detalles/barreras
// 008,009: texturas medianas → vigas
// 018,019: texturas → pilas/columnas
// 021: textura grande (17MB) → entorno/suelo

function getMeshGroup(mesh){
    const name = mesh.material?.name || '';
    // Extraer número del material
    const match = name.match(/(\d+)$/);
    if(!match) return 'surface';
    const num = parseInt(match[1]);

    if(num === 1) return 'surface';           // textura grande entorno
    if(num === 21) return 'surface';          // textura 17MB entorno/suelo
    if(num === 2 || num === 3 || num === 4) return 'deck';   // tablero pavimento
    if(num === 8 || num === 9) return 'beams';               // vigas (texturas medianas)
    if(num === 18 || num === 19) return 'piers';             // pilas
    if(num === 5 || num === 6 || num === 10 ||
       num === 12 || num === 13 || num === 14 ||
       num === 15 || num === 16 || num === 20) return 'beams'; // superestructura gris
    if(num === 7 || num === 11 || num === 17) return 'barriers'; // barreras/detalles
    return 'surface';
}

new GLTFLoader().load('scene_embedded.gltf',
    (gltf)=>{
        setLoad(80,'Optimizando estructura...');
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

        // Vista lateral-isométrica ideal para un flyover/viaducto
        camera.position.set(m*1.4, m*0.7, m*1.5);
        camera.near=m*0.001; camera.far=m*50;
        camera.updateProjectionMatrix();

        ctrl.target.set(0,0,0);
        ctrl.minDistance=m*0.25; ctrl.maxDistance=m*8;
        ctrl.update();

        keyLight.position.set(m*2, m*2.5, m*1.5);
        keyLight.shadow.camera.left=-m*3; keyLight.shadow.camera.right=m*3;
        keyLight.shadow.camera.top=m*3; keyLight.shadow.camera.bottom=-m*3;
        keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=m*12;
        keyLight.shadow.camera.updateProjectionMatrix();
        fillLight.position.set(-m*1.5,m*1.2,-m);
        rimLight.position.set(-m*0.5,-m*0.3,-m*1.5);
        accentLight.position.set(m*0.5,m*2,m*0.5);
        accentLight.distance=m*12;

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            allMeshes.push(child);
            originalPositions.set(child.uuid, child.position.clone());

            if(child.material){
                child.material.envMapIntensity=1.1;
                child.material.needsUpdate=true;
            }
        });

        // Plataforma base
        const platform=new THREE.Mesh(
            new THREE.CylinderGeometry(m*0.75,m*0.80,m*0.02,64),
            new THREE.MeshStandardMaterial({color:0x0d0d12,roughness:0.88,metalness:0.12,emissive:0x080810,emissiveIntensity:0.25})
        );
        platform.position.y=box2.min.y-m*0.018;
        platform.receiveShadow=true;
        scene.add(platform);

        const grid=new THREE.GridHelper(m*1.5,36,0x223344,0x111a22);
        grid.position.y=box2.min.y-m*0.012;
        grid.material.opacity=0.22;
        grid.material.transparent=true;
        scene.add(grid);

        setLoad(100,'¡Flyover listo!');
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
    accentLight.intensity=0.7+Math.sin(t*0.001)*0.14;
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
    if(model){const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.4,mv*0.7,mv*1.5);}
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.18);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(1))};
$('bFr').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,0,mv*2.2);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,mv*2.5,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*2.2,0,0);ctrl.target.set(0,0,0)};
$('bIso').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.4,mv*0.7,mv*1.5);ctrl.target.set(0,0,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.55;
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
        n:'Kowloon Bay Flyover',
        s:'Infraestructura Vial Elevada — Hong Kong',
        d:'Modelo 3D fotogramétrico del flyover de Kowloon Bay (Hong Kong), sección I397482067707063A1 — 11-NE-12D. Viaducto urbano elevado característico de la densa red viaria de Hong Kong. Capturado con alta fidelidad geométrica y texturas fotorrealistas de hormigón, asfalto y elementos metálicos.',
        st:[{l:'Meshes',v:'21 elementos'},{l:'Materiales',v:'21 PBR'},{l:'Texturas',v:'12 HD'},{l:'Ubicación',v:'Kowloon, HK'}]
    },
    deck:{
        n:'Tablero / Calzada Elevada',
        s:'Superestructura Vial — Superficie de Rodadura',
        d:'Tablero del flyover que constituye la calzada elevada sobre la que circula el tráfico. Superficie de pavimento asfáltico con textura fotogramétrica de alta resolución que captura el desgaste real, marcas viales y acabados propios de la infraestructura de Hong Kong.',
        st:[{l:'Tipo',v:'Tablero continuo'},{l:'Superficie',v:'Asfalto fotogram.'},{l:'Función',v:'Calzada elevada'},{l:'Textura',v:'HD real'}]
    },
    beams:{
        n:'Vigas y Superestructura',
        s:'Sistema Estructural Portante',
        d:'Conjunto de vigas, jácenas y elementos de la superestructura que transfieren las cargas del tablero a las pilas de apoyo. Fabricadas en hormigón pretensado o armado, son el elemento estructural principal del viaducto. Material gris neutro con acabado de hormigón real.',
        st:[{l:'Material',v:'Hormigón arm./pret.'},{l:'Tipo',v:'Viga cajón / doble T'},{l:'Acabado',v:'Gris hormigón'},{l:'Función',v:'Transferencia cargas'}]
    },
    piers:{
        n:'Pilas y Columnas',
        s:'Subestructura de Apoyo Vertical',
        d:'Pilas y columnas de hormigón armado que soportan verticalmente la superestructura del flyover. Transmiten las cargas al terreno a través de las cimentaciones. Elemento característico de los viaductos urbanos de Hong Kong, diseñados para minimizar la ocupación del espacio viario inferior.',
        st:[{l:'Material',v:'Hormigón armado'},{l:'Tipo',v:'Pila maciza/hueca'},{l:'Función',v:'Soporte vertical'},{l:'Cimentación',v:'Pilotes / zapatas'}]
    },
    barriers:{
        n:'Barreras y Pretiles',
        s:'Elementos de Contención y Seguridad',
        d:'Barreras de seguridad, pretiles y elementos de contención lateral del flyover. Impiden la salida de vehículos de la calzada elevada y protegen el tráfico inferior. Incluye también detalles de juntas de dilatación, drenajes y accesorios de la estructura.',
        st:[{l:'Tipo',v:'Barrera New Jersey'},{l:'Material',v:'Hormigón / acero'},{l:'Función',v:'Contención lateral'},{l:'Normativa',v:'Tráfico HK'}]
    },
    surface:{
        n:'Pavimento y Entorno',
        s:'Contexto Urbano y Superficie Base',
        d:'Pavimento y superficie del entorno urbano circundante al flyover. Incluye la calzada inferior, aceras adyacentes y el contexto general de la zona de Kowloon Bay. La textura de gran resolución (17MP) captura con fidelidad el entorno fotogramétrico real.',
        st:[{l:'Textura',v:'17MP fotogram.'},{l:'Zona',v:'Kowloon Bay'},{l:'Tipo',v:'Entorno urbano'},{l:'Captura',v:'Fotogrametría'}]
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
