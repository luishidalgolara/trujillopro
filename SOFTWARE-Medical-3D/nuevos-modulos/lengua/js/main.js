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
scene.fog=new THREE.FogExp2(0xf5f7fa, 0.018);

const camera=new THREE.PerspectiveCamera(42, innerWidth/(innerHeight-52), 0.01, 100);
camera.position.set(0, 0.5, 4.0);

const renderer=new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setSize(innerWidth, innerHeight-52);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=0.95;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera, canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.06;
ctrl.rotateSpeed=0.7; ctrl.zoomSpeed=0.8;
ctrl.minDistance=1.0; ctrl.maxDistance=10;
ctrl.target.set(0, 0, 0);
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.4;

// ===== ENVIRONMENT =====
setLoad(20,'Generando environment...');
const pmrem=new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
const envSc=new THREE.Scene();
envSc.add(new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.ShaderMaterial({
        side: THREE.BackSide,
        vertexShader:`varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`varying vec3 vP;void main(){
            vec3 d=normalize(vP);float y=d.y*.5+.5;
            vec3 c=mix(vec3(.88,.90,.94),mix(vec3(.94,.96,.98),vec3(.98,.99,1.0),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.80,.88,1.0)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.4)))),8.)*.18;
            c+=vec3(.70,.80,.90)*pow(max(0.,dot(d,normalize(vec3(-.6,.3,-.5)))),5.)*.10;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc, 0.04).texture;
pmrem.dispose();

// ===== LIGHTING =====
setLoad(30,'Iluminación...');
scene.add(new THREE.HemisphereLight(0xddeeff, 0xaabbcc, 1.10));

const keyLight=new THREE.DirectionalLight(0xffffff, 3.8);
keyLight.position.set(3, 5, 4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xccddf0, 1.4);
fillLight.position.set(-5, 3, -2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffffff, 1.6);
rimLight.position.set(-2, -1, -5); scene.add(rimLight);

const sssLight=new THREE.PointLight(0xffccaa, 0.45, 8);
sssLight.position.set(0, -1, 1.5); scene.add(sssLight);

const topLight=new THREE.PointLight(0xffffff, 1.20, 14);
topLight.position.set(0, 5, 3); scene.add(topLight);

// ===== POST-PROCESSING =====
setLoad(40,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.06, 0.40, 0.92);
composer.addPass(bloom);

const cgShader={
    uniforms:{tDiffuse:{value:null},sss:{value:0.25},vign:{value:0.82}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sss;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.299,.587,.114));float sm=smoothstep(.55,.80,lum)*(1.-smoothstep(.80,.99,lum));
    c+=vec3(.60,.20,.20)*sss*sm*.06;
    c=(c-.5)*1.05+.5;
    vec2 u=vUv*2.-1.;
    float dist=dot(u,u);
    float v1=1.-smoothstep(0.0,1.0,dist)*vign*0.75;
    float v2=1.-pow(dist,1.4)*vign*0.55;
    float v3=1.-pow(max(0.,dist-0.2),2.0)*vign*0.40;
    c*=min(v1,min(v2,v3));
    float corner=pow(max(abs(vUv.x-.5),abs(vUv.y-.5))*2.0,3.0)*vign*0.35;
    c*=1.-corner;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth, innerHeight));

// ===== LOAD MODEL =====
setLoad(50,'Cargando modelo lingual...');
let model=null;
let meshes=[];

