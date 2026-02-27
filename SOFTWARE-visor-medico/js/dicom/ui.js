// ===== UI.JS — Overlays, Metadatos, Cine, Pixel Info =====

// ── Overlays ──────────────────────────────────────────────
function updateOverlays(image, index) {
  const get = tag => { try { return image.data.string(tag) || '—'; } catch(e) { return '—'; } };
  document.getElementById('ov-patient').textContent    = get('x00100010').replace(/\^/g, ' ');
  document.getElementById('ov-dob').textContent        = formatDate(get('x00100030')) !== '—' ? `DOB: ${formatDate(get('x00100030'))}` : '—';
  const sex = get('x00100040');
  document.getElementById('ov-sex').textContent        = sex !== '—' ? `Sexo: ${sex}` : '';
  document.getElementById('ov-series').textContent     = translateFolderName(get('x0008103e') || get('x00080060'));
  document.getElementById('ov-date').textContent       = formatDate(get('x00080020'));
  document.getElementById('ov-institution').textContent = get('x00080080');
  document.getElementById('ov-slice').textContent      = `Corte: ${index+1} / ${loadedImages.length}`;
  const thick = get('x00180050');
  document.getElementById('ov-thickness').textContent  = thick !== '—' ? `Δz: ${thick}mm` : '';
  updateWLOverlay();
}

function updateWLOverlay() {
  try {
    const vp   = cornerstone.getViewport(element);
    const ww   = Math.round(vp?.voi?.windowWidth  || currentWW);
    const wl   = Math.round(vp?.voi?.windowCenter || currentWL);
    const zoom = (vp?.scale || currentZoom).toFixed(1);
    document.getElementById('ov-ww').textContent      = `W:${ww} L:${wl}`;
    document.getElementById('ov-zoom-ov').textContent = `Zoom: ${zoom}x`;
    document.getElementById('tb-ww').textContent      = ww;
    document.getElementById('tb-wl').textContent      = wl;
    document.getElementById('tb-zoom').textContent    = zoom + 'x';
  } catch(e) {}
}

// ── Metadata panel ─────────────────────────────────────────
function updateMetadataPanel(image) {
  const get = (tag, label) => {
    try { const v = image.data.string(tag); return v ? { label, val: v } : null; } catch(e) { return null; }
  };
  const fields = [
    get('x00100010','Paciente'), get('x00100030','Fecha nac.'), get('x00100040','Sexo'),
    get('x00080060','Modalidad'),
    (() => { try { const v = image.data.string('x0008103e'); return v ? { label: 'Serie', val: translateFolderName(v) } : null; } catch(e) { return null; } })(),
    get('x00080020','Fecha estudio'),
    get('x00180050','Grosor corte'), get('x00280030','Pixel Spacing'),
    get('x00280010','Filas'), get('x00280011','Columnas'),
    get('x00280100','Bits'),
    (() => { try { const v = image.data.string('x00181030'); return v ? { label: 'Protocolo', val: translateFolderName(v) } : null; } catch(e) { return null; } })(),
    get('x00080080','Institución'),
  ].filter(Boolean);
  document.getElementById('meta-grid').innerHTML = fields.map(f => `
    <div class="meta-item">
      <div class="meta-key">${f.label}</div>
      <div class="meta-val">${f.val}</div>
    </div>
  `).join('');
  document.getElementById('metadata-panel').style.display = 'block';
}

// ── Series info ────────────────────────────────────────────
function updateSeriesInfo(image, index) {
  const get = tag => { try { return image.data.string(tag) || '—'; } catch(e) { return '—'; } };
  document.getElementById('si-current').textContent   = `${index+1} / ${loadedImages.length}`;
  document.getElementById('si-thickness').textContent = get('x00180050') + ' mm';
  document.getElementById('si-spacing').textContent   = get('x00280030');
  try {
    const rows = image.data.uint16('x00280010') || '—';
    const cols = image.data.uint16('x00280011') || '—';
    document.getElementById('si-dims').textContent = `${cols} × ${rows} px`;
  } catch(e) {}
}

