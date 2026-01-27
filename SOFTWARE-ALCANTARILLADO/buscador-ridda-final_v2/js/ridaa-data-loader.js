// ============================================================
// RIDAA - DATA LOADER (Cargador de FAQs)
// Este archivo carga todas las FAQs al sistema del buscador
// ============================================================

(function() {
    'use strict';
    
    console.log('🔄 Iniciando carga de FAQs RIDAA...');
    
    // Función para inicializar datos
    function inicializarDatosRIDAA() {
        // Asegurar que existe RidaaState
        if (typeof window.RidaaState === 'undefined') {
            window.RidaaState = {
                isCollapsed: false,
                currentFilter: 'all',
                searchResults: [],
                allData: [],
                isLoading: false,
                searchTimeout: null
            };
        }
        
        // Inicializar allData si no existe
        if (!window.RidaaState.allData) {
            window.RidaaState.allData = [];
        }
        
        // Cargar FAQs Parte 1
        if (typeof window.RidaaFAQsParte1 !== 'undefined') {
            window.RidaaState.allData = window.RidaaState.allData.concat(window.RidaaFAQsParte1);
            console.log('✅ FAQs Parte 1 cargadas:', window.RidaaFAQsParte1.length, 'preguntas');
        } else {
            console.warn('⚠️ RidaaFAQsParte1 no encontrado');
        }
        
        // Cargar FAQs Parte 2
        if (typeof window.RidaaFAQsParte2 !== 'undefined') {
            window.RidaaState.allData = window.RidaaState.allData.concat(window.RidaaFAQsParte2);
            console.log('✅ FAQs Parte 2 cargadas:', window.RidaaFAQsParte2.length, 'preguntas');
        } else {
            console.warn('⚠️ RidaaFAQsParte2 no encontrado');
        }
        
        // Agregar tipo "faq" al filtro si no existe
        const filtroFAQ = document.querySelector('[data-filter="faq"]');
        if (!filtroFAQ) {
            const filtrosContainer = document.querySelector('.ridaa-filters');
            if (filtrosContainer) {
                const btnFAQ = document.createElement('button');
                btnFAQ.className = 'ridaa-filter-btn';
                btnFAQ.setAttribute('data-filter', 'faq');
                btnFAQ.setAttribute('onclick', "filtrarPorTipo('faq')");
                btnFAQ.textContent = 'Preguntas Frecuentes';
                filtrosContainer.appendChild(btnFAQ);
                console.log('✅ Botón de FAQs agregado al filtro');
            }
        }
        
        console.log('✅ Total de datos cargados:', window.RidaaState.allData.length);
        console.log('📊 Sistema RIDAA listo con FAQs');
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarDatosRIDAA);
    } else {
        inicializarDatosRIDAA();
    }
    
})();