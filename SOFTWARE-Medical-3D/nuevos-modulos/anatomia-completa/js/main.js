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
scene.background=new THREE.Color(0xf6f3f0);
scene.fog=new THREE.FogExp2(0xf6f3f0, 0.014);

const camera=new THREE.PerspectiveCamera(40, innerWidth/(innerHeight-52), 0.01, 200);
camera.position.set(0, 1.0, 5.5);

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
ctrl.minDistance=1.5; ctrl.maxDistance=20;
ctrl.target.set(0, 0, 0);
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.30;

// ===== ENVIRONMENT =====
setLoad(20,'Generando environment...');
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
            vec3 c=mix(vec3(.94,.90,.88),mix(vec3(.97,.93,.91),vec3(.99,.96,.94),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(1.0,.90,.85)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.4)))),8.)*.14;
            c+=vec3(.88,.82,.80)*pow(max(0.,dot(d,normalize(vec3(-.6,.3,-.5)))),5.)*.09;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

// ===== LIGHTING =====
setLoad(30,'Iluminación...');
scene.add(new THREE.HemisphereLight(0xfff0ea, 0xddccbb, 1.0));

const keyLight=new THREE.DirectionalLight(0xfff8f5, 3.4);
keyLight.position.set(3,6,5); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=30;
keyLight.shadow.camera.left=-6; keyLight.shadow.camera.right=6;
keyLight.shadow.camera.top=8; keyLight.shadow.camera.bottom=-6;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xffddd0, 1.2);
fillLight.position.set(-5,3,-2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xfff5f0, 1.4);
rimLight.position.set(-2,-1,-5); scene.add(rimLight);

// SSS key — warm light from front simulating skin subsurface
const sssLight=new THREE.PointLight(0xff9977, 0.60, 12);
sssLight.position.set(1,2,3); scene.add(sssLight);

// Back SSS — backlit translucency (ears, hands)
const backSSS=new THREE.PointLight(0xff7755, 0.35, 10);
backSSS.position.set(-1,1,-4); scene.add(backSSS);

const topLight=new THREE.PointLight(0xffffff, 0.90, 18);
topLight.position.set(0,7,3); scene.add(topLight);

// ===== POST-PROCESSING =====
setLoad(40,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));

const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.07,0.42,0.90);
composer.addPass(bloom);

// SSS shader tuned for human skin tones
const cgShader={
    uniforms:{tDiffuse:{value:null},sss:{value:0.30},vign:{value:0.82}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sss;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.299,.587,.114));
    float sm=smoothstep(.40,.70,lum)*(1.-smoothstep(.70,.96,lum));
    c+=vec3(.75,.30,.20)*sss*sm*.08;
    c=(c-.5)*1.04+.5;
    vec2 u=vUv*2.-1.;float dist=dot(u,u);
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
composer.addPass(new SMAAPass(innerWidth,innerHeight));

// ===== LOAD MODEL =====
setLoad(50,'Cargando modelo anatómico...');
let model=null;
let meshes=[];

