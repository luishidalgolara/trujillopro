// js/ubicacion-autocomplete.js
// ============================================================
// SISTEMA DE AUTOCOMPLETADO INTELIGENTE - EMPRESAS SANITARIAS
// REEMPLAZA: company-detector.js (mantiene compatibilidad)
// ============================================================

import { setDetectedCompany } from './config.js';
import { showStatus } from './utils.js';
import { 
    EMPRESAS_SANITARIAS_DB, 
    buscarComuna, 
    obtenerEmpresaPorComuna,
    normalizarTexto 
} from './empresas-sanitarias-db.js';

// ============================================================
// ESTADO DEL SISTEMA
// ============================================================

let autocompleteDropdown = null;
let sugerenciasActuales = [];
let indiceSugerenciaSeleccionada = -1;

// ============================================================
// INICIALIZAR AUTOCOMPLETADO
// ============================================================

export function inicializarAutocompletado() {
    const addressInput = document.getElementById('addressInput');
    
    if (!addressInput) {
        console.error('❌ Input de dirección no encontrado');
        return;
    }
    
    // Crear dropdown si no existe
    if (!autocompleteDropdown) {
        crearDropdown();
    }
    
    // Event listeners
    addressInput.addEventListener('input', manejarInput);
    addressInput.addEventListener('keydown', manejarTeclas);
    addressInput.addEventListener('focus', manejarFocus);
    
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!addressInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
            ocultarDropdown();
        }
    });
    
    console.log('✅ Sistema de autocompletado inicializado');
}

// ============================================================
// CREAR DROPDOWN
// ============================================================

function crearDropdown() {
    autocompleteDropdown = document.createElement('div');
    autocompleteDropdown.id = 'autocompleteDropdown';
    autocompleteDropdown.className = 'autocomplete-dropdown';
    autocompleteDropdown.style.display = 'none';
    
    const addressInput = document.getElementById('addressInput');
    if (addressInput && addressInput.parentNode) {
        addressInput.parentNode.style.position = 'relative';
        addressInput.parentNode.appendChild(autocompleteDropdown);
    }
}

// ============================================================
// MANEJAR INPUT
// ============================================================

function manejarInput(event) {
    const texto = event.target.value.trim();
    
    if (texto.length < 2) {
        ocultarDropdown();
        limpiarResultadoEmpresa();
        return;
    }
    
    // Buscar sugerencias
    sugerenciasActuales = buscarComuna(texto);
    indiceSugerenciaSeleccionada = -1;
    
    if (sugerenciasActuales.length > 0) {
        mostrarSugerencias(sugerenciasActuales);
    } else {
        ocultarDropdown();
        mostrarNoEncontrado();
    }
}

// ============================================================
// MANEJAR FOCUS
// ============================================================

function manejarFocus(event) {
    const texto = event.target.value.trim();
    
    if (texto.length >= 2 && sugerenciasActuales.length > 0) {
        mostrarSugerencias(sugerenciasActuales);
    }
}

// ============================================================
// MANEJAR TECLAS
// ============================================================

function manejarTeclas(event) {
    if (!autocompleteDropdown || autocompleteDropdown.style.display === 'none') {
        return;
    }
    
    const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            indiceSugerenciaSeleccionada = Math.min(
                indiceSugerenciaSeleccionada + 1, 
                items.length - 1
            );
            actualizarSeleccion(items);
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            indiceSugerenciaSeleccionada = Math.max(indiceSugerenciaSeleccionada - 1, 0);
            actualizarSeleccion(items);
            break;
            
        case 'Enter':
            event.preventDefault();
            if (indiceSugerenciaSeleccionada >= 0 && indiceSugerenciaSeleccionada < items.length) {
                items[indiceSugerenciaSeleccionada].click();
            }
            break;
            
        case 'Escape':
            event.preventDefault();
            ocultarDropdown();
            break;
    }
}

// ============================================================
// ACTUALIZAR SELECCIÓN
// ============================================================

