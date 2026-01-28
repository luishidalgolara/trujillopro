/* ========================================
   SISTEMA GLOBAL DE REDIBUJO DE CANVAS
   ======================================== */

// Cache de imágenes cargadas por plano
const imagenCache = window.imagenCache || new Map();
window.imagenCache = imagenCache;

// Función global que redibuja TODOS los elementos
function redibujarCanvasGlobal() {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    
    // 1. Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. Redibujar la imagen del PLANO ACTIVO (cacheada)
    if (window.PlanoManager) {
        const planoActivo = window.PlanoManager.getActivePlano();
        if (planoActivo && planoActivo.backgroundImage) {
            const planoId = planoActivo.id;
            
            // Verificar si la imagen ya está en caché
            if (imagenCache.has(planoId)) {
                const imgCached = imagenCache.get(planoId);
                ctx.drawImage(imgCached, 0, 0, canvas.width, canvas.height);
                dibujarTodosLosElementos(ctx);
            } else {
                // Cargar y cachear la imagen la primera vez
                const img = new Image();
                img.onload = function() {
                    imagenCache.set(planoId, img);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    dibujarTodosLosElementos(ctx);
                };
                img.src = planoActivo.backgroundImage;
            }
            return;
        }
    }
    
    // Si no hay sistema de planos o no hay imagen, dibujar elementos directamente
    dibujarTodosLosElementos(ctx);
}

// Función auxiliar para dibujar todos los elementos
function dibujarTodosLosElementos(ctx) {
    // 3. Dibujar TODOS los muros de hormigón
    if (typeof dibujarMurosEnCanvas === 'function') {
        dibujarMurosEnCanvas(ctx);
    }
    
    // 4. Dibujar TODOS los muros de albañilería
    if (typeof dibujarMurosAlbanileriaEnCanvas === 'function') {
        dibujarMurosAlbanileriaEnCanvas(ctx);
    }
    
    // 5. Dibujar TODOS los tabiques
    if (typeof dibujarTabiquesEnCanvas === 'function') {
        dibujarTabiquesEnCanvas(ctx);
    }
    
    // 6. Dibujar TODOS los muros estructurales
    if (typeof dibujarMurosEstructuralesEnCanvas === 'function') {
        dibujarMurosEstructuralesEnCanvas(ctx);
    }
    
    // 7. Dibujar TODOS los radieres
    if (typeof dibujarRadieresEnCanvas === 'function') {
        dibujarRadieresEnCanvas(ctx);
    }
    
    // 8. Dibujar TODAS las cubiertas
    if (typeof dibujarCubiertasEnCanvas === 'function') {
        dibujarCubiertasEnCanvas(ctx);
    }
}

// Exportar funciones globalmente
window.redibujarCanvasGlobal = redibujarCanvasGlobal;
window.redibujarCanvas = redibujarCanvasGlobal; // Alias para compatibilidad

// Función para limpiar caché de imagen (llamar al cargar nueva imagen)
window.limpiarCacheImagenPlano = function(planoId) {
    if (imagenCache.has(planoId)) {
        imagenCache.delete(planoId);
        console.log(`🗑️ Caché de imagen limpiado para plano ${planoId}`);
    }
};