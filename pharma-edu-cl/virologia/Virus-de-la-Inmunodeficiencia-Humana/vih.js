/* ===== VIH — PHARMALAB CHILE ===== */
/* vih.js — Three.js 3D HIV virion model + interactions */

(function () {
  'use strict';

  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', init);

  /* ═══════════════════════════════════════════════
   * HIV VIRION 3D MODEL
   * Anatomically based on cryo-EM reconstructions
   * ═══════════════════════════════════════════════ */
  function buildHIVVirion(THREE, scene) {
    const group = new THREE.Group();

    /* ── 1. Lipid bilayer envelope (outer sphere) ── */
    const envelopeGeo = new THREE.SphereGeometry(2.2, 48, 48);
    const envelopeMat = new THREE.MeshPhongMaterial({
      color: 0x8b2252,
      emissive: 0x3a0a20,
      emissiveIntensity: 0.3,
      shininess: 60,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const envelope = new THREE.Mesh(envelopeGeo, envelopeMat);
    group.add(envelope);

    /* ── 2. Matrix protein layer (MA, p17) ── */
    const matrixGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const matrixMat = new THREE.MeshPhongMaterial({
      color: 0xcc4477,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    group.add(new THREE.Mesh(matrixGeo, matrixMat));

    /* ── 3. Conical capsid (CA, p24) — signature HIV shape ── */
    // Upper cone
    const coneTopGeo = new THREE.ConeGeometry(0.65, 1.8, 16);
    const capsidMat = new THREE.MeshPhongMaterial({
      color: 0xff6644,
      emissive: 0xff3300,
      emissiveIntensity: 0.25,
      shininess: 100,
      specular: 0x664422,
      transparent: true,
      opacity: 0.8
    });
    const coneTop = new THREE.Mesh(coneTopGeo, capsidMat);
    coneTop.position.set(0, 0.4, 0);
    coneTop.rotation.x = Math.PI;
    group.add(coneTop);

    // Lower truncated base
    const coneBottomGeo = new THREE.CylinderGeometry(0.65, 0.3, 0.6, 16);
    const coneBottom = new THREE.Mesh(coneBottomGeo, capsidMat.clone());
    coneBottom.position.set(0, -0.9, 0);
    group.add(coneBottom);

    // Capsid wireframe overlay
    const capsWireGeo = new THREE.ConeGeometry(0.68, 1.85, 16);
    const capsWireMat = new THREE.MeshBasicMaterial({
      color: 0xff8855,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const capsWire = new THREE.Mesh(capsWireGeo, capsWireMat);
    capsWire.position.set(0, 0.4, 0);
    capsWire.rotation.x = Math.PI;
    group.add(capsWire);

    /* ── 4. RNA genome (2 single strands) ── */
    const rnaCurve1Points = [];
    const rnaCurve2Points = [];
    for (let t = 0; t < Math.PI * 4; t += 0.15) {
      const r = 0.2;
      rnaCurve1Points.push(new THREE.Vector3(
        Math.cos(t) * r,
        t * 0.12 - 0.8,
        Math.sin(t) * r
      ));
      rnaCurve2Points.push(new THREE.Vector3(
        Math.cos(t + Math.PI) * r,
        t * 0.12 - 0.8,
        Math.sin(t + Math.PI) * r
      ));
    }

    const rnaCurve1 = new THREE.CatmullRomCurve3(rnaCurve1Points);
    const rnaCurve2 = new THREE.CatmullRomCurve3(rnaCurve2Points);

    const rnaGeo1 = new THREE.TubeGeometry(rnaCurve1, 60, 0.03, 6, false);
    const rnaGeo2 = new THREE.TubeGeometry(rnaCurve2, 60, 0.03, 6, false);
    const rnaMat = new THREE.MeshPhongMaterial({
      color: 0x00ccff,
      emissive: 0x0066ff,
      emissiveIntensity: 0.5,
      shininess: 100
    });

    group.add(new THREE.Mesh(rnaGeo1, rnaMat));
    group.add(new THREE.Mesh(rnaGeo2, rnaMat.clone()));

    /* ── 5. Reverse Transcriptase (RT) inside capsid ── */
    const rtGeo = new THREE.SphereGeometry(0.15, 10, 10);
    const rtMat = new THREE.MeshPhongMaterial({
      color: 0xffcc00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.4,
      shininess: 100
    });
    const rt1 = new THREE.Mesh(rtGeo, rtMat);
    rt1.position.set(0.15, -0.3, 0.1);
    group.add(rt1);
    const rt2 = new THREE.Mesh(rtGeo.clone(), rtMat.clone());
    rt2.position.set(-0.1, 0.1, -0.15);
    group.add(rt2);

    /* ── 6. Integrase molecules ── */
    const intGeo = new THREE.OctahedronGeometry(0.1, 0);
    const intMat = new THREE.MeshPhongMaterial({
      color: 0x22cc88,
      emissive: 0x11aa66,
      emissiveIntensity: 0.4,
      shininess: 80
    });
    for (let i = 0; i < 3; i++) {
      const ig = new THREE.Mesh(intGeo, intMat.clone());
      ig.position.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.6 - 0.2,
        (Math.random() - 0.5) * 0.4
      );
      group.add(ig);
    }

    /* ── 7. gp120/gp41 spike glycoproteins ── */
    const spikeCount = 14; // HIV has ~7-14 trimeric spikes
    for (let i = 0; i < spikeCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / spikeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      const dir = new THREE.Vector3(x, y, z).normalize();

      const spikeGroup = new THREE.Group();

      // gp41 transmembrane stalk (3 stalks per trimer)
      for (let s = 0; s < 3; s++) {
        const angle = (s / 3) * Math.PI * 2;
        const offset = 0.06;
        const stalkGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6);
        const stalkMat = new THREE.MeshPhongMaterial({
          color: 0xff4477,
          emissive: 0xff2255,
          emissiveIntensity: 0.3,
          shininess: 80
        });
        const stalk = new THREE.Mesh(stalkGeo, stalkMat);
        stalk.position.set(Math.cos(angle) * offset, 0.25, Math.sin(angle) * offset);
        spikeGroup.add(stalk);
      }

      // gp120 globular head (trimer mushroom)
      const headGeo = new THREE.SphereGeometry(0.13, 10, 10);
      const headMat = new THREE.MeshPhongMaterial({
        color: 0xff6699,
        emissive: 0xff3366,
        emissiveIntensity: 0.35,
        shininess: 100,
        specular: 0x444444
      });
      for (let s = 0; s < 3; s++) {
        const angle = (s / 3) * Math.PI * 2;
        const head = new THREE.Mesh(headGeo, headMat.clone());
        head.position.set(Math.cos(angle) * 0.1, 0.55, Math.sin(angle) * 0.1);
        spikeGroup.add(head);
      }

      // Position spike on envelope surface
      const surfacePos = dir.clone().multiplyScalar(2.2);
      spikeGroup.position.copy(surfacePos);
      spikeGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      group.add(spikeGroup);
    }

    scene.add(group);
    return group;
  }

  /* ═══════════════════════════════════════════════
   * HERO CANVAS — floating HIV particles
   * ═══════════════════════════════════════════════ */
  function initHeroCanvas(THREE) {
    const canvas = document.getElementById('vih-hero-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 35);

    const light1 = new THREE.PointLight(0xff3355, 2.5, 80);
    light1.position.set(10, 15, 20);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xa855f7, 1.5, 60);
    light2.position.set(-10, -10, 15);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // Floating particles
    const N = 50;
    const nodes = [];
    const colors = [0xff3355, 0xcc2244, 0xa855f7, 0xff6688, 0x00d4ff];

    for (let i = 0; i < N; i++) {
      const isLarge = Math.random() < 0.12;
      const r = isLarge ? Math.random() * 0.35 + 0.2 : Math.random() * 0.15 + 0.05;
      const col = colors[Math.floor(Math.random() * colors.length)];

      const geo = new THREE.SphereGeometry(r, isLarge ? 14 : 8, isLarge ? 14 : 8);
      const mat = new THREE.MeshPhongMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: isLarge ? 0.4 : 0.6,
        shininess: 80,
        transparent: true,
        opacity: isLarge ? 0.6 : 0.4
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25
      );
      m.userData = {
        vx: (Math.random() - 0.5) * 0.025,
        vy: (Math.random() - 0.5) * 0.025,
        vz: (Math.random() - 0.5) * 0.012
      };

      // Mini spikes on larger particles
      if (isLarge) {
        for (let s = 0; s < 8; s++) {
          const phi = Math.acos(1 - 2 * (s + 0.5) / 8);
          const theta = Math.PI * (1 + Math.sqrt(5)) * s;
          const dir = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
          ).normalize();
          const sGeo = new THREE.CylinderGeometry(0.012, 0.012, r * 0.5, 4);
          const sMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 });
          const spike = new THREE.Mesh(sGeo, sMat);
          spike.position.copy(dir.clone().multiplyScalar(r + r * 0.25));
          spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          m.add(spike);
        }
      }

      scene.add(m);
      nodes.push(m);
    }

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.08 });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      nodes.forEach(n => {
        n.position.x += n.userData.vx;
        n.position.y += n.userData.vy;
        n.position.z += n.userData.vz;
        n.rotation.y += 0.002;
        if (Math.abs(n.position.x) > 32) n.userData.vx *= -1;
        if (Math.abs(n.position.y) > 22) n.userData.vy *= -1;
        if (Math.abs(n.position.z) > 14) n.userData.vz *= -1;
      });
      if (++frame % 5 === 0) {
        while (lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = nodes[i].position.distanceTo(nodes[j].position);
            if (d < 8) {
              const g = new THREE.BufferGeometry().setFromPoints([
                nodes[i].position.clone(), nodes[j].position.clone()
              ]);
              const l = new THREE.Line(g, lineMat.clone());
              l.material.opacity = (1 - d / 8) * 0.12;
              lineGroup.add(l);
            }
          }
        }
      }
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
   * MAIN 3D HIV VIEWER
   * ═══════════════════════════════════════════════ */
  function initVIHViewer(THREE) {
    const canvas = document.getElementById('vih-model-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth || 500, canvas.clientHeight || 440);
    renderer.setClearColor(0x0d1120, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dl1 = new THREE.DirectionalLight(0xff3355, 1.5);
    dl1.position.set(5, 8, 5);
    scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0xa855f7, 0.8);
    dl2.position.set(-5, -4, 3);
    scene.add(dl2);
    const dl3 = new THREE.DirectionalLight(0x00d4ff, 0.5);
    dl3.position.set(0, 5, 8);
    scene.add(dl3);

    const virusGroup = buildHIVVirion(THREE, scene);

    // Mouse drag
    let isDragging = false, prevX = 0, prevY = 0;
    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    canvas.addEventListener('touchstart', e => { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });
    canvas.addEventListener('mousemove', e => {
      if (!isDragging || !virusGroup) return;
      virusGroup.rotation.y += (e.clientX - prevX) * 0.008;
      virusGroup.rotation.x += (e.clientY - prevY) * 0.008;
      prevX = e.clientX; prevY = e.clientY;
    });
    canvas.addEventListener('touchmove', e => {
      if (!isDragging || !virusGroup) return;
      virusGroup.rotation.y += (e.touches[0].clientX - prevX) * 0.008;
      virusGroup.rotation.x += (e.touches[0].clientY - prevY) * 0.008;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    }, { passive: true });

    canvas.addEventListener('wheel', e => {
      camera.position.z = Math.max(4, Math.min(18, camera.position.z + e.deltaY * 0.015));
      e.preventDefault();
    }, { passive: false });

    function animate() {
      requestAnimationFrame(animate);
      if (virusGroup && !isDragging) {
        virusGroup.rotation.y += 0.004;
        virusGroup.rotation.x += 0.001;
      }
      renderer.render(scene, camera);
    }
    animate();

    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w && h) {
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    ro.observe(canvas);
  }

  /* ═══════════════════════════════════════════════
   * NAVBAR + SCROLL + REVEALS
   * ═══════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = document.getElementById('vih-navbar');
    const toggle = document.getElementById('vihNavToggle');
    const links = document.getElementById('vihNavLinks');

    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('active'));
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('active'));
      });
    }
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.vih-content-card, .vih-struct-card, .vih-cycle-step, .vih-stat-card, .vih-callout'
    );
    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease ${Math.min(i * 0.07, 0.8)}s, transform 0.6s ease ${Math.min(i * 0.07, 0.8)}s`;
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(el => obs.observe(el));
  }

  function initCounters() {
    const els = document.querySelectorAll('.vih-stat-val[data-target]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = target / 45;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.round(current) + suffix;
            if (current >= target) clearInterval(timer);
          }, 22);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    els.forEach(el => obs.observe(el));
  }

  /* ═══════════════════════════════════════════════
   * INIT
   * ═══════════════════════════════════════════════ */
  function init() {
    const THREE = window.THREE;
    if (!THREE) { console.error('Three.js failed to load'); return; }

    initNavbar();
    initHeroCanvas(THREE);
    initVIHViewer(THREE);
    initScrollReveal();
    initCounters();

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

})();
