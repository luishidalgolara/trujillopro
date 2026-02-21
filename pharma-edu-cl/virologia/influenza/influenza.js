/* ===== INFLUENZA A — PHARMALAB CHILE ===== */
/* influenza.js — Three.js 3D Influenza A virion + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════
 * BUILD INFLUENZA A VIRION
 * Based on cryo-EM/cryo-ET structures
 * PDB: 1RU7 (HA H3), 2HT8 (NA N1), 2KQT (M2)
 * ═══════════════════════════════════════════════ */
function buildInfluenza(THREE,scene){
  const group = new THREE.Group();

  /* 1 ── LIPID ENVELOPE (slightly pleomorphic) */
  const envGeo = new THREE.SphereGeometry(2.0, 52, 52);
  const envMat = new THREE.MeshPhongMaterial({
    color: 0x1a2a18, emissive: 0x0d1a0c, emissiveIntensity: 0.3,
    shininess: 55, transparent: true, opacity: 0.30, side: THREE.DoubleSide
  });
  group.add(new THREE.Mesh(envGeo, envMat));

  /* 2 ── M1 MATRIX LAYER (wireframe, inner) */
  const m1Geo = new THREE.SphereGeometry(1.85, 30, 30);
  const m1Mat = new THREE.MeshPhongMaterial({
    color: 0x34d399, wireframe: true, transparent: true, opacity: 0.07
  });
  group.add(new THREE.Mesh(m1Geo, m1Mat));

  /* ── GOLDEN RATIO POINT DISTRIBUTION HELPER ── */
  function goldenPoints(n){ return Array.from({length:n},(_,i)=>{
    const phi=Math.acos(1-2*(i+.5)/n),theta=Math.PI*(1+Math.sqrt(5))*i;
    return new THREE.Vector3(Math.sin(phi)*Math.cos(theta),Math.sin(phi)*Math.sin(theta),Math.cos(phi)).normalize();
  });}

  /* 3 ── HEMAGGLUTININ (HA) — trimer mushroom heads — 350-500 per virion
     Simplified to 60 trimers for performance */
  const haDirs = goldenPoints(60);
  const haMat = new THREE.MeshPhongMaterial({
    color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.3, shininess: 100
  });
  const haHeadMat = new THREE.MeshPhongMaterial({
    color: 0xfcd34d, emissive: 0xf59e0b, emissiveIntensity: 0.35, shininess: 120
  });

  haDirs.forEach(dir => {
    const haGroup = new THREE.Group();

    // HA2 stalk (trimeric coiled-coil)
    const stalkGeo = new THREE.CylinderGeometry(0.028, 0.038, 0.7, 6);
    const stalk = new THREE.Mesh(stalkGeo, haMat.clone());
    stalk.position.y = 0.35;
    haGroup.add(stalk);

    // HA1 globular heads — 3 lobes (trimeric)
    for(let l = 0; l < 3; l++){
      const a = (l/3)*Math.PI*2;
      const headGeo = new THREE.SphereGeometry(0.09, 8, 8);
      const head = new THREE.Mesh(headGeo, haHeadMat.clone());
      head.position.set(Math.cos(a)*0.09, 0.76, Math.sin(a)*0.09);
      haGroup.add(head);
    }
    // Central trimeric crown
    const crownGeo = new THREE.SphereGeometry(0.055, 6, 6);
    const crown = new THREE.Mesh(crownGeo, haHeadMat.clone());
    crown.position.y = 0.83;
    haGroup.add(crown);

    haGroup.position.copy(dir.clone().multiplyScalar(2.0));
    haGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    group.add(haGroup);
  });

  /* 4 ── NEURAMINIDASE (NA) — mushroom tetramer — fewer than HA (~1:4 ratio) */
  const naDirs = goldenPoints(15);
  const naMat = new THREE.MeshPhongMaterial({
    color: 0x34d399, emissive: 0x059669, emissiveIntensity: 0.4, shininess: 100
  });
  const naHeadMat = new THREE.MeshPhongMaterial({
    color: 0x6ee7b7, emissive: 0x34d399, emissiveIntensity: 0.35, shininess: 110
  });

  naDirs.forEach((dir,i) => {
    // Offset with slight angular displacement to avoid HA overlap
    const offset = new THREE.Vector3(
      Math.sin(i*2.39996)*0.15,
      Math.cos(i*2.39996)*0.15,
      Math.sin(i*1.30)*0.1
    );
    const adjustedDir = dir.clone().add(offset).normalize();

    const naGroup = new THREE.Group();

    // NA stalk (longer and thinner than HA)
    const naStalkGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.9, 5);
    const naStalk = new THREE.Mesh(naStalkGeo, naMat.clone());
    naStalk.position.y = 0.45;
    naGroup.add(naStalk);

    // NA head — box-like tetramer (4 subunits arranged as square)
    for(let s = 0; s < 4; s++){
      const a = (s/4)*Math.PI*2 + Math.PI/4;
      const subGeo = new THREE.BoxGeometry(0.12, 0.09, 0.12);
      const sub = new THREE.Mesh(subGeo, naHeadMat.clone());
      sub.position.set(Math.cos(a)*0.1, 0.92, Math.sin(a)*0.1);
      sub.rotation.y = a;
      naGroup.add(sub);
    }

    naGroup.position.copy(adjustedDir.clone().multiplyScalar(2.0));
    naGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), adjustedDir);
    group.add(naGroup);
  });

  /* 5 ── M2 ION CHANNELS — tetrameric, very few (~16-20 per virion) */
  const m2Dirs = goldenPoints(12);
  const m2Mat = new THREE.MeshPhongMaterial({
    color: 0x818cf8, emissive: 0x4f46e5, emissiveIntensity: 0.5, shininess: 80
  });

  m2Dirs.forEach(dir => {
    const m2Group = new THREE.Group();

    // 4 helices forming the tetrameric bundle
    for(let h = 0; h < 4; h++){
      const a = (h/4)*Math.PI*2;
      const helixGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 4);
      const helix = new THREE.Mesh(helixGeo, m2Mat.clone());
      helix.position.set(Math.cos(a)*0.035, 0.2, Math.sin(a)*0.035);
      m2Group.add(helix);
    }
    // Central pore indicator (darker)
    const poreGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.42, 6);
    const poreMat = new THREE.MeshPhongMaterial({color:0x312e81,transparent:true,opacity:0.7});
    const pore = new THREE.Mesh(poreGeo, poreMat);
    pore.position.y = 0.2;
    m2Group.add(pore);

    m2Group.position.copy(dir.clone().multiplyScalar(2.02));
    m2Group.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    group.add(m2Group);
  });

  /* 6 ── 8 RNA SEGMENTS (RNPs) — helical ribonucleoprotein complexes inside */
  const segmentColors = [
    0xf59e0b, // PB2
    0xfcd34d, // PB1
    0xf87171, // PA
    0x34d399, // HA
    0x22d3ee, // NP
    0x818cf8, // NA
    0xa78bfa, // M
    0x6ee7b7  // NS
  ];

  const segmentData = [
    {len:10, radius:0.45},
    {len:10, radius:0.40},
    {len:9,  radius:0.35},
    {len:9,  radius:0.42},
    {len:8,  radius:0.30},
    {len:8,  radius:0.38},
    {len:7,  radius:0.28},
    {len:6,  radius:0.25}
  ];

  segmentData.forEach((seg, idx) => {
    const angle = (idx/8)*Math.PI*2;
    const offsetX = Math.cos(angle)*0.5;
    const offsetZ = Math.sin(angle)*0.5;
    const offsetY = (idx%3-1)*0.35;

    const points = [];
    for(let t = 0; t < Math.PI*4; t += 0.18){
      const r = seg.radius * (0.8 + Math.sin(t*1.5)*0.2);
      points.push(new THREE.Vector3(
        offsetX + Math.cos(t)*r,
        offsetY + t*0.07 - 0.9,
        offsetZ + Math.sin(t)*r
      ));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const rnpGeo = new THREE.TubeGeometry(curve, 80, 0.025, 5, false);
    const rnpMat = new THREE.MeshPhongMaterial({
      color: segmentColors[idx],
      emissive: segmentColors[idx],
      emissiveIntensity: 0.35,
      shininess: 70
    });
    group.add(new THREE.Mesh(rnpGeo, rnpMat));

    // NP nucleoprotein beads along the helix
    for(let b = 0; b < seg.len; b++){
      const t = (b/seg.len);
      const pos = curve.getPoint(t);
      const beadGeo = new THREE.SphereGeometry(0.04, 5, 5);
      const beadMat = new THREE.MeshPhongMaterial({
        color: segmentColors[idx], emissive: segmentColors[idx], emissiveIntensity:0.4
      });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.copy(pos);
      group.add(bead);
    }
  });

  scene.add(group);
  return group;
}

