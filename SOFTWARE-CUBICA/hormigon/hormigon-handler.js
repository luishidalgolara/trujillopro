// ========================================
// MÓDULO HORMIGÓN - HANDLER PRINCIPAL
// ========================================

const hormigonModule = {
    active: false,
    points: [],
    currentPolygon: null,
    polygons: [],
    tempLine: null,
    isDrawing: false,
    canvas: null,
    ctx: null,
    overlayCanvas: null,
    overlayCtx: null
};

// ========================================
// INICIALIZAR MÓDULO
// ========================================
function initHormigonModule() {
    console.log('🏗️ Iniciando Módulo Hormigón...');
    
    // Obtener canvas principal
    hormigonModule.canvas = document.getElementById('mainCanvas');
    
    if (!hormigonModule.canvas) {
        console.warn('⚠️ Canvas no encontrado aún, esperando...');
        return false;
    }
    
    // Verificar que el canvas esté visible
    if (hormigonModule.canvas.style.display === 'none') {
        console.warn('⚠️ Canvas no visible, esperando carga de plano...');
        return false;
    }
    
    hormigonModule.ctx = hormigonModule.canvas.getContext('2d');
    
    // Crear canvas overlay para dibujo temporal
    createOverlayCanvas();
    
    console.log('✅ Módulo Hormigón Inicializado correctamente');
    return true;
}

// ========================================
// CREAR CANVAS OVERLAY
// ========================================
function createOverlayCanvas() {
    const mainCanvas = document.getElementById('mainCanvas');
    if (!mainCanvas) {
        console.warn('⚠️ Canvas principal no encontrado para crear overlay');
        return;
    }
    
    const wrapper = mainCanvas.parentElement;
    
    // Verificar si ya existe
    let overlay = document.getElementById('overlayCanvas');
    if (overlay) {
        // Si existe, actualizar dimensiones
        overlay.width = mainCanvas.width;
        overlay.height = mainCanvas.height;
        overlay.style.width = mainCanvas.offsetWidth + 'px';
        overlay.style.height = mainCanvas.offsetHeight + 'px';
    } else {
        // Crear nuevo overlay
        overlay = document.createElement('canvas');
        overlay.id = 'overlayCanvas';
        overlay.width = mainCanvas.width;
        overlay.height = mainCanvas.height;
        overlay.style.position = 'absolute';
        overlay.style.top = mainCanvas.offsetTop + 'px';
        overlay.style.left = mainCanvas.offsetLeft + 'px';
        overlay.style.width = mainCanvas.offsetWidth + 'px';
        overlay.style.height = mainCanvas.offsetHeight + 'px';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '10';
        
        wrapper.appendChild(overlay);
    }
    
    hormigonModule.overlayCanvas = overlay;
    hormigonModule.overlayCtx = overlay.getContext('2d');
    
    console.log('✅ Canvas overlay creado/actualizado');
}

// ========================================
// ACTIVAR HERRAMIENTA HORMIGÓN
// ========================================
function activarHormigon() {
    console.log('⚡ Intentando activar herramienta de Hormigón');
    
    // Verificar que el módulo esté inicializado
    if (!hormigonModule.canvas || hormigonModule.canvas.style.display === 'none') {
        alert('⚠️ Debes cargar un plano primero antes de usar esta herramienta');
        updateStatus('⚠️ Carga un plano para usar la herramienta de Hormigón');
        return false;
    }
    
    // Re-inicializar si es necesario
    if (!hormigonModule.ctx) {
        const initialized = initHormigonModule();
        if (!initialized) {
            alert('⚠️ Error al inicializar el módulo de Hormigón. Recarga la página.');
            return false;
        }
    }
    
    // Activar módulo
    hormigonModule.active = true;
    hormigonModule.isDrawing = false;
    hormigonModule.points = [];
    
    // Cambiar cursor
    const canvas = hormigonModule.canvas;
    if (canvas) {
        canvas.style.cursor = 'crosshair';
        canvas.classList.add('hormigon-mode');
    }
    
    // Agregar event listeners
    addHormigonListeners();
    
    // Actualizar estado
    updateStatus('🏗️ Modo HORMIGÓN ACTIVO: Click para definir puntos - Doble click para cerrar');
    console.log('✅ Herramienta de Hormigón activada correctamente');
    
    return true;
}

// ========================================
// DESACTIVAR HERRAMIENTA
// ========================================
function desactivarHormigon() {
    console.log('🔴 Desactivando herramienta de Hormigón');
    
    hormigonModule.active = false;
    hormigonModule.isDrawing = false;
    
    const canvas = hormigonModule.canvas;
    if (canvas) {
        canvas.style.cursor = 'default';
        canvas.classList.remove('hormigon-mode');
    }
    
    removeHormigonListeners();
    clearOverlay();
    
    updateStatus('✓ Herramienta de Hormigón desactivada');
}

// ========================================
// EVENT LISTENERS
// ========================================
function addHormigonListeners() {
    const canvas = hormigonModule.canvas;
    if (!canvas) return;
    
    canvas.addEventListener('click', handleHormigonClick);
    canvas.addEventListener('mousemove', handleHormigonMouseMove);
    canvas.addEventListener('dblclick', handleHormigonDoubleClick);
}

function removeHormigonListeners() {
    const canvas = hormigonModule.canvas;
    if (!canvas) return;
    
    canvas.removeEventListener('click', handleHormigonClick);
    canvas.removeEventListener('mousemove', handleHormigonMouseMove);
    canvas.removeEventListener('dblclick', handleHormigonDoubleClick);
}

