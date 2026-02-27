// ===== MAIN.JS =====

let catalog = null;
let currentCollection = null;
let currentSlice = 25;
let currentWindow = { center: -600, width: 1500 };
let annotationsVisible = true;
let infoVisible = false;
let currentTool = 'pan';
let zoomLevel = 1.0;

async function init() {
  try {
    const res = await fetch('data/catalog.json');
    catalog = await res.json();
  } catch(e) {
    catalog = { collections: [] };
  }
  renderAnatomySystems();
  setupViewer();
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  const idx = ['library','viewer','anatomy','quiz'].indexOf(name);
  document.querySelectorAll('.nav-btn')[idx]?.classList.add('active');
  if (name === 'viewer' && currentCollection) loadCollectionIntoViewer(currentCollection);
  if (name === 'quiz') initQuiz();
}

function setupViewer() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const container = document.getElementById('viewer-canvas-container');
  if (!container) return;
  container.addEventListener('wheel', function(e) {
    e.preventDefault();
    const maxSlice = parseInt(document.getElementById('slice-slider').max);
    currentSlice = Math.max(0, Math.min(maxSlice, currentSlice + (e.deltaY > 0 ? 1 : -1)));
    document.getElementById('slice-slider').value = currentSlice;
    updateSlice(currentSlice);
  });
  drawEmptyViewer();
}

function resizeCanvas() {
  const canvas = document.getElementById('main-canvas');
  if (!canvas) return;
  const container = document.getElementById('viewer-canvas-container');
  const size = Math.min(container.clientWidth, container.clientHeight) - 40;
  canvas.width = size; canvas.height = size;
  if (currentCollection) drawDemoVisualization(currentCollection);
  else drawEmptyViewer();
}

function updateSlice(val) {
  currentSlice = parseInt(val);
  const max = parseInt(document.getElementById('slice-slider').max);
  document.getElementById('slice-value').textContent = currentSlice + '/' + (max + 1);
  document.getElementById('overlay-slice').textContent = 'Corte: ' + currentSlice + '/' + (max + 1);
  if (currentCollection) drawDemoVisualization(currentCollection);
}

function toggleAnnotations() {
  annotationsVisible = !annotationsVisible;
  document.getElementById('btn-annotations').classList.toggle('active', annotationsVisible);
  document.getElementById('annotations-overlay').style.display = annotationsVisible ? 'block' : 'none';
  if (annotationsVisible && currentCollection) drawAnnotationPins(currentCollection);
}

function toggleInfo() {
  infoVisible = !infoVisible;
  document.getElementById('tech-info-panel').style.display = infoVisible ? 'block' : 'none';
  document.getElementById('btn-info').classList.toggle('active', infoVisible);
}

function resetView() {
  zoomLevel = 1.0;
  document.getElementById('overlay-zoom').textContent = 'Zoom: 1.0x';
  if (currentCollection) drawDemoVisualization(currentCollection);
  else drawEmptyViewer();
}

function selectPhase(index) {
  document.querySelectorAll('.series-item').forEach(function(el, i) {
    el.classList.toggle('active', i === index);
  });
  if (currentCollection)
    document.getElementById('overlay-series').textContent =
      currentCollection.name + ' · ' + currentCollection.phases[index];
}

function highlightPhase(el) {
  document.querySelectorAll('.phase-tag').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
}

function setWindow(type, btn) {
  document.querySelectorAll('.window-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  setWindowPreset(type);
  if (currentCollection) drawDemoVisualization(currentCollection);
}

function setWindowPreset(type) {
  var presets = { lung:{center:-600,width:1500}, mediastinum:{center:40,width:400}, bone:{center:350,width:1500}, abdomen:{center:60,width:350} };
  currentWindow = presets[type] || presets.lung;
  document.getElementById('overlay-window').textContent = 'W:' + currentWindow.width + ' C:' + currentWindow.center;
}

function setTool(tool, btn) {
  currentTool = tool;
  document.querySelectorAll('.tool-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var names = { pan:'Mover', zoom:'Zoom', window:'Ventana/Nivel', measure:'Medir' };
  document.getElementById('overlay-tool').textContent = 'Herramienta: ' + (names[tool] || tool);
}

document.addEventListener('DOMContentLoaded', function() { init(); });