new GLTFLoader().load('lengua3d.glb',
    (gltf)=>{
        setLoad(80,'Mejorando materiales...');
        model=gltf.scene;

        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const sc=3.0/Math.max(size.x, size.y, size.z);
        model.scale.setScalar(sc);
        const sb=new THREE.Box3().setFromObject(model);
        const sc2=sb.getCenter(new THREE.Vector3());
        model.position.sub(sc2);

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            meshes.push(child);

            const mat=child.material;
            const combined=(child.name||'').toLowerCase()+' '+(mat&&mat.name||'').toLowerCase();

            // Mucosa / superficie lingual — tejido epitelial
            const isMucosa=/(mucosa|epiteli|surface|dorso|dorsal|venter|ventral|apex|tip|punta|tongue|lengua|skin)/i.test(combined);
            // Músculo — tejido muscular estriado
            const isMuscle=/(muscle|musculo|muscular|fiber|fibra|geniogloss|hyogloss|stylogloss|palatogloss|longitud|transvers|vertic)/i.test(combined);
            // Papilas — proyecciones mucosas
            const isPapilla=/(papil|filliform|fungiform|circumvalat|caliciform|foliat|taste|gusto)/i.test(combined);
            // Nervio
            const isNerve=/(nerve|nervio|neural|lingual|chorda|tympani|glosso|hypogloss|hypoglos)/i.test(combined);
            // Vaso sanguíneo / arteria
            const isVessel=/(artery|arteria|vessel|vein|vena|blood|vascular|lingual.art)/i.test(combined);
            // Tejido conectivo / submucosa
            const isConnective=/(connect|connective|submucosa|septum|septo|fibrous|fibroso)/i.test(combined);
            // Glándulas salivales menores
            const isGland=/(gland|glandula|salivary|saliv|serous|mucous)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat){
                if(mat.map) pm.map=mat.map;
                if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.4,1.4);}
                if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
                if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;
                if(mat.color) pm.color.copy(mat.color);
            }

            if(isMucosa){
                // Mucosa: tejido blando rosado-rojo, SSS prominente, húmedo
                pm.roughness=0.48; pm.metalness=0;
                pm.sheen=0.50; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.95,0.68,0.68);
                pm.clearcoat=0.25; pm.clearcoatRoughness=0.30;
                pm.thickness=0.9; pm.attenuationColor=new THREE.Color(0.95,0.70,0.70);
                pm.attenuationDistance=1.0;
                pm.emissive=new THREE.Color(0.10,0.03,0.03); pm.emissiveIntensity=0.12;
                pm.envMapIntensity=0.30;
            } else if(isMuscle){
                // Músculo: rojo-rosado intenso, fibras, mate
                pm.roughness=0.72; pm.metalness=0;
                pm.sheen=0.30; pm.sheenRoughness=0.62;
                pm.sheenColor=new THREE.Color(0.85,0.55,0.55);
                pm.clearcoat=0.05; pm.clearcoatRoughness=0.70;
                pm.thickness=0.7; pm.attenuationColor=new THREE.Color(0.90,0.60,0.60);
                pm.attenuationDistance=0.8;
                pm.emissive=new THREE.Color(0.12,0.03,0.03); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.15;
            } else if(isPapilla){
                // Papilas: proyecciones mucosas con mayor reflexión especular
                pm.roughness=0.40; pm.metalness=0;
                pm.sheen=0.60; pm.sheenRoughness=0.42;
                pm.sheenColor=new THREE.Color(1.0,0.72,0.72);
                pm.clearcoat=0.35; pm.clearcoatRoughness=0.22;
                pm.thickness=0.4; pm.attenuationColor=new THREE.Color(0.98,0.75,0.75);
                pm.attenuationDistance=0.5;
                pm.emissive=new THREE.Color(0.12,0.04,0.04); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.45;
            } else if(isNerve){
                // Nervio: amarillento cremoso
                pm.roughness=0.58; pm.metalness=0;
                pm.sheen=0.35; pm.sheenRoughness=0.48;
                pm.sheenColor=new THREE.Color(0.95,0.90,0.65);
                pm.emissive=new THREE.Color(0.06,0.07,0.02); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.22;
            } else if(isVessel){
                // Vaso: rojo brillante arterial
                pm.roughness=0.28; pm.metalness=0;
                pm.clearcoat=0.50; pm.clearcoatRoughness=0.18;
                pm.sheen=0.40; pm.sheenRoughness=0.38;
                pm.sheenColor=new THREE.Color(1.0,0.60,0.60);
                pm.emissive=new THREE.Color(0.18,0.03,0.03); pm.emissiveIntensity=0.18;
                pm.envMapIntensity=0.55;
            } else if(isConnective){
                // Tejido conectivo: blanco-grisáceo fibroso
                pm.roughness=0.65; pm.metalness=0;
                pm.sheen=0.18; pm.sheenRoughness=0.60;
                pm.sheenColor=new THREE.Color(0.90,0.88,0.85);
                pm.emissive=new THREE.Color(0.04,0.04,0.05); pm.emissiveIntensity=0.07;
                pm.envMapIntensity=0.20;
            } else if(isGland){
                // Glándulas: translúcidas, lobuladas
                pm.roughness=0.55; pm.metalness=0;
                pm.transmission=0.08; pm.thickness=0.3;
                pm.clearcoat=0.30; pm.clearcoatRoughness=0.35;
                pm.ior=1.40;
                pm.attenuationColor=new THREE.Color(0.95,0.88,0.80);
                pm.attenuationDistance=0.4;
                pm.emissive=new THREE.Color(0.06,0.05,0.03); pm.emissiveIntensity=0.09;
                pm.envMapIntensity=0.35;
            } else {
                // Default
                pm.roughness=mat&&mat.roughness!=null?mat.roughness:0.58;
                pm.metalness=mat&&mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.15; pm.clearcoatRoughness=0.45;
                pm.sheen=0.25; pm.sheenRoughness=0.52;
                pm.sheenColor=new THREE.Color(0.92,0.78,0.78);
                pm.emissive=new THREE.Color(0.05,0.03,0.03); pm.emissiveIntensity=0.09;
                pm.envMapIntensity=0.30;
            }

            pm.side=THREE.DoubleSide;
            child.material=pm;
        });

        scene.add(model);

        const gnd=new THREE.Mesh(new THREE.PlaneGeometry(18,18),
            new THREE.MeshStandardMaterial({color:0xf0f2f6,roughness:0.96,transparent:true,opacity:0.5}));
        gnd.rotation.x=-Math.PI/2;
        const sb2=new THREE.Box3().setFromObject(model);
        gnd.position.y=sb2.min.y-0.06;
        gnd.receiveShadow=true;
        scene.add(gnd);

        setLoad(100,'¡Listo!');
        setTimeout(()=>ls.classList.add('hidden'), 500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1024|0)+'KB')},
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que lengua3d.glb esté en la misma carpeta.')}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS'; fc=0; lt=t;}
    ctrl.update();
    sssLight.intensity=0.45+Math.sin(t*0.0007)*0.05;
    topLight.intensity=0.70+Math.cos(t*0.0009)*0.05;
    composer.render();
})(0);

addEventListener('resize',()=>{
    const w=innerWidth, h=innerHeight-52;
    camera.aspect=w/h; camera.updateProjectionMatrix();
    renderer.setSize(w,h); composer.setSize(w,h); bloom.setSize(w,h);
});

