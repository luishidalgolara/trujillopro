/* ===== VPH — PHARMALAB CHILE ===== */
/* vph.js — Three.js 3D VPH icosahedral capsid + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════
 * BUILD VPH VIRION
 * Icosahedral capsid T=7 — 72 capsomeres (pentamers)
 * Based on cryo-EM structure: PDB 1DZL (L1 VLP)
 * Naked virus — NO lipid envelope
 * ═══════════════════════════════════════════════ */
function buildVPH(THREE, scene){
  const group = new THREE.Group();

  /* ── Icosahedron geometry helper for capsomere placement ── */
  /* Generate the 72 capsomere positions of a T=7 icosahedron */
  function icosaPoints(radius){
    // Golden ratio
    const phi = (1 + Math.sqrt(5)) / 2;
    // 12 vertices of icosahedron
    const verts = [
      [-1, phi, 0],[1, phi, 0],[-1,-phi, 0],[1,-phi, 0],
      [0,-1, phi],[0, 1, phi],[0,-1,-phi],[0, 1,-phi],
      [phi, 0,-1],[phi, 0, 1],[-phi, 0,-1],[-phi, 0, 1]
    ].map(v => new THREE.Vector3(...v).normalize().multiplyScalar(radius));
    return verts;
  }

  /* Distribute N points evenly on sphere surface (Fibonacci) */
  function fibonacciSphere(n, radius){
    const pts = [];
    for(let i = 0; i < n; i++){
      const theta = Math.acos(1 - 2*(i+0.5)/n);
      const phi   = Math.PI*(1 + Math.sqrt(5))*i;
      pts.push(new THREE.Vector3(
        Math.sin(theta)*Math.cos(phi),
        Math.sin(theta)*Math.sin(phi),
        Math.cos(theta)
      ).multiplyScalar(radius));
    }
    return pts;
  }

  /* 1 ── 72 CAPSOMERES — L1 pentamers (5-fold symmetry units) */
  const capsomerePositions = fibonacciSphere(72, 2.0);

  const l1Mat = new THREE.MeshPhongMaterial({
    color: 0xa855f7, emissive: 0x7e22ce, emissiveIntensity: 0.3, shininess: 120
  });
  const l1SubMat = new THREE.MeshPhongMaterial({
    color: 0xc084fc, emissive: 0xa855f7, emissiveIntensity: 0.35, shininess: 130
  });

  capsomerePositions.forEach((pos, idx) => {
    const capGroup = new THREE.Group();
    const dir = pos.clone().normalize();

    // Central body of capsomere (dome-like)
    const bodyGeo = new THREE.SphereGeometry(0.12, 8, 8, 0, Math.PI*2, 0, Math.PI*0.6);
    const body = new THREE.Mesh(bodyGeo, l1Mat.clone());
    capGroup.add(body);

    // 5 L1 subunits arranged as pentamer ring
    for(let s = 0; s < 5; s++){
      const a = (s/5)*Math.PI*2;
      const subGeo = new THREE.SphereGeometry(0.055, 7, 7);
      const sub = new THREE.Mesh(subGeo, l1SubMat.clone());
      sub.position.set(Math.cos(a)*0.12, 0.04, Math.sin(a)*0.12);
      capGroup.add(sub);
    }

    // L2 minor protein — one per capsomere (internal, slight protrusion)
    if(idx % 6 === 0){ // ~12 L2 per capsid in reality, approximate
      const l2Geo = new THREE.CylinderGeometry(0.018, 0.028, 0.12, 5);
      const l2Mat = new THREE.MeshPhongMaterial({
        color: 0xec4899, emissive: 0xbe185d, emissiveIntensity: 0.5, shininess: 100
      });
      const l2 = new THREE.Mesh(l2Geo, l2Mat);
      l2.position.y = -0.06;
      capGroup.add(l2);
    }

    capGroup.position.copy(pos);
    capGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    group.add(capGroup);
  });

  /* 2 ── ICOSAHEDRAL WIREFRAME (show symmetry axes) */
  const icoGeo = new THREE.IcosahedronGeometry(1.98, 1);
  const icoMat = new THREE.MeshPhongMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.06
  });
  group.add(new THREE.Mesh(icoGeo, icoMat));

  /* 3 ── 5-FOLD SYMMETRY AXIS INDICATORS (subtle glow dots at vertices) */
  const icoVerts = icosaPoints(2.05);
  icoVerts.forEach(v => {
    const dotGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const dotMat = new THREE.MeshPhongMaterial({
      color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.8, shininess: 60
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(v);
    group.add(dot);
  });

  /* 4 ── dsDNA GENOME INSIDE (circular, packed with histones) */
  // Represent as a compressed, histone-wrapped circular DNA
  const dnaCurvePoints = [];
  for(let t = 0; t < Math.PI * 12; t += 0.1){
    const r = 0.55 + Math.sin(t * 0.8) * 0.25;
    const y = (t / (Math.PI * 12)) * 1.2 - 0.6;
    dnaCurvePoints.push(new THREE.Vector3(
      Math.cos(t) * r,
      y,
      Math.sin(t) * r
    ));
  }
  const dnaCurve = new THREE.CatmullRomCurve3(dnaCurvePoints);
  const dnaGeo = new THREE.TubeGeometry(dnaCurve, 200, 0.018, 5, false);
  const dnaMat = new THREE.MeshPhongMaterial({
    color: 0x34d399, emissive: 0x059669, emissiveIntensity: 0.4, shininess: 80
  });
  group.add(new THREE.Mesh(dnaGeo, dnaMat));

  // Histone beads (nucleosome-like)
  for(let b = 0; b < 30; b++){
    const t = (b / 30);
    const pt = dnaCurve.getPoint(t);
    const histGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const histMat = new THREE.MeshPhongMaterial({
      color: 0x6ee7b7, emissive: 0x34d399, emissiveIntensity: 0.35
    });
    const hist = new THREE.Mesh(histGeo, histMat);
    hist.position.copy(pt);
    group.add(hist);
  }

  scene.add(group);
  return group;
}

/* ═══════════════════════════════════════════════
 * HERO CANVAS — Floating VPH icosahedral particles
 * ═══════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('vph-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 35);

  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const l1 = new THREE.PointLight(0xa855f7, 2.5, 80); l1.position.set(10,15,20); scene.add(l1);
  const l2 = new THREE.PointLight(0xec4899, 1.5, 60); l2.position.set(-10,-10,15); scene.add(l2);

  const N = 48;
  const nodes = [];
  const colors = [0xa855f7, 0xc084fc, 0xec4899, 0x34d399, 0xf59e0b];

  for(let i = 0; i < N; i++){
    const isLarge = Math.random() < 0.14;
    const r = isLarge ? Math.random()*0.32+0.18 : Math.random()*0.12+0.04;
    const col = colors[Math.floor(Math.random()*colors.length)];

    // Use icosahedra for large particles (VPH is icosahedral)
    let geo;
    if(isLarge){
      geo = new THREE.IcosahedronGeometry(r, 1);
    } else {
      geo = new THREE.IcosahedronGeometry(r, 0);
    }
    const mat = new THREE.MeshPhongMaterial({
      color:col, emissive:col, emissiveIntensity: isLarge?0.3:0.5,
      shininess:90, transparent:true, opacity: isLarge?0.65:0.45,
      wireframe: Math.random() < 0.3
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random()-.5)*60, (Math.random()-.5)*40, (Math.random()-.5)*25);
    m.userData = {
      vx:(Math.random()-.5)*0.025,
      vy:(Math.random()-.5)*0.025,
      vz:(Math.random()-.5)*0.012,
      rx:(Math.random()-.5)*0.005,
      ry:(Math.random()-.5)*0.005
    };

    // Large icosahedra get tiny capsomere dots on surface
    if(isLarge){
      for(let c = 0; c < 8; c++){
        const phi2 = Math.acos(1-2*(c+.5)/8);
        const th2  = Math.PI*(1+Math.sqrt(5))*c;
        const capGeo = new THREE.SphereGeometry(r*0.12, 4, 4);
        const capMat = new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:0.6});
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.set(
          Math.sin(phi2)*Math.cos(th2)*(r*1.05),
          Math.sin(phi2)*Math.sin(th2)*(r*1.05),
          Math.cos(phi2)*(r*1.05)
        );
        m.add(cap);
      }
    }

    scene.add(m);
    nodes.push(m);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0xa855f7, transparent:true, opacity:0.06});
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  let frame = 0;
  function animate(){
    requestAnimationFrame(animate);
    nodes.forEach(n => {
      n.position.x += n.userData.vx;
      n.position.y += n.userData.vy;
      n.position.z += n.userData.vz;
      n.rotation.x += n.userData.rx;
      n.rotation.y += n.userData.ry;
      if(Math.abs(n.position.x) > 32) n.userData.vx *= -1;
      if(Math.abs(n.position.y) > 22) n.userData.vy *= -1;
      if(Math.abs(n.position.z) > 14) n.userData.vz *= -1;
    });

    if(++frame % 5 === 0){
      while(lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      for(let i = 0; i < nodes.length; i++) for(let j = i+1; j < nodes.length; j++){
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if(d < 8){
          const g = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position.clone(), nodes[j].position.clone()
          ]);
          const l = new THREE.Line(g, lineMat.clone());
          l.material.opacity = (1-d/8)*0.09;
          lineGroup.add(l);
        }
      }
    }
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

/* ═══════════════════════════════════════════════
 * MAIN 3D VIEWER
 * ═══════════════════════════════════════════════ */
function initViewer(THREE){
  const canvas = document.getElementById('vph-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x0d1120, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, (canvas.clientWidth||500)/(canvas.clientHeight||440), 0.1, 100);
  camera.position.set(0, 0, 8);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const d1 = new THREE.DirectionalLight(0xa855f7, 1.8); d1.position.set(5, 8, 5);  scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xec4899, 0.8); d2.position.set(-5,-4, 3); scene.add(d2);
  const d3 = new THREE.DirectionalLight(0x34d399, 0.5); d3.position.set(0, 5, 8);  scene.add(d3);

  const virusGroup = buildVPH(THREE, scene);

  // Drag rotation
  let isDragging=false, prevX=0, prevY=0;
  canvas.addEventListener('mousedown', e=>{isDragging=true; prevX=e.clientX; prevY=e.clientY});
  canvas.addEventListener('touchstart',e=>{isDragging=true; prevX=e.touches[0].clientX; prevY=e.touches[0].clientY},{passive:true});
  window.addEventListener('mouseup',  ()=>{isDragging=false});
  window.addEventListener('touchend', ()=>{isDragging=false});
  canvas.addEventListener('mousemove', e=>{
    if(!isDragging||!virusGroup) return;
    virusGroup.rotation.y += (e.clientX-prevX)*0.008;
    virusGroup.rotation.x += (e.clientY-prevY)*0.008;
    prevX=e.clientX; prevY=e.clientY;
  });
  canvas.addEventListener('touchmove', e=>{
    if(!isDragging||!virusGroup) return;
    virusGroup.rotation.y += (e.touches[0].clientX-prevX)*0.008;
    virusGroup.rotation.x += (e.touches[0].clientY-prevY)*0.008;
    prevX=e.touches[0].clientX; prevY=e.touches[0].clientY;
  },{passive:true});
  canvas.addEventListener('wheel', e=>{
    camera.position.z = Math.max(4, Math.min(18, camera.position.z+e.deltaY*0.015));
    e.preventDefault();
  },{passive:false});

  function animate(){
    requestAnimationFrame(animate);
    if(virusGroup && !isDragging){
      virusGroup.rotation.y += 0.004;
      virusGroup.rotation.x += 0.001;
    }
    renderer.render(scene, camera);
  }
  animate();

  const ro = new ResizeObserver(()=>{
    const w=canvas.clientWidth, h=canvas.clientHeight;
    if(w&&h){renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();}
  });
  ro.observe(canvas);
}

/* ═══════════════════════════════════════════════
 * NAVBAR + REVEALS + COUNTERS
 * ═══════════════════════════════════════════════ */
function initNavbar(){
  const nb = document.getElementById('vph-navbar');
  const tg = document.getElementById('vphNavToggle');
  const lk = document.getElementById('vphNavLinks');
  if(nb) window.addEventListener('scroll', ()=>nb.classList.toggle('scrolled', window.scrollY>50));
  if(tg&&lk){
    tg.addEventListener('click', ()=>lk.classList.toggle('active'));
    lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));
  }
}

function initReveal(){
  const targets = document.querySelectorAll(
    '.vph-content-card,.vph-struct-card,.vph-cancer-card,.vph-stat-card,.vph-callout'
  );
  targets.forEach((el, i)=>{
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity .6s ease ${Math.min(i*.07,.8)}s, transform .6s ease ${Math.min(i*.07,.8)}s`;
  });
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  },{threshold:.06, rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>obs.observe(el));
}

function initCounters(){
  const els = document.querySelectorAll('.vph-stat-val[data-target]');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el     = e.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix||'';
        let cur = 0;
        const step = target/45;
        const timer = setInterval(()=>{
          cur = Math.min(cur+step, target);
          el.textContent = Math.round(cur)+suffix;
          if(cur >= target) clearInterval(timer);
        }, 22);
        obs.unobserve(el);
      }
    });
  },{threshold:.3});
  els.forEach(el=>obs.observe(el));
}

function init(){
  const THREE = window.THREE;
  if(!THREE){ console.error('Three.js failed'); return; }
  initNavbar();
  initHeroCanvas(THREE);
  initViewer(THREE);
  initReveal();
  initCounters();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });
}

})();