new GLTFLoader().load('anatomiahumada3d.glb',
    (gltf)=>{
        setLoad(80,'Mejorando materiales...');
        model=gltf.scene;

        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        // Scale to ~3.5 units tall (human body proportions)
        const sc=3.8/Math.max(size.x,size.y,size.z);
        model.scale.setScalar(sc);
        const sb=new THREE.Box3().setFromObject(model);
        model.position.sub(sb.getCenter(new THREE.Vector3()));

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            meshes.push(child);

            const mat=child.material;

            // anatomiahumada3d.glb: single mesh, tripo_mat, only baseColor texture.
            // rough=0.9, metal=0, OPAQUE. Multi-region baked texture with
            // skin/muscle/organ colors. Upgrade to MeshPhysicalMaterial with
            // strong skin SSS properties.
            const pm=new THREE.MeshPhysicalMaterial();

            if(mat.map)   { pm.map = mat.map; }
            if(mat.color) { pm.color.copy(mat.color); }

            // Human body surface — skin + exposed anatomy
            pm.roughness = 0.68;
            pm.metalness = 0.0;

            // Subtle skin wetness/sheen
            pm.clearcoat = 0.18;
            pm.clearcoatRoughness = 0.60;

            // Strong skin SSS — characteristic warm subsurface glow
            pm.sheen = 0.45;
            pm.sheenRoughness = 0.42;
            pm.sheenColor = new THREE.Color(0.88, 0.45, 0.30);

            // Subsurface depth — warm red-orange attenuation
            pm.thickness = 1.2;
            pm.attenuationColor = new THREE.Color(0.80, 0.28, 0.18);
            pm.attenuationDistance = 1.2;

            // Warm skin-like emissive base
            pm.emissive = new THREE.Color(0.06, 0.02, 0.01);
            pm.emissiveIntensity = 0.12;
            pm.envMapIntensity = 0.40;

            pm.transparent = false;
            pm.opacity = 1.0;
            pm.side = THREE.FrontSide;
            child.material = pm;
        });

        scene.add(model);

        // Ground plane
        const gnd=new THREE.Mesh(new THREE.PlaneGeometry(24,24),
            new THREE.MeshStandardMaterial({color:0xede8e4,roughness:0.96,transparent:true,opacity:0.55}));
        gnd.rotation.x=-Math.PI/2;
        const sb2=new THREE.Box3().setFromObject(model);
        gnd.position.y=sb2.min.y-0.04;
        gnd.receiveShadow=true;
        scene.add(gnd);

        // Adjust camera to frame full body
        const sb3=new THREE.Box3().setFromObject(model);
        const h=sb3.max.y-sb3.min.y;
        camera.position.set(0, h*0.5+sb3.min.y, h*1.3);
        ctrl.target.set(0, sb3.min.y+h*0.5, 0);
        ctrl.update();

        setLoad(100,'¡Listo!');
        setTimeout(()=>ls.classList.add('hidden'),500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1024|0)+'KB')},
    e=>{console.error(e); setLoad(0,'Error: verifica que anatomiahumada3d.glb esté en la misma carpeta.')}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS'; fc=0; lt=t;}
    ctrl.update();
    sssLight.intensity=0.60+Math.sin(t*0.0008)*0.10;
    backSSS.intensity=0.35+Math.cos(t*0.0007)*0.07;
    topLight.intensity=0.60+Math.cos(t*0.0009)*0.05;
    composer.render();
})(0);

addEventListener('resize',()=>{
    const w=innerWidth,h=innerHeight-52;
    camera.aspect=w/h; camera.updateProjectionMatrix();
    renderer.setSize(w,h); composer.setSize(w,h); bloom.setSize(w,h);
});

