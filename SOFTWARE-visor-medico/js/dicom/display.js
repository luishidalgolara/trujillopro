// ===== DISPLAY.JS — Renderizado de imágenes DICOM =====

async function displayImage(index) {
  if (!loadedImages[index]) return;
  try {
    const image = await cornerstone.loadAndCacheImage(loadedImages[index].imageId);
    cornerstone.displayImage(element, image);

    const viewport = cornerstone.getViewport(element);
    viewport.voi.windowWidth  = currentWW;
    viewport.voi.windowCenter = currentWL;
    viewport.invert           = isInverted;
    cornerstone.setViewport(element, viewport);

    cornerstoneTools.addStackStateManager(element, ['stack']);
    cornerstoneTools.addToolState(element, 'stack', {
      currentImageIdIndex: index,
      imageIds: loadedImages.map(img => img.imageId)
    });

    updateOverlays(image, index);
    updateMetadataPanel(image);
    updateAnnotationsGuide(image);
    updateSliceCounter(index);
    updateBodyPosition(index);
    updateSeriesInfo(image, index);

    document.querySelectorAll('.file-item').forEach((el, i) => el.classList.toggle('active', i === index));
    document.getElementById(`file-item-${index}`)?.scrollIntoView({ block: 'nearest' });

    currentIndex = index;
    document.getElementById('slice-slider').value = index;
  } catch(err) {
    console.error('Error loading image:', err);
    hideLoading();
  }
}

function goToSlice(index) {
  index = Math.max(0, Math.min(loadedImages.length - 1, index));
  displayImage(index);
}

function stepSlice(delta) { goToSlice(currentIndex + delta); }

function updateBodyPosition(index) {
  if (loadedImages.length < 2) return;
  const pct        = index / (loadedImages.length - 1);
  const wrapHeight = document.getElementById('body-figure-wrap').offsetHeight;
  document.getElementById('scan-line').style.top = ((2 + pct * 160) / 200 * wrapHeight) + 'px';

  let regionLabel = '—';
  for (const r of ANATOMY_REGIONS) {
    if (pct >= r.pct[0] && pct < r.pct[1]) { regionLabel = r.label; break; }
  }
  document.getElementById('body-pos-label').textContent = regionLabel;

  if (sliceLocations[index] !== undefined && sliceLocations[index] !== index) {
    const z = sliceLocations[index].toFixed(1);
    document.getElementById('ov-sliceLoc').textContent  = `z: ${z} mm`;
    document.getElementById('slice-loc-bar').textContent = `z: ${z} mm`;
    document.getElementById('si-pos').textContent        = z + ' mm';
  }
}

// Eventos
element.addEventListener('cornerstoneimagerendered', () => updateWLOverlay());

element.addEventListener('wheel', (e) => {
  if (!loadedImages.length) return;
  e.preventDefault();
  goToSlice(currentIndex + (e.deltaY > 0 ? 1 : -1));
}, { passive: false });

element.addEventListener('dblclick', resetView);

document.addEventListener('keydown', (e) => {
  if (!loadedImages.length) return;
  if (e.key === 'ArrowDown'  || e.key === 'ArrowRight') goToSlice(currentIndex + 1);
  if (e.key === 'ArrowUp'    || e.key === 'ArrowLeft')  goToSlice(currentIndex - 1);
  if (e.key === ' ')    { e.preventDefault(); togglePlay(); }
  if (e.key === 'PageDown')  goToSlice(currentIndex + 10);
  if (e.key === 'PageUp')    goToSlice(currentIndex - 10);
  if (e.key === 'Home')      goToSlice(0);
  if (e.key === 'End')       goToSlice(loadedImages.length - 1);
});
