/* ===== VHB — PHARMALAB CHILE ===== */
/* hepatitis.js — Three.js 3D VHB (Partícula Dane) + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════
 * BUILD VHB — PARTÍCULA DANE (42 nm)
 * Lipid envelope + HBsAg spikes + icosahedral
 * nucleocapsid + rcDNA genome
 * Based on cryo-EM: PDB 2G33, Dryden et al. 2006
 * ═══════════════════════════════════════════════ */
function buildVHB(THREE, scene){
  const group = new THREE.Group();

  /* 1 ── LIPID ENVELOPE */
  const envGeo = new THREE.SphereGeometry(2.0, 48, 48);
  const envMat = new THREE.MeshPhongMaterial({
    color: 0x7c2d12, emissive: 0x431407, emissiveIntensity: 0.3,
    shininess: 50, transparent: true, opacity: 0.28, side: THREE.DoubleSide
  });
  group.add(new THREE.Mesh(envGeo, envMat));

  /* 2 ── HBsAg SURFACE ANTIGEN SPIKES
     S (small), M (medium), L (large) forms
     appear as knob-like projections on cryo-EM */
  function goldenDirs(n){
    return Array.from({length:n},(_,i)=>{
      const phi   = Math.acos(1-2*(i+.5)/n);
      const theta = Math.PI*(1+Math.sqrt(5))*i;
      return new THREE.Vector3(Math.sin(phi)*Math.cos(theta),Math.sin(phi)*Math.sin(theta),Math.cos(phi)).normalize();
    });
  }

  const hbsagDirs = goldenDirs(80);
  hbsagDirs.forEach((dir, i) => {
    const sg = new THREE.Group();

    // Transmembrane stalk
    const stalkGeo = new THREE.CylinderGeometry(0.02, 0.025, 0.38, 5);
    const stalkMat = new THREE.MeshPhongMaterial({
      color: 0xf97316, emissive: 0xc2410c, emissiveIntensity: 0.3, shininess: 70
    });
    sg.add(new THREE.Mesh(stalkGeo, stalkMat));

    // HBsAg ectodomain knob — size varies (L > M > S)
    const isL = (i % 8 === 0);  // ~12 L-type
    const isM = (i % 4 === 0 && !isL); // ~12 M-type
    const r   = isL ? 0.1 : isM ? 0.075 : 0.055;
    const col = isL ? 0xfbbf24 : isM ? 0xfb923c : 0xf97316;
    const emi = isL ? 0xd97706 : isM ? 0xea580c : 0xc2410c;

    const knobGeo = new THREE.SphereGeometry(r, 7, 7);
    const knobMat = new THREE.MeshPhongMaterial({color:col, emissive:emi, emissiveIntensity:0.35, shininess:100});
    const knob = new THREE.Mesh(knobGeo, knobMat);
    knob.position.y = 0.22;
    sg.add(knob);

    // preS1 domain on L-form (NTCP binding site)
    if(isL){
      const pGeo = new THREE.SphereGeometry(0.04, 5, 5);
      const pMat = new THREE.MeshPhongMaterial({color:0xfef08a, emissive:0xfde047, emissiveIntensity:0.5});
      const pS1 = new THREE.Mesh(pGeo, pMat);
      pS1.position.y = 0.33;
      sg.add(pS1);
    }

    sg.position.copy(dir.clone().multiplyScalar(2.0));
    sg.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    group.add(sg);
  });

  /* 3 ── NUCLEOCAPSID (icosahedral T=4, ~30 nm) */
  const ncapGeo = new THREE.IcosahedronGeometry(1.35, 2);
  const ncapMat = new THREE.MeshPhongMaterial({
    color: 0xfb923c, emissive: 0xc2410c, emissiveIntensity: 0.15,
    shininess: 40, transparent: true, opacity: 0.18, wireframe: false
  });
  group.add(new THREE.Mesh(ncapGeo, ncapMat));

  // Icosahedral wireframe to show symmetry
  const ncapWireGeo = new THREE.IcosahedronGeometry(1.38, 1);
  const ncapWireMat = new THREE.MeshPhongMaterial({
    color: 0xfb923c, wireframe: true, transparent: true, opacity: 0.1
  });
  group.add(new THREE.Mesh(ncapWireGeo, ncapWireMat));

  // HBcAg capsomere protrusions (T=4 = 240 copies, simplified)
  const capDirs = goldenDirs(48);
  capDirs.forEach(dir => {
    const cg = new THREE.Group();
    const dGeo = new THREE.SphereGeometry(0.055, 6, 6);
    const dMat = new THREE.MeshPhongMaterial({
      color: 0xfcd34d, emissive: 0xf59e0b, emissiveIntensity: 0.4, shininess: 90
    });
    cg.add(new THREE.Mesh(dGeo, dMat));
    cg.position.copy(dir.clone().multiplyScalar(1.4));
    group.add(cg);
  });

  /* 4 ── rcDNA GENOME (relaxed circular = partially ds)
     Long minus strand (complete) + short plus strand (incomplete) */
  // Minus strand (complete circle)
  const minusPts = [];
  for(let t = 0; t <= Math.PI*2; t += 0.08){
    minusPts.push(new THREE.Vector3(Math.cos(t)*0.7, Math.sin(t)*0.3, Math.sin(t)*0.65));
  }
  const minusCurve = new THREE.CatmullRomCurve3(minusPts, true);
  const minusGeo = new THREE.TubeGeometry(minusCurve, 120, 0.022, 5, true);
  const minusMat = new THREE.MeshPhongMaterial({color:0x34d399, emissive:0x059669, emissiveIntensity:0.4, shininess:80});
  group.add(new THREE.Mesh(minusGeo, minusMat));

  // Plus strand (incomplete ~50–80% of circle, gapped)
  const plusPts = [];
  for(let t = 0.3; t <= Math.PI*1.6; t += 0.09){
    const offset = 0.045;
    plusPts.push(new THREE.Vector3(
      Math.cos(t)*(0.7+offset), Math.sin(t)*(0.3+offset*0.4), Math.sin(t)*(0.65+offset*0.9)
    ));
  }
  const plusCurve = new THREE.CatmullRomCurve3(plusPts, false);
  const plusGeo = new THREE.TubeGeometry(plusCurve, 80, 0.018, 5, false);
  const plusMat = new THREE.MeshPhongMaterial({color:0x6ee7b7, emissive:0x34d399, emissiveIntensity:0.35, shininess:70});
  group.add(new THREE.Mesh(plusGeo, plusMat));

  /* 5 ── DNA-P POLYMERASE (covalently attached to minus strand) */
  const polGeo = new THREE.SphereGeometry(0.09, 7, 7);
  const polMat = new THREE.MeshPhongMaterial({
    color: 0xc084fc, emissive: 0x7e22ce, emissiveIntensity: 0.5, shininess: 100
  });
  const pol = new THREE.Mesh(polGeo, polMat);
  pol.position.set(0.7, 0, 0.05);
  group.add(pol);

  // DNA-P domain labels (subtle smaller spheres)
  const polDomains = [
    {pos:[0.68, 0.08, 0.1], col:0xa78bfa},  // RT domain
    {pos:[0.72,-0.07, 0.0], col:0x818cf8},  // RNaseH
  ];
  polDomains.forEach(d => {
    const dg = new THREE.SphereGeometry(0.05, 5, 5);
    const dm = new THREE.MeshPhongMaterial({color:d.col, emissive:d.col, emissiveIntensity:0.4});
    const dm3 = new THREE.Mesh(dg, dm);
    dm3.position.set(...d.pos);
    group.add(dm3);
  });

  scene.add(group);
  return group;
}

