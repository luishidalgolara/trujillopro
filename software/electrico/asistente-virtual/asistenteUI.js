// ============================================================
// ASISTENTE VIRTUAL ELÉCTRICO - UI
// ============================================================

/**
 * Crear botón flotante del asistente
 */
function crearBotonAsistente() {
    // Verificar que no exista ya
    if (document.getElementById('asistenteFloatingBtn')) {
        console.log('⚠️ Botón del asistente ya existe');
        return;
    }
    
    const btn = document.createElement('button');
    btn.id = 'asistenteFloatingBtn';
    btn.innerHTML = '🤖';
    btn.title = 'Asistente Virtual Eléctrico';
    
    btn.style.cssText = `
        position: fixed;
        left: 50px;
        top: 350px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
        z-index: 10000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Efectos hover
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(10deg)';
        this.style.boxShadow = '0 6px 30px rgba(102, 126, 234, 0.7)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.5)';
    });
    
    // Click para abrir/cerrar
    btn.addEventListener('click', function() {
        if (asistenteActivo) {
            cerrarAsistente();
        } else {
            abrirAsistente();
        }
    });
    
    document.body.appendChild(btn);
    
    // Animación de entrada
    setTimeout(() => {
        btn.style.animation = 'bounce 0.6s ease';
    }, 100);
    
    console.log('✅ Botón flotante del asistente creado');
}

/**
 * Agregar badge de notificación al botón
 */
function agregarBadgeAsistente(numero) {
    const btn = document.getElementById('asistenteFloatingBtn');
    if (!btn) return;
    
    // Remover badge anterior si existe
    const badgeAnterior = btn.querySelector('.asistente-badge');
    if (badgeAnterior) {
        badgeAnterior.remove();
    }
    
    const badge = document.createElement('div');
    badge.className = 'asistente-badge';
    badge.textContent = numero;
    badge.style.cssText = `
        position: absolute;
        top: -4px;
        right: -4px;
        background: #e74c3c;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 11px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        animation: pulse 1s infinite;
    `;
    
    btn.appendChild(badge);
}

/**
 * Remover badge del botón
 */
function removerBadgeAsistente() {
    const btn = document.getElementById('asistenteFloatingBtn');
    if (!btn) return;
    
    const badge = btn.querySelector('.asistente-badge');
    if (badge) {
        badge.remove();
    }
}

/**
 * Mostrar indicador de escritura
 */
function mostrarIndicadorEscritura() {
    const chatArea = document.getElementById('asistenteChat');
    if (!chatArea) return;
    
    const indicador = document.createElement('div');
    indicador.id = 'asistenteTyping';
    indicador.style.cssText = `
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;
    `;
    
    indicador.innerHTML = `
        <div style="
            background: #667eea;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
        ">
            🤖
        </div>
        <div style="
            background: white;
            padding: 12px 16px;
            border-radius: 4px 18px 18px 18px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            gap: 4px;
        ">
            <span style="
                width: 8px;
                height: 8px;
                background: #667eea;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            "></span>
            <span style="
                width: 8px;
                height: 8px;
                background: #667eea;
                border-radius: 50%;
                animation: typing 1.4s infinite 0.2s;
            "></span>
            <span style="
                width: 8px;
                height: 8px;
                background: #667eea;
                border-radius: 50%;
                animation: typing 1.4s infinite 0.4s;
            "></span>
        </div>
    `;
    
    chatArea.appendChild(indicador);
    scrollToBottom();
}

/**
 * Ocultar indicador de escritura
 */
function ocultarIndicadorEscritura() {
    const indicador = document.getElementById('asistenteTyping');
    if (indicador) {
        indicador.remove();
    }
}

// Crear botón cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(crearBotonAsistente, 100);
    });
} else {
    // DOM ya está listo
    setTimeout(crearBotonAsistente, 100);
}

console.log('✅ Asistente Virtual UI inicializado');