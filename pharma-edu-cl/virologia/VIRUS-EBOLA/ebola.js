/* ===== EBOV — PHARMALAB CHILE ===== */
/* ebola.js — Three.js 3D EBOV filamentous virion + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════════════
 * EBOLA VIRION 3D — Filamentous structure
 * Layers: envelope + GP trimers + matrix VP40 + nucleocapsid + RNA genome
 * ═══════════════════════════════════════════════════════ */
function buildEBOV(THREE, scene){
  const group = new THREE.Group();

  const M = (c,e,ei,s,tr,op,w) => new THREE.MeshPhongMaterial({
    color:c, emissive:e, emissiveIntensity:ei||0, shininess:s||80,
    transparent:!!tr, opacity:op||1, wireframe:!!w, side:THREE.DoubleSide
  });

  /* === 1. FILAMENTOUS ENVELOPE === */
  // Main body — elongated cylinder (the characteristic filamentous shape)
  const bodyLen = 4.5;
  const bodyR   = 0.38;

  // Envelope tube
  const envPts = [];
  for(let t=0; t<=1; t+=0.02){
    const x = (t-0.5)*bodyLen;
    // Slight sinusoidal bend — characteristic of Ébola filaments
    const y = Math.sin(t*Math.PI*1.2)*0.22;
    envPts.push(new THREE.Vector3(x, y, 0));
  }
  const envCurve = new THREE.CatmullRomCurve3(envPts);
  const envGeo = new THREE.TubeGeometry(envCurve, 80, bodyR, 16, false);
  group.add(new THREE.Mesh(envGeo, M(0xb91c1c, 0x7f1d1d, 0.2, 30, true, 0.30)));

  // Outer envelope glow
  const envGlowGeo = new THREE.TubeGeometry(envCurve, 80, bodyR*1.08, 16, false);
  group.add(new THREE.Mesh(envGlowGeo, M(0xef4444, 0xef4444, 0.08, 20, true, 0.08)));

  /* === 2. GP TRIMERS (Glycoprotein spikes) === */
  // ~170 GP trimers distributed along the surface
  const numSpikes = 110;
  for(let i=0; i<numSpikes; i++){
    const t = i/numSpikes;
    const angle = (i * 2.399963) % (Math.PI*2); // golden angle distribution
    const x = (t-0.5)*bodyLen*0.92;
    const yBase = Math.sin(t*Math.PI*1.2)*0.22;

    // Spike direction (radial from tube axis, roughly)
    const radDir = new THREE.Vector3(0, Math.sin(angle), Math.cos(angle)).normalize();

    const spikeGroup = new THREE.Group();

    // Stalk (transmembrane domain)
    const stalkGeo = new THREE.CylinderGeometry(0.022, 0.028, 0.22, 5);
    const stalkMesh = new THREE.Mesh(stalkGeo, M(0xf97316, 0xf97316, 0.4));
    spikeGroup.add(stalkMesh);

    // GP1/GP2 head — trimer (3 lobes)
    const isLarge = (i % 4 === 0);
    for(let lobe=0; lobe<3; lobe++){
      const la = (lobe/3)*Math.PI*2;
      const r = isLarge ? 0.055 : 0.042;
      const lobeGeo = new THREE.SphereGeometry(r, 6, 6);
      const lobeMesh = new THREE.Mesh(lobeGeo, M(0xfbbf24, 0xfbbf24, 0.45));
      lobeMesh.position.set(Math.cos(la)*r*1.8, 0.13, Math.sin(la)*r*1.8);
      spikeGroup.add(lobeMesh);
    }

    // Position spike on tube surface
    spikeGroup.position.set(x, yBase + radDir.y*bodyR, radDir.z*bodyR);
    spikeGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), radDir);
    group.add(spikeGroup);
  }

  /* === 3. MATRIX VP40 LAYER === */
  const vpGeo = new THREE.TubeGeometry(envCurve, 80, bodyR*0.82, 16, false);
  group.add(new THREE.Mesh(vpGeo, M(0xdc2626, 0x7f1d1d, 0.12, 20, true, 0.15)));

  // VP40 protein dots along inner surface
  for(let i=0; i<60; i++){
    const t = i/60;
    const angle = (i*1.618)*Math.PI*2;
    const x = (t-0.5)*bodyLen*0.85;
    const yBase = Math.sin(t*Math.PI*1.2)*0.22;
    const r = bodyR*0.7;
    const vp = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 5, 5),
      M(0xf87171, 0xf87171, 0.35, 60, true, 0.5)
    );
    vp.position.set(x, yBase + Math.sin(angle)*r, Math.cos(angle)*r);
    group.add(vp);
  }

  /* === 4. NUCLEOCAPSID — helical === */
  const ncPts = [];
  for(let t=0; t<=1; t+=0.008){
    const x = (t-0.5)*bodyLen*0.78;
    const yBase = Math.sin(t*Math.PI*1.2)*0.18;
    ncPts.push(new THREE.Vector3(x, yBase, 0));
  }
  const ncCurve = new THREE.CatmullRomCurve3(ncPts);
  const ncGeo = new THREE.TubeGeometry(ncCurve, 100, bodyR*0.44, 8, false);
  group.add(new THREE.Mesh(ncGeo, M(0xa855f7, 0x7c3aed, 0.2, 50, true, 0.55)));

  // NP protein subunits (chevrons along helix)
  for(let i=0; i<55; i++){
    const t = i/55;
    const x = (t-0.5)*bodyLen*0.75;
    const yBase = Math.sin(t*Math.PI*1.2)*0.18;
    const npAngle = (i/55)*Math.PI*2*8; // 8 turns along length
    const npR = bodyR*0.36;
    const npMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.048, 5, 5),
      M(0xc084fc, 0xc084fc, 0.3, 60, true, 0.65)
    );
    npMesh.position.set(x, yBase + Math.sin(npAngle)*npR, Math.cos(npAngle)*npR);
    group.add(npMesh);
  }

  /* === 5. GENOMIC RNA (~19 kb) — helical coil inside NC === */
  for(let strand=0; strand<2; strand++){
    const rnaPts = [];
    const offset = strand * Math.PI;
    for(let t=0; t<=1; t+=0.012){
      const x = (t-0.5)*bodyLen*0.65;
      const yBase = Math.sin(t*Math.PI*1.2)*0.14;
      const a = (t*Math.PI*2*12) + offset;
      const rr = bodyR*0.22;
      rnaPts.push(new THREE.Vector3(x, yBase + Math.sin(a)*rr, Math.cos(a)*rr));
    }
    const rnaCurve = new THREE.CatmullRomCurve3(rnaPts);
    const rnaGeo = new THREE.TubeGeometry(rnaCurve, 100, 0.018, 4, false);
    group.add(new THREE.Mesh(rnaGeo, M(
      strand===0?0x34d399:0x6ee7b7,
      strand===0?0x047857:0x34d399,
      0.4, 80, true, 0.9
    )));
  }

  /* === 6. CAPS (rounded ends) === */
  [-1,1].forEach(side=>{
    const capX = side * bodyLen/2 * 0.92;
    const capY = Math.sin((side>0?1:0)*Math.PI*1.2)*0.22;
    const capMesh = new THREE.Mesh(
      new THREE.SphereGeometry(bodyR*0.98, 14, 14),
      M(0xb91c1c, 0x7f1d1d, 0.18, 30, true, 0.30)
    );
    capMesh.position.set(capX, capY, 0);
    group.add(capMesh);
  });

  /* === 7. PORTAL / BUDDING TIP === */
  const tipX = bodyLen/2*0.95;
  const tipY = Math.sin(Math.PI*1.2)*0.22;
  for(let p=0; p<8; p++){
    const a = (p/8)*Math.PI*2;
    const tipGP = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 5, 5),
      M(0x34d399, 0x059669, 0.5)
    );
    tipGP.position.set(tipX + Math.cos(a)*0.1, tipY + Math.sin(a)*0.08, Math.cos(a)*0.06);
    group.add(tipGP);
  }

  scene.add(group);
  return group;
}