/* ═══════════════════════════════════════════════
 * HERO CANVAS — Floating Influenza particles
 * ═══════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('flu-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0,0,35);

  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const l1 = new THREE.PointLight(0xf59e0b, 2.5, 80); l1.position.set(10,15,20); scene.add(l1);
  const l2 = new THREE.PointLight(0x34d399, 1.5, 60); l2.position.set(-10,-10,15); scene.add(l2);

  const N = 50;
  const nodes = [];
  const colors = [0xf59e0b, 0xfcd34d, 0x34d399, 0x818cf8, 0xf87171];

  for(let i = 0; i < N; i++){
    const isLarge = Math.random() < 0.14;
    const r = isLarge ? Math.random()*0.35+0.18 : Math.random()*0.12+0.04;
    const col = colors[Math.floor(Math.random()*colors.length)];

    const geo = new THREE.SphereGeometry(r, isLarge?14:8, isLarge?14:8);
    const mat = new THREE.MeshPhongMaterial({
      color:col, emissive:col, emissiveIntensity: isLarge?0.4:0.6,
      shininess:80, transparent:true, opacity: isLarge?0.6:0.4
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random()-.5)*60,(Math.random()-.5)*40,(Math.random()-.5)*25);
    m.userData = {
      vx:(Math.random()-.5)*.025,
      vy:(Math.random()-.5)*.025,
      vz:(Math.random()-.5)*.012
    };

    // Large particles get HA-like spikes
    if(isLarge){
      for(let s = 0; s < 12; s++){
        const phi2 = Math.acos(1-2*(s+.5)/12);
        const th2 = Math.PI*(1+Math.sqrt(5))*s;
        const dir = new THREE.Vector3(
          Math.sin(phi2)*Math.cos(th2), Math.sin(phi2)*Math.sin(th2), Math.cos(phi2)
        ).normalize();

        // spike stalk
        const sG = new THREE.CylinderGeometry(0.01, 0.01, r*0.55, 4);
        const sM = new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:0.5});
        const sp = new THREE.Mesh(sG, sM);
        sp.position.copy(dir.clone().multiplyScalar(r + r*0.27));
        sp.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
        m.add(sp);

        // trimer head (3 tiny spheres)
        for(let lobe=0;lobe<3;lobe++){
          const la=(lobe/3)*Math.PI*2;
          const tG = new THREE.SphereGeometry(0.025, 4, 4);
          const tip = new THREE.Mesh(tG, sM.clone());
          const headPos = dir.clone().multiplyScalar(r + r*0.6);
          headPos.x += Math.cos(la)*0.03;
          headPos.z += Math.sin(la)*0.03;
          tip.position.copy(headPos);
          m.add(tip);
        }
      }
    }

    scene.add(m);
    nodes.push(m);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0xf59e0b, transparent:true, opacity:0.07});
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  let frame = 0;
  function animate(){
    requestAnimationFrame(animate);
    nodes.forEach(n=>{
      n.position.x += n.userData.vx;
      n.position.y += n.userData.vy;
      n.position.z += n.userData.vz;
      n.rotation.y += 0.003;
      if(Math.abs(n.position.x)>32) n.userData.vx *= -1;
      if(Math.abs(n.position.y)>22) n.userData.vy *= -1;
      if(Math.abs(n.position.z)>14) n.userData.vz *= -1;
    });

    if(++frame % 5 === 0){
      while(lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if(d < 8){
          const g = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position.clone(), nodes[j].position.clone()
          ]);
          const l = new THREE.Line(g, lineMat.clone());
          l.material.opacity = (1-d/8)*0.1;
          lineGroup.add(l);
        }
      }
    }
    renderer.render(scene,camera);
  }
  animate();

  window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

/* ═══════════════════════════════════════════════
 * MAIN 3D VIEWER
 * ═══════════════════════════════════════════════ */
