// ================================
// EDITOR LOADERS
// Sistema de carga de archivos
// ================================

function manejarArchivosPDF(archivos) {
    const archivo = archivos[0];
    if (!archivo) return;

    const tipoArchivo = archivo.type;
    const nombreArchivo = archivo.name.toLowerCase();

    try {
        if (tipoArchivo === 'application/pdf' || nombreArchivo.endsWith('.pdf')) {
            cargarPDF(archivo);
        } else if (tipoArchivo.startsWith('image/') || nombreArchivo.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
            cargarImagen(archivo);
        } else {
            showStatus('Formato no soportado. Use PDF o imágenes (JPG, PNG, SVG)');
        }
    } catch (error) {
        showStatus('Error al cargar archivo: ' + error.message);
    }
}

async function cargarPDF(archivo) {
    showStatus('Cargando PDF...');
    
    try {
        if (typeof pdfjsLib === 'undefined') {
            showStatus('Error: PDF.js no está disponible');
            return;
        }

        const arrayBuffer = await archivo.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        
        currentPDF = pdf;
        totalPages = pdf.numPages;
        currentPage = 1;

        await renderizarPaginaPDF(1);
        showStatus(`✅ PDF cargado: ${totalPages} página(s)`);

    } catch (error) {
        showStatus('❌ Error al cargar PDF: ' + error.message);
    }
}

async function renderizarPaginaPDF(numeroPagina) {
    if (!currentPDF) return;

    try {
        const pagina = await currentPDF.getPage(numeroPagina);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const viewport = pagina.getViewport({ scale: 1 });
        
        const formatoActual = plans[currentPlanIndex].format;
        const datosFormato = formats[formatoActual];
        const escala = Math.min(datosFormato.width / viewport.width, datosFormato.height / viewport.height) * 0.9;
        const scaledViewport = pagina.getViewport({ scale: escala });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await pagina.render({
            canvasContext: context,
            viewport: scaledViewport
        }).promise;

        const datosImagen = canvas.toDataURL('image/png');
        
        agregarFondoPDFMultiple(datosImagen, scaledViewport.width, scaledViewport.height, `PDF_Page_${numeroPagina}`);

    } catch (error) {
        showStatus('❌ Error al renderizar página: ' + error.message);
    }
}

async function cargarImagen(archivo) {
    showStatus('Cargando imagen...');
    
    try {
        const reader = new FileReader();
        
        const imagePromise = new Promise((resolve, reject) => {
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const formatoActual = plans[currentPlanIndex].format;
                    const datosFormato = formats[formatoActual];
                    const escala = Math.min(datosFormato.width / img.width, datosFormato.height / img.height) * 0.9;
                    const anchoEscalado = img.width * escala;
                    const altoEscalado = img.height * escala;
                    
                    agregarFondoPDFMultiple(e.target.result, anchoEscalado, altoEscalado, archivo.name);
                    resolve();
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
        });
        
        reader.readAsDataURL(archivo);
        await imagePromise;
        
        showStatus('✅ Imagen cargada correctamente');
        
    } catch (error) {
        showStatus('❌ Error al cargar imagen: ' + error.message);
    }
}

function agregarFondoPDF(datosImagen, ancho, alto) {
    agregarFondoPDFMultiple(datosImagen, ancho, alto, 'image_legacy');
}

