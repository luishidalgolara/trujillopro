/**
 * Integración del sistema multi-plano con la aplicación eléctrica existente
 * Se encarga de interceptar acciones y mantener sincronizado el estado
 * 
 * ✅ REPARADO: Ahora permite redimensionar imágenes sin interferencias
 */

// Auto-inicializar cuando la página cargue completamente
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🚀 Iniciando integración del sistema multi-plano eléctrico...');
        
        // Inicializar PlanoElectricoManager
        if (window.PlanoElectricoManager) {
            window.PlanoElectricoManager.init();
            console.log('✅ PlanoElectricoManager inicializado');
        }
        
        // Interceptar acciones importantes
        interceptarAccionesElectricas();
        
        // Interceptar botones de formato A0/A1
        interceptarBotonesFormato();
        
        // Interceptar botones de escala
        interceptarBotonesEscala();
        
        // Interceptar herramientas
        interceptarHerramientas();
        
        // Inicializar interceptores de módulos
        if (window.VinetaInterceptor) {
            window.VinetaInterceptor.init();
            console.log('✅ VinetaInterceptor inicializado');
        }
        
        if (window.CuadroCargasInterceptor) {
            window.CuadroCargasInterceptor.init();
            console.log('✅ CuadroCargasInterceptor inicializado');
        }
        
        console.log('✅ Integración del sistema multi-plano eléctrico completada');
    }, 1500); // Esperar un poco más para asegurar que todo esté cargado
});

// ========================================
// INTERCEPTAR ACCIONES ELÉCTRICAS
// ========================================
function interceptarAccionesElectricas() {
    // Interceptar cuando se agregan elementos al plano
    const planoSVG = document.getElementById('plano');
    if (planoSVG) {
        // ✅ VARIABLE DE CONTROL PARA PAUSAR EL OBSERVER
        let pausarGuardado = false;
        let timeoutGuardado = null;
        
        // Observar cambios en el SVG
        const observer = new MutationObserver(() => {
            // ✅ NO GUARDAR si estamos redimensionando o arrastrando
            if (pausarGuardado) {
                console.log('⏸️ Guardado pausado (redimensionando imagen)');
                return;
            }
            
            // ✅ NO GUARDAR si ImageController está activo
            if (window.ImageController) {
                if (window.ImageController.isResizing || window.ImageController.isDragging) {
                    console.log('⏸️ Guardado pausado (ImageController activo)');
                    return;
                }
            }
            
            // Limpiar timeout anterior
            if (timeoutGuardado) {
                clearTimeout(timeoutGuardado);
            }
            
            // Guardar estado con un delay más largo para evitar múltiples guardados
            timeoutGuardado = setTimeout(() => {
                if (window.PlanoElectricoManager && !pausarGuardado) {
                    window.PlanoElectricoManager.guardarEstadoPlanoActual();
                }
            }, 1000); // Aumentado a 1 segundo
        });
        
        // ✅ CONFIGURACIÓN MEJORADA DEL OBSERVER
        observer.observe(planoSVG, {
            childList: true,      // Detectar cuando se agregan/eliminan elementos
            subtree: true,        // Observar todos los descendientes
            attributes: false,    // ❌ NO observar cambios de atributos (esto causaba el problema)
            characterData: false  // ❌ NO observar cambios de texto
        });
        
        // ✅ MONITOREAR CUANDO IMAGECONTROLLER ESTÁ ACTIVO
        if (window.ImageController) {
            // Hook en startResize
            const originalStartResize = window.ImageController.startResize;
            window.ImageController.startResize = function(e, position) {
                pausarGuardado = true;
                console.log('🔒 Guardado automático pausado (inicio resize)');
                return originalStartResize.call(this, e, position);
            };
            
            // Hook en stopResize
            const originalStopResize = window.ImageController.stopResize;
            window.ImageController.stopResize = function(e) {
                const result = originalStopResize.call(this, e);
                setTimeout(() => {
                    pausarGuardado = false;
                    console.log('🔓 Guardado automático reanudado');
                    // Guardar después de redimensionar
                    if (window.PlanoElectricoManager) {
                        window.PlanoElectricoManager.guardarEstadoPlanoActual();
                    }
                }, 500);
                return result;
            };
            
            // Hook en startDrag
            const originalStartDrag = window.ImageController.startDrag;
            window.ImageController.startDrag = function(e) {
                pausarGuardado = true;
                console.log('🔒 Guardado automático pausado (inicio drag)');
                return originalStartDrag.call(this, e);
            };
            
            // Hook en stopDrag
            const originalStopDrag = window.ImageController.stopDrag;
            window.ImageController.stopDrag = function(e) {
                const result = originalStopDrag.call(this, e);
                setTimeout(() => {
                    pausarGuardado = false;
                    console.log('🔓 Guardado automático reanudado');
                    // Guardar después de mover
                    if (window.PlanoElectricoManager) {
                        window.PlanoElectricoManager.guardarEstadoPlanoActual();
                    }
                }, 500);
                return result;
            };
            
            console.log('✅ ImageController interceptado correctamente');
        }
        
        console.log('✅ Observer del SVG configurado (sin interferir con imágenes)');
    }
    
    console.log('✅ Acciones eléctricas interceptadas');
}