/* ═══════════════════════════════════════════════
 * HERO CANVAS — Floating VHB + subviral particles
 * ═══════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('hep-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 35);

  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const l1 = new THREE.PointLight(0xf97316, 2.5, 80); l1.position.set(10,15,20); scene.add(l1);
  const l2 = new THREE.PointLight(0xfbbf24, 1.5, 60); l2.position.set(-10,-10,15); scene.add(l2);
  const l3 = new THREE.PointLight(0xef4444, 1.0, 50); l3.position.set(0,-8,-10); scene.add(l3);

  const N = 52;
  const nodes = [];
  const colors = [0xf97316, 0xfb923c, 0xfbbf24, 0xef4444, 0x34d399];

  for(let i = 0; i < N; i++){
    const isLarge = Math.random() < 0.12;  // Dane particles (42 nm)
    const isMed   = Math.random() < 0.25;  // Subviral spheres (22 nm)
    const r       = isLarge ? Math.random()*.3+0.2 : isMed ? Math.random()*.12+0.07 : Math.random()*.08+0.03;
    const col     = colors[Math.floor(Math.random()*colors.length)];

    let geo;
    if(isLarge){
      // Large = Dane particle (sphere)
      geo = new THREE.SphereGeometry(r, 14, 14);
    } else if(isMed && Math.random() < 0.4){
      // Some subviral = filamentous
      geo = new THREE.CylinderGeometry(r*0.4, r*0.4, r*4, 7);
    } else {
      geo = new THREE.SphereGeometry(r, 8, 8);
    }

    const mat = new THREE.MeshPhongMaterial({
      color: col, emissive: col, emissiveIntensity: isLarge?0.35:0.55,
      shininess: 80, transparent: true, opacity: isLarge?0.65:0.45
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random()-.5)*60, (Math.random()-.5)*40, (Math.random()-.5)*25);
    m.userData = {
      vx:(Math.random()-.5)*.025,
      vy:(Math.random()-.5)*.025,
      vz:(Math.random()-.5)*.012
    };

    // Add HBsAg spikes to large particles
    if(isLarge){
      for(let s = 0; s < 10; s++){
        const phi2 = Math.acos(1-2*(s+.5)/10);
        const th2  = Math.PI*(1+Math.sqrt(5))*s;
        const dir  = new THREE.Vector3(Math.sin(phi2)*Math.cos(th2),Math.sin(phi2)*Math.sin(th2),Math.cos(phi2)).normalize();
        const spGeo = new THREE.SphereGeometry(r*0.15, 4, 4);
        const spMat = new THREE.MeshBasicMaterial({color:0xfbbf24, transparent:true, opacity:0.7});
        const sp = new THREE.Mesh(spGeo, spMat);
        sp.position.copy(dir.clone().multiplyScalar(r*1.18));
        m.add(sp);
      }
    }

    scene.add(m);
    nodes.push(m);
  }

  const lineMat = new THREE.LineBasicMaterial({color:0xf97316, transparent:true, opacity:0.07});
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  let frame = 0;
  function animate(){
    requestAnimationFrame(animate);
    nodes.forEach(n=>{
      n.position.x += n.userData.vx;
      n.position.y += n.userData.vy;
      n.position.z += n.userData.vz;
      n.rotation.y += .003;
      if(Math.abs(n.position.x)>32) n.userData.vx*=-1;
      if(Math.abs(n.position.y)>22) n.userData.vy*=-1;
      if(Math.abs(n.position.z)>14) n.userData.vz*=-1;
    });
    if(++frame%5===0){
      while(lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const d=nodes[i].position.distanceTo(nodes[j].position);
        if(d<8){
          const g=new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(),nodes[j].position.clone()]);
          const l=new THREE.Line(g,lineMat.clone());
          l.material.opacity=(1-d/8)*.09;
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

/* ═══════════════════════════════════════════════
 * MAIN 3D VIEWER
 * ═══════════════════════════════════════════════ */