// ===== CONTROLS =====
let ar=true;
$('bRot').onclick=e=>{ar=!ar; ctrl.autoRotate=ar; e.currentTarget.classList.toggle('active',ar)};
$('bRst').onclick=()=>{
    if(model){
        const sb=new THREE.Box3().setFromObject(model);
        const h=sb.max.y-sb.min.y;
        camera.position.set(0,sb.min.y+h*0.5,h*1.3);
        ctrl.target.set(0,sb.min.y+h*0.5,0);
    } else {
        camera.position.set(0,1,5.5); ctrl.target.set(0,0,0);
    }
};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.15);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(0.6))};
$('bFr').onclick=()=>{
    if(model){const sb=new THREE.Box3().setFromObject(model);const h=sb.max.y-sb.min.y;const cy=sb.min.y+h*0.5;camera.position.set(0,cy,h*1.3);ctrl.target.set(0,cy,0);}
};
$('bTo').onclick=()=>{
    if(model){const sb=new THREE.Box3().setFromObject(model);const cy=sb.min.y+(sb.max.y-sb.min.y)*0.5;camera.position.set(0,cy+6,0.01);ctrl.target.set(0,cy,0);}
};
$('bSi').onclick=()=>{
    if(model){const sb=new THREE.Box3().setFromObject(model);const h=sb.max.y-sb.min.y;const cy=sb.min.y+h*0.5;camera.position.set(h*1.3,cy,0);ctrl.target.set(0,cy,0);}
};
$('bBk').onclick=()=>{
    if(model){const sb=new THREE.Box3().setFromObject(model);const h=sb.max.y-sb.min.y;const cy=sb.min.y+h*0.5;camera.position.set(0,cy,-h*1.3);ctrl.target.set(0,cy,0);}
};
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
        if(sel==='all'){
            mat.emissive.setRGB(0.06,0.02,0.01); mat.emissiveIntensity=0.12;
        } else if(sel==='esqueleto'){
            mat.emissive.setRGB(0.10,0.10,0.08); mat.emissiveIntensity=0.22;
        } else if(sel==='muscular'){
            mat.emissive.setRGB(0.18,0.04,0.03); mat.emissiveIntensity=0.24;
        } else if(sel==='articulaciones'){
            mat.emissive.setRGB(0.06,0.10,0.14); mat.emissiveIntensity=0.20;
        } else if(sel==='cartilago'){
            mat.emissive.setRGB(0.04,0.12,0.10); mat.emissiveIntensity=0.18;
        } else if(sel==='corazon'){
            mat.emissive.setRGB(0.24,0.02,0.02); mat.emissiveIntensity=0.32;
        } else if(sel==='arterias'){
            mat.emissive.setRGB(0.22,0.02,0.02); mat.emissiveIntensity=0.28;
        } else if(sel==='venas'){
            mat.emissive.setRGB(0.02,0.04,0.22); mat.emissiveIntensity=0.24;
        } else if(sel==='linfatico'){
            mat.emissive.setRGB(0.04,0.18,0.10); mat.emissiveIntensity=0.22;
        } else if(sel==='pulmones'){
            mat.emissive.setRGB(0.20,0.08,0.06); mat.emissiveIntensity=0.26;
        } else if(sel==='traquea'){
            mat.emissive.setRGB(0.06,0.12,0.18); mat.emissiveIntensity=0.20;
        } else if(sel==='diafragma'){
            mat.emissive.setRGB(0.14,0.06,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='esofago'){
            mat.emissive.setRGB(0.14,0.06,0.05); mat.emissiveIntensity=0.20;
        } else if(sel==='intestinos'){
            mat.emissive.setRGB(0.16,0.08,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='higado'){
            mat.emissive.setRGB(0.14,0.05,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='pancreas'){
            mat.emissive.setRGB(0.16,0.10,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='encefalo'){
            mat.emissive.setRGB(0.14,0.10,0.08); mat.emissiveIntensity=0.22;
        } else if(sel==='medulaEspinal'){
            mat.emissive.setRGB(0.12,0.09,0.06); mat.emissiveIntensity=0.20;
        } else if(sel==='nerviosPerifericos'){
            mat.emissive.setRGB(0.14,0.12,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='rinones'){
            mat.emissive.setRGB(0.16,0.04,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='vejiga'){
            mat.emissive.setRGB(0.14,0.10,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='hipofisis'){
            mat.emissive.setRGB(0.14,0.06,0.14); mat.emissiveIntensity=0.22;
        } else if(sel==='tiroidea'){
            mat.emissive.setRGB(0.06,0.14,0.16); mat.emissiveIntensity=0.20;
        } else if(sel==='suprarrenales'){
            mat.emissive.setRGB(0.16,0.12,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='piel'){
            mat.emissive.setRGB(0.12,0.06,0.04); mat.emissiveIntensity=0.18;
        } else {
            mat.emissive.setRGB(0.06,0.03,0.02); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{n:'Cuerpo Humano',s:'Anatomía Sistémica — Visión General',
        d:'El cuerpo humano adulto está compuesto por ~37 trillones de células organizadas en 4 tipos de tejidos básicos (epitelial, conjuntivo, muscular y nervioso), formando 11 sistemas orgánicos interconectados. Su homeostasis es mantenida por la integración funcional de todos sus sistemas bajo control nervioso y endocrino.',
        st:[{l:'Células totales',v:'~37 billones'},{l:'Genes codif.',v:'~20,000'},{l:'Huesos adulto',v:'206'},{l:'Músculos',v:'~600–650'}]},

    esqueleto:{n:'Esqueleto Humano',s:'Sistema Esquelético — 206 Huesos',
        d:'El esqueleto adulto consta de 206 huesos (el neonato tiene ~270, que se fusionan). Se divide en esqueleto axial (80 huesos: cráneo, columna vertebral, costillas, esternón) y apendicular (126 huesos: cintura escapular, miembros superiores, cintura pélvica, miembros inferiores). Los huesos son órganos vivos: almacenan calcio/fósforo, producen células sanguíneas (médula ósea roja) y se remodela continuamente por osteoblastos y osteoclastos.',
        st:[{l:'Huesos totales',v:'206 (adulto)'},{l:'Huesos neonato',v:'~270'},{l:'Axial',v:'80 huesos'},{l:'Apendicular',v:'126 huesos'}]},

    muscular:{n:'Sistema Muscular',s:'~600–650 Músculos Esqueléticos',
        d:'El cuerpo humano tiene ~600-650 músculos esqueléticos (estriados voluntarios), además del músculo cardíaco y la musculatura lisa visceral. Los músculos esqueléticos se insertan en el hueso mediante tendones (colágeno tipo I). Producen movimiento, mantienen la postura, generan calor (termogénesis: ~40% del calor corporal) y participan en la respiración, deglución y fonación. El músculo más grande es el glúteo mayor; el más pequeño el estapedio (oído medio).',
        st:[{l:'Músculos esqueléticos',v:'~600–650'},{l:'Termogénesis',v:'~40% calor corporal'},{l:'Mayor músculo',v:'Glúteo mayor'},{l:'Menor músculo',v:'Estapedio (oído medio)'}]},

    articulaciones:{n:'Articulaciones',s:'Uniones entre Huesos — Biomecánica',
        d:'Las articulaciones se clasifican por movilidad: sinartrosis (inmóviles: suturas craneales), anfiartrosis (semimóviles: sínfisis púbica, discos intervertebrales) y diartrosis (móviles: la mayoría). Las diartrosis tienen cavidad articular con líquido sinovial, cartílago hialino, cápsula y ligamentos. Tipos: esféricas (cadera, hombro — 3 ejes), bisagra (codo, rodilla — 1 eje), en silla de montar (trapecio-metacarpiano — 2 ejes), pivote (atlanto-axoidea — rotación).',
        st:[{l:'Tipos',v:'Sinartrosis, anfiartrosis, diartrosis'},{l:'Líquido sinovial',v:'Nutrición + lubricación'},{l:'Mayor articulación',v:'Rodilla (femorotibial)'},{l:'Más móvil',v:'Hombro (glenohumeral)'}]},

    cartilago:{n:'Tejido Cartilaginoso',s:'Tejido Conjuntivo de Soporte Avascular',
        d:'El cartílago es un tejido conjuntivo especializado sin vasos ni nervios, nutrido por difusión desde el pericondrio o el líquido sinovial. Tipos: hialino (articular, costal, laringe, tráquea — más abundante), elástico (pabellón auricular, epiglotis — flexible) y fibrocartílago (discos intervertebrales, meniscos, sínfisis púbica — máxima resistencia). La avasculariedad limita su capacidad de reparación.',
        st:[{l:'Tipos',v:'Hialino, elástico, fibrocartílago'},{l:'Nutrición',v:'Por difusión (avascular)'},{l:'Reparación',v:'Muy limitada'},{l:'Disco intervert.',v:'Fibrocartílago (alta presión)'}]},

    corazon:{n:'Corazón',s:'Sistema Cardiovascular — Bomba Central',
        d:'El corazón es una bomba muscular de ~300 g ubicada en el mediastino medio, ligeramente hacia la izquierda. Tiene 4 cámaras: 2 aurículas (recepción) y 2 ventrículos (eyección). El ventrículo izquierdo (pared ~9-12 mm) eyecta sangre oxigenada a la aorta; el derecho (pared ~3-5 mm) a la arteria pulmonar. Gasto cardíaco en reposo: ~5 L/min. Bombea ~7,000 L/día. El sistema de conducción (nódulo SA → AV → fascículo de His → fibras de Purkinje) genera el ritmo de 60-100 lpm.',
        st:[{l:'Peso',v:'~300 g'},{l:'Gasto cardíaco',v:'~5 L/min en reposo'},{l:'Frecuencia',v:'60–100 lpm'},{l:'Litros/día',v:'~7,000 L bombeados'}]},

    arterias:{n:'Arterias',s:'Vasos que Llevan Sangre desde el Corazón',
        d:'Las arterias llevan sangre desde el corazón hacia los tejidos (oxigenada en circulación sistémica, desoxigenada en pulmonar). La aorta (~2.5 cm diámetro) es la mayor arteria del cuerpo. La pared arterial tiene 3 capas: íntima (endotelio), media (músculo liso + elastina — mayor en arterias elásticas como aorta) y adventicia (tejido conjuntivo). La arteria más larga es la femoral; la aterosclerosis (placa en íntima/media) es la enfermedad cardiovascular más prevalente.',
        st:[{l:'Arteria mayor',v:'Aorta (~2.5 cm Ø)'},{l:'Capas pared',v:'Íntima, media, adventicia'},{l:'Arteria más larga',v:'Femoral'},{l:'Patología #1',v:'Aterosclerosis'}]},

    venas:{n:'Venas',s:'Vasos que Retornan Sangre al Corazón',
        d:'Las venas retornan la sangre de los tejidos al corazón. Tienen paredes más delgadas y menor presión que las arterias (~10 mmHg vs ~100 mmHg). Poseen válvulas semilunares que previenen el reflujo (especialmente en miembros inferiores). La vena cava superior (drena cabeza/cuello/MMSS) y la inferior (drena tronco/MMII) desembocan en la aurícula derecha. Las venas albergan el ~70% del volumen sanguíneo total (reservorio de capacitancia).',
        st:[{l:'Presión',v:'~10 mmHg (baja)'},{l:'Válvulas',v:'Previenen reflujo'},{l:'Reservorio',v:'~70% volemia total'},{l:'Trombosis',v:'TVP (MMII más frecuente)'}]},

    linfatico:{n:'Sistema Linfático',s:'Drenaje Tisular e Inmunidad',
        d:'El sistema linfático drena el exceso de líquido intersticial (~2-4 L/día) que no retorna a los capilares venosos, evitando el edema. La linfa viaja por capilares linfáticos → vasos linfáticos (con válvulas) → ganglios linfáticos (filtración inmune) → conducto torácico (izquierdo, drena 3/4 del cuerpo) o conducto linfático derecho → venas subclavias. Los ganglios linfáticos son estaciones de filtración inmune (linfocitos T y B, macrófagos).',
        st:[{l:'Drenaje/día',v:'2–4 L linfa'},{l:'Conducto torácico',v:'Mayor vaso linfático'},{l:'Ganglios totales',v:'~600–700'},{l:'Función',v:'Drenaje + inmunidad'}]},

    pulmones:{n:'Pulmones',s:'Sistema Respiratorio — Intercambio Gaseoso',
        d:'Los pulmones son los órganos del intercambio gaseoso. El pulmón derecho (3 lóbulos: superior, medio, inferior) es mayor que el izquierdo (2 lóbulos: superior e inferior, con língula). Contienen ~300-500 millones de alvéolos con una superficie total de ~70-100 m². La membrana alveolocapilar (~0.5 μm de grosor) permite el intercambio O₂/CO₂. Volumen corriente en reposo: 500 mL; capacidad pulmonar total: ~6 L. Ventilación alveolar: ~4-5 L/min.',
        st:[{l:'Alvéolos',v:'300–500 millones'},{l:'Superficie',v:'~70–100 m²'},{l:'Vol. corriente',v:'~500 mL'},{l:'Cap. total',v:'~6 L'}]},

    traquea:{n:'Tráquea y Árbol Bronquial',s:'Vías Aéreas de Conducción',
        d:'La tráquea (~11 cm, 2 cm diámetro) se bifurca en la carina (T4-T5) en los bronquios principales derecho (más corto y vertical — mayor riesgo de aspiración) e izquierdo. El árbol bronquial se divide sucesivamente: bronquios lobares → segmentarios → subsegmentarios → bronquiolos → bronquiolos terminales → respiratorios → conductos alveolares → alvéolos. La generación 0 (tráquea) a la 23 (sacos alveolares). El epitelio es pseudoestratificado ciliado (escalera mucociliar).',
        st:[{l:'Longitud tráquea',v:'~11 cm'},{l:'Bifurcación',v:'Carina (T4–T5)'},{l:'Generaciones',v:'0–23 (hasta alvéolo)'},{l:'Epitelio',v:'Pseudoestrat. ciliado'}]},

    diafragma:{n:'Diafragma',s:'Principal Músculo Respiratorio',
        d:'El diafragma es un músculo en cúpula que separa el tórax del abdomen y es el principal músculo de la inspiración (~75% del trabajo). Al contraerse, se aplana y desciende, aumentando el volumen torácico y generando presión negativa que infla los pulmones. Tiene tres orificios: hiato aórtico (T12, aorta + conducto torácico), esofágico (T10, esófago + vagos) y de la vena cava (T8, VCI). Inervado por los nervios frénicos (C3-C4-C5).',
        st:[{l:'Función',v:'~75% trabajo inspiratorio'},{l:'Inervación',v:'Nervios frénicos (C3-C5)'},{l:'Orificios',v:'Aórtico, esofágico, VCI'},{l:'Parálisis',v:'Insuficiencia respiratoria'}]},

    esofago:{n:'Esófago y Estómago',s:'Segmento Superior del Tubo Digestivo',
        d:'El esófago (~25 cm) conduce el bolo alimenticio de la faringe al estómago mediante ondas peristálticas. Tiene esfínteres superior (cricofaríngeo) e inferior (cardias). El estómago (~1.5 L capacidad) mezcla y digiere: secreta HCl (células parietales, pH~1-2), factor intrínseco (absorción B12), pepsina (células principales) y moco protector. Las células G del antro secretan gastrina. El vaciado gástrico dura ~4-6 h para una comida mixta.',
        st:[{l:'Longitud esófago',v:'~25 cm'},{l:'Capacidad estómago',v:'~1.5 L'},{l:'pH gástrico',v:'1–2 (HCl)'},{l:'Vaciado',v:'~4–6 h comida mixta'}]},

    intestinos:{n:'Intestinos',s:'Digestión, Absorción y Tránsito',
        d:'El intestino delgado (~6-7 m: duodeno, yeyuno, íleon) es el principal sitio de digestión y absorción. Su mucosa tiene vellosidades con microvellosidades (ribete en cepillo) que aumentan la superficie a ~250 m². Absorbe nutrientes, agua y vitaminas. El intestino grueso (~1.5 m: ciego, colon ascendente/transverso/descendente/sigmoide, recto) reabsorbe agua y electrolitos, alberga la microbiota intestinal (~10¹⁴ microorganismos) y forma/almacena heces.',
        st:[{l:'Intestino delgado',v:'~6–7 m'},{l:'Superficie absorción',v:'~250 m²'},{l:'Intestino grueso',v:'~1.5 m'},{l:'Microbiota',v:'~10¹⁴ microorganismos'}]},

    higado:{n:'Hígado y Vesícula Biliar',s:'Mayor Glándula del Organismo',
        d:'El hígado (~1.5 kg) es la mayor glándula del cuerpo y realiza >500 funciones metabólicas: síntesis proteica (albúmina, factores coagulación), metabolismo de carbohidratos (gluconeogénesis, glucogenogénesis), lípidos (síntesis colesterol, lipoproteínas), detoxificación (citocromo P450), almacenamiento (glucógeno, vitaminas A/D/B12, hierro) y producción de bilis. La vesícula biliar almacena y concentra la bilis (~50 mL). Doble irrigación: arteria hepática + vena porta.',
        st:[{l:'Peso',v:'~1.5 kg'},{l:'Funciones',v:'>500 metabólicas'},{l:'Proteínas',v:'Albúmina + factores coag.'},{l:'Irrigación',v:'Art. hepática + V. porta'}]},

    pancreas:{n:'Páncreas',s:'Glándula Mixta Exocrina y Endocrina',
        d:'El páncreas (~80 g, 15 cm) tiene función exocrina (~98% de la masa): los acinos secretan jugo pancreático rico en enzimas (amilasa, lipasa, proteasas) y bicarbonato al duodeno vía conducto de Wirsung. La función endocrina (~2%: islotes de Langerhans): células β (insulina — hipoglucemiante), α (glucagón — hiperglucemiante), δ (somatostatina) y PP (polipéptido pancreático). La diabetes tipo 1 es una destrucción autoinmune de células β; tipo 2, resistencia a la insulina.',
        st:[{l:'Peso',v:'~80 g'},{l:'Función exocrina',v:'~98% (amilasa, lipasa)'},{l:'Células β',v:'Insulina (islotes Langerhans)'},{l:'DM tipo 1',v:'Destrucción autoinmune β'}]},

    encefalo:{n:'Encéfalo',s:'Sistema Nervioso Central — Centro Integrador',
        d:'El encéfalo (~1,400 g) incluye el cerebro (corteza cerebral, ganglios basales, sistema límbico), el cerebelo y el tronco encefálico (mesencéfalo, protuberancia, bulbo). La corteza cerebral tiene ~16 mil millones de neuronas y ~100-500 billones de sinapsis. Consume el 20% del O₂ y glucosa del organismo (a pesar de ser el 2% del peso corporal). El liquido cefalorraquídeo (~150 mL) protege y nutre el SNC.',
        st:[{l:'Peso',v:'~1,400 g'},{l:'Neuronas corticales',v:'~16 mil millones'},{l:'Consumo O₂',v:'20% del total'},{l:'LCR',v:'~150 mL'}]},

    medulaEspinal:{n:'Médula Espinal',s:'Conducción y Reflejos Medulares',
        d:'La médula espinal (~45 cm, ~30 g) es la extensión caudal del SNC, alojada en el canal vertebral desde C1 hasta L1-L2 (cono medular). Da origen a 31 pares de nervios espinales (8 cervicales, 12 torácicos, 5 lumbares, 5 sacros, 1 coccígeo). La sustancia gris (en forma de H) contiene los cuerpos neuronales; la blanca los fascículos de axones ascendentes (sensoriales) y descendentes (motores). Sede de los arcos reflejos medulares.',
        st:[{l:'Longitud',v:'~45 cm'},{l:'Peso',v:'~30 g'},{l:'Nervios espinales',v:'31 pares'},{l:'Termina en',v:'L1–L2 (cono medular)'}]},

    nerviosPerifericos:{n:'Nervios Periféricos',s:'Sistema Nervioso Periférico',
        d:'El sistema nervioso periférico (SNP) incluye 12 pares de nervios craneales y 31 pares de nervios espinales, junto con los ganglios autónomos. Los nervios periféricos contienen axones mielinizados (conducción rápida: 70-120 m/s) y amielínicos (conducción lenta: 0.5-2 m/s). La vaina de mielina es producida por células de Schwann en el SNP (oligodendrocitos en el SNC). La neuropatía periférica más frecuente es la diabética (polineuropatía distal simétrica).',
        st:[{l:'Nervios craneales',v:'12 pares'},{l:'Nervios espinales',v:'31 pares'},{l:'Velocidad mielínica',v:'70–120 m/s'},{l:'Neuropatía #1',v:'Diabética (polineuropatía)'}]},

    rinones:{n:'Riñones',s:'Sistema Urinario — Filtración y Homeostasis',
        d:'Los riñones (~150 g c/u) filtran ~180 L de plasma/día, produciendo ~1.5 L de orina. Cada riñón contiene ~1 millón de nefronas (glomérulo + túbulo). Funciones: filtración, reabsorción (99% del filtrado), secreción, regulación del pH y osmolaridad, producción de eritropoyetina (EPO) y activación de vitamina D (1,25-OH-D3). El sistema renina-angiotensina-aldosterona (RAAS) regula la presión arterial y el volumen extracelular.',
        st:[{l:'Filtración/día',v:'~180 L plasma'},{l:'Orina/día',v:'~1.5 L'},{l:'Nefronas/riñón',v:'~1 millón'},{l:'Hormonas',v:'EPO + vitamina D activa'}]},

    vejiga:{n:'Vejiga Urinaria',s:'Reservorio y Control de la Micción',
        d:'La vejiga urinaria es un órgano muscular hueco (músculo detrusor, epitelio transicional o urotelio) con capacidad funcional de ~400-500 mL. Recibe la orina de los uréteres y la expulsa por la uretra bajo control voluntario (esfínter externo, somático) e involuntario (esfínter interno, simpático). El reflejo miccional involucra la médula sacra (S2-S4) y centros pontinos. La vejiga neurógena aparece en lesiones medulares.',
        st:[{l:'Capacidad',v:'~400–500 mL'},{l:'Músculo',v:'Detrusor (músculo liso)'},{l:'Epitelio',v:'Urotelio (transicional)'},{l:'Control miccional',v:'S2–S4 (reflejo sacro)'}]},

    hipofisis:{n:'Hipófisis e Hipotálamo',s:'Eje Neuroendocrino Central',
        d:'La hipófisis (~0.6 g) es la "glándula maestra" del sistema endocrino. Se divide en adenohipófisis (anterior: GH, TSH, ACTH, FSH, LH, prolactina) y neurohipófisis (posterior: ADH/vasopresina y oxitocina — producidas en el hipotálamo). El hipotálamo integra señales neurales y endocrinas, regulando la temperatura, el sueño, el hambre, la sed y el eje hipotálamo-hipofiso-adrenal/tiroideo/gonadal mediante hormonas liberadoras (CRH, TRH, GnRH, GHRH) e inhibidoras.',
        st:[{l:'Peso hipófisis',v:'~0.6 g'},{l:'Adenohipófisis',v:'GH, TSH, ACTH, FSH, LH, PRL'},{l:'Neurohipófisis',v:'ADH + oxitocina'},{l:'Hipotálamo',v:'Integración neuroendocrina'}]},

    tiroidea:{n:'Tiroides y Paratiroides',s:'Metabolismo Basal y Calcio',
        d:'La glándula tiroides (~25 g) produce T3 (triyodotironina, activa) y T4 (tiroxina, precursor) bajo estímulo de la TSH hipofisaria. Regulan el metabolismo basal, el crecimiento, la termogénesis y el desarrollo del SNC fetal. Las 4 glándulas paratiroides (~30 mg c/u) secretan PTH (parathormona), que eleva el calcio sérico: activa osteoclastos, aumenta reabsorción renal de Ca²⁺ y estimula la síntesis renal de vitamina D activa.',
        st:[{l:'Peso tiroides',v:'~25 g'},{l:'Hormonas',v:'T3 (activa) + T4'},{l:'Paratiroides',v:'4 glándulas (~30 mg c/u)'},{l:'PTH',v:'↑ Calcemia por 3 vías'}]},

    suprarrenales:{n:'Glándulas Suprarrenales',s:'Respuesta al Estrés y Homeostasis Metabólica',
        d:'Las glándulas suprarrenales (~4-5 g c/u) se ubican sobre los riñones y tienen dos compartimentos funcionales distintos: la corteza (origen mesodérmico, bajo control de ACTH) produce glucocorticoides (cortisol — respuesta al estrés, antiinflamatorio), mineralocorticoides (aldosterona — retención Na⁺/K⁺) y andrógenos suprarrenales (DHEA). La médula (origen neuroectodérmico, tejido cromafín) produce catecolaminas: adrenalina (80%) y noradrenalina (20%).',
        st:[{l:'Peso',v:'~4–5 g c/u'},{l:'Corteza',v:'Cortisol, aldosterona, DHEA'},{l:'Médula',v:'Adrenalina 80% + NA 20%'},{l:'Control',v:'ACTH (corteza) / SNA (médula)'}]},

    piel:{n:'Piel y Faneras',s:'Sistema Tegumentario — Mayor Órgano del Cuerpo',
        d:'La piel es el mayor órgano del cuerpo (~2 m², 3.5-10 kg). Consta de epidermis (epitelio escamoso estratificado queratinizado, 4-5 capas: basal, espinosa, granulosa, lúcida, córnea), dermis (tejido conjuntivo denso con colágeno/elastina, vasos, nervios, anejos) e hipodermis (tejido adiposo). Funciones: barrera física, termorregulación, síntesis de vitamina D, sensación, impermeabilización y defensa inmune (células de Langerhans). Las faneras incluyen pelo, uñas y glándulas (sudoríparas, sebáceas).',
        st:[{l:'Superficie',v:'~2 m²'},{l:'Peso',v:'~3.5–10 kg'},{l:'Capas',v:'Epidermis, dermis, hipodermis'},{l:'Síntesis',v:'Vitamina D (UVB)'}]}
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