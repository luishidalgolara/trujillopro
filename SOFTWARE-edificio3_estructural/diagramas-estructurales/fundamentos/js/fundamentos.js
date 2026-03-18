/* ============================================================
   IngeLAB 3D — Fundamentos Estructurales
   fundamentos.js  |  v1.0
   Lógica compartida: navegación, 3D helpers, animaciones
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   NAVEGACIÓN ENTRE CONCEPTOS
   ══════════════════════════════════════════════════════════ */

const FND = {
    currentIndex: 0,
    items: [],
    accentVar: '--accent',
};

/**
 * Inicializa la navegación del sidebar
 * @param {string} accentVar — variable CSS del color accent de la categoría
 */
function initNav(accentVar) {
    FND.accentVar = accentVar || '--accent';

    // Recoger todos los conceptos
    FND.items = Array.from(document.querySelectorAll('.concepto'));

    // Recoger items del sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    sidebarItems.forEach((item, i) => {
        item.addEventListener('click', () => showConcepto(i));
    });

    // Botones prev/next
    document.querySelectorAll('.nav-btn[data-dir="prev"]').forEach(btn => {
        btn.addEventListener('click', () => showConcepto(FND.currentIndex - 1));
    });
    document.querySelectorAll('.nav-btn[data-dir="next"]').forEach(btn => {
        btn.addEventListener('click', () => showConcepto(FND.currentIndex + 1));
    });

    // Mostrar primero
    showConcepto(0);
}

function showConcepto(index) {
    const n = FND.items.length;
    if (index < 0 || index >= n) return;

    FND.currentIndex = index;

    // Actualizar conceptos visibles
    FND.items.forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });

    // Actualizar sidebar
    document.querySelectorAll('.sidebar-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });

    // Actualizar progress bar
    const fill = document.querySelector('.sidebar-progress-fill');
    if (fill) fill.style.width = ((index + 1) / n * 100) + '%';

    // Actualizar nav prev/next
    updateNavButtons(index, n);

    // Scroll al top del contenido
    const main = document.querySelector('.main-content');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });

    // Disparar render del canvas si existe
    const canvas = document.querySelector(`.concepto.active canvas[data-scene]`);
    if (canvas) renderScene(canvas);
}

function updateNavButtons(index, n) {
    document.querySelectorAll('.nav-btn[data-dir="prev"]').forEach(btn => {
        const prevConcepto = FND.items[index - 1];
        if (prevConcepto) {
            const titulo = prevConcepto.querySelector('.concepto-titulo')?.textContent || '';
            btn.querySelector('.nav-label') && (btn.querySelector('.nav-label').textContent = '← Anterior');
            btn.querySelector('.nav-name') && (btn.querySelector('.nav-name').textContent = titulo);
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });
    document.querySelectorAll('.nav-btn[data-dir="next"]').forEach(btn => {
        const nextConcepto = FND.items[index + 1];
        if (nextConcepto) {
            const titulo = nextConcepto.querySelector('.concepto-titulo')?.textContent || '';
            btn.querySelector('.nav-label') && (btn.querySelector('.nav-label').textContent = 'Siguiente →');
            btn.querySelector('.nav-name') && (btn.querySelector('.nav-name').textContent = titulo);
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });
}

/* ══════════════════════════════════════════════════════════
   THREE.JS — HELPERS DE ESCENA 3D
   Requiere Three.js cargado como CDN
   ══════════════════════════════════════════════════════════ */

const SCENES = new Map(); // canvas → { scene, camera, renderer, mixer, animId }

/**
 * Crea una escena Three.js básica para un canvas dado
 */
function createScene(canvas, bgColor = 0x080c10) {
    if (!window.THREE) return null;

    const W = canvas.clientWidth  || canvas.width  || 600;
    const H = canvas.clientHeight || canvas.height || 300;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.06);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    // Grid helper sutil
    const grid = new THREE.GridHelper(10, 10, 0x1a2535, 0x1a2535);
    scene.add(grid);

    const sceneData = { scene, camera, renderer, animId: null, mesh: null };
    SCENES.set(canvas, sceneData);

    // Orbit simple con mouse
    addOrbitMouse(canvas, camera, sceneData);

    return sceneData;
}

/**
 * Orbita básica con drag de mouse sin OrbitControls
 */
function addOrbitMouse(canvas, camera, sceneData) {
    let isDragging = false, prevX = 0, prevY = 0;
    let theta = 0.6, phi = 0.4, radius = 7;

    function updateCam() {
        camera.position.set(
            radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(phi),
            radius * Math.cos(theta) * Math.cos(phi)
        );
        camera.lookAt(0, 0, 0);
    }
    updateCam();

    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    canvas.addEventListener('mousemove', e => {
        if (!isDragging) return;
        theta -= (e.clientX - prevX) * 0.01;
        phi   += (e.clientY - prevY) * 0.01;
        phi    = Math.max(-1.2, Math.min(1.2, phi));
        prevX  = e.clientX; prevY = e.clientY;
        updateCam();
    });
    canvas.addEventListener('wheel', e => {
        radius = Math.max(2, Math.min(14, radius + e.deltaY * 0.01));
        updateCam();
        e.preventDefault();
    }, { passive: false });

    // Touch
    let lastTouch = null;
    canvas.addEventListener('touchstart', e => { lastTouch = e.touches[0]; });
    canvas.addEventListener('touchmove', e => {
        if (!lastTouch) return;
        theta -= (e.touches[0].clientX - lastTouch.clientX) * 0.01;
        phi   += (e.touches[0].clientY - lastTouch.clientY) * 0.01;
        phi    = Math.max(-1.2, Math.min(1.2, phi));
        lastTouch = e.touches[0];
        updateCam();
        e.preventDefault();
    }, { passive: false });
}

/**
 * Inicia el loop de animación para un canvas
 */
function startLoop(canvas, extraAnimate) {
    const sd = SCENES.get(canvas);
    if (!sd) return;
    if (sd.animId) cancelAnimationFrame(sd.animId);

    function loop() {
        sd.animId = requestAnimationFrame(loop);
        if (extraAnimate) extraAnimate(sd);
        sd.renderer.render(sd.scene, sd.camera);
    }
    loop();
}

/**
 * Detiene el loop de un canvas
 */
function stopLoop(canvas) {
    const sd = SCENES.get(canvas);
    if (sd?.animId) { cancelAnimationFrame(sd.animId); sd.animId = null; }
}

/* ══════════════════════════════════════════════════════════
   MATERIALES COMUNES
   ══════════════════════════════════════════════════════════ */
function matConcrete() {
    return new THREE.MeshStandardMaterial({ color: 0x8899aa, roughness: 0.8, metalness: 0.1 });
}
function matSteel() {
    return new THREE.MeshStandardMaterial({ color: 0x778899, roughness: 0.4, metalness: 0.7 });
}
function matAccent(hexColor) {
    return new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.3, metalness: 0.2, emissive: hexColor, emissiveIntensity: 0.15 });
}
function matWire(hexColor) {
    return new THREE.MeshStandardMaterial({ color: hexColor, wireframe: true, opacity: 0.4, transparent: true });
}

