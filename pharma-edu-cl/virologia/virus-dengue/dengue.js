/* ===== DENV — PHARMALAB CHILE ===== */
/* dengue.js — Three.js 3D DENV icosahedral virion (T=3) + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════════════
 * DENV VIRION 3D — Icosahedral T=3 flavivirus (~50 nm)
 * 4-serotipo color scheme on E dimers
 * Layers: envelope + E dimers (T=3) + prM/M + nucleocapsid + RNA
 * ═══════════════════════════════════════════════════════ */
function buildDENV(THREE, scene){
  const group = new THREE.Group();

  const M = (c,e,ei,s,tr,op,w) => new THREE.MeshPhongMaterial({
    color:c, emissive:e, emissiveIntensity:ei||0, shininess:s||80,
    transparent:!!tr, opacity:op||1, wireframe:!!w, side:THREE.DoubleSide
  });

  /* Fibonacci point distribution */
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

  /* === 1. OUTER ENVELOPE — icosahedral lipid bilayer === */
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 4),
    M(0x78350f, 0xd97706, 0.12, 20, true, 0.20)
  ));

  // Glow shell
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 32, 32),
    M(0xd97706, 0xd97706, 0.05, 10, true, 0.06)
  ));

  /* === 2. ENVELOPE PROTEIN E — 90 dimers, T=3 symmetry === */
  // 4 serotype colors — each "raft" of 3 dimers = one serotipo color
  const serotypeColors = [
    [0xd97706, 0xfbbf24],  // DENV-1 amber
    [0xef4444, 0xfca5a5],  // DENV-2 red
    [0x10b981, 0x6ee7b7],  // DENV-3 green
    [0x3b82f6, 0x93c5fd],  // DENV-4 blue
  ];

  const eDirs = fibPoints(90);
  eDirs.forEach((dir, i)=>{
    const sTypeIdx = Math.floor(i/23) % 4;
    const [baseCol, tipCol] = serotypeColors[sTypeIdx];

    const eGroup = new THREE.Group();

    // DI — central domain (barrel shape)
    const diGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.20, 6);
    eGroup.add(new THREE.Mesh(diGeo, M(baseCol, baseCol, 0.35)));

    // DII — dimerization + fusion peptide domain (elongated)
    const diiGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.16, 5);
    const dii = new THREE.Mesh(diiGeo, M(0x92400e, 0xd97706, 0.3));
    dii.position.set(0.1, 0.06, 0);
    dii.rotation.z = 0.4;
    eGroup.add(dii);

    // DIII — receptor binding domain (globular, tip)
    const diiiGeo = new THREE.SphereGeometry(0.078, 6, 6);
    const diii = new THREE.Mesh(diiiGeo, M(tipCol, tipCol, 0.5));
    diii.position.y = 0.28;
    eGroup.add(diii);

    eGroup.position.copy(dir.clone().multiplyScalar(2.12));
    eGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    group.add(eGroup);
  });

  /* === 3. prM/M LAYER === */
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.72, 3),
    M(0x451a03, 0xd97706, 0.10, 15, true, 0.18)
  ));

  // prM dots
  const prMDirs = fibPoints(54);
  prMDirs.forEach((dir, i)=>{
    const mp = new THREE.Mesh(
      new THREE.SphereGeometry(0.052, 5, 5),
      M(0xfbbf24, 0xfbbf24, 0.28, 60, true, 0.5)
    );
    mp.position.copy(dir.clone().multiplyScalar(1.65));
    group.add(mp);
  });

  /* === 4. NS1 HEXAMER — secreted, floating nearby === */
  // 6 NS1 monomers arranged as hexamer
  for(let n=0; n<6; n++){
    const a = (n/6)*Math.PI*2;
    const ns1Group = new THREE.Group();

    const monomer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.07, 0.22, 6),
      M(0xf59e0b, 0xf59e0b, 0.4, 60, true, 0.55)
    );
    ns1Group.add(monomer);

    const top = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 6, 6),
      M(0xfbbf24, 0xfbbf24, 0.45)
    );
    top.position.y = 0.14;
    ns1Group.add(top);

    // Arrange hexamer
    ns1Group.position.set(
      Math.cos(a)*0.28,
      0,
      Math.sin(a)*0.28
    );

    // Place hexamer outside virion
    const hexGroup = new THREE.Group();
    hexGroup.add(ns1Group);
    hexGroup.position.set(
      Math.cos(a*0.7)*3.0,
      Math.sin(a*0.5)*0.5,
      Math.sin(a*0.7)*3.0
    );
    group.add(hexGroup);
  }

  /* === 5. NUCLEOCAPSID — T=3 icosahedral === */
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.32, 2),
    M(0x7c2d12, 0xea580c, 0.15, 50, true, 0.22)
  ));
  group.add(new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.34, 2),
    M(0xea580c, 0xea580c, 0.08, 80, true, 0.10, true)
  ));

  // Capsid C protein subunits — dimeric pairs
  const cDirs = fibPoints(60);
  cDirs.forEach((dir,i)=>{
    const cp = new THREE.Mesh(
      new THREE.SphereGeometry(0.058+Math.random()*.018, 5, 5),
      M(0xfed7aa, 0xfed7aa, 0.3, 70, true, 0.55)
    );
    cp.position.copy(dir.clone().multiplyScalar(1.35));
    group.add(cp);
  });

  /* === 6. GENOMIC (+)ssRNA — ~10.7 kb === */
  // Disordered coil — positive sense, directly translatable
  const rnaColors = [
    [0xd97706, 0x92400e],
    [0xf59e0b, 0xd97706],
    [0xfbbf24, 0xf59e0b],
    [0xfcd34d, 0xfbbf24],
  ];
  for(let ring=0; ring<7; ring++){
    const rr = 0.15 + ring*0.14;
    const turns = 3 + ring*0.8;
    const [rcol, remit] = rnaColors[ring % rnaColors.length];
    const rpts = [];
    for(let t=0; t<=1; t+=0.014){
      const a = t*Math.PI*2*turns;
      const tilt = (ring-3)*0.1;
      rpts.push(new THREE.Vector3(
        Math.cos(a)*rr + Math.sin(t*Math.PI*4)*0.05,
        tilt + Math.sin(a*1.4)*0.055,
        Math.sin(a)*rr + Math.cos(t*Math.PI*3)*0.04
      ));
    }
    const rc = new THREE.CatmullRomCurve3(rpts, true);
    group.add(new THREE.Mesh(
      new THREE.TubeGeometry(rc, 80, 0.014, 4, true),
      M(rcol, remit, 0.35, 80, true, 0.9)
    ));
  }

  scene.add(group);
  return group;
}


