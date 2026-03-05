/* ============================================
   ORBITALS 3D — Nubes de probabilidad s, p, d, f
   Extensión del modal electron-3d.js
   Fases +/- (rojo/azul), ejes XYZ, números cuánticos
   ============================================ */

(function() {
  'use strict';

  var orbScene, orbCamera, orbRenderer, orbAnimId;
  var orbitalMeshes = [];

  var PHASE_POS = 0xdd3333;  // red = positive phase
  var PHASE_NEG = 0x3366dd;  // blue = negative phase

  var SUBSHELL_ORDER = ['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p','6s','4f','5d','6p','7s','5f','6d','7p'];
  var SUBSHELL_MAX = { s:2, p:6, d:10, f:14 };
  var L_LABELS = { s:0, p:1, d:2, f:3 };

  /* ── Get HOAO (Highest Occupied Atomic Orbital) ── */
  function getHOAO(z) {
    var remaining = z, last = null;
    for (var i = 0; i < SUBSHELL_ORDER.length; i++) {
      if (remaining <= 0) break;
      var sub = SUBSHELL_ORDER[i];
      var type = sub.slice(-1);
      var max = SUBSHELL_MAX[type];
      var count = Math.min(remaining, max);
      last = { name: sub, type: type, n: parseInt(sub[0]), l: L_LABELS[type], count: count, max: max };
      remaining -= count;
    }
    return last;
  }

  /* ── Compute m value for HOAO ── */
  function getM(hoao) {
    var l = hoao.l;
    var mValues = [];
    for (var m = -l; m <= l; m++) mValues.push(m);
    var orbitalCount = 2 * l + 1;
    var idx = (hoao.count - 1) % orbitalCount;
    return mValues[idx];
  }

  /* ── Create XYZ Axes ── */
  function createAxes(sc, size) {
    var axisData = [
      { dir: [1,0,0], label: '+X' },
      { dir: [0,1,0], label: '+Z' },
      { dir: [0,0,1], label: '+Y' }
    ];
    for (var i = 0; i < axisData.length; i++) {
      var a = axisData[i];
      var pts = [
        new THREE.Vector3(-a.dir[0]*size*0.3, -a.dir[1]*size*0.3, -a.dir[2]*size*0.3),
        new THREE.Vector3(a.dir[0]*size, a.dir[1]*size, a.dir[2]*size)
      ];
      var lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      var lineMat = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.25 });
      var line = new THREE.Line(lineGeo, lineMat);
      sc.add(line); orbitalMeshes.push(line);

      // Tip cone
      var coneGeo = new THREE.ConeGeometry(0.06, 0.2, 8);
      var coneMat = new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.35 });
      var cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(a.dir[0]*size, a.dir[1]*size, a.dir[2]*size);
      if (a.dir[0] === 1) cone.rotation.z = -Math.PI/2;
      else if (a.dir[2] === 1) cone.rotation.x = Math.PI/2;
      sc.add(cone); orbitalMeshes.push(cone);

      // Label sprite
      var canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 32;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 20px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(a.label, 32, 22);
      var tex = new THREE.CanvasTexture(canvas);
      var spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      var sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.2, 0.6, 1);
      sprite.position.set(a.dir[0]*(size+0.5), a.dir[1]*(size+0.5), a.dir[2]*(size+0.5));
      sc.add(sprite); orbitalMeshes.push(sprite);
    }
  }

  /* ── Nucleus ── */
  function createNucleus(sc, z) {
    var r = 0.15 + Math.min(z, 100) * 0.002;
    var geo = new THREE.SphereGeometry(r, 32, 32);
    var mat = new THREE.MeshPhongMaterial({ color: 0xcccccc, emissive: 0x444444, emissiveIntensity: 0.5, shininess: 80 });
    sc.add(new THREE.Mesh(geo, mat));
    var glowGeo = new THREE.SphereGeometry(r * 1.8, 32, 32);
    var glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    sc.add(new THREE.Mesh(glowGeo, glowMat));
  }

  /* ── S Orbital: sphere ── */
  function makeSOrbital(sc, n, opacity) {
    var r = 0.5 + n * 0.55;
    var geo = new THREE.SphereGeometry(r, 48, 48);
    var mat = new THREE.MeshPhongMaterial({
      color: PHASE_POS, transparent: true, opacity: opacity * 0.45,
      side: THREE.DoubleSide, depthWrite: false, shininess: 30
    });
    sc.add(new THREE.Mesh(geo, mat));
    var wMat = new THREE.MeshBasicMaterial({ color: PHASE_POS, wireframe: true, transparent: true, opacity: opacity * 0.06 });
    sc.add(new THREE.Mesh(geo.clone(), wMat));
  }

  /* ── P Orbital: two lobes red/blue ── */
  function makePOrbital(sc, n, m, opacity) {
    var sz = 0.5 + n * 0.4;
    var elongation = 2.2;
    var offset = sz * elongation * 0.7;
    var phases = [PHASE_POS, PHASE_NEG];
    var sides = [1, -1];

    for (var i = 0; i < 2; i++) {
      var geo = new THREE.SphereGeometry(sz, 32, 32);
      geo.scale(0.5, elongation, 0.5);
      var mat = new THREE.MeshPhongMaterial({
        color: phases[i], transparent: true, opacity: opacity * 0.5,
        side: THREE.DoubleSide, depthWrite: false, shininess: 40
      });
      var lobe = new THREE.Mesh(geo, mat);

      if (m === 0) {
        lobe.position.y = sides[i] * offset;
      } else if (m === 1) {
        lobe.position.x = sides[i] * offset;
        lobe.rotation.z = Math.PI / 2;
      } else {
        lobe.position.z = sides[i] * offset;
        lobe.rotation.x = Math.PI / 2;
      }
      sc.add(lobe); orbitalMeshes.push(lobe);
    }
  }

  /* ── D Orbital: dz² (toroid+lobes) or cloverleaf ── */
  function makeDOrbital(sc, n, m, opacity) {
    var sz = 0.4 + n * 0.3;

    if (m === 0) {
      // dz²: two axial lobes + toroid
      var lobeSz = sz * 0.9;
      for (var side = -1; side <= 1; side += 2) {
        var geo = new THREE.SphereGeometry(lobeSz, 32, 32);
        geo.scale(0.5, 1.8, 0.5);
        var mat = new THREE.MeshPhongMaterial({
          color: side > 0 ? PHASE_POS : PHASE_NEG, transparent: true,
          opacity: opacity * 0.5, side: THREE.DoubleSide, depthWrite: false, shininess: 40
        });
        var lobe = new THREE.Mesh(geo, mat);
        lobe.position.y = side * lobeSz * 1.6;
        sc.add(lobe); orbitalMeshes.push(lobe);
      }
      // Toroid ring
      var torusGeo = new THREE.TorusGeometry(lobeSz * 1.2, lobeSz * 0.35, 24, 48);
      var torusMat = new THREE.MeshPhongMaterial({
        color: PHASE_NEG, transparent: true, opacity: opacity * 0.35,
        side: THREE.DoubleSide, depthWrite: false, shininess: 30
      });
      var torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = Math.PI / 2;
      sc.add(torus); orbitalMeshes.push(torus);
    } else {
      // Cloverleaf: 4 lobes
      var rotAngle = 0;
      if (m === -1) rotAngle = Math.PI / 4;

      var g = new THREE.Group();
      for (var i = 0; i < 4; i++) {
        var angle = (Math.PI / 2) * i + rotAngle;
        var geo = new THREE.SphereGeometry(sz * 0.7, 24, 24);
        geo.scale(0.45, 1.6, 0.45);
        var phase = (i % 2 === 0) ? PHASE_POS : PHASE_NEG;
        var mat = new THREE.MeshPhongMaterial({
          color: phase, transparent: true, opacity: opacity * 0.45,
          side: THREE.DoubleSide, depthWrite: false, shininess: 40
        });
        var lobe = new THREE.Mesh(geo, mat);
        var dist = sz * 1.5;
        lobe.position.x = Math.cos(angle) * dist;
        lobe.position.y = Math.sin(angle) * dist;
        lobe.rotation.z = angle - Math.PI / 2;
        g.add(lobe); orbitalMeshes.push(lobe);
      }
      if (Math.abs(m) === 2) g.rotation.x = Math.PI / 2;
      sc.add(g);
    }
  }

  /* ── F Orbital: complex multi-lobe ── */
  function makeFOrbital(sc, n, m, opacity) {
    var sz = 0.3 + n * 0.2;
    var g = new THREE.Group();

    if (m === 0) {
      // fz³: axial lobes + toroid
      for (var side = -1; side <= 1; side += 2) {
        for (var layer = 0; layer < 2; layer++) {
          var geo = new THREE.SphereGeometry(sz * 0.6, 20, 20);
          geo.scale(0.4, 1.4, 0.4);
          var phase = ((layer + (side > 0 ? 0 : 1)) % 2 === 0) ? PHASE_POS : PHASE_NEG;
          var mat = new THREE.MeshPhongMaterial({
            color: phase, transparent: true, opacity: opacity * 0.4,
            side: THREE.DoubleSide, depthWrite: false, shininess: 30
          });
          var lobe = new THREE.Mesh(geo, mat);
          lobe.position.y = side * (1.0 + layer * 1.5) * sz;
          g.add(lobe); orbitalMeshes.push(lobe);
        }
      }
      var tGeo = new THREE.TorusGeometry(sz * 0.9, sz * 0.25, 16, 32);
      var tMat = new THREE.MeshPhongMaterial({
        color: PHASE_NEG, transparent: true, opacity: opacity * 0.25,
        side: THREE.DoubleSide, depthWrite: false
      });
      var tor = new THREE.Mesh(tGeo, tMat);
      tor.rotation.x = Math.PI / 2;
      g.add(tor); orbitalMeshes.push(tor);
    } else {
      // 8 lobes cubic
      var positions = [
        [1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],
        [-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]
      ];
      for (var i = 0; i < 8; i++) {
        var geo = new THREE.SphereGeometry(sz * 0.6, 16, 16);
        geo.scale(0.4, 0.4, 1.4);
        var phase = (i % 2 === 0) ? PHASE_POS : PHASE_NEG;
        var mat = new THREE.MeshPhongMaterial({
          color: phase, transparent: true, opacity: opacity * 0.35,
          side: THREE.DoubleSide, depthWrite: false, shininess: 30
        });
        var lobe = new THREE.Mesh(geo, mat);
        var d = sz * 1.8;
        lobe.position.set(positions[i][0]*d, positions[i][1]*d, positions[i][2]*d);
        lobe.lookAt(positions[i][0]*10, positions[i][1]*10, positions[i][2]*10);
        g.add(lobe); orbitalMeshes.push(lobe);
      }
    }
    var rotations = [
      [0,0,0],[Math.PI/4,0,0],[0,Math.PI/4,0],[0,0,Math.PI/4],
      [Math.PI/3,Math.PI/6,0],[0,Math.PI/3,Math.PI/6],[Math.PI/6,0,Math.PI/3]
    ];
    var ri = Math.min(Math.abs(m), rotations.length - 1);
    g.rotation.set(rotations[ri][0], rotations[ri][1], rotations[ri][2]);
    sc.add(g);
  }

  /* ── Update quantum numbers in panel ── */
  function updateQuantumInfo(hoao, m) {
    var shellInfo = document.getElementById('em3dShells');
    if (!shellInfo) return;
    var old = shellInfo.querySelector('.orbital-quantum-info');
    if (old) old.remove();

    var div = document.createElement('div');
    div.className = 'orbital-quantum-info';
    div.style.cssText = 'display:flex;gap:14px;align-items:center;margin-left:auto;';
    div.innerHTML =
      '<span style="font-family:\'JetBrains Mono\',monospace;font-size:.78rem;color:rgba(255,255,255,.5)">HOAO: <strong style="color:#00e5a0">' + hoao.name + '<sup>' + hoao.count + '</sup></strong></span>' +
      '<span style="font-family:\'JetBrains Mono\',monospace;font-size:.72rem;color:rgba(255,255,255,.4)">' +
      'n=' + hoao.n + ', l=' + hoao.l + ', m=' + m + '</span>';
    shellInfo.appendChild(div);
  }

  /* ── Build Scene ── */
  function buildOrbitalScene(z) {
    disposeOrb();
    var container = document.getElementById('em3dCanvas');
    if (!container) return;
    var W = container.clientWidth, H = container.clientHeight;
    if (!W || !H) return;

    orbScene = new THREE.Scene();
    orbCamera = new THREE.PerspectiveCamera(50, W/H, 0.1, 1000);

    orbRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    orbRenderer.setSize(W, H);
    orbRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    orbRenderer.setClearColor(0x0a0e1a, 1);
    container.innerHTML = '';
    container.appendChild(orbRenderer.domElement);

    orbScene.add(new THREE.AmbientLight(0xffffff, 0.6));
    var l1 = new THREE.PointLight(0xffffff, 0.8, 50); l1.position.set(5,5,5); orbScene.add(l1);
    var l2 = new THREE.PointLight(0xffffff, 0.4, 50); l2.position.set(-4,-3,4); orbScene.add(l2);
    var l3 = new THREE.PointLight(0xffffff, 0.3, 50); l3.position.set(0,-5,-3); orbScene.add(l3);

    createNucleus(orbScene, z);

    var hoao = getHOAO(z);
    if (!hoao) return;
    var m = getM(hoao);

    var axisSize = 2.5 + hoao.n * 0.8;
    createAxes(orbScene, axisSize);

    var op = Math.max(0.5, hoao.count / hoao.max);

    if (hoao.type === 's') makeSOrbital(orbScene, hoao.n, op);
    else if (hoao.type === 'p') makePOrbital(orbScene, hoao.n, m, op);
    else if (hoao.type === 'd') makeDOrbital(orbScene, hoao.n, m, op);
    else if (hoao.type === 'f') makeFOrbital(orbScene, hoao.n, m, op);

    updateQuantumInfo(hoao, m);

    var camDist = 5 + hoao.n * 1.8;
    var theta = Math.PI/6, phi = Math.PI/7, dist = camDist;
    var isDrag = false, prev = {x:0, y:0};
    var cvs = orbRenderer.domElement;
    function gp(ev) { var t = ev.touches ? ev.touches[0] : ev; return {x:t.clientX, y:t.clientY}; }
    cvs.addEventListener('mousedown', function(e) { isDrag=true; prev=gp(e); });
    cvs.addEventListener('touchstart', function(e) { isDrag=true; prev=gp(e); }, {passive:true});
    window.addEventListener('mouseup', function() { isDrag=false; });
    window.addEventListener('touchend', function() { isDrag=false; });
    cvs.addEventListener('mousemove', function(e) {
      if(!isDrag) return; var p=gp(e);
      theta -= (p.x-prev.x)*0.008;
      phi = Math.max(-1.4, Math.min(1.4, phi-(p.y-prev.y)*0.008));
      prev=p;
    });
    cvs.addEventListener('touchmove', function(e) {
      if(!isDrag) return; var p=gp(e);
      theta -= (p.x-prev.x)*0.008;
      phi = Math.max(-1.4, Math.min(1.4, phi-(p.y-prev.y)*0.008));
      prev=p;
    }, {passive:true});
    cvs.addEventListener('wheel', function(e) {
      e.preventDefault();
      dist = Math.max(3, Math.min(25, dist+e.deltaY*0.01));
    }, {passive:false});

    function animate() {
      orbAnimId = requestAnimationFrame(animate);
      theta += 0.003;
      orbCamera.position.x = dist*Math.sin(theta)*Math.cos(phi);
      orbCamera.position.y = dist*Math.sin(phi);
      orbCamera.position.z = dist*Math.cos(theta)*Math.cos(phi);
      orbCamera.lookAt(0,0,0);
      orbRenderer.render(orbScene, orbCamera);
    }
    animate();

    var ro = new ResizeObserver(function() {
      var w=container.clientWidth, h=container.clientHeight;
      if(w&&h) { orbCamera.aspect=w/h; orbCamera.updateProjectionMatrix(); orbRenderer.setSize(w,h); }
    });
    ro.observe(container);
    cvs._ro = ro;
  }

  /* ── Dispose ── */
  function disposeOrb() {
    orbitalMeshes = [];
    if (orbAnimId) cancelAnimationFrame(orbAnimId); orbAnimId = null;
    if (orbRenderer) {
      var c = orbRenderer.domElement;
      if (c && c._ro) c._ro.disconnect();
      orbRenderer.dispose(); orbRenderer = null;
    }
    if (orbScene) {
      orbScene.traverse(function(o) {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(function(m) { m.dispose(); });
          else o.material.dispose();
        }
        if (o.material && o.material.map) o.material.map.dispose();
      });
      orbScene = null;
    }
    var shellInfo = document.getElementById('em3dShells');
    if (shellInfo) {
      var old = shellInfo.querySelector('.orbital-quantum-info');
      if (old) old.remove();
    }
  }

  /* ── Inject view toggle when modal opens ── */
  function watchModal() {
    var observer = new MutationObserver(function() {
      var modal = document.getElementById('electronModal');
      if (!modal || !modal.classList.contains('visible')) return;
      var shellInfo = document.getElementById('em3dShells');
      if (!shellInfo || shellInfo.querySelector('.electron-view-toggle')) return;

      var toggle = document.createElement('div');
      toggle.className = 'electron-view-toggle';
      toggle.innerHTML =
        '<button class="electron-view-btn active" data-view="bohr">⚛ Bohr</button>' +
        '<button class="electron-view-btn" data-view="orbital">☁ Orbitales</button>';
      shellInfo.appendChild(toggle);

      var currentView = 'bohr';
      toggle.addEventListener('click', function(e) {
        var btn = e.target.closest('.electron-view-btn');
        if (!btn) return;
        var view = btn.dataset.view;
        if (view === currentView) return;
        currentView = view;
        toggle.querySelectorAll('.electron-view-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var sym = document.getElementById('em3dSymbol').textContent;
        var el = null;
        if (window.E) for (var i = 0; i < E.length; i++) { if (E[i][1] === sym) { el = E[i]; break; } }
        if (!el) return;

        if (view === 'orbital') {
          buildOrbitalScene(el[0]);
        } else {
          disposeOrb();
          if (window.openElectron3D) window.openElectron3D(el[0]);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
  }

  watchModal();

})();