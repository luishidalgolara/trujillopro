/**
 * INTERACCIONES EDUCATIVAS
 * Maneja clicks y hover sobre marcadores
 */

class EducationalInteraction {
    constructor(camera, renderer, markers, infoPanel) {
        this.camera = camera;
        this.renderer = renderer;
        this.markers = markers;
        this.infoPanel = infoPanel;
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.currentHoveredMarker = null;
        
        // Configurar eventos
        this.setupEvents();
    }
    
    /**
     * Configura los event listeners
     */
    setupEvents() {
        const canvas = this.renderer.domElement;
        
        // Click
        canvas.addEventListener('click', (event) => this.onClick(event));
        
        // Mouse move para hover
        canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        
        // Cambiar cursor
        canvas.style.cursor = 'default';
    }
    
    /**
     * Maneja el evento de click
     */
    onClick(event) {
        // Evitar clicks durante arrastre de cámara
        if (this.isDragging) return;
        
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const marker = this.markers.getMarkerAtPosition(this.raycaster);
        
        if (marker && marker.userData.isEducationalMarker) {
            // Mostrar información del componente
            const contentData = marker.userData.contentData;
            this.infoPanel.show(contentData);
            
            // Efecto visual de click
            this.playClickEffect(marker);
            
            // Audio feedback (opcional)
            this.playClickSound();
        }
    }
    
    /**
     * Maneja el movimiento del mouse
     */
    onMouseMove(event) {
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const marker = this.markers.getMarkerAtPosition(this.raycaster);
        const canvas = this.renderer.domElement;
        
        if (marker && marker.userData.isEducationalMarker) {
            // Cambiar cursor
            canvas.style.cursor = 'pointer';
            
            // Aplicar efecto hover
            if (this.currentHoveredMarker !== marker) {
                // Remover hover del anterior
                if (this.currentHoveredMarker) {
                    this.markers.onMarkerHover(this.currentHoveredMarker, false);
                }
                
                // Aplicar hover al nuevo
                this.markers.onMarkerHover(marker, true);
                this.currentHoveredMarker = marker;
                
                // Mostrar tooltip
                this.showTooltip(marker, event);
            }
        } else {
            // Restaurar cursor
            canvas.style.cursor = 'default';
            
            // Remover hover
            if (this.currentHoveredMarker) {
                this.markers.onMarkerHover(this.currentHoveredMarker, false);
                this.currentHoveredMarker = null;
                this.hideTooltip();
            }
        }
    }
    
    /**
     * Actualiza la posición del mouse en coordenadas normalizadas
     */
    updateMousePosition(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
    
    /**
     * Efecto visual al hacer click
     */
    playClickEffect(marker) {
        const originalScale = marker.scale.clone();
        
        // Animación de "pulso"
        const duration = 300;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 0.5) {
                // Expandir
                const scale = 1 + (progress * 2) * 0.3;
                marker.scale.set(scale, scale, scale);
            } else {
                // Contraer
                const scale = 1.3 - ((progress - 0.5) * 2) * 0.3;
                marker.scale.set(scale, scale, scale);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                marker.scale.copy(originalScale);
            }
        };
        
        animate();
    }
    
    /**
     * Reproduce sonido de click (opcional)
     */
    playClickSound() {
        // Crear un sonido simple usando Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silenciosamente fallar si no hay soporte de audio
        }
    }
    
    /**
     * Muestra un tooltip con el nombre del componente
     */
    showTooltip(marker, event) {
        let tooltip = document.getElementById('educational-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'educational-tooltip';
            tooltip.className = 'educational-tooltip';
            document.body.appendChild(tooltip);
        }
        
        const contentData = marker.userData.contentData;
        tooltip.innerHTML = `${contentData.icon} ${contentData.name}`;
        tooltip.style.display = 'block';
        tooltip.style.left = event.clientX + 15 + 'px';
        tooltip.style.top = event.clientY + 15 + 'px';
    }
    
    /**
     * Oculta el tooltip
     */
    hideTooltip() {
        const tooltip = document.getElementById('educational-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
    
    /**
     * Marca si el usuario está arrastrando (para evitar clicks accidentales)
     */
    setDragging(isDragging) {
        this.isDragging = isDragging;
        if (isDragging) {
            this.hideTooltip();
        }
    }
    
    /**
     * Limpia los event listeners
     */
    dispose() {
        const canvas = this.renderer.domElement;
        canvas.removeEventListener('click', this.onClick);
        canvas.removeEventListener('mousemove', this.onMouseMove);
        this.hideTooltip();
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationalInteraction;
}
