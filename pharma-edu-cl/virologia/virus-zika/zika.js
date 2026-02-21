/* ===== ZIKV — PHARMALAB CHILE ===== */
/* zika.js — Three.js 3D ZIKV icosahedral virion + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════════════
 * ZIKA VIRION 3D — Icosahedral flavivirus (~50 nm)
 * Layers: envelope (E dimers) + prM/M + nucleocapsid + RNA genome
 * ═══════════════════════════════════════════════════════ */
function buildZIKV(THREE, scene){
  const group = new THREE.Group();

  const M = (c,e,ei,s,tr,op,w) => new THREE.MeshPhongMaterial({
    color:c, emissive:e, emissiveIntensity:ei||0, shininess:s||80,
    transparent:!!tr, opacity:op||1, wireframe:!!w, side:THREE.DoubleSide
  });

  /* === 1. OUTER ENVELOPE — lipid bilayer === */
  // Icosahedral envelope (characteristic of flaviviruses — NOT spherical)
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 4),
    M(0x065f46, 0x10b981, 0.12, 25, true, 0.18)
  ));

  // Envelope glow sphere
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(2.18, 32, 32),
    M(0x10b981, 0x10b981, 0.06, 15, true, 0.07)
  ));

  /* === 2. ENVELOPE PROTEIN E — 90 dimers in herringbone pattern === */
  // E protein dimers (rafts of 3 dimers = 30 rafts total)
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

  const eDirs = fibPoints(90);
  eDirs.forEach((dir, i)=>{
    const eGroup = new THREE.Group();

    // E protein head — elongated domain III (finger-like)
    const headGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.28, 6);
    const headMat = M(0x34d399, 0x34d399, 0.45);
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.14;
    eGroup.add(head);

    // Domain III globular tip
    const tipGeo = new THREE.SphereGeometry(0.075, 6, 6);
    const tipCol  = (i%3===0) ? 0x6ee7b7 : (i%3===1 ? 0x34d399 : 0x10b981);
    const tip = new THREE.Mesh(tipGeo, M(tipCol, tipCol, 0.5));
    tip.position.y = 0.3;
    eGroup.add(tip);

    // Stem region (transmembrane)
    const stemGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.14, 5);
    const stem = new THREE.Mesh(stemGeo, M(0x065f46, 0x10b981, 0.2));
    stem.position.y = -0.07;
    eGroup.add(stem);

    eGroup.position.copy(dir.clone().multiplyScalar(2.12));
    eGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    group.add(eGroup);
  });

  /* === 3. prM/M PROTEIN LAYER — under envelope === */
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.75, 3),
    M(0x0d9488, 0x14b8a6, 0.1, 20, true, 0.16)
  ));

  // prM protein dots (inner leaflet)
  const mDirs = fibPoints(60);
  mDirs.forEach(dir=>{
    const mp = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 5, 5),
      M(0x22d3ee, 0x22d3ee, 0.3, 60, true, 0.55)
    );
    mp.position.copy(dir.clone().multiplyScalar(1.68));
    group.add(mp);
  });

  /* === 4. NUCLEOCAPSID — icosahedral inner shell === */
  // T=3 icosahedral capsid
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35, 2),
    M(0x0e7490, 0x06b6d4, 0.18, 50, true, 0.22)
  ));

  // Wireframe capsid
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.37, 2),
    M(0x06b6d4, 0x06b6d4, 0.1, 80, true, 0.12, true)
  ));

  // Capsid C protein subunits
  const capDirs = fibPoints(60);
  capDirs.forEach((dir,i)=>{
    const cp = new THREE.Mesh(
      new THREE.SphereGeometry(0.062+Math.random()*.02, 5, 5),
      M(0x67e8f9, 0x67e8f9, 0.35, 70, true, 0.6)
    );
    cp.position.copy(dir.clone().multiplyScalar(1.38));
    group.add(cp);
  });

  /* === 5. GENOMIC RNA(+) — ~10.8 kb === */
  // Single-stranded positive-sense RNA — disordered coil inside capsid
  for(let ring=0; ring<6; ring++){
    const rpts = [];
    const rr = 0.18 + ring*0.16;
    const turns = 4 + ring;
    for(let t=0; t<=1; t+=0.015){
      const a = t*Math.PI*2*turns;
      const tilt = (ring-3)*0.12;
      rpts.push(new THREE.Vector3(
        Math.cos(a)*rr + Math.sin(t*Math.PI*3)*0.06,
        tilt + Math.sin(a*1.3)*0.06,
        Math.sin(a)*rr + Math.cos(t*Math.PI*4)*0.05
      ));
    }
    const rCurve = new THREE.CatmullRomCurve3(rpts, true);
    const rGeo   = new THREE.TubeGeometry(rCurve, 80, 0.016, 4, true);
    const rColor = ring%2===0 ? 0xa3e635 : 0x84cc16;
    const rEmit  = ring%2===0 ? 0x4d7c0f : 0xa3e635;
    group.add(new THREE.Mesh(rGeo, M(rColor, rEmit, 0.35, 80, true, 0.9)));
  }

  /* === 6. NS1 SECRETED — small satellites === */
  for(let n=0; n<6; n++){
    const a = (n/6)*Math.PI*2;
    const ns1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      M(0xf59e0b, 0xf59e0b, 0.4, 60, true, 0.5)
    );
    ns1.position.set(
      Math.cos(a)*2.8,
      Math.sin(a*0.7)*0.4,
      Math.sin(a)*2.8
    );
    // Small spike on NS1
    const ns1s = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 5, 5),
      M(0xfbbf24, 0xfbbf24, 0.5, 70, true, 0.6)
    );
    ns1s.position.y = 0.14;
    ns1.add(ns1s);
    group.add(ns1);
  }

  scene.add(group);
  return group;
}


