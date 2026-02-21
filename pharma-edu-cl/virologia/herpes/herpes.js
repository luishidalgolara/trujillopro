/* ===== HSV — PHARMALAB CHILE ===== */
/* herpes.js — Three.js 3D HSV (Partícula Dane) + hero canvas */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* HSV VIRION 3D — 4 layers: envelope/tegument/capsid/DNA */
function buildHSV(THREE, scene){
  const group=new THREE.Group();
  function fib(n){return Array.from({length:n},(_,i)=>{const phi=Math.acos(1-2*(i+.5)/n),th=Math.PI*(1+Math.sqrt(5))*i;return new THREE.Vector3(Math.sin(phi)*Math.cos(th),Math.sin(phi)*Math.sin(th),Math.cos(phi)).normalize()});}
  const M=(c,e,ei,s,tr,op,w)=>new THREE.MeshPhongMaterial({color:c,emissive:e,emissiveIntensity:ei,shininess:s||80,transparent:!!tr,opacity:op||1,wireframe:!!w,side:THREE.DoubleSide});
  /* 1. ENVELOPE */
  group.add(new THREE.Mesh(new THREE.SphereGeometry(2.1,48,48),M(0x831843,0x500724,.25,40,true,.22)));
  /* 2. GLYCOPROTEINS */
  fib(88).forEach((dir,i)=>{
    const sg=new THREE.Group();
    sg.add(new THREE.Mesh(new THREE.CylinderGeometry(.018,.025,.32,5),M(0xec4899,0x9d174d,.35)));
    const isGB=(i%5===0),col=isGB?0xec4899:(i%7===0?0xf472b6:0xa855f7);
    if(isGB){for(let t=0;t<3;t++){const a=(t/3)*Math.PI*2,lp=new THREE.Mesh(new THREE.SphereGeometry(.065,6,6),M(col,col,.35));lp.position.set(Math.cos(a)*.08,.18,Math.sin(a)*.08);sg.add(lp);}}
    else{const hp=new THREE.Mesh(new THREE.SphereGeometry(.08,7,7),M(col,col,.35));hp.position.y=.18;sg.add(hp);}
    sg.position.copy(dir.clone().multiplyScalar(2.1));sg.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);group.add(sg);
  });
  /* 3. TEGUMENT (VP16, VHS, ICP0) */
  group.add(new THREE.Mesh(new THREE.SphereGeometry(1.72,30,30),M(0xf472b6,0x831843,.1,20,true,.14)));
  fib(55).forEach(dir=>{const tp=new THREE.Mesh(new THREE.SphereGeometry(.06+Math.random()*.06,5,5),M(0xfda4af,0xec4899,.25,60,true,.4));tp.position.copy(dir.clone().multiplyScalar(1.6+Math.random()*.12));group.add(tp);});
  /* 4. CAPSID T=16 (VP5 hexons/pentons) */
  group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.35,3),M(0xa855f7,0x6d28d9,.18,60,true,.22)));
  group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.37,2),M(0xc084fc,0xc084fc,.1,80,true,.12,true)));
  fib(120).forEach((dir,i)=>{const cg=new THREE.Group();const isPent=(i<12),n=isPent?5:6,r=isPent?.05:.045,col=isPent?0xfbbf24:0xc084fc;
    for(let s=0;s<n;s++){const a=(s/n)*Math.PI*2,sm=new THREE.Mesh(new THREE.SphereGeometry(r,5,5),M(col,col,.4));sm.position.set(Math.cos(a)*r*2.2,0,Math.sin(a)*r*2.2);cg.add(sm);}
    cg.position.copy(dir.clone().multiplyScalar(1.38));cg.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);group.add(cg);
  });
  /* Portal complex UL6 (12-mer at one vertex) */
  const pv=new THREE.Vector3(-1,1.618,0).normalize().multiplyScalar(1.4);
  for(let p=0;p<12;p++){const a=(p/12)*Math.PI*2,pm=new THREE.Mesh(new THREE.SphereGeometry(.028,5,5),M(0x34d399,0x059669,.5));pm.position.set(pv.x+Math.cos(a)*.09,pv.y,pv.z+Math.sin(a)*.09);group.add(pm);}
  /* 5. dsDNA GENOME 152 kb — dense toroidal coils */
  for(let loop=0;loop<9;loop++){
    const lr=.28+loop*.1,pts=[];
    for(let t=0;t<=Math.PI*2;t+=.1)pts.push(new THREE.Vector3(Math.cos(t)*lr,(loop-.5)*.09+Math.sin(t*3)*.05,Math.sin(t)*lr));
    const c=new THREE.CatmullRomCurve3(pts,true);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(c,80,.012,4,true),M(0x34d399,0x047857,.35,70,true,.85)));
  }
  for(let loop=0;loop<4;loop++){
    const lr=.38+loop*.16,pts=[];
    for(let t=.2;t<=Math.PI*2+.2;t+=.12)pts.push(new THREE.Vector3(Math.cos(t+.18)*(lr),(.04+Math.sin(t*3+.5)*.04),Math.sin(t+.18)*(lr)));
    const c=new THREE.CatmullRomCurve3(pts,true);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(c,60,.009,4,true),M(0x6ee7b7,0x34d399,.3,70,true,.65)));
  }
  scene.add(group);
  return group;
}


/* ═══════════════════════════════════════════════
 * HERO CANVAS — Floating VHB + subviral particles
 * ═══════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas = document.getElementById('hsv-hero-canvas');
  if(!canvas) return;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 35);

  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const l1 = new THREE.PointLight(0xec4899, 2.5, 80); l1.position.set(10,15,20); scene.add(l1);
  const l2 = new THREE.PointLight(0xa855f7, 1.5, 60); l2.position.set(-10,-10,15); scene.add(l2);
  const l3 = new THREE.PointLight(0xf472b6, 1.0, 50); l3.position.set(0,-8,-10); scene.add(l3);

  const N = 52;
  const nodes = [];
  const colors = [0xec4899, 0xf472b6, 0xa855f7, 0xc084fc, 0x34d399];

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

  const lineMat = new THREE.LineBasicMaterial({color:0xec4899, transparent:true, opacity:0.07});
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
  const canvas = document.getElementById('hsv-model-canvas');
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

  const virusGroup = buildHSV(THREE, scene);

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
  const nb=document.getElementById('hsv-navbar'),tg=document.getElementById('hsvNavToggle'),lk=document.getElementById('hsvNavLinks');
  if(nb)window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){tg.addEventListener('click',()=>lk.classList.toggle('active'));lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')));}
}

function initReveal(){
  const targets=document.querySelectorAll('.hsv-content-card,.hsv-struct-card,.hsv-neuro-card,.hsv-stat-card,.hsv-callout,.hsv-react-timeline');
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
  const els=document.querySelectorAll('.hsv-stat-val[data-target]');
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
