// ================================
// CAD STYLES - Estilos y Animaciones
// CSS dinámico para indicadores OSNAP y ORTHO
// ================================

function agregarEstilosCAD() {
    const estilo = document.createElement('style');
    estilo.textContent = `
        @keyframes snapPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes orthoGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 136, 0.5); }
            50% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.8); }
        }
        
        .ortho-indicator {
            position: fixed;
            bottom: 80px;
            right: 450px;
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            color: #666666;
            padding: 10px 20px;
            border-radius: 8px;
            border: 2px solid #3a3a3a;
            font-weight: 700;
            font-size: 14px;
            z-index: 1000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            user-select: none;
            backdrop-filter: blur(10px);
        }
        
        .ortho-indicator.active {
            background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
            color: #000000;
            border-color: #00ff88;
            animation: orthoGlow 2s ease-in-out infinite;
        }
        
        .ortho-indicator:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(estilo);
}

// ================================
// EXPORTAR
// ================================

window.CADStyles = {
    agregarEstilosCAD
};

console.log('✅ cad-styles.js cargado');