/* ═══════════════════════════════════════════════════════
 * HERO CANVAS — Floating ZIKV particles + Aedes silhouette hint
 * ═══════════════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('zkv-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 38);

  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const l1 = new THREE.PointLight(0x10b981, 3.0, 90); l1.position.set(12,15,20);  scene.add(l1);
  const l2 = new THREE.PointLight(0x06b6d4, 1.8, 70); l2.position.set(-12,-10,15); scene.add(l2);
  const l3 = new THREE.PointLight(0xa3e635, 1.0, 50); l3.position.set(0,-8,-10);   scene.add(l3);

  const N = 55;
  const nodes = [];
  const colors = [0x10b981, 0x06b6d4, 0x34d399, 0x22d3ee, 0xa3e635, 0x0d9488];

  for(let i=0; i<N; i++){
    const isLarge = Math.random() < 0.15;
    const isMed   = Math.random() < 0.3;
    const r   = isLarge ? Math.random()*.28+0.18 : isMed ? Math.random()*.1+0.06 : Math.random()*.07+0.03;
    const col = colors[Math.floor(Math.random()*colors.length)];

    // All ZIKV are icosahedral (not filamentous like Ebola)
    const geo = isLarge
      ? new THREE.IcosahedronGeometry(r, 1)
      : new THREE.IcosahedronGeometry(r, 0);

    const mat = new THREE.MeshPhongMaterial({
      color:col, emissive:col, emissiveIntensity: isLarge?0.3:0.5,
      shininess:80, transparent:true, opacity: isLarge?0.6:0.4
    });

    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random()-.5)*66, (Math.random()-.5)*44, (Math.random()-.5)*28);
    m.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    m.userData = {
      vx:(Math.random()-.5)*.022,
      vy:(Math.random()-.5)*.022,
      vz:(Math.random()-.5)*.011,
      rx:(Math.random()-.5)*.004,
      ry:(Math.random()-.5)*.003,
    };

    // Add E protein spikes to larger particles
    if(isLarge){
      for(let s=0; s<8; s++){
        const phi2 = Math.acos(1-2*(s+.5)/8);
        const th2  = Math.PI*(1+Math.sqrt(5))*s;
        const dir  = new THREE.Vector3(
          Math.sin(phi2)*Math.cos(th2),
          Math.sin(phi2)*Math.sin(th2),
          Math.cos(phi2)
        ).normalize();
        const sp = new THREE.Mesh(
          new THREE.SphereGeometry(r*0.18, 4, 4),
          new THREE.MeshBasicMaterial({color:0x6ee7b7, transparent:true, opacity:0.7})
        );
        sp.position.copy(dir.clone().multiplyScalar(r*1.2));
        m.add(sp);
      }
    }

    scene.add(m);
    nodes.push(m);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0x10b981, transparent:true, opacity:0.06});
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
          l.material.opacity=(1-d/9)*.07;
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
  const canvas = document.getElementById('zkv-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x080e0e, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,(canvas.clientWidth||500)/(canvas.clientHeight||440),.1,100);
  camera.position.set(0,0,9);

  scene.add(new THREE.AmbientLight(0xffffff,.3));
  const d1=new THREE.DirectionalLight(0x10b981,2.8); d1.position.set(5,8,5);   scene.add(d1);
  const d2=new THREE.DirectionalLight(0x06b6d4,1.5); d2.position.set(-5,-4,3); scene.add(d2);
  const d3=new THREE.DirectionalLight(0xa3e635,0.8); d3.position.set(0,5,8);   scene.add(d3);
  const pt1=new THREE.PointLight(0xf59e0b,1.2,30);   pt1.position.set(3,-3,5); scene.add(pt1);

  const virusGroup = buildZIKV(THREE, scene);

  let isDragging=false, prevX=0, prevY=0;
  canvas.addEventListener('mousedown', e=>{isDragging=true;prevX=e.clientX;prevY=e.clientY});
  canvas.addEventListener('touchstart',e=>{isDragging=true;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY},{passive:true});
  window.addEventListener('mouseup',  ()=>{isDragging=false});
  window.addEventListener('touchend', ()=>{isDragging=false});
  canvas.addEventListener('mousemove',e=>{
    if(!isDragging||!virusGroup)return;
    virusGroup.rotation.y+=(e.clientX-prevX)*.008;
    virusGroup.rotation.x+=(e.clientY-prevY)*.008;
    prevX=e.clientX;prevY=e.clientY;
  });
  canvas.addEventListener('touchmove',e=>{
    if(!isDragging||!virusGroup)return;
    virusGroup.rotation.y+=(e.touches[0].clientX-prevX)*.008;
    virusGroup.rotation.x+=(e.touches[0].clientY-prevY)*.008;
    prevX=e.touches[0].clientX;prevY=e.touches[0].clientY;
  },{passive:true});
  canvas.addEventListener('wheel',e=>{
    camera.position.z=Math.max(4,Math.min(20,camera.position.z+e.deltaY*.015));
    e.preventDefault();
  },{passive:false});

  function animate(){
    requestAnimationFrame(animate);
    if(virusGroup&&!isDragging){
      virusGroup.rotation.y+=.004;
      virusGroup.rotation.x+=.001;
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
  const nb=document.getElementById('zkv-navbar');
  const tg=document.getElementById('zkvNavToggle');
  const lk=document.getElementById('zkvNavLinks');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){
    tg.addEventListener('click',()=>lk.classList.toggle('active'));
    lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));
  }
}

function initReveal(){
  const targets=document.querySelectorAll('.zkv-content-card,.zkv-struct-card,.zkv-neuro-card,.zkv-stat-card,.zkv-callout,.zkv-react-timeline');
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
  const els=document.querySelectorAll('.zkv-stat-val[data-target]');
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
