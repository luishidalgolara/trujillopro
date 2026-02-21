/* ===== SINTESIS DE FARMACOS - PHARMALAB CHILE ===== */
/* sintesis.js - Three.js 3D molecules + interactive features */

(function () {
  'use strict';

  /* ── THREE.JS CDN LOADER ── */
  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', init);

  /* ═══════════════════════════════════════════════
   * MOLECULE DATA
   * ═══════════════════════════════════════════════ */
  const MOLECULES = {
    aspirina: {
      name: 'Ácido Acetilsalicílico (Aspirina)',
      formula: 'C₉H₈O₄',
      atoms: [
        { el: 'C', x:  0.00, y:  0.00, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y:  0.00, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  2.10, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y:  2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  0.00, y:  2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x: -0.70, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x: -0.70, y: -1.30, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'O', x: -1.95, y: -1.30, z: 0.00, r: 0.32, color: 0xff3300 },
        { el: 'O', x: -0.10, y: -2.50, z: 0.00, r: 0.32, color: 0xff3300 },
        { el: 'O', x:  1.40, y: -1.20, z: 0.00, r: 0.32, color: 0xff3300 },
        { el: 'C', x:  2.70, y: -1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  3.30, y: -2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'O', x:  3.40, y: -0.00, z: 0.00, r: 0.32, color: 0xff3300 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
        [0,6],[6,7],[6,8],[1,9],[9,10],[10,11],[10,12]
      ]
    },
    paracetamol: {
      name: 'Paracetamol (Acetaminofén)',
      formula: 'C₈H₉NO₂',
      atoms: [
        { el: 'C', x:  0.00, y:  0.00, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y:  0.00, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  2.10, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y:  2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  0.00, y:  2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x: -0.70, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'N', x:  1.40, y: -1.30, z: 0.00, r: 0.33, color: 0x3366ff },
        { el: 'C', x:  2.70, y: -1.30, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'O', x:  3.40, y: -0.10, z: 0.00, r: 0.32, color: 0xff3300 },
        { el: 'C', x:  3.30, y: -2.50, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'O', x: -0.70, y:  3.60, z: 0.00, r: 0.32, color: 0xff3300 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
        [1,6],[6,7],[7,8],[7,9],[4,10]
      ]
    },
    ibuprofeno: {
      name: 'Ibuprofeno',
      formula: 'C₁₃H₁₈O₂',
      atoms: [
        { el: 'C', x:  0.00, y:  0.00, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y:  0.00, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  2.10, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y:  2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  0.00, y:  2.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x: -0.70, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.40, y: -1.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  2.90, y: -1.40, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  3.60, y: -2.70, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'O', x:  3.60, y: -0.20, z: 0.00, r: 0.32, color: 0xff3300 },
        { el: 'O', x:  4.90, y: -0.20, z: 0.00, r: 0.32, color: 0xff3300 },
        { el: 'C', x: -2.20, y:  1.20, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  2.80, y:  3.60, z: 0.00, r: 0.35, color: 0x888888 },
        { el: 'C', x:  3.50, y:  4.80, z: 0.00, r: 0.35, color: 0x888888 },
      ],
      bonds: [
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
        [1,6],[6,7],[7,8],[7,9],[9,10],
        [5,11],[3,12],[12,13]
      ]
    }
  };

  /* ═══════════════════════════════════════════════
   * HELPER: create molecule scene
   * ═══════════════════════════════════════════════ */
  function buildMoleculeScene(THREE, canvas, molKey) {
    const mol = MOLECULES[molKey];
    if (!mol) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth || 400, canvas.clientHeight || 400);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight(0x00f5d4, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xff2d78, 0.6);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    // Center molecule
    let cx = 0, cy = 0;
    mol.atoms.forEach(a => { cx += a.x; cy += a.y; });
    cx /= mol.atoms.length; cy /= mol.atoms.length;

    const molGroup = new THREE.Group();

    // Atoms
    mol.atoms.forEach(atom => {
      const geo = new THREE.SphereGeometry(atom.r * 0.7, 20, 20);
      const mat = new THREE.MeshPhongMaterial({
        color: atom.color,
        shininess: 100,
        specular: 0x444444,
        emissive: atom.color,
        emissiveIntensity: 0.15
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(atom.x - cx, atom.y - cy, atom.z);
      molGroup.add(mesh);
    });

    // Bonds
    mol.bonds.forEach(([i, j]) => {
      const a = mol.atoms[i], b = mol.atoms[j];
      const start = new THREE.Vector3(a.x - cx, a.y - cy, a.z);
      const end = new THREE.Vector3(b.x - cx, b.y - cy, b.z);
      const dir = new THREE.Vector3().subVectors(end, start);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

      const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, len, 8);
      const bondMat = new THREE.MeshPhongMaterial({
        color: 0x334466,
        shininess: 60,
        specular: 0x00f5d4,
        emissive: 0x001133,
        emissiveIntensity: 0.5
      });
      const bond = new THREE.Mesh(bondGeo, bondMat);
      bond.position.copy(mid);
      bond.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      );
      molGroup.add(bond);
    });

    scene.add(molGroup);

    // Mouse drag rotation
    let isDragging = false, prevX = 0, prevY = 0;
    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    canvas.addEventListener('touchstart', e => { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });
    canvas.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = (e.clientX - prevX) * 0.01;
      const dy = (e.clientY - prevY) * 0.01;
      molGroup.rotation.y += dx;
      molGroup.rotation.x += dy;
      prevX = e.clientX; prevY = e.clientY;
    });
    canvas.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const dx = (e.touches[0].clientX - prevX) * 0.01;
      const dy = (e.touches[0].clientY - prevY) * 0.01;
      molGroup.rotation.y += dx;
      molGroup.rotation.x += dy;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    }, { passive: true });

    // Scroll zoom
    canvas.addEventListener('wheel', e => {
      camera.position.z = Math.max(5, Math.min(25, camera.position.z + e.deltaY * 0.02));
      e.preventDefault();
    }, { passive: false });

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isDragging) { molGroup.rotation.y += 0.006; molGroup.rotation.x += 0.002; }
      renderer.render(scene, camera);
    }
    animate();

    // Resize
    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(canvas);

    return { renderer, scene, camera, molGroup, animId, ro };
  }

  /* ═══════════════════════════════════════════════
   * HERO CANVAS – floating atoms particles
   * ═══════════════════════════════════════════════ */
  function initHeroCanvas(THREE) {
    const canvas = document.getElementById('sin-hero-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 30);

    const light = new THREE.PointLight(0x00f5d4, 2, 80);
    light.position.set(0, 10, 20);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    // Floating nodes
    const N = 60;
    const nodes = [];
    for (let i = 0; i < N; i++) {
      const r = Math.random() * 0.25 + 0.08;
      const geo = new THREE.SphereGeometry(r, 10, 10);
      const colors = [0x00f5d4, 0xff2d78, 0xa855f7, 0x22c55e];
      const col = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshPhongMaterial({
        color: col, emissive: col, emissiveIntensity: 0.6, shininess: 100
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20
      );
      m.userData = {
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        vz: (Math.random() - 0.5) * 0.02
      };
      scene.add(m);
      nodes.push(m);
    }

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f5d4, opacity: 0.12, transparent: true });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    function updateLines() {
      lineGroup.clear();
      const threshold = 8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < threshold) {
            const geo = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position.clone(), nodes[j].position.clone()
            ]);
            const line = new THREE.Line(geo, lineMat.clone());
            line.material.opacity = (1 - d / threshold) * 0.2;
            lineGroup.add(line);
          }
        }
      }
    }

    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      nodes.forEach(n => {
        n.position.x += n.userData.vx;
        n.position.y += n.userData.vy;
        n.position.z += n.userData.vz;
        if (Math.abs(n.position.x) > 30) n.userData.vx *= -1;
        if (Math.abs(n.position.y) > 20) n.userData.vy *= -1;
        if (Math.abs(n.position.z) > 10) n.userData.vz *= -1;
      });
      if (++frame % 3 === 0) updateLines();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }

  /* ═══════════════════════════════════════════════
   * SCALE-UP CANVAS – reactor scale visualizer
   * ═══════════════════════════════════════════════ */
  function initScaleCanvas(THREE) {
    const canvas = document.getElementById('sin-scale-canvas');
    if (!canvas) return;

    const w = canvas.clientWidth || 500, h = canvas.clientHeight || 420;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0x0d1120, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 4, 16);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl = new THREE.DirectionalLight(0x00f5d4, 1.5);
    dl.position.set(5, 10, 5);
    scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0xff2d78, 0.6);
    dl2.position.set(-5, -5, 3);
    scene.add(dl2);

    // Build reactors
    const stages = [
      { label: 'Lab\n1 mL', scale: 0.4, color: 0x00f5d4, x: -5 },
      { label: 'Piloto\n10 L',  scale: 0.7, color: 0xa855f7, x: -1.5 },
      { label: 'Semi\n100 L', scale: 1.0, color: 0xff2d78, x: 2.5 },
      { label: 'Planta\n10.000 L', scale: 1.6, color: 0x22c55e, x: 6.5 },
    ];

    const reactors = [];
    stages.forEach(st => {
      const g = new THREE.Group();

      // Cylinder body
      const bodyGeo = new THREE.CylinderGeometry(
        st.scale * 0.7, st.scale * 0.8, st.scale * 2.5, 24
      );
      const bodyMat = new THREE.MeshPhongMaterial({
        color: 0x1a2540,
        shininess: 80,
        specular: st.color,
        transparent: true,
        opacity: 0.9
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      g.add(body);

      // Dome top
      const domeGeo = new THREE.SphereGeometry(st.scale * 0.7, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshPhongMaterial({
        color: 0x1a2540,
        shininess: 100,
        specular: st.color
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = st.scale * 1.25;
      g.add(dome);

      // Glow ring
      const ringGeo = new THREE.TorusGeometry(st.scale * 0.75, 0.06, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: st.color, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = st.scale * 0.5;
      ring.rotation.x = Math.PI / 2;
      g.add(ring);

      // Pipe
      const pipeGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 8);
      const pipeMat = new THREE.MeshPhongMaterial({ color: 0x334466 });
      const pipe = new THREE.Mesh(pipeGeo, pipeMat);
      pipe.position.set(st.scale * 0.55, st.scale * 1.6, 0);
      pipe.rotation.z = Math.PI / 4;
      g.add(pipe);

      g.position.set(st.x, -st.scale * 1.25 + 0, 0);
      g.userData = { color: st.color, ring };
      scene.add(g);
      reactors.push(g);
    });

    // Floor grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x1a2540, 0x111827);
    gridHelper.position.y = -2.5;
    scene.add(gridHelper);

    let activeReactor = null;
    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.02;

      reactors.forEach((r, i) => {
        r.rotation.y = Math.sin(time * 0.5 + i) * 0.1;
        r.userData.ring.material.opacity = 0.5 + 0.3 * Math.sin(time * 2 + i);
      });

      renderer.render(scene, camera);
    }
    animate();

    // Stage click highlight
    document.querySelectorAll('.sin-stage').forEach((el, i) => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.sin-stage').forEach(s => s.classList.remove('active'));
        el.classList.add('active');
        reactors.forEach((r, ri) => {
          const s = stages[ri].scale;
          r.scale.set(1, ri === i ? 1.15 : 1, 1);
        });
      });
    });

    const ro = new ResizeObserver(() => {
      const nw = canvas.clientWidth, nh = canvas.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(canvas);
  }

  /* ═══════════════════════════════════════════════
   * GROUP 3D CANVAS
   * ═══════════════════════════════════════════════ */
  const GROUPS_3D = {
    hidroxilo: {
      atoms: [
        { el: 'O', x: 0,   y: 0,   z: 0,   r: 0.38, color: 0xff3300 },
        { el: 'H', x: 0.9, y: 0.7, z: 0,   r: 0.22, color: 0xffffff },
        { el: 'C', x: -1,  y: 0,   z: 0,   r: 0.35, color: 0x888888 },
      ],
      bonds: [[0,1],[0,2]]
    },
    carboxilo: {
      atoms: [
        { el: 'C', x:  0,   y:  0,   z: 0, r: 0.35, color: 0x888888 },
        { el: 'O', x:  1.2, y:  0.9, z: 0, r: 0.32, color: 0xff3300 },
        { el: 'O', x:  1.2, y: -0.9, z: 0, r: 0.32, color: 0xff3300 },
        { el: 'H', x:  2.1, y: -0.9, z: 0, r: 0.22, color: 0xffffff },
        { el: 'C', x: -1.4, y:  0,   z: 0, r: 0.35, color: 0x888888 },
      ],
      bonds: [[0,1],[0,2],[2,3],[0,4]]
    },
    amino: {
      atoms: [
        { el: 'N', x:  0,   y:  0,   z: 0, r: 0.33, color: 0x3366ff },
        { el: 'H', x:  0.9, y:  0.7, z: 0, r: 0.22, color: 0xffffff },
        { el: 'H', x:  0.9, y: -0.7, z: 0, r: 0.22, color: 0xffffff },
        { el: 'C', x: -1.2, y:  0,   z: 0, r: 0.35, color: 0x888888 },
      ],
      bonds: [[0,1],[0,2],[0,3]]
    },
    carbonilo: {
      atoms: [
        { el: 'C', x:  0,   y:  0, z: 0, r: 0.35, color: 0x888888 },
        { el: 'O', x:  0,   y:  1.25, z: 0, r: 0.32, color: 0xff3300 },
        { el: 'C', x: -1.3, y: -0.5, z: 0, r: 0.35, color: 0x888888 },
        { el: 'C', x:  1.3, y: -0.5, z: 0, r: 0.35, color: 0x888888 },
      ],
      bonds: [[0,1],[0,2],[0,3]]
    }
  };

  function initGroupCanvas(THREE) {
    const canvas = document.getElementById('sin-group-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300, 300);
    renderer.setClearColor(0x0d1120, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 8;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dl = new THREE.DirectionalLight(0x00f5d4, 1.5);
    dl.position.set(5, 5, 5);
    scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0xff2d78, 0.7);
    dl2.position.set(-3, -3, 3);
    scene.add(dl2);

    let currentGroup = null;
    let molGroup = new THREE.Group();
    scene.add(molGroup);
    let animating = true;

    function loadGroup(key) {
      const gd = GROUPS_3D[key];
      if (!gd) return;

      // Clear
      while (molGroup.children.length) molGroup.remove(molGroup.children[0]);

      let cx = 0, cy = 0;
      gd.atoms.forEach(a => { cx += a.x; cy += a.y; });
      cx /= gd.atoms.length; cy /= gd.atoms.length;

      gd.atoms.forEach(atom => {
        const geo = new THREE.SphereGeometry(atom.r * 0.85, 20, 20);
        const mat = new THREE.MeshPhongMaterial({
          color: atom.color, emissive: atom.color, emissiveIntensity: 0.2,
          shininess: 100, specular: 0x333333
        });
        const m = new THREE.Mesh(geo, mat);
        m.position.set(atom.x - cx, atom.y - cy, atom.z);
        molGroup.add(m);
      });

      gd.bonds.forEach(([i, j]) => {
        const a = gd.atoms[i], b = gd.atoms[j];
        const start = new THREE.Vector3(a.x - cx, a.y - cy, a.z);
        const end = new THREE.Vector3(b.x - cx, b.y - cy, b.z);
        const dir = new THREE.Vector3().subVectors(end, start);
        const len = dir.length();
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const geo = new THREE.CylinderGeometry(0.07, 0.07, len, 8);
        const mat = new THREE.MeshPhongMaterial({ color: 0x334466, shininess: 60 });
        const bond = new THREE.Mesh(geo, mat);
        bond.position.copy(mid);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.normalize());
        molGroup.add(bond);
      });
    }

    loadGroup('hidroxilo');

    function animate() {
      requestAnimationFrame(animate);
      molGroup.rotation.y += 0.008;
      renderer.render(scene, camera);
    }
    animate();

    // Group item buttons
    document.querySelectorAll('.sin-group-item').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.sin-group-item').forEach(g => g.classList.remove('active'));
        el.classList.add('active');
        loadGroup(el.dataset.group);
      });
    });
  }

  /* ═══════════════════════════════════════════════
   * MAIN MOLECULE VIEWER
   * ═══════════════════════════════════════════════ */
  let currentMolScene = null;

  function initMainViewer(THREE) {
    const canvas = document.getElementById('sin-mol-canvas');
    if (!canvas) return;

    currentMolScene = buildMoleculeScene(THREE, canvas, 'aspirina');

    document.querySelectorAll('.sin-mol-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sin-mol-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (currentMolScene) {
          currentMolScene.ro.unobserve(canvas);
          currentMolScene.renderer.dispose();
        }
        currentMolScene = buildMoleculeScene(THREE, canvas, btn.dataset.mol);

        // Update info
        const mol = MOLECULES[btn.dataset.mol];
        const nameEl = document.getElementById('sin-mol-name');
        const fmEl = document.getElementById('sin-mol-formula');
        if (nameEl) nameEl.textContent = mol.name;
        if (fmEl) fmEl.textContent = mol.formula;
      });
    });
  }

  /* ═══════════════════════════════════════════════
   * QUIZ ENGINE
   * ═══════════════════════════════════════════════ */
  const QUIZ_DATA = [
    {
      q: '¿Cuál es el agente acilante utilizado en la síntesis de la Aspirina?',
      opts: ['Ácido acético', 'Anhídrido acético', 'Cloruro de acetilo', 'Acetato de sodio'],
      correct: 1,
      feedback: '¡Correcto! El anhídrido acético (Ac₂O) reacciona con el grupo -OH del ácido salicílico para formar el enlace éster característico de la aspirina. Es más seguro que el cloruro de acetilo.'
    },
    {
      q: '¿Qué tipo de reacción es la síntesis del paracetamol desde p-aminofenol?',
      opts: ['Sustitución nucleofílica aromática', 'Acetilación de amina', 'Reducción catalítica', 'Hidrólisis ácida'],
      correct: 1,
      feedback: '¡Exacto! Es una acetilación. El grupo amino (-NH₂) del p-aminofenol reacciona con anhídrido acético formando el enlace amida (-NHCOCH₃) del paracetamol.'
    },
    {
      q: '¿Cuál es la función principal de los grupos protectores en síntesis?',
      opts: [
        'Aumentar la solubilidad del fármaco',
        'Bloquear grupos funcionales reactivos para evitar reacciones indeseadas',
        'Mejorar la absorción gastrointestinal',
        'Reducir la toxicidad del producto final'
      ],
      correct: 1,
      feedback: '¡Correcto! Los grupos protectores (ej. BOC, Fmoc, TMS) bloquean temporalmente grupos como -OH, -NH₂ o -COOH para que la reacción ocurra selectivamente en el sitio deseado.'
    },
    {
      q: '¿Qué parámetro es CRÍTICO al escalar de laboratorio a planta industrial?',
      opts: [
        'Color del producto',
        'Número de CAS del solvente',
        'Transferencia de calor y mezcla (agitación)',
        'Empaque del producto terminado'
      ],
      correct: 2,
      feedback: '¡Perfecto! La transferencia de calor y la eficiencia de mezcla son los mayores desafíos del scale-up. Al aumentar el volumen, la relación superficie/volumen disminuye, dificultando el control de temperatura.'
    },
    {
      q: '¿Qué grupo funcional caracteriza a los ácidos carboxílicos?',
      opts: ['-OH', '-NH₂', '-COOH', '-C=O'],
      correct: 2,
      feedback: '¡Correcto! El grupo carboxilo (-COOH) combina un carbonilo (C=O) y un hidroxilo (-OH) en el mismo carbono, dándole las propiedades ácidas características (pKa ~4-5).'
    },
    {
      q: 'En síntesis asimétrica, ¿qué se usa para obtener un enantiómero preferente?',
      opts: [
        'Catalizadores de platino',
        'Catalizadores quirales o auxiliares quirales',
        'Alta temperatura y presión',
        'Disolventes polares apróticos'
      ],
      correct: 1,
      feedback: '¡Excelente! Los catalizadores quirales (como BINAP-Ru) o auxiliares quirales inducen asimetría en el entorno del carbono proquiral, favoreciendo la formación de un enantiómero sobre el otro (ee > 95%).'
    }
  ];

  let qIdx = 0, qAnswered = false;

  function renderQuiz() {
    const data = QUIZ_DATA[qIdx];
    const numEl = document.getElementById('sin-qnum');
    const qEl = document.getElementById('sin-question');
    const optsEl = document.getElementById('sin-quiz-opts');
    const fbEl = document.getElementById('sin-quiz-feedback');
    const nextBtn = document.getElementById('sin-quiz-next');
    const progEl = document.getElementById('sin-quiz-prog');

    if (!qEl) return;

    qAnswered = false;
    numEl.textContent = `Pregunta ${qIdx + 1} de ${QUIZ_DATA.length}`;
    qEl.textContent = data.q;
    fbEl.className = 'sin-quiz-feedback';
    fbEl.textContent = '';
    nextBtn.className = 'sin-btn-next';
    progEl.textContent = `${qIdx + 1} / ${QUIZ_DATA.length}`;

    optsEl.innerHTML = '';
    data.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'sin-quiz-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (qAnswered) return;
        qAnswered = true;
        document.querySelectorAll('.sin-quiz-opt').forEach((b, bi) => {
          if (bi === data.correct) b.classList.add('correct');
          else if (bi === i && i !== data.correct) b.classList.add('wrong');
        });
        fbEl.className = 'sin-quiz-feedback show ' + (i === data.correct ? 'ok' : 'fail');
        fbEl.textContent = data.feedback;
        nextBtn.className = 'sin-btn-next show';
      });
      optsEl.appendChild(btn);
    });
  }

  function initQuiz() {
    const nextBtn = document.getElementById('sin-quiz-next');
    if (!nextBtn) return;
    nextBtn.addEventListener('click', () => {
      qIdx = (qIdx + 1) % QUIZ_DATA.length;
      renderQuiz();
    });
    renderQuiz();
  }

  /* ═══════════════════════════════════════════════
   * COUNTER ANIMATIONS
   * ═══════════════════════════════════════════════ */
  function animateCounters() {
    document.querySelectorAll('.sin-stat-val[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.decimals || 0;
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = parseFloat(current.toFixed(decimals)) + suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  /* ═══════════════════════════════════════════════
   * INTERSECTION OBSERVER for fade-in
   * ═══════════════════════════════════════════════ */
  function initObserver() {
    const els = document.querySelectorAll('.sin-route-card, .sin-group-card, .sin-stage, .sin-mol-card');
    els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity 0.5s, transform 0.5s'; });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el => obs.observe(el));

    // Counters
    const statsSection = document.querySelector('.sin-stats-row');
    if (statsSection) {
      const statsObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
      }, { threshold: 0.3 });
      statsObs.observe(statsSection);
    }
  }

  /* ═══════════════════════════════════════════════
   * INIT
   * ═══════════════════════════════════════════════ */
  function init() {
    const THREE = window.THREE;
    if (!THREE) { console.error('Three.js no cargó'); return; }

    initHeroCanvas(THREE);
    initMainViewer(THREE);
    initGroupCanvas(THREE);
    initScaleCanvas(THREE);
    initQuiz();
    initObserver();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

})();
