// js/pdf-handler.js - CORREGIDO CON ACTUALIZACIÓN DE FRAME
import { svg, currentPDF, currentPage, totalPages, pdfData, pdfScale, currentScale, currentViewBox, isDraggingImage, currentDraggedImage, imageDragStart, isResizingImage } from './config.js';
import { setCurrentPDF, setCurrentPage, setTotalPages, setPdfData, setPdfScale, setCurrentViewBox, setIsDraggingImage, setCurrentDraggedImage, setImageDragStart } from './config.js';
import { showStatus } from './utils.js';
import { updatePDFScaleInfo } from './scale-manager.js';
import { getAccurateSVGCoords } from './utils.js';
import { createImageFrame, updateImageFrameById, removeImageFrame, removeImageFrameById } from './image-resizer.js';

let isImageLocked = false;
let imageCounter = 0;
let lockedImages = new Set();

export async function handleFileLoad(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    try {
        if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
            await loadPDF(file);
        } else if (fileType.startsWith('image/') || fileName.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
            await loadImage(file);
        } else {
            showStatus('Formato no soportado. Use PDF o imágenes (JPG, PNG, SVG)', 5000);
        }
    } catch (error) {
        showStatus('Error al cargar archivo: ' + error.message, 5000);
    }
}

export async function loadPDF(file) {
    showStatus('Iniciando carga de PDF...');
    
    const loadingElement = document.getElementById('pdfLoading');
    if (loadingElement) loadingElement.style.display = 'block';

    try {
        let pdfReady = false;
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!pdfReady && attempts < maxAttempts) {
            if (typeof pdfjsLib !== 'undefined') {
                pdfReady = true;
            } else {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
        }
        
        if (!pdfReady) {
            throw new Error('PDF.js no se pudo cargar después de 5 segundos');
        }

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        
        setCurrentPDF(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
        setPdfData(arrayBuffer);

        await renderPDFPage(1);
        
        const pdfControls = document.getElementById('pdfControls');
        if (pdfControls) pdfControls.style.display = 'block';
        
        updatePDFInfo(file.name);
        showStatus(`✅ PDF cargado: ${pdf.numPages} página(s)`, 3000);

    } catch (error) {
        showStatus('❌ Error al cargar PDF: ' + error.message, 8000);
    } finally {
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

export async function renderPDFPage(pageNum) {
    if (!currentPDF) return;

    try {
        const page = await currentPDF.getPage(pageNum);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const viewport = page.getViewport({ scale: 1.0 });
        
        const canvasWidth = 800;
        const canvasHeight = 600;
        const scaleX = (canvasWidth * 0.8) / viewport.width;
        const scaleY = (canvasHeight * 0.8) / viewport.height;
        const scale = Math.min(scaleX, scaleY);
        
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
            canvasContext: context,
            viewport: scaledViewport
        }).promise;

        const imageData = canvas.toDataURL('image/png');
        
        addDraggableImage(imageData, scaledViewport.width, scaledViewport.height);

        const pageInfo = document.getElementById('pageInfo');
        if (pageInfo) pageInfo.textContent = `Página ${pageNum} de ${totalPages}`;
        
        setPdfScale(scale);
        setCurrentPage(pageNum);

    } catch (error) {
        showStatus('❌ Error al renderizar página: ' + error.message, 5000);
    }
}

export function addDraggableImage(imageData, width, height) {
    try {
        imageCounter++;
        const uniqueId = `draggableImage_${imageCounter}`;
        
        const imageGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        imageGroup.setAttribute('id', uniqueId);
        imageGroup.setAttribute('cursor', 'move');
        imageGroup.setAttribute('data-image-id', imageCounter);
        
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('href', imageData);
        image.setAttribute('width', width);
        image.setAttribute('height', height);
        
        const startX = (800 - width) / 2 + (imageCounter * 20);
        const startY = (600 - height) / 2 + (imageCounter * 20);
        
        const finalX = Math.max(50, startX);
        const finalY = Math.max(50, startY);
        
        image.setAttribute('x', finalX);
        image.setAttribute('y', finalY);
        image.setAttribute('opacity', '0.9');
        image.setAttribute('data-original-width', width);
        image.setAttribute('data-original-height', height);
        
        imageGroup.appendChild(image);
        
        const gridRect = svg.querySelector('rect[fill="url(#grid)"]');
        if (gridRect) {
            gridRect.insertAdjacentElement('afterend', imageGroup);
        } else {
            svg.appendChild(imageGroup);
        }

        makeImageDraggable(imageGroup);
        createImageFrame(imageGroup, width, height, finalX, finalY);
        createImageControls(finalX, finalY, width, height, imageCounter);
        
        showStatus(`✅ Imagen ${imageCounter} agregada`, 2000);

    } catch (error) {
        console.error('Error en addDraggableImage:', error);
    }
}

function createImageControls(x, y, width, height, imageId) {
    const controlsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    controlsGroup.setAttribute('id', `imageControls_${imageId}`);
    controlsGroup.setAttribute('data-image-id', imageId);
    
    const btnSize = 30;
    const btnSpacing = 5;
    const topY = y - btnSize - btnSpacing;
    
    const lockBtn = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    lockBtn.setAttribute('id', `lockImageBtn_${imageId}`);
    lockBtn.setAttribute('cursor', 'pointer');
    lockBtn.setAttribute('class', 'image-control-btn');
    lockBtn.setAttribute('data-image-id', imageId);
    
    const lockBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    lockBg.setAttribute('x', x + width - btnSize - btnSize - btnSpacing);
    lockBg.setAttribute('y', topY);
    lockBg.setAttribute('width', btnSize);
    lockBg.setAttribute('height', btnSize);
    lockBg.setAttribute('fill', '#3b82f6');
    lockBg.setAttribute('rx', '4');
    lockBtn.appendChild(lockBg);
    
    const lockIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lockIcon.setAttribute('x', x + width - btnSize - btnSize - btnSpacing + btnSize/2);
    lockIcon.setAttribute('y', topY + btnSize/2 + 5);
    lockIcon.setAttribute('text-anchor', 'middle');
    lockIcon.setAttribute('fill', 'white');
    lockIcon.setAttribute('font-size', '16');
    lockIcon.setAttribute('pointer-events', 'none');
    lockIcon.textContent = '🔓';
    lockBtn.appendChild(lockIcon);
    
    lockBtn.addEventListener('click', () => toggleImageLock(imageId));
    controlsGroup.appendChild(lockBtn);
    
    const deleteBtn = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    deleteBtn.setAttribute('id', `deleteImageBtn_${imageId}`);
    deleteBtn.setAttribute('cursor', 'pointer');
    deleteBtn.setAttribute('class', 'image-control-btn');
    deleteBtn.setAttribute('data-image-id', imageId);
    
    const deleteBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    deleteBg.setAttribute('x', x + width - btnSize);
    deleteBg.setAttribute('y', topY);
    deleteBg.setAttribute('width', btnSize);
    deleteBg.setAttribute('height', btnSize);
    deleteBg.setAttribute('fill', '#ef4444');
    deleteBg.setAttribute('rx', '4');
    deleteBtn.appendChild(deleteBg);
    
    const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    deleteIcon.setAttribute('x', x + width - btnSize + btnSize/2);
    deleteIcon.setAttribute('y', topY + btnSize/2 + 5);
    deleteIcon.setAttribute('text-anchor', 'middle');
    deleteIcon.setAttribute('fill', 'white');
    deleteIcon.setAttribute('font-size', '18');
    deleteIcon.setAttribute('font-weight', 'bold');
    deleteIcon.setAttribute('pointer-events', 'none');
    deleteIcon.textContent = '✕';
    deleteBtn.appendChild(deleteIcon);
    
    deleteBtn.addEventListener('click', () => removeSpecificImage(imageId));
    controlsGroup.appendChild(deleteBtn);
    
    svg.appendChild(controlsGroup);
}

function updateImageControls(imageId, x, y, width, height) {
    const controlsGroup = svg.querySelector(`#imageControls_${imageId}`);
    if (!controlsGroup) return;
    
    const btnSize = 30;
    const btnSpacing = 5;
    const topY = y - btnSize - btnSpacing;
    
    const lockBtn = svg.querySelector(`#lockImageBtn_${imageId}`);
    if (lockBtn) {
        const lockBg = lockBtn.querySelector('rect');
        const lockIcon = lockBtn.querySelector('text');
        if (lockBg && lockIcon) {
            lockBg.setAttribute('x', x + width - btnSize - btnSize - btnSpacing);
            lockBg.setAttribute('y', topY);
            lockIcon.setAttribute('x', x + width - btnSize - btnSize - btnSpacing + btnSize/2);
            lockIcon.setAttribute('y', topY + btnSize/2 + 5);
        }
    }
    
    const deleteBtn = svg.querySelector(`#deleteImageBtn_${imageId}`);
    if (deleteBtn) {
        const deleteBg = deleteBtn.querySelector('rect');
        const deleteIcon = deleteBtn.querySelector('text');
        if (deleteBg && deleteIcon) {
            deleteBg.setAttribute('x', x + width - btnSize);
            deleteBg.setAttribute('y', topY);
            deleteIcon.setAttribute('x', x + width - btnSize + btnSize/2);
            deleteIcon.setAttribute('y', topY + btnSize/2 + 5);
        }
    }
}

function removeImageControls(imageId) {
    const controlsGroup = svg.querySelector(`#imageControls_${imageId}`);
    if (controlsGroup) controlsGroup.remove();
}

function toggleImageLock(imageId) {
    const isLocked = lockedImages.has(imageId);
    
    if (isLocked) {
        lockedImages.delete(imageId);
    } else {
        lockedImages.add(imageId);
    }
    
    const lockIcon = svg.querySelector(`#lockImageBtn_${imageId} text`);
    const lockBg = svg.querySelector(`#lockImageBtn_${imageId} rect`);
    const imageGroup = svg.querySelector(`#draggableImage_${imageId}`);
    
    if (!isLocked) {
        if (lockIcon) lockIcon.textContent = '🔒';
        if (lockBg) lockBg.setAttribute('fill', '#10b981');
        if (imageGroup) imageGroup.style.cursor = 'not-allowed';
        showStatus(`🔒 Imagen ${imageId} bloqueada`);
    } else {
        if (lockIcon) lockIcon.textContent = '🔓';
        if (lockBg) lockBg.setAttribute('fill', '#3b82f6');
        if (imageGroup) imageGroup.style.cursor = 'move';
        showStatus(`🔓 Imagen ${imageId} desbloqueada`);
    }
}

function removeSpecificImage(imageId) {
    const imageGroup = svg.querySelector(`#draggableImage_${imageId}`);
    if (imageGroup) imageGroup.remove();
    
    removeImageFrameById(imageId);
    removeImageControls(imageId);
    
    lockedImages.delete(imageId);
    
    showStatus(`🗑️ Imagen ${imageId} eliminada`, 2000);
}

export async function loadImage(file) {
    showStatus('Cargando imagen...');
    
    try {
        const reader = new FileReader();
        
        const imagePromise = new Promise((resolve, reject) => {
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvasWidth = 800;
                    const canvasHeight = 600;
                    const scaleX = (canvasWidth * 0.8) / img.width;
                    const scaleY = (canvasHeight * 0.8) / img.height;
                    const scale = Math.min(scaleX, scaleY);
                    
                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    
                    addDraggableImage(e.target.result, scaledWidth, scaledHeight);
                    
                    const pdfControls = document.getElementById('pdfControls');
                    if (pdfControls) pdfControls.style.display = 'block';
                    
                    const pageInfo = document.getElementById('pageInfo');
                    if (pageInfo) pageInfo.textContent = `${imageCounter} imagen(es) cargada(s)`;
                    
                    updatePDFInfo(file.name, true);
                    resolve();
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
        });
        
        reader.readAsDataURL(file);
        await imagePromise;
        
        showStatus('✅ Imagen cargada', 3000);
        
    } catch (error) {
        showStatus('❌ Error al cargar imagen: ' + error.message, 5000);
    }
}

export function makeImageDraggable(imageGroup) {
    imageGroup.addEventListener('mousedown', startImageDrag);
}

export function startImageDrag(e) {
    const imageGroup = e.currentTarget;
    const imageId = parseInt(imageGroup.getAttribute('data-image-id'));
    
    if (lockedImages.has(imageId)) {
        showStatus(`🔒 Imagen ${imageId} bloqueada - Desbloquea primero`);
        return;
    }
    
    if (document.getElementById('modeToggle').textContent.includes('Navegación')) return;
    if (isResizingImage) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDraggingImage(true);
    setCurrentDraggedImage(imageGroup);
    
    const image = imageGroup.querySelector('image');
    const currentX = parseFloat(image.getAttribute('x'));
    const currentY = parseFloat(image.getAttribute('y'));
    
    const svgCoords = getAccurateSVGCoords(e);
    setImageDragStart({
        x: svgCoords.x - currentX,
        y: svgCoords.y - currentY,
        imageId: imageId
    });
    
    imageGroup.style.cursor = 'grabbing';
    svg.style.cursor = 'grabbing';
    
    document.addEventListener('mousemove', dragImage);
    document.addEventListener('mouseup', endImageDrag);
    
    showStatus(`🖼️ Arrastrando imagen ${imageId}...`);
}

export function dragImage(e) {
    if (!isDraggingImage || !currentDraggedImage) return;
    
    e.preventDefault();
    
    const svgCoords = getAccurateSVGCoords(e);
    
    const newX = svgCoords.x - imageDragStart.x;
    const newY = svgCoords.y - imageDragStart.y;
    
    const image = currentDraggedImage.querySelector('image');
    if (image) {
        image.setAttribute('x', newX);
        image.setAttribute('y', newY);
        
        const width = parseFloat(image.getAttribute('width'));
        const height = parseFloat(image.getAttribute('height'));
        
        const imageId = imageDragStart.imageId;
        
        updateImageFrameById(imageId, newX, newY, width, height);
        updateImageControls(imageId, newX, newY, width, height);
    }
}

export function endImageDrag(e) {
    if (!isDraggingImage) return;
    
    setIsDraggingImage(false);
    
    if (currentDraggedImage) {
        currentDraggedImage.style.cursor = 'move';
    }
    
    const isNavMode = document.getElementById('modeToggle').textContent.includes('Navegación');
    svg.style.cursor = isNavMode ? 'grab' : 'crosshair';
    
    setCurrentDraggedImage(null);
    setImageDragStart({ x: 0, y: 0, imageId: null });
    
    document.removeEventListener('mousemove', dragImage);
    document.removeEventListener('mouseup', endImageDrag);
    
    showStatus('✅ Imagen reposicionada');
}

export function updatePDFInfo(fileName, isImage = false) {
    const info = document.getElementById('pdfInfo');
    if (!info) return;
    
    const allImages = svg.querySelectorAll('[id^="draggableImage_"]');
    const imageCount = allImages.length;
    
    info.innerHTML = `
        <strong>Archivo:</strong> ${fileName}<br>
        <strong>Tipo:</strong> ${isImage ? 'Imagen' : 'PDF'}<br>
        <strong>Imágenes:</strong> ${imageCount}<br>
        <strong>Escala:</strong> 1:${currentScale} (actual)
    `;
}

export function previousPage() {
    if (currentPDF && currentPage > 1) {
        renderPDFPage(currentPage - 1);
    }
}

export function nextPage() {
    if (currentPDF && currentPage < totalPages) {
        renderPDFPage(currentPage + 1);
    }
}

export function removePDF() {
    const allImages = svg.querySelectorAll('[id^="draggableImage_"]');
    allImages.forEach(img => img.remove());
    
    const allFrames = svg.querySelectorAll('[id^="imageFrame_"]');
    allFrames.forEach(frame => frame.remove());
    
    const allControls = svg.querySelectorAll('[id^="imageControls_"]');
    allControls.forEach(control => control.remove());
    
    const pdfControls = document.getElementById('pdfControls');
    if (pdfControls) pdfControls.style.display = 'none';
    
    setCurrentPDF(null);
    setPdfData(null);
    
    lockedImages.clear();
    imageCounter = 0;
    
    showStatus('🗑️ Todas las imágenes removidas', 2000);
}