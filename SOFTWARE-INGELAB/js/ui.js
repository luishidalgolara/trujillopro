// Lógica de UI y efectos visuales

// Ocultar loading
function hideLoading() {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 300);
}

// Mostrar loading
function showLoading() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    setTimeout(() => {
        loading.classList.remove('hidden');
    }, 10);
}

// Animaciones de entrada
function animateEntry() {
    // Animar sidebar
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.opacity = '0';
    sidebar.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        sidebar.style.transition = 'all 0.6s ease-out';
        sidebar.style.opacity = '1';
        sidebar.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar viewer
    const viewer = document.querySelector('.viewer-container');
    viewer.style.opacity = '0';
    viewer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        viewer.style.transition = 'all 0.6s ease-out';
        viewer.style.opacity = '1';
        viewer.style.transform = 'translateY(0)';
    }, 200);
}

// Crear notificación toast
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-size: 0.875rem;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Añadir estilos de animación para notificaciones
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Actualizar estadísticas del edificio
function updateBuildingStats(levels) {
    const buildingData = STRUCTURAL_DATA.buildingLevels[levels];
    
    console.log('📊 Estadísticas del edificio:');
    console.log(`  Nombre: ${buildingData.name}`);
    console.log(`  Niveles: ${levels}`);
    console.log(`  Altura aproximada: ${buildingData.height} metros`);
    console.log(`  Componentes: ${buildingData.components.length}`);
    console.log(`  Descripción: ${buildingData.info}`);
}

// Crear tooltip dinámico
function createTooltip(text, x, y) {
    // Remover tooltip existente
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip visible';
    tooltip.textContent = text;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    
    document.body.appendChild(tooltip);
    
    // Auto-remover después de 2 segundos
    setTimeout(() => {
        tooltip.classList.remove('visible');
        setTimeout(() => tooltip.remove(), 200);
    }, 2000);
}

// Efectos de hover en botones
function initButtonEffects() {
    document.querySelectorAll('.building-btn, .option-btn, .component-item').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Indicador de carga de progreso
function showProgressBar(message) {
    const progressContainer = document.createElement('div');
    progressContainer.id = 'progress-container';
    progressContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        text-align: center;
        min-width: 300px;
    `;
    
    progressContainer.innerHTML = `
        <p style="margin-bottom: 1rem; font-weight: 600; color: var(--primary-color);">${message}</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%;"></div>
        </div>
    `;
    
    document.body.appendChild(progressContainer);
    
    // Animar progreso
    const progressFill = progressContainer.querySelector('.progress-fill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressContainer.style.opacity = '0';
                setTimeout(() => progressContainer.remove(), 300);
            }, 500);
        }
    }, 100);
}

// Información del sistema
function displaySystemInfo() {
    console.log('🖥️ Sistema Educativo 3D - Información');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 Versión: 1.0.0');
    console.log('🎨 Renderer: Three.js r128');
    console.log('💻 Dispositivo:', navigator.platform);
    console.log('🌐 Navegador:', navigator.userAgent.split(' ').pop());
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('💡 Consejos:');
    console.log('  • Usa el mouse para rotar la cámara');
    console.log('  • Scroll para hacer zoom');
    console.log('  • Click en componentes para ver detalles');
    console.log('  • Usa los atajos de teclado (escribe "help")');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Comando de ayuda en consola
window.help = function() {
    showHelpInfo();
};

// Easter egg
window.credits = function() {
    console.log('');
    console.log('🏗️ Sistema Educativo de Construcción 3D');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Desarrollado con ❤️ usando:');
    console.log('  • Three.js - Biblioteca 3D');
    console.log('  • HTML5 + CSS3 + JavaScript');
    console.log('  • Diseño elegante y sofisticado');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
};

// Inicializar efectos de UI
function initUIEffects() {
    addNotificationStyles();
    initButtonEffects();
    displaySystemInfo();
    
    // Mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido al Sistema Educativo 3D!', 'success');
    }, 1000);
}

// Exportar stats de rendimiento
function getPerformanceStats() {
    const stats = {
        triangles: 0,
        geometries: 0,
        textures: 0,
        objects: 0
    };
    
    buildingGroup.traverse((object) => {
        if (object.isMesh) {
            stats.objects++;
            if (object.geometry) {
                stats.geometries++;
                if (object.geometry.index) {
                    stats.triangles += object.geometry.index.count / 3;
                } else {
                    stats.triangles += object.geometry.attributes.position.count / 3;
                }
            }
            if (object.material && object.material.map) {
                stats.textures++;
            }
        }
    });
    
    return stats;
}

// Comando para ver estadísticas
window.stats = function() {
    const stats = getPerformanceStats();
    console.log('📈 Estadísticas de Rendimiento:');
    console.log(`  Objetos: ${stats.objects}`);
    console.log(`  Geometrías: ${stats.geometries}`);
    console.log(`  Triángulos: ${Math.floor(stats.triangles)}`);
    console.log(`  Texturas: ${stats.textures}`);
};

console.log('✅ Módulo de UI cargado');