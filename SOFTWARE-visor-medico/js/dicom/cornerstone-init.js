// ===== CORNERSTONE-INIT.JS — Inicialización de Cornerstone =====

const element = document.getElementById('dicom-element');

let loadedImages  = [];
let sliceLocations = [];
let currentIndex  = 0;
let isPlaying     = false;
let playInterval  = null;
let isInverted    = false;
let currentWW     = 1500;
let currentWL     = -600;
let currentZoom   = 1.0;
let activeTool    = 'Wwwc';
let cineSpeed     = 10;

const ANATOMY_REGIONS = [
  { label: 'Cráneo',        pct: [0.00, 0.12] },
  { label: 'Cara',          pct: [0.10, 0.18] },
  { label: 'Cuello',        pct: [0.17, 0.25] },
  { label: 'Tórax sup.',    pct: [0.24, 0.35] },
  { label: 'Tórax medio',   pct: [0.33, 0.44] },
  { label: 'Tórax inf.',    pct: [0.42, 0.52] },
  { label: 'Abdomen sup.',  pct: [0.50, 0.60] },
  { label: 'Abdomen inf.',  pct: [0.58, 0.68] },
  { label: 'Pelvis',        pct: [0.66, 0.78] },
  { label: 'Muslos',        pct: [0.76, 0.87] },
  { label: 'Rodillas',      pct: [0.85, 0.92] },
  { label: 'Piernas',       pct: [0.90, 1.00] },
];

// Init Cornerstone
cornerstone.enable(element);

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser  = dicomParser;
cornerstoneWADOImageLoader.configure({ useWebWorkers: false });

cornerstoneTools.external.cornerstone      = cornerstone;
cornerstoneTools.external.cornerstoneMath  = cornerstoneMath;
cornerstoneTools.external.Hammer           = null;
cornerstoneTools.init({ showSVGCursors: true });

const toolsToAdd = [
  cornerstoneTools.WwwcTool,
  cornerstoneTools.ZoomTool,
  cornerstoneTools.PanTool,
  cornerstoneTools.LengthTool,
  cornerstoneTools.AngleTool,
  cornerstoneTools.ProbeTool,
  cornerstoneTools.EllipticalRoiTool,
  cornerstoneTools.RectangleRoiTool,
  cornerstoneTools.StackScrollMouseWheelTool,
];
toolsToAdd.forEach(tool => { try { cornerstoneTools.addTool(tool); } catch(e) {} });
try { cornerstoneTools.setToolActive('StackScrollMouseWheel', {}); } catch(e) {}
cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
