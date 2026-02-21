/* ===== SARS-CoV-2 — PHARMALAB CHILE ===== */
/* sars.js — Three.js 3D coronavirus model + interactions */

(function(){
'use strict';

function loadScript(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;document.head.appendChild(s)}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',init);

/* ═══════════════════════════════════════════════
 * BUILD SARS-CoV-2 VIRION
 * Based on cryo-EM structures (PDB: 6VXX, 6VSB)
 * ═══════════════════════════════════════════════ */
function buildCoronavirus(THREE,scene){
  const group=new THREE.Group();

  // 1. Lipid envelope
  const envGeo=new THREE.SphereGeometry(2.0,48,48);
  const envMat=new THREE.MeshPhongMaterial({color:0x1a6b8a,emissive:0x0a3344,emissiveIntensity:.3,shininess:60,transparent:true,opacity:.3,side:THREE.DoubleSide});
  group.add(new THREE.Mesh(envGeo,envMat));

  // 2. M protein lattice (wireframe inner)
  const mGeo=new THREE.SphereGeometry(1.85,28,28);
  const mMat=new THREE.MeshPhongMaterial({color:0x00d4ff,wireframe:true,transparent:true,opacity:.08});
  group.add(new THREE.Mesh(mGeo,mMat));

  // 3. Nucleocapsid (N) — helical ribonucleoprotein inside
  const ncPoints=[];
  for(let t=0;t<Math.PI*8;t+=.12){
    const r=.6+Math.sin(t*2)*.2;
    ncPoints.push(new THREE.Vector3(Math.cos(t)*r,t*.15-1.2,Math.sin(t)*r));
  }
  const ncCurve=new THREE.CatmullRomCurve3(ncPoints);
  const ncGeo=new THREE.TubeGeometry(ncCurve,120,.06,8,false);
  const ncMat=new THREE.MeshPhongMaterial({color:0xffaa00,emissive:0xff8800,emissiveIntensity:.3,shininess:80});
  group.add(new THREE.Mesh(ncGeo,ncMat));

  // 4. Spike (S) glycoproteins — trimeric mushroom shape
  const spikeCount=72;
  for(let i=0;i<spikeCount;i++){
    const phi=Math.acos(1-2*(i+.5)/spikeCount);
    const theta=Math.PI*(1+Math.sqrt(5))*i;
    const x=Math.sin(phi)*Math.cos(theta);
    const y=Math.sin(phi)*Math.sin(theta);
    const z=Math.cos(phi);
    const dir=new THREE.Vector3(x,y,z).normalize();

    const spikeG=new THREE.Group();

    // S2 stalk
    const stalkGeo=new THREE.CylinderGeometry(.03,.03,.7,6);
    const stalkMat=new THREE.MeshPhongMaterial({color:0xff4466,emissive:0xcc2244,emissiveIntensity:.2,shininess:60});
    const stalk=new THREE.Mesh(stalkGeo,stalkMat);
    stalk.position.y=.35;
    spikeG.add(stalk);

    // S1 head (3 lobes = trimer)
    const headMat=new THREE.MeshPhongMaterial({color:0xff6688,emissive:0xff3355,emissiveIntensity:.3,shininess:100,specular:0x444444});
    for(let l=0;l<3;l++){
      const angle=(l/3)*Math.PI*2;
      const headGeo=new THREE.SphereGeometry(.1,8,8);
      const head=new THREE.Mesh(headGeo,headMat.clone());
      head.position.set(Math.cos(angle)*.08,.75,Math.sin(angle)*.08);
      spikeG.add(head);
    }
    // Central crown
    const crownGeo=new THREE.SphereGeometry(.06,6,6);
    const crown=new THREE.Mesh(crownGeo,headMat.clone());
    crown.position.y=.82;
    spikeG.add(crown);

    const surfacePos=dir.clone().multiplyScalar(2.0);
    spikeG.position.copy(surfacePos);
    spikeG.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
    group.add(spikeG);
  }

  // 5. E protein (small ion channels, fewer)
  for(let i=0;i<12;i++){
    const phi=Math.acos(1-2*(i+.5)/12);
    const theta=Math.PI*(1+Math.sqrt(5))*i+1.5;
    const dir=new THREE.Vector3(Math.sin(phi)*Math.cos(theta),Math.sin(phi)*Math.sin(theta),Math.cos(phi)).normalize();
    const eGeo=new THREE.CylinderGeometry(.04,.04,.25,5);
    const eMat=new THREE.MeshPhongMaterial({color:0xa855f7,emissive:0x7733cc,emissiveIntensity:.3});
    const e=new THREE.Mesh(eGeo,eMat);
    const pos=dir.clone().multiplyScalar(2.05);
    e.position.copy(pos);
    e.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
    group.add(e);
  }

  scene.add(group);
  return group;
}

/* ═══════════════════════════════════════════════
 * HERO CANVAS
 * ═══════════════════════════════════════════════ */
function initHeroCanvas(THREE){
  const canvas=document.getElementById('sars-hero-canvas');
  if(!canvas)return;

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,200);
  camera.position.set(0,0,35);

  const l1=new THREE.PointLight(0x00d4ff,2.5,80);l1.position.set(10,15,20);scene.add(l1);
  const l2=new THREE.PointLight(0xff3355,1.5,60);l2.position.set(-10,-10,15);scene.add(l2);
  scene.add(new THREE.AmbientLight(0xffffff,.2));

  const N=50,nodes=[],colors=[0x00d4ff,0x00aadd,0xff3355,0xa855f7,0x00e87b];
  for(let i=0;i<N;i++){
    const isL=Math.random()<.12;
    const r=isL?Math.random()*.35+.2:Math.random()*.15+.05;
    const col=colors[Math.floor(Math.random()*colors.length)];
    const geo=new THREE.SphereGeometry(r,isL?14:8,isL?14:8);
    const mat=new THREE.MeshPhongMaterial({color:col,emissive:col,emissiveIntensity:isL?.4:.6,shininess:80,transparent:true,opacity:isL?.6:.4});
    const m=new THREE.Mesh(geo,mat);
    m.position.set((Math.random()-.5)*60,(Math.random()-.5)*40,(Math.random()-.5)*25);
    m.userData={vx:(Math.random()-.5)*.025,vy:(Math.random()-.5)*.025,vz:(Math.random()-.5)*.012};
    if(isL){
      for(let s=0;s<10;s++){
        const phi2=Math.acos(1-2*(s+.5)/10);
        const th2=Math.PI*(1+Math.sqrt(5))*s;
        const dir=new THREE.Vector3(Math.sin(phi2)*Math.cos(th2),Math.sin(phi2)*Math.sin(th2),Math.cos(phi2)).normalize();
        const sG=new THREE.CylinderGeometry(.012,.012,r*.5,4);
        const sM=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.5});
        const sp=new THREE.Mesh(sG,sM);
        sp.position.copy(dir.clone().multiplyScalar(r+r*.25));
        sp.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
        m.add(sp);
        const tG=new THREE.SphereGeometry(.03,4,4);
        const tip=new THREE.Mesh(tG,sM.clone());
        tip.position.copy(dir.clone().multiplyScalar(r+r*.55));
        m.add(tip);
      }
    }
    scene.add(m);nodes.push(m);
  }

  const lineMat=new THREE.LineBasicMaterial({color:0x00d4ff,transparent:true,opacity:.08});
  const lineGroup=new THREE.Group();scene.add(lineGroup);

  let frame=0;
  function animate(){
    requestAnimationFrame(animate);
    nodes.forEach(n=>{
      n.position.x+=n.userData.vx;n.position.y+=n.userData.vy;n.position.z+=n.userData.vz;
      n.rotation.y+=.002;
      if(Math.abs(n.position.x)>32)n.userData.vx*=-1;
      if(Math.abs(n.position.y)>22)n.userData.vy*=-1;
      if(Math.abs(n.position.z)>14)n.userData.vz*=-1;
    });
    if(++frame%5===0){
      while(lineGroup.children.length)lineGroup.remove(lineGroup.children[0]);
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const d=nodes[i].position.distanceTo(nodes[j].position);
        if(d<8){const g=new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(),nodes[j].position.clone()]);const l=new THREE.Line(g,lineMat.clone());l.material.opacity=(1-d/8)*.12;lineGroup.add(l)}
      }
    }
    renderer.render(scene,camera);
  }
  animate();
  window.addEventListener('resize',()=>{renderer.setSize(window.innerWidth,window.innerHeight);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix()});
}

