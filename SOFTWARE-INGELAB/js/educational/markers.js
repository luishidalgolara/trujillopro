/**
 * MARCADORES EDUCATIVOS 3D
 * Genera y gestiona los marcadores visuales sobre componentes
 */

class EducationalMarkers {
    constructor(scene) {
        this.scene = scene;
        this.markers = new Map(); // Almacena marcadores por ID de componente
        this.hoveredMarker = null;
        
        // Material para los marcadores
        this.markerMaterial = new THREE.MeshPhongMaterial({
            color: MARKER_CONFIG.color,
            emissive: MARKER_CONFIG.emissive,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: MARKER_CONFIG.opacity,
            side: THREE.DoubleSide
        });
        
        // Material para hover
        this.hoverMaterial = new THREE.MeshPhongMaterial({
            color: MARKER_CONFIG.color,
            emissive: MARKER_CONFIG.emissive,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: MARKER_CONFIG.hoverOpacity,
            side: THREE.DoubleSide
        });
    }
    
    /**
     * Crea un marcador para un componente específico
     */
    createMarker(componentType, position, componentId) {
        const contentData = EDUCATIONAL_CONTENT[componentType];
        if (!contentData) return null;
        
        // Crear grupo para el marcador
        const markerGroup = new THREE.Group();
        markerGroup.userData = {
            isEducationalMarker: true,
            componentType: componentType,
            componentId: componentId,
            contentData: contentData
        };
        
        // Crear geometría del marcador (esfera con icono)
        const geometry = new THREE.SphereGeometry(MARKER_CONFIG.size * 0.3, 16, 16);
        const sphere = new THREE.Mesh(geometry, this.markerMaterial.clone());
        markerGroup.add(sphere);
        
        // Crear anillo exterior que gira
        const ringGeometry = new THREE.TorusGeometry(
            MARKER_CONFIG.size * 0.4, 
            MARKER_CONFIG.size * 0.05, 
            8, 
            32
        );
        const ring = new THREE.Mesh(ringGeometry, this.markerMaterial.clone());
        ring.rotation.x = Math.PI / 2;
        markerGroup.add(ring);
        
        // Añadir animación de rotación al anillo
        ring.userData.animate = (delta) => {
            ring.rotation.z += delta * 0.5;
        };
        
        // Crear sprite con el emoji del icono
        const canvas = this.createIconCanvas(contentData.icon);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            opacity: 1.0
        });
        
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(MARKER_CONFIG.size * 0.8, MARKER_CONFIG.size * 0.8, 1);
        sprite.position.y = MARKER_CONFIG.size * 0.6;
        markerGroup.add(sprite);
        
        // Posicionar el marcador
        const offset = MARKER_POSITIONS[componentType] || { x: 0, y: 0.5, z: 0 };
        markerGroup.position.set(
            position.x + offset.x,
            position.y + offset.y,
            position.z + offset.z
        );
        
        // Añadir animación de flotación
        markerGroup.userData.baseY = markerGroup.position.y;
        markerGroup.userData.floatTime = Math.random() * Math.PI * 2;
        markerGroup.userData.animate = (delta) => {
            markerGroup.userData.floatTime += delta;
            markerGroup.position.y = markerGroup.userData.baseY + 
                                     Math.sin(markerGroup.userData.floatTime) * 0.15;
            if (ring.userData.animate) {
                ring.userData.animate(delta);
            }
        };
        
        // Guardar referencia
        this.markers.set(componentId, markerGroup);
        this.scene.add(markerGroup);
        
        return markerGroup;
    }
    
    /**
     * Crea un canvas con el emoji para el sprite
     */
    createIconCanvas(emoji) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        // Fondo circular semi-transparente
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();
        
        // Borde dorado
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Emoji
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 64, 64);
        
        return canvas;
    }
    
    /**
     * Muestra todos los marcadores
     */
    showAll() {
        this.markers.forEach(marker => {
            marker.visible = true;
        });
    }
    
    /**
     * Oculta todos los marcadores
     */
    hideAll() {
        this.markers.forEach(marker => {
            marker.visible = false;
        });
    }
    
    /**
     * Toggle visibilidad de marcadores
     */
    toggle() {
        const firstMarker = this.markers.values().next().value;
        const shouldShow = !firstMarker || !firstMarker.visible;
        
        if (shouldShow) {
            this.showAll();
        } else {
            this.hideAll();
        }
        
        return shouldShow;
    }
    
    /**
     * Maneja el hover sobre un marcador
     */
    onMarkerHover(marker, isHovering) {
        if (isHovering) {
            this.hoveredMarker = marker;
            marker.scale.set(1.2, 1.2, 1.2);
            marker.children.forEach(child => {
                if (child.material) {
                    child.material.emissiveIntensity = 0.8;
                }
            });
        } else {
            if (this.hoveredMarker === marker) {
                this.hoveredMarker = null;
            }
            marker.scale.set(1, 1, 1);
            marker.children.forEach(child => {
                if (child.material) {
                    child.material.emissiveIntensity = 0.3;
                }
            });
        }
    }
    
    /**
     * Actualiza animaciones de todos los marcadores
     */
    update(delta) {
        this.markers.forEach(marker => {
            if (marker.userData.animate) {
                marker.userData.animate(delta);
            }
        });
    }
    
    /**
     * Limpia todos los marcadores
     */
    clear() {
        this.markers.forEach(marker => {
            this.scene.remove(marker);
            // Limpiar geometrías y materiales
            marker.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        });
        this.markers.clear();
    }
    
    /**
     * Obtiene el marcador en una posición del mouse
     */
    getMarkerAtPosition(raycaster) {
        const markerArray = Array.from(this.markers.values());
        const intersects = raycaster.intersectObjects(markerArray, true);
        
        if (intersects.length > 0) {
            // Buscar el grupo del marcador
            let object = intersects[0].object;
            while (object.parent && !object.userData.isEducationalMarker) {
                object = object.parent;
            }
            if (object.userData.isEducationalMarker) {
                return object;
            }
        }
        
        return null;
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationalMarkers;
}