// ===== CONTROLS =====
let ar=true;
$('bRot').onclick=e=>{ar=!ar; ctrl.autoRotate=ar; e.currentTarget.classList.toggle('active',ar)};
$('bRst').onclick=()=>{ctrl.target.set(0,0,0); camera.position.set(0,0.5,4.0)};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.15);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(0.5))};
$('bFr').onclick=()=>{camera.position.set(0,0,4); ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{camera.position.set(0,4,0.01); ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{camera.position.set(4,0,0); ctrl.target.set(0,0,0)};
$('bBk').onclick=()=>{camera.position.set(0,0,-4); ctrl.target.set(0,0,0)};
let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis; $('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis'); e.currentTarget.classList.toggle('active')};
$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.5;
$('ppE').oninput=e=>renderer.toneMappingExposure=e.target.value/100;
$('ppS').oninput=e=>cgPass.uniforms.sss.value=e.target.value/100;
$('ppV').oninput=e=>cgPass.uniforms.vign.value=e.target.value/100;

// ===== HIGHLIGHT / EMISSIVE FEEDBACK =====
function setHighlight(sel){
    meshes.forEach(mesh=>{
        const mat=mesh.material;
        mat.transparent=false; mat.opacity=1; mat.depthWrite=true;
        if(sel==='all'){
            mat.emissive.setRGB(0.02,0.03,0.05); mat.emissiveIntensity=0.08;
        } else if(sel==='apex'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='cuerpo'){
            mat.emissive.setRGB(0.14,0.04,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='base'){
            mat.emissive.setRGB(0.12,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='dorso'){
            mat.emissive.setRGB(0.14,0.04,0.04); mat.emissiveIntensity=0.24;
        } else if(sel==='vientre'){
            mat.emissive.setRGB(0.12,0.04,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='filiformes'){
            mat.emissive.setRGB(0.12,0.08,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='fungiformes'){
            mat.emissive.setRGB(0.16,0.06,0.02); mat.emissiveIntensity=0.26;
        } else if(sel==='caliciformes'){
            mat.emissive.setRGB(0.14,0.05,0.02); mat.emissiveIntensity=0.26;
        } else if(sel==='foliadas'){
            mat.emissive.setRGB(0.12,0.05,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='surco_medio'){
            mat.emissive.setRGB(0.05,0.12,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='surco_terminal'){
            mat.emissive.setRGB(0.05,0.14,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='foramen_caecum'){
            mat.emissive.setRGB(0.04,0.12,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='amigdala_lingual'){
            mat.emissive.setRGB(0.12,0.04,0.08); mat.emissiveIntensity=0.22;
        } else if(sel==='longitudinal_sup'||sel==='longitudinal_inf'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.24;
        } else if(sel==='transverso'||sel==='vertical'){
            mat.emissive.setRGB(0.14,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='geniogloso'){
            mat.emissive.setRGB(0.04,0.07,0.16); mat.emissiveIntensity=0.24;
        } else if(sel==='hiogloso'){
            mat.emissive.setRGB(0.04,0.06,0.14); mat.emissiveIntensity=0.22;
        } else if(sel==='estilogloso'){
            mat.emissive.setRGB(0.03,0.05,0.13); mat.emissiveIntensity=0.22;
        } else if(sel==='palatogloso'){
            mat.emissive.setRGB(0.03,0.04,0.12); mat.emissiveIntensity=0.20;
        } else if(sel==='nervio_lingual'){
            mat.emissive.setRGB(0.05,0.14,0.03); mat.emissiveIntensity=0.24;
        } else if(sel==='cuerda_timpano'){
            mat.emissive.setRGB(0.04,0.12,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='glosofaringeo'){
            mat.emissive.setRGB(0.04,0.10,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='hipogloso'){
            mat.emissive.setRGB(0.10,0.04,0.14); mat.emissiveIntensity=0.24;
        } else if(sel==='arteria_lingual'){
            mat.emissive.setRGB(0.18,0.03,0.03); mat.emissiveIntensity=0.26;
        } else {
            mat.emissive.setRGB(0.04,0.05,0.08); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{
        n:'Lengua Humana',
        s:'Sistema Digestivo y Gustativo — Órgano Muscular Multifuncional',
        d:'La lengua es un órgano muscular móvil situado en el suelo de la cavidad oral, tapizado por mucosa especializada con papilas gustativas. Cumple funciones en la masticación (mezcla y posicionamiento del bolo alimenticio), deglución (impulso faríngeo), fonación (articulación de fonemas) y gusto (transducción química de sabores). Está formada por 8 músculos y recibe inervación de 4 pares craneales (V, VII, IX, XII). Posee aproximadamente 10,000 papilas gustativas con botones gustativos capaces de detectar 5 sabores primarios.',
        st:[{l:'Músculos totales',v:'8 (4 intrínsecos + 4 extrínsecos)'},{l:'Papilas gustativas',v:'~10,000 (botones gustativos)'},{l:'Pares craneales',v:'4 (V3, VII, IX, XII)'},{l:'Sabores primarios',v:'5 (dulce, sal, ácido, amargo, umami)'}]
    },
    apex:{
        n:'Ápex Lingual (Punta)',
        s:'Región Anterior — Zona de Mayor Movilidad y Sensibilidad',
        d:'El ápex o punta de la lengua es la región más anterior y móvil del órgano. Contiene alta densidad de papilas fungiformes con botones gustativos (especialmente sensibles a sabores dulces y salados) y terminaciones nerviosas táctiles de Meissner. Es la zona de mayor destreza motora, fundamental para la articulación de fonemas dentales y alveolares (/t/, /d/, /n/, /l/, /r/, /s/). Recibe inervación sensitiva del nervio lingual (rama del NC V3) y gustativa de la cuerda del tímpano (rama del NC VII). Su irrigación proviene de las ramas apicales de la arteria lingual profunda.',
        st:[{l:'Papilas dominantes',v:'Fungiformes (gusto + tacto)'},{l:'Sabores',v:'Dulce y salado (mayor densidad)'},{l:'Fonemas asociados',v:'/t/, /d/, /n/, /l/, /r/, /s/'},{l:'Inervación sensitiva',v:'Nervio lingual (NC V3)'}]
    },
    cuerpo:{
        n:'Cuerpo Lingual',
        s:'Porción Oral — Zona Funcional Principal',
        d:'El cuerpo lingual comprende los dos tercios anteriores de la lengua, situados en la cavidad oral propiamente dicha (por delante del surco terminal). Es la región más activa durante la masticación y la deglución oral. Su dorso presenta una densa población de papilas filiformes (función táctil/mecánica) y fungiformes (función gustativa), así como el surco medio longitudinal que lo divide en dos hemilenguas simétricas. La musculatura intrínseca del cuerpo (longitudinal superior e inferior, transverso y vertical) permite los movimientos de elongación, acortamiento, curvatura y aplanamiento.',
        st:[{l:'Extensión',v:'2/3 anteriores (porción oral)'},{l:'Límite posterior',v:'Surco terminal (V lingual)'},{l:'Papilas predominantes',v:'Filiformes + fungiformes'},{l:'Inervación motora',v:'Nervio hipogloso (NC XII)'}]
    },
    base:{
        n:'Base de la Lengua',
        s:'Porción Faríngea — Zona Inmunológica y Deglutoria',
        d:'La base o raíz de la lengua constituye el tercio posterior, situado en la orofaringe (por detrás del surco terminal). Carece de papilas gustativas típicas pero presenta abundante tejido linfoide organizado en nódulos que conforman la amígdala lingual (parte del anillo de Waldeyer). Es la zona decisiva en la fase faríngea de la deglución, empujando el bolo hacia la faringe. Recibe inervación sensitiva y gustativa del nervio glosofaríngeo (NC IX). El músculo geniogloso y el hiogloso son los principales actores musculares de esta región.',
        st:[{l:'Extensión',v:'1/3 posterior (porción faríngea)'},{l:'Tejido linfoide',v:'Amígdala lingual (anillo Waldeyer)'},{l:'Inervación sensitiva',v:'Nervio glosofaríngeo (NC IX)'},{l:'Función deglutoria',v:'Propulsión fase faríngea'}]
    },
    dorso:{
        n:'Dorso Lingual',
        s:'Cara Superior — Superficie Gustativa y Táctil',
        d:'El dorso de la lengua es la cara superior, la más visible al abrir la boca. Está recubierto por epitelio escamoso estratificado queratinizado en la porción anterior (resistente a la abrasión masticatoria) y no queratinizado en la base. En él se encuentran los cuatro tipos de papilas linguales: filiformes (predominantes, función mecánica), fungiformes (dispersas, rojas, con botones gustativos), caliciformes (en "V" terminal) y foliadas (bordes laterales). El color rosado-rojo del dorso refleja la riqueza vascular de la lámina propia subyacente. Una capa blanquecina puede indicar acúmulo de células descamadas, bacterias o deshidratación.',
        st:[{l:'Epitelio',v:'Escamoso estratificado (queratinizado ant.)'},{l:'4 tipos de papilas',v:'Filiforme, fungiforme, caliciforme, foliada'},{l:'Color normal',v:'Rosado-rojo (vascularización)'},{l:'Saburra lingual',v:'Capa blanca = células + bacterias'}]
    },
    vientre:{
        n:'Vientre Lingual (Cara Inferior)',
        s:'Cara Inferior — Zona Vascular y Frénulo',
        d:'El vientre o cara inferior de la lengua presenta un epitelio delgado, no queratinizado y altamente vascularizado, lo que lo convierte en la zona de mayor absorción sublingual de fármacos (nitroglicerina, buprenorfina). Muestra las venas raninas (profundas, azuladas, prominentes) a ambos lados del frénulo lingual, una plica mucosa media que ancla la lengua al suelo oral. A los lados del frénulo se encuentran los carúnculas sublinguales, orificios de salida de los conductos de las glándulas submandibulares (conductos de Wharton) y sublinguales. La restricción del frénulo (frenillo corto) produce anquiloglosia.',
        st:[{l:'Epitelio',v:'Delgado, no queratinizado'},{l:'Absorción sublingual',v:'Alta (nitroglicerina, opioides)'},{l:'Venas raninas',v:'Prominentes (visibles)'},{l:'Frénulo corto',v:'Anquiloglosia (lengua atada)'}]
    },
    filiformes:{
        n:'Papilas Filiformes',
        s:'Papilas Linguales — Función Mecánica y Táctil',
        d:'Las papilas filiformes son las más numerosas (~70% de todas las papilas) y pequeñas de la lengua, distribuidas uniformemente por todo el dorso del cuerpo lingual. Tienen forma cónica o filiforme con proyecciones queratinizadas en su vértice que apuntan hacia la faringe, funcionando como raspadores que retienen y mueven los alimentos. No contienen botones gustativos, por lo que no participan en la percepción del sabor — su función es exclusivamente mecánica y táctil. Su atrofia (glositis atrófica) produce el aspecto de "lengua aframbuesada" y se asocia a déficit de vitaminas B (B12, B2), hierro o anemia perniciosa.',
        st:[{l:'Abundancia',v:'Más numerosas (~70% del total)'},{l:'Función',v:'Mecánica y táctil (no gusto)'},{l:'Botones gustativos',v:'Ausentes'},{l:'Atrofia asociada',v:'Déficit B12, hierro, anemia'}]
    },
    fungiformes:{
        n:'Papilas Fungiformes',
        s:'Papilas Linguales — Receptores de Gusto Primarios',
        d:'Las papilas fungiformes (~200-400 por lengua) son visibles a simple vista como pequeños puntos rojos dispersos entre las filiformes, con mayor densidad en el ápex y los márgenes laterales. Tienen forma de hongo (de ahí su nombre): pedículo estrecho y cabeza ensanchada, ricamente vascularizada (lo que explica su color rojo). Cada papila contiene 3-5 botones gustativos en su superficie dorsal, con células gustativas capaces de detectar dulce, salado, ácido, amargo y umami. Son inervadas por la cuerda del tímpano (rama del NC VII — gusto) y el nervio lingual (NC V3 — tacto).',
        st:[{l:'Número',v:'~200-400 por lengua'},{l:'Botones gustativos',v:'3-5 por papila'},{l:'Inervación gustativa',v:'Cuerda del tímpano (NC VII)'},{l:'Localización',v:'Máxima densidad en ápex'}]
    },
    caliciformes:{
        n:'Papilas Caliciformes (Circunvaladas)',
        s:'Papilas Linguales — Mayor Concentración de Botones Gustativos',
        d:'Las papilas caliciformes o circunvaladas (7-12 en total) son las más grandes de la lengua, dispuestas en fila en el surco terminal formando la "V lingual". Cada una está rodeada por un surco circular profundo tapizado por epitelio con botones gustativos (~100-300 por papila, las más numerosas en cuanto a botones por papila). Las glándulas de von Ebner (glándulas serosas situadas bajo estas papilas) secretan un líquido que disuelve las moléculas del alimento y limpia el surco permitiendo nuevas percepciones. Reciben inervación gustativa y sensitiva del nervio glosofaríngeo (NC IX). Son especialmente sensibles al sabor amargo.',
        st:[{l:'Número',v:'7-12 (en V terminal)'},{l:'Botones gustativos',v:'~100-300 por papila'},{l:'Glándulas asociadas',v:'Von Ebner (solvente de sapidos)'},{l:'Inervación',v:'Nervio glosofaríngeo (NC IX)'}]
    },
    foliadas:{
        n:'Papilas Foliadas',
        s:'Papilas Linguales — Bordes Laterales Posteriores',
        d:'Las papilas foliadas son pliegues mucosos paralelos situados en los márgenes laterales posteriores de la lengua (zona de transición entre el cuerpo y la base). En humanos adultos son rudimentarias y poco desarrolladas (vestigiales en comparación con otros mamíferos). Contienen botones gustativos en sus paredes laterales, principalmente receptores del sabor ácido y salado. Son inervadas por la cuerda del tímpano (NC VII) en su porción anterior y por el glosofaríngeo (NC IX) en la posterior. Su inflamación (papilitis foliada) puede confundirse con lesiones neoplásicas dado su aspecto irregular.',
        st:[{l:'Localización',v:'Márgenes laterales posteriores'},{l:'Desarrollo en humanos',v:'Rudimentario (vestigial)'},{l:'Sabores detectados',v:'Ácido y salado'},{l:'Inervación',v:'NC VII (ant.) + NC IX (post.)'}]
    },
    surco_medio:{
        n:'Surco Medio Longitudinal',
        s:'Referencia Anatómica — División Bilateral de la Lengua',
        d:'El surco medio longitudinal es una depresión lineal que recorre el dorso de la lengua de adelante hacia atrás, desde el ápex hasta el foramen caecum. Corresponde en profundidad al septo lingual fibroso medio, una estructura de tejido conjuntivo denso que divide la lengua en dos mitades simétricas. Este septo actúa como límite funcional: la musculatura intrínseca y extrínseca de cada hemilengua actúa de forma coordinada pero independiente. El septo medio tiene importancia quirúrgica ya que constituye un plano avascular relativamente seguro en las glosectomías parciales medianas.',
        st:[{l:'Estructura subyacente',v:'Septo lingual fibroso'},{l:'Función',v:'División bilateral (2 hemilenguas)'},{l:'Importancia quirúrgica',v:'Plano avascular (glosectomía)'},{l:'Trayecto',v:'Ápex → Foramen caecum'}]
    },
    surco_terminal:{
        n:'Surco Terminal (V Lingual)',
        s:'Límite Anatómico — Separación Oral/Faríngea',
        d:'El surco terminal es un surco en forma de V o herradura que demarca el límite entre los dos tercios anteriores (porción oral, innervada por NC VII para gusto y NC V3 para sensibilidad) y el tercio posterior de la lengua (porción faríngea, innervada por NC IX). En su vértice posterior se sitúa el foramen caecum. Esta distinción embriológica es fundamental: la porción anterior deriva del tubérculo impar y los procesos laterales linguales del primer arco branquial, mientras que la base deriva del copula y el tercer arco branquial. La inervación diferencial tiene importancia diagnóstica en lesiones neurológicas.',
        st:[{l:'Forma',v:'V o herradura (abierta anterior)'},{l:'Límite embriológico',v:'Arco 1 (ant.) vs arco 3 (post.)'},{l:'Relevancia clínica',v:'Distinción inervación NC VII / NC IX'},{l:'Vértice posterior',v:'Foramen caecum'}]
    },
    foramen_caecum:{
        n:'Foramen Caecum',
        s:'Remanente Embriológico — Origen del Tiroides',
        d:'El foramen caecum (foramen ciego) es una pequeña depresión ciega en el vértice del surco terminal, en la línea media. Representa el punto de origen embriológico del tiroides: en la cuarta semana del desarrollo, el esbozo tiroideo desciende desde este punto del suelo faríngeo hacia el cuello a través del conducto tirogloso. Este conducto normalmente involuciona, pero su persistencia puede dar lugar a quistes del conducto tirogloso (la anomalía congénita cervical media más frecuente en niños) o tejido tiroideo ectópico (tiroides lingual en ~1/100,000 personas). No tiene función en el adulto.',
        st:[{l:'Estructura',v:'Depresión ciega en línea media'},{l:'Origen embriológico',v:'Punto de descenso del tiroides'},{l:'Patología asociada',v:'Quiste conducto tirogloso'},{l:'Tiroides lingual',v:'Ectopia tiroidea (~1/100,000)'}]
    },
    amigdala_lingual:{
        n:'Amígdala Lingual',
        s:'Tejido Linfoide — Componente del Anillo de Waldeyer',
        d:'La amígdala lingual es una masa de tejido linfoide difuso y nódulos linfoides que cubre la mucosa de la base de la lengua. Forma parte del anillo linfático de Waldeyer junto con las amígdalas palatinas, faríngea (adenoides) y tubáricas. Actúa como primera línea de defensa inmunológica del tracto aerodigestivo superior, produciendo IgA secretora y activando linfocitos T y B ante antígenos inhalados o ingeridos. Sufre hiperplasia reactiva en procesos infecciosos (mononucleosis, faringoamigdalitis). Su importancia oncológica ha aumentado dado que es la localización más frecuente del carcinoma escamoso de orofaringe asociado al VPH.',
        st:[{l:'Tipo de tejido',v:'MALT (tejido linfoide asociado a mucosa)'},{l:'Anillo de Waldeyer',v:'Con amígdalas palatina, faríngea, tubárica'},{l:'Función',v:'Inmunidad (IgA secretora)'},{l:'Oncología',v:'Localización frecuente Ca escamoso VPH+'}]
    },
    longitudinal_sup:{
        n:'Músculo Longitudinal Superior',
        s:'Musculatura Intrínseca — Acortamiento y Curvatura Dorsal',
        d:'El músculo longitudinal superior es el más superficial de los músculos intrínsecos de la lengua. Se extiende desde la base de la lengua (submucosa de la epiglotis y bordes de la mandíbula) hasta el ápex, corriendo justo por debajo de la mucosa dorsal. Su contracción acorta la lengua, eleva el ápex y dobla el dorso hacia arriba (curvatura longitudinal dorsal). Trabaja en sinergia con el longitudinal inferior para producir movimientos verticales coordinados del ápex. Es inervado exclusivamente por el nervio hipogloso (NC XII). Su función es esencial en la articulación de fonemas que requieren elevación de la punta.',
        st:[{l:'Localización',v:'Submucosa dorsal (más superficial)'},{l:'Acción',v:'Acorta lengua + eleva ápex'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'},{l:'Fonemas',v:'Elevación apical (/l/, /t/, /n/)'}]
    },
    longitudinal_inf:{
        n:'Músculo Longitudinal Inferior',
        s:'Musculatura Intrínseca — Acortamiento y Curvatura Ventral',
        d:'El músculo longitudinal inferior discurre a lo largo de la cara inferior de la lengua, entre el músculo geniogloso y el hiogloso, desde la base hasta el ápex. Su contracción acorta la lengua y curva el ápex hacia abajo (curvatura ventral), actuando antagonistamente al longitudinal superior. Junto con el geniogloso, permite la protrusión y retracción de la lengua con control de la curvatura. Inervado por el nervio hipogloso (NC XII). Su paresia unilateral produce desviación de la lengua hacia el lado afectado en protrusión (signo de lesión del NC XII).',
        st:[{l:'Localización',v:'Cara inferior (entre geniogloso e hiogloso)'},{l:'Acción',v:'Acorta lengua + deflexiona ápex inferior'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'},{l:'Lesión NC XII',v:'Desviación ipsilateral en protrusión'}]
    },
    transverso:{
        n:'Músculo Transverso',
        s:'Musculatura Intrínseca — Estrecha y Alarga la Lengua',
        d:'El músculo transverso es uno de los cuatro músculos intrínsecos y está formado por fibras que parten del septo lingual fibroso medio y se dirigen transversalmente hacia los márgenes laterales de la lengua, insertándose en la submucosa de los bordes. Su contracción estrecha la lengua bilateralmente y, como consecuencia biomecánica, la alarga (aumenta su longitud anteroposterior). Trabaja en sinergia con el geniogloso durante la protrusión. Inervado por el nervio hipogloso (NC XII). Es fundamental para los movimientos de precisión del habla y para la manipulación del bolo alimenticio.',
        st:[{l:'Origen',v:'Septo medio fibroso'},{l:'Inserción',v:'Submucosa de los bordes laterales'},{l:'Acción',v:'Estrecha y alarga la lengua'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'}]
    },
    vertical:{
        n:'Músculo Vertical',
        s:'Musculatura Intrínseca — Aplana la Lengua',
        d:'El músculo vertical es el más pequeño de los intrínsecos y tiene fibras que discurren en sentido vertical entre la mucosa dorsal y la mucosa ventral, principalmente en los bordes laterales del cuerpo lingual. Su contracción aplana la lengua reduciendo su altura y expandiéndola lateralmente. Trabaja en conjunto con el transverso para modificar la forma de la lengua durante la deglución, facilitando la adaptación al paladar duro. Inervado por el nervio hipogloso (NC XII). Su importancia clínica reside en que su coordinación con los otros músculos intrínsecos permite la capacidad articulatoria fina del habla humana.',
        st:[{l:'Localización',v:'Bordes laterales del cuerpo'},{l:'Acción',v:'Aplana y expande lateralmente'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'},{l:'Función en deglución',v:'Adaptación al paladar duro'}]
    },
    geniogloso:{
        n:'Músculo Geniogloso',
        s:'Musculatura Extrínseca — Protrusor Principal de la Lengua',
        d:'El geniogloso es el mayor de los músculos linguales y el principal protrusor de la lengua. Se origina en la espina mentoniana superior (apófisis geni) de la cara interna de la sínfisis mandibular y sus fibras se irradian en abanico: las inferiores se insertan en el hueso hioides, las medias en el dorso lingual y las superiores en el ápex. Es el músculo más importante para mantener la vía aérea permeable durante el sueño (su hipotonía es la principal causa de apnea obstructiva del sueño). Inervado por el nervio hipogloso (NC XII). La estimulación eléctrica del nervio hipogloso es un tratamiento de la apnea del sueño.',
        st:[{l:'Origen',v:'Espina geni (mandíbula interna)'},{l:'Acción principal',v:'Protrusión + depresión del dorso'},{l:'Vía aérea',v:'Crucial en apnea obstructiva del sueño'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'}]
    },
    hiogloso:{
        n:'Músculo Hiogloso',
        s:'Musculatura Extrínseca — Depresor y Retractor',
        d:'El músculo hiogloso se origina en el asta mayor y el cuerpo del hueso hioides y sus fibras ascienden verticalmente para insertarse en los bordes laterales de la lengua. Su contracción deprime y retrae la lengua (movimiento antagonista al geniogloso). Es un músculo de referencia anatómica quirúrgica: el nervio hipogloso discurre por su superficie inferior; el nervio lingual y el conducto submandibular (de Wharton) por su superficie medial; y la arteria lingual profunda discurre por su cara profunda. Inervado por el nervio hipogloso (NC XII). Su sección en cirugía de suelo oral puede lesionar estructuras neurovasculares importantes.',
        st:[{l:'Origen',v:'Asta mayor y cuerpo del hioides'},{l:'Acción',v:'Deprime y retrae la lengua'},{l:'Referencia quirúrgica',v:'Relación con NC XII, arteria lingual'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'}]
    },
    estilogloso:{
        n:'Músculo Estilogloso',
        s:'Musculatura Extrínseca — Elevador y Retractor',
        d:'El músculo estilogloso se origina en la apófisis estiloides del hueso temporal y el ligamento estilomandibular, y se inserta en los bordes laterales de la lengua mezclándose con las fibras del hiogloso. Su acción eleva y retrae la lengua, siendo fundamental en la fase oral de la deglución al elevar la lengua contra el paladar para impulsar el bolo hacia la faringe. Inervado por el nervio hipogloso (NC XII). Puede estar ausente o duplicado como variante anatómica. El síndrome de Eagle (osificación del ligamento estilohioideo) puede comprimir estructuras adyacentes a su origen.',
        st:[{l:'Origen',v:'Apófisis estiloides (temporal)'},{l:'Acción',v:'Eleva y retrae la lengua'},{l:'Deglución',v:'Propulsión del bolo oral'},{l:'Inervación',v:'Nervio hipogloso (NC XII)'}]
    },
    palatogloso:{
        n:'Músculo Palatogloso',
        s:'Musculatura Extrínseca — Eleva la Lengua y Cierra el Istmo Oral',
        d:'El músculo palatogloso (músculo del velo palatino) es el único músculo lingual inervado por el nervio vago (NC X) a través del plexo faríngeo, a diferencia de todos los demás que reciben inervación del hipogloso (NC XII). Se origina en la aponeurosis palatina del paladar blando y se inserta en los bordes laterales de la lengua. Su contracción eleva la lengua y aproxima los pilares anteriores del velo del paladar (pliegue palatogloso), cerrando el istmo de las fauces y separando la cavidad oral de la orofaringe. Esta acción es crucial durante la deglución y la producción de fonemas velares.',
        st:[{l:'Origen',v:'Aponeurosis palatina (paladar blando)'},{l:'Acción',v:'Eleva lengua + cierra istmo de fauces'},{l:'Inervación ÚNICA',v:'Nervio vago (NC X) — no hipogloso'},{l:'Función',v:'Separación oral/orofaríngea en deglución'}]
    },
    nervio_lingual:{
        n:'Nervio Lingual (NC V3)',
        s:'Inervación Sensitiva — Tacto y Temperatura (2/3 Anteriores)',
        d:'El nervio lingual es una rama del nervio mandibular (NC V3, tercera división del trigémino) que proporciona sensibilidad somática general (tacto, temperatura, dolor, presión) a los dos tercios anteriores de la lengua, el suelo de la boca y la encía lingual inferior. Desciende medial al músculo pterigoideo lateral, pasa entre el pterigoideo medial y la rama mandibular, y entra en el suelo oral cruzando el conducto de la glándula submandibular (conducto de Wharton) de lateral a medial. En su trayecto recibe la unión de la cuerda del tímpano (NC VII) que aporta las fibras gustativas y parasimpáticas. Es el nervio más frecuentemente lesionado en cirugías del tercer molar inferior.',
        st:[{l:'Origen',v:'Nervio mandibular (NC V3)'},{l:'Territorio',v:'Tacto 2/3 ant. lengua + suelo oral'},{l:'Gusto',v:'No propio (recibe cuerda del tímpano NC VII)'},{l:'Riesgo quirúrgico',v:'Cirugía tercer molar inferior'}]
    },
    cuerda_timpano:{
        n:'Cuerda del Tímpano (NC VII)',
        s:'Inervación Gustativa y Parasimpática — 2/3 Anteriores',
        d:'La cuerda del tímpano es una rama del nervio facial (NC VII) que sale del canalículo de la cuerda del tímpano, atraviesa la cavidad timpánica del oído medio (entre martillo e incus, sin inervación de estas estructuras), sale por la fisura petrotimpánica (fisura de Glaser) y se une al nervio lingual en el espacio masticatorio. Aporta dos tipos de fibras: aferentes especiales viscerales (gustativas) desde los botones gustativos de los dos tercios anteriores de la lengua hacia el núcleo del tracto solitario del tronco encefálico; y eferentes parasimpáticas preganglionares hacia el ganglio submandibular para inervación secretomotora de las glándulas submandibular y sublingual.',
        st:[{l:'Origen',v:'Nervio facial (NC VII)'},{l:'Gusto',v:'2/3 anteriores (via nervio lingual)'},{l:'Parasimpático',v:'Glándulas submandibular + sublingual'},{l:'Trayecto',v:'Atraviesa cavidad timpánica'}]
    },
    glosofaringeo:{
        n:'Nervio Glosofaríngeo (NC IX)',
        s:'Inervación Sensitiva, Gustativa y Motora — Base Lingual y Faringe',
        d:'El nervio glosofaríngeo (NC IX) es un nervio mixto que inerva el tercio posterior de la lengua (base lingual) aportando sensibilidad general (tacto, dolor, temperatura) y gusto (a través de sus ramas linguales hacia las papilas caliciformes y foliadas posteriores). También inerva la faringe, el paladar blando, la amígdala, el seno y cuerpo carotídeo y la caja timpánica (nervio de Jacobson). Sus fibras parasimpáticas posganglionares (ganglio ótico) inervan la glándula parótida. La neuralgia del glosofaríngeo produce dolor lancinante en la base de la lengua y la garganta desencadenado por la deglución o el habla.',
        st:[{l:'Territorio gustativo',v:'1/3 posterior (base + papilas caliciformes)'},{l:'Sensitivo',v:'Base lingual, faringe, amígdala'},{l:'Parasimpático',v:'Glándula parótida (ganglio ótico)'},{l:'Patología',v:'Neuralgia glosofaríngea (dolor deglución)'}]
    },
    hipogloso:{
        n:'Nervio Hipogloso (NC XII)',
        s:'Inervación Motora — Todos los Músculos Linguales (excepto palatogloso)',
        d:'El nervio hipogloso (NC XII) es el nervio motor de la lengua, inervando todos los músculos linguales intrínsecos (longitudinal superior e inferior, transverso, vertical) y extrínsecos (geniogloso, hiogloso, estilogloso) con excepción del palatogloso (NC X). Sale del surco preolivar del bulbo raquídeo, atraviesa el canal hipogloso del hueso occipital y desciende por el cuello lateral a la arteria carótida interna. En el triángulo carotídeo cruza las arterias carótida interna y externa y entra en el suelo oral discurriendo sobre el músculo hiogloso. Su lesión unilateral produce atrofia hemilingual y desviación de la lengua hacia el lado afectado en protrusión.',
        st:[{l:'Sale del encéfalo',v:'Surco preolivar del bulbo'},{l:'Canal óseo',v:'Canal hipogloso (occipital)'},{l:'Músculos inervados',v:'Todos (7/8 músculos linguales)'},{l:'Lesión',v:'Atrofia + desviación ipsilateral'}]
    },
    arteria_lingual:{
        n:'Arteria Lingual',
        s:'Vascularización Arterial — Rama de la Carótida Externa',
        d:'La arteria lingual es la principal arteria nutricia de la lengua, siendo la segunda rama de la arteria carótida externa. Tras su origen en el triángulo carotídeo, forma el triángulo de Pirogov (delimitado por el nervio hipogloso, el tendón del músculo digástrico y el borde posterior del hiogloso) antes de penetrar profunda al músculo hiogloso. Se divide en: arteria sublingual (suelo oral y glándula sublingual), ramas dorsales linguales (dorso y base de la lengua) y arteria lingual profunda (recorre el vientre hasta el ápex). Las venas linguales drenan a la vena yugular interna. La ligadura de la arteria lingual es un paso clave en las glosectomías.',
        st:[{l:'Origen',v:'Carótida externa (2ª rama)'},{l:'Triángulo de Pirogov',v:'Referencia para ligadura quirúrgica'},{l:'Ramas terminales',v:'Sublingual + dorsal + lingual profunda'},{l:'Drenaje venoso',v:'Venas linguales → yugular interna'}]
    }
};

// ===== PANEL BUTTON EVENTS =====
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