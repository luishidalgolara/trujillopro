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
scene.add(new THREE.HemisphereLight(0xffddc8, 0xaabbcc, 1.10));

const keyLight=new THREE.DirectionalLight(0xffffff, 3.8);
keyLight.position.set(3, 5, 4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xf0d0c0, 1.4);
fillLight.position.set(-5, 3, -2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffffff, 1.6);
rimLight.position.set(-2, -1, -5); scene.add(rimLight);

// SSS warm light to simulate liver translucency
const sssLight=new THREE.PointLight(0xff8844, 0.55, 8);
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
    c+=vec3(.70,.25,.10)*sss*sm*.06;
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
setLoad(50,'Cargando modelo hepático...');
let model=null;
let meshes=[];

new GLTFLoader().load('Igado3d.glb',
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

            const isLiver=/(liver|higado|hígado|hepat|lobu|parench)/i.test(combined);
            const isVessel=/(vein|vena|artery|arteria|portal|hepatic|vessel|blood)/i.test(combined);
            const isBile=/(bile|bilis|biliar|gallbladder|vesicula|choledoc|coledoc|duct|conducto)/i.test(combined);
            const isCapsule=/(capsul|glisson|surface|cortex)/i.test(combined);
            const isFat=/(fat|grasa|adipos)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat.map) pm.map=mat.map;
            if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.6,1.6);}
            if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
            if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;

            if(isLiver){
                pm.roughness=mat.roughness!=null?Math.min(mat.roughness,0.55):0.45;
                pm.metalness=0.0;
                pm.clearcoat=0.30; pm.clearcoatRoughness=0.35;
                pm.sheen=0.25; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.80,0.40,0.30);
                pm.thickness=1.2;
                pm.attenuationColor=new THREE.Color(0.75,0.20,0.10);
                pm.attenuationDistance=1.5;
                pm.emissive=new THREE.Color(0.06,0.02,0.01); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.45;
            } else if(isVessel){
                pm.roughness=0.38; pm.metalness=0;
                pm.clearcoat=0.50; pm.clearcoatRoughness=0.20;
                pm.sheen=0.15; pm.sheenRoughness=0.40;
                pm.sheenColor=new THREE.Color(0.80,0.30,0.30);
                pm.emissive=new THREE.Color(0.12,0.02,0.02); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.55;
            } else if(isBile){
                pm.roughness=0.42; pm.metalness=0;
                pm.clearcoat=0.55; pm.clearcoatRoughness=0.25;
                pm.sheen=0.20; pm.sheenRoughness=0.45;
                pm.sheenColor=new THREE.Color(0.50,0.70,0.20);
                pm.emissive=new THREE.Color(0.04,0.08,0.01); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.40;
            } else if(isCapsule){
                pm.roughness=0.50; pm.metalness=0;
                pm.clearcoat=0.45; pm.clearcoatRoughness=0.30;
                pm.emissive=new THREE.Color(0.05,0.02,0.01); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.35;
            } else if(isFat){
                pm.roughness=0.75; pm.metalness=0;
                pm.emissive=new THREE.Color(0.06,0.05,0.02); pm.emissiveIntensity=0.06;
                pm.envMapIntensity=0.20;
            } else {
                pm.roughness=mat.roughness!=null?mat.roughness:0.55;
                pm.metalness=mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.20; pm.clearcoatRoughness=0.45;
                pm.sheen=0.18; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.80,0.55,0.40);
                pm.emissive=new THREE.Color(0.05,0.02,0.01); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.40;
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
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que Igado3d.glb esté en la misma carpeta.')}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS'; fc=0; lt=t;}
    ctrl.update();
    sssLight.intensity=0.55+Math.sin(t*0.0007)*0.07;
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
        } else if(sel==='lobulo_derecho'||sel==='lobulo_izquierdo'){
            mat.emissive.setRGB(0.18,0.06,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='lobulo_caudado'||sel==='lobulo_cuadrado'){
            mat.emissive.setRGB(0.16,0.05,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='segmentos'){
            mat.emissive.setRGB(0.20,0.08,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='hilum'){
            mat.emissive.setRGB(0.10,0.06,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='lobulillo'||sel==='hepatocito'){
            mat.emissive.setRGB(0.18,0.07,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='sinusoide'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='espacio_porta'){
            mat.emissive.setRGB(0.12,0.05,0.02); mat.emissiveIntensity=0.16;
        } else if(sel==='vesicula'||sel==='coledoco'||sel==='bilis'){
            mat.emissive.setRGB(0.04,0.14,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='vena_porta'){
            mat.emissive.setRGB(0.04,0.06,0.16); mat.emissiveIntensity=0.20;
        } else if(sel==='arteria_hepatica'){
            mat.emissive.setRGB(0.18,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='venas_hepaticas'){
            mat.emissive.setRGB(0.03,0.05,0.18); mat.emissiveIntensity=0.22;
        } else if(sel==='metabolismo'){
            mat.emissive.setRGB(0.14,0.10,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='inervacion_h'){
            mat.emissive.setRGB(0.06,0.12,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='capsula'){
            mat.emissive.setRGB(0.06,0.04,0.02); mat.emissiveIntensity=0.14;
        } else {
            mat.emissive.setRGB(0.05,0.03,0.01); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{n:'Hígado Humano',s:'Sistema Digestivo — Glándula Más Grande del Cuerpo',
        d:'El hígado es la glándula más grande del cuerpo humano y el órgano interno más pesado (~1.5 kg en adulto). Ocupa el hipocondrio derecho y el epigastrio. Realiza más de 500 funciones metabólicas: síntesis de proteínas plasmáticas, metabolismo de carbohidratos, lípidos y proteínas, detoxificación, producción de bilis y almacenamiento de glucógeno.',
        st:[{l:'Peso adulto',v:'1.2–1.8 kg'},{l:'Bilis/día',v:'600–1200 mL'},{l:'Flujo sanguíneo',v:'~1.5 L/min'},{l:'Segmentos',v:'8 (Couinaud)'}]},

    lobulo_derecho:{n:'Lóbulo Derecho',s:'Lóbulo Mayor — ~60-70% del Volumen',
        d:'El lóbulo derecho es la porción más voluminosa del hígado, separado del lóbulo izquierdo por el ligamento falciforme en la superficie anterior y por la cisura principal (línea de Cantlie) en la clasificación funcional de Couinaud. Contiene los segmentos V, VI, VII y VIII. Está en íntimo contacto con el diafragma (cara diafragmática) y el riñón derecho (impresión renal).',
        st:[{l:'Segmentos',v:'V, VI, VII, VIII'},{l:'Volumen',v:'~60-70% del total'},{l:'Contacto',v:'Diafragma + riñón dcho.'},{l:'Irrigación',v:'Rama derecha arteria hepática'}]},

    lobulo_izquierdo:{n:'Lóbulo Izquierdo',s:'Lóbulo Menor — Segmentos II, III, IV',
        d:'El lóbulo izquierdo es más pequeño y plano. Comprende los segmentos II, III y IV (según Couinaud). Está separado del lóbulo caudado por la fisura del ligamento venoso (ligamento de Arancio) y del lóbulo derecho por la cisura principal. En su cara visceral contacta con el estómago (impresión gástrica) y el esófago abdominal.',
        st:[{l:'Segmentos',v:'II, III, IV'},{l:'Volumen',v:'~30-40% del total'},{l:'Contacto',v:'Estómago + esófago'},{l:'Ligamento',v:'Falciforme (división)'}]},

    lobulo_caudado:{n:'Lóbulo Caudado (de Spiegel)',s:'Segmento I — Lóbulo Autónomo',
        d:'El lóbulo caudado (segmento I de Couinaud) ocupa la cara posterior del hígado entre el hilio y la vena cava inferior. Tiene una vascularización autónoma especial: recibe ramas de ambas ramas portales (derecha e izquierda) y drena directamente a la vena cava inferior mediante venas hepáticas accesorias propias. Esta autonomía lo hace especialmente relevante en el síndrome de Budd-Chiari.',
        st:[{l:'Segmento',v:'I (Couinaud)'},{l:'Drenaje venoso',v:'VCI directamente'},{l:'Relevancia',v:'Sd. Budd-Chiari'},{l:'Ubicación',v:'Cara posterior hígado'}]},

    lobulo_cuadrado:{n:'Lóbulo Cuadrado',s:'Segmento IVb — Entre Vesícula y Ligamento',
        d:'El lóbulo cuadrado es una pequeña protuberancia en la cara visceral del hígado, delimitada por la fosa de la vesícula biliar (a la derecha), la fisura del ligamento redondo (a la izquierda) y el hilio hepático (detrás). Corresponde al segmento IVb según la clasificación de Couinaud. En contacto directo con el duodeno (impresión duodenal) y el colon transverso.',
        st:[{l:'Segmento',v:'IVb (Couinaud)'},{l:'Límites',v:'Vesícula + lig. redondo'},{l:'Contacto',v:'Duodeno + colon transverso'},{l:'Posición',v:'Cara visceral anterior'}]},

    segmentos:{n:'Segmentos de Couinaud (I–VIII)',s:'Clasificación Quirúrgica Funcional',
        d:'La clasificación de Couinaud divide el hígado en 8 segmentos funcionalmente independientes, cada uno con su propia rama portal, arteria hepática, conducto biliar y vena hepática de drenaje. Esta división permite resecciones hepáticas segmentarias (hepatectomías) con mínima pérdida de parénquima funcional. Los segmentos I-IV corresponden al hemihígado izquierdo y los segmentos V-VIII al derecho.',
        st:[{l:'Segmentos izq.',v:'I, II, III, IV'},{l:'Segmentos dcho.',v:'V, VI, VII, VIII'},{l:'Independencia',v:'Vascular + biliar'},{l:'Uso clínico',v:'Planificación quirúrgica'}]},

    hilum:{n:'Hilio Hepático (Porta Hepatis)',s:'Puerta de Entrada y Salida del Hígado',
        d:'El hilio hepático es el surco transversal en la cara visceral donde entran y salen las estructuras vasculares y biliares. Contiene la tríada portal: vena porta (posterior), arteria hepática propia (anterior izquierda) y conducto hepático común (anterior derecha). Rodeado por el epiplón menor (ligamento hepatoduodenal). La maniobra de Pringle consiste en ocluir el hilio para controlar la hemorragia hepática.',
        st:[{l:'Tríada portal',v:'Vena + arteria + conducto'},{l:'Maniobra',v:'Pringle (oclusión)'},{l:'Ligamento',v:'Hepatoduodenal'},{l:'Relevancia',v:'Cirugía hepática'}]},

    lobulillo:{n:'Lobulillo Hepático',s:'Unidad Morfológica Funcional del Hígado',
        d:'El lobulillo hepático clásico es una estructura hexagonal de ~1 mm de diámetro con la vena central (rama de las venas hepáticas) en el centro y los espacios porta en los vértices. Los hepatocitos se organizan en placas (trabéculas de Remak) irradiando desde el centro. La sangre fluye desde los espacios porta hacia la vena central a través de los sinusoides. El ácino de Rappaport es la unidad funcional metabólica.',
        st:[{l:'Forma',v:'Hexagonal (~1 mm)'},{l:'Centro',v:'Vena central lobular'},{l:'Periféria',v:'Espacios porta (×3)'},{l:'Unidad funcional',v:'Ácino de Rappaport'}]},

    hepatocito:{n:'Hepatocitos',s:'Células Parenquimatosas Principales',
        d:'Los hepatocitos constituyen el 60-80% de la masa hepática total y son las células responsables de la mayoría de las funciones metabólicas del hígado. Son células epiteliales polares con cara sinusoidal (hacia los sinusoides, con microvellosidades en el espacio de Disse) y cara canalicular (forma los canalículos biliares). Tienen vida media de ~150-500 días y alta capacidad de regeneración (hasta 70% de hepatectomía tolerable).',
        st:[{l:'Porcentaje',v:'60-80% masa hepática'},{l:'Vida media',v:'150-500 días'},{l:'Regeneración',v:'Hasta 70% resección'},{l:'Polaridad',v:'Sinusoidal + canalicular'}]},

    sinusoide:{n:'Sinusoides Hepáticos',s:'Capilares Especializados del Hígado',
        d:'Los sinusoides son capilares fenestrados (poros de 100-200 nm) sin membrana basal continua, que permiten el intercambio directo entre la sangre y los hepatocitos a través del espacio de Disse. Están revestidos por células endoteliales sinusoidales hepáticas (LSEC), células de Kupffer (macrófagos residentes), células estrelladas (de Ito, almacenan vitamina A y producen colágeno en la fibrosis) y células NK (pit cells).',
        st:[{l:'Fenestras',v:'100-200 nm'},{l:'Células Kupffer',v:'Macrófagos residentes'},{l:'Cél. estrelladas (Ito)',v:'Fibrosis + vitamina A'},{l:'Espacio',v:'Disse (intercambio)'}]},

    espacio_porta:{n:'Espacio Porta (Tríada Portal)',s:'Unidad Vascular y Biliar Perilobulillar',
        d:'El espacio porta (o espacio de Kiernan) se ubica en los vértices del lobulillo hepático y contiene la tríada portal: rama de la vena porta, rama de la arteria hepática y canalículo biliar (conducto biliar interlobulillar). También contiene linfáticos y nervios. La bilis fluye en dirección opuesta a la sangre: de la vena central hacia los conductos biliares periféricos (flujo contracorriente).',
        st:[{l:'Componentes',v:'Vena + arteria + biliar'},{l:'Flujo biliar',v:'Centro → periferia'},{l:'Flujo sanguíneo',v:'Periferia → centro'},{l:'Linfáticos',v:'Presentes en espacio porta'}]},

    vesicula:{n:'Vesícula Biliar',s:'Reservorio de Bilis — Sistema Biliar Extrahepático',
        d:'La vesícula biliar es un saco musculomembranoso de ~8-10 cm de longitud y 3-5 cm de diámetro, ubicado en la fosa cística en la cara visceral del lóbulo derecho. Concentra la bilis hepática 5-10 veces por absorción de agua y electrolitos. La colecistoquinina (CCK) liberada por el duodeno estimula su contracción. El conducto cístico la conecta con el colédoco. La colelitiasis (cálculos biliares) es su patología más frecuente.',
        st:[{l:'Capacidad',v:'40-70 mL'},{l:'Concentración',v:'5-10× bilis hepática'},{l:'Hormona',v:'CCK (contracción)'},{l:'Patología',v:'Colelitiasis (~10-15% adultos)'}]},

    coledoco:{n:'Colédoco (Conducto Biliar Común)',s:'Conducto Biliar Principal',
        d:'El colédoco resulta de la unión del conducto hepático común con el conducto cístico. Mide 6-8 cm de longitud y 6 mm de diámetro (>8 mm se considera dilatado). Recorre el ligamento hepatoduodenal, pasa por la cabeza del páncreas y desemboca en la ampolla de Vater junto con el conducto pancreático principal (de Wirsung), regulado por el esfínter de Oddi. La coledocolitiasis (obstrucción por cálculo) puede causar ictericia obstructiva y colangitis.',
        st:[{l:'Longitud',v:'6-8 cm'},{l:'Diámetro normal',v:'<8 mm'},{l:'Desemboca en',v:'Ampolla de Vater (duodeno)'},{l:'Esfínter',v:'De Oddi (regulador)'}]},

    bilis:{n:'Producción de Bilis',s:'Función Secretora Exocrina del Hígado',
        d:'Los hepatocitos producen 600-1200 mL de bilis al día. La bilis primaria contiene ácidos biliares (colato, quenodesoxicolato), bilirrubina conjugada, colesterol, fosfolípidos (lecitina), electrolitos y agua. Los ácidos biliares emulsionan las grasas facilitando su digestión y absorción en el intestino delgado. La bilis también es la principal vía de excreción de colesterol, bilirrubina (producto del catabolismo del hemo) y xenobióticos conjugados.',
        st:[{l:'Producción',v:'600-1200 mL/día'},{l:'Ácidos biliares',v:'Colato + quenodesoxicolato'},{l:'Función',v:'Emulsión y absorción grasas'},{l:'Excreción',v:'Bilirrubina + colesterol'}]},

    vena_porta:{n:'Vena Porta',s:'Principal Aporte Venoso — 70-75% del Flujo',
        d:'La vena porta lleva sangre venosa rica en nutrientes absorbidos desde el intestino, páncreas y bazo hasta el hígado. Se forma por la unión de la vena mesentérica superior y la vena esplénica (detrás del cuello del páncreas). Mide ~6-8 cm y aporta el 70-75% del flujo sanguíneo total hepático pero solo el 40-50% del oxígeno (sangre venosa). La hipertensión portal (>10 mmHg) genera varices esofágicas, ascitis y esplenomegalia.',
        st:[{l:'Flujo',v:'70-75% del total'},{l:'Origen',v:'VMS + esplénica'},{l:'Presión normal',v:'5-10 mmHg'},{l:'Hipertensión',v:'>10 mmHg → varices'}]},

    arteria_hepatica:{n:'Arteria Hepática',s:'Aporte Arterial — 25-30% del Flujo',
        d:'La arteria hepática propia es rama de la arteria hepática común (del tronco celíaco). Aporta el 25-30% del flujo sanguíneo total hepático pero el 50-60% del oxígeno, ya que es sangre arterial. Se divide en ramas derecha e izquierda en el hilio. Presenta numerosas variantes anatómicas (~20-25% de la población tiene arteria hepática derecha accesoria originada de la arteria mesentérica superior — crucial en cirugía y trasplante hepático).',
        st:[{l:'Flujo',v:'25-30% del total'},{l:'Oxígeno',v:'50-60% aporte O₂'},{l:'Origen',v:'Tronco celíaco'},{l:'Variantes',v:'~20-25% arteria accesoria'}]},

    venas_hepaticas:{n:'Venas Hepáticas (Suprahepáticas)',s:'Drenaje Venoso — Hacia la VCI',
        d:'Las tres venas hepáticas principales (derecha, media e izquierda) drenan la sangre desde los sinusoides hepáticos hacia la vena cava inferior (VCI) justo antes de su entrada en la aurícula derecha. La vena hepática media drena parte del lóbulo derecho y todo el lóbulo cuadrado. En el síndrome de Budd-Chiari hay obstrucción de estas venas. Son referencia clave para la delimitación de los segmentos de Couinaud.',
        st:[{l:'Número principal',v:'3 (dcha, media, izq.)'},{l:'Drenaje',v:'→ VCI (supradiafragm.)'},{l:'Patología',v:'Sd. Budd-Chiari'},{l:'Función quirúrgica',v:'Límites entre segmentos'}]},

    metabolismo:{n:'Metabolismo y Biotransformación',s:'Más de 500 Funciones Metabólicas',
        d:'El hígado es el principal órgano metabólico del cuerpo. Sintetiza la mayoría de proteínas plasmáticas (albúmina, factores de coagulación II, VII, IX, X, fibrinógeno, proteínas C y S). Regula la glucemia mediante glucogenogénesis, glucogenólisis y gluconeogénesis. Metaboliza lípidos (síntesis de VLDL, HDL, colesterol, cuerpos cetónicos). Detoxifica fármacos y toxinas mediante las enzimas del citocromo P450 (CYP). Convierte el amoniaco en urea (ciclo de la urea).',
        st:[{l:'Proteínas',v:'Albúmina + factores coag.'},{l:'Glucosa',v:'Glucogén. + gluconeog.'},{l:'Detoxificación',v:'Citocromo P450 (CYP)'},{l:'Urea',v:'Ciclo de la urea (NH₃)'}]},

    inervacion_h:{n:'Inervación Hepática',s:'Sistema Nervioso Autónomo',
        d:'El hígado recibe inervación del sistema nervioso autónomo a través del plexo hepático, formado por fibras simpáticas (del nervio esplácnico mayor, T6-T10, ganglio celíaco) y parasimpáticas (nervio vago, NC X). Las fibras simpáticas regulan el flujo sanguíneo hepático y la glucogenólisis. Las parasimpáticas modulan la secreción biliar y la glucogénesis. El dolor hepático se refiere al hombro derecho por la irritación del nervio frénico (C3-C5).',
        st:[{l:'Simpático',v:'T6-T10 → ganglio celíaco'},{l:'Parasimpático',v:'NC X (nervio vago)'},{l:'Dolor referido',v:'Hombro derecho (C3-C5)'},{l:'Plexo',v:'Plexo hepático (periportal)'}]},

    capsula:{n:'Cápsula de Glisson',s:'Envoltura Fibrosa del Hígado',
        d:'La cápsula de Glisson es la cubierta fibrosa de tejido conectivo denso que rodea completamente el hígado. Se invagina en el parénquima en el hilio formando vainas perivasculares (vainas de Glisson) que acompañan a los vasos portales y conductos biliares hasta los espacios porta. Es responsable del dolor hepático cuando se distiende (hepatomegalia, congestión). El hígado está cubierto en gran parte por peritoneo visceral (cara anterior) que se fusiona con la cápsula.',
        st:[{l:'Composición',v:'Tejido conjuntivo denso'},{l:'Extensión',v:'Vainas portales intrahepaticas'},{l:'Peritoneo',v:'Cara anterior + superior'},{l:'Dolor',v:'Distensión → dolor dcho.'}]}
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