/* ══════════════════════════════════════════════════════════
   GEOMETRÍAS FRECUENTES
   ══════════════════════════════════════════════════════════ */

/** Viga rectangular (box) */
function makeViga(L, b, h, mat) {
    const geo = new THREE.BoxGeometry(L, h, b);
    return new THREE.Mesh(geo, mat);
}

/** Columna cuadrada */
function makeColumna(H, b, mat) {
    const geo = new THREE.BoxGeometry(b, H, b);
    return new THREE.Mesh(geo, mat);
}

/** Losa plana */
function makeLosa(Lx, Ly, e, mat) {
    const geo = new THREE.BoxGeometry(Lx, e, Ly);
    return new THREE.Mesh(geo, mat);
}

/** Flecha 3D (cilindro + cono) */
function makeFlecha(length, color, dir) {
    const group = new THREE.Group();
    const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, length * 0.8, 8),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3 })
    );
    shaft.position.y = length * 0.4;
    group.add(shaft);

    const head = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, length * 0.22, 8),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4 })
    );
    head.position.y = length * 0.9;
    group.add(head);

    if (dir === 'down') group.rotation.z = Math.PI;
    if (dir === 'right') group.rotation.z = -Math.PI / 2;
    if (dir === 'left')  group.rotation.z =  Math.PI / 2;

    return group;
}

/** Etiqueta 3D como sprite */
function makeLabel(text, color = '#ffffff') {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(8,12,16,0.85)';
    ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = color;
    ctx.font = 'bold 22px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 32);
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.6, 0.4, 1);
    return sprite;
}

/* ══════════════════════════════════════════════════════════
   DISPATCH DE ESCENAS — cada canvas[data-scene] tiene su builder
   ══════════════════════════════════════════════════════════ */
function renderScene(canvas) {
    const sceneId = canvas.dataset.scene;
    if (!sceneId || !window.THREE) return;
    stopLoop(canvas);
    const builder = SCENE_BUILDERS[sceneId];
    if (builder) builder(canvas);
}

const SCENE_BUILDERS = {};

function registerScene(id, fn) {
    SCENE_BUILDERS[id] = fn;
}

/* ══════════════════════════════════════════════════════════
   INIT GLOBAL
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los canvas 3D visibles al cargar
    document.querySelectorAll('canvas[data-scene]').forEach(canvas => {
        // Solo renderizar si su concepto está activo
        if (canvas.closest('.concepto.active')) {
            renderScene(canvas);
        }
    });
});

/* Exportar para uso en páginas */
window.FND_NAV    = { initNav, showConcepto };
window.FND_3D     = { createScene, startLoop, stopLoop, makeViga, makeColumna, makeLosa, makeFlecha, makeLabel, matConcrete, matSteel, matAccent, matWire, registerScene, renderScene };
