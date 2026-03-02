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
scene.add(new THREE.HemisphereLight(0xffd8c8, 0xaabbcc, 1.10));

const keyLight=new THREE.DirectionalLight(0xffffff, 3.8);
keyLight.position.set(3, 5, 4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xeec8b8, 1.4);
fillLight.position.set(-5, 3, -2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffffff, 1.6);
rimLight.position.set(-2, -1, -5); scene.add(rimLight);

// SSS deep red light for kidney parenchyma translucency
const sssLight=new THREE.PointLight(0xff5533, 0.60, 8);
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
    c+=vec3(.65,.15,.10)*sss*sm*.06;
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
setLoad(50,'Cargando modelo renal...');
let model=null;
let meshes=[];

new GLTFLoader().load('rinon.glb',
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
            const combined=(child.name||'').toLowerCase()+' '+(mat.name||'').toLowerCase();

            const isCortex=/(cortex|corteza|cortic|glomerul|nephron|nefrona|tubul)/i.test(combined);
            const isMedulla=/(medul|pyramid|piramid|papil|loop|henle|collect)/i.test(combined);
            const isCollecting=/(pelvi|calic|calyx|ureter|collect|seno)/i.test(combined);
            const isVessel=/(arteri|vein|vena|vessel|blood|renal art|renal vein|capillar)/i.test(combined);
            const isCapsule=/(capsul|fibro|surface|cortex outer)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat.map) pm.map=mat.map;
            if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.6,1.6);}
            if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
            if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;

            if(isCortex){
                pm.roughness=mat.roughness!=null?Math.min(mat.roughness,0.58):0.48;
                pm.metalness=0.0;
                pm.clearcoat=0.28; pm.clearcoatRoughness=0.38;
                pm.sheen=0.30; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.85,0.38,0.28);
                pm.thickness=1.0;
                pm.attenuationColor=new THREE.Color(0.70,0.18,0.12);
                pm.attenuationDistance=1.3;
                pm.emissive=new THREE.Color(0.07,0.02,0.01); pm.emissiveIntensity=0.11;
                pm.envMapIntensity=0.42;
            } else if(isMedulla){
                pm.roughness=0.55; pm.metalness=0;
                pm.clearcoat=0.18; pm.clearcoatRoughness=0.45;
                pm.sheen=0.22; pm.sheenRoughness=0.60;
                pm.sheenColor=new THREE.Color(0.75,0.30,0.22);
                pm.thickness=0.8;
                pm.attenuationColor=new THREE.Color(0.65,0.15,0.10);
                pm.attenuationDistance=1.0;
                pm.emissive=new THREE.Color(0.06,0.01,0.01); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.35;
            } else if(isCollecting){
                pm.roughness=0.42; pm.metalness=0;
                pm.clearcoat=0.52; pm.clearcoatRoughness=0.22;
                pm.sheen=0.18; pm.sheenRoughness=0.42;
                pm.sheenColor=new THREE.Color(0.55,0.70,0.85);
                pm.emissive=new THREE.Color(0.02,0.04,0.08); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.50;
            } else if(isVessel){
                pm.roughness=0.36; pm.metalness=0;
                pm.clearcoat=0.55; pm.clearcoatRoughness=0.18;
                pm.sheen=0.15; pm.sheenRoughness=0.38;
                pm.sheenColor=new THREE.Color(0.85,0.28,0.28);
                pm.emissive=new THREE.Color(0.14,0.02,0.02); pm.emissiveIntensity=0.15;
                pm.envMapIntensity=0.58;
            } else if(isCapsule){
                pm.roughness=0.48; pm.metalness=0;
                pm.clearcoat=0.42; pm.clearcoatRoughness=0.32;
                pm.emissive=new THREE.Color(0.04,0.01,0.01); pm.emissiveIntensity=0.07;
                pm.envMapIntensity=0.30;
            } else {
                pm.roughness=mat.roughness!=null?mat.roughness:0.55;
                pm.metalness=mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.18; pm.clearcoatRoughness=0.45;
                pm.sheen=0.18; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.80,0.50,0.38);
                pm.emissive=new THREE.Color(0.05,0.02,0.01); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.38;
            }

            if(mat.color) pm.color.copy(mat.color);
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
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que rinon.glb esté en la misma carpeta.')}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS'; fc=0; lt=t;}
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
            mat.emissive.setRGB(0.05,0.02,0.01); mat.emissiveIntensity=0.08;
        } else if(sel==='corteza'){
            mat.emissive.setRGB(0.20,0.06,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='medula'){
            mat.emissive.setRGB(0.16,0.04,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='piramides'){
            mat.emissive.setRGB(0.14,0.04,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='columnas_bertin'){
            mat.emissive.setRGB(0.18,0.06,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='papila'){
            mat.emissive.setRGB(0.12,0.04,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='seno_renal'){
            mat.emissive.setRGB(0.10,0.06,0.04); mat.emissiveIntensity=0.16;
        } else if(sel==='calices_menores'||sel==='calices_mayores'){
            mat.emissive.setRGB(0.03,0.06,0.18); mat.emissiveIntensity=0.22;
        } else if(sel==='pelvis_renal'){
            mat.emissive.setRGB(0.02,0.05,0.20); mat.emissiveIntensity=0.24;
        } else if(sel==='ureter'){
            mat.emissive.setRGB(0.02,0.04,0.16); mat.emissiveIntensity=0.20;
        } else if(sel==='glomerulo'){
            mat.emissive.setRGB(0.22,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='capsula_bowman'){
            mat.emissive.setRGB(0.18,0.06,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='tubulo_proximal'){
            mat.emissive.setRGB(0.16,0.08,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='asa_henle'){
            mat.emissive.setRGB(0.14,0.06,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='tubulo_distal'){
            mat.emissive.setRGB(0.12,0.06,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='arteria_renal'){
            mat.emissive.setRGB(0.22,0.03,0.03); mat.emissiveIntensity=0.26;
        } else if(sel==='vena_renal'){
            mat.emissive.setRGB(0.02,0.04,0.22); mat.emissiveIntensity=0.26;
        } else if(sel==='capilares'){
            mat.emissive.setRGB(0.18,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='capsula_fibrosa'){
            mat.emissive.setRGB(0.06,0.05,0.06); mat.emissiveIntensity=0.14;
        } else if(sel==='inervacion_r'){
            mat.emissive.setRGB(0.06,0.14,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='sistema_renina'){
            mat.emissive.setRGB(0.16,0.12,0.02); mat.emissiveIntensity=0.20;
        } else {
            mat.emissive.setRGB(0.05,0.02,0.01); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{n:'Riñón Humano',s:'Sistema Urinario — Órgano de Filtración y Homeostasis',
        d:'El riñón es un órgano par retroperitoneal con forma de judía (~11×6×3 cm, 120-170 g). Filtra ~180 L de plasma al día produciendo 1-2 L de orina. Regula el equilibrio hidro-electrolítico, el pH sanguíneo, la presión arterial (SRAA), y produce eritropoyetina y calcitriol. Cada riñón contiene ~1 millón de nefronas, la unidad funcional de filtración.',
        st:[{l:'Filtración/día',v:'~180 L plasma'},{l:'Orina/día',v:'1–2 L'},{l:'Nefronas',v:'~1 millón c/u'},{l:'Flujo sanguíneo',v:'~1.2 L/min'}]},

    corteza:{n:'Corteza Renal',s:'Zona Externa — Sede de los Glomérulos',
        d:'La corteza renal es la capa periférica del riñón (~1 cm de espesor), de color pardo rojizo y aspecto granular. Contiene los corpúsculos renales (glomérulos + cápsula de Bowman), los túbulos contorneados proximales y distales, y el inicio del asa de Henle. Representa aproximadamente el 70% de la masa renal. Es la región con mayor consumo de oxígeno del cuerpo por unidad de peso, debido a la intensa actividad de transporte activo de los túbulos.',
        st:[{l:'Espesor',v:'~1 cm'},{l:'Contiene',v:'Glomérulos + TCP + TCD'},{l:'Masa',v:'~70% del riñón'},{l:'O₂/peso',v:'Mayor consumo del organismo'}]},

    medula:{n:'Médula Renal',s:'Zona Interna — Gradiente Osmótico',
        d:'La médula renal está formada por las pirámides de Malpighi (8-18 por riñón) y las columnas de Bertín entre ellas. Contiene las asas de Henle, los túbulos colectores y los conductos papilares de Bellini. Establece el gradiente osmótico cortico-medular (300-1200 mOsm/L de corteza a papila) gracias al mecanismo de contracorriente multiplicador, esencial para la concentración de la orina. La médula externa e interna tienen funciones distintas en la reabsorción de NaCl y urea.',
        st:[{l:'Pirámides',v:'8-18 por riñón'},{l:'Osmolaridad',v:'300-1200 mOsm/L (gradiente)'},{l:'Contiene',v:'Asa de Henle + col. Bellini'},{l:'Mecanismo',v:'Contracorriente multiplicador'}]},

    piramides:{n:'Pirámides de Malpighi',s:'Unidades Cónicas de la Médula',
        d:'Las pirámides de Malpighi son estructuras cónicas de tejido medular con la base orientada hacia la corteza y el vértice (papila) hacia el seno renal. Cada pirámide junto con la corteza suprayacente forma un lóbulo renal. Contienen las ramas descendente y ascendente gruesa del asa de Henle, los túbulos colectores cortical y medular, y los conductos papilares de Bellini que desembocan en la papila. Las estrías radiadas de Ferrein son prolongaciones corticales de la pirámide.',
        st:[{l:'Número',v:'8-18 por riñón'},{l:'Vértice',v:'Papila → cáliz menor'},{l:'Base',v:'Orientada a corteza'},{l:'Unidad',v:'1 pirámide = 1 lóbulo renal'}]},

    columnas_bertin:{n:'Columnas de Bertín',s:'Extensiones Corticales entre Pirámides',
        d:'Las columnas de Bertín son prolongaciones de tejido cortical que penetran entre las pirámides medulares, separándolas. Contienen vasos interlobares (ramas de las arterias renales que ascienden hacia la corteza). Histológicamente son idénticas a la corteza renal y contienen corpúsculos renales y túbulos. Radiológicamente pueden confundirse con masas renales (pseudotumor de columna de Bertín), especialmente cuando son hipertróficas, siendo una variante anatómica normal importante de reconocer.',
        st:[{l:'Composición',v:'Tejido cortical'},{l:'Contienen',v:'Arterias interlobares'},{l:'Función',v:'Separar pirámides'},{l:'Dx diferencial',v:'Pseudotumor de Bertín'}]},

    papila:{n:'Papila Renal',s:'Vértice de la Pirámide — Desembocadura Final',
        d:'La papila renal es el vértice de cada pirámide medular, donde desembocan los conductos papilares de Bellini (~20 orificios visibles en el area cribosa). La orina final fluye desde los conductos de Bellini hacia los cálices menores. Algunas pirámides fusionan sus papilas formando papilas compuestas — estas son propensas a reflujo intrarrenal y cicatrización. La necrosis papilar (isquemia de la papila) ocurre en diabetes, anemia falciforme, obstrucción y AINES crónicos.',
        st:[{l:'Orificios',v:'~20 (area cribosa)'},{l:'Drena en',v:'Cáliz menor'},{l:'Papilas compuestas',v:'Riesgo reflujo intrarrenal'},{l:'Necrosis papilar',v:'DM, anemia falciforme, AINES'}]},

    seno_renal:{n:'Seno Renal',s:'Espacio Central — Contenedor del Sistema Colector',
        d:'El seno renal es el espacio central excavado en el hilio del riñón, cubierto por una continuación de la cápsula fibrosa. Contiene la pelvis renal, los cálices mayores y menores, las ramas de la arteria y vena renal, los vasos linfáticos, los nervios y tejido adiposo peripélvico. El tejido graso del seno renal (grasa sinsusal) protege las estructuras vasculares y el sistema colector. En la tomografía, la infiltración del seno graso por un tumor renal indica estadio pT3a.',
        st:[{l:'Contenido',v:'Pelvis + cálices + vasos'},{l:'Tejido',v:'Grasa sinusal (protectora)'},{l:'Estadificación',v:'Invasión = pT3a'},{l:'Hilio',v:'Entrada/salida estructuras'}]},

    calices_menores:{n:'Cálices Menores',s:'Receptáculos de la Orina Papilar',
        d:'Los cálices menores son estructuras tubulares en forma de copa (8-18 por riñón) que rodean cada papila renal y recogen la orina vertida por los conductos de Bellini. El cuello del cáliz menor (infundíbulo) drena hacia un cáliz mayor. Están revestidos por urotelio (epitelio transicional). El reflujo vesicoureteral (RVU) puede causar reflujo intrarrenal en las papilas compuestas → cicatrices corticales (nefropatía por reflujo). La litasis en los cálices menores es frecuente.',
        st:[{l:'Número',v:'8-18 por riñón'},{l:'Rodean',v:'1 papila c/u'},{l:'Epitelio',v:'Urotelio (transicional)'},{l:'Patología',v:'Litiasis + nefropatía por RVU'}]},

    calices_mayores:{n:'Cálices Mayores',s:'Confluencia de Cálices Menores',
        d:'Los cálices mayores (2-4 por riñón: superior, medio e inferior) resultan de la confluencia de varios cálices menores. Drenan hacia la pelvis renal. Su anatomía es variable: en el sistema duplicado (duplicación pieloureteral), coexisten dos sistemas colectores separados (el polo superior frecuentemente presenta reflujo y el inferior obstrucción). La obstrucción de un cáliz mayor (por un cálculo o estenosis infundibulopélvica) puede causar pionefrosis si se sobreinfecta.',
        st:[{l:'Número',v:'2-4 (sup, med, inf)'},{l:'Drenan en',v:'Pelvis renal'},{l:'Variante',v:'Sistema duplicado'},{l:'Obstrucción',v:'→ Pionefrosis si infectado'}]},

    pelvis_renal:{n:'Pelvis Renal',s:'Reservorio Central — Unión Pieloureteral',
        d:'La pelvis renal es la estructura cónica aplanada, situada en el seno renal, que recoge la orina de los cálices mayores. Puede ser intrarrenal (dentro del parénquima) o extrarrenal (prominente fuera del riñón — variante normal frecuente). Su capacidad normal es de 3-10 mL. Se estrecha en la unión pieloureteral (UPU), punto frecuente de obstrucción (síndrome de la UPU — la causa más frecuente de hidronefrosis en niños). Está revestida por urotelio, origen del carcinoma urotelial de pelvis renal.',
        st:[{l:'Capacidad',v:'3-10 mL'},{l:'Tipos',v:'Intra o extrarrenal'},{l:'Punto crítico',v:'UPU (obstrucción frecuente)'},{l:'Epitelio',v:'Urotelio → carcinoma urotelial'}]},

    ureter:{n:'Uréter',s:'Conducto de Transporte — Pelvis a Vejiga',
        d:'El uréter es un conducto muscular de 25-30 cm que transporta la orina desde la pelvis renal hasta la vejiga mediante ondas peristálticas. Presenta tres estrechamientos fisiológicos donde los cálculos frecuentemente se impactan: unión pieloureteral (UPU), cruce con los vasos ilíacos, y unión ureterovesical (UUV). Discurre en el retroperitoneo, cruza por delante de los vasos ilíacos y pasa por detrás del deferente en el hombre ("el uréter pasa por encima del deferente") o por delante de la arteria uterina en la mujer ("agua bajo el puente").',
        st:[{l:'Longitud',v:'25-30 cm'},{l:'Estrechamientos',v:'UPU + ilíacos + UUV'},{l:'Mnemotecnia',v:'"Agua bajo el puente" (mujer)'},{l:'Peristalsis',v:'Transporte activo de orina'}]},

    glomerulo:{n:'Glomérulo',s:'Unidad de Filtración — Barrera de Filtración Glomerular',
        d:'El glomérulo es un ovillo de capilares fenestrados (con poros de 70-100 nm) rodeado por la cápsula de Bowman. La barrera de filtración glomerular (BFG) tiene tres capas: endotelio fenestrado (impide paso de células), membrana basal glomerular (carga negativa, impide albúmina) y podocitos con sus procesos pedicelos (filtros de tamaño). La tasa de filtración glomerular (TFG) normal es 90-120 mL/min. La enfermedad glomerular (glomerulonefritis) afecta selectivamente la BFG, causando proteinuria o hematuria.',
        st:[{l:'Fenestras',v:'70-100 nm'},{l:'TFG normal',v:'90-120 mL/min'},{l:'Barrera',v:'Endotelio + MBG + podocitos'},{l:'Carga',v:'MBG electronegativa (anti-albúmina)'}]},

    capsula_bowman:{n:'Cápsula de Bowman',s:'Envoltura del Glomérulo — Inicio del Túbulo',
        d:'La cápsula de Bowman es la estructura de doble pared que rodea el glomérulo, formando el corpúsculo renal (= glomérulo + cápsula). La hoja visceral está formada por los podocitos, adheridos directamente a los capilares glomerulares. La hoja parietal es el epitelio plano que continúa con el túbulo contorneado proximal en el polo urinario. El espacio entre ambas hojas (espacio de Bowman) recoge el ultrafiltrado glomerular. Las células mesangiales dentro del glomérulo tienen función contráctil (regulan TFG) y fagocítica.',
        st:[{l:'Hoja visceral',v:'Podocitos (filtración)'},{l:'Hoja parietal',v:'Epitelio plano simple'},{l:'Espacio',v:'Bowman → recoge ultrafiltrado'},{l:'Mesangio',v:'Células contráctiles + fagocíticas'}]},

    tubulo_proximal:{n:'Túbulo Contorneado Proximal (TCP)',s:'Mayor Reabsorción — 65-70% del Filtrado',
        d:'El TCP es el segmento tubular más largo y metabólicamente activo, ubicado en la corteza. Sus células tienen abundantes mitocondrias y un borde en cepillo (microvellosidades) que aumenta 20 veces la superficie de absorción. Reabsorbe el 65-70% del agua filtrada (osmótica, isoosmótica), casi todo el glucosa, aminoácidos, fosfato, bicarbonato, urato y potasio filtrados. También secreta ácidos orgánicos y fármacos (penicilina, metformina, diuréticos). El síndrome de Fanconi es la disfunción global del TCP.',
        st:[{l:'Reabsorción',v:'65-70% filtrado'},{l:'Glucosa',v:'100% reabsorbida (SGLT2)'},{l:'Borde en cepillo',v:'×20 superficie'},{l:'Síndrome Fanconi',v:'Disfunción global TCP'}]},

    asa_henle:{n:'Asa de Henle',s:'Mecanismo Contracorriente — Concentración de Orina',
        d:'El asa de Henle establece y mantiene el gradiente osmótico medular mediante el mecanismo de contracorriente multiplicador. La rama descendente delgada es permeable al agua (AQP1) pero no a la sal → el líquido se concentra al descender. La rama ascendente delgada y gruesa son impermeables al agua pero reabsorben activamente NaCl (NKCC2 en la rama gruesa) → el líquido se diluye. Los diuréticos de asa (furosemida) bloquean el cotransportador NKCC2 en la rama ascendente gruesa. Las nefronas yuxtaglomerulares tienen asas largas → mayor capacidad de concentración.',
        st:[{l:'Rama desc.',v:'Permeable agua (AQP1)'},{l:'Rama asc. gruesa',v:'NKCC2 (diana furosemida)'},{l:'Gradiente',v:'300-1200 mOsm/L'},{l:'Nefronas JG',v:'Asa larga → mayor concentración'}]},

    tubulo_distal:{n:'Túbulo Contorneado Distal (TCD)',s:'Regulación Fina de Na⁺, K⁺ y Ca²⁺',
        d:'El TCD es más corto que el TCP y está ubicado en la corteza. Reabsorbe ~5-8% del NaCl filtrado mediante el cotransportador NCC (diana de las tiazidas). Bajo el efecto de la aldosterona, las células principales del TCD y túbulo colector insertan canales de sodio (ENaC) y bomban sodio a cambio de potasio/hidrógeno (regulación del equilibrio K⁺ y ácido-base). La mácula densa, en el TCD donde contacta con el glomérulo, detecta el NaCl tubular y regula la TFG (retroalimentación tubuloglomerular) y la secreción de renina.',
        st:[{l:'NaCl reabsorbido',v:'5-8% del filtrado'},{l:'Transportador',v:'NCC (diana tiazidas)'},{l:'Aldosterona',v:'→ ENaC + K⁺ excreción'},{l:'Mácula densa',v:'Sensor NaCl → renina'}]},

    arteria_renal:{n:'Arteria Renal',s:'Irrigación Arterial — Rama Directa de la Aorta',
        d:'Las arterias renales son ramas directas de la aorta abdominal (nivel L1-L2). La derecha es más larga y pasa posterior a la vena cava inferior. Se divide en ramas anterior y posterior en el hilio, que dan las arterias segmentarias (5 segmentos avasculares entre ellos: línea de Brödel). Estas se dividen en interlobares → arcuatas (en unión corticomedular) → interlobulillares → arteriolas aferentes del glomérulo. Las arterias renales son arterias terminales (sin anastomosis eficaces) → un émbolo causa infarto renal segmentario.',
        st:[{l:'Origen',v:'Aorta abdominal (L1-L2)'},{l:'Segmentos',v:'5 (línea avascular Brödel)'},{l:'Terminales',v:'Sin anastomosis → infarto'},{l:'Flujo',v:'~20-25% del gasto cardíaco'}]},

    vena_renal:{n:'Vena Renal',s:'Drenaje Venoso — Hacia la VCI',
        d:'Las venas renales drenan hacia la vena cava inferior. La vena renal izquierda (~7 cm) es considerablemente más larga que la derecha (~2-4 cm) y recibe la vena gonadal izquierda (testicular u ovárica), la vena suprarrenal izquierda y venas lumbares. El fenómeno del cascanueces (nutcracker phenomenon) ocurre cuando la VRI es comprimida entre la aorta y la arteria mesentérica superior → hematuria y varicocele izquierdo. La trombosis de la vena renal es complicación del síndrome nefrótico (especialmente nefropatía membranosa).',
        st:[{l:'Drenaje',v:'→ VCI'},{l:'VRI recibe',v:'V. gonadal + suprarrenal izq.'},{l:'Cascanueces',v:'Compresión VRI → hematuria'},{l:'Trombosis',v:'Complicación síndrome nefrótico'}]},

    capilares:{n:'Capilares Peritubulares',s:'Red Capilar Secundaria — Reabsorción Tubular',
        d:'Los capilares peritubulares forman la red capilar secundaria que rodea los túbulos en la corteza, derivados de la arteriola eferente del glomérulo. Su baja presión oncótica (tras la filtración glomerular) y su alta presión oncótica (proteínas concentradas) favorecen la reabsorción de solutos y agua desde los túbulos hacia la sangre. En la médula, los capilares peritubulares se especializan en vasa recta, que acompañan el asa de Henle manteniendo el gradiente osmótico medular sin lavarlo.',
        st:[{l:'Origen',v:'Arteriola eferente'},{l:'Función',v:'Reabsorción post-filtración'},{l:'Vasa recta',v:'Versión medular (contracorriente)'},{l:'Presión',v:'Baja hidrostática → reabsorción'}]},

    capsula_fibrosa:{n:'Cápsula Fibrosa',s:'Envoltura Protectora del Riñón',
        d:'La cápsula fibrosa es la cubierta de tejido conjuntivo denso que envuelve directamente el parénquima renal, separándolo de la grasa perirrenal (grasa de Gerota). Normalmente se desprende con facilidad del parénquima sano, pero en procesos inflamatorios crónicos (pielonefritis, glomerulonefritis) puede adherirse firmemente. Está rodeada por la fascia de Gerota (fascia renal), que también envuelve la glándula suprarrenal. La fascia de Gerota es relevante en la estadificación del carcinoma renal (invasión = pT3b/c).',
        st:[{l:'Tipo',v:'Tejido conjuntivo denso'},{l:'Adherencia',v:'Fija en pielonefritis crónica'},{l:'Fascia Gerota',v:'Rodea riñón + suprarrenal'},{l:'Estadificación',v:'Invasión fascia = pT3b/c'}]},

    inervacion_r:{n:'Inervación Renal',s:'Plexo Renal — Sistema Nervioso Autónomo',
        d:'Los riñones reciben inervación del plexo renal, derivado del plexo celíaco y el nervio esplácnico menor (T10-L1). Las fibras simpáticas posganglionares (noradrenalina) regulan el tono de la arteriola aferente (vasoconstricción → reducción TFG en situaciones de estrés), estimulan la renina (células yuxtaglomerulares) y aumentan la reabsorción de sodio en túbulos. No hay inervación parasimpática funcional renal. El dolor renal (cólico nefrítico) se percibe en el flanco y se irradia hacia la ingle siguiendo el dermatoma T10-L1.',
        st:[{l:'Simpático',v:'T10-L1 → plexo renal'},{l:'Parasimpático',v:'Ausente (sin función conocida)'},{l:'Efecto',v:'Vasocontricción + ↑ renina'},{l:'Dolor referido',v:'Flanco → ingle (T10-L1)'}]},

    sistema_renina:{n:'Sistema Renina-Angiotensina-Aldosterona',s:'Eje Hormonal de Control Tensional',
        d:'El sistema renina-angiotensina-aldosterona (SRAA) es el principal mecanismo hormonal de regulación de la presión arterial y el volumen extracelular. Las células yuxtaglomerulares del riñón secretan renina cuando detectan: baja presión de perfusión renal, bajo NaCl en la mácula densa, o estimulación simpática β1. Renina convierte angiotensinógeno → angiotensina I (pulmón: ECA) → angiotensina II: vasoconstricción + secreción de aldosterona (suprarrenal) + sed + secreción de ADH. Los IECAs y ARA-II bloquean este sistema en HTA y nefropatía.',
        st:[{l:'Estímulo',v:'Baja PA + NaCl + β1-simpático'},{l:'Cadena',v:'Renina→AngI→AngII (ECA)'},{l:'Efectos',v:'VC + aldosterona + ADH + sed'},{l:'Fármacos',v:'IECAs / ARA-II (bloqueo)'}]}
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
