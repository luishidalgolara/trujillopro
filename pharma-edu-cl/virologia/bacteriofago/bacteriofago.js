/* ===== BACTERIÓFAGO T4 — PHARMALAB CHILE ===== */
/* bacteriofago.js — Three.js 3D T4 phage (prolate head + contractile tail + baseplate + LTF) + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════════════
 * BACTERIOPHAGE T4 3D MODEL
 * Prolate icosahedral head (T=13, ~115×85 nm)
 * Contractile tail sheath + inner tube (~113 nm)
 * Hexagonal baseplate + needle (gp5-gp27)
 * 6 Long tail fibers (LTF, ~145 nm each)
 * 6 Short tail fibers (STF)
 * ═══════════════════════════════════════════════════════ */
function buildT4(THREE, scene){
  const group = new THREE.Group();

  const M = (c,e,ei,s,tr,op,w) => new THREE.MeshPhongMaterial({
    color:c, emissive:e, emissiveIntensity:ei||0, shininess:s||80,
    transparent:!!tr, opacity:op||1, wireframe:!!w, side:THREE.DoubleSide
  });

  /* ====== 1. PROLATE ICOSAHEDRAL HEAD (gp23*) ====== */
  // Elongated capsid ~115 x 85 nm → scale 1.35:1
  const headGroup = new THREE.Group();

  // Main capsid body — elongated icosahedron (scaled sphere for prolate shape)
  const headGeo = new THREE.IcosahedronGeometry(1.4, 3);
  // Scale to prolate shape
  headGeo.scale(0.85, 1.35, 0.85);
  const headMesh = new THREE.Mesh(headGeo, M(0x0a4a3a, 0x10b981, 0.15, 40, true, 0.65));
  headGroup.add(headMesh);

  // Wireframe overlay (icosahedral facets visible)
  const headWire = new THREE.Mesh(
    headGeo.clone(),
    M(0x10b981, 0x10b981, 0.08, 80, true, 0.18, true)
  );
  headGroup.add(headWire);

  // Glow shell
  const glowGeo = new THREE.SphereGeometry(1.5, 32, 32);
  glowGeo.scale(0.87, 1.38, 0.87);
  headGroup.add(new THREE.Mesh(glowGeo, M(0x10b981, 0x10b981, 0.04, 10, true, 0.05)));

  // Hoc proteins (decorative bumps — 155 copies, shown as subset)
  function fibPoints(n){
    return Array.from({length:n},(_,i)=>{
      const phi = Math.acos(1-2*(i+.5)/n);
      const th  = Math.PI*(1+Math.sqrt(5))*i;
      return new THREE.Vector3(
        Math.sin(phi)*Math.cos(th),
        Math.sin(phi)*Math.sin(th),
        Math.cos(phi)
      ).normalize();
    });
  }

  const hocDirs = fibPoints(80);
  hocDirs.forEach(dir => {
    const hoc = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 4, 4),
      M(0x34d399, 0x34d399, 0.4, 60, true, 0.5)
    );
    const scaled = dir.clone();
    scaled.x *= 0.86;
    scaled.y *= 1.36;
    scaled.z *= 0.86;
    hoc.position.copy(scaled.multiplyScalar(1.42));
    headGroup.add(hoc);
  });

  // Soc proteins (small outer capsid — smaller dots)
  const socDirs = fibPoints(120);
  socDirs.forEach(dir => {
    const soc = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 3, 3),
      M(0xa3e635, 0xa3e635, 0.35, 50, true, 0.4)
    );
    const scaled = dir.clone();
    scaled.x *= 0.86;
    scaled.y *= 1.36;
    scaled.z *= 0.86;
    soc.position.copy(scaled.multiplyScalar(1.44));
    headGroup.add(soc);
  });

  // === DNA inside head (coiled dsDNA ~169 kb at ~500 mg/mL) ===
  const dnaColors = [
    [0x10b981, 0x065f46],
    [0x34d399, 0x10b981],
    [0xa3e635, 0x65a30d],
    [0x22d3ee, 0x0891b2],
  ];
  for(let ring=0; ring<6; ring++){
    const rr = 0.12 + ring*0.12;
    const turns = 3 + ring*0.7;
    const [rcol, remit] = dnaColors[ring % dnaColors.length];
    const rpts = [];
    for(let t=0; t<=1; t+=0.016){
      const a = t*Math.PI*2*turns;
      const tilt = (ring-2.5)*0.12;
      rpts.push(new THREE.Vector3(
        Math.cos(a)*rr + Math.sin(t*Math.PI*4)*0.04,
        tilt + Math.sin(a*1.3)*0.06,
        Math.sin(a)*rr + Math.cos(t*Math.PI*3)*0.03
      ));
    }
    const rc = new THREE.CatmullRomCurve3(rpts, true);
    headGroup.add(new THREE.Mesh(
      new THREE.TubeGeometry(rc, 70, 0.012, 4, true),
      M(rcol, remit, 0.3, 80, true, 0.85)
    ));
  }

  headGroup.position.y = 2.8;
  group.add(headGroup);

  /* ====== 2. NECK / CONNECTOR (gp13, gp14, gp15, gp20 — portal vertex) ====== */
  const neckGroup = new THREE.Group();

  // Portal vertex ring (gp20 dodecamer)
  const portalGeo = new THREE.CylinderGeometry(0.45, 0.50, 0.18, 12);
  neckGroup.add(new THREE.Mesh(portalGeo, M(0x059669, 0x10b981, 0.25, 60, true, 0.7)));

  // Collar (gp13, gp14 — whisker proteins)
  const collarGeo = new THREE.CylinderGeometry(0.52, 0.48, 0.12, 12);
  const collar = new THREE.Mesh(collarGeo, M(0x34d399, 0x34d399, 0.3, 70, true, 0.6));
  collar.position.y = -0.16;
  neckGroup.add(collar);

  // Whiskers (6 short fibers from collar — wac protein)
  for(let w=0; w<6; w++){
    const angle = (w/6)*Math.PI*2;
    const whiskerPts = [
      new THREE.Vector3(Math.cos(angle)*0.5, -0.16, Math.sin(angle)*0.5),
      new THREE.Vector3(Math.cos(angle)*0.85, -0.05, Math.sin(angle)*0.85),
      new THREE.Vector3(Math.cos(angle)*1.05, 0.15, Math.sin(angle)*1.05),
    ];
    const wCurve = new THREE.CatmullRomCurve3(whiskerPts);
    neckGroup.add(new THREE.Mesh(
      new THREE.TubeGeometry(wCurve, 12, 0.015, 4, false),
      M(0xa3e635, 0xa3e635, 0.3, 60, true, 0.5)
    ));
  }

  neckGroup.position.y = 1.0;
  group.add(neckGroup);

  /* ====== 3. CONTRACTILE TAIL SHEATH (gp18) + INNER TUBE (gp19) ====== */
  const tailGroup = new THREE.Group();

  // Inner tube (gp19 — rigid, 144 copies)
  const tubeGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.8, 8);
  tailGroup.add(new THREE.Mesh(tubeGeo, M(0x065f46, 0x10b981, 0.2, 60, true, 0.6)));

  // Outer sheath (gp18 — contractile, helical, 144 copies = 24 rings × 6)
  const sheathGeo = new THREE.CylinderGeometry(0.38, 0.40, 2.8, 12);
  tailGroup.add(new THREE.Mesh(sheathGeo, M(0x0a4a3a, 0x10b981, 0.12, 40, true, 0.45)));

  // Sheath helix wireframe
  const sheathWire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.39, 0.41, 2.8, 12, 24),
    M(0x10b981, 0x10b981, 0.06, 80, true, 0.12, true)
  );
  tailGroup.add(sheathWire);

  // Sheath ring segments (visible annuli — 24 rings)
  for(let r=0; r<24; r++){
    const ry = 1.4 - (r/23)*2.8;
    const ringGeo = new THREE.TorusGeometry(0.39, 0.018, 6, 12);
    const ring = new THREE.Mesh(ringGeo, M(0x34d399, 0x34d399, 0.25, 60, true, 0.35));
    ring.rotation.x = Math.PI/2;
    ring.position.y = ry;
    tailGroup.add(ring);
  }

  tailGroup.position.y = -0.5;
  group.add(tailGroup);

  /* ====== 4. BASEPLATE (hexagonal, ~15 proteins) ====== */
  const bpGroup = new THREE.Group();

  // Main baseplate hub (hexagonal)
  const bpGeo = new THREE.CylinderGeometry(0.65, 0.70, 0.22, 6);
  bpGroup.add(new THREE.Mesh(bpGeo, M(0x14b8a6, 0x22d3ee, 0.2, 50, true, 0.6)));

  // Baseplate rim
  const bpRimGeo = new THREE.TorusGeometry(0.68, 0.04, 6, 6);
  const bpRim = new THREE.Mesh(bpRimGeo, M(0x22d3ee, 0x22d3ee, 0.3, 70, true, 0.5));
  bpRim.rotation.x = Math.PI/2;
  bpGroup.add(bpRim);

  // Baseplate pins (gp9 — 6 trimers)
  for(let p=0; p<6; p++){
    const a = (p/6)*Math.PI*2;
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 6, 6),
      M(0xa3e635, 0xa3e635, 0.35, 60, true, 0.55)
    );
    pin.position.set(Math.cos(a)*0.6, 0, Math.sin(a)*0.6);
    bpGroup.add(pin);
  }

  // Central needle (gp5-gp27 trimer — lysozyme activity)
  const needleGeo = new THREE.ConeGeometry(0.06, 0.5, 6);
  const needle = new THREE.Mesh(needleGeo, M(0x22d3ee, 0x22d3ee, 0.4, 80));
  needle.position.y = -0.35;
  needle.rotation.x = Math.PI; // point downward
  bpGroup.add(needle);

  // Needle tip
  const needleTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 5, 5),
    M(0xa3e635, 0xa3e635, 0.5, 80)
  );
  needleTip.position.y = -0.6;
  bpGroup.add(needleTip);

  bpGroup.position.y = -2.05;
  group.add(bpGroup);

  /* ====== 5. LONG TAIL FIBERS (LTF — gp34-gp37, 6 fibers ~145 nm) ====== */
  for(let f=0; f<6; f++){
    const angle = (f/6)*Math.PI*2 + Math.PI/6;
    const ltfGroup = new THREE.Group();

    // Each LTF has a "knee" joint — proximal half (gp34) + distal half (gp36-gp37)
    const proximalPts = [
      new THREE.Vector3(Math.cos(angle)*0.6, -2.05, Math.sin(angle)*0.6),
      new THREE.Vector3(Math.cos(angle)*1.2, -1.3, Math.sin(angle)*1.2),
      new THREE.Vector3(Math.cos(angle)*1.8, -0.8, Math.sin(angle)*1.8),
    ];
    const distalPts = [
      new THREE.Vector3(Math.cos(angle)*1.8, -0.8, Math.sin(angle)*1.8),
      new THREE.Vector3(Math.cos(angle)*2.3, -1.5, Math.sin(angle)*2.3),
      new THREE.Vector3(Math.cos(angle)*2.7, -2.2, Math.sin(angle)*2.7),
      new THREE.Vector3(Math.cos(angle)*2.9, -2.6, Math.sin(angle)*2.9),
    ];

    const proxCurve = new THREE.CatmullRomCurve3(proximalPts);
    ltfGroup.add(new THREE.Mesh(
      new THREE.TubeGeometry(proxCurve, 16, 0.022, 5, false),
      M(0x10b981, 0x10b981, 0.3, 60, true, 0.6)
    ));

    const distCurve = new THREE.CatmullRomCurve3(distalPts);
    ltfGroup.add(new THREE.Mesh(
      new THREE.TubeGeometry(distCurve, 16, 0.018, 5, false),
      M(0x34d399, 0x34d399, 0.35, 60, true, 0.55)
    ));

    // Knee joint
    const knee = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 5, 5),
      M(0xa3e635, 0xa3e635, 0.4, 70, true, 0.6)
    );
    knee.position.copy(proximalPts[2]);
    ltfGroup.add(knee);

    // Tip (gp37 — receptor binding)
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 5, 5),
      M(0x22d3ee, 0x22d3ee, 0.45, 80, true, 0.7)
    );
    tip.position.copy(distalPts[3]);
    ltfGroup.add(tip);

    group.add(ltfGroup);
  }

  /* ====== 6. SHORT TAIL FIBERS (STF — gp12, 6 trimers) ====== */
  for(let s=0; s<6; s++){
    const angle = (s/6)*Math.PI*2;
    const stfPts = [
      new THREE.Vector3(Math.cos(angle)*0.55, -2.15, Math.sin(angle)*0.55),
      new THREE.Vector3(Math.cos(angle)*0.85, -2.55, Math.sin(angle)*0.85),
      new THREE.Vector3(Math.cos(angle)*1.0, -2.75, Math.sin(angle)*1.0),
    ];
    const stfCurve = new THREE.CatmullRomCurve3(stfPts);
    group.add(new THREE.Mesh(
      new THREE.TubeGeometry(stfCurve, 10, 0.02, 4, false),
      M(0x14b8a6, 0x14b8a6, 0.3, 60, true, 0.5)
    ));
    // STF tip
    const stfTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 4, 4),
      M(0x22d3ee, 0x22d3ee, 0.4, 70, true, 0.6)
    );
    stfTip.position.copy(stfPts[2]);
    group.add(stfTip);
  }

  scene.add(group);
  return group;
}