function initViewer(THREE){
  const canvas = document.getElementById('hep-model-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500, canvas.clientHeight||440);
  renderer.setClearColor(0x0d1120,1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,(canvas.clientWidth||500)/(canvas.clientHeight||440),.1,100);
  camera.position.set(0,0,8);

  scene.add(new THREE.AmbientLight(0xffffff,.35));
  const d1=new THREE.DirectionalLight(0xf97316,2.0); d1.position.set(5,8,5);  scene.add(d1);
  const d2=new THREE.DirectionalLight(0xfbbf24,0.8); d2.position.set(-5,-4,3); scene.add(d2);
  const d3=new THREE.DirectionalLight(0x34d399,0.5); d3.position.set(0,5,8);  scene.add(d3);

  const virusGroup = buildVHB(THREE, scene);

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
    camera.position.z=Math.max(4,Math.min(18,camera.position.z+e.deltaY*.015));
    e.preventDefault();
  },{passive:false});

  function animate(){
    requestAnimationFrame(animate);
    if(virusGroup&&!isDragging){virusGroup.rotation.y+=.004;virusGroup.rotation.x+=.001}
    renderer.render(scene,camera);
  }
  animate();

  const ro=new ResizeObserver(()=>{
    const w=canvas.clientWidth,h=canvas.clientHeight;
    if(w&&h){renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
  });
  ro.observe(canvas);
}

/* ═══════════════════════════════════════════════
 * NAVBAR + REVEALS + COUNTERS
 * ═══════════════════════════════════════════════ */
function initNavbar(){
  const nb=document.getElementById('hep-navbar'),tg=document.getElementById('hepNavToggle'),lk=document.getElementById('hepNavLinks');
  if(nb)window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){tg.addEventListener('click',()=>lk.classList.toggle('active'));lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));}
}

function initReveal(){
  const targets=document.querySelectorAll('.hep-content-card,.hep-struct-card,.hep-epidem-card,.hep-stat-card,.hep-callout,.hep-progress-bar');
  targets.forEach((el,i)=>{
    el.style.opacity='0';el.style.transform='translateY(24px)';
    el.style.transition=`opacity .6s ease ${Math.min(i*.07,.8)}s, transform .6s ease ${Math.min(i*.07,.8)}s`;
  });
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target);}});
  },{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>obs.observe(el));
}

function initCounters(){
  const els=document.querySelectorAll('.hep-stat-val[data-target]');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target,target=parseFloat(el.dataset.target),suffix=el.dataset.suffix||'';
        let cur=0;const step=target/45;
        const timer=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.round(cur)+suffix;if(cur>=target)clearInterval(timer);},22);
        obs.unobserve(el);
      }
    });
  },{threshold:.3});
  els.forEach(el=>obs.observe(el));
}

function init(){
  const THREE=window.THREE;
  if(!THREE){console.error('Three.js failed');return;}
  initNavbar();initHeroCanvas(THREE);initViewer(THREE);initReveal();initCounters();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});
  });
}
})();
