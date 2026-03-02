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
setLoad(50,'Cargando modelo auditivo...');
let model=null;
let meshes=[];

new GLTFLoader().load('oidos-anatomia.glb',
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

            // Cartilage / pabellon / skin
            const isCartilage=/(cartilage|cartilag|pabellon|auricle|auricula|ear|skin|piel|helix|antihelix|tragus|lobule|lobulo)/i.test(combined);
            // Bone / temporal / tympanic
            const isBone=/(bone|hueso|temporal|tympan|mastoid|alveol|cortical|petrosa)/i.test(combined);
            // Ossicles (small bones)
            const isOssicle=/(malleus|incus|stapes|martillo|yunque|estribo|ossicle|huesecillo)/i.test(combined);
            // Membrane (tympanic, basilar, Reissner)
            const isMembrane=/(membran|tympan|timpan|basilar|reissner|oval|round|window|ventana)/i.test(combined);
            // Cochlea / snail shaped
            const isCochlea=/(cochlea|coclea|caracol|scala|ramp)/i.test(combined);
            // Nerve
            const isNerve=/(nerve|nervio|neural|cochlear|vestibular|acoustic)/i.test(combined);
            // Fluid / endolymph
            const isFluid=/(endolymph|perilymph|linfa|fluid|liquido)/i.test(combined);
            // Eustachian / tube
            const isTube=/(eustach|tuba|tube|trompa)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat){
                if(mat.map) pm.map=mat.map;
                if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.4,1.4);}
                if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
                if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;
                if(mat.color) pm.color.copy(mat.color);
            }

            if(isCartilage){
                pm.roughness=0.60; pm.metalness=0;
                pm.sheen=0.30; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.82,0.70,0.60);
                pm.clearcoat=0.10; pm.clearcoatRoughness=0.50;
                pm.thickness=0.6; pm.attenuationColor=new THREE.Color(0.90,0.75,0.65);
                pm.attenuationDistance=0.8;
                pm.emissive=new THREE.Color(0.06,0.04,0.03); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.30;
            } else if(isOssicle){
                pm.roughness=0.28; pm.metalness=0.05;
                pm.clearcoat=0.80; pm.clearcoatRoughness=0.12;
                pm.emissive=new THREE.Color(0.04,0.04,0.02); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.70;
            } else if(isBone){
                pm.roughness=0.72; pm.metalness=0;
                pm.clearcoat=0.05; pm.clearcoatRoughness=0.70;
                pm.emissive=new THREE.Color(0.03,0.04,0.05); pm.emissiveIntensity=0.06;
                pm.envMapIntensity=0.25;
            } else if(isMembrane){
                pm.roughness=0.38; pm.metalness=0;
                pm.transmission=0.12; pm.thickness=0.1;
                pm.clearcoat=0.60; pm.clearcoatRoughness=0.20;
                pm.ior=1.45;
                pm.attenuationColor=new THREE.Color(0.95,0.88,0.80);
                pm.attenuationDistance=0.3;
                pm.emissive=new THREE.Color(0.05,0.04,0.03); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.55;
            } else if(isCochlea){
                pm.roughness=0.55; pm.metalness=0;
                pm.clearcoat=0.15; pm.clearcoatRoughness=0.40;
                pm.sheen=0.20; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.75,0.65,0.80);
                pm.emissive=new THREE.Color(0.06,0.04,0.08); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.40;
            } else if(isNerve){
                pm.roughness=0.60; pm.metalness=0;
                pm.sheen=0.40; pm.sheenRoughness=0.45;
                pm.sheenColor=new THREE.Color(0.75,0.88,0.60);
                pm.emissive=new THREE.Color(0.05,0.10,0.03); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.25;
            } else if(isFluid){
                pm.roughness=0.10; pm.metalness=0;
                pm.transmission=0.70; pm.thickness=0.4;
                pm.ior=1.33;
                pm.attenuationColor=new THREE.Color(0.72,0.90,0.88);
                pm.attenuationDistance=0.5;
                pm.clearcoat=0.90; pm.clearcoatRoughness=0.05;
                pm.emissive=new THREE.Color(0.02,0.10,0.09); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.80;
            } else if(isTube){
                pm.roughness=0.65; pm.metalness=0;
                pm.sheen=0.22; pm.sheenRoughness=0.60;
                pm.sheenColor=new THREE.Color(0.80,0.65,0.65);
                pm.emissive=new THREE.Color(0.08,0.04,0.04); pm.emissiveIntensity=0.09;
                pm.envMapIntensity=0.20;
            } else {
                // Default
                pm.roughness=mat&&mat.roughness!=null?mat.roughness:0.55;
                pm.metalness=mat&&mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.12; pm.clearcoatRoughness=0.45;
                pm.sheen=0.18; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.80,0.75,0.70);
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
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que oidos-anatomia.glb esté en la misma carpeta.')}
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
        } else if(sel==='pabellon'||sel==='conducto'){
            mat.emissive.setRGB(0.10,0.07,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='timpano'){
            mat.emissive.setRGB(0.10,0.08,0.05); mat.emissiveIntensity=0.22;
        } else if(sel==='martillo'||sel==='yunque'||sel==='estribo'){
            mat.emissive.setRGB(0.08,0.07,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='trompa'||sel==='caja'){
            mat.emissive.setRGB(0.10,0.05,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='coclea'){
            mat.emissive.setRGB(0.08,0.04,0.12); mat.emissiveIntensity=0.22;
        } else if(sel==='canales'||sel==='utriculo'){
            mat.emissive.setRGB(0.04,0.07,0.14); mat.emissiveIntensity=0.20;
        } else if(sel==='ventanas'){
            mat.emissive.setRGB(0.08,0.08,0.08); mat.emissiveIntensity=0.18;
        } else if(sel==='organo'){
            mat.emissive.setRGB(0.04,0.14,0.06); mat.emissiveIntensity=0.22;
        } else if(sel==='endolinfa'){
            mat.emissive.setRGB(0.03,0.14,0.13); mat.emissiveIntensity=0.20;
        } else if(sel==='membrana'){
            mat.emissive.setRGB(0.06,0.10,0.10); mat.emissiveIntensity=0.18;
        } else if(sel==='nervio'){
            mat.emissive.setRGB(0.05,0.12,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='vascular'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='musculillos'){
            mat.emissive.setRGB(0.12,0.09,0.02); mat.emissiveIntensity=0.18;
        } else {
            mat.emissive.setRGB(0.04,0.05,0.08); mat.emissiveIntensity=0.12;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{
        n:'Sistema Auditivo Humano',
        s:'Sistema Sensorial — Audición y Equilibrio',
        d:'El sistema auditivo humano transforma las ondas mecánicas del ambiente en impulsos nerviosos que el cortex auditivo primario (área de Brodmann 41-42) interpreta como sonido. Se divide funcionalmente en tres segmentos: oído externo (captación y conducción), oído medio (amplificación mecánica) y oído interno (transducción electroquímica). El aparato vestibular del oído interno regula además el equilibrio y la orientación espacial mediante la detección de aceleraciones lineales y angulares.',
        st:[{l:'Rango frecuencial',v:'20–20,000 Hz'},{l:'Umbral auditivo',v:'0 dB SPL (~20 µPa)'},{l:'Huesecillos',v:'3 (más pequeños del cuerpo)'},{l:'Células ciliadas',v:'~15,500 por oído'}]
    },
    pabellon:{
        n:'Pabellón Auricular',
        s:'Oído Externo — Captador de Ondas Sonoras',
        d:'El pabellón auricular (aurícula) es la porción visible del oído externo, compuesta de cartílago elástico recubierto por pericondrio y piel. Sus relieves — hélix, antihélix, trago, antitrago y lóbulo — actúan como colector acústico que dirige las ondas sonoras hacia el conducto auditivo externo. Su forma asimétrica e irregular favorece la localización espacial del sonido, especialmente en el plano vertical. El lóbulo carece de cartílago y está formado solo por tejido fibroadiposo. Inervado por el nervio auricular mayor (C2-C3) y ramas del NC V3, VII y X.',
        st:[{l:'Cartílago',v:'Elástico (tipo I y II)'},{l:'Localización',v:'Plano vertical (HRTF)'},{l:'Inervación',v:'NC V3, VII, X + C2-C3'},{l:'Lóbulo',v:'Sin cartílago'}]
    },
    conducto:{
        n:'Conducto Auditivo Externo (CAE)',
        s:'Oído Externo — Canal de Conducción Acústica',
        d:'El conducto auditivo externo (CAE) es un tubo de ~2.5 cm de longitud y ~0.7 cm de diámetro que conecta el pabellón con la membrana timpánica. Su tercio externo es fibrocartilaginoso y su porción interna es ósea (parte del temporal). Las glándulas ceruminosas (apócrinas modificadas) del tercio externo secretan cerumen, que lubrica el canal y atrapa partículas. Actúa como resonador acústico con frecuencia natural de ~3,400 Hz, amplificando sonidos en ese rango. La temperatura constante (~37°C) protege la membrana timpánica.',
        st:[{l:'Longitud',v:'~2.5 cm'},{l:'Resonancia',v:'~3,400 Hz'},{l:'Cerumen',v:'Glándulas apócrinas mod.'},{l:'Porción ósea',v:'Hueso temporal'}]
    },
    timpano:{
        n:'Membrana Timpánica',
        s:'Límite Oído Externo / Medio — Transductor Mecánico',
        d:'La membrana timpánica (tímpano) es una estructura semitransparente de ~55 mm² de superficie y ~0.1 mm de grosor, formada por tres capas: epidermis (externa), capa fibrosa media (fibras radiales y circulares que le dan tensión y elasticidad) y mucosa (interna). Convierte las variaciones de presión sonora en vibraciones mecánicas transmitidas al martillo. Su porción tensa (pars tensa, inferior) es la principal área vibrátil; la pars flaccida (superior) carece de capa fibrosa. El cono de luz — reflejo triangular visible otoscópicamente — indica posición normal.',
        st:[{l:'Superficie',v:'~55 mm²'},{l:'Grosor',v:'~0.1 mm'},{l:'Capas',v:'3 (epi + fibrosa + mucosa)'},{l:'Cono de luz',v:'Ref. anterior-inferior'}]
    },
    martillo:{
        n:'Martillo (Malleus)',
        s:'Cadena Osicular — Primer Huesecillo',
        d:'El martillo es el mayor de los tres huesecillos del oído medio (~9 mm). Consta de cabeza, cuello, proceso lateral (unido al tímpano en el plexo de Shrapnell), proceso anterior y mango (manubrio), firmemente unido a la capa fibrosa del tímpano. La cabeza articula con el cuerpo del yunque mediante una diartrosis (articulación incudomaleolar) con ligamentos suspensorios. El músculo tensor del tímpano (rama del NC V3) inserta en su proceso muscular y aumenta la rigidez osicular ante sonidos intensos (reflejo acústico).',
        st:[{l:'Longitud',v:'~9 mm'},{l:'Articulación',v:'Incudomaleolar'},{l:'Músculo',v:'Tensor del tímpano (NC V3)'},{l:'Unión',v:'Mango → tímpano'}]
    },
    yunque:{
        n:'Yunque (Incus)',
        s:'Cadena Osicular — Huesecillo Intermedio',
        d:'El yunque es el huesecillo intermedio de la cadena osicular, que articula con el martillo (articulación incudomaleolar) anteriormente y con el estribo (articulación incudoestapedial) mediante su apófisis lenticular. Su cuerpo y dos ramas (proceso corto y proceso largo) le dan morfología similar a un molar. Es el huesecillo con mayor masa y menor vascularización — su apófisis lenticular es muy susceptible a la reabsorción osteoclástica en otitis media crónica y colesteatoma. Transmite la energía vibrátil sin amplificación geométrica significativa.',
        st:[{l:'Articulaciones',v:'2 (mart. y estribo)'},{l:'Proceso largo',v:'Articulación estapedial'},{l:'Masa',v:'Mayor de los 3 huesecillos'},{l:'Riesgo clínico',v:'Reabsorción en otitis crónica'}]
    },
    estribo:{
        n:'Estribo (Stapes)',
        s:'Cadena Osicular — Último Huesecillo',
        d:'El estribo es el huesecillo más pequeño y ligero del cuerpo humano (~3 mm). Su platina (plataforma basal) ocupa la ventana oval (4 mm²) y transfiere las vibraciones de la cadena osicular a la perilinfa coclear mediante movimiento de pistón. El anillo fibroso (ligamento anular) que rodea la platina permite la oscilación. El músculo estapedial (el músculo más pequeño del cuerpo, NC VII) inserta en su arco posterior y constituye el reflejo estapedial (protección ante sonidos intensos >85 dB SPL). La relación de áreas tímpano/platina (~17:1) más la palanca osicular amplifica la presión sonora ~25-30 dB.',
        st:[{l:'Tamaño',v:'~3 mm (más pequeño del cuerpo)'},{l:'Platina',v:'Ventana oval (~4 mm²)'},{l:'Amplificación',v:'~25-30 dB'},{l:'Músculo',v:'Estapedial (NC VII)'}]
    },
    trompa:{
        n:'Trompa de Eustaquio',
        s:'Oído Medio — Canal de Ventilación y Drenaje',
        d:'La trompa faringotimpánica (de Eustaquio) es un canal de ~35 mm que comunica la caja timpánica con la nasofaringe. Normalmente cerrada, se abre durante la deglución y el bostezo por acción de los músculos tensor y elevador del velo del paladar, equilibrando la presión entre el oído medio y la atmósfera. Su tercio posterior es óseo (hueso temporal) y sus dos tercios anteriores son fibrocartilaginosos. El epitelio pseudoestratificado cilíndrico ciliado y las células caliciformes del segmento cartilaginoso drenan secreciones hacia la nasofaringe. Su disfunción es la causa más frecuente de otitis media en niños.',
        st:[{l:'Longitud',v:'~35 mm'},{l:'Apertura',v:'Deglución y bostezo'},{l:'Músculos',v:'Tensor + elevador del velo'},{l:'Patología',v:'Otitis media (disfunción)'}]
    },
    caja:{
        n:'Caja Timpánica',
        s:'Oído Medio — Cavidad de Resonancia y Transmisión',
        d:'La caja timpánica es una cavidad llena de aire excavada en el hueso temporal (6 paredes: techo = tegmen tympani, suelo = pared yugular, pared externa = tímpano, pared interna = promontorio + ventanas, pared anterior = trompa, pared posterior = adito al antro). El promontorio de la pared interna está formado por el primer giro coclear y contiene el plexo timpánico (NC IX). Comunica hacia atrás con las celdillas mastoideas a través del aditus. El mucoperiostio que la tapiza produce moco en procesos inflamatorios (otitis media secretora).',
        st:[{l:'Contenido',v:'Aire + cadena osicular'},{l:'Techo',v:'Tegmen tympani (fosa media)'},{l:'Comunica con',v:'Mastoides (aditus)'},{l:'Plexo nervioso',v:'Timpánico (NC IX)'}]
    },
    coclea:{
        n:'Cóclea (Caracol)',
        s:'Oído Interno — Órgano de la Audición',
        d:'La cóclea es una estructura espiral de ~2.5 vueltas (longitud extendida ~35 mm) alojada en la cápsula ótica del peñasco temporal. Consta de tres rampas: escala vestibular (perilinfa, desde ventana oval), escala media o coclear (endolinfa, K⁺ alto/Na⁺ bajo, potencial endococlear +80 mV) y escala timpánica (perilinfa, hacia ventana redonda). La membrana de Reissner separa escala vestibular de la media; la membrana basilar separa la media de la timpánica. La rigidez decreciente de la membrana basilar desde la base hacia el ápex genera tonotopía: base detecta altas frecuencias (20,000 Hz), ápex detecta bajas (20 Hz) — principio de Bekesy.',
        st:[{l:'Vueltas',v:'2.5 espiras (~35 mm)'},{l:'Potencial endococlear',v:'+80 mV'},{l:'Tonotopía',v:'Base (alta freq) → Apex (baja)'},{l:'Premio Nobel',v:'Georg von Békésy, 1961'}]
    },
    canales:{
        n:'Canales Semicirculares',
        s:'Oído Interno — Detección de Aceleración Angular',
        d:'Los tres canales semicirculares (superior/anterior, posterior y horizontal/lateral) están orientados en planos mutuamente perpendiculares (~90°), permitiendo detectar rotación en los tres ejes del espacio. Cada canal contiene endolinfa y posee una dilatación (ampolla) con la cresta ampular, donde se ubican las células ciliadas sensoriales cubiertas por la cúpula gelatinosa. Durante rotaciones de la cabeza, la inercia de la endolinfa desplaza la cúpula, deflexando los cilios y modulando la descarga del NC VIII. Los canales trabajan en pares coplanares (regla de Ewald): superior/posterior contralateral y ambos horizontales.',
        st:[{l:'Número',v:'3 por oído (6 total)'},{l:'Planos',v:'Mutuamente perpendiculares'},{l:'Detectan',v:'Aceleración angular'},{l:'Estructura',v:'Cresta ampular + cúpula'}]
    },
    utriculo:{
        n:'Utrículo y Sáculo',
        s:'Oído Interno — Órganos Otolíticos',
        d:'El utrículo y el sáculo son los órganos otolíticos del laberinto membranoso vestibular. Contienen la mácula, una placa sensorial con células ciliadas tipo I (caliciformes) y tipo II (cilindricas) cubiertas por la membrana otolítica con cristales de carbonato cálcico (otoconia o estatoconia, densidad ~2.7 g/cm³). La inercia de los otolitos ante la gravedad y aceleraciones lineales deflexiona los cilios. El utrículo (plano horizontal) detecta aceleraciones lineales horizontales y la posición estática de la cabeza; el sáculo (plano vertical) detecta aceleraciones verticales y gravedad.',
        st:[{l:'Detectan',v:'Aceleración lineal + gravedad'},{l:'Cristales',v:'Otoconia (CaCO₃)'},{l:'Utrículo',v:'Plano horizontal'},{l:'Sáculo',v:'Plano vertical'}]
    },
    ventanas:{
        n:'Ventanas Oval y Redonda',
        s:'Oído Interno — Interfaces de Transmisión de Energía',
        d:'La ventana oval (fenestra vestibuli, ~3.2 mm²) está cerrada por la platina del estribo mediante el ligamento anular. Recibe la energía vibrátil de la cadena osicular y la transmite a la perilinfa de la escala vestibular coclear. La ventana redonda (fenestra cochleae, ~1.6 mm²) está cubierta por la membrana timpánica secundaria (membrana de Scarpa) y actúa como salida de presión: cuando la platina empuja hacia dentro, la membrana de la ventana redonda se abomba hacia el oído medio, permitiendo el movimiento de la perilinfa imprescindible para la vibración de la membrana basilar.',
        st:[{l:'Ventana oval',v:'~3.2 mm² (platina estribo)'},{l:'Ventana redonda',v:'~1.6 mm² (membrana Scarpa)'},{l:'Función oval',v:'Entrada energía sonora'},{l:'Función redonda',v:'Salida compensatoria de presión'}]
    },
    organo:{
        n:'Órgano de Corti',
        s:'Oído Interno — Receptor Sensorial Primario de la Audición',
        d:'El órgano de Corti es el epitelio sensorial que descansa sobre la membrana basilar a lo largo de toda la cóclea. Contiene dos tipos de células ciliadas: las internas (CCIs, ~3,500 por cóclea, dispuestas en una sola fila), que son los verdaderos receptores (95% de las fibras aferentes del NC VIII), y las externas (CCEs, ~12,000, en tres filas), que amplifican mecánicamente las vibraciones cocleares mediante electroutriculomotilidad (cambio de longitud por prestin). El haz de estereocilios de las CCIs está formado por ~50 cilios con canales de mecanotransducción en su extremo; la deflexión abre canales K⁺/Ca²⁺ generando potenciales del receptor.',
        st:[{l:'Células ciliadas internas',v:'~3,500 (1 fila)'},{l:'Células ciliadas externas',v:'~12,000 (3 filas)'},{l:'Aferencia',v:'95% NC VIII de CCIs'},{l:'Amplificador',v:'CCEs (prestin, OHC motilidad)'}]
    },
    endolinfa:{
        n:'Endolinfa y Perilinfa',
        s:'Oído Interno — Fluidos del Laberinto',
        d:'El laberinto membranoso contiene endolinfa, un líquido único en el organismo con composición intracelular (K⁺ alto: 145 mEq/L; Na⁺ bajo: 5 mEq/L; Ca²⁺ 0.02 mM), secretada por la estría vascular (epitelio altamente vascularizado de la pared lateral coclear). El laberinto óseo que lo rodea está bañado por perilinfa (composición plasmática: Na⁺ alto, K⁺ bajo), derivada del LCR y plasma. El potencial endococlear (+80 mV) generado por la diferencia entre endolinfa y perilinfa es la principal fuerza impulsora para la apertura de canales de transducción de las células ciliadas. Su alteración causa hipoacusia (hidropesía endolinfática → enfermedad de Ménière).',
        st:[{l:'Endolinfa K⁺',v:'~145 mEq/L (intracelular)'},{l:'Potencial endococlear',v:'+80 mV'},{l:'Producción',v:'Estría vascular'},{l:'Patología',v:'Hidropesía → Ménière'}]
    },
    membrana:{
        n:'Membrana Basilar',
        s:'Oído Interno — Sustrato Mecánico de la Tonotopía',
        d:'La membrana basilar recorre toda la longitud coclear (~35 mm) dividiendo la escala media de la escala timpánica. Su rigidez y anchura varían progresivamente: en la base (cerca de ventana oval) es estrecha (~0.1 mm) y rígida, resonando a altas frecuencias (hasta 20,000 Hz); en el ápex es ancha (~0.5 mm) y flexible, resonando a bajas frecuencias (~20 Hz). Este gradiente de propiedades mecánicas es la base física de la tonotopía coclear descrita por Georg von Békésy (Nobel 1961). Sobre ella descansa el órgano de Corti; la membrana tectoria — gelatinosa — cubre los estereocilios de las células ciliadas externas.',
        st:[{l:'Longitud',v:'~35 mm'},{l:'Anchura base',v:'~0.1 mm (rígida, alta freq)'},{l:'Anchura ápex',v:'~0.5 mm (flexible, baja freq)'},{l:'Membrana tectoria',v:'Cubre CCEs (gelatinosa)'}]
    },
    nervio:{
        n:'Nervio Vestibulococlear (NC VIII)',
        s:'Inervación — VIII Par Craneal',
        d:'El nervio vestibulococlear (nervio estatoacústico, NC VIII) es un nervio sensorial aferente que conduce las señales auditivas y vestibulares al tronco encefálico. La rama coclear proviene del ganglio espiral (ganglio de Corti, ~30,000 neuronas bipolares) y hace sinapsis en los núcleos cocleares ventral y dorsal del bulbo. La rama vestibular proviene del ganglio de Scarpa (ganglio vestibular, ~20,000 neuronas) con dos divisiones (superior: utrículo + canales anterior y horizontal; inferior: sáculo + canal posterior). La vía auditiva asciende por el lemnisco lateral hasta el colículo inferior, el cuerpo geniculado medial del tálamo y el córtex auditivo primario (giro de Heschl, área 41-42).',
        st:[{l:'Neuronas ganglión espiral',v:'~30,000 bipolares'},{l:'Neuronas ganglión vestibular',v:'~20,000 (Scarpa)'},{l:'Córtex destino',v:'Giro de Heschl (Brodmann 41-42)'},{l:'Velocidad conducción',v:'~50 m/s (mielínicas)'}]
    },
    vascular:{
        n:'Vascularización del Oído',
        s:'Irrigación Arterial del Laberinto',
        d:'El oído interno es irrigado principalmente por la arteria laberíntica (arteria auditiva interna), rama de la arteria cerebelosa anteroinferior (AICA) o directamente de la arteria basilar. Esta arteria es terminal (sin anastomosis colaterales significativas), lo que hace al oído interno extremadamente vulnerable a isquemia — la hipoacusia súbita neurosensorial puede ser de origen vascular. Se divide en la arteria coclear (rama principal → estría vascular, órgano de Corti) y la arteria vestibular (canales semicirculares, utrículo, sáculo). El oído medio es irrigado por la arteria timpánica anterior (rama maxilar de la carótida externa).',
        st:[{l:'Arteria principal',v:'Laberíntica (de AICA)'},{l:'Tipo de irrigación',v:'Terminal (sin colaterales)'},{l:'Riesgo',v:'Hipoacusia súbita por isquemia'},{l:'Oído medio',v:'A. timpánica anterior'}]
    },
    musculillos:{
        n:'Músculos del Oído Medio',
        s:'Protección Ante Sonidos Intensos',
        d:'El oído medio contiene dos músculos esqueléticos, los más pequeños del cuerpo humano. El músculo tensor del tímpano (~25 mm) se origina en el canal de la trompa de Eustaquio, inserta en el mango del martillo e incrementa la tensión del tímpano al contraerse (inervado por NC V3, rama del trigémino). El músculo estapedial (~6 mm, el más pequeño del cuerpo) se origina en la eminencia piramidal del oído medio e inserta en el cuello del estribo; su contracción (inervada por NC VII, rama estapedial) rigidiza la cadena osicular, reduciendo la transmisión de sonidos intensos (reflejo estapedial, umbral ~85-90 dB SPL, latencia ~25-150 ms). Este reflejo protege la cóclea pero no actúa ante sonidos impulsivos muy breves.',
        st:[{l:'Tensor del tímpano',v:'~25 mm, NC V3'},{l:'Músculo estapedial',v:'~6 mm (más pequeño, NC VII)'},{l:'Reflejo estapedial',v:'Umbral ~85-90 dB SPL'},{l:'Limitación',v:'No protege ante impulsos'}]
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
