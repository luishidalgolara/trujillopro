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
scene.fog=new THREE.FogExp2(0xf5f7fa,0.018);

const camera=new THREE.PerspectiveCamera(42,innerWidth/(innerHeight-52),0.01,100);
camera.position.set(0,0.5,4.0);

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setSize(innerWidth,innerHeight-52);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=0.95;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera,canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.06;
ctrl.rotateSpeed=0.7; ctrl.zoomSpeed=0.8;
ctrl.minDistance=1.0; ctrl.maxDistance=10;
ctrl.target.set(0,0,0);
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

setLoad(50,'Cargando modelo uterino...');
let model=null, meshes=[];

new GLTFLoader().load('utero3d.glb',
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

            // Miometrio — músculo liso uterino
            const isMyometrium=/(myometr|miometr|muscle|muscul|smooth|wall|pared|uterine.wall|uterus.body)/i.test(combined);
            // Endometrio — mucosa interna
            const isEndometrium=/(endometr|mucosa|lining|inner|cavity|cavidad|endome)/i.test(combined);
            // Cérvix / cuello
            const isCervix=/(cervix|cervic|cuello|ectocervix|endocervix|canal)/i.test(combined);
            // Trompas de Falopio
            const isTube=/(tube|trompa|fallopian|salpinx|fimbri|infundib|ampulla|ampola)/i.test(combined);
            // Ovario
            const isOvary=/(ovar|ovari|follic|folicul|corpus.luteum|cuerpo.luteo)/i.test(combined);
            // Ligamentos
            const isLigament=/(ligament|ligamento|broad|ancho|round|redondo|cardinal|mackenrodt|uterosakral|uteroovari)/i.test(combined);
            // Serosa / perimetrio
            const isSerosa=/(serosa|periton|perimetr|outer|extern)/i.test(combined);
            // Vasos sanguíneos
            const isVessel=/(vessel|vaso|artery|arteria|vein|vena|blood|vascular|uterine.art|ovarian)/i.test(combined);
            // Nervios
            const isNerve=/(nerve|nervio|neural|plexus|plexo)/i.test(combined);

            const pm=new THREE.MeshPhysicalMaterial();
            if(mat){
                if(mat.map) pm.map=mat.map;
                if(mat.normalMap){pm.normalMap=mat.normalMap; pm.normalScale=new THREE.Vector2(1.4,1.4);}
                if(mat.roughnessMap) pm.roughnessMap=mat.roughnessMap;
                if(mat.metalnessMap) pm.metalnessMap=mat.metalnessMap;
                if(mat.color) pm.color.copy(mat.color);
            }

            if(isMyometrium){
                // Miometrio: músculo liso rosado-rojo intenso, SSS visible
                pm.roughness=0.65; pm.metalness=0;
                pm.sheen=0.40; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.95,0.62,0.65);
                pm.clearcoat=0.10; pm.clearcoatRoughness=0.60;
                pm.thickness=1.0; pm.attenuationColor=new THREE.Color(0.92,0.60,0.62);
                pm.attenuationDistance=1.1;
                pm.emissive=new THREE.Color(0.10,0.03,0.03); pm.emissiveIntensity=0.11;
                pm.envMapIntensity=0.20;
            } else if(isEndometrium){
                // Endometrio: rojizo húmedo y brillante
                pm.roughness=0.38; pm.metalness=0;
                pm.sheen=0.58; pm.sheenRoughness=0.42;
                pm.sheenColor=new THREE.Color(1.0,0.65,0.68);
                pm.clearcoat=0.32; pm.clearcoatRoughness=0.22;
                pm.thickness=0.5; pm.attenuationColor=new THREE.Color(0.96,0.58,0.60);
                pm.attenuationDistance=0.6;
                pm.emissive=new THREE.Color(0.15,0.03,0.04); pm.emissiveIntensity=0.15;
                pm.envMapIntensity=0.42;
            } else if(isCervix){
                // Cérvix: tejido más firme, ligeramente más pálido
                pm.roughness=0.55; pm.metalness=0;
                pm.sheen=0.30; pm.sheenRoughness=0.52;
                pm.sheenColor=new THREE.Color(0.95,0.70,0.72);
                pm.clearcoat=0.18; pm.clearcoatRoughness=0.40;
                pm.thickness=0.7; pm.attenuationColor=new THREE.Color(0.94,0.68,0.70);
                pm.attenuationDistance=0.8;
                pm.emissive=new THREE.Color(0.10,0.03,0.04); pm.emissiveIntensity=0.11;
                pm.envMapIntensity=0.28;
            } else if(isTube){
                // Trompas: tubos delgados rosados con brillo seroso
                pm.roughness=0.45; pm.metalness=0;
                pm.sheen=0.45; pm.sheenRoughness=0.46;
                pm.sheenColor=new THREE.Color(0.98,0.68,0.70);
                pm.clearcoat=0.25; pm.clearcoatRoughness=0.28;
                pm.thickness=0.4; pm.attenuationColor=new THREE.Color(0.96,0.65,0.68);
                pm.attenuationDistance=0.5;
                pm.emissive=new THREE.Color(0.12,0.03,0.04); pm.emissiveIntensity=0.13;
                pm.envMapIntensity=0.38;
            } else if(isOvary){
                // Ovario: superficie irregular, amarillento-rosado
                pm.roughness=0.60; pm.metalness=0;
                pm.sheen=0.35; pm.sheenRoughness=0.55;
                pm.sheenColor=new THREE.Color(0.95,0.85,0.60);
                pm.clearcoat=0.14; pm.clearcoatRoughness=0.50;
                pm.thickness=0.6; pm.attenuationColor=new THREE.Color(0.94,0.82,0.58);
                pm.attenuationDistance=0.7;
                pm.emissive=new THREE.Color(0.08,0.06,0.02); pm.emissiveIntensity=0.10;
                pm.envMapIntensity=0.25;
            } else if(isLigament){
                // Ligamentos: tejido conectivo fibroso blanquecino
                pm.roughness=0.68; pm.metalness=0;
                pm.sheen=0.18; pm.sheenRoughness=0.62;
                pm.sheenColor=new THREE.Color(0.92,0.86,0.82);
                pm.clearcoat=0.06; pm.clearcoatRoughness=0.70;
                pm.emissive=new THREE.Color(0.04,0.04,0.05); pm.emissiveIntensity=0.07;
                pm.envMapIntensity=0.18;
            } else if(isSerosa){
                // Serosa/perimetrio: fina capa brillante
                pm.roughness=0.32; pm.metalness=0;
                pm.clearcoat=0.55; pm.clearcoatRoughness=0.18;
                pm.sheen=0.30; pm.sheenRoughness=0.38;
                pm.sheenColor=new THREE.Color(0.96,0.78,0.80);
                pm.transmission=0.05; pm.thickness=0.15; pm.ior=1.38;
                pm.emissive=new THREE.Color(0.06,0.04,0.05); pm.emissiveIntensity=0.08;
                pm.envMapIntensity=0.55;
            } else if(isVessel){
                // Vasos: rojo arterial brillante
                pm.roughness=0.24; pm.metalness=0;
                pm.clearcoat=0.58; pm.clearcoatRoughness=0.14;
                pm.sheen=0.42; pm.sheenRoughness=0.34;
                pm.sheenColor=new THREE.Color(1.0,0.52,0.55);
                pm.emissive=new THREE.Color(0.20,0.03,0.03); pm.emissiveIntensity=0.20;
                pm.envMapIntensity=0.62;
            } else if(isNerve){
                pm.roughness=0.58; pm.metalness=0;
                pm.sheen=0.32; pm.sheenRoughness=0.50;
                pm.sheenColor=new THREE.Color(0.95,0.90,0.65);
                pm.emissive=new THREE.Color(0.06,0.07,0.02); pm.emissiveIntensity=0.13;
                pm.envMapIntensity=0.22;
            } else {
                pm.roughness=mat&&mat.roughness!=null?mat.roughness:0.60;
                pm.metalness=mat&&mat.metalness!=null?mat.metalness:0;
                pm.clearcoat=0.14; pm.clearcoatRoughness=0.48;
                pm.sheen=0.25; pm.sheenRoughness=0.54;
                pm.sheenColor=new THREE.Color(0.94,0.72,0.74);
                pm.emissive=new THREE.Color(0.07,0.03,0.03); pm.emissiveIntensity=0.09;
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
    e=>{console.error(e); setLoad(0,'Error al cargar. Verifica que utero3d.glb esté en la misma carpeta.')}
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
        } else if(sel==='fondo'){
            mat.emissive.setRGB(0.16,0.04,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='cuerpo'){
            mat.emissive.setRGB(0.14,0.03,0.04); mat.emissiveIntensity=0.23;
        } else if(sel==='istmo'){
            mat.emissive.setRGB(0.13,0.03,0.04); mat.emissiveIntensity=0.22;
        } else if(sel==='cervix'||sel==='canal_cervical'){
            mat.emissive.setRGB(0.12,0.03,0.05); mat.emissiveIntensity=0.24;
        } else if(sel==='endometrio'){
            mat.emissive.setRGB(0.18,0.04,0.05); mat.emissiveIntensity=0.28;
        } else if(sel==='miometrio'){
            mat.emissive.setRGB(0.14,0.03,0.03); mat.emissiveIntensity=0.23;
        } else if(sel==='perimetrio'){
            mat.emissive.setRGB(0.06,0.07,0.12); mat.emissiveIntensity=0.20;
        } else if(sel==='cavidad'){
            mat.emissive.setRGB(0.18,0.05,0.05); mat.emissiveIntensity=0.28;
        } else if(sel==='orificio_int'||sel==='orificio_ext'){
            mat.emissive.setRGB(0.14,0.04,0.06); mat.emissiveIntensity=0.24;
        } else if(sel==='trompa_ist'||sel==='trompa_amp'||sel==='trompa_int'){
            mat.emissive.setRGB(0.14,0.05,0.04); mat.emissiveIntensity=0.24;
        } else if(sel==='infundibulo'){
            mat.emissive.setRGB(0.16,0.05,0.04); mat.emissiveIntensity=0.26;
        } else if(sel==='ovario'){
            mat.emissive.setRGB(0.10,0.08,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='corteza_ov'){
            mat.emissive.setRGB(0.10,0.08,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='medula_ov'){
            mat.emissive.setRGB(0.08,0.06,0.02); mat.emissiveIntensity=0.20;
        } else if(sel==='foliculos'){
            mat.emissive.setRGB(0.12,0.10,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='lig_ancho'){
            mat.emissive.setRGB(0.04,0.06,0.16); mat.emissiveIntensity=0.22;
        } else if(sel==='lig_redondo'){
            mat.emissive.setRGB(0.04,0.05,0.14); mat.emissiveIntensity=0.22;
        } else if(sel==='lig_uteroovario'){
            mat.emissive.setRGB(0.04,0.05,0.13); mat.emissiveIntensity=0.20;
        } else if(sel==='lig_cardinal'){
            mat.emissive.setRGB(0.03,0.04,0.12); mat.emissiveIntensity=0.20;
        } else if(sel==='arteria_uterina'){
            mat.emissive.setRGB(0.20,0.03,0.03); mat.emissiveIntensity=0.28;
        } else if(sel==='arteria_ovarica'){
            mat.emissive.setRGB(0.18,0.03,0.03); mat.emissiveIntensity=0.26;
        } else if(sel==='plexo_utero'){
            mat.emissive.setRGB(0.05,0.15,0.03); mat.emissiveIntensity=0.24;
        } else {
            mat.emissive.setRGB(0.04,0.05,0.08); mat.emissiveIntensity=0.12;
        }
    });
}

const partInfo={
    all:{
        n:'Útero y Sistema Reproductor Femenino',
        s:'Sistema Reproductor — Órganos Genitales Internos Femeninos',
        d:'El aparato reproductor femenino interno está formado por el útero, las trompas de Falopio y los ovarios. El útero es un órgano muscular hueco en forma de pera invertida donde tiene lugar la implantación, el desarrollo fetal y el parto. Las trompas de Falopio comunican los ovarios con el útero y son el sitio de fertilización. Los ovarios producen ovocitos y hormonas sexuales (estrógenos y progesterona) en ciclos mensuales de aproximadamente 28 días.',
        st:[{l:'Útero (nulípara)',v:'7.5 × 5 × 3 cm, ~70 g'},{l:'Ovario',v:'3 × 2 × 1 cm, ~8-10 g'},{l:'Trompa de Falopio',v:'~10-12 cm de longitud'},{l:'Ciclo menstrual',v:'~28 días (folicular + lútea)'}]
    },
    fondo:{
        n:'Fondo Uterino',
        s:'Región Superior del Útero — Cúpula Muscular',
        d:'El fondo uterino es la parte más superior y redondeada del útero, situada por encima de la línea de inserción de las trompas de Falopio (ostios tubáricos). Es la región de mayor grosor miometrial y la que sufre la mayor hipertrofia durante el embarazo. La palpación del fondo uterino es fundamental en la monitorización obstétrica: la altura del fondo uterino (distancia sínfisis pubiana-fondo) permite estimar la edad gestacional (regla de McDonald: cm ≈ semanas de gestación entre las 20–36 semanas). En el posparto, la involución uterina se monitoriza midiendo el descenso del fondo a razón de ~1 cm/día.',
        st:[{l:'Límite',v:'Por encima de ostios tubáricos'},{l:'Mayor grosor',v:'Miometrial (hipertrofia en embarazo)'},{l:'Altura fúndica',v:'cm ≈ semanas (regla McDonald)'},{l:'Posparto',v:'Involución ~1 cm/día'}]
    },
    cuerpo:{
        n:'Cuerpo Uterino',
        s:'Región Principal — Cavidad de Implantación',
        d:'El cuerpo uterino es la porción media y mayor del útero, de forma triangular en su sección coronal, con la base hacia arriba (fondo) y el vértice hacia abajo (istmo). Sus paredes anterior y posterior están compuestas principalmente por miometrio con endometrio tapizando la cavidad interna. Es el sitio de implantación del blastocisto (6–7 días posovulación) en la pared posterior del cuerpo. En la histeroscopia, el cuerpo es la región examinada para diagnóstico de miomas submucosos, pólipos endometriales, sinequias y malformaciones uterinas. La relación cuerpo/cuello es 2:1 en mujeres adultas y 1:2 en niñas prepúberes.',
        st:[{l:'Forma',v:'Triangular (base → fondo, vértice → istmo)'},{l:'Implantación',v:'Pared posterior (día 6-7 post-ovulación)'},{l:'Relación cuerpo/cuello',v:'2:1 (adulta) / 1:2 (prepúber)'},{l:'Histeroscopia',v:'Diagnóstico miomas, pólipos, sinequias'}]
    },
    istmo:{
        n:'Istmo Uterino',
        s:'Zona de Transición — Segmento Uterino Inferior',
        d:'El istmo es el segmento estrecho de transición entre el cuerpo uterino y el cérvix, de ~1 cm de longitud en la mujer no gestante. Durante el tercer trimestre del embarazo, el istmo se despliega y forma el segmento uterino inferior (SUI), que puede alcanzar 8–10 cm de longitud. El SUI es de importancia quirúrgica crítica: la histerotomía en la cesárea se realiza en el SUI (segmento inferior) porque es menos vascularizado, no contráctil y cicatriza mejor que el cuerpo. El orificio cervical interno anatómico coincide con el límite istmo-cérvix. La incompetencia ístmico-cervical causa abortos tardíos y partos prematuros.',
        st:[{l:'Longitud en reposo',v:'~1 cm'},{l:'En embarazo',v:'Forma SUI (segmento uterino inferior)'},{l:'Cesárea',v:'Histerotomía en SUI (menos vascular)'},{l:'Incompetencia',v:'Abortos tardíos + parto prematuro'}]
    },
    cervix:{
        n:'Cérvix (Cuello Uterino)',
        s:'Segmento Inferior — Barrera y Canal de Paso',
        d:'El cérvix es la porción inferior cilíndrica del útero, de ~3–4 cm de longitud y 2–3 cm de diámetro. Se divide en endocérvix (canal cervical, revestido por epitelio cilíndrico secretor de moco) y ectocérvix (porción vaginal, revestido por epitelio escamoso estratificado no queratinizado). La unión escamo-columnar (UEC o zona de transformación) es el sitio de mayor vulnerabilidad carcinogenética: es donde el VPH (virus del papiloma humano, serotipos 16 y 18) se integra y puede inducir displasia cervical (NIC) y carcinoma escamoso cervical. El moco cervical varía con el ciclo menstrual: filante, acuoso y permeable en la ovulación (influjo estrogénico); espeso e impenetrable en la fase lútea (progesterona).',
        st:[{l:'Longitud',v:'3–4 cm'},{l:'Zona de transformación',v:'UEC (unión escamo-columnar)'},{l:'Carcinogenética',v:'VPH 16/18 → NIC → Ca escamoso'},{l:'Moco cervical',v:'Filante (ovulación) / espeso (lútea)'}]
    },
    canal_cervical:{
        n:'Canal Cervical',
        s:'Endocérvix — Vía de Paso y Barrera Inmunológica',
        d:'El canal cervical es el conducto que atraviesa el cérvix desde el orificio cervical interno (OCI, límite con el istmo) hasta el orificio cervical externo (OCE, límite con la vagina). Mide ~3 cm y tiene forma de huso (fusiforme). Está revestido por epitelio cilíndrico mucosecretor con pliegues en palmas de árbol (arbor vitae). Las glándulas cervicales producen el tapón mucoso (Kristeller) que ocluye el canal durante el embarazo, protegiendo la cavidad uterina de las infecciones ascendentes. Durante el parto, el borramiento y dilatación cervical son los parámetros que marcan el progreso del trabajo de parto.',
        st:[{l:'Longitud',v:'~3 cm (OCI → OCE)'},{l:'Forma',v:'Fusiforme (huso)'},{l:'Tapón mucoso',v:'Protección antimicrobiana en embarazo'},{l:'Parto',v:'Borramiento + dilatación (0→10 cm)'}]
    },
    endometrio:{
        n:'Endometrio',
        s:'Capa Interna Mucosa — Sitio de Implantación',
        d:'El endometrio es la mucosa que tapiza la cavidad uterina, compuesta por epitelio cilíndrico simple con glándulas tubulares y un estroma vascularizado. Consta de dos capas: la capa funcional (superficial, ~4–14 mm en fase proliferativa tardía, se descama en la menstruación) y la capa basal (profunda, ~2 mm, permanente, fuente de regeneración). Responde cíclicamente a las hormonas ováricas: estrógenos inducen proliferación (fase proliferativa/folicular); la progesterona post-ovulación induce transformación secretora (fase secretora/lútea), preparando el lecho de implantación. Si no hay implantación, la caída de progesterona desencadena la menstruación (desprendimiento de la capa funcional).',
        st:[{l:'Capa funcional',v:'Se descama (menstruación cada ~28d)'},{l:'Capa basal',v:'Permanente (fuente regenerativa)'},{l:'Grosor máximo',v:'~14 mm (fase proliferativa tardía)'},{l:'Ciclo',v:'Estrógenos (prolif.) → Prog. (secretora)'}]
    },
    miometrio:{
        n:'Miometrio',
        s:'Capa Muscular — Motor del Parto',
        d:'El miometrio es la capa media y más gruesa del útero (~2 cm en reposo), compuesta por músculo liso organizado en tres capas mal delimitadas: longitudinal externa, circular media (más desarrollada, forma el esfínter de los ostios tubáricos) y longitudinal interna (subvascular). En el embarazo, sufre una enorme hipertrofia e hiperplasia: el peso uterino pasa de ~70 g a ~1,100 g al término. Las contracciones uterinas del parto son generadas por el miometrio bajo estímulo oxitocinérgico (receptores de oxitocina aumentan x100-200 al término) y prostaglandinas. Los miomas (leiomiomas) son tumores benignos de músculo liso miometrial, los más frecuentes en mujeres en edad fértil (20-30%).',
        st:[{l:'Grosor en reposo',v:'~2 cm'},{l:'Peso en embarazo',v:'~70 g → ~1,100 g (término)'},{l:'Contracción',v:'Oxitocina + prostaglandinas'},{l:'Patología frecuente',v:'Leiomioma (mioma, 20-30%)'}]
    },
    perimetrio:{
        n:'Perimetrio (Serosa)',
        s:'Capa Externa — Peritoneo Visceral Uterino',
        d:'El perimetrio es la capa más externa del útero, formada por el peritoneo visceral que recubre el útero en su mayor parte. Cubre completamente el fondo y el cuerpo posterior; en la cara anterior solo cubre hasta el istmo (reflexión vesicouterina), formando la excavación vesicouterina (fondo de saco anterior de Douglas). Posteriormente, el peritoneo cubre el cérvix y la pared vaginal posterior, formando la excavación rectouterina (fondo de saco de Douglas posterior, el punto más bajo de la cavidad peritoneal), que se puede puncionar por colpocentesis transvaginal para detectar hemoperitoneo. El ligamento ancho es un repliegue doble del perimetrio lateralmente.',
        st:[{l:'Cobertura anterior',v:'Hasta istmo (reflexión vesicouterina)'},{l:'Douglas posterior',v:'Punto más bajo del peritoneo'},{l:'Colpocentesis',v:'Punción Douglas → hemoperitoneo'},{l:'Ligamento ancho',v:'Repliegue lateral del perimetrio'}]
    },
    cavidad:{
        n:'Cavidad Uterina',
        s:'Espacio Virtual — Lecho de Implantación',
        d:'La cavidad uterina es el espacio virtual triangular delimitado por las paredes del endometrio. En la mujer no gestante mide ~6 cm de longitud total (incluyendo canal cervical) y 4 cm en su diámetro transverso máximo. En sus ángulos superiores se abren los ostios tubáricos (entrada de las trompas de Falopio). Mediante histeroscopia se puede examinar directamente: es el "gold standard" para diagnóstico de patología endometrial (pólipos, miomas submucosos, sinequias de Asherman, septo uterino). El dispositivo intrauterino (DIU) se coloca en la cavidad uterina como método anticonceptivo de larga duración.',
        st:[{l:'Longitud total',v:'~6 cm (con canal cervical)'},{l:'Ostios tubáricos',v:'2 ángulos superiores (entrada trompas)'},{l:'Diagnóstico',v:'Histeroscopia (gold standard)'},{l:'DIU',v:'Dispositivo intrauterino (anticonceptivo)'}]
    },
    orificio_int:{
        n:'Orificio Cervical Interno (OCI)',
        s:'Límite Istmo-Cérvix — Punto de Incompetencia Cervical',
        d:'El orificio cervical interno (OCI) es el límite anatómico entre el canal cervical y la cavidad uterina (istmo). Normalmente es una apertura puntiforme de ~3–4 mm de diámetro. En la incompetencia cervical (insuficiencia ístmico-cervical), el OCI se dilata silenciosamente sin contracciones, causando abortos tardíos y partos prematuros. El diagnóstico se realiza mediante ecografía transvaginal midiendo la longitud cervical: longitud <25 mm en la semana 16–24 indica riesgo de parto prematuro. El cerclaje cervical (sutura alrededor del cérvix) es el tratamiento quirúrgico de la incompetencia cervical.',
        st:[{l:'Diámetro normal',v:'3–4 mm'},{l:'Incompetencia',v:'Dilatación silenciosa → aborto tardío'},{l:'Diagnóstico',v:'Ecografía TV: longitud cervical (<25mm)'},{l:'Tratamiento',v:'Cerclaje cervical (McDonald/Shirodkar)'}]
    },
    orificio_ext:{
        n:'Orificio Cervical Externo (OCE)',
        s:'Límite Cérvix-Vagina — Referencia Ginecológica',
        d:'El orificio cervical externo (OCE) es la apertura del canal cervical hacia la vagina, visible en la exploración con espéculo. En nulíparas tiene forma redondeada (puntiforme); tras el parto vaginal se transforma en una hendidura transversal (labio anterior y labio posterior). Es el referente para el frotis de Papanicolaou (citología cervicovaginal): la muestra se toma del OCE y la zona de transformación para detectar células displásicas o malignas. En la colposcopia, el OCE permite localizar la zona de transformación y guiar las biopsias dirigidas. La dilatación del OCE a 10 cm define el final del período de dilatación del parto.',
        st:[{l:'Morfología',v:'Puntiforme (nulípara) / hendidura (tras parto)'},{l:'Papanicolaou',v:'Muestra del OCE + zona transformación'},{l:'Parto',v:'Dilatación completa = 10 cm'},{l:'Colposcopia',v:'Localización zona de transformación'}]
    },
    trompa_ist:{
        n:'Porción Ístmica de la Trompa',
        s:'Trompa de Falopio — Segmento Más Estrecho',
        d:'La porción ístmica es el segmento más estrecho y medial de la trompa de Falopio, de ~3–4 cm de longitud y ~1 mm de luz. Se extiende desde el ostio uterino (intramural) hasta el inicio de la ampolla. Es la región donde se realiza la salpingoclasia (ligadura tubárica) como método de esterilización quirúrgica femenina, tanto en su variante de ligadura-sección (Pomeroy) como de electrocoagulación (Bipolar). También es el sitio de implantación del embarazo ectópico ístmico, que es el más peligroso por la escasa distensibilidad del segmento: la rotura es precoz y la hemorragia interna más severa.',
        st:[{l:'Longitud',v:'~3-4 cm'},{l:'Luz',v:'~1 mm (más estrecha)'},{l:'Ligadura tubárica',v:'Salpingoclasia (Pomeroy, bipolar)'},{l:'Ectópico ístmico',v:'Rotura precoz + hemorragia severa'}]
    },
    trompa_amp:{
        n:'Ampolla Tubárica',
        s:'Trompa de Falopio — Sitio de Fertilización',
        d:'La ampolla es el segmento más largo (~5–8 cm) y ancho de la trompa de Falopio, con una luz de ~3–6 mm. Es el sitio habitual de fertilización: el ovocito II liberado en la ovulación es captado por las fimbrias y transportado a la ampolla, donde puede ser fecundado por un espermatozoide durante las primeras 12–24 horas. El cigoto resultante tarda ~3–4 días en descender hasta la cavidad uterina. La obstrucción tubárica bilateral (por salpingitis, adherencias, o ligadura) impide la fertilización natural — es la indicación principal de fertilización in vitro (FIV). El embarazo ectópico ampular (el más frecuente, 70%) puede tratarse médicamente con metotrexato.',
        st:[{l:'Longitud',v:'~5-8 cm (segmento más largo)'},{l:'Fertilización',v:'Sitio habitual (ovocito + esperm.)'},{l:'Ventana fertilización',v:'12-24 h post-ovulación'},{l:'Ectópico ampular',v:'70% de los ectópicos (metotrexato)'}]
    },
    infundibulo:{
        n:'Infundíbulo y Fimbrias',
        s:'Extremo Distal de la Trompa — Captura del Ovocito',
        d:'El infundíbulo es el extremo distal en forma de embudo de la trompa de Falopio, que se abre libremente hacia la cavidad peritoneal. Sus bordes están festoneados por las fimbrias (15–25 prolongaciones digitiformes), siendo la más larga la fimbria ovárica, que se adosa al polo superior del ovario. En el momento de la ovulación, las fimbrias aumentan su actividad ciliar y sus movimientos activos "barren" el ovocito expulsado desde el folículo hacia el interior de la trompa (captación tubárica). La endometriosis ovárica (endometrioma) puede obliterar las fimbrias. En la histerosalpingografía (HSG), la libre comunicación infundibular con la cavidad peritoneal confirma la permeabilidad tubárica.',
        st:[{l:'Fimbrias',v:'15-25 prolongaciones digitiformes'},{l:'Fimbria ovárica',v:'La más larga (se adosa al ovario)'},{l:'Función',v:'Captación del ovocito post-ovulación'},{l:'Permeabilidad',v:'HSG (histerosalpingografía)'}]
    },
    trompa_int:{
        n:'Porción Intramural de la Trompa',
        s:'Segmento Uterino — Ostio Tubárico',
        d:'La porción intramural (intersticial) es el segmento de la trompa que atraviesa el miometrio uterino, de ~1 cm de longitud y con la luz más estrecha de toda la trompa (~0.1–1 mm). Se abre a la cavidad uterina a través del ostio uterino (ostium tubae uterinum) en los ángulos superiores de la cavidad. El embarazo ectópico intersticial (también llamado cornual) representa solo el 2–4% de los ectópicos pero tiene la mayor mortalidad: por estar rodeado de miometrio, tarda más en romperse (8–16 semanas) pero cuando lo hace la hemorragia es masiva. Su diagnóstico es ecográfico y su tratamiento puede ser médico (metotrexato) o quirúrgico (resección cornual).',
        st:[{l:'Longitud',v:'~1 cm (intramural)'},{l:'Luz',v:'~0.1-1 mm (más estrecha)'},{l:'Ectópico cornual',v:'2-4% pero mayor mortalidad'},{l:'Rotura tardía',v:'8-16 semanas (rodeado de miometrio)'}]
    },
    ovario:{
        n:'Ovario',
        s:'Gónada Femenina — Producción de Ovocitos y Hormonas',
        d:'El ovario es la gónada femenina, de forma ovalada y superficie irregular (por las cicatrices de ovulaciones previas), que mide ~3 × 2 × 1 cm y pesa ~8-10 g. Cumple dos funciones fundamentales: gametogénesis (producción de ovocitos, con una reserva máxima al nacimiento de ~1-2 millones de ovocitos primarios, que desciende a ~300,000 en la pubertad y a ~1,000 en la menopausia) y esteroidogénesis (síntesis de estrógenos por las células de la granulosa y progesterona por el cuerpo lúteo). Está suspendido en el ligamento ancho del útero y conectado al útero por el ligamento útero-ovárico y a la pared pélvica por el ligamento infundibulopélvico (suspensorio del ovario).',
        st:[{l:'Dimensiones',v:'3 × 2 × 1 cm, ~8-10 g'},{l:'Reserva al nacer',v:'~1-2 millones de ovocitos'},{l:'En menopausia',v:'~1,000 ovocitos restantes'},{l:'Hormonas',v:'Estrógenos (granulosa) + progesterona (lúteo)'}]
    },
    corteza_ov:{
        n:'Corteza Ovárica',
        s:'Zona Periférica — Reserva Folicular',
        d:'La corteza ovárica es la zona periférica del ovario, revestida por el epitelio superficial (epitelio germinal, cúbico simple). Contiene el estroma ovárico denso y los folículos en distintos estadios de desarrollo. Los folículos primordiales (reserva folicular) se encuentran en la zona más periférica; los folículos en crecimiento (primarios, secundarios, antrales) progresan hacia el centro. La corteza ovárica puede criopreservarse (congelación de tejido ovárico) antes de quimioterapia o radioterapia gonadotóxica y reimplantarse posteriormente para restaurar la función endocrina y la fertilidad — técnica de preservación de fertilidad en pacientes oncológicas.',
        st:[{l:'Contenido',v:'Folículos en todos los estadios'},{l:'Folículos primordiales',v:'Zona más periférica (reserva)'},{l:'Epitelio',v:'Germinal (cúbico simple)'},{l:'Criopreservación',v:'Técnica preservación fertilidad oncológica'}]
    },
    medula_ov:{
        n:'Médula Ovárica',
        s:'Zona Central — Vascularización e Inervación',
        d:'La médula ovárica es la zona central del ovario, compuesta por tejido conectivo laxo, vasos sanguíneos (arteria y vena ováricas, con sus características espirales), vasos linfáticos y nervios. Los vasos ováricos ingresan al ovario por el hilio ovárico (a través del ligamento infundibulopélvico). La médula no contiene folículos. En el síndrome de torsión ovárica, el pedículo vascular (que incluye la médula) se tuerce, comprometiendo primero el drenaje venoso y linfático (edema ovárico) y después el flujo arterial (necrosis isquémica), constituyendo una urgencia quirúrgica. El tumor de células de Leydig (hiliar) es un tumor productor de andrógenos localizado en la médula.',
        st:[{l:'Contenido',v:'Vasos, nervios, tejido conectivo'},{l:'Sin folículos',v:'Solo en corteza'},{l:'Torsión ovárica',v:'Urgencia qx (necrosis isquémica)'},{l:'Acceso vascular',v:'Hilio ovárico (lig. infundibulopélvico)'}]
    },
    foliculos:{
        n:'Folículos Ováricos',
        s:'Unidades Funcionales — Desarrollo Ovocitario',
        d:'Los folículos ováricos son las unidades funcionales del ovario, cada uno compuesto por un ovocito rodeado de células de la granulosa y una teca. Evolucionan en estadios: folículo primordial (ovocito I en profase I + capa plana de células de granulosa) → folículo primario → folículo secundario (cavidad antral incipiente) → folículo antral (de Graaf, con antrum folicular lleno de líquido folicular, ~20 mm en ovulación). El folículo de De Graaf dominante se selecciona en la fase folicular media bajo el estímulo de FSH; la oleada de LH (pico de LH) a mitad del ciclo desencadena la ovulación y la luteinización del folículo residual en cuerpo lúteo (producción de progesterona).',
        st:[{l:'Folículo de De Graaf',v:'~20 mm en ovulación'},{l:'Selección folicular',v:'Fase media folicular (FSH)'},{l:'Pico de LH',v:'Desencadena ovulación (~día 14)'},{l:'Cuerpo lúteo',v:'Folículo post-ovulatorio (progesterona)'}]
    },
    lig_ancho:{
        n:'Ligamento Ancho',
        s:'Soporte Peritoneal — Hoja Mesentérica del Útero',
        d:'El ligamento ancho es un pliegue peritoneal doble que se extiende lateralmente desde el útero hasta la pared pélvica lateral, formando una especie de mesenterio para el útero. Contiene en su interior: el mesometrio (porción que rodea el útero), el mesosálpinx (porción superior que rodea la trompa de Falopio), el mesoovario (porción posterior que conecta el ovario) y el tejido celular pélvico (parametrio) con los vasos, nervios y uréteres pélvicos. En su base se encuentran los ligamentos cardinales (Mackenrodt). El parametrio, contenido en el ligamento ancho, es el tejido que se diseca en la histerectomía radical (Wertheim) para el cáncer de cérvix.',
        st:[{l:'Contenido',v:'Mesometrio, mesosálpinx, mesoovario'},{l:'Parametrio',v:'Tejido celular pélvico (base del ligamento)'},{l:'Relevancia qx',v:'Disección en histerectomía radical'},{l:'Uréter pélvico',v:'Discurre en la base del lig. ancho'}]
    },
    lig_redondo:{
        n:'Ligamento Redondo',
        s:'Ligamento de Anteversión — Homólogo del Gubernáculo',
        d:'El ligamento redondo es un cordón fibroso de tejido conjuntivo y músculo liso (~12 cm) que se origina en el cuerno uterino (por delante del ostio tubárico), discurre en el ligamento ancho, atraviesa el canal inguinal y termina en el labio mayor de la vulva. Es el homólogo del gubernáculo testicular. Su función principal es mantener la anteversión-anteflexión uterina (aunque es de poca importancia en la práctica). Se hipertrofia durante el embarazo (el dolor en hipogastrio e ingles durante el embarazo — "dolor del ligamento redondo" — es frecuente). En la laparoscopia, sirve como referencia anatómica para identificar el cuerno uterino.',
        st:[{l:'Longitud',v:'~12 cm'},{l:'Trayecto',v:'Cuerno uterino → canal inguinal → labio mayor'},{l:'Función',v:'Mantiene anteversión uterina'},{l:'Embarazo',v:'Dolor inguinal (elongación fisiológica)'}]
    },
    lig_uteroovario:{
        n:'Ligamento Útero-Ovárico',
        s:'Conexión Útero-Ovario — Homólogo del Gubernáculo Distal',
        d:'El ligamento útero-ovárico (ligamento ovárico propio) es un cordón fibroso que conecta el polo inferior del ovario con el cuerno uterino, por detrás del ostio tubárico. Es la porción distal del gubernáculo (la proximal es el ligamento redondo). Tiene escasa función de soporte real, pero es el referente quirúrgico para identificar el ovario en la laparoscopia. En el contexto de la torsión ovárica, el ligamento útero-ovárico puede servir de punto de referencia para la destorsión. Junto con el pedículo infundibulopélvico, es ligado y seccionado en la ooforectomía (extirpación del ovario).',
        st:[{l:'Origen',v:'Polo inferior del ovario'},{l:'Inserción',v:'Cuerno uterino (post. al ostio)'},{l:'Homólogo',v:'Porción distal del gubernáculo'},{l:'Ooforectomía',v:'Se liga junto con lig. infundibulopélvico'}]
    },
    lig_cardinal:{
        n:'Ligamento Cardinal (Mackenrodt)',
        s:'Principal Soporte Uterino — Prevención del Prolapso',
        d:'El ligamento cardinal o de Mackenrodt (ligamento cervical transverso) es el principal soporte del útero y del cérvix, situado en la base del ligamento ancho. Se extiende desde el cérvix y la cúpula vaginal lateral hasta la fascia obturatriz y la pared pélvica lateral. Junto con los ligamentos uterosacros (ligamentos sacroespinosos), forman el anillo de soporte pericervical (nivel II de DeLancey). Su debilitamiento o desgarro (por partos vaginales, multiparidad, hipoestrogenismo) causa el prolapso uterino y de cúpula vaginal. En la histerectomía, su ligadura y sección es el paso quirúrgico más importante para la hemostasia (contiene la arteria uterina).',
        st:[{l:'También llamado',v:'Ligamento cervical transverso'},{l:'Función',v:'Principal soporte uterino (nivel II DeLancey)'},{l:'Debilitamiento',v:'Prolapso uterino / cúpula vaginal'},{l:'Arteria uterina',v:'Discurre en el ligamento cardinal'}]
    },
    arteria_uterina:{
        n:'Arteria Uterina',
        s:'Principal Irrigación Uterina — Rama de la Ilíaca Interna',
        d:"La arteria uterina es la principal irrigación del útero, originándose de la arteria ilíaca interna (hipogástrica). Discurre en el ligamento cardinal, cruzando por encima del uréter pélvico a ~2 cm lateral al cérvix (relación 'agua bajo el puente': arteria = puente, uréter = agua). Este cruce es el sitio más frecuente de lesión ureteral inadvertida en la histerectomía. En el borde lateral del útero, emite ramas ascendente (que irriga cuerpo y fondo anastomosándose con la ovárica) y descendente (cervicovaginal). En la cesárea por hemorragia, la ligadura bilateral de la arteria uterina (técnica de O'Leary) puede controlar la hemorragia preservando el útero.",
        st:[{l:'Origen',v:'Ilíaca interna (hipogástrica)'},{l:'Cruce con uréter',v:'2 cm lateral al cérvix (riesgo qx)'},{l:'Anastomosis',v:'Con arteria ovárica (fundo)'},{l:'Hemostasia qx',v:"Ligadura bilateral (técnica O'Leary)"}]
    },
    arteria_ovarica:{
        n:'Arteria Ovárica',
        s:'Irrigación Ovárica — Rama Directa de la Aorta',
        d:'La arteria ovárica se origina directamente de la aorta abdominal a nivel de L2 (por debajo de las renales), siendo el equivalente femenino de los vasos espermáticos masculinos. Desciende retroperitonealmente, cruza el uréter y los vasos ilíacos externos, y entra al ovario a través del ligamento infundibulopélvico (ligamento suspensorio del ovario). En el hilio ovárico, emite ramas para el ovario y para la trompa (anastomosando con la arteria tubárica, rama uterina). En la ooforectomía y en la histerectomía con salpingooforectomía bilateral, el pedículo infundibulopélvico que contiene la arteria ovárica debe ser ligado con cuidado por su proximidad al uréter.',
        st:[{l:'Origen',v:'Aorta abdominal (L2)'},{l:'Trayecto',v:'Retroperitoneal → lig. infundibulopélvico'},{l:'Anastomosis',v:'Con arteria uterina (ramas tubáricas)'},{l:'Riesgo qx',v:'Proximidad ureteral en pedículo'}]
    },
    plexo_utero:{
        n:'Plexo Uterovaginal',
        s:'Inervación Autonómica — Plexo de Frankenhauser',
        d:'El plexo uterovaginal (plexo de Frankenhauser) es una red nerviosa autonómica situada en el parametrio lateral al cérvix uterino, a los lados de los ligamentos uterosacros. Recibe fibras simpáticas (vasoconstricción, contracción del esfínter cervical) de los nervios hipogástricos (L1-L2, vía plexo hipogástrico superior) y fibras parasimpáticas (vasodilatación, dilatación cervical, contracción miometrial) de los nervios esplácnicos pélvicos (S2-S4, nervios erectores). Las fibras aferentes del dolor uterino (parto, dismenorrea) viajan con las fibras simpáticas hasta T10-L1, explicando la irradiación lumbar y sacra del dolor menstrual. La neurectomía uterosacra laparoscópica puede aliviar la dismenorrea severa.',
        st:[{l:'Localización',v:'Parametrio lateral al cérvix'},{l:'Simpático',v:'Nervios hipogástricos (L1-L2)'},{l:'Parasimpático',v:'Esplácnicos pélvicos (S2-S4)'},{l:'Dolor menstrual',v:'Irradiación T10-L1 (lumbar + sacra)'}]
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
