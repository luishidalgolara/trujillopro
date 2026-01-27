// INTEGRACIÓN CAD TOOLBAR
(function() {
    'use strict';

    const COLORES_ACI = generarColoresACI();
    let colorActual = 1;
    let grosorActual = 2;

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

    function selectTool(tool) {
        if (window.DrawingCore && window.DrawingCore.seleccionarHerramientaDibujo) {
            // Desactivar herramientas de agua potable
            const planoActual = window.plans ? window.plans[window.currentPlanIndex] : null;
            if (planoActual) planoActual.currentTool = null;
            document.querySelectorAll('.btn-tool').forEach(btn => {
                if (!btn.classList.contains('cad-tool-btn')) {
                    btn.classList.remove('active');
                }
            });

            window.DrawingCore.seleccionarHerramientaDibujo(tool);
            
            document.querySelectorAll('.cad-tool-btn').forEach(btn => btn.classList.remove('active'));
            const btnActivo = document.querySelector(`.cad-tool-btn[data-tool="${tool}"]`);
            if (btnActivo) btnActivo.classList.add('active');
        }
    }

    function selectColor(numero) {
        colorActual = numero;
        
        document.querySelectorAll('.color-square').forEach(btn => btn.classList.remove('active'));
        const btn = document.querySelector(`.color-square[data-color="${numero}"]`);
        if (btn) btn.classList.add('active');

        if (window.DrawingCore && window.DrawingCore.ESTILOS_DIBUJO) {
            window.DrawingCore.ESTILOS_DIBUJO.stroke = COLORES_ACI[numero].hex;
        }
        if (window.DRAWING_STYLES) {
            window.DRAWING_STYLES.stroke = COLORES_ACI[numero].hex;
        }
    }

    function selectGrosor(grosor) {
        grosorActual = grosor;
        
        document.querySelectorAll('.grosor-btn').forEach(btn => btn.classList.remove('active'));
        const btn = document.querySelector(`.grosor-btn[data-grosor="${grosor}"]`);
        if (btn) btn.classList.add('active');

        if (window.DrawingCore && window.DrawingCore.ESTILOS_DIBUJO) {
            window.DrawingCore.ESTILOS_DIBUJO.strokeWidth = grosor;
        }
        if (window.DRAWING_STYLES) {
            window.DRAWING_STYLES.strokeWidth = grosor;
        }
    }

    function openColorModal() {
        const grid = document.getElementById('gridColoresACI');
        if (grid && grid.children.length === 0) {
            for (let i = 10; i <= 255; i++) {
                const color = COLORES_ACI[i];
                const div = document.createElement('div');
                div.className = 'color-item-modal';
                div.dataset.color = i;
                div.style.background = color.hex;
                div.title = `${i} - ${color.nombre}`;
                div.textContent = i;
                div.addEventListener('click', function() {
                    selectColor(i);
                    closeColorModal();
                });
                grid.appendChild(div);
            }
        }
        document.getElementById('modalColoresACI').classList.add('active');
    }

    function closeColorModal() {
        document.getElementById('modalColoresACI').classList.remove('active');
    }

    function inicializar() {
        // Eventos colores
        document.querySelectorAll('.color-square').forEach(btn => {
            btn.addEventListener('click', function() {
                selectColor(parseInt(this.dataset.color));
            });
        });

        // Eventos grosores
        document.querySelectorAll('.grosor-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                selectGrosor(parseInt(this.dataset.grosor));
            });
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('modalColoresACI');
                if (modal && modal.classList.contains('active')) {
                    closeColorModal();
                }
            }
        });

        // Cerrar modal click fuera
        document.getElementById('modalColoresACI')?.addEventListener('click', function(e) {
            if (e.target.id === 'modalColoresACI') {
                closeColorModal();
            }
        });

        // Atajos de teclado
        document.addEventListener('keydown', function(e) {
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') return;

            if (e.key === 'l' || e.key === 'L') selectTool('line');
            else if (e.key === 'c' || e.key === 'C') selectTool('circle');
            else if (e.key === 'p' || e.key === 'P') selectTool('pline');
            else if (e.key === 'a' || e.key === 'A') selectTool('arc');
        });
    }

    window.CADTools = {
        selectTool,
        selectColor,
        selectGrosor,
        openColorModal,
        closeColorModal,
        COLORES_ACI
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

    console.log('✅ CAD Toolbar integrado correctamente');
})();