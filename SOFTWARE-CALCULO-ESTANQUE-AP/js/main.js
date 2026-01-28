// Archivo principal - Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando aplicación de diseño de estanques...');
    
    // Inicializar renderizado 3D
    try {
        Render3D.init('canvas3d');
        console.log('Renderizado 3D inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar 3D:', error);
        alert('Error al cargar la visualización 3D. Por favor, recargue la página.');
    }
    
    // Inicializar formulario
    Formulario.init();
    console.log('Formulario inicializado correctamente');
    
    // Configurar botones principales
    configurarBotones();
    
    // Configurar tabs
    configurarTabs();
    
    // Mostrar mensaje de bienvenida
    mostrarInstrucciones();
    
    console.log('Aplicación lista para usar');
});

// Configurar eventos de botones
function configurarBotones() {
    // Botón calcular
    const btnCalcular = document.getElementById('calcularBtn');
    if (btnCalcular) {
        btnCalcular.addEventListener('click', function() {
            console.log('Calculando estanque...');
            const exito = Formulario.validarYCalcular();
            if (exito) {
                console.log('Cálculo completado exitosamente');
                mostrarNotificacion('¡Cálculo completado!', 'success');
            }
        });
    }
    
    // Botón exportar
    const btnExportar = document.getElementById('exportarBtn');
    if (btnExportar) {
        btnExportar.addEventListener('click', function() {
            console.log('Exportando reporte...');
            Formulario.exportarReporte();
        });
    }
    
    // Botón resetear vista 3D
    const btnReset = document.getElementById('resetView');
    if (btnReset) {
        btnReset.addEventListener('click', function() {
            Render3D.resetView();
            mostrarNotificacion('Vista reseteada', 'info');
        });
    }
    
    // Botón toggle grid
    const btnGrid = document.getElementById('toggleGrid');
    if (btnGrid) {
        btnGrid.addEventListener('click', function() {
            Render3D.toggleGrid();
            const texto = this.textContent.includes('⊞') ? '⊟ Grid' : '⊞ Grid';
            this.textContent = texto;
        });
    }

    // Botón toggle sala de bombas
    const btnToggleBombas = document.getElementById('toggleBombas');
    if (btnToggleBombas) {
        let bombasVisibles = false;
        
        btnToggleBombas.addEventListener('click', function() {
            if (!bombasVisibles) {
                // Obtener los últimos resultados calculados
                const datos = Formulario.obtenerDatos();
                const resultados = Calculos.calcularEstanque(datos);
                
                if (resultados.numeroBombas > 0) {
                    console.log('🔧 Creando sala de bombas...');
                    
                    // ✅ SIEMPRE eliminar sala anterior antes de crear una nueva
                    Render3D.eliminarSalaBombas();
                    
                    // ✅ CREAR con dimensiones actuales del formulario
                    Render3D.integrarSalaBombas({
                        numeroBombas: resultados.numeroBombas,
                        potencia: resultados.potenciaBomba,
                        caudal: resultados.caudalEstimado,
                        presion: resultados.presionRequerida,
                        posicionEstanque: {
                            largo: resultados.largo,
                            ancho: resultados.ancho,
                            altura: resultados.altura
                        },
                        // ✅ DIMENSIONES PERSONALIZADAS de la sala desde el formulario
                        dimensionesSala: {
                            ancho: datos.salaAncho,
                            profundidad: datos.salaProfundidad,
                            altura: datos.salaAltura
                        }
                    });
                    
                    bombasVisibles = true;
                    this.textContent = '🔧 Ocultar Sala de Bombas';
                } else {
                    alert('Primero debe calcular el estanque');
                }
            } else {
                // Ocultar sala
                Render3D.eliminarSalaBombas();
                bombasVisibles = false;
                this.textContent = '🔧 Mostrar Sala de Bombas';
            }
        });
    }
}

