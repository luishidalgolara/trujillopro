/**
 * Limpieza de Canvas y Elementos
 */
const PlanoManagerCleanup = {
    
    clearCanvas() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;
        
        try {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log('🧹 Canvas limpiado');
        } catch (e) {
            console.warn('Error al limpiar canvas:', e);
        }
    },
    
    clearAllElements() {
        try {
            if (typeof murosHormigon !== 'undefined') murosHormigon = [];
            if (typeof murosAlbanileria !== 'undefined') murosAlbanileria = [];
            if (typeof tabiques !== 'undefined') tabiques = [];
            if (typeof murosEstructurales !== 'undefined') murosEstructurales = [];
            if (typeof radieres !== 'undefined') radieres = [];
            if (typeof cubiertas !== 'undefined') cubiertas = [];
            
            console.log('🧹 Elementos globales limpiados');
        } catch (e) {
            console.warn('Error al limpiar elementos:', e);
        }
    },
    
    createEmptyCanvas() {
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

window.PlanoManagerCleanup = PlanoManagerCleanup;
