// ============================================
// NAVEGACIÓN GLOBAL ENTRE MÓDULOS
// (Este archivo NO interfiere con tu código existente)
// ============================================

// Función para ir al inicio (usada por los botones "Volver")
function goToHome() {
    window.location.href = '../../index.html';
}

// Animaciones suaves al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Fade in de elementos
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Utilidades comunes
const Utils = {
    // Formatear números con separador de miles
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    // Formatear moneda chilena
    formatCurrency: (amount) => {
        return `$${Utils.formatNumber(amount)} CLP`;
    },

    // Formatear porcentaje
    formatPercent: (value) => {
        return `${value.toFixed(1)}%`;
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}

console.log('✅ Sistema de navegación de módulos cargado correctamente');