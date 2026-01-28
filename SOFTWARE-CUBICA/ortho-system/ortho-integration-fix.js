/**
 * ORTHO INTEGRATION FIX - FINAL
 * Intercepta las funciones de obtención de posición después de que se carguen
 */

(function() {
    'use strict';
    
    console.log('[ORTHO FIX] Inicializando interceptor...');
    
    // Esperar a que TODO esté cargado
    window.addEventListener('load', function() {
        setTimeout(iniciarInterceptor, 1000);
    });
    
    function iniciarInterceptor() {
        console.log('[ORTHO FIX] Interceptando funciones...');
        
        let interceptadas = 0;
        
        // 1. MURO HORMIGÓN
        if (typeof window.obtenerPosicionCanvas === 'function') {
            const original = window.obtenerPosicionCanvas;
            window.obtenerPosicionCanvas = function(event) {
                const pos = original.call(this, event);
                return aplicarOrthoSiActivo(pos, 'muro-hormigon');
            };
            interceptadas++;
            console.log('[ORTHO FIX] ✓ obtenerPosicionCanvas');
        }
        
        // 2. RADIER
        if (typeof window.obtenerPosicionCanvasRadier === 'function') {
            const original = window.obtenerPosicionCanvasRadier;
            window.obtenerPosicionCanvasRadier = function(event) {
                const pos = original.call(this, event);
                return aplicarOrthoSiActivo(pos, 'radier');
            };
            interceptadas++;
            console.log('[ORTHO FIX] ✓ obtenerPosicionCanvasRadier');
        }
        
        // 3. ALBAÑILERÍA
        if (typeof window.obtenerPosicionCanvasAlbanileria === 'function') {
            const original = window.obtenerPosicionCanvasAlbanileria;
            window.obtenerPosicionCanvasAlbanileria = function(event) {
                const pos = original.call(this, event);
                return aplicarOrthoSiActivo(pos, 'muro-albanileria');
            };
            interceptadas++;
            console.log('[ORTHO FIX] ✓ obtenerPosicionCanvasAlbanileria');
        }
        
        // 4. TABIQUE
        if (typeof window.obtenerPosicionCanvasTabique === 'function') {
            const original = window.obtenerPosicionCanvasTabique;
            window.obtenerPosicionCanvasTabique = function(event) {
                const pos = original.call(this, event);
                return aplicarOrthoSiActivo(pos, 'tabique');
            };
            interceptadas++;
            console.log('[ORTHO FIX] ✓ obtenerPosicionCanvasTabique');
        }
        
        // 5. MURO ESTRUCTURAL
        if (typeof window.obtenerPosicionCanvasMuroEstructural === 'function') {
            const original = window.obtenerPosicionCanvasMuroEstructural;
            window.obtenerPosicionCanvasMuroEstructural = function(event) {
                const pos = original.call(this, event);
                return aplicarOrthoSiActivo(pos, 'muro-estructural');
            };
            interceptadas++;
            console.log('[ORTHO FIX] ✓ obtenerPosicionCanvasMuroEstructural');
        }
        
        // 6. CUBIERTA
        if (typeof window.obtenerPosicionCanvasCubierta === 'function') {
            const original = window.obtenerPosicionCanvasCubierta;
            window.obtenerPosicionCanvasCubierta = function(event) {
                const pos = original.call(this, event);
                return aplicarOrthoSiActivo(pos, 'cubierta');
            };
            interceptadas++;
            console.log('[ORTHO FIX] ✓ obtenerPosicionCanvasCubierta');
        }
        
        console.log(`[ORTHO FIX] ✅ ${interceptadas} funciones interceptadas`);
        
        if (interceptadas === 0) {
            console.error('[ORTHO FIX] ❌ NO se interceptó ninguna función');
        }
    }
    
    /**
     * Aplicar ORTHO si está activo
     */
    function aplicarOrthoSiActivo(pos, herramienta) {
        if (!pos) return pos;
        
        // Verificar si ORTHO está activo
        if (!window.OrthoSystem || !OrthoSystem.isEnabled()) {
            return pos;
        }
        
        // Obtener punto inicial según herramienta
        const puntoInicial = obtenerPuntoInicial(herramienta);
        if (!puntoInicial) {
            return pos;
        }
        
        // Procesar con ORTHO
        if (typeof window.orthoProcessPoint === 'function') {
            const processed = orthoProcessPoint(puntoInicial, pos);
            if (processed && processed.point) {
                console.log(`[ORTHO] ${herramienta}: (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}) → (${processed.point.x.toFixed(0)}, ${processed.point.y.toFixed(0)})`);
                return processed.point;
            }
        }
        
        return pos;
    }
    
    /**
     * Obtener punto inicial según herramienta
     */
    function obtenerPuntoInicial(herramienta) {
        try {
            switch(herramienta) {
                case 'muro-hormigon':
                    if (window.puntosPolilinea && puntosPolilinea.length > 0) {
                        return puntosPolilinea[puntosPolilinea.length - 1];
                    }
                    break;
                    
                case 'radier':
                    if (window.puntosPoligonoRadier && puntosPoligonoRadier.length > 0) {
                        return puntosPoligonoRadier[puntosPoligonoRadier.length - 1];
                    }
                    break;
                    
                case 'muro-albanileria':
                    if (window.puntosPolilineaAlbanileria && puntosPolilineaAlbanileria.length > 0) {
                        return puntosPolilineaAlbanileria[puntosPolilineaAlbanileria.length - 1];
                    }
                    break;
                    
                case 'tabique':
                    if (window.puntosPolilineaTabique && puntosPolilineaTabique.length > 0) {
                        return puntosPolilineaTabique[puntosPolilineaTabique.length - 1];
                    }
                    break;
                    
                case 'muro-estructural':
                    if (window.puntosPolilineaMuroEstructural && puntosPolilineaMuroEstructural.length > 0) {
                        return puntosPolilineaMuroEstructural[puntosPolilineaMuroEstructural.length - 1];
                    }
                    break;
                    
                case 'cubierta':
                    if (window.puntosPoligonoCubierta && puntosPoligonoCubierta.length > 0) {
                        return puntosPoligonoCubierta[puntosPoligonoCubierta.length - 1];
                    }
                    break;
            }
        } catch (e) {
            console.error('[ORTHO] Error obteniendo punto inicial:', e);
        }
        
        return null;
    }
    
})();

console.log('[ORTHO FIX] Script cargado');