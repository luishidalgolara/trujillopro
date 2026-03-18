import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {SMAAPass} from 'three/addons/postprocessing/SMAAPass.js';
// EarthquakeSimulator loaded via script tag
// BuildingCollapseSimulator loaded via script tag

const $=id=>document.getElementById(id);
const lbFill=$('lbFill'), lbTxt=$('lbTxt'), ls=$('ls');
const setLoad=(p,t)=>{lbFill.style.width=p+'%';lbTxt.textContent=t};

setLoad(10,'Configurando escena 3D...');
const canvas=$('mainCanvas');
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x8a8a8a);
scene.fog=new THREE.FogExp2(0x8a8a8a, 0.012);

const camera=new THREE.PerspectiveCamera(55, innerWidth/(innerHeight-58), 0.01, 150);
camera.position.set(15, 12, 15);

const renderer=new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setSize(innerWidth, innerHeight-58);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.15;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.useLegacyLights=false;

const ctrl=new OrbitControls(camera, canvas);
ctrl.enableDamping=true; ctrl.dampingFactor=0.09;
ctrl.rotateSpeed=0.65; ctrl.zoomSpeed=1.0;
ctrl.minDistance=5; ctrl.maxDistance=40;
ctrl.target.set(0, 4, 0);
ctrl.autoRotate=true; ctrl.autoRotateSpeed=0.6;

