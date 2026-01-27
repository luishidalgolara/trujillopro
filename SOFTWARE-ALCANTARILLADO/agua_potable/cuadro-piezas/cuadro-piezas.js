// cuadro-piezas/cuadro-piezas.js
const cuadroPiezas = {
    contadorFilas: 20,
    
    // Agregar nueva fila vacía
    agregarFila() {
        this.contadorFilas++;
        const tbody = document.getElementById('cuerpoTabla');
        const nuevaFila = document.createElement('tr');
        nuevaFila.setAttribute('data-id', this.contadorFilas);
        
        nuevaFila.innerHTML = `
            <td class="col-num">${this.contadorFilas}</td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><button class="btn-delete" onclick="cuadroPiezas.eliminarFila(${this.contadorFilas})">🗑️</button></td>
        `;
        
        tbody.appendChild(nuevaFila);
        this.mostrarNotificacion('✅ Fila agregada correctamente');
    },
    
    // Eliminar fila específica
    eliminarFila(id) {
        if (!confirm('¿Estás seguro de eliminar esta fila?')) return;
        
        const fila = document.querySelector(`tr[data-id="${id}"]`);
        if (fila) {
            fila.remove();
            this.renumerarFilas();
            this.mostrarNotificacion('🗑️ Fila eliminada correctamente');
        }
    },
    
    // Renumerar filas después de eliminar
    renumerarFilas() {
        const filas = document.querySelectorAll('#cuerpoTabla tr');
        filas.forEach((fila, index) => {
            const colNum = fila.querySelector('.col-num');
            if (colNum) {
                colNum.textContent = index + 1;
            }
        });
    },
    
    // Guardar datos en localStorage
    guardarDatos() {
        const filas = document.querySelectorAll('#cuerpoTabla tr');
        const datos = [];
        
        filas.forEach(fila => {
            const celdas = fila.querySelectorAll('td[contenteditable="true"]');
            const filaDatos = {
                id: fila.getAttribute('data-id'),
                designacion: celdas[0]?.innerHTML || '',
                segun_nch: celdas[1]?.innerHTML || '',
                material: celdas[2]?.innerHTML || '',
                diametros: celdas[3]?.innerHTML || '',
                observaciones: celdas[4]?.innerHTML || ''
            };
            datos.push(filaDatos);
        });
        
        localStorage.setItem('cuadroPiezas', JSON.stringify(datos));
        this.mostrarNotificacion('💾 Datos guardados correctamente');
    },
    
    // Cargar datos desde localStorage
    cargarDatos() {
        const datosGuardados = localStorage.getItem('cuadroPiezas');
        if (!datosGuardados) return;
        
        const datos = JSON.parse(datosGuardados);
        const tbody = document.getElementById('cuerpoTabla');
        
        // Limpiar tabla actual (opcional)
        // tbody.innerHTML = '';
        
        // Cargar datos guardados
        datos.forEach((fila, index) => {
            const tr = tbody.querySelector(`tr[data-id="${fila.id}"]`);
            if (tr) {
                const celdas = tr.querySelectorAll('td[contenteditable="true"]');
                if (celdas[0]) celdas[0].innerHTML = fila.designacion;
                if (celdas[1]) celdas[1].innerHTML = fila.segun_nch;
                if (celdas[2]) celdas[2].innerHTML = fila.material;
                if (celdas[3]) celdas[3].innerHTML = fila.diametros;
                if (celdas[4]) celdas[4].innerHTML = fila.observaciones;
            }
        });
    },
    
    // Exportar a PDF
    exportarPDF() {
        window.print();
    },
    
    // Mostrar notificación temporal
    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 2000);
    },
    
    // Obtener datos actuales (para enlazar con TRUJILLO)
    obtenerDatos() {
        const filas = document.querySelectorAll('#cuerpoTabla tr');
        const datos = [];
        
        filas.forEach(fila => {
            const celdas = fila.querySelectorAll('td[contenteditable="true"]');
            datos.push({
                numero: fila.querySelector('.col-num')?.textContent || '',
                designacion: celdas[0]?.textContent || '',
                segun_nch: celdas[1]?.textContent || '',
                material: celdas[2]?.textContent || '',
                diametros: celdas[3]?.textContent || '',
                observaciones: celdas[4]?.textContent || ''
            });
        });
        
        return datos;
    }
};

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cuadroPiezas.cargarDatos();
    
    // Auto-guardar cada 30 segundos
    setInterval(() => {
        cuadroPiezas.guardarDatos();
    }, 30000);
});

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Exponer globalmente para enlazar con TRUJILLO
window.cuadroPiezas = cuadroPiezas;