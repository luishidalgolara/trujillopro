// nivel_2_ap/nivel-2-elements.js
import { getNivelSeleccionado } from './nivel-2-manager.js';

export function agregarAtributoNivel(elemento) {
    const nivel = getNivelSeleccionado();
    elemento.nivel = nivel;
    
    if (nivel === 2) {
        if (elemento.circle) {
            elemento.circle.classList.add('nivel-2');
        }
        if (elemento.group) {
            elemento.group.classList.add('nivel-2');
        }
    }
    
    return elemento;
}

export function filtrarElementosPorNivel(elementos, nivel) {
    return elementos.filter(el => el.nivel === nivel);
}

export function obtenerElementosNivel1(elementos) {
    return filtrarElementosPorNivel(elementos, 1);
}

export function obtenerElementosNivel2(elementos) {
    return filtrarElementosPorNivel(elementos, 2);
}

export function aplicarEstilosNivel2(svgElement) {
    if (svgElement) {
        svgElement.classList.add('nivel-2');
    }
}