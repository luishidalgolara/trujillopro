// ============================================================================
// SISTEMA DE MATERIALES PBR - REALISMO AVANZADO
// ============================================================================
// Archivo: js/materials.js
// Descripción: Biblioteca de materiales físicamente correctos y texturas
// ============================================================================

const MaterialLibrary = {
    
    // ========================================================================
    // GENERADORES DE TEXTURAS PROCEDURALES AVANZADAS
    // ========================================================================
    
    // Generar textura de concreto realista
    generateConcreteTexture(size = 512) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Base de concreto con variación
        const baseColor = { r: 180, g: 180, b: 180 };
        
        // Fondo base con gradiente sutil
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, `rgb(${baseColor.r + 10}, ${baseColor.g + 10}, ${baseColor.b + 10})`);
        gradient.addColorStop(1, `rgb(${baseColor.r - 10}, ${baseColor.g - 10}, ${baseColor.b - 10})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Agregar ruido fino (textura de agregados)
        for (let i = 0; i < size * size / 2; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const variation = Math.random() * 60 - 30;
            const grayValue = baseColor.r + variation;
            const alpha = Math.random() * 0.8 + 0.2;
            
            ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${alpha})`;
            ctx.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 3 + 1);
        }
        
        // Agregar manchas de cemento
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = Math.random() * 15 + 5;
            const darkness = Math.random() * 30;
            
            const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            spotGradient.addColorStop(0, `rgba(${baseColor.r - darkness}, ${baseColor.g - darkness}, ${baseColor.b - darkness}, 0.3)`);
            spotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = spotGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Líneas de encofrado (marcas de molde)
        ctx.strokeStyle = 'rgba(160, 160, 160, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const y = (size / 3) * i + Math.random() * 20;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(size, y);
            ctx.stroke();
        }
        
        // Pequeñas grietas
        for (let i = 0; i < 8; i++) {
            ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            const startX = Math.random() * size;
            const startY = Math.random() * size;
            ctx.moveTo(startX, startY);
            
            for (let j = 0; j < 5; j++) {
                const endX = startX + (Math.random() - 0.5) * 30;
                const endY = startY + (Math.random() - 0.5) * 30;
                ctx.lineTo(endX, endY);
            }
            ctx.stroke();
        }
        
        return new THREE.CanvasTexture(canvas);
    },
    
    // Generar normal map para concreto (profundidad)
    generateConcreteNormalMap(size = 512) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Base azul (normal map neutral)
        ctx.fillStyle = 'rgb(128, 128, 255)';
        ctx.fillRect(0, 0, size, size);
        
        // Agregar variación de profundidad
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const r = Math.random() * 30 + 113;
            const g = Math.random() * 30 + 113;
            const b = Math.random() * 30 + 225;
            
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 2, 2);
        }
        
        return new THREE.CanvasTexture(canvas);
    },
    
    // Generar textura de metal corrugado
    generateRebarTexture(size = 256) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Base metálica
        ctx.fillStyle = 'rgb(80, 80, 90)';
        ctx.fillRect(0, 0, size, size);
        
        // Corrugaciones (líneas horizontales)
        const corrugationCount = 40;
        for (let i = 0; i < corrugationCount; i++) {
            const y = (size / corrugationCount) * i;
            const brightness = i % 2 === 0 ? 100 : 60;
            
            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 10})`;
            ctx.fillRect(0, y, size, size / corrugationCount);
        }
        
        // Agregar ruido metálico
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const gray = Math.random() * 40 + 60;
            
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.5)`;
            ctx.fillRect(x, y, 1, 1);
        }
        
        // Manchas de oxidación
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = Math.random() * 8 + 3;
            
            ctx.fillStyle = `rgba(139, 69, 19, ${Math.random() * 0.3 + 0.1})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        return new THREE.CanvasTexture(canvas);
    },
    
    // ========================================================================
    // MATERIALES PBR AVANZADOS
    // ========================================================================
    
    // Material de concreto ultra realista
    createConcreteMaterial(color = 0xc0c0c0) {
        const baseColor = new THREE.Color(color);
        
        // Generar texturas
        const diffuseMap = this.generateConcreteTexture(512);
        diffuseMap.wrapS = THREE.RepeatWrapping;
        diffuseMap.wrapT = THREE.RepeatWrapping;
        diffuseMap.repeat.set(2, 2);
        
        const normalMap = this.generateConcreteNormalMap(512);
        normalMap.wrapS = THREE.RepeatWrapping;
        normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(2, 2);
        
        return new THREE.MeshStandardMaterial({
            color: baseColor,
            map: diffuseMap,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(0.5, 0.5),
            roughness: 0.9,
            metalness: 0.05,
            envMapIntensity: 0.3,
            side: THREE.FrontSide
        });
    },
    
    // Material de acero corrugado para fierros
    createRebarMaterial(color = 0x4ECDC4, oxidation = 0.1) {
        const baseColor = new THREE.Color(color);
        
        const rebarTexture = this.generateRebarTexture(256);
        rebarTexture.wrapS = THREE.RepeatWrapping;
        rebarTexture.wrapT = THREE.RepeatWrapping;
        
        return new THREE.MeshStandardMaterial({
            color: baseColor,
            map: rebarTexture,
            roughness: 0.4 + (oxidation * 0.3),
            metalness: 0.85 - (oxidation * 0.2),
            envMapIntensity: 1.2,
            emissive: baseColor,
            emissiveIntensity: 0.05
        });
    },
    
    // Material de ladrillo para muros
    createBrickMaterial() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fondo de mortero
        ctx.fillStyle = '#d4d4d4';
        ctx.fillRect(0, 0, 512, 512);
        
        // Dibujar ladrillos
        const brickWidth = 100;
        const brickHeight = 40;
        const mortarSize = 8;
        
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 6; col++) {
                const x = col * (brickWidth + mortarSize) + (row % 2 === 0 ? 0 : brickWidth / 2);
                const y = row * (brickHeight + mortarSize);
                
                // Variación de color en ladrillos
                const r = 180 + Math.random() * 40;
                const g = 80 + Math.random() * 30;
                const b = 50 + Math.random() * 20;
                
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, y, brickWidth, brickHeight);
                
                // Textura de ladrillo
                for (let i = 0; i < 50; i++) {
                    ctx.fillStyle = `rgba(${r - 30}, ${g - 20}, ${b - 10}, 0.3)`;
                    ctx.fillRect(
                        x + Math.random() * brickWidth,
                        y + Math.random() * brickHeight,
                        2, 2
                    );
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        
        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.85,
            metalness: 0.0,
            normalScale: new THREE.Vector2(0.3, 0.3)
        });
    },
    
    // Material de techo con impermeabilizante
    createRoofMaterial() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Base oscura (impermeabilizante)
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, 512, 512);
        
        // Agregar textura granulada
        for (let i = 0; i < 3000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const gray = Math.random() * 50 + 20;
            
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.6)`;
            ctx.fillRect(x, y, 1, 1);
        }
        
        // Líneas de aplicación
        for (let i = 0; i < 8; i++) {
            ctx.strokeStyle = 'rgba(50, 50, 50, 0.3)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, i * 64);
            ctx.lineTo(512, i * 64 + Math.random() * 20);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        
        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.7,
            metalness: 0.2,
            envMapIntensity: 0.5
        });
    },
    
    // ========================================================================
    // UTILIDADES
    // ========================================================================
    
    // Aplicar material con caché para optimización
    applyMaterial(mesh, materialType, params = {}) {
        let material;
        
        switch(materialType) {
            case 'concrete':
                material = this.createConcreteMaterial(params.color);
                break;
            case 'rebar':
                material = this.createRebarMaterial(params.color, params.oxidation);
                break;
            case 'brick':
                material = this.createBrickMaterial();
                break;
            case 'roof':
                material = this.createRoofMaterial();
                break;
            default:
                material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        }
        
        mesh.material = material;
        mesh.material.needsUpdate = true;
        
        return material;
    }
};

// Exportar para uso global
window.MaterialLibrary = MaterialLibrary;

console.log('✅ Biblioteca de materiales PBR cargada');
console.log('💎 Materiales disponibles: concrete, rebar, brick, roof');