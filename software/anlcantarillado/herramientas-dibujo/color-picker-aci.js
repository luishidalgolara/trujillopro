// ================================
// COLOR PICKER ACI - Sistema de colores AutoCAD
// ================================

const COLORES_ACI = {
    1: { nombre: 'Rojo', hex: '#FF0000' },
    2: { nombre: 'Amarillo', hex: '#FFFF00' },
    3: { nombre: 'Verde', hex: '#00FF00' },
    4: { nombre: 'Cian', hex: '#00FFFF' },
    5: { nombre: 'Azul', hex: '#0000FF' },
    6: { nombre: 'Magenta', hex: '#FF00FF' },
    7: { nombre: 'Blanco', hex: '#FFFFFF' },
    8: { nombre: 'Gris Claro', hex: '#808080' },
    9: { nombre: 'Gris Oscuro', hex: '#404040' },
    // Colores 10-255 (generados automáticamente)
};

// Generar colores 10-255
for (let i = 10; i <= 255; i++) {
    const hue = ((i - 10) * 360 / 246) % 360;
    const sat = 70 + (i % 3) * 10;
    const light = 30 + (Math.floor(i / 50)) * 10;
    COLORES_ACI[i] = {
        nombre: `Color ${i}`,
        hex: hslToHex(hue, sat, light)
    };
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

let colorActualACI = 1;
let grosorActual = 2;

// ================================
// INYECTAR HTML Y CSS
// ================================
function inicializarColorPickerACI() {
    inyectarEstilosACI();
    inyectarPanelColores();
    inyectarModalColores();
    aplicarColorActual();
}

function inyectarEstilosACI() {
    const estilo = document.createElement('style');
    estilo.id = 'aci-styles';
    estilo.textContent = `
        .panel-group.colores-aci {
            display: flex;
            align-items: center;
            gap: 3px;
            background: rgba(0, 0, 0, 0.2);
            padding: 3px 8px;
            border-radius: 6px;
            border: 1px solid rgba(0, 212, 255, 0.2);
            backdrop-filter: blur(5px);
        }

        .color-btn-aci {
            width: 24px;
            height: 24px;
            border: 2px solid rgba(0, 212, 255, 0.3);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .color-btn-aci:hover {
            transform: translateY(-2px) scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
            border-color: #00d4ff;
        }

        .color-btn-aci.active {
            border: 3px solid #00ff88;
            transform: scale(1.15);
        }

        .color-btn-aci.mas-colores {
            background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 16px;
        }

        .grosor-btn-aci {
            width: 30px;
            height: 24px;
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e5e5e5;
            font-size: 0.65em;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .grosor-btn-aci:hover {
            background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
            color: #000000;
            border-color: #00d4ff;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
        }

        .grosor-btn-aci.active {
            background: linear-gradient(135deg, #ff4444 0%, #cc3333 100%);
            color: #ffffff;
            border-color: #ff4444;
            box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
        }

        .modal-colores-aci {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }

        .modal-colores-aci.active {
            display: flex;
        }

        .modal-colores-content {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border: 3px solid #00d4ff;
            border-radius: 15px;
            padding: 30px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .modal-colores-header {
            color: #00d4ff;
            font-size: 1.5em;
            font-weight: 700;
            text-align: center;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .modal-colores-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
            gap: 8px;
            margin-bottom: 20px;
        }

        .color-item-modal {
            width: 45px;
            height: 45px;
            border: 2px solid rgba(0, 212, 255, 0.3);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7em;
            color: white;
            text-shadow: 0 0 3px black;
            font-weight: 700;
        }

        .color-item-modal:hover {
            transform: scale(1.2);
            border-color: #00ff88;
            box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
            z-index: 10;
        }

        .modal-close-btn {
            background: linear-gradient(135deg, #ff4444 0%, #cc3333 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1em;
            width: 100%;
            transition: all 0.3s;
        }

        .modal-close-btn:hover {
            background: linear-gradient(135deg, #ff6666 0%, #ee5555 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 68, 68, 0.4);
        }
    `;
    document.head.appendChild(estilo);
}

function inyectarPanelColores() {
    const panelTrazado = document.querySelector('.tracing-panel');
    if (!panelTrazado) return;

    const grupoAcciones = Array.from(panelTrazado.querySelectorAll('.panel-group'))
        .find(g => g.textContent.includes('Acciones:'));
    
    if (!grupoAcciones) return;

    const htmlColores = `
        <div class="panel-group colores-aci">
            <span>Colores:</span>
            ${[1,2,3,4,5,6,7,8,9].map(i => 
                `<div class="color-btn-aci" data-color="${i}" style="background: ${COLORES_ACI[i].hex};" 
                     title="${i} - ${COLORES_ACI[i].nombre}"></div>`
            ).join('')}
            <div class="color-btn-aci mas-colores" title="Más colores (10-255)">+</div>
        </div>

        <div class="panel-group colores-aci">
            <span>Grosor:</span>
            ${[1,2,3,4,5].map(g => 
                `<div class="grosor-btn-aci" data-grosor="${g}">${g}px</div>`
            ).join('')}
        </div>
    `;

    grupoAcciones.insertAdjacentHTML('afterend', htmlColores);

    // Eventos
    document.querySelectorAll('.color-btn-aci[data-color]').forEach(btn => {
        btn.addEventListener('click', () => {
            seleccionarColorACI(parseInt(btn.dataset.color));
        });
    });

    document.querySelector('.color-btn-aci.mas-colores')?.addEventListener('click', abrirModalColores);

    document.querySelectorAll('.grosor-btn-aci').forEach(btn => {
        btn.addEventListener('click', () => {
            seleccionarGrosor(parseInt(btn.dataset.grosor));
        });
    });

    // Activar color y grosor por defecto
    document.querySelector(`.color-btn-aci[data-color="1"]`)?.classList.add('active');
    document.querySelector(`.grosor-btn-aci[data-grosor="2"]`)?.classList.add('active');
}

function inyectarModalColores() {
    const coloresHTML = Object.entries(COLORES_ACI)
        .filter(([num]) => parseInt(num) >= 10)
        .map(([num, data]) => `
            <div class="color-item-modal" data-color="${num}" style="background: ${data.hex};" 
                 title="${num} - ${data.nombre}">${num}</div>
        `).join('');

    const modalHTML = `
        <div class="modal-colores-aci" id="modalColoresACI">
            <div class="modal-colores-content">
                <div class="modal-colores-header">🎨 Paleta ACI Completa (10-255)</div>
                <div class="modal-colores-grid">
                    ${coloresHTML}
                </div>
                <button class="modal-close-btn" onclick="cerrarModalColores()">Cerrar</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Eventos para colores del modal
    document.querySelectorAll('.color-item-modal').forEach(item => {
        item.addEventListener('click', () => {
            seleccionarColorACI(parseInt(item.dataset.color));
            cerrarModalColores();
        });
    });

    // Cerrar con ESC o click fuera
    document.getElementById('modalColoresACI')?.addEventListener('click', (e) => {
        if (e.target.id === 'modalColoresACI') cerrarModalColores();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('modalColoresACI')?.classList.contains('active')) {
            cerrarModalColores();
        }
    });
}

// ================================
// FUNCIONES DE SELECCIÓN
// ================================
function seleccionarColorACI(numero) {
    colorActualACI = numero;
    
    // Actualizar UI - botones principales
    document.querySelectorAll('.color-btn-aci[data-color]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.color-btn-aci[data-color="${numero}"]`)?.classList.add('active');

    aplicarColorActual();
    
    const nombreColor = COLORES_ACI[numero]?.nombre || `Color ${numero}`;
    showStatus(`🎨 Color ACI ${numero} (${nombreColor}) seleccionado`);
}