/* ═══════════════════════════════════════════════════════
 * HERO CANVAS — Floating DENV particles (4 serotype colors)
 * ═══════════════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('dnv-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 38);

  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const l1 = new THREE.PointLight(0xd97706, 3.2, 90); l1.position.set(12,15,20);  scene.add(l1);
  const l2 = new THREE.PointLight(0xf59e0b, 2.0, 70); l2.position.set(-12,-10,15); scene.add(l2);
  const l3 = new THREE.PointLight(0xfbbf24, 1.2, 50); l3.position.set(0,-8,-10);   scene.add(l3);

  // 4 serotype colors for the floating particles
  const serotypeHero = [0xd97706, 0xef4444, 0x10b981, 0x3b82f6, 0xf59e0b, 0xfbbf24];

  const N = 58;
  const nodes = [];

  for(let i=0; i<N; i++){
    const isLarge = Math.random() < 0.14;
    const isMed   = Math.random() < 0.28;
    const r   = isLarge ? Math.random()*.26+0.18 : isMed ? Math.random()*.1+0.06 : Math.random()*.07+0.03;
    const col = serotypeHero[Math.floor(Math.random()*serotypeHero.length)];

    // DENV = icosahedral (T=3)
    const detail = isLarge ? 1 : 0;
    const geo = new THREE.IcosahedronGeometry(r, detail);

    const mat = new THREE.MeshPhongMaterial({
      color:col, emissive:col, emissiveIntensity: isLarge?0.32:0.52,
      shininess:80, transparent:true, opacity: isLarge?0.6:0.4
    });

    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random()-.5)*66, (Math.random()-.5)*44, (Math.random()-.5)*28);
    m.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    m.userData = {
      vx:(Math.random()-.5)*.022,
      vy:(Math.random()-.5)*.020,
      vz:(Math.random()-.5)*.010,
      rx:(Math.random()-.5)*.0035,
      ry:(Math.random()-.5)*.003,
    };

    // E protein DIII tips on larger particles
    if(isLarge){
      for(let s=0; s<10; s++){
        const phi2 = Math.acos(1-2*(s+.5)/10);
        const th2  = Math.PI*(1+Math.sqrt(5))*s;
        const dir  = new THREE.Vector3(
          Math.sin(phi2)*Math.cos(th2),
          Math.sin(phi2)*Math.sin(th2),
          Math.cos(phi2)
        ).normalize();
        const sp = new THREE.Mesh(
          new THREE.SphereGeometry(r*0.16, 4, 4),
          new THREE.MeshBasicMaterial({color:0xfcd34d, transparent:true, opacity:0.7})
        );
        sp.position.copy(dir.clone().multiplyScalar(r*1.2));
        m.add(sp);
      }
    }

    scene.add(m);
    nodes.push(m);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0xd97706, transparent:true, opacity:0.06});
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
  const canvas = document.getElementById('dnv-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x0d0900, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,(canvas.clientWidth||500)/(canvas.clientHeight||440),.1,100);
  camera.position.set(0,0,9.5);

  scene.add(new THREE.AmbientLight(0xffffff,.28));
  const d1=new THREE.DirectionalLight(0xd97706,3.0); d1.position.set(5,8,5);    scene.add(d1);
  const d2=new THREE.DirectionalLight(0xfbbf24,1.5); d2.position.set(-5,-4,3);  scene.add(d2);
  const d3=new THREE.DirectionalLight(0xef4444,0.8); d3.position.set(0,-6,8);   scene.add(d3);
  const pt1=new THREE.PointLight(0x10b981,1.0,30);   pt1.position.set(3,-3,5);  scene.add(pt1);
  const pt2=new THREE.PointLight(0x3b82f6,0.8,25);   pt2.position.set(-3,3,-4); scene.add(pt2);

  const virusGroup = buildDENV(THREE, scene);

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
  const nb=document.getElementById('dnv-navbar');
  const tg=document.getElementById('dnvNavToggle');
  const lk=document.getElementById('dnvNavLinks');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){
    tg.addEventListener('click',()=>lk.classList.toggle('active'));
    lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));
  }
}

function initReveal(){
  const targets=document.querySelectorAll('.dnv-content-card,.dnv-struct-card,.dnv-neuro-card,.dnv-stat-card,.dnv-callout,.dnv-react-timeline');
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
  const els=document.querySelectorAll('.dnv-stat-val[data-target]');
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
