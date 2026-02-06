/**
 * GESTOR DEL SISTEMA EDUCATIVO
 * Coordina marcadores, interacciones y panel de información
 */

class EducationalManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.enabled = true; // Los marcadores están activos por defecto
        
        // Inicializar componentes
        this.markers = new EducationalMarkers(scene);
        this.infoPanel = new EducationalInfoPanel();
        this.interaction = new EducationalInteraction(
            camera, 
            renderer, 
            this.markers, 
            this.infoPanel
        );
        
        // Registro de componentes del edificio
        this.buildingComponents = new Map();
        
        console.log('📚 Sistema educativo inicializado');
    }
    
    /**
     * Registra un componente estructural del edificio
     */
    registerComponent(componentId, componentType, position, meshObject = null) {
        // Validar que existe contenido educativo para este tipo
        if (!EDUCATIONAL_CONTENT[componentType]) {
            console.warn(`⚠️ No hay contenido educativo para: ${componentType}`);
            return;
        }
        
        // Guardar información del componente
        this.buildingComponents.set(componentId, {
            type: componentType,
            position: position,
            mesh: meshObject
        });
        
        // Crear marcador visual
        const marker = this.markers.createMarker(
            componentType, 
            position, 
            componentId
        );
        
        if (marker) {
            console.log(`✅ Marcador creado para ${componentType} (${componentId})`);
        }
    }
    
    /**
     * Registra múltiples componentes de un mismo tipo
     */
    registerComponents(componentType, positions) {
        positions.forEach((pos, index) => {
            const componentId = `${componentType}_${index}`;
            this.registerComponent(componentId, componentType, pos);
        });
    }
    
    /**
     * Registra componentes desde un mesh group
     */
    registerFromMeshGroup(meshGroup, componentType) {
        if (!meshGroup) return;
        
        meshGroup.traverse((child) => {
            if (child.isMesh) {
                const position = new THREE.Vector3();
                child.getWorldPosition(position);
                
                const componentId = `${componentType}_${child.uuid}`;
                this.registerComponent(componentId, componentType, position, child);
            }
        });
    }
    
    /**
     * Auto-detecta y registra componentes del edificio actual
     */
    autoRegisterBuilding(buildingLevel) {
        console.log(`🔍 Auto-registrando componentes para edificio de ${buildingLevel} nivel(es)`);
        
        // Esta función será llamada desde main.js después de crear el edificio
        // Por ahora solo imprime información
        
        // Los componentes serán registrados manualmente desde donde se crean
        // en models.js o los módulos de reinforcement y plumbing
    }
    
    /**
     * Toggle de visibilidad de marcadores
     */
    toggleMarkers() {
        const isVisible = this.markers.toggle();
        this.enabled = isVisible;
        
        console.log(`${isVisible ? '👁️' : '🚫'} Marcadores educativos ${isVisible ? 'visibles' : 'ocultos'}`);
        
        return isVisible;
    }
    
    /**
     * Muestra todos los marcadores
     */
    showMarkers() {
        this.markers.showAll();
        this.enabled = true;
    }
    
    /**
     * Oculta todos los marcadores
     */
    hideMarkers() {
        this.markers.hideAll();
        this.enabled = false;
        this.infoPanel.hide();
    }
    
    /**
     * Actualiza el sistema (debe llamarse en el loop de animación)
     */
    update(delta) {
        if (this.enabled) {
            this.markers.update(delta);
        }
    }
    
    /**
     * Notifica que el usuario está arrastrando la cámara
     */
    setDragging(isDragging) {
        this.interaction.setDragging(isDragging);
    }
    
    /**
     * Limpia el panel de información
     */
    closeInfoPanel() {
        this.infoPanel.hide();
    }
    
    /**
     * Obtiene estadísticas del sistema
     */
    getStats() {
        return {
            totalComponents: this.buildingComponents.size,
            totalMarkers: this.markers.markers.size,
            enabled: this.enabled,
            infoPanelVisible: this.infoPanel.isVisible
        };
    }
    
    /**
     * Resetea el sistema educativo
     */
    reset() {
        this.markers.clear();
        this.buildingComponents.clear();
        this.infoPanel.hide();
        console.log('🔄 Sistema educativo reseteado');
    }
    
    /**
     * Limpia completamente el sistema
     */
    dispose() {
        this.reset();
        this.interaction.dispose();
        console.log('🗑️ Sistema educativo eliminado');
    }
    
    /**
     * Exporta información de componentes registrados (para debugging)
     */
    exportComponentsInfo() {
        const info = [];
        this.buildingComponents.forEach((component, id) => {
            info.push({
                id: id,
                type: component.type,
                position: {
                    x: component.position.x,
                    y: component.position.y,
                    z: component.position.z
                }
            });
        });
        return info;
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationalManager;
}
