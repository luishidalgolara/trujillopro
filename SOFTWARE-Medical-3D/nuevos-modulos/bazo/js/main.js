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
scene.background=new THREE.Color(0xf7f3f5);
scene.fog=new THREE.FogExp2(0xf7f3f5, 0.016);

const camera=new THREE.PerspectiveCamera(42, innerWidth/(innerHeight-52), 0.01, 100);
camera.position.set(0, 0.5, 4.5);

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
ctrl.minDistance=1.0; ctrl.maxDistance=12;
ctrl.target.set(0, 0, 0);
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.35;

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
            vec3 c=mix(vec3(.93,.88,.90),mix(vec3(.96,.92,.94),vec3(.98,.95,.96),smoothstep(.3,1.,y)),smoothstep(0.,.3,y));
            c+=vec3(1.0,.82,.85)*pow(max(0.,dot(d,normalize(vec3(.8,.5,.4)))),8.)*.16;
            c+=vec3(.85,.78,.82)*pow(max(0.,dot(d,normalize(vec3(-.6,.3,-.5)))),5.)*.10;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc,0.04).texture;
pmrem.dispose();

// ===== LIGHTING =====
setLoad(30,'Iluminación...');
scene.add(new THREE.HemisphereLight(0xffeef2, 0xddbbcc, 1.05));

const keyLight=new THREE.DirectionalLight(0xfff5f8, 3.6);
keyLight.position.set(3,5,4); keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);
keyLight.shadow.camera.near=0.1; keyLight.shadow.camera.far=20;
keyLight.shadow.camera.left=-5; keyLight.shadow.camera.right=5;
keyLight.shadow.camera.top=5; keyLight.shadow.camera.bottom=-5;
keyLight.shadow.bias=-0.0005; keyLight.shadow.normalBias=0.02;
scene.add(keyLight);

const fillLight=new THREE.DirectionalLight(0xffd0e0, 1.3);
fillLight.position.set(-5,3,-2); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffe8f0, 1.5);
rimLight.position.set(-2,-1,-5); scene.add(rimLight);

// Warm SSS light — simulates subsurface scattering through splenic tissue
const sssLight=new THREE.PointLight(0xff6688, 0.80, 10);
sssLight.position.set(0,-0.5,2); scene.add(sssLight);

// Back light — creates translucency rim on spleen
const backLight=new THREE.PointLight(0xff4466, 0.50, 8);
backLight.position.set(0,1,-3); scene.add(backLight);

const topLight=new THREE.PointLight(0xffffff, 1.0, 14);
topLight.position.set(0,5,3); scene.add(topLight);

// ===== POST-PROCESSING =====
setLoad(40,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));

const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),0.08,0.45,0.88);
composer.addPass(bloom);