function actualizarSeleccion(items) {
    items.forEach((item, index) => {
        if (index === indiceSugerenciaSeleccionada) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

// ============================================================
// MOSTRAR SUGERENCIAS
// ============================================================

function mostrarSugerencias(sugerencias) {
    if (!autocompleteDropdown) return;
    
    autocompleteDropdown.innerHTML = '';
    
    sugerencias.forEach((sugerencia, index) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        
        item.innerHTML = `
            <div class="autocomplete-comuna">📍 ${sugerencia.comuna}</div>
            <div class="autocomplete-info">
                <span class="autocomplete-region">${sugerencia.region}</span>
                <span class="autocomplete-empresa">${sugerencia.empresa}</span>
            </div>
        `;
        
        item.addEventListener('click', () => {
            seleccionarSugerencia(sugerencia);
        });
        
        item.addEventListener('mouseenter', () => {
            indiceSugerenciaSeleccionada = index;
            actualizarSeleccion(autocompleteDropdown.querySelectorAll('.autocomplete-item'));
        });
        
        autocompleteDropdown.appendChild(item);
    });
    
    autocompleteDropdown.style.display = 'block';
}

// ============================================================
// SELECCIONAR SUGERENCIA
// ============================================================

function seleccionarSugerencia(sugerencia) {
    const addressInput = document.getElementById('addressInput');
    
    if (addressInput) {
        addressInput.value = sugerencia.comuna + ', ' + sugerencia.region;
    }
    
    ocultarDropdown();
    
    // Detectar empresa automáticamente
    const empresa = EMPRESAS_SANITARIAS_DB[sugerencia.empresaKey];
    
    if (empresa) {
        mostrarEmpresaDetectada(empresa);
        setDetectedCompany(empresa);
        showStatus(`✅ Empresa detectada: ${empresa.nombre}`);
    }
}

// ============================================================
// MOSTRAR EMPRESA DETECTADA
// ============================================================

function mostrarEmpresaDetectada(empresa) {
    const companyResult = document.getElementById('companyResult');
    
    if (!companyResult) return;
    
    companyResult.innerHTML = `
        <strong>${empresa.nombre}</strong><br>
        📞 ${empresa.telefono}<br>
        🌐 ${empresa.contacto}<br>
        <small>📋 Presentar proyecto de agua potable aquí</small>
    `;
    companyResult.classList.add('detected');
    companyResult.classList.remove('error');
}

// ============================================================
// MOSTRAR NO ENCONTRADO
// ============================================================

function mostrarNoEncontrado() {
    const companyResult = document.getElementById('companyResult');
    
    if (!companyResult) return;
    
    companyResult.innerHTML = `
        <div style="color: #fca5a5;">
            ⚠️ No se encontró la comuna.<br>
            <small style="margin-top: 8px; display: block;">
                <strong>Intente escribir:</strong><br>
                • Nombre de la comuna<br>
                • Ciudad principal<br>
                <strong>Ejemplos:</strong> Santiago, Valparaíso, Concepción
            </small>
        </div>
    `;
    companyResult.classList.remove('detected');
    companyResult.classList.add('error');
    setDetectedCompany(null);
}

// ============================================================
// LIMPIAR RESULTADO EMPRESA
// ============================================================

function limpiarResultadoEmpresa() {
    const companyResult = document.getElementById('companyResult');
    
    if (!companyResult) return;
    
    companyResult.innerHTML = `
        💡 <strong>Comience a escribir la comuna</strong><br>
        • Santiago, Providencia, Las Condes...<br>
        • Valparaíso, Viña del Mar, Concón...<br>
        • Concepción, Talcahuano, Los Ángeles...
    `;
    companyResult.classList.remove('detected', 'error');
    setDetectedCompany(null);
}

// ============================================================
// OCULTAR DROPDOWN
// ============================================================

function ocultarDropdown() {
    if (autocompleteDropdown) {
        autocompleteDropdown.style.display = 'none';
    }
    indiceSugerenciaSeleccionada = -1;
}

// ============================================================
// FUNCIONES EXPORTADAS (COMPATIBILIDAD CON COMPANY-DETECTOR.JS)
// ============================================================

export function detectSanitaryCompanyAuto() {
    // Esta función ahora es manejada por el event listener 'input'
    // Se mantiene para compatibilidad pero no hace nada
    console.log('💡 Detección automática activa con autocompletado');
}

export function detectSanitaryCompanyManual() {
    const addressInput = document.getElementById('addressInput');
    
    if (!addressInput) return;
    
    const texto = addressInput.value.trim();
    
    if (texto.length < 2) {
        showStatus('⚠️ Ingrese al menos 2 caracteres');
        return;
    }
    
    // Buscar coincidencia exacta o parcial
    const sugerencias = buscarComuna(texto);
    
    if (sugerencias.length > 0) {
        // Seleccionar la primera sugerencia automáticamente
        seleccionarSugerencia(sugerencias[0]);
    } else {
        mostrarNoEncontrado();
        showStatus('⚠️ No se encontró la comuna. Intente con otro nombre.');
    }
}

export function performCompanyDetection(showStatusFlag = true) {
    // Compatibilidad con versión anterior
    detectSanitaryCompanyManual();
}

// ============================================================
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ============================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAutocompletado);
} else {
    inicializarAutocompletado();
}

console.log('✅ Sistema de ubicación con autocompletado cargado');