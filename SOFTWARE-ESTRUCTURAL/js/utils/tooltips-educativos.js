/**
 * SISTEMA DE TOOLTIPS EDUCATIVOS
 * Sistema interactivo de ayuda con información técnica
 */

class TooltipsEducativos {
    constructor() {
        this.tooltipActivo = null;
        this.inicializar();
    }
    
    inicializar() {
        // Crear contenedor de tooltip si no existe
        if (!document.getElementById('tooltip-container')) {
            const container = document.createElement('div');
            container.id = 'tooltip-container';
            container.className = 'tooltip-container';
            document.body.appendChild(container);
        }
        
        // Escuchar clicks en el documento
        document.addEventListener('click', (e) => {
            // Si click en icono de tooltip
            if (e.target.classList.contains('tooltip-icon')) {
                e.stopPropagation();
                const tooltipId = e.target.getAttribute('data-tooltip');
                this.mostrarTooltip(tooltipId, e.target);
            }
            // Si click fuera del tooltip, cerrar
            else if (!e.target.closest('.tooltip-popup')) {
                this.cerrarTooltip();
            }
        });
    }
    
    mostrarTooltip(tooltipId, elemento) {
        // Cerrar tooltip anterior si existe
        this.cerrarTooltip();
        
        // Obtener contenido del tooltip
        const contenido = this.obtenerContenido(tooltipId);
        if (!contenido) return;
        
        // Crear popup
        const popup = document.createElement('div');
        popup.className = 'tooltip-popup';
        popup.innerHTML = `
            <div class="tooltip-header">
                <h4>${contenido.titulo}</h4>
                <button class="tooltip-close" onclick="tooltipSystem.cerrarTooltip()">✖</button>
            </div>
            <div class="tooltip-body">
                ${contenido.descripcion}
                ${contenido.formula ? `
                    <div class="tooltip-formula">
                        <strong>📐 Fórmula:</strong>
                        <div class="formula-box">${contenido.formula}</div>
                    </div>
                ` : ''}
                ${contenido.donde ? `
                    <div class="tooltip-donde">
                        <strong>Donde:</strong>
                        <ul>${contenido.donde.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                ${contenido.norma ? `
                    <div class="tooltip-norma">
                        <strong>📋 Normativa:</strong> ${contenido.norma}
                    </div>
                ` : ''}
                ${contenido.nota ? `
                    <div class="tooltip-nota">
                        <strong>💡 Nota:</strong> ${contenido.nota}
                    </div>
                ` : ''}
            </div>
        `;
        
        // Posicionar cerca del icono
        const rect = elemento.getBoundingClientRect();
        popup.style.top = (rect.bottom + 10) + 'px';
        popup.style.left = Math.min(rect.left, window.innerWidth - 350) + 'px';
        
        // Agregar al contenedor
        const container = document.getElementById('tooltip-container');
        container.appendChild(popup);
        
        this.tooltipActivo = popup;
        
        // Animación de entrada
        setTimeout(() => popup.classList.add('active'), 10);
    }
    
    cerrarTooltip() {
        if (this.tooltipActivo) {
            this.tooltipActivo.classList.remove('active');
            setTimeout(() => {
                if (this.tooltipActivo && this.tooltipActivo.parentNode) {
                    this.tooltipActivo.parentNode.removeChild(this.tooltipActivo);
                }
                this.tooltipActivo = null;
            }, 300);
        }
    }
    
    obtenerContenido(tooltipId) {
        // Obtener del registro global de tooltips
        if (window.TOOLTIPS_DATA && window.TOOLTIPS_DATA[tooltipId]) {
            return window.TOOLTIPS_DATA[tooltipId];
        }
        return null;
    }
    
    // Método para agregar icono de tooltip en HTML
    static icono(tooltipId) {
        return `<span class="tooltip-icon" data-tooltip="${tooltipId}">❓</span>`;
    }
}

// Inicializar sistema al cargar
let tooltipSystem;
window.addEventListener('DOMContentLoaded', () => {
    tooltipSystem = new TooltipsEducativos();
});

// Exportar para uso global
window.TooltipsEducativos = TooltipsEducativos;