/* ═══════════════════════════════════════════════════════
 * HERO CANVAS — Floating phage particles (T4 silhouettes)
 * ═══════════════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('bt4-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 38);

  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const l1 = new THREE.PointLight(0x10b981, 3.2, 90); l1.position.set(12,15,20);  scene.add(l1);
  const l2 = new THREE.PointLight(0x34d399, 2.0, 70); l2.position.set(-12,-10,15); scene.add(l2);
  const l3 = new THREE.PointLight(0xa3e635, 1.2, 50); l3.position.set(0,-8,-10);   scene.add(l3);

  const phageColors = [0x10b981, 0x34d399, 0xa3e635, 0x14b8a6, 0x22d3ee, 0x3b82f6];

  const N = 50;
  const nodes = [];

  for(let i=0; i<N; i++){
    const isLarge = Math.random() < 0.12;
    const isMed   = Math.random() < 0.25;
    const col = phageColors[Math.floor(Math.random()*phageColors.length)];

    const nodeGroup = new THREE.Group();

    if(isLarge){
      // Mini phage silhouette
      const headR = Math.random()*0.18+0.14;
      // Prolate head
      const hGeo = new THREE.IcosahedronGeometry(headR, 1);
      hGeo.scale(0.85, 1.3, 0.85);
      nodeGroup.add(new THREE.Mesh(hGeo, new THREE.MeshPhongMaterial({
        color:col, emissive:col, emissiveIntensity:0.3, shininess:80, transparent:true, opacity:0.5
      })));
      // Tiny tail
      const tGeo = new THREE.CylinderGeometry(headR*0.25, headR*0.28, headR*1.8, 6);
      const tail = new THREE.Mesh(tGeo, new THREE.MeshPhongMaterial({
        color:col, emissive:col, emissiveIntensity:0.25, shininess:60, transparent:true, opacity:0.4
      }));
      tail.position.y = -headR*1.6;
      nodeGroup.add(tail);
      // Baseplate
      const bpGeo2 = new THREE.CylinderGeometry(headR*0.35, headR*0.38, headR*0.15, 6);
      const bp2 = new THREE.Mesh(bpGeo2, new THREE.MeshPhongMaterial({
        color:0x22d3ee, emissive:0x22d3ee, emissiveIntensity:0.3, transparent:true, opacity:0.45
      }));
      bp2.position.y = -headR*2.6;
      nodeGroup.add(bp2);
    } else if(isMed){
      // Medium icosahedral particle
      const r = Math.random()*0.08+0.05;
      const geoM = new THREE.IcosahedronGeometry(r, 0);
      geoM.scale(0.85, 1.2, 0.85);
      nodeGroup.add(new THREE.Mesh(geoM, new THREE.MeshPhongMaterial({
        color:col, emissive:col, emissiveIntensity:0.45, shininess:80, transparent:true, opacity:0.4
      })));
    } else {
      // Small dot
      const r = Math.random()*0.05+0.02;
      nodeGroup.add(new THREE.Mesh(
        new THREE.SphereGeometry(r, 4, 4),
        new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:0.3})
      ));
    }

    nodeGroup.position.set((Math.random()-.5)*66, (Math.random()-.5)*44, (Math.random()-.5)*28);
    nodeGroup.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    nodeGroup.userData = {
      vx:(Math.random()-.5)*.020,
      vy:(Math.random()-.5)*.018,
      vz:(Math.random()-.5)*.010,
      rx:(Math.random()-.5)*.003,
      ry:(Math.random()-.5)*.0025,
    };

    scene.add(nodeGroup);
    nodes.push(nodeGroup);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0x10b981, transparent:true, opacity:0.05});
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  let frame = 0;
  function animate(){
    requestAnimationFrame(animate);
    nodes.forEach(n=>{
      n.position.x += n.userData.vx;
      n.position.y += n.userData.vy;
      n.position.z += n.userData.vz;
      n.rotation.x += n.userData.rx;
      n.rotation.y += n.userData.ry;
      if(Math.abs(n.position.x)>34) n.userData.vx*=-1;
      if(Math.abs(n.position.y)>24) n.userData.vy*=-1;
      if(Math.abs(n.position.z)>16) n.userData.vz*=-1;
    });
    if(++frame%6===0){
      while(lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const d=nodes[i].position.distanceTo(nodes[j].position);
        if(d<9){
          const g=new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(),nodes[j].position.clone()]);
          const l=new THREE.Line(g,lineMat.clone());
          l.material.opacity=(1-d/9)*.06;
          lineGroup.add(l);
        }
      }
    }
    renderer.render(scene,camera);
  }
  animate();

  window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });
}


/* ═══════════════════════════════════════════════════════
 * MAIN 3D VIEWER
 * ═══════════════════════════════════════════════════════ */
