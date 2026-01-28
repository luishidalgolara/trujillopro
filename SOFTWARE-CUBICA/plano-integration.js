/* ========================================
   INTEGRACIÓN SISTEMA DE PLANOS
   ======================================== */

// Variable global para almacenar la imagen del plano
window.imagenPlano = null;

// Función para cargar plano (integración con el sistema principal)
function cargarPlano() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput) {
        console.error('Input de archivo no encontrado');
        return;
    }
    
    fileInput.click();
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('mainCanvas');
                const placeholder = document.querySelector('.canvas-placeholder');
                
                if (!canvas || !placeholder) return;
                
                // Guardar imagen globalmente
                window.imagenPlano = img;
                
                // Configurar canvas
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Mostrar canvas y ocultar placeholder
                canvas.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Dibujar imagen en canvas
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Actualizar estado
                const status = document.getElementById('status');
                if (status) {
                    status.textContent = '✓ Plano cargado: ' + file.name;
                }
                
                console.log('Plano cargado correctamente');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
}

// Asegurar que la función está disponible globalmente
window.cargarPlano = cargarPlano;