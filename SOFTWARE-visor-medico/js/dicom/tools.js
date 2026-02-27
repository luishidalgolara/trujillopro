// ===== TOOLS.JS — Herramientas y Windowing =====

function activateTool(toolName, btn) {
  try {
    ['Wwwc','Zoom','Pan','Length','Angle','Probe','EllipticalRoi','RectangleRoi'].forEach(t => {
      try { cornerstoneTools.setToolPassive(t); } catch(e) {}
    });
    cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
    activeTool = toolName;
  } catch(e) {}
  document.querySelectorAll('.tool-btn, .tb-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function applyWindow(center, width, btn) {
  currentWL = center;
  currentWW = width;
  document.querySelectorAll('.window-item').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('ww-slider').value  = width;
  document.getElementById('wl-slider').value  = center;
  document.getElementById('ww-val').textContent = width;
  document.getElementById('wl-val').textContent = center;
  applyViewportWL();
}

function manualWindow() {
  currentWW = parseInt(document.getElementById('ww-slider').value);
  currentWL = parseInt(document.getElementById('wl-slider').value);
  document.getElementById('ww-val').textContent = currentWW;
  document.getElementById('wl-val').textContent = currentWL;
  document.querySelectorAll('.window-item').forEach(b => b.classList.remove('active'));
  applyViewportWL();
}

function manualZoom() {
  currentZoom = parseInt(document.getElementById('zoom-slider').value) / 100;
  document.getElementById('zoom-val').textContent = currentZoom.toFixed(1) + 'x';
  try {
    const vp  = cornerstone.getViewport(element);
    vp.scale  = currentZoom;
    cornerstone.setViewport(element, vp);
  } catch(e) {}
  updateWLOverlay();
}

function applyViewportWL() {
  if (!loadedImages.length) return;
  try {
    const vp = cornerstone.getViewport(element);
    vp.voi.windowWidth  = currentWW;
    vp.voi.windowCenter = currentWL;
    cornerstone.setViewport(element, vp);
    updateWLOverlay();
  } catch(e) {}
}

function resetView() {
  if (!loadedImages.length) return;
  try {
    cornerstone.reset(element);
    currentZoom = 1.0;
    document.getElementById('zoom-slider').value       = 100;
    document.getElementById('zoom-val').textContent    = '1.0x';
    updateWLOverlay();
  } catch(e) {}
}

function invertImage() {
  if (!loadedImages.length) return;
  isInverted = !isInverted;
  try {
    const vp   = cornerstone.getViewport(element);
    vp.invert  = isInverted;
    cornerstone.setViewport(element, vp);
  } catch(e) {}
}

function clearAnnotations() {
  try {
    ['Length','Angle','Probe','EllipticalRoi','RectangleRoi'].forEach(t => {
      cornerstoneTools.clearToolState(element, t);
    });
    cornerstone.updateImage(element);
  } catch(e) {}
}
