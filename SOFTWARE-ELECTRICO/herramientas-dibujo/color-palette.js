// ============================================
// PALETA DE COLORES
// ============================================

class ColorPalette {
    constructor() {
        this.currentColor = '#000000';
        this.init();
    }

    init() {
        // Obtener elementos
        this.colorItems = document.querySelectorAll('.color-item');
        this.customColorInput = document.getElementById('customColor');

        // Event listeners para colores predefinidos
        this.colorItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectColor(e.target);
            });
        });

        // Event listener para color personalizado
        if (this.customColorInput) {
            this.customColorInput.addEventListener('input', (e) => {
                this.setCustomColor(e.target.value);
            });
        }
    }

    selectColor(element) {
        // Remover clase active de todos los items
        this.colorItems.forEach(item => {
            item.classList.remove('active');
        });

        // Agregar clase active al seleccionado
        element.classList.add('active');

        // Obtener el color
        this.currentColor = element.dataset.color;

        // Actualizar el input de color personalizado
        if (this.customColorInput) {
            this.customColorInput.value = this.currentColor;
        }

        // Disparar evento personalizado
        this.dispatchColorChange();
    }

    setCustomColor(color) {
        this.currentColor = color;

        // Remover active de todos los predefinidos
        this.colorItems.forEach(item => {
            item.classList.remove('active');
        });

        // Disparar evento personalizado
        this.dispatchColorChange();
    }

    getCurrentColor() {
        return this.currentColor;
    }

    dispatchColorChange() {
        const event = new CustomEvent('colorChanged', {
            detail: { color: this.currentColor }
        });
        document.dispatchEvent(event);
    }
}

// Exportar instancia global
window.colorPalette = new ColorPalette();