// ========================================
// MANEJAR CLICK (AGREGAR PUNTO)
// ========================================
function handleHormigonClick(event) {
    if (!hormigonModule.active) return;
    
    event.preventDefault();
    
    const rect = hormigonModule.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Ajustar por la escala del canvas
    const scaleX = hormigonModule.canvas.width / rect.width;
    const scaleY = hormigonModule.canvas.height / rect.height;
    
    const point = {
        x: x * scaleX,
        y: y * scaleY
    };
    
    // Agregar punto
    hormigonModule.points.push(point);
    hormigonModule.isDrawing = true;
    
    console.log(`Punto agregado: (${Math.round(point.x)}, ${Math.round(point.y)})`);
    
    // Dibujar punto
    drawPoint(point);
    
    // Si hay al menos 2 puntos, dibujar línea
    if (hormigonModule.points.length > 1) {
        drawPolygonLines();
    }
    
    updateStatus(`🏗️ Puntos: ${hormigonModule.points.length} - Doble click para cerrar contorno`);
}

// ========================================
// MANEJAR MOUSE MOVE (LÍNEA TEMPORAL)
// ========================================
function handleHormigonMouseMove(event) {
    if (!hormigonModule.active || !hormigonModule.isDrawing) return;
    if (hormigonModule.points.length === 0) return;
    
    const rect = hormigonModule.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const scaleX = hormigonModule.canvas.width / rect.width;
    const scaleY = hormigonModule.canvas.height / rect.height;
    
    const currentPoint = {
        x: x * scaleX,
        y: y * scaleY
    };
    
    // Limpiar overlay
    clearOverlay();
    
    // Redibujar polígono actual
    drawPolygonLines();
    
    // Dibujar línea temporal desde el último punto
    drawTempLine(hormigonModule.points[hormigonModule.points.length - 1], currentPoint);
}

// ========================================
// MANEJAR DOBLE CLICK (CERRAR POLÍGONO)
// ========================================
function handleHormigonDoubleClick(event) {
    if (!hormigonModule.active || hormigonModule.points.length < 3) return;
    
    event.preventDefault();
    
    console.log('🔒 Cerrando polígono de hormigón');
    
    // Cerrar el polígono
    closePolygon();
    
    // Calcular área y volumen
    const resultado = calcularHormigon(hormigonModule.points);
    
    // Guardar polígono
    hormigonModule.polygons.push({
        points: [...hormigonModule.points],
        area: resultado.area,
        perimetro: resultado.perimetro,
        timestamp: new Date()
    });
    
    // Mostrar resultado
    mostrarResultadoHormigon(resultado);
    
    // Resetear para nuevo polígono
    hormigonModule.points = [];
    hormigonModule.isDrawing = false;
    clearOverlay();
    
    updateStatus(`✓ Contorno cerrado - ${resultado.polygons.length} polígonos de hormigón definidos`);
}

// ========================================
// DIBUJAR PUNTO
// ========================================
function drawPoint(point) {
    const ctx = hormigonModule.ctx;
    
    ctx.fillStyle = '#e74c3c';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

// ========================================
// DIBUJAR LÍNEAS DEL POLÍGONO
// ========================================
function drawPolygonLines() {
    const ctx = hormigonModule.ctx;
    const points = hormigonModule.points;
    
    if (points.length < 2) return;
    
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.stroke();
}

// ========================================
// DIBUJAR LÍNEA TEMPORAL
// ========================================
function drawTempLine(fromPoint, toPoint) {
    const ctx = hormigonModule.overlayCtx;
    
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(fromPoint.x, fromPoint.y);
    ctx.lineTo(toPoint.x, toPoint.y);
    ctx.stroke();
    
    ctx.setLineDash([]);
}

// ========================================
// CERRAR POLÍGONO
// ========================================
function closePolygon() {
    const ctx = hormigonModule.ctx;
    const points = hormigonModule.points;
    
    if (points.length < 3) return;
    
    // Dibujar línea de cierre
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.stroke();
    
    // Rellenar con transparencia
    ctx.fillStyle = 'rgba(231, 76, 60, 0.2)';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fill();
}

// ========================================
// LIMPIAR OVERLAY
// ========================================
function clearOverlay() {
    const ctx = hormigonModule.overlayCtx;
    if (ctx && hormigonModule.overlayCanvas) {
        ctx.clearRect(0, 0, hormigonModule.overlayCanvas.width, hormigonModule.overlayCanvas.height);
    }
}

// ========================================
// MOSTRAR RESULTADO
// ========================================
function mostrarResultadoHormigon(resultado) {
    const mensaje = `
🏗️ HORMIGÓN CALCULADO
━━━━━━━━━━━━━━━━━━━━━━
📐 Área: ${resultado.area.toFixed(2)} m²
📏 Perímetro: ${resultado.perimetro.toFixed(2)} m
📦 Volumen (h=0.15m): ${resultado.volumen.toFixed(2)} m³
🏗️ Total polígonos: ${hormigonModule.polygons.length}
    `;
    
    console.log(mensaje);
    alert(mensaje.trim());
}

// ========================================
// LIMPIAR TODOS LOS POLÍGONOS
// ========================================
function limpiarHormigon() {
    if (confirm('¿Deseas limpiar todos los polígonos de hormigón?')) {
        hormigonModule.points = [];
        hormigonModule.polygons = [];
        hormigonModule.isDrawing = false;
        
        clearOverlay();
        
        // Redibujar canvas sin los polígonos
        const canvas = hormigonModule.canvas;
        const ctx = hormigonModule.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        updateStatus('🗑️ Polígonos de hormigón eliminados');
    }
}

console.log('✅ Módulo Hormigón Handler cargado');