setLoad(20,'Generando iluminación...');
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
            vec3 c=mix(vec3(.04,.04,.06),mix(vec3(.06,.07,.10),vec3(.10,.12,.16),smoothstep(.25,1.,y)),smoothstep(0.,.25,y));
            c+=vec3(.40,.35,.28)*pow(max(0.,dot(d,normalize(vec3(1.,.6,.4)))),14.)*.5;
            c+=vec3(.10,.15,.22)*pow(max(0.,dot(d,normalize(vec3(-.7,.4,-.6)))),10.)*.3;
            gl_FragColor=vec4(c,1.);}`
    })
));
scene.environment=pmrem.fromScene(envSc, 0.04).texture;
pmrem.dispose();

scene.add(new THREE.HemisphereLight(0xb0c4d8, 0x443322, 0.7));
const sunLight=new THREE.DirectionalLight(0xfff4e6, 3.5);
sunLight.position.set(12, 18, 14); sunLight.castShadow=true;
sunLight.shadow.mapSize.set(2048,2048);
sunLight.shadow.camera.near=0.5; sunLight.shadow.camera.far=50;
sunLight.shadow.camera.left=-15; sunLight.shadow.camera.right=15;
sunLight.shadow.camera.top=20; sunLight.shadow.camera.bottom=-8;
sunLight.shadow.bias=-0.0006; sunLight.shadow.normalBias=0.03;
scene.add(sunLight);

const fillLight=new THREE.DirectionalLight(0x90b0ff, 1.4);
fillLight.position.set(-10, 8, -8); scene.add(fillLight);

const rimLight=new THREE.DirectionalLight(0xffc080, 2.0);
rimLight.position.set(-6,-4,-14); scene.add(rimLight);

const accentLight=new THREE.PointLight(0x00c9ff, 1.0, 25);
accentLight.position.set(6,12,8); scene.add(accentLight);

scene.add(new THREE.PointLight(0xffffff, 0.7, 22).translateX(-7).translateY(5).translateZ(10));

setLoad(30,'Post-processing...');
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight), 0.15, 0.55, 0.92);
composer.addPass(bloom);

const cgShader={
    uniforms:{tDiffuse:{value:null},contrast:{value:0.55},vign:{value:0.20}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D tDiffuse;uniform float contrast;uniform float vign;varying vec2 vUv;
    void main(){vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
    c.b+=.020;c.r+=.008;
    float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.15);
    c=(c-.5)*(1.+contrast*.4)+.5;
    vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.38;
    gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
};
const cgPass=new ShaderPass(cgShader);
composer.addPass(cgPass);
composer.addPass(new SMAAPass(innerWidth,innerHeight));

setLoad(50,'Cargando estructura...');
let model=null;
const allMeshes=[];
let floorGroups = [];

new GLTFLoader().load('models/scene.gltf',
    (gltf) => {
        setLoad(80,'Optimizando materiales...');
        model = gltf.scene;
        
        const box=new THREE.Box3().setFromObject(model);
        const size=box.getSize(new THREE.Vector3());
        const sc=12/Math.max(size.x,size.y,size.z);
        model.scale.setScalar(sc);
        
        const sb=new THREE.Box3().setFromObject(model);
        const sc2=sb.getCenter(new THREE.Vector3());
        model.position.sub(sc2);
        model.position.y = -sb.min.y;

        let meshIdx=0;
        const minY = sb.min.y;
        const maxY = sb.max.y;
        const floorHeight = (maxY - minY) / 10;

        // Helper: recorre ancestros para encontrar categoría estructural del GLTF
        function getStructuralCategory(obj) {
            let node = obj;
            while (node) {
                const n = (node.name || '').toLowerCase();
                if (n === 'columns') return 'column';
                if (n === 'walls') return 'wall';
                if (n === 'floors') return 'slab';
                if (n === 'roofs') return 'roof';
                node = node.parent;
            }
            return 'other';
        }
        
        // Helper: detectar si un muro es realmente una columna (COLUMNA en nombre)
        function isWallColumn(obj) {
            let node = obj;
            while (node) {
                const n = (node.name || '');
                if (n.includes('COLUMNA')) return true;
                node = node.parent;
            }
            return false;
        }

        model.traverse(child=>{
            if(!child.isMesh) return;
            child.castShadow=true; child.receiveShadow=true;
            child._idx=meshIdx;
            allMeshes.push(child);
            
            // Obtener posición mundial para clasificar por piso
            const worldPos = new THREE.Vector3();
            child.getWorldPosition(worldPos);
            const floorLevel = Math.floor((worldPos.y - sb.min.y) / floorHeight);
            child._floor = Math.max(0, Math.min(10, floorLevel));
            
            if(!floorGroups[child._floor]) floorGroups[child._floor] = [];
            floorGroups[child._floor].push(child);

            // Usar la jerarquía real del GLTF para clasificar
            let category = getStructuralCategory(child);
            
            // Los "Basic Wall:COLUMNA" son columnas, no muros
            if (category === 'wall' && isWallColumn(child)) {
                category = 'column';
            }
            
            const pm = new THREE.MeshStandardMaterial();
            
            if(category === 'column'){
                pm.color = new THREE.Color(0.58, 0.62, 0.68);
                pm.roughness = 0.50; pm.metalness = 0.15;
                pm.emissive = new THREE.Color(0.04,0.04,0.05);
                pm.emissiveIntensity = 0.10;
                child._type = 'column';
            } else if(category === 'wall'){
                pm.color = new THREE.Color(0.57, 0.63, 0.69);
                pm.roughness = 0.70; pm.metalness = 0.05;
                pm.emissive = new THREE.Color(0.03,0.03,0.04);
                pm.emissiveIntensity = 0.06;
                child._type = 'wall';
            } else if(category === 'slab'){
                pm.color = new THREE.Color(0.66, 0.73, 0.80);
                pm.roughness = 0.60; pm.metalness = 0.08;
                pm.emissive = new THREE.Color(0.04,0.05,0.06);
                pm.emissiveIntensity = 0.08;
                child._type = 'slab';
            } else if(category === 'roof'){
                pm.color = new THREE.Color(0.53, 0.67, 0.85);
                pm.roughness = 0.55; pm.metalness = 0.10;
                pm.emissive = new THREE.Color(0.03,0.04,0.06);
                pm.emissiveIntensity = 0.12;
                child._type = 'roof';
            } else {
                pm.color = new THREE.Color(0.60, 0.64, 0.68);
                pm.roughness = 0.65; pm.metalness = 0.10;
                pm.emissive = new THREE.Color(0.03,0.03,0.04);
                pm.emissiveIntensity = 0.07;
                child._type = 'other';
            }
            
            pm.envMapIntensity = 1.1;
            child.material = pm;
            meshIdx++;
        });

        scene.add(model);
        
        // Plataforma base
        const platform = new THREE.Mesh(
            new THREE.BoxGeometry(25, 0.4, 25),
            new THREE.MeshStandardMaterial({
                color: 0x909090,
                roughness: 0.95,
                metalness: 0.05,
                emissive: 0x808080,
                emissiveIntensity: 0.1
            })
        );
        platform.position.y = -0.5;
        platform.receiveShadow = true;
        scene.add(platform);

        // Grid técnico
        const gridHelper = new THREE.GridHelper(24, 48, 0x3a4a5a, 0x1f2a38);
        gridHelper.position.y = -0.25;
        gridHelper.material.opacity = 0.35;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        setLoad(100,'¡Estructura lista!');
        setTimeout(()=>ls.classList.add('hidden'),500);
    },
    p=>{if(p.total) setLoad(50+(p.loaded/p.total)*30,'Descargando... '+(p.loaded/1024).toFixed(0)+'KB')},
    e=>{console.error(e);setLoad(0,'Error: Verifica que scene.gltf y scene.bin estén en la carpeta models/.')}
);

addEventListener('resize',()=>{
    const w=innerWidth,h=innerHeight-58;
    camera.aspect=w/h;camera.updateProjectionMatrix();
    renderer.setSize(w,h);composer.setSize(w,h);bloom.setSize(w,h);
});

// Controles
let ar=true;
$('bRot').onclick=e=>{ar=!ar;ctrl.autoRotate=ar;e.currentTarget.classList.toggle('active',ar)};
$('bRst').onclick=()=>{ctrl.target.set(0,4,0);camera.position.set(15,12,15);currentFloor=10;$('floorRange').value=10;updateFloors()};
$('bZi').onclick=()=>camera.position.lerp(ctrl.target,0.20);
$('bZo').onclick=()=>{const d=camera.position.clone().sub(ctrl.target).normalize();camera.position.add(d.multiplyScalar(0.9))};
$('bFr').onclick=()=>{camera.position.set(0,5,25);ctrl.target.set(0,4,0)};
$('bTo').onclick=()=>{camera.position.set(0,30,0.1);ctrl.target.set(0,4,0)};
$('bSi').onclick=()=>{camera.position.set(25,5,0);ctrl.target.set(0,4,0)};
$('bIso').onclick=()=>{camera.position.set(15,12,15);ctrl.target.set(0,4,0)};

let ipVis=true;
$('bIn').onclick=()=>{ipVis=!ipVis;$('ip').classList.toggle('hide',!ipVis)};
$('bPP').onclick=e=>{$('ppP').classList.toggle('vis');e.currentTarget.classList.toggle('active')};

$('ppB').oninput=e=>bloom.strength=e.target.value/100*0.65;
$('ppE').oninput=e=>renderer.toneMappingExposure=e.target.value/100;
$('ppC').oninput=e=>cgPass.uniforms.contrast.value=e.target.value/100;
$('ppV').oninput=e=>cgPass.uniforms.vign.value=e.target.value/100;

// Control de pisos
let floorActive=false;
let currentFloor=10;
$('bFloor').onclick=e=>{
    floorActive=!floorActive;
    $('floorSlider').classList.toggle('vis',floorActive);
    e.currentTarget.classList.toggle('active',floorActive);
    if(!floorActive){currentFloor=10;$('floorRange').value=10;updateFloors()}
};

$('floorRange').oninput=e=>{currentFloor=parseInt(e.target.value);updateFloors()};

function updateFloors(){
    const levelNames = ['Sótano', 'Planta Baja', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6', 'Piso 7', 'Piso 8', 'Azotea', 'Todos'];
    $('floorLevel').textContent = levelNames[currentFloor] || `Nivel ${currentFloor}`;
    
    if(!model) return;
    allMeshes.forEach(mesh=>{
        const mat = mesh.material;
        if(!mat) return;
        
        if(currentFloor === 10){
            mat.transparent = false;
            mat.opacity = 1;
            mat.depthWrite = true;
        } else {
            const visible = mesh._floor <= currentFloor;
            mat.transparent = !visible;
            mat.opacity = visible ? 1 : 0.1;
            mat.depthWrite = visible;
        }
    });
}

// Modo rayos X
let xrayActive=false;
let xrayValue=0;
$('bXray').onclick=e=>{
    xrayActive=!xrayActive;
    $('xrayMode').classList.toggle('vis',xrayActive);
    e.currentTarget.classList.toggle('active',xrayActive);
    if(!xrayActive){xrayValue=0;$('xrayRange').value=0;updateXray()}
};

$('xrayRange').oninput=e=>{xrayValue=e.target.value/100;updateXray()};

function updateXray(){
    if(!model) return;
    allMeshes.forEach(mesh=>{
        const mat = mesh.material;
        if(!mat) return;
        
        if(xrayValue === 0){
            mat.transparent = false;
            mat.opacity = 1;
        } else {
            mat.transparent = true;
            mat.opacity = 1 - xrayValue * 0.85;
        }
    });
}

// Información de componentes
const partInfo={
    all:{n:'Edificio 3 — Maqueta Estructural',s:'Sistema Estructural de Hormigón Armado',
        d:'Edificio de estructura de hormigón armado con sistema porticado de columnas y vigas. El sistema resiste cargas verticales (peso propio, sobrecargas) y laterales (viento, sismo) mediante pórticos resistentes a momento y muros de corte. Las losas transmiten cargas a las vigas, que a su vez las transfieren a las columnas hasta la cimentación. El núcleo rígido proporciona estabilidad lateral adicional.',
        st:[{l:'Sistema',v:'Pórticos + Muros'},{l:'Material',v:'Hormigón Armado'},{l:'Plantas',v:'Múltiples niveles'},{l:'Resistencia',v:'f\'c 25-30 MPa'}]},
    columns:{n:'Columnas Estructurales',s:'Elementos Verticales de Carga',
        d:'Las columnas son elementos verticales que transmiten las cargas de las vigas y losas hasta la cimentación. Fabricadas en hormigón armado (concreto + acero), con sección típica cuadrada o rectangular. Dimensiones según carga: 30x30 cm (ligeras) hasta 60x60 cm (pesadas). El refuerzo longitudinal resiste compresión/tracción, mientras los estribos confinan el hormigón y evitan pandeo.',
        st:[{l:'Sección',v:'Cuadrada/Rectangular'},{l:'Dimensiones',v:'30x30 - 60x60 cm'},{l:'Refuerzo long.',v:'4-12 barras Ø12-25mm'},{l:'Estribos',v:'Ø8-10mm @ 10-20cm'}]},
    walls:{n:'Muros Portantes',s:'Elementos Verticales de Rigidez',
        d:'Muros de hormigón armado que soportan cargas verticales y proporcionan rigidez lateral. Espesor típico: 15-30 cm según altura y carga. El refuerzo consiste en mallas electrosoldadas o barras verticales y horizontales. Su rigidez en el plano es muy superior a los pórticos, controlando derivas laterales en edificios altos. Deben tener continuidad desde cimentación hasta cubierta.',
        st:[{l:'Espesor',v:'15-30 cm'},{l:'Refuerzo',v:'Mallas/Barras vert.+horiz.'},{l:'Función',v:'Carga + rigidez lateral'},{l:'Cuantía',v:'0.2% - 0.4% área'}]},
    shear_walls:{n:'Muros de Corte (Pantallas)',s:'Sistema de Resistencia Sísmica',
        d:'Muros especialmente diseñados para resistir fuerzas horizontales (sismo, viento). Actúan como ménsulas verticales empotradas en la cimentación. Su rigidez lateral es 10-20 veces mayor que pórticos equivalentes. Elementos de borde confinados (columnas integradas) mejoran ductilidad. Ubicación estratégica: núcleos de escaleras/ascensores, perímetro.',
        st:[{l:'Rigidez',v:'10-20x pórticos'},{l:'Elem. borde',v:'Confinamiento ductil'},{l:'Ubicación',v:'Núcleos + perímetro'},{l:'Deriva',v:'<0.5% altura'}]},
    slabs:{n:'Losas de Entrepiso',s:'Elementos Horizontales de Carga',
        d:'Losas de hormigón armado que transmiten cargas verticales a vigas/muros. Tipos: maciza (15-25 cm), nervada (aligerada con bloques), reticular (2 direcciones). Sobrecarga de uso: 200-500 kg/m² según función (vivienda, oficina, comercio). Refuerzo principal resiste flexión, refuerzo secundario controla retracción/temperatura. Flechas máximas: L/360 a L/480.',
        st:[{l:'Espesor',v:'15-25 cm (maciza)'},{l:'Sobrecarga',v:'200-500 kg/m²'},{l:'Refuerzo princ.',v:'Ø10-16mm @ 15-25cm'},{l:'Flecha máx.',v:'L/360 - L/480'}]},
    roof:{n:'Losa de Techo',s:'Cubierta Estructural',
        d:'Losa de cubierta que cierra el edificio superiormente. Debe resistir cargas permanentes (peso propio, impermeabilización, aislamiento) y sobrecargas de uso/mantenimiento (100-150 kg/m²) y climáticas (nieve en zonas frías). Requiere pendiente mínima para drenaje (2-5%). Impermeabilización multicapa: barrera vapor + aislante + membrana impermeable.',
        st:[{l:'Sobrecarga',v:'100-200 kg/m²'},{l:'Pendiente',v:'2-5% drenaje'},{l:'Impermeab.',v:'Membrana multicapa'},{l:'Aislamiento',v:'Térmico + acústico'}]},
    beams:{n:'Vigas Principales',s:'Elementos Horizontales de Soporte',
        d:'Vigas de hormigón armado que soportan las losas y transmiten cargas a columnas/muros. Sección rectangular (h/b = 1.5-2.5), altura típica: L/12 - L/15 (luz L). Refuerzo inferior resiste momento positivo, refuerzo superior momento negativo en apoyos. Estribos verticales resisten cortante. Diseño por resistencia última con factores de carga y reducción.',
        st:[{l:'Altura',v:'L/12 - L/15 (luz)'},{l:'Sección',v:'Rectangular h/b=1.5-2.5'},{l:'Refuerzo inf.',v:'Momento positivo'},{l:'Estribos',v:'Ø8-10mm cortante'}]},
    foundation:{n:'Cimentación',s:'Sistema de Transmisión al Suelo',
        d:'Elemento estructural que transmite todas las cargas del edificio al suelo. Tipos: zapatas aisladas (columnas individuales), zapatas corridas (muros), losa de cimentación (carga distribuida/suelo débil), pilotes (suelo resistente profundo). Profundidad mínima: 0.8-1.2 m bajo nivel terreno. Capacidad portante del suelo: 1-4 kg/cm² típico.',
        st:[{l:'Tipo',v:'Zapatas/Losa/Pilotes'},{l:'Profundidad',v:'0.8-1.2 m mínimo'},{l:'Cap. portante',v:'1-4 kg/cm² suelo'},{l:'Factor segur.',v:'FS = 3.0'}]},
    core:{n:'Núcleo Rígido',s:'Sistema de Estabilización',
        d:'Conjunto de muros de corte dispuestos formando un núcleo central (escaleras, ascensores, ductos). Proporciona rigidez torsional y lateral al edificio. En edificios altos (>10 pisos), el núcleo resiste >70% de la fuerza lateral. Su posición cercana al centro de masa minimiza torsión. Continuidad vertical es crítica: no interrumpir el núcleo en ningún piso.',
        st:[{l:'Función',v:'Rigidez + torsión'},{l:'Ubicación',v:'Centro de masa'},{l:'Resistencia',v:'>70% fuerza lateral'},{l:'Continuidad',v:'Desde cim. a cubierta'}]},
    frame:{n:'Sistema de Pórticos',s:'Marcos Resistentes a Momento',
        d:'Pórticos formados por vigas y columnas conectadas mediante nudos rígidos (momento resistente). Cada pórtico resiste cargas verticales y laterales en su plano mediante flexión de vigas/columnas. Sistemas: pórticos de momento (ductilidad alta), arriostrados (rigidez alta). Espaciamiento típico: 4-8 m entre ejes. Configuración: pórticos en ambas direcciones ortogonales.',
        st:[{l:'Tipo',v:'Momento resistente'},{l:'Espaciamiento',v:'4-8 m entre ejes'},{l:'Ductilidad',v:'Alta (μ>4)'},{l:'Config.',v:'2 direcciones ortog.'}]},
    ground_floor:{n:'Planta Baja',s:'Nivel de Acceso',
        d:'Primera planta sobre el nivel del terreno. Altura libre típica: 3.0-4.5 m (mayor que plantas tipo para locales comerciales, hall, accesos). Losa de piso sobre terreno con capa de compactación + polietileno + hormigón armado. Conexión cimentación-superestructura: arranques de columnas/muros. Cargas de servicio suelen ser mayores (comercio, estacionamiento).',
        st:[{l:'Altura libre',v:'3.0-4.5 m'},{l:'Losa',v:'Sobre terreno'},{l:'Uso típico',v:'Comercial/Acceso'},{l:'Sobrecarga',v:'400-500 kg/m²'}]},
    typical_floor:{n:'Plantas Tipo',s:'Niveles Repetitivos',
        d:'Pisos intermedios con geometría repetitiva. Altura libre: 2.4-3.0 m en vivienda/oficina. Estandarización de plantas tipo reduce costos y acelera construcción (encofrados, refuerzos repetidos). Instalaciones empotradas en losas/muros (MEP: mecánicas, eléctricas, sanitarias). Flexibilidad espacial mediante tabiquería no portante.',
        st:[{l:'Altura libre',v:'2.4-3.0 m'},{l:'Estandarización',v:'Reduce costos'},{l:'Instalaciones',v:'MEP empotradas'},{l:'Tabiques',v:'No portantes'}]},
    top_floor:{n:'Última Planta',s:'Nivel Superior',
        d:'Última planta habitable bajo cubierta. Puede tener terrazas o azotea accesible. Protecciones: barandales perimetrales h≥1.1 m, antepechos h≥0.9 m. Instalaciones técnicas en azotea: equipos HVAC, tanques de agua, antenas. Acceso a cubierta para mantenimiento de impermeabilización. Control de temperatura: aislamiento térmico en losa superior.',
        st:[{l:'Protecciones',v:'Barandales h≥1.1m'},{l:'Uso azotea',v:'Equipos/Mantenimiento'},{l:'Aislamiento',v:'Térmico superior'},{l:'Acceso',v:'Escalera/Trampilla'}]},
    load_path:{n:'Camino de Carga',s:'Trayectoria de Fuerzas',
        d:'Secuencia de transmisión de cargas desde su punto de aplicación hasta el suelo: Carga → Losa → Viga → Columna/Muro → Cimentación → Suelo. Cada elemento debe dimensionarse para resistir las cargas acumuladas. Continuidad estructural es esencial: evitar cambios bruscos de rigidez. Redundancia: múltiples caminos de carga aumentan seguridad.',
        st:[{l:'Secuencia',v:'Losa→Viga→Columna→Cim.'},{l:'Continuidad',v:'Sin cambios bruscos'},{l:'Redundancia',v:'Múltiples caminos'},{l:'Acumulación',v:'Cargas crecientes abajo'}]},
    seismic:{n:'Sistema Antisísmico',s:'Diseño Sismorresistente',
        d:'Conjunto de elementos y criterios para resistir sismos. Filosofía: resistir sismos leves sin daño, moderados con daño reparable, severos sin colapso. Elementos clave: muros de corte (rigidez), pórticos dúctiles (disipación energía), diafragmas horizontales (losas), regularidad (evitar torsión). Diseño por capacidad: articulaciones plásticas en vigas, no en columnas.',
        st:[{l:'Filosofía',v:'Elasticidad→Daño→No colapso'},{l:'Muros corte',v:'Rigidez lateral'},{l:'Pórticos',v:'Ductilidad (μ>4)'},{l:'Diafragmas',v:'Losas rígidas'}]}
};

function setHighlight(sel){
    allMeshes.forEach(mesh=>{
        const mat=mesh.material; if(!mat) return;
        if(sel==='all'){
            mat.transparent=false;mat.opacity=1;mat.depthWrite=true;
            mat.emissiveIntensity=0.08;
        } else {
            let isTarget=false;
            const type = mesh._type;
            
            if(sel==='columns' && type==='column') isTarget=true;
            else if(sel==='walls' && type==='wall') isTarget=true;
            else if(sel==='shear_walls' && type==='wall') isTarget=true;
            else if(sel==='slabs' && type==='slab') isTarget=true;
            else if(sel==='roof' && type==='roof') isTarget=true;
            else if(sel==='beams' && type==='other') isTarget=true;
            else if(sel==='foundation' && mesh._floor===0) isTarget=true;
            else if(sel==='core' && type==='wall') isTarget=true;
            else if(sel==='frame' && (type==='column' || type==='other')) isTarget=true;
            else if(sel==='ground_floor' && mesh._floor<=1) isTarget=true;
            else if(sel==='typical_floor' && mesh._floor>=2 && mesh._floor<=8) isTarget=true;
            else if(sel==='top_floor' && mesh._floor>=9) isTarget=true;
            else if(sel==='load_path' && (type==='slab' || type==='column')) isTarget=true;
            else if(sel==='seismic' && (type==='wall' || type==='column')) isTarget=true;
            
            mat.transparent=!isTarget;
            mat.opacity=isTarget?1:0.09;
            mat.depthWrite=isTarget;
            mat.emissiveIntensity=isTarget?0.28:0.02;
        }
    });
}

document.querySelectorAll('.hl-btn').forEach(btn=>{
    btn.onclick=()=>{
        document.querySelectorAll('.hl-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const p=btn.dataset.part,info=partInfo[p];
        if(info){
            $('ipN').textContent=info.n;$('ipS').textContent=info.s;$('ipD').textContent=info.d;
            $('ipSt').innerHTML=info.st.map(s=>`<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`).join('');
        }
        setHighlight(p);
    };
});

// ═══════════════════════════════════════════════════════════
// INTEGRACIÓN DE SIMULACIÓN SÍSMICA Y COLAPSO
// ═══════════════════════════════════════════════════════════

let earthquakeSimulator = null;
let collapseSimulator = null;

// Inicializar simuladores después de cargar el modelo
function initializeSeismicSimulators() {
    if (!model || allMeshes.length === 0) {
        console.warn('Modelo no cargado aún. Reintentando...');
        setTimeout(initializeSeismicSimulators, 1000);
        return;
    }
    
    // Calcular altura del edificio
    const bbox = new THREE.Box3().setFromObject(model);
    const buildingHeight = bbox.max.y - bbox.min.y;
    
    // Inicializar simulador de terremoto
    earthquakeSimulator = new EarthquakeSimulator(THREE, model, scene, {
        buildingHeight: buildingHeight,
        numFloors: 10,
        camera: camera,
        mass: 1000,
        stiffness: 50000,
        damping: 0.05,
        magnitude: 6.5,
        duration: 30,
        soilType: 'firm',
        onUpdate: (data) => {
            // Actualizar UI
            $('seismicDrift').textContent = data.driftPercent + '%';
            $('seismicTime').textContent = data.time.toFixed(1) + 's';
            
            // Mini status para panel minimizado
            $('seismicMiniStatus').textContent = `M${earthquakeSimulator.config.magnitude} · ${data.time.toFixed(0)}s · ${data.driftPercent}%`;
            
            // Cambiar color según deriva
            const driftEl = $('seismicDrift');
            if (data.drift > 0.05) {
                driftEl.className = 'seismic-status-value danger';
            } else if (data.drift > 0.02) {
                driftEl.className = 'seismic-status-value warning';
            } else {
                driftEl.className = 'seismic-status-value';
            }
            
            // Aplicar daño al colapso - solo con drift significativo
            if (collapseSimulator && data.drift > 0.04) {
                allMeshes.forEach(mesh => {
                    collapseSimulator.applyDamage(mesh, data.drift * 2);
                });
            }
        },
        onDamage: (drift) => {
            $('seismicState').textContent = '⚠️ DAÑADO';
            $('seismicState').className = 'seismic-status-value warning';
            
            // Colapso solo con deriva MUY alta (>25%) y magnitud fuerte
            const mag = earthquakeSimulator.config.magnitude;
            const collapseThreshold = mag >= 8.0 ? 0.15 : mag >= 7.0 ? 0.25 : 0.40;
            if ($('allowCollapse').checked && drift > collapseThreshold && collapseSimulator) {
                console.warn(`💥 Deriva crítica ${(drift*100).toFixed(1)}% > umbral ${(collapseThreshold*100).toFixed(0)}% - Colapso!`);
                collapseSimulator.initiateCollapse('seismic');
            }
        },
        onComplete: () => {
            $('seismicState').textContent = 'Terremoto finalizado';
        }
    });
    
    // Inicializar simulador de terremoto con todos los meshes
    earthquakeSimulator.initialize();
    
    // Inicializar simulador de colapso (necesita referencia a scene)
    collapseSimulator = new BuildingCollapseSimulator(THREE, model, scene, {
        collapseType: 'progressive',
        criticalDrift: 0.08,
        gravity: 9.81,
        debrisGeneration: true,
        dustEffect: true,
        showCracks: $('showCracks').checked,
        onPhaseChange: (phase) => {
            const phaseNames = {
                'stable': 'Estable',
                'cracking': '🔴 Agrietando',
                'failing': '🔴 Fallando',
                'collapsing': '💥 COLAPSANDO',
                'collapsed': '💀 Colapsado'
            };
            $('seismicState').textContent = phaseNames[phase] || phase;
            
            if (phase === 'collapsing' || phase === 'collapsed') {
                $('seismicState').className = 'seismic-status-value danger';
            }
        },
        onElementFail: (element) => {
            console.log(`❌ Elemento fallado: ${element._structuralType}`);
        },
        onComplete: (data) => {
            console.log('💥 COLAPSO COMPLETADO');
            $('seismicState').textContent = '💀 COLAPSADO';
            $('collapseProgress').textContent = '100%';
        }
    });
    
    collapseSimulator.initialize(earthquakeSimulator);
    
    console.log('✅ Simuladores sísmicos inicializados');
}

// Llamar después de cargar el modelo (agregar al callback de GLTF)
setTimeout(initializeSeismicSimulators, 2000);

// ═══════════════════════════════════════════════════════════
// SISTEMA DE ANOTACIONES ESTRUCTURALES
// ═══════════════════════════════════════════════════════════

let annotationSystem = null;

function initializeAnnotations() {
    if (!model || allMeshes.length === 0) {
        setTimeout(initializeAnnotations, 1000);
        return;
    }
    annotationSystem = new AnnotationSystem(THREE, scene, camera, renderer, model, allMeshes);
    console.log('📌 Sistema de anotaciones inicializado');
}

setTimeout(initializeAnnotations, 2500);

$('bAnn').onclick = e => {
    if (!annotationSystem) {
        alert('Sistema de anotaciones cargando...');
        return;
    }
    const isVisible = annotationSystem.toggle();
    e.currentTarget.classList.toggle('active', isVisible);
};

// ═══════════════════════════════════════════════════════════
// CONTROLES DE UI PARA SIMULACIÓN SÍSMICA
// ═══════════════════════════════════════════════════════════

// Toggle panel sísmico
let seismicPanelVisible = false;
$('bSeismic').onclick = e => {
    seismicPanelVisible = !seismicPanelVisible;
    $('seismicPanel').classList.toggle('vis', seismicPanelVisible);
    e.currentTarget.classList.toggle('active', seismicPanelVisible);
};

// Minimize/expand seismic panel
$('seismicToggle').onclick = (e) => {
    e.stopPropagation();
    $('seismicPanel').classList.toggle('minimized');
};
$('seismicHeader').onclick = () => {
    $('seismicPanel').classList.toggle('minimized');
};

// Actualizar valores de sliders
$('seismicMagnitude').oninput = e => {
    const mag = e.target.value / 10;
    $('magnitudeValue').textContent = mag.toFixed(1);
    if (earthquakeSimulator) {
        earthquakeSimulator.setMagnitude(mag);
    }
};

$('seismicDuration').oninput = e => {
    const dur = parseInt(e.target.value);
    $('durationValue').textContent = dur + 's';
    if (earthquakeSimulator) {
        earthquakeSimulator.setDuration(dur);
    }
};

// Cambio de tipo de suelo
document.querySelectorAll('input[name="soilType"]').forEach(radio => {
    radio.onchange = e => {
        if (e.target.checked && earthquakeSimulator) {
            earthquakeSimulator.setSoilType(e.target.value);
            console.log('Tipo de suelo:', e.target.value);
        }
    };
});

// Cambio de tipo de colapso
document.querySelectorAll('input[name="collapseType"]').forEach(radio => {
    radio.onchange = e => {
        if (e.target.checked && collapseSimulator) {
            collapseSimulator.setCollapseType(e.target.value);
            console.log('Tipo de colapso:', e.target.value);
        }
    };
});

// Botón Iniciar Terremoto
$('startEarthquake').onclick = () => {
    if (!earthquakeSimulator) {
        alert('Simuladores aún no inicializados. Espera un momento...');
        return;
    }
    
    earthquakeSimulator.start();
    $('seismicState').textContent = '🌊 En curso...';
    $('seismicState').className = 'seismic-status-value warning';
    console.log('🌊 Terremoto iniciado!');
};

// Botón Pausar
$('pauseEarthquake').onclick = () => {
    if (earthquakeSimulator) {
        earthquakeSimulator.pause();
        $('seismicState').textContent = '⏸ Pausado';
    }
    if (collapseSimulator) {
        collapseSimulator.stop();
    }
};

// Botón Reset
$('resetEarthquake').onclick = () => {
    if (earthquakeSimulator) {
        earthquakeSimulator.reset();
    }
    if (collapseSimulator) {
        collapseSimulator.reset();
    }
    
    // Reset UI
    $('seismicState').textContent = 'Estable';
    $('seismicState').className = 'seismic-status-value';
    $('seismicDrift').textContent = '0.00%';
    $('seismicDrift').className = 'seismic-status-value';
    $('seismicTime').textContent = '0.0s';
    $('collapseProgress').textContent = '0%';
    
    // Restaurar highlight al estado "all"
    setHighlight('all');
    
    console.log('🔄 Simulación reiniciada');
};

// Actualizar checkbox de grietas
$('showCracks').onchange = e => {
    if (collapseSimulator) {
        collapseSimulator.config.showCracks = e.target.checked;
    }
};

// ═══════════════════════════════════════════════════════════
// ACTUALIZAR SIMULADORES EN EL LOOP DE ANIMACIÓN
// ═══════════════════════════════════════════════════════════

let lastTime = performance.now();
let lt=performance.now(),fc=0;

(function animWithSeismic(t){
    requestAnimationFrame(animWithSeismic);
    
    const deltaTime = (t - lastTime) / 1000;
    lastTime = t;
    
    // Actualizar simulador de terremoto
    if (earthquakeSimulator && earthquakeSimulator.config.active) {
        earthquakeSimulator.update(deltaTime);
    }
    
    // Actualizar simulador de colapso
    if (collapseSimulator && collapseSimulator.config.active) {
        collapseSimulator.update(deltaTime);
        
        // Actualizar progreso de colapso en UI
        const progress = (collapseSimulator.state.collapseProgress * 100).toFixed(0);
        $('collapseProgress').textContent = progress + '%';
    }
    
    // Resto del loop original
    fc++;
    if(t-lt>=1000){$('fps').textContent=fc+' FPS';fc=0;lt=t;}
    ctrl.update(); 
    accentLight.intensity=1.0+Math.sin(t*0.0012)*0.18;
    if (annotationSystem && annotationSystem.visible) annotationSystem.update();
    composer.render();
})(performance.now());