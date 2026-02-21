/* ============================================================
   gc-modal.js — PharmaLab Chile | Galería Química General
   Mini canvas de tarjetas + Modal 3D interactivo + Filtros
   Depende de: gc-data.js, gc-state.js, gc-renderers.js
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════════════════════
   MINI CANVAS (tarjetas de la galería)
   ═══════════════════════════════════════════════════════════ */
function initMiniCanvas() {
  document.querySelectorAll('.gc-mini-canvas').forEach(canvas => {
    const id = parseInt(canvas.dataset.id);
    const data = CELL_DATA[id];
    if (!data) return;
    canvas.width  = canvas.offsetWidth  * devicePixelRatio || 290;
    canvas.height = canvas.offsetHeight * devicePixelRatio || 180;
    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const w = canvas.offsetWidth  || 290;
    const h = canvas.offsetHeight || 180;
    let t = 0;
    const renderFn = Renderers[data.render];
    function loop() {
      t += 16;
      if (renderFn) renderFn(ctx, w, h, t, 0.2, t * 0.0004, 0.55);
      const raf = requestAnimationFrame(loop);
      miniAnims.push(raf);
    }
    loop();
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL 3D
   ═══════════════════════════════════════════════════════════ */
function openModal(id) {
  currentModalId = id;
  const data = CELL_DATA[id];
  if (!data) return;

  document.getElementById('gcModalTag').textContent   = data.tag;
  document.getElementById('gcModalTitle').textContent = data.name;
  document.getElementById('gcModalDesc').textContent  = data.desc;
  document.getElementById('gcModalFunc').textContent  = data.func;
  document.getElementById('gcModalCanvasLabel').textContent = `⟳ Arrastra para rotar · ${data.name}`;
  document.getElementById('gcModalCounter').textContent = `${id + 1} / ${CELL_DATA.length}`;

  // Datos clave
  const datosEl = document.getElementById('gcModalDatos');
  datosEl.innerHTML = data.datos.map(d =>
    `<div class="gc-modal-dato">
      <span class="gc-modal-dato-val">${d.val}</span>
      <span class="gc-modal-dato-key">${d.key}</span>
    </div>`
  ).join('');

  // Componentes
  const compsEl = document.getElementById('gcModalComps');
  compsEl.innerHTML = data.componentes.map(c =>
    `<span class="gc-comp-tag ${c.color}">${c.name}</span>`
  ).join('');

  // Navegación
  document.getElementById('btnPrev').disabled = id === 0;
  document.getElementById('btnNext').disabled = id === CELL_DATA.length - 1;

  // Abrir overlay
  const overlay = document.getElementById('gcModal');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';

  setTimeout(() => startModalCanvas(data), 50);
}

function closeModal(event, force = false) {
  if (!force && event && event.target !== document.getElementById('gcModal')) return;
  const overlay = document.getElementById('gcModal');
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 350);
  document.body.style.overflow = '';
  if (modalAnim) { cancelAnimationFrame(modalAnim); modalAnim = null; }
}

function navigateModal(dir) {
  const newId = currentModalId + dir;
  if (newId < 0 || newId >= CELL_DATA.length) return;
  if (modalAnim) { cancelAnimationFrame(modalAnim); modalAnim = null; }
  openModal(newId);
}

function toggleAutoRotate() {
  autoRotate = !autoRotate;
  document.getElementById('btnRotate').classList.toggle('active', autoRotate);
}

function resetView() { rotX = 0.3; rotY = 0; zoom = 1; }

/* ─── Canvas modal con interacción drag ─── */
function startModalCanvas(data) {
  if (modalAnim) { cancelAnimationFrame(modalAnim); modalAnim = null; }
  const canvas = document.getElementById('gcModalCanvas');
  if (!canvas) return;
  const dpr = devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const renderFn = Renderers[data.render];
  if (!renderFn) return;
  let t2 = 0;
  function loop() {
    t2 += 16;
    if (autoRotate) rotY += 0.008;
    ctx.clearRect(0, 0, w, h);
    renderFn(ctx, w, h, t2, rotX, rotY, zoom);
    modalAnim = requestAnimationFrame(loop);
  }
  loop();

  // Eventos drag ratón
  canvas.onmousedown = e => { isDragging = true; lastMouseX = e.clientX; lastMouseY = e.clientY; };
  window.onmousemove = e => {
    if (!isDragging) return;
    rotY += (e.clientX - lastMouseX) * 0.012;
    rotX += (e.clientY - lastMouseY) * 0.012;
    rotX = Math.max(-1.2, Math.min(1.2, rotX));
    lastMouseX = e.clientX; lastMouseY = e.clientY;
  };
  window.onmouseup = () => { isDragging = false; };

  // Touch
  canvas.ontouchstart = e => { isDragging = true; lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY; e.preventDefault(); };
  canvas.ontouchmove  = e => {
    if (!isDragging) return;
    rotY += (e.touches[0].clientX - lastMouseX) * 0.012;
    rotX += (e.touches[0].clientY - lastMouseY) * 0.012;
    rotX = Math.max(-1.2, Math.min(1.2, rotX));
    lastMouseX = e.touches[0].clientX; lastMouseY = e.touches[0].clientY;
    e.preventDefault();
  };
  canvas.ontouchend = () => { isDragging = false; };

  // Scroll zoom
  canvas.onwheel = e => {
    zoom += e.deltaY > 0 ? -0.08 : 0.08;
    zoom = Math.max(0.5, Math.min(2, zoom));
    e.preventDefault();
  };
}

/* ─── Teclado ─── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')      closeModal(null, true);
  if (e.key === 'ArrowRight')  navigateModal(1);
  if (e.key === 'ArrowLeft')   navigateModal(-1);
});

/* ═══════════════════════════════════════════════════════════
   FILTROS DE GALERÍA
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.gc-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gc-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gc-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});
