// ===== LIBRARY.JS — Explorador desde data/galeria.json =====

let galeriaData = null;

function openFolderExplorer() {
  document.getElementById('folder-explorer-overlay').classList.add('open');
  if (galeriaData) {
    renderGaleria();
  } else {
    loadGaleriaFromJSON();
  }
}

function closeFolderExplorer() {
  document.getElementById('folder-explorer-overlay').classList.remove('open');
}

async function loadGaleriaFromJSON() {
  const container = document.getElementById('explorer-folders');
  container.innerHTML = '<p class="explorer-loading">⏳ Cargando estudios...</p>';
  try {
    const res = await fetch('data/galeria.json');
    if (!res.ok) throw new Error('No se encontró data/galeria.json (HTTP ' + res.status + ')');
    galeriaData = await res.json();
    renderGaleria();
  } catch(e) {
    container.innerHTML = '<p class="explorer-empty">⚠️ Error: ' + e.message + '</p>';
  }
}

// Guardamos las series en un array indexado para evitar problemas de escape
let seriesIndex = [];

function renderGaleria() {
  const container  = document.getElementById('explorer-folders');
  const breadcrumb = document.getElementById('explorer-breadcrumb');
  container.innerHTML = '';
  seriesIndex = [];

  galeriaData.estudios.forEach(function(estudio) {
    breadcrumb.innerHTML =
      '📁 <span class="breadcrumb-root">GALERIA</span>' +
      ' <span class="breadcrumb-sep">›</span> ' +
      '<span class="breadcrumb-sub">' + estudio.nombre + '</span>';

    const header = document.createElement('div');
    header.className = 'explorer-study-header';
    header.innerHTML =
      '<span class="explorer-study-icon">🫁</span>' +
      '<span>' + estudio.nombre + '</span>' +
      '<span class="explorer-study-count">' + estudio.series.length + ' SERIES</span>';
    container.appendChild(header);

    estudio.series.forEach(function(serie) {
      // Guardar en índice para recuperar sin problemas de escape
      const idx = seriesIndex.length;
      seriesIndex.push(serie);

      const count = serie.archivos.length;
      const row   = document.createElement('div');
      row.className = 'explorer-row';

      const btn = document.createElement('button');
      btn.className = 'btn-open-folder';
      btn.textContent = 'Abrir en Visor →';
      btn.addEventListener('click', function() {
        openSerieInViewer(btn, idx);
      });

      const left = document.createElement('div');
      left.className = 'explorer-row-left';
      left.innerHTML =
        '<span class="explorer-folder-icon">📁</span>' +
        '<div class="explorer-folder-info">' +
          '<span class="explorer-folder-name">' + serie.nombre + '</span>' +
          '<span class="explorer-folder-count">' + count + ' imágenes DICOM</span>' +
        '</div>';

      row.appendChild(left);
      row.appendChild(btn);
      container.appendChild(row);
    });
  });
}

// ── Click "Abrir en Visor" → fetch cada .dcm → visor ─────────────────────────
async function openSerieInViewer(btn, idx) {
  const serie    = seriesIndex[idx];
  const carpeta  = serie.carpeta;
  const nombre   = serie.nombre;
  const archivos = serie.archivos;

  btn.disabled    = true;
  btn.textContent = '⏳ Iniciando...';
  btn.classList.add('loading');

  const files = [];

  try {
    for (let i = 0; i < archivos.length; i++) {
      const url    = carpeta + '/' + archivos[i];
      const res    = await fetch(url);
      if (!res.ok) throw new Error('No se pudo cargar: ' + url + ' (HTTP ' + res.status + ')');
      const blob   = await res.blob();
      const file   = new File([blob], archivos[i], { type: 'application/dicom' });
      Object.defineProperty(file, 'webkitRelativePath', {
        value: carpeta + '/' + archivos[i]
      });
      files.push(file);

      const pct = Math.round(((i + 1) / archivos.length) * 100);
      btn.textContent = '⏳ ' + pct + '% (' + (i + 1) + '/' + archivos.length + ')';
    }

    window._pendingDicomFiles = files;
    window._pendingFolderName = nombre;
    closeFolderExplorer();
    // Abrir en nueva pestaña para que window.opener funcione
    const visor = window.open('dicom-viewer.html?autoload=1', '_blank');
    if (!visor) alert('Activa las ventanas emergentes para abrir el visor.');

  } catch(e) {
    btn.disabled    = false;
    btn.textContent = '❌ Error — Reintentar';
    btn.classList.remove('loading');
    console.error(e);
    alert('Error al cargar:\n' + e.message);
  }
}