function agregarFondoPDFMultiple(datosImagen, ancho, alto, nombreArchivo = 'image') {
    try {
        imageCounter++;
        
        const planActual = plans[currentPlanIndex];
        const tracingSvg = document.getElementById('tracingSvg');
        
        let defs = tracingSvg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            tracingSvg.appendChild(defs);
        }
        
        const anchoMax = 200;
        const altoMax = 150;
        const escala = Math.min(anchoMax / ancho, altoMax / alto);
        const anchoEscalado = ancho * escala;
        const altoEscalado = alto * escala;
        
        const patternId = `pdfPattern_${imageCounter}`;
        const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        pattern.setAttribute('id', patternId);
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        pattern.setAttribute('width', anchoEscalado);
        pattern.setAttribute('height', altoEscalado);

        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('href', datosImagen);
        image.setAttribute('width', anchoEscalado);
        image.setAttribute('height', altoEscalado);
        image.setAttribute('opacity', '0.8');

        pattern.appendChild(image);
        defs.appendChild(pattern);

        const bgGroupId = `pdfBackgroundGroup_${imageCounter}`;
        const bgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        bgGroup.setAttribute('id', bgGroupId);
        bgGroup.setAttribute('class', 'manipulable-image');
        bgGroup.setAttribute('data-image-name', nombreArchivo);

        const offsetX = 50 + (imageCounter * 25);
        const offsetY = 50 + (imageCounter * 15);

        const bgRectId = `pdfBackground_${imageCounter}`;
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('id', bgRectId);
        bgRect.setAttribute('x', offsetX);
        bgRect.setAttribute('y', offsetY);
        bgRect.setAttribute('width', anchoEscalado);
        bgRect.setAttribute('height', altoEscalado);
        bgRect.setAttribute('fill', `url(#${patternId})`);
        bgRect.setAttribute('stroke', '#3498db');
        bgRect.setAttribute('stroke-width', '2');
        bgRect.setAttribute('stroke-dasharray', '5,5');
        bgRect.setAttribute('opacity', '0.9');
        bgRect.style.cursor = 'move';
        bgRect.style.pointerEvents = 'none';

        const resizeHandleId = `resizeHandle_${imageCounter}`;
        const resizeHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        resizeHandle.setAttribute('id', resizeHandleId);
        resizeHandle.setAttribute('cx', offsetX + anchoEscalado);
        resizeHandle.setAttribute('cy', offsetY + altoEscalado);
        resizeHandle.setAttribute('r', '8');
        resizeHandle.setAttribute('fill', '#3498db');
        resizeHandle.setAttribute('stroke', '#ffffff');
        resizeHandle.setAttribute('stroke-width', '3');
        resizeHandle.style.cursor = 'nw-resize';
        resizeHandle.style.pointerEvents = 'all';

        bgGroup.appendChild(bgRect);
        bgGroup.appendChild(resizeHandle);

        const gridRect = tracingSvg.querySelector('rect[fill="url(#grid)"]');
        if (gridRect) {
            gridRect.insertAdjacentElement('afterend', bgGroup);
        } else {
            tracingSvg.appendChild(bgGroup);
        }

        window.EditorManipulation.configurarManipulacionMultiple(bgGroup, bgRect, resizeHandle, pattern, imageCounter);

        if (!planActual.pdfBackgrounds) {
            planActual.pdfBackgrounds = [];
        }
        
        planActual.pdfBackgrounds.push({ 
            id: imageCounter,
            imageData: datosImagen, 
            width: anchoEscalado, 
            height: altoEscalado, 
            x: offsetX, 
            y: offsetY,
            scale: 1,
            fileName: nombreArchivo
        });

        showStatus(`✅ ${nombreArchivo} cargada. Total imágenes: ${planActual.pdfBackgrounds.length}`);

    } catch (error) {
        console.error('Error en agregarFondoPDFMultiple:', error);
        showStatus('❌ Error al cargar imagen');
    }
}

function cargarArchivoSVG(archivo) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const svgContent = e.target.result;
        const svgId = svgCounter++;
        agregarSVGAlTablero(svgContent, archivo.name, svgId);
        loadedSVGs.push({ 
            name: archivo.name, 
            content: svgContent, 
            id: svgId,
            scale: 1 
        });
        actualizarInfoPlano();
        showStatus(`✅ ${archivo.name} cargado exitosamente`);
    };
    reader.readAsText(archivo);
}

function agregarSVGAlTablero(svgContent, nombreArchivo, svgId) {
    const svgLayer = document.getElementById('svgLayer');
    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'svg-element';
    svgWrapper.setAttribute('data-svg-id', svgId);
    svgWrapper.title = nombreArchivo;
    
    const svgContainer = document.createElement('div');
    svgContainer.className = 'svg-container';
    svgContainer.innerHTML = svgContent;
    
    svgWrapper.appendChild(svgContainer);
    svgLayer.appendChild(svgWrapper);
}

window.handlePDFFiles = manejarArchivosPDF;
window.loadPDF = cargarPDF;
window.renderPDFPage = renderizarPaginaPDF;
window.loadImage = cargarImagen;
window.addPDFBackground = agregarFondoPDF;
window.addMultiplePDFBackground = agregarFondoPDFMultiple;
window.loadSVGFile = cargarArchivoSVG;
window.addSVGToBoard = agregarSVGAlTablero;

window.EditorLoaders = {
    manejarArchivosPDF,
    cargarPDF,
    renderizarPaginaPDF,
    cargarImagen,
    agregarFondoPDF,
    agregarFondoPDFMultiple,
    cargarArchivoSVG,
    agregarSVGAlTablero
};

console.log('✅ editor-loaders.js cargado');