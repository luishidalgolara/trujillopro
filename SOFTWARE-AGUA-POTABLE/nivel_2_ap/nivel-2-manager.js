// nivel_2_ap/nivel-2-manager.js
import { setCurrentTool } from '../js/config.js';
import { showStatus } from '../js/utils.js';

let nivelSeleccionado = 1;
let selectorActivo = null;

export function getNivelSeleccionado() {
    return nivelSeleccionado;
}

export function setNivelSeleccionado(nivel) {
    nivelSeleccionado = nivel;
}

export function mostrarSelectorNivel(tool, boton) {
    cerrarSelectorNivel();
    
    const rect = boton.getBoundingClientRect();
    
    const selector = document.createElement('div');
    selector.className = 'nivel-selector show';
    selector.style.position = 'fixed';
    selector.style.top = (rect.bottom + 5) + 'px';
    selector.style.left = rect.left + 'px';
    
    const opcion1 = document.createElement('div');
    opcion1.className = 'nivel-option nivel-1';
    opcion1.textContent = '🔴 1° NIVEL';
    opcion1.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        seleccionarNivelParaHerramienta(tool, 1);
    });
    
    const opcion2 = document.createElement('div');
    opcion2.className = 'nivel-option nivel-2';
    opcion2.textContent = '🔵 2° NIVEL';
    opcion2.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        seleccionarNivelParaHerramienta(tool, 2);
    });
    
    selector.appendChild(opcion1);
    selector.appendChild(opcion2);
    
    document.body.appendChild(selector);
    selectorActivo = selector;
    
    boton.classList.add('active');
    
    setTimeout(() => {
        document.addEventListener('click', function cerrar(e) {
            if (!selector.contains(e.target) && !boton.contains(e.target)) {
                cerrarSelectorNivel();
                boton.classList.remove('active');
                document.removeEventListener('click', cerrar);
            }
        });
    }, 100);
}

export function cerrarSelectorNivel() {
    if (selectorActivo) {
        selectorActivo.remove();
        selectorActivo = null;
    }
}

function seleccionarNivelParaHerramienta(tool, nivel) {
    setNivelSeleccionado(nivel);
    setCurrentTool(tool);
    
    let info = `🔧 ${tool.toUpperCase()} seleccionado - NIVEL ${nivel}`;
    showStatus(info);
    
    cerrarSelectorNivel();
    
    console.log(`✅ Herramienta: ${tool}, Nivel: ${nivel}`);
}

export function necesitaSelectorNivel(tool) {
    const herramientasSinSelector = [
        'medidor-agua',
        'llave-jardin',
        'punto-conexion',
        'valvula-corte',
        'union-tee'
    ];
    
    return !herramientasSinSelector.includes(tool);
}