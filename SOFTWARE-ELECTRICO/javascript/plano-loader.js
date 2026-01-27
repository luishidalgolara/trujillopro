/**
 * CARGADOR DE PDF/IMAGEN DE FONDO
 * Permite cargar, redimensionar y bloquear imágenes de fondo en el plano
 */

// ========================================
// FUNCIÓN PRINCIPAL PARA CARGAR PLANO
// ========================================
function cargarPlano() {
    console.log('📁 Iniciando carga de plano...');
    
    // Crear input file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.style.display = 'none';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        console.log(`📄 Archivo seleccionado: ${file.name}`);
        
        // Verificar tipo de archivo
        if (file.type.startsWith('image/')) {
            cargarImagen(file);
        } else if (file.type === 'application/pdf') {
            cargarPDF(file);
        } else {
            alert('⚠️ Formato no soportado. Solo imágenes (PNG, JPG, etc.) o PDF.');
        }
    });
    
    // Trigger click
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

// ========================================
// CARGAR IMAGEN
// ========================================
function cargarImagen(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        insertarImagenEnPlano(imageData);
    };
    
    reader.readAsDataURL(file);
}

// ========================================
// CARGAR PDF (CONVERTIR A IMAGEN)
// ========================================
function cargarPDF(file) {
    // Verificar si pdfjsLib está disponible
    if (typeof pdfjsLib === 'undefined') {
        alert('⚠️ Biblioteca PDF no cargada. Por favor recarga la página.');
        console.error('pdfjsLib no está disponible');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = async function(e) {
        try {
            const pdfData = new Uint8Array(e.target.result);
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;
            
            console.log(`📄 PDF cargado: ${pdf.numPages} página(s)`);
            
            // Renderizar primera página
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 2.0 });
            
            // Crear canvas temporal
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext('2d');
            
            // Renderizar página
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Convertir a imagen
            const imageData = canvas.toDataURL('image/png');
            insertarImagenEnPlano(imageData);
            
            console.log('✅ PDF convertido a imagen');
            
        } catch (error) {
            console.error('❌ Error al cargar PDF:', error);
            alert('Error al cargar el PDF. Intenta con una imagen PNG/JPG.');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// ========================================
// INSERTAR IMAGEN EN EL PLANO SVG
// ========================================
function insertarImagenEnPlano(imageData) {
    const svg = document.getElementById('plano');
    if (!svg) {
        console.error('❌ SVG no encontrado');
        return;
    }
    
    // Crear elemento image en SVG
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttribute('href', imageData);
    image.setAttribute('data-background', 'true');
    
    // Obtener dimensiones del viewBox
    const viewBox = svg.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    const svgHeight = parseFloat(viewBox[3]);
    
    // Posicionar imagen (centrada, ocupando 80% del espacio)
    const imgWidth = svgWidth * 0.8;
    const imgHeight = svgHeight * 0.8;
    const imgX = (svgWidth - imgWidth) / 2;
    const imgY = (svgHeight - imgHeight) / 2;
    
    image.setAttribute('x', imgX);
    image.setAttribute('y', imgY);
    image.setAttribute('width', imgWidth);
    image.setAttribute('height', imgHeight);
    image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    image.setAttribute('opacity', '0.7');
    
    // Insertar como primer elemento (fondo)
    const firstChild = svg.firstChild;
    if (firstChild) {
        svg.insertBefore(image, firstChild);
    } else {
        svg.appendChild(image);
    }
    
    console.log('✅ Imagen insertada en el plano');
    
    // FORZAR inicialización del ImageController si no existe
    if (!window.ImageController) {
        console.warn('⚠️ ImageController no encontrado, cargando...');
        // Intentar inicializar
        if (typeof ImageController !== 'undefined') {
            ImageController.initialize();
        }
    }
    
    // Seleccionar automáticamente para mostrar controles
    setTimeout(() => {
        // Hacer la imagen clickeable y seleccionable
        image.style.cursor = 'move';
        image.style.pointerEvents = 'all';
        
        // Forzar selección
        if (window.ImageController) {
            ImageController.selectImage(image);
            console.log('🎯 Imagen seleccionada automáticamente');
        } else {
            console.error('❌ ImageController no disponible');
        }
        
        updateStatus('🖼️ Imagen cargada - Click en las esquinas azules para redimensionar');
    }, 200);
    
    // Guardar en el plano actual si existe el sistema de planos
    if (window.PlanoElectricoManager) {
        const planoActual = window.PlanoElectricoManager.getPlanoActivo();
        if (planoActual) {
            planoActual.backgroundImage = imageData;
            console.log('💾 Imagen guardada en plano:', planoActual.nombre);
        }
    }
}

// ========================================
// FUNCIÓN PARA AJUSTAR OPACIDAD DE LA IMAGEN
// ========================================
function ajustarOpacidadImagen(opacidad) {
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    const images = svg.querySelectorAll('image[data-background="true"]');
    images.forEach(img => {
        img.setAttribute('opacity', opacidad);
    });
    
    console.log(`🎨 Opacidad ajustada a: ${opacidad}`);
}

// ========================================
// FUNCIÓN PARA ELIMINAR IMAGEN DE FONDO
// ========================================
function eliminarImagenFondo() {
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    const images = svg.querySelectorAll('image[data-background="true"]');
    
    if (images.length === 0) {
        alert('⚠️ No hay imagen de fondo para eliminar');
        return;
    }
    
    if (confirm('¿Eliminar imagen de fondo del plano?')) {
        images.forEach(img => img.remove());
        
        // Limpiar en el plano actual
        if (window.PlanoElectricoManager) {
            const planoActual = window.PlanoElectricoManager.getPlanoActivo();
            if (planoActual) {
                planoActual.backgroundImage = null;
            }
        }
        
        // Ocultar controles
        if (window.ImageController) {
            ImageController.deselectImage();
        }
        
        console.log('🗑️ Imagen de fondo eliminada');
        updateStatus('✅ Imagen eliminada');
    }
}

// ========================================
// RESTAURAR IMAGEN DE FONDO AL CAMBIAR DE PLANO
// ========================================
function restaurarImagenDeFondo(plano) {
    if (!plano || !plano.backgroundImage) return;
    
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    // Limpiar imágenes anteriores
    const imagenes = svg.querySelectorAll('image[data-background="true"]');
    imagenes.forEach(img => img.remove());
    
    // Insertar imagen del plano
    insertarImagenEnPlano(plano.backgroundImage);
    
    console.log('✅ Imagen de fondo restaurada para:', plano.nombre);
}

// ========================================
// EXPORTAR FUNCIONES AL SCOPE GLOBAL
// ========================================
window.cargarPlano = cargarPlano;
window.ajustarOpacidadImagen = ajustarOpacidadImagen;
window.eliminarImagenFondo = eliminarImagenFondo;
window.restaurarImagenDeFondo = restaurarImagenDeFondo;

console.log('✅ Cargador de planos inicializado');