/* ═══════════════════════════════════════════════
 * MAIN 3D VIEWER
 * ═══════════════════════════════════════════════ */
function initViewer(THREE){
  const canvas=document.getElementById('sars-model-canvas');
  if(!canvas)return;

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth||500,canvas.clientHeight||440);
  renderer.setClearColor(0x0d1120,1);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(45,canvas.clientWidth/canvas.clientHeight,.1,100);
  camera.position.set(0,0,8);

  scene.add(new THREE.AmbientLight(0xffffff,.35));
  const d1=new THREE.DirectionalLight(0x00d4ff,1.5);d1.position.set(5,8,5);scene.add(d1);
  const d2=new THREE.DirectionalLight(0xff3355,.8);d2.position.set(-5,-4,3);scene.add(d2);
  const d3=new THREE.DirectionalLight(0xffaa00,.4);d3.position.set(0,5,8);scene.add(d3);

  const virusGroup=buildCoronavirus(THREE,scene);

  let isDragging=false,prevX=0,prevY=0;
  canvas.addEventListener('mousedown',e=>{isDragging=true;prevX=e.clientX;prevY=e.clientY});
  canvas.addEventListener('touchstart',e=>{isDragging=true;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY},{passive:true});
  window.addEventListener('mouseup',()=>{isDragging=false});
  window.addEventListener('touchend',()=>{isDragging=false});
  canvas.addEventListener('mousemove',e=>{if(!isDragging||!virusGroup)return;virusGroup.rotation.y+=(e.clientX-prevX)*.008;virusGroup.rotation.x+=(e.clientY-prevY)*.008;prevX=e.clientX;prevY=e.clientY});
  canvas.addEventListener('touchmove',e=>{if(!isDragging||!virusGroup)return;virusGroup.rotation.y+=(e.touches[0].clientX-prevX)*.008;virusGroup.rotation.x+=(e.touches[0].clientY-prevY)*.008;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY},{passive:true});
  canvas.addEventListener('wheel',e=>{camera.position.z=Math.max(4,Math.min(18,camera.position.z+e.deltaY*.015));e.preventDefault()},{passive:false});

  function animate(){
    requestAnimationFrame(animate);
    if(virusGroup&&!isDragging){virusGroup.rotation.y+=.004;virusGroup.rotation.x+=.001}
    renderer.render(scene,camera);
  }
  animate();

  const ro=new ResizeObserver(()=>{const w=canvas.clientWidth,h=canvas.clientHeight;if(w&&h){renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}});
  ro.observe(canvas);
}