// SSS shader tuned for dark red organic tissue
const cgShader={
    uniforms:{tDiffuse:{value:null},sss:{value:0.40},vign:{value:0.82}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float sss;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    float lum=dot(c,vec3(.299,.587,.114));float sm=smoothstep(.30,.65,lum)*(1.-smoothstep(.65,.95,lum));
    c+=vec3(.80,.20,.30)*sss*sm*.10;
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
setLoad(50,'Cargando modelo esplénico...');
let model=null;
let meshes=[];

new GLTFLoader().load('bazo3d.glb',
    (gltf)=>{
        setLoad(80,'Mejorando materiales...');
        model=gltf.scene;

        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const sc=3.2/Math.max(size.x,size.y,size.z);
        model.scale.setScalar(sc);
        const sb=new THREE.Box3().setFromObject(model);
        model.position.sub(sb.getCenter(new THREE.Vector3()));

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true;
            child.receiveShadow=true;
            meshes.push(child);

            const mat=child.material;

            // bazo3d.glb: single mesh, tripo_mat, baseColor texture only (no normalMap, no roughnessMap).
            // Roughness=0.9, metalness=0 — matte organic tissue.
            // Strategy: MeshPhysicalMaterial with strong SSS/sheen to simulate
            // the characteristic dark red-purple splenic parenchyma.
            const pm=new THREE.MeshPhysicalMaterial();

            if(mat.map)   { pm.map = mat.map; }
            if(mat.color) { pm.color.copy(mat.color); }

            // Spleen surface: fibrous capsule — slightly moist, matte-glossy
            pm.roughness  = 0.72;
            pm.metalness  = 0.0;

            // Subtle wet capsule sheen
            pm.clearcoat = 0.30;
            pm.clearcoatRoughness = 0.55;

            // Strong biological SSS — dark red tissue transmits warm light
            pm.sheen = 0.55;
            pm.sheenRoughness = 0.38;
            pm.sheenColor = new THREE.Color(0.82, 0.22, 0.32);

            // Subsurface-like thickness + attenuation (deep red)
            pm.thickness = 1.4;
            pm.attenuationColor = new THREE.Color(0.75, 0.10, 0.18);
            pm.attenuationDistance = 0.8;

            // Warm emissive — gives the characteristic deep crimson glow
            pm.emissive = new THREE.Color(0.10, 0.01, 0.02);
            pm.emissiveIntensity = 0.18;
            pm.envMapIntensity = 0.35;

            pm.transparent = false;
            pm.opacity = 1.0;
            pm.side = THREE.FrontSide;
            child.material = pm;
        });

        scene.add(model);

        const gnd=new THREE.Mesh(new THREE.PlaneGeometry(20,20),
            new THREE.MeshStandardMaterial({color:0xf0eaec,roughness:0.96,transparent:true,opacity:0.5}));
        gnd.rotation.x=-Math.PI/2;
        const sb2=new THREE.Box3().setFromObject(model);
        gnd.position.y=sb2.min.y-0.06;
        gnd.receiveShadow=true;
        scene.add(gnd);

        setLoad(100,'¡Listo!');
        setTimeout(()=>ls.classList.add('hidden'),500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1024|0)+'KB')},
    e=>{console.error(e); setLoad(0,'Error: verifica que bazo3d.glb esté en la misma carpeta.')}
);

// ===== ANIMATION LOOP =====
let lt=performance.now(), fc=0;
(function anim(t){
    requestAnimationFrame(anim); fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS'; fc=0; lt=t;}
    ctrl.update();
    sssLight.intensity=0.80+Math.sin(t*0.0008)*0.12;
    backLight.intensity=0.50+Math.cos(t*0.0006)*0.08;
    topLight.intensity=0.70+Math.cos(t*0.0009)*0.05;
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
$('bRst').onclick=()=>{ctrl.target.set(0,0,0); camera.position.set(0,0.5,4.5)};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.15);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(0.5))};
$('bFr').onclick=()=>{camera.position.set(0,0,4.5); ctrl.target.set(0,0,0)};
$('bTo').onclick=()=>{camera.position.set(0,4.5,0.01); ctrl.target.set(0,0,0)};
$('bSi').onclick=()=>{camera.position.set(4.5,0,0); ctrl.target.set(0,0,0)};
$('bBk').onclick=()=>{camera.position.set(0,0,-4.5); ctrl.target.set(0,0,0)};
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
            mat.emissive.setRGB(0.10,0.01,0.02); mat.emissiveIntensity=0.18;
        } else if(sel==='capsula'){
            mat.emissive.setRGB(0.14,0.04,0.06); mat.emissiveIntensity=0.22;
        } else if(sel==='trabeculas'){
            mat.emissive.setRGB(0.12,0.04,0.05); mat.emissiveIntensity=0.20;
        } else if(sel==='hilio'){
            mat.emissive.setRGB(0.18,0.03,0.05); mat.emissiveIntensity=0.28;
        } else if(sel==='pulpablanca'){
            mat.emissive.setRGB(0.04,0.06,0.18); mat.emissiveIntensity=0.24;
        } else if(sel==='pulparoja'){
            mat.emissive.setRGB(0.22,0.02,0.04); mat.emissiveIntensity=0.30;
        } else if(sel==='zonamarginal'){
            mat.emissive.setRGB(0.16,0.04,0.08); mat.emissiveIntensity=0.24;
        } else if(sel==='sinusoides'){
            mat.emissive.setRGB(0.20,0.02,0.03); mat.emissiveIntensity=0.28;
        } else if(sel==='linfocitosT'){
            mat.emissive.setRGB(0.03,0.05,0.20); mat.emissiveIntensity=0.26;
        } else if(sel==='linfocitosB'){
            mat.emissive.setRGB(0.03,0.14,0.16); mat.emissiveIntensity=0.24;
        } else if(sel==='macrofagos'){
            mat.emissive.setRGB(0.14,0.08,0.02); mat.emissiveIntensity=0.22;
        } else if(sel==='celulasPlasmaticas'){
            mat.emissive.setRGB(0.10,0.04,0.18); mat.emissiveIntensity=0.24;
        } else if(sel==='arteriaEsplenica'){
            mat.emissive.setRGB(0.24,0.02,0.02); mat.emissiveIntensity=0.32;
        } else if(sel==='venaEsplenica'){
            mat.emissive.setRGB(0.02,0.04,0.22); mat.emissiveIntensity=0.28;
        } else if(sel==='arteriasTrabeculares'){
            mat.emissive.setRGB(0.20,0.03,0.03); mat.emissiveIntensity=0.28;
        } else if(sel==='filtracion'){
            mat.emissive.setRGB(0.16,0.06,0.02); mat.emissiveIntensity=0.24;
        } else if(sel==='hemopoyesis'){
            mat.emissive.setRGB(0.20,0.04,0.04); mat.emissiveIntensity=0.28;
        } else if(sel==='inmunidad'){
            mat.emissive.setRGB(0.04,0.08,0.20); mat.emissiveIntensity=0.26;
        } else if(sel==='reservorio'){
            mat.emissive.setRGB(0.18,0.02,0.06); mat.emissiveIntensity=0.26;
        } else {
            mat.emissive.setRGB(0.08,0.02,0.03); mat.emissiveIntensity=0.14;
        }
    });
}