function initViewer(THREE){
  const canvas = document.getElementById('flu-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x0d1120, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, (canvas.clientWidth||500)/(canvas.clientHeight||440), 0.1, 100);
  camera.position.set(0,0,8);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const d1 = new THREE.DirectionalLight(0xf59e0b, 1.8); d1.position.set(5,8,5); scene.add(d1);
  const d2 = new THREE.DirectionalLight(0x34d399, 0.8); d2.position.set(-5,-4,3); scene.add(d2);
  const d3 = new THREE.DirectionalLight(0x818cf8, 0.5); d3.position.set(0,5,8); scene.add(d3);

  const virusGroup = buildInfluenza(THREE, scene);

  // Drag rotation
  let isDragging=false, prevX=0, prevY=0;
  canvas.addEventListener('mousedown',e=>{isDragging=true;prevX=e.clientX;prevY=e.clientY});
  canvas.addEventListener('touchstart',e=>{isDragging=true;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY},{passive:true});
  window.addEventListener('mouseup',()=>{isDragging=false});
  window.addEventListener('touchend',()=>{isDragging=false});
  canvas.addEventListener('mousemove',e=>{
    if(!isDragging||!virusGroup) return;
    virusGroup.rotation.y += (e.clientX-prevX)*0.008;
    virusGroup.rotation.x += (e.clientY-prevY)*0.008;
    prevX=e.clientX; prevY=e.clientY;
  });
  canvas.addEventListener('touchmove',e=>{
    if(!isDragging||!virusGroup) return;
    virusGroup.rotation.y += (e.touches[0].clientX-prevX)*0.008;
    virusGroup.rotation.x += (e.touches[0].clientY-prevY)*0.008;
    prevX=e.touches[0].clientX; prevY=e.touches[0].clientY;
  },{passive:true});
  canvas.addEventListener('wheel',e=>{
    camera.position.z = Math.max(4, Math.min(18, camera.position.z + e.deltaY*0.015));
    e.preventDefault();
  },{passive:false});

  function animate(){
    requestAnimationFrame(animate);
    if(virusGroup && !isDragging){
      virusGroup.rotation.y += 0.004;
      virusGroup.rotation.x += 0.001;
    }
    renderer.render(scene,camera);
  }
  animate();

  const ro = new ResizeObserver(()=>{
    const w=canvas.clientWidth, h=canvas.clientHeight;
    if(w&&h){renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
  });
  ro.observe(canvas);
}

/* ═══════════════════════════════════════════════
 * NAVBAR + REVEALS + COUNTERS
 * ═══════════════════════════════════════════════ */
function initNavbar(){
  const nb  = document.getElementById('flu-navbar');
  const tg  = document.getElementById('fluNavToggle');
  const lk  = document.getElementById('fluNavLinks');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled', window.scrollY>50));
  if(tg&&lk){
    tg.addEventListener('click',()=>lk.classList.toggle('active'));
    lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));
  }
}