// ── Annotations guide ──────────────────────────────────────
function updateAnnotationsGuide(image) {
  let bodyPart = '', seriesDesc = '';
  try { bodyPart   = (image.data.string('x00180015') || '').toLowerCase(); } catch(e) {}
  try { seriesDesc = (image.data.string('x0008103e') || '').toLowerCase(); } catch(e) {}
  const combined = bodyPart + ' ' + seriesDesc;
  const structures = getStructuresForRegion(combined);
  document.getElementById('annotation-list').innerHTML = structures.map(s => `
    <div class="annotation-item" onclick="toggleAnnotation(this)">
      <div class="ann-name">${s.name}</div>
      <div class="ann-desc">${s.desc}</div>
      <div class="ann-hu">Densidad típica: ${s.hu}</div>
    </div>
  `).join('');
}

function getStructuresForRegion(text) {
  if (text.includes('chest') || text.includes('thorax') || text.includes('lung') || text.includes('torax') || text.includes('pulmon')) {
    return [
      { name: 'Parénquima pulmonar', desc: 'Tejido alveolar aireado. Aparece oscuro por el contenido aéreo. Ventana pulmón C:-600 W:1500.', hu: '-700 a -900 HU' },
      { name: 'Mediastino', desc: 'Espacio central con corazón y grandes vasos. Usar ventana mediastino para visualizar.', hu: '+20 a +60 HU' },
      { name: 'Aorta', desc: 'Con contraste aparece muy hiperdensa. Sin contraste, densidad de sangre.', hu: '+35 a +45 HU' },
      { name: 'Costillas', desc: 'Hueso cortical muy hiperdenso. Médula con grasa hipodensa central.', hu: '+700 a +1000 HU' },
      { name: 'Pleura', desc: 'En condiciones normales no visible. El derrame pleural es hipodenso.', hu: 'No visible (normal)' },
      { name: 'Tráquea', desc: 'Vía aérea central. Contiene aire (hipodensa). Se ve en cortes mediastínicos.', hu: '-1000 HU (luz)' },
    ];
  }
  if (text.includes('abdomen') || text.includes('liver') || text.includes('pancreas')) {
    return [
      { name: 'Hígado', desc: 'Levemente más denso que el bazo. La esteatosis lo hace hipodenso.', hu: '+50 a +70 HU' },
      { name: 'Bazo', desc: 'Ligeramente hipodenso respecto al hígado. Realce homogéneo con contraste.', hu: '+40 a +60 HU' },
      { name: 'Riñones', desc: 'Corteza se diferencia de médula con contraste.', hu: '+30 a +50 HU' },
      { name: 'Aorta abdominal', desc: 'Estructura tubular retroperitoneal.', hu: '+35 HU' },
      { name: 'Grasa mesentérica', desc: 'Grasa intraabdominal hipodensa.', hu: '-30 a -120 HU' },
    ];
  }
  if (text.includes('brain') || text.includes('head') || text.includes('cerebro')) {
    return [
      { name: 'Sustancia gris',  desc: 'Corteza cerebral. Ligeramente más densa que la sustancia blanca.', hu: '+35 a +45 HU' },
      { name: 'Sustancia blanca', desc: 'Axones mielinizados. Menos densa que la sustancia gris.', hu: '+20 a +30 HU' },
      { name: 'LCR', desc: 'Líquido cefalorraquídeo en ventrículos y surcos.', hu: '0 a +15 HU' },
      { name: 'Hemorragia aguda', desc: 'La sangre fresca es hiperdensa en TC sin contraste.', hu: '+50 a +80 HU' },
      { name: 'Hueso craneal', desc: 'Tabla interna/externa muy hiperdensas.', hu: '+700 a +1000 HU' },
    ];
  }
  return [
    { name: 'Hueso cortical', desc: 'Estructura ósea densa.', hu: '+700 a +1900 HU' },
    { name: 'Músculo', desc: 'Tejido muscular estriado.', hu: '+40 a +80 HU' },
    { name: 'Grasa', desc: 'Hipodensa, densidad negativa.', hu: '-30 a -120 HU' },
    { name: 'Agua / LCR', desc: 'Densidad de referencia = 0 HU.', hu: '0 HU' },
  ];
}

