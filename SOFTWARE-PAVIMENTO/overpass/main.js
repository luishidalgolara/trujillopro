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

setLoad(10,'Configurando escena del overpass...');
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
renderer.toneMappingExposure=1.25;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera, canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.08;
ctrl.rotateSpeed=0.6; ctrl.zoomSpeed=0.9;
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.45;

setLoad(20,'Generando iluminación urbana...');
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
            vec3 c=mix(vec3(.04,.03,.03),mix(vec3(.07,.06,.05),vec3(.10,.09,.07),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.40,.25,.15)*pow(max(0.,dot(d,normalize(vec3(.9,.5,.3)))),12.)*.5;
            c+=vec3(.10,.12,.20)*pow(max(0.,dot(d,normalize(vec3(-.6,.4,-.5)))),7.)*.3;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.05).texture;
pmrem.dispose();

// Iluminación diurna urbana — resalta la paleta multicolor del overpass
const hemi=new THREE.HemisphereLight(0xddeeff,0x334422,0.7); scene.add(hemi);
const keyLight=new THREE.DirectionalLight(0xfff5ee,3.2);
keyLight.castShadow=true; keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.025; scene.add(keyLight);
const fillLight=new THREE.DirectionalLight(0x99bbdd,1.0); scene.add(fillLight);
const rimLight=new THREE.DirectionalLight(0xffddcc,1.6); scene.add(rimLight);
const accentLight=new THREE.PointLight(0xff6b35,0.6,0); scene.add(accentLight);

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.18,0.5,0.90);
composer.addPass(bloom);
const cgShader={
    uniforms:{tDiffuse:{value:null},sat:{value:0.50},vign:{value:0.22}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sat;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float g=dot(c,vec3(.2126,.7152,.0722));
    // Saturación para resaltar la rica paleta del overpass
    c=mix(vec3(g),c,1.0+sat*0.55);
    c=(c-.5)*1.06+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.35;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando overpass...');
let model=null;
const allMeshes=[];
const originalPositions=new Map();

// Mapeo directo por nombre de material
function getMeshGroup(mesh){
    return mesh.material?.name || 'black_st';
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

        const scale=7/maxDim;
        model.scale.setScalar(scale);
        model.position.set(-center.x*scale,-center.y*scale,-center.z*scale);

        const box2=new THREE.Box3().setFromObject(model);
        const size2=box2.getSize(new THREE.Vector3());
        const m=Math.max(size2.x,size2.y,size2.z);

        // Vista aérea ligeramente inclinada — ideal para overpass/paso elevado
        camera.position.set(m*1.2, m*1.2, m*1.5);
        camera.near=m*0.001; camera.far=m*50;
        camera.updateProjectionMatrix();

        ctrl.target.set(0,0,0);
        ctrl.minDistance=m*0.2; ctrl.maxDistance=m*8;
        ctrl.update();

        keyLight.position.set(m*2,m*2.5,m*1.5);
        keyLight.shadow.camera.left=-m*3; keyLight.shadow.camera.right=m*3;
        keyLight.shadow.camera.top=m*3; keyLight.shadow.camera.bottom=-m*3;
        keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=m*12;
        keyLight.shadow.camera.updateProjectionMatrix();
        fillLight.position.set(-m*1.5,m*1.2,-m);
        rimLight.position.set(-m*0.5,-m*0.2,-m*1.5);
        accentLight.position.set(0,m*2.5,0);
        accentLight.distance=m*14;

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            allMeshes.push(child);
            originalPositions.set(child.uuid,child.position.clone());
            if(child.material){
                child.material.envMapIntensity=0.9;
                child.material.roughness=Math.max(child.material.roughness||0.7, 0.6);
                child.material.needsUpdate=true;
            }
        });

        // Grid y plataforma base
        const platform=new THREE.Mesh(
            new THREE.CylinderGeometry(m*0.78,m*0.82,m*0.02,64),
            new THREE.MeshStandardMaterial({color:0x0e0d0c,roughness:0.88,metalness:0.10,emissive:0x080806,emissiveIntensity:0.2})
        );
        platform.position.y=box2.min.y-m*0.016;
        platform.receiveShadow=true;
        scene.add(platform);

        const grid=new THREE.GridHelper(m*1.6,40,0x332211,0x18140a);
        grid.position.y=box2.min.y-m*0.010;
        grid.material.opacity=0.20;
        grid.material.transparent=true;
        scene.add(grid);

        setLoad(100,'¡Overpass listo!');
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
    accentLight.intensity=0.6+Math.sin(t*0.001)*0.12;
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
    if(model){const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.2,mv*1.2,mv*1.5);}
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.18);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(1))};
$('bFr').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,0,mv*2.2);ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(0,mv*2.8,0.01);ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*2.2,0,0);ctrl.target.set(0,0,0)};
$('bIso').onclick=()=>{if(!model)return;const b=new THREE.Box3().setFromObject(model);const s=b.getSize(new THREE.Vector3());const mv=Math.max(s.x,s.y,s.z);camera.position.set(mv*1.2,mv*1.2,mv*1.5);ctrl.target.set(0,0,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.55;
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
        n:'Overpass',
        s:'Paso Elevado Urbano — Infraestructura Vial',
        d:'Modelo 3D de paso elevado urbano con paleta de 7 materiales: asfalto negro, pavimento blanco, baldosa cerámica, marcas amarillas, zonas rojas y azules, y vegetación verde. 21 meshes que representan todos los elementos de superficie de un overpass con señalización completa.',
        st:[{l:'Meshes',v:'21 elementos'},{l:'Materiales',v:'7 colores'},{l:'Texturas',v:'7 baseColor'},{l:'Tipo',v:'Paso elevado'}]
    },
    black_st:{
        n:'Asfalto Negro',
        s:'Calzada Principal — Superficie de Rodadura',
        d:'Superficie asfáltica negra de las calzadas principales del overpass. El asfalto negro de betún es el material más común en infraestructura vial. Su textura baseColor captura el aspecto del asfalto con los áridos superficiales visibles y el desgaste propio del tráfico.',
        st:[{l:'Material',v:'black_st'},{l:'Tipo',v:'Asfalto bituminoso'},{l:'Color',v:'Negro betún'},{l:'Uso',v:'Calzada principal'}]
    },
    white_st:{
        n:'Pavimento Blanco',
        s:'Superficies Claras y Aceras',
        d:'Superficies pavimentadas en tono claro/blanco correspondientes a aceras, zonas peatonales o pavimento especial del overpass. El contraste con el asfalto negro facilita la diferenciación visual de los distintos espacios del paso elevado.',
        st:[{l:'Material',v:'white_st'},{l:'Tipo',v:'Pavimento claro'},{l:'Color',v:'Blanco/gris claro'},{l:'Uso',v:'Aceras / zonas esp.'}]
    },
    st_tile:{
        n:'Baldosa y Mosaico',
        s:'Pavimento Cerámico Ornamental',
        d:'Pavimento de baldosa cerámica o mosaico decorativo en zonas específicas del overpass. Las baldosas se emplean habitualmente en zonas peatonales de calidad, accesos a escaleras mecánicas o zonas de descanso de los pasos elevados. Textura de mayor detalle con patrón de juntas.',
        st:[{l:'Material',v:'st_tile'},{l:'Tipo',v:'Cerámica / mosaico'},{l:'Patrón',v:'Junta de baldosa'},{l:'Uso',v:'Zonas peatonales'}]
    },
    st_yellow:{
        n:'Marcas Viales Amarillas',
        s:'Señalización Horizontal Amarilla',
        d:'Marcas viales horizontales en color amarillo: líneas de separación de carriles, bordes de calzada, zonas de prohibición de parada y otras señales pintadas. El amarillo es el color estándar de la señalización horizontal en muchos países asiáticos y es el más extenso en área en este modelo (2.4MB de textura).',
        st:[{l:'Material',v:'st_yellow'},{l:'Tipo',v:'Señalización horiz.'},{l:'Color',v:'Amarillo vial'},{l:'Textura',v:'2.4MB — más grande'}]
    },
    st_red:{
        n:'Zonas Rojas',
        s:'Superficie Roja — Carril Bici / Zonas Especiales',
        d:'Superficies en color rojo que señalizan carriles bici, zonas de prioridad peatonal, pasos de cebra con color o áreas de prohibición. El rojo en pavimento se usa para llamar la atención del conductor sobre zonas de especial precaución o conflicto.',
        st:[{l:'Material',v:'st_red'},{l:'Tipo',v:'Zona especial'},{l:'Color',v:'Rojo señalización'},{l:'Uso',v:'Carril bici / prioridad'}]
    },
    st_blue:{
        n:'Zonas Azules',
        s:'Superficies Azules — Aparcamiento / Zonas Especiales',
        d:'Áreas en azul que pueden corresponder a plazas de aparcamiento regulado (zona azul), carriles de transporte público o zonas especiales del overpass. El azul en señalización indica habitualmente información o zonas de servicios específicos.',
        st:[{l:'Material',v:'st_blue'},{l:'Tipo',v:'Zona especial'},{l:'Color',v:'Azul señalización'},{l:'Uso',v:'Aparcamiento / bus'}]
    },
    green:{
        n:'Vegetación y Zonas Verdes',
        s:'Elementos Naturales del Overpass',
        d:'Zonas ajardinadas, césped o vegetación integrada en el diseño del overpass. La incorporación de vegetación en los pasos elevados urbanos mejora el confort ambiental, reduce el efecto isla de calor y humaniza la infraestructura. Característico de diseños urbanos modernos en Asia.',
        st:[{l:'Material',v:'green'},{l:'Tipo',v:'Jardín elevado'},{l:'Color',v:'Verde vegetación'},{l:'Uso',v:'Zonas ajardinadas'}]
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
            mat.transparent=!isTarget; mat.opacity=isTarget?1:0.05; mat.depthWrite=isTarget;
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