function initViewer(THREE){
  const canvas = document.getElementById('bt4-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x000d08, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,(canvas.clientWidth||500)/(canvas.clientHeight||440),.1,100);
  camera.position.set(0,0,12);

  scene.add(new THREE.AmbientLight(0xffffff,.28));
  const d1=new THREE.DirectionalLight(0x10b981,3.0); d1.position.set(5,8,5);    scene.add(d1);
  const d2=new THREE.DirectionalLight(0x34d399,1.5); d2.position.set(-5,-4,3);  scene.add(d2);
  const d3=new THREE.DirectionalLight(0xa3e635,0.8); d3.position.set(0,-6,8);   scene.add(d3);
  const pt1=new THREE.PointLight(0x22d3ee,1.0,30);   pt1.position.set(3,-3,5);  scene.add(pt1);
  const pt2=new THREE.PointLight(0x14b8a6,0.8,25);   pt2.position.set(-3,3,-4); scene.add(pt2);

  const phageGroup = buildT4(THREE, scene);

  let isDragging=false, prevX=0, prevY=0;
  canvas.addEventListener('mousedown', e=>{isDragging=true;prevX=e.clientX;prevY=e.clientY});
  canvas.addEventListener('touchstart',e=>{isDragging=true;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY},{passive:true});
  window.addEventListener('mouseup',  ()=>{isDragging=false});
  window.addEventListener('touchend', ()=>{isDragging=false});
  canvas.addEventListener('mousemove',e=>{
    if(!isDragging||!phageGroup)return;
    phageGroup.rotation.y+=(e.clientX-prevX)*.008;
    phageGroup.rotation.x+=(e.clientY-prevY)*.008;
    prevX=e.clientX;prevY=e.clientY;
  });
  canvas.addEventListener('touchmove',e=>{
    if(!isDragging||!phageGroup)return;
    phageGroup.rotation.y+=(e.touches[0].clientX-prevX)*.008;
    phageGroup.rotation.x+=(e.touches[0].clientY-prevY)*.008;
    prevX=e.touches[0].clientX;prevY=e.touches[0].clientY;
  },{passive:true});
  canvas.addEventListener('wheel',e=>{
    camera.position.z=Math.max(5,Math.min(25,camera.position.z+e.deltaY*.015));
    e.preventDefault();
  },{passive:false});

  function animate(){
    requestAnimationFrame(animate);
    if(phageGroup&&!isDragging){
      phageGroup.rotation.y+=.004;
      phageGroup.rotation.x+=.0008;
    }
    renderer.render(scene,camera);
  }
  animate();

  const ro=new ResizeObserver(()=>{
    const w=canvas.clientWidth,h=canvas.clientHeight;
    if(w&&h){renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
  });
  ro.observe(canvas);
}


/* ═══════════════════════════════════════════════════════
 * NAVBAR + REVEALS + COUNTERS
 * ═══════════════════════════════════════════════════════ */
function initNavbar(){
  const nb=document.getElementById('bt4-navbar');
  const tg=document.getElementById('bt4NavToggle');
  const lk=document.getElementById('bt4NavLinks');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){
    tg.addEventListener('click',()=>lk.classList.toggle('active'));
    lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));
  }
}

function initReveal(){
  const targets=document.querySelectorAll('.bt4-content-card,.bt4-struct-card,.bt4-neuro-card,.bt4-stat-card,.bt4-callout,.bt4-react-timeline');
  targets.forEach((el,i)=>{
    el.style.opacity='0';
    el.style.transform='translateY(24px)';
    el.style.transition=`opacity .6s ease ${Math.min(i*.07,.8)}s, transform .6s ease ${Math.min(i*.07,.8)}s`;
  });
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        obs.unobserve(e.target);
      }
    });
  },{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>obs.observe(el));
}

function initCounters(){
  const els=document.querySelectorAll('.bt4-stat-val[data-target]');
  const obs=new IntersectionObserver(entries=>{
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
          if(cur>=target)clearInterval(timer);
        },22);
        obs.unobserve(el);
      }
    });
  },{threshold:.3});
  els.forEach(el=>obs.observe(el));
}

function init(){
  const THREE=window.THREE;
  if(!THREE){console.error('Three.js failed to load');return;}
  initNavbar();
  initHeroCanvas(THREE);
  initViewer(THREE);
  initReveal();
  initCounters();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    });
  });
}
})();
