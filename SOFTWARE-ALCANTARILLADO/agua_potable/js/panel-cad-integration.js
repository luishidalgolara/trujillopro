// ================================
// PANEL CAD - INTEGRACIÓN COMPLETA
// ================================

(function() {
    'use strict';

    // ================================
    // VARIABLES GLOBALES
    // ================================
    let panelCollapsed = false;

    // ================================
    // TOGGLE PANEL (MOSTRAR/OCULTAR)
    // ================================
    window.togglePanelCAD = function() {
        const panel = document.getElementById('panelCAD');
        const btn = document.querySelector('.btn-toggle-panel');
        
        panelCollapsed = !panelCollapsed;
        
        if (panelCollapsed) {
            panel.classList.add('collapsed');
            btn.textContent = '▲';
        } else {
            panel.classList.remove('collapsed');
            btn.textContent = '▼';
        }
    };

    // ================================
    // SELECCIONAR HERRAMIENTA
    // ================================
    function selectTool(tool) {
        // Desactivar herramientas de agua potable
        const planoActual = window.plans ? window.plans[window.currentPlanIndex] : null;
        if (planoActual) {
            planoActual.currentTool = null;
        }
        document.querySelectorAll('.btn-tool').forEach(btn => btn.classList.remove('active'));
        
        // Desactivar modo medición si está activo
        if (window.MeasuringTool && window.MeasuringTool.estaMidiendo()) {
            window.MeasuringTool.toggleMeasuringMode();
        }
        
        // Activar herramienta CAD
        if (window.DrawingCore && window.DrawingCore.seleccionarHerramientaDibujo) {
            window.DrawingCore.seleccionarHerramientaDibujo(tool);
            
            // Activar botón visualmente
            document.querySelectorAll('.cad-tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const btnActivo = document.querySelector(`.cad-tool-btn[data-tool="${tool}"]`);
            if (btnActivo) {
                btnActivo.classList.add('active');
            }
        } else {
            console.error('❌ DrawingCore no está disponible');
        }
    }

    // ================================
    // TOGGLE MODO MEDICIÓN
    // ================================
    function toggleMeasuring() {
        if (window.MeasuringTool && window.MeasuringTool.toggleMeasuringMode) {
            // Cancelar cualquier herramienta de dibujo activa
            if (window.DrawingCore && window.DrawingCore.cancelarDibujoActual) {
                window.DrawingCore.cancelarDibujoActual();
            }
            
            document.querySelectorAll('.cad-tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            window.MeasuringTool.toggleMeasuringMode();
            
            const btn = document.getElementById('btnMeasuring');
            if (btn) {
                if (window.MeasuringTool.estaMidiendo()) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        } else {
            console.error('❌ MeasuringTool no está disponible');
        }
    }

    // ================================
    // LIMPIAR MEDICIONES
    // ================================
    function clearMeasurements() {
        if (window.MeasuringTool && window.MeasuringTool.limpiarTodasMediciones) {
            if (confirm('¿Eliminar todas las mediciones?')) {
                window.MeasuringTool.limpiarTodasMediciones();
            }
        } else {
            console.error('❌ MeasuringTool no está disponible');
        }
    }

    // ================================
    // INICIALIZAR COLORES ACI
    // ================================
    function inicializarColoresACI() {
        // Generar colores 10-255 para el modal
        const grid = document.getElementById('gridColoresACI');
        if (!grid) return;

        const COLORES_ACI = window.ColorPickerACI ? window.ColorPickerACI.COLORES_ACI : generarColoresACI();

        for (let i = 10; i <= 255; i++) {
            const color = COLORES_ACI[i];
            const div = document.createElement('div');
            div.className = 'color-item-modal';
            div.dataset.color = i;
            div.style.background = color.hex;
            div.title = `${i} - ${color.nombre}`;
            div.textContent = i;
            
            div.addEventListener('click', function() {
                if (window.ColorPickerACI && window.ColorPickerACI.seleccionarColorACI) {
                    window.ColorPickerACI.seleccionarColorACI(i);
                    cerrarModalColores();
                    
                    // Actualizar UI del panel principal
                    document.querySelectorAll('.color-btn-aci[data-color]').forEach(btn => {
                        btn.classList.remove('active');
                    });
                }
            });
            
            grid.appendChild(div);
        }

        // Eventos para botones de colores principales (1-9)
        document.querySelectorAll('.color-btn-aci[data-color]').forEach(btn => {
            btn.addEventListener('click', function() {
                const color = parseInt(this.dataset.color);
                if (window.ColorPickerACI && window.ColorPickerACI.seleccionarColorACI) {
                    window.ColorPickerACI.seleccionarColorACI(color);
                    
                    document.querySelectorAll('.color-btn-aci[data-color]').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });

        // Botón "más colores"
        document.querySelector('.color-btn-aci.mas-colores')?.addEventListener('click', abrirModalColores);

        // Eventos para grosores
        document.querySelectorAll('.grosor-btn-aci').forEach(btn => {
            btn.addEventListener('click', function() {
                const grosor = parseInt(this.dataset.grosor);
                if (window.ColorPickerACI && window.ColorPickerACI.seleccionarGrosor) {
                    window.ColorPickerACI.seleccionarGrosor(grosor);
                    
                    document.querySelectorAll('.grosor-btn-aci').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    // ================================
    // GENERAR COLORES ACI (FALLBACK)
    // ================================
    function generarColoresACI() {
        const colores = {
            1: { nombre: 'Rojo', hex: '#FF0000' },
            2: { nombre: 'Amarillo', hex: '#FFFF00' },
            3: { nombre: 'Verde', hex: '#00FF00' },
            4: { nombre: 'Cian', hex: '#00FFFF' },
            5: { nombre: 'Azul', hex: '#0000FF' },
            6: { nombre: 'Magenta', hex: '#FF00FF' },
            7: { nombre: 'Blanco', hex: '#FFFFFF' },
            8: { nombre: 'Gris Claro', hex: '#808080' },
            9: { nombre: 'Gris Oscuro', hex: '#404040' }
        };

        for (let i = 10; i <= 255; i++) {
            const hue = ((i - 10) * 360 / 246) % 360;
            const sat = 70 + (i % 3) * 10;
            const light = 30 + (Math.floor(i / 50)) * 10;
            colores[i] = {
                nombre: `Color ${i}`,
                hex: hslToHex(hue, sat, light)
            };
        }

        return colores;
    }

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    }

    // ================================
    // MODAL COLORES
    // ================================
    window.abrirModalColores = function() {
        document.getElementById('modalColoresACI')?.classList.add('active');
    };

    window.cerrarModalColores = function() {
        document.getElementById('modalColoresACI')?.classList.remove('active');
    };

    // Cerrar con ESC o click fuera
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modalColoresACI');
            if (modal && modal.classList.contains('active')) {
                cerrarModalColores();
            }
        }
    });

    document.getElementById('modalColoresACI')?.addEventListener('click', function(e) {
        if (e.target.id === 'modalColoresACI') {
            cerrarModalColores();
        }
    });

    // ================================
    // ATAJOS DE TECLADO
    // ================================
    document.addEventListener('keydown', function(e) {
        // No interferir con inputs o modales de texto
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        // L = LINE
        if (e.key === 'l' || e.key === 'L') {
            selectTool('line');
        }
        // C = CIRCLE
        else if (e.key === 'c' || e.key === 'C') {
            selectTool('circle');
        }
        // PL = PLINE (requiere presionar P después)
        else if (e.key === 'p' || e.key === 'P') {
            selectTool('pline');
        }
        // A = ARC
        else if (e.key === 'a' || e.key === 'A') {
            selectTool('arc');
        }
        // M = MEASURE
        else if (e.key === 'm' || e.key === 'M') {
            toggleMeasuring();
        }
    });

    // ================================
    // EXPORTAR API PÚBLICA
    // ================================
    window.CADPanel = {
        selectTool,
        toggleMeasuring,
        clearMeasurements,
        togglePanel: window.togglePanelCAD
    };

    // ================================
    // INICIALIZACIÓN
    // ================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarColoresACI);
    } else {
        inicializarColoresACI();
    }

    console.log('✅ Panel CAD integrado correctamente');

})();