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
scene.background=new THREE.Color(0xf0f4f8);
scene.fog=new THREE.FogExp2(0xf0f4f8, 0.018);

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
            vec3 c=mix(vec3(.86,.90,.95),mix(vec3(.92,.95,.98),vec3(.96,.98,1.0),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.75,.88,1.0)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.4)))),8.)*.18;
            c+=vec3(.65,.80,.95)*pow(max(0.,dot(d,normalize(vec3(-.6,.3,-.5)))),5.)*.10;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc, 0.04).texture;
pmrem.dispose();

// ===== LIGHTING =====
setLoad(30,'Iluminación...');
scene.add(new THREE.HemisphereLight(0xdde8ff, 0xaabbcc, 1.10));

const keyLight=new THREE.DirectionalLight(0xffffff, 3.8);
keyLight.position.set(3, 5, 4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xccddff, 1.4);
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
    c+=vec3(.50,.30,.20)*sss*sm*.06;
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
setLoad(50,'Cargando modelo ocular...');
let model=null;
let meshes=[];

new GLTFLoader().load('eyeball.glb',
    (gltf)=>{
        setLoad(80,'Mejorando materiales...');
        model=gltf.scene;

        // Auto-scale and center
        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const sc=3.0/Math.max(size.x, size.y, size.z);
        model.scale.setScalar(sc);
        const sb=new THREE.Box3().setFromObject(model);
        model.position.sub(sb.getCenter(new THREE.Vector3()));

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            meshes.push(child);

            const mat=child.material;

            // eyeball.glb = single mesh "defaultMaterial" / material "blinn2"
            // with baked color + roughness/metalness + normal textures.
            // Strategy: upgrade to MeshPhysicalMaterial preserving ALL textures,
            // then add physical eye properties on top.
            const pm=new THREE.MeshPhysicalMaterial();

            // Transfer all original textures
            if(mat.map)          { pm.map = mat.map; }
            if(mat.normalMap)    { pm.normalMap = mat.normalMap; pm.normalScale = new THREE.Vector2(1.0, 1.0); }
            if(mat.roughnessMap) { pm.roughnessMap = mat.roughnessMap; }
            if(mat.metalnessMap) { pm.metalnessMap = mat.metalnessMap; }
            if(mat.aoMap)        { pm.aoMap = mat.aoMap; pm.aoMapIntensity = 0.6; }
            if(mat.color)        { pm.color.copy(mat.color); }

            // DON'T override roughness/metalness from map — let maps drive it
            // Just set sane fallback if no maps
            pm.roughness  = mat.roughnessMap ? 1.0 : 0.25;
            pm.metalness  = mat.metalnessMap ? 1.0 : 0.0;

            // Clearcoat = tear film over the entire eye surface
            pm.clearcoat = 0.85;
            pm.clearcoatRoughness = 0.06;

            // Subtle warm sheen (biological tissue feel)
            pm.sheen = 0.16;
            pm.sheenRoughness = 0.40;
            pm.sheenColor = new THREE.Color(0.95, 0.88, 0.82);

            // Mild depth/attenuation
            pm.thickness = 0.35;
            pm.attenuationColor = new THREE.Color(0.93, 0.97, 1.0);
            pm.attenuationDistance = 3.0;

            pm.emissive = new THREE.Color(0.02, 0.02, 0.025);
            pm.emissiveIntensity = 0.05;
            pm.envMapIntensity = 0.55;

            // Preserve original alpha
            pm.transparent = mat.transparent || false;
            pm.opacity = (mat.opacity != null) ? mat.opacity : 1.0;
            if(mat.alphaMap) pm.alphaMap = mat.alphaMap;

            pm.side = THREE.FrontSide;
            child.material = pm;
        });

        scene.add(model);

        const gnd=new THREE.Mesh(new THREE.PlaneGeometry(18,18),
            new THREE.MeshStandardMaterial({color:0xeef0f5,roughness:0.96,transparent:true,opacity:0.5}));
        gnd.rotation.x=-Math.PI/2;
        const sb2=new THREE.Box3().setFromObject(model);
        gnd.position.y=sb2.min.y-0.06;
        gnd.receiveShadow=true;
        scene.add(gnd);

        setLoad(100,'¡Listo!');
        setTimeout(()=>ls.classList.add('hidden'), 500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1024|0)+'KB')},
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que eyeball.glb esté en la misma carpeta.')}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS'; fc=0; lt=t;}
    ctrl.update();
    sssLight.intensity=0.45+Math.sin(t*0.0007)*0.06;
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
        if(sel==='all'){
            mat.emissive.setRGB(0.02,0.03,0.05); mat.emissiveIntensity=0.05;
        } else if(sel==='cornea'){
            mat.emissive.setRGB(0.04,0.08,0.18); mat.emissiveIntensity=0.24;
        } else if(sel==='iris'){
            mat.emissive.setRGB(0.03,0.06,0.16); mat.emissiveIntensity=0.22;
        } else if(sel==='pupila'){
            mat.emissive.setRGB(0.01,0.01,0.02); mat.emissiveIntensity=0.04;
        } else if(sel==='cristalino'){
            mat.emissive.setRGB(0.05,0.08,0.12); mat.emissiveIntensity=0.20;
        } else if(sel==='camaras'||sel==='vitreo'){
            mat.emissive.setRGB(0.04,0.12,0.16); mat.emissiveIntensity=0.20;
        } else if(sel==='esclera'){
            mat.emissive.setRGB(0.07,0.07,0.09); mat.emissiveIntensity=0.16;
        } else if(sel==='coroides'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='retina'||sel==='fovea'){
            mat.emissive.setRGB(0.18,0.08,0.03); mat.emissiveIntensity=0.24;
        } else if(sel==='nervio'||sel==='papila'){
            mat.emissive.setRGB(0.06,0.14,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='conos'){
            mat.emissive.setRGB(0.16,0.10,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='bastones'){
            mat.emissive.setRGB(0.04,0.06,0.14); mat.emissiveIntensity=0.20;
        } else if(sel==='conjuntiva'){
            mat.emissive.setRGB(0.14,0.06,0.07); mat.emissiveIntensity=0.18;
        } else if(sel==='musculos'){
            mat.emissive.setRGB(0.16,0.05,0.04); mat.emissiveIntensity=0.20;
        } else if(sel==='lagrimal'){
            mat.emissive.setRGB(0.04,0.14,0.16); mat.emissiveIntensity=0.20;
        } else if(sel==='acomodacion'){
            mat.emissive.setRGB(0.08,0.12,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='vascular'){
            mat.emissive.setRGB(0.18,0.04,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='inervacion'){
            mat.emissive.setRGB(0.06,0.08,0.16); mat.emissiveIntensity=0.20;
        } else {
            mat.emissive.setRGB(0.03,0.04,0.06); mat.emissiveIntensity=0.10;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{n:'Globo Ocular Humano',s:'Sistema Visual — Órgano Receptor Primario',
        d:'El globo ocular es el órgano receptor de la visión, con un diámetro aproximado de 24 mm. Consta de tres túnicas concéntricas (fibrosa, vascular y nerviosa), dos segmentos (anterior y posterior) y un sistema dióptrico (córnea + cristalino) que enfoca la luz sobre la retina. Contiene aproximadamente 120 millones de bastones y 6-7 millones de conos.',
        st:[{l:'Diámetro',v:'~24 mm'},{l:'Fotorreceptores',v:'~126 millones'},{l:'Poder dióptrico',v:'~60 D total'},{l:'Campo visual',v:'~200° binocular'}]},
    esclera:{n:'Esclera',s:'Túnica Fibrosa Externa — "El Blanco del Ojo"',
        d:'La esclera es la capa más externa del globo ocular, blanca y opaca, compuesta por fibras de colágeno tipo I densamente empaquetadas. Cubre ~5/6 posteriores del ojo y proporciona soporte estructural y protección mecánica. Su grosor varía de 0.3 mm a 1.0 mm. Permite la inserción de los seis músculos extraoculares. En su superficie posterior se encuentra la lámina cribosa, por donde emerge el nervio óptico.',
        st:[{l:'Composición',v:'Colágeno tipo I'},{l:'Grosor',v:'0.3–1.0 mm'},{l:'Función',v:'Soporte + protección'},{l:'Lámina cribosa',v:'Paso nervio óptico'}]},
    cornea:{n:'Córnea',s:'Túnica Fibrosa Anterior — Principal Elemento Refractivo',
        d:'La córnea es la capa transparente anterior del ojo y el principal elemento refractivo (~43 D de ~60 D totales). Avascular, se nutre por difusión del humor acuoso y el film lagrimal. Tiene 5 capas: epitelio, membrana de Bowman, estroma (90%), membrana de Descemet y endotelio. Es el tejido más densamente inervado del cuerpo.',
        st:[{l:'Poder refractivo',v:'~43 D'},{l:'Grosor central',v:'~0.52 mm'},{l:'Capas',v:'5 (epitelio→endotelio)'},{l:'Inervación',v:'Más densa del cuerpo'}]},
    coroides:{n:'Coroides',s:'Túnica Vascular Media — Capa Nutricia Posterior',
        d:'La coroides es la capa vascular de la úvea entre la retina y la esclera. Es el tejido más vascularizado del cuerpo por unidad de masa: recibe el 85% del flujo sanguíneo ocular. Nutre el epitelio pigmentario retiniano y los fotorreceptores por difusión.',
        st:[{l:'Flujo sanguíneo',v:'85% del total ocular'},{l:'Función',v:'Nutrición fotorreceptores'},{l:'Grosor',v:'~0.25 mm'},{l:'Vascularización',v:'Más densa del cuerpo/masa'}]},
    retina:{n:'Retina',s:'Túnica Nerviosa — Transductor Visual',
        d:'La retina es la capa nerviosa interna, de origen cerebral (extensión del diencéfalo). Tiene 10 capas histológicas. Convierte la energía lumínica en señales eléctricas mediante conos y bastones. Las células ganglionares proyectan sus axones formando el nervio óptico.',
        st:[{l:'Capas histológicas',v:'10 capas'},{l:'Grosor',v:'~0.1–0.3 mm'},{l:'EPR',v:'Apoyo fotorreceptores'},{l:'Origen embriol.',v:'Extensión del diencéfalo'}]},
    iris:{n:'Iris',s:'Diafragma Uveal — Control de la Luz Entrante',
        d:'El iris regula la cantidad de luz que entra al ojo modificando el diámetro pupilar. Contiene el esfínter pupilar (parasimpático, NC III, miosis) y el dilatador pupilar (simpático, midriasis). El color depende de la melanina del estroma.',
        st:[{l:'Músculos',v:'Esfínter + dilatador'},{l:'Miosis',v:'Parasimpático (NC III)'},{l:'Midriasis',v:'Simpático (cadena cerv.)'},{l:'Color',v:'Depende de melanina'}]},
    pupila:{n:'Pupila',s:'Abertura Central del Iris — Regulación Fotópica',
        d:'La pupila es la abertura central del iris. Su diámetro varía entre ~1.5 mm (miosis) y ~8 mm (midriasis máxima). El reflejo fotomotor es fundamental en la evaluación neurológica (NC II aferente, NC III eferente).',
        st:[{l:'Rango diámetro',v:'1.5–8 mm'},{l:'Miosis máxima',v:'~1.5 mm'},{l:'Midriasis máxima',v:'~8 mm'},{l:'Reflejo fotomotor',v:'NC II / NC III'}]},
    cristalino:{n:'Cristalino (Lens)',s:'Lente Biconvexa Intraocular — Acomodación',
        d:'El cristalino es una lente biconvexa transparente y avascular que aporta ~20 D al poder refractivo. Suspendido por la zónula de Zinn desde el cuerpo ciliar. La contracción del músculo ciliar libera las fibras zonulares, esferizando el cristalino. La catarata es la causa más frecuente de ceguera tratable.',
        st:[{l:'Poder refractivo',v:'~20 D (variable)'},{l:'Acomodación',v:'Músculo ciliar + zónula'},{l:'Catarata',v:'Causa #1 ceguera tratable'},{l:'Nutrición',v:'Humor acuoso (avascular)'}]},
    camaras:{n:'Cámaras Oculares y Humor Acuoso',s:'Segmento Anterior — Fluido Intraocular',
        d:'El segmento anterior contiene la cámara anterior (córnea-iris) y la posterior (iris-cristalino). El humor acuoso (~2-3 μL/min) drena por la malla trabecular hacia el canal de Schlemm. Su obstrucción eleva la PIO causando glaucoma.',
        st:[{l:'Producción acuoso',v:'~2–3 μL/min'},{l:'PIO normal',v:'10–21 mmHg'},{l:'Drenaje',v:'Canal de Schlemm'},{l:'Glaucoma',v:'2ª causa ceguera mundial'}]},
    vitreo:{n:'Humor Vítreo',s:'Segmento Posterior — Gel Transparente Intraocular',
        d:'El humor vítreo ocupa el ~80% del volumen ocular (4 mL). Compuesto por 99% agua y una red de colágeno tipo II + ácido hialurónico. Mantiene la forma esférica y transmite luz sin distorsión. No se renueva (avascular).',
        st:[{l:'Volumen',v:'~4 mL'},{l:'Composición',v:'99% agua + col.II'},{l:'Función',v:'Soporte + transmisión luz'},{l:'Renovación',v:'No (avascular)'}]},
    fovea:{n:'Fóvea y Mácula Lútea',s:'Zona de Mayor Agudeza Visual',
        d:'La mácula (~5.5 mm) está en el polo posterior, rica en luteína + zeaxantina. En su centro la fóvea (~1.5 mm) concentra ~160,000 conos/mm². Es la zona de máxima agudeza (20/20). La DMAE es la principal causa de ceguera en mayores de 65 años.',
        st:[{l:'Diámetro fóvea',v:'~1.5 mm'},{l:'Conos en fovéola',v:'~160,000/mm²'},{l:'Agudeza',v:'Máxima del campo visual'},{l:'DMAE',v:'Principal ceguera >65 años'}]},
    nervio:{n:'Nervio Óptico (NC II)',s:'Vía Visual Primaria — Tracto del SNC',
        d:'El nervio óptico es un tracto del SNC formado por ~1.2 millones de axones ganglionares. Sale por la papila óptica y llega al quiasma donde las fibras nasales se decusan. Desde las cintillas ópticas viaja al cuerpo geniculado lateral → corteza V1 (occipital).',
        st:[{l:'Axones',v:'~1.2 millones'},{l:'Longitud',v:'~40 mm'},{l:'Decusación',v:'Fibras nasales en quiasma'},{l:'Destino final',v:'Corteza V1 (occipital)'}]},
    papila:{n:'Papila Óptica (Punto Ciego)',s:'Emergencia del Nervio Óptico — Escotoma Fisiológico',
        d:'La papila (~1.5 mm) es donde convergen los axones ganglionares. Carece de fotorreceptores — crea el escotoma fisiológico o "punto ciego". El cup/disc ratio se evalúa en el diagnóstico del glaucoma (normal <0.5).',
        st:[{l:'Diámetro',v:'~1.5 mm'},{l:'Ubicación',v:'~15° nasal a fóvea'},{l:'Punto ciego',v:'Sin fotorreceptores'},{l:'C/D ratio',v:'Normal <0.5'}]},
    conos:{n:'Conos',s:'Fotorreceptores para Visión Fotópica y del Color',
        d:'Los conos (~6-7 millones) son para visión de alta resolución y color en buena iluminación. Tipos: L (rojo, 565 nm), M (verde, 535 nm), S (azul, 420 nm). Concentrados en la fóvea. La tricromacía de Young-Helmholtz explica la percepción del color.',
        st:[{l:'Cantidad',v:'~6–7 millones'},{l:'Tipos',v:'L, M, S (RGB)'},{l:'Concentración',v:'Fóvea'},{l:'Daltonismo',v:'Mutación opsina (ligado X)'}]},
    bastones:{n:'Bastones',s:'Fotorreceptores para Visión Escotópica',
        d:'Los bastones (~120 millones) detectan un único fotón. Contienen rodopsina y responden en baja luminosidad y visión periférica. Se saturan con luz brillante y necesitan ~30 min para readaptarse. La deficiencia de vitamina A causa nictalopía.',
        st:[{l:'Cantidad',v:'~120 millones'},{l:'Fotopigmento',v:'Rodopsina'},{l:'Adaptación oscuridad',v:'~30 minutos'},{l:'Defic. vitamina A',v:'Nictalopía'}]},
    conjuntiva:{n:'Conjuntiva',s:'Membrana Mucosa de Protección y Lubricación',
        d:'La conjuntiva tapiza el interior palpebral y la esclera anterior. Sus células caliciformes secretan mucina (componente del film lagrimal). La conjuntivitis es la afección ocular más frecuente.',
        st:[{l:'Tipo epitelio',v:'Cilíndrico estratificado'},{l:'Células caliciformes',v:'Secretan mucina'},{l:'Conjuntivitis',v:'Afección más frecuente'},{l:'Función',v:'Protección + lubricación'}]},
    musculos:{n:'Músculos Extraoculares',s:'Control de los Movimientos Oculares',
        d:'Cada ojo tiene 6 músculos: 4 rectos y 2 oblicuos. Inervados por NC III (4 músculos), NC IV (oblicuo superior) y NC VI (recto lateral). Su parálisis produce diplopía con patrón diagnóstico específico.',
        st:[{l:'Número',v:'6 por ojo'},{l:'Nervios',v:'NC III, IV y VI'},{l:'Parálisis NC III',v:'Ptosis + ojo abajo-afuera'},{l:'NC VI',v:'Esotropía'}]},
    lagrimal:{n:'Aparato Lagrimal',s:'Producción y Drenaje de la Película Lagrimal',
        d:'La glándula lagrimal (NC VII) produce la capa acuosa del film trilaminar (lipídica + acuosa + mucínica). Las lágrimas drenan por puntos lagrimales → canalículos → saco lagrimal → conducto nasolagrimal.',
        st:[{l:'Capas film lagrimal',v:'3 (lipídica+acuosa+mucosa)'},{l:'Producción basal',v:'~1–2 μL/min'},{l:'Inervación',v:'NC VII'},{l:'Drenaje',v:'→ conducto nasolagrimal'}]},
    acomodacion:{n:'Acomodación y Refracción',s:'Sistema Dióptrico — Enfoque del Ojo',
        d:'El sistema dióptrico total es ~60 D: córnea ~43 D fijos + cristalino ~20 D variables. La acomodación: músculo ciliar contrae → zónula se relaja → cristalino se esfueriza → mayor poder. La presbicia inicia ~40 años. Errores: miopía, hipermetropía, astigmatismo.',
        st:[{l:'Poder total',v:'~60 D'},{l:'Córnea',v:'~43 D (fija)'},{l:'Cristalino',v:'~20 D (variable)'},{l:'Presbicia',v:'Inicio ~40–45 años'}]},
    vascular:{n:'Vascularización Ocular',s:'Irrigación Arterial de la Retina y Úvea',
        d:'La arteria oftálmica (1ª rama carótida interna) da: arteria central de la retina (capas internas) y arterias ciliares (coroides + úvea). La circulación retiniana es terminal — sin anastomosis. La retinopatía diabética es la principal causa de ceguera en adultos activos.',
        st:[{l:'Origen',v:'Art. oftálmica (car. interna)'},{l:'Art. central retina',v:'Capas internas'},{l:'Art. ciliares',v:'Coroides + úvea'},{l:'Retinopatía DM',v:'#1 ceguera adultos activos'}]},
    inervacion:{n:'Inervación Ocular',s:'Nervios Craneales Relacionados con el Ojo',
        d:'NC II: visión. NC III: 4 MMEE + parasimpático ocular (miosis, acomodación). NC IV: oblicuo superior. NC V1: sensibilidad corneal + reflejo corneal (aferente). NC VI: recto lateral. NC VII: glándula lagrimal + cierre palpebral.',
        st:[{l:'NC II',v:'Visión'},{l:'NC III',v:'4 MMEE + parasimpático'},{l:'NC V1',v:'Sensibilidad + reflejo corneal'},{l:'NC VII',v:'Cierre párpado + lagrimeo'}]}
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