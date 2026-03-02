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
scene.add(new THREE.HemisphereLight(0xffe8d0, 0xaabbcc, 1.10));

const keyLight=new THREE.DirectionalLight(0xffffff, 3.8);
keyLight.position.set(3, 5, 4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xf5ddc0, 1.4);
fillLight.position.set(-5, 3, -2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffffff, 1.6);
rimLight.position.set(-2, -1, -5); scene.add(rimLight);

// SSS warm amber light to simulate pancreas glandular translucency
const sssLight=new THREE.PointLight(0xffaa66, 0.55, 8);
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
    c+=vec3(.75,.40,.15)*sss*sm*.06;
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
setLoad(50,'Cargando modelo pancreático...');
let model=null;
let meshes=[];

new GLTFLoader().load('pancreas3d.glb',
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

            const isPancreas=/(pancrea|parench|acin|gland|lobul)/i.test(combined);
            const isDuct=/(duct|conducto|wirsung|santori|canal|bile|biliar)/i.test(combined);
            const isIslet=/(islet|islot|langerhans|endocrin|beta|alpha|delta)/i.test(combined);
            const isVessel=/(vein|vena|artery|arteria|vessel|blood|splenic|mesenteri|portal)/i.test(combined);
            const isCapsule=/(capsul|surface|cortex|membran)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat.map) pm.map=mat.map;
            if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.6,1.6);}
            if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
            if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;

            if(isPancreas){
                pm.roughness=mat.roughness!=null?Math.min(mat.roughness,0.60):0.50;
                pm.metalness=0.0;
                pm.clearcoat=0.25; pm.clearcoatRoughness=0.40;
                pm.sheen=0.30; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.90,0.65,0.35);
                pm.thickness=1.0;
                pm.attenuationColor=new THREE.Color(0.85,0.55,0.25);
                pm.attenuationDistance=1.2;
                pm.emissive=new THREE.Color(0.06,0.03,0.01); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.40;
            } else if(isDuct){
                pm.roughness=0.40; pm.metalness=0;
                pm.clearcoat=0.55; pm.clearcoatRoughness=0.22;
                pm.sheen=0.15; pm.sheenRoughness=0.40;
                pm.sheenColor=new THREE.Color(0.70,0.60,0.30);
                pm.emissive=new THREE.Color(0.05,0.04,0.01); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.50;
            } else if(isIslet){
                pm.roughness=0.45; pm.metalness=0;
                pm.clearcoat=0.35; pm.clearcoatRoughness=0.30;
                pm.sheen=0.35; pm.sheenRoughness=0.45;
                pm.sheenColor=new THREE.Color(0.75,0.40,0.70);
                pm.emissive=new THREE.Color(0.08,0.02,0.08); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.45;
            } else if(isVessel){
                pm.roughness=0.38; pm.metalness=0;
                pm.clearcoat=0.50; pm.clearcoatRoughness=0.20;
                pm.sheen=0.15; pm.sheenRoughness=0.40;
                pm.sheenColor=new THREE.Color(0.80,0.30,0.30);
                pm.emissive=new THREE.Color(0.10,0.02,0.02); pm.emissiveIntensity=0.12;
                pm.envMapIntensity=0.55;
            } else if(isCapsule){
                pm.roughness=0.52; pm.metalness=0;
                pm.clearcoat=0.40; pm.clearcoatRoughness=0.35;
                pm.emissive=new THREE.Color(0.04,0.02,0.01); pm.emissiveIntensity=0.07;
                pm.envMapIntensity=0.30;
            } else {
                pm.roughness=mat.roughness!=null?mat.roughness:0.55;
                pm.metalness=mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.18; pm.clearcoatRoughness=0.45;
                pm.sheen=0.18; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.85,0.65,0.40);
                pm.emissive=new THREE.Color(0.05,0.03,0.01); pm.emissiveIntensity=0.08;
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
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que pancreas3d.glb esté en la misma carpeta.')}
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
            mat.emissive.setRGB(0.05,0.03,0.01); mat.emissiveIntensity=0.08;
        } else if(sel==='cabeza'){
            mat.emissive.setRGB(0.20,0.10,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='cuello'){
            mat.emissive.setRGB(0.18,0.09,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='cuerpo'){
            mat.emissive.setRGB(0.18,0.09,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='cola'){
            mat.emissive.setRGB(0.16,0.08,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='proceso_uncinado'){
            mat.emissive.setRGB(0.14,0.07,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='acinos'){
            mat.emissive.setRGB(0.20,0.12,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='conducto_wirsung'||sel==='conducto_santorini'){
            mat.emissive.setRGB(0.12,0.09,0.03); mat.emissiveIntensity=0.20;
        } else if(sel==='ampolla_vater'){
            mat.emissive.setRGB(0.10,0.08,0.03); mat.emissiveIntensity=0.18;
        } else if(sel==='jugo_pancreatico'){
            mat.emissive.setRGB(0.14,0.10,0.03); mat.emissiveIntensity=0.18;
        } else if(sel==='islotes'){
            mat.emissive.setRGB(0.14,0.03,0.14); mat.emissiveIntensity=0.22;
        } else if(sel==='celulas_beta'){
            mat.emissive.setRGB(0.10,0.03,0.16); mat.emissiveIntensity=0.24;
        } else if(sel==='celulas_alfa'){
            mat.emissive.setRGB(0.18,0.04,0.08); mat.emissiveIntensity=0.22;
        } else if(sel==='celulas_delta'){
            mat.emissive.setRGB(0.10,0.02,0.12); mat.emissiveIntensity=0.20;
        } else if(sel==='arteria_pancreatica'){
            mat.emissive.setRGB(0.18,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='vena_mesenterica'||sel==='vena_esplenica'){
            mat.emissive.setRGB(0.03,0.05,0.18); mat.emissiveIntensity=0.22;
        } else if(sel==='inervacion_p'){
            mat.emissive.setRGB(0.06,0.12,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='regulacion'){
            mat.emissive.setRGB(0.14,0.10,0.02); mat.emissiveIntensity=0.18;
        } else {
            mat.emissive.setRGB(0.05,0.03,0.01); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{n:'Páncreas Humano',s:'Sistema Digestivo y Endocrino — Glándula Mixta',
        d:'El páncreas es una glándula mixta (exocrina y endocrina) situada en el retroperitoneo, a nivel de L1-L2. Mide 12-20 cm y pesa 60-100 g. Su función exocrina produce jugo pancreático (1-2 L/día) con enzimas digestivas; su función endocrina, a través de los islotes de Langerhans, regula la glucemia secretando insulina, glucagón y somatostatina.',
        st:[{l:'Longitud',v:'12–20 cm'},{l:'Peso',v:'60–100 g'},{l:'Jugo pancreático',v:'1–2 L/día'},{l:'Islotes',v:'~1 millón'}]},

    cabeza:{n:'Cabeza Pancreática',s:'Porción Derecha — En la Curva Duodenal',
        d:'La cabeza es la porción más ancha del páncreas (~3-4 cm), encajada en la curva en "C" del duodeno (segunda y tercera porciones). Está íntimamente unida al duodeno por tejido conectivo. Por su cara posterior pasa el colédoco (conducto biliar común) antes de desembocar en la ampolla de Vater. La cabeza contiene el proceso uncinado hacia su parte inferior. El cáncer de cabeza de páncreas es el más frecuente (~70%) y puede causar ictericia obstructiva indolora.',
        st:[{l:'Anchura',v:'3–4 cm'},{l:'Relación',v:'Curva duodenal (2ª-3ª porc.)'},{l:'Estructura clave',v:'Colédoco (cara posterior)'},{l:'Ca páncreas',v:'~70% en cabeza'}]},

    cuello:{n:'Cuello Pancreático',s:'Porción Estrecha — Segmento de Transición',
        d:'El cuello pancreático es la porción más estrecha (~1.5-2 cm), que conecta la cabeza con el cuerpo. Se sitúa directamente anterior a la confluencia de la vena mesentérica superior y la vena esplénica, donde forman la vena porta. Esta íntima relación vascular hace que la resección quirúrgica del cuello (en la pancreaticoduodenectomía de Whipple) sea un paso crítico para la hemostasia.',
        st:[{l:'Anchura',v:'~1.5-2 cm'},{l:'Posterior',v:'Confluencia portal'},{l:'Cirugía',v:'Sección en Whipple'},{l:'Relación',v:'VMS + v. esplénica → porta'}]},

    cuerpo:{n:'Cuerpo Pancreático',s:'Porción Central — Cruzando la Columna',
        d:'El cuerpo pancreático cruza horizontalmente la columna vertebral a nivel de L1-L2 y la aorta. Se relaciona anteriormente con el estómago (separado por la transcavidad de los epiplones o bolsa omental) y posteriormente con la aorta, la arteria mesentérica superior, la vena esplénica y el riñón izquierdo. Su cara anterior está cubierta por peritoneo parietal posterior. Es la porción que más frecuentemente se afecta en la pancreatitis aguda grave.',
        st:[{l:'Posición',v:'L1-L2 (retroperitoneal)'},{l:'Anterior',v:'Estómago + bolsa omental'},{l:'Posterior',v:'Aorta + VMS'},{l:'Pancreatitis',v:'Afectación frecuente'}]},

    cola:{n:'Cola Pancreática',s:'Extremo Izquierdo — Intraperitoneal',
        d:'La cola es la única porción del páncreas que es intraperitoneal (cubierta por peritoneo), ya que se proyecta hacia el hilio del bazo dentro del ligamento esplenorrenal. Tiene contacto directo con el riñón izquierdo y la glándula suprarrenal izquierda. La esplenopancreatectomía distal (extirpación de cola + bazo) es el procedimiento habitual para tumores de cola. La cola tiene mayor concentración relativa de islotes de Langerhans.',
        st:[{l:'Posición',v:'Hilio esplénico'},{l:'Peritoneo',v:'Intraperitoneal (único)'},{l:'Relación',v:'Bazo + riñón izquierdo'},{l:'Cirugía',v:'Esplenopancreatectomía distal'}]},

    proceso_uncinado:{n:'Proceso Uncinado',s:'Extensión Inferior de la Cabeza',
        d:'El proceso uncinado (del latín uncus, gancho) es una prolongación en forma de gancho de la parte inferior de la cabeza pancreática que se extiende hacia la izquierda, pasando posterior a la vena mesentérica superior y anterior a la aorta. Recibe su propia irrigación de ramas de la arteria mesentérica superior. Su disección quirúrgica es uno de los pasos más difíciles de la pancreaticoduodenectomía (cirugía de Whipple).',
        st:[{l:'Forma',v:'Gancho (uncus)'},{l:'Relación',v:'Posterior a VMS'},{l:'Irrigación',v:'Ramas a. mesentérica sup.'},{l:'Cirugía',v:'Paso crítico en Whipple'}]},

    acinos:{n:'Células Acinares',s:'Unidad Exocrina Funcional del Páncreas',
        d:'Los acinos pancreáticos son la unidad morfofuncional exocrina. Cada ácino es un grupo esférico de 40-50 células acinares dispuestas alrededor de una luz central, con células centroacinares que conectan con los canalículos intercalados. Las células acinares producen y secretan proenzimas (zimógenos): tripsinógeno, quimotripsinógeno, proelastasa, fosfolipasa A2, procarboxipeptidasa y lipasa. Los zimógenos se almacenan en gránulos de secreción y se liberan por exocitosis regulada por colecistoquinina (CCK) y acetilcolina.',
        st:[{l:'Células/ácino',v:'40-50 células'},{l:'Secreción',v:'Zimógenos (proenzimas)'},{l:'Estímulo',v:'CCK + acetilcolina'},{l:'Almacenamiento',v:'Gránulos de zimógeno'}]},

    conducto_wirsung:{n:'Conducto de Wirsung',s:'Conducto Pancreático Principal',
        d:'El conducto de Wirsung recorre el páncreas de izquierda a derecha en su eje longitudinal, a lo largo de toda su longitud. Mide ~3-4 mm de diámetro (>5 mm se considera dilatado). Recoge la secreción de todos los conductos interlobulillares e intercalados. En la cabeza pancreática se une al colédoco para desembocar juntos en la ampolla de Vater (papila de Vater) en la segunda porción duodenal. El esfínter de Oddi regula su apertura al duodeno.',
        st:[{l:'Diámetro normal',v:'3–4 mm (>5 mm: dilatado)'},{l:'Desemboca en',v:'Ampolla de Vater'},{l:'Esfínter',v:'De Oddi'},{l:'Duodeno',v:'2ª porción (papila mayor)'}]},

    conducto_santorini:{n:'Conducto de Santorini',s:'Conducto Pancreático Accesorio',
        d:'El conducto de Santorini (conducto pancreático accesorio) drena la porción superior de la cabeza pancreática y desemboca independientemente en el duodeno a través de la papila menor (papila duodenal minor), ~2 cm proximal a la papila mayor. En el páncreas dividido (páncreas divisum), variante anatómica presente en ~5-10% de la población, el conducto de Santorini es el conducto principal y el de Wirsung drena solo el proceso uncinado — puede causar pancreatitis crónica.',
        st:[{l:'Desemboca en',v:'Papila menor (duodeno)'},{l:'Drena',v:'Cabeza superior'},{l:'Páncreas divisum',v:'5-10% población'},{l:'Relevancia',v:'Pancreatitis crónica'}]},

    ampolla_vater:{n:'Ampolla de Vater',s:'Confluencia Bilio-Pancreática',
        d:'La ampolla de Vater (papila duodenal mayor) es la dilatación que se forma por la unión del conducto de Wirsung con el colédoco antes de su apertura al duodeno. Se ubica en la cara posteromedial de la segunda porción duodenal. El esfínter de Oddi (esfínter hepatopancreático) rodea la ampolla regulando el flujo de bilis y jugo pancreático hacia el duodeno. Los tumores de la ampolla de Vater (carcinoma ampular) representan ~5-10% de los tumores periampulares y tienen mejor pronóstico que el adenocarcinoma pancreático.',
        st:[{l:'Contenido',v:'Colédoco + Wirsung'},{l:'Esfínter',v:'De Oddi'},{l:'Ubicación',v:'2ª porción duodenal'},{l:'Tumor ampular',v:'Mejor pronóstico'}]},

    jugo_pancreatico:{n:'Jugo Pancreático',s:'Secreción Exocrina — 1-2 L/día',
        d:'El jugo pancreático es un líquido alcalino (pH 7.8-8.4) rico en bicarbonato (secretado por las células centroacinares y ductales bajo estímulo de secretina) que neutraliza el quimo ácido gástrico. Contiene las principales enzimas digestivas: proteasas (tripsina, quimiotripsina, elastasa), lipasas (lipasa pancreática, fosfolipasa A2), amilasa pancreática y nucleasas. Las proteasas se secretan como zimógenos inactivos, activados por enteroquinasa duodenal (enterocinasa) que convierte el tripsinógeno en tripsina activa.',
        st:[{l:'pH',v:'7.8–8.4 (alcalino)'},{l:'Producción',v:'1–2 L/día'},{l:'Bicarbonato',v:'Estímulo: secretina'},{l:'Activación',v:'Enterocinasa (duodeno)'}]},

    islotes:{n:'Islotes de Langerhans',s:'Unidades Endocrinas del Páncreas',
        d:'Los islotes de Langerhans son ~1 millón de microestructuras esféricas de 100-200 μm de diámetro dispersas en el parénquima exocrino, representando solo el 1-2% del volumen pancreático pero el 10-15% del flujo sanguíneo total del órgano. Cada islote contiene varias células endocrinas: β (insulina, ~65-80%), α (glucagón, ~15-20%), δ (somatostatina, ~5-10%), células PP (polipéptido pancreático) y células ε (grelina). Los islotes están muy vascularizados e inervados por el sistema nervioso autónomo.',
        st:[{l:'Número',v:'~1 millón'},{l:'Tamaño',v:'100–200 μm'},{l:'Volumen',v:'1-2% del páncreas'},{l:'Flujo sanguíneo',v:'10-15% del total'}]},

    celulas_beta:{n:'Células β (Beta)',s:'Producción de Insulina — Hipoglucemiante',
        d:'Las células β son las más abundantes del islote (65-80%) y se ubican principalmente en el centro. Producen y secretan insulina, la única hormona hipoglucemiante del organismo. La insulina se sintetiza como preproinsulina → proinsulina → insulina + péptido C (en cantidades equimolares, útil para evaluar función beta residual). El estímulo principal es la hiperglucemia (glucosa ≥ 5.6 mmol/L) a través de los canales KATP. La destrucción autoinmune de las células β causa diabetes mellitus tipo 1.',
        st:[{l:'Proporción',v:'65-80% del islote'},{l:'Hormona',v:'Insulina (hipoglucemiante)'},{l:'Co-secretado',v:'Péptido C (equimolar)'},{l:'Destrucción',v:'→ DM tipo 1 (autoinmune)'}]},

    celulas_alfa:{n:'Células α (Alfa)',s:'Producción de Glucagón — Hiperglucemiante',
        d:'Las células α constituyen el 15-20% del islote y se ubican preferentemente en la periferia. Producen glucagón, la hormona contrarregulatoria de la insulina. El glucagón actúa principalmente en el hígado estimulando la glucogenólisis y la gluconeogénesis para elevar la glucemia en situaciones de ayuno e hipoglucemia. También estimula la cetogénesis hepática. El estímulo principal para su secreción es la hipoglucemia, el ayuno prolongado y los aminoácidos.',
        st:[{l:'Proporción',v:'15-20% del islote'},{l:'Hormona',v:'Glucagón (hiperglucemiante)'},{l:'Acción hepática',v:'Glucogenólisis + gluconeogénesis'},{l:'Estímulo',v:'Hipoglucemia + aminoácidos'}]},

    celulas_delta:{n:'Células δ (Delta)',s:'Producción de Somatostatina — Reguladora',
        d:'Las células δ representan el 5-10% del islote y se intercalan entre las células α y β, ejerciendo una función paracrina de regulación. La somatostatina pancreática inhibe la secreción de insulina, glucagón, polipéptido pancreático, así como la secreción exocrina pancreática y gástrica. Actúa a través de receptores SSTR (somatostatin receptors). Los análogos sintéticos de somatostatina (octreótido, lanreótido) se usan clínicamente para tratar tumores neuroendocrinos pancreáticos (NETs) secretores.',
        st:[{l:'Proporción',v:'5-10% del islote'},{l:'Hormona',v:'Somatostatina'},{l:'Acción',v:'Inhibe insulina + glucagón'},{l:'Análogos',v:'Octreótido (uso clínico)'}]},

    arteria_pancreatica:{n:'Arterias Pancreáticas',s:'Irrigación Arterial — Doble Origen',
        d:'El páncreas tiene una irrigación arterial dual procedente de dos troncos principales. La cabeza y el proceso uncinado reciben sangre de las arcadas pancreaticoduodenales, formadas por ramas de la arteria gastroduodenal (rama del tronco celíaco) y la arteria mesentérica superior — esta doble irrigación es relevante en el diagnóstico y planeación quirúrgica. El cuerpo y la cola son irrigados por ramas de la arteria esplénica (del tronco celíaco): arteria pancreática dorsal, arteria pancreática transversa y arterias pancreáticas cortas.',
        st:[{l:'Cabeza',v:'A. pancreaticoduodenal'},{l:'Cuerpo/Cola',v:'A. esplénica (ramas)'},{l:'Origen',v:'Tronco celíaco + AMS'},{l:'Relevancia',v:'Planificación quirúrgica'}]},

    vena_mesenterica:{n:'Vena Mesentérica Superior',s:'Drenaje Venoso de Cabeza e Intestino',
        d:'La vena mesentérica superior (VMS) recorre el borde derecho del cuello pancreático, en íntimo contacto con la cara posterior del cuello y el proceso uncinado. Drena el intestino delgado, el colon derecho y parte de la cabeza pancreática. Su confluencia con la vena esplénica, posterior al cuello pancreático, forma la vena porta. La infiltración de la VMS por adenocarcinoma pancreático es un criterio de irresecabilidad vascular — valorada con TAC o ecoendoscopia.',
        st:[{l:'Relación',v:'Borde dcho. del cuello'},{l:'Confluencia',v:'Con v. esplénica → porta'},{l:'Drena',v:'Intestino + colon derecho'},{l:'Infiltración',v:'Criterio de irresecabilidad'}]},

    vena_esplenica:{n:'Vena Esplénica',s:'Drenaje Venoso de Cuerpo y Cola',
        d:'La vena esplénica recorre la cara posterior del cuerpo y la cola pancreáticas, íntimamente adherida al parénquima. Recibe múltiples venas pancreáticas cortas directamente del parénquima, así como la vena mesentérica inferior (que drena el colon izquierdo). Su unión con la vena mesentérica superior forma la vena porta. La trombosis de la vena esplénica (secundaria a pancreatitis o tumores) puede causar hipertensión portal segmentaria con varices gástricas, tratable con esplenectomía.',
        st:[{l:'Relación',v:'Cara posterior cuerpo-cola'},{l:'Tributarias',v:'V. mesentérica inferior'},{l:'Confluencia',v:'Con VMS → vena porta'},{l:'Trombosis',v:'HTP segmentaria + varices gástricas'}]},

    inervacion_p:{n:'Inervación Pancreática',s:'Sistema Nervioso Autónomo + Entérico',
        d:'El páncreas recibe inervación autónoma a través del plexo celíaco (plexo solar). Las fibras simpáticas preganglionares provienen de T5-T10, sinaptando en el ganglio celíaco, con fibras posganglionares vasoconstrictoras e inhibidoras de la secreción. Las fibras parasimpáticas provienen del nervio vago (NC X), estimulando la secreción exocrina y endocrina. El dolor pancreático (pancreatitis, cáncer) se transmite por fibras aferentes simpáticas → ganglio celíaco → T5-T10, lo que explica el dolor irradiado en banda hacia la espalda.',
        st:[{l:'Simpático',v:'T5-T10 → ganglio celíaco'},{l:'Parasimpático',v:'NC X (nervio vago)'},{l:'Dolor referido',v:'Espalda (T5-T10, "en banda")'},{l:'Bloqueo',v:'Neurólisis del plexo celíaco'}]},

    regulacion:{n:'Regulación Glucémica',s:'Eje Insulina-Glucagón — Homeostasis de Glucosa',
        d:'Los islotes de Langerhans regulan la glucemia mediante un balance preciso entre insulina y glucagón. Tras una comida, la hiperglucemia estimula las células β → insulina → captación de glucosa por músculo y tejido adiposo, glucogénesis y lipogénesis hepática. En ayuno, la hipoglucemia estimula las células α → glucagón → glucogenólisis y gluconeogénesis hepática. La somatostatina (células δ) actúa como freno paracrino de ambas hormonas. La diabetes mellitus tipo 2 se caracteriza por resistencia a la insulina + disfunción progresiva de células β.',
        st:[{l:'Postprandial',v:'Insulina (células β)'},{l:'Ayuno',v:'Glucagón (células α)'},{l:'Regulador',v:'Somatostatina (células δ)'},{l:'DM tipo 2',v:'Resistencia + disfunción β'}]}
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
