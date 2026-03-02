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
            vec3 c=mix(vec3(.88,.90,.94),mix(vec3(.94,.96,.98),vec3(.98,.99,1.0),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(.80,.88,1.0)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.4)))),8.)*.18;
            c+=vec3(.70,.80,.90)*pow(max(0.,dot(d,normalize(vec3(-.6,.3,-.5)))),5.)*.10;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

setLoad(30,'Iluminación...');
scene.add(new THREE.HemisphereLight(0xddeeff,0xaabbcc,1.10));

const keyLight=new THREE.DirectionalLight(0xffffff,3.8);
keyLight.position.set(3,5,4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-4; keyLight.shadow.camera.right=4;
keyLight.shadow.camera.top=4; keyLight.shadow.camera.bottom=-4;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xccddf0,1.4);
fillLight.position.set(-5,3,-2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffffff,1.6);
rimLight.position.set(-2,-1,-5); scene.add(rimLight);

const sssLight=new THREE.PointLight(0xffccaa,0.45,8);
sssLight.position.set(0,-1,1.5); scene.add(sssLight);

const topLight=new THREE.PointLight(0xffffff,1.20,14);
topLight.position.set(0,5,3); scene.add(topLight);

setLoad(40,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));

const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.06,0.40,0.92);
composer.addPass(bloom);

const cgShader={
    uniforms:{tDiffuse:{value:null},sss:{value:0.25},vign:{value:0.82}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sss;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.299,.587,.114));float sm=smoothstep(.55,.80,lum)*(1.-smoothstep(.80,.99,lum));
    c+=vec3(.60,.20,.20)*sss*sm*.06;
    c=(c-.5)*1.05+.5;
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

setLoad(50,'Cargando modelo gástrico...');
let model=null, meshes=[];

new GLTFLoader().load('estomago3d.glb',
    (gltf)=>{
        setLoad(80,'Mejorando materiales...');
        model=gltf.scene;

        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const sc=3.0/Math.max(size.x,size.y,size.z);
        model.scale.setScalar(sc);
        const sb=new THREE.Box3().setFromObject(model);
        const sc2=sb.getCenter(new THREE.Vector3());
        model.position.sub(sc2);

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true; child.receiveShadow=true;
            meshes.push(child);

            const mat=child.material;
            const combined=(child.name||'').toLowerCase()+' '+(mat&&mat.name||'').toLowerCase();

            // Tejido muscular externo — pared gástrica
            const isMuscle=/(muscle|muscul|wall|pared|outer|extern|serosa|periton|smooth)/i.test(combined);
            // Mucosa interna — rugosidades, pliegues
            const isMucosa=/(mucosa|mucous|inner|intern|lining|rugae|ruga|fold|pliegue|inner.wall)/i.test(combined);
            // Esfínteres — cardias, píloro
            const isSphincter=/(sphincter|esfinter|pylor|pilor|cardia|cardiac|valve|valvula)/i.test(combined);
            // Submucosa / tejido conectivo
            const isSubmucosa=/(submucosa|submucous|connect|conect|fibrous|fibroso)/i.test(combined);
            // Vasos sanguíneos
            const isVessel=/(vessel|vaso|artery|arteria|vein|vena|blood|vascular)/i.test(combined);
            // Nervios / plexos
            const isNerve=/(nerve|nervio|neural|vagus|vago|plexus|plexo|autonomic)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat){
                if(mat.map) pm.map=mat.map;
                if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.4,1.4);}
                if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
                if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;
                if(mat.color) pm.color.copy(mat.color);
            }

            if(isMuscle){
                // Pared muscular externa: rosado-rojo, SSS moderado
                pm.roughness=0.68; pm.metalness=0;
                pm.sheen=0.35; pm.sheenRoughness=0.58;
                pm.sheenColor=new THREE.Color(0.92,0.62,0.62);
                pm.clearcoat=0.08; pm.clearcoatRoughness=0.65;
                pm.thickness=0.9; pm.attenuationColor=new THREE.Color(0.92,0.65,0.65);
                pm.attenuationDistance=1.0;
                pm.emissive=new THREE.Color(0.10,0.03,0.03); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.18;
            } else if(isMucosa){
                // Mucosa: rojiza húmeda con mayor brillo
                pm.roughness=0.42; pm.metalness=0;
                pm.sheen=0.55; pm.sheenRoughness=0.45;
                pm.sheenColor=new THREE.Color(0.98,0.68,0.68);
                pm.clearcoat=0.28; pm.clearcoatRoughness=0.25;
                pm.thickness=0.6; pm.attenuationColor=new THREE.Color(0.95,0.60,0.60);
                pm.attenuationDistance=0.7;
                pm.emissive=new THREE.Color(0.14,0.03,0.03); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.38;
            } else if(isSphincter){
                // Esfínteres: más densos y oscuros
                pm.roughness=0.55; pm.metalness=0;
                pm.clearcoat=0.18; pm.clearcoatRoughness=0.40;
                pm.sheen=0.28; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.85,0.55,0.55);
                pm.emissive=new THREE.Color(0.12,0.03,0.03); pm.emissiveIntensity=0.14;
                pm.envMapIntensity=0.28;
            } else if(isSubmucosa){
                // Submucosa: tejido conectivo blanquecino
                pm.roughness=0.65; pm.metalness=0;
                pm.sheen=0.20; pm.sheenRoughness=0.60;
                pm.sheenColor=new THREE.Color(0.92,0.88,0.82);
                pm.emissive=new THREE.Color(0.05,0.04,0.03); pm.emissiveIntensity=0.07;
                pm.envMapIntensity=0.20;
            } else if(isVessel){
                // Vasos: rojo brillante
                pm.roughness=0.25; pm.metalness=0;
                pm.clearcoat=0.55; pm.clearcoatRoughness=0.15;
                pm.sheen=0.40; pm.sheenRoughness=0.35;
                pm.sheenColor=new THREE.Color(1.0,0.55,0.55);
                pm.emissive=new THREE.Color(0.20,0.03,0.03); pm.emissiveIntensity=0.20;
                pm.envMapIntensity=0.60;
            } else if(isNerve){
                // Nervios: amarillo cremoso
                pm.roughness=0.58; pm.metalness=0;
                pm.sheen=0.32; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.95,0.90,0.65);
                pm.emissive=new THREE.Color(0.06,0.07,0.02); pm.emissiveIntensity=0.13;
                pm.envMapIntensity=0.22;
            } else {
                pm.roughness=mat&&mat.roughness!=null?mat.roughness:0.60;
                pm.metalness=mat&&mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.12; pm.clearcoatRoughness=0.48;
                pm.sheen=0.22; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.92,0.72,0.72);
                pm.emissive=new THREE.Color(0.06,0.03,0.03); pm.emissiveIntensity=0.09;
                pm.envMapIntensity=0.28;
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
        setTimeout(()=>ls.classList.add('hidden'),500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1024|0)+'KB')},
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que estomago3d.glb esté en la misma carpeta.')}
);

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