/* ═══════════════════════════════════════════════
 * NAVBAR + REVEALS + COUNTERS
 * ═══════════════════════════════════════════════ */
function initNavbar(){
  const nb=document.getElementById('sars-navbar'),tg=document.getElementById('sarsNavToggle'),lk=document.getElementById('sarsNavLinks');
  if(nb)window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
  if(tg&&lk){tg.addEventListener('click',()=>lk.classList.toggle('active'));lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('active')))}
}

function initReveal(){
  const targets=document.querySelectorAll('.sars-content-card,.sars-struct-card,.sars-variant-card,.sars-stat-card,.sars-callout');
  targets.forEach((el,i)=>{el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition=`opacity .6s ease ${Math.min(i*.07,.8)}s, transform .6s ease ${Math.min(i*.07,.8)}s`});
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(el=>obs.observe(el));
}

function initCounters(){
  const els=document.querySelectorAll('.sars-stat-val[data-target]');
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target,target=parseFloat(el.dataset.target),suffix=el.dataset.suffix||'';let cur=0;const step=target/45,timer=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.round(cur)+suffix;if(cur>=target)clearInterval(timer)},22);obs.unobserve(el)}})},{threshold:.3});
  els.forEach(el=>obs.observe(el));
}

function init(){
  const THREE=window.THREE;if(!THREE){console.error('Three.js failed');return}
  initNavbar();initHeroCanvas(THREE);initViewer(THREE);initReveal();initCounters();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});
}
})();