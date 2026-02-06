// ============================================================================
// MATERIALES PARA VENTANAS Y PUERTAS
// ============================================================================
// Archivo: js/openings/materials.js
// Descripción: Materiales PBR para vidrio, marcos, puertas de madera
// ============================================================================

const OpeningsMaterials = {
    
    // ========================================================================
    // MATERIAL DE VIDRIO SEMITRANSPARENTE
    // ========================================================================
    createGlassMaterial() {
        return new THREE.MeshPhysicalMaterial({
            color: 0x88ccee,
            transparent: true,
            opacity: 0.3,
            roughness: 0.05,
            metalness: 0.1,
            envMapIntensity: 1.0,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    },
    
    // ========================================================================
    // MATERIAL DE MARCO DE VENTANA (Aluminio)
    // ========================================================================
    createWindowFrameMaterial() {
        return new THREE.MeshStandardMaterial({
            color: 0x8899aa,
            roughness: 0.3,
            metalness: 0.8,
            envMapIntensity: 0.8
        });
    },
    
    // ========================================================================
    // MATERIAL DE MARCO DE PUERTA (Madera oscura)
    // ========================================================================
    createDoorFrameMaterial() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Base de madera oscura
        ctx.fillStyle = '#5a3a1a';
        ctx.fillRect(0, 0, 128, 256);
        
        // Vetas de madera
        for (let i = 0; i < 40; i++) {
            const y = Math.random() * 256;
            const variation = Math.random() * 20 - 10;
            ctx.strokeStyle = `rgba(${80 + variation}, ${50 + variation}, ${25 + variation}, 0.4)`;
            ctx.lineWidth = Math.random() * 2 + 0.5;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.bezierCurveTo(32, y + Math.random() * 4, 96, y - Math.random() * 4, 128, y + Math.random() * 2);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        return new THREE.MeshStandardMaterial({
            map: texture,
            color: 0x6b4226,
            roughness: 0.6,
            metalness: 0.05
        });
    },
    
    // ========================================================================
    // MATERIAL DE HOJA DE PUERTA (Madera con paneles)
    // ========================================================================
    createDoorPanelMaterial() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Base de madera
        const baseR = 120, baseG = 70, baseB = 35;
        ctx.fillStyle = `rgb(${baseR}, ${baseG}, ${baseB})`;
        ctx.fillRect(0, 0, 256, 512);
        
        // Vetas horizontales de madera
        for (let i = 0; i < 80; i++) {
            const y = Math.random() * 512;
            const v = Math.random() * 25 - 12;
            ctx.strokeStyle = `rgba(${baseR + v}, ${baseG + v}, ${baseB + v}, 0.5)`;
            ctx.lineWidth = Math.random() * 3 + 0.5;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.bezierCurveTo(64, y + Math.random() * 6, 192, y - Math.random() * 6, 256, y);
            ctx.stroke();
        }
        
        // Paneles decorativos (2 paneles)
        const panelMargin = 30;
        const panelGap = 20;
        const panelWidth = 256 - panelMargin * 2;
        const panelHeight = (512 - panelMargin * 2 - panelGap) / 2;
        
        for (let p = 0; p < 2; p++) {
            const py = panelMargin + p * (panelHeight + panelGap);
            
            // Borde hundido del panel
            ctx.strokeStyle = `rgba(${baseR - 30}, ${baseG - 20}, ${baseB - 15}, 0.6)`;
            ctx.lineWidth = 3;
            ctx.strokeRect(panelMargin, py, panelWidth, panelHeight);
            
            // Sombra interior
            ctx.strokeStyle = `rgba(0, 0, 0, 0.15)`;
            ctx.lineWidth = 1;
            ctx.strokeRect(panelMargin + 4, py + 4, panelWidth - 8, panelHeight - 8);
            
            // Relleno del panel ligeramente más oscuro
            ctx.fillStyle = `rgba(${baseR - 15}, ${baseG - 10}, ${baseB - 5}, 0.3)`;
            ctx.fillRect(panelMargin + 5, py + 5, panelWidth - 10, panelHeight - 10);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        
        return new THREE.MeshStandardMaterial({
            map: texture,
            color: 0x8B5E3C,
            roughness: 0.55,
            metalness: 0.02
        });
    },
    
    // ========================================================================
    // MATERIAL DE MANILLA / HERRAJE
    // ========================================================================
    createHandleMaterial() {
        return new THREE.MeshStandardMaterial({
            color: 0xc0a870,
            roughness: 0.2,
            metalness: 0.9,
            envMapIntensity: 1.2
        });
    },
    
    // ========================================================================
    // MATERIAL DE ALFÉIZAR (Concreto claro)
    // ========================================================================
    createSillMaterial() {
        return new THREE.MeshStandardMaterial({
            color: 0xd0d0d0,
            roughness: 0.8,
            metalness: 0.05
        });
    }
};

// Hacer disponible globalmente
window.OpeningsMaterials = OpeningsMaterials;

console.log('✅ Materiales de ventanas y puertas cargados');
console.log('💎 Materiales: vidrio, marco aluminio, madera puerta, herraje');