function initReveal(){
  const targets = document.querySelectorAll(
    '.flu-content-card,.flu-struct-card,.flu-variant-card,.flu-stat-card,.flu-callout'
  );
  targets.forEach((el,i)=>{
    el.style.opacity='0';
    el.style.transform='translateY(24px)';
    el.style.transition=`opacity .6s ease ${Math.min(i*.07,.8)}s, transform .6s ease ${Math.min(i*.07,.8)}s`;
  });
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        obs.unobserve(e.target);
      }
    });
  },{threshold:.06, rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>obs.observe(el));
}

function initCounters(){
  const els = document.querySelectorAll('.flu-stat-val[data-target]');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target;
        const target=parseFloat(el.dataset.target);
        const suffix=el.dataset.suffix||'';
        let cur=0;
        const step=target/45;
        const timer=setInterval(()=>{
          cur=Math.min(cur+step,target);
          el.textContent=Math.round(cur)+suffix;
          if(cur>=target) clearInterval(timer);
        },22);
        obs.unobserve(el);
      }
    });
  },{threshold:.3});
  els.forEach(el=>obs.observe(el));
}

function init(){
  const THREE = window.THREE;
  if(!THREE){ console.error('Three.js failed to load'); return; }
  initNavbar();
  initHeroCanvas(THREE);
  initViewer(THREE);
  initReveal();
  initCounters();
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });
}

})();