function setHighlight(sel){
    meshes.forEach(mesh=>{
        const mat=mesh.material;
        mat.transparent=false; mat.opacity=1; mat.depthWrite=true;
        if(sel==='all'){
            mat.emissive.setRGB(0.02,0.03,0.05); mat.emissiveIntensity=0.08;
        } else if(sel==='cardias'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='fundus'){
            mat.emissive.setRGB(0.14,0.04,0.04); mat.emissiveIntensity=0.24;
        } else if(sel==='cuerpo'){
            mat.emissive.setRGB(0.13,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='antro'){
            mat.emissive.setRGB(0.12,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='piloro'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='curvatura_mayor'){
            mat.emissive.setRGB(0.14,0.06,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='curvatura_menor'){
            mat.emissive.setRGB(0.13,0.05,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='pared_anterior'||sel==='pared_posterior'){
            mat.emissive.setRGB(0.10,0.05,0.03); mat.emissiveIntensity=0.20;
        } else if(sel==='incisura'){
            mat.emissive.setRGB(0.12,0.06,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='mucosa'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='submucosa'){
            mat.emissive.setRGB(0.08,0.06,0.04); mat.emissiveIntensity=0.18;
        } else if(sel==='muscular'){
            mat.emissive.setRGB(0.14,0.03,0.03); mat.emissiveIntensity=0.22;
        } else if(sel==='serosa'){
            mat.emissive.setRGB(0.06,0.08,0.10); mat.emissiveIntensity=0.18;
        } else if(sel==='rugosidades'){
            mat.emissive.setRGB(0.15,0.04,0.04); mat.emissiveIntensity=0.24;
        } else if(sel==='esfinter_cardial'||sel==='esfinter_pilorico'){
            mat.emissive.setRGB(0.06,0.06,0.16); mat.emissiveIntensity=0.24;
        } else if(sel==='glándulas'||sel==='celulas_parietales'){
            mat.emissive.setRGB(0.12,0.04,0.08); mat.emissiveIntensity=0.22;
        } else if(sel==='nervio_vago'||sel==='plexo_mioenterico'){
            mat.emissive.setRGB(0.05,0.14,0.03); mat.emissiveIntensity=0.24;
        } else if(sel==='arteria_gastrica'){
            mat.emissive.setRGB(0.18,0.03,0.03); mat.emissiveIntensity=0.26;
        } else if(sel==='vena_porta'){
            mat.emissive.setRGB(0.03,0.03,0.18); mat.emissiveIntensity=0.24;
        } else {
            mat.emissive.setRGB(0.04,0.05,0.08); mat.emissiveIntensity=0.12;
        }
    });
}

const partInfo={
    all:{
        n:'Estómago Humano',
        s:'Sistema Digestivo — Órgano de Digestión Química y Mecánica',
        d:'El estómago es un órgano muscular hueco situado en el hipocondrio izquierdo y epigastrio, interpuesto entre el esófago (cardias) y el duodeno (píloro). Su función principal es almacenar, mezclar y digerir químicamente los alimentos mediante ácido clorhídrico (pH 1.5–3.5), pepsinógeno (activado a pepsina) y factor intrínseco (necesario para absorción de vitamina B12). La contracción peristáltica de su triple capa muscular tritúra el alimento en quimo, liberándolo al duodeno en pulsos regulados por el esfínter pilórico.',
        st:[{l:'Capacidad',v:'1–4 litros'},{l:'pH gástrico',v:'1.5 – 3.5 (muy ácido)'},{l:'Capas musculares',v:'3 (oblicua, circular, longitudinal)'},{l:'Vaciamiento gástrico',v:'2–4 horas (mezcla)'}]
    },
    cardias:{
        n:'Cardias',
        s:'Unión Esofagogástrica — Entrada del Estómago',
        d:'El cardias es la región de unión entre el esófago y el estómago, situada a nivel de T11 y a ~40 cm de la arcada dentaria. En esta zona, el esfínter esofágico inferior (EEI) — una zona de alta presión de ~3–4 cm de longitud — mantiene una presión de reposo de 15–30 mmHg para prevenir el reflujo gastroesofágico. El EEI no es un esfínter anatómico estricto (no tiene engrosamiento muscular discreto) sino una zona funcional cuyo tono es modulado por la acetilcolina, la gastrina (aumentan tono), y el VIP y óxido nítrico (disminuyen tono). Su incompetencia es la causa del reflujo gastroesofágico (ERGE).',
        st:[{l:'Localización',v:'T11 (~40 cm de arcada dental)'},{l:'Presión EEI reposo',v:'15–30 mmHg'},{l:'Incompetencia',v:'ERGE (reflujo gastroesofágico)'},{l:'Modulación',v:'ACh, gastrina vs VIP, NO'}]
    },
    fundus:{
        n:'Fundus Gástrico (Fondo)',
        s:'Región Superior — Reservorio Gaseoso y de Relajación Receptiva',
        d:'El fundus es la cúpula del estómago, situada por encima y a la izquierda del cardias, en contacto con el diafragma. Contiene habitualmente la burbuja gástrica de aire (visible en Rx de tórax). Es la región de mayor distensibilidad gracias a la relajación receptiva — una respuesta vagal mediada por NO y VIP que reduce la presión intraluminal cuando entra alimento, aumentando la capacidad gástrica hasta 4 L sin incrementar significativamente la presión. Las células principales del fundus producen pepsinógeno I (el más abundante), y la escasa musculatura oblicua en esta zona lo hace menos activo en la mezcla del contenido.',
        st:[{l:'Función principal',v:'Reservorio + relajación receptiva'},{l:'Gas',v:'Burbuja gástrica (visible en Rx)'},{l:'Relajación mediada por',v:'NO y VIP (nervio vago)'},{l:'Pepsinógeno',v:'Pepsinógeno I (células principales)'}]
    },
    cuerpo:{
        n:'Cuerpo Gástrico',
        s:'Región Media — Zona de Digestión y Producción Ácida',
        d:'El cuerpo gástrico es la región más extensa del estómago, situada entre el fundus y el antro. Alberga la mayor densidad de glándulas oxínticas (fúndicas), que contienen las células parietales (producen HCl y factor intrínseco) y las células principales (producen pepsinógeno). La contracción peristáltica del cuerpo inicia el proceso de mezcla del contenido gástrico. Las células parietales bombean H⁺ mediante la bomba H⁺/K⁺-ATPasa (diana de los inhibidores de bomba de protones, IBP), generando una concentración de H⁺ 3 millones de veces mayor que en sangre.',
        st:[{l:'Glándulas',v:'Oxínticas (fúndicas)'},{l:'Células parietales',v:'HCl + factor intrínseco'},{l:'Bomba de protones',v:'H⁺/K⁺-ATPasa (diana IBP)'},{l:'Células principales',v:'Pepsinógeno I y II'}]
    },
    antro:{
        n:'Antro Pilórico',
        s:'Región Distal — Molino Gástrico y Control Hormonal',
        d:'El antro pilórico ocupa el tercio distal del estómago y es el "molino gástrico" — su musculatura circular más gruesa genera contracciones potentes que trituran los sólidos y los mezclan con el jugo gástrico. Aquí se concentran las células G (productoras de gastrina, la principal hormona estimulante de la secreción ácida), las células D (somatostatina, inhibidora de la gastrina) y las células EC (serotonina). El pH del antro se mantiene más elevado (~4–6) que el del cuerpo, lo que favorece la actividad de la gastrina. La bacteria H. pylori coloniza preferentemente el antro, causando gastritis antral y úlcera duodenal.',
        st:[{l:'Función mecánica',v:'Molino gástrico (trituración)'},{l:'Células G',v:'Gastrina (estimula HCl)'},{l:'Células D',v:'Somatostatina (inhibe gastrina)'},{l:'H. pylori',v:'Colonización preferente antral'}]
    },
    piloro:{
        n:'Píloro',
        s:'Esfínter Distal — Control del Vaciamiento Gástrico',
        d:'El píloro es la región de tránsito entre el estómago y el duodeno, compuesta por el canal pilórico (~3 cm) y el esfínter pilórico — un engrosamiento real de la capa muscular circular que a diferencia del EEI sí es anatómicamente distinguible. Regula el vaciamiento gástrico permitiendo el paso de partículas <2 mm (líquidos y partículas sólidas finamente trituradas) hacia el duodeno en pulsos de 2–3 mL. El retroperistaltismo pilórico (cierre precoz durante la contracción antral) devuelve las partículas grandes al cuerpo para mayor trituración. Su hipertrofia en lactantes causa estenosis pilórica hipertrófica (vómitos en proyectil).',
        st:[{l:'Apertura',v:'Partículas <2 mm'},{l:'Pulsos de vaciamiento',v:'2–3 mL por contracción'},{l:'Esfínter',v:'Engrosamiento muscular circular real'},{l:'Patología pediátrica',v:'Estenosis pilórica hipertrófica'}]
    },
    curvatura_mayor:{
        n:'Curvatura Mayor',
        s:'Borde Externo del Estómago — Ligamento Gastroesplénico y Gastroepiploico',
        d:'La curvatura mayor es el borde convexo externo del estómago, que se extiende desde el fundus hasta el píloro. Tiene una longitud de ~40 cm y da inserción al omento mayor (epiplón mayor), el gran delantal peritoneal que cuelga sobre las asas intestinales. En su tercio superior se une al ligamento gastroesplénico (que contiene los vasos cortos gástricos, ramas de la arteria esplénica). La arteria gastroepiploica derecha (rama de la gastroduodenal) y la gastroepiploica izquierda (rama de la esplénica) anastomosan a lo largo de la curvatura mayor. Esta arcada es fundamental en la reconstrucción con tubo gástrico en esofaguectomía.',
        st:[{l:'Longitud',v:'~40 cm'},{l:'Omento mayor',v:'Inserción del epiplón mayor'},{l:'Vasos',v:'Gastroepiploica D + I (arcada)'},{l:'Relevancia qx',v:'Tubo gástrico (esofaguectomía)'}]
    },
    curvatura_menor:{
        n:'Curvatura Menor',
        s:'Borde Interno del Estómago — Ligamento Hepatogástrico',
        d:'La curvatura menor es el borde cóncavo interno del estómago (~15 cm), que une el cardias con el píloro pasando por la incisura angularis. Da inserción al omento menor (epiplón menor), que en su margen libre contiene la tríada portal (vena porta, arteria hepática, conducto colédoco). La arteria gástrica izquierda (rama del tronco celíaco, la mayor irrigación gástrica) y la arteria gástrica derecha (rama de la hepática propia) anastomosan a lo largo de la curvatura menor formando una arcada. Es la localización más frecuente de las úlceras gástricas benignas (incisura angularis).',
        st:[{l:'Longitud',v:'~15 cm'},{l:'Omento menor',v:'Tríada portal en margen libre'},{l:'Vasos',v:'Gástrica I (tronco celíaco) + D'},{l:'Úlcera gástrica',v:'Localización más frecuente'}]
    },
    pared_anterior:{
        n:'Pared Anterior',
        s:'Cara Ventral — Relaciones Anatómicas Anteriores',
        d:'La pared anterior del estómago está en contacto con el lóbulo izquierdo del hígado (superomedialmente), la pared anterior del abdomen (inferiormente, zona del epigastrio) y el diafragma (superiormente). Es la cara accesible quirúrgicamente mediante laparotomía media supraumbilical o laparoscopia. En ella se realiza la gastrostomía percutánea endoscópica (PEG) para nutrición enteral. La perforación de úlceras de la pared anterior produce neumoperitoneo libre (aire subdiafragmático en Rx en bipedestación) y peritonitis química por derrame del contenido gástrico ácido.',
        st:[{l:'Contacto superior',v:'Lóbulo izq. hígado + diafragma'},{l:'Contacto inferior',v:'Pared abdominal anterior'},{l:'Acceso quirúrgico',v:'Laparotomía + laparoscopia'},{l:'Perforación',v:'Neumoperitoneo + peritonitis'}]
    },
    pared_posterior:{
        n:'Pared Posterior',
        s:'Cara Dorsal — Transcavidad de los Epiplones',
        d:'La pared posterior del estómago forma la pared anterior de la transcavidad de los epiplones (bursa omentalis), una cavidad virtual del peritoneo. Sus relaciones anatómicas son el páncreas (principal), el riñón izquierdo y glándula suprarrenal izquierda, el bazo, el mesocolon transverso y la aorta. La pancreatitis aguda grave puede erosionar la pared posterior gástrica, y los pseudoquistes pancreáticos pueden comunicarse con el estómago (pancreatogastrostomía quirúrgica o endoscópica). Las úlceras de la pared posterior pueden penetrar hacia el páncreas, causando dolor irradiado a la espalda.',
        st:[{l:'Transcavidad',v:'Bursa omentalis (cavidad virtual)'},{l:'Relación principal',v:'Páncreas (cabeza y cuerpo)'},{l:'Úlcera penetrante',v:'Hacia páncreas (dolor dorsal)'},{l:'Acceso',v:'A través del omento menor'}]
    },
    incisura:{
        n:'Incisura Angularis',
        s:'Curvatura Menor — Punto de Referencia Endoscópico',
        d:'La incisura angularis (ángulo del estómago) es la escotadura en forma de muesca que marca la unión entre el cuerpo y el antro gástrico en la curvatura menor. Es un punto de referencia endoscópico fundamental que delimita la transición entre la mucosa oxíntica (cuerpo) y la mucosa antral (antro). Es la localización más frecuente de las úlceras gástricas benignas asociadas a H. pylori y AINE. En la endoscopia digestiva alta, la incisura angularis permite la maniobra de retroflexión para examinar el fundus. Su posición varía con el grado de repleción gástrica.',
        st:[{l:'Localización',v:'Curvatura menor (cuerpo-antro)'},{l:'Referencia endoscópica',v:'Límite mucosa oxíntica / antral'},{l:'Úlcera gástrica',v:'Localización más frecuente'},{l:'Endoscopia',v:'Punto de retroflexión'}]
    },
    mucosa:{
        n:'Mucosa Gástrica',
        s:'Capa Interna — Barrera Protectora y Secretora',
        d:'La mucosa gástrica está compuesta por un epitelio cilíndrico simple secretor de moco que tapiza toda la superficie interna formando fóveas gástricas (invaginaciones donde desembocan las glándulas). Produce un gel de moco-bicarbonato de 0.2–0.5 mm de grosor que protege el epitelio del ácido — la "barrera mucosa gástrica". Este moco es producido por las células mucosas del cuello y está compuesto por glicoproteínas de alto peso molecular. Las prostaglandinas E2 estimulan su producción (mecanismo citoprotector); los AINE inhiben las COX, reducen prostaglandinas y comprometen la barrera, favoreciendo las úlceras.',
        st:[{l:'Epitelio',v:'Cilíndrico simple (secretor de moco)'},{l:'Barrera moco-HCO₃',v:'0.2–0.5 mm de grosor'},{l:'Fóveas gástricas',v:'Desembocadura de glándulas'},{l:'AINEs',v:'↓ prostaglandinas → ↓ citoprotección'}]
    },
    submucosa:{
        n:'Submucosa Gástrica',
        s:'Capa de Soporte — Plexo de Meissner y Tejido Conectivo',
        d:'La submucosa es una capa de tejido conjuntivo laxo situada entre la mucosa y la muscular externa. Contiene el plexo submucoso de Meissner (sistema nervioso entérico, controla la secreción y el flujo sanguíneo de la mucosa), vasos sanguíneos y linfáticos, y abundante tejido conectivo elástico que permite la distensión gástrica. La infiltración de la submucosa es un factor pronóstico crítico en el cáncer gástrico: la resección endoscópica (EMR/ESD) es curativa si el tumor está limitado a la mucosa o submucosa superficial (cáncer gástrico precoz T1a/T1b).',
        st:[{l:'Plexo nervioso',v:'Meissner (submucoso)'},{l:'Función',v:'Control secreción + flujo mucoso'},{l:'Elásticidad',v:'Permite distensión gástrica'},{l:'Oncología',v:'T1b (submucosa) = cáncer precoz'}]
    },
    muscular:{
        n:'Capa Muscular (Triple Capa)',
        s:'Musculatura Gástrica — Mezcla y Peristaltismo',
        d:'La pared muscular del estómago es única en el tubo digestivo por tener tres capas en lugar de dos: (1) capa oblicua interna (exclusiva del estómago, especialmente en fundus y cuerpo, genera movimientos de mezcla y trituración), (2) capa circular media (forma el esfínter pilórico; genera las contracciones peristálticas), y (3) capa longitudinal externa (coordinación del peristaltismo). Las contracciones peristálticas gástricas viajan a 3 ciclos/min (controladas por las células intersticiales de Cajal — "marcapasos gástrico" en la curvatura mayor). La metoclopramida y domperidona aumentan la motilidad actuando como antagonistas dopaminérgicos D2.',
        st:[{l:'Capas musculares',v:'3 (oblicua + circular + longitudinal)'},{l:'Capa única',v:'Oblicua (solo en estómago)'},{l:'Frecuencia peristáltica',v:'3 contracciones/min'},{l:'Marcapasos',v:'Células de Cajal (curvatura mayor)'}]
    },
    serosa:{
        n:'Serosa (Peritoneo Visceral)',
        s:'Capa Externa — Recubrimiento Peritoneal',
        d:'La serosa es la capa más externa de la pared gástrica, compuesta por mesotelio (epitelio escamoso simple) sobre una delgada capa de tejido conjuntivo. Corresponde al peritoneo visceral que recubre el estómago en casi su totalidad (órgano intraperitoneal). Produce el líquido peritoneal que lubrica los movimientos peristálticos. La afectación de la serosa por cáncer gástrico (pT3 = invasión serosa, pT4 = perforación serosa) implica riesgo de diseminación peritoneal (carcinomatosis) y es el principal factor pronóstico adverso en el estadiaje del cáncer gástrico (clasificación TNM).',
        st:[{l:'Tipo de recubrimiento',v:'Peritoneo visceral (mesotelio)'},{l:'Posición',v:'Órgano intraperitoneal'},{l:'Función',v:'Lubricación (líquido peritoneal)'},{l:'Cáncer pT3/pT4',v:'Invasión/perforación serosa'}]
    },
    rugosidades:{
        n:'Rugosidades Gástricas',
        s:'Pliegues Mucosos — Adaptación a la Distensión',
        d:'Las rugosidades (pliegues o arrugas gástricas) son elevaciones longitudinales de la mucosa y submucosa que se aplanan cuando el estómago se distiende. Son más prominentes a lo largo de la curvatura mayor y en el cuerpo. En la curvatura menor, los pliegues longitudinales forman el "canal gástrico" (magenstrasse), que dirige los líquidos directamente hacia el píloro sin mezclarse con el contenido sólido del fundus. En la endoscopia, la ausencia o aplanamiento de las rugosidades puede indicar linfoma gástrico difuso (tipo MALT) o linitis plástica (cáncer gástrico infiltrante difuso).',
        st:[{l:'Función',v:'Aumentan superficie + permiten distensión'},{l:'Canal gástrico',v:'Magenstrasse (líquidos → píloro)'},{l:'Prominencia',v:'Mayor en curvatura mayor y cuerpo'},{l:'Patología',v:'Aplanamiento = linfoma MALT / linitis'}]
    },
    esfinter_cardial:{
        n:'Esfínter Esofagogástrico (EEI)',
        s:'Barrera Antirreflujo — Unión Esofagogástrica',
        d:'El esfínter esofágico inferior (EEI) es una zona funcional de alta presión (~15–30 mmHg) de ~3–4 cm de longitud en la unión esofagogástrica que previene el reflujo del contenido gástrico ácido al esófago. Se relaja transitoriamente (RTEEI) con la deglución y patológicamente de forma espontánea. Su tono es mantenido por la musculatura lisa intrínseca con modulación neural (aumento: acetilcolina, gastrina, motilina; disminución: VIP, NO, CCK, progesterona). La debilidad crónica del EEI, combinada con hernia hiatal, es la fisiopatología de la ERGE. La fundoplicatura (Nissen) restaura quirúrgicamente la barrera antirreflujo.',
        st:[{l:'Presión de reposo',v:'15–30 mmHg'},{l:'Longitud',v:'3–4 cm'},{l:'Patología principal',v:'ERGE (reflujo gastroesofágico)'},{l:'Cirugía',v:'Fundoplicatura de Nissen'}]
    },
    esfinter_pilorico:{
        n:'Esfínter Pilórico',
        s:'Control del Vaciamiento — Regulador Gastroduodenal',
        d:'El esfínter pilórico es un engrosamiento real y anatómicamente diferenciable de la capa muscular circular que controla el paso del contenido gástrico al duodeno. A diferencia del EEI, sí es una estructura anatómica discreta. Regula el vaciamiento permitiendo solo partículas <2 mm y fluidos cuando el pH duodenal y la osmolaridad son adecuados. Se modula por reflejos enterogástricos (retroalimentación negativa del duodeno): la secretina, CCK y el reflejo enterogástrico inhiben el vaciamiento cuando el duodeno recibe contenido ácido o graso. Su hipertrofia congénita (estenosis pilórica) causa vómitos en proyectil no biliosos en lactantes.',
        st:[{l:'Tipo',v:'Esfínter anatómico real'},{l:'Apertura permitida',v:'Partículas <2 mm + fluidos'},{l:'Inhibición',v:'Secretina, CCK (señal duodenal)'},{l:'Hipertrofia congénita',v:'Estenosis pilórica (lactantes)'}]
    },
    glándulas:{
        n:'Glándulas Gástricas',
        s:'Unidades Secretoras — Producción de Jugo Gástrico',
        d:'Las glándulas gástricas son estructuras tubulares que desembocan en las fóveas gástricas y producen el jugo gástrico (~2–3 L/día). Se clasifican en: glándulas cardiales (moco neutro), glándulas oxínticas o fúndicas (predominantes en fundus y cuerpo: células parietales secretan HCl + factor intrínseco; células principales secretan pepsinógeno; células mucosas del cuello secretan moco ácido; células ECL secretan histamina) y glándulas pilóricas (antro: células G secretan gastrina; células D secretan somatostatina; moco alcalino). La gastrina, histamina y acetilcolina estimulan las células parietales de forma sinérgica.',
        st:[{l:'Producción diaria',v:'2–3 litros de jugo gástrico'},{l:'Glándulas oxínticas',v:'HCl + pepsinógeno + histamina'},{l:'Glándulas pilóricas',v:'Gastrina (cél. G) + somatostatina (D)'},{l:'Estimulación ácida',v:'Gastrina + histamina + ACh (sinérgico)'}]
    },
    celulas_parietales:{
        n:'Células Parietales (Oxínticas)',
        s:'Glándulas Oxínticas — Productoras de HCl y Factor Intrínseco',
        d:'Las células parietales (oxínticas) son las células más grandes de las glándulas gástricas, ubicadas en la mitad superior de las glándulas oxínticas del cuerpo y fundus. Producen dos secretos vitales: (1) HCl — mediante la bomba H⁺/K⁺-ATPasa en los canalículos secretores intracelulares, generando una concentración de H⁺ de ~150 mEq/L (pH < 1), impulsada por el ATP mitocondrial (las células parietales tienen la mayor densidad mitocondrial del organismo); y (2) Factor intrínseco — glicoproteína esencial para la absorción ileal de vitamina B12. Su destrucción autoinmune causa gastritis atrófica tipo A y anemia perniciosa.',
        st:[{l:'Productos',v:'HCl (150 mEq/L) + factor intrínseco'},{l:'Bomba',v:'H⁺/K⁺-ATPasa (diana de los IBP)'},{l:'Mitocondrias',v:'Mayor densidad mitocondrial del cuerpo'},{l:'Autoinmunidad',v:'Destrucción → anemia perniciosa'}]
    },
    nervio_vago:{
        n:'Nervio Vago (NC X)',
        s:'Inervación Parasimpática — Control de la Secreción y Motilidad',
        d:'El nervio vago (NC X) proporciona la inervación parasimpática del estómago a través de los troncos vagales anterior (predominantemente del vago izquierdo, inerva la cara anterior y el hígado mediante ramas hepáticas) y posterior (del vago derecho, inerva la cara posterior y el celíaco mediante ramas celíacas). Las fibras preganglionares hacen sinapsis en los plexos mientérico y submucoso. La estimulación vagal en la fase cefálica de la digestión (visión y olfato de alimentos) activa las células parietales directamente (vía ACh/M3) y mediante células ECL (histamina). La vagotomía troncular fue el tratamiento quirúrgico estándar de la úlcera péptica antes de los IBP.',
        st:[{l:'Troncos vagales',v:'Anterior (izq.) + posterior (der.)'},{l:'Fase cefálica',v:'Estimula secreción ácida (ACh)'},{l:'Via célula ECL',v:'Vago → histamina → HCl'},{l:'Vagotomía',v:'Tratamiento qx histórico úlcera péptica'}]
    },
    plexo_mioenterico:{
        n:'Plexo Mientérico de Auerbach',
        s:'Sistema Nervioso Entérico — Control Autónomo Local',
        d:'El plexo mientérico de Auerbach es una red neuronal situada entre las capas circular y longitudinal de la muscular externa, formando parte del sistema nervioso entérico (SNE) — el "segundo cerebro" con ~500 millones de neuronas. Controla la motilidad gástrica (frecuencia, amplitud y coordinación de las contracciones peristálticas) de forma semiautónoma, aunque modulado por el vago (parasimpático) y el simpático. Sus neuronas motoras excitadoras liberan ACh y sustancia P; las inhibidoras liberan VIP y NO. La degeneración de las neuronas del SNE gástrico causa gastroparesia. El plexo submucoso de Meissner controla la secreción.',
        st:[{l:'Localización',v:'Entre capas muscular circular y longitudinal'},{l:'Función',v:'Control motilidad gástrica'},{l:'Neuronas excit./inhib.',v:'ACh, SP / VIP, NO'},{l:'Degeneración',v:'Gastroparesia (vaciamiento retardado)'}]
    },
    arteria_gastrica:{
        n:'Arterias Gástricas',
        s:'Vascularización Arterial — Tronco Celíaco',
        d:'El estómago es irrigado por ramas del tronco celíaco (primera rama de la aorta abdominal, nivel T12): (1) Curvatura menor: arteria gástrica izquierda (coronaria estomáquica, la mayor y más importante, directa del tronco celíaco) y arteria gástrica derecha (rama de la hepática propia); (2) Curvatura mayor: arteria gastroepiploica derecha (rama de la gastroduodenal, rama de la hepática común) y gastroepiploica izquierda (rama de la arteria esplénica); (3) Fundus: arterias gástricas cortas (4-6 ramas de la esplénica). Esta rica red anastomótica hace que la isquemia gástrica aislada sea excepcional. La arteria gástrica izquierda es ligada en la gastrectomía y es origen de embolización en el tratamiento de la obesidad.',
        st:[{l:'Origen',v:'Tronco celíaco (T12)'},{l:'Mayor arteria',v:'Gástrica izquierda (curvatura menor)'},{l:'Curvatura mayor',v:'Gastroepiploica D + I'},{l:'Fundus',v:'Arterias cortas gástricas (esplénica)'}]
    },
    vena_porta:{
        n:'Drenaje Venoso (Sistema Porta)',
        s:'Vascularización Venosa — Vía Portal Hepática',
        d:'El drenaje venoso gástrico drena hacia el sistema venoso portal, que lleva la sangre del tracto digestivo al hígado antes de la circulación sistémica: la vena gástrica izquierda (coronaria estomáquica) y la derecha drenan a la vena porta; las gastroepiploicas drenan a la vena esplénica (izquierda) y a la mesentérica superior (derecha); las venas gástricas cortas drenan a la esplénica. En la hipertensión portal (por cirrosis), el sistema porta se descomprime por colaterales portosistémicas, incluyendo las varices esofágicas (anastomosis con el sistema ácigos a través de las venas gástricas izquierdas), que pueden sangrar de forma masiva y mortal.',
        st:[{l:'Drenaje',v:'Sistema porta (→ hígado)'},{l:'Vena principal',v:'Gástrica izquierda → porta'},{l:'Hipertensión portal',v:'Varices esofágicas (riesgo hemorragia)'},{l:'Esplenomegalia',v:'Por hipertensión portal (congestiva)'}]
    }
};

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