// ===== PART INFO DATA =====
const partInfo={
    all:{n:'Bazo Humano',s:'Sistema Linfoide — Órgano Linfoide Secundario',
        d:'El bazo es el órgano linfoide secundario más grande del cuerpo humano (~150 g, 12 cm). Ubicado en el hipocondrio izquierdo bajo las costillas 9-11, actúa como filtro sanguíneo, reservorio de eritrocitos y plaquetas, órgano inmune y centro de hematopoyesis extramedular. Su ausencia incrementa el riesgo de infecciones por bacterias encapsuladas (OPSI).',
        st:[{l:'Peso adulto',v:'~150 g'},{l:'Dimensiones',v:'12×7×4 cm'},{l:'Flujo sanguíneo',v:'~350 mL/min'},{l:'Localización',v:'Hipocondrio izq.'}]},

    capsula:{n:'Cápsula Esplénica',s:'Envoltura Fibrosa Externa',
        d:'La cápsula esplénica es una capa de tejido conjuntivo denso (~1-2 mm) que recubre el bazo, compuesta principalmente por fibras de colágeno y células musculares lisas (en animales más prominentes). Emite prolongaciones internas llamadas trabéculas que forman el esqueleto del órgano. En el humano la cápsula se contrae poco, pero protege al parénquima de traumas menores. Su ruptura (traumática o espontánea en esplenomegalia) genera hemoperitoneo.',
        st:[{l:'Composición',v:'Colágeno + músculo liso'},{l:'Grosor',v:'~1–2 mm'},{l:'Función',v:'Protección estructural'},{l:'Ruptura',v:'Hemoperitoneo urgente'}]},

    trabeculas:{n:'Trabéculas',s:'Esqueleto Conjuntivo Interno',
        d:'Las trabéculas son prolongaciones de la cápsula que penetran en el parénquima esplénico formando un entramado de soporte. Contienen las arterias y venas trabeculares — los vasos de mayor calibre del bazo. Dividen el parénquima en compartimentos funcionales sin llegar a lobulizarlo completamente. Junto con la cápsula constituyen el estroma de soporte (no linfoide) del órgano.',
        st:[{l:'Origen',v:'Prolongaciones de cápsula'},{l:'Contenido',v:'Arterias y venas calibre'},{l:'Función',v:'Soporte + vías vasculares'},{l:'Tejido',v:'Colágeno tipo I y III'}]},

    hilio:{n:'Hilio Esplénico',s:'Puerta Vascular y Linfática del Bazo',
        d:'El hilio es la región cóncava de la cara visceral del bazo por donde entran y salen los vasos sanguíneos principales (arteria y vena esplénica), los vasos linfáticos eferentes y los nervios. Es el punto de entrada de la arteria esplénica (rama del tronco celíaco) y de salida de la vena esplénica (que drena a la vena porta). Quirúrgicamente es el punto crítico en la esplenectomía.',
        st:[{l:'Arteria',v:'Esplénica (tronco celíaco)'},{l:'Vena',v:'→ vena porta'},{l:'Linfáticos',v:'Solo eferentes (no aferentes)'},{l:'Cirugía',v:'Punto clave esplenectomía'}]},

    pulpablanca:{n:'Pulpa Blanca (PALS)',s:'Compartimento Inmune del Bazo',
        d:'La pulpa blanca es el tejido linfoide que rodea las arterias centrales formando las vainas linfáticas periarteriales (PALS). Constituye ~25% del parénquima esplénico y es el principal sitio de respuesta inmune adaptativa. Se divide en la PALS propiamente dicha (rico en linfocitos T, periarteriolar) y los folículos linfoides (ricos en linfocitos B, primarios y secundarios con centros germinales). Equivale funcionalmente a los ganglios linfáticos pero filtra sangre en vez de linfa.',
        st:[{l:'Proporción',v:'~25% del parénquima'},{l:'Células dominantes',v:'Linfocitos T y B'},{l:'Función',v:'Inmunidad adaptativa'},{l:'Equivalente',v:'Ganglio linfático (sangre)'}]},

    pulparoja:{n:'Pulpa Roja',s:'Filtro Sanguíneo Principal',
        d:'La pulpa roja constituye ~75% del parénquima esplénico y es el principal filtro sanguíneo del organismo. Está formada por los sinusoides esplénicos (capilares venosos especializados) y los cordones esplénicos de Billroth (tejido reticular entre sinusoides, rico en macrófagos). Los eritrocitos envejecidos o dañados deben pasar por las hendiduras de los sinusoides (2-3 μm) — los que no pueden deformarse son fagocitados. También secuestra plaquetas (~30% del total).',
        st:[{l:'Proporción',v:'~75% del parénquima'},{l:'Células dominantes',v:'Macrófagos + eritrocitos'},{l:'Filtro RBC',v:'Eliminación por rigidez'},{l:'Plaquetas',v:'~30% del pool total'}]},

    zonamarginal:{n:'Zona Marginal',s:'Interfaz entre Pulpa Blanca y Roja',
        d:'La zona marginal es la región de transición entre la pulpa blanca y la roja, especializada en la captura de antígenos y patógenos del torrente sanguíneo. Contiene linfocitos B de zona marginal (fenotipo único, respuesta T-independiente), macrófagos especializados y células dendríticas. Es el primer sitio de contacto con los antígenos circulantes y es crítica para la respuesta frente a bacterias encapsuladas (neumococo, H. influenzae, meningococo).',
        st:[{l:'Localización',v:'Entre pulpa blanca y roja'},{l:'Células',v:'LB zona marginal + macrófagos'},{l:'Función',v:'Captura de antígenos'},{l:'Bacterias',v:'Respuesta T-independiente'}]},

    sinusoides:{n:'Sinusoides Esplénicos',s:'Capilares Venosos Especializados',
        d:'Los sinusoides esplénicos son capilares venosos discontinuos con células endoteliales fusiformes orientadas longitudinalmente, separadas por hendiduras de 2-3 μm (no hay membrana basal continua). Esta estructura fuerza a los eritrocitos a deformarse para pasar — los eritrocitos rígidos (viejos, con parásitos, hemoglobinopatías) no pueden y son atrapados y fagocitados por los macrófagos circundantes. El tiempo de tránsito en la pulpa roja es de ~20-40 segundos.',
        st:[{l:'Abertura',v:'2–3 μm (hendiduras)'},{l:'Función',v:'Filtro mecánico RBC'},{l:'Tránsito',v:'~20–40 segundos'},{l:'Tipo',v:'Capilar discontinuo venoso'}]},

    linfocitosT:{n:'Linfocitos T (PALS)',s:'Inmunidad Celular Esplénica',
        d:'Los linfocitos T en el bazo se localizan principalmente en la vaina linfática periarteriolar (PALS), formando un manguito alrededor de las arterias centrales de la pulpa blanca. Son sobre todo linfocitos T CD4+ (helper) y T CD8+ (citotóxicos). Coordinan la respuesta inmune adaptativa frente a antígenos que llegan por vía hematógena. En infecciones virales sistémicas, se observa notable expansión de la PALS.',
        st:[{l:'Localización',v:'PALS (periarteriolar)'},{l:'Subtipos',v:'CD4+ y CD8+'},{l:'Función',v:'Inmunidad celular'},{l:'Activación',v:'Por antígenos hematógenos'}]},

    linfocitosB:{n:'Linfocitos B (Folículos)',s:'Inmunidad Humoral Esplénica',
        d:'Los linfocitos B se agrupan en folículos linfoides dentro de la pulpa blanca. Los folículos primarios (linfocitos B naive) se transforman en folículos secundarios con centros germinales (GC) durante respuestas inmunes activas. En los GC ocurren la hipermutación somática y la selección de alta afinidad. Los linfocitos B de zona marginal responden rápidamente a polisacáridos capsulares bacterianos de forma T-independiente.',
        st:[{l:'Localización',v:'Folículos linfoides'},{l:'Tipos',v:'Naive, GC, zona marginal'},{l:'Función',v:'Producción anticuerpos'},{l:'Centro germinal',v:'Maduración afinidad'}]},

    macrofagos:{n:'Macrófagos Esplénicos',s:'Fagocitos Residentes Especializados',
        d:'El bazo contiene varias subpoblaciones de macrófagos: macrófagos de la pulpa roja (cordones de Billroth) que fagocitan eritrocitos senescentes y liberan hierro (reciclado a transferrina), macrófagos de zona marginal (capturan bacterias y partículas), y macrófagos del centro germinal (tingibles body macrophages, eliminan células B apoptóticas). Colectivamente procesan ~2×10¹¹ eritrocitos/día en el humano adulto.',
        st:[{l:'Eritrocitos/día',v:'~2×10¹¹ fagocitados'},{l:'Hierro reciclado',v:'→ transferrina plasmática'},{l:'Subtipos',v:'Pulpa roja, ZM, GC'},{l:'Función extra',v:'Captura bacterias encapsuladas'}]},

    celulasPlasmaticas:{n:'Células Plasmáticas',s:'Efectoras de la Respuesta Humoral',
        d:'Las células plasmáticas del bazo son linfocitos B diferenciados terminalmente, secretoras de anticuerpos (principalmente IgM en respuestas primarias, IgG en secundarias). Residen en los cordones de la pulpa roja y en los folículos post-germinales. El bazo es fuente importante de IgM circulante y de anticuerpos anti-polisacáridos (críticos frente a Streptococcus pneumoniae, Haemophilus influenzae tipo b y Neisseria meningitidis).',
        st:[{l:'Ig producida',v:'IgM (primaria) + IgG'},{l:'Localización',v:'Pulpa roja + folículos'},{l:'Anti-polisacáridos',v:'Neumococo, H. influenzae'},{l:'Diferenciación',v:'Desde LB post-GC'}]},

    arteriaEsplenica:{n:'Arteria Esplénica',s:'Principal Aferente Arterial del Bazo',
        d:'La arteria esplénica es la rama más larga del tronco celíaco, con un trayecto tortuoso a lo largo del borde superior del páncreas. Aporta ~350 mL/min al bazo (el 5% del gasto cardíaco). Al entrar por el hilio, se ramifica en arterias trabeculares → arterias centrales de la pulpa blanca (PALS) → arteriolas peniciladas → capilares arteriales (con macrófagos en manicotto). Su oclusión causa infarto esplénico.',
        st:[{l:'Origen',v:'Tronco celíaco'},{l:'Flujo',v:'~350 mL/min (~5% GC)'},{l:'Trayecto',v:'Tortuoso, borde sup. páncreas'},{l:'Oclusión',v:'Infarto esplénico'}]},

    venaEsplenica:{n:'Vena Esplénica',s:'Drenaje Venoso hacia la Circulación Portal',
        d:'La vena esplénica drena el bazo y recorre el borde posterior del páncreas para unirse a la vena mesentérica superior y formar la vena porta hepática. Transporta sangre filtrada rica en productos de la hemólisis eritrocitaria (bilirrubina libre, aminoácidos del hemo), hierro liberado y antígenos procesados. En hipertensión portal, la esplenomegalia congestiva es frecuente y puede causar hiperesplenismo.',
        st:[{l:'Destino',v:'Vena porta (+ VMS)'},{l:'Contenido',v:'Productos hemólisis + Ag'},{l:'Hipert. portal',v:'Esplenomegalia congestiva'},{l:'Hiperesplenismo',v:'Pancitopenia por secuestro'}]},

    arteriasTrabeculares:{n:'Arterias Trabeculares',s:'Distribución Vascular Intrasplécnica',
        d:'Las arterias trabeculares son ramas de la arteria esplénica que viajan dentro de las trabéculas de tejido conjuntivo. Al abandonar las trabéculas, se rodean de tejido linfoide (PALS) y pasan a llamarse arterias centrales. Su endotelio es continuo y permeable. La circulación esplénica es en parte "abierta" (la sangre sale a los cordones de Billroth) y en parte "cerrada" (va directamente a los sinusoides), predominando la circulación abierta.',
        st:[{l:'Localización',v:'Dentro de trabéculas'},{l:'Continuación',v:'→ arterias centrales (PALS)'},{l:'Tipo circulación',v:'Abierta (predominante) + cerrada'},{l:'Calibre',v:'0.1–0.2 mm'}]},

    filtracion:{n:'Filtración Sanguínea',s:'Función de Barrera Mecánica e Inmunológica',
        d:'La filtración esplénica elimina eritrocitos senescentes (~120 días de vida), eritrocitos con inclusiones (cuerpos de Heinz, de Howell-Jolly), glóbulos rojos parasitados (malaria, babesiosis), bacterias opsonizadas y partículas circulantes. El mecanismo es doble: mecánico (paso forzado por hendiduras de 2-3 μm en sinusoides) e inmunológico (fagocitosis por macrófagos en cordones de Billroth). Tras esplenectomía, los cuerpos de Howell-Jolly son visibles en el frotis periférico.',
        st:[{l:'Vida media RBC',v:'~120 días'},{l:'Mecanismo',v:'Mecánico + fagocitosis'},{l:'Filtro hemiduras',v:'2–3 μm sinusoides'},{l:'Postesplenectomía',v:'Cuerpos Howell-Jolly en frotis'}]},

    hemopoyesis:{n:'Hematopoyesis Extramedular',s:'Producción de Células Sanguíneas Fuera de la Médula',
        d:'En el feto (a partir de la semana 5 hasta el 7° mes), el bazo es un importante sitio de hematopoyesis, produciendo eritrocitos, leucocitos y plaquetas. En adultos sanos esta función cesa, pero puede reactivarse en condiciones patológicas (mielofibrosis, anemia hemolítica grave, metástasis óseas) causando esplenomegalia masiva. La hematopoyesis extramedular en el bazo adulto es un signo de patología medular grave.',
        st:[{l:'Fetal',v:'Semanas 5–28 de gestación'},{l:'Adulto sano',v:'Inactiva normalmente'},{l:'Reactivación',v:'Mielofibrosis, hemólisis grave'},{l:'Consecuencia',v:'Esplenomegalia masiva'}]},

    inmunidad:{n:'Respuesta Inmune Esplénica',s:'Centro de Inmunidad Sistémica Hematógena',
        d:'El bazo es el principal órgano linfoide que responde a antígenos de diseminación hematógena. Orquesta respuestas humorales (producción de anticuerpos, especialmente IgM anti-polisacáridos) y celulares (activación T, citotoxicidad). La asplenia funcional o quirúrgica deja al paciente en alto riesgo de sepsis fulminante por bacterias capsuladas (OPSI: overwhelming post-splenectomy infection), con mortalidad del 50-70%. Vacunación obligatoria post-esplenectomía.',
        st:[{l:'Patógenos clave',v:'S. pneumoniae, H. influenzae, N. meningitidis'},{l:'Ig producida',v:'IgM anti-polisacáridos'},{l:'OPSI',v:'Mortalidad 50–70%'},{l:'Prevención',v:'Vacunación + profilaxis Penicilina'}]},

    reservorio:{n:'Reservorio Sanguíneo',s:'Almacén de Eritrocitos y Plaquetas',
        d:'El bazo humano actúa como reservorio de eritrocitos y plaquetas (almacena ~30% del pool plaquetario total). En situaciones de estrés fisiológico (ejercicio intenso, hemorragia, hipoxia), la contracción esplénica (mediada por norepinefrina + endotelina) libera eritrocitos y plaquetas a la circulación. En humanos este efecto es menor que en perros o caballos, pero contribuye ~150-200 mL de sangre concentrada en situaciones de emergencia.',
        st:[{l:'Plaquetas almacenadas',v:'~30% del pool'},{l:'Eritrocitos',v:'~150–200 mL movilizables'},{l:'Estímulo',v:'Norepinefrina + endotelina'},{l:'Vs. animales',v:'Efecto menor en humanos'}]}
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