function toggleAnnotation(el) {
  document.querySelectorAll('.annotation-item').forEach(a => { if (a !== el) a.classList.remove('active'); });
  el.classList.toggle('active');
}

// ── Pixel info ─────────────────────────────────────────────
function updatePixelInfo(event) {
  if (!loadedImages.length) return;
  try {
    const px    = cornerstone.pageToPixel(element, event.pageX, event.pageY);
    const image = cornerstone.getImage(element);
    if (!image || px.x < 0 || px.y < 0 || px.x >= image.columns || px.y >= image.rows) return;
    const hu = image.getPixelData()[px.y * image.columns + px.x] * image.slope + image.intercept;
    document.getElementById('px-x').textContent      = Math.round(px.x);
    document.getElementById('px-y').textContent      = Math.round(px.y);
    document.getElementById('px-hu').textContent     = Math.round(hu) + ' HU';
    document.getElementById('px-tissue').textContent = huToTissue(hu);
    document.getElementById('tb-hu').textContent     = Math.round(hu) + ' HU';
    document.getElementById('hu-marker').style.left  = Math.max(0, Math.min(100, ((hu + 1000) / 2000) * 100)) + '%';
  } catch(e) {}
}

function huToTissue(hu) {
  if (hu < -900) return 'Aire';
  if (hu < -500) return 'Pulmón (parénquima)';
  if (hu < -100) return 'Grasa';
  if (hu < 20)   return 'Agua / LCR / Quiste';
  if (hu < 50)   return 'Sangre / Partes blandas';
  if (hu < 80)   return 'Músculo / Hígado';
  if (hu < 200)  return 'Sangre con contraste';
  if (hu < 400)  return 'Contraste IV / Calcio';
  return 'Hueso / Metal';
}

// ── Cine ───────────────────────────────────────────────────
function togglePlay() {
  if (!loadedImages.length) return;
  isPlaying = !isPlaying;
  const icon = isPlaying ? '⏸' : '▶';
  ['play-btn','play-btn-bar','tb-play'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = icon; el.classList.toggle('playing', isPlaying); }
  });
  if (isPlaying) {
    playInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadedImages.length;
      displayImage(currentIndex);
    }, 1000 / cineSpeed);
  } else {
    clearInterval(playInterval);
  }
}

function updateSpeed() {
  cineSpeed = parseInt(document.getElementById('speed-slider').value);
  document.getElementById('speed-val').textContent = cineSpeed + ' fps';
  if (isPlaying) {
    clearInterval(playInterval);
    playInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadedImages.length;
      displayImage(currentIndex);
    }, 1000 / cineSpeed);
  }
}

// ── Slice counter ──────────────────────────────────────────
function updateSliceCounter(index) {
  document.getElementById('slice-counter').textContent = `${index+1} / ${loadedImages.length}`;
  document.getElementById('ov-slice').textContent      = `Corte: ${index+1} / ${loadedImages.length}`;
  if (document.getElementById('si-current')) {
    document.getElementById('si-current').textContent  = `${index+1} / ${loadedImages.length}`;
  }
}

// ── Loading ────────────────────────────────────────────────
function showLoading(text) {
  document.getElementById('loading-text').textContent  = text || 'Cargando...';
  document.getElementById('loading-bar').style.width   = '0%';
  document.getElementById('loading-overlay').classList.add('show');
}
function hideLoading() {
  document.getElementById('loading-overlay').classList.remove('show');
}

// ── Helpers ────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr || dateStr === '—') return '—';
  if (dateStr.length === 8) return `${dateStr.substring(0,4)}-${dateStr.substring(4,6)}-${dateStr.substring(6,8)}`;
  return dateStr;
}

