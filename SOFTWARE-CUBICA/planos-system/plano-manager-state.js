/**
 * Gestor de Estado de Planos
 */
const PlanoManagerState = {
    
    saveCurrentPlanoState(planoEspecifico = null) {
        const plano = planoEspecifico || PlanoState.getActivePlano();
        if (!plano) return;
        
        try {
            // Guardar elementos
            if (typeof murosHormigon !== 'undefined') {
                plano.murosHormigon = JSON.parse(JSON.stringify(murosHormigon));
                console.log(`  💾 Guardados ${murosHormigon.length} muros de hormigón`);
            }
            if (typeof murosAlbanileria !== 'undefined') {
                plano.murosAlbanileria = JSON.parse(JSON.stringify(murosAlbanileria));
                console.log(`  💾 Guardados ${murosAlbanileria.length} muros de albañilería`);
            }
            if (typeof tabiques !== 'undefined') {
                plano.tabiques = JSON.parse(JSON.stringify(tabiques));
                console.log(`  💾 Guardados ${tabiques.length} tabiques`);
            }
            if (typeof murosEstructurales !== 'undefined') {
                plano.murosEstructurales = JSON.parse(JSON.stringify(murosEstructurales));
                console.log(`  💾 Guardados ${murosEstructurales.length} muros estructurales`);
            }
            if (typeof radieres !== 'undefined') {
                plano.radieres = JSON.parse(JSON.stringify(radieres));
                console.log(`  💾 Guardados ${radieres.length} radieres`);
            }
            if (typeof cubiertas !== 'undefined') {
                plano.cubiertas = JSON.parse(JSON.stringify(cubiertas));
                console.log(`  💾 Guardadas ${cubiertas.length} cubiertas`);
            }
            
            // Guardar canvas
            const canvas = document.getElementById('mainCanvas');
            if (canvas) {
                plano.svgInnerHTML = canvas.toDataURL();
            }
            
            // Guardar datos del proyecto
            const projectName = document.getElementById('projectName');
            const projectCode = document.getElementById('projectCode');
            if (projectName) plano.projectName = projectName.value;
            if (projectCode) plano.projectCode = projectCode.value;
            
            plano.updateLastModified();
            
            console.log(`💾 Estado guardado: ${plano.name}`);
        } catch (e) {
            console.warn('Error al guardar estado:', e);
        }
    },
    
    loadPlanoState(plano) {
        if (!plano) return;
        
        try {
            // Limpiar todo
            PlanoManagerCleanup.clearCanvas();
            PlanoManagerCleanup.clearAllElements();
            
            // Cargar elementos
            if (typeof murosHormigon !== 'undefined') {
                murosHormigon = JSON.parse(JSON.stringify(plano.murosHormigon || []));
            }
            if (typeof murosAlbanileria !== 'undefined') {
                murosAlbanileria = JSON.parse(JSON.stringify(plano.murosAlbanileria || []));
            }
            if (typeof tabiques !== 'undefined') {
                tabiques = JSON.parse(JSON.stringify(plano.tabiques || []));
            }
            if (typeof murosEstructurales !== 'undefined') {
                murosEstructurales = JSON.parse(JSON.stringify(plano.murosEstructurales || []));
            }
            if (typeof radieres !== 'undefined') {
                radieres = JSON.parse(JSON.stringify(plano.radieres || []));
            }
            if (typeof cubiertas !== 'undefined') {
                cubiertas = JSON.parse(JSON.stringify(plano.cubiertas || []));
            }
            
            // Cargar imagen de fondo del plano
            const canvas = document.getElementById('mainCanvas');
            if (canvas && plano.backgroundImage) {
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    console.log(`📸 Imagen cargada para: ${plano.name}`);
                    
                    // Redibujar elementos después de cargar imagen
                    setTimeout(() => {
                        if (typeof redibujarCanvas === 'function') {
                            redibujarCanvas();
                        }
                    }, 100);
                };
                img.src = plano.backgroundImage;
            } else if (canvas) {
                // Si no hay imagen, mostrar canvas vacío
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            // Cargar datos del proyecto
            const projectName = document.getElementById('projectName');
            const projectCode = document.getElementById('projectCode');
            if (projectName) projectName.value = plano.projectName || '';
            if (projectCode) projectCode.value = plano.projectCode || '';
            
            console.log(`📂 Estado cargado: ${plano.name}`);
        } catch (e) {
            console.warn('Error al cargar estado:', e);
        }
    }
};

window.PlanoManagerState = PlanoManagerState;