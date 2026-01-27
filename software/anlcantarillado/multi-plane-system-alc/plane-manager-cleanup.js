/**
 * Funciones de limpieza del canvas y elementos integrados
 */
const PlaneManagerCleanupAlc = {
    
    clearCanvas() {
        console.log('🧹 Limpiando canvas SVG...');
        const tracingSvg = document.getElementById('tracingSvg');
        if (tracingSvg) {
            const defs = tracingSvg.querySelector('defs');
            const defsContent = defs ? defs.outerHTML : `
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" stroke-width="0.5"/>
                    </pattern>
                </defs>
            `;
            
            tracingSvg.innerHTML = defsContent;
            console.log('  ✓ Canvas SVG limpiado');
        }
    },
    
    clearIntegratedElements() {
        console.log('🧹 Limpiando elementos integrados del DOM...');
        const drawingBoard = document.getElementById('drawingBoard');
        const zoomContainer = document.getElementById('zoomContainer');
        
        if (!drawingBoard) {
            console.warn('  ⚠️ drawingBoard no encontrado');
            return;
        }
        
        let removidos = 0;
        
        // Simbologías
        const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
        if (simbologias.length > 0) {
            simbologias.forEach(s => s.remove());
            removidos += simbologias.length;
            console.log(`  ✓ ${simbologias.length} simbología(s) eliminada(s)`);
        }
        
        // Cuadros de piezas
        const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
        if (cuadrosPiezas.length > 0) {
            cuadrosPiezas.forEach(c => c.remove());
            removidos += cuadrosPiezas.length;
            console.log(`  ✓ ${cuadrosPiezas.length} cuadro(s) de piezas eliminado(s)`);
        }
        
        // ✅ VIÑETA - Eliminación forzada
        const vineta = document.getElementById('vinetaWindow');
        if (vineta) {
            console.log('  🗑️ Eliminando viñeta del DOM...');
            vineta.remove();
            removidos++;
            console.log('  ✓ Viñeta eliminada');
        }
        
        // ⭐ CRÍTICO: Resetear flag global de viñeta
        if (typeof window.vinetaActiva !== 'undefined') {
            window.vinetaActiva = false;
            console.log('  ✓ Flag vinetaActiva reseteado');
        }
        
        // Cuadros de gastos
        const cuadrosGastos = drawingBoard.querySelectorAll('.cuadro-gastos-integrado');
        if (cuadrosGastos.length > 0) {
            cuadrosGastos.forEach(c => c.remove());
            removidos += cuadrosGastos.length;
            console.log(`  ✓ ${cuadrosGastos.length} cuadro(s) de gastos eliminado(s)`);
        }
        
        // ⭐ DETALLES - BUSCAR AMBOS: Agua Potable Y Alcantarillado
        const detallesAP = drawingBoard.querySelectorAll('.detalle-integrado-ap');
        const detallesALC = drawingBoard.querySelectorAll('.detalle-integrado-alc');
        const todosLosDetalles = [...detallesAP, ...detallesALC];
        
        if (todosLosDetalles.length > 0) {
            todosLosDetalles.forEach(d => d.remove());
            removidos += todosLosDetalles.length;
            console.log(`  ✓ ${todosLosDetalles.length} detalle(s) eliminado(s) (${detallesAP.length} AP + ${detallesALC.length} ALC)`);
        }
        
        // ⭐ ISOMÉTRICO N1 - BUSCAR EN ZOOMCONTAINER (NO EN DRAWINGBOARD)
        const isometricoN1 = zoomContainer ? zoomContainer.querySelector('#integratedIsometric') : null;
        if (isometricoN1) {
            isometricoN1.remove();
            removidos++;
            console.log('  ✓ Isométrico N1 eliminado (desde zoomContainer)');
        }
        
        // ⭐ ISOMÉTRICO N2 - BUSCAR EN ZOOMCONTAINER (NO EN DRAWINGBOARD)
        const isometricoN2 = zoomContainer ? zoomContainer.querySelector('#integratedIsometricN2') : null;
        if (isometricoN2) {
            isometricoN2.remove();
            removidos++;
            console.log('  ✓ Isométrico N2 eliminado (desde zoomContainer)');
        }
        
        // ⭐ NOTAS OBLIGATORIAS - BUSCAR .nota-plano-container (NO .notas-integradas)
        const notasObligatorias = drawingBoard.querySelectorAll('.nota-plano-container');
        if (notasObligatorias.length > 0) {
            notasObligatorias.forEach(n => n.remove());
            removidos += notasObligatorias.length;
            console.log(`  ✓ ${notasObligatorias.length} nota(s) obligatoria(s) eliminada(s)`);
        }
        
        // Cuadros UEH
        const cuadrosUEH = drawingBoard.querySelectorAll('.cuadro-ueh-integrado');
        if (cuadrosUEH.length > 0) {
            cuadrosUEH.forEach(c => c.remove());
            removidos += cuadrosUEH.length;
            console.log(`  ✓ ${cuadrosUEH.length} cuadro(s) UEH eliminado(s)`);
        }
        
        // Tablas NCh 2702
        const tablasNCh = drawingBoard.querySelectorAll('.tabla-nch2702-integrada');
        if (tablasNCh.length > 0) {
            tablasNCh.forEach(t => t.remove());
            removidos += tablasNCh.length;
            console.log(`  ✓ ${tablasNCh.length} tabla(s) NCh eliminada(s)`);
        }
        
        console.log(`  ✅ Total: ${removidos} elementos eliminados del DOM`);
    },
    
    resetIntegratedStates() {
        console.log('🔄 Reseteando estados globales...');
        
        // ✅ CRÍTICO: Resetear flag de isométricos
        if (window.isometricGenerator) {
            window.isometricGenerator.isIntegrated = false;
            console.log('  ✓ isometricGenerator.isIntegrated = false');
        }
        if (window.isometricGeneratorN2) {
            window.isometricGeneratorN2.isIntegrated = false;
            console.log('  ✓ isometricGeneratorN2.isIntegrated = false');
        }
        if (window.isometricNivel2Generator) {
            window.isometricNivel2Generator.isIntegrated = false;
            console.log('  ✓ isometricNivel2Generator.isIntegrated = false');
        }
        
        // ✅ CRÍTICO: Resetear variable global de viñeta
        if (typeof window.vinetaActiva !== 'undefined') {
            window.vinetaActiva = false;
            console.log('  ✓ vinetaActiva = false');
        }
        
        // ✅ NUEVO: Forzar limpieza de modal de viñeta si existe
        const vinetaModal = document.getElementById('vinetaModal');
        if (vinetaModal) {
            vinetaModal.style.display = 'none';
            console.log('  ✓ Modal de viñeta ocultado');
        }
        
        console.log('  ✅ Estados globales reseteados');
    },
    
    createEmptyCanvas() {
        console.log('📄 Creando canvas vacío...');
        const tracingSvg = document.getElementById('tracingSvg');
        if (tracingSvg) {
            tracingSvg.innerHTML = `
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" stroke-width="0.5"/>
                    </pattern>
                </defs>
            `;
            console.log('  ✓ Canvas vacío creado');
        }
    }
};

window.PlaneManagerCleanupAlc = PlaneManagerCleanupAlc;

console.log('✅ PlaneManagerCleanupAlc cargado');