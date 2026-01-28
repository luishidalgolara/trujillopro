/**
 * SISTEMA ORTHO - INICIALIZACIÓN
 * Inicializa todos los módulos del sistema ORTHO
 */

(function() {
    'use strict';
    
    console.log('[ORTHO] Iniciando sistema ORTHO...');
    
    /**
     * Verificar que todos los módulos estén cargados
     */
    function checkModules() {
        const requiredModules = [
            'OrthoSystem.state',
            'OrthoSystem.calculator',
            'OrthoSystem.visual',
            'OrthoSystem.ui',
            'OrthoSystem.integration'
        ];
        
        const missing = [];
        
        requiredModules.forEach(module => {
            const parts = module.split('.');
            let obj = window;
            
            for (let part of parts) {
                if (!obj[part]) {
                    missing.push(module);
                    break;
                }
                obj = obj[part];
            }
        });
        
        if (missing.length > 0) {
            console.error('[ORTHO] Módulos faltantes:', missing);
            return false;
        }
        
        return true;
    }
    
    /**
     * Inicializar sistema ORTHO
     */
    function init() {
        // Verificar módulos
        if (!checkModules()) {
            console.error('[ORTHO] No se pudo inicializar: módulos faltantes');
            return;
        }
        
        // Inicializar UI
        if (OrthoSystem.ui && OrthoSystem.ui.init) {
            OrthoSystem.ui.init();
        }
        
        // Configurar eventos globales
        setupGlobalEvents();
        
        // Integración con canvas global
        integrateWithCanvas();
        
        console.log('[ORTHO] ✓ Sistema ORTHO completamente inicializado');
        console.log('[ORTHO] ✓ Presiona F8 o el botón ORTHO para activar');
        console.log('[ORTHO] ✓ Las líneas se ajustarán automáticamente a 90°');
    }
    
    /**
     * Configurar eventos globales
     */
    function setupGlobalEvents() {
        // Listener para mensajes de depuración
        window.addEventListener('ortho:debug', (e) => {
            console.log('[ORTHO DEBUG]', e.detail);
        });
        
        // Listener para cambios de estado
        window.addEventListener('ortho:statechange', (e) => {
            console.log('[ORTHO] Estado cambió:', e.detail);
        });
    }
    
    /**
     * Integración con canvas global
     */
    function integrateWithCanvas() {
        // Verificar si existe el canvas global
        const canvas = document.getElementById('mainCanvas');
        if (!canvas) {
            console.warn('[ORTHO] Canvas principal no encontrado aún');
            return;
        }
        
        console.log('[ORTHO] ✓ Integrado con canvas principal');
    }
    
    /**
     * Función de ayuda para depuración
     */
    window.orthoDebug = function() {
        console.log('=== ORTHO SYSTEM DEBUG ===');
        console.log('Enabled:', OrthoSystem.isEnabled());
        console.log('State:', OrthoSystem.getState());
        console.log('Temp:', OrthoSystem.state.temp);
        console.log('Config:', OrthoSystem.state.config);
        console.log('=========================');
    };
    
    /**
     * Función de ayuda para testing
     */
    window.orthoTest = function() {
        console.log('[ORTHO TEST] Probando sistema...');
        
        // Test 1: Toggle
        console.log('Test 1: Toggle');
        OrthoSystem.toggle();
        console.log('Estado:', OrthoSystem.isEnabled());
        
        // Test 2: Cálculo ortogonal
        console.log('Test 2: Cálculo ortogonal');
        const result = OrthoSystem.calculator.calculateOrthoPoint(
            { x: 100, y: 100 },
            { x: 150, y: 120 }
        );
        console.log('Resultado:', result);
        
        // Test 3: Procesamiento de punto
        console.log('Test 3: Procesamiento de punto');
        const processed = OrthoSystem.integration.processPoint(
            { x: 100, y: 100 },
            { x: 150, y: 120 }
        );
        console.log('Procesado:', processed);
        
        console.log('[ORTHO TEST] ✓ Tests completados');
    };
    
    /**
     * Exportar API pública
     */
    window.ORTHO = {
        version: '1.0.0',
        enable: () => OrthoSystem.enable(),
        disable: () => OrthoSystem.disable(),
        toggle: () => OrthoSystem.toggle(),
        isEnabled: () => OrthoSystem.isEnabled(),
        processPoint: (start, current) => OrthoSystem.integration.processPoint(start, current),
        reset: () => OrthoSystem.reset(),
        debug: () => window.orthoDebug(),
        test: () => window.orthoTest()
    };
    
    /**
     * Inicializar cuando el DOM esté listo
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM ya está listo
        init();
    }
    
})();

console.log('[ORTHO] Script de inicialización cargado');
