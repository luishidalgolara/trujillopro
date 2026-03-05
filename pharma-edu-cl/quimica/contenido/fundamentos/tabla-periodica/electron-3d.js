/* ============================================
   ELECTRON 3D — Modelo de Bohr Interactivo
   Three.js — modal independiente
   ============================================ */

(function() {
  'use strict';

  var scene, camera, renderer, animId;
  var electronGroups = [];
  var modalEl, backdropEl;
  var threeLoaded = false;

  var SHELL_COLORS = [
    0x00e5a0, 0x5b8dee, 0xf0a030, 0xe056a0, 0xaa88ee, 0x44cc88, 0xff6b6b
  ];
  var SHELL_NAMES = ['K','L','M','N','O','P','Q'];

  /* ── Load Three.js ── */
  function loadThree(cb) {
    if (window.THREE) { threeLoaded = true; return cb(); }
    if (threeLoaded) return cb();
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = function() { threeLoaded = true; cb(); };
    document.head.appendChild(s);
  }

  /* ── Create modal DOM ── */
  function createModal() {
    if (document.getElementById('electronModal')) return;

    backdropEl = document.createElement('div');
    backdropEl.className = 'electron-modal-backdrop';
    backdropEl.addEventListener('click', closeModal);

    modalEl = document.createElement('div');
    modalEl.className = 'electron-modal';
    modalEl.id = 'electronModal';
    modalEl.innerHTML =
      '<div class="electron-modal-header">' +
        '<div class="electron-modal-title">' +
          '<span class="em-symbol" id="em3dSymbol">H</span>' +
          '<div class="em-info">' +
            '<span class="em-name" id="em3dName">Hidrógeno</span>' +
            '<span class="em-config" id="em3dConfig">1s¹</span>' +
          '</div>' +
        '</div>' +
        '<button class="electron-modal-close" id="em3dClose">✕</button>' +
      '</div>' +
      '<div class="electron-canvas-wrap" id="em3dCanvas"></div>' +
      '<div class="electron-shell-info" id="em3dShells"></div>';

    document.body.appendChild(backdropEl);
    document.body.appendChild(modalEl);

    document.getElementById('em3dClose').addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });
  }

  /* ── Open Modal (exposed globally) ── */
  function openModal(z) {
    createModal();
    loadThree(function() {
      var el = null;
      if (window.E) {
        for (var i = 0; i < E.length; i++) {
          if (E[i][0] === z) { el = E[i]; break; }
        }
      }
      var data = window.ELEMENT_DATA ? ELEMENT_DATA[z] : null;
      if (!el || !data) { console.warn('electron-3d: no data for Z=' + z); return; }

      document.getElementById('em3dSymbol').textContent = el[1];
      document.getElementById('em3dName').textContent = el[2];
      document.getElementById('em3dConfig').textContent = el[7];

      // Shell badges
      var shellsHTML = '';
      for (var s = 0; s < data.shells.length; s++) {
        var c = '#' + SHELL_COLORS[s].toString(16).padStart(6,'0');
        shellsHTML += '<div class="shell-badge" style="border-color:' + c + '22">' +
          '<span class="shell-label">' + SHELL_NAMES[s] + '</span>' +
          '<span class="shell-count" style="color:' + c + '">' + data.shells[s] + '</span></div>';
      }
      shellsHTML += '<span style="margin-left:auto;font-size:.7rem;color:rgba(255,255,255,.25)">Arrastra para rotar · Scroll para zoom</span>';
      document.getElementById('em3dShells').innerHTML = shellsHTML;

      // Show
      backdropEl.classList.add('visible');
      modalEl.classList.add('visible');

      // Close detail panel if open
      if (typeof closeDetail === 'function') closeDetail();

      setTimeout(function() { buildScene(z, el, data); }, 80);
    });
  }

  /* ── Close Modal ── */
  function closeModal() {
    if (backdropEl) backdropEl.classList.remove('visible');
    if (modalEl) modalEl.classList.remove('visible');
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    disposeScene();
  }

  /* ── Build Scene ── */
  function buildScene(z, el, data) {
    disposeScene();
    var container = document.getElementById('em3dCanvas');
    if (!container) return;
    var W = container.clientWidth;
    var H = container.clientHeight;
    if (!W || !H) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0e1a, 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    var p1 = new THREE.PointLight(0x00e5a0, 1.5, 50); p1.position.set(5,5,5); scene.add(p1);
    var p2 = new THREE.PointLight(0x5b8dee, 0.8, 50); p2.position.set(-5,-3,5); scene.add(p2);

    // Nucleus
    var nucGeo = new THREE.SphereGeometry(0.55, 32, 32);
    var nucMat = new THREE.MeshPhongMaterial({ color:0x00e5a0, emissive:0x00e5a0, emissiveIntensity:0.6, shininess:80 });
    var nucleus = new THREE.Mesh(nucGeo, nucMat);
    scene.add(nucleus);

    // Nucleus glow
    var glowGeo = new THREE.SphereGeometry(0.75, 32, 32);
    var glowMat = new THREE.MeshBasicMaterial({ color:0x00e5a0, transparent:true, opacity:0.12 });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Shells
    electronGroups = [];
    var shells = data.shells;
    var maxShell = shells.length;

    // Deterministic tilt patterns per shell (so each element looks different but consistent)
    var SHELL_TILTS = [
      { rx: Math.PI/2, rz: 0 },                    // K: flat equatorial
      { rx: Math.PI/3, rz: Math.PI/4 },             // L: tilted
      { rx: Math.PI/2.5, rz: Math.PI/2 },           // M: perpendicular
      { rx: Math.PI/6, rz: Math.PI/3 },             // N: steep
      { rx: Math.PI/2, rz: Math.PI/5 },             // O: slight tilt
      { rx: Math.PI/4, rz: Math.PI/1.5 },           // P: wide
      { rx: Math.PI/3.5, rz: Math.PI/6 }            // Q: narrow
    ];

    for (var si = 0; si < shells.length; si++) {
      var eCount = shells[si];
      if (eCount === 0) continue;
      var sRadius = 1.8 + si * 1.4;
      var color = SHELL_COLORS[si] || 0xffffff;
      var baseTilt = SHELL_TILTS[si] || { rx: Math.PI/2, rz: 0 };

      // Variable number of orbit rings based on electron count in shell
      var nRings = eCount <= 2 ? 1 : (eCount <= 8 ? 2 : 3);
      for (var r = 0; r < nRings; r++) {
        var ringGeo = new THREE.RingGeometry(sRadius - 0.015, sRadius + 0.015, 128);
        var ringMat = new THREE.MeshBasicMaterial({ color:color, transparent:true, opacity:0.12, side:THREE.DoubleSide });
        var ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = baseTilt.rx + r * (Math.PI / (nRings + 1));
        ring.rotation.z = baseTilt.rz + r * 0.8;
        scene.add(ring);
      }

      // Electrons - size decreases slightly for outer shells
      var group = new THREE.Group();
      var eSz = Math.max(0.08, 0.18 - si * 0.012);
      var eGeo = new THREE.SphereGeometry(eSz, 16, 16);

      for (var e = 0; e < eCount; e++) {
        var eMat = new THREE.MeshPhongMaterial({ color:color, emissive:color, emissiveIntensity:0.7, shininess:100 });
        var electron = new THREE.Mesh(eGeo, eMat);

        // Glow
        var egGeo = new THREE.SphereGeometry(eSz * 1.7, 12, 12);
        var egMat = new THREE.MeshBasicMaterial({ color:color, transparent:true, opacity:0.15 });
        electron.add(new THREE.Mesh(egGeo, egMat));

        // Deterministic orbit plane per electron within the shell
        var planeIndex = e % nRings;
        var tiltX = baseTilt.rx + planeIndex * (Math.PI / (nRings + 1));
        var tiltY = baseTilt.rz + planeIndex * 0.8;

        electron.userData = {
          shellRadius: sRadius,
          angle: (Math.PI * 2 / eCount) * e,
          speed: (0.6 + (e % 3) * 0.15) / (si + 1),
          tiltX: tiltX, tiltY: tiltY
        };
        group.add(electron);
      }
      scene.add(group);
      electronGroups.push(group);
    }

    // Camera - adapt to element size
    var camDist = 6 + maxShell * 2.0;
    camera.position.set(0, 2, camDist);

    // Mouse controls
    var isDrag = false, prevM = {x:0,y:0};
    var theta = 0, phi = Math.PI/6, dist = camDist;
    var cvs = renderer.domElement;

    function gp(ev) { var t = ev.touches ? ev.touches[0] : ev; return {x:t.clientX,y:t.clientY}; }
    cvs.addEventListener('mousedown', function(ev) { isDrag=true; prevM=gp(ev); });
    cvs.addEventListener('touchstart', function(ev) { isDrag=true; prevM=gp(ev); }, {passive:true});
    window.addEventListener('mouseup', function() { isDrag=false; });
    window.addEventListener('touchend', function() { isDrag=false; });
    cvs.addEventListener('mousemove', function(ev) {
      if(!isDrag) return; var p=gp(ev);
      theta -= (p.x-prevM.x)*0.008;
      phi = Math.max(-1.4,Math.min(1.4, phi-(p.y-prevM.y)*0.008));
      prevM=p;
    });
    cvs.addEventListener('touchmove', function(ev) {
      if(!isDrag) return; var p=gp(ev);
      theta -= (p.x-prevM.x)*0.008;
      phi = Math.max(-1.4,Math.min(1.4, phi-(p.y-prevM.y)*0.008));
      prevM=p;
    }, {passive:true});
    cvs.addEventListener('wheel', function(ev) {
      ev.preventDefault();
      dist = Math.max(5,Math.min(30, dist+ev.deltaY*0.01));
    }, {passive:false});

    // Animation
    var clock = new THREE.Clock();
    function animate() {
      animId = requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      camera.position.x = dist*Math.sin(theta)*Math.cos(phi);
      camera.position.y = dist*Math.sin(phi);
      camera.position.z = dist*Math.cos(theta)*Math.cos(phi);
      camera.lookAt(0,0,0);

      // Nucleus pulse
      var s = 1+Math.sin(t*2)*0.04;
      nucleus.scale.set(s,s,s);

      // Electrons orbit
      for (var g=0; g<electronGroups.length; g++) {
        var grp = electronGroups[g];
        for (var i=0; i<grp.children.length; i++) {
          var elec = grp.children[i];
          var d = elec.userData;
          d.angle += d.speed * 0.02;
          var x = d.shellRadius * Math.cos(d.angle);
          var y = d.shellRadius * Math.sin(d.angle);
          elec.position.x = x*Math.cos(d.tiltY) - y*Math.sin(d.tiltX)*Math.sin(d.tiltY);
          elec.position.y = y*Math.cos(d.tiltX);
          elec.position.z = x*Math.sin(d.tiltY) + y*Math.sin(d.tiltX)*Math.cos(d.tiltY);
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    var ro = new ResizeObserver(function() {
      var w=container.clientWidth, h=container.clientHeight;
      if(w&&h) { camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); }
    });
    ro.observe(container);
    cvs._ro = ro;
  }

  /* ── Dispose ── */
  function disposeScene() {
    electronGroups = [];
    if (renderer) {
      var c = renderer.domElement;
      if (c && c._ro) c._ro.disconnect();
      renderer.dispose(); renderer = null;
    }
    if (scene) {
      scene.traverse(function(obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(function(m){m.dispose();});
          else obj.material.dispose();
        }
      });
      scene = null;
    }
  }

  /* ── Expose globally ── */
  window.openElectron3D = openModal;

})();