function seleccionarGrosor(grosor) {
    grosorActual = grosor;
    
    // Actualizar UI
    document.querySelectorAll('.grosor-btn-aci').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.grosor-btn-aci[data-grosor="${grosor}"]`)?.classList.add('active');

    aplicarGrosorActual();
    
    showStatus(`📏 Grosor de línea: ${grosor}px`);
}

function aplicarColorActual() {
    const colorHex = COLORES_ACI[colorActualACI]?.hex || '#000000';
    
    // Actualizar ESTILOS_DIBUJO en drawing-core.js
    if (window.DRAWING_STYLES) {
        window.DRAWING_STYLES.stroke = colorHex;
    }
    if (window.DrawingCore?.ESTILOS_DIBUJO) {
        window.DrawingCore.ESTILOS_DIBUJO.stroke = colorHex;
    }
}

function aplicarGrosorActual() {
    // Actualizar ESTILOS_DIBUJO en drawing-core.js
    if (window.DRAWING_STYLES) {
        window.DRAWING_STYLES.strokeWidth = grosorActual;
    }
    if (window.DrawingCore?.ESTILOS_DIBUJO) {
        window.DrawingCore.ESTILOS_DIBUJO.strokeWidth = grosorActual;
    }
}

// ================================
// CAMBIAR COLOR DE ELEMENTOS EXISTENTES
// ================================
function cambiarColorElementoSeleccionado() {
    const elementoSeleccionado = document.querySelector('.drawing-element.selected, [data-drawing-element].selected');
    
    if (!elementoSeleccionado) {
        showStatus('⚠️ Selecciona un elemento primero');
        return;
    }

    const colorHex = COLORES_ACI[colorActualACI]?.hex || '#000000';
    
    elementoSeleccionado.setAttribute('stroke', colorHex);
    elementoSeleccionado.style.stroke = colorHex;
    
    const nombreColor = COLORES_ACI[colorActualACI]?.nombre || `Color ${colorActualACI}`;
    showStatus(`✅ Color cambiado a ACI ${colorActualACI} (${nombreColor})`);
}

function cambiarGrosorElementoSeleccionado() {
    const elementoSeleccionado = document.querySelector('.drawing-element.selected, [data-drawing-element].selected');
    
    if (!elementoSeleccionado) {
        showStatus('⚠️ Selecciona un elemento primero');
        return;
    }

    elementoSeleccionado.setAttribute('stroke-width', grosorActual);
    elementoSeleccionado.style.strokeWidth = grosorActual;
    
    showStatus(`✅ Grosor cambiado a ${grosorActual}px`);
}

// ================================
// MODAL
// ================================
function abrirModalColores() {
    document.getElementById('modalColoresACI')?.classList.add('active');
}

function cerrarModalColores() {
    document.getElementById('modalColoresACI')?.classList.remove('active');
}

// ================================
// ATAJOS DE TECLADO
// ================================
document.addEventListener('keydown', (e) => {
    // No interferir si hay modal de texto abierto
    if (document.getElementById('textModal')?.style.display === 'block') return;
    
    // Números 1-9 para colores rápidos
    if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.altKey) {
        const numero = parseInt(e.key);
        if (COLORES_ACI[numero]) {
            seleccionarColorACI(numero);
        }
    }
    
    // Ctrl + C = Cambiar color de elemento seleccionado
    if (e.ctrlKey && e.key === 'c' && !e.shiftKey) {
        e.preventDefault();
        cambiarColorElementoSeleccionado();
    }
    
    // Ctrl + W = Cambiar grosor de elemento seleccionado
    if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        cambiarGrosorElementoSeleccionado();
    }
    
    // + = Abrir modal de más colores
    if (e.key === '+' && !e.ctrlKey && !e.altKey) {
        abrirModalColores();
    }
});

// ================================
// EXPORTAR
// ================================
window.ColorPickerACI = {
    COLORES_ACI,
    seleccionarColorACI,
    seleccionarGrosor,
    cambiarColorElementoSeleccionado,
    cambiarGrosorElementoSeleccionado,
    abrirModalColores,
    cerrarModalColores,
    obtenerColorActual: () => colorActualACI,
    obtenerGrosorActual: () => grosorActual,
    obtenerColorHex: () => COLORES_ACI[colorActualACI]?.hex
};

// ================================
// INICIALIZACIÓN
// ================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarColorPickerACI);
} else {
    inicializarColorPickerACI();
}

console.log('✅ color-picker-aci.js cargado');