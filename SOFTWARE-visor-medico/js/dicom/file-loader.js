// ===== FILE-LOADER.JS — Carga de archivos DICOM =====

function switchTab(mode) {
  if (mode === 'folder') {
    document.getElementById('tab-folder').classList.add('active');
    document.getElementById('tab-files').classList.remove('active');
    document.getElementById('drop-zone').style.display = '';
    document.getElementById('drop-zone-files').style.display = 'none';
  } else {
    document.getElementById('tab-files').classList.add('active');
    document.getElementById('tab-folder').classList.remove('active');
    document.getElementById('drop-zone').style.display = 'none';
    document.getElementById('drop-zone-files').style.display = '';
  }
}

async function loadFiles(event) {
  let files = Array.from(event.target.files).filter(f =>
    f.name.toLowerCase().endsWith('.dcm') || !f.name.includes('.')
  );
  if (files.length === 0) { alert('No se encontraron archivos .dcm en la selección.'); return; }

  showLoading(`Indexando ${files.length} archivos...`);
  loadedImages   = [];
  sliceLocations = [];

  const fileData = [];
  for (let i = 0; i < files.length; i++) {
    const file    = files[i];
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    let sliceLoc  = null;

    try {
      const buf       = await file.slice(0, 4096).arrayBuffer();
      const byteArray = new Uint8Array(buf);
      const ds        = dicomParser.parseDicom(byteArray, { untilTag: '00200037' });
      try { sliceLoc = parseFloat(ds.string('x00201041')); } catch(e) {}
      if (isNaN(sliceLoc) || sliceLoc === null) {
        try {
          const ipp = ds.string('x00200032');
          if (ipp) sliceLoc = parseFloat(ipp.split('\\')[2]);
        } catch(e) {}
      }
    } catch(e) {}

    if (sliceLoc === null || isNaN(sliceLoc)) sliceLoc = i;
    fileData.push({ file, imageId, sliceLoc, name: file.name });

    const pct = Math.round((i / files.length) * 50);
    document.getElementById('loading-bar').style.width = pct + '%';
    document.getElementById('loading-text').textContent = `Indexando ${i+1}/${files.length}...`;
  }

  fileData.sort((a, b) => a.sliceLoc - b.sliceLoc);

  const fileList = document.getElementById('file-list');
  fileList.innerHTML = '';
  for (let i = 0; i < fileData.length; i++) {
    const fd = fileData[i];
    loadedImages.push({ imageId: fd.imageId, name: fd.name });
    sliceLocations.push(fd.sliceLoc);
    const item = document.createElement('div');
    item.className = 'file-item' + (i === 0 ? ' active' : '');
    item.id = `file-item-${i}`;
    item.innerHTML = `<span class="file-num">${i+1}</span><span class="file-name">${fd.name}</span>`;
    item.onclick = () => goToSlice(i);
    fileList.appendChild(item);
  }

  const slider = document.getElementById('slice-slider');
  slider.max   = loadedImages.length - 1;
  slider.value = 0;
  updateSliceCounter(0);

  const folderName = files[0].webkitRelativePath
    ? files[0].webkitRelativePath.split('/')[0]
    : (files[0].name || '');
  const seriesNameES = translateFolderName(folderName);

  const badge = document.getElementById('series-badge');
  badge.textContent   = `${loadedImages.length} cortes · ${seriesNameES}`;
  badge.style.display = 'inline-block';

  const headerTitle = document.querySelector('.header-title');
  if (headerTitle) headerTitle.textContent = seriesNameES || 'Visor DICOM — Cornerstone.js';

  document.getElementById('loading-bar').style.width  = '70%';
  document.getElementById('loading-text').textContent = 'Cargando primera imagen...';

  await displayImage(0);
  document.getElementById('loading-bar').style.width = '100%';
  setTimeout(hideLoading, 300);

  document.getElementById('empty-state').style.display        = 'none';
  document.getElementById('instructions-panel').style.display = 'none';
  document.getElementById('pixel-panel').style.display        = 'block';
  document.getElementById('annotations-guide').style.display  = 'block';
  document.getElementById('series-info-panel').style.display  = 'block';
  document.getElementById('si-total').textContent             = loadedImages.length;
}

// Drag & drop
function setupDropZones() {
  ['drop-zone', 'drop-zone-files'].forEach(id => {
    const zone = document.getElementById(id);
    if (!zone) return;
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files.length) loadFiles({ target: { files: e.dataTransfer.files } });
    });
  });
  document.body.addEventListener('dragover', e => e.preventDefault());
  document.body.addEventListener('drop', e => {
    e.preventDefault();
    if (e.dataTransfer.files.length) loadFiles({ target: { files: e.dataTransfer.files } });
  });
}

// ── Auto-carga desde window.opener._pendingDicomFiles ───────────────────────
document.addEventListener('DOMContentLoaded', function() {
  setupDropZones();

  // El visor fue abierto en nueva pestaña desde el explorador
  const params  = new URLSearchParams(window.location.search);
  const autoload = params.get('autoload');

  if (autoload === '1' && window.opener && window.opener._pendingDicomFiles) {
    const files  = window.opener._pendingDicomFiles;
    const nombre = window.opener._pendingFolderName || '';
    // Limpiar para no recargar si se refresca
    window.opener._pendingDicomFiles = null;
    window.opener._pendingFolderName = null;

    if (files && files.length) {
      loadFiles({ target: { files: files } });
    }
  }
});