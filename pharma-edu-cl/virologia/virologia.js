/* ===== VIROLOGÍA - PHARMALAB CHILE ===== */
/* virologia.js — Three.js 3D virus models + interactions */

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
   * VIRUS 3D MODEL DATA
   * Each virus has a distinct morphology
   * ═══════════════════════════════════════════════ */
  const VIRUS_MODELS = {
    coronavirus: {
      name: 'SARS-CoV-2',
      family: 'Coronaviridae',
      type: 'sphere-spikes',
      bodyRadius: 1.8,
      bodyColor: 0x00d4ff,
      spikeCount: 60,
      spikeLength: 0.7,
      spikeColor: 0xff3355,
      spikeTipRadius: 0.12,
      spikeTipColor: 0xff6688
    },
    vih: {
      name: 'VIH',
      family: 'Retroviridae',
      type: 'sphere-spikes',
      bodyRadius: 1.6,
      bodyColor: 0xff3355,
      spikeCount: 40,
      spikeLength: 0.5,
      spikeColor: 0xff6688,
      spikeTipRadius: 0.08,
      spikeTipColor: 0xffaacc
    },
    influenza: {
      name: 'Influenza A',
      family: 'Orthomyxoviridae',
      type: 'sphere-spikes',
      bodyRadius: 1.5,
      bodyColor: 0xffaa00,
      spikeCount: 50,
      spikeLength: 0.55,
      spikeColor: 0xffcc44,
      spikeTipRadius: 0.06,
      spikeTipColor: 0xffee88
    },
    bacteriofago: {
      name: 'Bacteriófago T4',
      family: 'Myoviridae',
      type: 'phage',
      headColor: 0x00e87b,
      tailColor: 0x00c466,
      legColor: 0x009955
    }
  };

  /* ═══════════════════════════════════════════════
   * BUILD 3D VIRUS IN SCENE
   * ═══════════════════════════════════════════════ */
  function buildVirusModel(THREE, scene, key) {
    const data = VIRUS_MODELS[key];
    if (!data) return null;

    const group = new THREE.Group();

    if (data.type === 'sphere-spikes') {
      // ── Core sphere ──
      const bodyGeo = new THREE.SphereGeometry(data.bodyRadius, 32, 32);
      const bodyMat = new THREE.MeshPhongMaterial({
        color: data.bodyColor,
        emissive: data.bodyColor,
        emissiveIntensity: 0.15,
        shininess: 80,
        specular: 0x333333,
        transparent: true,
        opacity: 0.85
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // ── Inner membrane ──
      const innerGeo = new THREE.SphereGeometry(data.bodyRadius * 0.75, 24, 24);
      const innerMat = new THREE.MeshPhongMaterial({
        color: data.bodyColor,
        emissive: data.bodyColor,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });
      group.add(new THREE.Mesh(innerGeo, innerMat));

      // ── Spike proteins ──
      for (let i = 0; i < data.spikeCount; i++) {
        // Fibonacci sphere for even distribution
        const phi = Math.acos(1 - 2 * (i + 0.5) / data.spikeCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);

        const dir = new THREE.Vector3(x, y, z).normalize();
        const start = dir.clone().multiplyScalar(data.bodyRadius);
        const end = dir.clone().multiplyScalar(data.bodyRadius + data.spikeLength);

        // Spike stem
        const spikeGeo = new THREE.CylinderGeometry(0.04, 0.04, data.spikeLength, 6);
        const spikeMat = new THREE.MeshPhongMaterial({
          color: data.spikeColor,
          emissive: data.spikeColor,
          emissiveIntensity: 0.2,
          shininess: 60
        });
        const spike = new THREE.Mesh(spikeGeo, spikeMat);
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        spike.position.copy(mid);
        spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        group.add(spike);

        // Spike tip (bulb)
        const tipGeo = new THREE.SphereGeometry(data.spikeTipRadius, 8, 8);
        const tipMat = new THREE.MeshPhongMaterial({
          color: data.spikeTipColor,
          emissive: data.spikeTipColor,
          emissiveIntensity: 0.4,
          shininess: 100
        });
        const tip = new THREE.Mesh(tipGeo, tipMat);
        tip.position.copy(end);
        group.add(tip);
      }

    } else if (data.type === 'phage') {
      // ── Bacteriophage T4 ──
      // Icosahedral head
      const headGeo = new THREE.IcosahedronGeometry(1.3, 1);
      const headMat = new THREE.MeshPhongMaterial({
        color: data.headColor,
        emissive: data.headColor,
        emissiveIntensity: 0.2,
        shininess: 100,
        specular: 0x444444,
        flatShading: true
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.5;
      group.add(head);

      // Wireframe overlay
      const wireGeo = new THREE.IcosahedronGeometry(1.32, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: data.headColor,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      wire.position.y = 1.5;
      group.add(wire);

      // Collar
      const collarGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.25, 12);
      const collarMat = new THREE.MeshPhongMaterial({
        color: 0x334466,
        shininess: 60
      });
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.y = 0.15;
      group.add(collar);

      // Tail sheath
      const tailGeo = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 12);
      const tailMat = new THREE.MeshPhongMaterial({
        color: data.tailColor,
        emissive: data.tailColor,
        emissiveIntensity: 0.15,
        shininess: 80
      });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.y = -1.1;
      group.add(tail);

      // Inner tube
      const tubeGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.4, 8);
      const tubeMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      tube.position.y = -1.1;
      group.add(tube);

      // Baseplate
      const baseGeo = new THREE.CylinderGeometry(0.6, 0.5, 0.2, 6);
      const baseMat = new THREE.MeshPhongMaterial({
        color: 0x334466,
        shininess: 80
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = -2.25;
      group.add(base);

      // Tail fibers (6 legs)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const legGroup = new THREE.Group();

        // Upper segment
        const seg1Geo = new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6);
        const seg1Mat = new THREE.MeshPhongMaterial({
          color: data.legColor,
          emissive: data.legColor,
          emissiveIntensity: 0.2
        });
        const seg1 = new THREE.Mesh(seg1Geo, seg1Mat);
        seg1.position.set(0.5, -0.35, 0);
        seg1.rotation.z = -0.7;
        legGroup.add(seg1);

        // Lower segment (bent outward)
        const seg2Geo = new THREE.CylinderGeometry(0.025, 0.025, 1.0, 6);
        const seg2 = new THREE.Mesh(seg2Geo, seg1Mat.clone());
        seg2.position.set(1.1, -1.0, 0);
        seg2.rotation.z = 0.3;
        legGroup.add(seg2);

        legGroup.rotation.y = angle;
        legGroup.position.y = -2.2;
        group.add(legGroup);
      }
    }

    scene.add(group);
    return group;
  }

  /* ═══════════════════════════════════════════════
   * HERO CANVAS — floating virus particles
   * ═══════════════════════════════════════════════ */
  function initHeroCanvas(THREE) {
    const canvas = document.getElementById('vir-hero-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 35);

    // Lights
    const light1 = new THREE.PointLight(0x00e87b, 2.5, 80);
    light1.position.set(10, 15, 20);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xff3355, 1.5, 60);
    light2.position.set(-10, -10, 15);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // Floating virus-like nodes
    const N = 55;
    const nodes = [];
    const virusColors = [0x00e87b, 0xff3355, 0x00d4ff, 0xa855f7, 0xffaa00];

    for (let i = 0; i < N; i++) {
      const isLarge = Math.random() < 0.15;
      const r = isLarge ? Math.random() * 0.4 + 0.25 : Math.random() * 0.18 + 0.06;
      const col = virusColors[Math.floor(Math.random() * virusColors.length)];

      const geo = new THREE.SphereGeometry(r, isLarge ? 16 : 8, isLarge ? 16 : 8);
      const mat = new THREE.MeshPhongMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: isLarge ? 0.5 : 0.7,
        shininess: 100,
        transparent: true,
        opacity: isLarge ? 0.7 : 0.5
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25
      );
      m.userData = {
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03,
        vz: (Math.random() - 0.5) * 0.015
      };

      // Add spikes to larger particles
      if (isLarge) {
        const spikeCount = Math.floor(Math.random() * 8) + 6;
        for (let s = 0; s < spikeCount; s++) {
          const phi = Math.acos(1 - 2 * (s + 0.5) / spikeCount);
          const theta2 = Math.PI * (1 + Math.sqrt(5)) * s;
          const sx = Math.sin(phi) * Math.cos(theta2);
          const sy = Math.sin(phi) * Math.sin(theta2);
          const sz = Math.cos(phi);
          const dir = new THREE.Vector3(sx, sy, sz).normalize();

          const sGeo = new THREE.CylinderGeometry(0.015, 0.015, r * 0.6, 4);
          const sMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.6 });
          const spike = new THREE.Mesh(sGeo, sMat);
          spike.position.copy(dir.clone().multiplyScalar(r + r * 0.3));
          spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          m.add(spike);

          // Tip
          const tGeo = new THREE.SphereGeometry(0.03, 4, 4);
          const tip = new THREE.Mesh(tGeo, sMat.clone());
          tip.position.copy(dir.clone().multiplyScalar(r + r * 0.6));
          m.add(tip);
        }
      }

      scene.add(m);
      nodes.push(m);
    }

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00e87b, transparent: true, opacity: 0.1 });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    let frame = 0;
    function updateLines() {
      while (lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      const threshold = 9;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < threshold) {
            const geo = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position.clone(), nodes[j].position.clone()
            ]);
            const line = new THREE.Line(geo, lineMat.clone());
            line.material.opacity = (1 - d / threshold) * 0.15;
            lineGroup.add(line);
          }
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      nodes.forEach(n => {
        n.position.x += n.userData.vx;
        n.position.y += n.userData.vy;
        n.position.z += n.userData.vz;
        n.rotation.y += 0.003;
        n.rotation.x += 0.001;
        if (Math.abs(n.position.x) > 32) n.userData.vx *= -1;
        if (Math.abs(n.position.y) > 22) n.userData.vy *= -1;
        if (Math.abs(n.position.z) > 14) n.userData.vz *= -1;
      });
      if (++frame % 4 === 0) updateLines();
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
   * MAIN 3D VIRUS VIEWER
   * ═══════════════════════════════════════════════ */
  let currentVirusGroup = null;

  function initVirusViewer(THREE) {
    const canvas = document.getElementById('vir-model-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth || 500, canvas.clientHeight || 420);
    renderer.setClearColor(0x0d1120, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl1 = new THREE.DirectionalLight(0x00e87b, 1.5);
    dl1.position.set(5, 8, 5);
    scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0xff3355, 0.8);
    dl2.position.set(-5, -4, 3);
    scene.add(dl2);
    const dl3 = new THREE.DirectionalLight(0x00d4ff, 0.5);
    dl3.position.set(0, 0, 8);
    scene.add(dl3);

    function loadVirus(key) {
      if (currentVirusGroup) {
        scene.remove(currentVirusGroup);
      }
      currentVirusGroup = buildVirusModel(THREE, scene, key);
    }

    loadVirus('coronavirus');

    // Mouse drag rotation
    let isDragging = false, prevX = 0, prevY = 0;
    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    canvas.addEventListener('touchstart', e => { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });
    canvas.addEventListener('mousemove', e => {
      if (!isDragging || !currentVirusGroup) return;
      currentVirusGroup.rotation.y += (e.clientX - prevX) * 0.01;
      currentVirusGroup.rotation.x += (e.clientY - prevY) * 0.01;
      prevX = e.clientX; prevY = e.clientY;
    });
    canvas.addEventListener('touchmove', e => {
      if (!isDragging || !currentVirusGroup) return;
      currentVirusGroup.rotation.y += (e.touches[0].clientX - prevX) * 0.01;
      currentVirusGroup.rotation.x += (e.touches[0].clientY - prevY) * 0.01;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    }, { passive: true });

    // Scroll zoom
    canvas.addEventListener('wheel', e => {
      camera.position.z = Math.max(4, Math.min(20, camera.position.z + e.deltaY * 0.02));
      e.preventDefault();
    }, { passive: false });

    // Animate
    function animate() {
      requestAnimationFrame(animate);
      if (currentVirusGroup && !isDragging) {
        currentVirusGroup.rotation.y += 0.005;
        currentVirusGroup.rotation.x += 0.001;
      }
      renderer.render(scene, camera);
    }
    animate();

    // Model switch buttons
    document.querySelectorAll('.vir-model-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.vir-model-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadVirus(btn.dataset.virus);

        // Update info
        const data = VIRUS_MODELS[btn.dataset.virus];
        if (data) {
          const nameEl = document.getElementById('vir-model-name');
          const familyEl = document.getElementById('vir-model-family');
          const labelEl = document.getElementById('vir-model-label');
          if (nameEl) nameEl.textContent = data.name;
          if (familyEl) familyEl.textContent = data.family;
          if (labelEl) labelEl.textContent = data.name + ' — ' + data.family;
        }
      });
    });

    // Resize
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
   * NAVBAR SCROLL EFFECT
   * ═══════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = document.getElementById('vir-navbar');
    const toggle = document.getElementById('virNavToggle');
    const links = document.getElementById('virNavLinks');

    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      });
    }

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('active');
      });
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('active'));
      });
    }
  }

  /* ═══════════════════════════════════════════════
   * SCROLL REVEAL (IntersectionObserver)
   * ═══════════════════════════════════════════════ */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.vir-card, .vir-class-card, .vir-info-card, .vir-stat-card'
    );

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => obs.observe(el));
  }

  /* ═══════════════════════════════════════════════
   * COUNTER ANIMATION
   * ═══════════════════════════════════════════════ */
  function initCounters() {
    const els = document.querySelectorAll('.vir-stat-val[data-target]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.round(current) + suffix;
            if (current >= target) clearInterval(timer);
          }, 20);
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
    initVirusViewer(THREE);
    initScrollReveal();
    initCounters();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

})();
