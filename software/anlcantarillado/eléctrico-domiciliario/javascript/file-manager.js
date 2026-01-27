// ========================================
// FUNCIONES DE ARCHIVO
// ========================================
function cargarPlano() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const loading = document.getElementById('pdfLoading');
    if (loading) {
        loading.style.display = 'block';
    }
    
    updateStatus(`📁 Cargando archivo: ${file.name}...`);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileType = file.type;
        
        if (fileType === 'application/pdf') {
            loadPDF(e.target.result);
        } else if (fileType.startsWith('image/')) {
            loadImage(e.target.result);
        }
        
        if (loading) {
            loading.style.display = 'none';
        }
    };
    
    reader.readAsDataURL(file);
}

function loadImage(dataUrl) {
    const svg = document.getElementById('plano');
    
    // Eliminar imagen anterior si existe
    const existingImage = svg.querySelector('image[data-background]');
    if (existingImage) {
        existingImage.remove();
    }
    
    // Crear elemento de imagen temporal para obtener dimensiones reales
    const tempImg = new Image();
    tempImg.onload = function() {
        const originalWidth = tempImg.width;
        const originalHeight = tempImg.height;
        
        console.log(`📐 Dimensiones originales: ${originalWidth}x${originalHeight}px`);
        
        // Crear imagen SVG
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('href', dataUrl);
        image.setAttribute('x', '0');
        image.setAttribute('y', '0');
        
        // Usar dimensiones originales para máxima calidad
        // Si es muy grande, escalar proporcionalmente
        const maxWidth = 1200;
        const maxHeight = 900;
        
        let finalWidth = originalWidth;
        let finalHeight = originalHeight;
        
        // Escalar solo si excede límites
        if (originalWidth > maxWidth || originalHeight > maxHeight) {
            const scaleX = maxWidth / originalWidth;
            const scaleY = maxHeight / originalHeight;
            const scale = Math.min(scaleX, scaleY);
            
            finalWidth = originalWidth * scale;
            finalHeight = originalHeight * scale;
            
            console.log(`📏 Escalado a: ${Math.round(finalWidth)}x${Math.round(finalHeight)}px`);
        }
        
        image.setAttribute('width', finalWidth);
        image.setAttribute('height', finalHeight);
        image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        // MEJORAS DE CALIDAD
        image.setAttribute('opacity', '0.75'); // Aumentado de 0.5 a 0.75
        image.setAttribute('image-rendering', 'optimizeQuality'); // Rendering de alta calidad
        image.setAttribute('data-background', 'true');
        image.style.imageRendering = 'high-quality'; // CSS adicional
        
        // Insertar la imagen después de la cuadrícula pero antes de los elementos
        const grid = svg.querySelector('rect[fill="url(#grid)"]');
        if (grid) {
            svg.insertBefore(image, grid.nextSibling);
        } else {
            // Insertar como segundo elemento (después del fondo blanco)
            const firstRect = svg.querySelector('rect[fill="#ffffff"]');
            if (firstRect && firstRect.nextSibling) {
                svg.insertBefore(image, firstRect.nextSibling);
            } else {
                svg.appendChild(image);
            }
        }
        
        updateStatus(`✅ Imagen cargada - ${Math.round(finalWidth)}x${Math.round(finalHeight)}px - Alta calidad`);
        console.log('🖼️ Imagen cargada con alta calidad');
    };
    
    tempImg.src = dataUrl;
}

function loadPDF(dataUrl) {
    // Implementación básica para PDF
    updateStatus('📄 Carga de PDF - Funcionalidad en desarrollo');
    console.log('📄 PDF detectado - Se requiere PDF.js para renderizar');
    
    alert('⚠️ CARGA DE PDF\n\nLa funcionalidad de PDF requiere la librería PDF.js.\nPor ahora, convierte tu PDF a imagen PNG y cárgalo.');
}

// ========================================
// CONECTAR EVENT LISTENER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
        console.log('✅ File input conectado - Listo para cargar imágenes');
    } else {
        console.error('❌ No se encontró el elemento fileInput');
    }
});