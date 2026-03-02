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
setLoad(50,'Cargando modelo dental...');
let model=null;
let meshes=[];

new GLTFLoader().load('nuevadentadura.glb',
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

            // Enamel — esmalte (hardest tissue, translucent)
            const isEnamel=/(enamel|esmalte|crown|corona|incisal|cusp|cuspide)/i.test(combined);
            // Dentin — dentina
            const isDentin=/(dentin|dentina)/i.test(combined);
            // Pulp — pulpa
            const isPulp=/(pulp|pulpa|canal|conduct)/i.test(combined);
            // Cementum — cemento radicular
            const isCementum=/(cement|cemento)/i.test(combined);
            // Gum / gingiva — encía
            const isGingiva=/(gingiv|encia|gum|soft|blando|mucosa|tissue)/i.test(combined);
            // Bone — hueso alveolar / mandibula / maxilar
            const isBone=/(bone|hueso|alveol|mandib|maxil|jaw|cortical)/i.test(combined);
            // Root — raíz
            const isRoot=/(root|raiz|raíz)/i.test(combined);
            // Ligament — ligamento periodontal
            const isLigament=/(ligament|periodont|pdl)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat){
                if(mat.map) pm.map=mat.map;
                if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.4,1.4);}
                if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
                if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;
                if(mat.color) pm.color.copy(mat.color);
            }

            if(isEnamel){
                // Esmalte: altísima dureza, semitransparente, alto clearcoat
                pm.roughness=0.18; pm.metalness=0;
                pm.transmission=0.10; pm.thickness=0.15;
                pm.clearcoat=0.95; pm.clearcoatRoughness=0.08;
                pm.ior=1.62;
                pm.attenuationColor=new THREE.Color(0.96,0.95,0.90);
                pm.attenuationDistance=0.4;
                pm.sheen=0.12; pm.sheenRoughness=0.30;
                pm.sheenColor=new THREE.Color(1.0,1.0,1.0);
                pm.emissive=new THREE.Color(0.04,0.04,0.05); pm.emissiveIntensity=0.06;
                pm.envMapIntensity=0.85;
            } else if(isDentin){
                // Dentina: amarillenta, opaca, ligeramente subsurface
                pm.roughness=0.55; pm.metalness=0;
                pm.sheen=0.22; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.92,0.85,0.65);
                pm.clearcoat=0.08; pm.clearcoatRoughness=0.55;
                pm.thickness=0.5; pm.attenuationColor=new THREE.Color(0.95,0.88,0.70);
                pm.attenuationDistance=0.6;
                pm.emissive=new THREE.Color(0.06,0.05,0.02); pm.emissiveIntensity=0.09;
                pm.envMapIntensity=0.25;
            } else if(isPulp){
                // Pulpa: tejido blando vascularizado, rojizo
                pm.roughness=0.75; pm.metalness=0;
                pm.sheen=0.35; pm.sheenRoughness=0.60;
                pm.sheenColor=new THREE.Color(0.85,0.55,0.55);
                pm.emissive=new THREE.Color(0.12,0.04,0.04); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.15;
            } else if(isCementum){
                // Cemento: parecido al hueso, mate
                pm.roughness=0.78; pm.metalness=0;
                pm.clearcoat=0.05; pm.clearcoatRoughness=0.75;
                pm.emissive=new THREE.Color(0.04,0.04,0.03); pm.emissiveIntensity=0.07;
                pm.envMapIntensity=0.20;
            } else if(isGingiva){
                // Encía: tejido blando rosado, SSS evidente
                pm.roughness=0.62; pm.metalness=0;
                pm.sheen=0.40; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.95,0.72,0.72);
                pm.clearcoat=0.10; pm.clearcoatRoughness=0.55;
                pm.thickness=0.8; pm.attenuationColor=new THREE.Color(0.95,0.75,0.75);
                pm.attenuationDistance=0.9;
                pm.emissive=new THREE.Color(0.10,0.04,0.04); pm.emissiveIntensity=0.12;
                pm.envMapIntensity=0.18;
            } else if(isBone){
                // Hueso alveolar / mandíbula / maxilar
                pm.roughness=0.74; pm.metalness=0;
                pm.clearcoat=0.06; pm.clearcoatRoughness=0.70;
                pm.emissive=new THREE.Color(0.03,0.04,0.05); pm.emissiveIntensity=0.06;
                pm.envMapIntensity=0.22;
            } else if(isRoot){
                // Raíces: cemento + dentina radicular
                pm.roughness=0.68; pm.metalness=0;
                pm.sheen=0.18; pm.sheenRoughness=0.60;
                pm.sheenColor=new THREE.Color(0.88,0.80,0.65);
                pm.emissive=new THREE.Color(0.05,0.04,0.02); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.20;
            } else if(isLigament){
                // Ligamento periodontal: fibras colágenas
                pm.roughness=0.70; pm.metalness=0;
                pm.sheen=0.25; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.80,0.72,0.60);
                pm.emissive=new THREE.Color(0.07,0.06,0.03); pm.emissiveIntensity=0.09;
                pm.envMapIntensity=0.18;
            } else {
                // Default
                pm.roughness=mat&&mat.roughness!=null?mat.roughness:0.55;
                pm.metalness=mat&&mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.12; pm.clearcoatRoughness=0.45;
                pm.sheen=0.18; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.90,0.85,0.78);
                pm.emissive=new THREE.Color(0.04,0.04,0.05); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.40;
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
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que nuevadentadura.glb esté en la misma carpeta.')}
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
        } else if(sel==='incisivos_sup'||sel==='incisivos_inf'){
            mat.emissive.setRGB(0.08,0.08,0.10); mat.emissiveIntensity=0.22;
        } else if(sel==='caninos_sup'||sel==='caninos_inf'){
            mat.emissive.setRGB(0.08,0.08,0.10); mat.emissiveIntensity=0.22;
        } else if(sel==='premolares_sup'||sel==='premolares_inf'){
            mat.emissive.setRGB(0.06,0.07,0.10); mat.emissiveIntensity=0.20;
        } else if(sel==='molares_sup'||sel==='molares_inf'){
            mat.emissive.setRGB(0.05,0.06,0.10); mat.emissiveIntensity=0.20;
        } else if(sel==='terceros_sup'||sel==='terceros_inf'){
            mat.emissive.setRGB(0.04,0.06,0.10); mat.emissiveIntensity=0.18;
        } else if(sel==='esmalte'){
            mat.emissive.setRGB(0.08,0.08,0.10); mat.emissiveIntensity=0.24;
        } else if(sel==='dentina'){
            mat.emissive.setRGB(0.10,0.09,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='pulpa'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='cemento'){
            mat.emissive.setRGB(0.08,0.07,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='encia'){
            mat.emissive.setRGB(0.14,0.04,0.04); mat.emissiveIntensity=0.24;
        } else if(sel==='periodonto'){
            mat.emissive.setRGB(0.10,0.08,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='hueso_alveolar'){
            mat.emissive.setRGB(0.06,0.06,0.08); mat.emissiveIntensity=0.18;
        } else if(sel==='maxilar'){
            mat.emissive.setRGB(0.05,0.06,0.08); mat.emissiveIntensity=0.18;
        } else if(sel==='mandibula'){
            mat.emissive.setRGB(0.05,0.05,0.08); mat.emissiveIntensity=0.18;
        } else if(sel==='raices'){
            mat.emissive.setRGB(0.06,0.08,0.04); mat.emissiveIntensity=0.20;
        } else {
            mat.emissive.setRGB(0.04,0.05,0.08); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{
        n:'Sistema Dental Humano',
        s:'Sistema Estomatognático — Masticación y Oclusión',
        d:'La dentadura humana adulta consta de 32 dientes permanentes (16 superiores en el maxilar y 16 inferiores en la mandíbula), organizados en 4 cuadrantes. Cada diente es una unidad anatómica compuesta por esmalte, dentina, pulpa y cemento, sostenida por el aparato periodontal (encía, ligamento periodontal, cemento y hueso alveolar). El sistema dental participa en la masticación, deglución, fonación y estética facial.',
        st:[{l:'Dientes permanentes',v:'32 (16 + 16)'},{l:'Dureza esmalte',v:'5 Mohs (más duro del cuerpo)'},{l:'Tipos dentales',v:'4 (inc, can, pre, mol)'},{l:'Fuerza masticación',v:'~700 N (molares)'}]
    },
    incisivos_sup:{
        n:'Incisivos Superiores',
        s:'Arco Superior — Dientes Anteriores de Corte',
        d:'Los incisivos superiores son 4 dientes (2 centrales y 2 laterales) ubicados en la línea media del arco maxilar. Sus coronas tienen forma de pala con borde incisal recto diseñado para cortar y fragmentar los alimentos. Los incisivos centrales superiores (dientes 11 y 21 en notación FDI) son los más grandes de este grupo (~10.5 mm de corona). Poseen una sola raíz cónica. Son fundamentales para la estética dental, la guía anterior durante los movimientos de protrusión mandibular y la fonética de los sonidos labiodentales.',
        st:[{l:'Número',v:'4 (2 centrales + 2 laterales)'},{l:'Longitud corona',v:'~10.5 mm (central)'},{l:'Raíces',v:'1 raíz cónica'},{l:'Función',v:'Corte y estética'}]
    },
    caninos_sup:{
        n:'Caninos Superiores',
        s:'Arco Superior — Dientes de Desgarro y Guía',
        d:'Los caninos superiores (dientes 13 y 23) son los dientes más robustos del arco superior, con la raíz más larga de toda la dentición (~17 mm). Su corona presenta una cúspide prominente que ejerce función de desgarro. Actúan como "cornisas" del arco dental y son responsables de la guía canina en los movimientos de lateralidad mandibular, protegiendo los dientes posteriores del estrés lateral. Su posición en el arco es estratégica para el soporte labial y la estética del tercio medio facial. Son los últimos dientes permanentes en erupcionar (~11-13 años), razón por la que se denominan "dientes del ojo".',
        st:[{l:'Número',v:'2 (uno por cuadrante)'},{l:'Raíz',v:'~17 mm (la más larga)'},{l:'Función',v:'Desgarro + guía canina'},{l:'Erupción',v:'11-13 años'}]
    },
    premolares_sup:{
        n:'Premolares Superiores',
        s:'Arco Superior — Dientes de Transición',
        d:'Los premolares superiores (4 en total: 1eros y 2dos premolares) constituyen la zona de transición entre los dientes anteriores y posteriores. Los primeros premolares superiores (14 y 24) son únicos por presentar casi siempre dos raíces (vestibular y palatina), siendo los únicos premolares birradiculares. Sus dos cúspides (vestibular y palatina) los diferencian morfológicamente de los incisivos y los convierten en dientes trituradores. Sirven de soporte al ángulo de la boca y participan en la guía de grupo durante los movimientos de lateralidad.',
        st:[{l:'Número',v:'4 (2 primeros + 2 segundos)'},{l:'Cúspides',v:'2 (vestibular y palatina)'},{l:'Raíces (1er PM)',v:'Generalmente 2 (birradicular)'},{l:'Función',v:'Trituración y soporte labial'}]
    },
    molares_sup:{
        n:'Molares Superiores',
        s:'Arco Superior — Dientes de Trituración Principal',
        d:'Los primeros y segundos molares superiores (16, 26, 17, 27) son los dientes más grandes del arco superior y los principales responsables de la trituración de los alimentos. Los primeros molares superiores presentan clásicamente 4 cúspides principales y una 5ª cúspide accesoria (cúspide de Carabelli). Poseen tres raíces: dos vestibulares (mesiovestibular y distovestibular) y una palatina. El primer molar permanente superior erupciona alrededor de los 6 años y es el diente más frecuentemente afectado por caries en la infancia.',
        st:[{l:'Número',v:'4 (primeros y segundos)'},{l:'Cúspides',v:'4 + cúspide de Carabelli'},{l:'Raíces',v:'3 (2 vestibulares + 1 palatina)'},{l:'Erupción 1er molar',v:'~6 años'}]
    },
    terceros_sup:{
        n:'Terceros Molares Superiores',
        s:'Arco Superior — Cordales / Muelas del Juicio',
        d:'Los terceros molares superiores (18 y 28), conocidos popularmente como "muelas del juicio", son los últimos dientes en erupcionar (17-25 años) y los de mayor variabilidad morfológica. Con frecuencia presentan impactación (retención dentro del hueso) por falta de espacio en el arco. Su anatomía radicular es muy variable (1 a 5 raíces, frecuentemente fusionadas). Anatómicamente, sus raíces tienen relación con el seno maxilar, lo que puede complicar su extracción. Aproximadamente el 25% de la población no desarrolla alguno de estos dientes (agenesia de terceros molares).',
        st:[{l:'Número',v:'2 (uno por cuadrante)'},{l:'Erupción',v:'17-25 años'},{l:'Impactación',v:'Muy frecuente'},{l:'Raíces',v:'Variable (1-5, fusionadas)'}]
    },
    incisivos_inf:{
        n:'Incisivos Inferiores',
        s:'Arco Inferior — Dientes Anteriores de Corte',
        d:'Los incisivos inferiores (31, 32, 41, 42) son los dientes más pequeños de toda la dentición permanente. Sus coronas son estrechas con borde incisal fino, optimizados para el corte preciso. A diferencia de los superiores, la mayoría posee dos canales radiculares (uno vestibular y uno lingual) en una sola raíz. Articulan con los incisivos superiores en una relación de sobremordida vertical (overbite) y horizontal (overjet) que es fundamental para la función y la estética. Son los primeros dientes permanentes en erupcionar en la arcada inferior (~6-7 años).',
        st:[{l:'Número',v:'4 (2 centrales + 2 laterales)'},{l:'Tamaño',v:'Más pequeños de la dentición'},{l:'Canales radiculares',v:'Frecuente: 2 en 1 raíz'},{l:'Erupción',v:'~6-7 años'}]
    },
    caninos_inf:{
        n:'Caninos Inferiores',
        s:'Arco Inferior — Dientes de Desgarro y Guía',
        d:'Los caninos inferiores (33 y 43) son ligeramente más pequeños que sus homólogos superiores pero igualmente importantes para la estética y la función. Poseen la raíz más larga de la dentición inferior (~16 mm). Participan en la guía canina junto con los superiores. Su erupción temprana (~9-10 años) hace que frecuentemente guíen el desarrollo del arco. En la clasificación de Angle, la relación entre caninos superiores e inferiores define la clase canina de la oclusión, que es independiente pero relacionada con la clase molar.',
        st:[{l:'Número',v:'2 (uno por cuadrante)'},{l:'Raíz',v:'~16 mm'},{l:'Guía canina',v:'Con canino superior'},{l:'Erupción',v:'~9-10 años'}]
    },
    premolares_inf:{
        n:'Premolares Inferiores',
        s:'Arco Inferior — Dientes de Transición',
        d:'Los premolares inferiores (34, 35, 44, 45) difieren morfológicamente de los superiores: casi todos son monoradiculares (una sola raíz). El primer premolar inferior se parece morfológicamente más a un canino (con cúspide vestibular dominante), mientras que el segundo premolar inferior puede presentar morfología bicuspídea o tricuspídea. El nervio mentonianos (rama del nervio alveolar inferior, NC V3) emerge entre los ápices del 1er y 2do premolar inferior, dato importante en cirugía y anestesia dental.',
        st:[{l:'Número',v:'4 (primeros y segundos)'},{l:'Raíces',v:'Generalmente 1 (monoradicular)'},{l:'1er PM inf',v:'Morfología similar al canino'},{l:'Relación nervio',v:'Nervio mentoniano (NC V3)'}]
    },
    molares_inf:{
        n:'Molares Inferiores',
        s:'Arco Inferior — Mayor Superficie Masticatoria',
        d:'Los molares inferiores (36, 37, 46, 47) son los dientes más grandes de la arcada mandibular, con superficies oclusales amplias para la trituración eficaz. El primer molar inferior presenta típicamente 5 cúspides (3 vestibulares y 2 linguales) y 2 raíces (mesial y distal), siendo la raíz mesial frecuentemente bicanalicular. El conducto del nervio alveolar inferior discurre en íntima relación con los ápices de los molares inferiores, especialmente el segundo y tercer molar, aspecto crítico en cirugía.',
        st:[{l:'Número',v:'4 (primeros y segundos)'},{l:'Cúspides 1er molar',v:'5 (3 vest + 2 ling)'},{l:'Raíces',v:'2 (mesial frecuentemente 2 canales)'},{l:'Relación',v:'Nervio alveolar inferior'}]
    },
    terceros_inf:{
        n:'Terceros Molares Inferiores',
        s:'Arco Inferior — Cordales con Alta Tasa de Impactación',
        d:'Los terceros molares inferiores (38 y 48) presentan la mayor tasa de impactación de toda la dentición, frecuentemente en posición mesioangular (clasificación de Winter). Su extracción es el procedimiento quirúrgico oral más frecuente. Tienen estrecha relación anatómica con el nervio alveolar inferior (paquete vasculonervioso que discurre por el canal mandibular), pudiendo provocar parestesias transitorias o permanentes post-extracción. La clasificación de Pell-Gregory evalúa su posición respecto a la rama mandibular para planificar la cirugía.',
        st:[{l:'Impactación',v:'Más frecuente (mesioangular)'},{l:'Relación crítica',v:'Nervio alveolar inferior'},{l:'Clasificación quirúrgica',v:'Pell-Gregory / Winter'},{l:'Riesgo',v:'Parestesia del labio inf.'}]
    },
    esmalte:{
        n:'Esmalte Dental',
        s:'Tejido Mineralizado — Capa Protectora de la Corona',
        d:'El esmalte es el tejido más duro del cuerpo humano (5 en la escala de Mohs), compuesto por un 96% de mineral (hidroxiapatita cálcica, Ca₁₀(PO₄)₆(OH)₂) en prismas o varillas de esmalte, un 1% de proteínas (amelogeninas, enamelinas) y un 3% de agua. Es producido por los ameloblastos durante la amelogénesis (proceso irreversible: sin ameloblastos en el diente erupcionado, no hay regeneración). Varía en grosor: máximo en las cúspides (~2.5 mm en molares) y mínimo en el cuello cervical. Su semitransparencia permite que el color de la dentina subyacente influya en el tono del diente.',
        st:[{l:'Dureza',v:'5 Mohs (96% hidroxiapatita)'},{l:'Grosor máximo',v:'~2.5 mm (cúspides molares)'},{l:'Célula formadora',v:'Ameloblasto (no regenera)'},{l:'Mineralización',v:'Mayor que hueso cortical'}]
    },
    dentina:{
        n:'Dentina',
        s:'Tejido Mineralizado — Núcleo del Diente',
        d:'La dentina constituye la mayor parte del volumen dentario (~70% mineral, 20% colágeno tipo I, 10% agua). Está atravesada por túbulos dentinarios (~2.5 µm de diámetro, ~45,000/mm² cerca de la pulpa) que contienen las prolongaciones odontoblásticas y fluido dentinario. Esta estructura tubular explica la sensibilidad dentinaria ante estímulos osmóticos, térmicos o táctiles (teoría hidrodinámica de Brannstrom). Los odontoblastos que la producen permanecen vitales en la pulpa durante toda la vida del diente, permitiendo la formación de dentina secundaria (fisiológica) y dentina terciaria o reparativa (respuesta al daño).',
        st:[{l:'Composición mineral',v:'~70% hidroxiapatita'},{l:'Túbulos dentinarios',v:'~45,000/mm² (cerca pulpa)'},{l:'Sensibilidad',v:'Teoría hidrodinámica (Brannstrom)'},{l:'Células formadoras',v:'Odontoblastos (persisten en pulpa)'}]
    },
    pulpa:{
        n:'Pulpa Dental',
        s:'Tejido Blando — Centro Vital del Diente',
        d:'La pulpa dental es el tejido conjuntivo blando alojado en la cavidad pulpar (cámara pulpar en la corona y conductos radiculares en la raíz). Contiene odontoblastos (en la periferia, formadores de dentina), fibroblastos, células inmunitarias, vasos sanguíneos (arteriola pulpar terminal) y fibras nerviosas mielínicas (A-delta, dolor agudo) y amielínicas (C, dolor sordo). Tiene cuatro funciones: formativa (dentinogénesis), nutritiva (dentina avascular), defensiva (reacción inflamatoria) y sensitiva (dolor). Su irrigación terminal explica la vulnerabilidad ante infecciones (pulpitis → necrosis).',
        st:[{l:'Contenido',v:'Vasos, nervios, odontoblastos'},{l:'Fibras nerviosas',v:'A-delta (agudo) + C (sordo)'},{l:'Irrigación',v:'Terminal (sin anastomosis)'},{l:'Tratamiento infección',v:'Endodoncia (conductos)'}]
    },
    cemento:{
        n:'Cemento Radicular',
        s:'Tejido Mineralizado — Anclaje de la Raíz',
        d:'El cemento es un tejido mineralizado (~50% mineral, 50% orgánico + agua) que recubre la dentina radicular y ancla las fibras de Sharpey del ligamento periodontal. Morfológicamente se divide en cemento acelular (extrínseco, zona cervical, con fibras de Sharpey bien organizadas) y cemento celular (intrínseco, zona apical, con cementocitos atrapados). A diferencia del esmalte, el cemento puede regenerarse y tiene actividad metabólica. La unión amelocementaria (línea cervical o CEJ) es la zona de transición entre corona y raíz, con gran importancia clínica en periodoncia.',
        st:[{l:'Mineralización',v:'~50% (menos que esmalte)'},{l:'Tipos',v:'Acelular (cervical) + Celular (apical)'},{l:'Función',v:'Anclaje fibras Sharpey del periodonto'},{l:'CEJ',v:'Unión amelocementaria'}]
    },
    encia:{
        n:'Encía (Gingiva)',
        s:'Tejido Blando Periodontal — Barrera Protectora',
        d:'La encía es la mucosa masticatoria que rodea los dientes y cubre el proceso alveolar. Anatómicamente se divide en encía libre (forma el surco gingival, 1-3 mm de profundidad normal), encía adherida (firme, con textura de cáscara de naranja "punteado gingival") y encía interdental (papilas, de forma piramidal en dientes anteriores y de cresta en posteriores). El epitelio del surco gingival es no queratinizado y muy permeable — es la principal vía de entrada de bacterias periodontales. La profundidad de sondaje periodontal ≥4 mm indica pérdida de inserción.',
        st:[{l:'Surco gingival normal',v:'1-3 mm'},{l:'Encía adherida',v:'Firmemente unida al periostio'},{l:'Sangrado al sondaje',v:'Signo de inflamación activa'},{l:'Gingivitis vs periodontitis',v:'Reversible vs pérdida ósea'}]
    },
    periodonto:{
        n:'Ligamento Periodontal',
        s:'Tejido de Soporte — Suspensión del Diente',
        d:'El ligamento periodontal (PDL) es el tejido conjuntivo fibroso que une el cemento radicular al hueso alveolar, con un grosor de 0.15-0.38 mm. Está compuesto principalmente por haces de fibras de colágeno tipo I (fibras de Sharpey) organizadas en grupos funcionales (fibras crestales, horizontales, oblicuas, apicales e interradiculares). Las fibras oblicuas son las más abundantes y absorben las fuerzas masticatorias verticales convirtiéndolas en fuerzas de tracción sobre el hueso. Contiene mecanorreceptores que proporcionan propriocepción, fundamental para el control de la fuerza masticatoria.',
        st:[{l:'Grosor',v:'0.15-0.38 mm'},{l:'Fibras dominantes',v:'Oblicuas (fuerzas masticatorias)'},{l:'Composición',v:'Colágeno tipo I (fibras Sharpey)'},{l:'Función sensitiva',v:'Propriocepción masticatoria'}]
    },
    hueso_alveolar:{
        n:'Hueso Alveolar',
        s:'Tejido de Soporte — Alvéolo Dentario',
        d:'El hueso alveolar es la parte del maxilar y la mandíbula que forma y sostiene los alvéolos dentarios. Consta de la cortical alveolar (lámina dura o cribrosa, hueso fasciculado con inserción de fibras Sharpey), el hueso esponjoso (trabeculado, entre la lámina dura y la cortical externa) y la cortical externa. Es el tejido periodontal con mayor remodelación, respondiendo constantemente a las fuerzas mecánicas (ley de Wolff) y a los factores inflamatorios. Su pérdida es el signo radiológico definitorio de la periodontitis crónica, visible como descenso de la cresta alveolar interproximal.',
        st:[{l:'Lámina dura',v:'Cortical alveolar (Rx: radio-opaca)'},{l:'Remodelación',v:'Continua (ley de Wolff)'},{l:'Pérdida ósea',v:'Signo diagnóstico de periodontitis'},{l:'Regeneración',v:'Técnicas de ROG (membrana + injerto)'}]
    },
    maxilar:{
        n:'Maxilar Superior',
        s:'Hueso Facial — Base del Arco Dentario Superior',
        d:'El maxilar es un hueso par que forma el tercio medio de la cara, contiene el arco dentario superior y constituye el piso de la órbita y parte del piso nasal. Está íntimamente relacionado con el seno maxilar (antro de Highmore), cuyas raíces de los molares y premolares superiores pueden proyectarse en su interior, complicando extracciones y aumentando el riesgo de comunicación oroantral. La sutura palatina media divide el paladar duro (proceso palatino del maxilar y lámina horizontal del palatino). Presenta una estructura esponjosa con trabeculado fino, lo que facilita la integración de implantes óseos.',
        st:[{l:'Función dental',v:'Soporte arco superior (16 dientes)'},{l:'Relación con senos',v:'Seno maxilar (raíces 14-17)'},{l:'Hueso',v:'Esponjoso + fino trabeculado'},{l:'Irrigación',v:'Arteria alveolar superior post./ant.'}]
    },
    mandibula:{
        n:'Mandíbula',
        s:'Hueso Móvil — Base del Arco Dentario Inferior',
        d:'La mandíbula es el único hueso móvil del cráneo, articulándose con el temporal mediante la articulación temporomandibular (ATM), una articulación bicondílea con disco articular interpuesto. Contiene el canal mandibular (conducto del nervio alveolar inferior), que discurre desde la espina de Spix hasta el agujero mentoniano (entre premolares). El cuerpo mandibular es denso (hueso cortical), lo que dificulta la anestesia por infiltración directa y requiere técnicas de bloqueo troncular. El reborde alveolar mandibular es el soporte del arco dentario inferior, y su reabsorción post-extracción condiciona el éxito de las prótesis.',
        st:[{l:'Articulación',v:'ATM (bicondílea + disco)'},{l:'Canal mandibular',v:'Nervio alveolar inferior (NC V3)'},{l:'Agujero mentoniano',v:'Entre 34-35 / 44-45'},{l:'Densidad ósea',v:'Mayor que maxilar (D1-D2)'}]
    },
    raices:{
        n:'Raíces Dentales',
        s:'Anclaje Radicular — Soporte Funcional del Diente',
        d:'Las raíces dentales son las porciones del diente embebidas en el hueso alveolar, recubiertas por cemento y unidas al hueso mediante el ligamento periodontal. Su morfología varía según el grupo dentario: incisivos y caninos suelen ser monoradiculares; premolares pueden ser mono o birradiculares; molares superiores tienen 3 raíces y molares inferiores 2. El ápice radicular alberga el foramen apical, por donde entran y salen los vasos y nervios del paquete vasculonervioso pulpar. La longitud radicular promedio varía entre 11 mm (incisivos inf.) y 17 mm (caninos). La relación corona-raíz es determinante para la biomecánica periodontal.',
        st:[{l:'Longitud promedio',v:'11-17 mm según diente'},{l:'Foramen apical',v:'Entrada de paquete vasculonervioso'},{l:'Cobertura',v:'Cemento radicular'},{l:'Relación corona-raíz ideal',v:'≥1:1 (mejor 1:2)'}]
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