// Configurar sistema de tabs
function configurarTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Desactivar todos los tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar tab seleccionado
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Generar vistas según el tab seleccionado
            const dimensionesEstanque = Render3D.getDimensiones();
            const dimensionesSala = obtenerDimensionesSala();
            
            switch(targetTab) {
                case 'corteAA':
                    CortesVistas.generarCorteAA(
                        document.getElementById('canvasCorteAA'),
                        dimensionesEstanque
                    );
                    break;
                    
                case 'corteBB':
                    CortesVistas.generarCorteBB(
                        document.getElementById('canvasCorteBB'),
                        dimensionesEstanque
                    );
                    break;
                    
                case 'corteCC':
                    CortesVistas.generarCorteCC(
                        document.getElementById('canvasCorteCC'),
                        dimensionesSala
                    );
                    break;
                    
                case 'corteDD':
                    CortesVistas.generarCorteDD(
                        document.getElementById('canvasCorteDD'),
                        dimensionesSala
                    );
                    break;
                    
                case 'planta':
                    CortesVistas.generarVistaPlanta(
                        document.getElementById('canvasPlanta'),
                        dimensionesEstanque,
                        dimensionesSala
                    );
                    break;
            }
        });
    });
}

// Función auxiliar para obtener dimensiones de la sala
function obtenerDimensionesSala() {
    // Si la sala de bombas está activa, obtener sus dimensiones
    if (typeof SalaBombas !== 'undefined' && SalaBombas.activo && SalaBombas.datosActuales) {
        const datos = Formulario.obtenerDatos();
        return {
            ancho: datos.salaAncho,
            profundidad: datos.salaProfundidad,
            altura: datos.salaAltura
        };
    }
    
    // Si no está activa, obtener valores del formulario
    const salaAncho = document.getElementById('salaAncho');
    const salaProfundidad = document.getElementById('salaProfundidad');
    const salaAltura = document.getElementById('salaAltura');
    
    if (salaAncho && salaProfundidad && salaAltura) {
        return {
            ancho: parseFloat(salaAncho.value),
            profundidad: parseFloat(salaProfundidad.value),
            altura: parseFloat(salaAltura.value)
        };
    }
    
    return null;
}

// Mostrar instrucciones iniciales
function mostrarInstrucciones() {
    const recomendaciones = document.getElementById('recomendaciones');
    if (recomendaciones) {
        recomendaciones.innerHTML = `
            <div class="info-box">
                <h4>Bienvenido al Diseñador de Estanques de Agua Potable</h4>
                <p>Este software calcula estanques según las Normas Chilenas NCh691.</p>
                <br>
                <p><strong>Instrucciones:</strong></p>
                <ol style="margin-left: 20px; margin-top: 10px;">
                    <li>Complete los datos del edificio (pisos, departamentos, habitantes)</li>
                    <li>Ajuste las dimensiones del estanque o active el ajuste automático</li>
                    <li>Ajuste las dimensiones de la sala de bombas si lo desea</li>
                    <li>Presione "Calcular Estanque" para obtener los resultados</li>
                    <li>Revise las recomendaciones técnicas generadas</li>
                    <li>Exporte el reporte si lo desea</li>
                </ol>
            </div>
        `;
    }
}

// Mostrar notificación temporal
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#4CAF50' : tipo === 'warning' ? '#FF9800' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notif);
        }, 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .info-box {
        background: #e3f2fd;
        border-left: 4px solid #2196F3;
        padding: 15px;
        margin: 15px 0;
        border-radius: 4px;
    }
    
    .info-box h4 {
        color: #2196F3;
        margin-bottom: 8px;
        font-size: 1em;
    }
    
    .info-box p {
        color: #2c3e50;
        font-size: 0.9em;
        line-height: 1.5;
        margin: 5px 0;
    }
    
    .info-box ol {
        margin: 0;
        padding-left: 20px;
    }
    
    .info-box ol li {
        margin: 5px 0;
        color: #2c3e50;
    }
`;
document.head.appendChild(style);

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.error);
});

// Manejar cierre de página
window.addEventListener('beforeunload', function() {
    if (Render3D) {
        Render3D.destroy();
    }
});

console.log('Script principal cargado correctamente');