/* ═══════════════════════════════════════════════════════
 * HERO CANVAS — Floating EBOV filaments + subviral particles
 * ═══════════════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('ebv-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 38);

  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const l1 = new THREE.PointLight(0xef4444, 2.8, 90); l1.position.set(12,15,20);  scene.add(l1);
  const l2 = new THREE.PointLight(0xf97316, 1.8, 70); l2.position.set(-12,-10,15); scene.add(l2);
  const l3 = new THREE.PointLight(0xfbbf24, 1.0, 50); l3.position.set(0,-8,-10);   scene.add(l3);

  const N = 48;
  const nodes = [];
  const colors = [0xef4444, 0xf97316, 0xfbbf24, 0xb91c1c, 0xdc2626];

  for(let i=0; i<N; i++){
    const isFilament = Math.random() < 0.45; // Ebola = mostly filamentous
    const isLarge    = !isFilament && Math.random() < 0.2;
    const col = colors[Math.floor(Math.random()*colors.length)];

    let geo;
    if(isFilament){
      // Filamentous particle — CylinderGeometry
      const len = Math.random()*2.5+1.2;
      const r   = Math.random()*0.08+0.04;
      geo = new THREE.CylinderGeometry(r, r, len, 7);
    } else if(isLarge){
      geo = new THREE.SphereGeometry(Math.random()*0.3+0.18, 12, 12);
    } else {
      geo = new THREE.SphereGeometry(Math.random()*0.09+0.04, 7, 7);
    }

    const mat = new THREE.MeshPhongMaterial({
      color:col, emissive:col, emissiveIntensity: isFilament?0.4:0.55,
      shininess:80, transparent:true, opacity: isFilament?0.55:0.40
    });

    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random()-.5)*66, (Math.random()-.5)*44, (Math.random()-.5)*28);
    // Random rotation for filaments
    m.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    m.userData = {
      vx:(Math.random()-.5)*.02,
      vy:(Math.random()-.5)*.02,
      vz:(Math.random()-.5)*.01,
      rx:(Math.random()-.5)*.004,
      ry:(Math.random()-.5)*.003,
    };

    // Add GP spikes to filaments
    if(isFilament){
      const len2 = (geo.parameters && geo.parameters.height) || 2.0;
      for(let s=0; s<6; s++){
        const sy = (s/6-0.5)*len2*0.9;
        const sa = (s*1.618)*Math.PI*2;
        const sp = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 4, 4),
          new THREE.MeshBasicMaterial({color:0xfbbf24, transparent:true, opacity:0.65})
        );
        sp.position.set(Math.cos(sa)*0.12, sy, Math.sin(sa)*0.12);
        m.add(sp);
      }
    }

    scene.add(m);
    nodes.push(m);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0xef4444, transparent:true, opacity:0.06});
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
  const canvas = document.getElementById('ebv-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x0a0d0f,1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,(canvas.clientWidth||500)/(canvas.clientHeight||440),.1,100);
  camera.position.set(0,0,9);

  scene.add(new THREE.AmbientLight(0xffffff,.25));
  const d1=new THREE.DirectionalLight(0xef4444,2.5); d1.position.set(5,8,5);   scene.add(d1);
  const d2=new THREE.DirectionalLight(0xfbbf24,1.2); d2.position.set(-5,-4,3);  scene.add(d2);
  const d3=new THREE.DirectionalLight(0xa855f7,0.6); d3.position.set(0,5,8);   scene.add(d3);
  const pt1=new THREE.PointLight(0xf97316,1.5,30);   pt1.position.set(3,-3,5); scene.add(pt1);

  const virusGroup = buildEBOV(THREE, scene);

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
      virusGroup.rotation.y+=.003;
      virusGroup.rotation.x+=.0008;
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
  const nb=document.getElementById('ebv-navbar');
  const tg=document.getElementById('ebvNavToggle');
  const lk=document.getElementById('ebvNavLinks');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){
    tg.addEventListener('click',()=>lk.classList.toggle('active'));
    lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));
  }
}

function initReveal(){
  const targets=document.querySelectorAll('.ebv-content-card,.ebv-struct-card,.ebv-neuro-card,.ebv-stat-card,.ebv-callout,.ebv-react-timeline');
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
  const els=document.querySelectorAll('.ebv-stat-val[data-target]');
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
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    });
  });
}
})();