// ── Traductor de nombres DICOM ─────────────────────────────
function translateFolderName(name) {
  if (!name) return name;

  // Eliminar prefijos numéricos tipo "3.000000-" o "601.000000-"
  let result = name.replace(/^\d+\.?\d*-/, '').trim();

  // Eliminar sufijos numéricos tipo "-98102" al final
  result = result.replace(/-\d{4,}$/, '').trim();

  // Diccionario de traducciones (orden importa: frases primero, luego palabras)
  const dict = [
    // Frases completas
    ['CT ABDOMEN WITH AND WITHOUT CONTRAST', 'TC Abdomen con y sin Contraste'],
    ['CT CHEST WITH AND WITHOUT CONTRAST',   'TC Tórax con y sin Contraste'],
    ['CT BRAIN WITH AND WITHOUT CONTRAST',   'TC Cerebro con y sin Contraste'],
    ['WITH AND WITHOUT CONTRAST',            'con y sin Contraste'],
    ['WITHOUT IV CONTRAST',                  'sin Contraste IV'],
    ['WITH IV CONTRAST',                     'con Contraste IV'],
    ['WITHOUT CONTRAST',                     'sin Contraste'],
    ['WITH CONTRAST',                        'con Contraste'],
    ['DIAPHRAGM TO CREST',                   'Diafragma a Cresta Ilíaca'],
    ['NEPHRO PHASE',                         'Fase Nefrográfica'],
    ['RENAL MASS',                           'Masa Renal'],
    ['RENAL CORTEX',                         'Corteza Renal'],
    ['SOFT TISSUE',                          'Partes Blandas'],
    ['BONE WINDOW',                          'Ventana Ósea'],
    ['LUNG WINDOW',                          'Ventana Pulmón'],
    ['BRAIN WINDOW',                         'Ventana Cerebro'],
    ['DELAYED PHASE',                        'Fase Tardía'],
    ['PORTAL PHASE',                         'Fase Portal'],
    ['ARTERIAL PHASE',                       'Fase Arterial'],
    ['VENOUS PHASE',                         'Fase Venosa'],
    ['PRE CONTRAST',                         'Pre Contraste'],
    ['POST CONTRAST',                        'Post Contraste'],
    ['CORONAL REFORMAT',                     'Reconstrucción Coronal'],
    ['SAGITTAL REFORMAT',                    'Reconstrucción Sagital'],
    ['AXIAL REFORMAT',                       'Reconstrucción Axial'],
    ['CT ANGIOGRAPHY',                       'Angio-TC'],
    ['CT SCAN',                              'Tomografía Computada'],
    ['WHOLE BODY',                           'Cuerpo Completo'],
    ['SMALL BOWEL',                          'Intestino Delgado'],
    ['LARGE BOWEL',                          'Intestino Grueso'],
    ['UPPER ABDOMEN',                        'Abdomen Superior'],
    ['LOWER ABDOMEN',                        'Abdomen Inferior'],
    ['NECK AND CHEST',                       'Cuello y Tórax'],
    ['CHEST AND ABDOMEN',                    'Tórax y Abdomen'],
    ['ABDOMEN AND PELVIS',                   'Abdomen y Pelvis'],
    ['CHEST ABDOMEN PELVIS',                 'Tórax Abdomen y Pelvis'],
    ['ADRENAL GLANDS',                       'Glándulas Suprarrenales'],
    ['LYMPH NODES',                          'Ganglios Linfáticos'],
    ['BILE DUCT',                            'Vía Biliar'],
    ['GALL BLADDER',                         'Vesícula Biliar'],
    ['URINARY TRACT',                        'Vías Urinarias'],
    ['AORTIC ARCH',                          'Arco Aórtico'],
    ['PULMONARY EMBOLISM',                   'Embolia Pulmonar'],
    ['SPINAL CORD',                          'Médula Espinal'],
    ['BONE MARROW',                          'Médula Ósea'],

    // Palabras individuales (anatomía)
    ['ABDOMEN',       'Abdomen'],
    ['CHEST',         'Tórax'],
    ['THORAX',        'Tórax'],
    ['THORACIC',      'Torácico'],
    ['LUNG',          'Pulmón'],
    ['LUNGS',         'Pulmones'],
    ['BRAIN',         'Cerebro'],
    ['HEAD',          'Cabeza'],
    ['NECK',          'Cuello'],
    ['CERVICAL',      'Cervical'],
    ['SPINE',         'Columna Vertebral'],
    ['LUMBAR',        'Lumbar'],
    ['SACRUM',        'Sacro'],
    ['PELVIS',        'Pelvis'],
    ['PELVIC',        'Pélvico'],
    ['LIVER',         'Hígado'],
    ['HEPATIC',       'Hepático'],
    ['PANCREAS',      'Páncreas'],
    ['PANCREATIC',    'Pancreático'],
    ['KIDNEYS',       'Riñones'],
    ['KIDNEY',        'Riñón'],
    ['RENAL',         'Renal'],
    ['SPLEEN',        'Bazo'],
    ['SPLENIC',       'Esplénico'],
    ['STOMACH',       'Estómago'],
    ['COLON',         'Colon'],
    ['RECTUM',        'Recto'],
    ['BLADDER',       'Vejiga'],
    ['UTERUS',        'Útero'],
    ['OVARY',         'Ovario'],
    ['PROSTATE',      'Próstata'],
    ['AORTA',         'Aorta'],
    ['CARDIAC',       'Cardíaco'],
    ['HEART',         'Corazón'],
    ['CORONARY',      'Coronario'],
    ['FEMUR',         'Fémur'],
    ['KNEE',          'Rodilla'],
    ['SHOULDER',      'Hombro'],
    ['ORBIT',         'Órbita'],
    ['SINUS',         'Senos Paranasales'],
    ['TEMPORAL',      'Temporal'],
    ['FACIAL',        'Facial'],
    ['MANDIBLE',      'Mandíbula'],
    ['THYROID',       'Tiroides'],

    // Tipos de imagen / técnica
    ['SCOUT',         'Imagen de Localización'],
    ['LOCALIZER',     'Localizador'],
    ['TOPOGRAM',      'Topograma'],
    ['CORONAL',       'Coronal'],
    ['SAGITTAL',      'Sagital'],
    ['AXIAL',         'Axial'],
    ['OBLIQUE',       'Oblicuo'],
    ['REFORMATTED',   'Reformateado'],
    ['RECONSTRUCTION','Reconstrucción'],
    ['MPR',           'Reconstrucción Multiplanar'],
    ['MIP',           'Proyección de Máxima Intensidad'],
    ['VRT',           'Reconstrucción Volumétrica'],
    ['3D',            '3D'],
    ['PHASE',         'Fase'],
    ['SERIES',        'Serie'],
    ['SEQUENCE',      'Secuencia'],
    ['ENHANCED',      'con Realce'],
    ['UNENHANCED',    'sin Realce'],
    ['PLAIN',         'Simple'],
    ['NATIVE',        'Nativo'],
    ['DYNAMIC',       'Dinámico'],
    ['DELAYED',       'Tardío'],
    ['PORTAL',        'Portal'],
    ['ARTERIAL',      'Arterial'],
    ['VENOUS',        'Venoso'],
    ['NEPHROGRAPHIC', 'Nefrográfico'],
    ['NEPHROGRAPHIC', 'Nefrográfico'],
    ['EXCRETORY',     'Excretor'],
    ['CONTRAST',      'Contraste'],
    ['NON-CONTRAST',  'sin Contraste'],
    ['WO',            'sin Contraste'],
    ['W',             'con Contraste'],
    ['AP',            'AP'],
    ['COR',           'Coronal'],
    ['SAG',           'Sagital'],
    ['AX',            'Axial'],
    ['NA',            ''],
  ];

  // Aplicar traducciones (insensible a mayúsculas)
  let upper = result.toUpperCase();
  for (const [en, es] of dict) {
    const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    upper = upper.replace(regex, es);
    result = result.replace(regex, es);
  }

  // Limpiar espacios múltiples y guiones sobrantes
  result = result.replace(/\s{2,}/g, ' ').replace(/^[-\s]+|[-\s]+$/g, '').trim();

  // Capitalizar primera letra
  return result.charAt(0).toUpperCase() + result.slice(1);
}