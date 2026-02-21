/* ===================================================
   REACCIONES QUÍMICAS — JAVASCRIPT
   PharmaLab Chile · Química Universitaria
   =================================================== */

/* ── Smooth scroll para anclas ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

/* ── Reveal animation (IntersectionObserver) ── */
(function () {
    const targets = document.querySelectorAll(
        '.rxn-topic,.rxn-detail,.rxn-callout,.rxn-formula,.rxn-timeline,.rxn-table-wrap,.rxn-infocard'
    );
    targets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity .5s ease ${Math.min(i * .06, .6)}s, transform .5s ease ${Math.min(i * .06, .6)}s`;
    });
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: .05, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(el => obs.observe(el));
})();

/* ===================================================
   VISOR 3D DE MOLÉCULAS — Three.js
   =================================================== */
(function () {
    /* ---------- datos de moléculas ---------- */
    const MOLECULES = {
        agua: {
            name: 'Agua',
            formula: 'H₂O',
            description: 'Solvente universal. Molécula polar doblada (ángulo H-O-H ≈ 104.5°). Imprescindible en solubilización de fármacos polares e ionizados.',
            props: [
                { k: 'PM',       v: '18.02 g/mol' },
                { k: 'pKa',      v: '15.7 (agua pura)' },
                { k: 'Geometría',v: 'Angular / doblada' },
                { k: 'Enlace',   v: 'H-O covalente polar' },
                { k: 'Uso farm.',v: 'Solvente para formas farmacéuticas líquidas, inyectables, soluciones orales' },
            ],
            atoms: [
                { symbol: 'O', color: 0xff4444, radius: 0.38, pos: [0, 0, 0] },
                { symbol: 'H', color: 0xffffff, radius: 0.22, pos: [0.76, 0.59, 0] },
                { symbol: 'H', color: 0xffffff, radius: 0.22, pos: [-0.76, 0.59, 0] },
            ],
            bonds: [[0,1],[0,2]],
        },
        aspirina: {
            name: 'Ácido Acetilsalicílico',
            formula: 'C₉H₈O₄',
            description: 'Antiinflamatorio AINE. Sufre hidrólisis de segundo orden en solución. El grupo acetilo se hidroliza a ácido acético + ácido salicílico. Ejemplo clásico de estabilidad de fármacos.',
            props: [
                { k: 'PM',       v: '180.16 g/mol' },
                { k: 'pKa',      v: '3.5 (grupo carboxílico)' },
                { k: 'Geometría',v: 'Planar (anillo bencénico)' },
                { k: 'Enlace',   v: 'Éster + carboxílico' },
                { k: 'Estab.',   v: 'Hidrólisis de 2° orden, sensible a pH alto y temperatura' },
            ],
            atoms: [
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [0, 0, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [0.70, -1.12, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [1.39, 0, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [0.70, 1.12, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [-0.70, 1.12, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [-0.70, -1.12, 0] },
                { symbol: 'O',  color: 0xff4444, radius: 0.30, pos: [2.55, 0.2, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [3.2, -0.7, 0] },
                { symbol: 'O',  color: 0xff4444, radius: 0.30, pos: [4.3, -0.5, 0] },
                { symbol: 'C',  color: 0x888888, radius: 0.32, pos: [2.8, -1.9, 0] },
                { symbol: 'O',  color: 0xff4444, radius: 0.30, pos: [-1.4, -1.8, 0] },
                { symbol: 'O',  color: 0xff4444, radius: 0.30, pos: [-2.5, -1.5, 0] },
            ],
            bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,8],[7,9],[0,10],[10,11]],
        },
        glucosa: {
            name: 'Glucosa',
            formula: 'C₆H₁₂O₆',
            description: 'Monosacárido base del metabolismo energético. Combustión: ΔH° = −2803 kJ/mol. Su oxidación en la cadena respiratoria (glucólisis → Ciclo de Krebs → OXPHOS) produce ~30-32 ATP.',
            props: [
                { k: 'PM',       v: '180.16 g/mol' },
                { k: 'ΔH comb.', v: '−2803 kJ/mol' },
                { k: 'Geometría',v: 'Anillo piranosa (forma β)' },
                { k: 'ΔG°',      v: '−2870 kJ/mol (oxidación completa)' },
                { k: 'Uso farm.',v: 'Excipiente (lactosa derivada), suero glucosado 5%, 10%, 50%' },
            ],
            atoms: [
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [0, 0, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [1.28, 0.74, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [2.56, 0, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [2.56, -1.48, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [1.28, -2.22, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [0, -1.48, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [-1.1, 0.74, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [1.28, 2.1, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [3.7, 0.6, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [3.7, -2.1, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [1.28, -3.6, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [1.28, -4.8, 0] },
            ],
            bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,7],[2,8],[3,9],[4,10],[10,11]],
        },
        paracetamol: {
            name: 'Paracetamol',
            formula: 'C₈H₉NO₂',
            description: 'Analgésico-antipirético. Eliminación de primer orden (t₁/₂ ≈ 2 h). Metabolismo hepático: glucuronidación y sulfatación (>95%). Sobredosis: metabolito tóxico NAPQI por CYP2E1 agota glutatión → hepatotoxicidad.',
            props: [
                { k: 'PM',       v: '151.16 g/mol' },
                { k: 'pKa',      v: '9.5 (grupo fenólico)' },
                { k: 't₁/₂',     v: '1.5 – 3 h (adultos)' },
                { k: 'Orden',    v: 'Primer orden (cinética lineal)' },
                { k: 'CYP',      v: 'Metabolizado por CYP2E1/3A4 a NAPQI (tóxico a dosis altas)' },
            ],
            atoms: [
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [0, 0, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [0.70, -1.12, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [1.39, 0, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [0.70, 1.12, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [-0.70, 1.12, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [-0.70, -1.12, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [2.55, 0.2, 0] },
                { symbol: 'N', color: 0x4488ff, radius: 0.30, pos: [-1.39, 0, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [-2.7, 0, 0] },
                { symbol: 'O', color: 0xff4444, radius: 0.30, pos: [-3.4, 1.0, 0] },
                { symbol: 'C', color: 0x888888, radius: 0.32, pos: [-3.4, -1.0, 0] },
            ],
            bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[0,7],[7,8],[8,9],[8,10]],
        },
    };

    /* ---------- estado ---------- */
    let scene, camera, renderer, molGroup;
    let isDragging = false, prevMouse = { x: 0, y: 0 };
    let currentMol = 'agua';
    let animId = null;

    /* ---------- init Three.js ---------- */
    function init() {
        const canvas = document.getElementById('mol-canvas');
        if (!canvas) return;

        const wrap = canvas.parentElement;

        /* scene */
        scene = new THREE.Scene();

        /* camera */
        camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 8);

        /* renderer */
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
        renderer.setClearColor(0x000000, 0);

        /* lights */
        const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 8, 5);
        scene.add(dirLight);
        const rimLight = new THREE.DirectionalLight(0x10b981, 0.4);
        rimLight.position.set(-5, -3, -5);
        scene.add(rimLight);

        /* mol group */
        molGroup = new THREE.Group();
        scene.add(molGroup);

        buildMolecule(currentMol);
        animate();

        /* ── eventos de ratón ── */
        canvas.addEventListener('mousedown', e => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
        window.addEventListener('mouseup',   () => isDragging = false);
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const dx = e.clientX - prevMouse.x;
            const dy = e.clientY - prevMouse.y;
            molGroup.rotation.y += dx * 0.01;
            molGroup.rotation.x += dy * 0.01;
            prevMouse = { x: e.clientX, y: e.clientY };
        });

        /* touch */
        let touchPrev = null;
        canvas.addEventListener('touchstart', e => { touchPrev = e.touches[0]; });
        canvas.addEventListener('touchmove',  e => {
            if (!touchPrev) return;
            const dx = e.touches[0].clientX - touchPrev.clientX;
            const dy = e.touches[0].clientY - touchPrev.clientY;
            molGroup.rotation.y += dx * 0.012;
            molGroup.rotation.x += dy * 0.012;
            touchPrev = e.touches[0];
            e.preventDefault();
        }, { passive: false });

        /* scroll zoom */
        canvas.addEventListener('wheel', e => {
            camera.position.z = Math.max(3, Math.min(18, camera.position.z + e.deltaY * 0.01));
            e.preventDefault();
        }, { passive: false });

        /* resize */
        window.addEventListener('resize', () => {
            const w = wrap.clientWidth, h = wrap.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    }

    /* ---------- construir molécula ---------- */
    function buildMolecule(key) {
        const mol = MOLECULES[key];
        if (!mol) return;

        /* limpiar grupo anterior */
        while (molGroup.children.length) molGroup.remove(molGroup.children[0]);

        /* centrar molécula */
        const center = new THREE.Vector3();
        mol.atoms.forEach(a => center.add(new THREE.Vector3(...a.pos)));
        center.divideScalar(mol.atoms.length);

        /* átomos */
        mol.atoms.forEach(atom => {
            const geo = new THREE.SphereGeometry(atom.radius * 1.1, 32, 32);
            const mat = new THREE.MeshPhongMaterial({
                color: atom.color,
                shininess: 90,
                specular: 0x444444,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                atom.pos[0] - center.x,
                atom.pos[1] - center.y,
                atom.pos[2] - center.z,
            );
            molGroup.add(mesh);
        });

        /* enlaces */
        mol.bonds.forEach(([i, j]) => {
            const a = mol.atoms[i], b = mol.atoms[j];
            const start = new THREE.Vector3(a.pos[0] - center.x, a.pos[1] - center.y, a.pos[2] - center.z);
            const end   = new THREE.Vector3(b.pos[0] - center.x, b.pos[1] - center.y, b.pos[2] - center.z);

            const dir = new THREE.Vector3().subVectors(end, start);
            const len = dir.length();
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

            const geo = new THREE.CylinderGeometry(0.06, 0.06, len, 12, 1);
            const mat = new THREE.MeshPhongMaterial({ color: 0x556677, shininess: 40 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(mid);

            /* orientar el cilindro */
            const axis = new THREE.Vector3(0, 1, 0);
            mesh.quaternion.setFromUnitVectors(axis, dir.normalize());
            molGroup.add(mesh);
        });

        /* escalar para que quepa bien */
        const box = new THREE.Box3().setFromObject(molGroup);
        const size = box.getSize(new THREE.Vector3()).length();
        const targetSize = 3.5;
        molGroup.scale.setScalar(targetSize / Math.max(size, 0.1));
    }

    /* ---------- loop de animación ---------- */
    function animate() {
        animId = requestAnimationFrame(animate);
        if (!isDragging) {
            molGroup.rotation.y += 0.004;
        }
        renderer.render(scene, camera);
    }

    /* ---------- botones de selección ---------- */
    function setupButtons() {
        document.querySelectorAll('.mol-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.mol;
                if (!MOLECULES[key]) return;
                currentMol = key;

                /* actualizar estado activo */
                document.querySelectorAll('.mol-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                /* reconstruir molécula */
                buildMolecule(key);

                /* actualizar panel de info */
                updateInfo(key);
            });
        });
    }

    /* ---------- actualizar panel de información ---------- */
    function updateInfo(key) {
        const mol = MOLECULES[key];
        if (!mol) return;

        const nameEl    = document.getElementById('mol-name');
        const formulaEl = document.getElementById('mol-formula');
        const descEl    = document.getElementById('mol-desc');
        const propsEl   = document.getElementById('mol-props');

        if (nameEl)    nameEl.textContent    = mol.name;
        if (formulaEl) formulaEl.textContent = mol.formula;
        if (descEl)    descEl.textContent    = mol.description;
        if (propsEl) {
            propsEl.innerHTML = mol.props.map(p =>
                `<li><span class="prop-key">${p.k}</span>${p.v}</li>`
            ).join('');
        }
    }

    /* ---------- esperar a que Three.js esté disponible ---------- */
    function waitForThree(attempts) {
        if (typeof THREE !== 'undefined') {
            init();
            setupButtons();
            updateInfo(currentMol);
        } else if (attempts > 0) {
            setTimeout(() => waitForThree(attempts - 1), 200);
        } else {
            const wrap = document.querySelector('.rxn-3d-canvas-wrap');
            if (wrap) wrap.innerHTML = '<p style="text-align:center;padding:40px;color:#556677;font-size:.84rem">Visor 3D no disponible (Three.js no cargó).</p>';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => waitForThree(20));
    } else {
        waitForThree(20);
    }
})();
