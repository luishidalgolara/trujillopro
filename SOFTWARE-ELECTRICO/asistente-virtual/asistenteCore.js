// ============================================================
// ASISTENTE VIRTUAL ELÉCTRICO - Core
// ============================================================

let asistenteActivo = false;
let conversationHistory = [];

/**
 * Abrir asistente virtual
 */
function abrirAsistente() {
    console.log('🤖 Abriendo Asistente Virtual Eléctrico...');
    
    if (asistenteActivo) {
        console.log('⚠️ Asistente ya está abierto');
        return;
    }
    
    // Crear modal
    const modal = document.createElement('div');
    modal.id = 'asistenteModal';
    modal.style.cssText = `
        position: fixed;
        width: 650px;
        height: 85vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) translateX(-100%);
        background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(102, 126, 234, 0.3);
        z-index: 10001;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.4s ease;
    `;
    
    modal.innerHTML = `
        <style>
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        </style>
        
        <!-- Header tecnológico -->
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 25px 30px;
            position: relative;
            overflow: hidden;
        ">
            <div style="position: relative; z-index: 1; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="
                        font-size: 26px; 
                        font-weight: 700; 
                        margin-bottom: 6px;
                        color: white;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        letter-spacing: 0.5px;
                    ">
                        ⚡ ASISTENTE ELÉCTRICO AI
                    </div>
                    <div style="
                        font-size: 13px; 
                        opacity: 0.95;
                        color: rgba(255,255,255,0.9);
                        font-weight: 500;
                    ">
                        🤖 Experto en Normativa NCh Elec 4/2003
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="mostrarListaPreguntas()" style="
                        background: rgba(255,255,255,0.15);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255,255,255,0.2);
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.25)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        📋 PREGUNTAS
                    </button>
                    <button onclick="cerrarAsistente()" style="
                        background: rgba(255,255,255,0.15);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255,255,255,0.2);
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 22px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(231,76,60,0.8)'; this.style.transform='rotate(90deg)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.transform='rotate(0deg)'">
                        ✕
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Área de mensajes mejorada -->
        <div id="asistenteChat" style="
            flex: 1;
            overflow-y: auto;
            padding: 25px;
            background: linear-gradient(180deg, #0f1419 0%, #1a1a2e 100%);
            display: flex;
            flex-direction: column;
            gap: 16px;
        ">
            <!-- Los mensajes se agregan aquí -->
        </div>
        
        <!-- Input área tecnológica -->
        <div style="
            padding: 20px;
            background: rgba(22, 33, 62, 0.8);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(102, 126, 234, 0.2);
            display: flex;
            gap: 12px;
        ">
            <input 
                type="text" 
                id="asistenteInput" 
                placeholder="🔍 Escribe tu consulta sobre normativa eléctrica..."
                style="
                    flex: 1;
                    padding: 14px 20px;
                    border: 2px solid rgba(102, 126, 234, 0.3);
                    border-radius: 25px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s;
                    background: rgba(255,255,255,0.05);
                    color: white;
                    font-family: inherit;
                "
                onkeypress="if(event.key==='Enter') enviarMensaje()"
                onfocus="this.style.borderColor='#667eea'; this.style.background='rgba(255,255,255,0.08)'; this.style.boxShadow='0 0 20px rgba(102,126,234,0.3)'"
                onblur="this.style.borderColor='rgba(102,126,234,0.3)'; this.style.background='rgba(255,255,255,0.05)'; this.style.boxShadow='none'"
            />
            <button onclick="enviarMensaje()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            " onmouseover="this.style.transform='scale(1.1) rotate(15deg)'; this.style.boxShadow='0 6px 20px rgba(102,126,234,0.6)'" 
               onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.boxShadow='0 4px 15px rgba(102,126,234,0.4)'">
                ➤
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada - centrado
    setTimeout(() => {
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.opacity = '1';
    }, 10);
    
    asistenteActivo = true;
    
    // Mensaje de bienvenida
    setTimeout(() => {
        agregarMensajeAsistente('¡Hola! 👋 Soy tu asistente eléctrico virtual especializado en la norma NCh Elec 4/2003.<br><br>Puedo ayudarte con consultas sobre:<br>• Normativa y terminología<br>• Tableros y protecciones<br>• Instalaciones eléctricas<br><br>💡 <strong>Presiona "PREGUNTAS"</strong> para ver todas las preguntas disponibles.<br><br>¿En qué puedo ayudarte?');
    }, 400);
    
    // Enfocar input
    setTimeout(() => {
        document.getElementById('asistenteInput')?.focus();
    }, 500);
    
    console.log('✅ Asistente Virtual abierto');
}

/**
 * Cerrar asistente virtual
 */
function cerrarAsistente() {
    const modal = document.getElementById('asistenteModal');
    if (modal) {
        modal.style.transform = 'translate(-50%, -50%) translateX(-100%)';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            asistenteActivo = false;
            console.log('✅ Asistente cerrado');
        }, 400);
    }
}

/**
 * Enviar mensaje del usuario
 */
function enviarMensaje() {
    const input = document.getElementById('asistenteInput');
    const mensaje = input?.value.trim();
    
    if (!mensaje) return;
    
    // Agregar mensaje del usuario
    agregarMensajeUsuario(mensaje);
    
    // Limpiar input
    input.value = '';
    
    // Guardar en historial
    conversationHistory.push({
        role: 'user',
        content: mensaje,
        timestamp: new Date()
    });
    
    // Procesar respuesta
    setTimeout(() => {
        procesarConsulta(mensaje);
    }, 500);
}

/**
 * Agregar mensaje del usuario al chat
 */
function agregarMensajeUsuario(texto) {
    const chatArea = document.getElementById('asistenteChat');
    if (!chatArea) return;
    
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        display: flex;
        justify-content: flex-end;
        animation: slideInRight 0.3s ease;
    `;
    
    mensaje.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 18px;
            border-radius: 20px 20px 5px 20px;
            max-width: 75%;
            word-wrap: break-word;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            border: 1px solid rgba(255,255,255,0.1);
            font-size: 14px;
            line-height: 1.5;
        ">
            ${texto}
        </div>
    `;
    
    chatArea.appendChild(mensaje);
    scrollToBottom();
}

/**
 * Agregar mensaje del asistente al chat
 */
function agregarMensajeAsistente(texto) {
    const chatArea = document.getElementById('asistenteChat');
    if (!chatArea) return;
    
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 12px;
        animation: slideInLeft 0.3s ease;
    `;
    
    mensaje.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
            border: 2px solid rgba(255,255,255,0.2);
        ">
            🤖
        </div>
        <div style="
            background: rgba(255,255,255,0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(102, 126, 234, 0.2);
            color: #e0e0e0;
            padding: 14px 18px;
            border-radius: 5px 20px 20px 20px;
            max-width: 75%;
            word-wrap: break-word;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            line-height: 1.6;
            font-size: 14px;
        ">
            ${texto}
        </div>
    `;
    
    chatArea.appendChild(mensaje);
    scrollToBottom();
    
    // Guardar en historial
    conversationHistory.push({
        role: 'assistant',
        content: texto,
        timestamp: new Date()
    });
}

/**
 * Scroll al final del chat
 */
function scrollToBottom() {
    const chatArea = document.getElementById('asistenteChat');
    if (chatArea) {
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

/**
 * Procesar consulta del usuario
 * Esta función llamará al sistema de conocimiento
 */
function procesarConsulta(consulta) {
    console.log('🔍 Procesando consulta:', consulta);
    
    // Aquí se llamará a asistenteKnowledge.js
    // Por ahora, respuesta temporal
    const respuesta = obtenerRespuesta(consulta);
    agregarMensajeAsistente(respuesta);
}

console.log('✅ Asistente Virtual Core inicializado');
/**
 * Mostrar lista de preguntas disponibles
 */
function mostrarListaPreguntas() {
    console.log('📋 Mostrando lista de preguntas...');
    
    // Limpiar chat
    const chatArea = document.getElementById('asistenteChat');
    if (!chatArea) return;
    
    chatArea.innerHTML = '';
    
    // Obtener todas las preguntas de la base de datos
    if (typeof baseDeDatosPreguntas === 'undefined' || !baseDeDatosPreguntas.todasLasPreguntas) {
        agregarMensajeAsistente('❌ No hay preguntas cargadas en la base de datos.');
        return;
    }
    
    const preguntas = baseDeDatosPreguntas.todasLasPreguntas;
    
    if (preguntas.length === 0) {
        agregarMensajeAsistente('❌ No hay preguntas disponibles.');
        return;
    }
    
    // Agrupar por categoría
    const categorias = {};
    preguntas.forEach(p => {
        const cat = p.seccion || 'General';
        if (!categorias[cat]) {
            categorias[cat] = [];
        }
        categorias[cat].push(p);
    });
    
    // Mensaje de introducción
    const intro = document.createElement('div');
    intro.style.cssText = `
        padding: 20px;
        background: rgba(102, 126, 234, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 12px;
        color: #e0e0e0;
        margin-bottom: 20px;
    `;
    intro.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
            📚 PREGUNTAS DISPONIBLES (${preguntas.length})
        </div>
        <div style="font-size: 13px; opacity: 0.8;">
            Haz clic en cualquier pregunta para ver la respuesta
        </div>
    `;
    chatArea.appendChild(intro);
    
    // Mostrar preguntas por categoría
    Object.keys(categorias).forEach(categoria => {
        // Header de categoría
        const catHeader = document.createElement('div');
        catHeader.style.cssText = `
            font-size: 14px;
            font-weight: bold;
            color: #667eea;
            margin: 20px 0 12px 0;
            padding: 8px 12px;
            background: rgba(102, 126, 234, 0.15);
            border-left: 3px solid #667eea;
            border-radius: 4px;
        `;
        catHeader.textContent = `📂 ${categoria}`;
        chatArea.appendChild(catHeader);
        
        // Lista de preguntas
        categorias[categoria].forEach((pregunta, index) => {
            const preguntaBtn = document.createElement('div');
            preguntaBtn.style.cssText = `
                padding: 14px 16px;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(102, 126, 234, 0.2);
                border-radius: 10px;
                margin-bottom: 8px;
                cursor: pointer;
                transition: all 0.3s;
                color: #e0e0e0;
                font-size: 13px;
                line-height: 1.5;
            `;
            
            preguntaBtn.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 10px;">
                    <div style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        min-width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 11px;
                        font-weight: bold;
                        flex-shrink: 0;
                    ">
                        ${index + 1}
                    </div>
                    <div style="flex: 1;">
                        ${pregunta.pregunta}
                    </div>
                </div>
            `;
            
            // Efectos hover
            preguntaBtn.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(102, 126, 234, 0.2)';
                this.style.borderColor = '#667eea';
                this.style.transform = 'translateX(8px)';
            });
            
            preguntaBtn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255,255,255,0.05)';
                this.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                this.style.transform = 'translateX(0)';
            });
            
            // Click para ver respuesta
            preguntaBtn.addEventListener('click', function() {
                mostrarRespuesta(pregunta);
            });
            
            chatArea.appendChild(preguntaBtn);
        });
    });
    
    scrollToBottom();
}

/**
 * Mostrar respuesta de una pregunta específica
 */
function mostrarRespuesta(pregunta) {
    console.log('💡 Mostrando respuesta:', pregunta.id);
    
    // Limpiar chat
    const chatArea = document.getElementById('asistenteChat');
    if (!chatArea) return;
    
    chatArea.innerHTML = '';
    
    // Botón volver
    const btnVolver = document.createElement('button');
    btnVolver.style.cssText = `
        padding: 10px 20px;
        background: rgba(102, 126, 234, 0.2);
        border: 1px solid rgba(102, 126, 234, 0.4);
        border-radius: 20px;
        color: white;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 20px;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    btnVolver.innerHTML = '← Volver a preguntas';
    btnVolver.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(102, 126, 234, 0.3)';
    });
    btnVolver.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(102, 126, 234, 0.2)';
    });
    btnVolver.addEventListener('click', mostrarListaPreguntas);
    chatArea.appendChild(btnVolver);
    
    // Pregunta
    const preguntaDiv = document.createElement('div');
    preguntaDiv.style.cssText = `
        padding: 18px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    preguntaDiv.innerHTML = `❓ ${pregunta.pregunta}`;
    chatArea.appendChild(preguntaDiv);
    
    // Respuesta
    const respuestaDiv = document.createElement('div');
    respuestaDiv.style.cssText = `
        padding: 20px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(102, 126, 234, 0.2);
        border-radius: 12px;
        color: #e0e0e0;
        font-size: 14px;
        line-height: 1.8;
        margin-bottom: 20px;
    `;
    respuestaDiv.innerHTML = `
        <div style="font-size: 13px; color: #667eea; font-weight: bold; margin-bottom: 12px;">
            💡 RESPUESTA:
        </div>
        ${pregunta.respuesta}
    `;
    chatArea.appendChild(respuestaDiv);
    
    // Información adicional
    if (pregunta.seccion) {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            padding: 12px 16px;
            background: rgba(102, 126, 234, 0.1);
            border-left: 3px solid #667eea;
            border-radius: 6px;
            color: #a0a0a0;
            font-size: 12px;
            margin-top: 16px;
        `;
        infoDiv.innerHTML = `📖 Sección: ${pregunta.seccion}`;
        chatArea.appendChild(infoDiv);
    }
    
    scrollToBottom();
}