// ========================================
// INTERCEPTAR BOTONES DE FORMATO A0/A1
// ========================================
function interceptarBotonesFormato() {
    const btnA0 = document.getElementById('btnA0');
    const btnA1 = document.getElementById('btnA1');
    
    if (btnA0) {
        btnA0.addEventListener('click', function(e) {
            console.log('📐 Formato A0 seleccionado para plano actual');
            
            setTimeout(() => {
                const planoActual = window.PlanoElectricoManager.getPlanoActivo();
                if (planoActual) {
                    planoActual.setFormato('A0');
                    console.log(`  ✔ Formato A0 guardado en: ${planoActual.nombre}`);
                }
                
                // Guardar estado completo
                if (window.PlanoElectricoManager) {
                    window.PlanoElectricoManager.guardarEstadoPlanoActual();
                }
            }, 100);
        }, true);
        
        console.log('✅ Botón A0 interceptado');
    }
    
    if (btnA1) {
        btnA1.addEventListener('click', function(e) {
            console.log('📐 Formato A1 seleccionado para plano actual');
            
            setTimeout(() => {
                const planoActual = window.PlanoElectricoManager.getPlanoActivo();
                if (planoActual) {
                    planoActual.setFormato('A1');
                    console.log(`  ✔ Formato A1 guardado en: ${planoActual.nombre}`);
                }
                
                // Guardar estado completo
                if (window.PlanoElectricoManager) {
                    window.PlanoElectricoManager.guardarEstadoPlanoActual();
                }
            }, 100);
        }, true);
        
        console.log('✅ Botón A1 interceptado');
    }
    
    if (!btnA0 && !btnA1) {
        console.warn('⚠️ No se encontraron botones de formato A0/A1');
    }
}

// ========================================
// INTERCEPTAR BOTONES DE ESCALA
// ========================================
function interceptarBotonesEscala() {
    const botonesEscala = document.querySelectorAll('.btn-scale');
    
    if (botonesEscala.length > 0) {
        botonesEscala.forEach(btn => {
            btn.addEventListener('click', function() {
                const escala = this.textContent.trim();
                console.log(`📐 Escala ${escala} seleccionada`);
                
                setTimeout(() => {
                    const planoActual = window.PlanoElectricoManager.getPlanoActivo();
                    if (planoActual) {
                        planoActual.setEscala(escala);
                        console.log(`  ✔ Escala ${escala} guardada en: ${planoActual.nombre}`);
                    }
                    
                    // Guardar estado
                    if (window.PlanoElectricoManager) {
                        window.PlanoElectricoManager.guardarEstadoPlanoActual();
                    }
                }, 100);
            });
        });
        
        console.log(`✅ ${botonesEscala.length} botones de escala interceptados`);
    }
}

// ========================================
// INTERCEPTAR HERRAMIENTAS
// ========================================
function interceptarHerramientas() {
    // Interceptar función selectTool si existe
    if (window.selectTool) {
        const originalSelectTool = window.selectTool;
        
        window.selectTool = function(tool) {
            // Ejecutar función original
            const resultado = originalSelectTool.apply(this, arguments);
            
            // Guardar herramienta en plano actual
            const planoActual = window.PlanoElectricoManager.getPlanoActivo();
            if (planoActual) {
                planoActual.setHerramienta(tool);
            }
            
            return resultado;
        };
        
        console.log('✅ Función selectTool interceptada');
    }
    
    // Interceptar función toggleMode si existe
    if (window.toggleMode) {
        const originalToggleMode = window.toggleMode;
        
        window.toggleMode = function() {
            // Ejecutar función original
            const resultado = originalToggleMode.apply(this, arguments);
            
            // Guardar modo en plano actual
            setTimeout(() => {
                const planoActual = window.PlanoElectricoManager.getPlanoActivo();
                if (planoActual && window.AppState) {
                    planoActual.setModo(window.AppState.mode);
                    console.log(`  ✔ Modo guardado: ${window.AppState.mode}`);
                }
            }, 100);
            
            return resultado;
        };
        
        console.log('✅ Función toggleMode interceptada');
    }
    
    // Interceptar función limpiarTodo si existe
    if (window.limpiarTodo) {
        const originalLimpiarTodo = window.limpiarTodo;
        
        window.limpiarTodo = function() {
            if (confirm('¿Estás seguro de limpiar todo el plano actual?\n\nEsta acción no se puede deshacer.')) {
                // Ejecutar función original
                const resultado = originalLimpiarTodo.apply(this, arguments);
                
                // Limpiar datos del plano actual
                const planoActual = window.PlanoElectricoManager.getPlanoActivo();
                if (planoActual) {
                    planoActual.limpiarElementos();
                    planoActual.limpiarTrazado();
                    planoActual.limpiarDibujos();
                }
                
                // Guardar estado
                setTimeout(() => {
                    if (window.PlanoElectricoManager) {
                        window.PlanoElectricoManager.guardarEstadoPlanoActual();
                    }
                }, 200);
                
                return resultado;
            }
        };
        
        console.log('✅ Función limpiarTodo interceptada');
    }
}

// ========================================
// AUTO-GUARDADO CADA 30 SEGUNDOS
// ========================================
setInterval(() => {
    if (window.PlanoElectricoManager && window.PlanoElectricoManager.inicializado) {
        // ✅ NO guardar si estamos redimensionando
        if (window.ImageController) {
            if (window.ImageController.isResizing || window.ImageController.isDragging) {
                console.log('⏸️ Auto-guardado omitido (imagen en edición)');
                return;
            }
        }
        
        window.PlanoElectricoManager.guardarEstadoPlanoActual();
        console.log('💾 Auto-guardado del plano actual');
    }
}, 30000);

// ========================================
// GUARDAR ANTES DE CERRAR/RECARGAR
// ========================================
window.addEventListener('beforeunload', function(e) {
    if (window.PlanoElectricoManager && window.PlanoElectricoManager.inicializado) {
        window.PlanoElectricoManager.guardarEstadoPlanoActual();
        console.log('💾 Estado guardado antes de cerrar');
    }
});

console.log('✅ Sistema de integración multi-plano eléctrico cargado (REPARADO - permite redimensionar imágenes)');